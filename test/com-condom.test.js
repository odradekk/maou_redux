'use strict';
/**
 * ere/system/train/com-condom.js 的行为测试（issue #216 J6）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @CONDOM_SETTINGS：TARGET < 1 直通、四键画面与 CFLAG:61 写入、
 *     「现在：」行的标签显示（LOCALS 缺陷的修复）；
 *   - @CONFIRM_CONDOM：五道直通闸（设定不用 / 兽奸 / 死斗场 / 无男性器 /
 *     已戴）、每次问的四键（戴/不戴/今后直接/今后都戴，含 RESTART 语义）、
 *     自动用的有套/无套 × 技巧档、主人位 35 走 event 门面、助手位 36 直写；
 *   - @CONFIRM_CONDOM2：条件合取与两键（用 → tequip:37 + 消耗、直接 →
 *     MASTER 的 CFLAG:61 = 2）。
 *
 * 契约（调用方：[103] 分发 = page-usercom.js；性交系指令入口闸 =
 * COMF20 等 16 个文件，J11/J19 落地）：condom_settings() →
 * Promise<number>；confirm_condom() → Promise<number>（1 继续 / 0 中止，
 * 调用方 SIF !RESULT RETURN 0）；confirm_condom2() → Promise<number>。
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
  fixture.store.set('callname:31:-1', '温妮');
  fixture.store.set('callname:0:-1', '魔王');
  const condom = fixture.load_module('system/train/com-condom');
  return { fixture, era_flag, condom };
}

/** 给主人配男性器（扶她 121 或男人 122），confirm 的前置 */
function arm_player(fixture) {
  fixture.store.set('talent:0:122', 1);
}

// —— @CONDOM_SETTINGS ——

test('TARGET < 1（魔王自己是对象）→ RETURN 1，不开画面', async () => {
  const { fixture, era_flag, condom } = seed_world();
  era_flag.target = 0;
  fixture.set_inputs(); // 不预置——不应等待任何输入
  const result = await condom.condom_settings();
  assert.equal(result, 1);
  assert.deepEqual(fixture.text_lines(), []);
});

test('画面：标题 + 当前设定（标签修复）+ 分隔线 + 四键，[9] 返回', async () => {
  const { fixture, condom } = seed_world();
  fixture.set_inputs(9);
  const result = await condom.condom_settings();
  assert.equal(result, 0);
  const lines = fixture.text_lines();
  assert.ok(lines.includes('和温妮做爱要戴套吗？'));
  assert.ok(lines.includes('现在：每次都问'), 'LOCALS 缺陷修复后的标签行');
  const buttons = fixture.lines
    .filter((line) => line.type === 'button')
    .map((b) => [b.accelerator, b.text]);
  assert.deepEqual(buttons, [
    [0, '每次都问'],
    [1, '有套就用'],
    [2, '每次都直接来，来个痛快'],
    [9, '返回'],
  ]);
});

test('当前设定的标签随 CFLAG:61 变（1 → 有套就用）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('cflag:31:61', 1);
  fixture.set_inputs(9);
  await condom.condom_settings();
  assert.ok(fixture.text_lines().includes('现在：有套就用'));
});

test('[0]/[1]/[2] 各写 CFLAG:61 并回显确认行', async () => {
  for (const [key, label, want] of [
    [0, '每次确认。', 0],
    [1, '使用安全套。', 1],
    [2, '和温妮直接做。', 2],
  ]) {
    const { fixture, condom } = seed_world();
    fixture.set_inputs(key);
    const result = await condom.condom_settings();
    assert.equal(result, 0);
    assert.equal(fixture.store.get('cflag:31:61'), want);
    assert.ok(fixture.text_lines().includes(label), `key ${key}`);
  }
});

// —— @CONFIRM_CONDOM：直通闸 ——

test('设定 2（不用）→ 直接放行', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('cflag:31:61', 2);
  arm_player(fixture);
  assert.equal(await condom.confirm_condom(), 1);
  assert.deepEqual(fixture.text_lines(), []);
});

test('兽奸（tequip:89）/ 死斗场（tequip:55）→ 放行', async () => {
  for (const key of ['tequip:31:89', 'tequip:31:55']) {
    const { fixture, condom } = seed_world();
    fixture.store.set(key, 1);
    arm_player(fixture);
    assert.equal(await condom.confirm_condom(), 1, key);
  }
});

test('调教者无男性器（非 121 非 122）→ 放行', async () => {
  const { condom } = seed_world();
  assert.equal(await condom.confirm_condom(), 1);
});

test('已戴着（主人位 35 / 助手位 36）→ 放行且不重复消耗', async () => {
  for (const [key, assiplay] of [
    ['tequip:31:35', 0],
    ['tequip:31:36', 1],
  ]) {
    const { fixture, era_flag, condom } = seed_world();
    fixture.store.set(key, 1);
    fixture.store.set('item:24', 2);
    arm_player(fixture);
    era_flag.assiplay = assiplay;
    fixture.set_inputs();
    assert.equal(await condom.confirm_condom(), 1, key);
    assert.equal(fixture.store.get('item:24'), 2, `${key}：不消耗`);
  }
});

// —— @CONFIRM_CONDOM：每次问 ——

test('每次问 + 有套 + [0] 戴：消耗一枚、主人位 35（event 门面）、放行', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('item:24', 3);
  arm_player(fixture);
  fixture.set_inputs(0);
  assert.equal(await condom.confirm_condom(), 1);
  assert.equal(fixture.store.get('item:24'), 2);
  assert.equal(fixture.store.get('tequip:31:35'), 1, 'tequip:35 经门面写');
  assert.ok(fixture.text_lines().includes('魔王戴着套。'));
});

test('每次问 + 有套 + [1] 不戴：不消耗、放行', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('item:24', 3);
  arm_player(fixture);
  fixture.set_inputs(1);
  assert.equal(await condom.confirm_condom(), 1);
  assert.equal(fixture.store.get('item:24'), 3);
  assert.equal(fixture.store.get('tequip:31:35'), undefined);
});

test('每次问 + 无套：两段 IF 均不进（原作静默 RETURN 1——不问也不提示）', async () => {
  const { fixture, condom } = seed_world();
  arm_player(fixture);
  fixture.set_inputs(); // 不等待输入
  assert.equal(await condom.confirm_condom(), 1);
  assert.deepEqual(fixture.text_lines(), []);
});

test('每次问 + 有套 + [2] 今后都直接：RESTART 后按设定 2 放行', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('item:24', 3);
  arm_player(fixture);
  fixture.set_inputs(2);
  assert.equal(await condom.confirm_condom(), 1);
  assert.equal(fixture.store.get('cflag:31:61'), 2);
  assert.ok(fixture.text_lines().includes('今后和温妮做都是直接来。'));
  assert.equal(fixture.store.get('item:24'), 3, '不消耗');
});

test('每次问 + 有套 + [3] 今后都戴：RESTART 后走自动用（消耗并戴上）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('item:24', 3);
  arm_player(fixture);
  fixture.set_inputs(3);
  assert.equal(await condom.confirm_condom(), 1);
  assert.equal(fixture.store.get('cflag:31:61'), 1);
  assert.equal(fixture.store.get('item:24'), 2, '自动用段消耗一枚');
  assert.equal(fixture.store.get('tequip:31:35'), 1);
});

test('助手调教（assiplay）+ 每次问：问句与戴上位切换（36 直写）', async () => {
  const { fixture, era_flag, condom } = seed_world();
  fixture.store.set('item:24', 1);
  arm_player(fixture);
  era_flag.assiplay = 1;
  fixture.set_inputs(0);
  assert.equal(await condom.confirm_condom(), 1);
  assert.ok(fixture.text_lines().includes('让使用安全套吗？'));
  assert.ok(fixture.text_lines().includes('让魔王戴着套。'));
  assert.equal(fixture.store.get('tequip:31:36'), 1);
});

// —— @CONFIRM_CONDOM：自动用 ——

test('设定 1 + 有套：直接消耗并戴上（无输入）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('cflag:31:61', 1);
  fixture.store.set('item:24', 1);
  arm_player(fixture);
  fixture.set_inputs();
  assert.equal(await condom.confirm_condom(), 1);
  assert.equal(fixture.store.get('item:24'), 0);
  assert.equal(fixture.store.get('tequip:31:35'), 1);
});

test('设定 1 + 无套 + 主人技巧 Lv5：三键问（[2] 拒绝 → RETURN 0 中止）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('cflag:31:61', 1);
  fixture.store.set('abl:0:12', 5);
  arm_player(fixture);
  fixture.set_inputs(2);
  assert.equal(await condom.confirm_condom(), 0, '唯一返回 0 的路径');
  assert.ok(fixture.text_lines().includes('没有安全套，直接来。来吗？'));
  // 三键（按钮不在 text_lines 里，查按钮面）
  const buttons = fixture.lines
    .filter((line) => line.type === 'button')
    .map((b) => [b.accelerator, b.text]);
  assert.deepEqual(buttons, [
    [0, '好的(下次也继续确认)'],
    [1, '好的(今后都直接来)'],
    [2, '不要'],
  ]);
});

test('设定 1 + 无套 + 主人技巧 Lv5 + [0]：继续（下次再问）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('cflag:31:61', 1);
  fixture.store.set('abl:0:12', 5);
  arm_player(fixture);
  fixture.set_inputs(0);
  assert.equal(await condom.confirm_condom(), 1);
});

test('设定 1 + 无套 + 主人技巧 Lv5 + [1]：今后都直接（CFLAG:61 = 2）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('cflag:31:61', 1);
  fixture.store.set('abl:0:12', 9);
  arm_player(fixture);
  fixture.set_inputs(1);
  assert.equal(await condom.confirm_condom(), 1);
  assert.equal(fixture.store.get('cflag:31:61'), 2);
  assert.ok(fixture.text_lines().includes('今后对温妮不再确认。'));
});

test('设定 1 + 无套 + 技巧 < Lv5：直接插入（笨魔王条款，:115 原注）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('cflag:31:61', 1);
  fixture.store.set('abl:0:12', 4);
  arm_player(fixture);
  fixture.set_inputs();
  assert.equal(await condom.confirm_condom(), 1);
  assert.ok(fixture.text_lines().includes('因为没有安全套所以直接插入。'));
});

// —— @CONFIRM_CONDOM2 ——

test('CONFIRM2：对象有男性器 + 未戴 + 有套 → 两键；[0] 用（37 + 消耗）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('talent:31:122', 1); // 对象侧的男性器
  fixture.store.set('item:24', 2);
  fixture.set_inputs(0);
  assert.equal(await condom.confirm_condom2(), 1);
  assert.equal(fixture.store.get('tequip:31:37'), 1);
  assert.equal(fixture.store.get('item:24'), 1);
  assert.ok(fixture.text_lines().includes('温妮戴着套'));
});

test('CONFIRM2：[1] 这次直接 → MASTER 的 CFLAG:61 = 2（不是 TARGET 行）', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('talent:31:121', 1); // 扶她也算
  fixture.store.set('item:24', 2);
  fixture.set_inputs(1);
  assert.equal(await condom.confirm_condom2(), 1);
  assert.equal(fixture.store.get('cflag:0:61'), 2);
  assert.equal(fixture.store.get('cflag:31:61'), undefined, '写的是 MASTER 行');
});

test('CONFIRM2：主人已设定不用（CFLAG:MASTER:61 = 2）→ 不问', async () => {
  const { fixture, condom } = seed_world();
  fixture.store.set('talent:31:122', 1);
  fixture.store.set('item:24', 2);
  fixture.store.set('cflag:0:61', 2);
  fixture.set_inputs();
  assert.equal(await condom.confirm_condom2(), 1);
  assert.deepEqual(fixture.text_lines(), []);
});

test('CONFIRM2：对象无男性器 / 已戴（37）/ 无套 → 均不问', async () => {
  for (const seed of [
    (f) => f.store.set('item:24', 1),
    (f) => {
      f.store.set('item:24', 1);
      f.store.set('talent:31:122', 1);
      f.store.set('tequip:31:37', 1);
    },
  ]) {
    const { fixture, condom } = seed_world();
    seed(fixture);
    fixture.set_inputs();
    assert.equal(await condom.confirm_condom2(), 1);
    assert.deepEqual(fixture.text_lines(), []);
  }
});
