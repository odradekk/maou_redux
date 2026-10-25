/**
 * @file 怪物与精英部下的战斗技能（issue #345）。
 *
 * 列布局见 ere/dungeon/battle-state.js：id = 怪物识别号、level = 等级、
 * attack = 攻击、defense = 防御；本文件按列号取列（列由调用方传，通常是
 * 被打的防御列）。两套 1–18 技能表存在多处差异（倍率、名字与写入位置），
 * 因此分别按各自结构保留，不抽成一张会掩盖差异的共享表。
 */

'use strict';

const era = require('#/era-electron');
const { karma, chara_lv_check } = require('#/chara/chara-stats');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { default_rand } = require('#/utils/numeric');
const { monstername } = require('#/dungeon/monster-data');
const { BATTLE_FIELD_ORDER, battle_column } = require('#/dungeon/battle-state');

/**
 * 旧 E 下标 → (列对象, 字段名)。
 *
 * 只服务一处既有怪癖：精英路径（`slave_monster_skill` → `use_monster_skill`
 * 的 `user_type === 2`）把**角色号**当列号传。旧写法拿它当 E 表下标用，
 * 读写落在 E:<角色号 + n>——也就是列 0 的若干槽；换成「角色号 = 列号」会
 * 落到另一个**真实列**的具名字段上（+2 防御会写到活着的防御列），那是行为
 * 变更。为了本票行为零变化，这条路径继续按旧下标换算；把它改成传正确的列
 * 是另一张票，届时本函数与 `BATTLE_FIELD_ORDER` 一起删。
 * @param {number} index 旧写法的 E 下标
 * @returns {{row: object, field: string}} 列对象与字段名
 */
function legacy_cell(index) {
  const offset = index % 100;
  const field = offset === 99 ? 'count' : BATTLE_FIELD_ORDER[offset];
  return { row: battle_column(Math.floor(index / 100)), field };
}

/**
 * 一组「按旧下标读写」的小工具：普通路径的基准是列头（列号 × 100），
 * 精英路径的基准是角色号本身（`cid` 给值时）。
 * @param {number} user 列号（普通路径）或角色号（精英路径）
 * @param {number} user_type 1/0 = 列号，2 = 角色号
 * @returns {{cell: Function, read: Function, write: Function}}
 */
function legacy_reader(user, user_type) {
  const base = user_type === 2 ? user : user * 100;
  const cell = (offset) => legacy_cell(base + offset);
  return {
    cell,
    read: (offset) => {
      const { row, field } = cell(offset);
      return row[field];
    },
    write: (offset, value) => {
      const { row, field } = cell(offset);
      row[field] = value;
    },
  };
}

async function print_battle_line(text) {
  if ((game.dungeon.游戏设定 & 32) !== 0) {
    await era.printAndWait(text);
  }
}

async function monster_skill(target, skill, user, rand = default_rand) {
  const { read, write } = legacy_reader(user, 1);
  const level = read(1) + chara(0).chara.等级;
  let dmg = level;
  let palam_down = Math.trunc(dmg / 5) + 1;
  if (rand(3) === 0) {
    return 0;
  }
  dmg += Math.trunc(dmg / 2);
  dmg = Math.min(dmg, 400);
  palam_down = Math.min(palam_down, 50);
  const monster_name = monstername(read(0));
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
    write(3, read(3) + 2);
  } else if (skill === 6) {
    await print_battle_line(`${monster_name}加速再生着……（防御+3）`);
    write(3, read(3) + 3);
  } else if (skill === 7) {
    await print_battle_line(`${monster_name}巧妙地拟态着……（防御+5）`);
    write(3, read(3) + 5);
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
    await print_battle_line(
      `${monster_name}喷出了破坏铠甲的吐息！！（HP-${breath} 防御-${palam_down}）`,
    );
    target_view.dungeon.体力 -= breath;
    target_view.dungeon.防御力 -= palam_down;
  } else if (skill === 15) {
    const drain = Math.trunc((dmg * 3) / 2);
    await print_battle_line(
      `${monster_name}发动了魔力吸取！！（气力-${drain} 防御+4）`,
    );
    target_view.dungeon.气力 -= drain;
    write(3, read(3) + 4);
  } else if (skill === 16) {
    await print_battle_line(`${monster_name}用弓箭发动了攻击！！（HP-${dmg}）`);
    target_view.dungeon.体力 -= dmg;
  } else if (skill === 17) {
    await monster_room_skill(target, user, 1);
  } else if (skill === 18) {
    await print_battle_line(
      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,
    );
    write(3, read(3) + 2);
  }
  return 0;
}

async function monster_room_skill(target, user, user_type) {
  const { read, write } = legacy_reader(user, user_type);
  const monster_name = monstername(read(0));
  const level = read(1) + chara(0).chara.等级;
  const room = chara(target).dungeon.侵攻阶层; // CFLAG:501 = 所在房间
  const target_view = chara(target);

  if (room === 500) {
    await print_battle_line(
      `商店街里的暴徒们前来相助！！（HP-${level * 2} 攻击+1）`,
    );
    target_view.dungeon.体力 -= level * 2;
    write(2, read(2) + 1);
  } else if (room === 501) {
    await print_battle_line(
      `${monster_name}从毒沼里发动奇袭！（气力-${level * 2} 攻击+2）`,
    );
    target_view.dungeon.气力 -= level * 2;
    write(2, read(2) + 2);
  } else if (room === 502 && game.invasion.肉便器数 > 0) {
    await print_battle_line(
      `${monster_name}抓起一只肉便器来打人……（攻击-${level * 2}）`,
    );
    target_view.dungeon.攻击力 -= level * 2;
  } else if (room === 503) {
    await print_battle_line(`${monster_name}聚拢寒冰！（攻击+2 防御+2）`);
    write(2, read(2) + 2);
    write(3, read(3) + 2);
  } else if (room === 504) {
    await print_battle_line(`${monster_name}聚拢火焰！！（攻击+10 防御-1）`);
    write(2, read(2) + 10);
    if (read(3) > 2) {
      write(3, read(3) - 1);
    }
  } else if (room === 505) {
    await print_battle_line(`${monster_name}躲进了迷宫里。（防御+5）`);
    write(3, read(3) + 5);
  } else if (room === 506 && game.event.装饰品数 > 0) {
    const damage = Math.trunc((level * 3) / 2);
    await print_battle_line(
      `${monster_name}利用展示品攻击！！（气力-${damage}）`,
    );
    target_view.dungeon.气力 -= damage;
  }
  return 0;
}

async function slave_monster_skill(target, cid, rand = default_rand) {
  if (rand(3) === 0) {
    return 0;
  }

  const skills = [];
  for (let talent = 401; talent < 500; talent += 1) {
    if (era.get(`talent:${cid}:${talent}`) === 1) {
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

  const level = chara(cid).chara.等级 * 3;
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
  const { read, write } = legacy_reader(user, user_type);
  const monster_name = monstername(read(0));
  // 函数体会覆盖形参 dmg；精英等级 ×3 因而无效，有意保留。
  dmg = read(1) + chara(0).chara.等级;
  const palam_down = Math.trunc(dmg / 3) + 1;
  const target_view = chara(target);
  const add_defence = (value) => {
    if (user_type === 1) {
      write(3, read(3) + value);
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
    // 不用传入的 user_name，而是把精英角色号当列号拼怪物名（既有怪癖，
    // 按旧 E 下标换算，见 legacy_cell）。
    await print_battle_line(`${monster_name}用弓箭发动了攻击！！（HP-${dmg}）`);
    target_view.dungeon.体力 -= dmg;
  } else if (skill === 17) {
    // 不按类型分流：精英路径的地形增益仍写列，保留（同上，列号是角色号）。
    await monster_room_skill(target, user, user_type);
  } else if (skill === 18) {
    // 同样不按类型分流，并继续使用怪物名；精英路径也固定写列。
    await print_battle_line(
      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,
    );
    write(3, read(3) + 2);
  }
  return 0;
}

module.exports = {
  monster_skill,
  monster_room_skill,
  slave_monster_skill,
  use_monster_skill,
};
