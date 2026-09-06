/**
 * @file 角色身高、体重与三围生成（issue #332）。
 *
 * 源: target/ERB/キャラ関数/CHARA_BODY.ERB  @CHAR_SIZE_GENERATE（:408-761）、
 *       @UNDER_BUST（:763-779）
 *     target/ERB/キャラ関数/CHARA_BODY2.ERB  @CHAR_HWEIGHT_GENERATE（:17-120）、
 *       @CHAR_BUST_GENERATE（:123-323）、@NORMAL_RANGE_PICKUP（:326-358）、
 *       @STATISTICS_WOMAN（:361-385）、@STATISTICS_MAN（:388-412）
 *
 * BODY2 的四段只作为 CHAR_SIZE_GENERATE 的私有计算步骤，不扩大公开 API。
 */

const era = require('#/era-electron');
const { stub_line } = require('#/utils/stub-line');

const STUBBED_CALLS = ['CHAR_AGE_GENERATE'];
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

/** @CHAR_AGE_GENERATE 的范围外存根。 */
function char_age_generate(cid) {
  stub_line('CHAR_AGE_GENERATE', `角色 ${cid}`, '随角色身体票');
  return [0, 0];
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
  if (age <= 0) [age, race_age] = char_age_generate(cid);

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

module.exports = { STUBBED_CALLS, char_age_generate, char_size_generate };
