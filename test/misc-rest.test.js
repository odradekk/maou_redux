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

function setup_ntr() {
  const fixture = create_era_fixture();
  fixture.seed_chara(17, { id: 17, name: '玛奥', callname: '玛奥' });
  fixture.era.addCharacter(17);
  return { fixture, ntr: fixture.load_module('system/ntr') };
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
  assert.equal(tatoo_locate_name(16), '肛门');
  assert.equal(tatoo_locate_name(18), '');
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
