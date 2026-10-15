/**
 * 共享工具模块的守护（#792）。
 *
 * MASTER 原先在十几个文件里各写一份 const MASTER = 0，取值本身没有守护；
 * 收敛到 ere/utils/master.js 之后由这里钉住。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { MASTER } = require('../ere/utils/master');

test('MASTER 是魔王的角色 ID 0', () => {
  assert.equal(MASTER, 0);
});
