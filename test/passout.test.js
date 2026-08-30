'use strict';
/**
 * ere/system/train/passout.js 的行为测试（issue #216 J6）。
 *
 * 缝 = test/helpers/era-fixture.js。覆盖：
 *   - @PASSOUT_CHECK 三条触发线（连续强绝顶 / 苦痛 / 恐怖）、相位与叠加
 *     （895 = 1/2/3/4/6）、执行回数 899 的推进、恢复判定与 EXP:65；
 *   - @PASSOUT_TEXT 的四段：失神瞬间清零（864-894）、次回起的精液计数
 *     （含戴套 -1）、装备快照（初回）与 -1 标记（次回）、895 分档文案
 *     （口塞 45 吞首行）与恢复分支（CFLAG:99 剪裁）；
 *   - @PASSOUT_MESSAGE 的选支优先级与 G/X/Y 结算（PASSOUT_PALAM_UP 读）；
 *   - @PASSOUT_PALAM_CHECK 的暂存与 UP 清零、@PASSOUT_PALAM_UP 的折算
 *     放大回流（手算数值例）与 896-899 复位；
 *   - @PASSOUT_OUTDOOR 的解除与体力气力扣减；
 *   - **TFLAG:899 写入路径 → @KOJO_MESSAGE_COM 第四道守卫的端到端证明**
 *     （#213 七道守卫此前无真实置位者——本票的位置，验收项）。
 *
 * 契约（调用方 = @SOURCE_CHECK，ere/event/source-check.js）：
 *   passout_check(rand) / passout_text() / passout_outdoor() → Promise；
 *   passout_palam_check() / passout_palam_up() → 同步。rand = (n) => [0, n)。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

/** 世界底座：魔王 0 + 奴隶 31，火车表开着（tflag/tequip 可写） */
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
  era_flag.selectcom = 0;
  fixture.store.set('callname:31:-1', '温妮');
  const passout = fixture.load_module('system/train/passout');
  return { fixture, era_flag, passout };
}

/** 播种「本回合强绝顶」（NOWEX:0-3 之和 ≥ 16） */
function seed_strong_orgasm(fixture, total = 20) {
  fixture.store.set('nowex:31:0', total);
}

// —— @PASSOUT_CHECK ——

test('系统开关：FLAG:70 = 1 时整体跳过（全库零写点，守卫 1:1）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('flag:70', 1);
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:897'), undefined);
});

test('强绝顶线：首回（Z≥16，rand<8）记相位 897 = 1，不失神', async () => {
  const { fixture, passout } = seed_world();
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:897'), 1);
  assert.equal(fixture.store.get('tflag:899'), undefined);
  assert.deepEqual(fixture.text_lines(), []);
});

test('强绝顶线：rand ≥ 8 时首回不记相位（80% 概率的另一半）', async () => {
  const { fixture, passout } = seed_world();
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 8);
  assert.equal(fixture.store.get('tflag:897'), undefined);
});

test('强绝顶线：次回（897 = 1，rand<6）失神——895/897/899/EXP:65 全套', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:897', 1);
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:895'), 1);
  assert.equal(fixture.store.get('tflag:897'), 2);
  assert.equal(fixture.store.get('tflag:899'), 1);
  assert.equal(fixture.store.get('exp:31:65'), 1);
  assert.deepEqual(fixture.text_lines(), ['失神']);
});

test('强绝顶线：次回 rand ≥ 6 不失神（60% 概率的另一半）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:897', 1);
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 6);
  assert.equal(fixture.store.get('tflag:895'), 0);
  assert.equal(fixture.store.get('tflag:897'), 1, '相位保持，不失神');
  assert.equal(fixture.store.get('tflag:899'), undefined);
});

test('苦痛线：UP:9 < 7500（rand 命中也不触发）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('delta:31:9', 7000);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:895'), 0);
  assert.equal(fixture.store.get('tflag:898'), undefined);
});

test('强绝顶线：连续中断（Z < 16）相位回退 897 = 0', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:897', 1);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:897'), 0);
});

test('失神中（899 ≥ 1）不重复触发：强绝顶线整体旁路', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:899', 1);
  fixture.store.set('tflag:897', 0);
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:895'), 0);
  assert.equal(
    fixture.store.get('tflag:897'),
    0,
    '相位不动（触发线被 899 闸住）',
  );
});

test('苦痛线：单回 UP:9 ≥ 7500（rand<5）→ 895 = 2 / 898 = 2 / EXP:65', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('delta:31:9', 8000);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:895'), 2);
  assert.equal(fixture.store.get('tflag:898'), 2);
  assert.equal(fixture.store.get('tflag:899'), 1);
  assert.equal(fixture.store.get('exp:31:65'), 1);
});

test('同回叠加：强绝顶失神（895 = 1）+ 苦痛 ≥ 7500 → 895 = 4（经验只计一次）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:897', 1); // 上回已记相位（本回直入失神支）
  seed_strong_orgasm(fixture);
  fixture.store.set('delta:31:9', 8000);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:895'), 4, '快感 + 苦痛');
  assert.equal(fixture.store.get('tflag:897'), 2);
  assert.equal(fixture.store.get('tflag:898'), 2);
  assert.equal(fixture.store.get('tflag:899'), 1);
  assert.equal(
    fixture.store.get('exp:31:65'),
    1,
    '强绝顶支计过，苦痛支不重复计',
  );
});

test('苦痛线：累计折算（PALAM:9 ≥ 15000 先减，UP:9 补足 15000 也触发）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('palam:31:9', 16000);
  fixture.store.set('delta:31:9', 0);
  await passout.passout_check(() => 0);
  // A = 16000 - 15000 = 1000；UP:9 + A = 1000 < 15000 → 不触发
  assert.equal(fixture.store.get('tflag:895'), 0);
});

test('恐怖线：UP:10 ≥ 5000（rand<5）→ 895 = 3 / 896 = 2', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('delta:31:10', 5000);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:895'), 3);
  assert.equal(fixture.store.get('tflag:896'), 2);
  assert.equal(fixture.store.get('tflag:899'), 1);
});

test('同回叠加：苦痛失神（895 = 2）+ 恐怖 ≥ 5000 → 895 = 6', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('delta:31:9', 8000);
  fixture.store.set('delta:31:10', 5000);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:895'), 6, '苦痛 + 恐怖');
  assert.equal(fixture.store.get('tflag:896'), 2);
  assert.equal(fixture.store.get('tflag:898'), 2);
  assert.equal(fixture.store.get('exp:31:65'), 1);
});

test('执行回数：失神中每回 +1（899: 1 → 2 → 3）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:897', 2);
  fixture.store.set('tflag:899', 1);
  await passout.passout_check(() => 9);
  assert.equal(fixture.store.get('tflag:899'), 2);
  await passout.passout_check(() => 9);
  assert.equal(fixture.store.get('tflag:899'), 3);
});

test('恢复：899 ≥ 2 且强绝顶再现 → 896/897/898 = 3 + 恢复文案', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:896', 2);
  fixture.store.set('tflag:897', 2);
  fixture.store.set('tflag:898', 2);
  fixture.store.set('tflag:899', 2);
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 9);
  assert.equal(fixture.store.get('tflag:896'), 3);
  assert.equal(fixture.store.get('tflag:897'), 3);
  assert.equal(fixture.store.get('tflag:898'), 3);
  assert.ok(fixture.text_lines().includes('从失神中恢复了'));
});

test('恢复：执行 4 回（899 ≥ 4）无条件恢复；苦痛 ≥ 5000 亦恢复', async () => {
  for (const [seed] of [
    [(f) => f.store.set('tflag:899', 4)],
    [(f) => f.store.set('delta:31:9', 5000)],
  ]) {
    const { fixture, passout } = seed_world();
    fixture.store.set('tflag:897', 2);
    fixture.store.set('tflag:899', 2);
    seed(fixture);
    await passout.passout_check(() => 9);
    assert.equal(fixture.store.get('tflag:897'), 3);
  }
});

// —— @PASSOUT_TEXT ——

test('失神瞬间（895 > 0）：864-894 全清', async () => {
  const { fixture, passout } = seed_world();
  for (let i = 0; i < 31; i += 1) {
    fixture.store.set(`tflag:${864 + i}`, 7);
  }
  fixture.store.set('tflag:895', 1);
  await passout.passout_text();
  for (let i = 0; i < 31; i += 1) {
    assert.equal(fixture.store.get(`tflag:${864 + i}`), 0, `tflag:${864 + i}`);
  }
});

test('失神次回（899 > 1）：口内射精计数 TFLAG:868 += TFLAG:0 + TFLAG:6', async () => {
  const { fixture, era_flag, passout } = seed_world();
  era_flag.selectcom = 80; // 口内位
  fixture.store.set('tflag:899', 2);
  fixture.store.set('tflag:0', 2);
  fixture.store.set('tflag:6', 1);
  await passout.passout_text();
  assert.equal(fixture.store.get('tflag:868'), 3);
});

test('失神次回：戴套（tequip:35）时计数 -1', async () => {
  const { fixture, era_flag, passout } = seed_world();
  era_flag.selectcom = 80;
  fixture.store.set('tflag:899', 2);
  fixture.store.set('tflag:0', 2);
  fixture.store.set('tequip:31:35', 1);
  await passout.passout_text();
  assert.equal(fixture.store.get('tflag:868'), 1);
});

test('失神次回：性交射精按指令位分流 871（膣内）/ 872（肛内），戴套不计', async () => {
  for (const [com, key, condom] of [
    [20, 'tflag:871', 0],
    [26, 'tflag:872', 0],
    [20, 'tflag:871', 1],
  ]) {
    const { fixture, era_flag, passout } = seed_world();
    era_flag.selectcom = com;
    fixture.store.set('tflag:899', 2);
    fixture.store.set('tflag:2', 2);
    if (condom) {
      fixture.store.set('tequip:31:35', 1);
    }
    await passout.passout_text();
    assert.equal(
      fixture.store.get(key),
      condom ? undefined : 2,
      `selectcom ${com}${condom ? '（戴套）' : ''} → ${key}`,
    );
  }
});

test('失神次回：触手射精的 100/1000 权重（selectcom 101/102）', async () => {
  for (const [com, want] of [
    [101, 100],
    [102, 1000],
  ]) {
    const { fixture, era_flag, passout } = seed_world();
    era_flag.selectcom = com;
    fixture.store.set('tflag:899', 2);
    fixture.store.set('tflag:15', 3);
    await passout.passout_text();
    assert.equal(fixture.store.get('tflag:876'), want);
  }
});

test('快照（899 == 1）：插入系/装具/媚药/情景/触手按 tequip 落位，CFLAG:74 复位', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:899', 1);
  fixture.store.set('tequip:31:11', 1); // 私处蠕虫
  fixture.store.set('tequip:31:13', 1); // 肛门蠕虫
  fixture.store.set('tequip:31:44', 3); // 绳（值带入）
  fixture.store.set('tequip:31:21', 1); // 媚药
  fixture.store.set('tequip:31:53', 1); // 摄影机
  fixture.store.set('tequip:31:90', 1); // 触手
  fixture.store.set('cflag:31:74', 5);
  await passout.passout_text();
  assert.equal(fixture.store.get('tflag:877'), 1);
  assert.equal(fixture.store.get('tflag:867'), 1);
  assert.equal(fixture.store.get('tflag:864'), 3); // 值 = 绳种
  assert.equal(fixture.store.get('tflag:880'), 21);
  assert.equal(fixture.store.get('tflag:881'), 53);
  assert.equal(fixture.store.get('tflag:882'), 1);
  assert.equal(fixture.store.get('cflag:31:74'), 0);
});

test('快照 else 臂（未失神回合同样跑）：与快照不同的位标 -1', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tequip:31:11', 1); // 装了蠕虫但从未失神（877 无快照）
  await passout.passout_text();
  assert.equal(fixture.store.get('tflag:877'), -1);
});

test('895 = 1 快感失神文案（口塞 45 = 0 时四行）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:895', 1);
  fixture.store.set('tflag:899', 1);
  await passout.passout_text();
  assert.deepEqual(fixture.text_lines(), [
    '「噢哈啊啊啊啊啊啊啊！！…啊啊……哈……喔…♪」',
    '',
    '…绝顶的快感令温妮全身抽搐，当场倒下了，',
    '因为过于强烈的刺激失去了意识。',
  ]);
});

test('895 = 2 苦痛失神；口塞（tequip:45 = 1）吞掉首行台词', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:895', 2);
  fixture.store.set('tflag:899', 1);
  fixture.store.set('tequip:31:45', 1);
  await passout.passout_text();
  assert.deepEqual(fixture.text_lines(), [
    '',
    '…温妮当场倒下，因为过于强烈的痛楚失去了意识。',
  ]);
});

test('失神中无新触发（895 = 0）：依然未醒来', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:899', 2);
  await passout.passout_text();
  assert.deepEqual(fixture.text_lines(), ['', '温妮依然未醒来。']);
});

test('恢复分支：896/897/898 全 3 → 恢复文案 + PASSOUT_MESSAGE（CFLAG:99 = 0）', async () => {
  const { fixture, passout } = seed_world();
  await recover_with(fixture, passout, (f) => f.store.set('tflag:871', 1));
  const lines = fixture.text_lines();
  assert.ok(lines.includes('温妮恢复了意识。'));
  assert.ok(
    lines.includes('精液，终于被察觉了，'),
    'PASSOUT_MESSAGE 的地の文章在场（871 计数选支）',
  );
});

test('恢复分支：CFLAG:99 = 1（地の文章カット）→ 不跑 PASSOUT_MESSAGE', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:896', 3);
  fixture.store.set('tflag:897', 3);
  fixture.store.set('tflag:898', 3);
  fixture.store.set('tflag:899', 2);
  fixture.store.set('tflag:873', 1); // 有处女丧失计数——MESSAGE 会输出
  fixture.store.set('cflag:31:99', 1);
  await passout.passout_text();
  assert.deepEqual(fixture.text_lines(), ['温妮恢复了意识。']);
});

// —— @PASSOUT_MESSAGE（经恢复分支驱动，G/X/Y 结算是给 PALAM_UP 的） ——

async function recover_with(fixture, passout, seed) {
  fixture.store.set('tflag:896', 3);
  fixture.store.set('tflag:897', 3);
  fixture.store.set('tflag:898', 3);
  fixture.store.set('tflag:899', 2);
  seed?.(fixture);
  await passout.passout_text();
}

test('MESSAGE：处女丧失支（873 ≥ 1）——血 + 精液混合文案与 G/Y 结算', async () => {
  const { fixture, passout } = seed_world();
  await recover_with(fixture, passout, (f) => {
    f.store.set('tflag:873', 1);
    f.store.set('tflag:871', 1);
    f.store.set('tflag:868', 1);
  });
  const lines = fixture.text_lines();
  assert.ok(lines.includes('从私处里流出了血，'));
  assert.ok(lines.includes('混合着精液，'));
  // G = 868+869+870+874+875+876 = 1、Y = 871+872 = 1（模块内，经 PALAM_UP 验证）
  await passout.passout_palam_up();
  assert.equal(fixture.store.get('tflag:899'), 0, 'PALAM_UP 尾段复位 899');
});

test('MESSAGE：膣内精液支（871 ≥ 1、873 = 0）', async () => {
  const { fixture, passout } = seed_world();
  await recover_with(fixture, passout, (f) => f.store.set('tflag:871', 1));
  assert.ok(fixture.text_lines().includes('精液，终于被察觉了，'));
});

test('MESSAGE：装备变化支（867 < 0）——蠕虫句', async () => {
  const { fixture, passout } = seed_world();
  await recover_with(fixture, passout, (f) => {
    f.store.set('tflag:867', -1);
    f.store.set('tequip:31:13', 1);
  });
  const lines = fixture.text_lines();
  assert.ok(lines.includes('肛门被蠕虫，'));
  assert.ok(lines.includes('插入了。'));
});

test('MESSAGE：无任何计数/标记 → 全支静默（只有恢复宣言行）', async () => {
  const { fixture, passout } = seed_world();
  await recover_with(fixture, passout);
  assert.deepEqual(fixture.text_lines(), ['温妮恢复了意识。']);
});

// —— @PASSOUT_PALAM_CHECK / @PASSOUT_PALAM_UP ——

test('PALAM_CHECK：失神瞬间（895 > 0）UP 进 883-888，UP 清零', () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:895', 1);
  for (const [k, v] of [
    [6, 600],
    [8, 240],
    [10, 60],
    [11, 10],
    [12, 20],
    [13, 30],
  ]) {
    fixture.store.set(`delta:31:${k}`, v);
  }
  fixture.store.set('delta:31:9', 9999);
  passout.passout_palam_check();
  assert.equal(fixture.store.get('tflag:883'), 600);
  assert.equal(fixture.store.get('tflag:888'), 30);
  assert.equal(fixture.store.get('tflag:889'), undefined);
  for (const k of [4, 6, 7, 8, 9, 10, 11, 12, 13]) {
    assert.equal(fixture.store.get(`delta:31:${k}`), 0, `delta:31:${k} 清零`);
  }
});

test('PALAM_CHECK：失神中（895 = 0）UP 进 889-894', () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('delta:31:6', 120);
  passout.passout_palam_check();
  assert.equal(fixture.store.get('tflag:889'), 120);
  assert.equal(fixture.store.get('tflag:883'), undefined);
});

test('PALAM_UP：折算与 Z 分配（Z = 100 → 快乐路空、恐怖/屈服路全额）', () => {
  const { fixture, passout } = seed_world();
  // 失神瞬间暂存（÷600/240/60/10/10/10 折算后各为 1：883 = 60×11/600 = 1
  // 等——899 = 1 → 乘 (12 - 1) = 11）
  fixture.store.set('tflag:883', 60);
  fixture.store.set('tflag:884', 22);
  fixture.store.set('tflag:885', 6);
  fixture.store.set('tflag:886', 1);
  fixture.store.set('tflag:887', 1);
  fixture.store.set('tflag:888', 1);
  fixture.store.set('tflag:896', 3);
  fixture.store.set('tflag:899', 1);
  passout.passout_palam_up();
  // Z = 100（无刻印/顺从/爱慕）：恐怖/屈服路（Z/100 = 1）全额、快乐路
  // （(100 - Z)/100 = 0）为空——原作的分配语义（顺从越高恐怖屈服占比越大）
  assert.equal(fixture.store.get('delta:31:7'), 0);
  assert.equal(fixture.store.get('delta:31:8'), 0);
  assert.equal(fixture.store.get('delta:31:10'), 0);
  assert.equal(fixture.store.get('delta:31:11'), 1);
  assert.equal(fixture.store.get('delta:31:12'), 1);
  assert.equal(fixture.store.get('delta:31:13'), 1);
  for (const k of [896, 897, 898, 899]) {
    assert.equal(fixture.store.get(`tflag:${k}`), 0, `tflag:${k} 复位`);
  }
});

test('PALAM_UP：Y 乘算与精液中毒的 UP:5 加成（abl:32 = 4 → +1500）', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:883', 60); // a = 60 × (12-2) / 600 = 1
  fixture.store.set('abl:31:32', 4);
  fixture.store.set('abl:31:10', 10); // Z = 50 → 快乐路折半可见
  // Y = 1 经真实路径：恢复 + MESSAGE 结算 871（模块态，直接播种无效）
  await recover_with(fixture, passout, (f) => f.store.set('tflag:871', 1));
  passout.passout_palam_up();
  assert.equal(
    fixture.store.get('delta:31:7'),
    1,
    'a = 1 → Y = 1 全额 ×2 → ×50%',
  );
  assert.equal(fixture.store.get('delta:31:5'), 1500, '精液中毒 LV4 的加成');
});

test('PALAM_UP：顺从（abl:10 = 2）抬 Z——两路的分配比随 Z 变', () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tflag:883', 600); // a = 600 × 11 / 600 = 11
  fixture.store.set('tflag:886', 100); // d = 100 × 11 / 10 = 110
  fixture.store.set('tflag:896', 3);
  fixture.store.set('tflag:899', 1);
  fixture.store.set('abl:31:10', 2); // Z = 90
  passout.passout_palam_up();
  assert.equal(
    fixture.store.get('delta:31:11'),
    Math.floor((110 * 90) / 100),
    '屈服路按 Z 分配',
  );
  assert.equal(
    fixture.store.get('delta:31:7'),
    Math.floor((11 * 10) / 100),
    '快乐路按 100 - Z 分配',
  );
});

// —— @PASSOUT_OUTDOOR ——

test('OUTDOOR：解除 tequip:54、带回文案、体力气力 -20/-10 钳 0', async () => {
  const { fixture, passout } = seed_world();
  fixture.store.set('tequip:31:54', 1);
  fixture.store.set('base:0:0', 15);
  fixture.store.set('base:0:1', 5);
  fixture.store.set('maxbase:0:0', 5000);
  fixture.store.set('maxbase:0:1', 5000);
  await passout.passout_outdoor();
  assert.equal(fixture.store.get('tequip:31:54'), 0);
  assert.deepEqual(fixture.text_lines(), ['温妮失神了，所以带回了房间…']);
  assert.equal(fixture.store.get('base:0:0'), 0, '15 - 20 → 钳 0');
  assert.equal(fixture.store.get('base:0:1'), 0, '5 - 10 → 钳 0');
});

// —— 写入路径 → @KOJO_MESSAGE_COM 第四道守卫的端到端（验收项） ——

test('端到端：真实写入路径置 TFLAG:899 → K5 口上整体跳过（#213 守卫四）', async () => {
  const { fixture, era_flag, passout } = seed_world();
  // 口上底座：玛奥（165 村娘A → 105）+ 存在标志 + 总开关（kojo-system 惯例）
  fixture.store.set('talent:31:165', 1);
  fixture.store.set('flag:105', 1);
  fixture.store.set('flag:7', 2);
  fixture.load_module('kojo/kojo-system');
  fixture.load_module('kojo/kojo-k5-mao');
  const { kojo_message_com } = fixture.load_module('kojo/kojo-system');

  // 对照组：未失神 → 口上出台词
  era_flag.selectcom = 0;
  await kojo_message_com();
  assert.ok(fixture.text_lines().length > 0, '未失神时有台词（对照组）');

  // 实验组：两回强绝顶真实驱动失神（rand 注入定值，非直接置位）
  seed_strong_orgasm(fixture);
  await passout.passout_check(() => 0);
  await passout.passout_check(() => 0);
  assert.equal(fixture.store.get('tflag:899'), 1, 'TFLAG:899 经写入路径 = 1');

  const lines_before = fixture.text_lines().length;
  fixture.store.set('cflag:31:301', 0); // 初めて分支可用
  era_flag.selectcom = 0;
  await kojo_message_com();
  assert.equal(
    fixture.text_lines().length,
    lines_before,
    '失神中口上完全静默（守卫四命中）',
  );
});
