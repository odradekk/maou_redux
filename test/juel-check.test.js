/**
 * ere/system/train/juel-check.js（含 page-ablup / page-info-exp 两个画面
 * 模块）的行为测试（issue #47：@JUEL_CHECK / @JUEL_CHECK_MAIN）。
 *
 * 缝 = test/helpers/era-fixture.js。期望值全部对着两处真身：
 *   - target/emuera.log:236-260 的黄金样本（结算表 13 行、SHOW_INFO_EXP、
 *     SHOW_JUEL——预置状态复刻样本前态 + 定值随机源，逐字比对）；
 *   - target/ERB/調教相關/TRAIN_MAIN.ERB:552-740 的梯子/加算/相殺语义。
 *
 * 验收项「13 项参数各有用例」：结算表 13 行每行一个用例（含精确行文与
 * 落账数值——纯数据结算错一格不报错，必须逐项钉）。「不发生重复结算」：
 * gotjuel 清零断言 + 引擎比对（真 endTrain 源码驱动）双重锁定。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');

// 世界底座：目标 31（温妮，黄金样本同款）、火车表已开、四张名字表已播。
// 等级 Lv1 与「初吻未定」是黄金样本温妮的前态（原作角色生成路径置 -1）
function seed_world(fixture) {
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  fixture.era.beginTrain(0, 31);
  seed_static_names(fixture);
  fixture.store.set('cflag:31:9', 1);
  fixture.store.set('cflag:31:16', -1);
  fixture.load_module('page/page-info-exp');
  fixture.load_module('page/page-ablup');
  return fixture.load_module('system/train/juel-check');
}

// 结算表在 text_lines() 里的位置：[0] 表头、[1..13] 13 行、[14] 尾行
const HEADER_INDEX = 0;
const FOOTER_INDEX = 14;

// 定值随机源（RAND:3 语义：返回池序号 0/1/2）：轮转 0→1→2。恒定单值在
// 有多个非空池的用例里会永远挑中空池（原作靠 RAND 的随机性保证终止），
// 测试必须轮转
const rotating_rng = () => {
  let i = 0;
  return () => i++ % 3;
};

// ———— 梯子（:559-585） ————

test('palam_to_gain：PALAMLV 默认阈值下的全部 26 个边界', () => {
  const fixture = create_era_fixture();
  const { palam_to_gain } = seed_world(fixture);
  const cases = [
    [0, 0],
    [99, 0], // < PALAMLV:1（100）
    [100, 1], // < PALAMLV:1*3（300）
    [299, 1],
    [300, 2], // < PALAMLV:2（500）
    [499, 2],
    [500, 10], // < PALAMLV:2*3（1500）
    [1499, 10],
    [1500, 20], // < PALAMLV:3（3000）
    [2999, 20],
    [3000, 100], // < PALAMLV:3*2（6000）
    [5999, 100],
    [6000, 200], // < PALAMLV:4（10000）
    [9999, 200],
    [10000, 1000], // < PALAMLV:5（30000）
    [29999, 1000],
    [30000, 2000], // < PALAMLV:6（60000）
    [59999, 2000],
    [60000, 3000], // < PALAMLV:7（100000）
    [99999, 3000],
    [100000, 5000], // < PALAMLV:8（150000）
    [149999, 5000],
    [150000, 8000], // < PALAMLV:9（250000）
    [249999, 8000],
    [250000, 12000], // 梯子外兜底
    [99999999, 12000],
  ];
  for (const [value, gain] of cases) {
    assert.equal(palam_to_gain(value), gain, `PALAM ${value} → ${gain}`);
  }
});

// ———— 结算表 13 行：每行一个用例（预置互不污染，行文与落账逐字钉） ————

// 基础行（0/1/2/3/7/12）：( 上次值 + 本次增量 )            = 结果
// 抵消行（4/5/6/8/9/10/11）：( 上次值 + 本次增量 ) - 抵消量 = 结果。
// 单行用例里池子全空 → 抵消量恒 0；非零抵消由黄金样本复刻用例覆盖。
const ROW_CASES = [
  {
    row: 0,
    desc: '阴核（基础行）：梯子 200 + EX:0 绝顶加成 ×1000',
    seed: { palam: { 0: 9999 }, ex: { 0: 1 }, juel: { 0: 2279 } },
    line: '阴核点数：(    2279 +     1200)            =     3479|',
    juel_key: 0,
    juel_now: 3479,
  },
  {
    row: 1,
    desc: '私处（基础行）：梯子 1 + EX:1 ×1000 ×2',
    seed: { palam: { 1: 250 }, ex: { 1: 2 }, juel: { 1: 5 } },
    line: '私处点数：(       5 +     2001)            =     2006|',
    juel_key: 1,
    juel_now: 2006,
  },
  {
    row: 2,
    desc: '肛门（基础行）：梯子 2、无绝顶加成',
    seed: { palam: { 2: 499 } },
    line: '肛门点数：(       0 +        2)            =        2|',
    juel_key: 2,
    juel_now: 2,
  },
  {
    row: 3,
    desc: '乳房（基础行，juel 14）：梯子 100 + EX:3 ×1000 ×3',
    seed: { palam: { 14: 5999 }, ex: { 3: 3 }, juel: { 14: 40 } },
    line: '乳房点数：(      40 +     3100)            =     3140|',
    juel_key: 14,
    juel_now: 3140,
  },
  {
    row: 4,
    desc: '恭顺（抵消行，juel 4）：池空 → 抵消 0',
    seed: { palam: { 4: 1499 } },
    line: '恭顺点数：(       0 +       10) -        0 =       10|',
    juel_key: 4,
    juel_now: 10,
  },
  {
    row: 5,
    desc: '欲情（抵消行，juel 5）：梯子 20',
    seed: { palam: { 5: 2999 } },
    line: '欲情点数：(       0 +       20) -        0 =       20|',
    juel_key: 5,
    juel_now: 20,
  },
  {
    row: 6,
    desc: '屈服（抵消行，juel 6）：梯子 1',
    seed: { palam: { 6: 299 } },
    line: '屈服点数：(       0 +        1) -        0 =        1|',
    juel_key: 6,
    juel_now: 1,
  },
  {
    row: 7,
    desc: '习得（基础行，juel 7）：梯子 0（PALAM < 100）→ 原值不动',
    seed: { palam: { 7: 99 }, juel: { 7: 3 } },
    line: '习得点数：(       3 +        0)            =        3|',
    juel_key: 7,
    juel_now: 3,
  },
  {
    row: 8,
    desc: '耻情（抵消行，juel 8）：梯子顶格 12000',
    seed: { palam: { 8: 250000 } },
    line: '耻情点数：(       0 +    12000) -        0 =    12000|',
    juel_key: 8,
    juel_now: 12000,
  },
  {
    row: 9,
    desc: '苦痛（抵消行，juel 9）：梯子 2000',
    seed: { palam: { 9: 59999 } },
    line: '苦痛点数：(       0 +     2000) -        0 =     2000|',
    juel_key: 9,
    juel_now: 2000,
  },
  {
    row: 10,
    desc: '恐怖（抵消行，juel 10）：梯子 3000',
    seed: { palam: { 10: 99999 } },
    line: '恐怖点数：(       0 +     3000) -        0 =     3000|',
    juel_key: 10,
    juel_now: 3000,
  },
  {
    row: 11,
    desc: '否定（抵消行，juel 100）：反感+不快+抑郁汇入（100+1+2）',
    seed: { palam: { 11: 3000, 12: 100, 13: 499 }, juel: { 100: 5 } },
    line: '否定点数：(       5 +      103) -        0 =      108|',
    juel_key: 100,
    juel_now: 108,
    header: '调教结果：否定点数108个抵消。',
  },
  {
    row: 12,
    desc: '癖好（基础行，juel 15）：未定制癖好名显示「癖好」',
    seed: { palam: { 15: 1500 }, juel: { 15: 7 } },
    line: '癖好点数：(       7 +       20)            =       27|',
    juel_key: 15,
    juel_now: 27,
  },
];

for (const tc of ROW_CASES) {
  test(`结算表第 ${tc.row} 行：${tc.desc}`, () => {
    const fixture = create_era_fixture();
    const mod = seed_world(fixture);
    for (const [key, value] of Object.entries(tc.seed.palam || {})) {
      fixture.store.set(`palam:31:${key}`, value);
    }
    for (const [key, value] of Object.entries(tc.seed.ex || {})) {
      fixture.store.set(`ex:31:${key}`, value);
    }
    for (const [key, value] of Object.entries(tc.seed.juel || {})) {
      fixture.store.set(`juel:31:${key}`, value);
    }

    mod.juel_check_main(31, () => 0);

    const texts = fixture.text_lines();
    // 表头：TFLAG:58（相殺前的否定保有）> 0 才有抵消句——仅第 11 行用例
    // 会造出非零否定（本组其余用例 juel:100 恒 0）
    assert.equal(texts[HEADER_INDEX], tc.header ?? '调教结果：');
    assert.equal(texts[1 + tc.row], tc.line);
    assert.equal(texts[FOOTER_INDEX], '以上的点数变化了。');
    assert.equal(fixture.store.get(`juel:31:${tc.juel_key}`), tc.juel_now);
    // 结算后 gotjuel 清零（职责划分定案，见下组用例）
    assert.equal(fixture.store.get(`gotjuel:31:${tc.juel_key}`), 0);
  });
}

test('结算表第 12 行：CSTR:7 定制癖好名替换「癖好」标签', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  fixture.store.set('palam:31:15', 1500);
  fixture.store.set('cstr:31:7', '足交');

  mod.juel_check_main(31, () => 0);

  assert.equal(
    fixture.text_lines()[1 + 12],
    '足交点数：(       0 +       20)            =       20|',
  );
});

// ———— 相殺（:626-649）与 TFLAG 快照（:615-624） ————

test('相殺：否定余量逐轮减半（定值随机源），逐步写序固定', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  fixture.store.set('juel:31:100', 100);
  fixture.store.set('juel:31:4', 1000); // 池子远大于否定 → 不触发钳制

  mod.offset_negative_group(31, [4, 5, 6], () => 0); // 恒挑池 4

  // 每轮扣余量一半（向下取整）：100 → 50 → 25 → 13 → 7 → 4 → 2 → 1 → 0；
  // 余量 1 时半值为 0、改扣 1。逐步写序断言——终态守恒（总量 = 100）对
  // 取量公式的漂移不敏感，只有中间步能区分
  assert.deepEqual(
    fixture.var_writes
      .filter((w) => w.name === 'juel:31:100')
      .map((w) => w.value),
    [50, 25, 13, 7, 4, 2, 1, 0],
  );
  assert.equal(fixture.store.get('juel:31:4'), 900, '1000 - 100 = 900');
});

test('相殺：池子里不够时整池扣走（钳制），否定余量留在池空之后', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  fixture.store.set('juel:31:100', 1000);
  fixture.store.set('juel:31:5', 30); // 池 5 是唯一非空池：take=min(500,30)=30

  mod.offset_negative_group(31, [4, 5, 6], rotating_rng());

  assert.equal(fixture.store.get('juel:31:5'), 0, '现有 30 整池扣走');
  assert.equal(fixture.store.get('juel:31:100'), 970, '三池皆空 → 否定残留');
});

test('相殺：余量取半为 0 且未清零时改扣 1（单点余量路径）', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  fixture.store.set('juel:31:100', 1);
  fixture.store.set('juel:31:6', 5);

  mod.offset_negative_group(31, [4, 5, 6], () => 2);

  assert.equal(fixture.store.get('juel:31:100'), 0);
  assert.equal(fixture.store.get('juel:31:6'), 4);
});

test('相殺两组先后（$LABEL_1 → $LABEL_2）：前组吃满后组不动', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  // 否定余量小于第一组容量：全部由恭顺组消化（juel-check_main 的调用序，
  // 经主入口断言——直接调 offset_negative_group 证不了先后）
  fixture.store.set('juel:31:100', 30);
  fixture.store.set('juel:31:4', 1000);
  fixture.store.set('juel:31:8', 500);

  mod.juel_check_main(31, () => 0);

  assert.equal(fixture.store.get('juel:31:100'), 0);
  assert.equal(fixture.store.get('juel:31:4'), 970, '恭顺组消化全部 30');
  assert.equal(fixture.store.get('juel:31:8'), 500, '否定已清 → 耻情组不动');
});

test('TFLAG 快照：相殺前的 juel 4/5/6/8/9/10/100 记入 51-53/55-57/58，tflag:54 不写', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  const pre = { 4: 11, 5: 22, 6: 33, 7: 44, 8: 55, 9: 66, 10: 77, 100: 88 };
  for (const [key, value] of Object.entries(pre)) {
    fixture.store.set(`juel:31:${key}`, value);
  }

  mod.juel_check_main(31, rotating_rng());

  // count 0-2、4-6 → tflag:(count+51) = juel:(count+4)；count 3 跳过
  assert.equal(fixture.store.get('tflag:51'), 11);
  assert.equal(fixture.store.get('tflag:52'), 22);
  assert.equal(fixture.store.get('tflag:53'), 33);
  assert.equal(fixture.store.get('tflag:55'), 55);
  assert.equal(fixture.store.get('tflag:56'), 66);
  assert.equal(fixture.store.get('tflag:57'), 77);
  assert.equal(fixture.store.get('tflag:58'), 88);
  assert(
    !fixture.var_writes.some((w) => w.name === 'tflag:54'),
    'tflag:54 对应 juel:7（习得），不参与抵消、不落快照',
  );
});

// ———— 与引擎 endTrain 的职责划分（验收项：不发生重复结算） ————

test('职责划分：结算尾部把全部 OWNED 键的 gotjuel 清回 0（引擎加算成无操作）', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  // 复合前态：多个键有非零增量的结算路径
  fixture.store.set('palam:31:0', 10000);
  fixture.store.set('ex:31:0', 1);
  fixture.store.set('palam:31:5', 3000);
  fixture.store.set('palam:31:11', 3000);
  fixture.store.set('juel:31:0', 2279);
  fixture.store.set('juel:31:100', 108);

  mod.juel_check_main(31, rotating_rng());
  const owned_keys = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 14, 15, 100];
  for (const key of owned_keys) {
    assert.equal(
      fixture.store.get(`gotjuel:31:${key}`),
      0,
      `gotjuel:${key} 必须清零`,
    );
  }
  // 死存储不落笔（引擎 endTrain 会把非零 gotjuel:3 加进 juel:3、偏离原作）
  assert(
    !fixture.var_writes.some((w) => w.name === 'gotjuel:31:3'),
    'GOTJUEL:3（润滑）是原作死存储，ere 侧不得写',
  );
});

const { load_engine_bundle } = require('./helpers/engine-bundle');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;

engine_test(
  '引擎比对：endTrain 逐键把 gotjuel 加进 juel——非零残留即双重累加；全零为精确无操作',
  () => {
    const { era_api } = engine;
    const settle = (got0, got100) => {
      const data = {
        no: [31],
        gotjuel: { 31: { 0: got0, 100: got100 } },
        juel: { 31: { 0: 10, 100: 20 } },
      };
      era_api.prototype.endTrain.call({
        data,
        getCharactersInTrain: () => data.no,
      });
      return data.juel[31];
    };
    // 引擎确实会加（app.asar 源码：Object.entries(gotjuel[e]) 全键遍历）——
    // 游戏侧若不清零，本次增量被再加一遍
    assert.deepEqual(settle(5, 7), { 0: 15, 100: 27 });
    // juel-check 的清零使引擎加算成为精确无操作（数值一动不动）
    assert.deepEqual(settle(0, 0), { 0: 10, 100: 20 });
  },
);

// ———— $INPUT_LOOP_1（:443-549） ————

test('交互循环：选 999 退出，收尾三查各占位一行', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.set_inputs(999);

  await fixture.load_module('system/train/juel-check').run_juel_check();

  assert.deepEqual(fixture.inputs_consumed, [
    { api: 'waitAnyKey' }, // :439 WAIT（结算表后的读键）
    { api: 'input', value: 999 }, // :461 INPUT → :540 退出
  ]);
  for (const name of [
    'YOKUBO_UP_CHECK',
    'CHECK_SELLASSIABLE',
    'CHECK_SPECIALSKIL',
  ]) {
    assert(
      fixture.text_lines().some((line) => line.includes(`@${name}`)),
      `${name} 占位行必须出现`,
    );
  }
  // [999] 按钮按 PR #53 通则断言 rendered（正文不写编号前缀，引擎拼）
  const exit_button = fixture.lines.find(
    (line) => line.type === 'button' && line.accelerator === 999,
  );
  assert.equal(exit_button.rendered, '[999] - 能力值提高结束');
});

test('交互循环：能力分支命中打占位、重绘后可再选（进得去出得来）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.set_inputs(0, 999);

  await fixture.load_module('system/train/juel-check').run_juel_check();

  assert(
    fixture.text_lines().some((line) => line.includes('@ABLUP0')),
    'ABLUP0 占位行必须出现',
  );
  // 重绘两次首轮：SHOW_INFO_EXP 的等级行每轮一条
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('当前是Lv')).length,
    2,
    '一次能力尝试 + 一次退出 → 等级行出现两轮',
  );
});

// 原「交互循环：无分支输入静默重绘」用例（喂 7）已删（#130）：7 不是
// 已打印按钮的快捷键，引擎的 input() 在渲染层就把它弹回——「无分支输入」
// 在引擎侧不可达（本画面印出的编号全部落在 ABLUP_IDS ∪ {999}）。重绘
// 机理本身由上一用例（能力尝试 + 退出 → 等级行两轮）覆盖。

test('自动升级（GETBIT(FLAG:5,35)）：不进交互，直接收尾', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('flag:5', 2 ** 35);

  await fixture.load_module('system/train/juel-check').run_juel_check();

  assert.deepEqual(
    fixture.inputs_consumed,
    [{ api: 'waitAnyKey' }],
    '自动模式不吃 INPUT',
  );
  assert(
    fixture.text_lines().some((line) => line.includes('@AUTO_ABLUP')),
    'AUTO_ABLUP 占位行必须出现',
  );
  assert(
    fixture.text_lines().some((line) => line.includes('@CHECK_SPECIALSKIL')),
  );
  // 位 34 不得误触发（相邻位防串）
  const other = create_era_fixture();
  seed_world(other);
  other.store.set('flag:5', 2 ** 34);
  other.set_inputs(999);
  await other.load_module('system/train/juel-check').run_juel_check();
  assert(
    !other.text_lines().some((line) => line.includes('@AUTO_ABLUP')),
    '位 34 不是自动升级开关',
  );
});

// ———— 黄金样本比对（target/emuera.log:236-260，前态复刻 + 定值随机源） ————

test('黄金样本 :237-253：结算表头与 13 行逐字一致（否定点数 208 抵消 41）', () => {
  const fixture = create_era_fixture();
  const mod = seed_world(fixture);
  // 前态 = 样本结算前的持有/参数面
  fixture.store.set('juel:31:0', 2279); // 阴核保有
  fixture.store.set('juel:31:7', 3); // 习得保有
  fixture.store.set('juel:31:100', 108); // 否定保有
  fixture.store.set('palam:31:0', 9999); // 阴核 → 梯子 200（[6000,10000) 档）
  fixture.store.set('ex:31:0', 1); // 阴蒂绝顶 1 次 → +1000
  fixture.store.set('palam:31:5', 2000); // 欲情 → 20（[1500,3000) 档）
  fixture.store.set('palam:31:6', 200); // 屈服 → 1（[100,300) 档）
  fixture.store.set('palam:31:7', 200); // 习得 → 1（同上）
  fixture.store.set('palam:31:8', 2000); // 耻情 → 20（同欲情档）
  fixture.store.set('palam:31:11', 3000); // 反感 → 100（[3000,6000) 档，汇入否定）
  // 相殺抽取序（定值随机源，轮转防死循环）：欲情 → 屈服（LABEL_1 清 21），
  // 耻情整池 20（LABEL_2）——否定的 208 - 21 - 20 = 167，与样本一致
  const picks = [1, 2, 0];
  let pick_index = 0;

  mod.juel_check_main(31, () => picks[pick_index++ % picks.length]);
  assert.deepEqual(fixture.text_lines().slice(0, 15), [
    '调教结果：否定点数208个抵消。',
    '阴核点数：(    2279 +     1200)            =     3479|',
    '私处点数：(       0 +        0)            =        0|',
    '肛门点数：(       0 +        0)            =        0|',
    '乳房点数：(       0 +        0)            =        0|',
    '恭顺点数：(       0 +        0) -        0 =        0|',
    '欲情点数：(       0 +       20) -       20 =        0|',
    '屈服点数：(       0 +        1) -        1 =        0|',
    '习得点数：(       3 +        1)            =        4|',
    '耻情点数：(       0 +       20) -       20 =        0|',
    '苦痛点数：(       0 +        0) -        0 =        0|',
    '恐怖点数：(       0 +        0) -        0 =        0|',
    '否定点数：(     108 +      100) -       41 =      167|',
    '癖好点数：(       0 +        0)            =        0|',
    '以上的点数变化了。',
  ]);
  // 相殺后的账面（SHOW_JUEL 的读数源）
  assert.equal(fixture.store.get('juel:31:0'), 3479);
  assert.equal(fixture.store.get('juel:31:7'), 4);
  assert.equal(fixture.store.get('juel:31:100'), 167);
});

test('黄金样本 :255-256：SHOW_INFO_EXP 的经验行与等级行逐字一致', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('exp:31:2', 3); // 绝顶经验 3（样本值）
  const { show_info_exp } = fixture.load_module('page/page-info-exp');

  show_info_exp(31);

  assert.deepEqual(fixture.text_lines(), [
    '　绝顶经验:     3',
    '　温妮当前是Lv1，战斗经验值总计0点，本级经验：0/20',
  ]);
});

test('SHOW_INFO_EXP：四个经验一行的换行与 8 宽名字列、残行收尾', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  for (const id of [0, 1, 2, 3, 5]) {
    fixture.store.set(`exp:31:${id}`, 10 + id);
  }
  const { show_info_exp } = fixture.load_module('page/page-info-exp');

  show_info_exp(31);

  // 名字列：私处经验（8 显示宽）不补空格；每个格子自带全角引导空格
  //（原作每个 PRINTFORM 都以全角空格开头）；LV 公式行照常殿后
  assert.deepEqual(fixture.text_lines(), [
    '　私处经验:    10　肛门经验:    11　绝顶经验:    12　射精经验:    13',
    '　性交经验:    15',
    '　温妮当前是Lv1，战斗经验值总计0点，本级经验：0/20',
  ]);
});

test('SHOW_INFO_EXP：初吻/初体验括号行（两者皆无时不输出）', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('cflag:31:16', 993);
  fixture.store.set('cflag:31:15', 103);
  const { show_info_exp } = fixture.load_module('page/page-info-exp');

  show_info_exp(31);

  assert.deepEqual(fixture.text_lines().slice(-1), [
    '　[初吻对象：狂王][初体验对象：野狗]',
  ]);
});

test('黄金样本 :258-260：SHOW_JUEL 三行逐字一致（样本的结算后读数）', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('juel:31:0', 3479);
  fixture.store.set('juel:31:7', 4);
  fixture.store.set('juel:31:100', 167);
  const { show_juel } = fixture.load_module('page/page-ablup');

  show_juel(31);

  // 末项恰为 4 的倍数 → PRINTL 补一空行（br），随后是尾部分隔线
  assert.deepEqual(fixture.text_lines(), [
    ' 阴核点数：  3479 私处点数：     0 肛门点数：     0 乳房点数：     0',
    ' 恭顺点数：     0 欲情点数：     0 屈服点数：     0 习得点数：     4',
    ' 耻情点数：     0 苦痛点数：     0 恐怖点数：     0 否定点数：   167',
  ]);
  assert.equal(fixture.lines.at(-2).type, 'br', '末行后有空行（:26 PRINTL）');
  assert.equal(fixture.lines.at(-1).type, 'divider', '尾部点线（:27）');
});

test('SHOW_JUEL：男人（TALENT:122）第 0 项显示「阴茎」', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('juel:31:0', 3479);
  const { show_juel } = fixture.load_module('page/page-ablup');

  show_juel(31);

  assert.ok(fixture.text_lines()[0].startsWith(' 阴茎点数：  3479'));
});

test('SHOW_ABLUP_SELECT：能力按钮化（PR #53）——编号空间、性别过滤与 [999]', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('abl:31:0', 3);
  fixture.store.set('mark:31:3', 1);
  const { show_ablup_select } = fixture.load_module('page/page-ablup');

  show_ablup_select(31);

  const buttons = fixture.lines.filter((line) => line.type === 'button');
  // 样本 :262-268 的条目序（0-3、10-17、20-22、30-33、37、39、99）——女
  // 性对象（无 TALENT:122）按 :48-49 过滤掉 23 断背气质，样本同款
  assert.deepEqual(
    buttons.map((b) => b.accelerator),
    [
      0, 1, 2, 3, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 30, 31, 32, 33,
      37, 39, 99, 999,
    ],
  );
  // 首条与 [99]：样本的「阴蒂感觉 - LV 3」「反抗刻印 - LV 1」（编号由
  // 引擎拼、正文空白折叠——[ 0] 的补位不可再现，见 page-ablup.js 文件头）
  assert.equal(buttons[0].rendered, '[0] 阴蒂感觉 - LV 3');
  assert.equal(buttons.at(-2).rendered, '[99] 反抗刻印 - LV 1');
  assert.equal(buttons.at(-1).rendered, '[999] - 能力值提高结束');
  // 4 列换行：21 条能力（5 行 × 4 + 残行 1）→ 6 次 br，[99] 行与 [999]
  // 行各 1 次 → 共 8
  const br_count = fixture.lines.filter((line) => line.type === 'br').length;
  assert.equal(br_count, 8);
});

test('SHOW_ABLUP_SELECT：男无 私处感觉/百合气质/百合中毒，第 0 项改「阴茎感觉」', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('talent:31:122', 1);
  const { show_ablup_select } = fixture.load_module('page/page-ablup');

  show_ablup_select(31);

  const accelerators = fixture.lines
    .filter((line) => line.type === 'button')
    .map((line) => line.accelerator);
  assert.ok(!accelerators.includes(2));
  assert.ok(!accelerators.includes(22));
  assert.ok(!accelerators.includes(33));
  assert.ok(accelerators.includes(23), '男人可提升断背气质');
  assert.equal(
    fixture.lines.find((line) => line.accelerator === 0).rendered,
    '[0] 阴茎感觉 - LV 0',
  );
});

test('SHOW_ABLUP_SELECT：感觉缺失灰显（TALENT:101 & 2 → 阴蒂钮变灰）', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('talent:31:101', 2);
  const { show_ablup_select } = fixture.load_module('page/page-ablup');

  show_ablup_select(31);

  const button = fixture.lines.find((line) => line.accelerator === 0);
  assert.equal(button.color, '#808080');
});

test('SHOW_ABLUP_SELECT：CSTR:7 定制癖好 → 追加 [4] 感觉与 [40] 中毒钮', () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('cstr:31:7', '足交');
  fixture.store.set('abl:31:4', 2);
  const { show_ablup_select } = fixture.load_module('page/page-ablup');

  show_ablup_select(31);

  assert.equal(
    fixture.lines.find((line) => line.accelerator === 4).rendered,
    '[4] 足交感觉 - LV 2',
  );
  assert.equal(
    fixture.lines.find((line) => line.accelerator === 40).rendered,
    '[40] 足交中毒 - LV 0',
  );
});

// ———— 存根清单核对 ————

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = seed_world(fixture);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  assert.equal(STUBBED_CALLS.length, 30); // 26 个 ABLUPxx + 4 个收尾/自动
  for (const name of STUBBED_CALLS) {
    assert.ok(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
