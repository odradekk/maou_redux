/**
 * 异界勇者召唤测试（issue #399 / N15 段 3）：SHOP_CHARA.ERB 的七个函数。
 *
 * 缝 = ere/page/page-chara-shop.js 导出的函数；经唯一夹具观察玩家输出行、
 * 变量读写与角色列表。
 *
 * 本屏在发布构建里没有入口（SHOP_MONSTER.ERB:32-35 的 `[IF DEBUG]` 档未
 * 移植，见该模块文件头），故全部用例直接驱动函数；随机源一律显式注入
 * （`() => 0`）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** RAND:N == 0（恒中；chara-make.test.js 的 always 同款） */
const rand0 = () => 0;

/** 全量行史的文本行（含被重绘清掉的；「发生过什么」的取证面） */
function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/**
 * 一览的一格（:378 的编号与名字 + :380 的价钱）：` [编号] ` + 名字补到 14
 * 显示宽 + 价钱（格首的空格是 `PRINTFORM  ` 的第二个空格——Emuera 只吃一个
 * 作分隔，见实现的注释）。原作的三个排版字面量在这里各写一份：编号宽 2
 * （段内编号恒 5 位，此宽度到不了）、名字宽 14、价钱 = @CHARA_IKAI_COST 的
 * 两项；「每行 5 格」由用例按整行钉住。
 */
function ikai_cell(id, name, coins, money) {
  const shown = [...name].reduce(
    (sum, ch) => sum + (ch.charCodeAt(0) > 0xff ? 2 : 1),
    0,
  );
  return (
    ` [${String(id).padStart(2)}] ` +
    `${name}${' '.repeat(Math.max(0, 14 - shown))}` +
    `(${coins}勋章&${money}金)`
  );
}

/**
 * 铺一个可召唤的世界：异界勇者的预设 211（yml/Chara211.yml 的编号）、
 * 钱与勋章各一档（:122 成交要 1500 与 1 枚勋章）。
 */
function chara_world(seed = {}) {
  const fixture = create_era_fixture();
  const base = {
    'flag:10000': 6, // DAY:0 → 显示 7 日
    'flag:10003': 0, // 午前
    'flag:10004': 100000, // MONEY
    'exp:0:81': 3, // 勋章
    itemkeys: [],
    ...seed,
  };
  for (const [name, value] of Object.entries(base)) {
    fixture.store.set(name, value);
  }
  fixture.seed_chara(211, { id: 211, name: '异界勇者' });
  fixture.load_module('era-utils/era-flag').bought = -1;
  return fixture;
}

/** 走一遍 @CHARA_SIM_SHOP：跑到输入耗尽或正常返回 */
async function run_chara_shop(seed = {}, ...inputs) {
  const fixture = chara_world(seed);
  fixture.set_inputs(...inputs);
  const { chara_sim_shop } = fixture.load_module('page/page-chara-shop');
  try {
    await chara_sim_shop(rand0);
  } catch (error) {
    assert.match(error.message, /预置输入已耗尽/);
  }
  return fixture;
}

// —— @SHOW_SHOP_CHARA（:133-151） ——

test('SHOW_SHOP_CHARA：头行 1:1（标题/说明/日期/所持金与勋章）与两处分隔线', () => {
  const fixture = chara_world({ 'flag:10004': 1234, 'exp:0:81': 5 });
  const { show_shop_chara } = fixture.load_module('page/page-chara-shop');
  show_shop_chara();
  assert.deepEqual(fixture.text_lines(), [
    '异界召唤',
    '《需要勋章经验来激活次元大门，并支付一定金钱来召唤异次元的勇者》',
    '7日 午前',
    '所持金：1234点\t\t勋章：5点',
  ]);
  const dividers = fixture.lines.filter((line) => line.type === 'divider');
  assert.equal(dividers.length, 2, ':141 与 :151 两处 DRAWLINE');
  assert(dividers.every((line) => line.border === 'solid'));
});

// —— @CHARA_SIM_SHOP（:11-128） ——

test('CHARA_SIM_SHOP：性别选择 —— 999 清在售位退出；4 与 0 打回重问', async () => {
  const fixture = await run_chara_shop({ 'itemsales:202': 1 }, 4, 0, 999);
  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line === '请选择要召唤的勇者的性别').length,
    3,
    '两次无效输入各重开一轮（共三轮）',
  );
  // :30 的菜单行按整行钉住（两处全角空格各 4 个）
  assert(
    texts.includes(
      '[1]男性\u3000\u3000\u3000\u3000[2]女性\u3000\u3000\u3000\u3000[3]扶她',
    ),
    ':30 的性别菜单行',
  );
  assert.equal(fixture.store.get('itemsales:202'), 0, ':41 CALL CLEAR_SHOP');
  assert(
    !texts.some((line) => line.includes('回应了你的召唤')),
    '999 直接退出，不进召唤段',
  );
});

test('CHARA_SIM_SHOP：召唤成功 —— 入队、性别素质、生成、成交的账（钱 1500 + 勋章 1）', async () => {
  const fixture = await run_chara_shop({}, 1, 0);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  assert(fixture.era.getAddedCharacters().includes(211), ':64 ADDCHARA 211');
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'talent:211:122' && w.value === 1,
    ),
    ':68-69 男性档写 TALENT:A:122 = 1（随后 CHAR_MAKE 按预设覆写，原作同序）',
  );
  assert.equal(fixture.store.get('cflag:211:1'), 0, ':75 CFLAG:A:1 = 0');
  // :120-124 成交：钱 1500、勋章 1、标记
  assert.equal(era_flag.money, 100000 - 1500);
  assert.equal(era_exflag.legit_money, -1500);
  assert.equal(fixture.store.get('exp:0:81'), 2);
  assert.equal(fixture.store.get('cflag:211:999'), 1);
  assert(
    history_texts(fixture).some((line) => line.includes('回应了你的召唤')),
  );
});

test('CHARA_SIM_SHOP：扶她档写 TALENT:121，且成交标记只在 CFLAG:999 == 0 时写', async () => {
  const fixture = await run_chara_shop({ 'cflag:211:999': 1 }, 3, 0);
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'talent:211:121' && w.value === 1,
    ),
    ':70-71 扶她档',
  );
  assert.equal(
    fixture.store.get('cflag:211:999'),
    1,
    ':123-124 已非 0 时不重写（1:1 保留的守卫）',
  );
});

test('CHARA_SIM_SHOP：成交的金钱闸（<= 1500 只报「金钱不够！」、不扣款不加人）', async () => {
  const fixture = await run_chara_shop({ 'flag:10004': 1500 }, 1, 0);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const texts = history_texts(fixture);
  assert(texts.includes('金钱不够！'), ':114-115');
  assert.equal(era_flag.money, 1500, '不扣款');
  assert.equal(fixture.store.get('exp:0:81'), 3, '不扣勋章');
  assert.equal(fixture.store.get('cflag:211:999') ?? 0, 0, '不写成交标记');
});

test('CHARA_SIM_SHOP：成交的勋章闸（< 1 只报「勋章不够！」）', async () => {
  const fixture = await run_chara_shop({ 'exp:0:81': 0 }, 1, 0);
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert(history_texts(fixture).includes('勋章不够！'), ':116-118');
  assert.equal(era_flag.money, 100000, '不扣款');
  assert.equal(fixture.store.get('cflag:211:999') ?? 0, 0);
});

test('CHARA_SIM_SHOP：再换一个（[1]）——退人扣 1500 重来；钱不够则只报错', async () => {
  {
    const fixture = await run_chara_shop(
      { 'flag:10004': 100000 },
      1, // 性别
      1, // 再换一个
      0, // 第二次成交
    );
    const era_flag = fixture.load_module('era-utils/era-flag');
    // 一次重掷的 1500 + 最后一次成交的 1500
    assert.equal(era_flag.money, 100000 - 1500 - 1500);
    assert(
      fixture.era.getAddedCharacters().includes(211),
      '重掷后仍是 211 在队',
    );
  }
  {
    const fixture = await run_chara_shop(
      { 'flag:10004': 2000 },
      1,
      1, // 再换一个（此时钱 2000 > 1500，先扣 1500）
      0, // 成交时只剩 500 → 金钱不够
    );
    const era_flag = fixture.load_module('era-utils/era-flag');
    assert(history_texts(fixture).includes('金钱不够！'));
    assert.equal(era_flag.money, 500, '重掷扣了 1500，成交被拦下');
  }
});

// —— @CHARA_IKAI_COST（:451-458） ——

test('CHARA_IKAI_COST：勋章 = L_I % 10000 / 5（截断、下限 3），金钱 = 勋章 × 2000', () => {
  const fixture = chara_world();
  const { chara_ikai_cost } = fixture.load_module('page/page-chara-shop');
  for (const [l_i, c, d] of [
    [10000, 3, 6000], // 0 / 5 = 0 → 下限 3
    [10014, 3, 6000], // 14 / 5 = 2 → 下限 3
    [10015, 3, 6000], // 15 / 5 = 3（恰好触底）
    [10019, 3, 6000], // 19 / 5 = 3
    [10020, 4, 8000], // 20 / 5 = 4
    [10099, 19, 38000], // 99 / 5 = 19
    [19999, 1999, 3998000],
    [99999, 1999, 3998000], // 9999 / 5 = 1999（% 10000 的作用）
  ]) {
    assert.deepEqual(chara_ikai_cost(l_i), [c, d], `L_I = ${l_i}`);
  }
});

// —— @CHAR_IKAI_APPEND（:435-449） ——

test('CHAR_IKAI_APPEND：入队、恒把 TARGET 还原（:437/:448 的存还）、清 CFLAG:1', async () => {
  const fixture = chara_world({ 'flag:1': 77 });
  fixture.seed_chara(10001, { id: 10001, name: '异界人甲' });
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 5;
  const { char_ikai_append } = fixture.load_module('page/page-chara-shop');
  const a = await char_ikai_append(10001, rand0);
  assert.equal(a, 10001, 'RETURN A = 新角色号');
  assert(fixture.era.getAddedCharacters().includes(10001));
  assert.equal(fixture.store.get('cflag:10001:1'), 0, ':446');
  assert.equal(era_flag.target, 5, 'TARGET 还原为调用前的值（LOCAL 的存还）');
});

// —— @CHAR_IKAI_CREATE（:361-432） ——

test('CHAR_IKAI_CREATE：一览只列「有预设且不在场」的编号，999 退出', async () => {
  const fixture = chara_world();
  fixture.seed_chara(10001, { id: 10001, name: '异界人甲' });
  fixture.seed_chara(10002, { id: 10002, name: '异界人乙' });
  // CSVNAME 的读数通道（era.get('chara:N') = 引擎的 staticData.chara[N]）
  fixture.store.set('chara:10001', { name: '异界人甲' });
  fixture.store.set('chara:10002', { name: '异界人乙' });
  // 10002 已在场 → 不再列出
  fixture.era.addCharacter(10002);
  fixture.set_inputs(999);
  const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
  assert.equal(await char_ikai_create(rand0), 0);
  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('[10001]') && line.includes('异界人甲')),
    '不在场的 10001 应列出',
  );
  assert(
    texts.some((line) => line.includes('(3勋章&6000金)')),
    '价钱按 CHARA_IKAI_COST 附在行内',
  );
  assert(
    !texts.some((line) => line.includes('异界人乙')),
    '在场的 10002 不列出',
  );
  assert(texts.includes('[999] 返回'));
});

test('CHAR_IKAI_CREATE：一览的排版字面量（名字补 14、每行 5 格）', async () => {
  // 六个可召唤的编号：前五个占满一行，第六个另起一行
  const fixture = chara_world();
  const names = [
    '异界人甲',
    '异界人乙',
    '异界人丙',
    '异界人丁',
    '异界人戊',
    '异界人己',
  ];
  names.forEach((name, index) => {
    const id = 10001 + index;
    fixture.seed_chara(id, { id, name });
    fixture.store.set(`chara:${id}`, { name });
  });
  fixture.set_inputs(999);
  const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
  await char_ikai_create(rand0);
  // 一览的每一行就是一次 era.print（原作 SIF LOCAL % 5 == 0 → PRINTL）
  const rows = history_texts(fixture).filter((line) => line.includes('勋章&'));
  assert.deepEqual(rows, [
    [10001, 10002, 10003, 10004, 10005]
      .map((id, index) => ikai_cell(id, names[index], 3, 6000))
      .join(''),
    ikai_cell(10006, names[5], 3, 6000),
  ]);
});

test('CHAR_IKAI_CREATE：金钱/勋章两道闸与成交的账', async () => {
  // 钱不够：10099 要 38000 → 给 1000
  {
    const fixture = chara_world({ 'flag:10004': 1000, 'exp:0:81': 999 });
    fixture.seed_chara(10099, { id: 10099, name: '异界人丙' });
    fixture.store.set('chara:10099', { name: '异界人丙' });
    fixture.set_inputs(10099, 999);
    const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
    await char_ikai_create(rand0);
    assert(history_texts(fixture).includes('金钱不够！'));
    assert(!fixture.era.getAddedCharacters().includes(10099));
  }
  // 勋章不够：要 19 枚 → 给 1 枚
  {
    const fixture = chara_world({ 'flag:10004': 100000, 'exp:0:81': 1 });
    fixture.seed_chara(10099, { id: 10099, name: '异界人丙' });
    fixture.store.set('chara:10099', { name: '异界人丙' });
    fixture.set_inputs(10099, 999);
    const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
    await char_ikai_create(rand0);
    assert(history_texts(fixture).includes('勋章不够！'));
    assert(!fixture.era.getAddedCharacters().includes(10099));
  }
  // 成交：钱 -38000、勋章 -19、角色入场
  {
    const fixture = chara_world({ 'flag:10004': 100000, 'exp:0:81': 20 });
    fixture.seed_chara(10099, { id: 10099, name: '异界人丙' });
    fixture.store.set('chara:10099', { name: '异界人丙' });
    fixture.set_inputs(10099);
    const era_flag = fixture.load_module('era-utils/era-flag');
    const era_exflag = fixture.load_module('era-utils/era-exflag');
    const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
    await char_ikai_create(rand0);
    assert(fixture.era.getAddedCharacters().includes(10099));
    assert.equal(era_flag.money, 100000 - 38000, ':422');
    assert.equal(era_exflag.legit_money, -38000, ':423 记账同步');
    assert.equal(fixture.store.get('exp:0:81'), 1, ':424 扣勋章');
    assert(
      history_texts(fixture).some((line) => line.includes('被你强行召唤了')),
    );
  }
});

test('CHAR_IKAI_CREATE：已登录的角色（FINDCHARA 命中）不重复扣费', async () => {
  const fixture = chara_world();
  fixture.seed_chara(10001, { id: 10001, name: '异界人甲' });
  // 已在场：一览里不列出，但键入它的编号仍命中 A >= 0 的支
  fixture.era.addCharacter(10001);
  fixture.set_inputs(10001);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
  await char_ikai_create(rand0);
  assert.equal(era_flag.money, 100000, '不扣费（A < 0 的块整段跳过）');
  assert(
    !history_texts(fixture).some((line) => line.includes('被你强行召唤了')),
  );
});

test('CHAR_IKAI_CREATE：无预设的编号直接打回（:400-403）', async () => {
  const fixture = chara_world();
  fixture.set_inputs(99998, 999);
  const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
  await char_ikai_create(rand0);
  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line.includes('强行从异世界召唤')).length,
    1,
    ':363-365 的开场只画一次（打回不重画开场）',
  );
  assert(
    !texts.some((line) => line.includes('99998')),
    '无预设的编号连一览都不进',
  );
});

// —— @SELECT_CHARA / @BUY_CHARA（零调用点的同形两份） ——

test('SELECT_CHARA：与 SELECT_MONSTER 同形，但缺两道守卫（段外与未点亮的编号也受理）', async () => {
  const fixture = chara_world({
    'itemprice:279': 15,
    'itemname:279': '精英魔兽',
    'chara:279': { talent: { 319: 1 } },
    'itemname:101': '狗头人',
    'item:101': 3,
  });
  fixture.set_inputs(279, 101, 101, 101, 0);
  const { select_chara } = fixture.load_module('page/page-chara-shop');
  // 种族 1 → [1, 1]；279 在段内但没被点亮（guard 为假，照样受理）
  const result = await select_chara(1, rand0);
  assert.equal(result, 1, ':234 RETURN 1');
  assert.equal(fixture.store.get('item:101'), 0, '@BUY_CHARA 的祭品扣除');
});

test('BUY_CHARA：与 BUY_MONSTER 同形（确认处 [1] 取消不扣钱扣货）', async () => {
  const fixture = chara_world({
    'itemprice:202': 15,
    'itemname:202': '精英狗头人',
    'chara:202': { talent: { 319: 1 } },
    'itemname:101': '狗头人',
    'item:101': 3,
  });
  fixture.set_inputs(202, 101, 101, 101, 1, 999);
  const { select_chara } = fixture.load_module('page/page-chara-shop');
  const era_flag = fixture.load_module('era-utils/era-flag');
  const result = await select_chara(1, rand0);
  assert.equal(result, 0, '取消返回 0');
  assert.equal(era_flag.money, 100000, '不扣钱');
  assert.equal(fixture.store.get('item:101'), 3, '不扣祭品');
});

test('CHAR_IKAI_CREATE：INRANGE 的上界是闭区间（100000 也查在场，不重复收费）', async () => {
  // 源 :408 `INRANGE(L_I,10000,100000)` 两端闭——100000 且在库时不入新角色
  const fixture = chara_world();
  fixture.seed_chara(100000, { id: 100000, name: '异界人丁' });
  fixture.store.set('chara:100000', { name: '异界人丁' });
  fixture.era.addCharacter(100000);
  fixture.set_inputs(100000);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { char_ikai_create } = fixture.load_module('page/page-chara-shop');
  await char_ikai_create(rand0);
  assert.equal(era_flag.money, 100000, '已在场的 100000 不重复收费');
  assert(
    !history_texts(fixture).some((line) => line.includes('被你强行召唤了')),
  );
});
