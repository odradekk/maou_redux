/**
 * @file 指令 0（爱抚）的能力阶梯表：ABL:0/1 的等级 → SOURCE 值（issue #876）。
 *
 * 手动（system/train/com-caress.js 的 com0）与自动调教（system/train/autotrain.js
 * 的 com0_auto）读同一份阶梯：同一张表有两个读者，各写一份时改档位要记得两边
 * 都改，而改漏的一边只有自动调教路径的玩家看得见。
 *
 * 档位口径 abl_tier 与表放在一处，理由同 palam-level-const.js 的
 * PALAMLV/palam_level：改阶梯与改取档规则不落到两个文件，读者不会各写各的钳位。
 */

// COM0ABL:0/1 分档 → [SOURCE:0, SOURCE:3] / [SOURCE:17, SOURCE:3 增量]
const ABL_C_TIERS_COM0 = [
  [20, 25],
  [100, 50],
  [500, 80],
  [1200, 100],
  [2000, 115],
  [2800, 125],
];
const ABL_B_TIERS_COM0 = [
  [15, 25],
  [50, 50],
  [300, 80],
  [700, 100],
  [1100, 115],
  [1600, 125],
];

/**
 * 能力等级 → 阶梯下标。
 *
 * ABL 是存档里的整数等级（写入口只有等级提升），末档覆盖 5 及以上的所有等级
 * ——手动路径原有的 `Math.min(…, 5)` 与自动调教路径原先 if/else 链的末段是
 * 同一个口径。未声明的等级读值为 undefined，按 0 档，与 `era.get(…) || 0` 一致。
 * @param {number} [level]
 * @returns {number} 0–5
 */
function abl_tier(level) {
  const lv = Math.floor(level || 0);
  return lv >= 0 && lv < 5 ? lv : 5;
}

module.exports = { ABL_B_TIERS_COM0, ABL_C_TIERS_COM0, abl_tier };
