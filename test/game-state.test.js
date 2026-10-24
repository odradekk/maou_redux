/**
 * @file ere/system/flow/game-state.js 的行为测试（issue #20 起；#850 改为返回值）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。本模块
 * 不碰 era API，夹具只用来按引擎的加载路径取模块。
 *
 * 验收对应（#850）：「转场靠返回值表达，不再靠异常」——begin() 返回目标状态
 * 而不是抛出，中间层用 is_state 判定该不该上抛。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

test('begin()：返回目标状态，不抛出——转场走返回值，不再走异常', () => {
  const fixture = create_era_fixture();
  const { begin, STATE } = fixture.load_module('system/flow/game-state');

  // 调用点写 `return begin(STATE.SHOP);`：返回值即下一状态
  assert.equal(begin(STATE.SHOP), STATE.SHOP);
  assert.equal(begin(STATE.TURNEND), STATE.TURNEND);
  // 普通错误与转场彻底分家：begin() 不该抛任何东西（#850 删掉了信号类型）
  assert.doesNotThrow(() => begin(STATE.FIRST));
});

test('begin() 拒绝未知目标：笔误在发出处即报错，不进状态机', () => {
  const fixture = create_era_fixture();
  const { begin } = fixture.load_module('system/flow/game-state');

  assert.throws(() => begin('FIRSST'), TypeError);
  assert.throws(() => begin(undefined), TypeError);
});

test('is_state()：只认 STATE 枚举的取值，普通返回值一律不是转场', () => {
  const fixture = create_era_fixture();
  const { is_state, STATE } = fixture.load_module('system/flow/game-state');

  for (const value of Object.values(STATE)) {
    assert.equal(is_state(value), true, `${value} 是转场目标`);
  }
  // 中间层平时拿到的普通返回值：数字、布尔、undefined、近似字符串都不是转场
  for (const value of [
    0,
    1,
    true,
    undefined,
    null,
    '',
    'shop',
    'SHOPPING',
    'SHOP ',
  ]) {
    assert.equal(is_state(value), false, `${String(value)} 不是转场目标`);
  }
});

test('STATE 枚举：5 种 BEGIN 目标 + ere 侧的本地扩展', () => {
  const fixture = create_era_fixture();
  const { STATE } = fixture.load_module('system/flow/game-state');

  // 5 种目标（issue #20 核实），取值 = 各状态的 BEGIN 关键字
  assert.equal(STATE.FIRST, 'FIRST');
  assert.equal(STATE.SHOP, 'SHOP');
  assert.equal(STATE.TRAIN, 'TRAIN');
  assert.equal(STATE.AFTERTRAIN, 'AFTERTRAIN');
  assert.equal(STATE.TURNEND, 'TURNEND');
  // TITLE 是 ere 侧本地扩展（主循环入口，不对应任何 BEGIN 目标）
  assert.equal(STATE.TITLE, 'TITLE');
  // 枚举冻结，防运行期被改
  assert.ok(Object.isFrozen(STATE));
});
