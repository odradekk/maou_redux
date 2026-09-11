/**
 * @file 据点主菜单（菜单骨架：状态行 + 六个功能入口 + 四个子面板 + 指令面板）。
 *
 * 源: target/ERB/SHOP/DRAW_MAINMENU.ERB  @DRAW_MAINMENU（:5-325）/
 *     @DRAW_HAVEITEMS（:331-393，#395 起真身）/@DRAW_HAVETRAPS（:400-421，
 *     #395 起真身）/@DRAW_DUNGEON_OVERVIEW（:427-577，#180 起真身）/
 *     @DRAW_DUNGEON_DAILY（:583-601，#180 起真身；尾部的
 *     @DISPLAY_DUNGEON_DAILY（DUNGEON_DAILY.ERB:1）自 #179 起真身，
 *     page/page-dungeon-daily.js）
 *
 * 这张票（#23）范围：状态行（读真实变量）、六个功能入口（能显示、能点选；
 * 点选的分发已落 #24）、防御性修正（:20-39 照实移植）。#395 补全指令面板的
 * 渲染（:203-320 的 [100]-[888]，分发本体在 page-shop.js 的 usershop）与
 * 两个内容子面板（DRAW_HAVEITEMS/DRAW_HAVETRAPS）。作用域外，仍留注释：
 * BGM 段（:11-17）自 #69 起接通（见 draw_main_menu 首段）、调教目标名/
 * 助手名按钮与生命条（:100-145，随角色数据票）。
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
const { display_dungeon_daily } = require('#/page/page-dungeon-daily');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const era_audio = require('#/era-utils/era-audio');
const era_exflag = require('#/era-utils/era-exflag');

// 本文件曾经存根化的原作调用名：DRAW_HAVEITEMS/DRAW_HAVETRAPS/指令面板段
// 均随 #395 转真身，清单归零。留空数组而非删除导出——
// test/page-main-menu.test.js 的核对逻辑按「遍历 STUBBED_CALLS」运作，
// 空数组时循环体不执行，天然通过，删导出反而要连带改测试。
const STUBBED_CALLS = [];

// 原文排版里的全角空格（UNICODE 0x3000）。以转义书写并集中定义：ESLint
// 的 no-irregular-whitespace 拦裸写，prettier 会把字符串里的裸全角空格当
// 可删空白吃掉。
const FULL_WIDTH_SPACE = '\u3000';

/** FLAG:36 → 子面板绘制函数（:190-200，ELSE 回落物品/技能；#395 四支全部真身） */
function draw_panel(active_panel) {
  if (active_panel === 1) {
    draw_have_traps();
    return;
  }
  if (active_panel === 4) {
    draw_dungeon_overview();
    return;
  }
  if (active_panel === 5) {
    draw_dungeon_daily();
    return;
  }
  draw_have_items();
}

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
 * （CFLAG:x:0 > 0 的已调教计数）由下方 [106] 贩卖奴隶入口消费。
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
  // 四支自 #180/#395 起全部真身（draw_panel 内分发）：地城概况/地城日常
  // 随 #180，物品/技能（DRAW_HAVEITEMS）与持有陷阱（DRAW_HAVETRAPS）随
  // 本票（:331-393/:400-421）。
  draw_panel(active_panel);

  // :203-207 分隔线 + 指令面板标题（▌Commands，粗体）
  era.drawLine();
  // :206-207 行首一枚全角空格 + ▌Commands（粗体）
  era.print([{ content: `${FULL_WIDTH_SPACE}▌Commands`, fontWeight: 'bold' }]);

  // :211-219 A/B 计数：A（可选奴隶数）已前移为 count_selectable_slaves，
  // B（被调教过的奴隶数）在下方 [106] 入口消费。
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

  // :232-234 [101] 能力显示 —— CALL CHARA_INFO（存根，随角色信息票）。
  // 守卫 CHARANUM >= 1：魔王自身即角色 0，恒真——照原作保留判据，不发明
  // 可用性规则（同 [109]/[200]/[300] 的处理原则）。
  if (era.getAddedCharacters().length >= 1) {
    era.printButton('能力显示', 101);
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

  // :247-251 [103] 处刑 —— CALL 批量处刑（存根，随处刑票）；守卫 A > 0
  // （同 [100]/[104]，不发明可用性规则）。
  if (count_selectable_slaves() > 0) {
    era.printButton('处刑', 103);
  } else {
    era.print([{ content: '[---]', color: MENU_BUTTON_DIM_COLOR }]);
  }

  // :252-257 [104] 迎击 —— CALL INTERCEPT（存根，随迎击票）；守卫 A > 0。
  if (count_selectable_slaves() > 0) {
    era.printButton('迎击', 104);
  } else {
    era.print([{ content: '[---]', color: MENU_BUTTON_DIM_COLOR }]);
  }

  // :259-265 [105] 能力值提升 —— CALL ABILITY_UP（存根，随能力票）。原作
  // 判据整段被注释掉（`; IF A > 0` / `; ELSE` 两支均带 `;` 前缀失效），
  // 无条件渲染——照搬原作现状，不补一个原作自己都关掉的守卫。
  era.printButton('能力值提升', 105);

  // :267-271 [106] 贩卖奴隶。B > 0 时显示按钮；B 只看
  // CFLAG:0（是否达到出售资格），实际列表再排除濒死/影子/占用角色。
  const sellable_count = era
    .getAddedCharacters()
    .filter(
      (cid) => cid !== 0 && chara(cid).stronghold.出售与助手资格 > 0,
    ).length;
  if (sellable_count > 0) {
    era.printButton('贩卖奴隶', 106);
  } else {
    era.print([{ content: '[---]', color: MENU_BUTTON_DIM_COLOR }]);
  }

  // :272-273 [107] 购物 —— #395 起真身：BOUGHT = 1（分发在 usershop 的
  // 107 分支），下一轮 @SHOW_SHOP 据此跳过主菜单、改打 ITEM_SHOP/
  // ITEM_SHOP_TRAP 存根占位（商店本体随 #399）。原作无条件渲染，照搬——
  // 没有这枚按钮，#399 交付的道具商店在实机上仍进不去（同 [200]/[300] 的
  // #137 教训）。
  era.printButton('购物', 107);

  // :275-281 [108] 换装 —— CALL TAILOR_MAIN（存根，随换装票）；守卫
  // A > 0 && FLAG:37 == 1（FLAG:37 未落表前未声明读值 undefined → || 0 →
  // 恒不成立，落表后随设定生效）。
  if (count_selectable_slaves() > 0 && (era.get('flag:37') || 0) === 1) {
    era.printButton('换装', 108);
  } else {
    era.print([{ content: '[---]', color: MENU_BUTTON_DIM_COLOR }]);
  }

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

  // :285-289 [110] 实验室 —— CALL SECRET_LABO（存根，随实验室票）；守卫
  // TALENT:0:325 == 1（魔王的魔界知识，与 usershop 110 分支的分发守卫
  // 同源）。
  if ((era.get('talent:0:325') || 0) === 1) {
    era.printButton('实验室', 110);
  } else {
    era.print([{ content: '[---]', color: MENU_BUTTON_DIM_COLOR }]);
  }

  // :290-292 [111] 设施·设备：肉便器或博物馆展品存在时才显示。
  if ((era.get('flag:83') || 0) !== 0 || (era.get('flag:84') || 0) !== 0) {
    era.printButton('设施·设备', 111);
  } else {
    era.print([{ content: '[---]', color: MENU_BUTTON_DIM_COLOR }]);
  }

  // :298-299 [120] 召唤 —— CALL MONSTER_SHOP（存根，随怪物/召唤票）；
  // 无条件渲染。
  era.printButton('召唤', 120);

  // :300-301 [199] 休息（回合结束）—— #395 起真身：内联文本 + FLAG:9 +=5
  // （税金）+ BEGIN TURNEND，分发在 page-shop.js 的 usershop。原作无条件
  // 渲染，照搬——做完这一枚，引擎里第一次能把回合推过去（硬约束八）。
  era.printButton('休息', 199);

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

  // :307-308 [777] 设定 —— CALL CONFIG（存根，随设定票）；无条件渲染。
  era.printButton('设定', 777);

  // :309-311 [888] 通信 —— CALL MAOUNET（真身，#350）；无条件渲染——原作
  // 与分发真身早已接通（#350），渲染侧此前从未画过按钮，跨作品数据交换
  // 入口在实机上因此不存在（同 [200]/[300] 的 #137 教训）。
  era.printButton('通信', 888);

  // :320 底部双线
  era.drawLine({ isSolid: true });
}

/**
 * 显示宽度（全角 2 / 半角 1）。原作 %str,width,LEFT% 按此口径计算填充（Emuera 显示
 * 宽度，同 page-save-load.js 的同名助手）。
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
 * 左对齐补空格到指定显示宽度（%str,width,LEFT% 的形态，本文件仅用于物品名）。
 * @param {string} s
 * @param {number} width
 * @returns {string}
 */
function pad_display_left(s, width) {
  const pad = width - display_width(s);
  return pad > 0 ? s + ' '.repeat(pad) : s;
}

/** %ITEMNAME:id%（Item.yml 登记名） */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/**
 * 5 列一行的道具网格步进（DRAW_HAVEITEMS 两段 + DRAW_HAVETRAPS 一段共用，
 * :359-372/:377-390/:404-418 结构相同，仅遍历的 id 范围不同）。
 * ITEM:(id) > 0 才占列；列数到 5 时先补一个全角空格（FULL_WIDTH_SPACE）
 * 换行，再继续本次判定——即使本格是空位也会触发换行（判据在
 * 遍历前置检查，不在打印之后）。
 *
 * @param {{ line: string, column: number }} state 跨调用累积的当前行文本
 *   与已占列数（调用方在段边界处自行决定是否清空——DRAW_HAVEITEMS 的
 *   item91 特例会带着未清空的 line 进入第二段，见该函数头注）
 * @param {number} id 道具 ID
 */
function append_item_slot(state, id) {
  if (state.column >= 5) {
    era.print(`${state.line}${FULL_WIDTH_SPACE}`);
    state.line = '';
    state.column = 0;
  }
  const count = era.get(`item:${id}`) || 0;
  if (count <= 0) {
    return;
  }
  if (state.column === 0) {
    state.line += '  ';
  }
  state.line += `${FULL_WIDTH_SPACE}${pad_display_left(`${item_name(id)}(${count})`, 18)}`;
  state.column += 1;
}

/**
 * @DRAW_HAVEITEMS（:331-393，#395 起真身）：物品/技能面板（FLAG:36 == 0）。
 *
 * 头行（:333-350，ARG:0 恒 0——唯一调用点 :191/:199 都不传参）：技巧 Lv
 * （ABL:MASTER:12）+ 所持知识四枚标签（TALENT:MASTER:55/325/327/328，对应
 * 调合/魔界/淫魔/魔虫）。原作四条 PRINT/PRINTFORM 之间无 PRINTL，是同一
 * 输出行，直到 :350 的 PRINTL 才换行——ere 侧拼成一个字符串、一次 print。
 *
 * :353-356 REPEAT 100 的旧道具枚举整段被 `;` 注释掉（死码），不移植。
 *
 * 两段 5 列网格（:359-372 ids 0-58、:377-390 ids 300-339）+ 装饰的戒指
 * （item 91）特例：:375 的 SIF ITEM:91 是纯PRINTFORM（不换行），紧接着
 * REPEAT 40 从 ARG:98 == 0 起步——戒指文本与第二网格的首个道具共享同一
 * 输出行（无戒指时该行就是第二网格自己的首行）。append_item_slot 维护
 * 跨段共享的 { line, column } 累积态，1:1 保留这个接续关系。
 */
function draw_have_items() {
  const knowledge_tags = [
    [55, '【调合知识】　'],
    [325, '【魔界知识】　'],
    [327, '【淫魔知识】'],
    [328, '【魔虫知识】'],
  ]
    .filter(([id]) => (era.get(`talent:0:${id}`) || 0) === 1)
    .map(([, label]) => label)
    .join('');
  era.print(
    `${FULL_WIDTH_SPACE}技巧Lv： Lv${era.get('abl:0:12') || 0}${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}所持知识： ${knowledge_tags} `,
  );

  const state = { line: '', column: 0 };
  for (let id = 0; id <= 58; id += 1) {
    append_item_slot(state, id);
  }
  era.print(`${state.line}  `);

  state.line = '';
  state.column = 0;
  const ring_count = era.get('item:91') || 0;
  if (ring_count > 0) {
    state.line = `${item_name(91)}(${ring_count}) `;
  }
  for (let id = 300; id <= 339; id += 1) {
    append_item_slot(state, id);
  }
  era.print(`${state.line}  `);
}

/**
 * @DRAW_HAVETRAPS（:400-421，#395 起真身）：持有陷阱面板（FLAG:36 == 1）。无头
 * 行，单一 5 列网格（ids 59-89，共与 DRAW_HAVEITEMS 同构，见 append_item_slot
 * 文件头）。
 */
function draw_have_traps() {
  const state = { line: '', column: 0 };
  for (let id = 59; id <= 89; id += 1) {
    append_item_slot(state, id);
  }
  era.print(`${state.line}  `);
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
 * （迷宮/DUNGEON_DAILY.ERB:1，#179 起真身——page/page-dungeon-daily.js）。
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
  // :601 CALL DISPLAY_DUNGEON_DAILY——#179（H10）起真身
  //（page/page-dungeon-daily.js；随机的三次消费见该文件头）
  display_dungeon_daily();
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
  draw_have_items,
  draw_have_traps,
  STUBBED_CALLS,
};
