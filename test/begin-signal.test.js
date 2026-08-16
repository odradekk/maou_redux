/**
 * @file ere/system/flow/begin-signal.js 的行为测试（issue #20）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试缝，issue #16）。本模块
 * 不碰 era API，夹具只用来按引擎的加载路径取模块。
 *
 * 验收对应：「转场信号由专门的信号类型承载，不与普通错误混淆」。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

test('begin()：抛出 BeginSignal，携带目标状态', () => {
  const fixture = create_era_fixture();
  const { begin, BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );

  assert.throws(
    () => begin(STATE.SHOP),
    (e) =>
      e instanceof BeginSignal &&
      e.state === STATE.SHOP &&
      e.name === 'BeginSignal' &&
      e.message === 'BEGIN SHOP',
  );
});

test('转场信号由专门类型承载，不与普通错误混淆', () => {
  const fixture = create_era_fixture();
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  // 信号是 Error 子类（要走异常通道），但普通错误绝不是信号——instanceof
  // 是硬约束里唯一的判据，两边必须分得开，否则「catch 首行重抛」无法既
  // 放行转场又不吞真错误。
  assert.ok(new BeginSignal('SHOP') instanceof Error);
  assert.ok(!(new Error('普通错误') instanceof BeginSignal));
  assert.ok(!(new TypeError('类型错误') instanceof BeginSignal));
});

test('STATE 枚举：原作全库 5 种 BEGIN 目标 + ere 侧的 TITLE 入口', () => {
  const fixture = create_era_fixture();
  const { STATE } = fixture.load_module('system/flow/begin-signal');

  // 原作 5 种目标（issue #20 核实，括号为原作出现处数），取值 = 原作关键字
  assert.equal(STATE.FIRST, 'FIRST');
  assert.equal(STATE.SHOP, 'SHOP');
  assert.equal(STATE.TRAIN, 'TRAIN');
  assert.equal(STATE.AFTERTRAIN, 'AFTERTRAIN');
  assert.equal(STATE.TURNEND, 'TURNEND');
  // TITLE 是 ere 侧本地扩展（主循环入口；原作无 BEGIN TITLE）
  assert.equal(STATE.TITLE, 'TITLE');
  // 枚举冻结，防运行期被改
  assert.ok(Object.isFrozen(STATE));
});

test('begin() 拒绝未知目标：笔误在发信号处即报错，不进状态机', () => {
  const fixture = create_era_fixture();
  const { begin } = fixture.load_module('system/flow/begin-signal');

  assert.throws(() => begin('FIRSST'), TypeError);
});
