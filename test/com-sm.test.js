/**
 * ere/system/train/com-sm.js 的行为测试（issue #223 J13：SM 系指令族
 * 40-49——#209 裁定 6 的「四样装齐」行为靶）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @COM_ABLE40-49 的判据（SM 过滤/道具/场景挡/解除随时/助手门/服装挡/
 *     经验门槛——每条指令至少一段可用性用例）；
 *   - @COM40-49 真身（分档表逐档 + 装备位取反 + 经验上升 + TFLAG:30）；
 *   - @EQUIP_COM43-49 持续效果（SOURCE/UP 累加、链序消费在 source-check）；
 *   - TRAIN_MESSAGE_B 40-49 分支与 TRAIN_MESSAGE_A 40-42 分支（含
 *     TFLAG:899 的三指令共钳与 TEQUIP:46 段）；
 *   - CASE 40 升格规则与 JUMPFORM 落点；
 *   - TEQUIP:45 写入路径 → @KOJO_MESSAGE_COM 头部守卫（#213 接触面第 3 道）。
 *
 * 世界底座与 test/com0-caress.test.js 的 seed 同构：魔王 0 + 奴隶 31、
 * 火车表已开，直接经族调用（同时验注册接入）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.join(__dirname, '..');

/** 世界底座：开火车表、指好 TARGET/PLAYER、装好 SM 族。 */
function seed_world({ assi = -1 } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  if (assi > 0) {
    fixture.seed_chara(assi, {
      id: assi,
      name: `助手${assi}`,
      callname: `助手${assi}`,
    });
    fixture.era.addCharacter(assi);
  }
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = assi;
  era_flag.assiplay = 0;
  era_flag.selectcom = -1;
  fixture.load_module('system/train/com-sm');
  const { com_family, com_able_family, equip_com_family } = fixture.load_module(
    'system/train/com-family',
  );
  return { fixture, era_flag, com_family, com_able_family, equip_com_family };
}

/** 经族调用一条指令（真实循环里 SELECTCOM 由 train-loop 先置——测试同位） */
async function run_com(world, com) {
  world.era_flag.selectcom = com;
  return world.com_family.call(com);
}

// —— @COM_ABLE：判据逐条 ——

test('@COM_ABLE40：默认可执行；SM 过滤与四场景挡各挡一条；无道具要求', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(
    await com_able_family.call(40),
    1,
    '打屁股无道具要求（:1883-1901）',
  );

  fixture.store.set('flag:25', 16); // :1881-1882 FLAG:25 & 16（SM 系过滤）
  assert.equal(await com_able_family.call(40), 0);
  fixture.store.set('flag:25', 0);

  fixture.store.set('tequip:31:90', 1); // 触手调教中
  assert.equal(await com_able_family.call(40), 0);
  fixture.store.set('tequip:31:90', 0);
  fixture.store.set('tequip:31:55', 1); // 決闘中
  assert.equal(await com_able_family.call(40), 0);
  fixture.store.set('tequip:31:55', 0);
});

test('@COM_ABLE40：助手执行且顺从/百合弱、非施虐狂且抖S不足 → 不可', async () => {
  const { fixture, era_flag, com_able_family } = seed_world({ assi: 17 });
  era_flag.assiplay = 1;
  // ABL:17:10 = 3（≤4）、TALENT:17:83 无、ABL:17:20 = 1（< 2）
  fixture.store.set('abl:17:10', 3);
  fixture.store.set('abl:17:20', 1);
  assert.equal(await com_able_family.call(40), 0);

  // 施虐狂（TALENT:83）放行（:1886-1887 的第二臂）
  fixture.store.set('talent:17:83', 1);
  assert.equal(await com_able_family.call(40), 1);
  fixture.store.set('talent:17:83', 0);

  // 抖S ≥ 2 同样放行（40 的门槛比 41/42 低一档）
  fixture.store.set('abl:17:20', 2);
  assert.equal(await com_able_family.call(40), 1);
});

test('@COM_ABLE41/42：要持鞭/针；NOITEM 非零时免持；助手门 < 3', async () => {
  const { fixture, era_flag, com_able_family } = seed_world({ assi: 17 });

  assert.equal(await com_able_family.call(41), 0, '无鞭（ITEM:10 == 0）');
  assert.equal(await com_able_family.call(42), 0, '无针（ITEM:11 == 0）');
  fixture.store.set('item:10', 1);
  fixture.store.set('item:11', 1);
  assert.equal(await com_able_family.call(41), 1);
  assert.equal(await com_able_family.call(42), 1);

  // NOITEM ≠ 0（道具无视模式）——yml/NOITEM.yml 建桶后的读路径
  fixture.store.set('item:10', 0);
  fixture.store.set('noitem:0', 1);
  assert.equal(await com_able_family.call(41), 1, 'NOITEM 放行持有检查');
  fixture.store.set('noitem:0', 0);
  assert.equal(await com_able_family.call(41), 0);

  // 助手门：41/42 是 ABL:ASSI:20 < 3
  fixture.store.set('item:10', 1);
  era_flag.assiplay = 1;
  fixture.store.set('abl:17:10', 3);
  fixture.store.set('abl:17:20', 2);
  assert.equal(await com_able_family.call(41), 0);
  fixture.store.set('abl:17:20', 3);
  assert.equal(await com_able_family.call(41), 1);

  // 浴室挡（41/42 有、40 无）
  fixture.store.set('tequip:31:58', 1);
  assert.equal(await com_able_family.call(41), 0);
  assert.equal(await com_able_family.call(42), 0);
});

test('@COM_ABLE43：失神挡、解除随时、要 ITEM:5', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(43), 0, '无眼罩');

  fixture.store.set('tflag:899', 1); // 失神中（:1986-1987）
  fixture.store.set('item:5', 1);
  assert.equal(await com_able_family.call(43), 0);
  fixture.store.set('tflag:899', 0);
  assert.equal(await com_able_family.call(43), 1);

  // 解除随时可（无道具也行）
  fixture.store.set('item:5', 0);
  fixture.store.set('tequip:31:43', 1);
  assert.equal(await com_able_family.call(43), 1);

  // 着ぐるみ + FLAG:37（:1989-1990——43 的判据带 FLAG:37，与 45 互异）
  fixture.store.set('tequip:31:43', 0);
  fixture.store.set('item:5', 1);
  fixture.store.set('cflag:31:42', 11);
  fixture.store.set('cflag:31:40', 64);
  assert.equal(await com_able_family.call(43), 1, '着衣设定关 → 不挡');
  fixture.store.set('flag:37', 1);
  assert.equal(await com_able_family.call(43), 0, '着ぐるみ + FLAG:37 挡');
});

test('@COM_ABLE44：调教者技巧 ≥3；助手要 ≥5；解除随时', async () => {
  const { fixture, era_flag, com_able_family } = seed_world({ assi: 17 });
  fixture.store.set('item:14', 1);

  assert.equal(
    await com_able_family.call(44),
    0,
    '技巧不足（ABL:PLAYER:12 = 0）',
  );
  fixture.store.set('abl:0:12', 3);
  assert.equal(await com_able_family.call(44), 1);

  era_flag.assiplay = 1;
  fixture.store.set('abl:17:12', 4);
  assert.equal(await com_able_family.call(44), 0, '助手技巧 4 不够（要 5）');
  fixture.store.set('abl:17:12', 5);
  assert.equal(await com_able_family.call(44), 1);

  // 解除随时可（无道具、无技巧也行）
  fixture.store.set('tequip:31:44', 1);
  fixture.store.set('item:14', 0);
  fixture.store.set('abl:0:12', 0);
  assert.equal(await com_able_family.call(44), 1);
});

test('@COM_ABLE45：触手口辱挡、着ぐるみ挡（无 FLAG:37 臂）、助手技巧 ≥3', async () => {
  const { fixture, era_flag, com_able_family } = seed_world({ assi: 17 });
  fixture.store.set('item:9', 1);
  assert.equal(await com_able_family.call(45), 1);

  fixture.store.set('tequip:31:98', 1); // 触手口辱（:2049-2050）
  assert.equal(await com_able_family.call(45), 0);
  fixture.store.set('tequip:31:98', 0);

  fixture.store.set('cflag:31:42', 11);
  fixture.store.set('cflag:31:40', 64);
  assert.equal(await com_able_family.call(45), 0, '着ぐるみ（不带 FLAG:37）');

  fixture.store.set('cflag:31:42', 0);
  fixture.store.set('cflag:31:40', 0);
  era_flag.assiplay = 1;
  fixture.store.set('abl:17:12', 2);
  assert.equal(await com_able_family.call(45), 0, '助手技巧 < 3');
  fixture.store.set('abl:17:12', 3);
  assert.equal(await com_able_family.call(45), 1);
});

test('@COM_ABLE46：服装三挡、肛门经验 > 25、三和 ≥ 10、与肛具互斥', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('item:15', 1);
  fixture.store.set('exp:31:1', 26);
  fixture.store.set('abl:31:10', 4);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:17', 3);
  assert.equal(await com_able_family.call(46), 1, '门槛全过');

  assert.equal(
    await com_able_family.call(46, { whenMissing: 1 }),
    1,
    '重复调用仍可执行（无状态残留）',
  );

  // 经验门槛（:2120-2121）
  fixture.store.set('exp:31:1', 25);
  assert.equal(await com_able_family.call(46), 0, 'EXP:1 = 25 不可（要 > 25）');
  fixture.store.set('exp:31:1', 26);
  assert.equal(await com_able_family.call(46), 1);

  // 三和门槛
  fixture.store.set('abl:31:17', 2);
  assert.equal(await com_able_family.call(46), 0, '顺从+欲望+露出 = 9 < 10');
  fixture.store.set('abl:31:17', 3);

  // 服装挡：下装位（CFLAG:40 & 17）+ FLAG:37
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:40', 1);
  assert.equal(await com_able_family.call(46), 0, '内裤位挡');
  fixture.store.set('cflag:31:40', 0);
  fixture.store.set('flag:37', 0);

  // 肛具互斥（:2109-2118）
  fixture.store.set('tequip:31:13', 1);
  assert.equal(await com_able_family.call(46), 0);
  fixture.store.set('tequip:31:13', 0);
  fixture.store.set('tequip:31:49', 1);
  assert.equal(await com_able_family.call(46), 0, '电极使用中不可');
  fixture.store.set('tequip:31:49', 0);

  // 解除随时可
  fixture.store.set('tequip:31:46', 1);
  fixture.store.set('item:15', 0);
  assert.equal(await com_able_family.call(46), 1);
});

test('@COM_ABLE47：只能助手穿（ASSIPLAY && ASSI ≥ 1）且抖S ≥ 2', async () => {
  const { fixture, era_flag, com_able_family } = seed_world({ assi: 17 });
  fixture.store.set('item:23', 1);
  assert.equal(await com_able_family.call(47), 0, '主人执行不可');

  era_flag.assiplay = 1;
  assert.equal(await com_able_family.call(47), 0, '助手抖S = 0');
  fixture.store.set('abl:17:20', 2);
  assert.equal(await com_able_family.call(47), 1);

  // 解除随时可（无道具、非助手也行）
  fixture.store.set('tequip:31:47', 1);
  era_flag.assiplay = 0;
  fixture.store.set('item:23', 0);
  assert.equal(await com_able_family.call(47), 1);

  // 助手限定独立于抖S门：主人执行、助手抖S 已达标 → 仍不可（:2142-2143）
  fixture.store.set('tequip:31:47', 0);
  fixture.store.set('item:23', 1);
  assert.equal(
    await com_able_family.call(47),
    0,
    '主人执行不可（抖S 达标也一样）',
  );
});

test('@COM_ABLE48：对象须男人/扶她；服装三挡', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(48), 0, '温妮（女）不可');

  fixture.store.set('talent:31:122', 1); // 男人
  assert.equal(await com_able_family.call(48), 1);

  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:42', 69); // 尿布
  fixture.store.set('cflag:31:40', 64);
  assert.equal(await com_able_family.call(48), 0, '尿布挡');
  fixture.store.set('cflag:31:42', 0);
  fixture.store.set('flag:37', 0);
  assert.equal(await com_able_family.call(48), 1);
});

test('@COM_ABLE49：要 ITEM:21；与灌肠互斥；解除随时', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(49), 0, '无电极');

  fixture.store.set('item:21', 1);
  assert.equal(await com_able_family.call(49), 1);

  fixture.store.set('tequip:31:46', 1); // 普通の浣腸使用中（:2231-2234）
  assert.equal(await com_able_family.call(49), 0);
  fixture.store.set('tequip:31:46', 0);

  fixture.store.set('tequip:31:58', 1); // 浴室PLAY中（:2236-2237——49 独有）
  assert.equal(await com_able_family.call(49), 0, '浴室中不可插电极');
  fixture.store.set('tequip:31:58', 0);

  fixture.store.set('tequip:31:49', 1);
  fixture.store.set('item:21', 0);
  assert.equal(await com_able_family.call(49), 1, '解除随时可');
});

// —— @COM 真身：分档逐档 + 副作用 ——

// COMF40/41/42 的 PALAM:9（苦痛）五档 → SOURCE:6（PAIN_LADDERS 逐字复写源值）
const PAIN_TIERS = [
  [40, [300, 500, 800, 1200, 1800]],
  [41, [1000, 1500, 2200, 3000, 4000]],
  [42, [3000, 3300, 3600, 4000, 4500]],
];
const PALAM9_LEVELS = [99, 499, 2999, 9999, 10000]; // < LV1 / < LV2 / < LV3 / < LV4 / ≥ LV4

for (const [com, tiers] of PAIN_TIERS) {
  for (const [tier, expected] of tiers.entries()) {
    test(`@COM${com}：PALAM:9 档 ${tier} → SOURCE:6 = ${expected}`, async () => {
      const world = seed_world();
      world.fixture.store.set('palam:31:9', PALAM9_LEVELS[tier]);
      assert.equal(await run_com(world, com), 1);
      assert.equal(world.fixture.store.get('source:31:6'), expected);
    });
  }
}

test('@COM40：LOSEBASE、SOURCE:12/14、百合经验、TFLAG:30、爱情经验', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('abl:31:21', 1); // 抖M ≥ 1 → 主人经验
  fixture.store.set('cflag:31:2', 1000); // 好感度 ≥ 1000
  assert.equal(await run_com(world, 40), 1);

  assert.equal(fixture.store.get('deltabase:31:0'), -80); // LOSEBASE:0 += 80
  assert.equal(fixture.store.get('deltabase:31:1'), -40); // LOSEBASE:1 += 40
  assert.equal(fixture.store.get('source:31:12'), 200);
  assert.equal(fixture.store.get('source:31:14'), 500);
  // 温妮与魔王 0 都非男人 → 百合经验 +2
  assert.equal(fixture.store.get('exp:31:40'), 2);
  assert.equal(
    fixture.store.get('tflag:30'),
    1,
    'TFLAG:30 += 1（主人亲自 + 抖M ≥ 1）',
  );
  // (ABL:21 >= 3 || 受虐狂) 不满足 → 无爱情经验
  assert.equal(fixture.store.get('exp:31:23'), undefined);

  // 抖M ≥ 3 后爱情经验 +1
  const w2 = seed_world();
  w2.fixture.store.set('abl:31:21', 3);
  w2.fixture.store.set('cflag:31:2', 1000);
  await run_com(w2, 40);
  assert.equal(w2.fixture.store.get('exp:31:23'), 1);
});

test('@COM41/42：鞭与针的 SOURCE:14 与 TFLAG:30 门槛差', async () => {
  const w1 = seed_world();
  w1.fixture.store.set('abl:31:21', 1);
  await run_com(w1, 41);
  assert.equal(w1.fixture.store.get('source:31:14'), 1000);
  assert.equal(w1.fixture.store.get('tflag:30'), undefined, '鞭要抖M ≥ 2');

  const w2 = seed_world();
  w2.fixture.store.set('abl:31:21', 2);
  await run_com(w2, 41);
  assert.equal(w2.fixture.store.get('tflag:30'), 1);

  const w3 = seed_world();
  await run_com(w3, 42);
  assert.equal(w3.fixture.store.get('deltabase:31:1'), -20);
  assert.equal(
    w3.fixture.store.get('deltabase:31:0'),
    undefined,
    'LOSEBASE:0 += 0 不落键',
  );
  assert.equal(w3.fixture.store.get('source:31:14'), 1000);
});

// COMF43/44 的紧缚经验三档（半阈值 <10/<25）→ [LOSEBASE:0, LOSEBASE:1]
for (const [com, tiers] of [
  [
    43,
    [
      [0, 150],
      [0, 120],
      [0, 90],
    ],
  ],
  [
    44,
    [
      [100, 150],
      [80, 120],
      [60, 90],
    ],
  ],
  [
    45,
    [
      [80, 100],
      [60, 80],
      [40, 60],
    ],
  ],
]) {
  for (const [tier, [l0, l1]] of tiers.entries()) {
    test(`@COM${com}：紧缚经验档 ${tier} → LOSEBASE ${l0}/${l1}`, async () => {
      const world = seed_world();
      world.fixture.store.set('exp:31:51', [0, 10, 25][tier]);
      await run_com(world, com);
      // 眼罩的 LOSEBASE:0 += 0 是原样空扣（不落键）；44/45 的非零档照加
      assert.equal(
        world.fixture.store.get('deltabase:31:0'),
        l0 === 0 ? undefined : -l0,
      );
      assert.equal(world.fixture.store.get('deltabase:31:1'), -l1);
    });
  }
}

// —— @COM43/44：SOURCE:10 乘法链与装备位取反 ——

test('@COM43：欲情×顺从×抖M×倒错 的 S10 链 + 眼罩位取反', async () => {
  const world = seed_world();
  const { fixture } = world;
  // 欲情 ≥ LV4（×1.20）、顺从 2（×0.80）、抖M 2（×1.30）、倒错
  fixture.store.set('palam:31:5', 10000);
  fixture.store.set('abl:31:10', 2);
  fixture.store.set('abl:31:21', 2);
  fixture.store.set('talent:31:80', 1);
  await run_com(world, 43);

  // 250 × 1.2 × 0.8 × 1.3 × 2 = 624
  assert.equal(fixture.store.get('source:31:10'), 624);
  assert.equal(fixture.store.get('source:31:12'), 1000);
  assert.equal(fixture.store.get('source:31:14'), 500, '无胆怯 → 不翻倍');
  assert.equal(fixture.store.get('tequip:31:43'), 1, '眼罩装上');
  assert.equal(fixture.store.get('exp:31:51'), 2, '紧缚经验 +2');
  assert.ok(fixture.text_lines().includes('紧缚经验＋２'), '全角字面');

  // 再执行一次 → 解除
  await run_com(world, 43);
  assert.equal(fixture.store.get('tequip:31:43'), 0, '再执行即解除');
});

test('@COM43：胆怯翻倍 SOURCE:14', async () => {
  const world = seed_world();
  world.fixture.store.set('talent:31:10', 1);
  await run_com(world, 43);
  assert.equal(world.fixture.store.get('source:31:14'), 1000); // 500 × 2
});

test('@COM44：S10 = 800×链、S6/13/14 直填、触手支清 t:0、装上后 love gate', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('palam:31:5', 99); // ×0.80
  fixture.store.set('abl:31:10', 0); // ×0.40
  fixture.store.set('abl:31:21', 0); // ×0.80
  fixture.store.set('tequip:31:90', 1); // 触手调教中
  await run_com(world, 44);

  assert.equal(
    fixture.store.get('source:31:10'),
    Math.floor(800 * 0.8 * 0.4 * 0.8),
  );
  assert.equal(fixture.store.get('source:31:6'), 800);
  assert.equal(fixture.store.get('source:31:13'), 500);
  assert.equal(fixture.store.get('source:31:14'), 500);
  assert.equal(fixture.store.get('tequip:31:44'), 1, '绳子装上');
  assert.equal(fixture.store.get('t:0'), 0, '触手紧缚清计数');
  assert.equal(fixture.store.get('exp:31:51'), 5);
  assert.ok(fixture.text_lines().includes('触手紧缚'), '触手支的指令名');

  // t:0 预置 3 → 再绑仍清 0
  fixture.store.set('t:0', 3);
  fixture.store.set('tequip:31:44', 0);
  await run_com(world, 44);
  assert.equal(fixture.store.get('t:0'), 0);
});

// —— @COM45/46：口塞位与灌肠 ——

test('@COM45：六格 SOURCE 直填 + 口塞位取反（kojo 守卫的写入路径）', async () => {
  const world = seed_world();
  const { fixture } = world;
  await run_com(world, 45);
  assert.equal(fixture.store.get('source:31:6'), 50);
  assert.equal(fixture.store.get('source:31:7'), 50);
  assert.equal(fixture.store.get('source:31:12'), 80);
  assert.equal(fixture.store.get('source:31:13'), 150);
  assert.equal(fixture.store.get('source:31:14'), 80);
  assert.equal(fixture.store.get('source:31:16'), 80);
  assert.equal(
    fixture.store.get('tequip:31:45'),
    1,
    '口塞装上（#213 守卫位的写点）',
  );
  assert.equal(fixture.store.get('exp:31:51'), 2);
});

test('@COM46：ABL:3 档 → S2/S13 基础，ABL:21 档整组覆写（含 S13）', async () => {
  // ABL:3 = 2 → S2 = 600 / S13 = 1400；ABL:21 = 1 → S13 覆写为 500
  const world = seed_world();
  world.fixture.store.set('abl:31:3', 2);
  world.fixture.store.set('abl:31:21', 1);
  await run_com(world, 46);
  const f = world.fixture;
  // S2 = 600 ×（润滑<LV1 0.4）×（欲情<LV1 0.8）×（顺从0 0.8）= 153
  assert.equal(f.store.get('source:31:2'), 153, 'S2 基础过全乘链');
  assert.equal(
    f.store.get('source:31:13'),
    500,
    'S13 被 ABL:21 档覆写（1600/500 阶梯）',
  );
  assert.equal(
    f.store.get('source:31:6'),
    2400,
    'S6 = 1600（ABL:21=1 档）+ 800（润滑 < LV1）',
  );
  assert.equal(f.store.get('source:31:8'), 2000);
  assert.equal(f.store.get('source:31:15'), 1000);
});

test('@COM46：润滑档 ×S2 与 S6 +=；欲情×顺从链；钝感三连；重贞操 S13/3', async () => {
  const world = seed_world();
  const f = world.fixture;
  f.store.set('abl:31:3', 0); // S2 = 80 / S13 = 300（随后被 ABL:21=0 档覆写）
  f.store.set('palam:31:3', 0); // 润滑 < LV1 → ×0.4、S6 += 800
  f.store.set('palam:31:5', 0); // 欲情 ×0.8
  f.store.set('abl:31:10', 2); // 顺从 ×1.0（anal 表）
  f.store.set('talent:31:105', 1); // 肛门钝感 ×1.5
  f.store.set('exp:31:0', 0); // 处女
  f.store.set('talent:31:30', 1); // 看重贞操 → S13 /= 3
  await run_com(world, 46);

  // S2 = floor(floor(floor(80×0.4)×0.8)×1.0) = 25；再乘钝感？——钝感只乘 S6/13/14
  assert.equal(f.store.get('source:31:2'), 25);
  // S6 = 2000（ABL:21=0 档）+ 800（润滑）→ 体型无 → 钝感 ×1.5 = 4200
  assert.equal(f.store.get('source:31:6'), 4200);
  // S13 = 200（ABL:21=0 档）→ 钝感 ×1.5 = 300 → 重贞操 /3 = 100
  assert.equal(f.store.get('source:31:13'), 100);
  assert.equal(f.store.get('source:31:14'), 1500, 'S14 = 1000 × 1.5');
  // 肛门经验走 dungeon 门面
  assert.equal(f.store.get('exp:31:1'), 5);
  assert.ok(f.text_lines().includes('肛门经验＋5'));
});

test('@COM46：初次排泄异常经验 +1；录像中 +2 且 CFLAG:4 = 2；二次录像 +1', async () => {
  // 插入回合（TEQUIP:46 未装）不触发异常经验——只在解除（装着中执行）回合
  const w1 = seed_world();
  w1.fixture.store.set('tequip:31:46', 1); // 已装着 → 本回合是解除
  await run_com(w1, 46);
  assert.equal(w1.fixture.store.get('exp:31:50'), 1, '初次 +1');
  assert.equal(w1.fixture.store.get('cflag:31:4'), 1);
  assert.ok(w1.fixture.text_lines().includes('异常经验+1'));

  const w2 = seed_world();
  w2.fixture.store.set('tequip:31:46', 1);
  w2.fixture.store.set('tequip:31:53', 1); // 录像中
  await run_com(w2, 46);
  assert.equal(w2.fixture.store.get('exp:31:50'), 2, '初次 + 录像 = 2');
  assert.equal(w2.fixture.store.get('cflag:31:4'), 2);

  const w3 = seed_world();
  w3.fixture.store.set('tequip:31:46', 1);
  w3.fixture.store.set('cflag:31:4', 1); // 已有 1
  w3.fixture.store.set('tequip:31:53', 1);
  await run_com(w3, 46);
  assert.equal(w3.fixture.store.get('exp:31:50'), 1, '非初次但录像 +1');
  assert.equal(w3.fixture.store.get('cflag:31:4'), 2);
});

test('@COM46：插入回合 + 触手 → STAIN:4 |= 6；解除回合 + 着衣 → 弄脏衣物', async () => {
  // 插入 + 触手：A 口污垢 2|4
  const w1 = seed_world();
  w1.fixture.store.set('tequip:31:90', 1);
  w1.fixture.store.set('stain:31:4', 1);
  await run_com(w1, 46);
  assert.equal(w1.fixture.store.get('stain:31:4'), 1 | 2 | 4);
  assert.equal(w1.fixture.store.get('t:0'), 0, '触手灌肠清计数');

  // 解除 + 着衣设定 + 内裤位 → soiling_cloth_no2 真身（#215）：TFLAG:45 置位
  const w2 = seed_world();
  w2.fixture.store.set('tequip:31:46', 1);
  w2.fixture.store.set('flag:37', 1);
  w2.fixture.store.set('cflag:31:40', 1); // 内裤位
  await run_com(w2, 46);
  assert.equal(
    w2.fixture.store.get('tflag:45'),
    3,
    '弄脏位 &1|&2（内裤洗濯+处理）',
  );
  assert.ok(
    w2.fixture.text_lines().some((l) => l.includes('的内衣沾满了污物')),
    'soiling_cloth_no2 的内裤句',
  );
});

// —— @COM47/48/49 ——

test('@COM47：已穿着 → 仅解除（无 LOSEBASE）；穿着时抖M减免 + 位取反', async () => {
  const w1 = seed_world();
  w1.fixture.store.set('tequip:31:47', 1);
  await run_com(w1, 47);
  assert.equal(w1.fixture.store.get('tequip:31:47'), 0, '解除');
  assert.equal(w1.fixture.store.get('deltabase:31:1'), undefined, '解除无修正');

  const w2 = seed_world();
  w2.fixture.store.set('abl:31:21', 0);
  await run_com(w2, 47);
  assert.equal(w2.fixture.store.get('deltabase:31:1'), -60, '抖M 0 → 60');
  assert.equal(w2.fixture.store.get('tequip:31:47'), 1, '穿上');

  const w3 = seed_world();
  w3.fixture.store.set('abl:31:21', 2);
  await run_com(w3, 47);
  assert.equal(w3.fixture.store.get('deltabase:31:1'), -45, '抖M ≤ 2 → 45');
});

test('@COM48：ABL:0 档与抖M配对链；被虐快乐三档；男人 E=2 的爱情经验', async () => {
  const world = seed_world();
  const f = world.fixture;
  f.store.set('abl:31:0', 3); // S0 = 500
  f.store.set('abl:31:21', 1); // S0 ×1.2 / S14 ×0.8
  f.store.set('abl:31:11', 3); // 欲望 ≥ 3 → 被虐快乐 +2
  f.store.set('cflag:31:2', 1000);
  await run_com(world, 48);

  assert.equal(f.store.get('source:31:0'), 600); // 500 × 1.2
  assert.equal(f.store.get('source:31:12'), 150);
  assert.equal(f.store.get('source:31:14'), Math.floor(400 * 0.8));
  assert.equal(f.store.get('exp:31:30'), 2, '被虐快乐经验（dungeon 门面）');
  assert.equal(f.store.get('exp:31:40'), 3, '百合 +3');
  assert.equal(f.store.get('exp:31:23'), 1, '非男人 E = 1');

  // 受虐狂 → +3
  const w2 = seed_world();
  w2.fixture.store.set('talent:31:88', 1);
  await run_com(w2, 48);
  assert.equal(w2.fixture.store.get('exp:31:30'), 3);

  // 欲望 < 3 但抖M ≥ 1 → +1
  const w3 = seed_world();
  w3.fixture.store.set('abl:31:21', 1);
  await run_com(w3, 48);
  assert.equal(w3.fixture.store.get('exp:31:30'), 1);
});

test('@EVENT_SEITSU_ASIKOKI：男人/扶她 + 未熟 + Ｃ感度5 + 关系 150 → 精通', async () => {
  const world = seed_world();
  const f = world.fixture;
  f.store.set('talent:31:122', 1); // 温妮是男人
  f.store.set('talent:31:135', 1); // 未熟
  f.store.set('abl:31:0', 5);
  f.store.set('relation:31:0', 150);
  await run_com(world, 48);

  assert.equal(f.store.get('talent:31:135'), 0, '未熟解除');
  assert.ok(
    f.text_lines().some((l) => l.includes('开始精通这个了')),
    '精通文本',
  );

  // 关系 149 → 不触发
  const w2 = seed_world();
  w2.fixture.store.set('talent:31:122', 1);
  w2.fixture.store.set('talent:31:135', 1);
  w2.fixture.store.set('abl:31:0', 5);
  w2.fixture.store.set('relation:31:0', 149);
  await run_com(w2, 48);
  assert.equal(w2.fixture.store.get('talent:31:135'), 1, '关系不足 → 未熟保留');

  // 触手中 → 不触发
  const w3 = seed_world();
  w3.fixture.store.set('talent:31:122', 1);
  w3.fixture.store.set('talent:31:135', 1);
  w3.fixture.store.set('abl:31:0', 5);
  w3.fixture.store.set('relation:31:0', 200);
  w3.fixture.store.set('tequip:31:90', 1);
  await run_com(w3, 48);
  assert.equal(w3.fixture.store.get('talent:31:135'), 1, '触手中不精通');
});

test('@COM49：ABL:3/EXP:1 双梯 + 位取反', async () => {
  const world = seed_world();
  const f = world.fixture;
  f.store.set('abl:31:3', 1); // S2 = 500 / S13 = 2000
  f.store.set('exp:31:1', 10); // 半阈值：≥ EXPLV:3/2(10)、< EXPLV:4/2(25) → 档 3（×1.2、S6 = 10）
  await run_com(world, 49);

  // S2 = 500×1.2=600；润滑<LV1 ×0.4 → 240；欲情<LV1 ×0.8 → 192；顺从0 ×0.8 → 153
  assert.equal(f.store.get('source:31:2'), 153);
  assert.equal(f.store.get('source:31:13'), 2000);
  assert.equal(
    f.store.get('source:31:6'),
    10 + 800,
    'S6 = EXP 档 10 + 润滑 800',
  );
  assert.equal(f.store.get('tequip:31:49'), 1, '电极装上');
  assert.equal(f.store.get('exp:31:1'), 15, '肛门经验 +5（门面）');

  await run_com(world, 49);
  assert.equal(f.store.get('tequip:31:49'), 0, '再执行即解除');
});

// —— @EQUIP_COM43-49：持续效果（直调 + 链序消费） ——

test('@EQUIP_COM43：三格累加 + UP 直写（欲情/恐怖）', async () => {
  const world = seed_world();
  const f = world.fixture;
  world.era_flag.selectcom = 43;
  f.store.set('source:31:14', 300); // 本回合指令已写的逃离值
  await world.equip_com_family.call(43);

  // A = 250 ×（欲情<LV1 0.8）×（顺从0 0.4）×（抖M0 0.8）= 64
  assert.equal(f.store.get('source:31:10'), 64);
  assert.equal(f.store.get('source:31:12'), 1000);
  assert.equal(f.store.get('source:31:14'), 800, '300 + C(500)');
  assert.equal(f.store.get('delta:31:5'), 64, 'UP:5 += A');
  assert.equal(f.store.get('delta:31:10'), 800, 'UP:10 += SOURCE:14（累加后）');
  assert.equal(f.store.get('exp:31:51'), 1);
  assert.ok(f.text_lines().includes('＜眼罩装着中＞'));
});

test('@EQUIP_COM44：抖M 档 A × 倒错 × 欲情，四格累加，触手 T:0 += 1', async () => {
  const world = seed_world();
  const f = world.fixture;
  world.era_flag.selectcom = 44;
  f.store.set('abl:31:21', 3); // A = 480
  f.store.set('talent:31:80', 1); // ×2
  // 欲情未播种 → ×0.8：480 × 2 × 0.8 = 768
  await world.equip_com_family.call(44);

  for (const i of [6, 12, 13, 14]) {
    assert.equal(f.store.get(`source:31:${i}`), 768, `SOURCE:${i} += A`);
  }
  assert.equal(f.store.get('exp:31:51'), 2);
  assert.ok(f.text_lines().includes('＜紧缚中＞'));

  // 触手位 → T:0 += 1
  const w2 = seed_world();
  w2.era_flag.selectcom = 44;
  w2.fixture.store.set('tequip:31:90', 1);
  await w2.equip_com_family.call(44);
  assert.equal(w2.fixture.store.get('t:0'), 1);
});

test('@EQUIP_COM45：整阈值紧缚减免（<20/<50）+ 四格累加', async () => {
  const world = seed_world();
  const f = world.fixture;
  world.era_flag.selectcom = 45;
  f.store.set('exp:31:51', 25); // ≥ 20、< 50 → 中档
  f.store.set('abl:31:21', 2); // A = 250
  await world.equip_com_family.call(45);

  assert.equal(
    f.store.get('deltabase:31:0'),
    -40,
    '中档 40（整阈值，与本体半阈值互异）',
  );
  assert.equal(f.store.get('deltabase:31:1'), -80);
  // A = floor(250 × 0.8) = 200
  for (const i of [12, 13, 14, 16]) {
    assert.equal(f.store.get(`source:31:${i}`), 200, `SOURCE:${i} += A`);
  }
});

test('@EQUIP_COM46：EXP:1 半阈值档；S14 += B（不是 C）；S13/3', async () => {
  const world = seed_world();
  const f = world.fixture;
  world.era_flag.selectcom = 46;
  f.store.set('abl:31:3', 0); // A = 80 / B = 300
  f.store.set('exp:31:1', 3); // < EXPLV:2/2 (=2)? 3 ≥ 2 → 档 2（×1.1、C = 50）
  f.store.set('exp:31:0', 0);
  f.store.set('talent:31:30', 1); // 重贞操 → S13 /= 3
  await world.equip_com_family.call(46);

  // A = floor(floor(floor(floor(80×1.1)×0.4)×0.8)×0.8) = 22
  // C = (50 + 800) 体型无 = 850
  assert.equal(f.store.get('source:31:2'), 22, 'S2 += A');
  // S13 = 300（B）→ /3 = 100
  assert.equal(f.store.get('source:31:13'), 100, 'S13 += B 后重贞操 /3');
  assert.equal(f.store.get('source:31:6'), 850, 'S6 += C');
  assert.equal(
    f.store.get('source:31:14'),
    300,
    'S14 += B（源 :307 原样，不是 C）',
  );
  assert.equal(f.store.get('exp:31:1'), 3 + 3, 'EXP:1 += 3（种子 3 + 增量）');
});

test('@EQUIP_COM47：恐怖×抖M×助手抖S×胆怯 的 A 链 + S11/S10/S15 档增量', async () => {
  const world = seed_world({ assi: 17 });
  const f = world.fixture;
  world.era_flag.selectcom = 47;
  f.store.set('palam:31:10', 0); // 恐怖 ×1.00
  f.store.set('abl:31:21', 2); // 档 2：S11/S10/S15 = 100/300/0、A ×1.6
  f.store.set('abl:17:20', 4); // 助手抖S ×2.5
  f.store.set('talent:31:10', 1); // 胆怯 ×2
  await world.equip_com_family.call(47);

  // A = floor(floor(floor(floor(300×1)×1.6)×2.5)×2) = 2400
  assert.equal(f.store.get('source:31:14'), 2400, 'S14 += A');
  assert.equal(f.store.get('source:31:11'), 100);
  assert.equal(f.store.get('source:31:10'), 300);
  assert.equal(f.store.get('source:31:15'), 0 + 0, 'S15 += 0（档 2 无增量）');
  assert.equal(f.store.get('delta:31:10'), 2400, 'UP:10 += SOURCE:14');
  assert.ok(f.text_lines().some((l) => l.includes('束缚衣着装中＞')));
});

test('@EQUIP_COM49：整阈值 EXP 档 + 无 S14 += B（与 46 互异）', async () => {
  const world = seed_world();
  const f = world.fixture;
  world.era_flag.selectcom = 49;
  f.store.set('abl:31:3', 0); // A = 250 / B = 1000
  f.store.set('exp:31:1', 10); // < EXPLV:3(20) → 档 2（×1.1、C = 50）
  await world.equip_com_family.call(49);

  // A = floor(floor(floor(floor(250×1.1)×0.4)×0.8)×0.8) = 70
  assert.equal(f.store.get('source:31:2'), 70);
  assert.equal(f.store.get('source:31:13'), 1000);
  assert.equal(f.store.get('source:31:6'), 50 + 800);
  assert.equal(f.store.get('source:31:14'), 0, '49 的持续版不写 S14');
  assert.equal(f.store.get('exp:31:1'), 10 + 5, 'EXP:1 += 5（种子 10 + 增量）');
});

// —— TRAIN_MESSAGE 分支（B 40-49 / A 40-42） ——

/** 直调某 SELECTCOM 的 B 分支（公共头由 train_message_b 出） */
async function run_b(world, com) {
  world.era_flag.selectcom = com;
  const { train_message_b } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_b();
}

test('B40：普通支两行 + 连续打的红印差；着ぐるみ支', async () => {
  const w1 = seed_world();
  await run_b(w1, 43); // 先不动装备——40 的分支自身无装备依赖
  const world = seed_world();
  await run_b(world, 40);
  const lines = world.fixture.text_lines();
  assert.ok(lines.includes('你在温妮屁股上、一掌一掌地拍打着。'));
  assert.ok(lines.includes('温妮被打的地方变红了…'));

  // PREVCOM == 40 → 越来越红
  const w2 = seed_world();
  w2.era_flag.prevcom = 40;
  await run_b(w2, 40);
  assert.ok(w2.fixture.text_lines().includes('温妮被打的地方越来越红了…'));

  // 着ぐるみ支（CFLAG:42 = 11 + bit 64）
  const w3 = seed_world();
  w3.fixture.store.set('cflag:31:42', 11);
  w3.fixture.store.set('cflag:31:40', 64);
  await run_b(w3, 40);
  const l3 = w3.fixture.text_lines();
  // 特别服装名（cflag:42 = 11 → 史莱姆）由 PRINT_CLOTHTYPE_SPECIAL 内联拼进同一行
  assert.ok(l3.includes('你在史莱姆外面、一掌一掌地拍打着。'));
  assert.ok(l3.includes('史莱姆里的温妮、好像不太有感觉…'));

  // 魅力点 312 == 23 → 又大又翘的
  const w4 = seed_world();
  w4.fixture.store.set('talent:31:312', 23);
  await run_b(w4, 40);
  assert.ok(
    w4.fixture
      .text_lines()
      .includes('你在温妮又大又翘的屁股上、一掌一掌地拍打着。'),
  );
});

test('B41/42：鞭与针（含肤色三选一、着ぐるみ「了、」行）', async () => {
  const w1 = seed_world();
  await run_b(w1, 41);
  assert.ok(w1.fixture.text_lines().includes('你在温妮的身上挥下鞭子…'));
  assert.ok(
    w1.fixture.text_lines().includes('温妮的身上、开始出现红肿的鞭痕…'),
  );

  const w2 = seed_world();
  await run_b(w2, 42);
  assert.ok(
    w2.fixture.text_lines().includes('你、用针扎温妮肌肤…'),
    '无肤色 → 直拼',
  );

  const w3 = seed_world();
  w3.fixture.store.set('talent:31:244', 1); // 恶魔肌肤
  await run_b(w3, 42);
  assert.ok(w3.fixture.text_lines().includes('你、用针扎温妮蓝色的肌肤…'));

  const w4 = seed_world();
  w4.fixture.store.set('cflag:31:42', 11);
  w4.fixture.store.set('cflag:31:40', 64);
  await run_b(w4, 42);
  const l4 = w4.fixture.text_lines();
  assert.ok(
    l4.some((l) => l.startsWith('你、用针扎') && l.endsWith('了、')),
    '着ぐるみ支行尾「了、」字面',
  );
  assert.ok(l4.includes('史莱姆里的温妮、好像不太有效…'));
});

test('B43/44/45/49：装着/解除二支（打印在取反之前）', async () => {
  const w1 = seed_world();
  await run_b(w1, 43);
  assert.ok(w1.fixture.text_lines().includes('温妮被眼罩罩着。'));
  const w2 = seed_world();
  w2.fixture.store.set('tequip:31:43', 1);
  await run_b(w2, 43);
  assert.ok(w2.fixture.text_lines().includes('温妮的眼罩被解下来了。'));

  const w3 = seed_world();
  await run_b(w3, 44);
  assert.ok(w3.fixture.text_lines().includes('你把温妮绑起来了。'));

  const w4 = seed_world();
  await run_b(w4, 45);
  assert.ok(w4.fixture.text_lines().includes('温妮被装上了口塞。'));

  const w5 = seed_world();
  await run_b(w5, 49);
  assert.ok(w5.fixture.text_lines().includes('温妮的菊花、被插入了电极…'));
});

test('B46：解除支的抖M六档与 TFLAG:899 门；插入支', async () => {
  const w1 = seed_world();
  w1.fixture.store.set('tequip:31:46', 1);
  w1.fixture.store.set('abl:31:21', 5);
  await run_b(w1, 46);
  const l1 = w1.fixture.text_lines();
  assert.ok(
    l1.includes('温妮的肛塞被拔掉了、里面的污物随之喷出肛门、飞散一地。'),
  );
  assert.ok(
    l1.includes('温妮尽情品味着排泄感与耻辱的双重折磨、快要不正常了。'),
  );
  assert.ok(
    l1.includes(
      '温妮享受快感的表情突然凝固了、肛门开放的同时、一滴一滴的爱液无法抑制地流了出来。',
    ),
  );

  // 失神（TFLAG:899 != 0）→ 抖M段整段跳过（档文本一行都不出）
  const w2 = seed_world();
  w2.fixture.store.set('tequip:31:46', 1);
  w2.fixture.store.set('abl:31:21', 4);
  w2.fixture.store.set('tflag:899', 1);
  await run_b(w2, 46);
  const l2 = w2.fixture.text_lines();
  assert.ok(l2.some((l) => l.includes('肛塞被拔掉了')));
  for (const text of [
    '露出了苦闷、耻辱的表情',
    '露出陶醉的表情、愉悦地享受着排泄感',
  ]) {
    assert.ok(
      !l2.some((l) => l.includes(text)),
      `失神中无抖M档文本（${text.slice(0, 6)}…）`,
    );
  }

  const w3 = seed_world();
  await run_b(w3, 46);
  assert.ok(
    w3.fixture
      .text_lines()
      .includes('温妮的菊花被灌入了灌肠液、用肛塞栓起来了。'),
  );
});

test('B47：助手肤色三支 + 解除支；B48：欲情档', async () => {
  const w1 = seed_world({ assi: 17 });
  await run_b(w1, 47);
  assert.ok(
    w1.fixture.text_lines().includes('助手17肌肤、被皮革制的拘束衣包裹着…'),
  );

  const w2 = seed_world({ assi: 17 });
  w2.fixture.store.set('talent:17:253', 1); // 褐色肌肤
  await run_b(w2, 47);
  assert.ok(
    w2.fixture
      .text_lines()
      .includes('助手17褐色的肌肤、被皮革制的拘束衣包裹着…'),
  );

  const w3 = seed_world({ assi: 17 });
  w3.fixture.store.set('tequip:31:47', 1);
  await run_b(w3, 47);
  assert.ok(w3.fixture.text_lines().includes('助手17脱掉了拘束衣…'));

  const w4 = seed_world();
  w4.fixture.store.set('palam:31:5', 3000); // ≥ PALAMLV:3
  await run_b(w4, 48);
  assert.ok(
    w4.fixture.text_lines().includes('你把温妮的硬梆梆的阴茎、用脚踩着…'),
  );
});

/** 直调某 SELECTCOM 的 A 分支 */
async function run_a(world, com) {
  world.era_flag.selectcom = com;
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
}

test('A40-42：UP:9 四档 + 素质 ±1 + 求饶档；UP:5 > 1000 追加', async () => {
  // 档 0（< 300）
  const w0 = seed_world();
  w0.fixture.store.set('delta:31:9', 299);
  await run_a(w0, 40);
  assert.ok(w0.fixture.text_lines().includes('温妮发出了悲鸣、忍受着痛苦。'));

  // 档 1 + 害怕疼痛（40）+1 → 档 2 文本
  const w1 = seed_world();
  w1.fixture.store.set('delta:31:9', 500);
  w1.fixture.store.set('talent:31:40', 1);
  await run_a(w1, 41);
  assert.ok(
    w1.fixture
      .text_lines()
      .includes('无法忍受的痛苦让温妮大声尖叫、全身都弹起来了。'),
  );

  // 求饶档（≥ 3000 → B = 4，+1 = 5）：不哭泣（45）→ 无哭腔
  const w2 = seed_world();
  w2.fixture.store.set('delta:31:9', 3000);
  w2.fixture.store.set('talent:31:40', 1);
  w2.fixture.store.set('talent:31:45', 1);
  await run_a(w2, 42);
  const l2 = w2.fixture.text_lines();
  assert.ok(
    l2.includes('温妮因为实在太痛、拼命地求饶。'),
    '不哭泣 → 无「抽抽哒哒」',
  );

  const w3 = seed_world();
  w3.fixture.store.set('delta:31:9', 3000);
  w3.fixture.store.set('talent:31:40', 1);
  await run_a(w3, 40);
  assert.ok(
    w3.fixture
      .text_lines()
      .includes('温妮因为实在太痛、抽抽哒哒地哭着、拼命地求饶。'),
  );

  // 欲情追加（男人 → 勃起）
  const w4 = seed_world();
  w4.fixture.store.set('delta:31:9', 300);
  w4.fixture.store.set('delta:31:5', 1001);
  w4.fixture.store.set('talent:31:122', 1);
  await run_a(w4, 40);
  assert.ok(
    w4.fixture
      .text_lines()
      .includes('然而、温妮因为痛苦而扭曲的身体上阴茎已经勃起了……'),
  );
});

test('A40-42：TFLAG:899 > 1 时三条指令都静默（&& 与 || 同优先级的读法）', async () => {
  for (const com of [40, 41, 42]) {
    const world = seed_world();
    world.fixture.store.set('delta:31:9', 5000);
    world.fixture.store.set('tflag:899', 2);
    await run_a(world, com);
    assert.deepEqual(
      world.fixture
        .text_lines()
        .filter(
          (l) => !l.startsWith('（') && !l.includes('‥') && !l.includes('---'),
        ),
      [],
      `SELECTCOM = ${com} 失神中无反应文本`,
    );
  }
});

test('A40-42：装着灌肠塞时的排泄段（分支体内，:1253-1272）', async () => {
  const world = seed_world();
  world.fixture.store.set('tequip:31:46', 1);
  world.fixture.store.set('abl:31:21', 4);
  await run_a(world, 40);
  const lines = world.fixture.text_lines();
  assert.ok(
    lines.includes(
      '温妮的菊花被灌入大量的灌肠液后还用肛门塞封起来了、侵犯还在继续。',
    ),
  );
  assert.ok(
    lines.includes('温妮被腹痛和排泄感带来的快感所支配、露出了陶醉的表情。'),
  );
});

test('A43-49：无 A 分支 → 存根占位行（既有行为，#45 起）', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 45;
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture.text_lines().some((l) => l.includes('指令 45 的参数反应')),
    '缺失分支的占位行',
  );
});

// —— CASE 40 升格规则与 JUMPFORM 落点 ——

test('CASE 40：同调教者 + 上回合后背位族 → 升格 132（COM_ABLE132 未落地视为可）', async () => {
  const world = seed_world();
  const { get_adv_com } = world.fixture.load_module('system/train/com-adv');
  // assiplay = 0 且 tflag:50 = 0 → 同调教者
  for (const prev of [21, 131, 133, 134]) {
    world.era_flag.prevcom = prev;
    assert.equal(await get_adv_com(40), 132, `PREVCOM = ${prev}`);
  }
  // 第二臂：上上回合后背位族 + 上回合 120/121
  world.era_flag.prevcom = 120;
  world.fixture.store.set('tflag:59', 132);
  assert.equal(await get_adv_com(40), 132);
  world.era_flag.prevcom = 121;
  assert.equal(await get_adv_com(40), 132);

  // 未命中 → 原样返回
  world.era_flag.prevcom = 22;
  world.fixture.store.set('tflag:59', 0);
  assert.equal(await get_adv_com(40), 40);
});

test('CASE 40：调教者换了人 → 不升格', async () => {
  const world = seed_world();
  const { get_adv_com } = world.fixture.load_module('system/train/com-adv');
  world.fixture.store.set('tflag:50', 1); // 上回合是助手
  world.era_flag.assiplay = 0; // 本回合主人 → 不同人
  world.era_flag.prevcom = 21;
  assert.equal(await get_adv_com(40), 40);
});

test('CASE 40：COM_ABLE132 不可用 → 维持 40（规则内复核）', async () => {
  const world = seed_world();
  const { get_adv_com } = world.fixture.load_module('system/train/com-adv');
  const { com_able_family } = world.fixture.load_module(
    'system/train/com-family',
  );
  // 临时装一个返回 0 的 COM_ABLE132（J19 落地前的复核路径）
  com_able_family.implemented.set(132, async () => 0);
  try {
    world.era_flag.prevcom = 21;
    assert.equal(await get_adv_com(40), 40);
  } finally {
    com_able_family.implemented.delete(132);
  }
});

test('@COM40 的 JUMPFORM 落点：升格目标缺失 → 占位行 + RETURN 1；不升格 → 正常打屁股', async () => {
  const world = seed_world();
  world.era_flag.prevcom = 21; // 命中升格
  world.era_flag.selectcom = 40;
  const result = await world.com_family.call(40);
  assert.equal(result, 1);
  assert.ok(
    world.fixture
      .text_lines()
      .some((l) => l.includes('COM132') && l.includes('占位')),
    '升格目标缺失的占位行（J19 落地前）',
  );
  assert.equal(
    world.fixture.store.get('source:31:6'),
    undefined,
    '跳转替换整段：COM40 本体不执行',
  );

  const w2 = seed_world();
  w2.era_flag.selectcom = 40;
  await w2.com_family.call(40);
  assert.ok(w2.fixture.text_lines().includes('打屁股'));
});

// —— TEQUIP:45 写入路径 → @KOJO_MESSAGE_COM 头部守卫（#213 接触面） ——

test('口塞装上（COM45 真身）→ K3 守卫跳过；SELECTCOM = 45 豁免（第 3 道守卫）', async () => {
  // 判别器：口塞守卫（SELECTCOM != 45）静默；SELECTCOM = 45 豁免后落到
  // 口塞着脱真台词（#234 起 DOG_KOJO_3 已是真身，不再打占位行）。
  const world = seed_world({ assi: -1 });
  world.fixture.load_module('kojo/kojo-k3-noble');
  const { kojo_message_com_3 } =
    world.fixture.load_module('kojo/kojo-k3-noble');

  world.era_flag.selectcom = 45;
  await world.com_family.call(45);
  assert.equal(world.fixture.store.get('tequip:31:45'), 1);

  world.era_flag.selectcom = 0;
  await kojo_message_com_3(() => 0);
  assert.deepEqual(
    world.fixture.text_lines().filter((l) => l.includes('嗯~')),
    [],
    '口塞守卫先跳过（SELECTCOM = 0 ≠ 45）',
  );

  world.era_flag.selectcom = 45;
  await kojo_message_com_3(() => 0);
  assert.ok(
    world.fixture.text_lines().some((l) => l.includes('嗯~…嗯呜~…嗯呼~…嗯嗯~')),
    'SELECTCOM = 45 豁免口塞守卫 → 走到口塞着脱支',
  );
});

// —— source-check 的装备持续效果消费循环（#223 接线） ——

test('SOURCE_CHECK 链循环：装备位按链序消费 + 缺失位占位行', async () => {
  const world = seed_world({ assi: 17 });
  const { emit } = world.fixture.load_module('system/event/registry');
  world.fixture.load_module('event/source-check');
  // 眼罩（已实现）+ 振动宝石位 11（J10 未落地）同时点亮
  world.fixture.store.set('tequip:31:43', 1);
  world.fixture.store.set('tequip:31:11', 1);
  world.era_flag.selectcom = 43;
  world.fixture.store.set('flag:7', 0); // 关口上总开关，聚焦装备循环输出

  await emit('SOURCE_CHECK');
  const lines = world.fixture.text_lines();
  assert.ok(lines.includes('＜眼罩装着中＞'), '已实现位真身执行');
  assert.ok(
    lines.some((l) => l.includes('EQUIP_COM11') && l.includes('装备位 11')),
    '缺失位占位行',
  );
  assert.equal(world.fixture.store.get('source:31:12'), 1000, '眼罩持续位写入');
});

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录 com-sm.js 的 COM132', () => {
  const { fixture } = seed_world();
  const mod = fixture.load_module('system/train/com-sm');
  const registry = fs.readFileSync(
    path.join(REPO, 'docs', 'stub-registry.md'),
    'utf8',
  );
  assert.deepEqual(mod.STUBBED_CALLS, ['COM132']);
  for (const name of mod.STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
