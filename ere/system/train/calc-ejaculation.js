const era = require('#/era-electron');

/**
 * 按本轮增量结算射精槽，返回普通（1）或大量（2）射精档位。
 * BASE 写入会立即封顶，必须在写回之前分档并扣除已射出的量。
 * index：2 为角色射精槽，4 为触手、兽奸与怪物共用的射精槽。
 */
function settle_ejaculation_gauge(cid, amount, index = 2) {
  const address = `base:${cid}:${index}`;
  const total = (era.get(address) || 0) + amount;
  const max = era.get(`maxbase:${cid}:${index}`) || 0;
  const grade = total > max * 2 ? 2 : total > max ? 1 : 0;
  const remaining = grade
    ? Math.min(Math.max(total - max * grade, 0), max - 1)
    : total;
  era.set(address, remaining);
  return grade;
}

module.exports = { settle_ejaculation_gauge };
