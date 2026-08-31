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
const { PALAMLV } = require('#/era-utils/palam-level');
const { game } = require('#/facade/game');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const { com_able_family, com_family } = require('#/system/train/com-family');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { read_train_name } = require('#/system/train/train-name');
const { stub_line } = require('#/utils/stub-line');

/** CASE 21 升格可能命中、但尚未由助手族落地的目标。 */
const STUBBED_CALLS = ['COM64'];

const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
const palam = (id, i) => era.get(`palam:${id}:${i}`) || 0;
const exp = (id, i) => era.get(`exp:${id}:${i}`) || 0;
const stain = (id, i) => era.get(`stain:${id}:${i}`) || 0;
const worn = (id) => era.get(`cflag:${id}:40`) || 0;
const special = (id) => era.get(`cflag:${id}:42`) || 0;
const clothes_on = () => (era.get('flag:37') || 0) !== 0;

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

/** @COM120（COMF120_挿入Ｇスポ責め.ERB）插入Ｇ点蹂躏。高级 COM。 */
async function com120() {
  const select = era_flag.selectcom;
  if (select === 34 || (select >= 20 && select <= 23)) {
    era.print(`${read_train_name(select)}Ｇ点蹂躏`);
  } else {
    era.print('插入Ｇ点蹂躏');
  }
  era_flag.selectcom = 120; // 原作显式 SELECTCOM = 120（升格抵达时回填号位）
  await train_message_b();
  return 1;
}

/** @COM121（COMF121_挿入子宮口責め.ERB）插入子宫口蹂躏。高级 COM。 */
async function com121() {
  const select = era_flag.selectcom;
  if (select === 34 || (select >= 20 && select <= 23)) {
    era.print(`${read_train_name(select)}子宫口蹂躏`);
  } else {
    era.print('插入子宫口蹂躏');
  }
  era_flag.selectcom = 121; // 原作显式 SELECTCOM = 121（升格抵达时回填号位）
  await train_message_b();
  return 1;
}

/** @COM122（COMF122_兜あわせ.ERB）阴茎互捅。可直选。 */
async function com122() {
  era.print('阴茎互捅');
  await train_message_b();
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

// TRAIN_MESSAGE 空操作占位：先把分发面占住，避免「族票未落地」占位行。
for (const id of [
  120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134,
  135,
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
