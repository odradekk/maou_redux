/**
 * @file 主循环与转场状态机（决议 #6，落地于 issue #20）。
 *
 * 源: 无单一对应源——本模块是 Emuera 主循环/BEGIN 机制的等价物（引擎行为，
 * 非某个 ERB 函数）；机制出处与语义证据见决议 #6 的评论。
 *
 * Emuera 的游戏阶段由 BEGIN 切换；ere 侧的两条路径在本模块统一成状态机的边：
 *
 *   - 事件链内的 BEGIN（如原作 EVENT_TURNEND.ERB:140）：由 emit() 在处理器
 *     边界捕获并暂存，链跑完后作为返回值交给本模块（system/event/registry.js）；
 *   - 非事件函数内的 BEGIN（如原作 SHOP ver1.0.2.ERB:99 的 BEGIN TRAIN）：
 *     BeginSignal 一路上抛，由本模块的 enter_state 接住。
 *
 * 初始状态固定 TITLE（原作由引擎启动直接进 @SYSTEM_TITLE；ere 侧把入口也
 * 收进状态机，STATE.TITLE 是本地扩展，见 begin-signal.js）。
 *
 * 【硬约束 #6】本模块的 catch 已按约定首行放行 BeginSignal；业务代码新写
 * 任何 try/catch 都必须同样处理（见 begin-signal.js 文件头）。
 */

const { BeginSignal, STATE } = require('#/system/flow/begin-signal');
const { emit } = require('#/system/event/registry');
const run_title_page = require('#/page/page-title');
const run_shop = require('#/page/page-shop');
// 顶层副作用：注册 @EVENTFIRST 处理器（issue #22 真身）。后续事件的
// 处理器模块随各自所属票在此追加 require。
require('#/event/event-first');

/**
 * 各状态的处理器：返回值 = 下一状态（通常是事件链 emit 的待跳转值）。
 * 直接 begin() 抛信号（非事件路径）同样有效，见 enter_state。
 *
 * 已接线：TITLE（#19）/ FIRST（#20/#22）/ SHOP（#23）。TRAIN/AFTERTRAIN/
 * TURNEND 归曳光弹后续票，进入即报错，不静默。
 */
const STATE_HANDLERS = {
  [STATE.TITLE]: run_title_page,
  // 原作 BEGIN FIRST → @EVENTFIRST 事件链（SYSTEM ver1.0.3.ERB:1）。
  // 链无人 BEGIN 时默认进 SHOP：Emuera 在 @EVENTFIRST 跑完而无转场时自动
  // 进入商店轮，不是报错（#20 验收移交的语义，本票落地）。防御性兜底——
  // 真身出口显式 begin(STATE.SHOP)（:231），此行只在未来的处理器们都不发
  // 信号时兜住引擎行为。
  [STATE.FIRST]: async () => (await emit('EVENTFIRST')) ?? STATE.SHOP,
  // 原作 BEGIN SHOP → 引擎调 @EVENTSHOP 一次，随后 @SHOW_SHOP 绘制 →
  // 输入 → @USERSHOP 分发循环（SHOP ver1.0.2.ERB；ere 侧整体收进
  // page/page-shop.js，主菜单骨架归 issue #23，输入分发归 #24）。
  [STATE.SHOP]: run_shop,
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
      `游戏状态 ${state} 的处理器尚未移植（曳光弹后续票，见 issue #15）`,
    );
  }
  try {
    const next = await handler();
    if (next === undefined) {
      // 镜像原作：BEGIN 目标跑完却没发起新 BEGIN，Emuera 报错终止（#6 参考实现）
      throw new Error(`游戏状态 ${state} 结束时没有待跳转状态（缺少 BEGIN）`);
    }
    return next;
  } catch (e) {
    // 【硬约束 #6】凡捕获异常必先放行转场信号——此处即非事件路径的接站点
    if (e instanceof BeginSignal) {
      return e.state;
    }
    throw e;
  }
}

/**
 * 游戏主循环：从标题画面起，沿 BEGIN 转场在状态间推进，永不正常退出
 * （玩家关窗口离开游戏，与原作一致）。
 */
async function run_main_loop() {
  let state = STATE.TITLE;
  for (;;) {
    state = await enter_state(state);
  }
}

module.exports = run_main_loop;
