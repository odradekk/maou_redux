/**
 * @file 商店轮（据点主界面）：STATE.SHOP 的处理器。
 *
 * 源: target/ERB/SHOP/SHOP ver1.0.2.ERB  @EVENTSHOP（:4-20，BEGIN SHOP 后
 *     最先执行一次）/@SHOW_SHOP（:22-38，绘制）/@USERSHOP（:40-229，输入
 *     分发，#24 落地；100 分支的助手循环与 BEGIN TRAIN 随 #44 补全；199
 *     休息随 #395 真身，回合真正能推进；997-999 店内购物段随 #396 接通）
 *
 * Emuera 语义（引擎行为，非 ERB 函数）：BEGIN SHOP 后引擎先调 @EVENTSHOP
 * 一次，随后循环「@SHOW_SHOP 绘制 → 等输入 → @USERSHOP 分发」。ere 侧把
 * 这一轮收进本模块导出的处理器，由 main-loop.js 的 STATE_HANDLERS 接驳。
 *
 * BOUGHT（购入品指针，#395 起落表：yml/Flag.yml「购入品指针」/
 * ere-utils/era-flag.js 的 bought）：@SHOW_SHOP 的 :25-30 原作用 JUMP 整个
 * 接管本轮（0-53 跑 ITEM_SHOP、≥ 54 跑 ITEM_SHOP_TRAP，都不再画主菜单）。
 * #396 起 ≥ 54 一侧是真身（page/page-shop-trap.js）、#399 起 0-53 一侧也是
 * （page/page-item-shop.js），@USERSHOP 的 :44-57 店内购物段（997-999 且
 * BOUGHT >= 0）三支到齐——退出商店的出口与进入商店的入口必须同一张票
 * 落地，否则玩家会被困在商店界面里。
 *
 * **购买流程也归本文件的输入分发**：原作 @SHOW_SHOP 之后的输入由引擎处理，
 * 0-99（販売アイテム数）进商品购买与 @EVENTBUY、其余才交 @USERSHOP——
 * EraElectron 没有这条引擎路径（guide 的 system-flow:60-64 与 config.md
 * 「販売アイテム数」条是该语义的两处记载），故本文件的 usershop 开头补上
 * 这一段（page-item-shop.js 的 purchase），两个商店共用。
 */

const era = require('#/era-electron');
const { relation_debugprint } = require('#/chara/chara-family');

const { begin, STATE } = require('#/system/flow/begin-signal');
const { on, emit, TIER } = require('#/system/event/registry');
const { maounet } = require('#/system/cross-save-sharing');
const { chara_sale } = require('#/system/stronghold/sale');
const {
  create_main_menu,
  reset_out_of_range_pointers,
  count_selectable_slaves,
} = require('#/page/page-main-menu');
const { select_target, select_assi } = require('#/page/page-select-target');
const { invasion } = require('#/page/page-invasion');
const { dungeon_info2 } = require('#/page/page-dungeon-info2');
const { infrastructure } = require('#/page/page-infrastructure');
const { item_shop_trap } = require('#/page/page-shop-trap');
const {
  clear_shop,
  item_shop,
  purchase,
  SHOP_ITEM_COUNT,
} = require('#/page/page-item-shop');
const { monster_shop } = require('#/page/page-monster-shop');
const { ability_up } = require('#/page/page-ability-up');
const { intercept } = require('#/page/page-intercept');
const { tailor_main } = require('#/page/page-tailor');
const { save_game, load_game } = require('#/page/page-save-load');
const { config_menu } = require('#/page/page-config');
const {
  chara_info,
  chara_info_individual_wrapped,
} = require('#/page/page-chara-info');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const { secret_labo } = require('#/page/page-shop-labo');
const { stub_line_wait, not_ported_line_wait } = require('#/utils/stub-line');

/** MAX_CHARANUM（其他/VARIABLES.ERH:2 `#DEFINE MAX_CHARANUM 90`） */
const MAX_CHARANUM = 90;

/**
 * 本文件存根化的原作调用名（作用域外指令分支的壳占位）。
 * docs/stub-registry.md 必须收录每一个（test/page-shop.test.js 核对固定）；
 * 名单变动必须同步清单。SELECT_TARGET/SELECT_ASSI 与 100 分支的 BEGIN
 * TRAIN 自 #44 起为真身/真转场，INVASION 自 #117 起为真身（[109] 的
 * BEGIN TURNEND 随之真转场），199 休息自 #395 起为真身（回合结算的
 * BEGIN TURNEND 出口），SYSTEM_SAVEGAME / SYSTEM_LOADGAME 自 #136 起为
 * 真身（200/300 分支），DUNGEON_INFO2 自 #180 起为真身（102 分支，
 * page-dungeon-info2.js），CHARA_INFO /
 * CHARA_INFO_INDIVIDUAL_WAPPED 自 #391 起为真身（101/498/499 分支，
 * page-chara-info.js），ITEM_SHOP_TRAP 自 #396 起为真身（BOUGHT >= 54 的
 * 陷阱商店，page/page-shop-trap.js；#395 的运行时占位随之撤），SECRET_LABO
 * 自 #398 起为真身（110 分支，page/page-shop-labo.js），ITEM_SHOP 自 #399
 * 起为真身（BOUGHT 0-53 的道具商店，page/page-item-shop.js；#395 的运行时
 * 占位随之撤），MONSTER_SHOP 自 #399 起为真身（120 分支的召唤商店，
 * page/page-monster-shop.js），CONFIG 自 #463 起为真身（777 分支，
 * page/page-config.js），INTERCEPT / ABILITY_UP / TAILOR_MAIN 自 #397 起为
 * 真身（104/105/108 分支，page-intercept.js / page-ability-up.js /
 * page-tailor.js），均移出本名单（#515 订正：三个名字此前与测试一同停在旧
 * 状态，见 test/page-shop.test.js 的固定断言）。999 分支的 DEBUG_MENU_U
 * 自 #542 起判不移植（原作者调试工具），运行时提示行不是存根占位，移出
 * 本名单；分支结构与汇合路径保留（usershop 的 999 分支注释）。
 */
const STUBBED_CALLS = ['批量处刑', 'LABO', 'SHOW_FLOOR'];

/**
 * @EVENTSHOP（:4-20）：每轮 BEGIN SHOP 进入时执行一次。
 *
 * 普通档注册进事件链（#46 起 @EVENTSHOP 是多定义事件：口上系统的
 * EVENT_K.ERB:12-15 挂 #PRI 档置口上总开关，先于本处理器跑——Emuera 的
 * #PRI 语义，system/event/registry.js）。
 */
on(
  'EVENTSHOP',
  () => {
    // :7-12 バグ対策：指针越界钳制（判据的 ID 语义移植说明见
    // page-main-menu.js 的 reset_out_of_range_pointers）。
    reset_out_of_range_pointers();

    // :15-18 REPEAT 100: ITEMSALES:COUNT = 0（清道具上架位）。Item 表已随
    // #38 落地，item* 寻址的直接崩溃支（PR #34）已消除；注意清零范围 0..99 覆盖
    // @EVENTFIRST :35 置 1 的 53 号——原作即如此（清空后由商店侧重新点亮
    // 在售位），1:1 照搬两层写入。
    for (let i = 0; i < 100; i += 1) {
      era.set(`itemsales:${i}`, 0);
    }

    // :20 BOUGHT = -1（#395 起落表：flag:10029，与 @EVENTFIRST :27 的初始化
    // 同一变量，见文件头 BOUGHT 段）。
    era_flag.bought = -1;
  },
  TIER.NORMAL,
);

/**
 * @SHOW_SHOP（:22-38）：绘制一轮主菜单。
 *
 * @param {import('#/page/components/screen-block').ScreenBlock} main_menu
 *   主菜单画面组件（run_shop 进入 SHOP 状态时创建；本函数即组件的每轮重入）
 */
async function show_shop(main_menu) {
  // :24 SAVESTR:0 = 你（魔王的存档名字串）：SAVESTR 未落表，消费者（名字
  // 按钮 498/499 等）随角色数据票——登记 docs/stub-registry.md 变量级待办
  // （#5 已决由内置 callname 承载，接入随彼票）。

  // :25 CALL CLEAR_SHOP（清 ITEMSALES:0-299）：每轮重绘前都清一遍，商店
  // 本体（@ITEM_SHOP / @ITEM_SHOP_TRAP）随后各自重新点亮——清与亮分居两处
  // 是原作的形状（商店轮内还各有一次清，见 usershop 的 997/998/999）。
  clear_shop();

  // :26-27 JUMP ITEM_SHOP（BOUGHT 0-53，道具商店）：#399 起真身
  // （page/page-item-shop.js）。整个接管本轮——日期修正与主菜单都不执行
  // （1:1）；玩家 [999] 退出后（bought → -1）的下一次重绘由主菜单组件的
  // 锚点跨度收掉商店那段（同 #396 陷阱商店的机制）。
  if (era_flag.bought >= 0 && era_flag.bought < 54) {
    await item_shop();
    return undefined; // 本轮没画主菜单，无行数可报（调用方 run_shop 不取返回值）
  }

  // :28-29 JUMP ITEM_SHOP_TRAP（BOUGHT >= 54，陷阱商店）：#396 起真身
  // （page/page-shop-trap.js）。BOUGHT 停在 54-91 的情形有两处：商店内切
  // 陷阱商店（998），以及刚买下 54 号【淫魔知识】（BOUGHT 停在 54，原作
  // 的「可以购买淫魔的陷阱了」正是这个转场）。
  if (era_flag.bought >= 54) {
    await item_shop_trap();
    return undefined; // 同上
  }

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
  // page/page-main-menu.js）。自 #73 起主菜单是画面组件：本函数每轮的重入
  // ＝组件的就地重绘——清锚点跨度（自身行 + input 回显行 + 分发期临时输出）
  // 再重画，等价于原作引擎在 @USERSHOP 返回后重画主菜单；首绘（组件未画过）
  // 不清屏，保住上方内容（送行句/分割线等）。重绘只发生在玩家交互之后：
  // 本函数只在 run_shop 的循环里被调，输入先行（ADR-0003 的约定落点）。
  const row_count = await main_menu.redraw();

  return row_count;
}

/**
 * @USERSHOP（:40-229）：主菜单输入分发（issue #24；100 分支随 #44 补全）。
 *
 * 结构 1:1：整条 IF/ELSEIF 链照原作顺序搬，**没有 ELSE**——认不出的输入
 * （含被守卫拦下的 100/496/497，A == 0 时）落到函数尾（对应 :226-229 的
 * RETURN 0），回循环重绘，不提示、不报错（原作行为）。
 *
 * 作用域外的指令分支按原作结构留壳：运行时打一行占位（原作调用名可检
 * 索），真行为整支欠着，docs/stub-registry.md 整组登记。100 分支自 #44 起
 * 是真身（SELECT_TARGET 真身 + BEGIN TRAIN 真转场）；109 分支自 #117 起
 * 是真身（INVASION 窄路径 + BEGIN TURNEND 真转场）；199 休息自 #395 起
 * 是真身（回合结算的 BEGIN TURNEND 出口，见函数体注释）。
 *
 * @param {number} result 玩家输入（原作 RESULT，即 era.input() 的返回值）
 */
async function usershop(result) {
  // 引擎侧的购买分派（販売アイテム数 = 100）：店内输入 0-99 一律进购买
  // 流程、**不进 @USERSHOP**（guide 的 config.md「販売アイテム数」条）。
  // #399 起这一段有宿主：原作 :73 的 PRINT_SHOPITEM 是引擎命令，ere 侧拆成
  // page-item-shop.js 的 print_shopitem（列货）＋ purchase（校验 → BOUGHT
  // → 给货 → 扣钱 → @EVENTBUY）。判据不含 BOUGHT：主菜单下 0-99 的输入在
  // 原作同样进购买流程、只是 ITEMSALES 全为 0 而无声退回（CLEAR_SHOP 的
  // 结果）；引擎侧只送达已打印按钮的编号，主菜单不印这些编号，故该情形
  // 只经直调可达（#130）。
  if (result >= 0 && result < SHOP_ITEM_COUNT) {
    await purchase(result);
    return;
  }

  // :44-57 店内购物段（RESULT 997-999 && BOUGHT >= 0 → 清购物标志 / 切商店）。
  // #395 给 BOUGHT 落了表、#396 接上陷阱商店、#399 接上道具商店，整段自此
  // 三支都是真身——判据与出口 1:1，三支的 **return 形态各不相同**，照原作
  // 逐支还原：
  //   - 999（:44-46）没有 RETURN：清标志后落到 :222-223 的 999 分支
  //     →DEBUG_MENU_U（原作如此，玩家退出商店的同时打开调试菜单）；
  //   - 998/997（:47-54）是 JUMP：跳过去就不再回本函数，故切完即 return；
  //   - BOUGHT >= 0 的其它输入（:55-57）RETURN 0：购物态下主菜单指令全部
  //     失效，只有 997/998/999 三个键有反应。
  // 三处 CALL CLEAR_SHOP（清 ITEMSALES:0-299）自 #399 起是真身——
  // @SHOW_SHOP 每轮进店也清一次（本文件 show_shop 的 clear_shop），此处是
  // 退出/切店时的即时清账（1:1 保留两次清）。
  if (result === 999 && era_flag.bought >= 0) {
    clear_shop(); // :45
    era_flag.bought = -1; // :46
  } else if (result === 998 && era_flag.bought >= 0) {
    era_flag.bought = 200; // :48
    clear_shop(); // :49
    await item_shop_trap(); // :50 JUMP ITEM_SHOP_TRAP（切陷阱商店并立即重画）
    return;
  } else if (result === 997 && era_flag.bought >= 0) {
    era_flag.bought = 1; // :52
    clear_shop(); // :53
    await item_shop(); // :54 JUMP ITEM_SHOP（切道具商店并立即重画）
    return;
  } else if (era_flag.bought >= 0) {
    return; // :55-57 的 RETURN 0
  }

  // A（可选奴隶数）：原作在 @DRAW_MAINMENU :208-216 算出，:59/:152/:154
  // 的守卫读它；渲染与分发两次求值之间无写入路径，分发时重算等价。实机
  // 当前只有角色 0（魔王不计入），A 恒 0——100/496/497 进不去，这是原作
  // 行为，勿为让占位可见而放宽守卫（#24 派单核实事实 #4）。
  const selectable_count = count_selectable_slaves();

  if (result === 100 && selectable_count > 0) {
    // 进调教（:59-101，#44 补全）。
    if (era_flag.target <= 0) {
      // :65-68 目标未选 → CALL SELECT_TARGET（真身见 page-select-target.js）；
      // SIF RESULT == 0（取消/列表为空）→ RETURN 0
      const selected = await select_target();
      if (selected === 0) {
        return; // :67-68
      }
    }
    // $SELECT_ASSI_LOOP（:71-97）：助手候选计数 TEMP:3——CFLAG:x:0 == 2
    //（助手役）且 x != 0 且 CFLAG:x:1 == 0（未占用）且 x != TARGET。单奴隶
    // 路径 TEMP:3 == 0 → 跳过 CALL SELECT_ASSI；
    // TARGET == ASSI 时助手作废、GOTO 回标签重查（循环等价物：continue 跳过
    // 尾检查，与原作 GOTO 直达标签一致）
    let select_assi_loop = true;
    while (select_assi_loop) {
      select_assi_loop = false;
      if (era_flag.assi <= 0) {
        const assi_candidates = era
          .getAddedCharacters()
          .filter(
            (cid) =>
              cid !== 0 &&
              (era.get(`cflag:${cid}:0`) || 0) === 2 &&
              (era.get(`cflag:${cid}:1`) || 0) === 0 &&
              era_flag.target !== cid,
          ).length;
        if (assi_candidates >= 1) {
          // :79-80 CALL SELECT_ASSI（真身见 page-select-target.js，#395）
          const assi_result = await select_assi();
          // :81-82 SIF RESULT == 2 → RETURN 0（「我先想想」，取消整次调教）
          if (assi_result === 2) {
            return;
          }
        }
        // :83-84 SIF ASSI == 0 → ASSI = -1（select_assi 的两个真实分支恒把
        // ASSI 置为 -1 或有效 ID，此处是原作留的防御性兜底，1:1 保留）
        if (era_flag.assi === 0) {
          era_flag.assi = -1;
        }
        // 测试覆盖备注：这里的 TARGET === ASSI 在当前过滤链下结构性不可达——
        // assi_candidates 的筛选式与 IS_ASSISTABLE（page-select-target.js）
        // 都显式排除 cid === TARGET，真实 select_assi() 选中结果不可能等于
        // TARGET；未调用时（0 个候选）ASSI 维持在进块前的 <= 0，TARGET 此时恒
        // >= 1，也不相等。与下方 :91-92 循环尾检查同样的判据不同：循环尾
        // 可在 ASSI 预先已为有效值且恰好等于 TARGET 时命中（跳过本块直接进这），
        // 这一处则不行——保留为原作 1:1 的防御性代码，不补测试（改坐它不可观测）。
        if (era_flag.target === era_flag.assi) {
          // :85-88 目标与助手同人 → 助手作废，GOTO SELECT_ASSI_LOOP
          era_flag.assi = -1;
          select_assi_loop = true;
          continue;
        }
      }
      // :91-92 SIF ASSI >= 1 && TARGET == ASSI → ASSI = -1（循环外尾检查）
      if (era_flag.assi >= 1 && era_flag.target === era_flag.assi) {
        era_flag.assi = -1;
      }
    }
    // :94-97 育儿室判定：CFLAG:MASTER:1 == 10 → 报文 RETURN 0
    if ((era.get('cflag:0:1') || 0) === 10) {
      era.print('育儿室中的你不能进行调教……'); // %CALLNAME:MASTER%（恒「你」）
      await era.waitAnyKey(); // PRINTFORMW 的读键
      return;
    }
    // :98-99 SIF TARGET >= 1 && TARGET != ASSI → BEGIN TRAIN（#44 接通：
    // 信号上抛，主循环进 TRAIN 状态——train-loop.js）
    if (era_flag.target >= 1 && era_flag.target !== era_flag.assi) {
      begin(STATE.TRAIN);
    }
    // :101 RETURN 1 —— BEGIN 已结束原作函数，ere 侧 begin() 抛出后同样
    // 到不了这里；守卫不成立时（理论上不可达）落到链尾 RETURN 0
  } else if (result === 101) {
    // 能力显示（:102-106）：CALL CHARA_INFO，返回 1 才 BEGIN TURNEND
    // （:105，出口之一，#391 起真身）
    if ((await chara_info()) === 1) {
      begin(STATE.TURNEND);
    }
  } else if (result === 102) {
    // 地下城 / 场子（:108-109）：CALL DUNGEON_INFO2（#180 起真身：ere/page/
    // page-dungeon-info2.js 的三标签页情报界面；按钮文案依 FLAG:502——渲染
    // 在 page-main-menu.js 的指令面板段，随本票落地）
    await dungeon_info2();
  } else if (result === 103) {
    // 处刑（:110；原作 EXECUTION 的调用已注释，现行调批量处刑）
    await stub_line_wait('批量处刑', '处刑（批量处刑）', '随处刑票');
  } else if (result === 104) {
    // 迎击（:113 CALL INTERCEPT）：#397 起真身（page/page-intercept.js），
    // 返回前自己完成出击决定与 GOHOUBI_REQUEST，回到这里只需重绘
    await intercept();
  } else if (result === 105) {
    // 能力值提升（:115 CALL ABILITY_UP）：#397 起真身（page/page-ability-up.js）。
    // 原作 SHOP_2.ERB:248 的出售资格复核在 @ABILITY_UP_CORE 的 [999] 支内部
    // （读的是 CORE 期间的 TARGET），这里不再重复调用 check_sellassiable
    // （#395 时代先落的那句已知尾接缝随真身落地撤掉）
    await ability_up();
  } else if (result === 106) {
    // 贩卖奴隶（:117，#339 真身）
    await chara_sale();
  } else if (result === 107) {
    // 购物（:119-120）：BOUGHT = 1，下一轮 @SHOW_SHOP 据此跳道具商店
    // （show_shop 的 0-53 支，#399 起本体是真身 page/page-item-shop.js）
    era_flag.bought = 1;
  } else if (result === 108) {
    // 换装（:121-122 CALL TAILOR_MAIN; TARGET = FLAG:1）：#397 起真身
    // （page/page-tailor.js）。买成后 TAILOR_CORE 把 TARGET 置 -1
    // （:249），故返回后按原作把 TARGET 还原为「前回调教目标」
    await tailor_main();
    era_flag.target = era.get('flag:1') || 0;
  } else if (result === 109) {
    // 侵略（:124-128）：CALL INVASION（#117 起真身：魔力出兵窄路径，
    // ere/page/page-invasion.js），返回 1 才 BEGIN TURNEND（:127，出口
    // 之一——BEGIN 结束当前函数，ere 侧信号上抛由主循环接站）
    if ((await invasion()) === 1) {
      begin(STATE.TURNEND);
    }
  } else if (result === 110 && (era.get('talent:0:325') || 0) === 1) {
    // 实验室（:130-131）：守卫 TALENT:0:325 == 1（魔王的魔界知识，
    // DRAW_HAVEITEMS 的判定同源）。talent 表未落 yml/ 时读值 undefined →
    // || 0 → 守卫不成立（#38 落表后随初始素质生效）
    // #398 起真身：SHOP_LABO ver1.0.2.ERB 全 52 函数（page/page-shop-labo.js）
    await secret_labo();
  } else if (
    result === 111 &&
    ((era.get('flag:83') || 0) !== 0 || (era.get('flag:84') || 0) !== 0)
  ) {
    // 设施·设备（:132-133）：守卫 FLAG:83 || FLAG:84（肉便器 / 展品数，
    // DRAW_DUNGEON_OVERVIEW 的统计同源）
    await infrastructure(selectable_count);
  } else if (result === 199) {
    // 休息（:134-139，#395 起真身）：内联文本 + FLAG:9 += 5（税金）+
    // BEGIN TURNEND（出口之一——本票的到站标记：引擎里第一次能把回合
    // 推过去）。BEGIN 立即上抛，原作 RETURN 1 到不了（同 [109] 的
    // BEGIN 之后不留代码的处理）。
    era.print('你专心于内政，稍作了休息……（税金+5%）');
    game.stronghold.税金修正 += 5;
    begin(STATE.TURNEND);
  } else if (result === 200) {
    // 保存（:140）：CALL SYSTEM_SAVEGAME（真身见 page/page-save-load.js，
    // #136；返回后回循环重绘主菜单——读档界面若换过数据，重绘即新状态）
    await save_game();
  } else if (result === 300) {
    // 读取（:142）：CALL SYSTEM_LOADGAME（标题画面共用，#136）；读档成功
    // 后 era.loadData 已整体替换数据表，回循环重绘的主菜单读新值
    await load_game();
  } else if (result === 777) {
    // 设定（:144）。#463 起为真身——CONFIG.ERB 全量移植
    await config_menu();
  } else if (result === 888) {
    // 通信（:146）
    await maounet();
  } else if (result === 400) {
    // LABO（:148；面板无此按钮，2D 迷宫地质相关的隐入口）
    await stub_line_wait('LABO', '2D 迷宫实验室', '随迷宫票');
  } else if (result === 496 && selectable_count > 0) {
    // 调教目标（:152-153）：CALL SELECT_TARGET（真身见 page-select-target.js，
    // 原作此调用点忽略返回值——只开选择画面）
    await select_target();
  } else if (result === 497 && selectable_count > 0) {
    // 助手（:154-155）：CALL SELECT_ASSI（占位，见上）
    await select_assi();
  } else if (result === 498) {
    // 目标名按钮（:156-157）：CALL CHARA_INFO_INDIVIDUAL_WAPPED, TARGET
    // （按钮本体随角色数据票，DRAW_MAINMENU.ERB:100-145）。原作无守卫，
    // 指针未选也一样进分支——1:1（#391 起真身）
    await chara_info_individual_wrapped(era_flag.target);
  } else if (result === 499) {
    // 助手名按钮（:158-159）：同上，实参 ASSI
    await chara_info_individual_wrapped(era_flag.assi);
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
    await stub_line_wait('SHOW_FLOOR', '阶层信息', '随迷宫票');
  } else if (result === 120) {
    // 召唤（:172-221）：卡拉启动！== 1 时内联卡拉入队事件（SAVEDATA 自定义
    // 变量、无 ere 落点 → 恒非 1，#24 起登记，本票不改）；否则
    // CHARANUM < MAX_CHARANUM 时 CALL MONSTER_SHOP（#399 起真身，
    // page/page-monster-shop.js），满员打印「奴隶太多了！」
    if (era.getAddedCharacters().length < MAX_CHARANUM) {
      await monster_shop();
    } else {
      era.print('奴隶太多了！'); // :220 PRINTW
      await era.waitAnyKey();
    }
  } else if (result === 999) {
    // 调试菜单（:222-223）。店内键入 999 时 usershop 开头的购物段（:44）
    // 已经把 BOUGHT 清回 -1 并落到这里（原作同样没有 RETURN）——两条路径
    // 汇到同一个出口，故不区分。DEBUG_MENU_U 随 DEBUG小白娘判不移植
    // （#542，#540 范围决定 3：原作者的调试工具；原作商店输入 999 进入，
    // ere 输入只接受已打印按钮，入口本就不可达——#130），分支保留结构
    // 与不移植提示
    await not_ported_line_wait(
      'DEBUG_MENU_U',
      '调试菜单',
      '#542 判不移植：原作者的调试工具',
    );
  }

  // :226-227 链外尾检查（SIF，非 ELSEIF）：未被链上分支提前 RETURN 的
  // 输入再查一次 7788。链上的提前 return 都在 100 分支内（取消 :68 与
  // 育儿室 :96，同原作），其余分支落到这里时 result 必非 7788，判定等价。
  if (result === 7788) {
    await relation_debugprint();
  }
  // :226-229 RETURN 0：认不出 / 守卫拦下的输入一律落到这里，回 @SHOW_SHOP
  // 重绘（run_shop 的下一轮循环）。原作的 RETURN 0/1 都被引擎循环忽略、
  // 恒重绘，ere 侧无需区分。
}

/**
 * STATE.SHOP 的处理器：@EVENTSHOP 一次 + 「@SHOW_SHOP 绘制 → INPUT →
 * @USERSHOP 分发」的循环。正常情况下永不返回（菜单是游戏的中枢，经 BEGIN
 * 转场离开，如原作 @USERSHOP :99 的 BEGIN TRAIN——#44 已接入，begin() 的
 * BeginSignal 从本循环自然上抛、由主循环接站；本模块不写 try/catch，
 * 不会吞信号，#6 硬约束）。
 *
 * @param {object} [options]
 * @param {boolean} [options.skip_eventshop] 跳过 @EVENTSHOP 链——
 *   STATE.SHOP_AFTER_LOAD（读档后的进入路径）专用：技能
 *   system-flow.md:51-53「读档后不执行 @EVENTSHOP」。读档回来的世界
 *   以存档数据为准，@EVENTSHOP 的两个动作（指针越界钳制 + 清 100 个
 *   道具上架位）都是「新进商店轮」的初始化，重放会给读入的数据盖掉
 *   存档时的在售状态。
 */
async function run_shop({ skip_eventshop = false } = {}) {
  if (!skip_eventshop) {
    // @EVENTSHOP 链（普通档是本文件的处理器；口上总开关的 #PRI 档在
    // kojo/kojo-system.js——#PRI 先跑，见 eventshop 注册处的说明）
    await emit('EVENTSHOP');
  }
  // 主菜单画面组件：随 SHOP 状态的进入创建（create_main_menu 的注释说明
  // 为什么不做模块级单例——锚点是会话态，跨会话复用会拿旧锚点清本局内容）
  const main_menu = create_main_menu();
  for (;;) {
    await show_shop(main_menu);
    // 引擎侧：玩家点按钮（printButton 的快捷键）或直接键入编号；INPUT 的
    // 返回值即原作 RESULT，交 @USERSHOP 的等价物分发（原作引擎把结果放
    // RESULT 调 @USERSHOP，ere 侧收进 usershop 的形参）。
    await usershop(await era.input());
    // 分发完回 @SHOW_SHOP 重绘（原作循环结构）：面板切换类分支（500 等）
    // 的反馈就是这一次重绘；无效输入同路，无提示。
  }
}

// usershop 一并导出（#130）：引擎的 input() 只送达已打印按钮的快捷键。
// #395 起 [101]-[888] 大部分分支已配上按钮（page-main-menu.js 的指令面板
// 段，渲染真身、分发仍存根，见该文件文件头）；仍无按钮的是 498/499
// （名字按钮随角色数据票）、52x（阶层信息，DRAW_DUNGEON_OVERVIEW 的
// [520]-[530] 已打，登记与本文件无关）与 999/7788（隐藏调试入口，原作
// 本就无 PRINTLC）——这些分支的分发行为只能经直接调用测试，不经输入通道。
module.exports = { run_shop, usershop, STUBBED_CALLS };
