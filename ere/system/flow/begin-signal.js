/**
 * @file BEGIN 转场信号与游戏状态枚举（决议 #6，实现于 issue #20）。
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
 * 【硬约束（来源于 #6）】业务代码里任何 try/catch 的首行必须是：
 *     if (e instanceof BeginSignal) throw e;
 * 本信号用异常实现「结束当前函数」，任何 catch 都可能半路截走它；截走后
 * 不重新抛出 = 转场被静默吞掉（不报错、不停机、游戏停在原地）。后续十七
 * 个子系统移植时都会写 catch——先抄这一行。test/event-registry.test.js 的
 * 「吞掉信号」反例用例守着这条约束的必要性。
 */

/**
 * 游戏状态枚举：BEGIN 的合法目标。
 *
 * 取值 = BEGIN 的关键字。转场目标只有这 5 种（issue #20 定案，本枚举）：
 * TURNEND / SHOP / AFTERTRAIN / FIRST / TRAIN。
 * 其余目标（TITLE 除外，见下）不用，不列。
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
   * 读档后的商店主循环。ere 侧本地扩展（#137），非 BEGIN 目标：读档由
   * LOADGLOBAL 钩子显式发起本转场（#115 实测 LOADGLOBAL 即转场时机）。
   * 与 SHOP 的唯一差别：**读档后不执行 EVENTSHOP 链**——ere 不区分
   * 隐式/显式进入，以独立状态显式承载来源。处理器见 main-loop.js（同
   * run_shop，跳过 EVENTSHOP 链）。
   */
  SHOP_AFTER_LOAD: 'SHOP_AFTER_LOAD',
  /** 调教开始 */
  TRAIN: 'TRAIN',
  /** 调教后结算 */
  AFTERTRAIN: 'AFTERTRAIN',
  /** 回合结算 */
  TURNEND: 'TURNEND',
});

/**
 * BEGIN 的 JS 等价物：携带目标状态的异常信号。
 * 用异常实现「从任意嵌套深度结束当前函数」（BEGIN 可出现在 IF 块
 * 中段的任意位置）。
 */
class BeginSignal extends Error {
  /**
   * @param {string} state STATE 枚举的取值（跳转目标）
   */
  constructor(state) {
    super(`BEGIN ${state}`);
    this.name = 'BeginSignal';
    this.state = state;
  }
}

/**
 * 发出转场信号：立即结束当前函数（本函数只 throw，绝不返回）。
 * 事件链内由调度器捕获暂存（system/event/registry.js 的 emit）；非事件
 * 函数内一路上抛，由主循环接住（system/flow/main-loop.js 的 enter_state）。
 * @param {string} state STATE 枚举的取值
 * @throws {BeginSignal} 永远抛出
 */
function begin(state) {
  // 未知目标在发信号处即报错，而不是等主循环收到一个悬空状态。
  // 按「值」校验（调用方传的是 STATE.XXX 取值，不是键）
  if (!Object.values(STATE).includes(state)) {
    throw new TypeError(`begin() 收到未知游戏状态: ${String(state)}`);
  }
  throw new BeginSignal(state);
}

module.exports = { BeginSignal, begin, STATE };
