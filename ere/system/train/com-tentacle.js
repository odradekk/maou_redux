/**
 * @file 调教指令「触手与自由调教」族：@COM100–109 / 150 / 208 真身 +
 * @COM_ABLE 可用性判定 + TRAIN_MESSAGE_A/B 分支 + @EQUIP_COM100 / 108
 * 持续效果 + @SYOKUSYU_MILK（issue #227 / J17）。
 *
 * 源: target/ERB/調教相關/COMF100_触手召喚.ERB  @COM100 / @EQUIP_COM100 /
 *     @COM101-109（JUMP 与 108 真身）/ @SYOKUSYU_MILK
 *     target/ERB/調教相關/COMF150_フリー調教.ERB @COM150
 *     target/ERB/調教相關/COMF208_触手.ERB      @COM208
 *     target/ERB/調教相關/COMABLE.ERB           @COM_ABLE100-109（:3548-）/
 *     @COM_ABLE150（:4623）/ @COM_ABLE208（:4760）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB SELECTCOM 100-109 / 150
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB SELECTCOM 150；100-109/208
 *     源侧无分支（显式无操作）；公共头 TFLAG:15 非死斗场触手两臂在
 *     train-message.js
 *
 * == JUMP 语义 ==
 *
 *   - COM101-107/109 尾 JUMP 不改写 SELECTCOM（TRAIN_MESSAGE_B 仍走触手号
 *     分支）。目标 11/13-17 未落地 → COM_MISSING；44/46 已由 com-sm.js
 *     注册。不建 COM11/13-17 存根（#220 在飞）。
 *   - COM208 先改写 SELECTCOM 再 JUMP COM31/5/21/27。COM5/21/27 已落地；
 *     COM31 未落地 → COM_MISSING（#222 在飞）。
 *
 * == 变量承载 ==
 *
 *   - LOSEBASE:0/1 → deltabase 负向累加；UP:10 → delta:cid:10；
 *   - SOURCE/TEQUIP/STAIN/ITEM/ABL/PALAM 同名直写（域内属主）；
 *   - 跨域写走门面：EXP:20/22/50/55 → chara(cid).dungeon；EXP:40/41 →
 *     chara(cid).train；TALENT:130 → chara(cid).chara；BASE:4 →
 *     chara(cid).train.触手射精槽；TFLAG:13/15/38/400/402 → game.train；
 *   - CFLAG:16 初吻直写 era.set（门面 `|| 0` 会吞 -1）；
 *   - CSTR:7 癖好无门面字段，era.get(`cstr:${cid}:7`)。
 *
 * 本族无 @GET_ADV_COM 升格规则（COMF_JUMP 无 CASE 100-109/150/208）。
 * JUMP/CALL 全部经分发族，STUBBED_CALLS 为空。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { EXPLV } = require('#/era-utils/exp-level');
const { PALAMLV } = require('#/era-utils/palam-level');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { clothtype_special_text } = require('#/page/page-clothtype');
const {
  COM_MISSING,
  com_able_family,
  com_family,
  equip_com_family,
} = require('#/system/train/com-family');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { chara_callname } = require('#/utils/callname-utils');

const STUBBED_CALLS = [];

const times = (v, m) => Math.floor(v * m);
const idiv = (a, b) => Math.floor(a / b);
const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
const palam = (id, i) => era.get(`palam:${id}:${i}`) || 0;
const add_lose = (cid, i, v) => era.add(`deltabase:${cid}:${i}`, -v);
const add_src = (cid, i, v) => era.add(`source:${cid}:${i}`, v);
const set_src = (cid, i, v) => era.set(`source:${cid}:${i}`, v);
const src = (cid, i) => era.get(`source:${cid}:${i}`) || 0;
const name_of = (table, id) => era.get(`${table}:${id}`) ?? '';
const has_item = (i) =>
  (era.get(`item:${i}`) || 0) > 0 || (era.get('noitem:0') || 0) !== 0;
const zooko_worn = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 11 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
  (era.get('flag:37') || 0) !== 0;
/** B 分支着ぐるみ（无 FLAG:37，源侧 CFLAG:42==11 && (CFLAG:40 & 64)） */
const in_zooko_msg = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 11 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0;
const target_name = () => chara_callname(era_flag.target);
const player_name = () => chara_callname(era_flag.player);
const fetish = (cid) => era.get(`cstr:${cid}:7`) || '';

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** JUMP COM{id}：未落地返回 COM_MISSING（不建存根）。 */
function jump_com(id, { rewrite_selectcom = false } = {}) {
  if (rewrite_selectcom) {
    era_flag.selectcom = id;
  }
  return com_family.call(id, { whenMissing: COM_MISSING });
}

function scale_a_by_half_explv(cid, a) {
  const e = chara(cid).dungeon.触手经验;
  if (e < EXPLV[1]) return times(a, 3.0);
  if (e < idiv(EXPLV[2], 2)) return times(a, 2.5);
  if (e < idiv(EXPLV[3], 2)) return times(a, 2.0);
  if (e < idiv(EXPLV[4], 2)) return times(a, 1.0);
  if (e < idiv(EXPLV[5], 2)) return times(a, 0.8);
  return times(a, 0.6);
}

function scale_a_by_explv(cid, a) {
  const e = chara(cid).dungeon.触手经验;
  if (e < EXPLV[1]) return times(a, 3.0);
  if (e < EXPLV[2]) return times(a, 2.5);
  if (e < EXPLV[3]) return times(a, 2.0);
  if (e < EXPLV[4]) return times(a, 1.0);
  if (e < EXPLV[5]) return times(a, 0.8);
  return times(a, 0.6);
}

function apply_timid_apathetic(cid, a) {
  if (tal(cid, 10)) a = times(a, 2.0); // 胆怯
  if (tal(cid, 22)) a = times(a, 0.6); // 感情淡薄
  return a;
}

/** ABL:16 侍奉精神 → [SOURCE:4 增量, A] */
const SERVE_TIERS = [
  [200, 100],
  [300, 200],
  [400, 400],
  [500, 600],
  [600, 800],
  [800, 1100],
];
const SKILL_TIMES = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];

function apply_serve_and_skill(cid) {
  const s = Math.min(abl(cid, 16), 5);
  add_src(cid, 4, SERVE_TIERS[s][0]);
  const a = SERVE_TIERS[s][1];
  const k = Math.min(abl(cid, 12), 5);
  set_src(cid, 4, times(src(cid, 4), SKILL_TIMES[k]));
  add_src(cid, 13, a);
  add_src(cid, 16, a);
  return a;
}

// ============================================================
// @COM_ABLE100-109 / 150 / 208
// ============================================================

function able100() {
  const target = era_flag.target;
  const player = era_flag.player;
  if (tal(player, 325) === 0) return 0; // 调教者须秘密知识
  if (!has_item(90)) return 0;
  if (
    tequip(target, 90) === 0 &&
    (tequip(target, 11) ||
      tequip(target, 13) ||
      tequip(target, 14) ||
      tequip(target, 15) ||
      tequip(target, 16) ||
      tequip(target, 17) ||
      tequip(target, 19) ||
      tequip(target, 44) ||
      tequip(target, 46) ||
      tequip(target, 49) ||
      tequip(target, 54) ||
      tequip(target, 89))
  ) {
    return 0; // 未开启时装备互斥
  }
  if (tequip(target, 58)) return 0; // 浴室
  if (tequip(target, 59)) return 0; // 新妻
  if (tequip(target, 55)) return 0; // 决斗
  if (tequip(target, 88)) return 0; // 使役
  return 1;
}

function able101() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tal(target, 122)) return 0;
  if (
    (era.get(`cflag:${target}:42`) || 0) === 79 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
    (era.get('flag:37') || 0)
  ) {
    return 0; // 贞操带
  }
  if (tal(target, 273)) return 0; // 贞操封印
  return 1;
}

function able102() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tequip(target, 46)) return 0;
  return 1;
}

function able103() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tal(target, 122)) return 0;
  return 1;
}

function able104() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tequip(target, 16)) return 0;
  return 1;
}

function able105() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tequip(target, 15)) return 0;
  if (tal(target, 122)) return 0;
  return 1;
}

function able106() {
  return tequip(era_flag.target, 90) === 0 ? 0 : 1;
}

function able107() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tequip(target, 13)) return 0;
  return 1;
}

function able108() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tequip(target, 45)) return 0;
  return 1;
}

function able109() {
  const target = era_flag.target;
  if (tequip(target, 90) === 0) return 0;
  if (tal(target, 121) === 0 && tal(target, 122) === 0) return 0;
  return 1;
}

function able150() {
  const target = era_flag.target;
  if (abl(target, 10) + abl(target, 11) < 6) return 0;
  if (tequip(target, 90)) return 0;
  if (tequip(target, 89)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 55)) return 0;
  if (zooko_worn(target)) return 0;
  if (fetish(target) === '') return 0;
  return 1;
}

function able208() {
  const target = era_flag.target;
  const player = era_flag.player;
  if (tequip(target, 55) === 0) return 0;
  if (tal(player, 325) === 0) return 0;
  if (!has_item(90)) return 0;
  if (era_flag.assiplay) return 0;
  return 1;
}

// ============================================================
// @COM100 / 108 / 150 / 208 与 JUMP 101-107/109
// ============================================================

async function com100() {
  const target = era_flag.target;
  era.print('召唤触手'); // :6
  await train_message_b(); // :8 —— 翻转之前

  if (tequip(target, 90)) {
    // :11-30 退出：清触手位
    era.set(`tequip:${target}:90`, 0);
    for (const bit of [11, 13, 14, 15, 16, 17, 44, 46, 98]) {
      era.set(`tequip:${target}:${bit}`, 0);
    }
  } else {
    era.set(`tequip:${target}:90`, 1); // :33
    let a = scale_a_by_half_explv(target, 100); // :35-48
    a = apply_timid_apathetic(target, a); // :50-55
    add_lose(target, 0, a); // :57
    add_lose(target, 1, a * 2); // :58
    era.add(`delta:${target}:10`, a * 20); // :60 UP:10
    add_src(target, 14, a * 5); // :61 SOURCE:14
  }
  era.set('t:0', 0); // :63
  return 1;
}

function com101() {
  return jump_com(11);
}
function com102() {
  return jump_com(13);
}
function com103() {
  return jump_com(14);
}
function com104() {
  return jump_com(15);
}
function com105() {
  return jump_com(16);
}
function com106() {
  return jump_com(44);
}
function com107() {
  return jump_com(46);
}

async function com108() {
  const target = era_flag.target;
  era.print('触手口辱'); // :285
  await train_message_b(); // :287

  add_lose(target, 0, 80); // :289
  add_lose(target, 1, 100); // :290

  // :292-296 初吻：CFLAG:16 直写（门面会吞 -1）
  if (era.get(`cflag:${target}:16`) === -1) {
    era.set(`cflag:${target}:16`, 999);
    game.train.初吻与自我口上 = 1; // TFLAG:13
  }

  apply_serve_and_skill(target); // :298-335

  if (tequip(target, 98)) {
    era.set(`tequip:${target}:98`, 0); // :339
  } else {
    era.set(`tequip:${target}:98`, 1); // :341
    era.set(
      `stain:${target}:0`,
      (era.get(`stain:${target}:0`) || 0) | 2 | 4, // :342-343
    );
  }
  era.set('t:0', 0); // :345
  chara(target).dungeon.口交经验 += 1; // :347 EXP:22
  era.print('口交经验＋１'); // :348
  return 1;
}

function com109() {
  return jump_com(17);
}

async function com150() {
  const target = era_flag.target;
  const player = era_flag.player;
  era.print(`${fetish(target)}调教`); // :8
  await train_message_b(); // :9

  add_lose(target, 0, 5); // :14
  add_lose(target, 1, 50); // :15
  set_src(target, 18, 0); // :18
  set_src(target, 8, 30); // :20
  set_src(target, 12, 100); // :22

  const f_sense = Math.min(abl(target, 4), 5);
  set_src(target, 18, [20, 100, 500, 1200, 2000, 2800][f_sense]); // :25-37
  const f_addict = Math.min(abl(target, 40), 5);
  set_src(
    target,
    18,
    times(src(target, 18), [1.0, 1.1, 1.2, 1.3, 1.5, 1.7][f_addict]),
  ); // :40-52

  if (tal(target, 122) === 0 && tal(player, 122) === 0) {
    era.print(`${name_of('expname', 40)}+5`); // :60-61 PRINTS+PRINTL
    chara(target).train.百合经验 += 5; // :62 EXP:40
  } else if (tal(target, 122) === 1 && tal(player, 122) === 1) {
    era.print(`${name_of('expname', 41)}+5`);
    chara(target).train.断背经验 += 5; // :66 EXP:41
  }
  return 1;
}

async function com208(rand = default_rand) {
  // 延迟读取：主启动图的死斗场族注册（COM200-207）仍仅由 com-colosseum
  // 自己负责；本族只在 COM208 真身里复用其死斗场结算 helper。顶层 require
  // 会让 main-loop 漏装时模块仍被间接拉进来，#274/#282 接线锁与 M1249
  // 一起失明（#288 全树守卫抓到现存这一处，与 #233/#234 同形态）。
  const {
    arena_slave_point,
    com_after_arena,
  } = require('#/system/train/com-colosseum');
  const target = era_flag.target;
  era.print('触手'); // :9
  await train_message_b(); // :11

  add_lose(target, 0, 5); // :16
  add_lose(target, 1, 100); // :17

  const slave_point = arena_slave_point(); // :19
  game.train.死斗场收入 += rand(slave_point); // :20 TFLAG:402 += RAND:RESULT
  const threshold = 10 * (era.get('cflag:0:9') || 0); // :22 字面角色 0
  if (slave_point < threshold) {
    era.print(`${target_name()}被触手弄的手足无措。`); // :23
    await era.waitAnyKey();
    add_lose(target, 0, 10); // :24
    add_lose(target, 1, 200); // :25
  } else {
    era.print(`${target_name()}一瞬间就把触手打倒了。`); // :27
    await era.waitAnyKey();
  }

  game.train.死斗场敌种 = 208; // :30 TFLAG:400
  const after = await com_after_arena(); // :32
  if (after === 0) {
    return 1; // :33-34 胜利跳过菜单
  }

  for (;;) {
    era.print('对哪里进行凌辱？'); // :37
    era.printButton('嘴巴', 0); // :38
    era.println();
    era.printButton('胸部', 1); // :39
    era.println();
    if (tal(target, 122) === 0) {
      era.printButton('私处', 2); // :40-41
      era.println();
    }
    era.printButton('肛门', 3); // :42
    era.println();
    era.printButton('暂时放过', 999); // :43
    era.println();
    const result = await era.input(); // :45

    if (result === 0) {
      return jump_com(31, { rewrite_selectcom: true }); // :47-49
    }
    if (result === 1) {
      return jump_com(5, { rewrite_selectcom: true }); // :50-52
    }
    if (result === 2) {
      if (tal(target, 122)) return 0; // :55-56 男人双保险
      return jump_com(21, { rewrite_selectcom: true }); // :57-58
    }
    if (result === 3) {
      return jump_com(27, { rewrite_selectcom: true }); // :59-61
    }
    if (result === 999) {
      return 1; // :62-67 暂时放过落空后 RETURN 1
    }
  }
}

/**
 * @SYOKUSYU_MILK（COMF100:412-）：触手榨乳触发的母乳体质获得。
 * 调用点在 COMF16（#220）；本票只提供真身，不改 #220 文件。
 * @returns {Promise<number>}
 */
async function syokusyu_milk() {
  const target = era_flag.target;
  if (
    abl(target, 1) >= 5 &&
    !chara(target).chara.母乳体质 &&
    !tal(target, 109) &&
    !tal(target, 116) &&
    !tal(target, 122)
  ) {
    era.print(`在触手的挤奶动作下，${target_name()}流出了母乳。`);
    chara(target).chara.母乳体质 = 1;
    era.print(`${target_name()}获得了【母乳体质】！`);
  }
  return 1;
}

// ============================================================
// @EQUIP_COM100 / 108
// ============================================================

async function equip_com100() {
  const target = era_flag.target;
  const player = era_flag.player;
  era.print('＜触手调教中＞'); // :69

  let a = scale_a_by_explv(target, 100); // :71-84
  a = apply_timid_apathetic(target, a); // :86-92
  add_lose(target, 0, a); // :94
  add_lose(target, 1, a * 2); // :95
  era.add(`delta:${target}:10`, a * 20); // :97
  add_src(target, 8, a * 10); // :98
  add_src(target, 14, a * 5); // :99
  add_src(target, 10, 2000); // :101
  set_src(target, 0, times(src(target, 0), 2.0)); // :103
  set_src(target, 1, times(src(target, 1), 2.0));
  set_src(target, 2, times(src(target, 2), 2.0));
  set_src(target, 17, times(src(target, 17), 2.0));
  set_src(target, 13, times(src(target, 13), 1.8)); // :107

  if ((era.get(`maxbase:${player}:4`) || 0) !== 0) {
    let b = [500, 600, 800, 1000, 1400, 2000][Math.min(abl(target, 12), 5)];
    b = times(b, [0.8, 0.9, 1.0, 1.1, 1.2, 1.3][Math.min(abl(target, 10), 5)]);
    let pmul = 1.0;
    const p = palam(target, 5);
    if (p < PALAMLV[1]) pmul = 1.0;
    else if (p < PALAMLV[2]) pmul = 1.1;
    else if (p < PALAMLV[3]) pmul = 1.2;
    else if (p < PALAMLV[4]) pmul = 1.3;
    else if (p < PALAMLV[5]) pmul = 1.4;
    else pmul = 1.5;
    b = times(b, pmul);
    if (tequip(target, 11)) b = times(b, 1.5);
    if (tequip(target, 13)) b = times(b, 1.5);
    if (tequip(target, 14)) b = times(b, 1.2);
    if (tequip(target, 15)) b = times(b, 1.2);
    if (tequip(target, 16)) b = times(b, 1.3);
    if (tequip(target, 17)) b = times(b, 1.1);
    if (tequip(target, 44)) b = times(b, 1.2);
    if (tequip(target, 46)) b = times(b, 1.3);
    if (tequip(target, 98)) b = times(b, 1.5);

    chara(player).train.触手射精槽 += b; // :188 BASE:PLAYER:4
    const s = chara(player).train.触手射精槽;
    const ejac = era.get(`maxbase:${player}:4`) || 0;
    let e = 0;
    if (s > ejac * 2) e = 2;
    else if (s > ejac) e = 1;

    if (e === 2) {
      chara(target).dungeon.精液经验 += 3; // :203 EXP:20
      era.print('触手大量射精');
      era.print('精液经验＋３');
      era.add('t:0', 1);
      if (tequip(target, 11)) game.train.对象膣内射精 = 2; // :209 TFLAG:38
      chara(player).train.触手射精槽 -= ejac * 2;
      if (chara(player).train.触手射精槽 >= ejac) {
        chara(player).train.触手射精槽 = ejac - 1;
      }
    } else if (e === 1) {
      chara(target).dungeon.精液经验 += 1;
      era.print('触手射精');
      era.print('精液经验＋１');
      era.add('t:0', 1);
      if (tequip(target, 11)) game.train.对象膣内射精 = 1;
      chara(player).train.触手射精槽 -= ejac;
      if (chara(player).train.触手射精槽 >= ejac) {
        chara(player).train.触手射精槽 = ejac - 1;
      }
    }
    game.train.怪物射精或购入金 = e; // :231 TFLAG:15
  }

  if (chara(target).dungeon.触手经验 === 0) {
    chara(target).dungeon.异常经验 += 1; // :236 EXP:50
    era.print('异常经验＋1');
  }
  era.add('t:0', 1); // :240
  const t_final = era.get('t:0') || 0;
  era.print(`触手经验＋${t_final}`); // :241-242 PRINT + PRINTVL
  chara(target).dungeon.触手经验 += t_final; // :243 EXP:55
  era.set('t:0', 0); // :244
  return 1;
}

async function equip_com108() {
  const target = era_flag.target;
  era.print('＜触手口辱中＞'); // :354
  if (tal(target, 47)) {
    add_lose(target, 0, 40); // :356-357 喜欢精液
    add_lose(target, 1, 60);
  } else {
    add_lose(target, 0, 80);
    add_lose(target, 1, 100);
  }
  apply_serve_and_skill(target); // :363-400
  chara(target).dungeon.口交经验 += 1; // :402
  era.print('口交经验＋１');
  era.add('t:0', 1); // :404
  return 1;
}

// ============================================================
// TRAIN_MESSAGE_B 100-109 / 150；A 150 + 100-109/208 无操作
// ============================================================

function zooko_prefix(cid) {
  return `成群的触手通过${clothtype_special_text(cid)}的缝隙伸进去了、`;
}

train_message_b_family.register(100, async () => {
  const target = era_flag.target;
  if (tequip(target, 90)) {
    era.print(`触手放开了${target_name()}的身体、回到原位了…`);
    return;
  }
  let line = `${player_name()}操控着异形的触手、`;
  if (in_zooko_msg(target)) {
    line += clothtype_special_text(target);
  } else {
    line += `将${target_name()}的身体`;
  }
  era.print(`${line}缠上了…`);
});

const B_TOGGLE = {
  101: {
    bit: 11,
    off: (n) => `触手从${n}的性器里拔出来了……`,
    on: (n) => `覆盖着细微突起的触手、钻入了${n}的性器里。`,
  },
  102: {
    bit: 13,
    off: (n) => `触手从${n}的肛门里拔出来了……`,
    on: (n) => `又长又粗的触手、钻入了${n}的肛门里。`,
  },
  103: {
    bit: 14,
    off: (n) => `触手中止了蹂躏${n}的阴蒂……`,
    on: (n) => `末端有着细细分支的触手、蹂躏着${n}的阴蒂。`,
  },
  104: {
    bit: 15,
    off: (n) => `触手离开了${n}的乳头……`,
    on: (n) => `细细而蠢蠢欲动的触手、开始玩弄着${n}的乳头。`,
  },
  105: {
    bit: 16,
    off: (n) => `触手放开了${n}的乳头……`,
    on: (n) => `带吸盘的触手、正在${n}的乳头上用力吸啜着。`,
  },
  106: {
    bit: 44,
    off: (n) => `触手解开了对${n}的束缚……`,
    on: (n) => `无数的触手、把${n}的身体捆起来了。`,
  },
  107: {
    bit: 46,
    off: (n) => `触手拔出来之后、${n}的肛门里飞散出污物……`,
    on: (n) => `极粗的触手、捅进了${n}的尻穴、注入了液体。`,
  },
  108: {
    bit: 98,
    off: (n) => `触手从${n}的嘴里出来了……`,
    on: (n) => `湿润水亮的触手、侵入了${n}的嘴巴里。`,
  },
  109: {
    bit: 17,
    off: (n) => `触手放开${n}的阴茎了……`,
    on: (n) => `带着恶心肉瘤的触手、卷起了${n}的阴茎、一起开始撸着。`,
  },
};

for (const [id, spec] of Object.entries(B_TOGGLE)) {
  const com = Number(id);
  train_message_b_family.register(com, async () => {
    const target = era_flag.target;
    const n = target_name();
    if (tequip(target, spec.bit)) {
      era.print(spec.off(n));
      return;
    }
    let line = '';
    if (in_zooko_msg(target)) {
      line += zooko_prefix(target);
    }
    era.print(`${line}${spec.on(n)}`);
  });
}

train_message_b_family.register(150, async () => {
  const target = era_flag.target;
  const f = fetish(target);
  let tail;
  if (f === '嗅觉') {
    tail = `${target_name()}坚持不懈地熏陶着那个味道、似乎想要将味道烙进灵魂一般…`;
  } else if (f === '腋') {
    tail = `${target_name()}的侧胸不断地爱抚着、并舔起了腋下……`;
  } else {
    tail = `${f}调教开始了…`;
  }
  era.print(`${player_name()}向${tail}`);
  era.print(' '); // :3002 PRINTL 空行
});

train_message_a_family.register(150, async () => {
  const target = era_flag.target;
  const n = target_name();
  const f = fetish(target);
  const smell = f === '嗅觉';
  const addict = abl(target, 40);
  const sense = abl(target, 4);
  let text;
  if (addict >= 5) {
    text = smell
      ? `${n}仅仅闻到了味道感受到了如同绝顶一般的快感…`
      : `${n}被${f}带来的快乐所扰乱、口水不断的从嘴角流了出来…`;
  } else if (addict >= 3) {
    text = smell
      ? `${n}虽然紧皱着眉头、但鼻子不断地嗅着嘴巴也渐渐地合不拢了…`
      : `${n}心醉于${f}调教了、几乎已经成瘾…`;
  } else if (addict >= 1) {
    text = smell
      ? `${n}为了闻上味道鼻子不断发出噌噌的声音…`
      : `${n}记住了${f}带来的快感…`;
  } else if (sense >= 3) {
    text = smell
      ? `${n}虽然很讨厌这样、但是对与味道带来的快感有了明显的感觉…`
      : `${n}虽然对${f}并不感冒、但却有了明显的快感…`;
  } else if (sense === 2) {
    text = smell
      ? `${n}虽然很讨厌这样、但对味道十分的中意…`
      : `${n}虽然对${f}并不感冒、但对那样的感觉十分中意…`;
  } else if (sense === 1) {
    text = smell
      ? `${n}虽然很讨厌这样、但对味道开始有了感觉…`
      : `${n}虽然对${f}调教十分厌恶、但开始有了感觉…`;
  } else {
    text = smell ? `${n}对嗅觉调教十分厌恶…` : `${n}对${f}调教十分厌恶…`;
  }
  era.print(text);
});

const noop_branch = async () => 0;
for (const id of [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 208]) {
  train_message_a_family.register(id, noop_branch);
}
train_message_b_family.register(208, noop_branch);

// ============================================================
// 注册
// ============================================================

com_able_family.register(100, able100);
com_able_family.register(101, able101);
com_able_family.register(102, able102);
com_able_family.register(103, able103);
com_able_family.register(104, able104);
com_able_family.register(105, able105);
com_able_family.register(106, able106);
com_able_family.register(107, able107);
com_able_family.register(108, able108);
com_able_family.register(109, able109);
com_able_family.register(150, able150);
com_able_family.register(208, able208);

com_family.register(100, com100);
com_family.register(101, com101);
com_family.register(102, com102);
com_family.register(103, com103);
com_family.register(104, com104);
com_family.register(105, com105);
com_family.register(106, com106);
com_family.register(107, com107);
com_family.register(108, com108);
com_family.register(109, com109);
com_family.register(150, com150);
com_family.register(208, com208);

equip_com_family.register(100, equip_com100);
equip_com_family.register(108, equip_com108);

module.exports = {
  STUBBED_CALLS,
  able100,
  able101,
  able102,
  able103,
  able104,
  able105,
  able106,
  able107,
  able108,
  able109,
  able150,
  able208,
  com100,
  com101,
  com102,
  com103,
  com104,
  com105,
  com106,
  com107,
  com108,
  com109,
  com150,
  com208,
  equip_com100,
  equip_com108,
  syokusyu_milk,
};
