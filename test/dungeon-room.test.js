/**
 * ere/dungeon/dungeon-room.js 十四函数的行为测试（issue #177，阶段 3 H8）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经各
 * 函数的 rand 参数注入（run_dungeon / dungeon-trap 先例）；贯通用例用
 * 序列随机源（数组依序取值）钉住「房间掷在 walk 掷之后」的次序——分发
 * 器的店遭遇掷是 :386 之后的第 10 枚（1×rand(20) + 6×rand(10) + 掷选
 * 受者的 rand(3) + rand(2)，见 dungeon.js 设施段）。
 *
 * 验收对应（#177 清单）：
 *   - 每种设施各一条测试证明效果落到正确变量（毒沼扣体力 / 冰室削攻击 /
 *     热砂削防御 / 迷阵扣侵攻度+立迷惑 / 博物馆气力伤害+位域 / 娼馆街
 *     入账 / 商店街三臂 / 牧场只数与三路产出）；
 *   - @DUNGEON_ROOM_DAY 与 @DUNGEON_SHOP_DAY 两条日结算入口各有测试
 *     （含 event-nextday 的接线）；
 *   - RESULT 契约：店遭遇返回 1 → NO_BATTLE 累加 → 主循环走训练臂；
 *   - 原作缺陷两处 1:1 保留且有测试钉住（FARM 的 SIF 作用域事故、
 *     FARM_RESCUE 的 EXTRA 当角色号）——「不要修好原作缺陷」的守卫。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 序列随机源：按数组依序取值，取尽后恒返回最后一枚（钉掷序用） */
function seq(values) {
  let i = 0;
  return (n) => {
    const v = i < values.length ? values[i] : values[values.length - 1];
    i += 1;
    return Math.min(v, n - 1);
  };
}

function load(fixture) {
  return fixture.load_module('dungeon/dungeon-room');
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
 * 最小世界：魔王 0 + 勇者 1（阿尔）。体力气力满、无同伴（受者掷选恒落
 * 在队长身上）、无陷阱无装备。facility = 设施番号（flag:350）、extra =
 * 扩张位域（flag:360）。
 */
function setup_world(facility = 0, extra = 0) {
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
  // 勇者 1：侵攻中（CFLAG:1 = 2）、第 1 层、侵攻度 0、所持金充足
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:501', 1);
  fixture.store.set('cflag:1:580', 1000);
  fixture.store.set('flag:350', facility);
  fixture.store.set('flag:360', extra);
  return fixture;
}

// —— @DUNGEON_ROOM 分发器（:2-73）——

test('分发·店遭遇：RAND:10 == 0 时 RESULT 1（不发生战斗），卖珠/刻印后钱不够不买', async () => {
  const fixture = setup_world();
  const { dungeon_room } = load(fixture);
  // rand ≡ 0：店遭遇掷必中
  const ret = await dungeon_room(1, () => 0);
  assert.equal(ret, 1, 'RESULT 1 = 戦闘が発生しないフラグ（:25）');
  // ITEMSSELL：等级 0 → COST = 50；所持金 1000 ≥ 50 → 走购买，但
  // ADD_EX_ITEM 存根 RESULT 0（没找到）→ 不转账（:318）
  assert.equal(
    stub_count(fixture, 'SELL_EX_ITEM'),
    1,
    '卖 EX 道具的域内存根被调（:305）',
  );
  assert.equal(stub_count(fixture, 'ADD_EX_ITEM'), 1, '购买走存根（:314）');
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0, 'RESULT 0 → 不入账');
  assert.equal(fixture.store.get('cflag:1:580'), 1000, '所持金不动');
});

test('分发·无设施：FLAG:(阶层+349) <= 0 直接返回 0，不掷设施', async () => {
  const fixture = setup_world(0);
  const { dungeon_room } = load(fixture);
  let drawn = 0;
  const ret = await dungeon_room(1, (n) => {
    drawn += 1;
    return 1 % n;
  });
  assert.equal(ret, 0, '无设施 RETURN 0');
  assert.equal(drawn, 1, '只掷了店遭遇一枚（设施段无掷点）');
});

test('分发·毒沼：ROOM == 501 时受者吃 CFLAG:0:9 + 10 伤害（:392/:404）', async () => {
  const fixture = setup_world(501);
  const { dungeon_room } = load(fixture);
  const ret = await dungeon_room(1, (n) => 1 % n);
  assert.equal(ret, 0);
  assert.equal(
    fixture.store.get('base:1:0'),
    1990,
    'DMG = 0（魔王等级）+ 10（:392）；BASE:A:0 -= DMG（:404）',
  );
});

test('分发·战役：CFLAG:1 == 12 走 CAMPAIGN_ROOM/EXTRA 存根，无设施效果', async () => {
  const fixture = setup_world(501);
  fixture.store.set('cflag:1:1', 12);
  const { dungeon_room } = load(fixture);
  const ret = await dungeon_room(1, (n) => 1 % n);
  assert.equal(ret, 0, '存根房间类型恒 0 → 无设施分发');
  assert.equal(stub_count(fixture, 'CAMPAIGN_ROOM'), 1, '战役房间存根（:34）');
  assert.equal(
    stub_count(fixture, 'CAMPAIGN_ROOM_EXTRA'),
    1,
    '战役扩张存根（:37）',
  );
  assert.equal(
    fixture.store.get('base:1:0'),
    2000,
    '毒沼不在战役分支里（ROOM = 0，:33-38）',
  );
});

test('分发·迎击：CFLAG:1 == 3 转建设（A = ARG:0），不掷店遭遇', async () => {
  const fixture = setup_world(501);
  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('cflag:1:500', 3); // 扩张指令
  const { dungeon_room } = load(fixture);
  // rand(4) = 0 → 拡張1
  const ret = await dungeon_room(1, () => 0);
  assert.equal(ret, 0, '建设路径 RETURN 0（:13）');
  assert.equal(fixture.store.get('flag:360'), 1, '拡張位 0 立起（:111）');
  assert.equal(fixture.store.get('cflag:1:500'), 0, '指令清除（:139）');
});

test('分发·早退：非 2/3/12 状态不掷任何随机数（:16-18）', async () => {
  const fixture = setup_world(501);
  fixture.store.set('cflag:1:1', 0);
  const { dungeon_room } = load(fixture);
  let drawn = 0;
  const ret = await dungeon_room(1, () => {
    drawn += 1;
    return 0;
  });
  assert.equal(ret, 0);
  assert.equal(drawn, 0, '状态守卫在店遭遇掷之前');
});

// —— @DUNGEON_ROOM_BUILD（:76-141）——

test('建设·拡張1：RAND:4 == 0 且位 0 未立 → +1 并清指令', async () => {
  const fixture = setup_world(501, 0);
  fixture.store.set('cflag:1:500', 3);
  const { dungeon_room_build } = load(fixture);
  // rand(4) = 0 → 拡張1（位 1 的 rand(3) 不掷——ELSEIF 短路）
  let calls = 0;
  await dungeon_room_build(1, () => {
    calls += 1;
    return 0;
  });
  assert.equal(fixture.store.get('flag:360'), 1, 'FLAG:360 += 1（:111）');
  assert.equal(fixture.store.get('cflag:1:500'), 0, '指令清除（:139）');
  assert.equal(calls, 1, '只掷 RAND:4 一枚');
});

test('建设·拡張2：RAND:4 != 0 且 RAND:3 == 0 → +2', async () => {
  const fixture = setup_world(501, 0);
  fixture.store.set('cflag:1:500', 3);
  const { dungeon_room_build } = load(fixture);
  await dungeon_room_build(1, seq([1, 0]));
  assert.equal(fixture.store.get('flag:360'), 2, 'FLAG:360 += 2（:116）');
});

test('建设·已有该扩张位：原地返回不清指令（SIF 早退，:109-110 原作形态）', async () => {
  const fixture = setup_world(501, 1); // 位 0 已立
  fixture.store.set('cflag:1:500', 3);
  const { dungeon_room_build } = load(fixture);
  await dungeon_room_build(1, () => 0);
  assert.equal(fixture.store.get('flag:360'), 1, '扩张位不动');
  assert.equal(
    fixture.store.get('cflag:1:500'),
    3,
    '指令保留（:110 RETURN 0 在 :139 之前——原作如此）',
  );
});

test('建设·两掷都不中：返回且不清指令（:117-118）', async () => {
  const fixture = setup_world(501, 0);
  fixture.store.set('cflag:1:500', 3);
  const { dungeon_room_build } = load(fixture);
  await dungeon_room_build(1, seq([1, 1]));
  assert.equal(fixture.store.get('flag:360'), 0, '不扩张');
  assert.equal(fixture.store.get('cflag:1:500'), 3, '指令保留');
});

test('建设·命令检查与设施检查：CFLAG:500 != 3 或无设施直接返回（:88/:94）', async () => {
  const fixture = setup_world(0);
  const { dungeon_room_build } = load(fixture);
  // 500 未置（0）→ 命令检查早退
  await dungeon_room_build(1, () => {
    throw new Error('不应掷随机数');
  });
  assert.equal(fixture.store.get('flag:360') ?? 0, 0);

  fixture.store.set('cflag:1:500', 3);
  // 设施无（flag:350 = 0）→ 早退
  await dungeon_room_build(1, () => {
    throw new Error('不应掷随机数');
  });
  assert.equal(fixture.store.get('cflag:1:500'), 3, '指令也不清');
});

// —— @DUNGEON_ROOM_DAY（:145-167）与 @DUNGEON_SHOP_DAY（:328-368）——

test('日结算·ROOM_DAY：第 1 层商店街与第 2 层牧场都结算，其余设施无日结算', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:350', 500); // 第 1 层：商店街
  fixture.store.set('flag:351', 502); // 第 2 层：牧场
  fixture.store.set('flag:352', 501); // 第 3 层：毒沼（无日结算）
  fixture.store.set('flag:83', 5); // 肉便器 5 只
  fixture.store.set('cflag:0:9', 10); // 魔王等级 10
  fixture.store.set('exflag:99', 100); // 威望 100（广受爱戴 ×2）
  fixture.store.set('itemname:100', '哥布林');
  const { dungeon_room_day } = load(fixture);
  const zero = () => 0;
  await dungeon_room_day(zero);

  // 商店街：10 × (0 + 5) × 2 = 100；牧场：FLAG:614 = 0（不卖孩子）→
  // 只计 :629 无条件那笔 50（SIF 作用域事故，见 FARM 用例）；毒沼不结算
  assert.equal(fixture.store.get('flag:10004'), 150, '税入 100 + 牧场 50');
  const texts = text_lines(fixture);
  assert(
    texts.some((line) =>
      line.includes('从商店街征收了今天的税金。（现金收入+100）'),
    ),
    '税入播报（:363）',
  );
  assert(
    texts.some((line) => line.includes('人类牧场的肉便器生了5只哥布林。')),
    '牧场播报（:625，名字表经 itemname）',
  );
  assert.equal(
    fixture.store.get('base:1:0'),
    2000,
    '毒沼是遭遇型设施，日结算不吃伤害（:159-163 只认 500/502）',
  );
});

test('日结算·SHOP_DAY：威望五档——岌岌可危归零、动荡不安 ×3/10、广受爱戴 ×2', async () => {
  const fixture = setup_world(500);
  fixture.store.set('cflag:0:9', 10);
  const { dungeon_shop_day } = load(fixture);
  const zero = () => 0; // RAND:10 = 0 → 税基 10 × 5 = 50

  // 威望 15（[0, 20] 档）：归零
  fixture.store.set('exflag:99', 15);
  await dungeon_shop_day(0, zero);
  assert.equal(fixture.store.get('flag:10004'), 0, '岌岌可危 → 税入 0（:344）');
  assert(text_lines(fixture).includes('威望值是【岌岌可危】'), ':343 播报');

  // 威望 30（(20, 40] 档）：×3/10 → 15
  fixture.store.set('exflag:99', 30);
  await dungeon_shop_day(0, zero);
  assert.equal(
    fixture.store.get('flag:10004'),
    15,
    '动荡不安 ×3/10（:348-349）',
  );

  // 威望 100（(80, 100] 档）：×2 → 100
  fixture.store.set('exflag:99', 100);
  await dungeon_shop_day(0, zero);
  assert.equal(fixture.store.get('flag:10004'), 115, '广受爱戴 ×2（:360）累加');

  // 威望 150（区间外）：无折扣 → 50
  fixture.store.set('exflag:99', 150);
  await dungeon_shop_day(0, zero);
  assert.equal(
    fixture.store.get('flag:10004'),
    165,
    '>100 无档位（:342-361 直落）',
  );
});

test('日结算·SHOP_DAY：扩张两路各加 CFLAG:0:9 + 20（:337-341）', async () => {
  const fixture = setup_world(500, 3);
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('exflag:99', 100); // ×2
  const { dungeon_shop_day } = load(fixture);
  await dungeon_shop_day(3, () => 4); // 税基 10 × 9 = 90；+30 +30 = 150；×2 = 300
  assert.equal(
    fixture.store.get('flag:10004'),
    300,
    '90 + 20+10 + 20+10 后 ×2',
  );
  assert.equal(
    fixture.store.get('exflag:4444'),
    300,
    'EX_FLAG:4444 镜像（:366）',
  );
});

test('日结算·接线：EVENT_NEXTDAY 的 :126 调用点真调 ROOM_DAY（商店街税入到账）', async () => {
  const fixture = setup_world(500);
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('exflag:99', 100);
  fixture.load_module('event/event-nextday');
  const { run_event_nextday } = fixture.load_module('event/event-nextday');
  const zero = () => 0;
  fixture.override_math_random(zero);
  try {
    await run_event_nextday();
  } finally {
    fixture.restore_math_random();
  }
  assert.equal(
    fixture.store.get('flag:10004'),
    100,
    '日循环真的结了设施账（10 × 5 × 2）',
  );
  assert.equal(stub_count(fixture, 'DUNGEON_ROOM_DAY'), 0, '存根已换真身');
});

// —— @DUNGEON_SHOP（:170-265，商店街）——

test('商店街·逛街档：扣所持金入账，体力 +20 气力 +50（:254-258）', async () => {
  const fixture = setup_world(500, 0);
  fixture.store.set('cflag:1:9', 2); // 勇者等级 2 → COST = 20
  const { dungeon_shop } = load(fixture);
  // 两掷都不中（1/3 与 1/2 都落空）→ 逛街档
  await dungeon_shop(1, 0, seq([1, 1]));
  assert.equal(fixture.store.get('flag:10004'), 20, 'MONEY += COST（:254）');
  assert.equal(
    fixture.store.get('exflag:4444'),
    20,
    'EX_FLAG:4444 镜像（:255）',
  );
  assert.equal(
    fixture.store.get('cflag:1:580'),
    980,
    'CFLAG:580 -= COST（:256）',
  );
  assert.equal(fixture.store.get('base:1:0'), 2020, '体力 +20（:257）');
  assert.equal(fixture.store.get('base:1:1'), 1050, '气力 +50（:258）');
});

test('商店街·武器屋：扩张位 0 + RAND:3 == 0 → 换算式，存根 RESULT 0 不转账（:193-218）', async () => {
  const fixture = setup_world(500, 1);
  fixture.store.set('cflag:1:9', 2); // 武器档 COST = 2×8+20 = 36
  const { dungeon_shop } = load(fixture);
  await dungeon_shop(1, 1, seq([0]));
  assert.equal(stub_count(fixture, 'ADD_EX_ITEM'), 1, 'ADD_EX_ITEM -2（:208）');
  assert.equal(
    fixture.store.get('flag:10004') ?? 0,
    0,
    'RESULT 0 → 不入账（:212）',
  );
  assert.equal(fixture.store.get('cflag:1:580'), 1000, '所持金不动');
});

test('商店街·道具屋：扩张位 1 + RAND:2 == 0（武器掷不中）（:219-244）', async () => {
  const fixture = setup_world(500, 2);
  fixture.store.set('cflag:1:9', 2);
  const { dungeon_shop } = load(fixture);
  await dungeon_shop(1, 2, seq([0])); // extra&1 = 0 短路武器掷 → rand(2) = 0 中道具
  assert.equal(stub_count(fixture, 'ADD_EX_ITEM'), 1, 'ADD_EX_ITEM -3（:234）');
});

test('商店街·钱不够：逛街档 CFLAG:580 < COST 直接返回（:247-252）', async () => {
  const fixture = setup_world(500, 0);
  fixture.store.set('cflag:1:9', 2); // COST = 20
  fixture.store.set('cflag:1:580', 15);
  const { dungeon_shop } = load(fixture);
  await dungeon_shop(1, 0, seq([1, 1]));
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0, '不入账');
  assert.equal(fixture.store.get('base:1:0'), 2000, '不吃喝');
});

// —— @DUNGEON_SHOP_ITEMSELL（:268-325，不可思议的房间）——

test('不可思议的房间：否定の珠 > 2000 换 500 所持金（:286-293）', async () => {
  const fixture = setup_world();
  fixture.store.set('juel:1:100', 2500);
  const { dungeon_shop_itemsell } = load(fixture);
  await dungeon_shop_itemsell(1);
  assert.equal(
    fixture.store.get('juel:1:100'),
    2000,
    'JUEL:100 -= 500（:291）',
  );
  assert.equal(
    fixture.store.get('cflag:1:580'),
    1500,
    'CFLAG:580 += 500（:292）',
  );
});

test('不可思议的房间：反発刻印 1 点换 1000 战斗经验并递减（:295-302）', async () => {
  const fixture = setup_world();
  fixture.store.set('mark:1:3', 2);
  fixture.store.set('cflag:1:580', 0); // 钱不够 → 购买段早退
  const { dungeon_shop_itemsell } = load(fixture);
  await dungeon_shop_itemsell(1);
  assert.equal(fixture.store.get('exp:1:80'), 2000, 'EXP:80 += 2×1000（:300）');
  assert.equal(fixture.store.get('mark:1:3'), 1, 'MARK:3 -= 1（:301）');
  assert.equal(
    fixture.store.get('flag:10004') ?? 0,
    0,
    '钱不够不买（:307-311）',
  );
});

// —— @DUNGEON_SWAMP（:371-414，毒沼）——

test('毒沼：DMG = 魔王等级 + 10 + 毒草（勇者等级）+ 毒虫（陷阱等级×2）（:392-404）', async () => {
  const fixture = setup_world(501, 3);
  fixture.store.set('cflag:0:9', 5); // 魔王等级 5
  fixture.store.set('cflag:1:9', 7); // 勇者等级 7（毒草）
  fixture.store.set('flag:85', 3); // 陷阱等级 3（毒虫）
  const { dungeon_swamp } = load(fixture);
  await dungeon_swamp(1, 3);
  // 5 + 10 + 7 + 3×2 = 28
  assert.equal(fixture.store.get('base:1:0'), 1972, 'BASE:A:0 -= DMG（:404）');
});

test('毒沼·最低 1 残留：伤害穿底钳到 1（:406-408）', async () => {
  const fixture = setup_world(501);
  fixture.store.set('base:1:0', 15); // DMG = 10 → 5 → 钳 1 需再小
  fixture.store.set('base:1:0', 9);
  const { dungeon_swamp } = load(fixture);
  await dungeon_swamp(1, 0);
  assert.equal(fixture.store.get('base:1:0'), 1, 'SIF BASE:A:0 < 1 → 1');
});

// —— @DUNGEON_FARM（:417-648，人类牧场日结算）——

test('牧场·只数累加与播报：FLAG:83 只怪物 += ITEM 槽（:448/:647/:625）', async () => {
  const fixture = setup_world(502);
  fixture.store.set('flag:83', 5);
  fixture.store.set('item:100', 3);
  fixture.store.set('itemname:100', '哥布林');
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(0, () => 0);
  assert.equal(fixture.store.get('item:100'), 8, 'ITEM:100 += 5（:448/:647）');
  assert.equal(
    fixture.store.get('flag:10004'),
    50,
    '卖孩子收入（:629，无条件）',
  );
  assert(
    text_lines(fixture).some((line) =>
      line.includes('人类牧场的肉便器生了5只哥布林。'),
    ),
    '出生播报（:625）',
  );
});

test('牧场·只数上限 999（:445-446）', async () => {
  const fixture = setup_world(502);
  fixture.store.set('flag:83', 10);
  fixture.store.set('item:100', 995);
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(0, () => 0);
  assert.equal(fixture.store.get('item:100'), 999, '钳到 999');
});

test('牧场·SIF 作用域事故 1:1 保留：不卖孩子也计 10G/只，卖孩子时双重计入（#14）', async () => {
  // SELL_BABY 关（flag:614 = 0）：首计入不发生，:629 的无条件计入仍在
  const off = setup_world(502);
  off.store.set('flag:83', 5);
  const { dungeon_farm } = load(off);
  await dungeon_farm(0, () => 0);
  assert.equal(
    off.store.get('flag:10004'),
    50,
    'FLAG:614 = 0 仍 +50（原作缺陷）',
  );

  // SELL_BABY 开（flag:614 位 1）：:443 首计入 50 + :629 再计 50 = 100
  const on = setup_world(502);
  on.store.set('flag:83', 5);
  on.store.set('flag:614', 2);
  const { dungeon_farm: farm2 } = load(on);
  await farm2(0, () => 0);
  assert.equal(on.store.get('flag:10004'), 100, '卖孩子双重计入（原作缺陷）');
  assert(
    text_lines(on).some((line) => line.includes('卖了50G')),
    '卖孩子播报（:628，SIF 只管这一行）',
  );
});

test('牧场·挤乳与扶她产出：&1 加奶钱、&2 加 MASTER 经验（:631-642）', async () => {
  const fixture = setup_world(502, 3);
  fixture.store.set('flag:83', 5);
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(3, () => 0);
  assert.equal(
    fixture.store.get('flag:10004'),
    55,
    '无条件 50（:629）+ 挤乳 5（:634）',
  );
  assert.equal(
    fixture.store.get('exp:0:80'),
    5,
    'EXP:0:80 += 5（:641，角色 0）',
  );
});

test('牧场·早退：FLAG:83 <= 0 不结算（:428-430）', async () => {
  const fixture = setup_world(502);
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(0, () => {
    throw new Error('不应掷随机数');
  });
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0);
});

// —— @DUNGEON_FARM_RESCUE（:650-680，勇者到达牧场）——

test('牧场救援·原作缺陷 1:1 保留：实参是 EXTRA，按角色号读 CFLAG:1（#14）', async () => {
  // EXTRA = 0 → 读 CFLAG:0:1（魔王，0 ≠ 12）→ 救走一只
  const fixture = setup_world(502, 0);
  fixture.store.set('flag:83', 3);
  const { dungeon_farm_rescue } = load(fixture);
  await dungeon_farm_rescue(0);
  assert.equal(fixture.store.get('flag:83'), 2, 'EXTRA = 0 读魔王状态位 → -1');

  // EXTRA = 1 → 读 CFLAG:1:1 == 12（战役中的勇者 1）→ 不救
  const campaign = setup_world(502, 1);
  campaign.store.set('flag:83', 3);
  campaign.store.set('cflag:1:1', 12);
  const { dungeon_farm_rescue: rescue2 } = load(campaign);
  await rescue2(1);
  assert.equal(
    campaign.store.get('flag:83'),
    3,
    'EXTRA = 1 恰逢勇者在战役 → 不减',
  );

  // EXTRA = 2 → 角色号 2 不存在（undefined ≠ 12）→ 救走
  const ghost = setup_world(502, 2);
  ghost.store.set('flag:83', 3);
  const { dungeon_farm_rescue: rescue3 } = load(ghost);
  await rescue3(2);
  assert.equal(ghost.store.get('flag:83'), 2, 'EXTRA = 2 读不到角色 → -1');
});

test('牧场救援·早退：FLAG:83 <= 0 直接返回（:669-671）', async () => {
  const fixture = setup_world(502);
  const { dungeon_farm_rescue } = load(fixture);
  await dungeon_farm_rescue(0);
  assert.equal(fixture.store.get('flag:83') ?? 0, 0);
});

// —— @DUNGEON_ICE（:683-735，冰室）——

test('冰室：攻击力 *= 9 /= 10 截断（:716-718），积雪扣气力（:720-724）', async () => {
  const fixture = setup_world(503, 2);
  fixture.store.set('cflag:1:11', 105); // floor(105×9/10) = floor(94.5) = 94
  fixture.store.set('cflag:0:9', 3); // 积雪 MDMG = 3 + 2 = 5
  const { dungeon_ice } = load(fixture);
  await dungeon_ice(1, 2, seq([1, 1])); // 吹雪掷不中（rand(6) = 1）
  assert.equal(fixture.store.get('cflag:1:11'), 94, 'CFLAG:11 = floor(945/10)');
  assert.equal(fixture.store.get('base:1:1'), 995, 'BASE:A:1 -= 5（:724）');
});

test('冰室·吹雪：RAND:6 == 0 时破坏 CFLAG:560-564 的一件 EX 道具（:706-714）', async () => {
  const fixture = setup_world(503, 1);
  fixture.store.set('cflag:1:562', 7); // 槽 562（RAND:5 = 2 + 560）
  const { dungeon_ice } = load(fixture);
  await dungeon_ice(1, 1, seq([0, 2])); // rand(6)=0 触发 → rand(5)=2 → 槽 562
  assert.equal(fixture.store.get('cflag:1:562'), 0, 'CFLAG:A:562 = 0（:713）');
  assert.equal(
    fixture.store.get('cflag:1:11'),
    0,
    '攻击衰减照走（105 未设 → 0）',
  );
});

// —— @DUNGEON_HEAT（:738-801，热砂）——

test('热砂：防御力 *= 9 /= 10 截断（:780-781），火柱扣体力钳 1（:783-791）', async () => {
  const fixture = setup_world(504, 2);
  fixture.store.set('cflag:1:12', 105);
  fixture.store.set('cflag:0:9', 3); // 火柱 DMG = 3 + 10 = 13
  const { dungeon_heat } = load(fixture);
  await dungeon_heat(1, 2, seq([1])); // 绿洲掷不中
  assert.equal(fixture.store.get('cflag:1:12'), 94, 'CFLAG:12 = floor(945/10)');
  assert.equal(fixture.store.get('base:1:0'), 1987, 'BASE:A:0 -= 13（:787）');
});

test('热砂·绿洲：气力 +50 封顶、TARGET 的 JUEL:6 与好感度上升、防御不衰减（:759-776）', async () => {
  const fixture = setup_world(504, 1);
  fixture.store.set('base:1:1', 980); // +50 → 1030 > 1000 → 封 1000
  fixture.store.set('cflag:0:9', 4); // 屈服点 = 4×4 = 16
  fixture.store.set('cflag:1:12', 100);
  fixture.store.set('cflag:1:2', 30);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 1; // run_dungeon :37 的等价置位
  const { dungeon_heat } = load(fixture);
  const ret = await dungeon_heat(1, 1, seq([0])); // rand(6)=0 → 绿洲
  assert.equal(ret, 0, '绿洲臂 RETURN 0（:775）');
  assert.equal(fixture.store.get('base:1:1'), 1000, 'MAXBASE 封顶（:764-765）');
  assert.equal(
    fixture.store.get('juel:1:6'),
    16,
    'JUEL:TARGET:6 += 16（:772）',
  );
  assert.equal(
    fixture.store.get('cflag:1:2'),
    50,
    'CFLAG:TARGET:2 += 20（:773）',
  );
  assert.equal(fixture.store.get('cflag:1:12'), 100, '防御衰减被绿洲臂短路');
});

// —— @DUNGEON_MASE（:804-846，迷阵）——

test('迷阵：迷路时侵攻度 -= BACK（扩张各 +5）、立迷惑 509（:825-844）', async () => {
  const fixture = setup_world(505, 3);
  const { dungeon_mase } = load(fixture);
  const ctx = { d20: 50 };
  await dungeon_mase(1, 3, seq([1]), ctx); // rand(3)=1 ≥ 1 → 迷路；BACK = 10
  assert.equal(ctx.d20, 40, 'D:20 -= 10（:835，ctx 回写）');
  assert.equal(fixture.store.get('cflag:1:509'), 1, '迷惑状態（:844）');
});

test('迷阵·不迷路：RAND:3 == 0 直接返回，侵攻度与迷惑都不动（:832-833）', async () => {
  const fixture = setup_world(505, 3);
  const { dungeon_mase } = load(fixture);
  const ctx = { d20: 50 };
  await dungeon_mase(1, 3, seq([0]), ctx);
  assert.equal(ctx.d20, 50, 'D:20 不动');
  assert.equal(fixture.store.get('cflag:1:509') ?? 0, 0, '509 不立');
});

// —— @DUNGEON_MUSEUM（:849-912，博物馆）——

test('博物馆：气力 -= 展品×5（上限 MAXBASE/4），魔像 -= 展品×2 体力钳 1（:876-910）', async () => {
  const fixture = setup_world(506, 1);
  fixture.store.set('flag:84', 10); // MDMG = 50（≤ 250 上限）；DMG = 20
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 1, seq([1])); // 陈列棚掷不中（rand(4) = 1）
  assert.equal(fixture.store.get('base:1:1'), 950, 'BASE:A:1 -= 50（:904）');
  assert.equal(fixture.store.get('base:1:0'), 1980, 'BASE:A:0 -= 20（:906）');
});

test('博物馆·气力上限：MDMG 钳 MAXBASE:A:1 / 4（:882-883）', async () => {
  const fixture = setup_world(506, 0);
  fixture.store.set('flag:84', 300); // 1500 > 1000/4 = 250
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 0, seq([1]));
  assert.equal(fixture.store.get('base:1:1'), 750, '钳 250');
});

test('博物馆·陈列架：RAND:4 == 0 时 CFLAG:503 位 5 立起，重复不叠加（:892-902）', async () => {
  const fixture = setup_world(506, 2);
  fixture.store.set('flag:84', 1);
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 2, seq([0])); // rand(4)=0 → 陈列棚
  assert.equal(fixture.store.get('cflag:1:503'), 32, '位 5（32）立起（:900）');
  await dungeon_museum(1, 2, seq([0]));
  assert.equal(
    fixture.store.get('cflag:1:503'),
    32,
    '已在位不重复加（:896-899）',
  );
});

test('博物馆·早退：展品 FLAG:84 <= 0 直接返回（:872-874）', async () => {
  const fixture = setup_world(506, 1);
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 1, () => {
    throw new Error('不应掷随机数');
  });
  assert.equal(fixture.store.get('base:1:1'), 1000, '不结算');
});

// —— @DUNGEON_HOTEL（:915-1013，娼馆街）——

test('娼馆街·男淫魔档：低善恶非处女 → 入账扣款 + KARMA 存根（:946-948/:1008-1011）', async () => {
  const fixture = setup_world(507, 0);
  fixture.store.set('cflag:1:151', -30); // < -20
  fixture.store.set('cflag:1:9', 2); // COST = 2×8+150 = 166
  const { dungeon_hotel } = load(fixture);
  await dungeon_hotel(1, 0);
  assert.equal(fixture.store.get('flag:10004'), 166, 'MONEY += COST（:1008）');
  assert.equal(fixture.store.get('exflag:4444'), 166, '镜像（:1009）');
  assert.equal(
    fixture.store.get('cflag:1:580'),
    834,
    'CFLAG:580 -= COST（:1010）',
  );
  assert.equal(stub_count(fixture, 'KARMA'), 1, 'CALL KARMA, A, -1（:1011）');
});

test('娼馆街·业态覆盖序：萝莉控（142）压过善恶档（:961-963）', async () => {
  const fixture = setup_world(507, 0);
  fixture.store.set('cflag:1:151', -30); // 先命中男淫魔
  fixture.store.set('talent:1:142', 1); // 萝莉控覆盖 → MENU 2
  fixture.store.set('talent:1:143', 0);
  fixture.store.set('flag:5', 32); // 开日志验业态播报
  const { dungeon_hotel } = load(fixture);
  await dungeon_hotel(1, 0);
  assert(
    text_lines(fixture).some((line) =>
      line.includes('阿尔在娼馆街和少女奴隶一起'),
    ),
    'MENU 2 = 少女奴隶（SIF 链后者覆盖前者）',
  );
});

test('娼馆街·扩张加价：两位各 ×1.1 逐次截断（:974-978）', async () => {
  const fixture = setup_world(507, 3);
  fixture.store.set('cflag:1:151', -30);
  fixture.store.set('cflag:1:9', 2); // 166 → floor(182.6) = 182 → floor(200.2) = 200
  const { dungeon_hotel } = load(fixture);
  await dungeon_hotel(1, 3);
  assert.equal(fixture.store.get('flag:10004'), 200, 'TIMES 1.1 两次');
});

test('娼馆街·无交集：MENU == 0 直接离开，不转账（:965-970）', async () => {
  const fixture = setup_world(507, 0);
  const { dungeon_hotel } = load(fixture);
  await dungeon_hotel(1, 0);
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0, '不入账');
  assert.equal(fixture.store.get('cflag:1:580'), 1000, '不扣款');
});

// —— RESULT 契约与 D:20 透传（run_dungeon 贯通，验收线）——

test('贯通·店遭遇：:386 的 RESULT 1 累进 NO_BATTLE，战斗相位走训练臂（:424-440）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:0:9', 5); // 魔王等级 5 → 训练经验
  const { run_dungeon } = fixture.load_module('dungeon/dungeon');
  // 掷序：rand(20)×1 + rand(10)×6（WALK = 10 + 0×6 = 10 → 滞留臂）→
  // rand(3)×1 + rand(2)×1（受者掷选 → 队长）→ 房间的 rand(10) = 0 → 店遭遇
  const seq_rand = seq([10, 0, 0, 0, 0, 0, 0, 1, 1, 0]);
  await run_dungeon(1, seq_rand);
  assert.equal(fixture.store.get('cflag:1:502'), 10, '侵攻度 = WALK（滞留臂）');
  assert.equal(
    fixture.store.get('exp:1:80'),
    5,
    'NO_BATTLE > 0 → 训练臂加魔王等级（:434）而非战斗',
  );
  assert.equal(
    stub_count(fixture, 'SELL_EX_ITEM'),
    1,
    '店遭遇真跑（房间模块经 dungeon.js 接入）',
  );
});

test('贯通·迷阵：MASE 的 D:20 写经 ctx 收回侵攻度（:835 ↔ :748）', async () => {
  const fixture = setup_world(505, 3); // 第 1 层迷阵，双扩张 BACK = 10
  const { run_dungeon } = fixture.load_module('dungeon/dungeon');
  // WALK = 40（rand(20)=10 + rand(10)×6=30）→ 滞留臂（侵攻度 40）→
  // 房间 rand(10) = 5 不遇店 → MASE rand(3) = 1 迷路 → D:20 = 40 - 10 = 30
  const seq_rand = seq([10, 5, 5, 5, 5, 5, 5, 1, 1, 5, 1]);
  await run_dungeon(1, seq_rand);
  assert.equal(
    fixture.store.get('cflag:1:502'),
    30,
    'MASE 的 -10 从房间段活到 :748 的写回',
  );
  assert.equal(fixture.store.get('cflag:1:509'), 1, '迷惑状態立起');
});

// —— 存根清单核对（dungeon-trap.test.js 同款）——

test('存根清单可检索：docs/stub-registry.md 收录 dungeon-room 的全部存根化调用', () => {
  const fixture = create_era_fixture();
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  const names = load(fixture).STUBBED_CALLS;
  assert.ok(names.length >= 4, `名单 ${names.length} 条（应 ≥ 4）`);
  for (const name of names) {
    assert.ok(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
