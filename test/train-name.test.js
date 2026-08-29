/**
 * ere/system/train/train-name.js 的行为测试（issue #212：@TRAIN_NAME_INIT）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   1. 播种完整性：表逐条转录（对 target/ 原文抽核 + 缺号反核）；
 *   2. 初始化守卫的幂等（:786-787 SIF STRLENSU(TRAIN_NAME) > 0 RETURN）；
 *   3. 150 号槽的 %CSTR:7%調教 内插（播种时求值）；
 *   4. read_train_name 的空串兜底（#13）。
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

test('播种表逐条转录：对 target 原文抽核（头/中/尾/全角拉丁/中点）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;
  // TRAIN_MAIN.ERB:788-908 抽核（含全角拉丁与中点维持原字）
  assert.equal(table[0], '爱抚');
  assert.equal(table[4], '口交(主)');
  assert.equal(table[46], '灌肠+肛塞');
  assert.equal(table[64], '３Ｐ');
  assert.equal(table[84], '刺激Ｇ点');
  assert.equal(table[128], '正常位・接吻');
  assert.equal(table[130], '正常位ＳＰ');
  assert.equal(table[135], '自助舔舐');
  assert.equal(table[208], '触手');
  // 静态条目数（150 动态槽不在表内）：0-38(39) + 40-49(10) + 50-59(10)
  // + 60-66(7) + 68-73(6) + 80-90(11) + 100-111(12) + 120-135(16)
  // + 200-208(9) = 120
  assert.equal(Object.keys(table).length, 120);
});

test('播种表缺号反核：原作未赋值的编号不得播种（39/67/74-79/91-99/…）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;
  for (const id of [
    39, 67, 74, 79, 91, 99, 112, 119, 136, 144, 145, 149, 151, 199, 209,
  ]) {
    assert.equal(table[id], undefined, `${id} 号原作未赋值，不得播种`);
  }
});

test('TRAIN_NAME_INIT：守卫空过 → 110 槽全播种；再次调用幂等（零写入）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);

  mod.train_name_init();

  const writes = fixture.var_writes.filter((w) =>
    w.name.startsWith('trainalias:'),
  );
  // 120 静态槽 + 150 动态槽
  assert.equal(writes.length, 121);
  assert.equal(fixture.store.get('trainalias:0'), '爱抚');
  assert.equal(fixture.store.get('trainalias:12'), '振动杖');
  // :899 TRAIN_NAME:150 = %CSTR:7%調教（CSTR:31:7 未播种 → 空串 + 调教）
  assert.equal(fixture.store.get('trainalias:150'), '调教');

  // 幂等（:786-787 守卫：槽 0 非空即返回）
  const before = fixture.var_writes.length;
  mod.train_name_init();
  assert.equal(fixture.var_writes.length, before, '守卫命中后不得有任何写入');
});

test('TRAIN_NAME_INIT：150 号槽按播种时目标的 CSTR:7 内插', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const { mod } = load_module(fixture);
  fixture.store.set('cstr:31:7', '尾巴');

  mod.train_name_init();

  assert.equal(fixture.store.get('trainalias:150'), '尾巴调教');
});

test('read_train_name：未播种槽返回空串（#13 的 undefined 兜底）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  assert.equal(mod.read_train_name(12), '');
  mod.train_name_init();
  assert.equal(mod.read_train_name(12), '振动杖');
  assert.equal(mod.read_train_name(39), '');
});
