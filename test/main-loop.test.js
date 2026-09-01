/**
 * ere/system/flow/main-loop.js 的行为测试（issue #20 起，#22/#23 更新）：
 * 状态机对两条 BEGIN 路径的统一接驳，以及「标题 → 新游戏初始化 → SHOP」
 * 的端到端转场。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。凡渲染
 * 标题画面的用例先 preset_gamebase（helpers/gamebase.js，标题从静态表读
 * GameBase）。
 *
 * 终止方式：主循环是常驻循环，一律以「预置输入耗尽抛错」终止（夹具既定
 * 设计）。新游戏路径在 SHOP 渲染主菜单、消费掉队列里的输入后到站。
 *
 * 已知未测行：STATE.FIRST 处理器的 `?? STATE.SHOP` 兜底（链无人 BEGIN 时
 * 默认进商店轮，#20 验收移交的 Emuera 语义）。真身处理器必然 begin(SHOP)，
 * 兜底在当前注册表下不可达、无法不设钩子地观测——它是防御性的引擎行为
 * 镜像，留待未来出现「可无 BEGIN 的 EVENTFIRST 处理器组合」时再证。
 * 交互提醒（变异测试者须知）：整删 event-first 的 begin(SHOP) 后端到端
 * 仍绿（兜底按 Emuera 语义接住，非误报通过），但 emit 层用例
 * （test/event-first.test.js 的 pending 断言）会红——那才是出口的守卫。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');
const { preset_chara_0 } = require('./helpers/chara');

test('端到端：标题选「新的猎物」→ FIRST 初始化 → SHOP 渲染主菜单', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0 要有预设才加得进（#35 镜像的引擎守卫）
  preset_chara_0(fixture);
  fixture.set_inputs(1, 0, 0);
  const main = fixture.load_module('main');

  // 流程：标题画面（消费输入 1，resetData + 加入角色 0，BEGIN FIRST 信号
  // 上抛）→ 主循环进 FIRST → emit('EVENTFIRST')：初期奴隶问答（消费输入 0
  // 选随机，#50）、地下城模式问答（消费输入 0 选普通，#181）、真身完成
  // 初始化、开场叙事与随机路径读键共 7 次、
  // begin(SHOP)（事件路径，链内信号由 emit 捕获暂存）→ 主循环进入 SHOP
  // （#23 已接入）：绘制主菜单 → era.input() 队列已空，抛「预置输入已耗尽」
  // 上抛终止。初始化细节的逐项断言在 test/event-first.test.js，此处证主
  // 循环的转场接驳与到站画面。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  // 标题与问答各恰消费一次输入；此后至报错为止只有叙事读键（主菜单的
  // input 在取数前抛错，不记入已消费）
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 },
    { api: 'input', value: 0 },
    { api: 'input', value: 0 }, // #181 地下城模式（普通）
    ...Array.from({ length: 7 }, () => ({ api: 'waitAnyKey' })),
  ]);

  // 到站证据一：主菜单已渲染——状态行数值取自真实变量（初始化产出 +
  // @SHOW_SHOP 的日期钳制：开局即「第 0 年 1 月 1 日（第 1 日）」），六个
  // 入口齐备（细节断言在 test/page-main-menu.test.js）
  const texts = fixture.text_lines();
  const status = texts.find((line) => line.includes('所持金'));
  // \u3000 = 全角空格（原作排版字符，仓库约定转义书写）
  assert(status.includes('第0年\u30001月1日（第1日）'));
  assert(status.includes('上午'));
  assert(status.includes('(所持金：10000 pts.)'));
  for (const accelerator of [496, 497, 500, 501, 504, 505]) {
    assert(
      fixture.lines.some(
        (line) => line.type === 'button' && line.accelerator === accelerator,
      ),
      `入口 ${accelerator} 必须出现在主菜单`,
    );
  }

  // 到站证据二：初始化流程的占位仍在（FIRST 确实跑完才进的 SHOP）
  assert(texts.some((line) => line.includes('@RAND_CHARA_MAKE')));
  // 到站证据三：标题只画过转场前的那一次（FIRST 之后没有回标题重绘）
  assert.equal(
    texts.filter((line) => line === '伪Ver0.0.0立绘版').length,
    1,
    '标题不得在初始化后重绘（重绘 = 转场没到 SHOP）',
  );
});

test('端到端：读档分支（旧的奴隶）进真身读档界面，返回后回标题，不经状态机转场', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0 要有预设才加得进（#35 镜像的引擎守卫）
  preset_chara_0(fixture);
  fixture.set_inputs(0, 100);
  const main = fixture.load_module('main');

  // #136 起读档入口是真身 @SYSTEM_LOADGAME（page-save-load.js）：输入 0 →
  // 读档界面 → [100] 返回 → 原作无条件 RESTART 回标题重绘 → 输入耗尽。
  // 不抛 BeginSignal（读档不转场——原作 CALL 返回后直接 RESTART），也不进 FIRST。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 0 },
    { api: 'input', value: 100 },
  ]);
  assert(
    fixture.lines_history.some(
      (line) => line.text === '【读取存档】要载入以下哪个存档？',
    ),
    '应真的进入读档界面（#136 接通）',
  );
  assert(fixture.text_lines().includes('伪Ver0.0.0立绘版'));
});

test('链内后写信号胜出后进入真实 SHOP 渲染（#22 守卫用例随 #23 改制）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  // 严格夹具：角色 0 要有预设才加得进（#35 镜像的引擎守卫）
  preset_chara_0(fixture);
  fixture.set_inputs(1, 0, 0);
  const { on, TIER } = fixture.load_module('system/event/registry');
  const { begin, STATE } = fixture.load_module('system/flow/begin-signal');
  // 真身出口本就 begin(SHOP)；再追加一个 LATER 档处理器重复 begin(SHOP)，
  // 验证链内后写胜出（#6 语义）后主循环进入 SHOP。#22 时代此处断言「进入
  // 即报错的守卫」；SHOP 接入（#23）后守卫退役，改为断言真实渲染恰一次
  // ——重复进入或未进入都会在计数上暴露。
  on('EVENTFIRST', async () => begin(STATE.SHOP), TIER.LATER);
  const main = fixture.load_module('main');

  await assert.rejects(() => main(), /预置输入已耗尽/);
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('所持金')).length,
    1,
    '主菜单状态行应恰出现一次（SHOP 恰进入并渲染一次）',
  );
});

test('主启动图注册性交系：COM20 与 COM_ABLE20 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(20), true, 'COM20 必须经主启动图注册');
  assert.equal(com_able_family.has(20), true, 'COM_ABLE20 必须经主启动图注册');
});

test('主启动图注册特殊系：COM50 与 COM_ABLE50 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(50), true, 'COM50 必须经主启动图注册');
  assert.equal(com_able_family.has(50), true, 'COM_ABLE50 必须经主启动图注册');
});

test('主启动图注册重度调教系：COM80 与 COM_ABLE80 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(80), true, 'COM80 必须经主启动图注册');
  assert.equal(com_able_family.has(80), true, 'COM_ABLE80 必须经主启动图注册');
});

test('主启动图注册奉仕系：COM30 与 COM_ABLE30 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(30), true, 'COM30 必须经主启动图注册');
  assert.equal(com_able_family.has(30), true, 'COM_ABLE30 必须经主启动图注册');
});

test('主启动图注册道具系：COM10 与 COM_ABLE10 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(10), true, 'COM10 必须经主启动图注册');
  assert.equal(com_able_family.has(10), true, 'COM_ABLE10 必须经主启动图注册');
});

test('主启动图注册追加与高级系：COM122 与 COM_ABLE122 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(122), true, 'COM122 必须经主启动图注册');
  assert.equal(
    com_able_family.has(122),
    true,
    'COM_ABLE122 必须经主启动图注册',
  );
});

test('主启动图注册助手与蕾丝系：COM60 与 COM_ABLE60 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(60), true, 'COM60 必须经主启动图注册');
  assert.equal(com_able_family.has(60), true, 'COM_ABLE60 必须经主启动图注册');
});

test('主启动图注册触手系：COM100 / COM150 / COM208 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );

  assert.equal(com_family.has(100), true, 'COM100 必须经主启动图注册');
  assert.equal(
    com_able_family.has(100),
    true,
    'COM_ABLE100 必须经主启动图注册',
  );
  assert.equal(com_family.has(150), true, 'COM150 必须经主启动图注册');
  assert.equal(com_family.has(208), true, 'COM208 必须经主启动图注册');
});

test('主启动图注册 K2 口上：KOJO_MESSAGE_COM_2 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  assert.equal(
    kojo_message_com_family.has(2),
    true,
    'KOJO_MESSAGE_COM_2 必须经主启动图注册',
  );
});
