/**
 * ere/system/train/com-advanced.js 的行为测试（issue #229：J19 指令族·追加
 * 与高级 120-135）。骨架切片覆盖：
 *
 *   - 16 条 @COM_ABLE 的关键判据（FLAG:71、男性器、无头骑士、技巧门槛）；
 *   - 高级 COM 显式回填 SELECTCOM；
 *   - TRAIN_MESSAGE 空操作占位（不得出「族票未落地」占位行）；
 *   - @GET_ADV_COM CASE 135（口交时自慰升格）。
 */
const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assiplay = 0;
  era_flag.assi = -1;
  era_flag.selectcom = -1;
  era_flag.prevcom = -1;
  fixture.load_module('system/train/com-advanced');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  const { adv_com_family } = fixture.load_module('system/train/com-adv');
  return { fixture, era_flag, com_family, com_able_family, adv_com_family };
}

async function run_com(world, com) {
  world.era_flag.selectcom = com;
  return world.com_family.call(com);
}

function enable_insert(fixture) {
  fixture.store.set('talent:0:122', 1);
}

function enable_oral(fixture) {
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('abl:31:10', 3);
}

test('@COM_ABLE120：FLAG:71==1 挡；调教者需男性器/PBAND', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(120), 0, '调教者未配男性器（默认）');

  enable_insert(fixture);
  assert.equal(await com_able_family.call(120), 1, '男性器 → 可');

  fixture.store.set('flag:71', 1);
  assert.equal(await com_able_family.call(120), 0, 'FLAG:71==1 追加未许可');
  fixture.store.set('flag:71', 0);
  assert.equal(await com_able_family.call(120), 1);
});

test('@COM_ABLE122：对象需男人/扶她', async () => {
  const { fixture, com_able_family } = seed_world();
  enable_insert(fixture);
  assert.equal(await com_able_family.call(122), 0, '对象无男性器');
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(122), 1);
});

test('@COM_ABLE123：顺从/技巧/侍奉技术三门全低于 3 才挡；绝壁挡', async () => {
  const { fixture, com_able_family } = seed_world();
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('talent:31:110', 1); // 巨乳：过「非巨乳/爆乳/超乳需技巧 3」
  assert.equal(await com_able_family.call(123), 0, '三门皆低于 3');
  fixture.store.set('abl:31:10', 3);
  assert.equal(await com_able_family.call(123), 1, '一门达标即过');
  fixture.store.set('talent:31:116', 1);
  assert.equal(await com_able_family.call(123), 0, '绝壁');
});

test('@COM_ABLE128：技巧 3+ 或性交技术 2+；无决斗守卫', async () => {
  const { fixture, com_able_family } = seed_world();
  enable_insert(fixture);
  assert.equal(await com_able_family.call(128), 0, '技巧与性交技术都不足');
  fixture.store.set('abl:0:12', 3);
  assert.equal(await com_able_family.call(128), 1);
  fixture.store.set('tequip:31:55', 1);
  assert.equal(await com_able_family.call(128), 1, '128 无决斗守卫');
});

test('@COM_ABLE135：无头骑士（TALENT:314==4）；男人挡', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(135), 0, '非无头骑士');
  fixture.store.set('talent:31:314', 4);
  assert.equal(await com_able_family.call(135), 1);
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(135), 0, '男人');
});

test('@COM120：插入Ｇ点蹂躏，显式回填 SELECTCOM=120', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 34;
  world.fixture.store.set('trainalias:34', '骑乘位');
  const result = await world.com_family.call(120);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 120, '原作显式 SELECTCOM = 120');
  assert.ok(world.fixture.text_lines().includes('骑乘位Ｇ点蹂躏'));
});

test('@COM120：默认档 SOURCE / TFLAG 与骑乘派生', async () => {
  const world = seed_world();
  world.era_flag.prevcom = 20;
  world.era_flag.selectcom = 20;
  world.fixture.store.set('abl:31:2', 3);
  world.fixture.store.set('exp:31:0', 4);
  world.fixture.store.set('palam:31:3', 500);
  const result = await world.com_family.call(120);
  assert.equal(result, 1);
  assert.equal(world.fixture.store.get('tflag:19'), 1, '伴 V 经验旗');
  assert.equal(world.fixture.store.get('tflag:42'), 0, '三人 PLAY 持续清零');
  // ABL:2=3 → S1=2000；EXP < EXPLV:3 → ×1.00；润滑 < LV3 → ×1.00；
  // PALAM:13 < LV1 → ×0.60；ABL:10=0 → ×0.50。TIMES 逐步朝零截断。
  assert.equal(world.fixture.store.get('source:31:1'), 600);
  assert.equal(world.fixture.store.get('source:31:12'), 900);
  assert.equal(world.fixture.store.get('source:31:6'), 5);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -50);

  const riding = seed_world();
  riding.era_flag.prevcom = 34;
  riding.era_flag.selectcom = 34;
  riding.fixture.store.set('trainalias:34', '骑乘位');
  await riding.com_family.call(120);
  assert.equal(riding.fixture.store.get('source:31:12'), 1300);
  assert.equal(riding.fixture.store.get('source:31:4'), 200);
  assert.equal(riding.fixture.store.get('deltabase:31:0'), -60);
});

test('@COM120 B/A：体位行与对准Ｇ点射精', async () => {
  const world = seed_world();
  world.era_flag.prevcom = 20;
  world.era_flag.selectcom = 20;
  world.fixture.store.set('callname:0:-1', '魔王');
  await world.com_family.call(120);
  const lines = world.fixture.text_lines();
  assert.ok(
    lines.includes(
      '从下往上地挺动着腰、温妮私处内最敏感的那一点、被仔细摩擦着…',
    ),
  );
  assert.ok(lines.includes('温妮艰难地晃动着腰…'));

  world.fixture.store.set('tflag:2', 1);
  world.fixture.store.set('palam:31:5', 0);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture
      .text_lines()
      .includes('对准温妮私处内那最敏感的那一点、魔王射出了精液…'),
  );
});

test('@COM121：插入子宫口蹂躏，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.prevcom = 20;
  world.era_flag.selectcom = 20;
  world.fixture.store.set('trainalias:20', '正常位');
  world.fixture.store.set('abl:31:2', 3);
  world.fixture.store.set('exp:31:0', 4);
  world.fixture.store.set('palam:31:3', 500);
  const result = await world.com_family.call(121);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 121);
  assert.ok(world.fixture.text_lines().includes('正常位子宫口蹂躏'));
  assert.equal(world.fixture.store.get('tflag:19'), 1);
  // ABL:2=3 → S1=800；EXP < EXPLV:3 → ×1.00；润滑 < LV3 → ×1.00；
  // PALAM:5 < LV1 → ×0.60；ABL:10=0 → ×0.50。
  assert.equal(world.fixture.store.get('source:31:1'), 240);
  assert.equal(world.fixture.store.get('source:31:12'), 400);
  assert.equal(world.fixture.store.get('source:31:0'), 6);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -50);
});

test('@COM121 B/A：子宫叩击行与直接注入精液', async () => {
  const world = seed_world();
  world.era_flag.prevcom = 20;
  world.era_flag.selectcom = 20;
  world.fixture.store.set('callname:0:-1', '魔王');
  await world.com_family.call(121);
  const lines = world.fixture.text_lines();
  assert.ok(
    lines.includes('抓住温妮的腰、往最深处突进、子宫被敲击着发出咚咚咚的声音…'),
  );
  assert.ok(lines.includes('温妮觉得异物感太强了、很痛苦的样子…'));

  world.fixture.store.set('tflag:2', 1);
  world.fixture.store.set('palam:31:5', 0);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture
      .text_lines()
      .includes('直接对温妮的子宫、注入了热乎乎的精液…'),
  );
});

test('@COM122：阴茎互捅（可直选），不回填 SELECTCOM', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:16', 5);
  const result = await run_com(world, 122);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 122);
  assert.ok(world.fixture.text_lines().includes('阴茎互捅'));
});

test('@COM122：实行值不足则取消回合', async () => {
  const world = seed_world();
  const result = await run_com(world, 122);
  assert.equal(result, 0);
  assert.equal(world.era_flag.selectcom, 122);
  assert.equal(world.fixture.store.get('source:31:12'), undefined);
});

test('@COM122：默认档 SOURCE / TFLAG', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:16', 5);
  await run_com(world, 122);
  // ABL:0=0 → S0=20 ×0.50（润滑）=10；S12=250 ×0.80=200；
  // S13 被阴蒂感觉段覆写为 20 再 ×0.50（技巧）=10。
  assert.equal(world.fixture.store.get('source:31:0'), 10);
  assert.equal(world.fixture.store.get('source:31:11'), 200);
  assert.equal(world.fixture.store.get('source:31:12'), 200);
  assert.equal(world.fixture.store.get('source:31:13'), 10);
  assert.equal(world.fixture.store.get('source:31:14'), 300);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -30);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
});

test('@COM122 B/A：互摩擦行与射精弄脏', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:16', 5);
  await run_com(world, 122);
  const lines = world.fixture.text_lines();
  assert.ok(lines.includes('你和温妮用勃起的阴茎相互摩擦着……'));

  world.fixture.store.set('tflag:9', 1);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture.text_lines().includes('射出的精液、把温妮的阴茎弄脏了…'),
  );
});

test('@COM125：口交时自慰，显式回填 SELECTCOM=125', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 31;
  const result = await world.com_family.call(125);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 125, '原作显式 SELECTCOM = 125');
  assert.ok(world.fixture.text_lines().includes('口交时自慰'));
});

test('@COM135：自助舔阴（可直选）；扶她改自我口交', async () => {
  const world = seed_world();
  world.fixture.store.set('talent:31:121', 1);
  const result = await run_com(world, 135);
  assert.equal(result, 1);
  assert.ok(world.fixture.text_lines().includes('自我口交'));
});

test('@GET_ADV_COM CASE 135：PREVCOM 口交系且 COM_ABLE125 可 → 125；非口交不升', async () => {
  const world = seed_world();
  enable_oral(world.fixture);
  world.era_flag.prevcom = 31;
  const hit = await world.adv_com_family.call(135, {
    whenMissing: 135,
    args: [() => 0],
  });
  assert.equal(hit, 125, '口交系 PREVCOM 升到 125');

  world.era_flag.prevcom = 20;
  const miss = await world.adv_com_family.call(135, {
    whenMissing: 135,
    args: [() => 0],
  });
  assert.equal(miss, 135, '非口交 PREVCOM 不升');
});

test('TRAIN_MESSAGE 120-135：骨架空操作，不得出族票未落地占位行', async () => {
  for (const com of [120, 122, 125, 135]) {
    const world = seed_world();
    world.era_flag.selectcom = com;
    const { train_message_b, train_message_a } = world.fixture.load_module(
      'system/train/train-message',
    );
    await train_message_b();
    await train_message_a();
    assert.ok(
      !world.fixture.text_lines().some((l) => l.includes('族票未落地')),
      `COM${com} 不得打占位行`,
    );
  }
});

test('存根清单可检索：docs/stub-registry.md 收录 COM64', () => {
  const world = seed_world();
  const { STUBBED_CALLS } = world.fixture.load_module(
    'system/train/com-advanced',
  );
  const registry = require('node:fs').readFileSync(
    require('node:path').resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  assert.deepEqual(STUBBED_CALLS, ['COM64']);
  for (const name of STUBBED_CALLS) {
    assert.ok(registry.includes(name), `docs/stub-registry.md 缺少 ${name}`);
  }
});
