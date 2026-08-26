/**
 * ere/page/page-save-load.js 的行为测试（issue #136：C2 存读档界面）。
 *
 * 缝 = test/helpers/era-fixture.js。验收项（工单 #136 验收清单第 3 条）：
 * 99 槽 + 分页 + 故事命名（32 字符上限）+ 删除 + 覆盖确认 + 上次存/读档号
 * 高亮，**逐条有测试**；另钉 @SYSTEM_LOADEND 死代码不被接上（#14 登记）。
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

/** 预置一个槽位备注（global:saves:n，引擎维护的存档备注） */
function seed_save(fixture, slot, comment) {
  fixture.store.set(`global:saves:${slot}`, comment);
}

// —— @SYSTEM_LIST_DATA：槽位列表渲染（99 槽基础）——

test('LIST_DATA：存在槽 = 备注按钮，空槽按视角分化（存=灰按钮 / 读=灰文本）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 0, '2026/01/01 00:00:00 第 1日午前 LV   1');
  const { list_data } = load_page(fixture);

  list_data(0, 3, true); // 存档视角
  let entries = buttons(fixture);
  assert.equal(entries.length, 3, '存档视角：空槽也是按钮（原作可对空槽存档）');
  assert.equal(entries[0].accelerator, 0);
  assert.equal(entries[0].text, '2026/01/01 00:00:00 第 1日午前 LV   1');
  assert.equal(entries[0].color, undefined, '无高亮的槽不着色');
  assert.equal(entries[1].accelerator, 1);
  assert.equal(entries[1].text, '----');
  assert.equal(entries[1].color, 'gray', '空槽一律灰色');

  const fixture2 = create_era_fixture();
  seed_save(fixture2, 0, '备注');
  const { list_data: list_data2 } = load_page(fixture2);
  list_data2(0, 2, false); // 读档/删除视角
  const entries2 = buttons(fixture2);
  assert.equal(
    entries2.length,
    1,
    '读/删视角：空槽不可点（原作 CHKDATA 拦下）',
  );
  const gray_text = fixture2.lines.find(
    (line) => line.type === 'text' && line.text === '----',
  );
  assert(gray_text, '空槽渲染为灰色纯文本 ----');
});

test('LIST_DATA：`(FILE LOST) ` 前缀的备注按空槽对待（#147——引擎 loadGlobal 对账约定的消费面）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 0, '正常档');
  seed_save(fixture, 5, '(FILE LOST) 文件丢失的档');
  const { list_data } = load_page(fixture);

  // 读/删视角：带前缀的槽不可点（has_valid_save 的前缀分支——CHKDATA 等价
  // 判据，11-saves.md：`(FILE LOST) ` 前缀 = 有备注但文件丢失）
  list_data(0, 6, false);
  let entries = buttons(fixture);
  assert.equal(entries.length, 1, '丢失槽不出按钮（只剩 0 号正常档可点）');
  assert.equal(entries[0].accelerator, 0);
  assert.equal(entries[0].text, '正常档');
  const gray_slots = fixture.lines.filter(
    (line) => line.type === 'text' && line.text === '----',
  );
  assert.equal(
    gray_slots.length,
    5,
    '四个空槽加一个丢失槽同样渲染 ---- 灰文本',
  );

  // 存档视角：丢失槽照旧是灰按钮（原作对空槽照存，可覆盖）
  const fixture2 = create_era_fixture();
  seed_save(fixture2, 5, '(FILE LOST) 文件丢失的档');
  const { list_data: list_data2 } = load_page(fixture2);
  list_data2(0, 6, true);
  entries = buttons(fixture2);
  assert.equal(entries.length, 6, '存档视角：丢失槽照旧可存');
  assert.equal(entries[5].accelerator, 5);
  assert.equal(entries[5].text, '----');
  assert.equal(
    entries[5].color,
    'gray',
    '(FILE LOST) 前缀的备注按空槽对待（灰）',
  );
});

test('LIST_DATA：末页 99 号位在列表内留空行（单列段归读档界面）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 98, '九八');
  const { list_data } = load_page(fixture);
  const before = fixture.lines.length;
  list_data(95, 100, false); // 末页窗口 [80,100) 的缩影
  // 95-98 渲染四行（1 存在 + 3 空），99 一个空行（println 不进 lines？
  // ——println 是输出调用，进 lines；空行条目形态见夹具）
  const new_lines = fixture.lines.slice(before);
  const slot98 = new_lines.find((line) => line.type === 'button');
  assert.equal(slot98.accelerator, 98, '98 号是最后一个列表槽');
  assert(
    !new_lines.some((line) => line.accelerator === 99),
    '99 号不得在列表里渲染（读档界面单列段专属）',
  );
});

test('LIST_DATA 高亮：LASTLOAD_NO 深天蓝 / LASTSAVE_NO 浅绿，同槽浅绿胜', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '五号');
  seed_save(fixture, 7, '七号');
  seed_save(fixture, 9, '九号');
  fixture.store.set('flag:10018', 5); // LASTLOAD_NO
  fixture.store.set('flag:10019', 7); // LASTSAVE_NO:0
  const { list_data } = load_page(fixture);

  list_data(0, 20, false);
  const by_slot = new Map(buttons(fixture).map((b) => [b.accelerator, b]));
  assert.equal(
    by_slot.get(5).color,
    'deepskyblue',
    '上次读档号高亮 DEEPSKYBLUE',
  );
  assert.equal(by_slot.get(7).color, 'lightgreen', '上次存档号高亮 LIGHTGREEN');

  // 同槽：原作 :307-310 顺序后设覆盖——LIGHTGREEN 压过 DEEPSKYBLUE
  fixture.store.set('flag:10019', 5);
  list_data(0, 20, false);
  const slot5_latest = buttons(fixture)
    .filter((b) => b.accelerator === 5)
    .pop();
  assert.equal(slot5_latest.color, 'lightgreen', '同槽双高亮时后设的浅绿生效');
});

test('未读/未存过档：-1 兜底，任何槽都不高亮（?? 兜底，0 是有效槽号）', () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 0, '零号');
  const { list_data } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.last_load_no, -1, '未读过的初值是 -1 而非 0');
  assert.equal(era_flag.last_save_no, -1);
  list_data(0, 1, false);
  assert.equal(buttons(fixture)[0].color, undefined, '-1 不命中任何槽');
});

// —— @SAVEINFO：存档备注正文 ——

test('SAVEINFO：日期时段/LV/正在调教段/24 空格/故事名逐段拼接', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10000', 0); // DAY:0 = 0 → 第 1 日
  fixture.store.set('flag:10003', 0); // TIME = 0 → 午前
  fixture.store.set('cflag:0:9', 5); // 魔王等级
  fixture.store.set('flag:1', 3); // 前回调教目标
  fixture.store.set('callname:3', '玛奥');
  fixture.store.set('cstr:0:99', '魔王城物语');
  const { build_save_info } = load_page(fixture);

  assert.equal(
    build_save_info(),
    '第 1日午前 LV   5 正在调教:玛奥           『魔王城物语』',
  );
  // 第 1日午前 = 显示宽 10 → 补 1 空格到 11；LV 右对齐宽 4；
  // 「 正在调教:」+ 玛奥（宽 4）左对齐宽 14 → 补 10 空格，再补段尾 1 空格

  // 时段翻转 + 无调教对象（TARGET < 1 → 24 个空格）+ 无故事名
  const fixture2 = create_era_fixture();
  fixture2.store.set('flag:10000', 9); // 第 10 日
  fixture2.store.set('flag:10003', 1); // 午后
  fixture2.store.set('cflag:0:9', 100);
  const { build_save_info: build2 } = load_page(fixture2);
  assert.equal(build2(), '第10日午后 LV 100' + ' '.repeat(24));
});

test('SAVEINFO 副作用：SIF FLAG:1/FLAG:2 >= 0 改写 TARGET/ASSI 指针', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:1', 3);
  fixture.store.set('flag:2', 7);
  const { build_save_info } = load_page(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = -1;
  era_flag.assi = 0;
  build_save_info();
  assert.equal(
    era_flag.target,
    3,
    'TARGET = FLAG:1（前回调教目标，1:1 副作用）',
  );
  assert.equal(era_flag.assi, 7, 'ASSI = FLAG:2');
});

// —— @SYSTEM_SAVEGAME：存档界面 ——

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
    /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} 第 1日午前/,
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
  const { save_game, PAGE_LEN } = load_page(fixture);
  assert.equal(PAGE_LEN, 20, 'SAVENOS() 默认值 20（分页步长）');

  fixture.set_inputs(102, 101, 100);
  assert.equal(await save_game(), 0, '翻页往返后回到首页起点 0');
  const pages = [];
  let current = [];
  for (const b of buttons_history(fixture)) {
    // 每轮重绘从分隔线/标题开始无法从按钮序列直接断轮——用 accelerator 断言：
    if (current.length && b.accelerator <= current[current.length - 1]) {
      pages.push(current);
      current = [];
    }
    current.push(b.accelerator);
  }
  if (current.length) {
    pages.push(current);
  }
  // 轮次：首页(0-19 空槽按钮+200/300+101/100/102) → 翻页后(20-39…) → 回首页
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

  // 首页按 101：无效（原作落出 IF → 无效输入重输），页不动
  const fixture3 = create_era_fixture();
  const { save_game: save3 } = load_page(fixture3);
  fixture3.set_inputs(101, 100);
  await save3();
  const slots3 = buttons_history(fixture3).map((b) => b.accelerator);
  assert(
    slots3.includes(0) && !slots3.includes(20),
    '首页按 上一页 不得离开第 1 页',
  );

  // 末页：从 0 连按 4 次 102 到 80，第 5 次 102 无效（80+20=100 不 < 99）
  const fixture4 = create_era_fixture();
  const { save_game: save4 } = load_page(fixture4);
  fixture4.set_inputs(102, 102, 102, 102, 102, 100);
  await save4();
  const slots4 = buttons_history(fixture4).map((b) => b.accelerator);
  assert(slots4.includes(80), '连翻四页到 80 起（末页）');
  assert(!slots4.includes(99), '末页列表不含 99 号（100 是返回按钮，非槽号）');
});

test('SAVEGAME 标题行：故事名有无两态（原作 :102-108 拼接，含【保存存档】前缀）', async () => {
  const fixture = create_era_fixture();
  const { save_game } = load_page(fixture);
  fixture.set_inputs(100);
  await save_game();
  // 前缀「【保存存档】」原作 :102 PRINT，#161 范围 B 对拍查出首版漏抄、已补
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

test('故事命名：超过 32 字符存储截断、显示保留原串（原作 :201-203）', async () => {
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
    '反馈行显示未截断的原串（原作如此）',
  );
});

test('故事命名：空输入经引擎归一成 0；原作消名分支真机不可达（#151 勘误）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('cstr:0:99', '旧名');
  const { save_game } = load_page(fixture);
  // 预置 '' 保留：它是钉住「夹具放行空输入」这一形态的活判据（引擎
  // 渲染层 returnFromInput 对非 any 输入有非空守卫——app.vue 原始源码
  // `if (!inputParam.value['any'] && !inputParam.value['val']) return`，
  // 空输入根本不会送达主进程；#130 的白名单镜像未含这条空守卫）。
  // 主进程侧 getNumber('') === 0（#151），String 化得 '0'——真机上玩家
  // 的空输入要么被渲染层拦下，要么归一成 0，原作 :207-209 的「空输入＝
  // 消名」在 EraElectron 上不可达（消名功能已随引擎换代失效，登记 #151）
  fixture.set_inputs(200, '', 100);
  await save_game();
  assert.equal(
    fixture.store.get('cstr:0:99'),
    '0',
    '空输入按引擎主进程语义归一成 0、String 化为 "0" 入库',
  );
  assert(
    history_texts(fixture).some((t) => t === '将故事命名为『0』'),
    '空输入走到命名分支（不再是消名）',
  );
  assert(
    !history_texts(fixture).some((t) => t === '消去了故事的名字'),
    '消名分支不可达（真机同此——渲染层空守卫 + getNumber("")===0）',
  );
  assert(
    history_texts(fixture).some((t) => t.includes('（旧名）')),
    '命名提示行带现名（原作 PRINTBUTTON 的预填降级为文本提示）',
  );
  assert(
    history_texts(fixture).some((t) => t.includes('请输入一个名称故事：')),
    '原作 :193 文案（含语序）1:1',
  );
});

// —— @SYSTEM_DELDATA：删除存档 ——

test('DELDATA：确认后删档（rmData），取消不删', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '五号');
  const { del_data } = load_page(fixture);

  fixture.set_inputs(5, 1, 100);
  assert.equal(await del_data(0), 0);
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
  const { del_data: del2 } = load_page(fixture2);
  fixture2.set_inputs(5, 0, 100);
  await del2(0);
  assert(!fixture2.calls.some((c) => c.api === 'rmData'), '取消时不得删除');
});

test('DELDATA：页起点参数默认归 0，返回离开时的页起点', async () => {
  const fixture = create_era_fixture();
  const { del_data } = load_page(fixture);
  fixture.set_inputs(100);
  assert.equal(await del_data(-1), 0, '默认 -1 → 归 0');
  assert(
    history_texts(fixture).some(
      (t) => t === '【删除存档】要删除以下哪个存档？',
    ),
  );
});

test('SAVEGAME 的 [300]：进删除子界面并带回新页起点', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 5, '五号');
  const { save_game } = load_page(fixture);
  fixture.set_inputs(300, 5, 1, 100, 100);
  assert.equal(await save_game(), 0);
  assert(
    fixture.calls.some((c) => c.api === 'rmData' && c.args[0] === 5),
    '经存档界面的 [300] 也能完成删除',
  );
});

// —— @SYSTEM_LOADGAME：读档界面 ——

test('LOADGAME：99 号自动存档槽单列渲染，LASTLOAD_NO==99 时深天蓝', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 99, '自动档备注');
  const { load_game } = load_page(fixture);
  fixture.set_inputs(100);
  await load_game();
  const slot99 = buttons_history(fixture).find((b) => b.accelerator === 99);
  assert(slot99, '99 号槽必须渲染成按钮');
  assert.equal(slot99.text, '自动档备注');
  assert.equal(slot99.color, undefined, '未读 99 号时不高亮');

  const fixture2 = create_era_fixture();
  seed_save(fixture2, 99, '自动档备注');
  fixture2.store.set('flag:10018', 99);
  const { load_game: load2 } = load_page(fixture2);
  fixture2.set_inputs(100);
  await load2();
  assert.equal(
    buttons_history(fixture2).find((b) => b.accelerator === 99).color,
    'deepskyblue',
    'SIF 99 == LASTLOAD_NO → DEEPSKYBLUE（原作 :27-28）',
  );
});

test('LOADGAME：99 号槽无存档时不渲染槽行（原作 :32-34 只剩一条线）', async () => {
  const fixture = create_era_fixture();
  const { load_game } = load_page(fixture);
  fixture.set_inputs(100);
  await load_game();
  assert(
    !buttons_history(fixture).some((b) => b.accelerator === 99),
    '空 99 号不得出现按钮',
  );
});

test('LOADGAME：读档成功 → LASTLOAD_NO 自写入 + EX_FLAG:2801 钳到 10 + 转场', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  fixture.store.set('exflag:2801', 5); // 一周目主线 < 10
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true; // 引擎读档成功（SDK 可变对象）
  fixture.set_inputs(3);

  // #137 起 LOADDATA 的转场语义落地：读档成功不再返回（原断言
  // `assert.equal(await load_game(), 0)` 把「回调用方」的错误行为固化成了
  // 断言——实机上玩家读完档无路可走，#136 实机验收撞出、#137 评论移交。
  // 改锚「去了哪个状态」：SHOP_AFTER_LOAD = 进 SHOP 且不执行 @EVENTSHOP
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );
  await assert.rejects(
    () => load_game(),
    (e) => e instanceof BeginSignal && e.state === STATE.SHOP_AFTER_LOAD,
    '读档成功必须以转场信号离开（LOADDATA 与 BEGIN 并列，system-flow.md:26）',
  );
  // LASTLOAD_NO 与钳制在转场抛出前完成（:74-75 先于迁移）
  assert.equal(fixture.store.get('flag:10018'), 3, 'LASTLOAD_NO = 本次槽号');
  assert.equal(fixture.store.get('exflag:2801'), 10, 'EX_FLAG:2801 < 10 → 10');
  assert(
    fixture.var_writes.some((w) => w.name === 'flag:10018' && w.value === 3),
    'LASTLOAD_NO 的写入要落到 flag:10018',
  );
});

test('LOADGAME：EX_FLAG:2801 已 >= 10 时不钳制（原作 SIF 判据）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  fixture.store.set('exflag:2801', 15);
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);
  await assert.rejects(() => load_game(), /BEGIN/);
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

test('LOADGAME 读档界面标题与操作行形态（1:1 文案）', async () => {
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

test('反向钉：读档成功路径不出现 @SYSTEM_LOADEND 的「兼容性修正中……」', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);
  await assert.rejects(() => load_game(), /BEGIN/);
  assert(
    !history_texts(fixture).some((t) => t.includes('兼容性修正中')),
    '@SYSTEM_LOADEND 是死代码（零调用者 + 非保留名，#14 登记），不得被顺手接上',
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

  await assert.rejects(() => load_game(), /BEGIN/);
  assert.equal(probe_calls, 1, '读档成功必须 emit EVENTLOAD 链一次');
  // 钩子的 DATA_FIX 等价物也跑了（魔王标识写入——角色 0 虽不在场，钩子
  // 对 getAddedCharacters 循环，空列表零写入；探针即「被调用」的判据）
});

test('钩子副作用：DATA_FIX 三行对新档有语义的行在读档后被重放', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(17, { id: 17, name: '琼', callname: '琼' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(17);
  // 读入的存档带着被剧情压低的上限（EVENT_ADDICT.ERB:160-172 的写点产物）
  fixture.store.set('maxbase:0:0', 550);
  fixture.store.set('maxbase:0:1', 90);
  fixture.store.set('maxbase:17:0', 1200); // 高于下限：不动
  fixture.store.set('maxbase:17:1', 100); // 恰好等于下限：不动
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);

  await assert.rejects(() => load_game(), /BEGIN/);
  assert.equal(
    fixture.store.get('ex_talent:0:200'),
    1,
    'EX_TALENT:MASTER:200 = 1（魔王高贵标识，DATA_FIX 170205 段）',
  );
  assert.equal(fixture.store.get('ex_talent:17:200'), undefined, '只写 MASTER');
  assert.equal(fixture.store.get('maxbase:0:0'), 600, 'MAXBASE:0 < 600 → 600');
  assert.equal(fixture.store.get('maxbase:0:1'), 100, 'MAXBASE:1 < 100 → 100');
  assert.equal(
    fixture.store.get('maxbase:17:0'),
    1200,
    '已高于下限的角色不动（SIF 判据）',
  );
  assert.equal(fixture.store.get('maxbase:17:1'), 100, '恰等于下限不动');
});

test('钩子存根：CHARA_NAME_INIT / EX_TALENTNAME_INIT 打占位行（#105 决议，不落地）', async () => {
  const fixture = create_era_fixture();
  seed_save(fixture, 3, '三号档');
  const { load_game } = load_page(fixture);
  fixture.era.loadData = async () => true;
  fixture.set_inputs(3);

  await assert.rejects(() => load_game(), /BEGIN/);
  const texts = history_texts(fixture);
  assert(
    texts.some((t) => t.includes('CHARA_NAME_INIT')),
    '角色名初始化的存根占位行必须在读档路径出现',
  );
  assert(
    texts.some((t) => t.includes('EX_TALENTNAME_INIT')),
    'EX素质名初始化的存根占位行必须在读档路径出现',
  );
});

test('夹具镜像版本闸门：低版本存档 loadData 拒读，不转场、数据不被替换', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10000', 7); // DAY:0 = 7 → 存档快照里是 7
  const { save_game, load_game } = load_page(fixture);
  fixture.set_inputs(3);
  await save_game(); // 以 current_version = 1 存进 3 号槽

  fixture.store.set('flag:10000', 99); // 存档后继续游戏（DAY 变 99）
  fixture.save_gate.allow_version = 2; // 抬最低支持版本 → 3 号档成旧档
  fixture.set_inputs(3, 100);
  // 拒读：留在读档界面（3 落到无效输入重绘），100 返回。outcome 形态收
  // 结果：拒读路径正常返回 0；变异拆掉夹具闸门时 loadData 意外成功、
  // load_game 抛 BeginSignal，outcome 是 Error ≠ 0——本断言先红（M258 锚）
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
  fixture.store.set('global:99', 1); // global 不随档走
  const { save_game } = load_page(fixture);
  fixture.set_inputs(3);
  await save_game();

  fixture.store.set('flag:10000', 99); // 存档后漂移
  const { load_game } = load_page(fixture);
  fixture.set_inputs(3);

  await assert.rejects(() => load_game(), /BEGIN/);
  assert.equal(
    fixture.store.get('flag:10000'),
    7,
    '读档成功后读的是存档时的值（数据被整体替换）',
  );
  assert.equal(fixture.store.get('global:99'), 1, 'global 表不随档走');
});

// —— #136 返工：指针槽的登记与显式初始化 ——

test('登记锚：10018-10028 十一个槽必须登记进 yml/Flag.yml（防撞号）', () => {
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
