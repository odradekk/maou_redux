/**
 * @file ere/page/page-tailor.js 的行为测试（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_TAILOR.ERB 全 12 函数。
 *
 * 接缝 = test/helpers/era-fixture.js。四张物品表整表驱动（覆盖面标准：价格档、
 * 素质编号、顺从档这些字面量被改动时都要有红）：
 *   - 日常服饰 2 件、普通装备 42 件（5 页）、黑市 27 件（3 页）、装备品 43 件
 *     （5 页）——逐件走「选中 → CFLAG 写入」的全链；
 *   - 顺从档的动态判据（ABL:21、素质 63/88/124/136/122/153 等）单列用例；
 *   - 装备的强化数学（千位强度、超限回退、十万位前缀）表驱动。
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

/** 建一个「可换装的奴隶 1 号 + 魔王」的档，钱与顺从都够 */
function tailor_fixture(seed = {}) {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '玛奥');
  fixture.store.set('base:1:0', 1); // 活着
  fixture.store.set('cflag:1:1', 0); // 待机
  fixture.store.set('abl:1:10', 99); // 顺从足够（各档 S 都过）
  fixture.store.set('flag:10004', 10000000);
  fixture.store.set('exflag:4444', 10000000);
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  return fixture;
}

/** 跑一次 @TAILOR_CORE，返回新增的输出行 */
async function run_core(fixture, inputs, cid = 1) {
  fixture.set_inputs(...inputs);
  const before = fixture.lines.length;
  const { tailor_core } = fixture.load_module('page/page-tailor');
  await tailor_core(cid);
  return fixture.lines.slice(before);
}

const accs = (lines) =>
  lines.filter((l) => l.type === 'button').map((l) => l.accelerator);
const texts = (lines) =>
  lines.filter((l) => l.type === 'text').map((l) => l.text);
const button_with = (lines, label) =>
  lines.find((l) => l.type === 'button' && l.text === label);

test('TAILOR_MAIN：标题/日期/成员列表与返回；三道守卫拦下不合格的选择', async () => {
  const fixture = create_era_fixture();
  add_chara(fixture, 0, '你');
  add_chara(fixture, 1, '玛奥');
  fixture.store.set('base:1:0', 1);
  fixture.store.set('cflag:1:1', 0);
  fixture.store.set('flag:10004', 5000);
  fixture.store.set('flag:10000', 10); // 第 11 天
  fixture.store.set('flag:10003', 1); // 午后
  fixture.set_inputs(999);
  const before = fixture.lines.length;
  const { tailor_main } = fixture.load_module('page/page-tailor');
  assert.equal(await tailor_main(), 0);
  const added = fixture.lines.slice(before);
  const body = texts(added);
  assert.ok(body.includes('服装设计师'));
  assert.ok(body.includes('《这里是制作衣装的服饰店》'));
  assert.ok(body.includes('11日 午后'), 'DAY+1 与时段（:24-30）');
  assert.ok(body.includes('所持金：5000点'));
  assert.ok(body.includes('调整谁的衣装？'));
  assert.deepEqual(accs(added), [1, 999], '成员行 + 返回键');
});

test('LIFE_LIST_TAILOR：行渲染三态（穿着/内衣/全裸）+ 特别服装 + 武器戒指', async () => {
  // 全裸
  const bare = tailor_fixture();
  const { life_list_tailor } = bare.load_module('page/page-tailor');
  life_list_tailor();
  assert.ok(
    texts(bare.lines).some((t) => t.includes('玛奥') && t.includes('全裸着')),
    '无上衣无内衣 → 全裸着',
  );

  // 穿着上衣（CFLAG:41 + 45 >= 0）
  const worn = tailor_fixture({
    'cflag:1:41': 1,
    'cflag:1:45': 0,
    'cflag:1:42': 79,
    'cflag:1:47': 0,
    'cflag:1:550': 40, // 武器（识别号 40 = 剑）
  });
  const mod = worn.load_module('page/page-tailor');
  mod.life_list_tailor();
  const row = texts(worn.lines).join('\n');
  assert.ok(row.includes('穿着日常服装'), '上衣名取自 PRINT_CLOTHTYPE_MAIN2');
  assert.ok(row.includes('佩戴着贞操带'), '特别服装（CFLAG:42 = 79）');
  assert.ok(row.includes('/ ['), '武器段有方括号包裹');

  // 内衣（上衣为 0，内衣服）
  // 内衣支的判据是「上衣有、且 45/46 都为负」（任一大等于 0 就走穿着支）
  const under = tailor_fixture({
    'cflag:1:41': 1,
    'cflag:1:45': -1,
    'cflag:1:46': -1,
    'cflag:1:43': 0,
  });
  const m2 = under.load_module('page/page-tailor');
  m2.life_list_tailor();
  assert.ok(
    texts(under.lines).some((t) => t.includes('穿着内衣')),
    '无外衣但有内衣',
  );
});

test('TAILOR_CORE：主菜单选项与条件门（尿布 4 / 贞操带钥匙 5）', async () => {
  const plain = tailor_fixture();
  {
    await run_core(plain, [999]);
    const ids = accs(plain.lines);
    assert.ok(ids.includes(0) && ids.includes(1) && ids.includes(3));
    assert.ok(!ids.includes(4), '未穿尿布（CFLAG:42 != 69）不给 [4]');
    assert.ok(!ids.includes(5), '没有贞操带钥匙选项');
    assert.ok(ids.includes(7) && ids.includes(8), '魔法装备与武器');
  }
  const diapered = tailor_fixture({
    'cflag:1:42': 69,
    'cflag:1:40': 0,
  });
  {
    await run_core(diapered, [999]);
    assert.ok(accs(diapered.lines).includes(4), '穿着尿布 → 有 [4]');
    assert.ok(
      button_with(diapered.lines, '替换尿布（50点）'),
      '尿布价格 50 印在按钮正文里',
    );
  }
  const chastity = tailor_fixture({
    'cflag:1:42': 79,
    'cflag:1:40': 64,
    'cflag:1:49': 0,
    'talent:1:0': 1,
  });
  {
    await run_core(chastity, [999]);
    assert.ok(accs(chastity.lines).includes(5), '贞操带 + 有钥匙 → 有 [5]');
  }
});

test('TAILOR_CASUAL：两件整表驱动（含男性 S = 3 的门槛）', async () => {
  const { CASUAL_ITEMS } = tailor_fixture().load_module('page/page-tailor');
  for (const item of CASUAL_ITEMS) {
    const fixture = tailor_fixture();
    await run_core(fixture, [0, item.n]);
    assert.equal(
      fixture.store.get('cflag:1:41'),
      item.r,
      `日常服饰 ${item.label} → CFLAG:41 = ${item.r}`,
    );
    assert.equal(fixture.store.get('flag:10004'), 10000000 - 100, '扣 100 点');
  }
  // 裙子（1）对男性角色要求 S = 3：顺从 2 时被拒
  const male = tailor_fixture({ 'talent:1:122': 1, 'abl:1:10': 2 });
  await run_core(male, [0, 1, 999]); // 被拒后回主菜单，再 [999] 退出
  assert.ok(texts(male.lines).includes('拒绝穿戴。'), '男性穿裙子要顺从 3');
  assert.equal(male.store.get('cflag:1:41') ?? 0, 0, '没穿上');
  // 顺从 3 就穿得上
  const male_ok = tailor_fixture({ 'talent:1:122': 1, 'abl:1:10': 3 });
  await run_core(male_ok, [0, 1]);
  assert.equal(male_ok.store.get('cflag:1:41'), 1);
});

test('TAILOR_NORMAL：42 件整表驱动（编号 → CFLAG:41 = R，价格 1000）', async () => {
  const { NORMAL_ITEMS } = tailor_fixture().load_module('page/page-tailor');
  assert.equal(NORMAL_ITEMS.length, 42, '普通装备表 42 件');
  for (const item of NORMAL_ITEMS) {
    const fixture = tailor_fixture();
    // 先翻到该件所在的页（下一页键 997），再选中
    await run_core(fixture, [1, ...Array(item.page).fill(997), item.n]);
    assert.equal(
      fixture.store.get('cflag:1:41'),
      item.r,
      `${item.label}（第 ${item.page + 1} 页 [${item.n}]）→ CFLAG:41 = ${item.r}`,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      10000000 - 1000,
      '扣 1000 点',
    );
  }
});

test('TAILOR_NORMAL：童装（第 2 件）的三条 S 判据（娇小免顺从 / 男性至少 3 / 默认 5）', async () => {
  // 四档来源：默认 5 / 娇小类素质 → 0 / 男性 → 至少 3
  const CASES = [
    [{}, 5],
    [{ 'talent:1:132': 1 }, 0], // 娇小
    [{ 'talent:1:135': 1 }, 0], // 未成长
    [{ 'talent:1:131': 1 }, 0], // 幼儿体质
    [{ 'talent:1:122': 1 }, 5], // 男性单独不降（SIF 只在 S 已被降到 0 时抬到 3）
    [{ 'talent:1:122': 1, 'talent:1:132': 1 }, 3], // 娇小 + 男性 → 0 抬到 3
  ];
  for (const [seed, s] of CASES) {
    const probe = tailor_fixture(seed);
    const child = probe
      .load_module('page/page-tailor')
      .NORMAL_ITEMS.find((item) => item.n === 2);
    assert.equal(child.s(1), s, `童装的 S（${JSON.stringify(seed)}）`);
    // 顺从恰好等于 S 时穿得上
    const pass = tailor_fixture({ ...seed, 'abl:1:10': s });
    await run_core(pass, [1, 2]);
    assert.equal(pass.store.get('cflag:1:41'), 22, `顺从 ${s} 时穿上`);
    // 差 1 时被拒（S = 0 无门槛，跳过）
    if (s > 0) {
      const fail = tailor_fixture({ ...seed, 'abl:1:10': s - 1 });
      await run_core(fail, [1, 2, 999]);
      assert.ok(
        texts(fail.lines).includes('拒绝穿戴。'),
        `顺从 ${s - 1} 时被拒`,
      );
    }
  }
});

test('TAILOR_NORMAL_SPECIAL：黑市 27 件整表驱动（价格 30000）', async () => {
  const { SPECIAL_ITEMS } = tailor_fixture().load_module('page/page-tailor');
  assert.equal(SPECIAL_ITEMS.length, 27, '黑市表 27 件');
  for (const item of SPECIAL_ITEMS) {
    const fixture = tailor_fixture();
    // [1] 普通装备 → [996] 服装黑市 → 黑市翻页（997）→ 选中
    await run_core(fixture, [1, 996, ...Array(item.page).fill(997), item.n]);
    assert.equal(
      fixture.store.get('cflag:1:41'),
      item.r,
      `黑市 ${item.label} → CFLAG:41 = ${item.r}`,
    );
    assert.equal(fixture.store.get('flag:10004'), 10000000 - 30000);
  }
});

test('TAILOR_NORMAL：黑市 [999] 取消回 CORE 主菜单（原作 :545 → :550 RETURN 1）', async () => {
  // 钱够 30000 → 真的进了黑市菜单；取消后由 CORE 的 `A == 0` 回主菜单，
  // 不是留在普通装备页（原作 :545 的 CALL 之后落到 :550 的 RETURN 1）
  const fixture = tailor_fixture({ 'flag:10004': 100000 });
  const added = await run_core(fixture, [1, 996, 999, 999]);
  assert.ok(
    texts(added).some((t) => t.includes('□黑市服装')),
    '先真的进了黑市（不是被入口守卫拦下的那支）',
  );
  const core_menus = added.filter(
    (l) => l.type === 'button' && l.text.includes('日常服饰'),
  );
  assert.equal(core_menus.length, 2, '取消后回主菜单重绘一次（首绘 + 重绘）');
  assert.equal(fixture.store.get('cflag:1:41') ?? 0, 0, '取消不换装');
  assert.equal(fixture.store.get('flag:10004'), 100000, '取消不扣钱');
});

test('TAILOR_NORMAL：黑市买成（对照：走 :550 的同一出口但带着 A = 2）', async () => {
  const fixture = tailor_fixture({ 'flag:10004': 100000 });
  await run_core(fixture, [1, 996, 1]);
  assert.equal(fixture.store.get('cflag:1:41'), 17, '黑市第 1 件（高中制服）');
  assert.equal(fixture.store.get('flag:10004'), 100000 - 30000, '扣 30000');
});

test('TAILOR_ACCESSORY：43 件整表驱动（价格随件、CFLAG:42 = R）', async () => {
  const { ACCESSORY_ITEMS } = tailor_fixture().load_module('page/page-tailor');
  assert.equal(ACCESSORY_ITEMS.length, 43, '装备品表 43 件');
  {
    // 页数 = (LOCAL:1 / 10) + 1 = 5（:566 的标题行）
    const page = tailor_fixture({ 'item:300': 1 });
    await run_core(page, [2, 999, 999]);
    assert.ok(
      texts(page.lines).some((t) => t.includes('5页')),
      '标题写 5 页',
    );
    // 装备品表的行以显示编号（1-43）为快捷键，正文=名字+价格（编号由引擎拼）
    const item = page.lines.find(
      (l) => l.type === 'button' && l.text.startsWith('围裙'),
    );
    assert.ok(item, '装备品行走按钮格');
    assert.equal(item.rendered, `[1] ${item.text}`, '正文里没有第二个 [1]');
  }
  for (const item of ACCESSORY_ITEMS) {
    const fixture = tailor_fixture();
    // [2] 其它 → 装备品表；翻页用 997；选中 item.n
    await run_core(fixture, [2, ...Array(item.page).fill(997), item.n]);
    assert.equal(
      fixture.store.get('cflag:1:42'),
      item.r,
      `${item.label}（${item.c} 点）→ CFLAG:42 = ${item.r}`,
    );
    assert.equal(
      fixture.store.get('flag:10004'),
      10000000 - item.c,
      `${item.label} 的价格 ${item.c}`,
    );
  }
});

test('TAILOR_ACCESSORY：顺从档的动态判据整表驱动（欲望/素质档）', async () => {
  // [件号, 预置, 期望 S]——S 由表里的函数算出，这里钉住每条分支
  const CASES = [
    [29, {}, 10], // 狗项圈：10 - ABL:21（欲望 0）
    [29, { 'abl:1:21': 7 }, 3], // 欲望 7 → 3，再被「< 3」钳到 3
    [29, { 'abl:1:21': 3 }, 7], // 10 - 3 = 7（无奴隶气质不封顶）
    [29, { 'abl:1:21': 3, 'talent:1:124': 1 }, 5], // 奴隶气质 → 上限 5
    [29, { 'abl:1:21': 8 }, 3], // 2 → 低于 3 时抬回 3
    [29, { 'talent:1:136': 1 }, 3], // 女装 → 直接 3
    [30, { 'abl:1:21': 2 }, 6], // 龟甲缚：8 - 2
    [30, { 'abl:1:21': 2, 'talent:1:88': 1 }, 3], // 被虐 → 3
    [31, {}, 6], // 牛铃：默认 6
    [31, { 'talent:1:110': 1, 'talent:1:130': 1 }, 3], // 爆乳 + 奶牛 → 3
    [35, { 'abl:1:21': 0 }, 8], // 涂鸦：8 - 0
    [37, {}, 5], // 魔法纹身固定 5
    [38, {}, 6], // 尿布默认 6
    [38, { 'talent:1:57': 1 }, 1], // 尿布爱好 → 1
    [39, {}, 0], // 贞操带默认 0
    [39, { 'talent:1:122': 1 }, 99], // 男性 → 99（穿不上）
    [42, {}, 6], // 戒指默认 6
    [42, { 'talent:1:85': 1 }, 1], // 爱慕 → 1
    [9, { 'talent:1:63': 1 }, 1], // 护士帽：2 - 护士资质
    [9, {}, 2],
  ];
  for (const [n, seed, s] of CASES) {
    const fixture = tailor_fixture({ ...seed, 'abl:1:10': 99 });
    const { ACCESSORY_ITEMS } = fixture.load_module('page/page-tailor');
    const item = ACCESSORY_ITEMS.find((entry) => entry.n === n);
    assert.equal(item.s(1), s, `[${n}] ${item.label} 的 S`);
    // 顺从刚好差 1 时被拒（钉住判据真的被用于准入）
    if (s > 0 && s <= 20) {
      const narrow = tailor_fixture({ ...seed, 'abl:1:10': s - 1 });
      await run_core(narrow, [2, ...Array(item.page).fill(997), n, 999]);
      assert.ok(
        texts(narrow.lines).includes('拒绝穿戴。'),
        `[${n}] S = ${s}：顺从 ${s - 1} 时拒绝`,
      );
    }
  }
});

test('TAILOR_CORE：钱不够时子菜单直接劝退（100 / 1000 / 30000 三档）', async () => {
  for (const [choice, price] of [
    [0, 100],
    [1, 1000],
  ]) {
    const fixture = tailor_fixture({ 'flag:10004': price - 1 });
    await run_core(fixture, [choice, 999]);
    assert.ok(texts(fixture.lines).includes('钱不够！'), `${price} 点档`);
    assert.equal(fixture.store.get('cflag:1:41') ?? 0, 0, '没买成');
  }
  // 黑市：钱够 1000（普通装备）但不够 30000（黑市）→ 点进黑市被劝退
  const special = tailor_fixture({ 'flag:10004': 2000 });
  await run_core(special, [1, 996, 999, 999]);
  assert.ok(texts(special.lines).includes('钱不够！'), '黑市 30000 档');
});

test('TAILOR_CORE：童装撑破两支（魁梧 → 下半身 / 巨乳 → 上半身）与「作罢」', async () => {
  // 魁梧（TALENT:99）+ 童装：强行套上 → F = 2 → CFLAG:46 = -3
  const big = tailor_fixture({ 'talent:1:99': 1, 'abl:1:10': 99 });
  await run_core(big, [1, 2, 0]);
  assert.ok(texts(big.lines).some((t) => t.includes('把衣服的下半身撑破啦！')));
  assert.equal(big.store.get('cflag:1:46'), -3, '下半身破（F = 2）');
  // 巨乳（非小型体型）+ 童装：强行套上 → F = 1 → CFLAG:44/45 = -3
  const busty = tailor_fixture({ 'talent:1:114': 1, 'abl:1:10': 99 });
  await run_core(busty, [1, 2, 0]);
  assert.ok(
    texts(busty.lines).some((t) => t.includes('把衣服的上半身撑破啦！')),
  );
  assert.equal(busty.store.get('cflag:1:45'), -3, '上半身破（F = 1）');
  assert.equal(busty.store.get('cflag:1:44'), -3);
  // 作罢 → 回主菜单，不写 CFLAG:41
  const give_up = tailor_fixture({ 'talent:1:99': 1 });
  await run_core(give_up, [1, 2, 1, 999]);
  assert.equal(give_up.store.get('cflag:1:41') ?? 0, 0, '作罢不换装');
});

test('TAILOR_CORE：内衣的旧内衣变卖（倍率表驱动：自慰狂 / 谜之魅力 / 高人气）', async () => {
  const CASES = [
    [{}, 50 * 6],
    [{ 'talent:1:74': 1 }, Math.trunc(300 * 1.5)],
    [{ 'talent:1:92': 1 }, 300 * 2.0],
    [{ 'talent:1:126': 1 }, Math.trunc(300 * 1.5)],
  ];
  for (const [seed, gain] of CASES) {
    const fixture = tailor_fixture({
      'cflag:1:43': 1,
      'cflag:1:48': 6,
      ...seed,
    });
    const before = fixture.store.get('flag:10004');
    await run_core(fixture, [3]);
    assert.equal(
      fixture.store.get('flag:10004'),
      before - 5 + gain,
      `卖掉旧内衣得 ${gain} 点（50 × 6 的倍率链）`,
    );
    assert.ok(
      texts(fixture.lines).some((t) => t.includes(`挣了${gain}点钱`)),
      '变卖提示',
    );
    // :196-205 内衣篇的固定清扫
    assert.equal(fixture.store.get('cflag:1:40'), 3);
    assert.equal(fixture.store.get('cflag:1:43'), 0);
    assert.equal(fixture.store.get('cflag:1:48'), 0);
  }
  // CFLAG:48 < 6 时不进变卖支
  const few = tailor_fixture({ 'cflag:1:43': 1, 'cflag:1:48': 5 });
  await run_core(few, [3]);
  assert.ok(!texts(few.lines).some((t) => t.includes('挣了')), '不足 6 条不卖');
});

test('CHASTITY_KEY：丢掉钥匙写 CFLAG:49 = 1；选「不丢」不写', async () => {
  // 选项 [5] 的门（:84）：CFLAG:42 == 79 且 CFLAG:40 位 64 且 CFLAG:49 == 0
  // 且 **TALENT:0（処女）为真**——极性是「处女才给」
  const KEY_GATE = {
    'cflag:1:42': 79,
    'cflag:1:40': 64,
    'cflag:1:49': 0,
    'talent:1:0': 1,
  };
  // 反例：不是处女（TALENT:0 == 0）时 [5] 不出现
  const not_virgin = tailor_fixture({ ...KEY_GATE, 'talent:1:0': 0 });
  await run_core(not_virgin, [999]);
  assert.ok(
    !accs(not_virgin.lines).includes(5),
    'TALENT:0 == 0（非处女）不给 [5]',
  );
  const drop = tailor_fixture(KEY_GATE);
  await run_core(drop, [5, 0, 999]);
  assert.equal(drop.store.get('cflag:1:49'), 1, '丢掉 → CFLAG:49 = 1');
  assert.ok(
    texts(drop.lines).some((t) => t.includes('再也没人知道了')),
    '演出台词',
  );
  const keep = tailor_fixture(KEY_GATE);
  await run_core(keep, [5, 1, 999]);
  assert.equal(keep.store.get('cflag:1:49') ?? 0, 0, '不丢 → 不写');
});

test('TAILOR_CORE：换装的应用行带动词实参（脱下 / 换上 / 身穿）', async () => {
  const fixture = tailor_fixture({
    'cflag:1:41': 1,
    'cflag:1:45': 0,
    'cflag:1:46': 0,
  });
  const added = await run_core(fixture, [0, 2]);
  const body = texts(added).join('\n');
  assert.ok(body.includes('日常服装'), '应用行带服装名');
  assert.ok(
    body.includes('脱下') || body.includes('换上'),
    ':168/:176 的 GET_CLOTHTYPE_MAIN2 动词实参（脱下 / 换上）',
  );
  assert.ok(body.includes('身穿'), ':73 的「现在…身穿…」行');
});

test('TAILOR_CORE：尿布（A = 11）清 CFLAG:47；装备品（A = 20）换 CFLAG:42', async () => {
  const diaper = tailor_fixture({ 'cflag:1:42': 69, 'cflag:1:47': 5 });
  await run_core(diaper, [4]);
  assert.equal(diaper.store.get('cflag:1:47'), 0, '尿布清 CFLAG:47');
  assert.ok(texts(diaper.lines).some((t) => t.includes('穿上了尿布')));

  const accessory = tailor_fixture({
    'cflag:1:40': 64,
    'cflag:1:49': 1, // 贞操带上锁 → A = 20 被拦
  });
  await run_core(accessory, [2, 1, 999]);
  assert.ok(
    texts(accessory.lines).includes('不解开贞操带的话，无法穿戴其他装备！'),
    '贞操带上锁时装备品被拦（:118-120）',
  );
});

test('EQUIP_MAGIC_ITEM：装备戒指与强化（千位强度、超限回退、扣钱）', async () => {
  // 装备 300 号（识别号 0）的戒指，强化档 2
  const fixture = tailor_fixture({
    'item:300': 3,
    'cflag:0:9': 30,
    'cflag:1:551': -1, // 空槽（原作 = -1；0 会被当成「装备 0 号」而多回一件）
  });
  await run_core(fixture, [7, 1, 300, 2, 999, 999, 999]);
  assert.equal(
    fixture.store.get('cflag:1:551'),
    0 + 1000 * 2,
    '存储编号 = 识别号 0 + 强度 2 × 1000',
  );
  assert.equal(fixture.store.get('flag:10004'), 10000000 - 2 * 10000);
  assert.equal(fixture.store.get('item:300'), 2, '消耗一件');
  // 编号 300 段的按钮同样不写 [编号] 前缀（引擎自动拼，PR #30）
  const ring_button = fixture.lines.find(
    (l) => l.type === 'button' && l.accelerator === 300,
  );
  assert.ok(ring_button, '持有装备品行走按钮格');
  assert.ok(
    ring_button.rendered.startsWith('[300] ') &&
      !ring_button.text.includes('300 -'),
    '正文里没有第二个 [300]',
  );
  // 再强化 4：2 + 4 = 6 ≤ 10（可选档位是 0/1/2/4/6/8/X，没有 5）
  await run_core(fixture, [7, 1, 997, 4, 999, 999, 999]);
  assert.equal(fixture.store.get('cflag:1:551'), 6000);
  // 再强化 6：6 + 6 = 12 > 10 → 回退到 10（只付 4 档）
  const money = fixture.store.get('flag:10004');
  await run_core(fixture, [7, 1, 997, 6, 999, 999, 999]);
  assert.equal(fixture.store.get('cflag:1:551'), 10000, '强度封顶 10');
  assert.equal(
    fixture.store.get('flag:10004'),
    money - 4 * 10000,
    '超限回退：只付 10 - 6 = 4 档',
  );
});

test('EQUIP_MAGIC_WEAPON：装备武器带前缀档（十万位）与武器化触手', async () => {
  // 装备 341 号的武器，档位 1，前缀 9（暗黑）
  const fixture = tailor_fixture({
    'item:341': 1,
    'cflag:0:9': 30,
    'cflag:1:550': -1,
  });
  await run_core(fixture, [8, 341, 1, 9, 999, 999]);
  assert.equal(
    fixture.store.get('cflag:1:550'),
    41 + 1000 * 1 + 100000 * 9,
    '存储编号 = 识别号 41 + 强度 1 × 1000 + 前缀 9 × 100000',
  );
  // [990] 武器化触手 → 349 号装备
  const tentacle = tailor_fixture({
    'item:90': 1,
    'cflag:0:9': 30,
    'cflag:1:550': -1,
  });
  await run_core(tentacle, [8, 990, 0, 0, 999, 999]);
  assert.equal(
    tentacle.store.get('cflag:1:550'),
    49 + 1000 * 0,
    '触手装备的识别号 49',
  );
});

test('EQUIP_MAGIC_WEAPON：武器段只列 341-359（360 不在段内）', async () => {
  const fixture = tailor_fixture({
    'item:359': 1,
    'item:360': 1,
    'cflag:0:9': 30,
    'cflag:1:550': -1,
  });
  const added = await run_core(fixture, [8, 999, 999]);
  const items = added
    .filter((l) => l.type === 'button')
    .map((l) => l.accelerator);
  assert.ok(items.includes(359), '段尾 359 列出');
  assert.ok(!items.includes(360), '360 在段外（REPEAT 19）');
  assert.ok(items.includes(340), '[340] 剑恒在');
});

test('EQUIP_MAGIC_WEAPON：等级门的灰显与「取下」', async () => {
  // 等级 < 30：强化键不出现（灰显文本），取下仍在
  const low = tailor_fixture({ 'cflag:1:550': 40, 'cflag:0:9': 29 });
  {
    const added = await run_core(low, [8, 999, 999]);
    assert.ok(
      texts(added).some((t) => t.includes('未开放（30级后才能装备强化）')),
    );
    assert.ok(!accs(added).includes(997), '没有强化键');
    assert.ok(accs(added).includes(998), '有取下键');
  }
  // 取下：装备回包（item 340 +1）、槽置 -1
  const off = tailor_fixture({ 'cflag:1:550': 40, 'cflag:0:9': 30 });
  await run_core(off, [8, 998, 999, 999]);
  assert.equal(off.store.get('cflag:1:550'), -1, '槽置 -1');
  assert.equal(off.store.get('item:340'), 1, '识别号 40 的道具回包（300+40）');
});
