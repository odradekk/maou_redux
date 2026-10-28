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

const { is_state } = require('#/system/flow/game-state');
const { on, emit, TIER } = require('#/system/event/registry');
const {
  dispatch_menu_item,
  draw_main_menu,
  reset_out_of_range_pointers,
} = require('#/page/page-main-menu');
const { enemy_exist2 } = require('#/page/page-dungeon-info2');
const {
  clear_shop,
  item_shop,
  purchase,
  SHOP_ITEM_COUNT,
} = require('#/page/page-item-shop');
const { item_shop_trap } = require('#/page/page-shop-trap');
const era_flag = require('#/era-utils/era-flag');
const { relation_debugprint } = require('#/system/chara/chara-family');
// SHOW_FLOOR 的怪物行与近卫名单（#548）：怪物名与 %SAVESTR% 的承载
const { item_name, monstername } = require('#/system/dungeon/monster-data');
const { change_screen } = require('#/page/components/screen-change');
const { chara_callname } = require('#/utils/callname-utils');
const { pad_display } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化
const { EVENT } = require('#/data/event-name-const');

/**
 * EVENTSHOP 链的普通档处理器：每次进入 SHOP 状态时执行一次。
 *
 * 普通档注册进事件链（#46 起 EVENTSHOP 是多定义事件：口上系统在
 * kojo/kojo-system.js 挂 #PRI 档置口上总开关，先于本处理器跑——分档语义
 * 见 system/event/registry.js）。
 */
on(
  EVENT.SHOP,
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
 */
async function show_shop() {
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
  // 玩家 [999] 退出后（bought → -1）的下一次重绘由主菜单的换屏收掉商店
  // 那段（同 #396 陷阱商店的机制）。
  if (era_flag.bought >= 0 && era_flag.bought < 54) {
    await item_shop();
    return; // 本轮没画主菜单（show_shop 无返回值，调用方不取）
  }

  // BOUGHT >= 54 → item_shop_trap（陷阱商店）：#396 起真身
  // （page/page-shop-trap.js）。BOUGHT 停在 54-91 的情形有两处：商店内切
  // 陷阱商店（998），以及刚买下 54 号【淫魔知识】（BOUGHT 停在 54，成交
  // 后即转入陷阱商店）。
  if (era_flag.bought >= 54) {
    await item_shop_trap();
    return; // 同上
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

  // 主菜单绘制在 page/page-main-menu.js。#723 起主菜单每一屏开始时换屏
  // （ADR-0009：先整屏清空再绘制，画面上只有主菜单本身）——前一阶段的
  // 输出（调教、过天事件、子页面）都已在玩家按键确认后被清掉；换屏不
  // 补等键，缺确认的路径由测试夹具的未读输出检查报出、在那段输出末尾
  // 补。重绘只发生在玩家交互之后：本函数只在 run_shop 的循环里被调，
  // 输入先行（ADR-0003 的约定落点）。
  await change_screen();
  await draw_main_menu();
}

/**
 * usershop：主菜单输入的分发口（issue #24；#866 起主菜单分支搬进菜单项表）。
 *
 * 本函数只管店内输入：购买分派（0-99）与购物态的三个键（997/998/999），
 * 其余输入交 page-main-menu.js 的 dispatch_menu_item——菜单项的可用性条件
 * 与处理函数都在那张表里，与绘制同源。认不出的输入（含被检查拦下的、A == 0
 * 时的 496/497）与改动前一样落到函数尾返回，回循环重绘，不提示、不报错。
 *
 * 阶层按钮（[521]-[530]）仍是本文件的：它们由地城概况子面板按层打印、编号
 * 是区间，不是主菜单项；隐藏调试入口 7788 同理（界面本就不印它）。
 *
 * @param {number} result 玩家输入（era.input() 的返回值）
 * @returns {Promise<string|undefined>} 转场目标（STATE 取值）；没发起转场的
 *   分支返回 undefined，由 run_shop 回循环重绘
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
  //   - 998/997 是切换商店：只置 BOUGHT 与清账后 return，重画归商店轮
  //     （两个商店各自绘制前换屏，抢先直画会被清掉未经确认的屏，#724）；
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
    // 切完由商店轮的下一轮绘制（show_shop 的 BOUGHT 支）重画——两个商店
    // 各自在绘制前换屏（#724），这里不再抢先直画：直画的屏与循环重画之间
    // 没有输入，换屏会把未经确认的直画内容清掉
    return;
  } else if (result === 997 && era_flag.bought >= 0) {
    era_flag.bought = 1;
    clear_shop();
    return; // 重画同上，归商店轮
  } else if (era_flag.bought >= 0) {
    return; // 购物态下其它输入无反应，回循环重绘
  }

  // 主菜单分发（#866）：菜单项表是绘制与分发的唯一一份，可用性条件也在
  // 表里——不可用项与表外编号一样落空，回循环重绘。
  const next = await dispatch_menu_item(result);
  if (is_state(next)) {
    return next;
  }

  // 阶层信息：[521]-[530] 是地城概况子面板按层打印的按钮（编号 = 阶层 +
  // 520），result - 520 即阶层 → show_floor（10 层为近卫）
  if (result > 520 && result <= 530) {
    await show_floor(result - 520);
    return;
  }

  // 调试菜单入口（作者的调试工具）自 #542 判不移植、#638 起随占位
  // 机制一并删除：主菜单不印 [999] 按钮，引擎的输入白名单（#130）本就
  // 送不到这里；店内的 999 在上面的购物段早退（#592），也不会落到链尾。
  // 剩下的 7788 是界面不印按钮的关系矩阵调试口，只能直调到达。
  if (result === 7788) {
    await relation_debugprint();
  }
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
    // 暴走结算可能留下未声明编号的库存，读取名字前必须检查声明。
    if (count > 0 && era.get('itemkeys').includes(base_slot + i)) {
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
 * usershop 分发」的循环。正常情况下只在转场离开时返回（菜单是游戏的中枢，
 * 如 100 分支的 BEGIN TRAIN——#44 已接入）：转场目标是普通返回值，经
 * usershop → 本循环逐层上抛，由主循环接站。
 *
 * @param {object} [options]
 * @param {boolean} [options.skip_eventshop] 跳过 EVENTSHOP 链——
 *   STATE.SHOP_AFTER_LOAD（读档后的进入路径）专用：技能
 *   system-flow.md:51-53「读档后不执行 EVENTSHOP」。读档回来的世界
 *   以存档数据为准，EVENTSHOP 链的两个动作（指针越界钳制 + 清 100 个
 *   道具上架位）都是「新进商店轮」的初始化，重放会给读入的数据盖掉
 *   存档时的在售状态。
 * @returns {Promise<string>} 下一游戏状态（转场目标）
 */
async function run_shop({ skip_eventshop = false } = {}) {
  if (!skip_eventshop) {
    // EVENTSHOP 链（普通档是本文件的处理器；口上总开关的 #PRI 档在
    // kojo/kojo-system.js——#PRI 先跑，见 EVENTSHOP 注册处的说明）。
    // 链里的转场目标是返回值，忽略就等于丢掉它，故照例上抛
    const shop_pending = await emit(EVENT.SHOP);
    if (is_state(shop_pending)) {
      return shop_pending;
    }
  }
  // 商店轮每轮「换屏 + 绘制」（ADR-0009）：换屏在 show_shop 的主菜单支，
  // 道具/陷阱商店支由各商店自行换屏（#724）
  for (;;) {
    await show_shop();
    // 引擎侧：玩家点按钮（printButton 的快捷键）或直接键入编号；
    // era.input() 的返回值交 usershop 分发。
    const next = await usershop(await era.input());
    // 转场目标上来就离开循环，其余分支（含无效输入）回 show_shop 重绘
    if (is_state(next)) {
      return next;
    }
  }
}

// usershop 一并导出（#130）：引擎的 input() 只送达已打印按钮的快捷键。
// #866 起主菜单的渲染与分发都在 page-main-menu.js 的菜单项表里；本文件
// 仍无按钮分发的是 52x（阶层信息，楼层总览段的 [520]-[530] 已打）与 7788
// （隐藏调试入口，界面本就不印它）——这些分支只能经直接调用测试，不经
// 输入通道。
module.exports = { run_shop, usershop, show_floor };
