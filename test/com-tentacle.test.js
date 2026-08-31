/**
 * ere/system/train/com-tentacle.js 的行为测试（issue #227：J17 指令族·触手
 * 与自由调教 COM 100–109 / 150 / 208）。验收项「四件套一文件」的落点：
 *
 *   - @COM_ABLE100-109 / 150 / 208 的判据（秘密知识/道具/装备互斥/触手中/
 *     男人/口塞/癖好 CSTR:7 / 死斗场——每条指令至少一段可用性用例）；
 *   - @COM100 真身（TRAIN_MESSAGE_B 在翻转 TEQUIP:90 之前、半阈值 EXP:55
 *     分档、胆怯/感情淡薄、解除清位）；
 *   - @COM101-107/109 的尾 JUMP（不改写 SELECTCOM；未落地目标 → COM_MISSING，
 *     已落地目标经 com_family 真身返回）；
 *   - @COM108 真身（初吻 CFLAG:16 直写、TEQUIP:98 取反、口交经验门面）；
 *   - @COM150 真身（CSTR:7 癖好、SOURCE:18/8/12、百合/断背经验）；
 *   - @COM208 真身（复用 ARENA_SLAVE_POINT / COM_AFTER_ARENA、菜单、
 *     JUMP COM31 缺失哨兵、JUMP COM5 落地、男人私处 RETURN 0）；
 *   - @EQUIP_COM100 / 108 持续效果（射精旗标 TFLAG:15、EXP:55 随 T 收尾）；
 *   - TRAIN_MESSAGE_B 100-109/150 与 A 150 + 100-109/208 显式无操作；
 *   - A 公共头 TFLAG:15 非死斗场触手两臂（含源侧双重打印）；
 *   - @SYOKUSYU_MILK（母乳体质获得；#220 的调用点可换掉存根）。
 *
 * 世界底座与 com-hardcore.test.js 的 seed_world 同构。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.join(__dirname, '..');

/** 世界底座：开火车表、指好 TARGET/PLAYER、装好触手族。 */
function seed_world({ load_colosseum = false, load_caress = false } = {}) {
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
  if (load_colosseum) {
    fixture.load_module('system/train/com-colosseum');
  }
  if (load_caress) {
    fixture.load_module('system/train/com-caress');
  }
  fixture.load_module('system/train/com-tentacle');
  const { com_family, com_able_family, equip_com_family, COM_MISSING } =
    fixture.load_module('system/train/com-family');
  return {
    fixture,
    era_flag,
    com_family,
    com_able_family,
    equip_com_family,
    COM_MISSING,
  };
}

/** 经族调用一条指令（真实循环里 SELECTCOM 由 train-loop 先置——测试同位） */
async function run_com(world, com, extra = {}) {
  world.era_flag.selectcom = com;
  return world.com_family.call(com, extra);
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

function printed_buttons(fixture) {
  return fixture.lines
    .filter((l) => l.type === 'button')
    .map((l) => `${l.accelerator}:${l.text}`);
}

function able_on(world) {
  world.fixture.store.set('talent:0:325', 1); // 调教者·秘密知识
  world.fixture.store.set('item:90', 1); // 触手召唤道具
}

// —— 注册面 ——

test('注册 100-109 / 150 / 208：COM、COM_ABLE、B/A 全部进族；EQUIP 100/108 进链', async () => {
  const world = seed_world();
  const { train_message_a_family, train_message_b_family } =
    world.fixture.load_module('system/train/train-message');
  for (const id of [
    100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 150, 208,
  ]) {
    assert.equal(world.com_family.has(id), true, `COM${id}`);
    assert.equal(world.com_able_family.has(id), true, `COM_ABLE${id}`);
    assert.equal(train_message_b_family.has(id), true, `B${id}`);
    assert.equal(train_message_a_family.has(id), true, `A${id}`);
  }
  assert.equal(world.equip_com_family.has(100), true, 'EQUIP_COM100');
  assert.equal(world.equip_com_family.has(108), true, 'EQUIP_COM108');
});

test('STUBBED_CALLS 为空：JUMP/CALL 全部经分发族，不建 COM11/13-17/31 存根', () => {
  const { fixture } = seed_world();
  const mod = fixture.load_module('system/train/com-tentacle');
  const registry = fs.readFileSync(
    path.join(REPO, 'docs', 'stub-registry.md'),
    'utf8',
  );
  assert.deepEqual(mod.STUBBED_CALLS, []);
  assert.ok(
    registry.includes('COM100') && registry.includes('#227'),
    '存根清单须登记本族已实现（#227）',
  );
});

// —— @COM_ABLE100-109 / 150 / 208 ——

test('@COM_ABLE100：秘密知识 + 道具；未开启时装备互斥；浴室/新妻/决斗/使役各挡一条', async () => {
  const world = seed_world();
  const { fixture, com_able_family } = world;
  assert.equal(await com_able_family.call(100), 0, '缺秘密知识');

  fixture.store.set('talent:0:325', 1);
  assert.equal(await com_able_family.call(100), 0, '缺 ITEM:90');

  fixture.store.set('item:90', 1);
  assert.equal(await com_able_family.call(100), 1, '秘密知识 + 道具 → 可');

  fixture.store.set('item:90', 0);
  fixture.store.set('noitem:0', 1);
  assert.equal(await com_able_family.call(100), 1, 'NOITEM 替代持有');
  fixture.store.set('noitem:0', 0);
  fixture.store.set('item:90', 1);

  fixture.store.set('tequip:31:11', 1);
  assert.equal(await com_able_family.call(100), 0, '未开启时震动器互斥');
  fixture.store.set('tequip:31:90', 1);
  assert.equal(
    await com_able_family.call(100),
    1,
    '已开启则互斥表跳过（可关）',
  );
  fixture.store.set('tequip:31:90', 0);
  fixture.store.set('tequip:31:11', 0);

  fixture.store.set('tequip:31:58', 1);
  assert.equal(await com_able_family.call(100), 0, '浴室 PLAY');
  fixture.store.set('tequip:31:58', 0);
  fixture.store.set('tequip:31:59', 1);
  assert.equal(await com_able_family.call(100), 0, '新妻 PLAY');
  fixture.store.set('tequip:31:59', 0);
  fixture.store.set('tequip:31:55', 1);
  assert.equal(await com_able_family.call(100), 0, '决斗中');
  fixture.store.set('tequip:31:55', 0);
  fixture.store.set('tequip:31:88', 1);
  assert.equal(await com_able_family.call(100), 0, '使役 PLAY');
});

test('@COM_ABLE101-109：一律需 TEQUIP:90；各号独有挡（男人/灌肠/榨乳/口塞/阴茎）', async () => {
  const { fixture, com_able_family } = seed_world();
  for (const id of [101, 102, 103, 104, 105, 106, 107, 108, 109]) {
    assert.equal(await com_able_family.call(id), 0, `COM_ABLE${id} 无触手中`);
  }
  fixture.store.set('tequip:31:90', 1);

  assert.equal(await com_able_family.call(101), 1);
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(101), 0, '101 男人不可');
  fixture.store.set('talent:31:122', 0);
  fixture.store.set('cflag:31:42', 79);
  fixture.store.set('cflag:31:40', 64);
  fixture.store.set('flag:37', 1);
  assert.equal(await com_able_family.call(101), 0, '101 贞操带');
  fixture.store.set('cflag:31:42', 0);
  fixture.store.set('talent:31:273', 1);
  assert.equal(await com_able_family.call(101), 0, '101 贞操封印');
  fixture.store.set('talent:31:273', 0);

  assert.equal(await com_able_family.call(102), 1);
  fixture.store.set('tequip:31:46', 1);
  assert.equal(await com_able_family.call(102), 0, '102 灌肠中');
  fixture.store.set('tequip:31:46', 0);

  assert.equal(await com_able_family.call(103), 1);
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(103), 0, '103 男人不可');
  fixture.store.set('talent:31:122', 0);

  assert.equal(await com_able_family.call(104), 1);
  fixture.store.set('tequip:31:16', 1);
  assert.equal(await com_able_family.call(104), 0, '104 榨乳中');
  fixture.store.set('tequip:31:16', 0);

  assert.equal(await com_able_family.call(105), 1);
  fixture.store.set('tequip:31:15', 1);
  assert.equal(await com_able_family.call(105), 0, '105 凌辱乳头中');
  fixture.store.set('tequip:31:15', 0);
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(105), 0, '105 男人不可');
  fixture.store.set('talent:31:122', 0);

  assert.equal(await com_able_family.call(106), 1, '106 只需触手中');

  assert.equal(await com_able_family.call(107), 1);
  fixture.store.set('tequip:31:13', 1);
  assert.equal(await com_able_family.call(107), 0, '107 肛交触手中');
  fixture.store.set('tequip:31:13', 0);

  assert.equal(await com_able_family.call(108), 1);
  fixture.store.set('tequip:31:45', 1);
  assert.equal(await com_able_family.call(108), 0, '108 口塞中');
  fixture.store.set('tequip:31:45', 0);

  assert.equal(await com_able_family.call(109), 0, '109 需男人或扶她');
  fixture.store.set('talent:31:122', 1);
  assert.equal(await com_able_family.call(109), 1, '109 男人');
  fixture.store.set('talent:31:122', 0);
  fixture.store.set('talent:31:121', 1);
  assert.equal(await com_able_family.call(109), 1, '109 扶她');
});

test('@COM_ABLE150：顺从+欲望≥6、无触手/兽奸/使役/决斗、无 zooko、CSTR:7 非空', async () => {
  const { fixture, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(150), 0, '能力合计不足且无癖好');

  fixture.store.set('abl:31:10', 3);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('cstr:31:7', '嗅觉');
  assert.equal(await com_able_family.call(150), 1);

  fixture.store.set('abl:31:10', 2);
  fixture.store.set('abl:31:11', 3);
  assert.equal(await com_able_family.call(150), 0, '合计 5 < 6');
  fixture.store.set('abl:31:10', 3);

  fixture.store.set('tequip:31:90', 1);
  assert.equal(await com_able_family.call(150), 0, '触手调教中');
  fixture.store.set('tequip:31:90', 0);
  fixture.store.set('tequip:31:89', 1);
  assert.equal(await com_able_family.call(150), 0);
  fixture.store.set('tequip:31:89', 0);
  fixture.store.set('tequip:31:88', 1);
  assert.equal(await com_able_family.call(150), 0);
  fixture.store.set('tequip:31:88', 0);
  fixture.store.set('tequip:31:55', 1);
  assert.equal(await com_able_family.call(150), 0);
  fixture.store.set('tequip:31:55', 0);

  fixture.store.set('cflag:31:42', 11);
  fixture.store.set('cflag:31:40', 64);
  fixture.store.set('flag:37', 1);
  assert.equal(await com_able_family.call(150), 0, 'zooko 着装');
  fixture.store.set('cflag:31:42', 0);

  fixture.store.set('cstr:31:7', '');
  assert.equal(await com_able_family.call(150), 0, '癖好未设定');
});

test('@COM_ABLE208：死斗场中 + 秘密知识 + 道具；助手调教不可；无等级门槛', async () => {
  const { fixture, era_flag, com_able_family } = seed_world();
  assert.equal(await com_able_family.call(208), 0, '不在死斗场');

  fixture.store.set('tequip:31:55', 1);
  assert.equal(await com_able_family.call(208), 0, '缺秘密知识');
  fixture.store.set('talent:0:325', 1);
  assert.equal(await com_able_family.call(208), 0, '缺 ITEM:90');
  fixture.store.set('item:90', 1);
  assert.equal(await com_able_family.call(208), 1, '三件齐 → 可');

  fixture.store.set('cflag:0:9', 0);
  assert.equal(
    await com_able_family.call(208),
    1,
    '无 CFLAG:PLAYER:9>=40 门槛（摘要勘误）',
  );

  era_flag.assiplay = 1;
  assert.equal(await com_able_family.call(208), 0, '助手调教不可');
});

// —— @COM100 ——

test('@COM100：B 在翻转之前（未开启 → 缠上了）；置位并按 EXP:55 半阈值缩放损耗', async () => {
  const world = seed_world();
  const { fixture } = world;
  able_on(world);
  const result = await run_com(world, 100);
  assert.equal(result, 1);
  assert.equal(fixture.store.get('tequip:31:90'), 1);
  assert.ok(
    fixture.text_lines().some((l) => l.includes('缠上了')),
    'B 读翻转前 TEQUIP:90==0 → 进入支',
  );
  assert.ok(!fixture.text_lines().some((l) => l.includes('回到原位')));
  // EXP:55==0 < EXPLV:1 → A=300；LOSEBASE 0/1 = 300/600；UP:10=6000；SOURCE:14=1500
  assert.equal(fixture.store.get('deltabase:31:0'), -300);
  assert.equal(fixture.store.get('deltabase:31:1'), -600);
  assert.equal(fixture.store.get('delta:31:10'), 6000);
  assert.equal(fixture.store.get('source:31:14'), 1500);
  assert.equal(fixture.store.get('t:0'), 0, '尾段 T = 0');
});

test('@COM100：胆怯 ×2、感情淡薄 ×0.6；半阈值各档', async () => {
  const timid = seed_world();
  able_on(timid);
  timid.fixture.store.set('talent:31:10', 1);
  await run_com(timid, 100);
  assert.equal(timid.fixture.store.get('deltabase:31:0'), -600, '胆怯 ×2');

  const apathetic = seed_world();
  able_on(apathetic);
  apathetic.fixture.store.set('talent:31:22', 1);
  await run_com(apathetic, 100);
  assert.equal(
    apathetic.fixture.store.get('deltabase:31:0'),
    -180,
    '感情淡薄 ×0.6（floor(300*0.6)）',
  );

  const mid = seed_world();
  able_on(mid);
  mid.fixture.store.set('exp:31:55', 25); // < EXPLV:5/2=100 → ×0.80
  await run_com(mid, 100);
  assert.equal(
    mid.fixture.store.get('deltabase:31:0'),
    -80,
    'deltabase:31:0 半阈值 EXP:55=25 → ×0.80',
  );
});

test('@COM100：已开启 → B 走退出支，并清掉全部触手位', async () => {
  const world = seed_world();
  const { fixture } = world;
  able_on(world);
  fixture.store.set('tequip:31:90', 1);
  for (const bit of [11, 13, 14, 15, 16, 17, 44, 46, 98]) {
    fixture.store.set(`tequip:31:${bit}`, 1);
  }
  await run_com(world, 100);
  assert.ok(fixture.text_lines().some((l) => l.includes('回到原位')));
  assert.equal(fixture.store.get('tequip:31:90'), 0);
  for (const bit of [11, 13, 14, 15, 16, 17, 44, 46, 98]) {
    assert.equal(fixture.store.get(`tequip:31:${bit}`), 0, `清 TEQUIP:${bit}`);
  }
  assert.equal(fixture.store.get('deltabase:31:0') || 0, 0, '退出支不写损耗');
});

// —— JUMP 101-107 / 109 ——

test('@COM101：JUMP COM11 且不改写 SELECTCOM；目标未落地 → COM_MISSING', async () => {
  const world = seed_world();
  const result = await run_com(world, 101);
  assert.equal(result, world.COM_MISSING);
  assert.equal(world.era_flag.selectcom, 101, 'JUMP 不改写 SELECTCOM');
});

test('@COM106：JUMP COM44 落地时返回目标真身，SELECTCOM 仍是 106', async () => {
  const world = seed_world();
  const jumped = [];
  world.com_family.register(44, async () => {
    jumped.push(world.era_flag.selectcom);
    return 77;
  });
  const result = await run_com(world, 106);
  assert.equal(result, 77);
  assert.deepEqual(jumped, [106], '目标看到的 SELECTCOM 仍是触手指令号');
  assert.equal(world.era_flag.selectcom, 106);
});

test('@COM102/103/104/105/107/109：各自 JUMP 到 13/14/15/16/46/17', async () => {
  const targets = [
    [102, 13],
    [103, 14],
    [104, 15],
    [105, 16],
    [107, 46],
    [109, 17],
  ];
  for (const [com, dest] of targets) {
    const world = seed_world();
    const seen = [];
    world.com_family.register(dest, async () => {
      seen.push(dest);
      return 1;
    });
    assert.equal(await run_com(world, com), 1, `COM${com} → COM${dest}`);
    assert.deepEqual(seen, [dest]);
    assert.equal(world.era_flag.selectcom, com);
  }
});

// —— @COM108 ——

test('@COM108：侍奉精神/技巧分档、取反 TEQUIP:98、初吻直写 -1→999、口交经验门面', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('cflag:31:16', -1);
  fixture.store.set('abl:31:16', 0);
  fixture.store.set('abl:31:12', 0);
  const result = await run_com(world, 108);
  assert.equal(result, 1);
  assert.ok(fixture.text_lines().includes('触手口辱'));
  assert.ok(fixture.text_lines().includes('口交经验＋１'));
  assert.equal(fixture.store.get('deltabase:31:0'), -80);
  assert.equal(fixture.store.get('deltabase:31:1'), -100);
  // ABL:16=0 → SOURCE:4 += 200, A=100；ABL:12=0 → ×0.50 → SOURCE:4=100
  assert.equal(fixture.store.get('source:31:4'), 100);
  assert.equal(fixture.store.get('source:31:13'), 100);
  assert.equal(fixture.store.get('source:31:16'), 100);
  assert.equal(fixture.store.get('tequip:31:98'), 1);
  assert.equal((fixture.store.get('stain:31:0') || 0) & 6, 6, 'STAIN:0 |= 2|4');
  assert.equal(
    fixture.store.get('cflag:31:16'),
    999,
    '初吻直写（门面会吞 -1）',
  );
  assert.equal(fixture.store.get('tflag:13'), 1);
  assert.equal(fixture.store.get('exp:31:22'), 1);
  assert.equal(fixture.store.get('t:0'), 0);

  const off = await run_com(world, 108);
  assert.equal(off, 1);
  assert.equal(fixture.store.get('tequip:31:98'), 0, '再执行即关');
});

test('@COM108：CFLAG:16 非 -1 时不改初吻', async () => {
  const world = seed_world();
  world.fixture.store.set('cflag:31:16', 3);
  await run_com(world, 108);
  assert.equal(world.fixture.store.get('cflag:31:16'), 3);
  assert.equal(world.fixture.store.get('tflag:13'), undefined);
});

// —— @COM150 ——

test('@COM150：癖好名标题、SOURCE 分档、双方非男人 → 百合经验 +5', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('cstr:31:7', '尾巴');
  fixture.store.set('expname:40', '百合经验');
  fixture.store.set('abl:31:4', 0);
  fixture.store.set('abl:31:40', 0);
  const result = await run_com(world, 150);
  assert.equal(result, 1);
  assert.ok(fixture.text_lines().includes('尾巴调教'));
  assert.ok(fixture.text_lines().includes('百合经验+5'));
  assert.equal(fixture.store.get('deltabase:31:0'), -5);
  assert.equal(fixture.store.get('deltabase:31:1'), -50);
  assert.equal(fixture.store.get('source:31:18'), 20);
  assert.equal(fixture.store.get('source:31:8'), 30);
  assert.equal(fixture.store.get('source:31:12'), 100);
  assert.equal(fixture.store.get('exp:31:40'), 5);
});

test('@COM150：双方皆男人 → 断背经验 +5；局部中毒倍率', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('cstr:31:7', '嗅觉');
  fixture.store.set('expname:41', '断背经验');
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('abl:31:4', 3);
  fixture.store.set('abl:31:40', 4); // ×1.50
  await run_com(world, 150);
  assert.ok(fixture.text_lines().includes('断背经验+5'));
  assert.equal(fixture.store.get('exp:31:41'), 5);
  assert.equal(fixture.store.get('exp:31:40') || 0, 0);
  // ABL:4==3 → 1200；×1.50 → 1800
  assert.equal(fixture.store.get('source:31:18'), 1800);
});

// —— @COM208 ——

test('@COM208：気力有余 → COM_AFTER_ARENA 胜利收场，不进凌辱菜单', async () => {
  const world = seed_world({ load_colosseum: true });
  const { fixture } = world;
  able_on(world);
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:0', 1000);
  fixture.store.set('base:31:1', 500);
  fixture.store.set('maxbase:31:1', 1000);
  fixture.store.set('cflag:31:13', 30);
  fixture.store.set('cflag:31:14', 20);
  fixture.store.set('cflag:0:9', 10);
  const result = await run_com(world, 208);
  assert.equal(result, 1, 'RESULT==0 → RETURN 1 跳过菜单');
  assert.ok(fixture.text_lines().includes('触手'));
  assert.ok(fixture.text_lines().includes('斗技胜利经验+1'));
  assert.equal(fixture.store.get('tflag:400'), 208);
  assert.ok(!printed_buttons(fixture).includes('0:嘴巴'), '胜利不进菜单');
});

test('@COM208：陷落后菜单；JUMP COM31 未落地 → COM_MISSING；SELECTCOM 改写为 31', async () => {
  const world = seed_world({ load_colosseum: true });
  const { fixture } = world;
  able_on(world);
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 0);
  fixture.store.set('maxbase:31:1', 1000);
  fixture.store.set('cflag:0:9', 10);
  fixture.set_inputs(0);
  const result = await run_com(world, 208);
  assert.equal(result, world.COM_MISSING, 'COM31 未落地');
  assert.equal(world.era_flag.selectcom, 31, 'JUMP 前改写 SELECTCOM');
  const buttons = printed_buttons(fixture);
  assert.ok(buttons.includes('0:嘴巴'));
  assert.ok(buttons.includes('1:胸部'));
  assert.ok(buttons.includes('2:私处'));
  assert.ok(buttons.includes('3:肛门'));
  assert.ok(buttons.includes('999:暂时放过'));
});

test('@COM208：JUMP COM5 落地（胸爱抚已注册）返回子指令结果', async () => {
  const world = seed_world({ load_colosseum: true, load_caress: true });
  const { fixture } = world;
  able_on(world);
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('base:31:1', 0);
  fixture.store.set('maxbase:31:1', 1000);
  fixture.set_inputs(1);
  const result = await run_com(world, 208);
  assert.equal(result, 1, 'COM5 落地 RETURN 1');
  assert.equal(world.era_flag.selectcom, 5);
  assert.ok(fixture.text_lines().includes('胸爱抚'));
});

test('@COM208：男人不显示私处；999 暂时放过 → RETURN 1', async () => {
  const man = seed_world({ load_colosseum: true });
  able_on(man);
  man.fixture.store.set('tequip:31:55', 1);
  man.fixture.store.set('base:31:1', 0);
  man.fixture.store.set('maxbase:31:1', 1000);
  man.fixture.store.set('talent:31:122', 1);
  man.fixture.set_inputs(999);
  assert.equal(await run_com(man, 208), 1, '男人走暂时放过');
  assert.ok(!printed_buttons(man.fixture).includes('2:私处'), '男人不显示私处');

  const spare = seed_world({ load_colosseum: true });
  able_on(spare);
  spare.fixture.store.set('tequip:31:55', 1);
  spare.fixture.store.set('base:31:1', 0);
  spare.fixture.store.set('maxbase:31:1', 1000);
  spare.fixture.set_inputs(999);
  assert.equal(await run_com(spare, 208), 1, '暂时放过 RETURN 1');
});

test('@COM208：战斗点低于 10×魔王等级 → 追加伤害；否则打倒文本', async () => {
  const low = seed_world({ load_colosseum: true });
  able_on(low);
  low.fixture.store.set('tequip:31:55', 1);
  low.fixture.store.set('base:31:1', 500);
  low.fixture.store.set('maxbase:31:1', 1000);
  low.fixture.store.set('cflag:0:9', 10); // 门槛 100；无攻防 → 点按気力折减仍 < 100
  await run_com(low, 208);
  assert.ok(
    low.fixture.text_lines().some((l) => l.includes('手足无措')),
    '低战斗点追加伤害支',
  );
  // 开战 5/100 + 追加 10/200
  assert.equal(low.fixture.store.get('deltabase:31:0'), -15);
  assert.equal(low.fixture.store.get('deltabase:31:1'), -300);

  const high = seed_world({ load_colosseum: true });
  able_on(high);
  high.fixture.store.set('tequip:31:55', 1);
  high.fixture.store.set('base:31:1', 1000);
  high.fixture.store.set('maxbase:31:1', 1000);
  high.fixture.store.set('cflag:31:13', 80);
  high.fixture.store.set('cflag:31:14', 80);
  high.fixture.store.set('cflag:0:9', 1); // 门槛 10；攻防 160 > 10
  await run_com(high, 208);
  assert.ok(
    high.fixture
      .text_lines()
      .some(
        (l) =>
          l.includes('一下子就把触手打倒了') ||
          l.includes('一瞬间就把触手打倒了'),
      ),
    '高战斗点打倒支',
  );
});

// —— @EQUIP_COM100 / 108 ——

test('@EQUIP_COM100：半阈值（整档 EXPLV）缩放损耗、SOURCE 倍率、首次异常经验、T 收尾', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('source:31:0', 10);
  fixture.store.set('source:31:1', 10);
  fixture.store.set('source:31:2', 10);
  fixture.store.set('source:31:17', 10);
  fixture.store.set('source:31:13', 10);
  fixture.store.set('maxbase:0:4', 0); // 关闭射精检查，只验共同尾段
  const result = await world.equip_com_family.call(100);
  assert.equal(result, 1);
  assert.ok(fixture.text_lines().includes('＜触手调教中＞'));
  assert.ok(fixture.text_lines().includes('异常经验＋1'));
  assert.ok(
    fixture.text_lines().some((l) => l.includes('触手经验＋')),
    'PRINT 触手经验＋ PRINTVL T',
  );
  // EXP:55==0 < EXPLV:1 → A=300；LOSEBASE 300/600；UP:10=6000
  assert.equal(fixture.store.get('deltabase:31:0'), -300);
  assert.equal(fixture.store.get('deltabase:31:1'), -600);
  assert.equal(fixture.store.get('delta:31:10'), 6000);
  assert.equal(fixture.store.get('source:31:8'), 3000); // A*10
  assert.equal(fixture.store.get('source:31:14'), 1500); // A*5
  assert.equal(fixture.store.get('source:31:10'), 2000);
  assert.equal(fixture.store.get('source:31:0'), 20); // ×2
  assert.equal(fixture.store.get('source:31:13'), 18); // ×1.80
  assert.equal(fixture.store.get('exp:31:50'), 1);
  assert.equal(fixture.store.get('exp:31:55'), 1, 'T+=1 后 EXP:55 += T');
  assert.equal(fixture.store.get('t:0'), 0);
});

test('@EQUIP_COM100：MAXBASE:4 非 0 时射精检查写 TFLAG:15；大量射精走 E=2', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('maxbase:0:4', 100);
  fixture.store.set('base:0:4', 0);
  fixture.store.set('abl:31:12', 0); // B=500
  fixture.store.set('abl:31:10', 0); // ×0.80 → 400
  fixture.store.set('palam:31:5', 0);
  fixture.store.set('tequip:31:11', 1); // ×1.50 → 600；且写 TFLAG:38
  fixture.store.set('exp:31:55', 1); // 非首次，跳过异常经验
  await world.equip_com_family.call(100);
  assert.ok(fixture.text_lines().includes('触手大量射精'));
  assert.ok(fixture.text_lines().includes('精液经验＋３'));
  assert.equal(fixture.store.get('exp:31:20'), 3);
  assert.equal(fixture.store.get('tflag:15'), 2, 'tflag:15');
  assert.equal(fixture.store.get('tflag:38'), 2, '触手插入中大量射精');
  assert.equal(fixture.store.get('exp:31:50') || 0, 0, '非首次无异常经验');
  // T: 射精 +1 + 尾段 +1 = 2
  assert.equal(fixture.store.get('exp:31:55'), 3);
});

test('@EQUIP_COM108：喜欢精液减半损耗；侍奉分档与口交经验；T += 1 不清零', async () => {
  const world = seed_world();
  const { fixture } = world;
  fixture.store.set('talent:31:47', 1);
  fixture.store.set('abl:31:16', 0);
  fixture.store.set('abl:31:12', 0);
  fixture.store.set('t:0', 4);
  const result = await world.equip_com_family.call(108);
  assert.equal(result, 1);
  assert.ok(fixture.text_lines().includes('＜触手口辱中＞'));
  assert.ok(fixture.text_lines().includes('口交经验＋１'));
  assert.equal(fixture.store.get('deltabase:31:0'), -40);
  assert.equal(fixture.store.get('deltabase:31:1'), -60);
  assert.equal(fixture.store.get('source:31:4'), 100);
  assert.equal(fixture.store.get('exp:31:22'), 1);
  assert.equal(fixture.store.get('t:0'), 5, 'EQUIP_COM108 只累加 T，不清零');
});

// —— TRAIN_MESSAGE_B 100-109 / 150 ——

test('@TRAIN_MESSAGE_B100：zooko 着装走特别服装名，不拼「将身体」', async () => {
  const world = seed_world();
  world.fixture.store.set('cflag:31:42', 11);
  world.fixture.store.set('cflag:31:40', 64);
  await run_b(world, 100);
  const lines = world.fixture.text_lines();
  assert.ok(
    lines.some(
      (l) => l.includes('你操控着异形的触手、') && l.includes('史莱姆'),
    ),
    'zooko 前缀拼进同一行',
  );
  assert.ok(lines.some((l) => l.includes('缠上了')));
  assert.ok(!lines.some((l) => l.includes('将温妮的身体')));
});

test('@TRAIN_MESSAGE_B101-109：进入/退出各号独有文本；zooko 前缀同一行', async () => {
  const cases = [
    [
      101,
      11,
      '覆盖着细微突起的触手、钻入了温妮的性器里。',
      '触手从温妮的性器里拔出来了……',
    ],
    [
      102,
      13,
      '又长又粗的触手、钻入了温妮的肛门里。',
      '触手从温妮的肛门里拔出来了……',
    ],
    [
      103,
      14,
      '末端有着细细分支的触手、蹂躏着温妮的阴蒂。',
      '触手中止了蹂躏温妮的阴蒂……',
    ],
    [
      104,
      15,
      '细细而蠢蠢欲动的触手、开始玩弄着温妮的乳头。',
      '触手离开了温妮的乳头……',
    ],
    [
      105,
      16,
      '带吸盘的触手、正在温妮的乳头上用力吸啜着。',
      '触手放开了温妮的乳头……',
    ],
    [106, 44, '无数的触手、把温妮的身体捆起来了。', '触手解开了对温妮的束缚……'],
    [
      107,
      46,
      '极粗的触手、捅进了温妮的尻穴、注入了液体。',
      '触手拔出来之后、温妮的肛门里飞散出污物……',
    ],
    [
      108,
      98,
      '湿润水亮的触手、侵入了温妮的嘴巴里。',
      '触手从温妮的嘴里出来了……',
    ],
    [
      109,
      17,
      '带着恶心肉瘤的触手、卷起了温妮的阴茎、一起开始撸着。',
      '触手放开温妮的阴茎了……',
    ],
  ];
  for (const [com, bit, enter, leave] of cases) {
    const on = seed_world();
    await run_b(on, com);
    assert.ok(on.fixture.text_lines().includes(enter), `B${com} 进入`);

    const off = seed_world();
    off.fixture.store.set(`tequip:31:${bit}`, 1);
    await run_b(off, com);
    assert.ok(off.fixture.text_lines().includes(leave), `B${com} 退出`);

    const zoo = seed_world();
    zoo.fixture.store.set('cflag:31:42', 11);
    zoo.fixture.store.set('cflag:31:40', 64);
    await run_b(zoo, com);
    assert.ok(
      zoo.fixture
        .text_lines()
        .some((l) => l.includes('成群的触手通过史莱姆的缝隙伸进去了、')),
      `B${com} zooko 前缀`,
    );
  }
});

test('@TRAIN_MESSAGE_B150：嗅觉 / 腋 / 其它癖好三支；拼在「向」之后同一行', async () => {
  const smell = seed_world();
  smell.fixture.store.set('cstr:31:7', '嗅觉');
  await run_b(smell, 150);
  assert.ok(
    smell.fixture
      .text_lines()
      .some((l) => l.includes('你向温妮坚持不懈地熏陶着那个味道')),
  );

  const armpit = seed_world();
  armpit.fixture.store.set('cstr:31:7', '腋');
  await run_b(armpit, 150);
  assert.ok(
    armpit.fixture
      .text_lines()
      .some((l) => l.includes('你向温妮的侧胸不断地爱抚着、并舔起了腋下')),
  );

  const other = seed_world();
  other.fixture.store.set('cstr:31:7', '尾巴');
  await run_b(other, 150);
  assert.ok(
    other.fixture.text_lines().some((l) => l.includes('你向尾巴调教开始了')),
  );
});

test('@TRAIN_MESSAGE_B208 与 A 100-109/208：源侧无分支，注册显式无操作（不得出占位行）', async () => {
  const world = seed_world();
  await run_b(world, 208);
  await run_a(world, 100);
  await run_a(world, 108);
  await run_a(world, 208);
  assert.ok(
    !world.fixture.text_lines().some((l) => l.includes('尚未移植')),
    '显式无操作压掉分发骨架占位行',
  );
});

// —— TRAIN_MESSAGE_A 150 + TFLAG:15 公共头 ——

test('@TRAIN_MESSAGE_A150：F 中毒 / F 感觉分档；嗅觉与其它癖好各一支', async () => {
  const high = seed_world();
  high.fixture.store.set('cstr:31:7', '尾巴');
  high.fixture.store.set('abl:31:40', 5);
  await run_a(high, 150);
  assert.ok(
    high.fixture
      .text_lines()
      .includes('温妮被尾巴带来的快乐所扰乱、口水不断的从嘴角流了出来…'),
  );

  const smell = seed_world();
  smell.fixture.store.set('cstr:31:7', '嗅觉');
  smell.fixture.store.set('abl:31:40', 0);
  smell.fixture.store.set('abl:31:4', 0);
  await run_a(smell, 150);
  assert.ok(smell.fixture.text_lines().includes('温妮对嗅觉调教十分厌恶…'));
});

test('A 公共头 TFLAG:15 非死斗场触手两臂：源侧 SIF + ELSEIF 双重打印', async () => {
  const world = seed_world();
  const { fixture } = world;
  const { train_message_a } = fixture.load_module('system/train/train-message');
  world.era_flag.selectcom = 100;

  fixture.store.set('tflag:15', 1);
  await train_message_a();
  const once = fixture
    .text_lines()
    .filter((l) => l === '温妮身上的触手、吐出了体液…');
  assert.equal(once.length, 2, ':113-125 SIF 与 :143-145 ELSEIF 各打一次');

  fixture.store.set('tflag:15', 2);
  await train_message_a();
  const mass = fixture
    .text_lines()
    .filter((l) => l === '温妮全身上的触手、一起吐出了大量的体液…');
  assert.equal(mass.length, 2, '大量射精同样双重打印');
});

test('A 公共头：死斗场中触手臂不落（SIF 要求 TEQUIP:55 != 1，IF 链被死斗场臂消费）', async () => {
  const world = seed_world({ load_colosseum: true });
  const { fixture } = world;
  const { train_message_a } = fixture.load_module('system/train/train-message');
  fixture.store.set('tequip:31:55', 1);
  fixture.store.set('tflag:15', 1);
  world.era_flag.selectcom = 21;
  await train_message_a();
  assert.ok(
    fixture.text_lines().includes('温妮的私处里、被灌入了怪物黏黏糊糊的精液…'),
  );
  assert.ok(!fixture.text_lines().some((l) => l.includes('触手、吐出了体液')));
});

// —— @SYOKUSYU_MILK ——

test('@SYOKUSYU_MILK：B 感度≥5 且无母乳/贫乳/绝壁/男人 → 获得母乳体质', async () => {
  const world = seed_world();
  const { fixture } = world;
  const { syokusyu_milk } = fixture.load_module('system/train/com-tentacle');
  fixture.store.set('abl:31:1', 5);
  const result = await syokusyu_milk();
  assert.equal(result, 1);
  assert.equal(fixture.store.get('talent:31:130'), 1, 'talent:31:130');
  assert.ok(fixture.text_lines().some((l) => l.includes('流出了母乳')));
  assert.ok(fixture.text_lines().some((l) => l.includes('获得了【母乳体质】')));
});

test('@SYOKUSYU_MILK：贫乳 / 已有母乳体质 / 感度不足 各挡一条', async () => {
  const blocked = async (setup) => {
    const world = seed_world();
    world.fixture.store.set('abl:31:1', 5);
    setup(world.fixture);
    const { syokusyu_milk } = world.fixture.load_module(
      'system/train/com-tentacle',
    );
    await syokusyu_milk();
    return world.fixture;
  };
  const poor = await blocked((f) => f.store.set('talent:31:109', 1));
  assert.equal(poor.store.get('talent:31:130') || 0, 0);
  const has = await blocked((f) => f.store.set('talent:31:130', 1));
  assert.ok(!has.text_lines().some((l) => l.includes('流出了母乳')));
  const low = seed_world();
  low.fixture.store.set('abl:31:1', 4);
  const { syokusyu_milk } = low.fixture.load_module(
    'system/train/com-tentacle',
  );
  await syokusyu_milk();
  assert.equal(low.fixture.store.get('talent:31:130') || 0, 0);
});

// —— 接线 ——

test('主启动图注册触手系：COM100 与 COM_ABLE100 可由主循环侧的 require 发现', async () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { com_family, com_able_family } = fixture.load_module(
    'system/train/com-family',
  );
  assert.equal(com_family.has(100), true, 'COM100 必须经主启动图注册');
  assert.equal(
    com_able_family.has(100),
    true,
    'COM_ABLE100 必须经主启动图注册',
  );
  assert.equal(com_family.has(150), true);
  assert.equal(com_family.has(208), true);
});
