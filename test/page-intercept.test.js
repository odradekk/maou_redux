/**
 * @file ere/page/page-intercept.js 与 ere/system/stronghold/gohoubi-request.js
 * 的行为测试（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_2.ERB  @INTERCEPT（:257-658）、
 *     @GOHOUBI_REQUEST（:661-691）；口上侧 @GOHOUBI_REQUEST_KOUJO 的调用面
 *     由本票冻结（ere/kojo/kojo-dungeon-after.js）。
 *
 * 接缝 = test/helpers/era-fixture.js。维度型判据表驱动：
 *   - 派遣判据 `reject_reason` 的七条 × 两侧整表走完；
 *   - 迎击设定的三层子画面（出发阶层 1-9 / 行动 0-5 / 出击确认）各走一遍；
 *   - 道具补给的三次抽奖与「一件都没入手就退款」两支。
 *
 * **不可达支**（1:1 保留、不补用例）：列表过滤与输入守卫同判据，且它判定的
 * 角色根本没有按钮可点，故除「金钱不足」外的拒因提示（魔王自己 / 未驯服 /
 * 孕妇 / 近卫兵 / 后代）与 :367-373 的越界、濒死两支在实机输入下到不了；
 * 行动设定的六个等级门同理由渲染侧保证（等级不足的档位不是按钮）。
 */

'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 加一名角色（预设 + addCharacter） */
function add_chara(fixture, cid, name = `角色${cid}`) {
  fixture.seed_chara(cid, { id: cid, name, callname: name });
  assert.equal(fixture.era.addCharacter(cid), true);
}

/** 加一名可派遣的角色（CFLAG:0 > 0 = 已驯服，BASE:0 > 0 = 活着） */
function add_dispatchable(fixture, cid, name = `奴隶${cid}`) {
  add_chara(fixture, cid, name);
  fixture.store.set(`base:${cid}:0`, 1);
  fixture.store.set(`cflag:${cid}:0`, 1);
  return cid;
}

/** 定值随机源：恒返回同一值（[0, n) 内，故取 0 或 3） */
const const_rand = (value) => () => value;

/** 跑一次 @INTERCEPT，返回本次新增的输出行 */
async function run_intercept(fixture, inputs, rand = const_rand(3)) {
  fixture.set_inputs(...inputs);
  const before = fixture.lines.length;
  const { intercept } = fixture.load_module('page/page-intercept');
  const ret = await intercept(rand);
  return { ret, added: fixture.lines.slice(before) };
}

const accs = (lines) =>
  lines.filter((l) => l.type === 'button').map((l) => l.accelerator);
const texts = (lines) =>
  lines.filter((l) => l.type === 'text').map((l) => l.text);

// —— 派遣判据（:284-291 / :325-335 / :367-407 共用的七条）——

test('INTERCEPT：派遣判据 reject_reason 七条 × 两侧整表驱动', () => {
  const BASE = { 'base:1:0': 1, 'cflag:1:0': 1 };
  const CASES = [
    ['可派遣', BASE, 0],
    ['濒死（BASE:0 == 0）', { ...BASE, 'base:1:0': 0 }, 'BASE'],
    ['魔王自己（0 号，活着时才是 MASTER）', { 'base:0:0': 1 }, 'MASTER', 0],
    ['魔王自己但濒死 → 先命中 BASE', BASE, 'BASE', 0],
    ['非待机（CFLAG:1 != 0）', { ...BASE, 'cflag:1:1': 2 }, 'BUSY'],
    [
      '未驯服（CFLAG:0 == 0 且 TALENT:254 == 0）',
      { 'base:1:0': 1, 'cflag:1:0': 0 },
      'UNTAMED',
    ],
    [
      '未驯服但可被卖（TALENT:254 == 1）→ 放行',
      { 'base:1:0': 1, 'talent:1:254': 1 },
      0,
    ],
    [
      '孕妇（TALENT:153 == 1，出征位关）',
      { ...BASE, 'talent:1:153': 1 },
      'PREGNANT',
    ],
    [
      '孕妇且开了出征位（FLAG:5 位 10）→ 放行',
      { ...BASE, 'talent:1:153': 1, 'flag:5': 1 << 10 },
      0,
    ],
    [
      '近卫兵（EX_TALENT:1 且无 EX_TALENT:2）',
      { ...BASE, 'ex_talent:1:1': 1 },
      'GUARD',
    ],
    [
      '后代（EX_TALENT:1 + 2，出征位关）',
      { ...BASE, 'ex_talent:1:1': 1, 'ex_talent:1:2': 1 },
      'CHILD',
    ],
    [
      '后代且开了出征位（EX_FLAG:9000 位 1）→ 放行',
      {
        ...BASE,
        'ex_talent:1:1': 1,
        'ex_talent:1:2': 1,
        'exflag:9000': 1 << 1,
      },
      0,
    ],
  ];
  for (const [label, seed, expected, target = 1] of CASES) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_dispatchable(fixture, 1);
    for (const [name, value] of Object.entries(seed)) {
      fixture.store.set(name, value);
    }
    const { reject_reason } = fixture.load_module('page/page-intercept');
    assert.equal(reject_reason(target), expected, label);
  }
  // 每位的边界：FLAG:5 位 10 的「相邻位不算」——位 9 与位 11 都不放行
  for (const bit of [1 << 9, 1 << 11]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_dispatchable(fixture, 1);
    fixture.store.set('talent:1:153', 1);
    fixture.store.set('flag:5', bit);
    const { reject_reason } = fixture.load_module('page/page-intercept');
    assert.equal(reject_reason(1), 'PREGNANT', `位 ${bit} 不是出征位`);
  }
});

// —— 角色列表画面（$INPUT_LOOP_MAIN0）——

test('INTERCEPT：列表只出可派遣者，页脚三键与返回', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  add_dispatchable(fixture, 2, '菲娅');
  // 不可派遣：3 号侵攻中、4 号濒死、5 号未驯服
  add_dispatchable(fixture, 3);
  fixture.store.set('cflag:3:1', 2);
  add_dispatchable(fixture, 4);
  fixture.store.set('base:4:0', 0);
  add_chara(fixture, 5);
  fixture.store.set('base:5:0', 1);
  const { ret, added } = await run_intercept(fixture, [999]);
  assert.equal(ret, 0, '返回 0');
  assert.deepEqual(
    accs(added),
    [1, 2, 1000, 999, 1001],
    '只有可派遣的 1、2 号 + 页脚三键',
  );
  assert.ok(
    texts(added).includes('<状态若不为[可被卖]、将需要6000pt资金来派遣>'),
    '费用提示行（COST = 6000）',
  );
  assert.ok(texts(added).includes('派遣谁前去迎击勇者？'));
});

test('INTERCEPT：翻页按命中序号（NUM_PAGE = 26）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  for (let cid = 1; cid <= 27; cid += 1) {
    add_dispatchable(fixture, cid);
  }
  const { added } = await run_intercept(fixture, [1001, 999]);
  const draws = [];
  let current = [];
  for (const line of added) {
    current.push(line);
    if (line.type === 'button' && line.accelerator === 1001) {
      draws.push(current);
      current = [];
    }
  }
  const ids_of = (draw) =>
    draw.filter((l) => l.type === 'button').map((l) => l.accelerator);
  assert.equal(ids_of(draws[0]).filter((a) => a >= 1 && a <= 27).length, 26);
  assert.deepEqual(
    ids_of(draws[1]).filter((a) => a >= 1 && a <= 27),
    [27],
    '第 2 页只剩第 27 个命中项',
  );
});

test('INTERCEPT：金钱不足（可被卖状态但要付费）拦下派遣', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '玛奥'); // CFLAG:0 == 0（未驯服）但 TALENT:254 == 1（可被卖）
  fixture.store.set('base:1:0', 1);
  fixture.store.set('talent:1:254', 1);
  fixture.store.set('flag:10004', 5000); // MONEY < COST
  const { added } = await run_intercept(fixture, [1, 999]);
  assert.ok(
    texts(added).includes('金钱不足，玛奥无视了你的命令'),
    '金钱不足提示（:390）',
  );
  assert.ok(!texts(added).includes('玛奥的迎击设定'), '没进迎击设定画面');
});

// —— 迎击设定三层（$INPUT_LOOP_MAIN / _4 / _3）——

test('INTERCEPT：派遣费的门槛两侧（5999 拦、6000 放行）', async () => {
  for (const [money, blocked] of [
    [5999, true],
    [6000, false],
  ]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    // 付费派遣：CFLAG:0 == 0（未驯服）且 TALENT:254 == 1（可被卖）
    add_chara(fixture, 1, '玛奥');
    fixture.store.set('base:1:0', 1);
    fixture.store.set('talent:1:254', 1);
    fixture.store.set('flag:10004', money);
    // 拦下时停在列表（[999] 退出）；放行时进迎击设定，用 [998] 出击
    const { added } = await run_intercept(
      fixture,
      blocked ? [1, 999] : [1, 998],
    );
    assert.equal(
      texts(added).includes('金钱不足，玛奥无视了你的命令'),
      blocked,
      `MONEY ${money} 的派遣门`,
    );
    if (!blocked) {
      assert.equal(fixture.store.get('flag:10004'), 0, '正好 6000 能派出');
    }
  }
});

test('INTERCEPT：补给费与合计门槛的两侧（2000 / 6000+2000）', async () => {
  // 单纯不够：1999 拦、2000 放行
  for (const [money, blocked] of [
    [1999, true],
    [2000, false],
  ]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_dispatchable(fixture, 1, '玛奥');
    fixture.store.set('flag:10004', money);
    const { added } = await run_intercept(fixture, [1, 2, 999, 999]);
    assert.equal(
      texts(added).includes('* 魔王大人，你怎么这么穷 *'),
      blocked,
      `MONEY ${money} 的补给门`,
    );
  }
  // 付费派遣时还要多留 COST：7999 拦、8000 放行
  for (const [money, blocked] of [
    [7999, true],
    [8000, false],
  ]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_chara(fixture, 1, '玛奥');
    fixture.store.set('base:1:0', 1);
    fixture.store.set('talent:1:254', 1); // 未驯服 + 可被卖 = 要付 COST
    fixture.store.set('flag:10004', money);
    const { added } = await run_intercept(fixture, [1, 2, 999, 999]);
    assert.equal(
      texts(added).includes('* 魔王大人，你怎么这么穷 *'),
      blocked,
      `MONEY ${money} 的合计门（COST + 2000）`,
    );
  }
});

test('INTERCEPT：补给可取消（[2] 再按一次回到裸奔）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  fixture.store.set('flag:10004', 100000);
  const { added } = await run_intercept(fixture, [1, 2, 2, 998]);
  const supply_buttons = added.filter(
    (l) => l.type === 'button' && l.accelerator === 2,
  );
  assert.ok(
    supply_buttons.some((l) => l.text.includes('全副整装')),
    '先置上补给',
  );
  assert.ok(
    supply_buttons.some((l) => l.text.includes('裸奔吧')),
    ':468-470 再按一次取消补给',
  );
  assert.equal(fixture.store.get('flag:10004'), 100000, '取消后不扣补给费');
});

test('INTERCEPT：行动 3（扩张设施）在出击时另扣 2000', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥'); // 已驯服 → 免 COST
  fixture.store.set('cflag:0:9', 30);
  fixture.store.set('flag:352', 60); // 3 层有设施
  fixture.store.set('itemname:60', '陷阱屋');
  fixture.store.set('flag:362', 0); // 还可扩张
  fixture.store.set('flag:10004', 100000);
  fixture.store.set('exflag:4444', 100000);
  // [1] 选人 → [0] 出发阶层 → [3] 层 → [1] 行动 → [3] 扩张 → [998] 出击
  await run_intercept(fixture, [1, 0, 3, 1, 3, 998]);
  assert.equal(
    fixture.store.get('flag:10004'),
    100000 - 2000,
    ':449 的扩张费在出击时扣',
  );
  assert.equal(fixture.store.get('exflag:4444'), 100000 - 2000);
  assert.equal(fixture.store.get('cflag:1:500'), 3, 'WORK = 3 写回');
});

test('INTERCEPT：出击决定写入状态与扣款，并调 @GOHOUBI_REQUEST', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  // 付费派遣的门槛：CFLAG:0 == 0（未驯服）且 TALENT:254 == 1（可被卖）
  add_chara(fixture, 1, '玛奥');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('talent:1:254', 1);
  fixture.store.set('talent:1:85', 1); // 爱慕 → GOHOUBI_REQUEST 走 4-6 档
  fixture.store.set('flag:10004', 100000); // MONEY
  fixture.store.set('exflag:4444', 100000);
  const { ret, added } = await run_intercept(fixture, [1, 998]);
  assert.equal(ret, 0);
  assert.ok(
    texts(added).includes('支付了金钱'),
    ':410-411 可被卖状态之外的派遣要付费',
  );
  assert.ok(texts(added).includes('*玛奥作为你的爪牙外出迎击了*'));
  assert.equal(fixture.store.get('cflag:1:1'), 3, 'CFLAG:1 = 3（迎击中）');
  assert.equal(fixture.store.get('cflag:1:500'), 0, 'CFLAG:500 = WORK');
  assert.equal(
    fixture.store.get('cflag:1:501'),
    9,
    'CFLAG:501 = 出发阶层（缺省 9）',
  );
  assert.equal(fixture.store.get('cflag:1:502'), 90, 'CFLAG:502 = 90');
  assert.equal(fixture.store.get('cflag:1:505'), 0, 'CFLAG:505 = 0');
  assert.equal(fixture.store.get('flag:10004'), 100000 - 6000, '扣 COST');
  assert.equal(fixture.store.get('exflag:4444'), 100000 - 6000);
  // @GOHOUBI_REQUEST：爱慕（TALENT:85）→ WISH = RAND:3 + 4 = 7（rand 恒 3）
  assert.equal(fixture.store.get('cflag:1:504'), 7, 'CFLAG:504 = WISH');
  assert.ok(
    texts(added).some((t) => t.includes('@GOHOUBI_REQUEST_KOUJO')),
    '口上侧存根（#397 冻死的调用面，体随 #403）',
  );
});

test('INTERCEPT：已驯服（CFLAG:0 > 0）的选择免 COST', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥'); // CFLAG:0 = 1
  fixture.store.set('flag:10004', 100000);
  const { added } = await run_intercept(fixture, [1, 998]);
  assert.ok(!texts(added).includes('支付了金钱'), '不打印付费提示');
  assert.equal(fixture.store.get('flag:10004'), 100000, '钱不动');
});

test('INTERCEPT：出发阶层设定（1-9）写回 CFLAG:501', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  const { added } = await run_intercept(fixture, [1, 0, 5, 0, 9, 998]);
  assert.ok(texts(added).includes('出发层设定'));
  assert.ok(texts(added).includes('从那一层出发？ (1-9)'));
  assert.equal(
    fixture.store.get('cflag:1:501'),
    9,
    '上限 9 可选中（FLOOR_MAX）',
  );
  // 下限一侧：从 9 改选 1 也能过（同一支的边界）
  const low = create_era_fixture();
  add_chara(low, 0, '你');
  add_dispatchable(low, 1, '玛奥');
  const { added: one } = await run_intercept(low, [1, 0, 9, 0, 1, 998]);
  assert.equal(low.store.get('cflag:1:501'), 1, '下限 1 可选中（FLOOR_MIN）');
  assert.ok(texts(one).includes('出发层设定'));
});

test('INTERCEPT：行动设定的六个等级门逐档两侧（WORK_GATES 的五档阈值）', async () => {
  // 阈值 10/20/30/40/50：每一档取「恰好够」与「差 1」两个等级，断言可点集合
  const LABELS = [
    '内职',
    '卖淫',
    '补充陷阱',
    '扩张设施(要2000G)',
    '潜入工作',
    '训练',
  ];
  const CASES = [
    [9, LABELS.slice(0, 1)],
    [10, LABELS.slice(0, 2)],
    [19, LABELS.slice(0, 2)],
    [20, LABELS.slice(0, 3)],
    [29, LABELS.slice(0, 3)],
    [30, LABELS.slice(0, 4)],
    [39, LABELS.slice(0, 4)],
    [40, LABELS.slice(0, 5)],
    [49, LABELS.slice(0, 5)],
    [50, LABELS.slice(0, 6)],
  ];
  for (const [level, expected] of CASES) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_dispatchable(fixture, 1, '玛奥');
    fixture.store.set('cflag:0:9', level);
    // 进迎击设定 → 行动设定；选「内职」（0）退回来，再退出
    const { added } = await run_intercept(fixture, [1, 1, 0, 999, 999]);
    const labels = added
      .filter((l) => l.type === 'button')
      .map((l) => l.text)
      .filter((t) => LABELS.includes(t));
    assert.deepEqual([...new Set(labels)], expected, `${level} 级可点的行动档`);
  }
});

test('INTERCEPT：行动设定的等级门渲染（19 级看不到卖淫、55 级全可见）', async () => {
  for (const level of [19, 55]) {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_dispatchable(fixture, 1, '玛奥');
    fixture.store.set('cflag:0:9', level);
    // 行动设定画面没有 [999]（原作 :552-598 只给 0-5），必须选一档才回得去。
    // 断言按按钮**正文**（档名）走：设置画面的 [0]/[1]/[2] 与行动档编号撞车，
    // 只看 accelerator 分不出是哪个画面。
    const action = level < 20 ? 1 : 5;
    const { added } = await run_intercept(fixture, [1, 1, action, 999, 999]);
    const labels = added.filter((l) => l.type === 'button').map((l) => l.text);
    const dimmed = texts(added).filter((t) => t.includes('（魔王等级不足）'));
    if (level < 20) {
      assert.ok(
        labels.includes('内职') && labels.includes('卖淫'),
        '0、1 可点',
      );
      for (const absent of [
        '补充陷阱',
        '扩张设施(要2000G)',
        '潜入工作',
        '训练',
      ]) {
        assert.ok(!labels.includes(absent), `${absent}（≥20）不该是按钮`);
      }
      assert.equal(dimmed.length, 4, '其余四档灰显为纯文本');
    } else {
      for (const label of [
        '内职',
        '卖淫',
        '补充陷阱',
        '扩张设施(要2000G)',
        '潜入工作',
        '训练',
      ]) {
        assert.ok(labels.includes(label), `${label} 可点（${level} 级）`);
      }
      assert.equal(dimmed.length, 0, '无灰显档');
    }
  }
});

test('INTERCEPT：行动设定选卖淫 → WORK = 1 写回 CFLAG:500', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  fixture.store.set('cflag:0:9', 10);
  const { added } = await run_intercept(fixture, [1, 1, 1, 998]);
  assert.ok(texts(added).includes('得到了在地下城中对怪物们卖淫的许可'));
  assert.equal(fixture.store.get('cflag:1:500'), 1, 'CFLAG:500 = WORK = 1');
});

test('INTERCEPT：行动设定选扩张设施（3）——无设施 / 已到上限两支', async () => {
  // 无设施：FLAG:(FLOOR+349) == 0
  const none = create_era_fixture();
  add_chara(none, 0, '你');
  add_dispatchable(none, 1, '玛奥');
  none.store.set('cflag:0:9', 30);
  {
    const { added } = await run_intercept(none, [1, 0, 3, 1, 3, 999, 999]);
    assert.ok(
      texts(added).includes('3层没有任何设施'),
      '出发层 3 没有设施（:534）',
    );
    assert.equal(none.store.get('cflag:1:500') ?? 0, 0, 'WORK 没被改动');
  }
  // 已到上限：FLAG:(FLOOR+349+10) == 3
  const maxed = create_era_fixture();
  add_chara(maxed, 0, '你');
  add_dispatchable(maxed, 1, '玛奥');
  maxed.store.set('cflag:0:9', 30);
  maxed.store.set('flag:352', 60); // 3 层的设施 = 道具 60
  maxed.store.set('itemname:60', '陷阱屋');
  maxed.store.set('flag:362', 3); // 扩张等级已满
  {
    const { added } = await run_intercept(maxed, [1, 0, 3, 1, 3, 999, 999]);
    assert.ok(
      texts(added).includes('3层的陷阱屋已经扩张到极限了。'),
      '已到上限（:542）',
    );
  }
});

test('INTERCEPT：行动设定选扩张设施（3）——资金不足拦下', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  fixture.store.set('cflag:0:9', 30);
  fixture.store.set('flag:352', 60);
  fixture.store.set('itemname:60', '陷阱屋');
  fixture.store.set('flag:362', 0); // 还可扩张
  fixture.store.set('flag:10004', 1000); // < 2000
  const { added } = await run_intercept(fixture, [1, 0, 3, 1, 3, 999, 999]);
  assert.ok(
    texts(added).includes('* 魔王大人，你怎么这么穷 *'),
    '扩张费用不足（:643）',
  );
  assert.equal(fixture.store.get('cflag:1:500') ?? 0, 0, 'WORK 没被改动');
});

test('INTERCEPT：道具补给（[2]）——三次抽奖都成功则不退款', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  fixture.store.set('flag:10004', 100000);
  fixture.store.set('exflag:4444', 100000);
  const { added } = await run_intercept(fixture, [1, 2, 998], const_rand(3));
  assert.ok(
    added.some((l) => l.type === 'button' && l.text.includes('全副整装')),
    '补给标志置 1 后显示全副整装（在 [2] 按钮正文里）',
  );
  // 已驯服（CFLAG:0 > 0）→ 免 COST，只扣补给 2000
  assert.equal(fixture.store.get('flag:10004'), 100000 - 2000);
  assert.equal(fixture.store.get('exflag:4444'), 100000 - 2000);
  assert.ok(
    !texts(added).includes('补给已满，资金被退还了。'),
    '三件都入手 → 不退款',
  );
  // 三次抽奖的轮数（:495 `FOR LOCAL:1, 0, 3`）：三次各打一行入手提示
  assert.equal(
    texts(added).filter((t) => t.includes('入手了')).length,
    3,
    '补给是三次抽奖',
  );
});

test('INTERCEPT：道具补给——一件都没入手就把 2000 退回来', async () => {
  // rand 恒 0 → @ADD_EX_ITEM 走换武器支、floor(0) <= 等级(0) → 恒返回 0
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  fixture.store.set('flag:10004', 100000);
  fixture.store.set('exflag:4444', 100000);
  const { added } = await run_intercept(fixture, [1, 2, 998], const_rand(0));
  assert.ok(texts(added).includes('补给已满，资金被退还了。'), ':502 退款');
  assert.equal(fixture.store.get('flag:10004'), 100000, '退款后净扣为零');
  assert.equal(fixture.store.get('exflag:4444'), 100000);
});

test('INTERCEPT：道具补给的钱不够两支（单纯不够 / 付费派遣时还要多留 COST）', async () => {
  // 单纯不够：MONEY < 2000
  const poor = create_era_fixture();
  add_chara(poor, 0, '你');
  add_dispatchable(poor, 1, '玛奥');
  poor.store.set('flag:10004', 1500);
  {
    const { added } = await run_intercept(poor, [1, 2, 999, 999]);
    assert.ok(texts(added).includes('* 魔王大人，你怎么这么穷 *'));
    assert.ok(!texts(added).some((t) => t.includes('全副整装')));
  }
  // 付费派遣（CFLAG:0 == 0）：MONEY ≥ 2000 但要再留 COST 时不够 COST + 2000
  const tight = create_era_fixture();
  add_chara(tight, 0, '你');
  add_chara(tight, 1, '玛奥');
  tight.store.set('base:1:0', 1);
  tight.store.set('talent:1:254', 1);
  tight.store.set('flag:10004', 7000); // ≥ 2000 但 < 6000 + 2000
  {
    const { added } = await run_intercept(tight, [1, 2, 999, 999]);
    assert.ok(texts(added).includes('* 魔王大人，你怎么这么穷 *'));
    assert.ok(!texts(added).some((t) => t.includes('全副整装')));
  }
});

// —— @GOHOUBI_REQUEST（:661-691） ——

/** 定值序随机源（依次吐 values，用尽后重复末值） */
function seq(values) {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)];
}

test('GOHOUBI_REQUEST：WISH 三档判据整表驱动（含 RAND:3 == 0 的门槛与 6→4 降级）', async () => {
  /** @param {object} seed 角色预置 @param {number|number[]} roll rand 的返回值 */
  const run_case = async (seed, roll) => {
    const fixture = create_era_fixture();
    add_chara(fixture, 0, '你');
    add_dispatchable(fixture, 1, '玛奥');
    for (const [name, value] of Object.entries(seed)) {
      fixture.store.set(name, value);
    }
    const { gohoubi_request } = fixture.load_module(
      'system/stronghold/gohoubi-request',
    );
    await gohoubi_request(1, seq(Array.isArray(roll) ? roll : [roll]));
    return fixture.store.get('cflag:1:504');
  };

  // 女装（TALENT:136）：第一掷 RAND:3 == 0 才进这一档，第二掷定 1-3
  assert.equal(
    await run_case({ 'talent:1:136': 1 }, [0, 0]),
    1,
    '门槛过 + 抽 0 → 1',
  );
  assert.equal(
    await run_case({ 'talent:1:136': 1 }, [0, 2]),
    3,
    '门槛过 + 抽 2 → 3',
  );
  // 第一掷 1/2 时不进这一档，落到后面的档（此处无其他素质 → 0）
  assert.equal(await run_case({ 'talent:1:136': 1 }, [1]), 0, '门槛不过 → 0');
  // 爱慕（TALENT:85）→ 4-6，魔王两者皆非时 6 降为 4
  assert.equal(await run_case({ 'talent:1:85': 1 }, 0), 4);
  assert.equal(await run_case({ 'talent:1:85': 1 }, 1), 5);
  assert.equal(
    await run_case({ 'talent:1:85': 1 }, 2),
    4,
    '魔王两者皆非 → 6 降为 4',
  );
  assert.equal(
    await run_case({ 'talent:1:85': 1, 'talent:0:121': 1 }, 2),
    6,
    '魔王是扶她 → 保留 6',
  );
  // 淫乱（TALENT:76）→ 7-9
  assert.equal(await run_case({ 'talent:1:76': 1 }, 0), 7);
  assert.equal(await run_case({ 'talent:1:76': 1 }, 2), 9);
  // 都没有 → 0（且不消费随机数）
  assert.equal(await run_case({}, 0), 0);
  // 优先级：女装 > 爱慕 > 淫乱（同时具备时取前者）
  assert.equal(
    await run_case({ 'talent:1:136': 1, 'talent:1:85': 1 }, [0, 0]),
    1,
    '女装优先',
  );
  assert.equal(
    await run_case({ 'talent:1:85': 1, 'talent:1:76': 1 }, 0),
    4,
    '爱慕优先于淫乱',
  );
});

test('GOHOUBI_REQUEST：魔王同时是男与扶她时 6 也降级（判据是两者皆非）', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_dispatchable(fixture, 1, '玛奥');
  fixture.store.set('talent:1:85', 1);
  fixture.store.set('talent:0:122', 1); // 魔王是男
  const { gohoubi_request } = fixture.load_module(
    'system/stronghold/gohoubi-request',
  );
  await gohoubi_request(1, const_rand(2));
  assert.equal(fixture.store.get('cflag:1:504'), 6, '魔王是男 → 保留 6');
});

test('GOHOUBI_REQUEST_KOUJO：调用面（签名）由本票冻结、体是占位', async () => {
  const fixture = create_era_fixture();
  const { gohoubi_request_koujo } = fixture.load_module(
    'kojo/kojo-dungeon-after',
  );
  assert.equal(typeof gohoubi_request_koujo, 'function');
  assert.equal(gohoubi_request_koujo.length, 1, '只有一个形参 cid');
  assert.equal(await gohoubi_request_koujo(3), 0);
  assert.ok(
    fixture.text_lines().some((t) => t.includes('@GOHOUBI_REQUEST_KOUJO')),
    '存根行带原作函数名（#403 接线前可见）',
  );
});
