/**
 * @file 事件注册表与调度器（决议 #6，落地于 issue #20）。
 *
 * 源: 无单一对应源——本模块是 Emuera 事件函数机制的等价物（引擎行为，非
 * 某个 ERB 函数）；机制出处与语义证据见决议 #6 的评论。
 *
 * 对应 Emuera 的事件函数机制：同一事件名可挂多个处理器（原作同名函数的多
 * 处定义），emit 时全部执行，顺序分三档，对应原作的三种标记：
 *     PRI（#PRI 优先档）/ NORMAL（无标记普通档）/ LATER（#LATER 延后档）
 *
 * 【有意偏离（#6 决议）】同档内的顺序取**注册的书写顺序**（即调用方 require
 * 清单里的书写顺序），而非原作的 NTFS 目录项序——后者随环境变化、不可复
 * 现。#PRI 组各口上只写自己的存在标志、互不干涉，本游戏风险低（#6 评估）。
 *
 * BEGIN 语义（#6 推翻 #3 后的版本，本模块是它的运行时验证）：
 * 处理器内的 begin() 抛出 BeginSignal，emit 在处理器边界捕获并**暂存**目标，
 * 链继续跑完剩余处理器；后续信号覆盖暂存值；链结束后把暂存目标作为返回值
 * 交给主循环提交跳转。详见 system/flow/begin-signal.js 的文件头。
 */

const { BeginSignal } = require('#/system/flow/begin-signal');

/** 三档优先级，对应原作 #PRI / 无标记 / #LATER（#SINGLE、#ONLY 全库零使用，不实现） */
const TIER = Object.freeze({
  PRI: 'PRI',
  NORMAL: 'NORMAL',
  LATER: 'LATER',
});

// 执行序：优先档 → 普通档 → 延后档（#6 保留原作三档的依据）
const TIER_ORDER = [TIER.PRI, TIER.NORMAL, TIER.LATER];

// 注册表：event_name -> { PRI: 处理器数组, NORMAL: ..., LATER: ... }
// 模块级状态；注册发生在各处理器模块的顶层（往数组里塞函数，不碰 era.*，
// 这是引擎允许的——模块顶层调 era.* 才会报错，#6 已核实）
const registry = new Map();

/**
 * 注册事件处理器。
 * @param {string} event_name 事件名（沿用原作函数名，如 'EVENTFIRST'）
 * @param {Function} handler 异步处理器；体内可用 begin() 发起转场
 * @param {string} [tier] TIER 三档之一，默认 NORMAL
 */
function on(event_name, handler, tier = TIER.NORMAL) {
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
 * 处理器抛 BeginSignal 时暂存其目标状态并继续链（不中止——#6 用 emuera.log
 * 证明的原作语义）；处理器抛其他异常则原样上抛（对应 Emuera 报错停机）。
 *
 * @param {string} event_name 事件名
 * @param {...any} args 透传给每个处理器的参数
 * @returns {Promise<string|undefined>} 链内最后一次 BEGIN 暂存的目标状态；
 *   全链无人发起 BEGIN（或事件无人注册）时为 undefined，由主循环决定处置
 */
async function emit(event_name, ...args) {
  const chain = registry.get(event_name);
  if (chain === undefined) {
    // 空链 = 原作事件零定义，静默通过
    return undefined;
  }
  let pending; // 待跳转状态：BEGIN 暂存槽，后写覆盖先写（最后一个胜出）
  for (const tier of TIER_ORDER) {
    for (const handler of chain[tier]) {
      try {
        await handler(...args);
      } catch (e) {
        // 【硬约束 #6】此处只接转场信号并暂存，链继续；其余异常原样上抛。
        // 业务代码自己的 catch 不得吞 BeginSignal（首行重抛，见 begin-signal.js）
        if (!(e instanceof BeginSignal)) {
          throw e;
        }
        pending = e.state;
      }
    }
  }
  return pending;
}

module.exports = { on, emit, TIER };
