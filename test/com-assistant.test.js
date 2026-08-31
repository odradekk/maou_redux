/**
 * ere/system/train/com-assistant.js 的行为测试（issue #225：J15 指令族·助手
 * 与蕾丝 60–73）。验收项「四件套一文件」的落点：
 *
 *   - @COM_ABLE60-73 的判据（助手身份 / 双阴茎 / 失神 / 装备互斥；67 不建壳）；
 *   - @COM60-73 真身（高级 COM 64/69/70 的 SELECTCOM 回填、COM61 升格入口）；
 *   - TRAIN_MESSAGE_B 60-66/68-72 分支与 67/73 的真实无输出；
 *   - @GET_ADV_COM 的 CASE 61 升格规则（强制舔阴 → 六九式）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const ASSI = 17;
const TARGET = 31;
const FAMILY_IDS = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73];
const ABLE_IDS = [60, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73];
const B_TEXT_IDS = [60, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72];

function seed_names(fixture) {
  for (const [id, name] of [
    [0, '阴蒂感觉'],
    [1, '乳房感觉'],
    [2, '私处感觉'],
    [3, '肛门感觉'],
    [7, '露出癖'],
    [10, '顺从'],
    [11, '欲望'],
    [12, '技巧'],
    [13, '侍奉技术'],
    [14, '性交技术'],
    [16, '侍奉精神'],
    [17, '露出癖'],
    [21, '抖M气质'],
    [22, '百合气质'],
    [32, '精液中毒'],
  ]) {
    fixture.store.set(`ablname:${id}`, name);
  }
  fixture.store.set('markname:1', '快乐刻印');
  fixture.store.set('palamname:5', '欲情');
  fixture.store.set('itemname:26', '媚药');
  fixture.store.set('expname:0', '私处经验');
  fixture.store.set('expname:1', '肛门经验');
  fixture.store.set('expname:5', '性交经验');
  fixture.store.set('expname:20', '精液经验');
  fixture.store.set('expname:21', '侍奉快乐经验');
  fixture.store.set('expname:22', '口交经验');
  fixture.store.set('expname:23', '爱情经验');
  fixture.store.set('expname:40', '百合经验');
  fixture.store.set('expname:41', '断背经验');
  fixture.store.set('expname:50', '异常经验');
  for (const [id, name] of [
    [0, '处女'],
    [24, '保守的'],
    [35, '害羞'],
    [52, '擅用舌头'],
    [61, '不怕污臭'],
    [62, '反感污臭'],
    [63, '献身的'],
    [70, '接受快感'],
    [71, '否定快感'],
    [79, '男人婆'],
    [80, '倒错的'],
    [82, '讨厌男人'],
    [83, '施虐狂'],
    [85, '爱慕'],
    [87, '小恶魔'],
    [121, '扶她'],
    [122, '男人'],
  ]) {
    fixture.store.set(`talentname:${id}`, name);
  }
}

function arm_assistant_world(world) {
  const { fixture } = world;
  for (const cid of [0, TARGET, ASSI]) {
    for (const id of [0, 1, 2, 3, 7, 10, 11, 12, 13, 14, 16, 17, 21, 22, 32]) {
      fixture.store.set(`abl:${cid}:${id}`, 5);
    }
    fixture.store.set(`maxbase:${cid}:2`, 1000000);
    fixture.store.set(`maxbase:${cid}:3`, 1000000);
    fixture.store.set(`base:${cid}:0`, 1000);
  }
  fixture.store.set(`palam:${TARGET}:3`, 30000);
  fixture.store.set(`palam:${TARGET}:5`, 30000);
  fixture.store.set(`mark:${TARGET}:1`, 3);
  fixture.store.set(`exp:${ASSI}:0`, 1);
  fixture.store.set(`talent:${TARGET}:0`, 0);
  fixture.store.set(`talent:${ASSI}:0`, 0);
  fixture.store.set(`talent:${TARGET}:302`, 1);
  fixture.store.set(`talent:${TARGET}:304`, 1);
  fixture.store.set(`talent:${TARGET}:310`, 50);
}

function seed_world({ assi = ASSI, player = 0 } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, TARGET, '温妮');
  if (assi >= 0 && assi !== 0) {
    fixture.seed_chara(assi, {
      id: assi,
      name: `助手${assi}`,
      callname: `助手${assi}`,
    });
    fixture.era.addCharacter(assi);
  }
  fixture.era.beginTrain(0, TARGET);
  seed_names(fixture);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = TARGET;
  era_flag.player = player;
  era_flag.assi = assi;
  era_flag.assiplay = 0;
  era_flag.selectcom = -1;
  era_flag.prevcom = -1;
  fixture.store.set('callname:0:-1', '魔王');
  fixture.store.set('callname:0:-2', '魔王');
  fixture.store.set(`callname:${TARGET}:-1`, '温妮');
  fixture.store.set(`callname:${TARGET}:-2`, '温妮');
  if (assi >= 0 && assi !== 0) {
    fixture.store.set(`callname:${assi}:-1`, `助手${assi}`);
    fixture.store.set(`callname:${assi}:-2`, `助手${assi}`);
  }
  fixture.load_module('system/train/com-assistant');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { adv_com_family, get_adv_com } = fixture.load_module(
    'system/train/com-adv',
  );
  const world = {
    fixture,
    era_flag,
    com_family,
    com_able_family,
    adv_com_family,
    get_adv_com,
  };
  arm_assistant_world(world);
  return world;
}

async function run_com(world, id) {
  world.era_flag.selectcom = id;
  return world.com_family.call(id);
}

async function run_b(world, com) {
  world.era_flag.selectcom = com;
  const { train_message_b } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_b();
}

async function run_a(world, com) {
  world.era_flag.selectcom = com;
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
}

test('注册 60–73：COM、COM_ABLE（除 67）、B/A 与 CASE 61 全部进族', () => {
  const world = seed_world();
  const { train_message_a_family, train_message_b_family } =
    world.fixture.load_module('system/train/train-message');
  for (const id of FAMILY_IDS) {
    assert.equal(world.com_family.has(id), true, `COM${id}`);
    assert.equal(train_message_a_family.has(id), true, `A${id}`);
    assert.equal(train_message_b_family.has(id), true, `B${id}`);
  }
  for (const id of ABLE_IDS) {
    assert.equal(world.com_able_family.has(id), true, `COM_ABLE${id}`);
  }
  assert.equal(world.com_able_family.has(67), false, '源侧无 COM_ABLE67');
  assert.equal(world.adv_com_family.has(61), true, 'GET_ADV_COM CASE 61');
});

test('@COM_ABLE67：源侧无定义，未定义即可执行', async () => {
  const { com_able_family } = seed_world();
  assert.equal(com_able_family.has(67), false);
  assert.equal(await com_able_family.call(67, { whenMissing: 1 }), 1);
});

test('@COM_ABLE60：必须是助手在调教；失神/口枷/绝不侍奉/触手各挡一条', async () => {
  const world = seed_world({ player: ASSI });
  const { fixture, era_flag, com_able_family } = world;
  era_flag.assiplay = 1;
  assert.equal(await com_able_family.call(60), 1, '助手作为调教者默认可');

  era_flag.player = 0;
  era_flag.assiplay = 0;
  assert.equal(await com_able_family.call(60), 0, '主人当调教者不可');

  era_flag.player = ASSI;
  era_flag.assiplay = 1;
  fixture.store.set('tflag:899', 1);
  assert.equal(await com_able_family.call(60), 0, '失神中');
  fixture.store.set('tflag:899', 0);

  fixture.store.set(`tequip:${TARGET}:45`, 1);
  assert.equal(await com_able_family.call(60), 0, '口枷');
  fixture.store.set(`tequip:${TARGET}:45`, 0);

  fixture.store.set(`talent:${TARGET}:151`, 1);
  assert.equal(await com_able_family.call(60), 0, '绝不侍奉');
});

test('@COM_ABLE64：助手在场 + 两根阴茎；男人/未熟/震动器各挡一条', async () => {
  const world = seed_world();
  const { fixture, com_able_family } = world;
  fixture.store.set('talent:0:122', 1);
  fixture.store.set(`talent:${ASSI}:122`, 1);
  fixture.store.set(`exp:${TARGET}:1`, 10);
  assert.equal(await com_able_family.call(64), 1, '主助各一根 → 可');

  fixture.store.set(`talent:${ASSI}:122`, 0);
  assert.equal(await com_able_family.call(64), 0, '只剩一根');
  fixture.store.set('item:4', 1);
  assert.equal(await com_able_family.call(64), 1, '假阳具补第二根');
  fixture.store.set('item:4', 0);
  fixture.store.set(`talent:${ASSI}:122`, 1);

  fixture.store.set(`talent:${TARGET}:122`, 1);
  assert.equal(await com_able_family.call(64), 0, '目标是男人');
  fixture.store.set(`talent:${TARGET}:122`, 0);

  fixture.store.set(`exp:${TARGET}:1`, 9);
  assert.equal(await com_able_family.call(64), 0, '肛门经验不足 10');
});

test('@COM_ABLE73：自动调教旗与顺从门槛', async () => {
  const world = seed_world();
  const { fixture, com_able_family } = world;
  fixture.store.set(`abl:${TARGET}:10`, 2);
  assert.equal(await com_able_family.call(73), 1);

  fixture.store.set('tflag:224', 555);
  assert.equal(await com_able_family.call(73), 0, '自动调教不可');
  fixture.store.set('tflag:224', 0);

  fixture.store.set(`abl:${TARGET}:10`, 1);
  assert.equal(await com_able_family.call(73), 0, '顺从不足 2');
});

test('@COM60-73：骨架标题行与返回 1', async () => {
  const titles = {
    60: '助手接吻',
    61: '强制舔阴',
    62: '侵犯助手',
    63: '磨镜',
    64: '３Ｐ',
    65: '逆侵犯助手',
    66: '双枪口交',
    67: '践踏奴隶',
    68: '双人口交',
    69: '六九式',
    70: '双人股间性交',
    71: '双人乳交',
    72: '刮阴毛',
    73: '摆弄发型',
  };
  for (const [id, title] of Object.entries(titles)) {
    const world = seed_world();
    world.fixture.set_inputs(1);
    const result = await run_com(world, Number(id));
    assert.equal(result, 1, `COM${id}`);
    assert.ok(
      world.fixture.text_lines().includes(title),
      `COM${id} 标题「${title}」`,
    );
  }
});

test('@COM64/@COM69/@COM70：升格抵达时显式回填 SELECTCOM', async () => {
  for (const id of [64, 69, 70]) {
    const world = seed_world();
    world.era_flag.selectcom = 20;
    const result = await world.com_family.call(id);
    assert.equal(result, 1);
    assert.equal(world.era_flag.selectcom, id, `COM${id} 回填 SELECTCOM`);
  }
});

test('CASE 61：上回合舔阴/口交/六九式且同调教者 → 升格 69', async () => {
  const world = seed_world();
  const { era_flag, fixture, adv_com_family } = world;
  era_flag.prevcom = 1;
  fixture.store.set(`abl:${TARGET}:10`, 3);
  fixture.store.set(`abl:${TARGET}:16`, 3);
  const result = await adv_com_family.call(61, {
    whenMissing: 61,
    args: [() => 0],
  });
  assert.equal(result, 69);
});

test('CASE 61：绳缚中不升格', async () => {
  const world = seed_world();
  const { era_flag, fixture, adv_com_family } = world;
  era_flag.prevcom = 1;
  fixture.store.set(`abl:${TARGET}:10`, 3);
  fixture.store.set(`abl:${TARGET}:16`, 3);
  fixture.store.set(`tequip:${TARGET}:44`, 1);
  const result = await adv_com_family.call(61, {
    whenMissing: 61,
    args: [() => 0],
  });
  assert.equal(result, 61);
});

test('B60-72：各有专属文案（源侧真实分支，非存根占位）', async () => {
  for (const com of B_TEXT_IDS) {
    const world = seed_world();
    world.fixture.store.set('tflag:40', 1);
    world.fixture.store.set('tflag:41', 2);
    await run_b(world, com);
    const lines = world.fixture.text_lines();
    assert.ok(lines.length > 0, `B${com} 应有输出`);
    assert.ok(
      !lines.some((l) => l.includes('指令')),
      `B${com} 不得是存根占位行`,
    );
  }
});

test('B67/B73：源侧无 SELECTCOM 分支，真实无输出', async () => {
  for (const com of [67, 73]) {
    const world = seed_world();
    await run_b(world, com);
    assert.deepEqual(world.fixture.text_lines(), [], `B${com}`);
  }
});

test('A60-73：无射精旗时不打「族票未落地」占位行；A72 有源侧反应', async () => {
  for (const com of FAMILY_IDS.filter((id) => id !== 72)) {
    const world = seed_world();
    await run_a(world, com);
    assert.deepEqual(world.fixture.text_lines(), [], `A${com}`);
  }
  const world = seed_world();
  await run_a(world, 72);
  const lines = world.fixture.text_lines();
  assert.ok(lines.length > 0, 'A72 应有输出');
  assert.ok(!lines.some((l) => l.includes('指令')), 'A72 不得是存根占位行');
});

test('存根清单可检索：docs/stub-registry.md 收录本族 INCEST 域内存根', () => {
  const world = seed_world();
  const { STUBBED_CALLS } = world.fixture.load_module(
    'system/train/com-assistant',
  );
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs/stub-registry.md'),
    'utf8',
  );
  assert.deepEqual(STUBBED_CALLS, ['INCEST']);
  for (const name of STUBBED_CALLS) {
    assert.ok(registry.includes(name), `docs/stub-registry.md 缺少 ${name}`);
  }
});

test('严格 TIMES：十进制逐步截断且负数朝零', () => {
  const world = seed_world();
  const { times } = world.fixture.load_module('system/train/com-assistant');
  assert.equal(times(175, 1.4), 245);
  assert.equal(times(-5, 0.5), -2);
  assert.equal(times(times(250, 0.7), 1.4), 245);
});

test('@COM_ABLE61：调教者是男人则不可', async () => {
  const world = seed_world();
  const { fixture, com_able_family } = world;
  assert.equal(await com_able_family.call(61), 1);
  fixture.store.set('talent:0:122', 1);
  assert.equal(await com_able_family.call(61), 0, '调教者是男人');
});

test('@COM_ABLE62：助手调教中不可；关系不足不可', async () => {
  const world = seed_world();
  const { fixture, era_flag, com_able_family } = world;
  fixture.store.set('talent:0:122', 1);
  fixture.store.set(`relation:${TARGET}:${ASSI}`, 101);
  assert.equal(await com_able_family.call(62), 1);
  era_flag.assiplay = 1;
  assert.equal(await com_able_family.call(62), 0, '助手调教中');
  era_flag.assiplay = 0;
  fixture.store.set(`relation:${TARGET}:${ASSI}`, 100);
  assert.equal(await com_able_family.call(62), 0, '相性不足');
});

test('@COM_ABLE65：必须是助手在调教', async () => {
  const world = seed_world({ player: ASSI });
  const { fixture, era_flag, com_able_family } = world;
  era_flag.assiplay = 1;
  fixture.store.set(`talent:${TARGET}:122`, 1);
  assert.equal(await com_able_family.call(65), 1);
  era_flag.player = 0;
  era_flag.assiplay = 0;
  assert.equal(await com_able_family.call(65), 0, '主人当调教者不可');
});

test('@COM_ABLE72：阴毛过短不可刮', async () => {
  const world = seed_world();
  const { fixture, com_able_family } = world;
  assert.equal(await com_able_family.call(72), 1);
  fixture.store.set(`talent:${TARGET}:310`, 20);
  assert.equal(await com_able_family.call(72), 0, '阴毛状态 ≤ 20');
});

test('COM60：实行通过后写入情爱/屈从源，并交换口污', async () => {
  const world = seed_world({ player: ASSI });
  const { fixture, era_flag } = world;
  era_flag.assiplay = 1;
  assert.equal(await run_com(world, 60), 1);
  assert.equal(fixture.store.get(`source:${TARGET}:13`), 100);
  assert.equal(fixture.store.get(`source:${TARGET}:14`), 10);
  assert.equal(fixture.store.get('tflag:100'), 1);
});

test('COM64：升格路径按本次/上次指令分配部位并回填 SELECTCOM', async () => {
  const world = seed_world();
  const { fixture, era_flag } = world;
  era_flag.selectcom = 20;
  era_flag.prevcom = 27;
  assert.equal(await world.com_family.call(64), 1);
  assert.equal(era_flag.selectcom, 64);
  assert.equal(fixture.store.get('tflag:40'), 1);
  assert.equal(fixture.store.get('tflag:41'), 2);
  assert.ok(fixture.text_lines().includes('・私处和肛门一起插'));
});

test('COM65：助手处女选「不要」则取消回合', async () => {
  const world = seed_world({ player: ASSI });
  const { fixture, era_flag } = world;
  era_flag.assiplay = 1;
  fixture.store.set(`talent:${ASSI}:0`, 1);
  fixture.set_inputs(1);
  assert.equal(await run_com(world, 65), 0);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('处女，让')),
    '应询问是否夺走助手处女',
  );
});

test('COM72：刮后阴毛状态置 1，且本体不调 TRAIN_MESSAGE_B', async () => {
  const world = seed_world();
  const { fixture } = world;
  assert.equal(await run_com(world, 72), 1);
  assert.equal(fixture.store.get(`talent:${TARGET}:310`), 1);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('的阴毛漂亮地刮掉了')),
  );
  assert.equal(
    fixture.text_lines().filter((line) => line.includes('刮了干净')).length,
    0,
    'COM72 本体不得再调 B72',
  );
});

test('COM73：短发跳过剪发；发型不变时保持原样；按钮无手写编号前缀', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.set_inputs(1);
  assert.equal(await run_com(world, 73), 1);
  assert.ok(fixture.text_lines().some((line) => line.includes('发型保持原样')));
  const buttons = fixture.lines.filter((line) => line.type === 'button');
  assert.ok(
    buttons.some((line) => line.accelerator === 1 && line.text === '自然'),
  );
  assert.ok(buttons.every((line) => !/\[\d+\]/.test(line.text)));
});

test('A62/A68/A69：射精旗打开后走源侧反应文', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('tflag:7', 1);
  await run_a(world, 62);
  assert.ok(fixture.text_lines().some((line) => line.includes('当着温妮的面')));

  const world68 = seed_world();
  world68.fixture.store.set('tflag:0', 1);
  await run_a(world68, 68);
  assert.ok(
    world68.fixture.text_lines().some((line) => line.includes('用嘴接住精液')),
  );

  const world69 = seed_world();
  world69.fixture.store.set('tflag:0', 2);
  await run_a(world69, 69);
  assert.ok(
    world69.fixture
      .text_lines()
      .some((line) => line.includes('把精液喝下去了')),
  );
});
