/**
 * 道具商店测试（issue #399 / N15 段 3）：SHOP_ITEM.ERB 的九个函数
 * （@ITEM_SHOP / @EVENTBUY / @SALEITEM_CHECK / @BUY_PLURAL / @USE_ITEM /
 * @TECHNIQUE_OF_MASTER / @TECHNIQUE_OF_MASTER_UP / @CLEAR_SHOP；
 * @ITEM_DETOX 自 #333 起已在 ere/system/equip/item-detox.js，本票只接线）。
 *
 * 缝 = ere/page/page-item-shop.js 导出的函数 + 商店轮（page-shop.js）的
 * 两个调用点；经唯一夹具观察玩家输出行、变量读写与输入消费，不断言模块
 * 内部辅助函数。
 *
 * 维度型判据一律表驱动走完整维度（在售标志的四个判据、印刷品一览的两段
 * 网格、购买流程的三支分派），不挑点各钉一条。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 造一个带种子世界的夹具；seed 的键为 era 的变量地址 */
function fixture_with(seed = {}) {
  const fixture = create_era_fixture();
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  fixture.load_module('era-utils/era-flag').bought = -1;
  return fixture;
}

// —— @CLEAR_SHOP（:781-786） ——

test('CLEAR_SHOP：清 ITEMSALES:0-299（两端都在，300 在外），一律写 0', () => {
  const fixture = fixture_with({ 'itemsales:0': 1, 'itemsales:299': 1 });
  const { clear_shop } = fixture.load_module('page/page-item-shop');
  fixture.var_writes.length = 0; // 只数本函数自己的写
  clear_shop();
  const written = fixture.var_writes.filter((w) =>
    w.name.startsWith('itemsales:'),
  );
  assert.equal(written.length, 300, 'REPEAT 300 的闭区间 0-299');
  assert.deepEqual(
    written.map((w) => w.name),
    Array.from({ length: 300 }, (_, i) => `itemsales:${i}`),
  );
  assert(
    written.every((w) => w.value === 0),
    '一律写 0',
  );
  assert.equal(fixture.store.get('itemsales:0'), 0);
  assert.equal(fixture.store.get('itemsales:299'), 0);
});

// —— @SALEITEM_CHECK（:253-400） ——

/** 基础在售集：无素质、无持有、难度 0、技巧 0（下表逐条从原作抄出） */
const BASE = [
  ...Array.from({ length: 24 }, (_, i) => i), // :255-257 REPEAT 24 → 0-23
  24, // :294
  25, // :295
  34, // :296
  35, // :297
  37, // :371 好感测定仪（未持有）
  38, // :377 ラブダイナミックス
  39, // :385 秘密知识（未持有素质）
  42, // :390 调合知识（未持有素质）
  52, // :395 技巧等级
  53, // :400 经验值
];

/** 调合知识（TALENT:MASTER:55）点亮的一段（:322-329 + :278-280） */
const BLEND_ITEMS = [26, 27, 29, 30, 31, 40, 41];

/** 跑一遍 @SALEITEM_CHECK，返回最终在售集（升序、去重） */
function sale_set(seed = {}) {
  const fixture = fixture_with(seed);
  const { saleitem_check } = fixture.load_module('page/page-item-shop');
  saleitem_check();
  const lit = new Set();
  const last = new Map();
  for (const w of fixture.var_writes) {
    if (!w.name.startsWith('itemsales:')) continue;
    // 后写覆盖先写（原作同一段里先置 1 再置 0 的条目按最后一次算）
    last.set(Number(w.name.slice('itemsales:'.length)), w.value);
  }
  for (const [id, value] of last) {
    if (value === 1) lit.add(id);
  }
  return [...lit].sort((a, b) => a - b);
}

test('SALEITEM_CHECK：无素质无持有的基线（0-23 与四件消耗品等逐条对上）', () => {
  assert.deepEqual(
    sale_set(),
    [...BASE].sort((a, b) => a - b),
  );
});

test('SALEITEM_CHECK：调合知识（TALENT:MASTER:55）的两侧——点亮七件药品、熄灭 42', () => {
  for (const has_blend of [0, 1]) {
    const lit = sale_set({ 'talent:0:55': has_blend });
    for (const id of BLEND_ITEMS) {
      assert.equal(
        lit.includes(id),
        has_blend === 1,
        `调合知识=${has_blend} 时 ${id} 在售应为 ${has_blend === 1}`,
      );
    }
    // :390-392 【调合知识】道具恰与素质相反（持有素质就不再卖）
    assert.equal(
      lit.includes(42),
      has_blend !== 1,
      '42 是调合知识素质道具，持有素质后下架',
    );
  }
});

test('SALEITEM_CHECK：秘密知识（TALENT:MASTER:325）的两侧——点亮 33、熄灭 39', () => {
  for (const has_secret of [0, 1]) {
    const lit = sale_set({ 'talent:0:325': has_secret });
    assert.equal(
      lit.includes(33),
      has_secret === 1,
      ':337-352 秘密アイテム 33',
    );
    assert.equal(lit.includes(39), has_secret !== 1, ':384-387 秘密知识道具');
  }
});

test('SALEITEM_CHECK：ラブダイナミックス（38）的三个熄灭判据整表驱动', () => {
  // 素质（TALENT:MASTER:91）× 难度（FLAG:5 的 3/4 两档 × 其余档）
  for (const talent91 of [0, 1]) {
    for (const flag5 of [0, 1, 2, 3, 4, 9]) {
      const lit = sale_set({ 'talent:0:91': talent91, 'flag:5': flag5 });
      const hard = flag5 === 3 || flag5 === 4;
      assert.equal(
        lit.includes(38),
        talent91 !== 1 && !hard,
        `素质=${talent91} 难度=${flag5}`,
      );
    }
  }
});

test('SALEITEM_CHECK：技巧等级道具（52）的两条熄灭判据整表驱动', () => {
  // ABL:MASTER:12 >= 10 || ABL:MASTER:12 > FLAG:30 + 1
  for (const [abl, flag30, expected] of [
    [0, 0, true],
    [9, 0, false], // 9 > 1
    [1, 0, true], // 1 > 1 为假
    [2, 0, false],
    [9, 8, true], // 9 > 9 为假
    [9, 7, false],
    [9, 100, true],
    [10, 100, false], // >= 10 一票否决
    [99, 1000, false],
  ]) {
    const lit = sale_set({ 'abl:0:12': abl, 'flag:30': flag30 });
    assert.equal(
      lit.includes(52),
      expected,
      `ABL:MASTER:12=${abl} FLAG:30=${flag30}`,
    );
  }
});

test('SALEITEM_CHECK：非消耗品的「已持有一件」下架（判据是 == 1，2 件仍上架）', () => {
  for (const stock of [0, 1, 2]) {
    const lit = sale_set({ 'item:0': stock, 'item:23': stock });
    assert.equal(lit.includes(0), stock !== 1, `ITEM:0=${stock}`);
    assert.equal(lit.includes(23), stock !== 1, `ITEM:23=${stock}`);
  }
});

test('SALEITEM_CHECK：消耗品的 99 上限（判据是 >= 99，98 仍上架）', () => {
  // 26/27/40/41 之类要调合知识才上架，这里把素质与摄像机都置上，
  // 让七件消耗品全部先站在「在售」一侧，再逐件撞上限
  for (const stock of [0, 98, 99, 100]) {
    for (const id of [24, 25, 26, 27, 28, 34, 35]) {
      const lit = sale_set({
        'item:6': 1,
        'talent:0:55': 1,
        [`item:${id}`]: stock,
      });
      assert.equal(lit.includes(id), stock < 99, `ITEM:${id}=${stock}`);
    }
  }
});

test('SALEITEM_CHECK：录像带（28）要持有摄像机（ITEM:6 != 0），且自身受 99 上限', () => {
  for (const camera of [0, 1, 5]) {
    for (const tape of [0, 98, 99]) {
      const lit = sale_set({ 'item:6': camera, 'item:28': tape });
      assert.equal(
        lit.includes(28),
        camera !== 0 && tape < 99,
        `ITEM:6=${camera} ITEM:28=${tape}`,
      );
    }
  }
});

test('SALEITEM_CHECK：好感测定仪（37）持有即下架（判据是真值，不是 == 1）', () => {
  for (const stock of [0, 1, 2]) {
    const lit = sale_set({ 'item:37': stock });
    assert.equal(lit.includes(37), stock === 0, `ITEM:37=${stock}`);
  }
});

test('SALEITEM_CHECK：已持有下架在 6/17/20 之后（三件非消耗品持有 1 件也下架）', () => {
  // :282-285 的三行在 :288-291 之前——顺序反过来才是「无条件上架」。
  // 由此两件事是等价变异（改了输出不变，不建条目）：ALWAYS_NON_CONSUMABLES
  // 与 EXTRA_NON_CONSUMABLES 的成员全在 0-23 内，而 0-23 先被基线段点亮、
  // 再被这段按「恰好持有 1 件」清掉——两组常量的成员各摘一个，终态不变；
  // 同理 BASE_SALES_COUNT 24 → 25 只多写一次 ITEMSALES:24，随后被消耗品段
  // 重新点 1。这几处的 1:1 只体现在写序列上（终态判不出）。
  for (const stock of [0, 1, 2]) {
    const lit = sale_set({
      'item:6': stock,
      'item:17': stock,
      'item:20': stock,
    });
    for (const id of [6, 17, 20]) {
      assert.equal(lit.includes(id), stock !== 1, `${id} 持 ${stock} 件`);
    }
  }
});

test('SALEITEM_CHECK：只写本商店的两类标志，不碰别的变量', () => {
  const fixture = fixture_with({ 'item:0': 1 });
  const { saleitem_check } = fixture.load_module('page/page-item-shop');
  fixture.var_writes.length = 0;
  saleitem_check();
  const names = new Set(fixture.var_writes.map((w) => w.name.split(':')[0]));
  assert.deepEqual([...names].sort(), ['itemsales']);
});

// —— 排版助手（原作 %…,N,LEFT% 的显示宽度填充；与 page-shop-trap 的
//    cell() 同形，两处各留一份，本文件只服务本票的两段网格） ——

/** 一格：字面方括号包住补到 width 显示宽度的正文 */
function cell(text, width) {
  const shown = [...text].reduce(
    (sum, ch) => sum + (ch.charCodeAt(0) > 0xff ? 2 : 1),
    0,
  );
  return `[${text}${' '.repeat(Math.max(0, width - shown))}]`;
}

/** 全量行史的文本行（含被重绘清掉的；「发生过什么」的取证面，同 page-shop） */
function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 两段网格之间（含尾行）的文本行 */
function grid_rows(fixture, start_label, end_label) {
  const lines = fixture.text_lines();
  const start = lines.indexOf(start_label);
  const end = lines.indexOf(end_label);
  assert(start >= 0 && end > start, `${start_label} → ${end_label} 应成段`);
  return lines.slice(start + 1, end);
}

// —— @ITEM_SHOP（:17-80）的绘制半 ——

/** 铺一个跑得动 ITEM_SHOP 的最小世界（空持有、无在售） */
function item_shop_world(seed = {}) {
  return fixture_with({
    'flag:10000': 6, // DAY:0 → 显示 7 日
    'flag:10003': 0, // TIME = 0 → 午前
    'flag:10004': 1234, // MONEY
    'abl:0:12': 3, // 技巧 Lv
    itemkeys: [],
    ...seed,
  });
}

/**
 * 页脚 [999] 返回键所在的行号（页脚空行断言的取证面）。
 *
 * 原作 :78-80 是两个 `PRINTLC` 跟一个 `PRINTL`：`PRINTLC` 不换行（按
 * CONTEXT.md「输出 API 与原作的对应」），那个 `PRINTL` 只结束它所在的那一行。
 * ere 的 `printButton` 自成一行（＝ `PRINTLC` + 收尾的 `PRINTL`），故页脚
 * 按钮之后不应再出现空行。
 * @param {object} fixture 夹具
 * @returns {number} 行号
 */
function footer_row(fixture) {
  return fixture.lines.find(
    (line) => line.type === 'button' && line.accelerator === 999,
  ).row;
}

test('ITEM_SHOP：页脚两个 PRINTLC 之后没有空行（PRINTLC 不换行，:80 的 PRINTL 只收那一行）', async () => {
  const fixture = item_shop_world();
  const { item_shop } = fixture.load_module('page/page-item-shop');
  await item_shop();

  // 原作 :78-80 是两个 PRINTLC 加一个 PRINTL。PRINTLC 按「PRINTCの文字数」
  // 补空格后打在同一行、**不换行**（语义与勘误见 CONTEXT.md「输出 API 与
  // 原作的对应」），那个 PRINTL 只结束它所在的那一行，不产生空行。ere 的
  // printButton 自成一行（＝ PRINTLC + 收尾的 PRINTL），页脚之后再补一条
  // 就是多出来的空行。
  assert.deepEqual(
    fixture.lines.filter((line) => line.row > footer_row(fixture)),
    [],
    '道具商店页脚按钮之后不应有空行',
  );
});

test('ITEM_SHOP：头行 1:1（标题/日期/所持金/技巧Lv/两段一览标题）与三处性判据', async () => {
  const fixture = item_shop_world();
  const { item_shop } = fixture.load_module('page/page-item-shop');
  await item_shop();

  assert.deepEqual(fixture.text_lines(), [
    '黑市商人',
    '《可以购买用于调教的物品》',
    '7日 午前',
    '[所持金:1234点]',
    '[技巧Lv:3]',
    '[调教道具一览]', // 空持有 → 一段一行都没有
    '[消耗型调教道具一览]',
    '《请输入要购买的道具的编号》',
  ]);

  // :78-79 的两个键是按钮（正文不写 [编号] 前缀；引擎拼出 `[998] - 陷阱`）
  // ——商店屏同时印了商品按钮，键若只印文本，引擎的 rule 会把键入的 998/999
  // 弹回（#130 的输入通道语义）
  const keys = fixture.lines
    .filter((line) => line.type === 'button')
    .map((line) => [line.accelerator, line.rendered]);
  assert.deepEqual(keys, [
    [998, '[998] - 陷阱'],
    [999, '[999] - 返回'],
  ]);

  // :20 CUSTOMDRAWLINE = → 三处 DRAWLINE（:23 日期行前、:65 在售标志前、
  // :77 提示行后）都走实线
  const dividers = fixture.lines.filter((line) => line.type === 'divider');
  assert.equal(dividers.length, 3, 'DRAWLINE 三次');
  assert(dividers.every((line) => line.border === 'solid'));

  // :34-37/:49-51 的 SETCOLORBYNAME LightSalmon → 三行标签着色
  for (const text of ['[技巧Lv:3]', '[调教道具一览]', '[消耗型调教道具一览]']) {
    const line = fixture.lines.find(
      (l) => l.type === 'text' && l.text === text,
    );
    assert.deepEqual(
      line.content,
      [{ content: text, color: 'LightSalmon' }],
      `${text} 应着 LightSalmon`,
    );
  }

  // :78-79 两个 PRINTLC（左对齐补位、不换行，见 CONTEXT.md「输出 API 与原作
  // 的对应」）以 setAlign 包一次近似排版、随后还原
  assert.deepEqual(
    fixture.calls
      .filter((call) => call.api === 'setAlign')
      .map((call) => call.args[0]),
    ['center', 'left'],
  );
});

test('ITEM_SHOP：日期行两态（TIME 0 午前 / 1 午后）与日号 = DAY:0 + 1', async () => {
  for (const [time, half] of [
    [0, '午前'],
    [1, '午后'],
  ]) {
    for (const [day_count, printed] of [
      [0, 1],
      [9, 10],
      [364, 365],
    ]) {
      const fixture = item_shop_world({
        'flag:10000': day_count,
        'flag:10003': time,
      });
      const { item_shop } = fixture.load_module('page/page-item-shop');
      await item_shop();
      assert(
        fixture.text_lines().includes(`${printed}日 ${half}`),
        `DAY:0=${day_count} TIME=${time}`,
      );
    }
  }
});

test('ITEM_SHOP：两段一览的网格（名字补 10 / 名字(所持:N) 补 20，5 格一行）', async () => {
  const fixture = item_shop_world({
    'item:0': 2, // 第一段：持有的非消耗品
    'item:1': 1,
    'item:2': 1,
    'item:3': 1,
    'item:4': 1, // 第 5 格 → 满行
    'item:5': 1, // 第 6 格 → 第二行
    'item:23': 1, // 段内右端
    'item:24': 1, // 第二段：消耗品（带所持数）
    'item:25': 3,
    'item:29': 1, // :56-57 在第二段里被跳过
    'item:30': 1,
    'item:31': 1,
    'item:35': 2,
    'itemname:0': '振动宝石',
    'itemname:1': '壶虫',
    'itemname:2': '振动杖',
    'itemname:3': '肛门虫',
    'itemname:4': '假阳具',
    'itemname:5': '眼罩',
    'itemname:23': '拘束衣',
    'itemname:24': '安全套',
    'itemname:25': '润滑液',
    'itemname:29': '打虫药',
    'itemname:30': '营养剂',
    'itemname:31': '熏香',
    'itemname:35': '观战卷',
  });
  const { item_shop } = fixture.load_module('page/page-item-shop');
  await item_shop();

  assert.deepEqual(
    grid_rows(fixture, '[调教道具一览]', '[消耗型调教道具一览]'),
    [
      // 第 1 行：0-4 五格（名字补到 10 显示宽）
      ['振动宝石', '壶虫', '振动杖', '肛门虫', '假阳具']
        .map((name) => cell(name, 10))
        .join(''),
      // 第 2 行：5 号与段尾的 23 号（余数行，行尾不再补空行）
      ['眼罩', '拘束衣'].map((name) => cell(name, 10)).join(''),
    ],
  );
  assert.deepEqual(
    grid_rows(fixture, '[消耗型调教道具一览]', '《请输入要购买的道具的编号》'),
    [
      // 24/25/35 三格；29-31 被 :56-57 跳过（种子里 30/31 有持有也不出场）
      ['安全套(所持:1)', '润滑液(所持:3)', '观战卷(所持:2)']
        .map((text) => cell(text, 20))
        .join(''),
    ],
  );
});

test('ITEM_SHOP：网格段的边界与空段（持有 0 不占格，段空则一行不打）', async () => {
  // 空段：两段都不出一行（0 % 5 == 0，不补换行）
  const empty = item_shop_world();
  const { item_shop } = empty.load_module('page/page-item-shop');
  await item_shop();
  assert.deepEqual(
    grid_rows(empty, '[调教道具一览]', '[消耗型调教道具一览]'),
    [],
  );
  assert.deepEqual(
    grid_rows(empty, '[消耗型调教道具一览]', '《请输入要购买的道具的编号》'),
    [],
  );

  // 恰好 5 格：一行，行尾不再多补空行
  const exact = item_shop_world({
    'item:0': 1,
    'item:1': 1,
    'item:2': 1,
    'item:3': 1,
    'item:4': 1,
  });
  const { item_shop: draw_exact } = exact.load_module('page/page-item-shop');
  await draw_exact();
  assert.equal(
    grid_rows(exact, '[调教道具一览]', '[消耗型调教道具一览]').length,
    1,
  );

  // 段界两端：23 在内、24 在外；35 在内、36 在外
  const bounds = item_shop_world({
    'item:22': 1,
    'item:23': 1,
    'item:24': 1,
    'item:35': 1,
    'item:36': 1,
  });
  const { item_shop: draw_bounds } = bounds.load_module('page/page-item-shop');
  await draw_bounds();
  const [first] = grid_rows(bounds, '[调教道具一览]', '[消耗型调教道具一览]');
  assert.equal(first.split('[').length - 1, 2, '第一段只应两格（22/23）');
  const second = grid_rows(
    bounds,
    '[消耗型调教道具一览]',
    '《请输入要购买的道具的编号》',
  );
  assert.equal(
    second.join('').split('[').length - 1,
    2,
    '第二段只应两格（24/35，36 在段外）',
  );
});

// —— PRINT_SHOPITEM（引擎命令，EraElectron 无）的 ere 等价物 ——

test('PRINT_SHOPITEM：在售商品各一枚按钮（accelerator = 道具序号），按序号升序', async () => {
  const fixture = item_shop_world({
    itemkeys: [0, 24, 60, 300, 91],
    'itemsales:0': 1,
    'itemsales:24': 1,
    'itemsales:60': 1,
    'itemsales:300': 1, // 陷阱商店的戒指（300-320 也会被点亮）
    'itemsales:91': 0, // 在售位为 0 的不出场
    'itemname:0': '振动宝石',
    'itemname:24': '安全套',
    'itemname:60': '落穴',
    'itemname:300': '装饰戒指',
    'itemprice:0': 200,
    'itemprice:24': 100,
    'itemprice:60': 10,
    'itemprice:300': 1,
  });
  const { print_shopitem } = fixture.load_module('page/page-item-shop');
  print_shopitem();

  const buttons = fixture.lines
    .filter((line) => line.type === 'button')
    .map((line) => [line.accelerator, line.text]);
  // 金额单位取游戏配置（target/CSV/_replace.csv お金の単位 = pts. / 位置=後，
  // 黄金样本的状态行「(所持金：800 pts.)」同源）——引擎的 PRINT_SHOPITEM
  // 就按这份配置渲染价格
  assert.deepEqual(buttons, [
    [0, '振动宝石（200pts.）'],
    [24, '安全套（100pts.）'],
    [60, '落穴（10pts.）'],
    [300, '装饰戒指（1pts.）'],
  ]);
});

test('PRINT_SHOPITEM：一件在售都没有时一行不打（空表不出按钮）', () => {
  const fixture = item_shop_world({ itemkeys: [0, 1] });
  const { print_shopitem } = fixture.load_module('page/page-item-shop');
  print_shopitem();
  assert.deepEqual(fixture.lines, []);
});

// ================================================================
// 购买流程（@EVENTBUY 族）：引擎侧五步 → 三支分派 → 各支的输入循环
// ================================================================

/** 铺一个可购买的世界：在售位、名字、价格齐全（价格与 yml/Item.yml 同值） */
function buy_world(seed = {}) {
  const fixture = fixture_with({
    'flag:10004': 10000, // MONEY
    'itemname:0': '振动宝石',
    'itemprice:0': 200,
    'itemname:24': '安全套',
    'itemprice:24': 100,
    'itemname:53': '【经验值】',
    'itemprice:53': 1000,
    'itemname:55': '【陷阱等级】',
    'itemprice:55': 5000,
    'itemname:91': '装饰的戒指',
    'itemprice:91': 100,
    'itemname:60': '落穴',
    'itemsales:0': 1,
    'itemsales:24': 1,
    'itemsales:53': 1,
    'itemsales:55': 1,
    'itemsales:91': 1,
    'itemsales:60': 1,
    // 商品按钮的序号面（引擎的 itemkeys = Item.yml 的登记序号全集）
    itemkeys: [0, 24, 53, 55, 60, 91],
    ...seed,
  });
  fixture.store.set('flag:10004', fixture.store.get('flag:10004') ?? 10000);
  return fixture;
}

/** 买入口（purchase）在 seed 的世界里买入 item_id，返回夹具与返回值 */
async function run_purchase(item_id, seed = {}, inputs = []) {
  const fixture = buy_world(seed);
  fixture.set_inputs(...inputs);
  const { purchase } = fixture.load_module('page/page-item-shop');
  const result = await purchase(item_id);
  return { fixture, result };
}

test('purchase：不在售时无声退回（不出货、不扣钱、不进 EVENTBUY）', async () => {
  const fixture = buy_world({ 'itemsales:24': 0 });
  const { purchase } = fixture.load_module('page/page-item-shop');
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(await purchase(24), 0);
  assert.deepEqual(fixture.lines, []);
  assert.equal(era_flag.money, 10000);
  assert.equal(fixture.store.get('item:24') ?? 0, 0);
  assert.equal(era_flag.bought, -1, 'BOUGHT 不动');
});

test('purchase：钱不够时无声退回；恰好等于价格则成交（下界闭区间）', async () => {
  {
    const fixture = buy_world({ 'flag:10004': 99 }); // 99 < 100
    const { purchase } = fixture.load_module('page/page-item-shop');
    assert.equal(await purchase(24), 0);
    assert.deepEqual(fixture.lines, []);
    assert.equal(fixture.store.get('item:24') ?? 0, 0);
  }
  {
    const { fixture, result } = await run_purchase(
      0,
      { 'flag:10004': 200 },
      [0],
    );
    assert.equal(result, 1);
    assert.equal(
      fixture.load_module('era-utils/era-flag').money,
      0,
      '恰好等于价格应成交',
    );
  }
});

test('purchase：成交做四件事——BOUGHT 设定、给货、扣钱、再走 EVENTBUY', async () => {
  const { fixture, result } = await run_purchase(0, {}, [0]);
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  assert.equal(result, 1);
  assert.equal(era_flag.bought, 0, 'BOUGHT = 选中编号');
  assert.equal(fixture.store.get('item:0'), 1, 'ITEM += 1');
  assert.equal(era_flag.money, 9800, 'MONEY -= ITEMPRICE');
  assert.equal(
    era_exflag.legit_money,
    -200,
    'EVENTBUY 的记账额（SIMPLE_LEDGER 的 200）',
  );
  assert(history_texts(fixture).includes('《购买了振动宝石》'));
});

// —— @EVENTBUY 的三支分派（:89/:93/兜底） ——

test('EVENTBUY 分派：复数购买支的名单（含 >= 60 且 != 90 的第二段判据）', async () => {
  // 名单内：24/25/26/27/28/34/35/53/55 与 60-89/91；名单外：90 与 0-23/37
  const plural = [24, 25, 26, 27, 28, 34, 35, 53, 55, 60, 89, 91];
  for (const id of plural) {
    const fixture = buy_world({
      [`itemsales:${id}`]: 1,
      [`itemname:${id}`]: `道具${id}`,
      [`itemprice:${id}`]: 10,
    });
    const { purchase } = fixture.load_module('page/page-item-shop');
    fixture.set_inputs(0); // 数量选择的「0 返回」——复数支的特征出口
    await purchase(id);
    assert(
      history_texts(fixture).some((line) => line.includes('要买多少')),
      `${id} 应打数量选择的提示`,
    );
    // 取消路径的净效果：货退回、钱还上（@EVENTBUY 的复数支恒 RETURN 1，
    // 返回值不反映成交与否，故这里看状态）
    assert.equal(fixture.store.get(`item:${id}`) ?? 0, 0, `${id} 取消后不持有`);
  }
  {
    const { fixture } = await run_purchase(90, { 'itemsales:90': 1 }, [1]);
    assert(
      history_texts(fixture).some((line) => line.includes('确定购买')),
      '90 被 :89 的 `!= 90` 排除，走简单确认支',
    );
  }
});

test('EVENTBUY 分派：当场使用支的名单（29-33/40/41）与其余走确认', async () => {
  for (const id of [29, 30, 31, 32, 33, 40, 41]) {
    const fixture = buy_world({
      [`itemsales:${id}`]: 1,
      [`itemname:${id}`]: `道具${id}`,
      [`itemprice:${id}`]: 10,
    });
    const { purchase } = fixture.load_module('page/page-item-shop');
    fixture.set_inputs(999); // 使用对象选择的「返回」
    await purchase(id);
    assert(
      history_texts(fixture).some((line) => line.includes('要让谁使用')),
      `${id} 应进使用支`,
    );
  }
  const { fixture } = await run_purchase(0, {}, [1]);
  assert(
    history_texts(fixture).some((line) => line.includes('确定购买')),
    '0 号走简单确认支',
  );
});

// —— 简单确认支（:99-248） ——

test('确认支：不要（1）时退货退钱，并从 TFLAG:15 的暂存值重建不变量', async () => {
  const fixture = buy_world({ 'exflag:4444': 5000 });
  const { item_shop, purchase } = fixture.load_module('page/page-item-shop');
  const { get_temp_money } = fixture.load_module('page/page-item-shop');
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  await item_shop(); // 让 TFLAG:15 的暂存值在此刻落定
  const temp = get_temp_money();
  // 真实顺序：商店屏的输入集被玩家点中的商品消费掉，确认提示才是自由输入
  fixture.set_inputs(0);
  const chosen = await fixture.era.input();
  fixture.set_inputs(1);
  assert.equal(await purchase(chosen), 0);
  assert.equal(fixture.store.get('item:0'), 0, 'ITEM:BOUGHT -= 1（退货）');
  assert.equal(era_flag.bought, 0, 'BOUGHT = 0（仍在道具商店）');
  assert.equal(era_flag.money, temp, 'MONEY 还原到进店时的值');
  assert.equal(
    era_exflag.legit_money,
    temp - 8766,
    'EX_FLAG:4444 = TFLAG:15 - 8766',
  );
});

test('确认支：非法输入（非 0/1）由引擎拒收（#572：选项已按钮化）', async () => {
  // 旧行为是「非 0/1 重问一次」——按钮化后白名单就是 0/1，7 这类值被引擎
  // 拒收、不回传游戏，重问支结构性不可达（1:1 保留，不补用例）。
  const fixture = buy_world();
  const { purchase } = fixture.load_module('page/page-item-shop');
  fixture.set_inputs(7);
  await assert.rejects(() => purchase(0), /输入不合法！请输入以下值之一：0, 1/);
  assert.equal(
    history_texts(fixture).filter((l) => l.includes('确定购买')).length,
    1,
    '只问过一次（拒收发生在确认处）',
  );
});

test('确认支：两项是按钮（#572）——[0] 好的 / [1] 不要', async () => {
  const fixture = buy_world();
  const { purchase } = fixture.load_module('page/page-item-shop');
  fixture.set_inputs(1);
  assert.equal(await purchase(0), 0, '[1] 不要');
  assert.deepEqual(
    fixture.lines
      .filter((line) => line.type === 'button')
      .map((line) => line.rendered),
    ['[0] - 好的', '[1] - 不要'],
    ':99-113 的两项（正文不带 [N]）',
  );
});

test('确认支：0-23 与 37 的记账额逐条对上（SIMPLE_LEDGER 全表）', async () => {
  const expected = {
    0: 200,
    1: 500,
    2: 2000,
    3: 5000,
    4: 2000,
    5: 4000,
    6: 7000,
    7: 2000,
    8: 3000,
    9: 1000,
    10: 200,
    11: 2000,
    12: 4000,
    13: 5000,
    14: 3000,
    15: 8000,
    16: 30000,
    17: 1500,
    18: 5000,
    19: 10000,
    20: 7000,
    21: 50000,
    22: 3000,
    23: 10000,
    37: 1000,
  };
  for (const [id, amount] of Object.entries(expected)) {
    const { fixture } = await run_purchase(
      Number(id),
      { [`itemsales:${id}`]: 1, [`itemname:${id}`]: `道具${id}` },
      [0],
    );
    const era_exflag = fixture.load_module('era-utils/era-exflag');
    assert.equal(
      era_exflag.legit_money,
      -amount,
      `${id} 号道具的记账额应为 ${amount}`,
    );
  }
});

test('确认支：素质道具四件（38/39/42/54/56）各自的素质与熄灭位', async () => {
  const cases = [
    { id: 38, amount: 100000, talent: 'talent:0:91', off_sale: false },
    { id: 39, amount: 100000, talent: 'talent:0:325', off_sale: false },
    { id: 42, amount: 40000, talent: 'talent:0:55', off_sale: false },
    { id: 54, amount: 100000, talent: 'talent:0:327', off_sale: true },
    { id: 56, amount: 10000, talent: 'talent:0:328', off_sale: true },
  ];
  for (const { id, amount, talent, off_sale } of cases) {
    const { fixture } = await run_purchase(
      id,
      {
        'flag:10004': 1000000, // 素质道具的单价最高 100000
        [`itemsales:${id}`]: 1,
        [`itemname:${id}`]: `道具${id}`,
        [`itemprice:${id}`]: amount,
      },
      [0],
    );
    const era_exflag = fixture.load_module('era-utils/era-exflag');
    assert.equal(era_exflag.legit_money, -amount, `${id} 的记账额`);
    assert.equal(fixture.store.get(talent), 1, `${id} 应点亮 ${talent}`);
    assert.equal(fixture.store.get(`item:${id}`), 0, '素质道具买后吃掉');
    if (off_sale) {
      assert.equal(
        fixture.store.get(`itemsales:${id}`),
        0,
        `${id} 买后熄灭在售位（54 的「可以购买淫魔的陷阱了」）`,
      );
    }
  }
});

test('确认支：52 号技巧等级道具走 TECHNIQUE_OF_MASTER_UP', async () => {
  const { fixture } = await run_purchase(
    52,
    {
      'itemsales:52': 1,
      'itemname:52': '【技巧等级】',
      'itemprice:52': 5000,

      'abl:0:12': 3,
      'flag:33': 7,
    },
    [0],
  );
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  assert.equal(fixture.store.get('abl:0:12'), 4, 'ABL:MASTER:12 += 1');
  assert.equal(fixture.store.get('flag:33'), 0, 'FLAG:33 = 0');
  assert.equal(fixture.store.get('item:52'), 0, '道具被吃掉');
  assert.equal(era_exflag.legit_money, -5000);
  assert(history_texts(fixture).some((line) => line.includes('技巧LV4了')));
});

// —— 复数购买支的账目与边界（@BUY_PLURAL，:404-582） ——

/** 复数购买支：买 qty 件（成交路径），返回夹具 */
async function buy_one(id, seed = {}, qty = 1, extra = []) {
  const { fixture } = await run_purchase(id, seed, [qty, ...extra]);
  return fixture;
}

test('复数购买：单价表逐条对上（含陷阱的 TRAP_PRICE 段与 91 的戒指价）', async () => {
  const cases = [
    [24, 100],
    [25, 200],
    [26, 2000],
    [27, 1000],
    [28, 500],
    [34, 5000],
    [35, 700],
    [55, 5000],
    [91, 100],
    [60, 10], // TRAP_PRICE:60（SHOP_TRAP.ERB 的价表，与 yml/Item.yml 同值）
    [61, 50],
    [89, 100], // 陷阱段的上界（TRAP_PRICE:89）
  ];
  for (const [id, price] of cases) {
    const fixture = await buy_one(
      id,
      {
        'flag:10004': 1000000,
        'cflag:0:9': 99, // 55 号（陷阱等级）的可买数被地下城阶层钳制，给它留够
        [`itemsales:${id}`]: 1,
        [`itemname:${id}`]: `道具${id}`,
        [`itemprice:${id}`]: price,
      },
      1,
      // 53 号买完转「让谁使用」的角色选择（:501-543），补一个目标
      id === 53 ? [0] : [],
    );
    const era_flag = fixture.load_module('era-utils/era-flag');
    const era_exflag = fixture.load_module('era-utils/era-exflag');
    assert.equal(
      era_flag.money,
      1000000 - price,
      `${id} 号买一件后应恰好少 ${price}`,
    );
    assert.equal(era_exflag.legit_money, -price, `${id} 号的记账额`);
  }
});

test('复数购买：可买数 D 取「持有上限」与「钱够买几件」的较小者，E 记被哪一侧卡住', async () => {
  // 持有上限吃紧：ITEM:24 = 95 → 引擎给 1 件后 B = 4，钱远够 → D = 4、E = 0
  {
    const { fixture } = await run_purchase(
      24,
      { 'item:24': 95, 'flag:10004': 10000 },
      [5, 1],
    );
    assert(
      history_texts(fixture).includes('不能持有这么多'),
      'E == 0 的越界文案',
    );
    assert(
      history_texts(fixture).some((line) =>
        line.includes('要买多少安全套？（1-4、'),
      ),
      'D 取持有上限 4',
    );
  }
  // 钱吃紧：买 1 件后 MONEY = 150 → C = floor(150/100)+1 = 2 → D = 2、E = 1
  {
    const { fixture } = await run_purchase(
      24,
      { 'item:24': 0, 'flag:10004': 250 },
      [3, 1],
    );
    assert(
      history_texts(fixture).includes('哪怕是魔王，也不能赊账啊'),
      'E == 1 的越界文案',
    );
    assert(
      history_texts(fixture).some((line) =>
        line.includes('要买多少安全套？（1-2、'),
      ),
      'D 取钱的上限 2',
    );
  }
});

test('复数购买：D/2 的档位只在大于 20 时出现（:456-460）', async () => {
  {
    const fixture = await buy_one(24, { 'item:24': 0, 'flag:10004': 1000000 });
    // B = 99（上限吃紧）→ D = 99、D/2 = 49 > 20 → 出现
    assert(
      history_texts(fixture).some((line) =>
        line.includes('[20] - [49] - [99] 买空钱包'),
      ),
      'D/2 > 20 时的整行选项',
    );
  }
  {
    const fixture = await buy_one(24, { 'item:24': 0, 'flag:10004': 4000 });
    // 买 1 件后 MONEY = 3900 → C = 40 → D = 40、D/2 = 20（不大于 20）→ 不出现
    assert(
      history_texts(fixture).some((line) =>
        line.includes('[20] - [40] 买空钱包'),
      ),
      'D/2 == 20 时不出那一段',
    );
  }
});

test('复数购买：买 n 件的账（引擎给 1 件 + 脚本补 n-1；钱与记账各按件数走）', async () => {
  const fixture = await buy_one(24, {
    'item:24': 0,
    'flag:10004': 1000,
  });
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  // 买 1 件：引擎扣 100 → 900；脚本只记账
  assert.equal(era_flag.money, 900);
  assert.equal(fixture.store.get('item:24'), 1);
  assert.equal(era_exflag.legit_money, -100);
  assert(history_texts(fixture).includes('《购买了安全套》'));

  // 买 3 件：引擎扣 100、脚本补扣 200 → 700；货 3 件；记账 300
  const three = await buy_one(24, { 'item:24': 0, 'flag:10004': 1000 }, 3);
  const three_flag = three.load_module('era-utils/era-flag');
  const three_exflag = three.load_module('era-utils/era-exflag');
  assert.equal(three.store.get('item:24'), 3, 'ITEM += RESULT - 1');
  assert.equal(three_flag.money, 700, 'MONEY -= A * (RESULT - 1)');
  assert.equal(three_exflag.legit_money, -300, 'EX_FLAG:4444 -= A * RESULT');
  assert(history_texts(three).includes('《购买了3个安全套》'));
});

test('复数购买：取消（0）退还原价，负值重问', async () => {
  const { fixture } = await run_purchase(
    24,
    { 'item:24': 0, 'flag:10004': 1000 },
    [0],
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(fixture.store.get('item:24'), 0, '取消退货（ITEM -= 1）');
  assert.equal(era_flag.money, 1000, '取消退钱（引擎已扣的那一份）');

  // 负值 → :473-474 重问，随后按有效值成交
  const neg = await buy_one(24, { 'item:24': 0, 'flag:10004': 1000 }, -1, [1]);
  assert.equal(neg.store.get('item:24'), 1, '负值不打乱成交');
  assert.deepEqual(
    neg.inputs_consumed.map((i) => i.value ?? i.api),
    [-1, 1, 'waitAnyKey'],
    '一次负值重问后成交',
  );
});

test('复数购买：55 号陷阱等级的 D 被地下城阶层钳制（:447-448）', async () => {
  // FLAG:85 = 3、CFLAG:0:9 = 5 → D = 5 - 3 = 2，尽管持有上限 100、钱也够
  const { fixture } = await run_purchase(
    55,
    {
      'flag:85': 3,
      'cflag:0:9': 5,
      'flag:10004': 1000000,
      'item:55': 0,
    },
    [1],
  );
  assert(
    history_texts(fixture).some((line) =>
      line.includes('要买多少【陷阱等级】？（1-2、'),
    ),
    'D 被钳到剩余层数 2',
  );
  // 成交：FLAG:85 = 3 + 1 = 4，道具被吃掉、在售位重新点亮
  assert.equal(fixture.store.get('flag:85'), 4, '陷阱上升到 Lv1');
  assert.equal(fixture.store.get('item:55'), 0);
  assert.equal(fixture.store.get('itemsales:55'), 1);
  assert(history_texts(fixture).includes('《陷阱上升到Lv1》'));
});

test('复数购买：53 号经验值道具买完转「让谁使用」（EXP += 件数 × 10）', async () => {
  const fixture = buy_world({
    'item:53': 0,
    'flag:10004': 10000,
  });
  fixture.seed_chara(31, { id: 31, name: '奴隶31' });
  fixture.era.addCharacter(31);
  // 1 件（引擎已给）→ 数量 2 → 补 1 件；E = 2 * 10 = 20
  fixture.set_inputs(2, 31);
  const { purchase } = fixture.load_module('page/page-item-shop');
  await purchase(53);
  assert.equal(fixture.store.get('exp:31:80'), 20, 'EXP:31:80 += E');
  assert(
    history_texts(fixture).some((line) => line.includes('得到了20点经验值')),
  );
  assert.equal(fixture.store.get('item:53'), 0, ':503 买后吃掉');
});

test('复数购买：53 号的选择面——卖却済み不可选（:535-538；不在场目标被引擎弹回，#130）', async () => {
  const fixture = buy_world({ 'item:53': 0, 'flag:10004': 10000 });
  fixture.seed_chara(31, { id: 31, name: '奴隶31' });
  fixture.seed_chara(32, { id: 32, name: '奴隶32' });
  fixture.era.addCharacter(31);
  fixture.era.addCharacter(32);
  fixture.store.set('cflag:32:1', 3); // 32 已卖却（CFLAG:1 != 0）
  fixture.set_inputs(1, 32, 31); // 买一件 → 32 打回 → 31 成交
  const { purchase } = fixture.load_module('page/page-item-shop');
  await purchase(53);
  const texts = history_texts(fixture);
  assert(texts.includes('此人物尚不可选择'), '卖却/占用的角色不可选');
  assert.equal(fixture.store.get('exp:32:80') ?? 0, 0, '卖却済み不能被选中');
  assert.equal(fixture.store.get('exp:31:80'), 10, '换人后成交（E = 1 × 10）');
});

test('复数购买：91 号戒指进 ITEM:300，超过 99 的部分原价退还（:568-580）', async () => {
  const { fixture } = await run_purchase(
    91,
    { 'item:300': 99, 'flag:10004': 10000, 'item:91': 0 },
    [3],
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  const era_exflag = fixture.load_module('era-utils/era-exflag');
  assert.equal(fixture.store.get('item:300'), 99, '上限 99');
  assert.equal(era_flag.money, 9700 + 300, '多买的三枚退还（3 × 100）');
  assert.equal(
    era_exflag.legit_money,
    -300 + 300,
    '记账同步回退（-300 买 / +300 退）',
  );
  assert(history_texts(fixture).includes('退还了多余的戒指'));
  assert.equal(fixture.store.get('item:91'), 0);
});

// —— 当场使用支（@USE_ITEM，:587-738） ——

/** 使用支：以 cid 为目标使用 item_id（默认 999 之前先给一个目标） */
async function use_on(item_id, cid, seed = {}, inputs = []) {
  const fixture = buy_world({
    'flag:10004': 1000000,
    [`itemsales:${item_id}`]: 1,
    [`itemname:${item_id}`]: `道具${item_id}`,
    [`itemprice:${item_id}`]: 100,
    ...seed,
  });
  fixture.seed_chara(31, { id: 31, name: '奴隶31' });
  fixture.era.addCharacter(31);
  fixture.set_inputs(cid, ...inputs);
  const { purchase } = fixture.load_module('page/page-item-shop');
  await purchase(item_id);
  return fixture;
}

test('使用支：999 取消——吃掉道具并按种类退钱（退额表逐条）', async () => {
  const refunds = {
    29: 500,
    30: 1000,
    31: 3000,
    33: 100000,
    40: 2000,
    41: 2000,
  };
  for (const [key, refund] of Object.entries(refunds)) {
    const id = Number(key);
    const fixture = buy_world({
      'flag:10004': 1000000,
      [`itemsales:${id}`]: 1,
      [`itemname:${id}`]: `道具${id}`,
      [`itemprice:${id}`]: refund,
    });
    fixture.set_inputs(999);
    const { purchase } = fixture.load_module('page/page-item-shop');
    const era_flag = fixture.load_module('era-utils/era-flag');
    await purchase(id);
    assert.equal(fixture.store.get(`item:${id}`), 0, `${id} 取消后吃掉`);
    assert.equal(
      era_flag.money,
      1000000 - refund + refund,
      `${id} 取消退还 ${refund}`,
    );
  }
});

test('使用支：30 号体力回复与上限钳制（含「已经达到最大值」的守卫）', async () => {
  const healed = await use_on(30, 31, {
    'base:31:0': 500,
    'maxbase:31:0': 2000,
  });
  assert.equal(healed.store.get('base:31:0'), 1500, 'BASE:31:0 += 1000');
  const capped = await use_on(30, 31, {
    'base:31:0': 1500,
    'maxbase:31:0': 2000,
  });
  assert.equal(capped.store.get('base:31:0'), 2000, '钳到 MAXBASE 不越界');

  // 体力已满：打回重选（种子里再给一个可选目标）
  const full = buy_world({
    'flag:10004': 1000000,
    'itemsales:30': 1,
    'itemname:30': '营养剂',
    'itemprice:30': 1000,
    'base:31:0': 2000,
    'maxbase:31:0': 2000,
    'base:32:0': 100,
    'maxbase:32:0': 2000,
  });
  full.seed_chara(31, { id: 31, name: '奴隶31' });
  full.seed_chara(32, { id: 32, name: '奴隶32' });
  full.era.addCharacter(31);
  full.era.addCharacter(32);
  full.set_inputs(31, 32);
  const { purchase } = full.load_module('page/page-item-shop');
  await purchase(30);
  assert(
    history_texts(full).some((line) =>
      line.includes('奴隶31的体力已经达到了最大值'),
    ),
  );
  assert.equal(full.store.get('base:32:0'), 1100, '打回后换人成功');
});

test('使用支：31 号否定点数减半（JUEL/2 截断 + FLAG:61 += 1）与 0 点守卫', async () => {
  const fixture = await use_on(31, 31, {
    'juel:31:100': 7,
    'base:31:0': 100,
  });
  assert.equal(fixture.store.get('juel:31:100'), 3, '7 / 2 截断为 3');
  assert.equal(fixture.store.get('flag:61'), 1);

  const zero = buy_world({
    'flag:10004': 1000000,
    'itemsales:31': 1,
    'itemname:31': '熏香',
    'itemprice:31': 3000,
    'juel:31:100': 0,
    'base:31:0': 100,
    'base:32:0': 100,
    'juel:32:100': 4,
  });
  zero.seed_chara(31, { id: 31, name: '奴隶31' });
  zero.seed_chara(32, { id: 32, name: '奴隶32' });
  zero.era.addCharacter(31);
  zero.era.addCharacter(32);
  zero.set_inputs(31, 32);
  const { purchase } = zero.load_module('page/page-item-shop');
  await purchase(31);
  assert(
    history_texts(zero).some((line) => line.includes('点数已经不能再减少了')),
  );
  assert.equal(zero.store.get('juel:32:100'), 2, '打回后换人成功');
});

test('使用支：33 号寿命制限削除（两个守卫条件各打回一次）', async () => {
  // 条件一：BASE:31:10 == 0（本就没有寿命限制）
  const no_lifespan = buy_world({
    'flag:10004': 1000000,
    'itemsales:33': 1,
    'itemname:33': 'WG电池',
    'base:31:0': 100,
    'base:31:10': 0,
    'talent:31:85': 1,
    'base:32:0': 100,
    'base:32:10': 5,
    'talent:32:85': 1,
  });
  no_lifespan.seed_chara(31, { id: 31, name: '奴隶31' });
  no_lifespan.seed_chara(32, { id: 32, name: '奴隶32' });
  no_lifespan.era.addCharacter(31);
  no_lifespan.era.addCharacter(32);
  no_lifespan.set_inputs(31, 32);
  const { purchase } = no_lifespan.load_module('page/page-item-shop');
  await purchase(33);
  assert(
    history_texts(no_lifespan).some((line) =>
      line.includes('已经不受寿命限制了'),
    ),
    '两条守卫之一不成立即打回',
  );

  // 条件二：BASE:31:10 > 0 但 TALENT:31:85 == 0（没有爱慕）
  const no_love = buy_world({
    'flag:10004': 1000000,
    'itemsales:33': 1,
    'itemname:33': 'WG电池',
    'base:31:0': 100,
    'base:31:10': 5,
    'talent:31:85': 0,
    'base:32:0': 100,
    'base:32:10': 5,
    'talent:32:85': 1,
  });
  no_love.seed_chara(31, { id: 31, name: '奴隶31' });
  no_love.seed_chara(32, { id: 32, name: '奴隶32' });
  no_love.era.addCharacter(31);
  no_love.era.addCharacter(32);
  no_love.set_inputs(31, 32);
  const { purchase: buy_33 } = no_love.load_module('page/page-item-shop');
  await buy_33(33);
  assert(
    history_texts(no_love).some((line) => line.includes('已经不受寿命限制了')),
    '缺爱慕素质同样打回',
  );
  assert.equal(no_love.store.get('base:32:10'), 0, '换人后生效');

  // 两条都成立：生效
  const ok = await use_on(33, 31, {
    'base:31:0': 100,
    'base:31:10': 5,
    'talent:31:85': 1,
  });
  assert.equal(ok.store.get('base:31:10'), 0, 'BASE:RESULT:10 = 0');
});

test('使用支：40 号排卵促进（妊娠中/育儿中两条守卫文案）', async () => {
  for (const [talent_idx, word] of [
    [153, '怀孕中'],
    [154, '育儿中'],
  ]) {
    const fixture = buy_world({
      'flag:10004': 1000000,
      'itemsales:40': 1,
      'itemname:40': '排卵诱发剂',
      'itemprice:40': 2000,
      'base:31:0': 100,
      [`talent:31:${talent_idx}`]: 1,
    });
    fixture.seed_chara(31, { id: 31, name: '奴隶31' });
    fixture.era.addCharacter(31);
    fixture.set_inputs(31, 999);
    const { purchase } = fixture.load_module('page/page-item-shop');
    await purchase(40);
    assert(
      history_texts(fixture).some((line) =>
        line.includes(`${word}的奴隶31不能使用排卵诱发剂`),
      ),
      `TALENT:${talent_idx} 的守卫文案`,
    );
  }
  const ok = await use_on(40, 31, { 'base:31:0': 100 });
  assert.equal(ok.store.get('cflag:31:109'), 1, 'CFLAG:109 = 1');
});

test('使用支：41 号生毛剂的两支（已经浓密的封顶与正常增长）', async () => {
  const capped = await use_on(41, 31, {
    'base:31:0': 100,
    'talent:31:311': 201,
  });
  assert.equal(capped.store.get('talent:31:311'), 201, '> 200 时封在 201');
  assert(history_texts(capped).some((line) => line.includes('似乎没什么效果')));

  const grown = await use_on(41, 31, {
    'base:31:0': 100,
    'talent:31:311': 100,
    'talent:31:125': 1,
  });
  assert.equal(grown.store.get('talent:31:311'), 150, 'TALENT:311 += 50');
  assert.equal(grown.store.get('talent:31:125'), 0, '白虎を消す');
});

test('使用支：29 号寄生回复接 ITEM_DETOX 真身（不重做）', async () => {
  const fixture = await use_on(29, 31, {
    'base:31:0': 100,
    'talent:31:190': 1,
    'talent:31:191': 1,
    'talent:31:192': 0,
    'talent:31:193': 0,
  });
  assert.equal(fixture.store.get('talent:31:190'), 0);
  assert.equal(fixture.store.get('talent:31:191'), 0);
  assert(
    history_texts(fixture).some((line) => line.includes('从寄生状态中恢复了')),
  );
});

test('使用支：目标必须在场（濒死/不存在的目标打回重问）', async () => {
  const fixture = buy_world({
    'flag:10004': 1000000,
    'itemsales:30': 1,
    'itemname:30': '营养剂',
    'itemprice:30': 1000,
    'base:31:0': 0, // 濒死
    'maxbase:31:0': 2000,
    'base:32:0': 100,
    'maxbase:32:0': 2000,
  });
  fixture.seed_chara(31, { id: 31, name: '奴隶31' });
  fixture.seed_chara(32, { id: 32, name: '奴隶32' });
  fixture.era.addCharacter(31);
  fixture.era.addCharacter(32);
  fixture.set_inputs(31, 32);
  const { purchase } = fixture.load_module('page/page-item-shop');
  await purchase(30);
  assert.equal(
    fixture.store.get('base:32:0'),
    1100,
    '濒死目标被打回、换人成功',
  );
});

test('使用支：翻页键（1000 首页无反应 / 1001 有下一页时翻页）', async () => {
  const fixture = buy_world({
    'flag:10004': 1000000,
    'itemsales:30': 1,
    'itemname:30': '营养剂',
    'itemprice:30': 1000,
    'base:31:0': 100,
    'maxbase:31:0': 2000,
  });
  fixture.seed_chara(31, { id: 31, name: '奴隶31' });
  fixture.era.addCharacter(31);
  // 一个角色：下一页条件 (0+1)*20 <= 1 为假 → 不翻；1000 首页 → 也不动
  fixture.set_inputs(1001, 1000, 31);
  const { purchase } = fixture.load_module('page/page-item-shop');
  await purchase(30);
  assert.equal(fixture.store.get('base:31:0'), 1100, '翻页键不挡成交');
});

// —— @TECHNIQUE_OF_MASTER / @TECHNIQUE_OF_MASTER_UP（:744-776） ——

test('TECHNIQUE_OF_MASTER：只差一件时直接升级（FLAG:33 == F - 1）', async () => {
  const fixture = buy_world({ 'abl:0:12': 3, 'flag:33': 4 });
  const { technique_of_master } = fixture.load_module('page/page-item-shop');
  assert.equal(await technique_of_master(5), 1);
  assert.equal(fixture.store.get('abl:0:12'), 4, '技巧等级 +1');
  assert.equal(fixture.store.get('flag:33'), 0, '已投入件数清零');
});

test('TECHNIQUE_OF_MASTER：凑齐剩余件数（钱够与不够两侧）', async () => {
  {
    // FLAG:33 从 0 起 → 提示需要 F - 1 = 3 件；钱不够（3 × 5000 > 10000）
    const fixture = buy_world({ 'abl:0:12': 3, 'flag:10004': 10000 });
    fixture.set_inputs(0);
    const { technique_of_master } = fixture.load_module('page/page-item-shop');
    assert.equal(await technique_of_master(4), 0);
    assert(
      history_texts(fixture).some((line) =>
        line.includes('哪怕是魔王大人，也是不能赊账的'),
      ),
    );
    assert.equal(fixture.store.get('flag:33'), 1, 'FLAG:33 已 +1');
  }
  {
    // 钱够：MONEY -= 3 × 5000、记账同步、升级
    const fixture = buy_world({ 'abl:0:12': 3, 'flag:10004': 20000 });
    fixture.set_inputs(0);
    const era_flag = fixture.load_module('era-utils/era-flag');
    const era_exflag = fixture.load_module('era-utils/era-exflag');
    const { technique_of_master } = fixture.load_module('page/page-item-shop');
    assert.equal(await technique_of_master(4), 1);
    assert.equal(
      era_flag.money,
      20000 - 15000,
      '凑齐的三件按单价扣钱（升级本身不动 MONEY）',
    );
    assert.equal(era_exflag.legit_money, -15000 - 5000, '记账含升级件的单价');
    assert.equal(fixture.store.get('abl:0:12'), 4);
  }
  {
    // 「不要」：原样返回 0，不再扣钱
    const fixture = buy_world({ 'abl:0:12': 3, 'flag:10004': 20000 });
    fixture.set_inputs(1);
    const { technique_of_master } = fixture.load_module('page/page-item-shop');
    assert.equal(await technique_of_master(4), 0);
    assert.equal(fixture.store.get('flag:33'), 1);
  }
});

test('复数购买：越界后的重画提示不带 D/2 那一段（源 :481-487 与首次不同形）', async () => {
  // 首次提示带 D/2（:450-463），越界后的重画不带（:485-487 直接从 [20] 接 D）
  const { fixture } = await run_purchase(
    24,
    { 'item:24': 0, 'flag:10004': 1000000 },
    [100, 1],
  );
  const prompts = history_texts(fixture).filter((line) =>
    line.includes('买空钱包'),
  );
  assert.equal(prompts.length, 2, '一次首次 + 一次重画');
  assert(
    prompts[0].includes('[49]') && prompts[0].includes('[99]'),
    '首次带 D/2 = 49 与 D = 99',
  );
  assert(
    !prompts[1].includes('[49]') && prompts[1].includes('[99]'),
    '重画只有 D = 99（源 :485-487）',
  );
});

test('复数购买：买 n 件时只等一次键（源 :492/:495 各一支一个 WAIT）', async () => {
  const one = await run_purchase(24, { 'item:24': 0, 'flag:10004': 1000 }, [1]);
  const three = await run_purchase(
    24,
    { 'item:24': 0, 'flag:10004': 1000 },
    [3],
  );
  assert.equal(one.fixture.waits.length, 1, '买 1 件：一个 WAIT');
  assert.equal(three.fixture.waits.length, 1, '买 3 件：也是一个 WAIT');
});

// —— 剩下的两个内联端点（第三轮评审点名：页高与戒指槽位） ——

/** 铺 20 个可选奴隶（页高 20 的端点：第 21 人不存在） */
function join_20_slaves(fixture) {
  for (let cid = 1; cid <= 20; cid += 1) {
    fixture.seed_chara(cid, { id: cid, name: `奴隶${cid}` });
    fixture.era.addCharacter(cid);
  }
}

/** 全量行史里角色行的按钮数（accelerator 1-20 = 当时那一页列出的角色） */
function char_buttons(fixture) {
  return fixture.lines_history.filter(
    (line) =>
      line.type === 'button' && line.accelerator >= 1 && line.accelerator <= 20,
  ).length;
}

test('复数购买：53 号选择面的翻页吃页高 20（正好 20 人时下一页翻到空页）', async () => {
  // (NO_PAGE + 1) * 20 <= CHARANUM：正好 20 人时成立 → 翻到第 2 页（空页）。
  // 页高挪到 21 时这一格不成立、第二屏仍是 20 人——char_buttons 从 20 变 40
  const fixture = buy_world({ 'item:53': 0, 'flag:10004': 100000 });
  join_20_slaves(fixture);
  fixture.set_inputs(1, 1001); // 买一件 → 点「下一页」→ 之后输入耗尽
  const { purchase } = fixture.load_module('page/page-item-shop');
  await assert.rejects(() => purchase(53), /预置输入已耗尽/);
  assert.equal(char_buttons(fixture), 20, '页 0 列 20 人，翻到页 1 是空页');
});

test('当场使用支：30 号选择面的翻页吃页高 20（同一判据的另一处）', async () => {
  // 与 53 号那条同形，但判据在 @USE_ITEM 的 :649-654（两处字面量各一份）
  const fixture = buy_world({
    'itemsales:30': 1,
    'itemname:30': '体力恢复药',
    'itemprice:30': 100,
    'flag:10004': 100000,
  });
  join_20_slaves(fixture);
  fixture.set_inputs(1001); // 目标菜单直接点「下一页」→ 之后输入耗尽
  const { purchase } = fixture.load_module('page/page-item-shop');
  await assert.rejects(() => purchase(30), /预置输入已耗尽/);
  assert.equal(char_buttons(fixture), 20, '页 0 列 20 人，翻到页 1 是空页');
});

test('复数购买：91 号戒指的上限正好卡在 99/100（持 99 再买 1 枚退回）', async () => {
  // :568-580 的 `ITEM:300 > 99`：持 99 再买一枚正好摸到 100 → 退 1 枚的钱并
  // 夹回 99。判据挪到 `> 100` 时这一枚不再退（金额差 100）
  const { fixture } = await run_purchase(
    91,
    { 'item:300': 99, 'flag:10004': 10000, 'item:91': 0 },
    [1],
  );
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(fixture.store.get('item:300'), 99, '夹回上限 99');
  assert.equal(era_flag.money, 10000, '买 −100、退 +100，正好抵平');
  assert(history_texts(fixture).includes('退还了多余的戒指'));
});
