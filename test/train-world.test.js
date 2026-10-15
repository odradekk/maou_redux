/**
 * @file test/helpers/train-world.js 的契约测试（#793）。
 *
 * 钉住「带角色的调教世界」的可观察形状：谁入列、谁在调教、四把会话指针
 * 指向谁、呼名落没落，以及模块按声明载入。helper 自己不写断言，这里补上。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { seed_train_world } = require('./helpers/train-world');

test('缺省世界：魔王与奴隶入列并开调教，指针指向目标', () => {
  const world = seed_train_world();

  assert.deepEqual(world.fixture.era.getAddedCharacters(), [0, 31]);
  assert.deepEqual(world.fixture.era.getCharactersInTrain(), [0, 31]);
  assert.equal(world.era_flag.target, 31);
  assert.equal(world.era_flag.player, 0);
  assert.equal(world.era_flag.assi, -1);
  assert.equal(world.era_flag.assiplay, 0);
  assert.equal(world.era_flag.selectcom, -1);
  assert.equal(world.era_flag.prevcom, -1);
  // 呼名由 preset_chara_0 / join_slave_chara 经 addCharacter 写入
  assert.equal(world.fixture.store.get('callname:0:-1'), '你');
  assert.equal(world.fixture.store.get('callname:31:-1'), '温妮');
  assert.equal(world.fixture.store.get('callname:31:-2'), '温妮');
});

test('助手：入列并留下呼名，但缺省不进调教名单', () => {
  const world = seed_train_world({ assi: 17 });

  assert.deepEqual(world.fixture.era.getAddedCharacters(), [0, 17, 31]);
  assert.deepEqual(world.fixture.era.getCharactersInTrain(), [0, 31]);
  assert.equal(world.era_flag.assi, 17);
  assert.equal(world.fixture.store.get('callname:17:-1'), '助手17');
  assert.equal(world.fixture.store.get('callname:17:-2'), '助手17');
});

test('助手 0 = 主人自己：不加角色，指针照实', () => {
  const world = seed_train_world({ assi: 0 });

  assert.deepEqual(world.fixture.era.getAddedCharacters(), [0, 31]);
  assert.equal(world.era_flag.assi, 0);
  // 主人不是助手：不被当成独立角色再预置一遍，呼名仍是自己的
  assert.equal(world.fixture.store.get('callname:0:-1'), '你');
});

test('差异项：目标、呼名、视角与调教名单各自可覆盖', () => {
  const world = seed_train_world({
    target: 32,
    target_name: '莉莉',
    assi: 17,
    player: 17,
    assiplay: 1,
    selectcom: 20,
    prevcom: 21,
    master_callname: '魔王',
    train_ids: [0, 32, 17],
  });

  assert.deepEqual(world.fixture.era.getAddedCharacters(), [0, 17, 32]);
  assert.deepEqual(world.fixture.era.getCharactersInTrain(), [0, 17, 32]);
  assert.equal(world.era_flag.target, 32);
  assert.equal(world.era_flag.player, 17);
  assert.equal(world.era_flag.assi, 17);
  assert.equal(world.era_flag.assiplay, 1);
  assert.equal(world.era_flag.selectcom, 20);
  assert.equal(world.era_flag.prevcom, 21);
  assert.equal(world.fixture.store.get('callname:32:-1'), '莉莉');
  assert.equal(world.fixture.store.get('callname:0:-1'), '魔王');
  assert.equal(world.fixture.store.get('callname:0:-2'), '魔王');
});

test('模块按声明载入，原样挂在 modules 上', () => {
  const world = seed_train_world({
    modules: {
      sex: 'system/train/com-sex',
      family: 'system/train/com-family',
    },
  });

  assert.equal(
    world.modules.family.com_family ===
      world.fixture.load_module('system/train/com-family').com_family,
    true,
  );
  assert.equal(world.modules.family.com_able_family.has(20), true);
  assert.equal(typeof world.modules.sex.able20, 'function');
});

test('世界走夹具的装载通道：era_flag 与 modules 都是夹具的模块实例', () => {
  const world = seed_train_world({ modules: { adv: 'system/train/com-adv' } });

  assert.equal(world.era_flag, world.fixture.load_module('era-utils/era-flag'));
  assert.equal(
    world.modules.adv,
    world.fixture.load_module('system/train/com-adv'),
  );
});

test('两个世界彼此独立，互不污染', () => {
  const first = seed_train_world();
  const second = seed_train_world();

  first.fixture.store.set('flag:10004', 500);

  assert.equal(first.era_flag.money, 500);
  assert.equal(second.era_flag.money, 0);
  assert.notEqual(first.fixture.era, second.fixture.era);
  assert.notEqual(first.era_flag, second.era_flag);
});
