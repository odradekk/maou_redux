/**
 * ere/page/page-shop.js @USERSHOP 输入分发的行为测试（issue #24）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。经
 * run_shop 驱动（公开接口）：预置一串输入，循环以「预置输入耗尽抛错」终止
 * （夹具既定设计），再对输出行、变量读写与角色列表断言。
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
 *   6. 存根清单对账（docs/stub-registry.md）。
 *
 * 已知未测行（变异测试实证，勿误当守卫）：作用域外的每个指令壳只抽查代表
 * （101/777/200/888/199/525 + 498/499 + 999 + 7788 未逐个断言）——壳的
 * 完整性由 STUBBED_CALLS 对账与链结构的 deepEqual 之外的代码评审承担；
 * 删掉某个未抽查的壳（如 102 DUNGEON_INFO2）测试仍绿，认领对应子系统票时
 * 以 docs/stub-registry.md 的专节为对账依据。
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

// 主菜单画了几轮 = 按钮 496 出现几次（每轮 @SHOW_SHOP 恰画一个）
function rounds_drawn(fixture) {
  return fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator === 496,
  ).length;
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
  // 重绘即反馈：每轮恰两行占位（子面板存根 + 指令面板渲染存根），没有为
  // 面板按钮多打一行「占位反馈」——叠了会在此红（派单核实事实 #2）
  assert.equal(rounds_drawn(fixture), 5);
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('尚未移植')).length,
    5 * 2,
  );
  // 切换后的重绘确实换到了对应面板：第 2/3/4 轮的面板存根各自可见
  const texts = fixture.text_lines();
  for (const erb_name of [
    'DRAW_HAVETRAPS',
    'DRAW_DUNGEON_OVERVIEW',
    'DRAW_DUNGEON_DAILY',
  ]) {
    assert.equal(
      texts.filter((line) => line.includes(`@${erb_name}`)).length,
      1,
      `切换后应恰一次重绘出 @${erb_name} 面板`,
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

  const texts = fixture.text_lines();
  // 496：真身选择画面（列表 + 999 取消——取消不选人、回主菜单重绘）
  assert(texts.includes('请魔王大人选择将要调教的奴隶人选'));
  // 奴隶行是按钮（#44 验收后实机修正）：断言看引擎渲染文本
  assert(
    fixture.lines.some(
      (line) => line.type === 'button' && line.rendered === '[31] 奴隶31',
    ),
    '奴隶行必须是可点击按钮，accelerator = 角色 ID',
  );
  assert(
    texts.some((line) => line.includes('@SELECT_ASSI')),
    '497 应占位 @SELECT_ASSI',
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

  // :67-68 SIF RESULT == 0 → RETURN 0：取消路径不转场（主菜单重绘到耗尽）
  const texts = fixture.text_lines();
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
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  const texts = fixture.text_lines();
  assert(texts.some((line) => line.includes('育儿室中的你不能进行调教')));
  assert(
    !texts.some((line) => line.includes('调教中')),
    '育儿室守卫拦下后不得进调教画面',
  );
});

test('守卫 A == 0：496/497/100 与无效输入同路——无反馈、只重绘（原作行为）', async () => {
  // 不加任何可选奴隶（A 只数 x != 0 的未占用角色）：A 恒 0
  const fixture = await run_shop_with(496, 497, 100);
  const texts = fixture.text_lines();
  assert(
    !texts.some((line) => line.includes('@SELECT_')),
    'A == 0 时不得进 496/497 分支',
  );
  assert(
    !texts.some((line) => line.includes('@BEGIN TRAIN')),
    'A == 0 时不得进 100 分支',
  );
  // 三次输入都被守卫拦下后落到链尾，回循环重绘（3 次输入 + 首轮 = 4 轮）
  assert.equal(rounds_drawn(fixture), 4);
  // 除每轮固定的两行存根外无任何新增输出；文本行总数钉死为每轮 5 行
  //（状态行 + 面板存根 + Commands 标题 + [---] 不可选占位 + 指令面板存根）
  //——多打任何一行（含给守卫拦下的输入加「提示」）都会在此红。A == 0 时
  // [100] 调教退化为灰色 [---] 文本（原作 :229-231），A > 0 时它是按钮、
  // 不计入文本行
  assert.equal(texts.filter((line) => line.includes('尚未移植')).length, 4 * 2);
  assert.equal(texts.length, 4 * 5);
});

test('无效输入：不抛错、无提示，画面重绘（原作无 ELSE，:228 RETURN 0）', async () => {
  const fixture = await run_shop_with(42, 531, 9999, -7);
  // 活到输入耗尽 = 分发没抛错也没退出；4 次输入 + 首轮 = 5 轮重绘
  assert.equal(rounds_drawn(fixture), 5);
  const texts = fixture.text_lines();
  // 原作不打提示（派单核实事实 #5）：除每轮固定两行存根外零新增输出，
  // 文本行总数钉死为每轮 5 行（含 A == 0 时的 [---] 占位）——给无效输入
  // 加「提示」会在此红
  assert.equal(texts.filter((line) => line.includes('尚未移植')).length, 5 * 2);
  assert.equal(texts.length, 5 * 5);
});

test('连续多轮混合操作后状态一致', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  // 加入可选奴隶 31（A = 1）：496 会真进分支（真身选择画面，不选人）；
  // 更重要的是指针若被某个分支污染成 31，能活过绘制侧的越界守卫（31 在
  // 已加入列表里）——不加角色的话守卫会把一切脏值洗回 -1，污染不可观测
  //（变异测试抓到的假绿形态）
  join_selectable_slave(fixture, 31);
  era_flag.money = 10000;
  era_flag.day_count = 0;
  era_flag.month = 1;
  era_flag.target = -1;
  // 496 起进入真身 SELECT_TARGET：尾随的 500/501 是选择画面的两次无效输入
  //（重绘不选人），在画面内耗尽输入
  fixture.set_inputs(501, 42, 504, 9999, 505, 496, 500, 501);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);

  assert.equal(fixture.store.get('flag:36'), 5, '最后一次面板输入是 505');
  // 无效输入（42/9999）、496 的选择画面（两次无效输入后取消态耗尽）、
  // 面板切换都不碰游戏状态——指针保持 -1（31 是合法 ID，若被写会活过
  // 守卫、在此暴露）
  assert.equal(era_flag.money, 10000);
  assert.equal(era_flag.day_count, 0);
  assert.equal(era_flag.target, -1);
  assert.equal(era_flag.assi, -1);
  assert.deepEqual(fixture.era.getAddedCharacters(), [31]);
  // 8 次输入全部消费；主菜单重绘 6 轮（首轮 + 501/42/504/9999/505 五次
  // 输入），其后玩家停在选择画面内（画面自己的重绘不画主菜单按钮）——
  // 状态不错乱
  assert.equal(fixture.inputs_consumed.length, 8);
  assert.equal(rounds_drawn(fixture), 6);
  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('请魔王大人选择将要调教的奴隶人选')),
    '496 应进入真身选择画面',
  );
});

test('作用域外的指令分支：壳占位带原作调用名（代表抽查）', async () => {
  const fixture = await run_shop_with(101, 777, 200, 888, 199, 525, 7788);
  const texts = fixture.text_lines();
  for (const name of [
    '@CHARA_INFO',
    '@CONFIG',
    '@SYSTEM_SAVEGAME',
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

test('110/111 的守卫照原作：不满足时与无效输入同路', async () => {
  // talent 表未落 yml/（TALENT:0:325 读值 undefined）、FLAG:83/84 未置——
  // 两守卫都不成立
  const off = await run_shop_with(110, 111);
  assert(
    !off.text_lines().some((line) => line.includes('@SECRET_LABO')),
    '守卫不成立不得进 110',
  );
  assert(
    !off.text_lines().some((line) => line.includes('@INFRASTRUCTURE')),
    '守卫不成立不得进 111',
  );

  const on = create_era_fixture();
  on.store.set('talent:0:325', 1); // 魔王的魔界知识
  on.store.set('flag:83', 3); // 肉便器数 > 0
  on.set_inputs(110, 111);
  const { run_shop } = on.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert(
    on.text_lines().some((line) => line.includes('@SECRET_LABO')),
    '守卫成立应进 110',
  );
  assert(
    on.text_lines().some((line) => line.includes('@INFRASTRUCTURE')),
    '守卫成立应进 111',
  );
});

test('520-530 区间判定 1:1：520 与 531 不匹配，530 匹配（RESULT > 520）', async () => {
  const fixture = await run_shop_with(520, 531, 530);
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('@SHOW_FLOOR')).length,
    1,
    '仅 530 命中（原作 :168 RESULT > 520 && RESULT <= 530）',
  );
});

test('键入 999 落到调试菜单（店内 999 因 BOUGHT 无落点不可达）', async () => {
  const fixture = await run_shop_with(999);
  assert(
    fixture.text_lines().some((line) => line.includes('@DEBUG_MENU_U')),
    '999 应占位 @DEBUG_MENU_U（与原作 BOUGHT == -1 时同路径）',
  );
});

test('498/499 无守卫：指针未选也照原作进分支', async () => {
  const fixture = await run_shop_with(498, 499);
  assert.equal(
    fixture
      .text_lines()
      .filter((line) => line.includes('@CHARA_INFO_INDIVIDUAL_WAPPED')).length,
    2,
    '498/499 各占位一次（原作 :156-159 无 A 守卫）',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录本票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-shop');
  const registry_path = path.resolve(
    __dirname,
    '..',
    'docs',
    'stub-registry.md',
  );
  const registry = fs.readFileSync(registry_path, 'utf8');

  // 先钉死名单本身（漏登记会在此红，#22 验收抓过的假绿形态），再对账清单。
  // SELECT_TARGET 与 100 分支的 BEGIN TRAIN 自 #44 起为真身/真转场，已移出
  assert.deepEqual(STUBBED_CALLS, [
    'SELECT_ASSI',
    'CHARA_INFO',
    'DUNGEON_INFO2',
    '批量处刑',
    'INTERCEPT',
    'ABILITY_UP',
    'CHARA_SALE',
    'ITEM_SHOP',
    'TAILOR_MAIN',
    'INVASION',
    'SECRET_LABO',
    'INFRASTRUCTURE',
    'BEGIN TURNEND',
    'SYSTEM_SAVEGAME',
    'SYSTEM_LOADGAME',
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
    !fixture
      .text_lines()
      .some((line) => line.includes('请魔王大人选择将要调教的奴隶人选')),
    '唯一的奴隶被占用时 A 应为 0，496 进不去',
  );

  // 对照：同样一个奴隶、未被占用时 496 确实进得去（真身选择画面），
  // 排除「因为别的原因没进」——只喂 496 时选择画面等输入到耗尽，同为拒因
  const control = create_era_fixture();
  join_selectable_slave(control, 31);
  control.set_inputs(496, 999);
  const { run_shop: run_control } = control.load_module('page/page-shop');
  await assert.rejects(() => run_control(), /预置输入已耗尽/);
  assert(
    control
      .text_lines()
      .some((line) => line.includes('请魔王大人选择将要调教的奴隶人选')),
    '未占用的奴隶应让 A > 0',
  );
});
