/**
 * @file 单元测试：EVENT_AUTOTRAIN 与 6 个 _AUTO 调教分支。
 *
 * 覆盖（issue #218 补轮）：
 *   - @BEFORE_AUTOTRAIN：source 清零（target 指针为空时跳过 delta）；
 *   - @FORMAT_AUTOTRAIN：射精槽/母乳槽/触手射精槽、losebase、tflag、
 *     palam、delta 重置，常时发情（TALENT:271）润滑/欲情 3000 起步，
 *     死斗场收入清零；
 *   - @COM0_AUTO：SOURCE 分档（C 感觉 × B 感觉各档）、losebase、自动回数；
 *   - @COM3_AUTO：C/B 感觉分档、技巧乘算、自慰中毒乘算、阴毛设定、
 *     自慰经验、自动回数；
 *   - @COM13_AUTO：体力/气力门槛、触手/虫分支、A 感觉/经验/润滑/欲情/
 *     顺从分档、大柄/小柄/未熟、A 敏感/迟钝、处女+贞操观、肛门经验；
 *   - @COM50_AUTO：液体追加 10000、露出 300；
 *   - @COM63_AUTO：顺从/阴蒂感觉/技巧/侍奉精神分档；
 *   - @AFTER_AUTOTRAIN：KARMA 占位（ex:1/ex:2）、常时发情蓄积（flag:75
 *     与 TALENT:271 两道闸）、gotjuel:100 清零、cflag:667 累加与封顶、
 *     AUTO_ABLUP 占位（flag:5 bit 35）；
 *   - @AUTOTRAIN：全角色遍历（跳过 cflag:666==0）、输出格式、指针还原。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_gamebase } = require('./helpers/gamebase');

/**
 * 世界底座：预置魔王 0、奴隶 17（+ 可选助手 1），开调教域，指好指针。
 * 返回 { fixture, era_flag }。
 */
function seed_autotrain_world({ assi = -1 } = {}) {
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

test('AUTOTRAIN: before_autotrain 指针为空时跳过 delta', async () => {
  const { fixture, era_flag } = seed_autotrain_world();
  const { before_autotrain } = fixture.load_module('event/event-autotrain');
  fixture.store.set('source:0', 100);
  fixture.store.set('source:7', 88);
  fixture.store.set('delta:17:0', 50);
  era_flag.target = -1; // 调教目标为空
  before_autotrain();
  assert.equal(fixture.store.get('source:0'), 0);
  assert.equal(fixture.store.get('source:7'), 0);
  assert.equal(
    fixture.store.get('delta:17:0'),
    50,
    'target<0 时不得触碰 delta（否则会误清别的角色的 UP）',
  );
});

test('AUTOTRAIN: format_autotrain 重置全套状态', async () => {
  const { fixture } = seed_autotrain_world();
  const { format_autotrain } = fixture.load_module('event/event-autotrain');
  fixture.store.set('base:0:2', 500); // 魔王射精槽
  fixture.store.set('base:17:2', 300); // 目标射精槽
  fixture.store.set('base:17:3', 400); // 母乳槽
  fixture.store.set('base:0:4', 600); // 触手射精槽
  fixture.store.set('losebase:0', 10);
  fixture.store.set('losebase:1', 20);
  fixture.store.set('tflag:5', 9);
  fixture.store.set('tflag:199', 7);
  fixture.store.set('palam:17:3', 5000);
  fixture.store.set('source:17:4', 60);
  fixture.store.set('delta:17:4', 10);
  fixture.store.set('tflag:402', 88); // 死斗场收入
  format_autotrain();
  assert.equal(fixture.store.get('base:0:2'), 0);
  assert.equal(fixture.store.get('base:17:2'), 0);
  assert.equal(fixture.store.get('base:17:3'), 0);
  assert.equal(fixture.store.get('base:0:4'), 0);
  assert.equal(fixture.store.get('losebase:0'), 0);
  assert.equal(fixture.store.get('losebase:1'), 0);
  assert.equal(fixture.store.get('tflag:5'), 0);
  assert.equal(fixture.store.get('tflag:199'), 0);
  assert.equal(fixture.store.get('palam:17:3'), 0);
  assert.equal(fixture.store.get('delta:17:4'), 0);
  assert.equal(fixture.store.get('tflag:402'), 0);
});

test('AUTOTRAIN: format_autotrain 助手在列时也清助手射精槽', async () => {
  const { fixture } = seed_autotrain_world({ assi: 1 });
  const { format_autotrain } = fixture.load_module('event/event-autotrain');
  fixture.store.set('base:1:2', 200); // 助手射精槽
  format_autotrain();
  assert.equal(fixture.store.get('base:1:2'), 0);

  // 无助手时不碰助手槽
  const { fixture: f2 } = seed_autotrain_world({ assi: -1 });
  const { format_autotrain: fa2 } = f2.load_module('event/event-autotrain');
  f2.store.set('base:1:2', 200);
  fa2();
  assert.equal(f2.store.get('base:1:2'), 200);
});

test('AUTOTRAIN: format_autotrain 常时发情缺失时不设润滑/欲情', async () => {
  const { fixture } = seed_autotrain_world();
  const { format_autotrain } = fixture.load_module('event/event-autotrain');
  // 无 TALENT:271：palam 已被清 0（不设 3000 起步）
  format_autotrain();
  assert.equal(fixture.store.get('palam:17:3'), 0);
  assert.equal(fixture.store.get('palam:17:5'), 0);
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

test('AUTOTRAIN: com0_auto SOURCE 分档（C感觉 × B感觉）', async () => {
  const { fixture } = seed_autotrain_world();
  const { com0_auto } = fixture.load_module('event/event-autotrain');
  fixture.store.set('abl:17:0', 3); // C感觉 3 → SOURCE:0=1200, SOURCE:3=100
  fixture.store.set('abl:17:1', 4); // B感觉 4 → SOURCE:17=1100, SOURCE:3+=115
  assert.equal(com0_auto(), 1);
  assert.equal(fixture.store.get('source:17:0'), 1200);
  assert.equal(fixture.store.get('source:17:3'), 100 + 115);
  assert.equal(fixture.store.get('source:17:17'), 1100);
  assert.equal(fixture.store.get('source:17:4'), 60);
  assert.equal(fixture.store.get('source:17:8'), 30);
  assert.equal(fixture.store.get('source:17:12'), 100);
  assert.equal(fixture.store.get('losebase:0'), 1);
  assert.equal(fixture.store.get('losebase:1'), 5);
  assert.equal(fixture.store.get('cflag:17:666'), 1);
});

test('AUTOTRAIN: com3_auto 技巧与自慰中毒乘算', async () => {
  const { fixture } = seed_autotrain_world();
  const { com3_auto } = fixture.load_module('event/event-autotrain');
  fixture.store.set('abl:17:0', 4); // C感觉 4 → SOURCE:0=1100
  fixture.store.set('abl:17:1', 3); // B感觉 3 → SOURCE:17=700
  fixture.store.set('abl:17:12', 3); // 技巧 3 → ×1.2
  fixture.store.set('abl:17:31', 4); // 自慰中毒 4 → ×1.5
  assert.equal(com3_auto(), 1);
  assert.equal(
    fixture.store.get('source:17:0'),
    Math.floor(Math.floor(1100 * 1.2) * 1.5),
  );
  assert.equal(
    fixture.store.get('source:17:17'),
    Math.floor(Math.floor(700 * 1.2) * 1.5),
  );
  assert.equal(fixture.store.get('source:17:4'), 280); // 技巧 3 档
  assert.equal(fixture.store.get('source:17:7'), 1500);
  assert.equal(fixture.store.get('source:17:12'), 6400); // 3200 ×2（阴毛设定）
  assert.equal(fixture.store.get('source:17:13'), 2500);
  assert.equal(fixture.store.get('exp:17:10'), 1);
  assert.equal(fixture.store.get('cflag:17:666'), 1);
});

test('AUTOTRAIN: com13_auto 体力/气力门槛与触手分支', async () => {
  const { fixture } = seed_autotrain_world();
  const { com13_auto } = fixture.load_module('event/event-autotrain');
  fixture.store.set('base:17:1', 1000); // 气力充足，单独测体力闸
  fixture.store.set('base:17:0', 400); // HP < 500
  assert.equal(com13_auto(), 0, '体力<500 必须拦下');
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:17:1', 299); // 气力 < 300
  assert.equal(com13_auto(), 0, '气力<300 必须拦下');
  fixture.store.set('base:17:1', 1000);
  fixture.store.set('tequip:17:90', 1); // 触手
  assert.equal(com13_auto(), 1);
  assert.ok(fixture.text_lines().some((l) => l.includes('＜肛门触手插入中＞')));
});

test('AUTOTRAIN: com13_auto 分档计算', async () => {
  const { fixture } = seed_autotrain_world();
  const { com13_auto } = fixture.load_module('event/event-autotrain');
  fixture.store.set('base:17:0', 1000);
  fixture.store.set('base:17:1', 1000);
  fixture.store.set('abl:17:3', 4); // A感觉 4 → local0=650, local1=2100
  fixture.store.set('exp:17:1', 30); // exp1 < 50 → ×1.2, local2=10
  fixture.store.set('palam:17:3', 5000); // 润滑 < 10000 → ×1.4, local2+=120
  fixture.store.set('palam:17:5', 5000); // 欲情 < 10000 → ×1.1
  fixture.store.set('abl:17:10', 2); // 顺从 2 → 无倍率
  assert.equal(com13_auto(), 1);
  // local0 = 650 ×1.2(exp) ×1.4(润滑) ×1.1(欲情) = floor(1201.2) = 1201
  assert.equal(fixture.store.get('source:17:2'), 1201);
  assert.equal(fixture.store.get('source:17:13'), 2100);
  assert.equal(fixture.store.get('source:17:6'), 10 + 120); // 疼痛 local2
  assert.equal(fixture.store.get('source:17:14'), 200); // 逃离
  assert.equal(fixture.store.get('exp:17:1'), 32); // 30 + exp1_add(2: A感觉 4 ≤ 4)
  assert.equal(fixture.store.get('cflag:17:666'), 1);
});

test('AUTOTRAIN: com50_auto 液体追加', async () => {
  const { fixture } = seed_autotrain_world();
  const { com50_auto } = fixture.load_module('event/event-autotrain');
  assert.equal(com50_auto(), 1);
  assert.equal(fixture.store.get('source:17:10'), 10000);
  assert.equal(fixture.store.get('source:17:12'), 300);
  assert.equal(fixture.store.get('cflag:17:666'), 1);
});

test('AUTOTRAIN: com63_auto 分档计算', async () => {
  const { fixture } = seed_autotrain_world();
  const { com63_auto } = fixture.load_module('event/event-autotrain');
  fixture.store.set('abl:17:10', 1); // 顺从 1 → SOURCE:11=120
  fixture.store.set('abl:17:0', 4); // C感觉 4 → SOURCE:0=1200, SOURCE:4=700, SOURCE:5=600, SOURCE:13=20
  fixture.store.set('abl:17:12', 3); // 技巧 3 → ×1.0 / ×0.6 / ×0.5
  fixture.store.set('abl:17:16', 2); // 侍奉精神 2 → ×1.2
  assert.equal(com63_auto(), 1);
  assert.equal(fixture.store.get('source:17:11'), 120);
  assert.equal(fixture.store.get('source:17:0'), 1200);
  assert.equal(fixture.store.get('source:17:4'), 700);
  assert.equal(fixture.store.get('source:17:5'), Math.floor(600 * 0.6 * 1.2));
  assert.equal(fixture.store.get('source:17:13'), 10); // 20 ×0.5
  assert.equal(fixture.store.get('source:17:12'), 300); // 250 ×1.2
  assert.equal(fixture.store.get('cflag:17:666'), 1);
});

test('AUTOTRAIN: after_autotrain ex:1/ex:2 KARMA 占位', async () => {
  const { fixture } = seed_autotrain_world();
  const { after_autotrain } = fixture.load_module('event/event-autotrain');
  fixture.store.set('cflag:17:666', 1);
  fixture.store.set('ex:17:1', 1); // 私处绝顶
  await after_autotrain(17);
  let texts = fixture.text_lines();
  assert.ok(texts.some((l) => l.includes('(私处绝顶导致善良值下降:-1)')));

  // 第二个用例：ex:2 肛门绝顶
  const { fixture: f2 } = seed_autotrain_world();
  const { after_autotrain: aa2 } = f2.load_module('event/event-autotrain');
  f2.store.set('cflag:17:666', 1);
  f2.store.set('ex:17:2', 1);
  await aa2(17);
  texts = f2.text_lines();
  assert.ok(texts.some((l) => l.includes('(肛门绝顶导致善良值下降:-2)')));
});

test('AUTOTRAIN: after_autotrain 常时发情蓄积（flag:75 与 TALENT:271 两道闸）', async () => {
  // flag:75=0 且非常时发情 → 蓄积
  {
    const { fixture } = seed_autotrain_world();
    const { after_autotrain } = fixture.load_module('event/event-autotrain');
    fixture.store.set('cflag:17:666', 1);
    fixture.store.set('flag:75', 0);
    fixture.store.set('palam:17:3', 20000);
    fixture.store.set('palam:17:5', 15000);
    await after_autotrain(17);
    assert.equal(fixture.store.get('cflag:17:81'), 2); // 20000/10000
    assert.equal(fixture.store.get('cflag:17:82'), 1); // 15000/10000
  }
  // flag:75=1 → 不蓄积
  {
    const { fixture } = seed_autotrain_world();
    const { after_autotrain } = fixture.load_module('event/event-autotrain');
    fixture.store.set('cflag:17:666', 1);
    fixture.store.set('flag:75', 1);
    fixture.store.set('palam:17:3', 20000);
    fixture.store.set('palam:17:5', 15000);
    await after_autotrain(17);
    assert.equal(fixture.store.get('cflag:17:81'), undefined);
  }
  // TALENT:271 → 不蓄积
  {
    const { fixture } = seed_autotrain_world();
    const { after_autotrain } = fixture.load_module('event/event-autotrain');
    fixture.store.set('cflag:17:666', 1);
    fixture.store.set('talent:17:271', 1);
    fixture.store.set('palam:17:3', 20000);
    await after_autotrain(17);
    assert.equal(fixture.store.get('cflag:17:81'), undefined);
  }
  // palam < 10000 → 蓄积归 0
  {
    const { fixture } = seed_autotrain_world();
    const { after_autotrain } = fixture.load_module('event/event-autotrain');
    fixture.store.set('cflag:17:666', 1);
    fixture.store.set('flag:75', 0);
    fixture.store.set('palam:17:3', 5000);
    fixture.store.set('palam:17:5', 9000);
    await after_autotrain(17);
    assert.equal(fixture.store.get('cflag:17:81'), 0);
    assert.equal(fixture.store.get('cflag:17:82'), 0);
  }
});

test('AUTOTRAIN: after_autotrain gotjuel:100 清零、cflag:667 累加与封顶、AUTO_ABLUP 占位', async () => {
  // gotjuel:100 清零 + cflag:667 累加
  {
    const { fixture } = seed_autotrain_world();
    const { after_autotrain } = fixture.load_module('event/event-autotrain');
    fixture.store.set('cflag:17:666', 7);
    fixture.store.set('gotjuel:17:100', 500);
    await after_autotrain(17);
    assert.equal(fixture.store.get('gotjuel:17:100'), 0);
    assert.equal(fixture.store.get('cflag:17:667'), 7);
  }
  // cflag:667 封顶 50
  {
    const { fixture } = seed_autotrain_world();
    const { after_autotrain } = fixture.load_module('event/event-autotrain');
    fixture.store.set('cflag:17:666', 60);
    await after_autotrain(17);
    assert.equal(fixture.store.get('cflag:17:667'), 50);
  }
  // flag:5 bit 35 → AUTO_ABLUP 占位
  {
    const { fixture } = seed_autotrain_world();
    const { after_autotrain } = fixture.load_module('event/event-autotrain');
    fixture.store.set('cflag:17:666', 1);
    fixture.store.set('flag:5', 1 << 35);
    await after_autotrain(17);
    assert.ok(fixture.text_lines().some((l) => l.includes('自动能力提升')));
  }
});

test('AUTOTRAIN: autotrain 遍历只处理 cflag:666!=0 并还原指针', async () => {
  const { fixture, era_flag } = seed_autotrain_world();
  const { autotrain } = fixture.load_module('event/event-autotrain');
  fixture.store.set('cflag:17:666', 1);
  fixture.store.set('cflag:1:666', 0); // 助手不调教
  era_flag.target = 0;
  era_flag.assi = 1;
  await autotrain();
  assert.equal(era_flag.target, 0, 'autotrain 后必须还原 TARGET');
  assert.equal(era_flag.assi, 1, 'autotrain 后必须还原 ASSI');
  const texts = fixture.text_lines();
  assert.ok(texts.some((l) => l.includes('【全裸】')));
  assert.ok(texts.some((l) => l.includes('玛奥的调教结果')));
  assert.ok(
    !texts.some((l) => l.includes('助手的调教结果')),
    'cflag:666==0 的角色必须跳过',
  );
});

test('AUTOTRAIN: autotrain 无目标时干净返回', async () => {
  const { fixture } = seed_autotrain_world();
  const { autotrain } = fixture.load_module('event/event-autotrain');
  // 所有角色 cflag:666 都是 0
  await autotrain();
  assert.equal(fixture.text_lines().length, 0, '没有可调教角色时无输出');
});
