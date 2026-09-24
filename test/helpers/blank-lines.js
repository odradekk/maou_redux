'use strict';
/**
 * @file 空行的相邻性断言（issue #597 输出普查）：ere 的 print 系每次调用自成一行，
 * `era.println()` / `era.print('')` 是**额外的一个空行**（CONTEXT.md「输出 API 与
 * 原作的对应」）。哪些空行是真空行、哪些是多补，逐处判定见工单 #597 的普查表；
 * 本模块只提供判定「空行在不在、是不是恰好一个、位置对不对」的公共断言，
 * 免去同一套判断在各测试文件里各抄一遍。
 *
 * 夹具的 `era.println()` 落成 `{type:'br'}` 条目，`era.print('')` 落成空文本条目，
 * 两者在显示上都是空行，故判定一律按「br 或 text === ''」。
 */

const assert = require('node:assert/strict');

/**
 * 该条目是不是空行
 * @param {{type: string, text?: string}} line 条目
 * @returns {boolean}
 */
function is_blank(line) {
  return line.type === 'br' || (line.type === 'text' && line.text === '');
}

/**
 * 找到含 `needle` 的文本 / 按钮条目下标（按钮的 `text` 是正文，`rendered` 才带
 * 引擎拼的 `[快捷键] `，断言位置用正文即可）。
 * @param {{lines: object[]}} fixture 夹具
 * @param {string} needle 锚文本
 * @param {string} label 断言前缀
 * @returns {number} 下标
 */
function index_of(fixture, needle, label) {
  const index = fixture.lines.findIndex(
    (line) =>
      (line.type === 'text' || line.type === 'button') &&
      line.text.includes(needle),
  );
  assert.ok(index >= 0, `${label}：演出里出现「${needle}」（否则断言会空过）`);
  return index;
}

/**
 * 断言「`needle` 那一行之后紧跟**恰好一个**空行」——真空行的正面守卫：
 * 删掉那个空行会红（缺少空行），再多补一个也会红（空行不止一个）。
 * @param {{lines: object[]}} fixture 夹具
 * @param {string} needle 锚文本
 * @param {string} label 断言前缀
 */
function assert_one_blank_after(fixture, needle, label) {
  const index = index_of(fixture, needle, label);
  const next = fixture.lines[index + 1];
  assert.ok(
    next !== undefined && is_blank(next),
    `${label}：这一行之后是真空行（不许删）`,
  );
  assert.equal(
    next.row,
    fixture.lines[index].row + 1,
    `${label}：空行紧邻锚行（按行序）`,
  );
  const after = fixture.lines[index + 2];
  assert.ok(
    after === undefined || !is_blank(after),
    `${label}：空行恰好一个（不许再多补）`,
  );
}

/**
 * 断言「`needle` 那一行之前紧跟**恰好一个**空行」（锚在空行**后面**那一行上，
 * 用于空行之后才是确定文本、之前是可变演出的位置）。
 * @param {{lines: object[]}} fixture 夹具
 * @param {string} needle 锚文本
 * @param {string} label 断言前缀
 */
function assert_one_blank_before(fixture, needle, label) {
  const index = index_of(fixture, needle, label);
  const prev = fixture.lines[index - 1];
  assert.ok(
    index >= 1 && prev !== undefined && is_blank(prev),
    `${label}：这一行之前是真空行（不许删）`,
  );
  assert.equal(
    fixture.lines[index].row,
    prev.row + 1,
    `${label}：空行紧邻锚行（按行序）`,
  );
  const before = fixture.lines[index - 2];
  assert.ok(
    before === undefined || !is_blank(before),
    `${label}：空行恰好一个（不许再多补）`,
  );
}

/**
 * 断言「演出以**恰好一个**空行收尾」（空行之后没有更多输出，锚不了后一行）。
 * @param {{lines: object[]}} fixture 夹具
 * @param {string} label 断言前缀
 */
function assert_trailing_blank(fixture, label) {
  const end = fixture.lines.length;
  assert.ok(end >= 2, `${label}：整段演出有输出（否则断言会空过）`);
  const last = fixture.lines[end - 1];
  const before_last = fixture.lines[end - 2];
  assert.ok(is_blank(last), `${label}：末尾是真空行（不许删）`);
  assert.equal(
    last.row,
    before_last.row + 1,
    `${label}：空行紧邻上一条（按行序）`,
  );
  assert.ok(!is_blank(before_last), `${label}：空行恰好一个（不许再多补）`);
}

/**
 * 断言「`needle` 那一行之后**不紧跟**空行」（多补的反方向守卫；该行是最后一行
 * 也算通过）。
 * @param {{lines: object[]}} fixture 夹具
 * @param {string} needle 锚文本
 * @param {string} label 断言前缀
 */
function assert_no_blank_after(fixture, needle, label) {
  const index = index_of(fixture, needle, label);
  const next = fixture.lines[index + 1];
  assert.ok(
    next === undefined || !is_blank(next),
    `${label}：这一行之后不补空行`,
  );
}

module.exports = {
  is_blank,
  assert_one_blank_after,
  assert_one_blank_before,
  assert_trailing_blank,
  assert_no_blank_after,
};
