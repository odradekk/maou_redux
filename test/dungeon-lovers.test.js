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
