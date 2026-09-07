/**
 * @file EX 道具的入手、出售与使用（issue #344，阶段 5a L13）。
 *
 * 源: target/ERB/其他/USE_EX_ITEM.ERB  @USE_EX_ITEM（:4-71）、
 *       @SELL_EX_ITEM（:74-124）、@ADD_EX_ITEM（:127-244）、
 *       @HARB_ITEM 至 @HERO_POTION_ITEM（:331-996）、
 *       @EX_ITEM_NAME（:999-1010）。
 *
 * 移植说明：
 *   - 原作全局 A / RESULT 改为显式 cid / 返回值；库存仍是 CFLAG:560-564；
 *   - RAND 经参数注入（缺省 Math.random），供迷宫共用随机序列并可测试；
 *   - ADD_EX_ITEM 的 W 数组改为按次创建的装备记录，复用阶段 3 的装备查表；
 *   - 13 条 dungeon → chara 跨域写均经 chara(cid).chara 具名门面；
 *   - PRINT/PRINTFORM 的行内片段合成一次 era.print；PRINTW 另 await 等键。
 */

'use strict';

const era = require('#/era-electron');
const { karma } = require('#/chara/chara-stats');
const { chara } = require('#/facade/chara');
const { get_equip_num } = require('#/system/equip/equip-lookup');
const { equip_weapon_spans } = require('#/system/equip/equip-print');
const { usable_equipment } = require('#/system/equip/equip-usable');
const { item_detox } = require('#/system/equip/item-detox');

const ITEM_FIRST_SLOT = 560;
const ITEM_SLOT_COUNT = 5;
const ITEM_MIN = 400;
const ITEM_COUNT = 14;

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

function show_log() {
  return ((era.get('flag:5') || 0) & 32) !== 0;
}

function add_juel(cid, index, delta) {
  era.set(
    `juel:${cid}:${index}`,
    (era.get(`juel:${cid}:${index}`) || 0) + delta,
  );
}

function add_exp(cid, index, delta) {
  era.set(`exp:${cid}:${index}`, (era.get(`exp:${cid}:${index}`) || 0) + delta);
}

function add_maxbase(cid, index, delta) {
  era.set(
    `maxbase:${cid}:${index}`,
    (era.get(`maxbase:${cid}:${index}`) || 0) + delta,
  );
}

/** CFLAG:503 位 7 = 透明化、位 8 = 英雄状态。 */
function set_status_bit(cid, bit) {
  era.set(`cflag:${cid}:503`, (era.get(`cflag:${cid}:503`) || 0) | (1 << bit));
}

function item_line(cid, appraise, known, unknown, verb, result) {
  if (show_log()) {
    era.print(
      `${name_of(cid)}${verb[0]}${appraise ? unknown : known}${verb[1]}${result}`,
    );
  }
}

/** @EX_ITEM_NAME（:999-1010）：行内名称由调用方拼接。 */
function ex_item_name(item_no) {
  return item_no > 1000
    ? '【未鉴定品】'
    : (era.get(`itemname:${item_no}`) ?? '');
}

/** @HARB_ITEM（:331-370）：草药。 */
function harb_item(cid, appraise, rand = default_rand) {
  const cursed = appraise === 1 && rand(2) === 0;
  if (cursed) {
    add_juel(cid, 5, 30); // JUEL:A:5 欲情点数
  } else {
    const max_hp = era.get(`maxbase:${cid}:0`) || 0;
    era.set(
      `base:${cid}:0`,
      Math.min((era.get(`base:${cid}:0`) || 0) + 500, max_hp),
    );
  }
  item_line(
    cid,
    appraise,
    '草药',
    '【谜之草】',
    ['把', '吃掉了！'],
    cursed ? '这是快乐草的叶片！(欲情点数+30)' : '(HP+500)',
  );
  return 1;
}

/** @POTION_ITEM（:373-411）：回复药水。 */
function potion_item(cid, appraise, rand = default_rand) {
  const cursed = appraise === 1 && rand(2) === 0;
  if (cursed) {
    add_exp(cid, 20, 1); // EXP:A:20 精液经验
  } else {
    const max_mp = era.get(`maxbase:${cid}:1`) || 0;
    era.set(
      `base:${cid}:1`,
      Math.min((era.get(`base:${cid}:1`) || 0) + 500, max_mp),
    );
  }
  item_line(
    cid,
    appraise,
    '回复药水',
    '【谜之液体】',
    ['把', '喝掉了！'],
    cursed ? '呕，这是精液！(精液经验+1)' : '(气力+500)',
  );
  return 1;
}

/** @HEAL_ROD_ITEM（:414-468）：回复之杖，正常品仅 1/3 损坏。 */
function heal_rod_item(cid, appraise, rand = default_rand) {
  const cursed = appraise === 1 && rand(2) === 0;
  if (cursed) {
    add_exp(cid, 10, 1); // EXP:A:10 自慰经验
    add_juel(cid, 0, 10); // JUEL:A:0 阴核点数
    add_juel(cid, 5, 20); // JUEL:A:5 欲情点数
  } else {
    const max_hp = era.get(`maxbase:${cid}:0`) || 0;
    era.set(
      `base:${cid}:0`,
      Math.min((era.get(`base:${cid}:0`) || 0) + 200, max_hp),
    );
  }
  if (show_log()) {
    era.print(
      `${name_of(cid)}把${appraise ? '【谜之杖】' : '回复之杖'}挥动着！`,
    );
    if (cursed) {
      era.print('这是被诅咒的振动杖！');
      era.print(`${name_of(cid)}在催眠状态下开始自慰`);
      era.print('自慰经验+1');
      era.print('欲情点数+20');
      era.print('阴核点数+10');
    } else {
      era.print('(HP+200)');
    }
  }
  if (appraise > 0) {
    return 1;
  }
  return rand(3) > 0 ? 0 : 1;
}

/** @MIND_ROD_ITEM（:471-532）：精神之杖；无肛门经验时诅咒不发动。 */
function mind_rod_item(cid, appraise, rand = default_rand) {
  let cursed = appraise === 1 && rand(2) === 0;
  if ((era.get(`exp:${cid}:1`) || 0) === 0) {
    cursed = false;
  }
  if (cursed) {
    add_exp(cid, 10, 1); // EXP:A:10 自慰经验
    add_exp(cid, 1, 1); // EXP:A:1 肛门经验
    add_juel(cid, 2, 10); // JUEL:A:2 肛门点数
    add_juel(cid, 5, 20); // JUEL:A:5 欲情点数
  } else {
    const max_mp = era.get(`maxbase:${cid}:1`) || 0;
    era.set(
      `base:${cid}:1`,
      Math.min((era.get(`base:${cid}:1`) || 0) + 200, max_mp),
    );
  }
  if (show_log()) {
    era.print(
      `${name_of(cid)}把${appraise ? '【谜之杖】' : '精神之杖'}挥动着！`,
    );
    if (cursed) {
      era.print('这是被诅咒的肛门振动杖！');
      era.print(`${name_of(cid)}在催眠状态下开始自慰`);
      era.print('自慰经验+1');
      era.print('肛门经验+1');
      era.print('欲情点数+20');
      era.print('肛门点数+10');
    } else {
      era.print('(气力+200)');
    }
  }
  if (appraise > 0) {
    return 1;
  }
  return rand(3) > 0 ? 0 : 1;
}

/** @POWER_SEED_ITEM（:535-584）：力量种子。 */
function power_seed_item(cid, appraise, rand = default_rand) {
  const view = chara(cid);
  const cursed = appraise === 1 && rand(4) === 0;
  if (cursed) {
    if (view.chara.阴蒂钝感 === 1) {
      view.chara.阴蒂钝感 = 0;
    } else if (view.chara.阴蒂敏感 === 0) {
      view.chara.阴蒂敏感 = 1;
    } else {
      add_juel(cid, 0, 10);
    }
  } else {
    view.chara.基础攻击 += 1;
  }
  const male = era.get(`talent:${cid}:121`) || era.get(`talent:${cid}:122`);
  item_line(
    cid,
    appraise,
    '力量种子',
    '【谜之种子】',
    ['把', '吃掉了！'],
    cursed
      ? male
        ? '吃掉的是阴茎敏感之种子！(阴茎感度上升)'
        : '吃掉的是阴蒂敏感之种子！(阴蒂感度上升)'
      : '（攻击力+1）',
  );
  return 1;
}

/** @DEF_SEED_ITEM（:587-632）：守护种子。 */
function def_seed_item(cid, appraise, rand = default_rand) {
  const view = chara(cid);
  const cursed = appraise === 1 && rand(4) === 0;
  if (cursed) {
    if (view.chara.乳房钝感 === 1) {
      view.chara.乳房钝感 = 0;
    } else if (view.chara.乳房敏感 === 0) {
      view.chara.乳房敏感 = 1;
    } else {
      add_juel(cid, 14, 10);
    }
  } else {
    view.chara.基础防御 += 1;
  }
  item_line(
    cid,
    appraise,
    '守护种子',
    '【谜之种子】',
    ['把', '吃掉了！'],
    cursed ? '吃掉的是乳头勃起之种子！(乳房感度上升)' : '(防御力+1)',
  );
  return 1;
}

/** @EXP_MEDAL_ITEM（:635-671）：经验硬币。 */
function exp_medal_item(cid, appraise, rand = default_rand) {
  const cursed = appraise === 1 && rand(2) === 0;
  if (cursed) {
    add_juel(cid, 4, 10);
  } else {
    add_exp(cid, 80, 50);
  }
  item_line(
    cid,
    appraise,
    '经验硬币',
    '【谜之硬币】',
    ['将', '使用了！'],
    cursed ? '这个是魔鬼硬币！(恭顺点数+10)' : '（经验值+50）',
  );
  return 1;
}

/** @HP_SEED_ITEM（:674-724）：命之种子。 */
function hp_seed_item(cid, appraise, rand = default_rand) {
  const view = chara(cid);
  let cursed = appraise === 1 && rand(4) === 0;
  if (era.get(`talent:${cid}:122`)) {
    cursed = false;
  }
  if (cursed) {
    if (view.chara.私处钝感 === 1) {
      view.chara.私处钝感 = 0;
    } else if (view.chara.私处敏感 === 0) {
      view.chara.私处敏感 = 1;
    } else {
      add_juel(cid, 5, 10);
    }
  } else {
    add_maxbase(cid, 0, 10);
  }
  item_line(
    cid,
    appraise,
    '生命种子',
    '【谜之种子】',
    ['把', '吃掉了！'],
    cursed ? '吃掉的是私处成长之种子！(私处感度上升)' : '（最大HP+10）',
  );
  return 1;
}

/** @MP_SEED_ITEM（:727-772）：心之种子。 */
function mp_seed_item(cid, appraise, rand = default_rand) {
  const view = chara(cid);
  const cursed = appraise === 1 && rand(4) === 0;
  if (cursed) {
    if (view.chara.肛门钝感 === 1) {
      view.chara.肛门钝感 = 0;
    } else if (view.chara.肛门敏感 === 0) {
      view.chara.肛门敏感 = 1;
    } else {
      add_juel(cid, 2, 10);
    }
  } else {
    add_maxbase(cid, 1, 5);
  }
  item_line(
    cid,
    appraise,
    '心之种子',
    '【谜之种子】',
    ['把', '吃掉了！'],
    cursed ? '吃掉的是肛门柔化之种子！！(肛门感度上升)' : '（最大气力+5）',
  );
  return 1;
}

/** @EXP_SILVER_ITEM（:775-812）：经验银币（文本 +10、实际数值 +30 原样保留）。 */
function exp_silver_item(cid, appraise, rand = default_rand) {
  const cursed = appraise === 1 && rand(2) === 0;
  if (cursed) {
    add_juel(cid, 6, 30);
  } else {
    add_exp(cid, 80, 150);
  }
  item_line(
    cid,
    appraise,
    '经验银币',
    '【谜之银币】',
    ['将', '使用了！'],
    cursed ? '这是黑暗银币！(屈服点数+10)' : '（经验值+150）',
  );
  return 1;
}

/** @DETOX_WORM_ITEM（:815-871）：圣水。 */
async function detox_worm_item(cid, appraise, rand = default_rand) {
  const former_saint = (era.get(`talent:${cid}:315`) || 0) === 12;
  const cursed = appraise === 1 && rand(2) === 0;
  item_line(
    cid,
    appraise,
    '圣水',
    '【谜之液体】',
    ['将', '喝掉了！'],
    cursed ? '这是淫魔的小便！(欲情点数+15)' : '',
  );
  if (cursed) {
    if (former_saint) {
      if (show_log()) {
        era.print('圣女的力量受到了污染……（屈服之珠+10）');
      }
      add_juel(cid, 6, 10);
    }
    add_juel(cid, 5, 15);
    return 1;
  }
  if (former_saint) {
    if (show_log()) {
      era.print('圣水增强了圣女的力量……（攻击+1/防御+1）');
    }
    const view = chara(cid);
    view.chara.基础攻击 += 1;
    view.chara.基础防御 += 1;
  }
  item_detox(cid);
  await era.printAndWait('(善恶值上升了:1)');
  karma(cid, 1);
  return 1;
}

/** @JUEL_BOX_ITEM（:874-901）：堕落的宝石箱。 */
function juel_box_item(cid, appraise) {
  item_line(
    cid,
    appraise,
    '堕落的宝石箱',
    '【迷之箱子】',
    ['使用了', '了！'],
    '（屈服之珠+5）',
  );
  add_juel(cid, 6, 5);
  return (era.get(`cflag:${cid}:1`) || 0) === 3 ? 1 : 0;
}

/** @INVISIBLE_POTION_ITEM（:904-951）：透明化之药。 */
function invisible_potion_item(cid, appraise, rand = default_rand) {
  const cursed = appraise === 1 && rand(3) === 0;
  if (show_log()) {
    era.print(
      `${name_of(cid)}将${appraise ? '【谜之液体】' : '透明化之药'}喝掉了！`,
    );
  }
  if (cursed) {
    if (show_log()) {
      era.print('竟然是衣服透明化之药啊！');
      era.print(`${name_of(cid)}变得赤身裸体了……(耻情点数+15)`);
    }
    if (era.get(`talent:${cid}:35`)) {
      if (show_log()) {
        era.print('脸像西红柿一样红透了……（屈服点数+10）');
      }
      add_juel(cid, 6, 10);
    }
    add_juel(cid, 8, 15);
  } else {
    if (show_log()) {
      era.print('*透明化使得回避力上升了*');
    }
    set_status_bit(cid, 7);
  }
  return 1;
}

/** @HERO_POTION_ITEM（:954-996）：英雄之药。 */
function hero_potion_item(cid, appraise, rand = default_rand) {
  const up_value = Math.trunc((era.get(`cflag:${cid}:9`) || 0) / 10) + 10;
  const cursed = appraise === 1 && rand(3) === 0;
  if (cursed) {
    add_juel(cid, 10, 10);
  } else {
    chara(cid).dungeon.攻击力 += up_value;
    chara(cid).dungeon.防御力 += up_value;
    set_status_bit(cid, 8);
  }
  item_line(
    cid,
    appraise,
    '英雄之药',
    '【谜之液体】',
    ['将', '喝掉了！'],
    cursed
      ? '竟然是恐惧药水啊！(恐怖点数+10)'
      : `(攻击·防御+${up_value}、回避UP)`,
  );
  return 1;
}

const ITEM_HANDLERS = {
  400: harb_item,
  401: potion_item,
  402: heal_rod_item,
  403: mind_rod_item,
  404: power_seed_item,
  405: def_seed_item,
  406: exp_medal_item,
  407: hp_seed_item,
  408: mp_seed_item,
  409: exp_silver_item,
  410: detox_worm_item,
  411: juel_box_item,
  412: invisible_potion_item,
  413: hero_potion_item,
};

/** @USE_EX_ITEM（:4-71）：检查五个槽，处理器返回非零才消耗。 */
async function use_ex_item(timing, cid, rand = default_rand) {
  for (let offset = 0; offset < ITEM_SLOT_COUNT; offset += 1) {
    const slot = ITEM_FIRST_SLOT + offset;
    const stored = era.get(`cflag:${cid}:${slot}`) || 0;
    const appraise = stored > 1000 ? 1 : 0;
    const item_no = appraise ? stored - 1000 : stored;
    let usable = false;
    if (item_no === 400) {
      usable =
        (era.get(`base:${cid}:0`) || 0) <
        Math.trunc(((era.get(`maxbase:${cid}:0`) || 0) * 6) / 10);
    } else if (item_no === 401) {
      usable =
        (era.get(`base:${cid}:1`) || 0) <
        Math.trunc(((era.get(`maxbase:${cid}:1`) || 0) * 6) / 10);
    } else if (item_no === 402) {
      usable =
        (era.get(`base:${cid}:0`) || 0) <
        Math.trunc(((era.get(`maxbase:${cid}:0`) || 0) * 8) / 10);
    } else if (item_no === 403) {
      usable =
        (era.get(`base:${cid}:1`) || 0) <
        Math.trunc(((era.get(`maxbase:${cid}:1`) || 0) * 8) / 10);
    } else if (item_no >= 404 && item_no <= 410) {
      usable = true;
    } else if (item_no === 411) {
      usable = rand(5) === 0;
    } else if (item_no === 412) {
      usable =
        timing === '战斗中' &&
        (((era.get(`cflag:${cid}:503`) || 0) >> 7) & 1) === 0;
    } else if (item_no === 413) {
      usable =
        timing === '战斗中' &&
        (((era.get(`cflag:${cid}:503`) || 0) >> 8) & 1) === 0;
    }
    const used = usable ? await ITEM_HANDLERS[item_no](cid, appraise, rand) : 0;
    if (used !== 0) {
      era.set(`cflag:${cid}:${slot}`, 0);
    }
  }
  return 0;
}

/** @SELL_EX_ITEM（:74-124）：未鉴定品必卖，其余每槽 1/10。 */
function sell_ex_item(cid, rand = default_rand) {
  let sold = 0;
  let money = 0;
  for (let offset = 0; offset < ITEM_SLOT_COUNT; offset += 1) {
    const slot = ITEM_FIRST_SLOT + offset;
    const stored = era.get(`cflag:${cid}:${slot}`) || 0;
    const item_no = stored > 1000 ? stored - 1000 : stored;
    // :95-97 的 RAND 每个槽都掷一次；即使未鉴定品已经确定卖出也会消费随机数。
    const random_sale = rand(10) === 0;
    if (stored <= 1000 && !random_sale) {
      continue;
    }
    era.set(`cflag:${cid}:${slot}`, 0);
    sold += 1;
    money += item_no === 411 ? 1000 : 200;
    if ((era.get(`talent:${cid}:315`) || 0) === 15) {
      money += 100;
    }
  }
  if (sold > 0 && money > 0) {
    era.print(`${name_of(cid)}卖掉了${sold}个道具，获得了${money}点资金。`);
    chara(cid).dungeon.所持金 += money;
  }
  return 0;
}

/** @ADD_EX_ITEM（:127-244）：取得武器或消耗品，返回取得的道具号。 */
async function add_ex_item(kind, cid, source, rand = default_rand) {
  let item_no = kind;
  if (item_no === -1) {
    item_no = rand(ITEM_COUNT) + ITEM_MIN;
  }

  if (rand(4) === 0 || item_no === -2) {
    const view = chara(cid);
    const floor = view.dungeon.侵攻阶层;
    const current = view.chara.武装;
    const current_level = Math.trunc((current % 100000) / 1000);
    era.print([
      '现持武器是',
      ...equip_weapon_spans({ 存储编号: current }),
      `，等级${current_level}`,
    ]);
    if (floor <= current_level) {
      era.print('没有必要更换。');
      return 0;
    }

    let weapon_item = rand(11) + 340;
    if (weapon_item === 349) {
      weapon_item = 340;
    }
    const w = { 备注: weapon_item };
    get_equip_num(w);
    const equip_id = w.存储编号 % 1000;
    if (usable_equipment(cid, equip_id) === 0) {
      era.print([...equip_weapon_spans(w), '不是其趁手的装备']);
      return 0;
    }

    w.存储编号 += floor * 1000;
    w.存储编号 += rand(10) * 100000;
    view.chara.武装 = w.存储编号;
    era.print(['经过考虑，更换成', ...equip_weapon_spans(w), '了']);
    return weapon_item;
  }

  if (item_no === -3) {
    item_no = rand(ITEM_COUNT) + ITEM_MIN;
  }
  if (chara(cid).invasion.状态 === 2 && rand(4) === 0) {
    item_no += 1000;
  }
  if (item_no > 1000 && source >= 1) {
    item_no -= 1000;
  }

  let appraise_result = 0;
  if (item_no > 1000) {
    appraise_result =
      era.get(`talent:${cid}:202`) || era.get(`talent:${cid}:203`)
        ? rand(2)
        : rand(5);
  }
  let appraise_text = '';
  if (item_no > 1000 && appraise_result === 0) {
    appraise_text = '【鉴定成功】';
    item_no -= 1000;
  }

  for (let offset = 0; offset < ITEM_SLOT_COUNT; offset += 1) {
    const slot = ITEM_FIRST_SLOT + offset;
    if ((era.get(`cflag:${cid}:${slot}`) || 0) > 0) {
      continue;
    }
    era.set(`cflag:${cid}:${slot}`, item_no);
    era.print(
      `${appraise_text}${name_of(cid)}将${ex_item_name(item_no)}${source === 1 ? '买下了' : '入手了'}`,
    );
    await era.waitAnyKey();
    return item_no;
  }
  return 0;
}

module.exports = {
  use_ex_item,
  sell_ex_item,
  add_ex_item,
  ex_item_name,
  harb_item,
  potion_item,
  heal_rod_item,
  mind_rod_item,
  power_seed_item,
  def_seed_item,
  exp_medal_item,
  hp_seed_item,
  mp_seed_item,
  exp_silver_item,
  detox_worm_item,
  juel_box_item,
  invisible_potion_item,
  hero_potion_item,
};
