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
 * 地区出兵菜单（start_campaign 的 $START1 画面）是否渲染过。
 *
 * `你的怪物数量 N只`（INVASION.ERB:169）只有出兵菜单打，征服后菜单一行都不打。
 *
 * 用途是把「征服后菜单的循环把输入拒收掉、原地重问」与「输入过了守卫、
 * 一路落到地区分派」分开（#538）：两条路径的可观察结果都是 Continue 后
 * 重新 `await era.input()`，预置输入不够时都会抛「预置输入已耗尽」——
 * 只看耗尽与否区分不了（M9726 就是这么漏掉的）。而**出兵菜单只在后一条
 * 路径上渲染**，所以这一行出现就等于「没被守卫拦住」。
 *
 * @param {object} fixture 夹具
 * @returns {boolean} true = 落进了地区出兵菜单
 */
function entered_campaign_menu(fixture) {
  return history_texts(fixture).some((line) => line.includes('你的怪物数量'));
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
        line.rendered === '[1] - 使用魔王的魔力（经验值）',
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
        line.rendered === '[0] - 使用现有怪物的一半去进攻（资金·俘虏）',
    ),
    '怪物 ≥ 600 时 [0] 渲染为按钮（正文带原作的「- 」，INVASION.ERB:176）',
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

test('#612 征服后菜单：七个按钮的正文照写原作的「- 」', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 }); // FLAG:82 != 0 → @INVASION 的征服后菜单
  fixture.store.set('exflag:2810', 501); // route_33 开窗（:45 区间）→ [5] 才渲染
  assert.equal(await run_post_conquest(fixture, [999]), 0);
  const rendered = fixture.lines
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
  for (const expected of [
    '[0] - 巡视地上的魔界领土（已征服）', // :52
    '[1] - 入侵精灵族的领域', // :56（未征服支）
    '[2] - 入侵龙之山脉', // :61
    '[3] - 入侵天界', // :66
    '[4] - 攻略圣灵骑士的堡垒', // :71
    '[5] - 攻略天神宫', // :78
    '[9] - 向着世界之外', // :80（原文作「向著」）
    '[999] - 退出', // :82
  ]) {
    assert.ok(rendered.includes(expected), `${expected}（INVASION.ERB）`);
  }

  // 已征服支：四个区域的标签整支换掉（:54/:59/:64/:69/:74），三元两边都要钉
  const won = create_era_fixture();
  make_world(won, { fallen: 1 });
  won.store.set('flag:87', 1); // 精灵领域已征服
  won.store.set('flag:89', 1); // 龙之山脉已征服
  won.store.set('flag:91', 1); // 天界已征服
  won.store.set('flag:92', 15); // 四门全破
  won.store.set('exflag:102', 4); // shrine_stage >= 4 → 神宫已征服支（:74）
  assert.equal(await run_post_conquest(won, [999]), 0);
  const won_rendered = won.lines
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
  for (const expected of [
    '[1] - 巡视黑暗精灵的领土（已征服）', // :54
    '[2] - 巡视混沌龙之山（已征服）', // :59
    '[3] - 巡视堕天使的淫界（已征服）', // :64
    '[4] - 巡视圣灵骑士的卖春堡垒（已征服）', // :69
  ]) {
    assert.ok(
      won_rendered.includes(expected),
      `${expected}（INVASION.ERB 已征服支）`,
    );
  }
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
  // 拿不到 9（knob 的 9 无覆盖值 → 1），落进 SEIEI 臂，由下面的 FORT 输出行断言
  // 接管（M10788）。[0] 路线（INV_TYPE == 0）的 FORT 不输入、固定走强攻。
  assert.equal(fort.uppers[0], 10, 'MONSTER_DATA 等级骰的上界是 RAND:10');
  assert(
    fort.texts.includes('城堡看起来防御坚固防备森严，于是魔王军发起了强攻。'),
    '9 → FORT 臂',
  );

  const challenge = await run_with(8);
  assert(
    challenge.texts.includes(
      '在意识到敌人只有一个人后，魔王军向敢于挑衅的女骑士发起了猛烈的进攻。',
    ),
    '8 → CHALLENGE 臂',
  );

  const seiei = await run_with(0);
  assert(
    !seiei.texts.includes('城堡看起来防御坚固防备森严，于是魔王军发起了强攻。'),
    '0-7 → SEIEI 臂：不打 FORT 的正文',
  );
  assert(
    seiei.texts.includes(
      '根据传闻狂王为了应对魔王军的入侵已开始组织起了精锐部队。',
    ),
    'SEIEI 的首档传闻（:257-260，FLAG:81 == 0 时无 INV_TYPE 条件）',
  );
});

test('@INVASION_EVENT 三臂的守卫：FORT/CHALLENGE 对 INV_TYPE == 1 仍作废（:539/:824）', async () => {
  for (const roll of [9, 8]) {
    const fixture = create_era_fixture();
    make_world(fixture);
    // 魔力路线（[1]）：两臂的 SIF 守卫把 INV_TYPE == 1 挡回 -1，无任何正文
    await run_invasion(fixture, [1], knob({ 10: roll }));
    const texts = history_texts(fixture);
    assert(
      !texts.includes('城堡看起来防御坚固防备森严，于是魔王军发起了强攻。'),
      `INV_TYPE == 1 时 FORT 被守卫挡下（roll ${roll}）`,
    );
    assert(
      !texts.includes(
        '在意识到敌人只有一个人后，魔王军向敢于挑衅的女骑士发起了猛烈的进攻。',
      ),
      `INV_TYPE == 1 时 CHALLENGE 被守卫挡下（roll ${roll}）`,
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
  // 征服后菜单 [0] → 出兵菜单 [3] → 列表选 1；RAND:10 = 9 命中 FORT，
  // INV_TYPE == 3 的 FORT 有选项 → 再键入 2（绕路），走埋伏支 RETURN 1
  await run_post_conquest(raid, [0, 3, 1, 2], knob({ 10: 9, 100: 99 }));
  assert(
    history_texts(raid).includes('勇者1绕开城堡向人间界进发，但却遇到了埋伏。'),
    'INV_TYPE == 3 + 已征服：FORT 不早退（左结合读法）',
  );

  const monster = create_era_fixture();
  make_world(monster, { fallen: 1 });
  monster.store.set('item:100', 600);
  await run_post_conquest(monster, [0, 0], knob({ 10: 9, 100: 99 }));
  assert(
    !history_texts(monster).includes(
      '城堡看起来防御坚固防备森严，于是魔王军发起了强攻。',
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
  // :446-457 的「没有出现」四行（[2] 路线进战斗体但 FLAG:AREA < 5000 时）
  const absent = ['………', '……', '…', '传闻中的精锐部队并没有出现…………'];

  // 直接驱动该臂：三档的判据是「FLAG:AREA 区间 × INV_TYPE 条件」，与
  // 出兵路线无关（路线侧由上面两条用例覆盖）
  const run_at = async (progress, inv_type) => {
    const fixture = create_era_fixture();
    fixture.store.set('flag:81', progress); // FLAG:AREA
    fixture.store.set('flag:82', 0); // FLAG:SINDO
    const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
    // 确定随机源：RAND:FLAG:AREA 取上界内最大的「没出现」档（2000）
    const rand = (n) => Math.min(2000, n - 1);
    const ret = await invasion_event_seiei(
      81,
      82,
      inv_type,
      { sinkou: 0, yusya_i: 0 },
      rand,
    );
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
  // [2] 路线继续进战斗体（侵攻度 < 5000 → 四行「没有出现」，返回 0）
  const brute = await run_at(0, 2);
  assert.deepEqual(
    brute.texts,
    [first, ...absent],
    '侵攻度 0 + INV_TYPE 2 打完首档继续进战斗体',
  );
  assert.equal(brute.ret, 0, ':459 RETURN 0');
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
  assert.deepEqual(
    (await run_at(10000, 2)).texts,
    absent,
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
  // RETURN 0（不耗回合），不碰角色表。
  //
  // 多备一枚 [999]（#538）：分派条件若被改坏，[4] 会一路落到地区分派、
  // 进人间界出兵菜单。那份菜单也吃 999 并返回 0，所以「返回值」这一层
  // 分辨不出来——备着它只是让流程活到下面那条**真身文案**的断言上，
  // 由那条断言给出「红的正是 [4] 没转发到 ARCANA_FORT」的结论；
  // 不备的话流程当场撞上「预置输入已耗尽」，断言根本没执行到（M9718
  // 的实测现场）。多出来的输入在正常路径上不会被消费。
  const fort = create_era_fixture();
  make_world(fort, { fallen: 1 });
  fort.store.set('flag:92', 15);
  assert.equal(
    await run_post_conquest(fort, [4, 999]),
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
  assert(
    !entered_campaign_menu(fort),
    '[4] 转发到 ARCANA_FORT 真身（#470）：不得落进地区出兵菜单',
  );
});

// 下面两条测试都要先让 era.input() 的按钮白名单清空，才能喂进未渲染过的
// 输入值：[5] 命中 :100-101 的拒收会 continue 且不重新 printButton，此时
// 引擎侧下一次 input() 视为自由输入（test/helpers/era-fixture.js:894-918
// 镜像引擎 returnFromButton）——这正是原作 [1001] 与越界输入在实机上仍可
// 达的原因。AGENT_MENU 分支随 #638 删除后，[1001] 与越界输入同路落 :102
// 的拒收（#103：AGENT_MENU 是复制改名事故，只登记、不排期）
test('征服后菜单派发：[5] 拒收清空按钮白名单后，[1001] 与越界输入同路被拒收（AGENT_MENU 入口已删，#638）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  fixture.store.set('exflag:2810', 0); // route_33 开放区间外，[5] 会被拒收
  fixture.store.set('exflag:102', 1); // shrine_stage >= 1，[5] 按钮仍渲染
  await assert.rejects(
    () => run_post_conquest(fixture, [5, 1001]),
    /预置输入已耗尽/,
    '[1001] 白名单清空后落到 :102 的 >=6 拒收重问（AGENT_MENU 分支随 #638 删除）',
  );
  assert(
    !history_texts(fixture).some((line) => line.includes('@AGENT_MENU')),
    '不得再打印 AGENT_MENU 提示行',
  );
  assert.equal(
    entered_campaign_menu(fixture),
    false,
    '守卫之后的分派一行都不许发生',
  );
});

test('征服后菜单派发：[5] 拒收清空按钮白名单后，越界输入仍被 result >= 6 || < 0 拒收（INVASION.ERB:102-105）', async () => {
  // 取守卫的两个边界值：6 是第一个被 `>= 6` 拒收的，-1 是最后一个被
  // `< 0` 拒收的——门槛挪一格（>= 7 / < -1）当场就被这两条钉住。
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
    // 「拒绝重问」与「掉过守卫、无人处理」都会耗尽输入（#538/M9726 的
    // 漏网现场），所以还要看**守卫之后的分派有没有发生**：只有后者会落进
    // 地区出兵菜单。`continue` 不重画菜单，征服后菜单这一侧一行都不加。
    assert.equal(
      entered_campaign_menu(fixture),
      false,
      `[${bad}] 白名单清空后仍应被越界守卫拒收重问，而不是落到地区选择——守卫之后的分派一行都不许发生`,
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

// 征服后菜单 [1]/[2]/[3]/[5] 的出兵续接自 #505 起是真身，用例在本文件末尾的
// 「#505：地区续接与 start_campaign 的地区泛化」一节。

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
  // 拒收与「不拒收」都会把预置输入耗光（#538/M9719 的漏网现场），所以
  // 还要证「转发到地区续接」这一步没发生：拒收走 `continue` 原地重问，
  // 菜单不重画也不加行；转发则会进天神宫的出兵菜单，那里会打
  // `你的怪物数量 N只`。区间外的 [5] 只许前者。
  assert.equal(
    entered_campaign_menu(fixture),
    false,
    '按钮可选但派发被拒：重问耗尽预置输入而不是转发到地区续接（出兵菜单一行都不许打）',
  );
});

test('征服后菜单 [5] 拒收判断条件的两侧边界：route_33 = 500 拒收 / 501 放行（:100-101）', async () => {
  // 500 是「开放区间外」的最后一档、501 是区间内第一档（:45/:77 的窗口从
  // 501 起）。`route_33 <= 500` 这个字面量往小改一格（<= 499 / < 500）时，
  // 只有 500 这一个输入能分辨——现有用例用的是 0 与 510，两侧都不动。
  const outside = create_era_fixture();
  make_world(outside, { fallen: 1 });
  outside.store.set('exflag:2810', 500); // route_33：开放区间外最后一档
  outside.store.set('exflag:102', 1); // shrine_stage = 1（[5] 按钮渲染，副作用门槛 3 不到）
  await assert.rejects(
    () => run_post_conquest(outside, [5]),
    /预置输入已耗尽/,
    'route_33 = 500 仍在拒收侧：重问耗尽预置输入',
  );
  assert.equal(
    entered_campaign_menu(outside),
    false,
    'route_33 = 500 仍在拒收侧：不得落进天神宫的出兵菜单',
  );

  // 501 → 放行，落进天神宫的出兵菜单（第二枚 [999] 是出兵菜单的返回）。
  // 这一支同时是上面那条「不得落进出兵菜单」的**正面参照**：helper 认得出
  // 这份菜单，断言 false 才有区分能力。
  const inside = create_era_fixture();
  make_world(inside, { fallen: 1 });
  inside.store.set('exflag:2810', 501); // route_33：开放区间内第一档
  inside.store.set('exflag:102', 1); // shrine_stage = 1
  assert.equal(
    await run_post_conquest(inside, [5, 999]),
    0,
    '出兵菜单 [999] 返回 0',
  );
  assert.equal(
    entered_campaign_menu(inside),
    true,
    'route_33 = 501 在放行侧：落进天神宫的出兵菜单',
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
    // 副作用在 $START1 之前无条件应用（:133-138 的 ELSEIF 体），之后才进
    // 出兵菜单——第二枚输入是出兵菜单的 [999] 返回（#505 起不再是存根）
    assert.equal(
      await run_post_conquest(fixture, [5, 999]),
      0,
      '出兵菜单 [999] 返回 0',
    );
    assert.equal(
      fixture.store.get('exflag:102'),
      expected,
      `shrine_stage=${stage} → ${expected}`,
    );
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
    texts.includes(
      '可用于投放的水晶球\u00A0\u00A04部\t\t已投放\u00A0\u00A03部',
    ),
    '顶栏：库存 7-3=4、已投放 3 各补到 3 位（:1076）',
  );
  assert(
    texts.includes(
      '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0正流行的有\u00A0\u00A05部\t\t\u00A04天后将过时',
    ),
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
    history_texts(fixture).includes(
      '可用于投放的水晶球\u00A0\u00A00部\t\t已投放\u00A0\u00A01部',
    ),
    'stock 0：顶栏打 0、选项区走无库存分支',
  );
  assert(history_texts(fixture).includes('当前没有可以用于投放的水晶球'));
});

// ===========================================================================
// issue #504：[2] 勇者出兵路线、@INVASION_EVENT_SEIEI 战斗体、@_INV_DEATH_CHECK
// 与 FORT / CHALLENGE 两臂。
// ===========================================================================

/**
 * 精锐部队（Chara18/19）的预设 → 变量表（yml/Chara18.yml / Chara19.yml 的
 * 运行时形状）。引擎 addCharacter 把「基礎」同时落 base 与 maxbase
 * （test/chara-yml.test.js 逐字段钉住），「フラグ」11/12 落 cflag 攻击/防御、
 * 9 落等级。夹具的 addCharacter 只写 callname（见 test/helpers/chara.js 头注），
 * 预设值由这里补——预设本身的装载正确性归 chara-yml.test.js。
 */
const SEIEI_PRESETS = {
  18: { hp: 9000, mp: 9000, atk: 150, def: 200, lv: 50 },
  19: { hp: 7500, mp: 7500, atk: 200, def: 150, lv: 50 },
};

/** 预置并准备精锐部队的角色（战斗体在 :298/:303 才 ADDCHARA） */
function seed_seiei(fixture, id) {
  const p = SEIEI_PRESETS[id];
  fixture.seed_chara(id, { id, name: '精锐部队', callname: '精锐部队' });
  fixture.store.set(`base:${id}:0`, p.hp);
  fixture.store.set(`maxbase:${id}:0`, p.hp);
  fixture.store.set(`base:${id}:1`, p.mp);
  fixture.store.set(`maxbase:${id}:1`, p.mp);
  fixture.store.set(`cflag:${id}:11`, p.atk);
  fixture.store.set(`cflag:${id}:12`, p.def);
  fixture.store.set(`cflag:${id}:9`, p.lv);
}

/** 预置一名可带兵出战的勇者（[2] 路线的候选） */
function seed_brute_hero(fixture, id, { lv = 10 } = {}) {
  fixture.seed_chara(id, { name: `勇者${id}`, callname: `勇者${id}` });
  fixture.era.addCharacter(id);
  fixture.store.set(`base:${id}:0`, 500); // :308 体力
  fixture.store.set(`cflag:${id}:0`, 1); // :309 出售与助手资格位
  fixture.store.set(`cflag:${id}:1`, 0); // :310 待机
  fixture.store.set(`cflag:${id}:9`, lv); // 等级（勇者补正的读数源）
  fixture.store.set(`talent:${id}:85`, 1); // :311 爱慕
}

/**
 * 头几个 RAND:N 取指定值、其后一律 0（含 chara_make 的随机消费量太大、
 * 写不满精确序列的路径）。0 对任何上界都合法，故序列永远不会因越界而红。
 * @param {number[]} values 前几次抽取的返回值（按调用序）
 */
function head_rand(values) {
  let index = 0;
  const uppers = [];
  const rand = (upper) => {
    uppers.push(upper);
    const value = index < values.length ? values[index] : 0;
    index += 1;
    assert.ok(
      Number.isInteger(upper) && upper > 0,
      `RAND 的上界必须是正整数，实际 ${upper}`,
    );
    assert.ok(
      value >= 0 && value < upper,
      `随机值 ${value} 不在 RAND:${upper} 内`,
    );
    return value;
  };
  rand.uppers = uppers;
  return rand;
}

/** progress 格（条）的「条后文字」列，断言 HP/气力条的数值 */
function progress_outs(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'progress')
    .map((line) => line.out);
}

test('@_INV_DEATH_CHECK：精锐部队的三条退场判据（:467-479）', async () => {
  // ARG:1 = 精锐部队、ARG:0 = 领军勇者；命中即 RETURN 2（魔王侧获胜），
  // 每条都跟着一个 PRINTL 空行
  const run = async (elite_hp, elite_mp) => {
    const fixture = create_era_fixture();
    fixture.store.set('callname:5:-1', '勇者5');
    fixture.store.set('callname:9:-1', '精锐部队');
    fixture.store.set('callname:9:-2', '精锐部队');
    fixture.store.set('base:5:0', 500);
    fixture.store.set('base:5:1', 500);
    fixture.store.set('base:9:0', elite_hp);
    fixture.store.set('base:9:1', elite_mp);
    const { inv_death_check } = fixture.load_module('page/page-invasion');
    return {
      ret: await inv_death_check(5, 9),
      texts: fixture.text_lines(),
      brs: fixture.lines.filter((line) => line.type === 'br').length,
    };
  };

  const dead = await run(0, 500);
  assert.equal(dead.ret, 2, ':467 体力 <= 0');
  assert.deepEqual(
    dead.texts,
    ['精锐部队被勇者5率领的魔王军消灭了………'],
    ':468 消灭（%CALLNAME:ARG:1% 取呼び名、%SAVESTR:ARG:0% 取姓名）',
  );
  assert.equal(dead.brs, 1, ':469 PRINTL 空行');

  const broken = await run(100, 500);
  assert.equal(broken.ret, 2, ':471 体力 <= 100');
  assert.deepEqual(broken.texts, ['精锐部队被勇者5率领的魔王军击溃了………']);

  const surrendered = await run(500, 0);
  assert.equal(surrendered.ret, 2, ':475 气力 <= 0');
  assert.deepEqual(surrendered.texts, [
    '被魔王军包围的精锐部队失去战斗的意志投降了………',
  ]);

  // 三条都不命中：继续走魔王侧判定，精锐部队完好时返回 0
  const intact = await run(101, 1);
  assert.equal(intact.ret, 0, '精锐部队三档都不命中');
});

test('@_INV_DEATH_CHECK：魔王侧四条退场判据与俘虏支（:482-521）', async () => {
  const run = async (setup) => {
    const fixture = create_era_fixture();
    fixture.store.set('callname:0:-1', '魔王');
    fixture.store.set('callname:0:-2', '魔王');
    fixture.store.set('callname:5:-1', '勇者5');
    fixture.store.set('callname:9:-1', '精锐部队');
    fixture.store.set('callname:9:-2', '精锐部队');
    fixture.store.set('base:9:0', 500); // 精锐部队完好
    fixture.store.set('base:9:1', 500);
    fixture.store.set('base:0:0', 5000); // 魔王体力
    fixture.store.set('base:0:1', 5000); // 魔王气力
    setup(fixture.store);
    const { inv_death_check } = fixture.load_module('page/page-invasion');
    return { ret: await inv_death_check(0, 9), texts: fixture.text_lines() };
  };

  // :482-487 被狂王俘虏过（TALENT:280）且气力 <= 1000 且 FLAG:5 位 7
  const captured = await run((s) => {
    s.set('base:0:1', 1000);
    s.set('talent:0:280', 1);
    s.set('flag:5', 128);
  });
  assert.equal(captured.ret, 1, ':487 RETURN 1');
  assert.deepEqual(captured.texts.slice(0, 2), [
    '被狂王俘虏过的魔王丧失了战意，抛下武器投降了。',
    '精锐部队俘获了魔王………',
  ]);

  // :488-498 魔王军体力 <= 0：位 7 开 → 俘虏（状态 9），关 → 逃回（状态 0）
  const wiped = await run((s) => s.set('base:0:0', 0));
  assert.equal(wiped.ret, 1, ':498 RETURN 1');
  assert.deepEqual(wiped.texts, [
    '魔王军被精锐部队消灭了，魔王孤身逃了回来…………',
  ]);
  const wiped_captured = await run((s) => {
    s.set('base:0:0', 0);
    s.set('flag:5', 128);
  });
  assert.deepEqual(wiped_captured.texts, [
    '魔王军被精锐部队消灭了，魔王也被俘虏了…………',
  ]);

  // :499-509 体力 <= 300
  const broken = await run((s) => s.set('base:0:0', 300));
  assert.equal(broken.ret, 1, ':509 RETURN 1');
  assert.deepEqual(broken.texts, [
    '魔王军被精锐部队击溃了，魔王从乱军中逃了回来…………',
  ]);

  // :510-520 气力 <= 0
  const exhausted = await run((s) => s.set('base:0:1', 0));
  assert.equal(exhausted.ret, 1, ':520 RETURN 1');
  assert.deepEqual(exhausted.texts, [
    '被精锐部队包围的魔王军失去战斗的意志投降了，魔王没脸见人地逃了回来…………',
  ]);

  // 四条都不命中 → 0（继续打）
  assert.equal((await run(() => {})).ret, 0, '魔王侧完好时继续');
});

test('@_INV_DEATH_CHECK 的 CFLAG 状态写入：俘虏支 9 / 逃回支 0（:485/:492/:495/:503/:506/:514/:517）', async () => {
  const run = async (setup) => {
    const fixture = create_era_fixture();
    fixture.store.set('callname:0:-1', '魔王');
    fixture.store.set('callname:0:-2', '魔王');
    fixture.store.set('callname:7:-1', '勇者7');
    fixture.store.set('callname:7:-2', '勇者7');
    fixture.store.set('callname:9:-1', '精锐部队');
    fixture.store.set('callname:9:-2', '精锐部队');
    fixture.store.set('base:9:0', 500);
    fixture.store.set('base:9:1', 500);
    fixture.store.set('base:7:0', 5000);
    fixture.store.set('base:7:1', 5000);
    setup(fixture.store);
    const { inv_death_check } = fixture.load_module('page/page-invasion');
    return { ret: await inv_death_check(7, 9), fixture };
  };

  const captured = await run((s) => {
    s.set('base:7:0', 0);
    s.set('flag:5', 128);
  });
  assert.equal(captured.fixture.store.get('cflag:7:1'), 9, ':492 被俘虏');

  const escaped = await run((s) => s.set('base:7:0', 0));
  assert.equal(escaped.fixture.store.get('cflag:7:1'), 0, ':495 逃回');

  const surrendered = await run((s) => s.set('base:7:1', 0));
  assert.equal(
    surrendered.fixture.store.get('cflag:7:1'),
    0,
    ':517 投降后逃回（位 7 关）',
  );
  const surrendered_captured = await run((s) => {
    s.set('base:7:1', 0);
    s.set('flag:5', 128);
  });
  assert.equal(
    surrendered_captured.fixture.store.get('cflag:7:1'),
    9,
    ':514 被部下献给精锐部队',
  );
});

test('@INVASION_EVENT_SEIEI 战斗体：防御型 18 与血量/攻防套算（:279-459）', async () => {
  // 精锐部队残血（BASE:18:0 = 100）：第二条 _INV_DEATH_CHECK（:430，带实参）
  // 在 :471 判溃 → BREAK → RETURN 0；这条出口**不给经验**（经验只在 :394 的
  // 第一条检查之后），下面另立一条覆盖。
  const fixture = create_era_fixture();
  // 直驱该臂：SINKOU 按引用传入（原作 #DIM REF SINKOU，:315 把它加进勇者体力）
  fixture.store.set('flag:81', 5000); // FLAG:AREA >= 5000 才开打
  fixture.store.set('flag:82', 0);
  fixture.store.set('callname:1:-1', '勇者1');
  fixture.store.set('callname:1:-2', '勇者1');
  fixture.store.set('base:1:0', 20000);
  fixture.store.set('maxbase:1:0', 20000);
  fixture.store.set('base:1:1', 20000);
  fixture.store.set('maxbase:1:1', 20000);
  fixture.store.set('cflag:1:11', 100); // 攻击
  fixture.store.set('cflag:1:12', 100); // 防御
  fixture.store.set('base:0:0', 10000); // 魔王体力（首次 _INV_DEATH_CHECK 读 ARG=0）
  fixture.store.set('base:0:1', 10000);
  seed_seiei(fixture, 18);
  seed_seiei(fixture, 19);
  fixture.store.set('base:18:0', 100);
  // 上限与当前值刻意不等：气力条读错上限下标（拿体力的 9000 当上限）时数值列会变
  fixture.store.set('maxbase:18:1', 12000);

  const state = { sinkou: 2048, yusya_i: 1 };
  const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
  // RAND:FLAG:AREA = 2001 > 2000（:282 才出敌）；RAND:2 == 0 → 防御型 18（:296）
  const rand = seq([2001, 0]);
  assert.equal(await invasion_event_seiei(81, 82, 2, state, rand), 0);

  // :315-316 勇者的体力/气力加上 SINKOU（2048）
  assert.equal(
    fixture.store.get('base:1:0'),
    20000 + 2048 - 250,
    ':421 挨了 250',
  );
  assert.equal(
    fixture.store.get('base:1:1'),
    20000 + 2048 - 250,
    ':422 气力同减',
  );
  // :361 先制守卫：200 < 100*(2048/2048+1) = 200 不成立 → ELSE 支
  assert.equal(fixture.store.get('cflag:18:12'), 100, ':388 精锐防御减半');
  // :412 精锐反击：100 < 150 → 伤害 (150-100)*5 = 250，防御 100/3*2 = 66
  assert.equal(
    fixture.store.get('cflag:1:12'),
    66,
    ':414-415 勇者防御 /=3 *=2',
  );
  assert.equal(fixture.store.get('cflag:1:11'), 100, ':418 忍术守卫：无减值');
  assert.equal(
    fixture.store.get('exp:1:80'),
    undefined,
    ':471 的退场分支不给经验（经验只在 :394 之后）',
  );
  // :432-435 DELCHARA
  assert.ok(
    !fixture.era.getAddedCharacters().includes(18),
    ':434 精锐部队退场（DELCHARA）',
  );

  const texts = fixture.text_lines();
  for (const line of [
    '精锐部队出现了！',
    '你的勇者勇者1率领着魔王军和精锐部队展开了战斗！',
    '（怪物的战斗力将被添加到攻击力和体力和气力上）',
    '魔王军 勇者1',
    // :344 的攻防行在交手之前：攻击值按 SINKOU/1024+1 = 3 倍放大，防御尚未被削
    '攻击300 防御100 怪物的合计战力2048点',
    'VS',
    '精锐部队',
    '攻击150 防御200',
    '精锐部队承受着勇者1的攻击。',
    '精锐部队发起进攻使勇者1率领的魔王军受到了250点伤害！',
    '精锐部队被勇者1率领的魔王军击溃了………',
  ]) {
    assert(texts.includes(line), `缺少输出行：${line}`);
  }
  // :340/:343/:352/:355 的 (cur/max) 数值列（条后文字）不可被 barWidth 吞掉
  assert(
    progress_outs(fixture).includes(' 22048/20000'),
    '魔王军体力条的数值列可见（显示发生在 :315-316 的 SINKOU 补正之后）',
  );
  assert(
    progress_outs(fixture).includes(' 100/9000'),
    '精锐体力条的数值列可见',
  );
  assert(
    progress_outs(fixture).includes(' 9000/12000'),
    '精锐气力条读的是 :1 号上限（不是体力的 :0）',
  );
});

test('@INVASION_EVENT_SEIEI 战斗体：胜出交付经验走的是第一条无实参检查（原作缺陷）', async () => {
  // :391 `CALL _INV_DEATH_CHECK`（**无实参**）→ ARG:0 = ARG:1 = 0，判的是
  // 魔王（角色 0）自己的体力/气力。于是 :394 的「魔王侧获得胜利」经验段
  // 由**魔王被打残**触发，而不是精锐部队倒下。原作缺陷，#14 登记，1:1 保留。
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', 5000);
  fixture.store.set('flag:82', 0);
  fixture.store.set('callname:1:-1', '勇者1');
  fixture.store.set('callname:1:-2', '勇者1');
  fixture.store.set('callname:0:-1', '你');
  fixture.store.set('callname:0:-2', '你');
  fixture.store.set('base:1:0', 20000);
  fixture.store.set('maxbase:1:0', 20000);
  fixture.store.set('base:1:1', 20000);
  fixture.store.set('maxbase:1:1', 20000);
  fixture.store.set('cflag:1:11', 100);
  fixture.store.set('cflag:1:12', 100);
  fixture.store.set('base:0:0', 100); // 魔王体力残 → 第一条检查判到魔王
  fixture.store.set('maxbase:0:0', 100);
  fixture.store.set('base:0:1', 10000);
  fixture.store.set('maxbase:0:1', 10000);
  seed_seiei(fixture, 18);
  seed_seiei(fixture, 19);

  const state = { sinkou: 2048, yusya_i: 1 };
  const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
  assert.equal(await invasion_event_seiei(81, 82, 2, state, seq([2001, 0])), 0);
  // :394-395 经验 SINKOU/5 = 409（精锐部队本身毫发未损）
  assert.equal(fixture.store.get('exp:1:80'), 409, ':394 SINKOU/5');
  assert.equal(fixture.store.get('base:18:0'), 9000, '精锐部队全程未被击伤');
  assert(fixture.text_lines().includes('勇者1获得了409点经验值！'), ':395');
  assert.ok(
    !fixture.era.getAddedCharacters().includes(18),
    ':399-400 精锐部队仍被清退',
  );
});

test('@INVASION_EVENT_SEIEI 战斗体：攻击型 19 与 FLAG:60 的等级补正（:296-313）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', 5000);
  fixture.store.set('flag:82', 0);
  fixture.store.set('flag:60', 10); // 勇者基础等级补正
  fixture.store.set('callname:1:-1', '勇者1');
  fixture.store.set('callname:1:-2', '勇者1');
  fixture.store.set('base:1:0', 20000);
  fixture.store.set('maxbase:1:0', 20000);
  fixture.store.set('base:1:1', 20000);
  fixture.store.set('maxbase:1:1', 20000);
  fixture.store.set('cflag:1:11', 100);
  fixture.store.set('cflag:1:12', 100);
  fixture.store.set('base:0:0', 10000);
  fixture.store.set('base:0:1', 10000);
  seed_seiei(fixture, 18);
  seed_seiei(fixture, 19);
  // 攻击型的体力预设归零：补正后正好 100，第一轮就被 :471 判溃
  fixture.store.set('base:19:0', 0);

  const state = { sinkou: 0, yusya_i: 1 };
  const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
  // RAND:2 == 1 → 攻击型 19（:301-305）
  assert.equal(await invasion_event_seiei(81, 82, 2, state, seq([2001, 1])), 0);

  // :308-313 六行补正（FLAG:60 = 10）：攻击/防御 +10、上限与当前各 +100
  assert.equal(fixture.store.get('cflag:19:11'), 200 + 10, ':308 CFLAG:11');
  assert.equal(
    fixture.store.get('cflag:19:12'),
    Math.trunc((150 + 10) / 2),
    ':309 CFLAG:12 += 10，随后被 :388 减半',
  );
  assert.equal(fixture.store.get('maxbase:19:0'), 7500 + 100, ':310 MAXBASE:0');
  assert.equal(fixture.store.get('maxbase:19:1'), 7500 + 100, ':311 MAXBASE:1');
  assert.equal(fixture.store.get('base:19:0'), 100, ':312 BASE:0 = 0 + 100');
  assert.equal(fixture.store.get('base:19:1'), 7500 + 100, ':313 BASE:1');
  assert.deepEqual(
    fixture.calls
      .filter((call) => call.api === 'addCharacter')
      .map((c) => c.args[0]),
    [19],
    ':303 ADDCHARA 19（扁平化下角色号 = 预设号）',
  );
  assert.ok(
    !fixture.era.getAddedCharacters().includes(19),
    ':435 战后 DELCHARA（:471 判溃 → 清退）',
  );
  assert(
    fixture.text_lines().includes('攻击210 防御160'),
    '补正后的精锐攻防（:356，交手前）',
  );
});

test('@INVASION_EVENT_SEIEI 战斗体：REPEAT 21 打满 → 战线崩溃 RETURN 1（:317-332）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', 5000);
  fixture.store.set('flag:82', 0);
  fixture.store.set('callname:1:-1', '勇者1');
  fixture.store.set('callname:1:-2', '勇者1');
  fixture.store.set('base:1:0', 20000);
  fixture.store.set('maxbase:1:0', 20000);
  fixture.store.set('base:1:1', 20000);
  fixture.store.set('maxbase:1:1', 20000);
  // 攻 10 / 防 1000：两侧的伤害判据都不成立，21 回合里不再掷骰
  fixture.store.set('cflag:1:11', 10);
  fixture.store.set('cflag:1:12', 1000);
  fixture.store.set('base:0:0', 10000);
  fixture.store.set('base:0:1', 10000);
  seed_seiei(fixture, 18);
  seed_seiei(fixture, 19);

  const state = { sinkou: 2048, yusya_i: 1 };
  const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
  const rand = head_rand([2001, 0]);
  assert.equal(
    await invasion_event_seiei(81, 82, 2, state, rand),
    1,
    ':332 RETURN 1',
  );

  const texts = fixture.text_lines();
  for (const line of [
    '没有时间了，战线已经不可能再维持下去了！',
    '勇者1的部队开始了后退，怪物们在后退中溃散着。',
    '最终活着回来的怪物不到十只………',
  ]) {
    assert(texts.includes(line), `缺少超时输出行：${line}`);
  }
  // :326-327 超时也给经验（SINKOU/10 = 204），与 :394 的胜出档 SINKOU/5 不同
  assert.equal(fixture.store.get('exp:1:80'), 204, ':326 SINKOU/10');
  assert(texts.includes('勇者1获得了204点经验值！'), ':327');
  // REPEAT 21 的第 21 次由 :318 的 TIME_I > 19 截住：整屏只画 20 次
  assert.equal(
    texts.filter((line) => line === '魔王军 勇者1').length,
    20,
    ':317 REPEAT 21 的最后一轮是超时判定，不打攻防画面',
  );
  assert.ok(
    !fixture.era.getAddedCharacters().includes(18),
    ':329-331 DELCHARA + NAME_RESET',
  );
});

test('@INVASION_EVENT_SEIEI 战斗体：RAND:FLAG:AREA <= 2000 时不出现（:282/:446-451）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', 5000);
  fixture.store.set('flag:82', 0);
  const state = { sinkou: 0, yusya_i: 1 };
  const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
  // RAND:5000 = 2000 → 不 > 2000
  assert.equal(
    await invasion_event_seiei(81, 82, 2, state, seq([2000])),
    0,
    ':451 走 ELSE 后仍 RETURN 0',
  );
  // 5000 也命中 :266 的第三档传闻，故只断言尾部四行
  assert.deepEqual(
    fixture.text_lines().slice(-4),
    ['………', '……', '…', '传闻中的精锐部队并没有出现…………'],
    ':446-451',
  );
});

test('@INVASION_EVENT_SEIEI 战斗体：侵攻度 < 5000 时整段跳过且不掷骰（:279/:452-457）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', 4999);
  fixture.store.set('flag:82', 0);
  const state = { sinkou: 0, yusya_i: 1 };
  const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
  const rand = seq([]); // 一次抽取都不该发生
  assert.equal(await invasion_event_seiei(81, 82, 2, state, rand), 0);
  assert.deepEqual(rand.uppers, [], ':279 的 FLAG:AREA >= 5000 不成立就不掷骰');
  assert.deepEqual(fixture.text_lines().slice(-4), [
    '………',
    '……',
    '…',
    '传闻中的精锐部队并没有出现…………',
  ]);
});

test('[2] 勇者出兵：怪物消耗三分之一、勇者补正、结果段（:210-441 + :758-888）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.store.set('base:0:0', 10000); // 魔王体力（首次 _INV_DEATH_CHECK 读它）
  fixture.store.set('item:100', 600); // 过 600 门槛
  fixture.store.set('flag:10004', 0); // MONEY
  fixture.store.set('exflag:4444', 0); // EX_FLAG:4444 非作弊资金
  seed_brute_hero(fixture, 1);
  // RAND:100 = 99：结果段的 9% 抓捕不命中（:882）
  assert.equal(await run_invasion(fixture, [2, 1], knob({ 100: 99 })), 1);

  // :424-426 怪物 /= 3 后 *= 2（与 [0] 的 /= 2 不同）
  assert.equal(
    fixture.store.get('item:100'),
    400,
    ':424/:426 ITEM /= 3 再 *= 2',
  );
  // 战力 11 → 勇者补正 x1.10（等级 10）→ 12 → 侵攻度 +12
  assert.equal(fixture.store.get('flag:81'), 12, ':611 未征服全额入账');
  // :842/:843/:845 未征服：战利品 = SINKOU*5、经验 = SINKOU/2
  assert.equal(fixture.store.get('flag:10004'), 60, ':843 MONEY += SINKOU*5');
  assert.equal(fixture.store.get('exflag:4444'), 60, ':844 EX_FLAG:4444 同步');
  assert.equal(
    fixture.store.get('exp:1:80'),
    6,
    ':845 EXP:YUSYA_I:80 += SINKOU/2',
  );
  assert.equal(
    fixture.store.get('cflag:1:151'),
    -50,
    ':776 KARMA, YUSYA_I, -50',
  );
  assert.equal(
    fixture.store.get('exp:0:80'),
    undefined,
    '[2] 不给魔王经验（那是 [1] 结果段的事）',
  );

  const texts = history_texts(fixture);
  for (const line of [
    '派遣谁去侵攻呢？',
    '怪物的战斗力　11点',
    '勇者补正　　　x1.10',
    '合计　12点',
    '勇者1带着怪物到达了人间界，尽可能地施暴着。（善良值:-50）',
    '得到了60点的战利品！',
    '勇者1获得了6点经验值！',
  ]) {
    assert(texts.includes(line), `缺少输出行：${line}`);
  }
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'button' &&
        line.rendered ===
          '[2] - 派遣勇者带三分之一的怪物去进攻（资金·经验值·俘虏）',
    ),
    '怪物 ≥ 600 时 [2] 渲染为按钮',
  );
});

test('[2] 性格旁白七档 + 未命中空的 PRINTL（:778-800）', async () => {
  const talents = [160, 161, 162, 163, 164, 165, 166];
  for (const talent of talents) {
    const fixture = create_era_fixture();
    make_world(fixture);
    fixture.store.set('base:0:0', 10000);
    fixture.store.set('item:100', 600);
    seed_brute_hero(fixture, 1);
    fixture.store.set(`talent:1:${talent}`, 1);
    await run_invasion(fixture, [2, 1], knob({ 100: 99 }));
    assert.equal(
      fixture.lines_history.filter((line) => line.type === 'br').length,
      0,
      `TALENT:${talent} 命中时走 PRINTFORMW，不落 ELSE 的空 PRINTL`,
    );
  }
  // 七档都不命中 → ELSE 的 PRINTL（一个空行）
  const plain = create_era_fixture();
  make_world(plain);
  plain.store.set('base:0:0', 10000);
  plain.store.set('item:100', 600);
  seed_brute_hero(plain, 1);
  await run_invasion(plain, [2, 1], knob({ 100: 99 }));
  assert.equal(
    plain.lines_history.filter((line) => line.type === 'br').length,
    1,
    ':799 ELSE → PRINTL',
  );

  // 慈爱档的全文（:779）
  const loving = create_era_fixture();
  make_world(loving);
  loving.store.set('base:0:0', 10000);
  loving.store.set('item:100', 600);
  seed_brute_hero(loving, 1);
  loving.store.set('talent:1:160', 1);
  await run_invasion(loving, [2, 1], knob({ 100: 99 }));
  assert(
    history_texts(loving).includes(
      '勇者1在侵略的时候依旧全程保持着慈爱的笑容，她终于明白到一切都是为了你而存在的………',
    ),
    ':779 %SAVESTR:MASTER% 取「你」（#5 决议）',
  );
});

test('[2] 候选资格六条逐条（:305-316）', async () => {
  // 原作 `SIF COUNT == 0 || BASE:COUNT:0 < 1 || !CFLAG:COUNT:0 == 2 || …` 的六条。
  // 第三条 `!CFLAG:COUNT:0 == 2` 按 Emuera 的优先级（`!` 是最高优先的单目
  // 运算符）读成 `(!CFLAG:COUNT:0) == 2`——`!x` 恒为 0/1，故该条恒假、
  // 永不淘汰任何人（原作缺陷，#14 登记，1:1 保留）。
  const cases = [
    {
      label: '体力 0（BASE:0 < 1）',
      rejected: true,
      setup: (f) => f.store.set('base:1:0', 0),
    },
    {
      label: '非待机非苗床（CFLAG:1 == 5）',
      rejected: true,
      setup: (f) => f.store.set('cflag:1:1', 5),
    },
    {
      label: '苗床（CFLAG:1 == 7）→ 可派遣',
      rejected: false,
      setup: (f) => f.store.set('cflag:1:1', 7),
    },
    {
      label: '不爱慕也不淫乱（TALENT:85/76 皆 0）',
      rejected: true,
      setup: (f) => f.store.delete('talent:1:85'),
    },
    {
      label: '淫乱（TALENT:76）→ 可派遣',
      rejected: false,
      setup: (f) => {
        f.store.delete('talent:1:85');
        f.store.set('talent:1:76', 1);
      },
    },
    {
      label: '妊娠且未开「怀孕时的迎击」位',
      rejected: true,
      setup: (f) => f.store.set('talent:1:153', 1),
    },
    {
      label: '妊娠但开了位（FLAG:5 位 10）→ 可派遣',
      rejected: false,
      setup: (f) => {
        f.store.set('talent:1:153', 1);
        f.store.set('flag:5', 1024);
      },
    },
    {
      label: '助手可（CFLAG:0 == 2）不淘汰——`!CFLAG:0 == 2` 恒假（原作缺陷）',
      rejected: false,
      setup: (f) => f.store.set('cflag:1:0', 2),
    },
  ];
  for (const item of cases) {
    const fixture = create_era_fixture();
    make_world(fixture);
    fixture.store.set('base:0:0', 10000);
    fixture.store.set('item:100', 600);
    seed_brute_hero(fixture, 1);
    item.setup(fixture);
    await run_invasion(fixture, [2, 1], knob({ 100: 99 }));
    const listed = history_texts(fixture).includes('派遣谁去侵攻呢？');
    assert.equal(
      listed,
      !item.rejected,
      `${item.label}：列表${item.rejected ? '不该' : '该'}渲染`,
    );
  }

  // 第一条（`COUNT == 0`）：只有魔王自己时无候选 → PRINTW + RESTART。
  // 扁平化下 0 号要真的在编制里才进得了候选循环（对局中 ADDCHARA 0 恒有）
  const only_master = create_era_fixture();
  make_world(only_master);
  only_master.store.set('base:0:0', 10000);
  only_master.store.set('item:100', 600);
  only_master.store.set('talent:0:85', 1); // 除「是魔王自己」外全部放行
  only_master.seed_chara(0, { id: 0, name: '你', callname: '你' });
  only_master.era.addCharacter(0);
  assert.equal(await run_invasion(only_master, [2, 999], knob({ 100: 99 })), 0);
  assert(
    history_texts(only_master).includes('没有勇者可进行侵攻。'),
    '魔王自己不算候选',
  );
});

test('[2] 分页游标与 [2]/[3] 共用同一套页窗判据', async () => {
  // 27 个候选人（NUM_PAGE = 26）：第 0 页渲染 1..25，第 1 页从 LIST_POS
  // （= 25）起扫 → 25 号重复（与 [3] 的翻页用例同源）
  const ids = [];
  for (let id = 1; id <= 27; id += 1) {
    ids.push(id);
  }
  const fixture = create_era_fixture();
  make_world(fixture);
  fixture.store.set('base:0:0', 10000);
  fixture.store.set('item:100', 600);
  for (const id of ids) {
    seed_brute_hero(fixture, id);
  }
  assert.equal(
    await run_invasion(fixture, [2, 1001, 999, 999], knob({ 100: 99 })),
    0,
  );
  const rows = fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.accelerator);
  assert.deepEqual(
    rows.slice(0, 5),
    [0, 1, 2, 3, 999], // 出兵菜单（600 只怪物 → [0]/[2] 都是按钮）
    '菜单的按钮序',
  );
  assert.equal(rows[5], 1, '列表第 0 页从 1 号勇者起画');
  assert.deepEqual(
    rows.slice(-5),
    [0, 1, 2, 3, 999],
    '[999] 返回 → RESTART → 菜单重画，末五个按钮仍是菜单',
  );
  assert.equal(
    history_texts(fixture).filter((line) => line === '派遣谁去侵攻呢？').length,
    2,
    '翻页重画列表',
  );
});

// ---------------------------------------------------------------------------
// @INVASION_EVENT_FORT（INVASION_EVENT.ERB:530-814）与 @INVASION_EVENT_CHALLENGE
// （:815-1162）：两臂的守卫、选项、各档结算与 SINKOU 的按引用改写。
// ---------------------------------------------------------------------------

/** FORT / CHALLENGE 的最小世界：勇者 1 与魔王各带满血，人间界未征服 */
function make_arm_world({ sindo = 0, progress = 0, money = 0, ex95 = 0 } = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('flag:81', progress); // FLAG:AREA
  fixture.store.set('flag:82', sindo); // FLAG:SINDO
  fixture.store.set('exflag:95', ex95); // EX_FLAG:95 勇者击破位域
  fixture.store.set('flag:10004', money); // MONEY
  fixture.store.set('exflag:4444', money); // EX_FLAG:4444
  fixture.store.set('callname:1:-1', '勇者1');
  fixture.store.set('callname:1:-2', '勇者1');
  fixture.store.set('callname:0:-1', '你');
  fixture.store.set('callname:0:-2', '你');
  fixture.store.set('base:1:0', 5000);
  fixture.store.set('maxbase:1:0', 5000);
  fixture.store.set('base:1:1', 5000);
  fixture.store.set('maxbase:1:1', 5000);
  fixture.store.set('base:0:0', 5000);
  fixture.store.set('maxbase:0:0', 5000);
  fixture.store.set('base:0:1', 5000);
  fixture.store.set('maxbase:0:1', 5000);
  return fixture;
}

// 直驱 FORT / CHALLENGE 两臂（ARG 顺序照原作：AREA, SINDO, INV_TYPE, SINKOU, YUSYA_I）
async function run_fort(fixture, inputs, inv_type, state, rand) {
  fixture.set_inputs(...inputs);
  const { invasion_event_fort } = fixture.load_module('page/page-invasion');
  return invasion_event_fort(81, 82, inv_type, state, rand);
}

async function run_challenge(fixture, inputs, inv_type, state, rand) {
  fixture.set_inputs(...inputs);
  const { invasion_event_challenge } =
    fixture.load_module('page/page-invasion');
  return invasion_event_challenge(81, 82, inv_type, state, rand);
}

test('FORT [1] 全军强攻：40/40/20 三档与 SINKOU 的按引用改写（:610-670）', async () => {
  const run = async (roll, inv_type = 0) => {
    const fixture = make_arm_world();
    const state = { sinkou: 100, yusya_i: inv_type === 0 ? 0 : 1 };
    const ret = await run_fort(fixture, [], inv_type, state, seq([roll]));
    return { ret, state, fixture };
  };

  // 强攻成功（LOCAL >= 6）：SINKOU 剩九成
  const win = await run(6);
  assert.equal(win.ret, 0, ':627 RETURN 0');
  assert.equal(win.state.sinkou, 90, ':625 SINKOU * 9 / 10');
  assert.deepEqual(
    win.fixture.text_lines().slice(3),
    [
      '魔王军向着城堡发起了最为猛烈的进攻，在付出较小的代价后攻破了城堡的一角。',
      '城堡中的人类军队仓皇外逃，被城堡外的魔王军尽数剿灭、',
      '获胜的魔王军高呼万岁，继续向人间界进发。',
      '',
      '怪物数量减少了10%',
    ],
    ':614-624（`\\%` 是转义后的字面量百分号）',
  );

  // 强攻惨胜（2 <= LOCAL <= 5）：SINKOU 减半
  const close = await run(5);
  assert.equal(close.ret, 0, ':651 RETURN 0');
  assert.equal(close.state.sinkou, 50, ':649 SINKOU / 2');
  assert(
    close.fixture
      .text_lines()
      .includes('在付出巨大的代价后，魔王军才攻下了城堡。'),
    ':635 INV_TYPE != 2 的 ELSE 措辞',
  );
  assert(close.fixture.text_lines().includes('怪物数量减少了50%'), ':648');

  // 惨败（LOCAL < 2）：侵攻中止，SINKOU 不动
  const lose = await run(1);
  assert.equal(lose.ret, 1, ':669 RETURN 1');
  assert.equal(lose.state.sinkou, 100, '惨败不改写 SINKOU');
  assert(
    lose.fixture.text_lines().includes('侵攻中止。'),
    ':667 PRINTFORMW 侵攻中止。',
  );
  assert.equal(
    lose.fixture.store.get('cflag:0:1'),
    0,
    ':668 CFLAG:YUSYA_I:1 = 0——INV_TYPE == 0 时 YUSYA_I = 0，写的是魔王',
  );
});

test('FORT [1] 全军强攻的 INV_TYPE == 2 支：经验、体力减半与勇者措辞（:619-646）', async () => {
  const fixture = make_arm_world();
  const state = { sinkou: 100, yusya_i: 1 };
  assert.equal(await run_fort(fixture, [1], 2, state, seq([6])), 0);
  assert.equal(
    fixture.store.get('exp:1:80'),
    20,
    ':620 EXP += SINKOU/5（减员前）',
  );
  assert(fixture.text_lines().includes('勇者1获得了20点经验值！'), ':621');

  const close = make_arm_world();
  const close_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(await run_fort(close, [1], 2, close_state, seq([2])), 0);
  assert.equal(close_state.sinkou, 50, ':649 SINKOU / 2');
  assert.equal(close.store.get('exp:1:80'), 20, ':641 EXP += SINKOU/5');
  assert.equal(close.store.get('base:1:0'), 2500, ':644 BASE:YUSYA_I:0 /= 2');
  assert(close.text_lines().includes('勇者1的体力减少了一半！'), ':645');
});

test('FORT [2] 亲自潜入 INV_TYPE == 2：四档与 FLAG:83/经验（:673-735）', async () => {
  // A. 有天使/恶魔翼（TALENT:245）→ 100% 成功，且掷出的 RAND:10 白费
  const winged = make_arm_world();
  winged.store.set('talent:1:245', 1);
  const winged_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(winged, [2], 2, winged_state, seq([9])),
    0,
    ':691 RETURN 0',
  );
  assert.equal(winged.store.get('exp:1:80'), 20, ':684 EXP += SINKOU/5');
  assert.equal(winged.store.get('flag:83'), 5, ':687 FLAG:83 += 5');
  assert(winged.text_lines().includes('人间牧场肉便器数量+5。'), ':688');

  // B. RAND:10 >= 5 → 潜入成功（50%）
  const sneaked = make_arm_world();
  sneaked.store.set('talent:1:314', 9); // 非人类 → LOCAL:3 假
  const sneaked_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(sneaked, [2], 2, sneaked_state, seq([5])),
    0,
    ':708 RETURN 0',
  );
  assert.equal(sneaked.store.get('exp:1:80'), 20, ':701');
  assert.equal(sneaked.store.get('flag:83'), 5, ':704');
  assert(
    sneaked.text_lines().includes('勇者1乔装打扮成功混进了城堡里。'),
    ':695',
  );

  // C. LOCAL:3（种族相符）单独成立也走成功支
  const native = make_arm_world();
  const native_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(native, [2], 2, native_state, seq([4])),
    0,
    ':694 `LOCAL >= 5 || LOCAL:3`（人间界要求 TALENT:314 == 0）',
  );
  assert.equal(native_state.sinkou, 100, '走的是成功支（失败支会剩七成）');
  assert.equal(
    native.store.get('exp:1:80'),
    20,
    ':701 成功支给经验（失败支不给）',
  );

  // D. 失败逃窜 30%：体力归零、SINKOU 剩七成
  const fled = make_arm_world();
  fled.store.set('talent:1:314', 9);
  const fled_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(fled, [2], 2, fled_state, seq([2])),
    0,
    ':724 RETURN 0',
  );
  assert.equal(fled.store.get('base:1:0'), 1, ':718 BASE:YUSYA_I:0 = 1');
  assert.equal(fled_state.sinkou, 70, ':721 SINKOU * 7 / 10');
  assert(fled.text_lines().includes('勇者1的体力归零'), ':719');
  assert(fled.text_lines().includes('怪物数量减少了30%'), ':722');

  // E. 失败被捕 20%：需 FLAG:5 位 7 开
  const caught = make_arm_world();
  caught.store.set('talent:1:314', 9);
  caught.store.set('flag:5', 128);
  const caught_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(caught, [2], 2, caught_state, seq([1])),
    1,
    ':734 RETURN 1',
  );
  assert.equal(caught.store.get('cflag:1:1'), 9, ':733 被俘虏');
  assert(caught.text_lines().includes('勇者1被俘虏，侵攻中止。'), ':732');
});

test('FORT [2] 亲自潜入 INV_TYPE == 3：无经验无牧场，失败两支（:738-764）', async () => {
  const run = async (setups, roll) => {
    const fixture = make_arm_world();
    for (const setup of setups) {
      setup(fixture);
    }
    const state = { sinkou: 100, yusya_i: 1 };
    // INV_TYPE == 3 的选项是 [1] 偷偷潜入 / [2] 绕路（:589-590）；本测试全走潜入
    const ret = await run_fort(fixture, [1], 3, state, seq([roll]));
    return { ret, state, fixture };
  };

  const winged = await run([(f) => f.store.set('talent:1:245', 1)], 9);
  assert.equal(winged.ret, 0, ':744 RETURN 0');
  assert.equal(winged.fixture.store.get('exp:1:80'), undefined, '掠夺不写经验');
  assert(
    winged.fixture.text_lines().includes('勇者1趁着夜色从空中穿过了城堡。'),
    ':743',
  );

  const sneaked = await run([(f) => f.store.set('talent:1:314', 9)], 5);
  assert.equal(sneaked.ret, 0, ':748 RETURN 0');
  assert(
    sneaked.fixture.text_lines().includes('勇者1乔装打扮成功通过了城堡。'),
    ':747',
  );

  const fled = await run([(f) => f.store.set('talent:1:314', 9)], 2);
  assert.equal(fled.ret, 1, ':756 RETURN 1');
  assert.equal(fled.fixture.store.get('base:1:0'), 1, ':754 体力归零');
  assert.equal(fled.fixture.store.get('cflag:1:1'), 0, ':755 逃回');
  assert(
    fled.fixture.text_lines().includes('勇者1杀出一条血路，勉强逃了回去。'),
    ':752（与 INV_TYPE == 2 的「勉强逃回了魔王军」措辞不同）',
  );

  const caught = await run(
    [(f) => f.store.set('talent:1:314', 9), (f) => f.store.set('flag:5', 128)],
    1,
  );
  assert.equal(caught.ret, 1, ':763 RETURN 1');
  assert.equal(caught.fixture.store.get('cflag:1:1'), 9, ':762 被生擒');
  assert(
    caught.fixture
      .text_lines()
      .includes('在一番激烈战斗后勇者1还是被人类军队生擒。'),
    ':760',
  );
});

test('FORT [3] 绕路：INV_TYPE == 2 掷 RAND:10、INV_TYPE == 3 恒落埋伏（:767-808）', async () => {
  // INV_TYPE == 2：LOCAL > 0 → 平安无事（九成兵力）
  const safe = make_arm_world();
  const safe_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(safe, [3], 2, safe_state, seq([1])),
    0,
    ':777 RETURN 0',
  );
  assert.equal(safe_state.sinkou, 90, ':775 SINKOU * 9 / 10');
  assert(safe.text_lines().includes('怪物数量减少了10%'), ':776');

  // INV_TYPE == 2：LOCAL == 0 → 被埋伏（五成兵力）
  const ambushed = make_arm_world();
  const ambushed_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(ambushed, [3], 2, ambushed_state, seq([0])),
    0,
    ':786 RETURN 0',
  );
  assert.equal(ambushed_state.sinkou, 50, ':784 SINKOU * 5 / 10');
  assert(ambushed.text_lines().includes('怪物数量减少了50%'), ':785');

  // INV_TYPE == 3 的选项是 [1] 偷偷潜入 / [2] 绕路（:589-590）：键入 2 → 绕路。
  // 该分支从不给 LOCAL 赋值（原作缺陷，#14 登记）→ LOCAL 恒 0 → 十成的
  // 「平安无事」支不可达，恒走埋伏支且 RETURN 1
  const raid = make_arm_world();
  const raid_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_fort(raid, [2], 3, raid_state, seq([])),
    1,
    ':806 埋伏支 RETURN 1（RAND 一次都不掷）',
  );
  assert.equal(raid.store.get('base:1:0'), 5000, ':795 体力 ×9/10 不可达');
  assert.equal(raid.store.get('cflag:1:1'), 0, ':804 FLAG:5 位 7 关 → 逃回');
  assert(
    raid.text_lines().includes('在一番激烈战斗后勇者1终于逃了回来。'),
    ':803',
  );

  const raid_captured = make_arm_world();
  raid_captured.store.set('flag:5', 128);
  assert.equal(
    await run_fort(raid_captured, [2], 3, { sinkou: 100, yusya_i: 1 }, seq([])),
    1,
  );
  assert.equal(raid_captured.store.get('cflag:1:1'), 9, ':801 被活捉');
  assert(
    raid_captured.text_lines().includes('在一番激烈战斗后勇者1还是被活捉了。'),
    ':800',
  );
});

test('FORT 的选项渲染：INV_TYPE 0/2/3 三套正文，2/3 才需要输入（:570-606）', async () => {
  // INV_TYPE == 2：三个选项 + 标题
  const brute = make_arm_world();
  const brute_state = { sinkou: 100, yusya_i: 1 };
  await run_fort(brute, [1], 2, brute_state, seq([6]));
  const labels = (f) =>
    f.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered);
  assert.deepEqual(labels(brute), ['[1] 全军强攻', '[2] 亲自潜入', '[3] 绕路']);
  assert(
    brute.text_lines().includes('城堡看起来防御坚固防备森严，于是勇者1决定……'),
    ':573',
  );

  // INV_TYPE == 3：两个选项，正文措辞不同（「偷偷潜入」）
  const raid = make_arm_world();
  await run_fort(raid, [2], 3, { sinkou: 100, yusya_i: 1 }, seq([5]));
  assert.deepEqual(labels(raid), ['[1] 偷偷潜入', '[2] 绕路']);
  assert(
    raid
      .text_lines()
      .includes(
        '勇者1向人间界进发着，却在必经之路上遇到了人类军队建起的一座城堡。',
      ),
    ':587',
  );
  // :595 `L_CHOICE = RESULT + 1`：键入 2 → L_CHOICE == 3（绕路）
  assert(
    raid.text_lines().includes('勇者1绕开城堡向人间界进发，但却遇到了埋伏。'),
    ':798 键入 2 到了绕路支',
  );

  // INV_TYPE == 0：不渲染选项、不输入，直接走强攻
  const monster = make_arm_world();
  const monster_state = { sinkou: 100, yusya_i: 0 };
  await run_fort(monster, [], 0, monster_state, seq([6]));
  assert.deepEqual(labels(monster), [], 'INV_TYPE == 0 没有可输入的选项');
  assert(
    monster
      .text_lines()
      .includes('城堡看起来防御坚固防备森严，于是魔王军发起了强攻。'),
    ':603',
  );
});

test('FORT 的四个地区名表（:542-567）：AREA 决定五组称呼', async () => {
  const cases = [
    {
      area: 81,
      lines: [
        '早有准备的人类军队在必经之路上建起了一座城堡，集结了大量的人类军队。',
        '城堡看起来防御坚固防备森严，于是魔王军发起了强攻。',
      ],
    },
    {
      area: 86,
      lines: [
        '早有准备的精灵族战士在必经之路上建起了一座精灵城寨，集结了大量的精灵族战士。',
        '精灵城寨看起来防御坚固防备森严，于是魔王军发起了强攻。',
      ],
    },
    {
      area: 88,
      lines: [
        '早有准备的龙族战士在必经之路上建起了一座战争堡垒，集结了大量的龙族战士。',
        '战争堡垒看起来防御坚固防备森严，于是魔王军发起了强攻。',
      ],
    },
    {
      area: 90,
      lines: [
        '早有准备的天界卫队在必经之路上建起了一座天使要塞，集结了大量的天界卫队。',
        '天使要塞看起来防御坚固防备森严，于是魔王军发起了强攻。',
      ],
    },
    {
      area: 93,
      lines: [
        '早有准备的十字军在必经之路上建起了一座天使要塞，集结了大量的十字军。',
        '天使要塞看起来防御坚固防备森严，于是魔王军发起了强攻。',
      ],
    },
  ];
  for (const item of cases) {
    const fixture = make_arm_world();
    const { invasion_event_fort } = fixture.load_module('page/page-invasion');
    await invasion_event_fort(
      item.area,
      82,
      0,
      { sinkou: 100, yusya_i: 0 },
      seq([6]),
    );
    const texts = fixture.text_lines();
    for (const line of item.lines) {
      assert(texts.includes(line), `AREA ${item.area} 缺行：${line}`);
    }
  }
});

test('CHALLENGE 的 EX_FLAG:95 位守卫：每个地区的单挑只发生一次（:836-886）', async () => {
  const bits = { 81: 1, 86: 2, 88: 4, 90: 8, 93: 16 };
  for (const [area, bit] of Object.entries(bits)) {
    const fixture = make_arm_world();
    fixture.store.set('exflag:95', Number(bit));
    const { invasion_event_challenge } =
      fixture.load_module('page/page-invasion');
    const ret = await invasion_event_challenge(
      Number(area),
      82,
      0,
      { sinkou: 100, yusya_i: 1 },
      head_rand([]),
    );
    assert.equal(ret, -1, `AREA ${area} 的位已置 → 早退`);
    assert.deepEqual(fixture.text_lines(), [], '早退零输出');
  }
  // 位未置：正常进入（并在此置位前不写 EX_FLAG:95——写入只在开挂取胜支）
  const fixture = make_arm_world();
  fixture.store.set('exflag:95', 8); // AREA 90 的位
  const { invasion_event_challenge } =
    fixture.load_module('page/page-invasion');
  assert.equal(
    await invasion_event_challenge(
      81,
      82,
      0,
      { sinkou: 100, yusya_i: 1 },
      seq([0, 1]),
    ),
    1,
    'AREA 81 的位（1）未置 → 照常进入',
  );
});

test('CHALLENGE [召唤魔王应战]：钱包不足 3000 时直落堂堂正正（:974-992）', async () => {
  const fixture = make_arm_world({ money: 2999 });
  // INV_TYPE == 0 走「无视，全军进攻」；改用 INV_TYPE == 2 才能键入 [1]
  const state = { sinkou: 100, yusya_i: 1 };
  // 抽取顺序：:893 的 DATALIST（RAND:4）→ :994 的 RAND:10 = 0（< 2 → 不开挂取胜）
  const ret = await run_challenge(fixture, [1], 2, state, head_rand([0, 0]));
  assert.equal(ret, 0, ':1072 不开挂取胜 RETURN 0');
  assert.equal(fixture.store.get('exp:1:80'), 500, ':1071 EXP += 500');
  assert.equal(fixture.store.get('base:0:1'), 2500, ':1070 BASE:MASTER:1 /= 2');
  assert.equal(fixture.store.get('flag:10004'), 2999, '钱不够就不扣');
  assert.deepEqual(
    fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    ['[1] 召唤魔王应战', '[2] 亲自上前处理', '[3] 无视，全军进攻'],
    ':914-916（MONEY < 3000 时不渲染道具二选一）',
  );
  assert(
    fixture.text_lines().includes('魔王回应了勇者1召唤前来迎战女骑士。'),
    ':928',
  );
  assert(
    fixture.text_lines().includes('魔王军高呼魔王万岁、继续向人间界进发。'),
    ':1067',
  );
});

test('CHALLENGE [召唤魔王应战] 的道具二选一：堂堂正正与开挂失败（:972-1060）', async () => {
  // 钱够 → 渲染 [1] 使用氪金道具 / [2] 堂堂正正一决胜负
  const honest = make_arm_world({ money: 5000 });
  const honest_state = { sinkou: 100, yusya_i: 1 };
  // [1] 召唤魔王应战 → [2] 堂堂正正 → RAND:10 = 9（>= 2 且 > 2 → 不开挂失败）
  assert.equal(
    await run_challenge(honest, [1, 2], 2, honest_state, head_rand([0, 9])),
    1,
    'LOCAL = 9 既不 < 2 也不是开挂支 → 落到不开挂失败',
  );
  assert.equal(honest.store.get('base:0:0'), 0, ':1082 BASE:MASTER:0 = 0');
  assert.equal(honest.store.get('base:0:1'), 0, ':1083 BASE:MASTER:1 = 0');
  assert(honest.text_lines().includes('魔王体力魔力清空、侵攻中止'), ':1081');
  const honest_labels = honest.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
  assert.deepEqual(honest_labels, [
    '[1] 召唤魔王应战',
    '[2] 亲自上前处理',
    '[3] 无视，全军进攻',
    '[1] 使用氪金道具',
    '[2] 堂堂正正一决胜负',
  ]);

  // 开挂失败（L_CHOICE == 1 且 LOCAL < 2）：金钱 -3000
  const failed = make_arm_world({ money: 5000 });
  const failed_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(
    await run_challenge(failed, [1, 1], 2, failed_state, head_rand([0, 1])),
    0,
    ':1060 RETURN 0',
  );
  assert.equal(failed.store.get('flag:10004'), 2000, ':1058 MONEY -= 3000');
  assert.equal(
    failed.store.get('exflag:4444'),
    2000,
    ':1059 EX_FLAG:4444 -= 3000',
  );
  assert(failed.text_lines().includes('金钱-3000。'), ':1057');
  // :1047-1053 的 PRINTFORM 与 PRINTDATAL 同显示行归并，道具行整行输出
  assert(
    failed
      .text_lines()
      .includes(
        '在试探数合之后，魔王趁女骑士不备，向女骑士扔出了高级泥沼卷轴。',
      ),
    ':1047/:1049 道具行整行输出',
  );
  assert.equal(
    failed.store.get('exflag:95'),
    0,
    '开挂失败不置位（`:1041 EX_FLAG:95 = LOCAL:20` 只在取胜支）',
  );
});

test('CHALLENGE [召唤魔王应战] 开挂取胜：新角色入队、金钱与 EX_FLAG（:1011-1043）', async () => {
  const fixture = make_arm_world({ money: 5000 });
  // 人间界的复现职业是 9（LOCAL:12 = 9；ADDCHARA 9）
  fixture.seed_chara(9, { id: 9, name: '骑士', callname: '骑士' });
  const state = { sinkou: 100, yusya_i: 1 };
  // [1] 召唤魔王应战 → [1] 使用氪金道具 → RAND:10 = 9（>= 2 → 开挂取胜）
  assert.equal(
    await run_challenge(fixture, [1, 1], 2, state, head_rand([0, 9])),
    0,
    ':1043 RETURN 0',
  );
  assert.ok(
    fixture.era.getAddedCharacters().includes(9),
    ':1033 ADDCHARA LOCAL:12（人间界 = 9）',
  );
  assert.equal(fixture.store.get('cflag:9:1'), 0, ':1037 CFLAG:A:1 = 0');
  assert.equal(fixture.store.get('flag:10004'), 2000, ':1039 MONEY -= 3000');
  assert.equal(fixture.store.get('exflag:4444'), 2000, ':1040');
  assert.equal(
    fixture.store.get('exflag:95'),
    1,
    ':1041 EX_FLAG:95 = LOCAL:20',
  );
  assert.equal(fixture.store.get('exflag:99'), 1, ':1042 EX_FLAG:99 += 1');
  assert(
    fixture
      .text_lines()
      .some((line) => line.endsWith('被魔王抓住了。金钱-3000')),
    ':1038',
  );
});

test('CHALLENGE 的人数上限七分支：LOCAL 归零把开挂降级成失败支（:996-1010）', async () => {
  const run = async (setup) => {
    const fixture = make_arm_world({ money: 5000 });
    fixture.seed_chara(9, { id: 9, name: '骑士', callname: '骑士' });
    setup(fixture);
    const state = { sinkou: 100, yusya_i: 1 };
    const ret = await run_challenge(
      fixture,
      [1, 1],
      2,
      state,
      head_rand([0, 9]),
    );
    return { ret, fixture };
  };

  // FLAG:82 == 0 && CHARANUM > 60 → LOCAL = 0
  const over60 = await run((f) => {
    for (let id = 2; id <= 62; id += 1) {
      f.seed_chara(id, { name: `勇者${id}`, callname: `勇者${id}` });
      f.era.addCharacter(id);
    }
  });
  assert.ok(
    over60.fixture.era.getAddedCharacters().length > 60,
    '前提：人数确实超过 60',
  );
  assert.equal(over60.ret, 0, 'LOCAL = 0 → 开挂取胜不成立');
  // 同一阈值下把第一支的条件（FLAG:82 == 0）打掉：人数仍超 60 但要走第七支，
  // 用来把「第一支读的是 82 而不是别的 FLAG」钉住
  const other_flags = await run((f) => {
    for (let id = 2; id <= 62; id += 1) {
      f.seed_chara(id, { name: `勇者${id}`, callname: `勇者${id}` });
      f.era.addCharacter(id);
    }
    f.store.set('flag:82', 1); // 前六支的分支条件全部失效
    f.store.set('flag:87', 1);
    f.store.set('flag:89', 1);
    f.store.set('flag:91', 1);
    f.store.set('flag:92', 15);
    f.store.set('flag:94', 1);
  });
  assert.equal(
    other_flags.fixture.store.get('exflag:95'),
    1,
    'FLAG:82 != 0 时第一支不成立（61 人未到 MAX_CHARANUM）',
  );
  assert(
    over60.fixture.text_lines().includes('金钱-3000。'),
    ':1045-1060 落到开挂失败支',
  );

  // CHARANUM >= MAX_CHARANUM（90）→ LOCAL = 0（第七分支）
  const over90 = await run((f) => {
    for (let id = 2; id <= 92; id += 1) {
      f.seed_chara(id, { name: `勇者${id}`, callname: `勇者${id}` });
      f.era.addCharacter(id);
    }
    f.store.set('flag:82', 1); // 前六支的分支条件失效
    f.store.set('flag:87', 1);
    f.store.set('flag:89', 1);
    f.store.set('flag:91', 1);
    f.store.set('flag:92', 15);
  });
  assert.ok(
    over90.fixture.era.getAddedCharacters().length >= 90,
    '前提：人数确实达到 MAX_CHARANUM',
  );
  assert.equal(over90.ret, 0, '人数 >= MAX_CHARANUM（90）→ LOCAL = 0');
  assert(over90.fixture.text_lines().includes('金钱-3000。'));
});

test('CHALLENGE [亲自上前处理]：20/40/40 三档（:1087-1135）', async () => {
  const run = async (roll, setups = [], inv_type = 2, inputs = [2]) => {
    const fixture = make_arm_world();
    for (const setup of setups) {
      setup(fixture);
    }
    const state = { sinkou: 100, yusya_i: 1 };
    // 键入 [2] 亲自上前处理；随后是 :1088 的 RAND:10（首枚是 :893 的 DATALIST）
    const ret = await run_challenge(
      fixture,
      inputs,
      inv_type,
      state,
      seq([0, roll]),
    );
    return { ret, fixture };
  };

  const win = await run(0);
  assert.equal(win.ret, 0, ':1104 RETURN 0');
  assert.equal(win.fixture.store.get('exp:1:80'), 500, ':1102 EXP += 500');
  assert.equal(win.fixture.store.get('base:1:0'), 2500, ':1103 /= 2');
  assert(win.fixture.text_lines().includes('勇者1经验+500，体力-50%'), ':1101');
  assert(
    win.fixture.text_lines().includes('魔王军高万岁，继续向人间界进发。'),
    ':1096（INV_TYPE == 2 的措辞）',
  );
  assert.deepEqual(
    win.fixture.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    ['[1] 召唤魔王应战', '[2] 亲自上前处理', '[3] 无视，全军进攻'],
    '亲自上前处理不需要二次输入',
  );

  const draw = await run(2);
  assert.equal(draw.ret, 0, ':1119 RETURN 0');
  assert.equal(draw.fixture.store.get('base:1:0'), 500, ':1118 /= 10');
  assert(draw.fixture.text_lines().includes('勇者1体力-90%'), ':1117');

  const lose = await run(6);
  assert.equal(lose.ret, 1, ':1134 RETURN 1');
  assert(
    lose.fixture.text_lines().includes('失去指挥官的魔王军只好撤退了。'),
    ':1126（INV_TYPE == 2 的措辞）',
  );
  assert.equal(
    lose.fixture.store.get('cflag:1:1'),
    undefined,
    'INV_TYPE == 2 的失败支不写 CFLAG（那两条在 ELSEIF 之下）',
  );

  // :1127-1133 的两条收尾只对 INV_TYPE != 2 开（[3] 路线；该路线无选项、固定 L_CHOICE = 2）
  const loot_escaped = await run(
    6,
    [(f) => f.store.set('flag:5', 128), (f) => f.store.set('flag:82', 1)],
    3,
    [],
  );
  assert.equal(loot_escaped.ret, 1, ':1134 RETURN 1');
  assert.equal(
    loot_escaped.fixture.store.get('cflag:1:1'),
    0,
    ':1132 `(FLAG:5 & 128) && !FLAG:SINDO`——已征服（FLAG:82 != 0）时走逃回支',
  );
  assert(
    loot_escaped.fixture
      .text_lines()
      .includes('不知道过了多久后才苏醒过来的勇者1原路返回了。'),
    ':1131',
  );

  const loot_captured = await run(
    6,
    [(f) => f.store.set('flag:5', 128), (f) => f.store.set('flag:82', 0)],
    3,
    [],
  );
  assert.equal(
    loot_captured.fixture.store.get('cflag:1:1'),
    9,
    ':1129 未征服 + 位 7 开 → 成为狂王的俘虏',
  );
  assert(
    loot_captured.fixture
      .text_lines()
      .includes('晕过去的勇者1成为了狂王的俘虏。'),
    ':1128',
  );
});

test('CHALLENGE [无视，全军进攻]：RAND:2 两档（:1137-1159）', async () => {
  const run = async (roll, inv_type = 2, inputs = [3]) => {
    const fixture = make_arm_world();
    const state = { sinkou: 100, yusya_i: 1 };
    // 首枚是 :893 的 DATALIST（RAND:4），随后才是 :1138 的 RAND:2
    const ret = await run_challenge(
      fixture,
      inputs,
      inv_type,
      state,
      seq([0, roll]),
    );
    return { ret, state, fixture };
  };

  const retreat = await run(1);
  assert.equal(retreat.ret, 1, ':1147 RETURN 1');
  assert.equal(retreat.state.sinkou, 100, '撤退不改写 SINKOU');
  assert(
    retreat.fixture.text_lines().includes('魔王军元气大伤只好撤退了。'),
    ':1144',
  );
  assert(retreat.fixture.text_lines().includes('侵攻中止。'), ':1146');

  const press = await run(0);
  assert.equal(press.ret, 0, ':1158 RETURN 0');
  assert.equal(press.state.sinkou, 80, ':1157 SINKOU * 4 / 5');
  assert(press.fixture.text_lines().includes('魔物数量-20%。'), ':1156');
});

test('CHALLENGE 三选项各自的旁白与 INV_TYPE == 0 的固定 [3]（:890-969 + :1137）', async () => {
  const summon = make_arm_world({ money: 0 });
  await run_challenge(
    summon,
    [1],
    2,
    { sinkou: 100, yusya_i: 1 },
    head_rand([0, 0]),
  );
  assert(
    summon.text_lines().includes('魔王回应了勇者1召唤前来迎战女骑士。'),
    ':928 [1] 召唤魔王应战',
  );

  const myself = make_arm_world({ money: 0 });
  await run_challenge(myself, [2], 2, { sinkou: 100, yusya_i: 1 }, seq([0, 0]));
  assert(
    myself.text_lines().includes('勇者1决定亲自迎战女骑士。'),
    ':930 [2] 亲自上前处理',
  );

  const ignore = make_arm_world({ money: 0 });
  await run_challenge(ignore, [3], 2, { sinkou: 100, yusya_i: 1 }, seq([0, 1]));
  assert(
    ignore
      .text_lines()
      .includes('在勇者1一声令下，魔王军缓缓前进，展开了对女骑士战斗。'),
    ':932 [3] 无视，全军进攻',
  );

  // INV_TYPE == 0：不输入、L_CHOICE = 3 固定
  const monster = make_arm_world({ money: 0 });
  const monster_state = { sinkou: 100, yusya_i: 0 };
  assert.equal(
    await run_challenge(monster, [], 0, monster_state, seq([0, 1])),
    1,
    ':1147 固定走 [3] 的撤退档',
  );
  assert.deepEqual(
    monster.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    [],
    'INV_TYPE == 0 无选项按钮',
  );
  assert(
    monster
      .text_lines()
      .includes(
        '在意识到敌人只有一个人后，魔王军向敢于挑衅的女骑士发起了猛烈的进攻。',
      ),
    ':968',
  );

  // INV_TYPE == 3：WAIT 后固定 L_CHOICE = 2（无输入）
  const raid = make_arm_world({ money: 0 });
  assert.equal(
    await run_challenge(raid, [], 3, { sinkou: 100, yusya_i: 1 }, seq([0, 6])),
    1,
    ':1134 [3] 掠夺固定落 [2] 亲自处理，LOCAL = 6 → 失败支',
  );
  assert.deepEqual(
    raid.lines_history
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    [],
    ':953 WAIT 之后直接 L_CHOICE = 2，不渲染选项',
  );
  assert(
    raid.text_lines().includes('不知道过了多久后才苏醒过来的勇者1原路返回了。'),
    ':1131（INV_TYPE != 2 且位 7 关）',
  );
});

test('CHALLENGE 的 PRINTDATA 抽取：INV_TYPE 2/3 选 DATALIST、INV_TYPE 0 选 DATA（:893-964）', async () => {
  // INV_TYPE == 2：四组 DATALIST，RAND:4 命中第 3 组
  const brute = make_arm_world({ money: 0 });
  const brute_rand = head_rand([2]);
  await run_challenge(brute, [1], 2, { sinkou: 100, yusya_i: 1 }, brute_rand);
  assert.equal(brute_rand.uppers[0], 4, ':893 四组 DATALIST → RAND:4');
  assert(
    brute
      .text_lines()
      .includes(
        '『这就是魔王军啊，与其说是军队倒不如说是哪里冒出来的犯罪团伙呢~』',
      ),
    ':903 第 3 组的第一行',
  );
  assert(
    brute
      .text_lines()
      .includes('『快去叫你们的魔王出来，就说有人来取他的性命了』'),
    ':904 同一组的第二行',
  );

  // INV_TYPE == 3：四组 DATALIST（首组两行），RAND:4 命中第 0 组
  const raid = make_arm_world({ money: 0 });
  const raid_rand = head_rand([0]);
  await run_challenge(raid, [], 3, { sinkou: 100, yusya_i: 1 }, raid_rand);
  assert.equal(raid_rand.uppers[0], 4, ':936 四组 DATALIST → RAND:4');
  assert(raid.text_lines().includes('『哎呀~是亲爱魔王大人的手下呢』'), ':938');
  assert(
    raid
      .text_lines()
      .includes('『既然魔王大人不肯出来，人家只好和你比试比试了呢』'),
    ':939',
  );

  // INV_TYPE == 0：四条 DATA 里抽一条，RAND:4 命中第 1 条
  const monster = make_arm_world({ money: 0 });
  const monster_rand = head_rand([1]);
  await run_challenge(
    monster,
    [],
    0,
    { sinkou: 100, yusya_i: 0 },
    monster_rand,
  );
  assert.equal(monster_rand.uppers[0], 4, ':959 四条 DATA → RAND:4');
  assert(
    monster
      .text_lines()
      .includes('『今天运气真是不错哦~可悲的魔族，你们的脑袋是我的了！』'),
    ':961',
  );
});

test('CHALLENGE 的四个地区名表（:828-887）：AREA 决定称呼表与复现职业', async () => {
  const cases = [
    { area: 81, foe: '女骑士', spot: '一座河边的桥', place: '人间界' },
    { area: 86, foe: '月之祭司', spot: '一条密林中的狭道', place: '精灵森林' },
    { area: 88, foe: '龙族巫女', spot: '一座山谷间的吊桥', place: '龙之山脉' },
    { area: 90, foe: '女武神', spot: '一座天界的虹桥', place: '天界' },
    { area: 93, foe: '十字军', spot: '一座天界的虹桥', place: '天神宫' },
  ];
  for (const item of cases) {
    const fixture = make_arm_world({ money: 0 });
    for (const [job, name] of [
      [1, '勇士'],
      [5, '女战士'],
      [9, '骑士'],
      [10, '龙骑士'],
      [12, '弓手'],
      [14, '巫女'],
      [16, '精灵弓手'],
    ]) {
      fixture.seed_chara(job, { id: job, name, callname: name });
    }
    // 抽取顺序：AREA 86+ 先掷职业 RAND:2，随后是 DATALIST 的 RAND:4、:994 的 RAND:10
    const rand = head_rand([0, 0, 0]);
    const { invasion_event_challenge } =
      fixture.load_module('page/page-invasion');
    fixture.set_inputs(1); // [1] 召唤魔王应战
    await invasion_event_challenge(
      item.area,
      82,
      2,
      { sinkou: 100, yusya_i: 1 },
      rand,
    );
    assert(
      fixture
        .text_lines()
        .includes(`原来是一名${item.foe}在大军的前方挡住了道路。`),
      `AREA ${item.area} 的对手称呼`,
    );
    assert(
      fixture
        .text_lines()
        .includes(
          `魔王军浩浩荡荡地向${item.place}进发着，却在${item.spot}前停下了脚步。`,
        ),
      `AREA ${item.area} 的地点`,
    );
    if (item.area === 81) {
      assert.deepEqual(
        rand.uppers,
        [4, 10],
        'AREA 81 的职业固定为 9，不掷 RAND:2',
      );
    } else {
      assert.deepEqual(rand.uppers, [2, 4, 10], 'AREA 86+ 先掷职业');
    }
  }

  // 复现职业的取表（`LOCAL:12 = RAND:2 ? a # b`）：真值取前项、假值取后项。
  // 只有开挂取胜支会 `ADDCHARA LOCAL:12`，故用该支观察职业。
  for (const [area, when_false, when_true] of [
    [86, 16, 12],
    [88, 14, 10],
    [90, 5, 1],
  ]) {
    for (const [roll, expected] of [
      [0, when_false],
      [1, when_true],
    ]) {
      const fixture = make_arm_world({ money: 5000 });
      for (const id of [1, 5, 9, 10, 12, 14, 16]) {
        fixture.seed_chara(id, {
          id,
          name: `角色${id}`,
          callname: `角色${id}`,
        });
      }
      const { invasion_event_challenge } =
        fixture.load_module('page/page-invasion');
      fixture.set_inputs(1, 1); // [1] 召唤魔王应战 → [1] 使用氪金道具
      await invasion_event_challenge(
        area,
        82,
        2,
        { sinkou: 100, yusya_i: 1 },
        head_rand([roll, 0, 9]),
      );
      assert.deepEqual(
        fixture.calls
          .filter((call) => call.api === 'addCharacter')
          .map((call) => call.args[0]),
        [expected],
        `AREA ${area}：RAND:2 = ${roll} → ADDCHARA ${expected}`,
      );
    }
  }
});

// ---------------------------------------------------------------------------
// #504 的第二批覆盖：先制攻撃的三档、[2] 已征服来路、9% 抓捕、
// FORT 惨败/潜入分界、CHALLENGE 的档界与人数上限边界。
// ---------------------------------------------------------------------------

test('@INVASION_EVENT_SEIEI 先制攻撃：会心/普通/忍术三档与伤害套算（:360-389）', async () => {
  const run = async (roll5, { talent251 = 0 } = {}) => {
    const fixture = create_era_fixture();
    fixture.store.set('flag:81', 5000);
    fixture.store.set('flag:82', 0);
    fixture.store.set('callname:1:-1', '勇者1');
    fixture.store.set('callname:1:-2', '勇者1');
    fixture.store.set('base:1:0', 20000);
    fixture.store.set('maxbase:1:0', 20000);
    fixture.store.set('base:1:1', 20000);
    fixture.store.set('maxbase:1:1', 20000);
    fixture.store.set('cflag:1:11', 1000); // 攻击 1000：守卫（×2 档）必成立
    fixture.store.set('cflag:1:12', 100);
    fixture.store.set('base:0:0', 10000);
    fixture.store.set('base:0:1', 10000);
    seed_seiei(fixture, 18);
    seed_seiei(fixture, 19);
    // 精锐体力归零：一击必杀，避免进入第二轮（本用例只量第一轮的算式）
    fixture.store.set('base:18:0', 0);
    fixture.store.set('talent:18:251', talent251);
    const state = { sinkou: 2048, yusya_i: 1 };
    const { invasion_event_seiei } = fixture.load_module('page/page-invasion');
    // RAND:5000 = 2001 → 出敌；RAND:2 = 0 → 防御型 18；RAND:5 = roll5
    assert.equal(
      await invasion_event_seiei(81, 82, 2, state, seq([2001, 0, roll5])),
      0,
    );
    return fixture;
  };

  // strike = 1000 * (2048/1024+1) = 3000；守 200 → 伤害 2800
  const crit = await run(0);
  assert.equal(crit.store.get('cflag:18:12'), 100, ':364 精锐防御减半');
  assert.equal(
    crit.store.get('cflag:18:11'),
    150 - 28,
    ':368 攻击 -= 2800/100',
  );
  assert.equal(crit.store.get('base:18:0'), 0 - 11200, ':371 体力 -= 2800×4');
  assert.equal(crit.store.get('base:18:1'), 9000 - 11200, ':372 气力同减');
  assert(crit.text_lines().includes('迅猛的一击！'), ':365');
  assert(
    crit
      .text_lines()
      .includes('勇者1率领魔王军的攻击使精锐部队受到了11200点伤害！'),
    ':366 会心档 ×4',
  );

  const normal = await run(1);
  assert.equal(
    normal.store.get('cflag:18:11'),
    150 - 28,
    ':379 攻击同样按 /100 削',
  );
  assert.equal(normal.store.get('base:18:0'), 0 - 5600, ':382 普通档 ×2');
  assert(
    normal
      .text_lines()
      .includes('勇者1率领魔王军的攻击使精锐部队受到了5600点伤害！'),
    ':377',
  );
  assert(
    !normal.text_lines().includes('迅猛的一击！'),
    ':374 普通档不打会心文案',
  );

  const ninja = await run(0, { talent251: 1 });
  assert.equal(
    ninja.store.get('cflag:18:11'),
    150,
    ':367 忍术持有者不吃攻击削弱',
  );
  assert.equal(ninja.store.get('base:18:0'), 0 - 11200, '体力照扣');
});

test('[2] 已征服的人间界（经征服后菜单的 [0]）：强制征收 ×5 与经验 /2（:803-809）', async () => {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  fixture.store.set('base:0:0', 10000);
  fixture.store.set('item:100', 600);
  fixture.store.set('flag:10004', 0);
  fixture.store.set('exflag:4444', 0);
  seed_brute_hero(fixture, 1);
  assert.equal(
    await run_post_conquest(fixture, [0, 2, 1], knob({ 100: 99 })),
    1,
  );
  // 与未征服用例同一条算式：SINKOU 12
  assert.equal(fixture.store.get('flag:10004'), 60, ':806 MONEY += SINKOU×5');
  assert.equal(fixture.store.get('exflag:4444'), 60, ':807');
  assert.equal(fixture.store.get('exp:1:80'), 6, ':808 EXP += SINKOU/2');
  assert(
    history_texts(fixture).includes('强制征收了60点！'),
    ':805 PRINTFORMW',
  );
  assert(history_texts(fixture).includes('勇者1获得了6点经验值！'), ':809');
});

test('[2] 结果段的 9% 抓捕：命中调 GET_ENEMY 并 EX_FLAG:99 +1（:882-888）', async () => {
  const run = async (roll100) => {
    const fixture = create_era_fixture();
    make_world(fixture); // 威望 70
    fixture.store.set('base:0:0', 10000);
    fixture.store.set('item:100', 600);
    seed_brute_hero(fixture, 1);
    // 人数超过 60 → GET_ENEMY 在人数上限分支直接早退 0（不掷骰、不建角色）
    for (let id = 2; id <= 62; id += 1) {
      fixture.seed_chara(id, { name: `勇者${id}`, callname: `勇者${id}` });
      fixture.era.addCharacter(id);
    }
    await run_invasion(fixture, [2, 1], knob({ 100: roll100 }));
    return fixture;
  };

  const hit = await run(7);
  assert(
    hit.text_lines().includes('好像抓到了负隅顽抗的勇者…………'),
    ':883 RAND:100 = 7 < 9',
  );
  assert(
    hit.text_lines().includes('犒赏士兵，捕获到的勇者被赏赐给部下了。'),
    ':887 GET_ENEMY 返回 0 → 犒赏行',
  );
  assert.equal(
    hit.store.get('exflag:99'),
    70 + 1 + 2,
    ':885 EX_FLAG:99 += 1（结算尾另有 :978 的 +2）',
  );

  const miss = await run(9);
  assert(
    !miss.text_lines().includes('好像抓到了负隅顽抗的勇者…………'),
    'RAND:100 = 9 不命中（上界是 9 不是 5）',
  );
  assert.equal(miss.store.get('exflag:99'), 70 + 2, '不命中就没有 +1');
});

test('FORT 惨败支的体力剩量与潜入档界（:662/:694）', async () => {
  // 惨败（RAND:10 < 2）且 INV_TYPE == 2：`BASE:YUSYA_I:0 = BASE*3/10`
  const lost = make_arm_world();
  const lost_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(await run_fort(lost, [1], 2, lost_state, seq([1])), 1, ':669');
  assert.equal(lost.store.get('base:1:0'), 1500, ':662 体力剩三成');

  // 潜入的成功/失败分界是 `LOCAL >= 5 || LOCAL:3`：LOCAL == 4 且种族不符 → 失败逃窜
  const fled = make_arm_world();
  fled.store.set('talent:1:314', 9); // 非人类 → LOCAL:3 假
  const fled_state = { sinkou: 100, yusya_i: 1 };
  assert.equal(await run_fort(fled, [2], 2, fled_state, seq([4])), 0, ':724');
  assert.equal(fled.store.get('base:1:0'), 1, ':718 LOCAL == 4 落在失败档');
  assert.equal(fled_state.sinkou, 70, ':721');
});

test('CHALLENGE 的档界与人数上限边界（:996/:1012/:1106）', async () => {
  const open = async (setups, rand, inputs = [1, 1]) => {
    const fixture = make_arm_world({ money: 5000 });
    for (const id of [1, 9]) {
      fixture.seed_chara(id, { id, name: `角色${id}`, callname: `角色${id}` });
    }
    for (const setup of setups) {
      setup(fixture);
    }
    const state = { sinkou: 100, yusya_i: 1 };
    const ret = await run_challenge(fixture, inputs, 2, state, rand);
    return { ret, fixture };
  };

  // 开挂取胜的档界是 LOCAL >= 2：LOCAL == 2 仍取胜
  const edge = await open([], head_rand([0, 2]));
  assert.equal(edge.ret, 0, ':1043');
  assert.equal(
    edge.fixture.store.get('exflag:95'),
    1,
    ':1041 LOCAL == 2 仍置位',
  );

  // 不分胜负档的档界是 LOCAL < 6：LOCAL == 5 仍不分胜负
  const draw = await open([], seq([0, 5]), [2]);
  assert.equal(draw.ret, 0, ':1119');
  assert.equal(
    draw.fixture.store.get('base:1:0'),
    500,
    ':1118 LOCAL == 5 落此档',
  );

  // 人数上限的第一支是 `CHARANUM > 60`：正好 60 人不触发
  const exact60 = await open(
    [
      (f) => {
        for (let id = 1; id <= 60; id += 1) {
          f.seed_chara(id, { id, name: `角色${id}`, callname: `角色${id}` });
          f.era.addCharacter(id);
        }
      },
    ],
    head_rand([0, 9]),
  );
  assert.equal(
    exact60.fixture.era.getAddedCharacters().length,
    60,
    '前提：正好 60 人',
  );
  assert.equal(
    exact60.fixture.store.get('exflag:95'),
    1,
    '60 人不触发上限分支',
  );

  const over60 = await open(
    [
      (f) => {
        for (let id = 1; id <= 61; id += 1) {
          f.seed_chara(id, { id, name: `角色${id}`, callname: `角色${id}` });
          f.era.addCharacter(id);
        }
      },
    ],
    head_rand([0, 9]),
  );
  assert.equal(
    over60.fixture.store.get('exflag:95'),
    0,
    '61 人触发 → LOCAL = 0',
  );
  assert(
    over60.fixture.text_lines().includes('金钱-3000。'),
    '降级成开挂失败支',
  );
});

// ————————————————————————————————————————————————————————————————
// #505：地区续接（post_conquest_menu 的 [1]/[2]/[3]/[5]）与
//       start_campaign() 的地区泛化
// ————————————————————————————————————————————————————————————————

/** @KYOTEN_EVENT 三臂的星号横幅（INVASION_EVENT.ERB:110 等十处，91 个星号） */
const KYOTEN_STAR = '*'.repeat(91);

/**
 * 三个走 FLAG 侧的非人间界出兵目标（INVASION.ERB:108-138 的 RESULT →
 * AREA/SINDO），连同各处按 AREA 分派所需的派生值。测试侧独立抄自原作，
 * 不复用实现里的地区表：
 *   - `name`：结果段里的地区名（:762/:765/:768/:771/:773 与 :895/:898/…）
 *   - `campaign_label`：出兵菜单（$START1）的进度条标签（:156/:159/:162）
 *   - `result_label`：结果段的进度条标签（:657/:659/… 与 :745/:747/…）
 *   - `ravish`：@INVASION_RYOUZYOKU 的地区号（:674/:677/:680/:683）
 *   - `ravish_mark`：该地区号下 @ORC_INV 的战场称呼之一（invasion-ravish.js
 *     的 `{2: [精灵少女, 精灵猎手, 精灵少女], 3: [看板娘, 龙族女战士, …], …}`
 *     的第二项），用来把「传给凌辱演出的地区号」变成可断言的输出
 *   - `kyoten`：@KYOTEN_EVENT 的实参（:987/:990/:993）
 */
const REGION_CASES = [
  {
    result: 1,
    area: 86,
    sindo: 87,
    name: '精灵族的领域',
    campaign_label: '精灵族领域的侵攻度',
    result_label: '精灵族的领域　侵攻度',
    ravish: 2,
    ravish_mark: '精灵猎手',
    kyoten: 2,
  },
  {
    result: 2,
    area: 88,
    sindo: 89,
    name: '龙之山脉',
    campaign_label: '龙之山脉的侵攻度',
    result_label: '龙之山脉　侵攻度',
    ravish: 3,
    ravish_mark: '龙族女战士',
    kyoten: 3,
  },
  {
    result: 3,
    area: 90,
    sindo: 91,
    name: '天界',
    campaign_label: '天界的侵攻度',
    result_label: '天界　侵攻度',
    ravish: 4,
    ravish_mark: '破邪天使',
    kyoten: 4,
  },
];

/**
 * 天神宫（[5]）单独一组：AREA=101/SINDO=102，侵攻度的**读点**在 EX_FLAG
 * （:165 的 EX_FLAG:AREA、:752-755 的 `AREA <= 100 ? FLAG : EX_FLAG`），
 * 累加点却在 FLAG:AREA（:611-618）——原作错位，#102 查明、1:1 保留。
 * `campaign_label`/`result_label` 用于 [1] 结果段（读 EX_FLAG）；[0]/[2]/[3]
 * 三处结果段只写 `BAR FLAG:AREA`（:664/:860/:970），读的是 FLAG 侧。
 */
const SHRINE_REGION = {
  result: 5,
  area: 101,
  sindo: 102,
  name: '天神宫',
  campaign_label: '天神宫的侵攻度',
  result_label: '天神宫　侵攻度',
  ravish: 5,
  ravish_mark: '十字军队长',
  kyoten: null,
};

/**
 * progress 格的（标签, 数值列）对。**不能只断言数值出现过**——同一画面里
 * 其它地区条或征服后菜单的状态行也会打印同样的值（#505 变异自证实测：
 * M10853 把天神宫的读点改回 FLAG 侧后，` 7000/10000` 仍被 post_conquest_menu
 * 的状态行 satisfies 掉，断言假绿）。
 */
function progress_cells(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'progress')
    .map((line) => ({ label: line.text, value: line.out }));
}

/** 人间界已陷落的征服后世界；可选地把目标地区预置到指定状态 */
function make_conquest_world(region, { invasion = 0, conquered = 0 } = {}) {
  const fixture = create_era_fixture();
  make_world(fixture, { fallen: 1 });
  fixture.store.set(`flag:${region.area}`, invasion);
  fixture.store.set(`flag:${region.sindo}`, conquered);
  return fixture;
}

test('【地区续接】[1]/[2]/[3] 各映射到自己的 AREA/SINDO 并汇入同一结算体（INVASION.ERB:108-138）', async () => {
  for (const region of REGION_CASES) {
    const fixture = make_conquest_world(region, { invasion: 1900 });
    assert.equal(
      await run_post_conquest(fixture, [region.result, 1]),
      1,
      `[${region.result}] 魔力出兵走完 → 返回 1（回合已耗）`,
    );

    assert.equal(
      fixture.store.get(`flag:${region.area}`),
      2300,
      `[${region.result}] 1900 + 400：累加进 FLAG:${region.area}（:614 FLAG:AREA += SINKOU）`,
    );
    assert.equal(fixture.store.get('exflag:99'), 72, ':978 EX_FLAG:99 += 2');
    assert.equal(
      fixture.store.get('exp:0:80'),
      200,
      ':715 EXP:0:80 += SINKOU / 2',
    );
    assert.equal(
      fixture.store.get('flag:81'),
      0,
      `[${region.result}] 不再写人间界的 FLAG:81`,
    );

    const labels = progress_texts(fixture);
    assert(
      labels.includes(region.campaign_label),
      `[${region.result}] 出兵菜单的进度条标签（:156/:159/:162 的按 AREA 分派）`,
    );
    assert(
      labels.includes(region.result_label),
      `[${region.result}] 结果段的进度条标签`,
    );
    assert(
      progress_cells(fixture).some(
        (cell) =>
          cell.label === region.result_label && cell.value === ' 2300/10000',
      ),
      `[${region.result}] 结果段的进度条读本地区的侵攻度`,
    );

    // 结算尾的 @KYOTEN_EVENT 实参按 AREA 分派（:983-994）：本地区跨过首档
    // 2000 → 一行星号；实参传错会去读别的地区的 FLAG（恒 0）→ 一行都不打
    assert.equal(
      history_texts(fixture).filter((line) => line === KYOTEN_STAR).length,
      1,
      `[${region.result}] KYOTEN_EVENT 走 ARG ${region.kyoten} 臂：星号恰好一行`,
    );
    for (const [flag, who] of [
      [93, '人间界的 FLAG:93'],
      [94, '精灵的 FLAG:94'],
      [95, '龙的 FLAG:95'],
      [96, '天界的 FLAG:96'],
    ]) {
      assert.equal(
        fixture.store.get(`flag:${flag}`),
        undefined,
        `[${region.result}] KYOTEN_EVENT 三臂不推进状态字（${who} 不变）`,
      );
    }
  }
});

test('【地区续接·天神宫】[5]：累加写 FLAG:101、显示读 EX_FLAG:101 的原作错位（1:1 保留）', async () => {
  const fixture = make_conquest_world(SHRINE_REGION);
  fixture.store.set('exflag:101', 7000); // 天神宫侵攻度（显示侧）
  fixture.store.set('exflag:2810', 510); // route_33 开放区间内，[5] 不被拒收
  fixture.store.set('exflag:102', 3); // shrine_stage >= 3 → 派发前无条件 +=1
  // 人间界侵攻度预置到首档之上：若结算尾误调 KYOTEN_EVENT(1)（原作没有 101
  // 臂，天神宫本就不该调），人间界臂会打横幅——本用例末尾的「一行星号都不打」
  // 因此能真正鉴别实参表（M10862 的靶）
  fixture.store.set('flag:81', 2000);
  assert.equal(await run_post_conquest(fixture, [5, 1]), 1);

  assert.equal(
    fixture.store.get('flag:101'),
    400,
    ':611-614 的 FLAG:AREA 对 AREA=101 就是 FLAG:101（与 K1 口上存在标志同槽，原作缺陷）',
  );
  assert.equal(
    fixture.store.get('exflag:101'),
    7000,
    'EX_FLAG:101 全程不被写（原作只读它显示）',
  );
  assert.equal(
    fixture.store.get('exflag:102'),
    4,
    ':136-137 shrine_stage += 1',
  );

  const labels = progress_texts(fixture);
  assert(labels.includes('天神宫的侵攻度'), ':165 出兵菜单读 EX_FLAG:AREA');
  assert(
    labels.includes('天神宫　侵攻度'),
    ':743/:751 结果段也读 EX_FLAG（[1] 路线正确的那一处）',
  );
  const cells = progress_cells(fixture);
  assert(
    cells.some(
      (cell) => cell.label === '天神宫的侵攻度' && cell.value === ' 7000/10000',
    ),
    '出兵菜单的进度条读 EX_FLAG:101 = 7000（不是 FLAG:101 的 400）',
  );
  assert(
    cells.some(
      (cell) => cell.label === '天神宫　侵攻度' && cell.value === ' 7000/10000',
    ),
    '结果段的进度条也读 EX_FLAG:101（同一画面里 FLAG:101 是 400）',
  );
  assert.equal(
    history_texts(fixture).filter((line) => line === KYOTEN_STAR).length,
    0,
    ':983-994 的 KYOTEN_EVENT 分派没有 101 臂 —— 天神宫一行星号都不打',
  );
});

test('【地区续接·已征服臂】[0] 的强制征收只列 81/86/88/90，天神宫落到 ELSE（:624-651 的原作缺陷）', async () => {
  for (const region of [...REGION_CASES, SHRINE_REGION]) {
    const fixture = make_conquest_world(region, { conquered: 1 });
    if (region.result === 5) {
      fixture.store.set('exflag:2810', 510); // [5] 需 route_33 开放区间
    }
    fixture.store.set('item:100', 600); // 过 600 门槛，SINKOU = 17（同 [0] 主用例）
    assert.equal(
      await run_invasion(fixture, [region.result, 0], knob({ 100: 99 })),
      1,
    );

    const texts = history_texts(fixture);
    const conquered_arm = region.area !== 101;
    assert.equal(
      texts.includes('强制征收了170点！'),
      conquered_arm,
      `[${region.result}] ${conquered_arm ? '走已征服臂（强制征收 ×10）' : '落 ELSE 臂（战利品 ×10，原作漏列 101）'}`,
    );
    assert.equal(
      texts.includes('得到了170点的战利品！'),
      !conquered_arm,
      `[${region.result}] 两臂互补`,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      170,
      `[${region.result}] 两臂的入账金额相同（:627-628 / :649-650）`,
    );
    assert(
      progress_cells(fixture).some(
        (cell) =>
          cell.label === region.result_label && cell.value === ' 17/10000',
      ),
      `[${region.result}] [0] 结果段的进度条一律读 FLAG:AREA（:664），天神宫因此读 FLAG:101`,
    );
  }
});

test('【地区续接】结果段的地区名随 AREA 切换：[2] 到达 / [3] 掠夺（:761-774 / :894-907）', async () => {
  const brute = make_conquest_world(REGION_CASES[0]); // 精灵族的领域
  brute.store.set('base:0:0', 10000);
  brute.store.set('item:100', 600);
  seed_brute_hero(brute, 1);
  assert.equal(await run_invasion(brute, [1, 2, 1], knob({ 100: 99 })), 1);
  assert(
    history_texts(brute).includes(
      '勇者1带着怪物到达了精灵族的领域，尽可能地施暴着。（善良值:-50）',
    ),
    '[2] 的三段 PRINT 并入同一显示行，地区名取 AREA=86',
  );

  for (const region of [
    REGION_CASES[1], // 龙之山脉
    REGION_CASES[2], // 天界（[2] 那条路走不到这里，天界的 name 只在这条路上出现）
    SHRINE_REGION,
  ]) {
    const raid = make_conquest_world(region);
    if (region.result === 5) {
      raid.store.set('exflag:2810', 510);
    }
    seed_raidable(raid, [1]);
    assert.equal(await run_invasion(raid, [region.result, 3, 1], knob()), 1);
    assert(
      history_texts(raid).includes(
        `勇者1得到了魔王的力量！${region.name}被掠夺了。（善恶值:-5）`,
      ),
      `[${region.result}] [3] 的地区名取 AREA=${region.area}`,
    );
  }
});

test('【地区续接】凌辱演出的地区号按 AREA 分派（:669-684 / :866-880）', async () => {
  // 兽人（110）的凌辱类型是 1 → 三列都走 @ORC_INV；knob 把 X 定到 110。
  // 三条结果段各有自己的调用点：[0] 在 :669-684、[2] 在 :866-880，两处的
  // 地区号都必须来自 CAMPAIGN_REGIONS（写死 1 时下面两条断言各自变红）
  const ravish_knob = knob({ 9: 0, 5: 0, 4: 0, 100: 99 });
  for (const region of [...REGION_CASES, SHRINE_REGION]) {
    const fixture = make_conquest_world(region);
    if (region.result === 5) {
      fixture.store.set('exflag:2810', 510);
    }
    fixture.store.set('item:110', 600);
    fixture.store.set('itemname:110', '兽人');
    assert.equal(
      await run_invasion(fixture, [region.result, 0], ravish_knob),
      1,
    );
    assert(
      history_texts(fixture).some((line) => line.includes(region.ravish_mark)),
      `[${region.result}] 传给 @INVASION_RYOUZYOKU 的地区号是 ${region.ravish}（@ORC_INV 的战场称呼）`,
    );
  }

  // [2] 勇者出兵路线的同一分派（:866-880）：跑一条地区即可鉴别写死 1
  const brute = make_conquest_world(REGION_CASES[0]); // 精灵族的领域
  brute.store.set('base:0:0', 10000);
  brute.store.set('item:110', 600);
  brute.store.set('itemname:110', '兽人');
  seed_brute_hero(brute, 1);
  assert.equal(await run_invasion(brute, [1, 2, 1], ravish_knob), 1);
  assert(
    history_texts(brute).some((line) =>
      line.includes(REGION_CASES[0].ravish_mark),
    ),
    '[2] 传给 @INVASION_RYOUZYOKU 的地区号也是 2（:866-880 那一段）',
  );
});

test('【地区续接】非人间界的 RESTART 同样透传到征服后菜单（:6 的 FLAG:82 分派）', async () => {
  const fixture = make_conquest_world(REGION_CASES[1]); // 龙之山脉
  seed_raidable(fixture, [1]);
  // [2] 龙之山脉 → [3] 掠夺 → 列表 [999] 返回（RESTART）→ 征服后菜单重画 → [999] 退出
  assert.equal(await run_invasion(fixture, [2, 3, 999, 999]), 0);
  assert.equal(
    history_texts(fixture).filter((line) =>
      line.startsWith('地面上已被你征服了'),
    ).length,
    2,
    'RESTART 的落点是征服后菜单（不是 $START1），菜单画了两次',
  );
  assert.equal(
    fixture.store.get(`flag:${REGION_CASES[1].area}`),
    0,
    'RESTART 不消耗回合、不改侵攻度',
  );
});

test('【地区续接】[1] 魔力结果段的已征服封顶：SINKOU 超 100000 时经验按 100000 计（:712-739）', async () => {
  // 已征服（FLAG:SINDO != 0）：五个地区的臂只差那一行 `MIN(SINKOU, 10000*10)`，
  // 文本与经验式相同。气力 10000000 / 25 = 400000 → 封顶后经验 50000
  const conquered = create_era_fixture();
  make_world(conquered, { fallen: 1, willpower: 10000000 });
  assert.equal(await run_post_conquest(conquered, [0, 1]), 1);
  assert.equal(
    conquered.store.get('exp:0:80'),
    50000,
    ':713 MIN(SINKOU, 100000) 之后 / 2',
  );
  assert.equal(conquered.store.get('flag:81'), 10000, ':617-618 侵攻度封顶');

  // 未征服：:736-738 的 ELSE 臂没有 MIN，经验全额。SINKOU > 10000 会让
  // 结算尾的 INVASION_CHECK 命中人间界组（FLAG:81 封顶 10000 且 FLAG:82
  // 仍为 0）——预置 ENDING_1 的菲娅与「[0] 继续」的输入，看过经验再让它演完
  const fresh = create_era_fixture();
  make_world(fresh, { willpower: 10000000 });
  fresh.seed_chara(35, { name: '菲娅', callname: '菲娅' });
  assert.equal(await run_invasion(fresh, [1, 0]), 1);
  assert.equal(fresh.store.get('exp:0:80'), 200000, 'ELSE 臂不封顶');

  // 判据读的是 region.sindo（不是写死的 FLAG:82）：换成**非人间界**的未征服
  // 地区，同样的高气力——精灵的征服标记是 FLAG:87（= 0），写死 82 会读到
  // 征服后世界恒为 1 的 FLAG:82 而误判成已征服、把经验封到 50000。
  // 这条世界正好也走通了 #505 新开出的「地区续接 → 结算尾 → ENDING_3」链：
  // SINKOU 400000 把 FLAG:86 顶到封顶 10000（FLAG:87 仍为 0）→ ENDING_3
  // 演出里的 CHAR_GIFT 收下精灵族圣女（[0]）→ FLAG:87 走 1→2
  const elf = make_conquest_world(REGION_CASES[0]);
  elf.store.set('base:0:1', 10000000);
  elf.store.set('maxbase:0:1', 10000000);
  elf.seed_chara(31, { name: '琼', callname: '琼' });
  assert.equal(await run_post_conquest(elf, [1, 1, 0]), 1);
  assert.equal(
    elf.store.get('exp:0:80'),
    200000,
    '未征服的非人间界同样走 ELSE 臂：判据读 FLAG:87（写死 FLAG:82 会误封顶）',
  );
  assert.equal(elf.store.get('flag:86'), 10000, ':617-618 侵攻度封顶');
  assert.equal(
    elf.store.get('flag:87'),
    2,
    'ENDING_3 已被触发（1）且 CHAR_GIFT 收下圣女（2）——地区续接 → INVASION_CHECK 的链是通的',
  );
  assert(
    history_texts(elf).some((line) =>
      line.includes('魔王终于征服了精灵族的领域'),
    ),
    'ENDING_3 的横幅经结算尾打出（不再是「窄路径不可达」）',
  );
});

test('【地区泛化】KYOTEN_EVENT 的 ARG 2/3/4 臂：单行星号、不推进状态字（INVASION_EVENT.ERB:106-206）', async () => {
  // 模块必须从同一份夹具加载：fixture 每建一份就 purge 一次 ere/ 的模块缓存，
  // era 的绑定是每夹具一份（test/helpers/era-fixture.js:78-83）
  const run_kyoten = (fixture, arg) => {
    const { kyoten_event } = fixture.load_module('page/page-invasion');
    return kyoten_event(arg);
  };
  const star_count = (fixture) =>
    history_texts(fixture).filter((line) => line === KYOTEN_STAR).length;

  for (const arm of [
    { arg: 2, progress: 86, stage: 94 },
    { arg: 3, progress: 88, stage: 95 },
    { arg: 4, progress: 90, stage: 96 },
  ]) {
    const fixture = create_era_fixture();
    fixture.store.set(`flag:${arm.progress}`, 2000); // 首档 :109/:143/:176 的下沿
    assert.equal(await run_kyoten(fixture, arm.arg), 0, '原作恒 RETURN 0');
    assert.equal(
      star_count(fixture),
      1,
      `ARG ${arm.arg}：档内只剩一行星号（:110 等十处）`,
    );
    assert.equal(
      fixture.store.get(`flag:${arm.stage}`),
      undefined,
      `ARG ${arm.arg}：FLAG:${arm.stage} 的推进赋值在汉化版被注释 → 状态字永远是 0`,
    );

    // 反复调用照样每次都打（「一度のみ」:5 的设计意图被残缺破坏）——原作缺陷钉住
    await run_kyoten(fixture, arm.arg);
    assert.equal(
      star_count(fixture),
      2,
      `ARG ${arm.arg}：状态字不推进 → 首档判定每次成立、星号反复刷`,
    );
  }

  // 精灵臂独有的征服守卫（:108 `IF FLAG:87 == 0`）：已征服则空转
  const elf = create_era_fixture();
  elf.store.set('flag:86', 9999);
  elf.store.set('flag:87', 1);
  await run_kyoten(elf, 2);
  assert.equal(
    star_count(elf),
    0,
    '精灵臂的 FLAG:87 == 0 守卫（龙/天界两臂没有这一层）',
  );

  // 未达首档：空转
  const calm = create_era_fixture();
  calm.store.set('flag:88', 1999);
  await run_kyoten(calm, 3);
  assert.equal(star_count(calm), 0, 'FLAG:88 == 1999 未达 2000 首档');

  // ARG 0/5 及以上：原作三条 ELSEIF 都不进，落到 :207 的 ENDIF 之外空转
  const outside = create_era_fixture();
  for (const arg of [0, 5]) {
    assert.equal(await run_kyoten(outside, arg), 0, `ARG ${arg} 空转`);
  }
  assert.equal(star_count(outside), 0, 'ARG 0/5 不打任何横幅');
});
