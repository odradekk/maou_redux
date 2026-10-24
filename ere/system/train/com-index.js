/**
 * @file 指令编号的两套空间之间的映射层：玩家可见的紧凑序号 L_IDX ↔
 * 指令表编号 L_I（issue #213，证据 #211 第二段的三条实机实证）。
 *
 * == 为什么必须有这层（#211 的实机事实） ==
 *
 * 玩家看到并输入的指令编号（L_IDX）≠ 指令表编号（L_I）。两套编号
 * 只在 0-38（指令表第一个空号 39 之前）重合；打屁股 L_I 40 ↔ L_IDX 39、
 * 交谈 56 ↔ 55、穿脱衣服 110 ↔ 89（train-natural-log:211 玩家按 89
 * 跑出 com110「全部扒光」）。
 *
 * 两个方向（本工单的追加范围）：
 *   - 渲染侧 L_I → L_IDX：按钮上印什么数（page-usercom.js，#45 挂载的
 *     按钮渲染自此带紧凑序号）；
 *   - 输入侧 L_IDX → L_I：SELECTCOM 取什么值（train-loop.js 的输入检查
 *     先过本层，再判可用性——引擎把玩家输入当「全部非空 TRAINNAME 条目
 *     中的位次」解释，位次与 COM_ABLE 状态无关，正因如此映射是无状态的
 *     纯函数）。
 *
 * == 映射由条目顺序推出，不硬编码对照表 ==
 *
 * L_IDX 本应由循环扫描指令表算出；ere 侧运行时不能扫文件（#7），但
 * DECLARED_TRAIN_IDS 就是指令常量里可直选编号的升序清单（com-family.js）
 * ——升序枚举与逐号扫描一致，位次即下标；唯一的例外是位次逐条编号时跳过
 * 调教画面的子菜单按钮号（见 USERCOM_KEYS）。指令常量变动时映射自动跟随，
 * 不会静默失配。契约测试（test/com-dispatch.test.js）另推一遍核对。
 *
 * 空号段参考（L_I 侧）：39 / 67 / 69 / 70 / 74-79 / 84 / 86 / 91-99 /
 * 111-121 / 123-134 / 136-149 / 151-199 / 209+——从打屁股（L_I 40）起
 * L_IDX = L_I − 累计空号数；位次 100 起再加上跳过的子菜单号个数。
 */

const { DECLARED_TRAIN_IDS } = require('#/system/train/com-family');

// 升序缓存：DECLARED_TRAIN_IDS 已升序，防御性再排一次（映射的正确性
// 依赖顺序与唯一性，源头若乱序/重号在这里炸而不是给出静默错位的表）
const ORDERED_TRAIN_IDS = [...DECLARED_TRAIN_IDS].sort((a, b) => a - b);
if (new Set(DECLARED_TRAIN_IDS).size !== DECLARED_TRAIN_IDS.length) {
  throw new Error('DECLARED_TRAIN_IDS 含重复编号（L_IDX 映射无法建立）');
}

// 调教画面子菜单的按钮号（page-usercom.js 的 SHOW_USERCOM）。紧凑序号
// 跳过这些号：同一画面上两枚按钮同号时，引擎两枚都回传同一个值，而
// train-loop 先按指令处理输入，子菜单就再也按不到。改的是序号这一边：
// 子菜单号在每个调教回合都出现、是玩家常按的键，序号从 100 起才会撞，
// 只影响表尾少数指令
const USERCOM_KEYS = new Set([
  100, 101, 102, 103, 104, 105, 106, 107, 108, 112, 990, 991, 992, 999,
]);

// 位次逐条编号，遇到子菜单号顺延
const INDEX_BY_ID = new Map();
const ID_BY_INDEX = new Map();
let next_index = 0;
for (const id of ORDERED_TRAIN_IDS) {
  while (USERCOM_KEYS.has(next_index)) {
    next_index += 1;
  }
  INDEX_BY_ID.set(id, next_index);
  ID_BY_INDEX.set(next_index, id);
  next_index += 1;
}

/**
 * 渲染侧：指令表编号（L_I）→ 玩家可见紧凑序号（L_IDX）。
 * 指令菜单界面的方格编号。0-38 段两套重合（恒等），39 起错位。
 *
 * @param {number} id 指令表指令编号（不在指令表的高级 COM 无位次）
 * @returns {number|undefined} L_IDX；id 不在可直选空间内 → undefined
 */
function com_index(id) {
  return INDEX_BY_ID.get(id);
}

/**
 * 输入侧：玩家输入的紧凑序号（L_IDX）→ 指令表编号（L_I）。
 * train-loop 的输入检查先过本层：undefined = 不是指令编号（含子菜单号、
 * 999 出口、任意键盘数字），交给 usercom 界面分发。
 *
 * @param {number} idx 玩家输入（紧凑序号）
 * @returns {number|undefined} L_I；不是任何指令的序号 → undefined
 */
function com_id(idx) {
  return ID_BY_INDEX.get(idx);
}

module.exports = { com_id, com_index };
