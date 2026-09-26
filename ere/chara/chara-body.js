/**
 * @file 角色身高、体重、三围、年龄与种族年龄的生成（issue #332、#385）。
 *
 * 源: target/ERB/キャラ関数/CHARA_BODY.ERB  @CHAR_BODY_GENERATE_WAPPED（:16-36）、
 *       @CHAR_AGE_GENERATE（:148-242）、@RACE_AGE_GENERATE（:245-337）、
 *       @HUMAN_AGE_GENERATE（:340-406）、
 *       @CHAR_SIZE_GENERATE（:408-761）、@UNDER_BUST（:763-779）
 *     target/ERB/キャラ関数/CHARA_BODY2.ERB  @CHAR_HWEIGHT_GENERATE（:17-120）、
 *       @CHAR_BUST_GENERATE（:123-323）、@NORMAL_POINT_PICKUP（:306-323）、
 *       @NORMAL_RANGE_PICKUP（:326-358）、@STATISTICS_WOMAN（:361-385）、
 *       @STATISTICS_MAN（:388-412）
 *
 * BODY2 的五段只作为本文件的计算步骤（三围生成 / 年龄取点），不扩大公开 API。
 * @NORMAL_POINT_PICKUP 由 #385 随 @CHAR_AGE_GENERATE 落地——它是后者的取点
 * 步骤，不是独立入口；BODY2 其余未落地段落（@CHAR_BUST_REGENERATE_WAPPED）
 * 不在本票范围。
 *
 * 未移植的残留见 docs/stub-registry.md：@CONFIG_AGE_SETTING（:853-929）与
 * @RACE_CONFIG（:931-1333）已随 #547 落地为 ere/page/page-config-age.js
 * （配置界面，调用方属 SYSTEM/CONFIG.ERB）；@CUP_SIZE 已随 #390 落地。
 */

const era = require('#/era-electron');
const { char_age_expect, rf_all } = require('#/chara/chara-family');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');

const default_rand = (n) => Math.floor(Math.random() * n);
const int = Math.trunc;

const WOMAN = [
  [
    128200, 134200, 140200, 145000, 147900, 149500, 149800, 149900, 150000,
    150100,
  ],
  [
    140100, 146600, 152400, 156300, 158600, 159800, 160100, 160200, 160300,
    160400,
  ],
  [
    152700, 159200, 154500, 167600, 169300, 170100, 170300, 170400, 170500,
    170600,
  ],
  [
    21800, 24500, 28000, 32000, 35500, 37800, 39000, 39900, 40000, 40100, 40200,
    40200, 40200,
  ],
  [
    31100, 35400, 40000, 44000, 47100, 49000, 50100, 50700, 51100, 51400, 51700,
    51900, 52000,
  ],
  [
    46500, 54000, 60500, 64500, 66100, 67000, 67200, 67500, 68000, 68400, 68700,
    68900, 69000,
  ],
];
const MAN = [
  [
    127900, 132200, 137200, 144000, 151900, 158500, 158800, 160300, 160500,
    160900,
  ],
  [
    140200, 145300, 151900, 159500, 165900, 169800, 171600, 172300, 172700,
    173100,
  ],
  [
    152000, 158900, 166900, 175100, 180200, 182800, 184000, 184500, 184800,
    185000,
  ],
  [
    23600, 24800, 28400, 32000, 36500, 40600, 43500, 45300, 46300, 46500, 46700,
    46800, 47000,
  ],
  [
    33700, 37700, 42500, 48100, 53400, 57100, 59400, 60700, 61400, 61600, 61800,
    61900, 62000,
  ],
  [
    51400, 57600, 64700, 72600, 79100, 82500, 83900, 84500, 84700, 84900, 85100,
    85200, 85200,
  ],
];

function statistics(age, male) {
  const table = male ? MAN : WOMAN;
  const index = Math.max(0, Math.min(12, age - 10));
  const height_index = Math.min(index, 9);
  return [
    table[0][height_index],
    table[1][height_index],
    table[2][height_index],
    table[3][index],
    table[4][index],
    table[5][index],
  ];
}

function normal_range_pickup(low, middle, high, rand, scale = -1) {
  let point = scale;
  if (point < 0) {
    const roll = rand(34) + 1;
    if (roll <= 2) point = rand(20);
    else if (roll <= 8) point = rand(20) + 20;
    else if (roll <= 17) point = rand(10) + 40;
    else if (roll <= 26) point = rand(10) + 50;
    else if (roll <= 32) point = rand(20) + 60;
    else point = rand(20) + 80;
  } else {
    point = Math.min(point, 100);
  }
  const value =
    point <= 50
      ? low + int(((middle - low) * point) / 50)
      : middle + int(((high - middle) * (point - 50)) / 50);
  return [value, point];
}

function char_hweight_generate(cid, age, rand) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  const stats = statistics(age, t(122) !== 0);
  let heights;
  let weights;
  if (t(100)) {
    heights = [
      stats[0] * 2 - int((stats[0] + stats[1]) / 2),
      stats[0],
      int((stats[0] + stats[1]) / 2),
    ];
    weights = [
      stats[3] * 2 - int((stats[3] + stats[4]) / 2),
      stats[3],
      int((stats[3] + stats[4]) / 2),
    ];
  } else if (t(99)) {
    heights = [
      int((stats[1] + stats[2]) / 2),
      stats[2],
      stats[2] * 2 - int((stats[1] + stats[2]) / 2),
    ];
    weights = [
      int((stats[4] + stats[5]) / 2),
      stats[5],
      stats[5] * 2 - int((stats[4] + stats[5]) / 2),
    ];
  } else {
    heights = [
      int((stats[0] + stats[1]) / 2),
      stats[1],
      int((stats[1] + stats[2]) / 2),
    ];
    weights = [
      int((stats[3] + stats[4]) / 2),
      stats[4],
      int((stats[4] + stats[5]) / 2),
    ];
  }
  let [height, scale] = normal_range_pickup(...heights, rand);
  let [weight] = normal_range_pickup(...weights, rand, scale);
  const race = t(314);
  if (race === 1 || race === 7) {
    height += int(((height - 109000) * 3) / 20);
    weight += int(((weight - 17000) * 3) / 20);
  } else if (race === 5) {
    height += int((height - 109000) / 4);
    weight += int(((weight - 17000) * 4) / 5);
  } else if (race === 10) {
    height -= int(((height - 109000) * 15) / 20);
    weight -= int(((weight - 17000) * 12) / 20);
  } else if (race === 11) {
    height -= int(((height - 109000) * 9) / 20);
    weight -= int(((weight - 17000) * 7) / 20);
  } else if (t(220) && t(319) === 6) {
    height = int(height / 3);
    weight = int(weight / 3);
  } else if (t(220) && t(319) === 7) {
    height *= 2;
    weight *= 2;
  }
  if (t(248)) weight = int((weight * 108) / 100);
  if (t(248) && t(122)) weight = int((weight * 108) / 100);
  if (t(256)) weight = int((weight * 92) / 100);
  if (t(256) && t(122)) weight = int((weight * 103) / 100);
  if (t(115)) weight = int((weight * 115) / 100);
  return [height, weight];
}

function under_bust(cid, height) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  let value = int((height * (43100 + t(308))) / 100000);
  if (t(248)) value = int((value * 105) / 100);
  if (t(256)) value = int((value * 98) / 100);
  return value;
}

/**
 * 源: target/ERB/キャラ関数/CHARA_BODY2.ERB:123-301 @CHAR_BUST_GENERATE。
 * 按年龄/胸系素质生成上胸围与胸围差（返回 [胸围, 下胸围, 胸围差]）。
 * 导出理由：`char_size_generate` 与 `char_bust_regenerate_wapped` 都会
 * 调用它，本身没有可观察副作用，导出后测试可用「对照组」核对接线
 * （同 `char_body_generate_wapped` 的测试写法），不必手算三围数值。
 *
 * @param {number} cid 角色 ID
 * @param {number} source_age 年龄（CHAR_AGE_GENERATE 或调用方直传）
 * @param {number} height 身高（×100 精度）
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {[number, number, number]} [胸围, 下胸围, 胸围差]（均 ×100 精度）
 */
function char_bust_generate(cid, source_age, height, rand) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  let age = source_age;
  let age_count = 0;
  let difference;
  if (t(116) && age >= 14) {
    difference = age >= 16 ? 5000 + rand(25) * 100 : 2500 + rand(50) * 100;
  } else if (t(109) && age >= 14) {
    difference = age >= 16 ? 10000 + rand(25) * 100 : 7500 + rand(50) * 100;
  } else if (age <= 11 && t(135)) {
    difference = rand(25) * 100;
  } else if (age <= 14 && t(135)) {
    difference = rand(50) * 100;
  } else if (
    age >= 16 ||
    t(110) ||
    t(114) ||
    t(119) ||
    (age < 16 && !t(135) && !t(109) && !t(116))
  ) {
    age_count = 16 - age;
    age = Math.max(16, Math.min(24, age));
    let low = 12500;
    let high = 20000;
    const middle =
      int(((age - 16) * (17500 + 20000 - 12500 - 15000)) / 2 / 8) +
      int((12500 + 15000) / 2);
    const center = int((low + high) / 2);
    if (middle < center) high = middle * 2 - low;
    else low = middle * 2 - high;
    [difference] = normal_range_pickup(low, middle, high, rand);
    if (t(119) && age >= 16) difference += 22500 + rand(5000);
    else if ((t(119) && age >= 12) || (t(114) && age >= 16))
      difference += 12500 + rand(7500);
    else if ((t(114) && age >= 12) || (t(110) && age >= 12))
      difference += 7500 + rand(7500);
    if (t(119) && (rand(2) === 0 || t(130))) {
      difference += 18000 + rand(2000) + rand(2000) + rand(3000);
    }
    if (age_count < 0) difference = int((difference * (20 + age_count)) / 20);
  } else if (t(122)) {
    difference = 2500 + rand(30) * 100;
    if (t(256)) difference -= rand(15) * 100;
    if (t(248)) difference += rand(65) * 200;
    if (t(115)) difference += rand(50) * 200;
  } else {
    age = Math.max(12, Math.min(16, age));
    let low = 2500;
    let high = 15000;
    const middle =
      int(((age - 12) * (12500 + 15000 - 2500 - 5000)) / 2 / 4) +
      int((5000 + 2500) / 2);
    const center = int((low + high) / 2);
    if (middle < center) high = middle * 2 - low;
    else low = middle * 2 - high;
    [difference] = normal_range_pickup(low, middle, high, rand);
  }
  const bust_under = under_bust(cid, int(height / 100)) * 100;
  return [bust_under + difference, bust_under, difference];
}

/**
 * 种族年龄表的取槽（FLAG:26/27 的 base-1000 打包整数；#105 决议四改为数组
 * 承载：槽 0-5 落 种族年龄设定_0、槽 6-7 落 种族年龄设定_1，低位在前）。
 *
 * 原作 :289/:291 的取槽式是 `FLAG:26 / POWER(1000, RACE_ID) % 1000`（槽 6-7
 * 换成 FLAG:27 与 RACE_ID-6）。槽 8 及以后取到的是打包整数的高位——那些位
 * 恒 0，故越界槽返回 0（RACE_ID = 8 只在种族编号 12 上出现）。
 *
 * @param {number} slot 槽号（= RACE_ID）
 * @returns {number} 该槽的三位设定值（百位算法档 / 十位数量级 / 个位倍数）
 */
function race_config_value(slot) {
  if (slot >= 0 && slot <= 5) return game.chara.种族年龄设定_0[slot] ?? 0;
  if (slot === 6 || slot === 7) return game.chara.种族年龄设定_1[slot - 6] ?? 0;
  return 0;
}

/**
 * 种族编号（TALENT:314）→ 种族年龄表的槽号（原作 :280-282 与 :377-379 的
 * ELSE 支）。
 *
 * **编号 7-9（暗精灵 / 堕天使 / 魔族）不经过本函数**：调用点已在 :267-276
 * 与 :364-373 原样返回人类年龄。那两处的写法是「`SIF ARG:1 == 7` +
 * `RACE_ID = 0`、`SIF ARG:1 == 8` + `RACE_ID = 5`、然后 `RETURN ARG:0`」
 * ——SIF 只约束紧接的那一行，`RETURN ARG:0` 在 IF 体内不受它约束，于是
 * 三个堕落种族编号一律直接返回，两条 `RACE_ID` 赋值是**死代码**。这是原作
 * 缺陷，1:1 保留、不落那两行（同款 SIF 缺陷的既有先例见
 * ere/dungeon/dungeon-room.js 的「原作缺陷 1:1 保留」段，登记 #14）。
 *
 * 霍比特人（10）与矮人（11）的名称编号跳过了 7-9，故减 3 回到槽 6-7。
 *
 * @param {number} race_no TALENT:314（只可能是 0-6 与 10 以上）
 * @returns {number} 槽号（-1 = 未设定种族）
 */
function race_id_of(race_no) {
  const race_id = race_no - 1;
  return race_id > 8 ? race_id - 3 : race_id;
}

/**
 * 三位设定值的解包（原作 :294-296 与 :391-393 两处同款）。
 * @param {number} raw 表值（百位算法档 / 十位数量级 / 个位倍数）
 * @returns {{cla: number, deg: number, num: number}} 档位、数量级、倍数
 */
function unpack_race_config(raw) {
  return {
    deg: int(raw / 10) % 10,
    num: raw % 10,
    cla: int(raw / 100),
  };
}

/**
 * 种族编号（TALENT:314）→ 解包后的档位三元组（原作 :285-296 与 :382-393
 * 两处同款：先取槽，未设定种族（槽号 -1）时按档位 1 处理，再拆三位）。
 * @param {number} race_no TALENT:314
 * @returns {{cla: number, deg: number, num: number}} 档位、数量级、倍数
 */
function race_config_of(race_no) {
  const slot = race_id_of(race_no);
  return unpack_race_config(slot < 0 ? 1 : race_config_value(slot));
}

/** 与 Emuera 的 STRLENFORM（数值的十进制位数，正数下即 STRLEN）等价 */
function digit_count(value) {
  return String(value).length;
}

/**
 * @NORMAL_POINT_PICKUP（CHARA_BODY2.ERB:306-323）：从中值附近的 5 个点按
 * 1,3,9,3,1 的权重取点（模拟正态分布）。
 *
 * 原作的 CASEELSE 不可达——RAND:17 + 1 落在 [1,17]，五支已穷尽，故不落分支
 * （不在本函数里造一个永远不会走的 else）。
 *
 * @param {number} middle 中值
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {number} 中值 ±0..2
 */
function normal_point_pickup(middle, rand) {
  const roll = rand(17) + 1;
  if (roll === 1) return middle - 2;
  if (roll <= 4) return middle - 1;
  if (roll <= 13) return middle;
  if (roll <= 16) return middle + 1;
  return middle + 2;
}

/**
 * @RACE_AGE_GENERATE（:245-337）：由人类换算年龄与种族编号算种族年龄。
 *
 * 表值三位 ABC 的语义（各档的算式见下方分支）：
 *   A 算法档：0 整数倍 / 1 小数倍 / 2 0～上限 / 3 上限/2～上限 / 4 年龄～上限；
 *   B 数量级：上限 = C × 10^B；C 倍数。
 * 档位 5 起原作没有分支（:299-335 五支全不命中），RACE_AGE 保持初值 0，
 * :337 照样返回它——不要顺手补一支。
 *
 * @param {number} human_age 人类换算年龄（ARG:0）
 * @param {number} race_no TALENT:314（ARG:1）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {number} 种族年龄
 */
function race_age_generate(human_age, race_no, rand = default_rand) {
  // :267-276 堕落种族（暗精灵 7 / 堕天使 8 / 魔族 9）：一条无条件的
  // RETURN ARG:0 盖住整个 IF 体（见 race_id_of 头注），三个编号都原样返回
  if (race_no >= 7 && race_no < 10) return human_age;

  // :285-292 コンフィグで設定された种族ごとの設定値を取得
  const { cla, deg, num } = race_config_of(race_no);
  // 档位上限 = 倍数 × 10^数量级（cla 0/2/3/4 四支都从它派生，见下方各支）
  const cap = num * 10 ** deg;

  if (cla === 0) {
    // :299-300 年齢の整数倍
    return human_age * cap + rand(cap);
  }
  if (cla === 1) {
    // :302-303 年齢の小数倍（整数除算で切り捨て）
    return int((human_age * (deg * 10 + num)) / 10);
  }
  if (cla === 2) {
    // :305-312 0～上限：桁の出方を偏らせてみる
    const ceiling = 10 ** rand(digit_count(cap) + 1) * 10; // :309 RAND:(RESULT + 1)
    return rand(Math.min(cap, ceiling));
  }
  if (cla === 3) {
    // :314-315 上限/2 ～ 上限
    const half = int(cap / 2);
    return rand(half) + half;
  }
  if (cla === 4) {
    // :317-335 年齢～上限：桁の出方を偏らせてみる
    const limit = cap;
    let age = 10;
    for (let i = 0; i <= digit_count(limit); i += 1) {
      if (rand(5) < 2) break;
      age *= 10;
    }
    if (age > limit) age = limit;
    if (human_age >= age) age = human_age + 1;
    return rand(age - human_age) + human_age;
  }
  return 0;
}

/**
 * @HUMAN_AGE_GENERATE（:340-406）：种族年龄 → 人类换算年龄（种族年龄表的
 * 反向换算，月替时随种族年龄 +1 重算 CFLAG:451）。
 *
 * 小数倍档的 `(ARG:0 * 10 + 5) / …` 是原作写死的四舍五入式（先放大十倍加
 * 5 再整除），不是笔误；档位 2 起的三个随机档没有唯一解，原作直接取
 * CFLAG:452——那是**种族年龄**（CFLAG:451 的人类年龄就在调用点，原作没取
 * 它），1:1 保留，不顺手改成 451。
 *
 * @param {number} race_age 种族年龄（ARG:0，调用点传 CFLAG:452）
 * @param {number} cid 角色 ID（ARG:1）
 * @returns {number} 人类换算年龄
 */
function human_age_generate(race_age, cid) {
  const race_no = era.get(`talent:${cid}:314`) || 0; // :361 TALENT:314
  // :364-373 堕落种族（暗精灵 7 / 堕天使 8 / 魔族 9）：同 race_age_generate，
  // 无条件的 RETURN ARG:0 盖住整个 IF 体，三个编号都原样返回
  if (race_no >= 7 && race_no < 10) return race_age;

  const { cla, deg, num } = race_config_of(race_no);

  if (cla === 0) {
    // :396-397 年齢の整数倍（割り戻し）
    return int(race_age / (num * 10 ** deg));
  }
  if (cla === 1) {
    // :399-400 年齢の小数倍
    return int((race_age * 10 + 5) / (deg * 10 + num));
  }
  // :402-404 0～上限 / 上限/2～上限 / 年齢～上限 三档：CFLAG:452（种族年龄）
  return era.get(`cflag:${cid}:452`) || 0;
}

/**
 * @CHAR_AGE_GENERATE（:148-242）：按经历推算并生成人类年龄与种族年龄。
 *
 * 顺序是三条互相覆盖的约束：经历推算值（CHAR_AGE_EXPECT + 17，LIMIT 到
 * [12,35]）→ 近正态取点（±2）→ 家族成员的年龄（见下方分支）→ 后代固定
 * 10 岁。人类年龄 ≤ 14 时补盖未熟（TALENT:135，train 域，经门面写）。
 *
 * **原作 :216-223 的分支比较的是 L_B（成员的角色号）而不是 L_B_TYPE
 * （关系码）**——:215 把关系码取进 L_B_TYPE 后一次也没用。成员角色号恰好
 * 落在 1-8 时才命中约束，这是原作缺陷，1:1 保留（对照 RELATION_FAMILY.ERB
 * 的关系码定义：1 兄 / 2 姊 / 3 弟 / 4 妹 / 5 父 / 6 母 / 7 儿 / 8 娘）。
 *
 * @param {number} cid 角色 ID（ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {number[]} [人类换算年龄, 种族年龄]
 */
function char_age_generate(cid, rand = default_rand) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;

  // :171-174 根据经历推测年龄（原作注释：+18(31) -15）
  let age = 17 + char_age_expect(cid); // CHAR_AGE_EXPECT（CHARA_BODY.ERB:39-144）
  // :176 LOCAL = EXP_AGE —— 只被注释掉的调试行（:231）读取，不落
  age = Math.max(12, Math.min(35, age)); // :178 LIMIT(EXP_AGE,12,35)
  age = normal_point_pickup(age, rand); // :180-181

  // :212-225 家族成员的年龄（分支判据是 L_B，见函数头注）。rf_all 的第三实参
  // 对应原作 CALL 的 RETURN_TYPE = 1：成对返回 [成员角色号, 关系码]（L_DATA 同形），
  // 本循环只取成员号——关系码那一列原作取进 L_B_TYPE 后从未使用
  for (const [member] of rf_all(cid, -1, true)) {
    const member_age = era.get(`cflag:${member}:451`) || 0; // CFLAG:451 年齢
    if (member === 1 || member === 2) age = Math.min(age, member_age);
    else if (member === 3 || member === 4) age = Math.max(age, member_age);
    else if (member === 5 || member === 6)
      age = Math.max(10, Math.min(age, member_age - 6));
    else if (member === 7 || member === 8) age = Math.max(age, member_age + 6);
  }

  // :228-229 （stick增加）后代年龄按相当于人类 10 岁设定
  if (era.get(`ex_talent:${cid}:2`)) age = 10;

  const race_age = race_age_generate(age, t(314), rand); // :234-235

  // :240-241 人类年龄低于 14 即为未熟（TALENT:135，train 域属性，走门面）
  if (age <= 14) chara(cid).train.未熟 = 1;
  return [age, race_age];
}

/**
 * @CHAR_BODY_GENERATE_WAPPED（:16-36）：生成角色身体数据并落进 CFLAG:451-457。
 *
 * 开局设置（FLAG:5）位 12（显示年龄）与位 15（显示三围）都没开时整体不动
 * ——调用点（EVENTFIRST / CHARA_MAKE / ENTER_ENEMY 等）无条件调用，闸门
 * 在这两行里（:18-19）。
 *
 * 默认年龄由 CHAR_SIZE_GENERATE → CHAR_AGE_GENERATE 生成；村娘 A（165）与
 * 村娘 B（171）另有固定年龄区间（:22-25）。
 *
 * @param {number} cid 角色 ID（ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
function char_body_generate_wapped(cid, rand = default_rand) {
  const settings = era.get('flag:5') || 0; // FLAG:5 开局设置位图
  // :18-19 SIF !GETBIT(FLAG:5,12) && !GETBIT(FLAG:5,15) RETURN
  if (((settings >> 12) & 1) === 0 && ((settings >> 15) & 1) === 0) return;

  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  let age = 0;
  if (t(165))
    age = rand(2) + 12; // :23 村娘Ａ
  else if (t(171)) age = rand(2) + 17; // :25 村娘Ｂ
  const body = char_size_generate(cid, age, 0, rand); // :27 缺省年龄交回年龄生成

  // :30-36 CFLAG:451-457 = RESULT:0-6
  for (let offset = 0; offset < 7; offset += 1) {
    era.set(`cflag:${cid}:${451 + offset}`, body[offset]);
  }
}

/**
 * 源: target/ERB/キャラ関数/CHARA_BODY2.ERB:2-14 @CHAR_BUST_REGENERATE_WAPPED
 *
 * 角色定制里切换胸围类素质（绝壁/贫乳/巨乳/爆乳/超乳）后重掷三围。
 * FLAG:5 位 15（显示三围开关）关闭时整体不动（:4-5）；CFLAG:451（年龄）或
 * CFLAG:453（身高）任一缺失时退化为全身重生成（:7-8）；否则只重算胸围、
 * 只写 CFLAG:455，不碰 458/459（下方 :11/:12 两行）——**不要**改用 `char_size_generate`
 * 的 mode=1 分支代替：那条分支额外做了四项素质加成（t(100)&&t(110)、
 * t(99)、exp:60、t(130)&&t(119)，见 CHAR_SIZE_GENERATE:445-460），源码原
 * 文里 `CHAR_BUST_REGENERATE_WAPPED` 没有这些，两者不等价。
 *
 * @param {number} cid 角色 ID（ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
function char_bust_regenerate_wapped(cid, rand = default_rand) {
  const settings = era.get('flag:5') || 0;
  if (((settings >> 15) & 1) === 0) return; // :4-5

  const age = era.get(`cflag:${cid}:451`) || 0;
  const height = era.get(`cflag:${cid}:453`) || 0;
  if (!age || !height) {
    char_body_generate_wapped(cid, rand); // :7-8
    return;
  }

  const [bust] = char_bust_generate(cid, age, height * 100, rand); // :11
  era.set(`cflag:${cid}:455`, int(bust / 100)); // :12
}

/**
 * @CHAR_SIZE_GENERATE：生成身高、体重、胸围、腰围与臀围。
 * @param {number} cid 角色 ID
 * @param {number} [source_age=0] 人类换算年龄；0 表示委托年龄生成
 * @param {number} [mode=0] 0=全部生成，1=只重算胸围及其体重差
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {number[]} [年龄, 种族年龄, 身高, 体重, 胸围, 腰围, 臀围]
 */
function char_size_generate(
  cid,
  source_age = 0,
  mode = 0,
  rand = default_rand,
) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  let age = source_age;
  let race_age = 0;
  let height;
  let weight;
  let waist = 0;
  let hip = 0;
  let previous_under = 0;
  let previous_difference = 0;
  if (age <= 0) [age, race_age] = char_age_generate(cid, rand);

  if (mode === 1) {
    height = (era.get(`cflag:${cid}:453`) || 0) * 100; // CFLAG:453 身高
    weight = (era.get(`cflag:${cid}:454`) || 0) * 100; // CFLAG:454 体重
    previous_difference = (era.get(`cflag:${cid}:458`) || 0) * 100; // 胸围差
    previous_under = (era.get(`cflag:${cid}:459`) || 0) * 100; // 下胸围
  } else {
    [height, weight] = char_hweight_generate(cid, age, rand);
    waist = int((height * (3700 + t(308))) / 10000);
    if (t(122)) waist += 8000 - rand(4000);
    if (waist > 60000) waist = int((waist * 983) / 1000);
    if (t(91)) waist = int((waist * 96) / 100);
    if (t(248)) waist = int((waist * 102) / 100);
    if (t(248) && t(122)) waist = int((waist * 105) / 100);
    if (t(115)) waist = int((waist * 115) / 100);
    if (t(256)) waist = int((waist * 98) / 100);
    if (t(314) === 11) waist = int((waist * 104) / 100);
  }

  let [bust, bust_under, bust_difference] = char_bust_generate(
    cid,
    age,
    height,
    rand,
  );
  if (t(100) && t(110)) bust_difference += 1500 + rand(1000);
  if (t(99)) bust_difference -= 2000 + rand(1000);
  if (era.get(`exp:${cid}:60`)) bust_difference += 200 + rand(800); // EXP:60 出产经验
  if (t(130) && t(119)) bust_difference += 8500 + rand(4000);
  bust = bust_under + bust_difference;
  era.set(`cflag:${cid}:458`, int(bust_difference / 100));
  era.set(`cflag:${cid}:459`, int(bust_under / 100));

  if (mode !== 1) {
    hip = int((height * (5300 + t(308))) / 10000);
    if (t(91)) hip += 1500;
    if (t(248)) hip = int((hip * 102) / 100);
    if (t(256)) hip = int((hip * 98) / 100);
    if (t(100)) hip = int(hip * 0.96);
    if (t(122)) hip = int(hip * 0.9);
    if (t(115)) hip = int((hip * 115) / 100);
    if (age < 16)
      hip = Math.max(Math.min(hip, bust + Math.max(age - 12, 0) * 1000), waist);
  }

  let bust_weight = int((bust_under * bust_under) / 100000000);
  bust_weight = int((bust_weight * bust_difference) / 100000);
  bust_weight = int((bust_weight * bust_difference) / 100000);
  if (mode === 1) {
    let previous = int((previous_under * previous_under) / 100000000);
    previous = int((previous * previous_difference) / 100000);
    previous = int((previous * previous_difference) / 100000);
    bust_weight -= previous;
    era.set('e:1', bust_weight); // E:1 仅胸围变化造成的重量差
  }
  weight += bust_weight * 250;
  if (t(314) === 0) race_age = age;
  return [
    age,
    race_age,
    int(height / 100),
    int(weight / 100),
    int(bust / 100),
    int(waist / 100),
    int(hip / 100),
  ];
}

/**
 * 罩杯字母表（源 @CUP_SIZE :791-848 的 28 条 SIF）：CAL_VAR == N 时取
 * `CUP_LETTERS[N - 2]`。下标 0 是 AAA（CAL_VAR 2），末位 Z（CAL_VAR 29）。
 */
const CUP_LETTERS = [
  'AAA',
  'AA',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

/**
 * @CUP_SIZE（:781-850）：罩杯字母。CFLAG:455（上胸围 ×10）减 UNDER_BUST
 * 再整除 25 得 CAL_VAR；CAL_VAR ≤ 1 一律「-」（原作 :791-792 只写这一档），
 * 2..29 查 28 档字母表。
 *
 * **有意偏离**：CAL_VAR ≥ 30 时原作不写 RESULTS:0（残留上一次取值），ere 侧
 * 没有 RESULTS 残留通道，取空串——正常数据下该档不可达（生成上限正好落在
 * Z = 29，见 CHAR_BUST_GENERATE 的各档加成上沿）。
 *
 * @param {number} cid 角色 ID（源 ARG）
 * @returns {string} 罩杯字母；CAL_VAR ≤ 1 时 `'-'`
 */
function cup_size(cid) {
  // :788 CALL UNDER_BUST, ARG, CFLAG:ARG:453（身高 ×10 直接传入）
  const height10 = era.get(`cflag:${cid}:453`) || 0; // CFLAG:453 身高(×10)
  const bust10 = era.get(`cflag:${cid}:455`) || 0; // CFLAG:455 上胸围(×10)
  const cal_var = int((bust10 - under_bust(cid, height10)) / 25); // :790
  if (cal_var <= 1) return '-'; // :791-792
  return CUP_LETTERS[cal_var - 2] ?? '';
}

module.exports = {
  char_age_generate,
  char_body_generate_wapped,
  char_bust_generate,
  char_bust_regenerate_wapped,
  char_size_generate,
  cup_size,
  human_age_generate,
  race_age_generate,
  race_config_value,
  unpack_race_config,
};
