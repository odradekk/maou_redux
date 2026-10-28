/**
 * @file 道具店与陷阱店的独立循环（issue #867）。
 *
 * 两个商店各是一屏、各自的按键，循环留在这里：进店 → 画当前这一屏 → 等
 * 输入 → 分派 →（切换商店或成交后）重画。此前靠把购入品指针（FLAG:10029）
 * 设成 1 让商店轮在下一轮改画商店屏，输入还回主菜单分发口处理——商店的
 * 状态散在「指针的值」里，读它的人有三处，写它的人有四处。改动后商店的
 * 状态只有本函数的一个局部量，进出店不再借任何 flag。
 *
 * 输入分派（与官方例程的商店一致）：
 *   - 0-99（販売アイテム数）：进购买流程，两个商店共用同一套
 *     （page-item-shop.js 的 purchase）；
 *   - 998 / 997：道具店 ↔ 陷阱店互切（各自只印自己那一枚：道具店印
 *     [998] 去陷阱店，陷阱店印 [997] 回道具店）；
 *   - 999：退出商店，回据点主菜单。
 *
 * 每屏绘制前清一遍在售位：两个商店的 saleitem_check 只负责点亮本店的货，
 * 不清上一家的（清与亮分居两处是既有结构）。
 *
 * 这里不做转场：商店不是游戏状态，退出后调用方（主菜单的 [107]）拿回
 * 控制权、回主菜单循环重绘。
 */

'use strict';

const era = require('#/era-electron');
const {
  clear_shop,
  item_shop,
  purchase,
  SHOP_ITEM_COUNT,
} = require('#/page/page-item-shop');
const { item_shop_trap } = require('#/page/page-shop-trap');

/** 退出商店的键（两店共用） */
const EXIT_KEY = 999;
/** 道具店的「去陷阱店」键 */
const TO_TRAP_KEY = 998;
/** 陷阱店的「回道具店」键 */
const TO_ITEM_KEY = 997;

/**
 * 商店循环：两个商店轮流占用输入，直到玩家按 [999] 退出。
 *
 * @returns {Promise<void>} 退出即返回，调用方回主菜单
 */
async function shop_loop() {
  // 当前在哪个店里。这个局部量替代了此前落进存档的购入品指针
  let in_trap_shop = false;
  for (;;) {
    clear_shop();
    if (in_trap_shop) {
      await item_shop_trap();
    } else {
      await item_shop();
    }
    const result = await era.input();
    if (result === EXIT_KEY) {
      break;
    }
    // 切店只翻局部量：下一轮画另一家，输入仍在本循环里
    if (result === TO_TRAP_KEY && !in_trap_shop) {
      in_trap_shop = true;
      continue;
    }
    if (result === TO_ITEM_KEY && in_trap_shop) {
      in_trap_shop = false;
      continue;
    }
    if (result >= 0 && result < SHOP_ITEM_COUNT) {
      await purchase(result);
    }
    // 其余输入无反应：回循环重画同一屏（引擎只送达已打印按钮的编号，
    // 买不起的商品不在其中——见 print_shopitem 的 disabled）
  }
  // 离店前清货架：下一轮进店由 saleitem_check 重新点亮
  clear_shop();
}

module.exports = { shop_loop };
