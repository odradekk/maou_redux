/**
 * ere/chara/chara-and-hair.js 的行为测试（issue #392，N8 段 2）。
 *
 * 源: target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB（性格 5 函数 ＋ 发色 4 函数）
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）+ 两个随机函数的
 * `rand` 形参（原作 `RAND:N` / `RAND(VARSIZE(...))` 的随机源，缺省均匀随机）。
 *
 * 被测量的是三处：素质表（talent:cid:160..175 与 300）的写入、屏幕上的按钮
 * 与文本、以及随机上界（分母）——上界单独钉（`rand(n)` 捕获实参 n）。
 *
 * 补位断言用显示宽度（全角算 2、半角算 1，半角空格填充）——原作
 * `{A,N}` / `%S,N,LEFT%` 的语义（expressions.md「FORM 语法中的位数和对齐」）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 性格素质编号表（源 :6 `#DIM ID_OF_GENERAL_CHARASTERISTICS`，VARIABLES.ERH:6） */
const CHARASTERISTICS = [160, 161, 162, 163, 164, 166, 172, 173, 174, 175];

/** 发色名表（源 :9 `#DIMS ARR_HAIRCOLOR`，VARIABLES.ERH:9） */
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

/** 显示宽度（全角 2 / 半角 1） */
function disp_width(text) {
  let width = 0;
  for (const ch of text) {
    width += ch.codePointAt(0) > 0xff ? 2 : 1;
  }
  return width;
}

/** `{A,N}`：右对齐补位 */
function pad_left(text, width) {
  return ' '.repeat(Math.max(0, width - disp_width(text))) + text;
}

/** `%S,N,LEFT%`：左对齐补位 */
function pad_right(text, width) {
  return text + ' '.repeat(Math.max(0, width - disp_width(text)));
}

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

/** 夹具记录的按钮（rendered = 引擎实际渲染出来的样子） */
function buttons(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => ({
      text: line.text,
      acc: line.accelerator,
      rendered: line.rendered,
      color: line.color,
    }));
}

/** 夹具记录的文本行 */
function texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/**
 * 逐行快照：文本行给正文、`era.println()`（PRINTL）给 '\n' 记号——换行位置
 * 是列表函数的关键观测面，不能被 filter 掉。
 */
function rows(fixture) {
  return fixture.lines_history.map((line) => {
    if (line.type === 'br') return '\n';
    if (line.type === 'text') return line.text;
    return `<${line.type}>`;
  });
}

/** 读取 10 个性格素质的当前值 */
function talents(fixture, cid = 1) {
  return CHARASTERISTICS.map(
    (id) => fixture.store.get(`talent:${cid}:${id}`) || 0,
  );
}

// —— @SHOW_CHARASTERISTIC（:7-23）——

test('SHOW_CHARASTERISTIC：返回首个已设性格的序号，并打印其名', () => {
  const fixture = setup();
  fixture.store.set('talent:1:162', 1);
  fixture.store.set('talent:1:166', 1);
  fixture.store.set('talentname:162', '坦率');
  fixture.store.set('talentname:166', '好色');
  const { show_charasteristic } = load(fixture);

  assert.equal(show_charasteristic(1), 2, '首位命中是表内第 2 项');
  assert.deepEqual(texts(fixture), ['坦率'], '打印的是命中那一项的名字');
});

test('SHOW_CHARASTERISTIC：一个都没设时返回 -1 且不打印', () => {
  const fixture = setup();
  const { show_charasteristic } = load(fixture);
  assert.equal(show_charasteristic(1), -1);
  assert.deepEqual(texts(fixture), []);
});

test('SHOW_CHARASTERISTIC：省略实参（-1）时读 TARGET 指针', () => {
  const fixture = setup(3);
  fixture.store.set('talent:3:175', 1);
  fixture.store.set('talentname:175', '伶俐');
  const { show_charasteristic } = load(fixture);
  assert.equal(show_charasteristic(), 9, 'TARGET 是角色 3');
  assert.deepEqual(texts(fixture), ['伶俐']);
});

// —— @SET_RANDOM_CHARASTERISTIC（:28-46）——

test('SET_RANDOM_CHARASTERISTIC：先清空再掷骰，返回掷中的序号', () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1); // 会被 CLEAR 掉
  let upper = 0;
  const rand = (n) => {
    upper = n;
    return 5;
  };
  const { set_random_charasteristic } = load(fixture);

  assert.equal(set_random_charasteristic(1, rand), 5);
  assert.equal(
    upper,
    10,
    'RAND(VARSIZE(ID_OF_GENERAL_CHARASTERISTICS)) 的分母是表长 10',
  );
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

test('SET_RANDOM_CHARASTERISTIC：掷中 174（貴公子）时重掷', () => {
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
  assert.equal(fixture.store.get('talent:1:174'), 0, '174 不落地');
  assert.equal(fixture.store.get('talent:1:163'), 1);
});

// —— @SET_CHARASTERISTIC（:52-63）——

test('SET_CHARASTERISTIC：按序号设定单条性格（越界不检查，1:1）', () => {
  const fixture = setup();
  fixture.store.set('talent:1:160', 1);
  const { set_charasteristic } = load(fixture);

  set_charasteristic(1, 4); // 表内第 4 项 = 164
  assert.equal(fixture.store.get('talent:1:164'), 1);
  assert.equal(fixture.store.get('talent:1:160'), 0, '事前初始化清掉了旧值');
});

// —— @CLEAR_CHARASTERISTIC（:68-78）——

test('CLEAR_CHARASTERISTIC：表内 10 项全部清零', () => {
  const fixture = setup();
  for (const id of CHARASTERISTICS) fixture.store.set(`talent:1:${id}`, 1);
  const { clear_charasteristic } = load(fixture);

  clear_charasteristic(1);
  assert.deepEqual(talents(fixture), new Array(10).fill(0));
});

// —— @CHOOSE_CHARASTERISTIC（:84-122）——

/** 列表一行的正文（:103 的 `[{i,2}] %name,10,LEFT%`） */
function charasteristic_row(index, name) {
  return `[${pad_left(String(index), 2)}] ${pad_right(name, 10)}`;
}

test('CHOOSE_CHARASTERISTIC：列表跳过 174，每 3 项换行；输入越界重问', async () => {
  const fixture = setup();
  for (const id of CHARASTERISTICS)
    fixture.store.set(`talentname:${id}`, `N${id}`);
  const { choose_charasteristic } = load(fixture);
  fixture.set_inputs(99, 2); // 99 > SIZE 重问；2 命中表内第 2 项

  await choose_charasteristic(1);
  // 一行 3 格（源 :103-109 的 `SIF (LOCAL:1) % 3 == 0 PRINTL`），9 项正好三行
  assert.deepEqual(rows(fixture), [
    [
      charasteristic_row(0, 'N160'),
      charasteristic_row(1, 'N161'),
      charasteristic_row(2, 'N162'),
    ].join(''),
    [
      charasteristic_row(3, 'N163'),
      charasteristic_row(4, 'N164'),
      charasteristic_row(5, 'N166'),
    ].join(''),
    [
      charasteristic_row(6, 'N172'),
      charasteristic_row(7, 'N173'),
      charasteristic_row(9, 'N175'),
    ].join(''),
    '\n',
  ]);
  assert.equal(fixture.store.get('talent:1:162'), 1, '输入 2 → 表内第 2 项');
  assert.equal(fixture.inputs_consumed.length, 2, '第一次输入被拒后重问');
});

test('CHOOSE_CHARASTERISTIC：换行位置按每行 N 项（实参可换）', async () => {
  const fixture = setup();
  for (const id of CHARASTERISTICS)
    fixture.store.set(`talentname:${id}`, `N${id}`);
  const { choose_charasteristic } = load(fixture);
  fixture.set_inputs(0);

  await choose_charasteristic(1, 2);
  assert.deepEqual(rows(fixture), [
    [charasteristic_row(0, 'N160'), charasteristic_row(1, 'N161')].join(''),
    [charasteristic_row(2, 'N162'), charasteristic_row(3, 'N163')].join(''),
    [charasteristic_row(4, 'N164'), charasteristic_row(5, 'N166')].join(''),
    [charasteristic_row(6, 'N172'), charasteristic_row(7, 'N173')].join(''),
    charasteristic_row(9, 'N175'),
    '\n',
  ]);
});

test('CHOOSE_CHARASTERISTIC：输入等于表长（越界一项）时写素质 0', async () => {
  const fixture = setup();
  const { choose_charasteristic } = load(fixture);
  fixture.set_inputs(10); // SIZE = 10，`RESULT > SIZE` 才拒收

  await choose_charasteristic(1);
  assert.equal(fixture.store.get('talent:1:0'), 1, '表外项读到 0，落成素质 0');
});

// —— @SHOW_HAIRCOLOR（:127-138）／@SET_HAIRCOLOR（:194-202）——

test('SHOW_HAIRCOLOR：打印发色名并返回编号；未设（0）时打印空串', () => {
  const fixture = setup();
  const { show_haircolor } = load(fixture);

  assert.equal(show_haircolor(1), 0);
  assert.deepEqual(texts(fixture), ['']);

  fixture.store.set('talent:1:300', 3);
  assert.equal(show_haircolor(1), 3);
  assert.deepEqual(texts(fixture), ['', '黑发']);
});

test('SET_HAIRCOLOR：写入并回传编号（越界不检查，1:1）', () => {
  const fixture = setup();
  const { set_haircolor } = load(fixture);

  assert.equal(set_haircolor(1, 7), 7);
  // 断言带上明文案：变异条目的 must_mention 要能在输出里找到
  assert.equal(fixture.store.get('talent:1:300'), 7, '发色落在 talent:1:300');
});

// —— @SET_RANDOM_HAIRCOLOR（:143-189）——

test('SET_RANDOM_HAIRCOLOR：RAND:100 的全部分档', () => {
  const fixture = setup();
  const { set_random_haircolor } = load(fixture);
  // [掷出的值, 期望的发色编号]——覆盖 8 个 CASE 的两端与邻界
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

// —— @CHOOSE_HAIRCOLOR（:207-237）——

/** 列表一行的正文（:219 的 `[{COLOR_ID,2}] %name,7,LEFT%`） */
function haircolor_row(index, name) {
  return `[${pad_left(String(index), 2)}] ${pad_right(name, 7)}`;
}

test('CHOOSE_HAIRCOLOR：列出 1-11 号，每 6 项换行；输入越界重问', async () => {
  const fixture = setup();
  const { choose_haircolor } = load(fixture);
  fixture.set_inputs(0, 13, 5); // 0 与 13 越界（`< 1 || > 12`），5 命中

  await choose_haircolor(1);
  const items = HAIRCOLORS.slice(1).map((name, i) =>
    haircolor_row(i + 1, name),
  );
  assert.deepEqual(rows(fixture), [
    items.slice(0, 6).join(''), // 一行 6 格（源 :223-225 的 `% (ARG:1) == 0`）
    items.slice(6).join(''),
    '\n',
  ]);
  assert.equal(fixture.store.get('talent:1:300'), 5);
  assert.equal(fixture.inputs_consumed.length, 3);
});

test('CHOOSE_HAIRCOLOR：12 号是允许的（SIZE 含端，1:1）', async () => {
  const fixture = setup();
  const { choose_haircolor } = load(fixture);
  fixture.set_inputs(12);

  await choose_haircolor(1);
  assert.equal(fixture.store.get('talent:1:300'), 12);
});

test('CHOOSE_HAIRCOLOR：每行 N 项可换（实参）', async () => {
  const fixture = setup();
  const { choose_haircolor } = load(fixture);
  fixture.set_inputs(1);

  await choose_haircolor(1, 4);
  const items = HAIRCOLORS.slice(1).map((name, i) =>
    haircolor_row(i + 1, name),
  );
  assert.deepEqual(rows(fixture), [
    items.slice(0, 4).join(''),
    items.slice(4, 8).join(''),
    items.slice(8).join(''),
    '\n',
  ]);
});

// —— 存根清单核对（与 chara-make.test.js 同款）——

test('本模块零存根：STUBBED_CALLS 为空数组', () => {
  const fixture = setup();
  const { STUBBED_CALLS } = load(fixture);
  assert.deepEqual(STUBBED_CALLS, []);
});

// —— 按钮与颜色：两个列表函数用的是文本行（原作 PRINTFORM/PRINTBUTTON 的形态）——

test('CHOOSE_CHARASTERISTIC 用的是按钮（原作 :103 是 PRINTFORM，不是按钮）', async () => {
  const fixture = setup();
  fixture.store.set('talentname:160', '刚强');
  const { choose_charasteristic } = load(fixture);
  fixture.set_inputs(0);

  await choose_charasteristic(1);
  assert.deepEqual(
    buttons(fixture),
    [],
    '1:1：性格列表是纯文本行 + INPUT，不升级为按钮（与 CHARA_CUSTOM2 的素质格不同）',
  );
});

// —— 接入（源 CHARA_MAKE.ERB 的 @RAND_CHARA_MAKE，本票把八处存根换真身）——

test('接入：rand_chara_make 的形象确认段走真身，性格与发色被写上', async () => {
  const fixture = create_era_fixture();
  // 魔王 0 先在场：rand_chara_make 的新角色号取「已加入数 - 1」（源 CHARANUM-1），
  // 场上只有勇者 1 时那个数是 0、写不到 1 号身上
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99); // 名字编号：避让随机命名的重掷
  // @RAND_CHARA_MAKE 的两处 INPUT：:107 形象确认（100 = 继续）→ :158 收下（2）
  const answers = [100, 2];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const { rand_chara_make } = fixture.load_module('chara/chara-make');
  // RAND 恒 0：位号掷中 1、性格掷中表内第 0 项（160）、发色掷中 11（粉发）
  await rand_chara_make(
    () => 0,
    () => Promise.resolve(0),
  );

  assert.equal(fixture.store.get('talent:1:160'), 1, '性格落在表内第 0 项');
  assert.equal(fixture.store.get('talent:1:300'), 11, '发色 = 11（粉发）');
  const placeholders = [
    'SET_CHARASTERISTIC',
    'SET_HAIRCOLOR',
    'SHOW_CHARASTERISTIC',
    'SET_RANDOM_CHARASTERISTIC',
    'SHOW_HAIRCOLOR',
    'SET_RANDOM_HAIRCOLOR',
    'CHOOSE_CHARASTERISTIC',
    'CHOOSE_HAIRCOLOR',
  ];
  assert.deepEqual(
    texts(fixture).filter((text) =>
      placeholders.some((name) => text.includes(`@${name}`)),
    ),
    [],
    '八处 FUNC_CHARA_AND_HAIR 占位行不再出现（其余存根如 SHOW_CHARA_INFO 不在本票）',
  );
});
