/**
 * @file 诅咒装备的解除与制造：remove_curse、curse_equip_ring。
 *
 * 随机源以参数注入（RAND:N 语义 = 返回 0..N-1 的整数；juel-check 的先例），
 * 生产路径不传参、默认 Math.random。
 */

'use strict';

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const {
  equip_database,
  get_equip_num,
  equip_get,
} = require('#/system/equip/equip-lookup');
const { equip_ring_spans } = require('#/system/equip/equip-print');

/** RAND:N 的默认实现（0..N-1 均匀整数） */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * 解咒后的戒指识别号阶梯（D = RAND:100）。
 * [上界（不含）, 识别号]，按序取首个 D < 上界者；末行上界 100 已全覆盖，
 * fallback 仅作阶梯表缺行的防御。
 */
const UNCURSED_RING_TABLE = [
  [20, 8],
  [40, 7],
  [60, 4],
  [80, 5],
  [85, 17],
  [90, 16],
  [95, 18],
  [96, 3],
  [97, 2],
  [98, 9],
  [99, 10],
  [100, 1],
];

/**
 * 诅咒戒指制造阶梯（D = RAND:100）。
 * [上界（不含）, 识别号]；全不中的分支取 13。
 */
const CURSED_RING_TABLE = [
  [20, 13],
  [40, 14],
  [60, 19],
  [80, 20],
  [90, 12],
  [95, 11],
  [98, 6],
  [100, 15],
];

/** 按阶梯取值：首个 d < 上界 的识别号，全不中取 fallback */
function pick_ring(table, d, fallback) {
  for (const [bound, id] of table) {
    if (d < bound) {
      return id;
    }
  }
  return fallback;
}

/**
 * remove_curse：解咒 w.备注（W:8）指定的道具，产物写回 w。
 * 解咒者是 cid，阶层取 CFLAG:A:501。
 *
 * RESULT 语义：0 = 不装备，1 = 装备（含解咒失败——失败时保留
 * 原诅咒品、调用方照样装上）。
 *
 * @param {object} w 装备记录（备注 = 道具号；产物经存储编号/识别号/强度回传）
 * @param {number} cid 解咒者
 * @param {(n: number) => number} [rng] RAND:N 注入点
 * @returns {Promise<number>} RESULT：0 不装备 / 1 装备
 */
async function remove_curse(w, cid, rng = default_rand) {
  // W:8（道具号）→ W:0（识别号）
  get_equip_num(w);

  // 入手阶层応じた強度：W:0 += CFLAG:A:501 * 1000
  w.存储编号 += (era.get(`cflag:${cid}:501`) || 0) * 1000;

  // 无效装备 → RETURN 0
  if (!equip_database(w)) {
    return 0;
  }

  // 呪われてないならリターン
  if (w.诅咒 === 0) {
    return 0;
  }

  const name = era.get(`callname:${cid}:-1`) ?? ''; // %SAVESTR:A%
  // 神官（202）/忍者（207）以外高概率失败：RAND:3 == 0 → 呪い品装着
  if (
    (era.get(`talent:${cid}:202`) || 0) === 0 &&
    (era.get(`talent:${cid}:207`) || 0) === 0 &&
    rng(3) === 0
  ) {
    era.print(`${name}解咒失败了！`); // PRINTFORMW
    await era.waitAnyKey();
    return 1;
  }
  // ELSEIF RAND:8 == 0 → 失败
  if (rng(8) === 0) {
    era.print(`${name}解咒失败了！`); // PRINTFORMW
    await era.waitAnyKey();
    return 1;
  }

  era.print(`${name}解咒成功。`); // PRINTFORMW
  await era.waitAnyKey();

  // 解咒产物按 D = RAND:100 的阶梯换新识别号
  const d = rng(100);
  w.识别号 = pick_ring(UNCURSED_RING_TABLE, d, 0);

  // 解咒品强度 +1（上限 10）
  if (w.强度 < 10) {
    w.强度 += 1;
  }

  // 重新编码并查表（附魔清零——新编号不含前缀段）
  w.存储编号 = w.识别号 + w.强度 * 1000;
  equip_database(w);
  return 1;
}

/**
 * curse_equip_ring：把装饰戒指（ITEM:300）逐个制成诅咒戒指，
 * 最多 10 个。产物经 equip_get 入包（道具号 300+识别号）。
 *
 * @param {(n: number) => number} [rng] RAND:N 注入点
 * @returns {Promise<number>} RESULT：0 = 库存耗尽（一个都没做），1 = 执行过
 */
async function curse_equip_ring(rng = default_rand) {
  // REPEAT 10
  for (let count = 0; count < 10; count += 1) {
    // SIF ITEM:300 <= 0 → RETURN 0
    if (game.stronghold.装饰戒指 <= 0) {
      return 0;
    }

    // ITEM:300 -= 1
    game.stronghold.装饰戒指 -= 1;

    // 新识别号按 D = RAND:100 阶梯；初期强度 0、无前缀
    const d = rng(100);
    const w = { 存储编号: pick_ring(CURSED_RING_TABLE, d, 13), 强度: 0 };

    // 你把装饰戒指制造成<戒指名>了（一次 print 共一行——引擎每次
    // print 调用即结束一行，连续 PRINT 须合并成片段数组）
    era.print(['你把装饰戒指制造成', ...equip_ring_spans(w), '了']);

    // equip_get
    equip_get(w);
  }

  await era.waitAnyKey(); // WAIT
  return 1;
}

module.exports = { remove_curse, curse_equip_ring };
