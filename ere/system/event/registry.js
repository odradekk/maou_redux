/**
 * @file 事件注册表与调度器（决议 #6，实现于 issue #20）。
 *
 * 本模块是事件函数机制的等价物（决议 #6）；机制出处与语义证据见
 * 决议 #6 的评论。
 *
 * 同一事件名可挂多个处理器（同一事件的多处
 * 定义），emit 时全部执行，顺序分三档：
 *     PRI（#PRI 优先档）/ NORMAL（无标记普通档）/ LATER（#LATER 延后档）
 *
 * 【有意偏离（#6 决议）】同档内的顺序取**注册的书写顺序**，不取文件系统的
 * 目录项序——后者随环境变化、不可复现。注册由启动装配表
 * （system/flow/startup.js）按表里的模块顺序逐条发出（#851），所以「书写
 * 顺序」现在读装配表与各模块的 HANDLERS 即可，不再取决于谁先 require 谁。
 * #PRI 组各口上只写自己的存在标志、互不干涉，本游戏风险低（#6 评估）。
 *
 * BEGIN 语义（#6 推翻 #3 后的版本，本模块是它的运行时验证）：
 * 处理器 `return begin(STATE.X)` 把这个目标交到处理器边界，emit 在此**暂存**，
 * 链继续跑完剩余处理器；后续目标覆盖暂存值；链结束后把暂存目标作为返回值
 * 交给主循环提交跳转。语义逐条见 system/flow/game-state.js 的文件头。
 *
 * 【上抛约定（#850）】转场是普通返回值，任何 try/catch 都不必为它让路——旧
 * 「catch 首行重抛」的硬约束已随信号一起删除。代价是拿到返回值的一方必须
 * 自己上抛：调用 emit 或调用会发起转场的函数后，用 is_state 判定返回值，
 * 是 STATE 取值就立刻 `return` 出去。忽略返回值 = 转场被静默丢掉。
 *
 * 【事件名（#849）】on / emit 收到的名字必须在 EVENT 枚举里，否则当场抛错。
 * 名字拼错时两侧都不会有任何提示：注册处建出一条永远等不到触发的链，触发处
 * 找不到链就按空链返回——功能静默消失，读代码才发现。校验因此放在入口。
 *
 * 【终止型转场（#852）】回标题是游戏结束：链在发出处中止，后续处理器不再
 * 执行，暂存槽也不会再被覆盖。原实现在这些位置是 era.quit()（throw 型），
 * 异常炸断了整条链；改成返回值后必须保留这条语义——否则世界已经结束，
 * 回合结算仍会跑完并用尾部的 BEGIN SHOP 把「回标题」盖掉。
 */

const { is_state, STATE } = require('#/system/flow/game-state');
const { EVENT_NAMES } = require('#/data/event-name-const');

/** 三档优先级：#PRI / 无标记 / #LATER（#SINGLE、#ONLY 没有用到，不实现） */
const TIER = Object.freeze({
  PRI: 'PRI',
  NORMAL: 'NORMAL',
  LATER: 'LATER',
});

// 终止型转场目标：发出即结束链（理由见文件头）
const TERMINAL_STATES = new Set([STATE.TITLE]);

// 执行序：优先档 → 普通档 → 延后档（#6 保留三档的依据）
const TIER_ORDER = [TIER.PRI, TIER.NORMAL, TIER.LATER];

// 注册表：event_name -> { PRI: 处理器数组, NORMAL: ..., LATER: ... }
// 模块级状态；注册只由启动装配表（system/flow/startup.js）调用 on() 完成，
// 处理器模块只导出声明（#851）
const registry = new Map();

// 认得的名字来自枚举，注册表不另抄一份
const KNOWN_EVENT_NAMES = new Set(EVENT_NAMES);

/**
 * 名字不在枚举里就抛错。
 *
 * 注册与触发都走这里：注册处拼错的名字永远等不到同名触发，触发处拼错的名字
 * 永远找不到链，两种都是「功能不响、没人报错」的老样子。
 *
 * @param {string} event_name 收到的名字
 * @param {string} caller 调用方（on / emit），报错时指明是哪一侧拼错
 */
function assert_known(event_name, caller) {
  if (!KNOWN_EVENT_NAMES.has(event_name)) {
    throw new Error(
      `${caller}() 收到未知事件名 ${String(event_name)}——事件名只能用 EVENT 枚举里的名字：${EVENT_NAMES.join(' / ')}`,
    );
  }
}

/**
 * 注册事件处理器。
 * @param {string} event_name 事件名，取 EVENT 枚举的取值
 * @param {Function} handler 异步处理器；返回值是 STATE 取值即发起转场
 * @param {string} [tier] TIER 三档之一，默认 NORMAL
 */
function on(event_name, handler, tier = TIER.NORMAL) {
  assert_known(event_name, 'on');
  if (typeof handler !== 'function') {
    throw new TypeError(`on(${event_name}) 的处理器必须是函数`);
  }
  if (!TIER_ORDER.includes(tier)) {
    throw new Error(`on(${event_name}) 的优先档无效: ${String(tier)}`);
  }
  let chain = registry.get(event_name);
  if (chain === undefined) {
    chain = { PRI: [], NORMAL: [], LATER: [] };
    registry.set(event_name, chain);
  }
  // 同档内 push 到队尾：书写顺序即执行顺序（见文件头的「有意偏离」）
  chain[tier].push(handler);
}

/**
 * 调度一个事件：按 PRI → NORMAL → LATER、组内注册序跑完全部处理器。
 *
 * 处理器返回 STATE 取值时暂存该目标并继续链（不中止——#6 用实测日志
 * 证实的约定语义）；返回其它值时按普通返回值忽略。处理器抛异常则原样
 * 上抛（引擎对脚本错误报错停机）——转场已不是异常，不再需要为它开洞。
 *
 * 唯一例外是终止型转场（回标题 = 游戏结束）：暂存它并当场返回，链上剩余
 * 处理器不再执行。理由见文件头的「终止型转场」。
 *
 * @param {string} event_name 事件名，取 EVENT 枚举的取值
 * @param {...any} args 透传给每个处理器的参数
 * @returns {Promise<string|undefined>} 链内最后一次 BEGIN 暂存的目标状态；
 *   全链无人发起 BEGIN（或事件无人注册）时为 undefined，由主循环决定处置
 */
async function emit(event_name, ...args) {
  assert_known(event_name, 'emit');
  const chain = registry.get(event_name);
  if (chain === undefined) {
    // 空链 = 这个事件没有任何定义，静默通过
    return undefined;
  }
  let pending; // 待跳转状态：BEGIN 暂存槽，后写覆盖先写（最后一个胜出）
  for (const tier of TIER_ORDER) {
    for (const handler of chain[tier]) {
      const next = await handler(...args);
      if (is_state(next)) {
        pending = next;
        if (TERMINAL_STATES.has(next)) {
          return pending; // 世界已结束：后续处理器不再执行
        }
      }
    }
  }
  return pending;
}

/**
 * 某事件已注册的处理器条数（按档位）。只读。
 *
 * 供启动装配的审计用例核对「模块声明的条数」与「真正进了注册表的条数」
 * 一致：装配表与声明都在源码里，只有这一处能证明它们确实被执行过。
 * 执行顺序不在这里——它是装配顺序（system/flow/startup.js）决定的。
 *
 * @param {string} event_name 事件名，取 EVENT 枚举的取值
 * @returns {{PRI: number, NORMAL: number, LATER: number}}
 */
function handler_counts(event_name) {
  assert_known(event_name, 'handler_counts');
  const chain = registry.get(event_name);
  if (chain === undefined) {
    return { PRI: 0, NORMAL: 0, LATER: 0 };
  }
  return {
    PRI: chain.PRI.length,
    NORMAL: chain.NORMAL.length,
    LATER: chain.LATER.length,
  };
}

module.exports = { on, emit, handler_counts, TIER };
