/**
 * @file 道具商店：@ITEM_SHOP 族（issue #399 / N15 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_ITEM.ERB
 *     @ITEM_SHOP（:17-80，绘制与输入循环头）
 *     @EVENTBUY（:85-248，购买回调：复数购买 / 当场使用 / 简单确认）
 *     @SALEITEM_CHECK（:253-400，在售标志）
 *     @BUY_PLURAL（:404-582，消耗型道具的复数购买）
 *     @USE_ITEM（:587-738，当场使用型道具的对象选择与结算）
 *     @TECHNIQUE_OF_MASTER（:744-769）/@TECHNIQUE_OF_MASTER_UP（:771-776）
 *     @CLEAR_SHOP（:781-786，清 ITEMSALES:0-299）
 *     @ITEM_DETOX（:791-810）自 #333 起已在 ere/system/equip/item-detox.js，
 *     本文件只在与道具链的接线处引用它（不重做）。
 *
 * == 引擎侧的购买流程（EraElectron 无此命令，是本文件补的最后一段） ==
 *
 * 原作 :73 的 `PRINT_SHOPITEM` 与 :63（陷阱商店）是 Emuera 内置命令：列出
 * ITEMSALES 不为 0 的商品（名字 + 价格），点编号即买。引擎在点中之后做四件
 * 事（`.agents/skills/emuera-basic-agent-guide/references/system-flow/
 * system-flow.md:60-64` 的流程四、五两步）：
 *
 *   1. 检查 ITEMSALES:BOUGHT 与 ITEMPRICE:BOUGHT（不满足则无声退回输入）；
 *   2. BOUGHT = 选中编号；
 *   3. ITEM:BOUGHT += 1（先给货）；
 *   4. MONEY -= ITEMPRICE:BOUGHT（先扣钱）；
 *   5. CALL @EVENTBUY（买/退都在这上面做——脚本侧的 A 与 ITEMPRICE 同值，
 *      逐条对过：SHOP_ITEM.ERB:117-165 的减项与 yml/Item.yml 的 price 一致）。
 *
 * EraElectron 没有这条命令、也没有购买回调，本文件把它拆成两块：
 *
 *   - `print_shopitem()`＝列货（绘制半，:73/:63 的等价物）；
 *   - `purchase(item_id)`＝上面五步的引擎侧（含 ITEMSALES/MONEY 两个校验、
 *     先给货先扣钱、再调 `event_buy`），由商店轮的输入分发调用（`BOUGHT >= 0`
 *     时编号 0-99 的输入走这里，其余交 @USERSHOP——「販売アイテム数」= 100
 *     的引擎语义，见 guide 的 config.md「販売アイテム数」条）。
 *
 * == 有意偏离（逐条注明依据） ==
 *
 * 1. **TFLAG:15（:69 所持点を一時保存）改落模块内暂存**。据点期没有 tflag
 *    表（beginTrain 建、endTrain 删；page-shop-trap.js:24-31 的实测），
 *    写二段直接抛 key error。它只在一次购买交互内被读写（取消时把 MONEY
 *    还原到进店时的值），不需要进存档，故落在模块级的 `temp_money`；
 *    @ITEM_SHOP 每次绘制都会重置它，与在原作里「每进一次商店重新保存」
 *    同义。
 * 2. **ISASSI 判据精简**（:273/:317/:345 的三处 `ISASSI:COUNT == 1`
 *    守卫）。ISASSI 是角色 CSV 的独立字段，本作全部 Chara CSV 都没写、
 *    ERB 也没有赋值路径（与 #339 在 stronghold/sale.js:346-348 的查实
 *    同一结论），故「助手持调合/秘密知识」两段恒不达：`M` 只由魔王自己
 *    的素质决定。保留判据会读一个没有落点的变量，精简为注释。
 * 3. **`$INPUT_LOOP` 的标签语义由输入循环承担**。原作的两次 INPUT
 *    （:71/:99/:465/:590/:614 等）在 Emuera 里是商店轮的输入，ere 侧改由
 *    page-shop.js 的商店轮 + 本文件内部的 `await era.input()` 循环承担，
 *    重绘时机随之从「重打输入块」变为「整屏重绘」（与 #396 陷阱商店
 *    同一口径的偏离，玩家可见差异是商店头两段一并重画）。
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
 * 金额单位（target/CSV/_replace.csv 的「お金の単位」= `pts.`、「位置」=「後」，
 * Emuera 的 PRINT_SHOPITEM 就按它渲染价格；黄金样本的状态行「(所持金：800 pts.)」
 * 是同一份配置的旁证）。脚本自己写的文案（如「加上2025点金钱」）带的是
 * ERB 里的字面量「点」，与本常数无关。
 */
const MONEY_UNIT = 'pts.';

/** SETCOLORBYNAME LightSalmon（:34/:49） */
const LIGHT_SALMON = 'LightSalmon';

/** TALENT 读数兜底（#13：未声明下标读回 undefined） */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * 在售标志段（@CLEAR_SHOP :784 的 `REPEAT 300`；@EVENTSHOP 只清 0-99，
 * 商店本体清全段）。上界是开区间 300。
 */
const SALES_COUNT = 300;

/**
 * @CLEAR_SHOP（:781-786）：把可购道具位清空（ITEMSALES:0-299 = 0）。
 *
 * 调用点三处，全在 SHOP ver1.0.2.ERB：@SHOW_SHOP:25（每轮重绘前）、
 * @USERSHOP:45（999 退出）、:49（998 切陷阱商店）、:53（997 切道具商店）；
 * 本文件不调用它（page-shop.js 的两侧各调用一次，见该文件的注释）。
 */
function clear_shop() {
  for (let i = 0; i < SALES_COUNT; i += 1) {
    era.set(`itemsales:${i}`, 0);
  }
}

/** :255-257 `REPEAT 24`：初始在售位的上界（开区间） */
const BASE_SALES_COUNT = 24;

/** :259-262 围裙、电极接头、拘束衣スーツ（0-23 段内，1:1 重写一遍） */
const EXTRA_NON_CONSUMABLES = [19, 21, 23];

/** :282-285 ビデオカメラ・搾乳器・肛珠（写在「已持有下架」**之前**） */
const ALWAYS_NON_CONSUMABLES = [6, 17, 20];

/** :294-297 消耗系道具（无前置条件的一段） */
const CONSUMABLES = [24, 25, 34, 35];

/** :298-300 ビデオテープ（要持有摄像机 ITEM:6） */
const VIDEO_TAPE = 28;

/** :302-309/:304-309 调合知识（TALENT:MASTER:55）点亮的药品系 */
const BLEND_ITEMS = [26, 27, 29, 31, 40, 41];

/** :264-280 营养剂：与药品系同判据，但原作单独算了一遍（1:1 保留两处） */
const NUTRITION = 30;

/** 【调合知识】素质编号（TALENT:MASTER:55） */
const BLEND_TALENT = 55;
/** 【秘密知識】素质编号（TALENT:MASTER:325） */
const SECRET_TALENT = 325;
/** 【魅力鳞甲】素质编号（TALENT:MASTER:91，ラブダイナミックス的下架判据） */
const LOVE_DYNAMICS_TALENT = 91;

/** :337-352 秘密アイテム（33） */
const SECRET_ITEM = 33;

/** :355-368 各消耗品的持有上限（判据 >= 99 下架） */
const STOCK_LIMITED = [24, 25, 26, 27, 28, 34, 35];
const STOCK_LIMIT = 99;

/** :370-373 好感测定仪（持有即下架） */
const LOVE_METER = 37;
/** :376-382 ラブダイナミックス */
const LOVE_DYNAMICS = 38;
/** :384-387 秘密知识道具 */
const SECRET_KNOWLEDGE_ITEM = 39;
/** :389-392 调合知识道具 */
const BLEND_KNOWLEDGE_ITEM = 42;
/** :394-398 技巧等级道具 */
const TECHNIQUE_ITEM = 52;
/** :399-400 经验值道具 */
const EXP_ITEM = 53;

/** 技巧等级上限（:397 `ABL:MASTER:12 >= 10`） */
const TECHNIQUE_MAX = 10;

/** 难度档（FLAG:5）里不出售ラブダイナミックス的两档（:381） */
const HARD_LEVELS = [3, 4];

/**
 * 魔王的调合知识是否成立（:267-269/:311-313 的 M 初值）。
 *
 * 原作的 `REPEAT CHARANUM` 段（:270-277/:314-321/:342-349）判的是
 * `CFLAG:COUNT:1 >= 1 && ISASSI:COUNT == 1`（在岗的助手）持有调合/秘密
 * 知识——ISASSI 在本作恒 0（文件头第 2 条），三段恒不达，故 M 只看魔王。
 * @param {number} talent_id 素质编号（调合知识 / 秘密知识）
 * @returns {boolean}
 */
function master_has(talent_id) {
  return talent(0, talent_id) !== 0;
}

/**
 * @SALEITEM_CHECK（:253-400）：点亮本商店的在售位。
 *
 * 判据顺序 1:1（后写覆盖先写）：初始 0-23 → 三件非消耗品 → 营养剂（调合
 * 知识）→ 三件无条件非消耗品 → 已持有的非消耗品下架 → 消耗品与录像带 →
 * 药品系（调合知识）→ 秘密アイテム（秘密知识）→ 消耗品持有上限 →
 * 器材与素质道具的逐个判据。
 *
 * @returns {number} 原作尾无 RETURN（隐式 0）
 */
function saleitem_check() {
  // :255-257 初始在售
  for (let i = 0; i < BASE_SALES_COUNT; i += 1) {
    era.set(`itemsales:${i}`, 1);
  }
  // :259-262 围裙、电极接头、拘束衣スーツ（落在上面那一段内，1:1 重写）
  for (const id of EXTRA_NON_CONSUMABLES) {
    era.set(`itemsales:${id}`, 1);
  }

  // :264-280 营养剂：调合知识（主人或助手的素质）
  era.set(`itemsales:${NUTRITION}`, 0);
  if (master_has(BLEND_TALENT)) {
    era.set(`itemsales:${NUTRITION}`, 1);
  }

  // :282-285 三件无条件非消耗品
  for (const id of ALWAYS_NON_CONSUMABLES) {
    era.set(`itemsales:${id}`, 1);
  }

  // :287-291 已持有的非消耗品下架（判据是「恰好 1 件」）
  for (let i = 0; i < BASE_SALES_COUNT; i += 1) {
    if ((era.get(`item:${i}`) || 0) === 1) {
      era.set(`itemsales:${i}`, 0);
    }
  }

  // :293-300 消耗品与录像带
  for (const id of CONSUMABLES) {
    era.set(`itemsales:${id}`, 1);
  }
  if (era.get('item:6') || 0) {
    era.set(`itemsales:${VIDEO_TAPE}`, 1);
  }

  // :302-329 药品系道具：同「调合知识」判据
  for (const id of [...BLEND_ITEMS, NUTRITION]) {
    era.set(`itemsales:${id}`, 0);
  }
  if (master_has(BLEND_TALENT)) {
    for (const id of BLEND_ITEMS) {
      era.set(`itemsales:${id}`, 1);
    }
    // 原作的营养剂在 :322-329 那一段之外单独置 1（:278-280），此处 1:1
    era.set(`itemsales:${NUTRITION}`, 1);
  }

  // :335-352 秘密アイテム
  era.set(`itemsales:${SECRET_ITEM}`, 0);
  if (master_has(SECRET_TALENT)) {
    era.set(`itemsales:${SECRET_ITEM}`, 1);
  }

  // :354-368 消耗品持有上限
  for (const id of STOCK_LIMITED) {
    if ((era.get(`item:${id}`) || 0) >= STOCK_LIMIT) {
      era.set(`itemsales:${id}`, 0);
    }
  }

  // :370-373 好感测定仪（持有即下架）
  era.set(`itemsales:${LOVE_METER}`, 1);
  if (era.get(`item:${LOVE_METER}`) || 0) {
    era.set(`itemsales:${LOVE_METER}`, 0);
  }

  // :376-382 ラブダイナミックス（已持有素质 或 HARD/POWERFUL 难度 → 下架）
  era.set(`itemsales:${LOVE_DYNAMICS}`, 1);
  if (talent(0, LOVE_DYNAMICS_TALENT) === 1) {
    era.set(`itemsales:${LOVE_DYNAMICS}`, 0);
  }
  const difficulty = era.get('flag:5') || 0;
  if (HARD_LEVELS.includes(difficulty)) {
    era.set(`itemsales:${LOVE_DYNAMICS}`, 0);
  }

  // :384-387 秘密知识道具
  era.set(`itemsales:${SECRET_KNOWLEDGE_ITEM}`, 1);
  if (talent(0, SECRET_TALENT) === 1) {
    era.set(`itemsales:${SECRET_KNOWLEDGE_ITEM}`, 0);
  }

  // :389-392 调合知识道具
  era.set(`itemsales:${BLEND_KNOWLEDGE_ITEM}`, 1);
  if (talent(0, BLEND_TALENT) === 1) {
    era.set(`itemsales:${BLEND_KNOWLEDGE_ITEM}`, 0);
  }

  // :394-398 技巧等级道具（上限 10，且不超过堕とした人数 + 2）
  era.set(`itemsales:${TECHNIQUE_ITEM}`, 1);
  const technique = era.get('abl:0:12') || 0;
  if (technique >= TECHNIQUE_MAX || technique > (era.get('flag:30') || 0) + 1) {
    era.set(`itemsales:${TECHNIQUE_ITEM}`, 0);
  }

  // :399-400 经验值道具（无判据）
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
 * 一段「持有道具」网格（:39-48 第一段 / :53-64 第二段）。
 *
 * 原作排布：`SIF ITEM:ICOUNT_A == 0 → CONTINUE`（持有 0 个不占格），每格
 * `[正文补到 width 显示宽度]`，每满 5 格换行，段尾未满行再补一次换行
 * （`SIF ICOUNT_B % 5 > 0 → PRINTL`）；一段一格都没有时不补（0 % 5 == 0）。
 *
 * @param {number} start 段起点（含）
 * @param {number} end 段终点（不含）
 * @param {(id: number) => string} text 格子正文（两段的宽度与后缀不同）
 * @param {number} width 格子正文的填充宽度
 * @param {number[]} [skip] 段内跳过的序号（第二段的 :56-57）
 * @returns {string[]} 逐行文本（引擎每次 print 即一行的等价物）
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

/** 每行几格（:44/:60 `IF ICOUNT_B % 5 == 0`） */
const GRID_COLUMNS = 5;

/** 第一段的格子宽度（:42 `%ITEMNAME:ICOUNT_A,10,LEFT%`） */
const FIRST_GRID_WIDTH = 10;
/** 第二段的格子宽度（:58 `%…,20,LEFT%`） */
const SECOND_GRID_WIDTH = 20;

/** 第一段（:39-48）的上界：`FOR ICOUNT_A,0,24` */
const FIRST_GRID_END = 24;
/** 第二段（:53-64）的上界：`FOR ICOUNT_A,24,36` */
const SECOND_GRID_START = 24;
const SECOND_GRID_END = 36;
/** 第二段里被跳过的三段（:56-57 `ICOUNT_A >= 29 && ICOUNT_A <= 31`） */
const SECOND_GRID_SKIP = [29, 30, 31];

/**
 * PRINT_SHOPITEM 的 ere 等价物（原作 :73 与陷阱商店 :63 的引擎命令）：
 * 把在售商品（ITEMSALES 不为 0，标签 + 价格）列成按钮，accelerator ＝
 * 道具序号——点中即进购买流程（page-shop.js 的购物段把 0-99 的输入交给
 * purchase）。
 *
 * 扫描面是引擎的 itemkeys（Item.yml 的登记序号全集，dev-guides/09-static.md
 * 「itemkeys」条），按序号升序；**价格用 ITEMPRICE**（引擎校验与扣款用的
 * 就是它，见文件头），单位取配置的 `pts.`（MONEY_UNIT）。按钮不禁用：原作里买不起的商品也能点，引擎的回应是
 * 无声退回输入（guide 的 system-flow:60-64「判定失败 → 重新输入」）——
 * 用 disabled 表达买不起会把这个无声语义变成不可达。
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
 * TFLAG:15（:69 所持点を一時保存）的 ere 落点：据点期没有 tflag 表，改用
 * 模块内暂存（文件头第 1 条）。ITEM_SHOP 每次绘制都重置它，购买流程的
 * 取消路径（@EVENTBUY/BUY_PLURAL/@USE_ITEM 的退还）读它。
 */
let temp_money = 0;

/** TFLAG:15 的读数（测试与 @EVENTBUY 的退还路径用） */
function get_temp_money() {
  return temp_money;
}

/**
 * TFLAG:15 = MONEY（:69 / SHOP_TRAP.ERB:59 的「所持点を一時保存」）：
 * 两个商店在各自绘制时各存一次（文件头第 1 条）。
 */
function snapshot_money() {
  temp_money = era_flag.money;
}

/**
 * @ITEM_SHOP（:17-80）：道具商店的绘制半 + 提示行。
 *
 * 由 page-shop.js 的 show_shop（BOUGHT 0-53 → 原作 :27 的 JUMP）调用，
 * 等价于原作把商店界面整个接管本轮。购买本身不在这里：原作 :71 的
 * `$INPUT_LOOP` 之后是引擎的输入与 @EVENTBUY，ere 侧落在 page-shop.js
 * 商店轮的输入分发（文件头第 3 条）。
 *
 * @returns {Promise<number>} 原作在 :80 的 PRINTL 之后被引擎的输入接过，
 *   无 RETURN（隐式 0）
 */
async function item_shop() {
  // :20 CUSTOMDRAWLINE = → 本屏的分隔线走实线（page-shop-trap.js 同款近似）
  era.print('黑市商人'); // :21
  era.print('《可以购买用于调教的物品》'); // :22
  era.drawLine({ isSolid: true }); // :20-23 的分隔线
  // :24-30 PRINTV DAY+1 / PRINT 日 / PRINTL  午前|午后
  era.print(
    `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
  );
  era.print(`[所持金:${era_flag.money}点]`); // :32

  // :34-37 SETCOLORBYNAME LightSalmon → RESETCOLOR
  era.print([
    { content: `[技巧Lv:${era.get('abl:0:12') || 0}]`, color: LIGHT_SALMON },
  ]);
  era.print([{ content: '[调教道具一览]', color: LIGHT_SALMON }]);
  // :39-48 第一段（持有道具，0-23）
  for (const row of item_grid_rows(
    0,
    FIRST_GRID_END,
    (id) => item_name(id),
    FIRST_GRID_WIDTH,
  )) {
    era.print(row);
  }

  // :49-51 SETCOLORBYNAME LightSalmon → RESETCOLOR
  era.print([{ content: '[消耗型调教道具一览]', color: LIGHT_SALMON }]);
  // :53-64 第二段（消耗型道具，24-35 去掉 29-31）
  for (const row of item_grid_rows(
    SECOND_GRID_START,
    SECOND_GRID_END,
    (id) => `${item_name(id)}(所持:${era.get(`item:${id}`) || 0})`,
    SECOND_GRID_WIDTH,
    SECOND_GRID_SKIP,
  )) {
    era.print(row);
  }

  era.drawLine({ isSolid: true }); // :65
  saleitem_check(); // :67 CALL SALEITEM_CHECK
  snapshot_money(); // :69 TFLAG:15 = MONEY（文件头第 1 条）

  // :73 PRINT_SHOPITEM（引擎命令的 ere 等价物，见 print_shopitem）
  print_shopitem();

  // :75-80 提示行
  era.print('《请输入要购买的道具的编号》');
  era.drawLine({ isSolid: true }); // :77
  // :78-79 两个 PRINTLC 打在同一行，:80 的 PRINTL 只结束那一行——PRINTLC
  // 左对齐补位、**不换行**，故不产生空行。ere 的 printButton 自成一行
  // （＝ PRINTLC + 收尾的 PRINTL），不再补空行（语义与勘误见 CONTEXT.md
  // 「输出 API 与原作的对应」）。
  era.setAlign('center'); // :78-79 PRINTLC（排版近似：见 CONTEXT.md）
  era.printButton('- 陷阱', 998, { align: 'center' });
  era.printButton('- 返回', 999, { align: 'center' });
  era.setAlign('left');

  return 0;
}

// ================================================================
// 购买流程（@EVENTBUY 族，:85-776）
// ================================================================

/**
 * 販売アイテム数（引擎配置项的标准值，guide 的 config.md「販売アイテム数」条）：
 * 0-99 的输入进购买流程、其余交 @USERSHOP。
 */
const SHOP_ITEM_COUNT = 100;

/** :89 复数购买的道具（`BOUGHT == …` 九项） */
const PLURAL_ITEMS = [24, 25, 26, 27, 28, 34, 35, 53, 55];
/** :89 复数购买的第二段判据 `BOUGHT >= 60 && BOUGHT != 90`（陷阱与戒指） */
const PLURAL_RANGE_START = 60;
const PLURAL_EXCLUDE = 90;
/** :93 当场使用型道具 */
const USE_ITEMS = [29, 30, 31, 32, 33, 40, 41];

/**
 * 复数购买的单价表（:410-427 的 `SIF BOUGHT == n → A = …` 逐条）。
 * 与 yml/Item.yml 的 price 同值（本文件头：脚本侧 A 与引擎侧 ITEMPRICE
 * 必须一致——一个扣钱、一个记账）。
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
  91: 100, // :435-436（戒指）
};

/**
 * 简单确认路径的记账额（:116-165 的 `SIF BOUGHT == n → EX_FLAG:4444 -= …`）。
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
  37: 1000, // :164-165 好感测定仪
};

/** 开局不变量常数（MONEY == EX_FLAG:4444 + 8766，SYSTEM ver1.0.3.ERB:55-56） */
const LEGIT_MONEY_BASE = 8766;

/**
 * 当场使用型道具的退还额（:620-641 的 `SIF BOUGHT == n → MONEY += …`）。
 * 与 yml/Item.yml 的 price 同值；32 号原作无退项（也不在售）。
 */
const USE_REFUNDS = {
  29: 500,
  30: 1000,
  31: 3000,
  33: 100000,
  40: 2000,
  41: 2000,
};

/** 药品系三支的生效记账额（:694/:699/:707… 的 `EX_FLAG:4444 -= …`） */
const USE_LEDGER = {
  29: 500,
  30: 1000,
  31: 3000,
  33: 100000,
  40: 2000,
  41: 2000,
};

/**
 * 引擎侧的五步（文件头）：校验 → BOUGHT → 给货 → 扣钱 → @EVENTBUY。
 *
 * 两个校验不通过时**无声退回输入**（guide 的 system-flow「判定失败 →
 * 重新输入」）：本函数直接返回，商店轮重绘同一屏。按钮侧的输入通道只会
 * 送达已打印按钮的快捷键，故这两个校验只能经直调观察（同 #130 的约定）。
 *
 * @param {number} item_id 玩家选中的道具序号（原作引擎的 RESULT/BOUGHT）
 * @returns {Promise<number>} @EVENTBUY 的返回值（原作里引擎不读它，1 =
 *   已成交、0 = 取消）
 */
async function purchase(item_id) {
  if (!(era.get(`itemsales:${item_id}`) || 0)) {
    return 0; // :— 判定失败（不在售）
  }
  const price = item_price(item_id);
  if (era_flag.money < price) {
    return 0; // 判定失败（钱不够）
  }
  era_flag.bought = item_id; // BOUGHT 设定
  era.add(`item:${item_id}`, 1); // ITEM 增加
  era_flag.money -= price; // MONEY 减少
  return event_buy(item_id); // @EVENTBUY
}

/**
 * @EVENTBUY（:85-248）：购买回调。三支按原作顺序：复数购买 → 当场使用 →
 * 简单确认。
 *
 * @param {number} bought 购买的道具序号（原作全局 BOUGHT）
 * @returns {Promise<number>} 1 = 成交 / 0 = 取消（原作 RETURN）
 */
async function event_buy(bought) {
  // :89-91 複数持てるアイテム
  // 末段 `BOUGHT >= 60 && BOUGHT != 90` 与前面八个 `||` 同层：按 Emuera 的
  // 「&& 与 || 同优先级、左结合」应读作 `(九项 || BOUGHT >= 60) && BOUGHT != 90`。
  // 九项都 < 60、BOUGHT == 90 又不在九项里，两种读法在一切取值上同值，
  // 故这里按显式括号保留结构（#517）。
  if (
    PLURAL_ITEMS.includes(bought) ||
    (bought >= PLURAL_RANGE_START && bought !== PLURAL_EXCLUDE)
  ) {
    await buy_plural(bought);
    return 1;
  }
  // :93-96 その場で使うアイテム
  if (USE_ITEMS.includes(bought)) {
    await use_item(bought);
    era.set(`item:${bought}`, 0); // :95
    return 1;
  }

  // :99-113 購入確認（0 好的 / 1 不要，其余重问；#572 起两项升格为按钮，
  // 「其余」由引擎按白名单拒收，重问支不可达——1:1 保留）
  for (;;) {
    era.print(`确定购买${item_name(bought)}？`);
    era.printButton('- 好的', 0); // :101（正文的 `- ` 是原作文本）
    era.printButton('- 不要', 1); // :102
    const result = await era.input();
    if (result === 1) {
      // :105-110 取消：退还货与钱、重建记账不变量（TFLAG:15 的暂存值）
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

  // :115 《购买了…》
  era.print(`《购买了${item_name(bought)}》`);
  // :116-165 逐条的记账额（0-23 与 37）
  const ledger = SIMPLE_LEDGER[bought];
  if (ledger !== undefined) {
    era_exflag.legit_money -= ledger;
  }

  // :167-173 素質アイテム・ラブダイナミックス（38）
  if (bought === 38) {
    era_exflag.legit_money -= 100000;
    era.print(
      `《${chara_callname(0)}掌握了【${era.get('talentname:91') ?? ''}】》`,
    );
    chara(0).chara.魅惑 = 1;
    era.set(`item:${bought}`, 0);
  }
  // :174-179 素質アイテム【秘密知識】（39）
  if (bought === 39) {
    era_exflag.legit_money -= 100000;
    chara(0).stronghold.魔界知识 = 1;
    era.set(`item:${bought}`, 0);
  }
  // :180-185 素質アイテム【调合知识】（42）
  if (bought === 42) {
    era_exflag.legit_money -= 40000;
    chara(0).stronghold.调合知识 = 1;
    era.set(`item:${bought}`, 0);
  }
  // :186-224 素質アイテム【技巧LV】（52）：难度档的倍率段在原作里整体
  // 被注释掉（:190-223），现行实现只有一条 `CALL TECHNIQUE_OF_MASTER_UP`
  if (bought === 52) {
    technique_of_master_up();
  }
  // :227-234 素質アイテム【淫魔知识】（54）：买完 ITEMSALES:54 熄灭——玩家
  // 自此只能在陷阱商店买淫魔的陷阱（BOUGHT 停在 54，下一轮跳陷阱商店）
  if (bought === 54) {
    era_exflag.legit_money -= 100000;
    chara(0).stronghold.淫魔知识 = 1;
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 0);
    era.print('* 可以购买淫魔的陷阱了 *');
  }
  // :236-243 素質アイテム【魔虫知识】（56）
  if (bought === 56) {
    era_exflag.legit_money -= 10000;
    chara(0).stronghold.魔虫知识 = 1;
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 0);
    era.print('* 一些陷阱被强化了 *');
  }

  await era.waitAnyKey(); // :246 WAIT
  return 1;
}

/**
 * 数量选择的提示行（:450-463 首次 / :481-487 越界后重画）。
 *
 * **两处不同形**：首次的选项行多一段 `D/2`（:456-460，仅在 `D/2 > 20` 时
 * 出现），越界后的重画没有（源 :485-487 直接从 `[20] - [` 接 `{D}]`）。
 * 原作的差异照搬——1:1。
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
 * 经验值道具（BOUGHT == 53）的使用对象选择（:501-543）。
 *
 * 原作在这里起 `$INPUT_LOOP_MENU` 内循环：角色列表 + 翻页 + 选人，选中后
 * `EXP:RESULT:80 += E`。`:545-546` 的尾检查（`SIF RESULT == 1000 || 1001
 * → GOTO INPUT_LOOP_MENU`）在 `ENDIF` 之外，但两条捷径在内层已被页翻处理
 * 吃掉、其余值在 :533 被驳回，**恒不可达**，不移植（逐条注明：#391 口径）。
 *
 * @param {number} count 购买数量（原作 RESULT）
 * @returns {Promise<void>}
 */
async function use_exp_item(count) {
  const gained = count * 10; // :505 E = RESULT * 10
  let no_page = 0; // #DIM NO_PAGE（缺省 0）
  for (;;) {
    era.drawLine(); // :507-508
    era.print(`要让谁使用${item_name(EXP_ITEM)}？`); // :510
    life_list(no_page, 0); // :512 CALL LIFE_LIST(NO_PAGE,0)
    era.setAlign('center');
    era.printButton('- 上一页', 1000); // :514
    era.printButton('- 下一页', 1001); // :515
    era.setAlign('left');

    const result = await era.input();
    if (result === 1000) {
      // :520-525 上一页（首页再按无反应，退回选人）
      if (no_page > 0) {
        no_page -= 1;
        continue;
      }
      continue;
    }
    if (result === 1001) {
      // :526-531 下一页
      if ((no_page + 1) * 20 <= era.getAddedCharacters().length) {
        no_page += 1;
      }
      continue;
    }
    // :533-534 非法目标 → 重问
    if (!era.getAddedCharacters().includes(result)) {
      continue;
    }
    // :535-538 卖却済み・臨死中的角色不可选
    if ((era.get(`cflag:${result}:1`) || 0) !== 0) {
      era.print('此人物尚不可选择');
      continue;
    }
    // :541-542 经验值到手（RESULT == 0 即魔王，MASTER 也是 0）
    chara(result).dungeon.战斗经验 = chara(result).dungeon.战斗经验 + gained;
    era.print(`得到了${gained}点经验值`);
    return;
  }
}

/**
 * @BUY_PLURAL（:404-582）：复数购买（数量选择 → 结算 → 三支尾处理）。
 *
 * 买空/取消/越界的四支 1:1：取消退还原价（引擎已扣一份），越界打印两种
 * 文案后重问，成交按 `RESULT` 结算 `ITEM`/`MONEY`/`EX_FLAG:4444`。
 *
 * @param {number} bought 道具序号
 * @returns {Promise<number>} 原作 RETURN 0/1
 */
async function buy_plural(bought) {
  // :410-436 单价
  let a = PLURAL_PRICES[bought];
  if (bought >= PLURAL_RANGE_START && bought < PLURAL_EXCLUDE) {
    // :429-433 陷阱の値段は DUNGEON_TRAP 参照（P = BOUGHT; CALL TRAP_PRICE）
    a = trap_price(bought);
  }

  // :407-408 上限：B* 是可持数（100 - 已持有）、C 是钱够买几件（＋引擎
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
  // :447-448 陷阱等级不能越过地下城的阶层上限
  const trap_level = game.stronghold.陷阱等级;
  const maze_level = era.get('cflag:0:9') || 0;
  if (bought === 55 && trap_level + d > maze_level) {
    d = maze_level - trap_level;
  }

  // :450-463 首次提示（:465 $INPUT_LOOP 的循环由本函数的 for 承担）
  print_quantity_prompt(bought, d);

  /** INPUT 的返回值（原作 RESULT，成交分支之后还要用它） */
  let result;
  for (;;) {
    result = await era.input();
    if (result === 0) {
      // :467-472 取消：退还原价（引擎已扣一份）
      era.set(`item:${bought}`, (era.get(`item:${bought}`) || 0) - 1);
      era_flag.money += a;
      return 0;
    }
    if (result < 0) {
      continue; // :473-474
    }
    if (result > d) {
      // :475-488 越界：两种文案（E 记的哪一侧吃紧）＋重画提示
      era.print(e === 0 ? '不能持有这么多' : '哪怕是魔王，也不能赊账啊');
      print_quantity_prompt(bought, d, false); // :481-487 的重画不带 D/2 档
      continue;
    }
    if (result === 1) {
      // :489-492 买一件（钱在引擎侧已扣）：一支一个 WAIT
      era_exflag.legit_money -= a;
      era.print(`《购买了${item_name(bought)}》`);
      await era.waitAnyKey();
    } else {
      // :493-499 买 RESULT 件：引擎已给 1 件、已扣 1 件的钱；这里也是
      // 一个 WAIT（:495），别在分支外再等一次（玩家会多按一键）
      era.print(`《购买了${result}个${item_name(bought)}》`);
      await era.waitAnyKey();
      era.set(`item:${bought}`, (era.get(`item:${bought}`) || 0) + result - 1);
      era_flag.money -= a * (result - 1);
      era_exflag.legit_money -= a * result;
    }
    break;
  }

  // :501-543 経験値アイテム（53）：买完转「让谁使用」的角色选择
  if (bought === 53) {
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 1);
    await use_exp_item(result);
  }

  // :548-565 陷阱LV（55）
  if (bought === 55) {
    // 判定式照原作是 `LOCAL <= CFLAG:0:9 || LOCAL <= CFLAG:MASTER:9`——两个
    // 地址是同一个角色（MASTER = 0），故等价于上一条。原作的 ELSE 支
    // （:554-561 的「必须先提高魔王的等级！」，退钱退款）**恒不可达**：
    // RESULT ∈ [1, D] 且 D 已被 :447-448 钳到 `CFLAG:0:9 - FLAG:85`，
    // 于是 LOCAL = FLAG:85 + RESULT <= CFLAG:0:9 恒成立——照 #391 的口径
    // 精简，不移植（保留它等于留一段没有用例能站到另一侧的代码）。
    era.print(`《陷阱上升到Lv${result}》`);
    game.stronghold.陷阱等级 = trap_level + result;
    era.set(`item:${bought}`, 0);
    era.set(`itemsales:${bought}`, 1);
  }

  // :568-580 指輪（91）：一枚一枚进 ITEM:300，超过 99 的部分原价退还
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
// 当场使用型道具（@USE_ITEM，:587-738）
// ================================================================

/**
 * 使用对象选择菜单的两个翻页按钮与退出键（:610-612）。
 *
 * 选择面是本页的角色列表（LIFE_LIST；分页与行渲染归 page-life-list.js，
 * 本函数只管逐轮重画与键位分派，等价原作的 `$INPUT_LOOP_MENU` 标签）。
 *
 * @param {number} bought 道具序号（原作 BOUGHT）
 * @returns {Promise<void>}
 */
async function use_item(bought) {
  /** #DIM NO_PAGE（缺省 0） */
  let no_page = 0;
  for (;;) {
    era.drawLine(); // :588-591
    // :592-604 道具效果一行（每种道具一句）
    const effect = USE_EFFECTS[bought];
    if (effect) {
      era.print(`${item_name(bought)}:${effect}`);
    }
    era.print(`要让谁使用${item_name(bought)}？`); // :606
    era.drawLine(); // :606-607
    life_list(no_page); // :608 CALL LIFE_LIST,NO_PAGE
    era.setAlign('center'); // :610-612 PRINTLC
    era.printButton('- 上一页', 1000);
    era.printButton('- 返  回', 999);
    era.printButton('- 下一页', 1001);
    era.setAlign('left');

    const result = await era.input(); // :614-615 $INPUT_LOOP
    if (result === 999) {
      // :617-642 取消：吃掉这件道具并按种类退钱（32 号原作无退项）
      era.set(`item:${bought}`, 0);
      const refund = USE_REFUNDS[bought];
      if (refund !== undefined) {
        era_flag.money += refund;
      }
      return;
    }
    if (result === 1000) {
      // :643-648 上一页（首页再按无反应：整块退回首屏重画）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // :649-654 下一页
      if ((no_page + 1) * 20 <= era.getAddedCharacters().length) {
        no_page += 1;
      }
      continue;
    }
    if (!era.getAddedCharacters().includes(result)) {
      continue; // :655-656
    }
    // :657-659 RESULT == 0 是魔王本人（ere 侧角色号 0 就是 MASTER）
    if ((era.get(`base:${result}:0`) || 0) < 1) {
      continue; // :660-662 売却済み・臨死中
    }
    // :663-667 体力已满时营养剂用不了
    if (
      bought === 30 &&
      (era.get(`base:${result}:0`) || 0) ===
        (era.get(`maxbase:${result}:0`) || 0)
    ) {
      era.print(`${chara_callname(result)}的体力已经达到了最大值`);
      await era.waitAnyKey();
      continue;
    }
    // :668-672 否定点数已是 0 时熏香用不了
    if (bought === 31 && (era.get(`juel:${result}:100`) || 0) < 1) {
      era.print(
        `${chara_callname(result)}的${era.get('palamname:100') ?? ''}点数已经不能再减少了`,
      );
      await era.waitAnyKey();
      continue;
    }
    // :673-677 没有【爱慕】或没有寿命限制时 WG 电池用不了
    if (
      bought === 33 &&
      ((era.get(`base:${result}:10`) || 0) === 0 ||
        (era.get(`talent:${result}:85`) || 0) === 0)
    ) {
      era.print(`${chara_callname(result)}已经不受寿命限制了`);
      await era.waitAnyKey();
      continue;
    }
    // :678-686 妊娠中・育儿中的角色用不了排卵促进剂
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
    await era.waitAnyKey(); // :696/:704/:712/:718/:724/:737 每支末尾的 WAIT
    return;
  }
}

/** :592-604 效果说明行（道具序号 → 说明） */
const USE_EFFECTS = {
  29: '从寄生状态中恢复',
  30: '回复体力',
  31: '否定点数减半',
  33: '延续对象的寿命',
  40: '增加怀孕的几率',
  41: '使对象开始生长阴毛',
};

/**
 * 生效段（:692-738）：逐种道具的结算。
 * @param {number} bought 道具序号
 * @param {number} cid 使用对象（角色 ID）
 */
function apply_use_effect(bought, cid) {
  const name = chara_callname(cid);
  if (bought === 29) {
    // 寄生回復（:693-696）：除虫本体在 ere/system/equip/item-detox.js（#333）
    era_exflag.legit_money -= USE_LEDGER[29];
    item_detox(cid);
    return;
  }
  if (bought === 30) {
    // 体力回復（:698-704）
    era_exflag.legit_money -= USE_LEDGER[30];
    era.print(`《${name}的体力恢复了1000点》`);
    const max = era.get(`maxbase:${cid}:0`) || 0;
    chara(cid).dungeon.体力 = Math.min(chara(cid).dungeon.体力 + 1000, max);
    return;
  }
  if (bought === 31) {
    // 否定点数半減（:706-712）
    era_exflag.legit_money -= USE_LEDGER[31];
    era.print(`《${name}的否定点数减半了》`);
    const juel = era.get(`juel:${cid}:100`) || 0;
    era.print(` 否定点数:${juel} -> ${Math.trunc(juel / 2)}`);
    era.set(`juel:${cid}:100`, Math.trunc(juel / 2));
    game.stronghold.每日香料购买数 = game.stronghold.每日香料购买数 + 1;
    return;
  }
  if (bought === 33) {
    // 寿命制限削除（:714-718）
    era_exflag.legit_money -= USE_LEDGER[33];
    era.print(`《${name}不再有寿命限制了》`);
    chara(cid).stronghold.寿命 = 0;
    return;
  }
  if (bought === 40) {
    // 排卵促進（:720-724）
    era_exflag.legit_money -= USE_LEDGER[40];
    era.print(`《${name}更容易怀孕了》`);
    chara(cid).stronghold.排卵诱发剂 = 1;
    return;
  }
  if (bought === 41) {
    // 生毛剤（:726-737）
    era_exflag.legit_money -= USE_LEDGER[41];
    const hair = era.get(`talent:${cid}:311`) || 0;
    if (hair > 200) {
      era.print('…涂上之后似乎没什么效果');
      chara(cid).chara.阴毛生长极限 = 201;
    } else {
      era.print(`《${name}可以长出更多阴毛了》`);
      chara(cid).chara.阴毛生长极限 = hair + 50;
      chara(cid).stronghold.白虎 = 0; // :735 白虎を消す
    }
  }
}

// ================================================================
// 素質アイテム【技巧等级】処理（:744-776）
// ================================================================

/** 技巧等级道具的单价（:757/:760 的 `(F - FLAG:33) * 5000`） */
const TECHNIQUE_UNIT_PRICE = 5000;

/**
 * @TECHNIQUE_OF_MASTER（:744-769）：按已投入的件数凑齐剩余件数。
 *
 * **原作唯一调用点被整体注释掉**（:190-223 的难度档倍率段），现行构建里
 * 无调用者；本文件按 1:1 落地（函数是文件的交付内容），用例直接驱动。
 * `FLAG:33` 是「已投入的件数」，`F` 是凑齐所需的总件数（旧调用点传入）。
 *
 * @param {number} f 凑齐所需的总件数（原作 F）
 * @returns {Promise<number>} 0 = 未成交 / 1 = 已升级
 */
async function technique_of_master(f) {
  if ((era.get('flag:33') || 0) === f - 1) {
    // :745-746 只差最后一件
    technique_of_master_up();
    return 1;
  }
  game.stronghold.技巧素质道具数 = game.stronghold.技巧素质道具数 + 1;
  era.print(''); // :749 PRINTL
  const remaining = f - (era.get('flag:33') || 0);
  era.print(`为了提高技巧LV，需要 ${remaining} 个。`);
  era.print('买光剩余的吗？');
  era.printButton('- 好的', 0); // SHOP_ITEM.ERB:752
  era.printButton('- 不要', 1); // SHOP_ITEM.ERB:753
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
      return 0; // :764-765
    }
  }
}

/**
 * @TECHNIQUE_OF_MASTER_UP（:771-776）：技巧等级 +1、清已投入件数、吃掉道具。
 */
function technique_of_master_up() {
  const level = (era.get('abl:0:12') || 0) + 1;
  chara(0).system.技巧 = level;
  game.stronghold.技巧素质道具数 = 0;
  era.set('item:52', 0); // ITEM:BOUGHT = 0（:774，本函数只服务 52 号道具）
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
