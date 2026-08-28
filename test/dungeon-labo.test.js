/**
 * 2D 地下城模式（LABO 三文件，issue #181 H12）的行为测试。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点，issue #16）。
 *
 * 覆盖（对应工单验收清单）：
 *   1. 三个数学函数（GEO_CALC_INTERP / LINEAR_INTERP_COS_X / _Y）**按数值
 *      逐点比对**——期望值按 ERB 算式（Emuera 整数运算：乘法链先乘后整除、
 *      除法向零截断）手算写死，含一个负差截断点（floor 与 trunc 在 -10.2
 *      上分叉，钉住「不是 Math.floor」）；
 *   2. GEO_TEST / DA_CLEAR / SET_VIL 的结构行为（恒定随机源）；
 *   3. MON_CHECK / UNIT_CHECK / VIL_CHECK / MON_LIMIT / CHIP_DRAW /
 *      GEO_OUTPUT_2 的格子语义；
 *   4. UNIT_MOVE 的移动方向、中心触发（JUMP ENDING_2 的尾跳转语义）、
 *      相遇分支与侵攻度钳制；
 *   5. DUNGEON_MAP 主流程（迎击恢复 / 撤退决议 / 侵攻度写回）；
 *   6. CONFIG_LABO_MAP_SETTING / STATUS / LABO_MAP_SET；
 *   7. LABO 菜单循环与 FIRST_SETTING 的地下城模式一问（按钮白名单内）。
 *
 * 随机源全部为**不挑分支的恒定形态**（#195 教训）：`(n) => n - 1` 总取
 * 区间上界（移动恒 +1、RAND:5/RAND:4 恒非零——dungeon_bitch / equip_select
 * 不触发）、`() => 128` 一类定值钉地形。DA/DB/DC 自 #181 返工起走引擎表
 * （一维折叠 da:/db:/dc: 二段寻址，yml 三张空表建桶——labo.js 文件头），
 * 夹具侧落在 store：每个用例的新夹具各有一份干净变量层，无需跨用例清场
 * （模块内存时代的 reset_grids 已随承载改动删除）。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 恒定随机源：总取 [0, n) 的上界 n-1（移动 +1、概率分支恒「非零」侧） */
const rand_max = (n) => n - 1;

/** 建夹具并装载 LABO 三模块（da/db/dc 随 labo.js 一并就位） */
function setup_labo() {
  const fixture = create_era_fixture();
  const labo = fixture.load_module('dungeon/labo');
  const labo_map = fixture.load_module('dungeon/labo-map');
  const labo_dungeon_map = fixture.load_module('dungeon/labo-dungeon-map');
  return { fixture, labo, labo_map, labo_dungeon_map };
}

/** 入场一个勇者单位：cflag:1 状态 + 坐标 510/511 */
function seed_unit(fixture, id, name, place, x, y) {
  fixture.seed_chara(id, { id, name, callname: name });
  fixture.era.addCharacter(id);
  fixture.store.set(`cflag:${id}:1`, place);
  fixture.store.set(`cflag:${id}:510`, x);
  fixture.store.set(`cflag:${id}:511`, y);
}

// —— 1. 数学函数逐点比对 ——

test('余弦系数表：CASE 1..7 → 4/15/31/50/69/85/96，其余 0（LABO.ERB :256-292）', () => {
  const { labo } = setup_labo();
  assert.deepEqual(
    [1, 2, 3, 4, 5, 6, 7].map((i) => labo.COS_TABLE[i]),
    [4, 15, 31, 50, 69, 85, 96],
  );
  assert.equal(
    labo.COS_TABLE[0],
    undefined,
    'CASEELSE 0——0 档不进表（kx ?? 0 兜底）',
  );
  assert.equal(labo.COS_TABLE[8], undefined, '偏移 8 不进表（循环只到 +7）');
});

test('LINEAR_INTERP_COS_X 逐点：z0 + trunc((z1-z0)*k/100)（:299-330）', () => {
  const { fixture, labo } = setup_labo();
  const { da_set } = labo;
  // 点 (x0=10, y=5) z=0、(x1=18, y=5) z=200；x=13 偏移 3（k=31）
  da_set(5, 10, 0);
  da_set(5, 18, 200);
  assert.equal(
    labo.linear_interp_cos_x(10, 18, 13, 5),
    62, // 0 + trunc(200*31/100) = trunc(62) = 62
    '正向差：0 + trunc(200*31/100)',
  );
  // 负差截断点：z0=255、z1=0、偏移 1（k=4）——Emuera 向零截断，floor 会
  // 得 244（-10.2 向下取整），trunc 得 245。这一格钉住除法语义
  da_set(5, 10, 255);
  da_set(5, 18, 0);
  assert.equal(
    labo.linear_interp_cos_x(10, 18, 11, 5),
    245, // 255 + trunc((0-255)*4/100) = 255 + trunc(-10.2) = 245
    '负差向零截断（Math.floor 会得 244——差 1 即红）',
  );
  // 偏移 7（k=96）终点逼近
  da_set(5, 10, 0);
  da_set(5, 18, 100);
  assert.equal(
    labo.linear_interp_cos_x(10, 18, 17, 5),
    96, // 0 + trunc(100*96/100) = 96
    '偏移 7 系数 96',
  );
  // 偏移 0 的防御分支（CASEELSE → 0）：不 interpolasi，原样 z0
  da_set(5, 10, 77);
  assert.equal(
    labo.linear_interp_cos_x(10, 18, 10, 5),
    77,
    '偏移 0（k=0）：z0 + trunc(0) = z0（CASEELSE 防御分支）',
  );
  assert.equal(
    fixture.text_lines().length,
    0,
    '纯函数无输出（#FUNCTION 形态）',
  );
});

test('LINEAR_INTERP_COS_Y 逐点：读 da[y0][x] / da[y1][x]（:333-364）', () => {
  const { labo } = setup_labo();
  const { da_set } = labo;
  da_set(8, 3, 64);
  da_set(16, 3, 192);
  assert.equal(
    labo.linear_interp_cos_y(8, 16, 14, 3),
    172, // 64 + trunc((192-64)*85/100) = 64 + trunc(108.8) = 172（偏移 6，k=85）
    'y 向插值读的是同列两行（da[y0][x] 与 da[y1][x]）',
  );
  da_set(8, 3, 0);
  da_set(16, 3, 100);
  assert.equal(
    labo.linear_interp_cos_y(8, 16, 15, 3),
    96, // 0 + trunc(100*96/100) = 96（偏移 7）
    '偏移 7 系数 96',
  );
});

test('GEO_CALC_INTERP 逐点：四角双线性（带余弦系数），写 da[y][x]（:243-296）', () => {
  const { labo } = setup_labo();
  // 对称点：a=d=100、b=c=0、px=py=4（kx=ky=50）
  //   trunc((100-0-0+100)*50*50/10000) = 50
  //   trunc((0-100)*50/100) = -50（×2）
  //   50 - 50 - 50 + 100 = 50
  labo.geo_calc_interp(100, 0, 0, 100, 4, 4, 20, 20);
  assert.equal(labo.da_get(20, 20), 50, '对称四角的中心值（px=py=4）');
  // 负差截断：a=200、b=c=100、d=0、px=py=1（k=4）
  //   trunc(0*16/10000)=0；trunc(-100*4/100)=-4（×2）→ 200-4-4+0 = 192
  labo.geo_calc_interp(200, 100, 100, 0, 1, 1, 30, 30);
  assert.equal(
    labo.da_get(30, 30),
    192,
    '负差项向零截断（floor 会得 191——差 1 即红）',
  );
  // 大系数交叉：a=0、b=c=255、d=0、px=py=7（k=96）
  //   trunc((0-255-255+0)*96*96/10000) = trunc(-470.016) = -470
  //   trunc(255*96/100) = 244（×2）→ -470+244+244+0 = 18
  labo.geo_calc_interp(0, 255, 255, 0, 7, 7, 40, 40);
  assert.equal(labo.da_get(40, 40), 18, '对角双高的偏角值（乘法链先乘后整除）');
});

// —— 2. 地图生成 ——

test('GEO_TEST：恒定随机源下点阵全同值 → 插值全区收敛到该值（结构证据）', () => {
  const { labo } = setup_labo();
  labo.geo_test(() => 128); // RAND:256 恒 128
  for (const [y, x] of [
    [0, 0],
    [0, 13],
    [13, 0],
    [16, 16],
    [31, 31],
    [5, 27],
    [32, 8], // 边界点（点阵角）
    [7, 23], // 内侧插值格
    [19, 3], // 横线补完格
  ]) {
    assert.equal(
      labo.da_get(y, x),
      128,
      `(${x},${y}) 应为 128——横线/纵线/内侧三层补完全部把 128 映到 128`,
    );
  }
  assert.equal(
    labo.da_get(40, 40),
    0,
    '生成区外（>32）保持 0——GEO_TEST 只覆盖点阵 0..32',
  );
});

test('GEO_TEST：点阵顺序按行主序（da[y][x]），第一个点落在 (0,0)', () => {
  const { labo } = setup_labo();
  let calls = 0;
  // 前 25 次调用（点阵 5×5）返回递增值，其余（无——GEO_TEST 无其他随机消费）
  labo.geo_test((n) => {
    calls += 1;
    return n === 256 ? calls : 0;
  });
  assert.equal(
    labo.da_get(0, 0),
    1,
    '第一个 RAND:256 落在 da[0][0]（行主序起点）',
  );
  assert.equal(
    labo.da_get(0, 32),
    5,
    '第一行第 5 个点落在 da[0][32]（x = 4*8）',
  );
  assert.equal(labo.da_get(32, 0), 21, '第 5 行首点落在 da[32][0]（y = 4*8）');
  assert.equal(calls, 25, '恰 25 次随机消费（5×5 点阵，插值不掷随机）');
});

test('DA_CLEAR：50×50 清零，区外不动', () => {
  const { labo } = setup_labo();
  labo.da_set(10, 10, 999);
  labo.da_set(60, 60, 999); // 区外（>49）
  labo.da_clear();
  assert.equal(labo.da_get(10, 10), 0, '区内清零');
  assert.equal(
    labo.da_get(60, 60),
    999,
    '区外（50..99）不属清理范围（原作 FOR 0,50）',
  );
});

test('SET_VIL：4 个村庄落点 + 中心排除（:151-157）', () => {
  const { labo, labo_map } = setup_labo();
  // rand 恒 7：y=7、x=7，4 次全叠 → dc[7][7] = 4
  labo_map.set_vil(() => 7);
  assert.equal(labo.dc_get(7, 7), 4, '4 个村庄叠加在同一格（rand 恒 7）');
  assert.equal(labo.dc_get(16, 16), 0, '中心 (16,16) 排除（魔王城）');
  // rand 恒 16：全被中心排除吃掉 → dc 全 0
  labo_map.set_vil(() => 16);
  let total = 0;
  for (let y = 0; y < 50; y += 1) {
    for (let x = 0; x < 50; x += 1) {
      total += labo.dc_get(y, x);
    }
  }
  assert.equal(
    total,
    0,
    '落点恒 (16,16) 时 4 个村庄全被 CONTINUE（SIF :154-155）',
  );
});

// —— 3. 格子语义 ——

test('MON_CHECK：兵力判据、越界档、清格副作用（:51-77）', () => {
  const { fixture, labo, labo_map } = setup_labo();
  // lv 3 → item 130..134；兵力合计 21 > 20 → 在场
  labo.db_set(5, 5, 3);
  fixture.store.set('item:130', 21);
  assert.equal(labo_map.mon_check(5, 5), 3, '兵力 21 > 20：怪物在场');
  // 兵力 20（不 > 20）：清格返回 0
  labo.db_set(6, 6, 3);
  fixture.store.set('item:130', 20);
  assert.equal(labo_map.mon_check(6, 6), 0, '兵力 20 不满足 > 20');
  assert.equal(labo.db_get(6, 6), 0, '兵力不足的格子被扫掉（:75）');
  assert.equal(labo.db_get(5, 5), 3, '在场格不受别格扫描影响');
  // 越界：lv 0 / 10 / 负
  labo.db_set(7, 7, 10);
  labo.db_set(8, 8, -1);
  assert.equal(labo_map.mon_check(7, 7), 0, 'lv >= 10 不算怪物');
  assert.equal(labo.db_get(7, 7), 10, '越界档不清格（早退在清格之前）');
  assert.equal(labo_map.mon_check(8, 8), 0, 'lv <= 0 不算怪物');
});

test('UNIT_CHECK：状态与坐标筛（:26-47）', () => {
  const { fixture, labo_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 3, 4); // 侵攻中，(3,4)
  seed_unit(fixture, 2, '乙', 5, 3, 4); // 状态 5——筛掉
  seed_unit(fixture, 3, '丙', 3, -1, -1); // 负坐标——筛掉
  seed_unit(fixture, 4, '丁', 2, 9, 9); // 坐标不符
  assert.equal(labo_map.unit_check(3, 4), 1, '命中状态 2 且坐标相符的甲');
  assert.equal(labo_map.unit_check(9, 9), 4, '命中丁');
  assert.equal(labo_map.unit_check(5, 5), -1, '无人在场返回 -1');
});

test('VIL_CHECK：dc[y][x] 的正值直通（:80-91）', () => {
  const { labo, labo_map } = setup_labo();
  labo.dc_set(4, 5, 2);
  labo.dc_set(6, 6, -1);
  assert.equal(labo_map.vil_check(5, 4), 2, '正值返回发展等级');
  assert.equal(labo_map.vil_check(6, 6), 0, '<= 0 返回 0');
});

test('CHIP_DRAW：五级优先级（:95-139）', () => {
  const { fixture, labo, labo_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 2, 3); // 侵攻中红 @
  seed_unit(fixture, 2, '乙', 3, 2, 4); // 迎击中素色 @
  labo.db_set(6, 5, 4); // 怪物 lv 4 在 (5,6)
  fixture.store.set('item:140', 21); // lv 4 → item 140..144
  labo.dc_set(8, 7, 1); // 村庄在 (7,8)
  labo.da_set(10, 9, 200); // 地形档 200/32 = 6 在 (9,10)

  assert.deepEqual(
    labo_map.chip_draw(16, 16),
    [{ content: '凸,' }],
    '中心是魔王城（凸），优先级最高',
  );
  const red_unit = labo_map.chip_draw(2, 3);
  assert.deepEqual(
    red_unit,
    [{ color: '#c83232', content: '@,' }],
    '侵攻中（状态 2）单位是红 @（SETCOLOR 200,50,50）',
  );
  assert.deepEqual(
    labo_map.chip_draw(2, 4),
    [{ content: '@,' }],
    '迎击中（状态 3）单位是素色 @',
  );
  assert.deepEqual(
    labo_map.chip_draw(5, 6),
    [{ color: '#8cc06c', content: '④,' }],
    '怪物格带圈数字（lv 4 → ④，绿色系）',
  );
  assert.deepEqual(
    labo_map.chip_draw(7, 8),
    [{ content: '凹,' }],
    '村庄格是凹',
  );
  assert.deepEqual(
    labo_map.chip_draw(9, 10),
    [{ color: '#f7b357', content: '６,' }],
    '地形格按高度档着色（200/32 = 档 6）',
  );
});

test('GEO_OUTPUT_2：32×32 行输出 + 等键（:6-23）', async () => {
  const { fixture, labo_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 0, 0);
  await labo_map.geo_output_2();
  const texts = fixture.text_lines();
  assert.equal(texts.length, 32, '32 行（y 0..31）');
  assert.equal(texts[0].length, 64, '每行 32 格 × 2 字符（数字＋逗号）');
  assert.ok(
    texts[0].startsWith('@,'),
    '第一行首格是 (0,0) 的勇者（红 @ 排在 terrain 之前）',
  );
  const center_row = texts[16];
  assert.ok(
    center_row.includes('凸,'),
    '第 17 行（y=16）含中心魔王城凸（x=16 恰在第 17 格）',
  );
  assert.ok(
    fixture.waits.some((w) => w.waited),
    '尾部 WAIT（:23）',
  );
});

test('MON_LIMIT：合计 ≤ 120 放行，超限拒绝并播报（:162-181）', () => {
  const { fixture, labo, labo_map } = setup_labo();
  assert.equal(labo_map.mon_limit(), 1, '空图合计 0 → 放行');
  // 25 格 lv 5（合计 125 > 120）——lv 5 → item 150..154
  fixture.store.set('item:150', 21);
  for (let x = 0; x < 25; x += 1) {
    labo.db_set(0, x, 5);
  }
  assert.equal(labo_map.mon_limit(), 0, '合计 125 > 120 → 拒绝');
  assert.ok(
    fixture.text_lines().some((line) => line.includes('*怪物的配置到极限了*')),
    '超限播报（:179）',
  );
});

// —— 4. UNIT_MOVE ——

test('UNIT_MOVE：侵攻方向趋近中心，落笔坐标与侵攻度（:83-235）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 10, 10);
  fixture.store.set('cflag:1:507', 0); // 非撤退
  // rand_max：x = 89 → walk20 = 0+89 > 10 → floor(89/10) = 8；抖动 +1+1
  const walk20 = await labo_dungeon_map.unit_move(1, 0, rand_max);
  assert.equal(fixture.store.get('cflag:1:510'), 11, 'x 10 → 11（趋近中心）');
  assert.equal(fixture.store.get('cflag:1:511'), 11, 'y 10 → 11（趋近中心）');
  assert.equal(walk20, 8, 'D:20 = floor(89/10) = 8（:140 衰减压到十分位）');
});

test('UNIT_MOVE：撤退方向远离中心，D:20 负值钳到 100（:130-138/:229-233）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 10, 10);
  fixture.store.set('cflag:1:507', 1); // 撤退中 → x = -90（:88）
  const walk20 = await labo_dungeon_map.unit_move(1, -5, rand_max);
  assert.equal(fixture.store.get('cflag:1:510'), 9, 'x 10 → 9（远离中心）');
  assert.equal(walk20, 100, 'D:20 = -5 - 90 = -95 < 0 → 钳到 100（:230）');
});

test('UNIT_MOVE：D:20 > 10 先经 /10 再抖动（:139-140）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 0, 0);
  // 传入的 walk20 先累加 x（:113-118），环内再判 > 10 → /10：
  // 50 + 89 = 139 → floor(139/10) = 13
  const walk20 = await labo_dungeon_map.unit_move(1, 50, rand_max);
  assert.equal(
    walk20,
    13,
    'D:20 = floor((50 + 89)/10) = 13（累加在环外、/10 在环内先行）',
  );
  // :231 的 > 100 钳制臂需侵攻装备（W:8=17 使 x = 178）+ D:20 ≤ 10 才可达
  // （裸 rand_n(90) ≤ 89，10 + 89 = 99 不越界）——本文件不构造装备世界，
  // 该臂与 < 0 臂（上例）同构三行一体（:229-233），由 e2e 与变异守卫覆盖
});

test('UNIT_MOVE：到中心 (16,16) → JUMP ENDING_2 的尾跳转语义（:171-177）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 15, 16);
  fixture.store.set('base:1:0', 1000);
  fixture.store.set('maxbase:1:0', 1000);
  fixture.store.set('base:1:1', 1000);
  fixture.store.set('maxbase:1:1', 1000);
  let quit_error;
  fixture.set_inputs(0); // ENDING_2 仪式性 INPUT（:55）
  try {
    await labo_dungeon_map.unit_move(1, 89, rand_max);
  } catch (e) {
    if (e instanceof Error && e.message === 'quit') {
      quit_error = e;
    } else {
      throw e;
    }
  }
  assert.ok(quit_error, 'ENDING_2 的 QUIT 炸穿 unit_move（JUMP 后续不可达）');
  assert.equal(
    fixture.store.get('cflag:1:501'),
    2,
    'CFLAG:501 = 2（:172 魔王城攻略阶层）',
  );
  const texts = fixture.text_lines();
  assert.ok(
    texts.includes('这里就是魔王城了吗………'),
    '2D 路径的终点播报（:174，LABO_DUNGEON_MAP 的 JUMP 前一行）',
  );
  assert.ok(
    texts.some((line) => line.includes('新的女勇者，终于攻陷了魔王的地下城')),
    'ENDING_2 横幅（3D 路径共用的 ending_2 真身）',
  );
  // JUMP 之后的 RETURN 0 不可达——坐标不落笔（:226-227 在 JUMP 之后）
  assert.equal(
    fixture.store.get('cflag:1:510'),
    15,
    'JUMP 后续不可达：坐标停留出发格（变异若把 JUMP 改 CALL，坐标将被改写）',
  );
});

test('UNIT_MOVE：撞同伴（同状态）移动停止，坐标不落笔（:180-183）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 11, 11);
  seed_unit(fixture, 2, '乙', 2, 12, 12); // 甲 +1+1 的落点
  const walk20 = await labo_dungeon_map.unit_move(1, 89, rand_max);
  assert.equal(walk20, 0, '仲間 RETURN 0（:183）——walk20 不再传播');
  assert.equal(
    fixture.store.get('cflag:1:510'),
    11,
    '移动停止：坐标停在出发格（:226-227 的落笔在 RETURN 之后不可达）',
  );
});

test('UNIT_MOVE：撞不同阵营单位走 DUNGEON_BATTLE2 占位（:184-199，原作缺失）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 3, 11, 11); // 迎击中（else 臂：walk20 -= 2x）
  seed_unit(fixture, 2, '乙', 2, 12, 12); // 侵攻中——甲的落点，不同阵营
  // 迎击侧累加是 -2x = -178：传入 200 才能保 D:20 = 22 > 10 走趋近臂
  await labo_dungeon_map.unit_move(1, 200, rand_max);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('原作 @DUNGEON_BATTLE2')),
    '野外单位战的原作占位行（#14 登记：原作全库无定义）',
  );
});

test('UNIT_MOVE：撞怪物走 DUNGEON_BATTLE 占位（:205-222，原作缺失）', async () => {
  const { fixture, labo, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 11, 11);
  labo.db_set(12, 12, 3); // 甲的落点是怪物
  fixture.store.set('item:130', 21); // 兵力足够
  await labo_dungeon_map.unit_move(1, 89, rand_max);
  assert.ok(
    fixture
      .text_lines()
      .some((line) => line.includes('原作 @DUNGEON_BATTLE，')),
    '野外怪物战的原作占位行（#14 登记）',
  );
});

// —— 5. DUNGEON_MAP 主流程 ——

test('DUNGEON_MAP：迎击中 HP/MP > 80% 时重启迎击（:7-12）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 3, 10, 10);
  fixture.store.set('cflag:1:507', 1); // 此前在撤退
  fixture.store.set('base:1:0', 900);
  fixture.store.set('maxbase:1:0', 1000);
  fixture.store.set('base:1:1', 900);
  fixture.store.set('maxbase:1:1', 1000);
  await labo_dungeon_map.dungeon_map(1, rand_max);
  assert.equal(
    fixture.store.get('cflag:1:507'),
    0,
    '迎击重启（:10 清撤退旗；HP/MP 90% 不再触发 :22 的撤退决议）',
  );
});

test('DUNGEON_MAP：HP < 45% 撤退决议 + 侵攻度写回 + 气力消耗（:19-40）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  seed_unit(fixture, 1, '甲', 2, 10, 10);
  fixture.store.set('base:1:0', 100);
  fixture.store.set('maxbase:1:0', 1000); // HP 10% < 45% → 撤退
  fixture.store.set('base:1:1', 1000);
  fixture.store.set('maxbase:1:1', 1000); // MP 100%
  const before_wp = fixture.store.get('base:1:1');
  await labo_dungeon_map.dungeon_map(1, rand_max);
  assert.ok(
    fixture.text_lines().some((line) => line.includes('甲决定返回了')),
    '撤退播报（:23 PRINTFORML %SAVESTR:A%）',
  );
  assert.equal(fixture.store.get('cflag:1:507'), 1, '撤退旗（:24）');
  assert.equal(
    fixture.store.get('cflag:1:502'),
    8,
    '侵攻度写回（CFLAG:502 = D:20 = floor(89/10) = 8，:40）',
  );
  assert.equal(
    fixture.store.get('base:1:1'),
    before_wp - 5,
    '气力 -= RAND:6 = 5（:19，rand_max 取上界）',
  );
});

// —— 6. 配置函数 ——

test('CONFIG_LABO_MAP_STATUS：FLAG:502 的两种显示（:238-247）', () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  fixture.store.set('flag:502', 1);
  labo_dungeon_map.config_labo_map_status();
  assert.equal(fixture.text_lines()[0], '２Ｄ');
  fixture.store.set('flag:502', 0);
  labo_dungeon_map.config_labo_map_status();
  assert.equal(fixture.text_lines()[1], '普通');
});

test('CONFIG_LABO_MAP_SETTING：选 2D 置位 + 顺带初始化地图（:250-270）', async () => {
  const { fixture, labo, labo_dungeon_map } = setup_labo();
  fixture.set_inputs(1);
  // 分支随机源：点阵（RAND:256）恒 128、村庄（RAND:32）恒 7——两个分布
  // 各自钉住，不互相越界
  const branch_rand = (n) => (n === 32 ? 7 : n === 256 ? 128 : n - 1);
  const ret = await labo_dungeon_map.config_labo_map_setting(branch_rand);
  assert.equal(ret, 0);
  assert.equal(fixture.store.get('flag:502'), 1, 'FLAG:502 = 1（:262）');
  assert.equal(
    labo.da_get(0, 0),
    128,
    'LABO_MAP_SET 跑过（GEO_TEST 点阵 = 128）',
  );
  assert.equal(labo.dc_get(7, 7), 4, 'SET_VIL 跑过（4 个村庄叠在 (7,7)）');
  assert.equal(labo.db_get(10, 10), 0, 'DB 清零跑过（:277-281）');
});

test('CONFIG_LABO_MAP_SETTING：选普通置 0、选 100 直接返回（:266-267）', async () => {
  const { fixture, labo_dungeon_map } = setup_labo();
  fixture.store.set('flag:502', 1);
  fixture.set_inputs(0);
  await labo_dungeon_map.config_labo_map_setting(rand_max);
  assert.equal(fixture.store.get('flag:502'), 0, '选 0 → FLAG:502 = 0');
  fixture.set_inputs(100);
  const ret = await labo_dungeon_map.config_labo_map_setting(rand_max);
  assert.equal(ret, 0, '选 100 → RETURN 0');
  assert.equal(fixture.store.get('flag:502'), 0, '返回不改值');
});

// —— 7. LABO 菜单与 FIRST_SETTING ——

test('LABO 菜单：[100] 返回、[007] 打 HEART_R 图、[001] 调色行（:3-40）', async () => {
  const { fixture, labo } = setup_labo();
  fixture.set_inputs(7, 1, 100);
  const ret = await labo.labo(rand_max);
  assert.equal(ret, 0, '[100] RETURN 0');
  const texts = fixture.text_lines();
  assert.equal(
    texts.filter((t) => t === '０,１,２,３,４,５,６,７,').length,
    1,
    '[001] 文字色彩测试：8 档一行（COLOR_OUTPUT_TEST）',
  );
  assert.ok(
    fixture.lines.some(
      (line) =>
        line.type === 'image' && line.names && line.names[0] === 'HEART_R',
    ),
    '[007] PRINT_IMG "HEART_R"（注册名照抄，image 条目记录）',
  );
});

test('FIRST_SETTING 地下城模式一问：按钮 0/1 均在白名单内可送达（#130）', async () => {
  const fixture = create_era_fixture();
  const { ask_dungeon_mode } = fixture.load_module('event/first-setting');
  fixture.set_inputs(1);
  const choice = await ask_dungeon_mode();
  assert.equal(choice, 1);
  assert.equal(
    fixture.store.get('flag:502'),
    1,
    'FLAG:502 = 1（game 门面写入）',
  );
  const buttons = fixture.lines.filter((line) => line.type === 'button');
  assert.deepEqual(
    buttons.map((b) => [b.accelerator, b.text]),
    [
      [0, '普通'],
      [1, '2D'],
    ],
    '两枚按钮的 accelerator 沿用原作编号（喂 1 不被白名单拦——送达即证明）',
  );
});

test('FIRST_SETTING 地下城模式一问：选普通置 0', async () => {
  const fixture = create_era_fixture();
  const { ask_dungeon_mode } = fixture.load_module('event/first-setting');
  fixture.set_inputs(0);
  const choice = await ask_dungeon_mode();
  assert.equal(choice, 0);
  assert.equal(fixture.store.get('flag:502'), 0);
});

// —— 8. 存档往返（#181 返工验收核心）——

test('存档往返：DA/DB/DC 落引擎表，saveData → loadData 读回同值（承载改动的验收核心）', async () => {
  // 引擎 saveData 是整份 data 的 JSON 快照（app.asar 偏移 207005 一带，
  // dev-guides/11-saves.md:73）——三张 2D 表自 #181 返工起走引擎表（一维
  // 折叠，yml/DA.yml、DB.yml、DC.yml 建桶），本用例钉住「地图数据随档走」：
  // 若有人把承载改回模块内存，快照里不会有 da:/db:/dc: 键、loadData 后
  // 读回恒 0——此用例当场红（返工简报的原话：没有它下次还会有人选模块内存）
  const { fixture, labo } = setup_labo();
  const { da_set, db_set, dc_set, da_get, db_get, dc_get } = labo;
  // 三张表各写代表格（含典型值与清零面边角）
  da_set(0, 0, 255);
  da_set(32, 32, 128);
  da_set(16, 15, 96);
  db_set(7, 7, 5);
  dc_set(16, 15, 3);

  await fixture.era.saveData(1, '2D 地图档'); // 快照含 da:/db:/dc: 键
  // 存后改值（模拟「存档退出再进来」前的状态漂移）
  da_set(0, 0, 1);
  db_set(7, 7, 0);
  dc_set(16, 15, 0);
  assert.equal(da_get(0, 0), 1, '改值生效（前置，防恒真断言）');

  const ok = await fixture.era.loadData(1);
  assert.equal(ok, true, 'loadData 成功（版本闸门默认放行）');
  assert.equal(da_get(0, 0), 255, 'DA 读回存档值');
  assert.equal(da_get(32, 32), 128, 'DA 角点读回');
  assert.equal(da_get(16, 15), 96, 'DA 内侧格读回');
  assert.equal(db_get(7, 7), 5, 'DB 读回存档值（玩家买的怪物配置不蒸发）');
  assert.equal(dc_get(16, 15), 3, 'DC 读回存档值（村庄不蒸发）');
  // 生成的地形也整表随档：跑一次 GEO_TEST（恒定随机源）→ 存 → 读回比对
  labo.geo_test(() => 128);
  await fixture.era.saveData(2, '地形档');
  await fixture.era.loadData(1); // 读回旧档（GEO_TEST 覆盖前的快照）
  assert.notEqual(da_get(20, 20), 128, '读回旧档：GEO_TEST 的 128 未混入');
  await fixture.era.loadData(2);
  assert.equal(da_get(20, 20), 128, '读回地形档：全区 128 的生成结果随档走');
});
