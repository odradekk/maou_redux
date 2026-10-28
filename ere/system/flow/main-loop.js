/**
 * @file 主循环与转场状态机（决议 #6，实现于 issue #20）。
 *
 * 本模块是主循环与 BEGIN 转场机制的等价物（决议 #6）；
 * 机制出处与语义证据见决议 #6 的评论。
 *
 * 游戏阶段由 BEGIN 切换；ere 侧的两条路径在本模块统一成状态机的边：
 *
 *   - 事件链内的 BEGIN：由 emit() 在处理器
 *     边界暂存，链跑完后作为返回值交给本模块（system/event/registry.js）；
 *   - 非事件函数内的 BEGIN（如商店页发起的 BEGIN TRAIN）：返回值沿
 *     调用链逐层 return 上来，由本模块的 enter_state 收下。
 *
 * 初始状态固定 TITLE（启动即进标题页）；游戏结束也回到这里（#852 的标题
 * 循环）：各结局与两处 GAMEOVER 用 `return begin(STATE.TITLE)` 交回主循环，
 * 标题画面重新可交互，玩家可以重开、读档或从标题画面退出进程。
 *
 * 状态清单的权威是 game-state.js 的 STATE 枚举，本模块不另抄一份：处理器表
 * 必须为枚举的每个取值备一项，逐项说明写在各自条目上。自列一份清单的写法在
 * 读档后新增 SHOP_AFTER_LOAD 时漏跟过，这张表与枚举的同步改由
 * test/main-loop.test.js 的用例当场盯住。
 */

const { is_state, STATE } = require('#/system/flow/game-state');
const { emit } = require('#/system/event/registry');
const { EVENT } = require('#/data/event-name-const');
const run_title_page = require('#/page/page-title');
const { run_shop } = require('#/page/page-shop');
const { run_train } = require('#/system/train/train-loop');
const { run_aftertrain } = require('#/system/train/train-end');

const { register_all } = require('#/system/flow/startup');

// 事件处理器与分发族在进入状态机之前统一注册：装配顺序（= 同档处理器的执行
// 顺序）读 system/flow/startup.js 的 HANDLER_MODULES，与装载顺序无关。
register_all();

/**
 * 各状态的处理器：返回值 = 下一状态（通常是事件链 emit 的待跳转值）。
 *
 * 键必须是 game-state.js 的 STATE 枚举的取值，不多不少（同步用例在
 * test/main-loop.test.js），逐项说明写在各自条目上。
 */
const STATE_HANDLERS = {
  // 标题页（#19）：启动的初始状态，不经 BEGIN 进入
  [STATE.TITLE]: run_title_page,
  // BEGIN FIRST → EVENTFIRST 事件链。
  // 链无人 BEGIN 时回落进 SHOP：EVENTFIRST 跑完而无转场时默认进商店轮，
  // 不是报错（#20 验收移交的语义）。EVENTFIRST 处理器出口本来就显式
  // begin(STATE.SHOP)，这里的默认值只在以后的处理器都不发起转场时起作用。
  [STATE.FIRST]: async () => (await emit(EVENT.FIRST)) ?? STATE.SHOP,
  // BEGIN SHOP → 先调 EVENTSHOP 链一次，随后绘制商店页 →
  // 输入 → 分发循环（ere 侧整体收进
  // page/page-shop.js，主菜单骨架归 issue #23，输入分发归 #24——已实现）。
  [STATE.SHOP]: run_shop,
  // 读档后的商店轮（#137，由 page-save-load.js 的 load_game 发起）：同 SHOP
  // 主循环，但**不执行 EVENTSHOP 链**（状态语义见 game-state.js 的
  // SHOP_AFTER_LOAD 注释）
  [STATE.SHOP_AFTER_LOAD]: () => run_shop({ skip_eventshop: true }),
  // BEGIN TRAIN → 初始化调教数据（ere 侧手写——system/train/train-loop.js，
  // issue #44）→ EVENTTRAIN 链 → 回合循环。
  [STATE.TRAIN]: run_train,
  // BEGIN AFTERTRAIN → EVENTEND 链（尾部
  // BEGIN TURNEND）→ 引擎收尾调教数据（ere 侧 era.endTrain）。
  [STATE.AFTERTRAIN]: run_aftertrain,
  // BEGIN TURNEND → EVENTTURNEND 链。#114 起三档真身：#PRI（时段/
  // 日期推进，event/event-turnend.js）→ 普通（回合结算本体，
  // system/turnend-settle.js）→ #LATER（空，event/event-turnend-later.js）。
  // 出口必发 BEGIN SHOP，链无人 BEGIN 时保持 undefined 报错（补默认值只会掩盖
  // 处理器被误删的回归）。
  [STATE.TURNEND]: async () => await emit(EVENT.TURNEND),
};

/**
 * 进入一个状态：跑其处理器，产出下一状态。
 * @param {string} state STATE 枚举取值
 * @returns {Promise<string>} 下一状态
 */
async function enter_state(state) {
  const handler = STATE_HANDLERS[state];
  if (handler === undefined) {
    throw new Error(
      `游戏状态 ${state} 的处理器尚未移植（贯通验证后续票，见 issue #15）`,
    );
  }
  const next = await handler();
  if (!is_state(next)) {
    // BEGIN 目标跑完却没返回新目标即报错终止（决议 #6 的约定）
    throw new Error(`游戏状态 ${state} 结束时没有待跳转状态（缺少 BEGIN）`);
  }
  return next;
}

/**
 * 游戏主循环：标题循环（#852）。
 *
 * 从标题画面起，沿转场目标在状态间推进。游戏结束的各结局与 GAMEOVER 以
 * STATE.TITLE 转场回到标题画面，标题重新可交互——重新开始、读档或退出；
 * 只有标题画面的退出按钮会结束进程（era.quit()），循环本身不设出口
 * （玩家关窗口离开游戏）。
 */
async function run_main_loop() {
  let state = STATE.TITLE;
  for (;;) {
    state = await enter_state(state);
  }
}

// enter_state 一并导出（#137）：状态映射（如 SHOP_AFTER_LOAD 跳过
// EVENTSHOP 链）的行为测试直接驱动它，不必整跑 run_main_loop
module.exports = run_main_loop;
module.exports.enter_state = enter_state;
// STATE_HANDLERS 一并导出（#790）：同步用例对照 STATE 枚举核对键集，
// 不再靠文件头手抄的清单
module.exports.STATE_HANDLERS = STATE_HANDLERS;
