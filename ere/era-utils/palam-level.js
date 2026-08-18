/**
 * @file PALAMLV 常量与参数等级判定（Emuera 内建，_replace.csv 未改此键）。
 *
 * 源: 无对应源——PALAMLV 是 Emuera 的内建数组（默认 0,100,500,3000,10000,
 *     30000,60000,100000,150000,250000），GETPALAMLV 是内建函数。
 *
 * #44 首落于 page-train.js（PRINT_PALAM 条形），#45 起 SOURCE_CHECK 一族
 * （欲情分档、耻情衰减、TFLAG:60 判据、参数描述）也要用，收敛到本模块。
 */

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

module.exports = { PALAMLV, palam_level };
