/**
 * 陷阱商店测试（issue #396 / N12 段 3）：@ITEM_SHOP_TRAP 与
 * @SALEITEM_CHECK_TRAP（target/ERB/SHOP/SHOP_TRAP.ERB）。
 *
 * 接缝 = ere/page/page-shop-trap.js 导出的两个函数；经唯一夹具观察玩家
 * 输出行、在售标志与变量读写，不断言模块内部辅助函数。
 *
 * 维度型判据一律表驱动走完整维度：在售标志的三个判据（淫魔知识 ×
 * 魔虫知识 × 陷阱等级）八种组合整表走完，网格排版按「满行 / 不满行 /
 * 空段」三种形态走完。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/**
 * SALEITEM_CHECK_TRAP 的六组在售 id 段（原作 :77-126 逐行 1:1）：
 * 基础段无守卫；淫魔知识（TALENT:0:327）二选一；魔虫知识（TALENT:MASTER:328）
 * 先按 `== 0` 单独点亮 56，再按 `== 1` 追加 65/79/80；戒指恒亮；
 * 陷阱等级（FLAG:85 < CFLAG:0:9）追加 55。
 */
const ALWAYS = [
  60, 61, 62, 63, 69, 72, 73, 74, 75, 76, 77, 78, 81, 82, 83, 84, 85, 87,
];
const EROTIC = [64, 65, 66, 67, 68, 70, 71, 79]; // TALENT:0:327 == 1
const SUCCUBUS_KNOWLEDGE = [54]; // TALENT:0:327 != 1（淫魔知识）
const WORM_BASE = [56]; // TALENT:MASTER:328 == 0
const WORM_EXTRA = [65, 79, 80]; // TALENT:MASTER:328 == 1
const RING = [91]; // 无守卫
const LEVEL_TRAP = [55]; // FLAG:85 < CFLAG:0:9

/** 跑一遍 @SALEITEM_CHECK_TRAP，返回被点亮的 itemsales 下标（升序、保留重复） */
function run_saleitem_check(seed = {}) {
  const fixture = create_era_fixture();
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  const { saleitem_check_trap } = fixture.load_module('page/page-shop-trap');
  saleitem_check_trap();
  const written = fixture.var_writes.filter((w) =>
    w.name.startsWith('itemsales:'),
  );
  return {
    fixture,
    written,
    lit: written
      .filter((w) => w.value === 1)
      .map((w) => Number(w.name.slice('itemsales:'.length)))
      .sort((a, b) => a - b),
  };
}

/** 期望的在售集合（无序），按上表的三维组合拼装 */
function expected_set({ witch, worm, level }) {
  const ids = [...ALWAYS, ...RING];
  ids.push(...(witch ? EROTIC : SUCCUBUS_KNOWLEDGE));
  ids.push(...(worm ? WORM_EXTRA : WORM_BASE));
  if (level) {
    ids.push(...LEVEL_TRAP);
  }
  return [...new Set(ids)].sort((a, b) => a - b);
}

test('SALEITEM_CHECK_TRAP：三个判据的八种组合整表驱动', () => {
  // 淫魔知识（TALENT:0:327）× 魔虫知识（TALENT:MASTER:328）× 陷阱等级
  // （FLAG:85 < CFLAG:0:9）——2×2×2 全覆盖
  for (const witch of [0, 1]) {
    for (const worm of [0, 1]) {
      for (const level of [0, 1]) {
        const seed = {
          'talent:0:327': witch,
          'talent:0:328': worm,
          'flag:85': level ? 0 : 1,
          'cflag:0:9': level ? 1 : 0,
        };
        const { lit } = run_saleitem_check(seed);
        assert.deepEqual(
          [...new Set(lit)],
          expected_set({ witch, worm, level }),
          `淫魔知识=${witch} 魔虫知识=${worm} 陷阱等级=${level}`,
        );
      }
    }
  }
});

test('SALEITEM_CHECK_TRAP：只写 1，不写 0（清空是商店轮 @EVENTSHOP 的职责）', () => {
  const { written } = run_saleitem_check({ 'talent:0:327': 1 });
  assert(written.length > 0);
  assert(
    written.every((w) => w.value === 1),
    '本函数一律写 1——清零在 @EVENTSHOP 的 REPEAT 100（page-shop.js:95-97）',
  );
});

test('SALEITEM_CHECK_TRAP：两个分支共有的 65/79 各写两次（1:1 照搬，不合并）', () => {
  // :96-105 的えっちな陷阱与 :116-120 的魔蟲知識陷阱都含 65/79——两个
  // 守卫同时成立时原作写两次 1。写值幂等，但「两个分支都跑过」只有写序
  // 看得见，故照搬不合并。
  const both = run_saleitem_check({
    'talent:0:327': 1,
    'talent:0:328': 1,
  });
  const duplicated = [
    ...new Set(both.lit.filter((id, i) => both.lit.indexOf(id) !== i)),
  ];
  assert.deepEqual(duplicated, [65, 79]);

  // 只开一边时不重复
  const one = run_saleitem_check({ 'talent:0:327': 1, 'talent:0:328': 0 });
  assert.deepEqual(one.lit, [...new Set(one.lit)]);
});

test('SALEITEM_CHECK_TRAP：陷阱等级判据是严格小于（相等不点亮 55）', () => {
  for (const [flag85, maze_level, expected] of [
    [0, 0, false],
    [0, 1, true],
    [1, 1, false],
    [1, 2, true],
    [5, 5, false],
    [4, 5, true],
  ]) {
    const { lit } = run_saleitem_check({
      'flag:85': flag85,
      'cflag:0:9': maze_level,
    });
    assert.equal(
      lit.includes(55),
      expected,
      `FLAG:85=${flag85} 对 CFLAG:0:9=${maze_level}`,
    );
  }
});

/** 画一遍 @ITEM_SHOP_TRAP。seed 落夹具变量存储（item/itemname 等） */
async function run_item_shop_trap(seed = {}) {
  const fixture = create_era_fixture();
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  const { item_shop_trap } = fixture.load_module('page/page-shop-trap');
  await item_shop_trap();
  return fixture;
}

/** 取两个标签行之间的文本行（两段网格的取证面） */
function rows_between(fixture, start_label, end_label) {
  const lines = fixture.text_lines();
  const start = lines.indexOf(start_label);
  const end = lines.indexOf(end_label);
  assert(
    start >= 0 && end > start,
    `输出里应有「${start_label}」到「${end_label}」的一段`,
  );
  return lines.slice(start + 1, end);
}

/** 「名字(xN)」补到 16 显示宽度、外面套方括号的一格（原作 %…,16,LEFT%） */
function cell(name, count) {
  const text = `${name}(x${count})`;
  const width = [...text].reduce(
    (sum, ch) => sum + (ch.charCodeAt(0) > 0xff ? 2 : 1),
    0,
  );
  return `[${text}${' '.repeat(Math.max(0, 16 - width))}]`;
}

test('ITEM_SHOP_TRAP：头行与提示行 1:1，分隔线三处', async () => {
  const fixture = await run_item_shop_trap({
    'flag:10000': 6, // DAY:0
    'flag:10002': 7, // DAY:2
    'flag:10003': 0, // TIME = 0（午前）
    'flag:10004': 1234, // MONEY
    'flag:85': 3, // FLAG:85
  });
  assert.deepEqual(fixture.text_lines(), [
    '《可以购买在地下城里布置的陷阱》',
    '7日 午前',
    '[所持金:1234点]',
    '[陷阱Lv:3]',
    '[陷阱]',
    '[戒指]',
    '《请输入要购买陷阱的编号》',
    '[997] - 普通物品\u3000',
    '[999] - 返回',
    '',
  ]);

  // :10 CUSTOMDRAWLINE = → isSolid 近似；:12/:55/:67 三处
  const dividers = fixture.lines.filter((line) => line.type === 'divider');
  assert.equal(dividers.length, 3);
  assert(dividers.every((line) => line.border === 'solid'));

  // :68-69 PRINTLC（居中 + 换行）→ setAlign 包一次、随后还原 'left'
  assert.deepEqual(
    fixture.calls
      .filter((call) => call.api === 'setAlign')
      .map((call) => call.args[0]),
    ['center', 'left'],
    '两行提示必须夹在居中排版里（否则排版退化为左对齐）',
  );

  // :23-26/:39-41 SETCOLORBYNAME LightSalmon → RESETCOLOR：三行标签着色
  for (const text of ['[陷阱Lv:3]', '[陷阱]', '[戒指]']) {
    const line = fixture.lines.find(
      (l) => l.type === 'text' && l.text === text,
    );
    assert.deepEqual(
      line.content,
      [{ content: text, color: 'LightSalmon' }],
      `${text} 应着 LightSalmon`,
    );
  }
});

test('ITEM_SHOP_TRAP：日期行两态（TIME 0 午前 / 1 午后）与日号 = DAY:0 + 1', async () => {
  for (const [time, half] of [
    [0, '午前'],
    [1, '午后'],
  ]) {
    for (const [day_count, printed] of [
      [0, 1],
      [9, 10],
      [364, 365],
    ]) {
      const fixture = await run_item_shop_trap({
        'flag:10000': day_count,
        'flag:10003': time,
      });
      assert(
        fixture.text_lines().includes(`${printed}日 ${half}`),
        `DAY:0=${day_count} TIME=${time} 应为「${printed}日 ${half}」`,
      );
    }
  }
});

test('ITEM_SHOP_TRAP：陷阱网格 60-91、戒指网格 300-320，5 格一行', async () => {
  const fixture = await run_item_shop_trap({
    'item:59': 1, // 段外（陷阱段从 60 起）
    'item:60': 3,
    'item:61': 1,
    'item:62': 1,
    'item:63': 2,
    'item:69': 5, // 第 5 格 → 满行
    'item:72': 7, // 第 6 格 → 第二行
    'item:92': 1, // 段外（陷阱段到 91 止）
    'item:299': 1, // 段外（戒指段从 300 起）
    'item:300': 2,
    'item:320': 4,
    'item:321': 1, // 段外（戒指段到 320 止）
    'itemname:60': '落穴',
    'itemname:61': '射箭陷阱',
    'itemname:62': '传送陷阱',
    'itemname:63': '单向通行陷阱',
    'itemname:69': 'a',
    'itemname:72': 'b',
    'itemname:300': '装饰戒指',
    'itemname:320': '不幸戒指',
  });

  // 手写一格钉填充公式本身（首格不依赖用例里的 cell 助手）：
  // 落穴(2 全角 → 4) + (x3)(4 半角) = 8 显示宽 → 补 8 个半角空格到 16
  const trap_rows = rows_between(fixture, '[陷阱]', '[戒指]');
  assert.deepEqual(trap_rows, [
    [
      '[落穴(x3)        ]',
      cell('射箭陷阱', 1),
      cell('传送陷阱', 1),
      cell('单向通行陷阱', 2),
      cell('a', 5),
    ].join(''),
    cell('b', 7),
  ]);
  // 段外的 59/92 不出现（出场的是 60/61/62/63/69/72 六个持有）
  assert(trap_rows.join('').split('[').length - 1 === 6, '陷阱段只应有 6 格');

  // 戒指段（id 299/321 在段外，只有 300 与 320 两格）
  assert.deepEqual(
    rows_between(fixture, '[戒指]', '《请输入要购买陷阱的编号》'),
    [cell('装饰戒指', 2) + cell('不幸戒指', 4)],
  );
});

test('ITEM_SHOP_TRAP：网格段两端都算数（陷阱 60/91、戒指 300/320 在内，59/92/299/321 在外）', async () => {
  // 段界只在两端可见：#396 自钉变异实测「上界 92 → 91」在旧用例里零反应
  // （那时只造了 60-72 的持有）——两端各钉一枚。
  const fixture = await run_item_shop_trap({
    'item:59': 1,
    'item:60': 1,
    'item:91': 1,
    'item:92': 1,
    'item:299': 1,
    'item:300': 1,
    'item:320': 1,
    'item:321': 1,
    'itemname:59': '段外甲',
    'itemname:60': '段内甲',
    'itemname:91': '段内乙',
    'itemname:92': '段外乙',
    'itemname:299': '段外丙',
    'itemname:300': '段内丙',
    'itemname:320': '段内丁',
    'itemname:321': '段外丁',
  });
  assert.deepEqual(rows_between(fixture, '[陷阱]', '[戒指]'), [
    cell('段内甲', 1) + cell('段内乙', 1),
  ]);
  assert.deepEqual(
    rows_between(fixture, '[戒指]', '《请输入要购买陷阱的编号》'),
    [cell('段内丙', 1) + cell('段内丁', 1)],
  );
});

test('ITEM_SHOP_TRAP：网格三种形态——空段不打行、恰好满行、余数收尾', async () => {
  // 空段：一个持有都没有 → 两段都不出格行（0 格不补换行）
  const empty = await run_item_shop_trap();
  assert.deepEqual(rows_between(empty, '[陷阱]', '[戒指]'), []);
  assert.deepEqual(
    rows_between(empty, '[戒指]', '《请输入要购买陷阱的编号》'),
    [],
  );

  // 恰好 5 格：一行，行尾就是第 5 格（不再多补一个空行）
  const exact = await run_item_shop_trap({
    'item:60': 1,
    'item:61': 1,
    'item:62': 1,
    'item:63': 1,
    'item:64': 1,
  });
  const exact_rows = rows_between(exact, '[陷阱]', '[戒指]');
  assert.equal(exact_rows.length, 1);

  // 6 格：第二行收尾（余数 1）
  const over = await run_item_shop_trap({
    'item:60': 1,
    'item:61': 1,
    'item:62': 1,
    'item:63': 1,
    'item:64': 1,
    'item:65': 1,
  });
  const over_rows = rows_between(over, '[陷阱]', '[戒指]');
  assert.equal(over_rows.length, 2);

  // 持有数 0 或负都不占格（判据是 `== 0` 的 CONTINUE + 负值同样非零？
  // 原作只在 `== 0` 时跳过，负值照打——1:1）
  const negative = await run_item_shop_trap({
    'item:60': -2,
    'itemname:60': '落穴',
  });
  assert.deepEqual(rows_between(negative, '[陷阱]', '[戒指]'), [
    cell('落穴', -2),
  ]);
});

test('ITEM_SHOP_TRAP：绘制顺带点亮在售位，且据点期不写 tflag', async () => {
  const fixture = create_era_fixture();
  const { item_shop_trap } = fixture.load_module('page/page-shop-trap');
  // 非调教期：tflag 表不存在，写二段会抛 key error（夹具镜像引擎守卫）
  await assert.doesNotReject(() => item_shop_trap());
  assert(
    fixture.var_writes.some((w) => w.name === 'itemsales:60'),
    ':57 CALL SALEITEM_CHECK_TRAP 应点亮在售位',
  );
  assert(
    !fixture.var_writes.some((w) => w.name.startsWith('tflag:')),
    ':59 的 TFLAG:15 据点期无表可落（登记待 #399）',
  );
});

/** 全量行史的文本行（含被重绘清掉的；「发生过什么」的取证面，同 page-shop） */
function history_texts(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/** 跑商店轮直到预置输入耗尽 */
async function run_shop_with_bought(bought, ...inputs) {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.bought = bought;
  fixture.set_inputs(...inputs);
  const { run_shop } = fixture.load_module('page/page-shop');
  await assert.rejects(
    () => run_shop({ skip_eventshop: true }),
    /预置输入已耗尽/,
  );
  return fixture;
}

// show_shop 的 BOUGHT 跳转（原作 :27/:29，本票的 SHOW_SHOP:29 调用点）由
// test/page-shop.test.js 的 show_shop 用例覆盖（那里是商店轮自身的行为靶）；
// 本文件覆盖陷阱商店本体与 usershop 侧的 USERSHOP:50 调用点。

test('USERSHOP 999：购物态下清购物标志并落到调试菜单（原作无 RETURN，:44-46 → :222）', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { usershop } = fixture.load_module('page/page-shop');
  era_flag.bought = 54;
  await usershop(999);
  assert.equal(era_flag.bought, -1, '999 退出商店');
  assert(
    history_texts(fixture).some((line) => line.includes('@DEBUG_MENU_U')),
    '原作 :44-46 的 999 分支没有 RETURN，落到 :222 的 DEBUG_MENU_U',
  );

  // 非购物态：999 走原路径（不改 BOUGHT，仍是调试菜单）
  const outside = create_era_fixture();
  const outside_flag = outside.load_module('era-utils/era-flag');
  const outside_shop = outside.load_module('page/page-shop');
  outside_flag.bought = -1;
  await outside_shop.usershop(999);
  assert.equal(outside_flag.bought, -1);
  assert(history_texts(outside).some((line) => line.includes('@DEBUG_MENU_U')));
});

test('USERSHOP 999 后回主菜单：下一轮 @SHOW_SHOP 重画主菜单（回合能继续）', async () => {
  const fixture = await run_shop_with_bought(54, 999, 500);
  const era_flag = fixture.load_module('era-utils/era-flag');
  assert.equal(era_flag.bought, -1);
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'button' && line.accelerator === 496,
    ),
    '退出商店后主菜单必须重画（否则玩家被困在商店里）',
  );
});

test('USERSHOP 998：切陷阱商店并立即重画（原作 :47-50 的 JUMP）', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { usershop } = fixture.load_module('page/page-shop');
  era_flag.bought = 1; // 道具商店态（BOUGHT < 54）
  await usershop(998);
  assert.equal(era_flag.bought, 200, ':48 BOUGHT = 200');
  assert(
    history_texts(fixture).includes('《可以购买在地下城里布置的陷阱》'),
    ':50 JUMP ITEM_SHOP_TRAP 立即重画陷阱商店',
  );
});

test('USERSHOP 997：切回道具商店（原作 :51-54 的 JUMP，本体随 #399）', async () => {
  const fixture = create_era_fixture();
  const era_flag = fixture.load_module('era-utils/era-flag');
  const { usershop } = fixture.load_module('page/page-shop');
  era_flag.bought = 200; // 陷阱商店态
  await usershop(997);
  assert.equal(era_flag.bought, 1, ':52 BOUGHT = 1');
  assert.deepEqual(
    fixture.text_lines(),
    [],
    '切店不当场输出（下一轮 show_shop 画）',
  );
});

test('USERSHOP：购物态下的其它输入一律 RETURN 0，不落到主菜单分发', async () => {
  // 原作 :55-57 `ELSEIF BOUGHT >= 0 → RETURN 0`：101（能力显示）在购物态
  // 不生效——若漏掉这一支，101 会画角色信息并 BEGIN TURNEND
  for (const result of [100, 101, 106, 109, 199, 200, 300, 500]) {
    const fixture = create_era_fixture();
    const era_flag = fixture.load_module('era-utils/era-flag');
    const { usershop } = fixture.load_module('page/page-shop');
    era_flag.bought = 54;
    await usershop(result);
    assert.deepEqual(
      history_texts(fixture),
      [],
      `购物态下 ${result} 不应有输出（原作 :56 RETURN 0）`,
    );
    assert.equal(era_flag.bought, 54, `购物态下 ${result} 不改 BOUGHT`);
  }
});
