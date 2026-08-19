/**
 * @file tools/ownership-scan.js 的契约测试（issue #66）。
 *
 * 五个重点：
 *   1. 写入/读取分类——小段源文本直接驱动（含括号角色槽、比较形态排除、
 *      动态下标、注释剥离），不依赖真实 target/；
 *   2. 域清单是数据——夹具域清单带一个工具从没见过的域，证明加域不改工具
 *      （工单的硬约束）；目录归属校验对未认领/发霉/未处置的目录一律报错；
 *   3. 产物边界——默认不覆盖、--force 才覆盖（issue #10 规则对新产物同样生效，
 *      必须有测试）；
 *   4. 同步守护——重跑真实 target/ 的生成结果与库内两份产物逐字节一致；
 *   5. 锚点复现——工单实测结论在本口径下成立（2xx+3xx 口上独占、实活 9447、
 *      零外部写入者；1xx/4xx/6xx 混用）。工单口径（含注释、无括号形态）的
 *      对账见 issue #66 评论，不在测试里复算。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const {
  REPO_ROOT,
  build_matchers,
  classify_line,
  generate,
  main,
  parse_domains,
} = require('../tools/ownership-scan');

// —— 测试小工具（与 csv-to-yml.test.js 同款惯例）——

async function with_temp_dir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-ownership-scan-'));
  try {
    return await run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function capture_console(run) {
  const captured = [];
  const original = { log: console.log, error: console.error };
  for (const level of ['log', 'error']) {
    console[level] = (...args) =>
      captured.push({ level, text: args.join(' ') });
  }
  try {
    return { result: run(), captured };
  } finally {
    Object.assign(console, original);
  }
}

// 夹具 ERB 树：{ 目录: [[文件名, 内容], …] }，根目录文件用键 '(root)'
async function with_fixture_tree(tree, run) {
  return with_temp_dir(async (dir) => {
    const erb_root = path.join(dir, 'ERB');
    fs.mkdirSync(erb_root, { recursive: true });
    for (const [dir_name, files] of Object.entries(tree)) {
      const target_dir =
        dir_name === '(root)' ? erb_root : path.join(erb_root, dir_name);
      fs.mkdirSync(target_dir, { recursive: true });
      for (const [name, content] of files) {
        fs.writeFileSync(path.join(target_dir, name), content, 'utf8');
      }
    }
    return run({ dir, erb_root });
  });
}

// 夹具域清单：alpha/beta 是工具没见过的域名——域清单是数据不是枚举
const FIXTURE_DOMAINS = [
  '# 夹具域清单',
  'alpha:',
  '  label: 甲域',
  '  dirs: 甲',
  'beta:',
  '  label: 乙域',
  '  dirs: 乙',
  'ignored_files:',
  '  - TITLE.ERB',
].join('\n');

// 域清单声明的目录都建出来（空目录即可）——归属校验要求声明与实存一致，
// 夹具树只建用到的目录会触发「数据发霉」报错（那正是该校验的职责）
function ensure_domain_dirs(erb_root, domain_text) {
  for (const line of domain_text.split('\n')) {
    const match = /^ {2}dirs: (.+)$/.exec(line);
    if (!match) {
      continue;
    }
    for (const dir of match[1]
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)) {
      fs.mkdirSync(path.join(erb_root, dir), { recursive: true });
    }
  }
}

// 在夹具树上跑一次完整生成
async function generate_on_fixture(tree, domain_text = FIXTURE_DOMAINS) {
  return with_fixture_tree(tree, async ({ dir, erb_root }) => {
    const domain_file = path.join(dir, 'domains.yml');
    fs.writeFileSync(domain_file, domain_text, 'utf8');
    ensure_domain_dirs(erb_root, domain_text);
    const result = generate({ domain_file, erb_root });
    return { result, dir, erb_root, domain_file };
  });
}

// —— 写入/读取分类 ——

test('写入判定：赋值与复合赋值计入，比较形态（== >= <= != < >）不计', () => {
  const matchers = build_matchers('CFLAG');
  assert.deepEqual(classify_line('CFLAG:322 = 1', matchers), {
    writes: [322],
    reads: 0,
  });
  assert.deepEqual(
    classify_line('CFLAG:TARGET:344 += 1', matchers).writes,
    [344],
  );
  // 括号角色槽：工单正则会漏掉的第三种寻址形态
  assert.deepEqual(
    classify_line('CFLAG:(ARG:0):13 *= 2', matchers).writes,
    [13],
  );
  for (const [source, expected] of [
    ['CFLAG:301 -= 5', 301],
    ['CFLAG:301 /= 2', 301],
    ['CFLAG:301 |= 0x10', 301],
    ['CFLAG:301 &= 255', 301],
    ['CFLAG:301 ^= 3', 301],
    ['CFLAG:301 <<= 1', 301],
    ['CFLAG:301 >>= 1', 301],
  ]) {
    assert.deepEqual(
      classify_line(source, matchers).writes,
      [expected],
      source,
    );
  }

  assert.deepEqual(classify_line('IF CFLAG:301 == 1', matchers), {
    writes: [],
    reads: 1,
  });
  for (const source of [
    'SIF CFLAG:5 >= 3',
    'SIF CFLAG:5 <= 3',
    'SIF CFLAG:5 != 0',
    'SIF CFLAG:5 < 3',
    'SIF CFLAG:5 > 3',
  ]) {
    assert.deepEqual(
      classify_line(source, matchers),
      { writes: [], reads: 1 },
      source,
    );
  }
});

test('读取判定：右值、PRINTFORM 引用计入；同行的写入目标不计读', () => {
  const matchers = build_matchers('CFLAG');
  assert.deepEqual(classify_line('CFLAG:301 = CFLAG:302 + 1', matchers), {
    writes: [301],
    reads: 1,
  });
  assert.deepEqual(classify_line('LOCAL = CFLAG:301', matchers), {
    writes: [],
    reads: 1,
  });
  assert.deepEqual(classify_line('PRINTFORM {CFLAG:301,3}', matchers).reads, 1);
});

test('动态下标：写入计入但下标为 null（无测量事实可归属）', () => {
  const matchers = build_matchers('CFLAG');
  assert.deepEqual(classify_line('CFLAG:COUNT = 0', matchers), {
    writes: [null],
    reads: 0,
  });
});

test('编码按内容判定：Shift-JIS 文件里的写入不漏（工单陷阱四）', async () => {
  await with_fixture_tree({ '(root)': [] }, async ({ dir, erb_root }) => {
    fs.mkdirSync(path.join(erb_root, '甲'), { recursive: true });
    // 夹具：首行注释含 Shift-JIS 专有字节（あ = 82 A0，不是合法 UTF-8），
    // 按扩展名假定 UTF-8 会乱码；第二行是活写入
    fs.writeFileSync(
      path.join(erb_root, '甲', 'SJIS.ERB'),
      Buffer.concat([
        Buffer.from([0x3b, 0x82, 0xa0, 0x0d, 0x0a]),
        Buffer.from('CFLAG:322 = 7\r\n', 'ascii'),
      ]),
    );
    const domain_file = path.join(dir, 'domains.yml');
    fs.writeFileSync(domain_file, FIXTURE_DOMAINS, 'utf8');
    ensure_domain_dirs(erb_root, FIXTURE_DOMAINS);
    const result = generate({ domain_file, erb_root });
    assert.equal(result.scan.shift_jis_files.length, 1);
    assert.ok(result.scan.shift_jis_files[0].endsWith('甲/SJIS.ERB'));
    assert.equal(result.scan.writes_total, 1);
    assert.equal(result.scan.per_index.get(322)?.get('alpha'), 1);
  });
});

test('注释掉的写入是死代码：计入统计，不进区间与跨域清单', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', ';CFLAG:301 = 1\nCFLAG:302 = 2\n']],
  });
  assert.equal(result.scan.commented_writes, 1);
  assert.equal(result.scan.writes_total, 1);
  assert.deepEqual([...result.scan.per_index.keys()], [302]);
  assert.ok(result.ownership_yaml.includes('"302":'));
  assert.ok(!result.ownership_yaml.includes('301'));
  assert.equal(result.cross.length, 0);
});

// —— 区间与属主 ——

test('区间合并：相邻同属主合并、未写入的下标断开、单下标不写区间号', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', 'CFLAG:1 = 1\nCFLAG:2 = 1\nCFLAG:3 = 1\nCFLAG:5 = 1\n']],
  });
  assert.deepEqual(
    result.ranges.map((range) =>
      range.start === range.end
        ? `${range.start}`
        : `${range.start}-${range.end}`,
    ),
    ['1-3', '5'],
  );
});

test('属主判定：写入次数最多者胜；并列按域清单声明序取先', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', 'CFLAG:9 = 1\nCFLAG:8 = 1\n']],
    乙: [['B.ERB', 'CFLAG:9 = 1\nCFLAG:9 = 1\nCFLAG:8 = 1\n']],
  });
  const owner_of = Object.fromEntries(
    result.ranges.map((range) => [range.start, range.owner]),
  );
  assert.equal(owner_of[9], 'beta'); // 2 比 1 多
  assert.equal(owner_of[8], 'alpha'); // 1 比 1 并列，alpha 声明在先
});

test('跨域写入清单：非属主写入逐条具名（下标/域/属主/文件/行号），排序确定', async () => {
  const { result } = await generate_on_fixture({
    乙: [['B.ERB', 'CFLAG:5 = 1\nCFLAG:5 = 1\n']],
    甲: [['A.ERB', 'CFLAG:5 = 1\nCFLAG:6 = 1\n']],
  });
  // 下标 5 属主 beta（2 次），alpha 的 1 次是跨域；下标 6 只有 alpha 写，不是跨域
  assert.equal(result.cross.length, 1);
  const [entry] = result.cross;
  assert.equal(entry.index, 5);
  assert.equal(entry.domain, 'alpha');
  assert.equal(entry.owner, 'beta');
  assert.ok(entry.file.endsWith('甲/A.ERB'));
  assert.equal(entry.line, 1);
});

// —— 域清单是数据（工单硬约束）——

test('域清单是数据：工具没见过的域照常归属，加域不改工具', async () => {
  const domains = [
    '# 夹具',
    'custom:',
    '  label: 丙域',
    '  dirs: 丙',
    'ignored_files:',
    '  - TITLE.ERB',
  ].join('\n');
  const { result } = await generate_on_fixture(
    { 丙: [['C.ERB', 'CFLAG:322 = 1\n']] },
    domains,
  );
  assert.equal(result.scan.writes_by_domain.get('custom'), 1);
  assert.equal(result.ranges[0].owner, 'custom');
});

test('域清单解析：非 snake_case 标识、目录重复认领、缺字段都报错', () => {
  assert.throws(
    () => parse_domains('Alpha:\n  label: 甲\n  dirs: 甲\n'),
    /小写snake_case/,
  );
  assert.throws(
    () =>
      parse_domains(
        'alpha:\n  label: 甲\n  dirs: 甲\nbeta:\n  label: 乙\n  dirs: 甲\n',
      ),
    /重复认领/,
  );
  assert.throws(() => parse_domains('alpha:\n  dirs: 甲\n'), /缺 label/);
  assert.throws(() => parse_domains('alpha:\n  label: 甲\n'), /缺 label/);
  assert.throws(() => parse_domains(''), /域清单为空/);
});

test('目录归属校验：未认领的一级目录报错（后来者自动纳入）', async () => {
  await assert.rejects(
    generate_on_fixture({
      甲: [['A.ERB', 'CFLAG:1 = 1\n']],
      丁: [['D.ERB', 'CFLAG:2 = 1\n']], // 未被任何域认领
    }),
    /未.*认领.*丁/,
  );
});

test('目录归属校验：认领了不存在的目录报错（数据发霉）', async () => {
  // 不走 generate_on_fixture：它会替域清单把声明的目录建出来，而本用例
  // 要的正是「声明了不存在的目录」
  await with_fixture_tree(
    { 甲: [['A.ERB', '']] },
    async ({ dir, erb_root }) => {
      const domain_file = path.join(dir, 'domains.yml');
      fs.writeFileSync(
        domain_file,
        'alpha:\n  label: 甲域\n  dirs: 甲, 戊\n',
        'utf8',
      );
      assert.throws(() => generate({ domain_file, erb_root }), /不存在.*戊/);
    },
  );
});

test('目录归属校验：根目录源文件未处置报错', async () => {
  await assert.rejects(
    generate_on_fixture({
      甲: [['A.ERB', '']],
      '(root)': [['TITLE2.ERB', 'CFLAG:1 = 1\n']],
    }),
    /未处置.*TITLE2/,
  );
});

test('目录归属校验：被忽略文件出现写入报错（忽略声明发霉）', async () => {
  await assert.rejects(
    generate_on_fixture({
      甲: [['A.ERB', '']],
      '(root)': [['TITLE.ERB', 'CFLAG:1 = 1\n']], // 在 ignored_files 里却有写入
    }),
    /发霉/,
  );
});

// —— 产物边界与 CLI ——

test('产物边界：已存在默认跳过（人工修改幸存），--force 才重写', async () => {
  const tree = { 甲: [['A.ERB', 'CFLAG:1 = 1\n']] };
  await with_fixture_tree(tree, async ({ dir, erb_root }) => {
    const domain_file = path.join(dir, 'domains.yml');
    fs.writeFileSync(domain_file, FIXTURE_DOMAINS, 'utf8');
    ensure_domain_dirs(erb_root, FIXTURE_DOMAINS);
    const out_dir = path.join(dir, 'ownership');
    fs.mkdirSync(out_dir, { recursive: true });
    for (const name of [
      'cflag-ownership.yml',
      'cflag-cross-domain-writes.yml',
    ]) {
      fs.writeFileSync(path.join(out_dir, name), '人工修改过的产物', 'utf8');
    }

    const skipped = capture_console(() =>
      main([], { domain_file, erb_root, out_dir }),
    );
    assert.equal(skipped.result, 0);
    assert.equal(
      fs.readFileSync(path.join(out_dir, 'cflag-ownership.yml'), 'utf8'),
      '人工修改过的产物',
    );
    assert.ok(
      skipped.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('跳过 2 个'),
      ),
    );

    const forced = capture_console(() =>
      main(['--force'], { domain_file, erb_root, out_dir }),
    );
    assert.equal(forced.result, 0);
    const rewritten = fs.readFileSync(
      path.join(out_dir, 'cflag-ownership.yml'),
      'utf8',
    );
    assert.notEqual(rewritten, '人工修改过的产物');
    assert.ok(rewritten.includes('owner: alpha'));
    assert.ok(
      forced.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('写出 2 个'),
      ),
    );
  });
});

test('CLI：未知表名报错（退出码 1），未知参数与缺参数报用法（退出码 2）', async () => {
  const bogus = capture_console(() => main(['--bogus']));
  assert.equal(bogus.result, 2);
  assert.ok(bogus.captured.some((entry) => entry.text.includes('未知参数')));

  const no_value = capture_console(() => main(['--table']));
  assert.equal(no_value.result, 2);

  const unknown_table = capture_console(() => main(['--table', 'tflag']));
  assert.equal(unknown_table.result, 1);
  assert.ok(
    unknown_table.captured.some((entry) => entry.text.includes('未知表名')),
  );
});

// —— 真实 target/：同步守护与锚点复现 ——
//
// 全树扫描较慢，整个文件共享一次生成结果（target/ 只读，结果稳定）。
let cached_real = null;
function real_generate() {
  cached_real ??= generate({});
  return cached_real;
}

test('同步守护：cflag-ownership.yml 与重跑生成结果逐字节一致', () => {
  const result = real_generate();
  assert.equal(
    fs.readFileSync(
      path.join(REPO_ROOT, 'ownership', 'cflag-ownership.yml'),
      'utf8',
    ),
    result.ownership_yaml,
  );
});

test('同步守护：cflag-cross-domain-writes.yml 与重跑生成结果逐字节一致', () => {
  const result = real_generate();
  assert.equal(
    fs.readFileSync(
      path.join(REPO_ROOT, 'ownership', 'cflag-cross-domain-writes.yml'),
      'utf8',
    ),
    result.cross_yaml,
  );
});

test('锚点复现：2xx+3xx 口上独占——实活 9447 次写入、零外部写入者', () => {
  const { scan } = real_generate();
  let kojo_writes = 0;
  const outsiders = [];
  for (const [index, per] of scan.per_index) {
    if (index < 200 || index > 399) {
      continue;
    }
    for (const [domain, count] of per) {
      if (domain === 'kojo') {
        kojo_writes += count;
      } else {
        outsiders.push(`${domain} 下标 ${index} ${count} 次`);
      }
    }
  }
  assert.deepEqual(outsiders, []);
  assert.equal(kojo_writes, 9447);
});

test('锚点复现：1xx/4xx/6xx 是混用段（各有多域写入者）', () => {
  const { scan } = real_generate();
  for (const [lo, hi, name] of [
    [100, 199, '1xx'],
    [400, 499, '4xx'],
    [600, 699, '6xx'],
  ]) {
    const writers = new Set();
    for (const [index, per] of scan.per_index) {
      if (index < lo || index > hi) {
        continue;
      }
      for (const [domain] of per) {
        writers.add(domain);
      }
    }
    assert.ok(
      writers.size >= 2,
      `${name} 应为混用段，实测写入者只有 ${[...writers].join('、')}`,
    );
  }
});

test('锚点复现：全量数字与编码（实活 11435、注释 305、动态 19、区间 106、Shift-JIS 恰好一个）', () => {
  const { scan, ranges } = real_generate();
  assert.equal(scan.writes_total, 11435);
  assert.equal(scan.commented_writes, 305);
  assert.equal(scan.dynamic_writes, 19);
  assert.equal(scan.per_index.size, 248);
  assert.equal(ranges.length, 106);
  assert.deepEqual(scan.shift_jis_files, [
    'target/ERB/調教相關/COMF90_ニプルファック.ERB',
  ]);
});
