/**
 * @file 怪物与精英部下的战斗技能（issue #345）。
 *
 * 源: target/ERB/怪物相關/MONSTER_SKILL.ERB
 *   @MONSTER_SKILL（:2-173）、@MONSTER_ROOM_SKILL（:174-241）、
 *   @SLAVE_MONSTER_SKILL（:242-298）、@USE_MONSTER_SKILL（:299-457）
 *
 * E 列布局沿用 monster-data：列头 +0 = 怪物识别号、+1 = 等级、+2 = 攻击、
 * +3 = 防御。两套 1–18 技能表有多处原作差异（倍率、名字与写入位置），
 * 因此分别按源结构保留，不抽成一张会掩盖差异的共享表。
 */

'use strict';

const era = require('#/era-electron');
const { karma, chara_lv_check } = require('#/chara/chara-stats');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { e_get, e_set, monstername } = require('#/dungeon/monster-data');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

async function print_battle_line(text) {
  if ((game.dungeon.游戏设定 & 32) !== 0) {
    await era.printAndWait(text);
  }
}

async function monster_skill(target, skill, user, rand = default_rand) {
  const level = e_get(user + 1) + chara(0).chara.等级;
  let dmg = level;
  let palam_down = Math.trunc(dmg / 5) + 1;
  if (rand(3) === 0) {
    return 0;
  }
  dmg += Math.trunc(dmg / 2);
  dmg = Math.min(dmg, 400);
  palam_down = Math.min(palam_down, 50);
  const monster_name = monstername(e_get(user));
  const target_view = chara(target);

  if (skill === 1) {
    await print_battle_line(`${monster_name}的粘液四处飞散！（气力-${level}）`);
    chara(target).dungeon.气力 -= level;
  } else if (skill === 2) {
    await print_battle_line(`对手掉下了${monster_name}的落穴！（HP-${level}）`);
    target_view.dungeon.体力 -= level;
  } else if (skill === 3) {
    await print_battle_line(
      `${monster_name}的藤蔓夺取了对手身体的自由！（攻击-${palam_down}）`,
    );
    target_view.dungeon.攻击力 -= palam_down;
  } else if (skill === 4) {
    await print_battle_line(
      `${monster_name}破坏了对手的铠甲！（防御-${palam_down}）`,
    );
    target_view.dungeon.防御力 -= palam_down;
  } else if (skill === 5) {
    await print_battle_line(`${monster_name}变为透明了……（防御+2）`);
    e_set(user + 3, e_get(user + 3) + 2);
  } else if (skill === 6) {
    await print_battle_line(`${monster_name}加速再生着……（防御+3）`);
    e_set(user + 3, e_get(user + 3) + 3);
  } else if (skill === 7) {
    await print_battle_line(`${monster_name}巧妙地拟态着……（防御+5）`);
    e_set(user + 3, e_get(user + 3) + 5);
  } else if (skill === 8) {
    if (rand(3) === 0) {
      await print_battle_line(`${chara_callname(target)}迷失了！`);
      era.set(`cflag:${target}:509`, 1); // CFLAG:509 = 迷失标志
    }
  } else if (skill === 9) {
    const breath = Math.trunc((dmg * 3) / 2);
    await print_battle_line(`${monster_name}喷出了吐息！！（HP-${breath}）`);
    target_view.dungeon.体力 -= breath;
  } else if (skill === 10) {
    const paralysis = Math.trunc((palam_down * 3) / 2);
    await print_battle_line(
      `${monster_name}喷出了麻痹气体！！（攻击-${paralysis}）`,
    );
    target_view.dungeon.攻击力 -= paralysis;
  } else if (skill === 11) {
    await print_battle_line(
      `${monster_name}诱惑着对手……（善恶值:-2 好感度+4）`,
    );
    target_view.chara.好感度 += 4; // CFLAG:2 = 好感度（跨 chara 域）
    karma(target, -2);
  } else if (skill === 12) {
    const confusion = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${monster_name}发出混乱电波！！（气力-${confusion}）`,
    );
    target_view.dungeon.气力 -= confusion;
  } else if (skill === 13) {
    await print_battle_line(`${monster_name}发动经验吸取！！（经验值-${dmg}）`);
    target_view.dungeon.战斗经验 -= dmg;
    await chara_lv_check(target);
  } else if (skill === 14) {
    const breath = Math.trunc((dmg * 3) / 2);
    // 源 :143 显示 level * 2，实际 :144 只扣强化后的 1.5 倍；1:1 保留。
    await print_battle_line(
      `${monster_name}喷出了破坏铠甲的吐息！！（HP-${level * 2} 防御-${palam_down}）`,
    );
    target_view.dungeon.体力 -= breath;
    target_view.dungeon.防御力 -= palam_down;
  } else if (skill === 15) {
    const drain = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${monster_name}发动了魔力吸取！！（气力-${drain} 防御+4）`,
    );
    target_view.dungeon.气力 -= drain;
    e_set(user + 3, e_get(user + 3) + 4);
  } else if (skill === 16) {
    await print_battle_line(`${monster_name}用弓箭发动了攻击！！（HP-${dmg}）`);
    target_view.dungeon.体力 -= dmg;
  } else if (skill === 17) {
    await monster_room_skill(target, user);
  } else if (skill === 18) {
    await print_battle_line(
      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,
    );
    e_set(user + 3, e_get(user + 3) + 2);
  }
  return 0;
}

async function monster_room_skill(target, user) {
  const monster_name = monstername(e_get(user));
  const level = e_get(user + 1) + chara(0).chara.等级;
  const room = chara(target).dungeon.侵攻阶层; // CFLAG:501 = 所在房间
  const target_view = chara(target);

  if (room === 500) {
    await print_battle_line(
      `商店街里的暴徒们前来相助！！（HP-${level * 2} 攻击+1）`,
    );
    target_view.dungeon.体力 -= level * 2;
    e_set(user + 2, e_get(user + 2) + 1);
  } else if (room === 501) {
    await print_battle_line(
      `${monster_name}从毒沼里发动奇袭！（气力-${level * 2} 攻击+2）`,
    );
    target_view.dungeon.气力 -= level * 2;
    e_set(user + 2, e_get(user + 2) + 2);
  } else if (room === 502 && game.invasion.肉便器数 > 0) {
    await print_battle_line(
      `${monster_name}抓起一只肉便器来打人……（攻击-${level * 2}）`,
    );
    target_view.dungeon.攻击力 -= level * 2;
  } else if (room === 503) {
    await print_battle_line(`${monster_name}聚拢寒冰！（攻击+2 防御+2）`);
    e_set(user + 2, e_get(user + 2) + 2);
    e_set(user + 3, e_get(user + 3) + 2);
  } else if (room === 504) {
    await print_battle_line(`${monster_name}聚拢火焰！！（攻击+10 防御-1）`);
    e_set(user + 2, e_get(user + 2) + 10);
    if (e_get(user + 3) > 2) {
      e_set(user + 3, e_get(user + 3) - 1);
    }
  } else if (room === 505) {
    await print_battle_line(`${monster_name}躲进了迷宫里。（防御+5）`);
    e_set(user + 3, e_get(user + 3) + 5);
  } else if (room === 506 && game.event.装饰品数 > 0) {
    const damage = Math.trunc((level * 3) / 2);
    await print_battle_line(
      `${monster_name}利用展示品攻击！！（气力-${damage}）`,
    );
    target_view.dungeon.气力 -= damage;
  }
  return 0;
}

async function slave_monster_skill(target, user, rand = default_rand) {
  if (rand(3) === 0) {
    return 0;
  }

  const skills = [];
  for (let talent = 401; talent < 500; talent += 1) {
    if (era.get(`talent:${user}:${talent}`) === 1) {
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

  const level = chara(user).chara.等级 * 3;
  await use_monster_skill(
    target,
    skill,
    user,
    level,
    2,
    chara_callname(user),
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
  const monster_name = monstername(e_get(user));
  // 源 :329 会覆盖形参 DMG；精英等级 ×3 因而无效，按原作保留。
  dmg = e_get(user + 1) + chara(0).chara.等级;
  const palam_down = Math.trunc(dmg / 3) + 1;
  const target_view = chara(target);
  const add_defence = (value) => {
    if (user_type === 1) {
      e_set(user + 3, e_get(user + 3) + value);
    } else if (user_type === 2) {
      chara(user).dungeon.防御力 += value;
    }
  };

  if (skill === 1) {
    await print_battle_line(`${user_name}的粘液四处飞散！（气力-${dmg}）`);
    target_view.dungeon.气力 -= dmg;
  } else if (skill === 2) {
    await print_battle_line(`对手掉下了${user_name}的落穴！（HP-${dmg}）`);
    target_view.dungeon.体力 -= dmg;
  } else if (skill === 3) {
    await print_battle_line(
      `${user_name}的藤蔓夺取了对手身体的自由！（攻击-${palam_down}）`,
    );
    target_view.dungeon.攻击力 -= palam_down;
  } else if (skill === 4) {
    await print_battle_line(
      `${user_name}破坏了对手的铠甲！（防御-${palam_down}）`,
    );
    target_view.dungeon.防御力 -= palam_down;
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
      era.set(`cflag:${target}:509`, 1); // CFLAG:509 = 迷失标志
    }
  } else if (skill === 9) {
    const breath = Math.trunc((dmg * 3) / 2);
    await print_battle_line(`${user_name}喷出了吐息！！（HP-${breath}）`);
    target_view.dungeon.体力 -= breath;
  } else if (skill === 10) {
    await print_battle_line(`${user_name}喷出了麻痹气体！！（攻击-${dmg}）`);
    target_view.dungeon.攻击力 -= dmg;
  } else if (skill === 11) {
    await print_battle_line(`${user_name}诱惑着对手……（善恶值-2 好感度+4）`);
    target_view.chara.好感度 += 4; // CFLAG:2 = 好感度（跨 chara 域）
    karma(target, -2);
  } else if (skill === 12) {
    const confusion = Math.trunc((palam_down * 3) / 2);
    await print_battle_line(
      `${user_name}发出混乱电波！！（气力-${confusion}）`,
    );
    target_view.dungeon.气力 -= confusion;
  } else if (skill === 13) {
    await print_battle_line(`${user_name}发动经验吸取！！（经验值-${dmg}）`);
    target_view.dungeon.战斗经验 -= dmg;
    await chara_lv_check(target);
  } else if (skill === 14) {
    const breath = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${user_name}喷出了破坏铠甲的吐息！！（HP-${breath} 防御-${palam_down}）`,
    );
    target_view.dungeon.体力 -= breath;
    target_view.dungeon.防御力 -= palam_down;
  } else if (skill === 15) {
    const drain = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${user_name}发动了魔力吸取！！（气力-${drain} 防御+4）`,
    );
    target_view.dungeon.气力 -= drain;
    add_defence(4);
  } else if (skill === 16) {
    // 源 :443 没用 ARGS:0，而是把精英角色号当 E 列头拼怪物名。
    await print_battle_line(`${monster_name}用弓箭发动了攻击！！（HP-${dmg}）`);
    target_view.dungeon.体力 -= dmg;
  } else if (skill === 17) {
    // 源不传类型：精英路径的地形增益仍写 E 数组，1:1 保留。
    await monster_room_skill(target, user);
  } else if (skill === 18) {
    // 源不按类型分流，并继续使用怪物名；精英路径也固定写 E 数组。
    await print_battle_line(
      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,
    );
    e_set(user + 3, e_get(user + 3) + 2);
  }
  return 0;
}

module.exports = {
  monster_skill,
  monster_room_skill,
  slave_monster_skill,
  use_monster_skill,
};
