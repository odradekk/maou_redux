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

function chara_view(fixture, cid) {
  return fixture.load_module('facade/chara').chara(cid);
}

function printed(fixture, text) {
  return fixture.lines_history.some((line) => line.text === text);
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
  'n_change_stress',
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

test('两份源文件的函数全部导出真身', () => {
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

test('妊娠状态重置区分超乳与普通胸部，并独立清除泌乳和恢复体力上限', () => {
  for (const super_breast of [false, true]) {
    for (const lactation of [false, true]) {
      const fixture = create_era_fixture();
      add_chara(fixture, 1, '母亲');
      const view = chara_view(fixture, 1);
      view.chara.超乳 = super_breast ? 1 : 0;
      view.chara.巨乳 = super_breast ? 0 : 1;
      view.chara.母乳体质 = lactation ? 1 : 0;
      view.chara.妊娠 = 1;
      view.chara.育儿中 = 1;
      view.dungeon.体力上限 = 500;

      fixture.load_module('chara/chara-pregnancy').n_reset_status(1, seq([]));

      assert.equal(view.chara.超乳, super_breast ? 1 : 0);
      assert.equal(view.chara.巨乳, 0);
      assert.equal(view.chara.母乳体质, 0);
      assert.equal(view.chara.妊娠, 0);
      assert.equal(view.chara.育儿中, 0);
      assert.equal(view.dungeon.体力上限, 1000);
      assert.equal(
        printed(fixture, '母亲超乳仍然淫乱地胀大着缩不回去了。'),
        super_breast,
      );
      assert.equal(printed(fixture, '母亲不再泌乳了。'), lactation);
    }
  }
});

test('异常生产部位四种文案与无异常兜底逐一对应', () => {
  const cases = [
    ['乳内妊娠', '从巨大的乳房中'],
    ['精巢妊娠', '从巨大的阴囊，通过阴茎'],
    ['肛内妊娠', '从巨大的腹中，通过肛门'],
    ['口内妊娠', '从巨大的腹中，通过口腔'],
    [undefined, undefined],
  ];
  for (const [place, expected] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    if (place) chara_view(fixture, 1).chara[place] = 1;

    fixture.load_module('chara/chara-pregnancy').child_birth_place(1);

    assert.deepEqual(
      fixture.lines_history.map((line) => line.text),
      expected ? [expected] : [],
      place ?? '无异常部位',
    );
  }
});

test('临月处理覆盖狂王早退、迎击召回随机两侧与设定位两条路径', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    const view = chara_view(fixture, 1);
    view.invasion.状态 = 9;
    fixture.store.set('flag:1', 1);
    fixture.store.set('flag:2', 1);

    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_term(1, seq([]));

    assert.equal(view.invasion.状态, 9);
    assert.equal(fixture.store.get('flag:1'), 1);
    assert.equal(fixture.store.get('flag:2'), 1);
    assert.ok(printed(fixture, '为了准备生产，母亲被移动到了狂王的育儿室。'));
    assert.equal(
      printed(fixture, '为了准备生产，母亲被移动到了育儿室。'),
      false,
    );
  }

  for (const [setting, roll, callback] of [
    [true, 1, true],
    [true, 0, false],
    [false, 0, false],
  ]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    const view = chara_view(fixture, 1);
    view.invasion.状态 = 3;
    view.invasion.回城标志 = 7;
    fixture.store.set('flag:5', setting ? 1 << 10 : 0);
    fixture.store.set('flag:1', 1);
    fixture.store.set('flag:2', 1);

    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_term(1, seq([roll]));

    assert.equal(fixture.store.get('flag:1'), -1);
    assert.equal(fixture.store.get('flag:2'), -1);
    assert.equal(view.invasion.状态, setting ? 3 : 10);
    assert.equal(view.invasion.回城标志, callback ? 7 : 0);
    assert.equal(
      fixture.lines_history.some((line) =>
        line.text?.includes('角色 1 的传送召回'),
      ),
      callback,
    );
  }

  for (const state of [0, 7, 8]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    chara_view(fixture, 1).invasion.状态 = state;
    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_term(1, seq([]));
    assert.equal(
      chara_view(fixture, 1).invasion.状态,
      state === 0 ? 10 : state,
    );
  }
});

function prepare_awareness(fixture, source = 1) {
  add_chara(fixture, 1, '母亲');
  const view = chara_view(fixture, 1);
  fixture.store.set('callname:0:-1', '魔王');
  fixture.store.set('flag:5', 1 << 2);
  view.chara.年龄 = 20;
  view.event.妊娠相手 = source;
  view.event.预产日 = source <= 4 ? 54 : 24;
  view.event.孩子父亲名字 = '旅人';
  view.dungeon.体力上限 = 1000;
  view.dungeon.体力 = 1000;
  return view;
}

test('妊娠发觉的全部前置条件均覆盖允许与拒绝两侧', async () => {
  const blockers = [
    (v) => (v.chara.妊娠 = 1),
    (v) => (v.chara.育儿中 = 1),
    (v) => (v.chara.乳内妊娠 = 1),
    (v) => (v.chara.精巢妊娠 = 1),
    (v) => (v.chara.肛内妊娠 = 1),
    (v) => (v.chara.口内妊娠 = 1),
    (v, f) => f.store.set('flag:5', 0),
    (v) => (v.chara.处女 = 1),
    (v) => (v.chara.私处封印 = 1),
    (v) => (v.chara.男人 = 1),
  ];
  for (const block of blockers) {
    const fixture = create_era_fixture();
    const view = prepare_awareness(fixture);
    block(view, fixture);
    assert.equal(
      await fixture
        .load_module('chara/chara-pregnancy')
        .ninsin_aware(1, seq([3])),
      0,
    );
    assert.equal(view.chara.妊娠 || 0, block === blockers[0] ? 1 : 0);
  }

  for (const kind of [1, 2, 3, 4]) {
    const fixture = create_era_fixture();
    const view = prepare_awareness(fixture);
    view.train.异常妊娠部位 = kind;
    assert.equal(
      await fixture
        .load_module('chara/chara-pregnancy')
        .ninsin_aware(1, seq([3])),
      0,
    );
  }

  const too_young = create_era_fixture();
  const young_view = prepare_awareness(too_young);
  young_view.chara.年龄 = 9;
  assert.equal(
    await too_young
      .load_module('chara/chara-pregnancy')
      .ninsin_aware(1, seq([0, 3])),
    0,
  );
  assert.equal(young_view.event.妊娠相手, 0);

  const testicle = create_era_fixture();
  const testicle_view = prepare_awareness(testicle);
  testicle_view.stronghold.异常妊娠体质 = 1;
  testicle_view.train.异常妊娠部位 = 2;
  assert.equal(
    await testicle
      .load_module('chara/chara-pregnancy')
      .ninsin_aware(1, seq([3])),
    0,
  );

  for (const allow of ['talent', 'male']) {
    const fixture = create_era_fixture();
    const view = prepare_awareness(fixture);
    view.stronghold.异常妊娠体质 = 1;
    view.train.异常妊娠部位 = 2;
    if (allow === 'talent') fixture.store.set('talent:1:121', 1);
    else view.chara.男人 = 1;
    assert.equal(
      await fixture
        .load_module('chara/chara-pregnancy')
        .ninsin_aware(1, seq([3])),
      1,
    );
  }
});

test('妊娠发觉覆盖七种来源、怪物实名、期限及诱发剂 11／自然 5 的随机上界', async () => {
  const source_text = new Map([
    [1, '母亲好像有了魔王的孩子，'],
    [2, '母亲好像有了旅人的孩子，'],
    [3, '母亲好像有了旅人的孩子，'],
    [4, '母亲好像有了连名字都不知道的男人的孩子，'],
    [5, '母亲好像有了野狗的孩子。'],
    [7, '母亲好像有了狂王的孩子，'],
  ]);
  for (const source of [1, 2, 3, 4, 5, 7]) {
    const fixture = create_era_fixture();
    const view = prepare_awareness(fixture, source);
    assert.equal(
      await fixture
        .load_module('chara/chara-pregnancy')
        .ninsin_aware(1, seq([3])),
      1,
    );
    assert.ok(printed(fixture, source_text.get(source)));
    assert.equal(view.chara.异种妊娠经验 || 0, source === 5 ? 1 : 0);
  }

  for (const [monster_id, known, expected] of [
    [100, 0, '母亲好像有了史莱姆的孩子。'],
    [100, 1, '母亲好像有了怪物的孩子。'],
    [0, 0, '母亲好像有了怪物的孩子。'],
  ]) {
    const fixture = create_era_fixture();
    const view = prepare_awareness(fixture, 6);
    view.dungeon.胎儿怪物编号 = monster_id;
    fixture.store.set('itemname:100', '史莱姆');
    assert.equal(
      await fixture
        .load_module('chara/chara-pregnancy')
        .ninsin_aware(1, seq([3, known])),
      1,
    );
    assert.ok(
      printed(fixture, expected),
      `怪物实名 编号${monster_id}／已知${known}：${expected}`,
    );
    assert.equal(
      view.dungeon.胎儿怪物编号,
      monster_id > 0 && known === 0 ? 100 : 0,
    );
    assert.equal(view.chara.异种妊娠经验, 1);
  }

  for (const [source, due] of [
    [0, 1],
    [8, 1],
    [1, 55],
    [5, 25],
  ]) {
    const fixture = create_era_fixture();
    const view = prepare_awareness(fixture, source);
    view.event.预产日 = due;
    assert.equal(
      await fixture
        .load_module('chara/chara-pregnancy')
        .ninsin_aware(1, seq([3])),
      0,
      `来源 ${source}／预产日 ${due}：来源越界或期限未到必须早退`,
    );
  }

  const induced = create_era_fixture();
  const induced_view = prepare_awareness(induced, 1);
  induced_view.stronghold.排卵诱发剂 = 1;
  induced_view.event.预产日 = 55;
  assert.equal(
    await induced
      .load_module('chara/chara-pregnancy')
      .ninsin_aware(1, seq([9])),
    0,
  );

  const natural = create_era_fixture();
  const natural_view = prepare_awareness(natural, 1);
  natural_view.event.预产日 = 55;
  assert.equal(
    await natural
      .load_module('chara/chara-pregnancy')
      .ninsin_aware(1, seq([4])),
    0,
  );
});

test('妊娠压力覆盖各来源、关系与修正项，并区分崩坏、既有崩坏和魔王', async () => {
  const cases = [
    { source: 1, lewd: 1, stress: 30, broken: 0 },
    { source: 2, love: 1, relation: 0, stress: 20, broken: 0 },
    { source: 2, lewd: 1, relation: 0, stress: 10, broken: 0 },
    { source: 2, love: 1, relation: 50, stress: 20, broken: 0 },
    {
      source: 2,
      love: 1,
      relation: -1000,
      stress: 130,
      broken: 1,
      loses_love: true,
    },
    { source: 3, lewd: 1, relation: 50, stress: 10, broken: 0 },
    {
      source: 4,
      love: 1,
      weak: 1,
      stress: 100,
      broken: 1,
      loses_love: true,
    },
    { source: 4, lewd: 1, stress: 50, broken: 0 },
    { source: 5, love: 1, stress: 100, broken: 1, loses_love: true },
    {
      source: 5,
      lewd: 1,
      bitch: 1,
      dog_spouse: 1,
      stress: 0,
      broken: 0,
    },
    { source: 5, stress: 90, broken: 0 },
    { source: 6, love: 1, stress: 100, broken: 1, loses_love: true },
    {
      source: 6,
      lewd: 1,
      demon: 1,
      spouse: 6,
      stress: 0,
      broken: 0,
    },
    { source: 6, stress: 90, broken: 0 },
    {
      source: 7,
      love: 1,
      weak: 1,
      stress: 100,
      broken: 1,
      loses_love: true,
    },
    { source: 7, lewd: 1, stress: 30, broken: 0 },
    { source: 1, births: 2, stress: 40, broken: 0 },
    {
      source: 6,
      lewd: 1,
      weak: 1,
      stress: 100,
      broken: 1,
      loses_lewd: true,
    },
    {
      source: 5,
      love: 1,
      strong: 1,
      maternal: 1,
      weak: 1,
      births: 2,
      stress: 40,
      broken: 0,
    },
    { source: 5, love: 1, already_broken: 1, stress: 100, broken: 1 },
  ];
  for (const spec of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    add_chara(fixture, 2, '父亲');
    const view = chara_view(fixture, 1);
    view.dungeon.体力上限 = 1000;
    view.dungeon.体力 = 900;
    view.event.妊娠相手 = spec.source;
    view.event.孩子父亲 = 3;
    fixture.store.set('cflag:2:6', 2);
    view.stronghold.爱慕 = spec.love || 0;
    view.stronghold.淫乱 = spec.lewd || 0;
    view.stronghold.崩坏 = spec.already_broken || 0;
    view.chara.母性 = spec.maternal || 0;
    view.chara.生育经验 = spec.births || 0;
    fixture.store.set('relation:1:2', spec.relation || 0);
    fixture.store.set('talent:1:12', spec.strong || 0);
    fixture.store.set('talent:1:134', spec.weak || 0);
    fixture.store.set('talent:1:136', spec.bitch || 0);
    fixture.store.set('talent:1:314', spec.demon ? 9 : 0);
    fixture.store.set('cflag:1:601', spec.dog_spouse ? 900 : spec.spouse || 0);

    const pregnancy = fixture.load_module('chara/chara-pregnancy');
    assert.equal(pregnancy.n_change_stress(1), spec.stress);
    await pregnancy.n_change_status(1, seq([]));

    assert.equal(view.stronghold.崩坏 || 0, spec.broken);
    if (spec.loses_love) assert.equal(view.stronghold.爱慕, 0);
    if (spec.loses_lewd) assert.equal(view.stronghold.淫乱, 0);
  }

  const master = create_era_fixture();
  add_chara(master, 0, '魔王');
  const master_view = chara_view(master, 0);
  master_view.dungeon.体力上限 = 1000;
  master_view.event.妊娠相手 = 5;
  master_view.stronghold.爱慕 = 1;
  await master.load_module('chara/chara-pregnancy').n_change_status(0, seq([]));
  assert.equal(master_view.stronghold.崩坏 || 0, 0);
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

test('近卫生成覆盖随机、普通、精英模板及双亲替身和等级两侧', async () => {
  const cases = [
    {
      mother: 0,
      father: -4,
      rolls: new Array(300).fill(0),
      child: 1000,
      level: 1,
    },
    {
      mother: 1,
      father: 0,
      rolls: [2, ...new Array(300).fill(0)],
      child: 1000,
      level: 7,
    },
    {
      mother: 201,
      father: 0,
      rolls: new Array(300).fill(0),
      child: 21000,
      level: 7,
    },
    {
      mother: 17,
      father: 0,
      rolls: new Array(300).fill(0),
      child: 1000,
      level: 7,
    },
    {
      mother: 2,
      father: 0,
      rolls: new Array(300).fill(0),
      child: 1100,
      level: 4,
    },
    {
      mother: 0,
      father: -2,
      rolls: [1, ...new Array(300).fill(0)],
      child: 21000,
      level: 7,
    },
  ];
  for (const spec of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '魔王');
    if (spec.mother > 0) {
      add_chara(fixture, spec.mother, '母亲');
      if (spec.mother !== 2) {
        fixture.store.set(`talent:${spec.mother}:319`, 8);
        fixture.store.set(`cflag:${spec.mother}:9`, 10);
      }
    }
    fixture.seed_chara(spec.child === 21000 ? 201 : 1, { name: '后代模板' });
    if (spec.father !== -4) fixture.store.set('cflag:0:9', 10);

    const child = await fixture
      .load_module('chara/chara-pregnancy')
      .gb_add_guard(spec.mother, spec.father, seq(spec.rolls));

    assert.equal(child, spec.child);
    assert.equal(fixture.store.get(`ex_talent:${child}:1`), 1);
    assert.equal(fixture.store.get(`ex_talent:${child}:2`), 1);
    assert.equal(fixture.store.get(`talent:${child}:314`), 9);
    assert.equal(fixture.store.get(`talent:${child}:321`), 9);
    if (spec.mother > 0) {
      assert.equal(
        fixture.store.get(`talent:${child}:319`),
        spec.mother === 2 ? 0 : 8,
      );
    }
    assert.ok((fixture.store.get(`talent:${child}:322`) || 0) >= 191);
    assert.equal(fixture.store.get(`cflag:${child}:9`), spec.level);
    assert.equal(
      fixture.store.get(`ex_talent:${child}:3`) || 0,
      spec.mother === 0 || spec.father === 0 ? 1 : 0,
    );
  }
});

test('普通后代生成覆盖普通、精英、随机模板及父亲有无的等级路径', async () => {
  const cases = [
    { mother: 1, father: -4, child: 1000, source: 1, first_roll: 5, level: 8 },
    { mother: 201, father: 2, child: 21000, source: 201, level: 10 },
    { mother: 17, father: -1, child: 1000, source: 1, level: 7 },
    { mother: 2, father: 0, child: 1100, source: 2, level: 1 },
  ];
  for (const spec of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, spec.mother, '母亲');
    if (spec.father > 0) add_chara(fixture, spec.father, '父亲');
    fixture.seed_chara(spec.source, { name: '后代模板' });
    fixture.store.set(`talent:${spec.mother}:314`, 5);
    if (spec.mother !== 2) {
      fixture.store.set(`talent:${spec.mother}:319`, 7);
      fixture.store.set(`talent:${spec.mother}:322`, 8);
      fixture.store.set(`cflag:${spec.mother}:9`, 10);
    }
    if (spec.father > 0) fixture.store.set(`cflag:${spec.father}:9`, 20);
    chara_view(fixture, spec.mother).invasion.状态 =
      spec.mother === 201 ? 9 : 0;

    const child = await fixture
      .load_module('chara/chara-pregnancy')
      .gb_add_slave(
        spec.mother,
        spec.father,
        seq([spec.first_roll || 0, ...new Array(400).fill(0)]),
      );

    assert.equal(child, spec.child);
    assert.equal(fixture.store.get(`talent:${child}:314`), 5);
    assert.equal(
      fixture.store.get(`talent:${child}:322`),
      spec.source === 201 ? 201 : spec.mother === 2 ? 0 : 8,
    );
    assert.equal(
      chara_view(fixture, child).invasion.状态,
      spec.mother === 201 ? 2 : 0,
    );
    assert.equal(fixture.store.get(`cflag:${child}:9`), spec.level);
  }
});

test('动态后代作为母亲时可反推出原始预设模板', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { name: '后代模板' });
  fixture.seed_chara(1000, { name: '动态母亲' });
  assert.equal(fixture.era.addCharacter(1000), true);

  const child = await fixture
    .load_module('chara/chara-pregnancy')
    .gb_add_slave(1000, -1, seq(new Array(200).fill(0)));

  assert.equal(child, 1001);
});

test('后代命名依次采用父亲、母亲和自动名字类型', () => {
  const cases = [
    { mother: 1, father: 2, nid: 500, first_bound: 5 },
    { mother: 1, father: -1, nid: 50, first_bound: 585 },
    { mother: 0, father: -1, nid: 0, first_bound: 585 },
  ];
  for (const spec of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    add_chara(fixture, 2);
    add_chara(fixture, 1000);
    fixture.store.set(
      `cflag:${spec.father > 0 ? spec.father : spec.mother}:6`,
      spec.nid,
    );
    const bounds = [];
    fixture
      .load_module('chara/chara-pregnancy')
      .gb_define_name(1000, spec.mother, spec.father, (n) => {
        bounds.push(n);
        return 0;
      });
    assert.equal(bounds[0], spec.first_bound);
  }
});

test('换护士覆盖无候选、主动弃养、无效输入重试与男性护士路径', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    const view = chara_view(fixture, 1);
    view.chara.妊娠 = 1;
    view.chara.母乳体质 = 1;
    view.stronghold.崩坏 = 1;
    view.dungeon.体力上限 = 500;
    await fixture
      .load_module('chara/chara-pregnancy')
      .child_care_change_nurse(1, seq([]));
    assert.equal(view.chara.母乳体质, 0);
    assert.equal(view.dungeon.体力上限, 1000);
  }

  for (const choose_nurse of [false, true]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    add_chara(fixture, 2, '护士');
    const mother = chara_view(fixture, 1);
    const nurse = chara_view(fixture, 2);
    mother.event.预产日 = 20;
    mother.dungeon.体力上限 = 500;
    nurse.chara.母性 = 1;
    nurse.chara.男人 = 1;
    nurse.stronghold.出售与助手资格 = 2;
    nurse.invasion.状态 = 0;
    fixture.store.set('flag:10005', 2);
    fixture.store.set('flag:10006', 2);
    fixture.set_inputs(choose_nurse ? 0 : 1);
    if (choose_nurse) {
      let attempts = 0;
      fixture.era.input = async () => (attempts++ === 0 ? 99 : 0);
    }

    await fixture
      .load_module('chara/chara-pregnancy')
      .child_care_change_nurse(1, seq([]));

    assert.equal(nurse.chara.育儿中 || 0, choose_nurse ? 1 : 0);
    assert.equal(nurse.chara.母乳体质 || 0, 0);
    assert.equal(nurse.event.预产日 || 0, choose_nurse ? 20 : 0);
    if (choose_nurse) {
      assert.equal(fixture.store.get('flag:10005'), -1);
      assert.equal(fixture.store.get('flag:10006'), -1);
    }
  }
});

test('换护士候选筛选逐项排除不合格角色', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '母亲');
  chara_view(fixture, 1).dungeon.体力上限 = 500;
  const reject = [
    (v) => (v.chara.妊娠 = 1),
    (v) => (v.chara.育儿中 = 1),
    (v) => (v.chara.母性 = 0),
    (v) => (v.stronghold.崩坏 = 1),
    (v) => (v.stronghold.出售与助手资格 = 1),
    (v) => (v.invasion.状态 = 1),
  ];
  reject.forEach((mutate, index) => {
    const id = index + 2;
    add_chara(fixture, id);
    const view = chara_view(fixture, id);
    view.chara.母性 = 1;
    view.stronghold.出售与助手资格 = 2;
    view.invasion.状态 = 0;
    mutate(view);
  });
  await fixture
    .load_module('chara/chara-pregnancy')
    .child_care_change_nurse(1, seq([]));
  assert.ok(
    fixture.lines_history.some((line) =>
      line.text?.includes('找不到照看孩子的人'),
    ),
  );
});

test('开始育儿覆盖母性觉醒及不满足条件的两侧', async () => {
  for (const [love, father, maternal, awakens] of [
    [1, 0, 0, true],
    [0, 0, 0, false],
    [1, -1, 0, false],
    [1, 0, 1, false],
  ]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    const view = chara_view(fixture, 1);
    view.stronghold.爱慕 = love;
    view.event.孩子父亲 = father;
    view.chara.母性 = maternal;
    fixture.store.set('flag:1', 1);
    fixture.store.set('flag:2', 1);
    await fixture
      .load_module('chara/chara-pregnancy')
      .child_care_begin(1, seq([]));
    assert.equal(view.chara.母性 || 0, awakens || maternal ? 1 : 0);
    assert.equal(view.chara.育儿中, 1);
    assert.equal(fixture.store.get('flag:1'), -1);
    assert.equal(fixture.store.get('flag:2'), -1);
  }

  const master = create_era_fixture();
  add_chara(master, 0, '魔王');
  await master
    .load_module('chara/chara-pregnancy')
    .child_care_begin(0, seq([]));
  assert.ok(printed(master, '魔王开始在育儿室照顾孩子。'));
});

function prepare_birth(fixture, father, state) {
  add_chara(fixture, 0, '魔王');
  add_chara(fixture, 1, '母亲');
  const view = chara_view(fixture, 1);
  view.event.孩子父亲 = father;
  view.event.孩子父亲名字 = '旧父名';
  view.event.妊娠相手 = father === -3 ? 6 : father === -2 ? 5 : 1;
  view.invasion.状态 = state;
  view.chara.妊娠 = 1;
  view.dungeon.体力上限 = 900;
  view.dungeon.体力 = 600;
  view.dungeon.气力 = 300;
  fixture.store.set('itemname:100', '史莱姆');
  return view;
}

test('生产日覆盖人类流产、怪物生产与狂王生产三条提前返回路径', async () => {
  {
    const fixture = create_era_fixture();
    const view = prepare_birth(fixture, -1, 3);
    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_day(1, seq([]));
    assert.equal(view.dungeon.体力上限, 800);
    assert.equal(view.dungeon.体力, 100);
    assert.equal(view.dungeon.气力, 50);
    assert.ok(
      fixture.lines_history.some((line) => line.text?.includes('流产了')),
    );
  }

  {
    const fixture = create_era_fixture();
    const view = prepare_birth(fixture, -3, 2);
    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_day(1, seq(new Array(40).fill(0)));
    assert.equal(view.dungeon.体力上限, 1400);
    assert.equal(view.dungeon.体力, 200);
    assert.equal(view.dungeon.气力, 100);
    assert.ok(
      fixture.lines_history.some((line) => line.text?.includes('生下了孩子')),
    );
  }

  {
    const fixture = create_era_fixture();
    const view = prepare_birth(fixture, -4, 9);
    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_day(1, seq(new Array(40).fill(0)));
    assert.equal(view.chara.妊娠, 0);
    assert.equal(view.invasion.状态, 9);
    assert.ok(printed(fixture, '从狂王处收到了水晶球。'));
  }
});

test('正常生产覆盖父亲解析、父性觉醒、处女膜与异常部位两侧', async () => {
  {
    const fixture = create_era_fixture();
    const view = prepare_birth(fixture, 3, 10);
    add_chara(fixture, 2, '现父亲');
    fixture.store.set('cflag:2:6', 2);
    view.stronghold.爱慕 = 1;
    view.chara.处女 = 1;
    chara_view(fixture, 0).chara.男人 = 1;
    fixture.store.set('flag:32', 2);

    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_day(1, seq([]));

    assert.equal(view.event.孩子父亲名字, '现父亲');
    assert.equal(view.chara.处女, 0);
    assert.equal(view.chara.育儿中, 1);
    assert.equal(chara_view(fixture, 0).chara.父性 || 0, 0);
    assert.equal(fixture.store.get('flag:32'), 2);
  }

  {
    const fixture = create_era_fixture();
    const view = prepare_birth(fixture, 999, 10);
    view.chara.处女 = 1;
    view.chara.乳内妊娠 = 1;
    view.chara.精巢妊娠 = 1;
    view.chara.肛内妊娠 = 1;
    view.chara.口内妊娠 = 1;

    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_day(1, seq([]));

    assert.equal(view.event.孩子父亲名字, '旧父名');
    assert.equal(view.chara.处女, 1);
    assert.equal(view.chara.乳内妊娠, 0);
    assert.equal(view.chara.精巢妊娠, 0);
    assert.equal(view.chara.肛内妊娠, 0);
    assert.equal(view.chara.口内妊娠, 0);
  }

  {
    const fixture = create_era_fixture();
    const view = prepare_birth(fixture, -5, 10);
    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_day(1, seq([]));
    assert.ok(
      fixture.lines_history.some((line) =>
        line.text?.includes('没有父亲的孩子'),
      ),
    );
    assert.equal(view.chara.育儿中, 1);
  }

  {
    const fixture = create_era_fixture();
    const view = prepare_birth(fixture, 0, 10);
    view.stronghold.爱慕 = 1;
    chara_view(fixture, 0).chara.男人 = 1;
    fixture.store.set('flag:32', 2);
    await fixture
      .load_module('chara/chara-pregnancy')
      .ninsin_reach_day(1, seq([]));
    assert.equal(chara_view(fixture, 0).chara.父性, 1);
    assert.equal(fixture.store.get('flag:32'), 3);
  }
});

test('直接生产分派覆盖角色上限的魔王与普通角色、近卫、怪物和奴隶', async () => {
  for (const mother of [0, 1]) {
    const fixture = create_era_fixture();
    for (let cid = 0; cid < 90; cid += 1) add_chara(fixture, cid);
    chara_view(fixture, mother).event.孩子父亲 = -3;
    fixture.store.set('itemname:100', '史莱姆');
    assert.equal(
      await fixture
        .load_module('chara/chara-pregnancy')
        .ninsin_give_birth(mother, seq(new Array(40).fill(0))),
      -1,
    );
    assert.ok(
      fixture.lines_history.some((line) =>
        line.text?.includes('当前登录角色数量超出最大数量90'),
      ),
    );
  }

  const monster = create_era_fixture();
  prepare_birth(monster, -2, 0);
  assert.equal(
    await monster
      .load_module('chara/chara-pregnancy')
      .ninsin_give_birth(1, seq(new Array(40).fill(0))),
    -1,
  );

  const guard = create_era_fixture();
  add_chara(guard, 0, '魔王');
  guard.seed_chara(1, { name: '后代模板' });
  assert.equal(
    await guard
      .load_module('chara/chara-pregnancy')
      .ninsin_give_birth(0, seq(new Array(200).fill(0))),
    1000,
  );
});

test('每日推进覆盖近产期自动移室、设定禁止移室与育儿提示', async () => {
  for (const setting of [false, true]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '母亲');
    const view = chara_view(fixture, 1);
    view.chara.妊娠 = 1;
    view.event.预产日 = 2;
    view.invasion.状态 = 0;
    fixture.store.set('flag:5', setting ? 1 << 10 : 0);
    await fixture.load_module('chara/chara-pregnancy').ninsin_main(seq([]));
    assert.equal(view.invasion.状态, setting ? 0 : 10);
  }

  const care = create_era_fixture();
  add_chara(care, 1, '母亲');
  const care_view = chara_view(care, 1);
  care_view.chara.育儿中 = 1;
  care_view.event.预产日 = 20;
  await care.load_module('chara/chara-pregnancy').ninsin_main(seq([]));
  assert.ok(printed(care, '母亲在育儿室照顾孩子……'));

  const depart = create_era_fixture();
  add_chara(depart, 1, '母亲');
  const depart_view = chara_view(depart, 1);
  depart_view.chara.育儿中 = 1;
  depart_view.event.预产日 = -5;
  depart_view.event.孩子父亲 = -3;
  depart_view.dungeon.体力上限 = 500;
  depart.store.set('itemname:100', '史莱姆');
  await depart
    .load_module('chara/chara-pregnancy')
    .ninsin_main(seq(new Array(40).fill(0)));
  assert.equal(depart_view.chara.育儿中, 0);

  const unaffected = create_era_fixture();
  add_chara(unaffected, 1, '无关角色');
  await unaffected.load_module('chara/chara-pregnancy').ninsin_main(seq([]));
  assert.equal(unaffected.lines_history.length, 0);
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
