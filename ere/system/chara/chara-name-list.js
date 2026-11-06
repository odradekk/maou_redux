/**
 * @file 固定名列表：查表实现（issue #388、#835）。
 *
 * 固定名列表是「编号 → 名字」的常量表，数据在
 * ere/data/chara-name-const.js。它不进静态数据：每个存档都带着同样的
 * 3,264 条，而玩家能改的是角色自己的称呼（callname），不是这张表——表里
 * 没有写点，也没有读档后要重建的状态。
 *
 * 编号域声明尺寸 5,500（LIST_CHARA_NAME_SIZE），表里只有 3,264 个编号：
 * 3,264 之外、5,499 之内是稀疏空隙，查不到名字时返回空串，由调用方
 * （chara_name_define）落保底名。判的是声明尺寸而不是表里有多少条——
 * 「5,500 号是不是已登记」与「5,499 号有没有名字」是两件事。
 *
 * get_fixed_chara_name 是给 chara_name_define（ere/system/chara/chara-name.js）
 * 用的查表接口，缺省处理属于 chara_name_define 一侧。
 */

const { LIST_CHARA_NAME } = require('#/data/chara-name-const');

/**
 * 固定名列表的声明尺寸（5,500）。chara_name_define 判的是它而不是表的
 * 条目数——编号 5,499 与 5,500 都查不到名字，但前者是「名字没有被记录」、
 * 后者是「无效的名字编号」，两条分支的判据不能互相代入。常量放在本模块：
 * 它是唯一持有该表查表逻辑的文件，chara-name.js 从这里的导出消费，不另立
 * 第二个来源。
 */
const LIST_CHARA_NAME_SIZE = 5500;

/**
 * 查表：按固定名编号取名字。
 *
 * @param {number} nid 固定名编号（声明范围 0-5499，稀疏——只有 3,264 个
 *   编号落进了表里，其余在此返回空串）
 * @returns {string} 查到的名字；编号不在表里时空串（未命中时的默认名缺省
 *   处理在 chara_name_define，不在本函数）
 */
function get_fixed_chara_name(nid) {
  return LIST_CHARA_NAME[nid] ?? '';
}

module.exports = {
  get_fixed_chara_name,
  LIST_CHARA_NAME_SIZE,
};
