/**
 * @file 诅咒装备的解除与制造：@REMOVE_CURSE、@CURSE_EQUIP_RING。
 *
 * 源: target/ERB/其他/EQUIP.ERB  @REMOVE_CURSE（:89-155）
 *     @CURSE_EQUIP_RING（:157-203；调用点 EVENT_NEXTDAY:120，ere 侧在
 *     ere/event/event-nextday.js）
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
 * 解咒后的戒指识别号阶梯（:121-147，D = RAND:100）。
 * [上界（不含）, 识别号]，按序取首个 D < 上界者；D 恒 < 100，末行 ELSE 的 0
 * 实际不可达（1:1 保留在 fallback）。
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
 * 诅咒戒指制造阶梯（:171-189，D = RAND:100）。
 * [上界（不含）, 识别号]；ELSE 臂回到 13（:187-188）。
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
 * @REMOVE_CURSE（:89-155）：解咒 w.备注（W:8）指定的道具，产物写回 w。
 * 解咒者是 cid（原作 A），阶层取 CFLAG:A:501。
 *
 * RESULT 语义（:93 注释）：0 = 不装备，1 = 装备（含解咒失败——失败时保留
 * 原诅咒品、调用方照样装上）。
 *
 * @param {object} w 装备记录（备注 = 道具号；产物经存储编号/识别号/强度回传）
 * @param {number} cid 解咒者
 * @param {(n: number) => number} [rng] RAND:N 注入点
 * @returns {Promise<number>} RESULT：0 不装备 / 1 装备
 */
async function remove_curse(w, cid, rng = default_rand) {
  // :95 W:8（道具号）→ W:0（识别号）
  get_equip_num(w);

  // :97-98 入手阶层応じた強度：W:0 += CFLAG:A:501 * 1000
  w.存储编号 += (era.get(`cflag:${cid}:501`) || 0) * 1000;

  // :100-103 无效装备 → RETURN 0
  if (!equip_database(w)) {
    return 0;
  }

  // :105-107 呪われてないならリターン
  if (w.诅咒 === 0) {
    return 0;
  }

  const name = era.get(`callname:${cid}:-1`) ?? ''; // %SAVESTR:A%
  // :109-112 神官（202）/忍者（207）以外高概率失败：RAND:3 == 0 → 呪い品装着
  if (
    (era.get(`talent:${cid}:202`) || 0) === 0 &&
    (era.get(`talent:${cid}:207`) || 0) === 0 &&
    rng(3) === 0
  ) {
    era.print(`${name}解咒失败了！`); // PRINTFORMW
    await era.waitAnyKey();
    return 1;
  }
  // :113-115 ELSEIF RAND:8 == 0 → 失败
  if (rng(8) === 0) {
    era.print(`${name}解咒失败了！`); // PRINTFORMW
    await era.waitAnyKey();
    return 1;
  }

  era.print(`${name}解咒成功。`); // :118 PRINTFORMW
  await era.waitAnyKey();

  // :120-147 解咒产物按 D = RAND:100 的阶梯换新识别号
  const d = rng(100);
  w.识别号 = pick_ring(UNCURSED_RING_TABLE, d, 0);

  // :149-151 解咒品强度 +1（上限 10）
  if (w.强度 < 10) {
    w.强度 += 1;
  }

  // :153-154 重新编码并查表（附魔清零——新编号不含前缀段）
  w.存储编号 = w.识别号 + w.强度 * 1000;
  equip_database(w);
  return 1;
}

/**
 * @CURSE_EQUIP_RING（:157-203）：把装饰戒指（ITEM:300）逐个制成诅咒戒指，
 * 最多 10 个。产物经 @EQUIP_GET 入包（道具号 300+识别号）。
 *
 * @param {(n: number) => number} [rng] RAND:N 注入点
 * @returns {Promise<number>} RESULT：0 = 库存耗尽（一个都没做），1 = 执行过
 */
async function curse_equip_ring(rng = default_rand) {
  // :163 REPEAT 10
  for (let count = 0; count < 10; count += 1) {
    // :164-165 SIF ITEM:300 <= 0 → RETURN 0
    if (game.stronghold.装饰戒指 <= 0) {
      return 0;
    }

    // :167 ITEM:300 -= 1
    game.stronghold.装饰戒指 -= 1;

    // :169-194 新识别号按 D = RAND:100 阶梯；初期强度 0、无前缀
    const d = rng(100);
    const w = { 存储编号: pick_ring(CURSED_RING_TABLE, d, 13), 强度: 0 };

    // :196-198 你把装饰戒指制造成<戒指名>了（一次 print 共一行——引擎每次
    // print 调用即结束一行，ERB 的连续 PRINT 须合并成片段数组）
    era.print(['你把装饰戒指制造成', ...equip_ring_spans(w), '了']);

    // :200 CALL EQUIP_GET
    equip_get(w);
  }

  await era.waitAnyKey(); // :202 WAIT
  return 1;
}

module.exports = { remove_curse, curse_equip_ring };
