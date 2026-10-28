/**
 * @file 启动装配表（issue #851）：事件处理器唯一的注册点。
 *
 * 处理器模块不再在顶层调用 `on()`——它们导出 `register()`，把本模块的
 * `on(...)` 调用收在里面；注册由本文件按 `HANDLER_MODULES` 自上而下的顺序
 * 逐模块调用。因此：
 *
 *   - 同档处理器的执行顺序 = 本表的模块顺序 × 模块内 `on()` 的书写顺序
 *     （registry.js 的「书写顺序」），不再取决于谁先 require 谁；
 *   - 某条链由哪些模块组成、各挂几条，读本表与各模块的 `register()` 即得；
 *   - 加处理器 = 在模块的 `register()` 里加一行 `on()`；删模块 = 从本表删
 *     一行。少了 `register()` 的模块在这里当场抛错，不会静默变成一条空链。
 *
 * 本表顺序与改动前 `main-loop.js` 的 require 书写顺序一致（那是当时唯一的
 * 装配顺序来源）：口上模块同档内按此顺序执行，event-train（#PRI）→
 * event-train-normal（无属性）等跨档顺序由档位决定、不受本表影响。
 *
 * 分发族是另一套机制（docs/skeleton.md「模块注册有两套机制」）：按编号查表、
 * 编号唯一（重复注册抛错），没有执行顺序语义。族模块仍靠装载时注册，本文件
 * 末尾的清单就是「启动时装了哪些族」的一份账；#274 / #282 的接入锁扫的也是
 * 这张清单。
 */

// —— 事件处理器模块（顺序 = 同档处理器的执行顺序） ——

/**
 * 事件处理器模块的装配顺序：本表自上而下依次调用各模块的 register()。
 *
 * 每项 = `[模块路径（报错与审计用）, 模块]`。路径只是标签，真正取用的是模块
 * 导出的 `register()`——两边对不上时 register_all 会抛错。
 *
 * 口上的 EVENTTRAIN / EVENTEND 同档处理器按此顺序执行；调教域的 SHOW_STATUS /
 * SHOW_USERCOM / USERCOM 与商店的 EVENTSHOP 也都在这里，页面模块的 require
 * 不再兼任注册。
 */
const HANDLER_MODULES = [
  ['#/event/event-first', require('#/event/event-first')],
  ['#/event/event-train', require('#/event/event-train')],
  ['#/event/event-train-normal', require('#/event/event-train-normal')],
  ['#/event/event-com', require('#/event/event-com')],
  ['#/event/event-comend', require('#/event/event-comend')],
  ['#/event/event-comend-normal', require('#/event/event-comend-normal')],
  ['#/event/event-end', require('#/event/event-end')],
  // EVENTLOAD 原先由 page-save-load 的顶层 require 顺带注册；读档页是否被
  // 装载不该决定读档钩子存不存在，随本表在启动时注册
  ['#/event/event-load', require('#/event/event-load')],
  ['#/event/event-turnend', require('#/event/event-turnend')],
  ['#/event/event-turnend-later', require('#/event/event-turnend-later')],
  ['#/system/train/source-check', require('#/system/train/source-check')],
  ['#/page/page-train', require('#/page/page-train')],
  ['#/page/page-usercom', require('#/page/page-usercom')],
  ['#/page/page-shop', require('#/page/page-shop')],
  ['#/system/turnend-settle', require('#/system/turnend-settle')],
  ['#/kojo/kojo-system', require('#/kojo/kojo-system')],
  ['#/kojo/kojo-k0-tender', require('#/kojo/kojo-k0-tender')],
  ['#/kojo/kojo-k2-timid', require('#/kojo/kojo-k2-timid')],
  ['#/kojo/kojo-k3-noble', require('#/kojo/kojo-k3-noble')],
  ['#/kojo/kojo-k5-mao', require('#/kojo/kojo-k5-mao')],
  ['#/kojo/kojo-k1-confident', require('#/kojo/kojo-k1-confident')],
  ['#/kojo/kojo-k4-stoic', require('#/kojo/kojo-k4-stoic')],
  ['#/kojo/kojo-k6-wicked', require('#/kojo/kojo-k6-wicked')],
  ['#/kojo/kojo-k7-heart', require('#/kojo/kojo-k7-heart')],
  ['#/kojo/kojo-k8-spade', require('#/kojo/kojo-k8-spade')],
  ['#/kojo/kojo-k9-diamond', require('#/kojo/kojo-k9-diamond')],
  ['#/kojo/kojo-k10-club', require('#/kojo/kojo-k10-club')],
  ['#/kojo/kojo-k11-lily', require('#/kojo/kojo-k11-lily')],
  ['#/kojo/kojo-k13-protector', require('#/kojo/kojo-k13-protector')],
  ['#/kojo/kojo-k14-nobleman', require('#/kojo/kojo-k14-nobleman')],
  ['#/kojo/kojo-k15-clever', require('#/kojo/kojo-k15-clever')],
  ['#/kojo/kojo-k12-intellectual', require('#/kojo/kojo-k12-intellectual')],
  ['#/kojo/kojo-k903-garde', require('#/kojo/kojo-k903-garde')],
  ['#/kojo/kojo-k19-fia', require('#/kojo/kojo-k19-fia')],
  ['#/kojo/kojo-k904-fia', require('#/kojo/kojo-k904-fia')],
];

// —— 分发族模块（装载即注册；编号唯一，无顺序语义） ——

// 调教指令族：COM / COM_ABLE / EQUIP_COM / TRAIN_MESSAGE / 升格规则
require('#/system/train/com-caress');
require('#/system/train/com-sex');
require('#/system/train/com-service');
require('#/system/train/com-sm');
require('#/system/train/com-hardcore');
require('#/system/train/com-special');
require('#/system/train/com-cloth');
require('#/system/train/com-assistant');
require('#/system/train/com-colosseum');
require('#/system/train/com-toy');
require('#/system/train/com-advanced');
require('#/system/train/com-tentacle');
// 战役 1「赤蛮呪森」：CAMPAIGN_* DispatchFamily 的实现注册
require('#/page/page-campaign-1');

/**
 * 按装配表注册全部事件处理器。
 *
 * main-loop 在模块顶层调用一次，早于任何 emit；测试也可单独加载某个处理器
 * 模块后手工调用本函数以外的路径不成立（按模块物理上不再自己注册）。
 */
function register_all() {
  for (const [path, handler_module] of HANDLER_MODULES) {
    if (typeof handler_module.register !== 'function') {
      // 表里有、模块没导出 register 时不能静默通过：那正是「链少了处理器却
      // 没人发现」的形态（#851）
      throw new Error(`${path} 没有导出 register()——装配表与模块不一致`);
    }
    handler_module.register();
  }
}

module.exports = { HANDLER_MODULES, register_all };
