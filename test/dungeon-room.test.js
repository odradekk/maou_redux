/**
 * ere/dungeon/dungeon-room.js 十四函数的行为测试（issue #177，阶段 3 H8）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经各
 * 函数的 rand 参数注入（run_dungeon / dungeon-trap 先例）；贯通用例用
 * 序列随机源（数组依序取值）钉住「房间掷在 walk 掷之后」的次序——分发
 * 器的店遭遇掷是其后的第 10 枚（1×rand(20) + 6×rand(10) + 掷选
 * 受者的 rand(3) + rand(2)，见 dungeon.js 设施段）。
 *
 * 验收对应（#177 清单）：
 *   - 每种设施各一条测试证明效果落到正确变量（毒沼扣体力 / 冰室削攻击 /
 *     热砂削防御 / 迷阵扣侵攻度+立迷惑 / 博物馆气力伤害+位域 / 娼馆街
 *     入账 / 商店街三分支 / 牧场只数与三路产出）；
 *   - dungeon_room_day 与 dungeon_shop_day 两条日结算入口各有测试
 *     （含 event-nextday 的接入）；
 *   - RESULT 契约：店遭遇返回 1 → NO_BATTLE 累加 → 主循环走训练分支；
 *   - 已修缺陷两处有回归钉（#651）：FARM 卖孩子收入只认 FLAG:614 位 1 且
 *     只计一次、dungeon_farm_rescue 按勇者本人状态（CFLAG:1 == 12 不停留）。
 */

const assert = require('node:assert/strict');
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

// —— dungeon_room 分发器 ——

test('分发·店遭遇：RESULT 1（不发生战斗），出售与购买 EX 道具真身接通', async () => {
  const fixture = setup_world();
  const { dungeon_room } = load(fixture);
  // 店遭遇掷 0；出售五槽均掷 1；add_ex_item 的武器掷、种类、未鉴定掷均 1。
  const ret = await dungeon_room(1, seq([0, 1, 1, 1, 1, 1, 1, 1, 1]));
  assert.equal(ret, 1, 'RESULT 1 = 戦闘が発生しないフラグ');
  // 等级 0 → COST = 50；买到 401 后店铺入账、勇者付款。
  assert.equal(fixture.store.get('cflag:1:560'), 401, '补给进入首个空槽');
  assert.equal(fixture.store.get('flag:10004'), 50, '买到后入账');
  assert.equal(fixture.store.get('cflag:1:580'), 950, '所持金扣 50');
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

test('分发·毒沼：ROOM == 501 时受者吃 CFLAG:0:9 + 10 伤害', async () => {
  const fixture = setup_world(501);
  const { dungeon_room } = load(fixture);
  const ret = await dungeon_room(1, (n) => 1 % n);
  assert.equal(ret, 0);
  assert.equal(
    fixture.store.get('base:1:0'),
    1990,
    'DMG = 0（魔王等级）+ 10；BASE:A:0 -= DMG',
  );
});

test('分发·战役：CFLAG:1 == 12 走 campaign_room/extra，FLAG:400 未置位时恒 0', async () => {
  const fixture = setup_world(501);
  fixture.store.set('cflag:1:1', 12);
  const { dungeon_room } = load(fixture);
  const ret = await dungeon_room(1, (n) => 1 % n);
  assert.equal(ret, 0, 'FLAG:400 < 1 → campaign_room/extra 均恒 0');
  assert.equal(
    fixture.store.get('base:1:0'),
    2000,
    '毒沼不在战役分支里（ROOM = 0）',
  );
});

test('campaign_room/campaign_room_extra：FLAG:400 = 1 时按楼层派发到 campaign_room_1/campaign_room_extra_1（#469）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:400', 1);
  fixture.load_module('page/page-campaign-1'); // 触发战役 1 的 register()
  const { campaign_room_extra } = fixture.load_module('dungeon/dungeon-room');
  const { campaign_room } = fixture.load_module('dungeon/dungeon');
  // campaign_room_1：楼层 > 3 → 502，否则 0
  assert.equal(await campaign_room(3), 0);
  assert.equal(await campaign_room(4), 502);
  // campaign_room_extra_1：楼层 > 4 位 0（+1），> 5 再位 1（+2）
  assert.equal(await campaign_room_extra(4), 0);
  assert.equal(await campaign_room_extra(5), 1);
  assert.equal(await campaign_room_extra(6), 3);
});

test('campaign_room/campaign_room_extra：FLAG:400 < 1 时恒 0（未在战役中）', async () => {
  const fixture = create_era_fixture();
  const { campaign_room_extra } = fixture.load_module('dungeon/dungeon-room');
  const { campaign_room } = fixture.load_module('dungeon/dungeon');
  assert.equal(await campaign_room(4), 0);
  assert.equal(await campaign_room_extra(6), 0);
});

test('分发·迎击：CFLAG:1 == 3 转建设（A = ARG:0），不掷店遭遇', async () => {
  const fixture = setup_world(501);
  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('cflag:1:500', 3); // 扩张指令
  const { dungeon_room } = load(fixture);
  // rand(4) = 0 → 拡張1
  const ret = await dungeon_room(1, () => 0);
  assert.equal(ret, 0, '建设路径 RETURN 0');
  assert.equal(fixture.store.get('flag:360'), 1, '拡張位 0 立起');
  assert.equal(fixture.store.get('cflag:1:500'), 0, '指令清除');
});

test('分发·早退：非 2/3/12 状态不掷任何随机数', async () => {
  const fixture = setup_world(501);
  fixture.store.set('cflag:1:1', 0);
  const { dungeon_room } = load(fixture);
  let drawn = 0;
  const ret = await dungeon_room(1, () => {
    drawn += 1;
    return 0;
  });
  assert.equal(ret, 0);
  assert.equal(drawn, 0, '状态检查在店遭遇掷之前');
});

// —— dungeon_room_build ——

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
  assert.equal(fixture.store.get('flag:360'), 1, 'FLAG:360 += 1');
  assert.equal(fixture.store.get('cflag:1:500'), 0, '指令清除');
  assert.equal(calls, 1, '只掷 RAND:4 一枚');
});

test('建设·拡張2：RAND:4 != 0 且 RAND:3 == 0 → +2', async () => {
  const fixture = setup_world(501, 0);
  fixture.store.set('cflag:1:500', 3);
  const { dungeon_room_build } = load(fixture);
  await dungeon_room_build(1, seq([1, 0]));
  assert.equal(fixture.store.get('flag:360'), 2, 'FLAG:360 += 2');
});

test('建设·已有该扩张位：原地返回不清指令（SIF 早退，有意保留）', async () => {
  const fixture = setup_world(501, 1); // 位 0 已立
  fixture.store.set('cflag:1:500', 3);
  const { dungeon_room_build } = load(fixture);
  await dungeon_room_build(1, () => 0);
  assert.equal(fixture.store.get('flag:360'), 1, '扩张位不动');
  assert.equal(
    fixture.store.get('cflag:1:500'),
    3,
    '指令保留（RETURN 0 在清指令之前——有意保留）',
  );
});

test('建设·两掷都不中：返回且不清指令', async () => {
  const fixture = setup_world(501, 0);
  fixture.store.set('cflag:1:500', 3);
  const { dungeon_room_build } = load(fixture);
  await dungeon_room_build(1, seq([1, 1]));
  assert.equal(fixture.store.get('flag:360'), 0, '不扩张');
  assert.equal(fixture.store.get('cflag:1:500'), 3, '指令保留');
});

test('建设·命令检查与设施检查：CFLAG:500 != 3 或无设施直接返回', async () => {
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

// —— dungeon_room_day 与 dungeon_shop_day ——

test('日结算·room_day：第 1 层商店街与第 2 层牧场都结算，其余设施无日结算', async () => {
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

  // 商店街：10 × (0 + 5) × 2 = 100；牧场：FLAG:614 = 0（不卖孩子）→ 无现金
  assert.equal(fixture.store.get('flag:10004'), 100, '税入 100 + 牧场 0');
  const texts = text_lines(fixture);
  assert(
    texts.some((line) =>
      line.includes('从商店街征收了今天的税金。（现金收入+100）'),
    ),
    '税入播报',
  );
  assert(
    texts.some((line) => line.includes('人类牧场的肉便器生了5只哥布林。')),
    '牧场播报（名字表经 itemname）',
  );
  assert.equal(
    fixture.store.get('base:1:0'),
    2000,
    '毒沼是遭遇型设施，日结算不吃伤害（只认 500/502）',
  );
});

test('日结算·shop_day：威望五档——岌岌可危归零、动荡不安 ×3/10、广受爱戴 ×2', async () => {
  const fixture = setup_world(500);
  fixture.store.set('cflag:0:9', 10);
  const { dungeon_shop_day } = load(fixture);
  const zero = () => 0; // RAND:10 = 0 → 税基 10 × 5 = 50

  // 威望 15（[0, 20] 档）：归零
  fixture.store.set('exflag:99', 15);
  await dungeon_shop_day(0, zero);
  assert.equal(fixture.store.get('flag:10004'), 0, '岌岌可危 → 税入 0');
  assert(text_lines(fixture).includes('威望值是【岌岌可危】'), '播报');
  // #597：PRINTL 落在播报 PRINTL 之后（那一行已结束）——它是
  // **真空行**，税入播报前恰有一个空行；删掉即少一行（本用例的检查）
  {
    const lines = fixture.lines;
    const tax = lines.findIndex(
      (line) =>
        line.type === 'text' && line.text.includes('从商店街征收了今天的税金'),
    );
    assert.ok(tax >= 1, '税入播报行出现在首行之后（否则断言会空过）');
    assert.equal(lines[tax - 1].type, 'br', '真空行在税入行之前');
    assert.equal(
      lines[tax - 2].type,
      'text',
      '空行之前是威望行（不多不少一个）',
    );
  }

  // 威望 30（(20, 40] 档）：×3/10 → 15
  fixture.store.set('exflag:99', 30);
  await dungeon_shop_day(0, zero);
  assert.equal(fixture.store.get('flag:10004'), 15, '动荡不安 ×3/10');

  // 威望 100（(80, 100] 档）：×2 → 100
  fixture.store.set('exflag:99', 100);
  await dungeon_shop_day(0, zero);
  assert.equal(fixture.store.get('flag:10004'), 115, '广受爱戴 ×2 累加');

  // 威望 150（区间外）：无折扣 → 50
  fixture.store.set('exflag:99', 150);
  await dungeon_shop_day(0, zero);
  assert.equal(fixture.store.get('flag:10004'), 165, '>100 无档位（直落）');
});

test('日结算·shop_day：扩张两路各加 CFLAG:0:9 + 20', async () => {
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
  assert.equal(fixture.store.get('exflag:4444'), 300, 'EX_FLAG:4444 镜像');
});

test('日结算·接入：event-nextday 的调用点真调 room_day（商店街税入到账）', async () => {
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
});

// —— dungeon_shop（商店街）——

test('商店街·逛街档：扣所持金入账，体力 +20 气力 +50', async () => {
  const fixture = setup_world(500, 0);
  fixture.store.set('cflag:1:9', 2); // 勇者等级 2 → COST = 20
  const { dungeon_shop } = load(fixture);
  // 两掷都不中（1/3 与 1/2 都落空）→ 逛街档
  await dungeon_shop(1, 0, seq([1, 1]));
  assert.equal(fixture.store.get('flag:10004'), 20, 'MONEY += COST');
  assert.equal(fixture.store.get('exflag:4444'), 20, 'EX_FLAG:4444 镜像');
  assert.equal(fixture.store.get('cflag:1:580'), 980, 'CFLAG:580 -= COST');
  assert.equal(fixture.store.get('base:1:0'), 2020, '体力 +20');
  assert.equal(fixture.store.get('base:1:1'), 1050, '气力 +50');
});

test('商店街·武器屋：扩张位 0 + RAND:3 == 0 → 真身换武器并转账', async () => {
  const fixture = setup_world(500, 1);
  fixture.store.set('cflag:1:9', 2); // 武器档 COST = 2×8+20 = 36
  fixture.store.set('talent:1:200', 1); // 战士可装备 RAND:11 == 0 的剑
  const { dungeon_shop } = load(fixture);
  await dungeon_shop(1, 1, seq([0]));
  assert.equal(fixture.store.get('cflag:1:550'), 1040, '第 1 层的剑入装备槽');
  assert.equal(fixture.store.get('flag:10004'), 36, 'RESULT > 0 → 入账');
  assert.equal(fixture.store.get('cflag:1:580'), 964, '所持金扣 36');
});

test('商店街·道具屋：扩张位 1 + RAND:2 == 0（武器掷不中）', async () => {
  const fixture = setup_world(500, 2);
  fixture.store.set('cflag:1:9', 2);
  const { dungeon_shop } = load(fixture);
  await dungeon_shop(1, 2, seq([0, 1, 1, 1])); // 道具店掷中，ADD 的武器掷不中
  assert.equal(fixture.store.get('cflag:1:560'), 401, '随机补给进入首个空槽');
  assert.equal(fixture.store.get('flag:10004'), 32, '买到后入账');
  assert.equal(fixture.store.get('cflag:1:580'), 968, '扣道具价 32');
});

test('商店街·钱不够：逛街档 CFLAG:580 < COST 直接返回', async () => {
  const fixture = setup_world(500, 0);
  fixture.store.set('cflag:1:9', 2); // COST = 20
  fixture.store.set('cflag:1:580', 15);
  const { dungeon_shop } = load(fixture);
  await dungeon_shop(1, 0, seq([1, 1]));
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0, '不入账');
  assert.equal(fixture.store.get('base:1:0'), 2000, '不吃喝');
});

// —— dungeon_shop_itemsell（不可思议的房间）——

test('不可思议的房间：否定の珠 > 2000 换 500 所持金', async () => {
  const fixture = setup_world();
  fixture.store.set('juel:1:100', 2500);
  const { dungeon_shop_itemsell } = load(fixture);
  // sell_ex_item 五次均不中；随后 add_ex_item 的武器掷中但职业不适用，购买失败。
  await dungeon_shop_itemsell(1, seq([1, 1, 1, 1, 1, 0, 0]));
  assert.equal(fixture.store.get('juel:1:100'), 2000, 'JUEL:100 -= 500');
  assert.equal(fixture.store.get('cflag:1:580'), 1500, 'CFLAG:580 += 500');
});

test('不可思议的房间：反発刻印 1 点换 1000 战斗经验并递减', async () => {
  const fixture = setup_world();
  fixture.store.set('mark:1:3', 2);
  fixture.store.set('cflag:1:580', 0); // 钱不够 → 购买段早退
  const { dungeon_shop_itemsell } = load(fixture);
  // sell_ex_item 五次均不中。这个随机源不能省：空槽也照卖（RAND:10 == 0
  // 就入账 200，use_ex_item 不看槽里有没有东西），真随机下有
  // 1 - 0.9^5 = 41% 的概率把 CFLAG:580 垫高、拆掉本例「钱不够」的前提。
  await dungeon_shop_itemsell(1, seq([1, 1, 1, 1, 1]));
  assert.equal(fixture.store.get('exp:1:80'), 2000, 'EXP:80 += 2×1000');
  assert.equal(fixture.store.get('mark:1:3'), 1, 'MARK:3 -= 1');
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0, '钱不够不买');
});

// —— dungeon_swamp（毒沼）——

test('毒沼：DMG = 魔王等级 + 10 + 毒草（勇者等级）+ 毒虫（陷阱等级×2）', async () => {
  const fixture = setup_world(501, 3);
  fixture.store.set('cflag:0:9', 5); // 魔王等级 5
  fixture.store.set('cflag:1:9', 7); // 勇者等级 7（毒草）
  fixture.store.set('flag:85', 3); // 陷阱等级 3（毒虫）
  const { dungeon_swamp } = load(fixture);
  await dungeon_swamp(1, 3);
  // 5 + 10 + 7 + 3×2 = 28
  assert.equal(fixture.store.get('base:1:0'), 1972, 'BASE:A:0 -= DMG');
});

test('毒沼·最低 1 残留：伤害穿底钳到 1', async () => {
  const fixture = setup_world(501);
  fixture.store.set('base:1:0', 15); // DMG = 10 → 5 → 钳 1 需再小
  fixture.store.set('base:1:0', 9);
  const { dungeon_swamp } = load(fixture);
  await dungeon_swamp(1, 0);
  assert.equal(fixture.store.get('base:1:0'), 1, 'SIF BASE:A:0 < 1 → 1');
});

// —— dungeon_farm（人类牧场日结算）——

test('牧场·只数累加与播报：FLAG:83 只怪物 += ITEM 槽', async () => {
  const fixture = setup_world(502);
  fixture.store.set('flag:83', 5);
  fixture.store.set('item:100', 3);
  fixture.store.set('itemname:100', '哥布林');
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(0, () => 0);
  assert.equal(fixture.store.get('item:100'), 8, 'ITEM:100 += 5');
  assert.equal(
    fixture.store.get('flag:10004') ?? 0,
    0,
    '卖孩子关闭（FLAG:614 = 0）时不加钱（已修正）',
  );
  assert(
    text_lines(fixture).some((line) =>
      line.includes('人类牧场的肉便器生了5只哥布林。'),
    ),
    '出生播报',
  );
});

test('牧场·只数上限 999', async () => {
  const fixture = setup_world(502);
  fixture.store.set('flag:83', 10);
  fixture.store.set('item:100', 995);
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(0, () => 0);
  assert.equal(fixture.store.get('item:100'), 999, '钳到 999');
});

test('牧场·卖孩子收入与 FLAG:614 位 1 一致：关闭不加、开启只计一次', async () => {
  // SELL_BABY 关（flag:614 = 0）：出生只数入库存、无现金
  const off = setup_world(502);
  off.store.set('flag:83', 5);
  const { dungeon_farm } = load(off);
  await dungeon_farm(0, () => 0);
  assert.equal(off.store.get('flag:10004') ?? 0, 0, 'FLAG:614 = 0 不加钱');

  // SELL_BABY 开（flag:614 位 1）：只数折现金 50、只计一次
  const on = setup_world(502);
  on.store.set('flag:83', 5);
  on.store.set('flag:614', 2);
  const { dungeon_farm: farm2 } = load(on);
  await farm2(0, () => 0);
  assert.equal(on.store.get('flag:10004'), 50, '卖孩子只计一次 50');
  assert(
    text_lines(on).some((line) => line.includes('卖了50G')),
    '卖孩子播报',
  );
});

test('牧场·挤乳与扶她产出：&1 加奶钱、&2 加 MASTER 经验', async () => {
  const fixture = setup_world(502, 3);
  fixture.store.set('flag:83', 5);
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(3, () => 0);
  assert.equal(
    fixture.store.get('flag:10004'),
    5,
    '不卖孩子无现金（已修正）+ 挤乳 5',
  );
  assert.equal(fixture.store.get('exp:0:80'), 5, 'EXP:0:80 += 5（角色 0）');
});

test('牧场·早退：FLAG:83 <= 0 不结算', async () => {
  const fixture = setup_world(502);
  const { dungeon_farm } = load(fixture);
  await dungeon_farm(0, () => {
    throw new Error('不应掷随机数');
  });
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0);
});

// —— dungeon_farm_rescue（勇者到达牧场）——

test('牧场救援：战役中（CFLAG:1 == 12）的勇者不停留，侵攻中救走一只', async () => {
  // 侵攻中（cflag:1:1 = 2，setup 默认）→ 救走一只
  const fixture = setup_world(502, 0);
  fixture.store.set('flag:83', 3);
  const { dungeon_farm_rescue } = load(fixture);
  await dungeon_farm_rescue(1);
  assert.equal(fixture.store.get('flag:83'), 2, '侵攻中的勇者救走一只');

  // 战役中（cflag:1:1 = 12）→ 不减
  const campaign = setup_world(502, 1);
  campaign.store.set('flag:83', 3);
  campaign.store.set('cflag:1:1', 12);
  const { dungeon_farm_rescue: rescue2 } = load(campaign);
  await rescue2(1);
  assert.equal(campaign.store.get('flag:83'), 3, '战役中的勇者不停留');
});

test('牧场救援·早退：FLAG:83 <= 0 直接返回', async () => {
  const fixture = setup_world(502);
  const { dungeon_farm_rescue } = load(fixture);
  await dungeon_farm_rescue(0);
  assert.equal(fixture.store.get('flag:83') ?? 0, 0);
});

test('分发·人类牧场（502）：救走判定按勇者本人状态而非扩张位域', async () => {
  const fixture = setup_world(502, 2); // extra = 2
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(2);
  fixture.store.set('cflag:2:1', 12); // 2 号处于战役中（extra=2 时错读它）
  fixture.store.set('flag:83', 3);
  const { dungeon_room } = load(fixture);
  await dungeon_room(1, () => 1); // 店遭遇掷不中
  assert.equal(
    fixture.store.get('flag:83'),
    2,
    '实参是勇者 1（侵攻中）→ 救走一只（实参回退 extra 则读到 2 号的 12 不救）',
  );
});

// —— dungeon_ice（冰室）——

test('冰室：攻击力 *= 9 /= 10 截断，积雪扣气力', async () => {
  const fixture = setup_world(503, 2);
  fixture.store.set('cflag:1:11', 105); // floor(105×9/10) = floor(94.5) = 94
  fixture.store.set('cflag:0:9', 3); // 积雪 MDMG = 3 + 2 = 5
  const { dungeon_ice } = load(fixture);
  await dungeon_ice(1, 2, seq([1, 1])); // 吹雪掷不中（rand(6) = 1）
  assert.equal(fixture.store.get('cflag:1:11'), 94, 'CFLAG:11 = floor(945/10)');
  assert.equal(fixture.store.get('base:1:1'), 995, 'BASE:A:1 -= 5');
});

test('冰室·吹雪：RAND:6 == 0 时破坏 CFLAG:560-564 的一件 EX 道具', async () => {
  const fixture = setup_world(503, 1);
  fixture.store.set('cflag:1:562', 7); // 槽 562（RAND:5 = 2 + 560）
  const { dungeon_ice } = load(fixture);
  await dungeon_ice(1, 1, seq([0, 2])); // rand(6)=0 触发 → rand(5)=2 → 槽 562
  assert.equal(fixture.store.get('cflag:1:562'), 0, 'CFLAG:A:562 = 0');
  assert.equal(
    fixture.store.get('cflag:1:11'),
    0,
    '攻击衰减照走（105 未设 → 0）',
  );
});

// —— dungeon_heat（热砂）——

test('热砂：防御力 *= 9 /= 10 截断，火柱扣体力钳 1', async () => {
  const fixture = setup_world(504, 2);
  fixture.store.set('cflag:1:12', 105);
  fixture.store.set('cflag:0:9', 3); // 火柱 DMG = 3 + 10 = 13
  const { dungeon_heat } = load(fixture);
  await dungeon_heat(1, 2, seq([1])); // 绿洲掷不中
  assert.equal(fixture.store.get('cflag:1:12'), 94, 'CFLAG:12 = floor(945/10)');
  assert.equal(fixture.store.get('base:1:0'), 1987, 'BASE:A:0 -= 13');
});

test('热砂·绿洲：气力 +50 封顶、TARGET 的 JUEL:6 与好感度上升、防御不衰减', async () => {
  const fixture = setup_world(504, 1);
  fixture.store.set('base:1:1', 980); // +50 → 1030 > 1000 → 封 1000
  fixture.store.set('cflag:0:9', 4); // 屈服点 = 4×4 = 16
  fixture.store.set('cflag:1:12', 100);
  fixture.store.set('cflag:1:2', 30);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 1; // run_dungeon 的等价置位
  const { dungeon_heat } = load(fixture);
  const ret = await dungeon_heat(1, 1, seq([0])); // rand(6)=0 → 绿洲
  assert.equal(ret, 0, '绿洲分支 RETURN 0');
  assert.equal(fixture.store.get('base:1:1'), 1000, 'MAXBASE 封顶');
  assert.equal(fixture.store.get('juel:1:6'), 16, 'JUEL:TARGET:6 += 16');
  assert.equal(fixture.store.get('cflag:1:2'), 50, 'CFLAG:TARGET:2 += 20');
  assert.equal(fixture.store.get('cflag:1:12'), 100, '防御衰减被绿洲分支短路');
});

// —— dungeon_mase（迷阵）——

test('迷阵：迷路时侵攻度 -= BACK（扩张各 +5）、立迷惑 509', async () => {
  const fixture = setup_world(505, 3);
  const { dungeon_mase } = load(fixture);
  const ctx = { d20: 50 };
  await dungeon_mase(1, 3, seq([1]), ctx); // rand(3)=1 ≥ 1 → 迷路；BACK = 10
  assert.equal(ctx.d20, 40, 'D:20 -= 10（ctx 回写）');
  assert.equal(fixture.store.get('cflag:1:509'), 1, '迷惑状態');
});

test('迷阵·不迷路：RAND:3 == 0 直接返回，侵攻度与迷惑都不动', async () => {
  const fixture = setup_world(505, 3);
  const { dungeon_mase } = load(fixture);
  const ctx = { d20: 50 };
  await dungeon_mase(1, 3, seq([0]), ctx);
  assert.equal(ctx.d20, 50, 'D:20 不动');
  assert.equal(fixture.store.get('cflag:1:509') ?? 0, 0, '509 不立');
});

// —— dungeon_museum（博物馆）——

test('博物馆：气力 -= 展品×5（上限 MAXBASE/4），魔像 -= 展品×2 体力钳 1', async () => {
  const fixture = setup_world(506, 1);
  fixture.store.set('flag:84', 10); // MDMG = 50（≤ 250 上限）；DMG = 20
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 1, seq([1])); // 陈列棚掷不中（rand(4) = 1）
  assert.equal(fixture.store.get('base:1:1'), 950, 'BASE:A:1 -= 50');
  assert.equal(fixture.store.get('base:1:0'), 1980, 'BASE:A:0 -= 20');
});

test('博物馆·气力上限：MDMG 钳 MAXBASE:A:1 / 4', async () => {
  const fixture = setup_world(506, 0);
  fixture.store.set('flag:84', 300); // 1500 > 1000/4 = 250
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 0, seq([1]));
  assert.equal(fixture.store.get('base:1:1'), 750, '钳 250');
});

test('博物馆·陈列架：RAND:4 == 0 时 CFLAG:503 位 5 立起，重复不叠加', async () => {
  const fixture = setup_world(506, 2);
  fixture.store.set('flag:84', 1);
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 2, seq([0])); // rand(4)=0 → 陈列棚
  assert.equal(fixture.store.get('cflag:1:503'), 32, '位 5（32）立起');
  await dungeon_museum(1, 2, seq([0]));
  assert.equal(fixture.store.get('cflag:1:503'), 32, '已在位不重复加');
});

test('博物馆·早退：展品 FLAG:84 <= 0 直接返回', async () => {
  const fixture = setup_world(506, 1);
  const { dungeon_museum } = load(fixture);
  await dungeon_museum(1, 1, () => {
    throw new Error('不应掷随机数');
  });
  assert.equal(fixture.store.get('base:1:1'), 1000, '不结算');
});

// —— dungeon_hotel（娼馆街）——

test('娼馆街·男淫魔档：低善恶非处女 → 入账扣款 + KARMA 真身', async () => {
  const fixture = setup_world(507, 0);
  fixture.store.set('cflag:1:151', -30); // < -20
  fixture.store.set('cflag:1:9', 2); // COST = 2×8+150 = 166
  const { dungeon_hotel } = load(fixture);
  await dungeon_hotel(1, 0);
  assert.equal(fixture.store.get('flag:10004'), 166, 'MONEY += COST');
  assert.equal(fixture.store.get('exflag:4444'), 166, '镜像');
  assert.equal(fixture.store.get('cflag:1:580'), 834, 'CFLAG:580 -= COST');
  assert.equal(fixture.store.get('cflag:1:151'), -31, 'CALL KARMA, A, -1');
});

test('娼馆街·业态覆盖序：萝莉控（142）压过善恶档', async () => {
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

test('娼馆街·扩张加价：两位各 ×1.1 逐次截断', async () => {
  const fixture = setup_world(507, 3);
  fixture.store.set('cflag:1:151', -30);
  fixture.store.set('cflag:1:9', 2); // 166 → floor(182.6) = 182 → floor(200.2) = 200
  const { dungeon_hotel } = load(fixture);
  await dungeon_hotel(1, 3);
  assert.equal(fixture.store.get('flag:10004'), 200, 'TIMES 1.1 两次');
});

test('娼馆街·无交集：MENU == 0 直接离开，不转账', async () => {
  const fixture = setup_world(507, 0);
  const { dungeon_hotel } = load(fixture);
  await dungeon_hotel(1, 0);
  assert.equal(fixture.store.get('flag:10004') ?? 0, 0, '不入账');
  assert.equal(fixture.store.get('cflag:1:580'), 1000, '不扣款');
});

// —— RESULT 契约与 D:20 透传（run_dungeon 贯通，验收线）——

test('贯通·店遭遇：RESULT 1 累进 NO_BATTLE，战斗相位走训练分支', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:0:9', 5); // 魔王等级 5 → 训练经验
  const { run_dungeon } = fixture.load_module('dungeon/dungeon');
  // 掷序：rand(20)×1 + rand(10)×6（WALK = 10 + 0×6 = 10 → 滞留分支）→
  // rand(3)×1 + rand(2)×1（受者掷选 → 队长）→ 房间的 rand(10) = 0 → 店遭遇
  const seq_rand = seq([
    10,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0, // 走到店遭遇
    1,
    1,
    1,
    1,
    1, // 五个空槽均不卖
    1,
    1,
    1, // 买到 401
  ]);
  await run_dungeon(1, seq_rand);
  assert.equal(
    fixture.store.get('cflag:1:502'),
    10,
    '侵攻度 = WALK（滞留分支）',
  );
  assert.equal(
    fixture.store.get('exp:1:80'),
    5,
    'NO_BATTLE > 0 → 训练分支加魔王等级而非战斗',
  );
  assert.equal(fixture.store.get('cflag:1:560'), 401, '店遭遇真买到补给');
});

test('贯通·迷阵：dungeon_mase 的 D:20 写经 ctx 收回侵攻度', async () => {
  const fixture = setup_world(505, 3); // 第 1 层迷阵，双扩张 BACK = 10
  const { run_dungeon } = fixture.load_module('dungeon/dungeon');
  // WALK = 40（rand(20)=10 + rand(10)×6=30）→ 滞留分支（侵攻度 40）→
  // 房间 rand(10) = 5 不遇店 → MASE rand(3) = 1 迷路 → D:20 = 40 - 10 = 30
  const seq_rand = seq([10, 5, 5, 5, 5, 5, 5, 1, 1, 5, 1]);
  await run_dungeon(1, seq_rand);
  assert.equal(
    fixture.store.get('cflag:1:502'),
    30,
    'dungeon_mase 的 -10 从房间段活到写回',
  );
  assert.equal(fixture.store.get('cflag:1:509'), 1, '迷惑状態立起');
});

// 换真身，见上）：清单核对测试随之移除——名单为空时循环本身没有契约
// 可验证，留着只是形式（SOP §5 判断条件 5 的精神是防漏登记，不是防清单变短）。
