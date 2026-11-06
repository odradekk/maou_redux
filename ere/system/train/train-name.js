/**
 * @file 指令名表：read_train_name 的取名实现（issue #212、#835）。
 *
 * 指令名有两个来源，都在读取时现算，不占存档：
 *   - 静态名：指令常量（ere/data/train-command-const.js，#43）里的名字，按
 *     指令号直接取；
 *   - 动态名：150 号「自由局部调教」的别名是 `<目标的癖好名>调教`，癖好名
 *     读 CSTR:TARGET:7（当前全库无写点，读值恒空）。
 *
 * 150 之外没有可定制的地方：全库没有任何写入指令名的入口，所以名字不随
 * 存档定制，也不需要播种或读档重建。
 *
 * 方格标签与指令号是两套编号：标签用升格后的号（get_adv_com 的返回值），
 * 编号用 L_IDX（非空静态名的紧凑位次）。两者的用法见
 * ere/page/page-usercom.js 的 command_button_label 与 show_commenu。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const {
  ADVANCED_TRAIN_COMMAND,
  TRAIN_COMMAND,
} = require('#/data/train-command-const');

/** 150 号槽的别名由目标的癖好名现算（不取静态名） */
const TRAIN_ALIAS_DYNAMIC_SLOT = 150;

/**
 * 指令号 → 名。不收录的两类：150 是动态槽（read_train_name 现算）；67 没有
 * 玩家可见名（常量里是空串，照缺不补）。
 */
const TRAIN_NAME_TABLE = {};
for (const [id, name] of Object.entries({
  ...TRAIN_COMMAND,
  ...ADVANCED_TRAIN_COMMAND,
})) {
  if (name.length > 0 && Number(id) !== TRAIN_ALIAS_DYNAMIC_SLOT) {
    TRAIN_NAME_TABLE[id] = name;
  }
}

/**
 * 指令名的读数口（p_c 的第二级回落；com120/com121 按当前指令号取名的同
 * 一口）。没有名字的指令号返回空串（#13 的 undefined 缺省处理）。
 *
 * @param {number} id 指令编号
 * @returns {string}
 */
function read_train_name(id) {
  if (id === TRAIN_ALIAS_DYNAMIC_SLOT) {
    // 150 号槽的别名：目标的癖好名 + 调教（癖好名当前恒空 → 「调教」）
    return `${era.get(`cstr:${era_flag.target}:7`) ?? ''}调教`;
  }
  return TRAIN_NAME_TABLE[id] ?? '';
}

module.exports = { TRAIN_NAME_TABLE, read_train_name };
