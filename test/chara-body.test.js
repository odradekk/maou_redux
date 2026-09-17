/**
 * ere/chara/chara-body.js 的行为测试（issue #385：身体与年龄生成）。
 *
 * 源: target/ERB/キャラ関数/CHARA_BODY.ERB  @CHAR_BODY_GENERATE_WAPPED（:16-36）、
 *       @CHAR_AGE_GENERATE（:148-242）、@RACE_AGE_GENERATE（:245-337）、
 *       @HUMAN_AGE_GENERATE（:340-406）
 *     target/ERB/キャラ関数/CHARA_BODY2.ERB  @NORMAL_POINT_PICKUP（:306-323，
 *       CHAR_AGE_GENERATE 的取点步骤，随本票落地）
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点），经模块公开导出
 * 直驱。随机源一律显式注入确定序列（#344：漏给会落到真随机，用例只在部分
 * 抽样里真的守住行为）；种族年龄表按 #138 的数组承载预置。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** RAND:N 恒 0 的随机源 */
const always = () => 0;

/**
 * 依次吐出给定值的确定随机源（序列耗尽后回落 0）。
 * @param {number[]} values 返回值序列（直接作为 RAND:N 的返回值）
 * @returns {(n: number) => number}
 */
function seq(values) {
  const queue = [...values];
  return () => (queue.length > 0 ? queue.shift() : 0);
}

/**
 * 依次吐出给定值、并把每次收到的上界记进 bounds 的确定随机源。
 * 序列耗尽后返回「上界 - 1」——一次断言同时钉住随机上界与结果。
 * @param {number[]} values 返回值序列（直接作为 RAND:N 的返回值）
 * @param {number[]} bounds 收到的上界序列（按序记录）
 * @returns {(n: number) => number}
 */
function seq_probe(values, bounds) {
  const queue = [...values];
  return (n) => {
    bounds.push(n);
    return queue.length > 0 ? queue.shift() : n - 1;
  };
}

/** 默认种族年龄表（event-first.js:85-86 的开局初值，槽 0-7） */
const RACE_TABLE_0 = [11, 115, 431, 325, 15, 232];
const RACE_TABLE_1 = [1, 1];

function seed_race_table(
  fixture,
  table_0 = RACE_TABLE_0,
  table_1 = RACE_TABLE_1,
) {
  fixture.store.set('flag:26', [...table_0]); // FLAG:26 槽 0-5
  fixture.store.set('flag:27', [...table_1]); // FLAG:27 槽 6-7
}

// —— @RACE_AGE_GENERATE（:245-337）：种族年龄 = 人类年龄 × 种族档位 ——

test('RACE_AGE_GENERATE：默认表下 12 个种族编号 → 槽位与档位（rand 恒 0）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const { race_age_generate } = fixture.load_module('chara/chara-body');

  // [种族编号, 名称, 期望的种族年龄]；人类换算年龄固定 17
  const cases = [
    [1, '精灵', 170], // 槽 0 = 011：×10 + RAND:10
    [2, '人狼', 25], // 槽 1 = 115：17 × 15 / 10
    [3, '吸血鬼', 17], // 槽 2 = 431：年龄～上限 档（见下方专测）
    [4, '无头骑士', 250], // 槽 3 = 325：上限/2 ～ 上限
    [5, '龙族', 850], // 槽 4 = 015：×50 + RAND:50
    [6, '天使', 0], // 槽 5 = 232：0 ～ 上限（偏斜）
    [10, '霍比特人', 17], // 槽 6 = 001：与人类同龄（10-1=9 > 8 → -3 = 6）
    [11, '矮人', 17], // 槽 7 = 001（11-1=10 > 8 → -3 = 7）
    [0, '无种族', 17], // RACE_ID = -1 → :286-287 RACE_CLA = 1
    [12, '越界编号', 0], // RACE_ID = 8 → 槽 8 在原打包整数高位（恒 0）
  ];
  for (const [race_no, name, expected] of cases) {
    assert.equal(
      race_age_generate(17, race_no, always),
      expected,
      `${name}（TALENT:314 = ${race_no}）`,
    );
  }
});

test('RACE_AGE_GENERATE：堕落种族三编号（7/8/9）一律原样返回人类年龄', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const { race_age_generate } = fixture.load_module('chara/chara-body');
  // :267-276 的 IF 体内只有一条无条件的 RETURN ARG:0——两条 SIF 赋值
  // （RACE_ID = 0/5）是死代码，暗精灵/堕天使同样直接返回（见 race_id_of 头注）。
  // 用 42 而不是 17：精灵槽（×10）与天使槽（偏斜）在 17 上都可能碰巧给出
  // 别的档位，42 能同时把「误走精灵槽」「误走天使槽」两种情况分开。
  for (const race_no of [7, 8, 9]) {
    assert.equal(
      race_age_generate(42, race_no, always),
      42,
      `堕落种族 ${race_no} 不做换算`,
    );
  }
});

test('RACE_AGE_GENERATE：整数倍档的乘法因子与随机上界（RAND: NUM×10^DEG）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const { race_age_generate } = fixture.load_module('chara/chara-body');

  // 精灵槽 011：NUM=1、DEG=1 → 17 × 1 × 10 + RAND:10
  const bounds = [];
  assert.equal(race_age_generate(17, 1, seq_probe([], bounds)), 179);
  assert.deepEqual(bounds, [10], '精灵的随机上界 = NUM × 10^DEG = 10');

  // 龙族槽 015：NUM=5、DEG=1 → 17 × 5 × 10 + RAND:50
  const long_bounds = [];
  assert.equal(race_age_generate(17, 5, seq_probe([], long_bounds)), 899);
  assert.deepEqual(long_bounds, [50], '龙族的随机上界 = 50');
});

test('RACE_AGE_GENERATE：小数倍档按整数除法截断（人狼 115）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const { race_age_generate } = fixture.load_module('chara/chara-body');
  // :302-303 ARG:0 × (DEG × 10 + NUM) / 10 = 年龄 × 15 / 10
  assert.equal(race_age_generate(17, 2, always), 25);
  assert.equal(race_age_generate(19, 2, always), 28, '285 / 10 截断为 28');
  assert.equal(race_age_generate(20, 2, always), 30);
});

test('RACE_AGE_GENERATE：偏斜随机档（槽 232）的五个数量级分支', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const { race_age_generate } = fixture.load_module('chara/chara-body');

  // 槽 5 = 232：NUM=2、DEG=3 → 上限 2000（4 位数）
  // CAL_VAR:1 = 10^RAND:(4+1) × 10；CAL_VAR:0 = MIN(上限, CAL_VAR:1)
  const expected = [
    [0, 10], // 10^0 × 10 = 10 ≤ 2000
    [1, 100], // 10^1 × 10 = 100
    [2, 1000], // 10^2 × 10 = 1000
    [3, 2000], // 10^3 × 10 = 10000 > 上限 → 钳到 2000
    [4, 2000], // 10^4 × 10 = 100000 > 上限 → 钳到 2000
  ];
  for (const [roll, bound] of expected) {
    const bounds = [];
    const result = race_age_generate(17, 6, seq_probe([roll], bounds));
    assert.equal(result, bound - 1, `RAND:5 掷出 ${roll} 时上界应为 ${bound}`);
    assert.deepEqual(bounds, [5, bound], `掷 ${roll} 的两次上界`);
  }
});

test('RACE_AGE_GENERATE：上限/2 ～ 上限档（无头骑士 325）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const { race_age_generate } = fixture.load_module('chara/chara-body');
  // 槽 3 = 325：NUM=5、DEG=2 → 上限 500、半档 250 → RAND:250 + 250
  const bounds = [];
  assert.equal(race_age_generate(17, 4, seq_probe([], bounds)), 499);
  assert.deepEqual(bounds, [250]);
});

test('RACE_AGE_GENERATE：年龄～上限档（吸血鬼 431）的 BREAK 与连乘钳位', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const { race_age_generate } = fixture.load_module('chara/chara-body');

  // 槽 2 = 431：上限 1000（4 位数）→ FOR 至多 5 圈，RAND:5 < 2 即 BREAK
  const break_first = [];
  assert.equal(
    race_age_generate(17, 3, seq_probe([0], break_first)),
    17,
    '首圈即 BREAK：RACE_AGE = 10 → 抬到 17+1 → RAND:1 取 0',
  );
  assert.deepEqual(break_first, [5, 1]);

  // 五圈全不 BREAK：10 → 100 → 1000 → 10000 → 100000 → 1000000，钳到上限 1000
  const no_break = [];
  assert.equal(
    race_age_generate(17, 3, seq_probe([4, 4, 4, 4, 4], no_break)),
    999,
  );
  assert.deepEqual(
    no_break,
    [5, 5, 5, 5, 5, 983],
    '五圈不 BREAK 后按上限 1000 取 RAND:983',
  );

  // 两圈连乘后 BREAK：10 → 100（每圈 ×10，共两圈）——上界随连乘次数变，
  // 是「每圈乘 10」这条算式的唯一可观测面（单圈/五圈都会被上限钳掉）；
  // 掷值 2 专门站 BREAK 阈值 `< 2` 的两侧（2 不 < 2 → 继续，阈值改 3 即命中）
  const two_rounds = [];
  assert.equal(
    race_age_generate(17, 3, seq_probe([2, 0], two_rounds)),
    99,
    '两圈后 BREAK：age = 100 → RAND:83 + 17',
  );
  assert.deepEqual(two_rounds, [5, 5, 83]);

  // 上限低于人类年龄时先抬到「人类年龄 + 1」再取点（:330-333 两连 SIF）：
  // 槽 2 改 401（CLA=4、NUM=1、DEG=0 → 上限 1）→ 两圈连乘后钳到 1
  seed_race_table(fixture, [11, 115, 401, 325, 15, 232]);
  const clamped = [];
  assert.equal(race_age_generate(17, 3, seq_probe([4, 4], clamped)), 17);
  assert.deepEqual(clamped, [5, 5, 1], '上限 1 < 17 → 抬到 18 → RAND:1 取 0');
});

test('RACE_AGE_GENERATE：档位 5 及以上原作不设值 → 0', () => {
  const fixture = create_era_fixture();
  // 把槽 1 改成 515（CLA=5）：:299-335 五支全不命中，RACE_AGE 保持初值 0
  seed_race_table(fixture, [11, 515, 431, 325, 15, 232]);
  const { race_age_generate } = fixture.load_module('chara/chara-body');
  assert.equal(race_age_generate(17, 2, always), 0);
});

// —— @HUMAN_AGE_GENERATE（:340-406）：种族年龄 → 人类换算年龄 ——

function seed_race(fixture, cid, race_no) {
  fixture.store.set(`talent:${cid}:314`, race_no); // TALENT:314 种族
  return fixture.load_module('chara/chara-body').human_age_generate;
}

test('HUMAN_AGE_GENERATE：整数倍档按倍数割回（精灵 /10、龙族 /50）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const human = seed_race(fixture, 6, 1); // 精灵：槽 0 = 011 → 除以 10
  assert.equal(human(170, 6), 17);
  assert.equal(human(179, 6), 17, '179 / 10 截断为 17');
  assert.equal(human(180, 6), 18);

  const dragon = seed_race(fixture, 7, 5); // 龙族：槽 4 = 015 → 除以 50
  assert.equal(dragon(850, 7), 17);
  assert.equal(dragon(899, 7), 17, '899 / 50 截断为 17');
  assert.equal(dragon(900, 7), 18);
});

test('HUMAN_AGE_GENERATE：小数倍档用原作写死的四舍五入式（×10 + 5 后整除）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const human = seed_race(fixture, 8, 2); // 人狼：槽 1 = 115 → (x×10 + 5) / 15
  assert.equal(human(25, 8), 17, '(250 + 5) / 15 = 17');
  assert.equal(human(28, 8), 19, '285 / 15 = 19');
  assert.equal(human(12, 8), 8, '125 / 15 = 8.33 → 8');
  assert.equal(human(2, 8), 1, '25 / 15 = 1.67 → 1');
});

test('HUMAN_AGE_GENERATE：随机档（2 起）无唯一解 → 回落 CFLAG:452（原作如此）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const human = seed_race(fixture, 9, 3); // 吸血鬼：槽 2 = 431（档 4）
  fixture.store.set('cflag:9:452', 77); // CFLAG:452 种族年龄
  assert.equal(human(999, 9), 77);
  assert.equal(human(999, 9), 77, '不看入参，只看 CFLAG:452');

  const knight = seed_race(fixture, 10, 4); // 无头骑士：槽 3 = 325（档 3）
  fixture.store.set('cflag:10:452', 12);
  assert.equal(knight(500, 10), 12);

  const angel = seed_race(fixture, 11, 6); // 天使：RACE_ID = 5（槽 5 = 232，档 2）
  fixture.store.set('cflag:11:452', 5);
  assert.equal(angel(5, 11), 5);

  // 档位 5 起原作没有分支（:395-404 三支全不命中后 …… 只有 else 取 CFLAG:452）
  seed_race_table(fixture, [11, 515, 431, 325, 15, 232]);
  const custom = seed_race(fixture, 12, 2);
  fixture.store.set('cflag:12:452', 33);
  assert.equal(custom(66, 12), 33);
});

test('HUMAN_AGE_GENERATE：堕落种族三编号（7/8/9）原样返回；未设种族（0）走 1 倍档', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  // :364-373 同 race_age_generate：无条件的 RETURN ARG:0 盖住整个 IF 体
  for (const race_no of [7, 8, 9]) {
    const fallen = seed_race(fixture, 13, race_no);
    assert.equal(fallen(42, 13), 42, `堕落种族 ${race_no} 原样返回`);
  }

  // RACE_ID = -1 → :383-384 RACE_CLA = 1 → 解包后 DEG=0、NUM=1、档位 0：
  // 该档按倍数 1 割回，等价于原样（1 倍是「和人类一样」的默认档）
  const none = seed_race(fixture, 14, 0);
  assert.equal(none(17, 14), 17);
  assert.equal(none(0, 14), 0);
});

test('HUMAN_AGE_GENERATE：霍比特人（10）走第 6 槽（编号跳过 7-9）', () => {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  const hobbit = seed_race(fixture, 16, 10);
  assert.equal(hobbit(17, 16), 17, '霍比特人：RACE_ID = 9 - 3 = 6（槽 001）');

  const dwarf = seed_race(fixture, 17, 11);
  assert.equal(dwarf(17, 17), 17, '矮人：RACE_ID = 10 - 3 = 7（槽 001）');
});

// —— @CHAR_AGE_GENERATE（:148-242）：经历推算 → 取点 → 家族/后代约束 ——

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  fixture.era.addCharacter(cid);
}

/**
 * 建一个有默认种族表的夹具并取出 char_age_generate（每个用例一套，避免
 * TALENT:135 的写回污染后续用例）。
 */
function age_fixture() {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  return { fixture, char_age_generate: load_age(fixture) };
}

function load_age(fixture) {
  return fixture.load_module('chara/chara-body').char_age_generate;
}

test('CHAR_AGE_GENERATE：素质与经历逐个分支的推算（取点固定在中值）', () => {
  // [素质, 经历, 期望年龄, 说明]；取点用 RAND:17 掷 7（+0）固定住中值
  const cases = [
    [{}, 18, '无修正时处女 +1（!TALENT:0 && !TALENT:1）'],
    [{ talent: { 0: 1 } }, 17, '已非处女：处女修正不命中'],
    [{ talent: { 1: 1 } }, 17, '童贞标记：处女修正不命中'],
    [{ talent: { 99: 1 } }, 19, '魁梧 +1'],
    [{ talent: { 100: 1 } }, 14, '娇小 -4（原作 :55-60 两条 SIF 均命中）'],
    [{ talent: { 109: 1 } }, 17, '贫乳 -1'],
    [{ talent: { 110: 1 } }, 19, '巨乳 +1'],
    [{ talent: { 114: 1 } }, 19, '爆乳 +1'],
    [{ talent: { 119: 1 } }, 19, '超乳 +1'],
    [{ talent: { 116: 1 } }, 17, '绝壁 -1'],
    [{ talent: { 132: 1 } }, 16, '幼稚 -2'],
    [{ talent: { 140: 1 } }, 16, '恋母情结 -2'],
    [{ talent: { 141: 1 } }, 16, '恋父情结 -2'],
    [{ talent: { 142: 1 } }, 20, '萝莉控 +2'],
    [{ talent: { 143: 1 } }, 20, '正太控 +2'],
    [{ talent: { 157: 1 } }, 24, '人妻 +6'],
    [{ talent: { 248: 1 } }, 19, '肌肉型 +1'],
    [{ talent: { 315: 1 } }, 14, '经历（学生）-4'],
    [{ talent: { 315: 6 } }, 14, '经历（小偷）-4'],
    [{ talent: { 315: 7 } }, 14, '经历（乞丐）-4'],
    [{ talent: { 315: 20 } }, 14, '经历（奴隶）-4'],
    [{ talent: { 315: 11 } }, 17, '经历（巫女）-1'],
    [{ talent: { 315: 12 } }, 17, '经历（圣女）-1'],
    [{ talent: { 315: 2 } }, 22, '经历（妓女）+4'],
    [{ talent: { 315: 19 } }, 22, '经历（军人）+4'],
    [{ talent: { 315: 21 } }, 24, '经历（主妇）+6'],
    [{ talent: { 315: 3 } }, 18, '其余经历不修正'],
    [{ talent: { 316: 6 } }, 20, '无尽悲伤 +2'],
    [{ talent: { 316: 5 } }, 18, '其余契机不修正'],
    [{ talent: { 317: 4 } }, 20, '故乡恋人 +2'],
    [{ talent: { 317: 11 } }, 20, '憧憬的那个人 +2'],
    [{ talent: { 317: 3 } }, 18, '其余喜好不修正'],
    [{ exp: { 60: 1 } }, 23, '生育经验 +6（有经历则处女修正不命中）'],
    [{ exp: { 5: 1 } }, 21, '性交经验 +4'],
    [{ exp: { 10: 1 } }, 19, '自慰经验 +2'],
    [{ exp: { 60: 1, 5: 1, 10: 1 } }, 23, '三档优先序：生育经验最高'],
    [
      { talent: { 142: 1, 143: 1 } },
      20,
      '萝莉控/正太控同设仍只 +2（一条 SIF 的 OR）',
    ],
  ];
  for (const [setup, expected, label] of cases) {
    const { fixture, char_age_generate } = age_fixture();
    for (const [id, value] of Object.entries(setup.talent ?? {})) {
      fixture.store.set(`talent:21:${id}`, value); // TALENT
    }
    for (const [id, value] of Object.entries(setup.exp ?? {})) {
      fixture.store.set(`exp:21:${id}`, value); // EXP
    }
    assert.equal(
      char_age_generate(21, seq([7]))[0],
      expected,
      `${label}（${JSON.stringify(setup)}）`,
    );
  }
});

test('CHAR_AGE_GENERATE：经历推算值经 LIMIT(12,35) 钳制', () => {
  const low = age_fixture();
  // 娇小 -4、幼稚 -2、未熟 -2、恋母 -2、贫乳 -1、绝壁 -1 = -12 → 17 - 12 + 1 = 6
  for (const id of [100, 132, 135, 140, 109, 116]) {
    low.fixture.store.set(`talent:21:${id}`, 1);
  }
  assert.equal(
    low.char_age_generate(21, seq([7]))[0],
    12,
    '下界 12：推算 6 被抬到 12',
  );

  const high = age_fixture();
  // 人妻 +6、巨乳/爆乳/超乳/魁梧/肌肉型 各 +1、生育经验 +6、经历（主妇）+6、
  // 无尽悲伤 +2、故乡恋人 +2 = +26（处女修正被生育经验挡掉）→ 17 + 26 = 43
  for (const id of [157, 110, 114, 119, 99, 248, 316, 317]) {
    high.fixture.store.set(`talent:21:${id}`, 1);
  }
  high.fixture.store.set('talent:21:316', 6);
  high.fixture.store.set('talent:21:317', 4);
  high.fixture.store.set('talent:21:315', 21);
  high.fixture.store.set('exp:21:60', 1);
  assert.equal(
    high.char_age_generate(21, seq([7]))[0],
    35,
    '上界 35：推算 43 被压到 35',
  );
});

test('CHAR_AGE_GENERATE：取点表 RAND:17 的 17 个落点（权重 1,3,9,3,1）', () => {
  // [RAND:17 的掷值, 相对中值的偏移, 命中档]
  const cases = [
    [0, -2, 'CASE 1'],
    [1, -1, 'CASE 2 TO 4'],
    [2, -1, 'CASE 2 TO 4'],
    [3, -1, 'CASE 2 TO 4'],
    [4, 0, 'CASE 5 TO 13'],
    [8, 0, 'CASE 5 TO 13'],
    [12, 0, 'CASE 5 TO 13'],
    [13, 1, 'CASE 14 TO 16'],
    [14, 1, 'CASE 14 TO 16'],
    [15, 1, 'CASE 14 TO 16'],
    [16, 2, 'CASE 17'],
  ];
  for (const [roll, delta, label] of cases) {
    const { fixture, char_age_generate } = age_fixture();
    fixture.store.set('talent:21:0', 1); // 关掉处女修正：中值 17
    const bounds = [];
    assert.equal(
      char_age_generate(21, seq_probe([roll], bounds))[0],
      17 + delta,
      `RAND:17 掷 ${roll}：${label}`,
    );
    assert.equal(bounds[0], 17, '取点上界恒为 17（RAND:17 + 1）');
  }
});

test('CHAR_AGE_GENERATE：家族年龄约束按成员角色号 1-8 分档（原作判据如此）', () => {
  // 原作 :216-223 比较的是 L_B（成员角色号），不是关系码——表里每条都用
  // 同一种关系码（兄），只有角色号能解释结果差异。
  const cases = [
    [1, 9, 9, '角色 1（兄档）：MIN 到成员年龄 9'],
    [2, 9, 9, '角色 2（姊档）：MIN 到成员年龄 9'],
    [3, 25, 25, '角色 3（弟档）：MAX 到成员年龄 25'],
    [4, 25, 25, '角色 4（妹档）：MAX 到成员年龄 25'],
    [5, 8, 10, '角色 5（父档）：MIN(18, 8-6) 后抬到下限 10'],
    [6, 8, 10, '角色 6（母档）：同上'],
    [5, 20, 14, '角色 5（父档）：MIN(18, 20-6) = 14（年龄差 6 的判据）'],
    [6, 20, 14, '角色 6（母档）：同上'],
    [5, 40, 18, '角色 5（父档）：成员年龄 40 → MIN(18, 34) 不变'],
    [7, 20, 26, '角色 7（儿档）：MAX 到成员年龄 + 6'],
    [8, 20, 26, '角色 8（娘档）：MAX 到成员年龄 + 6'],
    [9, 40, 18, '角色 9 不在 1-8 内：任何约束都不命中'],
  ];
  for (const [member, member_age, expected, label] of cases) {
    const { fixture, char_age_generate } = age_fixture();
    fixture.store.set('talent:21:0', 1); // 关掉处女修正：中值 17
    fixture.store.set('talent:21:99', 1); // 魁梧 +1 → 18
    add_chara(fixture, 21, '对象');
    add_chara(fixture, member, `成员${member}`);
    fixture.store.set(`cflag:${member}:451`, member_age); // 成员的年龄
    const family = fixture.load_module('chara/chara-family');
    family.rf_set_both(21, member, 1); // 关系码恒为 1（兄），差异只看角色号
    assert.equal(
      char_age_generate(21, seq([7]))[0],
      expected,
      `成员 ${member}（年龄 ${member_age}）：${label}`,
    );
  }
});

test('CHAR_AGE_GENERATE：EX_TALENT:2（后代）固定 10 岁并覆盖家族约束', () => {
  const { fixture, char_age_generate } = age_fixture();
  fixture.store.set('talent:21:157', 1); // 人妻 +6 → 否则 24
  fixture.store.set('ex_talent:21:2', 1); // EX_TALENT:2 = 后代标记
  add_chara(fixture, 21, '对象');
  add_chara(fixture, 3, '弟');
  fixture.store.set('cflag:3:451', 30); // 弟档会把年龄抬到 30
  fixture.load_module('chara/chara-family').rf_set_both(21, 3, 1);
  assert.equal(char_age_generate(21, seq([7]))[0], 10);
});

test('CHAR_AGE_GENERATE：人类年龄 ≤ 14 补盖未熟（TALENT:135），15 岁不盖', () => {
  const young = age_fixture();
  young.fixture.store.set('talent:21:0', 1); // 处女修正关：中值 17
  young.fixture.store.set('talent:21:109', 1); // 贫乳 -1 → 16
  assert.equal(young.char_age_generate(21, seq([0]))[0], 14, '取点 -2 → 14');
  assert.equal(
    young.fixture.store.get('talent:21:135'),
    1,
    '14 岁（边界值）必须盖未熟',
  );

  const older = age_fixture();
  older.fixture.store.set('talent:21:0', 1);
  assert.equal(older.char_age_generate(21, seq([0]))[0], 15);
  assert.equal(
    older.fixture.store.get('talent:21:135'),
    undefined,
    '15 岁不盖未熟',
  );
});

test('CHAR_AGE_GENERATE：种族年龄随人类年龄一并返回（人狼 115）', () => {
  const { fixture, char_age_generate } = age_fixture();
  fixture.store.set('talent:21:0', 1); // 中值 17
  fixture.store.set('talent:21:314', 2); // 人狼：年龄 × 15 / 10
  assert.deepEqual(
    char_age_generate(21, seq([7])),
    [17, 25],
    '人类年龄 17 → 种族年龄 25',
  );
});

test('CHAR_AGE_GENERATE：未设种族时种族年龄等于人类年龄（1 倍档）', () => {
  const { char_age_generate } = age_fixture();
  assert.deepEqual(char_age_generate(21, seq([7])), [18, 18]);
});

// —— @CHAR_BODY_GENERATE_WAPPED（:16-36）：身体数据生成与 CFLAG 落盘 ——

/** 取身体生成导出（每个用例一套夹具，随机源显式注入） */
function body_fixture(flag5) {
  const fixture = create_era_fixture();
  seed_race_table(fixture);
  fixture.store.set('flag:5', flag5); // FLAG:5 开局设置位图
  return { fixture, char_body_generate_wapped: load_body(fixture) };
}

function load_body(fixture) {
  return fixture.load_module('chara/chara-body').char_body_generate_wapped;
}

/** CFLAG:451-457 的当前值（未写过的返回 undefined） */
function body_cflags(fixture, cid) {
  return Array.from({ length: 7 }, (_, k) =>
    fixture.store.get(`cflag:${cid}:${451 + k}`),
  );
}

test('CHAR_BODY_GENERATE_WAPPED：FLAG:5 位 12/15 是闸门（两侧都覆盖）', () => {
  // [FLAG:5, 是否生成]
  const cases = [
    [0, false, '两位都关：整体不动'],
    [1 << 12, true, '只开位 12（年龄显示）'],
    [1 << 15, true, '只开位 15（三围显示）'],
    [(1 << 12) | (1 << 15), true, '两位都开'],
    [(1 << 13) | (1 << 14), false, '开的是别的位：仍不动'],
  ];
  for (const [flag5, generates, label] of cases) {
    const { fixture, char_body_generate_wapped } = body_fixture(flag5);
    char_body_generate_wapped(21, always);
    const written = fixture.var_writes.some((w) =>
      w.name.startsWith('cflag:21:45'),
    );
    assert.equal(
      written,
      generates,
      `${label}（FLAG:5 = ${flag5}）：${
        generates ? '应生成并落盘' : '不应有任何 CFLAG:45x 写入'
      }`,
    );
  }
});

test('CHAR_BODY_GENERATE_WAPPED：村娘 A（165）固定 12-13 岁、村娘 B（171）17-18 岁', () => {
  const cases = [
    [165, [0, 1], [12, 13], '村娘Ａ：RAND:2 + 12'],
    [171, [0, 1], [17, 18], '村娘Ｂ：RAND:2 + 17'],
  ];
  for (const [talent, rolls, ages, label] of cases) {
    for (const [index, roll] of rolls.entries()) {
      const { fixture, char_body_generate_wapped } = body_fixture(1 << 12);
      fixture.store.set(`talent:21:${talent}`, 1);
      const bounds = [];
      char_body_generate_wapped(21, seq_probe([roll], bounds));
      assert.equal(bounds[0], 2, `${label}：年龄掷骰上界为 2`);
      assert.equal(
        fixture.store.get('cflag:21:451'),
        ages[index],
        `${label}（RAND:2 = ${roll}）`,
      );
    }
  }
});

test('CHAR_BODY_GENERATE_WAPPED：两个村娘标记同设时 A 分支优先', () => {
  const { fixture, char_body_generate_wapped } = body_fixture(1 << 12);
  fixture.store.set('talent:21:165', 1);
  fixture.store.set('talent:21:171', 1);
  char_body_generate_wapped(21, seq([0]));
  assert.equal(
    fixture.store.get('cflag:21:451'),
    12,
    'IF/ELSEIF 顺序决定 A 胜',
  );
});

test('CHAR_BODY_GENERATE_WAPPED：CFLAG:451-457 依序接住身体数据七元组', () => {
  const { fixture, char_body_generate_wapped } = body_fixture(1 << 12);
  char_body_generate_wapped(21, always);

  // 对照组：同一种子下直接调 char_size_generate（三围算法本身的覆盖在
  // test/chara-stubs.test.js），此处只核对接线（七个值按序落对下标）
  const control = create_era_fixture();
  seed_race_table(control);
  control.store.set('talent:21:314', 0);
  const expected = control
    .load_module('chara/chara-body')
    .char_size_generate(21, 0, 0, always);
  assert.deepEqual(body_cflags(fixture, 21), expected);
  assert.equal(expected.length, 7);
  // 除七元组外只有胸围分量（CFLAG:458/459）随 CHAR_SIZE_GENERATE 落盘
  assert.equal(
    fixture.store.get('cflag:21:458'),
    control.store.get('cflag:21:458'),
  );
  assert.equal(
    fixture.store.get('cflag:21:459'),
    control.store.get('cflag:21:459'),
  );
});

test('CHAR_BODY_GENERATE_WAPPED：默认支走年龄生成（CFLAG:451 = 生成年龄）', () => {
  const { fixture, char_body_generate_wapped } = body_fixture(1 << 12);
  // 取点 RAND:17 掷 7（+0）→ 中值；未设种族 → 种族年龄 = 人类年龄
  char_body_generate_wapped(21, seq([7]));
  assert.equal(
    fixture.store.get('cflag:21:451'),
    18,
    '默认支的年龄来自 CHAR_AGE_GENERATE（无素质 + 处女 +1）',
  );
  assert.equal(fixture.store.get('cflag:21:452'), 18, 'CFLAG:452 种族年龄');
});

// —— @CUP_SIZE（CHARA_BODY.ERB:781-850，#390 随角色信息显示落地） ——

/** 罩杯字母表（CAL_VAR 2..29 共 28 档，源 :791-848） */
const CUP_LETTERS = [
  'AAA',
  'AA',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

/** 身高 1600（160.0cm）、无素质时 UNDER_BUST = INT(1600 * 43100 / 100000) = 689 */
const HEIGHT10 = 1600;
const UNDER = 689;

function cup_fixture() {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:5:453', HEIGHT10); // CFLAG:453 身高(×10)
  return {
    fixture,
    cup_size: fixture.load_module('chara/chara-body').cup_size,
  };
}

test('CUP_SIZE：CAL_VAR 2..29 的 28 档字母表（表驱动全维度）', () => {
  assert.equal(CUP_LETTERS.length, 28);
  for (const [index, letter] of CUP_LETTERS.entries()) {
    const { fixture, cup_size } = cup_fixture();
    const cal_var = index + 2;
    // CAL_VAR = INT((CFLAG:455 − UNDER_BUST) / 25)；取该档的下沿
    fixture.store.set('cflag:5:455', UNDER + 25 * cal_var);
    assert.equal(cup_size(5), letter, `CAL_VAR=${cal_var} → ${letter}`);
    // 同档上沿（差 24 仍在同一档）
    fixture.store.set('cflag:5:455', UNDER + 25 * cal_var + 24);
    assert.equal(cup_size(5), letter, `CAL_VAR=${cal_var} 上沿 → ${letter}`);
  }
});

test('CUP_SIZE：CAL_VAR ≤ 1 一律「-」（差 49 与负差都在此档）', () => {
  const cases = [
    [UNDER - 25, '负差 −25 → CAL_VAR −1'],
    [UNDER - 100, '负差 −100'],
    [UNDER, '差 0'],
    [UNDER + 24, '差 24 → CAL_VAR 0'],
    [UNDER + 49, '差 49 → CAL_VAR 1（上沿）'],
  ];
  for (const [bust, label] of cases) {
    const { fixture, cup_size } = cup_fixture();
    fixture.store.set('cflag:5:455', bust);
    assert.equal(cup_size(5), '-', label);
  }
});

test('CUP_SIZE：CAL_VAR ≥ 30 落在字母表之外（原作此处不写 RESULTS:0）', () => {
  const { fixture, cup_size } = cup_fixture();
  fixture.store.set('cflag:5:455', UNDER + 25 * 30); // CAL_VAR = 30
  assert.equal(cup_size(5), '', '越出 28 档 → 空串（有意偏离，见实现注释）');
});

test('CUP_SIZE：肌肉型(248) ×105/100、虚弱(256) ×98/100 先改下胸围', () => {
  // INT(689 * 105 / 100) = 723；差 100 → CAL_VAR 4 → 'A'
  const muscle = cup_fixture();
  muscle.fixture.store.set('talent:5:248', 1);
  muscle.fixture.store.set('cflag:5:455', 723 + 100);
  assert.equal(muscle.cup_size(5), 'A', '肌肉型下胸围 723');

  // INT(689 * 98 / 100) = 675；差 100 → CAL_VAR 4 → 'A'
  const weak = cup_fixture();
  weak.fixture.store.set('talent:5:256', 1);
  weak.fixture.store.set('cflag:5:455', 675 + 100);
  assert.equal(weak.cup_size(5), 'A', '虚弱下胸围 675');

  // 同一胸围下两者给出不同档：肌肉型 789 → 差 66 → CAL_VAR 2 → 'AAA'
  const same = cup_fixture();
  same.fixture.store.set('talent:5:248', 1);
  same.fixture.store.set('cflag:5:455', 789);
  assert.equal(same.cup_size(5), 'AAA');
});

test('CUP_SIZE：TALENT:308（下胸围修正）进 UNDER_BUST 的百分比', () => {
  // INT(1600 * (43100 + 1000) / 100000) = 705；差 100 → CAL_VAR 4 → 'A'
  const { fixture, cup_size } = cup_fixture();
  fixture.store.set('talent:5:308', 1000);
  fixture.store.set('cflag:5:455', 705 + 100);
  assert.equal(cup_size(5), 'A');
});
