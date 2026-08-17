/**
 * @file 据点主菜单（菜单骨架：状态行 + 六个功能入口 + 四个子面板存根）。
 *
 * 源: target/ERB/SHOP/DRAW_MAINMENU.ERB  @DRAW_MAINMENU（:5-325；末尾另附
 *     四个子面板函数 @DRAW_HAVEITEMS :331 / @DRAW_HAVETRAPS :400 /
 *     @DRAW_DUNGEON_OVERVIEW :427 / @DRAW_DUNGEON_DAILY :583，本票全部存根）
 *     target/ERB/其他/DRAW_EXT_COMM.ERB  @MENU_BUTTON（:2，按钮明暗的近似）
 *
 * 本票（#23）范围：状态行（读真实变量）、六个功能入口（能显示、能点选；
 * 点选的分发已落 #24）、防御性修正（:20-39 照实移植）。作用域外，各留注释或
 * 存根：BGM（:11-17）、调教目标名/助手名按钮与生命条（:100-145）、四个
 * 子面板的内容（:190-197 的分发照搬、函数体存根）、指令面板的渲染
 * （:203-319，随首个指令子系统票；分发本体在 page-shop.js 的 usershop）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
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

// @MENU_BUTTON（DRAW_EXT_COMM.ERB:2-13）的近似：未选中（ARG:2 == 1）时
// SETCOLOR(GETDEFCOLOR() - 0x444444) 把颜色调暗，打印后 RESETCOLOR。ere 侧
// 以按钮 color 配置近似——引擎渲染层实测（app.asar）：color 直通 el-button
// 的 --el-button-text-color，须为 CSS 颜色串（hover 态会在其后拼透明度后缀，
// 命名色会拼出非法值，故用十六进制）。GETDEFCOLOR() 取 Emuera 默认前景色白
// 0xFFFFFF，按通道减 0x444444 = 0xBBBBBB。
const MENU_BUTTON_DIM_COLOR = '#bbbbbb';

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

/**
 * @MENU_BUTTON（DRAW_EXT_COMM.ERB:2）的等价物：打印一个菜单按钮，未选中时
 * 调暗（近似的说明见 MENU_BUTTON_DIM_COLOR）。
 *
 * 按钮正文一律不写 [编号] 前缀：引擎 showAcc 默认为真，渲染时自动拼成
 * `[快捷键] 正文`，手写前缀会得到「[496] [496] ▌调教目标」（PR #30）。
 * 原作正文里的 ▌ 是 UNICODE(0x258c)，保留。
 *
 * @param {string} label 按钮正文（不含 ▌，本函数统一加）
 * @param {number} accelerator 按钮编号（原作 ARG:3，输入分发用）
 * @param {boolean} dim 未选中标志（原作 ARG:2：真 = 调暗）
 */
function menu_button(label, accelerator, dim) {
  era.printButton(
    `▌${label}`,
    accelerator,
    dim ? { color: MENU_BUTTON_DIM_COLOR } : undefined,
  );
}

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

  era.setAlign('right'); // :49 ALIGNMENT RIGHT（仅本行右对齐）
  const fragments = [
    {
      // :50-55 行首两枚全角空格，随后
      // 第{DAY/365}年+全角空格+{DAY:1}月{DAY:2}日（第{DAY+1}日）
      content: `${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}第${Math.floor(era_flag.day_count / 365)}年${FULL_WIDTH_SPACE}${era_flag.month}月${era_flag.date}日（第${era_flag.day_count + 1}日）`,
      fontWeight: 'bold', // :48 FONTBOLD（整行粗体，片段级携带）
    },
  ];
  // :56-58 SIF DAY:2 == 15 → PRINT 《满月》（SETCOLORBYNAME Yellow；'yellow'
  // 是合法 CSS 颜色名，文本片段的 color 直通 span 样式，app.asar 实证）
  if (era_flag.date === 15) {
    fragments.push({
      content: '《满月》',
      color: 'yellow',
      fontWeight: 'bold',
    });
  }
  // :59-66 TIME == 0 → 上午、ELSE → 下午（前导一个半角空格是 PRINT 的
  // 分隔符后残文）；随后两枚全角空格 + (所持金：{MONEY} pts.) + 两枚全角空格
  fragments.push({
    content: ` ${era_flag.time === 0 ? '上午' : '下午'}${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}(所持金：${era_flag.money} pts.)${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}`,
    fontWeight: 'bold',
  });
  era.print(fragments);
  era.setAlign('left'); // :71 ALIGNMENT LEFT（还原，后续行左对齐）
}

/**
 * 绘制据点主菜单（@DRAW_MAINMENU 的骨架）。
 *
 * @SHOW_SHOP 每轮调用（ere 侧见 page/page-shop.js）；本函数自身不循环、
 * 不清屏（Emuera 控制台追加式滚动，ere 同构）。原作 :41/:323 的 REDRAW
 * 0/1（抑制逐行重绘防闪烁）无 ere 对应语义，不镜像。
 */
function draw_main_menu() {
  // :11-17 BGM：IF 是否启用背景音乐 == 1 → PLAYBGM "据点2.mp3" +
  // SETBGMVOLUME 背景音乐音量。整段不接：res/ 为空、resource: false，
  // 音频领域未决议（issue #23 作用域外，与标题画面 #19 同裁决）。开关变量
  // 本身也无处落：是否启用背景音乐/背景音乐音量 是 #DIM SAVEDATA（随存档
  // 的自定义变量，音声的全局变量.erh:3-4）而非 GLOBAL——与标题音乐的
  // GLOBAL 不同类，按 EX_FLAG 先例登记 docs/stub-registry.md 变量级欠账，
  // 音频票落表后在此接 playMusic。另：该开关无声明默认值（新档 0 = 不播），
  // 原作新档本来也不播 BGM，缺此段不改变开局行为。
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

  // :190-198 四个子面板的分发（FLAG:36 → 专用函数，ELSE → 物品/技能）。
  // 面板内容全部存根：各打一行占位、标注归属（#23 验收）；函数体
  // （DRAW_MAINMENU.ERB:331-601）随各自子系统的票移植。
  const panel = PANEL_STUBS[active_panel] ?? PANEL_STUBS[0];
  stub_line(panel.erb_name, panel.label, panel.owner);

  // :203-207 分隔线 + 指令面板标题（▌Commands，粗体）
  era.drawLine();
  // :206-207 行首一枚全角空格 + ▌Commands（粗体）
  era.print([{ content: `${FULL_WIDTH_SPACE}▌Commands`, fontWeight: 'bold' }]);

  // :208-319 指令面板（[100]-[888] 按钮的渲染，可用性依 A/B 计数与 FLAG
  // 状态）：按钮渲染随首个指令子系统票落地——A 的计算已前移为本文件的
  // count_selectable_slaves，届时直接复用。输入分发本体已在 page-shop.js
  // 的 usershop（#24，壳占位见彼处）；本段只欠渲染。
  stub_line(
    'DRAW_MAINMENU',
    '指令面板（[100]-[888] 按钮）渲染',
    '随首个指令子系统票',
  );

  // :320 底部双线
  era.drawLine({ isSolid: true });
}

module.exports = {
  draw_main_menu,
  reset_out_of_range_pointers,
  count_selectable_slaves,
  stub_line,
  STUBBED_CALLS,
};
