/**
 * @file 商店轮（据点主界面）：STATE.SHOP 的处理器。
 *
 * 源: target/ERB/SHOP/SHOP ver1.0.2.ERB  @EVENTSHOP（:4-20，BEGIN SHOP 后
 *     最先执行一次）/@SHOW_SHOP（:22-38，绘制）/@USERSHOP（:40-296，输入
 *     分发——分发体归 issue #24，本票只留接线点）
 *
 * Emuera 语义（引擎行为，非 ERB 函数）：BEGIN SHOP 后引擎先调 @EVENTSHOP
 * 一次，随后循环「@SHOW_SHOP 绘制 → 等输入 → @USERSHOP 分发」。ere 侧把
 * 这一轮收进本模块导出的处理器，由 main-loop.js 的 STATE_HANDLERS 接驳。
 */

const era = require('#/era-electron');
const {
  draw_main_menu,
  reset_out_of_range_pointers,
} = require('#/page/page-main-menu');
const era_flag = require('#/era-utils/era-flag');

/**
 * @EVENTSHOP（:4-20）：每轮 BEGIN SHOP 进入时执行一次。
 */
function eventshop() {
  // :7-12 バグ対策：指针越界钳制（判据的 ID 语义移植说明见
  // page-main-menu.js 的 reset_out_of_range_pointers）。
  reset_out_of_range_pointers();

  // :15-18 REPEAT 100: ITEMSALES:COUNT = 0（清道具上架位）**不移植**：
  // item* 寻址是引擎里唯一在静态表缺失时硬崩的一支（PR #34），yml/ 尚无
  // Item 表；登记 docs/stub-registry.md 变量级欠账，表落地后恢复。
  // :20 BOUGHT = -1：BOUGHT 是 builtin 标量、无 ere 落点，同登记
  // （docs/stub-registry.md 已有该变量的行，本处是第二个定值点）。
}

/**
 * @SHOW_SHOP（:22-38）：绘制一轮主菜单。
 */
function show_shop() {
  // :24 SAVESTR:0 = 你（魔王的存档名字串）：SAVESTR 未落表，消费者（名字
  // 按钮 498/499 等）随角色数据票——登记 docs/stub-registry.md 变量级欠账
  // （#5 已决由内置 callname 承载，接线随彼票）。
  // :25-30 CALL CLEAR_SHOP 与 BOUGHT 跳转（BOUGHT >= 0 才跳，进商店轮时
  // 恒 -1，原作也不触发）：BOUGHT 无落点，整段登记 docs/stub-registry.md
  // 函数级欠账，商店票落地时一并。
  //
  // :33-36 防御性日期修正：月/日小于 1 时钳成 1。@EVENTFIRST 只初始化
  // DAY:1 = 1、DAY 与 DAY:2 留 0（#22 的 1:1 决定），玩家看到的开局因此是
  // 「第 0 年 1 月 1 日（第 1 日）」——修正只发生在 SHOP 侧，勿挪去初始
  // 化侧（#22 验收移交的提醒）。
  if (era_flag.month < 1) {
    era_flag.month = 1;
  }
  if (era_flag.date < 1) {
    era_flag.date = 1;
  }

  // :38 CALL DRAW_MAINMENU（本体在 DRAW_MAINMENU.ERB，ere 侧同构拆分到
  // page/page-main-menu.js）
  draw_main_menu();
}

/**
 * STATE.SHOP 的处理器：@EVENTSHOP 一次 + 「@SHOW_SHOP 绘制 → INPUT →
 * @USERSHOP 分发」的循环。正常情况下永不返回（菜单是游戏的中枢，经 BEGIN
 * 转场离开，如原作 @USERSHOP :98 的 BEGIN TRAIN——分发体落地 #24 后，
 * begin() 的 BeginSignal 从本循环自然上抛、由主循环接站；本模块不写
 * try/catch，不会吞信号，#6 硬约束）。
 */
async function run_shop() {
  eventshop();
  for (;;) {
    show_shop();
    // 引擎侧：玩家点按钮（printButton 的快捷键）或直接键入编号
    await era.input();
    // @USERSHOP（:40-296）：输入分发归 issue #24（六个入口、指令面板、
    // 无效输入）。当前输入被消费后直接进入下一轮 SHOW_SHOP 重绘（原作
    // 结构：分发完回 @SHOW_SHOP）。
  }
}

module.exports = run_shop;
