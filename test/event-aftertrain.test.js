/**
 * @file 单元测试：EVENT_AFTERTRAIN 与调教后行为检查。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

test('AFTERTRAIN: aftertrain_sex_check 通常性交与 ABL 判定', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;

  const { aftertrain_sex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件 (无爱/淫乱)
  assert.equal(await aftertrain_sex_check(), 0);

  // 2. 满足条件（测试淫乱 talent:76）
  fixture.store.set('talent:17:76', 1); // 淫乱 (S += 1)
  fixture.store.set('exp:17:5', 35); // 性交经验 >= 30
  fixture.store.set('talent:0:122', 1); // 魔王男
  fixture.store.set('base:17:0', 1000); // 存活
  fixture.store.set('abl:17:2', 4); // V感觉 4 (S += 1)

  const res = await aftertrain_sex_check();
  assert.equal(res, 1);
  // S = 1 (V感觉 4) + 1 (淫乱) = 2 回
  assert.equal(fixture.store.get('exp:17:5'), 37);
  assert.equal(fixture.store.get('juel:17:1'), 400);
});

test('AFTERTRAIN: aftertrain_analsex_check 肛门性交', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;

  const { aftertrain_analsex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件
  assert.equal(await aftertrain_analsex_check(), 0);

  // 2. 满足条件
  fixture.store.set('talent:17:76', 1); // 淫乱
  fixture.store.set('exp:17:5', 40);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:3', 5); // A感觉 5 (S += 2)

  const res = await aftertrain_analsex_check();
  assert.equal(res, 1);
  // S = 2 (A感觉 5) + 1 (淫乱) = 3 回
  assert.equal(fixture.store.get('exp:17:5'), 43);
  assert.equal(fixture.store.get('juel:17:2'), 600);
});

test('AFTERTRAIN: aftertrain_lesbiansex_check 百合性交', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(1, { name: '助手', callname: '助手' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = 1;

  const { aftertrain_lesbiansex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件 (无百合/无好感)
  assert.equal(await aftertrain_lesbiansex_check(), 0);

  // 2. 满足百合条件（abl:22>=2, abl:0>=3, abl:10>=2, abl:11>=2, abl:33>=1, 存活）
  fixture.store.set('abl:17:22', 4); // 百合气质 4
  fixture.store.set('abl:17:0', 3); // C感觉 3
  fixture.store.set('abl:17:10', 2); // 顺从 2
  fixture.store.set('abl:17:11', 2); // 欲望 2
  fixture.store.set('abl:17:33', 2); // 百合中毒 2 (n += 2)
  fixture.store.set('abl:1:22', 3); // 助手百合气质 3
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('talent:17:81', 1); // 双性恋
  fixture.store.set('talent:1:81', 1);

  const res = await aftertrain_lesbiansex_check(0);
  assert.equal(res, 1);
  assert(fixture.store.get('juel:17:0') > 0);
});

test('AFTERTRAIN: aftertrain_masturbation_check 自慰检查', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;

  const { aftertrain_masturbation_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 欲望不足 (abl:11 < 2) 时不自慰
  fixture.store.set('abl:17:0', 3); // C感觉 3
  fixture.store.set('abl:17:11', 1); // 欲望 1
  fixture.store.set('abl:17:31', 2); // 自慰中毒 2
  fixture.store.set('base:17:0', 1000);
  assert.equal(await aftertrain_masturbation_check(0, 0, () => 0), 0);

  // 2. 满足自慰条件 (欲望 2)
  fixture.store.set('abl:17:11', 2); // 欲望 2
  fixture.store.set('abl:17:31', 2); // 自慰中毒 2 (A += 2)

  const res = await aftertrain_masturbation_check(0, 0, () => 0);
  assert.equal(res, 1);
  assert.equal(fixture.store.get('exp:17:10'), 2);
});

test('AFTERTRAIN: aftertrain_beastsex_check 兽奸检查', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;

  const { aftertrain_beastsex_check } = fixture.load_module(
    'event/event-aftertrain',
  );

  // 1. 未满足条件 (无经验/无道具)
  assert.equal(await aftertrain_beastsex_check(), 0);

  // 2. 满足兽奸条件
  fixture.store.set('exp:17:56', 60); // 兽奸经验 >= 50
  fixture.store.set('item:22', 1); // 狗
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:39', 3); // 兽奸中毒 3
  fixture.store.set('talent:17:124', 1); // 动物耳
  fixture.store.set('palam:17:5', 5000);

  const res = await aftertrain_beastsex_check();
  assert.equal(res, 1);
  assert(fixture.store.get('exp:17:56') > 60);
});

test('AFTERTRAIN: self_check 失神跳过守卫与五条派发臂', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.era.beginTrain(0, 17);

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;

  const { self_check } = fixture.load_module('event/event-aftertrain');

  // 1. 失神守卫 TFLAG:899 >= 1
  fixture.store.set('tflag:899', 1);
  assert.equal(await self_check(), 0);

  // 2. 正常无行为
  fixture.store.set('tflag:899', 0);
  assert.equal(await self_check(), 0);
  // 3. 触发 self_check 内的通常性交与自慰
  fixture.store.set('talent:17:76', 1);
  fixture.store.set('exp:17:5', 35);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('abl:17:2', 4);
  fixture.store.set('abl:17:0', 3);
  fixture.store.set('abl:17:11', 2);
  fixture.store.set('abl:17:31', 2);
  const self_res = await self_check();
  assert.equal(self_res, 0); // self_check 返回 0，但内部执行了派发
  assert.equal(fixture.store.get('exp:17:5'), 37); // sex_check 增加性交经验
  assert.equal(fixture.store.get('exp:17:10'), 3); // masturbation_check 增加自慰经验 (abl:31=2 -> a=2 + talent:76 淫乱 a+=1 -> a=3)
});
