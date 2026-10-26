/**
 * @file 事件名枚举：事件总线认得的全部名字，只此一份（issue #849）。
 *
 * 事件名原本是散在四十多个文件里的裸字符串。注册处写错一个字母，`on` 照样
 * 建出一条名字对不上的链，`emit` 找不到链就当作「这个事件没有任何定义」静默
 * 返回——玩家侧表现为某段功能整个不响，既不报错也不留痕，只能靠人读代码发
 * 现。改成枚举之后，注册与触发都从这里取值，不在表里的名字在 `on` / `emit`
 * 的入口当场抛错。
 *
 * 取值就是事件名本身（`EVENT.TRAIN` === `'EVENTTRAIN'`）：注册表的键、日志与
 * 注释里的称呼都按字符串认事件，保持字符串不变才能只换写法、不动语义。
 *
 * 加一个事件 = 在这里加一行，并在装配处注册处理器。表里没有的名字一律视为
 * 拼写错误，不设「合法但没人注册」的中间态：那种事件触发时同样谁也不响应，
 * 与拼错分不开。
 */

const EVENT = Object.freeze({
  // 流程：开局 → 读档 → 据点轮 → 回合结算
  FIRST: 'EVENTFIRST',
  LOAD: 'EVENTLOAD',
  SHOP: 'EVENTSHOP',
  TURNEND: 'EVENTTURNEND',

  // 调教回合里的钩子，按一回合内的触发顺序排列
  COM: 'EVENTCOM',
  SOURCE_CHECK: 'SOURCE_CHECK',
  SOURCE_CHECK_AUTO: 'SOURCE_CHECK_AUTO',
  COMEND: 'EVENTCOMEND',
  TRAIN: 'EVENTTRAIN',
  SHOW_STATUS: 'SHOW_STATUS',
  SHOW_USERCOM: 'SHOW_USERCOM',
  USERCOM: 'USERCOM',
  END: 'EVENTEND',
});

/** 全部事件名（注册表用它判「这个名字认不认得」，报错时也用它列清单） */
const EVENT_NAMES = Object.freeze(Object.values(EVENT));

module.exports = { EVENT, EVENT_NAMES };
