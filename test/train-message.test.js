/**
 * ere/system/train/train-message.js 的行为测试（issue #45 起；#219 起爱抚
 * 0-9 分支归 com-caress.js，本文件装载族模块后经分发族驱动同一批行为）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - B 的爱抚描写行（接吻条件、体型/肤色修饰、妊娠行、省略设定短路）；
 *   - A 的快感触感分档（c = delta:0 + delta:14 的六档、逐档边界抽样）与
 *     守卫（TEQUIP:44 / TFLAG:899 / 其他指令落存根占位）；
 *   - A 的公共段（#402：两文件全量补齐——股间射精 TFLAG:9、TFLAG:16/7/18、
 *     口中射精 TFLAG:0、手中射精 TFLAG:1、性交射精 TFLAG:2、失禁 TFLAG:899、
 *     处女丧失/近亲/口交清洁 TFLAG:3/TFLAG:8 与绝顶段的指令子链）。
 *
 * 公共段的断言一律取 text_lines() 的前缀：公共段在 @TRAIN_MESSAGE_A 里先于
 * 指令分发执行（源 :31-741 在 :746 的 SELECTCOM 链之前），前缀逐字比对能
 * 同时拦住「少打一行」与「多打一行」。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** 消息用例的世界底座：魔王 0 + 奴隶 31（assi 给出时再入一个助手）。 */
function seed_message_world({ assi = -1 } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0); // callname:0:-1（描写行的 SAVESTR:PLAYER）由此落
  join_slave_chara(fixture, 31, '温妮');
  if (assi > 0) {
    fixture.seed_chara(assi, {
      id: assi,
      name: `助手${assi}`,
      callname: `助手${assi}`,
    });
    fixture.era.addCharacter(assi);
  }
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = assi;
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

// —— @TRAIN_MESSAGE_A 公共段：股间性交射精（EVENT_TRAIN_MESSAGE_A.ERB:31-110） ——

/**
 * TFLAG:9 段的维度表：TFLAG:9（0 对象射精 / 1 主人射精 / 2 主人大量射精）
 * × SELECTCOM（122 阴茎互捅 / 33 股间性交 / 62 双人股间 / 其他）× 肌肤色
 * （244 恶魔肌肤 / 253 褐色肌肤 / 255 白皙 / 无）。
 *
 * lines 是源侧逐字拼出的期望行（PRINTFORM 片段按 Emuera 的追加语义拼成一
 * 行，PRINTL 收尾）；`[]` = 该组合下源侧一条 PRINTL 都不落。
 */
const TF9_CASES = [
  // —— TFLAG:9 == 0：对象射精（仅 122/33/62 有话说，且需 TFLAG:10 ≥ 1）——
  {
    desc: '0 臂 · 122 · 对象普通射精',
    t9: 0,
    t10: 1,
    com: 122,
    lines: ['温妮射精出的精液、将你的阴茎用精液一吐为快了…'],
  },
  {
    desc: '0 臂 · 122 · 对象大量射精（TFLAG:10 ≥ 2 插「大量」）',
    t9: 0,
    t10: 2,
    com: 122,
    lines: ['温妮射精出的大量精液、将你的阴茎用精液一吐为快了…'],
  },
  {
    desc: '0 臂 · 122 · TFLAG:10 == 0 → 整段静默',
    t9: 0,
    t10: 0,
    com: 122,
    lines: [],
  },
  {
    desc: '0 臂 · 33 · 恶魔肌肤（244）',
    t9: 0,
    t10: 1,
    com: 33,
    skin: [244],
    lines: ['温妮射精出的精液、把你的蓝色肌肤弄脏了…'],
  },
  {
    desc: '0 臂 · 33 · 褐色肌肤（253）',
    t9: 0,
    t10: 1,
    com: 33,
    skin: [253],
    lines: ['温妮射精出的精液、把你的褐色肌肤弄脏了…'],
  },
  {
    desc: '0 臂 · 33 · 白皙（255）',
    t9: 0,
    t10: 1,
    com: 33,
    skin: [255],
    lines: ['温妮射精出的精液、把你的白皙肌肤弄脏了…'],
  },
  {
    desc: '0 臂 · 33 · 无肌肤素质 → 源侧断句残留（1:1）',
    t9: 0,
    t10: 1,
    com: 33,
    lines: ['温妮射精出的精液、把你的'],
  },
  {
    desc: '0 臂 · 62 · 白皙（无「精液、把…的」前缀 + 第二行）',
    t9: 0,
    t10: 1,
    com: 62,
    skin: [255],
    lines: ['温妮射精出的白皙肌肤弄脏了…', '射出的精液、把两人的身体都弄脏了…'],
  },
  {
    desc: '0 臂 · 62 · 无肌肤素质 → 断句残留 + 第二行',
    t9: 0,
    t10: 1,
    com: 62,
    lines: ['温妮射精出的', '射出的精液、把两人的身体都弄脏了…'],
  },
  {
    desc: '0 臂 · 其他指令 → 整段静默',
    t9: 0,
    t10: 2,
    com: 0,
    lines: [],
  },
  // —— TFLAG:9 == 1：主人射精 ——
  {
    desc: '1 臂 · 122 · 主人是扶她 → 两人同时射精',
    t9: 1,
    t10: 1,
    com: 122,
    player_futa: 121,
    lines: ['两人同时射精、对彼此的阴茎用精液一吐为快了…'],
  },
  {
    desc: '1 臂 · 122 · TFLAG:10 == 0 → 只弄脏对象的阴茎',
    t9: 1,
    t10: 0,
    com: 122,
    lines: ['射出的精液、把温妮的阴茎弄脏了…'],
  },
  {
    desc: '1 臂 · 122 · 对象射了但主人不是扶她 → 仍走主人单独射精',
    t9: 1,
    t10: 1,
    com: 122,
    lines: ['射出的精液、把温妮的阴茎弄脏了…'],
  },
  {
    desc: '1 臂 · 122 · 主人是扶她但对象没射 → 仍走主人单独射精',
    t9: 1,
    t10: 0,
    com: 122,
    player_futa: 122,
    lines: ['射出的精液、把温妮的阴茎弄脏了…'],
  },
  {
    desc: '1 臂 · 33 · 白皙',
    t9: 1,
    t10: 0,
    com: 33,
    skin: [255],
    lines: ['射出的精液、把温妮的白皙肌肤弄脏了…'],
  },
  {
    desc: '1 臂 · 33 · 无肌肤素质（色名链无 ELSE，收尾句照落）',
    t9: 1,
    t10: 0,
    com: 33,
    lines: ['射出的精液、把温妮的肌肤弄脏了…'],
  },
  {
    desc: '1 臂 · 62 · 双人股间',
    t9: 1,
    t10: 0,
    com: 62,
    lines: ['射出的精液、把两人的身体都弄脏了…'],
  },
  {
    desc: '1 臂 · 其他指令 → 整段静默',
    t9: 1,
    t10: 0,
    com: 0,
    lines: [],
  },
  // —— TFLAG:9 == 2：主人大量射精 ——
  {
    desc: '2 臂 · 122 · 主人是扶她 → 两人同时射精',
    t9: 2,
    t10: 1,
    com: 122,
    player_futa: 122,
    lines: ['两人同时射精、对彼此的阴茎用大量的精液一吐为快…'],
  },
  {
    desc: '2 臂 · 122 · TFLAG:10 == 0 → 大量精液弄黏对象',
    t9: 2,
    t10: 0,
    com: 122,
    lines: ['你射出大量的精液、把温妮的阴茎搞得黏黏糊糊…'],
  },
  {
    desc: '2 臂 · 33 · 褐色肌肤',
    t9: 2,
    t10: 0,
    com: 33,
    skin: [253],
    lines: ['温妮的褐色肌肤被射出的大量精液沾满了…'],
  },
  {
    desc: '2 臂 · 33 · 无肌肤素质（色名链无 ELSE，收尾句照落）',
    t9: 2,
    t10: 0,
    com: 33,
    lines: ['温妮的肌肤被射出的大量精液沾满了…'],
  },
  {
    desc: '2 臂 · 62 · 双人股间',
    t9: 2,
    t10: 0,
    com: 62,
    lines: ['两人的身体被射出的大量精液沾满了…'],
  },
];

for (const c of TF9_CASES) {
  test(`A 公共段 · TFLAG:9 股间射精：${c.desc}`, async () => {
    const { fixture, era_flag, train_message_a } = seed_message_world();
    era_flag.selectcom = c.com;
    // 基线：TFLAG:9 取空间外值（公共段整段静默），只留指令分发的输出
    fixture.store.set('tflag:9', 9);
    fixture.lines.length = 0;
    await train_message_a();
    const base = fixture.text_lines();

    fixture.store.set('tflag:9', c.t9);
    fixture.store.set('tflag:10', c.t10);
    for (const id of c.skin ?? []) {
      fixture.store.set(`talent:31:${id}`, 1);
    }
    if (c.player_futa) {
      fixture.store.set(`talent:0:${c.player_futa}`, 1);
    }
    fixture.lines.length = 0;
    await train_message_a();

    assert.deepEqual(
      fixture.text_lines(),
      [...c.lines, ...base],
      `${c.desc}：公共段输出应恰好插在指令分发之前`,
    );
  });
}

// —— @TRAIN_MESSAGE_A 公共段：狗射精（:151-161）与助手射精（:165-172） ——

/**
 * 狗射精段的维度表：TFLAG:16 > 0 × SELECTCOM（21/34 私处、27 直肠、31 嘴、
 * 30 手、其他静默）。四支靠 SELECTCOM 互斥，故一条用例走完整个维度。
 */
const TF16_CASES = [
  [21, '温妮的私处里、被狗灌入了那又臭又热的精液…'],
  [34, '温妮的私处里、被狗灌入了那又臭又热的精液…'],
  [27, '温妮的直肠里、被狗灌入了那又臭又热的精液…'],
  [31, '温妮的嘴里、被狗灌入了那又臭又热的精液…'],
  [30, '温妮的手上、沾满了狗那又臭又热的精液…'],
  [26, null],
];

for (const [com, expected] of TF16_CASES) {
  test(`A 公共段 · TFLAG:16 狗射精：SELECTCOM ${com}`, async () => {
    const { fixture, era_flag, train_message_a } = seed_message_world();
    era_flag.selectcom = com;
    fixture.lines.length = 0;
    await train_message_a();
    const base = fixture.text_lines(); // TFLAG:16 未置 → 公共段静默

    fixture.store.set('tflag:16', 1);
    fixture.lines.length = 0;
    await train_message_a();
    assert.deepEqual(fixture.text_lines(), [
      ...(expected === null ? [] : [expected]),
      ...base,
    ]);
  });
}

test('A 公共段 · TFLAG:16：旗标为 0 时整段静默', async () => {
  const { fixture, era_flag, train_message_a } = seed_message_world();
  era_flag.selectcom = 21;
  await train_message_a();
  assert(
    !fixture.text_lines().some((line) => line.includes('被狗灌入')),
    'TFLAG:16 == 0 → 无狗射精行',
  );
});

test('A 公共段 · TFLAG:7 助手射精：两支文案 + 独立的羡慕句', async () => {
  const one = seed_message_world({ assi: 17 });
  one.fixture.store.set('tflag:7', 1);
  one.fixture.store.set('abl:31:11', 4); // 欲望 > 3 → 第三句
  one.fixture.lines.length = 0;
  await one.train_message_a();
  assert.deepEqual(one.fixture.text_lines().slice(0, 2), [
    '当着温妮的面、在助手17的体内深处射出了精液…',
    '温妮用羡慕的眼光凝视着助手17被内射的样子…',
  ]);

  const two = seed_message_world({ assi: 17 });
  two.fixture.store.set('tflag:7', 2);
  two.fixture.lines.length = 0;
  await two.train_message_a();
  assert.deepEqual(two.fixture.text_lines().slice(0, 1), [
    '当着温妮的面、在助手17的体内深处射满了精液、溢出来了……',
  ]);
  assert(
    !two.fixture.text_lines().some((line) => line.includes('射出了精液')),
    '2 支不落 1 支的句子',
  );
});

test('A 公共段 · TFLAG:7：羡慕句的门是 (ABL:11 > 3 || ABL:32 > 2) && TFLAG:899 <= 1', async () => {
  // 精液中毒 > 2 命中前半，但失神 2 咬掉整句（同优先级左结合读法）
  const fainted = seed_message_world({ assi: 17 });
  fainted.fixture.store.set('tflag:7', 1);
  fainted.fixture.store.set('abl:31:32', 3);
  fainted.fixture.store.set('tflag:899', 2);
  fainted.fixture.lines.length = 0;
  await fainted.train_message_a();
  assert(
    !fainted.fixture.text_lines().some((line) => line.includes('羡慕的眼光')),
    'TFLAG:899 = 2 咬掉羡慕句',
  );

  // 有精液中毒且未失神 → 羡慕句落
  const poisoned = seed_message_world({ assi: 17 });
  poisoned.fixture.store.set('tflag:7', 1);
  poisoned.fixture.store.set('abl:31:32', 3);
  poisoned.fixture.lines.length = 0;
  await poisoned.train_message_a();
  assert.deepEqual(poisoned.fixture.text_lines().slice(0, 2), [
    '当着温妮的面、在助手17的体内深处射出了精液…',
    '温妮用羡慕的眼光凝视着助手17被内射的样子…',
  ]);

  // 两项都不满 → 只有本体句
  const plain = seed_message_world({ assi: 17 });
  plain.fixture.store.set('tflag:7', 1);
  plain.fixture.store.set('abl:31:11', 3);
  plain.fixture.store.set('abl:31:32', 2);
  plain.fixture.lines.length = 0;
  await plain.train_message_a();
  assert.deepEqual(plain.fixture.text_lines().slice(0, 1), [
    '当着温妮的面、在助手17的体内深处射出了精液…',
  ]);
  assert(
    !plain.fixture.text_lines().some((line) => line.includes('羡慕的眼光')),
  );

  // TFLAG:7 == 0 → 整段静默（含羡慕句）
  const idle = seed_message_world({ assi: 17 });
  idle.fixture.store.set('abl:31:11', 9);
  idle.fixture.lines.length = 0;
  await idle.train_message_a();
  assert(
    !idle.fixture
      .text_lines()
      .some(
        (line) => line.includes('体内深处射出') || line.includes('羡慕的眼光'),
      ),
    'TFLAG:7 == 0 → 整段静默',
  );
});

// —— @TRAIN_MESSAGE_A 公共段：射精链（:177-373）——
//
// 一条 IF/ELSEIF 链吃六种射精旗标（TFLAG:0 == 1/2 口、TFLAG:1 == 1/2 手、
// TFLAG:18 == 1/2 足），末尾一支是 SELECTCOM == 55 的放置 PLAY。链的语义
// 是「先命中先落、其余整支跳过」，所以维度表每一行都断言输出前缀。

/**
 * 射精链的维度表。[arm, com, 期望行, opts]
 * arm = '0-1' / '0-2' / '1-1' / '1-2' / '18-1' / '18-2'（旗标与档位）；
 * opts.target = 对象素质 {编号: 值}；opts.player = 主人素质；
 * opts.store = 其余变量（键名为 era 变量名）；opts.assi 给出时入助手 17。
 */
const CHAIN_CASES = [
  // —— 口（TFLAG:0 == 1）——
  [
    '0-1',
    31,
    ['温妮带着恍惚的表情、把注入口中的精液喝光了…'],
    { store: { 'abl:31:32': 3 } },
  ],
  [
    '0-1',
    31,
    ['温妮喉咙发出模糊不清的声音、把注入口中的精液喝光了…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-1', 31, ['精液注入到温妮的嘴里了…'], {}],
  [
    '0-1',
    125,
    ['温妮带着恍惚的表情、把注入口中的精液喝光了…'],
    { store: { 'abl:31:32': 3 } },
  ],
  [
    '0-1',
    32,
    ['温妮蓝色的圆润挺拔的诱惑豪乳之间、积存着精液…'],
    { target: { 110: 1, 244: 1 } },
  ],
  [
    '0-1',
    32,
    ['温妮圆润挺拔的诱惑豪乳之间、积存着精液…'],
    { target: { 114: 1 } },
  ],
  [
    '0-1',
    32,
    ['温妮白皙的胸口到脸之间、精液四处飞散着…'],
    { target: { 255: 1 } },
  ],
  ['0-1', 68, ['温妮和助手17用嘴接住精液…'], { assi: true }],
  ['0-1', 69, ['温妮身体颤抖着、承受来自阴部的刺激、同时把精液咽下…'], {}],
  [
    '0-1',
    80,
    ['紧紧抓住温妮的头、在她喉咙深处射出…'],
    { store: { 'tflag:899': 2 } },
  ],
  [
    '0-1',
    80,
    ['温妮带着恍惚的表情、把强行灌入喉咙的精液喝光了…'],
    { store: { 'abl:31:32': 3 } },
  ],
  [
    '0-1',
    80,
    ['温妮喝掉了直接叩开喉咙强行灌进来的精液…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-1', 124, ['紧紧抓住温妮的头、在她喉咙深处射出…'], {}],
  [
    '0-1',
    123,
    ['你的阴茎、一边享受胸部的按摩、一边在温妮的嘴里倾泻精液…'],
    { target: { 109: 1 } },
  ],
  ['0-1', 123, ['你的阴茎、一边被胸部紧紧夹住、一边在温妮的嘴里倾泻精液…'], {}],
  [
    '0-1',
    126,
    ['温妮喉咙发出模糊不清的声音、把注入口中的精液喝光了…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-1', 126, ['精液注入到温妮的口中了…'], {}],
  [
    '0-1',
    126,
    [
      '精液注入到温妮的口中了…',
      '温妮揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。',
    ],
    { store: { 'abl:31:32': 3 }, player: { 122: 1 } },
  ],
  [
    '0-1',
    126,
    [
      '精液注入到温妮的口中了…',
      '温妮撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。',
    ],
    { store: { 'abl:31:32': 3 }, player: { 121: 1 } },
  ],
  [
    '0-1',
    127,
    ['温妮淫秽地吸啜着阴茎、在她口中开射出…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-1', 127, ['温妮吸啜着阴茎、在她口中开放了精关…'], {}],
  [
    '0-1',
    127,
    [
      '温妮吸啜着阴茎、在她口中开放了精关…',
      '温妮带着恍惚的表情、把阴茎上的精液吸吮干净了。',
    ],
    { store: { 'abl:31:32': 3 } },
  ],
  ['0-1', 0, [], {}],
  // —— 口（TFLAG:0 == 2）——
  [
    '0-2',
    31,
    ['温妮带着恍惚的表情、把口中的精液喝光了…'],
    { store: { 'abl:31:32': 3 } },
  ],
  [
    '0-2',
    31,
    ['没喝完的精液、从温妮的嘴里溢出来了…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-2', 31, ['满满的精液、把温妮的喉咙叩开了…'], {}],
  [
    '0-2',
    32,
    ['大量的精液飞散而出、温妮蓝色的胸部和脸之间、全被射满了…'],
    { target: { 244: 1 } },
  ],
  ['0-2', 32, ['大量的精液飞散而出、温妮胸部和脸之间、全被射满了…'], {}],
  ['0-2', 68, ['大量的精液倾泻在温妮和助手17的脸上…'], { assi: true }],
  ['0-2', 69, ['温妮因阴部的刺激全身颤抖着、然后把精液喝下去了…'], {}],
  [
    '0-2',
    80,
    ['紧紧抓住温妮的头、在她喉咙深处放开精关…'],
    { store: { 'tflag:899': 2 } },
  ],
  [
    '0-2',
    80,
    ['温妮带着恍惚的表情、把直接灌入喉咙的精液喝光了…'],
    { store: { 'abl:31:32': 3 } },
  ],
  [
    '0-2',
    80,
    ['温妮被呛到、一边忍住不把喉咙里的精液咳出来、一边把它喝光了…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-2', 124, ['在温妮喉咙深处射出的精液、从口中溢出来了…'], {}],
  [
    '0-2',
    123,
    [
      '你的阴茎、一边享受胸部的按摩、一边在温妮的嘴里倾泻了大量精液…',
      '从嘴里溢出来的精液、把阴茎和胸部都染成白色了…',
    ],
    { target: { 109: 1 } },
  ],
  [
    '0-2',
    123,
    [
      '你的阴茎、一边被胸部紧紧夹住、一边在温妮的嘴里倾泻了大量精液…',
      '从嘴里溢出来的精液、把阴茎和胸部都染成白色了…',
    ],
    {},
  ],
  [
    '0-2',
    126,
    ['没喝完的精液、从温妮的嘴里溢出了…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-2', 126, ['满满的精液、把温妮的喉咙叩开了…'], {}],
  [
    '0-2',
    126,
    [
      '满满的精液、把温妮的喉咙叩开了…',
      '满溢的精液、将温妮的嘴边搞得一塌糊涂。揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。',
    ],
    { store: { 'abl:31:32': 3 }, player: { 122: 1 } },
  ],
  [
    '0-2',
    126,
    [
      '满满的精液、把温妮的喉咙叩开了…',
      '满溢的精液、将温妮的嘴边搞得一塌糊涂。撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。',
    ],
    { store: { 'abl:31:32': 3 }, player: { 121: 1 } },
  ],
  [
    '0-2',
    127,
    ['温妮淫秽地吸啜着阴茎、在她嘴里、大量的精液喷涌而出…'],
    { store: { 'abl:31:16': 3 } },
  ],
  ['0-2', 127, ['温妮吸啜着阴茎、在她嘴里、大量的精液喷涌而出…'], {}],
  [
    '0-2',
    127,
    [
      '温妮吸啜着阴茎、在她嘴里、大量的精液喷涌而出…',
      '精液从嘴里溢出、温妮带着恍惚的表情、把阴茎上的精液吸吮干净…',
    ],
    { store: { 'abl:31:32': 3 } },
  ],
  // —— 手（TFLAG:1）——
  [
    '1-1',
    0,
    ['带着惊讶的神情、精液射到温妮的身上了…'],
    { store: { 'exp:31:20': 0 } },
  ],
  [
    '1-1',
    0,
    ['带着恍惚的表情、精液射到温妮的身上了…'],
    { store: { 'exp:31:20': 1, 'abl:31:32': 3 } },
  ],
  [
    '1-1',
    0,
    ['带着惊讶的神情、带着恍惚的表情、精液射到温妮的身上了…'],
    { store: { 'exp:31:20': 0, 'abl:31:32': 3 } },
  ],
  [
    '1-1',
    0,
    ['精液射到温妮的身上了…'],
    { store: { 'tflag:899': 2, 'abl:31:32': 3 } },
  ],
  // 失神门是「<= 1」：TFLAG:899 == 1 时两句前缀照落（值 1 的两侧都钉住）
  [
    '1-1',
    0,
    ['带着惊讶的神情、带着恍惚的表情、精液射到温妮的身上了…'],
    { store: { 'tflag:899': 1, 'abl:31:32': 3 } },
  ],
  [
    '1-2',
    0,
    ['温妮的脸上、手上、沾满了大量的精液…'],
    { store: { 'exp:31:20': 1, 'abl:31:32': 1 } },
  ],
  [
    '1-2',
    0,
    ['带着恍惚的表情、温妮的脸上、手上、沾满了大量的精液…'],
    { store: { 'exp:31:20': 1, 'abl:31:32': 3 } },
  ],
  // —— 足（TFLAG:18）——
  [
    '18-1',
    0,
    ['温妮带着轻蔑的眼神、看着你将热乎乎的精液射到她的脚上了…'],
    { target: { 83: 1 } },
  ],
  [
    '18-1',
    0,
    ['温妮带着轻蔑的眼神、看着你将热乎乎的精液射到她的脚上了…'],
    { store: { 'abl:31:20': 3 } },
  ],
  [
    '18-1',
    0,
    ['温妮看着你将热乎乎的精液射到她的脚上了…'],
    { target: { 83: 1, 85: 1 } },
  ],
  ['18-2', 0, ['温妮看着你将大量热乎乎的精液射到她的脚上了…'], {}],
  [
    '18-2',
    0,
    ['温妮带着轻蔑的眼神、看着你将大量热乎乎的精液射到她的脚上了…'],
    { store: { 'abl:31:20': 3 } },
  ],
];

/** 按维度表的一行铺世界状态（arm 决定旗标档位）。 */
function seed_chain_world(spec) {
  const [arm, com, , opts = {}] = spec;
  const world = seed_message_world(opts.assi ? { assi: 17 } : {});
  world.era_flag.selectcom = com;
  const [flag, value] = arm.split('-');
  world.fixture.store.set(`tflag:${flag}`, Number(value));
  for (const [key, val] of Object.entries(opts.store ?? {})) {
    world.fixture.store.set(key, val);
  }
  for (const [id, val] of Object.entries(opts.target ?? {})) {
    world.fixture.store.set(`talent:31:${id}`, val);
  }
  for (const [id, val] of Object.entries(opts.player ?? {})) {
    world.fixture.store.set(`talent:0:${id}`, val);
  }
  return world;
}

CHAIN_CASES.forEach((spec, index) => {
  const [arm, com, lines] = spec;
  test(`A 射精链 · TFLAG:${arm} · 指令 ${com} · 第 ${index + 1} 行`, async () => {
    const { fixture, train_message_a } = seed_chain_world(spec);
    fixture.lines.length = 0;
    await train_message_a();
    assert.deepEqual(
      fixture.text_lines().slice(0, lines.length),
      lines,
      `TFLAG:${arm} · 指令 ${com} 的公共段输出`,
    );
    if (lines.length === 0) {
      assert(
        !fixture
          .text_lines()
          .some((line) => line.includes('精液射到温妮的身上了')),
        '未命中任何臂 → 射精链整段静默',
      );
    }
  });
});

test('A 射精链末支 · 放置 PLAY（指令 55）：欲情四档逐档取件', async () => {
  // [PALAM:5, TEQUIP:21, 期望行]——阈值为 PALAMLV[3] = 3000 / [4] = 10000 /
  // [5] = 30000（ere/era-utils/palam-level.js）
  const cases = [
    [2999, 0, []],
    [3000, 0, ['温妮急促的呼吸着……']],
    [3000, 1, ['温妮急促的呼吸着、身体不断地颤抖着……']],
    [10000, 0, ['温妮急促的呼吸着、紧蹙摩擦的双腿已经捂不住流淌出的粘液了……']],
    [
      30000,
      1,
      [
        '温妮急促的呼吸着、用炽热地目光看向你、身体不断地颤抖着、紧蹙摩擦的双腿已经捂不住流淌出的粘液了……',
      ],
    ],
  ];
  for (const [palam, tequip, lines] of cases) {
    const { fixture, era_flag, train_message_a } = seed_message_world();
    era_flag.selectcom = 55;
    fixture.store.set('palam:31:5', palam);
    fixture.store.set('tequip:31:21', tequip);
    fixture.lines.length = 0;
    await train_message_a();
    assert.deepEqual(fixture.text_lines().slice(0, lines.length), lines);
    if (lines.length === 0) {
      assert(
        !fixture.text_lines().some((line) => line.includes('急促的呼吸着')),
        `PALAM:5 = ${palam} 未达 PALAMLV:3 → 整支静默`,
      );
    }
  }

  // TFLAG:899 ≥ 2 抑制整支（链上的门）
  const fainted = seed_message_world();
  fainted.era_flag.selectcom = 55;
  fainted.fixture.store.set('palam:31:5', 30000);
  fainted.fixture.store.set('tflag:899', 2);
  fainted.fixture.lines.length = 0;
  await fainted.train_message_a();
  assert(
    !fainted.fixture.text_lines().some((line) => line.includes('急促的呼吸着')),
  );
});

// —— 源侧无分支的指令号：显式无操作（#402） ——
//
// 占位行的语义是「族票未落地」，而这些号在源侧从来就没有分支（B 从 54 直跳
// 56、从 109 直跳 120；A 从 42 直跳 72），落占位行是错的——源侧它们零输出。

/** 指定指令号跑一遍 A/B，看是否落了占位行 */
async function dispatch_marks(fn, id) {
  const { fixture, era_flag } = seed_message_world();
  era_flag.selectcom = id;
  fixture.lines.length = 0;
  await fn(fixture);
  return fixture.text_lines().some((line) => line.includes('尚未移植'));
}

for (const id of [55, 110, 111]) {
  test(`B 指令 ${id}：源侧无分支 → 显式无操作，不出占位行`, async () => {
    assert.equal(
      await dispatch_marks(async ({ load_module }) => {
        const { train_message_b } = load_module('system/train/train-message');
        await train_message_b();
      }, id),
      false,
    );
  });
}

for (const id of [43, 45, 49, 110, 111]) {
  test(`A 指令 ${id}：源侧无分支 → 显式无操作，不出占位行`, async () => {
    assert.equal(
      await dispatch_marks(async ({ load_module }) => {
        const { train_message_a } = load_module('system/train/train-message');
        await train_message_a();
      }, id),
      false,
    );
  });
}

test('对照：族票未落地的号仍落占位行（占位语义没被上一条吃掉）', async () => {
  // com-toy/com-sm 等族模块未装载时，12 号（B）与 45 之外的 A 位由族表缺失
  assert.equal(
    await dispatch_marks(async ({ load_module }) => {
      const { train_message_b } = load_module('system/train/train-message');
      await train_message_b();
    }, 12),
    true,
    'B 12 未装载 com-toy → 占位行仍在',
  );
});

test('A 射精链：先命中先落——口胜手、手胜放置 PLAY', async () => {
  // TFLAG:0 == 1 与 TFLAG:1 == 1 同置（指令 31，口臂有话说）：只落口臂
  const both = seed_message_world();
  both.era_flag.selectcom = 31;
  both.fixture.store.set('tflag:0', 1);
  both.fixture.store.set('tflag:1', 1);
  both.fixture.store.set('abl:31:32', 3);
  both.fixture.lines.length = 0;
  await both.train_message_a();
  assert.deepEqual(both.fixture.text_lines().slice(0, 1), [
    '温妮带着恍惚的表情、把注入口中的精液喝光了…',
  ]);
  assert(
    !both.fixture
      .text_lines()
      .some((line) => line.includes('精液射到温妮的身上了')),
    '口臂命中后手臂整条跳过（ELSEIF 语义）',
  );

  // 同两旗标、指令 0（口臂对 0 号指令无话）：**手臂一样不出声**——
  // 链已被口臂吃掉，这正是「先命中先落」与「两段独立」的区别
  const silent = seed_message_world();
  silent.fixture.store.set('tflag:0', 1);
  silent.fixture.store.set('tflag:1', 1);
  silent.fixture.lines.length = 0;
  await silent.train_message_a();
  assert.deepEqual(silent.fixture.text_lines(), [
    '温妮把身体扭来扭去、好像没有感觉到快感的样子。',
  ]);

  // TFLAG:1 == 1 与 SELECTCOM == 55 同置：链只落手臂（55 支整条跳过）
  const play = seed_message_world();
  play.era_flag.selectcom = 55;
  play.fixture.store.set('tflag:1', 1);
  play.fixture.store.set('exp:31:20', 1);
  play.fixture.store.set('palam:31:5', 3000);
  play.fixture.lines.length = 0;
  await play.train_message_a();
  assert.deepEqual(play.fixture.text_lines().slice(0, 1), [
    '精液射到温妮的身上了…',
  ]);
  assert(
    !play.fixture.text_lines().some((line) => line.includes('急促的呼吸着')),
    '前置旗标命中后放置 PLAY 支整条跳过',
  );
});

// —— @TRAIN_MESSAGE_A 公共段：性交射精链（:456-606）——
//
// 一条 IF/ELSEIF 链：CFLAG:113 乳内射精（TFLAG:2 == 1/2 各一支，1 臂还要求
// SELECTCOM == 90）→ TFLAG:2 == 1 / == 2 两臂 → ELSE 绝顶余韵（TFLAG:29
// 分档）。TFLAG:2 的两臂各自再按 `PALAM:5 < PALAMLV:4 || TFLAG:31` 分
// 「抽出」（清 TFLAG:31/60）与「插着」（不清）两张 SELECTCOM 子表。

/**
 * 公共段的前缀判据（#402）：同一世界跑两遍——先按 silence 把公共段调成
 * 静默取基线，再按 apply 铺目标态跑一遍，断言输出恰好是「期望行 + 基线」。
 * 既拦「少打一行」也拦「多打一行」。
 */
async function expect_common_lines(world, silence, apply, expected) {
  const { fixture, train_message_a } = world;
  silence();
  fixture.lines.length = 0;
  await train_message_a();
  const base = fixture.text_lines();
  apply();
  fixture.lines.length = 0;
  await train_message_a();
  assert.deepEqual(fixture.text_lines(), [...expected, ...base]);
}

/** TFLAG:2 链的维度表：arm（1 抽出 / 1 插着 / 2 抽出 / 2 插着）× 指令。 */
const TF2_CASES = [
  // —— TFLAG:2 == 1 · 抽出臂（PALAM:5 < PALAMLV:4）——
  ['1', '抽出', 20, '阴茎拔出后、阴部处精液渗出来了…'],
  ['1', '抽出', 22, '阴茎拔出后、阴部处精液渗出来了…'],
  ['1', '抽出', 21, '阴茎拔出后、阴部处精液滴出来了…'],
  ['1', '抽出', 23, '阴茎拔出后、阴部处精液滴出来了…'],
  ['1', '抽出', 26, '从肛门里漏出来的精液沿着股沟向下流……'],
  ['1', '抽出', 27, '从肛门里漏出来的精液沿着股沟向下流……'],
  ['1', '抽出', 29, '从肛门里漏出来的精液沿着股沟向下流……'],
  ['1', '抽出', 36, '从肛门里漏出来的精液沿着股沟向下流……'],
  ['1', '抽出', 25, '你射出的精液、把两人的身体都弄脏了…'],
  ['1', '抽出', 34, '阴茎拔出后、阴部处精液渗出来了…'],
  ['1', '抽出', 24, '你射出的精液、把两人的身体都弄脏了…'],
  ['1', '抽出', 121, '直接对温妮的子宫、注入了热乎乎的精液…'],
  ['1', '抽出', 130, '直接对温妮的子宫、注入了热乎乎的精液…'],
  ['1', '抽出', 134, '直接对温妮的子宫、注入了热乎乎的精液…'],
  ['1', '抽出', 120, '对准温妮私处内那最敏感的那一点、你射出了精液…'],
  // —— TFLAG:2 == 1 · 插着臂（PALAM:5 ≥ PALAMLV:4）——
  [
    '1',
    '插着',
    27,
    '精液溢出的直肠、细微地颤抖着、把插入的阴茎紧紧夹住了…',
    { tequip55: 1 },
  ],
  ['1', '插着', 26, '精液溢出的直肠、细微地颤抖着、把你的阴茎紧紧夹住了…'],
  ['1', '插着', 28, '精液溢出的直肠、细微地颤抖着、把你的阴茎紧紧夹住了…'],
  ['1', '插着', 29, '精液溢出的直肠、细微地颤抖着、把你的阴茎紧紧夹住了…'],
  ['1', '插着', 36, '精液溢出的直肠、细微地颤抖着、把你的阴茎紧紧夹住了…'],
  ['1', '插着', 25, '精液溢出的直肠、细微地颤抖着、把温妮的阴茎紧紧夹住了…'],
  ['1', '插着', 121, '直接对温妮的子宫、注入了热乎乎的精液…'],
  ['1', '插着', 130, '直接对温妮的子宫、注入了热乎乎的精液…'],
  ['1', '插着', 120, '对准温妮私处内那最敏感的那一点、你射出了精液…'],
  ['1', '插着', 24, '你被精液灌满的私处、轻轻蠕动着、把温妮的阴茎紧紧缠住了…'],
  ['1', '插着', 0, '温妮被精液灌满的私处、轻轻蠕动着、把你的阴茎紧紧缠住了…'],
  // —— TFLAG:2 == 2 · 抽出臂 ——
  ['2', '抽出', 20, '阴茎拔出后、阴部处、大量的精液渗出来了…'],
  ['2', '抽出', 21, '阴茎拔出后、阴部处、大量的精液滴出来了…'],
  ['2', '抽出', 26, '从肛门里漏出大量的精液沿着股沟向下流………'],
  ['2', '抽出', 25, '你射出的精液、把两人的身体都弄得粘稠不堪…'],
  ['2', '抽出', 34, ['阴茎拔出后、大量的精液渗出来了…']],
  [
    '2',
    '抽出',
    24,
    [
      '阴茎拔出后、大量的精液渗出来了…',
      '你射出的精液、把两人的身体都弄得粘稠不堪…',
    ],
  ],
  ['2', '抽出', 121, '直接对温妮的子宫、注入了大量热乎乎的精液…'],
  ['2', '抽出', 120, '对准温妮私处内那最敏感的那一点、你射出了大量的精液…'],
  // —— TFLAG:2 == 2 · 插着臂 ——
  [
    '2',
    '插着',
    27,
    '直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把插入的阴茎紧紧夹住了…',
    { tequip55: 1 },
  ],
  [
    '2',
    '插着',
    28,
    '直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把你的阴茎紧紧夹住了…',
  ],
  [
    '2',
    '插着',
    25,
    '直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把温妮的阴茎紧紧夹住了…',
  ],
  ['2', '插着', 121, '直接对温妮快乐到生疼的子宫、注入了大量热乎乎的精液……'],
  ['2', '插着', 120, '对准温妮私处内那最敏感的那一点、你射出了大量的精液…'],
  [
    '2',
    '插着',
    24,
    '你的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把温妮的阴茎紧紧夹住了…',
  ],
  [
    '2',
    '插着',
    0,
    '温妮的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把你的阴茎紧紧夹住了…',
  ],
];

TF2_CASES.forEach(([level, mode, com, lines, opts = {}], index) => {
  test(`A 性交射精链 · TFLAG:2 == ${level} · ${mode} · 指令 ${com} · 第 ${index + 1} 行`, async () => {
    const world = seed_message_world();
    world.era_flag.selectcom = com;
    const expected = Array.isArray(lines) ? lines : [lines];
    await expect_common_lines(
      world,
      () => world.fixture.store.set('tflag:2', 9), // 9 = 空间外值，公共段静默
      () => {
        world.fixture.store.set('tflag:2', Number(level));
        if (mode === '插着') {
          world.fixture.store.set('palam:31:5', 10000); // PALAMLV:4
        }
        if (opts.tequip55) {
          world.fixture.store.set('tequip:31:55', 1);
        }
      },
      expected,
    );
  });
});

test('A 性交射精链：抽出臂的落红改写与 TFLAG:31/60 清零', async () => {
  // TFLAG:31 置位 → 前缀换成「渗出了处女的落红、混合着」
  const blood = seed_message_world();
  blood.era_flag.selectcom = 20;
  await expect_common_lines(
    blood,
    () => blood.fixture.store.set('tflag:2', 9),
    () => {
      blood.fixture.store.set('tflag:2', 1);
      blood.fixture.store.set('tflag:31', 1);
    },
    ['阴茎拔出后、阴部处渗出了处女的落红、混合着精液渗出来了…'],
  );
  assert.equal(blood.fixture.store.get('tflag:31'), 0, '抽出臂清 TFLAG:31');
  assert.equal(blood.fixture.store.get('tflag:60'), 0, '抽出臂清 TFLAG:60');

  // 大量臂的 24 支：前缀与收尾两句都带落红
  const heavy = seed_message_world();
  heavy.era_flag.selectcom = 24;
  await expect_common_lines(
    heavy,
    () => heavy.fixture.store.set('tflag:2', 9),
    () => {
      heavy.fixture.store.set('tflag:2', 2);
      heavy.fixture.store.set('tflag:31', 1);
    },
    [
      '阴茎拔出后、渗出了处女的落红、混合着大量的精液渗出来了…',
      '你射出的精液、把两人的身体都弄得粘稠不堪…',
    ],
  );

  // 插着臂**不**清（源侧只有抽出臂写 TFLAG:31/60）
  const kept = seed_message_world();
  kept.era_flag.selectcom = 28;
  kept.fixture.store.set('palam:31:5', 10000);
  kept.fixture.store.set('tflag:2', 1);
  kept.fixture.store.set('tflag:60', 1);
  kept.fixture.lines.length = 0;
  await kept.train_message_a();
  assert.equal(kept.fixture.store.get('tflag:60'), 1, '插着臂不动 TFLAG:60');
});

test('A 性交射精链：乳内射精（CFLAG:113）两支 + 1 臂还要求指令 90', async () => {
  const one = seed_message_world();
  one.era_flag.selectcom = 90;
  await expect_common_lines(
    one,
    () => one.fixture.store.set('tflag:2', 9),
    () => {
      one.fixture.store.set('tflag:2', 1);
      one.fixture.store.set('cflag:31:113', 1);
    },
    ['你的肉棒在温妮的乳房里激烈的颤抖着、在乳头肉穴的深处释放了精液…'],
  );

  // 1 臂带 CFLAG:113 但指令不是 90 → 落普通臂（源侧首个 IF 要求 SELECTCOM == 90）
  const other = seed_message_world();
  other.era_flag.selectcom = 20;
  await expect_common_lines(
    other,
    () => other.fixture.store.set('tflag:2', 9),
    () => {
      other.fixture.store.set('tflag:2', 1);
      other.fixture.store.set('cflag:31:113', 1);
    },
    ['阴茎拔出后、阴部处精液渗出来了…'],
  );

  // 2 臂的乳内支没有指令门
  const heavy = seed_message_world();
  heavy.era_flag.selectcom = 20;
  await expect_common_lines(
    heavy,
    () => heavy.fixture.store.set('tflag:2', 9),
    () => {
      heavy.fixture.store.set('tflag:2', 2);
      heavy.fixture.store.set('cflag:31:113', 1);
    },
    [
      '你的肉棒在乳房里射入了大量的精液、从乳头仅存的缝隙间、精液和母乳一齐喷了出来…',
    ],
  );
});

/**
 * 公共绝顶段（:377-424）在「无射精、无母乳、非两性人」的干净世界里的那一行
 * ——按 TFLAG:29 分三档（< 5 无爱液、5-8 透明、≥ 9 白浊）。别处要用它把
 * 「绝顶行在公共段之前」这条行序一起断言进去。
 */
function orgasm_line(orgasms) {
  return orgasms >= 9
    ? '温妮阴唇里喷出混合着白浊的爱液、全身哆嗦着、颤动到了极点。'
    : orgasms >= 5
      ? '温妮阴唇里喷出透明的爱液、全身哆嗦着、颤动到了极点。'
      : '温妮背脊夸张地向后仰、全身哆嗦着、颤动到了极点。';
}

/**
 * 性交射精链 ELSE 支（绝顶余韵，:592-605）在干净世界里的那一行——本段
 * TFLAG:2 为 0（没在射精）而 TFLAG:29 ≥ 3 时它先于失禁段输出，凡是靠
 * TFLAG:29 立判据的用例都要把它排进去。「滴液」两支要求 TFLAG:19 且
 * 未穿衣，本文件的用例都不满足，故只按 TFLAG:29 的 9/5/3 三档取件。
 */
function afterglow_line(orgasms) {
  return orgasms >= 9
    ? '温妮断断续续地不停高潮、身体不断抽搐、反复扭动着…'
    : orgasms >= 5
      ? '温妮断断续续地不停高潮、四肢无力、筋疲力尽了…'
      : '温妮气息慌乱、沉浸在绝顶高潮的余韵之中…';
}

test('A 性交射精链 ELSE 支：绝顶余韵的五档（TFLAG:29 × 私处反应）', async () => {
  // 公共绝顶段（:377-424）先于本链输出，故断言要连它一起排：[绝顶行, 余韵行]。
  // 绝顶行逐字来自源 :377-424（本文件别处已有专条，这里用它钉行序）。
  // [TFLAG:29, 追加状态, 余韵行（null = 该档不落余韵行）]
  const cases = [
    [2, {}, null],
    [3, {}, '温妮气息慌乱、沉浸在绝顶高潮的余韵之中…'],
    [5, {}, '温妮断断续续地不停高潮、四肢无力、筋疲力尽了…'],
    [9, {}, '温妮断断续续地不停高潮、身体不断抽搐、反复扭动着…'],
    [
      5,
      { 'tflag:19': 1, 'tequip:31:11': 1 },
      '温妮的私处滴出了粘稠的液体、剧烈地不停喘息着…',
    ],
    [
      9,
      { 'tflag:19': 1, 'tflag:60': 1 },
      '温妮的私处滴出了粘稠的液体、阴户一开一合不停持续着…',
    ],
  ];
  for (const [orgasms, extra, afterglow] of cases) {
    const world = seed_message_world();
    await expect_common_lines(
      world,
      () => world.fixture.store.set('tflag:29', 0), // 绝顶段与余韵段一并静默
      () => {
        world.fixture.store.set('tflag:29', orgasms);
        for (const [key, val] of Object.entries(extra)) {
          world.fixture.store.set(key, val);
        }
      },
      [orgasm_line(orgasms), ...(afterglow === null ? [] : [afterglow])],
    );
  }

  // 穿衣两档咬掉「粘稠」支（CFLAG:40 的 16 / 1 位）——此时落到同档的普通句
  const dressed = seed_message_world();
  await expect_common_lines(
    dressed,
    () => dressed.fixture.store.set('tflag:29', 0),
    () => {
      dressed.fixture.store.set('tflag:29', 9);
      dressed.fixture.store.set('tflag:19', 1);
      dressed.fixture.store.set('tequip:31:11', 1);
      dressed.fixture.store.set('cflag:31:40', 16);
    },
    [orgasm_line(9), '温妮断断续续地不停高潮、身体不断抽搐、反复扭动着…'],
  );

  // TFLAG:899 ≥ 2 → 余韵整支静默（同一门也压掉公共绝顶段与 A0 的爱抚反应，
  // 故这里逐句排查余韵的六个文案，不走前缀比对）
  const fainted = seed_message_world();
  fainted.fixture.store.set('tflag:29', 9);
  fainted.fixture.store.set('tflag:899', 2);
  fainted.fixture.lines.length = 0;
  await fainted.train_message_a();
  const fainted_lines = fainted.fixture.text_lines();
  for (const marker of [
    '余韵之中',
    '反复扭动着',
    '筋疲力尽了',
    '滴出了粘稠的液体',
  ]) {
    assert(
      !fainted_lines.some((line) => line.includes(marker)),
      `TFLAG:899 = 2 时「${marker}」不得出现`,
    );
  }
});

// —— @TRAIN_MESSAGE_A 公共段：失禁与放尿（:611-677）——
//
// 一条 IF/ELSEIF 链：先是失神中的两档（TFLAG:899 ≥ 2），再是四组衣着形态
// （尿布 CFLAG:42 == 69 / 着ぐるみ == 11 / 服 CFLAG:40 & 16 / 内裤 & 1）
// 各带「放尿」与「失禁」两支，最后是裸身按 TFLAG:29 的十档。
// 尿具 = TEQUIP:22（利尿剂）或 TALENT:57（漏尿癖）；衣着两组的「放尿」支
// 还要 TFLAG:29 更高（5 或「3 且有漏尿癖」）。

/** [描述, 追加状态, 期望行]——基线统一为「TFLAG:29 = 0 且 TFLAG:899 = 2」 */
const URINE_CASES = [
  [
    '失神放尿（899 ≥ 2 · 29 ≥ 3 · 利尿剂）',
    { 'tflag:899': 2, 'tflag:29': 3, 'tequip:31:22': 1 },
    ['温妮失去意识、尿到周围都是了…'],
  ],
  [
    '失神失禁（899 ≥ 2 · 29 ≥ 1 · 漏尿癖）',
    { 'tflag:899': 2, 'tflag:29': 1, 'talent:31:57': 1 },
    ['温妮失去意识、尿液从阴部漏出来了…'],
  ],
  [
    '尿布放尿（42 == 69 · 40 & 64 · 29 ≥ 5 + 利尿剂）',
    { 'cflag:31:42': 69, 'cflag:31:40': 64, 'tflag:29': 5, 'tequip:31:22': 1 },
    [
      '温妮的尿布里升起了热气、',
      '闻到了清晰的尿臭味、',
      '看来是太过兴奋、尿到尿布里去了…',
    ],
  ],
  [
    '尿布放尿（29 ≥ 3 + 利尿剂 + 漏尿癖 支）',
    {
      'cflag:31:42': 69,
      'cflag:31:40': 64,
      'tflag:29': 3,
      'tequip:31:22': 1,
      'talent:31:57': 1,
    },
    [
      '温妮的尿布里升起了热气、',
      '闻到了清晰的尿臭味、',
      '看来是太过兴奋、尿到尿布里去了…',
    ],
  ],
  [
    '尿布失禁（29 ≥ 3 + 漏尿癖 支）',
    {
      'cflag:31:42': 69,
      'cflag:31:40': 64,
      'tflag:29': 3,
      'talent:31:57': 1,
    },
    ['温妮的尿布里升起了热气、飘来了尿的味道…'],
  ],
  [
    '尿布失禁（29 ≥ 1 + 利尿剂 支）',
    {
      'cflag:31:42': 69,
      'cflag:31:40': 64,
      'tflag:29': 1,
      'tequip:31:22': 1,
    },
    ['温妮的尿布里升起了热气、飘来了尿的味道…'],
  ],
  [
    '着ぐるみ放尿（42 == 11 · 40 & 64 · 29 ≥ 5 + 利尿剂）',
    { 'cflag:31:42': 11, 'cflag:31:40': 64, 'tflag:29': 5, 'tequip:31:22': 1 },
    [
      '温妮穿着史莱姆、但是、有尿臭味从里面飘散出来。',
      '看来是太过兴奋、尿到史莱姆里去了…',
    ],
  ],
  [
    '着ぐるみ失禁（29 ≥ 3 + 漏尿癖 支）',
    {
      'cflag:31:42': 11,
      'cflag:31:40': 64,
      'tflag:29': 3,
      'talent:31:57': 1,
    },
    ['刚才激烈动作的史莱姆、突然动作停止了。', '看来、里面是尿湿了…'],
  ],
  [
    '服放尿（40 & 16 · 29 ≥ 5 + 利尿剂）',
    {
      'cflag:31:40': 16,
      'cflag:31:41': 1,
      'tflag:29': 5,
      'tequip:31:22': 1,
    },
    ['不堪快感冲击的温妮、把日常服装弄湿也不在乎了、情不自禁地尿了起来…'],
  ],
  [
    '服失禁（40 & 16 · 29 ≥ 3 + 漏尿癖）',
    {
      'cflag:31:40': 16,
      'cflag:31:41': 1,
      'tflag:29': 3,
      'talent:31:57': 1,
    },
    ['日常服装的股间冒起了热气、有黄色水迹在扩散…'],
  ],
  [
    '内裤放尿（40 & 1 · 29 ≥ 5 + 利尿剂）',
    { 'cflag:31:40': 1, 'tflag:29': 5, 'tequip:31:22': 1 },
    ['温妮不堪快感的冲击、在内裤里大大方方地尿了…'],
  ],
  [
    '内裤失禁（40 & 1 · 29 ≥ 3 + 漏尿癖）',
    { 'cflag:31:40': 1, 'tflag:29': 3, 'talent:31:57': 1 },
    ['温妮的内裤冒起了热气、有黄色水迹在扩散………'],
  ],
  // —— 裸身十档（衣着位都为 0）——
  [
    '裸身 29 ≥ 7 · 利尿剂 + 漏尿癖',
    { 'tflag:29': 7, 'tequip:31:22': 1, 'talent:31:57': 1 },
    [
      '随着止不住的尿液滴落、温妮的身体、抽搐痉挛了起来、',
      '看来尿尿能让她有快感…',
    ],
  ],
  [
    '裸身 29 ≥ 7 · 只利尿剂',
    { 'tflag:29': 7, 'tequip:31:22': 1 },
    ['痉挛中的温妮喷泉一样喷尿出来了…'],
  ],
  [
    '裸身 29 ≥ 7 · 只漏尿癖',
    { 'tflag:29': 7, 'talent:31:57': 1 },
    ['痉挛中的温妮尿出一道细细的弧线…'],
  ],
  [
    '裸身 29 ≥ 5 · 利尿剂 + 漏尿癖',
    { 'tflag:29': 5, 'tequip:31:22': 1, 'talent:31:57': 1 },
    ['筋疲力尽的温妮喷泉一样喷尿出来了…'],
  ],
  [
    '裸身 29 ≥ 5 · 只利尿剂',
    { 'tflag:29': 5, 'tequip:31:22': 1 },
    ['筋疲力尽的温妮尿出一道细细的弧线…'],
  ],
  [
    '裸身 29 ≥ 5 · 只漏尿癖',
    { 'tflag:29': 5, 'talent:31:57': 1 },
    ['筋疲力尽的温妮不断滴尿、形成了个小水坑…'],
  ],
  [
    '裸身 29 ≥ 3 · 利尿剂 + 漏尿癖',
    { 'tflag:29': 3, 'tequip:31:22': 1, 'talent:31:57': 1 },
    ['颤抖中的温妮尿出一道细细的弧线…'],
  ],
  [
    '裸身 29 ≥ 3 · 只利尿剂',
    { 'tflag:29': 3, 'tequip:31:22': 1 },
    ['震颤抖中的温妮不断滴尿、形成了个小水坑…'],
  ],
  [
    '裸身 29 ≥ 3 · 只漏尿癖',
    { 'tflag:29': 3, 'talent:31:57': 1 },
    ['颤抖中的温妮从阴部漏出尿来了…'],
  ],
  [
    '裸身 29 ≥ 1 · 利尿剂 + 漏尿癖',
    { 'tflag:29': 1, 'tequip:31:22': 1, 'talent:31:57': 1 },
    ['温妮不断滴尿、形成了个小水坑…'],
  ],
  [
    '裸身 29 ≥ 1 · 只利尿剂',
    { 'tflag:29': 1, 'tequip:31:22': 1 },
    ['温妮从阴部漏出尿来了…'],
  ],
  ['裸身 · 无尿具 → 整段静默（29 ≥ 9 也不落）', { 'tflag:29': 9 }, []],
];

URINE_CASES.forEach(([desc, extra, lines], index) => {
  test(`A 失禁段 · 第 ${index + 1} 行 · ${desc}`, async () => {
    const world = seed_message_world();
    const orgasms = extra['tflag:29'] ?? 0;
    const fainted = (extra['tflag:899'] ?? 0) >= 2;
    await expect_common_lines(
      world,
      () => {
        // 基线：TFLAG:29 = 0 把公共绝顶段与失禁段一并关掉；失神行另把
        // TFLAG:899 固定成两侧同态（它决定 A0 分支的占位行，不能只在一侧）
        world.fixture.store.set('tflag:29', 0);
        if (extra['tflag:899'] !== undefined) {
          world.fixture.store.set('tflag:899', 2);
        }
      },
      () => {
        for (const [key, val] of Object.entries(extra)) {
          world.fixture.store.set(key, val);
        }
      },
      [
        // 非失神行下公共绝顶段（:377-424）与射精链的余韵支（:592-605）先落
        ...(fainted
          ? []
          : [
              ...(orgasms === 0 ? [] : [orgasm_line(orgasms)]),
              ...(orgasms >= 3 ? [afterglow_line(orgasms)] : []),
            ]),
        ...lines,
      ],
    );
  });
});

test('A 失禁段：衣着形态的链序（尿布位胜过服位）', async () => {
  // CFLAG:40 同时有 64（尿布/着ぐるみ位）与 16（服位）时，链上先命中的是尿布
  const world = seed_message_world();
  await expect_common_lines(
    world,
    () => {
      world.fixture.store.set('tflag:29', 0);
    },
    () => {
      world.fixture.store.set('cflag:31:42', 69);
      world.fixture.store.set('cflag:31:40', 80); // 64 | 16
      world.fixture.store.set('tflag:29', 5);
      world.fixture.store.set('tequip:31:22', 1);
    },
    [
      orgasm_line(5),
      afterglow_line(5),
      '温妮的尿布里升起了热气、',
      '闻到了清晰的尿臭味、',
      '看来是太过兴奋、尿到尿布里去了…',
    ],
  );
});

// —— @TRAIN_MESSAGE_A 公共段：处女丧失与口交清洁（:682-741）——
//
// 三处 SIF 加一条近亲链：触手夺处（TFLAG:15 == 1）、无射精夺处（TFLAG:2 == 0
// 且 TFLAG:15 == 0）、近亲夺处（TFLAG:14 的 1/2/3/4/6 × 主人性别）、野狗夺处
// （TEQUIP:89），再是口交射精后的清洁段（TFLAG:8）。

test('A 处女丧失段：触手夺处（TFLAG:15 == 1）', async () => {
  const world = seed_message_world();
  // 死斗场旗标置位 → TFLAG:15 段（:115-146）对指令 0 不落行，两侧同态
  world.fixture.store.set('tequip:31:55', 1);
  await expect_common_lines(
    world,
    () => world.fixture.store.set('tflag:3', 0),
    () => {
      world.fixture.store.set('tflag:3', 1);
      world.fixture.store.set('tflag:15', 1);
    },
    ['温妮的阴部上、处女落红和污液沿着丑陋的触手滴下来了…'],
  );
});

test('A 处女丧失段：无射精夺处（TFLAG:2 == 0 且 TFLAG:15 == 0）', async () => {
  const world = seed_message_world();
  await expect_common_lines(
    world,
    () => world.fixture.store.set('tflag:3', 0),
    () => {
      world.fixture.store.set('tflag:3', 1);
    },
    ['温妮的阴部上、滴出了处女才有的落红…'],
  );

  // TFLAG:2 == 1（本轮有射精）时这一支不发：两侧都置射精态，靶侧只多出
  // 「把 TFLAG:3 打开」这一步，故期望为空（差一行就红）
  const shot = seed_message_world();
  await expect_common_lines(
    shot,
    () => {
      shot.fixture.store.set('tflag:3', 0);
      shot.fixture.store.set('tflag:2', 1);
      shot.fixture.store.set('palam:31:5', 10000);
    },
    () => {
      shot.fixture.store.set('tflag:3', 1);
    },
    [],
  );
});

test('A 处女丧失段：近亲夺处十支（TFLAG:14 × 主人性别）', async () => {
  // [TFLAG:14, 主人是男人（122）, 称谓]
  const kin = [
    [1, 1, '父亲'],
    [1, 0, '母亲'],
    [2, 1, '儿子'],
    [2, 0, '女儿'],
    [3, 1, '哥哥'],
    [3, 0, '姐姐'],
    [4, 1, '弟弟'],
    [4, 0, '妹妹'],
    [6, 1, '表弟'],
    [6, 0, '表妹'],
  ];
  for (const [relation, male, title] of kin) {
    const world = seed_message_world();
    await expect_common_lines(
      world,
      () => world.fixture.store.set('tflag:3', 0),
      () => {
        world.fixture.store.set('tflag:3', 1);
        world.fixture.store.set('tflag:14', relation);
        if (male) {
          world.fixture.store.set('talent:0:122', 1);
        }
      },
      [
        // 「无射精夺处」那一支（:688-689）与近亲句并存，两侧都是 SIF
        '温妮的阴部上、滴出了处女才有的落红…',
        `温妮被${title}你夺取了她的处女。`,
      ],
    );
  }

  // TFLAG:14 落空档（如 5——表亲系里没有 5）时只剩后半句的残行
  const other = seed_message_world();
  await expect_common_lines(
    other,
    () => other.fixture.store.set('tflag:3', 0),
    () => {
      other.fixture.store.set('tflag:3', 1);
      other.fixture.store.set('tflag:14', 5);
    },
    ['温妮的阴部上、滴出了处女才有的落红…', '温妮被你夺取了她的处女。'],
  );
});

test('A 处女丧失段：近亲链的四道门（触手 / 野狗 / 触手怪 / 失神）', async () => {
  const gates = [
    ['触手', { 'tflag:15': 1 }],
    ['野狗', { 'tequip:31:89': 1 }],
    ['触手怪', { 'tequip:31:90': 1 }],
    ['失神', { 'tflag:899': 2 }],
  ];
  for (const [label, extra] of gates) {
    const world = seed_message_world();
    world.fixture.store.set('tflag:3', 1);
    world.fixture.store.set('tflag:14', 1);
    for (const [key, val] of Object.entries(extra)) {
      world.fixture.store.set(key, val);
    }
    world.fixture.lines.length = 0;
    await world.train_message_a();
    assert(
      !world.fixture
        .text_lines()
        .some((line) => line.includes('夺取了她的处女')),
      `${label}挡掉近亲句`,
    );
  }
});

test('A 处女丧失段：野狗夺处（TFLAG:3 && TEQUIP:89）', async () => {
  const world = seed_message_world();
  await expect_common_lines(
    world,
    () => world.fixture.store.set('tflag:3', 0),
    () => {
      world.fixture.store.set('tflag:3', 1);
      world.fixture.store.set('tequip:31:89', 1);
    },
    ['温妮的阴部上、滴出了处女才有的落红…', '温妮把处女奉献给野狗了。'],
  );

  // 失神中（TFLAG:899 ≥ 2）不发：同态压掉 A0 的占位行差异后，只剩「无射精
  // 夺处」那一支（它不受 TFLAG:899 约束），野狗句必须不在
  const fainted = seed_message_world();
  fainted.fixture.store.set('tflag:3', 1);
  fainted.fixture.store.set('tequip:31:89', 1);
  fainted.fixture.store.set('tflag:899', 2);
  fainted.fixture.lines.length = 0;
  await fainted.train_message_a();
  const fainted_lines = fainted.fixture.text_lines();
  assert(
    fainted_lines.includes('温妮的阴部上、滴出了处女才有的落红…'),
    '无射精夺处支不受 TFLAG:899 约束',
  );
  assert(
    !fainted_lines.some((line) => line.includes('野狗')),
    'TFLAG:899 = 2 时野狗句不发',
  );
});

test('A 口交清洁段：双人口交支与普通支的四档拼法（TFLAG:8）', async () => {
  // TFLAG:0 && TFLAG:6（口中射精 + 助手射精）→ 交替舔
  const double = seed_message_world({ assi: 17 });
  await expect_common_lines(
    double,
    () => double.fixture.store.set('tflag:8', 0),
    () => {
      double.fixture.store.set('tflag:8', 1);
      double.fixture.store.set('tflag:0', 1);
      double.fixture.store.set('tflag:6', 1);
    },
    ['之后、温妮交替舔着你和助手17的阴茎、清洁着上面的污垢…'],
  );

  // 普通支：TFLAG:8 == 1、ABL:10 < 3 → 无「助手和」「剩下的精液都舔干净、」两段
  const plain = seed_message_world({ assi: 17 });
  await expect_common_lines(
    plain,
    () => plain.fixture.store.set('tflag:8', 0),
    () => {
      plain.fixture.store.set('tflag:8', 1);
    },
    ['之后、温妮把阴茎里的污垢也漂亮地清洁了…'],
  );

  // TFLAG:8 >= 2 补「助手和」，ABL:10 >= 3 补「剩下的精液都舔干净、」
  // （用 2 而非 3：3 还会追加下一句「两人好像还不满足…」，另一条用例专测）
  const full = seed_message_world({ assi: 17 });
  await expect_common_lines(
    full,
    () => full.fixture.store.set('tflag:8', 0),
    () => {
      full.fixture.store.set('tflag:8', 2);
      full.fixture.store.set('abl:31:10', 3);
    },
    ['之后、助手17和温妮把剩下的精液都舔干净、阴茎里的污垢也漂亮地清洁了…'],
  );

  // TFLAG:8 == 3 再加一句「两人好像还不满足…」
  const three = seed_message_world({ assi: 17 });
  await expect_common_lines(
    three,
    () => three.fixture.store.set('tflag:8', 0),
    () => {
      three.fixture.store.set('tflag:8', 3);
    },
    [
      '之后、助手17和温妮把阴茎里的污垢也漂亮地清洁了…',
      '两人好像还不满足、意犹未尽地吸啜着彼此口中的积存精液…',
    ],
  );

  // TFLAG:899 != 0 → 整段静默（两侧同置 899，避开 A0 占位行的差异）
  const fainted = seed_message_world({ assi: 17 });
  await expect_common_lines(
    fainted,
    () => {
      fainted.fixture.store.set('tflag:8', 0);
      fainted.fixture.store.set('tflag:899', 2);
    },
    () => {
      fainted.fixture.store.set('tflag:8', 1);
    },
    [],
  );
});

// —— @TRAIN_MESSAGE_A 公共绝顶段的射精子链（:427-450）——

test('A 绝顶子链：逆强奸/逆肛交/口交 × 普通与大量六支', async () => {
  // [指令, TFLAG:10, TFLAG:31, 期望行]——绝顶行（:377-424）先落
  const cases = [
    [24, 1, 0, ['阴茎拔出后、阴部处精液渗出来了…']],
    [24, 1, 1, ['阴茎拔出后、阴部处渗出了处女的落红、混合着精液渗出来了…']],
    [25, 1, 0, ['阴茎从肛门里拔出后、漏出来的精液沿着股沟向下流…']],
    [4, 1, 0, ['然后、精液流到了你的嘴里了…']],
    [24, 2, 0, ['阴茎拔出后、阴部处大量的精液渗出来了…']],
    [25, 2, 0, ['阴茎从肛门里拔出后、大量漏出来的精液沿着股沟向下流…']],
    [4, 2, 0, ['然后、满溢的精液、灌到了你的喉咙里了…']],
  ];
  const head = (ejaculates) =>
    ejaculates === 1
      ? '温妮阴茎喷出了精液。全身哆嗦着、颤动到了极点。'
      : '温妮跳动着的阴茎中大量的精液飞散而出。全身哆嗦着、颤动到了极点。';
  for (const [com, ejaculates, blood, extra] of cases) {
    const world = seed_message_world();
    await expect_common_lines(
      world,
      () => {
        // 指令两侧同态（它决定族分发落不落占位行）
        world.era_flag.selectcom = com;
        world.fixture.store.set('tflag:29', 0);
      },
      () => {
        world.fixture.store.set('tflag:29', 1);
        world.fixture.store.set('tflag:10', ejaculates);
        if (blood) {
          world.fixture.store.set('tflag:31', blood);
        }
      },
      [head(ejaculates), ...extra],
    );
  }

  // 指令对不上（如 20）时不落子链（绝顶行照落）
  const other = seed_message_world();
  await expect_common_lines(
    other,
    () => {
      other.era_flag.selectcom = 20;
      other.fixture.store.set('tflag:29', 0);
    },
    () => {
      other.fixture.store.set('tflag:29', 1);
      other.fixture.store.set('tflag:10', 1);
    },
    ['温妮阴茎喷出了精液。全身哆嗦着、颤动到了极点。'],
  );

  // TFLAG:10 == 0（对象没射）时同样不落（绝顶行照落）
  const dry = seed_message_world();
  await expect_common_lines(
    dry,
    () => {
      dry.era_flag.selectcom = 24;
      dry.fixture.store.set('tflag:29', 0);
    },
    () => {
      dry.fixture.store.set('tflag:29', 1);
    },
    ['温妮背脊夸张地向后仰、全身哆嗦着、颤动到了极点。'],
  );
});
