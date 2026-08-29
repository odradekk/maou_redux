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
  // 本局关闭勇者来袭（#171/#168 裁定 4 的隔离开关）：本文件的用例测时段/
  // 日期/衰减/KYOTEN/结算，不测勇者——ENTER_ENEMY 自 #171 起为每日真调用，
  // 在本世界（1-16 号无预设）会反复给孤儿号跑生成管线，干扰既有断言；
  // 勇者来袭自身的行为在 test/enter-enemy.test.js 隔离地测
  fixture.disable_enter_enemy();
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
  // 在正向用例上无差异、在本用例红；守卫写反（恒拦截）则在正向用例红。
  // #172 起 DUNGEON 是真身（无占位行），以 DUNGEON_ROOM 存根行计数观测
  // run_dungeon 是否被调用。注意原作 :386 的 CALL DUNGEON_ROOM **不是必经**
  // （#195 勘误，此前此处写反）：它之前有行動完了早退（CFLAG:530）、魔王
  // 房间 ENDING_2 收口、撤退臂走出迷宫、迎击奴隶滞留归还等多处 return 0 /
  // break 出口，落到哪个出口由随机掷选决定——如 walk = RAND:20 + 6×RAND:10
  // 七掷全 0 时侵攻度不增，走撤退臂在迷宫外 break，DUNGEON_ROOM 行数为 0。
  // 故正向两世界注入恒 0.5 随机源钉住滞留臂（walk = 40，侵攻度 0 + 40 ∈
  // (0, 100)），:386 恰经过一次、计数恰一行；注入不挑分支，#175（H6 战斗）
  // 改 :386 之后的行为（掉血、层数推进）不影响本观测
  const neutral = setup_turnend();
  join_slave_chara(neutral.fixture, 31, '温妮');
  await neutral.emit('EVENTTURNEND');
  const neutral_texts = neutral.fixture.text_lines();
  const stub_count = (lines, name) =>
    lines.filter((line) => line.includes(`原作 @${name}，`)).length;
  assert.equal(
    stub_count(neutral_texts, 'DUNGEON_ROOM'),
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
  campaign.fixture.override_math_random(() => 0.5);
  try {
    await campaign.emit('EVENTTURNEND');
  } finally {
    campaign.fixture.restore_math_random();
  }
  assert.equal(
    stub_count(campaign.fixture.text_lines(), 'DUNGEON_ROOM'),
    1,
    '状态 12 恰好一次 DUNGEON（战役结束后状态复位，结算循环内不再触发）',
  );

  // 状态 2（探索）且非 2D 模式：结算循环内的 :290 调用点火
  const explore = setup_turnend();
  join_slave_chara(explore.fixture, 31, '温妮');
  explore.fixture.store.set('cflag:31:1', 2);
  explore.fixture.override_math_random(() => 0.5);
  try {
    await explore.emit('EVENTTURNEND');
  } finally {
    explore.fixture.restore_math_random();
  }
  assert.equal(
    stub_count(explore.fixture.text_lines(), 'DUNGEON_ROOM'),
    1,
    '状态 2 且 FLAG:502 == 0 应走迷宫本体',
  );

  // 状态 2 且 2D 模式：改走 DUNGEON_MAP 真身（#181 H12 换上），不走迷宫
  // 本体。观测点换成真身的确定性后果：HP 预置 10%（< 45%）必触发
  // 「决定返回了」播报 + CFLAG:507 = 1（DUNGEON_MAP 的 :21-28 撤退决议）；
  // 3D 的 DUNGEON_ROOM 占位行 0 计数佐证迷宫本体未被调用。恒定 0.5 随机
  // 源：unit_move 的抖动 ±0（坐标不动）、dungeon_bitch（RAND:5）与
  // equip_select（RAND:4）均不触发（floor(0.5*n) 恒 ≥ 1），退出路径确定
  const field = setup_turnend();
  join_slave_chara(field.fixture, 31, '温妮');
  field.fixture.store.set('cflag:31:1', 2);
  field.fixture.store.set('flag:502', 1);
  field.fixture.store.set('base:31:0', 100);
  field.fixture.store.set('maxbase:31:0', 1000); // HP 10% < 45% → 必撤退
  field.fixture.store.set('base:31:1', 1000);
  field.fixture.store.set('maxbase:31:1', 1000); // MP 100% → 不走第二臂
  field.fixture.override_math_random(() => 0.5);
  try {
    await field.emit('EVENTTURNEND');
  } finally {
    field.fixture.restore_math_random();
  }
  assert(
    field.fixture.text_lines().some((line) => line.includes('温妮决定返回了')),
    '状态 2 且 FLAG:502 == 1 走野外地图（DUNGEON_MAP 真身的撤退播报 :23）',
  );
  assert.equal(
    field.fixture.store.get('cflag:31:507'),
    1,
    '撤退旗立起（CFLAG:507 = 1，DUNGEON_MAP :24）',
  );
  assert.equal(
    stub_count(field.fixture.text_lines(), 'DUNGEON_ROOM'),
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

test('KYOTEN_EVENT 经日循环触发（#119 接线）：未征服衰减后推进档恰好一次', async () => {
  // FLAG:81 = 2100：衰减 RAND:100 后落 [2100, 2000]，任何取值都 >= 2000，
  // 推进档（stage 0 → 1）必命中——用例对 rand 的任何取值确定
  const world = setup_turnend();
  world.fixture.store.set('flag:82', 0); // 人间界未征服
  world.fixture.store.set('flag:81', 2100);
  world.fixture.store.set('flag:93', 0); // FLAG:93 事件进度：初始档

  await world.emit('EVENTTURNEND');
  assert.equal(
    world.fixture.store.get('flag:93'),
    1,
    '衰减后 CALL KYOTEN_EVENT, 1 推进 FLAG:93 0→1（SYSTEM ver1.0.3.ERB:631）',
  );
  const banners = world.fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
  assert(
    banners.some((line) => line.includes('占领了村庄')),
    '跨 2000 阈值的横幅经日循环打出',
  );

  // 再走一回合：stage == 1 且侵攻度 < 4000，档位条件全不满足 → 不重复触发
  await world.emit('EVENTTURNEND');
  assert.equal(
    world.fixture.store.get('flag:93'),
    1,
    '档位不符的回合必须空转（恰好触发一次，不重复）',
  );
  assert.equal(
    world.fixture.lines_history.filter(
      (line) => line.type === 'text' && line.text.includes('占领了村庄'),
    ).length,
    1,
    '「占领了村庄」横幅只出现一次',
  );
});

test('KYOTEN_EVENT 经日循环触发（#119 接线）：衰减跌破回退阈值打夺回横幅', async () => {
  // FLAG:81 = 300：衰减后落 [300, 200]，任何取值都 <= 500，回退档必命中
  const world = setup_turnend();
  world.fixture.store.set('flag:82', 0);
  world.fixture.store.set('flag:81', 300);
  world.fixture.store.set('flag:93', 1);

  await world.emit('EVENTTURNEND');
  assert.equal(
    world.fixture.store.get('flag:93'),
    0,
    '衰减到 500 以下时 FLAG:93 回退 1→0（INVASION_EVENT.ERB:60-66）',
  );
  assert(
    world.fixture.lines_history.some(
      (line) =>
        line.type === 'text' && line.text.includes('人间界的军队占领了村庄'),
    ),
    '夺回横幅经日循环打出',
  );
});

test('KYOTEN_EVENT 经日循环触发（#119 接线）：已征服的反抗臂走同一调用点', async () => {
  // FLAG:82 = 1：每回合 RAND:6 == 0 才反抗（衰减 RAND:100、保底 100）后调用。
  // #119 验收时记录的已知非确定性（60 回合循环等 1/6 命中，约 1.8e-5 概率
  // 挂）：#120 起夹具提供 Math.random 注入（override_math_random，选择依据
  // 见 issue #120 评论），改为确定构造——预置序列让反抗首次判定即命中：
  //   rand(6) 取 r=0 → 0（反抗）；rand(100) 取 r=0.5 → 50（衰减量，
  //   flag:81 = 300 - 50 = 250，> 100 不触保底钳制）
  const world = setup_turnend();
  world.fixture.store.set('flag:82', 1); // 已征服
  world.fixture.store.set('flag:81', 300);
  world.fixture.store.set('flag:93', 1);

  const rand_seq = [0, 0.5];
  let drawn = 0;
  // 耗尽后回落固定 0.5：floor(0.5 * n) 对任何 n >= 2 都非 0，若世界里有
  // 未预见的额外 rand 消费，也不会误命中反抗判定（本世界魔王独居，
  // 一次 emit 的消费恰为序列两项）
  world.fixture.override_math_random(() =>
    drawn < rand_seq.length ? rand_seq[drawn++] : 0.5,
  );
  try {
    await world.emit('EVENTTURNEND');
  } finally {
    world.fixture.restore_math_random();
  }

  assert.equal(
    world.fixture.store.get('flag:81'),
    250,
    '反抗衰减 300 - 50（RAND:6 命中后 RAND:100 = 50）',
  );
  assert.equal(world.fixture.store.get('flag:93'), 0, '反抗衰减后回退档命中');
  assert(
    world.fixture.lines_history.some(
      (line) =>
        line.type === 'text' && line.text.includes('人间界的军队占领了村庄'),
    ),
    '夺回横幅经已征服反抗臂打出（调用点 :640）',
  );
});

test('已征服反抗臂的保底钳制：衰减跌破 100 时钳回 100（SYSTEM :636-637）', async () => {
  // flag:81 = 120、反抗命中后 rand(100) = 50 → 70 < 100 → 钳回 100。
  // 随机源确定构造同上一条用例（rand(6) = 0 命中反抗、rand(100) = 50）
  const world = setup_turnend();
  world.fixture.store.set('flag:82', 1);
  world.fixture.store.set('flag:81', 120);

  const rand_seq = [0, 0.5];
  let drawn = 0;
  world.fixture.override_math_random(() =>
    drawn < rand_seq.length ? rand_seq[drawn++] : 0.5,
  );
  try {
    await world.emit('EVENTTURNEND');
  } finally {
    world.fixture.restore_math_random();
  }

  assert.equal(
    world.fixture.store.get('flag:81'),
    100,
    '120 - 50 = 70 跌破保底，钳回 100（原作 SIF FLAG:81 < 100 的钳制）',
  );
});

test('KYOTEN_EVENT 经日循环触发（#119 接线）：精灵领域衰减走 ARG 2 臂，空转零副作用', async () => {
  // 两手构造：FLAG:86 = 2100 让精灵衰减块执行（证明该块的调用点真的跑到，
  // 且它调的 KYOTEN_EVENT 实参应是 2）；FLAG:81 = 300 + FLAG:93 = 2 让人间界
  // 块先回退一档到 1——若精灵块把领域号误传成 1，会以 FLAG:81（<= 500，
  // stage 1）再回退一档到 0 并打出夺回横幅，本用例当场红
  //
  // #195 随机源注入（恒 0.5，选择依据同「已征服的反抗臂」用例，issue #120
  // 评论）：真实随机下精灵块首掷 RAND:100 = 0（约 1%）会让循环进第 2 轮，
  // 人间界块跟着再跑一次、FLAG:93 再退一档到 0，断言随机红——mutation-check
  // 副本对照「环境破损」误报的来源之一。恒 0.5 下两处衰减每轮必掷 50：精灵
  // 块首轮即离开 2100、循环恰一轮退出，人间界块也只跑一轮。floor(0.5 * n)
  // 对任何 n >= 2 都非 0，世界里有未预见的额外 rand 消费也不会误触发掷 0 分支
  const world = setup_turnend();
  world.fixture.store.set('flag:82', 0); // 人间界未征服
  world.fixture.store.set('flag:81', 300);
  world.fixture.store.set('flag:93', 2);
  world.fixture.store.set('flag:87', 0); // 精灵领域未征服
  world.fixture.store.set('flag:86', 2100);

  let turns = 0;
  world.fixture.override_math_random(() => 0.5);
  try {
    for (
      ;
      turns < 60 && world.fixture.store.get('flag:86') === 2100;
      turns += 1
    ) {
      await world.emit('EVENTTURNEND');
    }
  } finally {
    world.fixture.restore_math_random();
  }
  assert.ok(
    turns < 60,
    '精灵领域衰减块确实执行（衰减被删时 FLAG:86 恒不离开 2100）',
  );
  assert.ok(
    (world.fixture.store.get('flag:86') ?? 0) < 2100,
    'FLAG:86 已衰减（调用点 :650 之后的 KYOTEN_EVENT, 2 已被调用）',
  );
  assert.equal(
    world.fixture.store.get('flag:93'),
    1,
    '人间界只回退一档到 1；ARG 2 臂不得误读人间界状态再退一档（传参须按领域号）',
  );
  assert.equal(
    world.fixture.store.get('flag:94'),
    undefined,
    'ARG 2 臂空转：不创建 FLAG:94（汉化版三臂无状态推进，见 issue #119）',
  );
  assert(
    !world.fixture.lines_history.some(
      (line) =>
        line.type === 'text' && line.text.includes('人间界的军队占领了村庄'),
    ),
    'ARG 2 臂空转：不打第二档以下的夺回横幅',
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
    // PARTY_UNITE（#172 真身）行动完了复位：原作 FOR CHARID, 0 起，魔王
    // 的 CFLAG:530 也清（行 263，先于 WEAPON_RESTORE）
    { name: 'cflag:0:530', value: 0 },
    // WEAPON_RESTORE（#174 真身，全角色循环含魔王；基础攻防 0 → 六笔 0 写，
    // 写序 = 原作 :16-19 的两步赋值 × 攻/防 + :34-35 的 ÷(RESULT+1)）
    { name: 'cflag:0:11', value: 0 },
    { name: 'cflag:0:11', value: 0 },
    { name: 'cflag:0:12', value: 0 },
    { name: 'cflag:0:12', value: 0 },
    { name: 'cflag:0:11', value: 0 },
    { name: 'cflag:0:12', value: 0 },
    { name: 'base:0:0', value: 1100 }, // 魔王体力 +1000（TIME 已翻转为 1）
    { name: 'base:0:1', value: 1050 }, // 魔王气力 +1000
    { name: 'base:0:1', value: 300 }, // 超上限钳回 MAXBASE:0:1
    { name: 'flag:10005', value: -1 }, // TARGET = TARGET_POOL（暂存值）
    // PARTY_JOIN（#172 真身）内联的 PARTY_UNITE 复调（行 743 → :98），
    // 魔王的 530 再清一次
    { name: 'cflag:0:530', value: 0 },
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

test('装备效果接入（#174 真身）：再生戒指的 HP 回复加成与死之戒指的回复减衰', async () => {
  // 原作 :314-326：W:8 = 4 乘、W:8 = 13 除。存根时代倍率恒 ×1/÷1，此处
  // 钉住真身取值——再生+3（效果 4）→ ×(3+1)；死之+2（效果 13）→ ÷(2+1)
  const world = setup_turnend();
  join_slave_chara(world.fixture, 31, '温妮');
  world.fixture.store.set('maxbase:31:0', 2000);
  world.fixture.store.set('base:31:0', 100);
  world.fixture.store.set('cflag:31:551', 4 + 3 * 1000); // 再生戒指+3
  world.fixture.store.set('cflag:31:552', 13 + 2 * 1000); // 死之戒指+2

  await world.emit('EVENTTURNEND'); // 第一回合：结算见 TIME==1 → 回 MAX/10
  // heal = 200 × (3+1) = 800，÷ (2+1) = 266
  assert.equal(world.fixture.store.get('base:31:0'), 100 + 266);
});

test('装备效果接入（#174 真身）：欲望戒指的陷落事件随 RESULT > 0 可达', async () => {
  // 原作 :390-413（W:8 = 6）：存根 RESULT 0 整支不达。真身按佩戴强度取值，
  // 无素质 69/73 的角色走第一支：获得容易陷落（TALENT:73）并加欲情珠
  const world = setup_turnend();
  join_slave_chara(world.fixture, 31, '温妮');
  world.fixture.store.set('cflag:31:551', 6 + 2 * 1000); // 欲望戒指+2（诅咒、效果 6）

  await world.emit('EVENTTURNEND');
  assert.equal(
    world.fixture.store.get('talent:31:73'),
    1,
    '容易陷落（TALENT:73）必须被赋予',
  );
  assert.equal(
    world.fixture.store.get('juel:31:5'),
    1,
    '按等级欲情：floor(2/2)',
  );
  assert(
    world.fixture
      .text_lines()
      .some((line) => line.includes('戒指的魔力永久地改变了')),
    '陷落播报必须出现',
  );
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
  // 不再占位；#171 起 ENTER_ENEMY 换真身（ere/event/enter-enemy.js）
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
    'AUTO_BUYING',
    'DEBUG_CHECK',
  ]);
  // #174 起 WEAPON_RESTORE/EQUIP_CHECK 换真身（ere/system/equip/），不再占位；
  // #172 起 PARTY_UNITE/DUNGEON/PARTY_JOIN/PARTY_DEL 换真身（ere/dungeon/）；
  // #181 起 DUNGEON_MAP/GEO_OUTPUT_2 换真身（labo-dungeon-map.js 与
  // labo-map.js）；#179 起 LVUP/DUNGEON_AFTER 换真身（dungeon-lvup.js 与
  // dungeon-after.js）——三条均已从名单移除
  assert.deepEqual(settle_stubs, [
    'FORMAT_AUTOTRAIN',
    '自動處刑',
    'BENKI',
    'NAEDOKO',
    'MARRIAGE_DAY',
    'AUTOTRAIN',
    'CAMPAIGN_GAMEOVER',
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

// —— #179（H10）升级结算与战果结算的接线 ——

test('升级守卫（SIF CFLAG:A:1 != 2）：侵攻中的勇者不升级，其他角色照常升级', async () => {
  const { fixture, emit } = setup_turnend();
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.seed_chara(2, { id: 2, name: '贝塔', callname: '贝塔' });
  fixture.era.addCharacter(1);
  fixture.era.addCharacter(2);
  for (const cid of [1, 2]) {
    fixture.store.set(`maxbase:${cid}:0`, 100);
    fixture.store.set(`maxbase:${cid}:1`, 100);
  }
  // 2D 模式（FLAG:502 = 1）：侵攻中的阿尔走 DUNGEON_MAP 存根臂而非迷宫
  // 真身——本用例只测升级守卫，迷宫推进的行为在 dungeon-main.test.js
  fixture.store.set('flag:502', 1);
  // 阿尔：侵攻中（CFLAG:1 = 2，H2 写入的状态）+ 足量经验（LV3 需 40）
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:9', 3);
  fixture.store.set('exp:1:80', 45);
  // 贝塔：空闲 + 同量经验
  fixture.store.set('cflag:2:1', 0);
  fixture.store.set('cflag:2:9', 3);
  fixture.store.set('exp:2:80', 45);

  await emit('EVENTTURNEND');

  assert.equal(
    fixture.store.get('cflag:1:9'),
    3,
    '侵攻中的勇者不升级（原作 :298 的 SIF CFLAG:A:1 != 2 守卫，1:1）',
  );
  assert.equal(
    fixture.store.get('exp:1:80'),
    45,
    '守卫在 LVUP 之前：经验也不扣',
  );
  assert.equal(fixture.store.get('cflag:2:9'), 4, '空闲角色升级 LV3 → 4');
  assert.equal(fixture.store.get('exp:2:80'), 5, '经验扣 40');
});

test('魔王升级（:619 CALL LVUP,0）：经验够则升级并播报', async () => {
  const { fixture, emit } = setup_turnend();
  fixture.store.set('cflag:0:9', 5); // 魔王 LV5 → 需 60
  fixture.store.set('exp:0:80', 60);
  await emit('EVENTTURNEND');
  assert.equal(fixture.store.get('cflag:0:9'), 6, '魔王 LV5 → 6');
  assert.equal(fixture.store.get('exp:0:80'), 0);
  assert(
    fixture.text_lines().some((line) => line.includes('*你的等级提升为LV6*')),
    '升级播报（NAME:MASTER = 魔王名前）',
  );
});

test('战果结算分派（:302 CALL DUNGEON_AFTER）：凯旋（5）与败北（6）各进各臂', async () => {
  const { fixture, emit } = setup_turnend();
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.seed_chara(2, { id: 2, name: '贝塔', callname: '贝塔' });
  fixture.era.addCharacter(1);
  fixture.era.addCharacter(2);
  for (const cid of [1, 2]) {
    fixture.store.set(`maxbase:${cid}:0`, 100);
    fixture.store.set(`maxbase:${cid}:1`, 100);
    fixture.store.set(`cflag:${cid}:9`, 1);
  }
  fixture.store.set('cflag:1:1', 5); // 凯旋 → 奖赏
  fixture.store.set('cflag:2:1', 6); // 败北 → 惩罚
  fixture.set_inputs(0, 0); // 两臂各选 [0]

  await emit('EVENTTURNEND');

  assert(
    fixture.text_lines().some((line) => line.includes('打倒了勇者，凯旋而归')),
    '凯旋的奖赏臂',
  );
  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('没有发现勇者（或者是输了）')),
    '败北的惩罚臂',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 0, '凯旋结算后状态清 0');
  assert.equal(fixture.store.get('cflag:2:1'), 0, '败北结算后状态清 0');
});
