'use strict';
/**
 * ere/system/train/seiin.js 的行为测试（issue #216 J6）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @SEIIN_START 的三道守卫（FLAG:72 系统开关 / TFLAG:0 未口内射精 /
 *     TFLAG:899 失神中）与两臂分发（喜欢精液直行 / 绝顶中查计数器）；
 *   - @SEIIN_ORGASM 的计数（EX:13 / EXP:8）、两版文案（TFLAG:0 == 2）、
 *     源加成的四档乘算；
 *   - @SEIIN_CHECK 的阈值表（素质加减，抽测边界组合）；
 *   - @SEIIN_COMPULSION_ORGASM 的三段文案（达阈值 / 初回 / 以降）、
 *     TFLAG:110 获得旗（game.event 门面）、精液中毒 LV3 直抬、
 *     SOURCE:13 的乘算与 SOURCE:5 的达阈加成。
 *
 * 契约（调用方 = @SOURCE_CHECK 的 @EX_CHECK_UP，ere/event/source-check.js）：
 *   seiin_start() → Promise<void>（ECST_CHECK 之后、多重绝顶倍率之前）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.player = 0;
  fixture.store.set('callname:31:-1', '温妮');
  const seiin = fixture.load_module('system/train/seiin');
  return { fixture, era_flag, seiin };
}

test('系统开关：FLAG:72 = 1 整体跳过（全库零写点，守卫 1:1）', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('flag:72', 1);
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  fixture.store.set('talent:31:47', 1);
  await seiin.seiin_start();
  assert.equal(fixture.store.get('exp:31:8'), undefined);
});

test('守卫：TFLAG:0 = 0（未口内射精）静默', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 0);
  fixture.store.set('tflag:29', 1);
  await seiin.seiin_start();
  assert.deepEqual(fixture.text_lines(), []);
});

test('守卫：失神中（TFLAG:899 ≥ 1）抑制精饮绝顶', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  fixture.store.set('talent:31:47', 1);
  fixture.store.set('tflag:899', 1);
  await seiin.seiin_start();
  assert.deepEqual(fixture.text_lines(), []);
});

test('喜欢精液（TALENT:47）直行 ORGASM：EX:13 / EXP:8 / 基础源与文案', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('talent:31:47', 1);
  fixture.store.set('exp:31:8', 10); // 避开初次 ×3 档
  await seiin.seiin_start();
  assert.equal(fixture.store.get('ex:31:13'), 1);
  assert.equal(fixture.store.get('exp:31:8'), 11, '播种 10 + 1');
  assert.equal(fixture.store.get('source:31:10'), 2000);
  assert.equal(fixture.store.get('source:31:11'), 5000);
  assert.equal(fixture.store.get('source:31:13'), 10000, '无分档命中 → 基础值');
  const lines = fixture.text_lines();
  assert.ok(lines.includes('温妮精饮绝顶'));
  assert.ok(lines.includes('精饮绝顶经验＋1'));
  assert.ok(
    lines.some((t) => t.includes('只能发出含糊不清的声音')),
    'TFLAG:0 = 1 → 通常版文案',
  );
});

test('ORGASM：TFLAG:0 == 2（连续两发）→ 大量版文案', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 2);
  fixture.store.set('talent:31:47', 1);
  await seiin.seiin_start();
  assert.ok(
    fixture.text_lines().some((t) => t.includes('大量的精液把喉咙灌开了')),
  );
});

test('ORGASM：初次精饮绝顶（EXP:8 加 1 后 == 1）→ SOURCE:13 ×3', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('talent:31:47', 1);
  await seiin.seiin_start(); // EXP:8: 0 → 1，加成判的是加过后的值（:84 在前）
  assert.equal(fixture.store.get('source:31:13'), 30000);
});

test('ORGASM：精液中毒分档（ABL:32 = 3 → S13 ×2；= 4 → 三源 ×1.5；= 5 → S10/S11 ×2）', async () => {
  for (const [lv, s10, s11, s13] of [
    [3, 2000, 5000, 20000],
    [4, 3000, 7500, 15000],
    [5, 4000, 10000, 10000],
  ]) {
    const { fixture, seiin } = seed_world();
    fixture.store.set('tflag:0', 1);
    fixture.store.set('talent:31:47', 1);
    fixture.store.set('exp:31:8', 10); // 避开初次 ×3 档
    fixture.store.set(`abl:31:32`, lv);
    await seiin.seiin_start();
    assert.equal(fixture.store.get('source:31:10'), s10, `abl:32 = ${lv}`);
    assert.equal(fixture.store.get('source:31:11'), s11);
    assert.equal(fixture.store.get('source:31:13'), s13);
  }
});

test('CHECK 臂：非喜欢精液且绝顶中（TFLAG:29 > 0）→ 强制精饮绝顶初回', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  await seiin.seiin_start();
  assert.equal(fixture.store.get('cflag:31:600'), 1);
  assert.equal(fixture.store.get('exp:31:50'), 1, '初回附带异常经验 +1');
  assert.equal(fixture.store.get('source:31:13'), 1500, '初回 ×1.5');
  const lines = fixture.text_lines();
  assert.ok(lines.includes('强制精饮绝顶'));
  assert.ok(lines.includes('异常经验＋１'));
  assert.ok(lines.some((t) => t.includes('尽力喝下去了')));
});

test('CHECK 臂：非绝顶中（TFLAG:29 = 0）静默', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  await seiin.seiin_start();
  assert.equal(fixture.store.get('cflag:31:600'), undefined);
});

test('CHECK：阈值表——基础 P = 50（count = 50 达阈、49 不达）', async () => {
  for (const [seed, want] of [
    [48, undefined], // count = 49 < 50
    [10, undefined],
  ]) {
    const { fixture, seiin } = seed_world();
    fixture.store.set('tflag:0', 1);
    fixture.store.set('tflag:29', 1);
    fixture.store.set('cflag:31:600', seed);
    await seiin.seiin_start();
    assert.equal(fixture.store.get('tflag:110'), want);
  }
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  fixture.store.set('cflag:31:600', 49); // +1 = 50 = P → 达阈
  await seiin.seiin_start();
  assert.equal(fixture.store.get('tflag:110'), 1);
});

test('CHECK：戒备森严（27）+5 抬阈——P = 55 时 count 50 不达阈', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  fixture.store.set('talent:31:27', 1);
  fixture.store.set('cflag:31:600', 49); // count = 50 < 55
  await seiin.seiin_start();
  assert.equal(fixture.store.get('tflag:110'), undefined);
});

test('达阈值：获得旗 TFLAG:110 = 1、精液中毒直抬 LV3、SOURCE:5 = 1000', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  fixture.store.set('talent:31:76', 1); // 淫乱 → P = 30
  fixture.store.set('cflag:31:600', 29); // 本次 +1 = 30 达阈
  fixture.store.set('abl:31:32', 1);
  await seiin.seiin_start();
  assert.equal(
    fixture.store.get('tflag:110'),
    1,
    'TFLAG:110 经 game.event 门面',
  );
  assert.equal(fixture.store.get('abl:31:32'), 3, '精液中毒直抬 LV3');
  assert.equal(fixture.store.get('source:31:5'), 1000, '达阈回合的 SOURCE:5');
  assert.equal(fixture.store.get('source:31:13'), 1000, 'count == P → 无 ×1.5');
  assert.ok(
    fixture.text_lines().some((t) => t.includes('彻底地把精液的味道记住了')),
  );
  assert.ok(fixture.text_lines().some((t) => t.includes('精液中毒达到LV3')));
});

test('达阈值：精液中毒已 ≥ 3 时不重抬（无 LV3 文案）', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  fixture.store.set('cflag:31:600', 49); // P = 50 → 本次达阈
  fixture.store.set('abl:31:32', 4);
  await seiin.seiin_start();
  assert.equal(fixture.store.get('abl:31:32'), 4);
  assert.ok(!fixture.text_lines().some((t) => t.includes('LV3')));
});

test('以降（1 < count < P）：同文无异常经验、源无乘算', async () => {
  const { fixture, seiin } = seed_world();
  fixture.store.set('tflag:0', 1);
  fixture.store.set('tflag:29', 1);
  fixture.store.set('cflag:31:600', 10);
  await seiin.seiin_start();
  assert.equal(fixture.store.get('exp:31:50'), undefined);
  assert.equal(fixture.store.get('source:31:13'), 1000);
  assert.ok(fixture.text_lines().some((t) => t.includes('强制地让')));
});
