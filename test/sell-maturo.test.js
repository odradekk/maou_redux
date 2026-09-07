'use strict';

/**
 * 成熟奴隶异族市场与宠物市场末路测试（issue #337）。
 *
 * 接缝 = ere/system/stronghold/sell-maturo.js 导出的 K1、K2 与 K2 分支族；
 * 通过唯一夹具观察玩家输出、家族记录与 VIDEO_MATURO 保存的录像标题。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

function seq(values) {
  let index = 0;
  return (n) => values[index++ % values.length] % n;
}

function seed_world() {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 0, '你');
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  fixture.era.beginTrain(0, 31);
  fixture.store.set('exflag:9000', 4); // 水晶球录像保存开关
  return {
    fixture,
    api: fixture.load_module('system/stronghold/sell-maturo'),
  };
}

test('SELL_MATURO_K1：反抗刻印、魔族、高价随机支生成结局并交给录像书架', async () => {
  const { fixture, api } = seed_world();
  fixture.store.set('mark:31:3', 3);
  fixture.store.set('talent:31:314', 9); // 魔族
  fixture.store.set('cflag:31:9', 50); // 等级

  assert.equal(
    await api.sell_maturo_k1(31, { price: 100_000, rand: seq([0]) }),
    0,
  );

  assert.deepEqual(fixture.text_lines().slice(0, 4), [
    '食脑魔的诸侯买下温妮之后………',
    '………',
    '……',
    '…',
  ]);
  assert(fixture.text_lines().includes('脑子被改造，成为了唯命是从的奴隶。'));
  assert.equal(fixture.store.get('videoarchive:0'), '脑改造指挥官温妮');
  assert.equal(fixture.store.get('tstr:30'), '', 'VIDEO_MATURO 消费标题暂存');
  assert.equal(fixture.text_lines().at(-2), '就这样，你和温妮再也没有见面……');
});

test('SELL_MATURO_K1：未显式给售价时直接使用 ESTIMATE_CHARA 的结果', async () => {
  const { fixture, api } = seed_world();
  fixture.store.set('mark:31:3', 3);
  fixture.store.set('talent:31:314', 9);
  fixture.store.set('abl:31:3', 25); // 肛门感觉倍率把默认估价推过十万
  for (const id of [10, 11, 12, 13, 14, 15]) {
    fixture.store.set(`abl:31:${id}`, 10);
  }

  await api.sell_maturo_k1(31, { rand: seq([0]) });

  assert.equal(fixture.text_lines()[0], '食脑魔的诸侯买下温妮之后………');
  assert.equal(fixture.store.get('videoarchive:0'), '白痴温妮');
});

test('SELL_MATURO_K2：牝犬加价发生在售价分档前', async () => {
  const { fixture, api } = seed_world();
  fixture.store.set('talent:31:136', 1); // 牝犬
  fixture.store.set('talent:31:75', 1); // 性交狂

  await api.sell_maturo_k2(31, { price: 950_000 });

  assert.equal(fixture.text_lines()[0], '已经是牝犬的温妮可以多卖50000点。');
  assert.equal(fixture.text_lines()[1], '魔界牝犬饲养员买下温妮之后………');
  assert.equal(fixture.store.get('videoarchive:0'), '最高级牝犬饲养员温妮');
});

test('SELL_MATURO_K2：找到家人时同步记录其末路称号', async () => {
  const { fixture, api } = seed_world();
  join_slave_chara(fixture, 32, '莉莉');
  fixture.store.set('talent:31:165', 1); // 村娘 A
  fixture.store.set('talent:32:171', 1); // 村娘 B，SEARCH_FAMILY 特例互找

  await api.sell_maturo_k2(31, { price: 1 });

  assert.equal(fixture.store.get('cstr:32:5'), '牝犬温妮');
});

test('SELL_MATURO_K2：非牝犬按淫乱与售价选择分支', async () => {
  const { fixture, api } = seed_world();
  fixture.store.set('talent:31:76', 1); // 淫乱

  await api.sell_maturo_k2(31, { price: 500_000 });

  assert.equal(fixture.text_lines()[0], '魔界牝犬饲养员买下温妮之后………');
  assert.equal(fixture.store.get('videoarchive:0'), '母种犬温妮');
});

test('SELL_MATURO_K2 分支族：15 个原函数均由一张表分发', async () => {
  const { fixture, api } = seed_world();
  const ids = [101, 102, 103, 104, 51, 52, 53, 54, 11, 12, 13, 1, 2, 3, 4];

  for (const id of ids) {
    const before = fixture.text_lines().length;
    assert.equal(await api.sell_maturo_k2_branch(id, 31), 0, `分支 ${id}`);
    assert.equal(
      fixture.text_lines().length - before,
      3,
      `分支 ${id} 保留三行等待输出`,
    );
  }

  assert(
    fixture.text_lines().some((line) => line.includes('最高级牝犬饲养员')),
  );
  assert(fixture.text_lines().some((line) => line.includes('小剧场')));
  assert(fixture.text_lines().some((line) => line.includes('淫乱的身体')));
});
