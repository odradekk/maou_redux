/**
 * 黑市末路分派接缝测试（issue #797）。
 *
 * 接缝 = sell-maturo-k0.js 的 k0_route / K0_ROUTES 与四个末路族模块导出的
 * ROUTES、ENDINGS 两张表：k0_route 只按状态、种族、售价给出末路编号，编号经
 * 分派表落到某个末路族，末路族再定买家并把正文交给该末路的函数。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

const ROUTE_MODULES = ['rebel', 'love', 'lewd', 'normal'];

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++ % values.length];
    assert(Number.isInteger(value) && value >= 0 && value < n);
    return value;
  };
}

function seed_world() {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  fixture.load_module('era-utils/era-flag').target = 31;
  fixture.era.beginTrain(0, 31);
  return fixture;
}

const black_market = (fixture) =>
  fixture.load_module('system/stronghold/sell-maturo-k0');
const family = (fixture, name) =>
  fixture.load_module(`system/stronghold/sell-maturo-k0-${name}`);

/** [状态, 种族, 售价, 末路编号]；售价一律取档位两侧的边界值。 */
const ROUTE_TABLE = [
  ['rebel', 9, 100_000, 'rebel_matu_ge100k'],
  ['rebel', 9, 99_999, 'rebel_matu_lt100k'],
  ['rebel', 0, 100_000, 'rebel_other_ge100k'],
  ['rebel', 0, 99_999, 'rebel_other_lt100k'],
  ['love', 9, 1_000_000, 'love_matu_ge1m'],
  ['love', 9, 999_999, 'love_matu_ge500k'],
  ['love', 9, 500_000, 'love_matu_ge500k'],
  ['love', 9, 499_999, 'love_matu_ge100k'],
  ['love', 9, 100_000, 'love_matu_ge100k'],
  ['love', 9, 99_999, 'love_matu_lt100k'],
  ['love', 0, 1_000_000, 'love_other_ge1m'],
  ['love', 0, 999_999, 'love_other_ge500k'],
  ['love', 0, 500_000, 'love_other_ge500k'],
  ['love', 0, 499_999, 'love_other_ge100k'],
  ['love', 0, 100_000, 'love_other_ge100k'],
  ['love', 0, 99_999, 'love_other_lt100k'],
  ['lewd', 9, 1_000_000, 'lewd_matu_ge1m'],
  ['lewd', 9, 999_999, 'lewd_matu_ge500k'],
  ['lewd', 9, 500_000, 'lewd_matu_ge500k'],
  ['lewd', 9, 499_999, 'lewd_matu_ge100k'],
  ['lewd', 9, 100_000, 'lewd_matu_ge100k'],
  ['lewd', 9, 99_999, 'lewd_matu_lt100k'],
  ['lewd', 0, 1_000_000, 'lewd_other_ge1m'],
  ['lewd', 0, 999_999, 'lewd_other_ge500k'],
  ['lewd', 0, 500_000, 'lewd_other_ge500k'],
  ['lewd', 0, 499_999, 'lewd_other_ge100k'],
  ['lewd', 0, 100_000, 'lewd_other_ge100k'],
  ['lewd', 0, 99_999, 'lewd_other_lt100k'],
  ['normal', 9, 500_000, 'normal_matu_ge500k'],
  ['normal', 9, 499_999, 'normal_matu_ge100k'],
  ['normal', 9, 100_000, 'normal_matu_ge100k'],
  ['normal', 9, 99_999, 'normal_matu_lt100k'],
  ['normal', 0, 500_000, 'normal_other_ge500k'],
  ['normal', 0, 499_999, 'normal_other_ge100k'],
  ['normal', 0, 100_000, 'normal_other_ge100k'],
  ['normal', 0, 99_999, 'normal_other_lt100k'],
];

/**
 * 每个末路族的末路数：反抗刻印族按三种买家分流（标本/角斗士/神殿），
 * 其余族每档四条（将军/贵族/神官长/土豪这类四种买家）。
 */
const ENDING_COUNTS = {
  rebel_matu_ge100k: 2,
  rebel_matu_lt100k: 2,
  rebel_other_ge100k: 3,
  rebel_other_lt100k: 2,
};
/** 26 个末路族合计的末路数：9 + 22 × 4。 */
const TOTAL_ENDINGS = 97;

/** 族末行会覆盖结局的那一条：末路函数自己不带结局名，见末路族文件里的说明。 */
const OVERRIDDEN = new Set(['love_other_lt100k_toilet']);

function set_state(fixture, state, race) {
  fixture.store.set('talent:31:314', race);
  if (state === 'rebel') fixture.store.set('mark:31:3', 3);
  if (state === 'love') fixture.store.set('talent:31:85', 1);
  if (state === 'lewd') fixture.store.set('talent:31:76', 1);
}

test('K0_ROUTE：状态 × 种族 × 售价的末路编号表逐项分流', () => {
  for (const [state, race, price, expected] of ROUTE_TABLE) {
    const fixture = seed_world();
    set_state(fixture, state, race);
    assert.equal(
      black_market(fixture).k0_route(31, price),
      expected,
      `${state}/种族${race}/售价${price}`,
    );
  }
});

test('K0_ROUTE：反抗刻印优先于爱慕与淫乱', () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:314', 9);
  fixture.store.set('mark:31:3', 3);
  fixture.store.set('talent:31:85', 1);
  fixture.store.set('talent:31:76', 1);
  assert.equal(
    black_market(fixture).k0_route(31, 1_000_000),
    'rebel_matu_ge100k',
  );
});

test('K0_ROUTE：表中编号与 K0_ROUTES 分派表一一对应', () => {
  const fixture = seed_world();
  const { K0_ROUTES } = black_market(fixture);
  const ids = [...new Set(ROUTE_TABLE.map(([, , , id]) => id))].sort();
  assert.deepEqual(Object.keys(K0_ROUTES).sort(), ids);
  for (const id of ids) {
    assert.equal(typeof K0_ROUTES[id], 'function', `${id} 必须有末路族函数`);
  }
});

test('K0_ROUTES：每个末路族的正文条目数与该族末路数一致', () => {
  const fixture = seed_world();
  const counts = {};
  for (const name of ROUTE_MODULES) {
    const { ROUTES, ENDINGS } = family(fixture, name);
    for (const id of Object.keys(ROUTES)) {
      counts[id] = Object.keys(ENDINGS).filter((key) =>
        key.startsWith(`${id}_`),
      ).length;
    }
  }
  const expected = {};
  for (const id of Object.keys(black_market(fixture).K0_ROUTES)) {
    expected[id] = ENDING_COUNTS[id] ?? 4;
  }
  assert.deepEqual(counts, expected);
});

test('K0_ENDINGS：每条末路均可独立调用并输出正文', async () => {
  const fixture = seed_world();
  let invoked = 0;
  for (const name of ROUTE_MODULES) {
    for (const [id, ending_of] of Object.entries(
      family(fixture, name).ENDINGS,
    )) {
      const before = fixture.text_lines().length;
      const ending = await ending_of({
        cid: 31,
        target_name: '温妮',
        rand_n: seq([0]),
      });
      invoked++;
      assert.equal(typeof ending, 'string', `${id} 必须返回结局名`);
      if (!OVERRIDDEN.has(id))
        assert.notEqual(ending, '', `${id} 必须给出结局名`);
      assert(fixture.text_lines().length > before, `${id} 必须输出正文`);
    }
  }
  assert.equal(invoked, TOTAL_ENDINGS);
});
