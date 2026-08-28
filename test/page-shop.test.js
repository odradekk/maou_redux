/**
 * ere/page/page-shop.js @USERSHOP 输入分发的行为测试（issue #24）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。经
 * run_shop 驱动（公开接口）：预置一串输入，循环以「预置输入耗尽抛错」终止
 * （夹具既定设计），再对输出行、变量读写与角色列表断言。
 *
 * 取证标准（#73 起）：主菜单就地重绘，终态 lines 只留最后一轮——「哪轮
 * 画过什么 / 进没进过哪个分支」的断言一律看夹具的全量行史 lines_history
 * （含被重绘清掉的条目）；「屏幕现在是什么」的断言仍看 lines/text_lines。
 *
 * 覆盖（对应 #24 验收清单）：
 *   1. 六个入口：496/497（守卫 A > 0，SELECT_TARGET/SELECT_ASSI 占位反馈）、
 *      500/501/504/505（FLAG:36 切换 + 重绘即反馈，不叠占位文本——派单
 *      核实事实 #2）；
 *   2. 守卫 A == 0：496/497/100 与无效输入同路（落链尾重绘、无反馈——
 *      原作行为，派单核实事实 #4，勿放宽）；
 *   3. 无效输入：不抛错、无提示、画面重绘（原作无 ELSE，:228 RETURN 0，
 *      派单核实事实 #5）；
 *   4. 连续多轮混合操作后状态一致；
 *   5. 作用域外指令分支的壳：占位带原作调用名（派单核实事实 #7——不静默
 *      丢掉），含 110/111 守卫与 520-530 区间的 1:1；
 *   6. 存根清单核对（docs/stub-registry.md）。
 *
 * 已知未测行（变异测试实证，勿误当守卫）：作用域外的每个指令壳只抽查代表
 * （101/777/200/888/199/525 + 498/499 + 999 + 7788 未逐个断言）——壳的
 * 完整性由 STUBBED_CALLS 核对与链结构的 deepEqual 之外的代码评审承担；
 * 删掉某个未抽查的壳（如 102 DUNGEON_INFO2）测试仍绿，认领对应子系统票时
 * 以 docs/stub-registry.md 的专节为核对依据。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

// 跑一遍商店轮：预置 inputs，活到输入耗尽（夹具既定的终止方式），返回夹具。
// 终止方式本身即证据之一：分发若抛错，reject 的会是别的消息。
async function run_shop_with(...inputs) {
  const fixture = create_era_fixture();
  fixture.set_inputs(...inputs);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  return fixture;
}

// 主菜单画了几轮 = 按钮 496 在全量行史里出现几次（每轮 @SHOW_SHOP 恰画
// 一个；就地重绘会把上一轮清掉，终态数不出轮数——取证在行史）
function rounds_drawn(fixture) {
  return fixture.lines_history.filter(
    (line) => line.type === 'button' && line.accelerator === 496,
  ).length;
}

// 全量行史的文本行（含已被重绘清掉的）——「发生过什么」的断言入口
function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// 加入一个可选奴隶（x != 0 且 CFLAG:x:1 == 0 → 计入 A）。须先 seed 预设
// （#35 镜像的引擎守卫：无预设的 addCharacter 不加）。
function join_selectable_slave(fixture, id) {
  fixture.seed_chara(id, { id, name: `奴隶${id}` });
  fixture.era.addCharacter(id);
}

test('面板入口 500/501/504/505：切换 FLAG:36，重绘即反馈（不叠占位文本）', async () => {
  const fixture = await run_shop_with(501, 504, 505, 500);
  // FLAG:36（信息面板选择）的写入序列恰为输入序列，末值 0（最后一次 500）
  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name === 'flag:36').map((w) => w.value),
    [1, 4, 5, 0],
  );
  assert.equal(fixture.store.get('flag:36'), 0);
  // 重绘即反馈：每轮恰两行占位（子面板 + 指令面板渲染），没有为面板按钮
  // 多打一行「占位反馈」——叠了会在此红（派单核实事实 #2）。#180 起地城
  // 两面板真身：轮 3（地城概况）只余指令面板占位 1 行；#179 起轮 4（地城
  // 日常）尾部的 DISPLAY_DUNGEON_DAILY 亦为真身，同样只余指令面板占位
  // 1 行——合计 2+2+1+1+2 = 8
  assert.equal(rounds_drawn(fixture), 5);
  assert.equal(
    history_texts(fixture).filter((line) => line.includes('尚未移植')).length,
    8,
  );
  // 切换后的重绘确实换到了对应面板：第 2/3/4 轮的面板内容各自可见
  //（HAVETRAPS 仍是存根占位；地城两面板 #180 起真身，看读数标记）
  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line.includes('@DRAW_HAVETRAPS')).length,
    1,
    `切换后应恰一次重绘出 @DRAW_HAVETRAPS 面板`,
  );
  for (const marker of ['迷宫Lv', '威望值']) {
    assert.equal(
      texts.filter((line) => line.includes(marker)).length,
      1,
      `切换后应恰一次重绘出「${marker}」读数`,
    );
  }
  // 首轮面板是 DRAW_HAVEITEMS（FLAG:36 未声明读值 0），500 切回后恰两次
  assert.equal(
    texts.filter((line) => line.includes('@DRAW_HAVEITEMS')).length,
    2,
  );
});

test('496（A > 0）：SELECT_TARGET 真身列表可取消，497 仍为存根占位', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31);
  fixture.set_inputs(496, 999, 497);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  const texts = history_texts(fixture);
  // 496：真身选择画面（列表 + 999 取消——取消不选人、回主菜单重绘；选择
  // 画面作为分发期输出被就地重绘消费，取证在行史）
  assert(texts.includes('请魔王大人选择将要调教的奴隶人选'));
  // 奴隶行是按钮（#44 验收后实机修正）：断言看引擎渲染文本
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'button' && line.rendered === '[31] 奴隶31',
    ),
    '奴隶行必须是可点击按钮，accelerator = 角色 ID',
  );
  assert(
    texts.some((line) => line.includes('@SELECT_ASSI')),
    '497 应占位 @SELECT_ASSI',
  );
  assert(
    fixture.waits.some((w) => w.waited),
    '497 的分发期存根必须等键（玩家先看到再被重绘清掉）',
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, -1, '取消不得选中目标');
  assert.equal(era_flag.assi, -1, '存根不得选中助手');
});

test('100（A > 0）无目标：SELECT_TARGET 取消（返回 0）后回循环，不进调教', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31);
  fixture.set_inputs(100, 999);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  // :67-68 SIF RESULT == 0 → RETURN 0：取消路径不转场（主菜单重绘到耗尽；
  // 选择画面被重绘消费，取证在行史）
  const texts = history_texts(fixture);
  assert(texts.includes('请魔王大人选择将要调教的奴隶人选'));
  assert(
    !texts.some((line) => line.includes('调教中')),
    '取消路径不得进入调教画面',
  );
  // 主菜单画了两轮：首绘（输入 100 前）+ 取消回循环后的重绘（其下一次
  // input 抛耗尽到站）
  assert.equal(rounds_drawn(fixture), 2);
});

test('100（A > 0）已有目标：begin(TRAIN) 信号上抛（#44 接通，主循环接站）', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  fixture.set_inputs(100);
  const { run_shop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  // :99 BEGIN TRAIN —— 原作引擎行为：BEGIN 结束当前函数。ere 侧 begin() 抛
  // 信号、run_shop 不捕获自然上抛，由主循环接站（端到端见
  // test/train-loop.test.js）
  await assert.rejects(
    () => run_shop(),
    (e) => e instanceof BeginSignal && e.state === 'TRAIN',
  );
  // 助手循环已跑过：ASSI == 0 → -1（单奴隶路径 TEMP:3 = 0，SELECT_ASSI
  // 不可达——:85-86 的空操作照搬）
  assert.equal(era_flag.assi, -1);
});

test('100 的育儿室守卫：CFLAG:MASTER:1 == 10 → 报文 RETURN 0，不转场', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31; // 已有目标：直入助手循环段
  fixture.store.set('cflag:0:1', 10); // 魔王在育儿室（CFLAG:MASTER:1）
  fixture.set_inputs(100);
  const { run_shop } = fixture.load_module('page/page-shop');

  // :93-96 PRINTFORMW 育儿室中的%CALLNAME:MASTER%不能进行调教…… → RETURN 0
  //（报文行是分发期输出，被下一轮重绘消费——取证在行史）
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  const texts = history_texts(fixture);
  assert(texts.some((line) => line.includes('育儿室中的你不能进行调教')));
  assert(
    !texts.some((line) => line.includes('调教中')),
    '育儿室守卫拦下后不得进调教画面',
  );
});

test('守卫 A == 0：496/497 与无效输入同路——无反馈、只重绘；100 分支不可达（原作行为，#130）', async () => {
  // 不加任何可选奴隶（A 只数 x != 0 的未占用角色）：A 恒 0
  const fixture = await run_shop_with(496, 497);
  const texts = history_texts(fixture);
  assert(
    !texts.some((line) => line.includes('@SELECT_')),
    'A == 0 时不得进 496/497 分支',
  );
  // 两次输入都被守卫拦下后落到链尾，回循环重绘（2 次输入 + 首轮 = 3 轮）
  assert.equal(rounds_drawn(fixture), 3);
  // 除每轮固定的两行存根外无任何新增输出；行史文本行总数固定为每轮 5 行
  //（状态行 + 面板存根 + Commands 标题 + [---] 不可选占位 + 指令面板存根）
  //——多打任何一行（含给守卫拦下的输入加「提示」）都会在此红。A == 0 时
  // [100] 调教退化为灰色 [---] 文本（原作 :229-231），A > 0 时它是按钮、
  // 不计入文本行
  assert.equal(texts.filter((line) => line.includes('尚未移植')).length, 3 * 2);
  assert.equal(texts.length, 3 * 5);

  // [100] 的守卫走直接分发验证：A == 0 时 [100] 不渲染（[---] 文本占位），
  // 引擎的 input() 不会送达 100（#130）——进不了调教分支只能经 usershop
  // 直调证明，且不得发出 BEGIN TRAIN 信号、不得打出 @BEGIN TRAIN 占位
  const bare = create_era_fixture();
  const { usershop } = bare.load_module('page/page-shop');
  await usershop(100); // 不得抛 BeginSignal（A == 0 拦下）
  assert(
    !history_texts(bare).some((line) => line.includes('@BEGIN TRAIN')),
    'A == 0 时 100 分支不得进调教',
  );
});

test('未打印按钮的值引擎不送达：拒收且只画首轮（原作无 ELSE 的死路径，#130）', async () => {
  // 原用例喂 42/531/9999/-7 验证「无效输入不抛错、只重绘」——Emuera 的
  // INPUT 收任意键入数字，这套行为在原作成立；EraElectron 的引擎只把已
  // 打印按钮的快捷键回传，这些值在渲染层就被弹回，@USERSHOP 的链尾是
  // 引擎死路径。新形态＝#130 的防线本身：拒收发生在 input、画面不再推进
  const fixture = create_era_fixture();
  fixture.set_inputs(42, 531, 9999, -7);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /输入不合法！请输入以下值之一：/);

  assert.deepEqual(fixture.inputs_consumed, [], '四个值无一被送达');
  assert.equal(
    rounds_drawn(fixture),
    1,
    '拒收后不得重绘（引擎在等下一次输入）',
  );
  const texts = history_texts(fixture);
  assert.equal(texts.filter((line) => line.includes('尚未移植')).length, 1 * 2);
  assert.equal(texts.length, 1 * 5);
});

test('连续多轮混合操作后状态一致', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  // 加入可选奴隶 31（A = 1）：496 会真进分支（真身选择画面，不选人）；
  // 更重要的是指针若被某个分支污染成 31，能活过绘制侧的越界守卫（31 在
  // 已加入列表里）——不加角色的话守卫会把一切脏值洗回 -1，污染不可观测
  //（变异测试抓到的误报通过形态）
  join_selectable_slave(fixture, 31);
  era_flag.money = 10000;
  era_flag.day_count = 0;
  era_flag.month = 1;
  era_flag.target = -1;
  // 全部走已打印按钮（#130）：两次面板切换 → [496] 进真身 SELECT_TARGET
  // → [999] 取消（不选人）→ [505] 再切面板；随后输入耗尽。原用例混入的
  // 42/9999（主菜单无效输入）与选择画面里的 500/501（非目标按钮）在引擎
  // 侧都不会送达，已删
  fixture.set_inputs(501, 504, 496, 999, 505);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  assert.equal(fixture.store.get('flag:36'), 5, '最后一次面板输入是 505');
  // 496 的选择画面（取消不选人）、面板切换都不碰游戏状态——指针保持 -1
  //（31 是合法 ID，若被写会活过守卫、在此暴露）
  assert.equal(era_flag.money, 10000);
  assert.equal(era_flag.day_count, 0);
  assert.equal(era_flag.target, -1);
  assert.equal(era_flag.assi, -1);
  assert.deepEqual(fixture.era.getAddedCharacters(), [31]);
  // 5 次输入全部消费；主菜单重绘 4 轮（首轮 + 501/504/496 三次输入），
  // 496 进选择画面（画面自己的重绘不画主菜单按钮），999 取消回主菜单后
  // 505 是第 5 次输入、随后耗尽——状态不错乱
  assert.equal(fixture.inputs_consumed.length, 5);
  assert.equal(rounds_drawn(fixture), 5);
  assert(
    history_texts(fixture).some((line) =>
      line.includes('请魔王大人选择将要调教的奴隶人选'),
    ),
    '496 应进入真身选择画面（取证在行史：取消后已被主菜单重绘清掉）',
  );
});

// 直接驱动 @USERSHOP 分发（#130）：存根分支（101-888、498/499、52x、999）
// 按政策不印按钮（按钮与真身同票落地，见 page-main-menu 的普查注释），引擎
// 的 input() 不会送达它们的编号——这些分支的分发行为只能经直调测试
async function dispatch(...results) {
  const fixture = create_era_fixture();
  const { usershop } = fixture.load_module('page/page-shop');
  for (const result of results) {
    await usershop(result); // 守卫拦下的直调不得抛信号（抛了会在用例里炸出）
  }
  return fixture;
}

test('作用域外的指令分支：壳占位带原作调用名（代表抽查）', async () => {
  // 六次分发各打一行存根并等键（#73：玩家看到后再重绘）；取证在行史。
  // 200 自 #136 起是真身存档界面（下方独立用例），不再走占位
  const fixture = await dispatch(101, 777, 888, 199, 525, 7788);
  const texts = history_texts(fixture);
  for (const name of [
    '@CHARA_INFO',
    '@CONFIG',
    '@MAOUNET',
    '@BEGIN TURNEND',
    '@SHOW_FLOOR',
    '@RELATION_DEBUGPRINT',
  ]) {
    assert(
      texts.some((line) => line.includes(name)),
      `指令壳应占位 ${name}`,
    );
  }
});

test('200/300：真身存读档界面（#136 接通，占位移除）', async () => {
  {
    const fixture = create_era_fixture();
    const { usershop } = fixture.load_module('page/page-shop');
    fixture.set_inputs(100); // 进存档界面后直接返回
    await usershop(200);
    assert(
      history_texts(fixture).some((line) =>
        line.includes('要保存到以下哪个存档？'),
      ),
      '200 必须进入真身存档界面',
    );
  }
  {
    const fixture = create_era_fixture();
    const { usershop } = fixture.load_module('page/page-shop');
    fixture.set_inputs(100);
    await usershop(300);
    assert(
      history_texts(fixture).some((line) => line.includes('【读取存档】')),
      '300 必须进入真身读档界面（与标题画面共用）',
    );
  }
});

// —— #137：读档转场与 @EVENTSHOP 的跳过 ——

test('300 读档成功：BeginSignal 从 usershop 上抛（run_shop 循环被打断，主循环接站）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('global:saves:3', '三号档');
  const { usershop } = fixture.load_module('page/page-shop');
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);

  // #136 实机验收撞出的缺陷正主：读档成功后 ere 侧曾把 era.loadData() 当
  // 普通函数、返回后回主菜单循环——实机上据点 [300] 读档后回主菜单而非
  // 重进据点。LOADDATA 是转场命令（SYSTEM_DATA.ERB:71），读档成功必须以
  // 信号离开，run_shop 的循环（连同本用例的调用栈）被信号打断
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );
  await assert.rejects(
    () => usershop(300),
    (e) => e instanceof BeginSignal && e.state === STATE.SHOP_AFTER_LOAD,
    '读档成功必须转场——不得静默回主菜单循环',
  );
});

test('SHOP_AFTER_LOAD：读档后的进入路径不执行 @EVENTSHOP（system-flow.md:51-53）', async () => {
  // 探针挂在链上（page-shop 自己的普通档与 kojo 的 #PRI 档之外再加一个
  // 只计数的），分别驱动两条进入路径
  const probe_and_run = async (options) => {
    const fixture = create_era_fixture();
    // 装配 kojo 的 #PRI 档（真实链形状：多档注册），计数探针挂 NORMAL 档
    fixture.load_module('kojo/kojo-system');
    const { on } = fixture.load_module('system/event/registry');
    let probe = 0;
    on('EVENTSHOP', () => {
      probe += 1;
    });
    const { run_shop } = fixture.load_module('page/page-shop');
    fixture.set_inputs(500); // 面板切换分支：一轮分发后回循环，下一次 input 耗尽
    await assert.rejects(() => run_shop(options), /预置输入已耗尽/);
    return { fixture, probe };
  };

  const normal = await probe_and_run();
  assert.ok(normal.probe >= 1, '正常进入（BEGIN SHOP）必须执行 @EVENTSHOP');
  assert(
    normal.fixture.lines_history.some((line) => line.type === 'button'),
    '正常路径主菜单照常渲染',
  );

  const after_load = await probe_and_run({ skip_eventshop: true });
  assert.equal(
    after_load.probe,
    0,
    '读档后的进入路径不得执行 @EVENTSHOP（读回来的世界以存档数据为准）',
  );
  assert(
    after_load.fixture.lines_history.some((line) => line.type === 'button'),
    '跳过的是 @EVENTSHOP，主菜单渲染不受影响',
  );
});

test('状态机映射：enter_state(SHOP_AFTER_LOAD) 走 run_shop 的跳过变体', async () => {
  const fixture = create_era_fixture();
  // main-loop 装配全部事件模块（require 清单），enter_state 是主循环真正
  // 调用的入口——直接钉「映射没有指回 run_shop 原样」
  const main_loop = fixture.load_module('system/flow/main-loop');
  const { on } = fixture.load_module('system/event/registry');
  let probe = 0;
  on('EVENTSHOP', () => {
    probe += 1;
  });
  fixture.set_inputs(500);
  await assert.rejects(
    () => main_loop.enter_state('SHOP_AFTER_LOAD'),
    /预置输入已耗尽/,
  );
  assert.equal(probe, 0, '经主循环进入 SHOP_AFTER_LOAD 同样不跑 @EVENTSHOP');
  assert(
    fixture.lines_history.some((line) => line.type === 'button'),
    '主菜单画面照常出现（读档后玩家落进据点）',
  );
});

test('110/111 的守卫照原作：不满足时与无效输入同路', async () => {
  // talent 表未落 yml/（TALENT:0:325 读值 undefined）、FLAG:83/84 未置——
  // 两守卫都不成立。原作此时渲染 `[---]` 占位、键入 110/111 走链尾；ere
  // 的引擎侧等价形态＝不印按钮（键入被渲染层弹回，#130），守卫行为经
  // usershop 直调验证
  const off = await dispatch(110, 111);
  assert(
    !history_texts(off).some((line) => line.includes('@SECRET_LABO')),
    '守卫不成立不得进 110',
  );
  assert(
    !history_texts(off).some((line) => line.includes('@INFRASTRUCTURE')),
    '守卫不成立不得进 111',
  );

  // 守卫成立：原作 PRINTLCD [110]/[111]（DRAW_MAINMENU.ERB:286/:292），
  // 按钮本体随实验室/设施票落地（存根不印按钮的政策），分发直调验证
  const on = create_era_fixture();
  on.store.set('talent:0:325', 1); // 魔王的魔界知识
  on.store.set('flag:83', 3); // 肉便器数 > 0
  const { usershop } = on.load_module('page/page-shop');
  await usershop(110);
  await usershop(111);
  assert(
    history_texts(on).some((line) => line.includes('@SECRET_LABO')),
    '守卫成立应进 110',
  );
  assert(
    history_texts(on).some((line) => line.includes('@INFRASTRUCTURE')),
    '守卫成立应进 111',
  );
});

test('520-530 区间判定 1:1：520 与 531 不匹配，530 匹配（RESULT > 520）', async () => {
  // 楼层按钮（原作 PRINTBUTTON X+520）随楼层面板票落地，分发直调验证
  const fixture = await dispatch(520, 531, 530);
  assert.equal(
    history_texts(fixture).filter((line) => line.includes('@SHOW_FLOOR'))
      .length,
    1,
    '仅 530 命中（原作 :168 RESULT > 520 && RESULT <= 530）',
  );
});

test('999 落到调试菜单（店内 999 因 BOUGHT 无落点不可达）', async () => {
  // 原作主菜单不印 [999]（DRAW_MAINMENU 的编号表 100-888 无它）——键入式
  // 后门在引擎侧不可达（#130），调试分支经 usershop 直调验证
  const fixture = await dispatch(999);
  assert(
    history_texts(fixture).some((line) => line.includes('@DEBUG_MENU_U')),
    '999 应占位 @DEBUG_MENU_U（与原作 BOUGHT == -1 时同路径）',
  );
});

test('498/499 无守卫：指针未选也照原作进分支', async () => {
  const fixture = await dispatch(498, 499);
  assert.equal(
    history_texts(fixture).filter((line) =>
      line.includes('@CHARA_INFO_INDIVIDUAL_WAPPED'),
    ).length,
    2,
    '498/499 各占位一次（原作 :156-159 无 A 守卫）',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-shop');
  const registry_path = path.resolve(
    __dirname,
    '..',
    'docs',
    'stub-registry.md',
  );
  const registry = fs.readFileSync(registry_path, 'utf8');

  // 先固定名单本身（漏登记会在此红，#22 验收抓过的误报通过形态），再核对清单。
  // SELECT_TARGET 与 100 分支的 BEGIN TRAIN 自 #44、INVASION 与 109 分支的
  // BEGIN TURNEND 自 #117 起为真身/真转场，SYSTEM_SAVEGAME / SYSTEM_LOADGAME
  // 自 #136 起为真身（200/300 分支），DUNGEON_INFO2 自 #180 起为真身
  //（102 分支，page-dungeon-info2.js），已移出
  assert.deepEqual(STUBBED_CALLS, [
    'SELECT_ASSI',
    'CHARA_INFO',
    '批量处刑',
    'INTERCEPT',
    'ABILITY_UP',
    'CHARA_SALE',
    'ITEM_SHOP',
    'TAILOR_MAIN',
    'SECRET_LABO',
    'INFRASTRUCTURE',
    'BEGIN TURNEND',
    'CONFIG',
    'MAOUNET',
    'LABO',
    'CHARA_INFO_INDIVIDUAL_WAPPED',
    'SHOW_FLOOR',
    'MONSTER_SHOP',
    'DEBUG_MENU_U',
    'RELATION_DEBUGPRINT',
  ]);
  // 运行时占位的存根必须在清单里（删清单行或删存根不同步，都会在这里红）
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

test('A 的判据两半都算数：被占用的奴隶（CFLAG:x:1 != 0）不计入', async () => {
  // 验收变异实测：把 count_selectable_slaves 的 `CFLAG:x:1 == 0` 条件删掉，
  // 143 条测试全绿——因为在场用例里「已加入的奴隶」与「可选的奴隶」恰好
  // 总是同一批，判据的这一半从未被观察到。本用例造出两者不同的局面。
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31);
  // 原作 DRAW_MAINMENU.ERB:215 的 SIF CFLAG:COUNT:1 == 0 —— 非 0 = 该奴隶
  // 当前不可选（占用中），A 不计它
  fixture.store.set('cflag:31:1', 2);
  fixture.set_inputs(496);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  assert(
    !history_texts(fixture).some((line) =>
      line.includes('请魔王大人选择将要调教的奴隶人选'),
    ),
    '唯一的奴隶被占用时 A 应为 0，496 进不去',
  );

  // 对照：同样一个奴隶、未被占用时 496 确实进得去（真身选择画面），
  // 排除「因为别的原因没进」——选择画面被就地重绘消费，取证在行史
  const control = create_era_fixture();
  join_selectable_slave(control, 31);
  control.set_inputs(496, 999);
  const { run_shop: run_control } = control.load_module('page/page-shop');
  await assert.rejects(() => run_control(), /预置输入已耗尽/);
  assert(
    history_texts(control).some((line) =>
      line.includes('请魔王大人选择将要调教的奴隶人选'),
    ),
    '未占用的奴隶应让 A > 0',
  );
});
