/**
 * 怪物技能四个函数的行为测试（issue #345，阶段 5a L14）。
 *
 * 测试注入点 = ere/dungeon/monster-skill.js 的公开出口与
 * test/helpers/era-fixture.js。
 * RAND 经函数参数注入，所有行为用例都使用确定性 seq。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('dungeon/monster-skill');
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
  fixture.store.set('e:0', 100);
  fixture.store.set('e:1', 20);
  fixture.store.set('e:2', 30);
  fixture.store.set('e:3', 40);
  fixture.store.set('itemname:100', '狗头人');
  return fixture;
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

test('MONSTER_SKILL：三分之一不发动；粘液捕获按未强化等级扣气力', async () => {
  const fixture = setup();
  const { monster_skill } = load(fixture);

  assert.equal(await monster_skill(1, 1, 0, seq(0)), 0);
  assert.equal(fixture.store.get('base:1:1'), 1000);

  assert.equal(await monster_skill(1, 1, 0, seq(1)), 0);
  assert.equal(fixture.store.get('base:1:1'), 970, 'E 等级 20 + 魔王等级 10');
});

test('MONSTER_SKILL：十八种技能逐项改变原作指定的数值', async () => {
  const cases = [
    [1, 'base:1:1', 970],
    [2, 'base:1:0', 1970],
    [3, 'cflag:1:11', 73],
    [4, 'cflag:1:12', 63],
    [5, 'e:3', 42],
    [6, 'e:3', 43],
    [7, 'e:3', 45],
    [8, 'cflag:1:509', 1],
    [9, 'base:1:0', 1933],
    [10, 'cflag:1:11', 70],
    [11, 'cflag:1:2', 14],
    [12, 'base:1:1', 933],
    [13, 'exp:1:80', 55],
    [14, 'base:1:0', 1933],
    [15, 'e:3', 44],
    [16, 'base:1:0', 1955],
    [17, 'base:1:1', 940],
    [18, 'e:3', 42],
  ];

  for (const [skill, key, expected] of cases) {
    const fixture = setup();
    fixture.store.set('cflag:1:501', 501);
    await load(fixture).monster_skill(1, skill, 0, seq(1, 0));
    assert.equal(fixture.store.get(key), expected, `技能 ${skill}`);
  }
});

test('MONSTER_SKILL：强化伤害与参数下降分别钳在 400 和 50', async () => {
  const fixture = setup();
  const { monster_skill } = load(fixture);
  fixture.store.set('e:1', 500);

  await monster_skill(1, 16, 0, seq(1));
  assert.equal(fixture.store.get('base:1:0'), 1600);

  await monster_skill(1, 3, 0, seq(1));
  assert.equal(fixture.store.get('cflag:1:11'), 30);
});

test('MONSTER_SKILL：诱惑经角色域真身修改好感度与善恶值', async () => {
  const fixture = setup();
  fixture.store.set('cflag:1:151', 10);

  await load(fixture).monster_skill(1, 11, 0, seq(1));

  assert.equal(fixture.store.get('cflag:1:2'), 14);
  assert.equal(fixture.store.get('cflag:1:151'), 8);
});

test('MONSTER_SKILL：经验吸取跌破零时调用等级检查并同步四维', async () => {
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

test('MONSTER_ROOM_SKILL：七种房间逐项应用地形效果', async () => {
  const cases = [
    [500, null, 'base:1:0', 1940],
    [501, null, 'base:1:1', 940],
    [502, ['flag:83', 1], 'cflag:1:11', 20],
    [503, null, 'e:2', 32],
    [504, null, 'e:2', 40],
    [505, null, 'e:3', 45],
    [506, ['flag:84', 1], 'base:1:1', 955],
  ];

  for (const [room, flag, key, expected] of cases) {
    const fixture = setup();
    fixture.store.set('cflag:1:501', room);
    if (flag) fixture.store.set(...flag);
    await load(fixture).monster_room_skill(1, 0);
    assert.equal(fixture.store.get(key), expected, `房间 ${room}`);
  }
});

test('MONSTER_ROOM_SKILL：沼地增加攻击，冰室同时增加攻防', async () => {
  const swamp = setup();
  swamp.store.set('cflag:1:501', 501);
  await load(swamp).monster_room_skill(1, 0);
  assert.equal(swamp.store.get('e:2'), 32, '沼地攻击 +2');

  const ice = setup();
  ice.store.set('cflag:1:501', 503);
  await load(ice).monster_room_skill(1, 0);
  assert.equal(ice.store.get('e:2'), 32, '冰室攻击 +2');
  assert.equal(ice.store.get('e:3'), 42, '冰室防御 +2');
});

test('MONSTER_ROOM_SKILL：牧场与博物馆没有库存时不发动，热砂不把低防御再减一', async () => {
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
  fixture.store.set('e:3', 2);
  await load(fixture).monster_room_skill(1, 0);
  assert.equal(fixture.store.get('e:3'), 2);
});

test('MONSTER_SKILL：战斗日志开启时等待输出，并保留破铠吐息的文案与实伤不一致', async () => {
  const fixture = setup();
  fixture.store.set('flag:5', 32);

  await load(fixture).monster_skill(1, 14, 0, seq(1));

  const line = fixture.lines_history.find((item) => item.type === 'text');
  assert.equal(line.text, '狗头人喷出了破坏铠甲的吐息！！（HP-60 防御-7）');
  assert.equal(fixture.store.get('base:1:0'), 1933, '实际扣 67，不按文案扣 60');
});

test('USE_MONSTER_SKILL：十八种技能保留精英版的数值差异与写入位置', async () => {
  const cases = [
    [1, 'base:1:1', 950],
    [2, 'base:1:0', 1950],
    [3, 'cflag:1:11', 63],
    [4, 'cflag:1:12', 53],
    [5, 'cflag:2:12', 22],
    [6, 'cflag:2:12', 23],
    [7, 'cflag:2:12', 25],
    [8, 'cflag:1:509', 1],
    [9, 'base:1:0', 1925],
    [10, 'cflag:1:11', 30],
    [11, 'cflag:1:2', 14],
    [12, 'base:1:1', 975],
    [13, 'exp:1:80', 50],
    [14, 'base:1:0', 1925],
    [15, 'cflag:2:12', 24],
    [16, 'base:1:0', 1950],
    [17, 'base:1:1', 900],
    [18, 'e:5', 2],
  ];

  for (const [skill, key, expected] of cases) {
    const fixture = setup();
    fixture.store.set('cflag:2:12', 20);
    fixture.store.set('cflag:1:501', 501);
    await load(fixture).use_monster_skill(1, skill, 2, 999, 2, '贝丝', seq(0));
    assert.equal(fixture.store.get(key), expected, `技能 ${skill}`);
  }
});

test('USE_MONSTER_SKILL：传入的精英等级会被 E 槽重算覆盖', async () => {
  const fixture = setup();

  await load(fixture).use_monster_skill(1, 1, 2, 999, 2, '贝丝', seq(0));

  assert.equal(
    fixture.store.get('base:1:1'),
    950,
    '使用 E:3 + CFLAG:0:9，而非 999',
  );
});

test('SLAVE_MONSTER_SKILL：先判发动，再从 401–499 的素质池选技能', async () => {
  const fixture = setup();
  fixture.store.set('talent:2:471', 1);
  const { slave_monster_skill } = load(fixture);

  await slave_monster_skill(1, 2, seq(0));
  assert.equal(fixture.store.get('base:1:1'), 1000, 'RAND:3 == 0 不发动');

  await slave_monster_skill(1, 2, seq(1));
  assert.equal(fixture.store.get('base:1:1'), 950, '471 - 470 = 粘液捕获');
});

test('SLAVE_MONSTER_SKILL：随机选中 401–469 时减 470 为负并浪费行动', async () => {
  const fixture = setup();
  fixture.store.set('talent:2:401', 1);
  fixture.store.set('talent:2:471', 1);

  await load(fixture).slave_monster_skill(1, 2, seq(1, 0));

  assert.equal(fixture.store.get('base:1:1'), 1000);
});

test('SLAVE_MONSTER_SKILL：没有值严格为 1 的素质时不发动', async () => {
  const fixture = setup();
  fixture.store.set('talent:2:471', 2);

  await load(fixture).slave_monster_skill(1, 2, seq(1));

  assert.equal(fixture.store.get('base:1:1'), 1000);
});

test('USE_MONSTER_SKILL：怪物类型写 E 防御，未知类型只演出不增益', async () => {
  const monster = setup();
  await load(monster).use_monster_skill(1, 5, 0, 0, 1, '狗头人', seq(0));
  assert.equal(monster.store.get('e:3'), 42);

  const unknown = setup();
  await load(unknown).use_monster_skill(1, 5, 0, 0, 0, '狗头人', seq(0));
  assert.equal(unknown.store.get('e:3'), 40);
});

test('USE_MONSTER_SKILL：精英射击沿用 E 槽怪物名而非传入名字', async () => {
  const fixture = setup();
  fixture.store.set('flag:5', 32);
  fixture.store.set('itemname:30', '错位怪物名');

  await load(fixture).use_monster_skill(1, 16, 2, 0, 2, '贝丝', seq(0));

  const line = fixture.lines_history.find((item) => item.type === 'text');
  assert.equal(line.text, '错位怪物名用弓箭发动了攻击！！（HP-50）');
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
    const magic_mod = fixture.load_module('dungeon/magic');
    magic_mod.magic = async () => 0;
    const battle = fixture.load_module('dungeon/dungeon-battle');
    fixture.store.set('e:4', 7);
    fixture.store.set('e:99', 1);

    assert.equal(await battle.monster_attack(1, 0, rand), 999);
    assert.deepEqual(calls, [[1, 7, -1, rand]]);
    assert.equal(
      battle.STUBBED_CALLS.includes('MONSTER_SKILL'),
      false,
      'MONSTER_SKILL 不再登记为存根',
    );
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
    const battle = fixture.load_module('dungeon/dungeon-battle');
    battle.magic = async () => 0;
    const battle2 = fixture.load_module('dungeon/dungeon-battle2');

    assert.equal(await battle2.duel_attack(1, 0, 2, 1, rand), 999);
    assert.deepEqual(calls, [[2, 1, rand]]);
    assert.equal(
      battle2.STUBBED_CALLS.includes('SLAVE_MONSTER_SKILL'),
      false,
      'SLAVE_MONSTER_SKILL 不再登记为存根',
    );
  }
});
