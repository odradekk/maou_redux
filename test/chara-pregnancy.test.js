'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++] ?? 0;
    assert.ok(value >= 0 && value < n, `随机值 ${value} 必须在 [0, ${n}) 内`);
    return value;
  };
}

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

const PREGNANCY_FUNCTIONS = [
  'ninsin_main',
  'ninsin_aware',
  'preg_talent_get',
  'ninsin_reach_term',
  'ninsin_reach_day',
  'ninsin_give_birth',
  'gb_add_guard',
  'gb_add_slave',
  'gb_define_name',
  'n_change_status',
  'n_reset_status',
  'child_birth_place',
  'n_flag_clear',
  'n_breast_grow',
  'n_breast_reverse',
  'child_care_begin',
  'child_care_change_nurse',
  'child_care_depart',
];

test('两份源文件的 23 个函数全部导出真身', () => {
  const fixture = create_era_fixture();
  const pregnancy = fixture.load_module('chara/chara-pregnancy');
  const summon = fixture.load_module('dungeon/monster-summon');

  for (const name of PREGNANCY_FUNCTIONS) {
    assert.equal(typeof pregnancy[name], 'function', name);
  }
  for (const name of [
    'summon_monster',
    'pregnancy_master',
    'summon_monster_master',
    'monster_total_count',
    'rand_monster_number',
  ]) {
    assert.equal(typeof summon[name], 'function', name);
  }
});

test('弱召唤保留 -1 实参：基础五轮折半为两轮并增加对应怪物库存', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('itemname:100', '史莱姆');
  const { summon_monster } = fixture.load_module('dungeon/monster-summon');

  await summon_monster(-1, seq([0, 0, 0, 0, 0, 0]));

  assert.equal(fixture.store.get('item:100'), 2);
  assert.equal(
    fixture.lines_history.filter((line) => line.text === '史莱姆召唤出1只')
      .length,
    2,
  );
});

test('怪物抽选跳过已满种类，仍有容量时重抽', () => {
  const fixture = create_era_fixture();
  fixture.store.set('item:100', 999);
  const { rand_monster_number } = fixture.load_module('dungeon/monster-summon');

  assert.equal(rand_monster_number(seq([0, 0, 0, 1])), 101);
});

test('怪物总数只统计 100-184 的 45 个离散槽，全部满时允许返回满槽', () => {
  const fixture = create_era_fixture();
  const { monster_total_count, rand_monster_number } = fixture.load_module(
    'dungeon/monster-summon',
  );
  for (let tier = 0; tier < 9; tier += 1) {
    for (let kind = 0; kind < 5; kind += 1) {
      fixture.store.set(`item:${100 + tier * 10 + kind}`, 999);
    }
  }
  fixture.store.set('item:189', 5000);

  assert.equal(monster_total_count(), 44_955);
  assert.equal(rand_monster_number(seq([8, 4])), 184);
});

test('生产怪物仅在实际入库分支追加双胞胎，且双胞胎文本保持同一显示行', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('callname:1:-1', '母亲');
  fixture.store.set('itemname:100', '史莱姆');
  fixture.store.set('cflag:1:111', -1);
  fixture.store.set('cflag:1:102', 1);
  fixture.store.set('talent:1:314', 3);
  const { summon_monster } = fixture.load_module('dungeon/monster-summon');

  await summon_monster(1, seq([0, 0, 0, 1, 0]));

  assert.equal(fixture.store.get('item:100'), 1);
  assert.equal(fixture.store.get('item:172'), 1);
  assert.ok(
    fixture.lines_history.some(
      (line) => line.text === '哦呀？！生了双胞胎呢！生了一只吸血鬼',
    ),
  );

  const departed = create_era_fixture();
  departed.store.set('callname:1:-1', '母亲');
  departed.store.set('itemname:100', '史莱姆');
  departed.store.set('cflag:1:111', -1);
  departed.store.set('cflag:1:102', 2);
  departed.store.set('talent:1:314', 3);
  await departed
    .load_module('dungeon/monster-summon')
    .summon_monster(1, seq([0, 0, 0, 1]));
  assert.equal(departed.store.get('item:100'), undefined);
  assert.equal(departed.store.get('item:172'), undefined);
});

test('魔王生产固定近卫怪物并钳到库存上限；自跳缺陷以明确错误终止', () => {
  const fixture = create_era_fixture();
  fixture.store.set('callname:0:-1', '魔王');
  fixture.store.set('itemname:193', '近卫');
  fixture.store.set('item:193', 998);
  const summon = fixture.load_module('dungeon/monster-summon');

  assert.equal(summon.summon_monster_master(0, seq([2, 2])), 0);
  assert.equal(fixture.store.get('item:193'), 999);
  assert.throws(() => summon.pregnancy_master(), /无限尾调用/);
});

test('妊娠发觉的随机边界：幼年筛选 2 失败，普通概率 3 成功', async () => {
  const young = create_era_fixture();
  add_chara(young, 1, '少女');
  young.store.set('flag:5', 1 << 2);
  young.store.set('cflag:1:451', 14);
  young.store.set('cflag:1:101', 3);
  young.store.set('cflag:1:102', 1);
  young.store.set('cflag:1:110', 54);
  const young_mod = young.load_module('chara/chara-pregnancy');

  assert.equal(await young_mod.ninsin_aware(1, seq([2, 3])), 0);
  assert.equal(young.store.get('cflag:1:102'), 0);

  const adult = create_era_fixture();
  add_chara(adult, 1, '成人');
  adult.store.set('callname:0:-1', '魔王');
  adult.store.set('flag:5', 1 << 2);
  adult.store.set('cflag:1:451', 20);
  adult.store.set('cflag:1:102', 1);
  adult.store.set('cflag:1:110', 54);
  adult.store.set('maxbase:1:0', 1000);
  adult.store.set('base:1:0', 900);

  assert.equal(
    await adult.load_module('chara/chara-pregnancy').ninsin_aware(1, seq([3])),
    1,
  );
  assert.equal(adult.store.get('talent:1:153'), 1);
  assert.equal(adult.store.get('maxbase:1:0'), 500);

  const failed = create_era_fixture();
  add_chara(failed, 1, '成人');
  failed.store.set('flag:5', 1 << 2);
  failed.store.set('cflag:1:451', 20);
  failed.store.set('cflag:1:102', 1);
  failed.store.set('cflag:1:110', 54);
  assert.equal(
    await failed.load_module('chara/chara-pregnancy').ninsin_aware(1, seq([2])),
    0,
  );
  assert.equal(failed.store.get('cflag:1:102'), 0);
});

test('异常妊娠五种部位分别取得专属素质，并在发觉后清除部位', async () => {
  const cases = [
    [1, 341],
    [2, 342],
    [3, 343],
    [4, 344],
    [-1, undefined],
  ];

  for (const [place, special] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    fixture.store.set('cflag:1:113', place);
    const { preg_talent_get } = fixture.load_module('chara/chara-pregnancy');

    assert.equal(await preg_talent_get(1), 1, `部位 ${place}`);
    assert.equal(
      fixture.store.get('talent:1:153'),
      1,
      `部位 ${place} 获得妊娠`,
    );
    for (const talent of [341, 342, 343, 344]) {
      assert.equal(
        fixture.store.get(`talent:1:${talent}`) || 0,
        talent === special ? 1 : 0,
        `部位 ${place} 的专属素质 ${talent}`,
      );
    }
    assert.equal(fixture.store.get('cflag:1:113'), 0, `部位 ${place} 已清除`);
  }
});

const BREAST_TALENTS = {
  绝壁: 116,
  贫乳: 109,
  巨乳: 110,
  爆乳: 114,
  超乳: 119,
};

function set_breast_state(fixture, state) {
  for (const [name, talent] of Object.entries(BREAST_TALENTS)) {
    fixture.store.set(`talent:1:${talent}`, name === state ? 1 : 0);
  }
}

function breast_state(fixture) {
  return Object.fromEntries(
    Object.entries(BREAST_TALENTS).map(([name, talent]) => [
      name,
      fixture.store.get(`talent:1:${talent}`) || 0,
    ]),
  );
}

test('胸部升档覆盖绝壁、贫乳、普通、巨乳、爆乳与超乳六种状态', () => {
  const cases = [
    ['绝壁', '贫乳'],
    ['贫乳', undefined],
    [undefined, '巨乳'],
    ['巨乳', '爆乳'],
    ['爆乳', '超乳'],
    ['超乳', '超乳'],
  ];

  for (const [before, after] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_breast_state(fixture, before);

    fixture.load_module('chara/chara-pregnancy').n_breast_grow(1, seq([]));

    assert.deepEqual(
      breast_state(fixture),
      Object.fromEntries(
        Object.keys(BREAST_TALENTS).map((name) => [
          name,
          name === after ? 1 : 0,
        ]),
      ),
      `${before ?? '普通'} → ${after ?? '普通'}`,
    );
  }
});

test('胸部降档覆盖超乳不退的原作缺陷及其余五种状态', () => {
  const cases = [
    ['绝壁', '绝壁'],
    ['贫乳', '贫乳'],
    [undefined, '贫乳'],
    ['巨乳', undefined],
    ['爆乳', '巨乳'],
    ['超乳', '超乳'],
  ];

  for (const [before, after] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    set_breast_state(fixture, before);

    fixture.load_module('chara/chara-pregnancy').n_breast_reverse(1, seq([]));

    assert.deepEqual(
      breast_state(fixture),
      Object.fromEntries(
        Object.keys(BREAST_TALENTS).map((name) => [
          name,
          name === after ? 1 : 0,
        ]),
      ),
      `${before ?? '普通'} → ${after ?? '普通'}`,
    );
  }
});

test('胸部升降档在体型设定第 12 位或第 15 位单独开启时都会重算', () => {
  for (const [action, before] of [
    ['n_breast_grow', undefined],
    ['n_breast_reverse', '巨乳'],
  ]) {
    for (const bit of [12, 15]) {
      const fixture = create_era_fixture();
      add_chara(fixture, 1);
      set_breast_state(fixture, before);
      fixture.store.set('flag:5', 1 << bit);
      fixture.store.set('cflag:1:451', 20);
      fixture.store.set('cflag:1:453', 1600);
      fixture.store.set('cflag:1:454', 500);
      fixture.store.set('cflag:1:458', 100);
      fixture.store.set('cflag:1:459', 700);
      fixture.store.set('cflag:1:455', -1);

      fixture
        .load_module('chara/chara-pregnancy')
        [action](1, seq(new Array(20).fill(0)));

      assert.ok(
        fixture.store.get('cflag:1:454') > 0,
        `${action} 设定位 ${bit} 重算体重`,
      );
      assert.notEqual(
        fixture.store.get('cflag:1:455'),
        -1,
        `${action} 设定位 ${bit} 重算胸围`,
      );
    }
  }
});

test('清理受孕状态逐项走属主门面，保留排卵诱发剂位', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  for (let index = 101; index <= 113; index += 1) {
    fixture.store.set(`cflag:1:${index}`, index);
  }
  fixture.store.set('cstr:1:2', '旧父亲');
  fixture.store.set('cflag:1:1', 10);

  fixture.load_module('chara/chara-pregnancy').n_flag_clear(1);

  for (let index = 101; index <= 108; index += 1) {
    assert.equal(fixture.store.get(`cflag:1:${index}`), 0, `CFLAG:${index}`);
  }
  assert.equal(fixture.store.get('cflag:1:109'), 109);
  assert.equal(fixture.store.get('cflag:1:110'), 0);
  assert.equal(fixture.store.get('cflag:1:111'), 0);
  assert.equal(fixture.store.get('cstr:1:2'), '');
  assert.equal(fixture.store.get('cflag:1:1'), 0);
});

test('崩坏母亲尾调用换护士，角色 ID 100 不与弃养选项冲突', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '母亲');
  add_chara(fixture, 100, '护士');
  fixture.store.set('talent:1:9', 1);
  fixture.store.set('talent:1:153', 1);
  fixture.store.set('maxbase:1:0', 500);
  fixture.store.set('cflag:1:110', 20);
  fixture.store.set('talent:100:155', 1);
  fixture.store.set('cflag:100:0', 2);
  fixture.set_inputs(0);

  await fixture
    .load_module('chara/chara-pregnancy')
    .child_care_begin(1, seq([]));

  assert.equal(fixture.store.get('talent:100:154'), 1);
  assert.equal(fixture.store.get('cflag:100:110'), 20);
  assert.equal(fixture.store.get('talent:1:154') || 0, 0);
  assert.equal(fixture.store.get('maxbase:1:0'), 1000);
});

test('同一预设连续生成两个后代不覆盖，种族字段使用 319/321/322', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '母亲');
  fixture.store.set('talent:1:314', 5);
  fixture.store.set('talent:1:319', 7);
  fixture.store.set('talent:1:322', 201);
  const pregnancy = fixture.load_module('chara/chara-pregnancy');

  const first = await pregnancy.gb_add_slave(
    1,
    -4,
    seq(new Array(300).fill(0)),
  );
  const second = await pregnancy.gb_add_slave(
    1,
    -4,
    seq(new Array(300).fill(0)),
  );

  assert.equal(first, 1000);
  assert.equal(second, 1001);
  assert.ok(fixture.era.getAddedCharacters().includes(first));
  assert.ok(fixture.era.getAddedCharacters().includes(second));
  assert.equal(fixture.store.get(`talent:${first}:319`), 7);
  assert.equal(fixture.store.get(`talent:${first}:321`), 5);
  assert.equal(fixture.store.get(`talent:${first}:322`), 201);
  assert.equal(fixture.store.get(`talent:${first}:160`), 1);
});

test('近卫随机下界保留原作缺陷：模板 200 不存在时明确失败', async () => {
  const fixture = create_era_fixture();
  const { gb_add_guard } = fixture.load_module('chara/chara-pregnancy');

  await assert.rejects(
    gb_add_guard(0, -2, seq([0])),
    /后代预设角色 200 不存在/,
  );
});

test('育儿结束生成孩子后，母亲与孩子都离开育儿室状态并恢复妊娠时扣除的体力上限', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '母亲');
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:111', -4);
  fixture.store.set('maxbase:1:0', 500);
  fixture.store.set('talent:1:154', 1);
  const { child_care_depart } = fixture.load_module('chara/chara-pregnancy');

  await child_care_depart(1, seq(new Array(300).fill(0)));

  assert.equal(fixture.store.get('cflag:1:1'), 0, '母亲状态归零');
  assert.equal(fixture.store.get('cflag:1000:1'), 0, '孩子状态归零');
  assert.equal(fixture.store.get('talent:1:154'), 0, '母亲结束育儿');
  assert.equal(
    fixture.store.get('maxbase:1:0'),
    1000,
    '恢复妊娠时扣除的体力上限',
  );
});

test('端到端：怪物妊娠从发觉、临月推进到生产并清理状态', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '母亲');
  fixture.store.set('flag:5', 1 << 2);
  fixture.store.set('cflag:1:451', 20);
  fixture.store.set('cflag:1:102', 6);
  fixture.store.set('cflag:1:110', 24);
  fixture.store.set('cflag:1:111', -3);
  fixture.store.set('cflag:1:112', 100);
  fixture.store.set('itemname:100', '史莱姆');
  fixture.store.set('maxbase:1:0', 1000);
  fixture.store.set('base:1:0', 1000);
  const pregnancy = fixture.load_module('chara/chara-pregnancy');
  const rand = seq([3, 0, 0, 0, 0, 1]);

  assert.equal(await pregnancy.ninsin_main(rand), 0);
  assert.equal(fixture.store.get('talent:1:153'), 1);
  assert.equal(fixture.store.get('exp:1:62'), 1);
  fixture.store.set('talent:1:343', 1);

  fixture.store.set('flag:10000', 21);
  await pregnancy.ninsin_main(rand);
  assert.equal(fixture.store.get('cflag:1:1'), 10);
  assert.ok(
    fixture.lines_history.some((line) => line.text === '母亲快要临盘了……'),
  );

  fixture.store.set('flag:10000', 24);
  await pregnancy.ninsin_main(rand);
  assert.equal(fixture.store.get('item:100'), 1);
  assert.equal(fixture.store.get('talent:1:153'), 0);
  assert.equal(fixture.store.get('cflag:1:110'), 0);
  assert.equal(fixture.store.get('cflag:1:1'), 0);
  assert.equal(fixture.store.get('maxbase:1:0'), 1000);
  assert.ok(
    fixture.lines_history.some(
      (line) => line.text === '母亲平安的生下了怪物的孩子。',
    ),
    '原作 CALL CHILD_BIRTH_PLACE 漏传参数，非魔王的异常生产部位不会出现',
  );
});

test('日循环入口调用妊娠与通常召唤真身，不再产生对应存根行', async () => {
  const fixture = create_era_fixture();
  const pregnancy = fixture.load_module('chara/chara-pregnancy');
  const summon = fixture.load_module('dungeon/monster-summon');
  const calls = [];
  pregnancy.ninsin_main = async () => calls.push('pregnancy');
  summon.summon_monster = async (arg) => calls.push(`summon:${arg}`);

  await fixture.load_module('event/event-nextday').run_event_nextday();

  assert.deepEqual(calls, ['pregnancy', 'summon:0']);
  assert.ok(
    !fixture.lines_history.some(
      (line) =>
        line.text?.includes('原作 @NINSIN_MAIN') ||
        line.text?.includes('原作 @SUMMON_MONSTER'),
    ),
  );
});
