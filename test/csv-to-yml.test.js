/**
 * @file tools/csv-to-yml.js 的契约测试（issue #17）。
 *
 * 两个重点：
 *   1. 产物边界——「默认不覆盖、显式 --force 才覆盖」必须有测试。
 *      #10 的原型曾因一句无条件删除让这条规则失效并销毁人工修改；
 *   2. 逐字段等价——用引擎两条静态加载路径（csv 分支与 yml 分支）的镜像
 *      互证：迁移前 CSV 与产出 YAML 在引擎里得到同一个 gamebase 对象。
 *
 * 已知限制：测试用迷你解析器代替引擎的 yaml-js，只认本脚本产出的
 * 「"键": 值」扁平格式。产出格式对引擎是否可解析，依据是引擎源码核读
 * 与最终的人工实机启动（见 AGENTS.md「静态数据目录」一节）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const {
  convert,
  convert_chara,
  engine_get_number,
  main,
  map_gamebase_key,
  parse_chara_csv,
  parse_gamebase_csv,
  read_text,
  to_chara_yaml,
  to_gamebase_yaml,
} = require('../tools/csv-to-yml');

// 迁移前 csv/GameBase.csv 的内容（ere 版，#2 落地；实测 UTF-8 无 BOM、LF）。
// 转换正确性的基准，不依赖仓库里已删除的那个文件。
const pre_migration_csv = [
  '游戏名称,ERA魔王 年度版（名字暂定）（PC only）',
  '作者,「人人为我，我为人人」',
  '追加信息,※未经允许，任何人不得引用、修改再打包或进行商业用途※',
  '发布时间,2011 - 2024！',
  '游戏标识,931060',
  '版本,93106',
  '版本代号,93106',
  '最低支持版本,93106',
  '',
].join('\n');

// 迁移前引擎读到的 gamebase（CSV 路径，字段为规范名）
const expected_gamebase = {
  title: 'ERA魔王 年度版（名字暂定）（PC only）',
  author: '「人人为我，我为人人」',
  info: '※未经允许，任何人不得引用、修改再打包或进行商业用途※',
  year: '2011 - 2024！',
  gameCode: 931060,
  version: 93106,
  versionName: 93106,
  allowVersion: 93106,
};

// —— 测试小工具 ——

// 临时目录夹具：用完即删，测试之间互不污染
async function with_temp_dir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-csv-to-yml-'));
  try {
    return await run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function write_file(dir, name, content) {
  const file = path.join(dir, name);
  fs.writeFileSync(file, content, 'utf8');
  return file;
}

// 捕获控制台输出，避免测试刷屏且可断言报告内容
function capture_console(run) {
  const captured = [];
  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  };
  for (const level of ['log', 'warn', 'error']) {
    console[level] = (...args) =>
      captured.push({ level, text: args.join(' ') });
  }
  try {
    return { result: run(), captured };
  } finally {
    Object.assign(console, original);
  }
}

// 迷你 YAML 解析：只认本脚本产出的「"键": 值」扁平映射。
// 引号内含转义（JSON 风格）；裸标量按 Number 解析，与本脚本的产出约定一致。
function parse_flat_yaml(text) {
  const result = {};
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const match = /^("(?:[^"\\]|\\.)*"):\s*(.*)$/.exec(trimmed);
    assert.ok(match, `无法解析的行：${line}`);
    const key = JSON.parse(match[1]);
    const raw = match[2];
    result[key] = raw.startsWith('"') ? JSON.parse(raw) : Number(raw);
  }
  return result;
}

// 引擎 yml/json 分支的镜像（background.js parseDataFile 模块 677 的对象路径）：
// Object.entries → 字符串元素过 getNumber → 键经 nameMapping.gamebase[小写] || 小写
function engine_yml_gamebase(yaml_text) {
  const object = parse_flat_yaml(yaml_text);
  const result = {};
  for (const [key, value] of Object.entries(object)) {
    result[map_gamebase_key(key)] =
      typeof value === 'string' ? engine_get_number(value) : value;
  }
  return result;
}

// 引擎 csv 分支的镜像（parseDataFile 的 csv 路径 + gamebase 分支）：
// 去 ; 注释 → 切分/trim/filter/getNumber → 丢单元素行 → 截前两列 → 键名映射
function engine_csv_gamebase(csv_text) {
  const stripped = csv_text.replace(/\s*;[^\n]*/g, '');
  const result = {};
  for (const line of stripped.split('\n')) {
    const cols = line
      .split(',')
      .map((cell) => cell.replace(/(^\s+|\s+$)/, ''))
      .filter(Boolean)
      .map(engine_get_number);
    if (cols.length < 2) {
      continue;
    }
    result[map_gamebase_key(cols[0])] = cols[1];
  }
  return result;
}

// 在临时目录里跑一次真实转换，返回产出的 YAML 文本
async function convert_fixture_csv(csv_text, { force = false } = {}) {
  return with_temp_dir(async (dir) => {
    const input = write_file(dir, 'GameBase.csv', csv_text);
    const output = path.join(dir, 'yml', 'GameBase.yml');
    const report = convert({ input, output, force });
    return {
      report,
      yaml: fs.readFileSync(output, 'utf8'),
      dir,
      input,
      output,
    };
  });
}

// —— 逐字段一致（issue #17 验收）——

test('产出 YAML 在引擎 yml 路径下与迁移前 CSV 逐字段等价', async () => {
  const { yaml } = await convert_fixture_csv(pre_migration_csv);
  const from_yml = engine_yml_gamebase(yaml);

  // 与迁移前 CSV 走引擎 csv 路径的结果互证
  assert.deepEqual(from_yml, engine_csv_gamebase(pre_migration_csv));
  // 与迁移前已知的游戏信息逐字段一致（规范名 + 类型）
  assert.deepEqual(from_yml, expected_gamebase);
});

test('游戏标识转换前后完全一致', async () => {
  const { yaml } = await convert_fixture_csv(pre_migration_csv);
  const gamebase = engine_yml_gamebase(yaml);

  assert.equal(gamebase.gameCode, 931060);
  assert.equal(typeof gamebase.gameCode, 'number');
  // 产出文本里也能逐字找到它（非 0x十六进制、非科学计数法等变体）
  assert.ok(yaml.includes('"游戏标识": 931060'));
});

// —— 键名加引号（issue #10 实测陷阱：引擎自带转换器裸写键名会坏）——

test('键名一律带双引号，含冒号/井号/首尾空格的键也安全', async () => {
  const { yaml } = await convert_fixture_csv(
    '带:冒号:键,值 # 井号\n带"引号"键,说"你好"\n',
  );

  for (const line of yaml.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    assert.match(
      trimmed,
      /^"(?:[^"\\]|\\.)*": /,
      `键名未加引号的行：${trimmed}`,
    );
  }

  // 冒号键原样往返，井号不被当注释吞掉
  const parsed = parse_flat_yaml(yaml);
  assert.equal(parsed['带:冒号:键'], '值 # 井号');
  assert.equal(parsed['带"引号"键'], '说"你好"');
});

// —— 产物边界：默认不覆盖 / 显式 --force 才覆盖（必须有测试）——

test('产物已存在时默认不覆盖，人工修改幸存', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'GameBase.csv', '游戏名称,测试\n');
    const output = write_file(dir, 'GameBase.yml', '人工修改过的产物');

    const report = convert({ input, output });

    assert.equal(report.status, 'skipped');
    assert.equal(fs.readFileSync(output, 'utf8'), '人工修改过的产物');
  });
});

test('显式 force 时才覆盖已存在的产物', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'GameBase.csv', '游戏名称,测试\n');
    const output = write_file(dir, 'GameBase.yml', '人工修改过的产物');

    const report = convert({ input, output, force: true });

    assert.equal(report.status, 'written');
    assert.notEqual(fs.readFileSync(output, 'utf8'), '人工修改过的产物');
    assert.ok(fs.readFileSync(output, 'utf8').includes('"游戏名称": "测试"'));
  });
});

test('CLI：无 --force 报跳过且不动产物，--force 报写出并替换', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'GameBase.csv', '游戏名称,测试\n');
    const output = write_file(dir, 'GameBase.yml', '人工修改过的产物');

    const skipped = capture_console(() => main([], { input, output }));
    assert.equal(skipped.result, 0);
    assert.equal(fs.readFileSync(output, 'utf8'), '人工修改过的产物');
    assert.ok(
      skipped.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('跳过 1 个'),
      ),
    );

    const written = capture_console(() => main(['--force'], { input, output }));
    assert.equal(written.result, 0);
    assert.ok(fs.readFileSync(output, 'utf8').includes('"游戏名称": "测试"'));
    assert.ok(
      written.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('写出 1 个'),
      ),
    );
  });
});

test('CLI：未知参数报用法（退出码 2），输入缺失报错（退出码 1）', async () => {
  const bogus = capture_console(() => main(['--bogus']));
  assert.equal(bogus.result, 2);
  assert.ok(
    bogus.captured.some(
      (entry) => entry.level === 'error' && entry.text.includes('未知参数'),
    ),
  );

  const missing = capture_console(() =>
    main([], { input: path.join(os.tmpdir(), '不存在.csv') }),
  );
  assert.equal(missing.result, 1);
  assert.ok(
    missing.captured.some((entry) => entry.level === 'error' && entry.text),
  );
});

// —— 引擎解析镜像的行为（防镜像与引擎源码漂移）——

test('getNumber 镜像：Number() 宽度（1e3、0x10 也转），非数值原样', () => {
  assert.equal(engine_get_number('931060'), 931060);
  assert.equal(engine_get_number('1e3'), 1000);
  assert.equal(engine_get_number('0x10'), 16);
  assert.equal(engine_get_number('2011 - 2024！'), '2011 - 2024！');
  assert.equal(
    engine_get_number('「人人为我，我为人人」'),
    '「人人为我，我为人人」',
  );
});

test('CSV 解析镜像：; 注释（整行/行内）、空行、CRLF、超两列截断', () => {
  const csv = [
    '; 整行注释',
    '游戏名称,名字;行内注释\r',
    '\r',
    '作者,作者值,多余列\r',
    '',
  ].join('\n');

  const { entries, warnings } = parse_gamebase_csv(csv);
  assert.deepEqual(entries, [
    ['游戏名称', '名字'],
    ['作者', '作者值'],
  ]);
  // 只有「超两列」一类告警（本夹具键不全，必填缺失告警由专门用例覆盖）
  const truncation_warnings = warnings.filter((warning) =>
    warning.includes('超过两列'),
  );
  assert.equal(truncation_warnings.length, 1);
  assert.ok(warnings.every((warning) => !warning.includes('重复')));
});

test('重复键后者覆盖（引擎对象语义）并告警，键名映射到规范名', () => {
  const { entries, warnings } = parse_gamebase_csv(
    '版本,1\n版本,2\nタイトル,标题\n',
  );
  assert.deepEqual(entries, [
    ['版本', 2],
    ['タイトル', '标题'],
  ]);
  assert.equal(
    warnings.filter((warning) => warning.includes('重复')).length,
    1,
  );

  assert.equal(map_gamebase_key('タイトル'), 'title');
  assert.equal(map_gamebase_key('GAMECODE'), 'gameCode'); // 小写规范名也被引擎补进映射
  assert.equal(map_gamebase_key('未知键'), '未知键'); // 未知键原样保留（引擎存而不读）
});

test('未知键与必填缺失都有告警，不静默丢弃', () => {
  const { entries, warnings } = parse_gamebase_csv('未知键,1\n');
  assert.deepEqual(entries, [['未知键', 1]]); // 条目保留
  assert.ok(
    warnings.some((warning) => warning.includes('不在引擎的 GameBase 键名表')),
  );
  for (const field of ['title', 'author', 'gameCode']) {
    assert.ok(
      warnings.some((warning) => warning.includes(`缺少必填字段「${field}」`)),
    );
  }
});

// —— 编码识别（issue #10 陷阱一）——

test('read_text：BOM 剥除、UTF-8 严格校验、Shift-JIS 兜底', async () => {
  await with_temp_dir((dir) => {
    const with_bom = write_file(dir, 'bom.csv', `\uFEFF游戏名称,名字\n`);
    const bom = read_text(with_bom);
    assert.equal(bom.enc, 'utf8-bom');
    assert.ok(!bom.text.includes('\uFEFF'));

    const plain = write_file(dir, 'plain.csv', '游戏名称,名字\n');
    assert.equal(read_text(plain).enc, 'utf8');

    // 0x89 0x53 不是合法 UTF-8 序列，应落到 Shift-JIS 兜底且无替换字符
    const sjis = path.join(dir, 'sjis.csv');
    fs.writeFileSync(sjis, Buffer.from([0x89, 0x53, 0x2c, 0x31]));
    const decoded = read_text(sjis);
    assert.equal(decoded.enc, 'shift_jis');
    assert.ok(!decoded.text.includes('\uFFFD'));
    assert.ok(decoded.text.includes(','));
  });
});

// —— 其他产出约束 ——

test('产出确定性：同输入两次转换逐字节一致，UTF-8 无 BOM、LF 换行', async () => {
  const first = to_gamebase_yaml(parse_gamebase_csv(pre_migration_csv).entries);
  const second = to_gamebase_yaml(
    parse_gamebase_csv(pre_migration_csv).entries,
  );
  assert.equal(first, second);
  assert.ok(!first.startsWith('\uFEFF'));
  assert.ok(!first.includes('\r'));
  assert.ok(first.endsWith('\n'));
});

test('空输入拒绝写出（GameBase 缺失引擎会拒绝启动）', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'GameBase.csv', '; 只有注释\n');
    const output = path.join(dir, 'yml', 'GameBase.yml');
    assert.throws(() => convert({ input, output }), /没有可用的 GameBase 条目/);
    assert.ok(!fs.existsSync(output));
  });
});

// —— 角色表（issue #35）——

// 角色表形状的样例输入：两列标量（番号/名前）、两列带缺省（素質,1,）、
// 三列（基礎/称呼）、同键多行（素質 折嵌套）
const chara_csv_sample = [
  '番号,0,',
  '名前,你,',
  '呼び名,你,',
  '基礎,0,10000',
  '基礎,1,10000',
  '素質,1,',
  '素質,122,',
  '称呼,3,主人',
].join('\r\n');

test('角色表：两列折标量、同键多行折嵌套、缺省值显式写出', () => {
  const { groups, warnings } = parse_chara_csv(chara_csv_sample);
  assert.deepEqual(warnings, []);

  const by_key = Object.fromEntries(
    groups.map((group) => [group.raw_key, group]),
  );
  assert.equal(by_key['番号'].kind, 'scalar');
  assert.equal(by_key['名前'].value, '你');
  assert.equal(by_key['素質'].kind, 'nested');
  // 两列行（素質,1,）折嵌套时显式写引擎缺省值 1；cstr 键的缺省是 ''
  assert.deepEqual(
    [...by_key['素質'].entries],
    [
      ['1', 1],
      ['122', 1],
    ],
  );
  assert.deepEqual(
    [...by_key['基礎'].entries],
    [
      ['0', 10000],
      ['1', 10000],
    ],
  );
  assert.deepEqual([...by_key['称呼'].entries], [['3', '主人']]);

  // 键名一律双引号；嵌套块风格缩进两空格；数值裸写、字符串加引号
  const yaml = to_chara_yaml(groups, { source: 'Chara0.csv' });
  assert.ok(yaml.includes('"番号": 0'));
  assert.ok(yaml.includes('"名前": "你"'));
  assert.ok(yaml.includes('"素質":\n  "1": 1\n  "122": 1'));
  assert.ok(yaml.includes('"称呼":\n  "3": "主人"'));
});

test('角色表：callname 混用两列/三列行拒绝转换（YAML 形状无法等价表达）', () => {
  assert.throws(
    () => parse_chara_csv('呼び名,X\n呼び名,1,同学\n'),
    /无法等价表达/,
  );
});

test('角色表：产物已存在默认不覆盖，--force 才重写（产物边界同样适用）', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'Chara0.csv', chara_csv_sample);
    const out_dir = path.join(dir, 'yml');
    fs.mkdirSync(out_dir);
    const output = write_file(out_dir, 'Chara0.yml', '人工修改过的产物');

    const skipped = convert_chara({ input, output });
    assert.equal(skipped.status, 'skipped');
    assert.equal(fs.readFileSync(output, 'utf8'), '人工修改过的产物');

    const written = convert_chara({ input, output, force: true });
    assert.equal(written.status, 'written');
    assert.ok(fs.readFileSync(output, 'utf8').includes('"番号": 0'));
  });
});

test('角色表：空输入拒绝写出', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'Chara0.csv', '; 只有注释\n');
    const output = path.join(dir, 'yml', 'Chara0.yml');
    assert.throws(
      () => convert_chara({ input, output }),
      /没有可用的角色预设行/,
    );
    assert.ok(!fs.existsSync(output));
  });
});

test('CLI：--chara 走角色表路径（skip/force/未知参数/缺参数）', async () => {
  await with_temp_dir((dir) => {
    write_file(dir, 'Chara0.csv', chara_csv_sample);
    const out_dir = path.join(dir, 'yml');

    const skipped = capture_console(() =>
      main(['--chara', '0'], { chara_dir: dir, chara_out_dir: out_dir }),
    );
    assert.equal(skipped.result, 0);
    const product = path.join(out_dir, 'Chara0.yml');
    assert.ok(fs.readFileSync(product, 'utf8').includes('"番号": 0'));
    assert.ok(
      skipped.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('写出 1 个'),
      ),
    );

    // 已存在 → 跳过且内容不动；--force → 重写
    fs.writeFileSync(product, '人工修改过的产物', 'utf8');
    const skipped_again = capture_console(() =>
      main(['--chara', '0'], { chara_dir: dir, chara_out_dir: out_dir }),
    );
    assert.equal(skipped_again.result, 0);
    assert.equal(fs.readFileSync(product, 'utf8'), '人工修改过的产物');
    assert.ok(
      skipped_again.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('跳过 1 个'),
      ),
    );

    const forced = capture_console(() =>
      main(['--chara', '0', '--force'], {
        chara_dir: dir,
        chara_out_dir: out_dir,
      }),
    );
    assert.equal(forced.result, 0);
    assert.ok(fs.readFileSync(product, 'utf8').includes('"番号": 0'));

    // --chara 不带参数 → 用法错误（退出码 2）
    const no_arg = capture_console(() => main(['--chara']));
    assert.equal(no_arg.result, 2);
    assert.ok(
      no_arg.captured.some(
        (entry) => entry.level === 'error' && entry.text.includes('--chara'),
      ),
    );
  });
});
