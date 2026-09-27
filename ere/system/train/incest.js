/**
 * @file 亲族关系判定共用子程序。
 *
 * TFLAG:14 = 从当前 TARGET 看 PLAYER 的亲族关系：0 无、1 父母、2 子女、
 * 3 兄姐、4 弟妹、5 表姐、6 表弟。ere/event/source-check.js 与性交事后
 * 处理都会调用，因此不能各自复制或打桩。
 *
 * CFLAG:25 命中时却以 CFLAG:24 / 100 赋值；这是错误但可观察的行为，
 * 有意逐字面保留，不能改为 CFLAG:25。
 */

const era = require('#/era-electron');
const { game } = require('#/facade/game');

/** MASTER：魔王主角，恒为角色 0（CONTEXT.md）。 */
const MASTER = 0;

/**
 * 判定亲族关系，写回并返回 TFLAG:14。
 * @param {number} target 当前调教对象（TARGET）
 * @param {number} player 当前调教者（PLAYER）
 * @returns {number} 亲族关系编码（TFLAG:14）
 */
function incest(target, player) {
  game.train.近亲与自我口上 = 0;

  // 按 21 → 25 顺序覆盖（后号覆盖前号）；数组只是把同构的逐号判断收进循环。
  for (const index of [21, 22, 23, 24]) {
    const relation = era.get(`cflag:${target}:${index}`) || 0;
    if (relation !== 0 && relation % 100 === player) {
      game.train.近亲与自我口上 = Math.floor(relation / 100) + 1;
    }
  }

  const relation25 = era.get(`cflag:${target}:25`) || 0;
  if (relation25 !== 0 && relation25 % 100 === player) {
    // 此处字面读取 CFLAG:24，不是 CFLAG:25。
    game.train.近亲与自我口上 =
      Math.floor((era.get(`cflag:${target}:24`) || 0) / 100) + 1;
  }

  if (
    player === MASTER &&
    [21, 22, 23, 24, 25].some(
      (index) => (era.get(`cflag:${target}:${index}`) || 0) === -1,
    )
  ) {
    game.train.近亲与自我口上 = 1;
  }

  return game.train.近亲与自我口上;
}

module.exports = { incest };
