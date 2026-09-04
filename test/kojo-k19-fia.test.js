/**
 * ere/kojo/kojo-k19-fia.js 的行为测试（issue #247：J37 口上·K19 菲娅）。
 *
 * 缝 = test/helpers/era-fixture.js。世界底座：菲娅（性格素质 179 →
 * GET_KOJO_NUM = 119 → 分发 key 19）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 35;
const KEY = 19;

async function setup_k19(seed, selectcom = 0) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '菲娅');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.store.set(`talent:${CID}:179`, 1);
  fixture.store.set('flag:119', 1);
  fixture.store.set('flag:7', 2);
  if (seed) seed(fixture, era_flag);
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k19-fia');
  return fixture;
}

async function emit(fixture, event) {
  const registry = fixture.load_module('system/event/registry');
  await registry.emit(event);
}

async function speak_k19(fixture, rand = () => 0) {
  const { kojo_message_com_family } = fixture.load_module('kojo/kojo-system');
  return kojo_message_com_family.call(KEY, { args: [rand] });
}

test('@EVENTTRAIN #PRI 置存在标志并补总开关，@EVENTEND #LATER 清标志', async () => {
  const fixture = await setup_k19((f) => {
    f.store.delete('flag:119');
    f.store.set('flag:7', 0);
    f.store.set(`cflag:${CID}:201`, 9);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get('flag:119'), 1, 'K19 存在标志置 1');
  assert.equal(fixture.store.get('flag:7'), 2, '口上总开关从 0 补到 2');
  await emit(fixture, 'EVENTEND');
  assert.equal(fixture.store.get('flag:119'), 0, 'K19 存在标志清 0');
});

test('EVENTTRAIN 初调教推进 CFLAG:201，人类与魔族分档', async () => {
  const human = await setup_k19();
  await emit(human, 'EVENTTRAIN');
  assert.equal(human.store.get(`cflag:${CID}:201`), 1, '人类初调教推进到 1');
  assert.ok(
    human.text_lines().some((line) => line.includes('你是坏人吧')),
    '人类初调教台词',
  );

  const demon = await setup_k19((f) => f.store.set(`talent:${CID}:314`, 9));
  await emit(demon, 'EVENTTRAIN');
  assert.equal(demon.store.get(`cflag:${CID}:201`), 1, '魔族初调教推进到 1');
  assert.equal(demon.store.get(`cflag:${CID}:370`), 1, '魔族化计数置 1');
});

for (const guard of [
  ['助手调教', (_f, flag) => ((flag.assi = 1), (flag.assiplay = 1))],
  ['口塞', (f) => f.store.set(`tequip:${CID}:45`, 1)],
  ['失神', (f) => f.store.set('tflag:899', 1)],
  ['兽奸', (f) => f.store.set(`tequip:${CID}:89`, 1)],
  ['触手', (f) => f.store.set(`tequip:${CID}:90`, 1)],
  ['崩坏', (f) => f.store.set(`talent:${CID}:9`, 1)],
]) {
  test(`KOJO_MESSAGE_COM 头部守卫：${guard[0]}静默跳过`, async () => {
    const fixture = await setup_k19((f, flag) => {
      f.store.set(`cflag:${CID}:301`, 0);
      guard[1](f, flag);
    });
    await speak_k19(fixture);
    assert.deepEqual(fixture.text_lines(), [], `${guard[0]}守卫无输出`);
    assert.equal(
      fixture.store.get(`cflag:${CID}:301`),
      0,
      `${guard[0]}守卫不推进爱抚计数`,
    );
  });
}

test('KOJO_MESSAGE_COM 头部守卫：死斗场转入专用口上', async () => {
  const fixture = await setup_k19(
    (f) => f.store.set(`tequip:${CID}:55`, 1),
    55,
  );
  await speak_k19(fixture);
  assert.ok(fixture.text_lines().length > 0, '死斗场守卫转入专用口上');
});

test('SELECTCOM 0 爱抚首回合：输出并将 CFLAG:301 从 0 推进到 1', async () => {
  const fixture = await setup_k19();
  await speak_k19(fixture);
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '爱抚计数推进到 1');
  assert.ok(fixture.text_lines().length > 0, '爱抚首回合有角色台词');
});
