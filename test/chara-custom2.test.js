/**
 * ere/chara/chara-custom2.js 的行为测试（issue #392，N8 段 2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_CUSTOM2 ver1.0.1.ERB 的 8 个函数：
 *     @CHAR_CUSTOM / @CHAR_CUSTOM_TALENT_DEAL / @CONFLICT_CHECK /
 *     @CHAR_CUSTOM_TALENT_PAGE / @PRINT_SINGLE_TALENT / @TALENT_EMPTY_CHECK /
 *     @CHARA_COST / @CHARA_FIRST_XP
 *
 * 缝 = test/helpers/era-fixture.js ＋ 三个随机源形参（RAND:3 / RAND:6 / RAND:2）。
 * 随机上界单独钉：`rand(n)` 捕获实参 n（只取上界不取命中）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-custom2');
}

function setup(cid = 1) {
  const fixture = create_era_fixture();
  fixture.seed_chara(cid, { id: cid, name: '测试角色', callname: '测试角色' });
  fixture.era.addCharacter(cid);
  fixture.store.set('flag:10005', cid); // era_flag.target
  return fixture;
}

/** 全部按钮（按出现顺序） */
function buttons(fixture) {
  return fixture.lines
    .filter((line) => line.type === 'button')
    .map((line) => ({ acc: line.accelerator, text: line.text }));
}

function texts(fixture) {
  return fixture.lines
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 文本行（含已被 clear 掉的历史——跨重绘的断言看它） */
function texts_history(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 按 Row 分组的按钮快捷键 */
function button_rows(fixture) {
  const grouped = new Map();
  for (const line of fixture.lines) {
    if (line.type !== 'button') continue;
    if (!grouped.has(line.row)) grouped.set(line.row, []);
    grouped.get(line.row).push(line.accelerator);
  }
  return [...grouped.values()];
}

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

// —— @CHARA_COST（:543-594）——

test('CHARA_COST：无素质时是基础价 500000', () => {
  const fixture = setup();
  const { chara_cost } = load(fixture);
  assert.equal(chara_cost(1), 500000);
});

test('CHARA_COST：十三档单价逐档核对（表驱动）', () => {
  const fixture = setup();
  const { chara_cost } = load(fixture);
  // 单价可以单独为负，但结果会被钳到 0（:591-592），所以每轮都配一个
  // +15 万的锚点素质（10 或 31，两者不同档）：锚点 + 目标档位的净效果。
  // [锚点, 目标档位, 期望价格]
  const table = [
    [31, 10, 800000], // +150000
    [31, 37, 800000],
    [31, 143, 800000],
    [10, 11, 600000], // -50000
    [10, 16, 600000],
    [10, 133, 600000],
    [10, 20, 550000], // -100000
    [10, 82, 550000],
    [10, 23, 800000], // +150000
    [10, 57, 800000],
    [10, 30, 550000], // -100000
    [10, 256, 550000],
    [10, 31, 800000], // +150000
    [10, 187, 800000],
    [10, 275, 800000], // 区间 275-279
    [10, 279, 800000],
    [10, 471, 800000], // 区间 471-485
    [10, 485, 800000],
    [10, 0, 800000], // +150000
    [10, 271, 800000],
    [10, 200, 660000], // +10000（区间 200-220）
    [10, 220, 660000],
    [10, 221, 660000], // +10000（单列）
    [10, 69, 550000], // -100000
    [10, 280, 550000],
    [10, 9, 550000], // -100000
    [10, 152, 550000],
    [10, 73, 800000], // +150000
    [10, 272, 800000],
    [10, 119, 850000], // +200000
    [10, 240, 850000], // 区间 240-252
    [10, 252, 850000],
    [10, 257, 850000], // 区间 257-263
    [10, 263, 850000],
    [10, 85, 1250000], // +600000
    [10, 86, 1250000],
  ];
  for (const [anchor, index, expected] of table) {
    for (const key of [...fixture.store.keys()]) {
      if (key.startsWith('talent:1:')) fixture.store.delete(key);
    }
    fixture.store.set(`talent:1:${anchor}`, 1);
    fixture.store.set(`talent:1:${index}`, 1);
    assert.equal(chara_cost(1), expected, `档位 ${index}`);
  }
});

test('CHARA_COST：只认「恰好等于 1」的素质（值为 2 不计价）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:10', 2);
  const { chara_cost } = load(fixture);
  assert.equal(chara_cost(1), 500000);
});

test('CHARA_COST：扫描区间是 0-499（500 号不计价）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:499', 1); // 表外档位，不计价
  fixture.store.set('talent:1:500', 1);
  const { chara_cost } = load(fixture);
  assert.equal(chara_cost(1), 500000);
});

test('CHARA_COST：粉毛（发色 11）额外加十万', () => {
  const fixture = setup();
  fixture.store.set('talent:1:300', 11);
  const { chara_cost } = load(fixture);
  assert.equal(chara_cost(1), 600000);
});

test('CHARA_COST：负价钳到 0（基础价仍是 500000）', () => {
  const fixture = setup();
  // 11(-5万) 20(-10万) 30(-10万) 69(-10万) 9(-10万) = -45 万
  for (const index of [11, 20, 30, 69, 9]) {
    fixture.store.set(`talent:1:${index}`, 1);
  }
  const { chara_cost } = load(fixture);
  assert.equal(chara_cost(1), 500000);
});

// —— @CONFLICT_CHECK（:217-261）——

test('CONFLICT_CHECK：84 对互斥素质逐对核对（表驱动）', () => {
  const fixture = setup();
  const { CONFLICT_PAIRS, custom_conflict_check } = load(fixture);
  // 表本体另抄一份：实现在表里改一个数、这里就对不上
  const SOURCE_PAIRS = [
    [0, 75],
    [30, 75],
    [10, 12],
    [11, 13],
    [13, 18],
    [14, 16],
    [15, 17],
    [17, 18],
    [20, 23],
    [21, 23],
    [22, 23],
    [20, 63],
    [21, 63],
    [22, 63],
    [23, 24],
    [25, 26],
    [27, 28],
    [30, 31],
    [32, 33],
    [35, 36],
    [40, 41],
    [42, 43],
    [44, 45],
    [50, 51],
    [61, 62],
    [62, 64],
    [70, 71],
    [74, 150],
    [76, 85],
    [74, 75],
    [74, 77],
    [74, 78],
    [75, 77],
    [75, 78],
    [77, 78],
    [122, 78],
    [79, 80],
    [79, 81],
    [79, 82],
    [79, 122],
    [80, 81],
    [80, 82],
    [81, 82],
    [99, 100],
    [101, 102],
    [103, 104],
    [105, 106],
    [103, 122],
    [104, 122],
    [107, 108],
    [111, 112],
    [109, 110],
    [109, 114],
    [109, 116],
    [119, 109],
    [119, 116],
    [119, 114],
    [119, 110],
    [122, 109],
    [122, 110],
    [122, 114],
    [122, 116],
    [122, 119],
    [110, 114],
    [110, 116],
    [114, 116],
    [121, 122],
    [153, 154],
    [99, 263],
    [153, 122],
    [154, 122],
    [130, 122],
    [155, 122],
    [157, 122],
    [155, 156],
    [10, 161],
    [26, 161],
    [60, 150],
    [0, 122],
    [248, 256],
    [244, 253],
    [244, 255],
    [253, 255],
    [259, 260],
  ];
  assert.deepEqual(CONFLICT_PAIRS, SOURCE_PAIRS, '表本体逐对一致');
  assert.equal(CONFLICT_PAIRS.length, 84);

  for (const [left, right] of SOURCE_PAIRS) {
    for (const key of fixture.store.keys()) {
      if (key.startsWith('talent:1:')) fixture.store.delete(key);
    }
    fixture.store.set(`talent:1:${left}`, 1);
    fixture.store.set(`talent:1:${right}`, 1);
    custom_conflict_check(left, 1);
    assert.equal(
      fixture.store.get(`talent:1:${left}`),
      1,
      `对 ${left}/${right}`,
    );
    assert.equal(
      fixture.store.get(`talent:1:${right}`),
      0,
      `对 ${left}/${right} 的右侧被清`,
    );
  }
});

test('CONFLICT_CHECK：只有一侧为真时不动', () => {
  const fixture = setup();
  fixture.store.set('talent:1:10', 1);
  const { custom_conflict_check } = load(fixture);
  custom_conflict_check(10, 1);
  assert.equal(fixture.store.get('talent:1:10'), 1);
  assert.equal(fixture.store.get('talent:1:12') || 0, 0);
});

test('CONFLICT_CHECK：ARG 不在任何一对里时什么也不发生', () => {
  const fixture = setup();
  fixture.store.set('talent:1:10', 1);
  fixture.store.set('talent:1:12', 1);
  const { custom_conflict_check } = load(fixture);
  custom_conflict_check(999, 1);
  assert.equal(fixture.store.get('talent:1:10'), 1);
  assert.equal(fixture.store.get('talent:1:12'), 1);
});

// —— @CHAR_CUSTOM_TALENT_DEAL（:154-215）——

test('TALENT_DEAL：越界返回 -1 且不动任何素质', () => {
  const fixture = setup();
  const { char_custom_talent_deal } = load(fixture);
  for (const index of [-1, 501]) {
    assert.equal(char_custom_talent_deal(index, 1), -1, `下标 ${index}`);
  }
  assert.deepEqual(
    fixture.var_writes.filter((w) => w.name.startsWith('talent:')),
    [],
  );
});

test('TALENT_DEAL：取反——已设的取消、未设的设上', () => {
  const fixture = setup();
  fixture.store.set('talent:1:10', 1);
  const { char_custom_talent_deal } = load(fixture);
  assert.equal(char_custom_talent_deal(10, 1), 0);
  assert.equal(fixture.store.get('talent:1:10'), 0);
  assert.equal(char_custom_talent_deal(10, 1), 0);
  assert.equal(fixture.store.get('talent:1:10'), 1);
});

test('TALENT_DEAL：胸围五档互斥，选中项保留原值（1）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:110', 1);
  const { char_custom_talent_deal } = load(fixture);
  char_custom_talent_deal(114, 1);

  assert.equal(fixture.store.get('talent:1:114'), 1);
  for (const index of [109, 110, 116, 119]) {
    assert.equal(
      fixture.store.get(`talent:1:${index}`) || 0,
      0,
      `第 ${index} 档被清`,
    );
  }
  assert.ok(
    texts(fixture).some((t) => t.includes('CHAR_BUST_REGENERATE_WAPPED')),
    '胸围重掷打占位行（TRYCALL 的真身未移植）',
  );
});

test('TALENT_DEAL：胸围组外的素质不触发重掷', () => {
  const fixture = setup();
  const { char_custom_talent_deal } = load(fixture);
  char_custom_talent_deal(50, 1);
  assert.deepEqual(
    texts(fixture).filter((t) => t.includes('CHAR_BUST_REGENERATE_WAPPED')),
    [],
  );
});

test('TALENT_DEAL：口上组唯一，且 174（贵公子）置男人、166 清男人', () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  const { char_custom_talent_deal } = load(fixture);

  char_custom_talent_deal(174, 1);
  assert.equal(fixture.store.get('talent:1:174'), 1);
  assert.equal(fixture.store.get('talent:1:160') || 0, 0, '同组被清');
  for (const index of [161, 162, 163, 164, 166, 172, 173, 175]) {
    assert.equal(
      fixture.store.get(`talent:1:${index}`) || 0,
      0,
      `第 ${index} 位被清`,
    );
  }
  assert.equal(fixture.store.get('talent:1:122'), 1, '贵公子是男人');

  char_custom_talent_deal(166, 1);
  assert.equal(fixture.store.get('talent:1:122') || 0, 0, '166 清掉男人位');
  assert.equal(fixture.store.get('talent:1:174') || 0, 0, '同组被清');
});

test('TALENT_DEAL：职业唯一（200-220 只留一个）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:205', 1);
  const { char_custom_talent_deal } = load(fixture);
  char_custom_talent_deal(210, 1);

  assert.equal(fixture.store.get('talent:1:210'), 1);
  assert.equal(fixture.store.get('talent:1:205') || 0, 0);
  for (let index = 200; index <= 220; index += 1) {
    if (index === 210) continue;
    assert.equal(
      fixture.store.get(`talent:1:${index}`) || 0,
      0,
      `第 ${index} 位被清`,
    );
  }
  // 上界之外（221）不算职业：点它不该清掉职业位
  char_custom_talent_deal(221, 1);
  assert.equal(fixture.store.get('talent:1:210'), 1, '221 不在职业唯一区间内');
});

test('TALENT_DEAL：职业组外的素质不动职业位', () => {
  const fixture = setup();
  fixture.store.set('talent:1:205', 1);
  const { char_custom_talent_deal } = load(fixture);
  char_custom_talent_deal(50, 1);
  assert.equal(fixture.store.get('talent:1:205'), 1);
});

test('TALENT_DEAL：精英（220）固定魔族；非魔族时清掉精英位', () => {
  const fixture = setup();
  const { char_custom_talent_deal } = load(fixture);

  char_custom_talent_deal(220, 1);
  assert.equal(fixture.store.get('talent:1:220'), 1);
  assert.equal(fixture.store.get('talent:1:314'), 9, '精英固定魔族：种族码 9');

  // 换一个非精英的职业 → 精英位被清（但点选的是职业，故 220 归 0）
  fixture.store.set('talent:1:220', 1);
  fixture.store.set('talent:1:314', 3);
  char_custom_talent_deal(50, 1);
  assert.equal(fixture.store.get('talent:1:220'), 0);
});

test('TALENT_DEAL：龍族（种族 5）补鬼角', () => {
  const fixture = setup();
  const { char_custom_talent_deal } = load(fixture);
  fixture.store.set('talent:1:314', 5);
  char_custom_talent_deal(50, 1);
  assert.equal(fixture.store.get('talent:1:264'), 1);

  fixture.store.set('talent:1:264', 0);
  fixture.store.set('talent:1:314', 3);
  char_custom_talent_deal(51, 1);
  assert.equal(fixture.store.get('talent:1:264') || 0, 0, '非龍族不补');
});

test('TALENT_DEAL：非扶她也非男人时清童贞（train 域门面）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:1', 1);
  const { char_custom_talent_deal } = load(fixture);
  char_custom_talent_deal(50, 1);
  assert.equal(fixture.store.get('talent:1:1'), 0);

  fixture.store.set('talent:1:1', 1);
  fixture.store.set('talent:1:122', 1); // 男人
  char_custom_talent_deal(51, 1);
  assert.equal(fixture.store.get('talent:1:1'), 1, '男人保留童贞位');

  fixture.store.set('talent:1:122', 0);
  fixture.store.set('talent:1:121', 1); // 扶她
  char_custom_talent_deal(52, 1);
  assert.equal(fixture.store.get('talent:1:1'), 1, '扶她保留童贞位');
});

test('TALENT_DEAL：纤细体型（308 <= 100）清肥胖位', () => {
  const fixture = setup();
  fixture.store.set('talent:1:115', 1);
  const { char_custom_talent_deal } = load(fixture);

  fixture.store.set('talent:1:308', 100);
  char_custom_talent_deal(50, 1);
  assert.equal(fixture.store.get('talent:1:115') || 0, 0);

  fixture.store.set('talent:1:115', 1);
  fixture.store.set('talent:1:308', 101);
  char_custom_talent_deal(51, 1);
  assert.equal(fixture.store.get('talent:1:115'), 1, '标准体型不清');
});

// —— @PRINT_SINGLE_TALENT 与 @CHAR_CUSTOM_TALENT_PAGE（:264-482）——

test('TALENT_PAGE 0：九组的分组边界与每行 6 格', () => {
  const fixture = setup();
  const { char_custom_talent_page } = load(fixture);
  for (let index = 0; index < 500; index += 1) {
    fixture.store.set(`talentname:${index}`, `T${index}`);
  }
  char_custom_talent_page(0, 0, 1);

  const rows = button_rows(fixture);
  assert.deepEqual(
    rows.map((row) => row.length),
    [6, 4, 6, 4, 6, 4, 6, 4, 6, 4, 6, 4, 5, 5, 5],
    '每组末尾冲行（残行不满 6）',
  );
  assert.deepEqual(rows.flat(), [
    ...range(0, 9),
    ...range(10, 19),
    ...range(20, 29),
    ...range(30, 39),
    ...range(40, 49),
    ...range(50, 59),
    ...range(60, 64),
    ...range(69, 73),
    ...range(74, 78),
  ]);
  assert.deepEqual(texts(fixture), [
    '■=== 基本素质 ===■',
    '■=== 性格 ===■',
    '■=== 性态度 ===■',
    '■=== 性表现 ===■',
    '■=== 体质 ===■',
    '■=== 技术 ===■',
    '■=== 洁癖度 ===■',
    '■=== 正直度 ===■',
    '■=== 特殊性癖 ===■',
  ]);
});

test('TALENT_PAGE 1：口上组在模式 1 多出 165-179（剔除 166/172/173/174/175）', () => {
  const fixture = setup();
  const { char_custom_talent_page } = load(fixture);
  for (let index = 0; index < 500; index += 1) {
    fixture.store.set(`talentname:${index}`, `T${index}`);
  }
  char_custom_talent_page(1, 0, 1);
  const mode0 = button_rows(fixture).flat();

  fixture.lines.length = 0;
  char_custom_talent_page(1, 1, 1);
  const mode1 = button_rows(fixture).flat();

  const group = (list, from, to) => list.filter((n) => n >= from && n <= to);
  assert.deepEqual(
    group(mode0, 160, 179),
    [160, 161, 162, 163, 164, 166, 172, 173, 174, 175],
  );
  assert.deepEqual(
    group(mode1, 160, 179),
    [
      160, 161, 162, 163, 164, 166, 172, 173, 174, 175, 165, 167, 168, 169, 170,
      171, 176, 177, 178, 179,
    ],
  );
});

test('TALENT_PAGE 1：各组编码逐组核对（含身体特征尾项 119 与混杂的首三项）', () => {
  const fixture = setup();
  const { char_custom_talent_page } = load(fixture);
  for (let index = 0; index < 500; index += 1) {
    fixture.store.set(`talentname:${index}`, `T${index}`);
  }
  char_custom_talent_page(1, 0, 1);
  const flat = button_rows(fixture).flat();

  assert.deepEqual(flat, [
    ...range(79, 89), // 性癖
    ...range(91, 98), // 魅力
    ...range(99, 116), // 身体特征
    119, // 身体特征的尾项（源 :355 的单点）
    ...[117, 118, 121], // 混杂的前三项（源 :360-362）
    ...range(122, 159), // 混杂的主体
    ...[160, 161, 162, 163, 164, 166, 172, 173, 174, 175], // 性格（口上）
    ...range(180, 189), // 卖春相关
  ]);
});

test('TALENT_PAGE 2：特殊素质/境遇的跳过项与精英组 471-489', () => {
  const fixture = setup();
  const { char_custom_talent_page } = load(fixture);
  for (let index = 0; index < 500; index += 1) {
    fixture.store.set(`talentname:${index}`, `T${index}`);
  }
  char_custom_talent_page(2, 0, 1);
  const flat = button_rows(fixture).flat();

  assert.deepEqual(flat.slice(-19), range(471, 489));
  const special = flat.filter((n) => n >= 270 && n <= 289);
  assert.deepEqual(special, [...range(270, 279), 282, 284, ...range(285, 288)]);
  const circumstance = flat.filter((n) => n >= 290 && n <= 299);
  assert.deepEqual(circumstance, [...range(290, 291), ...range(293, 299)]);
});

test('PRINT_SINGLE_TALENT：无名素质不占格（STRLENS < 1 早退）', () => {
  const fixture = setup();
  fixture.store.set('talentname:0', '有名字');
  fixture.store.set('talentname:1', ''); // 无名（:464-465 早退）
  fixture.store.set('talentname:2', '也有名字');
  const { print_single_talent } = load(fixture);

  print_single_talent(0, 1);
  print_single_talent(1, 1);
  print_single_talent(2, 1);
  print_single_talent(-1, 1);
  assert.deepEqual(
    button_rows(fixture).flat(),
    [0, 2],
    '无名的 1 号被跳过，0 与 2 在同一行',
  );
});

test('PRINT_SINGLE_TALENT：返回累计格数，哨兵分支归零', () => {
  const fixture = setup();
  for (let index = 0; index < 10; index += 1) {
    fixture.store.set(`talentname:${index}`, `T${index}`);
  }
  const { print_single_talent } = load(fixture);
  assert.equal(print_single_talent(0, 1), 1);
  assert.equal(print_single_talent(1, 1), 2);
  assert.equal(print_single_talent(-1, 1), 0);
  assert.equal(print_single_talent(2, 1), 1, '归零后从 1 重新数');
});

test('PRINT_SINGLE_TALENT：已设素质不灰、未设为灰', () => {
  const fixture = setup();
  fixture.store.set('talentname:0', '甲');
  fixture.store.set('talentname:1', '乙');
  fixture.store.set('talent:1:1', 1);
  const { print_single_talent } = load(fixture);
  print_single_talent(0, 1);
  print_single_talent(1, 1);
  print_single_talent(-1, 1);

  const colors = fixture.lines
    .filter((line) => line.type === 'button')
    .map((line) => line.color);
  assert.deepEqual(colors, ['#808080', undefined]);
});

// —— @TALENT_EMPTY_CHECK（:484-540）——

/** 造一个「设定完备」的角色 */
function complete_chara(fixture, cid = 1) {
  fixture.store.set(`talent:${cid}:160`, 1); // 性格
  fixture.store.set(`talent:${cid}:205`, 1); // 职业
  for (const index of [
    300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 317,
  ]) {
    fixture.store.set(`talent:${cid}:${index}`, 1);
  }
}

test('TALENT_EMPTY_CHECK：完备时返回 0，给出「人物设定完成」并进入初体验问卷', async () => {
  const fixture = setup();
  complete_chara(fixture);
  fixture.set_inputs(998, 998, 0); // 初吻=无、初体验=无、确认
  const { talent_empty_check } = load(fixture);

  assert.equal(await talent_empty_check(1), 0);
  assert.ok(texts(fixture).includes('人物设定完成'));
  assert.ok(fixture.waits.length > 0, 'PRINTW 的等键');
});

test('TALENT_EMPTY_CHECK：缺项逐条提示（表驱动），返回 1', async () => {
  // [缺什么, 期望提示]
  const table = [
    ['性格', '需要设定性格（口上）'],
    ['职业', '需要有【近卫】及【后代】之外的职业设定'],
    [300, '需要设定发色'],
    [301, '需要设定头发状态'],
    [303, '需要设定头发修剪方式'],
    [304, '需要设定发型'],
    [305, '需要设定眼型'],
    [306, '需要设定瞳色'],
    [307, '需要设定唇型'],
    [309, '需要设定乳头'],
    [310, '需要设定阴毛状态'],
    [312, '需要设定魅力点'],
    [313, '需要设定癖好'],
    [317, '需要设定喜欢的东西'],
  ];
  for (const [missing, message] of table) {
    const fixture2 = setup();
    const api = load(fixture2);
    complete_chara(fixture2);
    if (missing === '性格') {
      fixture2.store.delete('talent:1:160');
    } else if (missing === '职业') {
      fixture2.store.delete('talent:1:205');
    } else {
      fixture2.store.delete(`talent:1:${missing}`);
    }
    assert.equal(await api.talent_empty_check(1), 1, `${missing}`);
    assert.ok(
      texts(fixture2).includes(message),
      `${missing} 的提示：${texts(fixture2).join(' / ')}`,
    );
  }
});

test('TALENT_EMPTY_CHECK：精英另需精英种族 319', async () => {
  const fixture = setup();
  complete_chara(fixture);
  fixture.store.set('talent:1:220', 1);
  const { talent_empty_check } = load(fixture);

  assert.equal(await talent_empty_check(1), 1);
  assert.ok(texts(fixture).includes('精英需要设定精英种族'));

  fixture.lines.length = 0;
  fixture.store.set('talent:1:319', 1);
  fixture.set_inputs(998, 998, 0);
  assert.equal(await talent_empty_check(1), 0);
  assert.deepEqual(
    texts(fixture).filter((t) => t === '精英需要设定精英种族'),
    [],
  );
});

test('TALENT_EMPTY_CHECK：性格只设 175（区间上界）也算有性格', async () => {
  const fixture = setup();
  complete_chara(fixture);
  fixture.store.delete('talent:1:160');
  fixture.store.set('talent:1:175', 1); // 表内最后一项
  fixture.set_inputs(998, 998, 0);
  const { talent_empty_check } = load(fixture);

  assert.equal(await talent_empty_check(1), 0);
  assert.deepEqual(
    texts(fixture).filter((t) => t === '需要设定性格（口上）'),
    [],
  );
});

test('TALENT_EMPTY_CHECK：非精英不看 319', async () => {
  const fixture = setup();
  complete_chara(fixture);
  fixture.set_inputs(998, 998, 0);
  const { talent_empty_check } = load(fixture);
  assert.equal(await talent_empty_check(1), 0);
});

// —— @CHARA_FIRST_XP（:596-794）——

test('CHARA_FIRST_XP：后代（EX_TALENT:2）直接返回 0 且不问', async () => {
  const fixture = setup();
  fixture.store.set('ex_talent:1:2', 1);
  const { chara_first_xp } = load(fixture);

  assert.equal(await chara_first_xp(1), 0);
  assert.deepEqual(texts(fixture), []);
});

test('CHARA_FIRST_XP：处女（TALENT:0 == 1）不问初体验', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:0', 1);
  const { chara_first_xp } = load(fixture);
  fixture.set_inputs(0, 0); // 初吻=不明、确认

  await chara_first_xp(1);
  assert.equal(fixture.store.get('cflag:1:16'), 0);
  assert.equal(fixture.store.get('cflag:1:15'), 0);
  assert.deepEqual(
    texts(fixture).filter((t) => t === '初体验对象是？'),
    [],
  );
});

test('CHARA_FIRST_XP：非处女会问初体验，初体验编码落 CFLAG:15', async () => {
  const fixture = setup();
  // TALENT:0 非处女（未设 = 0，即「不是処女」）
  const { chara_first_xp } = load(fixture);
  fixture.set_inputs(0, 103, 0); // 初吻=不明、初体验=野狗、确认

  await chara_first_xp(1);
  assert.equal(fixture.store.get('cflag:1:15'), 103);
  assert.ok(texts(fixture).includes('[初体验对象：野狗]'));
});

test('CHARA_FIRST_XP：初吻对象各编码的回显（表驱动）', async () => {
  const fixture = setup();
  const { chara_first_xp } = load(fixture);
  // [输入, 期望回显, 期望写入的 CFLAG:16]
  const table = [
    [0, '[初吻对象：不明]', 0],
    [993, '[初吻对象：狂王]', 993],
    [994, '[初吻对象：怪物]', 994],
    [999, '[初吻对象：触手]', 999],
    [998, undefined, -2], // 无：CFLAG:16 = -2，回显分支不打印
  ];
  for (const [input, expected, written] of table) {
    fixture.reset_inputs(input, 998, 0);
    fixture.lines.length = 0;
    await chara_first_xp(1);
    assert.equal(fixture.store.get('cflag:1:16'), written, `输入 ${input}`);
    if (expected !== undefined) {
      assert.ok(texts(fixture).includes(expected), `输入 ${input} 的回显`);
    } else {
      assert.deepEqual(
        texts(fixture).filter((t) => t.startsWith('[初吻对象')),
        [],
        `输入 ${input} 不回显`,
      );
    }
  }
});

test('CHARA_FIRST_XP：野狗（995）把部位码加到编码上', async () => {
  const fixture = setup();
  const { chara_first_xp } = load(fixture);
  // [部位输入, 期望编码, 期望回显]
  const table = [
    [1, 996, '[初吻对象：野狗的肛门]'],
    [2, 997, '[初吻对象：野狗的阴茎]'],
    [3, 998, '[初吻对象：野狗的嘴]'],
  ];
  for (const [position, code, expected] of table) {
    fixture.reset_inputs(995, position, 998, 0);
    fixture.lines.length = 0;
    await chara_first_xp(1);
    assert.equal(fixture.store.get('cflag:1:16'), code);
    assert.ok(texts(fixture).includes(expected), `部位 ${position}`);
  }
});

test('CHARA_FIRST_XP：魔王（1）按部位编码与部位词，名字取魔王的称呼', async () => {
  const fixture = setup(1);
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  const { chara_first_xp } = load(fixture);
  // [部位输入, 期望编码, 期望部位词]——部位词链的四个区间字面量（<100 / <300
  // / <400 / <500）各取一端
  const table = [
    [1, 1, '魔王的唇]'],
    [201, 201, '魔王的阴茎]'],
    [301, 301, '魔王的私处]'], // <400 档
    [401, 401, '魔王的肛门]'],
  ];
  for (const [position, code, tail] of table) {
    fixture.reset_inputs(1, position, 998, 0);
    fixture.lines.length = 0;
    await chara_first_xp(1, () => 0); // RAND:2 不中 → 走区间链
    assert.equal(fixture.store.get('cflag:1:16'), code, `部位 ${position}`);
    assert.equal(fixture.store.get('cstr:1:4'), '魔王');
    assert.ok(
      texts(fixture).includes(`[初吻对象：${tail}`),
      `部位 ${position} 的回显：${texts(fixture).join(' / ')}`,
    );
  }
});

test('CHARA_FIRST_XP：RAND:2 掷中即「唇」，上界被测试固定', async () => {
  const fixture = setup(1);
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  const { chara_first_xp } = load(fixture);
  const upper = [];
  const rand = (n) => {
    upper.push(n);
    return 1; // 非 0 = 真
  };
  fixture.set_inputs(1, 401, 998, 0);

  await chara_first_xp(1, rand);
  assert.ok(upper.includes(2), 'RAND:2 的上界');
  assert.ok(
    texts(fixture).includes('[初吻对象：魔王的唇]'),
    texts(fixture).join(' / '),
  );
});

test('CHARA_FIRST_XP：自定义输入（997）写下名字与部位', async () => {
  const fixture = setup(1);
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  const { chara_first_xp } = load(fixture);
  fixture.set_inputs(997, '青梅竹马', 301, 998, 0);

  await chara_first_xp(1);
  assert.equal(fixture.store.get('cflag:1:16'), 301);
  assert.equal(fixture.store.get('cstr:1:4'), '魔王');
  assert.ok(texts(fixture).includes('新建人物初吻对象为青梅竹马。'));
});

test('CHARA_FIRST_XP：初吻自定义输入的空串归一成 0（平台差异）', async () => {
  const fixture = setup(1);
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  const { chara_first_xp } = load(fixture);
  // 空输入 → getNumber('') = 0 → String(0) = '0'，于是走「名字是 0」这条路，
  // 还会继续问部位（源 :659 `IF !(LOCAL == -1)` 在此为真）
  fixture.set_inputs(997, '', 201, 998, 0);

  await chara_first_xp(1);
  assert.equal(fixture.store.get('cflag:1:16'), 201);
  assert.equal(fixture.store.get('cstr:1:4'), '魔王');
  assert.ok(texts(fixture).includes('新建人物初吻对象为0。'));
});

test('CHARA_FIRST_XP：名字过长（>16）重问', async () => {
  const fixture = setup(1);
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  const { chara_first_xp } = load(fixture);
  fixture.set_inputs(
    997,
    '一二三四五六七八九十一二三四五六七',
    '短名',
    401,
    998,
    0,
  );

  await chara_first_xp(1);
  assert.ok(texts(fixture).includes('太长，请使用全角八字以下。'));
  assert.equal(fixture.store.get('cflag:1:16'), 401);
});

test('CHARA_FIRST_XP：非法输入 → 「输入错误，请重新开始」并重来', async () => {
  const fixture = setup();
  fixture.set_inputs(77, 0, 998, 0); // 先给非法值，再走正常流程
  const { chara_first_xp } = load(fixture);

  await chara_first_xp(1);
  assert.equal(fixture.inputs_consumed.length, 4, '非法输入不消耗流程');
  assert.ok(texts(fixture).includes('输入错误，请重新开始。'));
});

test('CHARA_FIRST_XP：确认时输入 1 → 重来问卷', async () => {
  const fixture = setup();
  fixture.set_inputs(993, 998, 1, 993, 998, 0);
  const { chara_first_xp } = load(fixture);

  await chara_first_xp(1);
  assert.equal(
    texts(fixture).filter((t) => t === '初吻对象是？').length,
    2,
    '问卷跑了两轮',
  );
});

test('CHARA_FIRST_XP：初体验自定义输入（997）写下名字', async () => {
  const fixture = setup();
  const { chara_first_xp } = load(fixture);
  fixture.set_inputs(0, 997, '初恋', 0);

  await chara_first_xp(1);
  // 源 :692-706 的 CASE 997 只写名字、**不改 LOCAL:1**，故编码留在 997
  assert.equal(fixture.store.get('cflag:1:15'), 997);
  assert.equal(fixture.store.get('cstr:1:3'), '初恋');
  assert.ok(texts(fixture).includes('新建人物初体验对象为为初恋。'));
  assert.ok(texts(fixture).includes('[初体验对象：初恋]'));
});

test('CHARA_FIRST_XP：初体验 996（随机）不写编码', async () => {
  const fixture = setup();
  const { chara_first_xp } = load(fixture);

  fixture.set_inputs(0, 996, 0);
  await chara_first_xp(1);
  // 源码序：CM_NS_EXP（:717，内含 #394 的 CHARA_FIRST_EXP）先写 CFLAG:15，
  // 问卷的随机支（LOCAL:1 = -1）不覆盖它——所以这里只钉「没被写成 -1」
  assert.notEqual(fixture.store.get('cflag:1:15'), -1);
});

test('CHARA_FIRST_XP：初体验自定义输入的空串被引擎归一成 0（平台差异）', async () => {
  const fixture = setup();
  const { chara_first_xp } = load(fixture);
  // EraElectron 的 era.input 把回传值按 getNumber 归一（夹具同款），空输入
  // 到手是 0 → String(0) = '0'，于是「留空将随机生成」在 ere 侧变成「名字
  // 是 0」——与 chara-name-edit.js:150 的实测注释同一件事。
  fixture.set_inputs(0, 997, '', 0);

  await chara_first_xp(1);
  assert.equal(fixture.store.get('cflag:1:15'), 997);
  assert.equal(fixture.store.get('cstr:1:3'), '0');
});

// —— @CHAR_CUSTOM（:1-152）——

test('CHAR_CUSTOM：页眉显示设定与价格，页脚四键（模式 0 有取消）', async () => {
  const fixture = setup();
  const { char_custom } = load(fixture);
  fixture.set_inputs(996); // 取消

  await char_custom(1, 0);
  assert.ok(
    texts_history(fixture).some((t) =>
      t.startsWith('设定角色属性（测试角色）'),
    ),
    texts_history(fixture).join(' / '),
  );
  assert.ok(
    texts_history(fixture).some((t) => t.includes('角色现价值为500000')),
  );
  assert.deepEqual(
    buttons(fixture)
      .filter((b) => b.acc >= 996)
      .map((b) => [b.acc, b.text]),
    [
      [997, '前一页'],
      [999, '确定'],
      [996, '取消'],
      [998, '后一页'],
    ],
  );
  assert.deepEqual(fixture.era.getAddedCharacters(), [], '取消删掉了角色');
});

test('CHAR_CUSTOM：模式 1 无取消键、页眉不显示价格', async () => {
  const fixture = setup();
  const { char_custom } = load(fixture);
  fixture.set_inputs(998, 998, 998, 999); // 翻到第 5 页再确定

  await char_custom(1, 1);
  assert.ok(
    texts_history(fixture).some((t) =>
      t.startsWith('修改角色属性（测试角色）'),
    ),
  );
  assert.deepEqual(
    buttons(fixture).filter((b) => b.acc === 996),
    [],
  );
  assert.ok(
    texts_history(fixture).some((t) => t.includes('现已加入啃鸡鸡豪华午餐')),
  );
});

test('CHAR_CUSTOM：后退页在 0 页不生效（SIF L_PAGE > 0）', async () => {
  const fixture = setup();
  const { char_custom } = load(fixture);
  fixture.set_inputs(997, 998, 999); // 先按「前一页」（无效），再后一页，再确定

  await char_custom(1, 1);
  const headers = texts_history(fixture)
    .filter((t) => t.includes('/5>'))
    .map((t) => t.slice(t.lastIndexOf('<'))); // <N/5>
  assert.deepEqual(headers, ['<1/5>', '<1/5>', '<2/5>']);
});

test('CHAR_CUSTOM：前进页在第 5 页封顶（SIF L_PAGE < 4）', async () => {
  const fixture = setup();
  const { char_custom } = load(fixture);
  fixture.set_inputs(998, 998, 998, 998, 998, 998, 999); // 六次「后一页」

  await char_custom(1, 1);
  const headers = texts_history(fixture)
    .filter((t) => t.includes('/5>'))
    .map((t) => t.slice(t.lastIndexOf('<'))); // <N/5>
  assert.deepEqual(headers, [
    '<1/5>',
    '<2/5>',
    '<3/5>',
    '<4/5>',
    '<5/5>',
    '<5/5>',
    '<5/5>',
  ]);
});

test('CHAR_CUSTOM：素质页点选后重算价格并重绘', async () => {
  const fixture = setup();
  fixture.store.set('talentname:10', '胆怯');
  const { char_custom } = load(fixture);
  fixture.set_inputs(10, 996); // 点选素质 10（+15 万）后取消

  await char_custom(1, 0);
  const prices = texts_history(fixture)
    .filter((t) => t.includes('角色现价值为'))
    .map((t) => Number(t.replace(/^.*角色现价值为/, '').split('\t')[0]));
  assert.deepEqual(prices, [500000, 650000], '重绘时价格已重算');
});

test('CHAR_CUSTOM：模式 0 的确定流程——检查不过则留在页内', async () => {
  const fixture = setup();
  const { char_custom } = load(fixture);
  fixture.set_inputs(999, 996); // 确定（不完备）→ 取消

  await char_custom(1, 0);
  assert.ok(texts_history(fixture).includes('请返回继续设定'));
  assert.deepEqual(fixture.era.getAddedCharacters(), [], '取消删掉了角色');
});

test('CHAR_CUSTOM：模式 0 完备时扣款并收下（MONEY 与 EX_FLAG:4444 同步）', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  fixture.store.set('talent:1:205', 1);
  for (const index of [
    300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 317,
  ]) {
    fixture.store.set(`talent:1:${index}`, 1);
  }
  fixture.store.set('flag:10004', 10000000); // MONEY
  fixture.store.set('exflag:4444', 10000000); // EX_FLAG:4444
  const { char_custom } = load(fixture);
  // 确定 → EMPTY_CHECK 通过（问初体验：初吻=无、初体验=无、确认）→ 最终确认 [1]
  fixture.set_inputs(999, 998, 998, 0, 1);

  await char_custom(1, 0);
  const line = texts_history(fixture).find((t) => t.includes('的最终价格是'));
  assert.ok(line, texts_history(fixture).join(' / '));
  // 最终价格含 CM_BASE/CM_KIND/CM_CLOTH 刚设上的素质（它们在再次计价之前
  // 运行，:67-85），故取屏上那个数——chara_cost 的数值本身另有专测钉住
  const price = Number(/最终价格是(\d+)点/.exec(line)[1]);
  assert.ok(price > 0);
  assert.equal(fixture.store.get('flag:10004'), 10000000 - price);
  assert.equal(fixture.store.get('exflag:4444'), 10000000 - price);
  assert.equal(fixture.store.get('cflag:1:9'), 1, '等级初始化');
});

test('CHAR_CUSTOM：钱不够则退回重画（不扣款）', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  fixture.store.set('talent:1:205', 1);
  for (const index of [
    300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 317,
  ]) {
    fixture.store.set(`talent:1:${index}`, 1);
  }
  fixture.store.set('flag:10004', 1); // 只有 1 点钱
  const { char_custom } = load(fixture);
  fixture.set_inputs(999, 998, 998, 0, 1, 996);

  await char_custom(1, 0);
  assert.ok(texts_history(fixture).includes('钱不够，还是重新设定吧！'));
  assert.equal(fixture.store.get('flag:10004'), 1, '未扣款');
});

test('CHAR_CUSTOM：最终确认的其余输入回到 $LOOP 重问', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  fixture.store.set('talent:1:205', 1);
  for (const index of [
    300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 317,
  ]) {
    fixture.store.set(`talent:1:${index}`, 1);
  }
  fixture.store.set('flag:42', 1000000);
  const { char_custom } = load(fixture);
  fixture.set_inputs(999, 998, 998, 0, 7, 2, 996); // 7 = 非法，重问；2 = 再改一下

  await char_custom(1, 0);
  assert.equal(
    texts_history(fixture).filter((t) => t.includes('的最终价格是')).length,
    1,
    '只问过一次最终价格',
  );
});

test('CHAR_CUSTOM：种族 9（魔族）随机补现种族，RAND:3 上界被测试固定', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  fixture.store.set('talent:1:205', 1);
  fixture.store.set('talent:1:314', 9);
  for (const index of [
    300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 317,
  ]) {
    fixture.store.set(`talent:1:${index}`, 1);
  }
  const { char_custom } = load(fixture);
  // 随机源把实参当返回值：现种族的 `RAND:3 + 191` 因此得 3 + 191 = 194。
  // 上界被改小（rand(2)）时这条算式给出 1 + 191 = 192，用例即红——上界与
  // 基数一次钉住（其余掷骰一律回 1，避免误命中）
  const rand = (n) => (n === 3 ? 3 : 1);
  fixture.store.set('flag:10004', 10000000); // MONEY
  fixture.reset_inputs(999, 998, 998, 0, 1);

  await char_custom(1, 0, rand);
  assert.equal(fixture.store.get('talent:1:322'), 194, '191 + RAND:3');
});

test('CHAR_CUSTOM：妊娠素质成立时补预产日（DAY + 10 + RAND:6）', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  fixture.store.set('talent:1:205', 1);
  fixture.store.set('talent:1:153', 1); // 妊娠素质之一
  for (const index of [
    300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 317,
  ]) {
    fixture.store.set(`talent:1:${index}`, 1);
  }
  fixture.store.set('flag:10004', 10000000); // MONEY
  fixture.store.set('flag:10000', 30); // DAY
  const { char_custom } = load(fixture);
  const upper = [];
  const rand = (n) => {
    upper.push(n);
    return 5;
  };
  fixture.set_inputs(999, 998, 998, 0, 1);

  await char_custom(1, 0, rand);
  assert.equal(fixture.store.get('cflag:1:110'), 30 + 10 + 5);
  assert.equal(fixture.store.get('cflag:1:111'), 0);
  assert.ok(upper.includes(6), 'RAND:6 的上界');
});

test('CHAR_CUSTOM：不成立妊娠素质时不写预产日', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  fixture.store.set('talent:1:205', 1);
  for (const index of [
    300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 317,
  ]) {
    fixture.store.set(`talent:1:${index}`, 1);
  }
  fixture.store.set('flag:10004', 10000000); // MONEY
  const { char_custom } = load(fixture);
  fixture.set_inputs(999, 998, 998, 0, 1);

  await char_custom(1, 0);
  assert.equal(fixture.store.get('cflag:1:110') || 0, 0);
});

test('CHAR_CUSTOM：页高 27 行（补行到固定高度）', async () => {
  const fixture = setup();
  const { char_custom } = load(fixture);
  fixture.set_inputs(996); // 取消

  await char_custom(1, 0);
  // 「27 行」从清屏锚点起算：drawLine + 页眉 + drawLine + 内容 + 补行 = 27；
  // 之后才是页脚（drawLine + 四枚按钮 + PRINTL）
  assert.equal(fixture.lines.length, 27 + 1 + 4 + 1, '页体恒 27 行（含补行）');
});

test('CHAR_CUSTOM：第 3 页仍是素质页（点 205 能落到职业上）', async () => {
  const fixture = setup();
  fixture.store.set('talentname:205', '骑士');
  const { char_custom } = load(fixture);
  fixture.set_inputs(998, 998, 205, 996); // 翻到第 3 页 → 点职业 → 取消

  await char_custom(1, 0);
  assert.equal(fixture.store.get('talent:1:205'), 1, '第 3 页的素质按钮可达');
});

test('CHAR_CUSTOM：外观页点选走 LOOK_DEAL（编码回传）', async () => {
  const fixture = setup();
  const { char_custom } = load(fixture);
  // 翻到第 4 页（外观页 1），点 1101（发色「金色」），再取消
  fixture.set_inputs(998, 998, 998, 1101, 996);

  await char_custom(1, 0);
  assert.equal(fixture.store.get('talent:1:300'), 1);
});
