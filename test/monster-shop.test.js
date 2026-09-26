/**
 * 怪物商店测试（issue #399 / N15 段 3）：SHOP_MONSTER.ERB 的四个函数
 * （@MONSTER_SHOP / @SHOW_SHOP_MONSTER / @SELECT_MONSTER / @BUY_MONSTER）。
 *
 * 缝 = ere/page/page-monster-shop.js 导出的函数 + 商店轮的 120 分支；
 * 经唯一夹具观察玩家输出行、变量读写与角色列表，不断言模块内部辅助函数。
 *
 * 随机源一律显式注入（`() => 0`，与 chara-make.test.js 的 always 同款）：
 * @MONSTER_DATA 的两处骰子与 CHAR_MAKE 的名字/身体生成都吃随机，漏给就落到
 * 真随机、用例只在一部分抽样里真的守住行为。
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
 * 按钮条目的引擎实显文本（「[快捷键] 正文」，showAcc 默认为真；#572）。
 * 断言按钮化必须看这里——只看 text 会漏掉正文里手写的 [N] 前缀
 * （AGENTS.md 硬约束，PR #30 实机撞见）。
 */
function button_rendered(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'button')
    .map((line) => line.rendered);
}

// —— 排版助手（原作 %…,N,LEFT/RIGHT% 的显示宽度填充）——
// 本屏的三个排版字面量（名字宽、等级/数量字段宽、每行几格）在下面每一格里
// 各写一份：它们改了玩家那边就不对，用例按整格字符串钉住。

/** 显示宽度（全角 2 / 半角 1） */
function display_width(text) {
  return [...text].reduce(
    (sum, ch) => sum + (ch.charCodeAt(0) > 0xff ? 2 : 1),
    0,
  );
}

/** 左对齐补到 width 显示宽（`%str,N,LEFT%` 的形态） */
function pad_left(text, width) {
  const pad = width - display_width(text);
  return pad > 0 ? text + '\u00A0'.repeat(pad) : text; // #577：补位 NBSP
}

/** 右对齐补到 width 显示宽（`%n,N,RIGHT%` 的形态） */
function pad_right(text, width) {
  const pad = width - display_width(text);
  return pad > 0 ? '\u00A0'.repeat(pad) + text : text; // #577：补位 NBSP
}

/**
 * 商品一览的一格（:238）：`[编号] ` + 名字补 22 + 半角空格 + `最低等级：`
 * + 价格右对齐 5 + 两个全角空格。
 * 编号字段原作是 `TOSTR(LCOUNT,"000")`（零填充 3 位），段内编号恒 3 位，
 * 与 `pad_left(id, 3)` 同值。
 */
function goods_cell(id, name, price) {
  return (
    `[${pad_left(String(id), 3)}] ` +
    `${pad_left(name, 22)} ` +
    `最低等级：${pad_right(String(price), 5)}\u3000\u3000`
  );
}

/**
 * 祭品行（:334/:368）：名字补 22 + ` LV:` + 等级 + ` ` + 已选数右对齐 7
 * + `只` + 两个 U+3000。
 */
function sacrifice_cell(name, level, picked) {
  return (
    `${pad_left(name, 22)} ` +
    `LV:${level} ${pad_right(String(picked), 7)}只\u3000\u3000`
  );
}

/**
 * 可选祭品行（:381-382）：`[编号] ` + 名字补 20 + ` LV:` + 等级 + ` `
 * + 持有数右对齐 5 + ` - ` + 已选数 + ` 只` + 制表符（格尾是实参里的 \t）。
 */
function pick_cell(id, name, level, stock, picked) {
  return (
    `[${pad_left(String(id), 3)}] ` +
    `${pad_left(name, 20)} ` +
    `LV:${level} ${pad_right(String(stock), 5)} ` +
    `- ${picked} 只\t`
  );
}

/**
 * 「某一行恰好等于 expected」。**不能用 `includes`**：`c1 + c2` 是
 * `c1 + c2 + c3` 的子串，子串判定下「每行 3 格」也照样绿（#399 验收返工
 * 的评审实测）。
 */
function assert_has_line(texts, expected, message) {
  assert(
    texts.some((line) => line === expected),
    message,
  );
}

/**
 * 铺一个可召唤的世界。
 *
 * 默认世界＝亚人档（种族 1）：精英怪 202（Chara202 的 319 = 1，与 yml 同值）
 * 在售、价格 15；祭品侧的怪物 101（@MONSTER_DATA 的基础等级 1 + 4 = 5、
 * 凌辱类型 1 —— 与 yml 同值，见 ere/data/monster-database.js）。
 */
function monster_world(seed = {}) {
  const fixture = create_era_fixture();
  const base = {
    'flag:10000': 0, // DAY:0 → 显示 1 日
    'flag:10003': 0, // TIME = 0 → 午前
    'flag:10004': 10000, // MONEY
    itemkeys: [],
    'itemprice:202': 15,
    'itemname:202': '精英狗头人',
    'chara:202': { talent: { 319: 1 } },
    'itemname:101': '狗头人',
    ...seed,
  };
  for (const [name, value] of Object.entries(base)) {
    fixture.store.set(name, value);
  }
  // 引擎的 addCharacter 对无预设的角色直接返回 false（test/helpers 的
  // chara_presets 守卫）：召唤链要能把 202 真的加进来，预设必须经
  // seed_chara 提供（夹具不读 yml/）
  fixture.seed_chara(202, { id: 202, name: '精英狗头人' });
  fixture.load_module('era-utils/era-flag').bought = -1;
  return fixture;
}

/**
 * 走一遍 @MONSTER_SHOP：预置输入，跑到输入耗尽或正常返回。
 * 两条终止形态都合法（999 退出是正常返回），只拒绝别的异常。
 */
async function run_monster_shop(seed = {}, ...inputs) {
  const fixture = monster_world(seed);
  fixture.set_inputs(...inputs);
  const { monster_shop } = fixture.load_module('page/page-monster-shop');
  try {
    await monster_shop(rand0);
  } catch (error) {
    assert.match(error.message, /预置输入已耗尽/);
  }
  return fixture;
}

// —— @SHOW_SHOP_MONSTER（:178-196） ——

test('SHOW_SHOP_MONSTER：头行 1:1（标题/两行说明/日期/所持金）与两处分隔线', () => {
  const fixture = monster_world({ 'flag:10000': 6, 'flag:10004': 1234 });
  const { show_shop_monster } = fixture.load_module('page/page-monster-shop');
  show_shop_monster();
  assert.deepEqual(fixture.text_lines(), [
    '召唤',
    '《需要献祭同类的怪物，并支付一定金钱来召唤精英魔物从者》',
    '7日 午前',
    '所持金：1234点',
  ]);
  const dividers = fixture.lines.filter((line) => line.type === 'divider');
  assert.equal(dividers.length, 2, ':186 与 :196 两处 DRAWLINE');
  assert(dividers.every((line) => line.border === 'solid'));
});

test('SHOW_SHOP_MONSTER：日期行两态（TIME 0 午前 / 1 午后）', () => {
  for (const [time, half] of [
    [0, '午前'],
    [1, '午后'],
  ]) {
    const fixture = monster_world({ 'flag:10003': time });
    const { show_shop_monster } = fixture.load_module('page/page-monster-shop');
    show_shop_monster();
    assert(fixture.text_lines().includes(`1日 ${half}`));
  }
});

// —— @MONSTER_SHOP（:18-173） ——

test('MONSTER_SHOP：入口菜单是按钮 —— [1] 召唤 / [999] 返回；999 清在售位并退出', async () => {
  const fixture = monster_world({ 'itemsales:202': 1 });
  fixture.set_inputs(999);
  const { monster_shop } = fixture.load_module('page/page-monster-shop');
  assert.equal(await monster_shop(rand0), 0);
  // #572：两枚按钮的实显文本由引擎按 showAcc 拼（正文不带 [N]）
  assert.deepEqual(button_rendered(fixture), [
    '[1] 召唤魔物从者',
    '[999] 返回',
  ]);
  assert(
    !history_texts(fixture).includes('[1]召唤魔物从者'),
    '选项不再以纯文本行出现（纯文本的编号在实机上敲不进去）',
  );
  assert(
    !history_texts(fixture).includes('请选择要召唤的魔物从者的性别'),
    '999 应直接退出，不进性别选择',
  );
  assert.equal(fixture.store.get('itemsales:202'), 0, ':40 CALL CLEAR_SHOP');
});

test('MONSTER_SHOP：从者数达上限（TALENT:220 计 30）时拒绝召唤', async () => {
  // 29 个从者：放行；30 个：拒绝
  for (const [count, rejected] of [
    [29, false],
    [30, true],
  ]) {
    const fixture = monster_world();
    for (let i = 0; i < count; i += 1) {
      const cid = 1000 + i;
      fixture.seed_chara(cid, { id: cid, name: `从者${cid}` });
      fixture.era.addCharacter(cid);
      fixture.store.set(`talent:${cid}:220`, 1);
    }
    fixture.set_inputs(1, 999); // 进商店 → 性别选择处退出
    const { monster_shop } = fixture.load_module('page/page-monster-shop');
    await monster_shop(rand0);
    const texts = history_texts(fixture);
    assert.equal(
      texts.includes('召唤的魔物从者数量太多，魔界已经没有志愿者了……'),
      rejected,
      `从者 ${count} 个`,
    );
    if (!rejected) {
      assert(
        texts.includes('请选择要召唤的魔物从者的性别'),
        '未达上限应进性别选择',
      );
    }
  }
});

test('MONSTER_SHOP：性别菜单是按钮，越界输入由引擎拒收（#572）', async () => {
  // 1 → 入口；2 → 性别成立（随后在种族选择处 999 退出）
  const ok = await run_monster_shop({}, 1, 2, 999);
  // 前两枚是入口菜单，接着是性别菜单的四枚（种族菜单的十枚在更后面）
  assert.deepEqual(
    button_rendered(ok).slice(2, 6),
    ['[1] 男性', '[2] 女性', '[3] 扶她', '[999] 返回'],
    ':71 的三个选项与 :73 的返回都是按钮（正文不带 [N]，空白按引擎折叠）',
  );

  // 4 不在本轮白名单（1/2/3/999）里：引擎当场拒收，不再有「打回重开一轮」
  const rejected = monster_world({});
  rejected.set_inputs(1, 4);
  const { monster_shop } = rejected.load_module('page/page-monster-shop');
  await assert.rejects(
    () => monster_shop(rand0),
    /输入不合法！请输入以下值之一：1, 2, 3, 999/,
  );
});

test('MONSTER_SHOP：种族菜单是按钮，越界输入由引擎拒收（#572）', async () => {
  const ok = await run_monster_shop({}, 1, 1, 999);
  assert.deepEqual(
    button_rendered(ok).slice(-10),
    [
      '[1] 兽人类',
      '[2] 史莱姆类',
      '[3] 昆虫类',
      '[4] 植物类',
      '[5] 触手类',
      '[6] 妖精类',
      '[7] 巨人类',
      '[8] 魔人类',
      '[9] 魔兽类',
      '[999] 返回',
    ],
    ':97-101 的九档与返回都是按钮（正文不带 [N]）',
  );

  // 10 不在本轮白名单（1-9/999）里：引擎当场拒收
  const rejected = monster_world({});
  rejected.set_inputs(1, 1, 10);
  const { monster_shop } = rejected.load_module('page/page-monster-shop');
  await assert.rejects(
    () => monster_shop(rand0),
    /输入不合法！请输入以下值之一：1, 2, 3, 4, 5, 6, 7, 8, 9, 999/,
  );
});

test('MONSTER_SHOP：种族选择失败（SELECT_MONSTER 返回 0）回到种族菜单重画', async () => {
  // 种族 1 → 商品一览（本世界无在售位）→ 202 被守卫打回 → 999 退出 → 外层
  // 重画一轮种族菜单 → 再 999 退出。这是 select_monster 返回 0 的 continue 支。
  const fixture = await run_monster_shop({}, 1, 1, 1, 202, 999, 999);
  assert(
    history_texts(fixture).filter((line) => line === '　请选择魔物从者的种类')
      .length >= 2,
    '选择失败后回到种族菜单（重画）',
  );
});

test('MONSTER_SHOP：种族选择里 999 清在售位并退出', async () => {
  const fixture = await run_monster_shop({ 'itemsales:202': 1 }, 1, 1, 999);
  assert.equal(fixture.store.get('itemsales:202'), 0, ':107 CALL CLEAR_SHOP');
  // 三个屏各有一枚 [999] 返回按钮（入口 :37、性别 :73、种族 :101）——按次数
  // 钉住，删/改任意一屏的那一枚都会红（#572 起是按钮，实显文本与原行同文）
  assert.equal(
    button_rendered(fixture).filter((line) => line === '[999] 返回').length,
    3,
    '入口/性别/种族三屏各自的返回按钮',
  );
  assert(
    !history_texts(fixture).some((line) => line.includes('回应了你的召唤')),
    '退出不得继续召唤',
  );
});

test('MONSTER_SHOP：召唤成功——入队、性别素质、生成、确认与结账全链', async () => {
  const fixture = await run_monster_shop(
    { 'item:101': 3 },
    1, // 入口
    1, // 性别：男性
    1, // 种族：亚人（202 的 CSVTALENT 319 = 1，与 yml 同值）
    202, // 选中 202
    101,
    101,
    101, // 祭品：三只 5 级的狗头人凑够 15
    0, // 祭品确认（[0] 好的）
    0, // 召唤确认（[0] 就是他了）
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  // :122-133 入队与生成
  assert(
    fixture.era.getAddedCharacters().includes(202),
    'ADDCHARA 202 应把角色加入',
  );
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'talent:202:122' && w.value === 1,
    ),
    ':126-127 男性档写 TALENT:A:122 = 1（随后 CHAR_MAKE 按预设覆写它，' +
      '与原作同序——所以这里查写出时刻而不是终值）',
  );
  assert.equal(fixture.store.get('cflag:202:1'), 0, ':133 CFLAG:A:1 = 0');
  const texts = history_texts(fixture);
  assert(texts.some((line) => line.includes('回应了你的召唤')));
  assert(texts.some((line) => line.includes('确定要召唤')));
  // :150-155 的「他/她」读的是当时的 TALENT:A:122——CHAR_MAKE 已按预设
  // 覆写过它，故按终值断言（原作同序）
  const male = (fixture.store.get('talent:202:122') || 0) !== 0;
  assert(
    button_rendered(fixture).includes(`[0] 就是${male ? '他' : '她'}了`),
    `性别词随 TALENT:122 走（当前 ${male ? '男' : '非男'}）`,
  );
  // :349-350 结账：最低等级 15 × 135 的钱 + 三只祭品
  assert.equal(era_flag.money, 10000 - 15 * 135);
  assert.equal(fixture.store.get('item:101'), 0, '祭品被扣光（3 只全选）');
});

test('MONSTER_SHOP：扶她档写 TALENT:121（与男性档互斥）', async () => {
  const fixture = await run_monster_shop(
    { 'item:101': 3 },
    1,
    3, // 性别：扶她
    1,
    202,
    101,
    101,
    101,
    0,
    0,
  );
  assert(
    fixture.var_writes.some(
      (w) => w.name === 'talent:202:121' && w.value === 1,
    ),
    ':128-129 扶她档写 TALENT:A:121 = 1（随后 CHAR_MAKE 覆写，同上）',
  );
  assert(
    !fixture.var_writes.some(
      (w) => w.name === 'talent:202:122' && w.value === 1,
    ),
    '扶她档不写男性素质',
  );
  assert(
    button_rendered(fixture).some((line) => line.startsWith('[0] 就是')),
    ':149-155 的召唤确认按钮',
  );
});

test('MONSTER_SHOP：再换一个（[1]）——钱够则退人扣 1500 重来，不够则只报「金钱不够！」', async () => {
  {
    // 钱够：第一次 [1] 退人扣钱重来，第二次 [0] 成交
    const fixture = await run_monster_shop(
      { 'item:101': 6, 'flag:10004': 100000 },
      1,
      1,
      1,
      202,
      101,
      101,
      101,
      0, // 献祭成交
      1, // 再换一个
      0, // 第二次的召唤确认
    );
    const era_flag = fixture.load_module('era-utils/era-flag');
    // 扣款 = 献祭一次（15 × 135）+ 重掷一次（1500）
    assert.equal(era_flag.money, 100000 - 15 * 135 - 1500);
    assert(
      fixture.era.getAddedCharacters().includes(202),
      '重掷后仍是 202 入队',
    );
    assert.equal(
      fixture.store.get('item:101'),
      3,
      '只献祭了一次（重掷不再献祭）',
    );
  }
  {
    // 钱不够（献祭后 <= 1500）：「金钱不够！」并结束本次召唤
    const fixture = monster_world({ 'item:101': 3, 'flag:10004': 3000 });
    fixture.set_inputs(1, 1, 1, 202, 101, 101, 101, 0, 1);
    const { monster_shop } = fixture.load_module('page/page-monster-shop');
    await monster_shop(rand0);
    const texts = history_texts(fixture);
    assert(texts.includes('金钱不够！'), ':161-162');
    assert(
      fixture.era.getAddedCharacters().includes(202),
      '钱不够时不退人（角色留在队里）',
    );
  }
});

test('MONSTER_SHOP：召唤确认处只认 0/1，越界输入由引擎拒收（#572）', async () => {
  // 旧行为是「其余输入落到函数尾返回」（源 :172-173 只认 1，别的都返回）——
  // 按钮化后白名单是 0/1，7 在引擎那头就被拒收，不再回传游戏。
  const fixture = monster_world({ 'item:101': 3 });
  fixture.set_inputs(1, 1, 1, 202, 101, 101, 101, 0, 7);
  const { monster_shop } = fixture.load_module('page/page-monster-shop');
  await assert.rejects(
    () => monster_shop(rand0),
    /输入不合法！请输入以下值之一：0, 1/,
  );
  assert(
    fixture.era.getAddedCharacters().includes(202),
    '拒收发生在确认处，角色已在队（与旧用例同一时点）',
  );
  assert(
    button_rendered(fixture).includes('[0] 就是她了') ||
      button_rendered(fixture).includes('[0] 就是他了'),
    '确认处的两枚按钮已打印',
  );
});

// —— @SELECT_MONSTER（:200-285） ——

/** 直接跑一次 @SELECT_MONSTER（不经 @MONSTER_SHOP） */
async function run_select(arg0, seed = {}, ...inputs) {
  const fixture = monster_world(seed);
  fixture.set_inputs(...inputs);
  const { select_monster } = fixture.load_module('page/page-monster-shop');
  const result = await select_monster(arg0, rand0);
  return { fixture, result };
}

test('SELECT_MONSTER：种族的九档映射整表（含 CASEELSE 的 0/10 两值）', async () => {
  // 每档的第二个值决定哪些商品出场：给三个候选（202 → 1、208 → 9、
  // 203 → 11——第二档那一路的探针，5 档的 [5, 11] 与 8 档的 [8, 9] 都靠它）
  const cases = [
    [1, [1, 1]],
    [2, [2, 2]],
    [3, [3, 3]],
    [4, [4, 4]],
    [5, [5, 11]],
    [6, [6, 6]],
    [7, [7, 7]],
    [8, [8, 9]],
    [9, [10, 12]],
  ];
  const probes = [
    [202, 1],
    [208, 9],
    [203, 11],
  ];
  for (const [arg, [race, race2]] of cases) {
    const seed = {
      'chara:202': { talent: { 319: 1 } },
      'chara:208': { talent: { 319: 9 } },
      'chara:203': { talent: { 319: 11 } },
      'itemprice:208': 15,
      'itemname:208': '精英恶魔',
      'itemprice:203': 15,
      'itemname:203': '精英蚁怪',
    };
    const { fixture } = await run_select(arg, seed, 999);
    for (const [id, talent319] of probes) {
      const shows = race === talent319 || race2 === talent319;
      const listed = fixture.var_writes.some(
        (w) => w.name === `itemsales:${id}` && w.value === 1,
      );
      assert.equal(
        listed,
        shows,
        `种族 ${arg} → [${race}, ${race2}]：319 = ${talent319} 的 ${id}`,
      );
    }
  }
  for (const arg of [0, 10]) {
    const { result, fixture } = await run_select(arg, {}, 999);
    assert.equal(result, 0, `CASEELSE：${arg} 直接返回 0`);
    assert(
      !history_texts(fixture).includes('召唤'),
      '未进循环（连头行都不画）',
    );
  }
});

test('SELECT_MONSTER：商品一览的四个判据——价格非 0、两个种族档之一、按 2 格一行', async () => {
  // 202（319 = 1）与 203（319 = 1）在档内；201（319 = 2）与 204（价格 0）不在
  const { fixture } = await run_select(
    1, // 亚人档 → [1, 1]，看 202/203 出场
    {
      'chara:203': { talent: { 319: 1 } },
      'itemprice:203': 15,
      'itemname:203': '精英蚁怪',
      'itemprice:201': 15, // 319 = 2（档外）
      'itemname:201': '精英史莱姆',
      'chara:201': { talent: { 319: 2 } },
      'chara:204': { talent: { 319: 1 } }, // 价位 0（缺号）→ 不出场
      'itemname:204': '精英芽怪',
    },
    999,
  );
  const texts = history_texts(fixture);
  const list_line = texts.find((line) => line.includes('精英狗头人'));
  assert(list_line, '在售的 202 应出场');
  assert(list_line.includes('[202]'), ':238 的 [编号] 字段');
  assert(
    list_line.includes('最低等级：' + '\u00A0'.repeat(3) + '15'),
    ':238 的右对齐等级字段',
  );
  assert(list_line.includes('精英蚁怪'), '同为档内的 203 与 202 同行');
  assert(
    !texts.some((line) => line.includes('精英史莱姆')),
    '319 = 2 的 201 在亚人档外',
  );
  assert(
    !texts.some((line) => line.includes('精英芽怪')),
    'ITEMPRICE 为 0 的 204 出场不了',
  );
  assert.equal(fixture.store.get('itemsales:202'), 1, ':240 点亮在售位');
  assert.equal(fixture.store.get('itemsales:201') ?? 0, 0, '档外不点亮');
});

test('SELECT_MONSTER：商品一览的排版字面量（名字补 22、等级右对齐 5、每行 2 格）', async () => {
  // 三件在售（202/203/205 同属亚人档）：两格一行 → 第二行只剩第三件。
  // 整格比对同时钉住名字字段宽、等级字段宽与「每行 2 格」——任何一处改动
  // 都会让这一行的字符串对不上
  const { fixture } = await run_select(
    1,
    {
      'chara:203': { talent: { 319: 1 } },
      'itemprice:203': 7,
      'itemname:203': '精英蚁怪',
      'chara:205': { talent: { 319: 1 } },
      'itemprice:205': 120,
      'itemname:205': '精英巨魔',
    },
    999,
  );
  const rows = history_texts(fixture).filter((line) =>
    line.includes('最低等级：'),
  );
  assert.deepEqual(rows, [
    goods_cell(202, '精英狗头人', 15) + goods_cell(203, '精英蚁怪', 7),
    goods_cell(205, '精英巨魔', 120),
  ]);
});

test('SELECT_MONSTER：空表与提示行（没有能召唤的魔物从者 / 请选择…）', async () => {
  {
    // 档内一件都没有：把 202 的 319 抹掉（其余世界不动）
    const { fixture } = await run_select(
      1,
      { 'chara:202': { talent: {} } },
      999,
    );
    assert(
      history_texts(fixture).includes('没有能召唤的魔物从者'),
      '一件都没有时的文案',
    );
  }
  {
    const { fixture } = await run_select(
      1,
      { 'chara:202': { talent: {} } },
      999,
    );
    const texts = history_texts(fixture);
    assert(texts.includes('[999] 返回'));
    assert(!texts.includes('请选择要召唤的魔物从者'), '空表不出「请选择」');
  }
  {
    const { fixture } = await run_select(
      1,
      { 'item:101': 3 },
      202,
      101,
      101,
      101,
      0,
    );
    assert(
      history_texts(fixture).includes('请选择要召唤的魔物从者'),
      '有货时的文案',
    );
  }
});

test('SELECT_MONSTER：五道输入守卫——999 退出、段外、未点亮、钱不够', async () => {
  // 999 → RETURN 0（回到 @MONSTER_SHOP 的种族选择）
  {
    const { result } = await run_select(1, {}, 999);
    assert.equal(result, 0);
  }
  // 段外（200 / 280）与未点亮（203）都打回重问，随后 999 退出
  {
    const { fixture } = await run_select(1, {}, 200, 280, 203, 999);
    assert.equal(
      history_texts(fixture).filter((line) =>
        line.includes('请选择要召唤的魔物从者'),
      ).length,
      4,
      '三次打回各重开一轮（共四轮）',
    );
  }
  // 钱不够：ITEMPRICE:202 = 15 → 需要 15 × 135 = 2025；给 2024
  {
    const { fixture } = await run_select(
      1,
      { 'item:101': 3, 'flag:10004': 2024 },
      202,
      999,
    );
    assert(
      history_texts(fixture).includes(
        '虽然魔物从者都不是物质的女孩，但必要的金钱总是要准备的吧～贫穷的魔王大人哦！',
      ),
      ':268 的金钱守卫文案',
    );
  }
  // 恰好 2025：放行（进入 @BUY_MONSTER 的祭品段）
  {
    const { fixture } = await run_select(
      1,
      { 'item:101': 3, 'flag:10004': 2025 },
      202,
      101,
      999,
      999,
    );
    assert(
      history_texts(fixture).includes('现在被选择的怪物') ||
        history_texts(fixture).includes('请选择满足最低等级要求的怪物作为祭品'),
      '恰好够钱应进 @BUY_MONSTER',
    );
  }
});

test('SELECT_MONSTER：买定返回 1（@BUY_MONSTER 成交）', async () => {
  const { result } = await run_select(
    1,
    { 'item:101': 3 },
    202,
    101,
    101,
    101,
    0,
  );
  assert.equal(result, 1, ':285 RETURN 1');
});

// —— @BUY_MONSTER（:288-410） ——

/** 直接跑一次 @BUY_MONSTER（先把 TFLAG:102 的选中项立起来） */
async function run_buy(seed = {}, ...inputs) {
  const fixture = monster_world(seed);
  // 第一个输入选中 202（亚人档的在售商品），其余是 @BUY_MONSTER 的输入
  fixture.set_inputs(202, ...inputs);
  const { select_monster } = fixture.load_module('page/page-monster-shop');
  let result;
  try {
    result = await select_monster(1, rand0);
  } catch (error) {
    // 输入耗尽（外层循环还想要输入）：与 run_monster_shop 同款容忍
    assert.match(error.message, /预置输入已耗尽/);
  }
  return { fixture, result };
}

test('BUY_MONSTER：无祭品与等级不足两个早退', async () => {
  // 无祭品：RETURN 0（外层重问）
  {
    const { fixture, result } = await run_buy({}, 999);
    assert.equal(result, 0);
    assert(
      history_texts(fixture).includes('没有能作为祭品的怪物'),
      ':313 的文案',
    );
  }
  // 等级不足：祭品 2 只（10 级）< 15
  {
    const { fixture } = await run_buy({ 'item:101': 2 }, 999);
    assert(
      history_texts(fixture).includes('＊作为祭品的怪物等级不足＊'),
      ':316 的文案',
    );
  }
});

test('BUY_MONSTER：等级足够时直接进确认，[0] 成交扣钱扣祭品', async () => {
  const { fixture, result } = await run_buy(
    { 'item:101': 3 },
    101,
    101,
    101,
    0,
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  assert.equal(result, 1, '成交返回 1');
  assert.equal(era_flag.money, 10000 - 15 * 135, ':349 MONEY -= 价 × 135');
  assert.equal(era_exflag.legit_money, -15 * 135, ':350 记账同步');
  assert.equal(fixture.store.get('item:101'), 0, ':354 祭品扣除');
  const texts = history_texts(fixture);
  assert(texts.includes('现在被选择的怪物'));
  assert(texts.includes('合计等级：15'), ':341');
  assert(
    texts.some(
      (line) =>
        line.includes('要以这些怪物为代价，加上') &&
        line.includes('2025点金钱'),
    ),
    ':343 的确认行（价 × 135）',
  );
});

test('BUY_MONSTER：确认处 [1] 不要则返回 0（不扣钱不扣货）', async () => {
  const { fixture, result } = await run_buy(
    { 'item:101': 3 },
    101,
    101,
    101,
    1,
    999,
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(result, 0);
  assert.equal(era_flag.money, 10000, '不扣钱');
  assert.equal(fixture.store.get('item:101'), 3, '不扣祭品');
});

test('BUY_MONSTER：祭品不足时逐只挑（剩余等级递减、库存告罄、999 退出）', async () => {
  // 100（5 级 1 只）+ 110（6 级 2 只）：合计 17 >= 15 可召，但挑的时候
  // 100 只有一只——第二次挑它撞「已经没有了」
  const { fixture } = await run_buy(
    {
      'item:100': 1,
      'itemname:100': '狗头人兵',
      'item:110': 2,
      'itemname:110': '狗头人战士',
    },
    100,
    100,
    110,
    999,
  );
  const texts = history_texts(fixture);
  assert(texts.includes('请选择满足最低等级要求的怪物作为祭品'), ':359');
  assert(texts.includes('剩余等级：15'), '首次剩余 = 价 15');
  assert(texts.includes('剩余等级：10'), '挑掉 5 级后剩余 10');
  assert(texts.includes('合计等级：5'), ':375 的已选合计');
  assert(texts.includes('已经没有了'), ':404 的库存告罄文案');
  assert(
    texts.includes('剩余等级：4'),
    '再挑一只 6 级的 110 后剩余 4（仍未凑够）',
  );
});

test('BUY_MONSTER：挑祭品的输入守卫——段外与未持有都打回', async () => {
  const { fixture } = await run_buy({ 'item:101': 3 }, 99, 199, 102, 999);
  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) =>
      line.includes('请选择满足最低等级要求的怪物作为祭品'),
    ).length,
    4,
    '两次非法输入各重开一轮（共四轮）',
  );
});

test('BUY_MONSTER：跨两种祭品凑够等级（选择不限于一只）', async () => {
  // 101 与 102 各 2 只：102 的凌辱类型 2（史莱姆）不在亚人档 → 只有 101 可用
  const { fixture, result } = await run_buy(
    { 'item:101': 3, 'item:102': 5, 'itemname:102': '史莱姆' },
    102, // 102 不在亚人档 → 打回
    999, // 退出 @BUY_MONSTER
    999, // 退出 @SELECT_MONSTER
  );
  assert.equal(result, 0);
  const texts = history_texts(fixture);
  assert(
    !texts.some((line) => line.includes('史莱姆 LV')),
    '档外的 102 不进祭品表',
  );
});

test('BUY_MONSTER：多只同种祭品按已选数递增（:408-409 的两行）', async () => {
  const { fixture } = await run_buy({ 'item:101': 3 }, 101, 101, 101, 0);
  const texts = history_texts(fixture);
  assert(
    texts.some((line) => line.includes('狗头人') && line.includes('1只')),
    ':334 的祭品行（已选 1 只）',
  );
  assert(
    texts.some((line) => line.includes('LV:5')),
    '等级来自 @MONSTER_DATA 的 E:501',
  );
});

test('BUY_MONSTER：祭品行与可选行的排版字面量（名补 22/20、数右对齐 7/5、每行 2 格）', async () => {
  // 三件同档祭品（100/101/110，等级 5/5/6，各持一件）挑满 → 16 >= 15 进确认屏，
  // 于是挑选取与确认屏的祭品行都留下整行证据。名字用 yml/Item.yml 的登记名
  const { fixture, result } = await run_buy(
    {
      'item:100': 1,
      'itemname:100': '狗头人',
      'item:101': 1,
      'itemname:101': '哥布林',
      'item:110': 1,
      'itemname:110': '兽人',
    },
    100,
    101,
    110,
    0,
  );
  assert.equal(result, 1, '三只凑够 16 级成交');
  const texts = history_texts(fixture);
  // 可选行（:381-382）：两格一行，第三件另起一行；格尾是制表符
  assert_has_line(
    texts,
    pick_cell(100, '狗头人', 5, 1, 0) + pick_cell(101, '哥布林', 5, 1, 0),
    '可选行的整格字符串（名字宽 20 / 持有数宽 5 / 每行 2 格）',
  );
  assert_has_line(texts, pick_cell(110, '兽人', 6, 1, 0), '第三件另起一行');
  assert_has_line(
    texts,
    pick_cell(100, '狗头人', 5, 1, 1) + pick_cell(101, '哥布林', 5, 1, 1),
    '已选数进格（- 1 只）',
  );
  // 祭品行（:334/:368）：两格一行，第三件另起一行
  assert_has_line(
    texts,
    sacrifice_cell('狗头人', 5, 1) + sacrifice_cell('哥布林', 5, 1),
    '祭品行的整格字符串（名字宽 22 / 已选数宽 7 / 每行 2 格）',
  );
  assert_has_line(texts, sacrifice_cell('兽人', 6, 1), '第三件另起一行');
});

test('BUY_MONSTER：确认处只认 0/1，越界输入由引擎拒收（#572）', async () => {
  // 挑够祭品后键入 5：本轮白名单是 0/1，引擎当场拒收（旧行为是落回祭品
  // 选择的输入重画，那条路径在实机上不可达）——钱与祭品都不动。
  const fixture = monster_world({ 'item:101': 3 });
  fixture.set_inputs(202, 101, 101, 101, 5);
  const { select_monster } = fixture.load_module('page/page-monster-shop');
  await assert.rejects(
    () => select_monster(1, rand0),
    /输入不合法！请输入以下值之一：0, 1/,
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.money, 10000, '未成交，钱不动');
  assert.equal(fixture.store.get('item:101'), 3, '未成交，祭品不动');
});

test('SELECT_MONSTER：名录的编号段端点——201（首个在册）与 210（末个在册）都出场', async () => {
  // 扫描面是 201-280（:232 的 FOR），但在册商品只有 201-210（Item.yml 的
  // 2xx 段）：两端各站一条。211+ 没名字没价位，改 `end` 到 211/279 的输出
  // 相同（等价变异，见条目注释）
  {
    const { fixture } = await run_select(
      2, // 史莱姆档 [2, 2]：201 的 CSVTALENT 319 = 2（与 yml 同值）
      {
        'chara:201': { talent: { 319: 2 } },
        'itemprice:201': 15,
        'itemname:201': '精英史莱姆',
      },
      999,
    );
    assert_has_line(
      history_texts(fixture),
      goods_cell(201, '精英史莱姆', 15),
      '首个在册编号 201 必须在列',
    );
  }
  {
    const { fixture } = await run_select(
      9, // 魔兽档 [10, 12]：210 的 319 = 10（与 yml 同值）
      {
        'chara:210': { talent: { 319: 10 } },
        'itemprice:210': 15,
        'itemname:210': '猎犬首领',
      },
      999,
    );
    assert_has_line(
      history_texts(fixture),
      goods_cell(210, '猎犬首领', 15),
      '末个在册编号 210 必须在列（把 end 砍到 ≤ 210 即红）',
    );
  }
});

test('MONSTER_SHOP：种族选择收下 9（RACE_MAX 的最后一个）并进魔兽档', async () => {
  // 九档的最后一档：走菜单路径（不是直调 SELECT_MONSTER），把 RACE_MAX = 9
  // 的端点站住——改成 8 时 9 会打回重问，这一条红
  const fixture = await run_monster_shop(
    {
      'chara:210': { talent: { 319: 10 } },
      'itemprice:210': 15,
      'itemname:210': '猎犬首领',
    },
    1, // 入口：召唤
    1, // 性别：男性
    9, // 种族：魔兽（映射 [10, 12]）
    999, // 退出
  );
  const texts = history_texts(fixture);
  assert_has_line(
    texts,
    goods_cell(210, '猎犬首领', 15),
    '键入 9 应进魔兽档并列出 210（打回重问就看不到这一行）',
  );
});

test('BUY_MONSTER：祭品扫描的编号段端点——193（100-199 段末个在册）能当祭品', async () => {
  // 扫描面是 100-199（:301 的 FOR），在怪物数据表里到 193 为止（混沌龙，
  // 凌辱类型 10 = 魔兽档、等级 30 + 4）；194-199 没有数据 → 上界改到 199 与
  // 200 的输出相同（等价，见条目注释），砍到 ≤ 193 才是红
  const fixture = monster_world({
    'chara:210': { talent: { 319: 10 } },
    'itemprice:210': 15,
    'itemname:210': '猎犬首领',
    'item:193': 1,
    'itemname:193': '混沌龙',
  });
  fixture.set_inputs(210, 193, 0); // 选中 210 → 挑 193 当祭品 → 确认成交
  const { select_monster } = fixture.load_module('page/page-monster-shop');
  const result = await select_monster(9, rand0); // 魔兽档 [10, 12]
  assert.equal(result, 1, '一只 34 级的祭品就够');
  assert_has_line(
    history_texts(fixture),
    pick_cell(193, '混沌龙', 34, 1, 0),
    '末个在册祭品编号 193 必须进可选表',
  );
  assert_has_line(
    history_texts(fixture),
    sacrifice_cell('混沌龙', 34, 1),
    '193 选中后的祭品行',
  );
});

// —— 存根接线：召唤确认段的 @SHOW_CHARA_INFO（#390 真身落地后换接） ——

test('召唤确认段接上 SHOW_CHARA_INFO 真身（cid = 召唤出的角色 A、页码 -2）', async () => {
  const fixture = await run_monster_shop(
    { 'item:101': 3 },
    1, // 入口
    1, // 性别
    1, // 种族：亚人
    202, // 商品
    101,
    101,
    101, // 祭品
    0, // 献祭确认
    0, // 召唤确认
  );
  const texts = history_texts(fixture);
  // 真身的三个判据（页码判据与 test/chara-info-show.test.js 的页码表同款）
  assert(
    texts.some((line) => line.startsWith('NO.202 ')),
    '标题行 NO.<cid> 带的是被召唤的角色号 A',
  );
  // 页码 = -2 的判据取「经验段 ∧ 外貌段」：经验段在 -2/-1/1 三臂、外貌段在
  // -2/2 两臂，交集只有 -2（EX: 0/1/3/4 两段都没有或只有一段）
  assert(
    texts.some((line) => line.includes('本级经验：')),
    '-2 臂的经验段在（占位行只有一行，没有这一段）',
  );
  assert(
    texts.some((line) => line.includes('[发色：')),
    '-2 臂的外貌段在（页码传错时这一行不在）',
  );
  assert(
    !texts.some((line) => line.startsWith('一人称：')),
    '-2 臂无 SHOW_BLOCK 的人称行',
  );
  assert(
    !texts.some((line) => line.includes('尚未移植')),
    '不得再打存根占位行',
  );
});

// —— 随机源透传（接线验收返工）：形参有缺省值时，实参被去掉会静静落回
//    Math.random（#344 的形态：本机跑一次绿、CI 抽中才红） ——

/**
 * 把缺省随机源换成会抛的桩，再跑 fn。任何一环没把 `rand` 往下传、下游落回
 * 自己的 default_rand（`Math.random`）时就当场炸；透传正常时整条流程一次都
 * 不会碰它。
 */
async function without_default_rand(fn) {
  const real = Math.random;
  Math.random = () => {
    throw new Error('落回缺省随机源（rand 实参没透传）');
  };
  try {
    return await fn();
  } finally {
    Math.random = real;
  }
}

test('随机源透传：召唤全链吃注入的源（MONSTER_DATA / CHAR_MAKE / 信息屏）', async () => {
  // 一条链覆盖四处透传：select_monster → BUY_MONSTER 的 read_monster →
  // MONSTER_DATA、CHAR_MAKE、召唤确认段的 SHOW_CHARA_INFO（后者的随机消耗靠
  // 使役魔兽标记 CFLAG:570 触发，见 show_data）
  const fixture = await without_default_rand(() =>
    run_monster_shop(
      { 'item:101': 3, 'cflag:202:570': 101 },
      1, // 入口
      1, // 性别
      1, // 种族
      202, // 商品
      101,
      101,
      101, // 祭品
      0, // 献祭确认
      0, // 召唤确认
    ),
  );
  assert(
    history_texts(fixture).some((line) => line.includes('确定要召唤')),
    '全链跑完（有任一处没透传就会在这里之前炸）',
  );
});

test('随机源透传：BUY_MONSTER 的独立出口也吃注入的源', async () => {
  const fixture = monster_world({ 'item:101': 3 });
  fixture.set_inputs(101, 101, 101, 0);
  const { buy_monster, shop_state } = fixture.load_module(
    'page/page-monster-shop',
  );
  // TFLAG:100/101 的种族两档与 TFLAG:102 的选中项（独立出口绕开
  // SELECT_MONSTER，这三格要手工立起来）
  shop_state.race = 1;
  shop_state.race2 = 1;
  shop_state.chosen = 202;
  await without_default_rand(() => buy_monster(rand0));
  assert.equal(fixture.store.get('item:101'), 0, '三只祭品都献了（全链跑完）');
});
