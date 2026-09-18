/**
 * @file ere/chara/chara-make-inherit.js 的行为测试（issue #384）：
 * @CMI_SETTALENT / @CMI_MOM_COMPLEX / @CMI_CONFLICT_CHECK 三个存根换真身。
 *
 * 源: target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB:73-166。
 * 随机源一律经公开形参注入确定序列（seq，chara-self-call.test.js 先例）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

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
 * 记录每次调用传入的上界 n（返回值仍按 index 顺序取）。专用于钉「概率分母」
 * 这类字面量：rand(4) 改成 rand(5) 时只断分支结果看不出来（同一个固定返回值
 * 对任何分母都可能落同一支），只有直接断分母才钉得住。
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

function load(fixture) {
  return fixture.load_module('chara/chara-make-inherit');
}

// —— @CMI_SETTALENT（:73-91）：三档概率继承 ——

test('cmi_settalent：单亲（L_C <= 0）掷 RAND:4，非零即继承（3/4）', () => {
  // :81-82 SIF RAND:4 → 掷出 1/2/3 时继承，0 时不继承
  for (const [roll, inherited] of [
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 1],
  ]) {
    const fixture = create_era_fixture();
    fixture.store.set('talent:3:20', 5); // 亲本素质值
    const { cmi_settalent } = load(fixture);
    const cap = seq_capture([roll]);
    cmi_settalent(20, 8, 3, -1, cap);
    assert.deepEqual(cap.bounds, [4], '单亲分母恒 4');
    assert.equal(
      fixture.store.get('talent:8:20'),
      inherited ? 5 : undefined,
      `RAND:4 = ${roll}`,
    );
  }
});

test('cmi_settalent：L_C = 0 也走单亲支（判据是 <= 0，不是 < 0）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:20', 5);
  const { cmi_settalent } = load(fixture);
  const cap = seq_capture([1]);
  cmi_settalent(20, 8, 3, 0, cap);
  assert.deepEqual(cap.bounds, [4], 'L_C = 0 未落到双亲支的 16');
  assert.equal(fixture.store.get('talent:8:20'), 5);
});

test('cmi_settalent：魔王为母（L_B == 0）掷 RAND:3，非零即继承（2/3）', () => {
  for (const [roll, inherited] of [
    [0, 0],
    [1, 1],
    [2, 1],
  ]) {
    const fixture = create_era_fixture();
    fixture.store.set('talent:4:20', 7); // L_C 的素质
    fixture.store.set('talent:0:20', 99); // L_B（魔王）的素质——不得被抄
    const { cmi_settalent } = load(fixture);
    const cap = seq_capture([roll]);
    cmi_settalent(20, 8, 0, 4, cap);
    assert.deepEqual(cap.bounds, [3], '魔王为母分母 3');
    assert.equal(
      fixture.store.get('talent:8:20'),
      inherited ? 7 : undefined,
      `RAND:3 = ${roll} 从 L_C 取`,
    );
  }
});

test('cmi_settalent：双亲掷 RAND:16，命中后再掷 RAND:2 选亲本', () => {
  // :90 TALENT:A:L_I = RAND:2 ? TALENT:B:L_I # TALENT:C:L_I ——
  // Emuera 三目是 `cond ? 真值 # 假值`，故 RAND:2 非零取 L_B 侧（11）
  for (const [pick, expected] of [
    [0, 22],
    [1, 11],
  ]) {
    const fixture = create_era_fixture();
    fixture.store.set('talent:3:20', 11);
    fixture.store.set('talent:4:20', 22);
    const { cmi_settalent } = load(fixture);
    const cap = seq_capture([1, pick]);
    cmi_settalent(20, 8, 3, 4, cap);
    assert.deepEqual(cap.bounds, [16, 2], '双亲两档分母');
    assert.equal(
      fixture.store.get('talent:8:20'),
      expected,
      `RAND:2 = ${pick}`,
    );
  }
  // 未命中（唯一的 1/16 落空）→ 一个字段都不写
  const miss = create_era_fixture();
  miss.store.set('talent:3:20', 11);
  miss.store.set('talent:4:20', 22);
  const { cmi_settalent: run_miss } = load(miss);
  run_miss(20, 8, 3, 4, seq([0]));
  assert.equal(
    miss.store.get('talent:8:20'),
    undefined,
    'RAND:16 掷出 0 不继承',
  );
});

test('cmi_settalent：素质值是 0 时照样写 0（「不继承」与「继承到 0」都落 0）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:20', 0);
  const { cmi_settalent } = load(fixture);
  cmi_settalent(20, 8, 3, -1, seq([1]));
  assert.equal(fixture.store.get('talent:8:20'), 0, '显式写 0');
});

// —— @CMI_MOM_COMPLEX（:97-121）——

test('cmi_mom_complex：母亲讨厌男人而孩子是男性/扶她 → 整段跳过（不掷任何骰）', () => {
  for (const child_male of [122, 121]) {
    const fixture = create_era_fixture();
    fixture.store.set('talent:3:82', 1); // 亲本「讨厌男人」
    fixture.store.set(`talent:8:${child_male}`, 1);
    // **反例路径的前置条件**（#384 返工）：守卫一旦失效就落进 ELSE 支，
    // 母性（155）在那里掷 RAND:2 并写下恋母情结。不摆这一项时，两种世界里
    // 「不掷任何骰」都成立——断言恒真、拆掉守卫也不红。
    fixture.store.set('talent:3:155', 1); // 亲本「母性」
    const { cmi_mom_complex } = load(fixture);
    const cap = seq_capture([1]); // 万一掷到，必须写 140（让反例也可见）
    cmi_mom_complex(8, 3, cap);
    assert.deepEqual(cap.bounds, [], '第一支直接跳过');
    assert.equal(fixture.store.get('talent:8:140'), undefined);
  }
});

test('cmi_mom_complex：母亲男人婆而孩子是女性 → 整段跳过', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:79', 1); // 亲本「男人婆」
  // 孩子既非男性也非扶她
  // 反例路径的前置条件同上一例（守卫失效 → ELSE 支的母性掷骰并写 140）
  fixture.store.set('talent:3:155', 1);
  const { cmi_mom_complex } = load(fixture);
  const cap = seq_capture([1]);
  cmi_mom_complex(8, 3, cap);
  assert.deepEqual(cap.bounds, [], '第二支直接跳过');
  assert.equal(fixture.store.get('talent:8:140'), undefined);
});

test('cmi_mom_complex：母性 → 恋母情结（掷 RAND:2）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:155', 1); // 亲本「母性」
  const { cmi_mom_complex } = load(fixture);
  const cap = seq_capture([1]);
  cmi_mom_complex(8, 3, cap);
  assert.deepEqual(cap.bounds, [2], '母性分母 2');
  assert.equal(fixture.store.get('talent:8:140'), 1, '恋母情结');

  const miss = create_era_fixture();
  miss.store.set('talent:3:155', 1);
  const { cmi_mom_complex: run } = load(miss);
  run(8, 3, seq([0]));
  assert.equal(miss.store.get('talent:8:140'), undefined, 'RAND:2 = 0 不设');
});

test('cmi_mom_complex：人妻 → 恋母情结（掷 RAND:3，恰 == 1 命中）', () => {
  for (const [roll, expect_set] of [
    [0, false],
    [1, true],
    [2, false],
  ]) {
    const fixture = create_era_fixture();
    fixture.store.set('talent:3:157', 1); // 亲本「人妻」
    const { cmi_mom_complex } = load(fixture);
    const cap = seq_capture([roll]);
    cmi_mom_complex(8, 3, cap);
    assert.deepEqual(cap.bounds, [3], '人妻分母 3');
    assert.equal(
      fixture.store.get('talent:8:140'),
      expect_set ? 1 : undefined,
      `RAND:3 = ${roll}`,
    );
  }
});

test('cmi_mom_complex：父性 → 恋父情结（掷 RAND:2）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:156', 1); // 亲本「父性」
  const { cmi_mom_complex } = load(fixture);
  cmi_mom_complex(8, 3, seq([1]));
  assert.equal(fixture.store.get('talent:8:141'), 1, '恋父情结');
});

test('cmi_mom_complex：未熟/娇小且掷中 → 按亲本性别分派正太控或萝莉控', () => {
  // 父亲未熟娇小（亲本为男性）→ 正太控
  const dad = create_era_fixture();
  dad.store.set('talent:3:135', 1); // 「未熟」
  dad.store.set('talent:3:122', 1); // 亲本男性
  const { cmi_mom_complex } = load(dad);
  cmi_mom_complex(8, 3, seq([1]));
  assert.equal(dad.store.get('talent:8:143'), 1, '正太控');

  // 亲本为扶她同样落正太控
  const futa = create_era_fixture();
  futa.store.set('talent:3:100', 1); // 「娇小」
  futa.store.set('talent:3:121', 1); // 亲本扶她
  const { cmi_mom_complex: run_futa } = load(futa);
  run_futa(8, 3, seq([1]));
  assert.equal(futa.store.get('talent:8:143'), 1, '扶她亲本 → 正太控');

  // 母亲未熟娇小（非男性非扶她）→ 萝莉控
  const mom = create_era_fixture();
  mom.store.set('talent:3:135', 1);
  const { cmi_mom_complex: run_mom } = load(mom);
  run_mom(8, 3, seq([1]));
  assert.equal(mom.store.get('talent:8:142'), 1, '萝莉控');
});

test('cmi_mom_complex：未熟娇小的掷骰是 RAND:3 且恰 == 1', () => {
  for (const [roll, set] of [
    [0, false],
    [1, true],
    [2, false],
  ]) {
    const fixture = create_era_fixture();
    fixture.store.set('talent:3:135', 1);
    fixture.store.set('talent:3:122', 1);
    const { cmi_mom_complex } = load(fixture);
    const cap = seq_capture([roll]);
    cmi_mom_complex(8, 3, cap);
    assert.deepEqual(cap.bounds, [3]);
    assert.equal(fixture.store.get('talent:8:143'), set ? 1 : undefined);
  }
});

test('cmi_mom_complex：亲本无任何相关素质时不掷任何骰', () => {
  const fixture = create_era_fixture();
  const { cmi_mom_complex } = load(fixture);
  const cap = seq_capture([]);
  cmi_mom_complex(8, 3, cap);
  assert.deepEqual(cap.bounds, [], '四条件全不成立');
});

// —— @CMI_CONFLICT_CHECK（:127-166）——

test('cmi_conflict_check：PAIRS 表逐对检查——两侧都有时随机消掉一个', () => {
  const fixture = create_era_fixture();
  // :133-151 的 PAIRS 常量表首对 10/12
  fixture.store.set('talent:8:10', 1);
  fixture.store.set('talent:8:12', 1);
  const { cmi_conflict_check } = load(fixture);
  const cap = seq_capture([1]);
  assert.equal(cmi_conflict_check(8, cap), 8, ':166 RETURN L_A');
  assert.deepEqual(cap.bounds, [2], '消哪个是 RAND:2');
  // :157-162 真值支清 L_I（本对前一项，PAIRS:(L_II*2)）
  assert.equal(fixture.store.get('talent:8:10'), 0, 'RAND:2 = 1 消前者');
  assert.equal(fixture.store.get('talent:8:12'), 1, '后者保留');
});

test('cmi_conflict_check：RAND:2 = 0 消后者（与真值支对称）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:8:10', 1);
  fixture.store.set('talent:8:12', 1);
  const { cmi_conflict_check } = load(fixture);
  cmi_conflict_check(8, seq([0]));
  assert.equal(fixture.store.get('talent:8:10'), 1);
  assert.equal(fixture.store.get('talent:8:12'), 0);
});

test('cmi_conflict_check：只有一侧有素质时不动它（与门是 AND）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:8:10', 1);
  const { cmi_conflict_check } = load(fixture);
  const cap = seq_capture([]);
  cmi_conflict_check(8, cap);
  assert.deepEqual(cap.bounds, [], '不掷');
  assert.equal(fixture.store.get('talent:8:10'), 1);
});

test('cmi_conflict_check：PAIRS 表逐对标量抽查（多对同时命中时的遍历次数）', () => {
  // 造三对同时命中：10/12、11/13、14/16 → 三次 RAND:2
  const fixture = create_era_fixture();
  for (const index of [10, 12, 11, 13, 14, 16]) {
    fixture.store.set(`talent:8:${index}`, 1);
  }
  const { cmi_conflict_check } = load(fixture);
  const cap = seq_capture([1, 0, 1]);
  cmi_conflict_check(8, cap);
  assert.deepEqual(cap.bounds, [2, 2, 2], '三对三掷');
  assert.deepEqual(
    [10, 12, 11, 13, 14, 16].map((i) => fixture.store.get(`talent:8:${i}`)),
    [0, 1, 1, 0, 0, 1],
    '逐对按掷出的方向消一个（1→消左、0→消右）',
  );
});

// PAIRS 的期望表（独立照抄原作 CHARA_MAKE_INHERIT.ERB:133-150 的
// `#DIM CONST PAIRS`，64 组 / 128 个数）。**必须独立照抄、不从实现里读**：
// 这张表是维度型结构，只抽查表头时表尾改了不红（#384 返工实测：
// `122, 109, 122, 110` → `122, 111` 无人拦）。
const EXPECTED_PAIRS = [
  10, 12, 11, 13, 14, 16, 15, 17, 17, 18, 20, 23, 21, 23, 22, 23, 20, 63, 21,
  63, 22, 63, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 40, 41, 42, 43,
  44, 45, 50, 51, 61, 62, 62, 64, 70, 71, 79, 80, 79, 81, 79, 82, 79, 122, 80,
  81, 80, 82, 81, 82, 99, 100, 101, 102, 103, 104, 105, 106, 103, 122, 104, 122,
  107, 108, 111, 112, 109, 110, 109, 114, 109, 116, 119, 109, 119, 116, 119,
  114, 119, 110, 122, 109, 122, 110, 122, 114, 122, 116, 122, 119, 110, 114,
  110, 116, 114, 116, 121, 122, 153, 154, 99, 263, 153, 122, 154, 122, 130, 122,
  155, 122, 157, 122, 60, 150, 82, 143,
];
/** 期望表展平成 `[左, 右]` 二元组 */
function expected_pairs() {
  const out = [];
  for (let i = 0; i < EXPECTED_PAIRS.length; i += 2) {
    out.push([EXPECTED_PAIRS[i], EXPECTED_PAIRS[i + 1]]);
  }
  return out;
}

test('cmi_conflict_check：PAIRS 全表逐组——两侧置位时恰好消掉约定的一侧', () => {
  const pairs = expected_pairs();
  assert.equal(pairs.length, 64, '原作 CONST PAIRS 是 64 组');
  assert.equal(
    new Set(pairs.map(([a, b]) => `${a},${b}`)).size,
    pairs.length,
    '期望表自身不含重复对（含反向重复）',
  );

  // 共用一个夹具（128 组断言造 128 个夹具太慢），每组做完清干净；下一组的
  // `bounds` 恰好等于 [2] 本身就是「没有残留冲突」的自证——留了尾巴就会是
  // [2, 2]。
  const fixture = create_era_fixture();
  const { cmi_conflict_check } = load(fixture);
  for (const [left, right] of pairs) {
    for (const [roll, cleared, kept] of [
      [1, left, right], // :158-159 RAND:2 真值支清 L_I（本对前一项）
      [0, right, left], // :160-161 假值支清 L_J（后一项）
    ]) {
      fixture.store.set(`talent:8:${left}`, 1);
      fixture.store.set(`talent:8:${right}`, 1);
      const cap = seq_capture([roll]);
      cmi_conflict_check(8, cap);
      assert.deepEqual(cap.bounds, [2], `(${left},${right}) 恰好一掷`);
      assert.equal(
        fixture.store.get(`talent:8:${cleared}`),
        0,
        `(${left},${right}) RAND:2 = ${roll} 消 ${cleared}`,
      );
      assert.equal(
        fixture.store.get(`talent:8:${kept}`),
        1,
        `(${left},${right}) RAND:2 = ${roll} 留 ${kept}`,
      );
      fixture.store.set(`talent:8:${left}`, 0);
      fixture.store.set(`talent:8:${right}`, 0);
    }
  }
});

test('cmi_conflict_check：穷举全表下标域——只有表内的组合会掷骰', () => {
  // 表驱动 + 穷举：把期望表里出现过的下标两两配齐（含表内、表外两类），
  // 逐组断言「掷骰 ⇔ 该组在表内」。任何一处数字写错、漏一对、多一对，
  // 都会在对应的那一格上红——表内容自此完整被守，而不是只守表头。
  const pairs = expected_pairs();
  // 键一律取排序后的形态：表内有两对是「大下标在前」写的（119,109 与
  // 122,109 一族），而判定只看两侧是否置位、与书写次序无关（清哪一侧才看
  // 次序，那由上面那条逐组用例钉）。
  const key_of = ([a, b]) => (a < b ? `${a},${b}` : `${b},${a}`);
  const in_table = new Set(pairs.map(key_of));
  const universe = [...new Set(EXPECTED_PAIRS)].sort((a, b) => a - b);

  const fixture = create_era_fixture();
  const { cmi_conflict_check } = load(fixture);
  let fired = 0;
  for (let i = 0; i < universe.length; i += 1) {
    for (let j = i + 1; j < universe.length; j += 1) {
      const left = universe[i];
      const right = universe[j];
      fixture.store.set(`talent:8:${left}`, 1);
      fixture.store.set(`talent:8:${right}`, 1);
      const cap = seq_capture([]);
      cmi_conflict_check(8, cap);
      const key = key_of([left, right]);
      assert.deepEqual(
        cap.bounds,
        in_table.has(key) ? [2] : [],
        `(${left},${right}) 掷骰次数（表内组合才该掷）`,
      );
      fixture.store.set(`talent:8:${left}`, 0);
      fixture.store.set(`talent:8:${right}`, 0);
      if (cap.bounds.length > 0) fired += 1;
    }
  }
  assert.equal(fired, pairs.length, '整域里的命中数恰等于表长');
});

test('cmi_conflict_check：表外下标一起置位不构成任何冲突', () => {
  // 上一条穷举只覆盖期望表的下标域；这里把域外的下标**整片**置位（0-500
  // 里凡不在表内的全给 1），若实现在表外多出一对，这一条会红。
  const in_table_universe = new Set(EXPECTED_PAIRS);
  const fixture = create_era_fixture();
  for (let index = 0; index <= 500; index += 1) {
    if (!in_table_universe.has(index)) {
      fixture.store.set(`talent:8:${index}`, 1);
    }
  }
  const { cmi_conflict_check } = load(fixture);
  const cap = seq_capture([]);
  cmi_conflict_check(8, cap);
  assert.deepEqual(cap.bounds, [], '表外下标一律不掷');
  assert.equal(fixture.store.get('talent:8:1'), 1, '也不消任何一侧');
});

// —— @CHARA_MAKE_INHERIT 的调度（:4-67）——

test('chara_make_inherit：负亲本（L_B < 0）直接 RETURN，不写任何继承结果（:11-12）', () => {
  // 子代预先带一个素质值——一旦守卫失效、继续往下执行，:20-21 段会把它
  // 覆盖成 `talent:-1:20`（未声明的负亲本，读回 undefined），从而可观察。
  const fixture = create_era_fixture();
  fixture.store.set('talent:8:20', 42);
  const { chara_make_inherit } = load(fixture);
  const result = chara_make_inherit(8, -1, -1, () => 1);
  assert.equal(result, 8, '仍原样返回子代 ID');
  assert.equal(
    fixture.store.get('talent:8:20'),
    42,
    '负亲本直接 RETURN，子代已有素质值原样保留',
  );
});

test('chara_make_inherit：继承候选表的四段与两类排除（每个区间各一侧）', () => {
  // 亲本每个候选下标都置 1，掷骰恒真值（`() => 1` = RAND:N 非零），
  // 于是「子代拿到了哪些下标」就是候选表本身（再扣掉冲突检查消掉的那几个）。
  const fixture = create_era_fixture();
  const parent = 2;
  const candidates = [];
  for (let i = 10; i < 153; i += 1) candidates.push(i);
  for (let i = 240; i < 264; i += 1) candidates.push(i);
  for (let i = 275; i < 280; i += 1) candidates.push(i);
  for (let i = 300; i < 314; i += 1) candidates.push(i);
  for (const index of candidates) {
    fixture.store.set(`talent:${parent}:${index}`, 1);
  }
  const { chara_make_inherit } = load(fixture);
  chara_make_inherit(8, parent, -1, () => 1);

  // 段内非排除项必须到位（每段取首尾）
  // 10 与 263 除外：它们在 PAIRS 的 (10,12) 与 (99,263) 里，而这一轮两边都被
  // 继承（恒真掷骰），于是冲突检查必然消一个（见下一条用例），不能作为
  // 「必到位」样例；19 不在任何互斥对里，用它代表 10-152 段的普通成员。
  for (const index of [19, 152, 240, 262, 275, 279, 300, 313]) {
    assert.equal(
      fixture.store.get(`talent:8:${index}`),
      1,
      `候选段成员 ${index} 应被继承`,
    );
  }
  // :18 与 :35 的排除项一律不继承
  for (const index of [74, 78, 121, 123, 130, 143, 85, 244, 247, 254]) {
    assert.notEqual(
      fixture.store.get(`talent:8:${index}`),
      1,
      `排除项 ${index} 不得被继承`,
    );
  }
  // 段外边界：73 与 153 不在候选段内（153-239 整段无继承）
  for (const index of [153, 239]) {
    assert.equal(fixture.store.get(`talent:8:${index}`), undefined);
  }
});

test('chara_make_inherit：私处封印裸写命中的是 TARGET（:24-25）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:8:122', 1); // 子代「男人」
  fixture.store.set('talent:8:273', 1); // 子代私处封印
  fixture.store.set('flag:10005', 9); // TARGET = 9
  fixture.store.set('talent:9:273', 1); // TARGET 的私处封印
  const { chara_make_inherit } = load(fixture);
  chara_make_inherit(8, 2, -1, () => 1);
  assert.equal(fixture.store.get('talent:8:273'), 1, 'L_A（子代）不被裸写命中');
  assert.equal(fixture.store.get('talent:9:273'), 0, '裸 TALENT 写 TARGET');
});

test('chara_make_inherit：处女且非男性非扶她时不写私处封印', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:8:0', 1); // 子代「处女」
  fixture.store.set('talent:9:273', 1); // TARGET 的私处封印
  fixture.store.set('flag:10005', 9);
  const { chara_make_inherit } = load(fixture);
  chara_make_inherit(8, 2, -1, () => 1);
  assert.equal(fixture.store.get('talent:9:273'), 1, '三个条件都不成立 → 不动');
});

test('chara_make_inherit：恋母情结段随第二亲本存在与否决定调用次数', () => {
  // 双亲：CMI_MOM_COMPLEX 对两个亲本各调一次（母性 → RAND:2）
  // 恒真掷骰：10-152 段会把母性（155）也抄给子代，故清掉子代侧的输入，
  // 让「子代有没有 140」只反映这一段的调用
  const two = create_era_fixture();
  two.store.set('talent:2:155', 1); // 亲本 2 母性
  const { chara_make_inherit } = load(two);
  chara_make_inherit(8, 2, 3, () => 1);
  assert.equal(two.store.get('talent:8:140'), 1, '亲本 A 的母性设了恋母情结');

  // 第二亲本的母性只由 :29-30 的守卫决定是否被看到：单亲时不看 L_C
  const one = create_era_fixture();
  one.store.set('talent:3:155', 1); // 只有第二亲本有母性
  const { chara_make_inherit: run_one } = load(one);
  run_one(8, 2, -1, () => 1);
  assert.equal(
    one.store.get('talent:8:140'),
    undefined,
    'L_C < 0 时 :29 的守卫挡住第二次调用',
  );

  // 守卫的边界在 0 那一侧（判据是 `L_C >= 0`，不是 `> 0`）：魔王当第二亲本
  // （L_C = 0）仍算「有第二亲本」。亲本 A 不带母性，140 只可能来自第二次调用
  const king = create_era_fixture();
  king.store.set('talent:0:155', 1); // 魔王（0）母性
  const { chara_make_inherit: run_king } = load(king);
  run_king(8, 2, 0, () => 1);
  assert.equal(
    king.store.get('talent:8:140'),
    1,
    'L_C = 0 仍算双亲，第二次调用照走',
  );
});

test('chara_make_inherit：精英特技 470-488 段只在亲本自身有该素质时继承', () => {
  // 亲本 2 是精英且持有 470/471；亲本 3 是精英且持有 480
  const fixture = create_era_fixture();
  fixture.store.set('talent:2:220', 1); // 精英
  fixture.store.set('talent:2:470', 1);
  fixture.store.set('talent:2:471', 1);
  fixture.store.set('talent:3:220', 1);
  fixture.store.set('talent:3:480', 1);
  const { chara_make_inherit } = load(fixture);
  chara_make_inherit(8, 2, 3, () => 1);
  assert.equal(fixture.store.get('talent:8:470'), 1, '亲本 A 的 470');
  assert.equal(fixture.store.get('talent:8:471'), 1, '亲本 A 的 471');
  assert.equal(fixture.store.get('talent:8:480'), 1, '亲本 B 的 480');
  assert.notEqual(fixture.store.get('talent:8:472'), 1, '亲本没持有的不继承');

  // 两个亲本都不是精英 → 470 段整段跳过
  const plain = create_era_fixture();
  plain.store.set('talent:2:470', 1); // 有素质但不是精英
  const { chara_make_inherit: run_plain } = load(plain);
  run_plain(8, 2, -1, () => 1);
  assert.notEqual(
    plain.store.get('talent:8:470'),
    1,
    '非精英不进 470 段（470 段只由 :51 的精英守卫放行）',
  );
});

test('chara_make_inherit：三处委托都接到真身（素质真被继承、冲突真被清理）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:2:20', 3); // 亲本素质（：20-21 段）
  fixture.store.set('talent:2:10', 1); // 冲突对 10/12 —— 两侧都由亲本带过来
  fixture.store.set('talent:2:12', 1);
  const { chara_make_inherit } = load(fixture);
  // 掷骰恒 1（真值）：10-152 段全部走「3/4 命中」并抄 L_B
  const result = chara_make_inherit(8, 2, -1, () => 1);
  assert.equal(result, 8);

  // CMI_SETTALENT 真身：素质 20 真的从亲本抄了过来
  assert.equal(fixture.store.get('talent:8:20'), 3, '继承真身已生效');

  // CMI_CONFLICT_CHECK 真身：子代同时拿到 10 与 12（互斥对），消掉一侧。
  // 掷骰恒 1（RAND:2 非零）走 `TALENT:L_A:L_I = 0` 那一支 → 消左侧 10
  assert.equal(
    fixture.store.get('talent:8:10'),
    0,
    '冲突检查真身已生效（消左）',
  );
  assert.equal(fixture.store.get('talent:8:12'), 1, '右侧保留');
});
