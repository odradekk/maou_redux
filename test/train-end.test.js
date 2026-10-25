'use strict';

/**
 * ere/system/train/train-end.js 的行为测试（收拢调教收尾生命周期）。
 *
 * 缝 = test/helpers/era-fixture.js。聚焦登记冲账协议的 module 边界：
 * defer_train_death 的机械清理立即就位而角色保留到冲账、非正角色号当场
 * 拒绝、除名时序在 endTrain 之后（经 calls 记录断言）。链内完整行为
 * （剧情、珠结算、转场）在 test/event-end.test.js，引擎侧数据面在
 * test/train-end-engine.test.js。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

function seed_world() {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const flags = fixture.load_module('era-utils/era-flag');
  flags.target = flags.target_backup = flags.target_record = 31;
  flags.assi = -1;
  fixture.era.beginTrain(0, 31);
  return { fixture, flags };
}

test('defer_train_death：机械清理立即就位，角色保留到冲账', () => {
  const { fixture, flags } = seed_world();
  fixture.store.set('gotjuel:31:0', 7);
  fixture.store.set('cflag:31:530', 1); // 已行动
  fixture.store.set('cflag:31:533', 31); // 队长记忆
  const { defer_train_death } = fixture.load_module('system/train/train-end');

  defer_train_death(31);

  assert.equal(flags.target, -1, '目标指针清空');
  assert.equal(fixture.store.get('flag:1'), -1, '前回调教对象记录同步清空');
  assert.equal(flags.assi, -1);
  assert.equal(
    fixture.store.get('flag:230'),
    1,
    '除名标记按模板号登记（31 → FLAG:230）',
  );
  assert.equal(fixture.store.get('cflag:31:530'), 0, 'party_del 复位行动完了');
  assert.equal(fixture.store.get('cflag:31:533'), 0, 'party_del 复位队长记忆');
  assert.equal(fixture.store.get('gotjuel:31:0'), 0, '待结算珠清零');
  assert.ok(
    fixture.era.getAddedCharacters().includes(31),
    '实际除名延迟到引擎收尾后',
  );
});

test('run_aftertrain：链内登记，除名在 endTrain 之后冲账', async () => {
  const { fixture } = seed_world();
  const { on } = fixture.load_module('system/event/registry');
  const { defer_train_death, run_aftertrain } = fixture.load_module(
    'system/train/train-end',
  );
  on('EVENTEND', () => {
    defer_train_death(31);
  });

  await run_aftertrain();

  const order = fixture.calls.map((c) => c.api);
  assert.ok(
    order.lastIndexOf('removeCharacter') > order.lastIndexOf('endTrain'),
    '除名必须在引擎收尾之后',
  );
  assert.ok(!fixture.era.getAddedCharacters().includes(31), '登记的目标被除名');
});

test('defer_train_death 拒绝非正角色号（0 是魔王、负数是未选中）', () => {
  const { fixture, flags } = seed_world();
  const { defer_train_death } = fixture.load_module('system/train/train-end');

  assert.throws(() => defer_train_death(0), TypeError);
  assert.throws(() => defer_train_death(-1), TypeError);
  assert.equal(flags.target, 31, '拒绝时不做任何机械清理');
  assert.ok(fixture.era.getAddedCharacters().includes(31));
});

// —— #906：关窗前的欲情快照（次日「献出初次」的评分要读它）——

test('run_aftertrain：关窗前把参与调教的角色的欲情存进 CFLAG:668', async () => {
  // 调教名单是 [0, 31]（seed_world 的 beginTrain）：两人都是参与者，都存；
  // 名单外的角色不动它的槽。PALAM 随 endTrain 删除，所以「快照先于关窗」
  // 由读回值证明——顺序反了就只能读到 undefined → 0。
  const { fixture } = seed_world();
  join_slave_chara(fixture, 20, '琳');
  fixture.store.set('palam:0:5', 555);
  fixture.store.set('palam:31:5', 10000);
  fixture.store.set('palam:20:5', 7777); // 名单外：不该被读
  const { run_aftertrain } = fixture.load_module('system/train/train-end');

  await run_aftertrain();

  assert.equal(fixture.store.get('cflag:31:668'), 10000, '目标（参与者）');
  assert.equal(fixture.store.get('cflag:0:668'), 555, '同一场里的其他参与者');
  assert.equal(
    fixture.store.get('cflag:20:668'),
    undefined,
    '不在调教名单里的角色不写（名单以 getCharactersInTrain 为准）',
  );
  assert.equal(
    fixture.store.get('palam:31:5'),
    undefined,
    '快照之后才关窗：PALAM 已随 endTrain 删除',
  );
});

test('save_train_desire：欲情缺值时槽写 0（旧档与没参与调教的角色）', () => {
  const { fixture } = seed_world();
  const { save_train_desire } = fixture.load_module('system/train/train-end');

  save_train_desire();

  assert.equal(fixture.store.get('cflag:0:668'), 0, '读不到 PALAM 时写 0');
  assert.equal(fixture.store.get('cflag:31:668'), 0);
});
