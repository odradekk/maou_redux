/**
 * ere/chara/chara-first-exp.js @CHARA_FIRST_EXP 的行为测试（issue #394，N10）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）+ 函数的 `rand`
 * 形参（原作 `RAND:N` 的随机源，缺省均匀随机）。
 *
 * 随机源的三档用法：
 *   - never = () => 1：所有 `== 0` 判定不中（`> 0` 判定命中）；
 *   - always = () => 0：所有 `== 0` 判定命中；
 *   - hit_nth(n, k)：只让「第 k 次（0 基）分母为 n 的掷骰」返回 0——位次按
 *     `never` 路径上的序列数（该路径下每条链都走到尾），因此不受别的分母、
 *     也不受同分母更早的掷骰影响（这正是 chara-make.test.js 的
 *     position_roll 取「分母 + 位次」而非「绝对位次」的理由）。
 *
 * 被测量的是四个产物（CFLAG:15/16 与 CSTR:3/4）与掷骰序（分母序列）——
 * 后者是分支结构的直接观测面，若干「这一段有没有掷」的判据只能由它回答。
 *
 * 注意两处无掷的「兜底」：`:588-591`（无条件把候选写成初吻对象名）与
 * `:593-597`（无条件把候选写成初体验对象名，随后把未定的初体验补成 100）。
 * 只要 `not_virgin()`（TALENT:0 == 0）成立且初体验为 0，初体验就必定被这两行
 * 接手——要观测别的分支必须先把初体验从 0 上挪开。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-first-exp').chara_first_exp;
}

/** RAND:N == 1（恒不中 == 0 判定） */
const never = () => 1;
/** RAND:N == 0（恒中） */
const always = () => 0;

/** 只让「第 occurrence 次（0 基）分母为 denominator 的掷骰」返回 0 */
function hit_nth(denominator, occurrence) {
  let seen = 0;
  return (n) => {
    if (n !== denominator) return 1;
    const at = seen === occurrence;
    seen += 1;
    return at ? 0 : 1;
  };
}

/**
 * 组合多条 hit 规则：任一条命中即返回 0。
 * **每条规则都要被调用**（不能用 `some` 短路）——各规则自带计数器，漏调用
 * 会让后面的规则位次整体前移一位。
 */
function hits(...rules) {
  return (n) => {
    const values = rules.map((rule) => rule(n));
    return values.includes(0) ? 0 : 1;
  };
}

/** 所有 RAND:2 都命中 */
const all_2 = (n) => (n === 2 ? 0 : 1);

/**
 * 按「分母 : 第几次（0 基）」指定该次掷骰的返回值，形如
 * `{ 3: { 0: 2 } }` = 第 0 次 RAND:3 返回 2。未登记的掷一律返回 1（不中）。
 * 比 hit_nth 多一档「返回 1 以外的值」，给 SELECTCASE 的 CASEELSE 用。
 */
function script(spec) {
  const used = new Map();
  return (n) => {
    const i = used.get(n) ?? 0;
    used.set(n, i + 1);
    return spec[n]?.[i] ?? 1;
  };
}

/**
 * 建一名已入场的角色（cid 1）。`state` 直接覆盖 store 里的变量，省掉每个
 * 用例重复的初值铺垫。
 */
function setup(state = {}) {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '预设名', callname: '预设称呼' });
  fixture.era.addCharacter(1);
  // 默认：两项产物都是「未初始化」，性别与家族都不设 → 家族段与兽姦段全跳过
  fixture.store.set('cflag:1:16', -1);
  fixture.store.set('cflag:1:15', -1);
  fixture.store.set('talent:1:0', 1); // 処女（不是「非処女」）
  for (const [name, value] of Object.entries(state)) {
    fixture.store.set(name, value);
  }
  return fixture;
}

/** 跑一次并记录掷骰序 */
function run(fixture, rand) {
  const calls = [];
  const spy = (n) => {
    calls.push(n);
    return rand(n);
  };
  load(fixture)(1, spy);
  return calls;
}

/** 四项产物的当前值 */
function product(fixture) {
  return {
    kiss: fixture.store.get('cflag:1:16'),
    kiss_name: fixture.store.get('cstr:1:4'),
    sex: fixture.store.get('cflag:1:15'),
    sex_name: fixture.store.get('cstr:1:3'),
  };
}

// —— 初值与写回（:14-19 / :664-667） ——

test('四项产物写回各自的 CFLAG / CSTR（:664-667）', () => {
  const fixture = setup({
    'cflag:1:16': 401, // 初吻：肛门
    'cstr:1:4': '青梅竹马',
    'cflag:1:15': 103, // 初体验：野良犬
    'cstr:1:3': '野狗',
  });
  run(fixture, never);

  assert.deepEqual(
    product(fixture),
    { kiss: 401, kiss_name: '青梅竹马', sex: 103, sex_name: '野狗' },
    '初值原样写回，没有串到别的槽位',
  );
});

test('四项产物恰好写这四个槽（:664-667）', () => {
  const fixture = setup();
  run(fixture, never);
  const written = fixture.var_writes
    .map((write) => write.name)
    .filter((name) => /^(cflag|cstr):1:(3|4|15|16)$/.test(name));
  assert.deepEqual(
    [...new Set(written)].sort(),
    ['cflag:1:15', 'cflag:1:16', 'cstr:1:3', 'cstr:1:4'],
    '写点就是产物四处，没有多写的槽',
  );
});

test('全跳过路径的掷骰序：初吻/初体验都非 0 时只有 :477-585 两段（:29/:199/:215 的守卫）', () => {
  const fixture = setup({ 'cflag:1:16': 401, 'cflag:1:15': 103 });
  const calls = run(fixture, never);
  assert.deepEqual(
    calls,
    [3, 3, 2, 3],
    ':477 三选 RAND:3 + 预约部位 [3,2] + :550 三选 RAND:3',
  );
  assert.deepEqual(
    product(fixture),
    { kiss: 401, kiss_name: '', sex: 103, sex_name: '' },
    '两处「采纳」都因初值非 0 而跳过',
  );
});

// —— :22-26 两处「未体验」修正 ——

test(':22-23 不是男人 + 非处女 + FIRST_SEX == -1 → 拉回 0（随后被 :596 补成 100）', () => {
  const rows = [
    { male: 0, virgin: 0, first_sex: -1, fired: true },
    { male: 0, virgin: 1, first_sex: -1, fired: false },
    { male: 1, virgin: 0, first_sex: -1, fired: false },
  ];
  for (const row of rows) {
    const fixture = setup({
      'talent:1:122': row.male,
      'talent:1:0': row.virgin, // 1 = 処女
      'cflag:1:15': row.first_sex,
      'cflag:1:16': 401, // 初吻非 0：只观察初体验侧
    });
    run(fixture, never);
    assert.equal(
      product(fixture).sex,
      row.fired ? 100 : -1,
      `male=${row.male} virgin=${row.virgin}：${row.fired ? '判据成立 → 0 → :596 补 100' : '判据不成立 → 保持 -1'}`,
    );
  }
});

test(':25-26 性交经验或卖春经验 + FIRST_KISS == -1 → 拉回 0（|| 的两侧表驱动）', () => {
  const rows = [
    { sex_exp: 0, sale_exp: 0, fired: false },
    { sex_exp: 1, sale_exp: 0, fired: true },
    { sex_exp: 0, sale_exp: 1, fired: true },
    { sex_exp: 1, sale_exp: 1, fired: true },
  ];
  for (const row of rows) {
    const fixture = setup({
      'cflag:1:16': -1,
      'exp:1:5': row.sex_exp, // 性交经验
      'exp:1:74': row.sale_exp, // 卖淫经验
    });
    run(fixture, never);
    // 判据成立 → -1 变 0 → :588 采纳候选 → :644 落到嘴唇；不成立 → 保持 -1
    assert.equal(
      product(fixture).kiss,
      row.fired ? 1 : -1,
      `性交=${row.sex_exp} 卖春=${row.sale_exp}`,
    );
  }
});

// —— :29-48 兽姦三连 ——

test('兽姦三连：部位 996 / 997 / 998 与三档概率（表驱动）', () => {
  const rows = [
    { denominator: 20, point: 996 }, // 极稀有：野良犬的肛门
    { denominator: 10, point: 997 }, // 稀有：野良犬的阴茎
    { denominator: 5, point: 998 }, // 常见：野良犬的口
  ];
  for (const row of rows) {
    // 只有该档的分母命中 → 该档生效
    const fixture = setup({ 'cflag:1:16': 0, 'exp:1:56': 1 }); // 兽奸经验
    run(fixture, (n) => (n === row.denominator ? 0 : 1));
    assert.equal(
      product(fixture).kiss,
      row.point,
      `RAND:${row.denominator} 命中 → 部位 ${row.point}`,
    );

    // 该档不中 → 部位不动（后续两档也因 FIRST_KISS != 0 被跳过）
    const miss = setup({ 'cflag:1:16': 0, 'exp:1:56': 1 });
    run(miss, never);
    assert.notEqual(product(miss).kiss, row.point, '不中则不设该部位');
  }
});

test('兽姦三连的后两档被前一档挡下（:36/:43 的 FIRST_KISS == 0 判据）', () => {
  const fixture = setup({ 'cflag:1:16': 0, 'exp:1:56': 1 });
  const calls = run(fixture, (n) => (n === 20 ? 0 : 1));
  assert.deepEqual(
    calls.filter((n) => n === 20 || n === 10 || n === 5),
    [20],
    '只有第一档掷了',
  );
});

test('兽姦命中且非处女时初体验落到 103（:32-33 的两侧）', () => {
  const hit = setup({
    'cflag:1:16': 0,
    'cflag:1:15': 0,
    'talent:1:0': 0, // 非処女
    'exp:1:56': 1,
  });
  run(hit, (n) => (n === 20 || n === 2 ? 0 : 1));
  assert.equal(product(hit).sex, 103, '野良犬的初体验');

  const virgin = setup({
    'cflag:1:16': 0,
    'cflag:1:15': 0,
    'talent:1:0': 1, // 処女
    'exp:1:56': 1,
  });
  run(virgin, (n) => (n === 20 || n === 2 ? 0 : 1));
  assert.equal(
    product(virgin).sex,
    0,
    '处女不走野良犬初体验（:22-23 也不动它）',
  );
});

test('兽奸经验的判据（:29/:36/:43 的第三个条件）两侧', () => {
  const with_exp = setup({ 'cflag:1:16': 0, 'exp:1:56': 1 });
  const calls_with = run(with_exp, never);
  assert(
    calls_with.includes(20) &&
      calls_with.includes(10) &&
      calls_with.includes(5),
    '有兽奸经验 → 三档都掷',
  );

  const without = setup({ 'cflag:1:16': 0, 'exp:1:56': 0 });
  const calls_without = run(without, never);
  assert(
    !calls_without.includes(20) &&
      !calls_without.includes(10) &&
      !calls_without.includes(5),
    '无兽奸经验 → 三档都不掷（也不掷家族段的 20/10/5）',
  );
});

test('兽姦三连要求初吻未定且称呼为空（:29 前两个条件的表驱动）', () => {
  const rows = [
    { kiss: -1, name: '', why: '初吻 -1 不参与兽姦段' },
    { kiss: 0, name: '已有', why: '已有称呼不参与兽姦段' },
  ];
  for (const row of rows) {
    const fixture = setup({
      'cflag:1:16': row.kiss,
      'cstr:1:4': row.name,
      'exp:1:56': 1,
    });
    const calls = run(fixture, (n) => (n === 5 ? 0 : 1));
    assert(!calls.includes(5), row.why);
  }
});

// —— :58-196 家族段 ——

test('家族段：婚姻状态 × 性别数字位 = 表驱动（:64-130 的三臂全覆盖）', () => {
  const states = [
    { code: 1, labels: ['丈夫', '扶她妻子', '妻子'] },
    { code: 2, labels: ['前夫', '前扶她妻子', '前妻'] },
    { code: 3, labels: ['丈夫', '扶她妻子', '妻子'] },
    { code: 4, labels: ['前夫', '前扶她妻子', '前妻'] },
    { code: 5, labels: ['亡夫', '亡妻（扶她）', '亡妻'] },
  ];
  // CASE 0,4,8 → 男；CASE 1,5,7 → 扶她；CASEELSE → 女
  const digits = [0, 4, 8, 1, 5, 7, 2, 3, 6, 9];
  const branch_of = (digit) =>
    [0, 4, 8].includes(digit) ? 0 : [1, 5, 7].includes(digit) ? 1 : 2;
  for (const state of states) {
    for (const digit of digits) {
      const fixture = setup({
        'cflag:1:16': 0,
        // TALENT:320 家族构成：个位 1 = 有家族设定、万位 = 婚姻状态、
        // 十亿位 = 配偶性别数字位（:53 / :61-62）
        'talent:1:320': 1 + state.code * 10000 + digit * 1e9,
      });
      run(fixture, all_2);
      assert.equal(
        product(fixture).kiss_name,
        state.labels[branch_of(digit)],
        `婚姻 ${state.code} × 数字位 ${digit}`,
      );
    }
  }
});

test('家族段未列出的婚姻状态不产生配偶候选（:64 的 SELECTCASE 无 CASEELSE）', () => {
  const labels = [
    '丈夫',
    '扶她妻子',
    '妻子',
    '前夫',
    '前扶她妻子',
    '前妻',
    '亡夫',
    '亡妻（扶她）',
    '亡妻',
  ];
  for (const code of [0, 6, 9]) {
    const fixture = setup({
      'cflag:1:16': 0,
      'talent:1:320': 1 + code * 10000,
    });
    run(fixture, always);
    assert(
      !labels.includes(product(fixture).kiss_name),
      `婚姻状态 ${code} 未列举 → 不给出配偶称呼`,
    );
    // 婚姻状态占的是万位，它的高位数字不该被别的亲属位读到（位数截取不串味）
    assert.equal(
      product(fixture).kiss_name,
      '亲爹',
      `婚姻状态 ${code} 不占兄弟姊妹位 → 由父收尾`,
    );
  }
});

test('家族段的各位数字互不串味：只置某一个亲属位（:133-194 的四个截取）', () => {
  // 每行只置一位、其余位为零：被置的亲属胜出，说明它读的正是自己那一位
  const rows = [
    { name: '兄位 1e6', place: 1e6, label: '亲哥哥' },
    { name: '弟位 1e8', place: 1e8, label: '亲弟弟' },
    { name: '姉位 1e5', place: 1e5, label: '亲姐姐' },
    { name: '妹位 1e7', place: 1e7, label: '亲妹妹' },
  ];
  for (const row of rows) {
    const fixture = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 + row.place });
    run(fixture, always);
    assert.equal(product(fixture).kiss_name, row.label, row.name);
  }

  // 个位改取十位时这组状态必须变脸：十位非零的家族码在正确判据下仍是「有家族设定」
  const tens = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 + 1e6 + 10 });
  run(tens, always);
  assert.equal(
    product(tens).kiss_name,
    '亲哥哥',
    '十位非零不影响个位的家族设定判据',
  );
});

test('家族段亲属六项：表驱动（:132-194）', () => {
  // 父与母排在最后两格，母要等父的两条判据都不中才轮到（:177-194 的链式 ELSEIF）
  const rows = [
    { name: '兄', place: 1e6, label: '亲哥哥', gender: 1, rand: always },
    { name: '弟', place: 1e8, label: '亲弟弟', gender: 1, rand: always },
    { name: '姉', place: 1e5, label: '亲姐姐', gender: 2, rand: always },
    { name: '妹', place: 1e7, label: '亲妹妹', gender: 2, rand: always },
    { name: '父', place: null, label: '亲爹', gender: 1, rand: always },
    {
      name: '母',
      place: null,
      label: '亲妈',
      gender: 2,
      // 父的 RAND:20 不中、母的命中；hit_nth(3,0) 让 :477 的三选与它后面那条
      // 预约链都命中（与 always 下的兄/姉同款），把 KISS_POINT 定在 101
      rand: hits(all_2, hit_nth(20, 1), hit_nth(3, 0)),
    },
  ];
  for (const row of rows) {
    const fixture = setup({
      'cflag:1:16': 0,
      // 有家族设定、婚姻状态为空（0）→ 婚姻段不动候选，亲属段接手
      'talent:1:320': 1 + (row.place ?? 0),
    });
    run(fixture, row.rand);
    assert.equal(product(fixture).kiss_name, row.label, `${row.name}命中`);
    // 性别一路传到初吻部位：:542 先把预约的 101（ペニス）落下来，随后
    //   - 对象是男 1 → :637 的 `FIRST_KISS < 300 && MEN_OR_GIRL:1 == 2` 不成立 → 保 101；
    //   - 对象是女 2 → :637 白纸成 0，:643 的 RAND:30 不中（`> 0` 为假）→ 落アナル 401。
    assert.equal(
      product(fixture).kiss,
      row.gender === 1 ? 101 : 401,
      `${row.name}的性别经 :637 白纸规则后的落点`,
    );
  }
});

test('亲属段的位置位为零时该亲属不出场（:136/:145/:158/:167 的 LOCAL:1 > 0）', () => {
  const rows = [
    { name: '兄', place: 1e6 },
    { name: '弟', place: 1e8 },
    { name: '姉', place: 1e5 },
    { name: '妹', place: 1e7 },
  ];
  for (const row of rows) {
    const with_place = setup({
      'cflag:1:16': 0,
      'talent:1:320': 1 + row.place,
    });
    run(with_place, always);
    assert.notEqual(
      product(with_place).kiss_name,
      '',
      `${row.name}位非零 → 出场`,
    );

    const without = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 });
    run(without, always);
    assert.equal(
      product(without).kiss_name,
      '亲爹',
      `${row.name}位为零 → 轮到父`,
    );
  }
});

test('前面的亲属已给出候选时后面的不再掷（:136 的 LOCALS:2 == "" 链）', () => {
  const fixture = setup({
    'cflag:1:16': 0,
    'talent:1:320': 1 + 1e6 + 1e8, // 兄与弟都在场
  });
  run(fixture, always);
  assert.equal(product(fixture).kiss_name, '亲哥哥', '兄先命中即停');
});

test('三个「控」加成分支（:148-152 / :170-174 / :180-184 / :190-194）', () => {
  const rows = [
    { talent: 143, place: 1e8, label: '亲弟弟', hint: '正太控' },
    { talent: 142, place: 1e7, label: '亲妹妹', hint: '萝莉控' },
  ];
  for (const row of rows) {
    // 持有该控 + RAND:20 全不中、RAND:5 命中 → 加成支；
    // all_2 让 :199 的采纳掷命中，候选才进得了产物
    const on = setup({
      'cflag:1:16': 0,
      'talent:1:320': 1 + row.place,
      [`talent:1:${row.talent}`]: 1,
    });
    run(
      on,
      hits(all_2, (n) => (n === 5 ? 0 : 1)),
    );
    assert.equal(product(on).kiss_name, row.label, `${row.hint}加成支`);

    // 未持有 → RAND:5 命中也不加成（含 :149 的 TALENT 判据）
    const off = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 + row.place });
    run(
      off,
      hits(all_2, (n) => (n === 5 ? 0 : 1)),
    );
    assert.notEqual(
      product(off).kiss_name,
      row.label,
      `${row.hint}未持有则不加成`,
    );
  }

  const father = setup({
    'cflag:1:16': 0,
    'talent:1:320': 1,
    'talent:1:141': 1, // 恋父情结
  });
  run(
    father,
    hits(all_2, (n) => (n === 10 ? 0 : 1)),
  );
  assert.equal(product(father).kiss_name, '亲爹', '恋父情结加成支');

  const mother = setup({
    'cflag:1:16': 0,
    'talent:1:320': 1,
    'talent:1:140': 1, // 恋母情结
  });
  run(
    mother,
    hits(all_2, (n) => (n === 10 ? 0 : 1)),
  );
  assert.equal(product(mother).kiss_name, '亲妈', '恋母情结加成支');

  // 两个加成支的反面：未持有该控时 RAND:10 命中也不加成
  for (const row of [
    { talent: 141, label: '亲爹' },
    { talent: 140, label: '亲妈' },
  ]) {
    const off = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 });
    run(
      off,
      hits(all_2, (n) => (n === 10 ? 0 : 1)),
    );
    assert.notEqual(
      product(off).kiss_name,
      row.label,
      `未持有 ${row.talent} 则不加成`,
    );
  }
});

test('家族段只在个位为 1 时展开（:58 的两侧）', () => {
  const on = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 + 1e6 });
  assert(run(on, never).includes(20), '个位 1 → 亲属段开掷');

  for (const flag of [0, 2]) {
    const off = setup({ 'cflag:1:16': 0, 'talent:1:320': flag + 1e6 });
    assert(!run(off, never).includes(20), `家族位 ${flag} → 亲属段不掷`);
  }
});

// —— :224-465 「キスしたかもしれない職業」段 ——
// —— :224-465 「キスしたかもしれない職業」段 ——
//
// 表驱动的前置知识：职业段的候选要进产物，靠的是 :468-471 的采纳掷
// （`RAND:2 == 0`）——在此之前 :588 的无掷兜底会被 :550 段覆写候选，只有
// :468 拿到的才是职业段给的称呼。于是两类取法：
//   - `all_2`（所有 RAND:2 命中）覆盖「链在 RAND:4/3/5/6/7/20/25 上命中」与
//     「链尾就是 RAND:2」；
//   - `hit_nth(2, 2)` 覆盖 ELSE 臂：第 0 次 RAND:2 是 :215、第 1 次是链尾、
//     第 2 次才是 :468（五条 RAND 链各只消耗一个 RAND:2）。
//
// 注意短路求值下 `rand(20) === 0 && is_male` 里的 RAND:20 **照掷**（左操作数
// 先求值），所以后面几段的分母位次要把这些「掷了但用不上」的算进去。

test('职业段：男／扶她共用表 —— 十个职业的表驱动（:225-380）', () => {
  const rows = [
    // 学生：三段链 + ELSE，四臂各一行
    { job: 1, rand: () => hits(all_2, hit_nth(4, 0)), label: '学校的后辈' },
    { job: 1, rand: () => hits(all_2, hit_nth(3, 0)), label: '学校的先辈' },
    { job: 1, rand: () => all_2, label: '女教师' }, // 链尾 RAND:2 命中
    { job: 1, rand: () => hit_nth(2, 2), label: '同级生' }, // 链全不中 → ELSE
    { job: 3, rand: () => all_2, label: '农妇' },
    { job: 4, rand: () => all_2, label: '港口的娼妇' },
    { job: 6, rand: () => all_2, label: '街边的娼妇' },
    { job: 8, rand: () => all_2, label: '家庭教师' },
    { job: 8, rand: () => hit_nth(2, 2), label: '小女仆' }, // 无命中 → ELSE
    { job: 15, rand: () => hits(all_2, hit_nth(3, 0)), label: '女上司' },
    { job: 15, rand: () => all_2, label: '客户' },
    { job: 15, rand: () => hit_nth(2, 2), label: '熟客' },
    { job: 18, rand: () => all_2, label: '熟客' },
    { job: 19, rand: () => hits(all_2, hit_nth(6, 0)), label: '战地的少女' },
    { job: 19, rand: () => hits(all_2, hit_nth(5, 0)), label: '战友' },
    { job: 19, rand: () => hits(all_2, hit_nth(4, 0)), label: '长官' },
    { job: 19, rand: () => hits(all_2, hit_nth(3, 0)), label: '部下' },
    { job: 19, rand: () => all_2, label: '部下的女儿' },
    { job: 19, rand: () => hit_nth(2, 2), label: '长官的女儿' },
    // 娼婦 / 奴隷：标签固定，预约部位另有用例
    { job: 5, rand: () => all_2, label: '女客人' },
    { job: 20, rand: () => all_2, label: '女奴隶主' },
  ];
  // 男与扶她两段逐字相同（:225-300 / :305-380），两侧各走一遍全表
  for (const talent of [122, 121]) {
    for (const row of rows) {
      const fixture = setup({
        'cflag:1:16': 0,
        [`talent:1:${talent}`]: 1,
        'talent:1:315': row.job,
      });
      run(fixture, row.rand());
      assert.equal(
        product(fixture).kiss_name,
        row.label,
        `TALENT:${talent} 职业 ${row.job}`,
      );
    }
  }
});

test('职业段：男／扶她表的「貴族」ELSE 臂是「小女仆」（:391-393）', () => {
  // 与女表不同：男／扶她这条 CASE 有 ELSE，链全不中就走它（女表那条没有）
  const fixture = setup({
    'cflag:1:16': 0,
    'talent:1:122': 1,
    'talent:1:315': 8,
  });
  run(fixture, hit_nth(2, 2));
  assert.equal(product(fixture).kiss_name, '小女仆', 'ELSE 给出的称呼');

  const hit_family = setup({
    'cflag:1:16': 0,
    talent: {},
    'talent:1:122': 1,
    'talent:1:315': 8,
  });
  run(hit_family, all_2);
  assert.equal(product(hit_family).kiss_name, '家庭教师', 'RAND:2 命中臂');
});

test('职业段：女表 —— 十个职业的表驱动（:385-462）', () => {
  const rows = [
    { job: 1, rand: () => hits(all_2, hit_nth(4, 0)), label: '学校的后辈' },
    { job: 1, rand: () => hits(all_2, hit_nth(3, 0)), label: '学校的先辈' },
    { job: 1, rand: () => all_2, label: '教师' },
    { job: 1, rand: () => hit_nth(2, 2), label: '同级生' },
    { job: 3, rand: () => all_2, label: '农夫' },
    { job: 4, rand: () => all_2, label: '渔民' },
    { job: 6, rand: () => all_2, label: '流氓' },
    { job: 8, rand: () => hits(all_2, hit_nth(20, 0)), label: '家庭教师' },
    { job: 8, rand: () => hits(all_2, hit_nth(25, 0)), label: '佣人' },
    { job: 15, rand: () => hits(all_2, hit_nth(3, 0)), label: '上司' },
    { job: 15, rand: () => all_2, label: '客户' },
    { job: 15, rand: () => hit_nth(2, 2), label: '熟客' },
    { job: 18, rand: () => all_2, label: '熟客' },
    { job: 19, rand: () => hits(all_2, hit_nth(7, 0)), label: '战地的少年' },
    { job: 19, rand: () => hits(all_2, hit_nth(6, 0)), label: '战友' },
    { job: 19, rand: () => hits(all_2, hit_nth(5, 0)), label: '长官' },
    { job: 19, rand: () => hits(all_2, hit_nth(4, 0)), label: '部下' },
    { job: 19, rand: () => hits(all_2, hit_nth(3, 0)), label: '部下的儿子' },
    { job: 19, rand: () => all_2, label: '长官的儿子' },
    { job: 19, rand: () => hit_nth(2, 2), label: '少年士兵' },
    { job: 5, rand: () => all_2, label: '中年客人' },
    { job: 20, rand: () => all_2, label: '奴隶主' },
  ];
  for (const row of rows) {
    const fixture = setup({ 'cflag:1:16': 0, 'talent:1:315': row.job });
    run(fixture, row.rand());
    assert.equal(product(fixture).kiss_name, row.label, `职业 ${row.job}`);
  }
});

test('职业段的「貴族」链全不中时保留上一轮的候选（:406-412 的无 ELSE）', () => {
  // 家族段的「兄」给出候选、但它自己的采纳掷落空（初吻称呼还是空）；
  // 职业段（貴族）链全不中且没有 ELSE → 候选保留「亲哥哥」；:468 的采纳才落地
  const fixture = setup({
    'cflag:1:16': 0,
    'talent:1:320': 1 + 1e6,
    'talent:1:315': 8,
  });
  const calls = run(fixture, hits(hit_nth(20, 0), hit_nth(2, 2)));
  assert.deepEqual(
    calls.filter((n) => n === 25),
    [25],
    '贵族的第二条链（RAND:25）确实掷了',
  );
  assert.equal(product(fixture).kiss_name, '亲哥哥', '候选保留上一轮的值');
});

test('职业段的「貴族」在女表里没有 ELSE：链全不中则候选留空（:406-412）', () => {
  const fixture = setup({ 'cflag:1:16': 0, 'talent:1:315': 8 });
  run(fixture, hit_nth(2, 2)); // 职业段不给候选，后面几段接手
  const name = product(fixture).kiss_name;
  assert.notEqual(
    name,
    '家庭教师',
    'RAND:20 与 RAND:25 都不中 → 职业段不给候选',
  );
  assert.notEqual(name, '佣人', '同上');
  assert.equal(name, '男朋友', '候选由 :550-585 接手给出');
});

test('职业段未列举的职业不动候选（:225 的 SELECTCASE 无 CASEELSE）', () => {
  const fixture = setup({ 'cflag:1:16': 0, 'talent:1:315': 2 }); // 职业 2 未列举
  run(fixture, hit_nth(2, 2));
  const name = product(fixture).kiss_name;
  assert(
    !['农妇', '农夫', '女教师', '教师', '女客人', '中年客人'].includes(name),
    '未列举的职业不产生职业候选',
  );
});

test('职业段按性别选表：男／扶她取「女对象」表、女取「男对象」表（:302/:382/:464）', () => {
  const male_like = setup({
    'cflag:1:16': 0,
    'talent:1:122': 1,
    'talent:1:315': 19,
  });
  run(male_like, all_2);
  assert.equal(product(male_like).kiss_name, '部下的女儿', '男走女对象表');

  const futa_like = setup({
    'cflag:1:16': 0,
    'talent:1:121': 1,
    'talent:1:315': 19,
  });
  run(futa_like, all_2);
  assert.equal(product(futa_like).kiss_name, '部下的女儿', '扶她同表');

  const female_like = setup({ 'cflag:1:16': 0, 'talent:1:315': 19 });
  run(female_like, all_2);
  assert.equal(product(female_like).kiss_name, '长官的儿子', '女走男对象表');
});

test('职业段的预约部位：男／扶她表两条臂（:291-298 / :373-380）', () => {
  // KISS_POINT 会被 :477-533 的预约链覆写，所以要让那条链两条臂都落空：
  // RAND:2 的第 0 次 = :215、第 1 次 = :468、第 2 次 = 不幸なキス链的第二臂
  const rules = (denominator) =>
    hits(hit_nth(2, 0), hit_nth(2, 1), hit_nth(denominator, 0));
  const arm1 = setup({
    'cflag:1:16': 0,
    'talent:1:122': 1,
    'talent:1:315': 5,
  });
  run(arm1, rules(3));
  assert.equal(product(arm1).kiss_name, '女客人');
  assert.equal(product(arm1).kiss, 301, '娼婦的第一臂 → ヴァギナ 301');

  // 第二臂：第一臂落空、链的 RAND:2 命中 → 401。位次要让第 2 次 RAND:2 留给
  // :468（否则采纳掷一起落空，称呼就进不了产物）
  const arm2 = setup({
    'cflag:1:16': 0,
    'talent:1:122': 1,
    'talent:1:315': 20,
  });
  run(arm2, hits(hit_nth(2, 0), hit_nth(2, 1), hit_nth(2, 2)));
  assert.equal(product(arm2).kiss_name, '女奴隶主');
  assert.equal(product(arm2).kiss, 401, '奴隷的第二臂 → アナル 401');
});

test('职业段的预约部位：女表两条臂（:455-461）', () => {
  const arm1 = setup({ 'cflag:1:16': 0, 'talent:1:315': 5 });
  run(arm1, hits(hit_nth(2, 0), hit_nth(2, 1), hit_nth(3, 0)));
  assert.equal(product(arm1).kiss_name, '中年客人');
  assert.equal(product(arm1).kiss, 101, '娼婦的第一臂 → ペニス 101');
});

test('预约链落空时 KISS_POINT 保持 0，:542 不落部位（:542 的判据）', () => {
  const fixture = setup({
    'cflag:1:16': 0,
    'talent:1:122': 1,
    'talent:1:315': 5,
  });
  // RAND:2：0 = :215、1 = 预约链第二臂（落空）、2 = :468 采纳
  run(fixture, hits(hit_nth(2, 0), hit_nth(2, 2)));
  assert.equal(product(fixture).kiss_name, '女客人', '采纳掷命中，称呼落地');
  assert.equal(product(fixture).kiss, 1, '无预约 → :644 走嘴唇');
});

// —— :477-533 不幸なキス 与 :550-585 誰にでもあるキス ——

test('不幸なキス：三选项 × 三性别表驱动（:477-533）', () => {
  const rows = [
    { talent: 122, options: ['狩猎少年的痴女', '淫乱女家教', '女暴露狂'] },
    { talent: 121, options: ['狩猎少年的痴女', '淫乱女家教', '女暴露狂'] },
    { talent: null, options: ['流氓', '窃贼', '强奸魔'] },
  ];
  for (const row of rows) {
    for (const [index, label] of row.options.entries()) {
      const fixture = setup({
        'cflag:1:16': 0,
        ...(row.talent === null ? {} : { [`talent:1:${row.talent}`]: 1 }),
      });
      // :477 的三选是第 0 次 RAND:3（CASEELSE 走 2）；第 2 次是 :536 的采纳掷
      const roll = index === 2 ? 2 : index;
      run(fixture, script({ 3: { 0: roll, 2: 0 } }));
      assert.equal(
        product(fixture).kiss_name,
        label,
        `${row.talent ?? '女'} 的选项 ${index}`,
      );
    }
  }
});

test('誰にでもあるキス：三选项 × 三性别表驱动（:550-585）', () => {
  const rows = [
    { talent: 122, options: ['青梅竹马', '女朋友', '初恋'] },
    { talent: 121, options: ['青梅竹马', '女朋友', '初恋'] },
    { talent: null, options: ['青梅竹马', '男朋友', '初恋'] },
  ];
  for (const row of rows) {
    for (const [index, label] of row.options.entries()) {
      const fixture = setup({
        'cflag:1:16': 0,
        ...(row.talent === null ? {} : { [`talent:1:${row.talent}`]: 1 }),
      });
      // :550 的三选是第 3 次 RAND:3（:477 三选、预约链、:536 各占一次）
      const roll = index === 2 ? 2 : index;
      run(fixture, script({ 3: { 3: roll } }));
      assert.equal(
        product(fixture).kiss_name,
        label,
        `${row.talent ?? '女'} 的选项 ${index}`,
      );
    }
  }
});

test('不幸なキス的三选项带预约部位（:486-492 / :524-530）', () => {
  // 男／扶她表：KISS_POINT 301，对象性别 2 → 301 与它相容，保留
  const female_target = setup({ 'cflag:1:16': 0, 'talent:1:122': 1 });
  run(female_target, script({ 3: { 0: 0, 1: 0, 2: 0 } }));
  assert.equal(product(female_target).kiss_name, '狩猎少年的痴女');
  assert.equal(product(female_target).kiss, 301, '女对象 + ヴァギナ预约');

  // 女表：KISS_POINT 101，对象性别 1 → 保留
  const male_target = setup({ 'cflag:1:16': 0 });
  run(male_target, script({ 3: { 0: 0, 1: 0, 2: 0 } }));
  assert.equal(product(male_target).kiss_name, '流氓');
  assert.equal(product(male_target).kiss, 101, '男对象 + ペニス预约 101');

  // 第二臂（アナル 401）：链的 RAND:3 落空、RAND:2 命中。RAND:2 的位次：
  // 0 = :215、1 = :468、2 = 这条链的第二臂
  const anal = setup({ 'cflag:1:16': 0, 'talent:1:122': 1 });
  run(anal, hits(hit_nth(2, 2), script({ 3: { 0: 0, 2: 0 } })));
  assert.equal(product(anal).kiss, 401, '第二臂 → アナル 401');
});

// —— :588-597 无条件兜底 ——

test(':588-591 无掷采纳：前面的段都没给候选时由它收尾', () => {
  const fixture = setup({ 'cflag:1:16': 0 });
  run(fixture, never);
  assert.equal(
    product(fixture).kiss_name,
    '男朋友',
    '由 :550 的候选收尾（女）',
  );
  assert.equal(product(fixture).kiss, 1, 'RAND:30 > 0 → 嘴唇');
});

test(':596-597 初体验编码 100：有对象但部位不明', () => {
  const fixture = setup({
    'cflag:1:16': 401,
    'cflag:1:15': 0,
    'talent:1:0': 0,
  });
  run(fixture, never);
  assert.equal(product(fixture).sex, 100, '非处女 + 初体验 0 → 100');
  assert.notEqual(product(fixture).sex_name, '', ':593 已给出对象名');

  const with_sex = setup({
    'cflag:1:16': 401,
    'cflag:1:15': 401,
    'talent:1:0': 0,
  });
  run(with_sex, never);
  assert.equal(product(with_sex).sex, 401, '已有初体验编码则不动');
});

// —— :599-631 故郷の恋人的性别待定 ——
//
// 候选性别 4 只有「故郷の恋人」会给（:208-212），它要在产物上留下痕迹需要
// 三个条件：:215 的采纳掷命中（否则整段不跑）、:542 不落部位（否则 :643 的
// `FIRST_KISS == 0` 不成立）、RAND:30 不中（否则 :644 抢先落到嘴唇）。
// 统一用 `hit_nth(2, 0)`：第 0 次 RAND:2 是 :215（命中）、第 1 次是不幸なキス
// 链的第二臂（落空 → KISS_POINT 保持 0）。
//
// 定位则要算上「短路求值下左操作数照掷」的那些 RAND：男走 :611/:614/:617，
// 女的 :611/:614 里 `is_male` 为假但 RAND 已经掷了，所以女的两臂落在第 1 次。

test('性别待定七分支（:599-631）：扶她三臂 + 男两臂 + 女两臂', () => {
  const rows = [
    {
      name: '扶她 · RAND:10 命中 → 2（女の恋人）',
      talents: { 'talent:1:121': 1 },
      rand: hits(hit_nth(2, 0), hit_nth(10, 0), hit_nth(30, 0)),
      kiss: 301,
    },
    {
      name: '扶她 · RAND:2 第 2 次命中 → 3（扶她的恋人）',
      talents: { 'talent:1:121': 1 },
      rand: hits(hit_nth(2, 0), hit_nth(2, 2), hit_nth(30, 0)),
      kiss: 301,
    },
    {
      name: '扶她 · 前两臂不中 → 1（男的恋人）',
      talents: { 'talent:1:121': 1 },
      rand: hits(hit_nth(2, 0), hit_nth(30, 0)),
      kiss: 101,
    },
    {
      name: '男 · RAND:20 命中 → 1（オトコの恋人）',
      talents: { 'talent:1:122': 1 },
      rand: hits(hit_nth(2, 0), hit_nth(20, 0), hit_nth(30, 0)),
      kiss: 101,
    },
    {
      name: '男 · 前两臂不中 → 1（:617 兜底）',
      talents: { 'talent:1:122': 1 },
      rand: hits(hit_nth(2, 0), hit_nth(30, 0)),
      kiss: 101,
    },
    {
      name: '女 · RAND:20 命中 → 2（女の恋人）',
      talents: {},
      rand: hits(hit_nth(2, 0), hit_nth(20, 1), hit_nth(30, 0)),
      kiss: 301,
    },
    {
      name: '女 · 前两臂不中 → 1（:627 兜底）',
      talents: {},
      rand: hits(hit_nth(2, 0), hit_nth(30, 0)),
      kiss: 101,
    },
  ];
  for (const row of rows) {
    const fixture = setup({
      'cflag:1:16': 0,
      'talent:1:317': 4, // 故郷の恋人：性别待定
      ...row.talents,
    });
    run(fixture, row.rand);
    assert.equal(product(fixture).kiss_name, '故乡的恋人', row.name);
    assert.equal(product(fixture).kiss, row.kiss, `${row.name} 的部位落点`);
  }
});

test('男 · RAND:8 命中 → 3（扶她的恋人）；女 · RAND:8 命中同款（:614-616 / :621-626）', () => {
  const male = setup({
    'cflag:1:16': 0,
    'talent:1:317': 4,
    'talent:1:122': 1,
  });
  run(male, hits(hit_nth(2, 0), hit_nth(8, 0), hit_nth(30, 0)));
  assert.equal(product(male).kiss, 301, '男：性别 3 + :656 落空 → ヴァギナ');

  const female = setup({ 'cflag:1:16': 0, 'talent:1:317': 4 });
  run(female, hits(hit_nth(2, 0), hit_nth(8, 1), hit_nth(30, 0)));
  assert.equal(
    product(female).kiss,
    301,
    '女：第 0 次 RAND:8 被 is_male 为假的臂吃掉',
  );
});

test(':656 与 :659 两条臂（扶她恋人 + RAND:2 的再掷）', () => {
  const penis = setup({
    'cflag:1:16': 0,
    'talent:1:317': 4,
    'talent:1:121': 1,
  });
  // RAND:2：0 = :215 采纳、1 = 不幸なキス链第二臂、2 = :604、3 = :656
  run(penis, hits(hit_nth(2, 0), hit_nth(2, 2), hit_nth(2, 3), hit_nth(30, 0)));
  assert.equal(product(penis).kiss, 101, ':656 命中 → ペニス');

  const vagina = setup({
    'cflag:1:16': 0,
    'talent:1:317': 4,
    'talent:1:121': 1,
  });
  run(vagina, hits(hit_nth(2, 0), hit_nth(2, 2), hit_nth(30, 0)));
  assert.equal(product(vagina).kiss, 301, ':656 不中 → ヴァギナ');
});

// —— :635-662 白纸与部位 ——

test(':637 ペニス编码 + 女对象 → 白纸（:635-638）', () => {
  // 亲属「姉」在 :199 给出女对象（matched_gender 2），女表的不幸なキス链第一臂
  // 预约 101（ペニス），:542 落进初吻，随后被 :637 白纸 —— 末值由 :653 接手
  const female_object = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 + 1e5 });
  run(
    female_object,
    hits(hit_nth(2, 0), hit_nth(20, 0), script({ 30: { 0: 0 }, 3: { 1: 0 } })),
  );
  assert.equal(product(female_object).kiss_name, '亲姐姐');
  assert.equal(product(female_object).kiss, 301, 'ペニス 101 被白纸后落到 301');

  // 对照：同一路径下对象是男（兄）→ :637 的 `MEN_OR_GIRL:1 == 2` 不成立 → 保 101
  const male_object = setup({ 'cflag:1:16': 0, 'talent:1:320': 1 + 1e6 });
  run(
    male_object,
    hits(hit_nth(2, 0), hit_nth(20, 0), script({ 30: { 0: 0 }, 3: { 1: 0 } })),
  );
  assert.equal(product(male_object).kiss_name, '亲哥哥');
  assert.equal(product(male_object).kiss, 101, '男对象 + ペニス 相容');
});

test(':640 ヴァギナ编码 + 男对象 → 白纸（:639-641）', () => {
  // 故郷の恋人的候选性别待定；扶她表把预约部位定在 301（ヴァギナ），
  // :599 的兜底臂把性别定成 1（男）→ :640 白纸，末值由 :650 接手
  const male_object = setup({
    'cflag:1:16': 0,
    'talent:1:317': 4,
    'talent:1:121': 1,
  });
  run(
    male_object,
    hits(hit_nth(2, 0), hit_nth(20, 0), script({ 30: { 0: 0 }, 3: { 1: 0 } })),
  );
  assert.equal(product(male_object).kiss, 101, 'ヴァギナ 301 被白纸后落到 101');

  // 对照：性别落成 2（女）→ :640 不成立 → 保 301
  const female_object = setup({
    'cflag:1:16': 0,
    'talent:1:317': 4,
    'talent:1:121': 1,
  });
  run(
    female_object,
    hits(hit_nth(2, 0), hit_nth(10, 0), script({ 30: { 0: 0 }, 3: { 1: 0 } })),
  );
  assert.equal(product(female_object).kiss, 301, '女对象 + ヴァギナ 相容');
});

test(':643-662 初吻部位的四条性别臂（:644 / :647 / :650 / :653）', () => {
  const cases = [
    {
      name: '唇（RAND:30 > 0）',
      family: 1e6,
      rand: hits(hit_nth(20, 0), script({ 30: { 0: 2 } })),
      kiss: 1,
    },
    {
      name: 'アナル（RAND:30 == 0 且第 4 次 RAND:3 == 0）',
      family: 1e6,
      rand: hits(hit_nth(20, 0), script({ 30: { 0: 0 }, 3: { 3: 0 } })),
      kiss: 401,
    },
    {
      name: 'ペニス（男对象 1）',
      family: 1e6,
      rand: hits(hit_nth(20, 0), script({ 30: { 0: 0 } })),
      kiss: 101,
    },
    {
      name: 'ヴァギナ（女对象 2）',
      family: 1e5,
      rand: hits(hit_nth(20, 0), script({ 30: { 0: 0 } })),
      kiss: 301,
    },
  ];
  for (const row of cases) {
    // RAND:2 只让 :199 的采纳掷命中；RAND:20 让亲属出场
    const fixture = setup({
      'cflag:1:16': 0,
      'talent:1:320': 1 + row.family,
    });
    run(fixture, hits(hit_nth(2, 0), row.rand));
    assert.equal(product(fixture).kiss, row.kiss, row.name);
  }
});

test('职业段落下的对象性别决定初吻部位（:464 女表 / :382 男表）', () => {
  // 无预约部位（RAND:3 全不中）且 RAND:30 不中时，:650/:653 按 matched_gender 落码
  const female_table = setup({ 'cflag:1:16': 0, 'talent:1:315': 3 }); // 女 → :464 男对象
  // RAND:2：0 = :215、1 = :468 采纳（:315 的 CASE 3 不带预约链，不占 RAND:2）
  run(
    female_table,
    hits(hit_nth(2, 0), hit_nth(2, 1), script({ 30: { 0: 0 } })),
  );
  assert.equal(product(female_table).kiss_name, '农夫');
  assert.equal(product(female_table).kiss, 101, '女表的对象是男 1 → ペニス');

  const male_table = setup({
    'cflag:1:16': 0,
    'talent:1:122': 1,
    'talent:1:315': 3,
  }); // 男 → :382 女对象
  run(male_table, hits(hit_nth(2, 0), hit_nth(2, 1), script({ 30: { 0: 0 } })));
  assert.equal(product(male_table).kiss_name, '农妇');
  assert.equal(
    product(male_table).kiss,
    301,
    '男／扶她表的对象是女 2 → ヴァギナ',
  );
});

// —— 接入：@CM_NS_EXP 的 CALL CHARA_FIRST_EXP（:1103） ——

test('cm_ns_exp 的 :1103 已接入真身：占位行消失且产物落地', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '预设名', callname: '预设称呼' });
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:1:16', 401);
  fixture.store.set('cflag:1:15', 103);
  fixture.store.set('cstr:1:4', '青梅竹马');
  fixture.store.set('cstr:1:3', '野狗');
  const { cm_ns_exp } = fixture.load_module('chara/chara-make');

  await cm_ns_exp(1, never);

  const texts = fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
  assert(
    !texts.some((line) => line.includes('@CHARA_FIRST_EXP')),
    ':1103 不再有占位行',
  );
  assert.equal(fixture.store.get('cstr:1:4'), '青梅竹马', '真身已跑过一遍');
});
