/**
 * ere/system/train/train-name.js 的行为测试（issue #212：train_name_init；
 * #836 起播种表由指令常量派生）。覆盖：
 *   1. 播种表逐条转录：抽核（头/中/尾/全角拉丁/中点）与条数；
 *   2. 播种表的两个缺号（150 动态槽、67 无名字）——由常量派生，不手抄；
 *   3. 初始化检查的幂等（槽 0 已有名字即返回）；
 *   4. 150 号槽的 CSTR:7 + 調教 内插（播种时求值）；
 *   5. read_train_name 的空串缺省处理（#13）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

function load_module(fixture) {
  const mod = fixture.load_module('system/train/train-name');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  return { mod, era_flag };
}

test('播种表逐条转录：抽核（头/中/尾/全角拉丁/中点）与条数', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;
  // 抽核（含全角拉丁与中点维持原字——显示口径的转小写在 train_command_name）
  assert.equal(table[0], '爱抚');
  assert.equal(table[4], '口交(主)');
  assert.equal(table[46], '灌肠+肛塞');
  assert.equal(table[54], '野外PLAY');
  assert.equal(table[64], '３Ｐ');
  assert.equal(table[84], '刺激Ｇ点');
  assert.equal(table[128], '正常位・接吻');
  assert.equal(table[130], '正常位ＳＰ');
  assert.equal(table[135], '自助舔舐');
  assert.equal(table[208], '触手');
  // 条数：可直选 101 − 150（动态槽）= 100，高级 COM 20 − 67（无名字）= 19
  assert.equal(Object.keys(table).length, 119);
});

test('播种表的缺号由常量派生：150 动态槽与 67 无名字都不播种', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;

  // 150 的静态名在指令常量里（「自由局部调教」），别名另算（train_name_init）
  const { TRAIN_COMMAND } = fixture.load_module('data/train-command-const');
  assert.equal(TRAIN_COMMAND[150], '自由局部调教');
  assert.equal(table[150], undefined, '150 是动态槽，不进播种表');

  // 67 有实现可分发，但没有玩家可见名
  assert.equal(table[67], undefined, '67 无名字，不得播种空串');
});

test('train_name_init：检查放行 → 120 槽全播种；再次调用幂等（零写入）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);

  mod.train_name_init();

  const writes = fixture.var_writes.filter((w) =>
    w.name.startsWith('trainalias:'),
  );
  // 119 静态槽 + 150 动态槽
  assert.equal(writes.length, 120);
  assert.equal(fixture.store.get('trainalias:0'), '爱抚');
  assert.equal(fixture.store.get('trainalias:12'), '振动杖');
  // 别名槽存的是名称原样（不是静态名的转小写显示口径）
  assert.equal(fixture.store.get('trainalias:54'), '野外PLAY');
  // TRAIN_NAME:150 = CSTR:7 值 + 調教（CSTR:31:7 未播种 → 空串 + 调教）
  assert.equal(fixture.store.get('trainalias:150'), '调教');

  // 幂等（检查：槽 0 非空即返回）
  const before = fixture.var_writes.length;
  mod.train_name_init();
  assert.equal(fixture.var_writes.length, before, '检查命中后不得有任何写入');
});

test('train_name_init：150 号槽按播种时目标的 CSTR:7 内插', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const { mod } = load_module(fixture);
  fixture.store.set('cstr:31:7', '尾巴');

  mod.train_name_init();

  assert.equal(fixture.store.get('trainalias:150'), '尾巴调教');
});

test('read_train_name：未播种槽返回空串（#13 的 undefined 缺省处理）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  assert.equal(mod.read_train_name(12), '');
  mod.train_name_init();
  assert.equal(mod.read_train_name(12), '振动杖');
  assert.equal(mod.read_train_name(39), '');
});
