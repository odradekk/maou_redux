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

test('@COM123：乳夹口交，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 32;
  world.fixture.store.set('abl:31:11', 36);
  const result = await world.com_family.call(123);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 123, '原作显式 SELECTCOM = 123');
  assert.ok(world.fixture.text_lines().includes('乳夹口交'));
  // ABL:16=0 → S4=620 ×0.80（技巧）=496；S5=150 ×0.80=120；
  // S8=100 ×4.00=400；S13=2200；S14=900；S17=100。
  assert.equal(world.fixture.store.get('source:31:4'), 496);
  assert.equal(world.fixture.store.get('source:31:5'), 120);
  assert.equal(world.fixture.store.get('source:31:8'), 400);
  assert.equal(world.fixture.store.get('source:31:13'), 2200);
  assert.equal(world.fixture.store.get('source:31:14'), 900);
  assert.equal(world.fixture.store.get('source:31:17'), 100);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -30);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
  assert.equal(world.fixture.store.get('tflag:200'), 3);
});

test('@COM123：实行值不足则取消回合', async () => {
  const world = seed_world();
  const result = await world.com_family.call(123);
  assert.equal(result, 0);
  assert.equal(world.era_flag.selectcom, 123);
  assert.equal(world.fixture.store.get('source:31:13'), undefined);
});

test('@COM123 B/A：乳夹侍奉行与口中倾泻', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:11', 36);
  await world.com_family.call(123);
  assert.ok(
    world.fixture.text_lines().includes('温妮用胸部夹着阴茎、舔舐刺激着…'),
  );

  world.fixture.store.set('tflag:0', 1);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture
      .text_lines()
      .includes('你的阴茎、一边被胸部紧紧夹住、一边在温妮的嘴里倾泻精液…'),
  );
});

test('@COM124：深喉，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 31;
  world.fixture.store.set('abl:31:11', 40);
  const result = await world.com_family.call(124);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 124, '原作显式 SELECTCOM = 124');
  assert.ok(world.fixture.text_lines().includes('深喉'));
  // ABL:16=0 → S4=620 ×0.50（技巧）=310；S5=150 ×0.50=75；
  // S8=100 ×4.00=400；S6=200；S13=1800；S14=600。
  assert.equal(world.fixture.store.get('source:31:4'), 310);
  assert.equal(world.fixture.store.get('source:31:5'), 75);
  assert.equal(world.fixture.store.get('source:31:6'), 200);
  assert.equal(world.fixture.store.get('source:31:8'), 400);
  assert.equal(world.fixture.store.get('source:31:13'), 1800);
  assert.equal(world.fixture.store.get('source:31:14'), 600);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -50);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
  assert.equal(world.fixture.store.get('tflag:200'), 2);
});

test('@COM124：实行值不足则取消回合', async () => {
  const world = seed_world();
  const result = await world.com_family.call(124);
  assert.equal(result, 0);
  assert.equal(world.era_flag.selectcom, 124);
  assert.equal(world.fixture.store.get('source:31:13'), undefined);
});

test('@COM124 B/A：喉咙最深处与抓住头射出', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:11', 40);
  await world.com_family.call(124);
  assert.ok(
    world.fixture.text_lines().includes('温妮用喉咙最深处对阴茎又吸又夹…'),
  );

  world.fixture.store.set('tflag:0', 1);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture.text_lines().includes('紧紧抓住温妮的头、在她喉咙深处射出…'),
  );
});

test('@COM125：口交时自慰，显式回填 SELECTCOM=125', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 31;
  world.fixture.store.set('abl:31:11', 50);
  const result = await world.com_family.call(125);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 125, '原作显式 SELECTCOM = 125');
  assert.ok(world.fixture.text_lines().includes('口交时自慰'));
});

test('@COM125：默认档 SOURCE / TFLAG', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:11', 50);
  await world.com_family.call(125);
  // ABL:0=0 → S0=15 ×0.30（技巧）=4；S12=2000 ×2.00（剃毛）=4000；
  // S13 被阴蒂感觉段覆写为 500。ABL:16=0 → S4 先 620 再被技巧覆写为 100 ×0.50=50；
  // S5=150 ×0.30=45；S8=100 ×4.00=400。
  assert.equal(world.fixture.store.get('source:31:0'), 4);
  assert.equal(world.fixture.store.get('source:31:4'), 50);
  assert.equal(world.fixture.store.get('source:31:5'), 45);
  assert.equal(world.fixture.store.get('source:31:8'), 400);
  assert.equal(world.fixture.store.get('source:31:12'), 4000);
  assert.equal(world.fixture.store.get('source:31:13'), 500);
  assert.equal(world.fixture.store.get('source:31:14'), 500);
  assert.equal(world.fixture.store.get('source:31:17'), 4);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -30);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
  assert.equal(world.fixture.store.get('tflag:200'), 3);
});

test('@COM125：实行值不足则取消回合', async () => {
  const world = seed_world();
  const result = await world.com_family.call(125);
  assert.equal(result, 0);
  assert.equal(world.era_flag.selectcom, 125);
  assert.equal(world.fixture.store.get('source:31:13'), undefined);
});

test('@COM125 B/A：吸啜自慰行与口中注入', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:11', 50);
  await world.com_family.call(125);
  assert.ok(
    world.fixture
      .text_lines()
      .includes('温妮一边吸啜着阴茎、一边玩弄着自己的阴唇…'),
  );

  world.fixture.store.set('tflag:0', 1);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(world.fixture.text_lines().includes('精液注入到温妮的嘴里了…'));
});

test('@COM135：自助舔阴（可直选）；扶她改自我口交', async () => {
  const world = seed_world();
  world.fixture.store.set('talent:31:121', 1);
  const result = await run_com(world, 135);
  assert.equal(result, 1);
  assert.ok(world.fixture.text_lines().includes('自我口交'));
});

test('@COM126：手搓口交，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 31;
  world.fixture.store.set('abl:31:11', 40);
  const result = await world.com_family.call(126);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 126, '原作显式 SELECTCOM = 126');
  assert.ok(world.fixture.text_lines().includes('手搓口交'));
  // ABL:16=0 → S4=500 ×0.80（技巧）=400；S5=150 ×0.50=75；
  // S8=100 ×4.00=400；S13=1500；S14=500。
  assert.equal(world.fixture.store.get('source:31:4'), 400);
  assert.equal(world.fixture.store.get('source:31:5'), 75);
  assert.equal(world.fixture.store.get('source:31:8'), 400);
  assert.equal(world.fixture.store.get('source:31:13'), 1500);
  assert.equal(world.fixture.store.get('source:31:14'), 500);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -20);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
  assert.equal(world.fixture.store.get('tflag:200'), 2);
});

test('@COM126：实行值不足则取消回合', async () => {
  const world = seed_world();
  const result = await world.com_family.call(126);
  assert.equal(result, 0);
  assert.equal(world.era_flag.selectcom, 126);
  assert.equal(world.fixture.store.get('source:31:13'), undefined);
});

test('@COM126 B/A：吸啜按摩行与口中注入', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:11', 40);
  await world.com_family.call(126);
  assert.ok(
    world.fixture.text_lines().includes('温妮吸啜着阴茎、按摩着阴茎的根部。'),
  );

  world.fixture.store.set('tflag:0', 1);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(world.fixture.text_lines().includes('精液注入到温妮的口中了…'));
});

test('@COM127：真空口交，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 31;
  world.fixture.store.set('abl:31:11', 40);
  const result = await world.com_family.call(127);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 127, '原作显式 SELECTCOM = 127');
  assert.ok(world.fixture.text_lines().includes('真空口交'));
  // SOURCE / 射精ゲージ与 COM124 同表：S4=310、S5=75、S6=200、S8=400、S13=1800、S14=600。
  assert.equal(world.fixture.store.get('source:31:4'), 310);
  assert.equal(world.fixture.store.get('source:31:5'), 75);
  assert.equal(world.fixture.store.get('source:31:6'), 200);
  assert.equal(world.fixture.store.get('source:31:8'), 400);
  assert.equal(world.fixture.store.get('source:31:13'), 1800);
  assert.equal(world.fixture.store.get('source:31:14'), 600);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -50);
  assert.equal(world.fixture.store.get('tflag:100'), 1);
  assert.equal(world.fixture.store.get('tflag:200'), 2);
});

test('@COM127：实行值不足则取消回合', async () => {
  const world = seed_world();
  const result = await world.com_family.call(127);
  assert.equal(result, 0);
  assert.equal(world.era_flag.selectcom, 127);
  assert.equal(world.fixture.store.get('source:31:13'), undefined);
});

test('@COM127 B/A：吮吸行与口中开放精关', async () => {
  const world = seed_world();
  world.fixture.store.set('abl:31:11', 40);
  await world.com_family.call(127);
  assert.ok(
    world.fixture
      .text_lines()
      .includes(
        '温妮将你的龟头、用舌头舔舐着、脸颊凹陷、发出淫秽的声音、强烈地吮吸着…',
      ),
  );

  world.fixture.store.set('tflag:0', 1);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture.text_lines().includes('温妮吸啜着阴茎、在她口中开放了精关…'),
  );
});

test('@COM128：正常位・接吻，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 20;
  world.fixture.store.set('abl:31:2', 3);
  world.fixture.store.set('exp:31:0', 4);
  world.fixture.store.set('palam:31:3', 500);
  const result = await world.com_family.call(128);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 128, '原作显式 SELECTCOM = 128');
  assert.ok(world.fixture.text_lines().includes('正常位・接吻'));
  assert.equal(world.fixture.store.get('tflag:19'), 1);
  // ABL:16=0 → S4=50 ×0.50（技巧）=25；S5=10 ×0.50=5。
  // ABL:2=3 → S1=1000、S3=500；EXP < EXPLV:3 → S1×1、S6=50；
  // 润滑 < LV3 → S1×1、S6×0.50=25；欲情 < LV1 → S1×0.60=600、S3×0.30=150；
  // 顺从 0 → S1×0.50=300、S3×0.60=90、S15 未赋×2=0；
  // 源侧爱慕段第二行 TIMES SOURCE:3,2.00 无缩进，恒乘 → S3=180。
  assert.equal(world.fixture.store.get('source:31:1'), 300);
  assert.equal(world.fixture.store.get('source:31:3'), 180);
  assert.equal(world.fixture.store.get('source:31:4'), 25);
  assert.equal(world.fixture.store.get('source:31:5'), 5);
  assert.equal(world.fixture.store.get('source:31:6'), 25);
  assert.equal(world.fixture.store.get('source:31:12'), 400);
  assert.equal(world.fixture.store.get('source:31:15'), 0);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -60);
});

test('@COM128 B/A：接吻贯穿行与灌满余韵', async () => {
  const world = seed_world();
  world.fixture.store.set('callname:0:-1', '魔王');
  await world.com_family.call(128);
  assert.ok(
    world.fixture
      .text_lines()
      .includes(
        '温妮被贯穿的身体迎接着压下来的分量、嘴唇与魔王重重地吻着、舌头缠绕在一起…',
      ),
  );

  world.fixture.store.set('tflag:2', 1);
  world.fixture.store.set('palam:31:5', 10000);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture
      .text_lines()
      .includes('温妮被精液灌满的私处、轻轻蠕动着、把魔王的阴茎紧紧缠住了…'),
  );
});

test('@COM129：正常位・胸爱抚，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 20;
  world.fixture.store.set('abl:31:2', 3);
  world.fixture.store.set('exp:31:0', 4);
  world.fixture.store.set('palam:31:3', 500);
  const result = await world.com_family.call(129);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 129, '原作显式 SELECTCOM = 129');
  assert.ok(world.fixture.text_lines().includes('正常位・胸爱抚'));
  assert.equal(world.fixture.store.get('tflag:19'), 1);
  // ABL:2=3 → S1=1000、S3=500；EXP < EXPLV:3 → S1×1、S6=50；
  // ABL:1=0 → S17=50、S3+=50 → 550；润滑 < LV3 → S1×1、S6×0.50=25；
  // 欲情 < LV1 → S1×0.60=600、S3×0.30=165；顺从 0 → S1×0.50=300、S3×0.60=99。
  assert.equal(world.fixture.store.get('source:31:1'), 300);
  assert.equal(world.fixture.store.get('source:31:3'), 99);
  assert.equal(world.fixture.store.get('source:31:6'), 25);
  assert.equal(world.fixture.store.get('source:31:12'), 400);
  assert.equal(world.fixture.store.get('source:31:17'), 50);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -60);
});

test('@COM129 B/A：胸揉搓行与灌满余韵', async () => {
  const world = seed_world();
  world.fixture.store.set('callname:0:-1', '魔王');
  await world.com_family.call(129);
  assert.ok(
    world.fixture
      .text_lines()
      .includes('温妮被贯穿的身体上、晃动的胸部被魔王揉搓着…'),
  );

  world.fixture.store.set('tflag:2', 1);
  world.fixture.store.set('palam:31:5', 10000);
  const { train_message_a } = world.fixture.load_module(
    'system/train/train-message',
  );
  await train_message_a();
  assert.ok(
    world.fixture
      .text_lines()
      .includes('温妮被精液灌满的私处、轻轻蠕动着、把魔王的阴茎紧紧缠住了…'),
  );
});

test('@COM130：正常位ＳＰ，回填 SELECTCOM 与默认 SOURCE', async () => {
  const world = seed_world();
  world.era_flag.selectcom = 20;
  world.fixture.store.set('abl:31:2', 3);
  world.fixture.store.set('exp:31:0', 4);
  world.fixture.store.set('palam:31:3', 500);
  const result = await world.com_family.call(130);
  assert.equal(result, 1);
  assert.equal(world.era_flag.selectcom, 130, '原作显式 SELECTCOM = 130');
  assert.ok(world.fixture.text_lines().includes('正常位ＳＰ'));
  assert.equal(world.fixture.store.get('tflag:19'), 1);
  // ABL:16=0 → S4=50 ×0.50=25、S5=10 ×0.50=5；ABL:0=0 → S0=20。
  // ABL:2=3 → S1=1000、S3=800；EXP < EXPLV:3 → S1×1、S6=50；
  // 润滑 < LV3 → S1×1、S6×0.50=25；ABL:1=0 → S17=20、S3=50（覆写）；
  // 欲情 < LV1 → S1×0.60=600、S3×0.30=15；顺从 0 → S1×0.50=300、S3×0.60=9。
  assert.equal(world.fixture.store.get('source:31:0'), 20);
  assert.equal(world.fixture.store.get('source:31:1'), 300);
  assert.equal(world.fixture.store.get('source:31:3'), 9);
  assert.equal(world.fixture.store.get('source:31:4'), 25);
  assert.equal(world.fixture.store.get('source:31:5'), 5);
  assert.equal(world.fixture.store.get('source:31:6'), 25);
  assert.equal(world.fixture.store.get('source:31:12'), 400);
  assert.equal(world.fixture.store.get('source:31:17'), 20);
  assert.equal(world.fixture.store.get('deltabase:31:0'), -70);
});

test('@COM130 B/A：接吻胸揉与子宫突进行', async () => {
  const world = seed_world();
  world.fixture.store.set('callname:0:-1', '魔王');
  await world.com_family.call(130);
  const lines = world.fixture.text_lines();
  assert.ok(
    lines.includes(
      '温妮用被贯穿的身体迎接着压下来的分量、嘴唇与魔王重重地吻着、舌头缠绕在一起…',
    ),
  );
  assert.ok(lines.includes('晃动的胸部被魔王揉搓着。'));
  assert.ok(lines.includes('在肉体与灵魂交汇中挺动着腰、不停地捅着子宫…'));
  assert.ok(lines.includes('温妮觉得异物感太强了、很痛苦的样子…'));
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
