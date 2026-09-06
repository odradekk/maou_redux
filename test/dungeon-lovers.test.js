/**
 * LOVERS.ERB 四函数的行为测试（issue #341，阶段 5a L10）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function setup_world() {
  const fixture = create_era_fixture();
  for (const [id, name] of [
    [0, '你'],
    [1, '阿尔'],
    [2, '贝丝'],
  ]) {
    fixture.seed_chara(id, { id, name, callname: name });
    fixture.era.addCharacter(id);
  }
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('cflag:2:1', 0);
  fixture.store.set('cflag:1:6', 11);
  fixture.store.set('cflag:2:6', 12);
  return fixture;
}

function load(fixture) {
  return fixture.load_module('dungeon/dungeon-lovers');
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('NAME_LOVER：二十一种登记值可查，未知编号返回 0', () => {
  const fixture = setup_world();
  const { LOVER_NAMES, name_lover } = load(fixture);
  assert.equal(LOVER_NAMES.size, 21);
  for (const lover of LOVER_NAMES.keys()) assert.equal(name_lover(lover), 1);
  assert.equal(name_lover(20), 0);
  assert.equal(name_lover(-1), 0);
  name_lover(62, 1);
  assert(text_lines(fixture).at(-1).includes('戴眼镜的男学生'));
});

test('ENTER_LOVER：无效输入重问；换类型写恋人并重置爱情', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:606', 1);
  fixture.store.set('cflag:1:607', 39);
  fixture.set_inputs(19, 23);
  assert.equal(await load(fixture).enter_lover(1), 1);
  assert.equal(fixture.store.get('cflag:1:606'), 23);
  assert.equal(fixture.store.get('cflag:1:607'), 0);
  const buttons = fixture.lines_history.filter(
    (line) => line.type === 'button',
  );
  assert(buttons.some((button) => button.accelerator === 23));
  assert(buttons.some((button) => button.accelerator === 999));
});

test('ENTER_LOVER：同一类型不重置爱情，取消不写状态', async () => {
  const same = setup_world();
  same.store.set('cflag:1:606', 3);
  same.store.set('cflag:1:607', 8);
  same.set_inputs(3);
  await load(same).enter_lover(1);
  assert.equal(same.store.get('cflag:1:607'), 8);

  const cancelled = setup_world();
  cancelled.store.set('cflag:1:606', 4);
  cancelled.set_inputs(999);
  assert.equal(await load(cancelled).enter_lover(1), 0);
  assert.equal(cancelled.store.get('cflag:1:606'), 4);
});

test('ENTER_LOVER：自由输入保留隐藏的角色恋人编号 200', async () => {
  const fixture = setup_world();
  fixture.set_inputs(200);
  assert.equal(await load(fixture).enter_lover(1), 1);
  assert.equal(fixture.store.get('cflag:1:606'), 200);
  assert(
    !fixture.lines_history.some(
      (line) => line.type === 'button' && line.accelerator === 200,
    ),
  );
});

test('DUNGEON_TOWN_LOVER：普通恋人按阶段演出、结算并降低善恶', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:606', 2); // 威严的彪形大汉
  fixture.store.set('cflag:1:607', 25);
  fixture.store.set('cflag:1:151', 10);
  fixture.store.set('cflag:1:16', 0);
  fixture.store.set('talent:1:0', 1);
  assert.equal(await load(fixture).dungeon_town_lover(1, () => 99), 1);

  assert(text_lines(fixture).some((line) => line.includes('家里做客、被推倒')));
  assert.equal(fixture.store.get('cflag:1:607'), 26);
  assert.equal(fixture.store.get('cflag:1:151'), 9);
  assert.equal(fixture.store.get('cflag:1:16'), 1);
  assert.equal(fixture.store.get('cstr:1:4'), '威严的彪形大汉');
  assert.equal(fixture.store.get('talent:1:0'), 0);
  assert.equal(fixture.store.get('cflag:1:15'), 100);
  assert.equal(fixture.store.get('cstr:1:3'), '威严的彪形大汉');
  assert.equal(fixture.store.get('exp:1:0'), 1);
  assert.equal(fixture.store.get('exp:1:5'), 1);
});

test('DUNGEON_TOWN_LOVER：贞操封印把 V 全转 A，固定保留 LOCAL×5 缺陷', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:606', 1);
  fixture.store.set('cflag:1:607', 40);
  fixture.store.set('talent:1:273', 1); // 贞操封印
  await load(fixture).dungeon_town_lover(1, () => 99);
  assert.equal(fixture.store.get('exp:1:0') || 0, 0, '私处经验不增加');
  assert.equal(fixture.store.get('exp:1:1'), 2, '两次 V 转成两次 A');
  assert.equal(
    fixture.store.get('juel:1:0'),
    250,
    '原作遗留 LOCAL=50，不按前戏数计算',
  );
  assert.equal(fixture.store.get('juel:1:14'), 250);
});

test('DUNGEON_TOWN_LOVER：两次 V 行为写客人射精槽并调用妊娠检查', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:5', 4); // 启用妊娠
  fixture.store.set('cflag:1:606', 1);
  fixture.store.set('cflag:1:607', 40);
  await load(fixture).dungeon_town_lover(1, () => 0);
  assert.equal(fixture.store.get('cflag:1:102'), 4, '妊娠相手 = 客人');
  assert.equal(fixture.store.get('cflag:1:105'), 0, '妊娠检查后清空射精槽');
});

test('DUNGEON_TOWN_LOVER：结婚阶段不降低善恶并等待按键', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:606', 3);
  fixture.store.set('cflag:1:607', 35);
  fixture.store.set('cflag:1:601', 902);
  fixture.store.set('cflag:1:151', 10);
  await load(fixture).dungeon_town_lover(1, () => 99);
  assert.equal(fixture.store.get('cflag:1:151'), 10);
  assert.equal(fixture.store.get('exp:1:0'), 3, 'LOVE_LV 35 走已婚三十日后档');
  assert.equal(fixture.store.get('exp:1:1'), 1);
  assert.equal(fixture.waits.length, 1);
  assert.equal(fixture.waits[0].waited, true);
});

test('DUNGEON_TOWN_LOVER：未知正数沿用 ERROR 并继续结算', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:606', 999);
  fixture.store.set('cflag:1:607', 10);
  fixture.store.set('cflag:1:16', 0);
  assert.equal(await load(fixture).dungeon_town_lover(1, () => 99), 1);
  assert.equal(fixture.store.get('cflag:1:607'), 11);
  assert.equal(fixture.store.get('cstr:1:4'), 'ERROR');
});

const LOVE_EXP_CASES = [
  {
    dimension: '0 接吻累计',
    lover: 1,
    love_lv: 10,
    scene: '开始约会了',
    summary: '接吻：1次',
  },
  {
    dimension: '1 吸烟次数',
    lover: 3,
    love_lv: 20,
    scene: '抽起了事后烟',
    summary: '吸烟：1根',
  },
  {
    dimension: '2 药物经验',
    lover: 23,
    love_lv: 40,
    scene: '被暗黑精灵抱住',
    summary: '药物经验＋1',
    expected: { 'exp:1:57': 1 },
  },
  {
    dimension: '3 口交加成',
    lover: 61,
    love_lv: 20,
    scene: '自由进出懦弱少年的家',
    summary: '口交经验＋19',
    seed: {
      'abl:1:12': 2,
      'abl:1:13': 3,
      'abl:1:16': 4,
      'abl:1:32': 2,
      'talent:1:52': 1,
      'talent:1:61': 1,
      'talent:1:62': 1,
    },
    expected: { 'exp:1:22': 19 },
  },
  {
    dimension: '4 私处性交加成',
    lover: 2,
    love_lv: 20,
    scene: '家里做客、被推倒',
    summary: '私处经验＋7',
    seed: {
      'abl:1:2': 4,
      'talent:1:103': 1,
      'talent:1:104': 1,
      'talent:1:75': 1,
      'talent:1:232': 1,
    },
    expected: { 'exp:1:0': 7 },
  },
  {
    dimension: '5 肛门性交加成',
    lover: 2,
    love_lv: 20,
    scene: '家里做客、被推倒',
    summary: '肛门经验＋7',
    seed: {
      'talent:1:273': 1,
      'abl:1:3': 4,
      'talent:1:105': 1,
      'talent:1:106': 1,
      'talent:1:77': 1,
      'talent:1:233': 1,
    },
    expected: { 'exp:1:0': 0, 'exp:1:1': 7 },
  },
  {
    dimension: '6 百合加成',
    lover: 41,
    love_lv: 20,
    scene: '自由进出妓女的家',
    summary: '点数＋40',
    seed: {
      'abl:1:22': 2,
      'abl:1:33': 3,
      'talent:1:81': 1,
      'talent:1:82': 1,
    },
  },
  {
    dimension: '6 男性不吃百合加成',
    lover: 41,
    love_lv: 20,
    scene: '自由进出妓女的家',
    summary: '点数＋5',
    seed: {
      'talent:1:122': 1,
      'abl:1:22': 2,
      'abl:1:33': 3,
      'talent:1:81': 1,
      'talent:1:82': 1,
    },
  },
  {
    dimension: '7 兽奸加成及口交回填',
    lover: 81,
    love_lv: 40,
    scene: '被大型宠物狗艹上瘾',
    summary: '兽奸经验＋9',
    seed: {
      'talent:1:种族': 2,
      'talent:1:317': 12,
      'abl:1:39': 2,
      'talent:1:136': 1,
    },
    expected: { 'exp:1:0': 11, 'exp:1:22': 11, 'exp:1:56': 9 },
  },
  {
    dimension: '8 拍摄倾向',
    lover: 1,
    love_lv: 0,
    scene: '帮了阿尔一把',
    summary: '拍摄经验＋7',
    seed: {
      'talent:1:10': 1,
      'talent:1:20': 1,
      'talent:1:23': 1,
      'talent:1:27': 1,
      'talent:1:28': 1,
      'talent:1:89': 1,
      'abl:1:17': 4,
    },
    expected: { 'exp:1:70': 7 },
  },
  {
    dimension: '9 前戏加成',
    lover: 2,
    love_lv: 20,
    scene: '家里做客、被推倒',
    summary: '点数＋50',
    seed: {
      'abl:1:0': 2,
      'abl:1:1': 3,
      'talent:1:101': 1,
      'talent:1:102': 1,
      'talent:1:107': 1,
      'talent:1:108': 1,
      'talent:1:74': 1,
      'talent:1:78': 1,
      'talent:1:230': 1,
      'talent:1:231': 1,
    },
  },
  {
    dimension: '9 淫核独立加成',
    lover: 2,
    love_lv: 20,
    scene: '家里做客、被推倒',
    summary: '点数＋10',
    seed: { 'talent:1:230': 1 },
  },
];

for (const love_case of LOVE_EXP_CASES) {
  test(`LOVE_EXP 维度表：${love_case.dimension}`, async () => {
    const fixture = setup_world();
    fixture.store.set('cflag:1:606', love_case.lover);
    fixture.store.set('cflag:1:607', love_case.love_lv);
    fixture.store.set('cflag:1:16', -1);
    for (const [key, value] of Object.entries(love_case.seed || {})) {
      fixture.store.set(key, value);
    }

    await load(fixture).dungeon_town_lover(1, () => 99);

    const output = text_lines(fixture).join('\n');
    assert(output.includes(love_case.scene), '必须命中该维度对应的演出档');
    assert(output.includes(love_case.summary), '必须输出该维度的最终结算值');
    for (const [key, value] of Object.entries(love_case.expected || {})) {
      assert.equal(fixture.store.get(key) || 0, value, `${key} 最终值`);
    }
  });
}

test('DUNGEON_TOWN_LOVER_CHARA_ENTER：条件满足时双向记录恋人', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:8', 4);
  fixture.store.set('abl:1:22', 1); // 女女恋爱门槛一方满足即可
  fixture.store.set('talent:2:315', 1);
  const result = await load(fixture).dungeon_town_lover_chara_enter(1, () => 2);
  assert.equal(result, 1);
  assert.equal(fixture.store.get('cflag:1:606'), 200);
  assert.equal(fixture.store.get('cflag:2:606'), 200);
  assert.equal(fixture.store.get('cflag:1:608'), 12);
  assert.equal(fixture.store.get('cflag:2:608'), 11);
  assert.equal(fixture.store.get('cflag:1:610'), 18010);
  assert.equal(fixture.store.get('cflag:2:610'), 18000);
});

test('DUNGEON_TOWN_LOVER_CHARA_ENTER：自己成为恋人时调用魅力点子集', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:8', 4);
  fixture.store.set('abl:1:22', 1);
  fixture.store.set('talent:1:312', 5); // 魅力点：泪痣
  assert.equal(
    await load(fixture).dungeon_town_lover_chara_enter(1, () => 1),
    1,
  );
  assert(
    text_lines(fixture).some((line) => line.includes('被自己的泪痣吸引了')),
  );
});

test('DUNGEON_TOWN_LOVER_CHARA_ENTER：系统关闭、已有关系和同性门槛均拦下', async () => {
  const off = setup_world();
  assert.equal(await load(off).dungeon_town_lover_chara_enter(1, () => 2), 0);

  const existing = setup_world();
  existing.store.set('flag:8', 4);
  existing.store.set('cflag:1:606', 3);
  assert.equal(
    await load(existing).dungeon_town_lover_chara_enter(1, () => 2),
    0,
  );

  const same_sex = setup_world();
  same_sex.store.set('flag:8', 4);
  assert.equal(
    await load(same_sex).dungeon_town_lover_chara_enter(1, () => 2),
    0,
  );
});

test('DUNGEON_TOWN_LOVER_CHARA_ENTER：侵攻中必须处于同一队伍', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:8', 4);
  fixture.store.set('abl:1:22', 1);
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:2:1', 2);
  fixture.store.set('cflag:1:533', 7);
  fixture.store.set('cflag:2:533', 8);
  const lovers = load(fixture);
  assert.equal(await lovers.dungeon_town_lover_chara_enter(1, () => 2), 0);
  fixture.store.set('cflag:2:533', 7);
  assert.equal(await lovers.dungeon_town_lover_chara_enter(1, () => 2), 1);
});

test('DUNGEON_TOWN 的日常段调用恋人真身，不再输出存根', async () => {
  const fixture = setup_world();
  const lovers = load(fixture);
  const called = [];
  lovers.dungeon_town_lover = async (cid) => called.push(cid);
  const town = fixture.load_module('dungeon/dungeon-town');
  await town.town_pt_dayevent(1, 2, 0);
  assert.deepEqual(called, [1, 2]);
  assert(
    !text_lines(fixture).some((line) => line.includes('@DUNGEON_TOWN_LOVER')),
  );
});
