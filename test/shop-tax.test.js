/**
 * 税金结算测试（issue #396 / N12 段 3）：@TAX_GET（target/ERB/SHOP/TAX.ERB）。
 *
 * 接缝 = ere/system/stronghold/tax.js 导出的 tax_get；经唯一夹具观察玩家
 * 输出行、等待、资金与 EX_FLAG，不断言模块内部辅助函数。总税额从末行
 * 「合计税收 {n}」与所持金/非作弊资金的增量两路核对——输出与数值必须一致。
 *
 * 维度型判据（派单覆盖标准）一律表驱动走完整维度，不挑点：
 *   - 税収日的三个字面量 10/20/30：跑遍 1..31 整月，非税日一个输出都没有；
 *   - 威望五档（EX_FLAG:99）：含每档边界（20/21、40/41、60/61、80/81、
 *     100/101）与范围外（-1、101）整表走完；
 *   - 地下城税六档（CFLAG:0:9）：边界 19/20、39/40、79/80、149/150、
 *     299/300 整表走完；
 *   - 领土税五块：每块三种状态（已征服 / 殖民地 / 都没有）整表走完。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 原作 :15 的税収日（DAY:2 == 10 || 20 || 30） */
const TAX_DAYS = [10, 20, 30];

/**
 * 跑一遍 @TAX_GET。seed 直接落夹具的变量存储（键名与 ere 的寻址串一致）；
 * DAY:2 默认取税日 10 号。
 */
async function run_tax(seed = {}) {
  const fixture = create_era_fixture();
  fixture.store.set('flag:10002', 10); // DAY:2 = 日
  for (const [name, value] of Object.entries(seed)) {
    fixture.store.set(name, value);
  }
  const { tax_get } = fixture.load_module('system/stronghold/tax');
  await tax_get();
  return fixture;
}

/** 「来自魔界的支援 {n}」——威望档位的贡献（TAX:0 在该点的值） */
function support_line(fixture) {
  const line = fixture
    .text_lines()
    .find((text) => text.startsWith('来自魔界的支援 '));
  assert(line !== undefined, '输出里应有「来自魔界的支援」一行');
  return Number(line.slice('来自魔界的支援 '.length));
}

/** 取所有以 prefix 开头的文本行的尾数（同前缀多行时按出现序） */
function values_after(fixture, prefix) {
  const lines = fixture.text_lines().filter((text) => text.startsWith(prefix));
  assert(lines.length > 0, `输出里应有「${prefix}」行`);
  return lines.map((text) => Number(text.slice(prefix.length)));
}

/** 取唯一以 prefix 开头的文本行的尾数 */
function value_after(fixture, prefix) {
  return values_after(fixture, prefix)[0];
}

test('税収日：整个 1..31 只有 10/20/30 三天产出，其余日子一行不打、一分不入', async () => {
  for (let day = 1; day <= 31; day += 1) {
    const fixture = await run_tax({ 'flag:10002': day });
    if (TAX_DAYS.includes(day)) {
      assert(fixture.text_lines().length > 0, `${day} 日是税収日，应当有输出`);
      continue;
    }
    // :15-19 非税日 → 在任何输出之前 RETURN 0
    assert.deepEqual(fixture.text_lines(), [], `${day} 日不应有任何输出`);
    assert.equal(fixture.waits.length, 0, `${day} 日不应有任何等待`);
    assert(
      !fixture.var_writes.some((w) => w.name === 'flag:10004'),
      `${day} 日不应拿到钱`,
    );
    assert(
      !fixture.var_writes.some((w) => w.name === 'exflag:4444'),
      `${day} 日不应记非作弊资金`,
    );
  }
});

test('税収日：开场文案与「收税」分隔块 1:1', async () => {
  const fixture = await run_tax();
  const lines = fixture.text_lines();
  assert.deepEqual(lines.slice(0, 4), [
    '今天宜收税，宜鬼畜，宜调教，宜激烈做爱；忌纯爱，忌良心发现……',
    '',
    '- - - 收税 - - -',
    '',
  ]);
  // :16 PRINTW 与 :29 裸 WAIT 各等一次键
  assert.equal(fixture.waits[0].waited, true);
  assert.equal(fixture.waits[1].waited, true);
});

test('威望五档：EX_FLAG:99 整表（含五处边界与范围外）驱动「魔界支援」档位', async () => {
  // [威望值, 期望支援额, 文案]——原作 :41-68 的五支 IF/ELSEIF：
  //   <=20 && >=0 → 0（仅文案） / <=40 && >20 → ×30 封顶 5000 /
  //   <=60 && >40 → ×50 封顶 10000 / <=80 && >60 → ×50 封顶 30000 /
  //   <=100 && >80 → ×100 封顶 50000；范围外（<0 或 >100）一支都不命中。
  // DAY:0 = 100 时支援额 = trunc(100 × 单价 × 威望 / 100) = 单价 × 威望，
  // 四档都远在各自封顶之内（最大 100×100 = 10000 < 50000），故边界两侧
  // 的差值是判据本身。
  const cases = [
    [0, 0, '威望值是【岌岌可危】'],
    [20, 0, '威望值是【岌岌可危】'],
    [21, 630, '威望值是【动荡不安】'], // 30 × 21
    [40, 1200, '威望值是【动荡不安】'], // 30 × 40
    [41, 2050, '威望值是【略受质疑】'], // 50 × 41
    [60, 3000, '威望值是【略受质疑】'], // 50 × 60
    [61, 3050, '威望值是【相安无事】'], // 50 × 61
    [80, 4000, '威望值是【相安无事】'], // 50 × 80
    [81, 8100, '威望值是【广受爱戴】'], // 100 × 81
    [100, 10000, '威望值是【广受爱戴】'], // 100 × 100
  ];
  for (const [prestige, expected, label] of cases) {
    const fixture = await run_tax({
      'flag:10000': 100,
      'exflag:99': prestige,
    });
    assert.equal(support_line(fixture), expected, `威望 ${prestige} 的支援额`);
    assert(
      fixture.text_lines().includes(label),
      `威望 ${prestige} 应打「${label}」`,
    );
  }

  // 范围外：一支都不命中 —— 没有文案、支援额为 0
  for (const prestige of [-1, 101, 9999]) {
    const fixture = await run_tax({
      'flag:10000': 100,
      'exflag:99': prestige,
    });
    assert.equal(support_line(fixture), 0, `威望 ${prestige} 不该有支援额`);
    assert(
      !fixture.text_lines().some((text) => text.startsWith('威望值是')),
      `威望 ${prestige} 不该打档位文案`,
    );
  }
});

test('威望五档：四档封顶各自生效（超额即压到上限）', async () => {
  // DAY:0 = 1000 时四档的原始值都远超各自封顶（见注释算式）
  const cases = [
    [21, 5000, '威望值是【动荡不安】'], // trunc(1000*30*21/100) = 6300
    [41, 10000, '威望值是【略受质疑】'], // trunc(1000*50*41/100) = 20500
    [61, 30000, '威望值是【相安无事】'], // trunc(1000*50*61/100) = 30500
    [81, 50000, '威望值是【广受爱戴】'], // trunc(1000*100*81/100) = 81000
  ];
  for (const [prestige, capped, label] of cases) {
    const fixture = await run_tax({
      'flag:10000': 1000,
      'exflag:99': prestige,
    });
    assert.equal(support_line(fixture), capped, `${label} 的封顶`);
  }
});

test('威望五档：封顶以内按整数除法截断（单价 × 天数 × 威望 / 100）', async () => {
  // :46 trunc(7*30*21/100) = trunc(44.1) = 44（不是四舍五入的 45）
  const fixture = await run_tax({
    'flag:10000': 7,
    'exflag:99': 21,
  });
  assert.equal(support_line(fixture), 44);
});

test('土地税：五块领土 × 三态（已征服 / 殖民地 / 都没有）整表驱动', async () => {
  // 每块领土两行判据（原作 :86-121）：已征服走定值 1200，否则看侵攻度
  // 是否 > 10（殖民地数 = 侵攻度 / 10 整数除法）；两块都不成立则这一块
  // 一行都不打。第五块（圣灵骑士）只有已征服一支。
  // [殖民/征服标志名, 殖民度名, 已征服文案, 殖民地前缀, 已征服值]
  const blocks = [
    ['flag:82', 'flag:81', '├ 地上的魔界领土 1200', '├ 人间界殖民地 ', 1200],
    [
      'flag:87',
      'flag:86',
      '├ 黑暗精灵的领土 1200',
      '├ 精灵族领域殖民地 ',
      1200,
    ],
    ['flag:89', 'flag:88', '├ 混沌龙之山 1200', '├ 龙之山脉殖民地 ', 1200],
    ['flag:91', 'flag:90', '├ 堕天使的淫界 1200', '├ 天界的殖民地 ', 1200],
  ];
  // 合计行含地下城的一段（CFLAG:0:9 为 0 时恒 0*50+100 = 100），
  // 故本表的期望值都带这个基数——领土段的贡献由「合计 − 地下城」隔离。
  const DUNGEON_BASE = 100;
  for (const [
    conquered,
    invasion,
    conquered_line,
    colony_prefix,
    amount,
  ] of blocks) {
    // 状态一：已征服 → 定值行，殖民度再高也不读
    const held = await run_tax({
      [conquered]: 2,
      [invasion]: 990,
    });
    assert(
      held.text_lines().includes(conquered_line),
      `已征服应打「${conquered_line}」`,
    );
    assert.equal(
      value_after(held, '合计 '),
      amount + DUNGEON_BASE,
      '已征服的贡献',
    );
    assert(
      !held.text_lines().some((text) => text.startsWith(colony_prefix)),
      '已征服时不再看殖民度',
    );

    // 状态二：未征服 + 殖民度 > 10 → 殖民度 / 10（整数除法）
    const colony = await run_tax({ [invasion]: 97 });
    assert.equal(value_after(colony, colony_prefix), 9, '97 / 10 = 9');
    assert.equal(value_after(colony, '合计 '), 9 + DUNGEON_BASE);

    // 状态三：未征服 + 殖民度 == 10（判据是 > 10，10 不算）→ 一块都不打
    const none = await run_tax({ [invasion]: 10 });
    assert(
      !none.text_lines().includes(conquered_line),
      '殖民度 10 不满足 > 10',
    );
    assert(
      !none.text_lines().some((text) => text.startsWith(colony_prefix)),
      '殖民度 10 不打殖民地行',
    );
  }

  // 第一块的征服判据是 `IF FLAG:82`（非零即可），不是 `== 2`——1 也算
  const truthy = await run_tax({ 'flag:82': 1 });
  assert(truthy.text_lines().includes('├ 地上的魔界领土 1200'));

  // 第二至四块的判据是 `== 2`，1 不算
  for (const [conquered, invasion, conquered_line] of blocks.slice(1)) {
    const one = await run_tax({ [conquered]: 1, [invasion]: 0 });
    assert(
      !one.text_lines().includes(conquered_line),
      `${conquered} == 1 不是已征服`,
    );
  }

  // 第五块：FLAG:92 == 15 才打 1500（14 不算）
  const fortress = await run_tax({ 'flag:92': 15 });
  assert(fortress.text_lines().includes('├ 圣灵骑士的卖春堡垒 1500'));
  assert.equal(value_after(fortress, '合计 '), 1500 + 100);
  const fortress_off = await run_tax({ 'flag:92': 14 });
  assert(
    !fortress_off
      .text_lines()
      .some((text) => text.startsWith('├ 圣灵骑士的卖春堡垒')),
  );
});

test('土地税：地下城六档按 CFLAG:0:9（迷宫 Lv）逐档表驱动', async () => {
  // 原作 :127-145：<20 → Lv*50+100 / <40 → Lv*40+300 / <80 → Lv*30+700 /
  // <150 → Lv*20+1500 / <300 → Lv*10+3000 / ELSE → Lv*5+4500
  const cases = [
    [0, 100], // 0*50+100
    [19, 1050], // 19*50+100（第一档上边界）
    [20, 1100], // 20*40+300（第二档下边界）
    [39, 1860],
    [40, 1900], // 第三档下边界
    [79, 3070],
    [80, 3100], // 第四档下边界
    [149, 4480],
    [150, 4500], // 第五档下边界
    [299, 5990],
    [300, 6000], // ELSE 档下边界
    [1000, 9500], // 1000*5+4500
  ];
  for (const [level, expected] of cases) {
    const fixture = await run_tax({ 'cflag:0:9': level });
    assert.equal(
      value_after(fixture, '└ 地下城 '),
      expected,
      `迷宫 Lv ${level}`,
    );
    assert.equal(
      value_after(fixture, '合计 '),
      expected,
      `迷宫 Lv ${level} 合计`,
    );
  }

  // 负等级落第一档（原作 `IF CFLAG:0:9 < 20` 没有下界）——-5*50+100 = -150
  const negative = await run_tax({ 'cflag:0:9': -5 });
  assert.equal(value_after(negative, '└ 地下城 '), -150);
});

test('肉便器税：两处门槛（> 0 才收）与卖春税的三件道具字面量', async () => {
  // 原作 :163-196。TAX:2 的合计是第二条「合计 」行（第一条是土地税）。
  const tax2 = (fixture) => values_after(fixture, '合计 ')[1];

  // 两项都不满足时：只有「淫魔卖春税」一行（无门槛），值 = 0+0+0+20
  const bare = await run_tax();
  assert.deepEqual(
    bare
      .text_lines()
      .filter((text) => text.startsWith('├ ') || text.startsWith('└ 淫魔')),
    ['└ 淫魔卖春税 20'],
  );
  assert.equal(tax2(bare), 20);

  // 展品观赏税：FLAG:84 > 0 才收，每件 10；0 与负数都不收
  const exhibit = await run_tax({ 'flag:84': 3 });
  assert(exhibit.text_lines().includes('├ 展品观赏税 30'));
  assert.equal(tax2(exhibit), 50);
  for (const zero of [0, -1]) {
    const off = await run_tax({ 'flag:84': zero });
    assert(
      !off.text_lines().some((text) => text.startsWith('├ 展品观赏税')),
      `FLAG:84 = ${zero} 不该收展品观赏税`,
    );
    assert.equal(tax2(off), 20);
  }

  // 肉便器使用税：FLAG:83 > 0 才收，每件 10
  const toilet = await run_tax({ 'flag:83': 12 });
  assert(toilet.text_lines().includes('├ 肉便器使用税 120'));
  assert.equal(tax2(toilet), 140);
  const toilet_off = await run_tax({ 'flag:83': 0 });
  assert(
    !toilet_off.text_lines().some((text) => text.startsWith('├ 肉便器使用税')),
  );

  // 淫魔卖春税（:184）：ITEM:143/152/182 各 ×2，另加 20 的固定项
  const whores = await run_tax({
    'item:143': 1, // 女巫
    'item:152': 2, // 魅魔
    'item:182': 3, // 莉莉丝
  });
  assert.equal(value_after(whores, '└ 淫魔卖春税 '), 2 + 4 + 6 + 20);
  assert.equal(tax2(whores), 32);

  // 两处门槛与卖春税同时成立，且三项按原作顺序累加
  const all = await run_tax({
    'flag:84': 3,
    'flag:83': 2,
    'item:143': 1,
    'item:152': 1,
    'item:182': 1,
  });
  assert.deepEqual(
    all
      .text_lines()
      .filter((text) => text.startsWith('├ ') || text.startsWith('└ 淫魔')),
    ['├ 展品观赏税 30', '├ 肉便器使用税 20', '└ 淫魔卖春税 26'],
  );
  assert.equal(tax2(all), 76);
});

test('肉便器税：FLAG:350-358 等于 507 的娼馆各乘 1.1（截断，逐个复合）', async () => {
  // 原作 :187-191 `FOR LOCAL,1,10` + `SIF FLAG:(LOCAL + 349) == 507` +
  // `TIMES TAX:2, 1.1`——下标 350..358 共九个，命中几次就乘几次 1.1。
  const tax2 = (fixture) => values_after(fixture, '合计 ')[1];
  const base = 76; // FLAG:84=3（30）+ FLAG:83=2（20）+ 卖春税 26
  // 基态：两处门槛与卖春税都成立（同上一个用例的 all）
  const seed = {
    'flag:84': 3,
    'flag:83': 2,
    'item:143': 1,
    'item:152': 1,
    'item:182': 1,
  };

  // 一个都不命中：76
  assert.equal(tax2(await run_tax({ ...seed, 'flag:350': 506 })), base);

  // 命中一个：trunc(76 × 1.1) = 83（不是四舍五入的 84）
  assert.equal(tax2(await run_tax({ ...seed, 'flag:350': 507 })), 83);

  // 命中两个（首尾各一）：trunc(83 × 1.1) = 91
  assert.equal(
    tax2(await run_tax({ ...seed, 'flag:350': 507, 'flag:358': 507 })),
    91,
  );

  // 命中三个：trunc(91 × 1.1) = 100
  assert.equal(
    tax2(
      await run_tax({
        ...seed,
        'flag:350': 507,
        'flag:354': 507,
        'flag:358': 507,
      }),
    ),
    100,
  );

  // 范围外的 FLAG:349 / FLAG:359 不参与（判据是 350..358 九个下标）
  assert.equal(
    tax2(await run_tax({ ...seed, 'flag:349': 507, 'flag:359': 507 })),
    base,
  );
});

test('魔王特别税：按 FLAG:9 加成（+= 不是 ×），收完清零', async () => {
  // 原作 :199-213。基数（FLAG:9 = 0 时）= 地下城 100 + 淫魔卖春税 20 = 120；
  // 合计 {TAX:3} 是第三条「合计 」行。
  const tax3 = (fixture) => values_after(fixture, '合计 ')[2];
  const cases = [
    [0, 0], // 不收
    [5, 6], // trunc(120 × 105/100) − 120 = 126 − 120
    [100, 120], // trunc(120 × 200/100) − 120 = 240 − 120
    [-50, -60], // trunc(120 × 50/100) − 120 = 60 − 120（负修正照收）
  ];
  for (const [surcharge, expected] of cases) {
    const fixture = await run_tax({ 'flag:9': surcharge });
    assert.equal(tax3(fixture), expected, `FLAG:9 = ${surcharge}`);
    // :213 FLAG:9 = 0——税率是消费点，收完归零
    assert.equal(fixture.store.get('flag:9'), 0, 'FLAG:9 应清零');
  }

  // :205-207 的顺序：先乘 (FLAG:9 + 100) 再整除 100，最后减回原额。
  // 舍入看得到：基数 120、FLAG:9 = 1 → trunc(121.2) = 121 → 修正 +1
  const rounded = await run_tax({ 'flag:9': 1 });
  assert.equal(tax3(rounded), 1);
});

test('黑方片加成：EX_FLAG:2811 ∈ [51, 100) 时收入乘 (10 + 2811/10)/10', async () => {
  // 原作 :215-226。基数取 FLAG:9 = 5 时的 126（含特别税），
  // 便于观察截断：2811 = 60 → trunc(126 × 16/10) = trunc(201.6) = 201。
  const base = { 'flag:9': 5 };
  const final_total = (fixture) => value_after(fixture, '合计税收 ');

  const cases = [
    [51, 5, 189], // L = 5 → trunc(126 × 15/10) = 189
    [55, 5, 189], // 55/10 = 5（整数除法）
    [59, 5, 189],
    [60, 6, 201], // L = 6 → trunc(201.6) = 201
    [99, 9, 239], // L = 9 → trunc(126 × 19/10) = trunc(239.4) = 239
  ];
  for (const [route, level, expected] of cases) {
    const fixture = await run_tax({ ...base, 'exflag:2811': route });
    assert.equal(
      value_after(fixture, '黑方片的商业运营有方，收入乘以1.'),
      level,
      `EX_FLAG:2811 = ${route} 的倍数小数位`,
    );
    assert.equal(final_total(fixture), expected, `EX_FLAG:2811 = ${route}`);
  }

  // 区间外（50 与 100）不加成、也不打那一行
  for (const route of [0, 50, 100, 1000]) {
    const fixture = await run_tax({ ...base, 'exflag:2811': route });
    assert.equal(final_total(fixture), 126, `EX_FLAG:2811 = ${route} 不加成`);
    assert(
      !fixture
        .text_lines()
        .some((text) => text.startsWith('黑方片的商业运营有方')),
      `EX_FLAG:2811 = ${route} 不打加成行`,
    );
  }
});

test('入账：MONEY 与 EX_FLAG:4444 各加一次总税额，末行与增量一致', async () => {
  const fixture = await run_tax({
    'flag:10004': 1000, // MONEY 初值
    'exflag:4444': 77, // EX_FLAG:4444 初值
    'flag:9': 5,
    'exflag:2811': 60,
  });
  // 末行「合计税收」= 玩家看到的总额；两处入账都用它，且非作弊资金是
  // 纯增量（EX_FLAG:4444 只累加税额，不镜像现有存款）
  assert.equal(value_after(fixture, '合计税收 '), 201);
  assert.equal(fixture.store.get('flag:10004'), 1000 + 201);
  assert.equal(fixture.store.get('exflag:4444'), 77 + 201);

  // 默认世界（FLAG:9 = 0、2811 = 0）：总税额 = 100 + 20 = 120
  const plain = await run_tax({ 'flag:10004': 500 });
  assert.equal(value_after(plain, '合计税收 '), 120);
  assert.equal(plain.store.get('flag:10004'), 620);
  assert.equal(plain.store.get('exflag:4444'), 120);
});
