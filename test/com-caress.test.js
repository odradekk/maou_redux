/**
 * ere/system/train/com-caress.js 的行为测试（issue #45：第一条真实指令）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @COM_ABLE0 的三条判据（爱抚系过滤 / 决斗中 / 默认放行）；
 *   - SOURCE 分档的**每一档**（ABL:0 六档 × ABL:1 六档——分档表是纯数据，
 *     错一格不会报错，验收项报出逐档有用例）；
 *   - 接吻侧分支（初吻回避 / 不怕污臭 / 反感污臭 / 高姿态 / 爱慕 / 主人口污
 *     / 口污双向移动）；
 *   - V⇔指、B⇔指的污垢移动；
 *   - 百合/断背/爱情经验与 LOSEBASE（deltabase 负向累加）。
 *
 * 世界底座与 test/train-loop.test.js 的 seed_world 同构：魔王 0 + 奴隶 31、
 * 火车表已开，直接经 COM 族调用（同时验注册接入）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// 世界底座：开火车表、指好 TARGET/PLAYER、装好 @COM0。返回 { fixture, com_family }
function seed_caress_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0); // callname:0:-1 随 addCharacter 落（train-message 的描写行读它）
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.player = 0;
  fixture.load_module('system/train/com-caress');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  return { fixture, era_flag, com_family, com_able_family };
}

// ABL:0/1 分档取值表（:32-72 的六档 × 两个源；此处逐字复写源值，正是被测
// 对象——写错任何一格，对应档位的断言红）
const C_TIERS = [
  [20, 25],
  [100, 50],
  [500, 80],
  [1200, 100],
  [2000, 115],
  [2800, 125],
];
const B_TIERS = [
  [15, 25],
  [50, 50],
  [300, 80],
  [700, 100],
  [1100, 115],
  [1600, 125],
];

test('@COM_ABLE0：默认可执行；爱抚系过滤与决斗中各挡一条', async () => {
  const { fixture, com_able_family } = seed_caress_world();

  assert.equal(await com_able_family.call(0), 1, '默认放行（:34 RETURN 1）');

  fixture.store.set('flag:25', 1); // :30-31 FLAG:25 & 1（爱抚系过滤）
  assert.equal(await com_able_family.call(0), 0);
  fixture.store.set('flag:25', 0);

  fixture.store.set('tequip:31:55', 1); // :32-33 TEQUIP:55（决斗中）
  assert.equal(await com_able_family.call(0), 0);
});

// —— SOURCE 分档：每一档各有用例（验收项） ——

for (const [level, [src0, src3]] of C_TIERS.entries()) {
  test(`ABL:0（阴蒂感觉）= ${level} 档：SOURCE:0 = ${src0}`, async () => {
    const { fixture, com_family } = seed_caress_world();
    fixture.store.set('abl:31:0', level);
    fixture.store.set('abl:31:1', 0);
    // 无素质干扰、无初吻回避（cflag:16 留 undefined = 0 ≠ -1）
    assert.equal(await com_family.call(0), 1, '@COM0 RETURN 1');
    assert.equal(fixture.store.get('source:31:0'), src0);
    // SOURCE:3 = C 档的基础 + B 档（ABL:1 = 0）的增量 25
    assert.equal(fixture.store.get('source:31:3'), src3 + 25);
  });
}

for (const [level, [src17, src3_add]] of B_TIERS.entries()) {
  test(`ABL:1（乳房感觉）= ${level} 档：SOURCE:17 = ${src17}`, async () => {
    const { fixture, com_family } = seed_caress_world();
    fixture.store.set('abl:31:0', 0);
    fixture.store.set('abl:31:1', level);
    await com_family.call(0);
    assert.equal(fixture.store.get('source:31:17'), src17);
    // SOURCE:3 = C 档（ABL:0 = 0）的基础 25 + B 档增量（累加语义）
    assert.equal(fixture.store.get('source:31:3'), 25 + src3_add);
  });
}

test('ABL 超过 5 落 ELSE 档（2800 / 1600 / 125+125）', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('abl:31:0', 8);
  fixture.store.set('abl:31:1', 99);
  await com_family.call(0);
  assert.equal(fixture.store.get('source:31:0'), 2800);
  assert.equal(fixture.store.get('source:31:17'), 1600);
  assert.equal(fixture.store.get('source:31:3'), 125 + 125);
});

// —— 接吻侧分支（:74-119） ——

test('初吻未体验（CFLAG:16 == -1）：不洁清零、SOURCE:0 减半、SOURCE:3 四分', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('cflag:31:16', -1);
  await com_family.call(0);
  assert.equal(fixture.store.get('source:31:8'), 0);
  assert.equal(fixture.store.get('source:31:0'), Math.floor(20 / 2));
  assert.equal(fixture.store.get('source:31:3'), Math.floor(50 / 4));
});

test('不怕污臭（TALENT:61）：不洁源 ÷ 4', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('talent:31:61', 1);
  await com_family.call(0);
  assert.equal(fixture.store.get('source:31:8'), Math.floor(30 / 4));
});

test('反感污臭（TALENT:62）：不洁源 × 3；高姿态（TALENT:15）再 × 2', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('talent:31:62', 1);
  await com_family.call(0);
  assert.equal(fixture.store.get('source:31:8'), 90);

  const f2 = seed_caress_world();
  f2.fixture.store.set('talent:31:62', 1);
  f2.fixture.store.set('talent:31:15', 1);
  await f2.com_family.call(0);
  assert.equal(f2.fixture.store.get('source:31:8'), 180);
});

test('爱慕（TALENT:85）且主人调教：情爱 × 2、不洁 ÷ 10', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('talent:31:85', 1);
  await com_family.call(0);
  assert.equal(fixture.store.get('source:31:3'), (25 + 25) * 2);
  assert.equal(fixture.store.get('source:31:8'), Math.floor(30 / 10));
});

test('主人口有污垢：不洁 × 3 / 2；且口污双向移动', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('stain:0:0', 5); // 主人的口（PLAYER = 0）
  fixture.store.set('stain:31:0', 2); // 奴隶的口
  await com_family.call(0);
  assert.equal(fixture.store.get('source:31:8'), Math.floor((30 * 3) / 2));
  // :117-118 两边同为原两值的按位或
  assert.equal(fixture.store.get('stain:31:0'), 2 | 5);
  assert.equal(fixture.store.get('stain:0:0'), 2 | 5);
});

test('污れ移动：奴隶的 V/B 与调教者的指合流', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('stain:31:3', 1); // V
  fixture.store.set('stain:0:1', 8); // 调教者的指
  fixture.store.set('stain:31:5', 16); // B
  await com_family.call(0);
  // V |= 指 → 1|8 = 9；指 |= V → 9；B |= 指 → 16|9 = 25；指 |= B → 25
  assert.equal(fixture.store.get('stain:31:3'), 9);
  assert.equal(fixture.store.get('stain:31:5'), 25);
  assert.equal(fixture.store.get('stain:0:1'), 25);
});

// —— 经验与消耗（:144-168） ——

test('双方皆非男人：百合经验 +5；爱情经验要 CFLAG:2 ≥ 1000 且主人调教', async () => {
  const { fixture, com_family } = seed_caress_world();
  await com_family.call(0);
  assert.equal(fixture.store.get('exp:31:40'), 5);
  assert.equal(fixture.store.get('exp:31:23'), undefined, 'CFLAG:2 不足不加');
  assert(fixture.text_lines().includes('百合经验+5'));

  const f2 = seed_caress_world();
  f2.fixture.store.set('cflag:31:2', 1000);
  await f2.com_family.call(0);
  assert.equal(f2.fixture.store.get('exp:31:23'), 2);
  assert(f2.fixture.text_lines().includes('爱情经验+2'));
});

test('调教者是男人（角色 0）：无百合经验', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('talent:0:122', 1); // 主人是男人
  await com_family.call(0);
  assert.equal(fixture.store.get('exp:31:40'), undefined);
});

test('双方都是男人：断背经验 +5', async () => {
  const { fixture, com_family } = seed_caress_world();
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('talent:0:122', 1);
  await com_family.call(0);
  assert.equal(fixture.store.get('exp:31:41'), 5);
  assert(fixture.text_lines().includes('断背经验+5'));
});

test('LOSEBASE：deltabase 负向累加 5 / 50；指令行与描写前缀已输出', async () => {
  const { fixture, com_family } = seed_caress_world();
  await com_family.call(0);
  assert.equal(fixture.store.get('deltabase:31:0'), -5);
  assert.equal(fixture.store.get('deltabase:31:1'), -50);
  const texts = fixture.text_lines();
  assert.equal(texts[0], '爱抚');
  assert(
    texts.some((line) => line.includes('仔细爱抚着温妮的身体')),
    '@COM0 经 CALL TRAIN_MESSAGE_B 输出描写行',
  );
});

// ===========================================================================
// —— #219（J9 爱抚系 1-9）：真身 / COM_ABLE / TRAIN_MESSAGE 分支 / 升格规则 ——
// ===========================================================================

/** 名字表播种（判定行/经验行读 ablname/talentname/markname/palamname/itemname） */
function seed_names(fixture) {
  for (const [id, name] of [
    [10, '顺从'],
    [11, '欲望'],
    [16, '侍奉精神'],
    [17, '露出癖'],
    [21, '抖M气质'],
    [31, '自慰中毒'],
    [2, '私处感觉'],
    [3, '肛门感觉'],
  ]) {
    fixture.store.set(`ablname:${id}`, name);
  }
  for (const [id, name] of [
    [0, '苦痛刻印'],
    [1, '快乐刻印'],
    [2, '屈服刻印'],
    [3, '反抗刻印'],
  ]) {
    fixture.store.set(`markname:${id}`, name);
  }
  fixture.store.set('palamname:5', '欲情');
  fixture.store.set('expname:0', '私处经验');
  fixture.store.set('itemname:26', '媚药');
  fixture.store.set('itemname:22', '野狗');
  for (const [id, name] of [
    [20, '克制'],
    [35, '害羞'],
    [36, '不知羞耻'],
    [60, '容易自慰'],
    [61, '不怕污臭'],
    [62, '反感污臭'],
    [63, '献身的'],
    [70, '接受快感'],
    [71, '否定快感'],
    [85, '爱慕'],
    [89, '露出狂'],
    [0, '处女'],
  ]) {
    fixture.store.set(`talentname:${id}`, name);
  }
}

/** 全族装载（COM/COM_ABLE/TRAIN_MESSAGE 分支/升格规则一次进表）。
 * selectcom 默认 0（@COM0 的用例形态）；其余指令的用例传 n——
 * TRAIN_MESSAGE_B 的分发读它（回合循环在执行前设定，测试同位）。 */
function seed_family_world(selectcom = 0) {
  const world = seed_caress_world();
  seed_names(world.fixture);
  world.fixture.load_module('system/train/train-message');
  world.era_flag.selectcom = selectcom;
  return world;
}

// —— @COM1（舔阴）真身 ——

test('@COM1：源计算的分档与污垢移动；调教者初吻记录 301', async () => {
  const { fixture, com_family } = seed_family_world(1);
  fixture.store.set('abl:31:0', 3); // → SOURCE:0 = 1500
  fixture.store.set('cflag:0:16', -1); // 调教者未初吻
  fixture.store.set('stain:0:0', 4); // 主人口有精液污
  await com_family.call(1);
  assert.equal(fixture.store.get('source:31:0'), 1500);
  assert.equal(fixture.store.get('source:31:10'), 100);
  assert.equal(fixture.store.get('source:31:12'), 220);
  assert.equal(fixture.store.get('source:31:14'), 50);
  // 舌头加成不在（TALENT:0:52 未种）→ SOURCE:16 无加成
  assert.equal(fixture.store.get('source:31:16'), undefined);
  assert.equal(fixture.store.get('deltabase:31:0'), -5);
  // V ⇔ 口 双向（beginTrain 不种初污——那是 run_train 的补偿段：undef|4=4）
  assert.equal(fixture.store.get('stain:31:3'), 4);
  assert.equal(fixture.store.get('stain:0:0'), 4);
  assert.equal(fixture.store.get('cflag:0:16'), 301); // :72-75 调教者初吻
  assert.equal(fixture.store.get('cstr:0:4'), '温妮');
  assert.equal(fixture.store.get('exp:31:40'), 3); // 百合经验+3（无断背支）
});

test('@COM1 擅用舌头（TALENT:PLAYER:52）：SOURCE:0 ×2 + SOURCE:16 加成', async () => {
  const { fixture, com_family } = seed_family_world(1);
  fixture.store.set('abl:31:0', 0); // 40
  fixture.store.set('talent:0:52', 1);
  await com_family.call(1);
  assert.equal(fixture.store.get('source:31:0'), 80);
  assert.equal(fixture.store.get('source:31:16'), 4); // 80/20
});

// —— @COM2（肛门爱抚）真身 ——

test('@COM2：ABL:3 分档 + EXP:1/PALAM 三段的乘法链；肛门经验 +S', async () => {
  const { fixture, com_family } = seed_family_world(2);
  fixture.store.set('abl:31:3', 1); // S2=75, S13=350
  fixture.store.set('exp:31:1', 0); // < EXPLV:1 → ×0.20、S6=500、S14 += 200
  fixture.store.set('palam:31:3', 0); // < LV1 → ×0.10、S6 ×3
  fixture.store.set('palam:31:5', 0); // < LV1 → ×0.30
  await com_family.call(2);
  assert.equal(fixture.store.get('source:31:12'), 850);
  assert.equal(fixture.store.get('source:31:14'), 400); // 200 + 200
  assert.equal(
    fixture.store.get('source:31:2'),
    Math.floor(75 * 0.2 * 0.1 * 0.3),
  );
  assert.equal(
    fixture.store.get('source:31:13'),
    Math.floor(350 * 0.2 * 0.1 * 0.3),
  );
  assert.equal(fixture.store.get('source:31:6'), Math.floor(500 * 3));
  assert.equal(fixture.store.get('exp:31:1'), 1); // ABL:3 <= 1 → S=1（门面写入）
  assert(fixture.text_lines().some((l) => l === '肛门经验+1'));
});

test('@COM2 触手装备：A 位 |= 2/4（不走 ⇔ 指交换）', async () => {
  const { fixture, com_family } = seed_family_world(2);
  fixture.store.set('tequip:31:90', 1);
  fixture.store.set('stain:31:4', 8);
  await com_family.call(2);
  assert.equal(fixture.store.get('stain:31:4'), 14); // 8 | 2 | 4
});

// —— @COM3（自慰）真身 ——

test('@COM3：判定段的一行形态与 A/V 门槛（不过 → RETURN 0，B 文读 A/V）', async () => {
  const { fixture, com_family } = seed_family_world(3);
  // golden train-natural:453 的算术（判定值 42 > 33）：顺从1 抖M3 苦痛1
  // 屈服2 反抗1 欲望1 露出癖1 快乐刻印2 欲情 LV2
  fixture.store.set('abl:31:10', 1);
  fixture.store.set('abl:31:21', 3);
  fixture.store.set('mark:31:0', 1);
  fixture.store.set('mark:31:1', 2);
  fixture.store.set('mark:31:2', 2);
  fixture.store.set('mark:31:3', 1);
  fixture.store.set('abl:31:11', 1);
  fixture.store.set('abl:31:17', 1);
  fixture.store.set('palam:31:5', 600); // LV2
  fixture.store.set('flag:10009', -1); // PREVCOM = -1（不进连续高潮支）
  const result = await com_family.call(3);
  assert.equal(result, 1);
  const judge = fixture.text_lines().find((l) => l.includes('实行值33'));
  assert(judge, '判定行输出（一行）');
  assert.ok(judge.endsWith(' = 42 > 实行值33'), '判定算术 = golden :453');
  // B 分支 3 读 A/V：42 > 33 且 < 50 → 「在…命令下、开始了自慰。」
  assert(
    fixture
      .text_lines()
      .some((l) => l === '在你要求自慰的命令下、温妮开始了自慰。'),
  );
  assert.equal(fixture.store.get('source:31:14'), 400);
  assert.equal(fixture.store.get('deltabase:31:0'), -5);
});

test('@COM3 判定不过（A < V）：RETURN 0 且不进 B 文（源序：RETURN 在 CALL 前）', async () => {
  const { fixture, com_family } = seed_family_world(3);
  // 全空状态：A = 0 < 33。B 分支 3 的「拒绝自慰」支在源侧因 RETURN 0 先于
  // CALL TRAIN_MESSAGE_B 而不可达（1:1 保留在 handler 里，不删）
  const result = await com_family.call(3);
  assert.equal(result, 0);
  assert(
    !fixture.text_lines().some((l) => l.includes('开始了自慰')),
    '拒绝路径不进 B 文',
  );
  assert.equal(fixture.store.get('source:31:14'), undefined, '拒绝后无源计算');
});

test('@COM3 A ≥ 80：完全驯服的牝奴/牡奴表情行（LOCALS 随性别）', async () => {
  const { fixture, com_family } = seed_family_world(3);
  fixture.store.set('abl:31:10', 5); // 顺从 5 → 20
  fixture.store.set('abl:31:21', 5); // 抖M 5 → 10
  fixture.store.set('mark:31:2', 5); // 屈服 5 → 30
  fixture.store.set('mark:31:1', 5); // 快乐 5 → 15
  fixture.store.set('abl:31:11', 5); // 欲望 5 → 15
  fixture.store.set('abl:31:17', 5); // 露出癖 5 → 20
  fixture.store.set('palam:31:5', 40000); // LV5 → 15
  // 合计 125 ≥ 80
  await com_family.call(3);
  assert(
    fixture
      .text_lines()
      .some(
        (l) =>
          l ===
          '温妮一点都不反感自慰的命令、带着完全驯服的牝奴的表情、开始了自慰。',
      ),
  );
});

// —— @COM4（口交）真身 ——

test('@COM4：ABL:0 分档 + EVENT_SEITSU 触发（扶她 + 未熟 + 关系 150）', async () => {
  const { fixture, com_family } = seed_family_world(4);
  fixture.store.set('abl:31:0', 2); // 800
  fixture.store.set('talent:31:121', 1); // 扶她
  fixture.store.set('talent:31:135', 1); // 未熟
  fixture.store.set('relation:31:0', 150);
  fixture.store.set('abl:31:0', 5); // C 感度 5 → 精通成立
  await com_family.call(4);
  assert.equal(fixture.store.get('source:31:0'), 3200);
  assert.equal(fixture.store.get('exp:31:40'), 3);
  assert.equal(fixture.store.get('cflag:0:22'), 1); // 調教者的経験
  // 精通：打印 + 未熟剥落
  assert(
    fixture
      .text_lines()
      .some((l) => l === '你的阴茎被吸啜着，温妮开始精通这个了…'),
  );
  assert.equal(fixture.store.get('talent:31:135'), 0);
});

// —— @COM5（胸爱抚）真身 ——

test('@COM5：ABL:1 分档 + EVENT_JUNYU 触发（巨乳 + 未熟调教者 + 关系）', async () => {
  const { fixture, com_family } = seed_family_world(5);
  fixture.store.set('abl:31:1', 5); // S17=2800, S3=250（EVENT_JUNYU 需 ≥5）
  fixture.store.set('talent:31:110', 1); // 巨乳
  fixture.store.set('talent:0:135', 1); // 调教者未熟
  fixture.store.set('relation:31:0', 150);
  await com_family.call(5);
  assert.equal(fixture.store.get('source:31:17'), 2800);
  assert.equal(fixture.store.get('source:31:3'), 250);
  assert.equal(fixture.store.get('source:31:4'), 60);
  // 母乳体质（talent:130 属 chara——经门面写）
  assert(
    fixture
      .text_lines()
      .some((l) => l === '温妮的乳房被玩弄着，里面的母乳漏出来了…'),
  );
  assert.equal(fixture.store.get('talent:31:130'), 1);
});

test('@COM5 胸可用时调教者擅用舌头：S17 ×1.40 + S16 加成；B ⇔ 口移动', async () => {
  const { fixture, com_family } = seed_family_world(5);
  fixture.store.set('abl:31:1', 0); // S17=20
  fixture.store.set('talent:0:52', 1);
  await com_family.call(5);
  assert.equal(fixture.store.get('source:31:17'), 28); // 20 ×1.4
  assert.equal(fixture.store.get('source:31:16'), 1); // 28/20
});

// —— @COM6（接吻）真身 ——

test('@COM6：判定段算术 = golden :169（29 > 15）；SOURCE:8 由 Y 决定', async () => {
  const { fixture, com_family } = seed_family_world(6);
  // golden train-natural:169 的状态（replay 播种同源）
  fixture.store.set('abl:31:10', 1);
  fixture.store.set('abl:31:21', 3);
  fixture.store.set('mark:31:0', 1);
  fixture.store.set('mark:31:1', 2);
  fixture.store.set('mark:31:2', 2);
  fixture.store.set('mark:31:3', 1);
  fixture.store.set('abl:31:11', 1);
  fixture.store.set('palam:31:5', 150); // 欲情 LV1
  const result = await com_family.call(6);
  assert.equal(result, 1);
  const judge = fixture.text_lines().find((l) => l.includes('实行值15'));
  assert.ok(judge.endsWith(' = 29 > 实行值15'), '判定算术 = golden :169');
  // Y = 0（主人口污未种）→ SOURCE:8 = 10，侍奉精神 0 档再 ×4.00 → 40
  assert.equal(fixture.store.get('source:31:8'), 40);
  // ABL:16 = 0 档 [50, 10]，再过 ABL:12（技巧）0 档 ×0.50 → 25 / 5
  assert.equal(fixture.store.get('source:31:4'), 25);
  assert.equal(fixture.store.get('source:31:5'), 5);
  // 玩家技巧 0 → SOURCE:3 = 100、SOURCE:10 = 0
  assert.equal(fixture.store.get('source:31:3'), 100);
  assert.equal(fixture.store.get('source:31:10'), 0);
  // B 分支 6（普通支 + 顺从 < 2 → 无舌吻）
  assert(
    fixture
      .text_lines()
      .some((l) => l === '你在温妮口腔的每个角落来回舔舐着……'),
  );
});

test('@COM6 自动成功（顺从 2+）：跳过判定段，Y 沿用第一块（主人口污 → Y=2 → S8=50×…）', async () => {
  const { fixture, com_family } = seed_family_world(6);
  fixture.store.set('abl:31:10', 2); // 顺从 2 → AUTO_SUCCESS
  fixture.store.set('stain:0:0', 4); // 精液 → Y = 3 → /2 = 1
  await com_family.call(6);
  assert(
    !fixture.text_lines().some((l) => l.includes('实行值')),
    '自动成功路径无判定行',
  );
  // Y = 1 → SOURCE:8 = 1*20+10 = 30，侍奉 0 档 ×4 → 120
  assert.equal(fixture.store.get('source:31:8'), 120);
});

test('@COM6 初吻：TFLAG:13/200、CFLAG:16 = 1、CSTR:4、爱情经验 +20 基础', async () => {
  const { fixture, com_family } = seed_family_world(6);
  fixture.store.set('abl:31:10', 2);
  fixture.store.set('cflag:31:2', 2000); // 好感度累计 ≥ 1000 → 爱情经验行
  fixture.store.set('cflag:31:16', -1); // 初吻未体验
  fixture.store.set('cflag:0:16', -1); // 调教者也是初吻
  await com_family.call(6);
  assert.equal(fixture.store.get('tflag:13'), 1);
  assert.equal(fixture.store.get('tflag:200'), 1); // 屈服刻印１
  assert.equal(fixture.store.get('cflag:31:16'), 1);
  assert.equal(fixture.store.get('cstr:31:4'), '你');
  assert.equal(fixture.store.get('cflag:0:16'), 1); // 调教者初吻（码 1）
  assert(fixture.text_lines().some((l) => l === '爱情经验+21')); // 1 + 20
  assert.equal(fixture.store.get('tflag:30'), 1); // 主人接吻计数
});

// —— @COM7（自己扒开）真身 ——

test('@COM7：判定段（22 门槛）与 ABL 分档的源；B 文的没毛前缀', async () => {
  const { fixture, com_family } = seed_family_world(7);
  // 顺从1(4) + 抖M3(6) + 私处感觉2(4) + 侍奉3(12) + 露出癖2(6) + 欲情LV1(3)
  // - 润滑不足(5) = 30 > 22
  fixture.store.set('abl:31:10', 1);
  fixture.store.set('abl:31:21', 3);
  fixture.store.set('abl:31:2', 2);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('abl:31:17', 2);
  fixture.store.set('palam:31:5', 150);
  fixture.store.set('palam:31:3', 0);
  const result = await com_family.call(7);
  assert.equal(result, 1);
  // 顺从1(4) + 抖M3(6) + 私处感觉2(4) + 侍奉3(12) + 露出癖2(6)
  // - 润滑不足(5) + 欲情LV1(3) - 私处经验不足(5) = 25
  const judge = fixture.text_lines().find((l) => l.includes('实行值22'));
  assert.ok(judge.endsWith(' = 25 > 实行值22'), '判定算术');
  assert(judge.includes(' - 润滑不足(5)'), '润滑不足的负项（字面量名）');
  assert(judge.includes(' - 私处经验 不足(5)'), '经验不足的负项');
  assert(judge.includes(' + 侍奉精神LV3(12)'));
  // ABL:2 = 2 → [S12, S13] = [2100, 1000]；S12 再过 ABL:17 档 ×1.40 与
  // 剃毛（阴毛未种 → 0 ≤ 20）×2.00 → 5880；ABL:16 = 3 → [S4, S5] =
  // [250, 300]，S5 再 ×1.40 → 420
  assert.equal(fixture.store.get('source:31:13'), 1000);
  assert.equal(fixture.store.get('source:31:4'), 250);
  assert.equal(fixture.store.get('source:31:12'), 5880);
  assert.equal(fixture.store.get('source:31:5'), 420);
  assert.equal(fixture.store.get('source:31:7'), 300); // ABL:17 = 2 档
  // B 文：阴毛未种（0 ≤ 20）→「没毛的」
  assert(fixture.text_lines().some((l) => l.includes('没毛的阴部')));
  assert.equal(fixture.store.get('tflag:200'), 1); // 屈服刻印１
});

test('@COM7 处女（TALENT:0）：-20 使判定不过 → RETURN 0', async () => {
  const { fixture, com_family } = seed_family_world(7);
  fixture.store.set('talent:31:0', 1); // 处女 -20
  const result = await com_family.call(7);
  assert.equal(result, 0);
});

// —— @COM8（插入手指）真身 ——

test('@COM8：CONFIRM_LOST_VIRGIN 真身（#216 接线）选 0 放行；源与 TFLAG:19', async () => {
  const { fixture, com_family } = seed_family_world(8);
  fixture.set_inputs(0); // 「来吧女人」→ RETURN 1 放行（真身吃这一发输入）
  fixture.store.set('talent:31:0', 1); // 处女 → 打确认问句
  fixture.store.set('abl:31:2', 2); // S1=250, S13=400
  fixture.store.set('exp:31:0', 0); // < EXPLV:1 → ×0.20、S6=300
  fixture.store.set('palam:31:3', 0); // < LV1 → ×0.10、S6 += 700 后 ×3
  const result = await com_family.call(8);
  assert.equal(result, 1);
  assert(
    fixture.text_lines().some((l) => l === '夺取温妮的处女吗？'),
    '处女时打确认问句（真身，com-vaginasex.js）',
  );
  assert(
    fixture.lines.some((e) => e.type === 'button' && e.text === '来吧女人'),
    '确认按钮 [0]（printButton 记录为 button 条目）',
  );
  // 250 ×0.2 ×0.1 = 5；欲情未种 < LV1 → ×0.50 → 2
  assert.equal(fixture.store.get('source:31:1'), 2);
  // S6 = (300 + 700) × 3 = 3000
  assert.equal(fixture.store.get('source:31:6'), 3000);
  assert.equal(fixture.store.get('exp:31:0'), 2); // ABL:2 = 2 → ≤4 档 → S=2
  assert(fixture.text_lines().some((l) => l === '私处经验+2'));
  assert.equal(fixture.store.get('tflag:19'), 1); // 伴 V 经验旗标
  // B 分支 8（EXP:0 = 0 → 未经人事的…害怕）
  assert(
    fixture
      .text_lines()
      .some((l) => l === '你把温妮的未经人事的阴部用自己的手指慢慢地插了进去…'),
  );
  assert(fixture.text_lines().some((l) => l === '温妮对私处里的异物感到害怕…'));
});

test('@COM8 最末档（EXP:0 ≥ EXPLV:5）乘 SOURCE:2 而非 SOURCE:1（源 :72 逐字）', async () => {
  const { fixture, com_family } = seed_family_world(8);
  fixture.store.set('exp:31:0', 200);
  fixture.store.set('abl:31:2', 0); // S1 = 10
  fixture.store.set('source:31:2', 100); // 预置观察 SOURCE:2 被乘
  await com_family.call(8);
  assert.equal(fixture.store.get('source:31:2'), 180); // 100 ×1.8（最末档乘 S2）
  // S1 未被该档乘，但随后 PALAM:3/5 的乘法门链（未种 → ×0.10 ×0.50）仍
  // 走完 → 10 → 1 → 0（润滑/欲情的档位乘法对所有 EXP 档生效，源序如此）
  assert.equal(fixture.store.get('source:31:1'), 0);
});

// —— @COM9（舔肛）真身 ——

test('@COM9：ABL:3 分档、A ⇔ 口移动、肛门经验 +1、调教者初吻 401', async () => {
  const { fixture, com_family } = seed_family_world(9);
  fixture.store.set('abl:31:3', 4); // 1000
  fixture.store.set('cflag:0:16', -1);
  await com_family.call(9);
  assert.equal(fixture.store.get('source:31:2'), 1000);
  assert.equal(fixture.store.get('source:31:10'), 50);
  assert.equal(fixture.store.get('source:31:12'), 300);
  assert.equal(fixture.store.get('source:31:14'), 500);
  assert.equal(fixture.store.get('stain:31:4'), 0); // beginTrain 未种初污 → undef|0 = 0
  assert.equal(fixture.store.get('exp:31:1'), 1);
  assert(fixture.text_lines().some((l) => l === '肛门经验＋１')); // 全角＋
  assert.equal(fixture.store.get('cflag:0:16'), 401);
});

// —— @COM_ABLE1-9（每条指令至少一正一负，关键判据逐条） ——

/** 裸世界（穿衣态由用例自定）：返回 families 直调助手 */
function able_world() {
  const world = seed_family_world(0);
  return world;
}

test('@COM_ABLE1：默认放行；男人/触手/决斗/着衣各挡一条', async () => {
  const { fixture, com_able_family } = able_world();
  const target = 31;
  assert.equal(await com_able_family.call(1), 1);
  fixture.store.set('flag:25', 1);
  assert.equal(await com_able_family.call(1), 0, '爱抚系过滤');
  fixture.store.set('flag:25', 0);
  fixture.store.set(`talent:${target}:122`, 1);
  assert.equal(await com_able_family.call(1), 0, '对象是男人');
  fixture.store.delete(`talent:${target}:122`);
  fixture.store.set(`tequip:${target}:90`, 1);
  assert.equal(await com_able_family.call(1), 0, '触手调教中');
  fixture.store.delete(`tequip:${target}:90`);
  fixture.store.set(`tequip:${target}:55`, 1);
  assert.equal(await com_able_family.call(1), 0, '决斗中');
  fixture.store.delete(`tequip:${target}:55`);
  fixture.store.set('flag:37', 1);
  fixture.store.set(`cflag:${target}:40`, 16); // 下装位
  assert.equal(await com_able_family.call(1), 0, 'パンツ/下装在身');
  fixture.store.set('flag:37', 0);
  assert.equal(await com_able_family.call(1), 1, 'FLAG:37 关则着衣判定不生效');
});

test('@COM_ABLE1 的助手污物判据（性器精液 + 反感污臭 + 顺从 ≤3 的助手）', async () => {
  const { fixture, com_able_family } = able_world();
  fixture.store.set('stain:31:2', 4); // 精液
  fixture.store.set('flag:10007', 1); // ASSIPLAY
  fixture.store.set('flag:10006', 31); // ASSI = 31（自任助手）
  fixture.store.set('talent:31:62', 1); // 反感污臭
  fixture.store.set('abl:31:0', 0); // 顺从（判据读 ABL:ASSI:0）
  assert.equal(await com_able_family.call(1), 0);
  fixture.store.set('talent:31:64', 1); // 助手不怕脏 → 放行
  assert.equal(await com_able_family.call(1), 1);
});

test('@COM_ABLE2：主人放行；兽奸挡；助手 + 润滑不足的双 ≤3 放行（源 :98-100 逐字）', async () => {
  const { fixture, com_able_family } = able_world();
  assert.equal(await com_able_family.call(2), 1, '主人调教自动成功');
  fixture.store.set('tequip:31:89', 1);
  assert.equal(await com_able_family.call(2), 0, '兽奸中');
  fixture.store.delete('tequip:31:89');
  // 助手调教 + 润滑不足：源文顺从 ≤3 且百合 ≤3 → RETURN 1（注释与代码相反）
  fixture.store.set('flag:10007', 1);
  fixture.store.set('flag:10006', 31);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:22', 3);
  assert.equal(await com_able_family.call(2), 1, '双 ≤3 放行（源逐字）');
  fixture.store.set('abl:31:10', 4); // 顺从 4 → 不满足 ≤3 组合
  assert.equal(await com_able_family.call(2), 0);
  fixture.store.set('talent:31:83', 1); // 施虐狂 → 放行
  assert.equal(await com_able_family.call(2), 1);
});

test('@COM_ABLE3：失神/从不自慰/绳子/着衣挡；助手双低挡（小恶魔豁免）', async () => {
  const { fixture, com_able_family } = able_world();
  assert.equal(await com_able_family.call(3), 1);
  fixture.store.set('tflag:899', 1);
  assert.equal(await com_able_family.call(3), 0, '失神中');
  fixture.store.delete('tflag:899');
  fixture.store.set('talent:31:150', 1);
  assert.equal(await com_able_family.call(3), 0, '从不自慰');
  fixture.store.delete('talent:31:150');
  fixture.store.set('tequip:31:44', 1);
  assert.equal(await com_able_family.call(3), 0, '绳子');
  fixture.store.delete('tequip:31:44');
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:40', 1);
  assert.equal(await com_able_family.call(3), 0, '内裤位');
  fixture.store.set('flag:37', 0);
  fixture.store.set('flag:10007', 1);
  fixture.store.set('flag:10006', 31);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:22', 3);
  assert.equal(await com_able_family.call(3), 0, '助手双 ≤3');
  fixture.store.set('talent:31:87', 1); // 小恶魔
  assert.equal(await com_able_family.call(3), 1);
});

test('@COM_ABLE4：默认放行；(CFLAG:40 & 1) 位（优先级：&1 单独成立即挡）', async () => {
  const { fixture, com_able_family } = able_world();
  assert.equal(await com_able_family.call(4), 1);
  fixture.store.set('flag:37', 0);
  fixture.store.set('cflag:31:40', 1);
  assert.equal(await com_able_family.call(4), 0, '位 1（内裤）不看 FLAG:37');
  fixture.store.delete('cflag:31:40');
  fixture.store.set('cflag:31:40', 16); // 位 16：需 FLAG:37 才挡
  assert.equal(await com_able_family.call(4), 1, 'FLAG:37 关 → 位 16 不挡');
  fixture.store.set('flag:37', 1);
  assert.equal(await com_able_family.call(4), 0);
});

test('@COM_ABLE5：男人/胸罩位（位 2|4）挡', async () => {
  const { fixture, com_able_family } = able_world();
  assert.equal(await com_able_family.call(5), 1);
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(5), 0);
  fixture.store.delete('talent:31:122');
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:40', 2);
  assert.equal(await com_able_family.call(5), 0, '胸罩位');
});

test('@COM_ABLE6：绝不侍奉/口塞/触手挡；口污助手判据', async () => {
  const { fixture, com_able_family } = able_world();
  assert.equal(await com_able_family.call(6), 1);
  fixture.store.set('talent:31:151', 1);
  assert.equal(await com_able_family.call(6), 0, '绝不侍奉');
  fixture.store.delete('talent:31:151');
  fixture.store.set('tequip:31:45', 1);
  assert.equal(await com_able_family.call(6), 0, '口塞');
  fixture.store.delete('tequip:31:45');
  fixture.store.set('tequip:31:90', 1);
  assert.equal(await com_able_family.call(6), 0, '触手');
  fixture.store.delete('tequip:31:90');
  fixture.store.set('stain:31:0', 1); // 爱液 + 助手
  fixture.store.set('flag:10007', 1);
  fixture.store.set('flag:10006', 31);
  fixture.store.set('talent:31:62', 1);
  fixture.store.set('abl:31:10', 3);
  assert.equal(await com_able_family.call(6), 0);
});

test('@COM_ABLE7：顺从 2 未満/处女三条件/振动挡', async () => {
  const { fixture, com_able_family } = able_world();
  fixture.store.set('abl:31:10', 1);
  assert.equal(await com_able_family.call(7), 0, '顺从 < 2');
  fixture.store.set('abl:31:10', 2);
  assert.equal(await com_able_family.call(7), 1);
  fixture.store.set('talent:31:0', 1); // 处女：需顺从 3+ 或露出 3+
  assert.equal(await com_able_family.call(7), 0);
  fixture.store.set('abl:31:17', 3);
  assert.equal(await com_able_family.call(7), 1, '露出癖 3 抵处女');
  fixture.store.delete('talent:31:0');
  fixture.store.set('tequip:31:11', 1);
  assert.equal(await com_able_family.call(7), 0, '振动使用中');
});

test('@COM_ABLE8：男人/贞操带/贞操封印/润滑不足助手挡（施虐狂豁免）', async () => {
  const { fixture, com_able_family } = able_world();
  assert.equal(await com_able_family.call(8), 1);
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(8), 0);
  fixture.store.delete('talent:31:122');
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:42', 79);
  fixture.store.set('cflag:31:40', 64);
  assert.equal(await com_able_family.call(8), 0, '贞操带');
  fixture.store.delete('cflag:31:42');
  fixture.store.delete('cflag:31:40');
  fixture.store.set('talent:31:273', 1);
  assert.equal(await com_able_family.call(8), 0, '贞操封印');
  fixture.store.delete('talent:31:273');
  fixture.store.set('flag:10007', 1);
  fixture.store.set('flag:10006', 31);
  fixture.store.set('abl:31:10', 3);
  assert.equal(await com_able_family.call(8), 0, '润滑不足 + 助手双低');
  fixture.store.set('talent:31:83', 1);
  assert.equal(await com_able_family.call(8), 1, '施虐狂豁免');
});

test('@COM_ABLE9：肛门虫/肛珠/浣腸/电极挡（无污物门槛，只看助手态度）', async () => {
  const { fixture, com_able_family } = able_world();
  assert.equal(await com_able_family.call(9), 1);
  for (const teq of [13, 19, 46, 49]) {
    fixture.store.set(`tequip:31:${teq}`, 1);
    assert.equal(await com_able_family.call(9), 0, `TEQUIP:${teq}`);
    fixture.store.delete(`tequip:31:${teq}`);
  }
  fixture.store.set('flag:10007', 1);
  fixture.store.set('flag:10006', 31);
  fixture.store.set('talent:31:62', 1);
  fixture.store.set('abl:31:10', 3);
  assert.equal(
    await com_able_family.call(9),
    0,
    '反感污臭的助手（无污物门槛）',
  );
});

// —— TRAIN_MESSAGE_B/A 的 1-9 分支（每指令至少一支；rand 注入可观察） ——

test('B 分支 4（口交）：扶她 + rand(3)==0 走阴茎支（Math.random 定数化）', async () => {
  const { fixture, com_family } = seed_family_world(4);
  fixture.store.set('talent:31:121', 1); // 扶她
  fixture.store.set('palam:31:5', 0); // 无勃起前缀
  const original_random = Math.random;
  Math.random = () => 0; // rand(3) === 0（replay 的 RAND_FIX 同款手法）
  try {
    await com_family.call(4);
  } finally {
    Math.random = original_random;
  }
  assert(
    fixture.text_lines().some((l) => l === '你将温妮的阴茎、放到嘴里舔舐着…'),
  );
});

test('B 分支 5（胸爱抚）：普通支一行合成（你抚摸着…肌肤、温妮的…）', async () => {
  const { fixture, com_family } = seed_family_world(5);
  await com_family.call(5);
  // 全空素质 → 尾链落最末 else（胸部揉动着…）
  assert(
    fixture
      .text_lines()
      .some((l) => l === '你抚摸着温妮的肌肤、温妮的胸部揉动着…'),
  );
});

test('B 分支 5 死斗场：TFLAG:400 的 PRINTFORMW 六支之一（发霉的狗）', async () => {
  const { fixture, com_family } = seed_family_world(5);
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('tflag:400', 203);
  await com_family.call(5);
  assert(
    fixture
      .text_lines()
      .includes('倒下了的温妮的身上坐着一只发霉的狗、正在玩弄着她的胸部……'),
  );
  assert(fixture.waits.length > 0, 'PRINTFORMW 等键');
});

test('B 分支 6（接吻）：魔兽支按 E:307 取文案（史莱姆）', async () => {
  const { fixture, com_family } = seed_family_world(6);
  fixture.store.set('tequip:31:88', 1);
  fixture.store.set('abl:31:10', 2); // 顺从 2+ → 判定段自动成功（直进 B 文）
  // E 数组由 COMF88 的 CALL MONSTER_DATA 置入——测试直接种 e 键
  fixture.store.set('e:300', 0);
  fixture.store.set('e:307', 2); // 史莱姆
  fixture.store.set('talent:31:159', 1); // 异种婚姻
  fixture.store.set('itemname:0', '史莱姆'); // MONSTER_NAME 拼名读 ITEMNAME 表
  await com_family.call(6);
  assert(
    fixture
      .text_lines()
      .some((l) => l === '史莱姆 的口内被仔细地亲吻着、彼此幸福地交换着唾液……'),
  );
});

test('B 分支 7（自己扒开）：阴毛档与 TFLAG:38 精液漏出、贞操带行', async () => {
  const { fixture, com_family } = seed_family_world(7);
  fixture.store.set('abl:31:10', 5); // 顺从 5 → 判定 20+8+15-5-5 = 33 > 22
  fixture.store.set('talent:31:310', 250); // 201-300 → 被长齐的阴毛覆盖的
  fixture.store.set('abl:31:17', 5);
  fixture.store.set('tflag:38', 2);
  fixture.store.set('cflag:31:42', 79);
  fixture.store.set('cflag:31:40', 64);
  await com_family.call(7);
  assert(
    fixture
      .text_lines()
      .some((l) => l.includes('被长齐的阴毛覆盖的阴部张了开来')),
  );
  assert(
    fixture
      .text_lines()
      .includes('从完全打开的私处口中、灌满的精液不断地流了出来……'),
  );
  assert(
    fixture
      .text_lines()
      .includes('然后、温妮的阴部、被结实的贞操带紧紧保护着。'),
  );
});

test('B 分支 8（插入手指）：裸手插入行与私处经验档的害怕句', async () => {
  const { fixture, com_family } = seed_family_world(8);
  // PREVCOM ≠ 8：升格头不触发（否则 JUMP COM84 → 未移植即 COM_MISSING 上抛）
  await com_family.call(8);
  assert(
    fixture
      .text_lines()
      .includes('你把温妮的未经人事的阴部用自己的手指慢慢地插了进去…'),
  );
  assert(fixture.text_lines().includes('温妮对私处里的异物感到害怕…'));
});

test('@COM8 的升格跳转：PREVCOM == 8 且玩家技巧 3+ → JUMP COM84（未移植上抛 COM_MISSING）', async () => {
  const { fixture, com_family } = seed_family_world(8);
  fixture.store.set('abl:0:12', 3);
  fixture.store.set('flag:10009', 8); // PREVCOM = 8
  const result = await com_family.call(8);
  // CASE 8 不探测可用性（#213 勘定）→ 直跳 84；@COM84 随 J19——COM_MISSING
  // 上抛给回合循环按「重新要求输入」丢弃本回合（train-loop 步骤 12 语义）
  const { COM_MISSING } = fixture.load_module('system/train/com-family');
  assert.equal(result, COM_MISSING);
  assert.equal(fixture.text_lines().length, 0, '跳转路径零输出');
});

test('B 分支 9（舔肛）：EXP:1 ≥ 50 且欲情高 → 深入搅动句', async () => {
  const { fixture, com_family } = seed_family_world(9);
  fixture.store.set('exp:31:1', 50);
  fixture.store.set('palam:31:5', 3000); // ≥ PALAMLV:3
  fixture.store.set('abl:31:3', 3);
  await com_family.call(9);
  assert(
    fixture
      .text_lines()
      .includes(
        '你把温妮的肛门、认真细致地舔舐着、舌头伸入到洞里去、有节奏地搅动了…',
      ),
  );
});

// —— TRAIN_MESSAGE_A 的 1/2/3/5 分支（delta 读数与档位）；4/6/7/8/9 空支 ——

test('A 分支 1（舔阴）：UP:0 六档取样与素质岔（害羞 + 接受快感）', async () => {
  const { fixture } = seed_family_world(1);
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('delta:31:0', 2500); // 1000-3000 档（敏感的阴蒂被舔）
  fixture.store.set('talent:31:35', 1);
  fixture.store.set('talent:31:70', 1);
  await train_message_a();
  assert(
    fixture
      .text_lines()
      .includes(
        '敏感的阴蒂被舔、温妮羞耻得面红耳赤、咬着下唇抑制自己发出声音。吐出热情的气息、任由快感支配身体。',
      ),
  );
});

test('A 分支 2（肛门爱抚）：UP:2 的低档 + ABL:3 分岔；中档的肛门钝感前缀', async () => {
  const { fixture } = seed_family_world(2);
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('delta:31:2', 100);
  fixture.store.set('abl:31:3', 3);
  await train_message_a();
  assert(
    fixture.text_lines().includes('温妮身体扭曲着发出了悲鸣。身体还没准备好。'),
  );
  fixture.store.set('delta:31:2', 2500);
  fixture.store.set('talent:31:106', 1);
  await train_message_a();
  assert(
    fixture
      .text_lines()
      .includes(
        '温妮发出小声的娇喘、身子弹起来了。好像还能加强肛门的感觉、开始感觉到明确的快感了。',
      ),
  );
});

test('A 分支 3（自慰）：状态行合成（害羞含泪 + 娇小 + 摄像机前）与 E 档', async () => {
  const { fixture } = seed_family_world(3);
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('talent:31:35', 1); // 害羞（ABL:17 = 0 ≤ 3）
  fixture.store.set('talent:31:100', 1); // 娇小（阻断装备段）
  fixture.store.set('tequip:31:53', 1); // 摄像机
  fixture.store.set('delta:31:0', 200);
  await train_message_a();
  assert(
    fixture
      .text_lines()
      .includes(
        '温妮羞耻得面红耳赤、眼中含泪、娇小的身体、对着摄像机继续手淫着。',
      ),
  );
  // E = 200 < 300 → 最差档
  assert(
    fixture
      .text_lines()
      .includes('这样笨拙的手部动作、相比快感还是羞耻来得强烈。'),
  );
});

test('A 分支 5（胸爱抚）：爆乳先行行 + UP:14 高档的双行', async () => {
  const { fixture } = seed_family_world(5);
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('talent:31:114', 1);
  fixture.store.set('talent:31:130', 1); // 母乳（非吸盘/搾乳器 → 吸啜）
  fixture.store.set('delta:31:14', 20000);
  await train_message_a();
  assert(
    fixture
      .text_lines()
      .includes('你的手、完全陷入到温妮惊心动魄的汹涌波涛中了…… '),
  );
  assert(
    fixture
      .text_lines()
      .includes('对温妮的胸部、不断吸啜、让她感到了无上的愉悦、身体不住跳动。'),
  );
  assert(
    fixture
      .text_lines()
      .includes('眼前这丰满硕大的双峰在不停地颤抖、跳动着、真是赏心悦目啊。'),
  );
});

test('A 空支（4/6/7/8/9）：源侧无分支——零输出（不落占位行）', async () => {
  const { fixture, era_flag } = seed_family_world(4);
  const { train_message_a } = fixture.load_module('system/train/train-message');
  for (const n of [4, 6, 7, 8, 9]) {
    era_flag.selectcom = n;
    const before = fixture.lines.length;
    await train_message_a();
    assert.equal(fixture.lines.length - before, 1, `SELECTCOM=${n} 只画点线`);
    assert(
      !fixture.text_lines().some((l) => l.includes('@TRAIN_MESSAGE_A')),
      '源侧无分支 → 不落占位行',
    );
  }
});

// —— @GET_ADV_COM 的本族规则（CASE 1/3/4/5/6/8） ——

/** 升格规则世界：种 PREVCOM/TFLAG:50/TFLAG:59 与目标 COM_ABLE */
function adv_world(fixture, { prev, t50 = 0, t59 = 0, assiplay = 0 } = {}) {
  fixture.store.set('flag:10009', prev);
  fixture.store.set('tflag:50', t50);
  fixture.store.set('tflag:59', t59);
  fixture.store.set('flag:10007', assiplay);
}

test('升格 CASE 1（舔阴→69）：同调教者 + 前回合口交（31）且非绳缚/兽奸，目标可用', async () => {
  const { fixture } = seed_family_world(1);
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  const { com_able_family } = fixture.load_module('system/train/com-family');
  // 目标 69 的 COM_ABLE 在 J15 落地前缺号 → whenMissing 0 → 不升格（设计）
  adv_world(fixture, { prev: 31 });
  assert.equal(await adv_com_family.call(1, () => 0), 1, '目标缺号 → 原样返回');
  // 测试内注册 COM_ABLE69 的最小实现（顺从 3+ 放行形态）模拟族票落地
  com_able_family.register(69, async () =>
    (fixture.store.get('abl:31:10') || 0) >= 3 ? 1 : 0,
  );
  fixture.store.set('abl:31:10', 3);
  assert.equal(await adv_com_family.call(1, () => 0), 69, '复核通过 → 升格');
  fixture.store.set('tequip:31:44', 1); // 绳子 → 不升格
  assert.equal(await adv_com_family.call(1, () => 0), 1);
});

test('升格 CASE 8（插入手指→84）：不探测可用性，PREVCOM == 8 且技巧 3+ 直跳', async () => {
  const { fixture } = seed_family_world(8);
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  adv_world(fixture, { prev: 8 });
  fixture.store.set('abl:0:12', 3);
  assert.equal(await adv_com_family.call(8, () => 0), 84);
  fixture.store.set('flag:10009', 84); // 前回合就是 G 点 → 继续 84
  assert.equal(await adv_com_family.call(8, () => 0), 84);
  fixture.store.set('abl:0:12', 2);
  fixture.store.set('flag:10009', 8);
  assert.equal(await adv_com_family.call(8, () => 0), 8, '技巧不足 → 原样');
});

test('升格 CASE 6（接吻→128/133）：TFLAG:59 分岔（前前回合 G 点系 → 128）', async () => {
  const { fixture } = seed_family_world(6);
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  const { com_able_family } = fixture.load_module('system/train/com-family');
  com_able_family.register(128, async () => 1); // 模拟 J19 落地
  // PREVCOM = 120（挿入Ｇ点）+ TFLAG:59 = 129 → 正常位・接吻
  adv_world(fixture, { prev: 120, t59: 129 });
  assert.equal(await adv_com_family.call(6, () => 0), 128);
  // 调教者换了（TFLAG:50 与 ASSIPLAY 不一致）→ 不升格
  adv_world(fixture, { prev: 120, t59: 129, assiplay: 1, t50: 0 });
  assert.equal(await adv_com_family.call(6, () => 0), 6);
});

test('升格 CASE 5（胸爱抚→129/131）与 CASE 3/4（→125/69）', async () => {
  const { fixture } = seed_family_world(5);
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  const { com_able_family } = fixture.load_module('system/train/com-family');
  com_able_family.register(129, async () => 1);
  com_able_family.register(131, async () => 1);
  adv_world(fixture, { prev: 20 }); // 正常位 → 129
  assert.equal(await adv_com_family.call(5, () => 0), 129);
  adv_world(fixture, { prev: 21 }); // 背后位 → 131
  assert.equal(await adv_com_family.call(5, () => 0), 131);
  com_able_family.register(125, async () => 1);
  adv_world(fixture, { prev: 124 }); // 深喉 → 125（CASE 3）
  assert.equal(await adv_com_family.call(3, () => 0), 125);
  com_able_family.register(69, async () => 1);
  adv_world(fixture, { prev: 61 }); // 强制舔阴 → 69（CASE 4）
  assert.equal(await adv_com_family.call(4, () => 0), 69);
});

test('升格规则无副作用：CASE 1-8 不写 FLAG:71/TFLAG:42（体位族 CASE 20-34 才有）', async () => {
  const { fixture } = seed_family_world(6);
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  const { com_able_family } = fixture.load_module('system/train/com-family');
  com_able_family.register(128, async () => 1);
  adv_world(fixture, { prev: 20 });
  fixture.store.set('flag:71', 999);
  fixture.store.set('tflag:42', 7);
  await adv_com_family.call(6, () => 0);
  assert.equal(fixture.store.get('flag:71'), 999, '本族规则不碰 FLAG:71');
  assert.equal(fixture.store.get('tflag:42'), 7, '本族规则不碰 TFLAG:42');
});

// —— 持久位与跨域写 ——

test('TEQUIP 只读 + CFLAG 持久位：COM6 的 TFLAG:13/30/100/200 与 CFLAG:16/22', async () => {
  const { fixture, com_family } = seed_family_world(6);
  fixture.store.set('abl:31:10', 2);
  await com_family.call(6);
  assert.equal(fixture.store.get('tflag:100'), 1); // 侍奉快乐经验旗
  // tflag/cflag 都是火车表内可寻址位（test/static-table-coverage 的族探测另测）
  assert.equal(fixture.store.get('tflag:30'), 1);
});

test('@COM6 兽奸（TEQUIP:89）：A 实减 15 而打印 (10)——数值与文案不一致是原状', async () => {
  const { fixture, com_family } = seed_family_world(6);
  fixture.store.set('itemname:22', '野狗');
  fixture.store.set('tequip:31:89', 1);
  // 与 golden :169 同源的贡献种子：合计 29，兽奸 -15、主人口污 Y=3 → 11 < 15
  fixture.store.set('abl:31:10', 1);
  fixture.store.set('abl:31:21', 3);
  fixture.store.set('mark:31:0', 1);
  fixture.store.set('mark:31:1', 2);
  fixture.store.set('mark:31:2', 2);
  fixture.store.set('mark:31:3', 1);
  fixture.store.set('abl:31:11', 1);
  fixture.store.set('palam:31:5', 150);
  const result = await com_family.call(6);
  assert.equal(result, 0);
  const judge = fixture.text_lines().find((l) => l.includes('实行值15'));
  assert(judge.includes('- 野狗(10) - '), '打印值是 (10)');
  assert.ok(judge.endsWith(' = 11 < 实行值15'), '算术实减 15（29-15-3 = 11）');
});

test('@COM7 处女的判定算术：20 + 15 - 5 - 20 = 10 < 22（罚则是决定性的）', async () => {
  const { fixture, com_family } = seed_family_world(7);
  fixture.store.set('talentname:0', '处女');
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('abl:31:10', 5); // 顺从 5 → +20
  fixture.store.set('abl:31:17', 5); // 露出 5 → +15
  const result = await com_family.call(7);
  assert.equal(result, 0, '无罚则时 35-5 = 30 > 22 会放行');
  const judge = fixture.text_lines().find((l) => l.includes('实行值22'));
  assert.ok(judge.endsWith(' = 10 < 实行值22'));
});

test('B 分支 9 的深入档门槛：EXP:1 < 50 时不接深入尾串', async () => {
  const { fixture, com_family } = seed_family_world(9);
  fixture.store.set('exp:31:1', 49);
  fixture.store.set('palam:31:5', 3000);
  fixture.store.set('abl:31:3', 3);
  await com_family.call(9);
  assert(fixture.text_lines().includes('你把温妮的肛门、认真细致地舔舐着了…'));
});

test('B 分支 4 的 rand 分岔：Math.random → 0.5 时 rand(3) = 1 走阴蒂支', async () => {
  const { fixture, com_family } = seed_family_world(4);
  fixture.store.set('talent:31:121', 1); // 扶她
  const original_random = Math.random;
  Math.random = () => 0.5;
  try {
    await com_family.call(4);
  } finally {
    Math.random = original_random;
  }
  assert(
    fixture
      .text_lines()
      .some((l) => l === '你吮吸着温妮的阴茎、将舌头伸进了温妮的阴道里…'),
  );
});

test('@COM8：CONFIRM 选 1 → RETURN 0 → 回合取消（cancelled，非 missing）', async () => {
  const { fixture, com_family } = seed_family_world(8);
  fixture.set_inputs(1); // 「让她继续做女孩」→ RETURN 0
  fixture.store.set('talent:31:0', 1);
  const result = await com_family.call(8);
  // @COM 层返回 0（#228 的回合取消语义：副作用保留不结算）；
  // COM_MISSING（missing 字段）是未移植指令的语义，两者分立
  assert.equal(result, 0);
  assert.equal(fixture.store.get('tflag:19'), undefined, '确认拒绝不置 V 旗标');
  assert(!fixture.text_lines().some((l) => l === '插入手指'), '指令行不输出');
});

test('@COM8：非处女 → 确认闸直通（无问句、不吃输入）', async () => {
  const { fixture, com_family } = seed_family_world(8);
  fixture.set_inputs(); // 不预置——不应等待任何输入
  fixture.store.set('abl:31:2', 2);
  const result = await com_family.call(8);
  assert.equal(result, 1);
  assert(!fixture.text_lines().some((l) => l === '夺取温妮的处女吗？'));
  assert.equal(fixture.inputs_consumed.length, 0);
});
