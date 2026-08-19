/**
 * @file 据点主菜单（菜单骨架：状态行 + 六个功能入口 + 四个子面板存根）。
 *
 * 源: target/ERB/SHOP/DRAW_MAINMENU.ERB  @DRAW_MAINMENU（:5-325；末尾另附
 *     四个子面板函数 @DRAW_HAVEITEMS :331 / @DRAW_HAVETRAPS :400 /
 *     @DRAW_DUNGEON_OVERVIEW :427 / @DRAW_DUNGEON_DAILY :583，本票全部存根）
 *
 * 本票（#23）范围：状态行（读真实变量）、六个功能入口（能显示、能点选；
 * 点选的分发已落 #24）、防御性修正（:20-39 照实移植）。作用域外，各留注释或
 * 存根：BGM 段（:11-17）自 #69 起接通（见 draw_main_menu 首段）、调教目标
 * 名/助手名按钮与生命条（:100-145）、四个子面板的内容（:190-197 的分发照搬、
 * 函数体存根）、指令面板的渲染（:203-319，随首个指令子系统票；分发本体在
 * page-shop.js 的 usershop）。
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
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）——后续票据此认领工作；名单变动必须同步清单。
 *
 * 注：DRAW_MAINMENU 指 @DRAW_MAINMENU 的指令面板段（:208-319，[100]-[888]
 * 按钮渲染）——函数本体的骨架已实现（#23），占位的是这一段；输入分发本体
 * 在 page/page-shop.js 的 usershop（#24）。
 */
const STUBBED_CALLS = [
  'DRAW_HAVEITEMS',
  'DRAW_HAVETRAPS',
  'DRAW_DUNGEON_OVERVIEW',
  'DRAW_DUNGEON_DAILY',
  'DRAW_MAINMENU',
];

// 原文排版里的全角空格（UNICODE 0x3000）。以转义书写并集中定义：ESLint
// 的 no-irregular-whitespace 拦裸写，prettier 会把字符串里的裸全角空格当
// 可删空白吃掉。
const FULL_WIDTH_SPACE = '\u3000';

// :190-197 四个子面板的分发表：FLAG:36 的取值 → 原作函数。owner 是认领该
// 面板的子系统（票号未定，见 docs/stub-registry.md 的归属列）。
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
  4: {
    erb_name: 'DRAW_DUNGEON_OVERVIEW',
    label: '地城概况面板',
    owner: '随迷宫子系统票',
  },
  5: {
    erb_name: 'DRAW_DUNGEON_DAILY',
    label: '地城日常面板',
    owner: '随迷宫/日程子系统票',
  },
};

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
  // 单线；逐字对拍归 #9。
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
  // loop/fade，欠账见 docs/stub-registry.md）。PLAYBGM 循环 → 显式 loop。
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
  // 实机无角色可显示，本票留空；SAVESTR 的承载见 #5 已决的 callname）。

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
  // 面板内容全部存根：各打一行占位、标注归属（#23 验收）；函数体
  // （DRAW_MAINMENU.ERB:331-601）随各自子系统的票移植。
  const panel = PANEL_STUBS[active_panel] ?? PANEL_STUBS[0];
  stub_line(panel.erb_name, panel.label, panel.owner);

  // :203-207 分隔线 + 指令面板标题（▌Commands，粗体）
  era.drawLine();
  // :206-207 行首一枚全角空格 + ▌Commands（粗体）
  era.print([{ content: `${FULL_WIDTH_SPACE}▌Commands`, fontWeight: 'bold' }]);

  // :211-219 A/B 计数：A（可选奴隶数）已前移为 count_selectable_slaves，
  // B（被调教过的奴隶数）随用到它的入口。
  //
  // :226-231 [100] 调教 —— 指令面板里**唯一已接线**的入口：分发本体在
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

  // :232-319 指令面板其余各项（[101]-[888]，可用性依 A/B 计数与 FLAG
  // 状态）：随各自子系统票落地。
  stub_line(
    'DRAW_MAINMENU',
    '指令面板其余各项（[101]-[888] 按钮）渲染',
    '随各自指令子系统票',
  );

  // :320 底部双线
  era.drawLine({ isSolid: true });
}

/**
 * 主菜单画面组件（#73）：包装 draw_main_menu 的 ScreenBlock。
 *
 * 随 SHOP 状态的进入创建（锚点是会话态——模块级单例会在 TRAIN 转场/重开
 * 后拿上一局的锚点清掉本局内容，page-shop.js 的 run_shop 每次进入时新建，
 * 跨会话测试钉死这一条）。每轮 redraw 由商店轮发起（玩家交互之后）。
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
  stub_line,
  STUBBED_CALLS,
};
