/**
 * ere/dungeon/dungeon-trap.js @DUNGEON_TRAP + 26 个陷阱段 + 诈骗陷阱 +
 * @SLAVE_TRAP_SET + @TRAP_PRICE 的行为测试（issue #176，阶段 3 H7）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经
 * dungeon_trap / 各陷阱函数的 rand 参数注入（enter-enemy.js 先例）：
 *   - seq(...v) 按消费顺序给定值（越界用末值兜底）；
 *   - 计数器 rand 断言「不掷骰」路径（全空槽的世界零随机消费——ENDING_2
 *     e2e 与 #175 对比测试的 PRNG 序列不因本票漂移的前提）。
 *
 * 验收对应（#176 清单）：
 *   - 26 个陷阱段 + 诈骗陷阱（TRAP_ID 87 的效果体）各有一条测试，断言
 *     效果落到正确的变量（HP/气力/宝珠/经验/CFLAG 位域/ITEM/MONEY）；
 *   - @TRAP_PRICE 价格表逐条有测试（含 86 空档与未登记 ID 的兜底 100）；
 *   - 主循环的 A/B/C 槽寻位、连击回避链、库存消耗与 513 记忆、自动补货、
 *     迎击方 SLAVE_TRAP_SET（补充/换金）各有测试；
 *   - D:20（侵攻度）经 ctx 对象与调用方共享——TELEPORT 的写回有测试
 *     （含 run_dungeon 集成：CFLAG:502 收到 TELEPORT 后的值）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 定值序列注入：按消费顺序取值，耗尽后用末值 */
function seq(...values) {
  let i = 0;
  return (n) => {
    const v = values[Math.min(i, values.length - 1)] ?? 0;
    i += 1;
    return Math.min(v, Math.max(n - 1, 0));
  };
}

/** 计数器注入：记录每次掷骰的上界（断言「不掷骰」路径用） */
function counting(calls) {
  return (n) => {
    calls.push(n);
    return 0;
  };
}

function load(fixture) {
  return fixture.load_module('dungeon/dungeon-trap');
}

/**
 * 最小世界：魔王 0 + 勇者 1（阿尔）。HP 2000 / 气力 1000 全满。勇者
 * 侵攻中（CFLAG:1 = 2）、第 1 层（CFLAG:501 = 1）、侵攻度 0。FLAG:5 = 0
 * （日志关——数值断言不受演出影响）。
 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  for (const cid of [0, 1]) {
    fixture.store.set(`maxbase:${cid}:0`, 2000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`base:${cid}:0`, 2000);
    fixture.store.set(`base:${cid}:1`, 1000);
  }
  fixture.store.set('cflag:1:1', 2); // 侵攻中
  fixture.store.set('cflag:1:501', 1); // 第 1 层
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// —— @TRAP_PRICE：价格表逐条（:1465-1520）——

test('TRAP_PRICE：27 个陷阱的价格逐条正确（含 87 诈骗、86 空档兜底 100）', () => {
  const fixture = setup_world();
  const { trap_price } = load(fixture);
  const expected = {
    60: 10,
    61: 50,
    62: 80,
    63: 100,
    64: 120,
    65: 150,
    66: 170,
    67: 180,
    68: 190,
    69: 1000,
    70: 180,
    71: 90,
    72: 10,
    73: 70,
    74: 200,
    75: 180,
    76: 300,
    77: 50,
    78: 110,
    79: 80,
    80: 60,
    81: 20,
    82: 40,
    83: 40,
    84: 40,
    85: 100,
    87: 100,
  };
  for (const [id, price] of Object.entries(expected)) {
    assert.equal(
      trap_price(Number(id)),
      price,
      `TRAP_PRICE(${id}) 应为 ${price}（:1465-1518 的 SIF 表逐条）`,
    );
  }
  // :1520 兜底：86 空档与未登记 ID 都是 100
  assert.equal(trap_price(86), 100, '86（空档）走兜底 100');
  assert.equal(trap_price(88), 100, '88（未登记）走兜底 100');
  assert.equal(trap_price(0), 100, '0（非陷阱）走兜底 100');
});

// —— 26 个陷阱段 + 诈骗陷阱：各一条，效果落到正确的变量 ——

test('PIT（:196）：伤害落体力、落下位置起（CFLAG:503 位 6）', async () => {
  const fixture = setup_world();
  const { pit_trap } = load(fixture);
  const ret = await pit_trap(1, seq(50, 39)); // DICE=50 → 普通档；RAND:40=39
  assert.equal(ret, 0, '作动（消耗）');
  assert.equal(
    fixture.store.get('base:1:0'),
    2000 - (39 + 1),
    '体力 -= RAND:40+1',
  );
  assert.equal(fixture.store.get('cflag:1:503'), 64, '落下位置起（位 6）');
  // 已落下时改扣气力、不再累加落下位
  fixture.store.set('cflag:1:503', 64);
  await pit_trap(1, seq(50, 39));
  assert.equal(fixture.store.get('cflag:1:503'), 64, '落下位不重复累加');
  assert.equal(fixture.store.get('base:1:1'), 1000 - 10, '连续落下扣气力 10');
  // 天使（TALENT:314 == 6）飞起避开（前两次调用已扣 40+40，重置后再测）
  fixture.store.set('base:1:0', 2000);
  fixture.store.set('talent:1:314', 6);
  assert.equal(await pit_trap(1, seq(0)), 1, '天使避开（未作动）');
  assert.equal(fixture.store.get('base:1:0'), 2000, '避开不扣血');
});

test('PIT 重伤档（:230-240）：DICE ×2，魔虫知识再 1.5 倍', async () => {
  const fixture = setup_world();
  const { pit_trap } = load(fixture);
  await pit_trap(1, seq(90, 39)); // DICE=90 ≥ 80 → (39+1)*2 = 80
  assert.equal(fixture.store.get('base:1:0'), 2000 - 80, '要害两倍伤害');
  fixture.store.set('base:1:0', 2000);
  fixture.store.set('talent:0:328', 1); // MASTER 魔虫知识
  await pit_trap(1, seq(90, 39));
  assert.equal(fixture.store.get('base:1:0'), 2000 - 120, '80 + 80/2 = 120');
});

test('ARROW（:265）：伤害落体力、怕痛者再扣气力', async () => {
  const fixture = setup_world();
  const { arrow_trap } = load(fixture);
  assert.equal(await arrow_trap(1, seq(10)), 1, 'Z<30 躲开（未作动）');
  await arrow_trap(1, seq(50)); // Z=50 → 普通档
  assert.equal(fixture.store.get('base:1:0'), 2000 - 50, '体力 -= Z');
  fixture.store.set('base:1:0', 2000);
  await arrow_trap(1, seq(90)); // Z=90 ≥ 80 → 90*2
  assert.equal(fixture.store.get('base:1:0'), 2000 - 180, '要害两倍伤害');
  fixture.store.set('talent:1:40', 1); // 怕痛
  fixture.store.set('base:1:0', 2000);
  await arrow_trap(1, seq(50));
  assert.equal(fixture.store.get('base:1:1'), 1000 - 30, '怕痛者气力 -30');
});

test('TELEPORT（:313）：侵攻度 D:20 经 ctx 写回（起点 1 / 随机 100）', async () => {
  const fixture = setup_world();
  const { teleport_trap } = load(fixture);
  const ctx = { d20: 50 };
  assert.equal(await teleport_trap(1, seq(80), ctx), 1, 'Z>70 躲开（未作动）');
  assert.equal(ctx.d20, 50, '躲开不改侵攻度');
  await teleport_trap(1, seq(10), ctx); // Z=10 < 20 → 回本层起点
  assert.equal(ctx.d20, 1, 'D:20 = 1（:330）');
  await teleport_trap(1, seq(50, 77), ctx); // 中间档 → 随机重置
  assert.equal(ctx.d20, 77, 'D:20 = RAND:100（:335）');
  assert.equal(fixture.store.get('base:1:1'), 1000, '无难度补正不扣气力');
});

test('ONE_WAY（:357）：侵攻度不足 40 不作动；迷路位置起（CFLAG:509）', async () => {
  const fixture = setup_world();
  const { one_way_trap } = load(fixture);
  assert.equal(
    await one_way_trap(1, seq(2), { d20: 39 }),
    1,
    'D:20 < 40 → 未作动（不消耗）',
  );
  assert.equal(
    await one_way_trap(1, seq(2), { d20: 40 }),
    0,
    'Z>1 找到路 → 作动（RETURN 0，:383）',
  );
  await one_way_trap(1, seq(0), { d20: 40 }); // Z=0 → 迷路
  assert.equal(fixture.store.get('cflag:1:509'), 1, '迷路位置起（迷惑状态）');
  assert.equal(
    fixture.store.get('base:1:1'),
    1000 - 20,
    '气力 -= 20 + FLAG:85*0',
  );
});

test('LOVE_GAS（:406）：欲情宝珠与气力按档落变量、欲情位置起（位 9）', async () => {
  const fixture = setup_world();
  const { love_gas_trap } = load(fixture);
  assert.equal(await love_gas_trap(1, seq(70)), 0, 'Z>60 屏息跑开也是作动');
  assert.equal(fixture.store.get('juel:1:5') ?? 0, 0, '跑开无宝珠');
  await love_gas_trap(1, seq(5)); // Z=5 < 10 大量档
  assert.equal(fixture.store.get('juel:1:5'), 40, '欲情宝珠 +40');
  assert.equal(fixture.store.get('base:1:1'), 1000 - 40, '气力 -40');
  assert.equal(
    (fixture.store.get('cflag:1:503') || 0) & 512,
    512,
    '欲情位置起（位 9，:457）',
  );
  fixture.store.set('talent:1:60', 1); // 容易自慰
  await love_gas_trap(1, seq(5));
  assert.equal(fixture.store.get('exp:1:10'), 1, '自慰经验 +1（第二次起）');
  assert.equal(fixture.store.get('juel:1:0'), 20, '乳房宝珠 +20（仅第二次）');
});

test('SYOKUSYU_FLOOR（:462）：触手经验与欲情宝珠、气力大量损耗', async () => {
  const fixture = setup_world();
  const { syokusyu_floor_trap } = load(fixture);
  assert.equal(await syokusyu_floor_trap(1, seq(80)), 1, 'Z>70 击退（未作动）');
  await syokusyu_floor_trap(1, seq(5)); // Z=5 < 15 大量档
  assert.equal(fixture.store.get('exp:1:55'), 1, '触手经验 +1');
  assert.equal(fixture.store.get('juel:1:5'), 120, '欲情宝珠 +120');
  assert.equal(fixture.store.get('base:1:1'), 1000 - 200, '气力 -200');
  assert.equal(
    (fixture.store.get('cflag:1:503') || 0) & 512,
    0,
    '本段不立欲情位（:521 无 SETBIT）',
  );
});

test('LOVE_BATH（:525）：淹没档双扣（体力气力各 200）+ 药物经验', async () => {
  const fixture = setup_world();
  const { love_bath_trap } = load(fixture);
  await love_bath_trap(1, seq(0)); // RAND:10 = 0 < 2 淹没
  assert.equal(fixture.store.get('exp:1:57'), 1, '药物经验 +1');
  assert.equal(fixture.store.get('juel:1:5'), 200, '欲情宝珠 +200');
  assert.equal(fixture.store.get('base:1:0'), 2000 - 200, '体力 -200');
  assert.equal(fixture.store.get('base:1:1'), 1000 - 200, '气力 -200');
  assert.equal(
    (fixture.store.get('cflag:1:503') || 0) & 512,
    512,
    '欲情位置起（:579）',
  );
});

test('SELF_SAIMIN（:585）：两档催眠自慰——攻防归零 / 减半，TARGET 指向受者', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { self_saimin_trap } = load(fixture);
  fixture.store.set('cflag:1:11', 100);
  fixture.store.set('cflag:1:12', 80);
  assert.equal(await self_saimin_trap(1, seq(70)), 1, 'DICE>60 清醒（未作动）');
  await self_saimin_trap(1, seq(5)); // DICE=5 < 10 深度
  assert.equal(fixture.store.get('cflag:1:11'), 0, '攻击力归零（:615）');
  assert.equal(fixture.store.get('cflag:1:12'), 0, '防御力归零（:616）');
  assert.equal(era_flag.target, 1, 'TARGET = A（:594）');
  fixture.store.set('cflag:1:11', 100);
  fixture.store.set('cflag:1:12', 80);
  await self_saimin_trap(1, seq(30)); // 浅度 → 减半
  assert.equal(fixture.store.get('cflag:1:11'), 50, '攻击力减半（:628）');
  assert.equal(fixture.store.get('cflag:1:12'), 40, '防御力减半（:629）');
  // 欲情中 → DICE ×0.80（TIMES 截断）：70 → 56 仍 >10 ≤60 走浅档；99 → 79 走浅档
  fixture.store.set('cflag:1:503', 512);
  fixture.store.set('cflag:1:11', 100);
  await self_saimin_trap(1, seq(70));
  assert.equal(
    fixture.store.get('cflag:1:11'),
    50,
    '70×0.8=56 浅档（欲情加成）',
  );
});

test('IMITATER（:635）：五宝珠齐涨 + 绝顶经验 + 攻防弱化', async () => {
  const fixture = setup_world();
  const { imitater_trap } = load(fixture);
  assert.equal(await imitater_trap(1, seq(70)), 1, 'Z>60 逃出（未作动）');
  await imitater_trap(1, seq(5)); // Z=5 < 10 大量档
  for (const idx of [6, 8, 14, 0, 5]) {
    assert.equal(fixture.store.get(`juel:1:${idx}`), 50, `juel:${idx} +50`);
  }
  assert.equal(fixture.store.get('base:1:1'), 1000 - 50, '气力 -50');
  assert.equal(fixture.store.get('exp:1:2'), 1, '绝顶经验 +1');
  assert.equal(fixture.store.get('cflag:1:11') ?? 0, 0, '攻防归零（:679-680）');
  fixture.store.set('cflag:1:11', 90);
  fixture.store.set('cflag:1:12', 90);
  await imitater_trap(1, seq(30)); // 浅档
  assert.equal(fixture.store.get('cflag:1:11'), 45, '攻减半（:703）');
  assert.equal(fixture.store.get('juel:1:5'), 80, '浅档欲情 +30（累积）');
});

test('SUMMON（:711）：召唤存根被调、高难度时体力损耗', async () => {
  const fixture = setup_world();
  const { summon_trap } = load(fixture);
  assert.equal(await summon_trap(1, seq(1)), 1, 'Z>0 破坏阵（未作动）');
  await summon_trap(1, seq(0)); // 召唤
  assert.ok(
    text_lines(fixture).some((line) => line.includes('原作 @SUMMON_MONSTER，')),
    'SUMMON_MONSTER 域内存根被调（DUNGEON_TRAP.ERB :729）',
  );
  assert.equal(fixture.store.get('base:1:0'), 2000, 'FLAG:85=0 无魔力冲击');
  fixture.store.set('flag:85', 2);
  await summon_trap(1, seq(0));
  assert.equal(fixture.store.get('base:1:0'), 2000 - 20, '体力 -= FLAG:85×10');
});

test('SUCCUBUS（:740）：非男人者百合经验 +1 档、五宝珠与攻防弱化', async () => {
  const fixture = setup_world();
  const { succubus_trap } = load(fixture);
  assert.equal(await succubus_trap(1, seq(70)), 1, 'DICE>60 无视（未作动）');
  await succubus_trap(1, seq(5)); // DICE=5 < 10 深度
  assert.equal(
    fixture.store.get('exp:1:40'),
    6,
    '百合经验 +6（TALENT:122==0）',
  );
  for (const idx of [6, 8, 14, 0, 5]) {
    assert.equal(fixture.store.get(`juel:1:${idx}`), 100, `juel:${idx} +100`);
  }
  assert.equal(fixture.store.get('exp:1:2'), 1, '绝顶经验 +1');
  assert.equal(fixture.store.get('cflag:1:11') ?? 0, 0, '攻防归零');
  fixture.store.set('talent:1:122', 1); // 男人位 → 不加百合经验
  await succubus_trap(1, seq(30)); // 浅档
  assert.equal(fixture.store.get('exp:1:40'), 6, '男人位不加百合经验');
  assert.equal(fixture.store.get('exp:1:2'), 2, '绝顶经验再 +1');
});

test('SLIME_ROOM（:826）：攻防弱化 + 肛门经验 + 润滑位置起（位 3）', async () => {
  const fixture = setup_world();
  const { slime_room_trap } = load(fixture);
  fixture.store.set('cflag:1:11', 100);
  fixture.store.set('cflag:1:12', 90);
  assert.equal(await slime_room_trap(1, seq(90)), 0, 'DICE>80 逃脱也是作动');
  assert.equal(fixture.store.get('cflag:1:11'), 100, '逃脱不弱化');
  await slime_room_trap(1, seq(5)); // DICE=5 < 10 深档
  assert.equal(fixture.store.get('cflag:1:11'), 50, '攻减半（:854）');
  assert.equal(fixture.store.get('cflag:1:12'), 45, '防减半（:855）');
  assert.equal(fixture.store.get('exp:1:1'), 1, '肛门经验 +1（:861）');
  assert.equal(fixture.store.get('base:1:1'), 1000 - 25 - 10, '气力 -25-10');
  assert.equal(
    (fixture.store.get('cflag:1:503') || 0) & 8,
    8,
    '润滑位置起（位 3，:885）',
  );
});

test('NET（:890）：气力损耗按上限 1/20 封顶、魔虫知识追打 HP', async () => {
  const fixture = setup_world();
  const { net_trap } = load(fixture);
  fixture.store.set('flag:85', 0); // local = 10，上限 1000/20 = 50 不封
  await net_trap(1, seq());
  assert.equal(fixture.store.get('base:1:1'), 1000 - 10, '气力 -10');
  fixture.store.set('base:1:1', 1000);
  fixture.store.set('flag:85', 100); // 10 + 500 = 510 → 封到 50
  await net_trap(1, seq());
  assert.equal(fixture.store.get('base:1:1'), 950, '气力损耗封顶 MAXBASE/20');
  fixture.store.set('base:1:1', 1000);
  fixture.store.set('talent:0:328', 1); // 魔虫知识：HP 追打
  await net_trap(1, seq());
  assert.equal(
    fixture.store.get('base:1:0'),
    2000 - 75,
    '50×1.5=75（HP 上限 100 不封）',
  );
});

test('SHOP（:921）：销售入金库（双记）、扣购物预算（CFLAG:582）、恢复', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  const { shop_trap } = load(fixture);
  fixture.store.set('cflag:1:9', 10); // RAND:(10/10+5)=RAND:6
  fixture.store.set('cflag:1:580', 3000); // 所持金
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('base:1:1', 100);
  const money0 = era_flag.money;
  const legit0 = era_exflag.legit_money;
  assert.equal(await shop_trap(1, seq(0)), 1, 'COST=0 没买（未作动）');
  // rand=1 → COST = 1*50 = 50；阶层 1 → floor(50×(99+1)/100) = 50
  const ret = await shop_trap(1, seq(1));
  assert.equal(ret, 0, '购买成立（作动）');
  assert.equal(era_flag.money - money0, 50, 'MONEY += COST（:951）');
  assert.equal(
    era_exflag.legit_money - legit0,
    50,
    'EX_FLAG:4444 += COST（:952）',
  );
  assert.equal(
    fixture.store.get('cflag:1:582') || 0,
    -50,
    'CFLAG:582 -= COST（:954）',
  );
  assert.equal(
    fixture.store.get('cflag:1:580'),
    3000,
    'CFLAG:580 不扣（:953 注释态）',
  );
  assert.equal(fixture.store.get('base:1:0'), 1050, 'HP += COST（:957）');
  assert.equal(fixture.store.get('base:1:1'), 1000, '气力全恢复（:961）');
  // 钱不够 → 杀价失败
  fixture.store.set('cflag:1:580', 10);
  assert.equal(await shop_trap(1, seq(1)), 1, '所持金不足（未作动）');
});

test('BLACKOUT（:969）：攻减半，DICE==1 档再扣气力与毒箭', async () => {
  const fixture = setup_world();
  const { blackout_trap } = load(fixture);
  fixture.store.set('cflag:1:11', 100);
  assert.equal(await blackout_trap(1, seq(2)), 0, 'DICE==2 逃掉也是作动');
  await blackout_trap(1, seq(0)); // DICE==0
  assert.equal(fixture.store.get('cflag:1:11'), 50, '攻减半（:998）');
  assert.equal(fixture.store.get('base:1:1'), 1000, 'DICE==0 档不扣气力');
  fixture.store.set('cflag:1:11', 100);
  fixture.store.set('flag:85', 1);
  await blackout_trap(1, seq(1)); // DICE==1
  assert.equal(fixture.store.get('base:1:1'), 900, '气力 -100（:989）');
  assert.equal(
    fixture.store.get('base:1:0'),
    2000 - 10,
    '毒箭体力 -FLAG:85×10',
  );
});

test('SHOOT（:1011）：按楼层三档下坠、队伍分断、落下位置起', async () => {
  const fixture = setup_world();
  const { shoot_trap } = load(fixture);
  const { party_del } = fixture.load_module('dungeon/dungeon-party');
  let del_called = 0;
  const orig = party_del;
  // 模块对象上替换以观测分断（对比测试同款手法）
  Object.defineProperty(
    fixture.load_module('dungeon/dungeon-party'),
    'party_del',
    {
      value: async (...args) => {
        del_called += 1;
        return orig(...args);
      },
      configurable: true,
    },
  );
  assert.equal(
    await shoot_trap(1, seq(1), { d20: 39 }),
    1,
    'D:20 < 40 → 未作动（不消耗）',
  );
  // 第 1 层 → else 档：下坠一层 + 分断
  await shoot_trap(1, seq(0), { d20: 40 });
  assert.equal(fixture.store.get('cflag:1:501'), 2, '下坠一层（:1066）');
  assert.equal(del_called, 1, '队伍分断（PARTY_DEL，:1071）');
  assert.equal(fixture.store.get('cflag:1:509'), 1, '迷路位置起');
  assert.equal(
    fixture.store.get('cflag:1:503') || 0,
    64,
    '落下位置起（:1030）',
  );
  // 第 9 层 → 砸向最底层，不分断
  fixture.store.set('cflag:1:501', 9);
  fixture.store.set('base:1:0', 2000);
  await shoot_trap(1, seq(0, 250), { d20: 40 });
  assert.equal(
    fixture.store.get('cflag:1:501'),
    9,
    '第 9 层不再 +1（:1044 档）',
  );
  assert.equal(fixture.store.get('base:1:0'), 2000 - 250, 'RAND:300 落地伤害');
  assert.equal(del_called, 1, '第 9 层不分断队伍');
  // 第 8 层 → +1 且分断
  fixture.store.set('cflag:1:501', 8);
  await shoot_trap(1, seq(0, 100), { d20: 40 });
  assert.equal(fixture.store.get('cflag:1:501'), 9, '第 8 层 +1（:1054）');
  assert.equal(del_called, 2, '第 8 层分断（:1063）');
});

test('DISPELL（:1085）：诅咒位置起（位 1）、已诅咒不重复', async () => {
  const fixture = setup_world();
  const { dispell_trap } = load(fixture);
  assert.equal(await dispell_trap(1, seq(1)), 0, 'Z>0 解除也是作动');
  await dispell_trap(1, seq(0));
  assert.equal(
    fixture.store.get('cflag:1:503') || 0,
    2,
    '诅咒位（位 1，:1109）',
  );
  await dispell_trap(1, seq(0));
  assert.equal(fixture.store.get('cflag:1:503') || 0, 2, '已诅咒不重复累加');
  fixture.store.set('flag:85', 1);
  await dispell_trap(1, seq(0));
  assert.equal(
    fixture.store.get('base:1:1'),
    1000 - 10,
    '气力 -FLAG:85×10（:1115）',
  );
});

test('OIL（:1121）：气力损耗、油位置起（位 3 之 8）', async () => {
  const fixture = setup_world();
  const { oil_trap } = load(fixture);
  assert.equal(await oil_trap(1, seq(20)), 1, 'Z<30 躲开（未作动）');
  await oil_trap(1, seq(50)); // Z=50
  assert.equal(fixture.store.get('base:1:1'), 1000 - 50, '气力 -= Z');
  assert.equal(fixture.store.get('cflag:1:503') || 0, 8, '油位 +8（:1143）');
  await oil_trap(1, seq(50));
  assert.equal(fixture.store.get('cflag:1:503') || 0, 8, '已油腻不重复累加');
});

test('FIRE（:1150）：命中伤害、油位追打', async () => {
  const fixture = setup_world();
  const { fire_trap } = load(fixture);
  assert.equal(await fire_trap(1, seq(50)), 0, 'DICE<100 回避也是作动');
  assert.equal(fixture.store.get('base:1:0'), 2000, '回避无伤害');
  await fire_trap(1, seq(150));
  assert.equal(fixture.store.get('base:1:0'), 2000 - 150, '体力 -= DICE');
  fixture.store.set('cflag:1:503', 8); // 油位
  fixture.store.set('flag:85', 1);
  fixture.store.set('base:1:0', 2000);
  await fire_trap(1, seq(150));
  assert.equal(
    fixture.store.get('base:1:0'),
    2000 - (150 + 10) - (30 + 5),
    '点火追加 30+FLAG:85×5（:1172）',
  );
});

test('A_WORM（:1181）：气力损耗、A 经验 > 30 未寄生则寄生（TALENT:193）', async () => {
  const fixture = setup_world();
  const { a_worm_trap } = load(fixture);
  assert.equal(await a_worm_trap(1, seq(30)), 1, 'DICE<35 弄死（未作动）');
  await a_worm_trap(1, seq(50)); // DICE=50 → 50+30 = 80
  assert.equal(fixture.store.get('base:1:1'), 1000 - 80, '气力 -= DICE+30');
  assert.equal(fixture.store.get('exp:1:1'), 1, '肛门经验 +1（:1225）');
  assert.equal(fixture.store.get('talent:1:193') ?? 0, 0, 'A 经验 ≤ 30 不寄生');
  fixture.store.set('exp:1:1', 31);
  fixture.store.set('base:1:1', 1000);
  await a_worm_trap(1, seq(50));
  assert.equal(
    fixture.store.get('talent:1:193'),
    1,
    '寄生（TALENT:193 = 1，:1215）',
  );
  assert.equal(fixture.store.get('exp:1:1'), 32, '寄生后再 +1');
  // 已寄生 → 肛门虫自动调教三连（存根行）
  fixture.store.set('base:1:1', 1000);
  await a_worm_trap(1, seq(50));
  assert.ok(
    text_lines(fixture).some((line) => line.includes('原作 @COM13_AUTO，')),
    'COM13_AUTO 存根被调（:1221）',
  );
  // 润滑位 ×1.30（TIMES 截断）
  fixture.store.set('cflag:1:503', 8);
  fixture.store.set('base:1:1', 1000);
  await a_worm_trap(1, seq(50));
  assert.equal(
    fixture.store.get('base:1:1'),
    1000 - (Math.floor(50 * 1.3) + 30),
    '×1.3',
  );
});

test('LOVE_BUG（:1232）：伤害 + 爱抚自动调教（COM0_AUTO）+ 天使免疫', async () => {
  const fixture = setup_world();
  const { love_bug_trap } = load(fixture);
  fixture.store.set('talent:1:314', 6); // 天使
  assert.equal(await love_bug_trap(1, seq(10)), 1, '天使飞起（未作动）');
  fixture.store.set('talent:1:314', 0);
  assert.equal(await love_bug_trap(1, seq(3)), 1, 'DICE<5 避开（未作动）');
  await love_bug_trap(1, seq(10, 39)); // else 档：39+1 = 40
  assert.equal(fixture.store.get('base:1:0'), 2000 - 40, '体力 -= RAND:40+1');
  assert.ok(
    text_lines(fixture).some((line) => line.includes('原作 @COM0_AUTO，')),
    'COM0_AUTO 存根被调（:1283）',
  );
  fixture.store.set('talent:1:10', 1); // 胆怯
  fixture.store.set('base:1:1', 1000);
  await love_bug_trap(1, seq(10, 39));
  assert.equal(fixture.store.get('base:1:1'), 1000 - 10, '胆怯气力 -10');
});

test('DARK_JUEL（:1295）：掠夺换金（CFLAG:581）+ 屈服宝珠 + 善恶值下降', async () => {
  const fixture = setup_world();
  const { dark_juel_trap } = load(fixture);
  fixture.store.set('cflag:1:151', 200); // 善恶值 > 150
  assert.equal(
    await dark_juel_trap(1, seq(2, 0)),
    1,
    'RAND:4==0 克服诱惑（未作动）',
  );
  await dark_juel_trap(1, seq(2, 1)); // RAND:5=2 → 100；RAND:4=1 不克服
  // 阶层 1：floor(100×(99+1)/100) = 100；无素质补正
  assert.equal(fixture.store.get('cflag:1:581') || 0, 100, '掠夺换金（:1337）');
  assert.equal(fixture.store.get('juel:1:6'), 10, '屈服宝珠 +DICE/10（:1339）');
  assert.ok(
    text_lines(fixture).some((line) => line.includes('原作 @KARMA，')),
    'KARMA 存根被调（:1344，善恶值 -1）',
  );
  // 素质补正：好奇心 +5、盗贼 +DICE/5
  fixture.store.set('talent:1:23', 1);
  fixture.store.set('talent:1:203', 1);
  fixture.store.set('cflag:1:151', 0);
  fixture.store.set('cflag:1:581', 0);
  await dark_juel_trap(1, seq(2)); // 100 → +5 = 105 → +21 = 126
  assert.equal(fixture.store.get('cflag:1:581') || 0, 126, '好奇心与盗贼补正');
});

test('DEF/ATK/MAG_DOWN（:1349-1400）：三项阵地弱化各落各槽', async () => {
  const fixture = setup_world();
  const { def_down_trap, atk_down_trap, mag_down_trap } = load(fixture);
  await def_down_trap(1, seq(0, 10)); // 0 + 10 + 1
  assert.equal(fixture.store.get('cflag:1:680') || 0, 11, 'CFLAG:680 += DICE');
  await atk_down_trap(1, seq(0, 10));
  assert.equal(fixture.store.get('cflag:1:681') || 0, 11, 'CFLAG:681 += DICE');
  await mag_down_trap(1, seq(0, 10));
  assert.equal(fixture.store.get('cflag:1:682') || 0, 11, 'CFLAG:682 += DICE');
});

test('ALL_DOWN（:1403）：三槽同值（掷骰减半 +1）', async () => {
  const fixture = setup_world();
  const { all_down_trap } = load(fixture);
  await all_down_trap(1, seq(0, 10)); // floor((0+10)/2)+1 = 6
  assert.equal(fixture.store.get('cflag:1:680') || 0, 6, '680 +6');
  assert.equal(fixture.store.get('cflag:1:681') || 0, 6, '681 +6');
  assert.equal(fixture.store.get('cflag:1:682') || 0, 6, '682 +6');
});

test('诈骗陷阱剧情1（魔改 :16-86）：善恶值定价、金库双记、扣所持金', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  const { fraud_trap } = load(fixture);
  fixture.store.set('flag:5', 32); // 日志开（数值效果在守卫内，文件头）
  fixture.store.set('cflag:1:151', 200); // 善恶值 > 100
  fixture.store.set('cflag:1:9', 10);
  fixture.store.set('cflag:1:580', 3000);
  const money0 = era_flag.money;
  const legit0 = era_exflag.legit_money;
  const ret = await fraud_trap(1, seq(0, 0, 0, 0)); // 剧情1；DATA×2 各取 0
  assert.equal(ret, 0, '诈骗陷阱恒作动（消耗）');
  // COST = floor(200×10/2) = 1000 ≤ 3000/2 → 全额
  assert.equal(era_flag.money - money0, 1000, 'MONEY += COST');
  assert.equal(era_exflag.legit_money - legit0, 1000, 'EX_FLAG:4444 += COST');
  assert.equal(fixture.store.get('cflag:1:580'), 2000, '所持金 -= COST');
  // 善恶值 ≤ -50 → 漠不关心，无转账
  fixture.store.set('cflag:1:151', -100);
  await fraud_trap(1, seq(0, 0, 0, 0));
  assert.equal(fixture.store.get('cflag:1:580'), 2000, '冷血者不被骗');
  // 日志关 → 整个效果不发生（魔改原作如此，文件头 + #14）
  fixture.store.set('flag:5', 0);
  fixture.store.set('cflag:1:151', 200);
  await fraud_trap(1, seq(0, 0, 0, 0));
  assert.equal(
    fixture.store.get('cflag:1:580'),
    2000,
    'FLAG:5 & 32 关 → 无效果',
  );
});

test('诈骗陷阱剧情3（魔改 :189-231）：双倍欠条（CFLAG:582）', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { fraud_trap } = load(fixture);
  fixture.store.set('flag:5', 32);
  fixture.store.set('cflag:1:151', 0); // ≤ 0 档
  fixture.store.set('cflag:1:9', 10);
  fixture.store.set('cflag:1:580', 3000);
  const money0 = era_flag.money;
  // roll=2 → 剧情3；rand_n(5)+1 = 1 → 10×1 = 10 < 500 → 500 + rand_n(100)=0
  await fraud_trap(1, seq(2, 0, 0, 0, 0, 0, 0));
  // 收下 500、债 +1000：MONEY += 500、580 += 500、582 -= 1000
  assert.equal(era_flag.money - money0, 500, 'MONEY += COST');
  assert.equal(
    fixture.store.get('cflag:1:580'),
    3500,
    '所持金 += COST（:230）',
  );
  assert.equal(
    fixture.store.get('cflag:1:582') || 0,
    -1000,
    '债务 COST×2（:231）',
  );
});

// —— @DUNGEON_TRAP 主循环 ——

test('主循环：A 槽分发落穴——库存消耗、513 记忆、尾部 WAIT', async () => {
  const fixture = setup_world();
  const { dungeon_trap } = load(fixture);
  fixture.store.set('flag:300', 60); // 本层 A 槽 = 落穴
  fixture.store.set('item:60', 3);
  const waits0 = fixture.waits.length;
  await dungeon_trap(1, 0, seq(19, 99, 39), { d20: 50 });
  // 回避判定 20 < 19 假 → PIT：DICE=99 ≥ 80 → (39+1)×2 = 80
  assert.equal(
    fixture.store.get('base:1:0'),
    2000 - 80,
    '落穴伤害经分发落变量',
  );
  assert.equal(fixture.store.get('item:60'), 2, '作动消耗一个库存（:163）');
  // B/C 空槽的 TRAP_ID = 0 也走「作动」路径（:167 无差别写记忆）——
  // 末槽覆盖 513 = 0；A 槽的 60 只在 B/C 置 -1 的世界里可见（:68 提前出）
  assert.equal(
    fixture.store.get('cflag:1:513') || 0,
    0,
    '空槽覆盖记忆（原作 :167）',
  );
  // c512 逐步账：A 槽 -1 后钳 0（钳位在 ITEM 分支前，:87-88）；B 槽
  // ITEM<1 → -1；C 槽 c513(0)==trap_id(0) 的 +1 与 c513==0 的 -1 相抵后
  // 钳 0，再 ITEM<1 → -1
  assert.equal(fixture.store.get('cflag:1:512'), -1, '空槽的回避率衰减（:95）');
  assert.equal(fixture.waits.length, waits0 + 1, '尾部 WAIT（:191）');
});

test('主循环：A 空查 B（FLAG:310）、C 槽兜底（FLAG:320）', async () => {
  const fixture = setup_world();
  const { dungeon_trap } = load(fixture);
  fixture.store.set('flag:300', -1);
  fixture.store.set('flag:310', -1);
  fixture.store.set('flag:320', 61); // C 槽 = 射箭
  fixture.store.set('item:61', 1);
  await dungeon_trap(1, 0, seq(19, 50), { d20: 50 });
  assert.equal(fixture.store.get('item:61'), 0, 'C 槽的陷阱被消耗');
  assert.equal(fixture.store.get('base:1:0'), 2000 - 50, '射箭伤害（Z=50）');
  assert.equal(fixture.store.get('cflag:1:513'), 61, '末槽的记忆（:167）');
  // 三槽全空 → RETURN 0（不经 WAIT）
  fixture.store.set('flag:320', -1);
  const waits0 = fixture.waits.length;
  const ctx = await dungeon_trap(1, 0, seq(), { d20: 50 });
  assert.equal(ctx.d20, 50, '全空返回不动 D:20');
  assert.equal(fixture.waits.length, waits0, '中途 RETURN 不 WAIT（:68）');
});

test('主循环：无库存不掷骰（e2e 序列稳定的前提）', async () => {
  const fixture = setup_world();
  const { dungeon_trap } = load(fixture);
  fixture.store.set('flag:300', 60); // 有陷阱但无库存
  const calls = [];
  await dungeon_trap(1, 0, counting(calls), { d20: 50 });
  assert.deepEqual(calls, [], 'ITEM < 1 时 RAND:20 不掷（:94 的 ELSEIF 短路）');
  assert.equal(
    fixture.store.get('cflag:1:512'),
    -1,
    '库存空 → 回避率 -1（:95）',
  );
});

test('主循环：同一陷阱连击回避链（512 累计 → 印回避、不消耗）', async () => {
  const fixture = setup_world();
  const { dungeon_trap } = load(fixture);
  fixture.store.set('flag:5', 32); // 印行在日志守卫内（:96）
  fixture.store.set('flag:300', 60);
  fixture.store.set('item:60', 5);
  fixture.store.set('cflag:1:512', 6);
  fixture.store.set('cflag:1:513', 60); // 上次发动的是同一个陷阱
  await dungeon_trap(1, 0, seq(15), { d20: 50 });
  // 512 = 6+1 = 7 → trap_miss = 13 < 15 → 回避
  assert.ok(
    text_lines(fixture).some((line) =>
      line.includes('≪同一陷阱发动限制≫勇者回避了陷阱'),
    ),
    '回避演出（:97-98，FLAG:5 关时不印——本用例置 32）',
  );
  // 回避分支无 RETURN → TRAP_NOUSE = 0（:73 保险值）——回避也算作动：
  // 消耗一个、写记忆（原作 :157-159 注释：只有一方通行与弹射可能 RETURN 1）
  assert.equal(fixture.store.get('item:60'), 4, '回避也消耗（TRAP_NOUSE = 0）');
  assert.equal(
    fixture.store.get('cflag:1:513') || 0,
    0,
    'B/C 空槽覆盖记忆（:167）',
  );
  // 512 逐步账：A 槽 6+1=7、回避 -1 = 6；B 槽（513=60≠0，ITEM<1）-1 = 5；
  // C 槽（513=0==trap_id 的 +1 与 ==0 的 -1 相抵，ITEM<1）-1 = 4
  assert.equal(fixture.store.get('cflag:1:512'), 4, '回避 → 512 -1（:100）');
});

test('主循环：自动补货（FLAG:5 位 6）按价扣金库', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  const { dungeon_trap } = load(fixture);
  fixture.store.set('flag:5', 64);
  fixture.store.set('flag:300', 69); // 召唤陷阱（1000G）
  fixture.store.set('item:69', 1);
  fixture.store.set('flag:85', 0);
  const money0 = era_flag.money;
  const legit0 = era_exflag.legit_money;
  era_flag.money = money0 + 5000;
  await dungeon_trap(1, 0, seq(19, 0), { d20: 50 }); // Z=0 → 召唤
  assert.equal(fixture.store.get('item:69'), 1, '消耗 0 → 补 1（:174）');
  assert.equal(
    era_flag.money,
    money0 + 5000 - 1000,
    'MONEY -= TRAP_PRICE（:175）',
  );
  assert.equal(
    era_exflag.legit_money,
    legit0 - 1000,
    'EX_FLAG:4444 同扣（:176）',
  );
});

test('主循环：TELEPORT 的 D:20 写回经 ctx（run_dungeon 集成）', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:300', 62); // 传送陷阱
  fixture.store.set('item:62', 2);
  const { run_dungeon } = fixture.load_module('dungeon/dungeon');
  // 恒 1 掷点：WALK = 1+6×1 = 7；装备判定 0 < 1 → 调 dungeon_trap；
  // 回避判定 20 < 1 假 → TELEPORT：Z = 1 < 20 → ctx.d20 = 1
  await run_dungeon(1, () => 1);
  assert.equal(
    fixture.store.get('cflag:1:502'),
    1,
    'CFLAG:502 = D:20 = 1（:748）',
  );
  assert.equal(fixture.store.get('item:62'), 1, '传送陷阱被消耗');
});

// —— @SLAVE_TRAP_SET（迎击方补充）——

test('SLAVE_TRAP_SET：库存 < 99 补一个、≥ 99 按价换金', async () => {
  const fixture = setup_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { dungeon_trap } = load(fixture);
  fixture.store.set('cflag:1:1', 3); // 迎击中
  fixture.store.set('cflag:1:500', 2); // 补充行动
  fixture.store.set('flag:300', 60);
  fixture.store.set('item:60', 5);
  fixture.store.set('flag:310', 61);
  fixture.store.set('item:61', 99); // 满 → 换金
  const money0 = era_flag.money;
  const ctx = await dungeon_trap(1, 0, seq(), { d20: 50 });
  assert.equal(fixture.store.get('item:60'), 6, '库存 5 → 补 1（:1440）');
  assert.equal(
    era_flag.money - money0,
    50,
    '满仓按 TRAP_PRICE(61) 换金（:1445）',
  );
  assert.equal(ctx.d20, 50, '迎击者在补充后直接返回（:24-25）');
  // 非补充行动（CFLAG:500 != 2）→ 不补
  fixture.store.set('cflag:1:500', 5);
  fixture.store.set('item:60', 5);
  await dungeon_trap(1, 0, seq(), { d20: 50 });
  assert.equal(
    fixture.store.get('item:60'),
    5,
    '非补充行动不动库存（:1427-1428）',
  );
});

// —— 存根清单核对（dungeon-battle.test.js 同款）——

test('存根清单可检索：docs/stub-registry.md 收录 dungeon-trap 的全部存根化调用', () => {
  const fixture = create_era_fixture();
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  const names = load(fixture).STUBBED_CALLS;
  assert.ok(names.length >= 5, `名单 ${names.length} 条（应 ≥ 5）`);
  for (const name of names) {
    assert.ok(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
