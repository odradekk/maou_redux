/**
 * @file ere/system/train/train-name.js 的行为测试（issue #212 建表；#836 起
 * 名字表由指令常量派生；#835 起名字在读取时现算，不再进存档）。覆盖：
 *   1. 名字表逐条转录：抽核（头/中/尾/全角拉丁/中点）与条数；
 *   2. 名字表的两个缺号（150 动态槽、67 无名字）——由常量派生，不手抄；
 *   3. read_train_name 的静态名取值、150 号槽的 CSTR:7 内插、空串缺省
 *      （#13 的 undefined 缺省处理）。
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

test('名字表逐条转录：抽核（头/中/尾/全角拉丁/中点）与条数', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;
  // 抽核（含全角拉丁与中点维持原字——显示口径的转小写在 train_command_name）
  assert.equal(table[0], '爱抚');
  assert.equal(table[4], '口交(主)');
  assert.equal(table[46], '灌肠+肛塞');
  assert.equal(
    table[54],
    '野外ＰＬＡＹ',
    '全角拉丁维持原字（显示口径的转小写在 train_command_name）',
  );
  assert.equal(table[64], '３Ｐ');
  assert.equal(table[84], '刺激Ｇ点');
  assert.equal(table[128], '正常位・接吻');
  assert.equal(table[130], '正常位ＳＰ');
  assert.equal(table[135], '自助舔舐');
  assert.equal(table[208], '触手');
  // 条数：可直选 101 − 150（动态槽）= 100，高级 COM 20 − 67（无名字）= 19
  assert.equal(Object.keys(table).length, 119);
});

test('名字表的缺号由常量派生：150 动态槽与 67 无名字都不收录', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;

  // 150 的静态名在指令常量里（「自由局部调教」），别名由 read_train_name 现算
  const { TRAIN_COMMAND } = fixture.load_module('data/train-command-const');
  assert.equal(TRAIN_COMMAND[150], '自由局部调教');
  assert.equal(table[150], undefined, '150 是动态槽，不进播种表');

  // 67 有实现可分发，但没有玩家可见名
  assert.equal(table[67], undefined, '67 无名字，不得播种空串');
});

test('read_train_name：静态名按指令号取值（全角与中点原样）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);

  assert.equal(mod.read_train_name(0), '爱抚');
  assert.equal(mod.read_train_name(12), '振动杖');
  assert.equal(mod.read_train_name(54), '野外ＰＬＡＹ');
  assert.equal(mod.read_train_name(208), '触手');
});

test('read_train_name：150 号槽按目标的 CSTR:7 现算', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const { mod } = load_module(fixture);

  // 癖好名未播种（当前全库无写点）→ 只有「调教」
  assert.equal(mod.read_train_name(150), '调教');
  // 有值时内插成「<癖好名>调教」
  fixture.store.set('cstr:31:7', '尾巴');
  assert.equal(mod.read_train_name(150), '尾巴调教');
});

test('read_train_name：没有名字的指令号返回空串（#13 的 undefined 缺省处理）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);

  // 67 在高级 COM 表里但名字是空串；39/998 不在任何一张表里
  assert.equal(mod.read_train_name(67), '');
  assert.equal(mod.read_train_name(39), '');
  assert.equal(mod.read_train_name(998), '');
});
