/**
 * ere/page/page-save-load.js 的行为测试（issue #136：C2 存读档界面；
 * #868：槽位列表改用网格、删除并进列表、备注生成不再改游戏状态）。
 *
 * 缝 = test/helpers/era-fixture.js。验收项（工单 #136 验收清单第 3 条）：
 * 99 槽 + 分页 + 故事命名（32 字符上限）+ 删除 + 覆盖确认 + 上次存/读档号
 * 高亮，**逐条有测试**。#868 的三条验收另有一节：
 *
 * 1. 列表在引擎里对齐——每槽是一行三格的网格（槽号按钮 + 备注文本格 +
 *    删除按钮），格宽合计 24；备注不被引擎折叠（它在文本格里，按钮正文
 *    只有编号）。
 * 2. 保存不再改写 TARGET/ASSI——生成备注前后指针逐值不变。
 * 3. 旧存档的备注照常显示——带 NBSP 补位的老备注原样进文本格。
 *
 * 夹具注意：saveData / loadData / rmData 的数据层镜像与 global 系三 API
 * （saveGlobal / loadGlobal / resetGlobal）分别由 #137 / #147 落实，契约见
 * test/fixture.test.js；个别用例仍就地替换 fixture.era.loadData（SDK 是
 * 可变对象，page-train.test.js 的先例）以绕开闸门细节、单测界面分支。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load_page(fixture) {
  return fixture.load_module('page/page-save-load');
}

/** 终态按钮条目（lines；type=button → {text, accelerator, rendered, color}） */
function buttons(fixture) {
  return fixture.lines.filter((line) => line.type === 'button');
}

/** 全量行史里的按钮（含已被 clear 清掉的轮次——分页/重绘的取证层） */
function buttons_history(fixture) {
  return fixture.lines_history.filter((line) => line.type === 'button');
}

/** 全量行史文本（text + button.rendered） */
function history_texts(fixture) {
  return fixture.lines_history.map((line) =>
    line.type === 'button' ? line.rendered : (line.text ?? ''),
  );
}

/** 槽号按钮（删除钮的快捷键在 DELETE_BASE 之上，按此分开两类按钮） */
function slot_buttons(fixture) {
  const { DELETE_BASE } = load_page(fixture);
  return buttons(fixture).filter((b) => b.accelerator < DELETE_BASE);
}

/** 删除按钮（快捷键 = DELETE_BASE + 槽号） */
function delete_buttons(fixture) {
  const { DELETE_BASE } = load_page(fixture);
  return buttons(fixture).filter((b) => b.accelerator >= DELETE_BASE);
}

/**
 * 按 Row 分组（夹具里一次输出调用共用一个 row 号）：返回
 * `[{ row, cells }]`，cells 是该行的格子条目。
 */
function rows_of(fixture, list = fixture.lines) {
  const map = new Map();
  for (const line of list) {
    if (!map.has(line.row)) {
      map.set(line.row, []);
    }
    map.get(line.row).push(line);
  }
  return [...map.entries()].map(([row, cells]) => ({ cells, row }));
}

/** 某个槽号所在的行（槽号按钮的 accelerator 命中） */
function slot_row_of(fixture, slot, list = fixture.lines) {
  return rows_of(fixture, list).find(
    (r) => r.cells.length > 1 && r.cells[0].accelerator === slot,
  );
}

/** 预置一个槽位备注（global:saves:n，引擎维护的存档备注） */
function seed_save(fixture, slot, comment) {
  fixture.store.set(`global:saves:${slot}`, comment);
}

/** #868 之前存下的备注：带 NBSP 补位的老格式 */
const OLD_REMARK =
  '2026/01/01 00:00:00 第\u00A01日午前\u00A0LV\u00A0\u00A0\u00A01\u00A0正在调教:玛奥';

// —— list_data / slot_row：槽位行的网格结构（#868）——

test('SLOT_ROW：每槽一行三格——槽号按钮 + 备注文本格 + 删除按钮，格宽合计 24', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '五号档');
  const page = load_page(fixture);
  page.list_data(5, 6, false);

  const row = slot_row_of(fixture, 5);
  assert(row, '槽号按钮必须存在');
  assert.equal(row.cells.length, 3, '一行三格（槽号 / 备注 / 删除）');
  const [slot, remark, del] = row.cells;
  assert.equal(slot.type, 'button');
  assert.equal(slot.accelerator, 5, '槽号按钮的快捷键 = 槽号');
  assert.equal(remark.type, 'text', '备注是文本格（按钮正文会被引擎折叠空白）');
  assert.equal(remark.text, '五号档');
  assert.equal(del.type, 'button');
  assert.equal(
    del.accelerator,
    page.DELETE_BASE + 5,
    '删除钮的快捷键 = DELETE_BASE + 槽号',
  );
  assert.equal(del.text, page.DELETE_LABEL);
  assert.equal(
    slot.grid_width + remark.grid_width + del.grid_width,
    24,
    '三格合计 24 列，否则末格被挤到下一行',
  );
  assert.equal(slot.grid_width, page.SLOT_WIDTH);
  assert.equal(remark.grid_width, page.REMARK_WIDTH);
  assert.equal(del.grid_width, page.DELETE_WIDTH);
  assert.equal(slot.grid_align, 'left');
  assert.equal(remark.grid_align, 'left');
  assert.equal(del.grid_align, 'right', '删除钮靠右，正文列不被它挤歪');
});

test('SLOT_ROW：槽号按钮的正文留空（编号归引擎 showAcc 拼，正文再写会显示两遍）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 98, '九八');
  const page = load_page(fixture);
  page.list_data(98, 99, false);

  const slot = slot_buttons(fixture).find((b) => b.accelerator === 98);
  assert.equal(slot.text, '', '正文留空——编号由引擎拼');
  assert.equal(
    slot.rendered.trim(),
    '[98]',
    '实机显示 `[98]`，不得出现 `[98] 98` 这类重复编号',
  );
});

test('SLOT_ROW：备注进文本格后不被折叠（1 位与 2 位槽号的备注从同一列起算）', () => {
  const fixture = create_era_fixture();
  // 老格式备注带 NBSP 补位：进按钮正文会被引擎压成一格，进文本格不会
  seed_save(fixture, 9, OLD_REMARK);
  seed_save(fixture, 10, OLD_REMARK);
  const page = load_page(fixture);
  page.list_data(9, 11, false);

  const slot9 = slot_row_of(fixture, 9);
  const slot10 = slot_row_of(fixture, 10);
  assert.equal(
    slot9.cells[1].text,
    OLD_REMARK,
    '备注逐字进文本格，不做二次加工',
  );
  assert.equal(slot9.cells[1].text, slot10.cells[1].text);
  assert.equal(
    slot9.cells[0].grid_width,
    slot10.cells[0].grid_width,
    '槽号格定宽：`[9]` 与 `[10]` 的备注因此对齐',
  );
});

test('空槽：读档视角槽号钮与删除钮都 disabled，备注格是灰 ----', () => {
  const fixture = create_era_fixture();
  const page = load_page(fixture);
  page.list_data(0, 2, false);

  const row = slot_row_of(fixture, 1);
  assert(row, '空槽也要有槽号（旧写法是无编号的纯文本）');
  const [slot, remark, del] = row.cells;
  assert.equal(slot.disabled, true, '读档界面的空槽不可选');
  assert.equal(slot.color, 'gray', '空槽一律灰色');
  assert.equal(remark.text, page.EMPTY_LABEL);
  assert.equal(remark.color, 'gray', '空槽的备注格同为灰色');
  assert.equal(del.disabled, true, '空槽没有可删的东西');
});

test('空槽：存档视角槽号钮可点（对空槽照存），删除钮仍 disabled', () => {
  const fixture = create_era_fixture();
  const page = load_page(fixture);
  page.list_data(0, 2, true);

  const row = slot_row_of(fixture, 1);
  const [slot, remark, del] = row.cells;
  assert.equal(slot.disabled, false, '存档界面的空槽必须可点，否则存不进空槽');
  assert.equal(slot.color, 'gray', '空槽仍是灰的（与配色语义一致）');
  assert.equal(remark.text, page.EMPTY_LABEL);
  assert.equal(del.disabled, true, '空槽的删除钮 disabled');
});

test('空槽不能存（读档视角）：disabled 快捷键被引擎挡下，游戏收不到这个值', async () => {
  const fixture = create_era_fixture();
  const { load_game } = load_page(fixture);
  fixture.set_inputs(1, 100); // 1 号是空槽 → 槽号钮 disabled
  await assert.rejects(
    () => load_game(),
    /输入不合法/,
    '引擎对 disabled 按钮既挡点击也挡快捷键（夹具同款校验）',
  );
});

test('LIST_DATA：`(FILE LOST) ` 前缀的备注按空槽对待（#147——引擎 loadGlobal 对账约定的消费面）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 0, '正常档');
  seed_save(fixture, 5, '(FILE LOST) 文件丢失的档');
  const page = load_page(fixture);
  page.list_data(0, 6, false);

  const lost = slot_row_of(fixture, 5).cells;
  assert.equal(lost[1].text, page.EMPTY_LABEL, '丢失槽显示 ----');
  assert.equal(lost[0].disabled, true, '丢失槽不可读');
  assert.equal(lost[2].disabled, true, '丢失槽不可删（无可删的存档）');
  const normal = slot_row_of(fixture, 0).cells;
  assert.equal(normal[1].text, '正常档');
  assert.equal(normal[0].disabled, false);
  assert.equal(normal[2].disabled, false);

  // 存档视角：丢失槽照旧可存（覆盖它）
  const fixture2 = create_era_fixture();
  seed_save(fixture2, 5, '(FILE LOST) 文件丢失的档');
  const page2 = load_page(fixture2);
  page2.list_data(0, 6, true);
  assert.equal(slot_row_of(fixture2, 5).cells[0].disabled, false);
});

test('LIST_DATA：末页 99 号位在列表内留空行（单列段归读档界面）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 98, '九八');
  const { list_data } = load_page(fixture);
  const before = fixture.lines.length;
  list_data(95, 100, false); // 末页窗口 [80,100) 的缩影
  // 95-98 渲染四行（空槽也是带编号的 disabled 行），99 一个空行
  const new_lines = fixture.lines.slice(before);
  const { DELETE_BASE } = load_page(fixture);
  const slots = new_lines
    .filter((line) => line.type === 'button' && line.accelerator < DELETE_BASE)
    .map((line) => line.accelerator);
  assert.deepEqual(slots, [95, 96, 97, 98], '98 号是最后一个列表槽');
  assert(
    !new_lines.some((line) => line.accelerator === 99),
    '99 号不得在列表里渲染（读档界面单列段专属）',
  );
});

test('LIST_DATA 高亮：LASTLOAD_NO 深天蓝 / LASTSAVE_NO 浅绿，同槽浅绿胜，两格同色', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '五号');
  seed_save(fixture, 7, '七号');
  seed_save(fixture, 9, '九号');
  fixture.store.set('flag:10018', 5); // LASTLOAD_NO
  fixture.store.set('flag:10019', 7); // LASTSAVE_NO:0
  const { list_data } = load_page(fixture);

  list_data(0, 20, false);
  const row5 = slot_row_of(fixture, 5).cells;
  assert.equal(row5[0].color, 'deepskyblue', '上次读档号高亮 DEEPSKYBLUE');
  assert.equal(row5[1].color, 'deepskyblue', '备注格同色（整行高亮）');
  const row7 = slot_row_of(fixture, 7).cells;
  assert.equal(row7[0].color, 'lightgreen', '上次存档号高亮 LIGHTGREEN');
  assert.equal(row7[1].color, 'lightgreen');

  // 同槽：顺序后设覆盖——LIGHTGREEN 压过 DEEPSKYBLUE
  fixture.store.set('flag:10019', 5);
  list_data(0, 20, false);
  const slot5_latest = rows_of(fixture)
    .filter((r) => r.cells.length === 3 && r.cells[0].accelerator === 5)
    .pop();
  assert.equal(
    slot5_latest.cells[0].color,
    'lightgreen',
    '同槽双高亮时后设的浅绿生效',
  );
});

test('未读/未存过档：-1 作默认值，任何槽都不高亮（?? 缺省处理，0 是有效槽号）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 0, '零号');
  const { list_data } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.last_load_no, -1, '未读过的初值是 -1 而非 0');
  assert.equal(era_flag.last_save_no, -1);
  list_data(0, 1, false);
  const cells = slot_row_of(fixture, 0).cells;
  assert.equal(cells[0].color, undefined, '-1 不命中任何槽');
  assert.equal(cells[1].color, undefined);
});

// —— build_save_info：存档备注正文（#868：不再补位、不再改游戏状态）——

test('SAVEINFO：日期时段 / LV / 正在调教段 / 故事名逐段拼接（字段间只留单空格）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10000', 0); // DAY:0 = 0 → 第 1 日
  fixture.store.set('flag:10003', 0); // TIME = 0 → 午前
  fixture.store.set('cflag:0:9', 5); // 魔王等级
  fixture.store.set('flag:1', 3); // 前回调教目标（故意与当前 TARGET 不同）
  fixture.store.set('flag:10005', 3); // TARGET
  // 引擎把 callname 按 <角色号>:<下标> 存（-1 = 呼び名）——此前的写法不带下标读
  // callname:3 会拿到整个名字表对象，存档说明里显出 [object Object]
  fixture.store.set('callname:3:-1', '玛奥');
  fixture.store.set('cstr:0:99', '魔王城物语');
  const { build_save_info } = load_page(fixture);

  assert.equal(
    build_save_info(),
    '第1日午前 LV5 正在调教:玛奥 『魔王城物语』',
    '字段之间只有分隔用的单空格：列对齐由网格负责，不再靠 NBSP 补位',
  );

  // 时段翻转 + 无调教对象（TARGET < 1 → 无该段）+ 无故事名
  const fixture2 = create_era_fixture();
  fixture2.store.set('flag:10000', 9); // 第 10 日
  fixture2.store.set('flag:10003', 1); // 午后
  fixture2.store.set('cflag:0:9', 100);
  const { build_save_info: build2 } = load_page(fixture2);
  assert.equal(build2(), '第10日午后 LV100');
});

test('SAVEINFO 不再改写 TARGET/ASSI（SIF FLAG:1/FLAG:2 的副作用已删）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:1', 3); // 前回调教目标
  fixture.store.set('flag:2', 7); // 前回助手
  fixture.store.set('flag:10005', -1); // TARGET
  fixture.store.set('flag:10006', 0); // ASSI
  const { build_save_info } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');

  build_save_info();
  assert.equal(era_flag.target, -1, 'TARGET 保持调用前的值');
  assert.equal(era_flag.assi, 0, 'ASSI 保持调用前的值');
  assert(
    !fixture.var_writes.some(
      (w) => w.name === 'flag:10005' || w.name === 'flag:10006',
    ),
    '生成备注不得写这两个指针',
  );
});

test('SAVEINFO 只读：备注里的调教段按当前 TARGET 取（不借 FLAG:1）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:1', 12); // 上次调教对象
  fixture.store.set('flag:2', 8);
  fixture.store.set('flag:10005', 0); // 当前 TARGET = 0（无调教对象）
  fixture.store.set('callname:12:-1', '琼');
  const { build_save_info } = load_page(fixture);
  assert.equal(
    build_save_info(),
    '第1日午前 LV0',
    'TARGET < 1 时不出现调教段（旧副作用会先把它改成 FLAG:1）',
  );
});

// —— save_game：存档界面 ——

test('SAVEGAME：空槽直接存（无覆盖确认），备注 = 时间戳 + SAVEINFO', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10003', 0);
  const { save_game } = load_page(fixture);
  fixture.set_inputs(3);

  assert.equal(await save_game(), 0);
  const call = fixture.calls.find((c) => c.api === 'saveData');
  assert(call, '必须调 era.saveData');
  assert.equal(call.args[0], 3, '存进玩家选的 3 号槽');
  assert.match(
    call.args[1],
    /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} 第1日午前/,
    '备注前缀 = GETTIMES() 的 YYYY/MM/DD HH:MM:SS + SAVEINFO 正文',
  );
  assert(
    history_texts(fixture).some((t) => t === '已将游戏保存为3号存档……'),
    '存档反馈行（PRINTFORMW 的 print 半）',
  );
  assert(
    fixture.waits.some((w) => w.waited),
    '存档反馈必须等键（PRINTFORMW 的读键半）',
  );
});

test('SAVEGAME：保存不改写 TARGET/ASSI（备注生成只读）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:1', 3);
  fixture.store.set('flag:2', 7);
  fixture.store.set('flag:10005', -1);
  fixture.store.set('flag:10006', -1);
  const { save_game } = load_page(fixture);
  fixture.set_inputs(2);
  await save_game();
  assert.equal(fixture.store.get('flag:10005'), -1, 'TARGET 不被保存动作改写');
  assert.equal(fixture.store.get('flag:10006'), -1, 'ASSI 同');
});

test('SAVEGAME：LASTSAVE_NO 压栈（[0]=新槽，旧 [0] 移 [1]，10 元滑动）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10019', 5); // 旧 [0] = 5
  fixture.store.set('flag:10020', 6); // 旧 [1] = 6
  const { save_game } = load_page(fixture);
  fixture.set_inputs(8);
  await save_game();
  assert.equal(
    fixture.store.get('flag:10019'),
    8,
    'ARRAYSHIFT 后 [0] = 本次槽号',
  );
  assert.equal(fixture.store.get('flag:10020'), 5, '旧 [0] 移到 [1]');
  assert.equal(fixture.store.get('flag:10021'), 6, '旧 [1] 移到 [2]');
});

test('SAVEGAME 覆盖确认：存在槽先问，取消不存 / 确认后存', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '旧档');
  const { save_game } = load_page(fixture);

  // 取消路径
  fixture.set_inputs(5, 0, 100);
  await save_game();
  assert(!fixture.calls.some((c) => c.api === 'saveData'), '取消时不得存档');
  assert(
    history_texts(fixture).some((t) => t === '存档已经存在，确定要覆盖么？'),
    '覆盖确认行必须出现',
  );

  // 确认路径
  const fixture2 = create_era_fixture();
  seed_save(fixture2, 5, '旧档');
  const { save_game: save2 } = load_page(fixture2);
  fixture2.set_inputs(5, 1);
  await save2();
  const call = fixture2.calls.find((c) => c.api === 'saveData');
  assert(call, '确认后存档');
  assert.equal(call.args[0], 5);
});

test('SAVEGAME 翻页：102 前进 / 101 回退 / 首页不退 / 末页（80 起）不进', async () => {
  const fixture = create_era_fixture();
  const { save_game, PAGE_LEN, DELETE_BASE } = load_page(fixture);
  assert.equal(PAGE_LEN, 20, 'SAVENOS() 默认值 20（分页步长）');

  fixture.set_inputs(102, 101, 100);
  assert.equal(await save_game(), 0, '翻页往返后回到首页起点 0');
  const slot_accs = buttons_history(fixture)
    .map((b) => b.accelerator)
    .filter((acc) => acc < DELETE_BASE);
  const pages = [];
  let current = [];
  for (const acc of slot_accs) {
    if (current.length && acc <= current[current.length - 1]) {
      pages.push(current);
      current = [];
    }
    current.push(acc);
  }
  if (current.length) {
    pages.push(current);
  }
  // 轮次：首页(0-19 空槽按钮+200+101/100/102) → 翻页后(20-39…) → 回首页
  const first_round = pages.find((p) => p.includes(0));
  assert(
    first_round.includes(19) && !first_round.includes(20),
    '首页渲染 0-19（每页 20 槽）',
  );
  const second_round = pages.find((p) => p.includes(20));
  assert(
    second_round.includes(39) && !second_round.includes(0),
    '102 后一页从 20 起',
  );
  assert(
    pages.filter((p) => p.includes(0)).length >= 2,
    '101 回退重绘又见 0 号',
  );

  // 首页按 101：无效（落出 IF → 无效输入重输），页不动
  const fixture3 = create_era_fixture();
  const { save_game: save3 } = load_page(fixture3);
  fixture3.set_inputs(101, 100);
  await save3();
  const slots3 = buttons_history(fixture3)
    .map((b) => b.accelerator)
    .filter((acc) => acc < DELETE_BASE);
  assert(
    slots3.includes(0) && !slots3.includes(20),
    '首页按 上一页 不得离开第 1 页',
  );

  // 末页：从 0 连按 4 次 102 到 80，第 5 次 102 无效（80+20=100 不 < 99）
  const fixture4 = create_era_fixture();
  const { save_game: save4 } = load_page(fixture4);
  fixture4.set_inputs(102, 102, 102, 102, 102, 100);
  await save4();
  const slots4 = buttons_history(fixture4)
    .map((b) => b.accelerator)
    .filter((acc) => acc < DELETE_BASE);
  assert(slots4.includes(80), '连翻四页到 80 起（末页）');
  assert(!slots4.includes(99), '末页列表不含 99 号（100 是返回按钮，非槽号）');
});

test('SAVEGAME 标题行：故事名有无两态（拼接，含【保存存档】前缀）', async () => {
  const fixture = create_era_fixture();
  const { save_game } = load_page(fixture);
  fixture.set_inputs(100);
  await save_game();
  // 前缀「【保存存档】」是 PRINT 段，#161 范围 B 实测比对查出首版漏抄、已补
  assert(
    history_texts(fixture).some(
      (t) => t === '【保存存档】当前故事还没有名字，要保存到以下哪个存档？',
    ),
  );

  const fixture2 = create_era_fixture();
  fixture2.store.set('cstr:0:99', '魔王城');
  const { save_game: save2 } = load_page(fixture2);
  fixture2.set_inputs(100);
  await save2();
  assert(
    history_texts(fixture2).some((t) => t.includes('当前的故事名为『魔王城』')),
  );
});

// —— $SET_NAME：故事命名 ——

test('故事命名：普通名原样入库，反馈显示所输', async () => {
  const fixture = create_era_fixture();
  const { save_game } = load_page(fixture);
  fixture.set_inputs(200, '魔王城物语', 100);
  await save_game();
  assert.equal(fixture.store.get('cstr:0:99'), '魔王城物语');
  assert(
    history_texts(fixture).some((t) => t === '将故事命名为『魔王城物语』'),
  );
});

test('故事命名：超过 32 字符存储截断、显示保留原串', async () => {
  const fixture = create_era_fixture();
  const { save_game } = load_page(fixture);
  const long_name = '一'.repeat(40);
  fixture.set_inputs(200, long_name, 100);
  await save_game();
  assert.equal(
    fixture.store.get('cstr:0:99'),
    '一'.repeat(32),
    'CSTR:MASTER:99 只存前 32 字符',
  );
  assert(
    history_texts(fixture).some((t) => t === `将故事命名为『${long_name}』`),
    '反馈行显示未截断的原串',
  );
});

test('故事命名：输入 0 走消名分支（#567：0 视为空输入）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('cstr:0:99', '旧名');
  const { save_game } = load_page(fixture);
  // 引擎把回传值按 getNumber 归一（夹具同款）：空输入与字面量 "0" 到手都是
  // 数值 0；渲染层又不受理空提交（app.vue 的 returnFromInput 空值检查，
  // dev-guides/05-interaction.md:124），0 因此是「不输入」的唯一可达写法。
  // #567 决定 0 视为空输入，消名分支由此恢复可达
  // （#151 曾记为真机不可达，这张工单按新决定翻修断言）。
  fixture.set_inputs(200, 0, 100);
  await save_game();
  assert.equal(fixture.store.get('cstr:0:99'), '', 'CSTR:MASTER:99 被清空');
  assert(
    history_texts(fixture).some((t) => t === '消去了故事的名字'),
    '消名支的播报',
  );
  assert(
    !history_texts(fixture).some((t) => t === '将故事命名为『0』'),
    '不再把 0 当字面量故事名',
  );
  assert(
    history_texts(fixture).some((t) => t.includes('（旧名）')),
    '命名提示行带现名（PRINTBUTTON 的预填降级为文本提示）',
  );
  assert(
    history_texts(fixture).some((t) => t.includes('请输入一个名称故事：')),
    '文案（含语序）保持',
  );
});

// —— 自动存档：同一条备注路径（#868 的「自动存档也走这条路径」）——

test('AUTO_SAVE：写 99 号槽、备注带「自动」前缀，且不改写 TARGET/ASSI', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10000', 6); // 第 7 日
  fixture.store.set('flag:10003', 0); // 午前
  fixture.store.set('flag:1', 3); // 上次调教对象
  fixture.store.set('flag:2', 7); // 上次助手
  fixture.store.set('flag:10005', -1); // TARGET
  fixture.store.set('flag:10006', 0); // ASSI
  const { auto_save, AUTOSAVE_SLOT } = load_page(fixture);

  await auto_save();
  const call = fixture.calls.find((c) => c.api === 'saveData');
  assert.equal(call.args[0], AUTOSAVE_SLOT, '自动存档写 99 号槽');
  assert.match(
    call.args[1],
    /^自动 \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} 第7日午前 LV0$/,
    '备注 = 自动前缀 + 时间戳 + saveinfo 正文（无补位）',
  );
  assert.equal(
    fixture.store.get('flag:10005'),
    -1,
    '自动存档同样不得改写 TARGET',
  );
  assert.equal(fixture.store.get('flag:10006'), 0, 'ASSI 同');
});

// —— 删除：并进列表（#868），不再有单独的一屏 ——

test('删除并进列表：存档界面不再有 [300]，每行自带删除钮', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '五号');
  const { save_game, DELETE_BASE } = load_page(fixture);
  fixture.set_inputs(100);
  await save_game();
  assert(
    !buttons_history(fixture).some((b) => b.accelerator === 300),
    '[300] 删除存档画面已撤（删除在列表的每一行里）',
  );
  const del = delete_buttons(fixture).find(
    (b) => b.accelerator === DELETE_BASE + 5,
  );
  assert(del, '5 号行必须有删除钮');
  assert.equal(del.disabled, false, '有存档的槽可删');
  assert.equal(
    delete_buttons(fixture).find((b) => b.accelerator === DELETE_BASE).disabled,
    true,
    '空槽的删除钮 disabled',
  );
});

test('DELDATA：确认后删档（rmData），取消不删', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '五号');
  const { save_game, DELETE_BASE } = load_page(fixture);

  fixture.set_inputs(DELETE_BASE + 5, 1, 100);
  assert.equal(await save_game(), 0);
  assert(
    fixture.calls.some((c) => c.api === 'rmData' && c.args[0] === 5),
    '确认后必须调 era.rmData(5)',
  );
  assert(
    history_texts(fixture).some((t) => t === '确定要删除这个存档么？'),
    '删除确认行',
  );

  const fixture2 = create_era_fixture();
  seed_save(fixture2, 5, '五号');
  const { save_game: save2, DELETE_BASE: base2 } = load_page(fixture2);
  fixture2.set_inputs(base2 + 5, 0, 100);
  await save2();
  assert(!fixture2.calls.some((c) => c.api === 'rmData'), '取消时不得删除');
});

test('DELDATA：读档界面同样能删（删除钮在列表里，两个界面一致）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 7, '七号');
  const { load_game, DELETE_BASE } = load_page(fixture);
  fixture.set_inputs(DELETE_BASE + 7, 1, 100);
  assert.equal(await load_game(), 0, '删完停在本界面（[100] 返回）');
  assert(
    fixture.calls.some((c) => c.api === 'rmData' && c.args[0] === 7),
    '读档界面的行内删除也要真的调 rmData',
  );
});

test('DELDATA 边界：0 号槽与 99 号自动存档槽都能删（删除键区间两端）', async () => {
  // 下界：DELETE_BASE + 0。1 号槽也种上备注：删除键若被区间判断漏掉，
  // 这次输入会落到列表轮，那里只有「有存档的槽」与页脚是合法键——留着
  // 一个可点的槽，让确认键 1 在两轮里都合法，失败停在 rmData 缺失上
  // 而不是夹具的「输入不合法」。
  const fixture = create_era_fixture();
  seed_save(fixture, 0, '零号');
  seed_save(fixture, 1, '一号');
  const { load_game, DELETE_BASE } = load_page(fixture);
  fixture.set_inputs(DELETE_BASE, 1, 100);
  assert.equal(await load_game(), 0);
  assert(
    fixture.calls.some((c) => c.api === 'rmData' && c.args[0] === 0),
    '区间下界：0 号槽的删除键要送达',
  );

  // 上界：DELETE_BASE + 99（自动存档位单列渲染，同样可删）
  const fixture2 = create_era_fixture();
  seed_save(fixture2, 1, '一号');
  seed_save(fixture2, 99, '自动档备注');
  const {
    load_game: load2,
    DELETE_BASE: base2,
    AUTOSAVE_SLOT,
  } = load_page(fixture2);
  fixture2.set_inputs(base2 + AUTOSAVE_SLOT, 1, 100);
  assert.equal(await load2(), 0);
  assert(
    fixture2.calls.some((c) => c.api === 'rmData' && c.args[0] === 99),
    '区间上界：99 号自动存档槽的删除键要送达',
  );
});

test('del_data 已删除（导出表里不再有它，入口只剩列表内的删除钮）', () => {
  const fixture = create_era_fixture();
  const page = load_page(fixture);
  assert.equal(page.del_data, undefined, '#868：单独一屏的删除画面已撤');
});

test('页脚三键排在同一行（格宽按格数均分 24 列，第三枚不折行）', async () => {
  const fixture = create_era_fixture();
  const { load_game } = load_page(fixture);
  fixture.set_inputs(100);
  await load_game();

  const row = rows_of(fixture).find((r) =>
    r.cells.some((c) => c.accelerator === 101),
  );
  assert(row, '页脚行必须存在');
  const footer = row.cells.map((c) => c.accelerator);
  assert.deepEqual(
    footer,
    [101, 100, 102],
    '上一页/返回/下一页共享同一个 Row（逐个 printButton 会各占一行）',
  );
  const width_sum = row.cells.reduce((sum, c) => sum + c.grid_width, 0);
  assert(
    width_sum <= 24,
    `三格合计 ${width_sum} 列，超 24 列第三枚会被挤到下一行`,
  );
});

test('页脚两键（确定/取消）仍各 12 列（格宽按格数均分）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '旧档');
  const { save_game } = load_page(fixture);
  fixture.set_inputs(5, 0, 100);
  await save_game();
  const row = rows_of(fixture, fixture.lines_history).find(
    (r) =>
      r.cells.length === 2 &&
      r.cells.some((c) => c.accelerator === 1) &&
      r.cells.some((c) => c.accelerator === 0),
  );
  assert(row, '确认行必须存在');
  const widths = row.cells.map((c) => c.grid_width);
  assert.deepEqual(widths, [12, 12], '两枚选项各 12 列，正好铺满一行');
});

// —— load_game：读档界面 ——

test('LOADGAME：99 号自动存档槽单列渲染，LASTLOAD_NO==99 时深天蓝', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 99, '自动档备注');
  const { load_game } = load_page(fixture);
  fixture.set_inputs(100);
  await load_game();
  const row = slot_row_of(fixture, 99);
  assert(row, '99 号槽必须渲染成一行');
  assert.equal(row.cells.length, 3, '99 号行与列表同款（槽号 / 备注 / 删除）');
  assert.equal(row.cells[1].text, '自动档备注');
  assert.equal(row.cells[0].color, undefined, '未读 99 号时不高亮');

  const fixture2 = create_era_fixture();
  seed_save(fixture2, 99, '自动档备注');
  fixture2.store.set('flag:10018', 99);
  const { load_game: load2 } = load_page(fixture2);
  fixture2.set_inputs(100);
  await load2();
  assert.equal(
    slot_row_of(fixture2, 99).cells[0].color,
    'deepskyblue',
    'SIF 99 == LASTLOAD_NO → DEEPSKYBLUE',
  );
});

test('LOADGAME：99 号槽无存档时不渲染槽行（只剩一条线）', async () => {
  const fixture = create_era_fixture();
  const { load_game } = load_page(fixture);
  fixture.set_inputs(100);
  await load_game();
  assert(
    !buttons_history(fixture).some((b) => b.accelerator === 99),
    '空 99 号不得出现按钮',
  );
});

test('LOADGAME 翻页：102 前进到第 2 页 / 101 回退 / 首页不退', async () => {
  const fixture = create_era_fixture();
  const { load_game, DELETE_BASE } = load_page(fixture);
  fixture.set_inputs(102, 101, 100);
  assert.equal(await load_game(), 0);
  const slots = buttons_history(fixture)
    .map((b) => b.accelerator)
    .filter((acc) => acc < DELETE_BASE);
  assert(slots.includes(20), '102 后一页从 20 起');
  assert(
    slots.includes(0) && slots.lastIndexOf(0) > slots.lastIndexOf(20),
    '101 回退重绘又见 0 号',
  );

  // 首页按 101 无效（页起点不动）
  const fixture2 = create_era_fixture();
  const { load_game: load2 } = load_page(fixture2);
  fixture2.set_inputs(101, 100);
  await load2();
  assert(
    !buttons_history(fixture2).some((b) => b.accelerator === 20),
    '首页按 上一页 不得离开第 1 页',
  );
});

test('LOADGAME：读档成功 → LASTLOAD_NO 自写入 + EX_FLAG:2801 钳到 10 + 转场', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  fixture.store.set('exflag:2801', 5); // 一周目主线 < 10
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true; // 引擎读档成功（SDK 可变对象）
  // 多排一个 [100]：转场没发生时读档界面会继续循环、把这个输入当「返回」吃掉，
  // 于是断言落在「返回了页起点」而不是「输入耗尽」——转场被拆时一眼看得出
  fixture.set_inputs(3, 100);

  // #137 起 LOADDATA 的转场语义实现：读档成功不再返回（原断言
  // `assert.equal(await load_game(), 0)` 把「回调用方」的错误行为固化成了
  // 断言——实机上玩家读完档无路可走，#136 实机验收撞出、#137 评论移交。
  // 断言改看「去了哪个状态」：SHOP_AFTER_LOAD = 进 SHOP 且不执行 EVENTSHOP
  const { STATE } = fixture.load_module('system/flow/game-state');
  assert.equal(
    await load_game(),
    STATE.SHOP_AFTER_LOAD,
    '读档成功必须以转场目标返回（LOADDATA 与 BEGIN 并列，system-flow.md:26）',
  );
  // LASTLOAD_NO 与钳制在转场抛出前完成（先于迁移）
  assert.equal(fixture.store.get('flag:10018'), 3, 'LASTLOAD_NO = 本次槽号');
  assert.equal(fixture.store.get('exflag:2801'), 10, 'EX_FLAG:2801 < 10 → 10');
  assert(
    fixture.var_writes.some((w) => w.name === 'flag:10018' && w.value === 3),
    'LASTLOAD_NO 的写入要落到 flag:10018',
  );
});

test('LOADGAME：EX_FLAG:2801 已 >= 10 时不钳制（SIF 条件）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  fixture.store.set('exflag:2801', 15);
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);
  assert.equal(await load_game(), 'SHOP_AFTER_LOAD');
  assert.equal(fixture.store.get('exflag:2801'), 15, '15 不动');
});

test('LOADGAME：引擎拒读（loadData false）不写 LASTLOAD_NO，回列表等输入', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => false;
  fixture.set_inputs(3, 100);
  await load_game();
  assert.equal(
    fixture.store.get('flag:10018'),
    undefined,
    '拒读不得写 LASTLOAD_NO',
  );
});

test('LOADGAME 读档界面标题与操作行文案（按期望逐字）', async () => {
  const fixture = create_era_fixture();
  const { load_game } = load_page(fixture);
  fixture.set_inputs(100);
  await load_game();
  const texts = history_texts(fixture);
  assert(texts.includes('【读取存档】要载入以下哪个存档？'));
  assert(texts.includes('[101] 上一页'));
  assert(texts.includes('[100] 返回'));
  assert(texts.includes('[102] 下一页'));
  const accs = buttons_history(fixture).map((b) => b.accelerator);
  for (const acc of [100, 101, 102]) {
    assert(
      accs.includes(acc),
      `操作按钮 ${acc} 必须真的 printButton（实机可达）`,
    );
  }
});

// —— #868 验收第 3 条：旧存档的备注照常显示（存储不改、只改呈现）——

test('旧存档备注照常显示：带 NBSP 补位的老备注逐字进文本格', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 4, OLD_REMARK);
  const { load_game } = load_page(fixture);
  fixture.set_inputs(100);
  await load_game();
  const row = slot_row_of(fixture, 4);
  assert(row, '老备注也要渲染出来');
  assert.equal(
    row.cells[1].text,
    OLD_REMARK,
    '备注是存进 global:saves 的原串，只换呈现位置（文本格），不重排',
  );
  assert.equal(row.cells[1].grid_align, 'left');
});

test('旧存档备注：存档动作不改动 global:saves 的存储形态（只写自己那一槽）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 4, OLD_REMARK);
  const { save_game } = load_page(fixture);
  fixture.set_inputs(6); // 存进 6 号槽
  await save_game();
  assert.equal(
    fixture.store.get('global:saves:4'),
    OLD_REMARK,
    '别的槽的备注原样不动',
  );
  assert.match(
    fixture.store.get('global:saves:6'),
    /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} 第1日午前 LV0$/,
    '新备注仍是「时间戳 + 正文」的一个字符串（存储格式不变）',
  );
});

// —— #137：LOADDATA 的转场语义与读档钩子 ——

test('读档成功后钩子被调用：EVENTLOAD 链真的跑了（不是只证明钩子存在）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  // 探针挂在链上：load_game 的成功分支必须 emit（page-save-load require
  // event-load 完成装配，链非空）
  const { on } = fixture.load_module('system/event/registry');
  let probe_calls = 0;
  on('EVENTLOAD', () => {
    probe_calls += 1;
  });
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);

  assert.equal(await load_game(), 'SHOP_AFTER_LOAD');
  assert.equal(probe_calls, 1, '读档成功必须 emit EVENTLOAD 链一次');
  // 钩子的历史补丁等价物也跑了（魔王标识写入——角色 0 虽不在场，钩子
  // 对 getAddedCharacters 循环，空列表零写入；探针即「被调用」的凭证）
});

test('钩子副作用：历史补丁三行对新档有语义的等价物在读档后被重放', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(17, { id: 17, name: '琼', callname: '琼' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(17);
  // 读入的存档带着被剧情压低的上限（EVENT_ADDICT 的写点产物）
  fixture.store.set('maxbase:0:0', 550);
  fixture.store.set('maxbase:0:1', 90);
  fixture.store.set('maxbase:17:0', 1200); // 高于下限：不动
  fixture.store.set('maxbase:17:1', 100); // 恰好等于下限：不动
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);

  assert.equal(await load_game(), 'SHOP_AFTER_LOAD');
  assert.equal(
    fixture.store.get('ex_talent:0:200'),
    1,
    'EX_TALENT:MASTER:200 = 1（魔王高贵标识）',
  );
  assert.equal(fixture.store.get('ex_talent:17:200'), undefined, '只写 MASTER');
  assert.equal(fixture.store.get('maxbase:0:0'), 600, 'MAXBASE:0 < 600 → 600');
  assert.equal(fixture.store.get('maxbase:0:1'), 100, 'MAXBASE:1 < 100 → 100');
  assert.equal(
    fixture.store.get('maxbase:17:0'),
    1200,
    '已高于下限的角色不动（SIF 条件）',
  );
  assert.equal(fixture.store.get('maxbase:17:1'), 100, '恰等于下限不动');
});

test('读档钩子：CHARA_NAME_INIT 与 EX_TALENTNAME_INIT 已落真身（#388）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);

  assert.equal(await load_game(), 'SHOP_AFTER_LOAD');
});

test('夹具镜像版本检查：低版本存档 loadData 拒读，不转场、数据不被替换', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10000', 7); // DAY:0 = 7 → 存档快照里是 7
  const { save_game, load_game } = load_page(fixture);
  fixture.set_inputs(3);
  await save_game(); // 以 current_version = 1 存进 3 号槽

  fixture.store.set('flag:10000', 99); // 存档后继续游戏（DAY 变 99）
  fixture.save_gate.allow_version = 2; // 抬最低支持版本 → 3 号档成旧档
  fixture.set_inputs(3, 100);
  // 拒读：留在读档界面（3 落到无效输入重绘），100 返回。outcome 收
  // 结果：拒读路径正常返回 0；变异拆掉夹具检查时 loadData 意外成功、
  // load_game 返回转场目标，outcome 是字符串 ≠ 0——本断言先红（拦截 M258）
  const outcome = await load_game().then(
    (v) => v,
    (e) => e,
  );
  assert.equal(outcome, 0, '拒读后仍可 [100] 返回（不转场）');
  assert.equal(
    fixture.store.get('flag:10000'),
    99,
    '拒读时数据不被替换（引擎 r.version < allowVersion → false）',
  );
  assert.equal(
    fixture.store.get('flag:10018'),
    undefined,
    '拒读不得写 LASTLOAD_NO',
  );
});

test('夹具镜像整体替换：loadData 成功后变量表换成存档快照（this.era.data = r）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10000', 7);
  fixture.store.set('global:0', 1); // global 不随档走
  const { save_game } = load_page(fixture);
  fixture.set_inputs(3);
  await save_game();

  fixture.store.set('flag:10000', 99); // 存档后值继续变化
  const { load_game } = load_page(fixture);
  fixture.set_inputs(3);

  assert.equal(await load_game(), 'SHOP_AFTER_LOAD');
  assert.equal(
    fixture.store.get('flag:10000'),
    7,
    '读档成功后读的是存档时的值（数据被整体替换）',
  );
  assert.equal(fixture.store.get('global:0'), 1, 'global 表不随档走');
});

// —— #136 返工：指针槽的登记与显式初始化 ——

test('登记检查：10018-10028 十一个槽必须登记进 yml/Flag.yml（防撞号）', () => {
  // Flag.yml 头注的「id 分配约定」靠登记维持：没登记，下一张票不知道这些
  // 槽被占（保留区 10000-10017 是连续登记的先例）。读表文本断言逐槽在场。
  const flag_yml = require('node:fs').readFileSync(
    require('node:path').resolve(__dirname, '../yml/Flag.yml'),
    'utf8',
  );
  for (let slot = 10018; slot <= 10028; slot += 1) {
    assert(
      new RegExp(`^  id: ${slot}$`, 'm').test(flag_yml),
      `flag:${slot} 未登记进 yml/Flag.yml（id 分配约定，防撞号）`,
    );
  }
});
