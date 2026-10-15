/**
 * ere/utils/numeric.js 的行为测试（#792）。
 *
 * 收敛前同一族取整一行式散在几十个文件里各写一份，其中三组只在负数或精度上
 * 不同，容易被当成「同款」而合并掉，这里逐一用可区分的输入钉住：
 *
 *   - 向下取整（times / idiv / percent_floor）与向零截断（times_trunc /
 *     idiv_trunc / percent_trunc）在负操作数上差 1；
 *   - percent_* 不能改写成 times(value, percent / 100)：百分数折成小数会丢
 *     精度（90 × 1.4 的双精度积是 125.99999999999999，向下取整得 125，而
 *     90 × 140 / 100 是 126）；
 *   - times_exact 走十进制定点乘法，双精度积偏小时仍取精确值（175 × 1.4 的
 *     双精度积是 244.99999999999997，向下取整得 244，定点乘法得 245）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  default_rand,
  idiv,
  idiv_trunc,
  percent_floor,
  percent_trunc,
  times,
  times_exact,
  times_trunc,
} = require('../ere/utils/numeric');

test('default_rand：取值是 floor(random * n)，0 以上 n 以下', () => {
  const real_random = Math.random;
  try {
    Math.random = () => 0.5;
    assert.equal(default_rand(1), 0);
    assert.equal(default_rand(7), 3);
    assert.equal(default_rand(10), 5);
    Math.random = () => 0;
    assert.equal(default_rand(7), 0);
  } finally {
    Math.random = real_random;
  }
});

test('default_rand：真实随机源下每个值都是 [0, n) 内的整数', () => {
  for (let i = 0; i < 500; i += 1) {
    const value = default_rand(6);
    assert.ok(
      Number.isInteger(value) && value >= 0 && value < 6,
      `default_rand(6) 越界：${value}`,
    );
  }
});

test('times：乘算后向下取整（负操作数比向零截断小一）', () => {
  assert.equal(times(10, 2), 20);
  assert.equal(times(7, 1.5), 10);
  assert.equal(times(4, 0.25), 1);
  assert.equal(times(90, 1.4), 125);
  assert.equal(times(-7, 1.5), -11);
});

test('times_trunc：乘算后向零截断，只与 times 差在负操作数', () => {
  assert.equal(times_trunc(10, 2), 20);
  assert.equal(times_trunc(7, 1.5), 10);
  assert.equal(times_trunc(-7, 1.5), -10);
});

test('times_exact：十进制定点乘法，双精度积偏小时仍取精确值', () => {
  assert.equal(times_exact(175, 1.4), 245);
  assert.equal(times_exact(90, 1.4), 126);
  assert.equal(times_exact(100, '1.25'), 125);
  assert.equal(times_exact(1000, 0.001), 1);
  assert.equal(times_exact(-175, 1.4), -245);
});

test('idiv：除算后向下取整（负操作数比向零截断小一）', () => {
  assert.equal(idiv(7, 2), 3);
  assert.equal(idiv(-7, 2), -4);
});

test('idiv_trunc：除算后向零截断，只与 idiv 差在负操作数', () => {
  assert.equal(idiv_trunc(7, 2), 3);
  assert.equal(idiv_trunc(-7, 2), -3);
});

test('percent_floor / percent_trunc：百分数换算，负值上两式差一', () => {
  assert.equal(percent_floor(90, 140), 126);
  assert.equal(percent_floor(70, 140), 98);
  assert.equal(percent_trunc(90, 140), 126);
  assert.equal(percent_floor(-101, 5), -6);
  assert.equal(percent_trunc(-101, 5), -5);
});

test('percent_* 不等于 times(value, percent / 100)：折成小数会丢精度', () => {
  assert.equal(times(90, 1.4), 125);
  assert.equal(percent_floor(90, 140), 126);
  assert.equal(times(45, 1.4), 62);
  assert.equal(percent_floor(45, 140), 63);
});
