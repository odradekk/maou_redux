/**
 * @file 商店轮（据点主界面）：STATE.SHOP 的处理器。
 *
 * 循环结构：进入 SHOP 状态时先跑 EVENTSHOP 事件链一次，随后循环
 * 「show_shop 绘制 → 等输入 → usershop 分发」——这一轮收进本模块导出的
 * 处理器 run_shop，由 main-loop.js 的 STATE_HANDLERS 接驳。
 *
 * BOUGHT（购入品指针，#395 起落表：yml/Flag.yml「购入品指针」/
 * ere-utils/era-flag.js 的 bought）：show_shop 开头按 BOUGHT 分流、整个
 * 接管本轮（0-53 跑 item_shop、≥ 54 跑 item_shop_trap，都不再画主菜单）。
 * #396 起 ≥ 54 一侧是真身（page/page-shop-trap.js）、#399 起 0-53 一侧也是
 * （page/page-item-shop.js），usershop 的店内购物段（997-999 且
 * BOUGHT >= 0）三支到齐——退出商店的出口与进入商店的入口必须同一张工单
 * 完成，否则玩家会被困在商店界面里。
 *
 * **购买流程也归本文件的输入分发**：店内输入 0-99（販売アイテム数）进商品
 * 购买与购买回调、其余才交菜单分发——EraElectron 没有这条内建引擎路径
 * （guide 的 system-flow:60-64 与 config.md「販売アイテム数」条是该语义的
 * 两处记载），故本文件的 usershop 开头补上这一段（page-item-shop.js 的
 * purchase），两个商店共用。
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
const { dungeon_info2, enemy_exist2 } = require('#/page/page-dungeon-info2');
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
// SHOW_FLOOR 的怪物行与近卫名单（#548）：怪物名与 %SAVESTR% 的承载
const { item_name, monstername } = require('#/dungeon/monster-data');
const { chara_callname } = require('#/utils/callname-utils');
const { batch_execution } = require('#/event/event-execution-batch');
const { pad_display } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/** 已加入角色数上限 */
const MAX_CHARANUM = 90;

/**
 * EVENTSHOP 链的普通档处理器：每次进入 SHOP 状态时执行一次。
 *
 * 普通档注册进事件链（#46 起 EVENTSHOP 是多定义事件：口上系统在
 * kojo/kojo-system.js 挂 #PRI 档置口上总开关，先于本处理器跑——分档语义
 * 见 system/event/registry.js）。
 */
on(
  'EVENTSHOP',
  () => {
    // 指针越界钳制（判断条件的 ID 语义移植说明见
    // page-main-menu.js 的 reset_out_of_range_pointers）。
    reset_out_of_range_pointers();

    // 清道具上架位（ITEMSALES:0-99 全部置 0）。Item 表已随 #38 落表，
    // item* 寻址的直接崩溃支（PR #34）已消除；注意清零范围 0..99 覆盖开局
    // EVENTFIRST 链置 1 的 53 号——先清干净，在售位随后由商店侧重新点亮。
    for (let i = 0; i < 100; i += 1) {
      era.set(`itemsales:${i}`, 0);
    }

    // BOUGHT = -1（#395 起落表：flag:10029，与 EVENTFIRST 链的初始化
    // 同一变量，见文件头 BOUGHT 段）。
    era_flag.bought = -1;
  },
  TIER.NORMAL,
);

/**
 * show_shop：绘制一轮主菜单。
 *
 * @param {import('#/page/components/screen-block').ScreenBlock} main_menu
 *   主菜单画面组件（run_shop 进入 SHOP 状态时创建；本函数即组件的每轮重入）
 */
async function show_shop(main_menu) {
  // SAVESTR:0 = 你（魔王的存档名字串）：#5 决议由内置 callname:0:-1
  // 承载（Chara0.yml 的名前同为「你」）。ere 侧没有它的读者——需要魔王名
  // 时一律走 name_of(0)/chara_callname，所以这里不做「每轮重写回你」的
  // 维护（#548 清单订正：名字按钮 498/499 也不读它）。

  // clear_shop（清 ITEMSALES:0-299）：每轮重绘前都清一遍，商店本体
  // （item_shop / item_shop_trap）随后各自重新点亮——清与亮分居两处是
  // 既有结构（商店轮内还各有一次清，见 usershop 的 997/998/999）。
  clear_shop();

  // BOUGHT 0-53 → item_shop（道具商店）：#399 起真身
  // （page/page-item-shop.js）。整个接管本轮——日期修正与主菜单都不执行；
  // 玩家 [999] 退出后（bought → -1）的下一次重绘由主菜单组件的
  // anchor_row 跨度收掉商店那段（同 #396 陷阱商店的机制）。
  if (era_flag.bought >= 0 && era_flag.bought < 54) {
    await item_shop();
    return undefined; // 本轮没画主菜单，无行数可报（调用方 run_shop 不取返回值）
  }

  // BOUGHT >= 54 → item_shop_trap（陷阱商店）：#396 起真身
  // （page/page-shop-trap.js）。BOUGHT 停在 54-91 的情形有两处：商店内切
  // 陷阱商店（998），以及刚买下 54 号【淫魔知识】（BOUGHT 停在 54，成交
  // 后即转入陷阱商店）。
  if (era_flag.bought >= 54) {
    await item_shop_trap();
    return undefined; // 同上
  }

  // 防御性日期修正：月/日小于 1 时钳成 1。EVENTFIRST 链只初始化
  // DAY:1 = 1、DAY 与 DAY:2 留 0（#22 的决定），玩家看到的开局因此是
  // 「第 0 年 1 月 1 日（第 1 日）」——修正只发生在 SHOP 侧，勿挪去初始
  // 化侧（#22 验收移交的提醒）。
  if (era_flag.month < 1) {
    era_flag.month = 1;
  }
  if (era_flag.date < 1) {
    era_flag.date = 1;
  }

  // 主菜单绘制在 page/page-main-menu.js。自 #73 起主菜单是画面组件：
  // 本函数每轮的重入＝组件的就地重绘——清 anchor_row 跨度（自身行 +
  // input 回显行 + 分发期临时输出）再重画；首绘（组件未画过）不清屏，
  // 保住上方内容（送行句/分割线等）。重绘只发生在玩家交互之后：本函数
  // 只在 run_shop 的循环里被调，输入先行（ADR-0003 的约定落点）。
  const row_count = await main_menu.redraw();

  return row_count;
}

/**
 * usershop：主菜单输入分发（issue #24；100 分支随 #44 补全）。
 *
 * 整条 IF/ELSEIF 链顺序固定，**没有 ELSE**——认不出的输入（含被检查
 * 拦下的 100/496/497，A == 0 时）落到函数尾返回，回循环重绘，不提示、
 * 不报错。
 *
 * 指令分支全部真身化（#391-#548 逐票接通；999 调试菜单与 400 隐入口随
 * #638 删除——缺内容的入口按 #574「去掉入口」处理，见函数体注释）。
 *
 * @param {number} result 玩家输入（era.input() 的返回值）
 */
async function usershop(result) {
  // 购买分派（販売アイテム数 = 100）：店内输入 0-99 一律进购买流程、
  // **不进下方的菜单分发**（guide 的 config.md「販売アイテム数」条）。
  // #399 起这一段有宿主：page-item-shop.js 的 print_shopitem（列货）＋
  // purchase（校验 → BOUGHT → 给货 → 扣钱 → event_buy）。判断条件不含
  // BOUGHT：主菜单下 0-99 的输入同样进购买流程，ITEMSALES 全为 0 时
  // purchase 无声退回（clear_shop 的结果）；引擎侧只送达已打印按钮的
  // 编号，主菜单不印这些编号，故该情形只经直调可达（#130）。
  if (result >= 0 && result < SHOP_ITEM_COUNT) {
    await purchase(result);
    return;
  }

  // 店内购物段（RESULT 997-999 && BOUGHT >= 0 → 清购物标志 / 切商店）。
  // #395 给 BOUGHT 落了表、#396 接上陷阱商店、#399 接上道具商店，整段自此
  // 三支都是真身——判断条件与出口行为固定，三支的 **return 写法各不相同**，
  // 逐支说明：
  //   - 999 没有独立的返回语句、落到函数尾：清完购物标志回到主菜单，
  //     **不进调试菜单**（旧移植按「调用之后输入值不变」错落到 7788 的
  //     调试菜单分支，#562 实机发现；语义依据见 #592 的完成评论）；
  //   - 998/997 是切换商店：切完立即重画、不再回本函数，故切完即 return；
  //   - BOUGHT >= 0 的其它输入直接 return：购物态下主菜单指令全部失效，
  //     只有 997/998/999 三个键有反应。
  // 三处 clear_shop（清 ITEMSALES:0-299）自 #399 起是真身——show_shop
  // 每轮进店也清一次，此处是退出/切店时两次清账（既有行为）。
  if (result === 999 && era_flag.bought >= 0) {
    clear_shop();
    era_flag.bought = -1;
    return; // 支的出口：回主菜单（#592）
  } else if (result === 998 && era_flag.bought >= 0) {
    era_flag.bought = 200;
    clear_shop();
    await item_shop_trap(); // 切陷阱商店并立即重画
    return;
  } else if (result === 997 && era_flag.bought >= 0) {
    era_flag.bought = 1;
    clear_shop();
    await item_shop(); // 切道具商店并立即重画
    return;
  } else if (era_flag.bought >= 0) {
    return; // 购物态下其它输入无反应，回循环重绘
  }

  // A（可选奴隶数）：主菜单渲染（page-main-menu.js）也算过同一份，
  // 100/496/497 三个分支的检查读它；渲染与分发两次求值之间无写入路径，
  // 分发时重算等价。没有可选奴隶时 A 为 0，100/496/497 进不去——这是既定
  // 行为，勿为让占位可见而放宽检查（#24 派单核实事实 #4）。
  const selectable_count = count_selectable_slaves();

  if (result === 100 && selectable_count > 0) {
    // 进调教（#44 补全）。
    if (era_flag.target <= 0) {
      // 目标未选 → select_target()（真身见 page-select-target.js）；
      // 返回 0（取消/列表为空）则整次调教作罢
      const selected = await select_target();
      if (selected === 0) {
        return;
      }
    }
    // 助手选择循环：候选计数——CFLAG:x:0 == 2（助手役）且 x != 0 且
    // CFLAG:x:1 == 0（未占用）且 x != TARGET。无候选（单奴隶路径）→
    // 跳过 select_assi()；TARGET == ASSI 时助手作废、回循环头重查
    //（continue 跳过尾检查，等价于直接跳回循环标签）
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
          // select_assi()（真身见 page-select-target.js，#395）
          const assi_result = await select_assi();
          // 返回 2（「我先想想」）→ 取消整次调教
          if (assi_result === 2) {
            return;
          }
        }
        // ASSI == 0 时置 -1（select_assi 的两个真实分支恒把 ASSI 置为 -1
        // 或有效 ID，此处是防御性缺省处理，结构保留）
        if (era_flag.assi === 0) {
          era_flag.assi = -1;
        }
        // 测试覆盖备注：这里的 TARGET === ASSI 在当前过滤链下结构性不可达——
        // assi_candidates 的筛选式与 is_assistable（page-select-target.js）
        // 都显式排除 cid === TARGET，真实 select_assi() 选中结果不可能等于
        // TARGET；未调用时（0 个候选）ASSI 维持在进块前的 <= 0，TARGET 此时恒
        // >= 1，也不相等。下方循环尾检查用的是同一判断条件，但它可在 ASSI
        // 预先已为有效值且恰好等于 TARGET 时命中（跳过本块直接进这），这一处
        // 则不行——保留为防御性代码，不补测试（改它不可观测）。
        if (era_flag.target === era_flag.assi) {
          // 目标与助手同人 → 助手作废，回循环头重查
          era_flag.assi = -1;
          select_assi_loop = true;
          continue;
        }
      }
      // ASSI >= 1 且 TARGET == ASSI → ASSI = -1（循环外尾检查）
      if (era_flag.assi >= 1 && era_flag.target === era_flag.assi) {
        era_flag.assi = -1;
      }
    }
    // 育儿室判定：CFLAG:MASTER:1 == 10 → 打印报文后返回
    if ((era.get('cflag:0:1') || 0) === 10) {
      era.print('育儿室中的你不能进行调教……'); // 魔王呼名恒为「你」
      await era.waitAnyKey(); // 报文后等一键
      return;
    }
    // TARGET >= 1 且 TARGET != ASSI → begin(STATE.TRAIN)（#44 接通：
    // 信号上抛，主循环进 TRAIN 状态——train-loop.js）
    if (era_flag.target >= 1 && era_flag.target !== era_flag.assi) {
      begin(STATE.TRAIN);
    }
    // begin() 抛出后到不了这里；检查不成立时（理论上不可达）落到链尾
  } else if (result === 101) {
    // 能力显示：chara_info()，返回 1 才 begin(STATE.TURNEND)（出口之一，
    // #391 起真身）
    if ((await chara_info()) === 1) {
      begin(STATE.TURNEND);
    }
  } else if (result === 102) {
    // 地下城 / 场子：dungeon_info2()（#180 起真身：ere/page/
    // page-dungeon-info2.js 的三标签页情报界面；按钮文案依 FLAG:502——
    // 渲染在 page-main-menu.js 的指令面板段）
    await dungeon_info2();
  } else if (result === 103) {
    // 处刑：batch_execution()——#543 起真身（ere/event/
    // event-execution-batch.js，批量处刑；会话内自带调教窗口以提供口上
    // 通道的 tflag 表，见该文件头）
    await batch_execution();
  } else if (result === 104) {
    // 迎击：intercept()（#397 起真身，page/page-intercept.js），返回前
    // 自己完成出击决定与 gohoubi_request，回到这里只需重绘
    await intercept();
  } else if (result === 105) {
    // 能力值提升：ability_up()（#397 起真身，page/page-ability-up.js）。
    // 出售资格复核在 ability_up_core 的 [999] 支内部（读的是 CORE 期间的
    // TARGET），这里不再重复调用 check_sellassiable（#395 时代先落的那句
    // 已知尾接缝随真身实现撤掉）
    await ability_up();
  } else if (result === 106) {
    // 贩卖奴隶（#339 真身）
    await chara_sale();
  } else if (result === 107) {
    // 购物：BOUGHT = 1，下一轮 show_shop 据此跳道具商店（show_shop 的
    // 0-53 支，#399 起本体是真身 page/page-item-shop.js）
    era_flag.bought = 1;
  } else if (result === 108) {
    // 换装：tailor_main()（#397 起真身，page/page-tailor.js）。买成后
    // tailor_core 把 TARGET 置 -1，故返回后把 TARGET 还原为「前回调教
    // 目标」（flag:1）
    await tailor_main();
    era_flag.target = era.get('flag:1') || 0;
  } else if (result === 109) {
    // 侵略：invasion()（#117 起真身：魔力出兵窄路径，ere/page/
    // page-invasion.js），返回 1 才 begin(STATE.TURNEND)（出口之一——
    // begin 上抛信号，由主循环接站）
    if ((await invasion()) === 1) {
      begin(STATE.TURNEND);
    }
  } else if (result === 110 && (era.get('talent:0:325') || 0) === 1) {
    // 实验室：检查 TALENT:0:325 == 1（魔王的魔界知识，与 draw_have_items
    // 的知识标签判定同源）。talent 表未落 yml/ 时读值 undefined → || 0 →
    // 检查不成立（#38 落表后随初始素质生效）
    // #398 起真身：page/page-shop-labo.js
    await secret_labo();
  } else if (
    result === 111 &&
    ((era.get('flag:83') || 0) !== 0 || (era.get('flag:84') || 0) !== 0)
  ) {
    // 设施·设备：检查 FLAG:83 || FLAG:84（肉便器 / 展品数，与
    // draw_dungeon_overview 的统计同源）
    await infrastructure(selectable_count);
  } else if (result === 199) {
    // 休息（#395 起真身）：内联文本 + FLAG:9 += 5（税金）+
    // begin(STATE.TURNEND)（出口之一——这张工单的到站标记：引擎里第一次
    // 能把回合推过去）。begin 立即上抛，其后不留代码（同 [109] 的处理）。
    era.print('你专心于内政，稍作了休息……（税金+5%）');
    game.stronghold.税金修正 += 5;
    begin(STATE.TURNEND);
  } else if (result === 200) {
    // 保存：save_game()（真身见 page/page-save-load.js，#136；返回后回
    // 循环重绘主菜单——读档界面若换过数据，重绘即新状态）
    await save_game();
  } else if (result === 300) {
    // 读取：load_game()（标题画面共用，#136）；读档成功后 era.loadData
    // 已整体替换数据表，回循环重绘的主菜单读新值
    await load_game();
  } else if (result === 777) {
    // 设定。#463 起为真身（page/page-config.js 全量移植）
    await config_menu();
  } else if (result === 888) {
    // 通信
    await maounet();
  } else if (result === 496 && selectable_count > 0) {
    // 调教目标：select_target()（真身见 page-select-target.js；此处忽略
    // 返回值——只开选择画面）
    await select_target();
  } else if (result === 497 && selectable_count > 0) {
    // 助手：select_assi()（真身见 page-select-target.js，同 496 只开选择画面）
    await select_assi();
  } else if (result === 498) {
    // 目标名按钮：chara_info_individual_wrapped(target)（按钮本体随角色
    // 数据工单，见 page-main-menu.js 的留空说明）。无检查，指针未选也
    // 一样进分支（#391 起真身）
    await chara_info_individual_wrapped(era_flag.target);
  } else if (result === 499) {
    // 助手名按钮：同上，实参 ASSI
    await chara_info_individual_wrapped(era_flag.assi);
  } else if (result === 500) {
    // 面板切换：置 FLAG:36（信息面板选择）后什么都不做，回循环重绘——
    // 重绘即反馈（对应面板的占位换掉），**不叠占位文本**（#24 派单核实
    // 事实 #2）。flag 为引擎内嵌表，未声明下标直写可落（#13 实证，
    // page-main-menu.js 的面板渲染同址读）
    era.set('flag:36', 0);
  } else if (result === 501) {
    era.set('flag:36', 1);
  } else if (result === 504) {
    era.set('flag:36', 4);
  } else if (result === 505) {
    era.set('flag:36', 5);
  } else if (result > 520 && result <= 530) {
    // 阶层信息：result - 520 即阶层 → show_floor()（10 层为近卫）
    await show_floor(result - 520);
  } else if (result === 120) {
    // 召唤：卡拉启动！== 1 时内联卡拉入队事件（SAVEDATA 自定义变量、
    // 无 ere 落点 → 恒非 1，#24 起登记，这张工单不改）；否则已加入角色数
    // < MAX_CHARANUM 时 monster_shop()（#399 起真身，
    // page/page-monster-shop.js），满员打印「奴隶太多了！」
    if (era.getAddedCharacters().length < MAX_CHARANUM) {
      await monster_shop();
    } else {
      era.print('奴隶太多了！'); // 打印后等一键
      await era.waitAnyKey();
    }
  }
  // 调试菜单入口（作者的调试工具）自 #542 判不移植、#638 起随存根
  // 清单一并删除：主菜单不印 [999] 按钮，引擎的输入白名单（#130）本就
  // 送不到这里；店内的 999 在上面的购物段早退（#592），也不会落到链尾

  // 链外尾检查：未被链上分支提前 return 的输入再查一次 7788。链上的
  // 提前 return 都在 100 分支内（取消与育儿室两处），其余分支落到这里时
  // result 必非 7788，判定等价。
  if (result === 7788) {
    await relation_debugprint();
  }
  // 认不出 / 被检查拦下的输入一律落到这里，回 show_shop 重绘（run_shop
  // 的下一轮循环）；各分支返回值的差异不影响重绘，无需区分。
}

/**
 * show_floor：显示楼层状态（主菜单阶层按钮 [521]-[530] 的阶层信息）。
 *
 * 结构（近卫层跳过设施与部下段）：
 *   - 1-9 层：楼层头与设施后缀合一行（一次 print；有设施时模板串拼
 *     「 - 」，后缀名自带尾部全角空格补位）→
 *     设施四格（FLAG 299+阶层+{0,10,20,40}，不含 +30 段；格上有库存道具
 *     才出 [道具名]，四格合一行）→
 *     enemy_exist2 的勇侧行（含护卫名单，见下）→ 空行 → 怪物库存十格 →
 *     空行 + 读键（printAndWait）；
 *   - 10 层：近卫兵头 → 本层的护卫名单（!CFLAG:1 && EX_TALENT:1 一行一人，
 *     [名] —— + TALENT:200-211 素质名）→ 分隔线 → 怪物库存（190 号段）。
 *
 * **近卫层以外不追加护卫名单**：enemy_exist2 的护卫名单按阶层实参判断、
 * 只出在第 10 层，从本画面进 1-9 层时不追加 `[护卫中]…` 行；第 10 层的
 * 名单由本条分支自己打印。首行的空行由 enemy_exist2 落（调用方的行已落）。
 *
 * 怪物行：数量左对齐两位（pad_display）拼「只+名」（monstername 的拼接名，
 * 含改造前缀——真身 #176）。
 *
 * @param {number} arg 阶层（1-10，越界钳制）
 * @returns {Promise<void>} 调用方不消费返回值
 */
async function show_floor(arg) {
  arg = Math.min(Math.max(arg, 1), 10); // 钳到 1-10
  era.drawLine();
  if (arg <= 9) {
    // 楼层头与设施后缀合行（无对应设施则不带后缀）
    const facility = era.get(`flag:${arg + 349}`) || 0;
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
    era.print(
      facility in facility_names
        ? `第${arg}阶层 - ${facility_names[facility]}`
        : `第${arg}阶层`,
    );
    era.drawLine();
    // 设施四格（+0/+10/+20/+40，不含 +30）
    const install_fragments = [];
    for (const slot of [0, 10, 20, 40]) {
      // 槽位上的道具号；有库存才显示
      const item = era.get(`flag:${299 + arg + slot}`) || 0;
      if (item > 0 && (era.get(`item:${item}`) || 0) > 0) {
        install_fragments.push(`[${item_name(item)}]`);
      }
    }
    if (install_fragments.length > 0) {
      era.print(install_fragments.join('')); // 四格合一行
      era.drawLine(); // 有设施行才补这条线
    }
    // enemy_exist2()（#180 真身）+ 空行。护卫名单只出在近卫层（1-9 层
    // 一律不追加），与从部下一览进来的行为一致
    await enemy_exist2(arg);
    era.println();
  } else {
    // 近卫层：近卫兵头 + 护卫名单（设施/四格/enemy_exist2 三段整段不走）
    era.print('近卫兵'); // 单行标题，不补空行
    era.drawLine();
    for (const cid of era.getAddedCharacters()) {
      // 遍历已加入角色：未在勇者阵营（CFLAG:1 状态 0）但是近卫
      // （EX_TALENT:1）
      if (
        (era.get(`cflag:${cid}:1`) || 0) === 0 &&
        (era.get(`ex_talent:${cid}:1`) || 0) !== 0
      ) {
        const fragments = [{ content: `[${chara_callname(cid)}] —— ` }];
        // TALENT:200-211 的素质名依次追加
        for (let t = 200; t < 212; t += 1) {
          if (era.get(`talent:${cid}:${t}`)) {
            fragments.push({
              content: String(era.get(`talentname:${t}`) ?? ''),
            });
          }
        }
        era.print(fragments); // 一人一行
      }
    }
    era.drawLine();
  }
  // 该层怪物库存十格（槽 = (arg-1)*10+100）
  const base_slot = (arg - 1) * 10 + 100;
  for (let i = 0; i < 10; i += 1) {
    const count = era.get(`item:${base_slot + i}`) || 0;
    if (count > 0) {
      era.print(
        `${pad_display(String(count), 2)}只${monstername(base_slot + i)}`,
      );
    }
  }
  // 先落一个空行再等键（同 kojo-dungeon-ravish.js 的同款用法）
  await era.printAndWait('');
}

/**
 * STATE.SHOP 的处理器：EVENTSHOP 链一次 + 「show_shop 绘制 → 等输入 →
 * usershop 分发」的循环。正常情况下永不返回（菜单是游戏的中枢，经 begin
 * 转场离开，如 100 分支的 begin(STATE.TRAIN)——#44 已接入，begin() 的
 * BeginSignal 从本循环自然上抛、由主循环接站；本模块不写 try/catch，
 * 不会吞信号，#6 硬约束）。
 *
 * @param {object} [options]
 * @param {boolean} [options.skip_eventshop] 跳过 EVENTSHOP 链——
 *   STATE.SHOP_AFTER_LOAD（读档后的进入路径）专用：技能
 *   system-flow.md:51-53「读档后不执行 EVENTSHOP」。读档回来的世界
 *   以存档数据为准，EVENTSHOP 链的两个动作（指针越界钳制 + 清 100 个
 *   道具上架位）都是「新进商店轮」的初始化，重放会给读入的数据盖掉
 *   存档时的在售状态。
 */
async function run_shop({ skip_eventshop = false } = {}) {
  if (!skip_eventshop) {
    // EVENTSHOP 链（普通档是本文件的处理器；口上总开关的 #PRI 档在
    // kojo/kojo-system.js——#PRI 先跑，见 EVENTSHOP 注册处的说明）
    await emit('EVENTSHOP');
  }
  // 主菜单画面组件：随 SHOP 状态的进入创建（create_main_menu 的注释说明
  // 为什么不做模块级单例——anchor_row 是会话态，跨会话复用会拿旧基准清
  // 本局内容）
  const main_menu = create_main_menu();
  for (;;) {
    await show_shop(main_menu);
    // 引擎侧：玩家点按钮（printButton 的快捷键）或直接键入编号；
    // era.input() 的返回值交 usershop 分发。
    await usershop(await era.input());
    // 分发完回 show_shop 重绘：面板切换类分支（500 等）的反馈就是这一次
    // 重绘；无效输入同路，无提示。
  }
}

// usershop 一并导出（#130）：引擎的 input() 只送达已打印按钮的快捷键。
// #395 起 [101]-[888] 大部分分支已配上按钮（page-main-menu.js 的指令面板
// 段，渲染与分发全部真身）；仍无按钮的是 498/499（名字按钮随角色数据
// 工单）、52x（阶层信息，楼层总览段的 [520]-[530] 已打）与 7788（隐藏
// 调试入口，界面本就不印它）——这些分支的分发行为只能经直接调用测试，
// 不经输入通道。
module.exports = { run_shop, usershop, show_floor };
