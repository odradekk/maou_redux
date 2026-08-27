/**
 * @file 装备适用判定：@USEABLE_EQUIPMENT。
 *
 * 源: target/ERB/其他/USE_EX_ITEM.ERB  @USEABLE_EQUIPMENT（:247-329，
 *     #FUNCTION——#134 裁定随本票）。消费方是 EX 道具的购入/使用判定
 *     （USE_EX_ITEM 存根随阶段 5）；职业素质号 → 名称见 yml/Talent.yml。
 */

'use strict';

const era = require('#/era-electron');

/**
 * 职业素质（TALENT:200-208）→ 可用武器识别号表（源 :267-329 的 IF 链，
 * 按书写序判定、首个命中即定）。TALENT:204（肉便器）原作不在链上——
 * 落到函数尾的隐式 RETURNF 0，与「无任何职业素质」同途。
 */
const JOB_WEAPON_TABLE = [
  [200, [40, 42, 43, 47, 48, 50, 51, 52]], // 战士（:267-273）
  [201, [41, 46]], // 魔法师（:275-281）
  [202, [41, 46]], // 神官（:283-289）
  [203, [42, 43, 44, 50, 52]], // 盗贼（:291-297）
  [205, [40, 42, 43, 47, 48, 50]], // 骑士（:299-305）
  [206, [40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51]], // 巫女（:307-313）
  [207, [43, 44, 50, 52]], // 忍者（:315-321）
  [208, [43, 45]], // 弓手（:323-329）
];

/**
 * @USEABLE_EQUIPMENT：角色能否装备该识别号的装备。
 * 戒指（0-20）人人可用；武器按职业素质的可用表判定。
 * @param {number} cid 角色（原作 ARG）
 * @param {number} id 装备识别号（原作 ARG:1）
 * @returns {number} RETURNF：1 可用 / 0 不可用
 */
function usable_equipment(cid, id) {
  // :251-252 戒指段（SIF ARG:1 >= 0 && ARG:1 <= 20 RETURNF 1）
  if (id >= 0 && id <= 20) {
    return 1;
  }

  // :267-329 职业判定（首个命中的职业定结果；无命中落到尾部隐式 0）
  for (const [talent_no, weapons] of JOB_WEAPON_TABLE) {
    if (era.get(`talent:${cid}:${talent_no}`)) {
      return weapons.includes(id) ? 1 : 0;
    }
  }
  return 0;
}

module.exports = { usable_equipment };
