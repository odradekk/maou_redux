/**
 * @file issue #333：阶段 5a 段 0 的九个跨域前置函数。
 *
 * 测试边界 = 各模块公开导出；SEARCH_FAMILY 与 CAMPAIGN_DUNGEON_LV 另经既有
 * 调用方验证换接。期望值直接来自对应 ERB 的分支与常量，不复算实现。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  fixture.era.addCharacter(cid);
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

test('SEARCH_FAMILY：村娘 A/B 走专用互找分支，并保留最后一个匹配', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 1, 2, 3]) add_chara(fixture, cid);
  fixture.store.set('talent:1:165', 1); // 村娘 A
  fixture.store.set('talent:2:171', 1); // 村娘 B
  fixture.store.set('talent:3:171', 1); // 后出现的村娘 B
  const { search_family } = fixture.load_module('chara/chara-family');

  assert.equal(search_family(1), 3);
  assert.equal(search_family(2), 1);
});

test('SEARCH_FAMILY：魔王的婚姻关系只认候选侧 901', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 1, 2]) add_chara(fixture, cid);
  fixture.store.set('cflag:1:601', 902);
  fixture.store.set('cflag:2:601', 901);
  const { search_family } = fixture.load_module('chara/chara-family');

  assert.equal(search_family(0, 'MARRIAGE'), 2);
});

test('SEARCH_FAMILY：婚姻要求名字、前身、性格与家族构成一致', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 1, 2]) add_chara(fixture, cid);
  fixture.store.set('cflag:1:6', 42); // 本人名字编号
  fixture.store.set('cflag:1:609', 42); // 对方名字编号
  fixture.store.set('cflag:1:601', 7605042); // 构成 76、性格 5、前身 4、关系 2
  fixture.store.set('talent:1:320', 76);
  fixture.store.set('cflag:2:609', 42);
  fixture.store.set('cflag:2:601', 1);
  fixture.store.set('talent:2:315', 4);
  fixture.store.set('talent:2:165', 1);
  fixture.store.set('talent:2:320', 76);
  const { search_family } = fixture.load_module('chara/chara-family');

  assert.equal(search_family(1, 'MARRIAGE'), 2);
  fixture.store.set('cflag:2:609', 43);
  assert.equal(search_family(1, 'MARRIAGE'), -1);
  fixture.store.set('cflag:2:609', 42);
  fixture.store.set('talent:2:320', 77);
  assert.equal(search_family(1, 'MARRIAGE'), -1);
});

test('SEARCH_FAMILY：子找父时按家庭中的儿女数核对', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 1, 2]) add_chara(fixture, cid);
  fixture.store.set('cflag:1:6', 9);
  fixture.store.set('cflag:1:604', 9);
  // 关系 5（父）、前身 2、性格 3、本人构成 1（已设置）
  fixture.store.set('cflag:1:605', 103025);
  fixture.store.set('talent:1:122', 1); // 本人为儿子
  fixture.store.set('talent:1:320', 1);
  fixture.store.set('cflag:2:604', 9);
  fixture.store.set('cflag:2:605', 1);
  fixture.store.set('talent:2:315', 2);
  fixture.store.set('talent:2:163', 1);
  fixture.store.set('talent:2:320', 1001); // 一名儿子 + 已设置
  const { search_family } = fixture.load_module('chara/chara-family');

  assert.equal(search_family(1), 2);
  fixture.store.set('talent:2:320', 2001);
  assert.equal(search_family(1), -1);
});

test('SEARCH_FAMILY：家族数据个位为 0 时不进入兄弟姐妹推断', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 1, 2]) add_chara(fixture, cid);
  fixture.store.set('cflag:1:6', 9);
  fixture.store.set('cflag:1:604', 9);
  fixture.store.set('cflag:1:605', 1020); // 性格 1、前身 2、关系 0
  fixture.store.set('cflag:2:604', 9);
  fixture.store.set('cflag:2:605', 1);
  fixture.store.set('talent:2:315', 2);
  fixture.store.set('talent:2:161', 1);
  fixture.store.set('talent:2:320', 1);

  assert.equal(fixture.load_module('chara/chara-family').search_family(1), -1);
});

test('SEARCH_FAMILY：队伍离队调用点会清掉找到的结婚对象', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 2]) add_chara(fixture, cid);
  fixture.store.set('cflag:0:601', 9);
  fixture.store.set('cflag:2:601', 901);

  fixture.load_module('dungeon/dungeon-party').party_del(0);
  assert.equal(fixture.store.get('cflag:2:601'), 0);
  assert.equal(
    fixture
      .load_module('chara/chara-make')
      .STUBBED_CALLS.includes('SEARCH_FAMILY'),
    false,
  );
});

test('SEARCH_FAMILY：慈爱来袭口上会找到家人并按关系称呼', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 31, '慈爱');
  add_chara(fixture, 32, '家人');
  fixture.store.set('talent:31:165', 1); // 村娘 A
  fixture.store.set('talent:32:171', 1); // 村娘 B
  fixture.store.set('cflag:31:604', 1); // 家族所属编号
  fixture.store.set('cflag:31:605', 3); // 弟弟
  fixture.load_module('era-utils/era-flag').target = 31;
  fixture.load_module('kojo/kojo-k0-tender');

  await fixture.load_module('kojo/kojo-system').enterenemy_koujo_family.call(0);
  assert.ok(text_lines(fixture).includes('「家人……等着我！」'));
});

test('FAMILY_BIRTHTO_MOM/DAD：非法母亲抛错，父亲负号只记双方关系', () => {
  const fixture = create_era_fixture();
  const { family_birth_to_mom, family_birth_to_dad, STUBBED_CALLS } =
    fixture.load_module('chara/chara-family');

  assert.throws(() => family_birth_to_mom(10, -4), /不可能作为母亲/);
  assert.equal(family_birth_to_dad(10, -4), 0);
  assert.deepEqual(STUBBED_CALLS, [
    'RELATION_REBUILD',
    'RF_JOINTO',
    'RF_SETBOTH',
  ]);
  assert.match(text_lines(fixture)[0], /@RF_SETBOTH/);
  assert.match(text_lines(fixture)[0], /\(10,-4,5\)/);
});

test('FAMILY_BIRTHTO_MOM/DAD：普通父母先重建关系，再以 6/5 加入家庭', () => {
  const fixture = create_era_fixture();
  const { family_birth_to_mom, family_birth_to_dad } =
    fixture.load_module('chara/chara-family');

  family_birth_to_mom(10, 2);
  family_birth_to_dad(10, 3);
  assert.deepEqual(
    text_lines(fixture).map((line) => line.match(/原作 @(\w+)/)?.[1]),
    ['RELATION_REBUILD', 'RF_JOINTO', 'RELATION_REBUILD', 'RF_JOINTO'],
  );
  assert.match(text_lines(fixture)[1], /\(10,2,6\)/);
  assert.match(text_lines(fixture)[3], /\(10,3,5\)/);
});

test('SELECT_YES_NO：非法输入重问，直到返回 0 或 1', async () => {
  const fixture = create_era_fixture();
  fixture.set_inputs(7, 1);
  const { select_yes_no } = fixture.load_module('page/page-life-list');

  assert.equal(await select_yes_no(), 1);
  assert.deepEqual(
    fixture.inputs_consumed.map(({ value }) => value),
    [7, 1],
  );
  assert.deepEqual(text_lines(fixture), [
    '  [0] 是的   [1] 不要',
    '  [0] 是的   [1] 不要',
  ]);
});

test('ITEM_DETOX：按原状态输出并经属主门面清除四种寄生素质', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '阿尔');
  for (const no of [190, 191, 192, 193]) {
    fixture.store.set(`talent:1:${no}`, 1);
  }
  const { item_detox } = fixture.load_module('system/equip/item-detox');

  assert.equal(item_detox(1), 0);
  assert.deepEqual(text_lines(fixture), [
    '《阿尔从寄生状态中恢复了》',
    '*从私处寄生中恢复* *从肛门寄生中恢复* *蠕虫被排出了* *肛门虫被排出了* ',
  ]);
  for (const no of [190, 191, 192, 193]) {
    assert.equal(fixture.store.get(`talent:1:${no}`), 0);
  }
});

test('NAKADASHI_CHECK：关闭妊娠功能仍清掉对应精液池', () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:1:103', 20);
  const { nakadashi_check } = fixture.load_module('event/event-pregnancy');

  assert.equal(
    nakadashi_check(1, 2, () => 0),
    0,
  );
  assert.equal(fixture.store.get('cflag:1:103'), 0);
  assert.equal(fixture.store.get('cflag:1:102') ?? 0, 0);
});

test('NAKADASHI_CHECK：剂量、体型和排卵药共同决定掷骰上界', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', 4); // GETBIT(FLAG:5,2)
  fixture.store.set('cflag:1:103', 10);
  fixture.store.set('talent:1:100', 1);
  fixture.store.set('cflag:1:109', 1);
  let upper;
  const { nakadashi_check } = fixture.load_module('event/event-pregnancy');

  nakadashi_check(1, 2, (n) => ((upper = n), 2));
  assert.equal(upper, 6);
  assert.equal(fixture.store.get('cflag:1:102'), 2);
  assert.equal(fixture.store.get('cflag:1:103'), 0);
});

test('NAKADASHI_CHECK：男性和非兽耳犬交配早退时不消费精液池', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', 4);
  fixture.store.set('talent:1:122', 1);
  fixture.store.set('cflag:1:103', 10);
  fixture.store.set('cflag:2:106', 10);
  const { nakadashi_check } = fixture.load_module('event/event-pregnancy');

  nakadashi_check(1, 2, () => 0);
  nakadashi_check(2, 5, () => 0);
  assert.equal(fixture.store.get('cflag:1:103'), 10);
  assert.equal(fixture.store.get('cflag:2:106'), 10);
});

test('NAKADASHI_CHECK：已有预产日或正在妊娠时清池但不改妊娠相手', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', 4);
  fixture.store.set('cflag:1:110', 9);
  fixture.store.set('cflag:1:103', 10);
  fixture.store.set('talent:2:153', 1);
  fixture.store.set('cflag:2:103', 10);
  const { nakadashi_check } = fixture.load_module('event/event-pregnancy');

  nakadashi_check(1, 2, () => 0);
  nakadashi_check(2, 2, () => 0);
  assert.equal(fixture.store.get('cflag:1:103'), 0);
  assert.equal(fixture.store.get('cflag:2:103'), 0);
  assert.equal(fixture.store.get('cflag:1:102') ?? 0, 0);
  assert.equal(fixture.store.get('cflag:2:102') ?? 0, 0);
});

test('ENEMY_DATA_CHECK：1:1 保留原作未绑定局部变量造成的无操作行为', () => {
  const fixture = create_era_fixture();
  const { enemy_data_check } = fixture.load_module('dungeon/monster-data');

  assert.equal(enemy_data_check(1007, 200), 0);
  assert.equal(fixture.store.get('e:200') ?? 0, 0);
});

test('MONSTER_DATA：1000-1009 接入 ENEMY_DATA_CHECK 且不回退成骷髅', () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:400', 1);
  const { monster_data } = fixture.load_module('dungeon/monster-data');

  assert.equal(
    monster_data(1007, 5, -1, -1, -1, () => 0),
    0,
  );
  assert.equal(fixture.store.get('e:500') ?? 0, 0);
});

test('MONSTER_DATA：1010-1999 仍走 ENEMY_DATA_CHECK，不回退成骷髅', () => {
  const fixture = create_era_fixture();
  const { monster_data } = fixture.load_module('dungeon/monster-data');

  monster_data(1010, 5, -1, -1, -1, () => 0);
  assert.equal(fixture.store.get('e:500') ?? 0, 0);
});

test('NTR_CHILD_BIRTH：父亲分支输出后以 P=20 调用已有 NTR 口上族', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '阿尔');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 1;
  fixture.store.set('talent:1:165', 1); // 口上 K5
  fixture.store.set('cflag:1:102', 7);
  const seen = [];
  const { ntr_koujo_family } = fixture.load_module('kojo/kojo-system');
  ntr_koujo_family.register(5, async (rand, p) => seen.push([rand, p]));
  const { ntr_child_birth } = fixture.load_module('system/ntr');
  const rand = () => 0;

  assert.equal(await ntr_child_birth(rand), 0);
  assert.deepEqual(seen, [[rand, 20]]);
  assert.ok(text_lines(fixture).some((line) => line.includes('雪白的婴儿')));
});

test('NTR_CHILD_BIRTH：怪物父系按两次独立 RAND 选择死亡演出', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1, '阿尔');
  fixture.load_module('era-utils/era-flag').target = 1;
  fixture.store.set('cflag:1:102', 6);
  const { ntr_child_birth } = fixture.load_module('system/ntr');
  const rolls = [1, 0];

  await ntr_child_birth((n) => {
    assert.equal(n, rolls.length === 2 ? 3 : 2);
    return rolls.shift();
  });
  assert.ok(text_lines(fixture).some((line) => line.includes('企图攻击狂王')));
});

test('NTR_KOUJO：K2 与 K4 真身按统一的 rand、P 参数注册', async () => {
  for (const [id, module_name, text] of [
    [2, 'kojo/kojo-k2-timid', '子宫就是属于狂王'],
    [4, 'kojo/kojo-k4-stoic', '好想～继续怀上'],
  ]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 1, '阿尔');
    fixture.load_module('era-utils/era-flag').target = 1;
    fixture.store.set(`talent:1:${160 + id}`, 1);
    fixture.load_module(module_name);

    await fixture.load_module('kojo/kojo-system').ntr_koujo(20, () => 0);
    assert.ok(text_lines(fixture).some((line) => line.includes(text)));
  }
});

test('NTR_KOUJO：旧单参数口上适配器优先传 P，并兼容直接调用', async () => {
  const fixture = create_era_fixture();
  const { adapt_legacy_ntr_koujo } = fixture.load_module('kojo/kojo-system');
  const seen = [];
  const adapted = adapt_legacy_ntr_koujo(async (p) => seen.push(p));
  const rand = () => 0;

  await adapted(rand, 20);
  await adapted(7);
  assert.deepEqual(seen, [20, 7]);
});

test('CAMPAIGN_DUNGEON_LV：无战役为 0，战役 1 为 45，缺失编号为 0', () => {
  const fixture = create_era_fixture();
  const { campaign_dungeon_lv } = fixture.load_module('dungeon/monster-data');

  assert.equal(campaign_dungeon_lv(), 0);
  fixture.store.set('flag:400', 1);
  assert.equal(campaign_dungeon_lv(), 45);
  fixture.store.set('flag:400', 2);
  assert.equal(campaign_dungeon_lv(), 0);
});

test('存根清单：三项范围外家族调用已登记，九个真身不再登记为存根', () => {
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of ['RELATION_REBUILD', 'RF_JOINTO', 'RF_SETBOTH']) {
    assert.ok(registry.includes(`| \`${name}\``), `存根清单缺少 ${name}`);
  }
  for (const name of [
    'SELECT_YES_NO',
    'ITEM_DETOX',
    'FAMILY_BIRTHTO_MOM',
    'FAMILY_BIRTHTO_DAD',
    'NAKADASHI_CHECK',
    'ENEMY_DATA_CHECK',
    'NTR_CHILD_BIRTH',
    'NTR_KOUJO',
    'SEARCH_FAMILY',
    'CAMPAIGN_DUNGEON_LV',
  ]) {
    const row = registry
      .split('\n')
      .find((line) => line.includes(`\`${name}\``));
    assert.ok(row, `存根清单缺少 ${name}`);
    assert.ok(!row.includes('| 存根'), `${name} 仍登记为存根`);
  }
});
