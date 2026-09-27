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
 * DECLARED_TRAIN_IDS 就是 yml/TrainCommand.yml 全部 id 的升序离线转写
 * （com-family.js）——升序枚举与 0–300 的逐号扫描一致，位次即下标。
 * 数据表变动时（转写源重跑）映射自动跟随，不会静默失配。契约测试
 * （test/com-dispatch.test.js）另从 yml 文本独立推一遍核对。
 *
 * 空号段参考（L_I 侧）：39 / 67 / 69 / 70 / 74-79 / 84 / 86 / 91-99 /
 * 111-121 / 123-134 / 136-149 / 151-199 / 209+——从打屁股（L_I 40）起
 * L_IDX = L_I − 累计空号数。
 */

const { DECLARED_TRAIN_IDS } = require('#/system/train/com-family');

// 升序缓存：DECLARED_TRAIN_IDS 已升序，防御性再排一次（映射的正确性
// 依赖顺序与唯一性，源头若乱序/重号在这里炸而不是给出静默错位的表）
const ORDERED_TRAIN_IDS = [...DECLARED_TRAIN_IDS].sort((a, b) => a - b);
if (new Set(DECLARED_TRAIN_IDS).size !== DECLARED_TRAIN_IDS.length) {
  throw new Error('DECLARED_TRAIN_IDS 含重复编号（L_IDX 映射无法建立）');
}

/**
 * 渲染侧：指令表编号（L_I）→ 玩家可见紧凑序号（L_IDX）。
 * 指令菜单界面的方格编号。0-38 段两套重合（恒等），39 起错位。
 *
 * @param {number} id 指令表指令编号（不在指令表的高级 COM 无位次）
 * @returns {number|undefined} L_IDX；id 不在可直选空间内 → undefined
 */
function com_index(id) {
  const idx = ORDERED_TRAIN_IDS.indexOf(id);
  return idx === -1 ? undefined : idx;
}

/**
 * 输入侧：玩家输入的紧凑序号（L_IDX）→ 指令表编号（L_I）。
 * train-loop 的输入检查先过本层：undefined = 不是指令编号（含 999 出口、
 * 100-108/990-992 子菜单号、任意键盘数字），交给 usercom 界面分发。
 *
 * @param {number} idx 玩家输入（紧凑序号）
 * @returns {number|undefined} L_I；越界（idx < 0 或 ≥ 101）→ undefined
 */
function com_id(idx) {
  if (!Number.isInteger(idx) || idx < 0 || idx >= ORDERED_TRAIN_IDS.length) {
    return undefined;
  }
  return ORDERED_TRAIN_IDS[idx];
}

module.exports = { com_id, com_index };
