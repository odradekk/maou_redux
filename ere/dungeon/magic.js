/**
 * @file 战斗魔法（issue #343，阶段 5a L12）。
 *
 * 源: target/ERB/其他/MAGIC.ERB  @MAGIC（:5-46）、@MAGIC_USE（:47-75）、
 *       @MAGIC_SELECT（:76-143）、@SHAMAN_SELECT（:144-214）、
 *       @MAGIC_DAMAGE_CAP（:215-237）、@MAGIC_BONUS_C_TO_M（:238-275）、
 *       @MAGIC_BONUS_M_TO_C（:276-331）、@MAGIC_BONUS_C_TO_C（:332-381）、
 *       @TELEPORT_MAGIC（:382-436）、@SLEEP_MAGIC（:437-557）、
 *       @ENERGY_BOLT_MAGIC（:558-644）、@ENERGY_DRAIN_MAGIC（:645-740）、
 *       @FIREBALL_MAGIC（:741-827）、@HEAL_MAGIC（:828-914）、
 *       @SHIELD_MAGIC（:915-968）、@CURSE_MAGIC（:969-1081）、
 *       @MIND_DRAIN_MAGIC（:1082-1176）、@LV_DRAIN_MAGIC（:1177-1315）
 *
 * 移植说明：
 *   - 原作全局 A/B 与 D:20 改为显式参数和 `move_ctx.d20`；B 在 type 1/2
 *     表示怪物列头，在 type 3/4 表示对手角色 ID。
 *   - Emuera 整数除法向零截断，所有可能非整除的算式统一走 idiv。
 *   - SAVESTR 无引擎通道，沿用战斗模块约定，以 callname 承载名字。
 *   - @SHIELD_MAGIC 没有形参，却声明了私有 TARGET_TYPE；其初值恒 0，三个
 *     分支均不可达。这里保留这个原作缺陷，不把调用者的 target_type 偷渡进去。
 *   - @SLEEP_MAGIC 第 467/545 行读取全局 Y，但两个调用点在施法前都没有为它
 *     建立本次语义；显式状态迁移后按数值默认值 0 保留其输出分支。它不影响数值。
 *   - @TELEPORT_MAGIC 第 431 行把 RAND:100 写进 CFLAG:B:3（公开自慰经验），
 *     虽与注释不符仍按原作保留，并经 train 域门面写入。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { chara_lv_check } = require('#/chara/chara-stats');
const { e_get, e_set } = require('#/dungeon/monster-data');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function idiv(a, b) {
  return Math.trunc(a / b);
}

function show_log() {
  return ((era.get('flag:5') || 0) & 32) !== 0;
}

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

function monster_name(head) {
  return era.get(`itemname:${e_get(head)}`) ?? '';
}

async function print_wait(text) {
  if (show_log()) {
    await era.printAndWait(text);
  }
}

function get_base(cid, index) {
  return era.get(`base:${cid}:${index}`) || 0;
}

function set_base(cid, index, value) {
  era.set(`base:${cid}:${index}`, value);
}

function add_base(cid, index, value) {
  set_base(cid, index, get_base(cid, index) + value);
}

function get_cflag(cid, index) {
  return era.get(`cflag:${cid}:${index}`) || 0;
}

function get_exp(cid) {
  return era.get(`exp:${cid}:80`) || 0;
}

function set_exp(cid, value) {
  era.set(`exp:${cid}:80`, value);
}

function add_exp(cid, value) {
  set_exp(cid, get_exp(cid) + value);
}

function talent(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

/** @MAGIC_DAMAGE_CAP：等级差调整封顶，最低效果为 1。 */
function magic_damage_cap(chara_lv, enemy_lv, damage, dmg_cap) {
  let cap_bonus = chara_lv - enemy_lv;
  if (cap_bonus <= -100) {
    cap_bonus = -99;
  }
  dmg_cap = idiv(dmg_cap * (100 + cap_bonus), 100);
  if (damage > dmg_cap) {
    damage = dmg_cap;
  }
  return damage <= 0 ? 1 : damage;
}

/** @MAGIC_BONUS_C_TO_M：角色对怪物的种族、畏怖与 Boss 补正。 */
function magic_bonus_c_to_m(cid, damage, monster_head) {
  if (talent(cid, 314) === 1 || talent(cid, 314) === 7) {
    damage += idiv(damage, 2);
  }
  if (talent(cid, 244)) {
    damage += idiv(damage, 3);
  }
  if (talent(cid, 260)) {
    damage += idiv(damage, 5);
  }

  if (chara(cid).dungeon.凌辱畏怖记忆_怪物 === e_get(monster_head)) {
    const fear = chara(cid).dungeon.凌辱畏怖计数;
    if (fear > 5) {
      era.print('凌辱的记忆历历在目……无法反抗！');
      damage = idiv(damage, 10);
    } else if (fear >= 0) {
      era.print('凌辱的记忆历历在目……');
      damage = idiv(damage * (6 - fear), 10);
    }
  }

  if (e_get(monster_head + 8) === 1) {
    damage = idiv(damage, 10);
    if (show_log()) {
      era.print('BOSS成功抵抗了魔法攻击！');
    }
  }
  return damage;
}

/** @MAGIC_BONUS_M_TO_C：怪物对角色的 Boss、耐性、减益与畏怖补正。 */
function magic_bonus_m_to_c(cid, damage, monster_head) {
  if (e_get(monster_head + 8) === 1) {
    damage += idiv(damage, 2);
    if (show_log()) {
      era.print('BOSS的强力魔法！');
    }
  }
  if (cid < 0) {
    return damage;
  }
  if (talent(cid, 257)) {
    damage -= idiv(damage, 3);
    if (show_log()) {
      era.print('魔法耐性！　');
    }
  }
  if (talent(cid, 253)) {
    damage -= idiv(damage, 5);
  }
  let debuff = get_cflag(cid, 682);
  if (debuff > 50) {
    damage += idiv(damage, 2);
    debuff -= idiv(debuff, 10) + 1;
    era.set(`cflag:${cid}:682`, debuff);
  } else if (debuff > 0) {
    damage = idiv(damage * (100 + debuff), 100);
    debuff -= idiv(debuff, 10) + 1;
    era.set(`cflag:${cid}:682`, debuff);
  }
  if (chara(cid).dungeon.凌辱畏怖记忆_怪物 === e_get(monster_head)) {
    const fear = chara(cid).dungeon.凌辱畏怖计数;
    if (fear > 5) {
      era.print('凌辱的记忆历历在目……无法反抗！');
      damage *= 2;
    } else if (fear >= 0) {
      era.print('凌辱的记忆历历在目……');
      damage = idiv(damage * (6 + fear), 5);
    }
  }
  return damage;
}

/** @MAGIC_BONUS_C_TO_C：角色对角色的施法者种族、目标耐性与施法者减益补正。 */
function magic_bonus_c_to_c(cid, damage, defender) {
  if (talent(cid, 314) === 1 || talent(cid, 314) === 7) {
    damage += idiv(damage, 2);
  }
  if (talent(cid, 244)) {
    damage += idiv(damage, 3);
  }
  if (talent(cid, 260)) {
    damage += idiv(damage, 5);
  }
  if (defender >= 0) {
    if (talent(defender, 257)) {
      damage -= idiv(damage, 3);
      if (show_log()) {
        era.print('魔法耐性！　');
      }
    }
    // 原作第 360 行检查的是施法者 CHARA，而非 DEF_CHARA。
    if (talent(cid, 253)) {
      damage -= idiv(damage, 5);
    }
    let debuff = get_cflag(cid, 682);
    if (debuff > 50) {
      damage += idiv(damage, 2);
      debuff -= idiv(debuff, 10) + 1;
      era.set(`cflag:${cid}:682`, debuff);
    } else if (debuff > 0) {
      damage = idiv(damage * (100 + debuff), 100);
      debuff -= idiv(debuff, 10) + 1;
      era.set(`cflag:${cid}:682`, debuff);
    }
  }
  return damage;
}

async function apply_magic_scatter(target_type, a, b) {
  const hp_damage = Math.min(get_cflag(a, 9) * 10 + 200, 600);
  const wp_damage = Math.min(get_cflag(a, 9) * 20 + 100, 600);
  const caster = target_type === 3 ? b : a;
  if (
    (target_type === 1 || target_type === 3 || target_type === 4) &&
    (get_cflag(caster, 503) & 2) !== 0
  ) {
    await print_wait('*魔力暴走了！*');
    add_base(caster, 0, -hp_damage);
    add_base(caster, 1, -wp_damage);
  }
}

/** @MAGIC_SELECT：选择普通魔法。 */
async function magic_select(target_type, a, b, rand = default_rand) {
  if (
    ((target_type === 1 || target_type === 4) && !talent(a, 241)) ||
    (target_type === 3 && !talent(b, 241))
  ) {
    return 0;
  }
  await apply_magic_scatter(target_type, a, b);
  if (target_type === 2) {
    return e_get(b + 6);
  }
  let magic_lv = 0;
  if (target_type === 1 || target_type === 4) {
    magic_lv = get_cflag(a, 9);
  } else if (target_type === 3) {
    magic_lv = get_cflag(b, 9);
  }
  magic_lv = Math.min(idiv(magic_lv, 3) + 2, 7);
  magic_lv = rand(magic_lv);
  return [0, 3, 2, 1, 4, 5, 5][magic_lv];
}

/** @SHAMAN_SELECT：选择咒术。 */
async function shaman_select(target_type, a, b, rand = default_rand) {
  if (
    ((target_type === 1 || target_type === 4) && !talent(a, 250)) ||
    (target_type === 3 && !talent(b, 250))
  ) {
    return 0;
  }
  await apply_magic_scatter(target_type, a, b);
  if (target_type === 2) {
    return 0;
  }
  let magic_lv = 0;
  if (target_type === 1 || target_type === 4) {
    magic_lv = get_cflag(a, 9);
  } else if (target_type === 3) {
    magic_lv = get_cflag(b, 9);
  }
  magic_lv = Math.min(idiv(magic_lv, 3) + 2, 7);
  magic_lv = rand(magic_lv);
  return [0, 3, 7, 1, 8, 9, 9][magic_lv];
}

/** @TELEPORT_MAGIC：重伤时脱离战斗。 */
async function teleport_magic(
  target_type,
  a,
  b,
  rand = default_rand,
  move_ctx = {},
) {
  if (target_type === 1 || target_type === 4) {
    let serious = get_base(a, 0) <= 600 ? 1 : 0;
    for (const index of [531, 532, 533]) {
      const member = get_cflag(a, index);
      if (member > 0 && get_base(member, 0) <= 600) {
        serious += 1;
      }
    }
    if (serious <= 0) {
      return 0;
    }
    await print_wait(`${name_of(a)}在危机关头使出传送术脱离了！`);
    add_base(a, 1, -10);
    move_ctx.d20 = rand(100);
    return 999;
  }
  if (target_type === 2) {
    await print_wait(`怪物用传送把${name_of(a)}送走了。`);
    move_ctx.d20 = rand(100);
    era.set(`cflag:${a}:509`, 1); // CFLAG:509 = 迷惑状态（dungeon 域）
    return 999;
  }
  if (target_type === 3) {
    if (get_base(b, 0) > 600) {
      return 0;
    }
    await print_wait(`${name_of(b)}在危机关头使出传送术脱离了！`);
    add_base(b, 1, -10);
    chara(b).train.公开自慰经验 = rand(100); // CFLAG:3，原作第 431 行
    return 999;
  }
  return 0;
}

/** @SLEEP_MAGIC：睡眠削减怪物攻击或角色攻击力。 */
async function sleep_magic(target_type, a, b, rand = default_rand) {
  let damage;
  if (target_type === 1) {
    await print_wait(`${name_of(a)}咏唱了睡眠咒语！`);
    add_base(a, 1, -30);
    damage = magic_bonus_c_to_m(a, get_cflag(a, 9), b);
    damage -= idiv(e_get(b + 1), 5);
    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 300);
    const value = e_get(b + 2) - rand(damage);
    e_set(b + 2, Math.max(0, value));
    if (value < 0) {
      await print_wait('怪物完全睡着了…');
    } else {
      await print_wait('咒语的效果消失了'); // 原作 Y 默认 0，文件头
    }
    return 0;
  }
  if (target_type === 2) {
    await print_wait(`${monster_name(b)}咏唱了睡眠咒语！`);
    damage = magic_bonus_m_to_c(a, e_get(b + 1) + get_cflag(0, 9), b);
    damage = magic_damage_cap(e_get(b + 1), get_cflag(a, 9), damage, 300);
    const value = chara(a).dungeon.攻击力 - rand(damage);
    chara(a).dungeon.攻击力 = Math.max(0, value);
    await print_wait(value < 0 ? '勇者完全睡着了…' : '勇者还在沉睡…');
    return 0;
  }
  if (target_type !== 3 && target_type !== 4) {
    return 0;
  }
  const caster = target_type === 3 ? b : a;
  const defender = target_type === 3 ? a : b;
  await print_wait(`${name_of(caster)}咏唱了睡眠咒语！！`);
  add_base(caster, 1, -30);
  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9), defender);
  damage = magic_damage_cap(
    get_cflag(caster, 9),
    get_cflag(defender, 9),
    damage,
    300,
  );
  const value = chara(defender).dungeon.攻击力 - rand(damage);
  chara(defender).dungeon.攻击力 = Math.max(0, value);
  if (value < 0) {
    await print_wait(target_type === 3 ? '奴隶完全睡着了…' : '勇者完全睡着了…');
  } else {
    await print_wait(target_type === 3 ? '奴隶还在沉睡…' : '咒语效果消失了');
  }
  return 0;
}

function kill_monsters(a, b, damage) {
  const kill_mons = idiv(damage, e_get(b + 3));
  if (kill_mons > 0) {
    const killed = Math.min(kill_mons, e_get(b + 99));
    e_set(b + 99, e_get(b + 99) - killed);
    add_exp(a, e_get(b + 1) * killed);
    return killed;
  }
  return 0;
}

/** @ENERGY_BOLT_MAGIC：魔法箭。 */
async function energy_bolt_magic(target_type, a, b) {
  let damage;
  if (target_type === 1) {
    await print_wait(`${name_of(a)}咏唱了魔法箭！`);
    add_base(a, 1, -15);
    damage = magic_bonus_c_to_m(a, get_cflag(a, 9) * 5, b);
    damage -= idiv(e_get(b + 1), 20);
    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 600);
    const killed = idiv(damage, e_get(b + 3));
    if (killed > 0) {
      // 原作第 585-590 行把 DAMAGE（而非 KILL_MONS）压到怪物数，随后仍按
      // 未压缩的 KILL_MONS 扣数量和加经验；伤害过量时怪物数因此可以变成负数。
      if (damage > e_get(b + 99)) {
        damage = e_get(b + 99);
      }
      e_set(b + 99, e_get(b + 99) - killed);
      add_exp(a, e_get(b + 1) * killed);
    }
    await print_wait(
      killed <= 0 ? '魔法箭好像完全没有效果' : `魔法箭贯穿了${killed}只怪物！`,
    );
    return 0;
  }
  if (target_type === 2) {
    await print_wait(`${monster_name(b)}咏唱了魔法箭！`);
    damage = magic_bonus_m_to_c(a, (e_get(b + 1) + get_cflag(0, 9)) * 5, b);
    add_base(a, 0, -damage);
    await print_wait(`魔法箭造成了${damage}伤害！`);
    return 0;
  }
  if (target_type !== 3 && target_type !== 4) {
    return 0;
  }
  const caster = target_type === 3 ? b : a;
  const defender = target_type === 3 ? a : b;
  await print_wait(`${name_of(caster)}咏唱了魔法箭！`);
  add_base(caster, 1, -15);
  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9) * 5, defender);
  damage = magic_damage_cap(
    get_cflag(caster, 9),
    get_cflag(defender, 9),
    damage,
    600,
  );
  add_base(defender, 0, -damage);
  await print_wait(`魔法箭造成了${damage}伤害！`);
  return 0;
}

/** @ENERGY_DRAIN_MAGIC：吸取气力并按原作回复体力。 */
async function energy_drain_magic(target_type, a, b) {
  let damage;
  if (target_type === 1) {
    await print_wait(`${name_of(a)}咏唱了魔法吸收！`);
    add_base(a, 1, -30);
    damage = magic_bonus_c_to_m(a, get_cflag(a, 9) * 5, b);
    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 500);
    const killed = kill_monsters(a, b, damage);
    await print_wait(
      killed <= 0
        ? '魔法吸收好像完全没有效果'
        : `魔法吸取贯穿了${killed}只怪物！`,
    );
    add_base(a, 0, damage);
    await print_wait(`恢复了HP${damage}点！`);
    return 0;
  }
  if (target_type === 2) {
    await print_wait(`${monster_name(b)}咏唱了魔法吸取！`);
    damage = magic_bonus_m_to_c(a, (e_get(b + 1) + get_cflag(0, 9)) * 5, b);
    damage = magic_damage_cap(e_get(b + 1), get_cflag(a, 9), damage, 500);
    add_base(a, 1, -damage);
    await print_wait(`魔法吸取了${damage}气力！`);
    return 0;
  }
  if (target_type !== 3 && target_type !== 4) {
    return 0;
  }
  const caster = target_type === 3 ? b : a;
  const defender = target_type === 3 ? a : b;
  await print_wait(`${name_of(caster)}咏唱了魔法吸取！`);
  add_base(caster, 1, -30);
  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9) * 5, defender);
  damage = magic_damage_cap(
    get_cflag(caster, 9),
    get_cflag(defender, 9),
    damage,
    500,
  );
  add_base(defender, 1, -damage);
  add_base(caster, 0, damage);
  await print_wait(`魔法吸取了${damage}气力！`);
  await print_wait(`恢复了HP${damage}点！`);
  return 0;
}

/** @FIREBALL_MAGIC：火球术。 */
async function fireball_magic(target_type, a, b) {
  let damage;
  if (target_type === 1) {
    await print_wait(`${name_of(a)}咏唱了火球术！`);
    add_base(a, 1, -40);
    damage = idiv(get_cflag(a, 9) * e_get(b + 99), 2);
    damage = magic_bonus_c_to_m(a, damage, b);
    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 800);
    const killed = kill_monsters(a, b, damage);
    await print_wait(
      killed <= 0 ? '火球术好像完全没有效果' : `火球术烧尽了${killed}只怪物！`,
    );
    return 0;
  }
  if (target_type === 2) {
    await print_wait(`${monster_name(b)}咏唱了火球术！`);
    damage = magic_bonus_m_to_c(a, (e_get(b + 1) + get_cflag(0, 9)) * 10, b);
    damage = magic_damage_cap(e_get(b + 1), get_cflag(a, 9), damage, 800);
    add_base(a, 0, -damage);
    await print_wait(`火球术对勇者造成了${damage}伤害！`);
    return 0;
  }
  if (target_type !== 3 && target_type !== 4) {
    return 0;
  }
  const caster = target_type === 3 ? b : a;
  const defender = target_type === 3 ? a : b;
  await print_wait(`${name_of(caster)}咏唱了火球术！`);
  add_base(caster, 1, -40);
  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9) * 10, defender);
  damage = magic_damage_cap(
    get_cflag(caster, 9),
    get_cflag(defender, 9),
    damage,
    800,
  );
  add_base(defender, 0, -damage);
  await print_wait(
    `火球术对${target_type === 3 ? '奴隶' : '勇者'}造成了${damage}伤害！`,
  );
  return 0;
}

/** @HEAL_MAGIC：治疗角色队伍或增加怪物数量。 */
async function heal_magic(target_type, a, b) {
  let damage;
  if (target_type === 1 || target_type === 4) {
    let patient = 0;
    const candidates = [
      a,
      get_cflag(a, 531),
      get_cflag(a, 532),
      get_cflag(a, 533),
    ];
    for (const cid of candidates) {
      if (
        cid > 0 &&
        idiv(get_base(cid, 0) * 100, era.get(`maxbase:${cid}:0`) || 1) < 60
      ) {
        patient = cid;
      }
    }
    if (patient <= 0) {
      return 0;
    }
    await print_wait(
      `${name_of(a)}咏唱了治疗术！${patient === a ? '自己' : name_of(patient)}得到了治疗！`,
    );
    add_base(a, 1, -5);
    damage = magic_bonus_c_to_c(a, get_cflag(a, 9) * 5, -1);
    await print_wait(`${name_of(patient)}的HP恢复了${damage}点！`);
    add_base(patient, 0, damage);
    return 0;
  }
  if (target_type === 2) {
    await print_wait(`${monster_name(b)}咏唱了治疗术！`);
    damage = magic_bonus_m_to_c(-1, e_get(b + 1) + get_cflag(0, 9), b);
    e_set(b + 3, e_get(b + 3) + 1 + idiv(damage, 60));
    return 0;
  }
  if (target_type !== 3) {
    return 0;
  }
  // 原作第 895 行的条件方向如此：低于六成反而直接返回。
  if (idiv(get_base(b, 0) * 100, era.get(`maxbase:${b}:0`) || 1) < 60) {
    return 0;
  }
  await print_wait(`${name_of(b)}咏唱了治疗术！`);
  add_base(b, 1, -5);
  damage = magic_bonus_c_to_c(b, get_cflag(b, 9) * 5, -1);
  await print_wait(`${name_of(b)}的HP恢复了${damage}点！`);
  add_base(b, 0, damage);
  return 0;
}

/** @SHIELD_MAGIC：原作无参函数的私有 TARGET_TYPE 恒 0，故无效果。 */
async function shield_magic() {
  return 0;
}

/** @CURSE_MAGIC：诅咒削减怪物防御或角色防御力。 */
async function curse_magic(target_type, a, b, rand = default_rand) {
  let damage;
  if (target_type === 1) {
    await print_wait(`${name_of(a)}咏唱了诅咒术！`);
    add_base(a, 1, -30);
    damage = magic_bonus_c_to_m(a, get_cflag(a, 9), b);
    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 200);
    const value = e_get(b + 3) - idiv(rand(damage), 2);
    e_set(b + 3, value);
    if (value <= 0) {
      await print_wait('怪物完全被诅咒了…');
      e_set(b, 1); // 原作 E:C，调用点的 C 与 B 同为怪物列头
    } else {
      await print_wait('怪物仍然被诅咒着…');
    }
    return 0;
  }
  if (target_type === 2) {
    // 原作第 1003 行无 FLAG:5 守卫。
    await era.printAndWait(`${monster_name(b)}咏唱了诅咒术！`);
    damage = magic_bonus_m_to_c(a, e_get(b + 1) + get_cflag(0, 9), b);
    damage = magic_damage_cap(e_get(b + 1), get_cflag(a, 9), damage, 200);
    const value = chara(a).dungeon.防御力 - idiv(rand(damage), 2);
    chara(a).dungeon.防御力 = Math.max(0, value);
    await print_wait(value < 0 ? '勇者完全被诅咒了…' : '勇者仍然被诅咒着…');
    return 0;
  }
  if (target_type !== 3 && target_type !== 4) {
    return 0;
  }
  const caster = target_type === 3 ? b : a;
  const defender = target_type === 3 ? a : b;
  await print_wait(`${name_of(caster)}咏唱了诅咒术！`);
  add_base(caster, 1, -30);
  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9), defender);
  damage = magic_damage_cap(
    get_cflag(caster, 9),
    get_cflag(defender, 9),
    damage,
    200,
  );
  const value = chara(defender).dungeon.防御力 - idiv(rand(damage), 2);
  chara(defender).dungeon.防御力 = Math.max(0, value);
  await print_wait(
    value < 0
      ? `${target_type === 3 ? '奴隶' : '勇者'}完全被诅咒了…`
      : `${target_type === 3 ? '奴隶' : '勇者'}仍然被诅咒着…`,
  );
  return 0;
}

/** @MIND_DRAIN_MAGIC：吸取气力并回复施法者气力。 */
async function mind_drain_magic(target_type, a, b) {
  let damage;
  if (target_type === 1) {
    await print_wait(`${name_of(a)}咏唱了精神吸收！`);
    add_base(a, 1, -30);
    damage = magic_bonus_c_to_m(a, get_cflag(a, 9) * 5, b);
    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 500);
    const killed = kill_monsters(a, b, damage);
    await print_wait(
      killed <= 0
        ? '精神吸收好像完全没有效果'
        : `精神吸收贯穿了${killed}只怪物！`,
    );
    add_base(a, 1, damage);
    await print_wait(`气力恢复${damage}点！`);
    return 0;
  }
  if (target_type === 2) {
    await print_wait(`${monster_name(b)}咏唱了精神吸收！`);
    damage = magic_bonus_m_to_c(a, (e_get(b + 1) + get_cflag(0, 9)) * 5, b);
    damage = magic_damage_cap(e_get(b + 1), get_cflag(a, 9), damage, 500);
    add_base(a, 1, -damage);
    await print_wait(`精神吸收造成了${damage}点气力伤害！`);
    return 0;
  }
  if (target_type !== 3 && target_type !== 4) {
    return 0;
  }
  const caster = target_type === 3 ? b : a;
  const defender = target_type === 3 ? a : b;
  await print_wait(
    `${name_of(caster)}咏唱了${target_type === 4 ? '魔法吸取' : '精神吸收'}！`,
  );
  add_base(caster, 1, -30);
  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9) * 5, defender);
  damage = magic_damage_cap(
    get_cflag(caster, 9),
    get_cflag(defender, 9),
    damage,
    500,
  );
  add_base(defender, 1, -damage);
  add_base(caster, 1, damage);
  await print_wait(`精神吸收了${damage}点气力！`);
  await print_wait(`气力恢复${damage}点！`);
  return 0;
}

/** @LV_DRAIN_MAGIC：吸取经验；角色经验为负时同步等级与四维。 */
async function lv_drain_magic(target_type, a, b) {
  let damage;
  if (target_type === 1) {
    await print_wait(`${name_of(a)}咏唱了经验吸取！`);
    add_base(a, 1, -50);
    damage = magic_bonus_c_to_m(a, get_cflag(a, 9) * 10, b);
    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 400);
    const killed = kill_monsters(a, b, damage);
    await print_wait(
      killed <= 0 ? '但好像完全没有效果。' : `经验吸取贯穿了${killed}只怪物！`,
    );
    add_exp(a, idiv(damage, 20));
    await print_wait(`${name_of(a)}得到了${idiv(damage, 20)}点经验！`);
    return 0;
  }
  if (target_type === 2) {
    await print_wait(`${monster_name(b)}咏唱了经验吸取！`);
    // 原作第 1217 行确实调用 C_TO_M，而非 M_TO_C。
    damage = magic_bonus_c_to_m(a, e_get(b + 1) + get_cflag(0, 9), b);
    damage = magic_damage_cap(e_get(b + 1), get_cflag(a, 9), damage, 400);
    await apply_level_drain(a, damage);
    add_exp(0, idiv(damage, 2));
    await print_wait(`你得到了${idiv(damage, 2)}点经验值！`);
    return 0;
  }
  if (target_type !== 3 && target_type !== 4) {
    return 0;
  }
  const caster = target_type === 3 ? b : a;
  const defender = target_type === 3 ? a : b;
  await print_wait(`${name_of(caster)}咏唱了经验吸收！`);
  add_base(caster, 1, -50);
  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9), defender);
  damage = magic_damage_cap(
    get_cflag(caster, 9),
    get_cflag(defender, 9),
    damage,
    400,
  );
  if (target_type === 3) {
    await apply_level_drain(defender, damage);
  } else {
    add_exp(defender, -damage);
    add_base(defender, 0, -damage * 10);
    await chara_lv_check(defender); // 第 1296-1306 行的手动降级整段在原作被注释
  }
  add_exp(caster, idiv(damage, 2));
  await print_wait(`${name_of(caster)}得到${idiv(damage, 2)}经验值！`);
  return 0;
}

async function apply_level_drain(cid, damage) {
  add_exp(cid, -damage);
  add_base(cid, 0, -damage * 10);
  await print_wait(
    `吸取${name_of(cid)}${damage}点经验值并造成了${damage * 10}点HP的伤害！`,
  );
  if (get_exp(cid) < 0) {
    const view = chara(cid);
    view.chara.等级 -= 1;
    set_exp(cid, view.chara.等级 * 10);
    view.dungeon.攻击力 -= 1;
    view.dungeon.防御力 -= 1;
    view.chara.基础攻击 -= 1;
    view.chara.基础防御 -= 1;
    await print_wait(`${name_of(cid)}的等级下降了1级。`);
  }
  await chara_lv_check(cid);
}

/** @MAGIC_USE：按选择结果分发法术。 */
async function magic_use(
  spell,
  target_type,
  a,
  b,
  rand = default_rand,
  move_ctx = {},
) {
  const calls = {
    1: () => teleport_magic(target_type, a, b, rand, move_ctx),
    2: () => sleep_magic(target_type, a, b, rand),
    3: () => energy_bolt_magic(target_type, a, b),
    4: () => energy_drain_magic(target_type, a, b),
    5: () => fireball_magic(target_type, a, b),
    6: () => heal_magic(target_type, a, b),
    7: () => curse_magic(target_type, a, b, rand),
    8: () => mind_drain_magic(target_type, a, b),
    9: () => lv_drain_magic(target_type, a, b),
  };
  return calls[spell] ? calls[spell]() : 0;
}

/** @MAGIC：普通魔法、咒术、法术三段调度。 */
async function magic(
  target_type = 0,
  a = 0,
  b = 0,
  rand = default_rand,
  move_ctx = {},
) {
  if (target_type === 1 && e_get(b + 3) === 0) {
    return 999;
  }
  let result = await magic_use(
    await magic_select(target_type, a, b, rand),
    target_type,
    a,
    b,
    rand,
    move_ctx,
  );
  if (result === 999) {
    return 999;
  }
  result = await magic_use(
    await shaman_select(target_type, a, b, rand),
    target_type,
    a,
    b,
    rand,
    move_ctx,
  );
  if (result === 999) {
    return 999;
  }
  if (
    ((target_type === 1 || target_type === 4) && !talent(a, 242)) ||
    target_type === 2 ||
    (target_type === 3 && !talent(b, 242))
  ) {
    return 0;
  }
  if (rand(2) === 0) {
    return shield_magic();
  }
  return heal_magic(target_type, a, b);
}

module.exports = {
  magic,
  magic_use,
  magic_select,
  shaman_select,
  magic_damage_cap,
  magic_bonus_c_to_m,
  magic_bonus_m_to_c,
  magic_bonus_c_to_c,
  teleport_magic,
  sleep_magic,
  energy_bolt_magic,
  energy_drain_magic,
  fireball_magic,
  heal_magic,
  shield_magic,
  curse_magic,
  mind_drain_magic,
  lv_drain_magic,
};
