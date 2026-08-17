/**
 * ere/event/event-comend.js 的行为测试（issue #44：@EVENTCOMEND 死亡/衰弱
 * 判定 1:1）。
 *
 * 缝 = test/helpers/era-fixture.js。四条分支各有用例；**FLAG:35（濒死自动
 * 结束调教）开关两侧行为不同**是验收项——同一体力值下开关决定是否自动
 * 结束调教（BEGIN AFTERTRAIN）。
 *
 * 事件链语义：分支内的 BEGIN AFTERTRAIN 由 emit 暂存为链返回值（#6：链
 * 继续、最后一个胜出），不抛出到调用方。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara } = require('./helpers/chara');

// 世界底座：目标 31（体力由用例另置）、助手可选。tflag/tequip 寻址有夹具
// 守卫，先 beginTrain 开表
function seed_world(fixture, { assi = -1 } = {}) {
  join_slave_chara(fixture, 31, '温妮');
  if (assi >= 0) {
    join_slave_chara(fixture, assi, '助手桑');
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = assi;
  fixture.era.beginTrain(0, 31, ...(assi >= 0 ? [assi] : []));
  fixture.load_module('event/event-comend');
  return era_flag;
}

async function run_comend(fixture) {
  const { emit } = fixture.load_module('system/event/registry');
  return emit('EVENTCOMEND');
}

test('分支 1：目标体力 <= 0 且 FLAG:35 关 → 死亡消息 + 转场 AFTERTRAIN', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 0);
  // 死亡时录像标志转存：TEQUIP:53（目标）→ TFLAG:34 = 1
  fixture.store.set('tequip:31:53', 1);

  const pending = await run_comend(fixture);

  assert.equal(pending, 'AFTERTRAIN');
  const texts = fixture.text_lines();
  assert(texts.includes('温妮一动也不动，'));
  // SHE：无 TALENT:122（男人）素质 → 她
  assert(texts.includes('对她做什么都不再有反应了……'));
  assert(
    fixture.var_writes.some((w) => w.name === 'tflag:34' && w.value === 1),
  );
  assert.deepEqual(fixture.inputs_consumed, [{ api: 'waitAnyKey' }]); // WAIT
});

test('分支 2：目标体力 < 500 且 FLAG:35 开 → 衰弱自动结束（同体力关侧不结束）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 300); // 0 < 300 < 500
  fixture.store.set('flag:35', 1); // 濒死自动结束调教：开

  const pending = await run_comend(fixture);

  assert.equal(pending, 'AFTERTRAIN');
  assert(fixture.text_lines().includes('（体力到了极限。调教结束。）'));

  // 【验收项：FLAG:35 两侧行为不同】同一体力 300、开关关 → 两个分支都不
  // 成立，不转场、无消息
  const off = create_era_fixture();
  seed_world(off);
  off.store.set('base:31:0', 300);
  off.store.set('flag:35', 0);
  assert.equal(await run_comend(off), undefined);
  assert(
    !off.text_lines().some((line) => line.includes('调教结束')),
    'FLAG:35 关时体力 300 不得自动结束',
  );
});

test('FLAG:35 开关的另一侧：体力 0 在开关开时走衰弱分支（不进死亡分支）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 0);
  fixture.store.set('flag:35', 1);

  const pending = await run_comend(fixture);

  // ELSEIF 链：死亡分支要求 !FLAG:35，开关开时 0 体力落到衰弱分支——
  // 结局同为 AFTERTRAIN，但消息是衰弱文案
  assert.equal(pending, 'AFTERTRAIN');
  assert(fixture.text_lines().includes('（体力到了极限。调教结束。）'));
  assert(
    !fixture.text_lines().some((line) => line.includes('一动也不动')),
    'FLAG:35 开时不走死亡文案',
  );
});

test('分支 3：助手体力 <= 0 → 助手死亡消息（代词与 TEQUIP 都照原作读目标）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture, { assi: 32 });
  fixture.store.set('base:31:0', 2000); // 目标健在
  fixture.store.set('base:32:0', 0);
  // 原作 :296-297 的 SIF TEQUIP:53 无角色前缀 = TEQUIP:TARGET:53（1:1：
  // 助手死时查的是**目标**的录像装备——可疑但照搬，勿「修好」）
  fixture.store.set('tequip:31:53', 1); // 只预置目标的录像标志

  const pending = await run_comend(fixture);

  assert.equal(pending, 'AFTERTRAIN');
  const texts = fixture.text_lines();
  assert(texts.includes('助手桑一动也不动，'));
  // 原作 :299 用 SHE(TARGET)（笔误）：助手分支的代词取目标侧
  assert(texts.includes('对她做什么都不再有反应了……'));
  assert(
    fixture.var_writes.some((w) => w.name === 'tflag:34' && w.value === 1),
  );

  // 对照：只预置**助手**的录像标志 → 不触发（证明读的确实是目标侧）
  const control = create_era_fixture();
  seed_world(control, { assi: 32 });
  control.store.set('base:31:0', 2000);
  control.store.set('base:32:0', 0);
  control.store.set('tequip:32:53', 1);
  await run_comend(control);
  assert(
    !control.var_writes.some((w) => w.name === 'tflag:34'),
    '助手侧的 53 号不得触发录像标志（原作读的是 TARGET）',
  );
});

test('分支 4：助手体力 < 500 → 衰弱结束，无 FLAG:35 条件（开关关也结束）', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture, { assi: 32 });
  fixture.store.set('base:31:0', 2000);
  fixture.store.set('base:32:0', 300);
  // 助手衰弱分支（:303）没有 FLAG:35 守卫——开关关同样触发
  fixture.store.set('flag:35', 0);

  const pending = await run_comend(fixture);

  assert.equal(pending, 'AFTERTRAIN');
  assert(fixture.text_lines().includes('（助手体力到了极限。调教结束。）'));
});

test('健在路径：体力充足、无助手 → 无消息无转场，DRAWLINE 也不画', async () => {
  const fixture = create_era_fixture();
  seed_world(fixture);
  fixture.store.set('base:31:0', 2000);

  const pending = await run_comend(fixture);

  assert.equal(pending, undefined);
  assert.deepEqual(fixture.lines, []);
  assert.deepEqual(fixture.inputs_consumed, []);
});
