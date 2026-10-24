/**
 * ere/system/train/train-name.js 的行为测试（issue #212：train_name_init）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   1. 播种完整性：表逐条转录（抽核 + 缺号反核）；与静态名表的跨表一致
 *      性（#787——同一个编号在两张表里必须是同一个名字，否则内建菜单与
 *      自定义菜单会对同一指令显示不同名）；
 *   2. 初始化检查的幂等（槽 0 已有名字即返回）；
 *   3. 150 号槽的 CSTR:7 + 調教 内插（播种时求值）；
 *   4. read_train_name 的空串缺省处理（#13）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');
const { parse_yml_ids } = require('./helpers/static-names');

/**
 * 允许两张表取值不同的编号（例外表）。150 是动态槽：别名是播种时按目标
 * 癖好名求值的 `<癖好名>调教`，静态名是「自由局部调教」——两者不同是原版
 * 语义（`page-usercom.js` 的两条渲染路径各自取表），不是转录错误。
 */
const CROSS_TABLE_EXCEPTIONS = new Set([150]);

function load_module(fixture) {
  const mod = fixture.load_module('system/train/train-name');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  return { mod, era_flag };
}

test('播种表逐条转录：抽核（头/中/尾/全角拉丁/中点）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;
  // 抽核（含全角拉丁与中点维持原字）
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

test('跨表一致性：播种表与静态名表在共同编号上同名（#787）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const static_names = parse_yml_ids('TrainCommand.yml');
  const seeded = mod.TRAIN_NAME_TABLE;

  const common = Object.keys(seeded)
    .map(Number)
    .filter((id) => static_names.has(id));
  // 101 个静态编号里，150 只有别名（动态槽）——共同编号 100 个
  assert.ok(
    common.length >= 100,
    `共同编号 ${common.length} 个，跨表比对必须有实量`,
  );

  const mismatched = common
    .filter((id) => !CROSS_TABLE_EXCEPTIONS.has(id))
    .filter((id) => static_names.get(id) !== seeded[id])
    .map(
      (id) =>
        `${id}: 静态名「${static_names.get(id)}」≠ 播种名「${seeded[id]}」`,
    );
  assert.deepEqual(
    mismatched,
    [],
    '同一个编号在静态名表与别名播种表里必须是同一个名字——默认态按钮读别名、' +
      '内建菜单与「上次的调教指令」行读静态名，不一致就对同一指令显示两个名字',
  );

  // 例外表不得失效：登记过的编号必须仍是「静态名表有它、别名由播种产生」
  // 的形状，否则差异回潮会被静默跳过。150 是动态槽，不在 TRAIN_NAME_TABLE
  // 里，只在 train_name_init 运行时写入。
  for (const id of CROSS_TABLE_EXCEPTIONS) {
    assert.ok(static_names.has(id), `例外 ${id} 已不在静态名表——从例外表移除`);
  }
  mod.train_name_init();
  for (const id of CROSS_TABLE_EXCEPTIONS) {
    assert.ok(
      (fixture.store.get(`trainalias:${id}`) ?? '').length > 0,
      `例外 ${id} 已不被播种——从例外表移除`,
    );
  }
});

test('播种表缺号反核：未赋值的编号不得播种（39/67/74-79/91-99/…）', () => {
  const fixture = create_era_fixture();
  const { mod } = load_module(fixture);
  const table = mod.TRAIN_NAME_TABLE;
  for (const id of [
    39, 67, 74, 79, 91, 99, 112, 119, 136, 144, 145, 149, 151, 199, 209,
  ]) {
    assert.equal(table[id], undefined, `${id} 号未赋值，不得播种`);
  }
});

test('train_name_init：检查放行 → 110 槽全播种；再次调用幂等（零写入）', () => {
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

test('旧档的半角指令名改写成全角，玩家自定义的别名不动（#822）', () => {
  // 旧档：槽 0 已播种（检查放行），54/55 是半角旧名
  const migrated = create_era_fixture();
  const { mod: m1 } = load_module(migrated);
  migrated.store.set('trainalias:0', '爱抚');
  migrated.store.set('trainalias:54', '野外PLAY');
  migrated.store.set('trainalias:55', '放置PLAY');
  m1.train_name_init();
  assert.equal(
    migrated.store.get('trainalias:54'),
    '野外ＰＬＡＹ',
    '旧档的 54 号半角别名改写成全角',
  );
  assert.equal(migrated.store.get('trainalias:55'), '放置ＰＬＡＹ');

  // 玩家自己起过的名字不是旧播种值，原样保留（别名表按存档定制的用途）
  const custom = create_era_fixture();
  const { mod: m2 } = load_module(custom);
  custom.store.set('trainalias:0', '爱抚');
  custom.store.set('trainalias:54', '野外PLAYPLAY');
  custom.store.set('trainalias:57', '我的羞耻');
  m2.train_name_init();
  assert.equal(
    custom.store.get('trainalias:54'),
    '野外PLAYPLAY',
    '玩家的自定义别名不动',
  );
  assert.equal(custom.store.get('trainalias:57'), '我的羞耻');
});
