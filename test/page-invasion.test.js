/**
 * ere/page/page-invasion.js @INVASION 出兵路线（issue #117 魔力 / #503 怪物与
 * 掠夺）与地上征服后菜单（issue #468）的行为测试。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。经模块公开接口
 * invasion()/post_conquest_menu()/start_campaign() 直驱（对局内则由
 * page-shop 的 [109] 分支调用，端到端用例在本文件末尾经 run_shop 驱动）。
 *
 * 对应 #117 验收清单：
 *   1. 气力 10000 出兵一次：FLAG:81 +400（10000/25）、BASE:0:1 减半、
 *      EX_FLAG:99 +2（另固定 EXP:0:80 += SINKOU/2）；
 *   2. 威望各区间折扣与原作一致（五档全覆盖，含 61–80 无修正与相邻两档）；
 *   3. [109] 返回 1 时确实走到 BEGIN TURNEND（BeginSignal 断言）；
 *   4. 存根登记齐全（本文件 STUBBED_CALLS ⊆ docs/stub-registry.md）。
 *
 * 对应 #468（地上征服后菜单）：状态条与选项按征服/阶段标记切换文案、
 * [9] 转发到 CAMPAIGN_MENU、[5] 按钮渲染条件与派发时的拒绝条件彼此独立
 * （原作真实存在的怪癖，1:1 保留）、start_campaign() 提取前后行为等价。
 *
 * 对应 #503（[0] 怪物出兵 / [3] 勇者掠夺）：两条路线的战力算式与系数、威望
 * 失败早退、两条结果段的金额/封顶/经验/善恶值、掠夺的五条派遣判据与分页、
 * @INVASION_EVENT 的 RAND:10 真分发与三臂守卫、RESTART 经外层循环承接。
 * 随机源一律显式注入（seq 精确序列 / knob 按上界查表），不依赖 Math.random。
 *
 * 已知未测行（有意）：
 *   - 菜单的状态条（侵攻度/气力）只断言存在与数值列，不逐字比对——BARSTR
 *     文本条在 ere 侧改画原生进度条（文件头注明的偏离），本路径无黄金样本
 *     （#108 接受的风险），逐字锁随 #109 裁定后补；
 *   - 引擎白名单挡下的两支死路径不设用例：列表里的越界值（:533-535）与
 *     「选中项不合法」（:536-545）——渲染判据与选中判据同源，能点的都合法，
 *     未渲染的手工键入送不进游戏层（两处登记在案，见各自用例的注释）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

// 组一个窄路径开局世界：魔王气力、威望、人间界侵攻度、征服标记
function make_world(
  fixture,
  { willpower = 10000, prestige = 70, invasion = 0, fallen = 0 } = {},
) {
  fixture.store.set('base:0:1', willpower);
  fixture.store.set('maxbase:0:1', Math.max(willpower, 10000));
  fixture.store.set('exflag:99', prestige); // EX_FLAG:99 威望（@EVENTFIRST 播种 70）
  fixture.store.set('flag:81', invasion); // FLAG:81 人间界侵攻度
  fixture.store.set('flag:82', fallen); // FLAG:82 人间界陷落
  // addCharacter(0) 的引擎侧数据层赋值（夹具注释见 era-fixture 的
  // addCharacter 段）：魔王存档名 %SAVESTR:MASTER% 的承载（#5 决议）
  fixture.store.set('callname:0:-1', '你');
}

/**
 * 按上界取值的确定性随机源（缺省 1 = 一切 `RAND:N == 0` 的守卫不命中、
 * @INVASION_EVENT 的 RAND:10 落到 SEIEI 臂）。出兵路线的随机消费量随怪物
 * 数据、持有数与地区旁白而变，写不满一份精确序列，所以用按上界查表的形式
 * （invasion-ravish.test.js 的同名 knob 先例）；需要精确序列的用例仍用 seq。
 * @param {Object<number, number>} overrides 上界 → 取值
 */
function knob(overrides = {}) {
  return (n) => {
    const value = overrides[n] ?? 1;
    assert.ok(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

// 直驱 invasion()，预置输入与随机源，返回其返回值
async function run_invasion(fixture, inputs = [], rand = knob()) {
  fixture.set_inputs(...inputs);
  const { invasion } = fixture.load_module('page/page-invasion');
  return invasion(rand);
}

// 直驱 post_conquest_menu()，预置输入与随机源，返回其返回值
async function run_post_conquest(fixture, inputs = [], rand = knob()) {
  fixture.set_inputs(...inputs);
  const { post_conquest_menu } = fixture.load_module('page/page-invasion');
  return post_conquest_menu(rand);
}

function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// printMultiColumns 的 progress 格落表为独立条目（type: 'progress'，标签存在
// text 字段），history_texts 的 type: 'text' 过滤器收不到这里
function progress_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'progress')
    .map((line) => line.text);
}

/**
 * 确定随机源：按给定序列返回，同时记录每次调用的上界（RAND:2/3/4/5 的
 * 参数不许改错——上界单独断言）。序列耗尽或越界即红（同 chara-family 的
 * seq 先例）；上界也一并报出，便于定位是哪个 RAND:N 变了。
 */
function seq(values) {
  let index = 0;
  const uppers = [];
  const rand = (upper) => {
    uppers.push(upper);
    const value = values[index];
    index += 1;
    assert.ok(
      value !== undefined && value >= 0 && value < upper,
      `随机序列耗尽或越界（第 ${index} 次抽取，上界 ${upper}）`,
    );
    return value;
  };
  rand.uppers = uppers;
  return rand;
}

/** 水晶球投放菜单的最小世界：库存/已投放/流行度/剩余天数 + 资金与勋章 */
function make_video_world({
  stock = 0,
  deployed = 0,
  popularity = 0,
  expire = 0,
  money = 0,
  medals = 0,
} = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('exflag:9010', stock); // EX_FLAG:9010 库存
  fixture.store.set('exflag:9011', deployed); // EX_FLAG:9011 已投放
  fixture.store.set('exflag:9012', popularity); // EX_FLAG:9012 流行度
  fixture.store.set('exflag:9013', expire); // EX_FLAG:9013 过时倒计时
  fixture.store.set('flag:10004', money); // MONEY
  fixture.store.set('exflag:4444', money); // EX_FLAG:4444 非作弊资金
  fixture.store.set('exp:0:81', medals); // EXP:0:81 勋章经验
  fixture.store.set('callname:0:-2', '魔王'); // CALLNAME:0（勋章补正提示用）
  return fixture;
}

// 直驱 sengen_video()，预置输入序列与随机源
async function run_sengen_video(fixture, inputs, rand = seq([])) {
  fixture.set_inputs(...inputs);
  const { sengen_video } = fixture.load_module('page/page-invasion');
  return sengen_video(rand);
}

test('【验收 1】气力 10000 出兵一次：侵攻度 +400、气力减半、威望 +2、经验 +200', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  const result = await run_invasion(fixture, [1]);

  assert.equal(result, 1, '魔力出兵成功应返回 1（走 BEGIN TURNEND）');
  assert.equal(fixture.store.get('flag:81'), 400, 'FLAG:81 += 10000/25');
  assert.equal(fixture.store.get('base:0:1'), 5000, 'BASE:0:1 减半（:268）');
  assert.equal(fixture.store.get('exflag:99'), 72, 'EX_FLAG:99 += 2（:978）');
  assert.equal(fixture.store.get('exp:0:80'), 200, 'EXP:0:80 += SINKOU/2');

  const texts = history_texts(fixture);
  assert(texts.includes('威望值是【相安无事】'), '威望 70 落 61-80 档');
  assert(texts.includes('战斗力　400点'), 'PRINTFORMW 战斗力（:296）');
  assert(texts.includes('魔王补正　　　x1.00'), '共通处理的魔王补正行（:569）');
  assert(texts.includes('合计　400点'), 'PRINTFORMW 合计（:598）');
  assert(
    texts.includes('你的魔力爆发出来了！'),
    '%SAVESTR:MASTER% = 你（:696）',
  );
  assert(
    texts.includes('400点魔力形成雷霆，将附近的村庄彻底摧毁！'),
    '400 落 <600 雷霆档（:701-702）',
  );
  assert(texts.includes('你得到了200点经验值！'), '经验值行（:737）');
  // 首次侵略的传闻文本（INVASION_EVENT_SEIEI :259，FLAG:81 == 0 才打）
  assert(
    texts.includes('根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。'),
    '首次侵略的精锐部队传闻（INVASION_EVENT.ERB:259）',
  );
  // 结算尾部 CALL INVASION_CHECK（:996）——#118 起是五组条件本体：本用例
  // FLAG:81 = 400、FLAG:82 = 0，五组全不满足，空转零输出
  assert(
    !texts.some(
      (line) =>
        line.includes('声望+10') || line.includes('魔王终于再次掌握了世界'),
    ),
    '未达 10000 时 INVASION_CHECK 空转（不触发结局演出）',
  );
});

test('【验收 2】威望区间折扣：五档与原作公式逐档一致（INVASION.ERB:270-293）', async () => {
  // SINKOU 基数 400（气力 10000/25）；新档魔王无任何补正，档内折扣即增量。
  // 侵攻度起点 100（非 0）：同时固定「非首次侵略不打精锐部队传闻」
  const cases = [
    { prestige: 30, expected: 100, tier: '动荡不安' }, // :275-278 ÷4
    { prestige: 50, expected: 320, tier: '略受质疑' }, // :279-284 ×(100+(50-60)*2)/100
    { prestige: 70, expected: 400, tier: '相安无事' }, // :285-286 无修正
    { prestige: 90, expected: 440, tier: '广受爱戴' }, // :287-292 ×(100+(90-80))/100
  ];
  for (const { prestige, expected, tier } of cases) {
    const fixture = create_era_fixture();
    make_world(fixture, { prestige, invasion: 100 });
    const result = await run_invasion(fixture, [1]);
    assert.equal(result, 1);
    assert.equal(
      fixture.store.get('flag:81'),
      100 + expected,
      `威望 ${prestige}（${tier}）的侵攻度增量`,
    );
    assert.equal(fixture.store.get('base:0:1'), 5000, '气力减半与威望无关');
    assert.equal(fixture.store.get('exflag:99'), prestige + 2);
    const texts = history_texts(fixture);
    assert(texts.includes(`威望值是【${tier}】`), `${tier} 档位行`);
    assert(
      !texts.some((line) => line.includes('精锐部队')),
      'FLAG:81 > 0（非首次侵略）不打精锐部队传闻（INVASION_EVENT.ERB:257）',
    );
  }
  // 21-40 档的中间报文（PRINTW 侵攻战斗力减少，:277）
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 30 });
  await run_invasion(fixture, [1]);
  assert(history_texts(fixture).includes('侵攻战斗力减少'));
});

test('威望岌岌可危（0–20）：气力照减半、侵攻度与威望不变，仍返回 1（:270-274）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 10 });
  const result = await run_invasion(fixture, [1]);

  // 早退在共通补正之前：气力已在 :268 减半，其余全部未动
  assert.equal(result, 1, '失败路径同样消耗回合（RETURN 1）');
  assert.equal(fixture.store.get('base:0:1'), 5000, '气力减半先于威望判定');
  assert.equal(fixture.store.get('flag:81'), 0, '侵攻失败不加侵攻度');
  assert.equal(fixture.store.get('exflag:99'), 10, '早退跳过 :978 的 +2');
  assert.equal(fixture.store.get('exp:0:80'), undefined, '不进结果段');
  const texts = history_texts(fixture);
  assert(texts.includes('威望值是【岌岌可危】'));
  assert(texts.includes('侵攻失败'));
});

test('[999] 返回 0：零副作用，不消耗回合（:190-191）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  const result = await run_invasion(fixture, [999]);
  assert.equal(result, 0);
  assert.equal(fixture.store.get('flag:81'), 0);
  assert.equal(fixture.store.get('base:0:1'), 10000);
  assert.equal(fixture.store.get('exflag:99'), 70);
});

test('无兵力门槛：0 只怪物也能走 [1]；[0]/[2] 不可达（引擎侧拒收，#130）', async () => {
  // [0]/[2] 在怪物不足时渲染为 `[-]` 文本占位（非按钮）——引擎的 input()
  // 只送达已打印按钮的快捷键，键入 0/2 在渲染层就被弹回。原作 :196-199
  // 的游戏侧重问守卫是引擎死路径；「被拦」的引擎形态＝拒收且画面不重绘
  const locked = create_era_fixture();
  make_world(locked);
  await assert.rejects(
    () => run_invasion(locked, [0]),
    /输入不合法！请输入以下值之一：/,
  );
  assert.deepEqual(locked.inputs_consumed, [], '0 未被送达');
  assert.equal(
    history_texts(locked).filter((line) => line.includes('你的怪物数量'))
      .length,
    1,
    '拒收后画面不重绘（原作 $INPUT_LOOP 不重画的引擎等价形态）',
  );

  // [1] 无兵力门槛即可选：0 只怪物照常出兵
  const fixture = create_era_fixture();
  make_world(fixture);
  const result = await run_invasion(fixture, [1]);
  assert.equal(result, 1);
  assert.equal(fixture.store.get('flag:81'), 400);

  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line.includes('怪物数量不足。至少需要600只')).length,
    2,
    '[0]/[2] 两行不可选占位（MON_NUM = 0 < 600，:174/:180）',
  );
  // [1] 是按钮且不带手写编号前缀（引擎 showAcc 自动拼，PR #30）
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 1 &&
        line.rendered === '[1] 使用魔王的魔力（经验值）',
    ),
    '[1] 按钮正文 = 使用魔王的魔力（经验值），无 [编号] 前缀',
  );
  assert.equal(
    texts.filter((line) => line.includes('你的怪物数量')).length,
    1,
    '有效路径画面也只画一次（出兵后转场）',
  );
});

test('[0] 的 600 只门槛：不足时是 [-] 文本占位，够则渲染为按钮（:173-183）', async () => {
  // 门槛下沿：599 只仍不足（[0] 不是按钮，键入 0 被引擎拒收）
  const under = create_era_fixture();
  make_world(under);
  under.store.set('item:100', 599);
  await assert.rejects(
    () => run_invasion(under, [0], knob({ 100: 99 })),
    /输入不合法！请输入以下值之一：/,
    '599 只仍不够 600',
  );
  assert.equal(under.store.get('item:100'), 599, '被拒后不扣怪物');

  // 700 只怪物（item:100 = 700 ≥ 600）后 [0] 变为可选按钮
  const monster = create_era_fixture();
  make_world(monster);
  monster.store.set('item:100', 700);
  const { invasion } = monster.load_module('page/page-invasion');
  monster.set_inputs(0);
  assert.equal(
    await invasion(knob({ 100: 99 })),
    1,
    '[0] 走完 RETURN 1（#503 起是真身）',
  );
  assert(
    monster.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.rendered === '[0] 使用现有怪物的一半去进攻（资金·俘虏）',
    ),
    '怪物 ≥ 600 时 [0] 渲染为按钮',
  );
});

// ————————————————————————————————————————————————————————————————
// #503：出兵路线 [0] 怪物出兵（:210-263 + 结果段 :620-692）与
// [3] 勇者掠夺（:442-563 + 结果段 :891-975）
// ————————————————————————————————————————————————————————————————

/**
 * 掠夺路线的候选世界：把若干角色做成「可派遣」。
 * 五条判据（:452-456）里只留「合法」那一档，具体用例再逐条改坏。
 */
function seed_raidable(fixture, ids) {
  for (const id of ids) {
    fixture.seed_chara(id, { name: `勇者${id}`, callname: `勇者${id}` });
    fixture.era.addCharacter(id);
    fixture.store.set(`base:${id}:0`, 500); // :452 体力
    fixture.store.set(`cflag:${id}:0`, 1); // :455 出售与助手资格
    fixture.store.set(`cflag:${id}:1`, 0); // :454 待机
    fixture.store.set(`cflag:${id}:9`, 10); // 等级（勇者补正的读数源）
  }
}

test('[0] 怪物出兵：怪物减半、战力按 MONSTER_DATA 累加、战利品入账（:210-263）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.store.set('item:100', 600); // 狗头人 600 只（正好过 600 门槛）
  // 100 号狗头人（等级 1/攻击 1/防御 2/速度 0/特殊 0/魔法 0）在魔王等级 0
  // 下：MONSTER_DATA 写 E:2 = 1*2+2 = 4、E:3 = 2*2+2 = 6、E:4 = 0 →
  // MON_ATK = 4+6 = 10；减半后 300 只 → SINKOU = 10 * (⌊300/9⌋+1) = 340 →
  // /20 = 17（掷点全 1：等级骰与两枚数量骰都取 1 档；rand(100) = 99 远离 5% 抓捕，
  // 阈值边界的守卫归「结算段 5% 抓捕」用例）
  const rand = knob({ 100: 99 });
  assert.equal(await run_invasion(fixture, [0], rand), 1);

  assert.equal(fixture.store.get('item:100'), 300, ':229 ITEM:MON_ID /= 2');
  assert.equal(fixture.store.get('flag:81'), 17, ':231/:234 SINKOU 累加后 /20');
  assert.equal(fixture.store.get('flag:10004'), 170, ':649 MONEY += SINKOU*10');
  assert.equal(fixture.store.get('exflag:4444'), 170, ':650 EX_FLAG:4444 同步');
  assert.equal(fixture.store.get('exflag:99'), 72, ':978 威望 +2');
  assert.equal(
    fixture.store.get('exp:0:80'),
    undefined,
    '怪物路线不给魔王经验（只有 [1]/[3] 的经验段才写 EXP:0:80）',
  );

  const texts = history_texts(fixture);
  assert(texts.includes('怪物的战斗力　17点'), ':263 PRINTFORMW 怪物的战斗力');
  assert(
    texts.includes('威望值是【相安无事】'),
    '威望 70 落 61-80 档（:251-252）',
  );
  assert(texts.includes('合计　17点'), ':598 PRINTFORMW 合计');
  assert(texts.includes('得到了170点的战利品！'), ':648 未征服 → 战利品');
  assert(
    !texts.some((line) => line.includes('魔力爆发')),
    '不走魔力路线的结果段（:694-757）',
  );
  assert(
    !texts.some((line) => line.includes('好像抓到了负隅顽抗的勇者')),
    '5% 抓捕未命中（rand(100) = 99 远离阈值）',
  );
});

test('[0] 多个怪物识别号各自减半并累加（:211-232 的 REPEAT 90 段）', async () => {
  const a = create_era_fixture();
  make_world(a);
  a.store.set('item:100', 600);
  assert.equal(await run_invasion(a, [0], knob({ 100: 99 })), 1);
  assert.equal(a.store.get('flag:81'), 17, '单队：340 / 20');

  const b = create_era_fixture();
  make_world(b);
  b.store.set('item:100', 600);
  b.store.set('item:101', 1200); // 哥布林（等级 1/攻击 2/防御 1）
  assert.equal(await run_invasion(b, [0], knob({ 100: 99 })), 1);

  assert.equal(b.store.get('item:100'), 300, '每个识别号各自减半');
  assert.equal(b.store.get('item:101'), 600);
  assert.equal(b.store.get('flag:81'), 50, '(340 + 670) / 20：两队累加');
});

test('[0] 威望岌岌可危：侵攻失败早退，怪物照减半但零战利品（:236-240）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 10 });
  fixture.store.set('item:100', 600);
  assert.equal(await run_invasion(fixture, [0], knob({ 100: 99 })), 1);

  assert.equal(fixture.store.get('item:100'), 300, '减半在威望判定之前');
  assert.equal(fixture.store.get('flag:81'), 0, '侵攻失败不加侵攻度');
  assert.equal(fixture.store.get('flag:10004'), undefined, '无战利品');
  assert.equal(fixture.store.get('exflag:99'), 10, '早退跳过 :978 的 +2');
  const texts = history_texts(fixture);
  assert(texts.includes('威望值是【岌岌可危】'));
  assert(texts.includes('侵攻失败'));
  assert(!texts.some((line) => line.includes('战利品')));
});

test('威望动荡不安档的提示是 PRINTW：比无修正档多一次等键（:243/:277）', async () => {
  // 五档里只有 21-40 档的第二行是 PRINTW（要停键），其余是 PRINTl/PRINTL。
  // 同一世界只换威望值，等键次数之差就落在这一处——删掉 waitAnyKey 即红。
  const calm = create_era_fixture();
  make_world(calm, { prestige: 70 });
  calm.store.set('item:100', 600);
  await run_invasion(calm, [0], knob({ 100: 99 }));

  const restless = create_era_fixture();
  make_world(restless, { prestige: 30 });
  restless.store.set('item:100', 600);
  await run_invasion(restless, [0], knob({ 100: 99 }));

  const t = history_texts(restless);
  assert(t.includes('威望值是【动荡不安】'), ':242 档位行（PRINTL，不停键）');
  assert(t.includes('侵攻战斗力减少'), ':243 的 PRINTW 文本');
  assert.equal(
    restless.waits.filter((w) => w.waited).length,
    calm.waits.filter((w) => w.waited).length + 1,
    '动荡不安档比相安无事档多一次等键（PRINTW 的 WAIT，:243）',
  );
});

test('[0] 结算段 5% 抓捕：命中调 GET_ENEMY，人数上限早退才有犒赏行（:686-692）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.store.set('item:100', 600);
  // 已加入数顶到 61 只（> 60）：GET_ENEMY 的人数上限首支（FLAG:82 == 0 且
  // CHARANUM > 60，enter-enemy.js:113）早退 0 → 才有「犒赏士兵」那一行。
  // 少于 61 只会走进 CHAR_MAKE——本用例的世界没有预设数据，那条路跑不下去
  for (let id = 1; id <= 61; id += 1) {
    fixture.chara_no.push(id);
  }
  assert.equal(await run_invasion(fixture, [0], knob({ 100: 0 })), 1);

  const texts = history_texts(fixture);
  assert(texts.includes('好像抓到了负隅顽抗的勇者…………'), ':687 PRINTFORMW');
  assert(
    texts.includes('犒赏士兵，捕获到的勇者被赏赐给部下了。'),
    ':691 SIF RESULT == 0 才有这一行',
  );
  assert.equal(fixture.chara_no.length, 61, '人数上限早退：没有新角色加入');

  // 阈值上沿：rand(100) = 5 不命中。用同一份「已顶到人数上限」的世界跑，
  // 阈值一旦放宽（< 6）会命中并走 GET_ENEMY 的早退口——不会掉进 CHAR_MAKE
  // 的深水区（本用例的世界没有预设数据，那条路跑不下去）
  const edge = create_era_fixture();
  make_world(edge);
  edge.store.set('item:100', 600);
  for (let id = 1; id <= 61; id += 1) {
    edge.chara_no.push(id);
  }
  assert.equal(await run_invasion(edge, [0], knob({ 100: 5 })), 1);
  assert(
    !history_texts(edge).some((line) =>
      line.includes('好像抓到了负隅顽抗的勇者'),
    ),
    '5% 抓捕未命中（rand(100) = 5）',
  );
});

test('[0] 已征服的人间界（经征服后菜单的 [0]）：强制征收 + 100000 封顶', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 }); // FLAG:82 != 0
  fixture.store.set('item:100', 600);
  // 先经 post_conquest_menu 的 [0]，再走出兵菜单的 [0]
  assert.equal(await run_post_conquest(fixture, [0, 0], knob({ 100: 99 })), 1);
  assert.equal(fixture.store.get('flag:81'), 17, ':614 已征服也是全额累加');
  assert.equal(fixture.store.get('flag:10004'), 170, ':627 强制征收 SINKOU*10');
  assert(
    history_texts(fixture).includes('强制征收了170点！'),
    ':626 已征服用「强制征收」（未征服是「战利品」）',
  );
});

test('[0] 已征服且 SINKOU 超 100000 时封顶（:625 的 MIN）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  // 400 万只 → 减半 200 万 → SINKOU = 10 * (⌊2000000/9⌋+1) / 20 = 111111
  fixture.store.set('item:100', 4000000);
  await run_post_conquest(fixture, [0, 0], knob({ 100: 99 }));
  assert(
    history_texts(fixture).includes('强制征收了1000000点！'),
    ':625 SINKOU 封到 100000 后 ×10',
  );
  assert.equal(fixture.store.get('flag:10004'), 1000000, ':627 封顶后的入账');
});

test('[3] 已征服的掠夺：SINKOU 超 100000 时同样封顶（:913 的 MIN）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1, willpower: 3000000 });
  seed_raidable(fixture, [1]);
  await run_post_conquest(fixture, [0, 3, 1], knob());
  // 3000000 / 25 = 120000 → ×1.10 = 132000 → 封到 100000
  assert(
    history_texts(fixture).includes('强行征收到了100000点！'),
    ':913 SINKOU 封到 100000 后 ×1',
  );
  assert.equal(
    fixture.store.get('flag:10004'),
    100000,
    ':915 MONEY += 封顶后的 SINKOU',
  );
});

test('[3] 勇者掠夺：候选筛选、选中者带队、掠夺额与经验（:442-563 + :891-975）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  seed_raidable(fixture, [1, 2]);
  // 1 号妊娠且未开「怀孕时的迎击」位 → 不进列表（选中者的筛选与列表同源）
  fixture.store.set('talent:1:153', 1);
  // 2 号的勋章经验 6 枚（> 5）→ MEDAL_BONUS 真读勇者号的 EXP:2:81（x1.01）
  fixture.store.set('exp:2:81', 6);
  assert.equal(await run_invasion(fixture, [3, 2], knob()), 1);

  // 战力 = 魔王之力（BASE:0:1 = 10000 → 400，减半到 5000）
  assert.equal(fixture.store.get('base:0:1'), 5000, ':550 BASE:0:1 /= 2');
  // 勇者补正 x1.10（等级 10）→ 440；勋章补正 x1.01（勇者号）→ 444
  assert.equal(fixture.store.get('flag:81'), 22, ':611 掠夺路线 SINKOU/20');
  assert.equal(fixture.store.get('flag:10004'), 444, ':915 MONEY += SINKOU');
  assert.equal(fixture.store.get('exflag:4444'), 444, ':916 同步');
  assert.equal(
    fixture.store.get('exp:2:80'),
    22,
    ':917 EXP:YUSYA_I:80 += SINKOU/20',
  );
  assert.equal(fixture.store.get('cflag:2:151'), -5, ':909 KARMA, YUSYA_I, -5');
  assert.equal(
    fixture.store.get('exp:0:80'),
    undefined,
    '掠夺不给魔王经验（:791 的 EXP:0:80 只在 [1] 结果段）',
  );

  const texts = history_texts(fixture);
  assert(texts.includes('派遣谁去侵攻呢？'), ':487 列表标题');
  assert(texts.includes('魔王的力量　400点'), ':551 PRINTFORMW');
  assert(
    texts.includes('勇者补正　x1.10'),
    ':554（掠夺是单空格，[2] 路线是三格）',
  );
  assert(
    texts.includes('勇者2的勋章补正\u3000x1.01'),
    ':559-561 勋章补正按勇者号查 EXP:2:81（不是魔王的 0）',
  );
  assert(
    texts.includes('勇者2得到了魔王的力量！人间界被掠夺了。（善恶值:-5）'),
    ':892-908 三段 PRINT 并入同一显示行',
  );
  assert(texts.includes('获得了444点的战利品！'), ':952 未征服 → 战利品');
  assert(texts.includes('勇者2获得了22点经验值！'), ':918');
  assert(texts.includes('合计　444点'), ':598');

  // 列表行的正文格带角色呼び名（编号在按钮格里，见 page-life-list.js 文件头）
  assert(
    texts.some((line) => line.includes('勇者2')),
    ':502 候选 2 在列表里',
  );
  assert(
    !texts.some((line) => line.includes('勇者1')),
    ':456 妊娠且未开位的 1 不进列表',
  );
});

test('[3] 列表输入的引擎边界：未渲染的值送不进游戏层（#130）', async () => {
  // 列表每轮都画 [1000]/[999]/[1001] 与全部候选行，白名单外的手工键入在
  // 渲染层就被拒收（引擎侧只按已打印按钮校验）。原作的越界守卫
  // `RESULT < 0 || RESULT >= CHARANUM`（:533-535）因此是引擎死路径，
  // 1:1 保留、不设变异条目（#470 的 ARCANA_FORT 越界守卫同款处置）
  const fixture = create_era_fixture();
  make_world(fixture);
  seed_raidable(fixture, [1]);
  await assert.rejects(
    () => run_invasion(fixture, [3, 99], knob()),
    /输入不合法！请输入以下值之一：/,
  );
  const consumed = fixture.inputs_consumed
    .filter((entry) => entry.api === 'input')
    .map((entry) => entry.value);
  assert.deepEqual(consumed, [3], '99 未被送达游戏层');
});

test('[3] 没有候选勇者：PRINTW + RESTART 回到出兵菜单（:467-470）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture); // 只有魔王 0
  // [3] → 无候选 RESTART → 菜单重画 → [999] 返回 0
  assert.equal(await run_invasion(fixture, [3, 999]), 0);
  const texts = history_texts(fixture);
  assert(texts.includes('没有勇者可进行侵攻。'), ':468 PRINTW');
  assert.equal(
    texts.filter((line) => line === '你的怪物数量 0只').length,
    2,
    'RESTART 重画整屏（$START1 :143）',
  );
});

test('[3] 列表 [999] 返回：RESTART 回菜单、不消耗回合（:519-520）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  seed_raidable(fixture, [1]);
  // [3] → 列表 → [999] RESTART → 菜单 → [999] 返回 0
  assert.equal(await run_invasion(fixture, [3, 999, 999]), 0);
  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line === '派遣谁去侵攻呢？').length,
    1,
    '列表画过一次',
  );
  assert.equal(
    texts.filter((line) => line === '你的怪物数量 0只').length,
    2,
    'RESTART 后菜单重画',
  );
  assert.equal(fixture.store.get('base:0:1'), 10000, '返回不扣气力');
});

test('[3] 已征服来路的 RESTART：落点是征服后菜单而非出兵菜单（:6 的 FLAG:82 分派）', async () => {
  // 征服后菜单 [0] → 出兵菜单 [3] → 列表 [999] 返回 → 原作的 RESTART 回
  // @INVASION 开头重走 FLAG:82 分派 → 已征服 = 征服后菜单（region 续接仍是
  // 存根，由 invasion() 的外层循环承接）→ 再 [999] 退出
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  seed_raidable(fixture, [1]);
  assert.equal(await run_invasion(fixture, [0, 3, 999, 999]), 0);
  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) =>
      line.includes('地面上已被你征服了，你指挥着你的军队准备进攻其他领土'),
    ).length,
    2,
    'RESTART 后重画的是征服后菜单',
  );
  assert.equal(
    texts.filter((line) => line === '派遣谁去侵攻呢？').length,
    1,
    '英雄列表只画过一次（没有回到出兵菜单）',
  );
});

test('[3] 翻页：页窗判据与 [上一页]/[下一页]（:490-532）', async () => {
  // 27 个候选人（NUM_PAGE = 26）：MAX_PAGE = ⌈27/26⌉-1 = 1。第 0 页的
  // T_LCOUNT 从 1 起、页窗上界 (0+1)*26 在第 26 行先命中 → 只渲染 25 行；
  // 第 1 页从 LIST_POS（= 最后渲染的 25 号）起扫，于是 25 号重复出现一次
  // ——原作翻页判据的现状（T_LCOUNT 只在渲染支内自增），1:1 保留
  const ids = [];
  for (let id = 1; id <= 27; id += 1) {
    ids.push(id);
  }
  const fixture = create_era_fixture();
  make_world(fixture);
  seed_raidable(fixture, ids);
  // [3] → 下一页 → [999] 返回 → 菜单 [999] 退出
  assert.equal(await run_invasion(fixture, [3, 1001, 999, 999]), 0);

  const all_rows = [];
  for (let id = 1; id <= 25; id += 1) {
    all_rows.push(id);
  }
  const expected_buttons = [
    1,
    3,
    999, // 出兵菜单（[0]/[2] 因兵力不足未渲染）
    ...all_rows, // 第 0 页：1..25
    1000,
    999,
    1001,
    25,
    26,
    27, // 第 1 页：25 号重复（页窗起点）
    1000,
    999,
    1001,
    1,
    3,
    999, // [999] 返回 → RESTART 后的菜单
  ];
  assert.deepEqual(
    fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.accelerator),
    expected_buttons,
  );
  assert.equal(
    history_texts(fixture).filter((line) => line === '派遣谁去侵攻呢？').length,
    2,
    '翻页重画列表（GOTO INPUT_LOOP_TMPO3）',
  );
  assert.equal(fixture.store.get('base:0:1'), 10000, '返回不扣气力');
});

test('[3] 上一页在首页：不动页码，GOTO 回循环头重画（:521-526）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  seed_raidable(fixture, [1]);
  // [3] → 上一页（no_page 已 0，不动）→ 列表重画 → 选 1
  assert.equal(await run_invasion(fixture, [3, 1000, 1], knob()), 1);
  assert.equal(
    history_texts(fixture).filter((line) => line === '派遣谁去侵攻呢？').length,
    2,
    '上一页也走 GOTO（重画），不是就地返回',
  );
  assert.equal(fixture.store.get('flag:81'), 22, '重画后仍能正常选中');
});

test('[3] 派遣资格五条逐条（:452-456）', async () => {
  const cases = [
    {
      label: '体力 0（濒死）',
      setup: (f) => f.store.set('base:1:0', 0),
      rejected: true,
    },
    {
      label: '非待机（CFLAG:1 != 0）',
      setup: (f) => f.store.set('cflag:1:1', 2),
      rejected: true,
    },
    {
      label: '未驯服（CFLAG:0 == 0 且无魔之刻印）',
      setup: (f) => f.store.set('cflag:1:0', 0),
      rejected: true,
    },
    {
      label: '未驯服但持魔之刻印（TALENT:254）→ 可派遣',
      setup: (f) => {
        f.store.set('cflag:1:0', 0);
        f.store.set('talent:1:254', 1);
      },
      rejected: false,
    },
    {
      label: '孕妇且未开「怀孕时的迎击」位',
      setup: (f) => f.store.set('talent:1:153', 1),
      rejected: true,
    },
    {
      label: '孕妇但开了位（FLAG:5 位 10 = 1024）→ 可派遣',
      setup: (f) => {
        f.store.set('talent:1:153', 1);
        f.store.set('flag:5', 1024);
      },
      rejected: false,
    },
    {
      label: '魔王自己（0 号）',
      seed: [0],
      setup: () => {},
      rejected: true,
    },
  ];
  for (const c of cases) {
    const fixture = create_era_fixture();
    make_world(fixture);
    seed_raidable(fixture, c.seed ?? [1]);
    c.setup(fixture);
    if (c.rejected) {
      // 无候选 → RESTART → 菜单 → [999] 返回 0
      assert.equal(
        await run_invasion(fixture, [3, 999]),
        0,
        `${c.label}：无候选回到菜单`,
      );
      assert(
        history_texts(fixture).includes('没有勇者可进行侵攻。'),
        `${c.label}：被筛掉`,
      );
    } else {
      assert.equal(
        await run_invasion(fixture, [3, 1, 999]),
        1,
        `${c.label}：可派遣并出兵`,
      );
      // 列表行的正文格才有呼び名——只查按钮快捷键接不到「谁进了列表」
      // （出兵菜单自己的 [1] 也是 accelerator 1）
      assert(
        history_texts(fixture).some((line) => line.includes('勇者1')),
        `${c.label}：1 号进列表`,
      );
    }
  }
});

test('[3] 页窗守卫：max_page == 0 时 [上一页]/[下一页] 都不动页码（:521-532）', async () => {
  // 26 个候选人正好一页：MAX_PAGE = ⌈26/26⌉-1 = 0。三次操作都只重画第 0 页
  // ——[上一页] 在首页（no_page > 0 不成立）、[下一页] 在唯一一页（no_page <
  // MAX_PAGE 不成立）都不推进页码，任何一处守卫放宽都会画出别的窗口
  const ids = [];
  for (let id = 1; id <= 26; id += 1) {
    ids.push(id);
  }
  const fixture = create_era_fixture();
  make_world(fixture);
  seed_raidable(fixture, ids);
  assert.equal(await run_invasion(fixture, [3, 1000, 1001, 999, 999]), 0);

  const page0 = [];
  for (let id = 1; id <= 25; id += 1) {
    page0.push(id);
  }
  assert.deepEqual(
    fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.accelerator),
    [
      1,
      3,
      999, // 出兵菜单
      ...page0,
      1000,
      999,
      1001, // 第 0 页
      ...page0,
      1000,
      999,
      1001, // [上一页] 在首页：重画同一页
      ...page0,
      1000,
      999,
      1001, // [下一页] 在唯一一页：重画同一页
      1,
      3,
      999, // [999] 返回 → RESTART 后的菜单
    ],
    'max_page == 0 时两个翻页键都不动页码',
  );
  // :506-511 的补行：每页渲染 25 行、NUM_PAGE - rows = 1 行空行（三次重画各一次）
  assert.equal(
    history_texts(fixture).filter((line) => line === '').length,
    3,
    '页高补行按 NUM_PAGE - 渲染行数算（:506-511）',
  );
});

test('[3] 列表选中不合法项：白名单内不存在这种输入（与上一例同源的引擎边界）', async () => {
  // 渲染判据与选中判据是同一个 raid_rejected，所以「能点的都不非法」；
  // 想喂一个非法 ID（如妊娠未开位的 1）只能靠手工键入，而渲染层先拒收。
  // 原作的 `RESULT == 0 || BASE:RESULT:0 < 1 || ...`（:536-545）因此同样是
  // 引擎死路径，保留 1:1、不设变异条目
  const fixture = create_era_fixture();
  make_world(fixture);
  seed_raidable(fixture, [1, 2]);
  fixture.store.set('talent:1:153', 1); // 1 号被筛掉
  await assert.rejects(
    () => run_invasion(fixture, [3, 1], knob()),
    /输入不合法！请输入以下值之一：/,
  );
  assert.equal(fixture.store.get('base:0:1'), 10000, '未出兵');
});

test('@INVASION_EVENT 的 RAND:10 真分发：9 → FORT、8 → CHALLENGE、其余 → SEIEI（:224-232）', async () => {
  const run_with = async (roll) => {
    const fixture = create_era_fixture();
    make_world(fixture);
    fixture.store.set('item:100', 600); // 过 600 门槛，[0] 才是按钮
    const uppers = [];
    const rand = knob({ 10: roll, 100: 99 });
    const spy = (n) => {
      uppers.push(n);
      return rand(n);
    };
    await run_invasion(fixture, [0], spy);
    return { texts: history_texts(fixture), uppers };
  };

  const fort = await run_with(9);
  // 首枚 RAND:10 是 MONSTER_DATA 的生成等级骰（dungeon/monster-data.js:354/:360），
  // 与分发骰共用上界，所以这条只钉「上界仍是 10」这一层；分发骰自己改坏上界时
  // 拿不到 9（knob 的 9 无覆盖值 → 1），落进 SEIEI 臂，由下面的 FORT 占位行断言
  // 接管（M10788）。
  assert.equal(fort.uppers[0], 10, 'MONSTER_DATA 等级骰的上界是 RAND:10');
  assert(
    fort.texts.some((line) => line.includes('@INVASION_EVENT_FORT')),
    '9 → FORT 臂（存根占位行，随 [2] 路线票）',
  );

  const challenge = await run_with(8);
  assert(
    challenge.texts.some((line) => line.includes('@INVASION_EVENT_CHALLENGE')),
    '8 → CHALLENGE 臂（存根占位行）',
  );

  const seiei = await run_with(0);
  assert(
    !seiei.texts.some((line) => line.includes('@INVASION_EVENT_FORT')),
    '0-7 → SEIEI 臂：不打两臂的占位行',
  );
  assert(
    seiei.texts.includes(
      '根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。',
    ),
    'SEIEI 的首档传闻（:257-260，FLAG:81 == 0 时无 INV_TYPE 条件）',
  );
});

test('@INVASION_EVENT 三臂的守卫：FORT/CHALLENGE 对 INV_TYPE == 1 仍作废（:539/:824）', async () => {
  for (const [roll, arm] of [
    [9, 'INVASION_EVENT_FORT'],
    [8, 'INVASION_EVENT_CHALLENGE'],
  ]) {
    const fixture = create_era_fixture();
    make_world(fixture);
    // 魔力路线（[1]）：两臂的 SIF 守卫把 INV_TYPE == 1 挡回 -1，无占位行
    await run_invasion(fixture, [1], knob({ 10: roll }));
    assert(
      !history_texts(fixture).some((line) => line.includes(`@${arm}`)),
      `INV_TYPE == 1 时 ${arm} 被守卫挡下（零输出、继续侵攻）`,
    );
    assert.equal(fixture.store.get('flag:81'), 400, '魔力路线的结算不受影响');
  }
});

test('FORT 守卫按 Emuera 的左结合求值：2/3 恒进、0 看 FLAG:SINDO（:539）', async () => {
  // 原式 `SIF FLAG:SINDO || INV_TYPE != 0 && INV_TYPE != 2 && INV_TYPE != 3`
  // 里 `&&` 与 `||` **同优先级、左结合**，等价于
  // `((FLAG:SINDO || INV_TYPE != 0) && INV_TYPE != 2) && INV_TYPE != 3`：
  // 已征服（FLAG:SINDO != 0）时 INV_TYPE == 3 照样不早退、== 0 才早退。
  // C 式「&& 优先」的读法会把已征服的 3 也挡掉——这一对反例就是那道门。
  const raid = create_era_fixture();
  make_world(raid, { fallen: 1 });
  seed_raidable(raid, [1]);
  // 征服后菜单 [0] → 出兵菜单 [3] → 列表选 1；RAND:10 = 9 命中 FORT
  await run_post_conquest(raid, [0, 3, 1], knob({ 10: 9, 100: 99 }));
  assert(
    history_texts(raid).some((line) => line.includes('@INVASION_EVENT_FORT')),
    'INV_TYPE == 3 + 已征服：FORT 不早退（左结合读法）',
  );

  const monster = create_era_fixture();
  make_world(monster, { fallen: 1 });
  monster.store.set('item:100', 600);
  await run_post_conquest(monster, [0, 0], knob({ 10: 9, 100: 99 }));
  assert(
    !history_texts(monster).some((line) =>
      line.includes('@INVASION_EVENT_FORT'),
    ),
    'INV_TYPE == 0 + 已征服：FORT 的守卫早退（`(FLAG:SINDO || …)` 为真）',
  );
});

test('@INVASION_EVENT_SEIEI 的三档传闻：后两档只对非魔力路线开（:257/:261/:266）', async () => {
  const first = '根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。';
  const second = '狂王组织的精锐部队似乎已经开始行动了。';
  const second2 = '如果不尽快采取行动的话………';
  const third =
    '根据斥候打探的消息，狂王的精锐部队似乎已经在前方的城镇中布下了防线。';
  const third2 = '而且精锐部队的真正目的就是要捕捉魔王麾下的勇者………';

  // 直接驱动该臂：三档的判据是「FLAG:AREA 区间 × INV_TYPE 条件」，与
  // 出兵路线无关（路线侧由上面两条用例覆盖）
  const run_at = async (progress, inv_type) => {
    const fixture = create_era_fixture();
    fixture.store.set('flag:81', progress); // FLAG:AREA
    fixture.store.set('flag:82', 0); // FLAG:SINDO
    const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
    const ret = await invasion_event_seiei(81, 82, inv_type);
    return { ret, texts: fixture.text_lines() };
  };

  // 首档（侵攻度 == 0）：无 INV_TYPE 条件 → 魔力路线也打
  for (const inv_type of [0, 1, 3]) {
    const r = await run_at(0, inv_type);
    assert.deepEqual(
      r.texts,
      [first],
      `侵攻度 0 + INV_TYPE ${inv_type} 打首档`,
    );
    assert.equal(r.ret, -1, '非 [2] 路线返回 -1 继续侵攻');
  }
  // [2] 路线继续进战斗体（存根占位行 + 返回 0）
  const brute = await run_at(0, 2);
  assert.deepEqual(brute.texts[0], first, '侵攻度 0 + INV_TYPE 2 也打首档');
  assert(
    brute.texts.some((line) => line.includes('@INVASION_EVENT_SEIEI')),
    'INV_TYPE == 2 继续进战斗体（存根，随 [2] 路线票）',
  );
  assert.equal(brute.ret, 0, '存根返回 0');
  // 第二档（1-4999）：INV_TYPE != 1
  for (const inv_type of [0, 3]) {
    assert.deepEqual(
      (await run_at(1, inv_type)).texts,
      [second, second2],
      `侵攻度 1 + INV_TYPE ${inv_type} 打第二档`,
    );
    assert.deepEqual(
      (await run_at(4999, inv_type)).texts,
      [second, second2],
      `侵攻度 4999（上界内）+ INV_TYPE ${inv_type}`,
    );
  }
  assert.deepEqual(
    (await run_at(1, 1)).texts,
    [],
    '魔力路线不打第二档（:261 的 INV_TYPE != 1）',
  );
  // 第三档（5000-9999）
  for (const inv_type of [0, 3]) {
    assert.deepEqual(
      (await run_at(5000, inv_type)).texts,
      [third, third2],
      `侵攻度 5000 + INV_TYPE ${inv_type} 打第三档`,
    );
  }
  assert.deepEqual(
    (await run_at(5000, 2)).texts[0],
    third,
    '侵攻度 5000 + INV_TYPE 2 也打第三档（后面接战斗体存根）',
  );
  assert.deepEqual((await run_at(5000, 1)).texts, [], '魔力路线不打第三档');
  assert.deepEqual(
    (await run_at(9999, 0)).texts,
    [third, third2],
    '9999 仍在档内',
  );
  // 10000 起三档都不命中（首档要求 == 0、末档要求 < 10000）
  for (const inv_type of [0, 1, 3]) {
    assert.deepEqual(
      (await run_at(10000, inv_type)).texts,
      [],
      `侵攻度 10000 + INV_TYPE ${inv_type} 不打任何传闻`,
    );
  }
  assert.equal(
    (await run_at(10000, 2)).texts[0],
    // [2] 路线照旧进战斗体存根，故列表首项是占位行而不是传闻
    '（精锐部队战斗尚未移植，此处为占位——原作 @INVASION_EVENT_SEIEI，随勇者出兵票，见 docs/stub-registry.md。）',
    '侵攻度 10000 + INV_TYPE 2 也不打传闻（直接进战斗体）',
  );
});

test('@INVASION_EVENT_SEIEI 的已征服早退：FLAG:SINDO != 0 时零输出（:250-251）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', 0); // 首档条件成立也不打
  fixture.store.set('flag:82', 2);
  const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
  assert.equal(await invasion_event_seiei(81, 82, 0), -1);
  assert.deepEqual(fixture.text_lines(), [], '已征服：不打印任何传闻');
});

test('KYOTEN_EVENT 人间界臂：五档推进、夺回回退、阈值间空转（INVASION_EVENT.ERB:14-104）', async () => {
  const forward = [
    [2000, 0, 1, '占领了村庄'],
    [4000, 1, 2, '占领了港口'],
    [6000, 2, 3, '攻陷了堡垒'],
    [8000, 3, 4, '占领了街道'],
    [10000, 4, 5, '占领了城市'],
  ];
  for (const [progress, stage, next_stage, msg] of forward) {
    const used = create_era_fixture();
    used.store.set('flag:81', progress);
    used.store.set('flag:93', stage);
    const mod = used.load_module('page/page-invasion');
    await mod.kyoten_event(1);
    assert.equal(
      used.store.get('flag:93'),
      next_stage,
      `${msg}：93 ${stage}→${next_stage}`,
    );
    assert(
      history_texts(used).some((line) => line.includes(msg)),
      `${msg} 横幅`,
    );
  }

  const recapture = [
    [500, 1, 0, '人间界的军队占领了村庄'],
    [2000, 2, 1, '人间界的军队占领了港口'],
    [4000, 3, 2, '人间界的军队攻陷了堡垒'],
    [6000, 4, 3, '人间界的军队占领了街道'],
    [8000, 5, 4, '人间界的军队占领了城市'],
  ];
  for (const [progress, stage, next_stage, msg] of recapture) {
    const fixture = create_era_fixture();
    fixture.store.set('flag:81', progress);
    fixture.store.set('flag:93', stage);
    const mod = fixture.load_module('page/page-invasion');
    await mod.kyoten_event(1);
    assert.equal(
      fixture.store.get('flag:93'),
      next_stage,
      `${msg}：93 ${stage}→${next_stage}`,
    );
  }

  // 阈值之间：不打横幅、不动 93（2000 < 侵攻度 < 下一档且档位不符的空转）
  const idle = create_era_fixture();
  idle.store.set('flag:81', 1500);
  idle.store.set('flag:93', 1);
  const mod = idle.load_module('page/page-invasion');
  await mod.kyoten_event(1);
  assert.equal(idle.store.get('flag:93'), 1, '阈值间空转');
  assert.equal(history_texts(idle).length, 0);
});

test('侵攻度封顶 10000 与 KYOTEN_EVENT 经结算链触发（:617-618/:984）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { prestige: 90, invasion: 9900 });
  fixture.seed_chara(35, { name: '菲娅', callname: '菲娅' }); // ENDING_1 的菲娅
  // SINKOU = 400 × 1.10 = 440；9900 + 440 = 10340 → 封顶 10000；KYOTEN_EVENT
  // 首档（93 == 0）打「占领了村庄」。封顶后结算尾的 INVASION_CHECK 命中
  // 人间界组（#118 本体）：ENDING_1 演出 → 选 [0] 继续游戏
  const result = await run_invasion(fixture, [1, 0]);
  assert.equal(result, 1, '结局演出后 invasion() 仍返回 1（走 TURNEND）');
  assert.equal(fixture.store.get('flag:81'), 10000, '侵攻度封顶');
  assert.equal(fixture.store.get('flag:93'), 1, '结算尾部 KYOTEN_EVENT 已跑');
  assert.equal(
    fixture.store.get('flag:82'),
    1,
    'ENDING_1 已演出（FLAG:82 = 1）',
  );
  assert.equal(
    fixture.store.get('exflag:99'),
    90 + 2 + 10,
    '结算尾 +2（:978）与结局 +10（:1002）都发生',
  );
  assert(
    history_texts(fixture).some((line) => line.includes('占领了村庄')),
    '跨 2000 阈值的横幅经结算链打出',
  );
});

test('【验收 3】[109] 返回 1：run_shop 抛 BeginSignal(TURNEND)（SHOP ver1.0.2.ERB:124-128）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.set_inputs(109, 1); // 主菜单选 [109] → 侵略画面选 [1]
  const { run_shop } = fixture.load_module('page/page-shop');
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  // :127 BEGIN TURNEND —— 原作引擎行为：BEGIN 结束当前函数；ere 侧信号
  // 上抛由主循环接站（先例：100 分支的 BEGIN TRAIN，#44）
  await assert.rejects(
    () => run_shop(),
    (e) => e instanceof BeginSignal && e.state === 'TURNEND',
  );
  assert.equal(fixture.store.get('flag:81'), 400, '出兵结算在转场前完成');
});

test('[109] 返回 0（999 取消）：不转场，回主菜单重绘', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.set_inputs(109, 999);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(() => run_shop(), /预置输入已耗尽/);
  assert.equal(fixture.store.get('flag:81'), 0);
});

test('invasion()：FLAG:82 决定路由到 post_conquest_menu() 还是 start_campaign()（#468）', async () => {
  const conquered = create_era_fixture();
  make_world(conquered, { fallen: 1 });
  assert.equal(
    await run_invasion(conquered, [999]),
    0,
    'FLAG:82 != 0 时走征服后菜单',
  );
  assert(
    !history_texts(conquered).some((line) => line.includes('你的怪物数量')),
    '征服后菜单不会打出窄路径专属的怪物数量提示',
  );

  const narrow = create_era_fixture();
  make_world(narrow, { fallen: 0 });
  assert.equal(
    await run_invasion(narrow, [999]),
    0,
    'FLAG:82 == 0 时走既有窄路径',
  );
  assert(
    history_texts(narrow).some((line) => line.includes('你的怪物数量')),
    '窄路径仍打出怪物数量提示',
  );
});

test('征服后菜单渲染：三个地区状态按征服标记切换标签与选项文案（INVASION.ERB:30-67）', async () => {
  const cases = [
    {
      flag: 'flag:87',
      progress_flag: 'flag:86',
      unconquered_progress: '精灵族的领域侵攻度',
      conquered_progress: '黑暗精灵的领土侵攻度',
      unconquered_option: '入侵精灵族的领域',
      conquered_option: '巡视黑暗精灵的领土（已征服）',
      accelerator: 1,
    },
    {
      flag: 'flag:89',
      progress_flag: 'flag:88',
      unconquered_progress: '龙之山脉侵攻度',
      conquered_progress: '混沌龙之山侵攻度',
      unconquered_option: '入侵龙之山脉',
      conquered_option: '巡视混沌龙之山（已征服）',
      accelerator: 2,
    },
    {
      flag: 'flag:91',
      progress_flag: 'flag:90',
      unconquered_progress: '天界侵攻度',
      conquered_progress: '堕天使的淫界侵攻度',
      unconquered_option: '入侵天界',
      conquered_option: '巡视堕天使的淫界（已征服）',
      accelerator: 3,
    },
  ];
  // 三个地区共用同一个侵攻度数值：每个用例只给自己的 FLAG 赋值，其余两个
  // 地区的 FLAG 留在 make_world 的默认 0——如果标签换成了别的地区的数值
  // 列（比如精灵行误读 FLAG:88），命中的行会显示 0/10000 而不是这个值
  const PROGRESS_VALUE = 1234;
  for (const c of cases) {
    for (const conquered of [false, true]) {
      const fixture = create_era_fixture();
      make_world(fixture, { fallen: 1 });
      fixture.store.set(c.flag, conquered ? 1 : 0);
      fixture.store.set(c.progress_flag, PROGRESS_VALUE);
      await run_post_conquest(fixture, [999]);
      const expected_progress = conquered
        ? c.conquered_progress
        : c.unconquered_progress;
      const progress_line = fixture.lines_history.find(
        (line) =>
          line.type === 'progress' && line.text.includes(expected_progress),
      );
      assert(progress_line, `${c.flag}=${conquered ? 1 : 0} 的状态条标签`);
      assert(
        progress_line.out.includes(`${PROGRESS_VALUE}/10000`),
        `${c.flag}=${conquered ? 1 : 0} 的状态条数值列取自 ${c.progress_flag}`,
      );
      assert(
        fixture.lines_history.some(
          (line) =>
            line.type === 'button' &&
            line.accelerator === c.accelerator &&
            line.rendered.includes(
              conquered ? c.conquered_option : c.unconquered_option,
            ),
        ),
        `${c.flag}=${conquered ? 1 : 0} 的选项按钮文案`,
      );
    }
  }
});

test('征服后菜单渲染：圣灵骑士堡垒按 FLAG:92 == 15 切换选项文案（INVASION.ERB:68-72）', async () => {
  for (const [stage, expected] of [
    [0, '攻略圣灵骑士的堡垒'],
    [15, '巡视圣灵骑士的卖春堡垒（已征服）'],
  ]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('flag:92', stage);
    await run_post_conquest(fixture, [999]);
    assert(
      fixture.lines_history.some(
        (line) =>
          line.type === 'button' &&
          line.accelerator === 4 &&
          line.rendered.includes(expected),
      ),
      `FLAG:92 = ${stage} 的 [4] 按钮文案`,
    );
  }
});

test('征服后菜单渲染：天神宫状态条与 [5] 选项三态，两组条件各自独立（:45-49/:73-79）', async () => {
  const cases = [
    {
      label: '开放区间内（route_33=510）：显示天神宫侵攻度条与「攻略天神宫」',
      route_33: 510,
      shrine_stage: 0,
      progress_text: '天神宫侵攻度',
      option_text: '攻略天神宫',
      renders_progress: true,
      renders_option: true,
    },
    {
      label: 'shrine_stage=1（开放区间外）：不显示进度条，选项为「天神宫广场」',
      route_33: 0,
      shrine_stage: 1,
      progress_text: null,
      option_text: '天神宫广场',
      renders_progress: false,
      renders_option: true,
    },
    {
      label:
        'shrine_stage=4（已征服）：显示「淫乱意志的神宫」进度条与已征服选项',
      route_33: 0,
      shrine_stage: 4,
      progress_text: '淫乱意志的神宫侵攻度',
      option_text: '巡视淫乱意志的神宫（已征服）',
      renders_progress: true,
      renders_option: true,
    },
    {
      label: '两个条件都不满足：进度条与 [5] 选项都不渲染',
      route_33: 0,
      shrine_stage: 0,
      progress_text: null,
      option_text: null,
      renders_progress: false,
      renders_option: false,
    },
    {
      // 交叉格：两组条件（进度条随 route_33 优先、按钮随 shrine_stage 优先）
      // 独立成立时优先级彼此相反，原作 :45（IF route_33）与 :73（IF
      // shrine_stage）的分支顺序也确实相反——只用前四组各自单独成立的用例
      // 测不出这一点，参数改成两组条件谁在 if 谁在 else if 都能蒙混过去
      label:
        '交叉格：route_33 开窗且 shrine_stage=4 同时成立，进度条随 route_33、按钮随 shrine_stage',
      route_33: 510,
      shrine_stage: 4,
      progress_text: '天神宫侵攻度',
      option_text: '巡视淫乱意志的神宫（已征服）',
      renders_progress: true,
      renders_option: true,
    },
  ];
  for (const c of cases) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('exflag:2810', c.route_33);
    fixture.store.set('exflag:102', c.shrine_stage);
    await run_post_conquest(fixture, [999]);
    if (c.renders_progress) {
      assert(
        progress_texts(fixture).some((line) => line.includes(c.progress_text)),
        `${c.label}：进度条应渲染`,
      );
    }
    const option_button = fixture.lines_history.find(
      (line) => line.type === 'button' && line.accelerator === 5,
    );
    if (c.renders_option) {
      assert(option_button, `${c.label}：[5] 按钮应渲染`);
      assert(
        option_button.rendered.includes(c.option_text),
        `${c.label}：[5] 按钮文案`,
      );
    } else {
      assert(!option_button, `${c.label}：[5] 按钮不应渲染`);
    }
  }
});

test('征服后菜单派发：999/1000/9/4 各自返回或转发到对应模块（INVASION.ERB:88-131）', async () => {
  const cancel = create_era_fixture();
  make_world(cancel, { fallen: 1 });
  assert.equal(await run_post_conquest(cancel, [999]), 0, '[999] 返回 0');

  const crystal_ball = create_era_fixture();
  make_world(crystal_ball, { fallen: 1 });
  crystal_ball.store.set('exflag:9011', 3); // 分子
  crystal_ball.store.set('exflag:9010', 7); // 分母
  // [1000] 自 #502 起接 SENGEN_VIDEO 真身：菜单画出后由 [999] 退出（:90-92）
  assert.equal(await run_post_conquest(crystal_ball, [1000, 999]), 0);
  assert(
    history_texts(crystal_ball).some((line) =>
      line.startsWith('可用于投放的水晶球'),
    ),
    '[1000] 转发到 SENGEN_VIDEO 真身（#502）',
  );
  assert(
    !history_texts(crystal_ball).some((line) => line.includes('@SENGEN_VIDEO')),
    '存根占位行已撤',
  );
  assert(
    crystal_ball.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.accelerator === 1000 &&
        line.rendered.includes('[3/7]'),
    ),
    '[1000] 按钮文案的分子分母取自 exflag:9011/9010，顺序不能颠倒',
  );

  const campaign = create_era_fixture();
  make_world(campaign, { fallen: 1 });
  // 9 → post_conquest_menu 转发到 campaign_menu()；999 → campaign_menu()
  // 自身循环的 [返回]（#469 起真身，不再是单行占位输出）
  assert.equal(await run_post_conquest(campaign, [9, 999]), 0);
  assert(
    history_texts(campaign).some((line) => line.includes('当前选择的行动')),
    '[9] 调用 campaign_menu()（page-campaign.js，#469 起真身）',
  );

  // [4] ARCANA_FORT 自 #470 起接真身（invasion 域跨域调用不受限）。用
  // FLAG:92 == 15（四门全破）取最短路径：arcana_fort 打三段总结叙述、
  // RETURN 0（不耗回合），不碰角色表
  const fort = create_era_fixture();
  make_world(fort, { fallen: 1 });
  fort.store.set('flag:92', 15);
  assert.equal(
    await run_post_conquest(fort, [4]),
    0,
    '[4] 的四门全破路径返回 0',
  );
  const fort_texts = history_texts(fort);
  assert(
    fort_texts.includes('圣灵骑士全部都被打倒了，四个据点也都被攻陷了。'),
    '[4] 转发到 ARCANA_FORT 真身（#470）',
  );
  assert(
    !fort_texts.some((line) => line.includes('@ARCANA_FORT')),
    '存根行已撤，不再是占位输出',
  );
});

// 下面两条测试都要先让 era.input() 的按钮白名单清空，才能喂进未渲染过的
// 输入值：[5] 命中 :100-101 的拒收会 continue 且不重新 printButton，此时
// 引擎侧下一次 input() 视为自由输入（test/helpers/era-fixture.js:894-918
// 镜像引擎 returnFromButton）——这正是原作 [1001] 与越界输入在实机上仍可
// 达的原因，1:1 保留
test('征服后菜单派发：[5] 拒收清空按钮白名单后，[1001] 仍可达 AGENT_MENU 存根（INVASION.ERB:93-95）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  fixture.store.set('exflag:2810', 0); // route_33 开放区间外，[5] 会被拒收
  fixture.store.set('exflag:102', 1); // shrine_stage >= 1，[5] 按钮仍渲染
  assert.equal(await run_post_conquest(fixture, [5, 1001]), 0);
  assert(
    history_texts(fixture).some((line) => line.includes('@AGENT_MENU')),
    '[1001] 转发到 AGENT_MENU 存根（#103：只登记、不排期，不实现本体）',
  );
});

test('征服后菜单派发：[5] 拒收清空按钮白名单后，越界输入仍被 result >= 6 || < 0 拒收（INVASION.ERB:102-105）', async () => {
  for (const bad of [6, -1]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('exflag:2810', 0);
    fixture.store.set('exflag:102', 1);
    await assert.rejects(
      () => run_post_conquest(fixture, [5, bad]),
      /预置输入已耗尽/,
      `[${bad}] 白名单清空后仍应被越界守卫拒收重问，而不是落到地区选择`,
    );
  }
});

test('征服后菜单 [0]：与 start_campaign() 直驱产生相同结算（提取前后行为不变）', async () => {
  const via_menu = create_era_fixture();
  make_world(via_menu, { fallen: 1 });
  assert.equal(
    await run_post_conquest(via_menu, [0, 1]),
    1,
    '[0] 经 post_conquest_menu 委派 start_campaign()，回合已耗返回 1',
  );
  assert.equal(
    via_menu.store.get('flag:81'),
    400,
    '[0] 经 post_conquest_menu 委派后，FLAG:81 与直驱 start_campaign() 结算一致',
  );

  const direct = create_era_fixture();
  make_world(direct, { fallen: 1 });
  direct.set_inputs(1);
  const { start_campaign } = direct.load_module('page/page-invasion');
  assert.equal(await start_campaign(), 1);
  assert.equal(direct.store.get('flag:81'), 400);
});

test('征服后菜单 [1]/[2]/[3]/[5]：地区选择后的出兵续接是登记良好的存根（返回 0）', async () => {
  for (const result of [1, 2, 3]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    assert.equal(
      await run_post_conquest(fixture, [result]),
      0,
      `[${result}] 存根返回 0`,
    );
    assert(
      history_texts(fixture).some((line) => line.includes('@INVASION')),
      `[${result}] 占位行带原作函数名`,
    );
  }

  // [5] 需要先落在 route_33 的开放区间内才会派发到这里，否则被 :100-101 拒收（见下一用例）
  const shrine = create_era_fixture();
  make_world(shrine, { fallen: 1 });
  shrine.store.set('exflag:2810', 510);
  assert.equal(await run_post_conquest(shrine, [5]), 0, '[5] 存根返回 0');
  assert(
    history_texts(shrine).some((line) => line.includes('@INVASION')),
    '[5] 占位行带原作函数名',
  );
});

test('征服后菜单 [5] 的原作真实缺陷：按钮渲染为可选，但 route_33 在开放区间外仍被拒收（:73-76/:100-101）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  fixture.store.set('exflag:2810', 0); // 开放区间外
  fixture.store.set('exflag:102', 1); // shrine_stage >= 1 → 按钮渲染为「天神宫广场」
  const { post_conquest_menu } = fixture.load_module('page/page-invasion');
  fixture.set_inputs(5);
  await assert.rejects(
    () => post_conquest_menu(),
    /预置输入已耗尽/,
    '按钮可选但派发被拒：重问耗尽预置输入而不是转发到地区续接',
  );
});

test('征服后菜单 [5]：选中后 shrine_stage >= 3 时无条件 +=1（:136-137）', async () => {
  for (const [stage, expected] of [
    [3, 4],
    [2, 2],
  ]) {
    const fixture = create_era_fixture();
    make_world(fixture, { fallen: 1 });
    fixture.store.set('exflag:2810', 510); // 开放区间内，派发不被拒
    fixture.store.set('exflag:102', stage);
    await run_post_conquest(fixture, [5]);
    assert.equal(
      fixture.store.get('exflag:102'),
      expected,
      `shrine_stage=${stage} → ${expected}`,
    );
  }
});

test('【验收 4】存根清单可检索：docs/stub-registry.md 收录本文件全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('page/page-invasion');
  // INVASION_CHECK 自 #118 起是真身（五组条件），不在存根名单；
  // ARCANA_FORT 自 #470 起是真身（ere/invasion/invasion-arcana-fort.js），
  // MEDAL_BONUS 与 SENGEN_VIDEO 自 #502 起也是真身（本文件内），同样移出；
  // #503 起 [0]/[3] 两条出兵路线落地，'INVASION' 只剩 [2] 路线与地区续接，
  // 而 @INVASION_EVENT 的 RAND:10 三臂恢复真分发后，FORT/CHALLENGE 两臂
  // 各自登记为存根（行为体随 [2] 路线票）
  assert.deepEqual(STUBBED_CALLS, [
    'INVASION',
    'AGENT_MENU',
    'INVASION_EVENT_SEIEI',
    'INVASION_EVENT_FORT',
    'INVASION_EVENT_CHALLENGE',
  ]);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// ————————————————————————————————————————————————————————————————
// #502：@MEDAL_BONUS / @SENGEN_VIDEO / @SENGEN_VIDEO_BONUS
// ————————————————————————————————————————————————————————————————

test('MEDAL_BONUS：十一档与档界逐例（> 阈值判定），≤5 枚不打任何输出（:1030-1067）', async () => {
  const cases = [
    [0, 100],
    [5, 100], // 未达首档：LOCAL 初值 100，且无 PRINTFORM
    [6, 101],
    [10, 101],
    [11, 102],
    [15, 102],
    [16, 103],
    [20, 103],
    [21, 104],
    [30, 104],
    [31, 105],
    [40, 105],
    [41, 110],
    [60, 110],
    [61, 120],
    [100, 120],
    [101, 130],
    [150, 130],
    [151, 140],
    [250, 140],
    [251, 150],
    [500, 150],
    [501, 160],
    [100000, 160], // 上限档不封顶
  ];
  for (const [medals, expected] of cases) {
    const fixture = make_video_world({ medals });
    const { medal_bonus } = fixture.load_module('page/page-invasion');
    assert.equal(
      await medal_bonus(),
      expected,
      `MEDAL_BONUS 档位：勋章 ${medals}`,
    );
    const texts = history_texts(fixture);
    if (expected === 100) {
      assert.deepEqual(texts, [], `MEDAL_BONUS 无输出：勋章 ${medals}（≤5）`);
      assert.deepEqual(
        fixture.waits,
        [],
        'MEDAL_BONUS 无输出时不调 waitAnyKey',
      );
    } else {
      assert.deepEqual(
        texts,
        // %CALLNAME:ARG% 是呼び名（callname:0:-2），提示里的全角空格照抄原作
        ['魔王的勋章补正\u3000x' + (expected / 100).toFixed(2)],
        `MEDAL_BONUS 提示：勋章 ${medals}`,
      );
      assert.equal(
        fixture.waits.filter((w) => w.waited).length,
        1,
        'MEDAL_BONUS 提示后等键（PRINTFORMW）',
      );
    }
  }
});

test('MEDAL_BONUS 经窄路径生效：勋章 > 5 时 SINKOU 按补正放大（:593-595）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.store.set('callname:0:-2', '魔王'); // 呼び名（%CALLNAME:MASTER% 的读数源）
  fixture.store.set('exp:0:81', 6); // > 5 → x1.01
  const result = await run_invasion(fixture, [1]);
  assert.equal(result, 1);
  assert.equal(
    fixture.store.get('flag:81'),
    404,
    'SINKOU 400 × 101% = 404（补正真读 EXP:0:81）',
  );
  assert(
    history_texts(fixture).includes('魔王的勋章补正\u3000x1.01'),
    '补正提示行随打印（呼び名 -2，不是 SAVESTR 的 -1「你」）',
  );
});

test('SENGEN_VIDEO 顶栏与选项：库存/已投放/流行行按 {值,N} 定宽，四档按钮随库存开窗（:1074-1092）', async () => {
  const fixture = make_video_world({
    stock: 7,
    deployed: 3,
    popularity: 5,
    expire: 4,
  });
  assert.equal(await run_sengen_video(fixture, [999]), 0);
  const texts = history_texts(fixture);
  // {STOCK,3} / {EX_FLAG:9011,3} 右对齐补半角空格；两处 \t\t 照抄原作
  assert(
    texts.includes('可用于投放的水晶球  4部\t\t已投放  3部'),
    '顶栏：库存 7-3=4、已投放 3 各补到 3 位（:1076）',
  );
  assert(
    texts.includes('        正流行的有  5部\t\t 4天后将过时'),
    '流行行：9 空格缩进 + 流行度 3 位 + 剩余天数 2 位（:1078）',
  );
  const accelerators = fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.accelerator);
  assert.deepEqual(accelerators, [1, 2, 3, 4, 999], '四档 + 离开');
  const rendered = fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
  assert.deepEqual(
    rendered,
    [
      '[1] 投放水晶球',
      '[2] 派奸商投放水晶球',
      '[3] 增强流行效果',
      '[4] 延长流行时间',
      '[999] 离开',
    ],
    '按钮正文不得自带 [编号] 前缀（引擎 showAcc 自动拼，PR #30）',
  );

  // 无库存：不打四档选项、也不打流行行（EX_FLAG:9012/9013 任一为 0）
  const empty = make_video_world({ stock: 3, deployed: 3, expire: 2 });
  assert.equal(await run_sengen_video(empty, [999]), 0);
  assert(
    history_texts(empty).includes('当前没有可以用于投放的水晶球'),
    ':1089 无库存文案',
  );
  assert(
    history_texts(empty).includes(' 目前没有投放中的水晶球'),
    ':1080 无流行文案（流行度 0）',
  );
  assert.deepEqual(
    empty.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.accelerator),
    [999],
    '无库存时只有 [999]（:1094-1095 的守卫由引擎白名单先行兜住）',
  );
});

test('SENGEN_VIDEO 无库存时 [1]-[4] 被引擎拒收（:1094-1095 的引擎等价形态）', async () => {
  const fixture = make_video_world({ stock: 0, deployed: 0 });
  await assert.rejects(
    () => run_sengen_video(fixture, [1]),
    /输入不合法！请输入以下值之一：/,
    '未渲染的 [1] 送不进游戏层',
  );
  assert.deepEqual(fixture.inputs_consumed, [], '1 未被送达');
});

test('SENGEN_VIDEO [1] 投放：数量入 9011、加成后的数入 9012/9013（:1096-1119）', async () => {
  // 投放 10 部；加成序列 RAND:2=0（×1.2）→ 12，RAND:3=1（不缩水）
  const fixture = make_video_world({ stock: 20, money: 0 });
  const rand = seq([0, 1]);
  assert.equal(await run_sengen_video(fixture, [1, 10, 999], rand), 0);
  assert.deepEqual(rand.uppers, [2, 3], 'MODE 0 只掷 RAND:2 与 RAND:3');
  assert.equal(
    fixture.store.get('exflag:9011'),
    10,
    ':1109 EX_FLAG:9011 += RESULT',
  );
  assert.equal(
    fixture.store.get('exflag:9012'),
    12,
    ':1113 EX_FLAG:9012 += 加成后的 RESULT',
  );
  assert.equal(
    fixture.store.get('exflag:9013'),
    12,
    ':1114 EX_FLAG:9013 += 同值',
  );
  const texts = history_texts(fixture);
  assert(texts.includes('请输入要投放的数量'), ':1100');
  assert(
    texts.includes('在投放过程中似乎传出了不同的版本，投放效果提升了。'),
    '加成提示（:1262-1263）',
  );
  assert(texts.includes('成功投放12部水晶球'), ':1112 报的是加成后的数');
  assert.equal(
    fixture.waits.filter((w) => w.waited).length,
    1,
    ':1112 成功投放后等键（PRINTFORMW）',
  );
});

test('SENGEN_VIDEO [1] 投放失败：加成为 0 时只消耗 9011，不增 9012/9013（:1115-1117）', async () => {
  // 投放 1 部；RAND:2=1（不加成）、RAND:3=0（×0.8 → floor(1×0.8)=0）
  const fixture = make_video_world({ stock: 5, popularity: 2, expire: 3 });
  const rand = seq([1, 0]);
  assert.equal(await run_sengen_video(fixture, [1, 1, 999], rand), 0);
  assert.equal(fixture.store.get('exflag:9011'), 1, '投放数已计入已投放');
  assert.equal(fixture.store.get('exflag:9012'), 2, '流行度不变');
  assert.equal(fixture.store.get('exflag:9013'), 3, '倒计时不变');
  const texts = history_texts(fixture);
  assert(
    texts.includes('似乎有些水晶球投放不是太成功。'),
    '缩水提示（:1264-1265）',
  );
  assert(
    texts.includes('投放，似乎失败了。'),
    '加成为 0 走失败支（:1115-1117）',
  );
  assert(!texts.some((line) => line.startsWith('成功投放')), '不打成功行');
  assert.equal(
    fixture.waits.filter((w) => w.waited).length,
    1,
    ':1116 投放失败后等键（PRINTFORMW）',
  );
});

test('SENGEN_VIDEO [1] 子输入：超量只重问、0 回菜单重画（$INPUT_LOOP_TMP0，:1101-1107）', async () => {
  // 超量 6 > 库存 3：打「超出数量，请重新输入」后重问，第二次 2 被接受
  const fixture = make_video_world({ stock: 3 });
  const rand = seq([1, 1]); // 2 部：RAND:2=1、RAND:3=1 → 不加成不减
  assert.equal(await run_sengen_video(fixture, [1, 6, 2, 999], rand), 0);
  assert(
    history_texts(fixture).includes('超出数量，请重新输入'),
    '超量提示：超出数量，请重新输入（:1106）',
  );
  assert.equal(fixture.store.get('exflag:9011'), 2, '超量的 6 不被接受');
  assert.equal(
    history_texts(fixture).filter((line) => line === '请输入要投放的数量')
      .length,
    1,
    '重问不重画（$INPUT_LOOP_TMP0 只回到 INPUT）',
  );

  // 输入 0 → GOTO INPUT_LOOP：整屏重画（顶栏出现两次）
  const back = make_video_world({ stock: 3 });
  assert.equal(await run_sengen_video(back, [1, 0, 999]), 0);
  assert.equal(
    history_texts(back).filter((line) => line.startsWith('可用于投放的水晶球'))
      .length,
    2,
    ':1103-1104 回菜单重画顶栏',
  );
  assert.equal(back.store.get('exflag:9011'), 0, '0 部不入账');
});

test('SENGEN_VIDEO [2] 奸商代理：付金币或勋章，两种酬劳都不够则重问（:1120-1163）', async () => {
  // 付金币：M×5000 = 50000 < 100000
  const money = make_video_world({ stock: 20, money: 100000, medals: 0 });
  assert.equal(
    await run_sengen_video(money, [2, 10, 1, 999], seq([1, 1, 1, 1, 1])),
    0,
  );
  assert.equal(money.store.get('flag:10004'), 50000, ':1151 MONEY -= M*5000');
  assert.equal(
    money.store.get('exflag:4444'),
    50000,
    ':1152 EX_FLAG:4444 -= M*5000',
  );
  assert.equal(money.store.get('exflag:9011'), 10, '代理投放同样入 9011');
  assert.equal(
    money.store.get('exflag:9012'),
    11,
    'MODE 1 的无条件 ×1.10：10 → 11（随后两枚随机全 Miss）',
  );
  assert(
    history_texts(money).includes('成功投放11部水晶球'),
    '成功行报的是加成后的 11（:1140）',
  );
  assert.equal(
    money.waits.filter((w) => w.waited).length,
    1,
    ':1140 奸商成功投放后等键（PRINTFORMW）',
  );
  assert(history_texts(money).includes('犒赏了奸商50000G'), ':1150');

  // 付勋章：金币条件不成立（M*5000 > MONEY），勋章够
  const medal = make_video_world({ stock: 20, money: 0, medals: 20 });
  assert.equal(
    await run_sengen_video(medal, [2, 10, 2, 999], seq([1, 1, 1, 1, 1])),
    0,
  );
  assert.equal(medal.store.get('exp:0:81'), 10, ':1155 EXP:0:81 -= M');
  assert.equal(medal.store.get('flag:10004'), 0, '不扣钱');
  assert(history_texts(medal).includes('犒赏了奸商10枚勋章'), ':1154');
  assert(
    !history_texts(medal).some((line) => line.includes('犒赏金币')),
    '金币按钮的渲染条件 (M*5000) < MONEY 不成立',
  );

  // 两种酬劳都不够：M > 勋章数 且 M*5000 > MONEY → 重问（0 回菜单）
  const poor = make_video_world({ stock: 5, money: 10000, medals: 1 });
  assert.equal(await run_sengen_video(poor, [2, 3, 0, 999]), 0);
  assert(history_texts(poor).includes('没有足够的奖赏来打动奸商'), ':1134');
  assert.equal(poor.store.get('exflag:9011'), 0, '被拒的投放数不入账');
});

test('SENGEN_VIDEO [3] 增强流行效果：50000G/5 勋章二选一，×1.2 起且封顶 ×2（:1164-1198）', async () => {
  const money = make_video_world({ stock: 5, money: 100000, popularity: 10 });
  // RAND:5=1（不额外加成）、RAND:2=1（不额外加成）→ floor(10×1.2) = 12
  const money_rand = seq([1, 1]);
  assert.equal(await run_sengen_video(money, [3, 1, 999], money_rand), 0);
  assert.deepEqual(
    money_rand.uppers,
    [5, 2],
    '增强段的两枚骰子：先是 RAND:5（1/5 再 ×1.60）、再是 RAND:2（1/2 再 ×1.20）',
  );
  assert.equal(money.store.get('flag:10004'), 50000, ':1179 MONEY -= 50000');
  assert.equal(
    money.store.get('exflag:4444'),
    50000,
    ':1180 EX_FLAG:4444 -= 50000',
  );
  assert.equal(money.store.get('exflag:9012'), 12, ':1190 TIMES 1.20');
  assert(
    history_texts(money).includes('因为剪辑出了更多的版本，投放效果增强了'),
    ':1197',
  );
  assert(history_texts(money).includes('请选择要支付方式'), ':1169');

  // 封顶 ×2：6 → 7（1.2）→ 11（×1.6）→ 13（×1.2）→ 封顶 12
  const capped = make_video_world({ stock: 5, money: 100000, popularity: 6 });
  assert.equal(await run_sengen_video(capped, [3, 1, 999], seq([0, 0])), 0);
  assert.equal(capped.store.get('exflag:9012'), 12, ':1195-1196 封顶 M*2');

  // 勋章支付：MONEY 不足 50000，勋章 > 5
  const medal = make_video_world({
    stock: 5,
    money: 0,
    medals: 9,
    popularity: 1,
  });
  assert.equal(await run_sengen_video(medal, [3, 2, 999], seq([1, 1])), 0);
  assert.equal(medal.store.get('exp:0:81'), 4, ':1183 EXP:0:81 -= 5');
  assert.equal(medal.store.get('exflag:9012'), 1, 'floor(1×1.2) = 1');

  // [999] 离开：不进增强段、不扣款
  const leave = make_video_world({ stock: 5, money: 100000, popularity: 10 });
  assert.equal(await run_sengen_video(leave, [3, 999, 999]), 0);
  assert.equal(leave.store.get('flag:10004'), 100000, '离开不扣款');
  assert.equal(leave.store.get('exflag:9012'), 10, '离开不影响流行度');

  // 钱正好 50000：按钮不渲染（严格 >），只能离开（原作同样只能重问）
  const edge = make_video_world({ stock: 5, money: 50000, popularity: 10 });
  assert.equal(await run_sengen_video(edge, [3, 999, 999]), 0);
  assert.equal(edge.store.get('flag:10004'), 50000, 'MONEY == 50000 不扣');
  assert.equal(edge.store.get('exflag:9012'), 10);
});

test('SENGEN_VIDEO [4] 延长流行时间：50000G 一次，封顶 +5、保底 +1（:1199-1229）', async () => {
  const normal = make_video_world({ stock: 5, money: 100000, expire: 3 });
  // RAND:5=1、RAND:2=1 → floor(3×1.2) = 3 → 保底 (3-3) < 1 → 3+1 = 4
  const normal_rand = seq([1, 1]);
  assert.equal(await run_sengen_video(normal, [4, 1, 999], normal_rand), 0);
  assert.deepEqual(
    normal_rand.uppers,
    [5, 2],
    '延长段的两枚骰子与增强段同款（RAND:5 与 RAND:2）',
  );
  assert.equal(normal.store.get('flag:10004'), 50000, ':1211');
  assert.equal(normal.store.get('exflag:9013'), 4, ':1226-1227 保底 +1');
  assert(history_texts(normal).includes('流行时间延长了'), ':1228');
  assert(history_texts(normal).includes('将收取50000G。'), ':1202');

  // 封顶 M+5：10 → 12 → 19 → 22 → 封顶 15
  const capped = make_video_world({ stock: 5, money: 100000, expire: 10 });
  assert.equal(await run_sengen_video(capped, [4, 1, 999], seq([0, 0])), 0);
  assert.equal(capped.store.get('exflag:9013'), 15, ':1224-1225 封顶 M+5');

  // [999] 算了：回菜单，不扣钱也不延长
  const skip = make_video_world({ stock: 5, money: 100000, expire: 3 });
  assert.equal(await run_sengen_video(skip, [4, 999, 999]), 0);
  assert.equal(skip.store.get('flag:10004'), 100000, '算了不扣款');
  assert.equal(skip.store.get('exflag:9013'), 3, '算了不延长');
});

test('SENGEN_VIDEO 数量输入的空值与非数字：归一到 0 回菜单，NaN 不入账（#502 登记）', async () => {
  // 引擎把空串归一成 0（#151/G6 的 getNumber 镜像），非数字串原样回传——
  // 两者都不是原作那个「数值型 RESULT」的世界；number_input 一并归一到 0，
  // 于是走 :1103-1104 的 GOTO INPUT_LOOP。数量输入是本菜单唯一没有按钮
  // 白名单保护的读数点（上一轮输入清空白名单、之后只 print 不 printButton），
  // 归一前 'abc' 会被当合法数量收下并把 NaN 写进 9011
  for (const typed of ['', 'abc', NaN]) {
    const fixture = make_video_world({ stock: 3 });
    assert.equal(await run_sengen_video(fixture, [1, typed, 999]), 0);
    assert.equal(
      fixture.store.get('exflag:9011'),
      0,
      `输入 ${JSON.stringify(typed)}：数量不入账（更不许写 NaN）`,
    );
    assert.equal(
      history_texts(fixture).filter((line) =>
        line.startsWith('可用于投放的水晶球'),
      ).length,
      2,
      `输入 ${JSON.stringify(typed)}：按 0 处理 → 回菜单重画（:1103-1104）`,
    );
  }
});

test('SENGEN_VIDEO_BONUS：MODE 0/1 的随机序列、保底与提示逐条（:1236-1266）', () => {
  // 每个夹具一套模块实例：取本夹具里的函数，别跨夹具复用
  const bonus_of = (fixture) =>
    fixture.load_module('page/page-invasion').sengen_video_bonus;

  // MODE 0：RAND:2=0（×1.2）→ 12，RAND:3=1（不缩水）
  const plain = create_era_fixture();
  const plain_rand = seq([0, 1]);
  assert.equal(bonus_of(plain)(10, 0, plain_rand), 12);
  assert.deepEqual(plain_rand.uppers, [2, 3]);
  assert.deepEqual(
    plain.text_lines(),
    ['在投放过程中似乎传出了不同的版本，投放效果提升了。'],
    'MODE 0 的加成提示（:1262-1263）',
  );

  // MODE 0 缩水：1 × 0.80 → 0
  const shrunk = create_era_fixture();
  assert.equal(bonus_of(shrunk)(1, 0, seq([1, 0])), 0);
  assert.deepEqual(
    shrunk.text_lines(),
    ['似乎有些水晶球投放不是太成功。'],
    '缩水提示（:1264-1265）',
  );

  // MODE 0 的缩水系数：10 × 0.80 = 8（改成 0.20 会得 2——系数值单独钉住）
  const shrunk10 = create_era_fixture();
  assert.equal(
    bonus_of(shrunk10)(10, 0, seq([1, 0])),
    8,
    'MODE 0 的缩水系数：10 × 0.80 = 8',
  );

  // MODE 1：三枚加分 + 两枚共用（RAND:2/3/4/2/3），全 Miss → ×1.10 截断
  const merchant = create_era_fixture();
  const merchant_rand = seq([1, 1, 1, 1, 1]);
  assert.equal(bonus_of(merchant)(10, 1, merchant_rand), 11);
  assert.deepEqual(
    merchant_rand.uppers,
    [2, 3, 4, 2, 3],
    'MODE 1 的抽取顺序不可交换',
  );
  assert.deepEqual(
    merchant.text_lines(),
    ['奸商们制作更多的版本提升了投放效果。'],
    'MODE 1 的加成提示（:1258-1259）',
  );

  // MODE 1 保底：加成后仍 <= M 时回 M，且无提示（三条 SIF 都不命中）
  const floored = create_era_fixture();
  assert.equal(
    bonus_of(floored)(1, 1, seq([1, 1, 1, 1, 0])),
    1,
    ':1260-1261 保底',
  );
  assert.deepEqual(floored.text_lines(), [], 'MODE 1 保底档不打任何提示');

  // MODE 1 连续加成：10 → 11（1.10）→ 13（1.2）→ 15（1.2）→ 18（1.2）
  const boosted = create_era_fixture();
  assert.equal(bonus_of(boosted)(10, 1, seq([0, 0, 0, 1, 1])), 18);
  assert.deepEqual(
    boosted.text_lines(),
    ['奸商们制作更多的版本提升了投放效果。'],
    '加成后的提示只打一次',
  );
});

test('SENGEN_VIDEO 的库存来源真读 EX_FLAG:9010/9011（售卻相關的写入点之后）', async () => {
  // 顶栏分子分母与菜单开窗同源：EX_FLAG:9010 - EX_FLAG:9011
  const fixture = make_video_world({ stock: 1, deployed: 1 });
  assert.equal(await run_sengen_video(fixture, [999]), 0);
  assert(
    history_texts(fixture).includes('可用于投放的水晶球  0部\t\t已投放  1部'),
    'stock 0：顶栏打 0、选项区走无库存分支',
  );
  assert(history_texts(fixture).includes('当前没有可以用于投放的水晶球'));
});
