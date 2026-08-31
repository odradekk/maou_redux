/**
 * ere/dungeon/dungeon-town.js 全量 15 函数的行为测试（issue #178，H9）。
 *
 * 缝 = test/helpers/era-fixture.js。随机经函数级 rand 参数注入定值序
 * （seq_rand 原样吐给定值，耗尽后 99 % n）。
 *
 * 验收对应（#178 清单）：
 *   - **借贷 → 还债 → 保证人**三段的金额流转有测试，含边界（还不起时
 *     的分支）：利息截断、还款分档、百元取整、上限钳（min > max 时取
 *     上限）、债务清零、借不到（-50000）、担保人按魔王等级背债；
 *   - 冒险计划的目标/出发阶层与 COST 落账；重度借债分支的 GOAL 笔误
 *     （守卫关 → 第一层闲逛，#14）有钉子；
 *   - 宴会预算段的 TARGET 残留读（收集与支付不对称）有钉子；
 *   - 城镇主流程：507 复位、再起点消耗与全恢复、散会概率。
 *
 * 本票核心移植裁定的钉子：省略角色号 = TARGET（FI_FUNDING 补正、还款
 * 分档、宴会预算全读 era_flag.target，原作不设 TARGET 读残留）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

function load(fixture, name = 'dungeon/dungeon-town') {
  return fixture.load_module(name);
}

/** 定值随机源：依次吐 given（原样），耗尽后恒 99 % n */
function seq_rand(given) {
  const q = [...given];
  return (n) => (q.length > 0 ? q.shift() : 99 % n);
}

/**
 * 最小世界：魔王 0（等级 10）+ 勇者 1（等级 5、侵攻中）。era_flag.target
 * = 1（flag:10005）——省略角色号读写的对象。
 */
function setup_world() {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.seed_chara(1, { id: 1, name: '阿尔', callname: '阿尔' });
  fixture.era.addCharacter(0);
  fixture.era.addCharacter(1);
  fixture.store.set('cflag:0:9', 10); // 魔王等级
  fixture.store.set('cflag:1:9', 5); // 勇者等级
  fixture.store.set('cflag:1:1', 2);
  fixture.store.set('cflag:1:531', 0);
  fixture.store.set('cflag:1:532', 0);
  fixture.store.set('cflag:1:520', 8);
  fixture.store.set('cflag:1:501', 1);
  for (const cid of [0, 1]) {
    fixture.store.set(`maxbase:${cid}:0`, 2000);
    fixture.store.set(`maxbase:${cid}:1`, 1000);
    fixture.store.set(`base:${cid}:0`, 800);
    fixture.store.set(`base:${cid}:1`, 400);
  }
  fixture.store.set('flag:10005', 1); // era_flag.target = 勇者 1
  return fixture;
}

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

// —— 存根清单核对 ——

test('存根清单可检索：docs/stub-registry.md 收录城镇文件的新增存根', () => {
  const fixture = create_era_fixture();
  const fs = require('node:fs');
  const path = require('node:path');
  const registry = fs.readFileSync(
    path.resolve(__dirname, '..', 'docs', 'stub-registry.md'),
    'utf8',
  );
  const names = [...load(fixture).STUBBED_CALLS];
  assert.ok(names.length >= 7, `名单 ${names.length} 条（应 ≥ 7）`);
  for (const name of names) {
    assert(registry.includes(name), `存根清单缺少 ${name}`);
  }
});

// —— 援助金（FI_FUNDING / FI_PT_FUNDING）——

test('FI_FUNDING：补正全读 TARGET（ARG ≠ TARGET 时按 TARGET 算）', () => {
  const fixture = setup_world();
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(2);
  // TARGET = 勇者 1：高人气 +1000、出身贵族(8) +1500、契机受命(9) +500、
  // 善恶 30 → +300、等级 5 → +40。ARG 传贝丝 2（无任何补正、等级 0）——
  // 若按 ARG 算会得到 0
  fixture.store.set('talent:1:126', 1); // 高人气
  fixture.store.set('talent:1:315', 8); // 出身：贵族
  fixture.store.set('talent:1:316', 9); // 契机：受命
  fixture.store.set('cflag:1:151', 30); // 善恶 30
  const { fi_funding } = load(fixture);
  assert.equal(
    fi_funding(2),
    1000 + 1500 + 500 + 300 + 5 * 8,
    '按 TARGET（勇者）算，不按 ARG（贝丝）',
  );
  assert.equal(
    fi_funding(1),
    1000 + 1500 + 500 + 300 + 5 * 8,
    'ARG = TARGET 同值',
  );
  assert.equal(fi_funding(-1), 0, '空位 0');
  // 魔王 0 号同样是 ARG <= 0 的空位语义（原作 :160-161 1:1）
  assert.equal(fi_funding(0), 0, 'ARG 0（魔王号）被空位检查挡下');
});

test('FI_FUNDING：负补正（乞丐 -500 / 为钱 -1000）可到负值', () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:315', 7); // 乞丐
  fixture.store.set('talent:1:316', 2); // 为钱
  const { fi_funding } = load(fixture);
  assert.equal(fi_funding(1), -500 - 1000 + 5 * 8, '-1460');
});

test('FI_PT_FUNDING：三人合计下限 1', () => {
  const fixture = setup_world();
  const { fi_pt_funding } = load(fixture);
  assert.equal(fi_pt_funding(1, 0, 0), 5 * 8, '单人是等级补正');
  // 全负：直接构造 TARGET 无补正 + 三空位（0 队员时 fi_funding 全 0 → max(0,1)）
  assert.equal(fi_pt_funding(-1, -1, -1), 1, '下限 1');
});

// —— TOWN_SELL / TOWN_HOSHOUNIN ——

test('TOWN_SELL：战利品槽 581 并入所持金并清零', () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:580', 1000);
  fixture.store.set('cflag:1:581', 250);
  const { town_sell } = load(fixture);
  town_sell(1);
  assert.equal(fixture.store.get('cflag:1:580'), 1250);
  assert.equal(fixture.store.get('cflag:1:581'), 0);
  // 581 为 0 / 空位不动
  const f2 = setup_world();
  load(f2).town_sell(1);
  assert.equal(f2.store.get('cflag:1:580'), undefined, '无战利品不动作');
});

test('TOWN_HOSHOUNIN：担保人按魔王等级背债（lv10 × 8 + 500 = 580）', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:209', 1); // 担保人
  fixture.store.set('cflag:1:582', -1000);
  await load(fixture).town_hoshounin(1);
  assert.equal(fixture.store.get('cflag:1:582'), -1580);
  // 非担保人不动作
  const f2 = setup_world();
  f2.store.set('cflag:1:582', -1000);
  await load(f2).town_hoshounin(1);
  assert.equal(f2.store.get('cflag:1:582'), -1000);
});

// —— @TOWN_HENSAI：还债（验收点名的三段之一，含边界）——

test('TOWN_HENSAI：利息按向零截断（-1234 → -1357）且总可见', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', -1234);
  fixture.store.set('cflag:1:580', 0); // 无钱可还 → 还款 0
  await load(fixture).town_hensai(1);
  assert.equal(
    fixture.store.get('cflag:1:582'),
    -1357,
    '-1234 + trunc(-1234/10) = -1357',
  );
  assert(
    text_lines(fixture).some((l) => l.includes('债务变成了-1357')),
    '利息播报无守卫（FLAG:5 位 32 关）',
  );
});

test('TOWN_HENSAI：大额债务按 TARGET 善恶分档还（karma 0 → 1/6）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', -6000);
  fixture.store.set('cflag:1:580', 20000);
  // karma(TARGET=1) = 0 → CASE > -20 → LOCAL 6；6000/6 = 1000 → 百元取整 1000
  // → LIMIT(1000, 100, 10000) = 1000 → MIN(1000, 6000, 10000) = 1000
  await load(fixture).town_hensai(1);
  // 先加息：-6000 + -600 = -6600；还款 6600/6 = 1100
  assert.equal(
    fixture.store.get('cflag:1:582'),
    -6600 + 1100,
    '加利息后还 1100',
  );
  assert.equal(fixture.store.get('cflag:1:580'), 20000 - 1100);
});

test('TOWN_HENSAI：还款分档读 TARGET 而非本人（ARG ≠ TARGET）', async () => {
  const fixture = setup_world();
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(2);
  fixture.store.set('cflag:2:582', -6000);
  fixture.store.set('cflag:2:580', 20000);
  fixture.store.set('cflag:2:151', 200); // 本人 karma 200（若按本人算 → 1/2 档）
  fixture.store.set('cflag:1:151', 0); // TARGET karma 0 → 1/6 档
  await load(fixture).town_hensai(2);
  // 按 TARGET（1/6）：-6600 + 1100；若按本人（1/2）：-6600 + 3300
  assert.equal(
    fixture.store.get('cflag:2:582'),
    -5500,
    '分档按 TARGET 的 karma',
  );
});

test('TOWN_HENSAI：小额债务固定还 500、不越债务（-300 → 清零）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', -300);
  fixture.store.set('cflag:1:580', 2000);
  await load(fixture).town_hensai(1);
  // 加息 -300 + -30 = -330；还款 min(500, 330, 1000) = 330 → 债务清零
  assert.equal(
    fixture.store.get('cflag:1:582'),
    0,
    '借金の金額は越えないように',
  );
  assert.equal(fixture.store.get('cflag:1:580'), 2000 - 330);
});

test('TOWN_HENSAI：还不起（所持金 < 200 → 上限 < 下限，LIMIT 取上限后取整为 0）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', -300);
  fixture.store.set('cflag:1:580', 100); // 100/2 = 50 < 100（min > max）
  await load(fixture).town_hensai(1);
  // LIMIT(500, 100, 50) = 50 → trunc(50/100)*100 = 0 → MIN(0, 330, 50) = 0
  assert.equal(fixture.store.get('cflag:1:582'), -330, '只加息不还款');
  assert.equal(fixture.store.get('cflag:1:580'), 100, '分文未动');
});

test('TOWN_HENSAI：百元取整（上限 250 → 还 200）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', -300);
  fixture.store.set('cflag:1:580', 500); // 500/2 = 250 → trunc(250/100)*100 = 200
  await load(fixture).town_hensai(1);
  assert.equal(fixture.store.get('cflag:1:582'), -330 + 200, '还 200');
  assert.equal(fixture.store.get('cflag:1:580'), 500 - 200);
});

test('TOWN_HENSAI：无债直接返回（零输出、不动账）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', 0);
  fixture.store.set('cflag:1:580', 5000);
  await load(fixture).town_hensai(1);
  assert.equal(fixture.store.get('cflag:1:580'), 5000);
  assert.equal(text_lines(fixture).length, 0);
});

// —— @TOWN_LOAN：借款 ——

test('TOWN_LOAN：债务 < -50000 再也没人肯借', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', -50001);
  fixture.store.set('cflag:1:580', 0);
  await load(fixture).town_loan(1, seq_rand([0])); // 掷点再小也不借
  assert.equal(fixture.store.get('cflag:1:582'), -50001);
  assert.equal(fixture.store.get('cflag:1:580'), 0);
});

test('TOWN_LOAN：（260 + 善恶）面骰 < 50 借入 1000', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:582', 0);
  fixture.store.set('cflag:1:580', 0);
  fixture.store.set('cflag:1:151', -100); // 260-100 = 160 面
  const { town_loan } = load(fixture);
  await town_loan(1, seq_rand([49])); // < 50 → 借
  assert.equal(fixture.store.get('cflag:1:582'), -1000);
  assert.equal(fixture.store.get('cflag:1:580'), 1000);
  const f2 = setup_world();
  f2.store.set('cflag:2:151', 0);
  await load(f2).town_loan(1, seq_rand([50])); // ≥ 50 → 不借
  assert.equal(f2.store.get('cflag:1:580'), undefined);
});

// —— 借贷三段金额流转（验收点名）——

test('借贷三段连转：担保人背债 → 加息偿还 → 金额守恒', async () => {
  const fixture = setup_world();
  const { town_hoshounin, town_hensai, town_loan } = load(fixture);
  // 初态：所持金 8000、无债
  fixture.store.set('cflag:1:580', 8000);
  fixture.store.set('cflag:1:582', 0);
  fixture.store.set('talent:1:209', 1); // 担保人
  // ① 担保人背债：-580（魔王 lv10 × 8 + 500）
  await town_hoshounin(1);
  assert.equal(fixture.store.get('cflag:1:582'), -580);
  // ② 借款补口（ karma 0 → 260 面，掷 10 < 50）
  await town_loan(1, seq_rand([10]));
  assert.equal(fixture.store.get('cflag:1:582'), -1580);
  assert.equal(fixture.store.get('cflag:1:580'), 9000);
  // ③ 还债：加息 -1580 + -158 = -1738（< -500 走分档：karma 0 → 1/6 →
  //    trunc(1738/6) = 289 → 百元取整 200 → MIN(200, 1738, 4500) = 200）
  await town_hensai(1);
  assert.equal(fixture.store.get('cflag:1:582'), -1738 + 200, '-1538');
  assert.equal(fixture.store.get('cflag:1:580'), 9000 - 200, '8800');
  // 守恒：总资产（580 + 582）只受利息与担保人新增债侵蚀
  const total =
    fixture.store.get('cflag:1:580') + fixture.store.get('cflag:1:582');
  assert.equal(
    total,
    8000 - 158 - 580,
    '利息 158 + 担保人背债 580 是仅有的净流出',
  );
});

// —— 采购 ——

test('TOWN_SHOPPING：3000 门槛 + ADD_EX_ITEM 存根恒 0 = 不扣款', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:580', 2999);
  const { town_shopping } = load(fixture);
  await town_shopping(1);
  assert.equal(fixture.store.get('cflag:1:580'), 2999, '钱不够不买');
  const f2 = setup_world();
  f2.store.set('cflag:1:580', 3000);
  await load(f2).town_shopping(1);
  assert.equal(
    f2.store.get('cflag:1:580'),
    3000,
    '买到与否取决于 RESULT（存根恒 0 → 不扣）',
  );
});

// —— @TOWN_PT_PLANNING ——

test('PLANNING：英雄类素质（自信家 161）直奔 8 层', async () => {
  const fixture = setup_world();
  fixture.store.set('talent:1:161', 1); // 自信家
  fixture.store.set('cflag:1:520', 3);
  await load(fixture).town_pt_planning(1, 0, 0, seq_rand([1]));
  assert.equal(fixture.store.get('cflag:1:520'), 8, '目标阶层 8');
});

test('PLANNING：无债（loan_pt > -7000）走 INTO_DEEPER（FLOOR_MAX + 1，封顶 8）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:520', 7);
  fixture.store.set('cflag:1:580', 0);
  fixture.store.set('cflag:1:582', 0);
  // 无债即臂 3（借金がぜんぜん無い）：不掷点直取深潜
  await load(fixture).town_pt_planning(1, 0, 0, seq_rand([1]));
  assert.equal(
    fixture.store.get('cflag:1:520'),
    8,
    'FLOOR_MAX+1 = 8（LIMIT 上限）',
  );
  assert.equal(
    fixture.store.get('cflag:1:501'),
    7,
    'START = 8 → LIMIT(8,1,7) = 7',
  );
});

test('PLANNING：中债（loan_pt ≤ -7000 且人均收支 > -7000）走慎重层', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:520', 4);
  fixture.store.set('cflag:1:580', 5000);
  fixture.store.set('cflag:1:582', -7500); // balance = -2500 > -7000（避臂2）
  // rand(2) 给 1（不 GOTO）→ 慎重：GOAL = max(trunc(4/2), 4, 1) = 4、START = 4
  await load(fixture).town_pt_planning(1, 0, 0, seq_rand([1]));
  assert.equal(fixture.store.get('cflag:1:520'), 4, 'GOAL 4');
  assert.equal(fixture.store.get('cflag:1:501'), 4, 'START 4');
  // COST = 4 × min(500 + 40, 900) = 4 × 540 = 2160（魔王 lv10）
  assert.equal(fixture.store.get('cflag:1:582'), -7500 - 2160, 'COST 记入借款');
});

test('PLANNING：重度借债在守卫关闭时 GOAL 笔误 → 第一层闲逛（#14 钉子）', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:520', 6);
  fixture.store.set('cflag:1:580', 0);
  fixture.store.set('cflag:1:582', -15000); // karma 0 → 档 0 = -11000，loan_min 越线
  // rand(4) 给 4（不 GOTO）；FLAG:5 无位 32 → GOAL/START 赋值不发生
  await load(fixture).town_pt_planning(1, 0, 0, seq_rand([4]));
  assert.equal(
    fixture.store.get('cflag:1:520'),
    0,
    'GOAL 0（闲逛）——原作赋值误嵌调试守卫',
  );
  assert.equal(fixture.store.get('cflag:1:501'), 1, 'START = LIMIT(0,1,7) = 1');
  assert.equal(fixture.store.get('cflag:1:582'), -15000, 'COST = 0 不再记债');
});

// —— @TOWN_PT_PARTY ——

test('PARTY：预算收集读 TARGET 残留（与支付不对称的原作行为）', async () => {
  const fixture = setup_world();
  fixture.seed_chara(2, { id: 2, name: '贝丝', callname: '贝丝' });
  fixture.era.addCharacter(2);
  fixture.store.set('cflag:1:531', 2); // 贝丝入队
  fixture.store.set('flag:10005', 1); // TARGET = 勇者 1
  fixture.store.set('cflag:1:580', 5000); // TARGET 的钱袋
  fixture.store.set('cflag:2:580', 0); // 贝丝身无分文
  fixture.store.set('flag:5', 32); // 宴会开场打印有守卫
  fixture.store.set('cflag:1:151', 100); // karma > 50 → 早睡（演出最短臂）
  fixture.store.set('cflag:2:151', 100);
  // 预算：TARGET(1) 的 5000 ≥ 1000 → 两人的 COST 各 = 1000（贝丝没钱也记 1000）
  await load(fixture).town_pt_party(1, 2, 0, seq_rand([1]));
  assert.equal(fixture.store.get('cflag:1:580'), 5000 - 1000, '队长扣 1000');
  assert.equal(
    fixture.store.get('cflag:2:580'),
    -1000,
    '贝丝被记了同一份飲み代（不对称）',
  );
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('丰盛的晚宴')),
    '宴会开场',
  );
  assert(
    lines.some((l) => l.includes('为了备战冒险早早就寝了')),
    '早睡臂',
  );
});

test('PARTY：TARGET 钱袋 < 1000 → 流局（零支付零演出）', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:10005', 1);
  fixture.store.set('cflag:1:580', 500); // TARGET 的钱 < 1000
  const ret = await load(fixture).town_pt_party(1, 0, 0, seq_rand([1]));
  assert.equal(ret, 0, '流局');
  assert.equal(fixture.store.get('cflag:1:580'), 500, '不动账');
});

test('PARTY：karma ≤ 50 恒进第二臂——巫女（206）的祈祷臂不达（#14 钉子）', async () => {
  const fixture = setup_world();
  fixture.store.set('flag:10005', 1);
  fixture.store.set('cflag:1:580', 2000);
  fixture.store.set('cflag:1:151', 0); // karma ≤ 50
  fixture.store.set('talent:1:206', 1); // 巫女——祈祷条件满足也无臂可达
  const ret = await load(fixture).town_pt_party(1, 0, 0, seq_rand([1]));
  assert.equal(ret, 1, '开宴');
  const lines = text_lines(fixture);
  assert(
    !lines.some((l) => l.includes('心怀祈祷地')),
    '祈祷臂恒不达（臂 3 的 karma<=50 左半恒真）',
  );
  assert(
    !lines.some((l) => l.includes('@KARMA')),
    'KARMA +1 调用点不可达（原作死代码）',
  );
  assert(!lines.some((l) => l.includes('醉醺醺')), '醉睡臂同不达');
  assert.equal(fixture.store.get('flag:10005'), 1, 'TARGET 恢复暂存值');
});

// —— 主流程 @DUNGEON_TOWN ——

test('DUNGEON_TOWN：507 复位、再起点消耗与全恢复、9/10 散会', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:507', 1); // 回城标志
  fixture.store.set('cflag:1:508', 2); // 再起点
  fixture.store.set('cflag:1:580', 5000); // TARGET 钱袋够开宴（散会概率的对照前提）
  fixture.store.set('base:1:0', 100); // 疲惫态
  fixture.store.set('base:1:1', 50);
  fixture.store.set('flag:5', 32); // 打开城镇日志守卫（看得到演出行）
  // rand 序：fi 系不掷；loan 的 rand(260) → 99 不借；rand(10) = 99 > 0 散会
  const ret = await load(fixture).dungeon_town(1, seq_rand([]));
  assert.equal(ret, 0);
  assert.equal(fixture.store.get('cflag:1:507'), 0, '回城标志复位（:24）');
  assert.equal(fixture.store.get('cflag:1:508'), 1, '再起点 -1（:87）');
  assert.equal(fixture.store.get('base:1:0'), 2000, 'HP 全恢复');
  assert.equal(fixture.store.get('base:1:1'), 1000, '气力全恢复');
  const lines = text_lines(fixture);
  assert(
    lines.some((l) => l.includes('旅馆里进行了修整')),
    '宿屋演出（守卫开）',
  );
  assert(
    lines.some((l) => l.startsWith('------')),
    '分隔线（:58）',
  );
  assert(!lines.some((l) => l.includes('晚宴')), 'rand(10) > 0 散会不开宴');
});

test('DUNGEON_TOWN：日常段换手 TARGET 并调 LOVER 存根', async () => {
  const fixture = setup_world();
  fixture.store.set('cflag:1:580', 20000); // 钱够多（避开借款分支的掷点差异）
  fixture.store.set('cflag:1:507', 1);
  await load(fixture).town_pt_dayevent(1, 0, 0);
  assert(
    text_lines(fixture).some((l) => l.includes('@DUNGEON_TOWN_LOVER')),
    '恋人事件存根占位',
  );
});
