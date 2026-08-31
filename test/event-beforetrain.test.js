/**
 * @file 单元测试：EVENT_BEFORETRAIN 与调教前叙事。
 *
 * 覆盖（issue #218 补轮）：
 *   - @PRITRAIN_MESSAGE：省略设定（FLAG:6 & 1）早退、初调教（着衣关/开，
 *     好奇心 TALENT:23，助手抖S/坦率分支）、第 N 次调教的素质叙述分支
 *     （崩坏/土下座/问候/其他），ズーコ着ぐるみ早退、妊娠（三档 + 娇小
 *     体型）、胸部真空/乳房穿孔/无内裤/下半身穿孔等状态叙述、助手三分支；
 *   - @PRITRAIN_MESSAGE_NOCLOTHES：全部素质分支（感情淡薄/幼稚+未成熟/
 *     坚强/反抗心/自尊心高/幼稚/自制心/胆怯/自尊心低/悲观/坦率/老实/
 *     自大/兜底）；
 *   - @PRITRAIN_MESSAGE_CLOTHED：同形态的着衣分支。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/**
 * 世界底座：预置魔王 0、奴隶 17（+ 可选助手 1），开调教域，指好指针。
 * 返回 { fixture, era_flag }。
 */
function seed_beforetrain_world({ assi = -1 } = {}) {
  const fixture = create_era_fixture();
  preset_gamebase(fixture);
  fixture.seed_chara(0, { name: '魔王', callname: '魔王' });
  fixture.seed_chara(17, { name: '玛奥', callname: '玛奥' });
  fixture.seed_chara(1, { name: '助手', callname: '助手' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(17);
  fixture.era.addCharacter(1);
  const train_ids = assi >= 0 ? [0, 17, 1] : [0, 17];
  fixture.era.beginTrain(...train_ids);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 17;
  era_flag.player = 0;
  era_flag.assi = assi;
  return { fixture, era_flag };
}

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

test('BEFORETRAIN: 省略设定（FLAG:6 & 1）只输出一句并返回 0', async () => {
  const { fixture } = seed_beforetrain_world();
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 5);
  fixture.store.set('flag:6', 1);
  const ret = await pritrain_message();
  assert.equal(ret, 0);
  assert.equal(fixture.store.get('cflag:17:10'), 6); // 调教回数仍加 1
  assert.ok(fixture.text_lines().some((l) => l.includes('的第6次调教开始了')));
  assert.equal(
    fixture.text_lines().filter((l) => l.includes('次调教开始了')).length,
    1,
    '省略设定必须只输出一句，不进入后续叙述',
  );
});

test('BEFORETRAIN: 初调教 + 着衣开启 + 助手抖S', async () => {
  const { fixture } = seed_beforetrain_world({ assi: 1 });
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 0);
  fixture.store.set('flag:37', 1);
  fixture.store.set('talent:17:23', 1); // 好奇心
  fixture.store.set('talent:1:83', 1); // 助手抖S
  const ret = await pritrain_message();
  assert.equal(ret, 1);
  const texts = fixture.text_lines();
  assert.ok(
    texts.some((l) => l.includes('第一次调教开始了')),
    '初调教分支',
  );
  assert.ok(
    texts.some((l) => l.includes('眼神最深处却好像流淌着期待的光芒')),
    '好奇心 TALENT:23 分支',
  );
  assert.ok(
    texts.some((l) => l.includes('心想着如何才能尽情享受凌辱玛奥的乐趣')),
    '助手抖S 分支',
  );
});

test('BEFORETRAIN: 初调教 + 助手坦率 + 目标反抗心（甩手）', async () => {
  const { fixture } = seed_beforetrain_world({ assi: 1 });
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 0);
  fixture.store.set('flag:37', 0);
  fixture.store.set('talent:1:13', 1); // 助手坦率
  fixture.store.set('talent:17:11', 1); // 目标反抗心
  await pritrain_message();
  const texts = fixture.text_lines();
  assert.ok(
    texts.some((l) => l.includes('轻轻把手放到了玛奥的肩上')),
    '助手坦率分支',
  );
  assert.ok(
    texts.some((l) => l.includes('而玛奥却无情地把手甩开了')),
    '目标反抗心时甩手',
  );
});

test('BEFORETRAIN: 第 N 次调教——崩坏分支', async () => {
  const { fixture } = seed_beforetrain_world();
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 3);
  fixture.store.set('talent:17:9', 1); // 崩坏
  const ret = await pritrain_message();
  assert.equal(ret, 1);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('眼神已经完全失去了生气')),
  );
});

test('BEFORETRAIN: 第 N 次调教——土下座分支（主人抖S + 抖M≥3）', async () => {
  const { fixture } = seed_beforetrain_world();
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 3);
  fixture.store.set('talent:17:13', 1); // 坦率
  fixture.store.set('abl:17:10', 4); // 顺从 4
  fixture.store.set('abl:17:16', 3); // 侍奉 3
  fixture.store.set('mark:17:3', 0); // 无反抗刻印
  fixture.store.set('talent:0:83', 1); // 主人抖S
  fixture.store.set('abl:17:21', 3); // 抖M 3
  const ret = await pritrain_message();
  assert.equal(ret, 1);
  const texts = fixture.text_lines();
  assert.ok(texts.some((l) => l.includes('土下座地跪在地上')));
  assert.ok(texts.some((l) => l.includes('把脚踩在玛奥的后脑上')));
  assert.ok(texts.some((l) => l.includes('胯间似乎开始潮湿了')));
});

test('BEFORETRAIN: 第 N 次调教——土下座门槛（顺从不足 → 不土下座）', async () => {
  const { fixture } = seed_beforetrain_world();
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 3);
  fixture.store.set('talent:17:13', 1);
  fixture.store.set('abl:17:10', 3); // 顺从 3 < 4
  fixture.store.set('abl:17:16', 3);
  fixture.store.set('mark:17:3', 2); // 反抗刻印 > 1（同时挡掉问候分支）
  const ret = await pritrain_message();
  assert.equal(ret, 1);
  assert.ok(
    !fixture.text_lines().some((l) => l.includes('土下座地跪在地上')),
    '顺从不足不得进入土下座',
  );
  assert.ok(
    fixture.text_lines().some((l) => l.includes('带来了')),
    '应落入「其他」分支',
  );
});

test('BEFORETRAIN: 第 N 次调教——问候分支与门槛', async () => {
  const { fixture } = seed_beforetrain_world();
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 3);
  fixture.store.set('talent:17:14', 1); // 老实
  fixture.store.set('abl:17:10', 3); // 顺从 3
  fixture.store.set('mark:17:3', 1); // 反抗刻印 <= 1
  await pritrain_message();
  assert.ok(fixture.text_lines().some((l) => l.includes('悄悄地看了魔王一眼')));

  // 门槛：顺从不足 → 问候不成立
  const { fixture: f2 } = seed_beforetrain_world();
  const { pritrain_message: pm2 } = f2.load_module('event/event-beforetrain');
  f2.store.set('cflag:17:10', 3);
  f2.store.set('talent:17:14', 1);
  f2.store.set('abl:17:10', 2); // 顺从 2 < 3
  f2.store.set('mark:17:3', 1);
  await pm2();
  assert.ok(!f2.text_lines().some((l) => l.includes('悄悄地看了魔王一眼')));
});

test('BEFORETRAIN: 第 N 次调教——ズーコ着ぐるみ早退', async () => {
  const { fixture } = seed_beforetrain_world();
  const { pritrain_message } = fixture.load_module('event/event-beforetrain');
  fixture.store.set('cflag:17:10', 3);
  fixture.store.set('flag:37', 1); // 着衣开启（否则 cflag:40 被清 0）
  fixture.store.set('cflag:17:42', 11); // 史莱姆特装
  fixture.store.set('cflag:17:40', 64); // 特别服装位
  const ret = await pritrain_message();
  assert.equal(ret, 0, 'ズーコ着ぐるみ时必须在叙述后早退');
  assert.ok(
    fixture.text_lines().some((l) => l.includes('貌似，里面是真空的……')),
  );
});

test('BEFORETRAIN: 第 N 次调教——妊娠三档叙述', async () => {
  // <= day+10：大肚子（+ 娇小体型 TALENT:100 分支）
  {
    const { fixture, era_flag } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('talent:17:153', 1);
    fixture.store.set('talent:17:100', 1); // 娇小体型
    fixture.store.set('cflag:17:110', 5);
    era_flag.day_count = 10;
    await pritrain_message();
    const texts = fixture.text_lines();
    assert.ok(texts.some((l) => l.includes('与娇小的身材不相称的大肚子')));
    assert.ok(texts.some((l) => l.includes('（请避免过激的调教）')));
  }
  // <= day+20：稳定期
  {
    const { fixture, era_flag } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('talent:17:153', 1);
    fixture.store.set('cflag:17:110', 25);
    era_flag.day_count = 10;
    await pritrain_message();
    assert.ok(
      fixture.text_lines().some((l) => l.includes('胎儿已进入了稳定期')),
    );
  }
  // <= day+30：引人注目
  {
    const { fixture, era_flag } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('talent:17:153', 1);
    fixture.store.set('cflag:17:110', 35);
    era_flag.day_count = 10;
    await pritrain_message();
    assert.ok(fixture.text_lines().some((l) => l.includes('肚子非常引人注目')));
  }
});

test('BEFORETRAIN: 第 N 次调教——胸部真空与乳房穿孔', async () => {
  {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('flag:37', 1);
    // 上装(4) | 内裤(1) | 下装(8)，无胸罩(2)
    fixture.store.set('cflag:17:40', 4 | 1 | 8);
    fixture.store.set('cflag:17:41', 10); // 基本服装 → wearing_cloth_all 会补胸罩
    await pritrain_message();
    assert.ok(
      fixture.text_lines().some((l) => l.includes('没有束缚的乳房在衣服内')),
      '无胸罩时必须有胸部真空叙述',
    );
  }
  {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:17:40', 4 | 1 | 8);
    fixture.store.set('cflag:17:41', 10);
    fixture.store.set('cflag:17:7', 1); // 乳房穿孔
    await pritrain_message();
    assert.ok(
      fixture.text_lines().some((l) => l.includes('两个乳环也随之起舞')),
    );
  }
});

test('BEFORETRAIN: 第 N 次调教——无内裤叙述（露出癖分档）', async () => {
  // 露出癖 < 3
  {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:17:40', 8); // 无内裤 + 下装(裙)
    fixture.store.set('cflag:17:41', 10);
    fixture.store.set('abl:17:17', 1); // 露出癖 1 < 3
    await pritrain_message();
    assert.ok(
      fixture.text_lines().some((l) => l.includes('频繁地注意着自己的胯股间')),
    );
  }
  // 露出癖 >= 3
  {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:17:40', 8);
    fixture.store.set('cflag:17:41', 10);
    fixture.store.set('abl:17:17', 3); // 露出癖 3
    await pritrain_message();
    assert.ok(fixture.text_lines().some((l) => l.includes('卷起裙子的下摆')));
  }
});

test('BEFORETRAIN: 第 N 次调教——下半身穿孔（女人/男人）', async () => {
  {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:17:40', 8); // 裙、无内裤、非裤装
    fixture.store.set('cflag:17:41', 10);
    fixture.store.set('cflag:17:7', 4); // 阴唇两边
    await pritrain_message();
    assert.ok(
      fixture.text_lines().some((l) => l.includes('裸露着的阴唇两边穿了环')),
    );
  }
  {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:17:40', 8);
    fixture.store.set('cflag:17:41', 10);
    fixture.store.set('cflag:17:7', 4);
    fixture.store.set('talent:17:122', 1); // 男人
    await pritrain_message();
    assert.ok(
      fixture.text_lines().some((l) => l.includes('裸露着的阴茎穿了环')),
    );
  }
});

test('BEFORETRAIN: 第 N 次调教——助手三分支', async () => {
  // 淫乱 + 抖S
  {
    const { fixture } = seed_beforetrain_world({ assi: 1 });
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('talent:1:76', 1); // 淫乱
    fixture.store.set('abl:1:20', 3); // 抖S 3
    await pritrain_message();
    assert.ok(fixture.text_lines().some((l) => l.includes('用舌头轻舔嘴唇')));
  }
  // 爱慕 + 抖S
  {
    const { fixture } = seed_beforetrain_world({ assi: 1 });
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    fixture.store.set('talent:1:85', 1); // 爱慕
    fixture.store.set('abl:1:20', 3); // 抖S 3
    await pritrain_message();
    assert.ok(fixture.text_lines().some((l) => l.includes('抱着魔王的手臂')));
  }
  // 其他
  {
    const { fixture } = seed_beforetrain_world({ assi: 1 });
    const { pritrain_message } = fixture.load_module('event/event-beforetrain');
    fixture.store.set('cflag:17:10', 3);
    await pritrain_message();
    assert.ok(
      fixture.text_lines().some((l) => l.includes('魔王的身边站着助手助手')),
    );
  }
});

// —— @PRITRAIN_MESSAGE_NOCLOTHES 全分支 ——
// 每支对应一个素质组合与一段台词锚（取首行断言——分支互斥，首行即分支标识）。

const NOCLOTHES_CASES = [
  ['感情淡薄 TALENT:22', { 22: 1 }, '依魔王的命令脱掉了衣服'],
  [
    '幼稚+未成熟 TALENT:132+135',
    { 132: 1, 135: 1 },
    '没有等魔王把命令说完就开始了脱衣服',
  ],
  ['坚强 TALENT:12', { 12: 1 }, '赤裸的玛奥把双手遮在胸前'],
  ['反抗心 TALENT:11', { 11: 1 }, '伸手粗暴地将玛奥剥光'],
  ['自尊心高 TALENT:21', { 21: 1 }, '耸了耸肩，把衣服脱了'],
  ['幼稚 TALENT:132', { 132: 1 }, '被剥光的玛奥非常地害怕'],
  ['自制心 TALENT:20', { 20: 1 }, '用手遮住自己的身体'],
  ['胆怯 TALENT:10', { 10: 1 }, '肩膀颤抖着'],
  ['自尊心低 TALENT:15', { 15: 1 }, '想到全裸的耻辱'],
  ['悲观 TALENT:17', { 17: 1 }, '提心吊胆地观察着魔王的表情'],
  ['坦率 TALENT:13', { 13: 1 }, '对自己现在的处境难以接受'],
  ['老实 TALENT:14', { 14: 1 }, '乖乖地把自己的衣服脱光了'],
  ['自大 TALENT:16', { 16: 1 }, '投以挑衅的目光'],
  ['兜底（无素质）', {}, '被剥光了'],
];

for (const [name, talents, expect] of NOCLOTHES_CASES) {
  test(`BEFORETRAIN: pritrain_message_noclothes ${name}`, () => {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message_noclothes } = fixture.load_module(
      'event/event-beforetrain',
    );
    for (const [tid, v] of Object.entries(talents)) {
      fixture.store.set(`talent:17:${tid}`, v);
    }
    pritrain_message_noclothes(17);
    const first = fixture.text_lines()[0];
    assert.ok(
      first.includes(expect),
      `noclothes ${name} 首行应为「${expect}」，实际「${first}」`,
    );
  });
}

const CLOTHED_CASES = [
  ['感情淡薄 TALENT:22', { 22: 1 }, '毫无表情地呆立不动'],
  ['幼稚+未成熟 TALENT:132+135', { 132: 1, 135: 1 }, '不理解要发生什么了'],
  ['坚强 TALENT:12', { 12: 1 }, '展示出了坚决的态度'],
  ['反抗心 TALENT:11', { 11: 1 }, '用可怕的眼神狠狠地盯着魔王'],
  ['自尊心高 TALENT:21', { 21: 1 }, '耸耸肩'],
  ['幼稚 TALENT:132', { 132: 1 }, '非常地害怕'],
  ['自制心 TALENT:20', { 20: 1 }, '表面上仍装作很平静'],
  ['胆怯 TALENT:10', { 10: 1 }, '肩膀在颤抖着'],
  ['自尊心低 TALENT:15', { 15: 1 }, '想到今后作为奴隶的屈辱'],
  ['悲观 TALENT:17', { 17: 1 }, '提心吊胆地观察着魔王的神色'],
  ['坦率 TALENT:13', { 13: 1 }, '对自己现在的处境难以接受'],
  ['老实 TALENT:14', { 14: 1 }, '老老实实的'],
  ['自大 TALENT:16', { 16: 1 }, '投以挑衅的目光'],
  ['兜底（无素质）', {}, '被带到调教室了'],
];

for (const [name, talents, expect] of CLOTHED_CASES) {
  test(`BEFORETRAIN: pritrain_message_clothed ${name}`, () => {
    const { fixture } = seed_beforetrain_world();
    const { pritrain_message_clothed } = fixture.load_module(
      'event/event-beforetrain',
    );
    fixture.store.set('flag:37', 1);
    fixture.store.set('cflag:17:41', 10); // 基本服装类型
    for (const [tid, v] of Object.entries(talents)) {
      fixture.store.set(`talent:17:${tid}`, v);
    }
    pritrain_message_clothed(17);
    const first = fixture.text_lines()[0];
    assert.ok(
      first.includes(expect),
      `clothed ${name} 首行应为「${expect}」，实际「${first}」`,
    );
  });
}
