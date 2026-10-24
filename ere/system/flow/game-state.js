/**
 * @file 游戏状态枚举与 BEGIN 转场（决议 #6，实现于 issue #20；#850 改为返回值）。
 *
 * BEGIN 转场的约定语义（决议 #6，实测日志佐证——它推翻了 #3 第 6 节
 * 「BEGIN 中止事件链」的旧结论）：
 *   1. 结束当前函数，绝不执行 BEGIN 下方的语句；
 *   2. 只**暂存**目标，事件链继续按 #PRI → 普通 → #LATER 跑完剩余处理器；
 *   3. 期间再有 BEGIN 则覆盖暂存值，**最后一个胜出**；
 *   4. 整条链跑完、调用栈退出后才提交跳转。
 * 若按 #3 旧理解把 BEGIN 当「异常展开到顶层」，本作 500 余行的回合结算
 * 会被静默跳过——那种能跑起来、玩到中期才发现数值不对
 * 的 bug（#6 的原始动机）。
 *
 * 【怎么发出（#850）】转场是普通返回值，不再是异常信号：写 `return begin(STATE.X)`。
 * return 正好同时满足语义 1（结束当前函数）——只调用不 return 会继续执行
 * BEGIN 下方的语句，那不叫转场。拿到这个返回值的中间层用 is_state 判定、
 * 逐层 return 上抛（判定点的约定见 system/event/registry.js 的文件头）。
 */

/**
 * 游戏状态枚举：BEGIN 的合法目标。
 *
 * 取值 = BEGIN 的关键字。原作的 BEGIN 目标只有这 5 种（issue #20 定案）：
 * TURNEND / SHOP / AFTERTRAIN / FIRST / TRAIN。TITLE 与 SHOP_AFTER_LOAD 是
 * ere 侧本地扩展（见下）：TITLE 由主循环直接作为初始状态跑、不经 begin()，
 * SHOP_AFTER_LOAD 则由读档成功分支的缺省转场交给 begin()，用来把「读档进入」
 * 与显式 BEGIN SHOP 区分开。
 */
const STATE = Object.freeze({
  /**
   * 标题画面。ere 侧本地扩展，非 BEGIN 目标：启动直接进标题页，
   * 没有 BEGIN TITLE；ere 侧主循环以状态统一承载入口。
   */
  TITLE: 'TITLE',
  /** 新游戏初始化（进入 EVENTFIRST 事件链） */
  FIRST: 'FIRST',
  /** 商店主循环 */
  SHOP: 'SHOP',
  /**
   * 读档后的商店主循环。ere 侧本地扩展（#137），非 BEGIN 目标：读档成功后
   * 由 page-save-load.js 的 load_game 跑完 EVENTLOAD 链，链里没有处理器
   * 发起转场时进入本状态。与 SHOP 的唯一差别：**读档后不执行 EVENTSHOP
   * 链**——用一个独立状态把「读档进入」和「BEGIN SHOP」区分开。处理器见
   * main-loop.js（同 run_shop，跳过 EVENTSHOP 链）。
   */
  SHOP_AFTER_LOAD: 'SHOP_AFTER_LOAD',
  /** 调教开始 */
  TRAIN: 'TRAIN',
  /** 调教后结算 */
  AFTERTRAIN: 'AFTERTRAIN',
  /** 回合结算 */
  TURNEND: 'TURNEND',
});

// 转场目标的取值集合。键与取值同源（上方枚举逐项写明），判定只看取值：
// 调用方传的是 STATE.XXX 的取值，不是键名。
const STATE_VALUES = new Set(Object.values(STATE));

/**
 * 发起 BEGIN 转场：校验目标并把它作为返回值交出去。
 *
 * 用法固定为 `return begin(STATE.X);`——返回值就是下一状态，由事件链或
 * 状态处理器继续往上交。
 * @param {string} state STATE 枚举的取值
 * @returns {string} 同一个 state，供调用方原样上抛
 * @throws {TypeError} 目标不在 STATE 枚举里：笔误在发出处即报错，而不是等
 *   主循环收到一个悬空状态
 */
function begin(state) {
  if (!STATE_VALUES.has(state)) {
    throw new TypeError(`begin() 收到未知游戏状态: ${String(state)}`);
  }
  return state;
}

/**
 * 判定一个返回值是不是转场目标。
 *
 * 中间层用它区分「被调用方发起了转场」与「被调用方的普通返回值」：有的
 * 函数平时返回数字（跨存档通信的菜单返回条数、读档界面返回页起点），发起
 * 转场时返回 STATE 取值，调用方据本判定决定是上抛还是照常消费。
 * @param {any} value 任意返回值
 * @returns {boolean} 是 STATE 枚举的取值即 true
 */
function is_state(value) {
  return STATE_VALUES.has(value);
}

module.exports = { begin, is_state, STATE };
