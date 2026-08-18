/**
 * @file 口上文本的插值助手：原作 PRINTFORM 系插值记号的 JS 等价物。
 *
 * 源: target/ERB/口上/*.ERB 的 %…% 插值词汇表（#8 实测前 8 种覆盖全部
 *     插值的 99.9%）。角色名（%SAVESTR:x% / %NAME:x%）经 utils/callname-utils
 *     承载，此处收口上重复出现的另外三件：
 *     %UNICODE(0x2661) *N%（心形，全库 10,656 次，纯字面量）
 *     %SELF_CALL(x)%（自称，キャラ関数/SELF_CALL.ERB @SELF_CALL :400-408）
 *     %SELF_CALL_FIRST(x)%（自称首字，同文件 @SELF_CALL_FIRST :412-419）
 *
 * %SELF_CALL% 的求值语义（SELF_CALL.ERB:406）：CSTR:x:60 非空串则取它、
 * 否则回落「我」。CSTR:60 的写入者是 @RANDOM_SELF_CALL（一人称随机选定，
 * 含交互输入分支）——未移植，未选定时自称恒「我」，与原作开局行为一致。
 * ARG:1 形参在原作已标注废弃（:402），%SELF_CALL(TARGET, 1)% 与
 * %SELF_CALL(TARGET)% 同值。
 *
 * 这是全部 22 个口上文件共用的词汇表——本模块只放「跨文件复用」的件，
 * 单文件特有的插值留在各自模块内（决议 #8 的规模化形状）。
 */

const era = require('#/era-electron');

/**
 * %UNICODE(0x2661) *N%：心形字符重复 N 次。
 * @param {number} n 次数（原作只见 1 与 3）
 * @returns {string}
 */
function heart(n) {
  return '♡'.repeat(n);
}

/**
 * %SELF_CALL(x)%：角色的自称（CSTR:60 非空取值，否则「我」）。
 * @param {number} cid 角色 ID（原作形参是 TARGET 或显式角色号）
 * @returns {string}
 */
function self_call(cid) {
  return era.get(`cstr:${cid}:60`) || '我';
}

/**
 * %SELF_CALL_FIRST(x)%：自称的首字（SUBSTRINGU(LOCALS,0,1)，Unicode 感知）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function self_call_first(cid) {
  return Array.from(self_call(cid))[0];
}

module.exports = { heart, self_call, self_call_first };
