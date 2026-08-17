/**
 * @file 角色称呼/姓名的读取助手。
 *
 * 源: 无对应源——SAVESTR:x / NAME:x 在 ere 侧的读数源是 callname 表
 *     （#5 决议；CONTEXT.md「称呼」行：引擎读 callname:c:u 的回落就是
 *     -2），本模块把寻址与空值兜底收在一处。先例散见 page-main-menu/
 *     page-train/page-select-target/event-comend（各文件自查 -1/-2 键），
 *     #44 收敛（code-review 判断题处置：三处重复）。
 *
 * 读未声明键返回 undefined（#13），消费者要空串——一律 ?? '' 兜底。
 */

const era = require('#/era-electron');

/**
 * 角色的称呼（SAVESTR:x 的等价物）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function chara_callname(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * 角色的姓名（NAME:x / %CALLNAME:MASTER% 一类显示名的等价物）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function chara_name(cid) {
  return era.get(`callname:${cid}:-2`) ?? '';
}

module.exports = { chara_callname, chara_name };
