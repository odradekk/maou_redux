/**
 * @file 调教期两张「记账 + 待结算增量」表的读值：体力/气力（base）与宝珠
 *     （juel）。
 *
 * 结算归引擎（#875，与 #874 的 palam/delta 同型）：
 *   - base 与 deltabase 分居两表：本回合的 LOSEBASE 只写 deltabase（负值），
 *     base 由引擎 nextTurnInTrain 加算、按 maxbase 钳制并清零 deltabase；
 *   - juel 与 gotjuel 分居两表：本次调教的珠收益、否定抵消与能力提升的
 *     消费都只写 gotjuel（可为负），juel 由引擎 endTrain 在删除调教域表之前
 *     逐键加算。
 *
 * 因此「结算之后才会成立的值」在结算之前必须两表相加。调教期之外没有
 * gotjuel 表（引擎 endTrain 已删），读值退化为只读 juel；deltabase 只在
 * 调教期存在，同样退化。
 */

const era = require('#/era-electron');

/**
 * 体力/气力的「结算后的值」＝ base + 本次尚未结算的 deltabase。
 *
 * 有未结算损耗时按引擎语义钳到 [0, maxbase]（maxbase 未声明或为 0 时不
 * 钳制）；没有损耗时原样返回 base——旧的手工结算也只在有损耗时重写 base，
 * 保持显示与改动前逐字一致。
 *
 * @param {number} cid 角色 ID
 * @param {number} index BASE 序号（0 体力 / 1 气力）
 * @returns {number}
 */
function base_settled(cid, index) {
  const base = era.get(`base:${cid}:${index}`) || 0;
  const delta = era.get(`deltabase:${cid}:${index}`) || 0;
  if (delta === 0) {
    return base;
  }
  const next = base + delta;
  const max = era.get(`maxbase:${cid}:${index}`) || 0;
  return max > 0 ? Math.max(Math.min(next, max), 0) : next;
}

/**
 * 宝珠的「结算后的值」＝ 已结算的 juel + 本次调教尚未结算的 gotjuel。
 *
 * gotjuel 同时承载收益（正）、否定抵消（负）与能力提升的消费（负），引擎
 * endTrain 的加算是唯一结算点。调教期之外没有 gotjuel 表，读到的就是 juel
 * 本身。
 *
 * @param {number} cid 角色 ID
 * @param {number} index JUEL 序号
 * @returns {number}
 */
function juel_settled(cid, index) {
  return (
    (era.get(`juel:${cid}:${index}`) || 0) +
    (era.get(`gotjuel:${cid}:${index}`) || 0)
  );
}

/**
 * 角色是否在引擎的调教名单里＝调教期表（含 gotjuel）是否存在。
 *
 * 能力提升的扣减要在两种上下文里各写各的表：调教窗口内写 gotjuel（等
 * endTrain 结算），调教窗口外（商店的能力值提高）没有 gotjuel 表，直接写
 * juel。名单以引擎为准（getCharactersInTrain 读 tequip 的桶），与
 * turnend-settle.js 的 enroll_joined_characters 同一依据。
 *
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function in_train_window(cid) {
  return era.getCharactersInTrain().includes(cid);
}

module.exports = { base_settled, in_train_window, juel_settled };
