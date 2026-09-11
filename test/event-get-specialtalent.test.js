/**
 * @file 特殊素质获得判定 @CHECK_SPECIALSKIL / @CHECK_SPECIALSKIL_BODYSHIFT
 *   的行为测试（issue #405）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

/** 建好世界并开始调教（step2 的 forced_semen_liking 依赖 TFLAG，仅调教中可寻址） */
function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  join_slave_chara(fixture, 31, '琼');
  fixture.era.beginTrain(31);
  return fixture;
}

function set_talentname(fixture, id, name) {
  fixture.store.set(`talentname:${id}`, name);
}

// —— 顶层守卫 ——

test('CHECK_SPECIALSKIL：cid 不在已加入角色列表时直接跳过', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');

  assert.equal(await check_specialskil(31), 0);
  assert.deepEqual(fixture.text_lines(), []);
});

test('CHECK_SPECIALSKIL：TALENT:9（崩坏）时只跑体变检查，跳过 STEP1/STEP2', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:9', 1);
  // 顺手把 STEP2 语义精饮的门槛也摆满，验证它确实被跳过
  fixture.store.set('abl:31:12', 7);
  fixture.store.set('abl:31:13', 7);
  fixture.store.set('exp:31:22', 2000);
  fixture.store.set('cflag:31:600', 100);
  set_talentname(fixture, 158, '同族妊娠不能');
  fixture.store.set('exp:31:62', 20); // 触发体变检查

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:47'), undefined, 'STEP2 未执行');
  assert.equal(fixture.store.get('talent:31:158'), 1, '体变检查仍执行');
});

// —— @CHECK_SPECIALSKIL_BODYSHIFT ——

test('CHECK_SPECIALSKIL_BODYSHIFT：异种妊娠经验达标且未持有时取得【同族妊娠不能】', async () => {
  const fixture = seed_world();
  const { check_specialskil_bodyshift } = fixture.load_module(
    'event/get-specialtalent',
  );
  fixture.store.set('exp:31:62', 20);
  set_talentname(fixture, 158, '同族妊娠不能');

  assert.equal(await check_specialskil_bodyshift(31), 0);
  assert.equal(fixture.store.get('talent:31:158'), 1);
  assert(fixture.text_lines().includes('琼获得了【同族妊娠不能】'));
});

test('CHECK_SPECIALSKIL_BODYSHIFT：经验不足不触发', async () => {
  const fixture = seed_world();
  const { check_specialskil_bodyshift } = fixture.load_module(
    'event/get-specialtalent',
  );
  fixture.store.set('exp:31:62', 19);

  await check_specialskil_bodyshift(31);

  assert.equal(fixture.store.get('talent:31:158'), undefined);
});

test('CHECK_SPECIALSKIL_BODYSHIFT：已持有时不重复触发', async () => {
  const fixture = seed_world();
  const { check_specialskil_bodyshift } = fixture.load_module(
    'event/get-specialtalent',
  );
  fixture.store.set('exp:31:62', 20);
  fixture.store.set('talent:31:158', 1);

  await check_specialskil_bodyshift(31);

  assert.deepEqual(fixture.text_lines(), []);
});

// —— STEP1（MARK:3 == 0 时才跑）——

test('STEP1：MARK:3 非 0（有反抗刻印）时整段跳过', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('mark:31:3', 3);
  // 摆满爱慕觉醒的全部条件
  fixture.store.set('cflag:31:2', 1000);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);

  await check_specialskil(31);

  assert.equal(
    fixture.store.get('talent:31:85'),
    undefined,
    'STEP1 被 MARK:3 挡住',
  );
});

test('STEP1：CFLAG:2>=2000 且未助手化时顺从达 Lv5 并可卖出/做助手', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 2000);
  fixture.store.set('cflag:31:0', 0);
  fixture.store.set('talent:31:85', 1);
  fixture.store.set('abl:31:10', 3);

  await check_specialskil(31);

  assert.equal(fixture.store.get('abl:31:10'), 5, '顺从被拉到 5');
  assert.equal(fixture.store.get('cflag:31:0'), 2, '助手化');
  assert(fixture.text_lines().includes('顺从LV5了'));
  assert(fixture.text_lines().includes('琼可以被卖掉了。'));
});

test('STEP1：CFLAG:2>=2000 分支——顺从已达 5、已可卖出时不重复提示', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 2000);
  fixture.store.set('cflag:31:0', 1); // 已可卖出（>=1）
  fixture.store.set('talent:31:76', 1);
  fixture.store.set('abl:31:10', 5);

  await check_specialskil(31);

  assert(!fixture.text_lines().includes('顺从LV5了'));
  assert(!fixture.text_lines().some((l) => l.includes('可以被卖掉了')));
  assert(fixture.text_lines().includes('琼可以做助手了。'));
});

test('STEP1：CFLAG:2>=2000 但未持有爱慕/淫乱则不进入该分支', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 2000);
  fixture.store.set('cflag:31:0', 0);

  await check_specialskil(31);

  assert.equal(fixture.store.get('cflag:31:0'), 0, '未助手化');
});

test('STEP1：CFLAG:2 在 [1000,2000) 区间且条件达标触发爱慕觉醒', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 85, '爱慕');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200); // EXPLV:5
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:85'), 1);
  assert(fixture.text_lines().includes('琼获得了【爱慕】。'));
});

test('STEP1：爱慕觉醒经验差 1 点（EXPLV:5 未达标）则不触发', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 199);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:85'), undefined);
});

test('STEP1：CFLAG:2 在 [1000,2000) 区间且条件达标触发淫乱觉醒', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 76, '淫乱');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:0', 3);
  fixture.store.set('abl:31:1', 3);
  fixture.store.set('abl:31:2', 2);
  fixture.store.set('abl:31:3', 2); // 合计 10
  fixture.store.set('exp:31:50', 3);
  fixture.store.set('mark:31:1', 3);
  fixture.store.set('mark:31:2', 3);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:76'), 1);
  assert(fixture.text_lines().includes('琼获得了【淫乱】。'));
});

test('STEP1：CFLAG:2>=5000 且顺从/刻印达标时清除从不自慰/绝不侍奉/不受洗脑', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 5000);
  fixture.store.set('abl:31:10', 5);
  fixture.store.set('mark:31:1', 3);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('talent:31:150', 1);
  fixture.store.set('talent:31:151', 1);
  fixture.store.set('talent:31:152', 1);
  set_talentname(fixture, 150, '从不自慰');
  set_talentname(fixture, 151, '绝不侍奉');
  set_talentname(fixture, 152, '不受洗脑');

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:150'), 0);
  assert.equal(fixture.store.get('talent:31:151'), 0);
  assert.equal(fixture.store.get('talent:31:152'), 0);
});

// —— 爱慕觉醒内部分支（通过 STEP1 触发）——

test('爱慕觉醒：【傲娇】+【反抗】时反抗变为顺从素质', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 11, '反抗');
  set_talentname(fixture, 13, '顺从心');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('talent:31:11', 1);
  fixture.store.set('talent:31:18', 1); // 傲娇

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:11'), 0);
  assert.equal(fixture.store.get('talent:31:13'), 1);
  assert(fixture.text_lines().includes('琼失去了【反抗】，获得了【顺从心】。'));
});

test('爱慕觉醒：非傲娇的反抗直接消失', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 11, '反抗');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('talent:31:11', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:11'), 0);
  assert(fixture.text_lines().includes('琼失去了【反抗】。'));
});

test('爱慕觉醒：持有寿命且＞0 时提示剩余天数为 BASE:10 的一半', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('base:31:10', 7);

  await check_specialskil(31);

  assert(fixture.text_lines().includes('琼时日无多，生命还剩下3天。'));
});

test('爱慕觉醒：持有【魂缚】（274）时被解放', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 274, '魂缚');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('talent:31:274', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:274'), 0);
  assert(fixture.text_lines().includes('琼失去了【魂缚】。'));
});

test('爱慕觉醒：持有【贞操封印】时可选择保留或解开', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 273, '贞操封印');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('talent:31:273', 1);
  fixture.set_inputs(1); // 解开封印

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:273'), 0);
});

test('爱慕觉醒：贞操封印选择保留时素质不动', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:10', 3);
  fixture.store.set('exp:31:21', 200);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('talent:31:273', 1);
  fixture.set_inputs(0); // 保留封印

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:273'), 1);
});

// —— 淫乱觉醒内部分支 ——

test('淫乱觉醒：种族=1（精灵）时堕落为肉壶，青肌以外变褐色肌', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:0', 10);
  fixture.store.set('exp:31:50', 3);
  fixture.store.set('mark:31:1', 3);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('talent:31:314', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:314'), 7);
  assert.equal(fixture.store.get('talent:31:253'), 1);
  assert.equal(fixture.store.get('talent:31:255'), 0);
});

test('淫乱觉醒：种族=1 但已是青肌（244）时不改变肌色', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:0', 10);
  fixture.store.set('exp:31:50', 3);
  fixture.store.set('mark:31:1', 3);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('talent:31:314', 1);
  fixture.store.set('talent:31:244', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:253'), undefined);
});

test('淫乱觉醒：种族=6 时堕落为更深层的下等性奴隶', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:0', 10);
  fixture.store.set('exp:31:50', 3);
  fixture.store.set('mark:31:1', 3);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('talent:31:314', 6);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:314'), 8);
});

test('淫乱觉醒：持有【魂缚】时跳过种族堕落判定', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 274, '魂缚');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:0', 10);
  fixture.store.set('exp:31:50', 3);
  fixture.store.set('mark:31:1', 3);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('talent:31:274', 1);
  fixture.store.set('talent:31:314', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:314'), 1, '未被改成 7');
});

test('淫乱觉醒：【压抑】【抵抗】【嫉妒】组合消失——84 号打印的是 32 号的名字（原作 bug）', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 32, '压抑');
  set_talentname(fixture, 34, '抵抗');
  fixture.store.set('cflag:31:2', 1500);
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:0', 10);
  fixture.store.set('exp:31:50', 3);
  fixture.store.set('mark:31:1', 3);
  fixture.store.set('mark:31:2', 3);
  fixture.store.set('talent:31:84', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:84'), 0);
  assert(
    fixture.text_lines().some((l) => l === '琼的【压抑】失去了。'),
    '84 号消失渲染出的是 32 号（压抑）的名字，原作 bug 逐字保留',
  );
});

// —— 玛奥替身判定（爱慕/淫乱觉醒共用）——

test('玛奥（cid=17）觉醒时额外取得 EX_TALENT:3 替身素质', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  join_slave_chara(fixture, 17, '玛奥');
  fixture.era.beginTrain(17);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:17:2', 1500);
  fixture.store.set('abl:17:10', 3);
  fixture.store.set('exp:17:21', 200);
  fixture.store.set('mark:17:2', 3);
  fixture.store.set('abl:17:16', 3);

  await check_specialskil(17);

  assert.equal(fixture.store.get('ex_talent:17:3'), 1);
});

// —— STEP2：精饮相关素质【喜欢精液】 ——

function skip_step1(fixture, cid = 31) {
  fixture.store.set(`mark:${cid}:3`, 3); // 让 STEP1 整段跳过，聚焦 STEP2
}

test('semen_liking：门槛 1（能力 7/7、经验 2000、CFLAG:600>=100）取得喜欢精液', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 47, '喜欢精液');
  fixture.store.set('abl:31:12', 7);
  fixture.store.set('abl:31:13', 7);
  fixture.store.set('exp:31:22', 2000);
  fixture.store.set('cflag:31:600', 100);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:47'), 1);
  assert(fixture.text_lines().includes('琼获得了【喜欢精液】。'));
});

test('semen_liking：门槛 2（能力 5/5、经验 1500、CFLAG:600>=80）取得喜欢精液', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:12', 5);
  fixture.store.set('abl:31:13', 5);
  fixture.store.set('exp:31:22', 1500);
  fixture.store.set('cflag:31:600', 80);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:47'), 1);
});

test('semen_liking：门槛 3 需已持有 TALENT:52（擅用舌头），经验降到 1000/CFLAG:600>=50', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:12', 5);
  fixture.store.set('abl:31:13', 5);
  fixture.store.set('exp:31:22', 1000);
  fixture.store.set('cflag:31:600', 50);
  fixture.store.set('talent:31:52', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:47'), 1);
});

test('semen_liking：门槛 3 若未持有 TALENT:52 则不触发（52 是获取条件不是排除条件的反面）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:12', 5);
  fixture.store.set('abl:31:13', 5);
  fixture.store.set('exp:31:22', 1000);
  fixture.store.set('cflag:31:600', 50);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:47'), undefined);
});

test('semen_liking：已持有喜欢精液时不重复触发', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:47', 1);
  fixture.store.set('abl:31:12', 7);
  fixture.store.set('abl:31:13', 7);
  fixture.store.set('exp:31:22', 2000);
  fixture.store.set('cflag:31:600', 100);
  fixture.store.set('talent:31:52', 1); // 避免 skilled_tongue 分支同时命中干扰断言

  await check_specialskil(31);

  assert.deepEqual(fixture.text_lines(), []);
});

// —— STEP2：特殊技能素质【擅用舌头】 ——

test('skilled_tongue：已持有特殊技能（51）时门槛降为 7/7/1500', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 52, '擅用舌头');
  fixture.store.set('talent:31:51', 1);
  fixture.store.set('abl:31:12', 7);
  fixture.store.set('abl:31:13', 7);
  fixture.store.set('exp:31:22', 1500);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:52'), 1);
});

test('skilled_tongue：未持有特殊技能时门槛为 5/5/1000', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:12', 5);
  fixture.store.set('abl:31:13', 5);
  fixture.store.set('exp:31:22', 1000);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:52'), 1);
});

test('skilled_tongue：持有特殊技能但达不到 7/7/1500 时不套用 5/5/1000 门槛', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:51', 1);
  fixture.store.set('abl:31:12', 5);
  fixture.store.set('abl:31:13', 5);
  fixture.store.set('exp:31:22', 1000);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:52'), undefined);
});

// —— STEP2：特殊性癖/性感素质 ——

test('fetish_talents：施虐狂门槛达标取得', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:20', 4);
  fixture.store.set('abl:31:12', 4);
  fixture.store.set('exp:31:33', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:83'), 1);
});

test('fetish_talents：受虐狂门槛达标取得', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:21', 4);
  fixture.store.set('abl:31:17', 2);
  fixture.store.set('exp:31:30', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:88'), 1);
});

test('fetish_talents：露出狂门槛按口交+私处+精液经验求和判定', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:17', 4);
  fixture.store.set('abl:31:21', 2);
  fixture.store.set('exp:31:11', 100);
  fixture.store.set('exp:31:31', 50);
  fixture.store.set('exp:31:54', 50);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:89'), 1);
});

test('fetish_talents：牝犬门槛达标取得', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:11', 5);
  fixture.store.set('abl:31:39', 3);
  fixture.store.set('exp:31:56', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:136'), 1);
});

test('fetish_talents：主从逆转门槛达标取得（露出癖路径优先于异种恋慕路径）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:21', 2);
  fixture.store.set('exp:31:63', 100);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('exp:31:64', 100);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:293'), 1);
  assert.equal(fixture.store.get('talent:31:294'), undefined);
});

test('fetish_talents：不满足主从逆转路径时改走异种恋慕路径', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('abl:31:16', 3);
  fixture.store.set('exp:31:64', 100);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:294'), 1);
});

// —— STEP2：阴蒂/私处/肛门/乳房「狂」系四选一（SEXSKILL） ——

test('arousal_specialty：count=0 时直接尝试获得 74（非扶她/男，打印阴蒂）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 74, '自慰狂');
  fixture.store.set('abl:31:0', 4);
  fixture.store.set('exp:31:11', 100);
  fixture.store.set('exp:31:2', 100);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:74'), 1);
  assert(fixture.text_lines().some((l) => l === '阴蒂'));
});

test('arousal_specialty：持有扶她素质（122）时 74 的展示改为阴茎', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('abl:31:0', 4);
  fixture.store.set('exp:31:11', 100);
  fixture.store.set('exp:31:2', 100);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:74'), 1);
  assert(fixture.text_lines().some((l) => l === '阴茎'));
});

test('arousal_specialty：74 已持有时跨过、改取 75（私处路径，跃迁门槛按 count=1 抬高）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:74', 1); // count=1 → exp1=150,exp2=110,exp3=350
  fixture.store.set('abl:31:2', 5); // 跃迁：abl2>=5
  fixture.store.set('exp:31:0', 350); // 跃迁：exp0>=exp3(350)，同时满足 ADD 自身门槛 exp0>=300
  fixture.store.set('exp:31:2', 110); // 跃迁：exp2>=exp2(110)，同时满足 ADD 自身门槛 exp2>=100

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:75'), 1);
});

test('arousal_specialty：持有扶她素质且 74 已持有时改走 75 的性器路径（EXP:5，跃迁门槛按 count=1 抬高）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:74', 1); // count=1 → exp1=150,exp2=110,exp3=350
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('abl:31:0', 5); // 跃迁：abl0>=5
  fixture.store.set('exp:31:5', 350); // 跃迁：exp5>=exp3(350)
  fixture.store.set('exp:31:2', 150); // 跃迁：exp2>=exp1(150)

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:75'), 1);
});

test('arousal_specialty：74/75 均已持有时改取 77（肛门，跃迁门槛按 count=2 抬高）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:74', 1);
  fixture.store.set('talent:31:75', 1); // count=2 → exp1=200,exp2=120,exp3=400
  fixture.store.set('abl:31:3', 5); // 跃迁：abl3>=5
  fixture.store.set('exp:31:32', 400); // 跃迁：exp32>=exp3(400)
  fixture.store.set('exp:31:2', 120); // 跃迁：exp2>=exp2(120)

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:77'), 1);
});

test('arousal_specialty：74/75/77 均已持有且非扶她时改取 78（乳房路径，跃迁门槛按 count=3 抬高）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:74', 1);
  fixture.store.set('talent:31:75', 1);
  fixture.store.set('talent:31:77', 1); // count=3 → exp1=250,exp2=130,exp3=450
  fixture.store.set('abl:31:1', 5); // 跃迁：abl1>=5
  fixture.store.set('exp:31:54', 250); // 跃迁：exp54>=exp1(250)
  fixture.store.set('exp:31:2', 130); // 跃迁：exp2>=exp2(130)

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:78'), 1);
});

test('arousal_specialty：扶她时 78 改走 JUEL:14 门槛（乳房经验不适用，跃迁门槛按 count=3 抬高）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:74', 1);
  fixture.store.set('talent:31:75', 1);
  fixture.store.set('talent:31:77', 1); // count=3 → exp1=250,exp2=130,exp3=450
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('abl:31:1', 5); // 跃迁：abl1>=5
  fixture.store.set('juel:31:14', 250); // 跃迁：juel14>=exp1(250)
  fixture.store.set('exp:31:2', 130); // 跃迁：exp2>=exp2(130)

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:78'), 1);
});

test('arousal_specialty：四项全部持有时直接跳过（两重守卫合并为一次判定）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  for (const id of [74, 75, 77, 78]) fixture.store.set(`talent:31:${id}`, 1);
  fixture.store.set('abl:31:0', 4);
  fixture.store.set('exp:31:11', 100);
  fixture.store.set('exp:31:2', 100);

  await check_specialskil(31);

  assert.deepEqual(fixture.text_lines(), []);
});

test('arousal_specialty：持有 1~3 个时需先满足某个跃迁条件才进入候选判定', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:74', 1); // count=1
  // 未满足任何跃迁条件，且 75 的基础门槛（abl2>=4 等）本身也达标——
  // 但跃迁门槛按 count=1 抬高到 exp1=150/exp2=110/exp3=350，用不满足这些抬高
  // 门槛、但满足未抬高门槛的数值来验证跃迁闸门确实生效
  fixture.store.set('abl:31:2', 4);
  fixture.store.set('exp:31:0', 300); // 达不到抬高后的 exp3=350
  fixture.store.set('exp:31:2', 100); // 达不到抬高后的 exp2=110

  await check_specialskil(31);

  assert.equal(
    fixture.store.get('talent:31:75'),
    undefined,
    '跃迁门槛未达标，不进入候选判定',
  );
});

test('arousal_specialty：持有 1~3 个且满足抬高后的跃迁门槛时才进入候选判定', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:74', 1); // count=1 → exp1=150,exp2=110,exp3=350
  fixture.store.set('abl:31:2', 5); // 跃迁条件：abl2>=5
  fixture.store.set('exp:31:0', 350); // 跃迁条件：exp0>=exp3
  fixture.store.set('exp:31:2', 110); // 跃迁条件：exp2>=exp1(150)——
  // 注意跃迁的第二条件是 exp(2)>=exp1（150），110 不够，改用 150
  fixture.store.set('exp:31:2', 150);
  // ADD 自身门槛仍是固定值（abl2>=4,exp0>=300,exp2>=100），均已满足

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:75'), 1);
});

// —— STEP2：強化素質（FLAG:73 <= 0 时启用）——

test('enhanced_talents：FLAG:73 > 0 时整段跳过', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('flag:73', 1);
  fixture.store.set('abl:31:0', 5);
  fixture.store.set('exp:31:11', 100);
  fixture.store.set('exp:31:2', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:230'), undefined);
});

test('enhanced_talents：绝伦/230 门槛达标（非扶她展示 TALENTNAME）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 230, '敏感体质');
  fixture.store.set('abl:31:0', 5);
  fixture.store.set('exp:31:11', 100);
  fixture.store.set('exp:31:2', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:230'), 1);
  assert(fixture.text_lines().includes('琼获得了【敏感体质】。'));
});

test('enhanced_talents：绝伦/230 门槛达标且持有扶她素质时改称【绝伦】', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('abl:31:0', 5);
  fixture.store.set('exp:31:11', 100);
  fixture.store.set('exp:31:2', 300);

  await check_specialskil(31);

  assert(fixture.text_lines().includes('琼获得了【绝伦】。'));
});

test('enhanced_talents：淫壶/232 门槛达标', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 232, '淫壶');
  fixture.store.set('abl:31:2', 5);
  fixture.store.set('exp:31:0', 300);
  fixture.store.set('exp:31:2', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:232'), 1);
});

test('enhanced_talents：淫肛/233 门槛达标', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:3', 5);
  fixture.store.set('exp:31:32', 300);
  fixture.store.set('exp:31:2', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:233'), 1);
});

test('enhanced_talents：淫乳/231 门槛达标', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('abl:31:1', 5);
  fixture.store.set('exp:31:54', 100);
  fixture.store.set('exp:31:2', 300);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:231'), 1);
});

test('enhanced_talents：四项集齐后取得性豪并清除 101/103（等键）与 105/107（不等键）', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  for (const id of [230, 231, 232, 233])
    fixture.store.set(`talent:31:${id}`, 1);
  for (const id of [101, 103, 105, 107])
    fixture.store.set(`talent:31:${id}`, 1);
  set_talentname(fixture, 272, '性豪');

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:272'), 1);
  assert.equal(fixture.store.get('talent:31:101'), 0);
  assert.equal(fixture.store.get('talent:31:103'), 0);
  assert.equal(fixture.store.get('talent:31:105'), 0);
  assert.equal(fixture.store.get('talent:31:107'), 0);
  assert(fixture.text_lines().includes('琼获得了【性豪】。'));
});

// —— STEP2：时常发情（FLAG:75 <= 0 时启用）——

test('constant_arousal：FLAG:75 > 0 时跳过', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('flag:75', 1);
  fixture.store.set('cflag:31:81', 700);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:271'), undefined);
});

test('constant_arousal：门槛达标且非扶她/男时只展示私处', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 271, '时常发情');
  fixture.store.set('cflag:31:81', 700);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:271'), 1);
  assert(fixture.text_lines().includes('琼的'));
  assert(fixture.text_lines().some((l) => l === '私处'));
  assert(!fixture.text_lines().some((l) => l === '龟头'));
});

test('constant_arousal：门槛未达标时不触发', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('cflag:31:81', 699);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:271'), undefined);
});

test('constant_arousal：扶她（121）时同时展示龟头与私处，中间加「和」', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:121', 1);
  fixture.store.set('cflag:31:81', 700);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert(fixture.text_lines().some((l) => l === '龟头'));
  assert(fixture.text_lines().some((l) => l === '和'));
  assert(fixture.text_lines().some((l) => l === '私处'));
});

test('constant_arousal：男（122，非扶她）时只展示龟头', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('cflag:31:81', 700);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert(fixture.text_lines().some((l) => l === '龟头'));
  assert(!fixture.text_lines().some((l) => l === '和'));
  assert(!fixture.text_lines().some((l) => l === '私处'));
});

test('constant_arousal：未持有克制/冷漠时取得 42', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 42, '发情体质');
  fixture.store.set('cflag:31:81', 700);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:42'), 1);
});

test('constant_arousal：已持有 43 时改为失去 43', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 43, '性冷淡');
  fixture.store.set('talent:31:43', 1);
  fixture.store.set('cflag:31:81', 700);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:43'), 0);
  assert.equal(
    fixture.store.get('talent:31:42'),
    undefined,
    '43 分支与 42 分支互斥',
  );
});

test('constant_arousal：否定快感（71）与看重贞操（30）随之消失', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 71, '否定快感');
  set_talentname(fixture, 30, '看重贞操');
  fixture.store.set('talent:31:71', 1);
  fixture.store.set('talent:31:30', 1);
  fixture.store.set('cflag:31:81', 700);
  fixture.store.set('cflag:31:82', 2250);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:71'), 0);
  assert.equal(fixture.store.get('talent:31:30'), 0);
});

// —— STEP2：喜欢精液の习得（TFLAG:110 强制精饮绝顶触发 + seiin 参数）——

test('forced_semen_liking：TFLAG:110 为假时跳过', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');

  await check_specialskil(31, 1);

  assert.equal(fixture.store.get('talent:31:47'), undefined);
});

test('forced_semen_liking：TFLAG:110 与 seiin 均真时取得喜欢精液并清 TFLAG:110', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 47, '喜欢精液');
  fixture.store.set('tflag:110', 1);

  await check_specialskil(31, 1);

  assert.equal(fixture.store.get('talent:31:47'), 1);
  assert.equal(fixture.store.get('tflag:110'), 0);
});

test('forced_semen_liking：seiin 为假时即便 TFLAG:110 为真也不触发', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('tflag:110', 1);

  await check_specialskil(31); // 默认 seiin = 0

  assert.equal(fixture.store.get('talent:31:47'), undefined);
  assert.equal(fixture.store.get('tflag:110'), 1, '未消费');
});

test('forced_semen_liking：反感污臭随之消失，精液中毒不足 LV3 时补足', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 62, '反感污臭');
  fixture.store.set('talent:31:62', 1);
  fixture.store.set('tflag:110', 1);
  fixture.store.set('abl:31:32', 1);

  await check_specialskil(31, 1);

  assert.equal(fixture.store.get('talent:31:62'), 0);
  assert.equal(fixture.store.get('abl:31:32'), 3);
});

test('forced_semen_liking：精液中毒已达 LV3 时不下调', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('tflag:110', 1);
  fixture.store.set('abl:31:32', 5);

  await check_specialskil(31, 1);

  assert.equal(fixture.store.get('abl:31:32'), 5);
});

// —— STEP2：マイナス素质の消灭 ——

test('negative_talent_removal：绝不侍奉（151）在 ABL:16>=5 时消失', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 151, '绝不侍奉');
  fixture.store.set('talent:31:151', 1);
  fixture.store.set('abl:31:16', 5);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:151'), 0);
});

test('negative_talent_removal：从不自慰（150）在 ABL:31>=5 时消失', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 150, '从不自慰');
  fixture.store.set('talent:31:150', 1);
  fixture.store.set('abl:31:31', 5);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:150'), 0);
});

test('negative_talent_removal：男性（122）时 82 需 ABL:23>=5 才消失', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 82, '性交厌恶');
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('talent:31:82', 1);
  fixture.store.set('abl:31:23', 5);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:82'), 0);
});

test('negative_talent_removal：男性（122）但 ABL:23 不足时 82 不消失', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('talent:31:82', 1);
  fixture.store.set('abl:31:23', 4);
  fixture.store.set('abl:31:30', 3);
  fixture.store.set('abl:31:32', 3);

  await check_specialskil(31);

  assert.equal(
    fixture.store.get('talent:31:82'),
    1,
    '男性分支不套用女性分支的门槛',
  );
});

test('negative_talent_removal：非男性时 82 需 ABL:30>=3 且 ABL:32>=3 才消失', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:82', 1);
  fixture.store.set('abl:31:30', 3);
  fixture.store.set('abl:31:32', 3);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:82'), 0);
});

test('negative_talent_removal：反感精液（79）在 ABL:22>=5 时消失', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 79, '反感精液');
  fixture.store.set('talent:31:79', 1);
  fixture.store.set('abl:31:22', 5);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:79'), 0);
});

// —— STEP2：マスターの特殊能力 ——

test('master_charm：堕落人数（FLAG:30）达 5 人以上时魔王取得对应能力', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 92, '魔性魅力');
  fixture.store.set('flag:30', 5);
  fixture.store.set('callname:0:-1', '魔王');

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:0:92'), 1);
  assert(fixture.text_lines().includes('魔王掌握了【魔性魅力】。'));
});

test('master_charm：堕落人数不足 5 人时不触发', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('flag:30', 4);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:0:92'), undefined);
});

test('master_charm：魔王已持有时不重复触发', async () => {
  const fixture = seed_world();
  skip_step1(fixture);
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('flag:30', 5);
  fixture.store.set('talent:0:92', 1);

  await check_specialskil(31);

  assert.deepEqual(fixture.text_lines(), []);
});

// —— STEP2：妓女・倾城の修得（不调用 skip_step1，靠 CFLAG:2 偏低让 STEP1 自然静默）——

test('prostitution_talents：种族=5 路径门槛达标取得妓女（180）', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 180, '妓女');
  fixture.store.set('talent:31:315', 5);
  fixture.store.set('exp:31:74', 80);
  fixture.store.set('abl:31:11', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:180'), 1);
});

test('prostitution_talents：常规路径门槛（经验 100/能力 2/1）达标取得妓女（180）', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('exp:31:74', 100);
  fixture.store.set('abl:31:11', 2);
  fixture.store.set('abl:31:12', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:180'), 1);
});

test('prostitution_talents：MARK:3 非 0（有反抗刻印）时不取得妓女', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('mark:31:3', 3);
  fixture.store.set('exp:31:74', 100);
  fixture.store.set('abl:31:11', 2);
  fixture.store.set('abl:31:12', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:180'), undefined);
});

test('prostitution_talents：种族=5 路径门槛达标（180 已持有）取得倾城（181）', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 181, '倾城');
  fixture.store.set('talent:31:315', 5);
  fixture.store.set('exp:31:74', 160);
  fixture.store.set('talent:31:180', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:181'), 1);
});

test('prostitution_talents：常规路径门槛（经验 200，180 已持有）取得倾城（181）', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('exp:31:74', 200);
  fixture.store.set('talent:31:180', 1);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:181'), 1);
});

test('prostitution_talents：未持有 180 时不取得倾城（181）', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('exp:31:74', 200);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:181'), undefined);
});

// —— STEP2：妄信の修得 ——

test('blind_faith：持有爱慕（85）且门槛达标时取得妄信', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  set_talentname(fixture, 86, '妄信');
  fixture.store.set('talent:31:85', 1);
  fixture.store.set('exp:31:81', 5);
  fixture.store.set('abl:31:10', 4);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:86'), 1);
});

test('blind_faith：持有淫乱（76）时门槛更高（经验 10/顺从 5）', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:76', 1);
  fixture.store.set('exp:31:81', 10);
  fixture.store.set('abl:31:10', 5);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:86'), 1);
});

test('blind_faith：持有淫乱但经验/顺从达不到淫乱专属门槛时不触发', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:76', 1);
  fixture.store.set('exp:31:81', 9);
  fixture.store.set('abl:31:10', 5);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:86'), undefined);
});

test('blind_faith：MARK:3 非 0 时不触发', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('mark:31:3', 3);
  fixture.store.set('talent:31:85', 1);
  fixture.store.set('exp:31:81', 5);
  fixture.store.set('abl:31:10', 4);

  await check_specialskil(31);

  assert.equal(fixture.store.get('talent:31:86'), undefined);
});

test('blind_faith：已持有妄信时不重复触发', async () => {
  const fixture = seed_world();
  const { check_specialskil } = fixture.load_module('event/get-specialtalent');
  fixture.store.set('talent:31:85', 1);
  fixture.store.set('exp:31:81', 5);
  fixture.store.set('abl:31:10', 4);
  fixture.store.set('talent:31:86', 1);

  await check_specialskil(31);

  assert.deepEqual(fixture.text_lines(), []);
});
