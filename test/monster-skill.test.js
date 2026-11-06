/**
 * 怪物技能四个函数的行为测试（issue #345，阶段 5a L14）。
 *
 * 测试注入点 = ere/system/dungeon/monster-skill.js 的公开出口与
 * test/helpers/era-fixture.js。
 * RAND 经函数参数注入，所有行为用例都使用确定性 seq。
 *
 * 使用者有两类：普通怪物（列号 → 战斗状态的那一列）与精英部下（角色号 →
 * chara 域）。精英的攻防与等级只认角色自己那一份，用例因此既断言增益落在
 * 哪个单元，也断言战斗列一个槽都没动（#935）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('system/dungeon/monster-skill');
}

function seq(...values) {
  let index = 0;
  return (n) => {
    const value = values[Math.min(index, values.length - 1)] ?? 0;
    index += 1;
    return Math.min(value, Math.max(n - 1, 0));
  };
}

function setup() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  fixture.era.addCharacter(2);
  fixture.store.set('base:1:0', 2000);
  fixture.store.set('base:1:1', 1000);
  fixture.store.set('cflag:1:2', 10);
  fixture.store.set('cflag:1:9', 5);
  fixture.store.set('cflag:1:11', 80);
  fixture.store.set('cflag:1:12', 70);
  fixture.store.set('exp:1:80', 100);
  fixture.store.set('cflag:0:9', 10);
  fixture.store.set('callname:1:-1', '阿尔');
  fixture.store.set('callname:2:-1', '贝丝');
  // 防御怪物列 0：识别号 100、等级 20、攻防 30/40。
  fixture.battle('DEFENSE_1').id = 100;
  fixture.battle('DEFENSE_1').level = 20;
  fixture.battle('DEFENSE_1').attack = 30;
  fixture.battle('DEFENSE_1').defense = 40;
  fixture.store.set('itemname:100', '狗头人');
  return fixture;
}

/**
 * 断言键：`store` 地址，或 `battle:列名:字段`。战斗状态自 #883 起是普通对象
 * （不经引擎变量表），没有 store 地址可读。
 */
function read(fixture, key) {
  const battle = /^battle:(\w+):(\w+)$/.exec(key);
  return battle ? fixture.battle(battle[1])[battle[2]] : fixture.store.get(key);
}

test('公开怪物技能四个函数', () => {
  const fixture = create_era_fixture();
  assert.deepEqual(Object.keys(load(fixture)).sort(), [
    'monster_room_skill',
    'monster_skill',
    'slave_monster_skill',
    'use_monster_skill',
  ]);
});

test('monster_skill：三分之一不发动；粘液捕获按未强化等级扣气力', async () => {
  const fixture = setup();
  const { monster_skill } = load(fixture);

  assert.equal(await monster_skill(1, 1, 0, seq(0)), 0);
  assert.equal(fixture.store.get('base:1:1'), 1000);

  assert.equal(await monster_skill(1, 1, 0, seq(1)), 0);
  assert.equal(fixture.store.get('base:1:1'), 970, 'E 等级 20 + 魔王等级 10');
});

test('monster_skill：十八种技能逐项改变既定的数值', async () => {
  const cases = [
    [1, 'base:1:1', 970],
    [2, 'base:1:0', 1970],
    [3, 'cflag:1:11', 73],
    [4, 'cflag:1:12', 63],
    [5, 'battle:DEFENSE_1:defense', 42],
    [6, 'battle:DEFENSE_1:defense', 43],
    [7, 'battle:DEFENSE_1:defense', 45],
    [8, 'cflag:1:509', 1],
    [9, 'base:1:0', 1933],
    [10, 'cflag:1:11', 70],
    [11, 'cflag:1:2', 14],
    [12, 'base:1:1', 933],
    [13, 'exp:1:80', 55],
    [14, 'base:1:0', 1933],
    [15, 'battle:DEFENSE_1:defense', 44],
    [16, 'base:1:0', 1955],
    [17, 'base:1:1', 940],
    [18, 'battle:DEFENSE_1:defense', 42],
  ];

  for (const [skill, key, expected] of cases) {
    const fixture = setup();
    fixture.store.set('cflag:1:501', 501);
    await load(fixture).monster_skill(1, skill, 0, seq(1, 0));
    assert.equal(read(fixture, key), expected, `技能 ${skill}`);
  }
});

test('monster_skill：强化伤害与参数下降分别钳在 400 和 50', async () => {
  const fixture = setup();
  const { monster_skill } = load(fixture);
  fixture.battle('DEFENSE_1').level = 500;

  await monster_skill(1, 16, 0, seq(1));
  assert.equal(fixture.store.get('base:1:0'), 1600);

  await monster_skill(1, 3, 0, seq(1));
  assert.equal(fixture.store.get('cflag:1:11'), 30);
});

test('monster_skill：诱惑经角色域真身修改好感度与善恶值', async () => {
  const fixture = setup();
  fixture.store.set('cflag:1:151', 10);

  await load(fixture).monster_skill(1, 11, 0, seq(1));

  assert.equal(fixture.store.get('cflag:1:2'), 14);
  assert.equal(fixture.store.get('cflag:1:151'), 8);
});

test('monster_skill：经验吸取跌破零时调用等级检查并同步四维', async () => {
  const fixture = setup();
  fixture.store.set('exp:1:80', 10);
  fixture.store.set('cflag:1:13', 20);
  fixture.store.set('cflag:1:14', 30);

  await load(fixture).monster_skill(1, 13, 0, seq(1));

  assert.equal(fixture.store.get('cflag:1:9'), 4);
  assert.equal(fixture.store.get('exp:1:80'), 40);
  assert.equal(fixture.store.get('cflag:1:11'), 79);
  assert.equal(fixture.store.get('cflag:1:12'), 69);
  assert.equal(fixture.store.get('cflag:1:13'), 19);
  assert.equal(fixture.store.get('cflag:1:14'), 29);
});

test('monster_room_skill：七种房间逐项应用地形效果', async () => {
  const cases = [
    [500, null, 'base:1:0', 1940],
    [501, null, 'base:1:1', 940],
    [502, ['flag:83', 1], 'cflag:1:11', 20],
    [503, null, 'battle:DEFENSE_1:attack', 32],
    [504, null, 'battle:DEFENSE_1:attack', 40],
    [505, null, 'battle:DEFENSE_1:defense', 45],
    [506, ['flag:84', 1], 'base:1:1', 955],
  ];

  for (const [room, flag, key, expected] of cases) {
    const fixture = setup();
    fixture.store.set('cflag:1:501', room);
    if (flag) fixture.store.set(...flag);
    await load(fixture).monster_room_skill(1, 0);
    assert.equal(read(fixture, key), expected, `房间 ${room}`);
  }
});

test('monster_room_skill：沼地增加攻击，冰室同时增加攻防', async () => {
  const swamp = setup();
  swamp.store.set('cflag:1:501', 501);
  await load(swamp).monster_room_skill(1, 0);
  assert.equal(swamp.battle('DEFENSE_1').attack, 32, '沼地攻击 +2');

  const ice = setup();
  ice.store.set('cflag:1:501', 503);
  await load(ice).monster_room_skill(1, 0);
  assert.equal(ice.battle('DEFENSE_1').attack, 32, '冰室攻击 +2');
  assert.equal(ice.battle('DEFENSE_1').defense, 42, '冰室防御 +2');
});

test('monster_room_skill：牧场与博物馆没有库存时不发动，热砂不把低防御再减一', async () => {
  for (const room of [502, 506]) {
    const fixture = setup();
    fixture.store.set('cflag:1:501', room);
    await load(fixture).monster_room_skill(1, 0);
    assert.equal(fixture.store.get('base:1:0'), 2000, `房间 ${room} HP`);
    assert.equal(fixture.store.get('base:1:1'), 1000, `房间 ${room} 气力`);
    assert.equal(fixture.store.get('cflag:1:11'), 80, `房间 ${room} 攻击`);
  }

  const fixture = setup();
  fixture.store.set('cflag:1:501', 504);
  fixture.battle('DEFENSE_1').defense = 2;
  await load(fixture).monster_room_skill(1, 0);
  assert.equal(fixture.battle('DEFENSE_1').defense, 2);
});

test('monster_skill：战斗日志开启时等待输出，破铠吐息文案与实伤一致', async () => {
  const fixture = setup();
  fixture.store.set('flag:5', 32);

  await load(fixture).monster_skill(1, 14, 0, seq(1));

  const line = fixture.lines_history.find((item) => item.type === 'text');
  assert.equal(line.text, '狗头人喷出了破坏铠甲的吐息！！（HP-67 防御-7）');
  assert.equal(fixture.store.get('base:1:0'), 1933, '实际扣 67，文案同值');
});

test('use_monster_skill：十八种技能按精英自身的等级与攻防结算', async () => {
  // 精英（cid = 2）自身等级 5 + 魔王等级 10 = 15；参数下降 = 15/3+1 = 6。
  const cases = [
    [1, 'base:1:1', 985],
    [2, 'base:1:0', 1985],
    [3, 'cflag:1:11', 74],
    [4, 'cflag:1:12', 64],
    [5, 'cflag:2:12', 22],
    [6, 'cflag:2:12', 23],
    [7, 'cflag:2:12', 25],
    [8, 'cflag:1:509', 1],
    [9, 'base:1:0', 1978],
    [10, 'cflag:1:11', 65],
    [11, 'cflag:1:2', 14],
    [12, 'base:1:1', 991],
    [13, 'exp:1:80', 85],
    [14, 'base:1:0', 1978],
    [15, 'cflag:2:12', 24],
    [16, 'base:1:0', 1985],
    [17, 'base:1:1', 970],
    [18, 'cflag:2:12', 22],
  ];

  for (const [skill, key, expected] of cases) {
    const fixture = setup();
    fixture.store.set('cflag:2:9', 5);
    fixture.store.set('cflag:2:12', 20);
    fixture.store.set('cflag:1:501', 501);
    await load(fixture).use_monster_skill(1, skill, 2, 999, 2, '贝丝', seq(0));
    assert.equal(read(fixture, key), expected, `技能 ${skill}`);
  }
});

test('use_monster_skill：精英的攻防增益落在自己身上，战斗列的槽一个都不动', async () => {
  // 第 0 列每个槽都给非零值：增益若落到列上，deepEqual 立刻红，且报出的是
  // 具体哪个槽被写。
  const cases = [
    [18, 'cflag:2:12', 22],
    [5, 'cflag:2:12', 22],
    [6, 'cflag:2:12', 23],
    [7, 'cflag:2:12', 25],
    [15, 'cflag:2:12', 24],
    [17, 'cflag:2:11', 2],
  ];

  for (const [skill, key, expected] of cases) {
    const fixture = setup();
    const column = fixture.battle('DEFENSE_1');
    column.speed = 55;
    column.special = 77;
    column.magic = 88;
    column.count = 9;
    fixture.store.set('cflag:2:9', 5);
    fixture.store.set('cflag:2:11', 0);
    fixture.store.set('cflag:2:12', 20);
    fixture.store.set('cflag:1:501', 501);

    await load(fixture).use_monster_skill(1, skill, 2, 0, 2, '贝丝', seq(0));

    assert.deepEqual(
      { ...column },
      {
        id: 100,
        level: 20,
        attack: 30,
        defense: 40,
        speed: 55,
        special: 77,
        magic: 88,
        rape_type: 0,
        boss: 0,
        status: 0,
        resistance: 0,
        count: 9,
      },
      `技能 ${skill} 不得改动第 0 列的任何槽`,
    );
    assert.equal(
      read(fixture, key),
      expected,
      `技能 ${skill} 的增益落在 ${key}`,
    );
  }
});

test('use_monster_skill：传入的精英等级会被自身等级重算覆盖', async () => {
  const fixture = setup();

  await load(fixture).use_monster_skill(1, 1, 2, 999, 2, '贝丝', seq(0));

  assert.equal(
    fixture.store.get('base:1:1'),
    990,
    '使用精英等级 0 + CFLAG:0:9 = 10，而非 999',
  );
});

test('slave_monster_skill：先判发动，再从 401–499 的素质池选技能', async () => {
  const fixture = setup();
  fixture.store.set('talent:2:471', 1);
  const { slave_monster_skill } = load(fixture);

  await slave_monster_skill(1, 2, seq(0));
  assert.equal(fixture.store.get('base:1:1'), 1000, 'RAND:3 == 0 不发动');

  await slave_monster_skill(1, 2, seq(1));
  assert.equal(
    fixture.store.get('base:1:1'),
    990,
    '471 - 470 = 粘液捕获；伤害 = 精英等级 0 + 魔王等级 10',
  );
});

test('slave_monster_skill：随机选中 401–469 时减 470 为负并浪费行动', async () => {
  const fixture = setup();
  fixture.store.set('talent:2:401', 1);
  fixture.store.set('talent:2:471', 1);

  await load(fixture).slave_monster_skill(1, 2, seq(1, 0));

  assert.equal(fixture.store.get('base:1:1'), 1000);
});

test('slave_monster_skill：没有值严格为 1 的素质时不发动', async () => {
  const fixture = setup();
  fixture.store.set('talent:2:471', 2);

  await load(fixture).slave_monster_skill(1, 2, seq(1));

  assert.equal(fixture.store.get('base:1:1'), 1000);
});

test('slave_monster_skill：角色号 ≥ 12 的精英（cid = 31）按自身等级结算，不出现 NaN', async () => {
  // 角色号 31 的等级 0 + 魔王等级 10 = 10 → 气力 1000 - 10 = 990。
  // 角色号不是列号：第 0 列的任何槽都不该参与这条结算，也不该被这条路径写。
  const fixture = setup();
  fixture.seed_chara(31, { id: 31, name: '菲娅', callname: '菲娅' });
  fixture.era.addCharacter(31);
  fixture.store.set('callname:31:-1', '菲娅');
  fixture.store.set('talent:31:471', 1); // 粘液捕获
  fixture.store.set('flag:5', 32); // 打开战斗日志，顺带核对文案里没有 NaN
  const column = fixture.battle('DEFENSE_1');
  column.special = 77;

  await load(fixture).slave_monster_skill(1, 31, seq(1));

  assert.equal(
    fixture.store.get('base:1:1'),
    990,
    '伤害只取精英自身等级与魔王等级，不读第 0 列的槽',
  );
  assert.equal(column.special, 77, '精英路径不得写第 0 列的槽');
  const lines = fixture.text_lines().join('\n');
  assert.doesNotMatch(lines, /NaN|undefined/, '文案里不得出现 NaN / undefined');
});

test('use_monster_skill：怪物类型写列里的防御，未知类型只演出不增益', async () => {
  const monster = setup();
  await load(monster).use_monster_skill(1, 5, 0, 0, 1, '狗头人', seq(0));
  assert.equal(monster.battle('DEFENSE_1').defense, 42);

  const unknown = setup();
  await load(unknown).use_monster_skill(1, 5, 0, 0, 0, '狗头人', seq(0));
  assert.equal(unknown.battle('DEFENSE_1').defense, 40);
});

test('use_monster_skill：精英射击用叫名，而不是列里攻击力槽拼出来的怪物名', async () => {
  // 列 0 的攻击力槽（+2）是 30：把它当怪物识别号会读出「错位怪物名」。
  const fixture = setup();
  fixture.store.set('flag:5', 32);
  fixture.store.set('itemname:30', '错位怪物名');

  await load(fixture).use_monster_skill(1, 16, 2, 0, 2, '贝丝', seq(0));

  const line = fixture.lines_history.find((item) => item.type === 'text');
  assert.equal(line.text, '贝丝用弓箭发动了攻击！！（HP-10）');
});

test('monster_room_skill：精英路径的地形增益加到角色自己身上', async () => {
  const fixture = setup();
  fixture.store.set('cflag:2:11', 0);
  fixture.store.set('cflag:2:12', 20);
  fixture.store.set('cflag:1:501', 503); // 冰室：攻击 +2 防御 +2

  await load(fixture).monster_room_skill(1, 2, 2, '贝丝');

  assert.equal(
    fixture.store.get('cflag:2:11'),
    2,
    '攻击加在精英自己的攻击力上',
  );
  assert.equal(
    fixture.store.get('cflag:2:12'),
    22,
    '防御加在精英自己的防御力上',
  );
  assert.equal(fixture.battle('DEFENSE_1').attack, 30, '第 0 列的攻击槽不动');
  assert.equal(fixture.battle('DEFENSE_1').defense, 40, '第 0 列的防御槽不动');
});

test('两套战斗入口调用怪物技能真身并透传确定性随机源', async () => {
  {
    const fixture = setup();
    const rand = seq(1);
    const calls = [];
    const skill_mod = load(fixture);
    skill_mod.monster_skill = async (...args) => {
      calls.push(args);
      return 999;
    };
    const magic_mod = fixture.load_module('system/dungeon/magic');
    magic_mod.magic = async () => 0;
    const battle = fixture.load_module('system/dungeon/dungeon-battle');
    fixture.battle('DEFENSE_1').special = 7;
    fixture.battle('DEFENSE_1').count = 1;

    assert.equal(await battle.monster_attack(1, 0, rand), 999);
    assert.deepEqual(calls, [[1, 7, 0, rand]]);
  }

  {
    const fixture = setup();
    const rand = seq(1);
    const calls = [];
    const skill_mod = load(fixture);
    skill_mod.slave_monster_skill = async (...args) => {
      calls.push(args);
      return 999;
    };
    const battle = fixture.load_module('system/dungeon/dungeon-battle');
    battle.magic = async () => 0;
    const battle2 = fixture.load_module('system/dungeon/dungeon-battle2');

    assert.equal(await battle2.duel_attack(1, 0, 2, 1, rand), 999);
    assert.deepEqual(calls, [[2, 1, rand]]);
  }
});
