/**
 * @file .kojo 基础设施（issue #891）：夹具按引擎的解析器装载篇目、CI 用的
 * 口上检查入口，以及简体锁对 .kojo 的覆盖。
 *
 * 三层各由什么背书：
 *   1. 夹具装载（本文件前四条用例）：test/helpers/era-fixture.js 拦住 `.kojo`
 *      的 require（`#/…`、绝对与相对路径），把文本交给 test/helpers/engine-bundle.js；
 *      后者取 app.asar 里引擎自己的 parseYaml（模块 295）、parseKojo（669）与
 *      addProxyFunc（638），执行生成的代码、把 era.* 调用记进夹具。缺引擎时
 *      这组随组 skip，跳过数进 test/engine-skip-baseline.txt 基线。
 *   2. 随机文本：生成的代码用 `Math.floor(t.length * Math.random())` 选候选，
 *      所以夹具的 override_math_random 能让文本逐字可断言——这是 #890 结论
 *      「随机源替换 Math.random」在夹具侧的落地。引擎的一条锐边也在同一组里：
 *      **random 组所有候选的 if 都不通过时，引擎仍随机输出一个**（#890 结论 4，
 *      迁移时要留无条件候选）。
 *   3. CI 检查：.github/workflows/ci.yml 的静态检查步用
 *      `tools/ere-game-builder/cli.mjs ere_check_kojo` 逐个过仓库里跟踪的
 *      .kojo。判定逻辑在工具的 lib/kojo.js 里（独立实现，不是引擎校验的副本），
 *      本文件用子进程跑同一个入口：干净的示例必须绿、故意写错的必须红。
 *      入口经 yamljs 解析，缺 node_modules 时这组直接 return（见下方注释）。
 *
 * 示例篇目在 test/fixtures/kojo/infra-sample.kojo——不在 ere/ 里：它不是游戏
 * 口上，不该进发布包；#892 试点把真口上放进 ere/ 之后，CI 的同一个循环自动
 * 覆盖到它们。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { load_engine_bundle } = require('./helpers/engine-bundle');
const { create_era_fixture } = require('./helpers/era-fixture');

const REPO_ROOT = path.resolve(__dirname, '..');
const SAMPLE_KOJO = path.join(
  REPO_ROOT,
  'test',
  'fixtures',
  'kojo',
  'infra-sample.kojo',
);
const KOJO_CLI = path.join(REPO_ROOT, 'tools', 'ere-game-builder', 'cli.mjs');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

/**
 * 经夹具的 require 拦截装载示例篇目。装载失败（引擎解析器缺失、proxyKojo 没挂上
 * 一类）在这里变成一条固定的失败消息，而不是散落的 TypeError——变异条目靠这句
 * 话把「坏在装载」和「坏在输出」分开。
 */
function load_sample_kojo() {
  try {
    return require(SAMPLE_KOJO);
  } catch (error) {
    assert.fail(`夹具装载 .kojo 失败：${error.message}`);
  }
}

// —— 夹具装载（引擎门控）——

engine_test('.kojo 篇目装载：引擎解析器生成的函数经夹具执行', async (t) => {
  await t.test('普通多行篇目逐行 printAndWait，%KEY% 按字典替换', async () => {
    const fixture = create_era_fixture();
    const kojo = load_sample_kojo();
    assert.equal(
      typeof kojo['问候'],
      'function',
      '示例篇目「问候」必须是可调用函数',
    );
    await kojo['问候']({ NAME: '测试者' });
    assert.deepEqual(fixture.text_lines(), [
      '你好，测试者。',
      '这句话显示完就结束。',
    ]);
    // 每行一个 Row：printAndWait 的内部等待不进 inputs_consumed，但行数照记
    assert.equal(fixture.era.getLineCount(), 2);
  });

  await t.test('sync 篇目：逐行 print、不等键，函数同步返回', () => {
    const fixture = create_era_fixture();
    const kojo = load_sample_kojo();
    const returned = kojo['同时显示']();
    assert.equal(returned, undefined, 'sync 篇目没有返回值');
    assert.deepEqual(fixture.text_lines(), ['第一行', '第二行']);
    assert.deepEqual(fixture.waits, [], 'sync 篇目不产生任何等待');
  });

  await t.test('定序随机源：Math.random 决定候选，文本可逐字断言', async () => {
    const fixture = create_era_fixture();
    const kojo = load_sample_kojo();
    // 两个 if 都不通过时，引擎在**全部**候选里随机（#890 结论 4）：
    // 随机数 0 取第一个，0.999… 取最后一个
    try {
      fixture.override_math_random(() => 0);
      await kojo['随机文本']();
      assert.deepEqual(fixture.text_lines(), ['随机甲']);
      fixture.lines.length = 0;
      fixture.override_math_random(() => 0.999);
      await kojo['随机文本']();
      assert.deepEqual(fixture.text_lines(), ['随机乙']);
    } finally {
      fixture.restore_math_random();
    }
  });

  await t.test(
    '引擎行为：random 组候选全被 if 筛掉时，仍随机输出一个候选',
    async () => {
      const fixture = create_era_fixture();
      const kojo = load_sample_kojo();
      // 前置：两个 if 读的都是没人写过的 flag，条件全不通过
      assert.equal(fixture.era.get('flag:891:0'), undefined);
      assert.equal(fixture.era.get('flag:891:1'), undefined);
      try {
        // 条件通过时只输出通过的那一个——证明 if 真的在筛，不是被忽略
        fixture.era.set('flag:891:1', 1);
        fixture.override_math_random(() => 0);
        await kojo['随机文本']();
        assert.deepEqual(fixture.text_lines(), ['随机乙'], '筛后只剩通过者');
        // 条件全不通过：候选表被筛空，引擎回落到「全部候选中再随机一个」
        fixture.lines.length = 0;
        fixture.era.set('flag:891:1', 0);
        fixture.override_math_random(() => 0);
        await kojo['随机文本']();
        assert.deepEqual(fixture.text_lines(), ['随机甲']);
        fixture.lines.length = 0;
        fixture.override_math_random(() => 0.999);
        await kojo['随机文本']();
        assert.deepEqual(fixture.text_lines(), ['随机乙']);
      } finally {
        fixture.restore_math_random();
      }
    },
  );
});

// —— CI 用的口上检查（不依赖引擎，但依赖 node_modules 里的 yamljs）——

/**
 * 检查器经 yamljs 解析 .kojo，而 yamljs 是仓库的 devDependency：`npm ci` 之后
 * 在 node_modules 里，CI 的 engine job 与变异测试的隔离副本（COPY_DENY 排除
 * node_modules）都没有它。缺依赖时下面四条**直接 return**（不是 t.skip）：
 * 跳过数守护在有引擎的环境里要求跳过数为 0，一个 skip 就把那道门判红——
 * 与 test/conflict-marker-check.test.js 里 prettier 外部事实用例同一处置。
 * 真正跑它们的是 CI 的 static job（那一步先 npm ci）。
 */
const YAMLJS_DIR = path.join(REPO_ROOT, 'node_modules', 'yamljs');

/** 跑一次 CI 静态检查步用的入口，返回退出码与合并输出 */
function run_kojo_check(target) {
  const result = spawnSync(
    process.execPath,
    [KOJO_CLI, 'ere_check_kojo', target],
    {
      encoding: 'utf8',
      // 单文件检查本机实测 < 1s；30s 是「挂住就别拖垮整个测试文件」的上限
      timeout: 30_000,
      killSignal: 'SIGKILL',
    },
  );
  return {
    status: result.status,
    output: `${result.stdout ?? ''}${result.stderr ?? ''}`,
  };
}

/** 把一段 .kojo 文本写进临时文件后跑检查，跑完删目录 */
function run_kojo_check_on_text(content) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kojo-check-'));
  try {
    const file = path.join(dir, 'case.kojo');
    fs.writeFileSync(file, content, 'utf8');
    return run_kojo_check(file);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test('.kojo 检查入口：示例篇目干净时退出 0（有 yamljs 时才跑）', () => {
  if (!fs.existsSync(YAMLJS_DIR)) {
    return;
  }
  const { status, output } = run_kojo_check(SAMPLE_KOJO);
  assert.equal(status, 0, output);
  assert.ok(
    output.includes('未发现阻断问题'),
    `示例篇目应判干净，实际输出：\n${output}`,
  );
  assert.ok(
    output.includes('篇目：3 个'),
    `示例篇目的三个篇目都要被数到，实际输出：\n${output}`,
  );
});

test('.kojo 检查入口：故意写错的篇目让检查失败（有 yamljs 时才跑）', () => {
  if (!fs.existsSync(YAMLJS_DIR)) {
    return;
  }
  // 键名拼错一位：引擎不报错、这条内容走兜底分支，正是检查要拦的写法
  const { status, output } = run_kojo_check_on_text(
    ['打招呼:', '- conten: 你好', '- 正文照常显示', ''].join('\n'),
  );
  assert.equal(status, 1, `写错的篇目必须让检查失败，实际输出：\n${output}`);
  assert.ok(
    output.includes('是否想写「content」'),
    `检查要指出拼错的键名，实际输出：\n${output}`,
  );
});

test('.kojo 检查：与篇目同列的兄弟序列项不算顶层篇目重名（有 yamljs 时才跑）', () => {
  if (!fs.existsSync(YAMLJS_DIR)) {
    return;
  }
  // 随机文本的标准写法就是两条 `- random: true` 与篇目名同列（引擎手册的
  // random1.kojo）；把它们当成「顶层篇目 - random 重复定义」会让合法的随机
  // 文本在 CI 上直接红
  const { status, output } = run_kojo_check_on_text(
    [
      '随机文本:',
      '- random: true',
      '  lines:',
      '  - 甲',
      '- random: true',
      '  lines:',
      '  - 乙',
      '',
    ].join('\n'),
  );
  assert.equal(status, 0, `合法的随机文本不该被判错，实际输出：\n${output}`);
});

test('.kojo 检查：真正的顶层篇目重名仍然判红（有 yamljs 时才跑）', () => {
  if (!fs.existsSync(YAMLJS_DIR)) {
    return;
  }
  const { status, output } = run_kojo_check_on_text(
    ['打招呼:', '- 一', '打招呼:', '- 二', ''].join('\n'),
  );
  assert.equal(status, 1, `重名篇目必须让检查失败，实际输出：\n${output}`);
  assert.ok(
    output.includes('重复定义'),
    `检查要报出重名篇目，实际输出：\n${output}`,
  );
});

test('CI 静态检查步逐个检查仓库里跟踪的 .kojo', () => {
  const workflow = fs.readFileSync(
    path.join(REPO_ROOT, '.github', 'workflows', 'ci.yml'),
    'utf8',
  );
  // 检查器入口与「检查哪些文件」两件事都要在：只写入口而不给 .kojo 目标，
  // 这一步会以「目录下没有 .kojo」退出 2，等于没检查
  assert.ok(
    workflow.includes('ere_check_kojo'),
    'ci.yml 里没有 .kojo 检查步骤——口上检查只在本地跑，CI 不会红',
  );
  assert.ok(
    workflow.includes("git ls-files '*.kojo'"),
    'ci.yml 的 .kojo 检查没有从 git 跟踪文件取目标',
  );
});
