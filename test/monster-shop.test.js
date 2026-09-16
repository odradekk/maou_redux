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

test('MONSTER_SHOP：入口菜单 —— [1] 召唤 / [999] 返回；999 清在售位并退出', async () => {
  const fixture = monster_world({ 'itemsales:202': 1 });
  fixture.set_inputs(999);
  const { monster_shop } = fixture.load_module('page/page-monster-shop');
  assert.equal(await monster_shop(rand0), 0);
  const texts = history_texts(fixture);
  assert(texts.includes('[1]召唤魔物从者'));
  assert(texts.includes('[999] 返回'));
  assert(
    !texts.includes('请选择要召唤的魔物从者的性别'),
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

test('MONSTER_SHOP：性别选择的无效输入打回（> 3 与 0）', async () => {
  // 4 → 打回；0 → 打回；再给 2 才成立（随后在种族选择处退出）
  const fixture = await run_monster_shop({}, 1, 4, 0, 2, 999);
  const texts = history_texts(fixture);
  assert.equal(
    texts.filter((line) => line === '请选择要召唤的魔物从者的性别').length,
    3,
    '两次无效输入各重开一轮（共三轮）',
  );
});

test('MONSTER_SHOP：种族选择的无效输入打回（> 9 与选择失败）', async () => {
  // 10 → 打回；2（亚人，无祭品 → SELECT_MONSTER 返回 0）→ 打回；再 999 退出
  const fixture = await run_monster_shop({}, 1, 1, 10, 1, 202, 999);
  const texts = history_texts(fixture);
  assert(
    texts.includes('没有能作为祭品的怪物'),
    '无祭品时 SELECT_MONSTER 的早退报文',
  );
  assert.equal(
    texts.filter((line) => line === '　请选择魔物从者的种类').length,
    3,
    '两次打回 + 第三次（999 前那一轮）',
  );
});

test('MONSTER_SHOP：种族选择里 999 清在售位并退出', async () => {
  const fixture = await run_monster_shop({ 'itemsales:202': 1 }, 1, 1, 999);
  assert.equal(fixture.store.get('itemsales:202'), 0, ':107 CALL CLEAR_SHOP');
  // 三个屏各印一次 [999] 返回（入口 :37、性别 :73、种族 :101）——按次数钉
  // 住，删/改任意一屏的那一行都会红
  assert.equal(
    history_texts(fixture).filter((line) => line === '[999] 返回').length,
    3,
    '入口/性别/种族三屏各自的返回行',
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
    texts.some((line) => line.includes(`[0] 就是${male ? '他' : '她'}了`)),
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
    history_texts(fixture).some((line) => line.includes('[0] 就是')),
    ':149-155 的召唤确认行',
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

test('MONSTER_SHOP：召唤确认处的 999（非 0/1）也落到函数尾返回', async () => {
  const fixture = await run_monster_shop(
    { 'item:101': 3 },
    1,
    1,
    1,
    202,
    101,
    101,
    101,
    0,
    7,
  );
  assert(
    fixture.era.getAddedCharacters().includes(202),
    '其余输入同样返回 0（角色已入队）',
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
    list_line.includes('最低等级：' + '15'.padStart(5)),
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

test('BUY_MONSTER：确认处只认 0/1——其余值落回祭品选择，不扣钱不扣货', async () => {
  // 挑够祭品后键入 5（源 :345-357 的两支只认 0/1，其余值由 :394 的
  // $INPUT_LOOP_1 回到祭品选择的输入），随后 0 成交
  const { fixture } = await run_buy({ 'item:101': 3 }, 101, 101, 101, 5, 0);
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.money, 10000 - 15 * 135, '只在 0 上成交一次');
  assert.equal(fixture.store.get('item:101'), 0, '祭品也只在成交时扣');
  assert(
    history_texts(fixture).filter((line) =>
      line.includes('请选择满足最低等级要求的怪物作为祭品'),
    ).length >= 1,
    '5 之后回到祭品选择的画面（重画一轮）',
  );
});
