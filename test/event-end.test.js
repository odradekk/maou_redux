/**
 * ere/event/event-end.js 的行为测试（issue #44：@EVENTEND 真身）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：角色复位（T:10-12 暂存的读回）、
 * 前回指针记录（FLAG:1/2）、失神旗标（TFLAG:860 → FLAG:7）、死亡删除分支
 *（BEGIN TURNEND 当场结束其后结算）、时常发情蓄积、气力回复、尾部指针还原
 * 与出口转场。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

// 世界底座：@EVENTTRAIN 已跑过的调教后状态——目标 31、记录值与暂存值就位、
// 体力/气力由用例另置。tflag/palam/ex 寻址有夹具守卫，先 beginTrain 开表。
// #47 起 @EVENTEND 内联 @JUEL_CHECK（读键 + 一枚输入退出交互循环）。
function seed_world(fixture, { assi = -1 } = {}) {
  join_slave_chara(fixture, 31, '温妮');
  if (assi >= 0) {
    join_slave_chara(fixture, assi, '助手桑');
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = assi;
  // @EVENTTRAIN 的记录（TARGET:1/ASSI:1）与 @PRITRAIN_MESSAGE 的暂存
  //（T:10-12）——正常流程它们由那两个函数写入
  era_flag.target_record = 31;
  era_flag.assi_record = assi;
  era_flag.master_backup = 0;
  era_flag.target_backup = 31;
  era_flag.assi_backup = assi;
  fixture.era.beginTrain(0, 31, ...(assi >= 0 ? [assi] : []));
  fixture.load_module('event/event-end');
  return era_flag;
}

async function run_eventend(fixture) {
  const { emit } = fixture.load_module('system/event/registry');
  return emit('EVENTEND');
}

test('主体：复位/记录/珠结算/尾部还原，出口转场 TURNEND', async () => {
  const fixture = create_era_fixture();
  const era_flag = seed_world(fixture, { assi: 32 });
  fixture.store.set('base:31:0', 2000); // 存活
  fixture.store.set('flag:37', 1); // 着衣系统开（@EVENTFIRST :47 的开局值）
  fixture.store.set('maxbase:0:1', 10000); // 气力上限（回复用）
  // 中途被对换调教搞乱的指针：复位段读暂存还原
  era_flag.target = 999;
  // @JUEL_CHECK 交互循环的退出键（#47：内联于 :421 的普通 CALL）
  fixture.set_inputs(999);

  const pending = await run_eventend(fixture);

  // 出口：:429 BEGIN TURNEND
  assert.equal(pending, 'TURNEND');
  // :316 消息 + :317 WAIT
  assert(fixture.text_lines().includes('调教结束了。'));
  assert(fixture.inputs_consumed.some((c) => c.api === 'waitAnyKey'));
  // :319-323 复位（TARGET = T:11；SIF ASSI（32 非零）→ ASSI = T:12）
  assert.equal(era_flag.target, 31);
  assert.equal(era_flag.assi, 32);
  // :334-336 前回指针记录（FLAG:1/FLAG:2）
  assert(fixture.var_writes.some((w) => w.name === 'flag:1' && w.value === 31));
  assert(fixture.var_writes.some((w) => w.name === 'flag:2' && w.value === 32));
  // 存根各打一行占位（可检索）
  for (const name of [
    'CHARADEAD_CHECK',
    'SELF_CHECK',
    'SELL_MILK',
    'SELL_VIDEO',
    'SELL_FIGHTMONEY',
  ]) {
    assert(
      fixture.text_lines().some((line) => line.includes(`@${name}`)),
      `存根 ${name} 必须打印含函数名的占位行`,
    );
  }
  // AFTERTRAIN_CLOTH / RE_CLOTHED 自 #215（J5）起为真身：着衣分支可达
  // （FLAG:37 = 1 且存活）但本世界 TFLAG:45 = 0、无衣物状态变化 → 静默
  // （真身的行为锁在 test/cloth-func.test.js）
  // :421 @JUEL_CHECK 已是真身（#47）：结算表落地、不再是占位行
  assert(fixture.text_lines().includes('以上的点数变化了。'));
  assert(!fixture.text_lines().some((line) => line.includes('@JUEL_CHECK')));
  // 尾部还原（:423-425）：ASSI = ASSI:1、TARGET = TARGET:1——复位段（:321）
  // 与尾部各还原一次，末值都是记录值 31/32
  const target_writes = fixture.var_writes.filter(
    (w) => w.name === 'flag:10005',
  );
  assert.ok(target_writes.length >= 3, '目标指针至少经历复位与尾部两次还原');
  assert.equal(target_writes[target_writes.length - 1].value, 31);
  assert.equal(era_flag.target, 31);
  assert.equal(era_flag.assi, 32);
});

test('失神旗标：TFLAG:860 = 1 → FLAG:7 = 1 并清零', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 2000);
  fixture.store.set('tflag:860', 1);
  fixture.set_inputs(999); // @JUEL_CHECK 交互循环退出键

  await run_eventend(fixture);

  assert(fixture.var_writes.some((w) => w.name === 'flag:7' && w.value === 1));
  assert(
    fixture.var_writes.some((w) => w.name === 'tflag:860' && w.value === 0),
  );
});

test('死亡删除分支：珠不结算、指针清空、除名，BEGIN TURNEND 当场截断其后结算', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 0); // 死亡（体力 < 1 且非魔王）
  fixture.store.set('palam:31:3', 25000); // 若走到时常发情段会写 cflag:81

  const pending = await run_eventend(fixture);

  assert.equal(pending, 'TURNEND');
  // :365-371 死亡标记 + 指针清空
  assert(
    fixture.var_writes.some((w) => w.name === 'flag:230' && w.value === 1),
    'FLAG:NO+199（31+199=230）死亡标记必须置位',
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.target, -1);
  assert.equal(era_flag.assi, -1);
  assert(fixture.var_writes.some((w) => w.name === 'flag:1' && w.value === -1));
  // :373 DELCHARA → 引擎等价物 removeCharacter：从已加入列表除名
  assert(
    fixture.calls.some((c) => c.api === 'removeCharacter' && c.args[0] === 31),
    'DELCHARA 必须除名角色 31',
  );
  assert(!fixture.era.getAddedCharacters().includes(31));
  // BEGIN 截断：其后的善恶值/时常发情/气力回复/珠结算/指针还原整段
  // 不执行（#6 语义：BEGIN 结束当前函数）
  assert(
    !fixture.var_writes.some((w) => w.name === 'cflag:31:81'),
    '死亡分支后的时常发情蓄积不得执行',
  );
  assert(
    !fixture.text_lines().some((line) => line.includes('以上的点数变化了。')),
    '死亡分支后的珠结算不得执行',
  );
});

test('时常发情蓄积：润滑/欲情各按万分比进 CFLAG:81/82，不足清零', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 2000);
  fixture.store.set('palam:31:3', 25000); // 润滑 → +2
  fixture.store.set('palam:31:5', 5000); // 欲情不足 10000 → 清 0
  fixture.store.set('cflag:31:81', 3); // 已有蓄积 → 3 + 2 = 5
  fixture.set_inputs(999);

  await run_eventend(fixture);

  assert(
    fixture.var_writes.some((w) => w.name === 'cflag:31:81' && w.value === 5),
    '润滑 25000 → 蓄积 +2（3+2=5）',
  );
  assert(
    fixture.var_writes.some((w) => w.name === 'cflag:31:82' && w.value === 0),
  );
});

test('气力回复：FLAG:400 开、目标爱慕 → 魔王气力 +700 并钳上限', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 2000);
  fixture.store.set('flag:400', 1);
  fixture.store.set('talent:31:85', 1); // 爱慕
  fixture.store.set('base:0:1', 300); // 魔王现有气力
  fixture.store.set('maxbase:0:1', 10000);
  fixture.set_inputs(999);

  await run_eventend(fixture);

  assert(fixture.text_lines().includes('*因奴隶的爱而恢复了气力*'));
  assert(
    fixture.var_writes.some((w) => w.name === 'base:0:1' && w.value === 1000),
  );
});

test('气力回复钳上限：超上限回落 MAXBASE', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 2000);
  fixture.store.set('flag:400', 1);
  fixture.store.set('talent:31:85', 0); // 无爱慕 → +500
  fixture.store.set('base:0:1', 9800);
  fixture.store.set('maxbase:0:1', 10000); // 9800 + 500 > 10000 → 钳回
  fixture.set_inputs(999);

  await run_eventend(fixture);

  assert(
    fixture.var_writes.some((w) => w.name === 'base:0:1' && w.value === 10000),
    '9800+500 须钳到上限 10000',
  );
});

test('存根清单可检索：docs/stub-registry.md 收录这张票全部占位名', async () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = fixture.load_module('event/event-end');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );

  assert.deepEqual(STUBBED_CALLS, [
    'CHARADEAD_CHECK',
    'SELF_CHECK',
    'SELL_MILK',
    'SELL_VIDEO',
    'SELL_FIGHTMONEY',
    'PARTY_CHAR_DEL',
    'NAME_RESET',
    'MAOU_TENSHIN',
    'KARMA',
  ]);
  for (const name of STUBBED_CALLS) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
