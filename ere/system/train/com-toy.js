/**
 * @file 调教指令 10–19「道具使用」族：@COM10–19 真身 + @EQUIP_COM11/13–19
 * 持续效果 + @COM_ABLE10–19 可用性 + TRAIN_MESSAGE_A/B 分支（issue #220，
 * J10——#209 裁定 6 的「四样装齐」）。
 *
 * 源: target/ERB/調教相關/COMF10_振動の宝石.ERB @COM10（:8-52）
 *     target/ERB/調教相關/COMF11_バイブ.ERB       @COM11（:7-171）+ @EQUIP_COM11（:177-334）
 *     target/ERB/調教相關/COMF12_振動の杖.ERB     @COM12（:9-53）
 *     target/ERB/調教相關/COMF13_アナルワーム.ERB @COM13（:7-198）+ @EQUIP_COM13（:204-377）
 *     target/ERB/調教相關/COMF14_クリキャップ.ERB @COM14（:7-67）+ @EQUIP_COM14（:73-139）
 *     target/ERB/調教相關/COMF15_二プルキャップ.ERB @COM15（:7-86）+ @EQUIP_COM15（:92-168）
 *     target/ERB/調教相關/COMF16_搾乳器.ERB       @COM16（:7-98）+ @EQUIP_COM16（:104-221）
 *     target/ERB/調教相關/COMF17_オナホール.ERB   @COM17（:7-70）+ @EQUIP_COM17（:76-153）
 *     target/ERB/調教相關/COMF18_シャワー.ERB     @COM18（:7-105）+ @EQUIP_COM18（:111-204）
 *     target/ERB/調教相關/COMF19_アナルビーズ.ERB @COM19（:7-155）+ @EQUIP_COM19（:161-310）
 *     target/ERB/調教相關/COMABLE.ERB             @COM_ABLE10–19（:382-859）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB   SELECTCOM 10–19（:783-1013）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB   SELECTCOM 10–14（:986-1149）
 *
 * == 变量承载 ==
 *
 * - SOURCE/UP/LOSEBASE 分别落 source/delta/deltabase；后者以负值累计，结算由
 *   source-check 与回合循环消费。
 * - TEQUIP:11/13–19、STAIN、TFLAG:19、T:0 都属 train，可在本域直写。
 * - EXP:0/1 属 dungeon，统一经 chara(cid).dungeon；EXP:40/41/54 属 train，
 *   经 chara(cid).train。TALENT:190/191 属 dungeon，经其门面写入。
 * - @SYOKUSYU_MILK 真身在 COMF100_触手召喚.ERB，随 #227/J17；本文件仅按
 *   COMF16:216-219 保留运行时存根调用。
 *
 * 本族没有 COMF_JUMP.ERB 的 @GET_ADV_COM CASE，故无 adv_com_family 注册。
 * TRAIN_MESSAGE_A 原作仅有 10–14；15–19 显式注册无操作，避免分发骨架错误地
 * 输出「尚未移植」占位。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const {
  com_able_family,
  com_family,
  equip_com_family,
} = require('#/system/train/com-family');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');
const { confirm_lost_virgin } = require('#/system/train/com-vaginasex');
const { EXPLV } = require('#/era-utils/exp-level');
const { PALAMLV } = require('#/era-utils/palam-level');
const { stub_line } = require('#/utils/stub-line');

/** 本文件运行时存根；docs/stub-registry.md 必须同步登记。 */
const STUBBED_CALLS = ['SYOKUSYU_MILK'];

// —— 读数兜底（未声明下标 undefined → 0，#13） ——

const tq = (cid, i) => era.get(`tequip:${cid}:${i}`) || 0;
const set_tq = (cid, i, v) => era.set(`tequip:${cid}:${i}`, v);
const src = (cid, i) => era.get(`source:${cid}:${i}`) || 0;
const set_src = (cid, i, v) => era.set(`source:${cid}:${i}`, v);
const abl = (cid, i) => Math.floor(era.get(`abl:${cid}:${i}`) || 0);
const tal = (cid, i) => era.get(`talent:${cid}:${i}`) || 0;
const palam = (cid, i) => era.get(`palam:${cid}:${i}`) || 0;
const exp = (cid, i) => era.get(`exp:${cid}:${i}`) || 0;
const add_lose = (cid, i, v) => era.add(`deltabase:${cid}:${i}`, -v);
const times = (v, m) => Math.floor(v * m);
const noitem = () => era.get('noitem:0') || 0;
const has_item = (i) => (era.get(`item:${i}`) || 0) > 0 || noitem() !== 0;
const target_name = () => chara_callname(era_flag.target);
const player_name = () => chara_callname(era_flag.player);

/** T:0 = 触手回合计数；本族切换装备后清零、持续效果中递增。 */
function reset_tentacle_turn(cid) {
  if (tq(cid, 90)) {
    era.set('t:0', 0);
  }
}

/** 同性经验：双方皆非男人 → 百合；双方皆男人 → 断背。 */
function same_sex_exp(cid, player, gain) {
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(`百合经验+${gain}`);
    chara(cid).train.百合经验 += gain;
  } else if (tal(cid, 122) && tal(player, 122)) {
    era.print(`断背经验+${gain}`);
    chara(cid).train.断背经验 += gain;
  }
}

/** ABL 0–4、其余归末档的梯子。 */
const ladder = (cid, index, values) => values[Math.min(abl(cid, index), 5)];

/** PALAM:5（欲情）的五档系数。 */
function lust_factor(cid) {
  const v = palam(cid, 5);
  return v < PALAMLV[1]
    ? 0.8
    : v < PALAMLV[2]
      ? 0.9
      : v < PALAMLV[3]
        ? 1
        : v < PALAMLV[4]
          ? 1.1
          : 1.2;
}

/** ABL:10（顺从）的道具器械系数。 */
const obey_factor = (cid) =>
  [0.8, 0.9, 1, 1.1, 1.2, 1.3][Math.min(abl(cid, 10), 5)];

/** ABL:10 对肛门虫逸脱 SOURCE:14 的反向系数。 */
const anal_escape_factor = (cid) =>
  [2, 1.5, 1, 0.8, 0.6, 0.3][Math.min(abl(cid, 10), 5)];

/** COM13 肛门虫的 ABL:10 快感系数：顺从 2 以上原作不再放大。 */
const anal_worm_obey_factor = (cid) =>
  [0.8, 0.9, 1, 1, 1, 1][Math.min(abl(cid, 10), 5)];

/** TALENT:99/100/135 对苦痛 SOURCE:6 的共通顺序乘法。 */
function pain_body_factor(cid, value, small = 2, immature = 2) {
  let out = value;
  if (tal(cid, 99)) {
    out = times(out, 0.8);
  }
  if (tal(cid, 100)) {
    out = times(out, small);
  }
  if (tal(cid, 135)) {
    out = times(out, immature);
  }
  return out;
}

/** TALENT:105 钝感 / 106 敏感对肛门相关三格的修正。 */
function anal_sense_factor(cid, value) {
  if (tal(cid, 105)) {
    return times(value, 1.5);
  }
  if (tal(cid, 106)) {
    return times(value, 0.6);
  }
  return value;
}

/** 原作「处女且看重贞操」的 SOURCE:13 整数除法。 */
function divide_chastity_source(cid) {
  if (exp(cid, 0) === 0 && tal(cid, 30)) {
    set_src(cid, 13, Math.floor(src(cid, 13) / 3));
  }
}

/** 触手污渍：装备切到装着侧时，把指定部位置精液／大量精液位。 */
function tentacle_stain(cid, tequip_index, stain_index) {
  if (tq(cid, 90) && tq(cid, tequip_index)) {
    era.set(
      `stain:${cid}:${stain_index}`,
      (era.get(`stain:${cid}:${stain_index}`) || 0) | 2 | 4,
    );
  }
}

/** 满月确认：原作 INPUT 0 继续、非 0 取消。 */
async function confirm_full_moon() {
  era.print('*满月是蠕虫的产卵期，要继续吗？*');
  era.print('[0] 好的 [1] 算了');
  return (await era.input()) === 0;
}

/** 统一的污渍与参数清洗（COM18 / EQUIP_COM18 的同款尾段）。 */
function shower_clean(cid) {
  for (const [i, value] of [
    [0, 0],
    [1, 0],
    [2, 2],
    [3, 1],
    [4, 8],
    [5, 0],
  ]) {
    era.set(`stain:${cid}:${i}`, value);
  }
  era.set(`palam:${cid}:3`, Math.floor(palam(cid, 3) / 2));
  era.set(`palam:${cid}:12`, Math.floor(palam(cid, 12) / 2));
}

/** @COM10（COMF10:8-52）。 */
async function com10() {
  const target = era_flag.target;
  era.print('振动宝石');
  await train_message_b();
  add_lose(target, 0, 10);
  add_lose(target, 1, 80);
  set_src(target, 12, 120);
  set_src(target, 14, 70);
  set_src(target, 0, ladder(target, 0, [200, 400, 900, 1600, 2400, 3000]));
  same_sex_exp(target, era_flag.player, 1);
  return 1;
}

/** @COM12（COMF12:9-53）。 */
async function com12() {
  const target = era_flag.target;
  era.print('振动杖');
  await train_message_b();
  add_lose(target, 0, 30);
  add_lose(target, 1, 150);
  set_src(target, 12, 120);
  set_src(target, 14, 400);
  set_src(target, 0, ladder(target, 0, [2000, 2500, 3000, 3300, 3600, 3800]));
  same_sex_exp(target, era_flag.player, 1);
  return 1;
}

/** @COM11（COMF11:7-171）：蠕虫装着/解除；返回 0 是回合取消。 */
async function com11() {
  const target = era_flag.target;
  if ((await confirm_lost_virgin()) === 0) {
    return 0;
  }
  era.print(tq(target, 90) ? '触手插入' : '蠕虫');
  if (
    era_flag.date === 15 &&
    !chara(target).dungeon.私处产卵 &&
    !(await confirm_full_moon())
  ) {
    return 0;
  }
  await train_message_b();
  add_lose(target, 0, 30);
  add_lose(target, 1, 100);

  let a = ladder(target, 2, [80, 250, 600, 1000, 1300, 1700]);
  let b;
  const vagina_exp = exp(target, 0);
  if (vagina_exp < EXPLV[1]) {
    a = times(a, 0.2);
    b = 5500;
  } else if (vagina_exp < EXPLV[2]) {
    a = times(a, 0.6);
    b = 300;
  } else if (vagina_exp < EXPLV[3]) {
    b = 50;
  } else if (vagina_exp < EXPLV[4]) {
    a = times(a, 1.2);
    b = 10;
  } else if (vagina_exp < EXPLV[5]) {
    a = times(a, 1.4);
    b = 0;
  } else {
    a = times(a, 1.6);
    b = 0;
  }
  const wet = palam(target, 3);
  if (wet < PALAMLV[1]) {
    a = times(a, 0.1);
    b = times(b + 1000, 3);
  } else if (wet < PALAMLV[2]) {
    a = times(a, 0.4);
    b += 400;
  } else if (wet < PALAMLV[3]) {
    b = times(b, 0.5);
  } else if (wet < PALAMLV[4]) {
    a = times(a, 1.4);
    b = times(b, 0.2);
  } else {
    a = times(a, 1.8);
    b = times(b, 0.1);
  }
  a = times(a, lust_factor(target));
  a = times(a, obey_factor(target));
  b = pain_body_factor(target, b, 2, 4);
  set_src(target, 1, a);
  set_src(target, 6, b);

  const gain =
    abl(target, 2) <= 1
      ? 1
      : abl(target, 2) <= 4
        ? 2
        : abl(target, 2) <= 7
          ? 3
          : 4;
  chara(target).dungeon.私处经验 += gain;
  era.print(`私处经验+${gain}`);
  if (!tal(target, 122) && !tal(era_flag.player, 122)) {
    era.print('百合经验+3');
    chara(target).train.百合经验 += 3;
  }
  set_tq(target, 11, 1 - tq(target, 11));
  reset_tentacle_turn(target);
  tentacle_stain(target, 11, 3);
  return 1;
}

/** @COM13（COMF13:7-198）：肛门虫装着/解除；返回 0 是满月输入取消。 */
async function com13() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '肛门触手' : '肛门虫');
  if (
    era_flag.date === 15 &&
    !chara(target).dungeon.直肠产卵 &&
    !(await confirm_full_moon())
  ) {
    return 0;
  }
  await train_message_b();
  add_lose(target, 0, 60);
  add_lose(target, 1, 150);
  set_src(target, 14, 300);
  const [base_anal, base_submit] = ladder(target, 3, [
    [80, 300],
    [250, 800],
    [600, 1400],
    [1000, 1800],
    [1300, 2100],
    [1700, 2400],
  ]);
  let a = base_anal;
  let c = base_submit;
  let pain;
  const anal_exp = exp(target, 1);
  if (anal_exp < EXPLV[1]) {
    a = times(a, 0.5);
    pain = 2000;
    set_src(target, 14, src(target, 14) + 200);
  } else if (anal_exp < EXPLV[2]) {
    pain = 300;
    set_src(target, 14, src(target, 14) + 100);
  } else if (anal_exp < EXPLV[3]) {
    a = times(a, 1.1);
    pain = 50;
    set_src(target, 14, src(target, 14) + 50);
  } else if (anal_exp < EXPLV[4]) {
    a = times(a, 1.2);
    pain = 10;
  } else if (anal_exp < EXPLV[5]) {
    a = times(a, 1.4);
    pain = 0;
  } else {
    a = times(a, 1.6);
    pain = 0;
  }
  const wet = palam(target, 3);
  if (wet < PALAMLV[1]) {
    a = times(a, 0.4);
    pain += 800;
  } else if (wet < PALAMLV[2]) {
    a = times(a, 0.8);
    pain += 500;
  } else if (wet < PALAMLV[3]) {
    pain += 300;
  } else if (wet < PALAMLV[4]) {
    a = times(a, 1.4);
    pain += 120;
  } else {
    a = times(a, 1.8);
    pain += 100;
  }
  a = times(a, lust_factor(target));
  a = times(a, anal_worm_obey_factor(target));
  set_src(target, 2, a);
  set_src(target, 13, c);
  set_src(target, 6, pain_body_factor(target, pain));
  set_src(target, 14, times(src(target, 14), anal_escape_factor(target)));
  for (const index of [6, 13, 14]) {
    set_src(target, index, anal_sense_factor(target, src(target, index)));
  }
  divide_chastity_source(target);

  const gain =
    abl(target, 3) <= 1
      ? 1
      : abl(target, 3) <= 4
        ? 2
        : abl(target, 3) <= 7
          ? 3
          : 4;
  chara(target).dungeon.肛门经验 += gain;
  era.print(`肛门经验+${gain}`);
  same_sex_exp(target, era_flag.player, 1);
  set_tq(target, 13, 1 - tq(target, 13));
  reset_tentacle_turn(target);
  tentacle_stain(target, 13, 4);
  return 1;
}

/** @COM14（COMF14:7-67）。 */
async function com14() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '触手凌辱阴蒂' : '电动阴蒂夹');
  await train_message_b();
  add_lose(target, 0, 10);
  add_lose(target, 1, 80);
  set_src(target, 12, 120);
  set_src(target, 14, 70);
  set_src(target, 0, ladder(target, 0, [200, 400, 900, 1600, 2400, 3000]));
  if (!tal(target, 122) && !tal(era_flag.player, 122)) {
    era.print('百合经验+1');
    chara(target).train.百合经验 += 1;
  }
  set_tq(target, 14, 1 - tq(target, 14));
  reset_tentacle_turn(target);
  tentacle_stain(target, 14, 3);
  return 1;
}

/** @COM15（COMF15:7-86）。 */
async function com15() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '触手凌辱乳头' : '乳头夹');
  await train_message_b();
  add_lose(target, 0, 20);
  add_lose(target, 1, 70);
  set_src(target, 12, 120);
  set_src(target, 14, 70);
  let a = ladder(target, 1, [100, 300, 800, 1500, 2300, 2900]);
  if (tal(era_flag.player, 131)) {
    set_src(target, 17, times(src(target, 17), 1.2));
  }
  if (tal(era_flag.player, 132)) {
    set_src(target, 17, times(src(target, 17), 1.2));
  }
  if (tal(target, 110)) {
    a = times(a, 1.5);
  }
  if (tal(target, 108)) {
    a = times(a, 1.5);
  } else if (tal(target, 107)) {
    a = times(a, 0.6);
  }
  set_src(target, 17, src(target, 17) + a);
  same_sex_exp(target, era_flag.player, 1);
  set_tq(target, 15, 1 - tq(target, 15));
  reset_tentacle_turn(target);
  tentacle_stain(target, 15, 5);
  return 1;
}

/** @COM16（COMF16:7-98）。 */
async function com16() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '触手榨乳' : '榨乳器');
  await train_message_b();
  add_lose(target, 0, 50);
  add_lose(target, 1, 100);
  for (const index of [4, 5, 6, 7, 12, 13, 16]) {
    set_src(target, index, 100);
  }
  let a = ladder(target, 1, [200, 400, 900, 1600, 2400, 3000]);
  if (tal(target, 110)) {
    a = times(a, 1.5);
  } else if (tal(target, 114)) {
    a = times(a, 1.8);
  } else if (tal(target, 119)) {
    a = times(a, 2);
  }
  if (tal(target, 108)) {
    a = times(a, 1.5);
  } else if (tal(target, 107)) {
    a = times(a, 0.6);
  }
  if (tal(target, 116)) {
    set_src(target, 6, times(src(target, 6), 1.8));
  }
  if (tal(target, 109)) {
    set_src(target, 6, times(src(target, 6), 1.5));
  }
  set_src(target, 17, src(target, 17) + a);
  same_sex_exp(target, era_flag.player, 1);
  set_tq(target, 16, 1 - tq(target, 16));
  reset_tentacle_turn(target);
  tentacle_stain(target, 16, 5);
  return 1;
}

/** @COM17（COMF17:7-70）。 */
async function com17() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '触手凌辱阴茎' : '飞机杯');
  await train_message_b();
  add_lose(target, 0, 10);
  add_lose(target, 1, 80);
  set_src(target, 12, 120);
  set_src(target, 14, 70);
  set_src(target, 0, ladder(target, 0, [200, 400, 900, 1600, 2400, 3000]));
  same_sex_exp(target, era_flag.player, 1);
  set_tq(target, 17, 1 - tq(target, 17));
  reset_tentacle_turn(target);
  tentacle_stain(target, 17, 3);
  return 1;
}

/** @COM18（COMF18:7-105）。 */
async function com18() {
  const target = era_flag.target;
  era.print('淋浴');
  await train_message_b();
  add_lose(target, 1, 10);
  set_src(target, 14, 50);
  set_src(target, 5, 400);
  set_src(target, 16, 200);
  set_src(
    target,
    12,
    palam(target, 5) < PALAMLV[1]
      ? 10
      : palam(target, 5) < PALAMLV[2]
        ? 30
        : palam(target, 5) < PALAMLV[3]
          ? 60
          : palam(target, 5) < PALAMLV[4]
            ? 100
            : 150,
  );
  set_src(target, 3, ladder(target, 16, [0, 20, 40, 70, 110, 150]));
  set_src(target, 5, times(src(target, 5), obey_factor(target)));
  if (tal(target, 124)) {
    set_src(target, 14, times(src(target, 14), 1.6));
    set_src(target, 13, times(src(target, 13), 1.5));
    set_src(target, 15, times(src(target, 15), 2));
  }
  same_sex_exp(target, era_flag.player, 1);
  set_tq(target, 18, 1 - tq(target, 18));
  shower_clean(target);
  return 1;
}

/** @COM19（COMF19:7-155）。 */
async function com19() {
  const target = era_flag.target;
  era.print('肛珠');
  await train_message_b();
  add_lose(target, 0, 60);
  add_lose(target, 1, 150);
  const [base_anal, base_submit] = ladder(target, 3, [
    [80, 300],
    [250, 800],
    [600, 1400],
    [1000, 1800],
    [1300, 2100],
    [1700, 2400],
  ]);
  let a = base_anal;
  let pain;
  const anal_exp = exp(target, 1);
  if (anal_exp < EXPLV[1]) {
    a = times(a, 0.5);
    pain = 2000;
  } else if (anal_exp < EXPLV[2]) {
    pain = 300;
  } else if (anal_exp < EXPLV[3]) {
    a = times(a, 1.1);
    pain = 50;
  } else if (anal_exp < EXPLV[4]) {
    a = times(a, 1.2);
    pain = 10;
  } else if (anal_exp < EXPLV[5]) {
    a = times(a, 1.4);
    pain = 0;
  } else {
    a = times(a, 1.6);
    pain = 0;
  }
  const wet = palam(target, 3);
  if (wet < PALAMLV[1]) {
    a = times(a, 0.4);
    pain += 1200;
  } else if (wet < PALAMLV[2]) {
    a = times(a, 0.8);
    pain += 700;
  } else if (wet < PALAMLV[3]) {
    pain += 400;
  } else if (wet < PALAMLV[4]) {
    a = times(a, 1.4);
    pain += 150;
  } else {
    a = times(a, 1.8);
    pain += 100;
  }
  a = times(a, lust_factor(target));
  a = times(a, obey_factor(target));
  set_src(target, 2, a);
  set_src(target, 13, base_submit);
  set_src(target, 6, pain_body_factor(target, pain));
  for (const index of [6, 13, 14]) {
    set_src(target, index, anal_sense_factor(target, src(target, index)));
  }
  divide_chastity_source(target);
  const equipped = tq(target, 19);
  set_src(target, 2, times(src(target, 2), equipped ? 3 : 0.8));
  const gain = equipped ? 2 : 1;
  chara(target).dungeon.肛门经验 += gain;
  era.print(equipped ? '肛门经验＋２' : '肛门经验＋１');
  set_tq(target, 19, 1 - equipped);
  return 1;
}

// —— @EQUIP_COM11 / 13–19（由 source-check 按 EQUIP_COM_CHAIN 调用） ——

/** @EQUIP_COM11（COMF11:177-334）。 */
async function equip_com11(rand = (n) => Math.floor(Math.random() * n)) {
  const target = era_flag.target;
  era.set('tflag:19', 1);
  era.print(tq(target, 90) ? '＜触手插入中＞' : '＜蠕虫插入中＞');
  if (era_flag.date === 15 && rand(3) === 0) {
    await era.printAndWait(`${target_name()}的生殖器里，蠕虫产下了大量的卵……`);
    if (!chara(target).dungeon.私处产卵) {
      await era.printAndWait(`${target_name()}获得【私处产卵】了。`);
    }
    chara(target).dungeon.私处产卵 = 1;
  }
  add_lose(target, 0, 10);
  add_lose(target, 1, 50);
  let a = ladder(target, 2, [40, 120, 300, 500, 650, 850]);
  const vagina_exp = exp(target, 0);
  let b;
  if (vagina_exp < EXPLV[2]) {
    a = times(a, 0.6);
    b = 150;
  } else if (vagina_exp < EXPLV[3]) {
    b = 20;
  } else if (vagina_exp < EXPLV[4]) {
    a = times(a, 1.2);
    b = 0;
  } else if (vagina_exp < EXPLV[5]) {
    a = times(a, 1.4);
    b = 0;
  } else {
    a = times(a, 1.6);
    b = 0;
  }
  const wet = palam(target, 3);
  if (wet < PALAMLV[1]) {
    a = times(a, 0.1);
    b = times(b + 400, 3);
  } else if (wet < PALAMLV[2]) {
    a = times(a, 0.4);
    b += 150;
  } else if (wet < PALAMLV[3]) {
    b = times(b, 0.5);
  } else if (wet < PALAMLV[4]) {
    a = times(a, 1.4);
    b = times(b, 0.2);
  } else {
    a = times(a, 1.8);
    b = times(b, 0.1);
  }
  a = times(a, lust_factor(target));
  a = times(a, obey_factor(target));
  b = pain_body_factor(target, b, 2, 4);
  if (tal(target, 30)) {
    b = times(b, 3);
  }
  set_src(target, 1, src(target, 1) + a);
  set_src(target, 6, src(target, 6) + b);
  const gain =
    (era_flag.selectcom === 3 ? 1 : 0) +
    (abl(target, 2) <= 1
      ? 1
      : abl(target, 2) <= 4
        ? 2
        : abl(target, 2) <= 7
          ? 3
          : 4);
  chara(target).dungeon.私处经验 += gain;
  era.print(`私处经验+${gain}`);
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }
  return 1;
}

/** @EQUIP_COM13（COMF13:204-377）。 */
async function equip_com13(rand = (n) => Math.floor(Math.random() * n)) {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '＜肛门触手插入中＞' : '＜肛门虫插入中＞');
  if (era_flag.date === 15 && rand(3) === 0) {
    await era.printAndWait(`${target_name()}的直肠里，蠕虫产下了大量的卵……`);
    if (!chara(target).dungeon.直肠产卵) {
      await era.printAndWait(`${target_name()}获得【直肠产卵】了。`);
    }
    chara(target).dungeon.直肠产卵 = 1;
  }
  add_lose(target, 0, 30);
  add_lose(target, 1, 80);
  set_src(target, 14, 200);
  const [base_anal, base_submit] = ladder(target, 3, [
    [40, 300],
    [120, 800],
    [300, 1400],
    [500, 1800],
    [650, 2100],
    [850, 2400],
  ]);
  let a = base_anal;
  let pain;
  const anal_exp = exp(target, 1);
  if (anal_exp < EXPLV[1]) {
    a = times(a, 0.5);
    pain = 2000;
  } else if (anal_exp < EXPLV[2]) {
    pain = 300;
  } else if (anal_exp < EXPLV[3]) {
    a = times(a, 1.1);
    pain = 50;
  } else if (anal_exp < EXPLV[4]) {
    a = times(a, 1.2);
    pain = 10;
  } else if (anal_exp < EXPLV[5]) {
    a = times(a, 1.4);
    pain = 0;
  } else {
    a = times(a, 1.6);
    pain = 0;
  }
  const wet = palam(target, 3);
  if (wet < PALAMLV[1]) {
    a = times(a, 0.4);
    pain += 800;
  } else if (wet < PALAMLV[2]) {
    a = times(a, 0.8);
    pain += 500;
  } else if (wet < PALAMLV[3]) {
    pain += 300;
  } else if (wet < PALAMLV[4]) {
    a = times(a, 1.4);
    pain += 120;
  } else {
    a = times(a, 1.8);
    pain += 100;
  }
  a = times(a, lust_factor(target));
  a = times(a, anal_worm_obey_factor(target));
  set_src(target, 14, times(src(target, 14), anal_escape_factor(target)));
  if (tal(target, 135)) {
    set_src(target, 6, times(src(target, 6), 2));
  }
  for (const index of [6, 13, 14]) {
    set_src(target, index, anal_sense_factor(target, src(target, index)));
  }
  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + base_submit);
  let adjusted_pain = pain;
  if (tal(target, 99)) {
    adjusted_pain = times(adjusted_pain, 0.8);
  }
  if (tal(target, 100)) {
    adjusted_pain = times(adjusted_pain, 2);
  }
  set_src(target, 6, src(target, 6) + adjusted_pain);
  if (tal(target, 0) && tal(target, 30)) {
    set_src(target, 13, times(src(target, 13), 0.8));
    set_src(target, 14, times(src(target, 14), 0.5));
  }
  const gain =
    (era_flag.selectcom === 3 ? 1 : 0) +
    (abl(target, 3) <= 1
      ? 1
      : abl(target, 3) <= 4
        ? 2
        : abl(target, 3) <= 7
          ? 3
          : 4);
  chara(target).dungeon.肛门经验 += gain;
  era.print(`肛门经验+${gain}`);
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }
  return 1;
}

/** 阴蒂夹／乳头夹／飞机杯持续效果的共同快感链。 */
function simple_equip_pleasure(cid, ability) {
  let a = ladder(cid, ability, [40, 120, 250, 450, 600, 750]);
  a = times(a, lust_factor(cid));
  return times(a, obey_factor(cid));
}

/** @EQUIP_COM14（COMF14:73-139）。 */
async function equip_com14() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '＜触手玩弄阴蒂中＞' : '＜阴蒂夹装备中＞');
  add_lose(target, 0, 5);
  add_lose(target, 1, 20);
  set_src(target, 0, src(target, 0) + simple_equip_pleasure(target, 0));
  set_src(target, 11, src(target, 11) + 50);
  set_src(target, 12, src(target, 12) + 50);
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }
  return 1;
}

/** @EQUIP_COM15（COMF15:92-168）。 */
async function equip_com15() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '＜触手玩弄乳头中＞' : '＜乳头夹装备中＞');
  add_lose(target, 0, 5);
  add_lose(target, 1, 20);
  set_src(target, 17, src(target, 17) + simple_equip_pleasure(target, 1));
  set_src(target, 11, src(target, 11) + 50);
  set_src(target, 12, src(target, 12) + 50);
  same_sex_exp(target, era_flag.player, 1);
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }
  return 1;
}

/** @EQUIP_COM16（COMF16:104-221）。 */
async function equip_com16() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '＜触手榨乳中＞' : '＜榨乳器装备中＞');
  add_lose(target, 0, 15);
  add_lose(target, 1, 15);
  let a = simple_equip_pleasure(target, 1);
  const milk_exp = exp(target, 54);
  if (milk_exp <= EXPLV[0]) {
    // ×1.00
  } else if (milk_exp <= EXPLV[1]) {
    a = times(a, 1.2);
  } else if (milk_exp <= EXPLV[2]) {
    a = times(a, 1.4);
  } else if (milk_exp <= EXPLV[3]) {
    a = times(a, 1.8);
  } else if (milk_exp <= EXPLV[4]) {
    a = times(a, 2.25);
  } else {
    a = times(a, 4);
  }
  if (tal(target, 110)) {
    a = times(a, 1.3);
  }
  if (tal(target, 108)) {
    a = times(a, 1.4);
  } else if (tal(target, 107)) {
    a = times(a, 0.6);
  }
  if (tal(target, 116)) {
    set_src(target, 6, times(src(target, 6), 1.8));
  }
  if (tal(target, 109)) {
    set_src(target, 6, times(src(target, 6), 1.5));
  }
  set_src(target, 17, src(target, 17) + a);
  for (const [index, value] of [
    [4, 150],
    [6, 100],
    [7, 100],
    [11, 50],
    [12, 50],
    [13, 50],
    [14, 50],
    [16, 50],
  ]) {
    set_src(target, index, src(target, index) + value);
  }
  same_sex_exp(target, era_flag.player, 1);
  if (tq(target, 90)) {
    era.add('t:0', 1);
    stub_line('SYOKUSYU_MILK', '触手榨乳处理', '真身随 #227/J17');
  }
  return 1;
}

/** @EQUIP_COM17（COMF17:76-153）。 */
async function equip_com17() {
  const target = era_flag.target;
  era.print(tq(target, 90) ? '＜触手玩弄阴茎中＞' : '＜飞机杯装备中＞');
  add_lose(target, 0, 5);
  add_lose(target, 1, 20);
  set_src(target, 0, src(target, 0) + simple_equip_pleasure(target, 0));
  set_src(target, 11, src(target, 11) + 50);
  set_src(target, 12, src(target, 12) + 50);
  same_sex_exp(target, era_flag.player, 1);
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }
  return 1;
}

/** 写淋浴的 SOURCE 主体（本体／持续版的固定量仅 5、16 与附加 11/12 不同）。 */
function shower_source(cid, equipped) {
  set_src(cid, 5, 400);
  set_src(cid, 16, equipped ? 300 : 200);
  set_src(
    cid,
    12,
    palam(cid, 5) < PALAMLV[1]
      ? 10
      : palam(cid, 5) < PALAMLV[2]
        ? 30
        : palam(cid, 5) < PALAMLV[3]
          ? 60
          : palam(cid, 5) < PALAMLV[4]
            ? 100
            : 150,
  );
  set_src(cid, 3, ladder(cid, 16, [0, 20, 40, 70, 110, 150]));
  set_src(cid, 5, times(src(cid, 5), obey_factor(cid)));
  if (equipped) {
    set_src(cid, 11, src(cid, 11) + 50);
    set_src(cid, 12, src(cid, 12) + 50);
  } else {
    set_src(cid, 14, 50);
  }
  if (tal(cid, 124)) {
    if (equipped) {
      set_src(cid, 15, 150);
    }
    set_src(cid, 14, times(src(cid, 14), 1.6));
    set_src(cid, 13, times(src(cid, 13), 1.5));
    set_src(cid, 15, times(src(cid, 15), 2));
  }
}

/** @EQUIP_COM18（COMF18:111-204）。 */
async function equip_com18() {
  const target = era_flag.target;
  era.print('＜淋浴中＞');
  add_lose(target, 1, 10);
  shower_source(target, true);
  same_sex_exp(target, era_flag.player, 1);
  shower_clean(target);
  return 1;
}

/** @EQUIP_COM19（COMF19:161-310）。 */
async function equip_com19() {
  const target = era_flag.target;
  era.print('＜肛珠装备中＞');
  add_lose(target, 0, 10);
  add_lose(target, 1, 30);
  const [base_anal, base_submit] = ladder(target, 3, [
    [40, 100],
    [80, 300],
    [100, 500],
    [150, 700],
    [200, 900],
    [300, 1200],
  ]);
  let a = base_anal;
  let pain;
  const anal_exp = exp(target, 1);
  if (anal_exp < EXPLV[1]) {
    a = times(a, 0.5);
    pain = 2000;
  } else if (anal_exp < EXPLV[2]) {
    pain = 300;
  } else if (anal_exp < EXPLV[3]) {
    a = times(a, 1.1);
    pain = 50;
  } else if (anal_exp < EXPLV[4]) {
    a = times(a, 1.2);
    pain = 10;
  } else if (anal_exp < EXPLV[5]) {
    a = times(a, 1.4);
    pain = 0;
  } else {
    a = times(a, 1.6);
    pain = 0;
  }
  const wet = palam(target, 3);
  if (wet < PALAMLV[1]) {
    a = times(a, 0.4);
    pain += 800;
  } else if (wet < PALAMLV[2]) {
    a = times(a, 0.8);
    pain += 500;
  } else if (wet < PALAMLV[3]) {
    pain += 300;
  } else if (wet < PALAMLV[4]) {
    a = times(a, 1.4);
    pain += 120;
  } else {
    a = times(a, 1.8);
    pain += 100;
  }
  a = times(a, lust_factor(target));
  a = times(a, obey_factor(target));
  for (const index of [6, 13, 14]) {
    set_src(target, index, anal_sense_factor(target, src(target, index)));
  }
  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + base_submit);
  set_src(target, 6, src(target, 6) + pain_body_factor(target, pain, 1.5));
  divide_chastity_source(target);
  chara(target).dungeon.肛门经验 += 1;
  era.print('肛门经验＋１');
  same_sex_exp(target, era_flag.player, 1);
  if (tq(target, 90)) {
    era.add('t:0', 1);
  }
  return 1;
}

// —— @COM_ABLE10–19（COMABLE.ERB:382-859） ——

const tool_filtered = () => ((era.get('flag:25') || 0) & 2) !== 0;
const lower_worn = (cid) =>
  ((era.get(`cflag:${cid}:40`) || 0) & 17) !== 0 && era.get('flag:37');
const upper_worn = (cid) =>
  ((era.get(`cflag:${cid}:40`) || 0) & 6) !== 0 && era.get('flag:37');
const diaper_worn = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 69 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
  era.get('flag:37');
const chastity_belt_worn = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 79 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
  era.get('flag:37');
const zooko_worn = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 11 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
  era.get('flag:37');
const normal_scene_blocked = (cid) =>
  tq(cid, 90) || tq(cid, 89) || tq(cid, 88) || tq(cid, 55);
const assi_skill_blocked = () =>
  era_flag.assiplay && abl(era_flag.assi, 12) < 3;
const assi_skill_without_sadist_blocked = () =>
  era_flag.assiplay && abl(era_flag.assi, 12) < 3 && !tal(era_flag.assi, 83);
const assi_vagina_blocked = (cid) =>
  exp(cid, 0) === 0 &&
  era_flag.assiplay &&
  (abl(era_flag.assi, 10) <= 4 || abl(era_flag.assi, 22) <= 4) &&
  !tal(era_flag.assi, 83);
const assi_lube_blocked = (cid) =>
  era_flag.assiplay &&
  palam(cid, 3) < PALAMLV[2] &&
  (abl(era_flag.assi, 10) <= 3 || abl(era_flag.assi, 22) <= 3) &&
  !tal(era_flag.assi, 83);

com_able_family.register(10, async () => {
  const cid = era_flag.target;
  return tool_filtered() ||
    !has_item(0) ||
    normal_scene_blocked(cid) ||
    lower_worn(cid) ||
    diaper_worn(cid) ||
    zooko_worn(cid)
    ? 0
    : 1;
});

com_able_family.register(11, async () => {
  const cid = era_flag.target;
  if (
    tool_filtered() ||
    normal_scene_blocked(cid) ||
    lower_worn(cid) ||
    diaper_worn(cid) ||
    chastity_belt_worn(cid) ||
    zooko_worn(cid) ||
    tal(cid, 273)
  ) {
    return 0;
  }
  if (tq(cid, 11)) {
    return 1;
  }
  if (
    tal(cid, 122) ||
    (tal(cid, 135) && !tal(era_flag.player, 83)) ||
    !has_item(1) ||
    assi_vagina_blocked(cid) ||
    assi_lube_blocked(cid)
  ) {
    return 0;
  }
  return 1;
});

com_able_family.register(12, async () => {
  const cid = era_flag.target;
  return tool_filtered() ||
    !has_item(2) ||
    assi_skill_without_sadist_blocked() ||
    normal_scene_blocked(cid) ||
    tq(cid, 18) ||
    zooko_worn(cid)
    ? 0
    : 1;
});

com_able_family.register(13, async () => {
  const cid = era_flag.target;
  if (
    tool_filtered() ||
    normal_scene_blocked(cid) ||
    (tal(cid, 135) && !tal(era_flag.player, 83)) ||
    lower_worn(cid) ||
    diaper_worn(cid) ||
    zooko_worn(cid)
  ) {
    return 0;
  }
  if (tq(cid, 13)) {
    return 1;
  }
  return !has_item(3) ||
    assi_lube_blocked(cid) ||
    tq(cid, 46) ||
    tq(cid, 19) ||
    tq(cid, 49)
    ? 0
    : 1;
});

com_able_family.register(14, async () => {
  const cid = era_flag.target;
  if (
    tool_filtered() ||
    normal_scene_blocked(cid) ||
    lower_worn(cid) ||
    diaper_worn(cid) ||
    zooko_worn(cid)
  ) {
    return 0;
  }
  if (tq(cid, 14)) {
    return 1;
  }
  return !has_item(7) ||
    tal(cid, 121) ||
    tal(cid, 122) ||
    assi_skill_blocked() ||
    tq(cid, 18)
    ? 0
    : 1;
});

com_able_family.register(15, async () => {
  const cid = era_flag.target;
  if (
    tool_filtered() ||
    normal_scene_blocked(cid) ||
    upper_worn(cid) ||
    zooko_worn(cid)
  ) {
    return 0;
  }
  if (tq(cid, 15)) {
    return 1;
  }
  return !has_item(8) || tq(cid, 16) || assi_skill_blocked() || tq(cid, 18)
    ? 0
    : 1;
});

com_able_family.register(16, async () => {
  const cid = era_flag.target;
  if (
    tool_filtered() ||
    normal_scene_blocked(cid) ||
    upper_worn(cid) ||
    zooko_worn(cid)
  ) {
    return 0;
  }
  if (tq(cid, 16)) {
    return 1;
  }
  return !has_item(17) ||
    !tal(cid, 130) ||
    abl(cid, 1) <= 2 ||
    tq(cid, 15) ||
    assi_skill_blocked() ||
    tq(cid, 18) ||
    tq(cid, 59)
    ? 0
    : 1;
});

com_able_family.register(17, async () => {
  const cid = era_flag.target;
  if (
    tool_filtered() ||
    normal_scene_blocked(cid) ||
    lower_worn(cid) ||
    diaper_worn(cid) ||
    zooko_worn(cid)
  ) {
    return 0;
  }
  if (tq(cid, 17)) {
    return 1;
  }
  return !has_item(12) ||
    (!tal(cid, 121) && !tal(cid, 122)) ||
    assi_skill_blocked() ||
    tq(cid, 59)
    ? 0
    : 1;
});

com_able_family.register(18, async () => {
  const cid = era_flag.target;
  if (tq(cid, 18)) {
    return 1;
  }
  if (
    tq(cid, 89) ||
    tq(cid, 88) ||
    tq(cid, 55) ||
    !tq(cid, 58) ||
    tq(cid, 14) ||
    tq(cid, 15) ||
    tq(cid, 16)
  ) {
    return 0;
  }
  if (
    era_flag.assiplay &&
    tal(cid, 124) &&
    abl(cid, 10) <= 4 &&
    !tal(era_flag.assi, 83)
  ) {
    return 0;
  }
  const worn = era.get(`cflag:${cid}:40`) || 0;
  return worn &&
    era.get('flag:37') &&
    (worn !== 64 || (era.get(`cflag:${cid}:42`) || 0) <= 70)
    ? 0
    : 1;
});

com_able_family.register(19, async () => {
  const cid = era_flag.target;
  if (
    tool_filtered() ||
    normal_scene_blocked(cid) ||
    lower_worn(cid) ||
    diaper_worn(cid) ||
    zooko_worn(cid)
  ) {
    return 0;
  }
  if (tq(cid, 19)) {
    return 1;
  }
  return !has_item(20) ||
    tq(cid, 13) ||
    tq(cid, 46) ||
    tq(cid, 49) ||
    tq(cid, 59)
    ? 0
    : 1;
});

// —— TRAIN_MESSAGE_B（EVENT_TRAIN_MESSAGE_B.ERB:783-1013） ——

train_message_b_family.register(10, async () => {
  const target = era_flag.target;
  let organ;
  if (tal(target, 122)) {
    organ = palam(target, 5) >= PALAMLV[3] ? '勃起的阴茎' : '颤抖的阴茎';
  } else if (tal(target, 121)) {
    organ = palam(target, 5) >= PALAMLV[3] ? '湿润的阴唇' : '颤抖的阴唇';
  } else {
    organ = palam(target, 5) >= PALAMLV[3] ? '发硬、勃起的阴蒂' : '颤抖的阴蒂';
  }
  era.print(`${player_name()}把${target_name()}${organ}、用振动宝石按压着…`);
});

train_message_b_family.register(11, async () => {
  const target = era_flag.target;
  const name = target_name();
  if (tq(target, 11)) {
    era.print(`把${name}体内蠢蠢欲动的蠕虫拔出来了。`);
    if ((era.get('tflag:899') || 0) === 0) {
      const value = exp(target, 0);
      let tail = '';
      if (value >= 201) {
        tail = `${name}的私处、瞬间感到难以忍受的空虚。${!tal(target, 45) && !tal(target, 310) ? '泪水滴下来了、' : ''}不自觉地流出了口水`;
      } else if (value >= 151) {
        tail = `${name}的私处内、积存的爱液随之流出、形成了一个小水塘`;
      } else if (value >= 121) {
        tail = `拔出蠕虫之后、${name}私处的肉壁皱褶上、渗出了爱液、形成一滴滴的小水珠`;
      } else if (value >= 71) {
        tail = `${name}忍不住双腿开始摩擦、扭扭捏捏地看着${player_name()}`;
      } else if (value >= 41) {
        tail = `${name}呼出一口炽热无比的吐息`;
      } else if (value >= 21) {
        tail = `${name}的私处口变得放松`;
      } else if (value >= 1) {
        tail = `${name}露出了安心的表情`;
      }
      era.print(`${tail}了…`);
    }
    return;
  }
  const wet = palam(target, 3);
  era.print(
    `${name}${wet >= PALAMLV[5] ? '充分开发的' : ''}${wet >= PALAMLV[3] ? '装满粘液的' : ''}${tal(target, 132) ? '幼女的阴部、' : '阴部、'}适应蠕虫了…`,
  );
  if ((era.get('tflag:899') || 0) === 0) {
    let tail;
    const value = exp(target, 0);
    if (
      tal(target, 0) &&
      (tal(target, 85) || tal(target, 76)) &&
      abl(target, 11) >= 5
    ) {
      tail = '露出了甜美的笑容、好像把自己是处女的事忘记';
    } else if (tal(target, 0) && tal(target, 85)) {
      tail = `用有点可怜的眼神看着${player_name()}`;
    } else if (tal(target, 0) && tal(target, 76)) {
      tail = '也不在乎了自己是处女、主动扭动着腰、积极的索要着';
    } else if (tal(target, 0) && tal(target, 27)) {
      tail = `露出了彻底放弃的表情。${!tal(target, 45) && !tal(target, 310) ? '眼睛泛起了泪光' : ''}`;
    } else if (tal(target, 0)) {
      tail = '因破处的恐惧惴惴不安、哆嗦地颤抖着';
    } else if (value >= 201) {
      tail = '对插入非常期待、主动扭动腰肢、全身都颤抖起来';
    } else if (value >= 151) {
      tail = `用可以融化任何人的眼神、温柔地看着${player_name()}、自己开始摩擦阴唇`;
    } else if (value >= 121) {
      tail = '带着恍惚的表情、迫不及待地挺起腰';
    } else if (value >= 71) {
      tail = `用充满欲情的湿润眼神、看着${player_name()}`;
    } else if (value >= 41) {
      tail = '沉醉在蠕虫刚刚的摩擦的感觉中、发出了陶醉的呻吟';
    } else if (value >= 1) {
      tail = '沉醉在蠕虫刚刚的摩擦的感觉中、身体渗出爱液';
    } else {
      tail = '沉醉在蠕虫刚刚的摩擦的感觉中、私处里的肉壁也开始蠕动';
    }
    era.print(`${name}${tail}了…`);
  }
  era.print(`${name}${wet >= PALAMLV[4] ? '湿漉漉的' : ''}阴部、插入了蠕虫。`);
});

train_message_b_family.register(12, async () => {
  const target = era_flag.target;
  const name = target_name();
  era.print(`${player_name()}用振动杖按压着${name}的阴部…`);
  if ((era.get('tflag:899') || 0) !== 0) {
    return;
  }
  const v = palam(target, 5);
  let tail = '';
  if (abl(target, 0) <= 2 && v >= PALAMLV[0] && v <= PALAMLV[3]) {
    tail = '非常痒的样子、';
  } else if (abl(target, 0) <= 2 && v >= PALAMLV[3]) {
    tail = '什么话都说不出了、';
  } else if (
    tal(target, 85) &&
    abl(target, 0) >= 4 &&
    v >= PALAMLV[0] &&
    v <= PALAMLV[3]
  ) {
    tail = '急不可耐地分开双腿、享受着、';
  } else if (
    tal(target, 85) &&
    abl(target, 0) >= 4 &&
    v >= PALAMLV[3] &&
    v <= PALAMLV[5]
  ) {
    tail = `兴奋到口水都流出来了、还不停愉悦地叫着${player_name()}的名字`;
  } else if (tal(target, 85) && abl(target, 0) >= 4 && v >= PALAMLV[5]) {
    tail = `${player_name()}抱着因为沉浸在绝顶快感而神情恍惚的她`;
  } else if (abl(target, 0) >= 3 && v >= PALAMLV[0] && v <= PALAMLV[3]) {
    tail = '强烈的快感下她整个脸都红了';
  } else if (abl(target, 0) >= 3 && v >= PALAMLV[3] && v <= PALAMLV[5]) {
    tail = '恍惚的眼神中、流露出贪欲的神色';
  } else if (abl(target, 0) >= 3 && v >= PALAMLV[5]) {
    tail = '现在也正在绝顶高潮中的样子';
  }
  era.print(`${name}${tail}……`);
});

train_message_b_family.register(13, async () => {
  const target = era_flag.target;
  const name = target_name();
  if (tq(target, 13)) {
    era.print(`${name}体内的肛门虫被拔出来了。`);
    if ((era.get('tflag:899') || 0) === 0) {
      const value = exp(target, 1);
      const tail =
        value >= 180
          ? '阴部流出了源源不断的爱液、继续把肛门张开着'
          : value >= 141
            ? '眼神湿润、扭着屁股请求着'
            : value >= 101
              ? '好像缺少了什么、抬起屁股请求着'
              : value <= 20
                ? '用艰难的表情忍受着刺激'
                : value <= 40
                  ? '被强烈的排泄感弄得脸红耳赤'
                  : value <= 75
                    ? '屁股扭动的同时露出了安心的表情'
                    : '稍微依依不舍地摆动着屁股';
      era.print(`${name}${tail}了…`);
    }
    return;
  }
  era.print(`肛门虫在${name}的菊花入口处游荡…`);
  if ((era.get('tflag:899') || 0) === 0) {
    const value = exp(target, 1);
    const tail =
      value >= 180
        ? '露出可以融化任何的人表情、自己把屁眼扒开'
        : value >= 141
          ? '焦急地等待着插入、不安分地扭动着腰肢'
          : value >= 101
            ? '脸红过耳、摇动屁股期待着'
            : value <= 20
              ? '不洁的穴要被不洁的东西侵犯了、露出了充满屈辱与耻辱的表情'
              : value <= 40
                ? '因为害羞、脸都红'
                : value <= 75
                  ? '露出了又期待又抗拒的复杂表情'
                  : '身体因虫子的刺激而颤抖着';
    era.print(`${name}${tail}了…`);
  }
  era.print(
    `${name}的${palam(target, 3) >= PALAMLV[4] ? '充满粘液的' : ''}肛门、插入了肛门虫……`,
  );
});

for (const [com, slot, off, on] of [
  [
    14,
    14,
    (n) => `${n}的电动阴蒂夹被拿了下来……`,
    (n) => `${n}的阴蒂被夹上了电动阴蒂夹……`,
  ],
  [
    15,
    15,
    (n) => `${n}的乳头夹被拿了下来……`,
    (n) => `${n}的乳头被夹上了乳头夹……`,
  ],
  [
    16,
    16,
    (n) => `${n}身上的榨乳器被卸了下来……`,
    (n) => `${n}被装上了榨乳器……`,
  ],
  [
    17,
    17,
    (n) => `${n}的飞机杯被拿了下来……`,
    (n) => `${player_name()}用飞机杯套住了${n}的阴茎……`,
  ],
  [
    19,
    19,
    (n) => `${n}肛门里的肛珠被拔出来了…`,
    (n) => `往${n}的肛门、插入了肛珠…`,
  ],
]) {
  train_message_b_family.register(com, async () => {
    era.print(
      tq(era_flag.target, slot) ? off(target_name()) : on(target_name()),
    );
  });
}

train_message_b_family.register(18, async () => {
  const target = era_flag.target;
  const name = target_name();
  if (tq(target, 18)) {
    era.print(`${name}的淋浴中止了……`);
    return;
  }
  let skin = '';
  if (tal(target, 244)) {
    skin = '蓝色的';
  } else if (tal(target, 253)) {
    skin = '褐色的';
  } else if (tal(target, 255)) {
    skin = '白皙的';
  }
  era.print(`${name}的淋浴开始了、`);
  era.print(`水花流过${skin}吹弹可破的肌肤………`);
});

// —— TRAIN_MESSAGE_A（EVENT_TRAIN_MESSAGE_A.ERB:986-1149） ——

const clit_name = (cid) => (tal(cid, 121) || tal(cid, 122) ? '阴茎' : '阴蒂');

function clit_reaction(com, tool) {
  return async () => {
    const target = era_flag.target;
    if ((era.get('tflag:899') || 0) > 1) {
      return;
    }
    const name = target_name();
    const organ = clit_name(target);
    const a = era.get(`delta:${target}:0`) || 0;
    if (a < 300) {
      era.print(
        com === 12
          ? `${name}的${organ}被振动杖按压着、只是在承受振动、好像没有获得很大的快感。`
          : com === 14
            ? `${name}闭上眼睛忍受着阴蒂的刺激。`
            : `${name}还没感到很大的快感。`,
      );
    } else if (a < 1000) {
      era.print(
        com === 12
          ? `${name}的那里被振动杖按压着、在痒痒的表情里、发现了一丝快乐的神色。`
          : com === 14
            ? `在阴蒂夹的振动下、${name}发出了轻轻的呻吟。`
            : `${name}的${organ}被${tool}推压、发出小声的娇喘、身子弹起来了。`,
      );
    } else if (a < 3000) {
      if (com === 10 && tal(target, 70)) {
        era.print(`${name}因为振动宝石的刺激、很舒服地享受着这种快感。`);
      } else if (com === 12) {
        era.print(
          `${organ}被振动杖按压着、${name}轻轻地可爱呻吟着、身体颤抖不已。`,
        );
      } else if (com === 14) {
        era.print(`${name}无法忍受阴蒂夹的刺激、不停地颤抖着、肉体涌起快感。`);
      } else {
        era.print(
          `${name}的${organ}被振动宝石推压、一边发出愉悦的呻吟、一边想逃离似得扭动着身体。`,
        );
      }
    } else if (a < 6000) {
      era.print(
        com === 12
          ? `${name}的那里被振动杖按压着、不堪快感冲击、双腿无意识地夹紧了振动杖、${name}越发苦闷了。`
          : com === 14
            ? `阴蒂夹给予了强烈的刺激、${name}迷失在快感里、扭动着腰肢、好像在跳下流的舞蹈一样。`
            : `${name}的${organ}${com === 10 ? '直接被振动宝石所刺激、激烈的快感让她整个人弹起来了。' : '感受到了振动杖的振动带来的快感、一边想要拼死逃避、一边却又发出了妩媚的呻吟。'}`,
      );
    } else if (a < 10000) {
      era.print(
        com === 12
          ? `${name}的${organ}感受到了振动杖的振动带来的快感、一边想要拼死逃避、一边却又发出了妩媚的呻吟。`
          : com === 14
            ? `${name}完全投入到阴蒂夹带来的快感之中、意识朦胧了。`
            : `${name}的${organ}在振动宝石的刺激下、沉醉在激烈的快感之中、腰部开始做出下流的动作。`,
      );
    } else if (com === 10) {
      era.print(
        tal(target, 42)
          ? `${name}被振动宝石推压、在强烈的快感刺激下背脊夸张地后仰、连续潮吹了。`
          : `${name}被振动宝石推压、因为过于兴奋、一边流出了口水、一边在地上打滚。`,
      );
    } else if (com === 12) {
      era.print(
        `${name}在振动杖按压上来的瞬间、身体激烈地后仰、${tal(target, 42) && !tal(target, 122) ? '从那地方、潮吹了好几次。' : '强烈的快感让她整个人弹起来了。'}`,
      );
    } else {
      era.print(
        `阴蒂夹持续的振动、给${name}带来不堪承受的可怕刺激。爱液四射、意识飞散、整个人弹起来了。`,
      );
    }
  };
}

train_message_a_family.register(10, clit_reaction(10, '振动宝石'));

train_message_a_family.register(11, async () => {
  const target = era_flag.target;
  if ((era.get('tflag:899') || 0) > 1) {
    return;
  }
  const name = target_name();
  const a = era.get(`delta:${target}:1`) || 0;
  const inserted = tq(target, 11);
  const texts = inserted
    ? [
        `${name}因蠕虫太粗、痛苦挣扎着。`,
        `${name}一时因为不适应蠕虫而不知所措、一时又会因为突如其来的快感而全身颤抖。`,
        `${name}的私处开始感觉到快感、蠕动中的蠕虫放入的瞬间、听到呻吟突然变大了。`,
        `${name}的${tal(target, 132) ? '小小的' : ''}私处、刚被蠕虫开始深入、便露出了淫荡愉悦的表情。`,
        `${name}${tal(target, 100) ? '小小的身体' : ''}被粗粗的蠕虫塞满、在强烈的快感刺激下、全身剧震、像离水的活鱼一样跳动着。`,
        `${name}被蠕虫激烈地抽插、全身剧震、爱液四溅、不停地在地上打滚。`,
      ]
    : [
        `${name}看到蠕虫被拔出来了、长舒一口气。`,
        `${name}被拔出蠕虫的瞬间、轻轻地娇喘了一下。`,
        `${name}被拔出蠕虫的瞬间、情不自禁地娇喘了一下、身体却愈发苦闷了。`,
        `${name}被蠕虫凄惨地侵犯、拔出蠕虫后、私处里流出了大量的爱液。`,
        `${name}在企图拔出蠕虫的时候、发出了可爱的呻吟、看她这个样子、于是最后又把虫子往里推了一把、结果她激烈地喷出爱液、整个人弹起来了。`,
        `在拔出${name}体内的虫子时、虫子激烈地往里钻。这令她全身剧震在地上打滚、高兴得快不正常了。`,
      ];
  era.print(
    texts[
      a < 300
        ? 0
        : a < 1000
          ? 1
          : a < 3000
            ? 2
            : a < 6000
              ? 3
              : a < 10000
                ? 4
                : 5
    ],
  );
});

train_message_a_family.register(12, clit_reaction(12, '振动杖'));

train_message_a_family.register(13, async () => {
  const target = era_flag.target;
  if ((era.get('tflag:899') || 0) > 1) {
    return;
  }
  const name = target_name();
  const a = era.get(`delta:${target}:2`) || 0;
  const inserted = tq(target, 13);
  const texts = inserted
    ? [
        `把肛门虫放入的时候、${name}痛苦地尖叫起来了。看来相对于快感还是感到痛苦的居多。`,
        `${name}的肛门好像勉强接受了、不过还是有些许的苦痛。`,
        `${name}的肛门还是有点痛苦、不过看来开始感觉到快感了。`,
        `${name}被肛门虫深入的时候、发出了清晰的娇喘、感受到快感了。`,
        `${name}被肛门虫带来的快感支配、连表情都变得迟钝了。`,
        `${name}的肛门、感受到了强烈的刺激、${tal(target, 99) ? '修长的身体' : tal(target, 100) ? '娇小的身体' : '那满身大汗的身体'}在地上不停打滚着。`,
      ]
    : [
        `${name}看到肛门虫被拔出来了、长舒一口气。`,
        `肛门虫慢慢抽出来的时候、${name}的肛门却夹紧了、正在享受这种快感。`,
        `肛门虫被拔出来的瞬间、${name}发出了不堪刺激的呻吟。`,
        `强制拔走体内的肛门虫、${name}发出了混合着快乐和痛苦的呻吟。`,
        `把肛门虫拔走前、轻轻地往里推了一下、${name}摇了摇屁股、发出了甜美的喘息。`,
        `把动作越来越激烈的肛门虫拔出来、${name}被强烈的快感所支配、发出了甘甜又激烈的呻吟、贪欲地扭动着腰肢、一副淫荡下流的样子。`,
      ];
  era.print(
    texts[
      a < 300
        ? 0
        : a < 1000
          ? 1
          : a < 3000
            ? 2
            : a < 6000
              ? 3
              : a < 10000
                ? 4
                : 5
    ],
  );
});

train_message_a_family.register(14, clit_reaction(14, '阴蒂夹'));
const noop_branch = async () => {};
for (let com = 15; com <= 19; com += 1) {
  train_message_a_family.register(com, noop_branch);
}

com_family.register(10, com10);
com_family.register(11, com11);
com_family.register(12, com12);
com_family.register(13, com13);
com_family.register(14, com14);
com_family.register(15, com15);
com_family.register(16, com16);
com_family.register(17, com17);
com_family.register(18, com18);
com_family.register(19, com19);

equip_com_family.register(11, equip_com11);
equip_com_family.register(13, equip_com13);
equip_com_family.register(14, equip_com14);
equip_com_family.register(15, equip_com15);
equip_com_family.register(16, equip_com16);
equip_com_family.register(17, equip_com17);
equip_com_family.register(18, equip_com18);
equip_com_family.register(19, equip_com19);

module.exports = {
  STUBBED_CALLS,
  com10,
  com11,
  com12,
  com13,
  com14,
  com15,
  com16,
  com17,
  com18,
  com19,
  equip_com11,
  equip_com13,
  equip_com14,
  equip_com15,
  equip_com16,
  equip_com17,
  equip_com18,
  equip_com19,
};
