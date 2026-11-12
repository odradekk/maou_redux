/**
 * @file 怪物召唤与怪物编号抽选（issue #346，阶段 5a L15）。
 *
 * 说明：
 *   - RAND:N 全部经 rand 参数注入；缺省均匀随机。
 *   - ARG == -1 是弱召唤：召唤轮数按整数除法折半，保留陷阱调用实参。
 *   - pregnancy_master 的唯一语句是 JUMP 自身并把参数改为 MASTER。
 *     这是无限尾调用的缺陷；函数保留为显式抛错，避免 JS 栈溢出掩盖
 *     原因。当前无调用点。
 */

'use strict';

const era = require('#/era-electron');
const EraChara = require('#/era-utils/era-chara');
const era_item = require('#/era-utils/era-item');
const { item_name } = require('#/system/dungeon/monster-data');
const { default_rand } = require('#/utils/numeric');

/** monster_total_count：45 种常规怪物的库存总数。 */
function monster_total_count() {
  let total = 0;
  for (let kind = 0; kind < 5; kind += 1) {
    for (let tier = 0; tier < 9; tier += 1) {
      total += era.get(`item:${100 + tier * 10 + kind}`) || 0;
    }
  }
  return total;
}

/**
 * rand_monster_number：从 100-184 抽选未满 999 只的怪物。
 * 只有全部 45 种均满时才允许返回已满种类。
 */
function rand_monster_number(rand = default_rand) {
  const total = monster_total_count();
  for (;;) {
    const id = 100 + rand(9) * 10 + rand(5);
    if ((era.get(`item:${id}`) || 0) < 999 || total >= 44_955) {
      return id;
    }
  }
}

function add_monsters(id, count) {
  era.set(`item:${id}`, Math.min(999, (era.get(`item:${id}`) || 0) + count));
}

/** summon_monster_master：魔王生产固定近卫兵。 */
function summon_monster_master(arg = 0, rand = default_rand) {
  era.print('');
  era.drawLine();
  const count = rand(3) + 1;
  const id = 191 + rand(3);
  const name = EraChara.get(arg).name ?? '';
  era.print(`${name}生下了${count}只${item_name(id)}。`);
  add_monsters(id, count);
  return 0;
}

/**
 * summon_monster：通常/弱召唤，或由指定角色生产怪物。
 * @param {number} [arg=0] 0=通常召唤，-1=弱召唤，正数=生产者角色 ID
 * @param {(n:number)=>number} [rand] RAND:N 随机源
 */
async function summon_monster(arg = 0, rand = default_rand) {
  era.drawLine();
  let summon_num = 5;
  const master_level = EraChara.get(0).cflag.level; // CFLAG:MASTER:9 等级
  for (const threshold of [10, 30, 50, 70, 100]) {
    if (master_level >= threshold) summon_num += 1;
  }
  if (EraChara.get(0).talent.demon_knowledge === 1) summon_num += 1; // 魔界知识
  if (arg === -1) summon_num = Math.trunc(summon_num / 2);

  for (let i = 0; i < summon_num; i += 1) {
    let item = rand_monster_number(rand);
    const power = Math.trunc((item - 100) / 10);
    let count;

    if (arg === 0 || arg === -1) {
      count = rand(25 - power * 3) + 1;
      for (const threshold of [20, 40, 60, 80, 100]) {
        if (master_level >= threshold) count += 1;
      }
      if (EraChara.get(0).talent.succubus_knowledge === 1) count += 1; // 淫魔知识

      const added = era.getAddedCharacters();
      // GETCHARA(35) <= 0 的条件会把不在场与 0 号都跳过。
      // TALENT:35:1254 = 魔界公主（菲娅线结局写入），在场时召唤数 +50%。
      if (added.includes(35) && EraChara.get(35).talent.demon_princess === 1) {
        count = Math.trunc((count * 150) / 100);
      }
      if (
        added.includes(21) &&
        EraChara.get(21).talent.armor_break === 1 &&
        (item === 160 || item === 170)
      ) {
        count = Math.trunc((count * 150) / 100);
      }
      era.print(`${item_name(item)}召唤出${count}只`);
      add_monsters(item, count);
      continue;
    }

    count = rand(3) + 1;
    if (rand(2) === 0) item = 191 + rand(3);
    const father = EraChara.get(arg).cflag.child_father; // CFLAG:111 孩子父亲
    const race = EraChara.get(arg).talent.race; // TALENT:314 种族
    if (father === 0) {
      item = 191 + rand(3);
    } else if (father === -2 && race === 5) {
      if (rand(2) === 0) {
        item = 141;
        count += rand(3);
      } else {
        item = 151;
      }
    } else if (father === -2) {
      item = rand(2) === 0 ? 114 : 141;
      count += rand(3);
    }

    const name = EraChara.get(arg).name ?? '';
    const source = EraChara.get(arg).cflag.pregnancy_partner; // CFLAG:102 妊娠相手
    const state = EraChara.get(arg).cflag.state; // CFLAG:1 角色状态
    if (state === 9) {
      if ([2, 3, 4, 7].includes(source)) {
        era.print(`${name}生下的孩子被拿到不知何处了。`);
      } else {
        era.print(`${name}生下的${count}只${item_name(item)}全部被处理掉了。`);
      }
    } else if ([2, 3, 4, 7].includes(source)) {
      era.print(`${name}生下的孩子启程了。`);
    } else {
      era.print(`${name}生下的${count}只${item_name(item)}增加到战斗力里了。`);
      add_monsters(item, count);
      if (
        father !== -2 &&
        (race === 3 || race === 4) &&
        count === 1 &&
        rand(2) === 0
      ) {
        if (race === 3) {
          era.print('哦呀？！生了双胞胎呢！生了一只吸血鬼');
          // 未持有的道具在读面上是 undefined（引擎只建 item.hold 桶，不按
          // 序号预置），`undefined < 999` 恒假、`undefined + 1` 是 NaN——
          // 先按 0 兜底再写回，与 add_monsters 的 `|| 0` 同一个口径
          const owned = era_item.vampire.count || 0;
          if (owned < 999) era_item.vampire.count = owned + 1;
        } else {
          era.print('哦呀？！生了双胞胎呢！生了一只无头骑士');
          const owned = era_item.dullahan.count || 0;
          if (owned < 999) era_item.dullahan.count = owned + 1;
        }
      }
    }
    break;
  }
  await era.waitAnyKey();
  return 0;
}

/** pregnancy_master：自身 JUMP 自身的已知缺陷。 */
function pregnancy_master() {
  throw new Error('pregnancy_master 会无限尾调用自身');
}

module.exports = {
  summon_monster,
  pregnancy_master,
  summon_monster_master,
  monster_total_count,
  rand_monster_number,
};
