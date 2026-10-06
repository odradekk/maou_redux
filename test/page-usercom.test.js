/**
 * ere/page/page-usercom.js 的行为测试（issue #44 建面；#214 扩：子菜单
 * 按钮组、USERCOM 全分支分发、FLAG:5 位 34 渲染分流）。
 *
 * 缝 = test/helpers/era-fixture.js。按钮白名单（#130）由夹具的 input
 * 校验承担——本文件每个「输入 → 分发」用例都在白名单内驱动，喂进
 * 未打印按钮的值当场红。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const {
  create_chara_loader,
  create_variable_loader,
  load_engine_bundle,
} = require('./helpers/engine-bundle');
const { seed_static_names } = require('./helpers/static-names');

const engine = load_engine_bundle();
const engine_test = engine ? test : test.skip;
const YML_DIR = path.join(__dirname, '..', 'yml');

function load_page(fixture) {
  fixture.load_module('page/page-usercom');
  return fixture.load_module('system/event/registry');
}

/** 播种自定义菜单开关（FLAG:5 位 34；开局值见 event-first.js） */
function seed_flag5(fixture, bit34) {
  const base = 17179934119; // 开局值（bit34 = 1）
  fixture.store.set('flag:5', bit34 ? base : base - 2 ** 34);
}

// —— 子菜单按钮组（#214：SHOW_USERCOM 的按钮挂载） ——

test('子菜单按钮组全挂载：默认态 9 个按钮，条件按钮不出现', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const buttons = fixture.lines
    .filter((line) => line.type === 'button')
    .map((b) => [b.accelerator, b.text]);
  assert.deepEqual(buttons, [
    [100, '能力表示'],
    [101, '污秽表示'],
    [103, '避孕套设定'],
    [104, '爱抚系过滤'],
    [105, '器具系过滤'],
    [106, '私处性交系过滤'],
    [107, '肛门性交系过滤'],
    [108, 'ＳＭ系过滤'],
    [990, '调教菜单登录'],
    [999, '调教结束'],
  ]);
});

/** 按钮按 Row 分组的快照：每行 { row, cells }，cells 每格 [编号, 正文, 格宽] */
function button_rows(fixture) {
  const rows = new Map();
  for (const line of fixture.lines) {
    if (line.type !== 'button') continue;
    if (!rows.has(line.row)) rows.set(line.row, []);
    rows.get(line.row).push([line.accelerator, line.text, line.grid_width]);
  }
  return [...rows].map(([row, cells]) => ({ row, cells }));
}

test('子菜单按钮组按每行 3 列排布：行间不夹空行，页脚之后无空行', async () => {
  // 两条渲染路径都走一遍：自定义菜单（FLAG:5 位 34 = 1）与内建列表
  for (const advanced of [false, true]) {
    const label = advanced ? '自定义菜单路径' : '内建列表路径';
    const fixture = create_era_fixture();
    seed_flag5(fixture, advanced);
    const { emit } = load_page(fixture);

    await emit('SHOW_USERCOM');

    // 网格行的排版语义（CONTEXT.md「输出 API 的排版与对齐」）：按钮按每行
    // 3 格进网格，网格行之间与页脚之后都不应再补空行
    const divider = fixture.lines.find((line) => line.type === 'divider');
    // divider 之后的按钮行全是子菜单（[100] 起头，含 [990]-[999] 页脚）：
    // 默认态 10 枚按钮 → 每行 3 格共 4 行（末行 [999] 一格）
    const submenu_rows = button_rows(fixture).filter(
      (r) => r.row > divider.row,
    );
    assert.deepEqual(
      submenu_rows.map((r) => r.cells.map(([acc]) => acc)),
      [[100, 101, 103], [104, 105, 106], [107, 108, 990], [999]],
      `${label}：子菜单按钮按每行 3 列排布`,
    );
    assert.ok(
      submenu_rows.every((r) => r.cells.every(([, , width]) => width === 8)),
      `${label}：每格宽 24/3 = 8`,
    );
    // 页脚之后不补空行（先查页脚：网格行之间的空行由下一断言分头守）
    const blank_line = (line) =>
      line.type === 'br' || (line.type === 'text' && line.text === '');
    const footer = fixture.lines.find(
      (line) => line.type === 'button' && line.accelerator === 999,
    );
    assert.ok(
      !fixture.lines.some(
        (line) =>
          line.row === footer.row + 1 &&
          ((line.type === 'text' && line.text === '') || line.type === 'br'),
      ),
      `${label}：子菜单页脚按钮之后不应有空行`,
    );
    // 行与行之间不夹空行：网格行逐行相邻
    assert.ok(
      !fixture.lines.some((line) => blank_line(line) && line.row > divider.row),
      `${label}：子菜单网格行之间不夹空行`,
    );
    // 方格与分割线之间恰有一个空行：循环收尾只结束方格最后那一行，空行
    // 来自下一段的 println。
    assert.equal(
      fixture.lines.filter(
        (line) =>
          line.row < divider.row &&
          (line.type === 'br' || (line.type === 'text' && line.text === '')),
      ).length,
      1,
      `${label}：COM 菜单与分割线之间恰有一个空行（来自下一段的换行）`,
    );
  }
});
test('子菜单的条件态分组复刻原版：[103] 与 [990] 之后硬收行', async () => {
  // 交代助手/对换调教在场（LOCAL 计数换行 + [103] 的硬 PRINTL）：
  // 原版渲染成 [100,101,102] / [112,103] 两行，过滤组与页脚不受影响
  const both = create_era_fixture();
  seed_flag5(both, false);
  both.store.set('flag:10006', 31); // ASSI
  both.store.set('flag:10013', 32); // ASSI:1
  both.store.set('flag:10005', 0); // TARGET = MASTER → 112 的 CFLAG:0 免
  const { emit: emit_both } = load_page(both);
  await emit_both('SHOW_USERCOM');
  const divider_both = both.lines.find((line) => line.type === 'divider');
  assert.deepEqual(
    button_rows(both)
      .filter((r) => r.row > divider_both.row)
      .map((r) => r.cells.map(([acc]) => acc)),
    [[100, 101, 102], [112, 103], [104, 105, 106], [107, 108, 990], [999]],
    '条件按钮在场时 [103] 独占收行位（原版 USERCOM 的硬 PRINTL）',
  );

  // 登录菜单在场：[990] 硬收行之后 [991]/[992]/[999] 同一行
  const with_menu = create_era_fixture();
  seed_flag5(with_menu, false);
  with_menu.store.set('flag:550', 2);
  const { emit: emit_menu } = load_page(with_menu);
  await emit_menu('SHOW_USERCOM');
  const divider_menu = with_menu.lines.find((line) => line.type === 'divider');
  assert.deepEqual(
    button_rows(with_menu)
      .filter((r) => r.row > divider_menu.row)
      .map((r) => r.cells.map(([acc]) => acc)),
    [
      [100, 101, 103],
      [104, 105, 106],
      [107, 108, 990],
      [991, 992, 999],
    ],
    '[990] 硬收行之后 [991]/[992]/[999] 同一行（FLAG:550 > 0）',
  );
});

test('指令方格（自定义菜单路径）：按每行 3 列排布，末行不满仍与上面对齐', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, true);
  const { train_name_init } = fixture.load_module('system/train/train-name');
  const { emit } = load_page(fixture);
  train_name_init();

  await emit('SHOW_USERCOM');

  const divider = fixture.lines.find((line) => line.type === 'divider');
  // 零规则态 101 条指令全部可用：34 行 = 33 行满 3 格 + 末行 2 格
  const rows = button_rows(fixture).filter((r) => r.row < divider.row);
  assert.equal(rows.length, 34, '零规则态 101 条指令 → 34 行');
  assert.deepEqual(
    rows[0].cells.map(([acc]) => acc),
    [0, 1, 2],
    '首行三格是 L_IDX 0/1/2',
  );
  assert.equal(rows.at(-1).cells.length, 2, '末行 101 % 3 = 2 格');
  assert.ok(
    rows.slice(0, -1).every((r) => r.cells.length === 3),
    '除末行外每行恰好 3 格',
  );
  assert.ok(
    rows.every((r) => r.cells.every(([, , width]) => width === 8)),
    '每格宽 24/3 = 8，末行不满仍按 3 列的格宽对齐',
  );
});

test('指令方格（内建路径）：按每行 3 列排布', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM', [0, 6, 7, 8, 9]);

  const divider = fixture.lines.find((line) => line.type === 'divider');
  const rows = button_rows(fixture).filter((r) => r.row < divider.row);
  assert.deepEqual(
    rows.map((r) => r.cells.map(([acc]) => acc)),
    [
      [0, 6, 7],
      [8, 9],
    ],
    '内建列表同样按每行 3 列排布',
  );
  assert.ok(
    rows.every((r) => r.cells.every(([, , width]) => width === 8)),
    '每格宽 24/3 = 8',
  );
});

test('显示条件：ASSI>0 且 ASSI:1>0 时交代助手[102]出现', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:10006', 31); // ASSI
  fixture.store.set('flag:10013', 32); // ASSI:1（记录的助手）
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const labels = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.text);
  assert.ok(labels.includes('交代助手'));
});

test('显示条件：TARGET==MASTER 且 ASSI:1>0 时对换调教[112]出现（CFLAG:0 免）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:10005', 0); // TARGET = MASTER（角色 0）
  fixture.store.set('flag:10013', 32); // ASSI:1
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const labels = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.text);
  assert.ok(
    labels.includes('对换调教'),
    'TARGET == MASTER 时 CFLAG:0 不参与判定',
  );
});

test('显示条件：TARGET≠MASTER 时需 CFLAG:0 >= 2 才出现对换调教', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:10005', 31); // TARGET = 31（非 MASTER）
  fixture.store.set('flag:10013', 32);
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('cflag:31:0', 1); // < 2
  const { emit } = load_page(fixture);
  await emit('SHOW_USERCOM');
  let labels = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.text);
  assert.ok(!labels.includes('对换调教'), 'CFLAG:0 = 1 不得出现');

  fixture.store.set('cflag:31:0', 2);
  await emit('SHOW_USERCOM');
  labels = fixture.lines.filter((l) => l.type === 'button').map((b) => b.text);
  assert.ok(labels.includes('对换调教'), 'CFLAG:0 = 2 放行');
});

test('显示条件：FLAG:550 > 0 时调教菜单表示[991]/实行[992]出现', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:550', 2);
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const accs = fixture.lines
    .filter((l) => l.type === 'button')
    .map((b) => b.accelerator);
  assert.ok(accs.includes(991) && accs.includes(992));
});

test('过滤按钮染色：开启灰 #646464、未开启各系色、104 未开启为默认色', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:25', 1); // 爱抚系过滤开
  const { emit } = load_page(fixture);

  await emit('SHOW_USERCOM');

  const colors = Object.fromEntries(
    fixture.lines
      .filter(
        (l) =>
          l.type === 'button' && l.accelerator >= 104 && l.accelerator <= 108,
      )
      .map((b) => [b.accelerator, b.color]),
  );
  assert.equal(colors[104], '#646464', '开启位一律灰 100,100,100');
  assert.equal(colors[105], '#6495ED', '器具系未开启蓝 100,149,237');
  assert.equal(colors[106], '#FFA500', '私处系未开启橙 255,165,0');
  assert.equal(colors[107], '#DB7093', '肛门系未开启深粉 219,112,147');
  assert.equal(colors[108], '#FF6347', 'ＳＭ系未开启番茄红 255,99,71');
});

// —— USERCOM 分发（#214：全分支） ——

test('USERCOM：999 → 转场 AFTERTRAIN（链内暂存，最后一个胜出）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 999);

  assert.equal(pending, 'AFTERTRAIN');
});

test('USERCOM：103 避孕套设定分发到真身（#216 J6，com-condom.js）', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);
  fixture.era.beginTrain(0, 31);
  fixture.store.set('callname:31:-1', '温妮');
  const { emit } = load_page(fixture);
  fixture.set_inputs(9); // [9] 返回（不改动设定）

  await emit('USERCOM', 103);

  assert.ok(
    fixture.text_lines().some((t) => t.includes('和温妮做爱要戴套吗？')),
    'CONDOM_SETTINGS 真身的画面标题在场',
  );
  assert.ok(
    fixture.text_lines().some((t) => t.includes('现在：每次都问')),
    '当前设定的显示行在场（档位标签跟随 CFLAG:61 显示）',
  );
});

test('USERCOM：100/101 分销到真身（#390 起角色信息与污渍画面）', async () => {
  // 100 → SHOW_CHARA_INFO（ARG:1 缺省 -1 = 调教时样式）：标题行 + 两次 WAIT
  {
    const fixture = create_era_fixture();
    fixture.store.set('callname:0:-1', '魔王');
    const { emit } = load_page(fixture);

    await emit('USERCOM', 100);

    assert.ok(
      fixture.text_lines().some((t) => t.startsWith('NO.0\u00A0\u00A0')), // #577：标题行补位 NBSP
      '100 打出角色信息标题行（真身）',
    );
    assert.ok(
      fixture.text_lines().some((t) => t.startsWith('\u00A0苦痛:LV')),
      '调教时样式含刻印行（SHOW_INFO_MARK）',
    );
    assert.equal(fixture.waits.length, 2, '两次 WAIT');
    assert(fixture.waits.every((w) => w.waited === true));
  }
  // 101 → STAIN_INFO：三方污渍行 + 末尾一次 WAIT
  {
    const fixture = create_era_fixture();
    fixture.store.set('callname:0:-1', '魔王');
    const { emit } = load_page(fixture);

    await emit('USERCOM', 101);

    assert.ok(
      fixture.text_lines().some((t) => t.endsWith('的嘴巴：')),
      '101 打出污渍行（真身）',
    );
    assert.equal(fixture.waits.length, 1, 'STAIN_INFO 末尾 WAIT 一次');
    assert.equal(fixture.waits[0].waited, true);
  }
});

test('USERCOM：102 交代助手三分支的视角/助手切换', async () => {
  // 分支一：TARGET == MASTER → PLAYER 在 TARGET:1/ASSI:1 间翻转，ASSI = PLAYER
  {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    const era_flag = fixture.load_module('era-utils/era-flag');
    fixture.store.set('flag:10005', 0); // TARGET = MASTER
    fixture.store.set('flag:10006', 31); // ASSI
    fixture.store.set('flag:10012', 31); // TARGET:1
    fixture.store.set('flag:10013', 32); // ASSI:1
    era_flag.player = 31; // PLAYER == TARGET:1 → 取 ASSI:1
    await emit('USERCOM', 102);
    assert.equal(era_flag.player, 32, '分支一命中 TARGET:1 → 换成 ASSI:1');
    assert.equal(era_flag.assi, 32, 'ASSI = PLAYER');
    assert.equal(era_flag.assiplay, 1, 'PLAYER != MASTER → ASSIPLAY = 1');
  }
  // 分支二：TARGET == TARGET:1 → PLAYER 在 MASTER/ASSI:1 间翻转
  {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    const era_flag = fixture.load_module('era-utils/era-flag');
    fixture.store.set('flag:10005', 31); // TARGET = TARGET:1（记录对象本人）
    fixture.store.set('flag:10006', 31);
    fixture.store.set('flag:10012', 31);
    fixture.store.set('flag:10013', 32);
    era_flag.player = 0; // PLAYER == MASTER → 取 ASSI:1
    await emit('USERCOM', 102);
    assert.equal(era_flag.player, 32, '分支二命中 MASTER → 换成 ASSI:1');
    assert.equal(era_flag.assi, 32, '分支二的 ASSI = ASSI:1（非 PLAYER 跟随）');
  }
  // 分支三：其余 → PLAYER 在 MASTER/TARGET:1 间翻转，ASSI = TARGET:1
  {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    const era_flag = fixture.load_module('era-utils/era-flag');
    fixture.store.set('flag:10005', 33); // TARGET 异于 MASTER 与 TARGET:1
    fixture.store.set('flag:10006', 31);
    fixture.store.set('flag:10012', 31); // TARGET:1
    fixture.store.set('flag:10013', 32);
    era_flag.player = 0; // PLAYER == MASTER → 取 TARGET:1
    await emit('USERCOM', 102);
    assert.equal(era_flag.player, 31, '分支三命中 MASTER → 换成 TARGET:1');
    assert.equal(era_flag.assi, 31, '分支三的 ASSI = TARGET:1');
  }
});

test('USERCOM：102 条件不满足时落链尾（无输出无切换）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.store.set('flag:10006', 0); // ASSI = 0：ELSEIF 条件不满足
  fixture.store.set('flag:10013', 32);
  era_flag.player = 7;

  await emit('USERCOM', 102);

  assert.equal(era_flag.player, 7, '条件不满足不得切换');
  assert.deepEqual(
    fixture.lines.filter((l) => l.type !== 'wait'),
    [],
  );
});

test('usercom：112 对换调教（SWAP TARGET/PLAYER + 助手归位 + ASSIPLAY）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('cflag:31:0', 2); // TARGET≠MASTER 的条件：调教状态 ≥ 2
  fixture.store.set('flag:10005', 31); // TARGET
  fixture.store.set('flag:10012', 99); // TARGET:1（异于双方，不触发归位歧义）
  fixture.store.set('flag:10013', 31); // ASSI:1——换入视角 31 正是它 → 归位
  era_flag.player = 33;
  await emit('USERCOM', 112);

  assert.equal(era_flag.target, 33, 'SWAP：TARGET ← 原 PLAYER');
  assert.equal(era_flag.player, 31, 'SWAP：PLAYER ← 原 TARGET');
  assert.equal(era_flag.assi, 31, '换入视角 == ASSI:1 → ASSI 归位到它');
  assert.equal(era_flag.assiplay, 1);
});

test('USERCOM：104-108 过滤位翻转（开 ↔ 关；掩码逐位独立）', async () => {
  const cases = [
    [104, 1],
    [105, 2],
    [106, 4],
    [107, 8],
    [108, 16],
  ];
  for (const [acc, mask] of cases) {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    fixture.store.set('flag:25', 0);
    await emit('USERCOM', acc);
    assert.equal(fixture.store.get('flag:25'), mask, `${acc} 首按置位 ${mask}`);
    await emit('USERCOM', acc);
    assert.equal(fixture.store.get('flag:25'), 0, `${acc} 再按清位`);
  }
  // 邻位不受清位掩码波及（FLAG:25 &= 31^mask 只清目标位）
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  fixture.store.set('flag:25', 0b01011); // 位 0/1/3
  await emit('USERCOM', 105); // 清位 1
  assert.equal(fixture.store.get('flag:25'), 0b01001, '只清位 1，位 0/3 保留');
});

test('USERCOM：991 调教菜单表示（DRAWLINE + 序列行 + DRAWLINE + 等键）', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);
  fixture.store.set('flag:550', 1);
  fixture.store.set('flag:551', 0);

  await emit('USERCOM', 991);

  const texts = fixture.text_lines();
  assert.ok(
    texts.some((t) => t.includes('已登录指令')),
    'comseq_show 的序列行',
  );
  assert.equal(
    fixture.lines.filter((l) => l.type === 'divider').length,
    2,
    '前后各一条 DRAWLINE',
  );
  assert.equal(fixture.waits.at(-1)?.waited, true, 'WAIT 等键');
});

test('USERCOM：991/992 在 FLAG:550 = 0 时落链尾（条件不满足）', async () => {
  for (const acc of [991, 992]) {
    const fixture = create_era_fixture();
    const { emit } = load_page(fixture);
    await emit('USERCOM', acc);
    assert.deepEqual(
      fixture.lines.filter((l) => l.type !== 'wait'),
      [],
      `${acc} 无菜单时不得有任何输出`,
    );
  }
});

test('USERCOM：未定义编号（555）落到链尾，无输出无转场', async () => {
  const fixture = create_era_fixture();
  const { emit } = load_page(fixture);

  const pending = await emit('USERCOM', 555);

  assert.equal(pending, undefined);
  assert.deepEqual(fixture.lines, [], '未挂载输入不得有任何反馈（重绘即反馈）');
});

// —— 指令方格的两条渲染路径（#214：FLAG:5 位 34 分流） ——

test('位 34 开（开局默认）：自定义菜单，标签取 TRAIN_NAME、编号印 L_IDX', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, true);
  const { train_name_init } = fixture.load_module('system/train/train-name');
  const { emit } = load_page(fixture);
  train_name_init();

  await emit('SHOW_USERCOM');

  const buttons = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator < 100,
  );
  // 0（恒等段）、40（打屁股）、110（穿脱衣服）：#211 实证的三个错位点——
  // 零规则态全 101 条可用，取首尾三点断言
  const map = new Map(buttons.map((b) => [b.accelerator, b.text]));
  assert.equal(map.get(0), '爱抚');
  assert.equal(map.get(39), '打屁股', '编号必须是紧凑序号 L_IDX（40→39）');
  assert.equal(map.get(89), '穿脱衣服', '穿脱衣服 110→89');
  // L_IDX 空间上界：末位指令 207（媚药史莱姆）→ 位次 100
  const last = fixture.lines.find(
    (l) => l.type === 'button' && l.accelerator === 100,
  );
  assert.equal(last?.text, '媚药史莱姆', '末位 207→100（L_IDX 空间上界）');
});

test('位 34 关：内建渲染路径，标签取 TRAINNAME 静态名（不升格）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  const { emit } = load_page(fixture);
  // trainalias 播种与静态名不同的槽：160 号不在静态表——用 150（动态槽，
  // TRAIN_NAME 播种名 ≠ 静态名）区分两条路径的取表
  fixture.store.set('traincommandname:0', '静态爱抚');
  fixture.store.set('trainalias:0', '定制爱抚');

  await emit('SHOW_USERCOM', [0]);

  const buttons = fixture.lines.filter(
    (line) => line.type === 'button' && line.accelerator < 100,
  );
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [[0, '静态爱抚']],
    'OFF 路径读 traincommandname（内建列表的等价移植），不吃 trainalias',
  );
});

test('位 34 开的自定义菜单对 COM_ABLE=0 的指令不渲染', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, true);
  const { com_able_family } = fixture.load_module('system/train/com-family');
  const { emit } = load_page(fixture);
  com_able_family.register(0, async () => 0); // 爱抚不可用

  await emit('SHOW_USERCOM', [0]);

  const accs = fixture.lines
    .filter((l) => l.type === 'button' && l.accelerator < 100)
    .map((b) => b.accelerator);
  assert.ok(!accs.includes(0), 'COM_ABLE=0 的指令不得渲染（L_IDX 0 缺席）');
  assert.ok(accs.includes(1), '其余指令照常（L_IDX 1 在场）');
});

test('command_button_label：升格后的号取名字；64 合成分支读静态名', async () => {
  const fixture = create_era_fixture();
  const { command_button_label } = fixture.load_module('page/page-usercom');
  const { train_name_init } = fixture.load_module('system/train/train-name');
  train_name_init();
  fixture.store.set('traincommandname:64', '３Ｐ');
  fixture.store.set('traincommandname:20', '正常位');

  // 未升格（adv = id）：TRAIN_NAME（trainalias）的名字
  assert.equal(command_button_label(0, 0), '爱抚');
  // 升格（8 → 84 刺激Ｇ点）：名字用升格后的号，编号仍用升格前的位次
  assert.equal(command_button_label(84, 8), '刺激Ｇ点');
  // 64 合成分支（RESULT == 64 且 L_I != 64）：%TRAINNAME:64%・%TRAINNAME:L_I%
  assert.equal(command_button_label(64, 20), '３Ｐ・正常位');
  // 64 本尊不走合成分支（L_I == 64）
  assert.equal(command_button_label(64, 64), '３Ｐ');
});

test('自定义菜单的升格标签：标签换、编号不换（train-upgrade 实证样式）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, true);
  const { train_name_init } = fixture.load_module('system/train/train-name');
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { emit } = load_page(fixture);
  train_name_init();

  // 测试内注册 CASE 8 形状的升格规则（#213 骨架态零生产规则；J9 实现真
  // 规则时本用例按新语义改读生产规则）
  adv_com_family.register(8, async () => (era_flag.prevcom === 8 ? 84 : 8));

  era_flag.prevcom = 8;
  await emit('SHOW_USERCOM');

  const button = fixture.lines.find(
    (l) => l.type === 'button' && l.accelerator === 8,
  );
  // （train-upgrade-log 实证：名字用升格 id、编号用位次）
  assert.deepEqual([button.accelerator, button.text], [8, '刺激Ｇ点']);
});

test('按钮白名单：子菜单按钮驱动输入必须可送达（#130 的夹具校验）', async () => {
  const fixture = create_era_fixture();
  seed_flag5(fixture, false);
  fixture.store.set('flag:550', 1);
  fixture.store.set('flag:551', 0);
  const { emit } = load_page(fixture);
  await emit('SHOW_USERCOM'); // 画面上已打印 [100]-[108]/[990]/[991]/[999]

  // 逐个喂子菜单号：全部在已打印按钮的白名单内（不在则夹具当场抛错）
  for (const acc of [100, 101, 103, 104, 990, 999]) {
    fixture.reset_inputs(acc);
    const value = await fixture.era.input();
    assert.equal(value, acc);
  }
});

// —— p_c 与「上次的调教指令」行（#212：TSTR:90 承载）——

/** 预置 prevcom 后绘制指令菜单，返回「上次的调教指令」行文本与 tstr:90 */
async function draw_with_prevcom(fixture, prevcom) {
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.prevcom = prevcom;
  const { emit } = load_page(fixture);
  await emit('SHOW_USERCOM');
  const line = fixture.lines
    .filter((l) => l.type === 'text')
    .map((l) => l.text)
    .find((t) => t.startsWith('＜上次的调教指令：'));
  return { line, tstr: fixture.store.get('tstr:90') };
}

test('p_c 第一级：静态名表命中 → TSTR:90 = TRAINNAME', async () => {
  const fixture = create_era_fixture();
  // traincommandname:12（振动杖，yml/TrainCommand.yml 的静态名）
  fixture.store.set('traincommandname:12', '振动杖');
  const { line, tstr } = await draw_with_prevcom(fixture, 12);
  assert.equal(tstr, '振动杖');
  assert.equal(line, '＜上次的调教指令：振动杖＞');
});

/** 播种静态名表与 trainalias（进调教后的名字表状态） */
function seed_train_names(fixture) {
  seed_static_names(fixture);
  fixture.load_module('system/train/train-name').train_name_init();
}

test('p_c 第二级：高级指令不在静态名表 → 不读 TRAINNAME，取 TRAIN_NAME 定制名（#739）', async () => {
  const fixture = create_era_fixture();
  seed_train_names(fixture);
  // 126 = 手搓口交：只能经升格进入，执行后 PREVCOM 即 126
  const { line, tstr } = await draw_with_prevcom(fixture, 126);
  assert.equal(tstr, '手搓口交');
  assert.equal(line, '＜上次的调教指令：手搓口交＞');
});

test('p_c：每个高级指令号作 PREVCOM 都能画出「上次的调教指令」行（#739）', async () => {
  const { ADVANCED_COM_IDS } = create_era_fixture().load_module(
    'system/train/com-family',
  );
  for (const id of ADVANCED_COM_IDS) {
    const fixture = create_era_fixture();
    seed_train_names(fixture);
    const { line } = await draw_with_prevcom(fixture, id);
    assert.match(line, /^＜上次的调教指令：.+＞$/, `PREVCOM = ${id}`);
  }
});

test('p_c 第三级：两级皆空 → 全角空格占位（非空占位）', async () => {
  const fixture = create_era_fixture();
  // 998 既不在静态名表，也没有 trainalias
  const { line, tstr } = await draw_with_prevcom(fixture, 998);
  assert.equal(tstr, '　', '第三级回落必须落全角空格占位（非空）');
  assert.equal(line, '＜上次的调教指令：　＞');
});

test('静态名优先于定制名（TRAINNAME > TRAIN_NAME 的回落顺序不可倒置）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('traincommandname:12', '振动杖');
  fixture.store.set('trainalias:12', '被覆盖的名字');
  const { tstr } = await draw_with_prevcom(fixture, 12);
  assert.equal(tstr, '振动杖', 'TRAINNAME 非空时不得读 TRAIN_NAME');
});

test('PREVCOM = -1（首轮）：无「上次的调教指令」行，也不写 TSTR:90', async () => {
  const fixture = create_era_fixture();
  const { line, tstr } = await draw_with_prevcom(fixture, -1);
  assert.equal(line, undefined);
  assert.equal(tstr, undefined, 'P_C 不被调用，TSTR:90 不得有写入');
});

engine_test(
  '真实引擎：执行手搓口交后的下一回合，指令菜单照常画出「上次的调教指令」（#739）',
  async () => {
    const variables = create_variable_loader();
    for (const file of fs.readdirSync(YML_DIR)) {
      if (!file.endsWith('.yml') || /^(Chara\d+|GameBase)\.yml$/i.test(file)) {
        continue;
      }
      const table = path.basename(file, '.yml').toLowerCase();
      variables.load_rows(
        engine.parse_data_file(
          fs.readFileSync(path.join(YML_DIR, file), 'utf8'),
          'yml',
          table,
        ),
        table,
      );
    }
    // resetData 要读 gamebase，取角色装载器预备的静态数据
    const characters = create_chara_loader();
    Object.assign(characters.static_data, variables.static_data);
    const errors = [];
    const { normal } = engine.era_api.tableType;
    const api = new engine.era_api({
      config: {},
      global: {},
      staticData: characters.static_data,
      fieldNames: variables.field_names,
      // p_c 写 TSTR:90、读 TRAIN_NAME（trainalias），两张都是扩展普通表
      extendedTables: { tstr: normal, trainalias: normal },
      error: (message) => errors.push(message),
    });
    api.resetData();
    const fixture = create_era_fixture();
    for (const name of ['get', 'set', 'add']) {
      fixture.era[name] = api[name].bind(api);
    }
    fixture.load_module('system/train/train-name').train_name_init();

    const { line, tstr } = await draw_with_prevcom(fixture, 126);
    assert.equal(line, '＜上次的调教指令：手搓口交＞');
    assert.equal(tstr, undefined, '夹具 store 不参与，TSTR:90 写进引擎');
    assert.equal(api.get('tstr:90'), '手搓口交');
    assert.deepEqual(errors, [], '画菜单不得产生引擎变量寻址错误');
  },
);
