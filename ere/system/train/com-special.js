/**
 * @file 调教指令 50–59「特殊」族：@COM50-59 真身 + @COM_ABLE50-59 可执行性
 * 判定 + @EQUIP_COM53/54/57/58/59 持续效果 + TRAIN_MESSAGE_A/B 分支（issue
 * #224，阶段 4 轴 A J14）。
 *
 * 源: target/ERB/調教相關/COMF50_ローション.ERB     @COM50（:3-28）
 *     target/ERB/調教相關/COMF51_媚薬.ERB           @COM51（:10-97）
 *     target/ERB/調教相關/COMF52_利尿剤.ERB         @COM52（:6-71）
 *     target/ERB/調教相關/COMF53_水晶球.ERB         @COM53（:3-49）+ @EQUIP_COM53（:52-204）
 *     target/ERB/調教相關/COMF54_野外プレイ.ERB     @COM54（:3-109）+ @EQUIP_COM54（:111-211）
 *     target/ERB/調教相關/COMF55_何もしない.ERB     @COM55（:7-84）
 *     target/ERB/調教相關/COMF56_会話する.ERB       @COM56（:6-196）
 *     target/ERB/調教相關/COMF57_羞恥プレイ.ERB     @COM57（:3-131）+ @EQUIP_COM57（:134-254）
 *     target/ERB/調教相關/COMF58_お風呂場プレイ.ERB @COM58（:3-98）+ @EQUIP_COM58（:100-198）
 *     target/ERB/調教相關/COMF59_新妻プレイ.ERB     @COM59（:3-160）+ @EQUIP_COM59（:163-318）
 *     target/ERB/調教相關/COMABLE.ERB               @COM_ABLE50-59（:2246-2506）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB    SELECTCOM 55（:362-373）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB    SELECTCOM 50-54、56-59（:1901-2063）
 *
 * == 本族边界 ==
 *
 * - COM50_AUTO（COMF50:30-46）属于自动调教票 #218，本模块不重复实现。
 * - 原作 @GET_ADV_COM 没有 CASE 50-59，故不注册升格规则。
 * - COM55 只调用自身 PRINTL，**不** CALL TRAIN_MESSAGE_B；它的反应是
 *   SOURCE_CHECK 末尾的 TRAIN_MESSAGE_A 分支。其余 A 分支在原作不存在，
 *   显式注册 no-op，不能误落公共分发器的占位输出。
 * - EQUIP 链由 com-family.js 的原作顺序消费，本模块只注册 53/54/57/58/59；
 *   55/56 原作无持续函数。
 *
 * == 变量承载 ==
 *
 * SOURCE / LOSEBASE 对应 source / deltabase（后者存负值）；TEQUIP 属 train。
 * CFLAG:31 属 event，经 chara(cid).event.媚药残留度 跨域写；CFLAG:5/32/491/
 * 499 属 train，经本域门面。CFLAG:480-489 是录像槽的动态有限区间，原作按
 * SAVE_ID 间接寻址，保留为本模块受限 helper，不能泛化成裸动态寻址惯例。
 * EXP:50/57/73 属 dungeon，跨域写经门面；其余经验属 train。录像内容
 * TFLAG:32 属 kojo，经 game.kojo；录像开始状况 FLAG:22、TFLAG:30/200 和
 * 物品都已有 train 门面。EX_FLAG:4444 与 MONEY 的同步记账复用 era_exflag /
 * era_flag 的既有具名包装层。
 *
 * SUISEI_STR 只在 EXCOM.ERH 声明、出售/展示侧消费，COM53 原作本体没有读写。
 * 本票不预填或操作 yml/TStr.yml；录像内容文本建模留给 #5 的遗留项。
 */

'use strict';

const era = require('#/era-electron');
const era_exflag = require('#/era-utils/era-exflag');
const era_flag = require('#/era-utils/era-flag');
const { EXPLV } = require('#/era-utils/exp-level');
const { PALAMLV } = require('#/era-utils/palam-level');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
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
const { clothtype_text } = require('#/page/page-clothtype');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');

/** 本文件没有未实现原作调用；口上台词分发随轴 B 落地。 */
const STUBBED_CALLS = [];

/**
 * Emuera TIMES：每一步乘法立即向下截断，禁止合并系数。
 *
 * target/emuera.config 的「TIMESの計算をERAMAKERにあわせる:NO」令小数
 * 运算不走 JS 二进制浮点。倍率以百分比整数承载，保证 90 × 140 / 100 的
 * 精确结果仍是 126，而非 Math.floor(90 * 1.4) 的 125。
 */
const times = (value, percent) => Math.floor((value * percent) / 100);
/** Emuera 正数整数除法（A / 2）。 */
const idiv = (left, right) => Math.floor(left / right);

const MASTER = 0;

const target_id = () => era_flag.target;
const tq = (cid, index) => era.get(`tequip:${cid}:${index}`) || 0;
const tal = (cid, index) => era.get(`talent:${cid}:${index}`) || 0;
const abl = (cid, index) => Math.floor(era.get(`abl:${cid}:${index}`) || 0);
const palam = (cid, index) => era.get(`palam:${cid}:${index}`) || 0;
const src = (cid, index) => era.get(`source:${cid}:${index}`) || 0;
const set_src = (cid, index, value) => era.set(`source:${cid}:${index}`, value);
const add_src = (cid, index, value) => era.add(`source:${cid}:${index}`, value);
const add_lose = (cid, index, value) =>
  era.add(`deltabase:${cid}:${index}`, -value);
const noitem = () => era.get('noitem:0') || 0;
const has_item = (index) =>
  (era.get(`item:${index}`) || 0) > 0 || noitem() !== 0;
const target_name = () => chara_callname(target_id());

/** 两个角色同为非男人 / 同为男人时的同性经验原文共通段。 */
function same_sex_exp(cid, player, gain) {
  if (!tal(cid, 122) && !tal(player, 122)) {
    era.print(`百合经验+${gain}`);
    chara(cid).train.百合经验 += gain;
  } else if (tal(cid, 122) && tal(player, 122)) {
    era.print(`断背经验+${gain}`);
    chara(cid).train.断背经验 += gain;
  }
}

/** PALAM:5（欲情）五档倍率（百分比），COM53/54/58 的同形段。 */
function lust_factor(cid) {
  if (palam(cid, 5) < PALAMLV[1]) return 80;
  if (palam(cid, 5) < PALAMLV[2]) return 90;
  if (palam(cid, 5) < PALAMLV[3]) return 100;
  if (palam(cid, 5) < PALAMLV[4]) return 110;
  return 120;
}

/** 六档数组按 ABL 等级取值；5 以上落原作 ELSE 档。 */
const tier = (values, level) => values[Math.min(level, values.length - 1)];

/**
 * COM54 的开启 / 持续公共数值段（COMF54:20-98 / :119-196）。
 * @param {number} cid 目标
 * @returns {{a: number, b: number}}
 */
function outdoor_sources(cid) {
  let a = 500;
  let b = 500;
  a = times(a, lust_factor(cid)); // :23-34 / :122-133

  const exposure = abl(cid, 17);
  const [extra, factor] = tier(
    [
      [0, 100],
      [50, 120],
      [150, 140],
      [400, 160],
      [750, 200],
      [1300, 300],
    ],
    exposure,
  );
  add_src(cid, 7, extra);
  add_src(cid, 10, extra);
  a = times(a, factor); // :35-60 / :134-159
  a = times(a, tier([80, 100, 130, 160, 200, 300], abl(cid, 21))); // :61-74

  if (tal(cid, 28)) a = times(a, 150); // :76-78
  if (tal(cid, 33)) a = times(a, 150); // :79-81
  if (tal(cid, 10)) b = times(b, 200); // :83-85
  if (tal(cid, 35)) b = times(b, 200); // :86-88
  if (tal(cid, 89)) {
    a = times(a, 200);
    b = times(b, 50);
  }

  add_src(cid, 12, a);
  add_src(cid, 14, b);
  add_src(cid, 16, idiv(a, 2));
  return { a, b };
}

/** COM57 开启/持续的公共数值段；露出/抖M倍率由调用点给出。 */
function shame_sources(cid, exposure_factors, maso_factors) {
  let a = 500;
  let b = 500;
  a = times(a, tier([100, 110, 120, 130, 140], palam_level5(cid)));

  const exposure = abl(cid, 17);
  const source_by_exposure = [
    [0, 0, 600, 1000, 1000],
    [150, 150, 500, 0, 0],
    [300, 300, 400, 0, 0],
    [600, 600, 300, 0, 0],
    [1000, 1000, 200, 0, 0],
    [1800, 1800, 100, 0, 0],
  ];
  const [s7, s10, s13, s14, s15] = tier(source_by_exposure, exposure);
  add_src(cid, 7, s7);
  add_src(cid, 10, s10);
  add_src(cid, 13, s13);
  add_src(cid, 14, s14);
  add_src(cid, 15, s15);
  a = times(a, tier(exposure_factors, exposure));
  a = times(a, tier(maso_factors, abl(cid, 21)));

  if (tal(cid, 21)) a = times(a, 80);
  if (tal(cid, 22)) a = times(a, 80);
  if (tal(cid, 23)) a = times(a, 250);
  if (tal(cid, 33)) a = times(a, 150);
  if (tal(cid, 10)) b = times(b, 150);
  if (tal(cid, 35)) b = times(b, 300);
  if (tal(cid, 80)) a = times(a, 150);
  b = times(b, 120);
  if (tal(cid, 113)) add_src(cid, 3, 500);
  add_src(cid, 16, 500);
  a = times(a, 150);
  b = times(b, 120);

  add_src(cid, 12, a);
  add_src(cid, 14, b);
  add_src(cid, 16, idiv(a, 2));
  return { a, b };
}

/** COM58 开启/持续的公共数值段。 */
function bath_sources(cid, base_a) {
  let a = base_a;
  let b = 50;
  a = times(a, lust_factor(cid));

  const exposure = abl(cid, 17);
  const [extra, factor] = tier(
    [
      [0, 100],
      [50, 110],
      [80, 120],
      [100, 130],
      [200, 140],
      [300, 150],
    ],
    exposure,
  );
  add_src(cid, 7, extra);
  add_src(cid, 10, extra);
  a = times(a, factor);
  a = times(a, tier([100, 110, 120, 130, 140, 150], abl(cid, 21)));

  if (tal(cid, 28)) a = times(a, 150);
  if (tal(cid, 33)) a = times(a, 150);
  if (tal(cid, 10)) b = times(b, 110);
  if (tal(cid, 35)) b = times(b, 120);

  add_src(cid, 12, a);
  add_src(cid, 14, b);
  add_src(cid, 16, idiv(a, 2));
  return { a, b };
}

/** COM59 开启/持续的公共数值段。 */
function newlywed_sources(cid) {
  let a = 500;
  let b = 100;
  a = times(a, tier([100, 110, 120, 130, 140], palam_level5(cid)));

  const exposure = abl(cid, 17);
  const [s11, s10, s12, s14, s15, factor] = tier(
    [
      [0, 0, 100, 100, 100, 60],
      [50, 150, 500, 300, 0, 100],
      [100, 300, 100, 50, 0, 160],
      [150, 600, 50, 0, 0, 200],
      [200, 1000, 0, 0, 0, 260],
      [300, 2000, 0, 0, 0, 380],
    ],
    exposure,
  );
  add_src(cid, 11, s11);
  add_src(cid, 10, s10);
  add_src(cid, 12, s12);
  add_src(cid, 14, s14);
  add_src(cid, 15, s15);
  a = times(a, factor);
  a = times(a, tier([100, 120, 140, 160, 180, 200], abl(cid, 10)));
  a = times(a, tier([100, 120, 140, 160, 180, 200], abl(cid, 16)));

  if (tal(cid, 21)) a = times(a, 80);
  if (tal(cid, 22)) a = times(a, 80);
  if (tal(cid, 23)) a = times(a, 150);
  if (tal(cid, 63)) a = times(a, 150);
  if (tal(cid, 10)) b = times(b, 150);
  if (tal(cid, 35)) b = times(b, 120);
  if (tal(cid, 33)) a = times(a, 50);
  if (tal(cid, 15)) b = times(b, 200);
  if (tal(cid, 85)) a = times(a, 250);
  if (tal(cid, 76)) a = times(a, 180);

  add_src(cid, 3, a);
  add_src(cid, 14, b);
  add_src(cid, 16, a);
  return { a, b };
}

/** PALAM:5 为 0..4 五档（COM57/59 的低档从 ×1 开始）。 */
function palam_level5(cid) {
  if (palam(cid, 5) < PALAMLV[1]) return 0;
  if (palam(cid, 5) < PALAMLV[2]) return 1;
  if (palam(cid, 5) < PALAMLV[3]) return 2;
  if (palam(cid, 5) < PALAMLV[4]) return 3;
  return 4;
}

/** COM59 两处共用的主人经验累积段。 */
function newlywed_master_exp(cid) {
  if (era_flag.assiplay !== 0) return;
  if (abl(cid, 10) >= 3) game.train.主人经验 += 10;
  if (tal(cid, 85)) game.train.主人经验 += 20;
  if (tal(cid, 76)) game.train.主人经验 += 5;
  if (tal(cid, 88)) game.train.主人经验 += 30;
}

/**
 * COM53 启动时清理的录像帧区：480..489。
 *
 * 原作启动循环就是这十格；实际记录槽另由 set_video_record 守 460..489。
 */
function clear_video_records(cid) {
  for (let index = 480; index <= 489; index += 1) {
    era.set(`cflag:${cid}:${index}`, 0);
  }
}

/** COM53 的动态录像帧槽：原作 SAVE_ID = CFLAG:491 + 459（460..489）。 */
function set_video_record(cid, frame, value) {
  const index = frame + 459;
  if (index < 460 || index > 489) {
    throw new RangeError(`录像帧槽越界：${index}`);
  }
  era.set(`cflag:${cid}:${index}`, value);
}

/** @COM50 润滑液（COMF50:3-28）。 */
async function com50() {
  const cid = target_id();
  era.print('润滑液'); // :6
  await train_message_b(); // :8
  set_src(cid, 10, 10000); // :13
  set_src(cid, 12, 300); // :14
  game.train.润滑液 -= 1; // :16
  same_sex_exp(cid, era_flag.player, 1); // :18-26
  return 1;
}

/** @COM51 媚药（COMF51:10-97）。 */
async function com51() {
  const cid = target_id();
  era.print('媚药'); // :12
  await train_message_b(); // :14

  let lose0 = 300;
  let lose1 = 300;
  if (tal(MASTER, 55)) {
    lose0 -= 150;
    lose1 -= 150;
  } else if (era_flag.assi >= 0 && tal(era_flag.assi, 55)) {
    lose0 -= 150;
    lose1 -= 150;
  }
  const drug_exp = chara(cid).dungeon.药物经验;
  lose0 += tier([300, 50, 0, -50, -100], drug_exp_level(drug_exp));

  set_src(cid, 14, 2000);
  if (tal(cid, 46)) {
    lose0 -= 100;
    set_src(cid, 7, 500);
    set_src(cid, 14, 1000);
    set_src(cid, 11, 10000);
  } else {
    set_src(cid, 11, 5000);
  }
  add_lose(cid, 0, Math.max(lose0, 0)); // :59-61 体力损耗不低于 0
  add_lose(cid, 1, lose1);

  same_sex_exp(cid, era_flag.player, 1);
  era.print('药物经验+1');
  chara(cid).dungeon.药物经验 += 1;
  chara(cid).train.媚药效果 = 1;
  if (!tq(cid, 90)) game.train.媚药 -= 1;
  chara(cid).event.媚药残留度 += 1;
  if (tal(cid, 46)) chara(cid).train.媚药禁断症状 = 1;
  return 1;
}

/** @COM52 利尿剂（COMF52:6-71）。 */
async function com52() {
  const cid = target_id();
  era.print('利尿剂'); // :8
  await train_message_b(); // :10

  let lose0 = 120;
  let lose1 = 120;
  if (tal(MASTER, 55)) {
    lose0 += 50;
    lose1 += 50;
  } else if (era_flag.assi >= 0 && tal(era_flag.assi, 55)) {
    lose0 += 50;
    lose1 += 50;
  }
  lose0 += tier(
    [120, 30, 0, -30, -40],
    drug_exp_level(chara(cid).dungeon.药物经验),
  );
  add_lose(cid, 0, lose0);
  add_lose(cid, 1, lose1);
  set_src(cid, 14, 2000);
  set_src(cid, 15, 150);

  same_sex_exp(cid, era_flag.player, 1);
  era.print('药物经验+1');
  chara(cid).dungeon.药物经验 += 1;
  chara(cid).system.利尿剂 = 1;
  if (!tq(cid, 90)) game.train.利尿剂 -= 1;
  return 1;
}

/** EXP:57 的 COM51/52 五档（EXPLV:1/2/3/5；档号直接保留断点）。 */
function drug_exp_level(value) {
  if (value < EXPLV[1]) return 0;
  if (value < EXPLV[2]) return 1;
  if (value < EXPLV[3]) return 2;
  if (value < EXPLV[5]) return 3;
  return 4;
}

/** @COM53 水晶球录像开关（COMF53:3-49）。 */
async function com53() {
  const cid = target_id();
  await train_message_b(); // :7：切换前消息看旧 TEQUIP
  if (chara(cid).train.录像摄影) {
    chara(cid).train.录像摄影 = 0;
    game.train.水晶球魔力源 -= 1;
    return 1;
  }

  chara(cid).train.录像摄影 = 1;
  chara(cid).train.录像时间 = 0;
  clear_video_records(cid);
  let snapshot = 0;
  for (const [index, bit] of [
    [54, 1],
    [58, 2],
    [59, 4],
    [44, 8],
    [11, 16],
    [13, 32],
    [46, 64],
    [89, 128],
    [90, 256],
    [18, 512],
  ]) {
    if (tq(cid, index)) snapshot |= bit;
  }
  game.train.录像开始状况 = snapshot;
  return 1;
}

/** @EQUIP_COM53（COMF53:52-204）。 */
async function equip_com53() {
  const cid = target_id();
  let video_max = 10 + 4 * chara(cid).train.水晶球充能次数;
  const frame = chara(cid).train.录像时间;

  if (frame === 0) {
    chara(cid).train.录像时间 += 1; // :63-65 首 tick 不记入录像
  } else if (frame <= video_max) {
    let record = era_flag.selectcom;
    if (era_flag.assiplay && !tal(era_flag.assi, 122)) record += 1000;
    if (era_flag.assiplay && tal(era_flag.assi, 122)) record += 2000;
    set_video_record(cid, frame, record);
    era.print(`＜视频拍摄中${frame}/${video_max}＞`);
    chara(cid).train.录像时间 += 1;
    add_lose(cid, 1, 50);

    let a = 370;
    let b = 1750;
    let c = 700;
    a = times(a, lust_factor(cid));
    a = times(a, tier([40, 60, 80, 100, 110, 120], abl(cid, 10)));
    const exposure = abl(cid, 17);
    a = times(a, tier([80, 100, 130, 160, 200, 300], exposure));
    c = times(c, tier([200, 170, 140, 100, 80, 60], exposure));
    if (tal(cid, 80)) a = times(a, 200);
    if (tal(cid, 28)) a = times(a, 150);
    if (tal(cid, 10)) c = times(c, 170);
    if (tal(cid, 89)) {
      a = times(a, 200);
      b = times(b, 120);
      c = times(c, 50);
    }
    add_src(cid, 10, a);
    add_src(cid, 12, b);
    add_src(cid, 14, c);
  }

  if (abl(cid, 17) >= 2 && chara(cid).train.录像时间 > 1) {
    era.print('拍摄经验＋１');
    chara(cid).train.拍摄经验 += 1;
  }

  if (chara(cid).train.录像时间 > video_max) {
    era.print('＜魔力耗尽了，录像拍摄将要结束＞');
    era.print('要给水晶球充能吗？');
    // 原作 PRINTFORM + PRINTL 同行；按钮化是为了与 era.input() 的本轮
    // 快捷键白名单对接，空行仍保留原作的视觉结构。
    era.print(`已充能${chara(cid).train.水晶球充能次数}次。充能费用为500G。`);
    era.printButton('充能', 1);
    era.println();
    era.printButton('不了', 2);
    const result = await era.input();
    if (result === 2) {
      chara(cid).train.录像摄影 = 0;
      game.train.水晶球魔力源 -= 1;
      chara(cid).train.水晶球充能次数 = 0;
      era.print('＜魔力耗尽了，录像拍摄结束＞');
    } else if (result === 1) {
      chara(cid).train.水晶球充能次数 += 1;
      if (chara(cid).train.水晶球充能次数 <= 5) {
        era_flag.money -= 500;
        era_exflag.legit_money -= 500;
        video_max = 10 + 4 * chara(cid).train.水晶球充能次数;
        era.print(`水晶球容量扩充为${video_max}次。`);
      } else {
        chara(cid).train.录像摄影 = 0;
        game.train.水晶球魔力源 -= 1;
        chara(cid).train.水晶球充能次数 = 0;
        era.print('＜已经无法再充能了＞');
        era.print('＜魔力耗尽了，录像拍摄结束＞');
      }
    }
  }

  if (era_flag.assiplay === 0 && abl(cid, 7) >= 3) {
    game.train.主人经验 += 1;
  }
  return 1;
}

/** @COM54 野外PLAY（COMF54:3-109）。 */
async function com54() {
  const cid = target_id();
  era.print('野外PLAY');
  await train_message_b();
  if (chara(cid).train.野外PLAY) {
    chara(cid).train.野外PLAY = 0;
    return 1;
  }
  add_lose(cid, 1, 150);
  outdoor_sources(cid);
  chara(cid).train.野外PLAY = 1;
  if (!chara(cid).train.野外露出经验) {
    era.print('异常经验＋１');
    chara(cid).dungeon.异常经验 += 1;
    chara(cid).train.野外露出经验 = 1;
  }
  return 1;
}

/** @EQUIP_COM54（COMF54:111-211）。 */
async function equip_com54() {
  const cid = target_id();
  era.print('＜野外PLAY中＞');
  add_lose(cid, 0, 50);
  add_lose(cid, 1, 100);
  outdoor_sources(cid);
  same_sex_exp(cid, era_flag.player, 1);
  if (era_flag.assiplay === 0 && abl(cid, 17) >= 3) {
    game.train.主人经验 += 1;
  }
  return 1;
}

/** @COM55 放置PLAY（COMF55:7-84）。消息在 A 阶段，见 register。 */
async function com55() {
  const cid = target_id();
  era.print('什么都不做');
  add_lose(cid, 1, 10);
  set_src(cid, 14, 50);
  set_src(cid, 12, tier([10, 30, 60, 100, 150], palam_level5(cid)));
  set_src(cid, 3, tier([0, 20, 40, 70, 110, 150], abl(cid, 16)));
  const maso = abl(cid, 21);
  set_src(
    cid,
    3,
    times(src(cid, 3), tier([80, 100, 130, 140, 170, 200], maso)),
  );
  set_src(
    cid,
    12,
    times(src(cid, 12), tier([80, 100, 120, 140, 150, 170], maso)),
  );
  const [s10, s11] = tier(
    [
      [0, 0],
      [20, 30],
      [40, 70],
      [70, 120],
      [110, 180],
      [150, 250],
    ],
    maso,
  );
  set_src(cid, 10, s10);
  set_src(cid, 11, s11);
  if (palam(cid, 5) >= PALAMLV[3]) game.train.屈服刻印结算 = 1;
  return 1;
}

/** @COM56 交谈（COMF56:6-196）。 */
async function com56() {
  const cid = target_id();
  era.print(tq(cid, 53) ? '介绍自己' : '交谈');
  await train_message_b();

  if (tal(cid, 85) && abl(cid, 10) >= 5) {
    add_lose(cid, 1, 10);
  } else if (tal(cid, 85)) {
    add_lose(cid, 0, 10);
    add_lose(cid, 1, 10);
  } else if (abl(cid, 10) >= 3) {
    add_lose(cid, 0, 10);
    add_lose(cid, 1, 30);
  } else {
    add_lose(cid, 0, 20);
    add_lose(cid, 1, 50);
  }

  if (tal(cid, 85)) {
    set_src(cid, 16, 60);
  } else if (abl(cid, 10) >= 5) {
    set_src(cid, 15, 10);
    set_src(cid, 16, 50);
  } else if (abl(cid, 10) >= 4) {
    set_src(cid, 15, 20);
    set_src(cid, 16, 40);
  } else if (abl(cid, 10) >= 3) {
    set_src(cid, 15, 30);
    set_src(cid, 16, 30);
  } else if (abl(cid, 10) >= 2) {
    set_src(cid, 15, 40);
    set_src(cid, 16, 20);
  } else {
    set_src(cid, 15, 50);
    set_src(cid, 16, 10);
  }
  add_src(cid, 16, tier([10, 30, 60, 100, 150], palam_level4(cid, 4)));
  add_src(cid, 16, tier([0, 20, 40, 70, 110, 150], abl(cid, 16)));
  set_src(
    cid,
    16,
    times(src(cid, 16), tier([90, 100, 110, 120, 130, 140], abl(cid, 15))),
  );

  if (tq(cid, 53)) {
    set_src(cid, 12, 1000);
    const exposure = abl(cid, 17);
    set_src(cid, 4, tier([0, 10, 50, 100, 200, 400], exposure));
    if (exposure >= 4) add_src(cid, 10, exposure === 4 ? 50 : 100);
    if (tal(cid, 28)) {
      set_src(cid, 4, times(src(cid, 4), 120));
      set_src(cid, 12, times(src(cid, 12), 120));
    }
    if (tal(cid, 89)) {
      set_src(cid, 4, times(src(cid, 4), 160));
      set_src(cid, 12, times(src(cid, 12), 160));
      set_src(cid, 10, times(src(cid, 10), 160));
    }
    if (
      tal(cid, 89) ||
      tal(cid, 85) ||
      abl(cid, 10) >= 3 ||
      abl(cid, 11) >= 4 ||
      exposure >= 2
    ) {
      game.kojo.录像内容 |= 2;
    }
  }

  let gain = tier([1, 1, 2, 2, 3], palam_level4(cid, 4));
  if (tal(cid, 85) && era_flag.assiplay === 0) gain *= 2;
  gain += tier([0, 1, 1, 2, 2, 3], abl(era_flag.player, 15));
  era.print(`调教会话经验＋${gain}`);
  chara(cid).dungeon.调教会话经验 += gain;
  if (abl(cid, 71) > 1 && gain > 2) {
    era.print(`歌唱经验+${gain + abl(cid, 71) - 2}`);
    chara(cid).train.歌唱经验 += gain + abl(cid, 71) - 3;
  }
  if (abl(cid, 72) > 1 && tq(cid, 54) && gain > 2) {
    era.print(`舞蹈经验+${gain + abl(cid, 72) - 2}`);
    chara(cid).train.舞蹈经验 += gain + abl(cid, 72) - 3;
  }
  if (chara(cid).chara.好感度 >= 1000 && era_flag.assiplay === 0) {
    era.print(`爱情经验+${gain}`);
    chara(cid).train.爱情经验 += gain;
  }
  return 1;
}

/** PALAM 某项相对 PALAMLV:1..4 的五档序号。 */
function palam_level4(cid, index) {
  if (palam(cid, index) < PALAMLV[1]) return 0;
  if (palam(cid, index) < PALAMLV[2]) return 1;
  if (palam(cid, index) < PALAMLV[3]) return 2;
  if (palam(cid, index) < PALAMLV[4]) return 3;
  return 4;
}

/** @COM57 羞耻PLAY（COMF57:3-131）。 */
async function com57() {
  const cid = target_id();
  era.print('羞耻PLAY');
  await train_message_b();
  if (chara(cid).train.羞耻PLAY) {
    chara(cid).train.羞耻PLAY = 0;
    return 1;
  }
  add_lose(cid, 1, 200);
  shame_sources(
    cid,
    [60, 100, 160, 200, 260, 380],
    [100, 120, 140, 160, 180, 200],
  );
  chara(cid).train.羞耻PLAY = 1;
  if (
    chara(cid).chara.好感度 >= 1000 &&
    abl(cid, 17) >= 3 &&
    era_flag.assiplay === 0
  ) {
    era.print('爱情经验+1');
    chara(cid).train.爱情经验 += 1;
  }
  return 1;
}

/** @EQUIP_COM57（COMF57:134-254）。 */
async function equip_com57() {
  const cid = target_id();
  era.print('＜羞耻PLAY中＞');
  add_lose(cid, 0, 10);
  add_lose(cid, 1, 100);
  shame_sources(
    cid,
    [30, 100, 200, 360, 460, 580],
    [110, 120, 130, 140, 160, 180],
  );
  same_sex_exp(cid, era_flag.player, 1);
  if (era_flag.assiplay === 0 && abl(cid, 17) >= 3) game.train.主人经验 += 1;
  return 1;
}

/** @COM58 浴室PLAY（COMF58:3-98）。 */
async function com58() {
  const cid = target_id();
  era.print('浴室PLAY');
  await train_message_b();
  if (chara(cid).train.浴室PLAY) {
    if (chara(cid).train.淋浴中) chara(cid).train.淋浴中 = 0; // :13-14 必须先清淋浴
    chara(cid).train.浴室PLAY = 0; // :15
    return 1;
  }
  add_lose(cid, 1, 30);
  bath_sources(cid, 100);
  chara(cid).train.浴室PLAY = 1;
  return 1;
}

/** @EQUIP_COM58（COMF58:100-198）。 */
async function equip_com58() {
  const cid = target_id();
  era.print('＜浴室PLAY中＞');
  add_lose(cid, 0, 20);
  add_lose(cid, 1, 50);
  bath_sources(cid, 70);
  same_sex_exp(cid, era_flag.player, 1);
  if (era_flag.assiplay === 0 && abl(cid, 10) >= 1) game.train.主人经验 += 1;
  if (era_flag.assiplay === 0 && abl(cid, 16) >= 3) game.train.主人经验 += 1;
  return 1;
}

/** @COM59 新妻PLAY（COMF59:3-160）。 */
async function com59() {
  const cid = target_id();
  era.print('新妻PLAY');
  await train_message_b();
  if (chara(cid).train.新妻PLAY) {
    chara(cid).train.新妻PLAY = 0;
    return 1;
  }
  add_lose(cid, 1, 30);
  newlywed_sources(cid);
  chara(cid).train.新妻PLAY = 1;
  newlywed_master_exp(cid);
  if (chara(cid).chara.好感度 >= 1000 && era_flag.assiplay === 0) {
    era.print('爱情经验+2');
    chara(cid).train.爱情经验 += 2;
  }
  return 1;
}

/** @EQUIP_COM59（COMF59:163-318）。 */
async function equip_com59() {
  const cid = target_id();
  era.print('＜新妻PLAY中＞');
  newlywed_sources(cid);
  same_sex_exp(cid, era_flag.player, 1);
  newlywed_master_exp(cid);
  if (chara(cid).chara.好感度 >= 1000 && era_flag.assiplay === 0) {
    era.print('爱情经验+1');
    chara(cid).train.爱情经验 += 1;
  }
  return 1;
}

// —— @COM_ABLE50-59（COMABLE:2246-2506）——

com_able_family.register(50, async () => {
  const cid = target_id();
  if (
    game.train.指令过滤 & 2 ||
    !has_item(25) ||
    tq(cid, 90) ||
    tq(cid, 55) ||
    tq(cid, 18)
  )
    return 0;
  return 1;
});

com_able_family.register(51, async () => {
  const cid = target_id();
  if (game.train.指令过滤 & 2) return 0;
  if (!has_item(26) && !tq(cid, 90)) return 0;
  if (tal(cid, 56) || tq(cid, 55)) return 0;
  return 1;
});

com_able_family.register(52, async () => {
  const cid = target_id();
  if (game.train.指令过滤 & 2) return 0;
  if (!has_item(27) && !tq(cid, 90)) return 0;
  if (tal(cid, 56) && !tq(cid, 90)) return 0;
  if (chara(cid).system.利尿剂 || tq(cid, 59) || tq(cid, 55)) return 0;
  return 1;
});

com_able_family.register(53, async () => {
  const cid = target_id();
  if (chara(cid).train.录像摄影) return 1;
  if (game.train.索求口上抑制 === 555) return 0;
  return has_item(6) && has_item(28) ? 1 : 0;
});

com_able_family.register(54, async () => {
  const cid = target_id();
  if (chara(cid).train.野外PLAY) return 1;
  if (!has_item(18) || (abl(cid, 10) <= 2 && abl(cid, 21) <= 2)) return 0;
  if (tq(cid, 90) || tq(cid, 55) || tq(cid, 58) || tq(cid, 59)) return 0;
  return 1;
});

com_able_family.register(55, async () => (tq(target_id(), 55) ? 0 : 1));

com_able_family.register(56, async () => {
  const cid = target_id();
  return era.get('tflag:899') || tq(cid, 45) || tq(cid, 90) || tq(cid, 88)
    ? 0
    : 1;
});

com_able_family.register(57, async () => {
  const cid = target_id();
  if (chara(cid).train.羞耻PLAY) return 1;
  if (!has_item(16) || abl(cid, 10) <= 1) return 0;
  if (
    tq(cid, 54) ||
    tq(cid, 58) ||
    tq(cid, 90) ||
    tq(cid, 89) ||
    tq(cid, 88) ||
    tq(cid, 55) ||
    tq(cid, 59)
  )
    return 0;
  return 1;
});

com_able_family.register(58, async () => {
  const cid = target_id();
  if (chara(cid).train.浴室PLAY) return 1;
  if (abl(cid, 10) <= 1) return 0;
  if (tal(cid, 124) && abl(cid, 10) <= 2) return 0;
  if (
    era_flag.assi > 0 &&
    tal(era_flag.assi, 124) &&
    abl(era_flag.assi, 10) <= 2
  )
    return 0;
  if (
    tq(cid, 54) ||
    tq(cid, 57) ||
    tq(cid, 90) ||
    tq(cid, 89) ||
    tq(cid, 88) ||
    tq(cid, 55) ||
    tq(cid, 59)
  )
    return 0;
  const worn = era.get(`cflag:${cid}:40`) || 0;
  if (
    worn &&
    era.get('flag:37') &&
    (worn !== 64 || (era.get(`cflag:${cid}:42`) || 0) <= 70)
  )
    return 0;
  return 1;
});

com_able_family.register(59, async () => {
  const cid = target_id();
  if (chara(cid).train.新妻PLAY) return 1;
  if (!has_item(19) || era_flag.assiplay || abl(cid, 0) <= 2) return 0;
  if (
    tq(cid, 54) ||
    tq(cid, 57) ||
    tq(cid, 58) ||
    tq(cid, 90) ||
    tq(cid, 89) ||
    tq(cid, 88) ||
    tq(cid, 55)
  )
    return 0;
  return (era.get(`cflag:${cid}:40`) || 0) && era.get('flag:37') ? 0 : 1;
});

// —— TRAIN_MESSAGE_B（EVENT_TRAIN_MESSAGE_B:1901-2063）——

train_message_b_family.register(50, async () => {
  era.print(`${clothtype_text(target_id())}的${target_name()}被涂满了润滑液…`);
});

train_message_b_family.register(51, async () => {
  const cid = target_id();
  if (tq(cid, 90)) {
    era.print('伸出了带有催淫液体的触手、');
  } else if (tq(cid, 55)) {
    era.print('媚药的成分、开始渗透到体内了、');
  } else {
    let line = `${chara_callname(era_flag.player)}抱着${target_name()}`;
    if (abl(era_flag.player, 12) >= 3) line += '嘴对嘴';
    if (abl(cid, 10) <= 2) line += '强行';
    era.print(`${line}灌入媚药。`);
  }
  era.print(`${target_name()}呼吸紊乱、面颊发红、全身开始滚烫起来了…`);
});

train_message_b_family.register(52, async () => {
  const cid = target_id();
  if (tq(cid, 90)) {
    era.print('伸出了极细的触手、把利尿剂直接射到尿道里了…');
  } else {
    let line = `${chara_callname(era_flag.player)}抱着${target_name()}`;
    if (abl(era_flag.player, 12) >= 3) line += '嘴对嘴';
    if (abl(cid, 10) <= 2) line += '强行';
    era.print(`${line}灌入利尿剂。`);
  }
  if ((era.get('tflag:899') || 0) === 0) {
    era.print(
      `${target_name()}呼吸紊乱、${!tal(cid, 45) && !tal(cid, 310) ? '梨花带雨地' : ''}忍耐着尿意…`,
    );
  }
});

train_message_b_family.register(53, async () => {
  era.print(
    chara(target_id()).train.录像摄影
      ? '★★★录像摄影结束★★★'
      : '★★★录像摄影开始★★★',
  );
});

train_message_b_family.register(54, async () => {
  const cid = target_id();
  if (chara(cid).train.野外PLAY) {
    era.print('回到了房间……');
    return;
  }
  let line = `${clothtype_text(cid)}的${target_name()}`;
  if (era_flag.assi > 0) {
    const assi = era_flag.assi;
    const same_cloth = [40, 41, 42].every(
      (index) =>
        (era.get(`cflag:${cid}:${index}`) || 0) ===
        (era.get(`cflag:${assi}:${index}`) || 0),
    );
    line += same_cloth
      ? `和${chara_callname(assi)}`
      : `和${clothtype_text(assi)}的${chara_callname(assi)}`;
  }
  line +=
    (era.get(`cflag:${cid}:40`) || 0) & 64 &&
    (era.get(`cflag:${cid}:42`) || 0) === 71
      ? `被绳子拴着、跟${chara_nickname(MASTER)}出去了…`
      : `戴着颈圈、跟着${chara_nickname(MASTER)}出去了…`;
  era.print(line);
});

train_message_b_family.register(56, async () => {
  era.print(`${chara_callname(era_flag.player)}对${target_name()}说话了…`);
});

train_message_b_family.register(57, async () => {
  const cid = target_id();
  era.print(
    chara(cid).train.羞耻PLAY
      ? `${target_name()}离开了镜子…`
      : `${clothtype_text(cid)}的${target_name()}被推到镜子前…`,
  );
});

train_message_b_family.register(58, async () => {
  era.print(
    chara(target_id()).train.浴室PLAY
      ? `${chara_callname(era_flag.player)}带${target_name()}回了房间…`
      : `${chara_callname(era_flag.player)}带${target_name()}去了浴室…`,
  );
});

train_message_b_family.register(59, async () => {
  const cid = target_id();
  if (chara(cid).train.新妻PLAY) {
    era.print(`${target_name()}的围裙脱了下来…`);
    return;
  }
  const skin = tal(cid, 244)
    ? '蓝色的'
    : tal(cid, 253)
      ? '褐色的'
      : tal(cid, 255)
        ? '白皙的'
        : '';
  era.print(`${target_name()}${skin}肌肤被围裙包裹着…`);
});

// —— TRAIN_MESSAGE_A：原作仅 COM55 有分支；其余显式 no-op。 ——

train_message_a_family.register(55, async () => {
  const cid = target_id();
  if ((era.get('tflag:899') || 0) > 1 || palam(cid, 5) < PALAMLV[3]) return;
  let line = `${target_name()}急促的呼吸着`;
  if (palam(cid, 5) >= PALAMLV[5]) line += '、用炽热地目光看向你';
  if (tq(cid, 21)) line += '、身体不断地颤抖着';
  if (palam(cid, 5) >= PALAMLV[4])
    line += '、紧蹙摩擦的双腿已经捂不住流淌出的粘液了';
  era.print(`${line}……`);
});

for (const id of [50, 51, 52, 53, 54, 56, 57, 58, 59]) {
  train_message_a_family.register(id, async () => {});
}

// —— 分发族注册 ——

com_family.register(50, com50);
com_family.register(51, com51);
com_family.register(52, com52);
com_family.register(53, com53);
com_family.register(54, com54);
com_family.register(55, com55);
com_family.register(56, com56);
com_family.register(57, com57);
com_family.register(58, com58);
com_family.register(59, com59);

equip_com_family.register(53, equip_com53);
equip_com_family.register(54, equip_com54);
equip_com_family.register(57, equip_com57);
equip_com_family.register(58, equip_com58);
equip_com_family.register(59, equip_com59);

module.exports = {
  STUBBED_CALLS,
  bath_sources,
  clear_video_records,
  com50,
  com51,
  com52,
  com53,
  com54,
  com55,
  com56,
  com57,
  com58,
  com59,
  equip_com53,
  equip_com54,
  equip_com57,
  equip_com58,
  equip_com59,
  newlywed_sources,
  outdoor_sources,
  shame_sources,
};
