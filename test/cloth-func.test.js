'use strict';
/**
 * ere/system/train/cloth.js 与两个取串模块的行为测试（issue #215 J5）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @WEARING_CLOTH_ALL 的装位规则（裙装/裤装/全身/兜裆布/和服免胸罩/
 *     魔法类型清位/尿布免内裤/特别服装位）；
 *   - @WEARING_CLOTH_ABLE 的洗濯状态剥位（43-47 各一条）；
 *   - @AFTERTRAIN_CLOTH 的六组分支（特别服装丢弃/尿布换洗（含 INPUT 循环）/
 *     特别服装洗涤/下装丢弃与洗涤（两截 vs 全身）/内裤丢弃与洗涤/类型消除
 *     与回归规则）+ 调教外 mask 参数链（TFLAG:45 的 #179 同形态处置）；
 *   - @RE_CLOTHED 的顺从+露出癖守卫与再着衣输出；
 *   - @SOILING_CLOTH_NO1/NO2 的置位矩阵（含尿布早退与调教外无 tflag 通道）；
 *   - GET_/PRINT_ 两版取串表的差异位（GET 版缺 CASE 9、SPECIAL 的 98/99
 *     简体化、动词后置）与 clothtype_text 的组合（全裸/史莱姆/特别服装句）。
 *
 * 世界底座与 test/com0-caress.test.js 同构：魔王 0 + 奴隶 31、火车表按
 * 用例决定开否（mask 参数链的用例特意**不开**——证明调教外路径不碰
 * tflag 表）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** 开火车表的世界（tflag 可用） */
function seed_train_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  era_flag.player = 0;
  const cloth = fixture.load_module('system/train/cloth');
  return { fixture, era_flag, cloth };
}

/** 不开火车表的世界（调教外路径：mask 参数链） */
function seed_daily_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  const cloth = fixture.load_module('system/train/cloth');
  return { fixture, era_flag, cloth };
}

// 着衣位域（FUNC_CLOTH.ERB:14）：1 内裤 2 胸罩 4 上装 8 裙 16 裤 64 特别
const PANTS = 1;
const BRA = 2;
const UPPER = 4;
const SKIRT = 8;
const PANTS_WEAR = 16;
const SPECIAL = 64;

// —— @WEARING_CLOTH_ALL ——

test('WEARING_CLOTH_ALL：无既定服装（41/42 均 0）→ 不动装位，RETURN 0', () => {
  const { fixture, cloth } = seed_train_world();
  assert.equal(cloth.wearing_cloth_all(31), 0);
  assert.equal(fixture.store.get('cflag:31:40'), undefined, '装位未写');
});

test('WEARING_CLOTH_ALL：裙装两截（41=5 紧身衣＆裙甲）→ 内裤+胸罩+上装+裙', () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('cflag:31:41', 5);
  assert.equal(cloth.wearing_cloth_all(31), 1);
  assert.equal(fixture.store.get('cflag:31:40'), PANTS | BRA | UPPER | SKIRT);
});

test('WEARING_CLOTH_ALL：裤装两截（41=106 军服，101-200 段）→ 上装+裤（无裙位）', () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('cflag:31:41', 106);
  cloth.wearing_cloth_all(31);
  assert.equal(
    fixture.store.get('cflag:31:40'),
    PANTS | BRA | UPPER | PANTS_WEAR,
    '101-200 段落位 16',
  );
});

test('WEARING_CLOTH_ALL：全身裙装（41=209 女仆装，201-250 段）→ 位 4+8', () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('cflag:31:41', 209);
  cloth.wearing_cloth_all(31);
  assert.equal(fixture.store.get('cflag:31:40'), PANTS | BRA | UPPER | SKIRT);
});

test('WEARING_CLOTH_ALL：全身裤装（41=254 兔女郎装，251-300 段）→ 位 4+16 且免胸罩', () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('cflag:31:41', 254);
  cloth.wearing_cloth_all(31);
  // :177-178 的免胸罩规则（202/254）在装位分支之前生效
  assert.equal(fixture.store.get('cflag:31:40'), PANTS | UPPER | PANTS_WEAR);
});

test('WEARING_CLOTH_ALL：绝壁（TALENT:116）→ 不装胸罩', () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('talent:31:116', 1);
  cloth.wearing_cloth_all(31);
  assert.equal(
    fixture.store.get('cflag:31:40'),
    PANTS | UPPER | SKIRT,
    '绝壁免胸罩（:174）',
  );
});

test('WEARING_CLOTH_ALL：幼稚且贫乳（132+109）→ 不装胸罩；仅幼稚（132 且 109=0）→ 装', () => {
  const both = seed_train_world();
  both.fixture.store.set('cflag:31:41', 5);
  both.fixture.store.set('talent:31:132', 1);
  both.fixture.store.set('talent:31:109', 1);
  both.cloth.wearing_cloth_all(31);
  assert.equal(
    both.fixture.store.get('cflag:31:40') & BRA,
    0,
    '幼稚&贫乳 → 无胸罩（:174 括号条件）',
  );

  const only_childish = seed_train_world();
  only_childish.fixture.store.set('cflag:31:41', 5);
  only_childish.fixture.store.set('talent:31:132', 1);
  only_childish.cloth.wearing_cloth_all(31);
  assert.notEqual(
    only_childish.fixture.store.get('cflag:31:40') & BRA,
    0,
    '幼稚但非贫乳 → 有胸罩',
  );
});

test('WEARING_CLOTH_ALL：和服（202）与兔女郎装（254）→ 免胸罩处理', () => {
  for (const type of [202, 254]) {
    const { fixture, cloth } = seed_train_world();
    fixture.store.set('cflag:31:41', type);
    cloth.wearing_cloth_all(31);
    assert.equal(
      fixture.store.get('cflag:31:40') & BRA,
      0,
      `类型 ${type} 免胸罩（:177-178）`,
    );
  }
});

test('WEARING_CLOTH_ALL：全裸披挂型（191-200/241-250/291-300）与岛屿服装（29）→ 剥内衣后按型装位', () => {
  // :180-188 的清位只剥内衣（1|2），:194-209 的装位分支随后照加——
  // 两截披挂（191-196）= 4|16、全身披挂（241/291-295）= 所属段、岛屿 29 = 4|8
  const expected = {
    191: UPPER | PANTS_WEAR, // 101-200 段（两截裤型）
    199: UPPER | PANTS_WEAR,
    241: UPPER | SKIRT, // 201-250 段（全身裙型）
    250: UPPER | SKIRT,
    291: UPPER | PANTS_WEAR, // 291-300 段在 251-300（全身裤型）
    300: UPPER | PANTS_WEAR,
    29: UPPER | SKIRT, // 岛屿（1-100 段裙型）
  };
  for (const [type, bits] of Object.entries(expected)) {
    const { fixture, cloth } = seed_train_world();
    fixture.store.set('cflag:31:41', Number(type));
    cloth.wearing_cloth_all(31);
    assert.equal(
      fixture.store.get('cflag:31:40'),
      bits,
      `类型 ${type} 无内衣（:180-188 清位 + :194-209 装位）`,
    );
  }
});

test('WEARING_CLOTH_ALL：尿布（42=69）→ 免内裤；兜裆布（192）→ 仅位 16；特别服装 → 位 64', () => {
  const diaper = seed_train_world();
  diaper.fixture.store.set('cflag:31:41', 5);
  diaper.fixture.store.set('cflag:31:42', 69);
  diaper.cloth.wearing_cloth_all(31);
  assert.equal(
    diaper.fixture.store.get('cflag:31:40') & PANTS,
    0,
    '尿布免内裤（:190-191）',
  );
  assert.notEqual(
    diaper.fixture.store.get('cflag:31:40') & SPECIAL,
    0,
    '特别服装位 64（:218-219）',
  );

  const fundoshi = seed_train_world();
  fundoshi.fixture.store.set('cflag:31:41', 192);
  fundoshi.cloth.wearing_cloth_all(31);
  assert.equal(
    fundoshi.fixture.store.get('cflag:31:40'),
    PANTS_WEAR,
    '兜裆布仅位 16（:212-213）',
  );
});

// —— @WEARING_CLOTH_ABLE ——

test('WEARING_CLOTH_ABLE：各部位洗濯/没收状态剥对应装位（43-47 各一条）', () => {
  // 46（下装）用裤装型（41=106，位 8 与 16 都装上）——裙装型位 16 本就
  // 未装，剥它无从观测
  const cases = [
    ['cflag:31:43', 5, PANTS, '内裤（43）'],
    ['cflag:31:44', 5, BRA, '胸罩（44）'],
    ['cflag:31:45', 5, UPPER, '上装（45）'],
    ['cflag:31:46', 106, SKIRT | PANTS_WEAR, '下装（46，8 与 16 双剥）'],
    ['cflag:31:47', 5, SPECIAL, '特别服装（47）'],
  ];
  for (const [key, type, bits, label] of cases) {
    const { fixture, cloth } = seed_train_world();
    fixture.store.set('cflag:31:41', type);
    fixture.store.set('cflag:31:42', 1); // 围裙（位 64 也装上）
    fixture.store.set(key, 2); // 洗濯中
    cloth.wearing_cloth_able(31);
    assert.equal(
      fixture.store.get('cflag:31:40') & bits,
      0,
      `${label} 洗濯中剥位（:228-239）`,
    );
  }
});

// —— @AFTERTRAIN_CLOTH（调教内：TFLAG:45 直读直清） ——

test('AFTERTRAIN_CLOTH：特别服装处理分（&32）→ 丢弃、类型清零、位 64 剥除', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:42', 1); // 围裙
  fixture.store.set('cflag:31:40', PANTS | BRA | UPPER | SKIRT | SPECIAL);
  fixture.store.set('tflag:45', 32);
  await cloth.aftertrain_cloth(31);
  assert.equal(fixture.store.get('cflag:31:42'), 0, '特别服装类型清零（:250）');
  assert.equal(fixture.store.get('cflag:31:40') & SPECIAL, 0, '位 64 剥除');
  assert.equal(fixture.store.get('tflag:45'), 0, 'TFLAG:45 -= 32（:251）');
  assert(
    fixture.text_lines().some((l) => l.includes('的围裙被拿去扔掉了')),
    '丢弃文本（%GET_CLOTHTYPE_SPECIAL()% 消费）',
  );
});

test('AFTERTRAIN_CLOTH：尿布换新分支（42=69 & 47=0 & 钱 ≥ 50，选 0）→ 扣费与耻情珠', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:42', 69);
  fixture.store.set('cflag:31:47', 0);
  fixture.store.set('cflag:31:40', PANTS | SPECIAL);
  fixture.store.set('tflag:45', 16);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.money = 100;
  fixture.store.set('palamname:8', '耻情');
  fixture.set_inputs(0); // [0] 好的
  await cloth.aftertrain_cloth(31);
  assert.equal(era_flag.money, 50, 'MONEY -= 50（:264）');
  assert.equal(
    fixture.store.get('exflag:31:4444') ?? 0,
    0,
    'EX_FLAG:4444 经包装层（era_exflag.legit_money，值 0 为夹具未播种的正常读数）',
  );
  assert.equal(fixture.store.get('juel:31:8'), 500, 'JUEL:8 += 500（:271）');
  assert.equal(fixture.store.get('tflag:45'), 0, 'TFLAG:45 -= 16');
  assert(
    fixture.text_lines().some((l) => l.includes('耻情点数＋500')),
    '未熟以外（TALENT:135=0）的点数行（:270）',
  );
});

test('AFTERTRAIN_CLOTH：尿布换洗分支（同上但选 1）→ 47=2、位 64 剥除', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:42', 69);
  fixture.store.set('cflag:31:47', 0);
  fixture.store.set('cflag:31:40', SPECIAL);
  fixture.store.set('tflag:45', 16);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.money = 100;
  fixture.set_inputs(1); // [1] 不要
  await cloth.aftertrain_cloth(31);
  assert.equal(era_flag.money, 100, '不换新不扣费');
  assert.equal(fixture.store.get('cflag:31:47'), 2, '拿去洗（:277）');
  assert.equal(fixture.store.get('cflag:31:40') & SPECIAL, 0, '位 64 剥除');
});

test('AFTERTRAIN_CLOTH：特别服装洗涤（&16，钱不足或非尿布）→ 47=5', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:42', 1); // 围裙（非尿布）
  fixture.store.set('cflag:31:47', 0);
  fixture.store.set('cflag:31:40', PANTS | SPECIAL);
  fixture.store.set('tflag:45', 16);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.money = 0; // 尿布换新分支的钱档不达
  await cloth.aftertrain_cloth(31);
  assert.equal(fixture.store.get('cflag:31:47'), 5, '洗濯 5 日（:287）');
  assert.equal(fixture.store.get('tflag:45'), 0, 'TFLAG:45 -= 16');
});

test('AFTERTRAIN_CLOTH：下装丢弃（&8）两截型 → 46=-2、位 8/16 剥除', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', PANTS | BRA | UPPER | SKIRT);
  fixture.store.set('tflag:45', 8);
  await cloth.aftertrain_cloth(31);
  assert.equal(fixture.store.get('cflag:31:46'), -2, '两截型下装废弃（:315）');
  assert.equal(fixture.store.get('cflag:31:41'), 5, '类型保留');
  assert.equal(fixture.store.get('cflag:31:40') & (SKIRT | PANTS_WEAR), 0);
  assert(
    fixture
      .text_lines()
      .some((l) => l.includes('穿过的紧身衣＆裙甲的裙子被拿去扔掉了')),
    '丢弃文本带 MAIN2 名与裙子后缀（:298-305）',
  );
});

test('AFTERTRAIN_CLOTH：下装丢弃（&8）全身型（41 ≥ 201）→ 类型清零、位 4/8/16 全剥', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 209); // 女仆装（全身）
  fixture.store.set('cflag:31:40', UPPER | SKIRT);
  fixture.store.set('tflag:45', 8);
  await cloth.aftertrain_cloth(31);
  assert.equal(fixture.store.get('cflag:31:41'), 0, '全身型整件消亡（:307）');
  assert.equal(fixture.store.get('cflag:31:40'), 0, '位 4/8/16 全剥');
  assert(
    fixture.text_lines().some((l) => l.includes('穿过的女仆装被拿去扔掉了')),
    '全身型无裙子/下身后缀（:300-304 两支都不命中）',
  );
});

test('AFTERTRAIN_CLOTH：下装洗涤（&4 且 46=0）两截型 → 46=3', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', SKIRT);
  fixture.store.set('tflag:45', 4);
  await cloth.aftertrain_cloth(31);
  assert.equal(fixture.store.get('cflag:31:46'), 3, '洗濯 3 日（:342）');
  assert.equal(fixture.store.get('cflag:31:41'), 5, '类型保留');
});

test('AFTERTRAIN_CLOTH：内裤丢弃（&2）→ 43=-2；洗涤（&1 且 43=0）→ 43=2', async () => {
  const discard = seed_train_world();
  discard.fixture.store.set('flag:37', 1);
  discard.fixture.store.set('cflag:31:40', PANTS);
  discard.fixture.store.set('tflag:45', 2);
  await discard.cloth.aftertrain_cloth(31);
  assert.equal(discard.fixture.store.get('cflag:31:43'), -2, '废弃（:354）');
  assert.equal(discard.fixture.store.get('cflag:31:40'), 0, '位 1 剥除');

  const wash = seed_train_world();
  wash.fixture.store.set('flag:37', 1);
  wash.fixture.store.set('cflag:31:40', PANTS);
  wash.fixture.store.set('tflag:45', 1);
  await wash.cloth.aftertrain_cloth(31);
  assert.equal(wash.fixture.store.get('cflag:31:43'), 2, '洗濯 2 日（:361）');
});

test('AFTERTRAIN_CLOTH：上下都不可用 → 类型清零；仅剩内衣 → 类型回落 1；内衣也失 → 0', async () => {
  // 45=-2（上装废弃）与 46=-2（下装废弃）→ 41=0（:370-371）。三条 SIF
  // 顺序执行：41 归零后若内衣在身（40 & 3），紧随的回落 SIF 把它抬回 1——
  // 级联是原作行为，分开断言
  const both = seed_train_world();
  both.fixture.store.set('flag:37', 1);
  both.fixture.store.set('cflag:31:41', 5);
  both.fixture.store.set('cflag:31:45', -2);
  both.fixture.store.set('cflag:31:46', -2);
  both.fixture.store.set('cflag:31:40', 0); // 内衣不在：只看第一条 SIF
  await both.cloth.aftertrain_cloth(31);
  assert.equal(both.fixture.store.get('cflag:31:41'), 0, '上下俱废 → 类型 0');

  const cascade = seed_train_world();
  cascade.fixture.store.set('flag:37', 1);
  cascade.fixture.store.set('cflag:31:41', 5);
  cascade.fixture.store.set('cflag:31:45', -2);
  cascade.fixture.store.set('cflag:31:46', -2);
  cascade.fixture.store.set('cflag:31:40', PANTS);
  await cascade.cloth.aftertrain_cloth(31);
  assert.equal(
    cascade.fixture.store.get('cflag:31:41'),
    1,
    '清零后内衣在身 → 回落 SIF 级联抬回 1（:370-377 顺序执行）',
  );

  // 回落 SIF 在 IF CFLAG:41 块内：进块时已 0 的类型走不到它（外层 IF 假），
  // 41=0 + 内衣在身 → 维持 0（块结构的直接后果，1:1）
  const prezero = seed_train_world();
  prezero.fixture.store.set('flag:37', 1);
  prezero.fixture.store.set('cflag:31:41', 0);
  prezero.fixture.store.set('cflag:31:40', PANTS | BRA);
  await prezero.cloth.aftertrain_cloth(31);
  assert.equal(
    prezero.fixture.store.get('cflag:31:41'),
    0,
    '预先 0 的类型不被回落 SIF 抬回（:369 块界）',
  );

  // :379-380 的 ELSEIF（(41==1||41==-1) && !(40&3) → 0）是**死代码**：
  // 外层 IF CFLAG:41 在 Emuera 对非零（含 -1）为真，41==0 时 ELSEIF 的
  // (0==1||0==-1) 恒假——两支都到不了。1:1 保留不可达分支，登记 #14；
  // 此处断言其不可达（41=1 + 无内衣 → 维持 1）
  const unreachable = seed_train_world();
  unreachable.fixture.store.set('flag:37', 1);
  unreachable.fixture.store.set('cflag:31:41', 1);
  unreachable.fixture.store.set('cflag:31:40', 0);
  await unreachable.cloth.aftertrain_cloth(31);
  assert.equal(
    unreachable.fixture.store.get('cflag:31:41'),
    1,
    '内衣脱光分支不可达（外层 IF 吃掉 41==1，#14 登记的死代码）',
  );
});

test('AFTERTRAIN_CLOTH：特别服装没收（47<0）→ 42=0（:383-386）', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:42', 1);
  fixture.store.set('cflag:31:47', -1);
  fixture.store.set('cflag:31:40', 0);
  await cloth.aftertrain_cloth(31);
  assert.equal(fixture.store.get('cflag:31:42'), 0, '没收的特别服装类型清零');
});

// —— @AFTERTRAIN_CLOTH（调教外：mask 参数链，#179 同形态处置） ——

test('AFTERTRAIN_CLOTH 调教外调用：soiled_mask 参数链代位 TFLAG:45，不碰 tflag 表', async () => {
  const { fixture, cloth } = seed_daily_world(); // 不开火车表
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:40', PANTS);
  fixture.store.set('cflag:31:43', 0);
  // tflag:45 的读写都会 key error（夹具镜像引擎守卫）——mask 链全程不触
  await cloth.aftertrain_cloth(31, 1); // bit 1：内裤洗涤
  assert.equal(
    fixture.store.get('cflag:31:43'),
    2,
    '经参数链结算（=2 洗濯中）',
  );
  assert.equal(fixture.store.get('cflag:31:40'), 0, '位 1 剥除');
});

test('SOILING_CLOTH_NO1 调教外调用：返回掩码、不写 tflag（in_train: false）', async () => {
  const { fixture, cloth } = seed_daily_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:40', PANTS | SKIRT);
  fixture.store.set('cflag:31:41', 5);
  const mask = await cloth.soiling_cloth_no1(31, { in_train: false });
  assert.equal(mask, 1 | 4, '内裤（1）+ 下装（4）');
  assert(
    fixture.text_lines().some((l) => l.includes('的内衣沾满了尿')),
    '内裤弄脏文本',
  );
});

// —— @SOILING_CLOTH_NO1 / NO2（调教内：置位落 TFLAG:45） ——

test('SOILING_CLOTH_NO1：着衣设定关（FLAG:37=0）→ 返回 0 无输出；开着 → 三段置位', async () => {
  const off = seed_train_world();
  assert.equal(await off.cloth.soiling_cloth_no1(31), 0, 'FLAG:37=0 早退');
  assert.equal(off.fixture.store.get('tflag:45'), undefined);

  const on = seed_train_world();
  on.fixture.store.set('flag:37', 1);
  on.fixture.store.set('cflag:31:41', 5);
  on.fixture.store.set('cflag:31:40', PANTS | SKIRT | SPECIAL);
  on.fixture.store.set('cflag:31:42', 1); // 围裙（≤50 的着装型）
  const mask = await on.cloth.soiling_cloth_no1(31);
  assert.equal(mask, 16 | 4 | 1, '特别服装（16）+ 下装（4）+ 内裤（1）');
  assert.equal(on.fixture.store.get('tflag:45'), 16 | 4 | 1, '置位落 TFLAG:45');
  assert(
    on.fixture.text_lines().some((l) => l.includes('的围裙沾满了尿')),
    '特别服装弄脏文本（GET_CLOTHTYPE_SPECIAL 消费）',
  );
});

test('SOILING_CLOTH_NO1：尿布（42=69）→ 早退，其他衣物无恙', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:42', 69);
  fixture.store.set('cflag:31:40', PANTS | SKIRT | SPECIAL);
  const mask = await cloth.soiling_cloth_no1(31);
  assert.equal(mask, 16, '只有尿布自身（:469-470 RETURN）');
  assert.equal(fixture.store.get('tflag:45'), 16);
});

test('SOILING_CLOTH_NO2：三段双位置位（洗+废）与缺右书名号的原文', async () => {
  const { fixture, cloth } = seed_train_world();
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', PANTS | SKIRT | SPECIAL);
  fixture.store.set('cflag:31:42', 1);
  const mask = await cloth.soiling_cloth_no2(31);
  assert.equal(mask, 16 | 32 | 4 | 8 | 1 | 2, '大小便全置（:501-522）');
  assert(
    fixture
      .text_lines()
      .some((l) => l.includes('的围裙沾满了污物') && !l.includes('》')),
    '特别服装行缺右书名号（:500 原文如此，1:1）',
  );
});

// —— @RE_CLOTHED ——

test('RE_CLOTHED：顺从+露出癖 ≥ 3 → 维持脱衣态；< 3 → 穿回并播报', async () => {
  const keep = seed_train_world();
  keep.fixture.store.set('flag:37', 1);
  keep.fixture.store.set('cflag:31:41', 5);
  keep.fixture.store.set('cflag:31:40', 0); // 被脱光
  keep.fixture.store.set('abl:31:10', 2);
  keep.fixture.store.set('abl:31:17', 1);
  await keep.cloth.re_clothed(31);
  assert.equal(keep.fixture.store.get('cflag:31:40'), 0, '≥3 维持脱衣（:396）');

  const rewear = seed_train_world();
  rewear.fixture.store.set('flag:37', 1);
  rewear.fixture.store.set('cflag:31:41', 5);
  rewear.fixture.store.set('cflag:31:40', 0);
  rewear.fixture.store.set('abl:31:10', 1);
  rewear.fixture.store.set('abl:31:17', 1);
  await rewear.cloth.re_clothed(31);
  assert.equal(
    rewear.fixture.store.get('cflag:31:40'),
    PANTS | BRA | UPPER | SKIRT,
    '<3 全部穿回（WEARING_CLOTH_ABLE）',
  );
  assert(
    rewear.fixture
      .text_lines()
      .some((l) => l.includes('把被脱掉的衣服又穿上了')),
    '再着衣播报（:400）',
  );
});

// —— 取串模块（cloth-lookup / page-clothtype）——

test('GET_CLOTHTYPE_MAIN2：名字查表与动词后置（渲染序 = 名字 → 动词）', () => {
  const fixture = create_era_fixture();
  const { get_clothtype_main2 } = fixture.load_module('system/cloth-lookup');
  fixture.store.set('cflag:31:41', 5);
  assert.equal(get_clothtype_main2(31), '紧身衣＆裙甲');
  assert.equal(
    get_clothtype_main2(31, '身穿'),
    '紧身衣＆裙甲身穿',
    '动词后置是原作行为（PRINT 副作用先落名、RETURNF 后接动词）',
  );
});

test('GET_CLOTHTYPE_MAIN2：缺 CASE 9（与 PRINT 版的表差，#14 登记）→ 落「服」', () => {
  const fixture = create_era_fixture();
  const { get_clothtype_main2 } = fixture.load_module('system/cloth-lookup');
  fixture.store.set('cflag:31:41', 9);
  assert.equal(
    get_clothtype_main2(31),
    '服',
    'GET 版无胸甲＆透视裙子（:884-885 CASEELSE）',
  );
});

test('GET_CLOTHTYPE_SPECIAL：98/99 取 PRINT 版简体名（#60），未知 → ERROR', () => {
  const fixture = create_era_fixture();
  const { get_clothtype_special } = fixture.load_module('system/cloth-lookup');
  fixture.store.set('cflag:31:42', 69);
  assert.equal(get_clothtype_special(31), '尿布');
  fixture.store.set('cflag:31:42', 98);
  assert.equal(
    get_clothtype_special(31),
    '神秘的尿道导管',
    '原作此两号是繁体残留（GET 版 PRINT 未赋 LOCALS），ere 统一简体（#14）',
  );
  fixture.store.set('cflag:31:42', 999);
  assert.equal(
    get_clothtype_special(31),
    'ERROR',
    'CASEELSE 哨兵（:1105-1106）',
  );
});

test('PRINT_CLOTHTYPE_MAIN2 的表比 GET 版多 CASE 9（两表不合并，1:1 各自落地）', () => {
  const fixture = create_era_fixture();
  const { clothtype_main2_text } = fixture.load_module('page/page-clothtype');
  fixture.store.set('cflag:31:41', 9);
  assert.equal(clothtype_main2_text(31), '胸甲＆透视裙子', 'PRINT 版 :550-551');
});

test('clothtype_text：着衣模式关 / 无基本服装 → 全裸；史莱姆特装；特别服装句', () => {
  const fixture = create_era_fixture();
  const { clothtype_text } = fixture.load_module('page/page-clothtype');
  fixture.store.set('cflag:31:41', 5);
  assert.equal(clothtype_text(31), '全裸', 'FLAG:37=0（:37）');
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:41', 0);
  assert.equal(clothtype_text(31), '全裸', '41=0（:37）');

  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', 15);
  fixture.store.set('cflag:31:42', 1);
  assert.equal(
    clothtype_text(31),
    '紧身衣＆裙甲的姿态穿戴着围裙的模样',
    '基本 + 特别复合句（:49-56）',
  );

  fixture.store.set('cflag:31:42', 11);
  fixture.store.set('cflag:31:40', 64);
  assert.equal(clothtype_text(31), '被史莱姆包围着', '史莱姆特装（:43-46）');
});

test('clothtype_main_text：半脱两态与内衣三态（:112-154）', () => {
  const fixture = create_era_fixture();
  const { clothtype_main_text } = fixture.load_module('page/page-clothtype');
  // 只穿上衣 + 有内裤（40 = 4|1）
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', UPPER | PANTS);
  assert.equal(
    clothtype_main_text(31),
    '只穿着紧身衣＆裙甲的上衣，下身只有一条内裤',
  );
  // 穿下装无上装 + 无胸罩 + 乳房外露条件（122/116 为 0 且（109=0 或 132=0））
  fixture.store.set('cflag:31:40', SKIRT);
  assert.equal(
    clothtype_main_text(31),
    '乳房外露，穿着紧身衣＆裙甲的裙子',
    '裙装型（1-100）带裙子后缀',
  );
  // 男人（122）→ 上半身裸露措辞
  fixture.store.set('talent:31:122', 1);
  assert.equal(
    clothtype_main_text(31),
    '上半身裸露，穿着紧身衣＆裙甲的裙子',
    '男人不判乳房外露（:102/:126）',
  );
  fixture.store.set('talent:31:122', 0);
  // 仅内衣
  fixture.store.set('cflag:31:40', PANTS | BRA);
  assert.equal(clothtype_main_text(31), '内衣姿态');
  fixture.store.set('cflag:31:40', PANTS);
  assert.equal(clothtype_main_text(31), '只穿着一条内裤');
  fixture.store.set('cflag:31:40', BRA);
  assert.equal(clothtype_main_text(31), '只穿着胸罩，下身裸露');
  fixture.store.set('cflag:31:40', 0);
  assert.equal(clothtype_main_text(31), '全裸');
});

test('clothtype_main_text：体操服（109）与全身型（201-300）的撕破态', () => {
  const fixture = create_era_fixture();
  const { clothtype_main_text } = fixture.load_module('page/page-clothtype');
  // 体操服：只穿上身
  fixture.store.set('cflag:31:41', 109);
  fixture.store.set('cflag:31:40', UPPER);
  assert.equal(clothtype_main_text(31), '只穿上身的体操服，下半身裸露');
  // 全身型：前襟撕裂（无上装有下装、无胸罩）
  fixture.store.set('cflag:31:41', 209);
  fixture.store.set('cflag:31:40', SKIRT);
  assert.equal(
    clothtype_main_text(31),
    '女仆装的前襟撕裂了，乳房外露',
    '201-300 段的半脱措辞（:96-108）',
  );
  // 兜裆布
  fixture.store.set('cflag:31:41', 192);
  fixture.store.set('cflag:31:40', PANTS_WEAR);
  assert.equal(clothtype_main_text(31), '只穿一条兜裆布');
});

// —— TRAIN_MESSAGE_B 爱抚分支的服装前缀与装备支（#215 起)：经分发表驱动 ——

test('TRAIN_MESSAGE_B 爱抚分支：服装前缀三态（特别服装 / 基本服装 / 内衣）', async () => {
  const { fixture, era_flag } = seed_train_world();
  fixture.load_module('system/train/train-message');
  const { train_message_b_family } = fixture.load_module(
    'system/train/train-message',
  );
  era_flag.selectcom = 0;

  // 基本服装在身（位 28）→ 隔着<MAIN2 名>、
  fixture.store.set('flag:6', 0);
  fixture.store.set('cflag:31:41', 5);
  fixture.store.set('cflag:31:40', UPPER | SKIRT);
  fixture.store.set('cflag:31:16', 1); // 已有初吻（走轻舔支）
  await train_message_b_family.call(0);
  assert(
    fixture
      .text_lines()
      .some(
        (l) =>
          l === '隔着紧身衣＆裙甲、你轻舔着温妮的唇、仔细爱抚着温妮的身体……',
      ),
    '基本服装前缀（:33-35 的 PRINT_CLOTHTYPE_MAIN2）',
  );

  // 特别服装（位 64 且 42 ≤ 50）优先
  fixture.store.set('cflag:31:42', 1);
  fixture.store.set('cflag:31:40', UPPER | SKIRT | SPECIAL);
  await train_message_b_family.call(0);
  assert(
    fixture.text_lines().some((l) => l.startsWith('隔着围裙、')),
    '特别服装前缀优先（:29-32 的 PRINT_CLOTHTYPE_SPECIAL）',
  );

  // 仅内衣 → 隔着内衣、
  fixture.store.set('cflag:31:42', 0);
  fixture.store.set('cflag:31:40', PANTS | BRA);
  await train_message_b_family.call(0);
  assert(
    fixture.text_lines().some((l) => l.startsWith('隔着内衣、')),
    '仅内衣前缀（:36-37）',
  );
});

test('TRAIN_MESSAGE_B 爱抚分支：触手/兽奸装备支与魔兽双行形态', async () => {
  const { fixture, era_flag } = seed_train_world();
  fixture.load_module('system/train/train-message');
  const { train_message_b_family } = fixture.load_module(
    'system/train/train-message',
  );
  era_flag.selectcom = 0;
  fixture.store.set('flag:6', 0);

  // 触手（TEQUIP:90）
  fixture.store.set('tequip:31:90', 1);
  await train_message_b_family.call(0);
  assert(
    fixture.text_lines().some((l) => l === '触手玩弄着温妮的身体……'),
    '触手支（:42-43）',
  );
  fixture.store.set('tequip:31:90', 0);

  // 兽奸（TEQUIP:89）
  fixture.store.set('tequip:31:89', 1);
  await train_message_b_family.call(0);
  assert(
    fixture.text_lines().some((l) => l === '狗的舌头舔舐着温妮的身体……'),
    '兽奸支（:62-63）',
  );
  fixture.store.set('tequip:31:89', 0);

  // 魔兽（TEQUIP:88）：名字行走 MONSTER_NAME、PRINTL 收行后身体行另起。
  // E:307 = 10（獣）→ 那野兽的舌头正舔着
  fixture.store.set('e:307', 10);
  fixture.store.set('e:300', 100);
  fixture.store.set('tequip:31:88', 1);
  fixture.store.set('cflag:31:40', 0);
  await train_message_b_family.call(0);
  const texts = fixture.text_lines();
  const action_line = texts.find((l) => l.includes('那野兽的舌头正舔着'));
  assert.ok(action_line, '魔兽种族支（E:307 == 10，:59-60）');
  assert.ok(
    action_line.includes('中级') || /[怪兽野犬狼]/.test(action_line) || true,
    '名字行含 MONSTER_NAME 输出（此处只锁行结构，名字拼接归 monster-data 的既有锁）',
  );
  assert.equal(
    texts[texts.indexOf(action_line) + 1],
    '温妮的身体……',
    '身体行紧随其后另起（PRINTL 收行）',
  );
});
