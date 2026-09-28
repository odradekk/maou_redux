/**
 * @file 性格与发色的读写面板（issue #392，N8 段 2）。
 *
 * 调用面（全库唯一调用方）：ere/chara/chara-make.js 的 `rand_chara_make`
 * （rand_chara_make 的形象确认段）。#392 把该处八条存根换成本模块的真身。
 *
 * 移植说明（有意偏离既有写法，均注明依据）：
 *
 *   - **TARGET 隐式读改写显式 cid**（#5 决议第六条：指针不隐式读全局）：
 *     「省略实参 = 操作 TARGET」保留（`cid < 0` 时读 `era_flag.target`），
 *     其余一律形参。
 *   - **局部量无跨调用状态**：各函数的局部量都在函数体内先赋值后使用，
 *     不存在跨调用保留的状态，故一律用 JS 局部变量。
 *   - **两处列表是纯文本行 + INPUT，不升级为按钮**：点击不是入口、按键
 *     才是——按 page 的 PR #53 通则只把「按钮化过的项」升级为
 *     `era.printButton`，这里保持文本行。`[N]` 编号写在正文里，不经引擎的
 *     showAcc 补位。
 *   - **补位按显示宽度**（全角 2 / 半角 1，左对齐补 NBSP——#577 起补位字符
 *     是 U+00A0，见 ere/utils/display-width.js）：编号补 2 位、性格名补
 *     10 位、发色名补 7 位。
 *   - **随机源提成 `rand` 形参**（chara-init.js 先例）：缺省均匀随机，
 *     测试注入定值序。
 *   - **表外序号的落点**：choose_charasteristic 的判断条件收在表长内
 *     （`result >= size` 重问）；set_charasteristic 不做范围检查，
 *     表外序号经 `?? 0` 缺省处理落成素质 0（処女）。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { pad_display, pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

const default_rand = (n) => Math.floor(Math.random() * n);

/** 非唯一性格的素质编号表 */
const GENERAL_CHARASTERISTICS = [
  160, 161, 162, 163, 164, 166, 172, 173, 174, 175,
];

/** 发色名表；0 号是空串（未设定） */
const ARR_HAIRCOLOR = [
  '',
  '金发',
  '栗发',
  '黑发',
  '红发',
  '银发',
  '蓝发',
  '绿发',
  '紫发',
  '白发',
  '暗金发',
  '粉发',
];

/** 未指定角色时读 target 指针（省略实参时的缺省对象） */
function target_cid() {
  return era_flag.target;
}

/** 素质名（引擎静态表 talent 的列名） */
function talentname(index) {
  return era.get(`talentname:${index}`) ?? '';
}

/** 读取素质（#13：未声明下标读回 undefined，缺省返回 0） */
function talent(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

/**
 * 写素质。
 *
 * 174/175（貴公子 / 伶俐）属 system 域（跨域写下标，登记在案），走
 * `chara(cid).system` 的具名访问器；其余是
 * chara 属主下标，域内裸寻址即合法（#70）。
 *
 * @param {number} cid 角色 ID
 * @param {number} index 素质下标
 * @param {number} value 值
 */
function set_talent(cid, index, value) {
  if (index === 174) {
    chara(cid).system.贵公子 = value;
  } else if (index === 175) {
    chara(cid).system.伶俐 = value;
  } else {
    era.set(`talent:${cid}:${index}`, value);
  }
}

/**
 * show_charasteristic：打印当前已设的性格名，返回它在表内的序号；
 * 一个都没设时返回 -1（调用方据此触发随机补设）。
 *
 * @param {number} [cid=-1] 角色 ID（< 0 时取 target）
 * @returns {number} 表内序号（0-9）或 -1
 */
function show_charasteristic(cid = -1) {
  const chara_id = cid < 0 ? target_cid() : cid;
  const i = charasteristic_index(chara_id);
  if (i >= 0) {
    era.print(talentname(GENERAL_CHARASTERISTICS[i])); // 不换行，见文件头
    return i;
  }
  return -1;
}

/**
 * 当前性格的表内序号（只查不打印）。show_charasteristic 的查询半段
 * ；形象确认按钮要先把名字拼进正文再打印（#565 返工
 * 第 1 条），不能借会打印的 show_*。
 * @param {number} cid 角色 ID
 * @returns {number} 表内序号；未定义（无点亮性格）为 -1
 */
function charasteristic_index(cid) {
  for (let i = 0; i < GENERAL_CHARASTERISTICS.length; i += 1) {
    const talent_id = GENERAL_CHARASTERISTICS[i];
    if (talent(cid, talent_id)) {
      return i;
    }
  }
  return -1;
}

/**
 * set_random_charasteristic：清空后随机设一条性格（174 貴公子不参与）。
 *
 * **重掷且重清**——重掷也要先清空，故清空留在循环体内。
 *
 * @param {number} [cid=-1] 角色 ID
 * @param {(n: number) => number} [rand] 随机源，缺省均匀随机
 * @returns {number} 掷中的表内序号
 */
function set_random_charasteristic(cid = -1, rand = default_rand) {
  const chara_id = cid < 0 ? target_cid() : cid;
  for (;;) {
    clear_charasteristic(chara_id);
    const temp = rand(GENERAL_CHARASTERISTICS.length);
    const talent_id = GENERAL_CHARASTERISTICS[temp];
    if (talent_id === 174) {
      continue;
    }
    set_talent(chara_id, talent_id, 1);
    return temp;
  }
}

/**
 * set_charasteristic：清空后按表内序号设一条性格（不做范围检查）。
 * @param {number} [cid=-1] 角色 ID
 * @param {number} index 表内序号
 */
function set_charasteristic(cid = -1, index) {
  const chara_id = cid < 0 ? target_cid() : cid;
  clear_charasteristic(chara_id);
  // 直连入口不做范围检查：表外序号读回 undefined，经 ?? 0 落素质 0（処女）。
  // 少了这个缺省处理会写出不存在的下标
  const talent_id = GENERAL_CHARASTERISTICS[index] ?? 0;
  set_talent(chara_id, talent_id, 1);
}

/**
 * clear_charasteristic：把表内 10 条性格全部清零。
 * @param {number} [cid=-1] 角色 ID
 */
function clear_charasteristic(cid = -1) {
  const chara_id = cid < 0 ? target_cid() : cid;
  for (const talent_id of GENERAL_CHARASTERISTICS) {
    set_talent(chara_id, talent_id, 0);
  }
}

/**
 * choose_charasteristic：列出性格供选择，每 N 项换行。
 *
 * 174 貴公子在列表里**整项跳过**（跳过打印与计数）——编号仍按表内序号
 * 摆，故列表里会缺一个号。
 *
 * @param {number} [cid=-1] 角色 ID
 * @param {number} [per_line=3] 每行项数
 * @returns {Promise<void>}
 */
async function choose_charasteristic(cid = -1, per_line = 3) {
  clear_charasteristic(cid); // 事前初期化
  const chara_id = cid < 0 ? target_cid() : cid;

  let count = 0;
  let row = '';
  const size = GENERAL_CHARASTERISTICS.length;
  for (let i = 0; i < size; i += 1) {
    const talent_id = GENERAL_CHARASTERISTICS[i];
    if (talent_id === 174) {
      continue;
    }
    // 每格是「[编号] 名字」的等宽对齐；每满 N 格断一行，故拼成整行再输出
    // ——引擎的「一次 print 即一行」见 look.js 文件头的「PRINT 合流」条
    row += `[${pad_left(String(i), 2)}] ${pad_display(talentname(talent_id), 10)}`;
    count += 1;
    if (count % per_line === 0) {
      era.print(row); // 本行满 N 格
      row = '';
    }
  }
  if (row.length > 0) {
    era.print(row); // 残行整行输出，不产生空行
  } else {
    // 整行恰满时这里输出空行——这一支才是真空行
    era.println();
  }

  for (;;) {
    const result = await era.input();
    if (result < 0 || result >= size) {
      continue;
    }
    const chosen = GENERAL_CHARASTERISTICS[result];
    set_talent(chara_id, chosen, 1);
    return;
  }
}

/**
 * show_haircolor：打印发色名，返回编号（未设定为 0）。
 * @param {number} [cid=-1] 角色 ID
 * @returns {number} TALENT:300（发色编号）
 */
function show_haircolor(cid = -1) {
  const chara_id = cid < 0 ? target_cid() : cid;
  const color_id = talent(chara_id, 300);
  era.print(ARR_HAIRCOLOR[color_id] ?? '');
  return color_id;
}

/**
 * set_random_haircolor：按 rand(100) 的分档随机决定发色。
 *
 * 8 个分档盖满 0-99 的值域（0 号粉髪 1%、98-99 銀髪 2%，其余档宽见各
 * 分支边界），故本函数不会落空。
 *
 * @param {number} [cid=-1] 角色 ID
 * @param {(n: number) => number} [rand] 随机源
 * @returns {number} 决定的发色编号
 */
function set_random_haircolor(cid = -1, rand = default_rand) {
  const chara_id = cid < 0 ? target_cid() : cid;
  const roll = rand(100);
  let color_id = 0;
  if (roll === 0) {
    color_id = 11; // 粉髪
  } else if (roll <= 20) {
    color_id = 1; // 金髪
  } else if (roll <= 30) {
    color_id = 6; // 青髪
  } else if (roll <= 40) {
    color_id = 7; // 緑髪
  } else if (roll <= 60) {
    color_id = 2; // 栗毛
  } else if (roll <= 80) {
    color_id = 3; // 黒髪
  } else if (roll <= 97) {
    color_id = 4; // 赤毛
  } else {
    color_id = 5; // 銀髪（98-99）
  }
  set_talent(chara_id, 300, color_id);
  return color_id;
}

/**
 * set_haircolor：直接设定发色（不做范围检查）。
 * @param {number} [cid=-1] 角色 ID
 * @param {number} value 发色编号
 * @returns {number} 回传 value
 */
function set_haircolor(cid = -1, value) {
  const chara_id = cid < 0 ? target_cid() : cid;
  set_talent(chara_id, 300, value);
  return value;
}

/**
 * choose_haircolor：列出 1-11 号发色供选择，每 N 项换行。
 *
 * 列表与判断条件都取 size = 12 为上界（表内发色是 1-11 号，0 号是未设定
 * 的空串）：输入 12 按越界重问——12 号没有名字（ARR_HAIRCOLOR 到 11 止）。
 *
 * @param {number} [cid=-1] 角色 ID
 * @param {number} [per_line=6] 每行项数
 * @returns {Promise<void>}
 */
async function choose_haircolor(cid = -1, per_line = 6) {
  const chara_id = cid < 0 ? target_cid() : cid;

  let count = 0;
  let row = '';
  const size = 12;
  for (let color_id = 1; color_id < size; color_id += 1) {
    // 每格是「[编号] 发色名」的等宽对齐，一行 N 格（收行法同 choose_charasteristic）
    row += `[${pad_left(String(color_id), 2)}] ${pad_display(ARR_HAIRCOLOR[color_id] ?? '', 7)}`;
    count += 1;
    if (count % per_line === 0) {
      era.print(row);
      row = '';
    }
  }
  if (row.length > 0) {
    era.print(row); // 残行整行输出，不产生空行
  } else {
    // 整行恰满时这里输出空行——这一支才是真空行
    era.println();
  }

  for (;;) {
    const result = await era.input();
    if (result < 1 || result >= size) {
      continue;
    }
    set_talent(chara_id, 300, result);
    return;
  }
}

module.exports = {
  /** 写「口上」两素质的属主域写法（174/175 走 system 门面）——本文件是
   * 那份写法的唯一落点，chara-custom2.js 从这里取 */
  set_personality: set_talent,
  GENERAL_CHARASTERISTICS,
  ARR_HAIRCOLOR,
  /** talent 名与读数（形象确认按钮拼正文用，#565 返工） */
  talentname,
  talent,
  charasteristic_index,
  show_charasteristic,
  set_random_charasteristic,
  set_charasteristic,
  clear_charasteristic,
  choose_charasteristic,
  show_haircolor,
  set_random_haircolor,
  set_haircolor,
  choose_haircolor,
};
