/**
 * ere/system/train/train-message.js 的行为测试（issue #45 起；#219 起爱抚
 * 0-9 分支归 com-caress.js，本文件装载族模块后经分发族驱动同一批行为）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - B 的爱抚描写行（接吻条件、体型/肤色修饰、妊娠行、省略设定短路）；
 *   - A 的快感触感分档（c = delta:0 + delta:14 的六档、逐档边界抽样）与
 *     守卫（TEQUIP:44 / TFLAG:899 / 其他指令落存根占位）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

function seed_message_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0); // callname:0:-1（描写行的 SAVESTR:PLAYER）由此落
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.selectcom = 0;
  fixture.load_module('system/train/com-caress'); // 分支 0 的注册在族模块
  const { train_message_a, train_message_b } = fixture.load_module(
    'system/train/train-message',
  );
  return { fixture, era_flag, train_message_a, train_message_b };
}

// —— @TRAIN_MESSAGE_B（爱抚分支） ——

test('B 基础行：口净 + 已初吻 → 你轻舔着…的唇、仔细爱抚着…的身体……', async () => {
  const { fixture, era_flag, train_message_b } = seed_message_world();
  fixture.store.set('cflag:31:16', 3); // 已有接吻经验
  await train_message_b();

  assert(
    fixture.text_lines().includes('你轻舔着温妮的唇、仔细爱抚着温妮的身体……'),
    '基础描写行（SAVESTR:PLAYER/TARGET 经 callname:-1）',
  );
  assert(!era_flag.assiplay, '世界底座是主人调教');
});

test('B 接吻前缀阻断时回落到无前缀行（口污一例；口塞/初吻见阻断用例）', async () => {
  const { fixture, train_message_b } = seed_message_world();
  fixture.store.set('cflag:31:16', 3);
  fixture.store.set('stain:31:0', 4); // 口污（≥ 2 且非 16/17）
  await train_message_b();
  assert(fixture.text_lines().includes('你仔细爱抚着温妮的身体……'));
});

test('B 接吻前缀的三条阻断：口污 / 口塞 / 初吻未体验', async () => {
  // 口污（STAIN:0 ≥ 2 且非 16/17）
  const dirty = seed_message_world();
  dirty.fixture.store.set('cflag:31:16', 3);
  dirty.fixture.store.set('stain:31:0', 4);
  await dirty.train_message_b();
  assert(
    dirty.fixture.text_lines().includes('你仔细爱抚着温妮的身体……'),
    '口污时无轻舔前缀',
  );

  // 口塞（TEQUIP:45）
  const gag = seed_message_world();
  gag.fixture.store.set('cflag:31:16', 3);
  gag.fixture.store.set('tequip:31:45', 1);
  await gag.train_message_b();
  assert(gag.fixture.text_lines().includes('你仔细爱抚着温妮的身体……'));

  // 初吻未体验（CFLAG:16 == -1）
  const virgin = seed_message_world();
  virgin.fixture.store.set('cflag:31:16', -1);
  await virgin.train_message_b();
  assert(virgin.fixture.text_lines().includes('你仔细爱抚着温妮的身体……'));
});

test('B 主人【不怕脏】（TALENT:64）时口污也接吻', async () => {
  const { fixture, train_message_b } = seed_message_world();
  fixture.store.set('talent:0:64', 1);
  fixture.store.set('cflag:31:16', 3);
  fixture.store.set('stain:31:0', 4);
  await train_message_b();
  assert(
    fixture.text_lines().includes('你轻舔着温妮的唇、仔细爱抚着温妮的身体……'),
  );
});

test('B 体型/肤色修饰：娇小 + 白皙（接吻前缀同在）', async () => {
  const { fixture, train_message_b } = seed_message_world();
  fixture.store.set('talent:31:100', 1); // 娇小
  fixture.store.set('talent:31:255', 1); // 白皙
  await train_message_b();
  assert(
    fixture
      .text_lines()
      .includes('你轻舔着温妮的唇、仔细爱抚着温妮娇小的白皙的身体……'),
  );
});

test('B 妊娠行：TALENT:153 且 CFLAG:110 ≤ DAY+10', async () => {
  const { fixture, era_flag, train_message_b } = seed_message_world();
  fixture.store.set('talent:31:153', 1);
  fixture.store.set('cflag:31:110', 5);
  era_flag.day_count = 0; // 5 ≤ 0+10 成立
  await train_message_b();
  assert(
    fixture.text_lines().includes('温妮圆滚滚的腹部里、微微感觉到胎儿在踢脚……'),
  );
});

test('B 省略设定（FLAG:6 & 1）：整函数短路，无任何输出', async () => {
  const { fixture, train_message_b } = seed_message_world();
  fixture.store.set('flag:6', 1);
  await train_message_b();
  assert.equal(fixture.lines.length, 0);
});

test('B 其他指令：落存根占位行（可检索原作函数名）', async () => {
  const { fixture, era_flag, train_message_b } = seed_message_world();
  era_flag.selectcom = 12;
  await train_message_b();
  assert(
    fixture.text_lines().some((line) => line.includes('@TRAIN_MESSAGE_B')),
  );
});

// —— @TRAIN_MESSAGE_A（爱抚反应分支） ——

test('A 六档分档：c = delta:0 + delta:14 逐档取样', async () => {
  // [c, 期望行片段]（c 的档界：<100 / <300 / <1000 / <3000 / <6000 / else）
  const cases = [
    [50, '好像没有感觉到快感的样子'],
    [200, '身体起了反应、微微颤抖着'],
    [999, '像被轻微电击一样、微微颤动着'],
    [2999, '明确地感受到了快感'],
    [5999, '被挑起了激烈的情欲'],
    [6000, '主动请求给她更多'],
  ];
  for (const [c, expected] of cases) {
    const { fixture, train_message_a } = seed_message_world();
    fixture.store.set('delta:31:0', c);
    await train_message_a();
    assert(
      fixture.text_lines().some((line) => line.includes(expected)),
      `c = ${c} 应落在「${expected}」档`,
    );
  }
});

test('A 低档的素质分支：反抗心 / 胆怯 / 默认', async () => {
  for (const [talent_id, expected] of [
    [11, '一边被爱抚、一边采取着反抗的态度'],
    [10, '小小地悲鸣了一下、身体都僵硬了'],
  ]) {
    const { fixture, train_message_a } = seed_message_world();
    fixture.store.set('delta:31:0', 0); // c = 0 < 100
    fixture.store.set(`talent:31:${talent_id}`, 1);
    await train_message_a();
    assert(fixture.text_lines().some((line) => line.includes(expected)));
  }
  const plain = seed_message_world();
  await plain.train_message_a();
  assert(
    plain.fixture
      .text_lines()
      .some((line) =>
        line.includes('把身体扭来扭去、好像没有感觉到快感的样子'),
      ),
  );
});

test('A 第三档的感情淡薄前缀（TALENT:22）', async () => {
  const { fixture, train_message_a } = seed_message_world();
  fixture.store.set('delta:31:0', 500);
  fixture.store.set('talent:31:22', 1);
  await train_message_a();
  assert(
    fixture
      .text_lines()
      .includes(
        '虽然表情上没有任何变化、但温妮的身体却像被轻微电击一样、微微颤动着。',
      ),
  );
});

test('A 守卫：TEQUIP:44 / TFLAG:899 > 1 / 其他指令 → 存根占位', async () => {
  const rope = seed_message_world();
  rope.fixture.store.set('tequip:31:44', 1);
  await rope.train_message_a();
  assert(rope.fixture.text_lines().some((l) => l.includes('@TRAIN_MESSAGE_A')));

  const fainted = seed_message_world();
  fainted.fixture.store.set('tflag:899', 2);
  await fainted.train_message_a();
  assert(
    fainted.fixture.text_lines().some((l) => l.includes('@TRAIN_MESSAGE_A')),
  );

  const other = seed_message_world();
  other.era_flag.selectcom = 12;
  await other.train_message_a();
  assert(
    other.fixture.text_lines().some((l) => l.includes('@TRAIN_MESSAGE_A')),
  );
});

// —— @TRAIN_MESSAGE_A 公共绝顶段（EVENT_TRAIN_MESSAGE_A.ERB:377-424） ——

test('A 公共绝顶：TFLAG:29 在 COM12 专属反应之前输出同一行', async () => {
  const { fixture, era_flag, train_message_a } = seed_message_world();
  fixture.load_module('system/train/com-toy');
  era_flag.selectcom = 12;
  fixture.store.set('tflag:29', 1);
  fixture.store.set('delta:31:0', 1000);
  await train_message_a();

  const lines = fixture.text_lines();
  assert.deepEqual(lines.slice(-2), [
    '温妮背脊夸张地向后仰、全身哆嗦着、颤动到了极点。',
    '阴蒂被振动杖按压着、温妮轻轻地可爱呻吟着、身体颤抖不已。',
  ]);
});

test('A 公共绝顶：爱液档、终档与 TFLAG:899 守卫逐字生效', async () => {
  const transparent = seed_message_world();
  transparent.fixture.store.set('tflag:29', 5);
  await transparent.train_message_a();
  assert(
    transparent.fixture
      .text_lines()
      .includes('温妮阴唇里喷出透明的爱液、全身哆嗦着、颤动到了极点。'),
  );

  const opaque = seed_message_world();
  opaque.fixture.store.set('tflag:29', 12);
  await opaque.train_message_a();
  assert(
    opaque.fixture
      .text_lines()
      .includes(
        '温妮阴唇里喷出混合着白浊的爱液、露出快乐又淫媚的神色、绝顶高潮了……',
      ),
  );

  const suppressed = seed_message_world();
  suppressed.fixture.store.set('tflag:29', 1);
  suppressed.fixture.store.set('tflag:899', 2);
  await suppressed.train_message_a();
  assert(
    !suppressed.fixture.text_lines().some((line) => line.includes('背脊夸张')),
    'TFLAG:899 > 1 时跳过普通绝顶段',
  );
});

test('A 公共绝顶：母乳、两性人和对象射精按原作拼接', async () => {
  const milk = seed_message_world();
  milk.fixture.store.set('tflag:29', 5);
  milk.fixture.store.set('tflag:11', 2);
  await milk.train_message_a();
  assert(
    milk.fixture
      .text_lines()
      .includes(
        '温妮从胸前喷出大量香喷喷的母乳、阴唇里喷出透明的爱液、全身哆嗦着、颤动到了极点。',
      ),
  );

  const intersex = seed_message_world();
  intersex.fixture.store.set('tflag:29', 9);
  intersex.fixture.store.set('talent:31:121', 1);
  await intersex.train_message_a();
  assert(
    intersex.fixture
      .text_lines()
      .includes('温妮背脊夸张地向后仰、全身哆嗦着、颤动到了极点。'),
    '两性人不输出爱液，但保留背脊反应',
  );

  const ejaculation = seed_message_world();
  ejaculation.fixture.store.set('tflag:29', 1);
  ejaculation.fixture.store.set('tflag:10', 2);
  ejaculation.fixture.store.set('talent:31:318', 4);
  await ejaculation.train_message_a();
  assert(
    ejaculation.fixture
      .text_lines()
      .includes(
        '温妮跳动着、马一样的阴茎中大量的精液飞散而出。全身哆嗦着、颤动到了极点。',
      ),
  );
});
