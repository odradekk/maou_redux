/**
 * @file 存读档界面：读档（@SYSTEM_LOADGAME）/ 存档（@SYSTEM_SAVEGAME）/
 * 删除（@SYSTEM_DELDATA）/ 槽位列表（@SYSTEM_LIST_DATA）+ 存档备注文本
 * （@SAVEINFO）的 1:1 移植（issue #136）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM_DATA.ERB  @SYSTEM_LOADGAME（:5-83）/
 *     @SYSTEM_SAVEGAME（:88-213）/ @SYSTEM_DELDATA（:220-292）/
 *     @SYSTEM_LIST_DATA（:297-323）
 *     target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @SAVEINFO（:954-977）
 *     target/ERB/其他/VARIABLES.ERB:16  LASTSAVE_NO（10 元数组的声明）
 *
 * @SYSTEM_LOADEND（SYSTEM_DATA.ERB:328-469，142 行）**不移植**：全库静态搜索
 * 零调用者，且它不是 Emuera 保留名（保留名 @SYSTEM_TITLE / @TITLE_LOADGAME
 * / @SYSTEM_AUTOSAVE / @EVENTLOAD 等，技能 system-flow.md「主要系统函数一览」）
 * ——死代码，登记 #14；「不要顺手接上」由 test/page-save-load.test.js 的反向
 * 钉与变异条目 M232 守住。
 *
 * 原作 → ere 的引擎映射（本文件全部语义依据集中在此）：
 *   - SAVENOS()（分页步长）→ 常量 PAGE_LEN = 20。它是 Emuera 的
 *     「表示するセーブデータ数」配置项（默认 20，技能 data-save-load.md），
 *     ere 引擎无此配置，取其默认值为常量；
 *   - CHKDATA n（RESULT==0 = 可加载，RESULTS = 备注）→
 *     era.get(`global:saves:${n}`)：非 undefined 且不以 `(FILE LOST) ` 开头
 *     即存在（dev-guides/11-saves.md 的备注语义；code/version 闸门归
 *     loadData 运行时校验，读侧不预判）；
 *   - SAVEDATA n, text → era.saveData(n, text)；LOADDATA n → era.loadData(n)
 *     （Boolean）；DELDATA n → era.rmData(n)；SAVEGLOBAL → 引擎在
 *     saveData/rmData 后自动调（11-saves.md），显式调用省略；
 *   - LASTLOAD_NO（Emuera 内建只读）→ era_flag.last_load_no（flag:10018，
 *     读档成功后自写入——原作由引擎在 LOADDATA 时设置，随存档保存）；
 *   - LASTSAVE_NO（10 元数组，VARIABLES.ERH:16，随存档保存）→
 *     flag:10019..10028（[0] 走 era_flag.last_save_no，[1..9] 直写；
 *     @SYSTEM_LIST_DATA 的高亮比较只读 [0]，原作裸名比较即如此）；
 *   - CSTR:MASTER:99（故事名）→ chara(0).system.故事名（门面访问器，
 *     cstr:0:99——ownership 属主 system；yml/CStr.yml 是空表（零条目），
 *     引擎对未登记下标原样回落数字寻址，可写可存；**不要**往该表补
 *     「故事名: 99」——登记进名字表的下标会被 addCharacter 的
 *     initCharaTable 预置 0，行为随之改变（简报事实 3 / #136）；门面命名
 *     是代码层动作（tools/facade-names.js），不碰 yml）；
 *   - SAVESTR:TARGET（@SAVEINFO 的调教对象名）→ callname:${target}
 *     （#5 决议：SAVESTR 的名字承载归内置 callname）；
 *   - GETTIMES() → get_times()（`YYYY/MM/DD HH:MM:SS`，技能
 *     in-expression-functions.md）；
 *   - SAVEDATA_TEXT + PUTFORM → 局部字符串拼接（Emuera 的存档备注暂存
 *     变量，ere 无对应）。
 *
 * 界面形态说明（有意偏离，均注明依据）：
 *   - 原作槽位行是 PRINTFORM 文本 `[N] 备注`，Emuera 把 `[数字]` 文本自动
 *     升格为可点按钮；ere 引擎的 input() 只送达 printButton 的快捷键，故
 *     存在槽一律 printButton（正文=备注，编号前缀由引擎 showAcc 拼）。
 *     编号宽度 `{L_I,2}`（右对齐宽 2）无引擎对应——`[N]` 的拼法归渲染层。
 *   - 空槽的可达性按界面分化：存档界面空槽是**灰色按钮**（原作 CASE 0 TO 98
 *     对空槽照存，键盘数字在 ere 引擎不可达，必须按钮化）；读档/删除界面
 *     空槽是灰色纯文本（原作 CHKDATA 拦下 = 无效输入，不可选即等价）。
 *   - PRINTFORMLC（同行分列按钮）→ printMultiColumns；`[1] 确定 [0] 取消`
 *     一行两选项同款。
 *   - INPUT 的参数是**默认值**（`INPUT 99` = 空回车得 99、`INPUT 0` = 空回车
 *     得 0，技能 input.md），ere 的 input() 无默认值参数——空回车快捷语义
 *     丢失（引擎能力差异，点击/键入不受影响）。
 *   - REDRAW/CLEARLINE → 本文件用「入口锚点 + clear(跨度)」就地重绘
 *     （原作 L_LINECOUNT = LINECOUNT → CLEARLINE LINECOUNT - L_LINECOUNT 的
 *     习语，ScreenBlock 同源）。原作无效输入只 CLEARLINE 1 不重画，ere 统一
 *     整屏重绘（page-select-target 先例：ere 控制台是滚动视图）。
 *   - 故事命名（$SET_NAME）：INPUTS 前先 clear 回锚点——引擎在屏幕有按钮时
 *     拒收非按钮输入（dev-guides/05-interaction.md:144），文本输入必须先把
 *     列表按钮清掉（erauma 12-sl 改名段同款姿势）；原作 Emuera 的 INPUTS 无
 *     此限制，且原作命名后不清行（:212 被注释）直接堆叠重画，ere 侧清掉
 *     后由 DRAW_PAGE 重画，等价（反馈行经 waitAnyKey 读键，可见性不损失）。
 *   - PRINTBUTTON（现名, CSTR:MASTER:99）（点击把现名预填进输入框）→ 纯
 *     文本 `（现名）` 提示：ere 引擎无「按钮点击预填输入框」能力。
 *   - @EVENTLOAD（SYSTEM ver1.0.3.ERB:760-778，读档后引擎回调）**自 #137
 *     起由 ere/event/event-load.js 承载**（本文件 require 装配，emit 点在
 *     load_game 的成功分支）：LOADGLOBAL 是 ere 引擎行为（global 表在内存、
 *     读档不动它）；名字初始化两调用是既有存根（#105 决议）；LASTLOAD_NO
 *     == 999 → MAOUNET 与 1000–1020 → INPORT_B 是跨作品数据交换（ere 读档
 *     界面只放行 0-99，不可达，登记 docs/stub-registry.md，归通信票）；
 *     DATA_FIX 历史补丁体由 ADR-0006 判不移植，三处对新档有语义的行经
 *     #137 逐条判定后归钩子等价落地（判定依据见 event-load.js 文件头）。
 *   - LOADDATA 的**转场语义**（#137，SYSTEM_DATA.ERB:71 注释「実行後、
 *     @EVENTLOADへ遷移」）：读档成功后不回调用方（标题的 RESTART、据点的
 *     循环重绘都不再走），而是 emit EVENTLOAD 链后转场进 SHOP——且**不执行
 *     @EVENTSHOP**（技能 system-flow.md:51-53），以 STATE.SHOP_AFTER_LOAD
 *     承载（begin-signal.js 的本地扩展）。引擎拒读（loadData false）时不
 *     转场：留在读档界面重绘（#136 已有行为，1:1 对应原作 CHKDATA 拦下）。
 */

const era = require('#/era-electron');
// @EVENTLOAD 钩子的注册模块（#137）：emit 点在本文件 load_game 的成功
// 分支，require 即装配（on 注册在模块顶层）——与 page-shop.js 的
// @EVENTSHOP 同构（注册与 emit 同侧装配，测试不依赖 main-loop 的清单）
require('#/event/event-load');
const { emit } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');

/**
 * 分页步长：原作 SAVENOS()（「表示するセーブデータ数」配置）的默认值 20。
 * 99 槽按 20/页 → 5 页（0/20/40/60/80），末页渲染 80–98 加一个空行。
 */
const PAGE_LEN = 20;

/** 自动存档槽号（读档界面单列渲染，ADR-0006：占用原作的遗留空位）。 */
const AUTOSAVE_SLOT = 99;

/**
 * CHKDATA RESULT==0 的等价判据：槽位有有效备注（11-saves.md——undefined =
 * 空槽，`(FILE LOST) ` 前缀 = 有备注但文件丢失）。
 * @param {string|undefined} comment 槽位备注
 * @returns {boolean} 该槽存在可读存档
 */
function has_valid_save(comment) {
  return comment !== undefined && !comment.startsWith('(FILE LOST) ');
}

/**
 * 显示宽度（全角 2 / 半角 1）。原作 PUTFORM 的 %str,width% 与 {n,width,RIGHT}
 * 按半角列宽对齐（Emuera 显示宽度），此处同口径计算填充。
 * @param {string} s
 * @returns {number}
 */
function display_width(s) {
  return [...s].reduce(
    (width, ch) => width + (ch.charCodeAt(0) > 0xff ? 2 : 1),
    0,
  );
}

/**
 * 左对齐补空格到指定显示宽度（%str,width% 无第三参的形态）。
 * @param {string} s
 * @param {number} width
 * @returns {string}
 */
function pad_display_left(s, width) {
  const pad = width - display_width(s);
  return pad > 0 ? s + ' '.repeat(pad) : s;
}

/**
 * 右对齐补空格到指定显示宽度（{n,width,RIGHT} / %str,width,RIGHT% 的形态）。
 * @param {string} s
 * @param {number} width
 * @returns {string}
 */
function pad_display_right(s, width) {
  const pad = width - display_width(s);
  return pad > 0 ? ' '.repeat(pad) + s : s;
}

/**
 * GETTIMES()：当前系统时间字符串（`YYYY/MM/DD HH:MM:SS`）。
 * @returns {string}
 */
function get_times() {
  const now = new Date();
  const p2 = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}/${p2(now.getMonth() + 1)}/${p2(now.getDate())} ${p2(now.getHours())}:${p2(now.getMinutes())}:${p2(now.getSeconds())}`;
}

/**
 * @SYSTEM_LIST_DATA（SYSTEM_DATA.ERB:297-323）：渲染槽位列表 [start, end)。
 *
 * 高亮（:307-310，后者覆盖前者——SETCOLORBYNAME 的顺序语义）：槽号 ==
 * LASTLOAD_NO → deepskyblue；槽号 == LASTSAVE_NO（裸名 = [0]）→ lightgreen。
 * 空槽一律灰色（:316 的 GRAY 覆盖先设的高亮色）。
 *
 * @param {number} start 起始槽号（L_POS）
 * @param {number} end 排他上限（L_POS + L_LEN）
 * @param {boolean} empty_clickable 空槽是否渲染为按钮——存档界面 true
 *   （原作对空槽照存），读档/删除界面 false（原作 CHKDATA 拦下）
 */
function list_data(start, end, empty_clickable) {
  for (let i = start; i < end; i += 1) {
    if (i >= AUTOSAVE_SLOT) {
      // :302-304 PRINTL（空行）CONTINUE——末页的 99 号位在列表里留空，
      // 由读档界面的单列段渲染
      era.println();
      continue;
    }
    let color;
    // :307-308 SIF L_I == LASTLOAD_NO → DEEPSKYBLUE
    if (i === era_flag.last_load_no) {
      color = 'deepskyblue';
    }
    // :309-310 SIF L_I == LASTSAVE_NO → LIGHTGREEN（后设覆盖前者）
    if (i === era_flag.last_save_no) {
      color = 'lightgreen';
    }
    const comment = era.get(`global:saves:${i}`);
    if (has_valid_save(comment)) {
      // :313-314 PRINTFORML  [{L_I,2}] %RESULTS%（存在槽一律按钮，见文件头）
      era.printButton(comment, i, color ? { color } : undefined);
    } else if (empty_clickable) {
      // 存档界面的空槽：灰色按钮（正文 `----` 对应 :317；编号归引擎拼）
      era.printButton('----', i, { color: 'gray' });
    } else {
      // :316-318 SETCOLORBYNAME GRAY → [{L_I,2}] ----（读/删视角不可选）
      era.print([{ content: '----', color: 'gray' }]);
    }
  }
}

/**
 * 翻页/操作按钮行（:36-39 / :114-119 的 PRINTFORMLC → printMultiColumns）。
 *
 * @param {...{accelerator: number, content: string}} items 同行各列
 */
function print_page_buttons(...items) {
  era.printMultiColumns(
    items.map((item) => ({
      accelerator: item.accelerator,
      config: { align: 'left', width: 12 },
      content: item.content,
      type: 'button',
    })),
  );
}

/**
 * ARRAYSHIFT LASTSAVE_NO, 1, idx（:186）：整体后移一位、[0] = idx、末位丢弃。
 * @param {number} idx 本次保存的槽号
 */
function push_last_save_no(idx) {
  // [1..9] 的历史元素直写（↔ LASTSAVE_NO:1..9，随存档保存；包装层只暴露
  // [0]——原作唯一被消费的元素）
  for (let i = 9; i > 0; i -= 1) {
    era.set(`flag:${10019 + i}`, era.get(`flag:${10019 + i - 1}`) ?? -1);
  }
  era_flag.last_save_no = idx;
}

/**
 * @SAVEINFO（SYSTEM ver1.0.3.ERB:954-977）：拼存档备注的正文段。
 *
 * 段式（宽度均为 Emuera 的半角显示宽）：
 *   `第N日午前/午后`（宽 11 左对齐）→ `LV等级`（右对齐宽 4）→
 *   TARGET >= 1 时 ` 正在调教:名字 `（名字左对齐宽 14）否则 24 个空格 →
 *   有故事名时追加 `『故事名』`。
 *
 * 原作的副作用 1:1 保留（:959-963）：SIF FLAG:1 >= 0 → TARGET = FLAG:1、
 * SIF FLAG:2 >= 0 → ASSI = FLAG:2——@SAVEINFO 会把指针改写成「前回调教
 * 目标/助手」（Emuera 的 FLAG 零值 0 恒 >= 0，新档上等于把指针归零）。
 *
 * @returns {string} 备注正文（不含时间戳前缀）
 */
function build_save_info() {
  // :955-958 IF TIME == 0 → 第{DAY+1,2}日午前 ELSE 第{DAY+1,2}日午后；
  // %LOCALS,11%（宽 11 左对齐）
  const day_half = era_flag.time === 0 ? '午前' : '午后';
  let text = pad_display_left(
    `第${pad_display_right(String(era_flag.day_count + 1), 2)}日${day_half}`,
    11,
  );
  // :960-963 指针改写副作用（见函数头注释）
  if ((era.get('flag:1') || 0) >= 0) {
    era_flag.target = era.get('flag:1') || 0;
  }
  if ((era.get('flag:2') || 0) >= 0) {
    era_flag.assi = era.get('flag:2') || 0;
  }
  // :966 PUTFORM LV{CFLAG:MASTER:9,4,RIGHT}（魔王等级，右对齐宽 4）
  text += `LV${pad_display_right(String(era.get('cflag:0:9') || 0), 4)}`;
  // :968-972 TARGET >= 1 → ` 正在调教:%SAVESTR:TARGET,14,LEFT% `（首尾各一
  // 半角空格）；ELSE → %"",24%（24 个空格）
  if (era_flag.target >= 1) {
    // SAVESTR:TARGET → callname（#5 决议，见文件头映射表）
    const target_name = String(era.get(`callname:${era_flag.target}`) ?? '');
    text += ` 正在调教:${pad_display_left(target_name, 14)} `;
  } else {
    text += ' '.repeat(24);
  }
  // :974-975 SIF STRLENS(CSTR:MASTER:99) > 0 → 『%CSTR:MASTER:99%』
  const story = chara(0).system.故事名;
  if (story.length > 0) {
    text += `『${story}』`;
  }
  return text;
}

/**
 * $SET_NAME（:149-152 入口 / :192-213 本体）：故事命名。
 *
 * @param {number} anchor 本界面的入口锚点（clear 回它＝清掉列表与按钮）
 */
async function set_story_name(anchor) {
  // 清掉列表按钮：引擎在屏幕有按钮时拒收非按钮输入（05-interaction.md:144），
  // 文本输入前必须清屏（erauma 12-sl 改名段同款；原作 INPUTS 无此限制，
  // 见文件头「界面形态说明」）
  await era.clear(era.getLineCount() - anchor);
  // :151 CASE 200 的 DRAWLINE
  era.drawLine();
  // :193 PRINTFORM 请输入一个名称故事：（原作文案即此语序，1:1 保留）
  era.print('请输入一个名称故事：');
  const current = chara(0).system.故事名;
  if (current.length > 0) {
    // :194-197 现名提示。原作 PRINTBUTTON（现名）点击可预填输入框；ere 无
    // 该能力（引擎渲染层无此变换），降为纯文本提示
    era.print(`（${current}）`);
  }
  era.println(); // :198 PRINTL
  // :200 INPUTS——era.input() 会把可数值化的输入转 Number，String 化收文本
  const raw = await era.input();
  const name = String(raw ?? '');
  if (name.length > 32) {
    // :201-203 存储截断到 32 字符，**显示原串**（原作如此——CSTR 存
    // SUBSTRING(RESULTS,0,32)，PRINTFORMW 打印的是未截断的 RESULTS）
    chara(0).system.故事名 = name.substring(0, 32);
    era.print(`将故事命名为『${name}』`);
    await era.waitAnyKey();
  } else if (name.length > 0) {
    // :204-206
    chara(0).system.故事名 = name;
    era.print(`将故事命名为『${name}』`);
    await era.waitAnyKey();
  } else {
    // :207-209 空输入 = 消名
    chara(0).system.故事名 = '';
    era.print('消去了故事的名字');
    await era.waitAnyKey();
  }
  // :213 GOTO DRAW_PAGE（调用方循环尾清行重画）
}

/**
 * @SYSTEM_LOADGAME（SYSTEM_DATA.ERB:5-83）：读档界面。
 *
 * 列表 + 99 号自动存档槽单列段 + 翻页行；读档成功后：@SYSTEM_LOADGAME
 * 自己的 :74-75（EX_FLAG:2801 钳制 + LASTLOAD_NO 自写入）→ @EVENTLOAD
 * 链（ere/event/event-load.js）→ 转场进 SHOP（LOADDATA 的引擎语义，见
 * 文件头）。**读档成功后本函数不再返回**（begin 只 throw）——原作
 * `RETURN L_POS`（:76）与标题的 RESTART 都在「没读成」的世界里，ere 侧
 * 返回值只在 [100] 返回分支产生。
 *
 * @returns {Promise<number>} [100] 返回时的页起点（原作 RETURN L_POS）
 * @throws {BeginSignal} 读档成功：转场进 STATE.SHOP_AFTER_LOAD
 */
async function load_game() {
  let pos = 0; // #DIM L_POS（Emuera 局部零值；:12 的 < 0 归一不触发）
  const anchor = era.getLineCount(); // :14 L_LINECOUNT = LINECOUNT

  // $DRAW_PAGE
  for (;;) {
    era.drawLine({ isSolid: true }); // :18 CUSTOMDRAWLINE =
    era.print('【读取存档】要载入以下哪个存档？'); // :19
    era.drawLine(); // :20
    list_data(pos, pos + PAGE_LEN, false); // :22

    // :24-34 99 号槽（自动存档位）单列渲染：存在 → 分隔线夹槽行（高亮判据
    // LASTLOAD_NO == 99）；不存在 → 只一条分隔线（连 ---- 行都没有）
    era.drawLine();
    const comment99 = era.get(`global:saves:${AUTOSAVE_SLOT}`);
    if (has_valid_save(comment99)) {
      era.printButton(
        comment99,
        AUTOSAVE_SLOT,
        era_flag.last_load_no === AUTOSAVE_SLOT
          ? { color: 'deepskyblue' }
          : undefined,
      );
      era.drawLine();
    }

    // :36-39 [101] 上一页 / [100] 返回 / [102] 下一页 + PRINTL
    print_page_buttons(
      { accelerator: 101, content: '上一页' },
      { accelerator: 100, content: '返回' },
      { accelerator: 102, content: '下一页' },
    );
    era.println();

    // :43 INPUT 99（99 是默认值——空回车得 99；ere 无默认值参数，见文件头）
    const result = await era.input();

    if (result === 100) {
      // :48-49 返回
      return pos;
    }
    if (result === 101 && pos - PAGE_LEN >= 0) {
      // :51-57 上一页
      pos -= PAGE_LEN;
    } else if (result === 102 && pos + PAGE_LEN < 99) {
      // :59-65 下一页（< 99：末页 80 起时 80+20=100 不再翻）
      pos += PAGE_LEN;
    } else if (
      result >= 0 &&
      result <= 99 &&
      has_valid_save(era.get(`global:saves:${result}`))
    ) {
      // :67-77 范围内且存在 → 读档
      // :73 LOADDATA：ere 等价 era.loadData（Boolean）。引擎拒读时返回
      // false（如版本闸门），**不转场**——落到循环尾清行重绘，留在读档
      // 界面（原作无此分支：CHKDATA 通过后 LOADDATA 失败由 Emuera 弹错
      // 终止；ere 侧 false 不吞不炸，1:1 对应 CHKDATA 拦下的等输入路径）
      if (await era.loadData(result)) {
        // :74-75 SIF EX_FLAG:2801 < 10 → 10（读入后的值上钳制；EX_FLAG:2801
        // = 一周目主线截止，包装层名 first_run_deadline）
        if (era_exflag.first_run_deadline < 10) {
          era_exflag.first_run_deadline = 10;
        }
        // LASTLOAD_NO：原作由引擎在 LOADDATA 时设置；ere 自写入（写进
        // 读入后的数据，随下一次存档带走——与原作同序）
        era_flag.last_load_no = result;
        // @EVENTLOAD 链（原作 LOADDATA 后迁移的保留名回调，ere/event/
        // event-load.js）。链内 BEGIN 的暂存值覆盖缺省转场目标——原作
        // :769-771 的 BEGIN SHOP（显式、会跑 @EVENTSHOP）与隐式进入 SHOP
        // 的区分在 ere 侧即此缺省值与覆盖值之差（begin-signal.js）
        const next = (await emit('EVENTLOAD')) ?? STATE.SHOP_AFTER_LOAD;
        // LOADDATA 的转场语义（SYSTEM_DATA.ERB:71 注释「実行後、
        // @EVENTLOADへ遷移」）：不回调用方（标题的 RESTART、据点的循环
        // 重绘都不再走），进 SHOP 且不执行 @EVENTSHOP。begin 只 throw
        // 不返回——原作 RETURN L_POS（:76）在迁移发生后不回调用方，ere
        // 侧以「成功分支无返回」1:1 对应
        begin(next);
      }
    }
    // :80-82 无效输入（CLEARLINE 1 重输）与翻页失败：统一清行重画（先例
    // page-select-target，见文件头）
    await era.clear(era.getLineCount() - anchor);
  }
}

/**
 * @SYSTEM_SAVEGAME（SYSTEM_DATA.ERB:88-213）：存档界面。
 *
 * @returns {Promise<number>} 离开时的页起点（原作 RETURN L_POS）
 */
async function save_game() {
  let pos = 0;
  const anchor = era.getLineCount();

  // $DRAW_PAGE
  for (;;) {
    era.drawLine({ isSolid: true }); // :101 CUSTOMDRAWLINE =
    // :102-108 标题（故事名拼接；PRINT 不带行尾，两段拼同一行——ere 的
    // print 独占一行，一次拼完再输出，两行布局等效）
    const story = chara(0).system.故事名;
    if (story.length > 0) {
      era.print(`当前的故事名为『${story}』，要保存到以下哪个存档？`);
    } else {
      era.print('当前故事还没有名字，要保存到以下哪个存档？');
    }
    era.drawLine(); // :109
    list_data(pos, pos + PAGE_LEN, true); // :111（空槽也按钮，见文件头）

    era.drawLine(); // :113
    // :114-116 [200] 为故事命名 / [300] 删除存档
    print_page_buttons(
      { accelerator: 200, content: '为故事命名' },
      { accelerator: 300, content: '删除存档' },
    );
    era.println();
    // :117-120 [101] 上一页 / [100] 返回 / [102] 下一页
    print_page_buttons(
      { accelerator: 101, content: '上一页' },
      { accelerator: 100, content: '返回' },
      { accelerator: 102, content: '下一页' },
    );
    era.println();

    // :124 INPUT（无默认值）
    const result = await era.input();

    if (result === 100) {
      // :129-130 返回
      return pos;
    }
    if (result === 101 && pos - PAGE_LEN >= 0) {
      // :132-138
      pos -= PAGE_LEN;
    } else if (result === 102 && pos + PAGE_LEN < 99) {
      // :140-146
      pos += PAGE_LEN;
    } else if (result === 200) {
      // :148-152 为故事命名（内部自管清行，返回后回 DRAW_PAGE）
      await set_story_name(anchor);
    } else if (result === 300) {
      // :154-159 删除存档：子界面带走当前页起点，返回新起点（子界面的
      // 输出行留屏，由本循环尾的清行一并收走——原作同构）
      pos = await del_data(pos);
    } else if (result >= 0 && result <= 98) {
      // :161-174 槽位（0-98，不含自动存档位）：存在 → 覆盖确认
      const comment = era.get(`global:saves:${result}`);
      if (has_valid_save(comment)) {
        // :165-166
        era.print('存档已经存在，确定要覆盖么？');
        // :166 [1] 确定    [0] 取消（一行两选项；INPUT 0 的默认值 0 =
        // 空回车取消，ere 无默认值参数，见文件头）
        print_page_buttons(
          { accelerator: 1, content: '确定' },
          { accelerator: 0, content: '取消' },
        );
        const confirm = await era.input();
        if (confirm !== 1) {
          // :168-171 取消 → 清行回 DRAW_PAGE
          await era.clear(era.getLineCount() - anchor);
          continue;
        }
      }
      // $SAVE_GAME（:181-190）
      // :182-184 SAVEDATA_TEXT 清空 + CALL SAVEINFO + 拼时间戳前缀
      const remark = `${get_times()} ${build_save_info()}`;
      // :185 SAVEDATA L_IDX, LOCALS（备注落 global:saves，引擎自动 saveGlobal）
      await era.saveData(result, remark);
      // :186 ARRAYSHIFT LASTSAVE_NO, 1, L_IDX
      push_last_save_no(result);
      // :189 PRINTFORMW 已将游戏保存为{L_IDX}号存档……（读键后返回；行留
      // 屏由调用方重绘收走——原作 RETURN 前同样不清）
      era.print(`已将游戏保存为${result}号存档……`);
      await era.waitAnyKey();
      return pos;
    }
    // :176-178 无效输入/翻页失败：清行重画
    await era.clear(era.getLineCount() - anchor);
  }
}

/**
 * 自动存档（#137 / ADR-0006）：每个游戏日开始时写进 99 号槽。
 *
 * **对原作的有意偏离**：原作全库只有一处玩家存档写点（SYSTEM_DATA.ERB:185，
 * 槽位 0-98），99 号槽在读档界面被渲染却没有任何写点，原作也未定义 Emuera
 * 的内建自动存档钩子 @SYSTEM_AUTOSAVE——占用它不改变任何原作可见行为，
 * 正当性见 ADR-0006「后果」节，追溯登记 #14。
 *
 * 行为边界（有意取舍，写明）：
 *   - 备注 = 「自动」前缀 + 手动档同款 `%GETTIMES()% %SAVEDATA_TEXT%`
 *     （工单 #137 / 决议 #104 第三节）；
 *   - **不 push LASTSAVE_NO**：自动行为不占用玩家的「上次存档」高亮
 *     （99 号槽有独立的渲染位与 LASTLOAD_NO == 99 高亮判据）；
 *   - **无输出、无确认**：日推进的输出流不被打断（原作无此功能，无
 *     先例可循；覆盖旧自动档无条件进行——手动档的覆盖确认是玩家动作
 *     的护栏，自动档没有玩家动作）；
 *   - build_save_info 的指针改写副作用（SIF FLAG:1/FLAG:2 >= 0 →
 *     TARGET/ASSI）随调用发生——与原作 @SAVEINFO 的调用语义一致，且
 *     本函数的调用点（run_event_newday 入口）之后回合结算会重设同一对
 *     指针（turnend-settle.js:753-758），无实害。
 *
 * @returns {Promise<boolean>} era.saveData 的返回值
 */
async function auto_save() {
  const remark = `自动 ${get_times()} ${build_save_info()}`;
  return era.saveData(AUTOSAVE_SLOT, remark);
}

/**
 * @SYSTEM_DELDATA（SYSTEM_DATA.ERB:220-292）：删除存档界面。
 *
 * @param {number} [pos] 页起点（原作参数默认 -1 → 归 0）
 * @returns {Promise<number>} 离开时的页起点（原作 RETURN L_POS）
 */
async function del_data(pos = -1) {
  // :227 L_POS = L_POS < 0 ? 0 # L_POS
  if (pos < 0) {
    pos = 0;
  }
  const anchor = era.getLineCount();

  // $DRAW_PAGE
  for (;;) {
    era.drawLine({ isSolid: true }); // :233
    era.print('【删除存档】要删除以下哪个存档？'); // :234
    era.drawLine(); // :235
    list_data(pos, pos + PAGE_LEN, false); // :237

    era.drawLine(); // :239
    era.println(); // :240 PRINTL
    // :242-245 [101] 上一页 / [100] 返回 / [102] 下一页
    print_page_buttons(
      { accelerator: 101, content: '上一页' },
      { accelerator: 100, content: '返回' },
      { accelerator: 102, content: '下一页' },
    );
    era.println();

    // :249 INPUT 99（默认值 99，见文件头）
    const result = await era.input();

    if (result === 100) {
      // :253-255 返回
      return pos;
    }
    if (result === 101 && pos - PAGE_LEN >= 0) {
      // :257-263
      pos -= PAGE_LEN;
    } else if (result === 102 && pos + PAGE_LEN < 99) {
      // :265-271
      pos += PAGE_LEN;
    } else if (
      result >= 0 &&
      result <= 99 &&
      has_valid_save(era.get(`global:saves:${result}`))
    ) {
      // :273-287 存在 → 删除确认
      era.print('确定要删除这个存档么？'); // :277
      print_page_buttons(
        { accelerator: 1, content: '确定' },
        { accelerator: 0, content: '取消' },
      );
      const confirm = await era.input();
      if (confirm === 1) {
        // :284 DELDATA L_IDX（备注随之从 global:saves 消失，引擎自动
        // saveGlobal）→ 回 DRAW_PAGE
        await era.rmData(result);
      }
      // :280-285 取消/删除完成：一律回 DRAW_PAGE（循环尾清行重画）
    }
    // :290-292 无效输入：清行重画
    await era.clear(era.getLineCount() - anchor);
  }
}

module.exports = {
  PAGE_LEN,
  AUTOSAVE_SLOT,
  auto_save,
  build_save_info,
  del_data,
  get_times,
  has_valid_save,
  list_data,
  load_game,
  push_last_save_no,
  save_game,
  set_story_name,
};
