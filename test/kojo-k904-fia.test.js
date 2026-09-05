/**
 * 菲娅 K904 的 EX 注册路径测试（issue #250）。
 *
 * 源: target/ERB/口上/EVENT_K904_菲娅.ERB。正文与 K19 菲娅相同，
 * 本文件只锁 K904 独有的 EX_FLAG:104 / EX_TALENT:104 与族注册键 904。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 35;
const KEY = 904;

async function setup_k904(seed) {
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
  era_flag.selectcom = 0;
  fixture.store.set(`ex_talent:${CID}:104`, 1);
  for (const talent of [0, 9, 76, 85, 314]) {
    fixture.store.set(`talent:${CID}:${talent}`, 0);
  }
  for (const mark of [0, 1, 2, 3]) {
    fixture.store.set(`mark:${CID}:${mark}`, 0);
  }
  fixture.store.set('exflag:104', 1);
  fixture.store.set('flag:7', 2);
  if (seed) seed(fixture, era_flag);
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k904-fia');
  return fixture;
}

async function emit(fixture, event) {
  const registry = fixture.load_module('system/event/registry');
  await registry.emit(event);
}

test('K904 事件钩子：EVENTTRAIN 置 EX_FLAG:104，EVENTEND 清除', async () => {
  const fixture = await setup_k904((f) => {
    f.store.delete('exflag:104');
    f.store.set('flag:7', 0);
    f.store.set(`cflag:${CID}:201`, 9);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get('exflag:104'), 1, 'EVENTTRAIN 置 EX_FLAG:104');
  assert.equal(fixture.store.get('flag:7'), 2, '口上总开关从 0 补到 2');
  await emit(fixture, 'EVENTEND');
  assert.equal(fixture.store.get('exflag:104'), 0, 'EVENTEND 清 EX_FLAG:104');
});

test('K904 EVENTTRAIN：EX_TALENT:104 缺席时不推进初调教', async () => {
  const fixture = await setup_k904((f) => {
    f.store.delete(`ex_talent:${CID}:104`);
    f.store.set(`ex_talent:${CID}:105`, 1);
  });
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get(`cflag:${CID}:201`) || 0, 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('K904 EVENTEND：EX_TALENT:104 缺席时不输出结束口上', async () => {
  const fixture = await setup_k904((f) => {
    f.store.delete(`ex_talent:${CID}:104`);
    f.store.set(`ex_talent:${CID}:105`, 1);
    f.store.set(`base:${CID}:0`, 100);
  });
  await emit(fixture, 'EVENTEND');
  assert.deepEqual(fixture.text_lines(), []);
});

test('K904 分发：全部口上族注册键都是 904', async () => {
  const fixture = await setup_k904();
  const kojo = fixture.load_module('kojo/kojo-system');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  const after = fixture.load_module('kojo/kojo-dungeon-after');
  const families = [
    ravish.ryouzyoku_kojo_family,
    ravish.ryouzyoku_after_kojo_family,
    kojo.benki_koujo_family,
    kojo.dungeon_victory_family,
    kojo.dungeon_attack_family,
    kojo.ntr_koujo_family,
    kojo.exucution_koujo_family,
    kojo.museum_koujo_family,
    kojo.banishment_koujo_family,
    kojo.public_exucution_koujo_family,
    kojo.grotesque_koujo_family,
    kojo.enterenemy_koujo_family,
    kojo.gohoubi_request_koujo_family,
    after.gohoubi_after_koujo_family,
    after.osioski_koujo_family,
    kojo.gobi_koujo_family,
    kojo.kojo_message_com_family,
    kojo.kojo_message_palamcng_family,
    kojo.kojo_message_markcng_family,
    kojo.self_kojo_family,
  ];
  for (const family of families) {
    assert.equal(family.has(KEY), true, `${family.name} 注册 904`);
    assert.equal(family.has(19), false, `${family.name} 不误注册 19`);
  }

  await kojo.kojo_message_com_family.call(KEY, { args: [() => 0] });
  assert.equal(fixture.store.get(`cflag:${CID}:301`), 1, '904 主分发可调用');
});
