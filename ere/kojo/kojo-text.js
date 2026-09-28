/**
 * @file 口上文本的插值助手：%记号% 插值的 JS 等价物。
 *
 * %SELF_CALL% 的求值语义：CSTR:x:60 非空串则取它、否则回落「我」。自称的
 * 随机选定含交互输入分支，未移植——CSTR:60 无人写入，自称恒「我」。
 * 已标注废弃的 ARG:1 形参不建模，%SELF_CALL(TARGET, 1)% 与
 * %SELF_CALL(TARGET)% 同值。
 *
 * 这是全部 22 个口上文件共用的词汇表——本模块只放「跨文件复用」的件，
 * 单文件特有的插值留在各自模块内（决议 #8 的规模化形状）。
 */

const era = require('#/era-electron');

/**
 * %UNICODE(0x2661) *N%：心形字符重复 N 次。
 * @param {number} n 次数（正文只见 1 与 3）
 * @returns {string}
 */
function heart(n) {
  return '♡'.repeat(n);
}

/**
 * %UNICODE(0x2764) *N%：实心心形（排泄等支）。与 heart() 的 ♡ 不同字。
 * @param {number} n 次数
 * @returns {string}
 */
function black_heart(n) {
  return '❤'.repeat(n);
}

/**
 * %UNICODE(0x2665) *N%：黑心（实心黑桃心，K0 慈爱口上专用字——与
 * black_heart 的 U+2764 不同码位，两个记号不混用）。
 * @param {number} n 次数
 * @returns {string}
 */
function heart_black(n) {
  return '♥'.repeat(n);
}

/**
 * %SELF_CALL(x)%：角色的自称（CSTR:60 非空取值，否则「我」）。
 * @param {number} cid 角色 ID
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

module.exports = {
  heart,
  heart_black,
  black_heart,
  self_call,
  self_call_first,
};
