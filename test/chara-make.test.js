/**
 * ere/chara/chara-make.js @CHARA_MAKE + 14 个 @CM_* 段与转发层
 * ere/chara/char-make.js 的行为测试（issue #170，阶段 3 H1）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源经
 * chara_make / 各 cm_* 的 rand 参数注入（chara-init.js 先例）：
 *   - never = () => 1（RAND:N == 1，对 `== 0` 判定恒不中）
 *   - always = () => 0（恒中）
 *
 * 验收清单第 3 条：三分叉每一支都有测试（普通勇者走 CM_STP 得
 * CFLAG:1 == 2、精英部下与后代得 CFLAG:1 == 0）——本文件的头部用例组。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-make');
}

function load_forward(fixture) {
  return fixture.load_module('chara/char-make');
}

/** RAND:N == 1（恒不中 == 0 判定；对 truthy 判定恒真） */
const never = () => 1;
/** RAND:N == 0（恒中） */
const always = () => 0;

/**
 * 按掷骰位次注入：第 position 次（0 基）且分母为 n 的掷骰返回 hit，其余
 * 返回 1（不中）。用于精确命中 never 掷骰序里的某一掷（序为实测打印）。
 */
function position_roll(position, n, hit) {
  let i = 0;
  return (denom) => {
    const at = i === position && denom === n;
    i += 1;
    return at ? hit : 1;
  };
}

function stub_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// —— 三分叉（验收清单第 3 条：接入点能否触发的唯一判据）——

test('三分叉·普通勇者：CM_STP 落 CFLAG:1 = 2、501 = 1、502 = 0、508 = 3', async () => {
  const fixture = create_era_fixture();
  const { chara_make } = load(fixture);
  // 无精英（talent:220）、无 EX_TALENT:1/2 → 第一支
  const result = await chara_make(1, 0, 0, never);
  assert.equal(result, 1, 'RETURN ARG（角色号）');
  assert.equal(fixture.store.get('cflag:1:1'), 2, 'CFLAG:A:1 = 2 侵攻中');
  assert.equal(fixture.store.get('cflag:1:501'), 1, 'CFLAG:A:501 侵入阶层');
  assert.equal(fixture.store.get('cflag:1:502'), 0, 'CFLAG:A:502 侵攻度');
  assert.equal(fixture.store.get('cflag:1:508'), 3, 'CFLAG:A:508 再起点');
});

test('三分叉·普通勇者主流程：初值四项与可见占位', async () => {
  const fixture = create_era_fixture();
  const { chara_make } = load(fixture);
  await chara_make(1, 0, 0, never);
  // :23-30 等级/经验/家族/卖春积极性
  assert.equal(fixture.store.get('cflag:1:9'), 1, 'CFLAG:A:9 等级 = 1');
  assert.equal(fixture.store.get('exp:1:80'), 0, 'EXP:A:80 战斗经验 = 0');
  assert.equal(fixture.store.get('cflag:1:605'), 0, 'CFLAG:A:605 家族 = 0');
  assert.equal(fixture.store.get('cflag:1:120'), 1, 'CFLAG:A:120 卖春积极性');
  // 兜底职业四维（无职业 talent）
  assert.equal(fixture.store.get('cflag:1:11'), 15);
  assert.equal(fixture.store.get('cflag:1:14'), 15);
  // 口上性格（NO 1 ∈ [1,16]）：never 注入 X = 161 自信家
  assert.equal(fixture.store.get('talent:1:161'), 1, 'TALENT:161 自信家');
  // 新手烙印（DAY:0 = 0 <= 60）
  assert.equal(fixture.store.get('talent:1:291'), 1, 'TALENT:291 新手烙印');
  // 一人称（RANDOM_SELF_CALL 的 <9 直设）
  assert.equal(fixture.store.get('cstr:1:60'), '我', 'CSTR:60 一人称');
  assert.equal(fixture.store.get('cflag:1:450'), 9, 'CFLAG:450 一人称档位');
  // 占位可见性：五处跨文件/跨段存根在、三处条件不达的存根不在
  const texts = stub_texts(fixture);
  for (const name of [
    'CHARA_NAME_RANDOM_DEFINE',
    'CMI_CONFLICT_CHECK',
    'LOOK_SET',
    'CHARA_FIRST_EXP',
    'SEARCH_FAMILY',
    'WEARING_CLOTH_ABLE',
  ]) {
    assert(
      texts.some((line) => line.includes(`@${name}`)),
      `${name} 的占位行可见（登记项）`,
    );
  }
  for (const name of [
    'FAMILY_REGISTER',
    'CHAR_BODY_GENERATE_WAPPED',
    'ST_UP',
  ]) {
    assert(
      !texts.some((line) => line.includes(`@${name}`)),
      `${name} 不触发（条件不达）`,
    );
  }
});

test('三分叉·精英部下：CFLAG:1 = 0，走 CM_ST_ACE（无职业四维外的 BASE 写入）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('maxbase:7:0', 500);
  fixture.store.set('maxbase:7:1', 300);
  fixture.store.set('talent:7:220', 1); // TALENT:精英
  const { chara_make } = load(fixture);
  await chara_make(7, 0, 0, never);
  assert.equal(fixture.store.get('cflag:7:1'), 0, 'CFLAG:A:1 = 0（精英部下）');
  assert.equal(
    fixture.store.get('talent:7:254'),
    1,
    '精英持魔之刻印（CM_BASE :209）',
  );
  // CM_ST_ACE：魔王等级（cflag:0:9）缺省 0 不 > 2 → 不掷 ST_UP、不写 BASE；
  // 与 CM_ST 的差异正在此（CM_ST 无条件写 BASE = MAXBASE）
  assert.equal(fixture.store.get('base:7:0'), undefined, 'BASE 未被 CM_ST 写');
  assert(
    !stub_texts(fixture).some((line) => line.includes('@ST_UP')),
    '魔王等级 <= 2：精英初始等级段不进',
  );
});

test('三分叉·后代（EX_TALENT:2）：CFLAG:1 = 0、阴毛状态 = 2、跳过性别与性交经验', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('ex_talent:9:2', 1); // 后代
  const { chara_make } = load(fixture);
  await chara_make(9, 0, 0, always);
  assert.equal(fixture.store.get('cflag:9:1'), 0, 'CFLAG:A:1 = 0');
  assert.equal(fixture.store.get('talent:9:310'), 2, '阴毛状态 = 2（:80）');
  // :15 后代不掷性别（always 下若掷必得扶她 121）
  assert.equal(
    fixture.store.get('talent:9:121'),
    undefined,
    '后代跳过 CM_GENDER',
  );
  // 后代是处女（CM_VIRGIN :309）但跳过 CM_NS_EXP（:89-90）→ exp:60 不写
  assert.equal(fixture.store.get('talent:9:0'), 1, '后代处女');
  assert.equal(
    fixture.store.get('exp:9:60'),
    undefined,
    '后代跳过 CM_NS_EXP（出産経験不写）',
  );
  // :101 家族登记只对非后代（always 下 RAND:4 == 0 恒真，仍不进）
  assert(
    !stub_texts(fixture).some((line) => line.includes('@FAMILY_REGISTER')),
    '后代不设定家族',
  );
  assert.equal(fixture.store.get('cflag:9:16'), -1, '后代初吻未定（:310）');
});

test('EX_TALENT:1（无精英）：同样落第二支（精英部下路径）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('ex_talent:8:1', 1); // EX_TALENT:A:1
  const { chara_make } = load(fixture);
  await chara_make(8, 0, 0, never);
  assert.equal(fixture.store.get('cflag:8:1'), 0, 'CFLAG:A:1 = 0（第二支）');
  assert.equal(
    fixture.store.get('cflag:8:501'),
    undefined,
    '不走 CM_STP（无侵攻四项）',
  );
});

// —— @CM_STP 直调（:124-130 的七行）——

test('cm_stp 直调：四项一次落齐', () => {
  const fixture = create_era_fixture();
  const { cm_stp } = load(fixture);
  cm_stp(5);
  assert.equal(fixture.store.get('cflag:5:1'), 2);
  assert.equal(fixture.store.get('cflag:5:501'), 1);
  assert.equal(fixture.store.get('cflag:5:502'), 0);
  assert.equal(fixture.store.get('cflag:5:508'), 3);
});

// —— 新手烙印的边界（:63-65）——

test('新手烙印：DAY > 60 不盖', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10000', 100); // DAY:0 天数
  const { chara_make } = load(fixture);
  await chara_make(1, 0, 0, never);
  assert.equal(
    fixture.store.get('talent:1:291'),
    undefined,
    'DAY:0 = 100 > 60：不盖新手烙印',
  );
});

// —— 身体数据段（:114-117）与家族登记（:100-102）——

test('FLAG:5 位 12 开：CHAR_BODY_GENERATE_WAPPED 占位可见', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', 4096); // GETBIT(FLAG:5,12)
  const { chara_make } = load(fixture);
  await chara_make(1, 0, 0, never);
  assert(
    stub_texts(fixture).some((line) =>
      line.includes('@CHAR_BODY_GENERATE_WAPPED'),
    ),
    '身体数据生成的占位行可见（登记项）',
  );
});

test('RAND:4 == 0 且非后代：FAMILY_REGISTER 占位可见', async () => {
  const fixture = create_era_fixture();
  const { chara_make } = load(fixture);
  await chara_make(1, 0, 0, always);
  assert(
    stub_texts(fixture).some((line) => line.includes('@FAMILY_REGISTER')),
    '家族登记的占位行可见（登记项）',
  );
});

test('口上性格段：NO ∈ [1,16] 与 [200,211] 触发，区间外不触发', async () => {
  const fixture = create_era_fixture();
  const { chara_make } = load(fixture);
  await chara_make(17, 0, 0, never); // NO 17 区间外
  assert.equal(
    fixture.store.get('talent:17:161'),
    undefined,
    'NO 17 不在口上性格段',
  );
  const fixture2 = create_era_fixture();
  const { chara_make: make2 } = load(fixture2);
  await make2(205, 0, 0, never); // NO 205 ∈ [200,211]（精英段）
  assert.equal(
    fixture2.store.get('talent:205:161'),
    1,
    'NO 205 暂用勇者口上（:57-59）',
  );
});

// —— @CM_BASE（:132-214）——

test('cm_base 职业：战士四维 20 + 鼓舞；魔法师四维 15 无鼓舞', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:200', 1); // 战士
  const { cm_base } = load(fixture);
  await cm_base(3);
  assert.equal(fixture.store.get('cflag:3:11'), 20, '攻击力 20');
  assert.equal(fixture.store.get('cflag:3:12'), 20, '防御力 20');
  assert.equal(fixture.store.get('cflag:3:13'), 20, '基础攻击 20');
  assert.equal(fixture.store.get('cflag:3:14'), 20, '基础防御 20');
  assert.equal(fixture.store.get('talent:3:118'), 1, '鼓舞（:178）');

  const fixture2 = create_era_fixture();
  fixture2.store.set('talent:4:201', 1); // 魔法师
  const { cm_base: base2 } = load(fixture2);
  await base2(4);
  assert.equal(fixture2.store.get('cflag:4:11'), 15, '攻击力 15');
  assert.equal(fixture2.store.get('talent:4:118'), undefined, '无鼓舞');
});

test('cm_base 神官&巫女：治愈 + 信仰值 20（:173-176）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:206', 1); // 巫女
  const { cm_base } = load(fixture);
  await cm_base(3);
  assert.equal(fixture.store.get('talent:3:117'), 1, '治愈');
  assert.equal(fixture.store.get('cflag:3:152'), 20, '信仰值');
});

test('cm_base 怪物种族修正：史莱姆防御系 +5、妖精全维 -4（:187-203）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:319', 2); // 种族2 = 史莱姆（兜底职业 15）
  const { cm_base } = load(fixture);
  await cm_base(3);
  assert.equal(fixture.store.get('cflag:3:11'), 15, '攻击力不动');
  assert.equal(fixture.store.get('cflag:3:12'), 20, '防御力 +5');
  assert.equal(fixture.store.get('cflag:3:13'), 15, '基础攻击不动');
  assert.equal(fixture.store.get('cflag:3:14'), 20, '基础防御 +5');

  const fixture2 = create_era_fixture();
  fixture2.store.set('talent:4:319', 6); // 妖精
  const { cm_base: base2 } = load(fixture2);
  await base2(4);
  assert.equal(fixture2.store.get('cflag:4:11'), 11, '攻击力 -4');
  assert.equal(fixture2.store.get('cflag:4:14'), 11, '基础防御 -4');
});

// —— @CM_KJ（:216-251）——

test('cm_kj 直设：160 落位、160-179 先清零（:225）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:1:165', 1); // 预置的独特性格应被 VARSET 清掉
  const { cm_kj } = load(fixture);
  await cm_kj(1, 163, never);
  assert.equal(fixture.store.get('talent:1:163'), 1, '直设高贵');
  assert.equal(fixture.store.get('talent:1:165'), 0, '165 被 VARSET 清 0');
});

test('cm_kj 随机修正：男人高贵 → 贵公子（:239）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:1:122', 1); // 男人
  const { cm_kj } = load(fixture);
  await cm_kj(1, 0, (n) => (n === 11 ? 3 : 0)); // X = 163
  assert.equal(fixture.store.get('talent:1:174'), 1, '男 163 → 174 贵公子');
});

test('cm_kj 随机修正：女性 169 → 174 回高贵（:243-249）；男人 169 保持 174', async () => {
  const fixture = create_era_fixture();
  const { cm_kj } = load(fixture);
  await cm_kj(1, 0, (n) => (n === 11 ? 9 : 0)); // X = 169 → +5 = 174 → 女 → 163
  assert.equal(fixture.store.get('talent:1:163'), 1, '女 174 → 163 高贵');

  const fixture2 = create_era_fixture();
  fixture2.store.set('talent:2:122', 1);
  const { cm_kj: kj2 } = load(fixture2);
  await kj2(2, 0, (n) => (n === 11 ? 9 : 0));
  assert.equal(fixture2.store.get('talent:2:174'), 1, '男 174 保持贵公子');
});

test('cm_kj 随机修正：黑桃 170 → 175（:241）、红心 167 → 172（:243）', async () => {
  const fixture = create_era_fixture();
  const { cm_kj } = load(fixture);
  await cm_kj(1, 0, (n) => (n === 11 ? 10 : 0)); // X = 170
  assert.equal(fixture.store.get('talent:1:175'), 1, '170 → 175');
  const fixture2 = create_era_fixture();
  const { cm_kj: kj2 } = load(fixture2);
  await kj2(2, 0, (n) => (n === 11 ? 7 : 0)); // X = 167 → 172
  assert.equal(fixture2.store.get('talent:2:172'), 1, '167 → 172');
});

test('cm_kj 随机排除：独特性格 165 与男人恶女 166 重掷（:233/:236）', async () => {
  const fixture = create_era_fixture();
  let calls = 0;
  const { cm_kj } = load(fixture);
  await cm_kj(1, 0, (n) => {
    if (n !== 11) {
      return 0;
    }
    calls += 1;
    return calls === 1 ? 5 : 1; // 首掷 165 → 重掷 161
  });
  assert.equal(fixture.store.get('talent:1:161'), 1, '重掷后落 161');
  assert.equal(calls, 2, '掷了两次');

  const fixture2 = create_era_fixture();
  fixture2.store.set('talent:2:122', 1); // 男人
  let calls2 = 0;
  const { cm_kj: kj2 } = load(fixture2);
  await kj2(2, 0, (n) => {
    if (n !== 11) {
      return 0;
    }
    calls2 += 1;
    return calls2 === 1 ? 6 : 1; // 首掷 166（男人恶女）→ 重掷 161
  });
  assert.equal(fixture2.store.get('talent:2:161'), 1, '男人恶女被重掷');
});

// —— @CM_GENDER（:255-294，SELECTCASE 冒險者性別恒 0）——

test('cm_gender CASE 0：2% 扶他、无男性分支', async () => {
  const fixture = create_era_fixture();
  const { cm_gender } = load(fixture);
  await cm_gender(1, always); // RAND:50 == 0 → 扶她
  assert.equal(fixture.store.get('talent:1:121'), 1, '扶她');
  assert.equal(fixture.store.get('talent:1:122'), undefined, 'CASE 0 无男性');

  const fixture2 = create_era_fixture();
  const { cm_gender: gender2 } = load(fixture2);
  await gender2(2, never); // RAND:50 = 1 → 什么都不设
  assert.equal(fixture2.store.get('talent:2:121'), undefined, '未掷中扶他');
  assert.equal(fixture2.store.get('talent:2:122'), undefined, '保持女性');
});

// —— @CM_VIRGIN（:295-347）——

test('cm_virgin 男人：童贞支（RAND:3 truthy）初体验/初吻 -1（:300-307）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:122', 1);
  const { cm_virgin } = load(fixture);
  await cm_virgin(3, never); // rand(3) = 1 truthy → 童贞支
  assert.equal(fixture.store.get('talent:3:0'), 0, '男人非处女');
  assert.equal(fixture.store.get('talent:3:1'), 1, '童贞');
  assert.equal(fixture.store.get('cflag:3:15'), -1, '初体验对象 -1');
  assert.equal(fixture.store.get('cflag:3:16'), -1, '初吻对象 -1');
});

test('cm_virgin 男人：非童贞支初体验/初吻 0（:304-306）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:122', 1);
  const { cm_virgin } = load(fixture);
  // rand(3) = 0（else 支）；rand(5)/rand(12) 给 1 不触发封印/人妻
  await cm_virgin(3, (n) => (n === 3 ? 0 : 1));
  assert.equal(fixture.store.get('talent:3:1'), undefined, '非童贞');
  assert.equal(fixture.store.get('cflag:3:15'), 0, '初体验对象 0');
  assert.equal(fixture.store.get('cflag:3:16'), 0, '初吻对象 0');
});

test('cm_virgin 女性：处女 + 随机贞操封印（:331-341）', async () => {
  const fixture = create_era_fixture();
  const { cm_virgin } = load(fixture);
  // rand(8) = 1 truthy → 处女支；rand(5) = 0 → 贞操封印；rand(12) = 1
  await cm_virgin(3, (n) => (n === 5 ? 0 : 1));
  assert.equal(fixture.store.get('talent:3:0'), 1, '处女');
  assert.equal(fixture.store.get('cflag:3:16'), -1, '初吻未定');
  assert.equal(fixture.store.get('talent:3:273'), 1, '贞操封印');
});

test('cm_virgin 人妻：处女消去（:344-347）', async () => {
  const fixture = create_era_fixture();
  const { cm_virgin } = load(fixture);
  // rand(8) = 1 → 处女支；rand(5) = 1；rand(12) = 0 → 人妻
  await cm_virgin(3, (n) => (n === 12 ? 0 : 1));
  assert.equal(fixture.store.get('talent:3:157'), 1, '人妻');
  assert.equal(fixture.store.get('talent:3:0'), 0, '人妻非处女');
});

test('cm_virgin 扶她：处女童贞齐备则初体验 -1（:311-327）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:121', 1); // 扶她
  const { cm_virgin } = load(fixture);
  // rand(8) = 1 → 处女；rand(3) = 1 > 0 → 童贞 + 初吻 -1；rand(5)/rand(12) = 1
  await cm_virgin(3, never);
  assert.equal(fixture.store.get('talent:3:0'), 1, '扶她处女');
  assert.equal(fixture.store.get('talent:3:1'), 1, '扶她童贞');
  assert.equal(fixture.store.get('cflag:3:15'), -1, '初体验 -1（:324）');
});

// —— @CM_TALENT（:349-729，抽样各型分支）——

test('cm_talent 反抗心支：X == 0 → talent:11 + 傲娇连掷（:369-373）', async () => {
  const fixture = create_era_fixture();
  let idx = 0;
  const seq = [
    2, // :353 X = RAND:3（性格联动块不中）
    0, // :368 X = RAND:12 == 0 → 反抗心
    0, // :372 RAND:8 == 0 → 傲娇
  ];
  const { cm_talent } = load(fixture);
  await cm_talent(3, (n) => seq[Math.min(idx++, seq.length - 1)] % n);
  assert.equal(fixture.store.get('talent:3:11'), 1, '反抗心（event 门面）');
  assert.equal(fixture.store.get('talent:3:18'), 1, '偶发傲娇');
});

test('cm_talent 跨域下标走门面：冷漠/感情淡薄/克制/悲观的（event 域）', async () => {
  const fixture = create_era_fixture();
  let idx = 0;
  const seq = [
    2, // :353 RAND:3
    5, // :368 RAND:12
    5, // :384 RAND:12
    0, // :398 RAND:16 == 0 → 冷漠 21
  ];
  const { cm_talent } = load(fixture);
  await cm_talent(3, (n) => seq[Math.min(idx++, seq.length - 1)] % n);
  assert.equal(fixture.store.get('talent:3:21'), 1, '冷漠');
});

test('cm_talent 抖S/抖M 气质（ABL:20/21 = 3，:556-561）', async () => {
  const fixture = create_era_fixture();
  let idx = 0;
  const seq = [2, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0];
  const { cm_talent } = load(fixture);
  await cm_talent(3, (n) => seq[Math.min(idx++, seq.length - 1)] % n);
  assert.equal(fixture.store.get('abl:3:20'), 3, '抖S气质（train 门面）');
});

test('cm_talent 巨人九成魁梧（种族2 = 7，:582-587）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:319', 7); // 巨人
  let idx = 0;
  const seq = [2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2]; // 最后一次 RAND:12 = 2（<= 8）
  const { cm_talent } = load(fixture);
  await cm_talent(3, (n) => seq[Math.min(idx++, seq.length - 1)] % n);
  assert.equal(fixture.store.get('talent:3:99'), 1, '魁梧');
});

test('cm_talent 胸围先掷先得：RAND:50 == 0 → 超乳（:637-639）', async () => {
  const fixture = create_era_fixture();
  // never 下的掷骰序（52 掷）：胸围四连在 0 基第 35-39 位（50/25/24/8/7）。
  // 在第 35 位（RAND:50）给 0、其余给 1 → 超乳命中（女性臂 t(122) == 0）
  const { cm_talent } = load(fixture);
  await cm_talent(3, never);
  await cm_talent(4, position_roll(35, 50, 0));
  assert.equal(fixture.store.get('talent:4:119'), 1, '超乳（女限定臂命中）');
  assert.equal(fixture.store.get('talent:4:114'), undefined, '先掷先得');
});

test('cm_talent 未熟偶发幼稚（:673-679，train 门面）', async () => {
  const fixture = create_era_fixture();
  // never 掷骰序里 :673 的 RAND:12 在 0 基第 44 位（其后是情结四连与
  // 洗脑/担保人，位次 45-50）
  const { cm_talent } = load(fixture);
  await cm_talent(3, position_roll(44, 12, 0));
  assert.equal(fixture.store.get('talent:3:135'), 1, '未熟（train 门面）');
  assert.equal(fixture.store.get('talent:3:132'), undefined, '幼稚未连中');
});

// —— @CM_KIND（:731-738）——

test('cm_kind：普通 RAND:200、精英 RAND:100', async () => {
  const fixture = create_era_fixture();
  const { cm_kind } = load(fixture);
  await cm_kind(3, () => 77);
  assert.equal(fixture.store.get('cflag:3:151'), 77, 'RAND:200 落值');

  const fixture2 = create_era_fixture();
  fixture2.store.set('talent:4:220', 1); // 精英
  const { cm_kind: kind2 } = load(fixture2);
  await kind2(4, () => 55);
  assert.equal(fixture2.store.get('cflag:4:151'), 55, '精英 RAND:100 落值');
});

// —— @CM_SKILL（:740-858，抽样）——

test('cm_skill：魔物使必得使役（:743）与妖精的魔法耐性（:822-823）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:212', 1); // 魔物使
  const { cm_skill } = load(fixture);
  await cm_skill(3, never);
  assert.equal(fixture.store.get('talent:3:265'), 1, '使役');

  const fixture2 = create_era_fixture();
  fixture2.store.set('talent:4:319', 6); // 妖精，never 下四术全不学
  const { cm_skill: skill2 } = load(fixture2);
  await skill2(4, never);
  assert.equal(fixture2.store.get('talent:4:257'), 1, '妖精无术得魔法耐性');
});

test('cm_skill：额头天眼的暗之能力者第二机会（:855-856）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:260', 1); // 额头天眼
  const { cm_skill } = load(fixture);
  // :855 的 RAND:40 命中：数掷序定位
  const rolls = [];
  await cm_skill(9, (n) => {
    rolls.push(n);
    return 1;
  });
  const positions = [];
  rolls.forEach((n, i) => {
    if (n === 40) {
      positions.push(i);
    }
  });
  // 最后一个 RAND:40 是 :855（其前 13 个 40 是五连能力者 + 各术）
  const last = positions[positions.length - 1];
  let i = 0;
  await cm_skill(3, (n) => {
    const hit = i === last && n === 40;
    i += 1;
    return hit ? 0 : 1;
  });
  assert.equal(fixture.store.get('talent:3:279'), 1, '暗之能力者（第二机会）');
});

// —— @CM_LOOK（:860-872）——

test('cm_look：LOOK_SET 占位 + 白虎 5%（:868-872）', async () => {
  const fixture = create_era_fixture();
  const { cm_look } = load(fixture);
  await cm_look(3, 0, never);
  assert(
    stub_texts(fixture).some((line) => line.includes('@LOOK_SET')),
    '外貌设定占位可见（登记项）',
  );
  assert.equal(fixture.store.get('talent:3:125'), undefined, '白虎未掷中');

  const fixture2 = create_era_fixture();
  const { cm_look: look2 } = load(fixture2);
  await look2(4, 0, always); // RAND:20 == 0 → 白虎
  assert.equal(
    fixture2.store.get('talent:4:125'),
    1,
    '白虎（stronghold 门面）',
  );
  assert.equal(fixture2.store.get('talent:4:310'), 1, '阴毛状态 1');
  assert.equal(fixture2.store.get('talent:4:311'), 1, '阴毛生长极限 1');
});

// —— @CM_ST / @CM_ST_ACE（:875-894）——

test('cm_st：FLAG:60 = 0 不掷 ST_UP；体力气力回满（:877-883）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('maxbase:3:0', 500);
  fixture.store.set('maxbase:3:1', 300);
  const { cm_st } = load(fixture);
  await cm_st(3);
  assert.equal(fixture.store.get('base:3:0'), 500, 'BASE = MAXBASE');
  assert.equal(fixture.store.get('base:3:1'), 300, 'BASE = MAXBASE');
  assert(
    !stub_texts(fixture).some((line) => line.includes('@ST_UP')),
    'FLAG:60 = 0：不逐级',
  );
});

test('cm_st：FLAG:60 = 2 且非派遣 → 两行 ST_UP 占位', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:60', 2);
  const { cm_st } = load(fixture);
  await cm_st(3);
  const count = stub_texts(fixture).filter((line) =>
    line.includes('@ST_UP'),
  ).length;
  assert.equal(count, 2, 'REPEAT FLAG:60 次占位');
});

test('cm_st_ace：魔王等级 <= 2 不掷；> 2 按六成（±两成）逐级', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:60', 1);
  fixture.store.set('cflag:0:9', 2); // 魔王等级 2（不 > 2）
  const { cm_st_ace } = load(fixture);
  await cm_st_ace(3, never);
  assert(
    !stub_texts(fixture).some((line) => line.includes('@ST_UP')),
    '魔王等级 2 不 > 2：不逐级',
  );

  const fixture2 = create_era_fixture();
  fixture2.store.set('flag:60', 1);
  fixture2.store.set('cflag:0:9', 10);
  const { cm_st_ace: ace2 } = load(fixture2);
  await ace2(4, never); // rand(10) = 1 → (10*6 + 1*2) / 10 = 6 次
  const count = stub_texts(fixture2).filter((line) =>
    line.includes('@ST_UP'),
  ).length;
  assert.equal(count, 6, '(60 + 2) / 10 = 6 次逐级');
});

// —— @CM_FAMILY_TALENT（:896-1042，存根下不可达的结构锁）——

test('cm_family_talent：SEARCH_FAMILY 存根 RESULT 0 → 继承块不进', async () => {
  const fixture = create_era_fixture();
  const { cm_family_talent } = load(fixture);
  await cm_family_talent(3, always);
  assert(
    stub_texts(fixture).some((line) => line.includes('@SEARCH_FAMILY')),
    '家族检索的占位行可见（登记项）',
  );
  // 块不进：RAND:5 != 0 才落发色，always（== 0）下若块可达会写 talent:300
  assert.equal(
    fixture.store.get('talent:3:300'),
    undefined,
    'FAMILY_ID = 0：继承块整体不进（1:1 保留待家族票）',
  );
});

// —— @CM_NS_EXP（:1045-1119）——

test('cm_ns_exp 出産経験：人妻编码路径（:1053-1054）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:157', 1); // 人妻
  const { cm_ns_exp } = load(fixture);
  // local = 320 % 10 = 0；人妻 && rand(2) == 0 → p = rand(3)
  await cm_ns_exp(3, (n) => (n === 2 ? 0 : 2));
  assert.equal(fixture.store.get('exp:3:60'), 2, '出産経験 = RAND:3 落 2');
});

test('cm_ns_exp 儿女编码路径（:1057-1061）：二女一儿 → p = 2 + 1', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:320', 1200); // %1000/100 = 2 女；%10000/1000 = 1 儿
  const { cm_ns_exp } = load(fixture);
  // rand(2) = 1（不走人妻臂）；后续 rand 全 1
  await cm_ns_exp(3, never);
  assert.equal(fixture.store.get('exp:3:60'), 3, 'p = 2 + 1');
});

test('cm_ns_exp 非处女：私处/性交经验按 P（:1067-1069）', async () => {
  const fixture = create_era_fixture();
  const { cm_ns_exp } = load(fixture);
  // local = 0 → else 臂 p = 0；t(0) = 0（非处女）→ rand(8) + 1 + 0
  await cm_ns_exp(3, never);
  assert.equal(fixture.store.get('exp:3:0'), 2, '私处经验 = 1 + 1');
  assert.equal(fixture.store.get('exp:3:5'), 2, '性交经验 = EXP:0');
});

test('cm_ns_exp 使役怪物初始设定：超强调役 191（:1106-1118）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:265', 1); // 使役
  const { cm_ns_exp } = load(fixture);
  await cm_ns_exp(3, always); // for 立即 break（x=0）；rand(50) == 0 → 191
  assert.equal(
    fixture.store.get('cflag:3:570'),
    191,
    '超强调役（system 门面）',
  );
});

test('cm_ns_exp 使役怪物：x 跑满 9 钳 8 → 181', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:265', 1);
  const { cm_ns_exp } = load(fixture);
  await cm_ns_exp(3, never); // for 不 break（x=9→8）；100 + 1 = 181（RAND:50 不中）
  assert.equal(fixture.store.get('cflag:3:570'), 181);
});

// —— @CM_CLOTH（:1122-1380，抽样）——

test('cm_cloth 男战士：锁子甲 + 剑 + 接頭語（:1126-1131、:1362）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:200', 1);
  fixture.store.set('talent:3:122', 1); // 男人
  const { cm_cloth } = load(fixture);
  const result = await cm_cloth(3, never); // RAND:10 = 1 → 接頭語 100000
  assert.equal(result, 0, 'RETURN 0');
  assert.equal(fixture.store.get('cflag:3:41'), 3, 'R = 3 锁子甲');
  assert.equal(fixture.store.get('cflag:3:550'), 100040, '剑 40 + 接頭語');
  assert.equal(fixture.store.get('cflag:3:45'), 0, '上衣上状态清 0');
  assert.equal(fixture.store.get('cflag:3:46'), 0, '上衣下状态清 0');
  assert(
    stub_texts(fixture).some((line) => line.includes('@WEARING_CLOTH_ABLE')),
    '初始着装占位可见（登记项）',
  );
});

test('cm_cloth 女战士中华风：生成名高且 RAND:3 == 0 → 旗袍 + 月牙刃（:1137-1146）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:200', 1);
  fixture.store.set('cflag:3:6', 5000); // >= 4500
  const { cm_cloth } = load(fixture);
  await cm_cloth(3, never); // RAND:3 = 1 ≠ 0？——never 给 1，不进中华风
  assert.equal(fixture.store.get('cflag:3:41'), 193, '常规战士装兜底 193');

  const fixture2 = create_era_fixture();
  fixture2.store.set('talent:4:200', 1);
  fixture2.store.set('cflag:4:6', 5000);
  const { cm_cloth: cloth2 } = load(fixture2);
  // RAND:3 == 0 进中华风；RAND:2 = 1 ≠ 0 → 指虎 52；RAND:10 = 1 → 接頭語
  await cloth2(4, (n) => (n === 3 ? 0 : 1));
  assert.equal(fixture2.store.get('cflag:4:41'), 214, '旗袍');
  assert.equal(fixture2.store.get('cflag:4:550'), 100052, '指虎 52 + 接頭語');
});

test('cm_cloth 史莱姆全裸 + 鞭（:1269-1273）与兜底 R = 1（:1354-1357）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:319', 2); // 史莱姆
  const { cm_cloth } = load(fixture);
  await cm_cloth(3, never);
  assert.equal(fixture.store.get('cflag:3:41'), 0, '全裸');
  assert.equal(fixture.store.get('cflag:3:550'), 100042, '鞭 42 + 接頭語');

  const fixture2 = create_era_fixture();
  const { cm_cloth: cloth2 } = load(fixture2);
  await cloth2(4, never);
  assert.equal(fixture2.store.get('cflag:4:41'), 1, '兜底 R = 1');
});

test('cm_cloth 眼镜素质配眼镜饰品（:1373-1374）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:48', 1); // 眼镜
  const { cm_cloth } = load(fixture);
  await cm_cloth(3, never);
  assert.equal(fixture.store.get('cflag:3:42'), 83, '眼镜饰品');
});

// —— 转发层 ere/chara/char-make.js（验收第 2 条：不折叠）——

test('转发层 @CHAR_MAKE：参数与返回值原样转发到 @CHARA_MAKE（不折叠）', async () => {
  const fixture = create_era_fixture();
  const real = fixture.load_module('chara/chara-make');
  const seen = [];
  const original = real.chara_make;
  real.chara_make = async (cid, arg0, arg1, rand) => {
    seen.push([cid, arg0, arg1, typeof rand]);
    return 99;
  };
  try {
    const forward = load_forward(fixture);
    const result = await forward.char_make(5, 160, 12, never);
    assert.deepEqual(
      seen,
      [[5, 160, 12, 'function']],
      'JUMP CHARA_MAKE(A, ARG:0, ARG:1) 的实参形态',
    );
    assert.equal(result, 99, 'JUMP 的执行流透传（同一函数）');
  } finally {
    real.chara_make = original;
  }
});

test('转发层缺省参数：arg0/arg1 缺省 0（@CHAR_MAKE 的形参默认）', async () => {
  const fixture = create_era_fixture();
  const real = fixture.load_module('chara/chara-make');
  const seen = [];
  const original = real.chara_make;
  real.chara_make = async (cid, arg0, arg1) => {
    seen.push([cid, arg0, arg1]);
    return cid;
  };
  try {
    const forward = load_forward(fixture);
    await forward.char_make(998);
    assert.deepEqual(seen, [[998, 0, 0]], '缺省 0（CALL CHAR_MAKE,998 形态）');
  } finally {
    real.chara_make = original;
  }
});

test('转发层 @SET_CHAR_CLOTH：转发到 CM_CLOTH（:19）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:3:200', 1);
  const forward = load_forward(fixture);
  const result = await forward.set_char_cloth(3, never);
  assert.equal(result, 0, 'CM_CLOTH 的 RETURN 0');
  assert.equal(fixture.store.get('cflag:3:41'), 193, '女战士常规装');
});

test('转发层 @CHAR_MAKE_INPORT：RAND(ARG:0) != 0 即 RETURN 0（:31-32）', async () => {
  const fixture = create_era_fixture();
  const forward = load_forward(fixture);
  assert.equal(await forward.char_make_inport(5, never), 0, '掷不中：非异国');
  assert.equal(
    (await forward.char_make_inport(5, always)) === 0 &&
      stub_texts(fixture).some((line) => line.includes('@CHARA_MAKE_INPORT')),
    true,
    '掷中：进 JUMP（存根占位可见）',
  );
  // 缺省 ARG:0 = 1：RAND(1) 恒 0 必成功
  const fixture2 = create_era_fixture();
  const forward2 = load_forward(fixture2);
  await forward2.char_make_inport(undefined, always);
  assert(
    stub_texts(fixture2).some((line) => line.includes('@CHARA_MAKE_INPORT')),
    '缺省 1 必进',
  );
});

test('转发层 @NAMING / @NAME_RESET：JUMP 目标的存根占位（:9/:14）', async () => {
  const fixture = create_era_fixture();
  const forward = load_forward(fixture);
  await forward.naming(3);
  await forward.name_reset();
  const texts = stub_texts(fixture);
  assert(
    texts.some((line) => line.includes('@CHARA_NAME_DEFINE')),
    'NAMING → CHARA_NAME_DEFINE 占位',
  );
  assert(
    texts.some((line) => line.includes('@CN_REBUILD')),
    'NAME_RESET → CN_REBUILD 占位',
  );
});

test('转发层 re-export @CHAR_INIT（chara-init.js 的 #118 实现）', async () => {
  const fixture = create_era_fixture();
  const forward = load_forward(fixture);
  const result = await forward.char_init(35, never);
  assert.equal(result, 35, 'CHAR_INIT 的 RETURN L_A');
  assert.equal(fixture.store.get('cstr:35:60'), '我', '一人称已设');
});

// —— 存根清单核对（与 event-first.test.js 同款）——

test('存根清单可检索：docs/stub-registry.md 收录全部存根化调用', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = load(fixture);
  const { STUBBED_CALLS: FORWARD_STUBS } = load_forward(fixture);
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  for (const name of [...STUBBED_CALLS, ...FORWARD_STUBS]) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});
