/**
 * @file 怪物与精英部下的战斗技能（issue #345）。
 *
 * 技能使用者有两类，数值分别存在两张表里：普通怪物是战斗状态的一列
 * （调用方传列号，列布局见 ere/system/dungeon/battle-state.js 的
 * id / level / attack / defense），精英部下是角色本身（调用方传角色号，
 * 攻防与等级在 chara 域）。两套 1–18 技能表存在多处差异（倍率、名字与
 * 写入位置），因此分别按各自结构保留，不抽成一张会掩盖差异的共享表。
 */

'use strict';

const era = require('#/era-electron');
const EraChara = require('#/era-utils/era-chara');
const era_flag = require('#/era-utils/era-flag');
const { karma, chara_lv_check } = require('#/system/chara/chara-stats');
const { battle_column } = require('#/system/dungeon/battle-state');
const { monstername } = require('#/system/dungeon/monster-data');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { default_rand } = require('#/utils/numeric');

async function print_battle_line(text) {
  if ((era_flag.game_settings & 32) !== 0) {
    await era.printAndWait(text);
  }
}

/**
 * 技能使用者的数值视图：等级、显示名，以及攻防的读与加。
 *
 * 普通怪物是战斗状态的一列（user = 列号，攻防在列对象上），精英部下是角色
 * 本身（user = 角色号，攻防与等级在 chara 域——与 duel_attack 结算读的是
 * 同一份数据）。技能分支只关心「给谁加多少」，所以两张表的差异收在这里，
 * 不让每个技能各判一次类型。
 * @param {number} user 列号（普通怪物）或角色号（精英）
 * @param {number} user_type 1 = 普通怪物 / 2 = 精英 / 其他 = 按列处理
 * @param {string} [user_name] 精英的显示名（普通怪物从列里取怪物名）
 * @returns {{name: string, level: number, defense: Function,
 *   add_attack: Function, add_defense: Function}} 使用者视图
 */
function skill_user(user, user_type, user_name = '') {
  if (user_type === 2) {
    return {
      name: user_name,
      level: EraChara.get(user).cflag.level,
      defense: () => EraChara.get(user).cflag.defense,
      add_attack: (value) => {
        EraChara.get(user).cflag.attack += value;
      },
      add_defense: (value) => {
        EraChara.get(user).cflag.defense += value;
      },
    };
  }
  const column = battle_column(user);
  return {
    name: monstername(column.id),
    level: column.level,
    defense: () => column.defense,
    add_attack: (value) => {
      column.attack += value;
    },
    add_defense: (value) => {
      column.defense += value;
    },
  };
}

async function monster_skill(target, skill, user, rand = default_rand) {
  const self = skill_user(user, 1);
  const level = self.level + EraChara.get(0).cflag.level;
  let dmg = level;
  let palam_down = Math.trunc(dmg / 5) + 1;
  if (rand(3) === 0) {
    return 0;
  }
  dmg += Math.trunc(dmg / 2);
  dmg = Math.min(dmg, 400);
  palam_down = Math.min(palam_down, 50);
  const monster_name = self.name;

  if (skill === 1) {
    await print_battle_line(`${monster_name}的粘液四处飞散！（气力-${level}）`);
    EraChara.get(target).base.willpower -= level;
  } else if (skill === 2) {
    await print_battle_line(`对手掉下了${monster_name}的落穴！（HP-${level}）`);
    EraChara.get(target).base.stamina -= level;
  } else if (skill === 3) {
    await print_battle_line(
      `${monster_name}的藤蔓夺取了对手身体的自由！（攻击-${palam_down}）`,
    );
    EraChara.get(target).cflag.attack -= palam_down;
  } else if (skill === 4) {
    await print_battle_line(
      `${monster_name}破坏了对手的铠甲！（防御-${palam_down}）`,
    );
    EraChara.get(target).cflag.defense -= palam_down;
  } else if (skill === 5) {
    await print_battle_line(`${monster_name}变为透明了……（防御+2）`);
    self.add_defense(2);
  } else if (skill === 6) {
    await print_battle_line(`${monster_name}加速再生着……（防御+3）`);
    self.add_defense(3);
  } else if (skill === 7) {
    await print_battle_line(`${monster_name}巧妙地拟态着……（防御+5）`);
    self.add_defense(5);
  } else if (skill === 8) {
    if (rand(3) === 0) {
      await print_battle_line(`${chara_callname(target)}迷失了！`);
      EraChara.get(target).cflag.lost_state = 1; // CFLAG:509 = 迷失标志
    }
  } else if (skill === 9) {
    const breath = Math.trunc((dmg * 3) / 2);
    await print_battle_line(`${monster_name}喷出了吐息！！（HP-${breath}）`);
    EraChara.get(target).base.stamina -= breath;
  } else if (skill === 10) {
    const paralysis = Math.trunc((palam_down * 3) / 2);
    await print_battle_line(
      `${monster_name}喷出了麻痹气体！！（攻击-${paralysis}）`,
    );
    EraChara.get(target).cflag.attack -= paralysis;
  } else if (skill === 11) {
    await print_battle_line(
      `${monster_name}诱惑着对手……（善恶值:-2 好感度+4）`,
    );
    EraChara.get(target).cflag.affection += 4; // CFLAG:2 = 好感度（跨 chara 域）
    karma(target, -2);
  } else if (skill === 12) {
    const confusion = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${monster_name}发出混乱电波！！（气力-${confusion}）`,
    );
    EraChara.get(target).base.willpower -= confusion;
  } else if (skill === 13) {
    await print_battle_line(`${monster_name}发动经验吸取！！（经验值-${dmg}）`);
    EraChara.get(target).exp.battle_exp -= dmg;
    await chara_lv_check(target);
  } else if (skill === 14) {
    const breath = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${monster_name}喷出了破坏铠甲的吐息！！（HP-${breath} 防御-${palam_down}）`,
    );
    EraChara.get(target).base.stamina -= breath;
    EraChara.get(target).cflag.defense -= palam_down;
  } else if (skill === 15) {
    const drain = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${monster_name}发动了魔力吸取！！（气力-${drain} 防御+4）`,
    );
    EraChara.get(target).base.willpower -= drain;
    self.add_defense(4);
  } else if (skill === 16) {
    await print_battle_line(`${monster_name}用弓箭发动了攻击！！（HP-${dmg}）`);
    EraChara.get(target).base.stamina -= dmg;
  } else if (skill === 17) {
    await monster_room_skill(target, user, 1);
  } else if (skill === 18) {
    await print_battle_line(
      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,
    );
    self.add_defense(2);
  }
  return 0;
}

async function monster_room_skill(target, user, user_type, user_name = '') {
  const self = skill_user(user, user_type, user_name);
  const monster_name = self.name;
  const level = self.level + EraChara.get(0).cflag.level;
  const room = EraChara.get(target).cflag.invasion_floor; // CFLAG:501 = 所在房间

  if (room === 500) {
    await print_battle_line(
      `商店街里的暴徒们前来相助！！（HP-${level * 2} 攻击+1）`,
    );
    EraChara.get(target).base.stamina -= level * 2;
    self.add_attack(1);
  } else if (room === 501) {
    await print_battle_line(
      `${monster_name}从毒沼里发动奇袭！（气力-${level * 2} 攻击+2）`,
    );
    EraChara.get(target).base.willpower -= level * 2;
    self.add_attack(2);
  } else if (room === 502 && era_flag.meat_toilet_count > 0) {
    await print_battle_line(
      `${monster_name}抓起一只肉便器来打人……（攻击-${level * 2}）`,
    );
    EraChara.get(target).cflag.attack -= level * 2;
  } else if (room === 503) {
    await print_battle_line(`${monster_name}聚拢寒冰！（攻击+2 防御+2）`);
    self.add_attack(2);
    self.add_defense(2);
  } else if (room === 504) {
    await print_battle_line(`${monster_name}聚拢火焰！！（攻击+10 防御-1）`);
    self.add_attack(10);
    if (self.defense() > 2) {
      self.add_defense(-1);
    }
  } else if (room === 505) {
    await print_battle_line(`${monster_name}躲进了迷宫里。（防御+5）`);
    self.add_defense(5);
  } else if (room === 506 && era_flag.exhibit_count > 0) {
    const damage = Math.trunc((level * 3) / 2);
    await print_battle_line(
      `${monster_name}利用展示品攻击！！（气力-${damage}）`,
    );
    EraChara.get(target).base.willpower -= damage;
  }
  return 0;
}

async function slave_monster_skill(target, cid, rand = default_rand) {
  if (rand(3) === 0) {
    return 0;
  }

  const skills = [];
  for (let talent = 401; talent < 500; talent += 1) {
    if (EraChara.get(cid).talent.get(talent) === 1) {
      skills.push(talent);
    }
  }
  if (skills.length === 0) {
    return 0;
  }

  const selected = skills.length === 1 ? 0 : rand(skills.length);
  const skill = skills[selected] - 470;
  if (skill < 0) {
    return 0;
  }

  const level = EraChara.get(cid).cflag.level * 3;
  await use_monster_skill(
    target,
    skill,
    cid,
    level,
    2,
    chara_callname(cid),
    rand,
  );
  return 0;
}

async function use_monster_skill(
  target,
  skill,
  user,
  dmg,
  user_type,
  user_name,
  rand = default_rand,
) {
  const self = skill_user(user, user_type, user_name);
  const monster_name = self.name;
  // 函数体会覆盖形参 dmg；精英等级 ×3 因而无效，有意保留。
  dmg = self.level + EraChara.get(0).cflag.level;
  const palam_down = Math.trunc(dmg / 3) + 1;
  const add_defence = (value) => {
    // 类型 0 只演出不增益
    if (user_type === 1 || user_type === 2) {
      self.add_defense(value);
    }
  };

  if (skill === 1) {
    await print_battle_line(`${user_name}的粘液四处飞散！（气力-${dmg}）`);
    EraChara.get(target).base.willpower -= dmg;
  } else if (skill === 2) {
    await print_battle_line(`对手掉下了${user_name}的落穴！（HP-${dmg}）`);
    EraChara.get(target).base.stamina -= dmg;
  } else if (skill === 3) {
    await print_battle_line(
      `${user_name}的藤蔓夺取了对手身体的自由！（攻击-${palam_down}）`,
    );
    EraChara.get(target).cflag.attack -= palam_down;
  } else if (skill === 4) {
    await print_battle_line(
      `${user_name}破坏了对手的铠甲！（防御-${palam_down}）`,
    );
    EraChara.get(target).cflag.defense -= palam_down;
  } else if (skill === 5) {
    await print_battle_line(`${user_name}变为透明了……（防御+2）`);
    add_defence(2);
  } else if (skill === 6) {
    await print_battle_line(`${user_name}加速再生着……（防御+3）`);
    add_defence(3);
  } else if (skill === 7) {
    await print_battle_line(`${user_name}巧妙地拟态着……（防御+5）`);
    add_defence(5);
  } else if (skill === 8) {
    if (rand(3) === 0) {
      await print_battle_line(`${chara_callname(target)}迷失了！`);
      EraChara.get(target).cflag.lost_state = 1; // CFLAG:509 = 迷失标志
    }
  } else if (skill === 9) {
    const breath = Math.trunc((dmg * 3) / 2);
    await print_battle_line(`${user_name}喷出了吐息！！（HP-${breath}）`);
    EraChara.get(target).base.stamina -= breath;
  } else if (skill === 10) {
    await print_battle_line(`${user_name}喷出了麻痹气体！！（攻击-${dmg}）`);
    EraChara.get(target).cflag.attack -= dmg;
  } else if (skill === 11) {
    await print_battle_line(`${user_name}诱惑着对手……（善恶值-2 好感度+4）`);
    EraChara.get(target).cflag.affection += 4; // CFLAG:2 = 好感度（跨 chara 域）
    karma(target, -2);
  } else if (skill === 12) {
    const confusion = Math.trunc((palam_down * 3) / 2);
    await print_battle_line(
      `${user_name}发出混乱电波！！（气力-${confusion}）`,
    );
    EraChara.get(target).base.willpower -= confusion;
  } else if (skill === 13) {
    await print_battle_line(`${user_name}发动经验吸取！！（经验值-${dmg}）`);
    EraChara.get(target).exp.battle_exp -= dmg;
    await chara_lv_check(target);
  } else if (skill === 14) {
    const breath = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${user_name}喷出了破坏铠甲的吐息！！（HP-${breath} 防御-${palam_down}）`,
    );
    EraChara.get(target).base.stamina -= breath;
    EraChara.get(target).cflag.defense -= palam_down;
  } else if (skill === 15) {
    const drain = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${user_name}发动了魔力吸取！！（气力-${drain} 防御+4）`,
    );
    EraChara.get(target).base.willpower -= drain;
    add_defence(4);
  } else if (skill === 16) {
    await print_battle_line(`${monster_name}用弓箭发动了攻击！！（HP-${dmg}）`);
    EraChara.get(target).base.stamina -= dmg;
  } else if (skill === 17) {
    await monster_room_skill(target, user, user_type, user_name);
  } else if (skill === 18) {
    await print_battle_line(
      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,
    );
    self.add_defense(2);
  }
  return 0;
}

module.exports = {
  monster_skill,
  monster_room_skill,
  slave_monster_skill,
  use_monster_skill,
};
