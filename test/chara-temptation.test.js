/**
 * @file ere/chara/chara-temptation.js 的行为测试（issue #393，N9）。
 *
 * 源: target/ERB/キャラ関数/CHARA_TEMPTATION.ERB 六个函数——
 *     @SHOW_BUTTON_TEMPTATION（:4-20）、@CHECK_ABLE_TO_TEMPTATION
 *     （:23-36，#FUNCTION 式中函数）、@TEMPTATION（:39-86）、
 *     @TEMPTATION_TRY（:202-364）、@FI_TEMPTATION（:373-397，#FUNCTION）、
 *     @PREPARE_TEMPTATION（:404-447，#DIM REF 双输出）。
 *     同名的另一个 @TEMPTATION_TRY（:90-197）整段包在 [SKIPSTART]/[SKIPEND]
 *     里，Emuera 不装载（技能手册 references/core-concepts/preprocessor.md:61-69），
 *     不是重定义——模块文件头有完整说明。
 *
 * 缝 = test/helpers/era-fixture.js。带随机源形参的函数一律喂确定性序列
 * （`seq`），断言同时看「掷出的值」与「掷骰的上界」（`seq_probe` 记上界）。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

function load(fixture) {
  return fixture.load_module('chara/chara-temptation');
}

function texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

function buttons(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

/**
 * 依次吐出给定值的确定随机源（序列耗尽后回落 0）。
 * @param {number[]} values 返回值序列
 * @returns {(n: number) => number}
 */
function seq(values) {
  const queue = [...values];
  return () => (queue.length > 0 ? queue.shift() : 0);
}

/**
 * 依次吐出给定值、并把每次收到的上界记进 bounds 的确定随机源。
 * @param {number[]} values 返回值序列
 * @param {number[]} bounds 收到的上界序列
 * @returns {(n: number) => number}
 */
function seq_probe(values, bounds) {
  const queue = [...values];
  return (n) => {
    bounds.push(n);
    return queue.length > 0 ? queue.shift() : n - 1;
  };
}

/**
 * 判定用勇者底稿：状态 2（侵攻中）、魔王气力充足、勇者体力气力满。
 * 勇者满血满气让 `prepare_temptation` 的两条倍率都是 1——成功签 99、
 * 失败签 50、主抽签上界 149，桩序列好算（测试里显式写这三档）。
 */
function seed_hero(fixture, cid = 1) {
  add_chara(fixture, 0, '你');
  add_chara(fixture, cid, '勇者');
  fixture.store.set(`cflag:${cid}:1`, 2);
  fixture.store.set('maxbase:0:1', 10000);
  fixture.store.set('base:0:1', 10000);
  fixture.store.set(`maxbase:${cid}:0`, 100);
  fixture.store.set(`base:${cid}:0`, 100);
  fixture.store.set(`maxbase:${cid}:1`, 100);
  fixture.store.set(`base:${cid}:1`, 100);
  return cid;
}

// —— @CHECK_ABLE_TO_TEMPTATION（:23-36，式中函数）——

test('CHECK_ABLE_TO_TEMPTATION：三档——非侵攻中一律不可，狂王那档单独区分', () => {
  // [标签, 状态, CFLAG:800, 期望]
  const table = [
    ['待机（状态 0）', 0, 0, 1],
    ['苗床（状态 7）', 7, 0, 1],
    ['迎击中（状态 3）', 3, 0, 1],
    ['侵攻中且非狂王', 2, 0, 0],
    ['侵攻中且是狂王（800 == 4）', 2, 4, 2],
    ['侵攻中且 800 是别的值', 2, 3, 0],
  ];
  for (const [label, state, king, expected] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('cflag:1:1', state);
    fixture.store.set('cflag:1:800', king);
    assert.equal(load(fixture).check_able_to_temptation(1), expected, label);
  }
});

// —— @SHOW_BUTTON_TEMPTATION（:4-20）——

test('SHOW_BUTTON_TEMPTATION：只有可诱惑（0）才渲染按钮', () => {
  // [标签, 状态, CFLAG:800, 期望渲染]
  const table = [
    ['侵攻中非狂王：可诱惑', 2, 0, true],
    ['待机：不可诱惑', 0, 0, false],
    ['狂王：不可诱惑', 2, 4, false],
  ];
  for (const [label, state, king, visible] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('cflag:1:1', state);
    fixture.store.set('cflag:1:800', king);

    load(fixture).show_button_temptation(3, 1);

    assert.equal(buttons(fixture).length > 0, visible, label);
    if (visible) {
      assert.equal(buttons(fixture)[0].rendered, '[3] 魔的诱惑 ', label);
    }
  }
});

// —— @TEMPTATION（:39-86）——

test('TEMPTATION：入口两档——非侵攻中返回 2，狂王返回 0，都不扣气力', async () => {
  const table = [
    ['待机（不可诱惑）', 0, 0, 2],
    ['侵攻中的狂王', 2, 4, 0],
  ];
  for (const [label, state, king, expected] of table) {
    const fixture = create_era_fixture();
    seed_hero(fixture);
    fixture.store.set('cflag:1:1', state);
    fixture.store.set('cflag:1:800', king);

    assert.equal(await load(fixture).temptation(1, seq([])), expected, label);
    assert.equal(fixture.store.get('base:0:1'), 10000, `${label}：未动气力`);
  }
});

test('TEMPTATION：气力不足 2000 播报魔力耗尽、不扣不减、不跑判定', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  fixture.store.set('base:0:1', 1999);
  fixture.store.set('cflag:1:2', 0);

  assert.equal(await load(fixture).temptation(1, seq([])), 0);

  assert.ok(texts(fixture).includes('*你的魔力耗尽了*'));
  assert.equal(fixture.store.get('base:0:1'), 1999, '不扣气力');
  assert.equal(
    fixture.store.get('cflag:1:2') || 0,
    0,
    '判定没跑（好感度未动）',
  );
});

test('TEMPTATION：扣 2000 气力、跑完六轮判定；好感度满 1000 时勇者投诚并离队', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  fixture.store.set('cflag:1:2', 950); // 两轮各 +40 即越 1000
  fixture.store.set('talent:1:73', 1); // 即落ち：FI_TEMPTATION 恒成功
  fixture.store.set('cflag:1:533', 1); // 自己当队长，验证投诚时 PARTY_DEL 生效
  // 六轮各「rand(9) → CASE 3（+40）＋ karma 的 rand(3)」，末尾三次赞助骰
  // 全部不命中（rand(20)==0 的两支与 rand(10)==0 的那支）
  const rand = seq([3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 1, 1, 1]);

  assert.equal(await load(fixture).temptation(1, rand), 0);

  assert.equal(fixture.store.get('base:0:1'), 8000, '扣 2000 气力');
  assert.equal(fixture.store.get('cflag:1:2'), 950 + 40 * 6, '好感度累积');
  assert.ok(texts(fixture).includes('*勇者被你诱惑，投诚了！*'));
  assert.equal(fixture.store.get('cflag:1:1'), 0, '投诚后状态清零');
  assert.equal(fixture.store.get('cflag:1:506'), 1, '新人标记');
  assert.equal(fixture.store.get('cflag:1:507'), 0, '归还标记清零');
  assert.equal(fixture.store.get('cflag:1:530') || 0, 0, 'PARTY_DEL 解散队伍');
  assert.equal(fixture.store.get('cflag:1:151'), -6, '六轮成功各扣 1 善恶值');
});

test('TEMPTATION：投诚的门槛是「满」1000——正好 1000 就投诚（判据是 >= 不是 >）', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  fixture.store.set('cflag:1:2', 1000 - 40 * 6); // 六轮 CASE 3 各 +40 → 正好落在 1000
  fixture.store.set('talent:1:73', 1); // 即落ち：FI_TEMPTATION 恒成功
  const rand = seq([3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 1, 1, 1]);

  assert.equal(await load(fixture).temptation(1, rand), 0);

  assert.equal(fixture.store.get('cflag:1:2'), 1000, '好感度正好满');
  assert.ok(
    texts(fixture).includes('*勇者被你诱惑，投诚了！*'),
    '正好 1000 也投诚（>= 不是 >）',
  );
});

test('TEMPTATION：好感度未满 1000 不触发投诚，两条进度格照出', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  fixture.store.set('cflag:1:2', 0);
  fixture.store.set('talent:1:73', 1);
  const rand = seq([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]); // 六轮 CASE 0

  await load(fixture).temptation(1, rand);

  assert.equal(
    texts(fixture).includes('*勇者被你诱惑，投诚了！*'),
    false,
    '未投诚',
  );
  assert.equal(fixture.store.get('cflag:1:1'), 2, '状态不变');
  const bars = fixture.lines_history.filter((line) => line.type === 'progress');
  assert.deepEqual(
    bars.map((b) => [b.text, b.out]),
    [
      // 六轮 CASE 0 各 +10*(1+ABL 四维) = 10
      ['好感度', ' 60/1000'],
      ['你的魔力', ' 8000/10000'],
    ],
  );
  assert.deepEqual(
    bars.map((b) => b.percentage),
    [6, 80],
  );
});

/** 把一组每轮掷骰重复 n 轮（六轮循环的序列构造） */
function repeat(n, values) {
  return Array.from({ length: n }, () => values).flat();
}

/** 六轮结束后的三次赞助骰（rand(20) / rand(20) / rand(10) 各自不命中） */
const NO_SPONSOR = [1, 1, 1];

// —— @PREPARE_TEMPTATION（:404-447）——

test('PREPARE_TEMPTATION：成功签的九项加成与两条残量倍率、失败签的刻印修正——表驱动', () => {
  // [标签, 预置（store 键值对）, 期望的 [SEIKOU, SIPPAI]]
  const table = [
    ['基线：全零、体力气力满', {}, [99, 50]],
    ['魔王等级 10 = +10', { 'cflag:0:9': 10 }, [109, 50]],
    [
      '三个 FLAG 加成相加',
      { 'flag:30': 1, 'flag:31': 2, 'flag:32': 3 },
      [105, 50],
    ],
    ['经验七项求和后整除 3（截断）', { 'exp:1:2': 7 }, [101, 50]],
    [
      '经验求和 8 / 3 = 2（不是 2.67）',
      { 'exp:1:2': 4, 'exp:1:74': 4 },
      [101, 50],
    ],
    [
      '基础素质四维各 1 = +5*4',
      { 'abl:1:0': 1, 'abl:1:1': 1, 'abl:1:2': 1, 'abl:1:3': 1 },
      [119, 50],
    ],
    ['高级素质两项各 1 = +10*2', { 'abl:1:10': 1, 'abl:1:11': 1 }, [119, 50]],
    ['体力 75% 不加倍', { 'base:1:0': 75, 'maxbase:1:0': 100 }, [99, 50]],
    [
      '体力 50% = 1.5 倍（148.5 截断成 148）',
      { 'base:1:0': 50, 'maxbase:1:0': 100 },
      [148, 50],
    ],
    ['体力 25% = 3 倍', { 'base:1:0': 25, 'maxbase:1:0': 100 }, [297, 50]],
    [
      '体力 10% = 4.5 倍（445.5 截断）',
      { 'base:1:0': 10, 'maxbase:1:0': 100 },
      [445, 50],
    ],
    ['体力 9% = 6 倍', { 'base:1:0': 9, 'maxbase:1:0': 100 }, [594, 50]],
    [
      '体力气力两条倍率相乘（1.5*1.5）',
      {
        'base:1:0': 50,
        'maxbase:1:0': 100,
        'base:1:1': 50,
        'maxbase:1:1': 100,
      },
      [222, 50],
    ],
    ['失败签：等级 + 善恶值', { 'cflag:1:9': 20, 'cflag:1:151': 10 }, [99, 80]],
    ['失败签负数被钳到 0', { 'cflag:1:151': -100 }, [99, 0]],
    ['失败签乘刻印 3 的 (1+1) 倍', { 'mark:1:3': 1 }, [99, 100]],
    ['失败签除刻印 0/1/2 之和的平方（50/9 截断）', { 'mark:1:0': 2 }, [99, 5]],
  ];
  for (const [label, preset, expected] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('maxbase:1:0', 100);
    fixture.store.set('base:1:0', 100);
    fixture.store.set('maxbase:1:1', 100);
    fixture.store.set('base:1:1', 100);
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    assert.deepEqual(load(fixture).prepare_temptation(1), expected, label);
  }
});

// —— @FI_TEMPTATION（:373-397，式中函数）——

test('FI_TEMPTATION：四个无条件成功素质一律成功且一次骰都不掷', () => {
  for (const talent of [73, 76, 85, 204]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set(`talent:1:${talent}`, 1);
    const boom = () => {
      throw new Error(`talent ${talent} 命中时不应掷骰`);
    };
    assert.equal(
      load(fixture).fi_temptation(1, 99, 50, boom),
      1,
      `talent ${talent}`,
    );
  }
});

test('FI_TEMPTATION：指轮的两条强制判据与主抽签的上界（149 = 99 + 50）', () => {
  // [标签, CFLAG:551/552, 掷骰序列, 上界序列, 期望]
  const table = [
    [
      '不幸の指轮（551 % 1000 == 20）掷出 < 5 → 强制成功',
      [1020, 0],
      [4],
      [20],
      1,
    ],
    ['不幸の指轮在 552 上也认', [0, 2020], [0], [20], 1],
    [
      '不幸の指轮掷出 >= 5 → 落到结界判据（掷 10）再落到主抽签',
      [1020, 0],
      [5, 0, 98],
      [20, 10, 149],
      1,
    ],
    ['结界の指轮（== 18）掷出 < 5 → 强制失败', [0, 18], [5, 4], [20, 10], 0],
    [
      '结界の指轮掷出 >= 5 → 主抽签说了算',
      [0, 18],
      [5, 5, 98],
      [20, 10, 149],
      1,
    ],
    ['主抽签掷中成功侧（98 < 99）', [0, 0], [5, 5, 98], [20, 10, 149], 1],
    ['主抽签掷中失败侧（99 不小于 99）', [0, 0], [5, 5, 99], [20, 10, 149], 0],
  ];
  for (const [label, rings, rolls, bounds_expected, expected] of table) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('cflag:1:551', rings[0]);
    fixture.store.set('cflag:1:552', rings[1]);
    const bounds = [];
    const rand = seq_probe(rolls, bounds);
    assert.equal(load(fixture).fi_temptation(1, 99, 50, rand), expected, label);
    assert.deepEqual(bounds, bounds_expected, `${label}：掷骰上界`);
  }
});

// —— @TEMPTATION_TRY（:202-364）：九档 SELECTCASE ——

test('TEMPTATION_TRY：六轮 SELECTCASE 的档 0-4——表驱动走完 rand(9) 的前五档', async () => {
  const master_lv = 3; // 让 CFLAG:0:9 的倍数可见
  // [档位, 预置, 期望的每轮 [juel5, juel6, 好感度]]
  const table = [
    [
      0,
      { 'abl:1:0': 1, 'abl:1:1': 2, 'abl:1:2': 3, 'abl:1:3': 4 },
      [master_lv * 10, 0, 10 * (1 + 10)],
    ],
    [
      1,
      { 'abl:1:10': 1, 'abl:1:11': 2 },
      [master_lv * 5, master_lv * 2, 15 * (1 + 3)],
    ],
    [
      2,
      { 'mark:1:0': 1, 'mark:1:1': 2, 'mark:1:2': 3, 'mark:1:3': 1 },
      [0, master_lv * 4, Math.trunc((10 * (1 + 6)) / 2)],
    ],
    [3, {}, [0, master_lv, 40]],
    [4, {}, [0, master_lv * 2, 50]],
  ];
  for (const [slot, preset, [juel5, juel6, affection]] of table) {
    const fixture = create_era_fixture();
    seed_hero(fixture);
    fixture.store.set('cflag:0:9', master_lv);
    fixture.store.set('talent:1:73', 1); // 恒成功
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    const bounds = [];
    const rand = seq_probe(repeat(6, [slot, 0]).concat(NO_SPONSOR), bounds);

    await load(fixture).temptation_try(1, rand);

    // 上界逐枚钉住：六轮各「SELECTCASE 的 RAND:9 ＋ karma 的 RAND:3」，
    // 末尾三次赞助骰 RAND:20 / RAND:20 / RAND:10
    assert.deepEqual(
      bounds,
      repeat(6, [9, 3]).concat([20, 20, 10]),
      `档 ${slot}：掷骰上界`,
    );

    assert.equal(
      fixture.store.get('juel:1:5') || 0,
      juel5 * 6,
      `档 ${slot}：欲情`,
    );
    assert.equal(
      fixture.store.get('juel:1:6') || 0,
      juel6 * 6,
      `档 ${slot}：屈服`,
    );
    assert.equal(
      fixture.store.get('cflag:1:2') || 0,
      affection * 6,
      `档 ${slot}：好感度`,
    );
    assert.equal(
      fixture.store.get('cflag:1:151'),
      -6,
      `档 ${slot}：六轮各扣 1 善恶`,
    );
  }
});

test('TEMPTATION_TRY：档 5/6 的治愈按残量给好感度，加值后按上限截断', async () => {
  // 六轮全走同一档（体力/气力满时不掷判定骰，talent 73 恒成功，每轮只掷
  // 「档位 + karma」两枚）；加值每轮固定 50（魔王等级 1 × 50），好感度档位
  // 按**每轮开始时的残量**取——上界取 10000 让六轮都落在同一档里。
  // [标签, 档位, base, max, 期望 base, 期望好感度（六轮之和）]
  const table = [
    ['体力 75% 档：+5 好感 / 轮，未撞上限', 5, 7500, 10000, 7800, 30],
    ['体力 50% 档：+25 好感 / 轮', 5, 5000, 10000, 5300, 150],
    ['体力 25% 档：+50 好感 / 轮', 5, 2500, 10000, 2800, 300],
    ['体力 10% 档：+75 好感 / 轮', 5, 1000, 10000, 1300, 450],
    ['体力 1% 档（CASEELSE）：+200 好感 / 轮', 5, 100, 10000, 400, 1200],
    ['体力 99% 档：加值被 MAXBASE 截断', 5, 9990, 10000, 10000, 30],
    ['气力 1% 档（CASEELSE）', 6, 100, 10000, 400, 1200],
    ['气力 99% 档：同样被截断', 6, 9990, 10000, 10000, 30],
  ];
  for (const [
    label,
    slot,
    base,
    max,
    expected_base,
    expected_affection,
  ] of table) {
    const fixture = create_era_fixture();
    seed_hero(fixture);
    fixture.store.set('cflag:0:9', 1); // +50 点加值
    fixture.store.set('talent:1:73', 1);
    const index = slot === 5 ? 0 : 1;
    fixture.store.set(`maxbase:1:${index}`, max);
    fixture.store.set(`base:1:${index}`, base);
    const bounds = [];
    const rand = seq_probe(repeat(6, [slot, 0]).concat(NO_SPONSOR), bounds);

    await load(fixture).temptation_try(1, rand);

    assert.deepEqual(
      bounds,
      repeat(6, [9, 3]).concat([20, 20, 10]),
      `${label}：掷骰上界`,
    );
    assert.equal(
      fixture.store.get(`base:1:${index}`),
      expected_base,
      `${label}：回复后的值`,
    );
    assert.equal(
      fixture.store.get('cflag:1:2'),
      expected_affection,
      `${label}：好感度`,
    );
  }
});

test('TEMPTATION_TRY：档 7/8 送道具成功则 +5 好感；五个槽填满后走 GOTO FAIL 的失败结算', async () => {
  // 六轮都是道具档。一轮的掷骰是「档位、选道具的 rand(14)、换武器的 rand(4)、
  // 侵攻中那枚 rand(4)（敌人状态 2 才掷，掷非 0 就不改写道具号）、
  // 成功结算的 karma rand(3)」——五个槽 560-564 正好够前五轮各填一个
  // （+5 好感、各扣 1 善恶值），第六轮无槽可放 → GOTO FAIL（加 1 善恶值）。
  const ITEM_ROUND = [7, 0, 3, 1, 0];
  // [标签, 是否预置满槽, 期望善恶值, 期望好感度, 期望被切断次数]
  const table = [
    ['逐轮填槽：五轮成功 + 第六轮 GOTO FAIL', false, -5 + 1, 25, 1],
    ['一开场就满槽：六轮全 GOTO FAIL', true, 6, 0, 6],
  ];
  for (const [label, full, karma_value, affection, cut] of table) {
    const fixture = create_era_fixture();
    seed_hero(fixture);
    fixture.store.set('talent:1:73', 1);
    if (full) {
      for (let slot = 0; slot < 5; slot += 1) {
        fixture.store.set(`cflag:1:${560 + slot}`, 401);
      }
    }
    const rand = seq(repeat(6, ITEM_ROUND).concat(NO_SPONSOR));

    await load(fixture).temptation_try(1, rand);

    assert.equal(
      fixture.store.get('cflag:1:151'),
      karma_value,
      `${label}：善恶值`,
    );
    assert.equal(
      fixture.store.get('cflag:1:2') || 0,
      affection,
      `${label}：好感度`,
    );
    assert.equal(
      texts(fixture).filter((t) => t === '诱惑被切断了！').length,
      cut,
      `${label}：被切断播报次数`,
    );
    if (!full) {
      assert.equal(fixture.store.get('cflag:1:560'), 400, '道具落进第一个空槽');
      assert.equal(fixture.store.get('cflag:1:564'), 400, '第五个槽也填上了');
    }
  }
});

test('TEMPTATION_TRY：判定失败的那一轮播报被切断并按 RAND(1, 3) 加善恶值', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  // 六轮全部失败：主抽签掷 99（不小于成功签 99），karma 骰掷 0 → 各加 1
  const rand = seq(repeat(6, [5, 5, 99, 0]).concat(NO_SPONSOR));

  await load(fixture).temptation_try(1, rand);

  assert.equal(texts(fixture).filter((t) => t === '诱惑被切断了！').length, 6);
  assert.equal(fixture.store.get('cflag:1:151'), 6, 'RAND(1,3) 掷出 1 × 六轮');
  assert.equal(fixture.store.get('cflag:1:2') || 0, 0, '失败不加好感度');
});

// —— @TEMPTATION_TRY：三次赞助机会（:301-360）——

test('TEMPTATION_TRY：赞助机会三支各按自己的判据命中，答 [0] 才落地', async () => {
  // [标签, 预置, 赞助掷骰, 期望效果]
  const table = [
    [
      '担保人：rand(20)==0 且不是担保人',
      {},
      [0],
      {
        money: -10000,
        talent290: 1,
        debt: 0,
        curse: 0,
        affection: 50,
        juel6: 6,
        credit: 10000,
      },
    ],
    [
      '肉芽诅咒：担保人那支被 290 挡下，第二支命中',
      { 'talent:1:290': 1 },
      [1, 0],
      {
        money: -10000,
        talent290: 1,
        debt: 0,
        curse: 1,
        affection: 50,
        juel6: 6,
        credit: 10000,
      },
    ],
    [
      '代还借款：前两支被挡下，第三支命中',
      { 'talent:1:290': 1, 'talent:1:121': 1, 'cflag:1:582': -10001 },
      [1, 1, 0],
      {
        money: -10000,
        talent290: 1,
        debt: 10000,
        curse: 0,
        affection: 80,
        juel6: 15,
        credit: 0,
      },
    ],
  ];
  for (const [label, preset, sponsor_rolls, expected] of table) {
    const fixture = create_era_fixture();
    seed_hero(fixture);
    fixture.store.set('cflag:0:9', 3);
    fixture.store.set('talent:1:73', 1);
    fixture.store.set('flag:10004', 50000);
    fixture.store.set('exflag:4444', 50000);
    for (const [key, value] of Object.entries(preset)) {
      fixture.store.set(key, value);
    }
    fixture.set_inputs(0); // SELECT_YES_NO 答「是的」
    // 六轮都不作弊地小步走（档 3），再进赞助骰
    const rand = seq(repeat(6, [3, 0]).concat(sponsor_rolls));

    await load(fixture).temptation_try(1, rand);

    assert.equal(
      fixture.store.get('flag:10004'),
      50000 + expected.money,
      `${label}：资金`,
    );
    assert.equal(
      fixture.store.get('exflag:4444'),
      50000 + expected.money,
      `${label}：非作弊资金`,
    );
    assert.equal(
      fixture.store.get('talent:1:290') || 0,
      expected.talent290,
      `${label}：担保人素质`,
    );
    assert.equal(
      fixture.store.get('talent:1:326') || 0,
      expected.curse,
      `${label}：肉芽诅咒`,
    );
    if (expected.debt !== 0) {
      assert.equal(
        fixture.store.get('cflag:1:582'),
        -10001 + expected.debt,
        `${label}：借款`,
      );
    }
    assert.equal(
      fixture.store.get('cflag:1:580') || 0,
      expected.credit,
      `${label}：目标所持金（只有担保人与肉芽两支入账）`,
    );
    assert.equal(
      fixture.store.get('cflag:1:151'),
      -6,
      `${label}：六轮成功扣善恶`,
    );
    // 好感度 = 六轮档 3 的 40*6 与赞助的加成之和
    assert.equal(
      fixture.store.get('cflag:1:2'),
      40 * 6 + expected.affection,
      `${label}：好感度`,
    );
    assert.ok(
      texts(fixture).some(
        (t) => t.includes('赞助了10000点资金') || t.includes('来帮勇者还债'),
      ),
      `${label}：赞助播报`,
    );
  }
});

test('TEMPTATION_TRY：赞助机会答 [1] 不落地，资金与素质都不动', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  fixture.store.set('talent:1:73', 1);
  fixture.store.set('flag:10004', 50000);
  fixture.store.set('exflag:4444', 50000);
  fixture.set_inputs(1); // 不要
  const rand = seq(repeat(6, [3, 0]).concat([0]));

  await load(fixture).temptation_try(1, rand);

  assert.equal(fixture.store.get('flag:10004'), 50000, '资金未动');
  assert.equal(fixture.store.get('exflag:4444'), 50000, '非作弊资金未动');
  assert.equal(fixture.store.get('talent:1:290') || 0, 0, '未成为担保人');
  assert.equal(fixture.store.get('cflag:1:2'), 40 * 6, '好感度只有六轮的部分');
});

test('TEMPTATION_TRY：资金不足 10000 时三支赞助全部落空（掷骰照掷）', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  fixture.store.set('talent:1:73', 1);
  fixture.store.set('flag:10004', 9999);
  fixture.store.set('exflag:4444', 9999);
  fixture.set_inputs(0); // 若真的问了，这里会被消费（不该发生）
  const rand = seq(repeat(6, [3, 0]).concat([0, 0, 0]));

  await load(fixture).temptation_try(1, rand);

  assert.equal(fixture.store.get('flag:10004'), 9999, '资金未动');
  assert.equal(fixture.store.get('talent:1:290') || 0, 0, '未成为担保人');
  assert.equal(fixture.store.get('talent:1:326') || 0, 0, '未中肉芽诅咒');
  assert.equal(
    fixture.inputs_consumed.filter((i) => i.api === 'input').length,
    0,
    '没有问过 SELECT_YES_NO',
  );
});

// —— 补钉三：担保人素质守卫、结婚返回值的上浮（#393 自检探针打出来的缺口） ——

test('TEMPTATION_TRY：已经是担保人时那一条判据不命中，「肉芽诅咒」那支接手', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture);
  fixture.store.set('talent:1:73', 1);
  fixture.store.set('cflag:0:9', 3);
  fixture.store.set('flag:10004', 50000);
  fixture.store.set('exflag:4444', 50000);
  fixture.store.set('talent:1:290', 1); // 已经是担保人
  fixture.set_inputs(0); // 若问了 SELECT_YES_NO 就答「是的」
  // 两次 rand(20) 都掷 0：第一支被素质 290 挡下，第二支（肉芽）接手
  const rand = seq(repeat(6, [3, 0]).concat([0, 0]));

  await load(fixture).temptation_try(1, rand);

  assert.equal(
    texts(fixture).some((t) => t.includes('成为了债务的担保人')),
    false,
    '担保人那一支没跑',
  );
  assert.ok(
    texts(fixture).some((t) => t.includes('要接受肉芽的诅咒')),
    '肉芽那一支接手',
  );
  assert.equal(fixture.store.get('talent:1:326'), 1, '肉芽诅咒落上');
});
