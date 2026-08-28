/**
 * @file 2D 地下城模式的地质数据与实验室菜单（issue #181，阶段 3 H12）：
 * LABO.ERB 十函数。
 *
 * 源: target/ERB/迷宮/LABO.ERB  @LABO（:3-40，实验室菜单）、@DA_CLEAR
 *       （:42-48，地图初始化）、@COLOR_OUTPUT_TEST（:50-55，调色输出）、
 *       @C_OUT（:57-93，彩色文字输出）、@GEO_OUTPUT（:96-107，地图输出）、
 *       @GEO_TEST（:109-240，地质地图生成）、@GEO_CALC_INTERP（:243-296，
 *       块内插值）、@LINEAR_INTERP_COS_X（:299-330）、@LINEAR_INTERP_COS_Y
 *       （:333-364）、@U_FACE（:366，空函数——源文件末行即函数头，无函数体）
 *
 * 原作局部变量语义（GEO_TEST :110-128 注释照抄）：
 *   LOCAL:3 = ポイント数（正方形 1 边的顶点数）  LOCAL:4 = 世界のマス数
 *   LOCAL:5/6 = 作業中の x / y   LOCAL:10-15 = 临时/四角 z
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **DA/DB/DC 三张 100×100 全局二维数组以引擎表承载（一维折叠）**：
 *     它们是 Emuera 的遗留多维数组（VariableSize.csv :132-134 定义尺寸）。
 *     引擎的自定义表只有一维桶，二维寻址 `da:y:x` 的三段形态也确实走不通
 *     （桶只随 addCharacter 按角色 ID 开，y 坐标维等不来开桶者）；但**一维
 *     折叠 `da:(y*100+x)` 是通的**——yml/DA.yml 建空表让装载器开 data.da
 *     桶（E.yml/DB.yml 同款，#180 的 db_get/db_set 先例），使用面（33×33
 *     加清零面 50×50）内 y*100+x 无碰撞。**必须进引擎表而不能放模块内存**
 *     （#181 返工裁定，依据见 issue #181 返工报告）：引擎 saveData 是整份
 *     data 的 JSON 快照，模块内存不进存档；而地形只在 EVENTFIRST 生成一次
 *     （GEO_TEST 全库唯一调用点 :67）、无读档重建路径，玩家为 DB 付的钱
 *     （#180 的 MON_SET_OMAKASE 扣 MONEY）都不容读档蒸发；原作同样持久
 *     （emuera.config:60 二进制存档，EVENTFIRST 的显式清零循环只在数据会
 *     留存时才有意义）。本模块导出 da/db/dc 三对读写包装（DB 一对由
 *     #180 的 page-dungeon-setup.js 移交至此，两票共用的唯一真相源）；
 *     维度约定 [y][x]（行主序——UNIT_MOVE :128 读 DA:(LOCAL:1):(LOCAL:0)、
 *     SET_VIL 写 DC:(LOCAL:0):(LOCAL:1) 与 VIL_CHECK :86 读 DC:(P:1):(P:0)
 *     按同一解释对齐）；
 *   - **整数除法用 trunc**：Emuera 的 / 是向零截断（C 风格），插值算式的
 *     差值项可负（(z1-z0)*k/100 一族），Math.floor 在负侧差 1——三个数学
 *     函数（GEO_CALC_INTERP / LINEAR_INTERP_COS_X / _Y）逐条用 Math.trunc，
 *     既有迷宫代码的 Math.floor 惯例（正值域）不受影响；
 *   - 原作全局 A / X / Y / P:0 / P:1 的换手经显式传参（#5 决议第六条，
 *     dungeon.js 先例）：C_OUT 收颜色档号，CHIP_DRAW 族（labo-map.js）收
 *     (x, y)；
 *   - SETCOLOR 0xRRGGBB → era.setColor('#rrggbb')（夹具兜底记录层收
 *     calls，可断言）；RESETCOLOR → era.setColor('')（SDK「Set default
 *     text color」的空参即恢复默认，era-electron.js:537-541）；
 *   - 原作 PRINT 不换行、一行 32 格逐格 SETCOLOR，ere 的 print 每调用
 *     一行 → 一行归并为一次 era.print(段数组)（era-electron.js:339 的
 *     {[color]:string, content:string}[] 形态，每段带自己的色）；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand 掷出（缺省
 *     Math.random，enter-enemy.js 先例）；
 *   - @U_FACE 源文件只有函数头一行（:366，文件末行），无函数体——
 *     1:1 移植为空函数（LABO 菜单 :35 CASE 8 调用，RESULT 无消费）。
 */

const era = require('#/era-electron');

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** Emuera 整数除法（向零截断）——插值算式的差值项可负，floor 会差 1 */
function idiv(a, b) {
  return Math.trunc(a / b);
}

// —— DA/DB/DC：VariableSize.csv :132-134 的三张 100×100 全局二维数组 ——
//    引擎表一维折叠承载（文件头）；未写格 getter 兜 0，与 Emuera「全区
//    0 起步」同语义。DB 的包装自 #180 移交至此（两票共用的唯一真相源，
//    page-dungeon-setup.js 从这里 require）。

/** DA:Y:X 读（一维折叠，yml/DA.yml 建桶）——地质高度图（/32 后为颜色档） */
function da_get(y, x) {
  return era.get(`da:${y * 100 + x}`) || 0;
}

/** DA:Y:X 写（一维折叠，yml/DA.yml 建桶） */
function da_set(y, x, v) {
  era.set(`da:${y * 100 + x}`, v);
}

/** DB:Y:X 读（一维折叠，yml/DB.yml 建桶，#180 先例）——怪物配置图 */
function db_get(y, x) {
  return era.get(`db:${y * 100 + x}`) || 0;
}

/** DB:Y:X 写（一维折叠，yml/DB.yml 建桶，#180 先例） */
function db_set(y, x, v) {
  era.set(`db:${y * 100 + x}`, v);
}

/** DC:Y:X 读（一维折叠，yml/DC.yml 建桶）——村庄图（发展等级） */
function dc_get(y, x) {
  return era.get(`dc:${y * 100 + x}`) || 0;
}

/** DC:Y:X 写（一维折叠，yml/DC.yml 建桶） */
function dc_set(y, x, v) {
  era.set(`dc:${y * 100 + x}`, v);
}

/**
 * 余弦插值系数表（SELECTCASE CASE 1..7 → 4/15/31/50/69/85/96；CASEELSE 0）。
 * 三处共用（GEO_CALC_INTERP 的 px/py 与两个 LINEAR_INTERP_COS 的偏移），
 * 形态是 1 - (1-cos(πt))/2 在 t = k/8 处的百分数近似（k = 1..7）。
 */
const COS_TABLE = { 1: 4, 2: 15, 3: 31, 4: 50, 5: 69, 6: 85, 7: 96 };

/**
 * @DA_CLEAR（:42-48）：地图初始化——DA 50×50 清零。
 * @returns {void} 原作无 RETURN（函数尾隐式）
 */
function da_clear() {
  // ;マップの初期化
  for (let y = 0; y < 50; y += 1) {
    for (let x = 0; x < 50; x += 1) {
      da_set(y, x, 0);
    }
  }
}

/**
 * @C_OUT（:57-93）：彩色文字输出——地形档 0..7 → 全角数字＋逗号。
 * 原作 SETCOLOR → PRINT 数字 → PRINT , → RESETCOLOR（数字与逗号同色，
 * 复位在最后），ere 侧归并为一个带色段。
 *
 * @param {number} arg0 颜色档（DA 值 /32；0..7，越界走 CASEELSE）
 * @returns {{color?: string, content: string}[]} 一个格子的输出段
 */
function c_out(arg0) {
  // ;いろ文字出力
  const color = {
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
    7: '７',
    6: '６',
    5: '５',
    4: '４',
    3: '３',
    2: '２',
    1: '１',
    0: '０',
  }[arg0];
  // CASEELSE：RESETCOLOR 后无数字，只剩默认色的逗号（:86-87/:90）
  return color === undefined
    ? [{ content: ',' }]
    : [{ color, content: `${ch},` }];
}

/**
 * @COLOR_OUTPUT_TEST（:50-55）：8 档颜色各打一格（LABO 菜单 [001]）。
 * 原作 FOR COUNT,0,8 → 0..7 逐格 CALL C_OUT，尾部 PRINTL。
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function color_output_test() {
  const row = [];
  for (let count = 0; count < 8; count += 1) {
    row.push(...c_out(count));
  }
  era.print(row); // 8 格拼一行（文件头：一行归并为一次 print）
  era.println(); // :54 PRINTL
  return 0;
}

/**
 * @GEO_OUTPUT（:96-107）：地图输出——32×32 格逐格 C_OUT，行尾换行。
 * @returns {void} 原作无 RETURN
 */
function geo_output() {
  // ;マップを出力
  for (let y = 0; y < 32; y += 1) {
    const row = [];
    for (let x = 0; x < 32; x += 1) {
      row.push(...c_out(idiv(da_get(y, x), 32))); // LOCAL:2 = DA:(y):(x)/32
    }
    era.print(row);
    era.println(); // :106 行尾 PRINTL
  }
}

/**
 * @GEO_TEST（:109-240）：地质地图生成——5×5 点阵随机高度（RAND:256），
 * 余弦插值补横线/纵线（8 格间距），再块内双线性补全内侧。
 *
 * 生成后 DA 的 0..32 × 0..32 区为完整高度图（未覆盖区保持原值，通常 0）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {void} 原作无 RETURN
 */
function geo_test(rand) {
  const rand_n = rand ?? default_rand;

  // :133 LOCAL:3 = 5（ポイント数：正方形の1辺の頂点数）
  const points = 5;
  // :136 LOCAL:4 = (ポイント数 - 1) * 8（世界のマス数——中心点にダンジョンを置く）
  // eslint-disable-next-line no-unused-vars
  const world_cells = (points - 1) * 8;

  // :147-158 ポイントの乱数出力——点阵 (x,y) ∈ {0,8,16,24,32}² 各掷 RAND:256
  for (let py = 0; py < points; py += 1) {
    const y = py * 8; // ターゲットｙ座標（LOCAL:1）
    for (let px = 0; px < points; px += 1) {
      const x = px * 8; // ターゲットｘ座標（LOCAL:0）
      da_set(y, x, rand_n(256)); // ランダマイズ
    }
  }

  // :165-181 補完(1) 横線——Ｘ方向の補完（行 × 列块，:175-178 内侧 7 格）
  for (let row = 0; row < points; row += 1) {
    for (let col = 0; col < points - 1; col += 1) {
      const x0 = col * 8; // 対象ブロックの左上（LOCAL:0）
      const y0 = row * 8; // （LOCAL:1）
      for (let x = x0 + 1; x < x0 + 8; x += 1) {
        da_set(y0, x, linear_interp_cos_x(x0, x0 + 8, x, y0));
      }
    }
  }

  // :185-201 補完(1) 縦線——Ｙ方向の補完（列 × 行块）
  for (let col = 0; col < points; col += 1) {
    for (let row = 0; row < points - 1; row += 1) {
      const x0 = col * 8;
      const y0 = row * 8;
      for (let y = y0 + 1; y < y0 + 8; y += 1) {
        da_set(y, x0, linear_interp_cos_y(y0, y0 + 8, y, x0));
      }
    }
  }

  // :207-240 補完(2) 内側——16 块 × 各 7×7 格，四角 z 的双线性（带余弦系数）
  for (let col = 0; col < points - 1; col += 1) {
    for (let row = 0; row < points - 1; row += 1) {
      const x0 = col * 8; // ブロックの左上[x,y]=[LOCAL:0,LOCAL:1]
      const y0 = row * 8;
      // ブロックの4点のzをとる（:218-224）
      const z_ul = da_get(y0, x0); // 左上（LOCAL:12）
      const z_ur = da_get(y0, x0 + 8); // 右上（LOCAL:13）
      const z_dl = da_get(y0 + 8, x0); // 左下（LOCAL:14）
      const z_dr = da_get(y0 + 8, x0 + 8); // 右下（LOCAL:15）
      for (let y = y0 + 1; y < y0 + 8; y += 1) {
        for (let x = x0 + 1; x < x0 + 8; x += 1) {
          geo_calc_interp(z_ul, z_ur, z_dl, z_dr, x - x0, y - y0, x, y); // :232（写 DA[y][x]，副作用函数）
        }
      }
    }
  }
}

/**
 * @GEO_CALC_INTERP（:243-296）：块内插值——四角 z 与 (px,py) 偏移算格子高度，
 * 写入 DA[y][x]。
 *
 * 算式（:295，整数运算逐字）：
 *   DA[y][x] = (a-b-c+d)*kx*ky/10000 + (b-a)*kx/100 + (c-a)*ky/100 + a
 * （乘法链先乘后整除；三项各自整除后相加）
 *
 * @param {number} arg0 左上 z（a）
 * @param {number} arg1 右上 z（b）
 * @param {number} arg2 左下 z（c）
 * @param {number} arg3 右下 z（d）
 * @param {number} arg4 対象マスが左からいくつか（px：1..7）
 * @param {number} arg5 対象マスが上からいくつか（py：1..7）
 * @param {number} arg6 対象 x
 * @param {number} arg7 対象 y
 * @returns {void} 原作为副作用函数（无 RETURNF）
 */
function geo_calc_interp(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  // 係数設定（SELECTCASE → COS_TABLE；CASEELSE 0——px/py 在 1..7 内，
  // 0 档是防御分支照抄）
  const kx = COS_TABLE[arg4] ?? 0; // LOCAL:0 = px
  const ky = COS_TABLE[arg5] ?? 0; // LOCAL:1 = py

  // 計算（:295）——三项整除后相加（文件头：trunc 语义）
  da_set(
    arg7,
    arg6,
    idiv((arg0 - arg1 - arg2 + arg3) * kx * ky, 10000) +
      idiv((arg1 - arg0) * kx, 100) +
      idiv((arg2 - arg0) * ky, 100) +
      arg0,
  );
}

/**
 * @LINEAR_INTERP_COS_X（:299-330，#FUNCTION）：X 轴上的余弦插值。
 *
 * @param {number} arg0 ｘ0（起点 x）
 * @param {number} arg1 ｘ1（终点 x）
 * @param {number} arg2 求z点的ｘ
 * @param {number} arg3 求z点的ｙ
 * @returns {number} LOCAL:0 + ((LOCAL:1 - LOCAL:0)*LOCAL:2)/100
 */
function linear_interp_cos_x(arg0, arg1, arg2, arg3) {
  // ;X軸上の補完
  const z0 = da_get(arg3, arg0); // LOCAL:0:z0
  const z1 = da_get(arg3, arg1); // LOCAL:1:z1
  const k = COS_TABLE[arg2 - arg0] ?? 0; // LOCAL:2:係数
  return z0 + idiv((z1 - z0) * k, 100);
}

/**
 * @LINEAR_INTERP_COS_Y（:333-364，#FUNCTION）：Y 轴上的余弦插值。
 * 原作注释沿用「X軸上の補完」（:335，原文如此）。
 *
 * @param {number} arg0 ｙ0（起点 y）
 * @param {number} arg1 ｙ1（终点 y）
 * @param {number} arg2 求z点的ｙ
 * @param {number} arg3 求z点的ｘ
 * @returns {number} LOCAL:0 + ((LOCAL:1 - LOCAL:0)*LOCAL:2)/100
 */
function linear_interp_cos_y(arg0, arg1, arg2, arg3) {
  const z0 = da_get(arg0, arg3); // LOCAL:0:z0
  const z1 = da_get(arg1, arg3); // LOCAL:1:z1
  const k = COS_TABLE[arg2 - arg0] ?? 0; // LOCAL:2:係数
  return z0 + idiv((z1 - z0) * k, 100);
}

/**
 * @U_FACE（:366）：空函数——源文件末行只有函数头，无函数体。
 * LABO 菜单 :35 CASE 8（[008] 头像测试）调用，RESULT 无消费。
 * @returns {Promise<void>}
 */
async function u_face() {}

/**
 * @LABO（:3-40）：实验室菜单（2D 迷宫地质的开发者自测入口）。
 *
 * 原作菜单 PRINTL 列表 + INPUT；ere 侧纯文本选项改按钮（first-setting.js
 * 先例）。[002]/[003] 原作菜单未列出（CASE 2/3 只是 GOTO 回环，无效输入），
 * 按钮白名单（#130）下同样进不来。**本函数的运行时入口是主菜单隐藏命令
 * 400（SHOP/DRAW_MAINMENU.ERB:148，面板无此按钮）——实机本就不可达**，
 * page-shop.js 的 LABO 存根维持不接线（接线也不能让无按钮的 400 送达，
 * #129 的教训反面），真身由测试直接驱动。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0（[100] 返回）
 */
async function labo(rand) {
  const rand_n = rand ?? default_rand;
  for (;;) {
    // $INPUT_LOOP —— 菜单重绘
    era.print('----------'); // :6 PRINTL
    era.print('[LABORATORY]'); // :7
    era.printButton('文字色彩测试', 1); // :8 [001]
    era.printButton('GEO_MAKE', 4); // :9 [004]
    era.printButton('GEO_OUTPUT', 5); // :10 [005]
    era.printButton('GEO清除', 6); // :11 [006]
    era.printButton('图片测试', 7); // :12 [007]
    era.printButton('头像测试', 8); // :13 [008]
    era.printButton('返回', 100); // :14 [100]
    const result = await era.input(); // :15 INPUT
    if (result === 100) {
      return 0; // :17-18 RETURN 0
    }
    if (result === 1) {
      await color_output_test(); // :20
    } else if (result === 4) {
      geo_test(rand_n); // :26
    } else if (result === 5) {
      geo_output(); // :28
    } else if (result === 6) {
      da_clear(); // :30
    } else if (result === 7) {
      era.printImage('HEART_R'); // :32 PRINT_IMG "HEART_R"（注册名照抄，res/img.csv）
      era.println(); // :33 PRINTL
    } else if (result === 8) {
      await u_face(); // :35
    }
    // CASE 2/3 与 CASEELSE：GOTO INPUT_LOOP——循环回菜单
  }
}

module.exports = {
  da_get,
  da_set,
  db_get,
  db_set,
  dc_get,
  dc_set,
  COS_TABLE,
  da_clear,
  c_out,
  color_output_test,
  geo_output,
  geo_test,
  geo_calc_interp,
  linear_interp_cos_x,
  linear_interp_cos_y,
  u_face,
  labo,
};
