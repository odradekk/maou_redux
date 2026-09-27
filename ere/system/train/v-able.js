/**
 * @file V 行为可否判定的公共头：v_able（issue #213）。
 *
 * 调用点：肉便器的 V 行为判定（J7 接入——这张工单先实现真身，消费点随
 * J7）。形参 cid 是**角色号**（talent/cflag 三段寻址的第一段），不是指令号。
 *
 * 判定逐条（返回 1 = 可）：
 *   - TALENT:122（男人）→ 0
 *   - TALENT:135（未成熟）→ 0（「調教者がサドなら可」的豁免不在判定内，
 *     有意如此）
 *   - TALENT:0（处女）→ 0
 *   - CFLAG:42 == 79 && (CFLAG:40 & 64) && FLAG:37（贞操带着装且服装
 *     系统启用）→ 0
 *   - TALENT:273（贞操封印）→ 0
 *
 * CFLAG:40/42 的写入路径归服装系统（J5，#215）；FLAG:37（服装描写开关）
 * 归设置面。当前全库无写入点时后两条检查恒不命中，仍完整保留。
 */

const era = require('#/era-electron');

/**
 * v_able：角色的 V 行为是否可能。
 *
 * @param {number} cid 角色 ID
 * @returns {number} 1 = 可 / 0 = 不可
 */
function v_able(cid) {
  if (era.get(`talent:${cid}:122`)) {
    return 0; // 男人
  }
  if (era.get(`talent:${cid}:135`)) {
    return 0; // 未成熟（「萨德豁免」不在判定内，见文件头）
  }
  if (era.get(`talent:${cid}:0`)) {
    return 0; // 处女
  }
  if (
    (era.get(`cflag:${cid}:42`) || 0) === 79 &&
    ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
    era.get('flag:37')
  ) {
    return 0; // 贞操带（CFLAG:42 = 79 且下着位着装，服装系统启用）
  }
  if (era.get(`talent:${cid}:273`)) {
    return 0; // 贞操封印
  }
  return 1;
}

module.exports = { v_able };
