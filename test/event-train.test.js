/**
 * ere/event/event-train.js 的行为测试（issue #44：@EVENTTRAIN 真身）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 *
 * 覆盖：
 *   1. 直线赋值全量断言（验收项：意外写入当场暴露，写法照
 *      test/event-first.test.js）；
 *   2. 条件分支：时常发情（TALENT:271）、助手参与（ASSIPLAY）两处；
 *   3. 存根清单：docs/stub-registry.md 可检索且与本文件的存根核对；
 *   4. 调教域 flag 槽位（包装层）钉在 yml/Flag.yml 的 id 上。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

// 世界底座：魔王 + 奴隶 31，目标 31、无助手（ASSI = -1）、主人亲自调教
//（ASSIPLAY = 0）。tflag/palam 寻址有夹具守卫，先 beginTrain 开表。
function seed_world(fixture) {
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  fixture.era.beginTrain(0, 31);
  return era_flag;
}

// @TRAIN_NAME_INIT 的播种写入（TRAIN_MAIN.ERB:788-908；TRAIN_NAME_TABLE
// 的键升序，150 号槽在循环后单独内插写入——实现见 train-name.js）
function expected_train_name_writes(train_name_table) {
  return [
    ...Object.entries(train_name_table).map(([id, name]) => ({
      name: `trainalias:${id}`,
      value: name,
    })),
    // :899 TRAIN_NAME:150 = %CSTR:7%調教（TARGET=31 的 CSTR:7 未播种 → 空串）
    { name: 'trainalias:150', value: '调教' },
  ];
}

// @EVENTTRAIN 直线赋值的完整期望（TRAIN_MAIN.ERB:15-55 按语句顺序；含
// @TRAIN_NAME_INIT 播种与 @PRITRAIN_MESSAGE 承载头部的三笔，
// EVENT_BEFORETRAIN.ERB:7-14）。train_name_table 由用例侧经夹具装载传入
//（播种表以实现为准——表内容错漏由 train-name.test.js 的逐条断言守）。
function expected_train_writes(train_name_table) {
  return [
    { name: 'base:0:2', value: 0 }, // :15-16 主人的射精清零
    { name: 'base:31:2', value: 0 }, // :17-18 目标的射精清零
    // :19-20 SIF ASSI >= 0 → BASE:ASSI:2 = 0（ASSI = -1，不写）
    { name: 'base:31:3', value: 0 }, // :21 目标母乳槽清零
    { name: 'base:0:4', value: 0 }, // :22 主人触手射精槽清零
    ...Array.from({ length: 200 }, (_, k) => ({
      name: `tflag:${k}`,
      value: 0,
    })), // :25-27 REPEAT 200：TFLAG:0..199 清零
    { name: 'flag:10008', value: 0 }, // :32-37 PLAYER = MASTER（ASSIPLAY 0）
    { name: 'flag:10013', value: -1 }, // :40 ASSI:1 = ASSI（记录助手）
    { name: 'flag:10012', value: 31 }, // :41 TARGET:1 = TARGET（记录目标）
    // :44-46 SIF TALENT:TARGET:271 → PALAM 3/5 = 3000（无素质，不写）
    { name: 'tflag:402', value: 0 }, // :49-50 死斗场收入初始化
    // :53 CALL TRAIN_NAME_INIT（#212 真身：TRAIN_NAME 播种，守卫空过）
    ...expected_train_name_writes(train_name_table),
    // :55 PRITRAIN_MESSAGE（真身写入）：
    { name: 'cflag:31:10', value: 1 }, // :7-8 CFLAG:TARGET:10 += 1（调教回数）
    { name: 'flag:10014', value: 0 }, // :11 T:10 = MASTER
    { name: 'flag:10015', value: 31 }, // :12 T:11 = TARGET
    { name: 'flag:10016', value: -1 }, // :13-14 SIF ASSI → T:12 = ASSI
    { name: 'cflag:31:40', value: 0 }, // :28-29 着衣OFF (FLAG:37==0) 全裸
  ];
}

test('@EVENTTRAIN 直线赋值：与原作逐项一致（全量断言，意外写入当场暴露）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  const { STUBBED_CALLS } = fixture.load_module('event/event-train');
  const { TRAIN_NAME_TABLE } = fixture.load_module('system/train/train-name');
  const { emit } = fixture.load_module('system/event/registry');

  const pending = await emit('EVENTTRAIN');

  // 无 BEGIN：@EVENTTRAIN 的定义不发转场（转场由回合循环的输入驱动）
  assert.equal(pending, undefined);
  // 世界底座的指针写入（seed_world 侧）不计：从 @EVENTTRAIN 第一笔写起看
  const start = fixture.var_writes.findIndex((w) => w.name === 'base:0:2');
  assert.ok(start >= 0, '@EVENTTRAIN 必须先清主人的射精槽');
  assert.deepEqual(
    fixture.var_writes.slice(start),
    expected_train_writes(TRAIN_NAME_TABLE),
  );
  assert.deepEqual(STUBBED_CALLS, []);
});

test('时常发情（TALENT:TARGET:271）：润滑与欲情从 3000 起步', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('talent:31:271', 1);
  fixture.load_module('event/event-train');
  const { emit } = fixture.load_module('system/event/registry');

  await emit('EVENTTRAIN');

  const writes = fixture.var_writes;
  const i = writes.findIndex((w) => w.name === 'flag:10012'); // 记录目标之后
  assert.ok(i >= 0);
  assert.deepEqual(writes.slice(i + 1, i + 3), [
    { name: 'palam:31:3', value: 3000 }, // 润滑
    { name: 'palam:31:5', value: 3000 }, // 欲情
  ]);
});

test('助手参与（ASSIPLAY = 1）：PLAYER = ASSI，助手射精槽一并清零', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  join_slave_chara(fixture, 32, '助手桑');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = 32;
  era_flag.assiplay = 1; // 助手调教中
  fixture.era.beginTrain(0, 31, 32);
  fixture.load_module('event/event-train');
  const { emit } = fixture.load_module('system/event/registry');

  await emit('EVENTTRAIN');

  const writes = fixture.var_writes;
  // 世界底座的指针写入（seed_world 侧）不计：从 @EVENTTRAIN 第一笔写起看
  const start = writes.findIndex((w) => w.name === 'base:0:2');
  // :19-20 SIF ASSI >= 0 → BASE:ASSI:2 = 0（插在目标射精之后、母乳槽之前）
  assert.deepEqual(writes.slice(start, start + 4), [
    { name: 'base:0:2', value: 0 },
    { name: 'base:31:2', value: 0 },
    { name: 'base:32:2', value: 0 },
    { name: 'base:31:3', value: 0 },
  ]);
  // :35-36 ELSE → PLAYER = ASSI；:13-14 SIF ASSI → T:12 = ASSI
  assert(
    writes.some((w) => w.name === 'flag:10008' && w.value === 32),
    'PLAYER 必须是助手 32',
  );
  assert(
    writes.some((w) => w.name === 'flag:10016' && w.value === 32),
    'T:12 必须暂存助手',
  );
});

test('调教域 flag 槽位：包装层寻址钉在 yml/Flag.yml 的保留区 id 上', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');

  // id 即存档格式的一部分（#5 决议的保留区），改动必须惊动本测试
  era_flag.assiplay = 1;
  era_flag.player = 32;
  era_flag.prevcom = -1;
  era_flag.nextcom = -1;
  era_flag.selectcom = 5;
  era_flag.target_record = 31;
  era_flag.assi_record = 32;
  era_flag.master_backup = 0;
  era_flag.target_backup = 31;
  era_flag.assi_backup = 32;
  assert.deepEqual(fixture.var_writes, [
    { name: 'flag:10007', value: 1 },
    { name: 'flag:10008', value: 32 },
    { name: 'flag:10009', value: -1 },
    { name: 'flag:10010', value: -1 },
    { name: 'flag:10011', value: 5 },
    { name: 'flag:10012', value: 31 },
    { name: 'flag:10013', value: 32 },
    { name: 'flag:10014', value: 0 },
    { name: 'flag:10015', value: 31 },
    { name: 'flag:10016', value: 32 },
  ]);
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-train');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );

  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— #401：@EVENTTRAIN 的无属性档（EVETRAIN.ERB） ——

/**
 * 同时装载两份 @EVENTTRAIN 定义（#PRI 的 event-train 与无属性的
 * event-train-normal），模拟 main-loop.js 的装载序。
 */
function seed_world_both_tiers(fixture) {
  const era_flag = seed_world(fixture); // 魔王 + 奴隶 31 + beginTrain
  fixture.load_module('event/event-train-normal');
  fixture.load_module('event/event-train');
  return era_flag;
}

test('#401 无属性档：与 #PRI 档在同一 emit 上都执行（多定义不是重命名冲突）', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world_both_tiers(fixture);
  // 先清一遍 TFLAG 的两个边界下标，再看谁把它们写回去
  fixture.store.set('tflag:199', 7);
  fixture.store.set('tflag:200', 7);
  const { emit } = fixture.load_module('system/event/registry');

  await emit('EVENTTRAIN');

  const writes_named = (name) =>
    fixture.var_writes.filter((w) => w.name === name);
  assert.equal(
    writes_named('tflag:200').length,
    1,
    'TFLAG:200 只被无属性档清（#PRI 档的 REPEAT 200 只到 199）——它的写入是' +
      '「无属性档真的跑了」的判据',
  );
  assert.equal(
    writes_named('tflag:199').length,
    2,
    'TFLAG:199 两份定义都清（#PRI 的 REPEAT 200 与无属性档的 VARSET 都覆盖它）',
  );
  assert.equal(
    writes_named('base:31:2').length,
    2,
    '射精槽清零两份定义各写一次（同一 emit 内两份都执行）',
  );
  assert.equal(
    writes_named('flag:10008').length,
    2,
    'PLAYER 的选择两份定义各写一次',
  );
  assert.equal(era_flag.target, 31);
});

test('#401 无属性档：VARSET TFLAG, 0, 0, 201 的 201 个下标一个不少、全清 0', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture); // 只装无属性档（下一行才 require）
  fixture.load_module('event/event-train-normal');
  const { emit } = fixture.load_module('system/event/registry');
  fixture.override_math_random(() => 0);
  try {
    await emit('EVENTTRAIN');
  } finally {
    fixture.restore_math_random();
  }

  const tflag_writes = fixture.var_writes.filter((w) =>
    w.name.startsWith('tflag:'),
  );
  const indices = tflag_writes.map((w) =>
    Number(w.name.slice('tflag:'.length)),
  );
  assert.deepEqual(
    [...indices].sort((a, b) => a - b),
    Array.from({ length: 201 }, (_, i) => i),
    'VARSET 的结束索引 201 是不含的：写满 0..200 共 201 个下标，不多不少',
  );
  assert.ok(
    tflag_writes.every((w) => w.value === 0),
    '全部清 0',
  );
  // 分域落法（文件头）：跨域 47 条走门面、同域 154 条走显式下标表——两组
  // 写的是同一张表的不同下标，合起来正好是 0..200 的划分
  assert.equal(new Set(indices).size, 201, '没有下标被写两次（两组不重叠）');
  assert.equal(era_flag.target, 31, '目标指针由调用方预置，本函数不碰');
});

test('#401 无属性档：调教者选择的两个分支（ASSIPLAY 是调教域槽位）', async () => {
  // ASSIPLAY == 0 → PLAYER = MASTER（角色 0）
  const solo = create_era_fixture();
  const solo_flag = seed_world(solo); // assi = -1
  solo.load_module('event/event-train-normal');
  const { emit: emit_solo } = solo.load_module('system/event/registry');
  await emit_solo('EVENTTRAIN');
  assert.equal(solo_flag.player, 0, 'ASSIPLAY == 0 → PLAYER = MASTER = 0');

  // ASSIPLAY != 0 → PLAYER = ASSI（seed_world 只入列 31，助手局面手工搭）
  const duo = create_era_fixture();
  join_slave_chara(duo, 31, '温妮');
  join_slave_chara(duo, 32, '助手桑');
  const duo_flag = duo.load_module('era-utils/era-flag');
  duo_flag.target = 31;
  duo_flag.assi = 32;
  duo.era.beginTrain(0, 31, 32);
  duo_flag.assiplay = 1;
  duo.load_module('event/event-train-normal');
  const { emit: emit_duo } = duo.load_module('system/event/registry');
  await emit_duo('EVENTTRAIN');
  assert.equal(duo_flag.player, 32, 'ASSIPLAY != 0 → PLAYER = ASSI');
});

test('#401 无属性档：存根名单为空（EVETRAIN.ERB 整份落真身）', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-train-normal');
  assert.deepEqual(STUBBED_CALLS, []);
});
