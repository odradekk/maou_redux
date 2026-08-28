/**
 * @file 2D 地下城模式的地图组件（issue #181，阶段 3 H12）：LABO_MAP.ERB 八函数。
 *
 * 源: target/ERB/迷宮/LABO_MAP.ERB  @GEO_OUTPUT_2（:6-23，chip 地图输出）、
 *       @UNIT_CHECK（:26-47，勇者存在检查）、@MON_CHECK（:51-77，怪物存在
 *       检查）、@VIL_CHECK（:80-91，村庄存在检查）、@CHIP_DRAW（:95-139，
 *       地图 chip 绘制）、@SET_VIL（:142-159，村庄设置）、@MON_LIMIT
 *       （:162-181，怪物配置限界）、@C_OUT_MON（:183-228，怪物彩色输出）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - DA/DB/DC 的承载与 [y][x] 维度约定见 labo.js 文件头（本文件是 DB 的
 *     清零方之一与 DC 的产地）；
 *   - 原作坐标协议 P:0/P:1（chip 系函数的隐式输入）经显式传参 (x, y)
 *     （#5 决议第六条）；X/Y 原作全局在 UNIT_CHECK 内只是暂存，不落变量；
 *   - 原作 REPEAT CHARANUM 按已加入序号迭代，ere 侧按角色 ID 迭代
 *     （era.getAddedCharacters()，turnend-settle.js 先例）——UNIT_CHECK
 *     返回的「キャラNo」按消费端语义（CFLAG:RESULT:1、SAVESTR:B 均按其
 *     寻址）改回角色 ID；
 *   - SETFONT "ＭＳ ゴシック"（GEO_OUTPUT_2 :9/:21）无 era API 通道，以
 *     注释标记跳过（BARL 先例）——数值行为不受影响，仅渲染字体；
 *   - WAIT → era.waitAnyKey()；一行 32 chip 归并为一次 era.print(段数组)
 *     （labo.js 文件头同款）；
 *   - MON_CHECK 的「兵力不足清 DB」副作用是原作设计（:75，村娘扫荡无兵
 *     怪物），MON_LIMIT 全图扫描时逐格触发——1:1 保留。
 */

const era = require('#/era-electron');

const {
  da_get,
  db_get,
  db_set,
  dc_get,
  dc_set,
  c_out,
} = require('#/dungeon/labo');

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * @UNIT_CHECK（:26-47）：MAP 上に勇者が存在するか——座標 (x,y) に侵攻中
 * （CFLAG:1==2）/迎击中（==3）的单位（CFLAG:510/511 座標 ≥ 0）在场则返回
 * 其角色 ID，不在场返回 -1。
 *
 * @param {number} x 座標（原作 P:0）
 * @param {number} y 座標（原作 P:1）
 * @returns {number} 角色 ID，不在场 -1
 */
function unit_check(x, y) {
  for (const cid of era.getAddedCharacters()) {
    if (
      (era.get(`cflag:${cid}:1`) || 0) !== 2 &&
      (era.get(`cflag:${cid}:1`) || 0) !== 3
    ) {
      continue; // :33-34 SIF … CONTINUE
    }
    const ux = era.get(`cflag:${cid}:510`) || 0; // X = CFLAG:COUNT:510
    if (ux < 0) {
      continue; // :36-37
    }
    const uy = era.get(`cflag:${cid}:511`) || 0; // Y = CFLAG:COUNT:511
    if (uy < 0) {
      continue; // :39-40
    }
    if (ux === x && uy === y) {
      return cid; // :42-43 RETURN COUNT
    }
  }
  return -1; // :47
}

/**
 * @MON_CHECK（:51-77）：MAP 上に怪物が存在するか——DB 的怪物 LV 需有足够
 * 兵力（ITEM 100+ 段 5 格合计 > 20）支撑，不足则清掉该格并返回 0。
 *
 * @param {number} x 座標（原作 P:0）
 * @param {number} y 座標（原作 P:1）
 * @returns {number} 怪物 LV，不在场 0
 */
function mon_check(x, y) {
  const lv = db_get(y, x); // LOCAL:0 = DB:(P:1):(P:0)

  if (lv <= 0 || lv >= 10) {
    return 0; // :59-60
  }

  let troops = 0; // LOCAL:1
  for (let i = 0; i < 5; i += 1) {
    const item_no = lv * 10 + i + 100; // LOCAL:2
    troops += era.get(`item:${item_no}`) || 0;
  }

  // 十分な兵が存在に必要（:72-73）
  if (troops > 20) {
    return lv;
  }

  db_set(y, x, 0); // :75 兵力不足——扫掉

  return 0;
}

/**
 * @VIL_CHECK（:80-91）：MAP 上に村が存在するか。
 * @param {number} x 座標（原作 P:0）
 * @param {number} y 座標（原作 P:1）
 * @returns {number} 発展 LV，不在场 0
 */
function vil_check(x, y) {
  const v = dc_get(y, x); // X = DC:(P:1):(P:0)
  if (v <= 0) {
    return 0; // :88-89
  }
  return v;
}

/**
 * @C_OUT_MON（:183-228）：彩色文字输出（怪物）——怪物 LV 0..10 → 带圈数字
 * ＋逗号（与 c_out 同结构，数字与逗号同色）。
 *
 * @param {number} arg0 怪物 LV
 * @returns {{color?: string, content: string}[]} 一个格子的输出段
 */
function c_out_mon(arg0) {
  // ;いろ文字出力(怪物)
  const color = {
    10: '#e16745',
    9: '#e16745',
    8: '#e16745',
    7: '#e16745',
    6: '#f7b357',
    5: '#b8d26b',
    4: '#8cc06c',
    3: '#5aad6d',
    2: '#4cb5e8',
    1: '#5984bd',
    0: '#5c6aa6',
  }[arg0];
  const ch = {
    10: '⑩',
    9: '⑨',
    8: '⑧',
    7: '⑦',
    6: '⑥',
    5: '⑤',
    4: '④',
    3: '③',
    2: '②',
    1: '①',
    0: '０',
  }[arg0];
  return color === undefined
    ? [{ content: ',' }] // CASEELSE（:221-222）
    : [{ color, content: `${ch},` }];
}

/**
 * @CHIP_DRAW（:95-139）：地图 chip 绘制——优先级：魔王城（中心凸）＞勇者
 * 单位（＠，侵攻中红色）＞怪物（带圈数字）＞村庄（凹）＞地形色。
 *
 * @param {number} x 座標（原作 P:0）
 * @param {number} y 座標（原作 P:1）
 * @returns {{color?: string, content: string}[]} 一个格子的输出段
 */
function chip_draw(x, y) {
  // ;マップチップ描画
  if (x === 16 && y === 16) {
    return [{ content: '凸,' }]; // :100-104 PRINT 凸 / PRINT ,
  }

  const unit = unit_check(x, y); // :106 CALL UNIT_CHECK
  if (unit >= 0) {
    if ((era.get(`cflag:${unit}:1`) || 0) === 2) {
      return [{ color: '#c83232', content: '@,' }]; // :108-112 SETCOLOR 200,50,50 → PRINT ＠ / PRINT ,
    }
    return [{ content: '@,' }]; // :113-115
  }

  const mon = mon_check(x, y); // :121 CALL MON_CHECK
  if (mon > 0) {
    return c_out_mon(mon); // :123 CALL C_OUT_MON(RESULT)
  }

  if (vil_check(x, y) > 0) {
    return [{ content: '凹,' }]; // :127-131 PRINTFORM 凹 / PRINT ,
  }

  return c_out(Math.trunc(da_get(y, x) / 32)); // :134-135 LOCAL:2 = DA/32 → C_OUT
}

/**
 * @GEO_OUTPUT_2（:6-23）：chip 地图输出——32×32 格逐格 CHIP_DRAW，行尾换行。
 * @returns {Promise<void>}
 */
async function geo_output_2() {
  // SETFONT "ＭＳ ゴシック"（:9）——无 era API 通道，跳过（文件头）
  // ;マップを出力
  for (let y = 0; y < 32; y += 1) {
    const row = [];
    for (let x = 0; x < 32; x += 1) {
      row.push(...chip_draw(x, y)); // P:0/P:1 → 显式传参
    }
    era.print(row);
    era.println(); // :18 行尾 PRINTL
  }
  // SETFONT（:21）——复原同样无通道，跳过

  await era.waitAnyKey(); // :23 WAIT
}

/**
 * @SET_VIL（:142-159）：村庄设置——DC 50×50 清零后随机放 4 个村庄
 * （中心 16,16 排除）。维度 [y][x]（labo.js 文件头的对齐解释）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {number} 原作 RETURN 0
 */
function set_vil(rand) {
  const rand_n = rand ?? default_rand;
  for (let y = 0; y < 50; y += 1) {
    for (let x = 0; x < 50; x += 1) {
      dc_set(y, x, 0);
    }
  }

  for (let i = 0; i < 4; i += 1) {
    // REPEAT 4——LOCAL:0 = y、LOCAL:1 = x（VIL_CHECK 读 DC:(P:1):(P:0)
    // 的同维解释，文件头）
    const y = rand_n(32);
    const x = rand_n(32);
    if (y === 16 && x === 16) {
      continue; // :154-155 中心（魔王城）不放村
    }
    dc_set(y, x, dc_get(y, x) + 1);
  }

  return 0;
}

/**
 * @MON_LIMIT（:162-181）：怪物配置限界——全图怪物 LV 合计 ≤ 120 时返回 1，
 * 超限打印提示并返回 0。扫描逐格走 MON_CHECK（兵力不足的格子在此被扫掉，
 * 原作副作用，文件头）。
 *
 * @returns {number} 1 = 还有配置余量 / 0 = 到极限
 */
function mon_limit() {
  // ;怪物配置限界——レベルが高いほどリミット圧迫
  let total = 0; // LOCAL:2
  for (let y = 0; y < 32; y += 1) {
    for (let x = 0; x < 32; x += 1) {
      total += mon_check(x, y); // CALL MON_CHECK（P:0/P:1 → 传参）
    }
  }

  if (total <= 120) {
    return 1; // :176-177
  }

  era.print('*怪物的配置到极限了*'); // :179 PRINTL

  return 0;
}

module.exports = {
  geo_output_2,
  unit_check,
  mon_check,
  vil_check,
  chip_draw,
  set_vil,
  mon_limit,
  c_out_mon,
};
