/**
 * 怪物改造与玩弄的行为测试（issue #340，阶段 5a L9）。
 *
 * 缝 = ere/dungeon/monster-data.js、ere/dungeon/monster-play.js 的公开出口，
 * 以及既有页面入口；RAND 一律经函数参数注入确定性序列。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(...values) {
  let index = 0;
  return (n) => {
    const value = values[index++] ?? 0;
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

function setup() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.store.set('flag:10004', 5000); // MONEY = 所持金
  fixture.store.set('exflag:4444', 5000); // EX_FLAG:4444 = 非作弊资金
  for (let id = 100; id < 200; id += 1) {
    fixture.store.set(`itemname:${id}`, `怪物${id}`);
    fixture.store.set(`item:${id}`, 1);
  }
  return fixture;
}

function rendered_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text' || line.type === 'button')
    .map((line) => (line.type === 'button' ? line.rendered : line.text));
}

test('MONSTER_SETUP_ABLE 按种族、改造与兵种条件判定', () => {
  const fixture = setup();
  const { monster_setup_able } = fixture.load_module('dungeon/monster-data');

  assert.equal(monster_setup_able(100, 0, seq()), 1, '无改造对所有怪物可用');
  assert.equal(monster_setup_able(190, 2, seq()), 0, '骷髅不能土地适应');
  assert.equal(monster_setup_able(102, 3, seq()), 1, '史莱姆能酸性化');
  assert.equal(monster_setup_able(102, 5, seq()), 0, '史莱姆不能装甲化');
  assert.equal(monster_setup_able(104, 4, seq()), 1, '非人形能猛毒化');
  assert.equal(monster_setup_able(100, 51, seq()), 1, '亚人能转弓兵');
  assert.equal(monster_setup_able(100, 53, seq()), 1, '不会睡眠术时能转催眠师');
  assert.equal(monster_setup_able(132, 53, seq()), 0, '会睡眠术时不能转催眠师');
  assert.equal(monster_setup_able(133, 52, seq()), 0, '会能量箭时不能转魔导兵');
});

test('MONSTER_SETUP 购买改造时只替换对应位并同时扣两份资金', async () => {
  const fixture = setup();
  fixture.store.set('flag:350', 500); // 第 1 层设施 = 遗迹街
  fixture.store.set('itemname:500', '遗迹街');
  fixture.store.set('flag:800', 301); // 怪物 100：弓兵 + 上级化
  fixture.set_inputs(2, 0, 999); // 土地适应 → 确认 → 返回
  const { monster_setup } = fixture.load_module('dungeon/monster-data');

  assert.equal(await monster_setup(100, seq()), 0);
  assert.equal(fixture.store.get('flag:800'), 302, '保留兵种百位，只换低两位');
  assert.equal(fixture.store.get('flag:10004'), 4000, '所持金扣 1000');
  assert.equal(fixture.store.get('exflag:4444'), 4000, '非作弊资金同步扣 1000');
  assert(fixture.text_lines().includes('设施：遗迹街'));
});

test('MONSTER_SETUP 保留完整菜单判定区间的随机源副作用', async () => {
  const fixture = setup();
  fixture.set_inputs(999);
  const random_bounds = [];
  const rand = (n) => {
    random_bounds.push(n);
    return 0;
  };

  await fixture.load_module('dungeon/monster-data').monster_setup(100, rand);

  assert.equal(random_bounds.length, 54, '18 次 MONSTER_DATA 各消费三次随机数');
  for (let i = 0; i < random_bounds.length; i += 3) {
    assert.deepEqual(random_bounds.slice(i, i + 3), [10, 2, 2]);
  }
});

test('MONSTER_SETUP 拒绝非法编号、缺钱和取消确认，兵种改造保留万位与低位', async () => {
  const invalid = setup();
  assert.equal(
    await invalid.load_module('dungeon/monster-data').monster_setup(99, seq()),
    999,
  );

  const poor = setup();
  poor.store.set('flag:10004', 999);
  poor.set_inputs(1);
  await poor.load_module('dungeon/monster-data').monster_setup(100, seq());
  assert.equal(poor.store.get('flag:800'), undefined);
  assert.equal(poor.store.get('exflag:4444'), 5000);

  const declined = setup();
  declined.set_inputs(1, 1);
  await declined.load_module('dungeon/monster-data').monster_setup(100, seq());
  assert.equal(declined.store.get('flag:800'), undefined);
  assert.equal(declined.store.get('flag:10004'), 5000);

  const troop = setup();
  troop.store.set('flag:800', 12034);
  troop.set_inputs(51, 0, 999);
  await troop.load_module('dungeon/monster-data').monster_setup(100, seq());
  assert.equal(troop.store.get('flag:800'), 10134);
});

test('MONSTERPLAY_LIST 只列出持有的 100-199 怪物', () => {
  const fixture = setup();
  for (let id = 100; id < 200; id += 1) fixture.store.set(`item:${id}`, 0);
  fixture.store.set('item:100', 2);
  fixture.store.set('item:101', 0);
  fixture.store.set('item:102', 1);
  fixture.store.set('item:103', 1);
  fixture.store.set('item:199', 1);
  const { monsterplay_list } = fixture.load_module('dungeon/monster-play');

  assert.equal(monsterplay_list(), 0);
  const lines = rendered_lines(fixture);
  assert(lines.includes('[100] 怪物100'));
  assert(!lines.includes('[101] 怪物101'));
  assert(lines.includes('[199] 怪物199'));
  const buttons = fixture.lines_history.filter(
    (line) => line.type === 'button',
  );
  assert.equal(buttons.find((line) => line.accelerator === 100).row, 0);
  assert.equal(buttons.find((line) => line.accelerator === 103).row, 0);
  assert.equal(buttons.find((line) => line.accelerator === 199).row, 1);
});

test('野狗、魔兽与马分支写入各自的兽奸经验和点数', async () => {
  const fixture = setup();
  const { monster_play_dog, beast_monster_play, horse_monster_play } =
    fixture.load_module('dungeon/monster-play');

  await monster_play_dog(0, 4);
  assert.equal(fixture.store.get('exp:0:0'), 4);
  assert.equal(fixture.store.get('exp:0:56'), 4);
  assert.equal(fixture.store.get('cflag:0:106'), 4);

  await beast_monster_play(0, 5);
  assert.equal(fixture.store.get('exp:0:0'), 9);
  assert.equal(fixture.store.get('exp:0:56'), 9);
  assert.equal(fixture.store.get('cflag:0:107'), 5);

  await horse_monster_play(0, 3);
  assert.equal(fixture.store.get('exp:0:0'), 12);
  assert.equal(fixture.store.get('exp:0:56'), 12);
  assert.equal(fixture.store.get('juel:0:9'), 30);
  assert.equal(fixture.store.get('juel:0:10'), 30);
});

test('兽人分支按第二骰区分口交与多穴轮奸', async () => {
  const oral = setup();
  oral.set_inputs(0);
  await oral
    .load_module('dungeon/monster-play')
    .orc_monster_play(0, 4, seq(0, 0));
  assert.equal(oral.store.get('exp:0:22'), 4);
  assert.equal(oral.store.get('exp:0:20'), 4);
  assert.equal(oral.store.get('cflag:0:107'), undefined);

  const group = setup();
  group.set_inputs(0);
  await group
    .load_module('dungeon/monster-play')
    .orc_monster_play(0, 5, seq(0, 1));
  assert.equal(group.store.get('exp:0:0'), 5);
  assert.equal(group.store.get('exp:0:1'), 5);
  assert.equal(group.store.get('exp:0:22'), 5);
  assert.equal(group.store.get('exp:0:20'), 5);
  assert.equal(group.store.get('cflag:0:107'), 5);
});

test('史莱姆、昆虫、藤蔓与触手按随机分支结算经验和点数', async () => {
  const fixture = setup();
  fixture.set_inputs(0, 0, 0);
  const mod = fixture.load_module('dungeon/monster-play');

  await mod.slime_monster_play(0, 3, seq(1));
  assert.equal(fixture.store.get('exp:0:1'), 3);
  assert.equal(fixture.store.get('juel:0:5'), 30);
  assert.equal(fixture.store.get('juel:0:8'), 30);

  await mod.insect_monster_play(0, 4, seq(1));
  assert.equal(fixture.store.get('exp:0:1'), 7);

  await mod.ivy_monster_play(0, 5, seq(1));
  assert.equal(fixture.store.get('exp:0:1'), 12);
  assert.equal(fixture.store.get('juel:0:9'), 50);
  assert.equal(fixture.store.get('juel:0:10'), 50);

  await mod.syokusyu_monster_play(0, 6, seq(3));
  assert.equal(fixture.store.get('exp:0:0'), 6);
  assert.equal(fixture.store.get('exp:0:1'), 18);
  assert.equal(fixture.store.get('exp:0:55'), 6);
  assert.equal(fixture.store.get('cflag:0:107'), 6);
});

test('男性魔王在十个异性怪物分支走原作提前返回', async () => {
  const function_names = [
    'monster_play_dog',
    'orc_monster_play',
    'slime_monster_play',
    'insect_monster_play',
    'ivy_monster_play',
    'syokusyu_monster_play',
    'giant_monster_play',
    'man_monster_play',
    'beast_monster_play',
    'horse_monster_play',
  ];

  for (const function_name of function_names) {
    const fixture = setup();
    fixture.store.set('talent:0:122', 1); // TALENT:MASTER:122 = 男人
    const play = fixture.load_module('dungeon/monster-play')[function_name];

    assert.equal(await play(0, 3, seq()), 0, function_name);
    assert.equal(fixture.store.get('exp:0:0'), undefined, function_name);
    assert.equal(fixture.store.get('juel:0:5'), undefined, function_name);
    assert.equal(fixture.store.get('cflag:0:107'), undefined, function_name);
  }
});

test('史莱姆、昆虫、藤蔓、触手与男魔族的其余随机臂均可达', async () => {
  const slime = setup();
  await slime
    .load_module('dungeon/monster-play')
    .slime_monster_play(0, 3, seq(0));
  assert.equal(slime.store.get('juel:0:5'), 30);
  assert.equal(slime.store.get('juel:0:8'), 30);
  assert.equal(slime.store.get('exp:0:1'), undefined);

  const insect = setup();
  await insect
    .load_module('dungeon/monster-play')
    .insect_monster_play(0, 4, seq(0));
  assert.equal(insect.store.get('juel:0:5'), 40);
  assert.equal(insect.store.get('exp:0:1'), undefined);

  const ivy = setup();
  await ivy.load_module('dungeon/monster-play').ivy_monster_play(0, 5, seq(0));
  assert.equal(ivy.store.get('juel:0:9'), 50);
  assert.equal(ivy.store.get('juel:0:10'), 50);
  assert.equal(ivy.store.get('exp:0:1'), undefined);

  for (const branch of [0, 1, 2]) {
    const tentacle = setup();
    await tentacle
      .load_module('dungeon/monster-play')
      .syokusyu_monster_play(0, 6, seq(branch));
    assert.equal(tentacle.store.get('exp:0:55'), 6, `触手臂 ${branch}`);
    assert.equal(tentacle.store.get('juel:0:5'), 60, `触手臂 ${branch}`);
    assert.equal(
      tentacle.store.get(branch === 1 ? 'exp:0:1' : 'exp:0:0'),
      branch === 0 ? undefined : 6,
      `触手臂 ${branch}`,
    );
  }

  const man = setup();
  await man.load_module('dungeon/monster-play').man_monster_play(0, 7, seq(0));
  assert.equal(man.store.get('exp:0:22'), 7);
  assert.equal(man.store.get('exp:0:20'), 7);
  assert.equal(man.store.get('cflag:0:107'), undefined);
});

test('妖精的男性与扶她分支、女魔族的男性分支均可达', async () => {
  for (const talent of [122, 121]) {
    const fairy = setup();
    fairy.store.set(`talent:0:${talent}`, 1); // TALENT:A:122/121 = 男人/扶她
    await fairy.load_module('dungeon/monster-play').fairy_monster_play(0, 3);
    assert.equal(fairy.store.get('juel:0:0'), 30);
    assert.equal(fairy.store.get('juel:0:5'), 30);
    assert(rendered_lines(fairy).some((line) => line.includes('阴茎')));
  }

  const girl = setup();
  girl.store.set('talent:0:122', 1); // TALENT:A:122 = 男人
  await girl.load_module('dungeon/monster-play').girl_monster_play(0, 4);
  assert.equal(girl.store.get('juel:0:0'), 40);
  assert.equal(girl.store.get('juel:0:5'), 40);
  assert.equal(girl.store.get('exp:0:40'), undefined);
});

test('妖精、巨人、男女魔族分支保留性别条件与各自经验', async () => {
  const fixture = setup();
  fixture.set_inputs(0, 0, 0, 0);
  const original_print_and_wait = fixture.era.printAndWait;
  let print_and_wait_calls = 0;
  fixture.era.printAndWait = async (text) => {
    print_and_wait_calls += 1;
    return original_print_and_wait(text);
  };
  const mod = fixture.load_module('dungeon/monster-play');

  await mod.fairy_monster_play(0, 3);
  assert.equal(print_and_wait_calls, 4, '女性妖精分支保留四个 PRINTW');
  assert.equal(fixture.store.get('juel:0:0'), 30);
  assert.equal(fixture.store.get('juel:0:5'), 30);

  await mod.giant_monster_play(0, 4);
  assert.equal(fixture.store.get('exp:0:0'), 4);
  assert.equal(fixture.store.get('exp:0:20'), 4);
  assert.equal(fixture.store.get('exp:0:53'), 4);
  assert.equal(fixture.store.get('cflag:0:107'), 4);

  await mod.man_monster_play(0, 5, seq(1));
  assert.equal(fixture.store.get('exp:0:0'), 9);
  assert.equal(fixture.store.get('exp:0:1'), 5);
  assert.equal(fixture.store.get('exp:0:20'), 9);

  await mod.girl_monster_play(0, 6);
  assert.equal(fixture.store.get('exp:0:40'), 6, '女性魔王增加百合经验');
});

test('食脑魔保留无条件返回，后半死亡分支不可达', async () => {
  const fixture = setup();
  fixture.store.set('base:0:0', 100);
  const { brain_monster_play } = fixture.load_module('dungeon/monster-play');
  let random_calls = 0;

  assert.equal(
    await brain_monster_play(0, 3, () => {
      random_calls += 1;
      return 0;
    }),
    0,
  );
  assert.equal(random_calls, 0, 'RETURN 后不得执行 RAND:40');
  assert.equal(fixture.store.get('base:0:0'), 100, '死代码不得杀死魔王');
  assert.equal(fixture.store.get('exp:0:50'), undefined);
});

test('MONSTER_PLAY 取消返回 0；野狗路径结算处女丧失并转入回合结束', async () => {
  const cancel = setup();
  cancel.set_inputs(999);
  assert.equal(
    await cancel.load_module('dungeon/monster-play').monster_play(seq()),
    0,
  );

  const fixture = setup();
  fixture.store.set('item:22', 1);
  fixture.store.set('talent:0:0', 1); // TALENT:A:0 = 处女
  fixture.set_inputs(900);
  const { BeginSignal, STATE } = fixture.load_module(
    'system/flow/begin-signal',
  );
  await assert.rejects(
    () => fixture.load_module('dungeon/monster-play').monster_play(seq(2)),
    (error) => error instanceof BeginSignal && error.state === STATE.TURNEND,
  );
  assert.equal(fixture.store.get('exp:0:0'), 5, 'Y = RAND:5 + 3');
  assert.equal(fixture.store.get('talent:0:0'), 0);
  assert(rendered_lines(fixture).includes('【处女丧失】'));
});

test('MONSTER_PLAY 非狗先生成第 5 列，再按 E:507 分派并共用随机序列', async () => {
  const fixture = setup();
  fixture.set_inputs(102); // 黏液怪，凌辱类型 2
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');

  await assert.rejects(
    () =>
      fixture
        .load_module('dungeon/monster-play')
        .monster_play(seq(0, 0, 0, 4, 1)),
    BeginSignal,
  );
  assert.equal(fixture.store.get('e:500'), 102, 'MONSTER_DATA 写入 X 列');
  assert.equal(fixture.store.get('e:507'), 2, '分派键是 X 列的怪物种族');
  assert.equal(
    fixture.store.get('exp:0:1'),
    7,
    '三次生成骰后 Y=7，走史莱姆分支 1',
  );
});

test('MONSTER_PLAY 保留自由输入：未显示但有库存的编号仍可进入', async () => {
  const fixture = setup();
  fixture.store.set('item:22', 1);
  fixture.set_inputs(22);
  const { BeginSignal } = fixture.load_module('system/flow/begin-signal');
  await assert.rejects(
    () => fixture.load_module('dungeon/monster-play').monster_play(seq(0, 0)),
    BeginSignal,
  );
  assert.equal(
    fixture.store.get('exp:0:0'),
    undefined,
    '22 不是野狗快捷键 900',
  );
});

test('三处旧调用方均已清除 MONSTER_PLAY / MONSTER_SETUP 存根登记', () => {
  const fixture = setup();
  assert(
    !fixture
      .load_module('page/page-select-target')
      .STUBBED_CALLS.includes('MONSTER_PLAY'),
  );
  assert(
    !fixture
      .load_module('page/page-dungeon-info2')
      .STUBBED_CALLS.includes('MONSTER_SETUP'),
  );
  assert(
    !fixture
      .load_module('dungeon/dungeon-town')
      .STUBBED_CALLS.includes('MONSTER_PLAY'),
  );
});
