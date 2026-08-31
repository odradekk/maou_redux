/**
 * @file 调教指令 120–135「追加与高级」族：@COM、@COM_ABLE、TRAIN_MESSAGE_A/B
 * 分支，以及 @GET_ADV_COM CASE 135（自助舔舐 → 口交时自慰）升格规则。
 *
 * 源: target/ERB/調教相關/COMF120_挿入Ｇスポ責め.ERB       @COM120
 *     target/ERB/調教相關/COMF121_挿入子宮口責め.ERB     @COM121
 *     target/ERB/調教相關/COMF122_兜あわせ.ERB           @COM122
 *     target/ERB/調教相關/COMF123_パイズリフェラ.ERB     @COM123
 *     target/ERB/調教相關/COMF124_ディープスロート.ERB   @COM124
 *     target/ERB/調教相關/COMF125_フェラ自慰.ERB         @COM125
 *     target/ERB/調教相關/COMF126_手コキフェラ.ERB       @COM126
 *     target/ERB/調教相關/COMF127_バキュームフェラ.ERB   @COM127
 *     target/ERB/調教相關/COMF128_正常位・キス.ERB       @COM128
 *     target/ERB/調教相關/COMF129_正常位・胸愛撫.ERB     @COM129
 *     target/ERB/調教相關/COMF130_正常位ＳＰ.ERB         @COM130
 *     target/ERB/調教相關/COMF131_後背位・胸愛撫.ERB     @COM131
 *     target/ERB/調教相關/COMF132_後背位・スパンキング.ERB @COM132
 *     target/ERB/調教相關/COMF133_立ちバック.ERB         @COM133
 *     target/ERB/調教相關/COMF134_後背位ＳＰ.ERB         @COM134
 *     target/ERB/調教相關/COMF135_セルフクンニ.ERB       @COM135
 *     target/ERB/調教相關/COMABLE.ERB                   @COM_ABLE120-135（:3728-4622）
 *     target/ERB/調教相關/COMF_JUMP.ERB                 @GET_ADV_COM CASE 135（:666-682）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB        @TRAIN_MESSAGE_A
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB        @TRAIN_MESSAGE_B
 *
 * J19（issue #229）。122 与 135 在 Train.csv（可直选）；其余 14 条是高级 COM，
 * 只能经 @GET_ADV_COM 升格抵达，但进 DECLARED_COM_IDS 分发空间（#213）。
 *
 * **COM135 头部 `LOCAL = 21` 是源侧原文**（COMF135:14），与 COMF21 同形——
 * 执行时走 CASE 21（背后位升格），不是 CASE 135。CASE 135 只挂在可直选号
 * 135 上，供 @SHOW_COMMENU 的标签升格（口交时自慰）使用。
 *
 * 高级 COM（120/121/123-134）均显式 `SELECTCOM = <自己的号>` 回填号位；
 * 122/135 是可直选指令，源侧没有这条赋值。
 *
 * TRAIN_MESSAGE 分支先登记空操作，避免「族票未落地」占位行；文案随各指令
 * 真身切片填入。口上（@KOJO_MESSAGE_COM_<n>）随轴 B，本票不写台词。
 *
 * COM135 经 CASE 21 可能跳到 COM64（三人，J15）。真身未落地时走登记存根。
 */
const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { EXPLV } = require('#/era-utils/exp-level');
const { PALAMLV } = require('#/era-utils/palam-level');
const { game } = require('#/facade/game');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const { com_able_family, com_family } = require('#/system/train/com-family');
const { com_order } = require('#/system/train/com-order');
const {
  com_after_vagina_sex,
  com_ejac_player_sex,
} = require('#/system/train/com-vaginasex');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { read_train_name } = require('#/system/train/train-name');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/** CASE 21 升格可能命中、但尚未由助手族落地的目标。 */
const STUBBED_CALLS = ['COM64'];

const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
const palam = (id, i) => era.get(`palam:${id}:${i}`) || 0;
const exp = (id, i) => era.get(`exp:${id}:${i}`) || 0;
const stain = (id, i) => era.get(`stain:${id}:${i}`) || 0;
const src = (id, i) => era.get(`source:${id}:${i}`) || 0;
const set_src = (id, i, v) => era.set(`source:${id}:${i}`, v);
const add_src = (id, i, v) => era.add(`source:${id}:${i}`, v);
const add_lose = (id, i, v) => era.add(`deltabase:${id}:${i}`, -v);
const times = (value, multiplier) => Math.floor(value * multiplier);
const worn = (id) => era.get(`cflag:${id}:40`) || 0;
const special = (id) => era.get(`cflag:${id}:42`) || 0;
const clothes_on = () => (era.get('flag:37') || 0) !== 0;
const target_name = () => chara_callname(era_flag.target);
const player_name = () => chara_callname(era_flag.player);
const player_nickname = () => chara_nickname(era_flag.player);
const name_of = (table, id) => era.get(`${table}:${id}`) ?? '';
const has_pband = () => (era.get('item:4') || 0) !== 0;
const has_mat = () =>
  (era.get('item:13') || 0) !== 0 || (era.get('noitem:0') || 0) !== 0;

const clothing_guard = (cid) => (worn(cid) & 17) !== 0 && clothes_on();
const bra_guard = (cid) => (worn(cid) & 6) !== 0 && clothes_on();
const diaper_guard = (cid) =>
  special(cid) === 69 && (worn(cid) & 64) !== 0 && clothes_on();
const belt_guard = (cid) =>
  special(cid) === 79 && (worn(cid) & 64) !== 0 && clothes_on();
const zuko_guard = (cid) =>
  special(cid) === 11 && (worn(cid) & 64) !== 0 && clothes_on();

function assi_virgin_guard(cid) {
  return (
    exp(cid, 0) === 0 &&
    era_flag.assiplay &&
    (abl(era_flag.assi, 10) <= 4 || abl(era_flag.assi, 22) <= 4) &&
    !tal(era_flag.assi, 83)
  );
}

function assi_lube_guard(cid) {
  return (
    palam(cid, 3) < PALAMLV[2] &&
    era_flag.assiplay &&
    (abl(era_flag.assi, 10) <= 3 || abl(era_flag.assi, 22) <= 3) &&
    !tal(era_flag.assi, 83)
  );
}

function filthy_player() {
  const s = stain(era_flag.player, 2);
  return (
    ((s & 1) !== 0 || (s & 4) !== 0 || (s & 8) !== 0 || (s & 32) !== 0) &&
    abl(era_flag.target, 10) <= 3 &&
    tal(era_flag.target, 62) &&
    !tal(era_flag.target, 64)
  );
}

function same_trainer() {
  return era_flag.assiplay
    ? game.system.上次调教者是助手 !== 0
    : game.system.上次调教者是助手 === 0;
}

async function jump_to_advanced(id) {
  if (com_family.has(id)) return com_family.call(id);
  stub_line(`COM${id}`, `指令 ${id} 的升格目标`, '随追加与高级指令票');
  return 1;
}

/**
 * 插入系高级 COM 的共形守卫（COMABLE.ERB:3728-4587）。
 * @param {{ skill?: boolean, duel?: boolean, beast?: boolean }} [opts]
 */
function insert_able(opts = {}) {
  const { skill = false, duel = true, beast = true } = opts;
  const target = era_flag.target;
  const player = era_flag.player;
  if (game.train.自由调教跳转 === 1) return 0; // 追加指令未许可
  if (skill) return 0;
  if (tequip(target, 11)) return 0; // 震动器
  if (tal(target, 122)) return 0; // 男人
  if (tal(target, 135) && !tal(player, 83)) return 0; // 未熟且非施虐狂
  if (!tal(player, 121) && !tal(player, 122) && !has_pband()) return 0;
  if (assi_virgin_guard(target)) return 0;
  if (assi_lube_guard(target)) return 0;
  if (tequip(target, 90)) return 0; // 触手
  if (beast && tequip(target, 89)) return 0; // 兽奸
  if (tequip(target, 88)) return 0; // 使役
  if (duel && tequip(target, 55)) return 0; // 决斗
  if (tequip(target, 58) && !has_mat()) return 0; // 浴室无地垫
  if (clothing_guard(target)) return 0;
  if (diaper_guard(target)) return 0;
  if (belt_guard(target)) return 0;
  if (tal(target, 273)) return 0; // 贞操封印
  if (zuko_guard(target)) return 0;
  return 1;
}

function able120() {
  return insert_able();
}

function able121() {
  return insert_able();
}

function able122() {
  const target = era_flag.target;
  const player = era_flag.player;
  if (game.train.自由调教跳转 === 1) return 0;
  if (!tal(target, 121) && !tal(target, 122)) return 0; // 对象需男人/扶她
  if (!tal(player, 121) && !tal(player, 122) && !has_pband()) return 0;
  if (tequip(target, 90)) return 0;
  if (tequip(target, 89)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 55)) return 0;
  if (clothing_guard(target)) return 0;
  if (diaper_guard(target)) return 0;
  if (belt_guard(target)) return 0;
  if (zuko_guard(target)) return 0;
  return 1;
}

function oral_common(opts = {}) {
  const {
    skill_and,
    extra = () => false,
    pants = false,
    diaper = false,
    rope_mouth = true,
  } = opts;
  const target = era_flag.target;
  const player = era_flag.player;
  if (game.train.自由调教跳转 === 1) return 0;
  if ((era.get('tflag:899') || 0) > 0) return 0; // 失神
  if (skill_and) return 0;
  if (extra()) return 0;
  if (!tal(player, 121) && !tal(player, 122)) return 0;
  if (tal(target, 151)) return 0; // 绝不侍奉
  if (filthy_player()) return 0;
  if (rope_mouth && tequip(target, 45)) return 0; // 口塞
  if (rope_mouth && tequip(target, 44)) return 0; // 绳子
  if (tequip(target, 90)) return 0;
  if (tequip(target, 89)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 55)) return 0;
  if (pants && clothing_guard(target)) return 0;
  if (diaper && diaper_guard(target)) return 0;
  if (zuko_guard(target)) return 0;
  return 1;
}

function able123() {
  const target = era_flag.target;
  return oral_common({
    skill_and:
      abl(target, 10) < 3 && abl(target, 12) < 3 && abl(target, 13) < 3,
    extra: () => {
      if (tal(target, 122)) return true; // 男人
      if (tal(target, 116)) return true; // 绝壁
      if (
        !tal(target, 114) &&
        !tal(target, 110) &&
        !tal(target, 119) &&
        abl(target, 12) < 3
      )
        return true;
      if (tal(target, 109) && abl(target, 12) < 4) return true; // 贫乳需技巧 4+
      return bra_guard(target);
    },
  });
}

function able124() {
  const target = era_flag.target;
  return oral_common({
    skill_and:
      abl(target, 10) < 3 && abl(target, 12) < 3 && abl(target, 16) < 3,
  });
}

function able125() {
  const target = era_flag.target;
  return oral_common({
    skill_and:
      abl(target, 10) < 3 && abl(target, 12) < 3 && abl(target, 13) < 3,
    extra: () => {
      if (
        era_flag.assiplay &&
        (abl(era_flag.assi, 10) <= 3 || abl(era_flag.assi, 22) <= 3) &&
        !tal(era_flag.assi, 87)
      )
        return true;
      return tal(target, 150) !== 0; // 从不自慰
    },
    pants: true,
    diaper: true,
  });
}

function able126() {
  const target = era_flag.target;
  return oral_common({
    skill_and:
      abl(target, 10) < 3 && abl(target, 12) < 3 && abl(target, 16) < 3,
  });
}

function able127() {
  const target = era_flag.target;
  return oral_common({
    skill_and:
      abl(target, 10) < 3 && abl(target, 12) < 3 && abl(target, 16) < 3,
  });
}

function able128() {
  const target = era_flag.target;
  const player = era_flag.player;
  return insert_able({
    skill: abl(player, 12) < 3 && abl(target, 14) < 2,
    duel: false,
    beast: true,
  });
}

function able129() {
  const target = era_flag.target;
  const player = era_flag.player;
  return insert_able({
    skill: abl(player, 12) < 3 && abl(target, 14) < 2,
  });
}

function able130() {
  const target = era_flag.target;
  const player = era_flag.player;
  return insert_able({
    skill: abl(player, 12) < 5 && abl(target, 14) < 3,
  });
}

function able131() {
  const target = era_flag.target;
  const player = era_flag.player;
  return insert_able({
    skill: abl(player, 12) < 3 && abl(target, 14) < 2,
    beast: false,
  });
}

function able132() {
  const target = era_flag.target;
  const player = era_flag.player;
  return insert_able({
    skill: abl(player, 12) < 3 && abl(target, 14) < 2,
    beast: false,
  });
}

function able133() {
  const target = era_flag.target;
  const player = era_flag.player;
  return insert_able({
    skill: abl(player, 12) < 4 && abl(target, 14) < 3,
    beast: false,
  });
}

function able134() {
  const target = era_flag.target;
  const player = era_flag.player;
  return insert_able({
    skill: abl(player, 12) < 5 && abl(target, 14) < 3,
    beast: false,
  });
}

function able135() {
  const target = era_flag.target;
  if (tal(target, 314) !== 4) return 0; // 无头骑士
  if (tal(target, 122)) return 0; // 男人
  if (tequip(target, 90)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 55)) return 0;
  if (clothing_guard(target)) return 0;
  if (diaper_guard(target)) return 0;
  if (zuko_guard(target)) return 0;
  if (
    ((stain(target, 2) & 4) !== 0 ||
      (stain(target, 2) & 8) !== 0 ||
      (stain(target, 2) & 32) !== 0) &&
    era_flag.assiplay &&
    abl(era_flag.assi, 0) <= 3 &&
    tal(era_flag.assi, 62) &&
    !tal(era_flag.assi, 64)
  )
    return 0;
  return 1;
}
function times_src(cid, index, multiplier) {
  set_src(cid, index, times(src(cid, index), multiplier));
}

/** @COM120 的 SOURCE 计算（COMF120:29-381）。PALAM:13 是源侧原文。 */
function source120() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const prev = era_flag.prevcom;

  if (prev === 34) {
    add_lose(cid, 0, 60);
    add_lose(cid, 1, 150);
    set_src(cid, 12, 1300);
  } else {
    add_lose(cid, 0, 50);
    add_lose(cid, 1, 100);
    set_src(cid, 12, 900);
  }

  const v_feel = [
    [150, 100],
    [200, 180],
    [600, 250],
    [2000, 380],
    [2600, 500],
    [3400, 800],
  ][Math.min(abl(cid, 2), 5)];
  set_src(cid, 1, v_feel[0]);
  set_src(cid, 3, v_feel[1]);

  const e0 = exp(cid, 0);
  if (e0 < EXPLV[1]) {
    times_src(cid, 1, 0.2);
    set_src(cid, 6, 300);
  } else if (e0 < EXPLV[2]) {
    times_src(cid, 1, 0.6);
    set_src(cid, 6, 100);
  } else if (e0 < EXPLV[3]) {
    times_src(cid, 1, 1);
    set_src(cid, 6, 10);
  } else if (e0 < EXPLV[4]) {
    times_src(cid, 1, 1.2);
    set_src(cid, 6, 0);
  } else if (e0 < EXPLV[5]) {
    times_src(cid, 1, 1.3);
    set_src(cid, 6, 0);
  } else {
    times_src(cid, 1, 1.8);
    set_src(cid, 6, 0);
  }

  if (palam(cid, 3) < PALAMLV[1]) {
    times_src(cid, 1, 0.1);
    add_src(cid, 6, 1000);
    times_src(cid, 6, 3);
  } else if (palam(cid, 3) < PALAMLV[2]) {
    times_src(cid, 1, 0.4);
    add_src(cid, 6, 300);
    times_src(cid, 6, 1);
  } else if (palam(cid, 3) < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 6, 0.5);
  } else if (palam(cid, 3) < PALAMLV[4]) {
    times_src(cid, 1, 1.4);
    times_src(cid, 6, 0.2);
  } else {
    times_src(cid, 1, 1.8);
    times_src(cid, 6, 0.1);
  }

  if (prev === 22) {
    times_src(cid, 1, 0.7);
    times_src(cid, 3, 0.9);
  } else if (prev === 23) {
    times_src(cid, 1, 1.3);
    times_src(cid, 3, 1.1);
  }

  if (tal(player, 122)) times_src(cid, 1, 2.5);
  if (tal(cid, 100)) times_src(cid, 6, 2);

  if (tal(cid, 30)) {
    if (tal(cid, 0) === 1) {
      times_src(cid, 3, 0.6);
      times_src(cid, 14, 5);
      set_src(cid, 15, 2000);
    } else {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 1000);
    }
  } else if (tal(cid, 31)) {
    if (tal(cid, 0) === 1) {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 300);
    }
  } else if (tal(cid, 0) === 1) {
    set_src(cid, 15, 3000);
  }

  // PALAM:13 是源侧原文（COMF20 写 PALAM:5）；本票 1:1 保留
  if (palam(cid, 13) < PALAMLV[1]) {
    times_src(cid, 1, 0.6);
    times_src(cid, 3, 0.3);
  } else if (palam(cid, 13) < PALAMLV[2]) {
    times_src(cid, 1, 0.8);
    times_src(cid, 3, 0.6);
  } else if (palam(cid, 13) < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 3, 1);
  } else if (palam(cid, 13) < PALAMLV[4]) {
    times_src(cid, 1, 1.2);
    times_src(cid, 3, 1.5);
  } else {
    times_src(cid, 1, 1.5);
    times_src(cid, 3, 1.8);
  }

  const obey = [
    [0.5, 0.6, 2],
    [0.8, 0.8, 1.5],
    [1, 1, 1],
    [1.3, 1.2, 0.8],
    [1.6, 1.4, 0.6],
    [2, 1.6, 0.3],
  ][Math.min(abl(cid, 10), 5)];
  times_src(cid, 1, obey[0]);
  times_src(cid, 3, obey[1]);
  times_src(cid, 15, obey[2]);

  if (prev === 34) {
    const spirit = [
      [200, 50, 300],
      [250, 200, 100],
      [350, 550, 30],
      [450, 900, 0],
      [600, 1500, 0],
      [750, 2200, 0],
    ][Math.min(abl(cid, 13), 5)];
    set_src(cid, 4, spirit[0]);
    set_src(cid, 5, spirit[1]);
    set_src(cid, 14, spirit[2]);
    const skill = [
      [0.3, 0.3],
      [0.6, 0.6],
      [1, 1],
      [1.1, 1.1],
      [1.3, 1.2],
      [1.5, 1.4],
    ][Math.min(abl(cid, 12), 5)];
    times_src(cid, 1, skill[0]);
    times_src(cid, 3, skill[1]);
  }

  if (prev === 612) {
    const breast = [
      [50, 50, 50],
      [200, 200, 200],
      [500, 500, 400],
      [1000, 600, 600],
      [1600, 1000, 1000],
    ];
    if (abl(cid, 1) <= 4) {
      const row = breast[abl(cid, 1)];
      set_src(cid, 17, row[0]);
      add_src(cid, 3, row[1]);
      add_src(cid, 4, row[2]);
    } else {
      set_src(cid, 3, 2100); // 源 ELSE 写 SOURCE:3 = 2100，不是 SOURCE:17
      add_src(cid, 3, 1400);
      add_src(cid, 4, 1400);
    }
    const clit = [
      [40, 50],
      [160, 200],
      [700, 400],
      [1500, 600],
      [2400, 1000],
      [3600, 1400],
    ][Math.min(abl(cid, 0), 5)];
    add_src(cid, 0, clit[0]);
    add_src(cid, 4, clit[1]);
    const skill_rows = [
      [100, 100, 50, 100, 50, 0, 0, 0],
      [200, 200, 150, 150, 100, 50, 100, 0],
      [300, 300, 250, 200, 200, 100, 200, 50],
      [500, 400, 500, 300, 300, 150, 300, 100],
      [800, 500, 800, 500, 400, 250, 400, 300],
      [1200, 600, 1200, 800, 600, 400, 500, 500],
    ][Math.min(abl(player, 12), 5)];
    add_src(cid, 0, skill_rows[0]);
    add_src(cid, 1, skill_rows[1]);
    add_src(cid, 17, skill_rows[2]);
    add_src(cid, 3, skill_rows[3]);
    add_src(cid, 4, skill_rows[4]);
    add_src(cid, 10, skill_rows[5]);
    add_src(cid, 11, skill_rows[6]);
    let extra = skill_rows[7];
    const expose = [0.6, 1, 1.5, 2.4, 3.6, 5.8][Math.min(abl(cid, 17), 5)];
    const expose_add = [100, 200, 400, 700, 1200, 2000][
      Math.min(abl(cid, 17), 5)
    ];
    add_src(cid, 7, expose_add);
    add_src(cid, 10, expose_add);
    extra = times(extra, expose);
    add_src(cid, 0, extra);
    add_src(cid, 1, extra);
    add_src(cid, 3, extra);
    if (e0 >= EXPLV[3]) add_src(cid, 1, extra);
    if (tal(cid, 85)) times_src(cid, 3, 2);
  }
}

async function message_b120() {
  const cid = era_flag.target;
  const prev = era_flag.prevcom;
  const fainted = (era.get('tflag:899') || 0) !== 0;
  const e0 = exp(cid, 0);
  if (prev === 34 && !fainted) {
    era.print(
      `${target_name()}上半身夸张地痉挛着、私处内最敏感的那一点、被阴茎好好地疼爱了…`,
    );
    if (e0 <= 30) {
      era.print(`${target_name()}露出略感困惑的神情、但这个行动还在持续着…`);
    } else if (e0 <= 50) {
      era.print(`${target_name()}追逐着快感、积极地扭动着腰肢…`);
    } else if (e0 <= 80) {
      era.print(
        `${target_name()}屁股用力收缩、腰部轻微地颤抖着、发出了娇媚的呻吟…`,
      );
    } else if (e0 <= 120) {
      era.print(`${target_name()}身子后仰、双手后撑、激烈地扭腰追逐着快感…`);
      era.print('被紧紧夹着的阴茎、不断摩擦着Ｇ点…');
    } else {
      era.print(
        `${target_name()}的要害被进攻了、腰身一边不停痉挛着、一边积极扭动着追逐着快感…`,
      );
      era.print(
        '每一下的抽插、私处内都发出了啧啧的水声、从喉咙深处发出了带着鼻音的淫靡呻吟…',
      );
    }
    return;
  }
  if (prev === 20 || prev === 128 || prev === 129 || prev === 130) {
    era.print(
      `从下往上地挺动着腰、${target_name()}私处内最敏感的那一点、被仔细摩擦着…`,
    );
  } else if (
    prev === 21 ||
    prev === 131 ||
    prev === 132 ||
    prev === 133 ||
    prev === 134
  ) {
    era.print(`上身趴下、${target_name()}私处内最敏感的那一点、被不停突进着…`);
  } else if (prev === 22) {
    era.print(
      `放开上身、压着${target_name()}的小腹、仔细摩擦着私处内最敏感的那一点…`,
    );
  } else if (prev === 23) {
    era.print(
      `抓住${target_name()}的腰把她整个人上下套弄着、顽强地刺激私处内的那一点…`,
    );
  }
  if (fainted) return;
  if (e0 <= 30) {
    era.print(`${target_name()}艰难地晃动着腰…`);
  } else if (e0 <= 50) {
    era.print(`${target_name()}紧闭嘴唇、忍受着不熟悉的快感…`);
  } else if (e0 <= 80) {
    era.print(`${target_name()}的要害被进攻了、深远的快感让她眼睛都亮了起来…`);
  } else if (e0 <= 120) {
    era.print(`${player_name()}奋力地扭动着腰、私处内的肉壁剧烈收缩、颤抖着…`);
    era.print(`${target_name()}最敏感的地方被侵犯了、喷出了炽热的气息…`);
  } else {
    era.print(
      `${target_name()}的喉咙差点被自己的口水呛到、手指脚趾紧紧地收合着、不停摇头、似乎感到苦闷…`,
    );
    era.print('连呼吸都变得困难了、张大嘴巴却发不出声音、只能娇媚地喘着大气…');
  }
}

async function message_a120() {
  const amount = era.get('tflag:2') || 0;
  if (amount !== 1 && amount !== 2) return;
  era.print(
    `对准${target_name()}私处内那最敏感的那一点、${player_name()}射出了${amount === 2 ? '大量的' : ''}精液…`,
  );
  if (palam(era_flag.target, 5) < PALAMLV[4] || era.get('tflag:31')) {
    era.set('tflag:31', 0);
    era.set('tflag:60', 0);
  }
}

/** @COM120（COMF120_挿入Ｇスポ責め.ERB）插入Ｇ点蹂躏。高级 COM。 */
async function com120() {
  const select = era_flag.selectcom;
  game.train.三人PLAY持续 = 0;
  if (select === 34 || (select >= 20 && select <= 23)) {
    era.print(`${read_train_name(select)}Ｇ点蹂躏`);
  } else {
    era.print('插入Ｇ点蹂躏');
  }
  era_flag.selectcom = 120; // 原作显式 SELECTCOM = 120（升格抵达时回填号位）
  await train_message_b();
  const cid = era_flag.target;
  game.train.伴V经验指令 = 1;
  if (tal(cid, 85) && !era_flag.assiplay && exp(cid, 0) === 0) {
    game.train.主人导致处女丧失 = 1;
  }
  await com_ejac_player_sex();
  source120();
  await com_after_vagina_sex();
  return 1;
}

/** @COM121 的 SOURCE 计算（COMF121:29-414）。润滑低档乘 SOURCE:0 是源侧原文。 */
function source121() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const prev = era_flag.prevcom;

  if (prev === 34) {
    add_lose(cid, 0, 60);
    add_lose(cid, 1, 150);
    set_src(cid, 12, 900);
  } else {
    add_lose(cid, 0, 50);
    add_lose(cid, 1, 100);
    set_src(cid, 12, 400);
  }

  set_src(cid, 0, 0);
  if (prev === 20 || prev === 22 || prev === 34) {
    set_src(cid, 0, [20, 100, 400, 900, 1400, 2100][Math.min(abl(cid, 0), 5)]);
  }

  const v_feel = [
    [10, 100],
    [30, 180],
    [400, 250],
    [800, 380],
    [2700, 500],
    [3800, 800],
  ][Math.min(abl(cid, 2), 5)];
  set_src(cid, 1, v_feel[0]);
  set_src(cid, 3, v_feel[1]);

  const e0 = exp(cid, 0);
  if (e0 < EXPLV[1]) {
    times_src(cid, 1, 0.2);
    set_src(cid, 6, 300);
  } else if (e0 < EXPLV[2]) {
    times_src(cid, 1, 0.6);
    set_src(cid, 6, 100);
  } else if (e0 < EXPLV[3]) {
    times_src(cid, 1, 1);
    set_src(cid, 6, 10);
  } else if (e0 < EXPLV[4]) {
    times_src(cid, 1, 1.2);
    set_src(cid, 6, 0);
  } else if (e0 < EXPLV[5]) {
    times_src(cid, 1, 1.3);
    set_src(cid, 6, 0);
  } else {
    times_src(cid, 1, 1.8);
    set_src(cid, 6, 0);
  }

  if (palam(cid, 3) < PALAMLV[1]) {
    times_src(cid, 0, 0.5);
    times_src(cid, 6, 0.1);
    add_src(cid, 6, 1000);
    times_src(cid, 6, 3);
  } else if (palam(cid, 3) < PALAMLV[2]) {
    times_src(cid, 0, 0.6);
    times_src(cid, 6, 0.4);
    add_src(cid, 6, 300);
    times_src(cid, 6, 1);
  } else if (palam(cid, 3) < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 6, 0.5);
  } else if (palam(cid, 3) < PALAMLV[4]) {
    times_src(cid, 1, 1.4);
    times_src(cid, 6, 0.2);
  } else {
    times_src(cid, 1, 1.8);
    times_src(cid, 6, 0.1);
  }

  if (prev === 22) {
    times_src(cid, 1, 1.3);
    times_src(cid, 3, 1.1);
  } else if (prev === 23) {
    times_src(cid, 1, 0.7);
    times_src(cid, 3, 0.9);
  }

  if (tal(player, 122)) times_src(cid, 1, 2.5);
  if (tal(cid, 100)) times_src(cid, 6, 2);

  if (tal(cid, 30)) {
    if (tal(cid, 0) === 1) {
      times_src(cid, 3, 0.6);
      times_src(cid, 14, 5);
      set_src(cid, 15, 2000);
    } else {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 1000);
    }
  } else if (tal(cid, 31)) {
    if (tal(cid, 0) === 1) {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 300);
    }
  } else if (tal(cid, 0) === 1) {
    set_src(cid, 15, 3000);
  }

  if (palam(cid, 5) < PALAMLV[1]) {
    times_src(cid, 0, 0.6);
    times_src(cid, 1, 0.6);
    times_src(cid, 3, 0.3);
  } else if (palam(cid, 5) < PALAMLV[2]) {
    times_src(cid, 0, 0.8);
    times_src(cid, 1, 0.8);
    times_src(cid, 3, 0.6);
  } else if (palam(cid, 5) < PALAMLV[3]) {
    times_src(cid, 0, 1);
    times_src(cid, 1, 1);
    times_src(cid, 3, 1);
  } else if (palam(cid, 5) < PALAMLV[4]) {
    times_src(cid, 0, 1.2);
    times_src(cid, 1, 1.2);
    times_src(cid, 3, 1.5);
  } else {
    times_src(cid, 0, 1.5);
    times_src(cid, 1, 1.5);
    times_src(cid, 3, 1.8);
  }

  const obey = [
    [0.5, 0.5, 0.6, 2],
    [0.8, 0.8, 0.8, 1.5],
    [1, 1, 1, 1],
    [1.2, 1.3, 1.2, 0.8],
    [1.4, 1.6, 1.4, 0.6],
    [1.6, 2, 1.6, 0.3],
  ][Math.min(abl(cid, 10), 5)];
  times_src(cid, 0, obey[0]);
  times_src(cid, 1, obey[1]);
  times_src(cid, 3, obey[2]);
  times_src(cid, 15, obey[3]);

  if (prev === 34) {
    const spirit = [
      [200, 50, 300],
      [250, 200, 100],
      [350, 550, 30],
      [450, 900, 0],
      [600, 1500, 0],
      [750, 2200, 0],
    ][Math.min(abl(cid, 13), 5)];
    set_src(cid, 4, spirit[0]);
    set_src(cid, 5, spirit[1]);
    set_src(cid, 14, spirit[2]);
    const skill = [
      [0.3, 0.3],
      [0.6, 0.6],
      [1, 1],
      [1.1, 1.1],
      [1.3, 1.2],
      [1.5, 1.4],
    ][Math.min(abl(cid, 12), 5)];
    times_src(cid, 1, skill[0]);
    times_src(cid, 3, skill[1]);
  }

  if (prev === 612) {
    const breast = [
      [50, 50, 50],
      [200, 200, 200],
      [500, 500, 400],
      [1000, 600, 600],
      [1600, 1000, 1000],
      [2100, 1400, 1400],
    ][Math.min(abl(cid, 1), 5)];
    set_src(cid, 17, breast[0]);
    add_src(cid, 3, breast[1]);
    add_src(cid, 4, breast[2]);
    const clit = [
      [40, 50],
      [160, 200],
      [700, 400],
      [1500, 600],
      [2400, 1000],
      [3600, 1400],
    ][Math.min(abl(cid, 0), 5)];
    add_src(cid, 0, clit[0]);
    add_src(cid, 4, clit[1]);
    const skill_rows = [
      [100, 100, 50, 100, 50, 0, 0, 0],
      [200, 200, 150, 150, 100, 50, 100, 0],
      [300, 300, 250, 200, 200, 100, 200, 50],
      [500, 400, 500, 300, 300, 150, 300, 100],
      [800, 500, 800, 500, 400, 250, 400, 300],
      [1200, 600, 1200, 800, 600, 400, 500, 500],
    ][Math.min(abl(player, 12), 5)];
    add_src(cid, 0, skill_rows[0]);
    add_src(cid, 1, skill_rows[1]);
    add_src(cid, 17, skill_rows[2]);
    add_src(cid, 3, skill_rows[3]);
    add_src(cid, 4, skill_rows[4]);
    add_src(cid, 10, skill_rows[5]);
    add_src(cid, 11, skill_rows[6]);
    let extra = skill_rows[7];
    const expose = [0.6, 1, 1.5, 2.4, 3.6, 5.8][Math.min(abl(cid, 17), 5)];
    const expose_add = [100, 200, 400, 700, 1200, 2000][
      Math.min(abl(cid, 17), 5)
    ];
    add_src(cid, 7, expose_add);
    add_src(cid, 10, expose_add);
    extra = times(extra, expose);
    add_src(cid, 0, extra);
    add_src(cid, 1, extra);
    add_src(cid, 3, extra);
    if (e0 >= EXPLV[3]) add_src(cid, 1, extra);
    if (tal(cid, 85)) times_src(cid, 3, 2);
  }
}

async function message_b121() {
  const cid = era_flag.target;
  const prev = era_flag.prevcom;
  const fainted = (era.get('tflag:899') || 0) !== 0;
  const e0 = exp(cid, 0);
  if (prev === 34 && !fainted) {
    era.print(
      `${target_name()}用手扶在${player_name()}的胸部上、私处把整根阴茎都吞入了…`,
    );
    if (e0 <= 30) {
      era.print(`${target_name()}就这样前后摇晃着腰…`);
    } else if (e0 <= 50 && tal(cid, 121)) {
      era.print(`${target_name()}用阴茎压着${player_name()}的腹部…`);
    } else if (e0 <= 50) {
      era.print(`${target_name()}利用${player_name()}的阴毛刺激着阴蒂…`);
    } else if (e0 <= 80) {
      era.print(`${target_name()}扭动着腰、因被插入的愉悦感而喷出炽热的气息…`);
    } else if (e0 <= 120) {
      era.print(`${target_name()}沉腰下探、陶醉在被插到最深的欢愉之中…`);
      era.print('脆弱而敏感的子宫口绽放着、心神皆醉地做好了受孕的准备…');
    } else {
      era.print(
        `${target_name()}纵情地扭动着、腰身有节奏地不停颤抖、露出了牝奴的痴迷表情、口水流出来了…`,
      );
      era.print(
        '被播种的快感将理性彻底淹没了、成为了恳求种子不顾一切的牝奴的肉体…',
      );
    }
    return;
  }
  if (prev === 20 || prev === 128 || prev === 129 || prev === 130) {
    era.print(
      `抓住${target_name()}的腰、往最深处突进、子宫被敲击着发出咚咚咚的声音…`,
    );
  }
  if (
    prev === 21 ||
    prev === 131 ||
    prev === 132 ||
    prev === 133 ||
    prev === 134
  ) {
    era.print(
      `抓住${target_name()}的屁股、往最深处突进、子宫被敲击着发出咚咚咚的声音…`,
    );
  }
  if (prev === 22) {
    era.print(
      `紧紧地抱住${target_name()}的腰、把腰围都收细了、阴茎在子宫口不停打转…`,
    );
  }
  if (prev === 23) {
    era.print(`压着${target_name()}的腰往下拉、突进到最深处了…`);
  }
  if (prev === 612) {
    era.print(
      `${player_name()}在镜子前一步、逼着${target_name()}看着自己的痴态、`,
    );
    era.print(`压着${target_name()}的腰往下拉、突进到最深处了…`);
  }
  if (e0 <= 30 || (e0 >= 31 && e0 <= 50 && (prev === 21 || prev === 612))) {
    era.print(`${target_name()}觉得异物感太强了、很痛苦的样子…`);
  } else if (e0 <= 50 && tal(cid, 121)) {
    era.print(`${target_name()}在阴毛和肚脐之间摩擦着阴茎、漏出了呻吟声…`);
  } else if (e0 <= 50) {
    era.print(`${target_name()}用阴毛摩擦着阴蒂、漏出了呻吟声…`);
  } else if (e0 <= 80) {
    era.print(`${target_name()}发出了长长的甘甜吐息、因强烈的插入感咬紧牙关…`);
  } else if (e0 <= 120) {
    era.print(
      '子宫做好了接种的准备、扭动着纤细的腰、引导阴茎去到最深处那窟窿里…',
    );
    era.print(`${target_name()}子宫被重重地叩击着、嘴巴大张、身体剧烈地颤抖…`);
  } else {
    era.print(`突入到${target_name()}的子宫、狠狠地摇晃着她的身体、`);
    era.print(`${target_name()}发了疯似的、沉醉在牝奴能得到的最高快乐之中…`);
  }
}

async function message_a121() {
  const amount = era.get('tflag:2') || 0;
  if (amount !== 1 && amount !== 2) return;
  const cid = era_flag.target;
  const removable = palam(cid, 5) < PALAMLV[4] || era.get('tflag:31');
  if (amount === 1) {
    era.print(`直接对${target_name()}的子宫、注入了热乎乎的精液…`);
  } else if (removable) {
    era.print(`直接对${target_name()}的子宫、注入了大量热乎乎的精液…`);
  } else {
    era.print(
      `直接对${target_name()}快乐到生疼的子宫、注入了大量热乎乎的精液……`,
    );
  }
  if (removable) {
    era.set('tflag:31', 0);
    era.set('tflag:60', 0);
  }
}

/** @COM121（COMF121_挿入子宮口責め.ERB）插入子宫口蹂躏。高级 COM。 */
async function com121() {
  const select = era_flag.selectcom;
  game.train.三人PLAY持续 = 0;
  if (select === 34 || (select >= 20 && select <= 23)) {
    era.print(`${read_train_name(select)}子宫口蹂躏`);
  } else {
    era.print('插入子宫口蹂躏');
  }
  era_flag.selectcom = 121; // 原作显式 SELECTCOM = 121（升格抵达时回填号位）
  await train_message_b();
  const cid = era_flag.target;
  game.train.伴V经验指令 = 1;
  if (tal(cid, 85) && !era_flag.assiplay && exp(cid, 0) === 0) {
    game.train.主人导致处女丧失 = 1;
  }
  await com_ejac_player_sex();
  source121();
  await com_after_vagina_sex();
  return 1;
}

function palam_ladder(value) {
  if (value < PALAMLV[1]) return 0;
  if (value < PALAMLV[2]) return 1;
  if (value < PALAMLV[3]) return 2;
  if (value < PALAMLV[4]) return 3;
  if (value < PALAMLV[5]) return 4;
  return 5;
}

function append_term(parts, state, label, amount) {
  if (state.s) parts.push(amount >= 0 ? ' + ' : ' - ');
  else if (amount < 0) parts.push(' - ');
  parts.push(`${label}(${Math.abs(amount)})`);
  state.a += amount;
  state.s = 1;
}

function dirty_penalty_122() {
  const player = era_flag.player;
  const cid = era_flag.target;
  let y = 0;
  if (stain(player, 2) & 1) y += 1;
  if (stain(player, 2) & 4) y += 3;
  if (stain(player, 2) & 8) y += 7;
  if (stain(player, 2) & 16) y += 1;
  if (stain(player, 4) & 32) y += 3;
  if (tal(cid, 61)) y = Math.floor(y / 3);
  if (tal(cid, 62)) y *= 2;
  return Math.floor(y / 3);
}

async function order122() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const { a, s, parts } = await com_order(0, 0);
  const state = { a, s };
  if (abl(cid, 11)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 11)}LV${abl(cid, 11)}`,
      abl(cid, 11) * 2,
    );
  }
  if (abl(cid, 16)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 16)}LV${abl(cid, 16)}`,
      abl(cid, 16) * 4,
    );
  }
  if (abl(cid, 32)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 32)}LV${abl(cid, 32)}`,
      abl(cid, 32),
    );
  }
  const mark1 = Math.floor(era.get(`mark:${cid}:1`) || 0);
  if (mark1) {
    append_term(parts, state, `${name_of('markname', 1)}LV${mark1}`, mark1 * 2);
  }
  const lust = palam_ladder(palam(cid, 5));
  if (lust) {
    append_term(parts, state, `${name_of('palamname', 5)}LV${lust}`, lust * 3);
  }
  if (tal(cid, 35)) append_term(parts, state, name_of('talentname', 35), -1);
  if (tal(cid, 71)) append_term(parts, state, name_of('talentname', 71), -3);
  if (tal(cid, 82) && tal(player, 122)) {
    append_term(parts, state, name_of('talentname', 82), -7);
  }
  if (tal(cid, 85) && !era_flag.assiplay) {
    append_term(parts, state, name_of('talentname', 85), 3);
    state.s = 3; // 源侧 S = 3（COMF122:114）
  }
  if (tal(player, 121)) {
    append_term(parts, state, name_of('talentname', 121), 8);
  }
  if (tequip(cid, 21)) {
    append_term(parts, state, name_of('itemname', 26), 6);
  }
  const y = dirty_penalty_122();
  if (y) {
    const dirty_label = tal(cid, 61)
      ? `脏、${name_of('talentname', 61)}`
      : tal(cid, 62)
        ? `脏、${name_of('talentname', 62)}`
        : '脏';
    append_term(parts, state, dirty_label, -y);
  }
  parts.push(` = ${state.a}`);
  parts.push(state.a < 20 ? ' < ' : state.a === 20 ? ' = ' : ' > ');
  parts.push('实行值20');
  era.print(parts.join(''));
  await era.waitAnyKey();
  return state.a >= 20;
}

function source122() {
  const cid = era_flag.target;
  const player = era_flag.player;
  add_lose(cid, 0, 30);
  add_lose(cid, 1, 90);
  set_src(cid, 12, 250);
  set_src(cid, 13, 400);
  set_src(cid, 14, 300);
  set_src(cid, 11, [200, 120, 60, 20, 0, 0][Math.min(abl(cid, 10), 5)]);
  const clit = [
    [20, 0, 0, 20, 0.8],
    [80, 10, 50, 20, 0.9],
    [350, 50, 100, 20, 1],
    [750, 100, 300, 20, 1.1],
    [1200, 700, 600, 20, 1.2],
    [1750, 2000, 1000, 20, 1.3],
  ][Math.min(abl(cid, 0), 5)];
  set_src(cid, 0, clit[0]);
  set_src(cid, 4, clit[1]);
  set_src(cid, 5, clit[2]);
  set_src(cid, 13, clit[3]);
  times_src(cid, 12, clit[4]);
  const skill = [0.5, 0.8, 1, 1.1, 1.3, 1.5][Math.min(abl(cid, 12), 5)];
  times_src(cid, 4, skill);
  times_src(cid, 5, skill);
  times_src(cid, 13, skill);
  const player_clit = [
    [0.8, 0.5],
    [0.9, 0.7],
    [1, 1],
    [1.1, 1.2],
    [1.2, 1.4],
    [1.3, 1.7],
  ][Math.min(abl(player, 0), 5)];
  times_src(cid, 4, player_clit[0]);
  times_src(cid, 5, player_clit[1]);
  const lube = palam_ladder(palam(cid, 3));
  times_src(cid, 0, [0.5, 0.75, 1, 1.5, 2, 2.5][lube]);
  times_src(cid, 5, [0.6, 0.8, 1, 1.2, 1.4, 1.6][lube]);
}

function ejac122() {
  const cid = era_flag.target;
  const player = era_flag.player;
  let b = [1500, 2100, 2900, 4000, 5000, 6000][Math.min(abl(cid, 12), 5)];
  b = times(b, [0.8, 0.9, 1, 1.1, 1.2, 1.3][Math.min(abl(cid, 10), 5)]);
  b = times(b, [0.5, 0.8, 1.2, 1.5, 1.8, 2.4][palam_ladder(palam(cid, 3))]);
  b = times(b, [1, 1.5, 2, 2.5, 3.5, 5][Math.min(abl(player, 0), 5)]);
  if (tal(player, 121) || tal(player, 122)) {
    era.add(`base:${player}:2`, b);
  }
  const s = era.get(`base:${player}:2`) || 0;
  const ejac = era.get(`maxbase:${player}:2`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;
  if (e) {
    times_src(cid, 4, 3);
    const poison = [
      [0, 2, 6],
      [500, 3, 4.5],
      [1200, 4, 3.5],
      [3000, 6, 3],
      [6000, 9, 2],
      [12000, 15, 1.5],
    ][Math.min(abl(cid, 32), 5)];
    set_src(cid, 7, poison[0]);
    times_src(cid, 5, poison[1]);
    times_src(cid, 13, poison[2]);
  }
  if (e === 2) {
    times_src(cid, 7, 2);
    times_src(cid, 5, 1.5);
    era.add(`exp:${player}:3`, 2);
    era.add(`exp:${cid}:20`, 9);
    era.print('大量射精');
    era.print('精液经验＋９');
    era.set(`stain:${player}:2`, stain(player, 2) | 4);
    era.add(`base:${player}:2`, -(ejac * 2));
    if ((era.get(`base:${player}:2`) || 0) >= ejac) {
      era.set(`base:${player}:2`, ejac - 1);
    }
    game.train.股间射精 = 2;
  } else if (e === 1) {
    era.add(`exp:${player}:3`, 1);
    era.add(`exp:${cid}:20`, 3);
    era.print('射精');
    era.print('精液经验＋３');
    era.set(`stain:${player}:2`, stain(player, 2) | 4);
    era.add(`base:${player}:2`, -ejac);
    if ((era.get(`base:${player}:2`) || 0) >= ejac) {
      era.set(`base:${player}:2`, ejac - 1);
    }
    game.train.股间射精 = 1;
  }
  const merged = stain(cid, 2) | stain(player, 2);
  era.set(`stain:${cid}:2`, merged);
  era.set(`stain:${player}:2`, merged);
  if (tal(cid, 122) === 1 && tal(player, 122) === 1) {
    era.print(`${name_of('expname', 41)}+8`);
    era.add(`exp:${cid}:41`, 8);
  }
  if (!era_flag.assiplay && abl(cid, 0) >= 3) {
    game.train.主人经验 += 1;
  }
  game.train.快乐经验 = 1;
}

async function message_b122() {
  if (palam(era_flag.target, 3) > PALAMLV[3]) {
    era.print(
      `${player_nickname()}用${target_name()}已经湿掉的阴茎摩擦着自己的阴茎……`,
    );
  } else {
    era.print(`${player_nickname()}和${target_name()}用勃起的阴茎相互摩擦着……`);
  }
}

async function message_a122() {
  const amount = era.get('tflag:9') || 0;
  const target_ejac = era.get('tflag:10') || 0;
  if (amount === 0) {
    if (target_ejac >= 1) {
      era.print(
        `${target_name()}射精出的${target_ejac >= 2 ? '大量' : ''}精液、将${player_name()}的阴茎用精液一吐为快了…`,
      );
    }
    return;
  }
  const both =
    target_ejac >= 1 &&
    (tal(era_flag.player, 122) || tal(era_flag.player, 121));
  if (amount === 1) {
    if (both) {
      era.print('两人同时射精、对彼此的阴茎用精液一吐为快了…');
    } else {
      era.print(`射出的精液、把${target_name()}的阴茎弄脏了…`);
    }
    return;
  }
  if (amount === 2) {
    if (both) {
      era.print('两人同时射精、对彼此的阴茎用大量的精液一吐为快…');
    } else {
      era.print(
        `${player_name()}射出大量的精液、把${target_name()}的阴茎搞得黏黏糊糊…`,
      );
    }
  }
}

/** @COM122（COMF122_兜あわせ.ERB）阴茎互捅。可直选。 */
async function com122() {
  era.print('阴茎互捅');
  if (!(await order122())) return 0;
  await train_message_b();
  source122();
  ejac122();
  return 1;
}

function make_advanced_com(id, title) {
  return async function advanced_com() {
    era_flag.selectcom = id; // 原作显式 SELECTCOM = id（升格抵达时回填号位）
    era.print(title);
    await train_message_b();
    return 1;
  };
}

const com123 = make_advanced_com(123, '乳夹口交');
const com124 = make_advanced_com(124, '深喉');
const com125 = make_advanced_com(125, '口交时自慰');
const com126 = make_advanced_com(126, '手搓口交');
const com127 = make_advanced_com(127, '真空口交');
const com128 = make_advanced_com(128, '正常位・接吻');
const com129 = make_advanced_com(129, '正常位・胸爱抚');
const com130 = make_advanced_com(130, '正常位ＳＰ');
const com131 = make_advanced_com(131, '背后位・胸爱抚');
const com132 = make_advanced_com(132, '背后位・打屁股');
const com133 = make_advanced_com(133, '站立背后位');
const com134 = make_advanced_com(134, '背后位ＳＰ');

/**
 * @COM135（COMF135_セルフクンニ.ERB）自助舔阴。可直选。
 * 头部 LOCAL = 21 / CALL GET_ADV_COM（源 :14-16），命中则 JUMPFORM。
 */
async function com135() {
  const upgraded = await get_adv_com(21);
  if (upgraded !== 21) return jump_to_advanced(upgraded);
  const target = era_flag.target;
  let prefix = '';
  if (tequip(target, 53)) prefix += '公开';
  if (tequip(target, 54)) prefix += '野外';
  era.print(prefix + (tal(target, 121) === 1 ? '自我口交' : '自助舔阴'));
  await train_message_b();
  return 1;
}

// —— GET_ADV_COM CASE 135（COMF_JUMP.ERB:666-682） ——
adv_com_family.register(135, async () => {
  if (
    same_trainer() &&
    [31, 123, 124, 126, 127].includes(era_flag.prevcom) &&
    (await com_able_family.call(125, { whenMissing: 0 })) === 1
  )
    return 125;
  return 135;
});

train_message_b_family.register(120, message_b120);
train_message_a_family.register(120, message_a120);
train_message_b_family.register(121, message_b121);
train_message_a_family.register(121, message_a121);
train_message_b_family.register(122, message_b122);
train_message_a_family.register(122, message_a122);

// TRAIN_MESSAGE 空操作占位：先把分发面占住，避免「族票未落地」占位行。
for (const id of [
  123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135,
]) {
  train_message_b_family.register(id, async () => 0);
  train_message_a_family.register(id, async () => 0);
}

com_able_family.register(120, able120);
com_able_family.register(121, able121);
com_able_family.register(122, able122);
com_able_family.register(123, able123);
com_able_family.register(124, able124);
com_able_family.register(125, able125);
com_able_family.register(126, able126);
com_able_family.register(127, able127);
com_able_family.register(128, able128);
com_able_family.register(129, able129);
com_able_family.register(130, able130);
com_able_family.register(131, able131);
com_able_family.register(132, able132);
com_able_family.register(133, able133);
com_able_family.register(134, able134);
com_able_family.register(135, able135);

com_family.register(120, com120);
com_family.register(121, com121);
com_family.register(122, com122);
com_family.register(123, com123);
com_family.register(124, com124);
com_family.register(125, com125);
com_family.register(126, com126);
com_family.register(127, com127);
com_family.register(128, com128);
com_family.register(129, com129);
com_family.register(130, com130);
com_family.register(131, com131);
com_family.register(132, com132);
com_family.register(133, com133);
com_family.register(134, com134);
com_family.register(135, com135);

module.exports = {
  STUBBED_CALLS,
  able120,
  able121,
  able122,
  able123,
  able124,
  able125,
  able126,
  able127,
  able128,
  able129,
  able130,
  able131,
  able132,
  able133,
  able134,
  able135,
  com120,
  com121,
  com122,
  com123,
  com124,
  com125,
  com126,
  com127,
  com128,
  com129,
  com130,
  com131,
  com132,
  com133,
  com134,
  com135,
};
