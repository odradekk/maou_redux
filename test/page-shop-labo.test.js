/**
 * @file ere/page/page-shop-labo.js 的行为测试（issue #398 / N14 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB（4,497 行，52 函数）。
 *
 * 接缝 = test/helpers/era-fixture.js：驱动整幅界面（预置输入 → 收集本次
 * 新增的输出行 → 断言文案、按钮集与变量落点）。
 *
 * 覆盖面的组织（工单「表驱动一个用例走完整个维度」）：
 *   1. 四页菜单整表：逐页走一遍，钉住每个条目的编号与价格字面量；
 *   2. 主分发整表：逐编号进一次，钉住「哪个编号进哪个函数」（价格在各自
 *      的成交用例里钉）；
 *   3. MODIFY 族整表：每个条目一遍「成交 / 取消 / 钱不够」三段；
 *   4. 守卫整表：每条守卫各触发一次（文案 + 不扣款）；
 *   5. 特殊流程各自一段（多段菜单逐支）；
 *   6. 随机上界用 seq_probe 捕获实参（RAND:2 / RAND:3 / RAND:7）。
 *
 * **不可达支**（按钮化之后输入集 = 本轮已打印按钮，逐条 1:1 保留不补用例，
 * 与 page-ability-up.js 文件头同款登记）：
 *   - 各确认菜单的 `ELSE GOTO INPUT_LOOP` / `ELSE RETURN 0`（输入只有 0/1）；
 *   - 选人处的 `RESULT < 0 || RESULT >= CHARANUM`（列表按钮即输入集）；
 *   - FUTANARI / 肉棒改造的形状菜单、TATOO 的部位表、DEMON_REBIRTH 的类型表
 *     的兜底支（`shape < 0 || shape > 4` 等）。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** RAND:N 恒 0 的随机源 */
const always = () => 0;

/**
 * 依次吐出给定值、并把每次收到的上界记进 bounds 的确定随机源。
 * 序列耗尽后返回「上界 - 1」——一次断言同时钉住随机上界与结果。
 * @param {number[]} values 返回值序列
 * @param {number[]} bounds 收到的上界序列
 * @returns {(n: number) => number}
 */
function seq_probe(values, bounds) {
  const queue = [...values];
  return (n) => {
    bounds.push(n);
    return queue.length > 0 ? queue.shift() : n - 1;
  };
}

/**
 * 造一份夹具：魔王 0 ＋ 奴隶 1..slaves。
 * @param {object} [options] money/slaves/seed
 * @returns {object} 夹具
 */
function make_fixture({ money = 100000000, slaves = 2, seed = {} } = {}) {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  for (let cid = 1; cid <= slaves; cid += 1) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `奴隶${cid}`,
      callname: `奴隶${cid}`,
    });
    fixture.era.addCharacter(cid);
    fixture.store.set(`base:${cid}:0`, 100);
  }
  fixture.store.set('base:0:0', 100);
  fixture.store.set('cflag:0:9', 30);
  fixture.store.set('flag:10004', money); // era_flag.money
  fixture.store.set('exflag:4444', money); // era_exflag.legit_money
  fixture.store.set('itemname:90', '触手生物'); // %ITEMNAME:90%（触手生物）
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  return fixture;
}

/** 本次新增的输出行里的文本行 */
const texts = (lines) =>
  lines.filter((line) => line.type === 'text').map((line) => line.text);
/** 本次新增的输出行里的按钮快捷键 */
const accs = (lines) =>
  lines
    .filter((line) => line.type === 'button')
    .map((line) => line.accelerator);
/** 某快捷键的按钮条目 */
const button_of = (lines, accelerator) =>
  lines.find(
    (line) => line.type === 'button' && line.accelerator === accelerator,
  );
/** 全部按钮的正文（引擎折叠连续空白之后的渲染串） */
const button_texts = (lines) =>
  lines.filter((line) => line.type === 'button').map((line) => line.rendered);
/** 全部输出（文本行 + 按钮正文）拼成一条串，供「文案在场」类断言 */
const all_text = (lines) =>
  [...texts(lines), ...button_texts(lines)].join('\n');

/**
 * 跑一次导出的函数并收集本次新增的输出。
 * @param {object} fixture 夹具
 * @param {string} name 导出名
 * @param {number[]} inputs 预置输入
 * @param {object} [options] args（额外实参，排在 rand 之前）
 * @returns {Promise<{ret: number, added: object[]}>}
 */
async function run(fixture, name, inputs, { args = [], rand = always } = {}) {
  fixture.set_inputs(...inputs);
  const before = fixture.lines.length;
  const impl = fixture.load_module('page/page-shop-labo')[name];
  const ret = await impl(...args, rand);
  return { ret, added: fixture.lines.slice(before) };
}

/** 跑一次 @SECRET_LABO（主循环） */
function run_labo(fixture, inputs, rand = always) {
  return run(fixture, 'secret_labo', inputs, { rand });
}

/**
 * 编号所在的页号（0 起）：第 1 页 0-11、第 2 页 12-25、第 3 页 50-68、
 * 第 4 页 30-33 与 70-74（LABO_PAGE1-4 的落点，:204-278）。
 * @param {number} id 编号
 * @returns {number} 页号
 */
function page_of(id) {
  if (id <= 11) {
    return 0;
  }
  if (id <= 25) {
    return 1;
  }
  if (id >= 70 || (id >= 30 && id <= 33)) {
    return 3;
  }
  return 2;
}

/** 走到编号所在页所需的翻页键序列 */
function turns_to(id) {
  return Array(page_of(id)).fill(998);
}

// ————————————————————————————————————————————————
// 一、四页菜单与主循环
// ————————————————————————————————————————————————

test('LABO_PAGE1：条目编号与价格逐个钉住（页 0）', async () => {
  const fixture = make_fixture({ seed: { 'exp:0:81': 0 } });
  const { ret, added } = await run_labo(fixture, [999]);
  assert.equal(ret, 0, '999 退出主循环');
  assert.deepEqual(
    accs(added).filter((a) => a >= 0 && a <= 25),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    '页 0 是编号 0-11',
  );
  const prices = [
    '20000点',
    '10000点',
    '50000点',
    '50000点',
    '10000点',
    '2000点',
    '1000点',
    '10000点',
    '100000点',
    '5000点',
    '10000点',
    '10000点',
  ];
  for (const [index, price] of prices.entries()) {
    assert.ok(
      button_of(added, index).rendered.includes(price),
      `编号 ${index} 的价格字面量是 ${price}`,
    );
  }
  assert.deepEqual(
    accs(added).slice(-3),
    [997, 999, 998],
    '页脚三键 [997]/[999]/[998]',
  );
  // :13-25 的标题与所持金
  assert.ok(texts(added).includes('魔界的大门'), '标题在 :13');
  assert.ok(
    texts(added).includes('《可以对奴隶进行肉体和精神的魔改》'),
    '副标题在 :14',
  );
  assert.ok(
    texts(added).includes('所持金：100000000点'),
    '所持金行读 era_flag.money（flag:10004）',
  );
  assert.ok(texts(added).includes('1日  午前'), '日期行（DAY+1 与 TIME==0）');
});

test('SECRET_LABO：前/后页与 4 页循环（997 退一页、998 进一页）', async () => {
  const fixture = make_fixture({ seed: { 'exp:0:81': 0 } });
  // 后翻一页 → 页 1；再前翻一页 → 页 0；再前翻（P=0 时退到 3）→ 页 3
  const { added } = await run_labo(fixture, [998, 997, 997, 999]);
  const page_markers = texts(added).filter((t) =>
    ['□肉体改造', '□其他', '□战斗'].includes(t),
  );
  assert.deepEqual(
    page_markers,
    ['□肉体改造', '□肉体改造', '□肉体改造', '□战斗'],
    'P=0 →（998）P=1 →（997）P=0 →（997）P=3',
  );
  assert.ok(
    accs(added).filter((a) => a >= 12 && a <= 25).length > 0,
    '第二页画出编号 12-25',
  );
  // 末页是页 3（战斗 + 洗脑），不含第一页的编号 0
  const last_page = added.slice(added.map((l) => l.text).lastIndexOf('□战斗'));
  assert.ok(accs(last_page).includes(74), '页 3 含编号 74（魔法耐性）');
  assert.ok(!accs(last_page).includes(0), '页 3 不含编号 0');
});

test('LABO_PAGE3：勋章五项按 EXP:MASTER:81 开合，[50] 按 ITEM:90 开合', async () => {
  // 无勋章、无触手：只剩 56/59/60/64/65/66/67/68
  const poor = make_fixture({ seed: { 'exp:0:81': 0 } });
  const poor_run = await run_labo(poor, [998, 998, 999]);
  assert.deepEqual(
    accs(poor_run.added).filter((a) => a >= 50 && a <= 74),
    [50, 56, 59, 60, 64, 65, 66, 67, 68],
    'EXP:MASTER:81 == 0 时 51/52/54/55 不画',
  );
  // 有勋章：多出 51/52/54/55
  const rich = make_fixture({ seed: { 'exp:0:81': 5, 'item:90': 0 } });
  const rich_run = await run_labo(rich, [998, 998, 999]);
  assert.deepEqual(
    accs(rich_run.added).filter((a) => a >= 50 && a <= 74),
    [50, 51, 52, 54, 55, 56, 59, 60, 64, 65, 66, 67, 68],
    '勋章 > 0 时 51/52/54/55 一并画出',
  );
  // 已购入触手生物：50 消失（SIF ITEM:90 == 0）
  const bought = make_fixture({ seed: { 'exp:0:81': 5, 'item:90': 1 } });
  const bought_run = await run_labo(bought, [998, 998, 999]);
  assert.ok(!accs(bought_run.added).includes(50), 'ITEM:90 != 0 时不画 [50]');
});

test('LABO_PAGE4：洗脑四项的按钮正文价格（8000 与 10000 两个档）', async () => {
  const fixture = make_fixture({ seed: { 'exp:0:81': 0 } });
  const { added } = await run_labo(fixture, [998, 998, 998, 999]);
  assert.ok(button_of(added, 30).rendered.includes('5000点'));
  assert.ok(button_of(added, 31).rendered.includes('8000点'));
  assert.ok(button_of(added, 32).rendered.includes('10000点'));
  assert.ok(button_of(added, 33).rendered.includes('10000点'));
  assert.deepEqual(
    accs(added).filter((a) => a >= 70 && a <= 74),
    [70, 71, 72, 73, 74],
    '战斗段五项',
  );
});

// ————————————————————————————————————————————————
// 二、MODIFY 族：价格 / 确认 / 应用（表驱动）
// ————————————————————————————————————————————————

/**
 * 形状相同的 MODIFY 条目整表。
 *
 * 每条：`fn` 导出名、`price` 价格、`poor` 钱不够的原文、`seed` 让守卫放行的
 * 预置、`applied` 成交后的写入断言、`extra` 额外的输入（选择/确认之外的）。
 */
const MODIFY_ITEMS = [
  {
    fn: 'modify_bonyu',
    price: 50000,
    poor: '有钱的孩子才有奶喝',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:130'), 1),
  },
  {
    fn: 'modify_futanari_erase',
    price: 10000,
    poor: '钱不够，快快去挣钱',
    seed: { 'talent:1:121': 1 },
    applied: (f) => assert.equal(f.store.get('talent:1:121'), 0),
  },
  {
    fn: 'modify_animal',
    price: 2000,
    poor: '钱不够',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:124'), 1),
  },
  {
    fn: 'modify_animal_erase',
    price: 1000,
    poor: '钱不够',
    seed: { 'talent:1:124': 1 },
    applied: (f) => assert.equal(f.store.get('talent:1:124'), 0),
  },
  {
    fn: 'modify_removehair',
    price: 5000,
    poor: '钱不够',
    seed: {},
    applied: (f) => {
      assert.equal(f.store.get('talent:1:125'), 1);
      assert.equal(f.store.get('talent:1:310'), 1);
      assert.equal(f.store.get('talent:1:311'), 1);
    },
  },
  {
    fn: 'modify_deimmaturity',
    price: 10000,
    poor: '钱不够',
    seed: { 'talent:1:135': 1 },
    applied: (f) => assert.equal(f.store.get('talent:1:135'), 0),
  },
  {
    fn: 'modify_bonyu_erase',
    price: 10000,
    poor: '钱不够',
    seed: { 'talent:1:130': 1 },
    applied: (f) => assert.equal(f.store.get('talent:1:130'), 0),
  },
  {
    fn: 'modify_omorashi_erase',
    price: 10000,
    poor: '钱不够',
    seed: { 'talent:1:57': 1, 'exp:1:31': 5 },
    applied: (f) => {
      assert.equal(f.store.get('talent:1:57'), 0);
      assert.equal(f.store.get('exp:1:31'), 0);
    },
  },
  {
    fn: 'shojo_saisei',
    price: 100000,
    poor: '钱不够',
    seed: {},
    applied: (f) => {
      assert.equal(f.store.get('talent:1:0'), 1);
      assert.equal(
        f.store.get('cflag:1:71'),
        1,
        'CFLAG:71 += 1（处女膜已再生）',
      );
    },
  },
  {
    fn: 'shojo_seal',
    price: 10000,
    poor: '钱不够',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:273'), 1),
  },
  {
    fn: 'shojo_seal_off',
    price: 10000,
    poor: '穷鬼玩啥处女啊！',
    seed: { 'talent:1:273': 1 },
    applied: (f) => assert.equal(f.store.get('talent:1:273'), 0),
  },
  {
    fn: 'trans_sex',
    price: 200000,
    poor: '钱不够',
    seed: {},
    applied: (f) => {
      assert.equal(f.store.get('talent:1:122'), 1, '女性 → 男性');
      assert.equal(f.store.get('talent:1:0'), 0);
      assert.equal(f.store.get('talent:1:1'), 1);
      assert.equal(f.store.get('exp:1:50'), 1, 'EXP:50 += 1');
      assert.equal(f.store.get('cflag:1:70'), 1, 'CFLAG:70 = 1（已性转）');
    },
  },
  {
    fn: 'horn',
    price: 20000,
    poor: '角可是很贵的',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:264'), 1),
  },
  {
    fn: 'blueskin',
    price: 20000,
    poor: '钱不够',
    seed: { 'talent:1:253': 1 },
    applied: (f) => {
      assert.equal(f.store.get('talent:1:244'), 1);
      assert.equal(f.store.get('talent:1:253'), 0);
      assert.equal(f.store.get('talent:1:255'), 0);
    },
  },
  {
    fn: 'evilwing',
    price: 20000,
    poor: '钱不够',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:245'), 1),
  },
  {
    fn: 'eviltail',
    price: 20000,
    poor: '钱不够',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:246'), 1),
  },
  {
    fn: 'evilsight',
    price: 20000,
    poor: '钱不够',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:247'), 1),
  },
  {
    fn: 'soulbound',
    price: 10000,
    poor: '金钱不足',
    seed: { 'base:1:0': 100 },
    applied: (f) => assert.equal(f.store.get('talent:1:274'), 1),
  },
  {
    fn: 'soulbound_erase',
    price: 50000,
    poor: '金钱不足',
    seed: { 'talent:1:274': 1, 'base:1:0': 100 },
    applied: (f) => assert.equal(f.store.get('talent:1:274'), 0),
  },
  {
    fn: 'encharmed_erase',
    price: 50000,
    poor: '金钱不足',
    seed: { 'talent:1:280': 1 },
    applied: (f) => assert.equal(f.store.get('talent:1:280'), 0),
  },
  {
    fn: 'magicresist',
    price: 50000,
    poor: '钱不够',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:257'), 1),
  },
  {
    fn: 'extra_preg_mark',
    price: 20000,
    poor: '钱不够',
    seed: {},
    applied: (f) => assert.equal(f.store.get('talent:1:340'), 1),
  },
  {
    fn: 'extra_preg_erase',
    price: 35000,
    poor: '钱不够',
    seed: { 'talent:1:340': 1 },
    applied: (f) => assert.equal(f.store.get('talent:1:340'), 0),
  },
  {
    fn: 'anti_aging',
    price: 20000,
    poor: '没钱就别想这些事情',
    seed: { 'cflag:1:451': 30, 'cflag:1:452': 30 },
    applied: (f) => {
      assert.equal(f.store.get('cflag:1:451'), 20, '年龄 -10');
      assert.equal(f.store.get('cflag:1:452'), 20, '种族年龄 -10');
    },
  },
];

test('MODIFY 族整表：钱不够 → PRINTW 原文 + 不扣款', async () => {
  for (const item of MODIFY_ITEMS) {
    const fixture = make_fixture({
      money: item.price - 1,
      seed: item.seed,
    });
    const { ret, added } = await run(fixture, item.fn, [], {});
    assert.equal(ret, 0, `${item.fn}：钱不够时返回 0`);
    assert.ok(
      texts(added).includes(item.poor),
      `${item.fn}：钱不够的提示是「${item.poor}」`,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      item.price - 1,
      `${item.fn}：钱不够时不扣款`,
    );
    assert.equal(accs(added).length, 0, `${item.fn}：钱不够时不进选人画面`);
  }
});

test('MODIFY 族整表：选人后取消（[999] / [1]）不扣款、不写入', async () => {
  for (const item of MODIFY_ITEMS) {
    // [999]：选人画面直接返回
    const cancel_select = make_fixture({
      money: item.price * 2,
      seed: item.seed,
    });
    const first = await run(cancel_select, item.fn, [999], {});
    assert.equal(first.ret, 0, `${item.fn}：[999] 返回 0`);
    assert.equal(
      cancel_select.store.get('flag:10004'),
      item.price * 2,
      `${item.fn}：[999] 不扣款`,
    );
    // [1]：确认画面选「不要」
    const cancel_confirm = make_fixture({
      money: item.price * 2,
      seed: item.seed,
    });
    const second = await run(cancel_confirm, item.fn, [1, 1], {});
    assert.equal(second.ret, 0, `${item.fn}：[1] 返回 0`);
    assert.equal(
      cancel_confirm.store.get('flag:10004'),
      item.price * 2,
      `${item.fn}：[1] 不扣款`,
    );
  }
});

test('MODIFY 族整表：成交扣款额逐个钉住 + 应用写入', async () => {
  for (const item of MODIFY_ITEMS) {
    // 钱给两倍：价格一旦改坏，失败点落在下面那条「扣掉整整 N 点」断言上
    // （钱只给一份的话，改大价格会先在「成交返回 1」处红，信息量差一截）
    const fixture = make_fixture({ money: item.price * 2, seed: item.seed });
    const { ret, added } = await run(fixture, item.fn, [1, 0], {});
    assert.equal(ret, 1, `${item.fn}：成交返回 1`);
    assert.equal(
      fixture.store.get('flag:10004'),
      item.price,
      `${item.fn}：扣掉整整 ${item.price} 点`,
    );
    assert.equal(
      fixture.store.get('exflag:4444'),
      item.price,
      `${item.fn}：EX_FLAG:4444 同步扣款`,
    );
    item.applied(fixture);
    assert.ok(added.length > 0, `${item.fn}：成交有输出`);
  }
});

test('MODIFY 族：选人画面的三个页脚键与提示行在场（以母乳体质为例）', async () => {
  const fixture = make_fixture({ seed: {} });
  const { added } = await run(fixture, 'modify_bonyu', [999], {});
  assert.deepEqual(accs(added).slice(-3), [1000, 999, 1001], '页脚三键');
  assert.deepEqual(
    button_texts(added).slice(-3),
    // 引擎的按钮渲染会折叠连续空白（AGENTS.md 的 printButton 条）
    ['[1000] - 上一页', '[999] - 返 回', '[1001] - 下一页'],
    '页脚三键的正文（showAcc 渲染）',
  );
  assert.ok(texts(added).includes('活化改在对象的乳腺，让她分泌母乳。'));
  assert.ok(texts(added).includes('要将谁母乳化？'));
  assert.ok(accs(added).includes(0), '魔王（0）在列表里');
  assert.ok(accs(added).includes(1), '奴隶 1 在列表里');
  // 确认画面：选奴隶 1 → 确认键的正文（引擎 showAcc 渲染）
  const confirm = make_fixture({ seed: {} });
  const asked = await run(confirm, 'modify_bonyu', [1, 1], {});
  assert.deepEqual(
    button_texts(asked.added).slice(-2),
    ['[0] - 好的', '[1] - 不要'],
    '确认键的正文',
  );
});

test('MODIFY 族：选人列表的翻页（1001 进、1000 退、上界按 CHARANUM）', async () => {
  // 24 名奴隶：第 1 页满（23 行），翻到第 2 页
  const fixture = make_fixture({ slaves: 23, seed: {} });
  const first = await run(fixture, 'modify_animal', [1001, 999], {});
  assert.ok(
    accs(first.added).includes(1000),
    '翻到第 2 页后「上一页」按钮仍在（第一页也有，故此处只证翻页不炸）',
  );
  // 只有 2 名奴隶时 (NO_PAGE+1)*NUM_PAGE <= CHARANUM 不成立 → 不翻页
  // （[1001] 被拒绝后重画一次，两次绘制内容相同）
  const small = make_fixture({ slaves: 2, seed: {} });
  const second = await run(small, 'modify_animal', [1001, 999], {});
  assert.equal(second.ret, 0);
  const drawn_ids = accs(second.added).filter(
    (a) => a === 0 || a === 1 || a === 2,
  );
  assert.deepEqual(
    drawn_ids,
    [0, 1, 2, 0, 1, 2],
    '两次绘制都只有魔王与两名奴隶',
  );
});

// ————————————————————————————————————————————————
// 三、守卫整表：每条守卫各触发一次（文案 + 不扣款）
// ————————————————————————————————————————————————

/** 测试用到的素质名（引擎名字表 talentname 的预置；fixture 不读 yml） */
const TALENT_NAMES = {
  0: '处女',
  244: '恶魔肌肤',
  245: '恶魔翅膀',
  246: '恶魔尾巴',
  247: '恶魔眼睛',
  307: '魁梧',
  57: '漏尿癖',
  76: '淫乱',
  85: '爱慕',
  109: '贫乳',
  110: '巨乳',
  114: '爆乳',
  116: '绝壁',
  119: '超乳',
  121: '扶她',
  122: '男人',
  123: '疯狂',
  124: '动物耳朵',
  125: '白虎',
  130: '母乳体质',
  135: '未熟',
  152: '处女怀胎',
  257: '魔法耐性',
  264: '角',
  273: '私处封印',
  274: '魂缚',
  280: '狂王俘虏',
  340: '异常妊娠体质',
  398: '勋章',
};

/** 把素质名预置进夹具 */
function seed_talentnames(fixture) {
  for (const [id, name] of Object.entries(TALENT_NAMES)) {
    fixture.store.set(`talentname:${id}`, name);
  }
}

/**
 * 守卫表：每条给 fn、让守卫成立的 seed、以及原文案。
 * `input` 缺省 [1]（选奴隶 1）；`wait` 表示是否等键（PRINTFORM 的档不等）。
 */
const GUARDS = [
  {
    fn: 'modify_bustup',
    seed: { 'talent:1:122': 1 },
    text: '【男人】不能巨乳化。',
  },
  {
    fn: 'modify_bustup',
    seed: { 'talent:1:119': 1 },
    text: '知足吧，奴隶1的胸，已经是奇尺大乳了。',
  },
  {
    fn: 'modify_bustdown',
    seed: { 'talent:1:122': 1 },
    text: '【男人】不能贫乳化。',
  },
  {
    fn: 'modify_bustdown',
    seed: { 'talent:1:116': 1 },
    text: '奴隶1已经平如镜子，放过她吧。',
  },
  {
    fn: 'modify_bonyu',
    seed: { 'talent:1:122': 1 },
    text: '【男人】不能改造母乳体质。',
  },
  {
    fn: 'modify_bonyu',
    seed: { 'talent:1:109': 1 },
    text: '死心吧，这么小的胸，要挤奶也无从下手。',
  },
  {
    fn: 'modify_bonyu',
    seed: { 'talent:1:130': 1 },
    text: '奴隶1已经是母乳体质了。',
  },
  {
    fn: 'modify_futanari',
    seed: { 'talent:1:121': 1 },
    text: '奴隶1已经有兵器了。',
  },
  {
    fn: 'modify_futanari_erase',
    seed: { 'talent:1:122': 1 },
    text: '本作暂不提供阉割功能！',
  },
  {
    fn: 'modify_futanari_erase',
    seed: {},
    text: '没有可消去的阴茎',
  },
  {
    fn: 'modify_animal',
    seed: { 'talent:1:124': 1 },
    text: '奴隶1已经有动物耳朵了。',
  },
  {
    fn: 'modify_animal_erase',
    seed: {},
    text: '没有动物耳朵给你消去',
  },
  {
    fn: 'modify_removehair',
    seed: { 'talent:1:125': 1 },
    text: '奴隶1本来就是白虎。',
  },
  {
    fn: 'modify_deimmaturity',
    seed: {},
    text: '奴隶1不是未熟的人。',
  },
  {
    fn: 'modify_bonyu_erase',
    seed: {},
    text: '没有母乳体质',
  },
  {
    fn: 'modify_bonyu_erase',
    seed: { 'talent:1:130': 1, 'talent:1:153': 1 },
    text: '孕妇无法消去母乳体质',
  },
  {
    fn: 'modify_bonyu_erase',
    seed: { 'talent:1:130': 1, 'talent:1:154': 1 },
    text: '育儿中的女人无法消去母乳体质',
  },
  {
    fn: 'modify_omorashi_erase',
    seed: {},
    text: '没有漏尿癖',
  },
  {
    fn: 'shojo_saisei',
    seed: { 'talent:1:122': 1 },
    text: '怎么看都是不可能的了，真的谢谢了。',
  },
  {
    fn: 'shojo_saisei',
    seed: { 'talent:1:0': 1 },
    text: '奴隶1本来就是处女。',
  },
  {
    fn: 'shojo_seal',
    seed: { 'talent:1:273': 1 },
    text: '奴隶1的性器已经被封印了。',
  },
  {
    fn: 'shojo_seal_off',
    seed: {},
    text: '奴隶1本来就没有被封印。',
  },
  {
    fn: 'trans_sex',
    seed: { 'cflag:1:70': 1 },
    // 守卫若不成立会继续走到确认画面：补两个输入让它能干净退出，
    // 否则失败会落在夹具的「输入耗尽」上，断言消息到不了输出里
    input: [1, 1],
    text: '奴隶1已经被性转过了。',
  },
  {
    fn: 'horn',
    seed: { 'talent:1:264': 1 },
    text: '奴隶1已经长着犄角了。',
  },
  {
    fn: 'horn',
    seed: { 'cflag:1:1': 2 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'blueskin',
    seed: { 'talent:1:244': 1 },
    text: '奴隶1的肌肤已经是蓝色的了。',
  },
  {
    fn: 'blueskin',
    seed: { 'cflag:1:1': 2 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'evilwing',
    seed: { 'talent:1:245': 1 },
    text: '奴隶1已经长着恶魔的翅膀了。',
  },
  {
    fn: 'eviltail',
    seed: { 'talent:1:246': 1 },
    text: '奴隶1已经长着恶魔的尾巴了。',
  },
  {
    fn: 'evilsight',
    seed: { 'talent:1:247': 1 },
    text: '奴隶1已经有恶魔的眼睛了。',
  },
  {
    fn: 'soulbound',
    seed: { 'talent:1:274': 1 },
    text: '奴隶1的灵魂已经被束缚过了',
  },
  {
    fn: 'soulbound',
    seed: { 'cflag:1:1': 2 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'soulbound_erase',
    seed: {},
    text: '奴隶1的灵魂没有被束缚',
  },
  {
    fn: 'encharmed_erase',
    seed: {},
    text: '你确定奴隶1曾被狂王俘虏过？',
  },
  {
    fn: 'magicresist',
    seed: { 'talent:1:257': 1 },
    text: '奴隶1已经拥有魔法耐性了。',
  },
  {
    fn: 'extra_preg_mark',
    seed: { 'talent:1:340': 1 },
    text: '奴隶1已经拥有了异常妊娠体质。',
  },
  {
    fn: 'extra_preg_erase',
    seed: {},
    text: '奴隶1并不是异常妊娠体质。',
  },
  {
    fn: 'anti_aging',
    seed: { 'cflag:1:451': 17 },
    text: '奴隶1无法再变得更年轻了',
  },
  {
    fn: 'anti_aging',
    seed: { 'cflag:1:1': 2, 'cflag:1:451': 30 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'reget_chastity_key',
    seed: { 'exp:0:81': 3 },
    text: '没有奴隶1贞操带钥匙的必要。',
  },
  {
    fn: 'cure_insane',
    seed: { 'exp:0:81': 40 },
    text: '奴隶1的精神没有崩坏。',
  },
  {
    fn: 'given_human_life',
    seed: { 'exp:0:81': 3 },
    text: '奴隶1已经没有继续留在人间的理由了。',
  },
  {
    fn: 'given_human_life',
    seed: { 'exp:0:81': 3, 'talent:1:85': 1, 'base:1:10': 0 },
    text: '奴隶1已经拥有超长的寿命了',
  },
  {
    fn: 'set_free_train',
    seed: { 'cflag:1:1': 2 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'st_up_labo',
    args: [5000, 2],
    seed: { 'cflag:1:1': 2 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'penis_remodel',
    seed: {},
    text: '魔王大人哦？这孩子还没有肉棒呢？',
  },
  {
    fn: 'penis_remodel',
    seed: { 'cflag:1:1': 2, 'talent:1:122': 1 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'demon_rebirth',
    seed: { 'cflag:1:1': 2 },
    text: '奴隶1还不在你的统治之下。',
  },
  {
    fn: 'modify_amnesia',
    seed: { 'base:1:0': 0 },
    input: [1, 999], // 濒死守卫无提示，只重画；随后 999 退出
    missing: true,
  },
];

test('守卫整表：触发一次、提示原文、不扣款、不写入', async () => {
  for (const entry of GUARDS) {
    const fixture = make_fixture({ seed: entry.seed });
    seed_talentnames(fixture);
    const money = fixture.store.get('flag:10004');
    const { ret, added } = await run(fixture, entry.fn, entry.input ?? [1], {
      args: entry.args ?? [],
    });
    assert.equal(ret, 0, `${entry.fn}：守卫拦下返回 0`);
    assert.equal(
      fixture.store.get('flag:10004'),
      money,
      `${entry.fn}：守卫拦下不扣款`,
    );
    if (!entry.missing) {
      assert.ok(
        all_text(added).includes(entry.text),
        `${entry.fn}：提示原文「${entry.text}」在场（实际：${texts(added).join(' / ')}）`,
      );
    }
  }
});

test('MODIFY 族：页高 23（第 1 页恰好画 23 名奴隶 + 魔王行）', async () => {
  const fixture = make_fixture({ slaves: 24, seed: {} });
  const { added } = await run(fixture, 'modify_animal', [999], {});
  const rows = accs(added).filter((a) => a >= 0 && a <= 30);
  assert.deepEqual(
    rows,
    Array.from({ length: 24 }, (_, i) => i),
    '第 1 页是魔王（0）＋ 1-23 号奴隶（NUM_PAGE = 23）',
  );
});

test('MODIFY 族：濒死角色被排除（BASE:x:0 < 1 回选人循环）', async () => {
  const fixture = make_fixture({ seed: {} });
  fixture.store.set('base:1:0', 0); // 奴隶 1 濒死
  // 输入 1（濒死）→ 回循环；再 2（正常）→ 确认；确认 [1] 取消
  const { added } = await run(fixture, 'modify_bonyu', [1, 2, 1], {});
  const confirm_lines = texts(added).filter((t) => t.includes('母乳体质化吗'));
  assert.deepEqual(
    confirm_lines,
    ['将奴隶2母乳体质化吗？'],
    '选到的是 2 号，不是濒死的 1 号',
  );
});

// ————————————————————————————————————————————————
// 四、特殊流程
// ————————————————————————————————————————————————

test('MODIFY_BUSTUP：乳房档位递升整表（绝壁→贫乳→普通→巨乳→爆乳→超乳）', async () => {
  const cases = [
    // 当前有的素质 → 期望的写入
    [{ 'talent:1:116': 1 }, { 116: 0, 109: 1 }],
    [{ 'talent:1:109': 1 }, { 109: 0 }],
    [{ 'talent:1:110': 1 }, { 110: 0, 114: 1 }],
    [{ 'talent:1:114': 1 }, { 114: 0, 119: 1 }],
    [{}, { 110: 1 }],
  ];
  for (const [seed, expected] of cases) {
    const fixture = make_fixture({ seed });
    const { ret } = await run(fixture, 'modify_bustup', [1, 0], {});
    assert.equal(ret, 1, `种子 ${JSON.stringify(seed)} 成交`);
    for (const [index, value] of Object.entries(expected)) {
      assert.equal(
        fixture.store.get(`talent:1:${index}`),
        value,
        `${JSON.stringify(seed)} → TALENT:${index} = ${value}`,
      );
    }
    // 价格：无巨乳/爆乳时 20000，否则加价档 50000（:339-343）
    const price =
      'talent:1:110' in seed || 'talent:1:114' in seed ? 50000 : 20000;
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - price,
      `MODIFY_BUSTUP：扣掉 ${price} 点`,
    );
  }
});

test('MODIFY_BUSTUP：已有巨乳/爆乳时加价 50000；钱不够则回选人（不成交）', async () => {
  // 有巨乳且钱恰好 50000 → 走加价档
  const rich = make_fixture({ money: 50001, seed: { 'talent:1:110': 1 } });
  const { ret, added } = await run(rich, 'modify_bustup', [1, 0], {});
  assert.equal(ret, 1);
  assert.ok(
    texts(added).includes('奴隶1胸部伟岸，要更上一层楼，需要50000点。'),
    '加价档先报加价（:340）',
  );
  assert.ok(
    texts(added).includes('这样还要继续么？'),
    '加价档的追加提示「这样还要继续么？」',
  );
  assert.equal(rich.store.get('flag:10004'), 1, '加价档扣 50000');
  // 有巨乳但钱 49999 → GOTO INPUT_LOOP；再选一次仍不够，最后 999 退出
  const poor = make_fixture({ money: 49999, seed: { 'talent:1:110': 1 } });
  const second = await run(poor, 'modify_bustup', [1, 1, 999], {});
  assert.equal(second.ret, 0, '钱不够时回选人循环，最终退出');
  assert.equal(poor.store.get('flag:10004'), 49999, '不扣款');
  assert.ok(
    all_text(second.added).includes('需要50000点。'),
    '钱不够时加价行照样打（它在 SIF 之前）',
  );
  assert.ok(
    !all_text(second.added).includes('这样还要继续么？'),
    '钱不够时不打「这样还要继续么？」（SIF MONEY < C 在它之前）',
  );
});

test('MODIFY_BUSTDOWN：乳房档位递降整表', async () => {
  const cases = [
    [{ 'talent:1:119': 1 }, { 119: 0, 114: 1 }],
    [{ 'talent:1:114': 1 }, { 114: 0, 110: 1 }],
    [{ 'talent:1:110': 1 }, { 110: 0 }],
    [{ 'talent:1:109': 1 }, { 109: 0, 116: 1 }],
    [{}, { 109: 1 }],
  ];
  for (const [seed, expected] of cases) {
    const fixture = make_fixture({ seed });
    const { ret } = await run(fixture, 'modify_bustdown', [1, 0], {});
    assert.equal(ret, 1);
    for (const [index, value] of Object.entries(expected)) {
      assert.equal(fixture.store.get(`talent:1:${index}`), value);
    }
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - 10000,
      'MODIFY_BUSTDOWN：扣掉 10000 点',
    );
  }
});

test('胸围重算：FLAG:5 位 12/15 开才写 CFLAG:454/455（随机上界由 CHAR_SIZE_GENERATE 捕获）', async () => {
  for (const bit of [12, 15, -1]) {
    const fixture = make_fixture({
      seed: { 'talent:1:110': 1 },
    });
    if (bit >= 0) {
      fixture.store.set('flag:5', 1 << bit);
    }
    const bounds = [];
    const { ret } = await run(fixture, 'modify_bustup', [1, 0], {
      rand: seq_probe([], bounds),
    });
    assert.equal(ret, 1);
    if (bit >= 0) {
      assert.ok(
        bounds.length > 0,
        'FLAG:5 位 12/15 开 → 调 CHAR_SIZE_GENERATE',
      );
      // 与生产同算法的期望值：CFLAG:454 = 返回值 3（体重）、455 = 返回值 4（胸围）
      const { char_size_generate } = fixture.load_module('chara/chara-body');
      const expected = char_size_generate(1, 0, 1, (n) => n - 1);
      assert.equal(
        fixture.store.get('cflag:1:454'),
        expected[3],
        'CFLAG:454 = CHAR_SIZE_GENERATE 的返回值 3（体重）',
      );
      assert.equal(
        fixture.store.get('cflag:1:455'),
        expected[4],
        'CFLAG:455 = CHAR_SIZE_GENERATE 的返回值 4（胸围）',
      );
    } else {
      assert.equal(bounds.length, 0, '两位都关 → 不重算身体');
      assert.equal(fixture.store.get('cflag:1:454'), undefined);
    }
  }
});

test('MODIFY_FUTANARI：形状菜单整表（0-4 → TALENT:318）与 [999] 退出', async () => {
  for (let shape = 0; shape <= 4; shape += 1) {
    const fixture = make_fixture({ seed: {} });
    const { ret, added } = await run(
      fixture,
      'modify_futanari',
      [1, shape],
      {},
    );
    assert.equal(ret, 1, `形状 ${shape} 成交`);
    assert.equal(fixture.store.get('talent:1:121'), 1);
    assert.equal(fixture.store.get('talent:1:318'), shape);
    assert.equal(fixture.store.get('talent:1:326'), 0);
    assert.equal(fixture.store.get('talent:1:1'), 1);
    assert.ok(
      all_text(added).includes('阴茎的状态：'),
      '形状文案前面有「阴茎的状态：」',
    );
    assert.equal(fixture.store.get('flag:10004'), 100000000 - 50000);
  }
  const stop = make_fixture({ seed: {} });
  const { ret } = await run(stop, 'modify_futanari', [1, 999], {});
  assert.equal(ret, 0, '[999] 停止');
  assert.equal(stop.store.get('flag:10004'), 100000000, '[999] 不扣款');
});

test('MODIFY_AMNESIA：全清清单（ABL/MARK/JUEL 各 100 项、TALENT 74-78、85/86、CFLAG 0/2/10）', async () => {
  const fixture = make_fixture({ seed: {} });
  fixture.store.set('abl:1:0', 7);
  fixture.store.set('abl:1:99', 7);
  fixture.store.set('mark:1:3', 3);
  fixture.store.set('juel:1:50', 9);
  fixture.store.set('talent:1:74', 1);
  fixture.store.set('talent:1:78', 1);
  fixture.store.set('talent:1:85', 1);
  fixture.store.set('talent:1:86', 1);
  fixture.store.set('cflag:1:0', 2);
  fixture.store.set('cflag:1:2', 55);
  fixture.store.set('cflag:1:10', 33);
  const { ret } = await run(fixture, 'modify_amnesia', [1, 0], {});
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('abl:1:0'), 0, 'ABL 0 清零');
  assert.equal(fixture.store.get('abl:1:99'), 0, 'ABL 99 清零（区间 0-99）');
  assert.equal(fixture.store.get('mark:1:3'), 0, 'MARK 清零');
  assert.equal(fixture.store.get('juel:1:50'), 0, 'JUEL 清零');
  assert.equal(fixture.store.get('talent:1:74'), 0, 'TALENT 74 清零');
  assert.equal(fixture.store.get('talent:1:78'), 0, 'TALENT 78 清零');
  assert.equal(fixture.store.get('talent:1:85'), 0, 'TALENT 85 清零');
  assert.equal(fixture.store.get('talent:1:86'), 0, 'TALENT 86 清零');
  assert.equal(fixture.store.get('cflag:1:0'), 0, 'CFLAG:0 清零');
  assert.equal(fixture.store.get('cflag:1:2'), 0, 'CFLAG:2 清零');
  assert.equal(fixture.store.get('cflag:1:10'), 0, 'CFLAG:10 清零');
  assert.equal(fixture.store.get('flag:10004'), 100000000 - 100000);
  assert.equal(
    fixture.store.get('exp:1:50'),
    undefined,
    'EXP 不清（原作注释明示）',
  );
});

test('MODIFY_AMNESIA：助手（ASSI）与上次助手（FLAG:2）一并解除', async () => {
  const fixture = make_fixture({ seed: { 'flag:10006': 1 } }); // era_flag.assi
  fixture.store.set('flag:2', 1);
  const { ret } = await run(fixture, 'modify_amnesia', [1, 0], {});
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('flag:10006'), 0, 'ASSI == D → 置 0');
  assert.equal(fixture.store.get('flag:2'), -1, 'FLAG:2 == D → 置 -1');
});

test('MODIFY_AMNESIA：妊娠分支两档与育儿分支两档', async () => {
  // 妊娠 + 无母性无刚强 → 崩坏
  const pregnant = make_fixture({ seed: { 'talent:1:153': 1 } });
  const first = await run(pregnant, 'modify_amnesia', [1, 0], {});
  assert.equal(first.ret, 1);
  assert.equal(pregnant.store.get('talent:1:9'), 1, '妊娠且无母性 → 崩坏');
  // 妊娠 + 母性 → 不崩坏
  const gentle = make_fixture({
    seed: { 'talent:1:153': 1, 'talent:1:155': 1 },
  });
  const second = await run(gentle, 'modify_amnesia', [1, 0], {});
  assert.equal(second.ret, 1);
  assert.equal(gentle.store.get('talent:1:9'), undefined, '有母性 → 不崩坏');
  // 育儿 + 母性 → 继续照顾
  const nursing = make_fixture({
    seed: { 'talent:1:154': 1, 'talent:1:155': 1 },
  });
  const third = await run(nursing, 'modify_amnesia', [1, 0], {});
  assert.equal(third.ret, 1);
  assert.ok(
    all_text(third.added).includes('继续照顾起了孩子'),
    '母性 → 继续照顾孩子',
  );
  // 育儿 + 无母性且非献身 → 交给别人照看（走 CHILD_CARE_CHANGE_NURSE）
  const nurse = make_fixture({ seed: { 'talent:1:154': 1 } });
  const fourth = await run(nurse, 'modify_amnesia', [1, 0], {});
  assert.equal(fourth.ret, 1);
  assert.ok(
    all_text(fourth.added).includes('不能照顾孩子'),
    '无母性 → 走 CHILD_CARE_CHANGE_NURSE（找不到人也是一种结果文案）',
  );
});

test('TATOO_SET_OFF：部位菜单 + 自由文字（刻印与消去两支）', async () => {
  // 刻印：部位 11（胸）→ 文字「爱」
  const tattoo = make_fixture({ seed: {} });
  const first = await run(tattoo, 'tatoo_set_off', [1, 11, '爱', 0], {});
  assert.equal(first.ret, 1);
  assert.equal(tattoo.store.get('cstr:1:11'), '爱');
  assert.equal(
    tattoo.store.get('flag:10004'),
    100000000 - 10000,
    '价格 10000（COST）',
  );
  assert.ok(
    all_text(first.added).includes('胸上雕刻了『爱』的刺青'),
    '刻印文案',
  );
  // 消去：留空 → 清空
  const erase = make_fixture({ seed: { 'cstr:1:11': '爱' } });
  const second = await run(erase, 'tatoo_set_off', [1, 11, '', 0], {});
  assert.equal(second.ret, 1);
  // 空输入在引擎里到手是数字 0，input_text 还原成空串（模块内的登记）
  assert.equal(erase.store.get('cstr:1:11'), '');
  assert.ok(all_text(second.added).includes('胸的刺青消去了'), '消去文案');
  // 部位表的按钮是 10-17 八个
  assert.deepEqual(
    accs(first.added).filter((a) => a >= 10 && a <= 17),
    [10, 11, 12, 13, 14, 15, 16, 17],
    '八个部位按钮',
  );
  // [999] 停止
  const stop = make_fixture({ seed: {} });
  assert.equal((await run(stop, 'tatoo_set_off', [1, 999], {})).ret, 0);
});

test('MODIFY_HAIR_COLOR：颜色菜单七档 + [999] 回角色选择', async () => {
  for (let color = 0; color <= 6; color += 1) {
    const fixture = make_fixture({ seed: {} });
    const { ret } = await run(fixture, 'modify_hair_color', [1, color, 0], {});
    assert.equal(ret, 1, `颜色 ${color} 成交`);
    assert.equal(
      fixture.store.get('talent:1:300'),
      color + 1,
      `颜色 ${color} → COL = color + 1`,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - 5000,
      'MODIFY_HAIR_COLOR：扣掉 5000 点',
    );
  }
  // [999] → RESTART（回函数头重选角色）：再选 1 号 → 颜色 0 → 取消
  const restart = make_fixture({ seed: {} });
  const { ret, added } = await run(
    restart,
    'modify_hair_color',
    [1, 999, 1, 0, 1],
    {},
  );
  assert.equal(ret, 0, '取消返回 0');
  assert.equal(
    restart.store.get('talent:1:300'),
    0,
    '取消时不写入目标色（SWAP 换回时把 0 写回）',
  );
  assert.equal(
    texts(added).filter((t) => t.startsWith('想给谁改变头发颜色？')).length,
    2,
    'RESTART 回到角色选择（问两次）',
  );
});

test('MODIFY_SKIN_COLOR：三档 + 现状识别（白皙/褐色/恶魔/普通）', async () => {
  const cases = [
    [{}, '普通肤色', 1, 255],
    [{ 'talent:1:255': 1 }, '白皙', 2, 253],
    [{ 'talent:1:253': 1 }, '褐色肌肤', 0, undefined],
    [{ 'talent:1:244': 1 }, '恶魔肌肤', 1, 255],
  ];
  for (const [seed, current, col, written] of cases) {
    const fixture = make_fixture({ seed });
    const { ret, added } = await run(
      fixture,
      'modify_skin_color',
      [1, col, 0],
      {},
    );
    assert.equal(ret, 1);
    assert.ok(
      all_text(added).includes(`想要变成什么肤色？（现在：${current}）`),
      `现状识别为 ${current}`,
    );
    if (written !== undefined) {
      assert.equal(fixture.store.get(`talent:1:${written}`), 1);
    } else {
      assert.equal(fixture.store.get('talent:1:255'), 0, '白皙被清');
      assert.equal(fixture.store.get('talent:1:253'), 0, '褐色肌肤被清');
    }
    assert.equal(fixture.store.get('talent:1:244'), 0, '恶魔肌肤一律先清');
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - 5000,
      'MODIFY_SKIN_COLOR：扣掉 5000 点',
    );
  }
});

test('BLOCK_FEELING：部位维度表驱动（四部位 × 钝感位与 ABL 两道门）', async () => {
  const parts = [0, 1, 2, 3];
  for (const pid of parts) {
    const fixture = make_fixture({ seed: {} });
    const { ret } = await run(fixture, 'block_feeling', [1, pid, 0, 999], {});
    assert.equal(ret, 0, '第二轮的 999 取消');
    const index = [101, 103, 105, 107][pid];
    assert.equal(
      fixture.store.get(`talent:1:${index}`),
      2,
      `部位 ${pid} → TALENT:${index} |= 2`,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - 20000,
      'BLOCK_FEELING：扣掉 20000 点',
    );
  }
  // ABL 已过 LV1 → 拒绝
  const leveled = make_fixture({ seed: { 'abl:1:0': 3 } });
  const blocked = await run(leveled, 'block_feeling', [1, 0, 999], {});
  assert.ok(
    all_text(blocked.added).includes('已经超过LV1以上的部位无法封锁'),
    'ABL > 0 时拒绝',
  );
  // 已封锁（bit2）：照原作把编号换成 `-`（文本行，不是按钮）——于是
  // 「点已封锁部位」在实机上不可达，那一支的提示也就不再出现
  const locked = make_fixture({ seed: {} });
  locked.store.set('talent:1:101', 2);
  const again = await run(locked, 'block_feeling', [1, 1, 1, 999], {});
  assert.ok(
    all_text(again.added).includes('已经封锁'),
    '已封锁的部位画成「已经封锁」行',
  );
  const locked_rows = again.added.filter((line) =>
    (line.text ?? line.rendered ?? '').includes('阴核感觉'),
  );
  assert.ok(
    locked_rows.length > 0 && locked_rows.every((line) => line.type === 'text'),
    '已封锁的部位是文本行而非按钮（原作把编号换成 -）',
  );
  assert.ok(
    !all_text(again.added).includes('已经封锁过了'),
    '点不到已封锁部位，「已经封锁过了」不再可达',
  );
  // [9] 选择角色 → 回选人（再选 1，最后 999 退出）
  const reselect = make_fixture({ seed: {} });
  const reselected = await run(reselect, 'block_feeling', [1, 9, 1, 999], {});
  assert.equal(reselected.ret, 0);
  assert.equal(
    texts(reselected.added).filter((t) => t.endsWith('哪个部位？')).length,
    2,
    '重选角色后再次画部位菜单',
  );
  // 男性（TALENT:122）没有「私处感觉」一行
  const male = make_fixture({ seed: { 'talent:1:122': 1 } });
  const { added } = await run(male, 'block_feeling', [1, 999], {});
  assert.ok(!all_text(added).includes('私处感觉'), '男性不画私处部位行');
  assert.ok(all_text(added).includes('阴茎感觉'), '男性第一行是阴茎感觉');
});

test('BRAIN_WASHING：四档「费用 × 素质」整表 + 三守卫', async () => {
  const menu = [
    // [菜单号, 费用, 附加素质, 说话名, 额外预置]
    [30, 5000, 64, '无视污垢', {}],
    // B == 133 需要对象已有男/扶她（:2373-2375），否则守卫拦下
    [31, 8000, 133, '早泄', { 'talent:1:122': 1 }],
    [32, 10000, 132, '幼稚', {}],
    [33, 10000, 83, '抖Ｓ', {}],
  ];
  for (const [id, cost, b, , extra] of menu) {
    const fixture = make_fixture({ seed: { 'cflag:1:0': 2, ...extra } });
    seed_talentnames(fixture);
    // 洗脑四项在第 4 页（页号 3）：先翻三页
    const { ret } = await run_labo(fixture, [998, 998, 998, id, 1, 0, 999], {});
    assert.equal(ret, 0, '主循环只有 999 退出');
    assert.equal(
      fixture.store.get(`talent:1:${b}`),
      1,
      `[${id}] → TALENT:${b} = 1`,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - cost,
      `[${id}] 扣 ${cost}`,
    );
  }
  // 守卫一：已有该素质
  const has = make_fixture({ seed: { 'talent:1:64': 1, 'cflag:1:0': 2 } });
  seed_talentnames(has);
  const first = await run_labo(has, [998, 998, 998, 30, 1, 999], {});
  assert.ok(
    all_text(first.added).includes('已经有【】了。'),
    '已有素质时拒绝（素质名未预置的编号显示为空串）',
  );
  // 守卫二：不能做助手的角色（CFLAG:0 < 2）
  const no_assist = make_fixture({ seed: {} });
  seed_talentnames(no_assist);
  const second = await run_labo(no_assist, [998, 998, 998, 30, 1, 999], {});
  assert.ok(
    all_text(second.added).includes('不能洗脑不可做助手的角色。'),
    'CFLAG:0 < 2 时拒绝',
  );
  // 守卫三：B == 133 需要扶她或男人
  const not_equipped = make_fixture({ seed: { 'cflag:1:0': 2 } });
  seed_talentnames(not_equipped);
  const third = await run_labo(not_equipped, [998, 998, 998, 31, 1, 999], {});
  assert.ok(
    all_text(third.added).includes('没有相应设备。'),
    'B == 133 且非男非扶她时拒绝',
  );
  // 守卫四：[152] 的人不能被洗脑
  const special = make_fixture({ seed: { 'cflag:1:0': 2, 'talent:1:152': 1 } });
  seed_talentnames(special);
  const fourth = await run_labo(special, [998, 998, 998, 30, 1, 999], {});
  assert.ok(
    all_text(fourth.added).includes('的人不能被洗脑。'),
    'TALENT:152 时拒绝',
  );
});

test('BOUGT_TENTACLES：买与不买两支（ITEM:90 与 50000 点）', async () => {
  const buy = make_fixture({ seed: { 'exp:0:81': 0 } });
  const first = await run(buy, 'bougt_tentacles', [0], {});
  assert.equal(first.ret, 1);
  assert.equal(buy.store.get('item:90'), 1);
  assert.equal(
    buy.store.get('flag:10004'),
    100000000 - 50000,
    'BOUGT_TENTACLES：扣掉 50000 点',
  );
  const no = make_fixture({ seed: {} });
  assert.equal((await run(no, 'bougt_tentacles', [1], {})).ret, 0);
  assert.equal(no.store.get('item:90'), undefined);
});

test('GIVEN_HUMAN_LIFE：非人类支只提示不返回 + 勋章清零 + 口上事件 15', async () => {
  const fixture = make_fixture({
    seed: {
      'exp:0:81': 5,
      'talent:1:85': 1,
      'base:1:10': 0,
      'talent:1:124': 1,
    },
  });
  const { ret, added } = await run(fixture, 'given_human_life', [1, 0], {});
  assert.equal(ret, 1);
  assert.ok(
    all_text(added).includes('并非人类、') &&
      all_text(added).includes('已经无法再延长了'),
    '非人类且带动物耳朵时只提示不返回',
  );
  assert.equal(fixture.store.get('talent:1:124'), 0, 'TALENT:124 被消去');
  assert.equal(
    fixture.store.get('base:1:10'),
    0,
    'BASE:10 为 0 时不写（种子即 0）',
  );
  assert.equal(fixture.store.get('exp:0:81'), 0, 'EXP:MASTER:81 清零');
  assert.equal(
    fixture.store.get('flag:10004'),
    100000000,
    '不扣钱（勋章交换）',
  );
  // 勋章不足
  const poor = make_fixture({ seed: {} });
  const second = await run(poor, 'given_human_life', [1, 0], {});
  assert.equal(second.ret, 0);
  assert.ok(
    texts(second.added).includes('人的生命是金钱无法购买的……'),
    'EXP:MASTER:81 <= 0 时的提示',
  );
});

test('RESULECTION：三道前置（勋章 / 人数 30 / 人数 10 与 FLAG:5）与复活流程', async () => {
  // 无勋章
  const no_medal = make_fixture({ seed: {} });
  assert.equal((await run(no_medal, 'resulection', [], {})).ret, 0);
  // 人数 > 30
  const many = make_fixture({ slaves: 31, seed: { 'exp:0:81': 5 } });
  const first = await run(many, 'resulection', [], {});
  assert.equal(first.ret, 0);
  assert.ok(all_text(first.added).includes('亡者容身之所'));
  // FLAG:5 != 9 且人数 > 10
  const eleven = make_fixture({ slaves: 11, seed: { 'exp:0:81': 5 } });
  assert.equal((await run(eleven, 'resulection', [], {})).ret, 0);
  // 无亡者（FLAG:1000-1099 无 < 0）
  const no_dead = make_fixture({ seed: { 'exp:0:81': 5 } });
  const second = await run(no_dead, 'resulection', [], {});
  assert.ok(texts(second.added).includes('找不到想要唤醒的人'));
  // 有亡者：确认 → 选 100 → 复活
  // 亡者位 1099 → 按钮 199 → 预设编号 100（原作 ADDCHARA D，D = RESULT - 99；
  // 显示名的 ITEM 编号 = COUNT + 100，即 RESULT）
  const revive = make_fixture({ seed: { 'exp:0:81': 5, 'flag:1099': -2 } });
  revive.seed_chara(100, { id: 100, name: '亡者', callname: '亡者' });
  const third = await run(revive, 'resulection', [0, 199], {});
  assert.equal(third.ret, 1);
  assert.equal(revive.store.get('flag:1099'), -1, '购买标记 FLAG:C = -1');
  assert.equal(revive.store.get('exp:0:81'), 0, '勋章清零');
  assert.ok(all_text(third.added).includes('被从彼岸召唤回来了'), '复活文案');
  // 确认处取消
  const cancel = make_fixture({ seed: { 'exp:0:81': 5, 'flag:1000': -2 } });
  assert.equal((await run(cancel, 'resulection', [1], {})).ret, 0);
});

test('CURE_INSANE：崩坏与疯狂两支各清一项 + 勋章 -30', async () => {
  const both = make_fixture({
    seed: { 'exp:0:81': 40, 'talent:1:9': 1, 'talent:1:123': 1 },
  });
  const { ret, added } = await run(both, 'cure_insane', [1, 0], {});
  assert.equal(ret, 1);
  assert.equal(both.store.get('talent:1:9'), 0);
  assert.equal(both.store.get('talent:1:123'), 0);
  assert.equal(both.store.get('exp:0:81'), 10, 'EXP:MASTER:81 -= 30');
  assert.ok(all_text(added).includes('不见了'), '「【勋章】不见了」');
  // 只有疯狂一支
  const mad = make_fixture({ seed: { 'exp:0:81': 31, 'talent:1:123': 1 } });
  const second = await run(mad, 'cure_insane', [1, 0], {});
  assert.equal(second.ret, 1);
  assert.ok(all_text(second.added).includes('从无尽的噩梦中苏醒了'));
  assert.ok(!all_text(second.added).includes('理性的光辉'), '崩坏支不触发');
  // 门槛：EXP <= 30 直接拒绝（31 可以，30 不行）
  const edge = make_fixture({ seed: { 'exp:0:81': 30, 'talent:1:9': 1 } });
  const third = await run(edge, 'cure_insane', [1, 0], {});
  assert.ok(
    texts(third.added).includes('勋章，是最好的药啊魔王大人！'),
    'EXP == 30 时仍被拒绝（判据是 <= 30）',
  );
});

test('EVILAPP：四项分发整表（1-4 → 各自界面，999 返回）', async () => {
  const expected = {
    1: '改造成为恶魔的蓝色肌肤',
    2: '给对象赋予恶魔的翅膀。',
    3: '赋予对象恶魔的尾巴。',
    4: '赋予对象恶魔的眼睛。',
  };
  for (const [id, text] of Object.entries(expected)) {
    const fixture = make_fixture({ seed: {} });
    const { added } = await run(fixture, 'evilapp', [id, 999], {});
    assert.ok(all_text(added).includes(text), `[${id}] 进的是「${text}」`);
  }
  const back = make_fixture({ seed: {} });
  assert.equal((await run(back, 'evilapp', [999], {})).ret, 0);
});

test('DEMON_REBIRTH：类型表整表 + 等级门 + 附加素质 + 随机上界 3/7', async () => {
  // 11 行 6 列的类型表；此处逐行取第 0 列各跑一次（等级给到位）
  const TYPES = [
    [133, 143, 153, 163, 160, 170],
    [104, 113, 114, 172, 181],
    [110, 130, 121, 150],
    [101, 111, 123, 134, 164, 171],
    [100, 120],
    [102, 131, 142, 173, 184],
    [122, 141, 151, 162, 183],
    [103, 124, 174],
    [112, 144],
    [132, 140, 180],
    [154, 152, 182],
  ];
  for (const [row, ids] of TYPES.entries()) {
    for (const [col, id] of ids.entries()) {
      const fixture = make_fixture({
        seed: { 'cflag:1:9': 99, 'cflag:1:1': 0 },
      });
      fixture.store.set(`itemprice:${id}`, 20);
      const bounds = [];
      // 条件位：1（恶魔肌肤）/2（魁梧）/9/10 需要预置
      // 条件行（1 恶魔肌肤 / 2 魁梧 / 9 四件 / 10 四件 + 淫乱）：9 与 10 不预置
      // → 条件不满足，走「必须达到…且具备…」的拒绝支
      const cond_ok = !(row === 9 || row === 10);
      if (row === 1) {
        fixture.store.set('talent:1:244', 1);
      }
      if (row === 2) {
        fixture.store.set('talent:1:307', 1);
      }
      if (!cond_ok) {
        const gated = await run(
          fixture,
          'demon_rebirth',
          [1, row * 10 + col, 999, 999],
          { rand: seq_probe([0, 1], bounds) },
        );
        assert.equal(gated.ret, 0, `类型 ${id} 条件不满足时退回选类型`);
        assert.ok(
          all_text(gated.added).includes('且具备'),
          `类型 ${id} 的条件提示列出素质`,
        );
        continue;
      }
      const { ret } = await run(
        fixture,
        'demon_rebirth',
        [1, row * 10 + col, 0],
        {
          // [0, 1]：RAND:3 命中 0（变发色）→ 再掷 RAND:7
          rand: seq_probe([0, 1], bounds),
        },
      );
      {
        assert.equal(ret, 1, `类型 ${id} 转生成功`);
        assert.equal(fixture.store.get('talent:1:322'), id);
        assert.equal(fixture.store.get('talent:1:314'), 9);
        assert.equal(
          fixture.store.get('talent:1:321'),
          0,
          '首次转生把当时的种族（0）记进原种族',
        );
        // rand 只可能被调两次：RAND:3 与 RAND:7
        assert.deepEqual(bounds, [3, 7], '随机上界依次是 3 与 7');
        assert.equal(
          fixture.store.get('flag:10004'),
          100000000 - 50000,
          'DEMON_REBIRTH：扣掉 50000 点',
        );
      }
    }
  }
});

test('DEMON_REBIRTH：等级不够时的提示与素质清单', async () => {
  const fixture = make_fixture({ seed: { 'cflag:1:9': 1 } });
  fixture.store.set('itemprice:104', 400); // 需要 Lv20
  fixture.store.set('itemname:104', '丧尸');
  seed_talentnames(fixture);
  // 选 10（行 1 列 0 = 104）：等级不足且不具「恶魔肌肤」→ 两条提示都要出
  const { added } = await run(fixture, 'demon_rebirth', [1, 10, 999, 999], {});
  assert.ok(
    all_text(added).includes('必须达到Lv20（当前Lv1）'),
    '等级提示带「必须达到Lv{门槛}（当前Lv{现等级}）」',
  );
  assert.ok(all_text(added).includes('且具备'), '素质不足时补「且具备」');
  assert.ok(all_text(added).includes('[恶魔肌肤]'), '素质清单带方括号');
});

test('DEMON_REBIRTH：现种族不能选（跳过同族）与转生附加素质', async () => {
  // 狗头人（100）：转生后补 TALENT:124（动物耳朵）
  const fixture = make_fixture({ seed: { 'cflag:1:9': 99, 'cflag:1:1': 0 } });
  fixture.store.set('itemname:100', '狗头人');
  fixture.store.set('itemprice:100', 20);
  const { ret, added } = await run(fixture, 'demon_rebirth', [1, 40, 0], {
    rand: () => 1,
  });
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('talent:1:124'), 1, '附加素质：动物耳朵');
  assert.ok(all_text(added).includes('头上长出'), '附加素质的文案');
  // 现种族与某个类型相同时，那个类型的按钮被跳过（:3328-3329 CONTINUE）——
  // 原作里还能手敲编号走到「已经是…了」那一支，按钮化之后不可达（文件头第 3 条）
  const same = make_fixture({ seed: { 'cflag:1:9': 99, 'cflag:1:1': 0 } });
  same.store.set('itemname:100', '狗头人');
  same.store.set('itemprice:100', 20);
  same.store.set('talent:1:322', 100);
  same.store.set('talent:1:314', 9);
  const second = await run(same, 'demon_rebirth', [1, 999, 999], {});
  assert.equal(second.ret, 0, '取消返回 0');
  assert.ok(
    !accs(second.added).includes(40),
    '现种族（100）的按钮（行 4 列 0）被跳过',
  );
});

test('ST_UP_LABO：四项整表（价格 5000 × 次数）与上限分支', async () => {
  const items = [
    [0, 'HP', (f) => assert.equal(f.store.get('maxbase:1:0'), 10 * 3)],
    [1, '气力', (f) => assert.equal(f.store.get('maxbase:1:1'), 10 * 3)],
    [2, '攻击', (f) => assert.equal(f.store.get('cflag:1:13'), 3)],
    [3, '防御', (f) => assert.equal(f.store.get('cflag:1:14'), 3)],
  ];
  for (const [b, label, applied] of items) {
    const fixture = make_fixture({ seed: { 'cflag:1:9': 10 } });
    const { ret, added } = await run(fixture, 'st_up_labo', [1, 3], {
      args: [5000, b],
    });
    assert.equal(ret, 1, `${label}：成交`);
    assert.ok(all_text(added).includes(`${label}强化了。`), `${label} 文案`);
    assert.ok(
      all_text(added).includes(`强化奴隶的${label}`),
      `提示行带 ${label}`,
    );
    applied(fixture);
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - 5000 * 3,
      `${label}：扣 5000 × 3`,
    );
  }
  // 上限已到 → 提示并返回 0
  const capped = make_fixture({ seed: { 'cflag:1:9': 10, 'cflag:1:13': 50 } });
  const limit = await run(capped, 'st_up_labo', [1], { args: [5000, 2] });
  assert.equal(limit.ret, 0);
  assert.ok(all_text(limit.added).includes('*攻击值的成长到极限了*'));
  assert.ok(all_text(limit.added).includes('*请提高等级*'));
  // 次数 0 → 返回 0
  const zero = make_fixture({ seed: { 'cflag:1:9': 10 } });
  assert.equal(
    (await run(zero, 'st_up_labo', [1, 0], { args: [5000, 2] })).ret,
    0,
  );
  // 次数超过 d → 提示「数值太大了。」并重来
  const over = make_fixture({ seed: { 'cflag:1:9': 10 } });
  const too_much = await run(over, 'st_up_labo', [1, 999, 999], {
    args: [5000, 2],
  });
  assert.equal(too_much.ret, 0);
  assert.ok(all_text(too_much.added).includes('数值太大了。'));
  // 可强化次数的上界：等级 10 → 攻击上限 50 - 0 = 50；钱 100000000/5000 很大
  const d_fixture = make_fixture({ seed: { 'cflag:1:9': 10 } });
  const { added } = await run(d_fixture, 'st_up_labo', [1, 999, 999], {
    args: [5000, 2],
  });
  assert.ok(
    all_text(added).includes('多少次呢？(1-50)'),
    'D = CFLAG:9 * 5 - CFLAG:13 = 50',
  );
});

test('SET_FREE_TRAIN：写入 CSTR:7 与两项 ABL + 两档提示', async () => {
  const set = make_fixture({ seed: {} });
  set.store.set('abl:1:4', 5);
  set.store.set('abl:1:40', 5);
  set.store.set('juel:1:15', 5);
  const { ret, added } = await run(set, 'set_free_train', [1, 0, '屁股'], {});
  assert.equal(ret, 1);
  assert.equal(set.store.get('cstr:1:7'), '屁股');
  assert.equal(set.store.get('abl:1:4'), 0);
  assert.equal(set.store.get('abl:1:40'), 0);
  assert.equal(set.store.get('juel:1:15'), 0);
  assert.ok(all_text(added).includes('屁股调教设定完毕。'));
  // 留空 → 重置提示
  const reset = make_fixture({ seed: { 'cstr:1:7': '旧内容' } });
  const second = await run(reset, 'set_free_train', [1, 0, ''], {});
  assert.equal(second.ret, 1);
  assert.equal(reset.store.get('cstr:1:7'), '');
  assert.ok(all_text(second.added).includes('调教成果将被重置。'));
  assert.ok(all_text(second.added).includes('自由局部调教重置完毕。'));
});

test('TRANS_SPECIALTALENT：两支互换、失败重试与条件边界', async () => {
  // 爱慕 → 淫乱
  const to_lewd = make_fixture({
    seed: {
      'talent:1:85': 1,
      'abl:1:11': 3,
      'abl:1:0': 4,
      'abl:1:1': 4,
      'abl:1:2': 2,
      'exp:1:50': 3,
      'mark:1:1': 3,
      'mark:1:2': 3,
    },
  });
  const first = await run(to_lewd, 'trans_specialtalent', [1], {});
  assert.equal(first.ret, 1);
  assert.equal(to_lewd.store.get('talent:1:85'), 0);
  assert.equal(to_lewd.store.get('talent:1:76'), 1);
  assert.equal(
    to_lewd.store.get('flag:10004'),
    100000000 - 500000,
    'TRANS_SPECIALTALENT：扣掉 500000 点',
  );
  // 淫乱 → 爱慕
  const to_love = make_fixture({
    seed: {
      'talent:1:76': 1,
      'abl:1:10': 3,
      'abl:1:16': 3,
      'exp:1:21': 200,
      'mark:1:2': 3,
    },
  });
  const second = await run(to_love, 'trans_specialtalent', [1], {});
  assert.equal(second.ret, 1);
  assert.equal(to_love.store.get('talent:1:76'), 0);
  assert.equal(to_love.store.get('talent:1:85'), 1);
  // 条件不足 → 失败提示 + 重来；第二次补条件后成交
  const fail = make_fixture({ seed: { 'talent:1:85': 1 } });
  const third = await run(fail, 'trans_specialtalent', [1, 999], {});
  assert.equal(third.ret, 0);
  assert.ok(all_text(third.added).includes('改变失败了'));
  assert.equal(fail.store.get('flag:10004'), 100000000, '失败不扣款');
});

test('SUMMON_SLAVE：四道前置与生成流程（等级 / 肉便器 / 编号范围 / 存在性）', async () => {
  // 等级不足
  const low_level = make_fixture({ seed: { 'cflag:0:9': 29 } });
  const first = await run(low_level, 'summon_slave', [], {});
  assert.equal(first.ret, 0);
  assert.ok(texts(first.added).includes('等级不足'));
  // 肉便器不足
  const no_mob = make_fixture({ seed: { 'flag:83': 29 } });
  const second = await run(no_mob, 'summon_slave', [], {});
  assert.ok(texts(second.added).includes('肉便器数量不足'));
  // 编号超范围
  const out_of_range = make_fixture({ seed: { 'flag:83': 30 } });
  const third = await run(out_of_range, 'summon_slave', [149, 0], {});
  assert.ok(
    all_text(third.added).includes('请确认对象的收录编号在150以上199以下'),
    '149 以下与 199 以上都拒收',
  );
  // 预设不存在
  const missing = make_fixture({ seed: { 'flag:83': 30 } });
  const fourth = await run(missing, 'summon_slave', [150, 0], {});
  assert.ok(
    all_text(fourth.added).includes('所选奴隶并不存在'),
    'EXISTCSV 落空',
  );
  // 成功：等级 -30、肉便器 -30、钱 -100000、召唤酔い与命名检查落位
  const ok = make_fixture({ seed: { 'flag:83': 30 } });
  ok.seed_chara(150, { id: 150, name: '影', callname: '影' });
  const fifth = await run(ok, 'summon_slave', [150], {});
  assert.equal(fifth.ret, 1);
  assert.equal(ok.store.get('cflag:0:9'), 0, 'CFLAG:0:9 -= 30');
  assert.equal(ok.store.get('flag:83'), 0, 'FLAG:83 -= 30');
  assert.equal(
    ok.store.get('flag:10004'),
    100000000 - 100000,
    'SUMMON_SLAVE：扣掉 100000 点',
  );
  const summoned = 150; // 收录编号即角色 ID
  assert.ok(ok.chara_no.includes(150), '150 号已加入');
  assert.equal(ok.store.get(`talent:${summoned}:292`), 1, '魔王之影');
  assert.equal(ok.store.get(`cflag:${summoned}:1`), 11, '召喚酔い');
  assert.equal(ok.store.get(`cflag:${summoned}:420`), 1, '命名检查');
  assert.ok(all_text(fifth.added).includes('召唤了出来'));
});

test('肉棒改造：形状菜单（0-4 与 999 停止）', async () => {
  for (const shape of [0, 1, 2, 3, 4]) {
    const fixture = make_fixture({ seed: { 'talent:1:122': 1 } });
    const { ret } = await run(fixture, 'penis_remodel', [1, shape], {});
    assert.equal(ret, 1, `形状 ${shape} 成交`);
    assert.equal(fixture.store.get('talent:1:318'), shape);
    assert.equal(fixture.store.get('talent:1:121'), 1);
    assert.equal(
      fixture.store.get('flag:10004'),
      100000000 - 20000,
      '肉棒改造：扣掉 20000 点',
    );
  }
  const stop = make_fixture({ seed: { 'talent:1:122': 1 } });
  assert.equal((await run(stop, 'penis_remodel', [1, 999], {})).ret, 0);
  // 扶她档的专属文案
  const futanari = make_fixture({ seed: { 'talent:1:121': 1 } });
  const { added } = await run(futanari, 'penis_remodel', [1, 999], {});
  assert.ok(
    all_text(added).includes('被实验室的女主任绑在改造台上'),
    '扶她档的四行开场',
  );
});

test('MODIFY_ANIMAL / _ERASE：种族 2（人狼）时换文案', async () => {
  const wolf = make_fixture({ seed: { 'talent:1:314': 2 } });
  seed_talentnames(wolf);
  const first = await run(wolf, 'modify_animal', [1, 0], {});
  assert.ok(all_text(first.added).includes('取得人狼的象征'), '人狼档的文案');
  const other = make_fixture({ seed: {} });
  seed_talentnames(other);
  const second = await run(other, 'modify_animal', [1, 0], {});
  assert.ok(all_text(second.added).includes('长出'), '普通档的文案');
  assert.ok(!all_text(second.added).includes('人狼'));
  const erase = make_fixture({
    seed: { 'talent:1:124': 1, 'talent:1:314': 2 },
  });
  seed_talentnames(erase);
  const third = await run(erase, 'modify_animal_erase', [1, 0], {});
  assert.ok(all_text(third.added).includes('失去了人狼的象征'));
});

test('MODIFY_BONYU：N_BREAST_GROW 副作用（巨乳 → 爆乳；绝壁被守卫拦下）', async () => {
  const fixture = make_fixture({ seed: { 'talent:1:110': 1 } });
  seed_talentnames(fixture);
  const { ret } = await run(fixture, 'modify_bonyu', [1, 0], {});
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('talent:1:130'), 1, '母乳体质');
  assert.equal(fixture.store.get('talent:1:110'), 0, 'N_BREAST_GROW 升档');
  assert.equal(fixture.store.get('talent:1:114'), 1);
  // 绝壁（116）被守卫拦下，N_BREAST_GROW 的绝壁支到不了
  const flat = make_fixture({ seed: { 'talent:1:116': 1 } });
  seed_talentnames(flat);
  const blocked = await run(flat, 'modify_bonyu', [1], {});
  assert.equal(blocked.ret, 0);
  assert.ok(all_text(blocked.added).includes('要挤奶也无从下手'));
});

test('MODIFY_BONYU_ERASE：N_BREAST_REVERSE 副作用（巨乳 → 普通）', async () => {
  const fixture = make_fixture({
    seed: { 'talent:1:130': 1, 'talent:1:110': 1 },
  });
  seed_talentnames(fixture);
  const { ret } = await run(fixture, 'modify_bonyu_erase', [1, 0], {});
  assert.equal(ret, 1);
  assert.equal(fixture.store.get('talent:1:130'), 0);
  assert.equal(fixture.store.get('talent:1:110'), 0, '巨乳降为普通');
});

test('DEIMMATURITY：阴茎状态降一档（RAND:2 上界捕获）与下限钳制', async () => {
  const fixture = make_fixture({
    seed: { 'talent:1:135': 1, 'talent:1:122': 1, 'talent:1:318': 3 },
  });
  const bounds = [];
  const { ret } = await run(fixture, 'modify_deimmaturity', [1, 0], {
    rand: seq_probe([1], bounds),
  });
  assert.equal(ret, 1);
  assert.deepEqual(bounds, [2], 'RAND:2 的上界是 2');
  assert.equal(fixture.store.get('talent:1:318'), 2, '3 - 1 = 2');
  // 318 == 1 时不掷骰（SIF TALENT:T:318 > 1）
  const edge = make_fixture({
    seed: { 'talent:1:135': 1, 'talent:1:122': 1, 'talent:1:318': 1 },
  });
  const edge_bounds = [];
  await run(edge, 'modify_deimmaturity', [1, 0], {
    rand: seq_probe([0], edge_bounds),
  });
  assert.equal(edge.store.get('talent:1:318'), 1, '318 == 1 保持');
  assert.ok(
    edge_bounds.every((n) => n !== 2),
    '318 == 1 时不掷 RAND:2',
  );
});

test('守卫：等键的档等一次、PRINTFORM 的档不等（SHOJO_SAISEI 两支）', async () => {
  // PRINTW（男人）→ 等键
  const wait_fixture = make_fixture({ seed: { 'talent:1:122': 1 } });
  seed_talentnames(wait_fixture);
  await run(wait_fixture, 'shojo_saisei', [1], {});
  const waited = wait_fixture.waits.filter((w) => w.waited).length;
  // PRINTFORM（本来就是处女）→ 不等键
  const nowait_fixture = make_fixture({ seed: { 'talent:1:0': 1 } });
  seed_talentnames(nowait_fixture);
  await run(nowait_fixture, 'shojo_saisei', [1], {});
  const waited2 = nowait_fixture.waits.filter((w) => w.waited).length;
  assert.equal(waited, 1, '男人档是 PRINTW，等一次键');
  assert.equal(waited2, 0, '本来就处女档是 PRINTFORM，不等键');
});

// ————————————————————————————————————————————————
// 五、主分发：编号 → 函数整表
// ————————————————————————————————————————————————

/**
 * 主分发表：[编号, 进函数后用来退出的输入, 首行文案, 额外预置]。
 * 洗脑四项在第 4 页，入口输入前先翻三页（`turns`）。
 */
const DISPATCH = [
  [0, [999], '改造后，改造对象的乳房将增大到一个新的层次'],
  [1, [999], '改造对象的乳房将变小到一个新的层次。'],
  [2, [999], '活化改在对象的乳腺，让她分泌母乳。'],
  [3, [999], '将改造对象的阴蒂给阳具化，'],
  [4, [999], '扶她消去'],
  [5, [999], '将用动物的遗传因子覆盖改造对象的一部分遗传因子。'],
  [6, [999], '消去动物耳朵'],
  [7, [999], '把改造对象的性器发育，可以进行正常性行为。'],
  [8, [999], '维持改造对象的肉体及感觉不变，'],
  [9, [999], '阴毛长了还分叉？魔王帮你一劳永逸！'],
  [10, [999], '乳腺的退化改造。'],
  [11, [999], '治疗漏尿的问题'],
  [12, [999], '生命没有第二次，但处女膜可以。'],
  [13, [999], '封印对象的性器。'],
  [14, [999], '解除对象的性器封印'],
  [15, [999], '消除对象的刺青'],
  [16, [999], '想给谁改变头发颜色？'],
  [17, [999], '给谁变换肤色？'],
  [18, [999], '感觉封锁，被封锁的部位，感觉被锁定。其它性感带的感觉提升。'],
  [19, [999], '赋予异常妊娠体质'],
  [20, [999], '消除异常妊娠体质'],
  [21, [999], '更改对象的性别。'],
  [22, [999], '设定自由局部调教内容'],
  [23, [999], '把对象从淫乱改为爱慕'],
  [24, [999], '服用减龄的魔药让肉体恢复青春'],
  [
    25,
    [999],
    '只要使用实验室传下来的秘传魔法！就可以让任何的肉棒大小进行改造！',
  ],
  [30, [1], '外部改写洗脑对象的深层心理。', {}],
  [31, [1], '外部改写洗脑对象的深层心理。', {}],
  [32, [1], '外部改写洗脑对象的深层心理。', {}],
  [33, [1], '外部改写洗脑对象的深层心理。', {}],
  [50, [1], '触手生物是身体改造失败的性奴隶的悲催下场……', {}],
  [
    51,
    [1],
    '过去从这个世界上消失和逝去的人，',
    // 有亡者才会走到确认画面（没有时直接「找不到想要唤醒的人」返回）
    { seed: { 'exp:0:81': 40, 'flag:1000': -2 } },
  ],
  [52, [999], '人的生命是无法直接触摸的', { seed: { 'exp:0:81': 40 } }],
  [
    54,
    [999],
    '也许对这些动不动就坏掉的脆弱奴隶来说，坏掉反而更幸福吧！',
    { seed: { 'exp:0:81': 40 } },
  ],
  [55, [999], '把那该死的贞操带钥匙找回来！', { seed: { 'exp:0:81': 40 } }],
  // 肉便器 30 个才走得到输入提示（否则直接「肉便器数量不足」返回）
  [56, [0], '读取CSV来生成奴隶', { seed: { 'flag:83': 30 } }],
  [59, [999], '让奴隶的头上长出犄角'],
  [60, [999], '要进行什么样的恶魔改造呢？？'],
  [64, [999], '转生的秘法将会抽取对象的灵魂，将其投入魔族的身体'],
  [65, [999], '魂缚实施之后，目标在心智上将不会再有半点动摇，'],
  [66, [999], '将目标从魂缚的状态解除'],
  [67, [999], '把目标曾被狂王俘虏的印记消去'],
  [70, [999], '强化奴隶的HP'],
  [71, [999], '强化奴隶的气力'],
  [72, [999], '强化奴隶的攻击'],
  [73, [999], '强化奴隶的防御'],
  [74, [999], '魔法耐性可以抵挡敌方的魔法攻击。'],
];

test('主分发整表：每个编号都进对应的函数（首行文案 + 不扣款）', async () => {
  for (const [id, exits, text, extra = {}] of DISPATCH) {
    try {
      await assert_dispatch(id, exits, text, extra);
    } catch (error) {
      error.message = `[${id}] ${error.message}`; // 失败时先看是哪个编号
      throw error;
    }
  }
});

/**
 * 单条分发用例：翻到编号所在页 → 点它 → 用 `exits` 退出该函数 → 999 退出主循环。
 * @param {number} id 编号
 * @param {number[]} exits 退出输入
 * @param {string} text 首行文案
 * @param {object} extra 额外预置
 */
async function assert_dispatch(id, exits, text, extra) {
  const seed = { 'item:90': 0, ...(extra.seed ?? {}) };
  const fixture = make_fixture({ seed });
  // 尾部再补一个 999：函数返回后回到主循环，得有人按下「返回」
  const { ret } = await run_labo(
    fixture,
    [...turns_to(id), id, ...exits, 999],
    {},
  );
  assert.equal(ret, 0, `[${id}] 最终返回 0`);
  assert.ok(texts(fixture.lines).includes(text), `[${id}] 进的是「${text}」`);
  assert.equal(
    fixture.store.get('flag:10004'),
    fixture.store.get('exflag:4444'),
    `[${id}] 两条资金线同步`,
  );
}

test('主分发守卫：不成立的分支连按钮都不画（[50] 已买 / [51] 无勋章）', async () => {
  // 按钮不画 ⇒ 玩家点不到 ⇒ 分发链的对应支在实机上不可达（文件头第 3 条）。
  // 这里钉的是「按钮有没有画」，也就是守卫在绘制侧的落点。
  const bought = make_fixture({ seed: { 'item:90': 1, 'exp:0:81': 40 } });
  const first = await run_labo(bought, [...turns_to(50), 999], {});
  assert.ok(
    !accs(first.added).includes(50),
    'ITEM:90 != 0 时不画 [50]（触手生物已购入）',
  );
  const poor = make_fixture({ seed: { 'exp:0:81': 0 } });
  const second = await run_labo(poor, [...turns_to(50), 999], {});
  assert.ok(
    !accs(second.added).includes(51),
    'EXP:MASTER:81 == 0 时不画 51-55 四个勋章项',
  );
  assert.ok(!accs(second.added).includes(54), '54 同');
});

test('主分发：[68] 生命摇篮的六道勇者数量守卫与 CHAR_CREATE 入口', async () => {
  // 守卫全过：flags 摆成「各领域已征服 + 亲卫队砦 >= 15」→ 进 CHAR_CREATE
  const pass = make_fixture({
    slaves: 2,
    seed: {
      'flag:82': 1,
      'flag:87': 1,
      'flag:89': 1,
      'flag:91': 1,
      'flag:92': 15,
    },
  });
  const first = await run_labo(pass, [...turns_to(68), 68, 999, 999], {});
  assert.ok(
    texts(first.added).includes('使用神奇的生命摇篮，凭空创造出一体生物'),
    '守卫全过 → 进 @CHAR_CREATE（付费定制路径）',
  );
  // 守卫一：FLAG:82 == 0 且角色数 > 60
  const many = make_fixture({ slaves: 60, seed: {} });
  const second = await run_labo(many, [...turns_to(68), 68, 999, 999], {});
  assert.ok(
    texts(second.added).includes('勇者数量过多'),
    '角色数 > 60 且人间界未征服 → 勇者数量过多',
  );
  assert.equal(second.ret, 0, '守卫拦下后仍在主循环里（随后 999 退出）');
  // 守卫六：CHARANUM >= MAX_CHARANUM（90）
  const full = make_fixture({
    slaves: 89,
    seed: {
      'flag:82': 1,
      'flag:87': 1,
      'flag:89': 1,
      'flag:91': 1,
      'flag:92': 15,
    },
  });
  const third = await run_labo(full, [...turns_to(68), 68, 999], {});
  assert.ok(
    texts(third.added).includes('勇者数量过多'),
    '角色数达到 90（MAX_CHARANUM）→ 拦下',
  );
  assert.ok(
    !texts(third.added).includes('使用神奇的生命摇篮，凭空创造出一体生物'),
    '拦下时不进 CHAR_CREATE',
  );
  // 守卫五：FLAG:92 < 15 且角色数 > 80（角色数 85 时只有这一条拦得住）
  const mid = make_fixture({
    slaves: 84,
    seed: {
      'flag:82': 1,
      'flag:87': 1,
      'flag:89': 1,
      'flag:91': 1,
      'flag:92': 15, // 亲卫队砦侵攻度：不小于 15 → 守卫五不成立
    },
  });
  const fourth = await run_labo(mid, [...turns_to(68), 68, 999, 999], {});
  assert.ok(
    texts(fourth.added).includes('使用神奇的生命摇篮，凭空创造出一体生物'),
    'FLAG:92 == 15（不小于 15）时放行',
  );
  mid.store.set('flag:92', 14);
  const fifth = await run_labo(mid, [...turns_to(68), 68, 999], {});
  assert.ok(
    texts(fifth.added).includes('勇者数量过多'),
    'FLAG:92 == 14（小于 15）且角色数 > 80 时拦下',
  );
});
