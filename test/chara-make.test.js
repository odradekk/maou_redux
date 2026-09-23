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
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture) {
  return fixture.load_module('chara/chara-make');
}

function load_forward(fixture) {
  return fixture.load_module('chara/char-make');
}

/**
 * RAND:N == 1（恒不中 == 0 判定；对 truthy 判定恒真）。
 *
 * **例外：上界 21**。#389 起 @CM_LOOK 接的是 LOOK_SET 真身，它的「成为勇者
 * 之前的生活」段有源 :514 的重掷环 `Q == 2 && 法术 == 0 → GOTO BORN`——
 * 恒 1 时 Q 恒为 2、环退不出来（该票首次跑本文件时整份 OOM）。原作的环只对
 * 真随机收敛（chara-name.js:50 先例：空转环 1:1 保留、由测试侧调整随机源），
 * 故这里让 21 返回 0（Q = 1 学生档，不进重掷）。
 */
const never = (n) => (n === 21 ? 0 : 1);
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

test('FAMILY_REGISTER 调用真身：命中四分之一分支后重建关系对角 NID', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:1:6', 1001); // CFLAG:A:6 名字编号（NID）
  const { chara_make } = load(fixture);

  await chara_make(1, 0, 0, always);

  assert.notEqual(
    fixture.store.get('c_relation:1:1'),
    undefined,
    'CHARA_MAKE :101 的家族登记调用已执行',
  );
  assert.equal(
    fixture.store.get('c_relation:1:1'),
    fixture.store.get('cflag:1:6'),
    '关系对角保存随机命名后的当前 NID',
  );
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
  // 随机命名与 CHARA_NAME_DEFINE 自 #384 起都是真身（名字真的落了地），
  // 冲突检查也一并落地；#389 的 LOOK_SET 与 #394 的 CHARA_FIRST_EXP 都已换真身，
  // 两者的占位行都不该再出现。
  assert.equal(
    fixture.store.get('callname:1:-1'),
    '佳奈美',
    'CHARA_NAME_DEFINE 真身：没有可查的固定名时回落到默认名',
  );
  // LOOK_SET 自 #389 起是真身：外貌素质真的落了地（占位行反过来不该再出现）。
  // 精确值：never（RAND:N 恒 1）下发色掷到 11（粉髪）、癖掷到 2（往后看）
  assert.equal(
    fixture.store.get('talent:1:300'),
    11,
    'LOOK_SET 真身：发色（TALENT:300）= 11 粉髪',
  );
  const texts = stub_texts(fixture);
  for (const name of [
    'LOOK_SET',
    'CHARA_NAME_DEFINE',
    'CMI_CONFLICT_CHECK',
    'CHARA_FIRST_EXP',
  ]) {
    assert(
      !texts.some((line) => line.includes(`@${name}`)),
      `${name} 已落真身，不应再有占位行`,
    );
  }
  // CHAR_BODY_GENERATE_WAPPED 自 #385 起也是真身，不在这张「不触发」表里——
  // 它不再打占位行，留在表里的断言对任何输入都成立、验不出东西。
  for (const name of ['FAMILY_REGISTER', 'ST_UP']) {
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

test('FLAG:5 位 12 开：CHAR_BODY_GENERATE_WAPPED 真身落盘', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:5', 4096); // GETBIT(FLAG:5,12)
  const { chara_make } = load(fixture);
  await chara_make(1, 0, 0, never);
  // #385 起为真身（ere/chara/chara-body.js）：CFLAG:451-457 是判据，
  // 占位行不再出现。年龄受 LIMIT(12,35) 约束，身高/体重为正数。
  // 随机源钉死（never）→ 四个落点都是确定值，钉精确值而不是区间。
  // #389 勘误：#385 当时写的 [12,35] 只是那一条随机序的巧合——char_age_generate
  // 先 LIMIT(EXP_AGE,12,35)（chara-body.js:457）再走 normal_point_pickup 的
  // ±2（:180-181），下界因此是 10、上界 37；本用例这一条序落在 11
  assert.equal(fixture.store.get('cflag:1:451'), 11, '人类换算年龄 = 11');
  assert.equal(fixture.store.get('cflag:1:452'), 11, '种族年龄（人类同档）');
  assert.equal(fixture.store.get('cflag:1:453'), 1281, '身高（厘米）');
  assert.equal(fixture.store.get('cflag:1:454'), 191, '体重（公斤）');
  assert.equal(
    stub_texts(fixture).some((line) =>
      line.includes('@CHAR_BODY_GENERATE_WAPPED'),
    ),
    false,
    '已落真身，不得再出现存根占位行',
  );
});

test('RAND:4 == 0 且非后代：FAMILY_REGISTER 已接真身', async () => {
  const fixture = create_era_fixture();
  const { chara_make } = load(fixture);
  await chara_make(1, 0, 0, always);
  assert.equal(
    stub_texts(fixture).some((line) => line.includes('@FAMILY_REGISTER')),
    false,
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

// —— @CM_GENDER（:255-294，SELECTCASE 冒險者性別 → global:3，#547 落存储）——

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

test('cm_gender 六臂按 global:3 冒险者性别分派（#547 接通存储）', async () => {
  // -1 女多男少：2% 扶他、20% 男性（RAND:50==0 → 扶她；RAND:5==0 → 男人）
  const f1 = create_era_fixture();
  f1.store.set('global:3', -1);
  await load(f1).cm_gender(1, (n) => (n === 50 ? 0 : 1));
  assert.equal(f1.store.get('talent:1:121'), 1, '-1 档：掷中扶他');

  const f1b = create_era_fixture();
  f1b.store.set('global:3', -1);
  await load(f1b).cm_gender(1, (n) => (n === 5 ? 0 : 1));
  assert.equal(f1b.store.get('talent:1:122'), 1, '-1 档：掷中男人');

  // 1 只有男性：未掷中扶他则恒为男人（RAND:5 >= 0 恒真）
  const f2 = create_era_fixture();
  f2.store.set('global:3', 1);
  await load(f2).cm_gender(2, never);
  assert.equal(f2.store.get('talent:2:122'), 1, '1 档：男人');

  // 2 男多女少：RAND:5 >= 1（五分之四）→ 男人；掷 0 → 女性
  const f3 = create_era_fixture();
  f3.store.set('global:3', 2);
  await load(f3).cm_gender(3, (n) => (n === 50 ? 1 : 1));
  assert.equal(f3.store.get('talent:3:122'), 1, '2 档：五分之四的男性');

  const f3b = create_era_fixture();
  f3b.store.set('global:3', 2);
  await load(f3b).cm_gender(3, (n) => (n === 5 ? 0 : 1));
  assert.equal(f3b.store.get('talent:3:122'), undefined, '2 档：掷 0 为女性');

  // 3 男女持平：RAND:2 < 1（二分之一）→ 男人
  const f4 = create_era_fixture();
  f4.store.set('global:3', 3);
  await load(f4).cm_gender(4, (n) => (n === 2 ? 0 : 1));
  assert.equal(f4.store.get('talent:4:122'), 1, '3 档：掷 0 为男人');

  const f4b = create_era_fixture();
  f4b.store.set('global:3', 3);
  await load(f4b).cm_gender(4, () => 1);
  assert.equal(f4b.store.get('talent:4:122'), undefined, '3 档：掷 1 为女性');

  // 4 全是扶她（不掷骰）
  const f5 = create_era_fixture();
  f5.store.set('global:3', 4);
  await load(f5).cm_gender(5, never);
  assert.equal(f5.store.get('talent:5:121'), 1, '4 档：恒扶她');
  assert.equal(f5.store.get('talent:5:122'), undefined, '4 档：无男性');
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

test('cm_look：LOOK_SET 真身落盘 + 白虎 5%（:860-872）', async () => {
  const fixture = create_era_fixture();
  const { cm_look } = load(fixture);
  await cm_look(3, 0, never);
  // #389 起 @CM_LOOK 接的是 LOOK_SET 真身（ere/chara/look.js）：外貌素质
  // 由它掷出，占位行不再出现
  assert.equal(
    stub_texts(fixture).some((line) => line.includes('@LOOK_SET')),
    false,
    '已落真身，不得再出现占位行',
  );
  assert.equal(fixture.store.get('talent:3:300'), 11, '发色 = 11 粉髪');
  assert.equal(fixture.store.get('talent:3:313'), 2, '癖 = 2 往后看');
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

test('cm_st：FLAG:60 = 0 不升 ST_UP；体力气力回满（:877-883）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('maxbase:3:0', 500);
  fixture.store.set('maxbase:3:1', 300);
  const { cm_st } = load(fixture);
  await cm_st(3, never);
  assert.equal(fixture.store.get('base:3:0'), 500, 'BASE = MAXBASE');
  assert.equal(fixture.store.get('base:3:1'), 300, 'BASE = MAXBASE');
  // FLAG:60 = 0：不逐级（等级与上限都停在原值）
  assert.equal(fixture.store.get('cflag:3:9') ?? 0, 0, '不升 ST_UP（等级）');
  assert.equal(fixture.store.get('maxbase:3:0'), 500, '不升 ST_UP（体力上限）');
});

test('cm_st：FLAG:60 = 2 且非派遣 → 逐级 CALL ST_UP 两次（:878-880，#565 接真身）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:60', 2);
  fixture.store.set('flag:402', 0); // 非派遣
  const { cm_st } = load(fixture);
  await cm_st(3, never);
  // never → rand(2) 恒 1（防御臂）：每级等级 +1、攻 +1、防 +1（基础）+1
  // （掷骰臂）、体力/气力上限各 +10。两级合计：
  assert.equal(fixture.store.get('cflag:3:9'), 2, 'REPEAT FLAG:60 次：等级 2');
  assert.equal(
    fixture.store.get('cflag:3:13'),
    2,
    '基础攻击每级 +1（掷骰落防臂不再加攻）',
  );
  assert.equal(
    fixture.store.get('cflag:3:14'),
    4,
    '基础防御每级 +1，掷骰 rand(2)=1 再 +1',
  );
  assert.equal(fixture.store.get('maxbase:3:0'), 20, '体力上限每级 +10');
  assert.equal(fixture.store.get('maxbase:3:1'), 20, '气力上限每级 +10');
  // 尾部 BASE = MAXBASE（:882-883）在升级后取新上限
  assert.equal(fixture.store.get('base:3:0'), 20);
  assert.equal(fixture.store.get('base:3:1'), 20);
});

test('cm_st：派遣中（FLAG:402 != 0）不逐级（:877 的第二条件）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:60', 3);
  fixture.store.set('flag:402', 1); // 派遣奴隶标志（RAND_CHARA_MAKE :139 置 1）
  const { cm_st } = load(fixture);
  await cm_st(3, never);
  assert.equal(fixture.store.get('cflag:3:9') ?? 0, 0, 'FLAG:402 != 0：不逐级');
});

test('cm_st_ace：魔王等级 <= 2 不掷；> 2 按六成（±两成）逐级（#565 接真身）', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('flag:60', 1);
  fixture.store.set('cflag:0:9', 2); // 魔王等级 2（不 > 2）
  const { cm_st_ace } = load(fixture);
  await cm_st_ace(3, never);
  assert.equal(
    fixture.store.get('cflag:3:9') ?? 0,
    0,
    '魔王等级 2 不 > 2：不逐级',
  );

  const fixture2 = create_era_fixture();
  fixture2.store.set('flag:60', 1);
  fixture2.store.set('cflag:0:9', 10);
  const { cm_st_ace: ace2 } = load(fixture2);
  await ace2(4, never); // rand(10) = 1 → (10*6 + 1*2) / 10 = 6 次逐级
  assert.equal(fixture2.store.get('cflag:4:9'), 6, '(60 + 2) / 10 = 6 次逐级');
  // never → rand(2) 恒 1：每级攻 +1、防 +2
  assert.equal(fixture2.store.get('cflag:4:13'), 6);
  assert.equal(fixture2.store.get('cflag:4:14'), 12);
  assert.equal(fixture2.store.get('maxbase:4:0'), 60, '体力上限每级 +10');
});

// —— @CM_FAMILY_TALENT（:896-1042）——

test('cm_family_talent：SEARCH_FAMILY 真身找到家族后进入继承块', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(3, { id: 3, name: '村娘A' });
  fixture.seed_chara(4, { id: 4, name: '村娘B' });
  fixture.era.addCharacter(3);
  fixture.era.addCharacter(4);
  fixture.store.set('talent:3:165', 1);
  fixture.store.set('talent:4:171', 1);
  const { cm_family_talent } = load(fixture);
  await cm_family_talent(3, always);
  assert.equal(fixture.store.get('talent:3:110'), 1, '未成年家族使胸围升一段');
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
  // :1368-1371 着替え装着自 #215（J5）起为真身：cm_cloth 已写 cflag:3:41 = 3
  // （锁甲，1-100 裙装段）→ WEARING_CLOTH_ALL 装位 1|2|4|8（无素质干扰）
  assert.equal(
    fixture.store.get('cflag:3:40'),
    15,
    '锁甲装位 = 内裤|胸罩|上装|裙',
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
  // 掷中即进 JUMP 目标——#394 起真身（ere/chara/chara-make-inport.js），
  // 占位行随存根一起消失；真身的行为面在 test/chara-make-inport.test.js。
  assert(
    !stub_texts(fixture).some((line) => line.includes('@CHARA_MAKE_INPORT')),
    '掷中后不再有占位行（真身已落地）',
  );
  // 缺省 ARG:0 = 1：RAND(1) 恒 0 必成功
  const fixture2 = create_era_fixture();
  const forward2 = load_forward(fixture2);
  await forward2.char_make_inport(undefined, always);
  assert(
    !stub_texts(fixture2).some((line) => line.includes('@CHARA_MAKE_INPORT')),
    '缺省 1 必进真身（同样无占位行）',
  );
});

test('转发层 @NAMING / @NAME_RESET：JUMP 目标自 #384 起是真身', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(3, { id: 3, name: '预设名', callname: '预称呼' });
  const forward = load_forward(fixture);
  // @NAMING → CHARA_NAME_DEFINE：NO 3 不在特殊角色区间，走固定名分支
  fixture.store.set('cflag:3:6', 205);
  await forward.naming(3);
  assert.equal(fixture.store.get('cflag:3:6'), 205, 'NID 缺省沿用 CFLAG:6');
  assert(
    fixture.store.get('callname:3:-1') === '佳奈美',
    'CHARA_NAME_DEFINE 真身（205 无注册名 → 默认名）',
  );

  // @NAME_RESET → CN_REBUILD：称呼按姓名重建（MASTER 之外的每个角色）
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  assert.equal(fixture.era.addCharacter(3), true, '预设角色 3 已入库');
  fixture.store.set('callname:3:-1', '改名后');
  fixture.store.set('callname:3:-2', '旧称呼');
  fixture.store.set('callname:0:-2', '魔王的旧称呼');
  await forward.name_reset();
  assert.equal(
    fixture.store.get('callname:3:-2'),
    '改名后',
    '非 MASTER 被重建',
  );
  assert.equal(
    fixture.store.get('callname:0:-2'),
    '魔王的旧称呼',
    'MASTER 被 CONTINUE 跳过',
  );
  assert(
    !stub_texts(fixture).some((line) => line.includes('@CN_REBUILD')),
    'CN_REBUILD 已落真身',
  );
});

test('转发层 re-export @CHAR_INIT（chara-init.js 的 #118 实现）', async () => {
  const fixture = create_era_fixture();
  const forward = load_forward(fixture);
  const result = await forward.char_init(35, never);
  assert.equal(result, 35, 'CHAR_INIT 的 RETURN L_A');
  assert.equal(fixture.store.get('cstr:35:60'), '我', '一人称已设');
});

// —— 战役招募模式（#469 起真身，rand_chara_make 的 campaign_slave 形参）——
//
// #483（结论·方案 2）起，campaign_slave 为真时只在**未被占用**的勇者位里抽，
// 候选表为空（16 位全满）就落 :188-191 的失败分支。下列用例的编制一律布成
// **不连号**且至少有一位已被占用：连号编制下「角色号」与「已加入数 - 1」
// 偶然相等（只有魔王、掷 0 时两者都是 1），区分不出「只抽空位」与「掷 1-16
// 后撞上占用位再重挑」。

/**
 * 记录每次调用传入的上界（返回值按给定序列取，越界回落 0）。上界用来钉住
 * **候选表长度**这个数值：`rand_n(16)` 与 `rand_n(14)` 在同一个固定返回值下
 * 分不出结果，只有直接断实际传入的 n 才拦得住（`seq_capture` 的同类写法，
 * 见 test/chara-name.test.js 头注）。
 *
 * 与 `seq` 的差别：`seq` 越界即断言失败，这里越界静默回落 0——本文件多处靠
 * 「恒 0 推进流程」，回落是刻意的；要断言「不再掷骰」的用例读 `bounds`，不看
 * 返回值（如 16 位全满那条的 `capture([])`）。
 */
function capture(values) {
  const bounds = [];
  let index = 0;
  const rand = (n) => {
    bounds.push(n);
    return values[index++] ?? 0;
  };
  rand.bounds = bounds;
  return rand;
}

/** 1-16 里未被占用的勇者位（升序）——战役招募的候选表，测试侧独立算一遍 */
function free_hero_slots(fixture) {
  const added = new Set(fixture.era.getAddedCharacters());
  return Array.from({ length: 16 }, (_, i) => i + 1).filter(
    (slot) => !added.has(slot),
  );
}

test('campaign_slave=true：形象确认段与确认对话换战役招募措辞', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9); // 编制**不连号**：只有魔王与 9 号在场
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99);
  const answers = [100, 2];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const { rand_chara_make } = load(fixture);
  const result = await rand_chara_make(
    () => 0, // 候选表首位（空位 1 号）
    () => Promise.resolve(0),
    true,
  );
  assert.equal(result, 1, '招募成功，落在空位 1 号');
  const texts = stub_texts(fixture);
  assert(
    texts.some((t) => t.includes('当前挑选出来的奴隶，是这个形象的')),
    ':76-80 战役招募文案',
  );
  assert(
    texts.some((t) => t.includes('这位挑选出来的奴隶，您还满意吗')),
    ':151-157 战役招募确认文案',
  );
  assert(
    !texts.some((t) => t.includes('呃……面前的勇者')),
    '不与普通招募文案混杂',
  );
});

test('campaign_slave=true：只在未被占用的勇者位里抽，已占用的位子不入选', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.era.addCharacter(1); // 1 号**已被占用**：掷 0 时旧写法正落在它头上
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9); // 编制不连号
  fixture.seed_chara(2, { id: 2, name: '勇者2', callname: '勇者2' });
  fixture.store.set('cflag:2:6', 99);
  const answers = [100, 2];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const { rand_chara_make } = load(fixture);
  const candidates = free_hero_slots(fixture); // 招募前的候选表
  const cap = capture([0]); // 候选表首位
  const result = await rand_chara_make(cap, () => Promise.resolve(0), true);

  assert.deepEqual(
    candidates,
    [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16],
    '候选表 = 勇者位 1-16 去掉已占用的 1 与 9',
  );
  assert.equal(result, 2, '落在候选表首位 2 号（1 号是占用位，不入选）');
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 1, 2, 9],
    '新增的是 2 号；已占用的 1 号不动',
  );
  assert.equal(fixture.store.get('cflag:2:1'), 0, ':180 CFLAG:1 归零落在 2 号');
  assert.equal(
    fixture.store.get('cflag:1:1'),
    undefined,
    '被占用的 1 号未被重置（旧写法会原地重置它）',
  );
  assert.equal(
    fixture.store.get('talent:1:161'),
    undefined,
    '1 号的性格素质未被覆盖',
  );
  // 上界放在最后：它是「候选表长度」这个数值的钉子，语义结果已在上方断言过
  assert.equal(
    cap.bounds[0],
    candidates.length,
    '上界 = 候选表长度 14，不是 16',
  );

  // 第二位：掷到候选表末位（索引 13）应落到 16 号——按候选表索引而非 1-16
  // 原区间取值（原区间索引 13 是 14 号）。布置：魔王 0 与 1、9 号在场（编制
  // 不连号，候选表 = 2-8 与 10-16 共 14 位），16 号是被抽中的那位——它的预设
  // 必需（夹具的 addCharacter 按预设放行，CHAR_MAKE 也从它取表），0/1/9 的
  // 预设只是编制占位，不参与断言
  const fixture2 = create_era_fixture();
  for (const cid of [0, 1, 9]) {
    fixture2.seed_chara(cid, {
      id: cid,
      name: `角色${cid}`,
      callname: `角色${cid}`,
    });
    fixture2.era.addCharacter(cid);
  }
  fixture2.seed_chara(16, { id: 16, name: '勇者16', callname: '勇者16' });
  fixture2.store.set('cflag:16:6', 99);
  const answers2 = [100, 2];
  let asked2 = 0;
  fixture2.era.input = () => Promise.resolve(answers2[asked2++] ?? 100);
  const { rand_chara_make: make2 } = load(fixture2);
  const candidates2 = free_hero_slots(fixture2);
  const cap2 = capture([13]);
  const result2 = await make2(cap2, () => Promise.resolve(0), true);
  assert.equal(result2, 16, '候选表索引 13 → 16 号（原区间索引 13 是 14 号）');
  assert.equal(cap2.bounds[0], candidates2.length, '上界同样是候选表长度 14');
});

test('campaign_slave=true：16 位全满时不掷骰，走 :188-191 失败文案并返回 0', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  for (const cid of Array.from({ length: 16 }, (_, i) => i + 1)) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `勇者${cid}`,
      callname: `勇者${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  const { rand_chara_make } = load(fixture);
  const cap = capture([]);
  const result = await rand_chara_make(cap, () => Promise.resolve(0), true);
  assert.equal(result, 0, ':191 RETURN 0（调用点据此不扣气力）');
  assert.deepEqual(
    cap.bounds,
    [],
    '候选表为空：一次随机数都不掷（不循环重掷）',
  );
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    Array.from({ length: 17 }, (_, i) => i),
    '编制不变，不新增也不重置任何角色',
  );
  assert(
    stub_texts(fixture).some((t) =>
      t.includes(
        '由于对魔王的恐惧，勇者没有出现。（奴隶数已达上限，请处决几个）',
      ),
    ),
    ':188-191 原作文案逐字（含括号内的提示，不另造文本）',
  );
  assert(
    fixture.waits.some((w) => w.waited),
    ':190 WAIT 已执行',
  );
});

test('campaign_slave=true：候选表只剩一位时上界 1、抽中唯一空位', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  // 勇者位 1-15 已占用，只剩 16 —— 候选表长度 1（#483 的最后一个空位边界）
  for (const cid of Array.from({ length: 15 }, (_, i) => i + 1)) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `勇者${cid}`,
      callname: `勇者${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  fixture.seed_chara(16, { id: 16, name: '勇者16', callname: '勇者16' });
  fixture.store.set('cflag:16:6', 99);
  const answers = [100, 2];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const { rand_chara_make } = load(fixture);
  const cap = capture([]); // 越界回落 0：候选表只有一位，索引恒 0
  const result = await rand_chara_make(cap, () => Promise.resolve(0), true);
  assert.equal(result, 16, '唯一的空位 16 号被抽中');
  assert.equal(cap.bounds[0], 1, '上界 = 候选表长度 1（不是 0，也不是 16）');
  assert.equal(
    fixture.era.getAddedCharacters().length,
    17,
    '编制变为 0-16（新增 16 号）',
  );
});

test('campaign_slave=true：选「换一个」后重挑仍走候选表', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9); // 编制不连号：候选表长度 15
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99);
  const answers = [100, 1, 100, 2]; // 改形象 → 换一个 → 再改形象 → 收下
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const add_calls = [];
  const original_add = fixture.era.addCharacter;
  fixture.era.addCharacter = (...ids) => {
    add_calls.push(ids);
    return original_add(...ids);
  };
  const { rand_chara_make } = load(fixture);
  // 全 0 的随机源：两次抽取（首抽与重挑）都取候选表首位。重挑前 1 号刚被
  // DELCHARA，于是它重新成为空位——候选表在重挑时是重算的，结果因此仍是 1 号
  const cap = capture([]);
  const result = await rand_chara_make(cap, () => Promise.resolve(0), true);
  assert.equal(cap.bounds[0], 15, '首次抽取的上界 = 候选表长度 15（不是 16）');
  assert.equal(add_calls.length, 2, '换一个后重挑了：ADDCHARA 调用两次');
  assert.ok(
    cap.bounds.filter((n) => n === 15).length >= 2,
    '重挑时仍按候选表长度掷骰（至少两次上界 15）',
  );
  assert.equal(result, 1, '重挑收下的仍是空位 1 号');
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [0, 1, 9],
    '1 号被换掉（DELCHARA）后重新招募，编制与首抽一致',
  );
});

test('campaign_slave 缺省（false）：掷中已占用的勇者位仍落空，不绕过判定', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(2, { id: 2, name: '勇者2', callname: '勇者2' });
  fixture.era.addCharacter(2); // 2 号已占用，未传 campaign_slave
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9); // 编制不连号
  const { rand_chara_make } = load(fixture);
  const cap = capture([1]); // RAND:16 落 1 → 位号 2（已占用）
  const result = await rand_chara_make(cap);
  assert.equal(cap.bounds[0], 16, '普通路径照原作掷 1-16，不建候选表');
  assert.equal(result, 0, '默认行为：掷中占用位即落空');
  assert(
    stub_texts(fixture).some((t) => t.includes('由于对魔王的恐惧')),
    ':188-191 落空文案',
  );
  assert.deepEqual(fixture.era.getAddedCharacters(), [0, 2, 9], '不加人');
});

test('campaign_slave=true 且选 [3] 算了不选了：删除角色、直接返回 0（不重挑）', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9); // 编制**不连号**：只有魔王与 9 号在场
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99);
  const answers = [100, 3];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const add_calls = [];
  const original_add = fixture.era.addCharacter;
  fixture.era.addCharacter = (...ids) => {
    add_calls.push(ids);
    return original_add(...ids);
  };
  const { rand_chara_make } = load(fixture);
  const result = await rand_chara_make(
    () => 0, // 候选表首位（空位 1 号）
    () => Promise.resolve(0),
    true,
  );
  assert.equal(result, 0, ':171 RETURN 0');
  assert.equal(add_calls.length, 1, '不重挑：ADDCHARA 只调用过一次');
  assert.equal(
    fixture.era.getAddedCharacters().includes(1),
    false,
    ':166 DELCHARA 删掉的是刚招募的 1 号（角色号，不是「已加入数 - 1」= 2）',
  );
});

test('campaign_slave 缺省（false）：answer=3 落入收下分支，不触发算了不选了', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9); // 编制**不连号**：只有魔王与 9 号在场
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99);
  const answers = [100, 3];
  let asked = 0;
  fixture.era.input = () => Promise.resolve(answers[asked++] ?? 100);
  const { rand_chara_make } = load(fixture);
  const result = await rand_chara_make(
    () => 0, // RAND:16 落 0 → 位号 1（空位）
    () => Promise.resolve(0),
  );
  assert.equal(result, 1, '非战役场景：answer=3 落入收下分支，照常招募成功');
  assert(
    stub_texts(fixture).some((t) => t.includes('被囚禁在了地牢里')),
    ':172-187 收下文案',
  );
});

// —— 确认对话的选项必须是引擎按钮（#530）——
//
// 引擎的 input 只接受本轮打印过的按钮快捷键（渲染层 returnFromButton：
// `rule.length > 0 && rule.indexOf(Number(val)) === -1` 即拒收、不回调；
// #130 把这条写进了夹具，#53 立了「`[N] 文字` + INPUT 升级为 printButton」
// 的通则）。原作 Emuera 的 INPUT 收任意数值，`PRINTL [N] …` 在那边能用；
// EraElectron 不行——纯文本的选项行玩家敲不进编号，实机表现正是「输
// 0/1/2/3 全部无反应」(#530)。
//
// **只断言文案出现过抓不住**：文案在按钮与纯文本两种实现下都在。断言看
// 夹具的 button 条目（type === 'button'，rendered = 引擎实显文本）。
// 另一个陷阱是正文自带 `[N]`：引擎 showAcc 会再拼一层，rendered 因此是
// `[1] [1] …`（AGENTS.md 硬约束，PR #30 实机撞见）——本组用例一并钉住。

/** 夹具记录里的按钮条目（含已从画面清掉的；rendered = 引擎实显文本） */
function button_rendered(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
}

/** 战役招募的公共布景：编制不连号（只有魔王 0 与 9 号），候补预设 1 号 */
function campaign_fixture() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(9, { id: 9, name: '勇者9', callname: '勇者9' });
  fixture.era.addCharacter(9);
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.store.set('cflag:1:6', 99); // 名字编号：避让随机命名重掷
  return fixture;
}

test('campaign_slave=true：确认对话的三个选项经 printButton 出，正文不带 [N] 前缀', async () => {
  const fixture = campaign_fixture();
  // 走夹具的真实 input（含按钮白名单校验）：[100] 進む → [2] 收下
  fixture.set_inputs(100, 2);
  const { rand_chara_make } = load(fixture);
  const result = await rand_chara_make(
    () => 0, // 候选表首位（空位 1 号）
    () => Promise.resolve(0),
    true,
  );

  assert.equal(result, 1, '招募成功，落在空位 1 号');
  const rendered = button_rendered(fixture);
  for (const [accelerator, content] of [
    [1, '不，换一个'],
    [2, '嘛…还行，就这位吧'],
    [3, '算了，不选了'],
  ]) {
    // 逐字相等，不用 includes 取子串：正文自带 [N] 时引擎会再拼一层，
    // 实显成 `[2] [2] 嘛…还行，就这位吧`——按子串判断照样成立，抓不住 PR #30
    assert.ok(
      rendered.some((text) => text === `[${accelerator}] ${content}`),
      `[${accelerator}] 要由引擎拼在按钮正文前（实显：${JSON.stringify(rendered)}）`,
    );
  }
  // 三个选项不许再以纯文本出现：[N] 是引擎按钮的快捷键，纯文本行敲不进去
  const texts = stub_texts(fixture);
  for (const content of ['不，换一个', '嘛…还行，就这位吧', '算了，不选了']) {
    assert.ok(
      !texts.some((t) => t.includes(content)),
      `选项 ${content} 是纯文本行（引擎收不到它的快捷键）`,
    );
  }
  assert.deepEqual(
    fixture.inputs_consumed
      .filter((entry) => entry.api === 'input')
      .map((entry) => entry.value),
    [100, 2],
    '输入序列原样（这条只记录消费了什么；本轮的按钮成色由上面的 rendered ' +
      '断言守——白名单在这一步是空集，夹具对空集不设限）',
  );
});

test('campaign_slave=true：三个选项分支走夹具真实输入路径（重挑／收下／放弃）', async () => {
  // 本用例走夹具的真实 input（不就地替换），三个可用输入因此要能被夹具消费：
  // [100] 進む 在白名单为空的轮次里是自由输入，[1]/[2]/[3] 收下确认。**它抓不
  // 住 #530**——那一轮的白名单在夹具里是空的，纯文本选项也会被放行；抓 #530
  // 的是上面那条结构性断言（看 type === 'button' 的条目）。
  // [预置输入, 期望返回, 说明]——每个分支一个可区分的输入
  const cases = [
    [[100, 1, 100, 2], 1, '[1] 不，换一个 → 重挑后收下'],
    [[100, 2], 1, '[2] 嘛…还行，就这位吧 → 收下'],
    [[100, 3], 0, '[3] 算了，不选了 → 删掉并返回 0'],
  ];
  for (const [answers, expected, label] of cases) {
    const fixture = campaign_fixture();
    fixture.set_inputs(...answers);
    const { rand_chara_make } = load(fixture);
    const result = await rand_chara_make(
      () => 0,
      () => Promise.resolve(0),
      true,
    );
    assert.equal(result, expected, label);
  }
});

test('campaign_slave 缺省（false）：确认对话的两个选项经 printButton 出，正文不带 [N] 前缀', async () => {
  const fixture = campaign_fixture();
  fixture.set_inputs(100, 2);
  const { rand_chara_make } = load(fixture);
  const result = await rand_chara_make(
    () => 0, // RAND:16 落 0 → 位号 1（空位）
    () => Promise.resolve(0),
  );

  assert.equal(result, 1, '普通招募同样是收下');
  const rendered = button_rendered(fixture);
  for (const [accelerator, content] of [
    [1, '不不不不…我看错了！'],
    [2, '是她！是她！就是她！抓起来！…'],
  ]) {
    assert.ok(
      rendered.some((text) => text === `[${accelerator}] ${content}`),
      `[${accelerator}] 要由引擎拼在按钮正文前（实显：${JSON.stringify(rendered)}）`,
    );
  }
  const texts = stub_texts(fixture);
  assert.ok(
    !texts.some((t) => t.includes('不不不不…我看错了！')),
    '选项不是纯文本行',
  );
});

// —— 存根清单核对（与 event-first.test.js 同款）——
test('存根清单可检索：docs/stub-registry.md 收录全部存根化调用', () => {
  const fixture = create_era_fixture();
  const { STUBBED_CALLS } = load(fixture);
  const { STUBBED_CALLS: FORWARD_STUBS } = load_forward(fixture);
  // #565 起 ST_UP 已接线（cm_st / cm_st_ace），两份名单都清空；名字与清单
  // 状态的机械核对在 test/stub-registry-status.test.js 与 --coverage。
  assert.deepEqual(
    [STUBBED_CALLS, FORWARD_STUBS],
    [[], []],
    'chara-make 实现层与转发层均无存根化调用（#565）',
  );
});
