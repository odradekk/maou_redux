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

async function run_k0_case({
  price,
  state = 'normal',
  race = 0,
  route = 0,
  leaf,
  positive = false,
  random = [0],
}) {
  const { fixture, api } = seed_world();
  fixture.set_inputs(0);
  fixture.store.set('talent:0:122', 1); // 无参 SHE() 的固定对象
  fixture.store.set('talent:31:314', race);
  if (state === 'love') fixture.store.set('talent:31:85', 1);
  if (state === 'lewd') fixture.store.set('talent:31:76', 1);

  if (route === 3) {
    fixture.store.set(
      `talent:31:${leaf === 'talent203' && positive ? 203 : 200}`,
      1,
    );
  } else if (route === 2) {
    fixture.store.set('talent:31:205', 1);
  } else if (route === 1) {
    fixture.store.set('talent:31:202', 1);
  }

  if (positive) {
    if (leaf === 'talent75') fixture.store.set('talent:31:75', 1);
    if (leaf === 'talent77') fixture.store.set('talent:31:77', 1);
    if (leaf === 'breast') fixture.store.set('talent:31:110', 1);
    if (leaf === 'talent204') fixture.store.set('talent:31:204', 1);
    if (leaf === 'abl15') fixture.store.set('abl:31:15', 5);
    if (leaf === 'abl2') fixture.store.set('abl:31:2', 5);
    if (leaf.startsWith('level')) {
      fixture.store.set('cflag:31:9', Number(leaf.slice(5)));
    }
  }

  await api.sell_maturo_k0(31, { price, rand: seq(random) });
  const lines = fixture.text_lines();
  return {
    lines,
    text: lines.join('\n'),
    ending: fixture.store.get('videoarchive:0'),
  };
}

test('SELL_MATURO_K0：黑市自然态走非魔族低价公厕末路并保存录像标题', async () => {
  const { fixture, api } = seed_world();
  fixture.set_inputs(0);
  fixture.store.set('talent:0:122', 1); // 原作无参 SHE() 固定读取 0 号角色

  assert.equal(
    await api.sell_maturo_k0(31, { price: 14_430, rand: seq([0]) }),
    0,
  );

  assert(fixture.text_lines().includes('公厕买下温妮之后………'));
  assert(
    fixture.text_lines().includes('过于残酷的生活让他不到半年便精神崩溃了。'),
    '原作无参 SHE() 固定读取 0 号角色，1:1 保留为男性代词',
  );
  assert.equal(fixture.store.get('videoarchive:0'), '公众肉便器温妮');
});

const K0_MATRIX = [
  // 爱慕：魔族四档。
  [
    'love',
    9,
    1_000_000,
    ['魔界土豪', '堕落神的神官长', '魔界贵族', '魔王军将军'],
    ['abl15', 'talent77', 'breast', 'talent75'],
    [
      ['土豪的情人', '生意助手'],
      ['性奴女神官', '菊奴女神官'],
      ['魔界贵族的情人', '魔界贵族的情人'],
      ['性奴隶', '性奴隶'],
    ],
  ],
  [
    'love',
    9,
    500_000,
    ['魔界的大商人', '堕落神的神殿', '魔界地方领主', '黑帮首领'],
    ['talent204', 'talent77', 'breast', 'talent203'],
    [
      ['商人的情人', '肉便器'],
      ['邪神殿的性奴', '邪神殿的菊奴'],
      ['领主的玩物', '领主的女仆'],
      ['黑老大的情人', '黑老大的情人'],
    ],
  ],
  [
    'love',
    9,
    100_000,
    ['魔界商人', '魔界大农场', '魔界学院', '魔王军的士官'],
    ['talent204', 'talent77', 'breast', 'talent75'],
    [
      ['魔改肉块', '肉便器'],
      ['大农场主的性奴隶', '大农场主的性奴隶'],
      ['异种交配实验体', '人形奶牛'],
      ['士官的性奴', '士官的性奴'],
    ],
  ],
  [
    'love',
    9,
    99_999,
    ['街角的公厕', '魔界的农场', '魔界的酒吧', '魔界的矿山主'],
    ['talent204', 'talent77', 'breast', 'talent75'],
    [
      ['肉便器', '肉便器'],
      ['农奴的共妻', '农场主的性奴'],
      ['酒馆女侍应', '酒馆女侍应'],
      ['矿山性奴', '矿山性奴'],
    ],
  ],
  // 爱慕：非魔族四档。
  [
    'love',
    0,
    1_000_000,
    ['魔界土豪', '堕落神的神官长', '魔界贵族', '魔王军的将军'],
    ['abl15', 'talent77', 'breast', 'talent75'],
    [
      ['土豪的宠物', '宴客性奴'],
      ['性奴女神官', '菊奴女神官'],
      ['贵族的宠物', '人体家具'],
      ['魔界将军的性奴', '魔界将军的性奴'],
    ],
  ],
  [
    'love',
    0,
    500_000,
    ['魔界的大商人', '堕落神的神殿', '魔界地方领主', '黑帮首领'],
    ['talent204', 'talent77', 'breast', 'talent203'],
    [
      ['大商人的宠物', '肉便器'],
      ['神殿的性奴', '神殿的菊奴'],
      ['宴客肉被子', '人形奶牛'],
      ['驯化的宠物', '驯化的宠物'],
    ],
  ],
  [
    'love',
    0,
    100_000,
    ['魔界商人', '魔界大农场', '魔界学院', '魔王军的士官'],
    ['talent204', 'talent77', 'breast', 'talent75'],
    [
      ['肉便器', '肉便器'],
      ['农场主的性奴', '农场主的菊奴'],
      ['学生的玩具', '淫虫的苗床'],
      ['士官的性奴', '士官的性奴'],
    ],
  ],
  [
    'love',
    0,
    99_999,
    ['街角的公厕', '魔界的农场', '魔界的酒吧', '魔界的矿山主'],
    ['talent204', 'breast', 'breast', 'talent75'],
    [
      ['肉便器', '肉便器'],
      ['肉便器', '肉便器'],
      ['肉便器', '肉便器'],
      ['肉便器', '肉便器'],
    ],
  ],

  // 淫乱：魔族四档。
  [
    'lewd',
    9,
    1_000_000,
    ['魔界大富豪', '堕落神的神官长', '魔界的高级妓院', '魔界的谍报机关'],
    ['talent204', 'breast', 'breast', 'level100'],
    [
      ['扩张奴隶', '妊娠便器'],
      ['堕落神的巫女', '堕落神的祭品'],
      ['高级娼妇', '乳交娼妇'],
      ['谍报组织的提审官', '魔界的谍报员'],
    ],
  ],
  [
    'lewd',
    9,
    500_000,
    ['魔界的好事之徒', '堕落神的神殿', '魔界的高级酒吧', '魔王军的高级将校'],
    ['talent204', 'breast', 'breast', 'level50'],
    [
      ['好事者的抱枕', '肉便器'],
      ['堕落神的性奴', '堕落神的信徒'],
      ['高级酒馆的表演者', '高级酒馆的女侍应'],
      ['高级将校的情人', '高级将校的保镖'],
    ],
  ],
  [
    'lewd',
    9,
    100_000,
    ['魔界的赌场', '魔界的黑酒吧', '魔界的妓院', '魔界的黑帮'],
    ['talent204', 'breast', 'breast', 'level30'],
    [
      ['赌场的赠品', '赌场的肉便器'],
      ['黑酒吧的女侍应', '黑酒吧的乳奴隶'],
      ['刺青娼妇', '刺青娼妇'],
      ['黑社会的情妇', '黑帮成员'],
    ],
  ],
  [
    'lewd',
    9,
    99_999,
    ['公厕', '触手小屋', '乞丐', '魔界的酒吧'],
    ['talent204', 'breast', 'breast', 'level20'],
    [
      ['公众肉便器', '公众便所'],
      ['触手的苗床', '触手的苗床'],
      ['乞丐的妻子', '乞丐的妻子'],
      ['酒吧的赠品', '酒吧的赠品'],
    ],
  ],
  // 淫乱：非魔族四档。
  [
    'lewd',
    0,
    1_000_000,
    ['魔界大富豪', '堕落神的神官长', '魔界的高级妓院', '魔界的间谍培训机构'],
    ['talent204', 'breast', 'breast', 'level100'],
    [
      ['大富豪的收藏品', '肉便器'],
      ['堕落神的巫女', '堕落神的信徒'],
      ['高级娼妇', '高级娼妇'],
      ['间谍教材', '魔界的间谍'],
    ],
  ],
  [
    'lewd',
    0,
    500_000,
    ['魔界的好事之徒', '堕落神的神殿', '魔界的高级酒吧', '魔王军的高级将校'],
    ['talent204', 'breast', 'breast', 'level50'],
    [
      ['好事者的抱枕', '马厩的肉便器'],
      ['堕落神的巫女', '神殿的性奴'],
      ['高级酒馆的女侍应', '高级酒馆的女侍应'],
      ['高级将校的奴隶', '魔界的士官'],
    ],
  ],
  [
    'lewd',
    0,
    100_000,
    ['魔界的赌场', '魔界的黑酒吧', '魔界的妓院', '魔界的黑帮'],
    ['talent204', 'breast', 'breast', 'abl2'],
    [
      ['赌场的赠品', '赌场的肉便器'],
      ['黑酒馆的瘾君子', '黑酒馆的瘾君子'],
      ['橱窗娼妇', '橱窗娼妇'],
      ['黑社会的情妇', '黑社会的情妇'],
    ],
  ],
  [
    'lewd',
    0,
    99_999,
    ['公厕', '触手小屋', '乞丐', '魔界的酒吧'],
    ['talent204', 'breast', 'breast', 'abl2'],
    [
      ['公众肉便器', '公众肉便器'],
      ['触手的苗床', '触手的苗床'],
      ['乞丐的妻子', '乞丐的妻子'],
      ['酒吧的赠品', '酒吧的赠品'],
    ],
  ],

  // 通常：魔族与非魔族各三档。
  [
    'normal',
    9,
    500_000,
    ['魔界的大商人', '堕落神的神殿', '魔界地方领主', '魔王军的高级将校'],
    ['talent204', 'breast', 'breast', 'talent75'],
    [
      ['性奴隶', '肉便器'],
      ['堕落神的信徒', '神殿的奴隶'],
      ['领主孩子的玩具', '人形奶牛'],
      ['高级将校的宠物', '高级将校的性奴'],
    ],
  ],
  [
    'normal',
    9,
    100_000,
    ['魔界的赌场', '魔界大农场', '魔界的妓院', '魔王军的士官'],
    ['talent204', 'talent77', 'breast', 'talent75'],
    [
      ['赌场赠品', '赌场肉便器'],
      ['大农场里的玩具', '大农场里的玩具'],
      ['橱窗娼妇', '橱窗娼妇'],
      ['士官的性奴', '士官的性奴'],
    ],
  ],
  [
    'normal',
    9,
    99_999,
    ['公厕', '触手小屋', '魔界的酒吧', '魔界的矿山主'],
    ['talent204', 'breast', 'breast', 'abl2'],
    [
      ['公众肉便器', '公众肉便器'],
      ['触手的苗床', '触手的苗床'],
      ['酒吧的玩具', '酒吧的玩具'],
      ['矿山性奴', '矿山性奴'],
    ],
  ],
  [
    'normal',
    0,
    500_000,
    ['魔界的大商人', '堕落神的神殿', '魔界地方领主', '魔王军的高级将校'],
    ['talent204', 'breast', 'breast', 'talent75'],
    [
      ['大商人的宠物', '肉便器'],
      ['堕落神的信徒', '堕落神的性奴'],
      ['领主孩子的玩具', '人形奶牛'],
      ['高级将校的宠物', '高级将校的性奴'],
    ],
  ],
  [
    'normal',
    0,
    100_000,
    ['魔界的赌场', '魔界大农场', '魔界的妓院', '魔王军的士官'],
    ['talent204', 'breast', 'breast', 'abl2'],
    [
      ['赌场的狗', '赌场的肉便器'],
      ['家畜奴隶', '乳牛奴隶'],
      ['异种专用娼妇', '异种专用娼妇'],
      ['士官的性奴', '士官的性奴'],
    ],
  ],
  [
    'normal',
    0,
    99_999,
    ['公厕', '触手小屋', '魔界的酒吧', '魔界的矿山主'],
    ['talent204', 'breast', 'breast', 'abl2'],
    [
      ['公众肉便器', '公众肉便器'],
      ['触手的苗床', '触手的苗床'],
      ['酒吧的玩具', '酒吧的玩具'],
      ['矿山性奴', '矿山性奴'],
    ],
  ],
];

test('SELL_MATURO_K0：状态 × 种族 × 价格档 × 职业 × 叶子条件完整矩阵', async () => {
  for (const [state, race, price, buyers, leaves, endings] of K0_MATRIX) {
    for (let route = 0; route < 4; route += 1) {
      const negative = await run_k0_case({
        state,
        race,
        price,
        route,
        leaf: leaves[route],
      });
      const positive = await run_k0_case({
        state,
        race,
        price,
        route,
        leaf: leaves[route],
        positive: true,
      });
      const label = `${state}/种族${race}/价格${price}/路由${route}/${leaves[route]}`;
      for (const actual of [negative, positive]) {
        assert(
          actual.lines.some((line) =>
            line.includes(`${buyers[route]}买下温妮之后`),
          ),
          `${label} 买家`,
        );
      }
      assert.equal(
        negative.ending,
        `${endings[route][0]}温妮`,
        `${label} 假侧`,
      );
      assert.equal(
        positive.ending,
        `${endings[route][1]}温妮`,
        `${label} 真侧`,
      );
      assert.notEqual(
        negative.text,
        positive.text,
        `${label} 两侧文本必须可区分`,
      );
    }
  }
});

test('SELL_MATURO_K0：反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由', async () => {
  const cases = [
    [9, 100_000, [0], {}, 49, '鲨鱼的食物'],
    [9, 100_000, [0], {}, 50, '角斗士'],
    [9, 100_000, [1], {}, 0, '苦力奴隶'],
    [9, 100_000, [1], { 202: 1 }, 0, '神殿的人柱'],
    [9, 99_999, [0, 0], {}, 0, '瞎子奴隶'],
    [9, 99_999, [0, 1], {}, 0, '瘸子奴隶'],
    [9, 99_999, [1], {}, 0, '生物标本'],
    [9, 99_999, [1], { 110: 1 }, 0, '肉品'],
    [5, 100_000, [0], {}, 0, '标本'],
    [
      0,
      100_000,
      [0],
      { 200: 1 },
      99,
      '角斗士',
      '作为主谋的温妮要因此接受惩罚。',
    ],
    [0, 100_000, [0], { 200: 1 }, 100, '角斗士', '作为主谋的温妮一直行踪不明'],
    [0, 100_000, [0], {}, 0, '划桨奴隶'],
    [0, 100_000, [0], { 202: 1 }, 0, '神殿的人柱'],
    [0, 99_999, [0, 0], {}, 0, '活着的桌子'],
    [0, 99_999, [0, 1], {}, 0, '活着的椅子'],
    [0, 99_999, [1], {}, 0, '生物标本'],
    [0, 99_999, [1], { 110: 1 }, 0, '肉品'],
  ];

  for (const [
    race,
    price,
    random,
    talents,
    level,
    ending,
    expected_text,
  ] of cases) {
    const { fixture, api } = seed_world();
    fixture.set_inputs(0);
    fixture.store.set('mark:31:3', 3);
    fixture.store.set('talent:31:314', race);
    fixture.store.set('cflag:31:9', level);
    for (const [id, value] of Object.entries(talents)) {
      fixture.store.set(`talent:31:${id}`, value);
    }
    await api.sell_maturo_k0(31, { price, rand: seq(random) });
    assert.equal(fixture.store.get('videoarchive:0'), `${ending}温妮`);
    if (expected_text) {
      assert(fixture.text_lines().some((line) => line.includes(expected_text)));
    }
  }
});

test('SELL_MATURO_K0：市场菜单重输、录像开关、退出与两个市场委托均可达', async () => {
  const cancel = seed_world();
  const inputs = [-1, 3, 1000, 999];
  let input_index = 0;
  cancel.fixture.era.input = async () => inputs[input_index++];
  assert.equal(
    await cancel.api.sell_maturo_k0(31, { price: 1, rand: seq([0]) }),
    0,
  );
  assert.equal(input_index, 4);
  assert.equal(
    cancel.fixture.lines.filter(({ type }) => type === 'button').length,
    10,
    '非法输入不重画，1000 翻转开关后才重画五个按钮',
  );
  assert.equal(cancel.fixture.store.get('exflag:9000'), 0);
  assert.equal(cancel.fixture.store.get('videoarchive:0'), undefined);
  assert(
    !cancel.fixture.text_lines().some((line) => line.includes('再也没有见面')),
  );

  const alien = seed_world();
  alien.fixture.set_inputs(1);
  await alien.api.sell_maturo_k0(31, { price: 1, rand: seq([0]) });
  assert.equal(alien.fixture.text_lines().at(1), '哥布林的村庄买下温妮之后………');
  assert.equal(alien.fixture.store.get('videoarchive:0'), '哥布林的打杂温妮');

  const pet = seed_world();
  pet.fixture.set_inputs(2);
  await pet.api.sell_maturo_k0(31, { price: 1, rand: seq([0]) });
  assert.equal(pet.fixture.text_lines().at(1), '魔界变态买下温妮之后………');
  assert.equal(pet.fixture.store.get('videoarchive:0'), '牝犬温妮');
});

test('SELL_MATURO_K0：状态优先级为反抗刻印、爱慕、淫乱、常态', async () => {
  const marked = seed_world();
  marked.fixture.set_inputs(0);
  marked.fixture.store.set('mark:31:3', 3);
  marked.fixture.store.set('talent:31:85', 1);
  marked.fixture.store.set('talent:31:76', 1);
  marked.fixture.store.set('talent:31:314', 9);
  await marked.api.sell_maturo_k0(31, { price: 100_000, rand: seq([0]) });
  assert.equal(
    marked.fixture.text_lines().at(1),
    '温妮被送到魔界中央奴隶市场………',
  );

  const loved = seed_world();
  loved.fixture.set_inputs(0);
  loved.fixture.store.set('talent:31:85', 1);
  loved.fixture.store.set('talent:31:76', 1);
  loved.fixture.store.set('talent:31:314', 9);
  await loved.api.sell_maturo_k0(31, { price: 1_000_000, rand: seq([0]) });
  assert.equal(loved.fixture.store.get('videoarchive:0'), '土豪的情人温妮');

  const lewd = await run_k0_case({
    state: 'lewd',
    race: 9,
    price: 1_000_000,
  });
  assert.equal(lewd.ending, '扩张奴隶温妮');
});

test('SELL_MATURO_K0：八种职业编号与爱慕十万档的原作例外逐项分流', async () => {
  const expected = new Map([
    [200, '魔王军将军'],
    [201, '魔界土豪'],
    [202, '堕落神的神官长'],
    [203, '魔王军将军'],
    [204, '魔界土豪'],
    [205, '魔界贵族'],
    [206, '堕落神的神官长'],
    [207, '魔界贵族'],
  ]);
  for (const [talent, buyer] of expected) {
    const { fixture, api } = seed_world();
    fixture.set_inputs(0);
    fixture.store.set('talent:31:85', 1);
    fixture.store.set('talent:31:314', 9);
    fixture.store.set(`talent:31:${talent}`, 1);
    await api.sell_maturo_k0(31, { price: 1_000_000, rand: seq([0]) });
    assert.equal(fixture.text_lines().at(1), `${buyer}买下温妮之后………`);
  }

  for (const [talent, buyer] of [
    [201, '魔界学院'],
    [207, '魔界商人'],
  ]) {
    const { fixture, api } = seed_world();
    fixture.set_inputs(0);
    fixture.store.set('talent:31:85', 1);
    fixture.store.set('talent:31:314', 9);
    fixture.store.set(`talent:31:${talent}`, 1);
    await api.sell_maturo_k0(31, { price: 100_000, rand: seq([0]) });
    assert.equal(fixture.text_lines().at(1), `${buyer}买下温妮之后………`);
  }
});

test('SELL_MATURO_K0：售价优先使用 SALE_CHARA 记忆值，否则调用真实估价', async () => {
  const remembered = seed_world();
  remembered.fixture.set_inputs(0);
  remembered.fixture.store.set('talent:31:85', 1);
  remembered.fixture.store.set('talent:31:314', 9);
  remembered.fixture
    .load_module('event/event-aftertrain')
    .remember_sale_price(99_999);
  remembered.fixture.store.set('abl:31:3', 25);
  for (const id of [10, 11, 12, 13, 14, 15]) {
    remembered.fixture.store.set(`abl:31:${id}`, 10);
  }
  await remembered.api.sell_maturo_k0(31, { rand: seq([0]) });
  assert.equal(
    remembered.fixture.text_lines().at(1),
    '街角的公厕买下温妮之后………',
  );

  const estimated = seed_world();
  estimated.fixture.set_inputs(0);
  estimated.fixture.store.set('mark:31:3', 3);
  estimated.fixture.store.set('talent:31:314', 9);
  estimated.fixture.store.set('abl:31:3', 25);
  for (const id of [10, 11, 12, 13, 14, 15]) {
    estimated.fixture.store.set(`abl:31:${id}`, 10);
  }
  await estimated.api.sell_maturo_k0(31, { rand: seq([0]) });
  assert.equal(
    estimated.fixture.text_lines().at(1),
    '温妮被送到魔界中央奴隶市场………',
  );
});

test('SELL_MATURO_K0：找到家人时同步记录末路，录像消费标题暂存', async () => {
  const { fixture, api } = seed_world();
  fixture.set_inputs(0);
  fixture.store.set('talent:31:165', 1);
  fixture.store.set('talent:0:171', 1);
  await api.sell_maturo_k0(31, { price: 1, rand: seq([0]) });
  assert.equal(fixture.store.get('cstr:0:5'), '公众肉便器温妮');
  assert.equal(fixture.store.get('tstr:30'), '');
});

test('SELL_MATURO_K0：原作无参 SHE 按 0 号角色选择代词', async () => {
  const { fixture, api } = seed_world();
  fixture.set_inputs(0);
  fixture.store.set('mark:31:3', 3);
  fixture.store.set('talent:31:314', 9);
  fixture.store.set('talent:31:110', 1);
  fixture.store.set('talent:0:122', 1);

  await api.sell_maturo_k0(31, { price: 99_999, rand: seq([1]) });

  assert(
    fixture
      .text_lines()
      .includes('以恶毒性虐者而闻名的地方领主，将他买下带到肉联厂去了。'),
  );
});

test('SELL_MATURO_K0：14 个活动口上的成熟出售事件均进入市场真身', async () => {
  const handlers = [
    ['kojo/kojo-k0-tender', 0],
    ['kojo/kojo-k1-confident', 1],
    ['kojo/kojo-k2-timid', 2],
    ['kojo/kojo-k3-noble', 3],
    ['kojo/kojo-k4-stoic', 4],
    ['kojo/kojo-k6-wicked', 6],
    ['kojo/kojo-k7-heart', 7],
    ['kojo/kojo-k8-spade', 8],
    ['kojo/kojo-k9-diamond', 9],
    ['kojo/kojo-k10-club', 10],
    ['kojo/kojo-k12-intellectual', 12],
    ['kojo/kojo-k13-protector', 13],
    ['kojo/kojo-k15-clever', 15],
    ['kojo/kojo-k903-garde', 903],
  ];

  for (const [module_name, kojo_id] of handlers) {
    const fixture = create_era_fixture();
    join_slave_chara(fixture, 0, '你');
    join_slave_chara(fixture, 31, '温妮');
    fixture.load_module('era-utils/era-flag').target = 31;
    fixture.era.beginTrain(0, 31);
    fixture.store.set('tflag:13', 6); // 初吻与自我口上 = 成熟出售事件
    fixture.set_inputs(999);
    fixture.load_module(module_name);

    await fixture
      .load_module('kojo/kojo-system')
      .self_kojo_family.call(kojo_id, { args: [seq([0])] });

    assert(
      fixture.text_lines().includes('要卖到哪个市场？'),
      `${module_name} 未进入 SELL_MATURO_K0 市场菜单`,
    );
  }
});

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

test('SELL_MATURO_K2：主流程按牝犬、淫乱与售价分发实际结局文本', async () => {
  const cases = [
    [
      '牝犬优先于淫乱',
      1,
      1,
      950_000,
      '被土豪买下作为宠物的温妮、优雅的作为牝犬生活着。',
    ],
    [
      '淫乱百万档',
      0,
      1,
      1_000_000,
      '被土豪买下作为宠物的温妮、过上了淫乱的牝犬生活。',
    ],
    [
      '淫乱五十万档',
      0,
      1,
      500_000,
      '温妮今天也作为魔族最高级母种犬孕育着幼犬。',
    ],
    ['淫乱低价档', 0, 1, 499_999, '温妮被拥有知性的魔犬买了下来。'],
    [
      '常态百万档',
      0,
      0,
      1_000_000,
      '被土豪买下作为宠物的温妮、过上了淫乱的牝犬生活。',
    ],
    ['常态五十万档', 0, 0, 500_000, '温妮被牝犬训练员作为模范牝犬买了下来。'],
    [
      '常态低价档',
      0,
      0,
      499_999,
      '被变态作为宠物买下的温妮、过上了奇妙的性生活的样子。',
    ],
  ];

  for (const [label, dog, lewd, price, branch_text] of cases) {
    const { fixture, api } = seed_world();
    fixture.store.set('talent:31:136', dog); // 牝犬
    fixture.store.set('talent:31:76', lewd); // 淫乱

    await api.sell_maturo_k2(31, { price });

    assert(fixture.text_lines().includes(branch_text), label);
  }
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

test('SELL_MATURO_K1：原作漏判扶她素质，不进入奶罐分支', async () => {
  const actual = await run_k1_case({
    price: 99_999,
    random: [1], // 恶魔大富豪支
    talents: { 121: 1, 314: 9 }, // 只有扶她；巨乳、爆乳、超乳均为 0
    mark: 3,
  });

  assert.equal(actual.buyer, '恶魔的大富豪买下温妮之后………');
  assert.equal(actual.ending, '无脑的牝犬温妮');
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
