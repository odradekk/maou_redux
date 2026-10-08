'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');
const { seed_static_names } = require('./helpers/static-names');

function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  seed_static_names(fixture);
  const flags = fixture.load_module('era-utils/era-flag');
  Object.assign(flags, {
    target: 31,
    player: 0,
    assi: -1,
    assiplay: 0,
    selectcom: 20,
  });
  fixture.era.set('talent:0:122', 1);
  for (const cid of [0, 31]) {
    for (const index of [0, 1]) {
      fixture.era.set(`maxbase:${cid}:${index}`, 20000);
      fixture.era.set(`base:${cid}:${index}`, 20000);
    }
  }
  fixture.era.set('maxbase:0:2', 10000);
  fixture.era.set('base:0:2', 10000);
  fixture.override_math_random(() => 0.9);
  return { fixture, flags };
}

test('#769 正常位完整回合：魔王满条后射精，保留封顶前的余量', async () => {
  const { fixture } = seed_world();
  fixture.load_module('system/train/com-sex');
  fixture.load_module('event/event-com');
  fixture.load_module('event/source-check');
  fixture.load_module('event/event-comend');
  const { execute_command_round } = fixture.load_module(
    'system/train/train-loop',
  );

  assert.deepEqual(await execute_command_round(20), { missing: false });
  assert.ok(fixture.text_lines().includes('膣内射精'));
  assert.equal(fixture.era.get('exp:0:3'), 1);
  assert.equal(fixture.era.get('tflag:2'), 1);
  assert.equal(fixture.era.get('base:0:2'), 1080, '普通射精保留本轮溢出的余量');
});

test('#769 肛交：魔王满条后普通射精，扣槽保留本轮余量', async () => {
  const { fixture, flags } = seed_world();
  flags.selectcom = 26;
  const { com_ejac_player_analsex } = fixture.load_module(
    'system/train/com-analsex',
  );

  await com_ejac_player_analsex(() => 9);
  assert.equal(fixture.era.get('exp:0:3'), 1);
  assert.equal(fixture.era.get('tflag:2'), 1);
  assert.equal(fixture.era.get('base:0:2'), 720);
});

for (const [name, max, initial, sense, grade, remaining] of [
  ['未满', 10000, 0, 0, 0, 1080],
  ['恰好满值', 10000, 8920, 0, 0, 10000],
  ['普通射精', 10000, 9000, 0, 1, 80],
  ['恰好双倍', 1000, 920, 0, 1, 999],
  ['超过双倍', 1000, 921, 0, 2, 1],
  ['大量射精余量封顶', 1000, 1000, 5, 2, 999],
]) {
  test(`#769 射精分档：${name}使用合法槽值与本轮增量`, async () => {
    const { fixture } = seed_world();
    fixture.era.set('maxbase:0:2', max);
    fixture.era.set('base:0:2', initial);
    fixture.era.set('abl:0:0', sense);
    const { com_ejac_player_sex } = fixture.load_module(
      'system/train/com-vaginasex',
    );

    await com_ejac_player_sex(() => 9);
    assert.equal(fixture.era.get('exp:0:3') || 0, grade);
    assert.equal(fixture.era.get('tflag:2') || 0, grade);
    assert.equal(fixture.era.get('base:0:2'), remaining);
    if (grade) {
      assert.ok(
        fixture
          .text_lines()
          .includes(grade === 2 ? '膣内大量射精' : '膣内射精'),
      );
    }
  });
}

function arm_skilled_world(fixture, cids) {
  for (const cid of cids) {
    for (const index of [
      0, 1, 2, 3, 7, 10, 11, 12, 13, 14, 16, 17, 21, 22, 32,
    ]) {
      fixture.era.set(`abl:${cid}:${index}`, 5);
    }
    fixture.era.set(`maxbase:${cid}:2`, 1000);
    fixture.era.set(`base:${cid}:2`, 1000);
  }
  fixture.era.set('palam:31:3', 30000);
  fixture.era.set('palam:31:5', 30000);
  fixture.era.set('mark:31:1', 3);
}

for (const id of [122, 123, 124, 125, 126, 127]) {
  test(`#769 高级指令${id}：满条后大量射精`, async () => {
    const { fixture, flags } = seed_world();
    flags.selectcom = id;
    arm_skilled_world(fixture, [0, 31]);
    fixture.era.set('talent:31:121', 1);
    fixture.load_module('system/train/com-advanced');
    const { com_family } = fixture.load_module('system/train/com-family');

    assert.equal(await com_family.call(id), 1);
    assert.equal(fixture.era.get('exp:0:3'), 2);
    assert.ok(fixture.era.get('base:0:2') < 1000);
  });
}

test('#769 三人调教：主人和助手的射精档位与余量分别结算', async () => {
  const { fixture, flags } = seed_world();
  join_slave_chara(fixture, 5, '助手');
  fixture.era.beginTrain(5);
  Object.assign(flags, { assi: 5, selectcom: 64 });
  arm_skilled_world(fixture, [0, 31, 5]);
  fixture.era.set('talent:5:122', 1);
  fixture.era.set('talent:31:302', 1);
  fixture.era.set('talent:31:304', 1);
  fixture.era.set('talent:31:310', 50);
  fixture.era.set('exp:5:0', 1);
  fixture.era.set('maxbase:0:2', 10000);
  fixture.era.set('base:0:2', 6000);
  fixture.era.set('maxbase:5:2', 2000);
  fixture.era.set('base:5:2', 2000);
  fixture.load_module('system/train/com-assistant');
  const { com_family } = fixture.load_module('system/train/com-family');

  assert.equal(await com_family.call(64), 1);
  assert.ok(fixture.text_lines().includes('射精'));
  assert.ok(fixture.text_lines().includes('大量射精（助手）'));
  assert.equal(fixture.era.get('exp:0:3'), 1);
  assert.equal(fixture.era.get('tflag:6'), 2);
  assert.equal(fixture.era.get('base:0:2'), 1280);
  assert.equal(fixture.era.get('base:5:2'), 1999);
});

test('#769 触手射精：只结算怪物槽，保留余量且不消耗魔王槽', async () => {
  const { fixture } = seed_world();
  fixture.era.set('maxbase:0:4', 1000);
  fixture.era.set('base:0:4', 1000);
  fixture.load_module('system/train/com-tentacle');
  const { equip_com_family } = fixture.load_module('system/train/com-family');

  await equip_com_family.call(100);
  assert.ok(fixture.text_lines().includes('触手射精'));
  assert.equal(fixture.era.get('tflag:15'), 1);
  assert.equal(fixture.era.get('base:0:4'), 400);
  assert.equal(fixture.era.get('base:0:2'), 10000);
});
