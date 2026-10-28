/**
 * @file PALAM 域工具：PALAMLV 常量、参数等级判定（默认
 *     0,100,500,3000,10000,30000,60000,100000,150000,250000）与「结算后的值」。
 *     GETPALAMLV 是内建函数，palam_level 是其等价物。
 *
 * #44 首落于 page-train.js（PRINT_PALAM 条形），#45 起 source_check 一族
 * （欲情分档、耻情衰减、TFLAG:60 判断、参数描述）也要用，统一收进本模块。
 *
 * palam_settled 是同一域的读侧访问器：调教期参数分居 palam / delta 两表，
 * 需要「把本回合的增量算进去」的读点必须两表相加，理由见函数注释。
 *
 * 阈值阶梯与由它派生的读取规则放在一处：palam_level 就是阶梯的查表函数，
 * 拆开会让「改阈值」和「改分档口径」落到两个文件。同型的体力/宝珠结算
 * 读值（base / juel）在 era-utils/train-settle.js，那组没有阈值阶梯。
 */

const era = require('#/era-electron');

/** 参数等级阈值（含下界）：值达到 PALAMLV[n] 即为 LV n */
const PALAMLV = [
  0, 100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000,
];

/**
 * GETPALAMLV 的等价物：值达到的最高等级（阈值含下界）。
 * @param {number} value
 * @returns {number}
 */
function palam_level(value) {
  let level = 0;
  while (level + 1 < PALAMLV.length && value >= PALAMLV[level + 1]) {
    level += 1;
  }
  return level;
}

/**
 * 参数（PALAM）的「结算后的值」＝ 已结算的 palam + 本回合尚未结算的 delta。
 *
 * 回合内的 UP/DOWN 只落进 delta，palam 由引擎 nextTurnInTrain 在回合末加算
 * 并清零 delta（职责划分见 source-check.js 文件头）。因此结算之前读 palam 的
 * 地方——调教收尾的欲情快照、EVENTEND 链——要读本函数，否则少掉最后一轮的
 * 增量（正常流程里那一轮已经结算、delta 为 0，两者同值；delta 非 0 时只有
 * 本函数是正确的那个数）。
 *
 * @param {number} cid 角色 ID
 * @param {number} index PALAM 序号
 * @returns {number}
 */
function palam_settled(cid, index) {
  return (
    (era.get(`palam:${cid}:${index}`) || 0) +
    (era.get(`delta:${cid}:${index}`) || 0)
  );
}

module.exports = { PALAMLV, palam_level, palam_settled };
