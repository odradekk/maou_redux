/**
 * ere/system/train/com-toy.js 的行为测试（issue #220 J10：道具使用 10–19）。
 *
 * 缝 = test/helpers/era-fixture.js。每条指令至少固定：@COM 真身、@COM_ABLE
 * 判据与 TRAIN_MESSAGE_B；另覆盖 11/13–19 的装备持续效果、满月取消和产卵
 * （Math.random 注入钉满月掷）、TRAIN_MESSAGE_A 的 10–14 真分支及 15–19
 * 显式空分支、触手榨乳存根；装备持续效果另有一条经 emit('SOURCE_CHECK')
 * → EQUIP_COM_CHAIN 的正式链集成回归。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.join(__dirname, '..');

/** 道具族的最小调教世界：主人 0、目标 31、所有道具无视模式。 */
function seed_world({ assi = -1 } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
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
  fixture.store.set('noitem:0', 1);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = assi;
  era_flag.assiplay = 0;
  era_flag.selectcom = -1;
  fixture.load_module('system/train/com-toy');
  const { com_able_family, com_family, equip_com_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { train_message_a, train_message_b } = fixture.load_module(
    'system/train/train-message',
  );
  return {
    fixture,
    era_flag,
    com_able_family,
    com_family,
    equip_com_family,
    train_message_a,
    train_message_b,
  };
}

async function run_com(world, com) {
  world.era_flag.selectcom = com;
  return world.com_family.call(com);
}

function clear_lines(fixture) {
  fixture.lines.length = 0;
}

// —— @COM_ABLE10–19：逐条可用性 ——

test('正式运行时接线：加载 main-loop 后 COM10–19、可用性与装备持续族均已注册', () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_able_family, com_family, equip_com_family } = fixture.load_module(
    'system/train/com-family',
  );
  for (let com = 10; com <= 19; com += 1) {
    assert.ok(com_family.has(com), `COM${com}`);
    assert.ok(com_able_family.has(com), `COM_ABLE${com}`);
  }
  for (const com of [11, 13, 14, 15, 16, 17, 18, 19]) {
    assert.ok(equip_com_family.has(com), `EQUIP_COM${com}`);
  }
});

test('@COM_ABLE10–19：各条可用性函数均已注册且满足自身前置时可执行', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('talent:31:130', 1);
  fixture.store.set('abl:31:1', 3);
  for (const com of [10, 11, 12, 13, 14, 15, 16, 17, 19]) {
    fixture.store.set('tequip:31:15', 0);
    fixture.store.set('tequip:31:16', 0);
    fixture.store.set('talent:31:121', com === 17 ? 1 : 0);
    fixture.store.set('talent:31:122', 0);
    assert.equal(await com_able_family.call(com), 1, `COM${com}`);
  }

  const shower = seed_world();
  shower.fixture.store.set('tequip:31:58', 1);
  assert.equal(await shower.com_able_family.call(18), 1, '浴室中可开始淋浴');
});

test('@COM_ABLE10：器具过滤、无道具和下装各阻止执行', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('flag:25', 2);
  assert.equal(await com_able_family.call(10), 0);
  fixture.store.set('flag:25', 0);
  fixture.store.set('noitem:0', 0);
  assert.equal(await com_able_family.call(10), 0);
  fixture.store.set('noitem:0', 1);
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:40', 1);
  assert.equal(await com_able_family.call(10), 0);
});

test('@COM_ABLE11：贞操带、处女助手门、润滑助手门；解除仍可', async () => {
  const { fixture, era_flag, com_able_family } = seed_world({ assi: 17 });
  fixture.store.set('flag:37', 1);
  fixture.store.set('cflag:31:40', 64);
  fixture.store.set('cflag:31:42', 79);
  assert.equal(await com_able_family.call(11), 0, '贞操带挡');

  fixture.store.set('cflag:31:40', 0);
  fixture.store.set('cflag:31:42', 0);
  fixture.store.set('flag:37', 0);
  era_flag.assiplay = 1;
  fixture.store.set('exp:31:0', 0);
  fixture.store.set('abl:17:10', 4);
  fixture.store.set('abl:17:22', 5);
  assert.equal(await com_able_family.call(11), 0, '处女且助手顺从不足挡');
  fixture.store.set('exp:31:0', 1);
  assert.equal(await com_able_family.call(11), 1, '非处女不吃处女助手门');
  fixture.store.set('palam:31:3', 0);
  fixture.store.set('abl:17:10', 3);
  assert.equal(await com_able_family.call(11), 0, '润滑不足且助手不足挡');
  fixture.store.set('tequip:31:11', 1);
  assert.equal(await com_able_family.call(11), 1, '解除优先放行');
});

test('@COM_ABLE12：低技巧助手可由施虐狂豁免', async () => {
  const { fixture, era_flag, com_able_family } = seed_world({ assi: 17 });
  era_flag.assiplay = 1;
  fixture.store.set('abl:17:12', 2);
  assert.equal(await com_able_family.call(12), 0);
  fixture.store.set('talent:17:83', 1);
  assert.equal(await com_able_family.call(12), 1);
});

test('@COM_ABLE13：肛具互斥；装着后可解除', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('tequip:31:46', 1);
  assert.equal(await com_able_family.call(13), 0);
  fixture.store.set('tequip:31:46', 0);
  fixture.store.set('tequip:31:13', 1);
  fixture.store.set('flag:25', 2);
  assert.equal(await com_able_family.call(13), 0, '场景类挡在解除前仍优先');
  fixture.store.set('flag:25', 0);
  assert.equal(await com_able_family.call(13), 1);
});

test('@COM_ABLE14–17：性别、乳汁和互斥装备门各生效', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('talent:31:121', 1);
  assert.equal(await com_able_family.call(14), 0, '扶她不可阴蒂夹');
  fixture.store.set('talent:31:121', 0);
  fixture.store.set('tequip:31:16', 1);
  assert.equal(await com_able_family.call(15), 0, '榨乳器与乳头夹互斥');
  fixture.store.set('tequip:31:16', 0);
  assert.equal(await com_able_family.call(16), 0, '无母乳体质不可榨乳');
  fixture.store.set('talent:31:130', 1);
  fixture.store.set('abl:31:1', 3);
  assert.equal(await com_able_family.call(16), 1);
  assert.equal(await com_able_family.call(17), 0, '无阴茎不可飞机杯');
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(17), 1);
});

test('@COM_ABLE18：着衣设定关闭时衣物不挡；开启时全裸门生效', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('tequip:31:58', 1);
  fixture.store.set('cflag:31:40', 1);
  assert.equal(await com_able_family.call(18), 1, 'FLAG:37 关闭不查衣物');
  fixture.store.set('flag:37', 1);
  assert.equal(await com_able_family.call(18), 0, '着衣设定开启后有衣物挡');
  fixture.store.set('tequip:31:18', 1);
  assert.equal(await com_able_family.call(18), 1, '解除随时可');
});

test('@COM_ABLE18：兽奸、羞耻与死斗场景均禁止开始淋浴', async () => {
  for (const slot of [89, 88, 55]) {
    const { fixture, com_able_family } = seed_world();
    fixture.store.set('tequip:31:58', 1);
    fixture.store.set(`tequip:31:${slot}`, 1);
    assert.equal(
      await com_able_family.call(18),
      0,
      `TEQUIP:${slot} 阻止 COM18`,
    );
  }
});

test('@COM_ABLE19：肛门虫、灌肠、电极和新妻均互斥', async () => {
  const { fixture, com_able_family } = seed_world();
  for (const slot of [13, 46, 49, 59]) {
    fixture.store.set(`tequip:31:${slot}`, 1);
    assert.equal(await com_able_family.call(19), 0, `TEQUIP:${slot}`);
    fixture.store.set(`tequip:31:${slot}`, 0);
  }
  fixture.store.set('tequip:31:19', 1);
  assert.equal(await com_able_family.call(19), 1, '装着后可以解除');
});

// —— @COM10–19 真身 ——

test('@COM10：写快感/露出/逸脱、体气消耗和百合经验', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:0', 2);
  assert.equal(await run_com(world, 10), 1);
  assert.equal(world.fixture.store.get('source:31:0'), 900);
  assert.equal(world.fixture.store.get('source:31:12'), 120);
  assert.equal(world.fixture.store.get('source:31:14'), 70);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -10);
  assert.equal(world.fixture.store.get('deltabase:31:1'), -80);
  assert.equal(world.fixture.store.get('exp:31:40'), 1);
});

test('@COM11：处女确认取消保持回合取消；满月取消不写数值', async () => {
  const virgin = seed_world();
  virgin.fixture.store.set('talent:31:0', 1);
  virgin.fixture.set_inputs(1);
  assert.equal(await run_com(virgin, 11), 0);
  assert.equal(virgin.fixture.store.get('tequip:31:11'), undefined);

  const moon = seed_world();
  moon.era_flag.date = 15;
  moon.fixture.set_inputs(1);
  assert.equal(await run_com(moon, 11), 0);
  assert.equal(moon.fixture.store.get('source:31:1'), undefined);
});

test('@COM11：装着时写私处经验、触手污渍与 T 清零', async () => {
  const world = seed_world();
  world.fixture.store.set('tequip:31:90', 1);
  world.fixture.store.set('t:0', 9);
  world.fixture.store.set('abl:31:2', 2);
  assert.equal(await run_com(world, 11), 1);
  assert.equal(world.fixture.store.get('tequip:31:11'), 1);
  assert.equal(world.fixture.store.get('stain:31:3'), 6);
  assert.equal(world.fixture.store.get('t:0'), 0);
  assert.equal(world.fixture.store.get('exp:31:0'), 2);
});

test('@COM12：振动杖使用对应大快感与逸脱', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:0', 0);
  assert.equal(await run_com(world, 12), 1);
  assert.equal(world.fixture.store.get('source:31:0'), 2000);
  assert.equal(world.fixture.store.get('source:31:14'), 400);
});

test('@COM13：顺从 3 不再额外放大肛门快感，且切换装备', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:3', 0);
  world.fixture.store.set('abl:31:10', 3);
  world.fixture.store.set('palam:31:3', 0);
  world.fixture.store.set('palam:31:5', 500);
  assert.equal(await run_com(world, 13), 1);
  assert.equal(
    world.fixture.store.get('source:31:2'),
    16,
    '80×0.5×0.4，不吃顺从 3 的 ×1.1',
  );
  assert.equal(world.fixture.store.get('tequip:31:13'), 1);
  assert.equal(world.fixture.store.get('exp:31:1'), 1);
});

test('@COM14–17：分别切换自身装备位', async () => {
  const world = seed_world();
  world.fixture.store.set('talent:31:130', 1);
  world.fixture.store.set('abl:31:1', 3);
  world.fixture.store.set('talent:31:122', 1);
  for (const com of [14, 15, 16, 17]) {
    assert.equal(await run_com(world, com), 1, `COM${com}`);
    assert.equal(
      world.fixture.store.get(`tequip:31:${com}`),
      1,
      `TEQUIP:${com}`,
    );
  }
});

test('@COM18：欲情最高档写 SOURCE:12 = 150，不读取 ABL:5', async () => {
  const world = seed_world();
  world.fixture.store.set('tequip:31:58', 1);
  world.fixture.store.set('abl:31:5', 0);
  world.fixture.store.set('palam:31:5', 10000);
  assert.equal(await run_com(world, 18), 1);
  assert.equal(world.fixture.store.get('source:31:12'), 150);
});

test('@COM18：开始淋浴重置污渍、减半润滑并切换装备', async () => {
  const world = seed_world();
  world.fixture.store.set('tequip:31:58', 1);
  world.fixture.store.set('stain:31:0', 15);
  world.fixture.store.set('palam:31:3', 99);
  world.fixture.store.set('palam:31:12', 13);
  assert.equal(await run_com(world, 18), 1);
  assert.equal(world.fixture.store.get('tequip:31:18'), 1);
  assert.equal(world.fixture.store.get('stain:31:0'), 0);
  assert.equal(world.fixture.store.get('stain:31:4'), 8);
  assert.equal(world.fixture.store.get('palam:31:3'), 49);
  assert.equal(world.fixture.store.get('palam:31:12'), 6);
});

test('@COM19：未装着为 ×0.8 / 肛门经验＋１，装着为 ×3 / ＋２', async () => {
  const first = seed_world();
  first.fixture.store.set('abl:31:3', 0);
  first.fixture.store.set('palam:31:3', 0);
  first.fixture.store.set('palam:31:5', 500);
  assert.equal(await run_com(first, 19), 1);
  assert.equal(first.fixture.store.get('source:31:2'), 9, '80×.5×.4×.8');
  assert.equal(first.fixture.store.get('exp:31:1'), 1);
  assert.ok(first.fixture.text_lines().includes('肛门经验＋１'));

  const second = seed_world();
  second.fixture.store.set('tequip:31:19', 1);
  second.fixture.store.set('abl:31:3', 0);
  second.fixture.store.set('palam:31:3', 0);
  second.fixture.store.set('palam:31:5', 500);
  assert.equal(await run_com(second, 19), 1);
  assert.equal(second.fixture.store.get('source:31:2'), 36, '80×.5×.4×3');
  assert.equal(second.fixture.store.get('exp:31:1'), 2);
  assert.ok(second.fixture.text_lines().includes('肛门经验＋２'));
});

// —— @EQUIP_COM11 / 13–19 持续效果 ——

test('@EQUIP_COM11：满月产卵写 dungeon 门面、等待两次并置 TFLAG:19', async () => {
  const world = seed_world();
  world.era_flag.date = 15;
  world.fixture.store.set('tequip:31:11', 1);
  // 满月 1/3 掷经 Math.random 注入钉成必中（rand(3) === 0）：equip_com11 的
  // 默认 rand 参数在调用时读全局随机源，经族调用即真实路径。注入点进程级，
  // try/finally 成对恢复（era-fixture.js 的 override_math_random 契约）。
  world.fixture.override_math_random(() => 0);
  try {
    await world.equip_com_family.call(11);
  } finally {
    world.fixture.restore_math_random();
  }
  assert.equal(world.fixture.store.get('tflag:19'), 1);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -10);
  assert.equal(world.fixture.store.get('talent:31:190'), 1);
  assert.equal(
    world.fixture.waits.length,
    0,
    '夹具的 printAndWait 内部等待不入显式 waits',
  );
  const texts = world.fixture.text_lines();
  assert.ok(
    texts.some((line) => line.includes('蠕虫产下了大量的卵')),
    '产卵播报其一',
  );
  assert.ok(
    texts.some((line) => line.includes('获得【私处产卵】了。')),
    '产卵播报其二（未产卵时才出现的第二段）',
  );
});

test('@EQUIP_COM13：未熟只翻倍既有 SOURCE:6，后加苦痛保持原值', async () => {
  const world = seed_world();
  world.fixture.store.set('tequip:31:13', 1);
  world.fixture.store.set('source:31:6', 10);
  world.fixture.store.set('talent:31:135', 1);
  world.fixture.store.set('abl:31:3', 0);
  world.fixture.store.set('palam:31:3', 0);
  world.fixture.store.set('palam:31:5', 0);
  const { equip_com13 } = world.fixture.load_module('system/train/com-toy');
  await equip_com13(() => 1);
  assert.equal(
    world.fixture.store.get('source:31:6'),
    2820,
    '10×2 后再加 2800',
  );
});

test('@EQUIP_COM14–17：分别累加对应快感与同性经验', async () => {
  const world = seed_world();
  for (const com of [14, 15, 16, 17]) {
    world.fixture.store.set(`tequip:31:${com}`, 1);
    await world.equip_com_family.call(com);
  }
  assert.ok((world.fixture.store.get('source:31:0') || 0) > 0);
  assert.ok((world.fixture.store.get('source:31:17') || 0) > 0);
  assert.ok((world.fixture.store.get('exp:31:40') || 0) >= 3);
});

test('@EQUIP_COM16：触手路径保留 SYOKUSYU_MILK 运行时存根', async () => {
  const world = seed_world();
  world.fixture.store.set('tequip:31:16', 1);
  world.fixture.store.set('tequip:31:90', 1);
  await world.equip_com_family.call(16);
  assert.ok(
    world.fixture.text_lines().some((line) => line.includes('@SYOKUSYU_MILK')),
  );
});

test('@EQUIP_COM18：欲情最高档在附加 50 后写 SOURCE:12 = 200', async () => {
  const world = seed_world();
  world.fixture.store.set('tequip:31:18', 1);
  world.fixture.store.set('abl:31:5', 0);
  world.fixture.store.set('palam:31:5', 10000);
  await world.equip_com_family.call(18);
  assert.equal(world.fixture.store.get('source:31:12'), 200);
});

test('@EQUIP_COM18：每回合清洗；@EQUIP_COM19：肛门经验与同性经验', async () => {
  const shower = seed_world();
  shower.fixture.store.set('tequip:31:18', 1);
  shower.fixture.store.set('stain:31:0', 15);
  await shower.equip_com_family.call(18);
  assert.equal(shower.fixture.store.get('stain:31:0'), 0);
  assert.equal(shower.fixture.store.get('source:31:16'), 300);

  const beads = seed_world();
  beads.fixture.store.set('tequip:31:19', 1);
  await beads.equip_com_family.call(19);
  assert.equal(beads.fixture.store.get('exp:31:1'), 1);
  assert.equal(beads.fixture.store.get('exp:31:40'), 1);
});

test('SOURCE_CHECK 正式链：道具族装备位经 emit → EQUIP_COM_CHAIN 全部打到真身', async () => {
  const world = seed_world();
  const { emit } = world.fixture.load_module('system/event/registry');
  world.fixture.load_module('event/source-check');
  // 八个装备位全部点亮（date 默认 0 ≠ 15，产卵分支不参与）
  for (const slot of [11, 13, 14, 15, 16, 17, 18, 19]) {
    world.fixture.store.set(`tequip:31:${slot}`, 1);
  }
  world.era_flag.selectcom = 11;
  world.fixture.store.set('flag:7', 0); // 关口上总开关，聚焦装备循环输出

  await emit('SOURCE_CHECK');

  // 各位的横幅即真身执行的足迹；横幅序 = EQUIP_COM_CHAIN 的链序
  const banners = [
    '＜蠕虫插入中＞',
    '＜肛门虫插入中＞',
    '＜阴蒂夹装备中＞',
    '＜乳头夹装备中＞',
    '＜榨乳器装备中＞',
    '＜飞机杯装备中＞',
    '＜淋浴中＞',
    '＜肛珠装备中＞',
  ];
  const positions = banners.map((banner) =>
    world.fixture.text_lines().indexOf(banner),
  );
  assert.ok(
    positions.every((position) => position >= 0),
    `八个装备位的持续效果横幅必须在场：${JSON.stringify(positions)}`,
  );
  assert.deepEqual(
    positions,
    [...positions].sort((a, b) => a - b),
    '横幅按链序 11→13→14→15→16→17→18→19 出现',
  );
  assert.equal(
    world.fixture.store.get('tflag:19'),
    1,
    'EQUIP_COM11 置位 TFLAG:19（本族唯一写者）',
  );
  assert.equal(
    world.fixture.store.get('exp:31:1'),
    2,
    'EQUIP_COM13/19 各 +1 肛门经验',
  );
});

// —— TRAIN_MESSAGE_A/B ——

test('TRAIN_MESSAGE_B：10–19 都有本族文本分支', async () => {
  const world = seed_world();
  for (let com = 10; com <= 19; com += 1) {
    clear_lines(world.fixture);
    world.era_flag.selectcom = com;
    if ([11, 13, 14, 15, 16, 17, 18, 19].includes(com)) {
      world.fixture.store.set(`tequip:31:${com}`, 0);
    }
    await world.train_message_b();
    assert.ok(
      world.fixture
        .text_lines()
        .some((line) => !line.includes('@TRAIN_MESSAGE_B')),
      `COM${com} 不得落公共存根`,
    );
  }
});

test('TRAIN_MESSAGE_A：10–14 输出自身分支，15–19 显式无输出不落存根', async () => {
  const world = seed_world();
  for (const com of [10, 11, 12, 13, 14]) {
    clear_lines(world.fixture);
    world.era_flag.selectcom = com;
    await world.train_message_a();
    assert.ok(world.fixture.text_lines().length > 0, `COM${com} 有 A 分支`);
  }
  for (const com of [15, 16, 17, 18, 19]) {
    clear_lines(world.fixture);
    world.era_flag.selectcom = com;
    await world.train_message_a();
    assert.deepEqual(world.fixture.text_lines(), [], `COM${com} 原作无 A 分支`);
  }
});

test('TRAIN_MESSAGE_B：淋浴开始分成原作的两行', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 18;
  await world.train_message_b();
  assert.ok(world.fixture.text_lines().includes('温妮的淋浴开始了、'));
  assert.ok(world.fixture.text_lines().includes('水花流过吹弹可破的肌肤………'));
});

test('存根清单可检索：docs/stub-registry.md 收录 SYOKUSYU_MILK', () => {
  const { fixture } = seed_world();
  const mod = fixture.load_module('system/train/com-toy');
  const registry = fs.readFileSync(
    path.join(REPO, 'docs', 'stub-registry.md'),
    'utf8',
  );
  assert.deepEqual(mod.STUBBED_CALLS, ['SYOKUSYU_MILK']);
  assert.ok(registry.includes('`SYOKUSYU_MILK`'));
});
