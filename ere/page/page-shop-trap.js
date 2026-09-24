/**
 * @file 陷阱商店：@ITEM_SHOP_TRAP 与 @SALEITEM_CHECK_TRAP。
 *
 * 源: target/ERB/SHOP/SHOP_TRAP.ERB  @ITEM_SHOP_TRAP（:7-70，绘制）
 *     @SALEITEM_CHECK_TRAP（:75-128，在售标志）
 *
 * **#399 补齐的两笔**：原作 :63 的引擎命令 `PRINT_SHOPITEM`（把 ITEMSALES
 * 不为 0 的商品连同价格列出来、点击即买）与 :59 的 `TFLAG:15 = MONEY`
 * 都已落地——列货与购买流程是**两个商店共用的一套**，真身在
 * page/page-item-shop.js（`print_shopitem` / `purchase` / `snapshot_money`）；
 * 玩家点中的编号由 page-shop.js 的输入分发（販売アイテム数 = 100 的判据）
 * 交给 purchase，@EVENTBUY 的三支分派与账目也都在那边。
 *
 * **进店路径**（原作两条，两条都通了）：@SHOW_SHOP :25-30 的 BOUGHT ≥ 54
 * 跳转（买下 54 号【淫魔知识】后 BOUGHT 停在 54，见 page-item-shop.js 的
 * @EVENTBUY），与道具商店里的 [998] 键（@USERSHOP :47-50）。
 *
 * 布局映射（原作 → ere）：
 *   - :10 `CUSTOMDRAWLINE =` 的 `=` 线以 era.drawLine({isSolid: true})
 *     近似（page-select-target.js:271 / page-save-load.js:345 先例）；
 *   - :68-69 两个 `PRINTLC`（左对齐补位、**不换行**——正确语义与技能指南的
 *     勘误见 CONTEXT.md「输出 API 与原作的对应」）以 setAlign('center') 包
 *     一次 era.print 近似排版，随后还原 'left'（page-main-menu.js:149-174
 *     的 ALIGNMENT 先例）；
 *   - :23-26/:39-41 的 SETCOLORBYNAME LightSalmon … RESETCOLOR 以片段自带
 *     color 承载（equip-print.js:32 先例，CSS 色名直通渲染层）；
 *   - 引擎每次 print 调用即一行：原作不换行的 PRINT/PRINTV/PRINTFORM 串
 *     一律合成一次 era.print（:13-19 的日期行、:31/:46 的网格格子）。
 *
 * 出口（$INPUT_LOOP / :63 之后的提示行）分属两处：本函数是「绘制半」，
 * 由 page-shop.js 的 show_shop（BOUGHT ≥ 54 的跳转）与 usershop（998 分支的
 * JUMP）经 era 的商店轮循环驱动；购买本身的循环（原作 :61 的 $INPUT_LOOP
 * 标签、:63 的 PRINT_SHOPITEM 之后接 @EVENTBUY）落在 page/page-item-shop.js
 * 的 purchase 与 @EVENTBUY 族——#399 起两个商店共用一套。
 */

'use strict';

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { print_shopitem, snapshot_money } = require('#/page/page-item-shop');
const { pad_display } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/** SETCOLORBYNAME LightSalmon 的 ere 等价物（:23/:39） */
const LIGHT_SALMON = 'LightSalmon';

/** 陷阱商品段（:28 `FOR ICOUNT_A,60,92`——上界开区间，即 60..91） */
const TRAP_IDS = { start: 60, end: 92 };

/** 戒指商品段（:43 `FOR ICOUNT_A,300,321`——即 300..320） */
const RING_IDS = { start: 300, end: 321 };

/** 每行几格（:33/:48 `IF ICOUNT_B % 5 == 0`） */
const COLUMNS = 5;

/** 每格的显示宽度（:31/:46 `%…,16,LEFT%`） */
const CELL_WIDTH = 16;

/**
 * 基础在售段（:77-94）：无守卫，逐行照搬。
 * :96-109 淫魔知识（TALENT:0:327 == 1）二选一，
 * :112-113 魔虫知识（TALENT:MASTER:328 == 0）单独点亮 56，
 * :116-120 `== 1` 时追加 65/79/80，:123 戒指恒亮，
 * :125-126 陷阱等级（FLAG:85 < CFLAG:0:9）追加 55。
 */
const SALES_ALWAYS = [
  60, 61, 62, 63, 69, 72, 73, 74, 75, 76, 77, 78, 81, 82, 83, 84, 85, 87,
];
const SALES_EROTIC = [64, 65, 66, 67, 68, 70, 71, 79]; // えっちな陷阱
const SALES_SUCCUBUS_KNOWLEDGE = [54]; // 淫魔知识
const SALES_WORM_BASE = [56]; // SIF TALENT:MASTER:328 == 0
const SALES_WORM_EXTRA = [65, 79, 80]; // TALENT:MASTER:328 == 1
const SALES_RING = [91];
const SALES_LEVEL_TRAP = [55];

/** %ITEMNAME:id%（Item.yml 登记名） */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/**
 * @SALEITEM_CHECK_TRAP（:75-128）：点亮本商店的在售位。只写 1——清零是
 * 商店轮 @EVENTSHOP 的 REPEAT 100（page-shop.js:95-97）与 CLEAR_SHOP 的
 * 职责（后者 #399 起在 page/page-item-shop.js）。
 *
 * @returns {number} 原作 RETURN 0
 */
function saleitem_check_trap() {
  for (const id of SALES_ALWAYS) {
    era.set(`itemsales:${id}`, 1);
  }

  if ((era.get('talent:0:327') || 0) === 1) {
    // :96-105 えっちな陷阱（魔王的淫魔知识）
    for (const id of SALES_EROTIC) {
      era.set(`itemsales:${id}`, 1);
    }
  } else {
    // :106-109 淫魔知识
    for (const id of SALES_SUCCUBUS_KNOWLEDGE) {
      era.set(`itemsales:${id}`, 1);
    }
  }

  // :112-113 魔虫知识**不在**时点亮 56（SIF，单一语句的 IF）
  if ((era.get('talent:0:328') || 0) === 0) {
    for (const id of SALES_WORM_BASE) {
      era.set(`itemsales:${id}`, 1);
    }
  }

  // :116-120 魔蟲知識でも手に入る罠
  if ((era.get('talent:0:328') || 0) === 1) {
    for (const id of SALES_WORM_EXTRA) {
      era.set(`itemsales:${id}`, 1);
    }
  }

  // :123 指輪
  for (const id of SALES_RING) {
    era.set(`itemsales:${id}`, 1);
  }

  // :125-126 陷阱Lv（严格小于：相等不点亮 55）
  if (game.stronghold.陷阱等级 < (era.get('cflag:0:9') || 0)) {
    for (const id of SALES_LEVEL_TRAP) {
      era.set(`itemsales:${id}`, 1);
    }
  }

  return 0; // 原作尾的 RETURN 0（:75-128 的收尾）
}

/**
 * 一段持有商品网格（:27-38 陷阱 / :42-53 戒指，两段同构）。
 *
 * 原作排布：`SIF ITEM:ICOUNT_A == 0 → CONTINUE`（持有 0 个不占格），
 * 否则打 `[%ITEMNAME:ICOUNT_A + @"(x{ITEM:ICOUNT_A})",16,LEFT%]`——每格
 * 由字面方括号包住一个补到 16 显示宽度的「名字(xN)」，每满 5 格换一行；
 * 段尾若未满整行再补一次换行（`SIF ICOUNT_B % 5 > 0 → PRINTL`），
 * 一段一个格子都没有时不补（0 % 5 == 0）。
 *
 * @param {{ start: number, end: number }} range 商品 id 段（上界开区间）
 * @returns {string[]} 逐行文本（引擎每次 print 即一行的等价物）
 */
function item_grid_rows({ start, end }) {
  const rows = [];
  let row = '';
  let column = 0;
  for (let id = start; id < end; id += 1) {
    const count = era.get(`item:${id}`) || 0;
    if (count === 0) {
      continue;
    }
    row += `[${pad_display(`${item_name(id)}(x${count})`, CELL_WIDTH)}]`;
    column += 1;
    if (column % COLUMNS === 0) {
      rows.push(row);
      row = '';
    }
  }
  if (column % COLUMNS > 0) {
    rows.push(row);
  }
  return rows;
}

/**
 * @ITEM_SHOP_TRAP（:7-70）：陷阱商店的绘制半。
 *
 * 由 page-shop.js 的 show_shop（BOUGHT ≥ 54 → 原作 :29 的 JUMP）与 usershop
 * （998 分支 → 原作里的 JUMP ITEM_SHOP_TRAP）调用，等价于原作把商店界面
 * 整个接管本轮。
 *
 * @returns {Promise<number>} 原作落进 @SALEITEM_CHECK_TRAP 之后无 RETURN，
 *   隐式返回 0（函数体在末尾的 PRINTL 之后结束）
 */
async function item_shop_trap() {
  // :11 标题（:10-12 的 CUSTOMDRAWLINE = 与 DRAWLINE 一并见文件头布局映射）
  era.print('《可以购买在地下城里布置的陷阱》');
  era.drawLine({ isSolid: true });
  // :13-19 PRINTV DAY+1 / PRINT 日 / PRINTL  午前|午后（PRINT 后的第一个
  // 空格是语法分隔符，字面量余一个前导空格——同 DRAW_MAINMENU:64-71）
  era.print(
    `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
  );
  // :21
  era.print(`[所持金:${era_flag.money}点]`);

  // :23-26 SETCOLORBYNAME LightSalmon → RESETCOLOR
  era.print([
    { content: `[陷阱Lv:${game.stronghold.陷阱等级}]`, color: LIGHT_SALMON },
  ]);
  era.print([{ content: '[陷阱]', color: LIGHT_SALMON }]);
  // :27-38
  for (const row of item_grid_rows(TRAP_IDS)) {
    era.print(row);
  }

  // :39-41 SETCOLORBYNAME LightSalmon → RESETCOLOR
  era.print([{ content: '[戒指]', color: LIGHT_SALMON }]);
  // :42-53
  for (const row of item_grid_rows(RING_IDS)) {
    era.print(row);
  }

  era.drawLine({ isSolid: true }); // :55-57 DRAWLINE + CALL SALEITEM_CHECK_TRAP
  saleitem_check_trap(); // :57 CALL SALEITEM_CHECK_TRAP
  snapshot_money(); // :59 TFLAG:15 = MONEY（所持点を一時保存；#399 起落表）

  // :61 $INPUT_LOOP：购买循环的重新进入点，原作的循环本体是 :63 的
  // PRINT_SHOPITEM + 引擎侧购买。era 侧的重绘由 page-shop.js 的商店轮
  // 循环承担（998 分支再调一次本函数），购买本身由该轮的分发交给
  // page-item-shop.js 的 purchase，故此处不设标签。

  // :63 PRINT_SHOPITEM（#399 起真身，两个商店共用）
  print_shopitem();

  // :65-70 提示行（两个键印成按钮：本屏已有商品按钮，rule 会收紧到那批
  // 编号，纯文本的 997/999 就再也键入不进了——#130 的输入通道语义）
  era.print('《请输入要购买陷阱的编号》');
  era.drawLine({ isSolid: true }); // :65-70 段的 DRAWLINE
  // :68-69 两个 PRINTLC 打在同一行，紧随的 PRINTL 只结束那一行——PRINTLC
  // 左对齐补位、**不换行**，故不产生空行。ere 的 printButton 自成一行
  // （＝ PRINTLC + 收尾的 PRINTL），不再补空行（语义与勘误见 CONTEXT.md
  // 「输出 API 与原作的对应」）。
  era.setAlign('center'); // :68-69 PRINTLC（排版近似：见 CONTEXT.md）
  era.printButton('- 普通物品', 997);
  era.printButton('- 返回', 999);
  era.setAlign('left');

  return 0;
}

module.exports = { item_shop_trap, saleitem_check_trap };
