/**
 * @file 奉仕系指令族（30-38）：@COM / @COM_ABLE / TRAIN_MESSAGE / GET_ADV_COM。
 *
 * 源: target/ERB/調教相關/COMF30_手淫.ERB 至 COMF38_足コキ.ERB
 *     target/ERB/調教相關/COMABLE.ERB @COM_ABLE30-38
 *     target/ERB/調教相關/COMF_JUMP.ERB CASE 30-34
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB / _B.ERB
 *     @COM30 的 JUMPFORM 头部 :1-11；@COM34 的 FLAG:71 清零时机 :12-17。
 *
 * 本文件的高级跳转遵从 COMF 头部的 JUMPFORM：目标尚未移植时返回
 * COM_MISSING，由训练循环废弃本回合；绝不回退执行原基础指令。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { EXPLV } = require('#/era-utils/exp-level');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { e_get, monster_name } = require('#/dungeon/monster-data');
const { chara_callname } = require('#/utils/callname-utils');
const { com_order } = require('#/system/train/com-order');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const {
  COM_MISSING,
  com_able_family,
  com_family,
} = require('#/system/train/com-family');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const {
  com_after_anal_sex,
  com_ejac_player_analsex,
} = require('#/system/train/com-analsex');
const { confirm_condom } = require('#/system/train/com-condom');
const {
  com_after_vagina_sex,
  com_ejac_player_milk,
  com_ejac_player_sex,
  confirm_lost_virgin,
} = require('#/system/train/com-vaginasex');

/** 本文件没有自行存根化的原作调用；口上由 source-check 的既有分发承载。 */
const STUBBED_CALLS = [];

/**
 * Emuera strict TIMES：本游戏关闭「向 Eramaker 对齐」，须用十进制定点相乘，
 * 每一步朝零截断，不能让 JS 二进制浮点把 175 × 1.40 算成 244。
 */
function times(value_to_multiply, rate) {
  const text = String(rate);
  const negative = text.startsWith('-');
  const unsigned = /^[+-]/.test(text) ? text.slice(1) : text;
  const [whole, fraction = ''] = unsigned.split('.');
  const numerator = BigInt(`${whole}${fraction}`) * (negative ? -1n : 1n);
  const denominator = 10n ** BigInt(fraction.length);
  return Number((BigInt(value_to_multiply) * numerator) / denominator);
}
const idiv = (v, divisor) => Math.trunc(v / divisor);
const name_of = (table, id) => era.get(`${table}:${id}`) ?? '';
const value = (table, cid, id) => era.get(`${table}:${cid}:${id}`) || 0;
const target_value = (table, id) => value(table, era_flag.target, id);
const player_value = (table, id) => value(table, era_flag.player, id);
const target_talent = (id) => target_value('talent', id);
const player_talent = (id) => player_value('talent', id);
const target_abl = (id) => Math.floor(target_value('abl', id));
const player_abl = (id) => Math.floor(player_value('abl', id));
const target_exp = (id) => target_value('exp', id);
const target_palam = (id) => target_value('palam', id);
const target_tequip = (id) => target_value('tequip', id);
const lose = (cid, id, amount) => era.add(`deltabase:${cid}:${id}`, -amount);

function source_helpers(cid) {
  return {
    get: (id) => era.get(`source:${cid}:${id}`) || 0,
    set: (id, amount) => era.set(`source:${cid}:${id}`, amount),
    add: (id, amount) => era.add(`source:${cid}:${id}`, amount),
  };
}

function stain_exchange(cid_a, id_a, cid_b, id_b) {
  const merged =
    (era.get(`stain:${cid_a}:${id_a}`) || 0) |
    (era.get(`stain:${cid_b}:${id_b}`) || 0);
  era.set(`stain:${cid_a}:${id_a}`, merged);
  era.set(`stain:${cid_b}:${id_b}`, merged);
}

function set_standard_stain(cid) {
  era.set(`stain:${cid}:0`, 0);
  era.set(`stain:${cid}:1`, 0);
  era.set(`stain:${cid}:2`, 2);
  era.set(`stain:${cid}:3`, 1);
  era.set(`stain:${cid}:4`, 8);
}

function level(value_to_check) {
  if (value_to_check < PALAMLV[1]) return 0;
  if (value_to_check < PALAMLV[2]) return 1;
  if (value_to_check < PALAMLV[3]) return 2;
  if (value_to_check < PALAMLV[4]) return 3;
  if (value_to_check < PALAMLV[5]) return 4;
  return 5;
}

function exp_level(value_to_check) {
  for (let i = 1; i < EXPLV.length; i += 1) {
    if (value_to_check < EXPLV[i]) return i - 1;
  }
  return EXPLV.length - 1;
}

function rate_by_abl(cid, id, rates) {
  return rates[Math.min(Math.floor(value('abl', cid, id)), rates.length - 1)];
}

function dirty_penalty({
  divider = 1,
  force_seven = false,
  force_seven_when = () => false,
  player_stain = 2,
}) {
  let y = 0;
  const player = era_flag.player;
  const stain = (id) => era.get(`stain:${player}:${id}`) || 0;
  if (stain(player_stain) & 1) y += 1;
  if (stain(player_stain) & 4) y += 3;
  if (stain(player_stain) & 8) y += 7;
  if (stain(player_stain) & 16) y += 1;
  if (stain(4) & 32) y += 3;
  if ((force_seven && target_tequip(89)) || force_seven_when()) y = 7;
  if (target_talent(61)) y = idiv(y, 3);
  if (target_talent(62)) y *= 2;
  return idiv(y, divider);
}

function append_term(parts, state, label, amount, shown_amount) {
  const displayed = shown_amount ?? amount;
  if (state.s) parts.push(amount >= 0 ? ' + ' : ' - ');
  else if (amount < 0) parts.push(' - ');
  parts.push(`${label}(${Math.abs(displayed)})`);
  state.a += amount;
  state.s = 1;
}

function append_service_judge(parts, state, options) {
  const {
    lust = 1,
    service = 4,
    poison = 0,
    pleasure_mark = 0,
    vagina = 0,
    anal = 0,
    maso = 0,
    extra = [],
  } = options;
  const target = era_flag.target;
  const add_abl = (id, multiplier) => {
    const v = target_abl(id);
    if (v)
      append_term(
        parts,
        state,
        `${name_of('ablname', id)}LV${v}`,
        v * multiplier,
      );
  };
  const add_mark = (id, multiplier) => {
    const v = value('mark', target, id);
    if (v)
      append_term(
        parts,
        state,
        `${name_of('markname', id)}LV${v}`,
        v * multiplier,
      );
  };
  add_abl(11, lust);
  if (vagina) add_abl(2, vagina);
  if (anal) add_abl(3, anal);
  add_abl(16, service);
  if (maso) add_abl(20, maso);
  if (poison) add_abl(32, poison);
  if (pleasure_mark) add_mark(1, pleasure_mark);
  for (const [kind, id, multiplier] of extra) {
    const v =
      kind === 'abl'
        ? target_abl(id)
        : kind === 'mark'
          ? value('mark', target, id)
          : level(target_palam(id));
    if (v)
      append_term(
        parts,
        state,
        `${name_of(`${kind}name`, id)}${kind === 'palam' ? 'LV' : 'LV'}${v}`,
        v * multiplier,
      );
  }
}

function append_dirty_penalty(parts, state, options) {
  const y = dirty_penalty(options);
  if (y) {
    append_term(
      parts,
      state,
      target_talent(61)
        ? '脏、不怕污臭'
        : target_talent(62)
          ? '脏、反感污臭'
          : '脏',
      -y,
    );
  }
  return y;
}

function judge_tail(parts, a, threshold) {
  parts.push(` = ${a}`);
  parts.push(a < threshold ? ' < ' : a === threshold ? ' = ' : ' > ');
  parts.push(`实行值${threshold}`);
}

async function service_order(title, threshold, build) {
  era.print(title);
  const { a, s, parts } = await com_order(0, 0);
  const state = { a, s };
  const context = build(parts, state);
  judge_tail(parts, state.a, threshold);
  era.print(parts.join(''));
  await era.waitAnyKey();
  return { ...context, a: state.a, passed: state.a >= threshold };
}

function common_service_modifiers(parts, state, options) {
  const {
    lust_multiplier = 1,
    shame = 0,
    clean = 0,
    disgust = 0,
    devoted = 0,
    deny = 0,
    hates_men = 0,
    fond = 0,
    futa = 0,
    perverted = 0,
    sadist = 0,
    imp = 0,
    sex_mania = 0,
    ass_mania = 0,
    shown_amounts = {},
  } = options;
  const add_talent = (id, amount) => {
    if (target_talent(id)) {
      append_term(
        parts,
        state,
        name_of('talentname', id),
        amount,
        shown_amounts[id],
      );
    }
  };
  const lust = level(target_palam(5));
  if (lust)
    append_term(
      parts,
      state,
      `${name_of('palamname', 5)}LV${lust}`,
      lust * lust_multiplier,
    );
  if (shame) add_talent(35, -shame);
  if (clean) add_talent(61, clean);
  if (disgust) add_talent(62, -disgust);
  if (devoted) add_talent(63, devoted);
  if (deny) add_talent(71, -deny);
  if (hates_men && player_talent(122)) add_talent(82, -hates_men);
  if (fond && era_flag.assiplay === 0) add_talent(85, fond);
  if (futa && player_talent(121))
    append_term(parts, state, name_of('talentname', 121), futa);
  if (perverted) add_talent(80, perverted);
  if (sadist) add_talent(83, sadist);
  if (imp) add_talent(87, imp);
  if (sex_mania) add_talent(75, sex_mania);
  if (ass_mania) add_talent(77, ass_mania);
}

function source_service_skill(
  src,
  service_values,
  skill_rates = [0.5, 0.8, 1, 1.2, 1.5, 2],
) {
  const tier = Math.min(target_abl(16), 5);
  const [s4, s5, dirt_rate] = service_values[tier];
  src.set(4, s4);
  src.set(5, s5);
  if (dirt_rate !== undefined) src.set(8, times(src.get(8), dirt_rate));
  const rate = skill_rates[Math.min(target_abl(12), skill_rates.length - 1)];
  src.set(4, times(src.get(4), rate));
  src.set(5, times(src.get(5), rate));
}

function service_ejaculation({
  base,
  target_rates = {},
  player_rates = [[0, [1, 1.5, 2, 2.5, 3.5, 5]]],
  source4_rate = 3,
  extra_ejaculation_rates = [2, 1.5],
  flag,
  semen_exp,
  source,
  poison,
  extra_rates,
  add_if = () => player_talent(121) || player_talent(122),
}) {
  const target = era_flag.target;
  const player = era_flag.player;
  let b = base[Math.min(target_abl(12), 5)];
  for (const [id, rates] of Object.entries(target_rates))
    b = times(b, rate_by_abl(target, Number(id), rates));
  if (extra_rates) {
    for (const [id, rates] of extra_rates)
      b = times(b, rate_by_abl(target, id, rates));
  }
  for (const [id, rates] of player_rates) {
    b = times(b, rate_by_abl(player, id, rates));
  }
  if (add_if()) era.add(`base:${player}:2`, b);
  const s = era.get(`base:${player}:2`) || 0;
  const ejac = era.get(`maxbase:${player}:2`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;
  if (e) {
    source.set(4, times(source.get(4), source4_rate));
    if (poison) {
      const [s7, s5_rate, s13_rate] =
        poison[Math.min(target_abl(32), poison.length - 1)];
      source.set(7, s7);
      source.set(5, times(source.get(5), s5_rate));
      source.set(13, times(source.get(13), s13_rate));
    }
    if (e === 2) {
      const [source7_rate, source5_rate] = extra_ejaculation_rates;
      source.set(7, times(source.get(7), source7_rate));
      source.set(5, times(source.get(5), source5_rate));
      era.add(`exp:${player}:3`, 2);
      chara(target).dungeon.精液经验 += semen_exp[1];
      era.print('大量射精');
      era.print(`精液经验＋${semen_exp[1]}`);
      era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
      const remaining = Math.max(
        (era.get(`base:${player}:2`) || 0) - ejac * 2,
        0,
      );
      era.set(`base:${player}:2`, remaining >= ejac ? ejac - 1 : remaining);
      era.set(`tflag:${flag}`, 2);
    } else {
      era.add(`exp:${player}:3`, 1);
      chara(target).dungeon.精液经验 += semen_exp[0];
      era.print('射精');
      era.print(`精液经验＋${semen_exp[0]}`);
      era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
      const remaining = Math.max((era.get(`base:${player}:2`) || 0) - ejac, 0);
      era.set(`base:${player}:2`, remaining >= ejac ? ejac - 1 : remaining);
      era.set(`tflag:${flag}`, 1);
    }
  }
  return { b, e };
}

function same_sex_exp(target, player, yuri, homo = yuri) {
  if (!target_talent(122) && !player_talent(122)) {
    era.print(`百合经验+${yuri}`);
    chara(target).train.百合经验 += yuri;
  } else if (target_talent(122) && player_talent(122)) {
    era.print(`断背经验+${homo}`);
    chara(target).train.断背经验 += homo;
  }
}

function love_exp(target, amount) {
  if (target_value('cflag', 2) >= 1000 && era_flag.assiplay === 0) {
    era.print(`爱情经验+${amount}`);
    chara(target).train.爱情经验 += amount;
  }
}

function player_first_kiss(target, code) {
  const player = era_flag.player;
  if ((era.get(`cflag:${target}:16`) || 0) === -1) {
    era.set(`cflag:${target}:16`, code);
    era.set(`cstr:${target}:4`, chara_callname(player));
    era.set('tflag:13', 1);
  }
}

async function jump_advanced(id) {
  const advanced = await get_adv_com(id);
  if (advanced === id) return false;
  return com_family.call(advanced, { whenMissing: COM_MISSING });
}

async function com30() {
  const jumped = await jump_advanced(30);
  if (jumped !== false) return jumped;
  const target = era_flag.target;
  const player = era_flag.player;
  const result = await service_order('手淫', 14, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 1,
      service: 4,
      poison: 1,
      pleasure_mark: 1,
      dirty: { divider: 3, force_seven: true },
    });
    common_service_modifiers(parts, state, {
      lust_multiplier: 1,
      shame: 1,
      clean: 1,
      disgust: 3,
      devoted: 6,
      deny: 1,
      hates_men: 5,
      fond: 5,
      futa: 8,
    });
    if (target_tequip(89) && !target_talent(136)) {
      append_term(parts, state, name_of('itemname', 22), -10);
    }
    append_dirty_penalty(parts, state, { divider: 3, force_seven: true });
  });
  if (!result.passed) return 0;
  await train_message_b();
  const src = source_helpers(target);
  const y = dirty_penalty({ divider: 3, force_seven: true });
  lose(target, 0, 10);
  lose(target, 1, 100);
  src.set(13, 500);
  src.set(14, 100);
  src.set(8, y * 10 + 60);
  source_service_skill(src, [
    [250, 50, 4],
    [300, 100, 2.5],
    [350, 200, 1.5],
    [400, 300, 1],
    [450, 500, 0.5],
    [500, 750, 0.1],
  ]);
  if (target_tequip(89)) return 1;
  service_ejaculation({
    base: [450, 1000, 1600, 2200, 2700, 3200],
    target_rates: {
      10: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
      13: [0.5, 0.8, 1.2, 1.5, 1.8, 2.4],
    },
    flag: 1,
    source: src,
    poison: [
      [0, 2, 2],
      [200, 2.5, 1.6],
      [600, 3, 1],
      [1500, 4, 0.7],
      [3000, 5, 0.4],
      [6000, 6, 0.1],
    ],
    add_if: () => player_talent(121) || player_talent(122),
    semen_exp: [1, 3],
  });
  stain_exchange(
    target,
    player_talent(119) || player_talent(122) || player_talent(121) ? 1 : 3,
    player,
    2,
  );
  same_sex_exp(target, player, 4);
  love_exp(target, 1);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 1;
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
  return 1;
}

async function com31() {
  const jumped = await jump_advanced(31);
  if (jumped !== false) return jumped;
  const target = era_flag.target;
  const player = era_flag.player;
  const result = await service_order('口交(奴)', 24, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 1,
      service: 4,
      poison: 3,
      pleasure_mark: 1,
      dirty: { force_seven: true },
    });
    common_service_modifiers(parts, state, {
      lust_multiplier: 1,
      shame: 1,
      clean: 1,
      disgust: 3,
      devoted: 6,
      deny: 1,
      hates_men: 12,
      fond: 5,
      futa: 8,
    });
    if (target_tequip(89) && !target_talent(136)) {
      append_term(parts, state, name_of('itemname', 22), -15);
    }
    append_dirty_penalty(parts, state, {
      force_seven: true,
      force_seven_when: () => target_tequip(55),
    });
  });
  if (!result.passed) return 0;
  await train_message_b();
  chara(target).dungeon.口交经验 += 1;
  era.print('口交经验＋１');
  const src = source_helpers(target);
  const y = dirty_penalty({
    force_seven: true,
    force_seven_when: () => target_tequip(55),
  });
  lose(target, 0, 10);
  lose(target, 1, target_talent(47) ? 90 : 150);
  src.set(13, 1500);
  src.set(14, 500);
  src.set(8, y * 40 + 100);
  source_service_skill(src, [
    [420, 150, 4],
    [500, 300, 2.5],
    [580, 600, 1.5],
    [660, 900, 1],
    [740, 1500, 0.5],
    [820, 2200, 0.1],
  ]);
  if (target_tequip(89)) {
    if ((era.get(`cflag:${target}:16`) || 0) === -1) {
      era.set('tflag:13', 1);
      era.set(`cflag:${target}:16`, 997);
      game.train.屈服刻印结算 = 3;
    }
    return 1;
  }
  if (target_tequip(55) && !(era_flag.assi > 0 && era_flag.assiplay)) {
    if ((era.get(`cflag:${target}:16`) || 0) === -1) {
      era.set(`cflag:${target}:16`, 995);
      era.set('tflag:13', 1);
    }
    return 1;
  }
  const ejaculation = service_ejaculation({
    base: [1200, 1700, 2300, 3000, 3600, 4200],
    target_rates: {
      10: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
      13: [0.5, 0.8, 1.2, 1.5, 1.8, 2.4],
      32: [1, 1.2, 1.3, 1.5, 1.7, 2],
    },
    flag: 0,
    source: src,
    poison: [
      [0, 2, 4],
      [500, 3, 3],
      [1200, 4, 2.5],
      [3000, 6, 2],
      [6000, 9, 1.5],
      [12000, 15, 1],
    ],
    extra_rates: target_talent(52) ? [[0, [2, 2, 2, 2, 2, 2]]] : [],
    add_if: () =>
      player_talent(119) || player_talent(121) || player_talent(122),
    semen_exp: [3, 9],
  });
  if (
    ejaculation.e &&
    target_talent(340) &&
    Math.floor(Math.random() * (ejaculation.e === 2 ? 5 : 10)) === 0
  ) {
    era.set(`cflag:${target}:113`, 4);
  }
  await com_ejac_player_milk(ejaculation.b);
  stain_exchange(target, 0, player, 2);
  if (target_abl(16) >= 2 && target_abl(12) >= 2) {
    era.set(`stain:${player}:2`, 2);
    if (ejaculation.e >= 1) game.train.口交射精后 = 1;
  }
  same_sex_exp(target, player, 7);
  if (era_flag.assiplay === 0 && chara(target).dungeon.私处经验 >= EXPLV[3])
    era.add('tflag:30', 1);
  player_first_kiss(target, 201);
  love_exp(target, target_talent(122) ? 2 : 1);
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  return 1;
}

async function com32() {
  const jumped = await jump_advanced(32);
  if (jumped !== false) return jumped;
  const target = era_flag.target;
  const player = era_flag.player;
  const result = await service_order('乳交', 30, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 1,
      service: 4,
      poison: 3,
      pleasure_mark: 1,
      dirty: {},
    });
    common_service_modifiers(parts, state, {
      lust_multiplier: 1,
      shame: 3,
      clean: 1,
      disgust: 3,
      devoted: 6,
      deny: 3,
      hates_men: 12,
      fond: 5,
      futa: 8,
    });
    append_dirty_penalty(parts, state, {});
  });
  if (!result.passed) return 0;
  await train_message_b();
  const src = source_helpers(target);
  lose(target, 0, 10);
  lose(target, 1, target_talent(47) ? 70 : 150);
  src.set(13, 1800);
  src.set(14, 900);
  const service = [
    [420, 150, 400],
    [500, 300, 300],
    [580, 600, 150],
    [660, 900, 50],
    [740, 1500, 20],
    [820, 2200, 0],
  ];
  const tier = Math.min(target_abl(16), 5);
  src.set(4, service[tier][0]);
  src.set(5, service[tier][1]);
  src.set(8, service[tier][2]);
  let breast = [100, 200, 400, 800, 1200, 1500][Math.min(target_abl(1), 5)];
  if (target_talent(110)) breast = times(breast, 1.2);
  if (target_talent(108)) breast = times(breast, 1.2);
  else if (target_talent(107)) breast = times(breast, 0.7);
  src.add(17, breast);
  const skill = [0.5, 0.8, 1, 1.2, 1.5, 2][Math.min(target_abl(12), 5)];
  src.set(4, times(src.get(4), skill));
  src.set(5, times(src.get(5), skill));
  const ejaculation = service_ejaculation({
    base: [1500, 2100, 2900, 4000, 5000, 6000],
    target_rates: {
      10: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
      13: [0.5, 0.8, 1.2, 1.5, 1.8, 2.4],
      32: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
    },
    flag: 0,
    source: src,
    poison: [
      [0, 2, 6],
      [500, 3, 4.5],
      [1200, 4, 3.5],
      [3000, 6, 3],
      [6000, 9, 2],
      [12000, 15, 1.5],
    ],
    extra_rates: target_talent(52) ? [[0, [2, 2, 2, 2, 2, 2]]] : [],
    semen_exp: [3, 9],
  });
  await com_ejac_player_milk(ejaculation.b);
  stain_exchange(target, 0, player, 2);
  stain_exchange(target, 5, player, 2);
  if (target_abl(16) >= 2 && target_abl(12) >= 2) {
    era.set(`stain:${player}:2`, 2);
    if (ejaculation.e >= 1) game.train.口交射精后 = 1;
  }
  chara(target).dungeon.口交经验 += 1;
  era.print('口交经验＋１');
  same_sex_exp(target, player, 7);
  if (era_flag.assiplay === 0 && chara(target).dungeon.口交经验 >= EXPLV[3])
    era.add('tflag:30', 1);
  love_exp(target, 1);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 2;
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
  return 1;
}

async function com33() {
  const jumped = await jump_advanced(33);
  if (jumped !== false) return jumped;
  const target = era_flag.target;
  const player = era_flag.player;
  const result = await service_order('股间性交', 20, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 2,
      service: 4,
      poison: 1,
      pleasure_mark: 2,
      dirty: { divider: 3 },
    });
    common_service_modifiers(parts, state, {
      lust_multiplier: 3,
      shame: 1,
      deny: 3,
      hates_men: 7,
      fond: 3,
      futa: 8,
    });
    if (target_tequip(21))
      append_term(parts, state, name_of('itemname', 26), 6);
    append_dirty_penalty(parts, state, { divider: 3 });
  });
  if (!result.passed) return 0;
  await train_message_b();
  const src = source_helpers(target);
  const y = dirty_penalty({ divider: 3 });
  lose(target, 0, 40);
  lose(target, 1, 130);
  src.set(13, 1200);
  src.set(14, 400);
  src.set(8, y * 10 + 60);
  source_service_skill(
    src,
    [
      [200, 100, 4],
      [250, 180, 2.5],
      [300, 250, 1.5],
      [350, 350, 1],
      [400, 500, 0.5],
      [450, 800, 0.1],
    ],
    [0.7, 0.9, 1, 1.2, 1.4, 1.6],
  );
  src.set(0, [0, 10, 50, 200, 600, 2000][Math.min(target_abl(0), 5)]);
  const lube_rates = [0.3, 0.6, 1, 1.5, 2, 2.5];
  const source4_rates = [0.6, 0.8, 1, 1.2, 1.4, 1.6];
  const lube = level(target_palam(3));
  src.set(0, times(src.get(0), lube_rates[lube]));
  src.set(4, times(src.get(4), source4_rates[lube]));
  let base = [500, 1100, 2000, 3000, 3900, 4600][Math.min(target_abl(12), 5)];
  base += [0, 0, 0, 300, 600, 1000][lube];
  const ejaculation = service_ejaculation({
    base: [base, base, base, base, base, base],
    target_rates: {
      10: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
      13: [0.5, 0.8, 1.2, 1.5, 1.8, 2.4],
    },
    flag: 9,
    source: src,
    source4_rate: 2,
    extra_ejaculation_rates: [1.5, 1.2],
    semen_exp: [1, 2],
    poison: [
      [0, 1.5, 1.4],
      [200, 2, 1],
      [400, 2.5, 0.8],
      [700, 3, 0.5],
      [1000, 4, 0.2],
      [1500, 5, 0],
    ],
  });
  stain_exchange(target, 3, player, 2);
  same_sex_exp(target, player, 7);
  if (era_flag.assiplay === 0) era.add('tflag:30', 1);
  love_exp(target, 1);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 1;
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
  return ejaculation.e === undefined ? 1 : 1;
}

async function com34_check() {
  const result = await service_order('骑乘位', 24, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 3,
      vagina: 2,
      service: 4,
      poison: 1,
      pleasure_mark: 3,
      dirty: { divider: 3, force_seven: true },
    });
    if (target_palam(3) < PALAMLV[3]) append_term(parts, state, '润滑不足', -5);
    common_service_modifiers(parts, state, {
      lust_multiplier: 3,
      shame: 2,
      deny: 5,
      hates_men: 12,
      fond: 5,
      sex_mania: 5,
      futa: 4,
    });
    if (target_talent(0))
      append_term(parts, state, name_of('talentname', 0), -20);
    else if (target_exp(0) < EXPLV[2])
      append_term(parts, state, `${name_of('expname', 0)}不足`, -5);
    if (target_tequip(21))
      append_term(parts, state, name_of('itemname', 26), 6);
    if (target_tequip(89) && !target_talent(136)) {
      append_term(parts, state, name_of('itemname', 22), -20);
    }
    append_dirty_penalty(parts, state, { divider: 3, force_seven: true });
  });
  return result.passed;
}

async function com34_src() {
  const target = era_flag.target;
  const src = source_helpers(target);
  const y = dirty_penalty({ divider: 3, force_seven: true });
  lose(target, 0, 60);
  lose(target, 1, 150);
  src.set(12, 900);
  src.set(8, y * 10 + 60);
  const service = [
    [200, 50, 300, 4],
    [250, 200, 100, 2.5],
    [350, 550, 30, 1.5],
    [450, 900, 0, 1],
    [600, 1500, 0, 0.5],
    [750, 2200, 0, 0.1],
  ][Math.min(target_abl(16), 5)];
  src.set(4, service[0]);
  src.set(5, service[1]);
  src.set(14, service[2]);
  src.set(8, times(src.get(8), service[3]));
  const vaginal = [
    [20, 25, 0.5],
    [75, 75, 0.8],
    [200, 125, 1],
    [500, 175, 1.2],
    [850, 300, 1.5],
    [1100, 425, 2],
  ][Math.min(target_abl(2), 5)];
  src.set(1, vaginal[0]);
  src.set(3, vaginal[1]);
  src.set(4, times(src.get(4), vaginal[2]));
  const exp = target_exp(0);
  if (exp < EXPLV[1]) {
    src.set(1, times(src.get(1), 0.2));
    src.set(6, 5000);
    src.set(12, 12000);
    src.set(14, 120000);
  } else if (exp < EXPLV[2]) {
    src.set(1, times(src.get(1), 0.6));
    src.set(6, 220);
  } else if (exp < EXPLV[3]) {
    src.set(6, 30);
  } else if (exp < EXPLV[4]) {
    src.set(1, times(src.get(1), 1.2));
    src.set(6, 5);
  } else if (exp < EXPLV[5]) {
    src.set(1, times(src.get(1), 1.4));
  } else {
    src.set(1, times(src.get(1), 1.5));
  }
  const lube = level(target_palam(3));
  const lube1 = [0.2, 0.6, 1, 1.3, 1.6, 2][lube];
  const lube6 = [3, 1, 0.5, 0.3, 0.2, 0.1][lube];
  src.set(1, times(src.get(1), lube1));
  if (lube === 0) {
    src.add(6, 900);
    src.set(12, src.get(12) + 2000);
  } else if (lube === 1) {
    src.add(6, 250);
    src.set(12, src.get(12) + 400);
  }
  src.set(6, times(src.get(6), lube6));
  if (target_talent(99)) src.set(6, times(src.get(6), 0.8));
  if (target_talent(100)) src.set(6, times(src.get(6), 2));
  if (target_talent(135)) src.set(6, times(src.get(6), 4));
  if (target_talent(30)) {
    src.set(3, times(src.get(3), 0.6));
    src.set(14, times(src.get(14), 15));
    src.set(15, exp === 0 ? 10000 : 1000);
  } else if (target_talent(31)) {
    src.set(14, times(src.get(14), 0.5));
    if (exp === 0) src.set(15, 300);
  } else if (exp === 0) src.set(15, 3000);
  const lust = level(target_palam(5));
  src.set(1, times(src.get(1), [0.6, 0.8, 1, 1.2, 1.4, 1.6][lust]));
  src.set(3, times(src.get(3), [0.3, 0.6, 1, 1.5, 1.8, 2.2][lust]));
  const obedience = Math.min(target_abl(10), 5);
  src.set(1, times(src.get(1), [0.5, 0.8, 1, 1.3, 1.6, 2][obedience]));
  src.set(3, times(src.get(3), [0.6, 0.8, 1, 1.2, 1.4, 1.6][obedience]));
  src.set(15, times(src.get(15), [2, 1.5, 1, 0.8, 0.6, 0.3][obedience]));
  src.add(13, [700, 500, 300, 100, 30, 0][obedience]);
  const skill = Math.min(target_abl(12), 5);
  src.set(1, times(src.get(1), [0.5, 0.8, 1, 1.3, 1.6, 2][skill]));
  src.set(3, times(src.get(3), [0.6, 0.8, 1, 1.2, 1.4, 1.6][skill]));
  await com_ejac_player_sex();
  if (game.train.性交射精) {
    src.set(4, times(src.get(4), 3));
    src.set(5, times(src.get(5), 5));
    src.set(13, times(src.get(13), 1.5));
    src.set(7, [0, 300, 1000, 1500, 2200, 3000][Math.min(target_abl(32), 5)]);
  }
  await com_after_vagina_sex();
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
}

async function com34() {
  const jumped = await jump_advanced(34);
  if (jumped !== false) return jumped;
  // CASE34 的 FLAG:71 是菜单渲染与实际执行间的连续体缓存；仅未跳转时清零。
  game.train.自由调教跳转 = 0;
  if (!(await com34_check())) return 0;
  if ((await confirm_lost_virgin()) === 0) return 0;
  if ((await confirm_condom()) === 0) return 0;
  await train_message_b();
  era.set('tflag:19', 1);
  if (era_flag.assiplay === 0 && target_exp(0) === 0 && !target_tequip(89))
    game.train.主人导致处女丧失 = 1;
  await com34_src();
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = target_exp(0) <= 1 ? 3 : 2;
  return 1;
}

async function com35() {
  const target = era_flag.target;
  const player = era_flag.player;
  const result = await service_order('全身擦洗', 30, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 1,
      service: 4,
      poison: 3,
      pleasure_mark: 1,
      dirty: {},
    });
    common_service_modifiers(parts, state, {
      lust_multiplier: 1,
      shame: 3,
      clean: 1,
      disgust: 3,
      devoted: 6,
      deny: 3,
      hates_men: 12,
      fond: 5,
      futa: 8,
    });
    append_dirty_penalty(parts, state, {});
  });
  if (!result.passed) return 0;
  await train_message_b();
  const src = source_helpers(target);
  lose(target, 0, 50);
  lose(target, 1, 180);
  src.set(13, 2000);
  src.set(14, 1500);
  const service = [
    [500, 300, 200],
    [700, 500, 150],
    [900, 800, 100],
    [1100, 1200, 50],
    [1300, 1800, 20],
    [1500, 2500, 0],
  ][Math.min(target_abl(16), 5)];
  src.set(4, service[0]);
  src.set(5, service[1]);
  src.set(8, service[2]);
  src.set(0, [0, 50, 200, 400, 1000, 2000][Math.min(target_abl(0), 5)]);
  let breast = [200, 300, 500, 1000, 1500, 1800][Math.min(target_abl(1), 5)];
  if (target_talent(110)) breast = times(breast, 1.2);
  if (target_talent(108)) breast = times(breast, 1.2);
  else if (target_talent(107)) breast = times(breast, 0.7);
  src.add(17, breast);
  const skill = [0.8, 1, 1.3, 1.6, 1.9, 2.3][Math.min(target_abl(12), 5)];
  src.set(4, times(src.get(4), skill));
  src.set(5, times(src.get(5), skill));
  service_ejaculation({
    base: [1500, 2100, 2900, 4000, 5000, 6000],
    target_rates: {
      10: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
      16: [0.5, 0.8, 1.2, 1.5, 1.8, 2.4],
      32: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
    },
    flag: 1,
    source: src,
    semen_exp: [1, 3],
    poison: [
      [0, 2, 2],
      [200, 2.5, 1.6],
      [600, 3, 1],
      [1500, 4, 0.7],
      [3000, 5, 0.4],
      [6000, 6, 0.1],
    ],
  });
  set_standard_stain(target);
  set_standard_stain(era_flag.assiplay ? era_flag.assi : era_flag.player);
  same_sex_exp(target, player, 7);
  if (era_flag.assiplay === 0 && chara(target).dungeon.口交经验 >= EXPLV[3])
    era.add('tflag:30', 1);
  love_exp(target, 2);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 3;
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
  return 1;
}

async function com36_check() {
  const result = await service_order('骑乘位肛交', 24, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 3,
      anal: 2,
      service: 4,
      poison: 1,
      pleasure_mark: 3,
      dirty: { divider: 3 },
    });
    if (target_palam(3) < PALAMLV[3]) append_term(parts, state, '润滑不足', -5);
    common_service_modifiers(parts, state, {
      lust_multiplier: 3,
      shame: 2,
      deny: 5,
      hates_men: 12,
      fond: 5,
      ass_mania: 5,
      futa: 4,
    });
    if (target_tequip(21))
      append_term(parts, state, name_of('itemname', 26), 6);
    append_dirty_penalty(parts, state, { divider: 3 });
  });
  return result.passed;
}

async function com36() {
  if (!(await com36_check())) return 0;
  const target = era_flag.target;
  const src = source_helpers(target);
  await train_message_b();
  const y = dirty_penalty({ divider: 3 });
  lose(target, 0, 90);
  lose(target, 1, 110);
  src.set(12, 900);
  src.set(8, y * 10 + 60);
  const service = [
    [200, 50, 300, 4],
    [250, 200, 100, 2.5],
    [350, 550, 30, 1.5],
    [450, 900, 0, 1],
    [600, 1500, 0, 0.5],
    [750, 2200, 0, 0.1],
  ][Math.min(target_abl(16), 5)];
  src.set(4, service[0]);
  src.set(5, service[1]);
  src.set(14, service[2]);
  src.set(8, times(src.get(8), service[3]));
  const anal = [
    [10, 10, 80, 0.5],
    [20, 50, 300, 0.8],
    [200, 100, 700, 1],
    [450, 180, 1500, 1.2],
    [850, 300, 2600, 1.5],
    [1300, 450, 4000, 2],
  ][Math.min(target_abl(3), 5)];
  src.set(2, anal[0]);
  src.set(3, anal[1]);
  src.add(13, anal[2]);
  src.set(4, times(src.get(4), anal[3]));
  const exp = target_exp(1);
  const exp_tier = exp_level(exp);
  src.set(2, times(src.get(2), [0.1, 0.3, 0.5, 1, 1.4, 1.6][exp_tier]));
  src.set(6, [18000, 10000, 4500, 1500, 700, 300][exp_tier]);
  const extra_lose = [
    [70, 80],
    [60, 70],
    [45, 55],
    [25, 35],
    [10, 15],
    [0, 0],
  ][exp_tier];
  lose(target, 0, extra_lose[0]);
  lose(target, 1, extra_lose[1]);
  const lube = level(target_palam(3));
  src.set(2, times(src.get(2), [0.4, 0.8, 1, 1.4, 1.8, 1.8][lube]));
  src.add(6, [10000, 3600, 1200, 200, 100, 100][lube]);
  if (target_talent(99)) src.set(6, times(src.get(6), 0.8));
  if (target_talent(100)) src.set(6, times(src.get(6), 2));
  if (target_talent(135)) src.set(6, times(src.get(6), 2));
  if (target_talent(30)) {
    src.set(3, times(src.get(3), 1.2));
    src.set(16, times(src.get(16), 1.1));
    src.set(15, exp === 0 ? 500 : 0);
  }
  const lust = Math.min(level(target_palam(5)), 4);
  src.set(2, times(src.get(2), [0.6, 0.8, 1, 1.2, 1.4][lust]));
  src.set(13, times(src.get(13), [0.6, 0.8, 1, 1.2, 1.4][lust]));
  const obedience = Math.min(target_abl(10), 5);
  src.set(2, times(src.get(2), [0.5, 0.8, 1, 1.3, 1.6, 2][obedience]));
  src.set(3, times(src.get(3), [0.6, 0.8, 1, 1.2, 1.4, 1.6][obedience]));
  src.set(15, times(src.get(15), [2, 1.5, 1, 0.8, 0.6, 0.3][obedience]));
  src.add(13, [700, 500, 300, 100, 30, 0][obedience]);
  const skill = Math.min(target_abl(12), 5);
  src.set(2, times(src.get(2), [0.5, 0.8, 1, 1.3, 1.6, 2][skill]));
  src.set(3, times(src.get(3), [0.6, 0.8, 1, 1.2, 1.4, 1.6][skill]));
  await com_ejac_player_analsex();
  if (game.train.性交射精) {
    src.set(4, times(src.get(4), 3));
    src.set(5, times(src.get(5), 5));
    src.set(13, times(src.get(13), 1.5));
    src.set(7, [0, 300, 1000, 1500, 2200, 3000][Math.min(target_abl(32), 5)]);
  }
  await com_after_anal_sex();
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = target_exp(1) <= 1 ? 3 : 2;
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
  return 1;
}

async function com37() {
  const target = era_flag.target;
  const player = era_flag.player;
  const result = await service_order('肛门侍奉', 23, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 1,
      service: 3,
      dirty: { force_seven: true, player_stain: 4 },
    });
    const mark1 = value('mark', target, 1);
    const mark2 = value('mark', target, 2);
    const mark3 = value('mark', target, 3);
    if (mark1)
      append_term(
        parts,
        state,
        `${name_of('markname', 1)}LV${mark1}`,
        mark1 * 2,
      );
    if (mark2)
      append_term(
        parts,
        state,
        `${name_of('markname', 2)}LV${mark2}`,
        mark2 * 3,
      );
    if (mark3)
      append_term(
        parts,
        state,
        `${name_of('markname', 3)}LV${mark3}`,
        -mark3 * 5,
      );
    common_service_modifiers(parts, state, {
      lust_multiplier: 0,
      shame: 1,
      clean: 2,
      disgust: 5,
      devoted: 4,
      deny: 1,
      perverted: 3,
      fond: 5,
    });
    if (target_talent(11))
      append_term(parts, state, name_of('talentname', 11), -5);
    if (target_talent(15))
      append_term(parts, state, name_of('talentname', 15), -12);
    if (target_talent(17))
      append_term(parts, state, name_of('talentname', 17), 2);
    if (target_talent(34))
      append_term(parts, state, name_of('talentname', 34), -20);
    if (target_talent(64))
      append_term(parts, state, name_of('talentname', 64), 3);
    if (player_talent(83))
      append_term(parts, state, name_of('talentname', 83), 3);
    if (target_tequip(89) && !target_talent(136)) {
      append_term(parts, state, name_of('itemname', 22), -20);
    }
    append_dirty_penalty(parts, state, { force_seven: true, player_stain: 4 });
  });
  if (!result.passed) return 0;
  await train_message_b();
  const src = source_helpers(target);
  const y = dirty_penalty({ force_seven: true, player_stain: 4 });
  lose(target, 1, 10);
  lose(target, 1, 100);
  src.set(13, 3000);
  src.set(14, 5000);
  src.set(8, y * 80 + 50);
  source_service_skill(
    src,
    [
      [420, 150, 4],
      [500, 300, 2.5],
      [580, 600, 1.5],
      [660, 900, 1],
      [740, 1500, 0.5],
      [820, 2200, 0.1],
    ],
    [0.5, 0.8, 1, 1.5, 2.5, 4],
  );
  if (target_tequip(89)) {
    if ((era.get(`cflag:${target}:16`) || 0) === -1) {
      era.set('tflag:13', 1);
      era.set(`cflag:${target}:16`, 996);
      game.train.屈服刻印结算 = 3;
    }
    return 1;
  }
  service_ejaculation({
    base: [100, 300, 500, 800, 1200, 1600],
    target_rates: {
      10: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
      13: [0.5, 0.8, 1.2, 1.5, 1.8, 2.4],
    },
    player_rates: [[3, [1, 1.5, 2, 2.5, 3.5, 5]]],
    flag: 5,
    source: src,
    semen_exp: [1, 4],
    extra_rates: target_talent(52) ? [[0, [2, 2, 2, 2, 2, 2]]] : [],
    poison: [
      [0, 2, 2],
      [200, 2.5, 1.6],
      [500, 3, 1],
      [1200, 4.5, 0.7],
      [2500, 6, 0.4],
      [5000, 8, 0.1],
    ],
  });
  stain_exchange(target, 0, player, 4);
  if (!target_talent(122) && !player_talent(122)) {
    era.print('百合经验+6');
    chara(target).train.百合经验 += 6;
  }
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 3;
  player_first_kiss(target, 401);
  return 1;
}

async function com38() {
  const target = era_flag.target;
  const player = era_flag.player;
  const result = await service_order('足交', 22, (parts, state) => {
    append_service_judge(parts, state, {
      lust: 1,
      service: 4,
      maso: 5,
      poison: 1,
      pleasure_mark: 1,
      dirty: { divider: 3 },
    });
    common_service_modifiers(parts, state, {
      lust_multiplier: 1,
      shame: 3,
      clean: 1,
      disgust: 1,
      devoted: 6,
      deny: 3,
      hates_men: 8,
      perverted: 4,
      fond: 5,
      sadist: 10,
      imp: 4,
      futa: 8,
      shown_amounts: { 35: -1, 71: -1, 82: -5 },
    });
    append_dirty_penalty(parts, state, { divider: 3 });
  });
  if (!result.passed) return 0;
  await train_message_b();
  const src = source_helpers(target);
  const y = dirty_penalty({ divider: 3 });
  lose(target, 0, 10);
  lose(target, 1, 150);
  src.set(13, 550);
  src.set(14, 400);
  src.set(8, y * 10 + 50);
  source_service_skill(src, [
    [300, 50, 4],
    [350, 100, 2.5],
    [400, 150, 1.5],
    [450, 200, 1],
    [500, 250, 0.5],
    [580, 300, 0.1],
  ]);
  const maso = Math.min(target_abl(20), 5);
  const maso_rate = [1, 1.2, 1.4, 1.6, 1.8, 2][maso];
  src.set(4, times(src.get(4), maso_rate));
  src.set(5, times(src.get(5), maso_rate));
  service_ejaculation({
    base: [350, 700, 1300, 1800, 2600, 3500],
    target_rates: {
      10: [0.8, 0.9, 1, 1.1, 1.2, 1.3],
      13: [0.5, 0.8, 1.2, 1.5, 1.8, 2.4],
    },
    player_rates: [
      [21, [0.9, 1, 1.1, 1.2, 1.3, 1.4]],
      [0, [1, 1.5, 2, 2.5, 3.5, 5]],
    ],
    flag: 18,
    source: src,
    semen_exp: [1, 2],
    poison: [
      [0, 2, 2],
      [200, 2.5, 1.6],
      [600, 3, 1],
      [1500, 4, 0.7],
      [3000, 5, 0.4],
      [6000, 6, 0.1],
    ],
  });
  let sadistic = 0;
  if (target_talent(83) || (target_abl(11) >= 3 && target_abl(20) >= 3))
    sadistic = 3;
  else if (target_abl(11) >= 3 && target_abl(20) >= 1) sadistic = 2;
  else if (target_abl(11) >= 3 || target_abl(20) >= 1) sadistic = 1;
  if (sadistic) {
    era.print(`施虐快乐经验+${sadistic}`);
    chara(target).dungeon.施虐快乐经验 += sadistic;
  }
  same_sex_exp(target, player, 3);
  love_exp(target, 1);
  game.train.快乐经验 = 1;
  game.train.屈服刻印结算 = 1;
  if (player_talent(121)) src.set(13, idiv(src.get(13), 2));
  return 1;
}

// —— @COM_ABLE30-38（COMABLE.ERB:1447-1870；有序早退） ——

function worn(target) {
  return era.get(`cflag:${target}:40`) || 0;
}
function special(target) {
  return era.get(`cflag:${target}:42`) || 0;
}
function clothes_on() {
  return era.get('flag:37') || 0;
}
function costume_blocked(target, bits = 0, diaper = true, zuko = true) {
  if (worn(target) & bits && clothes_on()) return true;
  if (diaper && special(target) === 69 && worn(target) & 64 && clothes_on())
    return true;
  return zuko && special(target) === 11 && worn(target) & 64 && clothes_on();
}
function filthy_player() {
  const stain = era.get(`stain:${era_flag.player}:2`) || 0;
  return (
    (stain & 1 || stain & 4 || stain & 8 || stain & 32) &&
    target_abl(10) <= 3 &&
    target_talent(62) &&
    !target_talent(64)
  );
}
function male_monster() {
  return [1, 7, 8, 10, 12].includes(e_get(307));
}

com_able_family.register(30, async () => {
  const target = era_flag.target;
  if (era.get('tflag:899') > 0) return 0;
  if (!player_talent(121) && !player_talent(122) && !target_tequip(89))
    return 0;
  if (target_talent(151)) return 0;
  if (target_tequip(44)) return 0;
  if (target_tequip(89) && target_abl(39) < 1) return 0;
  if (target_tequip(88) && !male_monster()) return 0;
  if (target_tequip(90)) return 0;
  if (target_tequip(55)) return 0;
  return costume_blocked(target, 0, false, true) ? 0 : 1;
});

com_able_family.register(31, async () => {
  const target = era_flag.target;
  if (era.get('tflag:899') > 0) return 0;
  if (target_talent(151)) return 0;
  if (filthy_player()) return 0;
  if (target_tequip(45)) return 0;
  if (target_tequip(44)) return 0;
  if (target_tequip(89) && target_abl(39) < 1) return 0;
  if (target_tequip(88) && !male_monster()) return 0;
  if (target_tequip(90)) return 0;
  if (target_tequip(55)) return 0;
  return costume_blocked(target, 0, false, true) ? 0 : 1;
});

com_able_family.register(32, async () => {
  const target = era_flag.target;
  if (era.get('tflag:899') > 0) return 0;
  if (target_talent(122) || target_talent(116)) return 0;
  if (
    !target_talent(114) &&
    !target_talent(110) &&
    !target_talent(119) &&
    target_abl(12) < 3
  )
    return 0;
  if (target_talent(109) && target_abl(12) < 4) return 0;
  if (!player_talent(121) && !player_talent(122)) return 0;
  if (filthy_player()) return 0;
  if (
    target_talent(151) ||
    target_tequip(45) ||
    target_tequip(44) ||
    target_tequip(90) ||
    target_tequip(89) ||
    target_tequip(88) ||
    target_tequip(55)
  )
    return 0;
  if (worn(target) & 6) return 0;
  return costume_blocked(target, 0, false, true) ? 0 : 1;
});

com_able_family.register(33, async () => {
  const target = era_flag.target;
  if (era.get('tflag:899') > 0 || target_palam(3) < 2000) return 0;
  if (!player_talent(121) && !player_talent(122)) return 0;
  if (
    target_talent(151) ||
    target_tequip(11) ||
    target_tequip(44) ||
    target_tequip(90) ||
    target_tequip(89) ||
    target_tequip(88) ||
    target_tequip(55)
  )
    return 0;
  if (target_tequip(58) && !(era.get('item:13') || 0) && !era.get('noitem:0'))
    return 0;
  return costume_blocked(target, 17) ? 0 : 1;
});

com_able_family.register(34, async () => {
  const target = era_flag.target;
  if (
    game.train.指令过滤 & 4 ||
    era.get('tflag:899') > 0 ||
    target_talent(135) ||
    target_tequip(11) ||
    target_talent(122)
  )
    return 0;
  if (!player_talent(121) && !player_talent(122) && !target_tequip(89))
    return 0;
  if (target_talent(151) || target_tequip(44)) return 0;
  if (target_tequip(89) && target_abl(39) < 2) return 0;
  if (target_tequip(88) && !male_monster()) return 0;
  if (target_tequip(90) || target_tequip(55)) return 0;
  if (target_tequip(58) && !(era.get('item:13') || 0) && !era.get('noitem:0'))
    return 0;
  if (costume_blocked(target, 17)) return 0;
  if (special(target) === 79 && worn(target) & 64 && clothes_on()) return 0;
  return target_talent(273) ? 0 : 1;
});

com_able_family.register(35, async () => {
  const target = era_flag.target;
  if (era.get('tflag:899') > 0 || target_talent(151) || !target_tequip(58))
    return 0;
  if (!(era.get('item:13') || 0) && !era.get('noitem:0')) return 0;
  for (const id of [18, 11, 13, 14, 15, 43, 44, 45, 19, 46, 49])
    if (target_tequip(id)) return 0;
  if (worn(target) && clothes_on() && special(target) <= 70) return 0;
  return 1;
});

com_able_family.register(36, async () => {
  const target = era_flag.target;
  if (game.train.指令过滤 & 8 || era.get('tflag:899') > 0 || target_talent(151))
    return 0;
  for (const id of [13, 19, 46, 49]) if (target_tequip(id)) return 0;
  if (!player_talent(121) && !player_talent(122)) return 0;
  if (target_tequip(44) || target_tequip(90) || target_tequip(89)) return 0;
  if (target_tequip(88) && !male_monster()) return 0;
  if (target_tequip(55) || target_exp(1) < 10) return 0;
  if (target_tequip(58) && !(era.get('item:13') || 0) && !era.get('noitem:0'))
    return 0;
  return costume_blocked(target, 17) ? 0 : 1;
});

com_able_family.register(37, async () => {
  const target = era_flag.target;
  if (
    era.get('tflag:899') > 0 ||
    target_talent(151) ||
    target_tequip(45) ||
    target_tequip(44)
  )
    return 0;
  if (target_tequip(89) && target_abl(39) < 1) return 0;
  if (target_tequip(88) || target_tequip(90) || target_tequip(55)) return 0;
  return costume_blocked(target, 0, false, true) ? 0 : 1;
});

com_able_family.register(38, async () => {
  const target = era_flag.target;
  if (era.get('tflag:899') > 0) return 0;
  if (!player_talent(121) && !player_talent(122)) return 0;
  if (
    target_tequip(44) ||
    target_tequip(89) ||
    target_tequip(88) ||
    target_tequip(90) ||
    target_tequip(55)
  )
    return 0;
  return costume_blocked(target, 0, false, true) ? 0 : 1;
});

// —— TRAIN_MESSAGE_B（EVENT_TRAIN_MESSAGE_B.ERB:1485-1739） ——

function target_name() {
  return chara_callname(era_flag.target);
}
function player_name() {
  return chara_callname(era_flag.player);
}

async function train_message_b_30() {
  let subject = target_tequip(89)
    ? '狗的'
    : target_tequip(88)
      ? `${monster_name(e_get(300))}的`
      : `${player_name()}的`;
  era.print(
    `${target_name()}${target_talent(85) && !era_flag.assiplay && !target_tequip(89) ? '带着爱慕的表情、' : ''}${target_talent(76) ? '自发地' : ''}套弄着${subject}阴茎、不停摩擦侍奉着……`,
  );
}
async function train_message_b_31() {
  const target = target_name();
  const player = player_name();
  if (target_tequip(55)) {
    const arena_text = {
      201: `${player}兴奋地抓住倒下了的${target}的头、狠狠地将${
        player_talent(121) || player_talent(122)
          ? '阴茎'
          : (era.get('item:4') || 0) === 1
            ? '假阳具'
            : ''
      }捅进她的嘴里……`,
      202: `倒下了的${target}的头被最下层居民抓着、被充满污垢的阴茎捅进她嘴里了……`,
      203: `倒下了的${target}被命令舔舐霉菌狗的阴茎……`,
      204: `倒下了的${target}的头被兽人抓着、用长满瘤子的丑陋阴茎强行侵犯着她的嘴巴…………`,
      205: `倒下了的${target}被命令舔舐腐烂猪的阴茎……`,
      206: `倒下了的${target}的头被抓着、整个人被提了起来、巨魔用那自傲的巨大阴茎狠狠地捅进她的嘴里……`,
    };
    const text = arena_text[game.train.死斗场敌种];
    if (text) era.print(text);
  }

  let suffix;
  if (target_tequip(89)) suffix = '狗的阴茎…';
  else if (target_tequip(88)) suffix = `${monster_name(e_get(300))}的性器…`;
  else if (target_tequip(55) && era_flag.assi !== era_flag.player)
    suffix = '怪物的阴茎…';
  else if (
    player_talent(122) ||
    (player_talent(121) && Math.floor(Math.random() * 2) === 0)
  ) {
    suffix = `${player}的阴茎…`;
  } else if (
    !player_talent(121) &&
    !player_talent(122) &&
    (era.get('item:4') || 0) !== 0 &&
    Math.floor(Math.random() * 8) === 0
  ) {
    suffix = `${player}的假鸡巴…`;
  } else {
    const clitoris = [
      (target_abl(13) >= 4 && target_talent(122)) ||
      (target_abl(13) >= 1 && !target_talent(122) && target_abl(22) >= 2) ||
      target_talent(85)
        ? `、吮吸着${player}的阴唇`
        : '',
      (target_abl(13) >= 4 && target_talent(122)) ||
      (target_abl(13) >= 1 && !target_talent(122) && target_abl(22) >= 3) ||
      target_talent(85)
        ? '、不时地将舌头伸进花瓣之间'
        : '',
    ].join('');
    suffix = `${player}的阴蒂${clitoris}…`;
  }
  era.print(
    `${target}${target_talent(85) && !era_flag.assiplay && !target_tequip(89) && !target_tequip(55) ? '带着慈爱的表情、' : ''}${target_talent(76) ? '主动地' : ''}用舌头仔细舔舐着${suffix}`,
  );
}
async function train_message_b_32() {
  const action = target_talent(109)
    ? `努力地挤着没多少的胸部蹭着${player_name()}的阴茎`
    : target_talent(110)
      ? `用两乳之间惊人的深深沟壑包裹着${player_name()}的阴茎`
      : target_talent(114)
        ? `用汹涌豪乳之间那深不可测的峡谷完全淹埋了${player_name()}的阴茎`
        : `用胸部夹住${player_name()}的阴茎`;
  era.print(
    `${target_name()}${target_talent(85) && !era_flag.assiplay ? '带着情意绵绵的表情、' : ''}${action}、摩擦侍奉着。`,
  );
}
async function train_message_b_33() {
  let expression;
  if (
    (target_talent(85) || target_talent(76)) &&
    target_palam(5) > PALAMLV[5] &&
    target_abl(11) >= 5
  )
    expression = '浮现出沉醉在快感之中的表情、';
  else if (target_talent(85) && target_palam(5) > PALAMLV[5])
    expression = '正露出快被融化的神情、';
  else if (target_talent(76) && target_palam(5) > PALAMLV[5])
    expression = '带着恳求的眼神、';
  else if (target_palam(5) > PALAMLV[4]) expression = '嘴角流出了口水、';
  else if (
    (target_talent(85) || target_talent(76)) &&
    target_palam(5) > PALAMLV[3]
  )
    expression = '眼中充满着陶醉、';
  else if (target_talent(85)) expression = '露出被幸福包围的神情、';
  else if (target_talent(76)) expression = '用淫秽的眼神挑逗着、';
  else if (target_talent(36)) expression = '放荡地扭着腰、';
  else if (target_talent(22)) expression = '脸上染上了一片红霞、';
  else expression = '害羞地';
  const site = target_talent(132)
    ? '幼女的阴部'
    : target_talent(122)
      ? '两腿'
      : '阴唇';
  era.print(
    `${target_name()}将${player_name()}的阴茎夹在两腿之间、${expression}用${site}摩擦侍奉着阴茎…`,
  );
}
async function train_message_b_34() {
  const target = target_name();
  const player = player_name();
  if (game.event.插着不拔 && era_flag.prevcom === 34 && target_tequip(89)) {
    era.print(`${target}大口喘着气、在狗的上面不停地摆动着腰……`);
    if (game.event.本次调教处女丧失) game.event.本次调教处女丧失 = 2;
  } else if (target_tequip(89)) {
    era.print(
      `${target}将狗仰面翻转、跨到了狗的身上、对准流浪狗勃起的阴茎、自己主动沉下腰插进去了……`,
    );
  } else if (target_tequip(88)) {
    era.print(
      `${target}跨坐在${monster_name(e_get(300))}的上方，对准勃起的阴茎、自己主动沉下腰插进去了……`,
    );
  } else if (
    game.event.插着不拔 &&
    (era_flag.prevcom === 34 ||
      (game.event.前前回指令 === 34 &&
        [120, 121].includes(era_flag.prevcom))) &&
    same_trainer()
  ) {
    era.print(
      `${target}剧烈喘着气、娇声呻吟着、在${player}的上面持续地扭动着腰肢…`,
    );
    if (game.event.本次调教处女丧失) game.event.本次调教处女丧失 = 2;
  } else if (
    game.event.插着不拔 &&
    ([20, 128, 129, 130, 21, 131, 132, 133, 134].includes(era_flag.prevcom) ||
      ([20, 128, 129, 130, 21, 131, 132, 133, 134].includes(
        game.event.前前回指令,
      ) &&
        [120, 121].includes(era_flag.prevcom))) &&
    same_trainer()
  ) {
    era.print(`${player}保持着抽插、将${target}抱起、从下方挺动着腰…`);
    if (game.event.本次调教处女丧失) game.event.本次调教处女丧失 = 2;
  } else {
    let text = `${target}跨到${player}的上面、慢慢地沉下了腰`;
    if (target_talent(132) && target_exp(0) === 0)
      text += '、用未经人事的幼女的秘裂、把阴茎迎进去';
    else if (target_exp(0) === 0) text += '、用未经人事的阴部、把阴茎迎进去';
    else text += '……';
    era.print(text);
    if (target_exp(0) >= EXPLV[3]) {
      const body = target_talent(99)
        ? '整个身子压上来'
        : target_talent(100)
          ? '娇小的身躯拼命地'
          : '';
      const pregnancy =
        target_talent(153) &&
        target_value('cflag', 110) <= era_flag.day_count + 10
          ? '抱着怀孕的大肚子、'
          : '';
      const breasts =
        target_talent(110) || target_talent(114)
          ? '高城深堑的傲人的双峰欢快地晃荡着、'
          : '';
      era.print(`${target}${body}${pregnancy}${breasts}自己主动扭着腰…`);
    }
  }
}
async function train_message_b_35() {
  const skin = target_talent(244)
    ? '蓝色'
    : target_talent(253)
      ? '褐色'
      : target_talent(255)
        ? '白皙'
        : '';
  const action = target_talent(99)
    ? `完全包裹着${player_name()}、`
    : target_talent(100)
      ? `娇小的身体努力在${player_name()}身上推擦着、`
      : target_talent(110) || target_talent(114)
        ? `用丰满诱人的胸部擦蹭着${player_name()}的皮肤、`
        : `擦拭着${player_name()}的全身、`;
  era.print(
    `${target_name()}用泡沫涂满自己${skin}的肌肤、${target_talent(85) ? '带着情意殷殷的表情、' : ''}${action}爱抚着…`,
  );
}
async function train_message_b_36() {
  const target = target_name();
  const player = player_name();
  if (target_tequip(88)) {
    era.print(
      `${target}跨坐在${monster_name(e_get(300))}的上方，对准勃起的阴茎、自己主动沉下腰插进去了……`,
    );
  } else if (game.event.插着不拔 && era_flag.prevcom === 36 && same_trainer()) {
    era.print(`${target}紧紧地夹着体内的阴茎、再次开始扭动腰了…`);
  } else if (
    game.event.插着不拔 &&
    [26, 22, 28, 29].includes(era_flag.prevcom) &&
    same_trainer()
  ) {
    era.print(`${player}保持着抽插、将${target}抱起、从下方挺动着腰…`);
  } else {
    era.print(
      `${target}跨到${player}的上面、${target_palam(3) >= PALAMLV[4] ? '充满粘液的' : ''}肛门、慢慢地把整根阴茎吞入了……`,
    );
  }
  if (target_exp(0) >= EXPLV[3]) {
    const body = target_talent(99)
      ? '整个身子压上来'
      : target_talent(100)
        ? '娇小的身躯拼命地'
        : '';
    const breasts =
      target_talent(110) || target_talent(114)
        ? '高城深堑的傲人的双峰欢快地晃荡着、'
        : '';
    era.print(`${target}${body}${breasts}自己主动扭着腰…`);
  }
}
async function train_message_b_37() {
  era.print(
    target_tequip(89)
      ? `${target_name()}舔舐着狗的肛门……`
      : `${target_name()}细致地舔舐着${player_name()}的肛门…`,
  );
}
async function train_message_b_38() {
  const style =
    target_talent(83) || target_abl(20) > 2
      ? '践踏般'
      : target_talent(85) || target_talent(76)
        ? '精心地'
        : '';
  era.print(`${target_name()}用脚夹着${player_name()}的阴茎${style}玩弄着…`);
}

/** EVENT_TRAIN_MESSAGE_A :30-108：COM33 的公共股间性交射精分支。 */
function train_message_a_crotch_ejaculation() {
  if (era_flag.selectcom !== 33) return;

  const target = target_name();
  const player = player_name();
  const skin = (id) =>
    value('talent', id, 244)
      ? '蓝色'
      : value('talent', id, 253)
        ? '褐色'
        : value('talent', id, 255)
          ? '白皙'
          : '';
  const player_ejac = era.get('tflag:9') || 0;

  if (player_ejac === 0) {
    const target_ejac = era.get('tflag:10') || 0;
    if (target_ejac > 0 && skin(era_flag.player)) {
      era.print(
        `${target}射出的${target_ejac >= 2 ? '大量' : ''}精液、把${player}的${skin(era_flag.player)}肌肤弄脏了…`,
      );
    }
  } else if (player_ejac === 1) {
    era.print(`射出的精液、把${target}的${skin(era_flag.target)}肌肤弄脏了…`);
  } else if (player_ejac === 2) {
    era.print(`${target}的${skin(era_flag.target)}肌肤被射出的大量精液沾满了…`);
  }
}

// A 文只有 TFLAG 链；按真实旗标注册在本族可达的 SELECTCOM，避免把九条写成错误的孤立指令分支。
async function train_message_a_service() {
  train_message_a_crotch_ejaculation();
  const target = target_name();
  const semen_poison = target_abl(32);
  const fainted = (era.get('tflag:899') || 0) > 1;
  if (game.event.犬射精或处刑口上 > 0) {
    const site = { 30: '手上', 31: '嘴里', 34: '私处里' }[era_flag.selectcom];
    if (site) era.print(`${target}的${site}、被狗灌入了那又臭又热的精液…`);
  } else if (era.get('tflag:0') === 1) {
    if (era_flag.selectcom === 31) {
      era.print(
        semen_poison >= 3
          ? `${target}带着恍惚的表情、把注入口中的精液喝光了…`
          : target_abl(16) >= 3
            ? `${target}喉咙发出模糊不清的声音、把注入口中的精液喝光了…`
            : `精液注入到${target}的嘴里了…`,
      );
    } else if (era_flag.selectcom === 32) {
      const skin = target_talent(244)
        ? '蓝色的'
        : target_talent(253)
          ? '褐色的'
          : target_talent(255)
            ? '白皙的'
            : '';
      era.print(
        target_talent(110) || target_talent(114)
          ? `${target}${skin}圆润挺拔的诱惑豪乳之间、积存着精液…`
          : `${target}${skin}胸口到脸之间、精液四处飞散着…`,
      );
    }
  } else if (era.get('tflag:0') === 2) {
    if (era_flag.selectcom === 31) {
      era.print(
        semen_poison >= 3
          ? `${target}带着恍惚的表情、把口中的精液喝光了…`
          : target_abl(16) >= 3
            ? `没喝完的精液、从${target}的嘴里溢出来了…`
            : `满满的精液、把${target}的喉咙叩开了…`,
      );
    } else if (era_flag.selectcom === 32) {
      const skin = target_talent(244)
        ? '蓝色的'
        : target_talent(253)
          ? '褐色的'
          : target_talent(255)
            ? '白皙的'
            : '';
      era.print(
        `大量的精液飞散而出、${target}${skin}胸部和脸之间、全被射满了…`,
      );
    }
  } else if (game.train.手中射精 === 1) {
    const prefix =
      !fainted && target_exp(20) === 0
        ? '带着惊讶的神情、'
        : !fainted && semen_poison > 2
          ? '带着恍惚的表情、'
          : '';
    era.print(`${prefix}精液射到${target}的身上了…`);
  } else if (game.train.手中射精 === 2) {
    const prefix =
      !fainted && target_exp(20) === 0
        ? '带着惊讶的神情、'
        : !fainted && semen_poison > 2
          ? '带着恍惚的表情、'
          : '';
    era.print(`${prefix}${target}的脸上、手上、沾满了大量的精液…`);
  } else if (game.dungeon.足交射精或处遇口上 === 1) {
    era.print(
      `${target}${(target_talent(83) || target_abl(20) > 2) && !target_talent(85) ? '带着轻蔑的眼神、' : ''}看着你将热乎乎的精液射到她的脚上了…`,
    );
  } else if (game.dungeon.足交射精或处遇口上 === 2) {
    era.print(
      `${target}${(target_talent(83) || target_abl(20) > 2) && !target_talent(85) ? '带着轻蔑的眼神、' : ''}看着你将大量热乎乎的精液射到她的脚上了…`,
    );
  }
}

/** EVENT_TRAIN_MESSAGE_A :1175-1203：骑乘位的肛门快感增量反应。 */
function train_message_a_riding_reaction() {
  const target = target_name();
  const pleasure = era.get(`delta:${era_flag.target}:2`) || 0;
  if (pleasure < 299) {
    era.print(`${target}遵从命令、痛苦地扭动着腰身。看来、离获得快感还很远。`);
  } else if (pleasure < 1000) {
    era.print(`从${target}痛苦的表情中、寻找到一丝快乐的神色。`);
  } else if (pleasure < 3000) {
    era.print(`${target}一边扭动着腰、一边忍不住发出了可爱的呻吟。`);
  } else if (pleasure < 6000) {
    if (target_talent(110) || target_talent(114)) {
      era.print(
        `${player_name()}的眼前、${target}一双傲人的人间胸器正随着腰部运动上下跳跃着、完全沉浸在快感之中了。`,
      );
    }
    if (!target_talent(110)) {
      era.print(
        `${target}已经习惯了吗、积极主动地扭动着腰肢、寻求着人间极乐。`,
      );
    }
  } else if (pleasure < 10000) {
    const body = target_talent(99)
      ? '修长的身体'
      : target_talent(100)
        ? '娇小的身体'
        : '';
    era.print(
      target_talent(32) || target_talent(71)
        ? `${target}${body}一边说着否定快感的话语、一边无法抑制地发出越来越高亢的呻吟。`
        : `${target}${body}拼命地在扭腰挺胸。发出的愉悦呻吟越来越高亢了。`,
    );
  } else {
    era.print(`${target}的腰身动作缓下来了、不过还是一副请继续侵犯我的表情。`);
  }
}

async function train_message_a_riding() {
  await train_message_a_service();
  // 延迟读取：主启动图的 COM20–29 注册仍仅由 com-sex 自己负责；本族只在
  // 实际渲染骑乘 A 文时复用其无注册 helper。
  const { train_message_a_sex_common } = require('#/system/train/com-sex');
  await train_message_a_sex_common();
  // 原作同一 IF / ELSEIF 链：玩家性交射精时已走 TFLAG:2 段，不能再叠骑乘反应。
  if ((era.get('tflag:2') || 0) === 0) train_message_a_riding_reaction();
}

// —— GET_ADV_COM CASE30-34 ——
function same_trainer() {
  return era_flag.assiplay
    ? game.system.上次调教者是助手 !== 0
    : game.system.上次调教者是助手 === 0;
}
const adv_able = (id) => com_able_family.call(id, { whenMissing: 0 });

adv_com_family.register(30, async () => {
  if (
    same_trainer() &&
    [31, 123, 124, 125, 127].includes(era_flag.prevcom) &&
    (await adv_able(126)) === 1
  )
    return 126;
  return 30;
});
adv_com_family.register(31, async (rand) => {
  const prev = era_flag.prevcom;
  if (same_trainer() && [1, 4, 69].includes(prev) && (await adv_able(69)) === 1)
    return 69;
  if (same_trainer() && prev === 32 && (await adv_able(123)) === 1) return 123;
  if (same_trainer() && prev === 3 && (await adv_able(125)) === 1) return 125;
  if (same_trainer() && [31, 123, 125, 126].includes(prev)) {
    const advanced = rand(11) > 5 ? 124 : 127;
    if ((await adv_able(advanced)) === 1) return advanced;
  }
  if (same_trainer() && prev === 30 && (await adv_able(126)) === 1) return 126;
  game.train.三人PLAY持续 = 0;
  if (prev === 64 && (await adv_able(64)) === 1) {
    game.train.三人PLAY持续 = 1;
    return 64;
  }
  if (
    ((era_flag.assiplay && !game.system.上次调教者是助手) ||
      (!era_flag.assiplay && game.system.上次调教者是助手)) &&
    !target_tequip(89) &&
    [20, 21, 27].includes(prev) &&
    (await adv_able(64)) === 1
  )
    return 64;
  return 31;
});
adv_com_family.register(32, async () => {
  if (
    same_trainer() &&
    [31, 124, 125, 126, 127].includes(era_flag.prevcom) &&
    (await adv_able(123)) === 1
  )
    return 123;
  return 32;
});
adv_com_family.register(33, async () => {
  if (
    !era_flag.assiplay &&
    (era_flag.prevcom === 70 ||
      (game.system.上次调教者是助手 && era_flag.prevcom === 63)) &&
    (await adv_able(70)) === 1
  )
    return 70;
  return 33;
});
adv_com_family.register(34, async (rand) => {
  if (era_flag.prevcom !== 34 || player_abl(12) <= 2 || !same_trainer())
    return 34;
  if (Math.floor(game.train.自由调教跳转 / 1000) === 5)
    return game.train.自由调教跳转 % 1000;
  const lust = Math.min(level(target_palam(5)) + 1, 5);
  const score = lust * rand(11) + rand(11) * target_abl(2);
  const advanced = score >= 50 ? 121 : 120;
  if ((await adv_able(advanced)) === 1) {
    game.train.自由调教跳转 = 5000 + advanced;
    return advanced;
  }
  return 34;
});

for (const [id, fn] of [
  [30, com30],
  [31, com31],
  [32, com32],
  [33, com33],
  [34, com34],
  [35, com35],
  [36, com36],
  [37, com37],
  [38, com38],
])
  com_family.register(id, fn);

for (const [id, fn] of [
  [30, train_message_b_30],
  [31, train_message_b_31],
  [32, train_message_b_32],
  [33, train_message_b_33],
  [34, train_message_b_34],
  [35, train_message_b_35],
  [36, train_message_b_36],
  [37, train_message_b_37],
  [38, train_message_b_38],
])
  train_message_b_family.register(id, fn);

for (const id of [30, 31, 32, 33, 35, 37, 38])
  train_message_a_family.register(id, train_message_a_service);
for (const id of [34, 36])
  train_message_a_family.register(id, train_message_a_riding);

module.exports = { STUBBED_CALLS, times };
