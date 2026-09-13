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
 * （101/777/200/199/525 + 498/499 + 999 未逐个断言）——壳的
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

test('面板入口 500/501/504/505：切换 FLAG:36，重绘即反馈（各面板真身内容）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('item:60', 1); // 落穴：给 DRAW_HAVETRAPS 一个可见标记
  fixture.store.set('itemname:60', '落穴'); // 夹具不读 yml/，名字表须显式播种
  fixture.set_inputs(501, 504, 505, 500);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  // FLAG:36（信息面板选择）的写入序列恰为输入序列，末值 0（最后一次 500）
  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name === 'flag:36').map((w) => w.value),
    [1, 4, 5, 0],
  );
  assert.equal(fixture.store.get('flag:36'), 0);
  // 首绘 + 4 次输入各触发一次重绘
  assert.equal(rounds_drawn(fixture), 5);

  const texts = history_texts(fixture);
  // #395 起四个子面板与指令面板全部真身：混合切换不再产生任何存根占位行
  assert.equal(
    texts.filter((line) => line.includes('尚未移植')).length,
    0,
    '四个子面板 + 指令面板均已落真身，本轮组合不应再打任何存根占位',
  );
  // 切换后的重绘确实换到了对应面板：第 1/5 轮是 HAVEITEMS（技巧Lv 头行），
  // 第 2 轮是 HAVETRAPS（落穴标记），第 3/4 轮是地城两面板真身读数
  assert.equal(
    texts.filter((line) => line.includes('技巧Lv')).length,
    2,
    '首轮与末轮（500 切回）都是 DRAW_HAVEITEMS',
  );
  assert.equal(
    texts.filter((line) => line.includes('落穴')).length,
    1,
    '切到 501 应恰一次重绘出 DRAW_HAVETRAPS 的道具网格',
  );
  for (const marker of ['迷宫Lv', '威望值']) {
    assert.equal(
      texts.filter((line) => line.includes(marker)).length,
      1,
      `切换后应恰一次重绘出「${marker}」读数`,
    );
  }
});

test('496/497（A > 0）：SELECT_TARGET/SELECT_ASSI 均为真身，可取消回主菜单', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31);
  fixture.store.set('cflag:31:0', 2); // 31 同时挂助手役，497 才有候选可选
  fixture.set_inputs(496, 999, 497, 999);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  // 496/497：各自的真身选择画面（列表 + 999 取消——取消不选人、回主菜单
  // 重绘；两个画面都作为分发期输出被就地重绘消费，取证在行史）
  const texts = history_texts(fixture);
  assert(texts.includes('请魔王大人选择将要调教的奴隶人选'));
  assert(texts.includes('请魔王大人选择在调教过程当中的助手人选'));
  // 候选行是按钮（#44/#395 验收后实机修正）：断言看引擎渲染文本
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' && line.rendered?.startsWith('[31] 奴隶31'),
    ),
    '目标候选行必须是可点击按钮，accelerator = 角色 ID',
  );

  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, -1, '取消不得选中目标');
  assert.equal(era_flag.assi, -1, '取消不得选中助手');
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

test('100 分支 SELECT_ASSI_LOOP：assi_candidates 恰好 1 个候选时调用 SELECT_ASSI（>= 1 下界为真）', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31); // 调教目标
  join_selectable_slave(fixture, 32); // 唯一助手候选
  fixture.store.set('cflag:32:0', 2); // 助手役，未占用，且不是 target——恰 1 个候选
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31; // 已有目标：直入助手循环段
  const { usershop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  fixture.set_inputs(32); // SELECT_ASSI 的候选按钮（accelerator = 角色 ID）

  await assert.rejects(
    () => usershop(100),
    (e) => e instanceof BeginSignal && e.state === 'TRAIN',
    '恰 1 个候选时应经 SELECT_ASSI 选中后正常进调教',
  );
  assert(
    history_texts(fixture).includes('请魔王大人选择在调教过程当中的助手人选'),
    'assi_candidates >= 1 必须真的调用 SELECT_ASSI（而非跳过）',
  );
  assert.equal(era_flag.assi, 32);
});

test('100 分支 SELECT_ASSI_LOOP：候选恰好 0 个（另一角色不是助手役）时跳过 SELECT_ASSI（>= 1 下界为假）', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31); // 调教目标
  join_selectable_slave(fixture, 33); // 在场但不是助手役——不计入候选
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  const { usershop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  await assert.rejects(
    () => usershop(100),
    (e) => e instanceof BeginSignal && e.state === 'TRAIN',
    '0 个候选时应跳过 SELECT_ASSI 直接进调教',
  );
  assert(
    !history_texts(fixture).includes('请魔王大人选择在调教过程当中的助手人选'),
    'assi_candidates 恰为 0 时不得调用 SELECT_ASSI（33 不是助手役，不计入候选）',
  );
  assert.equal(
    era_flag.assi,
    -1,
    '0 个候选时 ASSI == 0 的防御性归一仍要跑到 -1',
  );
});

test('100 分支：ASSI 已有合法人选（> 0）时跳过候选计算与 SELECT_ASSI（era_flag.assi <= 0 守卫为假）', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31); // 调教目标
  join_selectable_slave(fixture, 32); // 本该是候选，但守卫为假时不会被算到
  fixture.store.set('cflag:32:0', 2);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = 32; // 已选定助手（> 0），且与 target 不同——守卫应直接跳过整块
  const { usershop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  await assert.rejects(
    () => usershop(100),
    (e) => e instanceof BeginSignal && e.state === 'TRAIN',
  );
  assert(
    !history_texts(fixture).includes('请魔王大人选择在调教过程当中的助手人选'),
    'ASSI 已是合法人选时不得重新进入 SELECT_ASSI',
  );
  assert.equal(era_flag.assi, 32, '既有人选不因守卫跳过而被改动');
});

test('100 分支：SELECT_ASSI 返回 2（我先想想）直接 RETURN，不进 BEGIN TRAIN（assi_result === 2 为真）', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 31); // 调教目标
  join_selectable_slave(fixture, 32); // 唯一助手候选
  fixture.store.set('cflag:32:0', 2);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  const { usershop } = fixture.load_module('page/page-shop');
  fixture.set_inputs(999); // SELECT_ASSI 的「我先想想」取消按钮

  await usershop(100); // assi_result === 2 → RETURN 0：不得抛 BeginSignal
  assert(
    !history_texts(fixture).some((line) => line.includes('@BEGIN TRAIN')),
    'assi_result === 2 时不得进入调教',
  );
});

test('100 分支循环尾检查：ASSI 预先等于 TARGET 时复位为 -1，随后仍正常进调教（era_flag.target === era_flag.assi 外层判据为真）', async () => {
  const fixture = create_era_fixture();
  join_selectable_slave(fixture, 1); // id 恰为 1：卡在 era_flag.assi >= 1 的下界
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 1;
  era_flag.assi = 1; // 陈旧同人号（恰为边界值 1）：> 0 直接跳过候选计算块，只有 :91-92 循环尾检查能拦下它
  const { usershop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  await assert.rejects(
    () => usershop(100),
    (e) => e instanceof BeginSignal && e.state === 'TRAIN',
  );
  assert(
    !history_texts(fixture).includes('请魔王大人选择在调教过程当中的助手人选'),
    'ASSI > 0 时候选计算块本就该被跳过（本用例专测循环尾检查，非候选块）',
  );
  assert.equal(
    era_flag.assi,
    -1,
    '循环尾检查发现 TARGET === ASSI 时必须复位为 -1',
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
  // 行史文本行总数固定为每轮 13 行（状态行 1 + DRAW_HAVEITEMS 头行/两段
  // 网格收尾 3 + Commands 标题 1 + 八个 A/B/FLAG 守卫不成立的 [---] 占位：
  // [100][101][103][104][106][108][110][111]）——多打任何一行（含给守卫
  // 拦下的输入加「提示」）都会在此红。#395 起四个子面板与指令面板全部
  // 真身，A == 0 时不再有任何「尚未移植」存根占位
  assert.equal(texts.filter((line) => line.includes('尚未移植')).length, 0);
  assert.equal(texts.length, 3 * 13);

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
  assert.equal(texts.filter((line) => line.includes('尚未移植')).length, 0);
  assert.equal(texts.length, 1 * 13);
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

// 直接驱动 @USERSHOP 分发（#130）：仍无按钮的分支（101-777 里除 199/888 外
// 的分发本体、498/499、52x、999/7788）引擎的 input() 不会送达它们的编号
// （无按钮或隐藏调试入口）——这些分支的分发行为只能经直调测试
async function dispatch(...results) {
  const fixture = create_era_fixture();
  const { usershop } = fixture.load_module('page/page-shop');
  for (const result of results) {
    await usershop(result); // 守卫拦下的直调不得抛信号（抛了会在用例里炸出）
  }
  return fixture;
}

test('作用域外的指令分支：壳占位带原作调用名（代表抽查）', async () => {
  // 四次分发各打一行存根并等键（#73：玩家看到后再重绘）；取证在行史。
  // 200 自 #136 起是真身存档界面，199 自 #395 起是真身 BEGIN TURNEND
  // 转场（专属用例见下），101 自 #391 起是真身角色信息画面
  // （test/page-chara-info.test.js 独立覆盖），均不再走占位
  const fixture = await dispatch(777, 103, 525);
  const texts = history_texts(fixture);
  for (const name of ['@CONFIG', '@批量处刑', '@SHOW_FLOOR']) {
    assert(
      texts.some((line) => line.includes(name)),
      `指令壳应占位 ${name}`,
    );
  }
});

test('199 休息：内联文本 + FLAG:9 += 5 + BEGIN TURNEND（#395，回合真能推进）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:9', 10);
  const { usershop } = fixture.load_module('page/page-shop');
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );

  await assert.rejects(
    () => usershop(199),
    (e) => e instanceof BeginSignal && e.state === STATE.TURNEND,
    '休息必须以 BEGIN TURNEND 转场（本票的到站标记）',
  );
  assert(
    history_texts(fixture).includes('你专心于内政，稍作了休息……（税金+5%）'),
    '必须打印原作的内联文本',
  );
  assert.equal(fixture.store.get('flag:9'), 15, 'FLAG:9（税金）必须 += 5');
});

test('107 购物：BOUGHT = 1，下一轮 @SHOW_SHOP 打道具商店存根后立即复位（#395 给 BOUGHT 落点）', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(107, 500); // 107 后主菜单仍正常重绘，需再按一个真实按钮才能继续
  const { run_shop } = fixture.load_module('page/page-shop');
  const era_flag = fixture.load_module('era-utils/era-flag');

  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  const texts = history_texts(fixture);
  assert(
    texts.some(
      (line) =>
        line.includes('@ITEM_SHOP') && !line.includes('@ITEM_SHOP_TRAP'),
    ),
    '107 后下一轮 @SHOW_SHOP 应打道具商店存根（BOUGHT < 54）',
  );
  assert.equal(
    era_flag.bought,
    -1,
    '存根显示后必须立即复位，不留在购物态（否则下一轮会再打一次）',
  );
});

test('107 购物：BOUGHT >= 54 跳陷阱商店存根（ITEM_SHOP_TRAP）', async () => {
  const fixture = create_era_fixture();
  const { run_shop } = fixture.load_module('page/page-shop');
  const era_flag = fixture.load_module('era-utils/era-flag');
  // 真实路径只能置 1（[107] 分支），此处直接造世界验证 show_shop 自身对
  // BOUGHT >= 54 的分支判据（原作 :29 ELSEIF BOUGHT >= 54）。@EVENTSHOP
  // 会把 BOUGHT 重置为 -1（:20），所以要跳过它才能观测到这个分支
  era_flag.bought = 54;
  fixture.set_inputs(500);

  await assert.rejects(
    () => run_shop({ skip_eventshop: true }),
    /预置输入已耗尽/,
  );
  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('@ITEM_SHOP_TRAP')),
    'BOUGHT >= 54 应打陷阱商店存根',
  );
  assert.equal(era_flag.bought, -1);
});

test('show_shop：BOUGHT == 0 边界仍在 >= 0 之内，打道具商店存根（非 > 0）', async () => {
  const fixture = create_era_fixture();
  const { run_shop } = fixture.load_module('page/page-shop');
  const era_flag = fixture.load_module('era-utils/era-flag');
  // 原作 :25 IF BOUGHT >= 0（闭区间下界），0 与 1 同属「已购物」——只探
  // 0 这个边界点，>= 0 误写成 > 0 时它是唯一会漏判的输入
  era_flag.bought = 0;
  fixture.set_inputs(500);

  await assert.rejects(
    () => run_shop({ skip_eventshop: true }),
    /预置输入已耗尽/,
  );
  const texts = history_texts(fixture);
  assert(
    texts.some(
      (line) =>
        line.includes('@ITEM_SHOP') && !line.includes('@ITEM_SHOP_TRAP'),
    ),
    'BOUGHT == 0 应打道具商店存根（>= 0 下界含 0）',
  );
  assert.equal(era_flag.bought, -1);
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
    !history_texts(off).some((line) => line.includes('没有待机中的奴隶')),
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
    history_texts(on).some((line) => line.includes('没有待机中的奴隶')),
    '守卫成立应进设施真身',
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

test('7788 接通 RELATION_DEBUGPRINT：输出关系矩阵并等待按键', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:1:6', 1001); // CFLAG:A:6 名字编号（NID）
  const { usershop } = fixture.load_module('page/page-shop');

  await usershop(7788);

  assert.ok(
    fixture.lines_history.some(
      (line) => line.type === 'text' && /^1>[ ]{3}0[ ]{4}$/.test(line.text),
    ),
    '调试后门必须打印关系矩阵',
  );
  assert.equal(fixture.waits.at(-1).waited, true);
});

test('498/499 无守卫：指针未选也照原作进分支', async () => {
  // #391 起 CHARA_INFO_INDIVIDUAL_WAPPED 是真身，不再打占位行；这里只验
  // 证「无守卫，target/assi 未选（-1）也照样进个别信息页」，个别信息页
  // 自身的渲染/按钮/分发见 test/page-chara-info.test.js
  const fixture = create_era_fixture();
  const { usershop } = fixture.load_module('page/page-shop');
  fixture.set_inputs(100, 100); // 每次进页后立即按「返回」
  await usershop(498);
  await usershop(499);
  assert.equal(
    history_texts(fixture).filter((line) => line.includes('SHOW_CHARA_INFO'))
      .length,
    2,
    '498/499 各进入一次个别信息页（原作 :156-159 无 A 守卫）',
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
  // SELECT_TARGET/SELECT_ASSI 与 100 分支的 BEGIN TRAIN 自 #44、INVASION 与
  // 109 分支的 BEGIN TURNEND 自 #117、199 分支的 BEGIN TURNEND 自 #395 起
  // 为真身/真转场，SYSTEM_SAVEGAME / SYSTEM_LOADGAME 自 #136 起为真身
  // （200/300 分支），DUNGEON_INFO2 自 #180 起为真身（102 分支，
  // page-dungeon-info2.js），CHARA_INFO / CHARA_INFO_INDIVIDUAL_WAPPED
  // 自 #391 起为真身（101/498/499 分支，page-chara-info.js），均已移出。
  // ITEM_SHOP_TRAP 是 BOUGHT 落表后 show_shop 的新运行时占位（#395），
  // 非 usershop 分支
  assert.deepEqual(STUBBED_CALLS, [
    '批量处刑',
    'INTERCEPT',
    'ABILITY_UP',
    'ITEM_SHOP',
    'ITEM_SHOP_TRAP',
    'TAILOR_MAIN',
    'SECRET_LABO',
    'CONFIG',
    'LABO',
    'SHOW_FLOOR',
    'MONSTER_SHOP',
    'DEBUG_MENU_U',
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
