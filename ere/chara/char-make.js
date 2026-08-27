/**
 * @file 角色生成的转发层（issue #170）：全库 30 余处调用点走本层的名字，
 * 真身在 ere/chara/chara-make.js（源 キャラ関数/CHARA_MAKE.ERB）。
 *
 * 源: target/ERB/キャラ関数/CHAR_MAKE.ERB  @CHAR_MAKE（:2-4）、
 *       @NAMING（:7-9）、@NAME_RESET（:12-14）、@SET_CHAR_CLOTH（:17-19）、
 *       @CHAR_MAKE_INPORT（:27-34）。@CHAR_INIT（:22-25）的 ere 形态是
 *       ere/chara/chara-init.js（#118，其文件头已声明本壳）；@CHAR_INHERIT
 *       与 @RAND_CHARA_MAKE 不在本票范围（#169：随机生成线不在阶段 3）。
 *
 * 转发不折叠（工单验收第 2 条）：调用点的名字稳定在转发层上，真身可随
 * 后续票替换。JUMP 的指针语义（A / TARGET 隐式传递）由 ere 侧显式传参
 * 承接（#5 决议第六条）。
 */

const { chara_make, cm_cloth } = require('#/chara/chara-make');
const { char_init } = require('#/chara/chara-init');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['CHARA_NAME_DEFINE', 'CN_REBUILD', 'CHARA_MAKE_INPORT'];

/**
 * @CHAR_MAKE（:2-4）：角色生成入口——JUMP CHARA_MAKE(A, ARG:0, ARG:1)。
 *
 * ARG:0 是性格设定（如 ENTER_ENEMY 传 998 = 无指定）、ARG:1 是种族设定。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 * @param {number} [arg0] 性格设定（转发不改写，缺省 0）
 * @param {number} [arg1] 种族设定（缺省 0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传）
 * @returns {Promise<number>} @CHARA_MAKE 的 RETURN（角色号）
 */
async function char_make(cid, arg0 = 0, arg1 = 0, rand) {
  // :4 JUMP CHARA_MAKE(A, ARG:0, ARG:1)
  return chara_make(cid, arg0, arg1, rand);
}

/**
 * @NAMING（:7-9）：JUMP CHARA_NAME_DEFINE(A)——角色称呼定义（存根，
 * EVENTFIRST:111 的同款占位；随开局设置票）。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 */
async function naming(cid) {
  // :9 JUMP CHARA_NAME_DEFINE(A)（真身落地前无副作用，占位行携带角色号）
  stub_line('CHARA_NAME_DEFINE', `角色称呼定义（角色 ${cid}）`);
}

/**
 * @NAME_RESET（:12-14）：JUMP CN_REBUILD——名字重建（存根，随角色名票）。
 */
async function name_reset() {
  // :14 JUMP CN_REBUILD
  stub_line('CN_REBUILD', '名字重建');
}

/**
 * @SET_CHAR_CLOTH（:17-19）：JUMP CM_CLOTH——服装设定，转发到本票实现
 * （ere/chara/chara-make.js 的 @CM_CLOTH）。
 *
 * @param {number} cid 角色 ID（原作全局 A / TARGET）
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function set_char_cloth(cid, rand) {
  // :19 JUMP CM_CLOTH
  return cm_cloth(cid, rand);
}

/**
 * @CHAR_MAKE_INPORT（:27-34）：异国勇者判定——RAND(ARG:0) != 0 时
 * RETURN 0（非异国），否则 JUMP CHARA_MAKE_INPORT（存根，随异国勇者票）。
 *
 * @param {number} [arg0] 判定分母（缺省 1 = RAND(1) = 0 恒成功）
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传）
 * @returns {Promise<number>} 0 = 非异国勇者（原作 RETURN 0）
 */
async function char_make_inport(arg0 = 1, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  // :31-32 SIF RAND(ARG:0) != 0 RETURN 0
  if (rand_n(arg0) !== 0) {
    return 0;
  }
  // :34 JUMP CHARA_MAKE_INPORT
  stub_line('CHARA_MAKE_INPORT', '异国勇者生成');
  return 0;
}

module.exports = {
  STUBBED_CALLS,
  char_make,
  naming,
  name_reset,
  set_char_cloth,
  char_make_inport,
  char_init, // @CHAR_INIT（:22-25）：ere 形态即 chara-init.js（#118），转发层 re-export
};
