/**
 * @file EXPLV 常量（Emuera 内建，_replace.csv 的 `EXPLVの初期値` 键未启用——
 * 该行是注释，见 target/CSV/_replace.csv:79）。
 *
 * 源: 无对应源——EXPLV 是 Emuera 的内建数组（默认 0,1,4,20,50,200，
 *     emuera-basic-agent-guide 的 game-config/config.md「EXPLVの初期値」）。
 *
 * #216（J6）首落于 com-vaginasex / com-analsex（射精ゲージ的 EXP:0/52
 * 阈值分档）。ere/era-utils/palam-level.js 的同款形状。
 */

/** 经验等级阈值（不含下界）：EXP < EXPLV[n] 即为 n-1 级以下 */
const EXPLV = [0, 1, 4, 20, 50, 200];

module.exports = { EXPLV };
