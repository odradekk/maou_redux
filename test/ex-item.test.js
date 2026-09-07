/**
 * EX 道具十八个函数的行为测试（issue #344，阶段 5a L13）。
 *
 * 缝 = ere/dungeon/ex-item.js 的公开出口与 test/helpers/era-fixture.js。
 * 原作全局 A / RESULT 改为显式 cid / 返回值；RAND 经函数参数注入。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('dungeon/ex-item');
}

function seq_rand(values, fallback = 1) {
  const queue = [...values];
  return (n) => (queue.length ? queue.shift() : fallback % n);
}

function setup() {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(1);
  fixture.store.set('base:1:0', 500);
  fixture.store.set('base:1:1', 300);
  fixture.store.set('maxbase:1:0', 1000);
  fixture.store.set('maxbase:1:1', 800);
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:9', 25);
  fixture.store.set('cflag:1:501', 3);
  fixture.store.set('cflag:1:580', 100);
  for (let id = 400; id <= 413; id += 1) {
    fixture.store.set(`itemname:${id}`, `道具${id}`);
  }
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('公开十八个函数，EX_ITEM_NAME 区分已鉴定与未鉴定品', () => {
  const fixture = setup();
  const mod = load(fixture);
  const names = [
    'use_ex_item',
    'sell_ex_item',
    'add_ex_item',
    'ex_item_name',
    'harb_item',
    'potion_item',
    'heal_rod_item',
    'mind_rod_item',
    'power_seed_item',
    'def_seed_item',
    'exp_medal_item',
    'hp_seed_item',
    'mp_seed_item',
    'exp_silver_item',
    'detox_worm_item',
    'juel_box_item',
    'invisible_potion_item',
    'hero_potion_item',
  ];
  assert.deepEqual(Object.keys(mod).sort(), names.sort());
  assert.equal(mod.ex_item_name(400), '道具400');
  assert.equal(mod.ex_item_name(1400), '【未鉴定品】');
});

test('草药与回复药水：已鉴定品回复并钳上限，未鉴定品可变成色情道具', () => {
  const fixture = setup();
  const { harb_item, potion_item } = load(fixture);

  assert.equal(
    harb_item(1, 0, () => 1),
    1,
  );
  assert.equal(fixture.store.get('base:1:0'), 1000, 'HP +500 后钳最大值');
  assert.equal(
    potion_item(1, 0, () => 1),
    1,
  );
  assert.equal(fixture.store.get('base:1:1'), 800, '气力 +500 后钳最大值');

  assert.equal(
    harb_item(1, 1, () => 0),
    1,
  );
  assert.equal(fixture.store.get('juel:1:5'), 30, '快乐草加欲情点数');
  assert.equal(
    potion_item(1, 1, () => 0),
    1,
  );
  assert.equal(fixture.store.get('exp:1:20'), 1, '谜之液体加精液经验');
});

test('两种杖：正常品可能保留，未鉴定诅咒品必毁并写对应经验与点数', () => {
  const fixture = setup();
  fixture.store.set('exp:1:1', 1);
  const { heal_rod_item, mind_rod_item } = load(fixture);

  assert.equal(
    heal_rod_item(1, 0, seq_rand([1, 2])),
    0,
    '正常杖 RAND:3 > 0 不毁',
  );
  assert.equal(fixture.store.get('base:1:0'), 700);
  assert.equal(
    mind_rod_item(1, 0, seq_rand([0])),
    1,
    '正常杖 RAND:3 == 0 损毁',
  );
  assert.equal(fixture.store.get('base:1:1'), 500);

  assert.equal(
    heal_rod_item(1, 1, () => 0),
    1,
    '未鉴定杖必毁',
  );
  assert.equal(fixture.store.get('exp:1:10'), 1);
  assert.equal(fixture.store.get('juel:1:0'), 10);
  assert.equal(fixture.store.get('juel:1:5'), 20);
  assert.equal(
    mind_rod_item(1, 1, () => 0),
    1,
  );
  assert.equal(fixture.store.get('exp:1:10'), 2);
  assert.equal(fixture.store.get('exp:1:1'), 2);
  assert.equal(fixture.store.get('juel:1:2'), 10);
});

test('力量与守护种子：正常品加基础四维，诅咒品按钝感→敏感→点数推进', () => {
  const fixture = setup();
  const { power_seed_item, def_seed_item } = load(fixture);

  power_seed_item(1, 0, () => 1);
  def_seed_item(1, 0, () => 1);
  assert.equal(fixture.store.get('cflag:1:13'), 1);
  assert.equal(fixture.store.get('cflag:1:14'), 1);

  fixture.store.set('talent:1:101', 1);
  power_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:101'), 0, '先消除阴蒂钝感');
  power_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:102'), 1, '再取得阴蒂敏感');
  power_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('juel:1:0'), 10, '已有敏感后改加阴核点数');

  fixture.store.set('talent:1:107', 1);
  def_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:107'), 0, '先消除乳房钝感');
  def_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:108'), 1, '再取得乳房敏感');
  def_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('juel:1:14'), 10);
});

test('命与心之种子：正常品增加最大值，诅咒品推进私处/肛门敏感', () => {
  const fixture = setup();
  const { hp_seed_item, mp_seed_item } = load(fixture);

  hp_seed_item(1, 0, () => 1);
  mp_seed_item(1, 0, () => 1);
  assert.equal(fixture.store.get('maxbase:1:0'), 1010);
  assert.equal(fixture.store.get('maxbase:1:1'), 805);

  fixture.store.set('talent:1:103', 1);
  hp_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:103'), 0);
  hp_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:104'), 1);
  fixture.store.set('talent:1:105', 1);
  mp_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:105'), 0);
  mp_seed_item(1, 1, () => 0);
  assert.equal(fixture.store.get('talent:1:106'), 1);

  fixture.store.set('talent:1:122', 1);
  hp_seed_item(1, 1, () => 0);
  assert.equal(
    fixture.store.get('maxbase:1:0'),
    1020,
    '男性不走私处敏感，改加最大 HP',
  );
});

test('两种经验币：已鉴定品加战斗经验，诅咒品加恭顺/屈服点数', () => {
  const fixture = setup();
  const { exp_medal_item, exp_silver_item } = load(fixture);
  exp_medal_item(1, 0, () => 1);
  exp_silver_item(1, 0, () => 1);
  assert.equal(fixture.store.get('exp:1:80'), 200);
  exp_medal_item(1, 1, () => 0);
  exp_silver_item(1, 1, () => 0);
  assert.equal(fixture.store.get('juel:1:4'), 10);
  assert.equal(fixture.store.get('juel:1:6'), 30);
});

test('圣水：正常品除虫并提高善恶，原圣女另加基础攻防；诅咒品污染点数', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:190', 1);
  fixture.store.set('talent:1:315', 12);
  fixture.store.set('cflag:1:151', 5);
  const { detox_worm_item } = load(fixture);

  assert.equal(await detox_worm_item(1, 0, () => 1), 1);
  assert.equal(fixture.store.get('talent:1:190'), 0, 'ITEM_DETOX 真身被调用');
  assert.equal(fixture.store.get('cflag:1:151'), 6, 'KARMA +1');
  assert.equal(fixture.store.get('cflag:1:13'), 1);
  assert.equal(fixture.store.get('cflag:1:14'), 1);

  await detox_worm_item(1, 1, () => 0);
  assert.equal(fixture.store.get('juel:1:5'), 15);
  assert.equal(fixture.store.get('juel:1:6'), 10);
  assert.equal(fixture.store.get('cflag:1:151'), 6, '诅咒品不改善恶');
});

test('宝石箱：加屈服点数，迎击中消耗，其他状态保留', () => {
  const fixture = setup();
  const { juel_box_item } = load(fixture);
  assert.equal(juel_box_item(1, 0), 0);
  fixture.store.set('cflag:1:1', 3);
  assert.equal(juel_box_item(1, 1), 1);
  assert.equal(fixture.store.get('juel:1:6'), 10);
});

test('透明化药与英雄药：正常品立位域/加战力，诅咒品只加负面点数', () => {
  const fixture = setup();
  fixture.store.set('talent:1:35', 1);
  const { invisible_potion_item, hero_potion_item } = load(fixture);

  invisible_potion_item(1, 0, () => 1);
  assert.equal(fixture.store.get('cflag:1:503'), 1 << 7);
  hero_potion_item(1, 0, () => 1);
  assert.equal(fixture.store.get('cflag:1:11'), 12, '等级 25 → UP_VALUE 12');
  assert.equal(fixture.store.get('cflag:1:12'), 12);
  assert.equal(fixture.store.get('cflag:1:503'), (1 << 7) | (1 << 8));

  fixture.store.set('cflag:1:503', 0);
  invisible_potion_item(1, 1, () => 0);
  hero_potion_item(1, 1, () => 0);
  assert.equal(fixture.store.get('juel:1:8'), 15);
  assert.equal(fixture.store.get('juel:1:6'), 10, '羞耻素质追加屈服点数');
  assert.equal(fixture.store.get('juel:1:10'), 10);
  assert.equal(fixture.store.get('cflag:1:503'), 0, '诅咒品不立状态位');
});

test('USE_EX_ITEM：按槽序和使用条件分发，只清除返回非零的道具', async () => {
  const fixture = setup();
  fixture.store.set('maxbase:1:0', 1001);
  fixture.store.set('base:1:0', 600); // ERB 整数除法的 60% 边界，且低于杖的 80%
  fixture.store.set('cflag:1:560', 400);
  fixture.store.set('cflag:1:561', 1402); // 未鉴定回复杖，满足 80%
  fixture.store.set('cflag:1:562', 411); // 宝石箱 rand(5) 非 0，不使用
  fixture.store.set('cflag:1:563', 412); // 仅战斗中使用
  const { use_ex_item } = load(fixture);

  assert.equal(await use_ex_item('战斗后', 1, () => 1), 0);
  assert.equal(
    fixture.store.get('cflag:1:560'),
    400,
    'ERB 整数除法边界不使用草药',
  );
  assert.equal(fixture.store.get('cflag:1:561'), 0, '未鉴定杖必毁并清槽');
  assert.equal(fixture.store.get('cflag:1:562'), 411, '宝石箱未掷中保留');
  assert.equal(fixture.store.get('cflag:1:563'), 412, '非战斗中透明药保留');

  await use_ex_item('战斗中', 1, () => 1);
  assert.equal(fixture.store.get('cflag:1:563'), 0, '战斗中使用透明药并清槽');
});

test('SELL_EX_ITEM：未鉴定品必卖、普通品十分之一概率卖，宝石箱与商人加价', () => {
  const fixture = setup();
  fixture.store.set('talent:1:315', 15);
  fixture.store.set('cflag:1:560', 1400); // 必卖：200 + 商人 100
  fixture.store.set('cflag:1:561', 411); // 掷中：1000 + 商人 100
  fixture.store.set('cflag:1:562', 401); // 未掷中
  const { sell_ex_item } = load(fixture);
  assert.equal(sell_ex_item(1, seq_rand([9, 0, 1, 1, 1])), 0);
  assert.equal(fixture.store.get('cflag:1:560'), 0);
  assert.equal(fixture.store.get('cflag:1:561'), 0);
  assert.equal(fixture.store.get('cflag:1:562'), 401);
  assert.equal(fixture.store.get('cflag:1:580'), 1500, '原 100 + 售得 1400');
  assert(text_lines(fixture).some((line) => line.includes('卖掉了2个道具')));
});

test('ADD_EX_ITEM：消耗品按随机种类入首个空槽，侵攻中可未鉴定，购买则强制鉴定', async () => {
  const fixture = setup();
  const { add_ex_item } = load(fixture);
  // -3：先掷武器分支（非 0），再掷消耗品种类 2 => 402，再掷未鉴定 0，
  // 非神官盗贼鉴定掷 1 => 失败，最终 1402。
  assert.equal(await add_ex_item(-3, 1, 0, seq_rand([1, 2, 0, 1])), 1402);
  assert.equal(fixture.store.get('cflag:1:560'), 1402);

  // 购买已有未鉴定编号：购买标志先去掉 1000，不进入鉴定掷。
  assert.equal(await add_ex_item(1405, 1, 1, () => 1), 405);
  assert.equal(fixture.store.get('cflag:1:561'), 405);
});

test('ADD_EX_ITEM：武器按层数、职业适用与随机前缀替换，触手武器回落为剑', async () => {
  const fixture = setup();
  fixture.store.set('talent:1:200', 1); // 战士，可用识别号 40
  fixture.store.set('cflag:1:550', 40); // 当前强度 0 < 阶层 3
  const { add_ex_item } = load(fixture);
  // -2 强制武器；RAND:11 = 9 => 349 后回落 340；RAND:10 = 2 前缀。
  assert.equal(await add_ex_item(-2, 1, 1, seq_rand([3, 9, 2])), 340);
  assert.equal(fixture.store.get('cflag:1:550'), 203040);
});

test('ADD_EX_ITEM：现有武器不弱、职业不适用或五个槽全满时不入手', async () => {
  const fixture = setup();
  const { add_ex_item } = load(fixture);
  fixture.store.set('talent:1:200', 1);
  fixture.store.set('cflag:1:550', 3040); // 强度 3 == 阶层
  assert.equal(await add_ex_item(-2, 1, 0, () => 1), 0);

  fixture.store.set('cflag:1:550', 40);
  assert.equal(
    await add_ex_item(-2, 1, 0, seq_rand([1, 1])),
    0,
    '战士不能用识别号 41',
  );

  for (let slot = 560; slot < 565; slot += 1) {
    fixture.store.set(`cflag:1:${slot}`, 400);
  }
  assert.equal(await add_ex_item(401, 1, 1, () => 1), 0, '背包满返回 0');
});

test('三处旧模块不再登记五个 EX 道具存根', () => {
  const fixture = setup();
  const dungeon = fixture.load_module('dungeon/dungeon');
  const room = fixture.load_module('dungeon/dungeon-room');
  const town = fixture.load_module('dungeon/dungeon-town');
  const ex_item = load(fixture);
  assert(!dungeon.STUBBED_CALLS.includes('ADD_EX_ITEM'));
  assert(!dungeon.STUBBED_CALLS.includes('USE_EX_ITEM'));
  assert(!room.STUBBED_CALLS.includes('SELL_EX_ITEM'));
  assert(!room.STUBBED_CALLS.includes('EX_ITEM_NAME'));
  assert(!town.STUBBED_CALLS.includes('SELL_EX_ITEM'));
  assert(!town.STUBBED_CALLS.includes('ADD_EX_ITEM'));
  assert.equal(
    dungeon.add_ex_item,
    ex_item.add_ex_item,
    'dungeon 导出 ADD 真身',
  );
  assert.equal(
    dungeon.use_ex_item,
    ex_item.use_ex_item,
    'dungeon 导出 USE 真身',
  );
  assert.equal(town.sell_ex_item, ex_item.sell_ex_item, '城镇导出 SELL 真身');

  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of [
    'EX_ITEM_NAME',
    'SELL_EX_ITEM',
    'ADD_EX_ITEM',
    'USE_EX_ITEM',
  ]) {
    const rows = registry
      .split('\n')
      .filter((line) => line.startsWith(`| \`${name}\``));
    assert(rows.length > 0, `清单仍保留 ${name} 的追溯行`);
    assert(
      rows.every((line) => line.includes('已实现')),
      `${name} 清单行未改已实现`,
    );
  }
});

test('房间与城镇调用点复用 SELL_EX_ITEM 真身，冰室用真身打印道具名', async () => {
  const room_fixture = setup();
  room_fixture.store.set('cflag:1:560', 1400);
  room_fixture.store.set('flag:5', 32);
  const room = room_fixture.load_module('dungeon/dungeon-room');
  // 首槽未鉴定品必卖但仍消费一掷；余四槽不中；购买武器掷中后因无职业失败。
  await room.dungeon_shop_itemsell(1, seq_rand([1, 1, 1, 1, 1, 0, 0]));
  assert.equal(room_fixture.store.get('cflag:1:560'), 0);
  assert.equal(
    room_fixture.store.get('cflag:1:580'),
    300,
    '房间出售所得 200 入所持金',
  );

  room_fixture.store.set('cflag:1:560', 1400);
  await room.dungeon_ice(1, 1, seq_rand([0, 0]));
  assert(
    text_lines(room_fixture).some((line) =>
      line.includes('【未鉴定品】破坏了'),
    ),
    '冰室通过 EX_ITEM_NAME 真身拼行',
  );

  const town_fixture = setup();
  town_fixture.store.set('cflag:1:580', 10000);
  town_fixture.store.set('cflag:1:560', 1400);
  const town = town_fixture.load_module('dungeon/dungeon-town');
  await town.town_pt_funding(1, 0, 0, () => 1);
  assert.equal(town_fixture.store.get('cflag:1:560'), 0);
  assert.equal(
    town_fixture.store.get('cflag:1:580'),
    10201,
    '援助下限 1 + EX 道具出售 200',
  );
});
