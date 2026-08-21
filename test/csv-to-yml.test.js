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
  REPO_ROOT,
  convert,
  convert_chara,
  convert_variable,
  engine_get_number,
  main,
  map_gamebase_key,
  parse_chara_csv,
  parse_gamebase_csv,
  parse_variable_csv,
  read_text,
  to_chara_yaml,
  to_gamebase_yaml,
  to_variable_yaml,
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

// —— 同步守护：入库产物与源 CSV 的转换结果不得漂移 ——
//
// 引擎比对（test/chara-yml.test.js）对 `基礎`/`素質` 这类预设行天然盲：
// Base/Talent 表尚未进 yml/，引擎装载时两侧同样丢弃它们，产物里的值改坏也
// 看不出来（验收变异实测：把 "素質" 的 1 改成 0，129 条全绿）。本用例
// 不经引擎、直接比对转换结果，把产物的每一个字节钉住。
// #38 起 Base/Talent 已入库，引擎比对不再盲，但守护继续留守：它盯的是
// 字节而非装载结果，能在「表被人工改坏、恰好两条装载路径同错」时报警。
// 变量表（Talent/Item）同样适用；Base.yml 是人工表、无 CSV 源，不在其列。
// #43 起调教域六张表（Palam/Source/Abl/Exp/Mark/TrainCommand）纳入同一
// 守护——「两条装载路径同错」的盲区对逐字段比对仍然存在，字节层不留窗。
// #60 起**直比**：T20 归一（繁/日产物名→简体）在生成器内部完成
// （csv-to-yml.js 的 emit_product_lines），「产物长什么样」的规格在生成器、
// 不在测试——本守护因此不再替转换结果补归一，生成器漏归一会直接红。
const SYNC_GUARD_PAIRS = [
  {
    yml: 'Chara0.yml',
    convert: () => {
      const { text } = read_text(
        path.join(REPO_ROOT, 'target', 'CSV', 'Chara', 'Chara0.csv'),
      );
      return to_chara_yaml(parse_chara_csv(text).groups, {
        source: 'Chara0.csv',
      });
    },
  },
  {
    yml: 'Talent.yml',
    convert: () => {
      const { text } = read_text(
        path.join(REPO_ROOT, 'target', 'CSV', 'Talent.csv'),
      );
      const { entries, dropped } = parse_variable_csv(text, {
        table: 'talent',
      });
      return to_variable_yaml(entries, dropped, {
        table: 'talent',
        source: 'Talent.csv',
      });
    },
  },
  {
    yml: 'Item.yml',
    convert: () => {
      const { text } = read_text(
        path.join(REPO_ROOT, 'target', 'CSV', 'Item.csv'),
      );
      const { entries, dropped } = parse_variable_csv(text, { table: 'item' });
      return to_variable_yaml(entries, dropped, {
        table: 'item',
        source: 'Item.csv',
      });
    },
  },
  // #43 六张：源文件名 → 表名/产物名（traincommand 与源名不同，头注票据 #43）
  ...[
    ['Palam.csv', 'palam', 'Palam.yml'],
    ['source.csv', 'source', 'Source.yml'],
    ['Abl.csv', 'abl', 'Abl.yml'],
    ['exp.csv', 'exp', 'Exp.yml'],
    ['Mark.csv', 'mark', 'Mark.yml'],
    ['Train.csv', 'traincommand', 'TrainCommand.yml'],
  ].map(([source, table, yml]) => ({
    yml,
    convert: () => {
      const { text } = read_text(path.join(REPO_ROOT, 'target', 'CSV', source));
      const { entries, dropped } = parse_variable_csv(text, { table });
      return to_variable_yaml(entries, dropped, {
        table,
        source,
        ticket: '#43',
      });
    },
  })),
];

for (const pair of SYNC_GUARD_PAIRS) {
  test(`同步守护：yml/${pair.yml} 与 target 源 CSV 的转换结果逐字节一致`, () => {
    const product = path.join(REPO_ROOT, 'yml', pair.yml);
    // #60（T20）起直比：归一在生成器内部（emit_product_lines）完成，本守护
    // 不再替转换结果补归一——生成器漏归一、或产物被手改，都在这里直接红。
    assert.equal(fs.readFileSync(product, 'utf8'), pair.convert());
  });
}

// —— 变量表（issue #38）——

test('变量表：; 注释/空行剥除、id+名称读出、item 额外带价格', () => {
  const talent_csv = [
    '; 整行注释',
    '0,处女,;第三列注释会被引擎截断',
    '9,崩坏,',
    '',
  ].join('\r\n');
  const { entries, dropped, warnings } = parse_variable_csv(talent_csv, {
    table: 'talent',
  });
  assert.deepEqual(entries, [
    { id: 0, name: '处女' },
    { id: 9, name: '崩坏' },
  ]);
  assert.deepEqual(dropped, []);
  assert.deepEqual(warnings, [], '第三列注释经 ; 剥除后不剩列，不应告警');

  const item_csv = '0,振动宝石,200,;注释\n28,魔力源,500\n';
  const item = parse_variable_csv(item_csv, { table: 'item' });
  assert.deepEqual(item.entries, [
    { id: 0, name: '振动宝石', price: 200 },
    { id: 28, name: '魔力源', price: 500 },
  ]);
  assert.deepEqual(item.warnings, []);

  // 产出形状：引号键 + 缩进 id/price，数值裸写（引擎 yml 分支的文档形状）
  const yaml = to_variable_yaml(item.entries, item.dropped, {
    table: 'item',
    source: 'Item.csv',
  });
  assert.ok(yaml.includes('"振动宝石":\n  id: 0\n  price: 200'));
  assert.ok(yaml.endsWith('\n'));
  assert.ok(!yaml.includes('\r'));
});

test('变量表：重名取后者（对象键序语义）、前者记入 dropped 并告警', () => {
  const { entries, dropped, warnings } = parse_variable_csv(
    '1000,十字军战士,1\n1005,十字军战士,2\n7,魁梧,3\n',
    { table: 'item' },
  );
  // 名称重复：产物保留后者（1005，与引擎 name→id 后者覆盖语义一致），
  // 前者记入 dropped；位置保持首次出现处（对象键序）
  assert.deepEqual(entries, [
    { id: 1005, name: '十字军战士', price: 2 },
    { id: 7, name: '魁梧', price: 3 },
  ]);
  assert.deepEqual(dropped, [{ id: 1000, name: '十字军战士', price: 1 }]);
  assert.equal(
    warnings.filter((warning) => warning.includes('重复')).length,
    1,
  );

  // 头注自文档化：dropped 写进产物注释
  const yaml = to_variable_yaml(entries, dropped, {
    table: 'item',
    source: 'Item.csv',
  });
  assert.ok(yaml.includes('#   序号 1000「十字军战士」并入后者的名称键'));
});

test('变量表：序号重复镜像引擎 s()——自增到第一个空位并告警', () => {
  const { entries, warnings } = parse_variable_csv('0,甲\n0,乙\n', {
    table: 'talent',
  });
  // 引擎语义：第二个 0 号被挤到 1（s() 从给定序号起自增到空位）
  assert.deepEqual(entries, [
    { id: 0, name: '甲' },
    { id: 1, name: '乙' },
  ]);
  assert.ok(warnings.some((warning) => warning.includes('重复变量序号')));
});

test('变量表：非 item 表第 4 列 / item 表非注释第 4 列都告警，不静默丢弃', () => {
  const talent = parse_variable_csv('0,甲,1,备注\n', { table: 'talent' });
  assert.equal(
    talent.warnings.filter((warning) => warning.includes('截断')).length,
    1,
  );

  const item = parse_variable_csv('28,甲,500,非注释文本\n', { table: 'item' });
  assert.deepEqual(item.entries, [{ id: 28, name: '甲', price: 500 }]);
  assert.equal(
    item.warnings.filter((warning) => warning.includes('第 4 列')).length,
    1,
  );

  // item 缺价格列：告警且不写 price 字段（贴近 csv 侧 undefined）
  const no_price = parse_variable_csv('5,乙,\n', { table: 'item' });
  assert.deepEqual(no_price.entries, [{ id: 5, name: '乙' }]);
  assert.ok(no_price.warnings.some((warning) => warning.includes('缺价格')));
});

test('变量表：产物已存在默认不覆盖，--force 才重写（产物边界同样适用）', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'Talent.csv', '0,处女\n');
    const out_dir = path.join(dir, 'yml');
    fs.mkdirSync(out_dir);
    const output = write_file(out_dir, 'Talent.yml', '人工修改过的产物');

    const skipped = convert_variable({
      table: 'talent',
      input,
      output,
    });
    assert.equal(skipped.status, 'skipped');
    assert.equal(fs.readFileSync(output, 'utf8'), '人工修改过的产物');

    const written = convert_variable({
      table: 'talent',
      input,
      output,
      force: true,
    });
    assert.equal(written.status, 'written');
    assert.ok(fs.readFileSync(output, 'utf8').includes('"处女":'));
  });
});

test('变量表：空输入拒绝写出', async () => {
  await with_temp_dir((dir) => {
    const input = write_file(dir, 'Talent.csv', '; 只有注释\n');
    const output = path.join(dir, 'yml', 'Talent.yml');
    assert.throws(
      () => convert_variable({ table: 'talent', input, output }),
      /没有可用的变量表条目/,
    );
    assert.ok(!fs.existsSync(output));
  });
});

test('CLI：--table 走变量表路径（skip/force/表名大小写不敏感/未知表名报错）', async () => {
  await with_temp_dir((dir) => {
    write_file(dir, 'Talent.csv', '0,处女\n');
    const out_dir = path.join(dir, 'yml');

    // 表名小写解析磁盘上的 Talent.csv；产物名取源文件名首字母大写（#43 起）
    const written = capture_console(() =>
      main(['--table', 'talent'], {
        table_csv_dir: dir,
        table_out_dir: out_dir,
      }),
    );
    assert.equal(written.result, 0);
    const product = path.join(out_dir, 'Talent.yml');
    assert.ok(fs.readFileSync(product, 'utf8').includes('"处女":'));
    assert.ok(
      written.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('写出 1 个'),
      ),
    );

    // 已存在 → 跳过且内容不动；--force → 重写
    fs.writeFileSync(product, '人工修改过的产物', 'utf8');
    const skipped = capture_console(() =>
      main(['--table', 'talent'], {
        table_csv_dir: dir,
        table_out_dir: out_dir,
      }),
    );
    assert.equal(skipped.result, 0);
    assert.equal(fs.readFileSync(product, 'utf8'), '人工修改过的产物');

    const forced = capture_console(() =>
      main(['--table', 'TALENT', '--force'], {
        table_csv_dir: dir,
        table_out_dir: out_dir,
      }),
    );
    assert.equal(forced.result, 0);
    assert.ok(fs.readFileSync(product, 'utf8').includes('"处女":'));

    // 未知表名 → 退出码 1；--table 不带参数 → 用法错误（退出码 2）
    const missing = capture_console(() =>
      main(['--table', 'nope'], { table_csv_dir: dir, table_out_dir: out_dir }),
    );
    assert.equal(missing.result, 1);
    assert.ok(
      missing.captured.some(
        (entry) => entry.level === 'error' && entry.text.includes('nope.csv'),
      ),
    );
    const no_arg = capture_console(() => main(['--table']));
    assert.equal(no_arg.result, 2);
  });
});

// —— 调教域表的特殊表名与产物边界（issue #43）——

test('CLI：--table train / trainname 显式拒绝（产出即死表，报错优于静默生成）', async () => {
  await with_temp_dir((dir) => {
    write_file(dir, 'Train.csv', '0,爱抚\n');
    const out_dir = path.join(dir, 'yml');
    for (const table of ['train', 'trainname', 'TRAINNAME']) {
      const rejected = capture_console(() =>
        main(['--table', table], {
          table_csv_dir: dir,
          table_out_dir: out_dir,
        }),
      );
      assert.equal(rejected.result, 1, `--table ${table} 必须被拒绝`);
      assert.ok(
        rejected.captured.some(
          (entry) =>
            entry.level === 'error' && entry.text.includes('traincommand'),
        ),
        `拒绝理由必须指向 --table traincommand（--table ${table}）`,
      );
    }
    // 拒绝发生在解析阶段，一个字节都不写
    assert.ok(!fs.existsSync(out_dir));
  });
});

test('CLI：--table traincommand 解析 Train.csv，产物名 TrainCommand.yml（别名登记）', async () => {
  await with_temp_dir((dir) => {
    write_file(dir, 'Train.csv', '0,爱抚\n1,舔阴\n');
    const out_dir = path.join(dir, 'yml');
    const written = capture_console(() =>
      main(['--table', 'traincommand'], {
        table_csv_dir: dir,
        table_out_dir: out_dir,
      }),
    );
    assert.equal(written.result, 0);
    // 用目录清单断言产物名的精确大小写：Windows 文件系统大小写不敏感，
    // 直接 existsSync('TrainCommand.yml') 对错误大小写也会通过
    assert.deepEqual(fs.readdirSync(out_dir), ['TrainCommand.yml']);
    const product = fs.readFileSync(
      path.join(out_dir, 'TrainCommand.yml'),
      'utf8',
    );
    assert.ok(product.includes('"爱抚":'));
    assert.ok(product.includes('issue #43'), '新表头注引用这张票');
    assert.ok(product.includes('--force --table traincommand'));

    // 表名大小写不敏感（与既有 --table 行为一致）
    const again = capture_console(() =>
      main(['--table', 'TrainCommand', '--force'], {
        table_csv_dir: dir,
        table_out_dir: out_dir,
      }),
    );
    assert.equal(again.result, 0);
    assert.ok(
      again.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('写出 1 个'),
      ),
    );
  });
});

test('CLI：小写源文件名的产物首字母大写（exp.csv → Exp.yml，随 yml/ 既有风格）', async () => {
  await with_temp_dir((dir) => {
    write_file(dir, 'exp.csv', '0,私处经验\n');
    const out_dir = path.join(dir, 'yml');
    const written = capture_console(() =>
      main(['--table', 'exp'], { table_csv_dir: dir, table_out_dir: out_dir }),
    );
    assert.equal(written.result, 0);
    assert.deepEqual(
      fs.readdirSync(out_dir),
      ['Exp.yml'],
      '产物名必须首字母大写（目录清单断言，防大小写不敏感文件系统糊弄）',
    );
  });
});

test('CLI：--table palam 产物已存在默认跳过，--force 才重写（产物边界对新表同样生效）', async () => {
  await with_temp_dir((dir) => {
    write_file(dir, 'Palam.csv', '0,阴核\n');
    const out_dir = path.join(dir, 'yml');
    fs.mkdirSync(out_dir, { recursive: true });
    const product = path.join(out_dir, 'Palam.yml');
    fs.writeFileSync(product, '人工修改过的产物', 'utf8');

    const skipped = capture_console(() =>
      main(['--table', 'palam'], {
        table_csv_dir: dir,
        table_out_dir: out_dir,
      }),
    );
    assert.equal(skipped.result, 0);
    assert.equal(fs.readFileSync(product, 'utf8'), '人工修改过的产物');
    assert.ok(
      skipped.captured.some(
        (entry) => entry.level === 'log' && entry.text.includes('跳过 1 个'),
      ),
    );

    const forced = capture_console(() =>
      main(['--table', 'palam', '--force'], {
        table_csv_dir: dir,
        table_out_dir: out_dir,
      }),
    );
    assert.equal(forced.result, 0);
    assert.ok(fs.readFileSync(product, 'utf8').includes('"阴核":'));
  });
});
