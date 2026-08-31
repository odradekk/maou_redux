/**
 * @file #222 奉仕系（COM30-38）的行为与回合生命周期测试。
 *
 * 覆盖源: COMF30-38、COMABLE.ERB、COMF_JUMP.ERB CASE30-34、
 * EVENT_TRAIN_MESSAGE_A/B.ERB 对应段。高阶目标尚未落地时，JUMPFORM 的
 * COM_MISSING 必须废弃回合而不能把基础指令当作回退。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

function seed_names(fixture) {
  for (const [id, name] of [
    [0, '阴蒂感觉'],
    [1, '乳房感觉'],
    [2, '私处感觉'],
    [3, '肛门感觉'],
    [10, '顺从'],
    [11, '欲望'],
    [12, '技巧'],
    [13, '侍奉技术'],
    [16, '侍奉精神'],
    [20, '抖M气质'],
    [21, '肛门感觉'],
    [22, '百合气质'],
    [32, '精液中毒'],
  ]) {
    fixture.store.set(`ablname:${id}`, name);
  }
  for (const [id, name] of [
    [0, '苦痛刻印'],
    [1, '快乐刻印'],
    [2, '屈服刻印'],
    [3, '反抗刻印'],
  ]) {
    fixture.store.set(`markname:${id}`, name);
  }
  fixture.store.set('palamname:5', '欲情');
  fixture.store.set('expname:0', '私处经验');
  fixture.store.set('expname:1', '肛门经验');
  fixture.store.set('itemname:22', '野狗');
  fixture.store.set('itemname:26', '媚药');
  for (const [id, name] of [
    [0, '处女'],
    [11, '高傲'],
    [15, '高姿态'],
    [17, '容易受孕'],
    [20, '克制'],
    [22, '害羞'],
    [30, '看重贞操'],
    [31, '看轻贞操'],
    [34, '讨厌男性'],
    [35, '害羞'],
    [36, '不知羞耻'],
    [52, '擅用舌头'],
    [61, '不怕污臭'],
    [62, '反感污臭'],
    [63, '献身的'],
    [64, '不怕脏'],
    [71, '否定快感'],
    [76, '淫乱'],
    [80, '淫乱'],
    [82, '讨厌男人'],
    [83, '施虐狂'],
    [85, '爱慕'],
    [87, '小恶魔'],
    [99, '魁梧'],
    [100, '小柄'],
    [107, '贫乳'],
    [108, '丰满'],
    [109, '贫乳'],
    [110, '巨乳'],
    [114, '爆乳'],
    [119, '超乳'],
    [121, '扶她'],
    [122, '男人'],
    [132, '幼女'],
  ]) {
    fixture.store.set(`talentname:${id}`, name);
  }
}

function seed_service_world(selectcom = 30) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  seed_names(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = selectcom;
  fixture.load_module('system/train/train-message');
  fixture.load_module('system/train/com-service');
  const { com_able_family, com_family, COM_MISSING } = fixture.load_module(
    'system/train/com-family',
  );
  return { fixture, era_flag, com_able_family, com_family, COM_MISSING };
}

function arm_service_world(world, { target_abl = 5, player_futa = true } = {}) {
  const { fixture } = world;
  for (const id of [0, 1, 2, 3, 10, 11, 12, 13, 16, 20, 21, 22, 32]) {
    fixture.store.set(`abl:31:${id}`, target_abl);
  }
  fixture.store.set('palam:31:3', 30000);
  fixture.store.set('palam:31:5', 30000);
  fixture.store.set('maxbase:0:2', 1000000);
  if (player_futa) fixture.store.set('talent:0:121', 1);
}

const SERVICE_COMS = [30, 31, 32, 33, 35, 37, 38];
for (const id of SERVICE_COMS) {
  test(`@COM${id}：完整判定通过后返回 1，并置快乐/屈服结算位`, async () => {
    const world = seed_service_world(id);
    arm_service_world(world);
    assert.equal(await world.com_family.call(id), 1);
    assert.equal(world.fixture.store.get('tflag:100'), 1);
    assert.notEqual(world.fixture.store.get('tflag:200'), undefined);
  });
}

test('@COM34：复用性交/避孕套流程，成功时置 TFLAG:19 并保留 SOURCE', async () => {
  const world = seed_service_world(34);
  arm_service_world(world);
  world.fixture.store.set('exp:31:0', 10);
  assert.equal(await world.com_family.call(34), 1);
  assert.equal(world.fixture.store.get('tflag:19'), 1);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
  assert.notEqual(world.fixture.store.get('source:31:1'), undefined);
});

test('@COM36：复用肛交共用后处理，成功时结算肛门经验', async () => {
  const world = seed_service_world(36);
  arm_service_world(world);
  world.fixture.store.set('exp:31:0', 10);
  world.fixture.store.set('exp:31:1', 10);
  assert.equal(await world.com_family.call(36), 1);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
  // COMF_ANALSEX 的共用后处理：ABL:3=5 时本回合肛门经验增加 4。
  assert.equal(world.fixture.store.get('exp:31:1'), 14);
});

test('@COM_ABLE30-38：默认门槛与各自一条阻断条件', async () => {
  const world = seed_service_world();
  const { fixture, com_able_family } = world;
  fixture.store.set('talent:0:121', 1);
  fixture.store.set('palam:31:3', 2000);
  fixture.store.set('exp:31:1', 10);
  fixture.store.set('item:13', 1);
  fixture.store.set('tequip:31:58', 1);
  // COM_ABLE32：非巨乳/爆乳/超乳时，技巧至少为 3。
  fixture.store.set('abl:31:12', 3);
  for (const id of [30, 31, 32, 33, 34, 35, 36, 37, 38]) {
    assert.equal(await com_able_family.call(id), 1, `COM_ABLE${id} 默认放行`);
  }
  fixture.store.set('tequip:31:44', 1);
  for (const id of [30, 31, 32, 34, 36, 37, 38]) {
    assert.equal(await com_able_family.call(id), 0, `COM_ABLE${id} 被绳子阻断`);
  }
  fixture.store.set('tequip:31:44', 0);
  fixture.store.set('cflag:31:40', 17);
  fixture.store.set('flag:37', 1);
  assert.equal(await com_able_family.call(34), 0, 'COM_ABLE34 被下装阻断');
  fixture.store.set('cflag:31:40', 0);
  fixture.store.set('flag:37', 0);
  fixture.store.set('item:13', 0);
  assert.equal(await com_able_family.call(33), 0, 'COM_ABLE33 浴室没有地垫');
  assert.equal(await com_able_family.call(35), 0, 'COM_ABLE35 浴室没有地垫');
  assert.equal(await com_able_family.call(36), 0, 'COM_ABLE36 浴室没有地垫');
});

test('COM31：TALENT:119 也能蓄积射精槽；死斗场第一次口交置初吻旗标', async () => {
  const world = seed_service_world(31);
  arm_service_world(world, { player_futa: false });
  world.fixture.store.set('talent:0:119', 1);
  assert.equal(await world.com_family.call(31), 1);
  assert(
    world.fixture.store.get('base:0:2') > 0,
    'TALENT:119 必须蓄积 BASE:PLAYER:2',
  );

  const arena = seed_service_world(31);
  arm_service_world(arena);
  arena.fixture.store.set('tequip:31:55', 1);
  arena.fixture.store.set('cflag:31:16', -1);
  assert.equal(await arena.com_family.call(31), 1);
  assert.equal(arena.fixture.store.get('cflag:31:16'), 995);
  assert.equal(arena.fixture.store.get('tflag:13'), 1);
});

test('COM33：射精时 SOURCE:4 乘 2、精液经验为 1/2', async () => {
  const world = seed_service_world(33);
  arm_service_world(world);
  world.fixture.store.set('maxbase:0:2', 100);
  assert.equal(await world.com_family.call(33), 1);
  assert.equal(world.fixture.store.get('source:31:4'), 2304);
  assert.equal(world.fixture.store.get('exp:31:20'), 2);
  assert.equal(world.fixture.store.get('tflag:9'), 2);
});

test('COM35：玩家执行时重置玩家而非固定 0 号的污渍', async () => {
  const world = seed_service_world(35);
  const { fixture, era_flag } = world;
  // 0 与 31 都是已加入的角色；交换目标和调教者，才能区分 PLAYER 与
  // 旧实现中硬编码的 0。为新的目标补齐实行值所需的能力/珠。
  era_flag.target = 0;
  era_flag.player = 31;
  for (const id of [0, 1, 2, 3, 10, 11, 12, 13, 16, 20, 21, 22, 32]) {
    fixture.store.set(`abl:0:${id}`, 5);
  }
  fixture.store.set('palam:0:3', 30000);
  fixture.store.set('palam:0:5', 30000);
  fixture.store.set('talent:31:121', 1);
  fixture.store.set('maxbase:31:2', 1000000);
  fixture.store.set('stain:31:4', 99);
  assert.equal(await world.com_family.call(35), 1);
  assert.equal(fixture.store.get('stain:31:4'), 8);
});

test('COM37：射精增量按玩家 ABL:3 分档，并给大量精液经验 4', async () => {
  const world = seed_service_world(37);
  arm_service_world(world);
  world.fixture.store.set('abl:0:3', 2);
  world.fixture.store.set('maxbase:0:2', 100);
  assert.equal(await world.com_family.call(37), 1);
  assert.equal(world.fixture.store.get('exp:31:20'), 4);
  assert.equal(world.fixture.store.get('tflag:5'), 2);
});

test('COM38：射精增量先后按玩家 ABL:21 与 ABL:0 截断', async () => {
  const world = seed_service_world(38);
  arm_service_world(world);
  world.fixture.store.set('abl:31:12', 0);
  world.fixture.store.set('abl:0:21', 0);
  world.fixture.store.set('abl:0:0', 1);
  world.fixture.store.set('maxbase:0:2', 1000000);
  assert.equal(await world.com_family.call(38), 1);
  assert.equal(world.fixture.store.get('base:0:2'), 1473);
});

test('CASE34：PALAM:5 = 10000 按第五档算，随机 10/0 跳子宫口并缓存 5121', async () => {
  const world = seed_service_world(34);
  const { fixture, era_flag, com_able_family } = world;
  era_flag.prevcom = 34;
  fixture.store.set('tflag:50', 0);
  fixture.store.set('abl:0:12', 3);
  fixture.store.set('palam:31:5', 10000);
  com_able_family.register(121, async () => 1);
  let randoms = [10 / 11, 0];
  fixture.override_math_random(() => randoms.shift());
  try {
    assert.equal(
      await world.com_family.call(34, { whenMissing: world.COM_MISSING }),
      world.COM_MISSING,
    );
    assert.equal(era_flag.selectcom, 34, '缺失高级目标不得提前改 SELECTCOM');
    assert.equal(fixture.store.get('flag:71'), 5121);
  } finally {
    fixture.restore_math_random();
  }
});

test('高级目标缺失：COM_MISSING 上抛，不回退执行基础 COM', async () => {
  const world = seed_service_world(30);
  const { fixture, era_flag, com_family, COM_MISSING } = world;
  era_flag.prevcom = 31;
  fixture.store.set('tflag:50', 0);
  world.com_able_family.register(126, async () => 1);
  assert.equal(
    await com_family.call(30, { whenMissing: COM_MISSING }),
    COM_MISSING,
  );
  assert.equal(era_flag.selectcom, 30);
  assert.equal(fixture.store.get('source:31:4'), undefined);
});

test('TRAIN_MESSAGE_B：COM31 死斗场、COM35 肤色、COM36 连续体位都走原始分支', async () => {
  const world = seed_service_world(31);
  const { fixture, era_flag } = world;
  const { train_message_b } = fixture.load_module('system/train/train-message');

  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('tflag:400', 203);
  await train_message_b();
  assert(fixture.text_lines().some((line) => line.includes('霉菌狗的阴茎')));

  era_flag.selectcom = 35;
  fixture.store.set('tequip:31:55', 0);
  fixture.store.set('talent:31:244', 1);
  await train_message_b();
  assert(fixture.text_lines().some((line) => line.includes('蓝色的肌肤')));
  assert(!fixture.text_lines().some((line) => line.includes('蓝色的的肌肤')));

  era_flag.selectcom = 36;
  era_flag.prevcom = 36;
  fixture.store.set('tflag:60', 1);
  fixture.store.set('tflag:50', 0);
  await train_message_b();
  assert(
    fixture.text_lines().some((line) => line.includes('紧紧地夹着体内的阴茎')),
  );
});

test('TRAIN_MESSAGE_B：正常末尾归一 TFLAG:31，文本省略早退不改它', async () => {
  const world = seed_service_world(34);
  const { fixture } = world;
  const { train_message_b } = fixture.load_module('system/train/train-message');
  fixture.store.set('tflag:31', 2);
  await train_message_b();
  assert.equal(fixture.store.get('tflag:31'), 1);

  fixture.store.set('flag:6', 1);
  fixture.store.set('tflag:31', 2);
  await train_message_b();
  assert.equal(fixture.store.get('tflag:31'), 2);
});

test('严格 TIMES：十进制逐步截断且负数朝零', () => {
  const world = seed_service_world();
  const { times } = world.fixture.load_module('system/train/com-service');
  assert.equal(times(175, 1.4), 245);
  assert.equal(times(-5, 0.5), -2);
  assert.equal(times(times(250, 0.7), 1.4), 245);
});

test('TRAIN_MESSAGE_A：COM31/32 口内射精与 COM38 足交射精各走本族文本', async () => {
  const world = seed_service_world(31);
  const { fixture, era_flag } = world;
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('tflag:0', 1);
  fixture.store.set('abl:31:32', 3);
  await train_message_a();
  assert(
    fixture.text_lines().some((line) => line.includes('把注入口中的精液喝光')),
  );

  era_flag.selectcom = 38;
  fixture.store.set('tflag:0', 0);
  fixture.store.set('tflag:18', 2);
  await train_message_a();
  assert(
    fixture
      .text_lines()
      .some((line) => line.includes('大量热乎乎的精液射到她的脚上')),
  );
});

test('TRAIN_MESSAGE_A：COM33 的 TFLAG:9 链按射精人与肤色输出', async () => {
  const world = seed_service_world(33);
  const { fixture } = world;
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('tflag:9', 1);
  fixture.store.set('talent:31:244', 1);
  await train_message_a();
  assert(
    fixture.text_lines().some((line) => line.includes('温妮的蓝色肌肤弄脏了')),
  );
});

test('TRAIN_MESSAGE_A：COM34/36 复用性交尾段，未射精才追加 UP:2 反应', async () => {
  const world = seed_service_world(34);
  const { fixture, era_flag } = world;
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('delta:31:2', 1000);
  await train_message_a();
  assert(fixture.text_lines().some((line) => line.includes('可爱的呻吟')));

  const before = fixture.text_lines().length;
  era_flag.selectcom = 36;
  fixture.store.set('tflag:2', 1);
  fixture.store.set('tflag:31', 1);
  await train_message_a();
  const second = fixture.text_lines().slice(before);
  assert(!second.some((line) => line.includes('可爱的呻吟')));
  assert(
    second.some((line) => line.includes('从肛门里漏出来的精液')),
    'COM36 必须经过 com-sex 的公共射精尾段',
  );
});
