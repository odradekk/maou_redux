/**
 * @file 单元测试：EVENT_BEFORETRAIN 与调教前叙事。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

test('BEFORETRAIN: pritrain_message 初调教与省略设定', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = -1;

  const {
    pritrain_message,
    pritrain_message_clothed,
    pritrain_message_noclothes,
  } = fixture.load_module('event/event-beforetrain');

  // 1. 省略设定 FLAG:6 & 1
  fixture.store.set('flag:6', 1);
  const ret_omit = await pritrain_message();
  assert.equal(ret_omit, 0);
  assert.equal(fixture.store.get('cflag:17:10'), 1);

  // 2. 初次调教 (CFLAG:10 == 1) & 着衣关闭 (FLAG:37 == 0)
  fixture.store.set('flag:6', 0);
  fixture.store.set('cflag:17:10', 0); // 调教回数重置为 0，进入后加为 1
  fixture.store.set('flag:37', 0);
  fixture.store.set('talent:17:11', 1); // 反抗心
  const ret_first = await pritrain_message();
  assert.equal(ret_first, 1);
  assert.equal(fixture.store.get('cflag:17:40'), 0); // 全裸
  assert.ok(
    fixture.text_lines().some((l) => l.includes('第一次调教开始了')),
    '初调教分支必须输出第一次调教开始文本',
  );

  // 3. 初次调教 & 着衣开启 (FLAG:37 == 1)
  fixture.store.set('cflag:17:10', 0);
  fixture.store.set('flag:37', 1);
  fixture.store.set('talent:17:23', 1); // 好奇心
  const ret_clothed = await pritrain_message();
  assert.equal(ret_clothed, 1);
  assert.ok(
    fixture
      .text_lines()
      .some((l) => l.includes('眼神最深处却好像流淌着期待的光芒')),
  );

  // 4. noclothes / clothed 辅助函数单测覆盖
  pritrain_message_noclothes(17);
  pritrain_message_clothed(17);
});

test('BEFORETRAIN: pritrain_message 后续调教与各素质/状态分支', async () => {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(1, { name: '助手', callname: '助手' });

  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = 1;

  const { pritrain_message } = fixture.load_module('event/event-beforetrain');

  // 崩坏
  fixture.store.set('cflag:17:10', 1); // 进函数后变成 2
  fixture.store.set('talent:17:9', 1);
  await pritrain_message();
  assert.ok(
    fixture.text_lines().some((l) => l.includes('眼神已经完全失去了生气')),
  );

  // 土下座
  fixture.store.set('talent:17:9', 0);
  fixture.store.set('talent:17:13', 1); // 坦率
  fixture.store.set('abl:17:10', 4); // 顺从 4
  fixture.store.set('abl:17:16', 3); // 侍奉 3
  fixture.store.set('mark:17:3', 0); // 无反抗
  fixture.store.set('talent:0:83', 1); // 主人抖S
  fixture.store.set('abl:17:21', 3); // 抖M 3
  await pritrain_message();
  assert.ok(fixture.text_lines().some((l) => l.includes('土下座地跪在地上')));

  // 问候
  fixture.store.set('abl:17:10', 3);
  fixture.store.set('mark:17:3', 1);
  await pritrain_message();

  // 助手分支
  fixture.store.set('talent:1:76', 1); // 淫乱
  fixture.store.set('abl:1:20', 3); // 抖S 3
  await pritrain_message();

  fixture.store.set('talent:1:76', 0);
  fixture.store.set('talent:1:85', 1); // 爱慕
  await pritrain_message();
});
