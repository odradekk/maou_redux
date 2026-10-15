/**
 * @file 数值一行式的唯一实现：随机整数，以及乘算、除算、百分数换算的取整。
 *
 * 这些函数原先在几十个文件里各留一份局部定义，同一语义按不同写法散落，
 * 修订取整方式要同步几十处、漏一处即静默分叉。集中到本模块后，函数名就是
 * 取整语义：
 *
 *   - `times` / `idiv` / `percent_floor` 向下取整（Math.floor）；
 *   - `times_trunc` / `idiv_trunc` / `percent_trunc` 向零截断（Math.trunc），
 *     与前一组只在操作数为负时差 1，几处费用与评分计算依赖向零截断的写法，
 *     故各留一份，不并入 floor 版；
 *   - `percent_*` 先乘百分数再除 100，**不能**改写成
 *     `times(value, percent / 100)`：百分数先折成小数会丢精度，90 × 1.4 的
 *     双精度积是 125.99999999999999，向下取整得 125，而 90 × 140 / 100 是
 *     126；
 *   - `times_exact` 走十进制定点乘法，供倍率必须是十进制精确值的整数倍放大
 *     使用：175 × 1.4 的双精度积是 244.99999999999997，向下取整得 244，
 *     定点乘法得 245。
 *
 * `default_rand` 是随机源的共享实现。调用方仍照 `rand_n = default_rand` 的形参
 * 注入自己的随机源，测试据此取确定性序列——注入口与收敛前一致。形参缺省里的
 * 内联写法（`rand ?? ((n) => Math.floor(Math.random() * n))`）与本模块无关，
 * 不在本次收敛范围。
 */

/**
 * 随机整数。
 * @param {number} n 上界（不含）
 * @returns {number} 0 以上、n 以下的整数
 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * 乘算后向下取整。
 * @param {number} value 被乘数
 * @param {number} multiplier 倍率
 * @returns {number}
 */
function times(value, multiplier) {
  return Math.floor(value * multiplier);
}

/**
 * 乘算后向零截断（负操作数上比 times 大 1）。
 * @param {number} value 被乘数
 * @param {number} multiplier 倍率
 * @returns {number}
 */
function times_trunc(value, multiplier) {
  return Math.trunc(value * multiplier);
}

/**
 * 十进制精确乘算后向零截断（避开双精度积偏小）。
 * @param {number} value 被乘数，须为整数
 * @param {number|string} rate 倍率，整数或有限小数
 * @returns {number}
 */
function times_exact(value, rate) {
  const text = String(rate);
  const negative = text.startsWith('-');
  const unsigned = /^[+-]/.test(text) ? text.slice(1) : text;
  const [whole, fraction = ''] = unsigned.split('.');
  const numerator = BigInt(`${whole}${fraction}`) * (negative ? -1n : 1n);
  const denominator = 10n ** BigInt(fraction.length);
  return Number((BigInt(value) * numerator) / denominator);
}

/**
 * 除算后向下取整。
 * @param {number} value 被除数
 * @param {number} divisor 除数
 * @returns {number}
 */
function idiv(value, divisor) {
  return Math.floor(value / divisor);
}

/**
 * 除算后向零截断（负操作数上比 idiv 大 1）。
 * @param {number} value 被除数
 * @param {number} divisor 除数
 * @returns {number}
 */
function idiv_trunc(value, divisor) {
  return Math.trunc(value / divisor);
}

/**
 * 百分数换算后向下取整。
 * @param {number} value 基数
 * @param {number} percent 百分数（140 即 140%）
 * @returns {number}
 */
function percent_floor(value, percent) {
  return Math.floor((value * percent) / 100);
}

/**
 * 百分数换算后向零截断（负基数上比 percent_floor 大 1）。
 * @param {number} value 基数
 * @param {number} percent 百分数（140 即 140%）
 * @returns {number}
 */
function percent_trunc(value, percent) {
  return Math.trunc((value * percent) / 100);
}

module.exports = {
  default_rand,
  idiv,
  idiv_trunc,
  percent_floor,
  percent_trunc,
  times,
  times_exact,
  times_trunc,
};
