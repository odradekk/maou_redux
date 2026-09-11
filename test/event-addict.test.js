/**
 * @file 媚药中毒关联事件的行为测试（issue #405）：
 *   @APHRODISIAC_ADDICT / @PRECIPITATE_WITHDRAWAL / @SUFFER_FROM_WITHDRAWAL。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { preset_chara_0, join_slave_chara } = require('./helpers/chara');

function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[Math.min(index, values.length - 1)];
    index += 1;
    return Math.min(value, n - 1);
  };
}

function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  join_slave_chara(fixture, 31, '琼');
  return fixture;
}

// —— @APHRODISIAC_ADDICT：每 7 日残留度衰减 + 禁断症状触发 ——

test('APHRODISIAC_ADDICT：非第 7 日不衰减残留度也不查禁断症状', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('flag:10000', 1); // day_count + 1 = 2，非 7 的倍数
  fixture.store.set('cflag:31:31', 10);
  fixture.store.set('talent:31:46', 1);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('cflag:31:31'), 10, '残留度不变');
  assert.deepEqual(fixture.text_lines(), []);
});

test('APHRODISIAC_ADDICT：第 7 日残留度 -1', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('flag:10000', 6); // +1 = 7
  fixture.store.set('cflag:31:31', 10);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('cflag:31:31'), 9);
});

test('APHRODISIAC_ADDICT：残留度衰减不下探负数', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('flag:10000', 6);
  fixture.store.set('cflag:31:31', 0);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('cflag:31:31'), 0);
});

test('APHRODISIAC_ADDICT：媚药中毒 + 本轮已发作豁免时清豁免标记、不查禁断症状', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('flag:10000', 6);
  fixture.store.set('cflag:31:31', 20);
  fixture.store.set('talent:31:46', 1);
  fixture.store.set('cflag:31:32', 1);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('cflag:31:32'), 0, '豁免标记清零');
  assert(
    !fixture.text_lines().some((l) => l.includes('身体不适应症状')),
    '不触发禁断症状检查',
  );
});

test('APHRODISIAC_ADDICT：媚药中毒 + 无豁免标记时触发禁断症状检查', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('flag:10000', 6);
  fixture.store.set('cflag:31:31', 20);
  fixture.store.set('talent:31:46', 1);
  fixture.store.set('item:26', 1); // 走喂药支线，避免深入随机结算

  fixture.set_inputs(1); // 拒绝喂药 → 落到 :106 侵攻中判定（本例非侵攻中）
  await aphrodisiac_addict(31, seq([0]));

  assert(fixture.text_lines().some((l) => l.includes('身体不适应症状')));
});

test('APHRODISIAC_ADDICT：CFLAG:1 == 9 时跳过禁断症状检查', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('flag:10000', 6);
  fixture.store.set('cflag:31:31', 20);
  fixture.store.set('talent:31:46', 1);
  fixture.store.set('cflag:31:1', 9);

  await aphrodisiac_addict(31, seq([0]));

  assert(!fixture.text_lines().some((l) => l.includes('身体不适应症状')));
});

test('APHRODISIAC_ADDICT：残留度归零时消除媚药中毒', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:46', 1);
  fixture.store.set('cflag:31:31', 0);
  fixture.store.set('talentname:46', '媚药中毒');

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:46'), 0);
  assert(fixture.text_lines().includes('琼的【媚药中毒】消除了。'));
});

test('APHRODISIAC_ADDICT：取得媚药中毒——普通门槛 12', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 12);
  fixture.store.set('talentname:46', '媚药中毒');

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:46'), 1);
  assert.equal(fixture.store.get('cflag:31:31'), 15, '初期奖励残留度垫高到 15');
});

test('APHRODISIAC_ADDICT：容易上瘾（TALENT:86）时门槛不降低（普通门槛仍需 12）', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:86', 1);
  fixture.store.set('cflag:31:31', 11);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:46'), undefined, '11 未达 12 门槛');
});

test('APHRODISIAC_ADDICT：TALENT:72 时取得媚药中毒门槛降到 9', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:72', 1);
  fixture.store.set('cflag:31:31', 9);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:46'), 1);
});

test('APHRODISIAC_ADDICT：媚药中毒残留度已 >= 15 时不再垫高', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 20);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('cflag:31:31'), 20);
});

test('APHRODISIAC_ADDICT：取得疯狂——普通门槛 40', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 40);
  fixture.store.set('talentname:123', '疯狂');

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:123'), 1);
  assert(fixture.text_lines().includes('琼获得了【疯狂】。'));
});

test('APHRODISIAC_ADDICT：TALENT:72 时取得疯狂门槛降到 30', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:72', 1);
  fixture.store.set('cflag:31:31', 30);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:123'), 1);
});

test('APHRODISIAC_ADDICT：取得废人——普通门槛 100', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 100);
  fixture.store.set('talentname:9', '崩坏');

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:9'), 1);
  assert(fixture.text_lines().includes('琼的精神变成【崩坏】了。'));
});

test('APHRODISIAC_ADDICT：TALENT:72 时取得废人门槛降到 75', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:72', 1);
  fixture.store.set('cflag:31:31', 75);

  await aphrodisiac_addict(31, seq([0]));

  assert.equal(fixture.store.get('talent:31:9'), 1);
});

test('APHRODISIAC_ADDICT：已持有对应素质时不重复取得/不重复触发消失', async () => {
  const fixture = seed_world();
  const { aphrodisiac_addict } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 200); // 同时满足全部三档门槛
  fixture.store.set('talent:31:46', 1);
  fixture.store.set('talent:31:123', 1);
  fixture.store.set('talent:31:9', 1);

  await aphrodisiac_addict(31, seq([0]));

  assert.deepEqual(
    fixture.text_lines(),
    [],
    '三项均已持有，不再重复输出取得台词',
  );
});

// —— @PRECIPITATE_WITHDRAWAL：禁断症状本体 ——

test('PRECIPITATE_WITHDRAWAL：喂媚药（非侵攻中）直接返场，残留度 +1 道具 -1', async () => {
  const fixture = seed_world();
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('item:26', 2);
  fixture.store.set('cflag:31:31', 5);
  fixture.set_inputs(0);

  const result = await precipitate_withdrawal(31, seq([0]));

  assert.equal(result, 0);
  assert.equal(fixture.store.get('cflag:31:31'), 6);
  assert.equal(fixture.store.get('item:26'), 1);
});

test('PRECIPITATE_WITHDRAWAL：喂媚药且侵攻中时直接陷落退出侵攻', async () => {
  const fixture = seed_world();
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('item:26', 1);
  fixture.store.set('cflag:31:1', 2); // 侵攻中
  fixture.store.set('cflag:31:9', 3); // 等级，决定金钱奖励
  fixture.set_inputs(0);

  await precipitate_withdrawal(31, seq([0]));

  assert.equal(fixture.store.get('cflag:31:1'), 0, '退出侵攻状态');
  assert.equal(fixture.store.get('money'), 300, '100 × 等级');
  assert.equal(fixture.store.get('ex_flag:4444'), 300);
  assert.equal(fixture.store.get('cflag:31:506'), 1);
  assert.equal(fixture.store.get('cflag:31:507'), 0);
});

test('PRECIPITATE_WITHDRAWAL：输入范围外重试后拒绝喂药，落到后续检查', async () => {
  const fixture = seed_world();
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('item:26', 1);
  fixture.store.set('cflag:31:1', 2); // 侵攻中，拒绝后走 :106 独自捱过分支
  fixture.set_inputs(9, 1);

  const result = await precipitate_withdrawal(31, seq([0]));

  assert.equal(result, 0);
  assert.equal(fixture.store.get('item:26'), 1, '未消耗道具');
  assert(fixture.text_lines().includes('数小时后琼身体的颤抖终于停了下来。'));
});

test('PRECIPITATE_WITHDRAWAL：无媚药道具时不进入喂药分支', async () => {
  const fixture = seed_world();
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:1', 2);

  await precipitate_withdrawal(31, seq([0]));

  assert(!fixture.text_lines().some((l) => l.includes('给予琼媚药吗？')));
});

test('PRECIPITATE_WITHDRAWAL：侵攻中角色（无媚药）独自捱过，体力扣 300 且下限 1', async () => {
  const fixture = seed_world();
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:1', 2);
  fixture.store.set('base:31:0', 100);

  const result = await precipitate_withdrawal(31, seq([0]));

  assert.equal(result, 0);
  assert.equal(fixture.store.get('base:31:0'), 1, '100-300 触底钳制为 1');
});

test('PRECIPITATE_WITHDRAWAL：非侵攻中、未触发禁断症状时按「平静」结算', async () => {
  const fixture = seed_world();
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 0); // V = floor(0/10)+1-0 = 1 次检查
  fixture.store.set('base:31:0', 500);

  // rand(100) 恒 >=40，1 次检查均不触发
  await precipitate_withdrawal(31, seq([99]));

  assert.equal(fixture.store.get('base:31:0'), 200, '平静：体力 -300');
  assert(fixture.text_lines().includes('护理人员也辛苦了，'));
});

test('PRECIPITATE_WITHDRAWAL：看护人（治疗/献身持有者）减少检查次数并按平静结算减耗体力', async () => {
  const fixture = seed_world();
  join_slave_chara(fixture, 32, '梅');
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 0);
  fixture.store.set('talent:32:117', 1); // 治疗
  fixture.store.set('cflag:32:1', 0); // 待机中才计入看护人数
  fixture.store.set('base:32:0', 500);

  // U=1 → V = floor(0/10)+1-1 = 0 → 钳制为 1；rand(100) 恒不触发
  await precipitate_withdrawal(31, seq([99]));

  assert.equal(
    fixture.store.get('base:32:0'),
    400,
    '看护人平静结算各消耗 100 体力',
  );
});

test('PRECIPITATE_WITHDRAWAL：触发禁断症状恶化时体力/气力上限双双下调且下限钳制', async () => {
  const fixture = seed_world();
  const { precipitate_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('cflag:31:31', 0); // V=1
  fixture.store.set('base:31:0', 500);
  fixture.store.set('base:31:1', 50);
  fixture.store.set('talentname:123', '疯狂');

  // 第 1 次 rand(100)=0 < 40 触发；suffer_from_withdrawal 内 rand(50)=49 →
  // w = 49 - 1 + 0 = 48 >= 30，无候选可选（不影响本用例只关心体力/气力结算）
  await precipitate_withdrawal(31, seq([0, 49]));

  assert.equal(fixture.store.get('maxbase:31:0'), 600, '最大体力下限钳制 600');
  assert.equal(fixture.store.get('maxbase:31:1'), 100, '最大气力下限钳制 100');
  assert.equal(fixture.store.get('base:31:0'), 1, '500-500 触底钳制为 1');
  assert(fixture.text_lines().includes('琼的体力和气力衰退了。'));
});

// —— @SUFFER_FROM_WITHDRAWAL：七级恶化梯子 ——

test('SUFFER_FROM_WITHDRAWAL：W >= 30 时无候选可选，纯占位换行', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');

  // w = rand(50) - v + u*2 = 49 - 0 + 0 = 49 >= 30
  await suffer_from_withdrawal(31, 0, 0, seq([49]));

  assert.deepEqual(fixture.text_lines(), []);
  assert.equal(fixture.store.get('talent:31:9'), undefined);
});

test('SUFFER_FROM_WITHDRAWAL：W < 5 时优先取得废人（TALENT:9 判据，TALENT:19 生效）', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');

  // w = rand(50) - v + u*2 = 0 - 0 + 0 = 0 < 5
  await suffer_from_withdrawal(31, 0, 0, seq([0]));

  assert.equal(
    fixture.store.get('talent:31:9'),
    undefined,
    '判据素质本身不被写入',
  );
  assert.equal(
    fixture.store.get('talent:31:19'),
    1,
    '生效素质是 19（原作 bug，逐字保留）',
  );
});

test('SUFFER_FROM_WITHDRAWAL：W < 5 但已是废人（TALENT:9）时改选疯狂', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:9', 1);

  await suffer_from_withdrawal(31, 0, 0, seq([0]));

  assert.equal(fixture.store.get('talent:31:123'), 1);
});

test('SUFFER_FROM_WITHDRAWAL：<10 段不含废人候选，直接从疯狂起选', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');

  // w = 6 - 0 + 0 = 6，落在 [5,10) 段
  await suffer_from_withdrawal(31, 0, 0, seq([6]));

  assert.equal(fixture.store.get('talent:31:123'), 1);
});

test('SUFFER_FROM_WITHDRAWAL：<20 段（合并原 <15/<20 两段）从抵抗起选', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');

  // w = 12 - 0 + 0 = 12，落在 [10,20) 段
  await suffer_from_withdrawal(31, 0, 0, seq([12]));

  assert.equal(fixture.store.get('talent:31:34'), 1, '抵抗');
});

test('SUFFER_FROM_WITHDRAWAL：<25 段从悲观起选', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');

  // w = 22
  await suffer_from_withdrawal(31, 0, 0, seq([22]));

  assert.equal(fixture.store.get('talent:31:26'), 1, '悲观的');
});

test('SUFFER_FROM_WITHDRAWAL：<30 段从感情淡薄起选', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');

  // w = 27
  await suffer_from_withdrawal(31, 0, 0, seq([27]));

  assert.equal(fixture.store.get('talent:31:22'), 1, '感情淡薄');
});

test('SUFFER_FROM_WITHDRAWAL：厌世候选需相性为 0 或 >50', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');
  // <10 段：疯狂已持有，落到厌世（<20 段起厌世不再是候选，故用 <10 段）
  fixture.store.set('talent:31:123', 1);
  fixture.store.set('relation:31:0', 80);

  // w = 8 - 0 + 0 = 8，落在 [5,10) 段
  await suffer_from_withdrawal(31, 0, 0, seq([8]));

  assert.equal(fixture.store.get('relation:31:0'), 30, '80-50 结果不低于 30');
  assert.equal(fixture.store.get('cflag:31:2'), -200);
});

test('SUFFER_FROM_WITHDRAWAL：厌世相性从 0 起改为 50', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:123', 1);

  await suffer_from_withdrawal(31, 0, 0, seq([8]));

  assert.equal(fixture.store.get('relation:31:0'), 50);
});

test('SUFFER_FROM_WITHDRAWAL：相性介于 (0,50] 时厌世不可选，落到兜底失宠', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');
  fixture.store.set('talent:31:123', 1); // <10 段：疯狂已持有
  fixture.store.set('relation:31:0', 30); // 0 < 30 <= 50，厌世条件不满足
  fixture.store.set('talent:31:34', 1); // 抵抗也堵死，逼到兜底
  fixture.store.set('talent:31:26', 1); // 悲观
  fixture.store.set('talent:31:22', 1); // 感情淡薄

  await suffer_from_withdrawal(31, 0, 0, seq([8]));

  assert.equal(fixture.store.get('relation:31:0'), 30, '兜底失宠不改动相性');
  assert.equal(fixture.store.get('cflag:31:2'), -200);
});

test('SUFFER_FROM_WITHDRAWAL：同段全部候选都已持有时落到失宠兜底', async () => {
  const fixture = seed_world();
  const { suffer_from_withdrawal } = fixture.load_module('event/event-addict');
  // <5 段：wreck/crazy/misanthropist/resister/depression/athymia 全部堵死
  fixture.store.set('talent:31:9', 1);
  fixture.store.set('talent:31:123', 1);
  fixture.store.set('relation:31:0', 30); // misanthropist 不可选
  fixture.store.set('talent:31:34', 1);
  fixture.store.set('talent:31:26', 1);
  fixture.store.set('talent:31:22', 1);
  fixture.store.set('cflag:31:2', 1000);

  await suffer_from_withdrawal(31, 0, 0, seq([0]));

  assert.equal(fixture.store.get('cflag:31:2'), 800, '兜底失宠：好感度 -200');
});
