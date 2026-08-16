/**
 * ere/system/flow/main-loop.js 的行为测试（issue #20 起，#22 更新）：
 * 状态机对两条 BEGIN 路径的统一接驳，以及「标题 → 新游戏初始化 → SHOP」
 * 的端到端转场。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。凡渲染
 * 标题画面的用例先 preset_gamebase（helpers/gamebase.js，标题从静态表读
 * GameBase）。
 *
 * 终止方式：主循环是常驻循环。新游戏路径以「SHOP 守卫报错」终止（@EVENTFIRST
 * 真身出口 BEGIN SHOP，主菜单渲染归 #23——报错即到站）；读档路径以「预置
 * 输入耗尽抛错」终止（夹具既定设计）。
 *
 * 已知未测行：STATE.FIRST 处理器的 `?? STATE.SHOP` 兜底（链无人 BEGIN 时
 * 默认进商店轮，#20 验收移交的 Emuera 语义）。真身处理器必然 begin(SHOP)，
 * 兜底在当前注册表下不可达、无法不设钩子地观测——它是防御性的引擎行为
 * 镜像，留待未来出现「可无 BEGIN 的 EVENTFIRST 处理器组合」时再证。
 * 交互提醒（变异测试者须知）：整删 event-first 的 begin(SHOP) 后端到端
 * 仍绿（兜底按 Emuera 语义接住，非假绿），但 emit 层用例
 * （test/event-first.test.js 的 pending 断言）会红——那才是出口的守卫。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

test('端到端：标题选「新的猎物」→ FIRST 初始化 → 转入 SHOP（守卫报错即到站）', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(1);
  const main = fixture.load_module('main');

  // 流程：标题画面（消费输入 1，resetData + 加入角色 0，BEGIN FIRST 信号
  // 上抛）→ 主循环进 FIRST → emit('EVENTFIRST')：真身完成初始化、开场
  // 叙事读键 7 次、begin(SHOP)（事件路径，链内信号由 emit 捕获暂存）→
  // 主循环进入尚未移植的 SHOP，守卫报错。初始化细节的逐项断言在
  // test/event-first.test.js，此处只证主循环的转场接驳。
  await assert.rejects(() => main(), /游戏状态 SHOP 的处理器尚未移植/);

  // 标题恰消费一次输入；此后至报错为止只有叙事读键（不再回标题重绘）
  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'input', value: 1 },
    ...Array.from({ length: 7 }, () => ({ api: 'waitAnyKey' })),
  ]);
  // 到站证据：标题只画过转场前的那一次（FIRST 之后没有回标题重绘），
  // 最后的输出内容是初始化流程的
  const texts = fixture.text_lines();
  assert(texts.some((line) => line.includes('@RAND_CHARA_MAKE')));
  assert.equal(
    texts.filter((line) => line === '伪Ver93.106立绘版').length,
    1,
    '标题不得在初始化后重绘（重绘 = 转场没到 SHOP）',
  );
});

test('端到端：读档分支（旧的奴隶）维持 #19 占位，不经状态机转场', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.set_inputs(0);
  const main = fixture.load_module('main');

  // 占位路径：输入 0 → 占位反馈 + 读键 → 回标题重绘 → 输入耗尽。
  // 不抛 BeginSignal（存档票未决），也不该进 FIRST。
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
  // 真身出口本就 begin(SHOP)；再追加一个 LATER 档处理器重复 begin(SHOP)，
  // 验证链内后写胜出（#6 语义）后主循环仍正确进入未移植状态——守卫必须
  // 立即报错并点名状态，而非 undefined 处理器被调用之类的隐秘失效
  on('EVENTFIRST', async () => begin(STATE.SHOP), TIER.LATER);
  const main = fixture.load_module('main');

  await assert.rejects(() => main(), /游戏状态 SHOP 的处理器尚未移植/);
});
