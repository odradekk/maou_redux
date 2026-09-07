/**
 * @file 据点域的角色出售、估价与调教后零散结算（issue #335/#339）。
 *
 * 源: target/ERB/售卻相關/SELL_CHARA_ESTIMATE.ERB @ESTIMATE_CHARA（:109-899）
 *     target/ERB/售卻相關/SELL_CHARA.ERB（:6-451）
 *     @CHECK_SELLASSIABLE / @CHARA_SALE / @KILL_TARGET /
 *     @LONG_GOOD_BYE / @SALE_CHARA
 *     target/ERB/售卻相關/SELL_MILK.ERB @SELL_MILK（:6-57）
 *     target/ERB/售卻相關/SELL_FIGHTMONEY.ERB @SELL_FIGHTMONEY（:2-18）
 *
 * ESTIMATE_CHARA 的 A/B/E/T/O 临时数组改成带语义的返回对象，供后续
 * SALE_CHARA 原样渲染明细；每个百分比仍按原作顺序立即做整数除法，不能
 * 合并倍率。原作自定义 SAVEDATA「卖淫影响」来自阶段 6 的魔改目录，当前
 * 没有运行时槽位，因此由调用方显式传入，缺省值保持 Emuera 初值 0。
 *
 * 变量语义：ABL 0-3 = 阴蒂/乳房/私处/肛门感觉，10-17 = 顺从/欲望/
 * 技巧/侍奉技术/露出/话术/侍奉精神/露出癖，20-23 = 抖S/抖M/百合/断背
 * 气质，30-33/37/39 = 性交/肛交/精液/百合/卖淫/兽奸中毒；EXP 54/60/74
 * = 挤奶/生育/卖淫经验；E 74 = 上次估价留下的卖淫经验倍率；CFLAG 71
 * = 处女丧失时是否纯洁；TFLAG 35/402
 * = 本轮母乳量/死斗场收入；TEQUIP 55 = 死斗场观战中；ITEM 35 = 观战卷；
 * EX_FLAG 4444 = 非作弊资金。TALENT 0/9/12/15/20-22/24/27/33/42/46/63/
 * 70/71/73/76/91/92 = 处女/崩坏/刚强/高姿态/克制/冷漠/感情淡薄/
 * 保守的/戒备森严/开放/容易湿/药物上瘾/献身的/接受快感/否定快感/
 * 容易陷落/淫乱/魅惑/谜之魅力；100/109/110/113/114/116/119/121-123/
 * 125/126/130/132/135/153/180/181/248/253/255/314 = 娇小/贫乳/巨乳/
 * 魅力/爆乳/绝壁/超乳/扶她/男人/疯狂/白虎/高人气/母乳体质/幼稚/
 * 未熟/妊娠/妓女/倾城/肌肉型/褐色肌肤/白皙/种族；101/103/105/107
 * = 阴蒂/私处/肛门/乳房钝感；165、167-178 是稀有人物身份组。
 */

const era = require('#/era-electron');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { remember_sale_price } = require('#/event/event-aftertrain');
const { name_reset } = require('#/chara/char-make');
const { get_look_info } = require('#/kojo/kojo-dungeon-bitch-log');
const { self_kojo } = require('#/kojo/kojo-system');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { EXPLV } = require('#/era-utils/exp-level');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { chara_callname, chara_nickname } = require('#/utils/callname-utils');

const MAX_SALE_PRICE = 25_000_000;
const MAX_MILK_AMOUNT = 600;
const MAX_MILK_PRICE = 40_000;
const MAX_FIGHT_INCOME = 12_000;

/** @CHECK_SELLASSIABLE：检查角色是否解锁出售或助手资格。 */
async function check_sellassiable(cid = era_flag.target) {
  if (!era.getAddedCharacters().includes(cid)) return 0;

  const ability = (id) => value('abl', cid, id);
  const talent = (id) => value('talent', cid, id);
  if (ability(10) + ability(11) < 6) return 0;
  if ([0, 1, 2, 3].every((id) => ability(id) < 3)) return 0;
  if (ability(10) < 4 && (talent(11) || talent(12))) return 0;
  if (ability(11) < 4 && (talent(20) || talent(32) || talent(34))) {
    return 0;
  }

  const sellable =
    (ability(12) >= 3 && ability(16) >= 3) ||
    (ability(17) >= 3 && ability(31) >= 2) ||
    ability(21) >= 3 ||
    [0, 1, 2, 3].reduce((sum, id) => sum + ability(id), 0) >= 13 ||
    ability(10) >= 5 ||
    ability(11) >= 5;
  if (!sellable) return 0;

  const name = chara_callname(cid);
  if (chara(cid).stronghold.出售与助手资格 <= 0) {
    era.print(`${name}可以卖掉了`);
    await era.waitAnyKey();
    chara(cid).stronghold.出售与助手资格 = 1;
  }

  const assistable =
    (ability(10) >= 3 &&
      ability(11) >= 3 &&
      ability(12) >= 3 &&
      ability(0) >= 3 &&
      ability(22) >= 3) ||
    (ability(10) >= 5 && ability(11) >= 4);
  if (assistable && chara(cid).stronghold.出售与助手资格 <= 1) {
    era.print(`${name}可以做调教助手了`);
    await era.waitAnyKey();
    chara(cid).stronghold.出售与助手资格 = 2;
  }
  return 0;
}

const ADDITION_TABLES = {
  10: [0, 200, 500, 850, 1500, 2000, 2300, 2600, 3000, 3200, 3500],
  11: [10, 100, 300, 700, 1200, 2000, 2300, 2600, 3000, 3200, 3500],
  12: [0, 100, 200, 400, 700, 1200, 1500, 1800, 2200, 2600, 3000],
  13: [0, 100, 150, 300, 500, 800, 2000, 2500, 3000, 3800, 5000],
  14: [0, 100, 150, 300, 500, 800, 2000, 2500, 3000, 3800, 5000],
  15: [0, 50, 120, 200, 300, 450, 1000, 1400, 2100, 2800, 3500],
  30: [0, 250, 500, 750, 1000, 1300],
  31: [0, 250, 500, 750, 1000, 1300],
  32: [0, 300, 600, 900, 1300, 1700],
  33: [0, 250, 500, 750, 1000, 1300],
  37: [0, 500, 1000, 2000, 4000, 10000],
  39: [0, 100, 300, 500, 1000, 1700, 3000],
};

function value(table, cid, id) {
  return era.get(`${table}:${cid}:${id}`) || 0;
}

function multiply_percent(amount, percent) {
  return Math.trunc((amount * percent) / 100);
}

function table_value(table, level) {
  return table[Math.min(Math.max(Math.trunc(level), 0), table.length - 1)];
}

function clitoris_multiplier(level) {
  if (level <= 3) return 100;
  if (level <= 10)
    return [0, 0, 0, 0, 110, 120, 130, 140, 150, 170, 200][level];
  if (level <= 15) return level * 10 + 100;
  if (level <= 20) return level * 25 - 125;
  if (level <= 25) return level * 40 - 425;
  return 100;
}

function breast_multiplier(level) {
  if (level <= 2) return 100;
  if (level <= 10)
    return [0, 0, 0, 110, 120, 130, 140, 150, 160, 180, 200][level];
  if (level <= 15) return level * 10 + 100;
  if (level <= 20) return level * 25 - 125;
  if (level <= 25) return level * 32 - 265;
  return 100;
}

function vagina_multiplier(level) {
  if (level <= 2) return 100;
  if (level <= 10)
    return [0, 0, 0, 110, 120, 140, 150, 160, 170, 190, 200][level];
  if (level <= 15) return level * 10 + 100;
  if (level <= 20) return level * 18 - 20;
  if (level <= 25) return level * 30 - 260;
  return 100;
}

function anal_multiplier(level) {
  if (level <= 1) return 100;
  if (level <= 10)
    return [0, 0, 110, 120, 140, 160, 180, 190, 200, 230, 250][level];
  if (level <= 15) return level * 10 + 150;
  if (level <= 20) return level * 19 + 15;
  if (level <= 25) return level * 28 - 165;
  return 100;
}

function mild_disposition_multiplier(level) {
  if (level <= 2) return 100;
  if (level === 3) return 110;
  if (level === 4) return 130;
  if (level <= 7) return 150;
  return 180;
}

function sadomasochism_multiplier(level) {
  if (level <= 2) return 100;
  if (level === 3) return 130;
  if (level === 4) return 140;
  if (level === 5) return 150;
  if (level <= 7) return 200;
  if (level <= 9) return 250;
  return 300;
}

function update_prostitution_exp_multiplier(exp, talent, prostitution_effect) {
  if (exp <= 0) {
    era.set('e:74', 100);
    return;
  }
  if (prostitution_effect === 0) {
    let multiplier = exp < 50 ? 40 : 20;
    if (talent(181)) multiplier = 80;
    else if (talent(180)) multiplier = 60;
    era.set('e:74', multiplier);
  }
  if (prostitution_effect === 1) {
    let multiplier = exp < 500 ? 120 : 150;
    if (talent(181)) multiplier = exp > 5000 ? 300 : 250;
    else if (talent(180)) multiplier = 200;
    era.set('e:74', multiplier);
  }
}

function birth_exp_multiplier(exp) {
  if (exp === 0) return 100;
  if (exp === 1) return 50;
  if (exp === 2) return 20;
  return 10;
}

function apply_talent_multipliers(
  cid,
  talent,
  ability,
  multipliers,
  prostitution_effect,
) {
  if (talent(0)) multipliers[0] = value('cflag', cid, 71) === 0 ? 200 : 150;
  if (talent(12) && ability(10) >= 3) multipliers[12] = 120;
  if (talent(15) && ability(10) >= 3) multipliers[15] = 120;
  for (const id of [20, 21, 22, 24]) {
    if (talent(id) && ability(11) <= 3) multipliers[id] = 80;
  }
  if (talent(27) && ability(10) <= 3) multipliers[27] = 80;
  for (const id of [33, 42, 63]) if (talent(id)) multipliers[id] = 120;
  if (talent(46)) multipliers[46] = 20;
  if (talent(70) && ability(11) >= 3) multipliers[70] = 120;
  if (talent(71) && ability(11) <= 3) multipliers[71] = 60;
  if (talent(73)) multipliers[73] = 20;
  if (talent(76)) multipliers[76] = 150;
  if (talent(91)) multipliers[91] = 150;
  if (talent(92)) multipliers[92] = 400;
  if (talent(109) && !talent(100) && !talent(132) && !talent(135)) {
    multipliers[109] = 90;
  }
  if (talent(110)) multipliers[110] = 150;
  if (talent(113)) multipliers[113] = 150;
  if (talent(114)) multipliers[114] = 160;
  if (talent(119)) multipliers[119] = 170;
  if (talent(116) && !talent(132) && !talent(135)) multipliers[116] = 50;
  if (talent(121)) multipliers[121] = 200;
  if (talent(122) && !talent(113) && !talent(132) && !talent(135)) {
    if (ability(10) <= 3 || ability(11) <= 3 || ability(23) <= 1) {
      multipliers[122] = 40;
    } else if (ability(10) <= 4 || ability(11) <= 4 || ability(23) <= 2) {
      multipliers[122] = 60;
    } else if (ability(10) <= 5 || ability(11) <= 5 || ability(23) <= 3) {
      multipliers[122] = 80;
    }
  }
  if (talent(125)) multipliers[125] = 120;
  if (talent(126)) multipliers[126] = 150;
  if (talent(130)) multipliers[130] = 140;
  if (talent(135)) multipliers[135] = 50;
  if (talent(180) && !talent(181)) {
    if (prostitution_effect === 0) multipliers[180] = 80;
    else if (prostitution_effect === 1) multipliers[180] = 120;
  }
  if (talent(181)) multipliers[181] = 150;
  if (talent(248)) multipliers[248] = 60;
  if (talent(253)) multipliers[253] = 80;
  if (talent(255)) multipliers[255] = 120;

  if ([165, 167, 168, 169, 170, 171, 174, 175, 176, 177, 178].some(talent)) {
    multipliers[310] = 400;
  }

  multipliers[314] =
    [100, 120, 110, 120, 110, 180, 200, 120, 200, 120, 80, 80][talent(314)] ??
    100;

  const fall_multiplier = ability(10) * 5;
  if (talent(9)) multipliers[9] = fall_multiplier;
  else if (talent(123)) multipliers[123] = fall_multiplier;
  else if (talent(153)) multipliers[153] = fall_multiplier;
}

/**
 * 计算角色售价与 SALE_CHARA 要显示的逐项明细。
 * @param {number} [cid] 原作 TARGET
 * @param {{prostitution_effect?: number}} [options] 卖淫影响：0 负面、1 正面、2 无影响
 */
function estimate_chara(
  cid = era_flag.target,
  { prostitution_effect = 0 } = {},
) {
  const ability = (id) => value('abl', cid, id);
  const talent = (id) => value('talent', cid, id);
  const experience = (id) => value('exp', cid, id);

  const ability_additions = Array(40).fill(0);
  for (const [id_text, table] of Object.entries(ADDITION_TABLES)) {
    const id = Number(id_text);
    ability_additions[id] = table_value(table, ability(id));
  }

  let price = [10, 11, 12, 13, 14, 15, 30, 31, 32, 33].reduce(
    (sum, id) => sum + ability_additions[id],
    0,
  );
  if (prostitution_effect === 0) price -= ability_additions[37];
  else if (prostitution_effect === 1) {
    price += Math.trunc(ability_additions[37] / 2);
  }
  price += ability_additions[39];

  const sense_lock_penalties = [101, 103, 105, 107].map((id) =>
    talent(id) & 2 ? 150 : 0,
  );
  price -= sense_lock_penalties.reduce((sum, amount) => sum + amount, 0);

  const ability_multipliers = Array(40).fill(100);
  ability_multipliers[0] = clitoris_multiplier(ability(0));
  ability_multipliers[1] = breast_multiplier(ability(1));
  ability_multipliers[2] = vagina_multiplier(ability(2));
  ability_multipliers[3] = anal_multiplier(ability(3));
  for (const id of [16, 17, 22, 23]) {
    ability_multipliers[id] = mild_disposition_multiplier(ability(id));
  }
  for (const id of [20, 21]) {
    ability_multipliers[id] = sadomasochism_multiplier(ability(id));
  }
  for (const id of [0, 1, 2, 3, 16, 17, 20, 21, 22, 23]) {
    price = multiply_percent(price, ability_multipliers[id]);
  }

  const experience_multipliers = Array(75).fill(100);
  update_prostitution_exp_multiplier(
    experience(74),
    talent,
    prostitution_effect,
  );
  // 原作缺陷 1:1（#14）：EXP:74 > 0 且卖淫影响为 2 时不写可保存的 E:74，
  // 因而沿用上次估价的倍率；首次调用读到 0，会把售价直接归零。
  experience_multipliers[74] = era.get('e:74') || 0;
  price = multiply_percent(price, experience_multipliers[74]);
  experience_multipliers[60] = birth_exp_multiplier(experience(60));
  price = multiply_percent(price, experience_multipliers[60]);

  const talent_multipliers = Array(400).fill(100);
  apply_talent_multipliers(
    cid,
    talent,
    ability,
    talent_multipliers,
    prostitution_effect,
  );
  for (const multiplier of talent_multipliers) {
    if (multiplier !== 100) price = multiply_percent(price, multiplier);
  }

  // ISASSI 是角色 CSV 的独立字段，不是 ASSI 指针。本作全部角色 CSV 都没写
  // 「助手」字段，ERB 也没有赋值路径，故两个 ISASSI 分支在原数据中恒不达。
  const former_assistant_multiplier = 100;
  price = multiply_percent(price, former_assistant_multiplier);

  const merchant_multiplier = 100;
  price = multiply_percent(price, merchant_multiplier);

  return {
    price: Math.min(price, MAX_SALE_PRICE),
    ability_additions,
    sense_lock_penalties,
    ability_multipliers,
    experience_multipliers,
    talent_multipliers,
    former_assistant_multiplier,
    merchant_multiplier,
  };
}

function percent_text(percent) {
  return `${Math.trunc(percent / 100)}.${String(Math.abs(percent % 100)).padStart(2, '0')}`;
}

function static_name(table, id, fallback = '') {
  return era.get(`${table}name:${id}`) ?? fallback;
}

function print_sale_details(cid, details, prostitution_effect) {
  const ability = (id) => value('abl', cid, id);
  for (const id of [10, 11, 12, 13, 14, 15, 30, 31, 32, 33, 39]) {
    const addition = details.ability_additions[id];
    if (addition > 0) {
      era.print(`${static_name('abl', id)} LV${ability(id)} ＋${addition}`);
    }
  }
  if (details.ability_additions[37] > 0) {
    if (prostitution_effect === 0) {
      era.print(
        `${static_name('abl', 37)} LV${ability(37)} －${details.ability_additions[37]}`,
      );
    } else if (prostitution_effect === 1) {
      era.print(
        `${static_name('abl', 37)} LV${ability(37)} ＋${details.ability_additions[37]}`,
      );
    }
  }

  ['阴核', '私处', '肛门', '乳房'].forEach((part, id) => {
    const penalty = details.sense_lock_penalties[id];
    if (penalty > 0) era.print(`${part}感觉封锁 －${penalty}`);
  });

  for (const id of [0, 1, 2, 3, 16, 17, 20, 21, 22, 23]) {
    const multiplier = details.ability_multipliers[id];
    if (multiplier !== 100) {
      const name =
        id === 0 && (value('talent', cid, 121) || value('talent', cid, 122))
          ? '阴茎感觉'
          : static_name('abl', id);
      era.print(`${name} LV${ability(id)} × ${percent_text(multiplier)}`);
    }
  }

  const prostitution_exp = value('exp', cid, 74);
  if (prostitution_exp > 0 && prostitution_effect !== 2) {
    const kind = prostitution_effect === 0 ? '负面' : '正面';
    era.print(
      `${static_name('exp', 74)} × ${percent_text(details.experience_multipliers[74])} (经验:${prostitution_exp}，得出的${kind}倍率)`,
    );
  }
  if (details.experience_multipliers[60] !== 100) {
    era.print(
      `${static_name('exp', 60)} × ${percent_text(details.experience_multipliers[60])} (经验:${value('exp', cid, 60)}，得出的负面倍率)`,
    );
  }

  for (let id = 0; id < 300; id += 1) {
    const multiplier = details.talent_multipliers[id];
    if (multiplier !== 100) {
      era.print(
        `${static_name('talent', id, String(id))} × ${percent_text(multiplier)}`,
      );
    }
  }
  if (details.talent_multipliers[310] !== 100) {
    era.print(`稀有人物 × ${percent_text(details.talent_multipliers[310])}`);
  }
  if (details.former_assistant_multiplier !== 100) {
    era.print(`原助手 × ${percent_text(details.former_assistant_multiplier)}`);
  }
  era.print(
    `种族:${get_look_info(cid, '种族')} × ${percent_text(details.talent_multipliers[314])}`,
  );
  if (details.merchant_multiplier !== 100) {
    era.print(`价钱谈判 × ${percent_text(details.merchant_multiplier)}`);
  }
}

/** @SALE_CHARA：显示估价明细并让玩家确认出售。 */
async function sale_chara(
  cid = era_flag.target,
  { prostitution_effect = 0, rand } = {},
) {
  const details = estimate_chara(cid, { prostitution_effect });
  const { price } = details;
  const name = chara_callname(cid);
  print_sale_details(cid, details, prostitution_effect);
  era.print(`${name}能卖出${price}点的样子。`);
  era.print(`把${name}卖掉吗？`);
  era.printButton('好的', 0);
  era.printButton('不要', 1);

  for (;;) {
    const result = await era.input();
    if (result === 0) {
      remember_sale_price(price);
      // Emuera 在据点也可写 TFLAG；EraElectron 的 tflag 表只存在于
      // 调教期。这里改用口上调用链内的事件码，不伪造调教结算。
      await game.train.with_self_kojo_event(6, () =>
        self_kojo(rand, undefined, true),
      );
      era.print(`${name}以${price}点卖掉了。`);
      await era.waitAnyKey();
      era_flag.money += price;
      era_exflag.legit_money += price;
      if (!value('talent', cid, 220) && !value('ex_talent', cid, 1)) {
        era_exflag.prestige += 5;
        era.print('威望值增加');
      } else {
        era_exflag.prestige -= 10;
        era.print('威望值减少');
      }
      return price;
    }
    if (result === 1) {
      remember_sale_price(-1);
      return -1;
    }
  }
}

/** @LONG_GOOD_BYE：出售前结算其他角色的送别与崩坏。 */
async function long_good_bye(cid = era_flag.target) {
  for (const other of era.getAddedCharacters()) {
    if (other === 0) continue;
    let stress = 0;
    for (const id of [21, 22, 23, 24, 25]) {
      const relation_id = value('cflag', other, id);
      if (cid === relation_id % 100 && Math.trunc(relation_id / 100) < 2) {
        stress += 40;
      }
      if (cid === relation_id % 100) stress += 80;
    }
    const relation = value('relation', other, cid);
    if (relation > 100) stress += relation - 100;
    if (stress <= 50) continue;

    era.drawLine();
    era.println();
    era.print(
      `那天，${chara_callname(other)}被卖掉的${chara_callname(cid)}坐在马车上，`,
    );
    era.print(
      `${value('talent', other, 45) ? '' : '泪眼朦胧了。'}视在脱离视野之前，`,
    );
    era.print('甚至在离开视野之后，也一直在目送着。');
    await era.waitAnyKey();

    if (value('talent', other, 85)) stress -= 120;
    if (value('talent', other, 76)) stress -= 60;
    if (value('talent', other, 12)) stress -= 20;
    if (value('talent', other, 22)) stress -= 20;
    if (value('talent', other, 134)) stress += 20;
    stress -= value('abl', other, 10) * 10;
    stress += value('mark', other, 3) * 30;

    if (stress >= 100 && !chara(other).stronghold.崩坏) {
      era.drawLine();
      const name = chara_nickname(other);
      era.print(`${name}在目瞪口呆的表情中，`);
      era.print(`${name}心里什么东西坏掉了……`);
      era.print(`${name}的精神【${static_name('talent', 9)}】了。`);
      await era.waitAnyKey();
      for (const talent_id of [85, 76]) {
        if (value('talent', other, talent_id)) {
          era.print(`${name}的【${static_name('talent', talent_id)}】失去了。`);
          era.set(`talent:${other}:${talent_id}`, 0);
        }
      }
      chara(other).stronghold.崩坏 = 1;
      await era.waitAnyKey();
    }
  }
  return 0;
}

/** @KILL_TARGET：把已售角色从队伍和已加入角色中除名。 */
async function kill_target(cid = era_flag.target) {
  era.set(`flag:${cid + 199}`, 1);
  party_char_del(cid);
  era.removeCharacter(cid);

  // FLAG:1/2 属 event 域；跨域写经其具名门面。ere 的角色 ID
  // 在 removeCharacter 后不重排（#21），故原作 185–188 行的序号减一是死语义。
  if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
  if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  era_flag.target = game.event.上次调教对象;
  era_flag.assi = game.event.上次助手;
  await name_reset();
  return 0;
}

function sale_candidate(cid) {
  return (
    cid !== 0 &&
    chara(cid).stronghold.出售与助手资格 >= 1 &&
    value('base', cid, 0) >= 1 &&
    !value('talent', cid, 292) &&
    value('cflag', cid, 1) === 0
  );
}

/** @CHARA_SALE：据点的角色出售列表与完整出售流程。 */
async function chara_sale({ prostitution_effect = 0, rand } = {}) {
  for (;;) {
    // 源行 164 RESTART：每完成或取消一单都从函数头重画。
    era.drawLine();
    era.print(
      `${era_flag.day_count + 1}日  ${era_flag.time === 0 ? '上午' : '下午'}`,
    );
    era.print(`所持金：${era_flag.money}点`);
    era.drawLine();
    era.print('要卖掉谁呢？');
    era.drawLine({ content: '‥' });
    for (const cid of era.getAddedCharacters()) {
      if (!sale_candidate(cid)) continue;
      // 源行 77 TARGET = COUNT：列表估价会把全局目标留在最后一名候选人。
      // 取消单次出售时原作会恢复这个值，而非进入页面前的目标。
      era_flag.target = cid;
      const { price } = estimate_chara(cid, { prostitution_effect });
      const price_text =
        price > 0
          ? `[评价额:${price.toLocaleString('en-US')}点]`
          : '[不能卖掉]';
      const favorite = value('cflag', cid, 700) ? ' [☆]' : '';
      era.printButton(`${chara_callname(cid)} ${price_text}${favorite}`, cid);
    }
    era.drawLine({ content: '‥' });
    era.printButton('- 返回', 999);
    const selected = await era.input({ useRule: false });
    if (selected === 999) {
      era_flag.target = game.event.上次调教对象;
      return 999;
    }
    if (!era.getAddedCharacters().includes(selected) || selected === 0)
      continue;
    if (chara(selected).stronghold.出售与助手资格 < 1) continue;
    if (value('base', selected, 0) < 1) continue;
    if (value('cflag', selected, 700)) {
      era.print(`${chara_callname(selected)}在你的收藏列表里，不能卖掉。`);
      await era.waitAnyKey();
      continue;
    }
    if (value('talent', selected, 292)) {
      era.print(
        `${chara_callname(selected)}只是影子，一旦与你分离便会烟消云散，因此无法卖掉。`,
      );
      await era.waitAnyKey();
      continue;
    }

    const previous_target = era.getAddedCharacters().includes(era_flag.target)
      ? era_flag.target
      : -1;
    era_flag.target = selected;
    const price = await sale_chara(selected, { prostitution_effect, rand });
    if (price > 0) {
      await long_good_bye(selected);
      await kill_target(selected);
      // 原作成功售出时 T = -1，不恢复旧目标。
      era_flag.target = -1;
    } else {
      era_flag.target = era.getAddedCharacters().includes(previous_target)
        ? previous_target
        : -1;
    }
    // RESTART：继续本循环，只有 [999] 返回据点。
  }
}

/** @SELL_MILK：调教结束时出售本轮榨出的母乳。 */
async function sell_milk() {
  const target = era_flag.target;
  if (!era.getAddedCharacters().includes(target)) return 0;

  const amount = Math.min((era.get('tflag:35') || 0) * 10, MAX_MILK_AMOUNT);
  if (amount <= 0) return 0;

  era.drawLine();
  const milk_exp = value('exp', target, 54);
  const milk_rate =
    milk_exp <= EXPLV[3]
      ? 100
      : milk_exp <= EXPLV[4]
        ? 120
        : milk_exp <= EXPLV[5]
          ? 150
          : 200;
  let price = multiply_percent(amount * 50, milk_rate);
  if (value('talent', target, 0)) price *= 3;
  if (value('talent', target, 78)) price *= 2;

  const target_name = chara_callname(target);
  era.print(`使用挤奶器从${target_name}身上榨出了${amount}cc的母乳。`);
  const assi = era_flag.assi;
  if (assi > 0 && value('abl', assi, 15)) {
    const assi_name = chara_callname(assi);
    era.print(
      `${assi_name}巧妙地推销，使${target_name}的母乳卖得比平常更贵了。`,
    );
    price = multiply_percent(price, 100 + value('abl', assi, 15) * 5);
  }
  price = Math.min(price, MAX_MILK_PRICE);
  era.print(`${target_name}的母乳价值${price}点。`);
  era_flag.money += price;
  era_exflag.legit_money += price;
  era.print(`所持金增加了${price}点。`);
  await era.waitAnyKey();
  return 0;
}

/** @SELL_FIGHTMONEY：调教结束时结算死斗场观战费。 */
async function sell_fightmoney() {
  const target = era_flag.target;
  if (era.get(`tequip:${target}:55`)) {
    game.train.观战卷 -= 1;
  }

  if (game.train.死斗场收入 <= 0) return;
  const income_points = Math.min(game.train.死斗场收入, MAX_FIGHT_INCOME);
  game.train.死斗场收入 = income_points;
  const price = income_points * 5;
  era.print(`从死斗场的观战费中获得${price}点收入`);
  await era.waitAnyKey();
  era_flag.money += price;
  era_exflag.legit_money += price;
  game.train.死斗场收入 = 0;
}

module.exports = {
  chara_sale,
  check_sellassiable,
  estimate_chara,
  kill_target,
  long_good_bye,
  sale_chara,
  sell_milk,
  sell_fightmoney,
};
