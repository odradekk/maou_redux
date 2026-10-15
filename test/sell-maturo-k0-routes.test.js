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

/**
 * 每条末路的首行文案与结局名（默认 ctx：无素质、随机源取 0，故走各末路的「假侧」）。
 * 表与 ENDINGS 一一对应：少一条、多一条、换错末路函数（首行不同）都会红。
 * love_other_lt100k 族末行覆盖结局，那条末路的期望结局名因此是空串。
 */
const ENDING_TEXTS = [
  [
    'rebel_matu_ge100k_arena',
    '温妮在奴隶船上叫醒了其它奴隶，发动了叛乱。',
    '鲨鱼的食物',
  ],
  [
    'rebel_matu_ge100k_captive',
    '作为原勇者的温妮，现在双手双脚都被锁链锁着，在港口做苦力。',
    '苦力奴隶',
  ],
  [
    'rebel_matu_lt100k_runaway',
    '温妮在奴隶小屋准备转运奴隶的时候试图逃走。',
    '瞎子奴隶',
  ],
  [
    'rebel_matu_lt100k_butcher',
    '「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦！」',
    '生物标本',
  ],
  [
    'rebel_other_ge100k_taxidermy',
    '「客人客人！过来看过来挑啊！这里可是有好东西哦！？」',
    '标本',
  ],
  ['rebel_other_ge100k_arena', '温妮作为死斗场的角斗士在战斗着。', '角斗士'],
  [
    'rebel_other_ge100k_captive',
    '作为船底仓的划桨奴隶，被锁在桨上。',
    '划桨奴隶',
  ],
  [
    'rebel_other_lt100k_furniture',
    '「哈哈～像你这种沉默不语的最可爱了！」',
    '活着的桌子',
  ],
  [
    'rebel_other_lt100k_butcher',
    '「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦」',
    '生物标本',
  ],
  ['love_matu_ge1m_general', '将军对温妮的肉穴相当粗暴。', '性奴隶'],
  [
    'love_matu_ge1m_noble',
    '温妮在屋里做着女仆和情人的工作。',
    '魔界贵族的情人',
  ],
  [
    'love_matu_ge1m_high_priest',
    '温妮作为神官长的第五个情妇每晚都被侵犯。',
    '性奴女神官',
  ],
  [
    'love_matu_ge1m_tycoon',
    '温妮作为土豪的第八个情妇被买下了，总是如影随形地跟着。',
    '土豪的情人',
  ],
  [
    'love_matu_ge500k_gang_boss',
    '在魔界也是首屈一指的繁荣城市里，温妮成为了黑社会的一员。',
    '黑老大的情人',
  ],
  [
    'love_matu_ge500k_lord',
    '温妮因为年轻，被作为年幼的领主的玩具一样被放置在他的身边。',
    '领主的玩物',
  ],
  [
    'love_matu_ge500k_temple',
    '神殿新设置了堕落神的贡品，所有信徒都可以无偿侵犯。',
    '邪神殿的性奴',
  ],
  [
    'love_matu_ge500k_merchant',
    '作为情妇被买下的温妮老老实实地侍奉着自己的主人。',
    '商人的情人',
  ],
  [
    'love_matu_ge100k_officer',
    '士官在战场上立功了，用奖金买下了温妮。',
    '士官的性奴',
  ],
  [
    'love_matu_ge100k_academy',
    '作为学生的性处理便器而购买的温妮，作用还不止于此，',
    '异种交配实验体',
  ],
  [
    'love_matu_ge100k_farm',
    '大农场主在买农奴的时候顺便买下了温妮。',
    '大农场主的性奴隶',
  ],
  ['love_matu_ge100k_dealer', '温妮作为素材被妖术师买下了。', '魔改肉块'],
  [
    'love_matu_lt100k_mine_owner',
    '温妮作为开矿奴隶的慰问品被饲养着。',
    '矿山性奴',
  ],
  [
    'love_matu_lt100k_bar',
    '在店主和客人之间周旋，温妮像个娼妇一样地活着。',
    '酒馆女侍应',
  ],
  [
    'love_matu_lt100k_farm',
    '温妮和其它几个奴隶作为农奴被买下了。',
    '农奴的共妻',
  ],
  [
    'love_matu_lt100k_toilet',
    '温妮作为公众肉便器不分昼夜地被使用着。',
    '肉便器',
  ],
  ['love_other_ge1m_general', '将军对温妮的肉穴相当粗暴。', '魔界将军的性奴'],
  [
    'love_other_ge1m_noble',
    '作为主人专用宠物的温妮，在主人有意不弄伤的情况下用拘束具锁着。',
    '贵族的宠物',
  ],
  [
    'love_other_ge1m_high_priest',
    '成为神官长奴隶的温妮，每晚都参加妖邪的仪式。',
    '性奴女神官',
  ],
  [
    'love_other_ge1m_tycoon',
    '作为土豪宠物的温妮，对主人相当顺从。',
    '土豪的宠物',
  ],
  [
    'love_other_ge500k_gang_boss',
    '温妮作为顺从的宠物与主人一起努力着。',
    '驯化的宠物',
  ],
  ['love_other_ge500k_lord', '温妮成为了供客人使用的肉被子，', '宴客肉被子'],
  [
    'love_other_ge500k_temple',
    '神殿新设置了堕落神的贡品，温妮作为贡品，被堕落信徒没完没了地侵犯着。',
    '神殿的性奴',
  ],
  [
    'love_other_ge500k_merchant',
    '作为宠物被买下的温妮老实的顺从着自己的主人。',
    '大商人的宠物',
  ],
  [
    'love_other_ge100k_officer',
    '士官将第一次军功的奖金，交给了温妮，',
    '士官的性奴',
  ],
  [
    'love_other_ge100k_academy',
    '作为学生的性处理便器而购买的温妮每天都被学生们侵犯。',
    '学生的玩具',
  ],
  [
    'love_other_ge100k_farm',
    '大农场主在买农奴的时候顺便买下了温妮。',
    '农场主的性奴',
  ],
  ['love_other_ge100k_dealer', '温妮作为素材被妖术师买下了。', '肉便器'],
  [
    'love_other_lt100k_mine_owner',
    '温妮作为开矿奴隶的慰问品被饲养着。',
    '矿山性奴',
  ],
  [
    'love_other_lt100k_bar',
    '店主对客人介绍她的时候，会特意提醒她可以出台。',
    '酒馆女侍应',
  ],
  [
    'love_other_lt100k_farm',
    '为了做出新品种的家畜让温妮和一切的家畜交配。',
    '异种交配家畜',
  ],
  ['love_other_lt100k_toilet', '温妮作为公众肉便器不分昼夜地被使用着。', ''],
  [
    'lewd_matu_ge1m_spy_agency',
    '作为淫魔且拥有极品身体的温妮对讯问官手舞足蹈着，',
    '谍报组织的提审官',
  ],
  [
    'lewd_matu_ge1m_high_brothel',
    '温妮彻底堕落的身体让所有客人都很尽兴。从现在这个在男人身上淫乱不堪的样子，根本无法想象她曾经作为勇者挥剑战斗。',
    '高级娼妇',
  ],
  ['lewd_matu_ge1m_high_priest', '温妮被带到神殿的深处。', '堕落神的巫女'],
  [
    'lewd_matu_ge1m_magnate',
    '「知道她的主人为她花费了多少吗？」正当客人这样窃窃私语的时候，温妮在掌声中入场了。',
    '扩张奴隶',
  ],
  [
    'lewd_matu_ge500k_high_officer',
    '温妮现在作为主人的情人生活着。',
    '高级将校的情人',
  ],
  [
    'lewd_matu_ge500k_high_bar',
    '温妮每晚都参加舞台上各式各样的表演。',
    '高级酒馆的表演者',
  ],
  [
    'lewd_matu_ge500k_temple',
    '温妮每天从神殿开门到神殿关门，都被信徒们侵犯着。',
    '堕落神的性奴',
  ],
  [
    'lewd_matu_ge500k_busybody',
    '温妮的手脚都被砍断了，作为主人的抱枕而存在着。',
    '好事者的抱枕',
  ],
  [
    'lewd_matu_ge100k_gang',
    '温妮成为黑社会的一员了。作为成员情妇的温妮每晚都要侍奉不同的男人。',
    '黑社会的情妇',
  ],
  [
    'lewd_matu_ge100k_brothel',
    '温妮被放在橱窗里吸引客人。不知是否是妓院主人的爱好，她的脸的右侧被画上了下流的图案。',
    '刺青娼妇',
  ],
  [
    'lewd_matu_ge100k_shady_bar',
    '贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。',
    '黑酒吧的女侍应',
  ],
  ['lewd_matu_ge100k_casino', '温妮成为了赌场的赠品。', '赌场的赠品'],
  [
    'lewd_matu_lt100k_bar',
    '周末，这种酒吧都会搞一些特别的活动。',
    '酒吧的赠品',
  ],
  [
    'lewd_matu_lt100k_beggar',
    '晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。',
    '乞丐的妻子',
  ],
  [
    'lewd_matu_lt100k_tentacle_hut',
    '温妮被安排在量产触手的触手小屋里，',
    '触手的苗床',
  ],
  [
    'lewd_matu_lt100k_toilet',
    '温妮作为市民的公众肉便器，不分昼夜地被使用着。',
    '公众肉便器',
  ],
  [
    'lewd_other_ge1m_spy_school',
    '将所有知道的地面情报都供出了之后，被当作活教材被收容在设施里。',
    '间谍教材',
  ],
  [
    'lewd_other_ge1m_high_brothel',
    '作为完全调教的奴隶而被买入的温妮，马上就被客人指名了。',
    '高级娼妇',
  ],
  ['lewd_other_ge1m_high_priest', '温妮被带到了神殿深处。', '堕落神的巫女'],
  ['lewd_other_ge1m_magnate', '温妮被装上台座，被放到屋里。', '大富豪的收藏品'],
  [
    'lewd_other_ge500k_high_officer',
    '作为主人的其中一个新奴隶住在屋子里。',
    '高级将校的奴隶',
  ],
  [
    'lewd_other_ge500k_high_bar',
    '温妮被指派专门接待脾气不好的客人。但被客人责骂，温妮也感到相当愉悦。',
    '高级酒馆的女侍应',
  ],
  [
    'lewd_other_ge500k_temple',
    '温妮每天从神殿开门到神殿关门，都被信徒们侵犯着。',
    '堕落神的巫女',
  ],
  ['lewd_other_ge500k_busybody', '作为好事者的抱枕被使用着。', '好事者的抱枕'],
  [
    'lewd_other_ge100k_gang',
    '温妮作为虐待狂干部的情妇生活着。',
    '黑社会的情妇',
  ],
  [
    'lewd_other_ge100k_brothel',
    '温妮隔着橱窗招揽客人，看上去已经习惯自己的妆容了。',
    '橱窗娼妇',
  ],
  [
    'lewd_other_ge100k_shady_bar',
    '贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。',
    '黑酒馆的瘾君子',
  ],
  ['lewd_other_ge100k_casino', '温妮成为了赌场的赠品。', '赌场的赠品'],
  [
    'lewd_other_lt100k_bar',
    '周末，这种酒吧都会搞一些特别的表演。',
    '酒吧的赠品',
  ],
  [
    'lewd_other_lt100k_beggar',
    '温妮晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。',
    '乞丐的妻子',
  ],
  [
    'lewd_other_lt100k_tentacle_hut',
    '温妮被安排在量产触手的触手小屋里，',
    '触手的苗床',
  ],
  [
    'lewd_other_lt100k_toilet',
    '被锁在公厕里的温妮，作为公众肉便器开始了无休止的侍奉。',
    '公众肉便器',
  ],
  [
    'normal_matu_ge500k_high_officer',
    '主人把温妮当作宠物来饲养。',
    '高级将校的宠物',
  ],
  ['normal_matu_ge500k_lord', '温妮被领主送给儿子当新玩具。', '领主孩子的玩具'],
  [
    'normal_matu_ge500k_temple',
    '温妮因为被发现信奉着其它的神，立刻被带到了地下室。',
    '堕落神的信徒',
  ],
  [
    'normal_matu_ge500k_merchant',
    '温妮作为主人的第五个性奴隶在宅邸的地下室生活着。',
    '性奴隶',
  ],
  [
    'normal_matu_ge100k_officer',
    '温妮作为奖赏，赏给立了战功的士官。',
    '士官的性奴',
  ],
  [
    'normal_matu_ge100k_brothel',
    '温妮被放在橱窗里吸引客人。不知是否是妓院主人的爱好，她的脸的右侧被画上了下流的图案。',
    '橱窗娼妇',
  ],
  [
    'normal_matu_ge100k_farm',
    '大农场的主人在买其它农奴的时候顺便买下了温妮，作为礼物送给自己的儿子们。',
    '大农场里的玩具',
  ],
  ['normal_matu_ge100k_casino', '温妮成为了赌场的赠品。', '赌场赠品'],
  [
    'normal_matu_lt100k_mine_owner',
    '温妮作为开矿奴隶的慰问品被饲养着。',
    '矿山性奴',
  ],
  [
    'normal_matu_lt100k_bar',
    '周末，这种酒吧都会搞一些特别的活动。',
    '酒吧的玩具',
  ],
  [
    'normal_matu_lt100k_tentacle_hut',
    '温妮被安排在量产触手的触手小屋里，',
    '触手的苗床',
  ],
  [
    'normal_matu_lt100k_toilet',
    '温妮作为公众肉便器不分昼夜地被使用着。',
    '公众肉便器',
  ],
  [
    'normal_other_ge500k_high_officer',
    '主人把温妮当作宠物来饲养。',
    '高级将校的宠物',
  ],
  [
    'normal_other_ge500k_lord',
    '温妮被领主送给儿子当新玩具。',
    '领主孩子的玩具',
  ],
  [
    'normal_other_ge500k_temple',
    '温妮因为被发现信奉着其它的神，立刻被带到了地下室。',
    '堕落神的信徒',
  ],
  [
    'normal_other_ge500k_merchant',
    '温妮作为主人的宠物生活在屋里。',
    '大商人的宠物',
  ],
  ['normal_other_ge100k_officer', '年轻的士官用奖金买下了温妮。', '士官的性奴'],
  [
    'normal_other_ge100k_brothel',
    '温妮成为了专门收集异族美女的妓院里的奴隶。',
    '异种专用娼妇',
  ],
  [
    'normal_other_ge100k_farm',
    '为了做出新品种的家畜而让温妮和所有的家畜交配。',
    '家畜奴隶',
  ],
  ['normal_other_ge100k_casino', '温妮成为了赌场里的赛狗。', '赌场的狗'],
  [
    'normal_other_lt100k_mine_owner',
    '温妮作为开矿奴隶的慰问品被饲养着。',
    '矿山性奴',
  ],
  [
    'normal_other_lt100k_bar',
    '周末，这种酒吧都会搞一些特别的活动。',
    '酒吧的玩具',
  ],
  [
    'normal_other_lt100k_tentacle_hut',
    '温妮被安排在量产触手的触手小屋里，',
    '触手的苗床',
  ],
  [
    'normal_other_lt100k_toilet',
    '温妮作为公众肉便器，不分昼夜地被使用着。',
    '公众肉便器',
  ],
];

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

/**
 * 末路族 × 末路编号 → 该末路的第一行正文。族末行覆盖结局的族（love_other_lt100k
 * 四条末路都归到同一个结局名）只有这张表能区分各末路发的是哪段正文。
 */
const LEAF_TEXTS = [
  [
    'rebel_matu_ge100k',
    0,
    '作为原勇者的温妮，现在双手双脚都被锁链锁着，在港口做苦力。',
  ],
  ['rebel_matu_ge100k', 1, '温妮在奴隶船上叫醒了其它奴隶，发动了叛乱。'],
  [
    'rebel_matu_lt100k',
    0,
    '「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦！」',
  ],
  ['rebel_matu_lt100k', 1, '温妮在奴隶小屋准备转运奴隶的时候试图逃走。'],
  ['rebel_other_ge100k', 0, '作为船底仓的划桨奴隶，被锁在桨上。'],
  ['rebel_other_ge100k', 1, '温妮作为死斗场的角斗士在战斗着。'],
  [
    'rebel_other_ge100k',
    2,
    '「客人客人！过来看过来挑啊！这里可是有好东西哦！？」',
  ],
  [
    'rebel_other_lt100k',
    0,
    '「知道逃脱的奴隶会怎么样吗？哎呀，即使不知道也马上会知道了哦」',
  ],
  ['rebel_other_lt100k', 1, '「哈哈～像你这种沉默不语的最可爱了！」'],
  [
    'love_matu_ge1m',
    0,
    '温妮作为土豪的第八个情妇被买下了，总是如影随形地跟着。',
  ],
  ['love_matu_ge1m', 1, '温妮作为神官长的第五个情妇每晚都被侵犯。'],
  ['love_matu_ge1m', 2, '温妮在屋里做着女仆和情人的工作。'],
  ['love_matu_ge1m', 3, '将军对温妮的肉穴相当粗暴。'],
  ['love_matu_ge500k', 0, '作为情妇被买下的温妮老老实实地侍奉着自己的主人。'],
  ['love_matu_ge500k', 1, '神殿新设置了堕落神的贡品，所有信徒都可以无偿侵犯。'],
  [
    'love_matu_ge500k',
    2,
    '温妮因为年轻，被作为年幼的领主的玩具一样被放置在他的身边。',
  ],
  [
    'love_matu_ge500k',
    3,
    '在魔界也是首屈一指的繁荣城市里，温妮成为了黑社会的一员。',
  ],
  ['love_matu_ge100k', 0, '温妮作为素材被妖术师买下了。'],
  ['love_matu_ge100k', 1, '大农场主在买农奴的时候顺便买下了温妮。'],
  ['love_matu_ge100k', 2, '作为学生的性处理便器而购买的温妮，作用还不止于此，'],
  ['love_matu_ge100k', 3, '士官在战场上立功了，用奖金买下了温妮。'],
  ['love_matu_lt100k', 0, '温妮作为公众肉便器不分昼夜地被使用着。'],
  ['love_matu_lt100k', 1, '温妮和其它几个奴隶作为农奴被买下了。'],
  ['love_matu_lt100k', 2, '在店主和客人之间周旋，温妮像个娼妇一样地活着。'],
  ['love_matu_lt100k', 3, '温妮作为开矿奴隶的慰问品被饲养着。'],
  ['love_other_ge1m', 0, '作为土豪宠物的温妮，对主人相当顺从。'],
  ['love_other_ge1m', 1, '成为神官长奴隶的温妮，每晚都参加妖邪的仪式。'],
  [
    'love_other_ge1m',
    2,
    '作为主人专用宠物的温妮，在主人有意不弄伤的情况下用拘束具锁着。',
  ],
  ['love_other_ge1m', 3, '将军对温妮的肉穴相当粗暴。'],
  ['love_other_ge500k', 0, '作为宠物被买下的温妮老实的顺从着自己的主人。'],
  [
    'love_other_ge500k',
    1,
    '神殿新设置了堕落神的贡品，温妮作为贡品，被堕落信徒没完没了地侵犯着。',
  ],
  ['love_other_ge500k', 2, '温妮成为了供客人使用的肉被子，'],
  ['love_other_ge500k', 3, '温妮作为顺从的宠物与主人一起努力着。'],
  ['love_other_ge100k', 0, '温妮作为素材被妖术师买下了。'],
  ['love_other_ge100k', 1, '大农场主在买农奴的时候顺便买下了温妮。'],
  [
    'love_other_ge100k',
    2,
    '作为学生的性处理便器而购买的温妮每天都被学生们侵犯。',
  ],
  ['love_other_ge100k', 3, '士官将第一次军功的奖金，交给了温妮，'],
  ['love_other_lt100k', 0, '温妮作为公众肉便器不分昼夜地被使用着。'],
  ['love_other_lt100k', 1, '为了做出新品种的家畜让温妮和一切的家畜交配。'],
  ['love_other_lt100k', 2, '店主对客人介绍她的时候，会特意提醒她可以出台。'],
  ['love_other_lt100k', 3, '温妮作为开矿奴隶的慰问品被饲养着。'],
  [
    'lewd_matu_ge1m',
    0,
    '「知道她的主人为她花费了多少吗？」正当客人这样窃窃私语的时候，温妮在掌声中入场了。',
  ],
  ['lewd_matu_ge1m', 1, '温妮被带到神殿的深处。'],
  [
    'lewd_matu_ge1m',
    2,
    '温妮彻底堕落的身体让所有客人都很尽兴。从现在这个在男人身上淫乱不堪的样子，根本无法想象她曾经作为勇者挥剑战斗。',
  ],
  ['lewd_matu_ge1m', 3, '作为淫魔且拥有极品身体的温妮对讯问官手舞足蹈着，'],
  ['lewd_matu_ge500k', 0, '温妮的手脚都被砍断了，作为主人的抱枕而存在着。'],
  ['lewd_matu_ge500k', 1, '温妮每天从神殿开门到神殿关门，都被信徒们侵犯着。'],
  ['lewd_matu_ge500k', 2, '温妮每晚都参加舞台上各式各样的表演。'],
  ['lewd_matu_ge500k', 3, '温妮现在作为主人的情人生活着。'],
  ['lewd_matu_ge100k', 0, '温妮成为了赌场的赠品。'],
  ['lewd_matu_ge100k', 1, '贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。'],
  [
    'lewd_matu_ge100k',
    2,
    '温妮被放在橱窗里吸引客人。不知是否是妓院主人的爱好，她的脸的右侧被画上了下流的图案。',
  ],
  [
    'lewd_matu_ge100k',
    3,
    '温妮成为黑社会的一员了。作为成员情妇的温妮每晚都要侍奉不同的男人。',
  ],
  ['lewd_matu_lt100k', 0, '温妮作为市民的公众肉便器，不分昼夜地被使用着。'],
  ['lewd_matu_lt100k', 1, '温妮被安排在量产触手的触手小屋里，'],
  [
    'lewd_matu_lt100k',
    2,
    '晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。',
  ],
  ['lewd_matu_lt100k', 3, '周末，这种酒吧都会搞一些特别的活动。'],
  ['lewd_other_ge1m', 0, '温妮被装上台座，被放到屋里。'],
  ['lewd_other_ge1m', 1, '温妮被带到了神殿深处。'],
  [
    'lewd_other_ge1m',
    2,
    '作为完全调教的奴隶而被买入的温妮，马上就被客人指名了。',
  ],
  [
    'lewd_other_ge1m',
    3,
    '将所有知道的地面情报都供出了之后，被当作活教材被收容在设施里。',
  ],
  ['lewd_other_ge500k', 0, '作为好事者的抱枕被使用着。'],
  ['lewd_other_ge500k', 1, '温妮每天从神殿开门到神殿关门，都被信徒们侵犯着。'],
  [
    'lewd_other_ge500k',
    2,
    '温妮被指派专门接待脾气不好的客人。但被客人责骂，温妮也感到相当愉悦。',
  ],
  ['lewd_other_ge500k', 3, '作为主人的其中一个新奴隶住在屋子里。'],
  ['lewd_other_ge100k', 0, '温妮成为了赌场的赠品。'],
  ['lewd_other_ge100k', 1, '贩毒的黑帮在自己经营的黑酒吧里，也流通着毒品。'],
  [
    'lewd_other_ge100k',
    2,
    '温妮隔着橱窗招揽客人，看上去已经习惯自己的妆容了。',
  ],
  ['lewd_other_ge100k', 3, '温妮作为虐待狂干部的情妇生活着。'],
  [
    'lewd_other_lt100k',
    0,
    '被锁在公厕里的温妮，作为公众肉便器开始了无休止的侍奉。',
  ],
  ['lewd_other_lt100k', 1, '温妮被安排在量产触手的触手小屋里，'],
  [
    'lewd_other_lt100k',
    2,
    '温妮晚上在主人的巢穴里被疼爱着，白天则被租给主人的乞丐朋友，为主人换取喝酒钱。',
  ],
  ['lewd_other_lt100k', 3, '周末，这种酒吧都会搞一些特别的表演。'],
  ['normal_matu_ge500k', 0, '温妮作为主人的第五个性奴隶在宅邸的地下室生活着。'],
  [
    'normal_matu_ge500k',
    1,
    '温妮因为被发现信奉着其它的神，立刻被带到了地下室。',
  ],
  ['normal_matu_ge500k', 2, '温妮被领主送给儿子当新玩具。'],
  ['normal_matu_ge500k', 3, '主人把温妮当作宠物来饲养。'],
  ['normal_matu_ge100k', 0, '温妮成为了赌场的赠品。'],
  [
    'normal_matu_ge100k',
    1,
    '大农场的主人在买其它农奴的时候顺便买下了温妮，作为礼物送给自己的儿子们。',
  ],
  [
    'normal_matu_ge100k',
    2,
    '温妮被放在橱窗里吸引客人。不知是否是妓院主人的爱好，她的脸的右侧被画上了下流的图案。',
  ],
  ['normal_matu_ge100k', 3, '温妮作为奖赏，赏给立了战功的士官。'],
  ['normal_matu_lt100k', 0, '温妮作为公众肉便器不分昼夜地被使用着。'],
  ['normal_matu_lt100k', 1, '温妮被安排在量产触手的触手小屋里，'],
  ['normal_matu_lt100k', 2, '周末，这种酒吧都会搞一些特别的活动。'],
  ['normal_matu_lt100k', 3, '温妮作为开矿奴隶的慰问品被饲养着。'],
  ['normal_other_ge500k', 0, '温妮作为主人的宠物生活在屋里。'],
  [
    'normal_other_ge500k',
    1,
    '温妮因为被发现信奉着其它的神，立刻被带到了地下室。',
  ],
  ['normal_other_ge500k', 2, '温妮被领主送给儿子当新玩具。'],
  ['normal_other_ge500k', 3, '主人把温妮当作宠物来饲养。'],
  ['normal_other_ge100k', 0, '温妮成为了赌场里的赛狗。'],
  ['normal_other_ge100k', 1, '为了做出新品种的家畜而让温妮和所有的家畜交配。'],
  ['normal_other_ge100k', 2, '温妮成为了专门收集异族美女的妓院里的奴隶。'],
  ['normal_other_ge100k', 3, '年轻的士官用奖金买下了温妮。'],
  ['normal_other_lt100k', 0, '温妮作为公众肉便器，不分昼夜地被使用着。'],
  ['normal_other_lt100k', 1, '温妮被安排在量产触手的触手小屋里，'],
  ['normal_other_lt100k', 2, '周末，这种酒吧都会搞一些特别的活动。'],
  ['normal_other_lt100k', 3, '温妮作为开矿奴隶的慰问品被饲养着。'],
];

/** 逐条末路编号的选取方式：随机定路的两族用随机源取值，其余用职业素质走买家分派链。 */
function route_pick(leaf, route) {
  if (
    /^rebel_(matu|other)_lt100k$/.test(leaf) ||
    leaf === 'rebel_matu_ge100k'
  ) {
    return { random: route === 1 ? [0] : [1] };
  }
  if (leaf === 'rebel_other_ge100k') {
    if (route === 2) return { talent: 314, value: 5 };
    if (route === 1) return { talent: 200, value: 1 };
    return {};
  }
  if (route === 3) return { talent: 200, value: 1 };
  if (route === 2) return { talent: 205, value: 1 };
  if (route === 1) return { talent: 202, value: 1 };
  return {};
}

test('K0_ROUTES：每条末路族按末路编号发各自的正文', async () => {
  const leaf_state = new Map(
    ROUTE_TABLE.map(([state, race, price, id]) => [id, { state, race, price }]),
  );
  let checked = 0;
  for (const [leaf, route, first_line] of LEAF_TEXTS) {
    const { state, race, price } = leaf_state.get(leaf);
    const fixture = seed_world();
    fixture.set_inputs(0);
    fixture.store.set('talent:0:122', 1);
    fixture.store.set('talent:31:314', race);
    if (state === 'rebel') fixture.store.set('mark:31:3', 3);
    if (state === 'love') fixture.store.set('talent:31:85', 1);
    if (state === 'lewd') fixture.store.set('talent:31:76', 1);
    const pick = route_pick(leaf, route);
    if (pick.talent) fixture.store.set(`talent:31:${pick.talent}`, pick.value);
    const values = pick.random ?? [0];
    let index = 0;

    await black_market(fixture).sell_maturo_k0(31, {
      price,
      rand: () => values[index++ % values.length],
    });

    const lines = fixture.text_lines();
    const ellipsis = lines.lastIndexOf('…'); // 买家行与 '………'/'……'/'…' 之后才是正文
    assert.equal(
      lines.slice(ellipsis + 1).find((line) => line !== ''),
      first_line,
      `${leaf} 的末路 ${route}`,
    );
    checked += 1;
  }
  assert.equal(checked, LEAF_TEXTS.length);
});

test('K0_ENDINGS：每条末路的正文首行与结局名逐条锁定', async () => {
  const fixture = seed_world();
  const expected = new Map(
    ENDING_TEXTS.map(([id, line, ending]) => [id, { line, ending }]),
  );
  let invoked = 0;
  for (const name of ROUTE_MODULES) {
    for (const [id, ending_of] of Object.entries(
      family(fixture, name).ENDINGS,
    )) {
      const want = expected.get(id);
      assert(want, `${id} 在锁定表里没有对应行`);
      expected.delete(id);
      const before = fixture.text_lines().length;
      const ending = await ending_of({
        cid: 31,
        target_name: '温妮',
        rand_n: seq([0]),
      });
      invoked++;
      const printed = fixture
        .text_lines()
        .slice(before)
        .filter((line) => line !== '');
      assert.equal(printed[0], want.line, `${id} 的首行文案`);
      assert.equal(ending, want.ending, `${id} 的结局名`);
    }
  }
  assert.equal(invoked, TOTAL_ENDINGS);
  assert.deepEqual([...expected.keys()], [], '锁定表里的末路都必须被调用');
});
