/**
 * @file 单元测试：EVENT_AUTOTRAIN 与 6 个 _AUTO 调教分支。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

test('AUTOTRAIN: format_autotrain & before_autotrain 重置行为', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;

  const { before_autotrain, format_autotrain } = fixture.load_module(
    'event/event-autotrain',
  );
  fixture.store.set('source:0', 100);
  fixture.store.set('delta:17:0', 50);
  before_autotrain();
  assert.equal(fixture.store.get('source:0'), 0);
  assert.equal(fixture.store.get('delta:17:0'), 0);

  fixture.store.set('talent:17:271', 1); // 常时发情
  format_autotrain();
  assert.equal(fixture.store.get('palam:17:3'), 3000);
  assert.equal(fixture.store.get('palam:17:5'), 3000);
});

test('AUTOTRAIN: 6 个 _AUTO 分支 (COM0, COM3, COM13, COM50, COM63, RAND)', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;

  const {
    com0_auto,
    com3_auto,
    com13_auto,
    com50_auto,
    com63_auto,
    rand_autotrain,
  } = fixture.load_module('event/event-autotrain');
  // 1. COM0_AUTO (爱抚)
  fixture.store.set('cflag:17:666', 0);
  assert.equal(com0_auto(), 1);
  assert.equal(fixture.store.get('cflag:17:666'), 1);
  assert.equal(fixture.store.get('source:17:4'), 60);
  // 2. COM3_AUTO (自慰)
  assert.equal(com3_auto(), 1);
  assert.equal(fixture.store.get('cflag:17:666'), 2);
  assert.equal(fixture.store.get('exp:17:10'), 1);

  // 3. COM13_AUTO (肛门虫)
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:17:1', 1000);
  assert.equal(com13_auto(), 1);
  assert.equal(fixture.store.get('cflag:17:666'), 3);
  assert(fixture.store.get('exp:17:1') > 0);

  // 4. COM50_AUTO (润滑液)
  assert.equal(com50_auto(), 1);
  assert.equal(fixture.store.get('cflag:17:666'), 4);
  assert.equal(fixture.store.get('source:17:10'), 10000);

  // 5. COM63_AUTO (磨镜)
  assert.equal(com63_auto(), 1);
  assert.equal(fixture.store.get('cflag:17:666'), 5);
  assert.equal(fixture.store.get('source:17:12'), 200); // 250 * 0.8 (ABL:0 == 0)
  assert.equal(rand_autotrain(), 0);
});

test('AUTOTRAIN: autotrain 全角色遍历与 after_autotrain', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.era.beginTrain(0, 17);

  const { after_autotrain, autotrain } = fixture.load_module(
    'event/event-autotrain',
  );
  fixture.store.set('cflag:17:666', 1);
  fixture.store.set('ex:17:1', 1); // 私处绝顶
  await after_autotrain(17);
  assert.equal(fixture.store.get('cflag:17:667'), 1);

  // autotrain 遍历
  await autotrain();
});
