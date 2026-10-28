/**
 * @file 商店轮（据点主界面）：STATE.SHOP 的处理器。
 *
 * 循环结构：进入 SHOP 状态时先跑 EVENTSHOP 事件链一次，随后循环
 * 「show_shop 绘制 → 等输入 → usershop 分发」——这一轮收进本模块导出的
 * 处理器 run_shop，由 main-loop.js 的 STATE_HANDLERS 接驳。
 *
 * 这一屏只画据点主菜单。#867 之前商店（道具店 / 陷阱店）是「把购入品指针
 * 设成 1，下一轮本函数按指针的值改画商店屏、输入还回本函数的 usershop」，
 * 商店的状态因此散在一个 flag 里；现在两个商店各是一个独立循环
 * （page/page-shop-loop.js），由主菜单的 [107] 直接调用、自己在店内收
 * 输入，进出店都是那个循环的事。本文件因此只剩菜单侧的输入分派：菜单项
 * 表（page/page-main-menu.js）、阶层信息（show_floor）与调试后门。
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
  // 输出（调教、过天事件、子页面、商店屏）都已在玩家按键确认后被清掉；
  // 换屏不补等键，缺确认的路径由测试夹具的未读输出检查报出、在那段输出
  // 末尾补。重绘只发生在玩家交互之后：本函数只在 run_shop 的循环里被调，
  // 输入先行（ADR-0003 的约定落点）。
  await change_screen();
  await draw_main_menu();
}

/**
 * usershop：主菜单输入的分发口（issue #24；#866 起主菜单分支搬进菜单项表）。
 *
 * 本函数只管不由菜单项表承载的两类输入：阶层按钮（[521]-[530]）与隐藏的
 * 调试后门 7788，其余交 page-main-menu.js 的 dispatch_menu_item——菜单项的
 * 可用性条件与处理函数都在那张表里，与绘制同源。认不出的输入与改动前一样
 * 落到函数尾返回，回循环重绘，不提示、不报错。商店（0-99 的购买、997/998/
 * 999 三键）自 #867 起在各自的循环里消费，不经这里。
 *
 * 阶层按钮仍是本文件的：它们由地城概况子面板按层打印、编号是区间，不是
 * 主菜单项；7788 同理（界面本就不印它）。
 *
 * @param {number} result 玩家输入（era.input() 的返回值）
 * @returns {Promise<string|undefined>} 转场目标（STATE 取值）；没发起转场的
 *   分支返回 undefined，由 run_shop 回循环重绘
 */
async function usershop(result) {
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
  // 送不到这里。
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
 * 商店（道具店 / 陷阱店）自 #867 起不是转场、也不占本循环：主菜单的 [107]
 * 直接调用 page/page-shop-loop.js 的循环，退出后回到本循环重绘主菜单。
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
  // 商店轮每轮「换屏 + 绘制」（ADR-0009）：换屏在 show_shop 的主菜单支
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
// #866 起主菜单的渲染与分发都在 page-main-menu.js 的菜单项表里；#867 起
// 商店的输入归各自的循环。本文件仍无按钮分发的是 52x（阶层信息，楼层
// 总览段的 [520]-[530] 已打）与 7788（隐藏调试入口，界面本就不印它）——
// 这些分支只能经直接调用测试，不经输入通道。
module.exports = { run_shop, usershop, show_floor };
