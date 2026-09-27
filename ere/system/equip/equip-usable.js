/**
 * @file 装备适用判定：usable_equipment。
 *
 */

'use strict';

const era = require('#/era-electron');

/**
 * 职业素质（TALENT:200-208）→ 可用武器识别号表（IF 链
 * 按书写序判定、首个命中即定）。TALENT:204（肉便器）不在链上——
 * 落到函数尾的隐式 RETURNF 0，与「无任何职业素质」同途。
 */
const JOB_WEAPON_TABLE = [
  [200, [40, 42, 43, 47, 48, 50, 51, 52]], // 战士
  [201, [41, 46]], // 魔法师
  [202, [41, 46]], // 神官
  [203, [42, 43, 44, 50, 52]], // 盗贼
  [205, [40, 42, 43, 47, 48, 50]], // 骑士
  [206, [40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51]], // 巫女
  [207, [43, 44, 50, 52]], // 忍者
  [208, [43, 45]], // 弓手
];

/**
 * usable_equipment：角色能否装备该识别号的装备。
 * 戒指（0-20）人人可用；武器按职业素质的可用表判定。
 * @param {number} cid 角色
 * @param {number} id 装备识别号
 * @returns {number} RETURNF：1 可用 / 0 不可用
 */
function usable_equipment(cid, id) {
  // 戒指段（SIF ARG:1 >= 0 && ARG:1 <= 20 RETURNF 1）
  if (id >= 0 && id <= 20) {
    return 1;
  }

  // 职业判定（首个命中的职业定结果；无命中落到尾部隐式 0）
  for (const [talent_no, weapons] of JOB_WEAPON_TABLE) {
    if (era.get(`talent:${cid}:${talent_no}`)) {
      return weapons.includes(id) ? 1 : 0;
    }
  }
  return 0;
}

module.exports = { usable_equipment };
