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
