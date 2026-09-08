/**
 * @file 怪物召唤与怪物编号抽选（issue #346，阶段 5a L15）。
 *
 * 源: target/ERB/怪物相關/SUMMON_MONSTER.ERB 全函数（:5-219）。
 *
 * 移植说明：
 *   - 原作 RAND:N 全部经 rand 参数注入；缺省均匀随机。
 *   - ARG == -1 是弱召唤：召唤轮数按整数除法折半，保留陷阱调用实参。
 *   - @PREGNANCY_MASTER 的唯一语句是 JUMP 自身并把参数改为 MASTER。
 *     这是原作的无限尾调用缺陷；函数保留为显式抛错，避免 JS 栈溢出掩盖
 *     原因。当前无调用点。
 */

'use strict';

const era = require('#/era-electron');
const { item_name } = require('#/dungeon/monster-data');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** @MONSTER_TOTAL_COUNT（:169-182）：45 种常规怪物的库存总数。 */
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
 * @RAND_MONSTER_NUMBER（:185-219）：从 100-184 抽选未满 999 只的怪物。
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

/** @SUMMON_MONSTER_MASTER（:154-166）：魔王生产固定近卫兵。 */
function summon_monster_master(arg = 0, rand = default_rand) {
  era.print('');
  era.drawLine();
  const count = rand(3) + 1;
  const id = 191 + rand(3);
  const name = era.get(`callname:${arg}:-1`) ?? '';
  era.print(`${name}生下了${count}只${item_name(id)}。`);
  add_monsters(id, count);
  return 0;
}

/**
 * @SUMMON_MONSTER（:5-148）：通常/弱召唤，或由指定角色生产怪物。
 * @param {number} [arg=0] 0=通常召唤，-1=弱召唤，正数=生产者角色 ID
 * @param {(n:number)=>number} [rand] RAND:N 随机源
 */
async function summon_monster(arg = 0, rand = default_rand) {
  era.drawLine();
  let summon_num = 5;
  const master_level = era.get('cflag:0:9') || 0; // CFLAG:MASTER:9 等级
  for (const threshold of [10, 30, 50, 70, 100]) {
    if (master_level >= threshold) summon_num += 1;
  }
  if ((era.get('talent:0:325') || 0) === 1) summon_num += 1; // 魔界知识
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
      if ((era.get('talent:0:327') || 0) === 1) count += 1; // 淫魔知识

      const added = era.getAddedCharacters();
      // 原作 GETCHARA(35) <= 0 的条件会把不在场与 0 号都跳过。
      if (added.includes(35) && (era.get('talent:35:1254') || 0) === 1) {
        count = Math.trunc((count * 150) / 100);
      }
      if (
        added.includes(21) &&
        (era.get('talent:21:474') || 0) === 1 &&
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
    const father = era.get(`cflag:${arg}:111`) || 0; // CFLAG:111 孩子父亲
    const race = era.get(`talent:${arg}:314`) || 0; // TALENT:314 种族
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

    const name = era.get(`callname:${arg}:-1`) ?? '';
    const source = era.get(`cflag:${arg}:102`) || 0; // CFLAG:102 妊娠相手
    const state = era.get(`cflag:${arg}:1`) || 0; // CFLAG:1 角色状态
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
          if ((era.get('item:172') || 0) < 999) era.add('item:172', 1);
        } else {
          era.print('哦呀？！生了双胞胎呢！生了一只无头骑士');
          if ((era.get('item:171') || 0) < 999) era.add('item:171', 1);
        }
      }
    }
    break;
  }
  await era.waitAnyKey();
  return 0;
}

/** @PREGNANCY_MASTER（:151-152）：原作自身 JUMP 自身的已知缺陷。 */
function pregnancy_master() {
  throw new Error('原作 PREGNANCY_MASTER 会无限尾调用自身');
}

module.exports = {
  summon_monster,
  pregnancy_master,
  summon_monster_master,
  monster_total_count,
  rand_monster_number,
};
