/**
 * @file 商店轮（据点主界面）：STATE.SHOP 的处理器。
 *
 * 源: target/ERB/SHOP/SHOP ver1.0.2.ERB  @EVENTSHOP（:4-20，BEGIN SHOP 后
 *     最先执行一次）/@SHOW_SHOP（:22-38，绘制）/@USERSHOP（:40-229，输入
 *     分发，#24 落地；其调用的 @SELECT_TARGET :236 / @SELECT_ASSI :337 在
 *     同文件，函数体未移植、占位）
 *
 * Emuera 语义（引擎行为，非 ERB 函数）：BEGIN SHOP 后引擎先调 @EVENTSHOP
 * 一次，随后循环「@SHOW_SHOP 绘制 → 等输入 → @USERSHOP 分发」。ere 侧把
 * 这一轮收进本模块导出的处理器，由 main-loop.js 的 STATE_HANDLERS 接驳。
 */

const era = require('#/era-electron');
const {
  draw_main_menu,
  reset_out_of_range_pointers,
  count_selectable_slaves,
  stub_line,
} = require('#/page/page-main-menu');
const era_flag = require('#/era-utils/era-flag');

/**
 * 本文件存根化的原作调用名（@SELECT_TARGET/@SELECT_ASSI 的函数体，与
 * 作用域外指令分支的壳占位）。docs/stub-registry.md 必须收录每一个
 * （test/page-shop.test.js 对账钉死）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'SELECT_TARGET',
  'SELECT_ASSI',
  'BEGIN TRAIN',
  'CHARA_INFO',
  'DUNGEON_INFO2',
  '批量处刑',
  'INTERCEPT',
  'ABILITY_UP',
  'CHARA_SALE',
  'ITEM_SHOP',
  'TAILOR_MAIN',
  'INVASION',
  'SECRET_LABO',
  'INFRASTRUCTURE',
  'BEGIN TURNEND',
  'SYSTEM_SAVEGAME',
  'SYSTEM_LOADGAME',
  'CONFIG',
  'MAOUNET',
  'LABO',
  'CHARA_INFO_INDIVIDUAL_WAPPED',
  'SHOW_FLOOR',
  'MONSTER_SHOP',
  'DEBUG_MENU_U',
  'RELATION_DEBUGPRINT',
];

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
 * @SELECT_TARGET（SHOP ver1.0.2.ERB:236-330）：调教目标选择画面。
 *
 * 分页列出可选奴隶、输入循环选人，选中置 TARGET 与 FLAG:1（前回调教
 * 目标）。函数体未移植，占位；返回 0 对应原作「列表为空 / 玩家取消」的
 * RETURN 0——两个调用点（usershop 的 :67-68 与 :153）都按「无选择」处理，
 * 回循环重绘。真身落地（随角色选择票）时改为 async 输入循环。
 *
 * @returns {number} 恒 0（取消语义）
 */
function select_target() {
  stub_line('SELECT_TARGET', '调教目标选择画面', '随角色选择票');
  return 0;
}

/**
 * @SELECT_ASSI（SHOP ver1.0.2.ERB:337-421）：助手选择画面。
 *
 * 与 @SELECT_TARGET 同构（判据换 IS_ASSISTABLE）；返回 0/1/2 = 无助手/
 * 选中/取消。占位同上，返回 0（无助手）。
 *
 * @returns {number} 恒 0（无助手语义）
 */
function select_assi() {
  stub_line('SELECT_ASSI', '助手选择画面', '随角色选择票');
  return 0;
}

/**
 * @USERSHOP（:40-229）：主菜单输入分发（issue #24）。
 *
 * 结构 1:1：整条 IF/ELSEIF 链照原作顺序搬，**没有 ELSE**——认不出的输入
 * （含被守卫拦下的 100/496/497，A == 0 时）落到函数尾（对应 :228 的
 * RETURN 0），回循环重绘，不提示、不报错（原作行为；工单正文「得到提示」
 * 以原作为准修正——原作没有提示，#24 派单核实事实 #5）。
 *
 * 作用域外的指令分支（各子系统调用）按原作结构留壳：运行时打一行占位
 * （原作调用名可检索），真行为整支欠着，docs/stub-registry.md 的
 * 「@USERSHOP 指令分支欠账」节整组登记；落地一张子系统票就把对应壳换成
 * 真调用并销账。壳内的 BEGIN TRAIN / BEGIN TURNEND 是主菜单仅有的两个
 * 出口，目标状态未移植——本票不接 begin()（#24 派单核实事实 #7），未来
 * 接通后主循环进站即报错点名，那是预期行为，不得兜住（核实事实 #6）。
 *
 * @param {number} result 玩家输入（原作 RESULT，即 era.input() 的返回值）
 */
function usershop(result) {
  // :44-57 店内购物段（RESULT 997-999 && BOUGHT >= 0 → 清购物标志 / 跳
  // 商店）：BOUGHT 是 builtin 标量、无 ere 落点（恒 -1 语义，变量级欠账表
  // 已登记），四个条件全部不成立、整段不可达，不搬——键入 999 因此与原作
  // （BOUGHT == -1 时）一致地落到链尾 :222 的调试菜单分支。商店票落地时
  // 恢复本段。
  //
  // A（可选奴隶数）：原作在 @DRAW_MAINMENU :208-216 算出，:59/:152/:154
  // 的守卫读它；渲染与分发两次求值之间无写入路径，分发时重算等价。实机
  // 当前只有角色 0（魔王不计入），A 恒 0——100/496/497 进不去，这是原作
  // 行为，勿为让占位可见而放宽守卫（#24 派单核实事实 #4）。
  const selectable_count = count_selectable_slaves();

  if (result === 100 && selectable_count > 0) {
    // 进调教（:59-101）。本票只移植第一层：无目标（TARGET <= 0）时 CALL
    // SELECT_TARGET，占位恒 0（取消）→ 原作 :67-68 的 SIF RESULT == 0 →
    // RETURN 0，回循环重绘——存根语义下与原作逐行为一致；其后的助手选择
    // 循环（:70-90）、育儿室判定（:91-94）与 :99 的 BEGIN TRAIN 随调教票
    // 落地。已有目标（TARGET >= 1）的直入路径同随调教票，此处占位。
    if (era_flag.target <= 0) {
      select_target();
      return; // :67-68 SIF RESULT == 0 → RETURN 0
    }
    stub_line('BEGIN TRAIN', '调教转场', '随调教票');
  } else if (result === 101) {
    // 能力显示（:102-106）：CALL CHARA_INFO，返回 1 才 BEGIN TURNEND
    // （:105，出口之一）
    stub_line('CHARA_INFO', '能力显示（角色信息画面）', '随角色信息票');
  } else if (result === 102) {
    // 地下城 / 场子（:108；面板按钮文案依 FLAG:502，渲染随指令面板段）
    stub_line('DUNGEON_INFO2', '地下城信息画面', '随迷宫票');
  } else if (result === 103) {
    // 处刑（:110；原作 EXECUTION 的调用已注释，现行调批量处刑）
    stub_line('批量处刑', '处刑（批量处刑）', '随处刑票');
  } else if (result === 104) {
    // 迎击（:113）
    stub_line('INTERCEPT', '迎击', '随迎击票');
  } else if (result === 105) {
    // 能力值提升（:115）
    stub_line('ABILITY_UP', '能力值提升', '随能力票');
  } else if (result === 106) {
    // 贩卖奴隶（:117，可用性判据 B 随指令面板段）
    stub_line('CHARA_SALE', '贩卖奴隶', '随售却票');
  } else if (result === 107) {
    // 购物（:119-120 BOUGHT = 1，下一轮 @SHOW_SHOP 跳 ITEM_SHOP）：BOUGHT
    // 无落点（恒 -1），整支随商店票——占位名沿用函数表的 ITEM_SHOP 行
    stub_line('ITEM_SHOP', '购物（道具商店）', '随商店票');
  } else if (result === 108) {
    // 换装（:121-122 CALL TAILOR_MAIN; TARGET = FLAG:1，FLAG:1 = 前回
    // 调教目标）
    stub_line('TAILOR_MAIN', '换装', '随换装票');
  } else if (result === 109) {
    // 侵略（:124-128 CALL INVASION，返回 1 才 BEGIN TURNEND :127，出口
    // 之一）
    stub_line('INVASION', '侵略', '随侵略票');
  } else if (result === 110 && (era.get('talent:0:325') || 0) === 1) {
    // 实验室（:130-131）：守卫 TALENT:0:325 == 1（魔王的魔界知识，
    // DRAW_HAVEITEMS 的判定同源）。talent 表未落 yml/ 时读值 undefined →
    // || 0 → 守卫不成立（#38 落表后随初始素质生效）
    stub_line('SECRET_LABO', '实验室', '随实验室票');
  } else if (
    result === 111 &&
    ((era.get('flag:83') || 0) !== 0 || (era.get('flag:84') || 0) !== 0)
  ) {
    // 设施·设备（:132-133）：守卫 FLAG:83 || FLAG:84（肉便器 / 展品数，
    // DRAW_DUNGEON_OVERVIEW 的统计同源）
    stub_line('INFRASTRUCTURE', '设施·设备', '随设施票');
  } else if (result === 199) {
    // 休息（:134-138）：内联文本 + FLAG:9 += 5（税金）+ BEGIN TURNEND
    // （出口之一）。半移植会落进「税金加了、回合没结」的错态，整支随
    // 回合结算票
    stub_line('BEGIN TURNEND', '休息（回合结束）', '随回合结算票');
  } else if (result === 200) {
    // 保存（:140）
    stub_line('SYSTEM_SAVEGAME', '保存', '随存档票');
  } else if (result === 300) {
    // 读取（:142）：标题画面的同名占位共用（函数表该行已登记两个调用点）
    stub_line('SYSTEM_LOADGAME', '读取', '随存档票');
  } else if (result === 777) {
    // 设定（:144）
    stub_line('CONFIG', '设定', '随设定票');
  } else if (result === 888) {
    // 通信（:146）
    stub_line('MAOUNET', '通信', '随通信票');
  } else if (result === 400) {
    // LABO（:148；面板无此按钮，2D 迷宫地质相关的隐入口）
    stub_line('LABO', '2D 迷宫实验室', '随迷宫票');
  } else if (result === 496 && selectable_count > 0) {
    // 调教目标（:152-153）：CALL SELECT_TARGET（占位，见上）
    select_target();
  } else if (result === 497 && selectable_count > 0) {
    // 助手（:154-155）：CALL SELECT_ASSI（占位，见上）
    select_assi();
  } else if (result === 498) {
    // 目标名按钮（:156-157）：CALL CHARA_INFO_INDIVIDUAL_WAPPED, TARGET
    // （按钮本体随角色数据票，DRAW_MAINMENU.ERB:100-145）。原作无守卫，
    // 指针未选也一样进分支——1:1
    stub_line('CHARA_INFO_INDIVIDUAL_WAPPED', '角色信息画面', '随角色信息票');
  } else if (result === 499) {
    // 助手名按钮（:158-159）：同上，实参 ASSI
    stub_line('CHARA_INFO_INDIVIDUAL_WAPPED', '角色信息画面', '随角色信息票');
  } else if (result === 500) {
    // 面板切换（:160-161）：置 FLAG:36（信息面板选择）后什么都不做，回
    // 循环重绘——重绘即反馈（对应面板的占位换掉），**不叠占位文本**（#24
    // 派单核实事实 #2）。flag 为引擎内嵌表，未声明下标直写可落（#13 实证，
    // page-main-menu.js 的面板渲染同址读）
    era.set('flag:36', 0);
  } else if (result === 501) {
    // :162-163
    era.set('flag:36', 1);
  } else if (result === 504) {
    // :164-165
    era.set('flag:36', 4);
  } else if (result === 505) {
    // :166-167
    era.set('flag:36', 5);
  } else if (result > 520 && result <= 530) {
    // 阶层信息（:168-170）：RESULT -= 520 → CALL SHOW_FLOOR（10 层为近卫）
    stub_line('SHOW_FLOOR', '阶层信息', '随迷宫票');
  } else if (result === 120) {
    // 召唤（:172-221）：卡拉启动！== 1 时内联卡拉入队事件（SAVEDATA 自
    // 定义变量、无 ere 落点 → 恒非 1）；否则 CHARANUM < MAX_CHARANUM 时
    // CALL MONSTER_SHOP、满员打印「奴隶太多了！」。整支随召唤/怪物票
    stub_line('MONSTER_SHOP', '召唤（怪物商店）', '随怪物票');
  } else if (result === 999) {
    // 调试菜单（:222-223）。店内的 999（:44 清购物标志）因 BOUGHT 无落点
    // 不可达，键入 999 一律到这里——与原作在 BOUGHT == -1 时同路径
    stub_line('DEBUG_MENU_U', '调试菜单', '随调试票');
  }

  // :226-227 链外尾检查（SIF，非 ELSEIF）：未被链上分支提前 RETURN 的
  // 输入再查一次 7788。本链唯一的提前 return 在 100 的取消路径（同原作
  // :68），其余分支落到这里时 result 必非 7788，判定等价。
  if (result === 7788) {
    stub_line('RELATION_DEBUGPRINT', '关系调试打印', '随调试票');
  }
  // :228 RETURN 0：认不出 / 守卫拦下的输入一律落到这里，回 @SHOW_SHOP
  // 重绘（run_shop 的下一轮循环）。原作的 RETURN 0/1 都被引擎循环忽略、
  // 恒重绘，ere 侧无需区分。
}

/**
 * STATE.SHOP 的处理器：@EVENTSHOP 一次 + 「@SHOW_SHOP 绘制 → INPUT →
 * @USERSHOP 分发」的循环。正常情况下永不返回（菜单是游戏的中枢，经 BEGIN
 * 转场离开，如原作 @USERSHOP :99 的 BEGIN TRAIN——随调教票接线后，
 * begin() 的 BeginSignal 从本循环自然上抛、由主循环接站；本模块不写
 * try/catch，不会吞信号，#6 硬约束）。
 */
async function run_shop() {
  eventshop();
  for (;;) {
    show_shop();
    // 引擎侧：玩家点按钮（printButton 的快捷键）或直接键入编号；INPUT 的
    // 返回值即原作 RESULT，交 @USERSHOP 的等价物分发（原作引擎把结果放
    // RESULT 调 @USERSHOP，ere 侧收进 usershop 的形参）。
    usershop(await era.input());
    // 分发完回 @SHOW_SHOP 重绘（原作循环结构）：面板切换类分支（500 等）
    // 的反馈就是这一次重绘；无效输入同路，无提示。
  }
}

module.exports = { run_shop, STUBBED_CALLS };
