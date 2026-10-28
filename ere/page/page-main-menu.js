/**
 * @file 据点主菜单（菜单骨架：状态行 + 六个功能入口 + 四个子面板 + 指令面板）。
 *
 * 这张工单（#23）范围：状态行（读真实变量）、六个功能入口（能显示、能
 * 点选；点选的分发已落 #24）、防御性修正（照实移植）。#395 补全指令面板
 * 的渲染（[100]-[888]，分发本体在 page-shop.js 的 usershop）与两个内容
 * 子面板（draw_have_items/draw_have_traps）。作用域外，仍留注释：BGM 段
 * 自 #69 起接通（见 draw_main_menu 首段）、调教目标名/助手名按钮与生命条
 * （随角色数据工单）。
 *
 * #73 起排版助手集中到 page/components/menu-button.js（两条 UI 结论的
 * 唯一权威落点）。#723 起主菜单每轮「换屏 + 绘制」（ADR-0009，换屏入口
 * page/components/screen-change.js）；随 #724 删除画面组件，本文件只保留
 * 绘制函数，清屏与重画节奏由调用方（page-shop.js 的商店轮）掌握。
 *
 * #866 起主菜单的绘制与分发共用本文件的菜单项表 MAIN_MENU_ITEMS：可用性
 * 条件只写在表里一处，各入口的处理函数也在表里（此前 26 个魔数分支在
 * page-shop.js 的 usershop）。#867 起 [107] 购物把控制权交给商店循环
 * （page/page-shop-loop.js），由它自己收店内输入；商店轮仍只做菜单分派与
 * 阶层按钮。
 */

const era = require('#/era-electron');
const { begin, is_state, STATE } = require('#/system/flow/game-state');
const { maounet } = require('#/system/cross-save-sharing');
const { chara_sale } = require('#/system/stronghold/sale');
const { batch_execution } = require('#/event/event-execution-batch');
const {
  menu_button_row,
  MENU_BUTTON_DIM_COLOR,
} = require('#/page/components/menu-button');
const { display_dungeon_daily } = require('#/page/page-dungeon-daily');
const { select_target, select_assi } = require('#/page/page-select-target');
const { invasion } = require('#/page/page-invasion');
const { dungeon_info2 } = require('#/page/page-dungeon-info2');
const { infrastructure } = require('#/page/page-infrastructure');
const { monster_shop } = require('#/page/page-monster-shop');
const { shop_loop } = require('#/page/page-shop-loop');
const { ability_up } = require('#/page/page-ability-up');
const { intercept } = require('#/page/page-intercept');
const { tailor_main } = require('#/page/page-tailor');
const { save_game, load_game } = require('#/page/page-save-load');
const { config_menu } = require('#/page/page-config');
const {
  chara_info,
  chara_info_individual_wrapped,
} = require('#/page/page-chara-info');
const { secret_labo } = require('#/page/page-shop-labo');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_audio = require('#/era-utils/era-audio');
const era_exflag = require('#/era-utils/era-exflag');
const { NBSP, pad_display } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化
const { print_button_grid } = require('#/utils/button-grid');

/** 已加入角色数上限（[120] 召唤的满员门槛） */
const MAX_CHARANUM = 90;

// 原文排版里的全角空格（UNICODE 0x3000）。以转义书写并集中定义：ESLint
// 的 no-irregular-whitespace 拦裸写，prettier 会把字符串里的裸全角空格当
// 可删空白吃掉。
const FULL_WIDTH_SPACE = '\u3000';

/** FLAG:36 → 子面板绘制函数（其余值回落物品/技能；#395 四支全部真身） */
function draw_panel(active_panel) {
  if (active_panel === 1) {
    draw_have_traps();
    return;
  }
  if (active_panel === 4) {
    draw_dungeon_overview();
    return;
  }
  if (active_panel === 5) {
    draw_dungeon_daily();
    return;
  }
  draw_have_items();
}

// menu_button 自 #73 起集中到 page/components/menu-button.js（本文件原是
// 它的唯一发明方；近似依据与两条 UI 结论的说明都在那边）。

/**
 * 指针越界钳制：主菜单绘制与 EVENTSHOP 链共用的防错处理。
 *
 * 判断条件按 ID 语义移植：ere 侧角色寻址一律用角色 ID（cflag 寻址、
 * 分发注册表同此，#21），「越界」即「不在已加入列表」——序号世界里
 * 「> 角色数 - 1」与它等价，ID 世界里后者才正确（如已加入 [0,31] 时
 * ID 31 合法而 31 > 角色数 - 1 会误杀）。-1（未选中）不在列表里，落进
 * 重置分支也只是 -1 → -1 的空操作，与「只钳上界」的行为一致。
 */
function reset_out_of_range_pointers() {
  const added = era.getAddedCharacters();
  // TARGET 不在已加入列表 → TARGET = -1
  if (!added.includes(era_flag.target)) {
    era_flag.target = -1;
  }
  // ASSI 不在已加入列表 → ASSI = -1
  if (!added.includes(era_flag.assi)) {
    era_flag.assi = -1;
  }
}

/**
 * draw_main_menu 的防御性修正全集：编号越界、目标与助手指向同一人、
 * 或所指角色处于不可选中态（CFLAG:x:1 != 0）时重置。对已知缺陷的保底
 * 处理，逐项保留。
 *
 * 角色静态表迁移（#35）完成前实机加不进任何角色，本函数在实机路径上恒把
 * 指针钳回 -1——这是预期，勿为看到效果伪造角色。
 */
function apply_bug_guards() {
  reset_out_of_range_pointers();
  // ASSI == TARGET → ASSI = -1（同一人不能既当目标又当助手）
  if (era_flag.assi === era_flag.target) {
    era_flag.assi = -1;
  }
  // TARGET >= 1 且 CFLAG:TARGET:1 != 0 → TARGET = -1（CFLAG:x:1 的
  // 1 = 不可选中态；角色 0 是魔王，不在其列。读未声明序号得 undefined，
  // 包装层风格 || 0 处理缺值，#13）
  if (
    era_flag.target >= 1 &&
    (era.get(`cflag:${era_flag.target}:1`) || 0) !== 0
  ) {
    era_flag.target = -1;
  }
  // ASSI >= 1：同上
  if (era_flag.assi >= 1 && (era.get(`cflag:${era_flag.assi}:1`) || 0) !== 0) {
    era_flag.assi = -1;
  }
}

/**
 * A：可选的奴隶数（主菜单 A/B 计数段之 A）。
 *
 * 判断条件：已加入角色中 CFLAG:x:1 == 0（未占用）且 x != 0（排除魔王
 * 自己）的计数。渲染指令面板前算出，[100]/[496]/[497] 的可用性条件也读
 * 它；渲染与分发两次求值之间无写入路径，分发时重算等价。
 *
 * ere 侧按角色 ID 寻址（#21），计数语义不变。B（CFLAG:x:0 > 0 的已调教
 * 计数）由下方 [106] 贩卖奴隶入口消费。
 *
 * @returns {number}
 */
function count_selectable_slaves() {
  return era
    .getAddedCharacters()
    .filter((id) => id !== 0 && (era.get(`cflag:${id}:1`) || 0) === 0).length;
}

/**
 * 状态行：顶部双线 + 一行右对齐粗体的年月日/时段/所持金。
 * 数值全部读真实变量（包装层，#23 验收）。第 N 年的 N = DAY/365 的整数
 * 除法（DAY 非负 → Math.floor 等价）；「第 N 日」显示 DAY+1。
 */
function draw_status_line() {
  // 顶部双线（全宽 ═）。引擎 drawLine 的 content 是分隔线中央的标签
  // 文字、不是线型字符（app.asar 实证：el-divider 的 border-style 只有
  // solid/dashed），故以 isSolid 近似双线、默认虚线近似单线；逐字比对归 #9。
  era.drawLine({ isSolid: true });

  era.setAlign('right'); // 仅本行右对齐
  const fragments = [
    {
      // 行首两枚全角空格，随后
      // 第{DAY/365}年+全角空格+{DAY:1}月{DAY:2}日（第{DAY+1}日）
      content: `${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}第${Math.floor(era_flag.day_count / 365)}年${FULL_WIDTH_SPACE}${era_flag.month}月${era_flag.date}日（第${era_flag.day_count + 1}日）`,
      fontWeight: 'bold', // 整行粗体，片段级携带
    },
  ];
  // DAY:2 == 15 → 追加黄色《满月》（'yellow' 是合法 CSS 颜色名，文本
  // 片段的 color 直通 span 样式，app.asar 实证）
  if (era_flag.date === 15) {
    fragments.push({
      content: '《满月》',
      color: 'yellow',
      fontWeight: 'bold',
    });
  }
  // TIME == 0 → 上午、否则 → 下午（前导的半角空格是有意保留的版式）；
  // 随后两枚全角空格 + (所持金：{MONEY} pts.) + 两枚全角空格
  fragments.push({
    content: ` ${era_flag.time === 0 ? '上午' : '下午'}${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}(所持金：${era_flag.money} pts.)${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}`,
    fontWeight: 'bold',
  });
  era.print(fragments);
  era.setAlign('left'); // 还原，后续行左对齐
}

/**
 * 指令面板不可用项的占位格：灰色 [---] 文本，不可点、仍占一格——各列对齐
 * 不因可用性漂移。
 * @returns {{content: string, config: {color: string}}} 文本占位格
 */
function dim_slot() {
  return { content: '[---]', config: { color: MENU_BUTTON_DIM_COLOR } };
}

/** FLAG:36 信息面板选择（0=物品/技能、1=持有陷阱、4=地城概况、5=地城日常） */
function active_panel() {
  // 未声明读值 undefined → || 0 处理缺值（#13）
  return era.get('flag:36') || 0;
}

/**
 * B：达到出售资格的已加入角色数（[106] 贩卖奴隶的可用性条件）。
 *
 * 只看 CFLAG:0（是否达到出售资格），实际出售列表再排除濒死/影子/占用角色。
 */
function count_sellable_slaves() {
  return era
    .getAddedCharacters()
    .filter((cid) => cid !== 0 && chara(cid).stronghold.出售与助手资格 > 0)
    .length;
}

/**
 * 主菜单项表（#866）：绘制与分发共用这一份。
 *
 * id 是玩家记熟的快捷键，也是引擎 showAcc 拼在按钮正文前的编号——编号与
 * 表序都不为排版调整（表序即绘制序，改编号等于让玩家记住的按键失灵）。
 *
 * - label：按钮正文，不带 [编号] 前缀（引擎自己拼，PR #30）；可以是函数
 *   （正文随世界状态变，如 [102] 的地下城/场子）。
 * - enabled：可用性条件，省略即恒可用。为假时指令面板画灰色 [---] 占位格
 *   （不可点、仍占一格），分发也不认这个编号——条件只写在表里这一处。
 * - dim：两行常显入口专用，未选中时调暗。它与可用性是两回事：[496]/[497]
 *   在 A == 0 时照样画得出来（原版如此），只是点了没反应。
 * - run：处理函数，转场目标（STATE 取值）由分发上抛，其余返回值留在分发层。
 * - place：'target' 第一行、'tab' 第二行、省略即指令面板、'hidden' 尚无
 *   按钮（名字按钮随角色数据工单，分发已通）。
 */
const MAIN_MENU_ITEMS = [
  // —— 第一行：调教目标 / 助手（两枚同行，暗 = 未选中：-1 未选中、0 是魔王）——
  {
    id: 496,
    place: 'target',
    label: '调教目标',
    dim: () => era_flag.target < 1,
    enabled: () => count_selectable_slaves() > 0,
    // 选择画面的「其它」支会转去怪物玩弄，转场目标原样上抛
    run: () => select_target(),
  },
  {
    id: 497,
    place: 'target',
    label: '助手',
    dim: () => era_flag.assi < 1,
    enabled: () => count_selectable_slaves() > 0,
    run: () => select_assi(),
  },

  // —— 第二行：四个信息面板切换钮（四枚同行，暗 = 当前面板不是它）——
  // 只写 FLAG:36、重绘即反馈，不叠占位文本（#24 派单核实事实 #2）
  {
    id: 500,
    place: 'tab',
    label: '物品/技能',
    dim: () => active_panel() !== 0,
    run: () => {
      era.set('flag:36', 0);
    },
  },
  {
    id: 501,
    place: 'tab',
    label: '持有陷阱',
    dim: () => active_panel() !== 1,
    run: () => {
      era.set('flag:36', 1);
    },
  },
  {
    id: 504,
    place: 'tab',
    label: '地城概况',
    dim: () => active_panel() !== 4,
    run: () => {
      era.set('flag:36', 4);
    },
  },
  {
    id: 505,
    place: 'tab',
    label: '地城日常',
    dim: () => active_panel() !== 5,
    run: () => {
      era.set('flag:36', 5);
    },
  },

  // —— 指令面板：18 项每行 3 列（原版 PRINTLCD 每 3 个换行，#717 恢复）——
  // [100] 调教：没有这枚按钮，调教入口在实机上根本不存在——select_target
  // 只能经 [496] 选人、选完仍回主菜单，玩家无从进入调教（实机撞见）。
  {
    id: 100,
    label: '调教',
    enabled: () => count_selectable_slaves() > 0,
    run: run_train,
  },
  // [101] 能力显示：检查「已加入角色数 >= 1」——魔王自身即角色 0，恒真；
  // 保留这个恒真检查，不发明可用性规则（同 [109]/[200]/[300]）。
  {
    id: 101,
    label: '能力显示',
    enabled: () => era.getAddedCharacters().length >= 1,
    run: async () => {
      if ((await chara_info()) === 1) {
        return begin(STATE.TURNEND);
      }
    },
  },
  // [102] 地下城 / 场子：无条件渲染，条件只切换文案（FLAG:502 的 2D 模式
  // 设定一问随 #181 H12，当前恒 0）
  {
    id: 102,
    label: () => ((era.get('flag:502') || 0) === 0 ? '地下城' : '场子'),
    run: () => dungeon_info2(),
  },
  // [103] 处刑 / [104] 迎击：A > 0（同 [100]，不发明别的可用性规则）
  {
    id: 103,
    label: '处刑',
    enabled: () => count_selectable_slaves() > 0,
    run: () => batch_execution(),
  },
  {
    id: 104,
    label: '迎击',
    enabled: () => count_selectable_slaves() > 0,
    run: () => intercept(),
  },
  // [105] 能力值提升：原版的可用性检查整段是注释态，无条件渲染——不补一个
  // 被关掉的检查
  {
    id: 105,
    label: '能力值提升',
    run: () => ability_up(),
  },
  // [106] 贩卖奴隶：B > 0 时显示按钮（见 count_sellable_slave）
  {
    id: 106,
    label: '贩卖奴隶',
    enabled: () => count_sellable_slaves() > 0,
    run: () => chara_sale(),
  },
  // [107] 购物：进道具店（商店自 #867 起是独立循环——店内输入、切店与
  // 退出都在 page/page-shop-loop.js 里，本项只负责把控制权交过去）。无条件
  // 渲染——没有这枚按钮，道具商店在实机上进不去（同 [200]/[300] 的 #137 教训）
  {
    id: 107,
    label: '购物',
    run: () => shop_loop(),
  },
  // [108] 换装：A > 0 && FLAG:37 == 1。买成后 tailor_core 把 TARGET 置 -1，
  // 返回后把 TARGET 还原为「前回调教目标」（FLAG:1）
  {
    id: 108,
    label: '换装',
    enabled: () =>
      count_selectable_slaves() > 0 && (era.get('flag:37') || 0) === 1,
    run: async () => {
      await tailor_main();
      era_flag.target = era.get('flag:1') || 0;
    },
  },
  // [109] 侵略：出兵成功才转场 TURNEND。没有这枚按钮，整条侵略线在实机上
  // 入口不存在——引擎的 input() 只收已打印按钮的快捷键，键入 109 一律
  // 「输入不合法」（#129 实机撞见）
  {
    id: 109,
    label: '侵略',
    run: async () => {
      // 返回 1 才 BEGIN TURNEND；结局选退出时 invasion 给的是回标题的
      // 转场目标（#852），先上抛再判 1
      const invaded = await invasion();
      if (is_state(invaded)) {
        return invaded;
      }
      if (invaded === 1) {
        return begin(STATE.TURNEND);
      }
    },
  },
  // [110] 实验室：TALENT:0:325 == 1（魔王的魔界知识）
  {
    id: 110,
    label: '实验室',
    enabled: () => (era.get('talent:0:325') || 0) === 1,
    run: () => secret_labo(),
  },
  // [111] 设施·设备：肉便器或博物馆展品存在时才显示
  {
    id: 111,
    label: '设施·设备',
    enabled: () =>
      (era.get('flag:83') || 0) !== 0 || (era.get('flag:84') || 0) !== 0,
    run: () => infrastructure(count_selectable_slaves()),
  },
  // [120] 召唤：原版「卡拉启动！== 1」的内联卡拉入队事件用 SAVEDATA 自定义
  // 变量，ere 侧无落点（恒非 1，不移植）；只剩满员判定
  {
    id: 120,
    label: '召唤',
    run: run_summon,
  },
  // [199] 休息（回合结束）：内联文本 + FLAG:9 += 5（税金）+ 转场 TURNEND
  {
    id: 199,
    label: '休息',
    run: () => {
      era.print('你专心于内政，稍作了休息……（税金+5%）');
      game.stronghold.税金修正 += 5;
      return begin(STATE.TURNEND);
    },
  },
  // [200] 保存 / [300] 读取：缺了这两枚，据点侧存读档入口在实机上不存在
  // （引擎只送达已打印按钮的快捷键，#136 勘误移交 #137）——存读档是菜单
  // 中枢功能，按钮与分发一起实现
  {
    id: 200,
    label: '保存',
    run: () => save_game(),
  },
  {
    id: 300,
    label: '读取',
    run: () => load_game(),
  },
  // [777] 设定：[463] 起为真身（config_menu 全量移植）
  {
    id: 777,
    label: '设定',
    run: () => config_menu(),
  },
  // [888] 通信：跨作品数据交换；特殊档读写会重放 EVENTLOAD 链，链里的
  // 转场目标经返回值上来
  {
    id: 888,
    label: '通信',
    run: () => maounet(),
  },

  // —— 名字按钮：分发已通，按钮本体随角色数据工单（#35 前实机无角色可显示，
  // 正文取角色呼名，承载见 #5 已决的 callname）——
  {
    id: 498,
    place: 'hidden',
    label: '调教目标名',
    run: () => chara_info_individual_wrapped(era_flag.target),
  },
  {
    id: 499,
    place: 'hidden',
    label: '助手名',
    run: () => chara_info_individual_wrapped(era_flag.assi),
  },
];

/** 表内某一处的菜单项（按表内顺序：绘制顺序即表序） */
function items_of(place) {
  return MAIN_MENU_ITEMS.filter((item) => (item.place ?? 'command') === place);
}

/** 菜单项当前是否可用（enabled 省略 = 恒可用） */
function is_enabled(item) {
  return item.enabled ? item.enabled() : true;
}

/** 菜单项当前正文（label 可以是函数：正文随世界状态变） */
function item_label(item) {
  return typeof item.label === 'function' ? item.label() : item.label;
}

/**
 * [100] 调教：选目标与助手后转场 TRAIN（#44 接通）。
 *
 * 目标未选先选目标（选择页的「其它」支会转去怪物玩弄，转场目标原样上抛）；
 * 助手未选且存在候选时再选助手（单奴隶路径没有候选，跳过）；育儿室的魔王
 * 不能调教（报文后等一键）。
 *
 * @returns {Promise<string|undefined>} 转场目标
 */
async function run_train() {
  if (era_flag.target <= 0) {
    const selected = await select_target();
    if (is_state(selected)) {
      return selected;
    }
    if (selected === 0) {
      // 取消 / 列表为空：整次调教作罢
      return undefined;
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
        // 返回 2（「我先想想」）→ 取消整次调教
        const assi_result = await select_assi();
        if (assi_result === 2) {
          return undefined;
        }
      }
      // ASSI == 0 时置 -1（select_assi 的两个真实分支恒把 ASSI 置为 -1 或
      // 有效 ID，此处是防御性缺省处理，结构保留）
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
    return undefined;
  }
  // TARGET >= 1 且 TARGET != ASSI → BEGIN TRAIN（#44 接通：转场目标逐层
  // 上抛，主循环进 TRAIN 状态——train-loop.js）
  if (era_flag.target >= 1 && era_flag.target !== era_flag.assi) {
    return begin(STATE.TRAIN);
  }
  return undefined;
}

/**
 * [120] 召唤：未满员进怪物商店，满员只提示。
 */
async function run_summon() {
  if (era.getAddedCharacters().length < MAX_CHARANUM) {
    await monster_shop();
    return;
  }
  era.print('奴隶太多了！'); // 打印后等一键
  await era.waitAnyKey();
}

/**
 * 画一整行常显菜单按钮：行的成员、正文与调暗都取自表。
 * @param {string} place 表内位置（'target' / 'tab'）
 * @param {number} per_line 每行枚数
 */
function draw_menu_row(place, per_line) {
  menu_button_row(
    items_of(place).map((item) => [item_label(item), item.id, item.dim()]),
    per_line,
  );
}

/**
 * 主菜单分发：按编号找到表里的菜单项并执行（与绘制同源，#866）。
 *
 * 编号不在表里、或该项当前不可用时与改动前一样落空——调用方回循环重绘，
 * 不提示、不报错。
 *
 * @param {number} result 玩家输入（era.input() 的返回值）
 * @returns {Promise<string|undefined>} 转场目标；不进转场返回 undefined
 */
async function dispatch_menu_item(result) {
  const item = MAIN_MENU_ITEMS.find((entry) => entry.id === result);
  if (!item || !is_enabled(item)) {
    return undefined;
  }
  const next = await item.run();
  // 只有转场目标上抛：处理函数的普通返回值（如选择页的 0/1/2）留在分发层
  return is_state(next) ? next : undefined;
}

/**
 * 绘制据点主菜单。
 *
 * 本函数只输出、不清屏，整屏清空归调用方的换屏（#723 起 page-shop.js 的
 * show_shop 每轮 change_screen 后调到这里，ADR-0009）。重绘只发生在玩家
 * 交互之后——调用点在 page-shop.js 的商店轮。逐行重绘抑制（防闪烁用）
 * 在 ere 无对应语义，不镜像。
 */
function draw_main_menu() {
  // BGM 自 #69 起接通：背景音乐开关 == 1 → playMusic('据点2.mp3')
  // （注册名即文件名，res/sound/sound.csv）。开关/音量落扩展普通表
  // yml/Audio.yml（ere/era-utils/era-audio.js；引擎侧 data 桶与存清语义
  // 见该表头注）。音量无引擎等价物（playMusic 只有 loop/fade）。循环播放
  // → 显式 loop。开关无声明默认值（新档读 0 = 不播）——开关目前在游戏内
  // 没有写点（待设定界面补上）。资源未启用时 playMusic 静默返回 false，
  // 主菜单照常渲染。
  if (era_audio.bgm_enabled === 1) {
    era.playMusic('据点2.mp3', { loop: true });
  }
  apply_bug_guards();

  draw_status_line();

  // 单线 ─（默认虚线近似）
  era.drawLine();

  // 第一组入口：调教目标（496）/ 助手（497），两枚同行（原版 MENU_BUTTON
  // 间以定宽空格隔开打在同一行，#717 恢复同行）。调暗 = 未选中（-1 未
  // 选中、0 是魔王，都算未选中）。
  draw_menu_row('target', 2);

  // 调教目标名/助手名按钮（498/499，点进各自状态画面，正文取角色呼名）
  // 与生命条（life_bar/vital_bar）：随角色数据工单实现（#35 前实机无角色
  // 可显示，这张工单留空；呼名的承载见 #5 已决的 callname）。

  // 分隔线
  era.drawLine();

  // 第二组入口：四个信息面板切换钮（500/501/504/505），四枚同行（原版
  // 同打一行，#717 恢复）。暗 = 当前面板不是它（FLAG:36）。
  draw_menu_row('tab', 4);

  // 四个子面板的分发（FLAG:36 → 专用函数，其余值 → 物品/技能）。
  // 四支自 #180/#395 起全部真身（draw_panel 内分发）：地城概况/地城日常
  // 随 #180，物品/技能（draw_have_items）与持有陷阱（draw_have_traps）
  // 随这张工单。
  draw_panel(active_panel());

  // 分隔线 + 指令面板标题（▌Commands，粗体）
  era.drawLine();
  // 行首一枚全角空格 + ▌Commands（粗体）
  era.print([{ content: `${FULL_WIDTH_SPACE}▌Commands`, fontWeight: 'bold' }]);

  // 指令面板 18 项（[100]-[111]、[120]、[199]、[200]、[300]、[777]、[888]）
  // 按每行 3 列排（原版 PRINTLCD 每 3 个换行，#717 恢复）；不可用项以
  // 灰色 [---] 文本格占位、仍占一格，各列对齐不因可用性漂移——成员与
  // 可用性都取自 MAIN_MENU_ITEMS（#866 起绘制与分发同源）。
  print_button_grid(
    items_of('command').map((item) =>
      is_enabled(item) ? [item.id, item_label(item)] : dim_slot(),
    ),
    3,
  );

  // 底部双线
  era.drawLine({ isSolid: true });
}

/** 道具名（Item.yml 登记名） */
function item_name(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/**
 * 5 列一行的道具网格步进（draw_have_items 两段 + draw_have_traps 一段
 * 共用，结构相同，仅遍历的 id 范围不同）。
 * 持有数 > 0 才占列；列数到 5 时先补一个全角空格（FULL_WIDTH_SPACE）
 * 换行，再继续本次判定——即使本格是空位也会触发换行（判断条件在遍历
 * 前置检查，不在打印之后）。
 *
 * @param {{ line: string, column: number }} state 跨调用累积的当前行文本
 *   与已占列数（调用方在段边界处自行决定是否清空——draw_have_items 的
 *   item91 特例会带着未清空的 line 进入第二段，见该函数头注）
 * @param {number} id 道具 ID
 */
function append_item_slot(state, id) {
  if (state.column >= 5) {
    era.print(`${state.line}${FULL_WIDTH_SPACE}`);
    state.line = '';
    state.column = 0;
  }
  const count = era.get(`item:${id}`) || 0;
  if (count <= 0) {
    return;
  }
  if (state.column === 0) {
    state.line += NBSP.repeat(2);
  }
  state.line += `${FULL_WIDTH_SPACE}${pad_display(`${item_name(id)}(${count})`, 18)}`;
  state.column += 1;
}

/**
 * draw_have_items（#395 起真身）：物品/技能面板（FLAG:36 == 0）。
 *
 * 头行：技巧 Lv（ABL:MASTER:12）+ 所持知识四枚标签
 * （TALENT:MASTER:55/325/327/328，对应调合/魔界/淫魔/魔虫）。几项内容在
 * 同一输出行上、一次 print 拼出（不逐项换行）。
 *
 * 旧道具枚举段整段是注释态（死码），不移植。
 *
 * 两段 5 列网格（ids 0-58 与 ids 300-339）+ 装饰的戒指（item 91）特例：
 * 戒指文本不换行，与第二网格的首个道具共享同一输出行（无戒指时该行就是
 * 第二网格自己的首行）。append_item_slot 维护跨段共享的 { line, column }
 * 累积态，保留这个接续关系（戒指文本与第二网格首行共享同一显示行）。
 */
function draw_have_items() {
  const knowledge_tags = [
    [55, '【调合知识】　'],
    [325, '【魔界知识】　'],
    [327, '【淫魔知识】'],
    [328, '【魔虫知识】'],
  ]
    .filter(([id]) => (era.get(`talent:0:${id}`) || 0) === 1)
    .map(([, label]) => label)
    .join('');
  era.print(
    `${FULL_WIDTH_SPACE}技巧Lv： Lv${era.get('abl:0:12') || 0}${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}所持知识： ${knowledge_tags} `,
  );

  const state = { line: '', column: 0 };
  for (let id = 0; id <= 58; id += 1) {
    append_item_slot(state, id);
  }
  era.print(`${state.line}  `);

  state.line = '';
  state.column = 0;
  const ring_count = era.get('item:91') || 0;
  if (ring_count > 0) {
    state.line = `${item_name(91)}(${ring_count}) `;
  }
  for (let id = 300; id <= 339; id += 1) {
    append_item_slot(state, id);
  }
  era.print(`${state.line}  `);
}

/**
 * draw_have_traps（#395 起真身）：持有陷阱面板（FLAG:36 == 1）。无头行，
 * 单一 5 列网格（ids 59-89，与 draw_have_items 同构，见 append_item_slot
 * 文件头）。
 */
function draw_have_traps() {
  const state = { line: '', column: 0 };
  for (let id = 59; id <= 89; id += 1) {
    append_item_slot(state, id);
  }
  era.print(`${state.line}  `);
}

/**
 * draw_dungeon_overview：地城概况信息面板（FLAG:36 == 4）。
 *
 * 头行读数（迷宫 Lv / 陷阱 Lv / 勇者初期 Lv）+ 逐层的部下/勇者/迎击/设施
 * 一览（每层一枚 [520+n] 按钮，usershop 的 521-530 分支 → show_floor
 * 阶层信息，#548 起真身）
 * + 尾部统计行。
 *
 * 计数桶用局部数组承载；隔层的两枚按钮排版归一为每层一枚——快捷键
 * 集合不变（521-530 全覆盖）；等宽字体与定宽填充不镜像（showAcc 折叠
 * 正文空白，PR #30）。
 *
 * @returns {void}
 */
function draw_dungeon_overview() {
  // 头行读数：CFLAG:0:9（迷宫 Lv，魔王侧）、EXP:0:80（迷宫经验）、
  // FLAG:85（陷阱 Lv）、FLAG:60+1（勇者初期 Lv 的修正量 +1）
  era.print(
    `${FULL_WIDTH_SPACE}迷宫Lv： Lv${era.get('cflag:0:9') || 0} (经验值： ${era.get('exp:0:80') || 0})\u3000\u3000陷阱Lv：Lv${era.get('flag:85') || 0}\u3000\u3000现在的勇者初期Lv： Lv${(era.get('flag:60') || 0) + 1}`,
  );
  // 统计桶清零 + 两个累计量
  const temp = new Array(100).fill(0);
  let guard_count = 0; // L_近卫（EX_TALENT:x:1 的护卫计数）
  let slave_count = 0; // L_奴隶（非侵攻非9的在场计数）
  // 逐角色统计（魔王 0 排除）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }
    const state = era.get(`cflag:${cid}:1`) || 0;
    if (state === 2 || state === 3) {
      if (state === 2) {
        // 1 层以下且攻略度 0 → 「迷宫外」（TEMP:10）；否则按层计数
        const floor = era.get(`cflag:${cid}:501`) || 0;
        if (floor <= 1 && (era.get(`cflag:${cid}:502`) || 0) === 0) {
          temp[10] += 1;
        } else {
          temp[floor] += 1;
        }
        temp[97] += 1; // 勇者总数
      }
      if (state === 3) {
        // 迎击按层计数（索引 +10 与勇者错开）
        temp[(era.get(`cflag:${cid}:501`) || 0) + 10] += 1;
        temp[96] += 1; // 迎击总数
      }
    }
    // 近卫（EX_TALENT:x:1）与奴隶（非侵攻非 9）累计
    guard_count += (era.get(`ex_talent:${cid}:1`) || 0) > 0 ? 1 : 0;
    slave_count += state !== 2 && state !== 9 ? 1 : 0;
  }
  // 逐层一览（Z 扫 100 个怪物槽，每 10 格一层；B/C 部下累计）
  let total_minions = 0; // C（部下总数）
  for (let floor = 1; floor <= 10; floor += 1) {
    // B = 该层部下数（ITEM:(Z+100) 的 10 格和）
    let floor_minions = 0;
    for (let slot = 0; slot < 10; slot += 1) {
      floor_minions += era.get(`item:${(floor - 1) * 10 + slot + 100}`) || 0;
    }
    total_minions += floor_minions;
    if (floor !== 10) {
      // 阶层按钮（[520+n]，usershop → show_floor 的阶层信息入口）
      era.printButton(`第${floor}阶层：`, floor + 520);
      // 部下 N 只, 勇者：N 人, 迎击：N 人
      const hero_count = temp[floor];
      const interceptor_count = temp[floor + 10];
      const fragments = [
        { content: `部下${floor_minions}只, ` },
        {
          content: `勇者：${hero_count}人`,
          ...(hero_count >= 1 ? { color: 'yellow' } : {}),
        },
        { content: ', ' },
        {
          content: `迎击：${interceptor_count}人\u3000`,
          ...(interceptor_count >= 1 ? { color: '#64a0ff' } : {}),
        },
      ];
      // 设施名（FLAG:(层+349)，500-507 的映射表）
      const facility = era.get(`flag:${floor + 349}`) || 0;
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
      fragments.push({
        content: `设施：${facility_names[facility] ?? '无\u3000\u3000\u3000'}`,
      });
      era.print(fragments);
    } else {
      // 近卫层：近卫兵 N 体（含护卫计数）+ 迷宫外的勇者 N 人
      //（制表符以全角空格近似——span 渲染对 tab 无对齐语义）
      era.printButton('近卫兵：', floor + 520);
      era.print(
        `${floor_minions + guard_count}体${FULL_WIDTH_SPACE}${FULL_WIDTH_SPACE}迷宫外的勇者：${temp[10]}人\u3000`,
      );
    }
  }
  // 空行 + 统计行（肉便器/展品读 FLAG:83/84）
  era.print(FULL_WIDTH_SPACE);
  era.print(
    ` 部下统计：${total_minions}只, 奴隶：${slave_count}人, 勇者：${temp[97]}人, 迎击：${temp[96]}人, 肉便器：${era.get('flag:83') || 0}个, 展品：${era.get('flag:84') || 0}个`,
  );
}

/**
 * draw_dungeon_daily：地城日常信息面板（FLAG:36 == 5）。
 * 威望值（EX_FLAG:99，钳上界 100）与五档评语；尾部接 display_dungeon_daily
 * （#179 起真身——page/page-dungeon-daily.js）。
 *
 * @returns {void}
 */
function draw_dungeon_daily() {
  // 威望钳上界
  if (era_exflag.prestige >= 100) {
    era_exflag.prestige = 100;
  }
  // 五档评语（负值无评语——条件链本就不覆盖负值，不补）
  let grade = '';
  const prestige = era_exflag.prestige;
  if (prestige <= 20 && prestige >= 0) {
    grade = '【岌岌可危】';
  } else if (prestige <= 40 && prestige > 20) {
    grade = '【动荡不安】';
  } else if (prestige <= 60 && prestige > 40) {
    grade = '【略受质疑】';
  } else if (prestige <= 80 && prestige > 60) {
    grade = '【相安无事】';
  } else if (prestige <= 100 && prestige > 80) {
    grade = '【广受爱戴】';
  }
  era.print(`${FULL_WIDTH_SPACE}威望值：${prestige} ${grade}`);
  // display_dungeon_daily()——#179（H10）起真身
  //（page/page-dungeon-daily.js；随机的三次消费见该文件头）
  display_dungeon_daily();
}

module.exports = {
  MAIN_MENU_ITEMS,
  dispatch_menu_item,
  draw_main_menu,
  reset_out_of_range_pointers,
  count_selectable_slaves,
  draw_dungeon_overview,
  draw_dungeon_daily,
  draw_have_items,
  draw_have_traps,
};
