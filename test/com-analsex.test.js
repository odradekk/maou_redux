'use strict';
/**
 * ere/system/train/com-analsex.js 的行为测试（issue #216 J6）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @COM_EJAC_PLAYER_ANALSEX：兽奸/死斗场早退、指令位表（25 基础值のみ /
 *     26 技巧+顺从 / 27 技巧のみ / 36 三乘）、润滑表（0.4 起步——与 V 版
 *     不同值）、EXP:1/53 阈值、安全套 0.5、E 判定与大量/通常射精、
 *     肛内异常妊娠（TALENT:340 × rand 概率档）；
 *   - @COM_AFTER_ANAL_SEX：肛门经验分档（首两档同 3）、CFLAG:113 == 3 的
 *     妊娠相手判定（五种相手，102 属主 event 走门面）、百合 +5 / 男同 +7、
 *     爱情经验（26 → 3；28 与其他 → 2——原文 E = 4 死行的行为锁定）、
 *     TFLAG:30、污渍互换（A 位 4 ↔ P 位 2）。
 *
 * 契约（调用方 = COMF25-29/36，J11/J15 落地）：
 *   com_ejac_player_analsex(rand) / com_after_anal_sex() → Promise<void>。
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
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 26;
  fixture.store.set('callname:31:-1', '温妮');
  fixture.store.set('callname:0:-1', '魔王');
  const as = fixture.load_module('system/train/com-analsex');
  return { fixture, era_flag, as };
}

function arm_player(fixture) {
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('maxbase:0:2', 5000);
}

test('兽奸（tequip:89）→ 早退；死斗场非助手本人 → 早退', async () => {
  for (const key of ['tequip:31:89', 'tequip:31:55']) {
    const { fixture, as } = seed_world();
    arm_player(fixture);
    fixture.store.set(key, 1);
    await as.com_ejac_player_analsex(() => 0);
    assert.equal(fixture.store.get('base:0:2'), undefined, key);
  }
});

test('数值例：COM26 全 0 → 1500 × 0.8 × 0.4（A 版润滑 0 档）× 1.5（EXP:1 < 1）', async () => {
  const { fixture, as } = seed_world();
  arm_player(fixture);
  await as.com_ejac_player_analsex(() => 9);
  // 1500 × 0.8 = 1200 → ×1.0 ×1.0 → ×0.4 = 480 → ×1.0 → ×1.5 = 720 → ×1.0
  assert.equal(fixture.store.get('base:0:2'), 720);
});

test('COM25（逆强奸）只有基础值；COM27（後背位）无顺从乘率', async () => {
  for (const [com, want] of [
    [25, Math.floor(Math.floor(1500 * 1.0 * 0.4) * 1.5)],
    [27, Math.floor(Math.floor(2700 * 1.0 * 0.4) * 1.5)],
  ]) {
    const { fixture, era_flag, as } = seed_world();
    arm_player(fixture);
    era_flag.selectcom = com;
    await as.com_ejac_player_analsex(() => 9);
    assert.equal(fixture.store.get('base:0:2'), want, `COM${com}`);
  }
});

test('COM28（対面座位）顺从强侧表（0 档 1.0、1 档 1.3）；COM36 三乘含侍奉技术', async () => {
  const { fixture, era_flag, as } = seed_world();
  arm_player(fixture);
  era_flag.selectcom = 28;
  fixture.store.set('abl:31:10', 1);
  await as.com_ejac_player_analsex(() => 9);
  // 800 × 1.3 = 1040 → ×0.4 = 416 → ×1.5 = 624
  assert.equal(fixture.store.get('base:0:2'), 624);

  const f2 = seed_world();
  arm_player(f2.fixture);
  f2.era_flag.selectcom = 36;
  f2.fixture.store.set('abl:31:13', 1); // 侍奉技术 1 档 ×0.7
  await f2.as.com_ejac_player_analsex(() => 9);
  // 1000 × 0.8 × 0.7 = 560 → ×0.4 = 224 → ×1.5 = 336
  assert.equal(f2.fixture.store.get('base:0:2'), 336);
});

test('润滑 ≥ LV4（PALAM:3 ≥ 10000）→ ×1.6 顶档（A 版表，非 V 版 1.4）', async () => {
  const { fixture, era_flag, as } = seed_world();
  arm_player(fixture);
  era_flag.selectcom = 28;
  fixture.store.set('abl:31:10', 1);
  fixture.store.set('palam:31:3', 10000);
  await as.com_ejac_player_analsex(() => 9);
  // 800 × 1.3（顺从 1 档）= 1040 → ×1.6 = 1664 → ×1.5（EXP:1 < 1）= 2496
  assert.equal(fixture.store.get('base:0:2'), 2496);
});

test('安全套 0.5（与 V 版的 0.6 不同值）+ EXP:53 阈值档', async () => {
  const { fixture, as } = seed_world();
  arm_player(fixture);
  fixture.store.set('tequip:31:35', 1);
  fixture.store.set('exp:31:53', 200); // ≥ EXPLV:5 → ×0.1
  await as.com_ejac_player_analsex(() => 9);
  // 1200 → ×0.4 = 480 → ×1.5 = 720 → ×0.1 = 72 → ×0.5 = 36
  assert.equal(fixture.store.get('base:0:2'), 36);
});

test('通常射精（E = 1）：文案无部位分支、TFLAG:2 = 1、ゲージ复位', async () => {
  const { fixture, as } = seed_world();
  arm_player(fixture);
  fixture.store.set('base:0:2', 4500);
  await as.com_ejac_player_analsex(() => 9);
  const lines = fixture.text_lines();
  assert.ok(lines.includes('射精'));
  assert.ok(!lines.some((t) => t.includes('膣内')));
  assert.equal(fixture.store.get('exp:0:3'), 1);
  assert.equal(fixture.store.get('exp:31:20'), 1);
  assert.equal(fixture.store.get('tflag:2'), 1);
  // 4500 + 720 = 5220 → -5000 = 220
  assert.equal(fixture.store.get('base:0:2'), 220);
});

test('肛内异常妊娠：TALENT:340 + rand 命中 → CFLAG:113 = 3', async () => {
  const { fixture, as } = seed_world();
  arm_player(fixture);
  fixture.store.set('talent:31:340', 1);
  fixture.store.set('base:0:2', 9999);
  await as.com_ejac_player_analsex(() => 0); // 大量档 CFLAG:109 无 → 1/5，rand(5)=0 命中
  assert.equal(fixture.store.get('cflag:31:113'), 3);
});

test('肛内异常妊娠：无 TALENT:340 时 rand 命中也不写；有 340 时 rand 未命中不写', async () => {
  for (const [seed, rand] of [
    [(f) => f.store.set('base:0:2', 9999), 0], // 无 340 + rand 0 → 不写
    [
      (f) => {
        f.store.set('base:0:2', 9999);
        f.store.set('talent:31:340', 1);
      },
      4, // 有 340 + rand 4 ≠ 0 → 不写
    ],
  ]) {
    const { fixture, as } = seed_world();
    arm_player(fixture);
    seed(fixture);
    await as.com_ejac_player_analsex(() => rand);
    assert.equal(fixture.store.get('cflag:31:113'), undefined);
  }
});

test('CFLAG:109 抬概率档（通常射精 1/5 → 1/10 的对照组）', async () => {
  const { fixture, as } = seed_world();
  arm_player(fixture);
  fixture.store.set('cflag:31:109', 1);
  fixture.store.set('talent:31:340', 1);
  fixture.store.set('base:0:2', 4500);
  await as.com_ejac_player_analsex(() => 0); // CFLAG:109 → rand(5) = 0 命中
  assert.equal(fixture.store.get('cflag:31:113'), 3);
});

// —— @COM_AFTER_ANAL_SEX ——

test('肛门经验分档：≤ 1 与 ≤ 4 同为 +3（原文如此），≥ 8 → +5', async () => {
  for (const [abl3, want] of [
    [0, 3],
    [4, 3],
    [8, 5],
  ]) {
    const { fixture, as } = seed_world();
    fixture.store.set('abl:31:3', abl3);
    await as.com_after_anal_sex();
    assert.equal(fixture.store.get('exp:31:1'), want, `abl:3 = ${abl3}`);
    assert.ok(fixture.text_lines().includes(`肛门经验+${want}`));
  }
});

test('CFLAG:113 == 3 → 妊娠相手判定（主人 1 / 助手 2 / 犬 5 / 触手怪物 6 / 死斗场客 4）', async () => {
  for (const [seed, want] of [
    [(f, ef) => ef.assiplay === 0, 1],
    [
      (f, ef) => {
        ef.assiplay = 1;
        return true;
      },
      2,
    ],
    [(f) => f.store.set('tequip:31:89', 1), 5],
    [(f) => f.store.set('tequip:31:90', 1), 6],
    [
      (f, ef) => {
        ef.selectcom = 202;
        return true;
      },
      4,
    ],
  ]) {
    const { fixture, era_flag, as } = seed_world();
    fixture.store.set('cflag:31:113', 3);
    seed(fixture, era_flag);
    await as.com_after_anal_sex();
    assert.equal(fixture.store.get('cflag:31:102'), want, `want = ${want}`);
  }
});

test('CFLAG:113 != 3 → 妊娠相手不写', async () => {
  const { fixture, as } = seed_world();
  fixture.store.set('cflag:31:113', 1);
  await as.com_after_anal_sex();
  assert.equal(fixture.store.get('cflag:31:102'), undefined);
});

test('百合 +5（双方非男人）；男同 +7（双方男人）', async () => {
  const { fixture, as } = seed_world();
  await as.com_after_anal_sex();
  assert.equal(fixture.store.get('exp:31:40'), 5);

  const f2 = seed_world();
  f2.fixture.store.set('talent:31:122', 1); // 对象也是男人
  f2.fixture.store.set('talent:0:122', 1); // 调教者（魔王）也按男人计
  await f2.as.com_after_anal_sex();
  assert.equal(f2.fixture.store.get('exp:31:41'), 7);
  assert.equal(f2.fixture.store.get('exp:31:40'), undefined);
});

test('爱情经验：COM26 → 3；COM28 与其他 → 2（原文 E = 4 不可达的行为锁）；男性 +1', async () => {
  for (const [com, male, want] of [
    [26, 0, 3],
    [28, 0, 2],
    [27, 0, 2],
    [26, 1, 4],
  ]) {
    const { fixture, era_flag, as } = seed_world();
    era_flag.selectcom = com;
    fixture.store.set('cflag:31:2', 1000);
    if (male) {
      fixture.store.set('talent:31:122', 1);
    }
    await as.com_after_anal_sex();
    assert.equal(
      fixture.store.get('exp:31:23'),
      want,
      `COM${com} 男性=${male}`,
    );
  }
});

test('主人亲自 → TFLAG:30（判据 ABL:3 肛门感觉）', async () => {
  for (const [abl3, want] of [
    [0, 1],
    [3, 2],
  ]) {
    const { fixture, as } = seed_world();
    fixture.store.set('abl:31:3', abl3);
    await as.com_after_anal_sex();
    assert.equal(fixture.store.get('tflag:30'), want);
  }
});

test('污渍互换：STAIN:4（A 位）↔ STAIN:P:2', async () => {
  const { fixture, as } = seed_world();
  fixture.store.set('stain:0:2', 4);
  fixture.store.set('stain:31:4', 2);
  await as.com_after_anal_sex();
  assert.equal(fixture.store.get('stain:31:4'), 6);
  assert.equal(fixture.store.get('stain:0:2'), 6);
});
