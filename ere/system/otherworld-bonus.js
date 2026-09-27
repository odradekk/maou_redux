/**
 * @file 异界综合征的调教倍率占位数据。
 *
 * 四个加成函数保持为空：Y/Y:0..5 是只供这些函数使用的临时数组，
 * ere 侧以返回值显式承载，不把尚未写下的加成效果虚构进调教结算。
 */

'use strict';

const { chara } = require('#/facade/chara');

function ikai_undou_bonus() {}
function ikai_kansei_bonus() {}
function ikai_benkyou_bonus() {}
function ikai_sentou_bonus() {}

/**
 * @param {number} cid 角色 ID
 * @returns {{overall: number, factors: number[]}|undefined} factors 承载
 *   临时数组 Y:0..5 的六项倍率
 */
function ikai_source_check(cid) {
  const level = chara(cid).train.异界综合征;
  if (level <= 0) return undefined;
  const overall = { 1: 95, 2: 90, 3: 80, 4: 70, 5: 60 }[level] ?? 0;
  const factors = [100, 100, 100, 100, 100, 100];
  ikai_undou_bonus();
  ikai_kansei_bonus();
  return { overall, factors };
}

module.exports = {
  ikai_source_check,
  ikai_undou_bonus,
  ikai_kansei_bonus,
  ikai_benkyou_bonus,
  ikai_sentou_bonus,
};
