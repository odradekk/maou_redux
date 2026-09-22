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
  // 金钱不变量（#401）：@DEBUG_CHECK 是回合链的一环，按
  // `MONEY == EX_FLAG:4444 + 8766` 判「钱被改过」，不成立就炸宝库、清零
  // 资金、随机删一个角色（原作的合法开局满足它：SYSTEM ver1.0.3.ERB:55-56
  // 的 10000 / 1234，由 @EVENTFIRST 播种；本函数不跑 EVENTFIRST，故在此
  // 补齐）。缺了它不是「断言太严」，是这个夹具世界不合法——爆炸事件会
  // 污染整条链的输出与写入清单，还会多掷几次随机数。
  fixture.store.set('flag:10004', 10000); // MONEY
  fixture.store.set('exflag:4444', 1234); // EX_FLAG:4444（非作弊资金）
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
  // EVENT_NEXTDAY 的无条件可见副作用：FLAG:61（熏香使用次数）清零。
  // #400（N16）起该函数走全路径，原先借用的 @TAX_GET 占位行已随真身撤下，
  // 改用这个不需要任何角色预置的写点当锚
  fixture.store.set('flag:61', 3);

  assert.equal(era_flag.time, 0, '开局应为午前');
  // 第一回合：午前 → 午后，不进日（TIME != 1 走 ELSE）
  let pending = await emit('EVENTTURNEND');
  assert.equal(pending, STATE.SHOP, '链上最后一个 BEGIN（普通档）胜出');
  assert.equal(era_flag.time, 1);
  assert.equal(era_flag.day_count, 0, '午后回合不得进日');
  assert.equal(era_flag.date, 0);
  assert.equal(
    fixture.store.get('flag:61'),
    3,
    '未进日不得触发日程推进（EVENT_NEXTDAY 只在日推进回合执行）',
  );

  // 第二回合：午后 → 次日午前，DAY:0/DAY:2/DAY:3 各 +1，回到开局的时段
  pending = await emit('EVENTTURNEND');
  assert.equal(pending, STATE.SHOP);
  assert.equal(era_flag.time, 0, '连续两次回到同一时段（午前）');
  assert.equal(era_flag.day_count, 1, 'DAY:0 += 1');
  assert.equal(era_flag.date, 1, 'DAY:2 += 1');
  assert.equal(era_flag.weekday, 1, 'DAY:3 += 1');
  assert.equal(
    fixture.store.get('flag:61'),
    0,
    '日推进回合必须执行日程推进（EVENT_NEXTDAY 的熏香清零）',
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
  // #177（H8）起 DUNGEON_ROOM 也是真身（无占位行），观测锚点换成
  // CFLAG:514（階層滞在カウント，DUNGEON.ERB :358——全库唯一写者是
  // run_dungeon 的滞留臂，:167/:286 两臂则清零）：一次 emit 恰走一次滞留
  // 臂 → 514 恰为 1。注意原作 :386 的 CALL DUNGEON_ROOM **不是必经**
  // （#195 勘误，此前此处写反；对 514 同样成立）：它之前有行動完了早退
  // （CFLAG:530）、魔王房间 ENDING_2 收口、撤退臂走出迷宫、迎击奴隶滞留
  // 归还等多处 return 0 / break 出口，落到哪个出口由随机掷选决定——如
  // walk = RAND:20 + 6×RAND:10 七掷全 0 时侵攻度不增，走撤退臂在迷宫外
  // break，滞留臂不经过、514 为 0。故正向两世界注入恒 0.5 随机源钉住滞留
  // 臂（walk = 40，侵攻度 0 + 40 ∈ (0, 100)），:358 恰经过一次、514 恰为
  // 1；注入不挑分支，#175/#177 改滞留臂之后的行为不影响本观测
  const neutral = setup_turnend();
  join_slave_chara(neutral.fixture, 31, '温妮');
  await neutral.emit('EVENTTURNEND');
  const neutral_texts = neutral.fixture.text_lines();
  const stub_count = (lines, name) =>
    lines.filter((line) => line.includes(`原作 @${name}，`)).length;
  assert.equal(
    neutral.fixture.store.get('cflag:31:514') ?? 0,
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
    campaign.fixture.store.get('cflag:31:514'),
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
    explore.fixture.store.get('cflag:31:514'),
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
    field.fixture.store.get('cflag:31:514') ?? 0,
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

test('KYOTEN_EVENT 经日循环触发（#119 接线）：精灵领域衰减走 ARG 2 臂，按领域号只打本领域的星号', async () => {
  // 两手构造：FLAG:86 = 2100 让精灵衰减块执行（证明该块的调用点真的跑到，
  // 且它调的 KYOTEN_EVENT 实参应是 2）；FLAG:81 = 300 + FLAG:93 = 2 让人间界
  // 块先回退一档到 1——若精灵块把领域号误传成 1，会以 FLAG:81（<= 500，
  // stage 1）再回退一档到 0 并打出夺回横幅，本用例当场红
  //
  // #505 起三臂是真身（判定由「不可达」改判为可达）：衰减后的 FLAG:86 = 2050
  // 已过首档 2000，ARG 2 臂会打一行星号——本用例因此同时钉住「日循环这条
  // 调用族真的会走到三臂的行为体」（#505 之前该臂空转，断言无从下手）
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
    'ARG 2 臂不推进状态字：不创建 FLAG:94（汉化版三臂无状态推进，见 issue #119）',
  );
  assert(
    !world.fixture.lines_history.some(
      (line) =>
        line.type === 'text' && line.text.includes('人间界的军队占领了村庄'),
    ),
    'ARG 2 臂不走人间界臂：不打夺回横幅',
  );

  // 单起一条最小世界钉住「ARG 2 臂真的打出一行星号」（#505 起是真身；上面
  // 那条世界里人间界臂也会打自己的七行横幅，两支的星号混在一起数不清）：
  // FLAG:81 = 0 → 人间界块整块跳过，只剩精灵块跑一次
  const only_elf = setup_turnend();
  only_elf.fixture.store.set('flag:82', 0);
  only_elf.fixture.store.set('flag:81', 0);
  only_elf.fixture.store.set('flag:93', 0);
  only_elf.fixture.store.set('flag:87', 0);
  only_elf.fixture.store.set('flag:86', 2100);
  only_elf.fixture.override_math_random(() => 0.5);
  try {
    await only_elf.emit('EVENTTURNEND');
  } finally {
    only_elf.fixture.restore_math_random();
  }
  assert.equal(
    only_elf.fixture.lines_history.filter(
      (line) => line.type === 'text' && line.text === '*'.repeat(91),
    ).length,
    1,
    'FLAG:86 衰减到 2050 仍过首档 2000 → ARG 2 臂打一行星号（#505 起是真身）',
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
  // #508：FORMAT_AUTOTRAIN / BEFORE_AUTOTRAIN 换真身后，窗口内多出三段批量
  // 零写（原作全在 EVENT_AUTOTRAIN.ERB：TFLAG 0..199 与 PALAM 0..16 在
  // @FORMAT_AUTOTRAIN :68-75，SOURCE 0..16 与 UP/DOWN 0..16 在
  // @BEFORE_AUTOTRAIN :91-104）。
  // 逐条展开 260 行不可读，按原作 :64-104 的 FOR 循环区间生成；生成式不
  // 掩盖「少写/多写」——区间条数在下面单独断言，区间之外仍逐条列出
  const zero_span = (prefix, count) =>
    Array.from({ length: count }, (_, i) => ({
      name: `${prefix}${i}`,
      value: 0,
    }));
  const writes = fixture.var_writes;
  // 窗口开前的全部写入（逐条，含 #PRI 档与普通档头部）
  assert.deepEqual(writes.slice(0, 11), [
    // :14 FOR TARGET,0,CHARANUM 写全局 TARGET（#401 起循环体内显式写回，
    // 否则妊娠判定会读到上个角色的残留）
    { name: 'flag:10005', value: 0 },
    // :23 IN_VAGINA_ALL 的九连调：TARGET = 0 落在主人位上，六组带守卫的
    // 各自早退，三组无守卫的（T_TO_M/KYOUOU_TO_M/SYOKU_TO_M）进
    // NAKADASHI_CHECK——本世界 FLAG:5 未开妊娠功能，走「清池后返回」支
    // （:204-210），故是三笔清池（kind 3 → CFLAG:104、kind 6 → 107、
    // kind 7 → 108；M_TO_T/M_TO_A 被 `TARGET >= 1` 挡在调用之外）
    { name: 'cflag:0:104', value: 0 },
    { name: 'cflag:0:107', value: 0 },
    { name: 'cflag:0:108', value: 0 },
    // :26 CONCEPTION_CHECK_ALL：无妊娠相手可落定，零写入
    { name: 'flag:10005', value: 0 }, // :29 TARGET = LOCAL（原值 0）
    { name: 'flag:0', value: 0 }, // :54 休憩标志复位
    { name: 'flag:10003', value: 1 }, // TIME 0→1
    { name: 'flag:10005', value: -1 }, // #PRI 尾部 TARGET = -1
    { name: 'flag:10006', value: -1 }, // ASSI = -1
    { name: 'flag:10008', value: 0 }, // 普通档 PLAYER = 0
    { name: 'flag:10006', value: -1 }, // ASSI = -1（普通档开头）
  ]);
  // 调教窗口内的写入（逐条 + 三段区间），共 262 笔
  assert.deepEqual(writes.slice(11, 273), [
    { name: 'flag:10005', value: 0 }, // #508：FORMAT 循环逐角色指 TARGET 指针
    { name: 'base:0:2', value: 0 }, // 魔王射精槽（:56）
    { name: 'base:0:2', value: 0 }, // 目标射精槽（:58；本世界 TARGET=0）
    { name: 'base:0:3', value: 0 }, // 母乳槽（:61）
    { name: 'base:0:4', value: 0 }, // 触手射精槽（:62）
    { name: 'deltabase:0:0', value: 0 }, // LOSEBASE:0 = 0（:64；负值通道）
    { name: 'deltabase:0:1', value: 0 }, // LOSEBASE:1 = 0（:65）
    ...zero_span('tflag:', 200), // :68-70 REPEAT 200
    ...zero_span('palam:0:', 17), // :73-75 FOR LOCAL,0,17
    ...zero_span('source:0:', 17), // BEFORE_AUTOTRAIN（:95-97）
    ...zero_span('delta:0:', 17), // BEFORE_AUTOTRAIN（:100-103）
    { name: 'tflag:402', value: 0 }, // 死斗场收入清零（:86）
    { name: 'cflag:0:506', value: 0 }, // 新人标志消去
    { name: 'cflag:0:666', value: 0 }, // 自动调教标志消去
    { name: 'flag:10005', value: -1 }, // #508：TARGET 指针还原暂存值
  ]);
  // 窗口关闭之后的写入（逐条）
  assert.deepEqual(writes.slice(273), [
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
    // :740 AUTOTRAIN（#508 起真身）自身的指针簿记：PLAYER/ASSI 置调教态、
    // 逐角色指 TARGET（本世界 getAllCharacters 只有 0 号），收尾还原
    { name: 'flag:10008', value: 0 },
    { name: 'flag:10006', value: -1 },
    { name: 'flag:10005', value: 0 },
    { name: 'flag:10005', value: -1 },
    { name: 'flag:10006', value: -1 },
    // PARTY_JOIN（#172 真身）内联的 PARTY_UNITE 复调（行 743 → :98），
    // 魔王的 530 再清一次
    { name: 'cflag:0:530', value: 0 },
    { name: 'flag:10005', value: 0 }, // TARGET = FLAG:1（开局 0）
    { name: 'flag:10006', value: 0 }, // ASSI = FLAG:2（开局 0）
  ]);
  // 区间条数（生成式不掩盖少写）：200 + 17×3
  assert.equal(
    writes.filter((w) => w.name.startsWith('tflag:') && w.value === 0).length,
    201,
    'TFLAG 0..199 + tflag:402',
  );
  assert.equal(
    writes.filter((w) => w.name.startsWith('palam:0:')).length,
    17,
    'PALAM 0..16 清零',
  );
  // 普通档结算循环跳过魔王：cflag:0:570 一类结算写入不得出现
  assert(
    !fixture.var_writes.some((w) => w.name === 'cflag:0:570'),
    '结算主循环必须跳过魔王（原作 A = 1 起）',
  );
  // 结算中段的原作 WAIT 恰好一次。#508 前这里断言的是「消费了一次输入」，
  // 那是两条占位行把它前面垫满（引擎语义：有可读输出才真等键）；换真身后
  // 本世界窗口内零输出，WAIT 仍被调用、但不消费——两项都钉住
  assert.equal(fixture.waits.length, 1, '结算中段的原作 WAIT 恰一次');
  assert.equal(fixture.waits[0].waited, false, '之前无可读输出：不消费输入');
  assert.deepEqual(fixture.inputs_consumed, []);
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

test('回合结算：苗床角色进入真实业务，不再停在 NAEDOKO 存根', async () => {
  const world = setup_turnend();
  join_slave_chara(world.fixture, 31, '温妮');
  world.fixture.store.set('talent:31:209', 1); // 苗床
  world.fixture.store.set('talent:31:122', 1); // 男性：两条随机支均有确定点数
  world.fixture.store.set('cflag:0:9', 3); // 魔王等级

  await world.emit('EVENTTURNEND');

  const penis = world.fixture.store.get('juel:31:0') || 0;
  const anal = world.fixture.store.get('juel:31:2') || 0;
  assert.equal(penis + anal, 30, 'NAEDOKO 真身按魔王等级结算点数');
  assert(
    !world.fixture.text_lines().some((line) => line.includes('@NAEDOKO')),
    '回合结算不得再输出 NAEDOKO 存根',
  );
});

test('三档链序：#PRI 先于普通档执行，两处出口同为 SHOP', async () => {
  const { fixture, emit, STATE } = setup_turnend();
  await emit('EVENTTURNEND');
  // 普通档内部的开闭点（#508：FORMAT_AUTOTRAIN / AUTOTRAIN 换真身后不再有
  // 占位行，改用调教窗口的开闭序与调教域表的存在性作序证人）
  const calls = fixture.calls.map((c) => c.api);
  const window_open = calls.indexOf('beginTrain');
  const window_close = calls.indexOf('endTrain');
  assert.ok(window_open >= 0, '普通档要开一次调教窗口');
  assert.ok(window_close >= 0, '窗口必须在结算尾部关上（endTrain）');
  assert.ok(window_open < window_close, '调教窗口先开后关');
  assert(
    !fixture
      .text_lines()
      .some(
        (line) =>
          line.includes('@FORMAT_AUTOTRAIN') || line.includes('@AUTOTRAIN'),
      ),
    '两条占位行必须消失（#508 起都是真身）',
  );
  // #PRI 档的尾观测点在 #401 之后不再有存根文本（AUTO_BUYING/DEBUG_CHECK
  // 已落真身、两者在本世界都零写入），改用写入序作序证人：:135 的
  // `ASSI = -1` 是该档最后两笔写之一、普通档开头的 `PLAYER = 0` 记其后
  const pri_tail = fixture.var_writes.findIndex(
    (w) => w.name === 'flag:10006' && w.value === -1,
  );
  const settle_play = fixture.var_writes.findIndex(
    (w) => w.name === 'flag:10008',
  );
  assert.ok(pri_tail >= 0 && settle_play >= 0);
  assert.ok(
    pri_tail < settle_play,
    '#PRI 档的尾部写入必须先于普通档的头部写入（#6：BEGIN 不中止链）',
  );
  assert.equal(STATE.SHOP, 'SHOP');
});

// —— #508：自动调教三连的调教窗口与回合尾部结算 ——

test('调教窗口（#508）：FORMAT_AUTOTRAIN 的 PALAM 重置落得下，窗口在 AUTOTRAIN 后关', async () => {
  const { fixture, emit } = setup_turnend();
  join_slave_chara(fixture, 31, '温妮');
  // 常时发情（TALENT:271）：FORMAT_AUTOTRAIN 会给目标写 PALAM:3/5 各 3000——
  // 这是「窗口确实开着」的直接证据：窗口外引擎对三段写静默丢弃
  fixture.store.set('talent:31:271', 1);

  await emit('EVENTTURNEND');

  assert.ok(
    fixture.var_writes.some((w) => w.name === 'palam:31:3' && w.value === 3000),
    '常时发情的 3000 起步必须落进 palam（窗口开着的直接证据）',
  );
  assert.ok(
    fixture.var_writes.some((w) => w.name === 'palam:31:5' && w.value === 3000),
  );
  const calls = fixture.calls.map((call) => call.api);
  const open = calls.indexOf('beginTrain');
  const close = calls.indexOf('endTrain');
  assert.ok(open >= 0 && close > open, '开窗在关窗之前');
  // 关窗即删调教域表（引擎 endTrain 语义）：窗口外的读者仍读回空，
  // event-nextday.js:442 的「PALAM 读回来恒空」判据不受影响
  assert.equal(fixture.store.get('palam:31:3'), undefined);
});

test('调教窗口（#508）：AUTOTRAIN 在窗口里跑真身，PALAM → 珠可结算', async () => {
  const { fixture, emit } = setup_turnend();
  join_slave_chara(fixture, 31, '温妮');
  const mod = fixture.load_module('event/event-autotrain');
  const real_autotrain = mod.autotrain;
  let palam_inside_window;
  mod.autotrain = async () => {
    // 站在 AUTOTRAIN（:740）的位置：窗口开着的话这一格写得进
    fixture.era.set('palam:31:5', 12345);
    palam_inside_window = fixture.store.get('palam:31:5');
    // 迷宫域的 COM*_AUTO 会把 CFLAG:666 拉起来（本世界不跑迷宫，替身模拟
    // 它的产物；AUTOTRAIN 的入列判据就是它）
    fixture.era.set('cflag:31:666', 1);
    return real_autotrain();
  };

  await emit('EVENTTURNEND');

  assert.equal(palam_inside_window, 12345, 'AUTOTRAIN 跑在调教窗口里');
  assert.equal(
    fixture.store.get('juel:31:5'),
    1000,
    'PALAM:5 = 12345 → 欲情珠 1000（JUEL_CHECK_MAIN 的换算梯子）',
  );
  assert.equal(fixture.store.get('cflag:31:667'), 1, 'CFLAG:667 += CFLAG:666');
});

test('CAMPAIGN_GAMEOVER：气力被扣到 <= 0 时战役结束、清零派遣（#469）', async () => {
  const world = setup_turnend();
  join_slave_chara(world.fixture, 31, '温妮');
  world.fixture.store.set('flag:400', 1); // 战役中
  world.fixture.store.set('base:0:1', 5); // 气力 5，扣 10 后 <= 0
  world.fixture.store.set('maxbase:0:1', 1000);
  world.fixture.store.set('cflag:31:1', 12); // 温妮派遣中
  world.fixture.store.set('cflag:31:507', 1);

  await world.emit('EVENTTURNEND');

  assert.equal(world.fixture.store.get('flag:400'), 0, 'FLAG:400 清零');
  assert.equal(world.fixture.store.get('base:0:1'), 1, '气力钳回 1');
  assert.equal(world.fixture.store.get('cflag:31:1'), 0, '派遣状态清零');
  assert.equal(world.fixture.store.get('cflag:31:507'), 0, '回城标志清零');
  assert.ok(
    world.fixture.text_lines().some((t) => t.includes('体力耗尽了')),
    '战役失败播报',
  );
});

test('CAMPAIGN_GAMEOVER：不在战役中时气力扣到 0 也不触发', async () => {
  const world = setup_turnend();
  world.fixture.store.set('base:0:1', 5);
  world.fixture.store.set('maxbase:0:1', 1000);

  await world.emit('EVENTTURNEND');

  assert.equal(world.fixture.store.get('flag:400'), undefined);
  assert.ok(!world.fixture.text_lines().some((t) => t.includes('体力耗尽了')));
});

test('#502 宣言数 SENGEN 真读 EX_FLAG:9012：衰减后的流行度决定追加遇敌次数', async () => {
  // 数一次日推进回合里的 ENTER_ENEMY 调用：:93 的无条件一次 + :121-125 的
  // FOR EFFECT, 0, SENGEN（SENGEN = EX_FLAG:9012 - 2，DAY < 100 档）。
  // 同一回合里 SENGEN_VIDEO_DE 先跑（:418 的 run_event_nextday），所以读到
  // 的是当日衰减后的流行度——常数 0.5 让 RAND:3 = 1（非零）必减 1；过时
  // 倒计时预置成 10，避免它归零时把流行度一并清零
  const count_calls = async (popularity) => {
    const { fixture, emit, era_flag } = setup_turnend();
    era_flag.time = 1; // 站在日推进回合（TIME 1 → 0 的那次 emit）
    fixture.store.set('exflag:9012', popularity);
    fixture.store.set('exflag:9013', 10);
    const calls = [];
    fixture.load_module('event/enter-enemy').enter_enemy = async (which) => {
      calls.push(which);
      return 0;
    };
    fixture.override_math_random(() => 0.5);
    try {
      await emit('EVENTTURNEND');
    } finally {
      fixture.restore_math_random();
    }
    return calls;
  };

  const none = await count_calls(0);
  assert.equal(
    none.length,
    1,
    '流行度 0：只有 :93 的无条件一次（:119-120 归零）',
  );
  const some = await count_calls(6);
  assert.equal(
    some.length,
    4,
    '流行度 6 → 当日衰减为 5 → 一次 + FOR EFFECT 循环 3 次（5 - 2）',
  );
  assert.deepEqual(some, [0, 0, 0, 0], '全部无实参（原作 CALL ENTER_ENEMY）');
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
  // 不再占位；#171 起 ENTER_ENEMY 换真身（ere/event/enter-enemy.js）；
  // **#401 起十个体外调用全落真身**（CHECK_SPECIALSKIL 接 #405 的
  // get-specialtalent.js；八个妊娠调用与 AUTO_BUYING/DEBUG_CHECK 在本文件
  // 或 ere/event/event-pregnancy.js），#PRI 档名单因此清空
  assert.deepEqual(pri_stubs, []);
  // #174 起 WEAPON_RESTORE/EQUIP_CHECK 换真身（ere/system/equip/），不再占位；
  // #172 起 PARTY_UNITE/DUNGEON/PARTY_JOIN/PARTY_DEL 换真身（ere/dungeon/）；
  // #181 起 DUNGEON_MAP/GEO_OUTPUT_2 换真身（labo-dungeon-map.js 与
  // labo-map.js）；#179 起 LVUP/DUNGEON_AFTER 换真身（dungeon-lvup.js 与
  // dungeon-after.js）；#217 起 BENKI 换真身（system/train/benki.js）——
  // 四条均已从名单移除；#342 起 MARRIAGE_DAY 亦接真身；#508 起
  // FORMAT_AUTOTRAIN / AUTOTRAIN 亦接真身（ere/event/event-autotrain.js
  // 的同名函数，调用点原为占位行）
  assert.deepEqual(settle_stubs, ['自動處刑', 'GET_LOOK_INFO']);
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

test('结婚日接线：普通档逐角色调用真身，妊娠角色看到婚后生活', async () => {
  const { fixture, emit, STATE } = setup_turnend();
  fixture.store.set('cflag:0:601', 900); // CFLAG:601 = 结婚对象（野狗）
  fixture.store.set('talent:0:153', 1); // TALENT:153 = 妊娠（在随机分派前返回）

  assert.equal(await emit('EVENTTURNEND'), STATE.SHOP);
  assert(
    fixture.text_lines().some((line) => line.includes('期待着孩子的出生')),
  );
  assert(
    !fixture
      .text_lines()
      .some((line) => line.includes('MARRIAGE_DAY 尚未移植')),
  );
});

test('结婚日接线：完成婚后事件后顺接剩余结算并回到 SHOP', async () => {
  const { fixture, emit, STATE } = setup_turnend();
  fixture.store.set('cflag:0:601', 900); // CFLAG:601 = 结婚对象（野狗）

  fixture.override_math_random(() => 0);
  try {
    assert.equal(await emit('EVENTTURNEND'), STATE.SHOP);
  } finally {
    fixture.restore_math_random();
  }
  assert.equal(fixture.store.get('cflag:0:602'), 1);
  assert.ok(
    fixture.calls.some((call) => call.api === 'endTrain'),
    '结婚日后的自动调教结算仍可达（#508：真身跑在调教窗口里，窗口在结算后关）',
  );
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

// —— #401：十个体外调用换真身 ——

/** 固定随机序（越界即断言失败；#16 惯例的收紧版） */
function seq(values) {
  let index = 0;
  return (n) => {
    assert.ok(
      index < values.length,
      `随机序列已耗尽（第 ${index + 1} 次抽取，只预置了 ${values.length} 个）`,
    );
    const value = values[index++];
    assert.ok(value >= 0 && value < n, `随机值 ${value} 必须在 [0, ${n}) 内`);
    return value;
  };
}

/** 妊娠链靶场：主人 0 与奴隶 31/32，妊娠功能开启、金钱不变量成立 */
function setup_pregnancy({ time = 0 } = {}) {
  const fixture = create_era_fixture();
  for (const cid of [0, 31, 32]) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  fixture.store.set('flag:5', 4); // 妊娠出产功能 ON
  fixture.store.set('flag:10004', 10000);
  fixture.store.set('exflag:4444', 1234);
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.disable_enter_enemy();
  // 指针用 store 预置（不经 era_flag 门面）：门面写会被 var_writes 收录、
  // 混进后面「循环写回 TARGET」的序列断言
  fixture.store.set('flag:10005', -1); // TARGET
  fixture.store.set('flag:10003', time); // TIME
  return { fixture, emit, era_flag };
}

test('#401 妊娠判定接入：IN_VAGINA_ALL/CONCEPTION_CHECK_ALL 逐角色跑（TARGET 写回）', async () => {
  const { fixture, emit } = setup_pregnancy();
  // 角色 31 挂着主人的精液（CFLAG:101 = 1），其余角色池为空
  fixture.store.set('cflag:31:101', 1);

  // 全链的随机源取常数 0：妊娠掷骰上界 18（池 1 → 分档 [6,2]）取 0 必命中
  fixture.override_math_random(() => 0);
  try {
    await emit('EVENTTURNEND');
  } finally {
    fixture.restore_math_random();
  }

  assert.equal(
    fixture.store.get('cflag:31:102'),
    1,
    'IN_VAGINA_M_TO_T 命中：妊娠相手 = 1（主人）',
  );
  assert.equal(fixture.store.get('cflag:31:101'), 0, '精液池被消费');
  assert.equal(
    fixture.store.get('cflag:31:110'),
    10,
    'CONCEPTION_CHECK_ALL 落定预产日 = DAY(0) + 10 + rand(6)(0)',
  );
  assert.equal(fixture.store.get('cflag:0:102') ?? 0, 0, '角色 0 未被波及');
  // 循环内逐角色写回 TARGET（原作 FOR TARGET 就是写全局），循环后 :29 还原；
  // :134 再清成 -1。这条序列同时钉住「没有写回」的退化（只消一次写）
  assert.deepEqual(
    fixture.var_writes
      .filter((w) => w.name === 'flag:10005')
      .map((w) => w.value)
      .slice(0, 5),
    [0, 31, 32, -1, -1],
    ':14 逐角色写回 → :29 还原 → :134 清空（之后的普通档还会改 TARGET，故此处只钉前五笔）',
  );
});

test('#401 妊娠判定接入：第二组（卖春/狂王兽奸/NTR）只在日推进回合跑', async () => {
  // 用「客」精液池（kind 4 → CFLAG:105）：它是第二组的 IN_VAGINA_EXTRA
  // 独占的下标——第一组的九连调不碰 105，故池的去留只反映第二组跑没跑
  const noon = setup_pregnancy({ time: 0 });
  noon.fixture.store.set('cflag:31:105', 1);
  noon.fixture.override_math_random(() => 0);
  try {
    await noon.emit('EVENTTURNEND');
  } finally {
    noon.fixture.restore_math_random();
  }
  assert.equal(
    noon.fixture.store.get('cflag:31:105'),
    1,
    '午前回合不得跑第二组（:57 的 TIME == 1 分支才含 :61-74）',
  );
  assert.equal(noon.fixture.store.get('cflag:31:102') ?? 0, 0);

  // TIME = 1 → 第二组照跑，REPEAT CHARANUM 自角色 0 起；六件按 :64-71 的
  // 顺序执行，落定的预产日用第二组跑时的 DAY:0（日推进在 :79 才发生）
  const afternoon = setup_pregnancy({ time: 1 });
  afternoon.fixture.store.set('cflag:31:105', 1);
  afternoon.fixture.override_math_random(() => 0);
  try {
    await afternoon.emit('EVENTTURNEND');
  } finally {
    afternoon.fixture.restore_math_random();
  }
  // 断言看写入序列而非终态：紧随其后的 :77 EVENT_NEXTDAY 会把刚落定的
  // 妊娠推进成「妊娠中」（ninsin_main 消费 CFLAG:102/110 并置 TALENT:153，
  // 那是 #115 的职责），终态已不是第二组留下的样子
  assert.deepEqual(
    afternoon.fixture.var_writes
      .filter((w) => w.name.startsWith('cflag:31:'))
      .slice(0, 4)
      .map((w) => [w.name, w.value]),
    [
      ['cflag:31:102', 4], // :64 IN_VAGINA_EXTRA 命中（妊娠相手 = 4 客）
      ['cflag:31:105', 0], // :274 清池
      ['cflag:31:110', 10], // :65 CONCEPTION_CHECK_EXTRA：DAY(0) + 10 + 0
      ['cflag:31:111', -1], // :385 卖春来源的孩子父亲码 -1
    ],
    '第二组的六件按 :64-71 的顺序执行',
  );
});

test('#401 AUTO_BUYING：三个开关位各自的可达条件与边界', async () => {
  const fixture = create_era_fixture();
  const { auto_buying } = fixture.load_module('event/event-turnend');
  const money = () => fixture.store.get('flag:10004');
  const legit = () => fixture.store.get('exflag:4444');

  // 开关全关：一毛不拔
  fixture.store.set('flag:10004', 1000);
  fixture.store.set('exflag:4444', 1234);
  await auto_buying();
  assert.equal(money(), 1000, 'FLAG:34 == 0 时零动作');
  assert.equal(fixture.store.get('item:25') ?? 0, 0);

  // 位 1：润滑液（200 点，已有则不买）
  fixture.store.set('flag:34', 1);
  await auto_buying();
  assert.equal(fixture.store.get('item:25'), 1);
  assert.equal(money(), 800, '扣 200');
  assert.equal(legit(), 1034, 'EX_FLAG:4444 同步扣 200');
  await auto_buying();
  assert.equal(money(), 800, 'ITEM:25 != 0 时不再买（守卫 ITEM:25 == 0）');

  // 位 1 的边界：恰好 200 买得起、199 买不起（`>= 200` 的等号那一侧）
  const exact = create_era_fixture();
  const { auto_buying: buy_exact } = exact.load_module('event/event-turnend');
  exact.store.set('flag:34', 1);
  exact.store.set('flag:10004', 200);
  await buy_exact();
  assert.equal(exact.store.get('item:25'), 1, '恰好 200 点买得起');
  assert.equal(exact.store.get('flag:10004'), 0);

  const poor = create_era_fixture();
  const { auto_buying: buy_poor } = poor.load_module('event/event-turnend');
  poor.store.set('flag:34', 1);
  poor.store.set('flag:10004', 199);
  await buy_poor();
  assert.equal(
    poor.store.get('item:25') ?? 0,
    0,
    '199 点买不起 200 点的润滑液',
  );

  // 位 2：水晶球魔力源（500 点）——前置是已持有水晶球（ITEM:6）
  const tape = create_era_fixture();
  const { auto_buying: buy_tape } = tape.load_module('event/event-turnend');
  tape.store.set('flag:34', 2);
  tape.store.set('flag:10004', 1000);
  tape.store.set('exflag:4444', 1234);
  await buy_tape();
  assert.equal(
    tape.store.get('item:28') ?? 0,
    0,
    '没有水晶球（ITEM:6 == 0）不买',
  );
  tape.store.set('item:6', 1);
  await buy_tape();
  assert.equal(tape.store.get('item:28'), 1);
  assert.equal(tape.store.get('flag:10004'), 500);

  // 位 8：安全套（100 点，REPEAT 10 逐个买，钱不够或到上限 10 即停）
  const broke = create_era_fixture();
  const { auto_buying: buy_broke } = broke.load_module('event/event-turnend');
  broke.store.set('flag:34', 8);
  broke.store.set('flag:10004', 950); // 只够 9 个
  await buy_broke();
  assert.equal(broke.store.get('item:24'), 9, '钱限：950 点只买到 9 个');
  assert.equal(broke.store.get('flag:10004'), 50, '剩下的 50 点不够再买');

  // 钱管够时一次买满 10 个（REPEAT 的次数与 ITEM:24 < 10 的上限各钉一处：
  // 次数少一次或上限小一个都只买得到 9 个）
  const capped = create_era_fixture();
  const { auto_buying: buy_capped } = capped.load_module('event/event-turnend');
  capped.store.set('flag:34', 8);
  capped.store.set('flag:10004', 5000);
  await buy_capped();
  assert.equal(capped.store.get('item:24'), 10, '上限 10 且循环 10 次：买满');
  assert.equal(capped.store.get('flag:10004'), 4000, '实扣 10 × 100');

  const nearly = create_era_fixture();
  const { auto_buying: buy_nearly } = nearly.load_module('event/event-turnend');
  nearly.store.set('flag:34', 8);
  nearly.store.set('flag:10004', 5000);
  nearly.store.set('item:24', 9); // 已有 9 个 → 本轮最多再买 1 个
  await buy_nearly();
  assert.equal(nearly.store.get('item:24'), 10, '已有 9 个时只再买 1 个');
  assert.equal(nearly.store.get('flag:10004'), 4900, '实扣 1 × 100');
});

/** DEBUG_CHECK 靶场：主人 0 + 两名奴隶，金钱不变量成立（不触发任何事件） */
function setup_debug() {
  const fixture = create_era_fixture();
  for (const cid of [0, 31, 32]) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  fixture.store.set('flag:10004', 10000); // MONEY
  fixture.store.set('exflag:4444', 1234); // 非作弊资金（不变量成立）
  const { debug_check } = fixture.load_module('event/event-turnend');
  return { fixture, debug_check };
}

test('#401 DEBUG_CHECK：不变量成立时整支空转（不写一个字节、不打印一行）', async () => {
  const { fixture, debug_check } = setup_debug();
  assert.equal(await debug_check(seq([])), 0);
  assert.deepEqual(fixture.var_writes, []);
  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('exflag:2802') ?? 0, 0);
});

test('#401 DEBUG_CHECK 第一段：钱被改过 → 宝库爆炸、资金清零、随机炸死一名奴隶', async () => {
  const { fixture, debug_check } = setup_debug();
  fixture.store.set('flag:10004', 5000); // 改钱：5000 ≠ 1234 + 8766
  fixture.store.set('flag:1', 31); // 上次调教对象 = 将要被炸死的角色
  fixture.store.set('flag:2', 32); // 上次助手（不是受害者，不该被清）

  // 随机源：added = [0, 31, 32]，rand(3) = 1 → 抽中角色 31；后续掷骰给 0
  assert.equal(await debug_check(seq([1, 0, 0])), 0);

  assert.equal(
    fixture.store.get('flag:10004'),
    0,
    ':198 MONEY = 0（宝库的财富被炸光）',
  );
  assert.equal(
    fixture.store.get('exflag:4444'),
    -8766,
    ':199 EX_FLAG:4444 = MONEY - 8766（重建不变量）',
  );
  assert.equal(fixture.store.get('exflag:2802'), 0, ':234 触发位复位');
  assert(!fixture.chara_no.includes(31), ':226 DELCHARA——角色 31 被炸死');
  assert.equal(fixture.store.get('flag:1'), -1, ':210-211 上次调教对象被清');
  assert.equal(fixture.store.get('flag:2'), 32, ':212-213 上次助手不受影响');
  const texts = fixture.text_lines();
  assert(
    texts.some((line) => line.includes('一些贪婪的魔物')),
    '开场白',
  );
  assert(
    texts.some((line) => line.includes('资金清零了。')),
    '资金清零播报',
  );
  assert(
    texts.some((line) => line.includes('角色31被炸死了。')),
    '受害者的死亡播报（SAVESTR 读 callname）',
  );
});

test('#401 DEBUG_CHECK：一周目主线进了结局档（EX_FLAG:2801 % 100 >= 10）三段全不跑', async () => {
  const { fixture, debug_check } = setup_debug();
  fixture.store.set('flag:10004', 5000); // 改钱
  fixture.store.set('exflag:2801', 10); // 档位 10 恰好卡在边界（< 10 才算未进结局）

  await debug_check(seq([]));
  assert.equal(fixture.store.get('flag:10004'), 5000, '结局档内不炸宝库');
  assert.equal(fixture.store.get('exflag:2802'), 1, '检测位仍然被置起');
  assert.deepEqual(fixture.text_lines(), []);

  // 第二段/第三段共用这道守卫（:237/:310），三处各走一次：只测第一段时，
  // 后两段的 `&& not_in_ending` 被删同样看不出
  const second = setup_debug();
  second.fixture.store.set('exflag:2801', 10); // 结局档
  second.fixture.store.set('cflag:31:9', 5000); // 失控奴隶 → 2803 = 31
  second.fixture.store.set('exflag:2803', 31);
  await second.debug_check(seq([]));
  assert.ok(
    second.fixture.chara_no.includes(31),
    '结局档内第二段不跑：失控的奴隶不该被除名',
  );
  assert.equal(second.fixture.store.get('exflag:2803'), 31, '触发位也不复位');

  const third = setup_debug();
  third.fixture.store.set('exflag:2801', 10); // 结局档
  third.fixture.store.set('cflag:0:9', 5000); // 魔王失控
  third.fixture.set_inputs(0);
  assert.equal(
    await third.debug_check(seq([])),
    0,
    '结局档内第三段不跑（不 QUIT）',
  );
  assert.equal(third.fixture.store.get('exflag:2804'), 1, '触发位留着');
  assert(
    !third.fixture.text_lines().some((line) => line.includes('大冲击')),
    '结局档内不打大冲击终幕',
  );
});

test('#401 DEBUG_CHECK 第二段：等级超 5000 的奴隶暴走，自身与近邻一起被炸死', async () => {
  const { fixture, debug_check } = setup_debug();
  fixture.store.set('cflag:31:9', 5000); // 等级 5000、状态位 0
  // 第一段不跑（钱没改），第二段的两次抽样都在 added = [0, 31, 32] 上：
  // 第一次 rand(3) = 1 → 角色 31（受害者）、第二次 rand(3) = 2 → 角色 32（近邻）
  assert.equal(await debug_check(seq([1, 2])), 0);

  assert.equal(fixture.store.get('exflag:2803'), 0, ':307 触发位复位');
  assert(!fixture.chara_no.includes(31), '暴走的奴隶被除名');
  assert(!fixture.chara_no.includes(32), '近邻陪葬');
  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('角色31被自己暴走的魔力炸得粉碎！')),
    ':251 暴走播报',
  );
  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('角色32因为房间就在角色31的旁边')),
    ':278 近邻播报',
  );
});

test(
  '#401 DEBUG_CHECK 第二段：抽不到可炸角色时按 5000 次上限退出（原作此处是死循环）',
  {
    timeout: 10000,
  },
  async () => {
    // 只有一个角色（主人 0）时，`RAND:CHARANUM` 永远抽到 0、`LOCAL:1 > 0`
    // 恒假——原作的 ELSEIF 空体不置 -1，DO 循环因此永不终止。本移植按意图
    // 补齐退出（文件头偏离二）：本用例在 5000 次抽样后正常返回，改回原样
    // 则由下方自守抛出（同步死循环挂不住 timeout，见第一段的说明）
    const { fixture, debug_check } = setup_debug();
    fixture.store.set('cflag:31:9', 5000); // 2803 = 31
    fixture.store.set('exflag:2803', 31);
    // 受害者 31 不在在场名单里也可达：把 31 移出名单后再跑第二段
    fixture.era.removeCharacter(31);
    fixture.era.removeCharacter(32);
    // 抽取自守（缘由同第一段：同步死循环不会被 timeout 打断）
    let draws = 0;
    const rand = () => {
      draws += 1;
      assert.ok(
        draws <= 5000,
        '抽取次数超过 5000（放弃支被删或被改；原作此处会死循环）',
      );
      return 0;
    };
    assert.equal(await debug_check(rand), 0);
    assert.equal(draws, 5000, '恰好抽 5000 次后放弃（LOCAL:5 < 5000 的守卫）');
    assert.equal(fixture.store.get('exflag:2803'), 0);
  },
);

test(
  '#401 DEBUG_CHECK 第一段：抽不到可炸角色时按 5000 次上限退出（原作此处是死循环）',
  {
    timeout: 10000,
  },
  async () => {
    // 第一段的同款出口（:230-231 有 LOCAL:1 = -1，与第二段不同、原作在此是
    // 正确的）：全场只剩主人一个时 RAND 恒抽到 0、`LOCAL:1 > 0` 恒假
    const { fixture, debug_check } = setup_debug();
    fixture.era.removeCharacter(31);
    fixture.era.removeCharacter(32);
    fixture.store.set('flag:10004', 5000); // 改钱 → 第一段点火
    // 抽取自守：把「放弃」那一支删掉时循环不再终止，而**同步死循环不会
    // 被 node:test 的 timeout 打断**（事件循环整个被占住）——让它超界抛出，
    // 红得起来才叫守住了
    let draws = 0;
    const rand = () => {
      draws += 1;
      assert.ok(
        draws <= 5000,
        '抽取次数超过 5000（放弃支被删或被改；原作此处会死循环）',
      );
      return 0;
    };
    assert.equal(await debug_check(rand), 0);
    assert.equal(draws, 5000, '恰好抽 5000 次后放弃（LOCAL:5 < 5000 的守卫）');
    assert.equal(fixture.store.get('exflag:2802'), 0, '触发位仍要复位');
  },
);

test(
  '#401 DEBUG_CHECK：两段搜索共用同一个预算（LOCAL:5 是同一个局部量）',
  {
    timeout: 10000,
  },
  async () => {
    // 原作两段 DO 都在自增 LOCAL:5（:204 / :276），第二段的 5000 次预算接着
    // 第一段算。两支拆成独立计数器时本题会掷 10000 次，这里只允许 5001：
    // 第二段是 DO 循环，先抽一次再看预算，故多一掷
    const { fixture, debug_check } = setup_debug();
    fixture.era.removeCharacter(31);
    fixture.era.removeCharacter(32);
    fixture.store.set('flag:10004', 5000); // 改钱 → 第一段点火
    fixture.store.set('exflag:2803', 31); // 第二段也点火（该角色已不在场）
    let draws = 0;
    assert.equal(
      await debug_check(() => {
        draws += 1;
        return 0;
      }),
      0,
    );
    assert.equal(
      draws,
      5001,
      '第一段用光预算后第二段立刻放弃——各自 5000 会到 10000',
    );
  },
);

test('#401 DEBUG_CHECK 第三段：魔王本人等级超 5000 → 大冲击 GAMEOVER', async () => {
  const { fixture, debug_check } = setup_debug();
  fixture.store.set('cflag:0:9', 5000);
  fixture.set_inputs(0); // :330 INPUT

  await assert.rejects(() => debug_check(seq([])), /quit/, ':331 QUIT');
  assert.equal(fixture.store.get('exflag:2804'), 0, ':323 触发位复位');
  const texts = fixture.text_lines();
  assert(
    texts.some((line) => line.includes('你的魔力失控！发生大爆炸！')),
    ':324 播报',
  );
  assert(
    texts.some((line) =>
      line.includes('-------------------------------GAMEOVER-------'),
    ),
    ':329 GAMEOVER 横幅',
  );
});
