/**
 * MARRIAGE_DAY.ERB 十七函数的行为测试（issue #342，阶段 5a L11）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++] ?? 0;
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

function setup() {
  const fixture = create_era_fixture();
  for (const [cid, name] of [
    [0, '魔王'],
    [1, '莉莉'],
    [2, '伴侣'],
  ]) {
    fixture.seed_chara(cid, { id: cid, name, callname: name });
    fixture.era.addCharacter(cid);
  }
  fixture.store.set('itemname:100', '兽人');
  fixture.store.set('itemname:104', '丧尸');
  fixture.store.set('itemname:900', '野狗');
  fixture.store.set('itemname:901', '魔王');
  fixture.store.set('itemname:902', '恋人');
  fixture.store.set('cflag:0:1', 0);
  fixture.store.set('cflag:1:1', 0);
  return { fixture, api: fixture.load_module('dungeon/marriage-day') };
}

function texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('十七个原作函数全部通过模块公开', () => {
  const { api } = setup();
  assert.deepEqual(
    Object.keys(api).sort(),
    [
      'beast_marriage_day',
      'brain_marriage_day',
      'faily_marriage_day',
      'giant_marriage_day',
      'girl_marriage_day',
      'horse_marriage_day',
      'insect_marriage_day',
      'ivy_marriage_day',
      'man_marriage_day',
      'marriage_day',
      'marriage_day_dog',
      'marriage_day_lovers',
      'marriage_day_slave',
      'orc_marriage_day',
      'slime_marriage_day',
      'syokusyu_marriage_day',
      'marriage_day_you',
    ].sort(),
  );
});

test('主函数：未婚角色只尝试恋人事件，不增加结婚爱情', async () => {
  const { fixture, api } = setup();
  fixture.store.set('cflag:1:601', 0);
  assert.equal(await api.marriage_day(1, seq([])), 0);
  assert.equal(fixture.store.get('cflag:1:602') || 0, 0);
});

test('主函数：怪物库存不足时爱情已增加，但不进入婚后事件', async () => {
  const { fixture, api } = setup();
  fixture.store.set('cflag:1:601', 100);
  fixture.store.set('item:100', 0);
  assert.equal(await api.marriage_day(1, seq([])), 0);
  assert.equal(fixture.store.get('cflag:1:602'), 1);
  assert.equal(fixture.store.get('cflag:1:107') || 0, 0);
});

test('主函数：妊娠分支在标题后返回，不清射精与父怪物记录', async () => {
  const { fixture, api } = setup();
  fixture.store.set('cflag:1:601', 900);
  fixture.store.set('cflag:1:107', 7);
  fixture.store.set('cflag:1:112', 108);
  fixture.store.set('talent:1:153', 1);
  assert.equal(await api.marriage_day(1, seq([])), 0);
  assert.equal(fixture.store.get('cflag:1:602'), 1);
  assert.equal(fixture.store.get('cflag:1:107'), 7);
  assert.equal(fixture.store.get('cflag:1:112'), 108);
  assert(texts(fixture).some((line) => line.includes('期待着孩子的出生')));
});

test('主函数：野狗婚姻完成分支后清记录并发出 TURNEND', async () => {
  const { fixture, api } = setup();
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );
  fixture.store.set('cflag:1:601', 900);
  fixture.store.set('cflag:1:107', 9);
  fixture.store.set('cflag:1:112', 108);
  fixture.store.set('abl:1:39', 1);
  await assert.rejects(
    () => api.marriage_day(1, seq([0])),
    (error) => error instanceof BeginSignal && error.state === STATE.TURNEND,
  );
  assert.equal(fixture.store.get('cflag:1:602'), 1);
  assert.equal(fixture.store.get('cflag:1:112'), 0);
  assert.equal(fixture.store.get('exp:1:0'), 1);
  assert.equal(fixture.store.get('exp:1:56'), 1);
});

test('主函数：种族分支修改后的 Y 用于售乳双账本', async () => {
  const { fixture, api } = setup();
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  fixture.store.set('cflag:1:601', 100);
  fixture.store.set('cflag:1:602', 50);
  fixture.store.set('item:100', 1);
  fixture.store.set('talent:1:130', 1);
  fixture.store.set('abl:1:11', 2);
  fixture.store.set('abl:1:13', 3);

  await assert.rejects(
    () => api.marriage_day(1, seq([0, 0, 0, 2, 0])),
    (error) => error instanceof BeginSignal,
  );
  assert.equal(fixture.store.get('flag:10004'), 1500);
  assert.equal(fixture.store.get('exflag:4444'), 1500);
});

test('主函数：种类零按原作回退到默认角色的同居正文', async () => {
  const { fixture, api } = setup();
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  fixture.store.set('cflag:1:601', 104);
  fixture.store.set('item:104', 1);

  await assert.rejects(
    () => api.marriage_day(1, seq([0, 0])),
    (error) => error instanceof BeginSignal,
  );
  assert(texts(fixture).includes('*莉莉和丧尸的结婚生活*'));
  assert(texts(fixture).includes('莉莉和魔王一起生活着。'));
});

test('角色与恋人配偶分支沿用现有名字并执行等待', async () => {
  const { fixture, api } = setup();
  await api.marriage_day_slave(1, 2);
  assert(texts(fixture).includes('莉莉和伴侣一起生活着。'));
  assert.equal(fixture.waits.length, 1);

  fixture.lines_history.length = 0;
  fixture.waits.length = 0;
  await api.marriage_day_lovers(1, 1, seq([]));
  assert.deepEqual(texts(fixture), [
    `莉莉和${'温柔的青年'.padEnd(14, '　')}一起生活着。`,
  ]);
  assert.equal(fixture.waits.length, 1);

  fixture.lines_history.length = 0;
  await api.marriage_day_lovers(0, 1, seq([]));
  assert.equal(texts(fixture)[0], '莉莉和一起生活着。');
});

test('DOG/YOU：身体分流写入不同经验，YOU 另有显式等待', async () => {
  const dog = setup();
  await dog.api.marriage_day_dog(0, 3, seq([]));
  assert.equal(dog.fixture.store.get('exp:0:0'), 3);
  assert.equal(dog.fixture.store.get('exp:0:56'), 3);

  const non_master = setup();
  await non_master.api.marriage_day_dog(1, 3, seq([]));
  assert.equal(non_master.fixture.store.get('exp:1:0') || 0, 0);

  const dog_wife = setup();
  dog_wife.fixture.store.set('talent:1:136', 1);
  await dog_wife.api.marriage_day_dog(1, 3, seq([0]));
  assert(texts(dog_wife.fixture).includes('莉莉摇着屁股和野狗发情交尾着。'));

  const you = setup();
  you.fixture.store.delete('cflag:0:1');
  you.fixture.store.set('talent:1:85', 1);
  await you.api.marriage_day_you(1, 3);
  assert.equal(you.fixture.store.get('exp:1:0'), 3);
  assert.equal(you.fixture.waits.length, 1);
});

test('ORC/SLIME：种族正文按确定性随机源结算经验', async () => {
  const orc = setup();
  await orc.api.orc_marriage_day(1, 3, seq([0]));
  assert.equal(orc.fixture.store.get('exp:1:0'), 3);
  assert.equal(orc.fixture.store.get('exp:1:20'), 3);
  assert.equal(orc.fixture.waits.length, 1);

  const slime = setup();
  slime.fixture.store.set('abl:1:11', 3);
  await slime.api.slime_marriage_day(1, 3);
  assert.equal(slime.fixture.store.get('exp:1:10'), 3);
  assert.equal(slime.fixture.store.get('exp:1:2'), 1);
});

test('INSECT：母乳进化经属主门面写素质与寄生经验', async () => {
  const { fixture, api } = setup();
  fixture.store.set('abl:1:11', 5);
  fixture.store.set('talent:1:0', 0);
  fixture.store.set('talent:1:122', 0);
  await api.insect_marriage_day(1, 3, seq([0]));
  assert.equal(fixture.store.get('talent:1:130'), 1);
  assert.equal(fixture.store.get('talent:1:190'), 1);
  assert.equal(fixture.store.get('talent:1:191'), 1);
  assert.equal(fixture.store.get('exp:1:50'), 3);
});

test('IVY/SYOKUSYU：高欲望与身体分流分别结算', async () => {
  const ivy = setup();
  ivy.fixture.store.set('abl:1:11', 4);
  ivy.fixture.store.set('abl:1:16', 1);
  ivy.fixture.store.set('abl:1:31', 1);
  await ivy.api.ivy_marriage_day(1, 3);
  assert.equal(ivy.fixture.store.get('cflag:1:2'), 100);
  assert.equal(ivy.fixture.store.get('exp:1:10'), 7);

  const tentacle = setup();
  tentacle.fixture.store.set('talent:1:122', 1);
  await tentacle.api.syokusyu_marriage_day(1, 3);
  assert.equal(tentacle.fixture.store.get('exp:1:1'), 3);
  assert.equal(tentacle.fixture.store.get('exp:1:0') || 0, 0);
});

test('FAILY：依次授予魅惑，并用同一随机源决定教学', async () => {
  const { fixture, api } = setup();
  fixture.store.set('abl:1:11', 1);
  assert.equal(await api.faily_marriage_day(1, 3, seq([0])), 4);
  assert.equal(fixture.store.get('talent:1:91'), 1);
  assert.equal(fixture.store.get('talent:1:92') || 0, 0);
});

test('GIANT/MAN/GIRL：三种人形配偶都执行可区分的初婚结算', async () => {
  const giant = setup();
  await giant.api.giant_marriage_day(0, 3, seq([]));
  assert.equal(giant.fixture.store.get('exp:0:0'), 3);

  const man = setup();
  man.fixture.store.set('talent:0:141', 1);
  await man.api.man_marriage_day(0, 3, seq([]));
  assert.equal(man.fixture.store.get('exp:0:0'), 3);
  assert(texts(man.fixture).some((line) => line.includes('中年')));

  const girl = setup();
  girl.fixture.store.set('talent:1:140', 1);
  girl.fixture.store.set('talent:1:122', 1);
  await girl.api.girl_marriage_day(1, 3, seq([0]));
  assert(texts(girl.fixture).some((line) => line.includes('熟女')));
  assert.equal(girl.fixture.store.get('exp:1:3'), 1);
});

test('BEAST/BRAIN/HORSE：兽类、脑寄生与马匹分支写各自状态', async () => {
  const beast = setup();
  await beast.api.beast_marriage_day(0, 3);
  assert.equal(beast.fixture.store.get('cflag:0:107'), 3);
  assert.equal(beast.fixture.store.get('exp:0:56'), 3);

  const brain = setup();
  brain.fixture.store.set('talent:1:57', 0);
  brain.fixture.store.set('abl:1:11', 2);
  await brain.api.brain_marriage_day(1, 3, seq([0]));
  assert.equal(brain.fixture.store.get('talent:1:57'), 1);
  assert.equal(brain.fixture.store.get('exp:1:31'), 2);

  const horse = setup();
  await horse.api.horse_marriage_day(0, 3, seq([0]));
  assert.equal(horse.fixture.store.get('cflag:0:107'), 3);
  assert.equal(horse.fixture.store.get('exp:0:56'), 30);
});
