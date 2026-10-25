/**
 * @file 存读档界面：读档（load_game）/ 存档（save_game）/
 * 槽位列表（list_data / slot_row）+ 存档备注正文（build_save_info）的移植
 * （issue #136）。
 *
 * 不移植 SYSTEM_LOADEND：静态搜索未发现调用者，且它不在保留名清单
 * （SYSTEM_TITLE / TITLE_LOADGAME / SYSTEM_AUTOSAVE / EVENTLOAD 等，见
 * system-flow.md「主要系统函数一览」）——读档成功的收尾由本文件的
 * EVENTLOAD 链与转场承担。
 *
 * 旧引擎机制 → ere 写法的映射（本文件全部语义依据集中在此）：
 *   - SAVENOS()（分页步长）→ 常量 PAGE_LEN = 20。它是
 *     「表示するセーブデータ数」配置项（默认 20，技能 data-save-load.md），
 *     ere 引擎无此配置，取其默认值为常量；
 *   - CHKDATA n（RESULT==0 = 可加载，RESULTS = 备注）→
 *     era.get(`global:saves:${n}`)：非 undefined 且不以 `(FILE LOST) ` 开头
 *     即存在（dev-guides/11-saves.md 的备注语义；code/version 检查归
 *     loadData 运行时校验，读侧不预判）；
 *   - SAVEDATA n, text → era.saveData(n, text)；LOADDATA n → era.loadData(n)
 *     （Boolean）；DELDATA n → era.rmData(n)；SAVEGLOBAL → 引擎在
 *     saveData/rmData 后自动调（11-saves.md），显式调用省略；
 *   - LASTLOAD_NO（内建只读、LOADDATA 时自动设置）→
 *     era_flag.last_load_no（flag:10018，读档成功后自写入，随存档保存）；
 *   - LASTSAVE_NO（10 元数组，随存档保存）→ flag:10019..10028
 *     （[0] 走 era_flag.last_save_no，[1..9] 直写；list_data 的高亮比较
 *     只读 [0]，裸名比较即如此）；
 *   - CSTR:MASTER:99（故事名）→ chara(0).system.故事名（门面访问器，
 *     cstr:0:99——ownership 属主 system；yml/CStr.yml 只登记角色预设用到的
 *     两个下标，99 不在其中，引擎对未登记下标原样回落数字寻址，可写可存；
 *     **不要**往该表补「故事名: 99」——登记进名字表的下标会被 addCharacter 的
 *     initCharaTable 预置 0（字符串表预置 ''），行为随之改变（简报事实 3 /
 *     #136）；门面命名是代码层动作（tools/facade-names.js），不碰 yml）；
 *   - SAVESTR:TARGET（build_save_info 的调教对象名）→ chara_callname(target)
 *     （读 callname:<角色号>:-1；#5 决议：SAVESTR 的名字承载归内置 callname）；
 *   - GETTIMES() → get_times()（`YYYY/MM/DD HH:MM:SS`，技能
 *     in-expression-functions.md）；
 *   - SAVEDATA_TEXT + PUTFORM → 局部字符串拼接（存档备注暂存
 *     变量，ere 无对应）。
 *
 * 界面写法说明（有意偏离，均注明依据）：
 *   - **槽位行是「槽号按钮 + 备注文本格 + 删除按钮」三格的网格行**（#868，
 *     照官方存/读档例程的写法：`printMultiColumns` 每行一格按钮、一格文本、
 *     一格动作按钮）。槽号按钮的**正文留空**：编号由引擎
 *     按 showAcc 拼成 `[N]`，正文再写编号会显示成 `[N] N`；点击与键盘都按
 *     accelerator 送达。备注进**文本格**——引擎只折叠按钮正文里的连续空白
 *     （渲染层的按钮行构造器对正文做 `/\s+/g → ' '`，见 CONTEXT.md 的
 *     「输出 API 的排版与对齐」），文本格不经过它；槽号 1 位与 2 位的备注因此
 *     都从同一列起算，这就是「实机上对不齐」的修法（旧写法把备注塞在按钮
 *     正文里，`[0] ` 与 `[98] ` 宽度不同）。
 *   - 列宽 SLOT_WIDTH / REMARK_WIDTH / DELETE_WIDTH 合计 24（引擎一行的列数）。
 *   - 空槽按界面分化：**读档界面不可选**（CHKDATA 拦下 = 无效输入），渲染成
 *     `disabled` 的槽号按钮 + 灰 `----`（引擎对 disabled 按钮既挡点击也挡
 *     快捷键，dev-guides/A-api-docs.md 的 ButtonConfig.disabled）；**存档界面
 *     必须可点**（对空槽照存），不设 disabled——设了就连数字键都存不进去。
 *   - **删除并进列表**（#868）：每行第三格的删除按钮走 `DELETE_BASE + 槽号`，
 *     确认后 rmData；不再有单独的删除画面（旧写法 [300] 进子界面，一个动作
 *     占一屏）。空槽的删除钮同样 disabled。
 *   - INPUT 的参数是**默认值**（`INPUT 99` = 空回车得 99、`INPUT 0` = 空回车
 *     得 0，技能 input.md），ere 的 input() 无默认值参数——空回车快捷语义
 *     丢失（引擎能力差异，点击/键入不受影响）。
 *   - REDRAW/CLEARLINE → 本文件用「入口基准 + clear(跨度)」就地重绘
 *     （L_LINECOUNT = LINECOUNT → CLEARLINE LINECOUNT - L_LINECOUNT 的
 *     习语）。无效输入只 CLEARLINE 1 不重画，ere 统一
 *     整屏重绘（page-select-target 先例：ere 控制台是滚动视图）。
 *   - 故事命名（$SET_NAME）：INPUTS 前先 clear 回基准——引擎在屏幕有按钮时
 *     拒收非按钮输入（dev-guides/05-interaction.md:144），文本输入必须先把
 *     列表按钮清掉（erauma 12-sl 改名段同款姿势）；INPUTS 无此限制，
 *     且命名后不清行（该处语句被注释）直接堆叠重画，ere 侧清掉后由
 *     DRAW_PAGE 重画，等价（反馈行经 waitAnyKey 读键，可见性不损失）。
 *   - PRINTBUTTON（现名, CSTR:MASTER:99）（点击把现名预填进输入框）→ 纯
 *     文本 `（现名）` 提示：ere 引擎无「按钮点击预填输入框」能力。
 *   - **故事命名的空输入按 #567 的决定处理**：0 视为空输入、走消名支；
 *     提示行**不补**输入 0 的说明——提示语本身不含「不输入」字样（既有
 *     文案）。判断依据见 ere/utils/input-text.js。**#151 的旧结论（消名
 *     分支真机双重不可达，登记为换代失效）随这张工单作废**：0 就是
 *     「不输入」在引擎上的归一写法，按 #567 的决定（空输入分支一律保留）
 *     恢复可达。
 *   - EVENTLOAD（读档后的回调链）**自 #137 起由 ere/event/event-load.js
 *     承载**（本文件 require 装配，emit 点在 load_game 的成功分支）：
 *     LOADGLOBAL 自 #547 起在该链首行镜像（await era.loadGlobal——global:3
 *     不即时 SAVEGLOBAL 打破了 #137 的不镜像前提，见 event-load.js 文件头）；
 *     名字初始化两调用自 #105 起为真身；LASTLOAD_NO == 999 →
 *     MAOUNET 与 1000–1020 → INPORT_B 是跨作品数据交换（ere 读档界面只放行
 *     0-99，不可达，归通信工单）；DATA_FIX 历史补丁体由 ADR-0006 判不移植，
 *     三处对新档有语义的行经 #137 逐条判定后归钩子等价实现（判定依据见
 *     event-load.js 文件头）。
 *   - LOADDATA 的**转场语义**（#137）：读档成功后不回调用方（标题的
 *     RESTART、据点的循环重绘都不再走），而是 emit EVENTLOAD 链后转场进
 *     SHOP——且**不执行 EVENTSHOP**（技能 system-flow.md:51-53），以
 *     STATE.SHOP_AFTER_LOAD 承载（game-state.js 的本地扩展）。引擎拒读
 *     （loadData false）时不转场：留在读档界面重绘（#136 已有行为，与
 *     CHKDATA 拦下等效）。
 */

const era = require('#/era-electron');
// EVENTLOAD 钩子的注册模块（#137）：emit 点在本文件 load_game 的成功
// 分支，require 即装配（on 注册在模块顶层）——与 page-shop.js 的
// EVENTSHOP 同构（注册与 emit 同侧装配，测试不依赖 main-loop 的清单）
require('#/event/event-load');
const { emit } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/game-state');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { input_text } = require('#/utils/input-text');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 分页步长：SAVENOS()（「表示するセーブデータ数」配置）的默认值 20。
 * 99 槽按 20/页 → 5 页（0/20/40/60/80），末页渲染 80–98 加一个空行。
 */
const PAGE_LEN = 20;

/** 自动存档槽号（读档界面单列渲染，ADR-0006：占用旧引擎遗留的空位）。 */
const AUTOSAVE_SLOT = 99;

/**
 * 槽位行三格的列宽（引擎一行 24 列）：
 * 槽号按钮格（`[98]` 4 个半角宽）2 + 备注文本格 18 + 删除按钮格 4。
 */
const SLOT_WIDTH = 2;
const REMARK_WIDTH = 18;
const DELETE_WIDTH = 4;

/** 删除按钮的快捷键基数：删除 N 号槽 = DELETE_BASE + N，取值 400–499，
 * 避开槽号 0–99 与页脚键 100–102/200。 */
const DELETE_BASE = 400;

/** 删除按钮与空槽占位格的正文。 */
const DELETE_LABEL = '删除';
const EMPTY_LABEL = '----';

/**
 * CHKDATA RESULT==0 的等价条件：槽位有有效备注（11-saves.md——undefined =
 * 空槽，`(FILE LOST) ` 前缀 = 有备注但文件丢失）。
 * @param {string|undefined} comment 槽位备注
 * @returns {boolean} 该槽存在可读存档
 */
function has_valid_save(comment) {
  return comment !== undefined && !comment.startsWith('(FILE LOST) ');
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
 * 槽位行的高亮色（SETCOLORBYNAME 的顺序语义，后者覆盖前者）：槽号 ==
 * LASTLOAD_NO → deepskyblue；槽号 == LASTSAVE_NO（裸名 = [0]）→ lightgreen；
 * 空槽一律灰色（GRAY 覆盖先设的高亮色）。
 *
 * @param {number} i 槽号
 * @param {boolean} has_save 该槽是否有有效存档
 * @returns {string|undefined} 颜色名（无高亮时 undefined）
 */
function slot_color(i, has_save) {
  let color;
  if (i === era_flag.last_load_no) {
    color = 'deepskyblue';
  }
  if (i === era_flag.last_save_no) {
    color = 'lightgreen';
  }
  if (!has_save) {
    color = 'gray';
  }
  return color;
}

/**
 * slot_row：槽位列表的一行——槽号按钮 + 备注文本格 + 删除按钮（见文件头
 * 「界面写法说明」）。
 *
 * @param {number} i 槽号（= 槽号按钮的快捷键）
 * @param {boolean} empty_clickable 空槽的槽号按钮是否可点——存档界面 true
 *   （对空槽照存），读档界面 false（CHKDATA 拦下，设 disabled）
 */
function slot_row(i, empty_clickable) {
  const comment = era.get(`global:saves:${i}`);
  const has_save = has_valid_save(comment);
  const color = slot_color(i, has_save);
  const highlight = color ? { color } : {};
  era.printMultiColumns([
    {
      type: 'button',
      accelerator: i,
      content: '',
      config: {
        align: 'left',
        width: SLOT_WIDTH,
        ...highlight,
        // 空槽：引擎对 disabled 按钮既挡点击也挡快捷键，读档界面据此不可选
        ...(has_save || empty_clickable ? {} : { disabled: true }),
      },
    },
    {
      type: 'text',
      content: has_save ? comment : EMPTY_LABEL,
      config: { align: 'left', width: REMARK_WIDTH, ...highlight },
    },
    {
      type: 'button',
      accelerator: DELETE_BASE + i,
      content: DELETE_LABEL,
      config: {
        align: 'right',
        width: DELETE_WIDTH,
        disabled: !has_save,
      },
    },
  ]);
}

/**
 * list_data：渲染槽位列表 [start, end)。
 *
 * @param {number} start 起始槽号（L_POS）
 * @param {number} end 排他上限（L_POS + L_LEN）
 * @param {boolean} empty_clickable 空槽是否可点——存档界面 true
 *   （对空槽照存），读档界面 false（CHKDATA 拦下）
 */
function list_data(start, end, empty_clickable) {
  for (let i = start; i < end; i += 1) {
    if (i >= AUTOSAVE_SLOT) {
      // 末页的 99 号位在列表里留空，由读档界面的单列段渲染
      era.println();
      continue;
    }
    slot_row(i, empty_clickable);
  }
}

/**
 * 翻页/操作按钮行（PRINTFORMLC → printMultiColumns）。
 *
 * 格宽按本行格数均分 24 列：三枚页脚键（上一页/返回/下一页）各 8 列才排得进
 * 一行，写死 12 列会因总量 36 > 24 让第三枚折到下一行（实机截图可见）。
 *
 * @param {...{accelerator: number, content: string}} items 同行各列
 */
function print_page_buttons(...items) {
  const width = Math.floor(24 / items.length);
  era.printMultiColumns(
    items.map((item) => ({
      accelerator: item.accelerator,
      config: { align: 'left', width },
      content: item.content,
      type: 'button',
    })),
  );
}

/**
 * ARRAYSHIFT LASTSAVE_NO, 1, idx：整体后移一位、[0] = idx、末位丢弃。
 * @param {number} idx 本次保存的槽号
 */
function push_last_save_no(idx) {
  // [1..9] 的历史元素直写（↔ LASTSAVE_NO:1..9，随存档保存；包装层只暴露
  // [0]——唯一被消费的元素）
  for (let i = 9; i > 0; i -= 1) {
    era.set(`flag:${10019 + i}`, era.get(`flag:${10019 + i - 1}`) ?? -1);
  }
  era_flag.last_save_no = idx;
}

/**
 * delete_save：删除一个槽位的存档（列表里的删除按钮，DELDATA）。
 *
 * 确认前的提示与 [1] 确定 / [0] 取消 两个按钮沿用旧删除画面；确认后
 * rmData 让备注从 global:saves 消失（引擎自动 saveGlobal）。清行回
 * 调用方循环尾统一做。
 *
 * @param {number} slot 槽号（快捷键 - DELETE_BASE）
 * @returns {Promise<void>}
 */
async function delete_save(slot) {
  if (!has_valid_save(era.get(`global:saves:${slot}`))) {
    // 空槽的删除钮是 disabled（引擎挡下点击与快捷键），这里兜住越界输入
    return;
  }
  era.print('确定要删除这个存档么？');
  print_page_buttons(
    { accelerator: 1, content: '确定' },
    { accelerator: 0, content: '取消' },
  );
  if ((await era.input()) === 1) {
    await era.rmData(slot);
  }
}

/**
 * build_save_info：拼存档备注的正文段。
 *
 * 段式：`第N日午前/午后 LV等级` → TARGET >= 1 时 ` 正在调教:名字` →
 * 有故事名时 ` 『故事名』`。字段之间只留分隔用的单个半角空格：**不再补位**
 * ——备注进列表的文本格后由网格分列（文件头「界面写法说明」），补位只是
 * 给旧存档的兼容显示留着（旧备注原样存着，照常显示）。
 *
 * @returns {string} 备注正文（不含时间戳前缀）
 */
function build_save_info() {
  const day_half = era_flag.time === 0 ? '午前' : '午后';
  let text = `第${era_flag.day_count + 1}日${day_half} LV${era.get('cflag:0:9') || 0}`;
  // TARGET >= 1 → 正在调教段（SAVESTR:TARGET）
  if (era_flag.target >= 1) {
    // SAVESTR:TARGET → callname 的 -1 下标（#5 决议；引擎里 callname:<号> 不
    // 带下标读到的是整个名字表对象——必须用 chara_callname 读 -1）
    text += ` 正在调教:${chara_callname(era_flag.target)}`;
  }
  const story = chara(0).system.故事名;
  if (story.length > 0) {
    text += ` 『${story}』`;
  }
  return text;
}

/**
 * $SET_NAME：故事命名。
 *
 * @param {number} anchor 本界面的入口基准（clear 回它＝清掉列表与按钮）
 */
async function set_story_name(anchor) {
  // 清掉列表按钮：引擎在屏幕有按钮时拒收非按钮输入（05-interaction.md:144），
  // 文本输入前必须清屏（erauma 12-sl 改名段同款；INPUTS 无此限制，
  // 见文件头「界面写法说明」）
  await era.clear(era.getLineCount() - anchor);
  // CASE 200 的 DRAWLINE
  era.drawLine();
  // PRINTFORM 请输入一个名称故事：（提示语即此语序）
  era.print('请输入一个名称故事：');
  const current = chara(0).system.故事名;
  if (current.length > 0) {
    // 现名提示。PRINTBUTTON（现名）点击可预填输入框；ere 无
    // 该能力（引擎渲染层无此变换），降为纯文本提示
    era.print(`（${current}）`);
  }
  era.println(); // PRINTL
  // INPUTS——引擎把回传值按 getNumber 归一（'' 与 "0" 都成数值 0），
  // 按 #567 的决定 0 视为空输入，经共享条件还原成空串后走消名支
  // （判断依据见 ere/utils/input-text.js；文件头的 #151 作废说明同源）
  const name = input_text(await era.input());
  if (name.length > 32) {
    // 存储截断到 32 字符，**显示原串**（CSTR 存
    // SUBSTRING(RESULTS,0,32)，PRINTFORMW 打印的是未截断的 RESULTS）
    chara(0).system.故事名 = name.substring(0, 32);
    era.print(`将故事命名为『${name}』`);
    await era.waitAnyKey();
  } else if (name.length > 0) {
    chara(0).system.故事名 = name;
    era.print(`将故事命名为『${name}』`);
    await era.waitAnyKey();
  } else {
    // 空输入 = 消名
    chara(0).system.故事名 = '';
    era.print('消去了故事的名字');
    await era.waitAnyKey();
  }
  // 回调用方循环尾清行重画
}

/**
 * load_game：读档界面。
 *
 * 列表 + 99 号自动存档槽单列段 + 翻页行；读档成功后：EX_FLAG:2801 钳制 +
 * LASTLOAD_NO 自写入 → EVENTLOAD 链（ere/event/event-load.js）→ 转场进
 * SHOP（LOADDATA 的转场语义，见文件头）。**读档成功后本函数以转场目标返回**，
 * 不再停留在读档界面——`RETURN L_POS` 与标题的 RESTART 都在
 * 「没读成」的世界里。
 *
 * @returns {Promise<number|string>} [100] 返回时的页起点（数字）；读档成功时
 *   为转场目标（STATE 取值），调用方用 is_state 判定后原样上抛
 */
async function load_game() {
  let pos = 0; // #DIM L_POS（局部零值；< 0 归一不触发）
  const anchor = era.getLineCount(); // L_LINECOUNT = LINECOUNT

  // $DRAW_PAGE
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    era.print('【读取存档】要载入以下哪个存档？');
    era.drawLine();
    list_data(pos, pos + PAGE_LEN, false);

    // 99 号槽（自动存档位）单列渲染：存在 → 分隔线夹槽行（高亮条件
    // LASTLOAD_NO == 99）；不存在 → 只一条分隔线（连 ---- 行都没有）
    era.drawLine();
    if (has_valid_save(era.get(`global:saves:${AUTOSAVE_SLOT}`))) {
      slot_row(AUTOSAVE_SLOT, false);
      era.drawLine();
    }

    // [101] 上一页 / [100] 返回 / [102] 下一页 + PRINTL
    print_page_buttons(
      { accelerator: 101, content: '上一页' },
      { accelerator: 100, content: '返回' },
      { accelerator: 102, content: '下一页' },
    );
    era.println();

    // INPUT 99（99 是默认值——空回车得 99；ere 无默认值参数，见文件头）
    const result = await era.input();

    if (result === 100) {
      // 返回
      return pos;
    }
    if (result === 101 && pos - PAGE_LEN >= 0) {
      // 上一页
      pos -= PAGE_LEN;
    } else if (result === 102 && pos + PAGE_LEN < 99) {
      // 下一页（< 99：末页 80 起时 80+20=100 不再翻）
      pos += PAGE_LEN;
    } else if (result >= DELETE_BASE && result <= DELETE_BASE + AUTOSAVE_SLOT) {
      // 行内删除（DELETE_BASE + 槽号）
      await delete_save(result - DELETE_BASE);
    } else if (
      result >= 0 &&
      result <= 99 &&
      has_valid_save(era.get(`global:saves:${result}`))
    ) {
      // 范围内且存在 → 读档
      // LOADDATA：ere 等价 era.loadData（Boolean）。引擎拒读时返回
      // false（如版本检查），**不转场**——落到循环尾清行重绘，留在读档
      // 界面（无此分支：CHKDATA 通过后 LOADDATA 失败会弹错终止；
      // ere 侧 false 不吞不炸，等效于 CHKDATA 拦下的等输入路径）
      if (await era.loadData(result)) {
        // SIF EX_FLAG:2801 < 10 → 10（读入后的值上钳制；EX_FLAG:2801
        // = 一周目主线截止，包装层名 first_run_deadline）
        if (era_exflag.first_run_deadline < 10) {
          era_exflag.first_run_deadline = 10;
        }
        // LASTLOAD_NO：引擎在 LOADDATA 时自动设置；ere 自写入（写进
        // 读入后的数据，随下一次存档带走——同序）
        era_flag.last_load_no = result;
        // EVENTLOAD 链（LOADDATA 后迁移的保留名回调，ere/event/
        // event-load.js）。链内 BEGIN 的暂存值覆盖缺省转场目标——
        // 的 BEGIN SHOP（显式、会跑 EVENTSHOP）与隐式进入 SHOP
        // 的区分在 ere 侧即此缺省值与覆盖值之差（game-state.js）
        const next = (await emit('EVENTLOAD')) ?? STATE.SHOP_AFTER_LOAD;
        // LOADDATA 的转场语义（#137，见文件头）：不回调用方（标题的
        // RESTART、据点的循环重绘都不再走），进 SHOP 且不执行
        // EVENTSHOP。return 即离开本函数——RETURN L_POS 在迁移
        // 发生后不回调用方，ere 侧以「成功分支返回转场目标」等效
        return begin(next);
      }
    }
    // 无效输入（CLEARLINE 1 重输）与翻页失败：统一清行重画（先例
    // page-select-target，见文件头）
    await era.clear(era.getLineCount() - anchor);
  }
}

/**
 * save_game：存档界面。
 *
 * @returns {Promise<number>} 离开时的页起点
 */
async function save_game() {
  let pos = 0;
  const anchor = era.getLineCount();

  // $DRAW_PAGE
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    // 标题（故事名拼接；PRINT 不带行尾，两段拼同一行——ere 的
    // print 独占一行，一次拼完再输出，两行布局等效）。标题 PRINT 的
    // 「【保存存档】」前缀首版漏抄，#161 范围 B 实证后已补——读取画面同款
    // 前缀本就在，此处与其对齐
    const story = chara(0).system.故事名;
    if (story.length > 0) {
      era.print(
        `【保存存档】当前的故事名为『${story}』，要保存到以下哪个存档？`,
      );
    } else {
      era.print('【保存存档】当前故事还没有名字，要保存到以下哪个存档？');
    }
    era.drawLine();
    list_data(pos, pos + PAGE_LEN, true); // （空槽也按钮，见文件头）

    era.drawLine();
    // [200] 为故事命名（存/删都在列表里，不再有 [300] 删除画面）
    print_page_buttons({ accelerator: 200, content: '为故事命名' });
    era.println();
    // [101] 上一页 / [100] 返回 / [102] 下一页
    print_page_buttons(
      { accelerator: 101, content: '上一页' },
      { accelerator: 100, content: '返回' },
      { accelerator: 102, content: '下一页' },
    );
    era.println();

    // INPUT（无默认值）
    const result = await era.input();

    if (result === 100) {
      // 返回
      return pos;
    }
    if (result === 101 && pos - PAGE_LEN >= 0) {
      pos -= PAGE_LEN;
    } else if (result === 102 && pos + PAGE_LEN < 99) {
      pos += PAGE_LEN;
    } else if (result === 200) {
      // 为故事命名（内部自管清行，返回后回 DRAW_PAGE）
      await set_story_name(anchor);
    } else if (result >= DELETE_BASE && result <= DELETE_BASE + AUTOSAVE_SLOT) {
      // 行内删除（DELETE_BASE + 槽号）：确认后回循环尾重绘
      await delete_save(result - DELETE_BASE);
    } else if (result >= 0 && result <= 98) {
      // 槽位（0-98，不含自动存档位）：存在 → 覆盖确认
      const comment = era.get(`global:saves:${result}`);
      if (has_valid_save(comment)) {
        era.print('存档已经存在，确定要覆盖么？');
        // [1] 确定    [0] 取消（一行两选项；INPUT 0 的默认值 0 =
        // 空回车取消，ere 无默认值参数，见文件头）
        print_page_buttons(
          { accelerator: 1, content: '确定' },
          { accelerator: 0, content: '取消' },
        );
        const confirm = await era.input();
        if (confirm !== 1) {
          // 取消 → 清行回 DRAW_PAGE
          await era.clear(era.getLineCount() - anchor);
          continue;
        }
      }
      // $SAVE_GAME
      // SAVEDATA_TEXT 清空 + build_save_info + 拼时间戳前缀
      const remark = `${get_times()} ${build_save_info()}`;
      // SAVEDATA L_IDX, LOCALS（备注落 global:saves，引擎自动 saveGlobal）
      await era.saveData(result, remark);
      // ARRAYSHIFT LASTSAVE_NO, 1, L_IDX
      push_last_save_no(result);
      // PRINTFORMW 已将游戏保存为{L_IDX}号存档……（读键后返回；行留
      // 屏由调用方重绘收走——RETURN 前同样不清）
      era.print(`已将游戏保存为${result}号存档……`);
      await era.waitAnyKey();
      return pos;
    }
    // 无效输入/翻页失败：清行重画
    await era.clear(era.getLineCount() - anchor);
  }
}

/**
 * 自动存档（#137 / ADR-0006）：每个游戏日开始时写进 99 号槽。
 *
 * **有意偏离**：旧引擎只有一处玩家存档写点（槽位 0-98），99 号槽在
 * 读档界面被渲染却没有任何写点，也没定义内建自动存档钩子
 * SYSTEM_AUTOSAVE——占用它不改变任何可见行为，
 * 正当性见 ADR-0006「后果」节。
 *
 * 行为边界（有意取舍，写明）：
 *   - 备注 = 「自动」前缀 + 手动档同款 `%GETTIMES()% %SAVEDATA_TEXT%`
 *     （工单 #137 / 决议 #104 第三节）；
 *   - **不 push LASTSAVE_NO**：自动行为不占用玩家的「上次存档」高亮
 *     （99 号槽有独立的渲染位与 LASTLOAD_NO == 99 高亮条件）；
 *   - **无输出、无确认**：日推进的输出流不被打断（无此功能，无
 *     先例可循；覆盖旧自动档无条件进行——手动档的覆盖确认是玩家动作
 *     的护栏，自动档没有玩家动作）；
 *   - **不改游戏状态**：build_save_info 只读（#868 起删掉了旧 SAVEINFO
 *     改写 TARGET/ASSI 的副作用——调用点之后回合结算会自行还原同一对
 *     指针，副作用从来不是它读到的值的前提）。
 *
 * @returns {Promise<boolean>} era.saveData 的返回值
 */
async function auto_save() {
  const remark = `自动 ${get_times()} ${build_save_info()}`;
  return era.saveData(AUTOSAVE_SLOT, remark);
}

module.exports = {
  PAGE_LEN,
  AUTOSAVE_SLOT,
  DELETE_BASE,
  DELETE_LABEL,
  DELETE_WIDTH,
  EMPTY_LABEL,
  REMARK_WIDTH,
  SLOT_WIDTH,
  auto_save,
  build_save_info,
  delete_save,
  get_times,
  has_valid_save,
  list_data,
  load_game,
  push_last_save_no,
  save_game,
  set_story_name,
  slot_row,
};
