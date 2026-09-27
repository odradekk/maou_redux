/**
 * @file EXPLV 常量（经验等级阈值，默认 0,1,4,20,50,200——`EXPLVの初期値`
 * 配置键未启用，无可覆盖处）。
 *
 * #216（J6）首落于 com-vaginasex / com-analsex（射精ゲージ的 EXP:0/52
 * 阈值分档）。ere/era-utils/palam-level.js 的同款形状。
 */

/** 经验等级阈值（不含下界）：EXP < EXPLV[n] 即为 n-1 级以下 */
const EXPLV = [0, 1, 4, 20, 50, 200];

module.exports = { EXPLV };
