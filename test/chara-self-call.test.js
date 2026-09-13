'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 固定随机序：越界访问即断言失败，越界不静默回落成 0（issue #16 惯例） */
function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++] ?? 0;
    assert.ok(value >= 0 && value < n, `随机值 ${value} 必须在 [0, ${n}) 内`);
    return value;
  };
}

/**
 * 记录每次调用传入的上界 n（返回值仍按 index 顺序取），专用于钉住"随机上界"这类字面量数值：
 * 变异将 rand(4) 改成 rand(6) 时，若只断返回值的分支结果（seq 的做法）不会发现，
 * 因为同一个固定返回值对任何 n 的分支结果都一样。只有直接断实际传入的 n 才能钉住它。
 */
function seq_capture(values) {
  const bounds = [];
  let index = 0;
  const rand = (n) => {
    bounds.push(n);
    return values[index++] ?? 0;
  };
  rand.bounds = bounds;
  return rand;
}

function add_chara(fixture, cid, name = '某角色') {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

function set_talents(fixture, cid, talents) {
  for (const [idx, value] of Object.entries(talents)) {
    fixture.store.set(`talent:${cid}:${idx}`, value);
  }
}

function load(fixture) {
  return fixture.load_module('chara/chara-self-call');
}

// ---- calc_selfcall_factor ----

test('calc_selfcall_factor：种族因子表（精灵系/天使系/吸血鬼/龙族/魔族四种族2细分/矮人/默认）', () => {
  const cases = [
    ['精灵', { 314: 1 }, [2, 2, 2]],
    ['暗精灵（与精灵共用同一分支）', { 314: 7 }, [2, 2, 2]],
    ['天使', { 314: 6 }, [0, 0, 2]],
    ['堕天使（与天使共用同一分支）', { 314: 8 }, [0, 0, 2]],
    ['吸血鬼', { 314: 3 }, [2, 1, 0]],
    ['龙族', { 314: 5 }, [2, 1, -2]],
    ['魔族 + 种族2=植物', { 314: 9, 319: 4 }, [0, -1, 0]],
    ['魔族 + 种族2=妖精', { 314: 9, 319: 6 }, [1, 0, 0]],
    [
      '魔族 + 种族2=史莱姆（与妖精共用同一分支）',
      { 314: 9, 319: 2 },
      [1, 0, 0],
    ],
    ['魔族 + 种族2=魔兽', { 314: 9, 319: 10 }, [-2, 0, 0]],
    [
      '魔族 + 种族2=兽人（种族2 无匹配分支，无加成）',
      { 314: 9, 319: 1 },
      [0, 0, 0],
    ],
    ['矮人', { 314: 11 }, [-2, 1, -1]],
    ['人类（默认分支，无加成）', { 314: 0 }, [0, 0, 0]],
  ];
  for (const [label, talents, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    assert.deepEqual(
      load(fixture).calc_selfcall_factor(1, seq([])),
      expected,
      label,
    );
  }
});

test('calc_selfcall_factor：成为勇者前的生活因子表（学生/修女限女性/巫女系/贫穷三态/商人/军人/贵族/默认）', () => {
  const cases = [
    ['学生', { 315: 1 }, [1, 0, 0]],
    ['修女（女性，命中"修女"词条）', { 315: 2, 122: 0 }, [1, -1, 0]],
    [
      '修士（男性，"成为勇者前的生活"同一素质值在这里返回"修士"，不命中"修女"词条，无加成）',
      { 315: 2, 122: 1 },
      [0, 0, 0],
    ],
    ['巫女（女性）', { 315: 11, 122: 0 }, [1, 0, -2]],
    ['预言家（与巫女系共用同一分支）', { 315: 13 }, [1, 0, -2]],
    ['占卜师（与巫女系共用同一分支）', { 315: 14 }, [1, 0, -2]],
    ['隐士（与巫女系共用同一分支）', { 315: 17 }, [1, 0, -2]],
    ['小偷', { 315: 6 }, [-2, 0, 0]],
    ['乞丐（与小偷共用同一分支）', { 315: 7 }, [-2, 0, 0]],
    ['贫民（与小偷共用同一分支）', { 315: 9 }, [-2, 0, 0]],
    ['商人', { 315: 15 }, [1, -2, 0]],
    ['军人', { 315: 19 }, [0, -2, 0]],
    ['贵族', { 315: 8 }, [0, 2, 0]],
    ['不明（默认分支，无加成）', { 315: 0 }, [0, 0, 0]],
  ];
  for (const [label, talents, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    assert.deepEqual(
      load(fixture).calc_selfcall_factor(1, seq([])),
      expected,
      label,
    );
  }
});

test('calc_selfcall_factor：素质加成逐项独立生效（163/172/162/166/174 各自的掷骰分支/23/24/16/18）', () => {
  const cases = [
    ['163 高贵', { 163: 1 }, [], [2, 2, 0]],
    ['172 智慧', { 172: 1 }, [], [2, -1, 0]],
    ['162 懦弱', { 162: 1 }, [], [0, -2, 0]],
    ['166 恶女，掷骰未命中加成', { 166: 1 }, [1], [1, 2, 0]],
    ['166 恶女，掷骰命中额外 +1', { 166: 1 }, [0], [1, 3, 0]],
    ['174 贵公子，两次掷骰均未命中', { 174: 1 }, [1, 1], [2, 1, 0]],
    ['174 贵公子，两次掷骰均命中', { 174: 1 }, [0, 0], [3, 3, 0]],
    ['23 好奇的', { 23: 1 }, [], [0, 0, 5]],
    ['16 嚣张', { 16: 1 }, [], [0, 5, 0]],
    ['18 傲娇（与嚣张共用同一加成，不叠加）', { 18: 1 }, [], [0, 5, 0]],
  ];
  for (const [label, talents, rand_values, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    assert.deepEqual(
      load(fixture).calc_selfcall_factor(1, seq(rand_values)),
      expected,
      label,
    );
  }
});

test('calc_selfcall_factor：恶女/贵公子分支的掷骰上界被钉住（rand(4)/rand(3)，不能改成其它上界）', () => {
  const fixture1 = create_era_fixture();
  add_chara(fixture1, 1);
  set_talents(fixture1, 1, { 166: 1 });
  const rand1 = seq_capture([1]);
  load(fixture1).calc_selfcall_factor(1, rand1);
  assert.deepEqual(rand1.bounds, [4], '166 恶女只掷骰一次，上界是 4');

  const fixture2 = create_era_fixture();
  add_chara(fixture2, 1);
  set_talents(fixture2, 1, { 174: 1 });
  const rand2 = seq_capture([1, 1]);
  load(fixture2).calc_selfcall_factor(1, rand2);
  assert.deepEqual(rand2.bounds, [4, 3], '174 贵公子掷骰两次，上界依次是 4/3');
});
test('calc_selfcall_factor：24/15/17 为绝对赋值，按素质检查顺序覆盖之前的加成', () => {
  const fixture1 = create_era_fixture();
  add_chara(fixture1, 1);
  set_talents(fixture1, 1, { 23: 1, 24: 1 }); // 好奇的 openness+=5 先执行，保守的 openness=-10 后执行覆盖
  assert.deepEqual(
    load(fixture1).calc_selfcall_factor(1, seq([])),
    [0, 0, -10],
    '好奇的先加openness后被保守的绝对赋值覆盖',
  );

  const fixture2 = create_era_fixture();
  add_chara(fixture2, 1);
  set_talents(fixture2, 1, { 16: 1, 15: 1 }); // 嚣张 attitude+=5 先执行，高姿态 attitude=10 后执行覆盖
  assert.deepEqual(
    load(fixture2).calc_selfcall_factor(1, seq([])),
    [0, 10, 0],
    '嚣张先加attitude后被高姿态绝对赋值覆盖',
  );

  const fixture3 = create_era_fixture();
  add_chara(fixture3, 1);
  set_talents(fixture3, 1, { 15: 1, 17: 1 }); // 高姿态先把 attitude 设为 10，低姿态最后执行覆盖为 -10
  assert.deepEqual(
    load(fixture3).calc_selfcall_factor(1, seq([])),
    [0, -10, 0],
    '高姿态先设attitude=10后被低姿态绝对赋值覆盖为-10',
  );
});

// ---- set_suit_selfcall ----

test('set_suit_selfcall：CASE 0（开放<-2 且教育>0）全部子分支', () => {
  const cases = [
    [
      '开放<=-5，掷骰命中→吾辈',
      { 24: 1, 163: 1 }, // openness=-10（绝对值），edu=2>0
      [1],
      '吾辈',
    ],
    ['开放<=-5，掷骰未命中→老身', { 24: 1, 163: 1 }, [0], '老身'],
    [
      '开放在 (-5,-2)，姿态>=-3，非男性→妾身',
      { 314: 5, 315: 13 }, // 龙族(openness-2)+预言家(openness-2)=-4；edu=3；attitude=1
      [],
      '妾身',
    ],
    [
      '开放在 (-5,-2)，姿态>=-3，男性→鄙人',
      { 314: 5, 315: 13, 122: 1 },
      [],
      '鄙人',
    ],
    [
      '开放在 (-5,-2)，姿态<-3，非男性→奴家',
      { 314: 5, 315: 13, 17: 1 }, // 低姿态绝对赋值 attitude=-10
      [],
      '奴家',
    ],
    [
      '开放在 (-5,-2)，姿态<-3，男性→在下',
      { 314: 5, 315: 13, 17: 1, 122: 1 },
      [],
      '在下',
    ],
  ];
  for (const [label, talents, rand_values, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    const local = load(fixture).set_suit_selfcall(1, -1, seq(rand_values));
    assert.equal(local, 0, label);
    assert.equal(fixture.store.get('cstr:1:60'), expected, label);
  }
});

test('set_suit_selfcall：CASE 0 的 && 不能换成 ||（两侧各有用例）', () => {
  // 开放<-2 但教育<=0：&& 时不该进 CASE 0，四档全部落空
  const fixture1 = create_era_fixture();
  add_chara(fixture1, 1);
  set_talents(fixture1, 1, { 24: 1 }); // 保守的 openness=-10（绝对值），edu=0
  assert.equal(
    load(fixture1).set_suit_selfcall(1, -1, seq([])),
    -1,
    '开放<-2 但教育<=0 不该进 CASE 0',
  );
  assert.equal(fixture1.store.get('cstr:1:60'), undefined);

  // 开放>=-2 但教育>0：&& 时不该进 CASE 0，应落到 CASE 3
  const fixture2 = create_era_fixture();
  add_chara(fixture2, 1);
  set_talents(fixture2, 1, { 163: 1 }); // 高贵：edu=2,attitude=2,openness=0
  assert.equal(
    load(fixture2).set_suit_selfcall(1, -1, seq([])),
    3,
    '开放>=-2 但教育>0 不该进 CASE 0，应落到 CASE 3',
  );
  assert.equal(fixture2.store.get('cstr:1:60'), '人家');
});
test('set_suit_selfcall：CASE 1（教育<-2）姿态两态', () => {
  const cases = [
    ['姿态<5→俺', { 314: 11, 315: 6 }, '俺'], // 矮人(edu-2)+小偷(edu-2)=-4；attitude=1
    ['姿态>=5，非男性→老娘', { 314: 11, 315: 6, 16: 1 }, '老娘'], // +嚣张 attitude+5=6
    ['姿态>=5，男性→老子', { 314: 11, 315: 6, 16: 1, 122: 1 }, '老子'],
  ];
  for (const [label, talents, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    const local = load(fixture).set_suit_selfcall(1, 0, seq([]));
    assert.equal(local, 1, label);
    assert.equal(fixture.store.get('cstr:1:60'), expected, label);
  }
});

test('set_suit_selfcall：CASE 1 教育<-2 是严格边界，教育=-3 才进入（-2 本身不该进）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  set_talents(fixture, 1, { 314: 11, 315: 6, 166: 1 }); // 矮人(edu-2)+小偷(edu-2)+恶女(edu+1)=-3
  const local = load(fixture).set_suit_selfcall(1, 0, seq([1])); // 恶女掷骰不命中额外加成
  assert.equal(local, 1, '教育=-3 严格小于 -2，必须进入 CASE 1');
  assert.equal(fixture.store.get('cstr:1:60'), '俺');
});

test('set_suit_selfcall：CASE 2（教育>2）姿态四态与落空回退', () => {
  const cases = [
    ['姿态>=5→本宫', { 163: 1, 172: 1, 16: 1 }, '本宫'], // edu=4;attitude=2-1+5=6
    ['姿态>2 (<5)，非男性→本小姐', { 314: 1, 163: 1 }, '本小姐'], // 精灵(edu2,att2,open2)+高贵(edu2,att2)=edu4,att4
    ['姿态>2 (<5)，男性→本少爷', { 314: 1, 163: 1, 122: 1 }, '本少爷'],
    ['姿态<-2，非男性→小女子', { 163: 1, 172: 1, 17: 1 }, '小女子'], // edu=4;attitude 被低姿态覆盖为 -10
    ['姿态<-2，男性→小人', { 163: 1, 172: 1, 17: 1, 122: 1 }, '小人'],
  ];
  for (const [label, talents, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    const local = load(fixture).set_suit_selfcall(1, 1, seq([]));
    assert.equal(local, 2, label);
    assert.equal(fixture.store.get('cstr:1:60'), expected, label);
  }

  // 教育>2 但姿态落在 (-2,2] 区间：内层四支全部落空，继续试 CASE 3，
  // CASE 3 要求教育也在 [-2,2]（此处教育=4，超界），最终 CASEELSE 返回 -1
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  set_talents(fixture, 1, { 163: 1, 172: 1 }); // edu=4, attitude=1
  assert.equal(load(fixture).set_suit_selfcall(1, 1, seq([])), -1);
  assert.equal(fixture.store.get('cstr:1:60'), undefined);
});

test('set_suit_selfcall：CASE 2 姿态>2 是严格边界，姿态=3 才走本少爷/本小姐', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  set_talents(fixture, 1, { 314: 3, 163: 1 }); // 吸血鬼(edu+2,attitude+1)+高贵(edu+2,attitude+2)=edu4,attitude3
  const local = load(fixture).set_suit_selfcall(1, 1, seq([]));
  assert.equal(local, 2, '姿态=3 严格大于 2，必须进入本少爷/本小姐分支');
  assert.equal(fixture.store.get('cstr:1:60'), '本小姐');
});

test('set_suit_selfcall：CASE 3 命中时的男女用词与全档落空', () => {
  const cases = [
    ['非男性→人家', {}, '人家'],
    ['男性→鄙人', { 122: 1 }, '鄙人'],
  ];
  for (const [label, talents, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    const local = load(fixture).set_suit_selfcall(1, 2, seq([]));
    assert.equal(local, 3, label);
    assert.equal(fixture.store.get('cstr:1:60'), expected, label);
  }

  // 四档从 -1 起顺序全部落空（高姿态把 attitude 定死在 10，四档条件全部不成立）
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  set_talents(fixture, 1, { 15: 1 });
  assert.equal(load(fixture).set_suit_selfcall(1, -1, seq([])), -1);
  assert.equal(fixture.store.get('cstr:1:60'), undefined);
});

test('set_suit_selfcall：CASE 3 六个边界逐条表驱动（教育/姿态/开放各自的下界与上界，每界一行「正好在界」+一行「刚出界」，另加一行三维居中的正例）', () => {
  // 三维评分不能直接传参，只能靠素质组合反推；每行先用 calc_selfcall_factor
  // 自证组合确实产出目标三元组，再看 set_suit_selfcall 是否按此三元组命中/
  // 落空——避免"选错组合、恰好凑出预期返回值"的假阳性。
  // 开放上界的"刚出界"取不到恰好 +3：openness 只有 ±2（种族）/-2（巫女系）/
  // +5（好奇的）三档，没有 +1 单位来源，龙族(-2)+好奇的(+5) 已是能凑到的
  // 最接近值（=3，教育/姿态两维仍分别钉在各自范围内，隔离不受影响）。
  const cases = [
    // [label, talents, [教育,姿态,开放], 是否应命中 CASE 3]
    ['三维居中（正例）', {}, [0, 0, 0], true],
    ['教育下界：正好在界（教育=-2，矮人单挑）', { 314: 11 }, [-2, 1, -1], true],
    [
      '教育下界：刚出界（教育=-3，矮人+小偷+恶女+懦弱抵消姿态）',
      { 314: 11, 315: 6, 166: 1, 162: 1 },
      [-3, 1, -1],
      false,
    ],
    ['教育上界：正好在界（教育=2，吸血鬼单挑）', { 314: 3 }, [2, 1, 0], true],
    [
      '教育上界：刚出界（教育=3，吸血鬼+学生）',
      { 314: 3, 315: 1 },
      [3, 1, 0],
      false,
    ],
    ['姿态下界：正好在界（姿态=-2，懦弱单挑）', { 162: 1 }, [0, -2, 0], true],
    [
      '姿态下界：刚出界（姿态=-3，军人+智慧）',
      { 315: 19, 172: 1 },
      [2, -3, 0],
      false,
    ],
    ['姿态上界：正好在界（姿态=2，贵族单挑）', { 315: 8 }, [0, 2, 0], true],
    [
      '姿态上界：刚出界（姿态=3，贵族+吸血鬼）',
      { 315: 8, 314: 3 },
      [2, 3, 0],
      false,
    ],
    [
      '开放下界：正好在界（开放=-2，巫女单挑）',
      { 315: 11, 122: 0 },
      [1, 0, -2],
      true,
    ],
    [
      '开放下界：刚出界（开放=-3，矮人+巫女）',
      { 314: 11, 315: 11, 122: 0 },
      [-1, 1, -3],
      false,
    ],
    ['开放上界：正好在界（开放=2，天使单挑）', { 314: 6 }, [0, 0, 2], true],
    [
      '开放上界：刚出界（开放=3，龙族+好奇的）',
      { 314: 5, 23: 1 },
      [2, 1, 3],
      false,
    ],
  ];
  for (const [label, talents, expected_factor, should_match] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_talents(fixture, 1, talents);
    const msg = `${label}：[教育,姿态,开放]=[${expected_factor.join(',')}]`;
    assert.deepEqual(
      load(fixture).calc_selfcall_factor(1, seq([1])),
      expected_factor,
      msg,
    );
    const local = load(fixture).set_suit_selfcall(1, 2, seq([1]));
    if (should_match) {
      assert.equal(local, 3, `${msg}，应命中 CASE 3`);
      assert.equal(
        fixture.store.get('cstr:1:60'),
        '人家',
        `${msg}，应命中 CASE 3`,
      );
    } else {
      assert.equal(local, -1, `${msg}，不应命中 CASE 3，落到 default`);
      assert.equal(
        fixture.store.get('cstr:1:60'),
        undefined,
        `${msg}，不应命中 CASE 3，不写 cstr`,
      );
    }
  }
});

// ---- set_nick_selfcall ----

test('set_nick_selfcall：姓名含半角字符时立即回落姓名本体并返回 -1', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, 'Alice');
  fixture.store.set(`cflag:1:6`, 200); // NID 落和名区间，验证半角检查先于和/洋名分派
  assert.equal(
    load(fixture).set_nick_selfcall(1, -1, seq([])),
    -1,
    '半角字符名回落姓名本体',
  );
  assert.equal(
    fixture.store.get('cstr:1:60'),
    'Alice',
    '半角字符名回落姓名本体',
  );
});

test('set_nick_selfcall：NID 决定和名/洋名分派，含原作 [3000,4059) 和名男性向 NID 落入洋名的重叠缺陷', () => {
  const cases = [
    ['NID<200 → 洋名（CASE0 直接照抄）', 0, 0, '索菲亚'],
    ['NID 落 [200,1000) → 和名（CASE1 挑字）', 200, 1, '索菲'],
    ['NID 落 [3000,+) 的重叠缺陷 → 仍判洋名', 3000, 0, '索菲亚'],
    // 注：type===2（组合名）与 type===1（洋名）在此调用点走的是同一条
    // "else" 分支（只判 === 0），本用例锁住的是"type!==0 一律落洋名"这条
    // 契约，不锁 nid_get_type 内部 1e9 那条阈值本身——该阈值把
    // 1_000_000_001 改判成 2_000_000_001 也不会改变这里的路由（两侧都非
    // 0），nid_get_type 自身另一处消费者 chara-family.js 的
    // f_check_relevant 同样用 Math.min(1,Math.max(0,...)) 把 1/2 钳成
    // 同一档，全库当前没有任何消费者会区分 1 与 2，这条边界不可观察。
    ['NID > 1e9（组合名类型）→ 同样落洋名分支', 1_500_000_000, 0, '索菲亚'],
  ];
  for (const [label, nid, expected_local, expected_cstr] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '索菲亚'); // 3 字：和名 CASE0（<=2 字）不命中，洋名 CASE0（<=3 字）命中
    fixture.store.set('cflag:1:6', nid);
    const local = load(fixture).set_nick_selfcall(1, -1, seq([0])); // 和名 CASE1 用得到的唯一掷骰：rand(2-1)=0 → 取第 2 字"菲"
    assert.equal(local, expected_local, label);
    assert.equal(fixture.store.get('cstr:1:60'), expected_cstr, label);
  }
});

test('set_nick_selfcall：和名六档（NID 落 [200,1000)）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  fixture.store.set('cflag:1:6', 200);
  const nick = load(fixture);

  // CASE 0：字数<=2 → 原样照抄
  fixture.store.set('callname:1:-1', '皐月');
  assert.equal(
    nick.set_nick_selfcall(1, -1, seq([])),
    0,
    '和名CASE0字数<=2原样照抄',
  );
  assert.equal(
    fixture.store.get('cstr:1:60'),
    '皐月',
    '和名CASE0字数<=2原样照抄',
  );

  // CASE 1：字数>2，无尾「子」→ 首字 + 随机挑一字（rand(2)=1 → 第 3 字"美"）
  fixture.store.set('callname:1:-1', '佳奈美');
  assert.equal(nick.set_nick_selfcall(1, 0, seq([1])), 1);
  assert.equal(fixture.store.get('cstr:1:60'), '佳美');

  // CASE 1：字数>2，先去尾「子」再挑（"纪美子"→"纪美"，rand(1)=0 → 取"美"）
  fixture.store.set('callname:1:-1', '纪美子');
  assert.equal(nick.set_nick_selfcall(1, 0, seq([0])), 1);
  assert.equal(fixture.store.get('cstr:1:60'), '纪美');

  // CASE 2：字数<=1 原样，>1 截断为首字，加「小」前缀
  fixture.store.set('callname:1:-1', '樱');
  assert.equal(nick.set_nick_selfcall(1, 1, seq([])), 2);
  assert.equal(fixture.store.get('cstr:1:60'), '小樱');

  // CASE 3：截断为首字，加「子」后缀
  fixture.store.set('callname:1:-1', '樱');
  assert.equal(nick.set_nick_selfcall(1, 2, seq([])), 3);
  assert.equal(fixture.store.get('cstr:1:60'), '樱子');

  // CASE 4：截断为首字，加「酱」后缀
  fixture.store.set('callname:1:-1', '樱');
  assert.equal(nick.set_nick_selfcall(1, 3, seq([])), 4);
  assert.equal(fixture.store.get('cstr:1:60'), '樱酱');

  // CASE 5：字数<=1 先补「子」再双写
  fixture.store.set('callname:1:-1', '樱');
  assert.equal(nick.set_nick_selfcall(1, 4, seq([])), 5);
  assert.equal(fixture.store.get('cstr:1:60'), '樱子樱子');

  // CASE 5：字数==2 原样双写
  fixture.store.set('callname:1:-1', '菊枝');
  assert.equal(nick.set_nick_selfcall(1, 4, seq([])), 5);
  assert.equal(fixture.store.get('cstr:1:60'), '菊枝菊枝');

  // CASE 5：字数>2 走与 CASE1 同款挑字后双写（rand(2)=1 → 第 3 字"美"）
  fixture.store.set('callname:1:-1', '佳奈美');
  assert.equal(nick.set_nick_selfcall(1, 4, seq([1])), 5);
  assert.equal(fixture.store.get('cstr:1:60'), '佳美佳美');

  // CASEELSE：档位越过 5 直接落空
  fixture.store.set('callname:1:-1', '樱');
  assert.equal(nick.set_nick_selfcall(1, 5, seq([])), -1);
});

test('set_nick_selfcall：和名 CASE1 去尾“子”发生在重算长度之前，随机上界跟着变短', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '美惠子');
  fixture.store.set('cflag:1:6', 200);
  const rand = seq_capture([0]);
  const local = load(fixture).set_nick_selfcall(1, 0, rand);
  assert.equal(local, 1);
  assert.deepEqual(
    rand.bounds,
    [1],
    '去尾“子”后按 2 字取随机，上界必须是 rand(1)（若未去尾则为 rand(2)）',
  );
  assert.equal(fixture.store.get('cstr:1:60'), '美惠');
});

test('set_nick_selfcall：洋名五档（NID 落 [0,200)）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  fixture.store.set('cflag:1:6', 0);
  const nick = load(fixture);

  // CASE 0：字数<=3 → 原样照抄
  fixture.store.set('callname:1:-1', '艾莉');
  assert.equal(nick.set_nick_selfcall(1, -1, seq([])), 0);
  assert.equal(fixture.store.get('cstr:1:60'), '艾莉');

  // CASE 0 落空（字数>3）→ 继续 CASE 1：字数<=2 落空 → 挑字（不去尾「子」）
  fixture.store.set('callname:1:-1', '索菲亚娜');
  assert.equal(nick.set_nick_selfcall(1, -1, seq([2])), 1); // rand(3)=2 → 第 4 字"娜"
  assert.equal(fixture.store.get('cstr:1:60'), '索娜');

  // CASE 2：截断首字，加「小」前缀
  fixture.store.set('callname:1:-1', '索菲亚');
  assert.equal(nick.set_nick_selfcall(1, 1, seq([])), 2);
  assert.equal(fixture.store.get('cstr:1:60'), '小索');

  // CASE 3：首字在白名单内、末字非「儿」→ 首字 + 「儿」
  fixture.store.set('callname:1:-1', '艾提卡');
  assert.equal(
    nick.set_nick_selfcall(1, 2, seq([])),
    3,
    '洋名CASE3白名单首字加儿',
  );
  assert.equal(
    fixture.store.get('cstr:1:60'),
    '艾儿',
    '洋名CASE3白名单首字加儿',
  );

  // CASE 3 落空（首字不在白名单）→ 落到 CASE 4，同样因不在白名单落空 → CASEELSE
  fixture.store.set('callname:1:-1', '张三丰');
  assert.equal(
    nick.set_nick_selfcall(1, 2, seq([])),
    -1,
    '洋名CASE3白名单不含张三丰的张',
  );

  // CASE 3 落空（字数<2）→ CASE 4 同样字数<2 落空 → CASEELSE
  fixture.store.set('callname:1:-1', '艾');
  assert.equal(nick.set_nick_selfcall(1, 2, seq([])), -1);

  // CASE 3 落空（字数==2 且末字是「儿」，避免儿儿重复）→ CASE4 首字非儿判断，末字=="儿" 同样落空
  fixture.store.set('callname:1:-1', '艾儿');
  assert.equal(nick.set_nick_selfcall(1, 2, seq([])), -1);

  // CASE 4：首字在白名单内、末字非「儿」→ 首字 + 末字 + 「儿」
  fixture.store.set('callname:1:-1', '艾提卡');
  assert.equal(nick.set_nick_selfcall(1, 3, seq([])), 4);
  assert.equal(fixture.store.get('cstr:1:60'), '艾卡儿');

  // CASEELSE：档位越过 4 直接落空
  fixture.store.set('callname:1:-1', '艾提卡');
  assert.equal(nick.set_nick_selfcall(1, 4, seq([])), -1);
});

test('set_nick_selfcall：洋名 CASE1 字数<=2 是严格边界，字数=2 仍应落空继续到 CASE2', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '艾莉');
  fixture.store.set('cflag:1:6', 0);
  const local = load(fixture).set_nick_selfcall(1, 0, seq([0]));
  assert.equal(local, 2, '2 字必须在 CASE1 落空，继续到 CASE2');
  assert.equal(fixture.store.get('cstr:1:60'), '小艾');
});

// ---- random_self_call ----

test('random_self_call：档位 <9 直设为「我」，并把档位钉在 9', () => {
  const cases = [undefined, 0, 8];
  for (const preset of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    if (preset !== undefined) fixture.store.set('cflag:1:450', preset);
    assert.equal(load(fixture).random_self_call(1, seq([])), 9, String(preset));
    assert.equal(fixture.store.get('cstr:1:60'), '我', 'CSTR:x:60 = 我');
    assert.equal(fixture.store.get('cflag:1:450'), 9, 'CFLAG:x:450 = 9');
  }
});

test('random_self_call：档位落 [9,100) 委派合适一人称表，档位与返回值同为 命中档+10', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1); // 全零素质命中 CASE 3（三维均为 0）
  fixture.store.set('cflag:1:450', 9); // start = 9-10 = -1，从 CASE 0 起顺序尝试
  assert.equal(
    load(fixture).random_self_call(1, seq([])),
    13,
    '命中档+10委派合适一人称表',
  );
  assert.equal(
    fixture.store.get('cstr:1:60'),
    '人家',
    '命中档+10委派合适一人称表',
  );
  assert.equal(
    fixture.store.get('cflag:1:450'),
    13,
    '命中档+10委派合适一人称表',
  );
});

test('random_self_call：合适一人称表耗尽后落到绰号一人称表，档位为 命中档+100 但返回值只是命中档（原作不对称，1:1 保留）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '皐月'); // 2 字，和名 CASE 0 直接命中
  fixture.store.set('cflag:1:6', 200); // 和名区间
  fixture.store.set('cflag:1:450', 99); // 合适表 start=89，越界立即落空
  assert.equal(load(fixture).random_self_call(1, seq([])), 0);
  assert.equal(fixture.store.get('cstr:1:60'), '皐月');
  assert.equal(fixture.store.get('cflag:1:450'), 100);
});

test('random_self_call：两张表均落空时清空档位重试一次，最终落回<9 直设', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, 'Bob'); // 半角姓名：绰号表任何档位都立即落空
  set_talents(fixture, 1, { 15: 1 }); // 姿态定死为 10：合适表四档全部落空
  fixture.store.set('cflag:1:450', 50); // 落在 [9,100) 区间，先试合适表
  assert.equal(load(fixture).random_self_call(1, seq([])), 9);
  assert.equal(fixture.store.get('cstr:1:60'), '我');
  assert.equal(fixture.store.get('cflag:1:450'), 9);
});

test('random_self_call：档位 >=200 或为负数时走 CSV 预设回落；预设存在则采用并把档位清零', () => {
  const cases = [
    ['档位 >=200', 200],
    ['档位为负', -5],
  ];
  for (const [label, preset_flag] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('cflag:1:450', preset_flag);
    fixture.store.set('chara:1', { cstr: { 60: '朕' } }); // CSV 预设一人称
    assert.equal(load(fixture).random_self_call(1, seq([])), 0, label);
    assert.equal(fixture.store.get('cstr:1:60'), '朕', label);
    assert.equal(fixture.store.get('cflag:1:450'), 0, label);
  }
});

test('random_self_call：CSV 预设缺失时降级为 <9 直设分支（不清空档位重试，因为已经落在 <0 分支内部）', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1); // 未预置 chara:1，即无 CSTR 预设
  fixture.store.set('cflag:1:450', -1);
  assert.equal(load(fixture).random_self_call(1, seq([])), 9);
  assert.equal(fixture.store.get('cstr:1:60'), '我');
  assert.equal(fixture.store.get('cflag:1:450'), 9);
});
