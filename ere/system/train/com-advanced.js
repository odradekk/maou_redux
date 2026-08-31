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
const { confirm_condom } = require('#/system/train/com-condom');
const { train_message_a_sex_common } = require('#/system/train/com-sex');
const {
  com_after_vagina_sex,
  com_ejac_player_milk,
  com_ejac_player_sex,
  confirm_lost_virgin,
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

function dirty_penalty_123() {
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
  return y;
}

async function order123(y) {
  const cid = era_flag.target;
  const player = era_flag.player;
  const { a, s, parts } = await com_order(0, 0);
  const state = { a, s };
  if (abl(cid, 11)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 11)}LV${abl(cid, 11)}`,
      abl(cid, 11),
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
      abl(cid, 32) * 3,
    );
  }
  const mark1 = Math.floor(era.get(`mark:${cid}:1`) || 0);
  if (mark1) {
    append_term(parts, state, `${name_of('markname', 1)}LV${mark1}`, mark1);
  }
  const lust = palam_ladder(palam(cid, 5));
  if (lust) {
    append_term(parts, state, `${name_of('palamname', 5)}LV${lust}`, lust);
  }
  if (tal(cid, 35)) append_term(parts, state, name_of('talentname', 35), -3);
  if (tal(cid, 61)) append_term(parts, state, name_of('talentname', 61), 1);
  if (tal(cid, 62)) append_term(parts, state, name_of('talentname', 62), -3);
  if (tal(cid, 63)) append_term(parts, state, name_of('talentname', 63), 6);
  if (tal(cid, 71)) append_term(parts, state, name_of('talentname', 71), -3);
  if (tal(cid, 82) && tal(player, 122)) {
    append_term(parts, state, name_of('talentname', 82), -12);
  }
  if (tal(cid, 85) && !era_flag.assiplay) {
    append_term(parts, state, name_of('talentname', 85), 5);
  }
  if (tal(player, 121)) {
    append_term(parts, state, name_of('talentname', 121), 8);
  }
  if (y) {
    const dirty_label = tal(cid, 61)
      ? `脏、${name_of('talentname', 61)}`
      : tal(cid, 62)
        ? `脏、${name_of('talentname', 62)}`
        : '脏';
    append_term(parts, state, dirty_label, -y);
  }
  parts.push(` = ${state.a}`);
  parts.push(state.a < 36 ? ' < ' : state.a === 36 ? ' = ' : ' > ');
  parts.push('实行值36');
  era.print(parts.join(''));
  await era.waitAnyKey();
  return state.a >= 36;
}

function source123(y) {
  const cid = era_flag.target;
  if (tal(cid, 47)) {
    add_lose(cid, 0, 20);
    add_lose(cid, 1, 80);
  } else {
    add_lose(cid, 0, 30);
    add_lose(cid, 1, 160);
  }
  set_src(cid, 13, 2200);
  set_src(cid, 14, 900);
  set_src(cid, 8, y * 40 + 100);
  const service = [
    [620, 150, 4],
    [700, 300, 2.5],
    [820, 600, 1.5],
    [940, 900, 1],
    [1100, 1500, 0.5],
    [1260, 2200, 0.1],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 4, service[0]);
  set_src(cid, 5, service[1]);
  times_src(cid, 8, service[2]);
  let breast = [100, 200, 400, 800, 1200, 1500][Math.min(abl(cid, 1), 5)];
  if (tal(cid, 110)) breast = times(breast, 1.2);
  else if (tal(cid, 119)) breast = times(breast, 1.3);
  if (tal(cid, 108)) breast = times(breast, 1.2);
  else if (tal(cid, 107)) breast = times(breast, 0.7);
  add_src(cid, 17, breast);
  const skill = [0.8, 1, 1.2, 1.5, 2, 2.5][Math.min(abl(cid, 12), 5)];
  times_src(cid, 4, skill);
  times_src(cid, 5, skill);
}

function gauge123() {
  const cid = era_flag.target;
  const player = era_flag.player;
  let b = [1200, 1700, 2300, 3000, 3600, 4200][Math.min(abl(cid, 12), 5)];
  b = times(b, [0.8, 0.9, 1, 1.1, 1.2, 1.3][Math.min(abl(cid, 10), 5)]);
  b = times(b, [0.5, 0.8, 1.2, 1.5, 1.8, 2.4][Math.min(abl(cid, 13), 5)]);
  b = times(b, [1, 1.2, 1.3, 1.5, 1.7, 2][Math.min(abl(cid, 32), 5)]);
  if (tal(cid, 52)) b = times(b, 2);
  b = times(b, [1, 1.5, 2, 2.5, 3.5, 5][Math.min(abl(player, 0), 5)]);
  if (tal(cid, 119)) b = times(b, 1.3);
  else if (tal(cid, 114)) b = times(b, 1.2);
  else if (tal(cid, 110)) b = times(b, 1.1);
  // 源侧 ELSEIF TALENT:110 贫乳 ×0.90 与上一支巨乳同一条件，死代码
  if (tal(player, 119) || tal(player, 122) || tal(player, 121)) {
    era.add(`base:${player}:2`, b);
  }
  return b;
}

function ejac123() {
  const cid = era_flag.target;
  const player = era_flag.player;
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
    game.train.口中射精 = 2;
    if (Math.floor(Math.random() * 5) === 0 && tal(cid, 340)) {
      era.set(`cflag:${cid}:113`, 4);
    }
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
    game.train.口中射精 = 1;
    if (Math.floor(Math.random() * 10) === 0 && tal(cid, 340)) {
      era.set(`cflag:${cid}:113`, 4);
    }
  }
  return e;
}

function after123(e) {
  const cid = era_flag.target;
  const player = era_flag.player;
  const merged = stain(cid, 0) | stain(player, 2);
  era.set(`stain:${cid}:0`, merged);
  era.set(`stain:${player}:2`, merged);
  if (abl(cid, 16) >= 2 && abl(cid, 12) >= 2) {
    era.set(`stain:${player}:2`, 2);
    if (e >= 1) game.train.口交射精后 = 1;
  }
  if (tal(cid, 122) === 0 && tal(player, 122) === 0) {
    era.print(`${name_of('expname', 40)}+7`);
    era.add(`exp:${cid}:40`, 7);
  } else if (tal(cid, 122) === 1 && tal(player, 122) === 1) {
    era.print(`${name_of('expname', 41)}+7`);
    era.add(`exp:${cid}:41`, 7);
  }
  if (!era_flag.assiplay && exp(cid, 0) >= EXPLV[3]) {
    game.train.主人经验 += 1;
  }
  if ((era.get(`cflag:${cid}:16`) || 0) === -1) {
    era.set(`cflag:${cid}:16`, player + 201);
    era.set(`cstr:${cid}:4`, chara_callname(player));
    era.set('tflag:13', 1);
  }
  const love = tal(cid, 122) ? 2 : 1;
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${name_of('expname', 23)}+${love}`);
    era.add(`exp:${cid}:23`, love);
  }
  if (tal(player, 121)) set_src(cid, 13, Math.floor(src(cid, 13) / 2));
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 3;
}

async function message_b123() {
  const cid = era_flag.target;
  let line = target_name();
  if (tal(cid, 85)) line += '一边时不时带着可爱又温顺的表情偷看着你、一边';
  if (tal(cid, 109)) {
    line += '挤着小小的胸部摩擦着阴茎、用舌头侍奉着龟头…';
  } else if (tal(cid, 110)) {
    line += '用波涛汹涌的巨乳包裹着阴茎、伸头舔舐着阴茎…';
  } else if (tal(cid, 114)) {
    line +=
      '双峰合拢、用令人目眩魂摇的沟壑将阴茎淹没其中、低头把脸埋入自己深深的乳沟之间、仔细地舔舐着阴茎…';
  } else {
    line += '用胸部夹着阴茎、舔舐刺激着…';
  }
  era.print(line);
}

async function message_a123() {
  const amount = era.get('tflag:0') || 0;
  if (amount !== 1 && amount !== 2) return;
  const small = tal(era_flag.target, 109);
  if (amount === 1) {
    era.print(
      small
        ? `${player_name()}的阴茎、一边享受胸部的按摩、一边在${target_name()}的嘴里倾泻精液…`
        : `${player_name()}的阴茎、一边被胸部紧紧夹住、一边在${target_name()}的嘴里倾泻精液…`,
    );
  } else {
    era.print(
      small
        ? `${player_name()}的阴茎、一边享受胸部的按摩、一边在${target_name()}的嘴里倾泻了大量精液…`
        : `${player_name()}的阴茎、一边被胸部紧紧夹住、一边在${target_name()}的嘴里倾泻了大量精液…`,
    );
    era.print('从嘴里溢出来的精液、把阴茎和胸部都染成白色了…');
  }
}

/** @COM123（COMF123_パイズリフェラ.ERB）乳夹口交。高级 COM。 */
async function com123() {
  era_flag.selectcom = 123; // 原作显式 SELECTCOM = 123（升格抵达时回填号位）
  era.print('乳夹口交');
  const y = dirty_penalty_123();
  if (!(await order123(y))) return 0;
  await train_message_b();
  era.print(`${name_of('expname', 22)}＋１`);
  era.add(`exp:${era_flag.target}:22`, 1);
  source123(y);
  const b = gauge123();
  const e = ejac123();
  await com_ejac_player_milk(b);
  after123(e);
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

function dirty_penalty_124() {
  const player = era_flag.player;
  let y = 0;
  if (stain(player, 2) & 1) y += 1;
  if (stain(player, 2) & 4) y += 3;
  if (stain(player, 2) & 8) y += 7;
  if (stain(player, 2) & 16) y += 1;
  if (stain(player, 4) & 32) y += 3;
  return y;
}

async function order124(y) {
  const cid = era_flag.target;
  const player = era_flag.player;
  const { a, s, parts } = await com_order(0, 0);
  const state = { a, s };
  if (abl(cid, 11)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 11)}LV${abl(cid, 11)}`,
      abl(cid, 11),
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
      abl(cid, 32) * 3,
    );
  }
  const mark1 = Math.floor(era.get(`mark:${cid}:1`) || 0);
  if (mark1) {
    append_term(parts, state, `${name_of('markname', 1)}LV${mark1}`, mark1);
  }
  const lust = palam_ladder(palam(cid, 5));
  if (lust) {
    append_term(parts, state, `${name_of('palamname', 5)}LV${lust}`, lust);
  }
  if (tal(cid, 35)) append_term(parts, state, name_of('talentname', 35), -1);
  if (tal(cid, 61)) append_term(parts, state, name_of('talentname', 61), 1);
  if (tal(cid, 62)) append_term(parts, state, name_of('talentname', 62), -3);
  if (tal(cid, 63)) append_term(parts, state, name_of('talentname', 63), 6);
  if (tal(cid, 71)) append_term(parts, state, name_of('talentname', 71), -1);
  if (tal(cid, 82) && tal(player, 122)) {
    append_term(parts, state, name_of('talentname', 82), -12);
  }
  if (tal(cid, 85) && !era_flag.assiplay) {
    append_term(parts, state, name_of('talentname', 85), 5);
  }
  if (tal(player, 121)) {
    append_term(parts, state, name_of('talentname', 121), 8);
  }
  if (tequip(cid, 89) && tal(cid, 136) === 0) {
    append_term(parts, state, name_of('itemname', 22), -15);
  }
  if (y) {
    const dirty_label = tal(cid, 61)
      ? `脏、${name_of('talentname', 61)}`
      : tal(cid, 62)
        ? `脏、${name_of('talentname', 62)}`
        : '脏';
    append_term(parts, state, dirty_label, -y);
  }
  parts.push(` = ${state.a}`);
  parts.push(state.a < 40 ? ' < ' : state.a === 40 ? ' = ' : ' > ');
  parts.push('实行值40');
  era.print(parts.join(''));
  await era.waitAnyKey();
  return state.a >= 40;
}

function source124(y) {
  const cid = era_flag.target;
  if (tal(cid, 47)) {
    add_lose(cid, 0, 20);
    add_lose(cid, 1, 90);
  } else {
    add_lose(cid, 0, 50);
    add_lose(cid, 1, 150);
  }
  set_src(cid, 6, 200);
  set_src(cid, 13, 1800);
  set_src(cid, 14, 600);
  set_src(cid, 8, y * 40 + 100);
  const service = [
    [620, 150, 4],
    [700, 300, 2.5],
    [820, 600, 1.5],
    [940, 900, 1],
    [1100, 1500, 0.5],
    [1260, 2200, 0.1],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 4, service[0]);
  set_src(cid, 5, service[1]);
  times_src(cid, 8, service[2]);
  const skill = [0.5, 0.8, 1, 1.2, 1.5, 2][Math.min(abl(cid, 12), 5)];
  times_src(cid, 4, skill);
  times_src(cid, 5, skill);
}

function gauge124() {
  const cid = era_flag.target;
  const player = era_flag.player;
  let b = [1500, 2000, 2600, 3200, 4000, 4800][Math.min(abl(cid, 12), 5)];
  b = times(b, [0.5, 0.8, 1, 1.2, 1.5, 2][Math.min(abl(cid, 10), 5)]);
  b = times(b, [0.5, 0.8, 1.2, 1.5, 1.8, 2.4][Math.min(abl(cid, 13), 5)]);
  b = times(b, [1, 1.2, 1.3, 1.5, 1.7, 2][Math.min(abl(cid, 32), 5)]);
  if (tal(cid, 52)) b = times(b, 2);
  b = times(b, [1, 1.5, 2, 2.5, 3.5, 5][Math.min(abl(player, 0), 5)]);
  if (tal(player, 119) || tal(player, 122) || tal(player, 121)) {
    era.add(`base:${player}:2`, b);
  }
  return b;
}

function ejac124() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const s = era.get(`base:${player}:2`) || 0;
  const ejac = era.get(`maxbase:${player}:2`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;
  if (e) {
    times_src(cid, 4, 3);
    const poison = [
      [0, 2, 4],
      [500, 3, 3],
      [1200, 4, 2.5],
      [3000, 6, 2],
      [6000, 9, 1.5],
      [12000, 15, 1],
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
    game.train.口中射精 = 2;
    if (Math.floor(Math.random() * 5) === 0 && tal(cid, 340)) {
      era.set(`cflag:${cid}:113`, 4);
    }
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
    game.train.口中射精 = 1;
    if (Math.floor(Math.random() * 10) === 0 && tal(cid, 340)) {
      era.set(`cflag:${cid}:113`, 4);
    }
  }
  return e;
}

function after124(e) {
  const cid = era_flag.target;
  const player = era_flag.player;
  const merged = stain(cid, 0) | stain(player, 2);
  era.set(`stain:${cid}:0`, merged);
  era.set(`stain:${player}:2`, merged);
  if (abl(cid, 16) >= 2 && abl(cid, 12) >= 2) {
    era.set(`stain:${player}:2`, 2);
    if (e >= 1) game.train.口交射精后 = 1;
  }
  if (tal(cid, 122) === 0 && tal(player, 122) === 0) {
    era.print(`${name_of('expname', 40)}+7`);
    era.add(`exp:${cid}:40`, 7);
  } else if (tal(cid, 122) === 1 && tal(player, 122) === 1) {
    era.print(`${name_of('expname', 41)}+7`);
    era.add(`exp:${cid}:41`, 7);
  }
  if (!era_flag.assiplay && exp(cid, 0) >= EXPLV[3]) {
    game.train.主人经验 += 1;
  }
  if ((era.get(`cflag:${cid}:16`) || 0) === -1) {
    era.set(`cflag:${cid}:16`, 201);
    era.set(`cstr:${cid}:4`, chara_callname(player));
    era.set('tflag:13', 1);
  }
  const love = tal(cid, 122) ? 2 : 1;
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${name_of('expname', 23)}+${love}`);
    era.add(`exp:${cid}:23`, love);
  }
  if (tal(player, 121)) set_src(cid, 13, Math.floor(src(cid, 13) / 2));
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
}

async function message_b124() {
  const cid = era_flag.target;
  let line = target_name();
  if (tal(cid, 85)) line += '一边带着对你朝思暮想的神情看着你、一边';
  if (tal(cid, 52)) line += '用舌头灵活地缠绕着棒身、';
  line += '用喉咙最深处对阴茎又吸又夹';
  line += tal(cid, 16) >= 3 ? '、被淫秽的声音深深地刺激着…' : '…';
  era.print(line);
}

async function message_a124() {
  const amount = era.get('tflag:0') || 0;
  if (amount !== 1 && amount !== 2) return;
  const cid = era_flag.target;
  const fainted = (era.get('tflag:899') || 0) >= 2;
  if (amount === 1) {
    if (fainted) {
      era.print(`紧紧抓住${target_name()}的头、在她喉咙深处射出…`);
    } else if (abl(cid, 32) >= 3) {
      era.print(`${target_name()}带着恍惚的表情、把强行灌入喉咙的精液喝光了…`);
    } else if (abl(cid, 16) >= 3) {
      era.print(`${target_name()}喝掉了直接叩开喉咙强行灌进来的精液…`);
    } else {
      era.print(`紧紧抓住${target_name()}的头、在她喉咙深处射出…`);
    }
    return;
  }
  if (fainted) {
    era.print(`紧紧抓住${target_name()}的头、在她喉咙深处放开精关…`);
  } else if (abl(cid, 32) >= 3) {
    era.print(`${target_name()}带着恍惚的表情、把直接灌入喉咙的精液喝光了…`);
  } else if (abl(cid, 16) >= 3) {
    era.print(
      `${target_name()}被呛到、一边忍住不把喉咙里的精液咳出来、一边把它喝光了…`,
    );
  } else {
    era.print(`在${target_name()}喉咙深处射出的精液、从口中溢出来了…`);
  }
}

/** @COM124（COMF124_ディープスロート.ERB）深喉。高级 COM。 */
async function com124() {
  era_flag.selectcom = 124; // 原作显式 SELECTCOM = 124（升格抵达时回填号位）
  era.print('深喉');
  const y = dirty_penalty_124();
  if (!(await order124(y))) return 0;
  await train_message_b();
  era.print(`${name_of('expname', 22)}＋１`);
  era.add(`exp:${era_flag.target}:22`, 1);
  source124(y);
  const b = gauge124();
  const e = ejac124();
  await com_ejac_player_milk(b);
  after124(e);
  return 1;
}

function dirty_penalty_125() {
  const player = era_flag.player;
  const cid = era_flag.target;
  let y = 0;
  if (stain(player, 2) & 1) y += 1;
  if (stain(player, 2) & 4) y += 3;
  if (stain(player, 2) & 8) y += 7;
  if (stain(player, 2) & 16) y += 1;
  if (stain(player, 4) & 32) y += 3;
  if (tequip(cid, 89)) y = 7;
  if (tal(cid, 61)) y = Math.floor(y / 3);
  if (tal(cid, 62)) y *= 2;
  return y;
}

async function order125(y) {
  const cid = era_flag.target;
  const player = era_flag.player;
  const { a, s, parts } = await com_order(0, 0);
  const state = { a, s };
  if (abl(cid, 11)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 11)}LV${abl(cid, 11)}`,
      abl(cid, 11),
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
      abl(cid, 32) * 3,
    );
  }
  if (abl(cid, 17)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 17)}LV${abl(cid, 17)}`,
      abl(cid, 17) * 4,
    );
  }
  if (abl(cid, 31)) {
    append_term(
      parts,
      state,
      `${name_of('ablname', 31)}LV${abl(cid, 31)}`,
      abl(cid, 31) * 3,
    );
  }
  const mark1 = Math.floor(era.get(`mark:${cid}:1`) || 0);
  if (mark1) {
    append_term(parts, state, `${name_of('markname', 1)}LV${mark1}`, mark1);
  }
  const lust = palam_ladder(palam(cid, 5));
  if (lust) {
    append_term(parts, state, `${name_of('palamname', 5)}LV${lust}`, lust);
  }
  if (tal(cid, 20)) append_term(parts, state, name_of('talentname', 20), -5);
  if (tal(cid, 35)) append_term(parts, state, name_of('talentname', 35), -1);
  if (tal(cid, 61)) append_term(parts, state, name_of('talentname', 61), 1);
  if (tal(cid, 62)) append_term(parts, state, name_of('talentname', 62), -3);
  if (tal(cid, 63)) append_term(parts, state, name_of('talentname', 63), 6);
  if (tal(cid, 71)) append_term(parts, state, name_of('talentname', 71), -1);
  if (tal(cid, 82) && tal(player, 122)) {
    append_term(parts, state, name_of('talentname', 82), -12);
  }
  if (tal(cid, 85) && !era_flag.assiplay) {
    append_term(parts, state, name_of('talentname', 85), 5);
  }
  if (tal(player, 121)) {
    append_term(parts, state, name_of('talentname', 121), 8);
  }
  if (tequip(cid, 89) && tal(cid, 136) === 0) {
    append_term(parts, state, name_of('itemname', 22), -15);
  }
  if (y) {
    const dirty_label = tal(cid, 61)
      ? `脏、${name_of('talentname', 61)}`
      : tal(cid, 62)
        ? `脏、${name_of('talentname', 62)}`
        : '脏';
    append_term(parts, state, dirty_label, -y);
  }
  let v = 50;
  if (tequip(cid, 53)) v += 10;
  if (tequip(cid, 18)) v += 3;
  if (tequip(cid, 11)) v += 5;
  if (tequip(cid, 13)) v += 5;
  parts.push(` = ${state.a}`);
  parts.push(state.a < v ? ' < ' : state.a === v ? ' = ' : ' > ');
  parts.push(`实行值${v}`);
  era.print(parts.join(''));
  await era.waitAnyKey();
  return state.a >= v;
}

function apply_lube_lust_obey(va, vb, vc, cid) {
  const lube = palam(cid, 3);
  if (lube < PALAMLV[1]) {
    va = times(va, 0.4);
    vb = times(vb, 0.4);
    vc += 800;
  } else if (lube < PALAMLV[2]) {
    va = times(va, 0.8);
    vb = times(vb, 0.8);
    vc += 500;
  } else if (lube < PALAMLV[3]) {
    vc += 300;
  } else if (lube < PALAMLV[4]) {
    va = times(va, 1.4);
    vb = times(vb, 1.4);
    vc += 120;
  } else {
    va = times(va, 1.8);
    vb = times(vb, 1.8);
    vc += 100;
  }
  const lust_m = palam_ladder(palam(cid, 5));
  const lust = [0.8, 0.9, 1, 1.1, 1.2, 1.2][lust_m];
  va = times(va, lust);
  vb = times(vb, lust);
  const obey = [0.8, 0.9, 1, 1.1, 1.2, 1.3][Math.min(abl(cid, 10), 5)];
  va = times(va, obey);
  vb = times(vb, obey);
  return { va, vb, vc };
}

function source125(y) {
  const cid = era_flag.target;
  if (tal(cid, 47)) {
    add_lose(cid, 0, 20);
    add_lose(cid, 1, 70);
  } else {
    add_lose(cid, 0, 30);
    add_lose(cid, 1, 150);
  }
  set_src(cid, 13, 1500);
  set_src(cid, 14, 500);
  set_src(cid, 8, y * 40 + 100);

  let va = 0;
  let vb = 0;
  let vc = 0;
  let vd = 0;
  const va_tiers = [
    [40, 150],
    [120, 400],
    [300, 700],
    [500, 900],
    [650, 1000],
    [850, 1200],
  ];
  const clit = [
    [15, 2000, 500],
    [50, 2300, 800],
    [300, 2600, 1200],
    [700, 2900, 1900],
    [1100, 3200, 2500],
    [1600, 3500, 3000],
  ][Math.min(abl(cid, 0), 5)];
  set_src(cid, 0, clit[0]);
  set_src(cid, 12, clit[1]);
  set_src(cid, 13, clit[2]);
  set_src(cid, 17, [15, 50, 300, 700, 1100, 1600][Math.min(abl(cid, 1), 5)]);

  if (tequip(cid, 11)) {
    const row = va_tiers[Math.min(abl(cid, 2), 5)];
    va += row[0];
    vd += row[1];
    const e0 = exp(cid, 0);
    if (e0 < EXPLV[2]) {
      va = times(va, 0.6);
      vc += 150;
    } else if (e0 < EXPLV[3]) {
      va = times(va, 1);
      vc += 20;
    } else if (e0 < EXPLV[4]) {
      va = times(va, 1.2);
    } else if (e0 < EXPLV[5]) {
      va = times(va, 1.4);
    } else {
      va = times(va, 1.6);
    }
    if (tal(cid, 103)) {
      vc = times(vc, 1.5);
      vd = times(vd, 1.5);
    } else if (tal(cid, 104)) {
      vc = times(vc, 0.6);
      vd = times(vd, 0.6);
    }
    add_src(cid, 13, vd);
  }

  if (tequip(cid, 13)) {
    add_lose(cid, 0, 30);
    add_lose(cid, 1, 80);
    const row = va_tiers[Math.min(abl(cid, 3), 5)];
    vb += row[0];
    vd += row[1];
    const e1 = exp(cid, 1);
    if (e1 < EXPLV[1]) {
      vb = times(vb, 0.5);
      vc += 1000;
    } else if (e1 < EXPLV[2]) {
      vb = times(vb, 1);
      vc += 150;
    } else if (e1 < EXPLV[3]) {
      vb = times(vb, 1.1);
      vc += 20;
    } else if (e1 < EXPLV[4]) {
      vb = times(vb, 1.2);
    } else if (e1 < EXPLV[5]) {
      vb = times(vb, 1.4);
    } else {
      vb = times(vb, 1.6);
    }
    if (tal(cid, 105)) {
      vc = times(vc, 1.5);
      vd = times(vd, 1.5);
    } else if (tal(cid, 106)) {
      vc = times(vc, 0.6);
      vd = times(vd, 0.6);
    }
    add_src(cid, 13, vd);
  }

  if (tequip(cid, 18)) {
    const shower_c = [
      [150, 1000, 50],
      [400, 1300, 80],
      [800, 1600, 120],
      [1200, 1900, 190],
      [1500, 2200, 250],
      [1800, 2500, 300],
    ][Math.min(abl(cid, 0), 5)];
    set_src(cid, 0, shower_c[0]);
    set_src(cid, 12, shower_c[1]);
    set_src(cid, 13, shower_c[2]);
    const shower_v = [
      [0, 0],
      [100, 300],
      [200, 400],
      [300, 500],
      [400, 600],
      [500, 700],
    ][Math.min(abl(cid, 2), 5)];
    set_src(cid, 1, shower_v[0]);
    vd = shower_v[1];
    const shower_a = va_tiers[Math.min(abl(cid, 3), 5)];
    vb = shower_a[0];
    vd += shower_a[1];
    if (tal(cid, 103)) {
      times_src(cid, 6, 1.5);
      vd = times(vd, 1.5);
    } else if (tal(cid, 104)) {
      times_src(cid, 6, 0.6);
      vd = times(vd, 0.6);
    }
    if (tal(cid, 105)) {
      times_src(cid, 6, 1.5);
      vd = times(vd, 1.5);
    } else if (tal(cid, 106)) {
      times_src(cid, 6, 0.6);
      vd = times(vd, 0.6);
    }
    add_src(cid, 13, vd);
  } else {
    vb = 0;
    set_src(cid, 2, 0);
    va = 0;
    set_src(cid, 1, 0);
  }

  if (tequip(cid, 11) || tequip(cid, 13)) {
    const e = abl(cid, 2) + abl(cid, 3);
    const decay =
      e <= 1
        ? 1
        : e <= 3
          ? 0.9
          : e <= 5
            ? 0.8
            : e <= 7
              ? 0.7
              : e <= 9
                ? 0.6
                : 0.5;
    times_src(cid, 0, decay);
    times_src(cid, 17, decay);
    ({ va, vb, vc } = apply_lube_lust_obey(va, vb, vc, cid));
    if (tal(cid, 99)) vc = times(vc, 0.8);
    if (tal(cid, 100)) vc = times(vc, 2);
    if (tal(cid, 30)) vc = times(vc, 3);
    set_src(cid, 1, va);
    set_src(cid, 2, vb);
    set_src(cid, 6, vc);
  }

  if (tequip(cid, 18)) {
    ({ va, vb, vc } = apply_lube_lust_obey(va, vb, vc, cid));
    add_src(cid, 1, va);
    add_src(cid, 2, vb);
  }

  const service = [
    [620, 150, 4],
    [700, 300, 2.5],
    [820, 600, 1.5],
    [940, 900, 1],
    [1100, 1500, 0.5],
    [1260, 2200, 0.1],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 4, service[0]);
  set_src(cid, 5, service[1]);
  times_src(cid, 8, service[2]);

  const skill = Math.min(abl(cid, 12), 5);
  set_src(cid, 4, [100, 160, 220, 280, 340, 400][skill]);
  const skill_body = [0.3, 0.7, 1, 1.2, 1.4, 1.6][skill];
  times_src(cid, 0, skill_body);
  times_src(cid, 17, skill_body);
  times_src(cid, 1, skill_body);
  times_src(cid, 2, skill_body);
  times_src(cid, 4, [0.5, 0.8, 1, 1.2, 1.5, 2][skill]);
  times_src(cid, 5, skill_body);

  const addict = Math.min(abl(cid, 31), 5);
  set_src(cid, 7, [0, 100, 300, 800, 1500, 2500][addict]);
  const addict_m = [1, 1.1, 1.2, 1.3, 1.5, 1.7][addict];
  const addict_va = addict === 5 ? 1.5 : addict_m;
  times_src(cid, 0, addict_m);
  times_src(cid, 17, addict_m);
  times_src(cid, 1, addict_va);
  times_src(cid, 2, addict_va);

  if (tequip(cid, 53) || tequip(cid, 54)) {
    const expo = Math.min(abl(cid, 17), 5);
    add_src(cid, 7, [0, 100, 300, 800, 1500, 2500][expo]);
    const expo_m = [1, 1.1, 1.2, 1.3, 1.5, 1.7][expo];
    times_src(cid, 0, expo_m);
    times_src(cid, 17, expo_m);
    times_src(cid, 1, expo_m);
    times_src(cid, 2, expo_m);
    times_src(cid, 12, [1, 1.2, 1.4, 1.6, 2, 3][expo]);
    if (tal(cid, 89)) {
      add_src(cid, 7, 500);
      times_src(cid, 0, 1.2);
      times_src(cid, 17, 1.2);
      times_src(cid, 1, 1.2);
      times_src(cid, 2, 1.2);
      times_src(cid, 12, 1.5);
    }
  }

  if (!tal(cid, 125) && tal(cid, 310) <= 20) times_src(cid, 12, 2);
}

function after125(e) {
  const cid = era_flag.target;
  const player = era_flag.player;
  const mouth = stain(cid, 0) | stain(player, 2);
  era.set(`stain:${cid}:0`, mouth);
  era.set(`stain:${player}:2`, mouth);
  const finger_b = stain(cid, 1) | stain(cid, 5);
  era.set(`stain:${cid}:1`, finger_b);
  era.set(`stain:${cid}:5`, finger_b);
  const finger_v = stain(cid, 1) | stain(cid, 3);
  era.set(`stain:${cid}:1`, finger_v);
  era.set(`stain:${cid}:3`, finger_v);
  if (tequip(cid, 18) === 1) {
    era.set(`stain:${cid}:1`, 0);
    era.set(`stain:${cid}:2`, 2);
    era.set(`stain:${cid}:3`, 1);
    era.set(`stain:${cid}:4`, 8);
    era.set(`palam:${cid}:3`, Math.floor(palam(cid, 3) / 2));
  }
  if (abl(cid, 16) >= 2 && abl(cid, 12) >= 2) {
    era.set(`stain:${player}:2`, 2);
    if (e >= 1) game.train.口交射精后 = 1;
  }
  if (tal(cid, 122) === 0 && tal(player, 122) === 0) {
    era.print(`${name_of('expname', 40)}+7`);
    era.add(`exp:${cid}:40`, 7);
  } else if (tal(cid, 122) === 1 && tal(player, 122) === 1) {
    era.print(`${name_of('expname', 41)}+7`);
    era.add(`exp:${cid}:41`, 7);
  }
  if (!era_flag.assiplay && exp(cid, 0) >= EXPLV[3]) {
    game.train.主人经验 += 1;
  }
  if ((era.get(`cflag:${cid}:16`) || 0) === -1) {
    era.set(`cflag:${cid}:16`, 201);
    era.set(`cstr:${cid}:4`, chara_callname(player));
    era.set('tflag:13', 1);
  }
  const love = tal(cid, 122) ? 2 : 1;
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${name_of('expname', 23)}+${love}`);
    era.add(`exp:${cid}:23`, love);
  }
  if (tal(player, 121)) set_src(cid, 13, Math.floor(src(cid, 13) / 2));
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 3;
}

async function message_b125() {
  const cid = era_flag.target;
  let line = target_name();
  if (tal(cid, 85)) line += '带着发烧似的表情、';
  if (tal(cid, 76)) line += '带着淫媚的表情、';
  if (tal(cid, 52)) line += '用舌头灵活地缠绕着棒身、';
  line += '一边吸啜着阴茎、一边';
  if (tequip(cid, 11) && tequip(cid, 13)) {
    line += '抽动着私处和肛门里的虫子…';
  } else if (tequip(cid, 11)) {
    line += '抽动着私处里的虫子…';
  } else if (tequip(cid, 13)) {
    line += '抽动着肛门里的虫子…';
  } else if (tal(cid, 122)) {
    line += '玩弄着自己的阴茎…';
  } else {
    line += '玩弄着自己的阴唇…';
  }
  era.print(line);
}

async function message_a125() {
  const amount = era.get('tflag:0') || 0;
  if (amount !== 1 && amount !== 2) return;
  const cid = era_flag.target;
  if (amount === 1) {
    if (abl(cid, 32) >= 3) {
      era.print(`${target_name()}带着恍惚的表情、把注入口中的精液喝光了…`);
    } else if (abl(cid, 16) >= 3) {
      era.print(
        `${target_name()}喉咙发出模糊不清的声音、把注入口中的精液喝光了…`,
      );
    } else {
      era.print(`精液注入到${target_name()}的嘴里了…`);
    }
    return;
  }
  if (abl(cid, 32) >= 3) {
    era.print(`${target_name()}带着恍惚的表情、把口中的精液喝光了…`);
  } else if (abl(cid, 16) >= 3) {
    era.print(`没喝完的精液、从${target_name()}的嘴里溢出来了…`);
  } else {
    era.print(`满满的精液、把${target_name()}的喉咙叩开了…`);
  }
}

/** @COM125（COMF125_フェラ自慰.ERB）口交时自慰。高级 COM。 */
async function com125() {
  era_flag.selectcom = 125; // 原作显式 SELECTCOM = 125（升格抵达时回填号位）
  era.print('口交时自慰');
  const y = dirty_penalty_125();
  if (!(await order125(y))) return 0;
  await train_message_b();
  era.print(`${name_of('expname', 22)}＋１`);
  era.add(`exp:${era_flag.target}:22`, 1);
  era.print(`${name_of('expname', 10)}＋１`);
  era.add(`exp:${era_flag.target}:10`, 1);
  source125(y);
  const b = gauge124();
  const e = ejac124();
  await com_ejac_player_milk(b);
  after125(e);
  return 1;
}

function source126(y) {
  const cid = era_flag.target;
  if (tal(cid, 47)) {
    add_lose(cid, 0, 10);
    add_lose(cid, 1, 90);
  } else {
    add_lose(cid, 0, 20);
    add_lose(cid, 1, 150);
  }
  set_src(cid, 13, 1500);
  set_src(cid, 14, 500);
  set_src(cid, 8, y * 40 + 100);
  const service = [
    [500, 150, 4],
    [600, 300, 2.5],
    [700, 600, 1.5],
    [800, 900, 1],
    [900, 1500, 0.5],
    [1000, 2200, 0.1],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 4, service[0]);
  set_src(cid, 5, service[1]);
  times_src(cid, 8, service[2]);
  const skill = Math.min(abl(cid, 12), 5);
  times_src(cid, 4, [0.8, 1, 1.2, 1.5, 1.8, 2.4][skill]);
  times_src(cid, 5, [0.5, 0.8, 1, 1.2, 1.5, 2][skill]);
}

function gauge126() {
  const cid = era_flag.target;
  const player = era_flag.player;
  let b = [1200, 1700, 2300, 3000, 3600, 4200][Math.min(abl(cid, 12), 5)];
  b = times(b, [0.8, 0.9, 1, 1.1, 1.2, 1.3][Math.min(abl(cid, 10), 5)]);
  b = times(b, [0.5, 0.8, 1.2, 1.5, 1.8, 2.4][Math.min(abl(cid, 13), 5)]);
  b = times(b, [1, 1.2, 1.3, 1.5, 1.7, 2][Math.min(abl(cid, 32), 5)]);
  if (tal(cid, 52)) b = times(b, 2);
  b = times(b, [1, 1.5, 2, 2.5, 3.5, 5][Math.min(abl(player, 0), 5)]);
  if (tal(player, 119) || tal(player, 122) || tal(player, 121)) {
    era.add(`base:${player}:2`, b);
  }
  return b;
}

function after126(e) {
  const cid = era_flag.target;
  const player = era_flag.player;
  const finger = stain(cid, 1) | stain(player, 2);
  era.set(`stain:${cid}:1`, finger);
  era.set(`stain:${player}:2`, finger);
  const mouth = stain(cid, 0) | stain(player, 2);
  era.set(`stain:${cid}:0`, mouth);
  era.set(`stain:${player}:2`, mouth);
  if (abl(cid, 16) >= 2 && abl(cid, 12) >= 2) {
    era.set(`stain:${player}:2`, 2);
    if (e >= 1) game.train.口交射精后 = 1;
  }
  if (tal(cid, 122) === 0 && tal(player, 122) === 0) {
    era.print(`${name_of('expname', 40)}+7`);
    era.add(`exp:${cid}:40`, 7);
  } else if (tal(cid, 122) === 1 && tal(player, 122) === 1) {
    era.print(`${name_of('expname', 41)}+7`);
    era.add(`exp:${cid}:41`, 7);
  }
  if (!era_flag.assiplay && exp(cid, 0) >= EXPLV[3]) {
    game.train.主人经验 += 1;
  }
  if ((era.get(`cflag:${cid}:16`) || 0) === -1) {
    era.set(`cflag:${cid}:16`, 201);
    era.set(`cstr:${cid}:4`, chara_callname(player));
    era.set('tflag:13', 1);
  }
  const love = tal(cid, 122) ? 2 : 1;
  if ((era.get(`cflag:${cid}:2`) || 0) >= 1000 && !era_flag.assiplay) {
    era.print(`${name_of('expname', 23)}+${love}`);
    era.add(`exp:${cid}:23`, love);
  }
  if (tal(player, 121)) set_src(cid, 13, Math.floor(src(cid, 13) / 2));
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
}

async function message_b126() {
  const cid = era_flag.target;
  let line = target_name();
  if (tal(cid, 85)) line += '带着对你拳拳在念的表情、';
  if (tal(cid, 52)) line += '用舌头灵活地缠绕着棒身、';
  line += tal(era_flag.player, 122)
    ? '吸啜着阴茎、一只手按摩着阴囊、另一只手按摩着阴茎的根部。'
    : '吸啜着阴茎、按摩着阴茎的根部。';
  era.print(line);
}

async function message_a126() {
  const amount = era.get('tflag:0') || 0;
  if (amount !== 1 && amount !== 2) return;
  const cid = era_flag.target;
  const player = era_flag.player;
  if (amount === 1) {
    era.print(
      abl(cid, 16) >= 3
        ? `${target_name()}喉咙发出模糊不清的声音、把注入口中的精液喝光了…`
        : `精液注入到${target_name()}的口中了…`,
    );
    if (abl(cid, 32) >= 3 && tal(player, 122)) {
      era.print(
        `${target_name()}揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。`,
      );
    }
    if (abl(cid, 32) >= 3 && tal(player, 121)) {
      era.print(
        `${target_name()}撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。`,
      );
    }
    return;
  }
  era.print(
    abl(cid, 16) >= 3
      ? `没喝完的精液、从${target_name()}的嘴里溢出了…`
      : `满满的精液、把${target_name()}的喉咙叩开了…`,
  );
  if (abl(cid, 32) >= 3 && tal(player, 122)) {
    era.print(
      `满溢的精液、将${target_name()}的嘴边搞得一塌糊涂。揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。`,
    );
  }
  if (abl(cid, 32) >= 3 && tal(player, 121)) {
    era.print(
      `满溢的精液、将${target_name()}的嘴边搞得一塌糊涂。撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。`,
    );
  }
}

/** @COM126（COMF126_手コキフェラ.ERB）手搓口交。高级 COM。 */
async function com126() {
  era_flag.selectcom = 126; // 原作显式 SELECTCOM = 126（升格抵达时回填号位）
  era.print('手搓口交');
  const y = dirty_penalty_125();
  if (!(await order124(y))) return 0;
  await train_message_b();
  era.print(`${name_of('expname', 22)}＋１`);
  era.add(`exp:${era_flag.target}:22`, 1);
  source126(y);
  const b = gauge126();
  const e = ejac124();
  await com_ejac_player_milk(b);
  after126(e);
  return 1;
}

async function message_b127() {
  const cid = era_flag.target;
  let line = `${target_name()}将${player_name()}的龟头、用舌头`;
  line += tal(cid, 52) ? '来回打转着、' : '舔舐着、';
  line += '脸颊凹陷、发出淫秽的声音、';
  if (abl(cid, 12) >= 4 && abl(cid, 13) >= 3) line += '让人腰都酥软了、';
  line += '强烈地吮吸着…';
  era.print(line);
}

async function message_a127() {
  const amount = era.get('tflag:0') || 0;
  if (amount !== 1 && amount !== 2) return;
  const cid = era_flag.target;
  if (amount === 1) {
    era.print(
      abl(cid, 16) >= 3
        ? `${target_name()}淫秽地吸啜着阴茎、在她口中开射出…`
        : `${target_name()}吸啜着阴茎、在她口中开放了精关…`,
    );
    if (abl(cid, 32) >= 3) {
      era.print(`${target_name()}带着恍惚的表情、把阴茎上的精液吸吮干净了。`);
    }
    return;
  }
  era.print(
    abl(cid, 16) >= 3
      ? `${target_name()}淫秽地吸啜着阴茎、在她嘴里、大量的精液喷涌而出…`
      : `${target_name()}吸啜着阴茎、在她嘴里、大量的精液喷涌而出…`,
  );
  if (abl(cid, 32) >= 3) {
    era.print(
      `精液从嘴里溢出、${target_name()}带着恍惚的表情、把阴茎上的精液吸吮干净…`,
    );
  }
}

/** @COM127（COMF127_バキュームフェラ.ERB）真空口交。高级 COM。 */
async function com127() {
  era_flag.selectcom = 127; // 原作显式 SELECTCOM = 127（升格抵达时回填号位）
  era.print('真空口交');
  const y = dirty_penalty_124();
  if (!(await order124(y))) return 0;
  await train_message_b();
  era.print(`${name_of('expname', 22)}＋１`);
  era.add(`exp:${era_flag.target}:22`, 1);
  source124(y);
  const b = gauge124();
  const e = ejac124();
  await com_ejac_player_milk(b);
  after124(e);
  return 1;
}

function source128() {
  const cid = era_flag.target;
  add_lose(cid, 0, 60);
  add_lose(cid, 1, 120);
  set_src(cid, 12, 400);
  const service = [
    [50, 10],
    [150, 50],
    [200, 100],
    [250, 180],
    [300, 300],
    [350, 500],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 4, service[0]);
  set_src(cid, 5, service[1]);
  const skill = [0.5, 0.8, 1, 1.5, 2.5, 4][Math.min(abl(cid, 12), 5)];
  times_src(cid, 4, skill);
  times_src(cid, 5, skill);
  const v_feel = [
    [40, 150],
    [150, 250],
    [400, 350],
    [1000, 500],
    [1700, 700],
    [2200, 1000],
  ][Math.min(abl(cid, 2), 5)];
  set_src(cid, 1, v_feel[0]);
  set_src(cid, 3, v_feel[1]);
  const e0 = exp(cid, 0);
  if (e0 < EXPLV[1]) {
    times_src(cid, 1, 0.2);
    set_src(cid, 6, 5500);
  } else if (e0 < EXPLV[2]) {
    times_src(cid, 1, 0.6);
    set_src(cid, 6, 300);
  } else if (e0 < EXPLV[3]) {
    times_src(cid, 1, 1);
    set_src(cid, 6, 50);
  } else if (e0 < EXPLV[4]) {
    times_src(cid, 1, 1.2);
    set_src(cid, 6, 10);
  } else if (e0 < EXPLV[5]) {
    times_src(cid, 1, 1.3);
    set_src(cid, 6, 0);
  } else {
    times_src(cid, 1, 1.8);
    set_src(cid, 6, 0);
  }
  const lube = palam(cid, 3);
  if (lube < PALAMLV[1]) {
    times_src(cid, 1, 0.1);
    add_src(cid, 6, 1000);
    times_src(cid, 6, 3);
  } else if (lube < PALAMLV[2]) {
    times_src(cid, 1, 0.4);
    add_src(cid, 6, 300);
    times_src(cid, 6, 1);
  } else if (lube < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 6, 0.5);
  } else if (lube < PALAMLV[4]) {
    times_src(cid, 1, 1.4);
    times_src(cid, 6, 0.2);
  } else {
    times_src(cid, 1, 1.8);
    times_src(cid, 6, 0.1);
  }
  if (era_flag.assiplay && tal(era_flag.assi, 121)) times_src(cid, 1, 2.5);
  if (tal(cid, 99)) times_src(cid, 6, 0.8);
  if (tal(cid, 100)) times_src(cid, 6, 2);
  if (tal(cid, 135)) times_src(cid, 6, 4);
  if (tal(cid, 30)) {
    times_src(cid, 3, 0.6);
    set_src(cid, 15, e0 === 0 ? 10000 : 1000);
  } else if (tal(cid, 31)) {
    if (e0 === 0) {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 300);
    }
  } else if (e0 === 0) {
    set_src(cid, 15, 3000);
  }
  const lust = palam(cid, 5);
  if (lust < PALAMLV[1]) {
    times_src(cid, 1, 0.6);
    times_src(cid, 3, 0.3);
  } else if (lust < PALAMLV[2]) {
    times_src(cid, 1, 0.8);
    times_src(cid, 3, 0.6);
  } else if (lust < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 3, 1);
  } else if (lust < PALAMLV[4]) {
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
  if (tal(cid, 85)) times_src(cid, 1, 1.5);
  times_src(cid, 3, 2); // 源侧无缩进，恒乘（COMF128:230）
}

function after128() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const mouth = stain(cid, 0) | stain(player, 0);
  era.set(`stain:${cid}:0`, mouth);
  era.set(`stain:${player}:0`, mouth);
}

async function message_b128() {
  era.print(
    `${target_name()}被贯穿的身体迎接着压下来的分量、嘴唇与${player_name()}重重地吻着、舌头缠绕在一起…`,
  );
}

async function message_a128() {
  await train_message_a_sex_common();
}

/** @COM128（COMF128_正常位・キス.ERB）正常位・接吻。高级 COM。 */
async function com128() {
  era_flag.selectcom = 128; // 原作显式 SELECTCOM = 128（升格抵达时回填号位）
  if ((await confirm_lost_virgin()) === 0) return 0;
  if (!(await confirm_condom())) return 0;
  era.print('正常位・接吻');
  await train_message_b();
  const cid = era_flag.target;
  game.train.伴V经验指令 = 1;
  if (tal(cid, 85) && !era_flag.assiplay && exp(cid, 0) === 0) {
    game.train.主人导致处女丧失 = 1;
  }
  await com_ejac_player_sex();
  source128();
  after128();
  await com_after_vagina_sex();
  return 1;
}

function source129() {
  const cid = era_flag.target;
  add_lose(cid, 0, 60);
  add_lose(cid, 1, 120);
  set_src(cid, 12, 400);
  const v_feel = [
    [40, 150],
    [150, 250],
    [400, 350],
    [1000, 500],
    [1700, 700],
    [2200, 1000],
  ][Math.min(abl(cid, 2), 5)];
  set_src(cid, 1, v_feel[0]);
  set_src(cid, 3, v_feel[1]);
  const e0 = exp(cid, 0);
  if (e0 < EXPLV[1]) {
    times_src(cid, 1, 0.2);
    set_src(cid, 6, 5500);
  } else if (e0 < EXPLV[2]) {
    times_src(cid, 1, 0.6);
    set_src(cid, 6, 300);
  } else if (e0 < EXPLV[3]) {
    times_src(cid, 1, 1);
    set_src(cid, 6, 50);
  } else if (e0 < EXPLV[4]) {
    times_src(cid, 1, 1.2);
    set_src(cid, 6, 10);
  } else if (e0 < EXPLV[5]) {
    times_src(cid, 1, 1.3);
    set_src(cid, 6, 0);
  } else {
    times_src(cid, 1, 1.8);
    set_src(cid, 6, 0);
  }
  const breast = [
    [50, 50],
    [200, 100],
    [500, 200],
    [800, 300],
    [1300, 500],
    [1800, 700],
  ][Math.min(abl(cid, 1), 5)];
  set_src(cid, 17, breast[0]);
  add_src(cid, 3, breast[1]);
  const lube = palam(cid, 3);
  if (lube < PALAMLV[1]) {
    times_src(cid, 1, 0.1);
    add_src(cid, 6, 1000);
    times_src(cid, 6, 3);
  } else if (lube < PALAMLV[2]) {
    times_src(cid, 1, 0.4);
    add_src(cid, 6, 300);
    times_src(cid, 6, 1);
  } else if (lube < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 6, 0.5);
  } else if (lube < PALAMLV[4]) {
    times_src(cid, 1, 1.4);
    times_src(cid, 6, 0.2);
  } else {
    times_src(cid, 1, 1.8);
    times_src(cid, 6, 0.1);
  }
  if (era_flag.assiplay && tal(era_flag.assi, 121)) times_src(cid, 1, 2.5);
  if (tal(cid, 99)) times_src(cid, 6, 0.8);
  if (tal(cid, 100)) times_src(cid, 6, 2);
  if (tal(cid, 135)) times_src(cid, 6, 4);
  if (tal(cid, 30)) {
    times_src(cid, 3, 0.6);
    set_src(cid, 15, e0 === 0 ? 10000 : 1000);
  } else if (tal(cid, 31)) {
    if (e0 === 0) {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 300);
    }
  } else if (e0 === 0) {
    set_src(cid, 15, 3000);
  }
  const lust = palam(cid, 5);
  if (lust < PALAMLV[1]) {
    times_src(cid, 1, 0.6);
    times_src(cid, 3, 0.3);
  } else if (lust < PALAMLV[2]) {
    times_src(cid, 1, 0.8);
    times_src(cid, 3, 0.6);
  } else if (lust < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 3, 1);
  } else if (lust < PALAMLV[4]) {
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
}

async function message_b129() {
  const cid = era_flag.target;
  let line = `${target_name()}被贯穿的身体上、`;
  if (tal(cid, 110) || tal(cid, 114)) {
    line += `那对摇晃不已的豪乳被${player_name()}又揉又抓`;
  } else if (tal(cid, 109)) {
    line += `小小的胸部被${player_name()}按摩`;
  } else {
    line += `晃动的胸部被${player_name()}揉搓`;
  }
  line += '着…';
  era.print(line);
}

async function message_a129() {
  await train_message_a_sex_common();
}

/** @COM129（COMF129_正常位・胸愛撫.ERB）正常位・胸爱抚。高级 COM。 */
async function com129() {
  era_flag.selectcom = 129; // 原作显式 SELECTCOM = 129（升格抵达时回填号位）
  if ((await confirm_lost_virgin()) === 0) return 0;
  if (!(await confirm_condom())) return 0;
  era.print('正常位・胸爱抚');
  await train_message_b();
  const cid = era_flag.target;
  game.train.伴V经验指令 = 1;
  if (tal(cid, 85) && !era_flag.assiplay && exp(cid, 0) === 0) {
    game.train.主人导致处女丧失 = 1;
  }
  await com_ejac_player_sex();
  source129();
  await com_after_vagina_sex();
  return 1;
}

function source130() {
  const cid = era_flag.target;
  add_lose(cid, 0, 70);
  add_lose(cid, 1, 130);
  set_src(cid, 12, 400);
  const service = [
    [50, 10],
    [150, 50],
    [200, 100],
    [250, 180],
    [300, 300],
    [350, 500],
  ][Math.min(abl(cid, 16), 5)];
  set_src(cid, 4, service[0]);
  set_src(cid, 5, service[1]);
  const skill = [0.5, 0.8, 1, 1.5, 2.5, 4][Math.min(abl(cid, 12), 5)];
  times_src(cid, 4, skill);
  times_src(cid, 5, skill);
  set_src(cid, 0, [20, 100, 500, 1200, 2000, 2800][Math.min(abl(cid, 0), 5)]);
  const v_feel = [
    [10, 250],
    [50, 500],
    [450, 550],
    [1000, 800],
    [2800, 1200],
    [4000, 1800],
  ][Math.min(abl(cid, 2), 5)];
  set_src(cid, 1, v_feel[0]);
  set_src(cid, 3, v_feel[1]);
  const e0 = exp(cid, 0);
  if (e0 < EXPLV[1]) {
    times_src(cid, 1, 0.2);
    set_src(cid, 6, 5500);
  } else if (e0 < EXPLV[2]) {
    times_src(cid, 1, 0.6);
    set_src(cid, 6, 300);
  } else if (e0 < EXPLV[3]) {
    times_src(cid, 1, 1);
    set_src(cid, 6, 50);
  } else if (e0 < EXPLV[4]) {
    times_src(cid, 1, 1.2);
    set_src(cid, 6, 10);
  } else if (e0 < EXPLV[5]) {
    times_src(cid, 1, 1.3);
    set_src(cid, 6, 0);
  } else {
    times_src(cid, 1, 1.8);
    set_src(cid, 6, 0);
  }
  const lube = palam(cid, 3);
  if (lube < PALAMLV[1]) {
    times_src(cid, 1, 0.1);
    add_src(cid, 6, 1000);
    times_src(cid, 6, 3);
  } else if (lube < PALAMLV[2]) {
    times_src(cid, 1, 0.4);
    add_src(cid, 6, 300);
    times_src(cid, 6, 1);
  } else if (lube < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 6, 0.5);
  } else if (lube < PALAMLV[4]) {
    times_src(cid, 1, 1.4);
    times_src(cid, 6, 0.2);
  } else {
    times_src(cid, 1, 1.8);
    times_src(cid, 6, 0.1);
  }
  if (era_flag.assiplay && tal(era_flag.assi, 121)) times_src(cid, 1, 2.5);
  if (tal(cid, 99)) times_src(cid, 6, 0.8);
  if (tal(cid, 100)) times_src(cid, 6, 2);
  if (tal(cid, 135)) times_src(cid, 6, 4);
  if (tal(cid, 30)) {
    times_src(cid, 3, 0.6);
    set_src(cid, 15, e0 === 0 ? 10000 : 1000);
  } else if (tal(cid, 31)) {
    if (e0 === 0) {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 300);
    }
  } else if (e0 === 0) {
    set_src(cid, 15, 3000);
  }
  const breast = [
    [20, 50],
    [100, 100],
    [500, 160],
    [1200, 200],
    [2000, 230],
    [2800, 250],
  ][Math.min(abl(cid, 1), 5)];
  set_src(cid, 17, breast[0]);
  set_src(cid, 3, breast[1]); // 源侧覆写情爱，不是加算（COMF130:189）
  const lust = palam(cid, 5);
  if (lust < PALAMLV[1]) {
    times_src(cid, 1, 0.6);
    times_src(cid, 3, 0.3);
  } else if (lust < PALAMLV[2]) {
    times_src(cid, 1, 0.8);
    times_src(cid, 3, 0.6);
  } else if (lust < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 3, 1);
  } else if (lust < PALAMLV[4]) {
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
  if (tal(cid, 85)) {
    times_src(cid, 0, 1.5);
    times_src(cid, 1, 1.5);
    times_src(cid, 3, 2);
    times_src(cid, 17, 1.5);
  }
}

function after130() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const mouth = stain(cid, 0) | stain(player, 0);
  era.set(`stain:${cid}:0`, mouth);
  era.set(`stain:${player}:0`, mouth);
  const breast_stain = stain(cid, 5) | stain(player, 1);
  era.set(`stain:${cid}:5`, breast_stain);
  era.set(`stain:${player}:1`, breast_stain);
}

async function message_b130() {
  const cid = era_flag.target;
  era.print(
    `${target_name()}用被贯穿的身体迎接着压下来的分量、嘴唇与${player_name()}重重地吻着、舌头缠绕在一起…`,
  );
  if (tal(cid, 110) || tal(cid, 114)) {
    era.print(
      `正在翻腾起波涛乳浪的双峰被与${player_name()}抓住、充满弹性的乳肉、被揉的时候好像要跳起来一样。`,
    );
  } else if (tal(cid, 109)) {
    era.print(`小小的胸部被${player_name()}按摩着。`);
  } else {
    era.print(`晃动的胸部被${player_name()}揉搓着。`);
  }
  if (tal(cid, 85)) era.print('接着两人双手十指紧扣、');
  era.print('在肉体与灵魂交汇中挺动着腰、不停地捅着子宫…');
  if ((era.get('tflag:899') || 0) !== 0) return;
  const e0 = exp(cid, 0);
  if (e0 <= 30 || (e0 >= 31 && e0 <= 50)) {
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
    let line = target_name();
    if (tal(cid, 85)) line += '眼里泛起幸福的泪水、';
    if (palam(cid, 5) > PALAMLV[4]) line += '口水流出来了、';
    if (palam(cid, 3) > PALAMLV[4]) line += '私处湿得一塌糊涂、';
    line += '样子发了疯似的、沉醉在牝奴能得到的最高快乐之中…';
    era.print(line);
  }
}

async function message_a130() {
  await train_message_a_sex_common();
}

/** @COM130（COMF130_正常位ＳＰ.ERB）正常位ＳＰ。高级 COM。 */
async function com130() {
  era_flag.selectcom = 130; // 原作显式 SELECTCOM = 130（升格抵达时回填号位）
  if ((await confirm_lost_virgin()) === 0) return 0;
  if (!(await confirm_condom())) return 0;
  era.print('正常位ＳＰ');
  await train_message_b();
  const cid = era_flag.target;
  game.train.伴V经验指令 = 1;
  if (tal(cid, 85) && !era_flag.assiplay && exp(cid, 0) === 0) {
    game.train.主人导致处女丧失 = 1;
  }
  await com_ejac_player_sex();
  source130();
  after130();
  await com_after_vagina_sex();
  return 1;
}

function source131() {
  const cid = era_flag.target;
  add_lose(cid, 0, 60);
  add_lose(cid, 1, 120);
  set_src(cid, 12, 800);
  const v_feel = [
    [40, 50],
    [150, 150],
    [400, 250],
    [1000, 350],
    [1700, 600],
    [2200, 850],
  ][Math.min(abl(cid, 2), 5)];
  set_src(cid, 1, v_feel[0]);
  set_src(cid, 3, v_feel[1]);
  const e0 = exp(cid, 0);
  if (e0 < EXPLV[1]) {
    times_src(cid, 1, 0.2);
    set_src(cid, 6, 5000);
    if (era_flag.assiplay && tal(era_flag.player, 122) === 0) {
      era.print(`${name_of('expname', 50)}＋１`);
      era.add(`exp:${cid}:50`, 1);
    }
  } else if (e0 < EXPLV[2]) {
    times_src(cid, 1, 0.6);
    set_src(cid, 6, 220);
  } else if (e0 < EXPLV[3]) {
    times_src(cid, 1, 1);
    set_src(cid, 6, 30);
  } else if (e0 < EXPLV[4]) {
    times_src(cid, 1, 1.2);
    set_src(cid, 6, 5);
  } else if (e0 < EXPLV[5]) {
    times_src(cid, 1, 1.3);
    set_src(cid, 6, 0);
  } else {
    times_src(cid, 1, 1.8);
    set_src(cid, 6, 0);
  }
  const breast = [
    [20, 50],
    [100, 100],
    [500, 160],
    [1200, 200],
    [2000, 230],
    [2800, 250],
  ][Math.min(abl(cid, 1), 5)];
  set_src(cid, 17, breast[0]);
  add_src(cid, 3, breast[1]);
  const lube = palam(cid, 3);
  if (lube < PALAMLV[1]) {
    times_src(cid, 1, 0.1);
    add_src(cid, 6, 900);
    times_src(cid, 6, 3);
  } else if (lube < PALAMLV[2]) {
    times_src(cid, 1, 0.4);
    add_src(cid, 6, 250);
    times_src(cid, 6, 1);
  } else if (lube < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 6, 0.5);
  } else if (lube < PALAMLV[4]) {
    times_src(cid, 1, 1.4);
    times_src(cid, 6, 0.2);
  } else {
    times_src(cid, 1, 1.8);
    times_src(cid, 6, 0.1);
  }
  if (era_flag.assiplay && tal(era_flag.assi, 121)) times_src(cid, 1, 2.5);
  if (tal(cid, 99)) times_src(cid, 6, 1.8);
  if (tal(cid, 100)) times_src(cid, 6, 2);
  if (tal(cid, 30)) {
    times_src(cid, 3, 0.6);
    set_src(cid, 15, e0 === 0 ? 10000 : 1000);
  } else if (tal(cid, 31)) {
    if (e0 === 0) {
      times_src(cid, 3, 0.6);
      set_src(cid, 15, 300);
    }
  } else if (e0 === 0) {
    set_src(cid, 15, 3000);
  }
  const lust = palam(cid, 5);
  if (lust < PALAMLV[1]) {
    times_src(cid, 1, 0.6);
    times_src(cid, 3, 0.3);
  } else if (lust < PALAMLV[2]) {
    times_src(cid, 1, 0.8);
    times_src(cid, 3, 0.6);
  } else if (lust < PALAMLV[3]) {
    times_src(cid, 1, 1);
    times_src(cid, 3, 1);
  } else if (lust < PALAMLV[4]) {
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
}

async function message_b131() {
  const cid = era_flag.target;
  let line = target_name();
  if (tal(cid, 110) || tal(cid, 114)) {
    line += '一对摇晃不已的豪乳、被从后又揉又抓着、';
  } else if (tal(cid, 109)) {
    line += '小小的胸部被从后按摩、';
  } else {
    line += '正在摇晃的胸部被从后抓住、不停揉搓着、';
  }
  line += '腰都僵硬了…';
  era.print(line);
}

async function message_a131() {
  await train_message_a_sex_common();
}

/** @COM131（COMF131_後背位・胸愛撫.ERB）背后位・胸爱抚。高级 COM。 */
async function com131() {
  era_flag.selectcom = 131; // 原作显式 SELECTCOM = 131（升格抵达时回填号位）
  if ((await confirm_lost_virgin()) === 0) return 0;
  if (!(await confirm_condom())) return 0;
  era.print('背后位・胸爱抚');
  await train_message_b();
  const cid = era_flag.target;
  game.train.伴V经验指令 = 1;
  if (
    tal(cid, 85) &&
    !era_flag.assiplay &&
    exp(cid, 0) === 0 &&
    !tequip(cid, 89)
  ) {
    game.train.主人导致处女丧失 = 1;
  }
  await com_ejac_player_sex();
  source131();
  await com_after_vagina_sex();
  return 1;
}

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
train_message_b_family.register(123, message_b123);
train_message_a_family.register(123, message_a123);
train_message_b_family.register(124, message_b124);
train_message_a_family.register(124, message_a124);
train_message_b_family.register(125, message_b125);
train_message_a_family.register(125, message_a125);
train_message_b_family.register(126, message_b126);
train_message_a_family.register(126, message_a126);
train_message_b_family.register(127, message_b127);
train_message_a_family.register(127, message_a127);
train_message_b_family.register(128, message_b128);
train_message_a_family.register(128, message_a128);
train_message_b_family.register(129, message_b129);
train_message_a_family.register(129, message_a129);
train_message_b_family.register(130, message_b130);
train_message_a_family.register(130, message_a130);
train_message_b_family.register(131, message_b131);
train_message_a_family.register(131, message_a131);

// TRAIN_MESSAGE 空操作占位：先把分发面占住，避免「族票未落地」占位行。
for (const id of [132, 133, 134, 135]) {
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
