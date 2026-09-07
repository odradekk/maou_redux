/**
 * @file 处刑、设施与苗床业务行为测试（issue #348，阶段 5a L17）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[Math.min(index, values.length - 1)];
    index += 1;
    return Math.min(value, n - 1);
  };
}

function seed_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.seed_chara(47, { id: 47, name: '艾达', callname: '艾达' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(31);
  fixture.era.addCharacter(47);
  fixture.era.beginTrain(0, 31);
  fixture.store.set('cflag:31:9', 4); // 角色等级
  fixture.store.set('cflag:47:9', 2);
  for (const cid of [31, 47]) {
    fixture.store.set(`cflag:${cid}:550`, -1);
    fixture.store.set(`cflag:${cid}:551`, -1);
    fixture.store.set(`cflag:${cid}:552`, -1);
  }
  return fixture;
}

function set_banishment_values(fixture, values) {
  for (const [address, value] of Object.entries(values)) {
    fixture.store.set(address.replace(':', ':31:'), value);
  }
}

function evaluate_former_life(values) {
  const fixture = seed_world();
  set_banishment_values(fixture, values);
  const { former_life_fate } = fixture.load_module(
    'event/event-banishment-fate',
  );
  return former_life_fate(31);
}

async function evaluate_ordinary_fate(values) {
  const fixture = seed_world();
  set_banishment_values(fixture, values);
  fixture.set_inputs(0);
  const { banishment } = fixture.load_module('event/event-banishment');
  await banishment(31, seq([0]));
  const fate = fixture.store.get('videoarchive:31').replace(/温妮$/, '');
  return { fate, lines: fixture.text_lines() };
}

async function evaluate_former_life_narration(values) {
  const fixture = seed_world();
  set_banishment_values(fixture, values);
  fixture.set_inputs(4);
  const { banishment } = fixture.load_module('event/event-banishment');
  await banishment(31, seq([0]));
  return fixture.text_lines();
}

test('EXECUTION_MINI：回收装备、除名角色并结算处刑与勋章经验', async () => {
  const fixture = seed_world();
  fixture.store.set('cflag:31:550', 1001);
  fixture.store.set('cflag:31:551', 1002);
  fixture.store.set('cflag:31:552', 1003);
  const { execution_mini } = fixture.load_module('event/event-execution');

  assert.equal(await execution_mini(31), 0);

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 47]);
  assert.equal(fixture.store.get('item:301'), 1);
  assert.equal(fixture.store.get('item:302'), 1);
  assert.equal(fixture.store.get('item:303'), 1);
  assert.equal(fixture.store.get('cflag:31:550'), -1);
  assert.equal(fixture.store.get('cflag:31:551'), -1);
  assert.equal(fixture.store.get('cflag:31:552'), -1);
  assert.equal(fixture.store.get('flag:230'), 1);
  assert.equal(fixture.store.get('flag:80'), 1);
  assert.equal(fixture.store.get('exp:0:80'), 250);
  assert.equal(fixture.store.get('exp:0:81'), 1);
  assert.equal(fixture.store.get('exflag:99'), 2);
  assert(
    !fixture.text_lines().some((line) => line.includes('@CN_REBUILD')),
    '迷你处刑源未调用 NAME_RESET',
  );
});

test('EXECUTION_MINI：带说明调用不改威望，但其余结算不省略', async () => {
  const fixture = seed_world();
  fixture.store.set('exflag:99', 9);
  const { execution_mini } = fixture.load_module('event/event-execution');

  await execution_mini(31, '自动处刑');

  assert.equal(fixture.store.get('exflag:99'), 9);
  assert.equal(fixture.store.get('exp:0:81'), 1);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 47]);
  assert.equal(
    fixture.lines.filter((line) => line.type === 'divider').length,
    2,
    '带说明调用仍保留首尾两条分隔线',
  );
});

test('PUBLIC_EXECUTION：魂粉碎保留拼行、录像归档与确定性随机结果', async () => {
  const fixture = seed_world();
  fixture.set_inputs(2);
  const { public_execution } = fixture.load_module(
    'event/event-public-execution',
  );

  await public_execution(31, seq([3]));

  assert(
    fixture
      .text_lines()
      .some((line) =>
        line.includes('失去灵魂的温妮的身体，被喜欢百合的淫魔所回收'),
      ),
    '连续 PRINTFORM 必须合为同一行',
  );
  assert.equal(fixture.store.get('videoarchive:31'), '淫魔的使魔温妮');
  assert.equal(fixture.store.get('exp:0:81'), 1);
  assert.equal(fixture.store.get('exp:0:80'), 250);
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 47]);
});

test('GROTESQUE：按性格处理器分发口上并归档选择的末路', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:163', 1); // 高贵性格 → K3
  fixture.set_inputs(5);
  const { grotesque } = fixture.load_module('event/event-grotesque');
  const { grotesque_koujo_family } = fixture.load_module('kojo/kojo-system');
  let observed;
  grotesque_koujo_family.register(3, async (rand_n) => {
    observed = [fixture.store.get('tflag:530'), rand_n(7)];
    fixture.store.set('tflag:530', 4);
    return 0;
  });

  await grotesque(31, seq([4]));

  assert.deepEqual(observed, [5, 4]);
  assert.equal(fixture.store.get('videoarchive:31'), '肉类温妮');
  assert.equal(fixture.store.get('exp:0:81'), 1);
});

test('GROTESQUE：爱慕的食肉刑只打印一次烙印并保留专属结尾', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:85', 1); // 爱慕
  fixture.set_inputs(4);
  const { grotesque } = fixture.load_module('event/event-grotesque');

  await grotesque(31, seq([0]));

  assert.equal(
    fixture.text_lines().filter((line) => line.includes('封印所有力量的烙印'))
      .length,
    1,
  );
  assert(
    fixture.text_lines().some((line) => line.includes('胸部被怪物们吃着')),
  );
});

test('处分函数直调：口上观察到传入角色，而不是调用前残留 TARGET', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:47:163', 1); // 高贵性格 → K3
  fixture.set_inputs(2);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { public_execution } = fixture.load_module(
    'event/event-public-execution',
  );
  const { public_exucution_koujo_family } =
    fixture.load_module('kojo/kojo-system');
  let observed_target;
  public_exucution_koujo_family.register(3, async () => {
    observed_target = era_flag.target;
    fixture.store.set('tflag:520', 0);
    return 0;
  });

  await public_execution(47, seq([0]));

  assert.equal(observed_target, 47);
  assert.equal(fixture.store.get('videoarchive:47'), '凌辱致死艾达');
});

test('BANISHMENT：选项 1 对女性也会被原作校验拒绝，再接受普通流放', async () => {
  const fixture = seed_world();
  fixture.set_inputs(1, 0);
  const { banishment } = fixture.load_module('event/event-banishment');

  await banishment(31, seq([0]));

  assert.deepEqual(
    fixture.inputs_consumed.map(({ value }) => value),
    [1, 0],
  );
  assert(fixture.text_lines().includes('温妮已经是男性了。换个手段吧。'));
  assert.equal(fixture.store.get('videoarchive:31'), '下落不明温妮');
});

test('BANISHMENT：小动物分支逐次重掷，连续输出仍在同一行', async () => {
  const fixture = seed_world();
  fixture.set_inputs(3);
  const { banishment } = fixture.load_module('event/event-banishment');

  await banishment(31, seq([7, 1]));

  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('随后你将她变成了一条狗的样子。')),
  );
  assert.equal(fixture.store.get('videoarchive:31'), '汪？温妮');
});

test('BANISHMENT：肉便器旧业的末路优先级与守墓人标题逐支落盘', async () => {
  const fetish = seed_world();
  fetish.store.set('talent:31:204', 1);
  fetish.store.set('talent:31:317', 13);
  fetish.set_inputs(0);
  const { banishment: banish_fetish } = fetish.load_module(
    'event/event-banishment',
  );
  await banish_fetish(31, seq([0]));
  assert.equal(fetish.store.get('videoarchive:31'), '肉体改造发烧友温妮');

  const gravekeeper = seed_world();
  gravekeeper.store.set('talent:31:315', 10);
  gravekeeper.set_inputs(4);
  const { banishment: banish_gravekeeper } = gravekeeper.load_module(
    'event/event-banishment',
  );
  await banish_gravekeeper(31, seq([0]));
  assert.equal(gravekeeper.store.get('videoarchive:31'), '守墓人温妮');
});

test('BANISHMENT：家庭末路以亲属位组合文案，不泄漏 undefined', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:317', 8);
  fixture.store.set('talent:31:320', 100000); // 姐姐一人
  fixture.set_inputs(0);
  const { banishment } = fixture.load_module('event/event-banishment');

  await banishment(31, seq([0]));

  assert(
    fixture.text_lines().some((line) => line.includes('被姐姐宠爱的温妮')),
  );
  assert(!fixture.text_lines().some((line) => line.includes('undefined')));
});

test('BANISHMENT：录像观看者后日谈只属于肉便器旧业', async () => {
  const ordinary = seed_world();
  ordinary.store.set('talent:31:315', 1);
  ordinary.set_inputs(0);
  const { banishment: banish_ordinary } = ordinary.load_module(
    'event/event-banishment',
  );
  await banish_ordinary(31, seq([0]));
  assert(
    !ordinary.text_lines().some((line) => line.includes('一直单恋着温妮')),
  );

  const video_actor = seed_world();
  video_actor.store.set('talent:31:204', 1);
  video_actor.store.set('talent:31:315', 1);
  video_actor.set_inputs(0);
  const { banishment: banish_video_actor } = video_actor.load_module(
    'event/event-banishment',
  );
  await banish_video_actor(31, seq([0]));
  assert(
    video_actor.text_lines().some((line) => line.includes('一直单恋着温妮')),
  );
});

test('BANISHMENT：亲属构成四个位分别提取姐、兄、妹、弟', () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:320', 987654321);
  const { family_bits } = fixture.load_module('event/event-banishment-fate');

  assert.deepEqual(family_bits(31), {
    sister: 6,
    brother: 7,
    younger_sister: 8,
    younger_brother: 9,
  });
});

test('BANISHMENT：前世末路覆盖全部职业与每路素质开关两侧', () => {
  const base_cases = [
    [0, '下落不明'],
    [1, '学生'],
    [2, '修女'],
    [3, '农妇'],
    [4, '渔民'],
    [5, '娼妓'],
    [6, '盗贼'],
    [7, '乞丐娼妓'],
    [8, '贵族的千金小姐'],
    [9, '贫民'],
    [10, '守墓人'],
    [11, '巫女'],
    [12, '圣女'],
    [13, '预言者'],
    [14, '占卜师'],
    [15, '看板娘'],
    [16, '村娘'],
    [17, '隐居者'],
    [18, '面包店的看板娘'],
    [19, '女将校'],
    [20, '奴隶'],
    [21, '主妇'],
    [22, '下落不明'],
  ];
  for (const [former, expected] of base_cases) {
    assert.equal(
      evaluate_former_life({ 'talent:315': former }),
      expected,
      `前世 ${former} 的基础标题`,
    );
  }

  const modifiers = [
    [1, { 'talent:204': 1 }, '淫荡学生'],
    [1, { 'talent:48': 1 }, '眼镜娘学生'],
    [1, { 'talent:48': 1, 'talent:122': 1 }, '眼镜仔学生'],
    [1, { 'talent:180': 1 }, '卖淫学生'],
    [2, { 'abl:13': 1 }, '沦为口交母猪的修女'],
    [2, { 'talent:52': 1 }, '沦为口交母猪的修女'],
    [2, { 'abl:3': 1 }, '尻穴买春的修女'],
    [2, { 'talent:106': 1 }, '尻穴买春的修女'],
    [2, { 'talent:122': 1 }, '修士'],
    [3, { 'talent:13': 1 }, '种田的农妇'],
    [3, { 'exp:56': 4 }, '农妇'],
    [3, { 'exp:56': 5 }, '兽奸的农妇'],
    [3, { 'talent:122': 1 }, '农民'],
    [4, { 'talent:13': 1 }, '工作上手的渔民'],
    [4, { 'exp:74': 4 }, '渔民'],
    [4, { 'exp:74': 5 }, '卖淫的渔民'],
    [5, { 'abl:21': 1 }, '手交猪猡娼妓'],
    [5, { 'abl:17': 1 }, '露出狂娼妓'],
    [5, { 'talent:28': 1 }, '露出狂娼妓'],
    [6, { 'abl:22': 1 }, '诱拐人口的盗贼'],
    [6, { 'talent:81': 1 }, '诱拐人口的盗贼'],
    [6, { 'talent:82': 1 }, '诱拐人口的盗贼'],
    [7, { 'talent:180': 1 }, '低贱的乞丐娼妓'],
    [8, { 'abl:11': 1 }, '贵族的手淫中毒的千金小姐'],
    [8, { 'talent:102': 1 }, '贵族的手淫中毒的千金小姐'],
    [8, { 'talent:60': 1 }, '贵族的手淫中毒的千金小姐'],
    [8, { 'talent:122': 1 }, '贵族的大少爷'],
    [9, { 'exp:70': 4 }, '贫民'],
    [9, { 'exp:70': 5 }, '前女优贫民'],
    [9, { 'exp:70': 5, 'talent:122': 1 }, '前男优贫民'],
    [10, { 'abl:17': 1 }, '露出狂守墓人'],
    [10, { 'talent:28': 1 }, '露出狂守墓人'],
    [11, { 'abl:3': 1 }, '肛交卖淫的巫女'],
    [11, { 'talent:106': 1 }, '肛交卖淫的巫女'],
    [11, { 'talent:122': 1 }, '巫者'],
    [12, { 'abl:13': 1 }, '沦为口交母猪的圣女'],
    [12, { 'talent:52': 1 }, '沦为口交母猪的圣女'],
    [12, { 'talent:122': 1 }, '圣者'],
    [13, { 'abl:13': 1 }, '沦为口交母猪的预言者'],
    [13, { 'talent:52': 1 }, '沦为口交母猪的预言者'],
    [14, { 'abl:11': 1 }, '性骚扰占卜师'],
    [14, { 'talent:36': 1 }, '性骚扰占卜师'],
    [15, { 'talent:204': 1 }, '沦为肉便器的看板娘'],
    [16, { 'abl:17': 1 }, '裸体村娘'],
    [16, { 'talent:28': 1 }, '裸体村娘'],
    [16, { 'talent:122': 1 }, '村民'],
    [17, { 'abl:17': 1 }, '神秘的隐居者'],
    [17, { 'talent:28': 1 }, '神秘的隐居者'],
    [18, { 'talent:204': 1 }, '面包店的沦为肉便器的看板娘'],
    [19, { 'exp:70': 4 }, '女将校'],
    [19, { 'exp:70': 5 }, '耻辱的女将校'],
    [19, { 'talent:122': 1 }, '将校'],
    [20, { 'talent:143': 1 }, '少年专用的奴隶'],
    [20, { 'talent:13': 1 }, '少年专用的奴隶'],
    [21, { 'exp:56': 4 }, '主妇'],
    [21, { 'exp:56': 5 }, '爱好兽奸的主妇'],
    [21, { 'talent:122': 1 }, '主夫'],
  ];
  for (const [former, values, expected] of modifiers) {
    assert.equal(
      evaluate_former_life({ 'talent:315': former, ...values }),
      expected,
      `前世 ${former} 的开关 ${JSON.stringify(values)}`,
    );
  }
});

test('BANISHMENT：家庭喜好覆盖亲属存在性的十六种组合', async () => {
  const cases = [
    ['0000', '被父母宠爱的', '父亲和母亲', '主题是滥交夫妇的'],
    ['0001', '被弟弟景仰的', '弟弟', '百合的'],
    ['0010', '被妹妹景仰的', '妹妹', '主题是抖M被狠狠调教的'],
    ['0011', '被妹妹和弟弟景仰的', '妹妹和弟弟', '主题是兄妹乱伦的'],
    ['0100', '被哥哥宠爱的', '哥哥', '百合的'],
    ['0101', '被哥哥和弟弟喜爱的', '哥哥和弟弟', '主题是兄弟搞基的'],
    ['0110', '被哥哥和妹妹喜爱的', '哥哥和妹妹', '主题是兄妹乱伦的'],
    ['0111', '被兄弟和妹妹喜爱的', '兄弟和妹妹', '主题是近亲乱伦的'],
    ['1000', '被姐姐宠爱的', '姐姐', '主题是恋物癖的'],
    ['1001', '被姐姐和弟弟喜爱的', '姐姐和弟弟', '主题是姐弟乱伦的'],
    ['1010', '被姐姐和妹妹喜爱的', '姐姐和妹妹', '主题是姐妹百合的'],
    ['1011', '被姐妹和弟弟喜爱的', '姐妹和弟弟', '主题是近亲乱伦的'],
    ['1100', '被哥哥和姐姐宠爱的', '哥哥和姐姐', '主题是兄妹乱伦的'],
    ['1101', '被哥哥和姐弟喜爱的', '哥哥和姐弟', '主题是近亲乱伦的'],
    ['1110', '被哥哥和姐妹喜爱的', '哥哥和姐妹', '主题是近亲乱伦的'],
    ['1111', '被自己兄弟姐妹喜爱的', '兄弟姐妹', '主题是近亲乱伦的'],
  ];
  for (const [mask, loved, all, theme] of cases) {
    const [sister, brother, younger_sister, younger_brother] = [...mask].map(
      Number,
    );
    const relatives =
      sister * 100000 +
      brother * 1000000 +
      younger_sister * 10000000 +
      younger_brother * 100000000;
    const actual = await evaluate_ordinary_fate({
      'talent:317': 8,
      'talent:320': relatives,
    });
    const line = actual.lines.find((text) => text.includes('家庭早已债台高筑'));
    assert(line?.includes(loved), `${mask} loved`);
    assert(line?.includes(all), `${mask} all`);
    assert(line?.includes(theme), `${mask} theme`);
    assert(!line?.includes('undefined'), `${mask} act`);
  }
});

test('BANISHMENT：普通流放末路覆盖完整优先链与嵌套开关', async () => {
  const cases = [
    ...[244, 245, 246, 247].map((id) => [
      `恶魔外观 ${id}`,
      { [`talent:${id}`]: 1 },
      '玩物',
    ]),
    ['肉便器滥交 75', { 'talent:204': 1, 'talent:75': 1 }, '淫娃荡妇'],
    ['肉便器滥交 76', { 'talent:204': 1, 'talent:76': 1 }, '淫娃荡妇'],
    ['肉便器滥交 31', { 'talent:204': 1, 'talent:31': 1 }, '淫娃荡妇'],
    [
      '肉便器滥交男性',
      { 'talent:204': 1, 'talent:75': 1, 'talent:122': 1 },
      '性爱变态',
    ],
    ['肉便器兽奸能力', { 'talent:204': 1, 'abl:39': 1 }, '动物爱好者'],
    ['肉便器兽奸喜好', { 'talent:204': 1, 'talent:317': 12 }, '动物爱好者'],
    [
      '肉便器巨根扶她',
      { 'talent:204': 1, 'talent:121': 1, 'talent:318': 1 },
      '行行行，你JB大你先射',
    ],
    [
      '肉便器短小扶她',
      { 'talent:204': 1, 'talent:121': 1, 'talent:318': 2 },
      '六郎',
    ],
    ['肉便器扶她', { 'talent:204': 1, 'talent:121': 1 }, '雌性种马'],
    ['肉便器百合', { 'talent:204': 1, 'abl:22': 1 }, '妖艳百合'],
    ['肉便器阴道敏感', { 'talent:204': 1, 'talent:104': 1 }, '阴道扩张女优'],
    ['肉便器淫壶', { 'talent:204': 1, 'talent:232': 1 }, '阴道扩张女优'],
    ['肉便器肛门敏感', { 'talent:204': 1, 'talent:106': 1 }, '肛门扩张女优'],
    ['肉便器淫肛', { 'talent:204': 1, 'talent:233': 1 }, '肛门扩张女优'],
    [
      '肉便器肛门敏感男性',
      { 'talent:204': 1, 'talent:106': 1, 'talent:122': 1 },
      '肛门扩张男优',
    ],
    ['肉便器阴蒂敏感', { 'talent:204': 1, 'talent:102': 1 }, '阴蒂肥大女优'],
    ['肉便器淫核', { 'talent:204': 1, 'talent:230': 1 }, '阴蒂肥大女优'],
    [
      '肉便器阴蒂条件排除男性',
      { 'talent:204': 1, 'talent:102': 1, 'talent:122': 1 },
      '痴汉男优',
    ],
    ['肉便器乳房敏感', { 'talent:204': 1, 'talent:108': 1 }, '乳头开发女优'],
    ['肉便器淫乳', { 'talent:204': 1, 'talent:231': 1 }, '乳头开发女优'],
    [
      '肉便器乳房敏感男性',
      { 'talent:204': 1, 'talent:108': 1, 'talent:122': 1 },
      '乳头开发男优',
    ],
    ['肉便器露出', { 'talent:204': 1, 'abl:17': 1 }, '野战'],
    ['肉便器抖M', { 'talent:204': 1, 'abl:21': 1 }, '抖M女优'],
    [
      '肉便器抖M男性',
      { 'talent:204': 1, 'abl:21': 1, 'talent:122': 1 },
      '抖M男优',
    ],
    ['肉便器容易自慰', { 'talent:204': 1, 'talent:60': 1 }, '自慰女优'],
    ['肉便器自慰狂', { 'talent:204': 1, 'talent:74': 1 }, '自慰女优'],
    [
      '肉便器自慰男性',
      { 'talent:204': 1, 'talent:60': 1, 'talent:122': 1 },
      '自慰男优',
    ],
    ['肉便器改造喜好', { 'talent:204': 1, 'talent:317': 13 }, '肉体改造发烧友'],
    ['肉便器野外排尿', { 'talent:204': 1, 'talent:57': 1 }, '野外放尿女优'],
    [
      '肉便器野外排尿男性',
      { 'talent:204': 1, 'talent:57': 1, 'talent:122': 1 },
      '野外放尿男优',
    ],
    ['肉便器眼镜', { 'talent:204': 1, 'talent:48': 1 }, '眼镜女优'],
    [
      '肉便器眼镜男性',
      { 'talent:204': 1, 'talent:48': 1, 'talent:122': 1 },
      '眼镜男优',
    ],
    ['肉便器精灵', { 'talent:204': 1, 'talent:314': 1 }, '恋物癖女优'],
    [
      '肉便器精灵男性',
      { 'talent:204': 1, 'talent:314': 1, 'talent:122': 1 },
      '恋物癖男优',
    ],
    ['肉便器处女', { 'talent:204': 1, 'talent:0': 1 }, '尻穴便器女优'],
    ['肉便器兜底', { 'talent:204': 1 }, '痴女女优'],
    ['肉便器男性兜底', { 'talent:204': 1, 'talent:122': 1 }, '痴汉男优'],
    ['肉便器总门关闭', { 'talent:75': 1 }, '下落不明'],
    ['药物上瘾', { 'talent:46': 1 }, '药物中毒的娼妓'],
    ['启示契机', { 'talent:316': 3 }, '新兴宗教的信者'],
    ['梦境契机', { 'talent:316': 18 }, '新兴宗教的信者'],
    ['故乡恋人', { 'talent:317': 4 }, '下落不明', '曾经的爱人'],
    ['憧憬对象', { 'talent:317': 11 }, '下落不明', '曾经的爱人'],
    ['拯救故乡', { 'talent:316': 7 }, '慰安用肉便器'],
    ['原贵族', { 'talent:315': 8 }, '高级娼妓'],
    ['欠债契机', { 'talent:316': 2 }, '下等娼妓'],
    ['喜爱家庭', { 'talent:317': 8 }, '乱伦女忧'],
    ['喜爱家庭男性', { 'talent:317': 8, 'talent:122': 1 }, '乱伦男忧'],
    ['兽奸中毒', { 'abl:39': 1 }, '变态兽奸女'],
    ['兽奸中毒男性', { 'abl:39': 1, 'talent:122': 1 }, '兽奸变态'],
    ['精液中毒', { 'abl:32': 1 }, '精液便器'],
    ['露出癖', { 'abl:17': 1 }, '露出狂'],
    ['抖M气质', { 'abl:21': 1 }, '口交母猪'],
    ['容易自慰', { 'talent:60': 1 }, '自慰狂'],
    ['自慰狂', { 'talent:74': 1 }, '自慰狂'],
    ['短小扶她', { 'talent:121': 1, 'talent:318': 2 }, '扶她色情狂'],
    ['扶她', { 'talent:121': 1 }, '扶她嫖客'],
    ['私处封印', { 'talent:273': 1 }, '肮脏的屁眼交易'],
    ['喜欢唱歌', { 'talent:317': 3 }, '不入流的歌手'],
    ['喜欢跳舞', { 'talent:317': 6 }, '不入流的舞者'],
    ['喜欢绘画', { 'talent:317': 7 }, '不入流的画家'],
    ['喜欢小说', { 'talent:317': 18 }, '不入流的小说家'],
    ['原娼妓', { 'talent:315': 5 }, '娼妓'],
    ['原乞丐', { 'talent:315': 7 }, '乞丐'],
    ['原贫民', { 'talent:315': 9 }, '贫民'],
    ['普通兜底', {}, '下落不明'],
    ['最高优先级覆盖肉便器', { 'talent:244': 1, 'talent:204': 1 }, '玩物'],
    [
      '肉便器内滥交覆盖兽奸',
      { 'talent:204': 1, 'talent:75': 1, 'abl:39': 1 },
      '淫娃荡妇',
    ],
    [
      '药瘾覆盖成为勇者契机',
      { 'talent:46': 1, 'talent:316': 3 },
      '药物中毒的娼妓',
    ],
  ];

  for (const [label, values, expected, marker] of cases) {
    const actual = await evaluate_ordinary_fate(values);
    assert.equal(actual.fate, expected, label);
    if (marker) {
      assert(
        actual.lines.some((line) => line.includes(marker)),
        `${label} 应输出分支特征 ${marker}`,
      );
    }
  }
});

test('BANISHMENT：原贵族普通末路区分无姐妹、姐姐、妹妹和姐妹', async () => {
  const cases = [
    [0, null],
    [100000, '美丽贵妇的姐姐'],
    [10000000, '美丽贵妇的妹妹'],
    [10100000, '美丽贵妇的姐妹们'],
  ];
  for (const [relatives, marker] of cases) {
    const actual = await evaluate_ordinary_fate({
      'talent:315': 8,
      'talent:320': relatives,
    });
    assert.equal(actual.fate, '高级娼妓');
    const family_lines = actual.lines.filter((line) =>
      line.includes('美丽贵妇'),
    );
    if (marker) assert(family_lines.some((line) => line.includes(marker)));
    else assert.equal(family_lines.length, 0);
  }
});

test('BANISHMENT：回归前世叙述覆盖全部职业与可选句开关', async () => {
  const base_cases = [
    [0, '下落不明'],
    [1, '学生'],
    [2, '神殿'],
    [3, '农民'],
    [4, '渔夫'],
    [5, '卖淫生涯'],
    [6, '犯罪分子'],
    [7, '廉价娼妇'],
    [8, '贵族社交圈'],
    [9, '贫民'],
    [10, '守墓人'],
    [11, '神殿'],
    [12, '神殿'],
    [13, '神殿'],
    [14, '占卜师'],
    [15, '今天，你进去了么'],
    [16, '寂静的村庄'],
    [17, '隐居生活'],
    [18, '买面包'],
    [19, '从军之路'],
    [20, '奴隶生涯'],
    [21, '平静的主妇生活'],
    [22, '下落不明'],
  ];
  for (const [former, marker] of base_cases) {
    const lines = await evaluate_former_life_narration({
      'talent:315': former,
    });
    assert(
      lines.some((line) => line.includes(marker)),
      `前世 ${former}`,
    );
  }

  const optional_lines = [
    [1, { 'talent:204': 1 }, '学校里有名的荡妇'],
    [1, { 'talent:48': 1 }, '眼镜看上去颇有学霸'],
    [1, { 'talent:180': 1 }, '靠援交挣钱'],
    [2, { 'abl:13': 1 }, '舔弄阴茎'],
    [2, { 'talent:52': 1 }, '舔弄阴茎'],
    [2, { 'abl:3': 1 }, '尻穴买春'],
    [2, { 'talent:106': 1 }, '尻穴买春'],
    [3, { 'talent:13': 1 }, '每日下地辛勤地耕作'],
    [3, { 'exp:56': 5 }, '农耕用的家畜'],
    [4, { 'talent:13': 1 }, '修补渔网'],
    [4, { 'exp:74': 5 }, '张开双腿挣点外快'],
    [5, { 'abl:21': 1 }, '手活不错'],
    [5, { 'abl:17': 1 }, '公开场合卖淫'],
    [5, { 'talent:28': 1 }, '公开场合卖淫'],
    [6, { 'abl:22': 1 }, '诱拐女性'],
    [6, { 'talent:81': 1 }, '诱拐女性'],
    [6, { 'talent:82': 1 }, '诱拐女性'],
    [7, { 'talent:180': 1 }, '最底层的站街女'],
    [8, { 'abl:11': 1 }, '疯狂手淫'],
    [8, { 'talent:102': 1 }, '疯狂手淫'],
    [8, { 'talent:60': 1 }, '疯狂手淫'],
    [9, { 'exp:70': 5 }, '水晶球视频流出'],
    [10, { 'abl:17': 1 }, '全裸的守墓人'],
    [10, { 'talent:28': 1 }, '全裸的守墓人'],
    [11, { 'abl:3': 1 }, '肛交卖淫'],
    [11, { 'talent:106': 1 }, '肛交卖淫'],
    [12, { 'abl:13': 1 }, '少年神官的肉棒'],
    [12, { 'talent:52': 1 }, '少年神官的肉棒'],
    [13, { 'abl:13': 1 }, '少年神官的肉棒'],
    [14, { 'abl:11': 1 }, '性骚扰的元素'],
    [14, { 'talent:36': 1 }, '性骚扰的元素'],
    [15, { 'talent:204': 1 }, '可疑“副业”'],
    [16, { 'abl:17': 1 }, '森林中脱光衣服'],
    [16, { 'talent:28': 1 }, '森林中脱光衣服'],
    [17, { 'abl:17': 1 }, '主演的水晶球视频'],
    [17, { 'talent:28': 1 }, '主演的水晶球视频'],
    [18, { 'talent:204': 1 }, '可疑“副业”'],
    [19, { 'exp:70': 5 }, '军队内部'],
    [20, { 'talent:143': 1 }, '少年主人'],
    [20, { 'talent:13': 1 }, '少年主人'],
    [21, { 'exp:56': 5 }, '宠物犬'],
    [21, { 'talent:122': 1 }, '平静的主夫生活'],
  ];
  for (const [former, values, marker] of optional_lines) {
    const off = await evaluate_former_life_narration({
      'talent:315': former,
    });
    const on = await evaluate_former_life_narration({
      'talent:315': former,
      ...values,
    });
    assert(
      !off.some((line) => line.includes(marker)),
      `前世 ${former} 关闭 ${marker}`,
    );
    assert(
      on.some((line) => line.includes(marker)),
      `前世 ${former} 开启 ${marker}`,
    );
  }

  for (const [former, family, marker] of [
    [3, 'exp:56', '农耕用的家畜'],
    [4, 'exp:74', '张开双腿挣点外快'],
    [9, 'exp:70', '水晶球视频流出'],
    [19, 'exp:70', '军队内部'],
    [21, 'exp:56', '宠物犬'],
  ]) {
    const below = await evaluate_former_life_narration({
      'talent:315': former,
      [family]: 4,
    });
    const at = await evaluate_former_life_narration({
      'talent:315': former,
      [family]: 5,
    });
    assert(!below.some((line) => line.includes(marker)), `${former} 门槛下侧`);
    assert(
      at.some((line) => line.includes(marker)),
      `${former} 门槛命中侧`,
    );
  }
});

test('BANISHMENT：肉便器录像后日谈覆盖全部前世分支与优先级', async () => {
  const cases = [
    [{ 'talent:317': 4 }, '昔日的恋人'],
    [{ 'talent:317': 11 }, '昔日的恋人'],
    [{ 'talent:315': 1 }, '一直单恋着温妮的同学'],
    [{ 'talent:315': 8 }, '高级贵族温妮'],
    [{ 'talent:315': 12 }, '圣女温妮'],
    [{ 'talent:315': 12, 'talent:122': 1 }, '圣者温妮'],
    [{ 'talent:315': 15 }, '商店看板娘温妮'],
    [{ 'talent:315': 15, 'talent:122': 1 }, '商人温妮'],
    [{ 'talent:315': 18 }, '面包店看板娘温妮'],
    [{ 'talent:315': 18, 'talent:122': 1 }, '面包店店员温妮'],
    [{ 'talent:315': 19 }, '原本是温妮部下的军人们'],
  ];
  for (const [values, marker] of cases) {
    const fixture = seed_world();
    set_banishment_values(fixture, { 'talent:204': 1, ...values });
    fixture.set_inputs(0);
    const { banishment } = fixture.load_module('event/event-banishment');
    await banishment(31, seq([0]));
    assert(
      fixture.text_lines().some((line) => line.includes(marker)),
      JSON.stringify(values),
    );
  }

  const priority = seed_world();
  set_banishment_values(priority, {
    'talent:204': 1,
    'talent:317': 4,
    'talent:315': 1,
  });
  priority.set_inputs(0);
  const { banishment } = priority.load_module('event/event-banishment');
  await banishment(31, seq([0]));
  assert(priority.text_lines().some((line) => line.includes('昔日的恋人')));
  assert(
    !priority.text_lines().some((line) => line.includes('一直单恋着温妮')),
  );
});

test('BANISHMENT：动物末路逐支重掷并覆盖马犬鸟兔羊狐猫', async () => {
  const cases = [
    [[0], '一匹马', 'My little Pony！'],
    [[7, 1], '一条狗', '汪？'],
    [[7, 7, 2], '一只小鸟', '吱？'],
    [[7, 7, 7, 3], '一只兔子', '颤抖的双耳'],
    [[7, 7, 7, 7, 4], '一只羊', '羊……'],
    [[7, 7, 7, 7, 7, 5], '一只狐狸', '狐狸'],
    [[7, 7, 7, 7, 7, 7], '一只猫', '喵~'],
  ];
  for (const [rolls, animal, expected] of cases) {
    const fixture = seed_world();
    fixture.set_inputs(3);
    const { banishment } = fixture.load_module('event/event-banishment');
    let calls = 0;
    await banishment(31, () => rolls[calls++]);
    assert.equal(
      fixture.store.get('videoarchive:31'),
      `${expected}温妮`,
      animal,
    );
    assert.equal(calls, rolls.length, `${animal} 的重掷次数`);
    assert(
      fixture.text_lines().some((line) => line.includes(animal)),
      `${animal} 的变形演出`,
    );
  }
});

test('BANISHMENT：动物放生保留主角名与失去人类记忆的结句', async () => {
  const fixture = seed_world();
  fixture.store.set('callname:0:-1', '魔王');
  fixture.set_inputs(3);
  const { banishment } = fixture.load_module('event/event-banishment');

  await banishment(31, seq([0]));

  assert(
    fixture
      .text_lines()
      .includes('温妮所有的力量都在被魔王打上烙印的那一瞬间封印了，'),
  );
  assert(fixture.text_lines().includes('随后魔王将她变成了一匹马的样子。'));
  assert(fixture.text_lines().includes('魔王将已经变成小动物的温妮放逐了。'));
  assert(fixture.text_lines().includes('她以后不会记得自己曾经是人类了……'));
});

test('BANISHMENT：诅咒、失忆与回归前世均使用实际主角名', async () => {
  for (const [choice, marker] of [
    [2, '被魔王抹去记忆的温妮'],
    [4, '温妮所有的力量都在被魔王打上烙印'],
  ]) {
    const fixture = seed_world();
    fixture.store.set('callname:0:-1', '魔王');
    fixture.set_inputs(choice);
    const { banishment } = fixture.load_module('event/event-banishment');
    await banishment(31, seq([0]));
    assert(
      fixture.text_lines().some((line) => line.includes(marker)),
      `${choice}`,
    );
  }

  const rewritten = seed_world();
  rewritten.store.set('callname:0:-1', '魔王');
  rewritten.store.set('talent:31:163', 1); // 高贵性格 → K3
  rewritten.set_inputs(2);
  const { banishment } = rewritten.load_module('event/event-banishment');
  const { banishment_koujo_family } = rewritten.load_module('kojo/kojo-system');
  banishment_koujo_family.register(3, async () => {
    rewritten.store.set('tflag:510', 1);
    return 0;
  });
  await banishment(31, seq([0]));
  assert(
    rewritten.text_lines().some((line) => line.includes('被魔王男性化的温妮')),
  );
});

test('EXECUTION：使用稳定角色 ID 选择第二名角色并路由到固定示众', async () => {
  const fixture = seed_world();
  fixture.set_inputs(1, 6);
  const { execution } = fixture.load_module('event/event-execution');

  await execution(seq([0]));

  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 31, 47]);
  assert.equal(fixture.store.get('cflag:47:1'), 8);
  assert.equal(fixture.store.get('videoarchive:47'), undefined);
  assert(fixture.text_lines().some((line) => line.includes('艾达')));
});

test('EXECUTION：收藏角色不能走除士兵化外的处刑方式', async () => {
  const fixture = seed_world();
  fixture.store.set('cflag:47:700', 1);
  fixture.set_inputs(1, 0, 5);
  const { execution } = fixture.load_module('event/event-execution');

  await execution(seq([0]));

  assert.equal(fixture.store.get('talent:47:254'), 1);
  assert(fixture.text_lines().includes('艾达在收藏列表之中，不能被处刑。'));
});

test('EXECUTION：肉便器支完整结算，录像开关关闭时不额外写书架', async () => {
  const fixture = seed_world();
  fixture.store.set('cflag:47:1', 2); // 排除第二候选，处分后不重画
  fixture.store.set('talent:31:121', 1); // 扶她条件文案
  fixture.store.set('talent:31:312', 12); // 魅力点文案
  fixture.set_inputs(0, 4);
  const { execution } = fixture.load_module('event/event-execution');

  await execution(seq([0]));

  assert.equal(fixture.store.get('flag:83'), 1);
  assert.equal(fixture.store.get('videoarchive:0'), undefined);
  assert.equal(fixture.store.get('videoarchive:31'), undefined);
  assert.equal(fixture.store.get('tstr:30'), '');
  assert(
    fixture
      .text_lines()
      .includes('作为魅力点的美乳，现在变成一堆丑陋膨胀的肉块了。'),
  );
});

test('INFRASTRUCTURE：无奴隶时提前返回；展品统计按对应计数输出', async () => {
  const empty = create_era_fixture();
  const { infrastructure: empty_view } = empty.load_module(
    'page/page-infrastructure',
  );
  await empty_view(0);
  assert.deepEqual(empty.text_lines(), [
    '没有待机中的奴隶，没有人能保护你，并挡住可能出现的勇者。',
  ]);

  const fixture = seed_world();
  fixture.store.set('flag:600', 2);
  fixture.set_inputs(0);
  const { infrastructure } = fixture.load_module('page/page-infrastructure');
  await infrastructure(2);
  assert(fixture.text_lines().includes('博物馆内现在有 2个石像。'));
  assert(
    fixture.text_lines().includes('那些话语和传说，已经不会被传达到了吧……'),
  );
});

test('INFRASTRUCTURE：人类牧场可切换播种者、记录与出售开关', async () => {
  const fixture = seed_world();
  fixture.store.set('flag:83', 1);
  fixture.set_inputs(51, 0, 3, 1, 2, 999);
  const { infrastructure } = fixture.load_module('page/page-infrastructure');

  await infrastructure(2);

  assert.equal(fixture.store.get('flag:613'), 3);
  assert.equal(fixture.store.get('flag:614'), 3);
});

test('INFRASTRUCTURE：零台肉便器时牧场提示后立即返回', async () => {
  const fixture = seed_world();
  fixture.set_inputs(51, 100);
  const { infrastructure } = fixture.load_module('page/page-infrastructure');

  await infrastructure(2);

  assert(fixture.text_lines().includes('还没放置过肉便器。'));
  assert(!fixture.text_lines().includes('各种设定'));
});

test('INFRASTRUCTURE：牧场四种播种者分别显示对应使用者与说明', async () => {
  const cases = [
    [0, '怪物们使用着。', null],
    [1, '俘虏的中年们使用着。', '俘虏的中年的黏稠腥臭的精液'],
    [2, '俘虏的少年们使用着。', '俘虏的少年年轻的浓稠精液'],
    [3, '扶她淫魔们使用着。', '扶她淫魔的媚药精液'],
  ];
  for (const [seed, usage, detail] of cases) {
    const fixture = seed_world();
    fixture.store.set('flag:83', 1);
    fixture.store.set('flag:613', seed);
    fixture.set_inputs(51, 999, 100);
    const { infrastructure } = fixture.load_module('page/page-infrastructure');

    await infrastructure(2);

    assert(fixture.text_lines().includes(usage), `播种者 ${seed} 的使用者`);
    if (detail) {
      assert(
        fixture.text_lines().some((line) => line.includes(detail)),
        `播种者 ${seed} 的专属说明`,
      );
    }
  }
});

test('NAEDOKO：女性苗床结算经验、丧失处女并执行妊娠判定', async () => {
  const fixture = seed_world();
  fixture.store.set('talent:31:209', 1);
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('cflag:0:9', 4);
  const { run_seedbed } = fixture.load_module('system/train/seedbed');

  await run_seedbed(31, seq([7]));

  assert.equal(fixture.store.get('cflag:31:1'), 7);
  assert.equal(fixture.store.get('talent:31:0'), 0);
  assert.equal(fixture.store.get('juel:31:1'), 40);
  assert.equal(fixture.store.get('juel:31:2'), 40);
  assert.equal(fixture.store.get('exp:31:0'), 4);
  assert.equal(fixture.store.get('exp:31:1'), 4);
  assert.equal(fixture.store.get('exp:31:2'), 4);
  assert.equal(fixture.store.get('exp:31:20'), 4);
  assert.equal(fixture.store.get('exp:31:80'), 4);
  assert.equal(fixture.store.get('cflag:31:107'), 0, '妊娠判定会消费射精计数');
});

test('NAEDOKO：男性分支使用确定性随机源选择种马或肛门业务', async () => {
  const man = seed_world();
  man.store.set('cflag:31:1', 7);
  man.store.set('talent:31:122', 1);
  man.store.set('talent:31:1', 1);
  man.store.set('cflag:0:9', 3);
  const { run_seedbed: run_man } = man.load_module('system/train/seedbed');
  await run_man(31, seq([0]));
  assert.equal(man.store.get('talent:31:1'), 0);
  assert.equal(man.store.get('juel:31:0'), 30);
  assert.equal(man.store.get('exp:31:3'), 3);

  const anal = seed_world();
  anal.store.set('cflag:31:1', 7);
  anal.store.set('talent:31:122', 1);
  anal.store.set('cflag:0:9', 3);
  const { run_seedbed: run_anal } = anal.load_module('system/train/seedbed');
  await run_anal(31, seq([1]));
  assert.equal(anal.store.get('juel:31:2'), 30);
  assert.equal(anal.store.get('exp:31:80'), 15);
});

test('苗床妊娠：怪物精液判定成功后写短孕期与特殊父亲', () => {
  const fixture = seed_world();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { conception_check_syoku_to_t, in_vagina_syoku_to_t } =
    fixture.load_module('event/event-pregnancy');
  era_flag.target = 31;
  era_flag.day_count = 20;
  fixture.store.set('flag:5', 4); // 妊娠系统启用
  fixture.store.set('cflag:31:107', 100);

  in_vagina_syoku_to_t(() => 0);
  conception_check_syoku_to_t(() => 2);

  assert.equal(fixture.store.get('cflag:31:102'), 6);
  assert.equal(fixture.store.get('cflag:31:107'), 0);
  assert.equal(fixture.store.get('cflag:31:110'), 32);
  assert.equal(fixture.store.get('cflag:31:111'), -3);
});

test('处刑口上：K2 与 K4 注册四种处刑处理器', () => {
  const fixture = create_era_fixture();
  const {
    banishment_koujo_family,
    exucution_koujo_family,
    grotesque_koujo_family,
    public_exucution_koujo_family,
  } = fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k2-timid');
  fixture.load_module('kojo/kojo-k4-stoic');

  for (const family of [
    banishment_koujo_family,
    exucution_koujo_family,
    grotesque_koujo_family,
    public_exucution_koujo_family,
  ]) {
    assert.equal(family.has(2), true);
    assert.equal(family.has(4), true);
  }
});
