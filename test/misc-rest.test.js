/**
 * issue #350：其他/ 残余七文件的行为测试。
 */

'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const { pathToFileURL } = require('node:url');

const { create_era_fixture } = require('./helpers/era-fixture');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++];
    assert.notEqual(value, undefined, `第 ${index} 个随机值未提供`);
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

function seq_with_bounds(calls) {
  let index = 0;
  const rand = (n) => {
    const call = calls[index++];
    assert.notEqual(call, undefined, `第 ${index} 个随机调用未提供`);
    const [bound, value] = call;
    assert.equal(n, bound, `第 ${index} 个随机调用的上界`);
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
  rand.assert_exhausted = () =>
    assert.equal(index, calls.length, '随机调用数必须与期望一致');
  return rand;
}

function setup_ntr() {
  const fixture = create_era_fixture();
  fixture.seed_chara(17, { id: 17, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(17);
  return { fixture, ntr: fixture.load_module('system/ntr') };
}

function setup_communication(ids) {
  const fixture = create_era_fixture();
  for (const cid of ids) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
    fixture.store.set(`cflag:${cid}:9`, cid);
  }
  return { fixture, net: fixture.load_module('system/cross-save-sharing') };
}

function setup_spy_tattoo(tattoos) {
  const fixture = create_era_fixture();
  for (const cid of [1, 2]) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  seed_values(fixture, {
    'cflag:2:531': 1,
    'cflag:2:533': 2,
    'cflag:1:533': 2,
    'cflag:1:500': 4,
    'cflag:2:9': 3,
    'maxbase:2:0': 2000,
    'maxbase:2:1': 1000,
    'base:2:0': 10,
    'base:2:1': 1,
  });
  for (const [locate, text] of tattoos) {
    fixture.store.set(`cstr:1:${locate}`, text);
  }
  fixture.set_inputs(1);
  return {
    fixture,
    battle: fixture.load_module('dungeon/dungeon-battle2'),
  };
}

function seed_values(fixture, values) {
  for (const [key, value] of Object.entries(values))
    fixture.store.set(key, value);
}

async function run_desire_offer({
  level = 4,
  abnormal = 10,
  values = {},
} = {}) {
  const { fixture, ntr } = setup_ntr();
  const initial_juel = 1_000_000;
  seed_values(fixture, {
    'cflag:17:1': 9,
    'abl:17:2': 5,
    'abl:17:3': 5,
    'abl:17:11': level,
    'exp:17:50': abnormal,
    'juel:17:5': initial_juel,
    ...values,
  });

  await ntr.ntr_video(17, seq([1, 1, 3]));
  const upgraded = fixture.store.get('abl:17:11') === level + 1;
  return {
    upgraded,
    cost: upgraded ? initial_juel + 1250 - fixture.store.get('juel:17:5') : 0,
  };
}

async function run_sensation_offer({
  kind = 'vaginal',
  level = 3,
  experience = 1_000_000,
  juel = 1_000_000,
  values = {},
} = {}) {
  const { fixture, ntr } = setup_ntr();
  const vaginal = kind === 'vaginal';
  const ability_id = vaginal ? 2 : 3;
  const other_ability_id = vaginal ? 3 : 2;
  const experience_id = vaginal ? 0 : 1;
  const juel_id = vaginal ? 1 : 2;
  seed_values(fixture, {
    'cflag:17:1': 9,
    [`abl:17:${ability_id}`]: level,
    [`abl:17:${other_ability_id}`]: 5,
    'abl:17:11': 10,
    [`exp:17:${experience_id}`]: experience,
    [`juel:17:${juel_id}`]: juel,
    ...values,
  });

  await ntr.ntr_video(17, seq([1, 1, 3]));
  const upgraded = fixture.store.get(`abl:17:${ability_id}`) === level + 1;
  return {
    upgraded,
    cost: upgraded ? juel - fixture.store.get(`juel:17:${juel_id}`) : 0,
  };
}

test('EXCOM：扩展口上编号取最后命中项并保留静态局部，名称只初始化一次', () => {
  const fixture = create_era_fixture();
  const ex = fixture.load_module('chara/chara-ex');

  fixture.store.set('ex_talent:16:101', 1);
  assert.equal(ex.get_ex_kojo_num(16), 1001, '扫描包含下界 101');
  fixture.store.set('ex_talent:17:102', 1);
  fixture.store.set('ex_talent:17:223', 1);
  fixture.store.set('ex_talent:17:800', 1);
  assert.equal(ex.get_ex_kojo_num(17), 1700, '扫描包含上界 800 并取最后命中');
  assert.equal(ex.get_ex_kojo_num(18), 1700);

  ex.ex_talentname_init();
  assert.equal(ex.ex_talentname(0), '灵魂错位');
  assert.equal(ex.ex_talentname(104), '菲娅');
  assert.equal(ex.ex_talentname(904), '天神');
  assert.equal(ex.ex_talentname(999), '');
  assert.equal(ex.ex_talentname_init(), false, '已有名称时整段早退');
});

test('ADDCHARA_EX：16 被守卫拦截，17 从精确下界进入分发', async () => {
  const fixture = create_era_fixture();
  const { add_chara_ex, chara_ex } = fixture.load_module('chara/chara-ex');
  const called = [];
  chara_ex.register(16, (cid) => called.push(cid));
  chara_ex.register(17, (cid) => called.push(cid));

  assert.equal(await add_chara_ex(16), 0);
  assert.deepEqual(called, []);
  await add_chara_ex(17);
  assert.deepEqual(called, [17]);
});

test('EXCOM：名称表与八个 CHARA_EX 写槽逐项对应', async () => {
  const fixture = create_era_fixture();
  const ex = fixture.load_module('chara/chara-ex');
  assert.equal(ex.ex_talentname_init(), true);
  assert.deepEqual(
    [
      0, 1, 2, 3, 4, 101, 102, 103, 104, 200, 223, 777, 801, 901, 902, 903, 904,
    ].map((id) => [id, ex.ex_talentname(id)]),
    [
      [0, '灵魂错位'],
      [1, '近卫'],
      [2, '后代'],
      [3, '魔王替身'],
      [4, '狂王替身'],
      [101, '琼'],
      [102, '普林希斯'],
      [103, '嘉德'],
      [104, '菲娅'],
      [200, '魔王'],
      [223, '丽塔'],
      [777, '卡拉'],
      [801, '无双'],
      [901, '一人军团'],
      [902, '魔女'],
      [903, '魔界公主'],
      [904, '天神'],
    ],
  );

  for (const cid of [0, 31, 32, 33, 34, 35, 223, 777]) {
    await ex.add_chara_ex(cid);
  }
  for (const key of [
    'ex_talent:0:200',
    'ex_talent:31:101',
    'ex_talent:32:102',
    'ex_talent:33:103',
    'ex_talent:34:4',
    'ex_talent:34:801',
    'ex_talent:34:901',
    'ex_talent:35:104',
    'ex_talent:223:223',
    'ex_talent:777:777',
  ]) {
    assert.equal(fixture.store.get(key), 1, key);
  }
});

test('TATOO：只收集 10..19 的非空刺青，并排除狂王纹章', () => {
  const fixture = create_era_fixture();
  const { get_tatoo, tatoo_locate_name } = fixture.load_module(
    'dungeon/dungeon-battle2',
  );
  fixture.store.set('cstr:17:10', '脸纹');
  fixture.store.set('cstr:17:11', '狂王的纹章');
  fixture.store.set('cstr:17:12', '翼纹');
  fixture.store.set('cstr:17:19', '尾纹');
  fixture.store.set('cstr:17:20', '越界纹');

  assert.deepEqual(get_tatoo(17), [10, 12, 19]);
  assert.equal(tatoo_locate_name(10), '脸');
  assert.deepEqual(
    Array.from({ length: 8 }, (_, offset) => tatoo_locate_name(offset + 10)),
    ['脸', '胸', '背', '下腹', '屁股', '性器', '肛门', '大腿'],
  );
  assert.equal(tatoo_locate_name(9), '');
  assert.equal(tatoo_locate_name(18), '');
});

test('DUNGEON_SPY：刺青炫耀只在有可选图案时输出', async () => {
  for (const [tattoos, expected] of [
    [[], undefined],
    [[[10, '脸纹']], undefined],
    [
      [
        [10, '脸纹'],
        [12, '背纹'],
      ],
      '『背纹』的脸的刺青',
    ],
    [[[12, '背纹']], '『背纹』的背的刺青'],
  ]) {
    const { fixture, battle } = setup_spy_tattoo(tattoos);
    await battle.dungeon_spy(1, () => 0);
    const boast = fixture
      .text_lines()
      .find((line) => line.includes('炫耀般地露出'));
    if (expected === undefined) assert.equal(boast, undefined);
    else assert(boast.includes(expected));
  }
});

test('DRAW_EXT_COMM：两种彩条保留填充宽度、渐变颜色与配色表', () => {
  const fixture = create_era_fixture();
  const draw = fixture.load_module('page/components/menu-button');

  draw.print_colorbar(40, 100, 8, '*', '.', 0xf06050, 0x701000);
  assert.equal(fixture.text_lines()[0], '***.....');
  assert.deepEqual(fixture.lines[0].content, [
    { content: '***', color: '#f06050' },
    { content: '.....', color: '#701000' },
  ]);

  draw.print_colorbar2(100, 100, 3, '#', '.', 0x6666ff, 0, 1);
  assert.equal(fixture.text_lines()[1], '###');
  assert.deepEqual(
    fixture.lines[1].content.map((part) => part.color),
    ['#6666ff', '#6666fe', '#6666fd'],
  );
  assert.deepEqual(draw.bar_color_set('红'), {
    foreground: 0xc07070,
    background: 0x502020,
  });
  assert.deepEqual(draw.bar_color_set('未知'), {
    foreground: 0xc0c0c0,
    background: 0x202020,
  });
});

test('PRINT_COLORBAR2：临界值、空格颜色与 1/32 步长可观测', () => {
  const fixture = create_era_fixture();
  const { print_colorbar2 } = fixture.load_module(
    'page/components/menu-button',
  );

  print_colorbar2(32, 33, 1, '*', '.', 0x123, 0x1000001, 1);
  print_colorbar2(31.98, 33, 1, '*', '.', 0x123, 0x1000001, 1);
  print_colorbar2(31, 33, 1, '*', '.', 0x123, 0x1000001, 1);

  assert.deepEqual(fixture.text_lines(), ['*', '.', '.']);
  assert.equal(fixture.lines[0].content[0].color, '#000123');
  assert.equal(fixture.lines[1].content[0].color, '#000001');
  assert.equal(fixture.lines[2].content[0].color, '#000001');
  assert.equal(fixture.lines.length, 3, '每条宽度为 1，不得多输出一格');
});

test('BARCOLORSET：十种命名色与默认色逐项对应', () => {
  const fixture = create_era_fixture();
  const { bar_color_set } = fixture.load_module('page/components/menu-button');
  assert.deepEqual(
    Object.fromEntries(
      [
        '深红',
        '红',
        '蓝',
        '藏青',
        '绿',
        '紫',
        '黄',
        '粉',
        '青绿',
        '灰',
        '未知',
      ].map((name) => [name, bar_color_set(name)]),
    ),
    {
      深红: { foreground: 0xf06050, background: 0x701000 },
      红: { foreground: 0xc07070, background: 0x502020 },
      蓝: { foreground: 0x7070c0, background: 0x202050 },
      藏青: { foreground: 0x6666ff, background: 0x000000 },
      绿: { foreground: 0x66dd66, background: 0x205020 },
      紫: { foreground: 0xc070c0, background: 0x502050 },
      黄: { foreground: 0xc0b050, background: 0x505020 },
      粉: { foreground: 0xffccff, background: 0x300020 },
      青绿: { foreground: 0x70c0c0, background: 0x205050 },
      灰: { foreground: 0x666666, background: 0x333333 },
      未知: { foreground: 0xc0c0c0, background: 0x202020 },
    },
  );
});

test('MENU_BUTTON：前缀、快捷键与明暗参数原样交给引擎', () => {
  const fixture = create_era_fixture();
  const { menu_button, MENU_BUTTON_DIM_COLOR } = fixture.load_module(
    'page/components/menu-button',
  );

  menu_button('调教目标', 496, true);
  menu_button('助手', 497, false);
  const [dim, lit] = fixture.lines;

  assert.equal(MENU_BUTTON_DIM_COLOR, '#bbbbbb');
  assert.equal(dim.text, '▌调教目标');
  assert.equal(dim.accelerator, 496);
  assert.equal(dim.color, MENU_BUTTON_DIM_COLOR);
  assert.equal(dim.rendered, '[496] ▌调教目标');
  assert.equal(lit.text, '▌助手');
  assert.equal(lit.accelerator, 497);
  assert.equal(lit.color, undefined);
  assert.equal(lit.rendered, '[497] ▌助手');
});

test('PRINT_COLORBAR：超上限、零值与零上限仍保持定宽输出', () => {
  const fixture = create_era_fixture();
  const { print_colorbar } = fixture.load_module('page/components/menu-button');

  print_colorbar(125, 100, 4, '*', '.', 0xffffff, 0);
  print_colorbar(0, 100, 4, '*', '.', 0xffffff, 0);
  print_colorbar(1, 0, 4, '*', '.', 0xffffff, 0);

  assert.deepEqual(fixture.text_lines(), ['****', '....', '****']);
  assert.deepEqual(fixture.lines[0].content, [
    { content: '****', color: '#ffffff' },
  ]);
  assert.deepEqual(fixture.lines[1].content, [
    { content: '....', color: '#000000' },
  ]);
  assert.deepEqual(fixture.lines[2].content, [
    { content: '****', color: '#ffffff' },
  ]);
});

test('IKAI_BONUS：异界综合征只生成原作临时倍率，覆盖五档与边界', () => {
  const fixture = create_era_fixture();
  const ikai = fixture.load_module('system/otherworld-bonus');
  for (const [level, overall] of [
    [1, 95],
    [2, 90],
    [3, 80],
    [4, 70],
    [5, 60],
    [6, 0],
  ]) {
    fixture.store.set('mark:17:10', level);
    assert.deepEqual(ikai.ikai_source_check(17), {
      overall,
      factors: [100, 100, 100, 100, 100, 100],
    });
  }
  for (const level of [0, -1]) {
    fixture.store.set('mark:17:10', level);
    assert.equal(ikai.ikai_source_check(17), undefined);
  }
  assert.equal(ikai.ikai_undou_bonus(), undefined);
  assert.equal(ikai.ikai_kansei_bonus(), undefined);
  assert.equal(ikai.ikai_benkyou_bonus(), undefined);
  assert.equal(ikai.ikai_sentou_bonus(), undefined);
});

test('NTR_VIDEO：脱离分支恢复侵攻状态并钳制善恶值', async () => {
  const { fixture, ntr } = setup_ntr();
  fixture.store.set('cflag:17:1', 9);
  fixture.store.set('cflag:17:151', -70);

  assert.equal(await ntr.ntr_video(17, seq([0])), 0);
  assert.equal(fixture.store.get('cflag:17:1'), 2);
  assert.equal(fixture.store.get('cflag:17:501'), 1);
  assert.equal(fixture.store.get('cflag:17:502'), 0);
  assert.equal(fixture.store.get('cflag:17:508'), 3);
  assert.equal(fixture.store.get('cflag:17:151'), -50);
  assert.equal(fixture.store.get('cflag:17:2'), 20);
  assert(fixture.text_lines().some((line) => line.includes('往地下城出发了')));
});

test('NTR_PLAY：处女分支按随机顺序进入肛交或破处并写回经验', async () => {
  const anal = setup_ntr();
  anal.fixture.store.set('talent:17:0', 1);
  anal.fixture.store.set('flag:500', 1);
  await anal.ntr.ntr_play(17, seq([0]));
  assert.equal(anal.fixture.store.get('exp:17:1'), 10);
  assert.equal(anal.fixture.store.get('exp:17:40'), 5);
  assert.equal(anal.fixture.store.get('juel:17:2'), 2000);
  assert.equal(anal.fixture.store.get('juel:17:5'), 2500);

  const virgin = setup_ntr();
  virgin.fixture.store.set('talent:17:0', 1);
  await virgin.ntr.ntr_play(17, seq([1, 3]));
  assert.equal(virgin.fixture.store.get('talent:17:0'), 0);
  assert.equal(virgin.fixture.store.get('talent:17:280'), 1);
  assert.equal(virgin.fixture.store.get('cflag:17:15'), 105);
  assert.equal(virgin.fixture.store.get('cstr:17:13'), '狂王的纹章');
  assert.equal(virgin.fixture.store.get('exp:17:0'), 3);
});

test('NTR_PLAY：兽交与四种常规影像保留各自副作用和末尾等待', async () => {
  const beast = setup_ntr();
  beast.fixture.store.set('abl:17:39', 1);
  beast.fixture.store.set('flag:5', 4);
  await beast.ntr.ntr_play(17, seq([0]));
  assert.equal(beast.fixture.store.get('exp:17:0'), 20);
  assert.equal(beast.fixture.store.get('exp:17:56'), 20);
  assert.equal(beast.fixture.store.get('cflag:17:106'), 10);

  const cases = [
    {
      pick: 0,
      flag500: 1,
      exp: ['exp:17:0', 10],
      cflag: ['cflag:17:16', 993],
    },
    { pick: 1, exp: ['exp:17:1', 10], cflag: ['cflag:17:105', 10] },
    { pick: 2, exp: ['exp:17:1', 20], cflag: ['cflag:17:105', 10] },
    { pick: 3, exp: ['exp:17:22', 3], cflag: ['cflag:17:16', 993] },
  ];
  for (const item of cases) {
    const current = setup_ntr();
    current.fixture.store.set('flag:5', 4);
    current.fixture.store.set('flag:500', item.flag500 ?? 0);
    current.fixture.store.set('cflag:17:16', -1);
    await current.ntr.ntr_play(17, seq([1, item.pick]));
    assert.equal(current.fixture.store.get(item.exp[0]), item.exp[1]);
    assert.equal(current.fixture.store.get(item.cflag[0]), item.cflag[1]);
    assert.equal(current.fixture.inputs_consumed.at(-1)?.api, 'waitAnyKey');
  }
});

test('NTR_VIDEO：影像结束后按既有珠和经验提升三项能力', async () => {
  const { fixture, ntr } = setup_ntr();
  fixture.store.set('cflag:17:1', 9);
  fixture.store.set('flag:500', 1);
  fixture.store.set('exp:17:0', 2);
  fixture.store.set('exp:17:1', 2);
  fixture.store.set('juel:17:1', 10);
  fixture.store.set('juel:17:2', 10);
  fixture.store.set('juel:17:5', 10);

  await ntr.ntr_video(17, seq([1, 1, 3]));
  assert.equal(fixture.store.get('abl:17:2'), 1);
  assert.equal(fixture.store.get('abl:17:3'), 1);
  assert.equal(fixture.store.get('abl:17:11'), 1);
  assert.equal(fixture.store.get('juel:17:1'), 9);
  assert.equal(fixture.store.get('juel:17:2'), 9);
  assert.equal(fixture.store.get('juel:17:5'), 1255);
});

test('NTR_VIDEO：欲望出价的全部素质倍率独立生效', async () => {
  assert.deepEqual(await run_desire_offer(), { upgraded: true, cost: 12000 });
  for (const [key, cost] of [
    ['talent:17:20', 14400], // 克制 1.2
    ['talent:17:24', 13200], // 保守的 1.1
    ['talent:17:30', 18000], // 看重贞操 1.5
    ['talent:17:31', 11400], // 看轻贞操 0.95
    ['talent:17:32', 18000], // 压抑 1.5
    ['talent:17:33', 10800], // 开放 0.9
    ['talent:17:34', 18000], // 抵抗 1.5
    ['talent:17:35', 13200], // 害羞 1.1
    ['talent:17:36', 11400], // 不知羞耻 0.95
    ['talent:17:70', 9600], // 接受快感 0.8
    ['talent:17:71', 18000], // 否定快感 1.5
    ['talent:17:72', 11400], // 容易上瘾 0.95
    ['talent:17:73', 6000], // 容易陷落 0.5
    ['talent:17:76', 8400], // 淫乱 0.7
    ['talent:17:180', 10800], // 妓女 0.9
    ['talent:17:181', 9600], // 倾城 0.8
    ['talent:17:157', 9600], // 人妻 0.8
  ]) {
    assert.deepEqual(await run_desire_offer({ values: { [key]: 1 } }), {
      upgraded: true,
      cost,
    });
  }
});

test('NTR_VIDEO：欲望零到九级的基础出价逐档可观测', async () => {
  for (const [level, cost] of [
    [0, 5],
    [1, 50],
    [2, 1000],
    [3, 5000],
    [4, 12000],
    [5, 10000],
    [6, 15000],
    [7, 25000],
    [8, 40000],
    [9, 75000],
  ]) {
    const values = level >= 5 ? { 'talent:17:73': 1 } : {};
    assert.deepEqual(await run_desire_offer({ level, values }), {
      upgraded: true,
      cost,
    });
  }
});

test('NTR_VIDEO：欲望出价的互斥分支、戒备分档和下限保持原作数值', async () => {
  for (const [values, cost] of [
    [{ 'talent:17:30': 1, 'talent:17:31': 1 }, 18000],
    [{ 'talent:17:32': 1, 'talent:17:33': 1 }, 18000],
    [{ 'talent:17:35': 1, 'talent:17:36': 1 }, 13200],
    [{ 'talent:17:70': 1, 'talent:17:71': 1 }, 9600],
  ]) {
    assert.equal((await run_desire_offer({ values })).cost, cost);
  }

  for (const [level, values, cost] of [
    [0, { 'talent:17:27': 1 }, 5],
    [3, { 'talent:17:27': 1 }, 7500],
    [4, { 'talent:17:27': 1 }, 24000],
    [5, { 'talent:17:27': 1, 'talent:17:73': 1 }, 25000],
    [6, { 'talent:17:27': 1, 'talent:17:73': 1 }, 45000],
  ]) {
    assert.equal((await run_desire_offer({ level, values })).cost, cost);
  }

  assert.equal(
    (
      await run_desire_offer({
        level: 0,
        values: {
          'talent:17:31': 1,
          'talent:17:33': 1,
          'talent:17:36': 1,
          'talent:17:70': 1,
          'talent:17:72': 1,
          'talent:17:73': 1,
          'talent:17:76': 1,
          'talent:17:180': 1,
          'talent:17:181': 1,
          'talent:17:157': 1,
        },
      })
    ).cost,
    1,
  );
});

test('NTR_VIDEO：欲望等级与异常经验门槛两侧均可观测', async () => {
  assert.equal((await run_desire_offer({ level: 5 })).upgraded, false);
  assert.equal(
    (await run_desire_offer({ level: 5, values: { 'talent:17:73': 1 } }))
      .upgraded,
    true,
  );
  assert.equal(
    (await run_desire_offer({ level: 5, values: { 'talent:17:76': 1 } }))
      .upgraded,
    true,
  );
  assert.equal(
    (await run_desire_offer({ level: 10, values: { 'talent:17:73': 1 } }))
      .upgraded,
    false,
  );
  assert.equal(
    (await run_desire_offer({ level: 9, values: { 'talent:17:73': 1 } }))
      .upgraded,
    true,
  );
  for (const key of ['talent:17:73', 'talent:17:76']) {
    assert.equal(
      (
        await run_desire_offer({
          level: 7,
          abnormal: 0,
          values: { [key]: 1 },
        })
      ).upgraded,
      true,
      '七级能绕过早退的素质也会清除异常经验门槛',
    );
  }

  assert.equal((await run_desire_offer({ abnormal: 0 })).upgraded, false);
  assert.equal((await run_desire_offer({ abnormal: 1 })).upgraded, true);
  for (const key of [
    'talent:17:33',
    'talent:17:70',
    'talent:17:73',
    'talent:17:76',
    'talent:17:123',
  ]) {
    assert.equal(
      (await run_desire_offer({ abnormal: 0, values: { [key]: 1 } })).upgraded,
      true,
    );
  }
  assert.equal(
    (
      await run_desire_offer({
        values: { 'juel:17:5': 10749 },
      })
    ).upgraded,
    false,
  );
});

test('NTR_VIDEO：状态、随机、妊娠与角色 ID 共同决定是否脱离', async () => {
  const inactive = setup_ntr();
  await inactive.ntr.ntr_video(17, () => {
    assert.fail('非 NTR 状态不应消费随机数');
  });
  assert.deepEqual(inactive.fixture.text_lines(), []);

  const pregnant = setup_ntr();
  seed_values(pregnant.fixture, {
    'cflag:17:1': 9,
    'talent:17:153': 1,
  });
  const pregnant_rand = seq_with_bounds([
    [6, 0],
    [10, 1],
    [4, 3],
  ]);
  await pregnant.ntr.ntr_video(17, pregnant_rand);
  pregnant_rand.assert_exhausted();
  assert.equal(pregnant.fixture.store.get('cflag:17:1'), 9);

  const zero = create_era_fixture();
  zero.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  zero.era.addCharacter(0);
  zero.store.set('cflag:0:1', 9);
  const zero_rand = seq_with_bounds([
    [6, 0],
    [10, 1],
    [4, 3],
  ]);
  await zero.load_module('system/ntr').ntr_video(0, zero_rand);
  zero_rand.assert_exhausted();
  assert.equal(zero.store.get('cflag:0:1'), 9);

  for (const karma of [-50, -20]) {
    const current = setup_ntr();
    seed_values(current.fixture, {
      'cflag:17:1': 9,
      'cflag:17:151': karma,
    });
    const current_rand = seq_with_bounds([[6, 0]]);
    await current.ntr.ntr_video(17, current_rand);
    current_rand.assert_exhausted();
    assert.equal(current.fixture.store.get('cflag:17:151'), karma);
  }
});

test('NTR_PLAY：特别服装和私处封印均能独立进入肛交影像', async () => {
  for (const values of [
    { 'cflag:17:42': 79, 'cflag:17:40': 64, 'flag:37': 1 },
    { 'talent:17:273': 1 },
  ]) {
    const current = setup_ntr();
    seed_values(current.fixture, values);
    await current.ntr.ntr_play(17, seq([]));
    assert.equal(current.fixture.store.get('juel:17:2'), 2000);
    assert.equal(current.fixture.store.get('juel:17:5'), 2500);
    assert(
      !current.fixture.inputs_consumed.some(({ api }) => api === 'waitAnyKey'),
    );
  }

  for (const values of [
    { 'cflag:17:42': 78, 'cflag:17:40': 64, 'flag:37': 1 },
    { 'cflag:17:42': 79, 'cflag:17:40': 63, 'flag:37': 1 },
    { 'cflag:17:42': 79, 'cflag:17:40': 64, 'flag:37': 0 },
  ]) {
    const current = setup_ntr();
    seed_values(current.fixture, values);
    await current.ntr.ntr_play(17, seq([1, 3]));
    assert.equal(current.fixture.store.get('juel:17:2') || 0, 0);
  }
});

test('NTR_PLAY：肛交影像按狂王性别写入精液或百合经验', async () => {
  for (const [gender, semen, lily] of [
    [0, 10, 0],
    [1, 0, 5],
    [2, 10, 0],
  ]) {
    const current = setup_ntr();
    seed_values(current.fixture, {
      'talent:17:0': 1,
      'flag:500': gender,
    });
    await current.ntr.ntr_play(17, seq([0]));
    assert.equal(current.fixture.store.get('exp:17:1'), 10);
    assert.equal(current.fixture.store.get('exp:17:20') || 0, semen);
    assert.equal(current.fixture.store.get('exp:17:40') || 0, lily);
    assert.equal(current.fixture.store.get('juel:17:2'), 2000);
    assert.equal(current.fixture.store.get('juel:17:5'), 2500);
  }
});

test('NTR_PLAY：破处与兽交影像的全部数值和早退行为可观测', async () => {
  const virgin = setup_ntr();
  virgin.fixture.store.set('talent:17:0', 1);
  await virgin.ntr.ntr_play(17, seq([1, 7]));
  assert.equal(virgin.fixture.store.get('exp:17:0'), 3);
  assert.equal(virgin.fixture.store.get('juel:17:1'), 600);
  assert.equal(virgin.fixture.store.get('juel:17:5'), 750);
  assert.equal(virgin.fixture.store.get('cflag:17:15'), 105);
  assert.equal(virgin.fixture.store.get('talent:17:280'), 1);
  assert.equal(virgin.fixture.store.get('cstr:17:17'), '狂王的纹章');
  assert(
    !virgin.fixture.inputs_consumed.some(({ api }) => api === 'waitAnyKey'),
  );

  for (const [man, config, vaginal, anal, inner] of [
    [0, 0, 20, 0, 0],
    [0, 4, 20, 0, 10],
    [1, 4, 0, 20, 10],
  ]) {
    const current = setup_ntr();
    seed_values(current.fixture, {
      'abl:17:39': 1,
      'talent:17:122': man,
      'flag:5': config,
    });
    const current_rand = seq_with_bounds([[10, 0]]);
    await current.ntr.ntr_play(17, current_rand);
    current_rand.assert_exhausted();
    assert.equal(current.fixture.store.get('exp:17:0') || 0, vaginal);
    assert.equal(current.fixture.store.get('exp:17:1') || 0, anal);
    assert.equal(current.fixture.store.get('exp:17:20'), 20);
    assert.equal(current.fixture.store.get('exp:17:56'), 20);
    assert.equal(current.fixture.store.get('juel:17:1') || 0, man ? 0 : 4000);
    assert.equal(current.fixture.store.get('juel:17:5'), 5000);
    assert.equal(current.fixture.store.get('cflag:17:106') || 0, inner);
    assert(
      !current.fixture.inputs_consumed.some(({ api }) => api === 'waitAnyKey'),
    );
  }
});

test('NTR_PLAY：四种常规影像的经验、珠、射精标记和初吻完整落盘', async () => {
  const cases = [
    {
      pick: 0,
      values: { 'flag:5': 4, 'cflag:17:16': -1 },
      expected: {
        'exp:17:0': 5,
        'exp:17:20': 5,
        'juel:17:1': 1000,
        'juel:17:5': 1250,
        'cflag:17:108': 10,
        'cflag:17:16': 993,
      },
    },
    {
      pick: 1,
      values: { 'flag:5': 4 },
      expected: {
        'exp:17:0': 10,
        'exp:17:1': 10,
        'exp:17:20': 10,
        'juel:17:1': 2000,
        'juel:17:2': 2000,
        'juel:17:5': 2500,
        'cflag:17:105': 10,
      },
    },
    {
      pick: 2,
      values: { 'flag:5': 4 },
      expected: {
        'exp:17:0': 20,
        'exp:17:1': 20,
        'exp:17:20': 20,
        'juel:17:1': 4000,
        'juel:17:2': 4000,
        'juel:17:5': 5000,
        'cflag:17:105': 10,
      },
    },
    {
      pick: 3,
      values: { 'cflag:17:16': -1 },
      expected: {
        'exp:17:22': 3,
        'exp:17:20': 3,
        'juel:17:5': 1250,
        'cflag:17:16': 993,
      },
    },
  ];
  for (const { pick, values, expected } of cases) {
    const current = setup_ntr();
    seed_values(current.fixture, values);
    await current.ntr.ntr_play(17, seq([1, pick]));
    for (const [key, value] of Object.entries(expected))
      assert.equal(current.fixture.store.get(key), value, key);
    assert.equal(current.fixture.inputs_consumed.at(-1)?.api, 'waitAnyKey');
  }
});

test('NTR_PLAY：七种影像向性格口上传入对应场景编号', async () => {
  for (const { scene, values, rolls } of [
    { scene: 1, values: { 'talent:17:0': 1 }, rolls: [1, 0] },
    { scene: 2, values: { 'talent:17:273': 1 }, rolls: [] },
    { scene: 3, values: { 'abl:17:39': 1 }, rolls: [0] },
    { scene: 4, values: {}, rolls: [1, 0] },
    { scene: 5, values: {}, rolls: [1, 1] },
    { scene: 6, values: {}, rolls: [1, 2] },
    { scene: 7, values: {}, rolls: [1, 3] },
  ]) {
    const current = setup_ntr();
    seed_values(current.fixture, { 'talent:17:165': 1, ...values });
    const scenes = [];
    const { ntr_koujo_family } =
      current.fixture.load_module('kojo/kojo-system');
    ntr_koujo_family.register(5, async (_rand, p) => scenes.push(p));
    await current.ntr.ntr_play(17, seq(rolls));
    assert.deepEqual(scenes, [scene]);
  }
});

test('NTR_PLAY：常规影像的男性与女狂王分支不共享副作用', async () => {
  for (const [pick, gender, expected] of [
    [0, 1, { 'exp:17:0': 5, 'exp:17:1': 5, 'exp:17:40': 5, 'juel:17:1': 1000 }],
    [1, 1, { 'exp:17:1': 10, 'exp:17:40': 5, 'juel:17:1': 0 }],
    [1, 0, { 'exp:17:1': 10, 'exp:17:20': 10, 'juel:17:1': 2000 }],
    [2, 0, { 'exp:17:1': 20, 'exp:17:20': 20, 'juel:17:1': 0 }],
    [3, 1, { 'exp:17:22': 0, 'exp:17:20': 0, 'cflag:17:16': -1 }],
  ]) {
    const current = setup_ntr();
    seed_values(current.fixture, {
      'talent:17:122': 1,
      'flag:500': gender,
      'flag:5': 4,
      'cflag:17:16': -1,
    });
    await current.ntr.ntr_play(17, seq([1, pick]));
    for (const [key, value] of Object.entries(expected))
      assert.equal(current.fixture.store.get(key) || 0, value, key);
  }
});

test('NTR_PLAY：正常与异常退出都恢复调教目标', async () => {
  const normal = setup_ntr();
  const normal_flag = normal.fixture.load_module('era-utils/era-flag');
  normal_flag.target = 3;
  await normal.ntr.ntr_play(17, seq([1, 3]));
  assert.equal(normal_flag.target, 3);

  const failure = setup_ntr();
  const failure_flag = failure.fixture.load_module('era-utils/era-flag');
  failure_flag.target = 3;
  failure.fixture.store.set('talent:17:165', 1);
  const { ntr_koujo_family } = failure.fixture.load_module('kojo/kojo-system');
  ntr_koujo_family.register(5, async () => {
    throw new Error('口上失败');
  });
  await assert.rejects(failure.ntr.ntr_play(17, seq([1, 3])), /口上失败/);
  assert.equal(failure_flag.target, 3);
});

test('NTR_CHILD_BIRTH：性别、四种父系与三种怪物结局全部可达', async () => {
  for (const [father, random_calls, text] of [
    [7, [], '十人之后就没数了'],
    [4, [], '连父亲都不知道'],
    [2, [], '在勇者之间配对'],
    [3, [], '在勇者之间配对'],
    [6, [[3, 0]], '当场被肢解'],
    [
      6,
      [
        [3, 1],
        [2, 0],
      ],
      '企图攻击狂王',
    ],
    [
      6,
      [
        [3, 1],
        [2, 1],
      ],
      '好几次，被摔死',
    ],
  ]) {
    const current = setup_ntr();
    current.fixture.load_module('era-utils/era-flag').target = 17;
    current.fixture.store.set('cflag:17:102', father);
    const current_rand = seq_with_bounds(random_calls);
    assert.equal(await current.ntr.ntr_child_birth(current_rand), 0);
    current_rand.assert_exhausted();
    assert(current.fixture.text_lines().some((line) => line.includes(text)));
  }

  const man = setup_ntr();
  man.fixture.load_module('era-utils/era-flag').target = 17;
  seed_values(man.fixture, { 'talent:17:122': 1, 'cflag:17:102': 7 });
  const man_rand = seq_with_bounds([]);
  await man.ntr.ntr_child_birth(man_rand);
  man_rand.assert_exhausted();
  assert(
    man.fixture.text_lines().some((line) => line.includes('以南人的身份')),
  );
});

test('NTR_VIDEO：感觉出价十档基表与高等级增长逐档可观测', async () => {
  for (const [level, cost, needed_exp] of [
    [0, 1, 2],
    [1, 20, 10],
    [2, 400, 30],
    [3, 8000, 75],
    [4, 20000, 150],
    [5, 32000, 144],
    [6, 48000, 200],
    [7, 72000, 280],
    [8, 96000, 400],
    [9, 144000, 480],
  ]) {
    const values = level >= 5 ? { 'talent:17:75': 1 } : {};
    assert.deepEqual(
      await run_sensation_offer({ level, experience: needed_exp, values }),
      { upgraded: true, cost },
    );
    assert.equal(
      (
        await run_sensation_offer({
          level,
          experience: needed_exp - 1,
          values,
        })
      ).upgraded,
      false,
    );
  }

  for (const [level, blocks, cost, needed_exp] of [
    [10, [101], 168000, 524],
    [14, [101], 439452, 963],
    [15, [101, 105], 324352, 880],
    [19, [101, 105], 720616, 1920],
    [20, [101, 105, 107], 500602, 1844],
    [24, [101, 105, 107], 938095, 4737],
  ]) {
    const values = { 'talent:17:75': 1 };
    for (const id of blocks) values[`talent:17:${id}`] = 2;
    assert.deepEqual(
      await run_sensation_offer({ level, experience: needed_exp, values }),
      { upgraded: true, cost },
    );
    assert.equal(
      (
        await run_sensation_offer({
          level,
          experience: needed_exp - 1,
          values,
        })
      ).upgraded,
      false,
    );
  }
});

test('NTR_VIDEO：感觉出价的封锁计数、分档与三种折扣均有反向样本', async () => {
  assert.equal((await run_sensation_offer({ level: 5 })).upgraded, false);
  assert.equal(
    (await run_sensation_offer({ level: 5, values: { 'talent:17:75': 1 } }))
      .upgraded,
    true,
  );
  assert.equal(
    (await run_sensation_offer({ values: { 'talent:17:103': 2 } })).upgraded,
    false,
  );
  assert.deepEqual(
    await run_sensation_offer({ values: { 'talent:17:103': 1 } }),
    { upgraded: true, cost: 9600 },
  );
  assert.equal(
    (
      await run_sensation_offer({
        experience: 81,
        values: { 'talent:17:103': 1 },
      })
    ).upgraded,
    false,
  );
  assert.deepEqual(
    await run_sensation_offer({
      experience: 82,
      values: { 'talent:17:103': 1 },
    }),
    { upgraded: true, cost: 9600 },
  );

  for (const [values, cost] of [
    [{ 'talent:17:27': 1 }, 8000],
    [{ 'talent:17:76': 1 }, 6400],
    [{ 'talent:17:75': 1 }, 6400],
    [{ 'talent:17:104': 1 }, 6400],
  ]) {
    assert.equal((await run_sensation_offer({ values })).cost, cost);
  }

  for (const [level, block_ids, upgraded] of [
    [10, [], false],
    [10, [101], true],
    [15, [101], false],
    [15, [101, 105], true],
    [20, [101, 105], false],
    [20, [101, 105, 107], true],
    [25, [101, 105, 107], false],
  ]) {
    const values = { 'talent:17:75': 1 };
    for (const id of block_ids) values[`talent:17:${id}`] = 2;
    assert.equal(
      (await run_sensation_offer({ level, values })).upgraded,
      upgraded,
    );
  }

  assert.equal(
    (
      await run_sensation_offer({
        level: 10,
        values: { 'talent:17:75': 1, 'talent:17:101': 1 },
      })
    ).upgraded,
    false,
    '封锁位只认数值 2',
  );
});

test('NTR_VIDEO：感觉戒备倍率、下限与珠经验双门槛均可观测', async () => {
  for (const [level, cost, needed_exp] of [
    [3, 8000, 75],
    [4, 40000, 300],
    [5, 80000, 360],
    [6, 144000, 600],
  ]) {
    const values = {
      'talent:17:27': 1,
      ...(level >= 5 ? { 'talent:17:75': 1 } : {}),
    };
    assert.deepEqual(
      await run_sensation_offer({ level, experience: needed_exp, values }),
      { upgraded: true, cost },
    );
  }

  assert.deepEqual(
    await run_sensation_offer({
      level: 0,
      experience: 1,
      values: {
        'talent:17:75': 1,
        'talent:17:76': 1,
        'talent:17:104': 1,
      },
    }),
    { upgraded: true, cost: 1 },
  );
  assert.equal(
    (await run_sensation_offer({ juel: 7999, experience: 75 })).upgraded,
    false,
  );
  assert.equal(
    (await run_sensation_offer({ juel: 8000, experience: 74 })).upgraded,
    false,
  );
  assert.equal(
    (await run_sensation_offer({ juel: 8000, experience: 75 })).upgraded,
    true,
  );
  assert.equal(
    (
      await run_sensation_offer({
        kind: 'vaginal',
        level: 0,
        values: { 'talent:17:122': 1 },
      })
    ).upgraded,
    false,
  );
  assert.equal(
    (
      await run_sensation_offer({
        kind: 'anal',
        level: 0,
        values: { 'talent:17:122': 1 },
      })
    ).upgraded,
    true,
  );
});

test('MAOUNET：INPORT_B 按原作字段格式写入通信记录并跳过重复勇者', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(17, { id: 17, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(17);
  fixture.store.set('cflag:17:190', 12345);
  fixture.store.set('cflag:17:9', 4);
  fixture.store.set('abl:17:2', 3);
  fixture.store.set('base:17:0', 500);
  fixture.store.set('maxbase:17:0', 600);
  fixture.store.set('cstr:17:12', '翼纹');
  await fixture.era.saveData(999, '操作');
  const net = fixture.load_module('system/cross-save-sharing');

  assert.equal(await net.inport_b(), 1);
  const records = JSON.parse(fixture.store.get('global:100'));
  assert.equal(records.length, 1);
  assert.match(records[0], /^12345_17_4_玛奥_2,3\/_0,500\/_0,600\/_/);
  assert.match(records[0], /_12,翼纹\/$/);
  assert.equal(await net.inport_b(), 0, '同一唯一标记不得重复登记');
  assert.equal(JSON.parse(fixture.store.get('global:100')).length, 1);
});

test('MAOUNET：通信记录扫描每张表的首尾声明下标', () => {
  const { fixture, net } = setup_communication([17]);
  fixture.store.set('cflag:17:190', 12345);
  const tables = [
    ['abl', 110],
    ['base', 100],
    ['maxbase', 100],
    ['cflag', 1000],
    ['exp', 100],
    ['equip', 100],
    ['juel', 100],
    ['talent', 10000],
    ['mark', 100],
    ['cstr', 100],
  ];
  for (const [table, size] of tables) {
    fixture.store.set(`${table}:17:0`, -1);
    fixture.store.set(`${table}:17:${size - 1}`, size);
  }

  const fields = net.serialize_character(17).split('_');
  assert.deepEqual(fields.slice(0, 4), ['12345', '17', '17', '角色17']);
  for (const [index, [, size]] of tables.entries()) {
    assert(fields[index + 4].includes('0,-1/'));
    assert(fields[index + 4].includes(`${size - 1},${size}/`));
  }
});

test('MAOUNET：名册 50 人仍可追加，99 人只接收一人后报满', async () => {
  const fifty = setup_communication([17]);
  fifty.fixture.store.set(
    'global:100',
    JSON.stringify(Array.from({ length: 50 }, (_, id) => `${id}_记录`)),
  );
  fifty.fixture.store.set('cflag:17:190', 5000);
  await fifty.fixture.era.saveData(999, '操作');
  assert.equal(await fifty.net.inport_b(), 1);
  assert.equal(JSON.parse(fifty.fixture.store.get('global:100')).length, 51);

  const ninety_nine = setup_communication([17, 18]);
  ninety_nine.fixture.store.set(
    'global:100',
    JSON.stringify(Array.from({ length: 99 }, (_, id) => `${id}_记录`)),
  );
  ninety_nine.fixture.store.set('cflag:17:190', 5000);
  ninety_nine.fixture.store.set('cflag:18:190', 5001);
  await ninety_nine.fixture.era.saveData(999, '操作');
  assert.equal(await ninety_nine.net.inport_b(), 1);
  assert.equal(
    JSON.parse(ninety_nine.fixture.store.get('global:100')).length,
    100,
  );
  assert(
    ninety_nine.fixture.text_lines().some((line) => line.includes('已经满员')),
  );
});

test('MAOUNET：导出只保留去重后的前五名并生成角色唯一标记', async () => {
  const { fixture, net } = setup_communication([0, 17, 18, 19, 20, 21, 22]);
  const shared = {};
  const save_data = fixture.era.saveData;
  fixture.era.saveData = async (slot, comment) => {
    if (slot === 1000) {
      shared.characters = fixture.era.getAddedCharacters();
      shared.marks = shared.characters.map((cid) => [
        cid,
        fixture.store.get(`cflag:${cid}:190`),
      ]);
      shared.comment = comment;
    }
    return save_data(slot, comment);
  };

  assert.equal(
    await net.export_characters(
      [17, 17, 18, 19, 20, 21, 22],
      '测试队',
      () => 1000,
    ),
    5,
  );
  assert.deepEqual(shared.characters, [17, 18, 19, 20, 21]);
  assert.deepEqual(shared.marks, [
    [17, 1017],
    [18, 1018],
    [19, 1019],
    [20, 1020],
    [21, 1021],
  ]);
  assert(shared.comment.endsWith(' 测试队'));
});

test('MAOUNET：空选择时决定键不进入确认页', async () => {
  const { fixture, net } = setup_communication([0, 17]);
  fixture.store.set('cflag:17:1', 2);
  const inputs = [0, 0, 17, 99, 100, 9];
  fixture.era.input = async () => {
    assert(inputs.length > 0, '菜单不得额外索要输入');
    return inputs.shift();
  };
  assert.equal(await net.maounet(), 0);
  assert(
    !fixture.text_lines().some((line) => line.includes('0名勇者就可以了吗')),
  );
  assert.deepEqual(inputs, []);
});

test('MAOUNET：导出候选只显示据点内的非魔王角色', async () => {
  const { fixture, net } = setup_communication([0, 17, 18]);
  fixture.store.set('cflag:18:1', 2);
  fixture.set_inputs(0, 100, 9);

  assert.equal(await net.maounet(), 0);
  assert.deepEqual(
    fixture.lines_history
      .filter((line) => line.type === 'button' && /^角色\d+ LV/.test(line.text))
      .map(({ accelerator }) => accelerator),
    [17],
  );
});

test('MAOUNET：导出菜单覆盖选中、取消选中、五人上限与两层确认', async () => {
  const full = setup_communication([0, 17, 18, 19, 20, 21, 22]);
  full.fixture.set_inputs(0, 17, 18, 19, 20, 21, 22, 17, 99, 1, 100, 9);
  assert.equal(await full.net.maounet(), 0);
  assert(
    full.fixture.lines_history.some((line) =>
      line.text?.includes('一次最多送出5人'),
    ),
  );
  assert(
    full.fixture.lines_history.some((line) => line.text?.includes('4名勇者')),
  );

  const reject_name = setup_communication([17]);
  reject_name.fixture.set_inputs(0, 17, 99, 0, '队名', 1, 100, 9);
  assert.equal(await reject_name.net.maounet(), 0);
  assert(
    !reject_name.fixture.calls.some(
      ({ api, args }) => api === 'saveData' && args[0] === 1000,
    ),
  );

  const accept = setup_communication([17]);
  accept.fixture.set_inputs(0, 17, 99, 0, '队名', 0, 9);
  assert.equal(await accept.net.maounet(), 0);
  assert(
    accept.fixture.calls.some(
      ({ api, args }) => api === 'saveData' && args[0] === 1000,
    ),
  );
});

test('MAOUNET：导入菜单只接受 0..19 并尝试对应的 1000..1019 档', async () => {
  const fixture = create_era_fixture();
  const inputs = [-1, 20, 0, 19, 99];
  fixture.era.input = async () => {
    assert(inputs.length > 0, '导入菜单不得额外索要输入');
    return inputs.shift();
  };
  const net = fixture.load_module('system/cross-save-sharing');
  assert.equal(await net.inport_a(), 0);
  assert.deepEqual(
    fixture.calls
      .filter(({ api }) => api === 'loadData')
      .map(({ args }) => args[0]),
    [1000, 1019],
  );
  assert.equal(
    fixture.calls.filter(
      ({ api, args }) => api === 'saveData' && args[0] === 999,
    ).length,
    2,
  );
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'button' && line.text === 'SAVE1000.sav',
    ),
  );
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'button' && line.accelerator === 19,
    ),
  );

  const success = create_era_fixture();
  await success.era.saveData(1019, '共享队伍');
  success.set_inputs(19);
  const success_net = success.load_module('system/cross-save-sharing');
  assert.equal(await success_net.inport_a(), 0);
  assert.equal(success.load_module('era-utils/era-flag').last_load_no, 1019);
});

test('MAOUNET：通信菜单的导出、导入、等级上限与等级一分支均可达', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(0, 100, 1, 99, 3, -1, 4, 9);
  const { maounet } = fixture.load_module('system/cross-save-sharing');
  assert.equal(await maounet(), 0);
  assert.equal(fixture.store.get('flag:76'), -1);
  assert.equal(fixture.store.get('flag:77'), 1);
  assert.deepEqual(
    fixture.inputs_consumed.map(({ value }) => value),
    [0, 100, 1, 99, 3, -1, 4, 9],
  );
});

test('MAOUNET：菜单可切换通信勇者等级规则并清空公共记录', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('global:100', JSON.stringify(['旧记录']));
  fixture.set_inputs(4, 2, 9);
  const { maounet } = fixture.load_module('system/cross-save-sharing');

  assert.equal(await maounet(), 0);
  assert.equal(fixture.store.get('flag:77'), 1);
  assert.deepEqual(JSON.parse(fixture.store.get('global:100')), []);
  assert(
    fixture.calls.some((call) => call.api === 'saveGlobal'),
    '清空通信记录后必须持久化公共存档',
  );
});

test('MAOUNET：等级一开关连续点击两次回到关闭', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:77', 0);
  fixture.set_inputs(4, 4, 9);
  const { maounet } = fixture.load_module('system/cross-save-sharing');

  assert.equal(await maounet(), 0);
  assert.deepEqual(
    fixture.lines_history
      .filter(
        (line) =>
          line.type === 'button' &&
          line.text.startsWith('通信勇者登场时为等级1'),
      )
      .map(({ text }) => text),
    [
      '通信勇者登场时为等级1(现在:OFF)',
      '通信勇者登场时为等级1(现在:ON)',
      '通信勇者登场时为等级1(现在:OFF)',
    ],
  );
  assert.equal(fixture.store.get('flag:77'), 0);
});

test('MAOUNET：据点 888 接入真身，读档钩子保留 999 与 1000..1019 分支', async () => {
  const shop_fixture = create_era_fixture();
  shop_fixture.set_inputs(9);
  const shop = shop_fixture.load_module('page/page-shop');
  await shop.usershop(888);
  assert(!shop.STUBBED_CALLS.includes('MAOUNET'));
  assert(!shop_fixture.text_lines().some((line) => line.includes('存根')));
  assert(
    shop_fixture.lines_history.some(
      (line) => line.type === 'button' && line.text === '将奴隶共享到其他存档',
    ),
    '888 必须实际进入通信菜单',
  );

  const backup_fixture = create_era_fixture();
  const backup_net = backup_fixture.load_module('system/cross-save-sharing');
  let opened = 0;
  backup_net.maounet = async () => {
    opened += 1;
  };
  const backup_flag = backup_fixture.load_module('era-utils/era-flag');
  backup_flag.last_load_no = 999;
  backup_fixture.load_module('event/event-load');
  const backup_events = backup_fixture.load_module('system/event/registry');
  assert.equal(await backup_events.emit('EVENTLOAD'), 'SHOP');
  assert.equal(opened, 1);

  const share_fixture = create_era_fixture();
  const share_net = share_fixture.load_module('system/cross-save-sharing');
  let imported = 0;
  share_net.inport_b = async () => {
    imported += 1;
  };
  const share_flag = share_fixture.load_module('era-utils/era-flag');
  share_flag.last_load_no = 1019;
  share_fixture.load_module('event/event-load');
  const share_events = share_fixture.load_module('system/event/registry');
  await share_events.emit('EVENTLOAD');
  assert.equal(imported, 1);

  const select_fixture = create_era_fixture();
  await select_fixture.era.saveData(1000, '共享队伍');
  select_fixture.store.delete('global:saves:1000');
  select_fixture.set_inputs(0, 9);
  const select_net = select_fixture.load_module('system/cross-save-sharing');
  select_fixture.load_module('event/event-load');
  await assert.rejects(select_net.inport_a(), (error) => {
    assert.equal(error.name, 'BeginSignal');
    assert.equal(error.state, 'SHOP');
    return true;
  });
  const select_flag = select_fixture.load_module('era-utils/era-flag');
  assert.equal(select_flag.last_load_no, 999, '恢复操作档后必须重入 999 钩子');
  assert(
    select_fixture.lines_history.some(
      (line) => line.type === 'button' && line.accelerator === 0,
    ),
    '特殊档备注不在 0..99 的扫描面时仍须允许选择 SAVE1000.sav',
  );
});

test('TEST.ERB：整文件按已确认的无调用者缺陷登记，不接入结局日程', async () => {
  const trace = await import(
    pathToFileURL(path.resolve(__dirname, '../tools/trace-coverage.mjs'))
  );
  const ruling = trace.RULINGS.find(
    (item) => item.path === 'target/ERB/其他/TEST.ERB',
  );
  assert.match(ruling?.reason ?? '', /#14.*无调用者/);
});
