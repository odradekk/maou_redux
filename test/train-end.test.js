'use strict';

/**
 * ere/system/train/train-end.js 的行为测试（收拢调教收尾生命周期）。
 *
 * 缝 = test/helpers/era-fixture.js。聚焦登记冲账协议的 module 边界：
 * defer_train_death 立即完成机械清理但不除名；除名延迟到引擎收尾之后；
 * 入口清残留。链内完整行为（剧情、珠结算、转场）在 test/event-end.test.js，
 * 引擎侧数据面在 test/train-end-engine.test.js。
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

test('run_aftertrain 入口清残留：上一场未冲账的登记不除名', async () => {
  const { fixture } = seed_world();
  const { defer_train_death, run_aftertrain } = fixture.load_module(
    'system/train/train-end',
  );
  defer_train_death(31); // 模拟上一场异常中断留下的登记

  await run_aftertrain();

  assert.ok(
    fixture.era.getAddedCharacters().includes(31),
    '残留登记不泄漏进本场冲账',
  );
});
