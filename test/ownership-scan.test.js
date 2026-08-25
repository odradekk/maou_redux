/**
 * @file tools/ownership-scan.js 的契约测试（issue #66 单表 → #70 全表实测 →
 * #133 文件级归属粒度）。
 *
 * 七个重点：
 *   1. 写入/读取分类 v2——小段源文本直接驱动：赋值/复合赋值/字符串赋值'/后缀
 *      ++--/TIMES/VARSET 全形态，含词边界（EX_CFLAG 等前缀变量不算表寻址）、
 *      名字下标（归一 + 解析 + 散文容忍）、VARSET 区间左闭右开；
 *   2. ignored_files 语义（#70 改判）——声明的文件必须存在（过期失效即报），
 *      其内容整体跳过测量（引擎不装载 = 死代码，TITLE.ERB 里的写入不算）；
 *   3. 域清单是数据——夹具域清单带一个工具从没见过的域；目录归属校验照旧；
 *   4. 产物边界——默认不覆盖、--force 才覆盖；--table 单表只写该表两份产物，
 *      reads-summary 只在 all 时写出；
 *   5. 同步守护——重跑真实 target/ 的 33 份产物，与库内产物比对一致；
 *   6. 锚点复现——#66 的 CFLAG 锚点在 v2 标准下完好（2xx+3xx 口上独占
 *      9447、零外部写入者），全表锚点（SOURCE/PALAM/STAIN 单域、GLOBAL
 *      仅系统、口上是最大的跨域读者）与 #66→#70 的统计核对数字固定；
 *   7. 文件级归属（#133）——files: 声明覆盖目录级、守卫（不存在/重复认领/
 *      形态）、导出规则（去偏 plurality，无票维持兜底）、
 *      真实锚点（其他/ 六子系统归属、cflag 服装段不再被兜底域切碎）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const {
  REPO_ROOT,
  TABLES,
  TABLE_KEYS,
  build_addr_re,
  classify_line,
  export_file_domains,
  generate,
  load_name_maps,
  main,
  parse_domains,
} = require('../tools/ownership-scan');

// —— 测试小工具 ——

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

// 域清单声明的目录与 ignored 文件都建出来（空内容即可）——归属校验要求
// 声明与实存一致：只建用到的目录会触发「数据过期失效」报错（那正是该校验的职责）
function ensure_domain_dirs(erb_root, domain_text) {
  let section = '';
  for (const line of domain_text.split('\n')) {
    const top = /^([a-z_]+):$/.exec(line.trim());
    if (top) {
      section = top[1];
      continue;
    }
    for (const key of ['dirs', 'files']) {
      const kv = new RegExp(`^ {2}${key}: (.+)$`).exec(line);
      if (kv) {
        for (const entry of kv[1]
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)) {
          const target = path.join(erb_root, ...entry.split('/'));
          if (key === 'dirs') {
            fs.mkdirSync(target, { recursive: true });
          } else if (!fs.existsSync(target)) {
            fs.writeFileSync(target, '', 'utf8'); // 文件级声明守卫：文件必须存在
          }
        }
      }
    }
    const item = section === 'ignored_files' ? /^ {2}- (.+)$/.exec(line) : null;
    if (item && !fs.existsSync(path.join(erb_root, item[1].trim()))) {
      fs.writeFileSync(path.join(erb_root, item[1].trim()), '', 'utf8');
    }
  }
}

// 夹具名字表目录：16 张表的名字表文件都要在（load_name_maps 缺文件即报），
// entries 只给需要的表喂条目，其余为空表（与 CFlag/TFlag 的空名字表同形）。
function make_name_dir(dir, entries) {
  const name_dir = path.join(dir, 'yml');
  fs.mkdirSync(name_dir, { recursive: true });
  for (const key of TABLE_KEYS) {
    const lines = entries[key] ? entries[key] : [];
    fs.writeFileSync(
      path.join(name_dir, TABLES[key].name_file),
      lines.map(([name, id]) => `"${name}":\n  id: ${id}\n`).join(''),
      'utf8',
    );
  }
  return name_dir;
}

// 在夹具树上跑一次完整生成（tables 参数选单表可缩小断言面）
async function generate_on_fixture(
  tree,
  { domains = FIXTURE_DOMAINS, names = {} } = {},
) {
  return with_fixture_tree(tree, async ({ dir, erb_root }) => {
    const domain_file = path.join(dir, 'domains.yml');
    fs.writeFileSync(domain_file, domains, 'utf8');
    ensure_domain_dirs(erb_root, domains);
    const name_dir = make_name_dir(dir, names);
    const result = generate({ domain_file, erb_root, name_dir });
    return { result, dir, erb_root, domain_file, name_dir };
  });
}

// 单行分类的快捷断言（默认 cflag 表；名字表条目按需注入）。
// 用全表联合正则——与真实扫描同一形态（TFLAG/FLAG 的词边界交互靠它暴露）。
const COMBINED_ADDR_RE = build_addr_re(
  TABLE_KEYS.map((key) => TABLES[key].variable),
);
function classify(source, { table = 'cflag', names = {} } = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-cls-'));
  try {
    const name_dir = make_name_dir(dir, names);
    const { writes, reads } = classify_line(
      source,
      COMBINED_ADDR_RE,
      load_name_maps(name_dir),
      null,
      '',
    );
    const pick = (list) => list.filter((e) => e.table === table);
    return { writes: pick(writes), reads: pick(reads) };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// —— 写入/读取分类：直接寻址 ——

test('写入判定：赋值与复合赋值计入，比较形态（== >= <= != < >）不计', () => {
  assert.deepEqual(classify('CFLAG:322 = 1').writes, [
    { table: 'cflag', index: 322 },
  ]);
  assert.deepEqual(classify('CFLAG:TARGET:344 += 1').writes, [
    { table: 'cflag', index: 344 },
  ]);
  // 括号角色槽：#66 当时就有的第三种寻址形态
  assert.deepEqual(classify('CFLAG:(ARG:0):13 *= 2').writes, [
    { table: 'cflag', index: 13 },
  ]);
  for (const [source, expected] of [
    ['CFLAG:301 -= 5', 301],
    ['CFLAG:301 /= 2', 301],
    ['CFLAG:301 |= 0x10', 301],
    ['CFLAG:301 &= 255', 301],
    ['CFLAG:301 ^= 3', 301],
    ['CFLAG:301 <<= 1', 301],
    ['CFLAG:301 >>= 1', 301],
  ]) {
    assert.deepEqual(classify(source).writes, [
      { table: 'cflag', index: expected },
    ]);
  }

  assert.deepEqual(classify('IF CFLAG:301 == 1').reads, [
    { table: 'cflag', index: 301 },
  ]);
  for (const source of [
    'SIF CFLAG:5 >= 3',
    'SIF CFLAG:5 <= 3',
    'SIF CFLAG:5 != 0',
    'SIF CFLAG:5 < 3',
    'SIF CFLAG:5 > 3',
  ]) {
    assert.deepEqual(
      classify(source).reads,
      [{ table: 'cflag', index: 5 }],
      source,
    );
  }
});

test("写入判定 v2：字符串赋值 '= 与后缀 ++/--（有无空格）都计入", () => {
  // '= 字符串赋值：CSTR/NINSIN 的活代码形态
  assert.deepEqual(
    classify(`CSTR:ARG:2 '= SAVESTR:L_父亲`, { table: 'cstr' }).writes,
    [{ table: 'cstr', index: 2 }],
  );
  // 后缀 ++/--：#66 负检查只对 CFLAG 字面量形态成立，ABL/MARK/CFLAG 上实存
  assert.deepEqual(classify('ABL:15 ++', { table: 'abl' }).writes, [
    { table: 'abl', index: 15 },
  ]);
  assert.deepEqual(classify('ABL:3++', { table: 'abl' }).writes, [
    { table: 'abl', index: 3 },
  ]);
  assert.deepEqual(classify('MARK:3 --', { table: 'mark' }).writes, [
    { table: 'mark', index: 3 },
  ]);
  assert.deepEqual(classify('CFLAG:PM:508 --').writes, [
    { table: 'cflag', index: 508 },
  ]);
  // 算术负检查：单 + / 单 - 不是自增
  assert.deepEqual(classify('CFLAG:3 + 1').writes, []);
  assert.deepEqual(classify('CFLAG:3 - 1').writes, []);
});

test('读取判定：右值、PRINTFORM 引用计入；同行的写入目标不计读', () => {
  assert.deepEqual(classify('CFLAG:301 = CFLAG:302 + 1').writes, [
    { table: 'cflag', index: 301 },
  ]);
  assert.deepEqual(classify('CFLAG:301 = CFLAG:302 + 1').reads, [
    { table: 'cflag', index: 302 },
  ]);
  assert.deepEqual(classify('LOCAL = CFLAG:301').reads, [
    { table: 'cflag', index: 301 },
  ]);
  assert.deepEqual(classify('PRINTFORM {CFLAG:301,3}').reads, [
    { table: 'cflag', index: 301 },
  ]);
});

test('动态下标：ASCII 标识符与括号表达式计入但下标为 null（无归属事实）', () => {
  assert.deepEqual(classify('CFLAG:COUNT = 0').writes, [
    { table: 'cflag', index: null },
  ]);
  assert.deepEqual(classify('CFLAG:ARG:(LOCAL:1) = 0').writes, [
    { table: 'cflag', index: null },
  ]);
});

test('词边界：包含表名的其他变量不算本表寻址（EX_CFLAG/LOSEBASE/NOWEX/TFLAG）', () => {
  // 语料实证：EX_CFLAG:A:99 = CFLAG:A:800（其他/DATA_FIX.ERB:94）——#66 把
  // 其中的 CFLAG:A:99 记成了 CFLAG 写入；正确结果只有右值一次读（800）
  const ex = classify('EX_CFLAG:A:99 = CFLAG:A:800');
  assert.deepEqual(ex.writes, []);
  assert.deepEqual(ex.reads, [{ table: 'cflag', index: 800 }]);
  assert.deepEqual(classify('NOWEX:5 = 1', { table: 'ex' }).writes, []);
  assert.deepEqual(classify('LOSEBASE:0 = 1', { table: 'base' }).writes, []);
  assert.deepEqual(classify('LOVE_EXP:0 = 1', { table: 'exp' }).writes, []);
  assert.deepEqual(classify('SELECT_FLAG:1 = 1', { table: 'flag' }).writes, []);
  // TFLAG 不是 FLAG：表名前是词字符（T）即被负向后行挡住
  assert.deepEqual(classify('TFLAG:1 = 1', { table: 'flag' }).writes, []);
  assert.deepEqual(classify('TFLAG:1 = 1', { table: 'tflag' }).writes, [
    { table: 'tflag', index: 1 },
  ]);
  // CJK 变量名槽位（#66 漏写形态：CFLAG:L_孩子:1 = 0）
  assert.deepEqual(classify('CFLAG:L_孩子:1 = 0').writes, [
    { table: 'cflag', index: 1 },
  ]);
});

// —— 名字下标 ——

test('名字下标：解析为名字表下标；代码里的繁/日形态先归一再查表', () => {
  const names = {
    talent: [
      ['甲素质', 7],
      ['恢复', 42],
    ],
  };
  assert.deepEqual(
    classify('TALENT:TARGET:甲素质 = 1', { table: 'talent', names }).writes,
    [{ table: 'talent', index: 7 }],
  );
  // 语料实证：代码写 精巣妊娠、名字表存 精巢妊娠；此处用词级映射 回復→恢复
  assert.deepEqual(
    classify('TALENT:TARGET:回復 = 1', { table: 'talent', names }).writes,
    [{ table: 'talent', index: 42 }],
  );
  // 算术贴附：段在 - 处断开，名字照常解析（语料形态：(TALENT:头发长度-1)/100）
  assert.deepEqual(
    classify('CALL X((TALENT:甲素质-1)/100)', { table: 'talent', names }).reads,
    [{ table: 'talent', index: 7 }],
  );
});

test('名字下标：归一后查不到 = 实活代码报错、注释散文跳过', async () => {
  await assert.rejects(
    generate_on_fixture({
      甲: [['A.ERB', 'TALENT:TARGET:甲素质 = 1\n']],
    }),
    /名字下标.*甲素质/,
  );
  // 注释里的散文（;CFLAG:0が1=売却可）不算注释写入，也不算读
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', ';CFLAG:0が1=売却可\nCFLAG:2 = 1\n']],
  });
  assert.equal(result.tables.get('cflag').scan.commented_writes, 0);
  assert.equal(result.tables.get('cflag').scan.writes_total, 1);
});

// —— VARSET / CVARSET / TIMES ——

test('VARSET：字面量区间逐下标计入，[起, 止) 左闭右开；槽位维不入测量', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', 'VARSET TFLAG, 0, 0, 30\nVARSET TALENT:A:0, 0, 160, 180\n']],
  });
  const tflag = result.tables.get('tflag').scan;
  assert.equal(tflag.writes_total, 30);
  assert.ok(tflag.per_index.has(0));
  assert.ok(tflag.per_index.has(29));
  assert.ok(!tflag.per_index.has(30)); // 止端排除（引擎手册：结束索引不包含）
  const talent = result.tables.get('talent').scan;
  assert.equal(talent.writes_total, 20);
  assert.ok(talent.per_index.has(160));
  assert.ok(!talent.per_index.has(180));
  // 命令行的目标寻址不再计读
  assert.equal(tflag.reads_total, 0);
});

test('VARSET：整表/动态区间只计总数与按域，不进下标聚合', async () => {
  const { result } = await generate_on_fixture({
    甲: [
      ['A.ERB', 'VARSET PALAM, 0\nVARSET FLAG, 0, X, Y\nVARSET L_CHARAS, -1\n'],
    ],
  });
  const palam = result.tables.get('palam').scan;
  assert.equal(palam.writes_total, 1);
  assert.equal(palam.per_index.size, 0);
  const flag = result.tables.get('flag').scan;
  assert.equal(flag.writes_total, 1); // VARSET FLAG, 0, X, Y → 动态区间
  assert.equal(flag.per_index.size, 0);
});

test('CVARSET：元素索引维计入（语料只落在未落地表，此处钉通用行为）', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', 'CVARSET MARK, 3, 0\n']],
  });
  const mark = result.tables.get('mark').scan;
  assert.equal(mark.writes_total, 1);
  assert.equal(mark.per_index.get(3)?.get('alpha'), 1);
});

test('TIMES：乘法赋值计入写入、不计读', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', 'TIMES SOURCE:13 , 3.00\nTIMES LOCAL, 2.00\n']],
  });
  const source = result.tables.get('source').scan;
  assert.equal(source.writes_total, 1);
  assert.equal(source.reads_total, 0);
  assert.equal(source.per_index.get(13)?.get('alpha'), 1);
});

// —— ignored_files 语义（#70 改判）——

test('ignored 文件：整体跳过测量（死代码），声明了不存在的文件报错', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', 'CFLAG:1 = 1\n']],
    '(root)': [['TITLE.ERB', 'GLOBAL:98 = 1\nCFLAG:9 = 9\n']],
  });
  assert.equal(result.tables.get('global').scan.writes_total, 0);
  assert.equal(result.tables.get('cflag').scan.writes_total, 1);

  // 声明了不存在的文件 = 数据过期失效（不走 ensure_domain_dirs——它会替清单
  // 把声明的文件建出来，而本用例要的正是「声明了但不存在」）
  await with_fixture_tree(
    { 甲: [['A.ERB', '']] },
    async ({ dir, erb_root }) => {
      fs.mkdirSync(path.join(erb_root, '乙'), { recursive: true });
      const domain_file = path.join(dir, 'domains.yml');
      fs.writeFileSync(
        domain_file,
        FIXTURE_DOMAINS.replace('  - TITLE.ERB', '  - TITLE.ERB\n  - GONE.ERB'),
        'utf8',
      );
      fs.writeFileSync(path.join(erb_root, 'TITLE.ERB'), '', 'utf8');
      assert.throws(
        () =>
          generate({
            domain_file,
            erb_root,
            name_dir: make_name_dir(dir, {}),
          }),
        /不存在.*GONE/,
      );
    },
  );
});

// —— 区间与属主（#66 裁定沿用）——

test('区间合并：相邻同属主合并、未写入的下标断开、单下标不写区间号', async () => {
  const { result } = await generate_on_fixture({
    甲: [['A.ERB', 'CFLAG:1 = 1\nCFLAG:2 = 1\nCFLAG:3 = 1\nCFLAG:5 = 1\n']],
  });
  assert.deepEqual(
    result.tables
      .get('cflag')
      .ranges.map((range) =>
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
    result.tables
      .get('cflag')
      .ranges.map((range) => [range.start, range.owner]),
  );
  assert.equal(owner_of[9], 'beta'); // 2 比 1 多
  assert.equal(owner_of[8], 'alpha'); // 1 比 1 并列，alpha 声明在先
});

test('跨域写入清单：非属主写入逐条具名，排序确定；VARSET 展开的写入同列', async () => {
  const { result } = await generate_on_fixture({
    乙: [['B.ERB', 'CFLAG:5 = 1\nCFLAG:5 = 1\nVARSET TFLAG, 0, 0, 3\n']],
    甲: [['A.ERB', 'CFLAG:5 = 1\nCFLAG:6 = 1\nTFLAG:0 = 1\n']],
  });
  const cflag = result.tables.get('cflag');
  assert.equal(cflag.cross.length, 1);
  const [entry] = cflag.cross;
  assert.equal(entry.index, 5);
  assert.equal(entry.domain, 'alpha');
  assert.equal(entry.owner, 'beta');
  assert.ok(entry.file.endsWith('甲/A.ERB'));
  assert.equal(entry.line, 1);
  // tflag 0-2：beta 的 VARSET 各 1 次、alpha 的 TFLAG:0 = 1 次——下标 0 并列
  // 1:1，按声明序属主 alpha，beta 的 VARSET 写入即为跨域（VARSET 展开同列清单）
  const tflag = result.tables.get('tflag');
  assert.equal(tflag.cross.length, 1);
  assert.deepEqual(
    {
      index: tflag.cross[0].index,
      writer: tflag.cross[0].domain,
      owner: tflag.cross[0].owner,
    },
    { index: 0, writer: 'beta', owner: 'alpha' },
  );
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
    { domains },
  );
  const cflag = result.tables.get('cflag');
  assert.equal(cflag.scan.writes_by_domain.get('custom'), 1);
  assert.equal(cflag.ranges[0].owner, 'custom');
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

test('目录归属校验：认领了不存在的目录报错（数据过期失效）', async () => {
  await with_fixture_tree(
    { 甲: [['A.ERB', '']] },
    async ({ dir, erb_root }) => {
      const domain_file = path.join(dir, 'domains.yml');
      fs.writeFileSync(
        domain_file,
        'alpha:\n  label: 甲域\n  dirs: 甲, 戊\n',
        'utf8',
      );
      assert.throws(
        () =>
          generate({ domain_file, erb_root, name_dir: make_name_dir(dir, {}) }),
        /不存在.*戊/,
      );
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

// —— 文件级归属（#133：一级目录 → 文件级）——

test('文件级归属：files: 覆盖目录级，其余文件仍随目录', async () => {
  const domains = [
    '# 夹具：甲目录整体归 alpha，其中 例外.ERB 改归 beta',
    'alpha:',
    '  label: 甲域',
    '  dirs: 甲',
    'beta:',
    '  label: 乙域',
    '  dirs: 乙',
    '  files: 甲/例外.ERB',
    'ignored_files:',
    '  - TITLE.ERB',
  ].join('\n');
  const { result } = await generate_on_fixture(
    {
      甲: [
        ['A.ERB', 'CFLAG:1 = 1\n'],
        ['例外.ERB', 'CFLAG:2 = 1\nCFLAG:1 = 1\n'],
      ],
    },
    { domains },
  );
  const cflag = result.tables.get('cflag');
  // A.ERB 随目录归 alpha；例外.ERB 按文件级归 beta（两次写入都记 beta 名下）
  assert.equal(cflag.scan.writes_by_domain.get('alpha'), 1);
  assert.equal(cflag.scan.writes_by_domain.get('beta'), 2);
  const owner_of = Object.fromEntries(
    cflag.ranges.map((range) => [range.start, range.owner]),
  );
  assert.equal(owner_of[1], 'alpha'); // 1:1 并列按声明序 alpha 先
  assert.equal(owner_of[2], 'beta');
  // 跨域写清单按文件级归属判定：beta 的 例外.ERB 写 alpha 属主的下标 1
  assert.equal(cflag.cross.length, 1);
  assert.deepEqual(
    { index: cflag.cross[0].index, writer: cflag.cross[0].domain },
    { index: 1, writer: 'beta' },
  );
});

test('文件级守卫：声明的文件不存在报错（数据过期失效）', async () => {
  const domains = [
    'alpha:',
    '  label: 甲域',
    '  dirs: 甲',
    '  files: 甲/GONE.ERB',
    'ignored_files:',
    '  - TITLE.ERB',
  ].join('\n');
  await with_fixture_tree(
    { 甲: [['A.ERB', '']] },
    async ({ dir, erb_root }) => {
      const domain_file = path.join(dir, 'domains.yml');
      fs.writeFileSync(domain_file, domains, 'utf8');
      assert.throws(
        () =>
          generate({
            domain_file,
            erb_root,
            name_dir: make_name_dir(dir, {}),
          }),
        /文件级声明了不存在的文件.*GONE/,
      );
    },
  );
});

test('文件级守卫：一个文件被两个域认领、路径形态不对都报错', () => {
  assert.throws(
    () =>
      parse_domains(
        [
          'alpha:',
          '  label: 甲',
          '  dirs: 甲',
          '  files: 甲/X.ERB',
          'beta:',
          '  label: 乙',
          '  dirs: 乙',
          '  files: 甲/X.ERB',
        ].join('\n'),
      ),
    /文件 甲\/X\.ERB .*重复认领/,
  );
  // 根文件（无目录前缀）不参与归属——那是 ignored_files 的地盘
  assert.throws(
    () =>
      parse_domains('alpha:\n  label: 甲\n  dirs: 甲\n  files: TITLE.ERB\n'),
    /形态不对/,
  );
});

test('文件级导出：基线剔除目标目录后按 plurality 归属；无票维持兜底', async () => {
  // 丙 = 导出目标目录（目录级归 alpha，合租语义）；甲乙提供基线写入
  const domains = [
    'alpha:',
    '  label: 甲域',
    '  dirs: 甲, 丙',
    'beta:',
    '  label: 乙域',
    '  dirs: 乙',
    'ignored_files:',
    '  - TITLE.ERB',
  ].join('\n');
  const rows = await with_fixture_tree(
    {
      甲: [['A.ERB', 'CFLAG:5 = 1\n']],
      乙: [['B.ERB', 'CFLAG:5 = 1\nCFLAG:5 = 1\nCFLAG:5 = 1\n']],
      丙: [
        // F1 写基线属主明确的下标（beta 独占）→ 导出 beta
        ['F1.ERB', 'CFLAG:5 = 1\nCFLAG:5 = 1\nCFLAG:5 = 1\n'],
        // F2 只写没人写的下标 → 剔除后无基线属主 → 无票，维持目录级兜底
        ['F2.ERB', 'CFLAG:9 = 1\n'],
      ],
    },
    async ({ dir, erb_root }) => {
      const domain_file = path.join(dir, 'domains.yml');
      fs.writeFileSync(domain_file, domains, 'utf8');
      ensure_domain_dirs(erb_root, domains);
      return export_file_domains({
        domain_file,
        erb_root,
        name_dir: make_name_dir(dir, {}),
        target_dir: '丙',
      });
    },
  );
  const by_file = Object.fromEntries(rows.map((row) => [row.file, row]));
  // 去偏：F1 的三票全落基线属主 beta（若不剔除丙，alpha 兜底票会打成 alpha）
  assert.deepEqual(by_file['丙/F1.ERB'].votes, [['beta', 3]]);
  assert.equal(by_file['丙/F1.ERB'].winner, 'beta');
  // F2 唯一写入的下标 9 剔除丙后无任何写入者 → 无票
  assert.equal(by_file['丙/F2.ERB'].winner, null);
  assert.equal(by_file['丙/F2.ERB'].unowned, 1);
});

test('文件级导出：目标目录不在域清单认领里报错', () => {
  assert.throws(
    () =>
      export_file_domains({
        domain_file: path.join(REPO_ROOT, 'ownership', 'domains.yml'),
        target_dir: '不存在的目录',
      }),
    /不在域清单的目录认领里/,
  );
});

test('编码按内容判定：Shift-JIS 文件里的写入不漏（工单陷阱）', async () => {
  await with_fixture_tree({ '(root)': [] }, async ({ dir, erb_root }) => {
    fs.mkdirSync(path.join(erb_root, '甲'), { recursive: true });
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
    const result = generate({
      domain_file,
      erb_root,
      name_dir: make_name_dir(dir, {}),
    });
    const cflag = result.tables.get('cflag');
    assert.equal(result.scan.shift_jis_files.length, 1);
    assert.ok(result.scan.shift_jis_files[0].endsWith('甲/SJIS.ERB'));
    assert.equal(cflag.scan.writes_total, 1);
    assert.equal(cflag.scan.per_index.get(322)?.get('alpha'), 1);
  });
});

// —— 产物边界与 CLI ——

test('产物边界：已存在默认跳过（人工修改幸存），--force 才重写', async () => {
  const tree = { 甲: [['A.ERB', 'CFLAG:1 = 1\n']] };
  await with_fixture_tree(tree, async ({ dir, erb_root }) => {
    const domain_file = path.join(dir, 'domains.yml');
    fs.writeFileSync(domain_file, FIXTURE_DOMAINS, 'utf8');
    ensure_domain_dirs(erb_root, FIXTURE_DOMAINS);
    const name_dir = make_name_dir(dir, {});
    const out_dir = path.join(dir, 'ownership');
    fs.mkdirSync(out_dir, { recursive: true });
    for (const name of [
      'cflag-ownership.yml',
      'cflag-cross-domain-writes.yml',
      'reads-summary.yml',
    ]) {
      fs.writeFileSync(path.join(out_dir, name), '人工修改过的产物', 'utf8');
    }

    // --table cflag：只碰该表两份产物，reads-summary 不动
    const skipped = capture_console(() =>
      main(['--table', 'cflag'], { domain_file, erb_root, name_dir, out_dir }),
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
      main(['--force', '--table', 'cflag'], {
        domain_file,
        erb_root,
        name_dir,
        out_dir,
      }),
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
    // reads-summary 仍幸存（--table all 才写它）
    assert.equal(
      fs.readFileSync(path.join(out_dir, 'reads-summary.yml'), 'utf8'),
      '人工修改过的产物',
    );

    const all = capture_console(() =>
      main(['--force'], { domain_file, erb_root, name_dir, out_dir }),
    );
    assert.equal(all.result, 0);
    assert.notEqual(
      fs.readFileSync(path.join(out_dir, 'reads-summary.yml'), 'utf8'),
      '人工修改过的产物',
    );
    assert.ok(
      all.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('写出 33 个'),
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

  const unknown_table = capture_console(() => main(['--table', 'nosuch']));
  assert.equal(unknown_table.result, 1);
  assert.ok(
    unknown_table.captured.some((entry) => entry.text.includes('未知表名')),
  );
});

// —— 真实 target/：同步守护与锚点 ——
//
// 全树扫描一次约 1s，整个文件共享一次生成结果（target/ 只读，结果稳定）。
let cached_real = null;
function real_generate() {
  cached_real ??= generate({});
  return cached_real;
}

test('同步守护：16 张表的所有权表与跨域清单、reads-summary 与重跑逐字节一致', () => {
  const result = real_generate();
  const files = [
    ...TABLE_KEYS.flatMap((key) => [
      `${key}-ownership.yml`,
      `${key}-cross-domain-writes.yml`,
    ]),
    'reads-summary.yml',
  ];
  assert.equal(files.length, 33);
  for (const name of files) {
    assert.equal(
      fs.readFileSync(path.join(REPO_ROOT, 'ownership', name), 'utf8'),
      name.endsWith('ownership.yml')
        ? result.tables.get(name.replace(/-ownership\.yml$/, '')).ownership_yaml
        : name === 'reads-summary.yml'
          ? result.reads_summary_yaml
          : result.tables.get(name.replace(/-cross-domain-writes\.yml$/, ''))
              .cross_yaml,
      `${name} 与重跑结果不一致`,
    );
  }
});

test('锚点复现：CFLAG 2xx+3xx 口上独占——实活 9447 次写入、零外部写入者（v2 标准下依然成立）', () => {
  const { scan } = real_generate().tables.get('cflag');
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
  const { scan } = real_generate().tables.get('cflag');
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

test('锚点复现：CFLAG 全量数字与编码（#66→#70 统计核对、#133 文件级重跑后的区间/跨域数）', () => {
  const { scan, ranges, cross } = real_generate().tables.get('cflag');
  // 核对（issue #70 评论）：11435 → 11439 = −2 假写（EX_CFLAG 词边界）
  // +4 漏写（CJK 槽位变量 L_孩子）+2 后缀 ++/--；读 15543 → 15529 同源。
  // 写入/读取/下标数不受归属粒度影响（#133 只改写入记在谁名下）；
  // 区间 104 → 102、跨域写 740 → 675：其他/ 六文件改归各域后服装段
  // （40-48）的多块碎片按 plurality 重新合并（见文件级锚点用例）。
  // 675 → 677：#134 撤销 EQUIP.ERB 的文件级声明（回落 system，ADR-0007）后，
  // 它那 2 处 cflag 写从域内写变成 system→event 跨域写。
  assert.equal(scan.writes_total, 11439);
  assert.equal(scan.commented_writes, 307);
  assert.equal(scan.dynamic_writes, 19);
  assert.equal(scan.reads_total, 15529);
  assert.equal(scan.per_index.size, 247);
  assert.equal(ranges.length, 102);
  assert.equal(cross.length, 677);
  assert.deepEqual(real_generate().scan.shift_jis_files, [
    'target/ERB/調教相關/COMF90_ニプルファック.ERB',
  ]);
});

test('锚点复现：调教四表近乎私有（SOURCE/PALAM/STAIN 全区间属主 train）', () => {
  const result = real_generate();
  for (const key of ['source', 'palam', 'stain']) {
    const owners = new Set(
      result.tables.get(key).ranges.map((range) => range.owner),
    );
    assert.deepEqual([...owners], ['train'], `${key} 应为 train 私有`);
  }
  // TEQUIP 12 区间里 10 个属 train（系统/事件各 1 个外溢）
  const tequip = result.tables.get('tequip');
  const by_owner = new Map();
  for (const range of tequip.ranges) {
    by_owner.set(range.owner, (by_owner.get(range.owner) ?? 0) + 1);
  }
  assert.equal(by_owner.get('train'), 10);
});

test('锚点复现：GLOBAL 只有系统域写入（TITLE.ERB 的死代码写入已跳过）', () => {
  const { scan, ranges } = real_generate().tables.get('global');
  assert.equal(scan.writes_total, 2);
  assert.deepEqual([...scan.writes_by_domain.entries()], [['system', 2]]);
  assert.deepEqual(
    ranges.map((range) => range.owner),
    ['system'],
  );
});

test('锚点复现：九域都拥有真实区段（无纯客户端域）——八域划分成立', () => {
  const result = real_generate();
  const owned = new Map();
  for (const [, table] of result.tables) {
    for (const range of table.ranges) {
      owned.set(range.owner, (owned.get(range.owner) ?? 0) + 1);
    }
  }
  // 九域 = 八玩法域 + patch（#66 单列）；各自至少 5 个区段
  assert.deepEqual([...owned.keys()].sort(), [
    'chara',
    'dungeon',
    'event',
    'invasion',
    'kojo',
    'patch',
    'stronghold',
    'system',
    'train',
  ]);
  for (const [domain, count] of owned) {
    assert.ok(
      count >= 5,
      `域 ${domain} 只拥有 ${count} 个区段（应为有实义的最少 5 个）`,
    );
  }
});

test('锚点复现：口上是最大的跨域读者（跨域读放行决议的数据面）', () => {
  const result = real_generate();
  const by_reader = new Map();
  for (const [, table] of result.tables) {
    const { scan, owner_of_index } = table;
    for (const [index, per] of scan.reads_by_index) {
      const owner = owner_of_index.get(index);
      if (owner === undefined) {
        continue;
      }
      for (const [reader, count] of per) {
        if (reader !== owner) {
          by_reader.set(reader, (by_reader.get(reader) ?? 0) + count);
        }
      }
    }
  }
  const ranked = [...by_reader.entries()].sort((a, b) => b[1] - a[1]);
  assert.equal(ranked[0][0], 'kojo');
  // 与跨域写的量级对照：读 ~4.3 万次、写 ~2.5 千次——放行读、具名写的依据
  const total = ranked.reduce((sum, [, count]) => sum + count, 0);
  assert.ok(
    total > 40000 && total < 45000,
    `跨域读总量 ${total} 应在 4 万–4.5 万`,
  );
});

// —— 真实 target/：文件级归属锚点（#133）——

test('文件级锚点：其他/ 六子系统的归属＝导出规则的 plurality 结果', () => {
  const { domains } = real_generate();
  // EQUIP.ERB 不在此表：导出规则**仍会**算出 event（3 票 2:1，可复算
  // `node tools/ownership-scan.js --export 其他`），但 #134 裁定有意不采纳——
  // 它无域状态（1114 行里 300+ 处赋值落局部数组 W:n，自身持久写入仅 6 处），
  // ADR-0002 的写入区段判据对它不适用，故回落 system 兜底。**采纳与否是裁定、
  // 不是工具行为**，所以这里断言的是「已采纳的文件级声明」而非「导出结果」。
  // 依据见 ADR-0007 与 ownership/domains.yml 的 system 块注释。
  assert.deepEqual(
    Object.fromEntries([...domains.file_to_domain.entries()].sort()),
    {
      '其他/FUNC_CLOTH.ERB': 'train',
      '其他/LOVERS.ERB': 'dungeon',
      '其他/MAGIC.ERB': 'dungeon',
      '其他/NINSIN.ERB': 'chara',
      '其他/USE_EX_ITEM.ERB': 'dungeon',
    },
  );
  // 反向钉住裁定：EQUIP.ERB 必须不带文件级声明（有人把它加回来即红）
  assert.equal(
    domains.file_to_domain.has('其他/EQUIP.ERB'),
    false,
    'EQUIP.ERB 无域状态，不得有文件级归属声明（#134 裁定 / ADR-0007）',
  );
});

test('文件级锚点：cflag 服装段不再被兜底域切碎（#106 的证据表被推翻）', () => {
  const cflag = real_generate().tables.get('cflag');
  // 目录级下 40-49 被切成六块分属三域（40-41/43/46-47 system、42 chara、
  // 44-45/48-49 stronghold），其中 system 块的票是 其他/ 整目录兜底贡献的；
  // FUNC_CLOTH 归 train 后，写入最多的域拿下 40-41/43/45-48（42/44/49 仍归
  // plurality 写入者 chara/stronghold——属主判定没有因粒度改变而放宽）。
  const owners = [];
  for (let i = 40; i <= 49; i += 1) {
    owners.push(cflag.owner_of_index.get(i));
  }
  assert.deepEqual(owners, [
    'train', // 40
    'train', // 41
    'chara', // 42
    'train', // 43
    'stronghold', // 44
    'train', // 45
    'train', // 46
    'train', // 47
    'train', // 48
    'stronghold', // 49
  ]);
});

test('文件级锚点：全表跨域写 2652 → 2477（其他/ 拆出后域内写变多）', () => {
  const result = real_generate();
  const total = TABLE_KEYS.reduce(
    (sum, key) => sum + result.tables.get(key).cross.length,
    0,
  );
  // #70 目录级 2652；#133 文件级：其他/ 六文件的写入记到真实耦合域名下，
  // 原来按 system 兜底记的跨域写大量转为域内写（−177）。#134 撤销 EQUIP.ERB
  // 的声明后回补 +2（它那 2 处 cflag 写重新成为跨域写），净 −175。
  assert.equal(total, 2477);
});

test('文件级导出可复算：--export 其他 的 plurality 结果（与是否采纳无关）', () => {
  const rows = export_file_domains({ target_dir: '其他' });
  const by_file = new Map(rows.map((row) => [row.file, row.winner]));
  // 五个声明的文件导出结果与 ownership/domains.yml 的 files: 完全一致；
  // 有票但未声明的文件（DATA_FIX/NTR 等）同样给出结果，留待后续按需声明
  assert.equal(by_file.get('其他/FUNC_CLOTH.ERB'), 'train');
  assert.equal(by_file.get('其他/NINSIN.ERB'), 'chara');
  assert.equal(by_file.get('其他/LOVERS.ERB'), 'dungeon');
  assert.equal(by_file.get('其他/MAGIC.ERB'), 'dungeon');
  assert.equal(by_file.get('其他/USE_EX_ITEM.ERB'), 'dungeon');
  // EQUIP.ERB 是「导出有结果、裁定不采纳」的唯一一例（#134 / ADR-0007）：
  // 本断言钉住**导出规则未因该裁定而改动**——它仍算出 event（3 票 2:1）。
  // 与上一条「清单里不得有 EQUIP 声明」的断言形成对照：工具照算，人不采纳。
  assert.equal(by_file.get('其他/EQUIP.ERB'), 'event');
  // MAOUNET 的两次写入都无基线属主 → 无票，维持兜底
  assert.equal(
    rows.find((row) => row.file === '其他/MAOUNET.ERB').winner,
    null,
  );
});
