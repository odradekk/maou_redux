/**
 * ere/dungeon/dungeon.js @DUNGEON + @CHECK_STATUS + @GET_JUNK_ITEM +
 * @GET_DOWN_ENEMY 的行为测试（issue #172，阶段 3 H3）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经
 * run_dungeon / get_junk_item 的 rand 参数注入（enter-enemy.js 先例）：
 *   - zero = () => 0（WALK = 0：不推进，测滞留/提前返回）
 *   - max = (n) => n - 1（WALK = 19 + 6×9 = 73：每次调用稳定推进）
 *
 * 验收对应（#172 清单）：
 *   - turnend-settle 两处守卫（探索 :116 / 战役 :93）实测能被勇者触发；
 *   - 层数从 1 推进到 9 有测试，第 9 层且 TALENT:122 == 0 时走到 ENDING_2
 *     接入存根；
 *   - TALENT:122（冒险者）为真时不走向结局（回头臂 + 挑战臂）；
 *   - CFLAG:530 == 1 的提前返回、CFLAG:1 == 3 的迎击分叉各有测试；
 *   - @GET_DOWN_ENEMY 复活后的资金结算（9 处调用点的公共本体）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 所有掷骰恒 0（RAND:N == 0；WALK = 0：不推进） */
const zero = () => 0;
/** 所有掷骰恒最大（RAND:N == N-1；WALK = 19 + 6×9 = 73：稳定推进） */
const max = (n) => n - 1;
/** 所有掷骰恒 1（RAND:N == 1；GET_JUNK_ITEM 的乘数项用） */
const one = () => 1;

function load(fixture) {
  return fixture.load_module('dungeon/dungeon');
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 占位行按「原作 @函数名，」精确计数 */
function stub_count(fixture, name) {
  return text_lines(fixture).filter((line) => line.includes(`原作 @${name}，`))
    .length;
}

/**
 * 最小世界：魔王 0 + 勇者 1（阿尔）。体力气力全满（CHECK_STATUS 恒判
 * 元气满满、踏破后的体力富余检查恒通过——本票存根下勇者不掉血，推进
 * 不受阻碍正是预期行为，#168 裁定 1）。
 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  // 基础属性：HP/气力满值（BASE = MAXBASE → 百分比 100）
  for (const cid of [0, 1]) {
    fixture.store.set(`maxbase:${cid}:0`, 2000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`base:${cid}:0`, 2000);
    fixture.store.set(`base:${cid}:1`, 1000);
  }
  // 勇者 1：侵攻中（CFLAG:1 = 2）、第 1 层（CFLAG:501）、侵攻度 0
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:501', 1);
  return fixture;
}

/** 装载三档链并触发一次 EVENTTURNEND（era_flag.time 由调用方控制） */
async function emit_turnend(fixture) {
  fixture.load_module('event/event-turnend');
  fixture.load_module('system/turnend-settle');
  fixture.load_module('event/event-turnend-later');
  const { emit } = fixture.load_module('system/event/registry');
  await emit('EVENTTURNEND');
}

// —— 接入点之一（turnend-settle :116，勇者探索）——

test('接入点·探索臂：CFLAG:1 == 2 的勇者让 run_dungeon 真跑（侵攻度推进）', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  // 关闭勇者来袭（#168 裁定 4 的隔离开关：本用例只要既有勇者推进，不要
  // 日推进再生成新的）
  fixture.disable_enter_enemy();

  era_flag.time = 1;
  await emit_turnend(fixture);
  // 随机源不可注入 emit 链（run_dungeon 缺省 Math.random）——改断言
  // 「侵攻度被写过」：WALK ∈ [0, 73]，踏破判定 D:20 >= 100 单次不达，
  // 502 应等于 WALK（0..73）
  const degree = fixture.store.get('cflag:1:502');
  assert(
    typeof degree === 'number' && degree >= 0 && degree <= 73,
    `侵攻度应被 run_dungeon 写为 WALK（实测 ${degree}）`,
  );
});

test('接入点·战役臂：CFLAG:1 == 12 的角色让 :93 守卫为真（战役用词）', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.disable_enter_enemy();
  fixture.store.set('cflag:1:1', 12); // 战役中

  era_flag.time = 1;
  await emit_turnend(fixture);
  // 战役臂 run_dungeon 跑过：MAPC 是「迷宫」（战役用词）的踏破演出不会
  // 出现（单次 WALK ≤ 73 层数不够），但结算后 flag:400 == 0 的复位块把 12 → 0，
  // 侵攻度被写。断言复位与写径都发生过。
  assert.equal(
    fixture.store.get('cflag:1:1'),
    0,
    '战役复位块（flag:400 == 0 && CFLAG:1 == 12 → 0）在 run_dungeon 之后执行',
  );
  const degree = fixture.store.get('cflag:1:502');
  assert(
    typeof degree === 'number' && degree >= 0 && degree <= 73,
    `战役臂的 run_dungeon 写过侵攻度（实测 ${degree}）`,
  );
});

// —— 层数推进 1 → 9 与 ENDING_2 接入（验收「此行为必须有测试」）——

test('贯通：max 随机源下层数 1 → 9，第 9 层踏破触发 ENDING_2 真身（quit 炸穿）', async () => {
  const fixture = setup_world();
  const { run_dungeon } = load(fixture);

  // max 下 WALK = 73：侵攻度 0 → 73（第一次）→ 146 ≥ 100（第二次踏破）。
  // 每层两次调用；8 次踏破到第 9 层，第 9 层再两次触发「魔王的房间」
  for (let i = 0; i < 8 * 2; i += 1) {
    await run_dungeon(1, max);
  }
  assert.equal(
    fixture.store.get('cflag:1:501'),
    9,
    '八次踏破后到达第 9 层（CFLAG:501）',
  );
  assert.equal(
    fixture.store.get('cflag:1:508'),
    8,
    '再起点 CFLAG:508 同步 +8（起始 0）',
  );

  // 第 9 层的踏破：D:20 再次到 100 → FLOOR >= 9 → 魔王的房间 → ENDING_2
  // 真身（#173 起）：演出 + INPUT + QUIT（throw 型，#148）炸穿 run_dungeon
  fixture.set_inputs(0); // :55 INPUT（确认用）
  let caught;
  for (let i = 0; i < 2; i += 1) {
    try {
      await run_dungeon(1, max);
    } catch (e) {
      caught = e;
    }
  }
  assert(
    caught instanceof Error && caught.message === 'quit',
    '第 9 层踏破 → JUMP ENDING_2 → QUIT 异常炸穿（真 GAMEOVER）',
  );
  const texts = text_lines(fixture);
  assert(
    texts.includes('这里是魔王的房间………'),
    '第 9 层踏破打出「这里是魔王的房间………」',
  );
  assert(
    texts.includes(
      '｜　　　　　　新的女勇者，终于攻陷了魔王的地下城　　　　　　｜',
    ),
    'ENDING_2 横幅演出（真身）',
  );
  assert(
    texts.includes('*勇者阿尔封印了魔王，被后人歌颂为传说中的勇者*'),
    '封印播报取 TARGET（= 队长 1）的 callname（%SAVESTR:TARGET%）',
  );
  assert(
    texts.includes(
      '-------------------------------GAMEOVER---------------------------------',
    ),
    'GAMEOVER 分隔行（:54）',
  );
  // JUMP 语义：ENDING_2 的 QUIT 之后本回合不再执行——:749 的侵攻度写回
  // 不可达，502 停在上一次（第 17 次）调用写回的 73，而不是本次踏破的
  // 0 或 146
  assert.equal(
    fixture.store.get('cflag:1:502'),
    73,
    'ENDING_2 后 :749 的侵攻度写回不可达',
  );
});

test('贯通·战斗真身（H6）：推进全程战斗确实发生、勇者气力被消耗，直到结局', async () => {
  const fixture = setup_world();
  // 第 1 层放毒沼（H8 房间真身的确定性输出锚点）：勇者恰在第 1 层滞留一
  // 次（第 1 次调用 walk = 73 ∈ (0,100) 滞留臂；第 2 次踏破后房间读的是
  // 已推进的第 2 层），毒沼的 10 点伤害（DMG = CFLAG:0:9 + 10）是
  // DUNGEON_ROOM 真身跑过的直接证据——存根期此锚点靠占位行计数
  fixture.store.set('flag:350', 501);
  const { run_dungeon } = load(fixture);
  // H6（#175）起 DUNGEON_PARTY_BATTLE 是真身：每轮滞留都发生战斗、
  // 战斗的逃跑段（TURN > 5，max 下 rand(3) = 2 ≠ 0 必成）扣勇者气力
  // RAND:30 = 29。第 18 次调用踏破第 9 层 → ENDING_2 真身 quit（#173）。
  // 判据换正向：战斗确实扣了气力（存根态此值为满值 1000），推进本身
  // 不受阻挡（max 下 WALK 恒 73，层数轨迹与 H3 相同——随机源注入与
  // 序列无关，见下一条对比测试的论证）
  fixture.set_inputs(0);
  let caught;
  for (let i = 0; i < 8 * 2 + 2; i += 1) {
    try {
      await run_dungeon(1, max);
    } catch (e) {
      caught = e;
    }
  }
  assert(
    caught instanceof Error && caught.message === 'quit',
    '以 ENDING_2 的 QUIT 收场（贯通终点不因战斗接入而断）',
  );
  assert.equal(
    fixture.store.get('cflag:1:1'),
    2,
    '满状态的勇者不被战斗打退（怪物侧攻击的原作缺陷形态，见 dungeon-battle.js 文件头）',
  );
  const wp = fixture.store.get('base:1:1');
  assert(
    typeof wp === 'number' && wp < 1000,
    `战斗确实扣了勇者气力（实测 ${wp} < 满值 1000；逃跑段 -RAND:30 × 战斗数）`,
  );
  // 存根占位行已退场（真身不产占位行）
  assert.equal(
    stub_count(fixture, 'DUNGEON_PARTY_BATTLE'),
    0,
    '队伍战斗真身（无占位行）',
  );
  // H8（#177）房间真身的正向锚点：第 1 层毒沼恰结算一次（第 1 次调用的
  // 滞留臂后），2000 - 10 = 1990——战斗侧怪物攻击是原作缺陷形态（不打退
  // 也不掉 HP，见 dungeon-battle.js 文件头），HP 无其他写者，精确等值
  assert.equal(
    fixture.store.get('base:1:0'),
    1990,
    '房间设施真身（毒沼 10 点伤害恰一次）',
  );
  assert.equal(
    stub_count(fixture, 'DUNGEON_ROOM'),
    0,
    '房间设施真身（无占位行）',
  );
});

// —— TALENT:122（冒险者）不走结局（验收「另一条臂有测试」）——

test('冒险者·回头臂：RAND:4 != 0 时放弃英雄梦，写挫折记忆，不进 ENDING_2', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:122', 1); // 冒险者（男人位非零）
  const { run_dungeon } = load(fixture);

  for (let i = 0; i < 8 * 2 + 2; i += 1) {
    await run_dungeon(1, max);
  }
  assert.equal(fixture.store.get('cflag:1:501'), 9, '冒险者同样推进到第 9 层');
  assert.equal(stub_count(fixture, 'ENDING_2'), 0, '无 ENDING_2 占位行');
  // 真身（#173）后的守卫判据：不抛 quit、无 quit 调用——冒险者
  // （TALENT:122 真）到第 9 层也不进结局（回头/挑战臂，验收线）
  assert(
    !fixture.calls.some(({ api }) => api === 'quit'),
    '冒险者不走结局（TALENT:122 真 → 无 QUIT）',
  );
  const texts = text_lines(fixture);
  assert(
    texts.includes('作为冒险者而非勇者的他深知自己无法击败魔王。'),
    '冒险者独有演出行',
  );
  assert(
    texts.includes('阿尔放弃了成为英雄的念头，开始回头了。'),
    'RAND:4 != 0 → 回头臂（max 下 RAND:4 = 3 ≠ 0）',
  );
  // :218-221 挫折记忆四连写
  assert.equal(fixture.store.get('cflag:1:507'), 1, 'CFLAG:507 = 1 撤退中');
  assert.equal(fixture.store.get('cflag:1:508'), 7, 'CFLAG:508 = 7');
  assert.equal(fixture.store.get('cflag:1:521'), 7, 'CFLAG:521 = 7（存档点）');
  assert.equal(fixture.store.get('cflag:1:520'), 8, 'CFLAG:520 = 8');
});

test('冒险者·挑战臂：RAND:4 == 0 且魔王欲望不足 → 失败成为奴隶（CFLAG:1 = 0）', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:122', 1);
  const { run_dungeon } = load(fixture);
  // 混合随机：WALK 计算要大（19/9 段与 10 段），RAND:4 恒 0 挑战
  const mixed = (n) => (n === 4 ? 0 : n - 1);

  for (let i = 0; i < 8 * 2 + 2; i += 1) {
    await run_dungeon(1, mixed);
  }
  assert.equal(stub_count(fixture, 'ENDING_2'), 0, '不走结局');
  assert(
    !fixture.calls.some(({ api }) => api === 'quit'),
    '挑战臂同样无 QUIT（TALENT:122 真）',
  );
  const texts = text_lines(fixture);
  assert(
    texts.includes('但阿尔仍是向魔王发起了挑战。'),
    'RAND:4 == 0 → 挑战臂',
  );
  // 魔王 abl:0:11 欲望 0（未 seed）→ 不满足寝取条件 → 失败臂
  assert(
    texts.includes('可想而知阿尔失败了、成为了地下城里众多奴隶的一员。'),
    '挑战失败演出',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 0, 'CFLAG:1 = 0（成为奴隶）');
});

// —— CFLAG:530 == 1 提前返回 与 迎击分叉（验收各有测试）——

test('行动完了：CFLAG:530 == 1 直接返回，不推进不打演出', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:530', 1);
  const { run_dungeon } = load(fixture);

  const ret = await run_dungeon(1, max);
  assert.equal(ret, 0, 'RETURN 0');
  assert.equal(fixture.store.get('cflag:1:502') ?? 0, 0, '侵攻度不动');
  const texts = text_lines(fixture);
  assert.equal(texts.length, 0, '无任何演出行（连开场段都在守卫之后）');
});

test('行动完了·迎击：CFLAG:1 == 3 时先走 DUNGEON_SPY 真身（H6）再返回', async () => {
  const fixture = setup_world();
  // 潜入奴隶 2：迎击中、行动完了（以同伴身份追随队长勇者 1）
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(2);
  fixture.store.set('maxbase:2:0', 2000);
  fixture.store.set('maxbase:2:1', 1000);
  fixture.store.set('base:2:0', 2000);
  fixture.store.set('base:2:1', 1000);
  fixture.store.set('cflag:1:1', 2); // 队长勇者 1：侵攻中
  fixture.store.set('cflag:2:1', 3); // 奴隶 2：迎击中（潜入）
  fixture.store.set('cflag:2:530', 1); // 行动完了
  fixture.store.set('cflag:2:533', 1); // 队长记忆 = 勇者 1
  fixture.store.set('cflag:1:531', 2); // 勇者 1 的仲間A = 奴隶 2
  const { run_dungeon } = load(fixture);

  await run_dungeon(2, max);
  // DUNGEON_SPY 真身：对队长勇者 1 的工作活动（SPY_BATTLE 三分支）扣
  // HP/气力 10 起（max 下走「下剤投与」分支：HDMG = 10、MDMG = 10）
  assert.equal(
    stub_count(fixture, 'DUNGEON_SPY'),
    0,
    '迎击潜入真身（无占位行）',
  );
  const hero_hp = fixture.store.get('base:1:0');
  const hero_wp = fixture.store.get('base:1:1');
  assert(
    typeof hero_hp === 'number' && hero_hp < 2000 && hero_wp < 1000,
    `工作活动扣了勇者的 HP/气力（实测 ${hero_hp}/${hero_wp}）`,
  );
  assert.equal(fixture.store.get('cflag:2:502') ?? 0, 0, '奴隶不推进侵攻度');
});

test('迎击分叉：侵攻度倒退（D:20 -= WALK），踏破臂走「回到阶层」', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 3); // 迎击中
  fixture.store.set('cflag:1:502', 200); // 侵攻度已满
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, max);
  // 200 - 73 = 127 ≥ 100 → 迎击踏破臂：FLOOR(1) < 9 → 501 + 1
  assert.equal(fixture.store.get('cflag:1:501'), 2, '迎击方回到第 2 阶层');
  assert.equal(fixture.store.get('cflag:1:502'), 10, 'D:20 = 10（:275）');
  assert(
    text_lines(fixture).includes('阿尔回到了第2阶层。'),
    '迎击踏破演出（回到阶层）',
  );
});

test('迎击分叉·魔王的房间：FLOOR >= 9 的踏破写 502 = 100、507 = 0', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('cflag:1:501', 9);
  fixture.store.set('cflag:1:502', 200);
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, max);
  assert(
    text_lines(fixture).includes('阿尔返回了魔王的房间。'),
    ':268 迎击方的终点演出',
  );
  assert.equal(fixture.store.get('cflag:1:502'), 100, 'D:20 = 100');
  assert.equal(fixture.store.get('cflag:1:507'), 0, 'CFLAG:507 = 0');
});

test('迎击分叉·被推出：D:20 <= 0 且 FLOOR <= 1 → 走出迷宫回城（505 分档）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 3);
  const { run_dungeon } = load(fixture);

  // zero 下 WALK = 0，D:20 = 0 → <= 0 臂 → 迎击子臂「踏破了这一层！」
  await run_dungeon(1, zero);
  assert(
    text_lines(fixture).includes('阿尔踏破了这一层！'),
    ':329 迎击方的「踏破」（收回）演出',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 6, 'CFLAG:505 == 0 → 状态 6');
});

test('迎击分叉·方向辨析：D:20 = 50 时倒退穿 0 被推出（+= 变异则踏破推进）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('cflag:1:502', 50);
  const { run_dungeon } = load(fixture);

  // max 下 WALK = 73：50 - 73 = -23 ≤ 0 → 被推出臂（floor 1 → 回城）；
  // 若方向被改坏（+=），50 + 73 = 123 ≥ 100 会走踏破臂推到第 2 层
  await run_dungeon(1, max);
  assert.equal(
    fixture.store.get('cflag:1:1'),
    6,
    'D:20 穿 0 → 被推出迷宫回城（CFLAG:505 == 0 → 状态 6）',
  );
  assert.equal(fixture.store.get('cflag:1:501'), 1, '不推进层数');
  assert(
    text_lines(fixture).includes('再往前走就走出地下城了………'),
    ':340 走出迷宫演出',
  );
});

test('迎击分叉·战斗：0 < D:20 < 100 滞留时走 DUNGEON_BATTLE2_PARTY 真身（H6）', async () => {
  const fixture = setup_world();
  // 迎击奴隶 1 找同层的侵攻勇者 2 决斗（对象选择的 1/3 跳过用 rand(3) = 1
  // 避开——zero 会命中跳过分支）
  fixture.seed_chara(2, { id: 2, name: '勇者甲', callname: '勇者甲' });
  fixture.era.addCharacter(2);
  fixture.store.set('maxbase:2:0', 2000);
  fixture.store.set('maxbase:2:1', 1000);
  fixture.store.set('base:2:0', 2000);
  fixture.store.set('base:2:1', 1000);
  fixture.store.set('cflag:1:1', 3); // 奴隶 1：迎击中
  fixture.store.set('cflag:1:11', 60); // 攻击力（DUEL 才有杀伤）
  fixture.store.set('cflag:1:12', 20);
  fixture.store.set('cflag:1:502', 50);
  fixture.store.set('cflag:1:533', 1);
  fixture.store.set('cflag:2:1', 2); // 勇者 2：侵攻中、同层
  fixture.store.set('cflag:2:11', 10);
  fixture.store.set('cflag:2:12', 5);
  fixture.store.set('cflag:2:501', 1);
  const { run_dungeon } = load(fixture);

  const not_first = (n) => (n === 3 ? 1 : 0); // rand(3) = 1（不跳过）、其余 0
  await run_dungeon(1, not_first); // WALK = 0 → D:20 = 50 滞留 → 迎击战斗
  assert.equal(
    stub_count(fixture, 'DUNGEON_BATTLE2_PARTY'),
    0,
    '迎击战斗真身（无占位行）',
  );
  const enemy_wp = fixture.store.get('base:2:1');
  assert(
    typeof enemy_wp === 'number' && enemy_wp < 1000,
    `对人格斗扣了勇者气力（实测 ${enemy_wp} < 1000；DUEL_ATTACK 的 MDMG）`,
  );
  assert.equal(fixture.store.get('cflag:1:514'), 1, '阶层滞在计数 +1');
});

// —— 撤退臂（勇者 D:20 <= 0）——

test('勇者撤退：D:20 <= 0 且 FLOOR <= 1 → 走到迷宫外（DUNGEON_TOWN 真身）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:502', 0);
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, zero);
  assert(
    text_lines(fixture).includes('阿尔回到了地下城外面。'),
    ':291 撤到迷宫外',
  );
  // #178 起城镇事件走真身（ere/dungeon/dungeon-town.js）：zero 随机下
  // 受注段必达（SET_QUEST 的 534 = 1）——以受注播报钉「真身被调用」
  assert(
    text_lines(fixture).some((l) => l.includes('阿尔接受了任务！')),
    ':295 城镇事件真身（受注播报）',
  );
  assert.equal(fixture.store.get('cflag:1:502'), 0, 'D:20 = 0');
});

test('勇者撤退·第 5 层：FLOOR == 5 直接视为 1（中转层）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:501', 5);
  fixture.store.set('cflag:1:502', 0);
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, zero);
  assert(
    text_lines(fixture).includes('阿尔回到了地下城外面。'),
    ':288-289 第 5 层撤退直接按 1 层处理（回到外面）',
  );
});

test('勇者撤退·深层：FLOOR > 1 时退一层、侵攻度回 90', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:501', 3);
  fixture.store.set('cflag:1:502', 0);
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, zero);
  assert.equal(fixture.store.get('cflag:1:501'), 2, 'CFLAG:501 -= 1');
  assert.equal(fixture.store.get('cflag:1:502'), 90, 'D:20 = 90（快速再入）');
  assert(text_lines(fixture).includes('阿尔回到了第2阶层。'), ':319 撤退演出');
});

// —— 滞留臂与奴隶归还 ——

test('迎击奴隶滞留：514 > 15 时归还（状态 5/6 分档）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('cflag:1:502', 50);
  fixture.store.set('cflag:1:514', 15); // 本次 +1 后为 16 > 15
  fixture.store.set('cflag:1:505', 3); // 有讨伐数 → 状态 5
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, zero);
  assert(
    text_lines(fixture).includes('阿尔在此长期滞留感到十分疲乏……'),
    ':362 滞留疲乏演出',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 5, 'CFLAG:505 > 0 → 状态 5');
  assert.equal(fixture.store.get('cflag:1:514'), 0, '滞在计数复位');
});

// —— @GET_DOWN_ENEMY（复活，依据 #103；9 处调用点的公共本体）——

test('GET_DOWN_ENEMY：所持金百分之一充公、新人标志、演出', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:580', 12345);
  fixture.store.set('flag:10004', 500); // MONEY（包装层）
  fixture.store.set('exflag:4444', 100); // EX_FLAG:4444
  const { get_down_enemy } = load(fixture);

  await get_down_enemy(1);
  const texts = text_lines(fixture);
  assert(texts.includes('阿尔被抓住了…'), ':1082 通常演出（善恶 0 > -150）');
  assert(texts.includes('获得123G！'), ':1086 充公播报');
  assert.equal(fixture.store.get('flag:10004'), 623, 'MONEY += 580/100');
  assert.equal(fixture.store.get('exflag:4444'), 223, 'EX_FLAG:4444 镜像');
  assert.equal(fixture.store.get('cflag:1:580'), 0, '所持金清零');
  assert.equal(fixture.store.get('cflag:1:506'), 1, '新人标志 CFLAG:506 = 1');
  assert.equal(fixture.store.get('cflag:1:507'), 0, 'CFLAG:507 = 0');
});

test('GET_DOWN_ENEMY·投诚臂：善恶 <= -150 且侵攻中', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:151', -200);
  const { get_down_enemy } = load(fixture);

  await get_down_enemy(1);
  assert(
    text_lines(fixture).includes('阿尔背叛了使命，向魔王军投诚了……'),
    ':1080 投诚演出',
  );
});

// —— @GET_JUNK_ITEM ——

test('GET_JUNK_ITEM：基数 = 100 + 等级 × RAND(√(魔王等级 + 等级 + 1))，乘阶层', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:0:9', 25); // 魔王等级（CFLAG:MASTER:9）
  fixture.store.set('cflag:1:9', 10); // 勇者等级
  const { get_junk_item } = load(fixture);
  // √(25 + 10 + 1) = √36 = 6；one → 10 × 1 = 10；100 + 10 = 110；
  // 无素质补正；×阶层 1 = 110
  await get_junk_item(1, one);
  assert.equal(fixture.store.get('cflag:1:581'), 110, '基础公式（阶层 1）');
});

test('GET_JUNK_ITEM：好奇心 +10、为钱 +20、霍比特/矮人 +30、盗贼 1.5 倍', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:0:9', 0);
  fixture.store.set('cflag:1:9', 0);
  fixture.store.set('cflag:1:501', 2); // 阶层 2
  fixture.store.set('talent:1:23', 1); // 好奇心
  fixture.store.set('talent:1:316', 2); // 成为勇者的契机 == 2（为钱）
  fixture.store.set('talent:1:314', 10); // 种族 == 10（霍比特）
  const { get_junk_item } = load(fixture);
  // 100 + 0；+10 +20 +30 = 160；无盗贼；×2 = 320
  await get_junk_item(1, one);
  assert.equal(fixture.store.get('cflag:1:581'), 320, '四项素质补正');
});

test('GET_JUNK_ITEM：盗贼 1.5 倍与下限 1', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:0:9', 0);
  fixture.store.set('cflag:1:9', 0);
  fixture.store.set('cflag:1:501', 1);
  fixture.store.set('talent:1:203', 1); // 盗贼
  const { get_junk_item } = load(fixture);
  // 100 → +50 = 150；×1 = 150
  await get_junk_item(1, one);
  assert.equal(fixture.store.get('cflag:1:581'), 150, '盗贼 +LOCAL/2');

  // 下限：阶层 0（数值实验位）→ LOCAL *= 0 → 钳 1
  const fixture2 = setup_world();
  fixture2.store.set('cflag:1:501', 0);
  const { get_junk_item: gj2 } = load(fixture2);
  await gj2(1, one);
  assert.equal(fixture2.store.get('cflag:1:581'), 1, ':1066-1067 下限 1');
});

// —— @CHECK_STATUS ——

test('CHECK_STATUS：满状态判元气满满（CFLAG:534 = 1，STATUS[0]）', async () => {
  const fixture = setup_world();
  const { check_status } = load(fixture);

  const status = await check_status(1);
  assert.equal(fixture.store.get('cflag:1:534'), 1, '状态档 1');
  assert.equal(status[0], 1, 'STATUS:0（元气满满计数）');
  assert.equal(status[7], 0, '评级 0');
  assert(text_lines(fixture).includes('阿尔元气满满。'), '演出行');
});

test('CHECK_STATUS：HP 半血判轻伤（首分支吞并，原作现状）', async () => {
  const fixture = setup_world();
  fixture.store.set('base:1:0', 1000); // 50% < 60
  const { check_status } = load(fixture);

  const status = await check_status(1);
  assert.equal(fixture.store.get('cflag:1:534'), 2, '状态档 2（轻伤）');
  assert.equal(status[1], 1, 'STATUS:1（轻伤计数）');
  assert(status[7] >= 1, '评级计入轻伤 +1');
});

test('CHECK_STATUS：mode = 1 静默（AGENT 版新增的 MODE 参数）', async () => {
  const fixture = setup_world();
  const { check_status } = load(fixture);

  await check_status(1, 1);
  assert.equal(text_lines(fixture).length, 0, '非 0 MODE 不打演出');
});

test('CHECK_STATUS：待机角色（CFLAG:1 == 0）不判定不写档', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('base:1:0', 100);
  const { check_status } = load(fixture);

  const status = await check_status(1);
  assert.equal(
    fixture.store.get('cflag:1:534') ?? 0,
    0,
    '未写档（undefined 兜底 0）',
  );
  assert.equal(status[0], 0, '无判定计数');
});

// —— 撤退决议（单人队的 534 × 素质臂）——

test('撤退决议：轻伤 + 胆小（TALENT:10）提前撤退并写 520', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:502', 50);
  fixture.store.set('base:1:0', 1000); // 50% → 轻伤（534 = 2）
  fixture.store.set('talent:1:10', 1); // 胆小
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, zero); // WALK 0 → 滞留 → 战斗（存根）→ 判定 → 决议
  assert(
    text_lines(fixture).includes(
      '胆小的阿尔虽然只是受到轻伤，依然决定撤退。（现在第1层）',
    ),
    ':686 胆小撤退演出',
  );
  assert.equal(fixture.store.get('cflag:1:507'), 1, 'CFLAG:507 = 1');
  assert.equal(
    fixture.store.get('cflag:1:520'),
    1,
    '520 = FLOOR - 1 钳到 1（:703-704）',
  );
});

test('撤退决议：满状态继续前进', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:502', 50);
  const { run_dungeon } = load(fixture);

  await run_dungeon(1, zero);
  assert(
    text_lines(fixture).includes('阿尔决定继续在地下城内前进……（现在第1层）'),
    '继续攻略演出',
  );
  assert.equal(fixture.store.get('cflag:1:507') ?? 0, 0, '不立撤退标志');
});

// —— #184 返工 1：H3 留的 DUNGEON_BITCH 存根换真身（运行时可达）——

test('战后探索：run_dungeon 调用卖春真身（#184 接线，非存根占位行）', async () => {
  const fixture = setup_world();
  const { run_dungeon } = load(fixture);

  // 替换真身模块导出为 spy（dungeon.js 不解构、属性查找在调用时——与
  // disable_enter_enemy 同款手法）：断言 :718 真的调用到 kojo-dungeon-bitch
  // 的真身，而不是 #172 遗留的本地存根占位行
  const mod = fixture.load_module('kojo/kojo-dungeon-bitch');
  const calls = [];
  const orig = mod.dungeon_bitch;
  mod.dungeon_bitch = async (cid, rand) => {
    calls.push({ cid, rand });
    return 0;
  };

  try {
    // zero 随机源：RAND:N == 0 → 戦闘後探索的受者 1/3 掷选（RAND:3 == 0 &&
    // SIDEA > 0 不成立、RAND:2 == 0 && SIDEB > 0 不成立）→ after_target = arg0
    await run_dungeon(1, zero);
  } finally {
    mod.dungeon_bitch = orig; // 还原，避免污染同文件后续用例
  }

  assert.equal(calls.length, 1, ':718 恰好调用一次真身');
  assert.equal(calls[0].cid, 1, '受者 = arg0（无 SIDEA/SIDEB 时）');
  assert.equal(
    typeof calls[0].rand,
    'function',
    'rand_n 透传（迷宫与卖春共用随机源）',
  );
});
