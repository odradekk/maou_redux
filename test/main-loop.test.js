/**
 * @file ere/system/flow/main-loop.js 的行为测试（issue #20）：状态机对两条
 * BEGIN 路径的统一接驳，以及「标题 → 新游戏初始化」的端到端转场。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。凡渲染
 * 标题画面的用例先 preset_gamebase（helpers/gamebase.js，标题从静态表读
 * GameBase）。
 *
 * 终止方式：主循环与标题画面都是常驻循环，端到端用例以「预置输入耗尽抛错」
 * 终止（夹具既定设计）；只跑单层函数的用例直接捕获转场信号。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

test('端到端：标题选「新的猎物」→ FIRST 转场 → 存根可见反馈 → 回标题', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(1);
  const main = fixture.load_module('main');

  // 流程：标题画面（消费输入 1，发出 BEGIN FIRST，非事件路径信号上抛）→
  // 主循环接住、进 FIRST 状态 → emit('EVENTFIRST')：存根打印可见反馈、读
  // 任意键、暂存回标题（事件路径，链内信号由 emit 捕获）→ 主循环回到标题
  // → 重绘、等下一次输入 → 预置输入耗尽，夹具抛错终止。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 },
    // 唯一的 waitAnyKey 属于 FIRST 存根：标题的新游戏分支已改为直接转场、
    // 不再读键（那条旧占位路径若回来，这里会出现第二个消费或次序变化）
    { api: 'waitAnyKey' },
  ]);
  // 终态画面是标题（存根把流程送回标题后重绘）
  assert(fixture.text_lines().includes('伪Ver93.106立绘版'));
  // 新游戏路径的变量副作用恰为角色 0 专属初始化的一条写入（ADDCHARA 0 →
  // 经分发注册表 → CHARA_EX_0，issue #21）；RESETDATA 等真初始化归 #22。
  // 全量断言，任何混入的意外写入都会当场暴露
  assert.deepEqual(fixture.var_writes, [{ name: 'ex_talent:0:200', value: 1 }]);
});

test('FIRST 存根（@EVENTFIRST，真身归 #22）：可见反馈 + 读键 + 暂存回标题', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('event/event-first'); // 顶层注册处理器
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  const pending = await emit('EVENTFIRST');

  // 存根出口：转场回标题（保持游戏可玩；真身按原作进 SHOP）
  assert.equal(pending, STATE.TITLE);
  // 可见反馈（T5 验收口径：接住转场并给出可见反馈）
  assert(
    fixture.text_lines().some((line) => line.includes('issue #22')),
    '存根必须打印可见反馈',
  );
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'waitAnyKey' }]);
});

test('端到端：读档分支（旧的奴隶）维持 #19 占位，不经状态机转场', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(0);
  const main = fixture.load_module('main');

  // 占位路径：输入 0 → 占位反馈 + 读键 → 回标题重绘 → 输入耗尽。
  // 不抛 BeginSignal（存档票未决，#20 作用域外），也不该进 FIRST。
  await assert.rejects(() => main(), /预置输入已耗尽/);

  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 0 },
    { api: 'waitAnyKey' },
  ]);
  assert(fixture.text_lines().includes('伪Ver93.106立绘版'));
});

test('未实现状态：进入 SHOP 即报错并点名状态，不静默（后续票的守卫）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(1);
  const { on, TIER } = fixture.load_module('system/event/registry');
  const { begin, STATE } = fixture.load_module('system/flow/begin-signal');
  // 借注册表往 FIRST 链追加一个 LATER 档处理器，把暂存目标从存根的 TITLE
  // 覆盖为 SHOP（后写胜出，正是 #6 语义）：主循环随即进入尚未移植的 SHOP，
  // 守卫必须立即报错并点名状态，而非 undefined 处理器被调用之类的隐秘失效
  on('EVENTFIRST', async () => begin(STATE.SHOP), TIER.LATER);
  const main = fixture.load_module('main');

  await assert.rejects(() => main(), /游戏状态 SHOP 的处理器尚未移植/);
});
