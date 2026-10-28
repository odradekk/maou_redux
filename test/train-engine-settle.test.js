/**
 * 调教结算交还引擎（#875）：体力/气力（base）与宝珠（juel）。
 *
 * 缝 = test/helpers/era-fixture.js（#875 起它的 nextTurnInTrain 镜像引擎的
 * deltabase→base、endTrain 镜像 gotjuel→juel）。
 *
 * 核心证据是工单要求的「同一份输入，改动前后输出与终值逐字相同」：下面每个
 * 基准值都取自改动前（SOURCE_CHECK 当场结算 base、juel_check_main 当场写
 * juel 并清零 gotjuel）的实测——两棵树的同种子输出已逐字 diff 过，只有
 * 「结算之前的内部值」按设计不同（base 不动、juel 不动），输出与引擎结算后
 * 的终值一字不差。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** NBSP 归一成空格：宽度信息不丢（1:1 替换），读起来能对格式 */
const narrow = (line) => (line ?? '').replace(/\u00A0/g, ' ');

/** 夹具渲染出来的逐行文本（分隔线记成哨兵） */
function output_lines(fixture) {
  return fixture.lines.map((line) =>
    line.type === 'divider' ? '<divider>' : narrow(line.text ?? ''),
  );
}

/**
 * 一回合：COM0（爱抚）→ 种子 → SOURCE_CHECK（**不结算**，结算前后两种
 * 状态都要能观察）。种子与 #874 的 palam 用例同款，另加两次体力的负向
 * 损耗（COM0 的 5/50 与绝顶的 20/10、气力 0 时的加倍）。
 *
 * @param {{base0?: number, base1?: number}} [seed] 体力/气力的初值
 * @returns {Promise<object>} 夹具
 */
async function run_round({ base0 = 1450, base1 = 410 } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  era_flag.prevcom = 12;
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', base0);
  fixture.store.set('base:31:1', base1);
  // TALENT:0:122 = 男人：避免 source_sex_check() 把未声明的双方误判成同性
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('abl:31:0', 8);
  fixture.store.set('abl:0:12', 5);
  fixture.store.set('palam:31:0', 9000);
  fixture.load_module('system/train/com-caress');
  fixture.load_module('system/train/source-check');
  const { com_family } = fixture.load_module('system/train/com-family');
  const { emit } = fixture.load_module('system/event/registry');
  await com_family.call(0);
  // COM0 之后补种子：COM0 会覆写这些源/名字
  fixture.store.set('source:31:18', 1234);
  fixture.store.set('cstr:31:7', '足');
  await emit('SOURCE_CHECK');
  return fixture;
}

/** 改动前的源一览 + 损耗条 + 结算块（NBSP 已归一），取自改动前实测 */
const BASE_NORMAL_GOLDEN = [
  '阴核(5600)乳房(30)足(1234)情爱(150)性行动(60)不洁(30)液体追加(731)露出(600)屈从(200)　',
  ' 体力[======================-.........] -25 ',
  ' 气力[=====-..........................] -60 ',
  '阴核  9000+  3640-  9000=  3640',
  '乳房     0+    15       =    15',
  '<divider>',
  '润滑     0+   731       =   731（晨露般稍湿）',
  '<divider>',
  '恭顺     0+    14       =    14（没有好感）',
  '欲情     0+   570       =   570（正在发情）',
  '屈服     0+   100       =   100（还未屈服）',
  '习得     0+    34       =    34（不是很懂）',
  '耻情     0+   600       =   600（感到害羞）',
  '<divider>',
  '反感     0+   318       =   318（有点反感）',
  '不快     0+    30       =    30（没有感到不快）',
  '抑郁     0+    24       =    24（没有郁闷）',
  '足     0+  1234       =  1234',
];

/** 改动前的钳制档：体力 5 - 130 → 0（死亡星标），气力 0 → 0 */
const BASE_CLAMP_GOLDEN = [
  '阴核(5600)乳房(30)足(1234)情爱(150)性行动(60)不洁(30)液体追加(365)露出(600)屈从(200)　',
  ' 体力[................................] -130 ★死亡★',
  ' 气力[................................] ★气力０★ ',
  '阴核  9000+  1820-  9000=  1820',
  '乳房     0+     7       =     7',
  '<divider>',
  '润滑     0+   182       =   182（干如沙漠）',
  '<divider>',
  '恭顺     0+     7       =     7（没有好感）',
  '欲情     0+   285       =   285（正在发情）',
  '屈服     0+   100       =   100（还未屈服）',
  '习得     0+    17       =    17（不是很懂）',
  '耻情     0+   600       =   600（感到害羞）',
  '<divider>',
  '反感     0+   318       =   318（有点反感）',
  '不快     0+    30       =    30（没有感到不快）',
  '抑郁     0+    12       =    12（没有郁闷）',
  '足     0+  1234       =  1234',
];

test('base：同一份输出与同一份终值（损耗只写 deltabase，引擎结算）', async () => {
  const fixture = await run_round();
  const seq = output_lines(fixture);
  const start = seq.findIndex((line) => line.startsWith('‥‥'));
  assert.ok(start >= 0, '读键点线在场（源一览与损耗条在其后）');
  assert.deepEqual(
    seq.slice(start + 1),
    BASE_NORMAL_GOLDEN,
    '源一览、两条损耗条与结算块与改动前逐字一致',
  );

  // 结算之前：base 一格没动，损耗全在 deltabase（负值）
  assert.equal(fixture.store.get('base:31:0'), 1450, 'base 不应当场写');
  assert.equal(fixture.store.get('base:31:1'), 410, 'base 不应当场写');
  assert.equal(
    fixture.store.get('deltabase:31:0'),
    -25,
    '损耗留在 deltabase（COM0 5 + 绝顶 20）',
  );
  assert.equal(
    fixture.store.get('deltabase:31:1'),
    -60,
    '损耗留在 deltabase（COM0 50 + 绝顶 10）',
  );

  // 引擎结算一次：终值与改动前相同；重复结算不二次扣减
  fixture.era.nextTurnInTrain();
  assert.equal(fixture.store.get('base:31:0'), 1425, '1450 - 25');
  assert.equal(fixture.store.get('base:31:1'), 350, '410 - 60');
  assert.equal(fixture.store.get('deltabase:31:0'), 0, 'deltabase 由引擎清零');
  assert.equal(fixture.store.get('deltabase:31:1'), 0, 'deltabase 由引擎清零');
  fixture.era.nextTurnInTrain();
  assert.equal(fixture.store.get('base:31:0'), 1425, '第二次结算不重复扣减');
});

test('base：钳到 0 与死亡星标、气力０与改动前一致', async () => {
  const fixture = await run_round({ base0: 5, base1: 0 });
  const seq = output_lines(fixture);
  const start = seq.findIndex((line) => line.startsWith('‥‥'));
  assert.deepEqual(
    seq.slice(start + 1),
    BASE_CLAMP_GOLDEN,
    '损耗条（钳到 0 的死亡档、气力０）与结算块逐字一致',
  );

  assert.equal(fixture.store.get('base:31:0'), 5, 'base 不应当场写');
  assert.equal(fixture.store.get('base:31:1'), 0, 'base 不应当场写');
  assert.equal(
    fixture.store.get('deltabase:31:0'),
    -130,
    '气力０的损耗加倍与绝顶损耗都留在 deltabase',
  );
  fixture.era.nextTurnInTrain();
  assert.equal(fixture.store.get('base:31:0'), 0, '5 - 130 钳到 0');
  assert.equal(fixture.store.get('base:31:1'), 0, '0 - 60 钳到 0');
});

test('base：AUTO 路径同样只写 deltabase（结算留到 nextTurnInTrain）', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  era_flag.assi = -1;
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('base:31:0', 1450);
  fixture.store.set('base:31:1', 0); // 气力０ → 损耗 ×2 + 80
  fixture.load_module('system/train/source-check');
  const { emit } = fixture.load_module('system/event/registry');
  await emit('SOURCE_CHECK_AUTO');

  assert.equal(fixture.store.get('base:31:0'), 1450, 'base 不应当场写');
  assert.equal(
    fixture.store.get('deltabase:31:0'),
    -80,
    '损耗留在 deltabase（AUTO 也有气力０的加倍）',
  );
  fixture.era.nextTurnInTrain();
  assert.equal(fixture.store.get('base:31:0'), 1370, '1450 - 80');
  assert.equal(fixture.store.get('deltabase:31:0'), 0, '引擎清零');
});

/** 改动前的结算表 15 行（NBSP 已归一），取自同一份种子 */
const JUEL_TABLE_GOLDEN = [
  '调教结果：否定点数208个抵消。',
  '阴核点数：(    2279 +     1200)            =     3479|',
  '私处点数：(       0 +        0)            =        0|',
  '肛门点数：(       0 +        0)            =        0|',
  '乳房点数：(       0 +        0)            =        0|',
  '恭顺点数：(       0 +        0) -        0 =        0|',
  '欲情点数：(       0 +       20) -       20 =        0|',
  '屈服点数：(       0 +        1) -        1 =        0|',
  '习得点数：(       3 +        1)            =        4|',
  '耻情点数：(       0 +       20) -       20 =        0|',
  '苦痛点数：(       0 +        0) -        0 =        0|',
  '恐怖点数：(       0 +        0) -        0 =        0|',
  '否定点数：(     108 +      100) -       41 =      167|',
  '癖好点数：(       0 +        0)            =        0|',
  '以上的点数变化了。',
];

function juel_world() {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  fixture.era.beginTrain(0, 31);
  fixture.store.set('cflag:31:9', 1);
  fixture.store.set('cflag:31:16', -1);
  fixture.load_module('page/page-info-exp');
  fixture.load_module('page/page-ablup');
  return { fixture, mod: fixture.load_module('system/train/juel-check') };
}

/** 结算后的珠（juel + gotjuel） */
const settled = (fixture, key) =>
  (fixture.store.get(`juel:31:${key}`) || 0) +
  (fixture.store.get(`gotjuel:31:${key}`) || 0);

test('juel：结算表 15 行逐字一致，endTrain 得到改动前的终值', () => {
  const { fixture, mod } = juel_world();
  fixture.store.set('juel:31:0', 2279);
  fixture.store.set('juel:31:7', 3);
  fixture.store.set('juel:31:100', 108);
  fixture.store.set('palam:31:0', 9999);
  fixture.store.set('ex:31:0', 1);
  fixture.store.set('palam:31:5', 2000);
  fixture.store.set('palam:31:6', 200);
  fixture.store.set('palam:31:7', 200);
  fixture.store.set('palam:31:8', 2000);
  fixture.store.set('palam:31:11', 3000);
  const picks = [1, 2, 0];
  let i = 0;
  mod.juel_check_main(31, () => picks[i++ % picks.length]);

  assert.deepEqual(
    fixture.text_lines().slice(0, 15).map(narrow),
    JUEL_TABLE_GOLDEN,
    '结算表 15 行（含抵消列与表头）与改动前逐字一致',
  );
  // 结算之前：juel 一格没动，本次调教的净增量全在 gotjuel
  assert.equal(fixture.store.get('juel:31:0'), 2279, 'juel 不应当场写');
  assert.equal(fixture.store.get('juel:31:7'), 3, 'juel 不应当场写');
  assert.equal(fixture.store.get('juel:31:100'), 108, 'juel 不应当场写');
  assert.equal(fixture.store.get('gotjuel:31:0'), 1200, '阴核收益');
  assert.equal(fixture.store.get('gotjuel:31:7'), 1, '习得收益');
  assert.equal(
    fixture.store.get('gotjuel:31:100'),
    59,
    '否定收益 100 减掉抵消 41',
  );
  assert.equal(fixture.store.get('gotjuel:31:5'), 0, '欲情收益 20 被抵消 20');
  // 结算表里的结果列读的是结算后的值，不是 juel 原始值
  assert.equal(settled(fixture, 0), 3479);
  assert.equal(settled(fixture, 7), 4);
  assert.equal(settled(fixture, 100), 167);

  fixture.era.endTrain();
  assert.equal(fixture.store.get('juel:31:0'), 3479, '2279 + 1200');
  assert.equal(fixture.store.get('juel:31:7'), 4, '3 + 1');
  assert.equal(fixture.store.get('juel:31:100'), 167, '108 + 59');
});

test('juel：能力提升从结算后的珠里扣，窗口内显示结算后的值', async () => {
  const { fixture, mod } = juel_world();
  fixture.store.set('juel:31:0', 1);
  fixture.store.set('palam:31:0', 100); // 梯子 → +1
  mod.juel_check_main(31, () => 0);
  assert.equal(settled(fixture, 0), 2, '1 + 本次获得 1');

  // 升级前重绘：显示的是结算后的 2，不是 juel 原始值 1
  const { show_juel } = fixture.load_module('page/page-ablup');
  fixture.lines.length = 0;
  show_juel(31);
  let cells = fixture.lines
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
  assert.equal(cells[0], '阴核点数：');
  assert.equal(cells[1], '2', '获得珠已经算进来');

  const { ABLUP_HANDLERS } = fixture.load_module('system/train/juel-check');
  fixture.set_inputs(0, 100); // 选第一个选项升级，再退出循环
  await ABLUP_HANDLERS[0](31);

  assert.equal(fixture.store.get('abl:31:0'), 1, '升级生效');
  assert.equal(settled(fixture, 0), 1, '扣的是结算后的珠');
  assert.equal(fixture.store.get('juel:31:0'), 1, 'juel 本身没被扣');
  assert.equal(fixture.store.get('gotjuel:31:0'), 0, '获得 1 扣 1，净增量 0');

  // show_juel 的重绘读结算后的值（升级后余量 1）
  fixture.lines.length = 0;
  show_juel(31);
  cells = fixture.lines
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
  assert.equal(cells[0], '阴核点数：');
  assert.equal(cells[1], '1', '升级后的余量');

  fixture.era.endTrain();
  assert.equal(fixture.store.get('juel:31:0'), 1, '引擎加算后落到 juel');
});

test('juel：否定点数减半读结算后的值（gotjuel 为正也照算）', () => {
  const { fixture, mod } = juel_world();
  fixture.store.set('abl:31:11', 3);
  fixture.store.set('talent:31:32', 1);
  fixture.store.set('juel:31:100', 9);
  fixture.store.set('palam:31:11', 3000); // 梯子 → gotjuel:100 = 100
  mod.juel_check_main(31, () => 0);

  const { yokubo_up_check } = fixture.load_module('system/train/ability-check');
  yokubo_up_check(31);

  assert.equal(fixture.store.get('talent:31:32'), 0, '压抑清除');
  assert.equal(
    settled(fixture, 100),
    54,
    '9 + 本轮 100 = 109，减半截断为 54（只读裸 juel 会得 4）',
  );
  assert.equal(
    fixture.store.get('gotjuel:31:100'),
    45,
    '减半后的值落回 gotjuel（54 - 9）',
  );
  assert.equal(fixture.store.get('juel:31:100'), 9, 'juel 本身不动');
  fixture.era.endTrain();
  assert.equal(fixture.store.get('juel:31:100'), 54, '引擎加算后落到 juel');
});

test('调教窗口外：商店的能力提升仍直接写 juel（没有 gotjuel 表）', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  fixture.store.set('juel:31:0', 5);
  const { ABLUP_HANDLERS } = fixture.load_module('system/train/juel-check');
  fixture.set_inputs(0, 100);
  await ABLUP_HANDLERS[0](31);

  assert.equal(fixture.store.get('abl:31:0'), 1, '升级生效');
  assert.equal(fixture.store.get('juel:31:0'), 4, '扣减直接落 juel');
  assert.equal(fixture.store.get('gotjuel:31:0'), undefined, '没有 gotjuel 表');
});

test('夹具照引擎：nextTurnInTrain 结算 deltabase→base（maxbase 钳制、逐键清零）', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(31);
  fixture.store.set('base:31:0', 500);
  fixture.store.set('base:31:1', 5);
  fixture.store.set('base:31:2', 3);
  fixture.store.set('maxbase:31:0', 1000);
  fixture.store.set('maxbase:31:2', 100); // 1 号未声明上限
  fixture.store.set('deltabase:31:0', 700);
  fixture.store.set('deltabase:31:1', -10);
  fixture.store.set('deltabase:31:2', -50);

  fixture.era.nextTurnInTrain();

  // 与 test/fixture.test.js 的引擎比对用例同一组期望
  assert.equal(fixture.store.get('base:31:0'), 1000, '上界钳制');
  assert.equal(fixture.store.get('base:31:1'), -5, 'maxbase 未声明不钳制');
  assert.equal(fixture.store.get('base:31:2'), 0, '下界钳到 0');
  assert.equal(fixture.store.get('deltabase:31:0'), 0, '逐键置 0');
  assert.equal(fixture.store.get('deltabase:31:1'), 0, '逐键置 0');
  assert.equal(fixture.store.get('deltabase:31:2'), 0, '逐键置 0');
});

test('夹具照引擎：endTrain 把 gotjuel 逐键加进 juel（负值照加）', () => {
  const plus = create_era_fixture();
  join_slave_chara(plus, 31, '温妮');
  plus.era.beginTrain(31);
  plus.store.set('juel:31:0', 10);
  plus.store.set('juel:31:100', 20);
  plus.store.set('gotjuel:31:0', 5);
  plus.store.set('gotjuel:31:100', 7);
  plus.era.endTrain();
  assert.equal(plus.store.get('juel:31:0'), 15);
  assert.equal(plus.store.get('juel:31:100'), 27);

  const minus = create_era_fixture();
  join_slave_chara(minus, 31, '温妮');
  minus.era.beginTrain(31);
  minus.store.set('juel:31:0', 10);
  minus.store.set('juel:31:100', 20);
  minus.store.set('gotjuel:31:0', -5);
  minus.store.set('gotjuel:31:100', -7);
  minus.era.endTrain();
  assert.equal(minus.store.get('juel:31:0'), 5, '负的增量照样加');
  assert.equal(minus.store.get('juel:31:100'), 13, '负的增量照样加');
});

test('train-settle：base_settled 的钳制与无增量时原样返回', () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(31); // deltabase/gotjuel 只在调教窗口内可寻址
  const { base_settled, juel_settled } = fixture.load_module(
    'era-utils/train-settle',
  );

  fixture.store.set('base:31:0', 1999);
  fixture.store.set('maxbase:31:0', 2000);
  fixture.store.set('deltabase:31:0', 10);
  assert.equal(base_settled(31, 0), 2000, '上界钳制');

  fixture.store.set('base:31:1', 3);
  fixture.store.set('maxbase:31:1', 2000);
  fixture.store.set('deltabase:31:1', -50);
  assert.equal(base_settled(31, 1), 0, '下界钳到 0');

  fixture.store.set('base:31:2', 5);
  fixture.store.set('deltabase:31:2', -10);
  assert.equal(base_settled(31, 2), -5, 'maxbase 未声明不钳制');

  fixture.store.set('base:31:3', 500);
  assert.equal(base_settled(31, 3), 500, '没有增量时原样返回');

  fixture.store.set('juel:31:0', 10);
  assert.equal(juel_settled(31, 0), 10, '没有 gotjuel 表时读 juel 本身');
  fixture.store.set('gotjuel:31:0', -3);
  assert.equal(juel_settled(31, 0), 7, 'juel + gotjuel');
});
