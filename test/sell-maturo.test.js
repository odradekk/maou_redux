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

async function run_k1_case({ price, random = [0], talents = {}, mark = 0 }) {
  const { fixture, api } = seed_world();
  fixture.store.set('mark:31:3', mark);
  for (const [id, value] of Object.entries(talents)) {
    fixture.store.set(`talent:31:${id}`, value);
  }
  await api.sell_maturo_k1(31, { price, rand: seq(random) });
  return {
    buyer: fixture.text_lines()[0],
    ending: fixture.store.get('videoarchive:0'),
  };
}

async function run_k2_case({ price, sex_maniac = 0, speech_level = 0 }) {
  const { fixture, api } = seed_world();
  fixture.store.set('talent:31:136', 1); // 牝犬
  fixture.store.set('talent:31:75', sex_maniac); // 性交狂
  fixture.store.set('abl:31:15', speech_level); // 话术
  await api.sell_maturo_k2(31, { price });
  return {
    buyer: fixture.text_lines()[1], // 首行是牝犬加价提示
    ending: fixture.store.get('videoarchive:0'),
    branch_text: fixture.text_lines()[5],
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

test('SELL_MATURO_K2：牝犬四个价格档与三个素质维度覆盖全部 12 个路由', async () => {
  const cases = [
    [
      950_000,
      1,
      0,
      '魔界牝犬饲养员',
      '最高级牝犬饲养员',
      '最高级牝犬饲养员在为',
    ],
    [
      950_000,
      0,
      5,
      '魔界牝犬训练员',
      '最高级牝犬训练员',
      '其他女人也觉醒兽爱性癖',
    ],
    [950_000, 0, 0, '魔界土豪', '最高级牝犬奴隶', '优雅的作为牝犬'],
    [450_000, 1, 0, '魔界牝犬饲养员', '高级母种犬', '魔族最高级母种犬'],
    [450_000, 0, 5, '魔界圆形剧场', '高级牝犬女优', '圆形剧场'],
    [450_000, 0, 0, '魔界女富豪', '高级牝犬奴隶', '女富豪买下'],
    [50_000, 1, 0, '魔界个体饲养员', '牝犬饲养员', '饲养员和同伴'],
    [50_000, 0, 5, '魔界个体经营训练员', '牝犬训练员', '增加兽奸狂'],
    [50_000, 0, 0, '魔界女兽奸狂', '牝犬奴隶', '女兽奸狂的朋友'],
    [49_999, 1, 0, '魔犬', '魔犬新娘', '拥有知性的魔犬'],
    [49_999, 0, 5, '魔界小剧场', '牝犬女优', '小剧场'],
    [49_999, 0, 0, '魔界变态', '牝犬', '被变态作为宠物'],
  ];

  for (const [
    price,
    sex_maniac,
    speech_level,
    buyer,
    ending,
    branch_text,
  ] of cases) {
    const actual = await run_k2_case({ price, sex_maniac, speech_level });
    assert.equal(actual.buyer, `${buyer}买下温妮之后………`);
    assert.equal(actual.ending, `${ending}温妮`);
    assert(actual.branch_text.includes(branch_text));
  }
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

test('SELL_MATURO_K1：五处随机分支的两侧均由确定性随机源覆盖', async () => {
  const cases = [
    ['食脑魔买家左支', 100_000, { 314: 9 }, [0], '食脑魔的诸侯'],
    ['食脑魔买家右支', 100_000, { 314: 9 }, [1], '食脑魔的大神官'],
    ['恶魔买家左支', 99_999, { 314: 9 }, [0, 0], '恶魔的诸侯', '恶魔的玩具'],
    ['恶魔买家右支', 99_999, { 314: 9 }, [1], '恶魔的大富豪'],
    [
      '恶魔诸侯末路右支',
      99_999,
      { 314: 9 },
      [0, 1],
      '恶魔的诸侯',
      '脱粪肥料装置',
    ],
    ['巨魔买家左支', 99_999, {}, [0, 0], '巨魔佣兵团', '巨魔的飞机杯'],
    ['巨魔买家右支', 99_999, {}, [1], '恶魔的人间牧场'],
    ['巨魔佣兵团末路右支', 99_999, {}, [0, 1], '巨魔佣兵团', '巨魔的繁殖便器'],
  ];

  for (const [label, price, talents, random, buyer, ending] of cases) {
    const actual = await run_k1_case({
      price,
      random,
      talents,
      mark: 3,
    });
    assert.equal(actual.buyer, `${buyer}买下温妮之后………`, label);
    if (ending) assert.equal(actual.ending, `${ending}温妮`, label);
  }
});

test('SELL_MATURO_K1：价格边界与种族、职业素质维度逐项分流', async () => {
  const cases = [
    ['十万下侧', 99_999, { 314: 9 }, '街角的杂耍小屋'],
    ['十万上侧', 100_000, { 314: 9 }, '魔界的大监狱'],
    ['五十万下侧', 499_999, { 314: 9 }, '魔界的大监狱'],
    ['五十万上侧', 500_000, { 314: 9 }, '兽人富商'],
    ['一百万下侧', 999_999, { 76: 1, 314: 9 }, '兽人富商'],
    ['一百万上侧', 1_000_000, { 76: 1, 314: 9 }, '魔兽的研究设施'],
    ['非魔族', 100_000, {}, '哥布林赌场'],
    [
      '战士职业',
      500_000,
      { 200: 1, 314: 9 },
      '食人魔佣兵团',
      '食人魔佣兵团保镖',
    ],
    [
      '文职职业',
      500_000,
      { 203: 1, 314: 9 },
      '食人魔佣兵团',
      '食人魔佣兵团顾问',
    ],
    ['魔法职业', 500_000, { 205: 1, 314: 9 }, '半人马的骑士团', '半人马的幼教'],
  ];

  for (const [label, price, talents, buyer, ending] of cases) {
    const actual = await run_k1_case({ price, talents });
    assert.equal(actual.buyer, `${buyer}买下温妮之后………`, label);
    if (ending) assert.equal(actual.ending, `${ending}温妮`, label);
  }
});
