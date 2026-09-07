/**
 * MAGIC.ERB 十八个函数的行为测试（issue #343，阶段 5a L12）。
 *
 * 缝 = ere/dungeon/magic.js 的导出函数与 dungeon-battle 的公开导出；
 * 随机源显式注入，状态与输出只通过 era API 夹具观察。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load_world() {
  const fixture = create_era_fixture();
  for (const [cid, name] of [
    [0, '魔王'],
    [1, '阿尔'],
    [2, '贝丝'],
    [3, '希尔'],
  ]) {
    fixture.seed_chara(cid, { id: cid, name, callname: name });
    fixture.era.addCharacter(cid);
    fixture.store.set(`base:${cid}:0`, 1000);
    fixture.store.set(`base:${cid}:1`, 1000);
    fixture.store.set(`maxbase:${cid}:0`, 1000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`cflag:${cid}:9`, 9);
    fixture.store.set(`cflag:${cid}:11`, 100);
    fixture.store.set(`cflag:${cid}:12`, 100);
  }
  fixture.store.set('itemname:100', '狗头人');
  return { fixture, magic: fixture.load_module('dungeon/magic') };
}

function seq(...values) {
  let index = 0;
  return (n) => {
    const value = values[index++] ?? 0;
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

function set_values(fixture, values) {
  for (const [key, value] of Object.entries(values)) {
    fixture.store.set(key, value);
  }
}

function prepare_spell_case(fixture) {
  set_values(fixture, {
    'e:100': 100,
    'e:101': 5,
    'e:102': 100,
    'e:103': 10,
    'e:106': 3,
    'e:108': 0,
    'e:199': 5,
    'cflag:1:13': 100,
    'cflag:1:14': 100,
    'cflag:2:13': 100,
    'cflag:2:14': 100,
    'cflag:1:130': -1,
    'cflag:2:130': -1,
    'exp:0:80': 100,
    'exp:1:80': 100,
    'exp:2:80': 100,
  });
}

test('MAGIC_DAMAGE_CAP 按等级差调整上限，并把非正伤害抬到 1', () => {
  const { magic } = load_world();
  assert.equal(magic.magic_damage_cap(1, 200, 1000, 300), 3);
  assert.equal(magic.magic_damage_cap(20, 10, 1000, 300), 330);
  assert.equal(magic.magic_damage_cap(10, 10, -20, 300), 1);
});

test('三类 MAGIC_BONUS 保留种族、Boss、耐性与魔法减益的逐步整数补正', () => {
  const { fixture, magic } = load_world();
  fixture.store.set('talent:1:314', 1);
  fixture.store.set('talent:1:244', 1);
  fixture.store.set('talent:1:260', 1);
  fixture.store.set('cflag:1:130', 100);
  fixture.store.set('cflag:1:131', 6);
  fixture.store.set('e:100', 100);
  fixture.store.set('e:108', 1);
  assert.equal(magic.magic_bonus_c_to_m(1, 300, 100), 7);

  fixture.store.set('talent:2:257', 1);
  fixture.store.set('talent:2:253', 1);
  fixture.store.set('cflag:2:682', 40);
  assert.equal(magic.magic_bonus_m_to_c(2, 300, 100), 336);
  assert.equal(fixture.store.get('cflag:2:682'), 35);

  fixture.store.set('cflag:1:682', 60);
  assert.equal(magic.magic_bonus_c_to_c(1, 300, 2), 720);
  assert.equal(fixture.store.get('cflag:1:682'), 53);
});

test('MAGIC_SELECT 与 SHAMAN_SELECT：职业门槛、暴走伤害、怪物固定法术和映射', async () => {
  const { fixture, magic } = load_world();
  fixture.store.set('talent:1:241', 1);
  fixture.store.set('talent:1:250', 1);
  fixture.store.set('cflag:1:503', 2);
  assert.equal(await magic.magic_select(1, 1, 100, seq(4)), 4);
  assert.equal(fixture.store.get('base:1:0'), 710);
  assert.equal(fixture.store.get('base:1:1'), 720);
  assert.equal(await magic.shaman_select(1, 1, 100, seq(2)), 7);

  fixture.store.set('e:106', 5);
  assert.equal(await magic.magic_select(2, 1, 100, seq()), 5);
  fixture.store.set('talent:1:241', 0);
  assert.equal(await magic.magic_select(1, 1, 100, seq()), 0);

  const bounds = [];
  const record_bound = (n) => {
    bounds.push(n);
    return 0;
  };
  assert.equal(await magic.magic_select(0, 1, 2, record_bound), 0);
  assert.equal(await magic.shaman_select(0, 1, 2, record_bound), 0);
  assert.deepEqual(
    bounds,
    [2, 2],
    '缺省 TARGET_TYPE 的局部 MAGIC_LV 从 0 起算',
  );
});

test('MAGIC 调度怪物的魔法箭并接入 dungeon-battle，MAGIC 不再登记为存根', async () => {
  const { fixture, magic } = load_world();
  fixture.store.set('e:1', 5);
  fixture.store.set('e:6', 3);
  const result = await magic.magic(2, 1, 0, seq());
  assert.equal(result, 0);
  // CFLAG:130 与怪物号都缺省 0，原作的 >= 0 畏怖臂会给 1.2 倍增伤。
  assert.equal(fixture.store.get('base:1:0'), 916);

  const battle = fixture.load_module('dungeon/dungeon-battle');
  assert.equal(battle.STUBBED_CALLS.includes('MAGIC'), false);
  assert.equal(battle.magic, magic.magic);
});

test('DUNGEON_BATLLE2 的无参 MAGIC 保留 TARGET_TYPE=0，并显式传递原作交换后的 A/B', async () => {
  const { fixture } = load_world();
  const battle = fixture.load_module('dungeon/dungeon-battle');
  const calls = [];
  battle.magic = async (...args) => {
    calls.push(args.slice(0, 3));
    return 999;
  };
  const battle2 = fixture.load_module('dungeon/dungeon-battle2');

  assert.equal(await battle2.duel_attack(1, 0, 2, 0, seq()), 999);
  assert.equal(await battle2.duel_attack(1, 0, 2, 1, seq()), 999);
  assert.deepEqual(calls, [
    [0, 2, 1],
    [0, 1, 2],
  ]);
});

test('TARGET_TYPE=0 的完整 MAGIC 调度按 ERB 未命中任何法术分支，状态零变化', async () => {
  const { fixture, magic } = load_world();
  assert.equal(await magic.magic(0, 1, 2, seq(1, 1, 1)), 0);
  assert.equal(fixture.store.get('base:1:0'), 1000);
  assert.equal(fixture.store.get('base:1:1'), 1000);
  assert.equal(fixture.store.get('base:2:0'), 1000);
  assert.equal(fixture.store.get('base:2:1'), 1000);
});

test('TELEPORT_MAGIC：重伤队伍写回侵攻度；勇者对奴隶走 train 域的原作 CFLAG:3', async () => {
  const { fixture, magic } = load_world();
  fixture.store.set('base:1:0', 600);
  const move = { d20: 50 };
  assert.equal(await magic.teleport_magic(1, 1, 100, seq(77), move), 999);
  assert.equal(move.d20, 77);
  assert.equal(fixture.store.get('base:1:1'), 990);

  fixture.store.set('base:2:0', 600);
  assert.equal(await magic.teleport_magic(3, 1, 2, seq(41), move), 999);
  assert.equal(fixture.store.get('cflag:2:3'), 41);
});

test('SLEEP_MAGIC、CURSE_MAGIC：对人格斗分别削攻击与防御', async () => {
  const { fixture, magic } = load_world();
  await magic.sleep_magic(3, 1, 2, seq(8));
  assert.equal(fixture.store.get('cflag:1:11'), 92);

  await magic.curse_magic(4, 1, 2, seq(8));
  assert.equal(fixture.store.get('cflag:2:12'), 96);
});

test('ENERGY_BOLT_MAGIC 与 FIREBALL_MAGIC：角色法术造成伤害并消灭怪物', async () => {
  const { fixture, magic } = load_world();
  await magic.energy_bolt_magic(4, 1, 2);
  assert.equal(fixture.store.get('base:2:0'), 955);

  fixture.store.set('e:1', 1);
  fixture.store.set('cflag:1:9', 200);
  fixture.store.set('cflag:1:130', -1);
  await magic.fireball_magic(2, 1, 0);
  assert.equal(
    fixture.store.get('base:1:0'),
    992,
    '怪物火球同样受等级差伤害上限约束',
  );

  fixture.store.set('e:1', 1);
  fixture.store.set('e:3', 1);
  fixture.store.set('e:99', 1);
  fixture.store.set('cflag:1:9', 20);
  fixture.store.set('cflag:1:130', -1);
  await magic.energy_bolt_magic(1, 1, 0);
  assert.equal(
    fixture.store.get('e:99'),
    -99,
    '魔法箭保留原作未压缩 KILL_MONS 的负怪物数缺陷',
  );
  assert.equal(fixture.store.get('exp:1:80'), 100);

  const output = [];
  fixture.era.printAndWait = async (text) => output.push(text);
  fixture.store.set('flag:5', 32);
  fixture.store.set('e:1', 1);
  fixture.store.set('e:3', 1);
  fixture.store.set('e:99', 1);
  fixture.store.set('cflag:1:9', 20);
  fixture.store.set('cflag:1:130', -1);
  await magic.fireball_magic(1, 1, 0);
  assert.equal(fixture.store.get('e:99'), 0);
  assert.equal(fixture.store.get('exp:1:80'), 101);
  assert(output.includes('火球术烧尽了1只怪物！'), '过量击杀按现存怪物数播报');
});

test('ENERGY_DRAIN_MAGIC 与 MIND_DRAIN_MAGIC：对人格斗按原作回复体力或气力', async () => {
  const { fixture, magic } = load_world();
  await magic.energy_drain_magic(4, 1, 2);
  assert.equal(fixture.store.get('base:2:1'), 955);
  assert.equal(fixture.store.get('base:1:0'), 1045);

  await magic.mind_drain_magic(3, 1, 2);
  assert.equal(fixture.store.get('base:1:1'), 925);
  assert.equal(fixture.store.get('base:2:1'), 970);
});

test('HEAL_MAGIC 选择队伍中最后一个重伤成员；SHIELD_MAGIC 保留无参局部变量的无效果语义', async () => {
  const { fixture, magic } = load_world();
  fixture.store.set('base:1:0', 500);
  fixture.store.set('base:2:0', 400);
  fixture.store.set('base:3:0', 300);
  fixture.store.set('cflag:1:531', 2);
  fixture.store.set('cflag:1:532', 3);
  await magic.heal_magic(1, 1, 100);
  assert.equal(fixture.store.get('base:1:0'), 500);
  assert.equal(fixture.store.get('base:2:0'), 400);
  assert.equal(fixture.store.get('base:3:0'), 345);
  assert.equal(await magic.shield_magic(), 0);
  assert.equal(fixture.store.get('cflag:1:12'), 100);
});

test('LV_DRAIN_MAGIC：怪物吸取经验时同步等级四维，并把一半经验给魔王', async () => {
  const { fixture, magic } = load_world();
  fixture.store.set('e:1', 12);
  fixture.store.set('exp:1:80', 5);
  fixture.store.set('exp:0:80', 10);
  fixture.store.set('cflag:1:13', 100);
  fixture.store.set('cflag:1:14', 100);
  await magic.lv_drain_magic(2, 1, 0);
  assert.equal(fixture.store.get('cflag:1:9'), 8);
  assert.equal(fixture.store.get('cflag:1:11'), 99);
  assert.equal(fixture.store.get('cflag:1:12'), 99);
  assert.equal(fixture.store.get('cflag:1:13'), 99);
  assert.equal(fixture.store.get('cflag:1:14'), 99);
  assert.equal(fixture.store.get('exp:0:80'), 16);
});

test('四个魔法数值函数按种族、耐性、Boss、畏怖与减益阈值分档', () => {
  const cases = [
    {
      label: '伤害封顶：等级差恰为 -100 时保留百分之一',
      call: (magic) => magic.magic_damage_cap(1, 101, 100, 300),
      expected: 3,
    },
    {
      label: '角色对怪物：精灵、青肌与额头眼逐步整数加成',
      setup: { 'talent:1:314': 1, 'talent:1:244': 1, 'talent:1:260': 1 },
      call: (magic) => magic.magic_bonus_c_to_m(1, 300, 100),
      expected: 720,
    },
    {
      label: '角色对怪物：畏怖计数 6 进入无法反抗的十分之一档',
      setup: { 'cflag:1:130': 100, 'cflag:1:131': 6 },
      call: (magic) => magic.magic_bonus_c_to_m(1, 300, 100),
      expected: 30,
    },
    {
      label: '角色对怪物：Boss 抵抗到十分之一',
      setup: { 'e:108': 1 },
      call: (magic) => magic.magic_bonus_c_to_m(1, 300, 100),
      expected: 30,
    },
    {
      label: '怪物对角色：魔法耐性与褐色肌逐步减伤',
      setup: { 'talent:1:257': 1, 'talent:1:253': 1 },
      call: (magic) => magic.magic_bonus_m_to_c(1, 300, 100),
      expected: 160,
    },
    {
      label: '怪物对角色：魔法减益 50 仍走百分比档并衰减到 44',
      setup: { 'cflag:1:682': 50 },
      call: (magic) => magic.magic_bonus_m_to_c(1, 300, 100),
      expected: 450,
      after: { 'cflag:1:682': 44 },
    },
    {
      label: '怪物对角色：魔法减益 51 进入封顶五成档并衰减到 45',
      setup: { 'cflag:1:682': 51 },
      call: (magic) => magic.magic_bonus_m_to_c(1, 300, 100),
      expected: 450,
      after: { 'cflag:1:682': 45 },
    },
    {
      label: '怪物对角色：畏怖计数 6 倍增伤害',
      setup: { 'cflag:1:130': 100, 'cflag:1:131': 6 },
      call: (magic) => magic.magic_bonus_m_to_c(1, 300, 100),
      expected: 600,
    },
    {
      label: '角色对角色：目标耐性与施法者褐色肌逐步减伤',
      setup: { 'talent:2:257': 1, 'talent:1:253': 1 },
      call: (magic) => magic.magic_bonus_c_to_c(1, 300, 2),
      expected: 160,
    },
    {
      label: '角色对角色：无目标时不消费施法者的魔法减益',
      setup: { 'cflag:1:682': 60 },
      call: (magic) => magic.magic_bonus_c_to_c(1, 300, -1),
      expected: 300,
      after: { 'cflag:1:682': 60 },
    },
  ];

  for (const { label, setup = {}, call, expected, after = {} } of cases) {
    const { fixture, magic } = load_world();
    prepare_spell_case(fixture);
    set_values(fixture, setup);
    assert.equal(call(magic), expected, label);
    for (const [key, value] of Object.entries(after)) {
      assert.equal(fixture.store.get(key), value, `${label}：${key}`);
    }
  }
});

test('MAGIC_SELECT/SHAMAN_SELECT 按目标类型分派，怪物咒术不掷随机数', async () => {
  const { fixture, magic } = load_world();
  prepare_spell_case(fixture);
  fixture.store.set('talent:1:241', 1);
  fixture.store.set('talent:1:250', 1);
  fixture.store.set('talent:2:241', 1);
  fixture.store.set('talent:2:250', 1);

  const selected = [];
  for (const target_type of [1, 3, 4]) {
    const b = target_type === 1 ? 100 : 2;
    selected.push(await magic.magic_select(target_type, 1, b, seq(4)));
    selected.push(await magic.shaman_select(target_type, 1, b, seq(2)));
  }
  assert.deepEqual(selected, [4, 7, 4, 7, 4, 7]);

  let random_calls = 0;
  assert.equal(
    await magic.shaman_select(2, 1, 100, () => {
      random_calls += 1;
      return 1;
    }),
    0,
  );
  assert.equal(
    random_calls,
    0,
    '怪物目标的 SHAMAN_SELECT 必须在随机分派前返回',
  );
});

test('十个法术按 target_type 命中施法者、对象与怪物列', async () => {
  const cases = [
    {
      label: '传送 1：勇者队伍写侵攻度',
      spell: 'teleport_magic',
      type: 1,
      setup: { 'base:1:0': 600 },
      random: [7],
      result: 999,
      expected: { 'base:1:1': 990 },
      d20: 7,
    },
    {
      label: '传送 2：怪物传送写迷惑与侵攻度',
      spell: 'teleport_magic',
      type: 2,
      random: [7],
      result: 999,
      expected: { 'cflag:1:509': 1 },
      d20: 7,
    },
    {
      label: '传送 3：奴隶重伤写原作 CFLAG:3',
      spell: 'teleport_magic',
      type: 3,
      setup: { 'base:2:0': 600 },
      random: [7],
      result: 999,
      expected: { 'base:2:1': 990, 'cflag:2:3': 7 },
    },
    {
      label: '传送 4：角色侧仍检查 A 的队伍',
      spell: 'teleport_magic',
      type: 4,
      setup: { 'base:1:0': 600 },
      random: [7],
      result: 999,
      expected: { 'base:1:1': 990 },
      d20: 7,
    },
    ...[1, 2, 3, 4].map((type) => ({
      label: `睡眠 ${type}：睡眠按目标类型命中攻击力槽`,
      spell: 'sleep_magic',
      type,
      random: [7],
      expected:
        type === 1
          ? { 'e:102': 93, 'base:1:1': 970 }
          : type === 2
            ? { 'cflag:1:11': 93 }
            : type === 3
              ? { 'cflag:1:11': 93, 'base:2:1': 970 }
              : { 'cflag:2:11': 93, 'base:1:1': 970 },
    })),
    ...[1, 2, 3, 4].map((type) => ({
      label: `魔法箭 ${type}：魔法箭按目标类型命中体力槽`,
      spell: 'energy_bolt_magic',
      type,
      expected:
        type === 1
          ? { 'e:199': 1, 'exp:1:80': 120, 'base:1:1': 985 }
          : type === 2
            ? { 'base:1:0': 930 }
            : type === 3
              ? { 'base:1:0': 955, 'base:2:1': 985 }
              : { 'base:2:0': 955, 'base:1:1': 985 },
    })),
    {
      label: '魔法吸收 0：未知目标不命中角色',
      spell: 'energy_drain_magic',
      type: 0,
      expected: { 'base:1:0': 1000, 'base:2:1': 1000 },
    },
    ...[1, 2, 3, 4].map((type) => ({
      label: `魔法吸收 ${type}：按目标回复施法者体力或削对象气力`,
      spell: 'energy_drain_magic',
      type,
      expected:
        type === 1
          ? { 'e:199': 1, 'exp:1:80': 120, 'base:1:0': 1045, 'base:1:1': 970 }
          : type === 2
            ? { 'base:1:1': 930 }
            : type === 3
              ? { 'base:1:1': 955, 'base:2:0': 1045, 'base:2:1': 970 }
              : { 'base:2:1': 955, 'base:1:0': 1045, 'base:1:1': 970 },
    })),
    ...[1, 2, 3, 4].map((type) => ({
      label: `火球 ${type}：按目标类型伤害角色或怪物群`,
      spell: 'fireball_magic',
      type,
      expected:
        type === 1
          ? { 'e:199': 3, 'exp:1:80': 110, 'base:1:1': 960 }
          : type === 2
            ? { 'base:1:0': 860 }
            : type === 3
              ? { 'base:1:0': 910, 'base:2:1': 960 }
              : { 'base:2:0': 910, 'base:1:1': 960 },
    })),
    ...[1, 2, 3, 4].map((type) => ({
      label: `治疗 ${type}：按目标类型治疗队伍、怪物列或奴隶`,
      spell: 'heal_magic',
      type,
      setup: type === 1 || type === 4 ? { 'base:1:0': 500 } : {},
      expected:
        type === 1 || type === 4
          ? { 'base:1:0': 545, 'base:1:1': 995 }
          : type === 2
            ? { 'e:103': 11 }
            : { 'base:2:0': 1045, 'base:2:1': 995 },
    })),
    ...[1, 2, 3, 4].map((type) => ({
      label: `护盾 ${type}：无参私有 TARGET_TYPE 使各调用值都无效`,
      spell: 'shield_magic',
      type,
      expected: { 'cflag:1:12': 100, 'e:103': 10 },
    })),
    ...[1, 2, 3, 4].map((type) => ({
      label: `诅咒 ${type}：按目标类型削防御槽`,
      spell: 'curse_magic',
      type,
      random: [8],
      expected:
        type === 1
          ? { 'e:103': 6, 'base:1:1': 970 }
          : type === 2
            ? { 'cflag:1:12': 96 }
            : type === 3
              ? { 'cflag:1:12': 96, 'base:2:1': 970 }
              : { 'cflag:2:12': 96, 'base:1:1': 970 },
    })),
    ...[1, 2, 3, 4].map((type) => ({
      label: `精神吸收 ${type}：按目标削气力并回复施法者气力`,
      spell: 'mind_drain_magic',
      type,
      expected:
        type === 1
          ? { 'e:199': 1, 'exp:1:80': 120, 'base:1:1': 1015 }
          : type === 2
            ? { 'base:1:1': 930 }
            : type === 3
              ? { 'base:1:1': 955, 'base:2:1': 1015 }
              : { 'base:2:1': 955, 'base:1:1': 1015 },
    })),
    ...[1, 2, 3, 4].map((type) => ({
      label: `经验吸取 ${type}：按目标削经验与体力并给施法者经验`,
      spell: 'lv_drain_magic',
      type,
      expected:
        type === 1
          ? { 'e:199': 0, 'exp:1:80': 129, 'base:1:1': 950 }
          : type === 2
            ? { 'exp:1:80': 86, 'base:1:0': 860, 'exp:0:80': 107 }
            : type === 3
              ? {
                  'exp:1:80': 91,
                  'base:1:0': 910,
                  'exp:2:80': 104,
                  'base:2:1': 950,
                }
              : {
                  'exp:2:80': 91,
                  'base:2:0': 910,
                  'exp:1:80': 104,
                  'base:1:1': 950,
                },
    })),
  ];

  for (const {
    label,
    spell,
    type,
    setup = {},
    random = [],
    result = 0,
    expected,
    d20,
  } of cases) {
    const { fixture, magic } = load_world();
    prepare_spell_case(fixture);
    set_values(fixture, setup);
    const move_ctx = { d20: 50 };
    const b = type === 1 || type === 2 ? 100 : 2;
    assert.equal(
      await magic[spell](type, 1, b, seq(...random), move_ctx),
      result,
      label,
    );
    for (const [key, value] of Object.entries(expected)) {
      assert.equal(fixture.store.get(key), value, `${label}：${key}`);
    }
    if (d20 !== undefined) {
      assert.equal(move_ctx.d20, d20, `${label}：D:20`);
    }
  }
});
