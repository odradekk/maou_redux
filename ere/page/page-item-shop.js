/**
 * @file 道具商店（issue #399 / N15 段 3）。
 *
 * == 购买流程（EraElectron 没有内置的商品列表命令与购买回调，本文件自备） ==
 *
 * 商店列出 ITEMSALES 不为 0 的商品（名字 + 价格），点编号即买。点中之后
 * 依次做五步：
 *
 *   1. 检查 ITEMSALES:BOUGHT 与 ITEMPRICE:BOUGHT（不满足则无声退回输入）；
 *   2. BOUGHT = 选中编号；
 *   3. ITEM:BOUGHT += 1（先给货）；
 *   4. MONEY -= ITEMPRICE:BOUGHT（先扣钱）；
 *   5. 调 event_buy（买/退都在这上面做——记账用的单价与扣款用的 ITEMPRICE
 *      同值，逐条与 yml/Item.yml 的 price 对过）。
 *
 * 本文件把它拆成两块：
 *
 *   - `print_shopitem()`＝列货（绘制半）；
 *   - `purchase(item_id)`＝上面五步（含 ITEMSALES/MONEY 两个校验、先给货
 *     先扣钱、再调 `event_buy`），由商店轮的输入分发调用（`BOUGHT >= 0`
 *     时编号 0-99 的输入走这里，其余交 page-shop.js 的 usershop——可购
 *     编号上限 100，见 SHOP_ITEM_COUNT）。
 *
 * == 有意偏离（逐条注明依据） ==
 *
 * 1. **TFLAG:15（进店时暂存所持金）改放模块内暂存**。据点期没有 tflag
 *    表（beginTrain 建、endTrain 删；page-shop-trap.js 的实测），
 *    写二段直接抛 key error。它只在一次购买交互内被读写（取消时把 MONEY
 *    还原到进店时的值），不需要进存档，故放在模块级的 `temp_money`；
 *    item_shop 每次绘制都会重置它，即「每进一次商店重新保存一次」。
 * 2. **ISASSI 判断条件精简**（三处 `ISASSI:COUNT == 1` 检查）。ISASSI
 *    是角色 CSV 的独立字段，本作全部 Chara CSV 都没写、也没有任何赋值
 *    路径（与 #339 在 stronghold/sale.js 的查实同一结论），故
 *    「在岗助手持调合/秘密知识」两段恒不达：`M` 只由魔王自己的素质决定。
 *    保留这些条件会读一个没有落点的变量，精简为注释。
 * 3. **输入循环由 ere 侧承担**。商店的输入改由 page-shop.js 的商店轮 +
 *    本文件内部的 `await era.input()` 循环承担，重绘时机定为「整屏重绘」
 *    （与 #396 陷阱商店同样的偏离，玩家可见差异是商店头两段一并重画）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { trap_price } = require('#/dungeon/dungeon-trap');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { item_detox } = require('#/system/equip/item-detox');
const { life_list } = require('#/page/page-life-list');
const { chara_callname } = require('#/utils/callname-utils');
const { pad_display } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/**
 * 金额单位：价格与状态行按「数值 + pts.」显示（位置在后，如
 * 「(所持金：800 pts.)」）。游戏自写的文案（如「加上2025点金钱」）带的是
 * 字面量「点」，与本常数无关。
 */
const MONEY_UNIT = 'pts.';

/** 标签行染色的颜色名 */
const LIGHT_SALMON = 'LightSalmon';

/** TALENT 读数缺省处理（#13：未声明下标读回 undefined，按 0 计） */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * 在售标志段：clear_shop 清全段，page-shop.js 的 EVENTSHOP 链只清 0-99。
 * 上界是开区间 300。
 */
const SALES_COUNT = 300;

/**
 * clear_shop：把可购道具位清空（ITEMSALES:0-299 = 0）。
 *
 * 本文件不调用它；调用点全在 page-shop.js：show_shop 每轮重绘前一次，
 * usershop 退出（999）与切换商店（998/997）时各一次，见该文件的注释。
 */
function clear_shop() {
  for (let i = 0; i < SALES_COUNT; i += 1) {
    era.set(`itemsales:${i}`, 0);
  }
}

/** 初始在售位的上界（开区间 24） */
const BASE_SALES_COUNT = 24;

/** 围裙、电极接头、拘束衣スーツ（已在 0-23 段内，有意再写一遍） */
const EXTRA_NON_CONSUMABLES = [19, 21, 23];

/** ビデオカメラ・搾乳器・肛珠（写在「已持有下架」**之前**） */
const ALWAYS_NON_CONSUMABLES = [6, 17, 20];

/** 消耗系道具（无前置条件的一段） */
const CONSUMABLES = [24, 25, 34, 35];

/** ビデオテープ（要持有摄像机 ITEM:6） */
const VIDEO_TAPE = 28;

/** 调合知识（TALENT:MASTER:55）点亮的药品系 */
const BLEND_ITEMS = [26, 27, 29, 31, 40, 41];

/** 营养剂：与药品系同条件，两处条件有意不合并（既有行为） */
const NUTRITION = 30;

/** 【调合知识】素质编号（TALENT:MASTER:55） */
const BLEND_TALENT = 55;
/** 【秘密知識】素质编号（TALENT:MASTER:325） */
const SECRET_TALENT = 325;
/** 【魅力鳞甲】素质编号（TALENT:MASTER:91，ラブダイナミックス的下架条件） */
const LOVE_DYNAMICS_TALENT = 91;

/** 秘密アイテム（33） */
const SECRET_ITEM = 33;

/** 各消耗品的持有上限（持有 >= 99 下架） */
const STOCK_LIMITED = [24, 25, 26, 27, 28, 34, 35];
const STOCK_LIMIT = 99;

/** 好感测定仪（持有即下架） */
const LOVE_METER = 37;
/** ラブダイナミックス */
const LOVE_DYNAMICS = 38;
/** 秘密知识道具 */
const SECRET_KNOWLEDGE_ITEM = 39;
/** 调合知识道具 */
const BLEND_KNOWLEDGE_ITEM = 42;
/** 技巧等级道具 */
const TECHNIQUE_ITEM = 52;
/** 经验值道具 */
const EXP_ITEM = 53;

/** 技巧等级上限（`ABL:MASTER:12 >= 10`） */
const TECHNIQUE_MAX = 10;

/** 难度档（FLAG:5）里不出售ラブダイナミックス的两档 */
const HARD_LEVELS = [3, 4];

/**
 * 魔王的调合知识是否成立（M 的初值）。
 *
 * 遍历全部角色的助手段判的是
 * `CFLAG:COUNT:1 >= 1 && ISASSI:COUNT == 1`（在岗的助手）持有调合/秘密
 * 知识——ISASSI 在本作恒 0（文件头第 2 条），三段恒不达，故 M 只看魔王。
 * @param {number} talent_id 素质编号（调合知识 / 秘密知识）
 * @returns {boolean}
 */
function master_has(talent_id) {
  return talent(0, talent_id) !== 0;
}

/**
 * saleitem_check：点亮本商店的在售位。
 *
 * 置位顺序即覆盖顺序（后写覆盖先写）：初始 0-23 → 三件非消耗品 → 营养剂
 * （调合知识）→ 三件无条件非消耗品 → 已持有的非消耗品下架 → 消耗品与
 * 录像带 → 药品系（调合知识）→ 秘密アイテム（秘密知识）→ 消耗品持有
 * 上限 → 器材与素质道具的逐个条件。
 *
 * @returns {number} 0（无显式返回值）
 */
function saleitem_check() {
  // 初始在售
  for (let i = 0; i < BASE_SALES_COUNT; i += 1) {
    era.set(`itemsales:${i}`, 1);
  }
  // 围裙、电极接头、拘束衣スーツ（0-23 段已含，有意再写一遍）
  for (const id of EXTRA_NON_CONSUMABLES) {
    era.set(`itemsales:${id}`, 1);
  }

  // 营养剂：调合知识（主人或助手的素质）
  era.set(`itemsales:${NUTRITION}`, 0);
  if (master_has(BLEND_TALENT)) {
    era.set(`itemsales:${NUTRITION}`, 1);
  }

  // 三件无条件非消耗品
  for (const id of ALWAYS_NON_CONSUMABLES) {
    era.set(`itemsales:${id}`, 1);
  }

  // 已持有的非消耗品下架（条件是「恰好 1 件」）
  for (let i = 0; i < BASE_SALES_COUNT; i += 1) {
    if ((era.get(`item:${i}`) || 0) === 1) {
      era.set(`itemsales:${i}`, 0);
    }
  }

  // 消耗品与录像带
  for (const id of CONSUMABLES) {
    era.set(`itemsales:${id}`, 1);
  }
  if (era.get('item:6') || 0) {
    era.set(`itemsales:${VIDEO_TAPE}`, 1);
  }

  // 药品系道具：同「调合知识」条件
  for (const id of [...BLEND_ITEMS, NUTRITION]) {
    era.set(`itemsales:${id}`, 0);
  }
  if (master_has(BLEND_TALENT)) {
    for (const id of BLEND_ITEMS) {
      era.set(`itemsales:${id}`, 1);
    }
    // 营养剂在药品系那段之外单独置 1（既有行为，有意不合并）
    era.set(`itemsales:${NUTRITION}`, 1);
  }

  // 秘密アイテム
  era.set(`itemsales:${SECRET_ITEM}`, 0);
  if (master_has(SECRET_TALENT)) {
    era.set(`itemsales:${SECRET_ITEM}`, 1);
  }

  // 消耗品持有上限
  for (const id of STOCK_LIMITED) {
    if ((era.get(`item:${id}`) || 0) >= STOCK_LIMIT) {
      era.set(`itemsales:${id}`, 0);
    }
  }

  // 好感测定仪（持有即下架）
  era.set(`itemsales:${LOVE_METER}`, 1);
  if (era.get(`item:${LOVE_METER}`) || 0) {
    era.set(`itemsales:${LOVE_METER}`, 0);
  }

  // ラブダイナミックス（已持有素质 或 HARD/POWERFUL 难度 → 下架）
  era.set(`itemsales:${LOVE_DYNAMICS}`, 1);
  if (talent(0, LOVE_DYNAMICS_TALENT) === 1) {
    era.set(`itemsales:${LOVE_DYNAMICS}`, 0);
  }
  const difficulty = era.get('flag:5') || 0;
  if (HARD_LEVELS.includes(difficulty)) {
    era.set(`itemsales:${LOVE_DYNAMICS}`, 0);
  }

  // 秘密知识道具
  era.set(`itemsales:${SECRET_KNOWLEDGE_ITEM}`, 1);
  if (talent(0, SECRET_TALENT) === 1) {
    era.set(`itemsales:${SECRET_KNOWLEDGE_ITEM}`, 0);
  }

  // 调合知识道具
  era.set(`itemsales:${BLEND_KNOWLEDGE_ITEM}`, 1);
  if (talent(0, BLEND_TALENT) === 1) {
    era.set(`itemsales:${BLEND_KNOWLEDGE_ITEM}`, 0);
  }

  // 技巧等级道具（上限 10，且不超过堕とした人数 + 2）
  era.set(`itemsales:${TECHNIQUE_ITEM}`, 1);
  const technique = era.get('abl:0:12') || 0;
  if (technique >= TECHNIQUE_MAX || technique > (era.get('flag:30') || 0) + 1) {
    era.set(`itemsales:${TECHNIQUE_ITEM}`, 0);
  }

  // 经验值道具（无条件）
  era.set(`itemsales:${EXP_ITEM}`, 1);
}

/** %ITEMNAME:id%（Item.yml 登记名） */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/** %ITEMPRICE:id%（Item.yml 的 price，缺号回落 0） */
function item_price(id) {
  return era.get(`itemprice:${id}`) || 0;
}

/**
 * 一段「持有道具」网格（第一段 / 第二段）。
 *
 * 排布：持有 0 个的道具不占格，每格 `[正文补到 width 显示宽度]`，
 * 每满 5 格换行，段尾未满行再补一次换行；一段一格都没有时不补（0 % 5 == 0）。
 *
 * @param {number} start 段起点（含）
 * @param {number} end 段终点（不含）
 * @param {(id: number) => string} text 格子正文（两段的宽度与后缀不同）
 * @param {number} width 格子正文的填充宽度
 * @param {number[]} [skip] 段内跳过的序号（第二段跳过 29-31）
 * @returns {string[]} 逐行文本（每行一次 print）
 */
function item_grid_rows(start, end, text, width, skip = []) {
  const rows = [];
  let row = '';
  let column = 0;
  for (let id = start; id < end; id += 1) {
    if (skip.includes(id)) {
      continue;
    }
    const count = era.get(`item:${id}`) || 0;
    if (count === 0) {
      continue;
    }
    row += `[${pad_display(text(id), width)}]`;
    column += 1;
    if (column % GRID_COLUMNS === 0) {
      rows.push(row);
      row = '';
    }
  }
  if (column % GRID_COLUMNS > 0) {
    rows.push(row);
  }
  return rows;
}

/** 每行几格 */
const GRID_COLUMNS = 5;

/** 第一段的格子宽度（10 字符左对齐） */
const FIRST_GRID_WIDTH = 10;
/** 第二段的格子宽度（20 字符左对齐） */
const SECOND_GRID_WIDTH = 20;

/** 第一段的上界（开区间 24） */
const FIRST_GRID_END = 24;
/** 第二段的上界（开区间 36） */
const SECOND_GRID_START = 24;
const SECOND_GRID_END = 36;
/** 第二段里被跳过的三个序号（29-31） */
const SECOND_GRID_SKIP = [29, 30, 31];

/**
 * 列货：把在售商品（ITEMSALES 不为 0，标签 + 价格）列成按钮，accelerator ＝
 * 道具序号——点中即进购买流程（page-shop.js 的购物段把 0-99 的输入交给
 * purchase）。
 *
 * 扫描面是引擎的 itemkeys（Item.yml 的登记序号全集，dev-guides/09-static.md
 * 「itemkeys」条），按序号升序；**价格用 ITEMPRICE**（购买流程的校验与
 * 扣款都用它，见文件头），单位取配置的 `pts.`（MONEY_UNIT）。按钮不禁用：
 * 买不起的商品也能点，回应是无声退回输入（引擎「判定失败 → 重新输入」
 * 的既定行为）——用 disabled 表达买不起会把这个无声语义变成不可达。
 */
function print_shopitem() {
  const ids = (era.get('itemkeys') || []).slice().sort((a, b) => a - b);
  for (const id of ids) {
    if (!(era.get(`itemsales:${id}`) || 0)) {
      continue;
    }
    era.printButton(`${item_name(id)}（${item_price(id)}${MONEY_UNIT}）`, id);
  }
}

/**
 * TFLAG:15（进店时暂存所持金）的 ere 落点：据点期没有 tflag 表，改用
 * 模块内暂存（文件头第 1 条）。item_shop 每次绘制都重置它，购买流程的
 * 取消路径（event_buy/buy_plural/use_item 的退还）读它。
 */
let temp_money = 0;

/** TFLAG:15 的读数（测试与 event_buy 的退还路径用） */
function get_temp_money() {
  return temp_money;
}

/**
 * TFLAG:15 = MONEY（进店时暂存所持金）：两个商店在各自绘制时各存一次
 * （文件头第 1 条）。
 */
function snapshot_money() {
  temp_money = era_flag.money;
}

/**
 * item_shop：道具商店的绘制半 + 提示行。
 *
 * 由 page-shop.js 的 show_shop（BOUGHT 0-53 时跳过主菜单直接进店）调用，
 * 整个接管本轮。购买本身不在这里：ere 侧的购买落在 page-shop.js 商店轮的
 * 输入分发（文件头第 3 条）。
 *
 * @returns {Promise<number>} 0（无显式返回值）
 */
async function item_shop() {
  // 本屏的分隔线走实线（page-shop-trap.js 同款近似）
  era.print('黑市商人');
  era.print('《可以购买用于调教的物品》');
  era.drawLine({ isSolid: true }); // 实线分隔
  // 日期行（DAY+1 日 午前|午后）
  era.print(
    `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
  );
  era.print(`[所持金:${era_flag.money}点]`);

  // 标签行染色（LightSalmon）
  era.print([
    { content: `[技巧Lv:${era.get('abl:0:12') || 0}]`, color: LIGHT_SALMON },
  ]);
  era.print([{ content: '[调教道具一览]', color: LIGHT_SALMON }]);
  // 第一段（持有道具，0-23）
  for (const row of item_grid_rows(
    0,
    FIRST_GRID_END,
    (id) => item_name(id),
    FIRST_GRID_WIDTH,
  )) {
    era.print(row);
  }

  // 标签行染色（LightSalmon）
  era.print([{ content: '[消耗型调教道具一览]', color: LIGHT_SALMON }]);
  // 第二段（消耗型道具，24-35 去掉 29-31）
  for (const row of item_grid_rows(
    SECOND_GRID_START,
    SECOND_GRID_END,
    (id) => `${item_name(id)}(所持:${era.get(`item:${id}`) || 0})`,
    SECOND_GRID_WIDTH,
    SECOND_GRID_SKIP,
  )) {
    era.print(row);
  }

  era.drawLine({ isSolid: true });
  saleitem_check();
  snapshot_money(); // TFLAG:15 = MONEY（文件头第 1 条）

  // 列货（见 print_shopitem）
  print_shopitem();

  // 提示行
  era.print('《请输入要购买的道具的编号》');
  era.drawLine({ isSolid: true });
  // 页脚两键打在同一行、不换行（见 CONTEXT.md「输出 API 的排版与对齐」），
  // printButton 自成一行（打完即收行），不再补空行。
  era.setAlign('center'); // 居中
  era.printButton('- 陷阱', 998, { align: 'center' });
  era.printButton('- 返回', 999, { align: 'center' });
  era.setAlign('left');

  return 0;
}

// ================================================================
// 购买流程（event_buy 族）
// ================================================================

/**
 * 販売アイテム数（可购编号上限，标准值 100）：0-99 的输入进购买流程、
 * 其余交 page-shop.js 的 usershop。
 */
const SHOP_ITEM_COUNT = 100;

/** 复数购买的道具（`BOUGHT == …` 九项） */
const PLURAL_ITEMS = [24, 25, 26, 27, 28, 34, 35, 53, 55];
/** 复数购买的第二段条件 `BOUGHT >= 60 && BOUGHT != 90`（陷阱与戒指） */
const PLURAL_RANGE_START = 60;
const PLURAL_EXCLUDE = 90;
/** 当场使用型道具 */
const USE_ITEMS = [29, 30, 31, 32, 33, 40, 41];

/**
 * 复数购买的单价表（`BOUGHT == n → A = …` 逐条）。与 yml/Item.yml 的
 * price 同值（本文件头：记账的 A 与扣款的 ITEMPRICE 必须一致）。
 */
const PLURAL_PRICES = {
  24: 100,
  25: 200,
  26: 2000,
  27: 1000,
  28: 500,
  34: 5000,
  35: 700,
  53: 1000,
  55: 5000,
  91: 100, // （戒指）
};

/**
 * 简单确认路径的记账额（`BOUGHT == n → EX_FLAG:4444 -= …` 逐条）。
 * 同样与 yml/Item.yml 的 price 同值（0-23 与 37）。
 */
const SIMPLE_LEDGER = {
  0: 200,
  1: 500,
  2: 2000,
  3: 5000,
  4: 2000,
  5: 4000,
  6: 7000,
  7: 2000,
  8: 3000,
  9: 1000,
  10: 200,
  11: 2000,
  12: 4000,
  13: 5000,
  14: 3000,
  15: 8000,
  16: 30000,
  17: 1500,
  18: 5000,
  19: 10000,
  20: 7000,
  21: 50000,
  22: 3000,
  23: 10000,
  37: 1000, // 好感测定仪
};

/** 开局不变量常数（MONEY == EX_FLAG:4444 + 8766） */
const LEGIT_MONEY_BASE = 8766;

/**
 * 当场使用型道具的退还额（`BOUGHT == n → MONEY += …` 逐条）。与
 * yml/Item.yml 的 price 同值；32 号无退项（也不在售）。
 */
const USE_REFUNDS = {
  29: 500,
  30: 1000,
  31: 3000,
  33: 100000,
  40: 2000,
  41: 2000,
};

/** 药品系三支的生效记账额（`EX_FLAG:4444 -= …` 逐条） */
const USE_LEDGER = {
  29: 500,
  30: 1000,
  31: 3000,
  33: 100000,
  40: 2000,
  41: 2000,
};

/**
 * 购买的五步（文件头）：校验 → BOUGHT → 给货 → 扣钱 → event_buy。
 *
 * 两个校验不通过时**无声退回输入**（guide 的 system-flow「判定失败 →
 * 重新输入」）：本函数直接返回，商店轮重绘同一屏。按钮侧的输入通道只会
 * 送达已打印按钮的快捷键，故这两个校验只能经直调观察（同 #130 的约定）。
 *
 * @param {number} item_id 玩家选中的道具序号（RESULT/BOUGHT）
 * @returns {Promise<number>} event_buy 的返回值（1 = 已成交、0 = 取消）
 */
async function purchase(item_id) {
  if (!(era.get(`itemsales:${item_id}`) || 0)) {
    return 0; // 判定失败（不在售）
  }
  const price = item_price(item_id);
  if (era_flag.money < price) {
    return 0; // 判定失败（钱不够）
  }
  era_flag.bought = item_id; // BOUGHT 设定
  era.add(`item:${item_id}`, 1); // ITEM 增加
  era_flag.money -= price; // MONEY 减少
  return event_buy(item_id);
}

/**
 * event_buy：购买回调。三支按固定顺序：复数购买 → 当场使用 → 简单确认。
 *
 * @param {number} bought 购买的道具序号（BOUGHT）
 * @returns {Promise<number>} 1 = 成交 / 0 = 取消
 */
async function event_buy(bought) {
  // 複数持てるアイテム
  // 末段 `BOUGHT >= 60 && BOUGHT != 90` 与前面八个 `||` 同层混写：左折叠
  // （&& 与 || 同优先级）应读作 `(九项 || BOUGHT >= 60) && BOUGHT != 90`；
  // 九项都 < 60、BOUGHT == 90 又不在九项里，左折叠与 C 式分组在一切取值上
  // 同值，故这里按显式括号保留结构（#517）。
  if (
    PLURAL_ITEMS.includes(bought) ||
    (bought >= PLURAL_RANGE_START && bought !== PLURAL_EXCLUDE)
  ) {
    await buy_plural(bought);
    return 1;
  }
  // その場で使うアイテム
  if (USE_ITEMS.includes(bought)) {
    await use_item(bought);
    era.set(`item:${bought}`, 0);
    return 1;
  }

  // 購入確認（0 好的 / 1 不要，其余重问；#572 起两项升格为按钮，
  // 「其余」由引擎按白名单拒收，重问支不可达，结构保留）
  for (;;) {
    era.print(`确定购买${item_name(bought)}？`);
    era.printButton('- 好的', 0); // （正文保留 `- `）
    era.printButton('- 不要', 1);
    const result = await era.input();
    if (result === 1) {
      // 取消：退还货与钱、重建记账不变量（TFLAG:15 的暂存值）
      era.set(`item:${bought}`, (era.get(`item:${bought}`) || 0) - 1);
      era_flag.bought = 0;
      era_flag.money = get_temp_money();
      era_exflag.legit_money = get_temp_money() - LEGIT_MONEY_BASE;
      return 0;
    }
    if (result === 0) {
      break;
    }
  }

  // 《购买了…》
  era.print(`《购买了${item_name(bought)}》`);
  // 逐条的记账额（0-23 与 37）
  const ledger = SIMPLE_LEDGER[bought];
  if (ledger !== undefined) {
    era_exflag.legit_money -= ledger;
  }

  // 素質アイテム・ラブダイナミックス（38）
  if (bought === 38) {
    era_exflag.legit_money -= 100000;
    era.print(
      `《${chara_callname(0)}掌握了【${era.get('talentname:91') ?? ''}】》`,
    );
    chara(0).chara.魅惑 = 1;
    era.set(`item:${bought}`, 0);
  }
  // 素質アイテム【秘密知識】（39）
  if (bought === 39) {
    era_exflag.legit_money -= 100000;
    chara(0).stronghold.魔界知识 = 1;
    era.set(`item:${bought}`, 0);
  }
  // 素質アイテム【调合知识】（42）
  if (bought === 42) {
    era_exflag.legit_money -= 40000;
    chara(0).stronghold.调合知识 = 1;
    era.set(`item:${bought}`, 0);
  }
  // 素質アイテム【技巧LV】（52）：难度档的倍率段整段不启用，
  // 现行实现只有一条 technique_of_master_up 调用
  if (bought === 52) {
    technique_of_master_up();
  }
  // 素質アイテム【淫魔知识】（54）：买完 ITEMSALES:54 熄灭——玩家
  // 自此只能在陷阱商店买淫魔的陷阱（BOUGHT 停在 54，下一轮跳陷阱商店）
  if (bought === 54) {
    era_exflag.legit_money -= 100000;
    chara(0).stronghold.淫魔知识 = 1;
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 0);
    era.print('* 可以购买淫魔的陷阱了 *');
  }
  // 素質アイテム【魔虫知识】（56）
  if (bought === 56) {
    era_exflag.legit_money -= 10000;
    chara(0).stronghold.魔虫知识 = 1;
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 0);
    era.print('* 一些陷阱被强化了 *');
  }

  await era.waitAnyKey();
  return 1;
}

/**
 * 数量选择的提示行（首次与越界后重画两处）。
 *
 * **两处不同形**：首次的选项行多一段 `D/2`（仅在 `D/2 > 20` 时出现），
 * 越界后的重画没有（直接从 `[20] - [` 接 `{D}]`）。差异保留，两边不同形。
 *
 * @param {number} bought 道具序号
 * @param {number} d 本次可买的最大数量
 * @param {boolean} [with_half] 是否带 `D/2` 那一段（首次 true、重画 false）
 */
function print_quantity_prompt(bought, d, with_half = true) {
  era.print(`要买多少${item_name(bought)}？（1-${d}、0返回）`);
  const options = [0, 1, 5, 10, 20];
  const half = Math.trunc(d / 2);
  if (with_half && half > 20) {
    options.push(half);
  }
  options.push(d);
  era.print(`${options.map((n) => `[${n}]`).join(' - ')} 买空钱包`);
}

/**
 * 经验值道具（BOUGHT == 53）的使用对象选择。
 *
 * 这里是选人内循环：角色列表 + 翻页 + 选人，选中后 `EXP:RESULT:80 += E`。
 * 尾检查（`RESULT == 1000 || 1001 → 回选人循环`）在主条件之外，但两条
 * 捷径在内层已被页翻处理吃掉、其余值早被驳回，**恒不可达**，不移植
 * （逐条注明：#391 的既定处理）。
 *
 * @param {number} count 购买数量（RESULT）
 * @returns {Promise<void>}
 */
async function use_exp_item(count) {
  const gained = count * 10; // E = RESULT * 10
  let no_page = 0; // #DIM NO_PAGE（缺省 0）
  for (;;) {
    era.drawLine();
    era.print(`要让谁使用${item_name(EXP_ITEM)}？`);
    life_list(no_page, 0);
    era.setAlign('center');
    era.printButton('- 上一页', 1000);
    era.printButton('- 下一页', 1001);
    era.setAlign('left');

    const result = await era.input();
    if (result === 1000) {
      // 上一页（首页再按无反应，退回选人）
      if (no_page > 0) {
        no_page -= 1;
        continue;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页
      if ((no_page + 1) * 20 <= era.getAddedCharacters().length) {
        no_page += 1;
      }
      continue;
    }
    // 非法目标 → 重问
    if (!era.getAddedCharacters().includes(result)) {
      continue;
    }
    // 卖却済み・臨死中的角色不可选
    if ((era.get(`cflag:${result}:1`) || 0) !== 0) {
      era.print('此人物尚不可选择');
      continue;
    }
    // 经验值到手（RESULT == 0 即魔王，MASTER 也是 0）
    chara(result).dungeon.战斗经验 = chara(result).dungeon.战斗经验 + gained;
    era.print(`得到了${gained}点经验值`);
    return;
  }
}

/**
 * buy_plural：复数购买（数量选择 → 结算 → 三支尾处理）。
 *
 * 买空/取消/越界的四支行为：取消退还原价（购买流程已扣一份），越界打印两种
 * 文案后重问，成交按 `RESULT` 结算 `ITEM`/`MONEY`/`EX_FLAG:4444`。
 *
 * @param {number} bought 道具序号
 * @returns {Promise<number>} 0/1
 */
async function buy_plural(bought) {
  // 单价
  let a = PLURAL_PRICES[bought];
  if (bought >= PLURAL_RANGE_START && bought < PLURAL_EXCLUDE) {
    // 陷阱段的单价走 trap_price（价表在 DUNGEON_TRAP）
    a = trap_price(bought);
  }

  // 上限：B* 是可持数（100 - 已持有）、C 是钱够买几件（＋引擎
  // 已扣的 1 件）、D 取小、E 记是哪一侧吃紧（0 = 持有上限、1 = 钱）
  const b = 100 - (era.get(`item:${bought}`) || 0);
  const c = Math.trunc(era_flag.money / a) + 1;
  let d;
  let e;
  if (b <= c && bought !== 53) {
    d = b;
    e = 0;
  } else {
    d = c;
    e = 1;
  }
  // 陷阱等级不能越过地下城的阶层上限
  const trap_level = game.stronghold.陷阱等级;
  const maze_level = era.get('cflag:0:9') || 0;
  if (bought === 55 && trap_level + d > maze_level) {
    d = maze_level - trap_level;
  }

  // 首次提示（输入循环由本函数的 for 承担）
  print_quantity_prompt(bought, d);

  /** 输入的返回值（成交分支之后还要用它） */
  let result;
  for (;;) {
    result = await era.input();
    if (result === 0) {
      // 取消：退还原价（引擎已扣一份）
      era.set(`item:${bought}`, (era.get(`item:${bought}`) || 0) - 1);
      era_flag.money += a;
      return 0;
    }
    if (result < 0) {
      continue;
    }
    if (result > d) {
      // 越界：两种文案（E 记的哪一侧吃紧）＋重画提示
      era.print(e === 0 ? '不能持有这么多' : '哪怕是魔王，也不能赊账啊');
      print_quantity_prompt(bought, d, false); // 的重画不带 D/2 档
      continue;
    }
    if (result === 1) {
      // 买一件（钱在购买流程已扣）：一支一次等键
      era_exflag.legit_money -= a;
      era.print(`《购买了${item_name(bought)}》`);
      await era.waitAnyKey();
    } else {
      // 买 RESULT 件：购买流程已给 1 件、已扣 1 件的钱；这里也是
      // 一次等键，别在分支外再等一次（玩家会多按一键）
      era.print(`《购买了${result}个${item_name(bought)}》`);
      await era.waitAnyKey();
      era.set(`item:${bought}`, (era.get(`item:${bought}`) || 0) + result - 1);
      era_flag.money -= a * (result - 1);
      era_exflag.legit_money -= a * result;
    }
    break;
  }

  // 経験値アイテム（53）：买完转「让谁使用」的角色选择
  if (bought === 53) {
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 1);
    await use_exp_item(result);
  }

  // 陷阱LV（55）
  if (bought === 55) {
    // 判定式是 `LOCAL <= CFLAG:0:9 || LOCAL <= CFLAG:MASTER:9`——两个
    // 地址是同一个角色（MASTER = 0），故等价于上一条。ELSE 支
    // （「必须先提高魔王的等级！」，退钱退款）**恒不可达**：
    // RESULT ∈ [1, D] 且 D 已被钳到 `CFLAG:0:9 - FLAG:85`，
    // 于是 LOCAL = FLAG:85 + RESULT <= CFLAG:0:9 恒成立——照 #391 的
    // 既定处理精简，不移植（保留它等于留一段没有用例能站到另一侧的代码）。
    era.print(`《陷阱上升到Lv${result}》`);
    game.stronghold.陷阱等级 = trap_level + result;
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 1);
  }

  // 指輪（91）：一枚一枚进 ITEM:300，超过 99 的部分原价退还
  if (bought === 91) {
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 1);
    game.stronghold.装饰戒指 = game.stronghold.装饰戒指 + result;
    if ((era.get('item:300') || 0) > 99) {
      const x = (era.get('item:300') || 0) - 99;
      era_flag.money += x * 100;
      era_exflag.legit_money += x * 100;
      game.stronghold.装饰戒指 = 99;
      era.print('退还了多余的戒指');
    }
  }

  return 0;
}

// ================================================================
// 当场使用型道具（use_item 族）
// ================================================================

/**
 * 使用对象选择菜单的两个翻页按钮与退出键。
 *
 * 选择面是本页的角色列表（life_list；分页与行渲染归 page-life-list.js，
 * 本函数只管逐轮重画与键位分派，即选人内循环）。
 *
 * @param {number} bought 道具序号（BOUGHT）
 * @returns {Promise<void>}
 */
async function use_item(bought) {
  /** #DIM NO_PAGE（缺省 0） */
  let no_page = 0;
  for (;;) {
    era.drawLine();
    // 道具效果一行（每种道具一句）
    const effect = USE_EFFECTS[bought];
    if (effect) {
      era.print(`${item_name(bought)}:${effect}`);
    }
    era.print(`要让谁使用${item_name(bought)}？`);
    era.drawLine();
    life_list(no_page);
    era.setAlign('center'); // 居中
    era.printButton('- 上一页', 1000);
    era.printButton('- 返  回', 999);
    era.printButton('- 下一页', 1001);
    era.setAlign('left');

    const result = await era.input();
    if (result === 999) {
      // 取消：吃掉这件道具并按种类退钱（32 号无退项）
      era.set(`item:${bought}`, 0);
      const refund = USE_REFUNDS[bought];
      if (refund !== undefined) {
        era_flag.money += refund;
      }
      return;
    }
    if (result === 1000) {
      // 上一页（首页再按无反应：整块退回首屏重画）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页
      if ((no_page + 1) * 20 <= era.getAddedCharacters().length) {
        no_page += 1;
      }
      continue;
    }
    if (!era.getAddedCharacters().includes(result)) {
      continue;
    }
    // RESULT == 0 是魔王本人（ere 侧角色号 0 就是 MASTER）
    if ((era.get(`base:${result}:0`) || 0) < 1) {
      continue; // 売却済み・臨死中
    }
    // 体力已满时营养剂用不了
    if (
      bought === 30 &&
      (era.get(`base:${result}:0`) || 0) ===
        (era.get(`maxbase:${result}:0`) || 0)
    ) {
      era.print(`${chara_callname(result)}的体力已经达到了最大值`);
      await era.waitAnyKey();
      continue;
    }
    // 否定点数已是 0 时熏香用不了
    if (bought === 31 && (era.get(`juel:${result}:100`) || 0) < 1) {
      era.print(
        `${chara_callname(result)}的${era.get('palamname:100') ?? ''}点数已经不能再减少了`,
      );
      await era.waitAnyKey();
      continue;
    }
    // 没有【爱慕】或没有寿命限制时 WG 电池用不了
    if (
      bought === 33 &&
      ((era.get(`base:${result}:10`) || 0) === 0 ||
        (era.get(`talent:${result}:85`) || 0) === 0)
    ) {
      era.print(`${chara_callname(result)}已经不受寿命限制了`);
      await era.waitAnyKey();
      continue;
    }
    // 妊娠中・育儿中的角色用不了排卵促进剂
    // 该段条件 `BOUGHT == 40 && TALENT:RESULT:153 || TALENT:RESULT:154` 同层
    // 混写：该层运算符序列是「`&&` … `||`」，`||` 之后没有 `&&`，左折叠与 C 式
    // 分组得到同一棵树——两种读法在一切取值上同值，故按显式括号保留结构（#517）。
    if (
      bought === 40 &&
      ((era.get(`talent:${result}:153`) || 0) !== 0 ||
        (era.get(`talent:${result}:154`) || 0) !== 0)
    ) {
      if (era.get(`talent:${result}:153`) || 0) {
        era.print(
          `怀孕中的${chara_callname(result)}不能使用${item_name(bought)}`,
        );
      } else {
        era.print(
          `育儿中的${chara_callname(result)}不能使用${item_name(bought)}`,
        );
      }
      await era.waitAnyKey();
      continue;
    }
    apply_use_effect(bought, result);
    await era.waitAnyKey(); // 每支末尾等一次键
    return;
  }
}

/** 效果说明行（道具序号 → 说明） */
const USE_EFFECTS = {
  29: '从寄生状态中恢复',
  30: '回复体力',
  31: '否定点数减半',
  33: '延续对象的寿命',
  40: '增加怀孕的几率',
  41: '使对象开始生长阴毛',
};

/**
 * 生效段：逐种道具的结算。
 * @param {number} bought 道具序号
 * @param {number} cid 使用对象（角色 ID）
 */
function apply_use_effect(bought, cid) {
  const name = chara_callname(cid);
  if (bought === 29) {
    // 寄生回復：除虫本体在 ere/system/equip/item-detox.js（#333）
    era_exflag.legit_money -= USE_LEDGER[29];
    item_detox(cid);
    return;
  }
  if (bought === 30) {
    // 体力回復
    era_exflag.legit_money -= USE_LEDGER[30];
    era.print(`《${name}的体力恢复了1000点》`);
    const max = era.get(`maxbase:${cid}:0`) || 0;
    chara(cid).dungeon.体力 = Math.min(chara(cid).dungeon.体力 + 1000, max);
    return;
  }
  if (bought === 31) {
    // 否定点数半減
    era_exflag.legit_money -= USE_LEDGER[31];
    era.print(`《${name}的否定点数减半了》`);
    const juel = era.get(`juel:${cid}:100`) || 0;
    era.print(` 否定点数:${juel} -> ${Math.trunc(juel / 2)}`);
    era.set(`juel:${cid}:100`, Math.trunc(juel / 2));
    game.stronghold.每日香料购买数 = game.stronghold.每日香料购买数 + 1;
    return;
  }
  if (bought === 33) {
    // 寿命制限削除
    era_exflag.legit_money -= USE_LEDGER[33];
    era.print(`《${name}不再有寿命限制了》`);
    chara(cid).stronghold.寿命 = 0;
    return;
  }
  if (bought === 40) {
    // 排卵促進
    era_exflag.legit_money -= USE_LEDGER[40];
    era.print(`《${name}更容易怀孕了》`);
    chara(cid).stronghold.排卵诱发剂 = 1;
    return;
  }
  if (bought === 41) {
    // 生毛剤
    era_exflag.legit_money -= USE_LEDGER[41];
    const hair = era.get(`talent:${cid}:311`) || 0;
    if (hair > 200) {
      era.print('…涂上之后似乎没什么效果');
      chara(cid).chara.阴毛生长极限 = 201;
    } else {
      era.print(`《${name}可以长出更多阴毛了》`);
      chara(cid).chara.阴毛生长极限 = hair + 50;
      chara(cid).stronghold.白虎 = 0; // 白虎を消す
    }
  }
}

// ================================================================
// 素質アイテム【技巧等级】処理
// ================================================================

/** 技巧等级道具的单价（`(F - FLAG:33) * 5000`） */
const TECHNIQUE_UNIT_PRICE = 5000;

/**
 * technique_of_master：按已投入的件数凑齐剩余件数。
 *
 * **无调用者**（它原属难度档倍率段，该段整段不启用）；本文件保留实现
 * （函数是文件的交付内容），用例直接驱动。`FLAG:33` 是「已投入的件数」，
 * `F` 是凑齐所需的总件数。
 *
 * @param {number} f 凑齐所需的总件数（F）
 * @returns {Promise<number>} 0 = 未成交 / 1 = 已升级
 */
async function technique_of_master(f) {
  if ((era.get('flag:33') || 0) === f - 1) {
    // 只差最后一件
    technique_of_master_up();
    return 1;
  }
  game.stronghold.技巧素质道具数 = game.stronghold.技巧素质道具数 + 1;
  era.print(''); // 空行
  const remaining = f - (era.get('flag:33') || 0);
  era.print(`为了提高技巧LV，需要 ${remaining} 个。`);
  era.print('买光剩余的吗？');
  era.printButton('- 好的', 0);
  era.printButton('- 不要', 1);
  for (;;) {
    const result = await era.input();
    if (result === 0) {
      if (era_flag.money < remaining * TECHNIQUE_UNIT_PRICE) {
        era.print('哪怕是魔王大人，也是不能赊账的');
        return 0;
      }
      era_flag.money -= remaining * TECHNIQUE_UNIT_PRICE;
      era_exflag.legit_money -= remaining * TECHNIQUE_UNIT_PRICE;
      technique_of_master_up();
      return 1;
    }
    if (result === 1) {
      return 0;
    }
  }
}

/**
 * technique_of_master_up：技巧等级 +1、清已投入件数、吃掉道具。
 */
function technique_of_master_up() {
  const level = (era.get('abl:0:12') || 0) + 1;
  chara(0).system.技巧 = level;
  game.stronghold.技巧素质道具数 = 0;
  era.set('item:52', 0); // ITEM:BOUGHT = 0（本函数只服务 52 号道具）
  era_exflag.legit_money -= TECHNIQUE_UNIT_PRICE;
  era.print(`《${chara_callname(0)}的技巧LV${level}了》`);
}

module.exports = {
  clear_shop,
  saleitem_check,
  item_shop,
  print_shopitem,
  snapshot_money,
  purchase,
  event_buy,
  buy_plural,
  use_item,
  technique_of_master,
  technique_of_master_up,
  get_temp_money,
  SHOP_ITEM_COUNT,
};
