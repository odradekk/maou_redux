/**
 * ere/system/train/com0-caress.js 的行为测试（issue #45：第一条真实指令）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @COM_ABLE0 的三条判据（爱抚系过滤 / 决斗中 / 默认放行）；
 *   - SOURCE 分档的**每一档**（ABL:0 六档 × ABL:1 六档——分档表是纯数据，
 *     错一格不会报错，验收项点名逐档有用例）；
 *   - 接吻侧分支（初吻回避 / 不怕污臭 / 反感污臭 / 高姿态 / 爱慕 / 主人口污
 *     / 口污双向移动）；
 *   - V⇔指、B⇔指的污垢移动；
 *   - 百合/断背/爱情经验与 LOSEBASE（deltabase 负向累加）。
 *
 * 世界底座与 test/train-loop.test.js 的 seed_world 同构：魔王 0 + 奴隶 31、
 * 火车表已开，直接经 COM 族调用（同时验注册接线）。
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
  fixture.load_module('system/train/com0-caress');
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
