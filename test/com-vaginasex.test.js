'use strict';
/**
 * ere/system/train/com-vaginasex.js 的行为测试（issue #216 J6）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @CONFIRM_LOST_VIRGIN：非处女直通 / 处女二键（0 夺取 / 1 保留）；
 *   - @COM_EJAC_PLAYER_SEX：兽奸与死斗场早退、指令位基础值表（COM20 技巧
 *     分档 × 顺从）、共通乘率（欲望/性交技术/润滑/玩家阴蒂感觉/EXP 阈值/
 *     安全套 0.6）、ゲージ蓄积与 E 判定（通常/大量）、射精文案的部位分支
 *     （CFLAG:113 1-4 与膣内的随机受精判定）、TFLAG:2/38、STAIN、
 *     ゲージ复位钳位；
 *   - @COM_EJAC_PLAYER_MILK：非母乳体质早退、乘率串（克制减半等）、
 *     半衰蓄积、E 判定（B 判据的上游怪相）、EX:5/NOWEX:5（门面 + 直写）；
 *   - @COM_AFTER_VAGINA_SEX：私处经验分档、处女异常经验（此时 TALENT:0
 *     未清——丧失在 SOURCE_CHECK 后半）、RAND:2 清 CFLAG:113、百合 +4、
 *     爱情经验表、RELATION 助手分支、童贞丧失（CFLAG:PLAYER:15 与近亲
 *     代码表）、污渍互换；
 *   - @COM_AFTER_EXTRA_SEX：CFLAG:113 == 1 的乳房经验 + 首次异常 2、
 *     日文残留串的 #60 归一（性交经验＋１ / 【童贞丧失】）。
 *
 * 契约（调用方 = COMF8/11/20-23/34/64/90/120/121/128-134，J9-J19 落地）：
 *   confirm_lost_virgin() → Promise<number>（RESULT 语义，0 中止指令）；
 *   com_ejac_player_sex(rand) / com_after_vagina_sex(rand) → Promise<void>；
 *   com_ejac_player_milk(b) 只被 com_ejac_player_sex 尾调（B 透传）；
 *   com_after_extra_sex() → Promise<void>。
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
  era_flag.selectcom = 20;
  fixture.store.set('callname:31:-1', '温妮');
  fixture.store.set('callname:0:-1', '魔王');
  const vs = fixture.load_module('system/train/com-vaginasex');
  return { fixture, era_flag, vs };
}

/** 调教者配男性器 + 一套中等数值（各表可预测） */
function arm_player(fixture) {
  fixture.store.set('talent:0:122', 1);
  fixture.store.set('maxbase:0:2', 5000);
  fixture.store.set('maxbase:0:3', 5000);
}

// —— @CONFIRM_LOST_VIRGIN ——

test('非处女 → RETURN 1 直通（无输出无输入）', async () => {
  const { fixture, vs } = seed_world();
  fixture.set_inputs();
  assert.equal(await vs.confirm_lost_virgin(), 1);
  assert.deepEqual(fixture.text_lines(), []);
});

test('处女 + [0] 来吧女人 → RETURN 1；[1] 让她继续做女孩 → RETURN 0', async () => {
  for (const [key, want] of [
    [0, 1],
    [1, 0],
  ]) {
    const { fixture, vs } = seed_world();
    fixture.store.set('talent:31:0', 1);
    fixture.set_inputs(key);
    assert.equal(await vs.confirm_lost_virgin(), want);
    assert.ok(fixture.text_lines().includes('夺取温妮的处女吗？'));
  }
});

// —— @COM_EJAC_PLAYER_SEX ——

test('兽奸（tequip:89）→ 早退，ゲージ不动', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('tequip:31:89', 1);
  await vs.com_ejac_player_sex(() => 0);
  assert.equal(fixture.store.get('base:0:2'), undefined);
});

test('死斗场且非助手本人 → 早退；助手本人继续', async () => {
  for (const [assi, player, want] of [
    [-1, 0, undefined],
    [0, 0, 'number'], // 助手 = 主人本人（ASSI == PLAYER → 不早退）
  ]) {
    const { fixture, era_flag, vs } = seed_world();
    arm_player(fixture);
    fixture.store.set('tequip:31:55', 1);
    era_flag.assi = assi;
    era_flag.player = player;
    era_flag.target = 31;
    await vs.com_ejac_player_sex(() => 0);
    if (want === undefined) {
      assert.equal(fixture.store.get('base:0:2'), undefined);
    } else {
      assert.equal(typeof fixture.store.get('base:0:2'), 'number');
    }
  }
});

test('数值例：COM20 全 ABL 0、无润滑无经验 → B = 1500 × 0.8 × 0.6（润滑 < LV1）', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  await vs.com_ejac_player_sex(() => 9);
  // 1500（技巧 0 档）× 0.8（顺从 0 档）× 1.0 × 1.0 × 0.6（润滑）× 1.0
  // × 1.5（EXP:0 < EXPLV:1）× 1.0（EXP:52 < EXPLV:1）= 1080
  assert.equal(fixture.store.get('base:0:2'), 1080);
});

test('数值例：技巧 3 档（2000）+ 顺从 3 档（1.1）→ 蓄积 2000 × 1.1 × 后链', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('abl:31:12', 3);
  fixture.store.set('abl:31:10', 3);
  await vs.com_ejac_player_sex(() => 9);
  // 2000 × 1.1 = 2200 → ×0.6 = 1320 → ×1.5 = 1980
  assert.equal(fixture.store.get('base:0:2'), 1980);
});

test('安全套（主人位 35）→ 追加 ×0.6；玩家阴蒂感觉 2 → ×2.0', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('tequip:31:35', 1);
  fixture.store.set('abl:0:0', 2);
  fixture.store.set('palam:31:3', 10000); // 润滑 ≥ LV4 → ×1.4
  await vs.com_ejac_player_sex(() => 9);
  // 逐级截断：1500×0.8（顺从 0 档）=1200 → ×1.0×1.0 → ×1.4（润滑 ≥ LV4）
  // =1680 → ×2.0（阴蒂感觉 2）=3360 → ×1.5（EXP:0 < 1）=5040 → ×1.0
  // → ×0.6（安全套）=3024
  assert.equal(fixture.store.get('base:0:2'), 3024);
});

test('通常射精（E = 1）：文案、精液经验、STAIN、TFLAG:2/38、ゲージ复位', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('base:0:2', 4500); // > 5000? 否 → 先蓄积再判——蓄积后必超
  await vs.com_ejac_player_sex(() => 9);
  const lines = fixture.text_lines();
  assert.ok(lines.includes('膣内射精'));
  assert.ok(lines.includes('精液经验＋１'));
  assert.equal(fixture.store.get('exp:0:3'), 1, 'EXP:PLAYER:3');
  assert.equal(fixture.store.get('exp:31:20'), 1, 'EXP:20');
  assert.equal(fixture.store.get('stain:0:2'), 4);
  assert.equal(fixture.store.get('tflag:2'), 1);
  assert.equal(fixture.store.get('tflag:38'), 1, '主人无套 → 膣内射精旗');
  // 蓄积 4500 + 1080 = 5580 → -5000 = 580
  assert.equal(fixture.store.get('base:0:2'), 580);
});

test('大量射精（E = 2）：文案 ×2 文本、经验 ×2、TFLAG:2/38 = 2', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('base:0:2', 9999);
  await vs.com_ejac_player_sex(() => 9);
  assert.ok(fixture.text_lines().includes('膣内大量射精'));
  assert.ok(fixture.text_lines().includes('精液经验＋２'));
  assert.equal(fixture.store.get('exp:0:3'), 2);
  assert.equal(fixture.store.get('tflag:2'), 2);
  assert.equal(fixture.store.get('tflag:38'), 2);
});

test('膣内受精判定：CFLAG:109 时 1/3（rand(3) = 0 → CFLAG:113 = -1）', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('cflag:31:109', 1);
  fixture.store.set('base:0:2', 9999);
  await vs.com_ejac_player_sex(() => 0);
  assert.equal(fixture.store.get('cflag:31:113'), -1);
});

test('膣内受精判定：rand 未命中 → CFLAG:113 不写', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('base:0:2', 9999);
  await vs.com_ejac_player_sex(() => 2); // rand(3) = 2 ≠ 0
  assert.equal(fixture.store.get('cflag:31:113'), undefined);
});

test('戴套射精：文案无部位前缀，不置膣内射精旗', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('tequip:31:35', 1);
  fixture.store.set('base:0:2', 9999);
  await vs.com_ejac_player_sex(() => 9);
  assert.ok(fixture.text_lines().includes('大量射精'));
  assert.ok(!fixture.text_lines().some((t) => t.includes('膣内')));
  assert.equal(fixture.store.get('tflag:38'), undefined);
});

test('部位文案：CFLAG:113 = 3（肛）/ 4（口）的追加句', async () => {
  for (const [site, frag] of [
    [3, '直肠深处'],
    [4, '喉咙深处'],
  ]) {
    const { fixture, vs } = seed_world();
    arm_player(fixture);
    fixture.store.set('cflag:31:113', site);
    fixture.store.set('base:0:2', 9999);
    await vs.com_ejac_player_sex(() => 9);
    assert.ok(
      fixture.text_lines().some((t) => t.includes(frag)),
      `CFLAG:113 = ${site}`,
    );
  }
});

// —— @COM_EJAC_PLAYER_MILK ——

test('MILK：非母乳体质 → 早退（ゲージ 3 不动）', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  await vs.com_ejac_player_milk(1000);
  assert.equal(fixture.store.get('base:0:3'), undefined);
});

test('MILK：母乳体质 + 克制 → B = 1000 + (1000 × 0.6 × 0.5 - 1000)/2 截断', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('talent:0:130', 1); // 母乳体质
  fixture.store.set('talent:0:20', 1); // 克制 → 减半
  await vs.com_ejac_player_milk(1000);
  // 1000 × 0.6（B 感觉 0 档）= 600 → /2 = 300 → 1000 + (300-1000)/2 = 650
  assert.equal(fixture.store.get('base:0:3'), 650);
});

test('MILK：E = 2 大量喷乳 → 文案、喷奶经验、STAIN:5 |= 16、EX/NOWEX', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('talent:0:130', 1);
  fixture.store.set('base:0:3', 9999);
  await vs.com_ejac_player_milk(1000);
  const lines = fixture.text_lines();
  assert.ok(lines.some((t) => t.includes('喷出了大量的母乳')));
  assert.ok(lines.includes('喷奶经验＋２'));
  assert.ok(lines.includes('异常经验＋1'), '首次喷乳的异常经验');
  assert.equal(fixture.store.get('exp:0:54'), 2);
  assert.equal(fixture.store.get('exp:0:50'), 1);
  assert.equal(fixture.store.get('stain:0:5'), 16);
  assert.equal(fixture.store.get('ex:0:5'), 1, 'EX:PLAYER:5（门面）');
  assert.equal(fixture.store.get('nowex:0:5'), 1);
});

test('MILK：B 判据行为锁——E1 的门槛是增量 B 而非蓄积 S（上游怪相 1:1）', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('talent:0:130', 1); // 母乳体质
  fixture.store.set('maxbase:0:3', 1000);
  fixture.store.set('base:0:3', 800);
  // b：1000 × 0.6 = 600 → 半衰 1000 + (600-1000)/2 = 800 → 蓄积 800+800
  // = 1600 > 1000（S 判据会 E1），但半衰后 B = 800 ≤ 1000（B 判据 E0）
  // ——上游用 B，故不喷乳
  await vs.com_ejac_player_milk(1000);
  assert.equal(fixture.store.get('base:0:3'), 1600);
  assert.ok(
    !fixture.text_lines().some((t) => t.includes('母乳')),
    'B ≤ 上限 → 无喷乳（S > 上限也不算——:761 的 B）',
  );
  assert.equal(fixture.store.get('exp:0:54'), undefined);
});

// —— @COM_AFTER_VAGINA_SEX ——

test('私处经验分档（ABL:2 ≤ 1 → +2；≥ 8 → +5）与性交经验 +1', async () => {
  for (const [abl2, want] of [
    [0, 2],
    [8, 5],
  ]) {
    const { fixture, vs } = seed_world();
    fixture.store.set('abl:31:2', abl2);
    await vs.com_after_vagina_sex(() => 1);
    assert.equal(fixture.store.get('exp:31:0'), want, `abl:2 = ${abl2}`);
    assert.equal(fixture.store.get('exp:31:5'), 1);
    assert.ok(fixture.text_lines().includes(`私处经验+${want}`));
  }
});

test('处女 + 女性调教者（非 121/122）→ 异常经验 +1（TALENT:0 未清）', async () => {
  const { fixture, vs } = seed_world();
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('talent:0:122', 0); // 女性调教者
  await vs.com_after_vagina_sex(() => 1);
  assert.equal(fixture.store.get('exp:31:50'), 1);
  assert.ok(fixture.text_lines().some((t) => t.includes('＋1')));
});

test('RAND:2 == 0 → CFLAG:113 清零；== 1 不清', async () => {
  for (const [rand, want] of [
    [0, 0],
    [1, 5],
  ]) {
    const { fixture, vs } = seed_world();
    fixture.store.set('cflag:31:113', 5);
    await vs.com_after_vagina_sex(() => rand);
    assert.equal(fixture.store.get('cflag:31:113'), want);
  }
});

test('双方非男人 → 百合经验 +4', async () => {
  const { fixture, vs } = seed_world();
  await vs.com_after_vagina_sex(() => 1);
  assert.equal(fixture.store.get('exp:31:40'), 4);
});

test('爱情经验表：COM20 → 4；处女 → 50（好感度 ≥ 1000 且主人亲自才写）', async () => {
  for (const [talent0, want] of [
    [0, 4],
    [1, 50],
  ]) {
    const { fixture, vs } = seed_world();
    fixture.store.set('talent:31:0', talent0);
    fixture.store.set('cflag:31:2', 1000);
    await vs.com_after_vagina_sex(() => 1);
    assert.equal(fixture.store.get('exp:31:23'), want, `处女 = ${talent0}`);
  }
});

test('好感度不足 1000 → 爱情经验不写；助手亲自 → 同样不写', async () => {
  const { fixture, vs } = seed_world();
  await vs.com_after_vagina_sex(() => 1);
  assert.equal(fixture.store.get('exp:31:23'), undefined);
  const f2 = seed_world();
  f2.fixture.store.set('cflag:31:2', 2000);
  f2.era_flag.assiplay = 1;
  await f2.vs.com_after_vagina_sex(() => 1);
  assert.equal(f2.fixture.store.get('exp:31:23'), undefined);
});

test('助手亲自 + 对象处女 → RELATION +30 且 30 归一到 130，上限 200', async () => {
  const { fixture, era_flag, vs } = seed_world();
  era_flag.assi = 17;
  era_flag.assiplay = 1;
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('talent:17:1', 1); // 助手也童贞 → +30 档
  await vs.com_after_vagina_sex(() => 1);
  assert.equal(fixture.store.get('relation:31:17'), 130);
});

test('RELATION 超 200 钳回（播种 190 + 30 → 200）', async () => {
  const { fixture, era_flag, vs } = seed_world();
  era_flag.assi = 17;
  era_flag.assiplay = 1;
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('talent:17:1', 1);
  fixture.store.set('relation:31:17', 190);
  await vs.com_after_vagina_sex(() => 1);
  assert.equal(fixture.store.get('relation:31:17'), 200);
});

test('主人亲自 → TFLAG:30 +1（ABL:2 < 3）/ +2（≥ 3）', async () => {
  for (const [abl2, want] of [
    [0, 1],
    [3, 2],
  ]) {
    const { fixture, vs } = seed_world();
    fixture.store.set('abl:31:2', abl2);
    await vs.com_after_vagina_sex(() => 1);
    assert.equal(fixture.store.get('tflag:30'), want);
  }
});

test('调教者童贞丧失：TFLAG 复位、CFLAG:PLAYER:15 = no + 1、CSTR:3、文案', async () => {
  const { fixture, vs } = seed_world();
  fixture.store.set('talent:0:1', 1); // 童贞
  await vs.com_after_vagina_sex(() => 1);
  assert.equal(fixture.store.get('talent:0:1'), 0);
  assert.equal(fixture.store.get('cflag:0:15'), 32, 'NO:TARGET + 1 = 32');
  assert.equal(fixture.store.get('cstr:0:3'), '温妮');
  assert.ok(fixture.text_lines().includes('【童贞丧失】'));
});

test('亲族关系：V 事后处理复用 INCEST，并按原作关系 2 写调教者初体验码', async () => {
  const { fixture, vs } = seed_world();
  arm_player(fixture);
  fixture.store.set('talent:31:0', 1);
  fixture.store.set('talent:0:1', 1);
  fixture.store.set('cflag:0:15', 0);
  fixture.store.set('cflag:31:21', 100); // 玩家是对象的子女（关系 2）
  await vs.com_after_vagina_sex(() => 1);

  assert.equal(fixture.store.get('tflag:14'), 0, '事后处理末尾按原作复位');
  assert.equal(
    fixture.store.get('exp:31:50'),
    undefined,
    '子女关系不触发 V 版异常经验加成',
  );
  assert.equal(
    fixture.store.get('cflag:0:15'),
    301,
    '女性对象的调教者初体验亲族码',
  );
});

test('污渍互换：STAIN:3 |= STAIN:P:2（含精液位 4 的传播）', async () => {
  const { fixture, vs } = seed_world();
  fixture.store.set('stain:0:2', 4);
  fixture.store.set('stain:31:3', 1);
  await vs.com_after_vagina_sex(() => 1);
  assert.equal(fixture.store.get('stain:31:3'), 5);
  assert.equal(fixture.store.get('stain:0:2'), 5);
});

// —— @COM_AFTER_EXTRA_SEX ——

test('EXTRA：CFLAG:113 == 1 → 乳房经验（ABL:1 分档）+ 首次异常 2；#60 归一文案', async () => {
  const { fixture, era_flag, vs } = seed_world();
  era_flag.selectcom = 90; // 乳内
  fixture.store.set('cflag:31:113', 1);
  fixture.store.set('talent:0:1', 1); // 童贞 → 丧失段也走
  await vs.com_after_extra_sex();
  assert.equal(fixture.store.get('exp:31:35'), 2, 'abl:1 = 0 → +2');
  assert.equal(fixture.store.get('exp:31:50'), 2, '首次 Ｂ经验 +2');
  assert.equal(fixture.store.get('exp:31:5'), 1);
  const lines = fixture.text_lines();
  assert.ok(lines.includes('乳房经验+2'));
  assert.ok(lines.includes('性交经验＋１'), '原文 経験 → 归一简体');
});

test('EXTRA：CFLAG:113 != 1 → 乳房经验段不写（经验 35 不动）', async () => {
  const { fixture, vs } = seed_world();
  await vs.com_after_extra_sex();
  assert.equal(fixture.store.get('exp:31:35'), undefined);
  assert.equal(fixture.store.get('exp:31:5'), 1);
});
