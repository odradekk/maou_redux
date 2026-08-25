/**
 * @file BEGIN 转场信号与游戏状态枚举（决议 #6，落地于 issue #20）。
 *
 * 源: Emuera 的 BEGIN 指令。真实语义（emuera.log 与 Emuera 1.824 源码双重
 * 确认，见 #6 决议——它推翻了 #3 第 6 节「BEGIN 中止事件链」的旧结论）：
 *   1. 结束当前函数，绝不执行 BEGIN 下方的语句；
 *   2. 只**暂存**目标，事件链继续按 #PRI → 普通 → #LATER 跑完剩余处理器；
 *   3. 期间再有 BEGIN 则覆盖暂存值，**最后一个胜出**；
 *   4. 整条链跑完、调用栈退出后才提交跳转。
 * 若按 #3 旧理解把 BEGIN 当「异常展开到顶层」，SYSTEM ver1.0.3.ERB:234 起
 * 的 500 余行回合结算会被静默跳过——那种能跑起来、玩到中期才发现数值不对
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
 * 取值 = 原作的关键字。原作全库只有 5 种目标（issue #20 核实，括号为出现
 * 处数）：TURNEND(8) / SHOP(6) / AFTERTRAIN(6) / FIRST(2) / TRAIN(1)。
 * 其余目标（TITLE 除外，见下）原作不用，不列。
 */
const STATE = Object.freeze({
  /**
   * 标题画面。ere 侧本地扩展，非原作 BEGIN 目标：原作由引擎启动直接进
   * @SYSTEM_TITLE，没有 BEGIN TITLE；ere 侧主循环以状态统一承载入口。
   */
  TITLE: 'TITLE',
  /** 新游戏初始化（原作 2 处；TITLE ver1.0.8.ERB:103 → SYSTEM ver1.0.3.ERB:1 @EVENTFIRST） */
  FIRST: 'FIRST',
  /** 商店主循环（原作 6 处 BEGIN SHOP） */
  SHOP: 'SHOP',
  /**
   * 读档后的商店主循环。ere 侧本地扩展（#137），非原作 BEGIN 目标：原作由
   * LOADDATA 的引擎转场承载（SYSTEM_DATA.ERB:71 的注释「実行後、@EVENTLOAD
   * へ遷移」——LOADDATA 与 BEGIN 并列，技能 system-flow.md:26）。与 SHOP 的
   * 唯一差别：**读档后不执行 @EVENTSHOP**（同文件 51-53 行「时机：读档后、
   * BEGIN SHOP 执行后」「读档后不执行 @EVENTSHOP」）——原作引擎内建地区分
   * 「LOADDATA 隐式进入」与「显式 BEGIN SHOP」，ere 侧没有引擎替我们记来源，
   * 以独立状态显式承载。处理器见 main-loop.js（同 run_shop，跳过
   * EVENTSHOP 链）。
   */
  SHOP_AFTER_LOAD: 'SHOP_AFTER_LOAD',
  /** 调教（原作 1 处：SHOP ver1.0.2.ERB:99） */
  TRAIN: 'TRAIN',
  /** 调教后结算（原作 6 处） */
  AFTERTRAIN: 'AFTERTRAIN',
  /** 回合结算（原作 8 处） */
  TURNEND: 'TURNEND',
});

/**
 * BEGIN 的 JS 等价物：携带目标状态的异常信号。
 * 用异常实现「从任意嵌套深度结束当前函数」（原作 BEGIN 可出现在 IF 块
 * 中段，如 TRAIN_MAIN.ERB:283）。
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
  // 笔误防护：未知目标在发信号处即报错，而不是等主循环收到一个悬空状态。
  // 按「值」校验（调用方传的是 STATE.XXX 取值，不是键）
  if (!Object.values(STATE).includes(state)) {
    throw new TypeError(`begin() 收到未知游戏状态: ${String(state)}`);
  }
  throw new BeginSignal(state);
}

module.exports = { BeginSignal, begin, STATE };
