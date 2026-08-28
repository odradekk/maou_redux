/**
 * @file 据点主菜单（菜单骨架：状态行 + 六个功能入口 + 四个子面板）。
 *
 * 源: target/ERB/SHOP/DRAW_MAINMENU.ERB  @DRAW_MAINMENU（:5-325）/
 *     @DRAW_DUNGEON_OVERVIEW（:427-577，#180 起真身）/
 *     @DRAW_DUNGEON_DAILY（:583-601，#180 起真身；尾部的
 *     @DISPLAY_DUNGEON_DAILY（DUNGEON_DAILY.ERB:1）留存根，随 #179 H10）；
 *     @DRAW_HAVEITEMS :331 / @DRAW_HAVETRAPS :400 两个子面板仍存根
 *
 * 这张票（#23）范围：状态行（读真实变量）、六个功能入口（能显示、能点选；
 * 点选的分发已落 #24）、防御性修正（:20-39 照实移植）。作用域外，各留注释或
 * 存根：BGM 段（:11-17）自 #69 起接通（见 draw_main_menu 首段）、调教目标
 * 名/助手名按钮与生命条（:100-145）、物品/陷阱两个子面板的内容（:190-197
 * 的分发照搬、函数体存根）、指令面板的渲染（:203-319，随首个指令子系统票；
 * 分发本体在 page-shop.js 的 usershop）。
 *
 * #73 起本画面迁入组件层：menu_button 排版助手收敛到
 * page/components/menu-button.js（两条 UI 结论的唯一权威落点），整屏由
 * create_main_menu() 包装为画面组件（page/components/screen-block.js），
 * 商店轮（page-shop.js 的 run_shop）每轮就地重绘。
 */

const era = require('#/era-electron');
const { ScreenBlock } = require('#/page/components/screen-block');
const {
  menu_button,
  MENU_BUTTON_DIM_COLOR,
} = require('#/page/components/menu-button');
const era_flag = require('#/era-utils/era-flag');
const era_audio = require('#/era-utils/era-audio');
const era_exflag = require('#/era-utils/era-exflag');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）——后续票据此认领工作；名单变动必须同步清单。
 *
 * 注：DRAW_MAINMENU 指 @DRAW_MAINMENU 的指令面板段（:208-319 的 [100]-[888]
 * 按钮渲染；[100] 与 [109] 已分别随 #44/#117 的真身接通，[102] 地下城自
 * #180 起（DUNGEON_INFO2 真身在 page/page-dungeon-info2.js），[200]/[300]
 * 随 #136）——函数本体的骨架已实现（#23），占位的是其余各项；输入分发本体
 * 在 page/page-shop.js 的 usershop（#24）。
 *
 * DRAW_DUNGEON_OVERVIEW / DRAW_DUNGEON_DAILY 自 #180 起为真身（本文件下方），
 * 移出本名单；DAILY 尾部的 DISPLAY_DUNGEON_DAILY（地城日常的部下日程，
 * 迷宮/DUNGEON_DAILY.ERB）入名单。
 */
const STUBBED_CALLS = [
  'DRAW_HAVEITEMS',
  'DRAW_HAVETRAPS',
  'DISPLAY_DUNGEON_DAILY',
  'DRAW_MAINMENU',
];

// 原文排版里的全角空格（UNICODE 0x3000）。以转义书写并集中定义：ESLint
// 的 no-irregular-whitespace 拦裸写，prettier 会把字符串里的裸全角空格当
// 可删空白吃掉。
const FULL_WIDTH_SPACE = '\u3000';

// :190-197 四个子面板的分发表：FLAG:36 的取值 → 原作函数。地城概况 /
// 地城日常自 #180 起为真身（本文件下方）；物品/技能与持有陷阱仍存根
//（owner 是认领该面板的子系统，见 docs/stub-registry.md 的归属列）。
const PANEL_STUBS = {
  0: {
    erb_name: 'DRAW_HAVEITEMS',
    label: '物品/技能面板',
    owner: '随物品/技能子系统票',
  },
  1: {
    erb_name: 'DRAW_HAVETRAPS',
    label: '持有陷阱面板',
    owner: '随陷阱/商店子系统票',
  },
};

/** FLAG:36 → 子面板绘制函数（4/5 真身，其余存根；ELSE 回落物品/技能） */
function draw_panel(active_panel) {
  if (active_panel === 4) {
    draw_dungeon_overview();
    return;
  }
  if (active_panel === 5) {
    draw_dungeon_daily();
    return;
  }
  const panel = PANEL_STUBS[active_panel] ?? PANEL_STUBS[0];
  stub_line(panel.erb_name, panel.label, panel.owner);
}

// 存根占位自 #44 起收敛到 utils/stub-line.js（本文件是 #23 的先例、
// page-shop.js 自 #24 起经本文件的 re-export 使用——导出保持，调用点不动）

// menu_button 自 #73 起收敛到 page/components/menu-button.js（本文件原是
// 它的唯一发明方；近似依据与两条 UI 结论的说明都在那边）。

/**
 * 指针越界钳制：@DRAW_MAINMENU :20-25 / @EVENTSHOP :7-12 共用的「バグ対策」。
 *
 * 原作判据 `TARGET > CHARANUM - 1` 里的 TARGET 是已加入序号；ere 侧角色
 * 寻址一律用角色 ID（cflag 寻址、分发注册表同此，#21），故按语义移植为
 * 「不在已加入列表 = 越界」——序号世界里两者等价，ID 世界里后者才正确
 * （如已加入 [0,31] 时 ID 31 合法而 31 > CHARANUM-1 会误杀）。-1（未选中）
 * 不在列表里，落进重置分支也只是 -1 → -1 的空操作，与原作「只钳上界」
 * 行为一致。
 */
function reset_out_of_range_pointers() {
  const added = era.getAddedCharacters();
  // :20-21 SIF TARGET > CHARANUM - 1 → TARGET = -1
  if (!added.includes(era_flag.target)) {
    era_flag.target = -1;
  }
  // :23-25 SIF ASSI > CHARANUM - 1 → ASSI = -1
  if (!added.includes(era_flag.assi)) {
    era_flag.assi = -1;
  }
}

/**
 * @DRAW_MAINMENU :20-39 的防御性修正（バグ対策）全集：编号越界、目标与
 * 助手指向同一人、或所指角色处于不可选中态（CFLAG:x:1 != 0）时重置。
 * 原作对已知缺陷的兜底，1:1 照搬。
 *
 * 角色静态表迁移（#35）完成前实机加不进任何角色，本函数在实机路径上恒把
 * 指针钳回 -1——这是预期，勿为看到效果伪造角色。
 */
function apply_bug_guards() {
  reset_out_of_range_pointers();
  // :27-29 SIF ASSI == TARGET → ASSI = -1（同一人不能既当目标又当助手）
  if (era_flag.assi === era_flag.target) {
    era_flag.assi = -1;
  }
  // :31-34 IF TARGET >= 1: CFLAG:TARGET:1 != 0 → TARGET = -1（CFLAG:x:1 的
  // 1 = 不可选中态；角色 0 是魔王，不在其列。读未声明序号得 undefined，
  // 包装层风格 || 0 兜底，#13）
  if (
    era_flag.target >= 1 &&
    (era.get(`cflag:${era_flag.target}:1`) || 0) !== 0
  ) {
    era_flag.target = -1;
  }
  // :36-39 IF ASSI >= 1: 同上
  if (era_flag.assi >= 1 && (era.get(`cflag:${era_flag.assi}:1`) || 0) !== 0) {
    era_flag.assi = -1;
  }
}

/**
 * A：可选的奴隶数（@DRAW_MAINMENU :208-216 的 A/B 计数段之 A）。
 *
 * 判据 1:1：已加入角色中 CFLAG:x:1 == 0（未占用）且 x != 0（排除魔王自己）
 * 的计数。原作在渲染指令面板前算出，@USERSHOP 的 100/496/497 守卫读它
 * （SHOP ver1.0.2.ERB:59/:152/:154，ere 侧消费方是 page-shop.js 的
 * usershop）；渲染与分发两次求值之间无写入路径，分发时重算等价。
 *
 * ere 侧按角色 ID 寻址（#21），与原作的 CHARANUM 序号世界等价。B
 * （CFLAG:x:0 > 0 的已调教计数，[106] 贩卖奴隶的可用性判据）无当前消费者，
 * 随指令面板段渲染（:208-319）一并落地。
 *
 * @returns {number}
 */
function count_selectable_slaves() {
  return era
    .getAddedCharacters()
    .filter((id) => id !== 0 && (era.get(`cflag:${id}:1`) || 0) === 0).length;
}

/**
 * 状态行（:45-75）：顶部双线 + 一行右对齐粗体的年月日/时段/所持金。
 * 数值全部读真实变量（包装层，#23 验收）。第 N 年的 N = DAY/365 的整数除
 * （Emuera 语义，DAY 非负 → Math.floor 等价）；「第 N 日」显示 DAY+1。
 */
function draw_status_line() {
  // :45 DRAWLINEFORM %UNICODE(0x2550)%（全宽 ═ 双线）。引擎 drawLine 的
  // content 是分隔线中央的标签文字、不是线型字符（app.asar 实证：el-divider
  // 的 border-style 只有 solid/dashed），故以 isSolid 近似双线、默认虚线近似
  // 单线；逐字比对归 #9。
  era.drawLine({ isSolid: true });

  era.setAlign('right'); // :54 ALIGNMENT RIGHT（仅本行右对齐）
  const fragments = [
    {
      // :55-59 行首两枚全角空格，随后
      // 第{DAY/365}年+全角空格+{DAY:1}月{DAY:2}日（第{DAY+1}日）
      content: `${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}第${Math.floor(era_flag.day_count / 365)}年${FULL_WIDTH_SPACE}${era_flag.month}月${era_flag.date}日（第${era_flag.day_count + 1}日）`,
      fontWeight: 'bold', // :53 FONTBOLD（整行粗体，片段级携带）
    },
  ];
  // :60-62 SIF DAY:2 == 15 → PRINT 《满月》（SETCOLORBYNAME Yellow；'yellow'
  // 是合法 CSS 颜色名，文本片段的 color 直通 span 样式，app.asar 实证）
  if (era_flag.date === 15) {
    fragments.push({
      content: '《满月》',
      color: 'yellow',
      fontWeight: 'bold',
    });
  }
  // :64-71 TIME == 0 → 上午、ELSE → 下午（前导一个半角空格是 PRINT 的
  // 分隔符后残文）；随后两枚全角空格 + (所持金：{MONEY} pts.) + 两枚全角空格
  fragments.push({
    content: ` ${era_flag.time === 0 ? '上午' : '下午'}${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}(所持金：${era_flag.money} pts.)${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}`,
    fontWeight: 'bold',
  });
  era.print(fragments);
  era.setAlign('left'); // :72 ALIGNMENT LEFT（还原，后续行左对齐）
}

/**
 * 绘制据点主菜单（@DRAW_MAINMENU 的骨架）。
 *
 * 本函数是画面组件的内容函数（create_main_menu 包装）：只输出、不清屏，
 * 清行/重绘归组件的 redraw。原作引擎在 @USERSHOP 返回后重画主菜单（追加
 * 式滚动），ere 侧自 #73 起改为就地重绘（ADR-0003；重绘只发生在玩家交互
 * 之后——调用点在 page-shop.js 的商店轮）。原作 :41/:323 的 REDRAW 0/1
 * （抑制逐行重绘防闪烁）无 ere 对应语义，不镜像。
 */
function draw_main_menu() {
  // :11-17 BGM 自 #69 起接通：IF 是否启用背景音乐 == 1 → PLAYBGM "据点2.mp3"
  // （注册名即文件名，res/sound/sound.csv）+ SETBGMVOLUME 背景音乐音量。
  // 开关/音量落扩展普通表 yml/Audio.yml（ere/era-utils/era-audio.js；引擎侧
  // data 桶与存清语义见该表头注）。音量无引擎等价物（playMusic 只有
  // loop/fade，待办见 docs/stub-registry.md）。PLAYBGM 循环 → 显式 loop。
  // 开关无声明默认值（音声的全局变量.erh:3，新档 0=不播，原作新档本来也不
  // 播）——开关的写点是设定菜单 MOD_SWITCH，随设定票落地。资源未启用时
  // playMusic 静默返回 false，主菜单照常渲染。
  if (era_audio.bgm_enabled === 1) {
    era.playMusic('据点2.mp3', { loop: true });
  }
  apply_bug_guards();

  draw_status_line();

  // :77 DRAWLINEFORM ─（单线，默认虚线近似）
  era.drawLine();

  // :78-98 第一组入口：调教目标（496）/ 助手（497）。原作两钮同行、以空格
  // 分隔；ere 的按钮独占一行（dev-guides/06-output.md），同行排版归 #9。
  // 明暗判据照原作：亮当且仅当指针 >= 1（:80-85 / :88-93；-1 未选中、
  // 0 是魔王，都算未选中）。
  menu_button('调教目标', 496, era_flag.target < 1);
  menu_button('助手', 497, era_flag.assi < 1);

  // :100-145 调教目标名/助手名按钮（498/499，点进各自状态画面，正文取
  // SAVESTR:TARGET/ASSI）与生命条（@LIFE_BAR）：随角色数据落地（#35 前
  // 实机无角色可显示，这张票留空；SAVESTR 的承载见 #5 已决的 callname）。

  // :148 分隔线
  era.drawLine();

  // :149-188 第二组入口：四个信息面板切换钮（500/501/504/505）。亮 = 当前
  // 面板（FLAG:36），暗 = 未选中。FLAG:36 = 信息面板选择（0=物品/技能、
  // 1=持有陷阱、4=地城概况、5=地城日常），写入随 #24 的分发；未声明读值
  // undefined → || 0 兜底（#13）。
  const active_panel = era.get('flag:36') || 0;
  menu_button('物品/技能', 500, active_panel !== 0);
  menu_button('持有陷阱', 501, active_panel !== 1);
  menu_button('地城概况', 504, active_panel !== 4);
  menu_button('地城日常', 505, active_panel !== 5);

  // :190-200 四个子面板的分发（FLAG:36 → 专用函数，ELSE → 物品/技能）。
  // 地城概况/地城日常自 #180 起为真身（draw_panel 内分发）；物品/陷阱
  // 面板各打一行占位、标注归属（#23 验收），函数体
  // （DRAW_MAINMENU.ERB:331-421）随各自子系统的票移植。
  draw_panel(active_panel);

  // :203-207 分隔线 + 指令面板标题（▌Commands，粗体）
  era.drawLine();
  // :206-207 行首一枚全角空格 + ▌Commands（粗体）
  era.print([{ content: `${FULL_WIDTH_SPACE}▌Commands`, fontWeight: 'bold' }]);

  // :211-219 A/B 计数：A（可选奴隶数）已前移为 count_selectable_slaves，
  // B（被调教过的奴隶数）随用到它的入口。
  //
  // :226-231 [100] 调教 —— 指令面板里**唯一已接入**的入口：分发本体在
  // page-shop.js 的 usershop（#24），调教域自 #44/#45/#47 起可用。原作
  // `PRINTLCD [100] 调教` 是列排版文本 + INPUT，ere 侧改按钮（PR #53 通则：
  // 纯文本行在实机上点不动）；正文不写 [100] 前缀，交给引擎的 showAcc
  // 拼（PR #30）。A == 0 时原作退化为灰色 `[---]` 占位、不可选，此处以
  // 同色不可点文本复现。
  //
  // 没有这一枚按钮，调教入口在实机上根本不存在——SELECT_TARGET 只能经
  // [496] 选人、选完仍回主菜单，玩家无从进入调教（实机撞见）。
  if (count_selectable_slaves() > 0) {
    era.printButton('调教', 100);
  } else {
    era.print([{ content: '[---]', color: MENU_BUTTON_DIM_COLOR }]);
  }

  // :239-243 [102] 地下城 —— 指令面板里第五个接通的真身入口（#180）：
  // 分发在 page-shop.js 的 usershop（DUNGEON_INFO2 真身，ere/page/
  // page-dungeon-info2.js）。原作无 IF 守卫、无条件渲染（:239 的 IF 只切换
  // 文案），照搬；文案依 FLAG:502（2D 模式 =「场子」，普通 =「地下城」——
  // 2D 模式的设定一问随 #181 H12，当前恒 0）。形态同 [100]：列排版文本改
  // 按钮（PR #53），正文不写 [102] 前缀（PR #30）。
  era.printButton((era.get('flag:502') || 0) === 0 ? '地下城' : '场子', 102);

  // :282-283 [109] 侵略 —— 指令面板里第二个接通的真身入口：分发在
  // page-shop.js 的 usershop（#117 起 INVASION 真身 + BEGIN TURNEND 真转场）。
  // 原作无条件渲染（:283 前无 IF 守卫，对照 [100] 的 A > 0）——照搬，不发明
  // 可用性规则。形态同 [100]：原作 `PRINTLCD [109] 侵略` 是列排版文本 +
  // INPUT，ere 侧改按钮（PR #53 通则：纯文本行在实机上点不动）；正文不写
  // [109] 前缀，交给引擎的 showAcc 拼（PR #30）。
  //
  // 没有这一枚按钮，整条侵略线（#117/#118/#120）在实机上入口不存在——
  // 引擎的 input() 只收已打印按钮的快捷键，键入 109 一律「输入不合法」
  // （#129 实机撞见；夹具的 set_inputs 照单全收，验不出这类缺口，防复发
  // 校验见 #130）。
  era.printButton('侵略', 109);

  // :303 [200] 保存 / :306 [300] 读取 —— 指令面板里第三、四个接通的真身
  // 入口：分发在 page-shop.js 的 usershop（200 → save_game、300 →
  // load_game，#136 落地）。原作 `PRINTLCD [200] 保存` / `PRINTLCD [300]
  // 读取` 前均无 IF 守卫，无条件渲染，照搬（同 [109] 的处理，不发明可用性
  // 规则）。正文不写 [200]/[300] 前缀，交给引擎的 showAcc 拼（PR #30）。
  //
  // 缺了这两枚，据点侧存/读档入口在实机上不存在——引擎的 input() 只送达
  // 已打印按钮的快捷键，#136 分发侧虽已接真身，渲染侧从未画过按钮，实机
  // 验收当场撞出（#129 同型复现，#136 勘误评论移交本票 #137）。存读档是
  // 菜单中枢功能，与调教/侵略不同，按钮随分发真身一起落地。
  era.printButton('保存', 200);
  era.printButton('读取', 300);

  // :232-319 指令面板其余各项（[101]-[888] 减去已落地的 [100]/[109]/
  // [200]/[300]，可用性依 A/B 计数与 FLAG 状态）：随各自子系统票落地。
  // 普查（#129）：这些项的分发分支全部仍是存根（usershop 的
  // stub_line_wait），补按钮只会造出「点了打一行占位」的死入口——按钮与
  // 真身同票落地，登记见 docs/stub-registry.md 的 DRAW_MAINMENU 行与
  // @USERSHOP 指令分支表。
  stub_line(
    'DRAW_MAINMENU',
    '指令面板其余各项（[101]-[888] 按钮）渲染',
    '随各自指令子系统票',
  );

  // :320 底部双线
  era.drawLine({ isSolid: true });
}

/**
 * @DRAW_DUNGEON_OVERVIEW（:427-577）：地城概况信息面板（FLAG:36 == 4）。
 *
 * 头行读数（迷宫 Lv / 陷阱 Lv / 勇者初期 Lv）+ 逐层的部下/勇者/迎击/设施
 * 一览（每层一枚 [520+n] 按钮，USERSHOP 的 521-530 分支 → SHOW_FLOOR 存根）
 * + 尾部统计行。
 *
 * 原作 → ere 的映射：TEMP/TEMP1 计数桶 → 局部数组；原作的隔层按钮排版
 * （TEMP1:4 在奇数层行打两枚按钮 [X+520]/[X+1+520]，偶数层行只打数据）
 * 归一为每层一枚按钮——快捷键集合不变（521-530 全覆盖）；两列换行控制
 * （TEMP:98/TEMP1:5）随一行一层排版自然消失；SETFONT 等宽与
 * %…,N,LEFT% 填充不镜像（showAcc 折叠正文空白，PR #30）。
 *
 * @returns {void}
 */
function draw_dungeon_overview() {
  // :432-433 头行读数：CFLAG:0:9（迷宫 Lv，魔王侧）、EXP:0:80（迷宫经验）、
  // FLAG:85（陷阱 Lv）、FLAG:60+1（勇者初期 Lv 的修正量 +1）
  era.print(
    `${FULL_WIDTH_SPACE}迷宫Lv： Lv${era.get('cflag:0:9') || 0} (经验值： ${era.get('exp:0:80') || 0})\u3000\u3000陷阱Lv：Lv${era.get('flag:85') || 0}\u3000\u3000现在的勇者初期Lv： Lv${(era.get('flag:60') || 0) + 1}`,
  );
  // :434-438 统计桶清零 + 两个累计量
  const temp = new Array(100).fill(0);
  let guard_count = 0; // L_近卫（EX_TALENT:x:1 的护卫计数）
  let slave_count = 0; // L_奴隶（非侵攻非9的在场计数）
  // :441-467 逐角色统计（魔王 0 排除）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }
    const state = era.get(`cflag:${cid}:1`) || 0;
    if (state === 2 || state === 3) {
      if (state === 2) {
        // :450-455 1 层以下且攻略度 0 → 「迷宫外」（TEMP:10）；否则按层计数
        const floor = era.get(`cflag:${cid}:501`) || 0;
        if (floor <= 1 && (era.get(`cflag:${cid}:502`) || 0) === 0) {
          temp[10] += 1;
        } else {
          temp[floor] += 1;
        }
        temp[97] += 1; // 勇者总数
      }
      if (state === 3) {
        // :458-462 迎击按层计数（索引 +10 与勇者错开）
        temp[(era.get(`cflag:${cid}:501`) || 0) + 10] += 1;
        temp[96] += 1; // 迎击总数
      }
    }
    // :465-466 近卫（EX_TALENT:x:1）与奴隶（非侵攻非 9）累计
    guard_count += (era.get(`ex_talent:${cid}:1`) || 0) > 0 ? 1 : 0;
    slave_count += state !== 2 && state !== 9 ? 1 : 0;
  }
  // :471-569 逐层一览（Z 扫 100 个怪物槽，每 10 格一层；B/C 部下累计）
  let total_minions = 0; // C（部下总数）
  for (let floor = 1; floor <= 10; floor += 1) {
    // :509-511 B = 该层部下数（ITEM:(Z+100) 的 10 格和）
    let floor_minions = 0;
    for (let slot = 0; slot < 10; slot += 1) {
      floor_minions += era.get(`item:${(floor - 1) * 10 + slot + 100}`) || 0;
    }
    total_minions += floor_minions;
    if (floor !== 10) {
      // :488-498 阶层按钮（[520+n]，USERSHOP → SHOW_FLOOR 的阶层信息入口）
      era.printButton(`第${floor}阶层：`, floor + 520);
      // :523-532 部下 N 只, 勇者：N 人, 迎击：N 人
      const hero_count = temp[floor];
      const interceptor_count = temp[floor + 10];
      const fragments = [
        { content: `部下${floor_minions}只, ` },
        {
          content: `勇者：${hero_count}人`,
          ...(hero_count >= 1 ? { color: 'yellow' } : {}),
        },
        { content: ', ' },
        {
          content: `迎击：${interceptor_count}人\u3000`,
          ...(interceptor_count >= 1 ? { color: '#64a0ff' } : {}),
        },
      ];
      // :533-552 设施名（FLAG:(层+349)，500-507 的映射表）
      const facility = era.get(`flag:${floor + 349}`) || 0;
      const facility_names = {
        500: '商店街\u3000',
        501: '沼泽\u3000\u3000',
        502: '人类牧场',
        503: '冰室\u3000\u3000',
        504: '热砂\u3000\u3000',
        505: '迷宫\u3000\u3000',
        506: '博物馆\u3000',
        507: '娼馆街\u3000',
      };
      fragments.push({
        content: `设施：${facility_names[facility] ?? '无\u3000\u3000\u3000'}`,
      });
      era.print(fragments);
    } else {
      // :556-558 近卫层：近卫兵 N 体（含 L_近卫）+ 迷宫外的勇者 N 人
      //（原文的两枚制表符以全角空格近似——span 渲染对 tab 无对齐语义）
      era.printButton('近卫兵：', floor + 520);
      era.print(
        `${floor_minions + guard_count}体${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}迷宫外的勇者：${temp[10]}人\u3000`,
      );
    }
  }
  // :570-575 空行 + 统计行（肉便器/展品读 FLAG:83/84）
  era.print(FULL_WIDTH_SPACE);
  era.print(
    ` 部下统计：${total_minions}只, 奴隶：${slave_count}人, 勇者：${temp[97]}人, 迎击：${temp[96]}人, 肉便器：${era.get('flag:83') || 0}个, 展品：${era.get('flag:84') || 0}个`,
  );
}

/**
 * @DRAW_DUNGEON_DAILY（:583-601）：地城日常信息面板（FLAG:36 == 5）。
 * 威望值（EX_FLAG:99，钳上界 100）与五档评语；尾部接 DISPLAY_DUNGEON_DAILY
 * （迷宮/DUNGEON_DAILY.ERB:1，随 #179 H10 的日程票——存根占位）。
 *
 * @returns {void}
 */
function draw_dungeon_daily() {
  // :584-586 威望钳上界
  if (era_exflag.prestige >= 100) {
    era_exflag.prestige = 100;
  }
  // :589-599 五档评语（负值无评语——原作 ELSEIF 链未覆盖，照搬）
  let grade = '';
  const prestige = era_exflag.prestige;
  if (prestige <= 20 && prestige >= 0) {
    grade = '【岌岌可危】';
  } else if (prestige <= 40 && prestige > 20) {
    grade = '【动荡不安】';
  } else if (prestige <= 60 && prestige > 40) {
    grade = '【略受质疑】';
  } else if (prestige <= 80 && prestige > 60) {
    grade = '【相安无事】';
  } else if (prestige <= 100 && prestige > 80) {
    grade = '【广受爱戴】';
  }
  era.print(`${FULL_WIDTH_SPACE}威望值：${prestige} ${grade}`);
  // :601 CALL DISPLAY_DUNGEON_DAILY（#179 H10 待移植）
  stub_line(
    'DISPLAY_DUNGEON_DAILY',
    '地城日常的部下日程',
    '随 #179（H10）日程票',
  );
}

/**
 * 主菜单画面组件（#73）：包装 draw_main_menu 的 ScreenBlock。
 *
 * 随 SHOP 状态的进入创建（锚点是会话态——模块级单例会在 TRAIN 转场/重开
 * 后拿上一局的锚点清掉本局内容，page-shop.js 的 run_shop 每次进入时新建，
 * 跨会话测试固定住这一条）。每轮 redraw 由商店轮发起（玩家交互之后）。
 *
 * @returns {ScreenBlock} 未绘制过的主菜单组件（首绘不清屏）
 */
function create_main_menu() {
  return new ScreenBlock(draw_main_menu);
}

module.exports = {
  draw_main_menu,
  create_main_menu,
  reset_out_of_range_pointers,
  count_selectable_slaves,
  draw_dungeon_overview,
  draw_dungeon_daily,
  stub_line,
  STUBBED_CALLS,
};
