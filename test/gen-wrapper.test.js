/**
 * @file tools/gen-wrapper.js 的契约测试（issue #18）。
 *
 * 三个重点：
 *   1. 产物边界——「默认不覆盖、显式 --force 才覆盖」与 #10/#17 同一条规则；
 *   2. 生成区/手写区分离——--force 重生成只替换 GENERATED 标记之间的内容，
 *      手写区（语义补注、业务方法）逐字节存活。#11 决议的核心，必须有测试；
 *   3. 严格解析——输入不是已知形态就大声报错，绝不静默丢弃（#10 的教训）。
 *
 * 已知限制：测试用本脚本自己的解析器定义输入形态，不经过引擎的 yaml 解析器。
 * 产出格式对引擎是否可解析，依据是 #17 已实机验证的 Global 同构表格式
 * （键引号 + id/name/type 三字段，引擎自带转换器的产出形状）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const {
  GENERATED_END,
  GENERATED_START,
  RENDERABLE_ONE_DIM_TABLES,
  REPO_ROOT,
  extract_generated_section,
  generate,
  main,
  parse_variable_yml,
  render_generated_section,
  render_wrapper,
  try_parse_variable_yml,
} = require('../tools/gen-wrapper');

// 与 yml/Global.yml 同构的迷你输入（引擎自带转换器的产出形状）
const sample_global_yml = [
  '# 文件级注释',
  '"是否启用标题音乐":',
  '  id: 0',
  '  name: "title_music_enabled"',
  '  type: "number"',
  '"致辞折叠开关":',
  '  id: 99',
  '  name: "greeting_collapsed"',
  '  type: "number"',
  '',
].join('\n');

// —— 解析：变量表形状 ——

test('解析：id/name/type 逐条读出，键可为任意中文', () => {
  const entries = parse_variable_yml(sample_global_yml);
  assert.deepEqual(entries, [
    {
      key: '是否启用标题音乐',
      id: 0,
      name: 'title_music_enabled',
      type: 'number',
    },
    { key: '致辞折叠开关', id: 99, name: 'greeting_collapsed', type: 'number' },
  ]);
});

test('解析：GameBase 形状（扁平键值）不是变量表，try 解析返回 false', () => {
  const gamebase_shape = '"游戏名称": "ERA魔王"\n"游戏标识": 931060\n';
  const result = try_parse_variable_yml(gamebase_shape);
  assert.equal(result.ok, false);
  assert.throws(() => parse_variable_yml(gamebase_shape));
});

test('解析严格性：坏行、缺字段、重复键、重复 id、非法 name 都抛错', () => {
  assert.throws(
    () => parse_variable_yml('裸键:\n  id: 0\n  name: "a"\n'),
    /裸键/,
  );
  assert.throws(() => parse_variable_yml('"键":\n  name: "a"\n'), /缺少 id/);
  assert.throws(() => parse_variable_yml('"键":\n  id: 0\n'), /缺少 name/);
  assert.throws(
    () =>
      parse_variable_yml(
        '"甲":\n  id: 0\n  name: "a"\n"甲":\n  id: 1\n  name: "b"\n',
      ),
    /重复/,
  );
  assert.throws(
    () =>
      parse_variable_yml(
        '"甲":\n  id: 0\n  name: "a"\n"乙":\n  id: 0\n  name: "b"\n',
      ),
    /id.*重复/,
  );
  assert.throws(
    () => parse_variable_yml('"甲":\n  id: 0\n  name: "FlagName"\n'),
    /snake_case/,
  );
  assert.throws(
    () =>
      parse_variable_yml('"甲":\n  id: 0\n  name: "a"\n  type: "unknown"\n'),
    /type/,
  );
});

// —— 渲染：生成区与新文件骨架 ——

const sample_entries = parse_variable_yml(sample_global_yml);

test('渲染：getter 数字寻址 + || 0 兜底 + 中文 JSDoc；setter 成对', () => {
  const section = render_generated_section('global', sample_entries, {
    source_file: 'Global.yml',
  });

  // 标记行是首末行（前缀匹配，行内允许追加说明）
  const lines = section.split('\n').filter(Boolean);
  assert.ok(lines[0].startsWith(GENERATED_START));
  assert.ok(lines[lines.length - 1].startsWith(GENERATED_END));

  // #13 的兜底规则：读未声明/未初始化序号引擎返回 undefined，getter 必须 || 0
  assert.ok(section.includes("return era.get('global:0') || 0;"));
  assert.ok(section.includes("return era.get('global:99') || 0;"));
  // 写入侧成对出现，同样用数字下标（#5：底层寻址一律数字）
  assert.ok(section.includes("era.set('global:0', v);"));
  assert.ok(section.includes("era.set('global:99', v);"));
  // 每个变量的中文键进 JSDoc（AGENTS.md：变量语义必须注释）
  assert.ok(section.includes('是否启用标题音乐'));
  assert.ok(section.includes('致辞折叠开关'));
  // 访问器对象按 #11 命名：era-<表名>.js / era_<表名>
  assert.ok(section.includes('const era_global = {'));
});

test('渲染：string 类型暂不支持，大声抛错而不是猜', () => {
  const entries = parse_variable_yml(
    '"某文本":\n  id: 3\n  name: "some_text"\n  type: "string"\n',
  );
  assert.throws(
    () => render_generated_section('global', entries, { source_file: 'X.yml' }),
    /暂不支持/,
  );
});

test('新文件骨架：可编译、含 #/ 引用与手写区、LF、无 BOM、确定性', () => {
  const first = render_wrapper('global', sample_entries, {
    source_file: 'Global.yml',
  });
  const second = render_wrapper('global', sample_entries, {
    source_file: 'Global.yml',
  });
  assert.equal(first, second);
  assert.ok(!first.includes('\r'));
  assert.ok(!first.startsWith('\uFEFF'));
  assert.ok(first.endsWith('\n'));
  assert.ok(first.includes("require('#/era-electron')"));
  // 手写区骨架：module.exports 在标记之外（重生成时不被触碰）
  assert.ok(first.includes('module.exports = era_global;'));
  // 语法有效性：整份骨架能作为 JS 编译
  new vm.Script(first);
});

// —— 产物边界与目录扫描 ——

// 测试小工具：临时目录 + 静音控制台（照 csv-to-yml.test.js 的先例）
async function with_temp_dir(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-gen-wrapper-'));
  try {
    return await run(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const gamebase_shape_yml = '"游戏名称": "ERA魔王"\n"游戏标识": 931060\n';

function make_project(dir, global_yml = sample_global_yml) {
  fs.mkdirSync(path.join(dir, 'yml'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'yml', 'Global.yml'), global_yml, 'utf8');
  // 目录里混着非变量表（GameBase 形状），应被识别为「不是变量表」并跳过
  fs.writeFileSync(
    path.join(dir, 'yml', 'GameBase.yml'),
    gamebase_shape_yml,
    'utf8',
  );
  return path.join(dir, 'ere', 'era-utils');
}

test('扫描：只对白名单变量表产出；GameBase 形状不算变量表', async () => {
  await with_temp_dir((dir) => {
    const out_dir = make_project(dir);
    const report = generate({ yml_dir: path.join(dir, 'yml'), out_dir });

    const target = path.join(out_dir, 'era-global.js');
    assert.ok(fs.existsSync(target));
    const by_status = Object.fromEntries(
      report.results.map((r) => [r.file, r.status]),
    );
    assert.equal(by_status['Global.yml'], 'written');
    assert.equal(by_status['GameBase.yml'], 'not-variable');
    // 只产出一个文件
    assert.equal(fs.readdirSync(out_dir).length, 1);
  });
});

test('产物边界：已存在时默认跳过，内容一字不动', async () => {
  await with_temp_dir((dir) => {
    const out_dir = make_project(dir);
    const target = path.join(out_dir, 'era-global.js');
    generate({ yml_dir: path.join(dir, 'yml'), out_dir });
    fs.writeFileSync(target, '人工改过的产物', 'utf8');

    const report = generate({ yml_dir: path.join(dir, 'yml'), out_dir });

    assert.equal(
      report.results.find((r) => r.file === 'Global.yml').status,
      'skipped',
    );
    assert.equal(fs.readFileSync(target, 'utf8'), '人工改过的产物');
  });
});

test('重生成（--force）：生成区被替换，手写区逐字节存活（#11 核心约束）', async () => {
  await with_temp_dir((dir) => {
    const yml_dir = path.join(dir, 'yml');
    const out_dir = make_project(dir);
    const target = path.join(out_dir, 'era-global.js');
    generate({ yml_dir, out_dir });

    // 人工定稿：改文件头、加语义补注与业务方法（全部在标记之外）
    const hand_work = fs
      .readFileSync(target, 'utf8')
      .replace(' * 标记之外是手写区', ' * 人工补充说明：这一行是定稿时写的');
    const with_hand = `${hand_work}era_global.toggle_greeting = () => {};\n`;
    fs.writeFileSync(target, with_hand, 'utf8');

    // yml 变了：新增一个变量，重生成必须把新访问器带进来
    fs.writeFileSync(
      path.join(yml_dir, 'Global.yml'),
      `${sample_global_yml}"标题音乐音量":\n  id: 1\n  name: "title_music_volume"\n  type: "number"\n`,
      'utf8',
    );

    const report = generate({ yml_dir, out_dir, force: true });
    assert.equal(
      report.results.find((r) => r.file === 'Global.yml').status,
      'updated',
    );

    const regenerated = fs.readFileSync(target, 'utf8');
    // 手写区存活：人工补的每一处都在
    assert.ok(regenerated.includes('人工补充说明：这一行是定稿时写的'));
    assert.ok(regenerated.includes('era_global.toggle_greeting = () => {};'));
    // 生成区确实被替换了：新变量进来了，且仍是合法 JS
    assert.ok(regenerated.includes('get title_music_volume()'));
    new vm.Script(regenerated);
  });
});

test('重生成（--force）但产物无 GENERATED 标记：拒绝覆写，文件不动', async () => {
  await with_temp_dir((dir) => {
    const out_dir = make_project(dir);
    const target = path.join(out_dir, 'era-global.js');
    fs.mkdirSync(out_dir, { recursive: true });
    fs.writeFileSync(target, '没有标记的手写文件', 'utf8');

    const report = generate({
      yml_dir: path.join(dir, 'yml'),
      out_dir,
      force: true,
    });

    assert.equal(
      report.results.find((r) => r.file === 'Global.yml').status,
      'rejected',
    );
    assert.equal(fs.readFileSync(target, 'utf8'), '没有标记的手写文件');
  });
});

test('变量表但不在渲染白名单（如二维角色表）：告警跳过，不产出错误寻址', async () => {
  await with_temp_dir((dir) => {
    fs.mkdirSync(path.join(dir, 'yml'));
    fs.writeFileSync(
      path.join(dir, 'yml', 'CFlag.yml'),
      '"顺从":\n  id: 0\n  name: "meek"\n  type: "number"\n',
      'utf8',
    );
    const report = generate({
      yml_dir: path.join(dir, 'yml'),
      out_dir: path.join(dir, 'ere', 'era-utils'),
    });

    assert.equal(report.results[0].status, 'unsupported');
    assert.ok(
      report.warnings.some((w) => w.includes('CFlag')),
      '必须有提到 CFlag 的告警',
    );
    assert.ok(
      !fs.existsSync(path.join(dir, 'ere', 'era-utils', 'era-cflag.js')),
    );
  });
});

// —— 同步守护：仓库产物与其 yml 输入不得漂移 ——
//
// 逐表遍历渲染白名单，而不是每加一张表就手抄一条用例：#22 加入 flag 表时，
// 原先只盯 global 的守护对 era-flag.js 视而不见，改了 Flag.yml 不重生成也
// 不会红。白名单是生成器自己的真相，从它出发就不会再漏。
for (const table of RENDERABLE_ONE_DIM_TABLES) {
  // 真实文件名按「小写 == 表名」在 yml/ 里找：ExFlag.yml 这类混合大小写
  // （#113 先例）不满足「首字母大写即文件名」的旧假设；找不到即红（白名单
  // 指向了不存在的表）
  const yml_name = fs
    .readdirSync(path.join(REPO_ROOT, 'yml'))
    .find(
      (name) => name.toLowerCase() === `${table}.yml` && /\.ya?ml$/i.test(name),
    );
  const product_name = `era-${table}.js`;

  test(`同步守护：ere/era-utils/${product_name} 的生成区与 yml/${yml_name} 渲染结果一致`, () => {
    const yml_text = fs.readFileSync(
      path.join(REPO_ROOT, 'yml', yml_name),
      'utf8',
    );
    const product = fs.readFileSync(
      path.join(REPO_ROOT, 'ere', 'era-utils', product_name),
      'utf8',
    );

    const expected = render_generated_section(
      table,
      parse_variable_yml(yml_text),
      { source_file: yml_name },
    );
    assert.equal(extract_generated_section(product), expected);
  });
}

// —— CLI ——

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

test('CLI：默认跳过已存在产物；--force 报告更新；未知参数退出码 2', async () => {
  await with_temp_dir((dir) => {
    const yml_dir = path.join(dir, 'yml');
    const out_dir = make_project(dir);
    generate({ yml_dir, out_dir });

    const skipped = capture_console(() => main([], { yml_dir, out_dir }));
    assert.equal(skipped.result, 0);
    assert.ok(
      skipped.captured.some(
        (e) => e.level === 'log' && e.text.includes('跳过'),
      ),
    );

    const updated = capture_console(() =>
      main(['--force'], { yml_dir, out_dir }),
    );
    assert.equal(updated.result, 0);
    assert.ok(
      updated.captured.some(
        (e) => e.level === 'log' && e.text.includes('更新'),
      ),
    );
  });

  const bogus = capture_console(() => main(['--bogus']));
  assert.equal(bogus.result, 2);
  assert.ok(
    bogus.captured.some(
      (e) => e.level === 'error' && e.text.includes('未知参数'),
    ),
  );
});

test('CLI：出现 rejected（无标记产物被拒绝重写）时退出码 1', async () => {
  await with_temp_dir((dir) => {
    const yml_dir = path.join(dir, 'yml');
    const out_dir = make_project(dir);
    fs.mkdirSync(out_dir, { recursive: true });
    fs.writeFileSync(path.join(out_dir, 'era-global.js'), '无标记文件', 'utf8');

    const report = capture_console(() =>
      main(['--force'], { yml_dir, out_dir }),
    );
    assert.equal(report.result, 1);
    assert.ok(
      report.captured.some(
        (e) => e.level === 'warn' && e.text.includes('拒绝'),
      ),
    );
  });
});
