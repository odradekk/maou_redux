/**
 * @file ere/chara/chara-info-actions.js 的行为测试（issue #391）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖六个函数：能力提升/换装资格判定、
 * 状态复位、金钱回体力气力、金钱购买等级、传送召回。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

function printed(fixture, text) {
  return fixture.lines_history.some((line) => line.text === text);
}

function printed_includes(fixture, substr) {
  return fixture.lines_history.some((line) => line.text?.includes(substr));
}

test('IS_ABLE_TO_ABILITY_UP：状态 0/7 且有体力则可，2/3 需魔王 LV>=20，无体力恒不可', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  const { is_able_to_ability_up } = fixture.load_module(
    'chara/chara-info-actions',
  );

  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('base:1:0', 1);
  assert.equal(is_able_to_ability_up(1), true, '状态 0 + 有体力');

  fixture.store.set('base:1:0', 0);
  assert.equal(is_able_to_ability_up(1), false, '无体力恒不可');

  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:0:9', 19);
  assert.equal(is_able_to_ability_up(1), false, '侵攻中但魔王 LV 不足 20');
  fixture.store.set('cflag:0:9', 20);
  assert.equal(is_able_to_ability_up(1), true, '侵攻中且魔王 LV 达 20');

  fixture.store.set('cflag:1:1', 7);
  fixture.store.set('cflag:0:9', 0);
  assert.equal(is_able_to_ability_up(1), true, '苗床状态恒可（不看魔王等级）');
});

test('IS_ABLE_TO_CLOTH：仅状态 0 且有体力', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  const { is_able_to_cloth } = fixture.load_module('chara/chara-info-actions');

  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('base:1:0', 1);
  assert.equal(is_able_to_cloth(1), true);

  fixture.store.set('cflag:1:1', 7);
  assert.equal(is_able_to_cloth(1), false, '苗床不算（与 ABILITY_UP 不同）');

  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('base:1:0', 0);
  assert.equal(is_able_to_cloth(1), false);
});

test('CHARA_INFO_RESTORE_STATE：迎击中先离队，其余直接清状态为 0', () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  const { chara_info_restore_state } = fixture.load_module(
    'chara/chara-info-actions',
  );

  fixture.store.set('cflag:1:1', 3);
  fixture.store.set('cflag:1:533', 1); // 自己当队长
  fixture.store.set('cflag:1:531', 0);
  fixture.store.set('cflag:1:532', 0);
  chara_info_restore_state(1);
  assert.equal(fixture.store.get('cflag:1:1'), 0);
  assert.equal(
    fixture.store.get('cflag:1:530'),
    0,
    '迎击中先经 PARTY_DEL 解散',
  );

  fixture.store.set('cflag:1:1', 7);
  chara_info_restore_state(1);
  assert.equal(fixture.store.get('cflag:1:1'), 0, '非迎击中直接清零');
});

test('CHARA_INFO_RECOVER_HP：金钱不够只播报不扣款', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  fixture.store.set('maxbase:1:0', 100);
  fixture.store.set('base:1:0', 0); // 差 100 点体力
  fixture.store.set('maxbase:1:1', 0);
  fixture.store.set('base:1:1', 0);
  fixture.store.set('flag:10004', 0); // MONEY 恒不够（需要 100*10/3=333）
  const { chara_info_recover_hp } = fixture.load_module(
    'chara/chara-info-actions',
  );

  await chara_info_recover_hp(1);

  assert.equal(printed_includes(fixture, '金钱不够'), true);
  assert.equal(fixture.store.get('base:1:0'), 0, '未回复');
});

test('CHARA_INFO_RECOVER_HP：确认后按公式扣双资金并回满，取消则不变', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('maxbase:1:0', 100);
    fixture.store.set('base:1:0', 40); // 差 60 → 60*10/3=200
    fixture.store.set('maxbase:1:1', 50);
    fixture.store.set('base:1:1', 20); // 差 30 → 30*5/3=50
    fixture.store.set('flag:10004', 1000);
    fixture.store.set('exflag:4444', 1000);
    fixture.set_inputs(0); // 立即恢复
    const { chara_info_recover_hp } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_recover_hp(1);

    assert.equal(fixture.store.get('base:1:0'), 100);
    assert.equal(fixture.store.get('base:1:1'), 50);
    assert.equal(fixture.store.get('flag:10004'), 750, '扣费 200+50=250');
    assert.equal(fixture.store.get('exflag:4444'), 750);
    assert.equal(printed(fixture, '花费250G，恢复了角色1的体力与气力'), true);
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('maxbase:1:0', 100);
    fixture.store.set('base:1:0', 40);
    fixture.store.set('flag:10004', 1000);
    fixture.set_inputs(1); // 还是算了
    const { chara_info_recover_hp } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_recover_hp(1);

    assert.equal(fixture.store.get('base:1:0'), 40, '取消不改动');
    assert.equal(fixture.store.get('flag:10004'), 1000, '取消不扣钱');
  }
});

test('CHARA_INFO_UP_LEVEL：三条经验曲线（魔王/精英/通常）只看播报，不触发 LVUP 副作用', async () => {
  // 用「还是算了」取消购买，只验证曲线算出的 need/cost 播报是否正确——
  // 若真的确认购买，LVUP 会紧接着按新等级的曲线继续消耗刚买到的经验，
  // 使 exp:x:80 的最终值耦合另一个函数自身的结算逻辑（该函数有独立测试，
  // 见 test/dungeon-lvup.test.js），本用例不重复验证那一层
  const cases = [
    ['魔王：LV*100+10', 0, false, 2, 210],
    ['精英：LV*20+10', 1, true, 3, 70],
    ['通常：LV*10+10', 1, false, 3, 40],
  ];
  for (const [label, cid, elite, lv, need] of cases) {
    const fixture = create_era_fixture();
    add_chara(fixture, cid, cid === 0 ? '你' : '奴隶甲');
    if (cid !== 0) add_chara(fixture, 0, '你');
    fixture.store.set(`cflag:${cid}:9`, lv);
    if (elite) fixture.store.set(`talent:${cid}:220`, 1);
    fixture.store.set('flag:10004', 100000);
    fixture.set_inputs(1); // 还是算了
    const { chara_info_up_level } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_up_level(cid);

    assert.equal(
      printed_includes(
        fixture,
        `到下一级经验还要${need}点，需花费金钱${need * 100}G`,
      ),
      true,
      label,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      100000,
      `${label}：取消不扣钱`,
    );
  }
});

test('CHARA_INFO_UP_LEVEL：已有战斗经验先抵扣需求量', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  fixture.store.set('cflag:1:9', 3); // 需 40
  fixture.store.set('exp:1:80', 15);
  fixture.store.set('flag:10004', 100000);
  fixture.set_inputs(1);
  const { chara_info_up_level } = fixture.load_module(
    'chara/chara-info-actions',
  );

  await chara_info_up_level(1);

  assert.equal(
    printed_includes(fixture, '到下一级经验还要25点，需花费金钱2500G'),
    true,
    '40-15=25 点还差',
  );
});

test('CHARA_INFO_UP_LEVEL：确认购买后扣双资金、经验入账并触发升级', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 1);
  fixture.store.set('cflag:1:9', 3); // 需 40，金钱 4000
  fixture.store.set('flag:10004', 100000);
  fixture.store.set('exflag:4444', 100000);
  fixture.set_inputs(0);
  const { chara_info_up_level } = fixture.load_module(
    'chara/chara-info-actions',
  );

  await chara_info_up_level(1);

  assert.equal(fixture.store.get('flag:10004'), 100000 - 4000);
  assert.equal(fixture.store.get('exflag:4444'), 100000 - 4000);
  assert.ok(
    (fixture.store.get('cflag:1:9') || 0) > 3,
    '购买后等级必须真的提升（CALL LVUP, ARG）',
  );
});

test('CHARA_INFO_UP_LEVEL：金钱不够不扣款，购买播报恒用魔王名字（原作死代码，#391 登记）', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 1);
    fixture.store.set('cflag:1:9', 1); // 需 20，需金钱 2000
    fixture.store.set('flag:10004', 0);
    const { chara_info_up_level } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_up_level(1);

    assert.equal(printed_includes(fixture, '金钱不够'), true);
    assert.equal(fixture.store.get('exp:1:80'), undefined);
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '奴隶甲');
    fixture.store.set('cflag:1:9', 0); // 需 10
    fixture.store.set('flag:10004', 100000);
    fixture.set_inputs(0);
    const { chara_info_up_level } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_up_level(1);

    // :83 LOCALS 三目从未被 PRINTFORMW 读取，播报恒写 NAME:MASTER
    assert.equal(
      printed_includes(fixture, '你花费了1000G，购买了经验10点'),
      true,
    );
    assert.equal(printed_includes(fixture, '奴隶甲花费了'), false);
  }
});

test('CHARA_INFO_CALLBACK：等级不够或气力不够都提前失败，不产生任何状态变化', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '奴隶甲');
    fixture.store.set('cflag:1:1', 3);
    fixture.store.set('cflag:0:9', 5);
    fixture.store.set('cflag:1:9', 5); // target_lv >= master_lv
    const { chara_info_callback } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_callback(1);

    assert.equal(
      printed_includes(fixture, '无法对LV5的奴隶甲发动传送魔法'),
      true,
    );
    assert.equal(fixture.store.get('cflag:1:1'), 3, '状态未改变');
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '奴隶甲');
    fixture.store.set('cflag:1:1', 3);
    fixture.store.set('cflag:0:9', 10);
    fixture.store.set('cflag:1:9', 5); // ratio=trunc(500/10)=50 → cost=trunc(50*50*100/10000)=25
    fixture.store.set('maxbase:0:1', 100);
    fixture.store.set('base:0:1', 20); // 气力不足（cost=25）
    const { chara_info_callback } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_callback(1);

    assert.equal(printed_includes(fixture, '气力不足以对'), true);
    assert.equal(fixture.store.get('cflag:1:1'), 3);
  }
});

test('CHARA_INFO_CALLBACK：确认后扣魔王气力、召回并清对方状态；取消不变', async () => {
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '奴隶甲');
    fixture.store.set('cflag:1:1', 3);
    fixture.store.set('cflag:0:9', 10);
    fixture.store.set('cflag:1:9', 5); // ratio=50 → cost=25
    fixture.store.set('maxbase:0:1', 100);
    fixture.store.set('base:0:1', 50);
    fixture.set_inputs(0);
    const { chara_info_callback } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_callback(1);

    assert.equal(fixture.store.get('base:0:1'), 25, '气力扣 25');
    assert.equal(fixture.store.get('cflag:1:1'), 0, '目标状态清零');
    assert.equal(printed_includes(fixture, '使用魔法把奴隶甲传送了回来'), true);
  }
  {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '奴隶甲');
    fixture.store.set('cflag:1:1', 3);
    fixture.store.set('cflag:0:9', 10);
    fixture.store.set('cflag:1:9', 1);
    fixture.store.set('maxbase:0:1', 100);
    fixture.store.set('base:0:1', 50);
    fixture.set_inputs(1); // 还是算了
    const { chara_info_callback } = fixture.load_module(
      'chara/chara-info-actions',
    );

    await chara_info_callback(1);

    assert.equal(fixture.store.get('base:0:1'), 50, '未扣气力');
    assert.equal(fixture.store.get('cflag:1:1'), 3, '未召回');
  }
});
