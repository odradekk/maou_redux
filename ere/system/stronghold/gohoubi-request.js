/**
 * @file 奖赏请求：@GOHOUBI_REQUEST（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_2.ERB  @GOHOUBI_REQUEST（:661-691）。
 *
 * 调用点（本票接入）：page/page-intercept.js 的 @INTERCEPT 出击决定
 * （:508 `CALL GOHOUBI_REQUEST, SELECT`）。
 *
 * == 跨边：口上侧 @GOHOUBI_REQUEST_KOUJO（EVENT_K.ERB:450-466）的调用面 ==
 *
 * 原作 :687 的 `CALL GOHOUBI_REQUEST_KOUJO` 与 EVENT_K.ERB:450 的定义是一
 * 对，**而 EVENT_K.ERB 是 #403（N19）的靶、本轮没派**。本票把调用面的形状
 * 定死在这里，写进 `ere/kojo/kojo-dungeon-after.js` 的
 * `gohoubi_request_koujo(cid)`（口上侧保留存根，签名与参数形状由本票冻结，
 * #403 接上时只换函数体、不该再改签名）：
 *
 *   - **形参只有一个 `cid`**（派遣对象＝原作调用前的全局 A）。原作的
 *     @GOHOUBI_REQUEST_KOUJO 是零参函数，靠 `SWAP LOCAL:2, TARGET; TARGET = A`
 *     取派遣对象——ere 侧按 #5 决议的等价改写把角色显式传参
 *     （kojo-dungeon-after.js 的 gohoubi_after_koujo/osioski_koujo 同款）；
 *   - **奖赏内容不入参**：K 侧实现读的是 `CFLAG:cid:504`（奖赏请求的种类，
 *     0-9），本函数写的就是它（:684），所以 #403 的包装函数不需要第二个
 *     形参——`gohoubi_after_koujo(cid, choice)` 之所以多一个 choice，是因为
 *     原作那条链的 TFLAG:18 在 ere 引擎里没有据点期落点（#179 实测），
 *     与这里不同；
 *   - **返回 0**（调用方不读）。
 *
 * == 本函数的移植说明 ==
 *
 * - `A = SELECT`（:685）与 `A = 0`（:689）是跨函数传参的暂存：@GOHOUBI_REQUEST
 *   借全局 A 把派遣对象递给 @GOHOUBI_REQUEST_KOUJO，K 侧再 `TARGET = A`。ere
 *   侧不再有这条隐式通道（见上），改为显式形参；
 * - `WISH` 的三档判据（:670-681）：TALENT:136（女装/伪娘）→ RAND:3 + 1；
 *   TALENT:85（爱慕）→ RAND:3 + 4（抽到 6 时若魔王既非男非扶她则降为 4）；
 *   TALENT:76（淫乱）→ RAND:3 + 7；否则 0。`RAND:3` 由形参 rand 注入
 *   （缺省均匀随机，juel-check 的既有做法），测试给确定性序。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { gohoubi_request_koujo } = require('#/kojo/kojo-dungeon-after');

/** 默认随机源（[0, n) 整数）；测试注入定值序 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** TALENT 读数兜底（#13） */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * @GOHOUBI_REQUEST（:661-691）：派遣前的奖赏请求。
 *
 * 结果写进 `CFLAG:cid:504`（奖赏请求的种类），随后交口上侧
 * `gohoubi_request_koujo(cid)`（本票冻结的调用面，见文件头）。
 *
 * @param {number} arg0 派遣对象（原作 ARG:0，@INTERCEPT 传 SELECT）
 * @param {(n: number) => number} [rand] 随机源（[0, n) 整数；缺省均匀随机）
 * @returns {Promise<number>} 0（调用方不读）
 */
async function gohoubi_request(arg0, rand = default_rand) {
  const select = arg0; // :668 SELECT = ARG:0
  let wish; // :663 #DIM WISH

  // :670-681 三档判据 + 兜底
  if (talent(select, 136) === 1 && rand(3) === 0) {
    wish = rand(3) + 1; // :670-671 女装
  } else if (talent(select, 85) === 1) {
    wish = rand(3) + 4; // :672-673 爱慕
    if (wish === 6 && talent(0, 121) === 0 && talent(0, 122) === 0) {
      wish = 4; // :674-676 魔王既非扶她也非男 → 降为 4
    }
  } else if (talent(select, 76) === 1) {
    wish = rand(3) + 7; // :677-678 淫乱
  } else {
    wish = 0; // :679-680
  }

  chara(select).stronghold.要求奖赏 = wish; // :684 CFLAG:SELECT:504 = WISH（跨域写走属主门面）
  await gohoubi_request_koujo(select); // :687 CALL GOHOUBI_REQUEST_KOUJO
  return 0;
}

module.exports = { gohoubi_request };
