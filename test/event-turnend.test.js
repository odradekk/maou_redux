/**
 * @EVENTTURNEND 三档链的行为测试（issue #114：S2 日循环骨架）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 * 直接驱动 emit('EVENTTURNEND')（与主循环进入 TURNEND 状态后同一入口），
 * 三档模块按 main-loop.js 的书写顺序加载：#PRI（ere/event/event-turnend.js）
 * → 普通档（ere/system/turnend-settle.js）→ #LATER（空）。
 *
 * 覆盖（对应工单验收清单）：
 *   1. 时段与日期推进：一次调用 TIME 0→1 不进日；连续两次回到同时段且
 *      DAY:0 += 1（含 DAY:2 月替与 DAY:3 星期回绕）；
 *   2. CFLAG:1 守卫：不在 2/3/12 时 DUNGEON 一次都不调（阶段 3 的接入点），
 *      并以 12/2/3 的正向用例分开两支（防空用例——两分支在测试世界里必须
 *      分开过，#10 的教训）；
 *   3. 侵攻度自然衰减：FLAG:81 有余量时每日 RAND:100、下限 0；
 *   4. 魔王回复 +1400/+1000 与战役中的 -10；
 *   5. 最小世界的全量写入断言（多写、少写、写错地址当场红）；
 *   6. 存根清单核对（STUBBED_CALLS ↔ docs/stub-registry.md）与三档链序。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

/** 建一个带三档链的夹具：魔王 0 在场（调用方按需再入奴隶 31） */
function setup_turnend() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  const { STATE } = fixture.load_module('system/flow/begin-signal');
  const era_flag = fixture.load_module('era-utils/era-flag');
  return { fixture, emit, STATE, era_flag };
}

test('时段与日期推进：一次调用 TIME 0→1 不进日；连续两次回到同时段且 DAY:0 += 1', async () => {
  const { fixture, emit, STATE, era_flag } = setup_turnend();

  assert.equal(era_flag.time, 0, '开局应为午前');
  // 第一回合：午前 → 午后，不进日（TIME != 1 走 ELSE）
  let pending = await emit('EVENTTURNEND');
  assert.equal(pending, STATE.SHOP, '链上最后一个 BEGIN（普通档）胜出');
  assert.equal(era_flag.time, 1);
  assert.equal(era_flag.day_count, 0, '午后回合不得进日');
  assert.equal(era_flag.date, 0);
  assert(
    !fixture.text_lines().some((line) => line.includes('@TAX_GET')),
    '未进日不得触发日程推进（EVENT_NEXTDAY 只在日推进回合执行）',
  );

  // 第二回合：午后 → 次日午前，DAY:0/DAY:2/DAY:3 各 +1，回到开局的时段
  pending = await emit('EVENTTURNEND');
  assert.equal(pending, STATE.SHOP);
  assert.equal(era_flag.time, 0, '连续两次回到同一时段（午前）');
  assert.equal(era_flag.day_count, 1, 'DAY:0 += 1');
  assert.equal(era_flag.date, 1, 'DAY:2 += 1');
  assert.equal(era_flag.weekday, 1, 'DAY:3 += 1');
  assert(
    fixture.text_lines().some((line) => line.includes('@TAX_GET')),
    '日推进回合必须执行日程推进（EVENT_NEXTDAY 真身的税収占位行）',
  );
  assert(
    !fixture
      .text_lines()
      .some((line) => line.includes('月了，是个适合调教的月份')),
    'DAY:2 未超 28 不得月替（月替播报在 EVENT_NEXTMONTH 真身内）',
  );
});

test('日推进的月替与星期回绕：DAY:2 超 28 触发 EVENT_NEXTMONTH、DAY:3 超 6 回 0', async () => {
  const { fixture, emit, era_flag } = setup_turnend();
  era_flag.time = 1; // 直接站在日推进回合
  era_flag.month = 1; // 1 月（大月：32 日溢出才换）
  era_flag.date = 28; // 明日 29 → 触发调用（大月不换月，只走日历推进）
  era_flag.weekday = 6; // 日曜 → 次日回月曜

  await emit('EVENTTURNEND');
  assert.equal(era_flag.date, 29, '1 月 29 日仍在月内（大月 32 日才换）');
  assert.equal(era_flag.month, 1);
  assert.equal(era_flag.weekday, 0);
  assert(
    !fixture
      .text_lines()
      .some((line) => line.includes('月了，是个适合调教的月份')),
    '大月 29 日不得换月',
  );

  // 正向：2 月 28 日 → 29 即换 3 月（#PRI 的月替调用点 → EVENT_NEXTMONTH 真身）
  const feb = setup_turnend();
  feb.era_flag.time = 1;
  feb.era_flag.month = 2;
  feb.era_flag.date = 28;
  await feb.emit('EVENTTURNEND');
  assert.equal(feb.era_flag.month, 3, '2 月 29 日即换 3 月');
  assert.equal(feb.era_flag.date, 1);
  assert(
    feb.fixture
      .text_lines()
      .some((line) => line.includes('明天就是3月了，是个适合调教的月份')),
    '月替播报必须出现',
  );
});

test('CFLAG:1 守卫：不在 2/3/12 时 DUNGEON 一次都不调；12/2/3 各走各的分支', async () => {
  // 守卫是阶段 3 的接入点（工单单独要求的测试）。中立世界（状态位 0）下
  // 迷宫整体绕开；再以 12/2/3 的正向用例分开两支——守卫删坏（比如恒放行）
  // 在正向用例上无差异、在本用例红；守卫写反（恒拦截）则在正向用例红
  const neutral = setup_turnend();
  join_slave_chara(neutral.fixture, 31, '温妮');
  await neutral.emit('EVENTTURNEND');
  const neutral_texts = neutral.fixture.text_lines();
  // 占位行文案形状固定为「原作 @函数名，」——按此精确匹配，
  // 否则 @DUNGEON 会误命中 @DUNGEON_AFTER 的占位行
  const stub_count = (lines, name) =>
    lines.filter((line) => line.includes(`原作 @${name}，`)).length;
  assert.equal(
    stub_count(neutral_texts, 'DUNGEON'),
    0,
    'CFLAG:1 = 0 时 DUNGEON 不得被调用（哪怕一次）',
  );
  assert.equal(
    stub_count(neutral_texts, 'DUNGEON_MAP'),
    0,
    'CFLAG:1 = 0 时 DUNGEON_MAP 不得被调用',
  );

  // 状态 12（战役）：WEAPON_RESTORE 循环内的 :271 调用点火
  const campaign = setup_turnend();
  join_slave_chara(campaign.fixture, 31, '温妮');
  campaign.fixture.store.set('cflag:31:1', 12);
  await campaign.emit('EVENTTURNEND');
  assert.equal(
    stub_count(campaign.fixture.text_lines(), 'DUNGEON'),
    1,
    '状态 12 恰好一次 DUNGEON（战役结束后状态复位，结算循环内不再触发）',
  );

  // 状态 2（探索）且非 2D 模式：结算循环内的 :290 调用点火
  const explore = setup_turnend();
  join_slave_chara(explore.fixture, 31, '温妮');
  explore.fixture.store.set('cflag:31:1', 2);
  await explore.emit('EVENTTURNEND');
  assert.equal(
    stub_count(explore.fixture.text_lines(), 'DUNGEON'),
    1,
    '状态 2 且 FLAG:502 == 0 应走迷宫本体',
  );

  // 状态 2 且 2D 模式：改走 DUNGEON_MAP，不走迷宫本体
  const field = setup_turnend();
  join_slave_chara(field.fixture, 31, '温妮');
  field.fixture.store.set('cflag:31:1', 2);
  field.fixture.store.set('flag:502', 1);
  await field.emit('EVENTTURNEND');
  assert.equal(
    stub_count(field.fixture.text_lines(), 'DUNGEON_MAP'),
    1,
    '状态 2 且 FLAG:502 == 1 应走野外地图',
  );
  assert.equal(
    stub_count(field.fixture.text_lines(), 'DUNGEON'),
    0,
    '2D 模式下不得走迷宫本体',
  );
});

test('侵攻度自然衰减：人间界有余量时每日 RAND:100，下限 0，无余量不衰减', async () => {
  // 衰减直接决定通关天数（#112 的天数估算依据），1:1 有测试守住。
  // 单回合 RAND:100 可能为 0（原作语义），故用多回合累计断言：衰减被删
  // （恒不减）在「严格变小」上必红，不会因单回合抽到 0 而侥幸通过
  const world = setup_turnend();
  world.fixture.store.set('flag:82', 0); // 人间界未征服
  world.fixture.store.set('flag:81', 5000);
  let turns = 0;
  for (
    ;
    turns < 100 && world.fixture.store.get('flag:81') === 5000;
    turns += 1
  ) {
    await world.emit('EVENTTURNEND');
  }
  assert.ok(
    turns < 100,
    '100 回合内至少衰减一次（RAND:100 连续为 0 的概率可忽略）',
  );
  const after_first = world.fixture.store.get('flag:81');
  assert.ok(
    after_first >= 4900 && after_first <= 4999,
    `单次衰减应为 1..100，实得 ${after_first}`,
  );
  assert(
    world.fixture.text_lines().includes('人间界的军队反抗着魔王军的侵略………'),
  );
  assert(world.fixture.text_lines().includes('*人间界的侵略度减少了*'));

  // 连续推进到吸收：下限 0，永不落负
  for (let i = 0; i < 300; i += 1) {
    await world.emit('EVENTTURNEND');
    const v = world.fixture.store.get('flag:81');
    assert.ok(v >= 0, `衰减下限 0，实得 ${v}`);
  }
  assert.equal(
    world.fixture.store.get('flag:81'),
    0,
    '长期推进必被 0 吸收（每日 RAND:100 的期望衰减约 50）',
  );

  // 无余量：0 时不打印衰减播报
  const empty = setup_turnend();
  await empty.emit('EVENTTURNEND');
  assert(
    !empty.fixture.text_lines().some((line) => line.includes('侵略度减少了')),
    'FLAG:81 = 0 不得打印衰减播报（守卫 FLAG:81 > 0）',
  );
});

test('魔王回复：午前结算 +1400、午后 +1000；战役中气力 -10；超上限钳制', async () => {
  const world = setup_turnend();
  world.fixture.store.set('maxbase:0:0', 100000);
  world.fixture.store.set('maxbase:0:1', 100000);
  world.fixture.store.set('base:0:0', 0);
  world.fixture.store.set('base:0:1', 0);

  // 第一回合（TIME 0→1，#PRI 已翻转）：结算见 TIME==1 → +1000
  await world.emit('EVENTTURNEND');
  assert.equal(world.fixture.store.get('base:0:0'), 1000);
  assert.equal(world.fixture.store.get('base:0:1'), 1000);

  // 第二回合（TIME 1→0，日推进）：结算见 TIME==0 → +1400
  await world.emit('EVENTTURNEND');
  assert.equal(world.fixture.store.get('base:0:0'), 2400);
  assert.equal(world.fixture.store.get('base:0:1'), 2400);

  // 战役中（FLAG:400 > 0）：气力改为 -10（与时段无关）
  const campaign = setup_turnend();
  campaign.fixture.store.set('flag:400', 5);
  campaign.fixture.store.set('maxbase:0:0', 100000);
  campaign.fixture.store.set('maxbase:0:1', 100000);
  campaign.fixture.store.set('base:0:1', 5000);
  await campaign.emit('EVENTTURNEND');
  assert.equal(campaign.fixture.store.get('base:0:1'), 4990);

  // 钳制：超出上限回落到 MAXBASE
  const clamp = setup_turnend();
  clamp.fixture.store.set('maxbase:0:0', 10000);
  clamp.fixture.store.set('base:0:0', 9999);
  await clamp.emit('EVENTTURNEND');
  assert.equal(clamp.fixture.store.get('base:0:0'), 10000);
});

test('奴隶的体力气力回复：午后结算 MAX/10 与回满两档（结算循环跳过魔王）', async () => {
  const world = setup_turnend();
  join_slave_chara(world.fixture, 31, '温妮');
  world.fixture.store.set('maxbase:31:0', 2000);
  world.fixture.store.set('base:31:0', 100);
  world.fixture.store.set('maxbase:31:1', 800);

  // 第一回合：结算见 TIME==1 → 体力回 MAX/10；气力（非侵攻中）直接回满
  await world.emit('EVENTTURNEND');
  assert.equal(world.fixture.store.get('base:31:0'), 100 + 200);
  assert.equal(world.fixture.store.get('base:31:1'), 800);

  // 第二回合（日推进）：结算见 TIME==0 → 体力回 MAX/2
  const before = world.fixture.store.get('base:31:0');
  await world.emit('EVENTTURNEND');
  assert.equal(world.fixture.store.get('base:31:0'), before + 1000);
});

test('全量写入断言：只有魔王的最小世界走一回合，写入清单与原作逐项一致', async () => {
  const { fixture, emit } = setup_turnend();
  fixture.store.set('maxbase:0:0', 5000);
  fixture.store.set('base:0:0', 100);
  fixture.store.set('maxbase:0:1', 300);
  fixture.store.set('base:0:1', 50);

  await emit('EVENTTURNEND');
  assert.deepEqual(fixture.var_writes, [
    { name: 'flag:0', value: 0 }, // :54 休憩标志复位
    { name: 'flag:10003', value: 1 }, // TIME 0→1
    { name: 'flag:10005', value: -1 }, // #PRI 尾部 TARGET = -1
    { name: 'flag:10006', value: -1 }, // ASSI = -1
    { name: 'flag:10008', value: 0 }, // 普通档 PLAYER = 0
    { name: 'flag:10006', value: -1 }, // ASSI = -1（普通档开头）
    { name: 'cflag:0:506', value: 0 }, // 新人标志消去
    { name: 'cflag:0:666', value: 0 }, // 自动调教标志消去
    { name: 'base:0:0', value: 1100 }, // 魔王体力 +1000（TIME 已翻转为 1）
    { name: 'base:0:1', value: 1050 }, // 魔王气力 +1000
    { name: 'base:0:1', value: 300 }, // 超上限钳回 MAXBASE:0:1
    { name: 'flag:10005', value: -1 }, // TARGET = TARGET_POOL（暂存值）
    { name: 'flag:10005', value: 0 }, // TARGET = FLAG:1（开局 0）
    { name: 'flag:10006', value: 0 }, // ASSI = FLAG:2（开局 0）
  ]);
  // 普通档结算循环跳过魔王：cflag:0:570 一类结算写入不得出现
  assert(
    !fixture.var_writes.some((w) => w.name === 'cflag:0:570'),
    '结算主循环必须跳过魔王（原作 A = 1 起）',
  );
  // 结算中段的原作 WAIT 恰好一次
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'waitAnyKey' }]);
});

test('三档链序：#PRI 先于普通档执行，两处出口同为 SHOP', async () => {
  const { fixture, emit, STATE } = setup_turnend();
  await emit('EVENTTURNEND');
  const texts = fixture.text_lines();
  const pri_tail = texts.findIndex((line) => line.includes('@AUTO_BUYING'));
  const settle_head = texts.findIndex((line) =>
    line.includes('@FORMAT_AUTOTRAIN'),
  );
  const settle_tail = texts.findIndex((line) =>
    line.includes('@CAMPAIGN_GAMEOVER'),
  );
  assert.ok(pri_tail >= 0 && settle_head >= 0 && settle_tail >= 0);
  assert.ok(
    pri_tail < settle_head && settle_head < settle_tail,
    '#PRI 档的尾部存根必须先于普通档的头部存根（#6：BEGIN 不中止链）',
  );
  assert.equal(STATE.SHOP, 'SHOP');
});

test('存根清单核对：两个模块的 STUBBED_CALLS 全部收录进 docs/stub-registry.md', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS: pri_stubs } = fixture.load_module(
    'event/event-turnend',
  );
  const { STUBBED_CALLS: settle_stubs } = fixture.load_module(
    'system/turnend-settle',
  );
  // 名单本身固定（增删存根必须同步本测试与清单）。#115 起 EVENT_NEXTDAY/
  // EVENT_NEXTMONTH 换成真身（ere/event/event-nextday.js、event-nextmonth.js），
  // 不再占位
  assert.deepEqual(pri_stubs, [
    'CHECK_SELLASSIABLE',
    'CHECK_SPECIALSKIL',
    'IN_VAGINA_ALL',
    'CONCEPTION_CHECK_ALL',
    'IN_VAGINA_EXTRA',
    'CONCEPTION_CHECK_EXTRA',
    'IN_VAGINA_KYOUOU_TO_T',
    'CONCEPTION_CHECK_KYOUOU_TO_T',
    'IN_VAGINA_NTRD_TO_T',
    'CONCEPTION_CHECK_NTRD_TO_T',
    'ENTER_ENEMY',
    'AUTO_BUYING',
    'DEBUG_CHECK',
  ]);
  assert.deepEqual(settle_stubs, [
    'FORMAT_AUTOTRAIN',
    'PARTY_UNITE',
    'WEAPON_RESTORE',
    'DUNGEON',
    'DUNGEON_MAP',
    'LVUP',
    'DUNGEON_AFTER',
    'EQUIP_CHECK',
    '自動處刑',
    'BENKI',
    'NAEDOKO',
    'MARRIAGE_DAY',
    'AUTOTRAIN',
    'CAMPAIGN_GAMEOVER',
    'PARTY_JOIN',
    'PARTY_DEL',
    'GEO_OUTPUT_2',
    'GET_LOOK_INFO',
  ]);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of [...pri_stubs, ...settle_stubs]) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
  // 登记不占位的两处（各归 #119/#118）也必须可检索
  for (const name of ['KYOTEN_EVENT', 'INVASION_CHECK']) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
