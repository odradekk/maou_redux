/**
 * ere/dungeon/dungeon-quest.js 全量 17 函数的行为测试（issue #178，H9）。
 *
 * 缝 = test/helpers/era-fixture.js。PRINTW 的等键是 waitAnyKey（不消耗
 * 预置输入）；随机经函数级 rand 参数注入定值序。
 *
 * 验收对应（#178 清单）：
 *   - @SET_QUEST → @QUEST_SELECT → @RESULT_QUEST 的任务生命周期有测试
 *     （受注落位 / 报酬清算 / 成败结算 / 假任务与超时覆写 / E 列匹配门槛）；
 *   - 12 个 @*_QUEST_BITCH 段的经验累加逐条有测试；
 *   - @QUEST_BATTLE_SET 的三态（0/1/2）与障碍位（boss / 大量敌人 / 性
 *     奉侍交涉）各有断言；受注计数递减有断言。
 *
 * 本票核心移植裁定的钉子：
 *   - 省略角色号 = TARGET（初吻/失贞写点打在 era_flag.target 上）；
 *   - SET_QUEST 的受注计数挂在障碍 bit3（大量敌人）而非 bit2（时限）——
 *     原作笔误 1:1（登记 #14）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture, name = 'dungeon/dungeon-quest') {
  return fixture.load_module(name);
}

/** 定值随机源：依次吐 given（原样返回，调用方保证取值语义），耗尽后恒 fallback */
function seq_rand(given, fallback = 99) {
  const q = [...given];
  return (n) => (q.length > 0 ? q.shift() : fallback % n);
}

/**
 * 最小世界：魔王 0 + 勇者队长 1（侵攻中、第 1 层、目标阶层 8）。
 * E 列预置：狗头人（100）×3 在第一列——RESULT_QUEST / QUEST_BATTLE_SET
 * 的「E 列头 == 讨伐对象」门槛直接命中。
 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:0:9', 10); // 魔王等级 10
  fixture.store.set('cflag:1:1', 2); // 勇者侵攻中
  fixture.store.set('cflag:1:9', 5); // 等级 5
  fixture.store.set('cflag:1:520', 8); // 目标阶层 8
  fixture.store.set('cflag:1:501', 1); // 侵攻阶层 1
  fixture.store.set('cflag:1:531', 0); // 无同伴
  fixture.store.set('cflag:1:532', 0);
  // E 第一列：狗头人 ×3、凌辱类型 1（亜人）
  fixture.store.set('itemname:100', '狗头人');
  fixture.store.set('e:0', 100);
  fixture.store.set('e:7', 1);
  fixture.store.set('e:99', 3);
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// —— 存根清单核对（dungeon-battle.test.js 同款）——

test('存根清单可检索：docs/stub-registry.md 收录任务两文件的复用存根', () => {
  const fixture = create_era_fixture();
  const fs = require('node:fs');
  const path = require('node:path');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  const names = [...load(fixture).STUBBED_CALLS];
  assert.ok(names.length >= 3, `名单 ${names.length} 条（应 ≥ 3）`);
  for (const name of names) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— @SET_QUEST：受注与清算 ——

test('SET_QUEST：FLAG:8 位 3（任务禁止）开时不受理', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:8', 1 << 3);
  const { set_quest } = load(fixture);
  const ret = await set_quest(1, seq_rand([0]));
  assert.equal(ret, 0, 'RETURN 0');
  assert.equal(fixture.store.get('cflag:1:534'), undefined, '534 未写');
});

test('SET_QUEST：受注落位（534=1 / 535 报酬 / 536 障碍 / 539 计数）', async () => {
  const fixture = setup_world();
  // rand 序：535=rand(3)+1→0；六个障碍 rand(3)→3,3,3,3,3,3（全不中）；
  // QUEST_SELECT セット rand(3)+1→2（type3）、rand(5)→1（人称）；
  // 讨伐对象 rand(520)→2、rand(5)→4；时限不掷（bit3 未中）
  const { set_quest } = load(fixture);
  await set_quest(1, seq_rand([0, 3, 3, 3, 3, 3, 3, 2, 1, 2, 4]));
  assert.equal(fixture.store.get('cflag:1:534'), 1, '受注状态');
  assert.equal(fixture.store.get('cflag:1:535'), 1, '报酬类型 1（资金）');
  assert.equal(fixture.store.get('cflag:1:536'), 0, '无障碍');
  assert.equal(fixture.store.get('cflag:1:537'), 3, '任务类型 3');
  assert.equal(fixture.store.get('cflag:1:540'), 1, '人称变体 1');
  assert.equal(
    fixture.store.get('cflag:1:538'),
    2 * 10 + 4 + 100,
    '讨伐对象 = 层×10+种+100',
  );
  assert.equal(fixture.store.get('cflag:1:539'), 99, '普通依頼 99 回合');
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('阿尔接受了任务！')),
    '受注播报',
  );
  assert(
    lines.some((l) => l.includes('任务[因变异魔法而暴走的')),
    'QUEST_SELECT 名前（type3 称谓）',
  );
  assert(
    lines.some((l) => l.includes('*讨伐对象是')),
    'QUEST_SELECT LINE3 讨伐对象行',
  );
});

test('SET_QUEST：障碍 bit3（大量敌人）挂短受注计数——原作笔误 1:1（#14）', async () => {
  const fixture = setup_world();
  // 535→0；障碍掷点 [0(不中),0(不中),0(不中),0→bit3 中,3,3]；セット 2/1；
  // 讨伐 0/0；时限 rand(10)+1→4
  const { set_quest } = load(fixture);
  await set_quest(1, seq_rand([0, 3, 3, 3, 0, 3, 3, 2, 1, 0, 0, 4]));
  assert.equal(fixture.store.get('cflag:1:536'), 1 << 3, 'bit3（大量敌人）');
  assert.equal(fixture.store.get('cflag:1:539'), 5, 'rand(10)+1 = 5（短计数）');
});

test('SET_QUEST：成功完结的清算——报酬资金入账（等级×10+100）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1 | (1 << 1)); // 成功完结位
  fixture.store.set('cflag:1:535', 1); // 资金报酬
  fixture.store.set('cflag:1:580', 1000);
  const { set_quest } = load(fixture);
  await set_quest(1, seq_rand([0, 3, 3, 3, 3, 3, 3, 2, 1, 2, 4]));
  assert.equal(
    fixture.store.get('cflag:1:580'),
    1000 + 5 * 10 + 100,
    'LV5 × 10 + 100',
  );
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('获得了资金150')),
    '报酬播报',
  );
});

test('SET_QUEST：失败完结的清算——无报酬、534 清 0 后照常接新', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1 | (1 << 2)); // 失败完结位
  fixture.store.set('cflag:1:535', 1);
  fixture.store.set('cflag:1:580', 1000);
  const { set_quest } = load(fixture);
  await set_quest(1, seq_rand([0, 3, 3, 3, 3, 3, 3, 2, 1, 2, 4]));
  assert.equal(fixture.store.get('cflag:1:580'), 1000, '失败无报酬');
  assert.equal(fixture.store.get('cflag:1:534'), 1, '清 0 后接新任务');
});

// —— @RESULT_QUEST：成败结算 ——

test('RESULT_QUEST：战斗胜利 → 成功完结位 + 成功日志', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:537', 1); // type1 被拐走的女子
  fixture.store.set('cflag:1:540', 0); // 村娘
  fixture.store.set('cflag:1:539', 50); // 未超时
  const { result_quest } = load(fixture);
  const ret = await result_quest(1, '成功', seq_rand([1]));
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('cflag:1:534'), 1 | (1 << 1), '成功完结位');
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('*任务成功*')),
    '成功播报',
  );
  assert(
    lines.some((l) => l.includes('安全救出了！')),
    'QUEST_SELECT 成功日志（type1 村娘）',
  );
});

test('RESULT_QUEST：假任务（bit5）把成败覆写为失败', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:536', 1 << 5);
  fixture.store.set('cflag:1:537', 1);
  fixture.store.set('cflag:1:539', 50);
  const { result_quest } = load(fixture);
  await result_quest(1, '成功', seq_rand([1]));
  assert.equal(fixture.store.get('cflag:1:534'), 1 | (1 << 2), '失败完结位');
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('看来是接了个假任务')),
    '假任务播报',
  );
  assert(
    lines.some((l) => l.includes('-任务失败-')),
    '失败播报',
  );
});

test('RESULT_QUEST：受注计数耗尽（539 < 1）覆写为失败', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:539', 0);
  fixture.store.set('cflag:1:537', 2);
  const { result_quest } = load(fixture);
  await result_quest(1, '成功', seq_rand([1]));
  assert.equal(fixture.store.get('cflag:1:534'), 1 | (1 << 2), '失败完结位');
  assert(
    text_lines(fixture).some((l) => l.includes('看来是没有赶上')),
    '超时播报',
  );
});

test('RESULT_QUEST：E 列不持有讨伐对象时不结算', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:538', 250); // 不在 E 列头
  fixture.store.set('cflag:1:539', 50);
  const { result_quest } = load(fixture);
  const ret = await result_quest(1, '成功', seq_rand([1]));
  assert.equal(ret, 1, '函数照常返回');
  assert.equal(fixture.store.get('cflag:1:534'), 1, '534 原样（未结算）');
  assert.equal(text_lines(fixture).length, 0, '零输出');
});

// —— @QUEST_SELECT：四态 × 四线 ——

test('QUEST_SELECT：设定态（原作セット）掷定型（537/540），名前态不掷', async () => {
  const fixture = setup_world();
  const { quest_select } = load(fixture);
  await quest_select(1, '设定', 0, seq_rand([1, 3])); // type = 1+1 = 2，人称 3
  assert.equal(fixture.store.get('cflag:1:537'), 2);
  assert.equal(fixture.store.get('cflag:1:540'), 3);
  // 名前态（537/540 已定型）——rand 耗尽也不掷
  const fixture2 = setup_world();
  fixture2.store.set('cflag:1:537', 2);
  fixture2.store.set('cflag:1:540', 3);
  fixture2.store.set('cflag:1:538', 100);
  const { quest_select: qs2 } = load(fixture2);
  await qs2(1, '名前', 0, seq_rand([5]));
  assert.equal(fixture2.store.get('cflag:1:537'), 2, '不覆写');
});

test('QUEST_SELECT：quest_line 1/2/3 的行内拼接形态（CHARA_INFO_SHOW 用）', async () => {
  const base = () => {
    const f = setup_world();
    f.store.set('cflag:1:537', 1);
    f.store.set('cflag:1:540', 1); // 千金
    f.store.set('cflag:1:538', 100);
    f.store.set('cflag:1:536', 0b10011); // bit0 boss + bit1 陷阱 + bit4 性要求
    return f;
  };
  // line 1：任务名行内（不换行、无明细/讨伐对象）
  const f1 = base();
  await load(f1).quest_select(1, '名前', 1, seq_rand([1]));
  const l1 = text_lines(f1);
  assert.deepEqual(
    l1.filter((l) => l.includes('任务[')),
    ['任务[被掳走的千金]'],
    'line 1 仅任务名段',
  );
  // line 2：障碍聚合行内
  const f2 = base();
  await load(f2).quest_select(1, '名前', 2, seq_rand([1]));
  assert.deepEqual(
    text_lines(f2).filter((l) => l.includes('任务会有')),
    ['*任务会有BOSS战/陷阱/性要求'],
    'line 2 聚合（斜杠分隔，bit 序）',
  );
  // line 3：讨伐对象行内（越过了名前守卫）
  const f3 = base();
  await load(f3).quest_select(1, '成功', 3, seq_rand([1]));
  assert.deepEqual(
    text_lines(f3).filter((l) => l.includes('讨伐对象')),
    ['*讨伐对象是狗头人'],
    'line 3 越过名前守卫',
  );
});

test('QUEST_SELECT：失敗态 9 档链按掷序先中（rand(10)==0 第一档）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:537', 1);
  fixture.store.set('cflag:1:540', 0);
  fixture.store.set('cflag:1:538', 100);
  const { quest_select } = load(fixture);
  await quest_select(1, '失败', 0, seq_rand([0]));
  assert(
    text_lines(fixture).some((l) => l.includes('几经凌辱、怀孕了')),
    '第一档',
  );
  // 掷到第五档（rand 10/9/8/7/6 依次非 0，rand(5) == 0）
  const f2 = setup_world();
  f2.store.set('cflag:1:537', 1);
  await load(f2).quest_select(1, '失败', 0, seq_rand([1, 1, 1, 1, 1, 0]));
  assert(
    text_lines(f2).some((l) =>
      l.includes('的乳房变得肥大、被改造成了绝顶喷乳的家畜'),
    ),
    '第六档（乳房肥大喷乳）',
  );
});

// —— @QUEST_BATTLE_SET：三态与障碍 ——

test('QUEST_BATTLE_SET：非受注中 → 0（普通战斗）；受注计数仍递减', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 0);
  fixture.store.set('cflag:1:539', 10);
  const { quest_battle_set } = load(fixture);
  // 539 递减不掷；掷点 rand(3)=0 命中但 534 != 1 → continue
  const ret = await quest_battle_set(1, seq_rand([0]));
  assert.equal(ret, 0, 'QUEST_ON 0');
  assert.equal(fixture.store.get('cflag:1:539'), 9, '计数在掷点前递减');
});

test('QUEST_BATTLE_SET：受注中且 E 列命中 → 2（任务战斗）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:538', 100);
  fixture.store.set('cflag:1:539', 10);
  fixture.store.set('cflag:1:536', 0); // 无障碍
  const { quest_battle_set } = load(fixture);
  const ret = await quest_battle_set(1, seq_rand([0]));
  assert.equal(ret, 2, 'QUEST_ON 2');
  assert(
    text_lines(fixture).some((l) => l.includes('*任务战斗发生*')),
    '发生播报',
  );
});

test('QUEST_BATTLE_SET：bit0（BOSS 战）把 E 第三列 boss 化', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:538', 100);
  fixture.store.set('cflag:1:536', 1 << 0);
  const { quest_battle_set } = load(fixture);
  await quest_battle_set(1, seq_rand([0]));
  assert.equal(fixture.store.get('e:208'), 1, 'E:208 = 1（boss 位）');
  assert.equal(fixture.store.get('e:299'), 1, 'E:299 = 1（数量）');
});

test('QUEST_BATTLE_SET：bit3（大量敌人）覆写为 15 只', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:538', 100);
  fixture.store.set('cflag:1:536', 1 << 3);
  const { quest_battle_set } = load(fixture);
  await quest_battle_set(1, seq_rand([0]));
  assert.equal(fixture.store.get('e:208'), 0, 'boss 位清 0');
  assert.equal(fixture.store.get('e:299'), 15, '15 只');
});

test('QUEST_BATTLE_SET：bit4（性要求）交涉值掷过 100 → QUEST_BITCH 完结、RETURN 1', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:538', 100);
  fixture.store.set('cflag:1:536', 1 << 4);
  fixture.store.set('cflag:1:16', 5); // 初吻已有对象（判定不触发 995 写）
  fixture.store.set('flag:10005', 1); // era_flag.target = 勇者本人
  const { quest_battle_set } = load(fixture);
  // rand 序：掷点 rand(3)=0；交涉 rand(local)=101 > 100
  const ret = await quest_battle_set(1, seq_rand([0, 101]));
  assert.equal(ret, 1, 'RETURN 1（性奉侍完结）');
  assert.equal(
    fixture.store.get('cflag:1:534'),
    1 | (1 << 1),
    '534 置成功完结位',
  );
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('性方面的需求')),
    '交涉开场',
  );
  assert(
    lines.some((l) => l.includes('口交经验+3')),
    'QUEST_BITCH 亜人段执行（E 列 3 只）',
  );
  assert(
    lines.some((l) => l.includes('*任务成功*')),
    '完结播报',
  );
});

test('QUEST_BATTLE_SET：交涉值补正（娼妇出身 +30 / 卖淫经验 / 低善恶两档）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:538', 100);
  fixture.store.set('cflag:1:536', 1 << 4);
  fixture.store.set('talent:1:315', 5); // 娼妇
  fixture.store.set('exp:1:74', 10); // 卖淫经验
  fixture.store.set('cflag:1:151', -100); // 善恶 < -60（两档都中）
  const { quest_battle_set } = load(fixture);
  // base 100 + 30 + 10 + 10 + 20 = 170；掷 170 之内 166 > 100 仍成功
  const ret = await quest_battle_set(1, seq_rand([0, 166]));
  assert.equal(ret, 1, '补正叠加后交涉成功');
});

test('QUEST_BATTLE_SET：交涉失败 → 回绝播报、QUEST_ON 2', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:534', 1);
  fixture.store.set('cflag:1:538', 100);
  fixture.store.set('cflag:1:536', 1 << 4);
  const { quest_battle_set } = load(fixture);
  const ret = await quest_battle_set(1, seq_rand([0, 50])); // 50 ≤ 100
  assert.equal(ret, 2, '照常任务战斗');
  assert(
    text_lines(fixture).some((l) => l.includes('用愤怒的话语回绝了')),
    '回绝播报',
  );
});

// —— @QUEST_BITCH 12 段：经验/点数累加逐条（验收点名）——

/** 12 段的落点表：[导出名, 有阴茎臂 {键:期望}, 无阴茎臂 {键:期望}]（E 列 7 只） */
const BITCH_SECTIONS = [
  [
    'orc_quest_bitch',
    { 'exp:1:22': 7, 'exp:1:20': 7 },
    { 'exp:1:22': 7, 'exp:1:20': 7 },
  ],
  ['slime_quest_bitch', { 'juel:1:0': 7 }, { 'juel:1:0': 7 }],
  // 无阴茎臂的私处经验是 +1（:747 EXP:ARG:0 += 1），不是 += MONNUM
  ['insect_quest_bitch', { 'juel:1:0': 7 }, { 'exp:1:0': 1 }],
  [
    'ivy_quest_bitch',
    { 'juel:1:9': 7, 'juel:1:10': 7 },
    { 'juel:1:9': 7, 'juel:1:10': 7 },
  ],
  ['syokusyu_quest_bitch', { 'juel:1:0': 7 }, { 'exp:1:0': 1, 'juel:1:0': 7 }],
  ['faily_quest_bitch', { 'juel:1:0': 7 }, { 'juel:1:0': 7 }],
  [
    'giant_quest_bitch',
    { 'exp:1:22': 7, 'exp:1:20': 7 },
    { 'exp:1:22': 7, 'exp:1:20': 7 },
  ],
  [
    'man_quest_bitch',
    { 'exp:1:22': 7, 'exp:1:20': 7 },
    { 'exp:1:22': 7, 'exp:1:20': 7 },
  ],
  ['girl_quest_bitch', { 'juel:1:0': 7 }, { 'juel:1:0': 7 }],
  [
    'beast_quest_bitch',
    { 'exp:1:22': 7, 'exp:1:20': 7, 'exp:1:56': 7 },
    { 'exp:1:22': 7, 'exp:1:20': 7, 'exp:1:56': 7 },
  ],
  ['brain_quest_bitch', { 'juel:1:0': 7 }, { 'juel:1:0': 7 }],
  [
    'horse_quest_bitch',
    { 'exp:1:22': 7, 'exp:1:20': 7, 'exp:1:56': 7 },
    { 'exp:1:22': 7, 'exp:1:20': 7, 'exp:1:56': 7 },
  ],
];

for (const [fn_name, dick_writes, plain_writes] of BITCH_SECTIONS) {
  for (const [arm, writes] of [
    ['有阴茎（扶她 121）', dick_writes],
    ['无阴茎（女性）', plain_writes],
  ]) {
    test(`QUEST_BITCH 段 ${fn_name}（${arm}）：${Object.keys(writes)
      .map((k) => `${k}=${writes[k]}`)
      .join(' + ')}`, async () => {
      const fixture = setup_world();
      fixture.store.set('e:99', 7); // E 列 7 只
      fixture.store.set('flag:10005', 1); // era_flag.target = 勇者（初吻/失贞判定对象）
      fixture.store.set('cflag:1:16', 5); // 初吻已有对象
      if (arm.startsWith('有阴茎')) {
        fixture.store.set('talent:1:121', 1); // 扶她
      }
      const mod = load(fixture);
      await mod[fn_name](1, 0, seq_rand([1]));
      for (const [key, want] of Object.entries(writes)) {
        assert.equal(fixture.store.get(key), want, `${key} 落账`);
      }
      // 两臂并集之外的键不写（对照）
      const all_keys = new Set([
        ...Object.keys(dick_writes),
        ...Object.keys(plain_writes),
      ]);
      for (const other of [
        'exp:1:22',
        'exp:1:20',
        'exp:1:56',
        'exp:1:0',
        'juel:1:0',
        'juel:1:9',
        'juel:1:10',
      ]) {
        if (!all_keys.has(other)) {
          assert.equal(fixture.store.get(other), undefined, `${other} 不写`);
        }
      }
      // 初吻判定（省略角色号 → TARGET = 1；已有对象则不动）
      assert.equal(fixture.store.get('cflag:1:16'), 5, '初吻对象不动（非 -1）');
      const lines = text_lines(fixture);
      assert(
        lines.some((l) => l.includes('服从了命令') || l.includes('慢慢地')),
        `演出行在场（${lines[0] ?? '无输出'}）`,
      );
    });
  }
}

test('QUEST_BITCH 初吻判定：cflag:16 == -1 → 995（打在 TARGET 上，非 ARG）', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:10005', 0); // era_flag.target = 魔王 0（≠ ARG 1）
  fixture.store.set('cflag:0:16', -1); // TARGET（魔王）初吻未经验
  fixture.store.set('cflag:1:16', -1); // ARG（勇者）同样 -1——不应被打上
  const { orc_quest_bitch } = load(fixture);
  await orc_quest_bitch(1, 0, seq_rand([1]));
  assert.equal(
    fixture.store.get('cflag:0:16'),
    995,
    'TARGET（魔王）被打上 995',
  );
  assert.equal(
    fixture.store.get('cflag:1:16'),
    -1,
    'ARG（勇者）不动——原作省略角色号语义',
  );
});

test('QUEST_BITCH 分派：按 E 列凌辱类型分派、空列跳过；失贞段（TARGET）', async () => {
  const fixture = setup_world();
  // 第一列空（数量 0）、第二列触手（type5 ×4）
  fixture.store.set('e:99', 0);
  fixture.store.set('e:100', 100);
  fixture.store.set('e:107', 5);
  fixture.store.set('e:199', 4);
  // TARGET 与 ARG 分离（魔王 0 vs 奉侍者 1）：两侧都备私处经验与处女，
  // 失贞应打在 TARGET（魔王）上——变异改读 ARG 时勇者侧被动（M653 靶）
  fixture.store.set('flag:10005', 0);
  fixture.store.set('cflag:1:16', 5);
  fixture.store.set('exp:1:0', 3);
  fixture.store.set('talent:1:0', 1);
  fixture.store.set('exp:0:0', 3);
  fixture.store.set('talent:0:0', 1);
  const { quest_bitch } = load(fixture);
  const ret = await quest_bitch(1, seq_rand([1]));
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('exp:1:0'), 4, '触手无阴茎臂：EXP:0 += 1');
  assert.equal(fixture.store.get('juel:1:0'), 4, 'JUEL:0 += 4');
  assert.equal(fixture.store.get('talent:0:0'), 0, '失贞：处女素质消去');
  assert.equal(
    fixture.store.get('cflag:0:15'),
    104,
    '初体验对象 = 104（怪物）',
  );
  assert.equal(
    fixture.store.get('talent:1:0'),
    1,
    '奉侍者（ARG）的处女不动——省略角色号语义',
  );
  assert(
    text_lines(fixture).some((l) => l.includes('【处女丧失】')),
    '失贞播报',
  );
});
