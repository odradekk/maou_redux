/**
 * ere/kojo/kojo-forced-payment.js 的行为测试（issue #544，S3 迷宫强制肉偿）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：魔王 + 温妮（id 31）入列
 * （强制肉偿不要求调教中，直接 addCharacter 即可）。覆盖（逐条对应验收
 * 清单）：
 *   - SELECTCASE RAND:4 的四档（:12/:25/:41/:58）；
 *   - PLAY/COST 两档算式与随机上界（高档 RAND:20+10 / RAND:1000+1000，
 *     低档 RAND:10+5 / RAND:500+500）；
 *   - 分档条件的三个析取项各自单独命中（ABL:11 >= 3 / ABL:37 / EXP:20 >= 30）；
 *   - 债务结算（CFLAG:582）：抵完清零 / 未抵完累加 / 恰好抵完的边界；
 *   - 拍片分支（!RAND:3）：EXP:50/70 各 +1、片酬分两次求值（显示与入账
 *     各取一次 RAND:100——原作如此，#14 登记）；
 *   - EXP_BITCH 以空 TYPE 调用：除 50/70 外 EXP/JUEL 一律不变（原作缺陷，
 *     1:1 保留并登记 #14）；
 *   - 男人（TALENT:122）走 ANAL 档、非男人走 SEX 档的文案分档；
 *   - KARMA：LOCAL = -1 * PLAY / 4（向零截断）；
 *   - HEROINE_BITCH 调用点接真身（占位行消失）。
 *
 * 随机源注入：seq_rand / recorder 两式（与 kojo-dungeon-bitch 同款）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

// RAND:N 定值序：draws 依次被消费，越界取模
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

/** 静态表的经验/点数名（引擎静态表在夹具里不装载，逐条预置） */
const STATIC_NAMES = [
  ['expname:0', '私处经验'],
  ['expname:1', '肛门经验'],
  ['expname:5', '性交经验'],
  ['expname:20', '精液经验'],
  ['expname:22', '口交经验'],
  ['expname:50', '异常经验'],
  ['expname:70', '拍摄经验'],
  ['expname:74', '卖淫经验'],
  ['palamname:1', '私处'],
  ['palamname:2', '肛门'],
  ['palamname:5', '欲情'],
  ['palamname:7', '习得'],
];

// 世界底座：魔王 + 温妮（id 31）入列
function setup(seed) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  for (const [key, value] of STATIC_NAMES) {
    fixture.store.set(key, value);
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.player = 0;
  if (seed) {
    seed(fixture, era_flag);
  }
  const mod = fixture.load_module('kojo/kojo-forced-payment');
  return { fixture, mod, era_flag };
}

/** 债务高的默认局面（温妮、非处女、无分档条件命中 → 低档） */
function with_debt(debt, extra) {
  return (f) => {
    f.store.set('cflag:31:582', debt);
    if (extra) extra(f);
  };
}

const DEBT = (fixture) => fixture.store.get('cflag:31:582');

// —— SELECTCASE RAND:4 的四档 ——

test('强制肉偿：RAND:4 落点决定叙事档（四档表驱动）', async () => {
  const cases = [
    [
      0,
      '温妮被强制灌了媚药并换上只有几根吊带之外什么也没有的淫荡内衣',
      '然后几乎跟全裸没什么两样的温妮，被丢入乱交派对里进行还债。',
    ],
    [
      1,
      '温妮被蒙上了眼睛并除去下半身的衣物，然后固定在一个壁洞上',
      '也不知道是在城里的那个位置，就这样开始了壁洞公共便所的PLAY……',
    ],
    [
      2,
      '温妮被蒙上了眼睛并除去全身的衣物，然后固定在一个十字架上',
      '这难道是在在城里的哪个教堂吗？茫然的温妮就这样开始被审判了……',
    ],
    [
      3,
      '温妮被剥除全身的衣物，然后丢入牢房中进行"安抚"犯人们的活动',
      '为了降低牢狱的暴动率，维护社会的秩序，果然还是需要人挺身而出进行奉献',
    ],
  ];
  for (const [roll, first, second] of cases) {
    const { fixture, mod } = setup(
      with_debt(-20000, (f) => f.store.set('cflag:31:9', 0)),
    );
    // draws: SELECTCASE → film 判定（取 1 不拍片）
    await mod.forced_payment(31, seq_rand(roll, 1));
    const lines = fixture.text_lines();
    assert.ok(
      lines.includes(
        '由于温妮欠的债务实在太高了，在休息的时候温妮被某位的债主绑架了！',
      ),
      `第 ${roll} 档开场`,
    );
    assert.ok(lines.includes(first), `第 ${roll} 档首行`);
    assert.ok(lines.includes(second), `第 ${roll} 档次行`);
  }
});

test('强制肉偿：低档叙事尾行（青涩懵懂）随档位不同', async () => {
  const tails = [
    [0, '温妮那青涩懵懂的模样，让派对的宾客们感到新鲜'],
    [1, '即使不知对象是谁，温妮那青涩懵懂的身体也因为这样的PLAY渐渐兴奋了起来'],
    [
      2,
      '在受刑时，温妮那青涩懵懂的身体不停挣扎着，被教徒们认定为是不服从审判的反应',
    ],
    [3, '在服务时，温妮那青涩懵懂的身体不停挣扎着，连牢头看了都摇头不已'],
  ];
  for (const [roll, tail] of tails) {
    const { fixture, mod } = setup(with_debt(-20000));
    await mod.forced_payment(31, seq_rand(roll, 1));
    assert.ok(fixture.text_lines().includes(tail), `第 ${roll} 档尾行`);
  }
});

test('强制肉偿：高档叙事尾行（淫荡/积极）随档位不同', async () => {
  const tails = [
    [0, '温妮那幅晃腰摆臀的淫荡模样，大大取悦了派对的宾客们'],
    [1, '即使不知对象是谁，温妮那淫荡的身体居然因为这样的PLAY兴奋了'],
    [2, '在受刑时，温妮那淫荡的身体反应，让教徒们更加地谴责'],
    [3, '温妮那积极的服务精神，连牢头都赞赏不已，甚至加入了体验的行列……'],
  ];
  for (const [roll, tail] of tails) {
    const { fixture, mod } = setup(
      with_debt(-20000, (f) => f.store.set('abl:31:11', 3)),
    );
    await mod.forced_payment(31, seq_rand(roll, 1));
    assert.ok(fixture.text_lines().includes(tail), `第 ${roll} 档尾行`);
  }
});

// —— PLAY / COST 两档算式与随机上界 ——

test('强制肉偿：高档 PLAY = RAND:20 + 10、COST = PLAY*100 + RAND:1000 + 1000（四档同式）', async () => {
  for (const roll of [0, 1, 2, 3]) {
    const { fixture, mod } = setup(
      with_debt(-20000, (f) => f.store.set('abl:31:11', 3)),
    );
    const uppers = [];
    const rand = (n) => {
      uppers.push(n);
      if (n === 4) return roll; // 档位由用例指定
      return n === 3 ? 1 : 0; // 拍片判定取 1（不拍片），其余取 0
    };
    await mod.forced_payment(31, rand);
    assert.deepEqual(
      uppers.slice(0, 2),
      [4, 20],
      `第 ${roll} 档高档 PLAY 的 RAND 上界`,
    );
    assert.deepEqual(
      uppers.slice(2, 4),
      [1000, 3],
      `第 ${roll} 档高档 COST 的 RAND 上界`,
    );
    // PLAY = 0 + 10 = 10；COST = 10*100 + 0 + 1000 = 2000（不拍片，全进债务）
    assert.equal(DEBT(fixture), -20000 + 2000, `第 ${roll} 档债务`);
  }
});

test('强制肉偿：低档 PLAY = RAND:10 + 5、COST = PLAY*100 + RAND:500 + 500（四档同式）', async () => {
  for (const roll of [0, 1, 2, 3]) {
    const { fixture, mod } = setup(with_debt(-20000));
    const uppers = [];
    const rand = (n) => {
      uppers.push(n);
      if (n === 4) return roll;
      return n === 3 ? 1 : 0;
    };
    await mod.forced_payment(31, rand);
    assert.deepEqual(
      uppers.slice(0, 2),
      [4, 10],
      `第 ${roll} 档低档 PLAY 的 RAND 上界`,
    );
    assert.deepEqual(
      uppers.slice(2, 4),
      [500, 3],
      `第 ${roll} 档低档 COST 的 RAND 上界`,
    );
    // PLAY = 0 + 5 = 5；COST = 5*100 + 0 + 500 = 1000
    assert.equal(DEBT(fixture), -20000 + 1000, `第 ${roll} 档债务`);
  }
});

test('强制肉偿：拍片分支的两处 RAND:100 上界（片酬显示与入账各一次）', async () => {
  const { fixture, mod } = setup(with_debt(-20000));
  const uppers = [];
  const rand = (n) => {
    uppers.push(n);
    return 0; // 档 0、PLAY 0、COST 0、拍片 0（进入）、两处片酬 0
  };
  await mod.forced_payment(31, rand);
  assert.deepEqual(
    uppers.slice(0, 5),
    [4, 10, 500, 3, 100],
    '拍片显示侧 RAND 上界序',
  );
  assert.deepEqual(uppers.slice(5), [100], '拍片入账侧 RAND 上界序');
  // 显示侧的片酬只打印不加算；入账侧 +333
  assert.equal(DEBT(fixture), -20000 + 1000 + 333);
});

// —— 分档条件的三个析取项 ——

test('强制肉偿：分档条件（ABL:11 >= 3 / ABL:37 / EXP:20 >= 30）逐项表驱动', async () => {
  const table = [
    // [ABL:11, ABL:37, EXP:20, 是否高档, 断言标签（逐行独立，变异条目按它定位）]
    [3, 0, 0, true, 'ABL:11 = 3 应为高档'],
    [2, 0, 0, false, 'ABL:11 = 2 应为低档'],
    [0, 1, 0, true, 'ABL:37 = 1 应为高档'],
    [0, 0, 30, true, 'EXP:20 = 30 应为高档'],
    [0, 0, 29, false, 'EXP:20 = 29 应为低档'],
    [0, 0, 0, false, '三项全不满足应为低档'],
  ];
  for (const [abl11, abl37, exp20, high, label] of table) {
    const { fixture, mod } = setup(
      with_debt(-20000, (f) => {
        f.store.set('abl:31:11', abl11);
        f.store.set('abl:31:37', abl37);
        f.store.set('exp:31:20', exp20);
      }),
    );
    // draws：[档 0, PLAY 0, COST 0, 拍片 1（不拍）]
    await mod.forced_payment(31, seq_rand(0, 0, 0, 1));
    // 高档 PLAY 上界 20 / 低档 10——用 PLAY 文本行区分，不靠文案
    const play_line = fixture
      .text_lines()
      .find((l) => l.includes('经验值上升了'));
    assert.ok(play_line, '经验行');
    // PLAY = 0+10（高档）/ 0+5（低档）
    assert.ok(
      play_line.endsWith(high ? '经验值上升了10' : '经验值上升了5'),
      label,
    );
  }
});

// —— 债务结算 ——

test('强制肉偿：债务未抵完时累加（CFLAG:582 += COST）', async () => {
  const { fixture, mod } = setup(with_debt(-20000));
  // draws：[档 0, PLAY 0, COST 0, 拍片 1]，低档 PLAY=5、COST=1000
  await mod.forced_payment(31, seq_rand(0, 0, 0, 1));
  assert.equal(DEBT(fixture), -19000);
  assert.ok(
    fixture.text_lines().includes('被强制用肉体偿债的温妮抵销了'),
    '结算行首片',
  );
  assert.ok(fixture.text_lines().includes('点的债务，当前欠金变为'));
  assert.ok(fixture.text_lines().includes('-19000'));
});

test('强制肉偿：债务被抵完时清零（CFLAG:582 = 0）', async () => {
  // 低档 COST = 5*100 + 0 + 500 = 1000；债只欠 100 → 抵完
  const { fixture, mod } = setup(with_debt(-100));
  await mod.forced_payment(31, seq_rand(0, 0, 0, 1));
  assert.equal(DEBT(fixture), 0);
  assert.ok(fixture.text_lines().includes('0'));
});

test('强制肉偿：恰好抵完（CFLAG:582 + COST == 0）也清零', async () => {
  // 低档 COST = 5*100 + 0 + 500 + 500 —— 上界也取 0 时 COST = 1000，债恰好 -1000
  const { fixture, mod } = setup(with_debt(-1000));
  await mod.forced_payment(31, seq_rand(0, 0, 0, 1));
  assert.equal(DEBT(fixture), 0);
});

// —— 拍片分支 ——

test('强制肉偿：!RAND:3 才拍片，EXP:50/70 各 +1', async () => {
  // 拍片：RAND:3 = 0
  const { fixture, mod } = setup(with_debt(-20000));
  await mod.forced_payment(31, seq_rand(0, 0, 0, 0));
  assert.equal(fixture.store.get('exp:31:50'), 1, '异常经验 +1');
  assert.equal(fixture.store.get('exp:31:70'), 1, '拍摄经验 +1');
  assert.ok(
    fixture.text_lines().includes('温妮用肉体还债的过程被人拍下来了！'),
  );
  assert.ok(fixture.text_lines().includes('这部淫荡煽情的影像以'));
  assert.ok(fixture.text_lines().includes('的金额，被人买下收藏了'));

  // 不拍片：RAND:3 = 1
  const { fixture: f2, mod: m2 } = setup(with_debt(-20000));
  await m2.forced_payment(31, seq_rand(0, 0, 0, 1));
  assert.equal(f2.store.get('exp:31:50'), undefined, '异常经验不动');
  assert.equal(f2.store.get('exp:31:70'), undefined, '拍摄经验不动');
  assert.ok(
    !f2.text_lines().includes('温妮用肉体还债的过程被人拍下来了！'),
    '不拍片无文案',
  );
});

test('强制肉偿：片酬分两次求值——显示取第一次、入账取第二次（原作 #14）', async () => {
  // 低档：draws [档 0, PLAY 0, COST 0, 拍片 0, 片酬 5, 片酬 7]
  // PLAY = 5、COST = 1000；片酬两次求值各消费一次 RAND:100
  const { fixture, mod } = setup(with_debt(-20000));
  await mod.forced_payment(31, seq_rand(0, 0, 0, 0, 5, 7));
  const lines = fixture.text_lines();
  // 显示值 = COST*1/3 + 5 = 333 + 5 = 338
  assert.ok(lines.includes('338'), '显示片酬');
  // 入账 = 333 + 7 = 340；先抵债到 -19000，再加片酬 → -18660
  assert.equal(DEBT(fixture), -20000 + 1000 + 340);
  assert.ok(lines.includes('-18660'), '片酬后的欠金');
});

test('强制肉偿：片酬的 COST*1/3 是向零截断的整数除法', async () => {
  // 低档 COST = 5*100 + 0 + 500 = 1000 → 1000/3 = 333（截断），两处 RAND:100 都取 0
  const { fixture, mod } = setup(with_debt(-20000));
  await mod.forced_payment(31, seq_rand(0, 0, 0, 0, 0, 0));
  assert.ok(fixture.text_lines().includes('333'), '片酬 333');
  assert.equal(DEBT(fixture), -20000 + 1000 + 333);
});

// —— EXP_BITCH 空 TYPE（原作缺陷 1:1）——

test('强制肉偿：EXP_BITCH 收到空 TYPE——除 EXP:50/70 外 EXP/JUEL 全不动（#14）', async () => {
  for (const male of [0, 1]) {
    const { fixture, mod } = setup(
      with_debt(-20000, (f) => f.store.set('talent:31:122', male)),
    );
    await mod.forced_payment(31, seq_rand(0, 0, 0, 0));
    for (const idx of [0, 1, 5, 20, 22, 74, 80]) {
      assert.equal(
        fixture.store.get(`exp:31:${idx}`),
        undefined,
        `EXP:${idx} 不应变化（男人=${male}）`,
      );
    }
    for (const idx of [0, 1, 2, 5, 6, 7, 8, 9]) {
      assert.equal(
        fixture.store.get(`juel:31:${idx}`),
        undefined,
        `JUEL:${idx} 不应变化（男人=${male}）`,
      );
    }
  }
});

test('强制肉偿：EXP_BITCH 被调用两次、TYPE 全为空串（:105 无条件 + 两臂各一次）', async () => {
  for (const male of [0, 1]) {
    const { fixture, mod } = setup(
      with_debt(-20000, (f) => f.store.set('talent:31:122', male)),
    );
    const bitch = fixture.load_module('kojo/kojo-dungeon-bitch');
    const calls = [];
    const saved = bitch.exp_bitch;
    bitch.exp_bitch = (...args) => {
      calls.push(args);
    };
    try {
      // draws [档 0, PLAY 0, COST 0, 拍片 1] → 低档 PLAY = 5
      await mod.forced_payment(31, seq_rand(0, 0, 0, 1));
    } finally {
      bitch.exp_bitch = saved;
    }
    // :105 一次（无条件）+ :107 或 :111 一次（分支内）
    assert.equal(calls.length, 2, `男人=${male} 的调用次数`);
    for (const args of calls) {
      assert.deepEqual(args, [31, '', '', 5], `男人=${male} 的实参`);
    }
  }
});

test('强制肉偿：男人（TALENT:122）走 ANAL 档文案、否则走 SEX 档文案', async () => {
  // draws [档 0, PLAY 0, COST 0, 拍片 1] → 低档 PLAY = 5
  const { fixture, mod } = setup(
    with_debt(-20000, (f) => f.store.set('talent:31:122', 1)),
  );
  await mod.forced_payment(31, seq_rand(0, 0, 0, 1));
  assert.ok(
    fixture
      .text_lines()
      .includes(
        '温妮的口交经验，精液经验，卖淫经验，肛门经验，性交经验经验值上升了5',
      ),
    'ANAL 档经验名（肛门）',
  );
  assert.ok(
    fixture
      .text_lines()
      .includes('温妮的肛门点数＋50，欲情点数＋100，习得点数＋5'),
    'ANAL 档点数名（肛门）',
  );

  const { fixture: f2, mod: m2 } = setup(with_debt(-20000));
  await m2.forced_payment(31, seq_rand(0, 0, 0, 1));
  assert.ok(
    f2
      .text_lines()
      .includes(
        '温妮的口交经验，精液经验，卖淫经验，私处经验，性交经验经验值上升了5',
      ),
    'SEX 档经验名（私处）',
  );
  assert.ok(
    f2.text_lines().includes('温妮的私处点数＋50，欲情点数＋100，习得点数＋5'),
    'SEX 档点数名（私处）',
  );
});

// —— KARMA ——

test('强制肉偿：LOCAL = -1 * PLAY / 4 向零截断，KARMA 实际下调', async () => {
  // 高档 PLAY = 10 → LOCAL = -10/4 = -2（向零截断，不是 -3）
  const { fixture, mod } = setup(
    with_debt(-20000, (f) => f.store.set('abl:31:11', 3)),
  );
  await mod.forced_payment(31, seq_rand(0, 0, 0, 1));
  assert.ok(
    fixture.text_lines().includes('（善恶值减少了：-2）'),
    'LOCAL 显示与截断方向',
  );
  assert.equal(fixture.store.get('cflag:31:151'), -2, '善恶值下调');

  // 低档 PLAY = 3 + 5 = 8 → LOCAL = -8/4 = -2（除数是 5 则得 -1，
  // 这条把除数与「向零截断」分开守）
  const { fixture: f2, mod: m2 } = setup(with_debt(-20000));
  await m2.forced_payment(31, seq_rand(0, 3, 0, 1));
  assert.ok(
    f2.text_lines().includes('（善恶值减少了：-2）'),
    '除数 4 与向零截断',
  );
  assert.equal(f2.store.get('cflag:31:151'), -2, 'PLAY = 8 时的善恶值下调');
});

// —— 调用点接真身 ——

test('强制肉偿：HEROINE_BITCH 的调用点接真身（占位行消失）', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.player = 0;
  fixture.store.set('base:31:0', 500);
  fixture.store.set('base:31:1', 500);
  fixture.store.set('cflag:31:120', 0); // 无卖春积极性 → 卖春判定跳过
  fixture.store.set('cflag:31:582', -20000); // 债务高
  fixture.store.set('talent:31:0', 0); // 非处女
  fixture.store.set('abl:31:11', 0);
  fixture.store.set('abl:31:31', 0);
  fixture.store.set('talent:31:60', 0);
  const bitch = fixture.load_module('kojo/kojo-dungeon-bitch');
  // 抽取序（原作顺序）：RAND:3 → 0（触发）；强制肉偿的 RAND:4 → 0（档 0）、
  // RAND:10 → 0（PLAY = 5）、RAND:500 → 0（COST = 1000）、RAND:3 → 1（不拍片，
  // 本用例没设 ABL:11/ABL:37/EXP:20，走低档）；回到 heroine_bitch 的
  // 自慰判定 RAND:36 → 35（35 > 0，不触发）。
  // 调用点漏写 await 时（M11427），heroine_bitch 会在强制肉偿停在 :10 的
  // printAndWait 上时继续跑 :78 的 RAND:36，把 RAND:4 要用的数取走——
  // 上界序列因此错位，下面这条断言是唯一能拦它的地方。
  const uppers = [];
  const draws = [0, 0, 0, 0, 1, 35];
  const rand = (n) => {
    uppers.push(n);
    return draws.shift() ?? 0;
  };
  await bitch.heroine_bitch(31, rand);
  const lines = fixture.text_lines();
  assert.ok(
    lines.includes(
      '由于温妮欠的债务实在太高了，在休息的时候温妮被某位的债主绑架了！',
    ),
    '真身开场',
  );
  assert.ok(
    !lines.some((l) => l.includes('强制肉偿') && l.includes('债务过高')),
    '占位行已消失',
  );
  // 顺序断言放最后：门槛不成立（M11420）时上面两条先红，漏 await（M11427）
  // 时开场行照打、只有这里能拦
  assert.deepEqual(uppers, [3, 4, 10, 500, 3, 36], '调用点与真身的抽取序');
});

test('强制肉偿：kojo-dungeon-bitch.js 的 STUBBED_CALLS 已无强制肉偿', () => {
  const fixture = create_era_fixture();
  const mod = fixture.load_module('kojo/kojo-dungeon-bitch');
  assert.deepEqual(mod.STUBBED_CALLS, []);
});
