/**
 * @file V 行为可否判定的公共头：@V_ABLE（issue #213——COMABLE.ERB 的文件
 * 头函数，与 121 段分发表同文件；各 @COM_ABLE<n> 的判定随族票）。
 *
 * 源: target/ERB/調教相關/COMABLE.ERB  @V_ABLE（:3-20）
 *
 * 调用点：BENKI.ERB:1400/:1407（肉便器的 V 行为判定，J7 接线——本票先落
 * 真身，消费点随 J7）。形参 ARG 是**角色号**（talent/cflag 三段寻址的第一
 * 段），不是指令号。
 *
 * 判定逐条（:5-20，返回 1 = 可）：
 *   - TALENT:122（男人）→ 0
 *   - TALENT:135（未成熟）→ 0（源注释写「調教者がサドなら可」但函数体
 *     没有这道豁免——1:1 移植代码，注释与代码的出入记录在案）
 *   - TALENT:0（处女）→ 0
 *   - CFLAG:42 == 79 && (CFLAG:40 & 64) && FLAG:37（贞操带着装且服装
 *     系统启用）→ 0
 *   - TALENT:273（贞操封印）→ 0
 *
 * CFLAG:40/42 的写入路径归服装系统（J5，#215）；FLAG:37（服装描写开关）
 * 归设置面。当前全库无写入点时后两条守卫恒不命中，条件 1:1 保留。
 */

const era = require('#/era-electron');

/**
 * @V_ABLE（COMABLE.ERB:3-20）：ARG 角色的 V 行为是否可能。
 *
 * @param {number} cid 角色 ID
 * @returns {number} 1 = 可 / 0 = 不可
 */
function v_able(cid) {
  if (era.get(`talent:${cid}:122`)) {
    return 0; // :6-7 男人
  }
  if (era.get(`talent:${cid}:135`)) {
    return 0; // :9-10 未成熟（源注释的「萨德豁免」不在函数体内，见文件头）
  }
  if (era.get(`talent:${cid}:0`)) {
    return 0; // :12-13 处女
  }
  if (
    (era.get(`cflag:${cid}:42`) || 0) === 79 &&
    ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
    era.get('flag:37')
  ) {
    return 0; // :15-16 贞操带（CFLAG:42 = 79 且下着位着装，服装系统启用）
  }
  if (era.get(`talent:${cid}:273`)) {
    return 0; // :18-19 贞操封印
  }
  return 1; // :20
}

module.exports = { v_able };
