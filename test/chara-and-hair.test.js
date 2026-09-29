/**
 * ere/chara/chara-and-hair.js 的行为测试（issue #392，N8 段 2）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）+ 两个随机函数的
 * `rand` 形参（随机源，缺省均匀随机）。
 *
 * 被测量的是三处：素质表（talent:cid:160..175 与 300）的写入、屏幕上的按钮
 * 与文本、以及随机上界（分母）——上界单独钉（`rand(n)` 捕获实参 n）。
 *
 * 两个选择列表断言按钮网格：哪几行、每格的编号与正文、格宽（夹具的
 * grid_width）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 性格素质编号表（ere/chara/chara-and-hair.js 的 GENERAL_CHARASTERISTICS 同表） */
const CHARASTERISTICS = [160, 161, 162, 163, 164, 166, 172, 173, 174, 175];

/** 发色名表（ere/chara/chara-and-hair.js 的 ARR_HAIRCOLOR 同表，0 号是空串） */
const HAIRCOLORS = [
  '',
  '金发',
  '栗发',
  '黑发',
  '红发',
  '银发',
  '蓝发',
  '绿发',
  '紫发',
  '白发',
  '暗金发',
  '粉发',
];

function load(fixture) {
  return fixture.load_module('chara/chara-and-hair');
}

/** 建一名角色（cid）并预置 TARGET 指针 */
function setup(cid = 1) {
  const fixture = create_era_fixture();
  fixture.seed_chara(cid, { id: cid, name: '测试角色', callname: '测试角色' });
  fixture.era.addCharacter(cid);
  fixture.store.set('flag:10005', cid); // era_flag.target
  return fixture;
}

/** 按钮网格快照：每行一个数组，每格是 [编号, 正文, 格宽] */
function button_grid(fixture) {
  const rows = new Map();
  for (const line of fixture.lines_history) {
    if (line.type !== 'button') continue;
    if (!rows.has(line.row)) rows.set(line.row, []);
    rows.get(line.row).push([line.accelerator, line.text, line.grid_width]);
  }
  return [...rows.values()];
}

/** 夹具记录的文本行 */
function texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 读取 10 个性格素质的当前值 */
function talents(fixture, cid = 1) {
  return CHARASTERISTICS.map(
    (id) => fixture.store.get(`talent:${cid}:${id}`) || 0,
  );
}

// —— show_charasteristic ——

test('show_charasteristic：返回首个已设性格的序号，并打印其名', () => {
  const fixture = setup();
  fixture.store.set('talent:1:162', 1);
  fixture.store.set('talent:1:166', 1);
  fixture.store.set('talentname:162', '坦率');
  fixture.store.set('talentname:166', '好色');
  const { show_charasteristic } = load(fixture);

  assert.equal(show_charasteristic(1), 2, '首位命中是表内第 2 项');
  assert.deepEqual(texts(fixture), ['坦率'], '打印的是命中那一项的名字');
});

test('show_charasteristic：一个都没设时返回 -1 且不打印', () => {
  const fixture = setup();
  const { show_charasteristic } = load(fixture);
  assert.equal(show_charasteristic(1), -1);
  assert.deepEqual(texts(fixture), []);
});

test('show_charasteristic：省略实参（-1）时读 TARGET 指针', () => {
  const fixture = setup(3);
  fixture.store.set('talent:3:175', 1);
  fixture.store.set('talentname:175', '伶俐');
  const { show_charasteristic } = load(fixture);
  assert.equal(show_charasteristic(), 9, 'TARGET 是角色 3');
  assert.deepEqual(texts(fixture), ['伶俐']);
});

// —— set_random_charasteristic ——

test('set_random_charasteristic：先清空再掷骰，返回掷中的序号', () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1); // 会被清空步骤清掉
  let upper = 0;
  const rand = (n) => {
    upper = n;
    return 5;
  };
  const { set_random_charasteristic } = load(fixture);

  assert.equal(set_random_charasteristic(1, rand), 5);
  assert.equal(upper, 10, '随机分母是表长 10');
  assert.equal(
    fixture.store.get('talent:1:166'),
    1,
    '表内第 5 项（166）被设上',
  );
  assert.deepEqual(
    talents(fixture),
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    '除命中项外全部为 0',
  );
});

test('set_random_charasteristic：掷中 174（貴公子）时重掷', () => {
  const fixture = setup();
  const rolls = [8, 3]; // 第 0 次掷中 174，第 1 次掷中 163
  let calls = 0;
  const rand = (n) => {
    calls += 1;
    assert.equal(n, 10);
    return rolls[calls - 1];
  };
  const { set_random_charasteristic } = load(fixture);

  assert.equal(set_random_charasteristic(1, rand), 3);
  assert.equal(calls, 2, '掷了两次');
  assert.equal(fixture.store.get('talent:1:174'), 0, '174 不写入');
  assert.equal(fixture.store.get('talent:1:163'), 1);
});

// —— set_charasteristic ——

test('set_charasteristic：按序号设定单条性格（越界不检查）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  const { set_charasteristic } = load(fixture);

  set_charasteristic(1, 4); // 表内第 4 项 = 164
  assert.equal(fixture.store.get('talent:1:164'), 1);
  assert.equal(fixture.store.get('talent:1:160'), 0, '事前初始化清掉了旧值');
});

test('set_charasteristic：序号在表外（等于或超过表长）时写素质 0', () => {
  const fixture = setup();
  const { set_charasteristic } = load(fixture);
  // 表外序号取不到表项、下标落回 0，于是写的是素质 0（処女）
  // ——下标 0 这一端单独钉住
  for (const index of [10, 99]) {
    fixture.store.delete('talent:1:0');
    set_charasteristic(1, index);
    assert.equal(
      fixture.store.get('talent:1:0'),
      1,
      `序号 ${index} 落到素质 0`,
    );
  }
});

// —— clear_charasteristic ——

test('clear_charasteristic：表内 10 项全部清零', () => {
  const fixture = setup();
  for (const id of CHARASTERISTICS) fixture.store.set(`talent:1:${id}`, 1);
  const { clear_charasteristic } = load(fixture);

  clear_charasteristic(1);
  assert.deepEqual(talents(fixture), new Array(10).fill(0));
});

// —— choose_charasteristic ——

test('choose_charasteristic：列表是按钮网格，跳过 174，每 3 项换行', async () => {
  const fixture = setup();
  for (const id of CHARASTERISTICS)
    fixture.store.set(`talentname:${id}`, `N${id}`);
  const { choose_charasteristic } = load(fixture);
  fixture.set_inputs(2);

  await choose_charasteristic(1);
  // 每行 3 格、每格 24 / 3 = 8 列；编号按表内序号，174 是第 8 项，故缺 8
  assert.deepEqual(button_grid(fixture), [
    [
      [0, 'N160', 8],
      [1, 'N161', 8],
      [2, 'N162', 8],
    ],
    [
      [3, 'N163', 8],
      [4, 'N164', 8],
      [5, 'N166', 8],
    ],
    [
      [6, 'N172', 8],
      [7, 'N173', 8],
      [9, 'N175', 8],
    ],
  ]);
  assert.deepEqual(texts(fixture), [], '列表只有按钮，没有纯文本行');
  assert.equal(fixture.store.get('talent:1:162'), 1, '输入 2 → 表内第 2 项');
});

test('choose_charasteristic：换行位置按每行 N 项（实参可换）', async () => {
  const fixture = setup();
  for (const id of CHARASTERISTICS)
    fixture.store.set(`talentname:${id}`, `N${id}`);
  const { choose_charasteristic } = load(fixture);
  fixture.set_inputs(0);

  await choose_charasteristic(1, 2);
  // 末行只有 1 格，宽度仍按每行 2 格算（24 / 2 = 12），与上面各列对齐
  assert.deepEqual(button_grid(fixture), [
    [
      [0, 'N160', 12],
      [1, 'N161', 12],
    ],
    [
      [2, 'N162', 12],
      [3, 'N163', 12],
    ],
    [
      [4, 'N164', 12],
      [5, 'N166', 12],
    ],
    [
      [6, 'N172', 12],
      [7, 'N173', 12],
    ],
    [[9, 'N175', 12]],
  ]);
});

// —— show_haircolor ／ set_haircolor ——

test('show_haircolor：打印发色名并返回编号；未设（0）时打印空串', () => {
  const fixture = setup();
  const { show_haircolor } = load(fixture);

  assert.equal(show_haircolor(1), 0);
  assert.deepEqual(texts(fixture), ['']);

  fixture.store.set('talent:1:300', 3);
  assert.equal(show_haircolor(1), 3);
  assert.deepEqual(texts(fixture), ['', '黑发']);
});

test('show_haircolor：编号超表（12，set_haircolor 不设检查的端）时打印空串', () => {
  const fixture = setup();
  fixture.store.set('talent:1:300', 12); // 12 号没有名字（发色表到 11 止）
  const { show_haircolor } = load(fixture);

  assert.equal(show_haircolor(1), 12, '编号原样回传');
  assert.deepEqual(
    texts(fixture),
    [''],
    "表外读回 undefined，落成空串（?? ''）",
  );
});

test('set_haircolor：写入并回传编号（越界不检查）', () => {
  const fixture = setup();
  const { set_haircolor } = load(fixture);

  assert.equal(set_haircolor(1, 7), 7);
  // 断言带上明文案：变异条目的 must_mention 要能在输出里找到
  assert.equal(fixture.store.get('talent:1:300'), 7, '发色落在 talent:1:300');
});

// —— set_random_haircolor ——

test('set_random_haircolor：RAND:100 的全部分档', () => {
  const fixture = setup();
  const { set_random_haircolor } = load(fixture);
  // [掷出的值, 期望的发色编号]——覆盖 8 个分档的两端与邻界
  const table = [
    [0, 11],
    [1, 1],
    [20, 1],
    [21, 6],
    [30, 6],
    [31, 7],
    [40, 7],
    [41, 2],
    [60, 2],
    [61, 3],
    [80, 3],
    [81, 4],
    [97, 4],
    [98, 5],
    [99, 5],
  ];
  for (const [roll, expected] of table) {
    let upper = 0;
    const rand = (n) => {
      upper = n;
      return roll;
    };
    assert.equal(set_random_haircolor(1, rand), expected, `掷出 ${roll}`);
    assert.equal(upper, 100, 'RAND:100 的上界');
    assert.equal(fixture.store.get('talent:1:300'), expected, '写回素质 300');
  }
});

// —— choose_haircolor ——

/** 1-11 号发色的按钮格，格宽 width */
function haircolor_cells(width) {
  return HAIRCOLORS.slice(1).map((name, i) => [i + 1, name, width]);
}

test('choose_haircolor：列出 1-11 号，每 6 项换行', async () => {
  const fixture = setup();
  const { choose_haircolor } = load(fixture);
  fixture.set_inputs(5);

  await choose_haircolor(1);
  const cells = haircolor_cells(4); // 24 / 6 = 4 列
  assert.deepEqual(button_grid(fixture), [cells.slice(0, 6), cells.slice(6)]);
  assert.deepEqual(texts(fixture), [], '列表只有按钮，没有纯文本行');
  assert.equal(fixture.store.get('talent:1:300'), 5);
});

test('choose_haircolor：每行 N 项可换（实参）', async () => {
  const fixture = setup();
  const { choose_haircolor } = load(fixture);
  fixture.set_inputs(1);

  await choose_haircolor(1, 4);
  const cells = haircolor_cells(6); // 24 / 4 = 6 列
  assert.deepEqual(button_grid(fixture), [
    cells.slice(0, 4),
    cells.slice(4, 8),
    cells.slice(8),
  ]);
});

// —— 接入（rand_chara_make，这张工单把八处存根换真身）——

test('接入：rand_chara_make 的形象确认段走真身，性格与发色被写上', async () => {
  const fixture = create_era_fixture();
  // 编制**不连号**（#487）：魔王 0 与勇者 9 先在场，掷中的勇者位是 3。
  // 招募后 CHARANUM = 3 →「已加入数 - 1」= 2 ≠ 3——按人数取新角色号的旧写法
  // 会写到 2 号身上，本用例因此能区分「角色号」与「人数」
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9);
  fixture.seed_chara(3, { id: 3, name: '勇者3', callname: '勇者3' });
  fixture.store.set('cflag:3:6', 99); // 名字编号：避让随机命名的重掷
  // rand_chara_make 的两处输入：形象确认（100 = 继续）→ 收下（2）
  const answers = [100, 2];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const { rand_chara_make } = fixture.load_module('chara/chara-make');
  // 的位号掷骰（上界 16）只命中第一次、给 2（位号 3）；其余随机恒 0：
  // 性格掷中表内第 0 项（160）、发色掷中 11（粉发）
  let rolled = false;
  await rand_chara_make(
    (n) => {
      if (n === 16 && !rolled) {
        rolled = true;
        return 2;
      }
      return 0;
    },
    () => Promise.resolve(0),
  );

  assert.equal(fixture.store.get('talent:3:160'), 1, '性格落在表内第 0 项');
  assert.equal(fixture.store.get('talent:3:300'), 11, '发色 = 11（粉发）');
  assert.equal(
    fixture.store.get('talent:2:160'),
    undefined,
    '不写到「人数 - 1」的 2 号（#487）',
  );
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 3, 9],
    '新加入的是掷中的 3 号',
  );
  // 播报读最新加入者的称呼——char_make 内部会重建称呼，
  // 故按生成后的实际称呼比对（它非空是这条断言有意义的前提）
  const recruit_name = fixture.store.get('callname:3:-1');
  assert.ok(recruit_name, '新加入的 3 号有称呼');
  assert.ok(
    fixture.lines_history.some(
      (line) =>
        line.type === 'text' &&
        line.text === `冒险者${recruit_name}被囚禁在了地牢里！`,
    ),
    '收下播报点名新加入的 3 号（读最新加入者的称呼）',
  );
});
