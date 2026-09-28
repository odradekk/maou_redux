/**
 * @file 角色生成的转发层（issue #170）：全库 30 余处调用点走本层的名字，
 * 真身在 ere/chara/chara-make.js。
 *
 * 转发不折叠（工单验收第 2 条）：调用点的名字稳定在转发层上，真身可随
 * 后续的工单替换。目标角色与实参一律显式传递（#5 决议第六条），不依赖
 * 隐式指针。
 */

const { chara_make, cm_cloth } = require('#/chara/chara-make');
const { chara_make_inport } = require('#/chara/chara-make-inport');
const { char_init } = require('#/chara/chara-init');
const { chara_make_inherit } = require('#/chara/chara-make-inherit');
const { chara_name_define, cn_rebuild } = require('#/chara/chara-name');

/**
 * char_make：角色生成入口。
 *
 * arg0 是性格设定（如 enter_enemy 传 998 = 无指定）、arg1 是种族设定。
 *
 * @param {number} cid 角色 ID
 * @param {number} [arg0] 性格设定（转发不改写，缺省 0）
 * @param {number} [arg1] 种族设定（缺省 0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传）
 * @returns {Promise<number>} 角色号
 */
async function char_make(cid, arg0 = 0, arg1 = 0, rand) {
  return chara_make(cid, arg0, arg1, rand);
}

/**
 * naming：角色称呼定义。
 *
 * @param {number} cid 角色 ID
 * @returns {void}
 */
function naming(cid) {
  // #384 起为真身
  chara_name_define(cid);
}

/**
 * name_reset：把全体角色的存档字串按称呼重建。
 * @returns {void}
 */
function name_reset() {
  // cn_rebuild（#384 起真身）
  cn_rebuild();
}

/**
 * set_char_cloth：服装设定，真身是 ere/chara/chara-make.js 的 cm_cloth。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传）
 * @returns {Promise<number>} 恒 0
 */
async function set_char_cloth(cid, rand) {
  return cm_cloth(cid, rand);
}

/**
 * char_make_inport：异国勇者判定——rand(arg0) != 0 时返回 0（非异国），
 * 否则交给真身 chara_make_inport（#394 起，ere/chara/chara-make-inport.js）。
 *
 * @param {number} [arg0] 判定分母（缺省 1：rand(1) 恒为 0，判定恒通过）
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传，判定式与真身共用）
 * @returns {Promise<number>} 0 = 非异国勇者；> 0 = 新建的异国勇者角色号
 */
async function char_make_inport(arg0 = 1, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (rand_n(arg0) !== 0) {
    return 0;
  }
  return chara_make_inport(rand_n);
}

/**
 * char_inherit：后代素质继承（转发到 chara_make_inherit）。
 * @param {number} child 子代角色 ID
 * @param {number} parent 亲本角色 ID
 * @returns {void}
 */
function char_inherit(child, parent) {
  chara_make_inherit(child, parent);
}

module.exports = {
  char_make,
  naming,
  name_reset,
  set_char_cloth,
  char_make_inport,
  char_inherit,
  char_init, // 真身即 ere/chara/chara-init.js（#118），转发层 re-export
};
