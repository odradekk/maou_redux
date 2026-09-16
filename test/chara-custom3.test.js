/**
 * ere/chara/chara-custom3.js 的行为测试（issue #392，N8 段 2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_CUSTOM3.ERB 的 3 个函数：
 *     @CHAR_CUSTOM_LOOK_PAGE（:1-111）、@CHAR_CUSTOM_LOOK_DEAL（:118-182）、
 *     @PRINT_ARR_GROUP（:184-231）
 *
 * 缝 = test/helpers/era-fixture.js。被测量的是：按钮的快捷键编码
 * （`L_IDX*100 + 序号`，即 CHAR_CUSTOM2 页脚回传的编码面）、素质的写入、
 * 以及 PRINT_ARR_GROUP 的 80 宽换行与「空串累计超过 10 个即止」。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-custom3');
}

function setup() {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '测试角色', callname: '测试角色' });
  fixture.era.addCharacter(1);
  fixture.store.set('flag:10005', 1); // era_flag.target
  return fixture;
}

/** 全部按钮（按出现顺序；history 版本含被 clear 掉的） */
function buttons(fixture, history = false) {
  const source = history ? fixture.lines_history : fixture.lines;
  return source
    .filter((line) => line.type === 'button')
    .map((line) => ({
      acc: line.accelerator,
      text: line.text,
      rendered: line.rendered,
      color: line.color,
      row: line.row,
    }));
}

/** 全部按钮的快捷键（按出现顺序） */
function accelerators(fixture) {
  return buttons(fixture).map((b) => b.acc);
}

/** 文本行 */
function texts(fixture) {
  return fixture.lines
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 按 Row 分组后的按钮快捷键（`printMultiColumns` 一次调用 = 一个 Row） */
function button_rows(fixture) {
  const grouped = new Map();
  for (const button of buttons(fixture)) {
    if (!grouped.has(button.row)) grouped.set(button.row, []);
    grouped.get(button.row).push(button.acc);
  }
  return [...grouped.values()];
}

/** 取整序列 [start..end]（含端） */
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

// —— @PRINT_ARR_GROUP（:184-231）——

test('PRINT_ARR_GROUP：按钮编码 = 组号 × 100 + 表内序号，未选中为灰', () => {
  const fixture = setup();
  const { print_arr_group } = load(fixture);

  print_arr_group(['', '金色', '栗色'], 2, 11);
  assert.deepEqual(accelerators(fixture), [1101, 1102]);
  assert.deepEqual(
    buttons(fixture).map((b) => b.text),
    ['金色', '栗色'],
    '空串项不渲染（:205-210）',
  );
  assert.deepEqual(
    buttons(fixture).map((b) => b.color),
    ['#808080', undefined],
    '未选中 SETCOLORBYNAME GRAY，选中项 RESETCOLOR（:220-226）',
  );
});

test('PRINT_ARR_GROUP：宽度按显示宽度累加 +2，达到 80 就换行', () => {
  const fixture = setup();
  const { print_arr_group } = load(fixture);

  // 每项「甲乙丙丁」显示宽 8，+2 = 10：第 8 项使 L_LEN = 80 → 从它起换行
  print_arr_group(['', ...Array.from({ length: 16 }, () => '甲乙丙丁')], 0, 3);

  assert.deepEqual(
    button_rows(fixture).map((row) => row.length),
    [7, 7, 2],
    '每项宽 8 时每行 7 项：阈值 80（:212-218）',
  );
});

test('PRINT_ARR_GROUP：换行后 L_LEN 从本项宽度重新起算', () => {
  const fixture = setup();
  const { print_arr_group } = load(fixture);

  // 每项「ab」显示宽 2、+2 = 4：第 20 项到 80 换行 → 19 + 2
  print_arr_group(['', ...Array.from({ length: 21 }, () => 'ab')], 0, 5);
  assert.deepEqual(
    button_rows(fixture).map((row) => row.length),
    [19, 2],
  );
});

test('PRINT_ARR_GROUP：空串累计超过 10 个即止（L_EXCEED 不重置）', () => {
  const fixture = setup();
  const { print_arr_group } = load(fixture);
  // 空串共 11 个（下标 0 与 2-11）→ 第 11 个触发 BREAK
  print_arr_group(['', '甲', '', '', '', '', '', '', '', '', '', ''], 1, 4);

  assert.deepEqual(accelerators(fixture), [401], '只有「甲」一枚按钮');
});

test('PRINT_ARR_GROUP：恰好 10 个空串不触发 BREAK（判据是 > 10）', () => {
  const fixture = setup();
  const { print_arr_group } = load(fixture);
  // 空串 10 个之后还有一个「乙」：阈值若收紧到 9，乙就被 BREAK 吞掉
  print_arr_group(['', '甲', '', '', '', '', '', '', '', '', '', '乙'], 1, 4);

  assert.deepEqual(accelerators(fixture), [401, 411], '阈值 > 10 才早退');
});

// —— @CHAR_CUSTOM_LOOK_PAGE（:1-111）——

test('LOOK_PAGE 0：十一组的编码逐组核对（组号 × 100 + 序号，空串项不出按钮）', () => {
  const fixture = setup();
  const { char_custom_look_page } = load(fixture);

  char_custom_look_page(0);
  assert.deepEqual(accelerators(fixture), [
    ...range(1101, 1111), // 发色（ARR_头发颜色2，「金色」起）
    ...range(1201, 1212), // 发型（ARR_发型，「自然」起）
    1300,
    1301,
    1302, // 头发长度：短/半长/长
    ...range(1401, 1406), // 状态
    ...range(1501, 1504), // 修剪
    ...range(2101, 2108), // 眼型
    ...range(2201, 2206), // 瞳色
    ...range(2301, 2304), // 唇
    2400,
    2401,
    2402, // 体型
    ...range(2500, 2506), // 阴毛状态（本地表无空串项）
    ...range(2601, 2604), // 乳头
  ]);
  assert.deepEqual(texts(fixture), [
    '■=== 发色 ===■',
    '■=== 发型 ===■',
    '■=== 头发长度 ===■',
    '■=== 状态 ===■',
    '■=== 修剪 ===■',
    '■=== 眼型 ===■',
    '■=== 瞳色 ===■',
    '■=== 唇型 ===■',
    '■=== 体型 ===■',
    '■=== 阴毛状态 ===■',
    '■=== 乳头 ===■',
  ]);
});

test('LOOK_PAGE 0：选中项按各表自己的换算（头发长度/体型 ÷100、阴毛状态分档）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:302', 201); // 头发长度 → (201-1)/100 = 2
  fixture.store.set('talent:1:308', 101); // 体型 → (101-1)/100 = 1
  fixture.store.set('talent:1:310', 100); // 阴毛状态 → 分档 3（「稀薄」，CASE 50 TO 100 先取）
  const { char_custom_look_page } = load(fixture);

  char_custom_look_page(0);
  const selected = buttons(fixture)
    .filter((b) => b.color === undefined)
    .map((b) => b.acc);
  assert.deepEqual(selected, [1302, 2401, 2503]);
});

test('LOOK_PAGE 0：阴毛状态七个档位的上下界（重叠区间先匹配先取）', () => {
  const fixture = setup();
  const { char_custom_look_page } = load(fixture);
  const table = [
    [0, null], // CASEELSE（档位 7 没有按钮，无选中项）
    [1, 2500],
    [2, 2501],
    [20, 2501], // CASE 2 TO 20 先于 20 TO 50
    [21, 2502],
    [50, 2502],
    [51, 2503],
    [100, 2503],
    [101, 2504],
    [150, 2504],
    [151, 2505],
    [200, 2505],
    [201, 2506],
    [500, 2506],
    [501, null], // CASEELSE 同上
  ];
  for (const [value, expected] of table) {
    fixture.lines.length = 0;
    fixture.store.set('talent:1:310', value);
    char_custom_look_page(0);
    // 只看阴毛状态组（25xx）：头发长度/体型在 0 值时也会选中各自的 0 号，
    // 与这一档无关
    const selected = buttons(fixture)
      .filter((b) => b.color === undefined && b.acc >= 2500 && b.acc < 2600)
      .map((b) => b.acc);
    assert.deepEqual(
      selected,
      expected === null ? [] : [expected],
      `阴毛状态 ${value}`,
    );
  }
});

test('LOOK_PAGE 1：普通勇者——三处标题与全部编码', () => {
  const fixture = setup();
  const { char_custom_look_page } = load(fixture);

  char_custom_look_page(1);
  assert.deepEqual(texts(fixture), [
    '■=== 魅力点 ===■',
    '■=== 癖 ===■',
    '■=== 曾经喜欢的东西 ===■',
    '■=== 成为勇者之前 ===■',
    '■=== 成为勇者的契机 ===■',
    '■=== 种族 ===■',
  ]);
  assert.deepEqual(accelerators(fixture), [
    ...range(3101, 3128), // 魅力点
    ...range(3201, 3234), // 癖
    ...range(3301, 3320), // 喜欢的东西
    ...range(4100, 4126), // 成为勇者前的生活（ARR 无空串首项）
    ...range(4200, 4225), // 成为勇者的契机
    ...range(100, 111), // 种族
  ]);
});

test('LOOK_PAGE 1：精英走「精英种族」（组 2），魔王整组不打印', () => {
  const fixture = setup();
  const { char_custom_look_page } = load(fixture);

  fixture.store.set('talent:1:220', 1); // 精英
  char_custom_look_page(1);
  assert.deepEqual(texts(fixture), [
    '■=== 魅力点 ===■',
    '■=== 癖 ===■',
    '■=== 曾经喜欢的东西 ===■',
    '■=== 来到据点之前 ===■',
    '■=== 回应召唤的理由 ===■',
    '■=== 精英种族 ===■',
  ]);
  assert.deepEqual(accelerators(fixture).slice(-9), range(201, 209));

  fixture.lines.length = 0;
  fixture.store.set('flag:10005', 0); // TARGET == MASTER
  char_custom_look_page(1);
  assert.deepEqual(texts(fixture), [
    '■=== 魅力点 ===■',
    '■=== 癖 ===■',
    '■=== 曾经喜欢的东西 ===■',
    '■=== 成为魔王之前 ===■',
    '■=== 成为魔王的契机 ===■',
  ]);
  assert.deepEqual(
    accelerators(fixture).slice(-26),
    range(4200, 4225),
    '魔王没有种族组：契机组是最后一组',
  );
});

// —— @CHAR_CUSTOM_LOOK_DEAL（:118-182）——

test('LOOK_DEAL：组号与序号按 ×100 拆开，逐组落到对应素质', () => {
  const fixture = setup();
  const { char_custom_look_deal } = load(fixture);
  const table = [
    [105, 314, 5], // 1 → 种族
    [207, 319, 7], // 2 → 种族2（精英种族）
    [1103, 300, 3], // 11 → 头发颜色
    [1205, 304, 5], // 12 → 发型
    [1302, 302, 202], // 13 → 头发长度 = 序号 ×100 + 2
    [1406, 301, 6], // 14 → 头发状态
    [1504, 303, 4], // 15 → 头发修剪方式
    [2107, 305, 7], // 21 → 目
    [2206, 306, 6], // 22 → 瞳色
    [2304, 307, 4], // 23 → 唇
    [2402, 308, 202], // 24 → 体型 = 序号 ×100 + 2
    [2603, 309, 3], // 26 → 乳头
    [3112, 312, 12], // 31 → 魅力点
    [3220, 313, 20], // 32 → 癖
    [3305, 317, 5], // 33 → 喜欢的东西
    [4112, 315, 12], // 41 → 成为勇者前的生活
    [4220, 316, 20], // 42 → 成为勇者的契机
  ];
  for (const [code, index, expected] of table) {
    assert.equal(char_custom_look_deal(code), 0, `编码 ${code}`);
    assert.equal(
      fixture.store.get(`talent:1:${index}`),
      expected,
      `编码 ${code}`,
    );
  }
});

test('LOOK_DEAL：阴毛状态的 7 档编码（2500-2506 → 1/2/21/51/101/151/202）', () => {
  const fixture = setup();
  const { char_custom_look_deal } = load(fixture);
  [1, 2, 21, 51, 101, 151, 202].forEach((value, i) => {
    assert.equal(char_custom_look_deal(2500 + i), 0);
    assert.equal(fixture.store.get('talent:1:310'), value, `第 ${i} 档`);
  });
});

test('LOOK_DEAL：阴毛状态序号 7 以上不写（无 CASEELSE 的 SELECTCASE）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:310', 55);
  const { char_custom_look_deal } = load(fixture);

  assert.equal(char_custom_look_deal(2507), 0, '分支已命中，返回值仍是 0');
  assert.equal(fixture.store.get('talent:1:310'), 55, '未写入');
});

test('LOOK_DEAL：未登记的组号返回 -1 且不写任何素质', () => {
  const fixture = setup();
  const { char_custom_look_deal } = load(fixture);
  for (const code of [1600, 1700, 2000, 2700, 3000, 3400, 4300, 9900]) {
    assert.equal(char_custom_look_deal(code), -1, `编码 ${code}`);
    assert.deepEqual(
      fixture.var_writes.filter((w) => w.name.startsWith('talent:1:')),
      [],
      `编码 ${code} 不应写素质`,
    );
  }
});
