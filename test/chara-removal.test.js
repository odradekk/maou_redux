'use strict';

/**
 * @file 角色除名共同机械规则的行为测试（issue #785）。
 *
 * 只断言除名后的引擎表状态（外部行为），不断言内部步骤次序；出售、处刑、
 * 博物馆三条调用链的入口行为分别由 sale-chara / character-removal /
 * event-museum 的既有用例守护。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

/** 被删者固定用 1，旁观者固定用 2；跨编号形态在模板参数化用例覆盖。 */
function seed_world() {
  const fixture = create_era_fixture();
  for (const [cid, name] of [
    [0, '你'],
    [1, '被删者'],
    [2, '旁观者'],
  ]) {
    join_slave_chara(fixture, cid, name);
  }
  // flag:1/2 = 上次调教对象/上次助手；flag:10005/10006 = TARGET/ASSI。
  // 默认布阵：持久指针与四把会话指针全部指向「被删者当目标、旁观者当助手」。
  fixture.store.set('flag:1', 1);
  fixture.store.set('flag:2', 2);
  fixture.store.set('flag:10005', 1);
  fixture.store.set('flag:10006', 2);
  return fixture;
}

function load_removal(fixture) {
  return fixture.load_module('system/chara-removal');
}

test('除名机械五步：标记、指针、队伍、删除、称呼重建一次完成', async () => {
  const fixture = seed_world();
  // 被删者是队长（cflag:533 自指、530 成员标志），队伍随除名解散
  fixture.store.set('cflag:1:530', 1);
  fixture.store.set('cflag:1:533', 1);
  // 幸存旁观者的称呼暂存（-2）停在旧值，等称呼重建刷新
  fixture.store.set('callname:2:-1', '新称呼');
  fixture.store.set('callname:2:-2', '旧称呼');

  await load_removal(fixture).remove_character(1);

  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 2],
    '除名：被删者移出已加入列表，旁观者与魔王保留',
  );
  assert.equal(fixture.era.get('flag:200'), 1, '除名：普通勇者 1 落除名标记');
  assert.equal(
    fixture.era.get('flag:1'),
    -1,
    '除名：上次调教对象指向被删者时置 -1',
  );
  assert.equal(fixture.era.get('flag:2'), 2, '除名：上次助手指向旁观者时保留');
  assert.equal(
    fixture.era.get('flag:10005'),
    -1,
    '除名：TARGET 同步为清过的持久指针',
  );
  assert.equal(
    fixture.era.get('flag:10006'),
    2,
    '除名：ASSI 同步为清过的持久指针',
  );
  assert.equal(
    fixture.era.get('cflag:1:530'),
    0,
    '除名：队长本人的队伍标志复位',
  );
  assert.equal(fixture.era.get('cflag:1:533'), 0, '除名：队长号复位');
  assert.equal(
    fixture.era.get('callname:2:-2'),
    '新称呼',
    '除名后称呼重建：幸存角色的存档字串刷新为当前称呼',
  );
});

test('除名引用清理：只清真正指向被删者的指针', async () => {
  const fixture = seed_world();
  // 反向布阵：上次调教对象是旁观者、上次助手才是被删者
  fixture.store.set('flag:1', 2);
  fixture.store.set('flag:2', 1);
  fixture.store.set('flag:10005', 2);
  fixture.store.set('flag:10006', 1);

  await load_removal(fixture).remove_character(1);

  assert.equal(
    fixture.era.get('flag:1'),
    2,
    '除名：上次调教对象指向旁观者时保留',
  );
  assert.equal(
    fixture.era.get('flag:2'),
    -1,
    '除名：上次助手指向被删者时置 -1',
  );
  assert.equal(
    fixture.era.get('flag:10005'),
    2,
    '除名：TARGET 同步为清过的持久指针',
  );
  assert.equal(
    fixture.era.get('flag:10006'),
    -1,
    '除名：ASSI 同步为清过的持久指针',
  );
});

test('除名不重排其他角色：编号与数据桶原样保留', async () => {
  const fixture = seed_world();
  // 旁观者带满各类数据桶；跨表抽样对照
  fixture.store.set('base:2:0', 1234);
  fixture.store.set('exp:2:10', 77);
  fixture.store.set('talent:2:45', 1);
  fixture.store.set('cflag:2:700', 1);

  await load_removal(fixture).remove_character(1);

  assert.equal(fixture.era.get('base:2:0'), 1234, '除名后旁观者 BASE 不变');
  assert.equal(fixture.era.get('exp:2:10'), 77, '除名后旁观者 EXP 不变');
  assert.equal(fixture.era.get('talent:2:45'), 1, '除名后旁观者 TALENT 不变');
  assert.equal(fixture.era.get('cflag:2:700'), 1, '除名后旁观者 CFLAG 不变');
  assert.equal(
    fixture.era.getAddedCharacters().indexOf(2),
    1,
    '除名后旁观者保持自己的角色号',
  );
});

test('近卫后代的除名不落勇者标记（模板范围外）', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 0, '你');
  fixture.seed_chara(201, { id: 201, name: '近卫', callname: '近卫' });
  // 120000 是模板 201 段的头一个后代号（每模板 100 个）；FLAG:400 =
  // 模板 201 的「直加」落点，属其他玩法段，除名不得触碰
  fixture.era.addCharacter([120000, 201]);
  fixture.store.set('flag:400', 7);
  fixture.store.set('flag:1', 120000);
  fixture.store.set('flag:10005', 120000);
  fixture.store.set('flag:2', -1);
  fixture.store.set('flag:10006', -1);

  await load_removal(fixture).remove_character(120000);

  assert(!fixture.era.getAddedCharacters().includes(120000), '后代已除名');
  assert.equal(fixture.era.get('flag:1'), -1, '后代除名后上次调教对象置 -1');
  // FLAG:200–299 只属于预设 1–100；201 号模板的范围外不落标记
  assert.equal(fixture.era.get('flag:400'), 7, '后代除名不碰其他玩法标志');
});

test('reset_names: false 只除名不重建称呼', async () => {
  const fixture = seed_world();
  fixture.store.set('callname:2:-1', '新称呼');
  fixture.store.set('callname:2:-2', '旧称呼');

  await load_removal(fixture).remove_character(1, { reset_names: false });

  assert(
    !fixture.era.getAddedCharacters().includes(1),
    'reset_names 关闭仍完成删除',
  );
  assert.equal(
    fixture.era.get('callname:2:-2'),
    '旧称呼',
    'reset_names 关闭时幸存角色的存档字串停在旧值',
  );
});
