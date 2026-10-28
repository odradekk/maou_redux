/**
 * @file 队伍伤势判定（CHECK_STATUS 一族）。
 *
 * 从队长记忆（CFLAG:533）解析三人（自己是队长读自己的 531/532；自己是
 * 同伴则读队长的，且若自己占了同伴A 位则视角换成队长），对侵攻 / 迎击中
 * （CFLAG:1 == 2 || 3）的三人各走判定链，产出 8 槽 STATUS 数组。
 *
 * 本文件是 CHECK_STATUS 的唯一真身：迷宫主流程（run_dungeon）与凌辱口上
 * （kojo-dungeon-ravish 的畏怖判定）都直接取用。放在迷宫战斗模块之外，
 * 是因为两边都要它，而迷宫主流程反过来依赖战斗模块——真身留在主流程里
 * 就只能靠函数内 require 绕开装载顺序。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * check_status 的单人判定段（队长 / 仲間A / 仲間B 的同构链）：
 * 按 HP/MP 百分比写 CFLAG:534（状态档）并返回累加的
 * STATUS 槽位。
 *
 * 首分支 `HP% < 60 || MP% < 50` 已吞并其后全部六个分支（身体抱恙 / 重伤 /
 * 头脑发昏 / 濒死×2 / 气绝在逻辑上均不可达），实际可达态只有「轻伤（2）」
 * 与「元气满满（1）」两档——run_dungeon 的撤退判定（534 >= 3 / == 4）
 * 随之只有「轻伤 + 胆小」一分支真实可达。
 *
 * @param {number} cid 角色
 * @param {number} mode MODE（非 0 时静默不打印）
 * @returns {number} STATUS 槽位（1 轻伤 / 0 元气满满；2-6 为不可达档）
 */
function check_status_one(cid, mode) {
  const name = chara_callname(cid);
  const hp_pct = Math.floor(
    (chara(cid).dungeon.体力 * 100) / (era.get(`maxbase:${cid}:0`) || 0),
  );
  const wp_pct = Math.floor(
    (chara(cid).dungeon.气力 * 100) / (era.get(`maxbase:${cid}:1`) || 0),
  );
  // 阈值（S1_HP 60 / S1_MP 50 / S2_HP 35 / S2_MP 30 / S3_HP 20 /
  // S3_MP 10）随各分支字面内联。ELSEIF 链以顺序 if + return
  // 等价改写（首个真条件胜出）——分支 2-7 的条件被首分支覆盖，
  // 改写不引入行为差异
  if (hp_pct < 60 || wp_pct < 50) {
    if (!mode) {
      era.print(`${name}轻伤。`);
    }
    chara(cid).dungeon.已接任务 = 2; // CFLAG:534 = 2
    return 1;
  }
  if (wp_pct < 50) {
    // 不可达（首分支已含），保留
    if (!mode) {
      era.print(`${name}身体抱恙。`);
    }
    chara(cid).dungeon.已接任务 = 2;
    return 4;
  }
  if (hp_pct < 35 || wp_pct < 30) {
    // 不可达，保留
    if (!mode) {
      era.print(`${name}重伤。`);
    }
    chara(cid).dungeon.已接任务 = 3;
    return 2;
  }
  if (wp_pct < 30) {
    // 不可达，保留
    if (!mode) {
      era.print(`${name}头脑发昏。`);
    }
    chara(cid).dungeon.已接任务 = 3;
    return 5;
  }
  if (hp_pct < 20 && wp_pct < 10) {
    // 不可达，保留
    if (!mode) {
      era.print(`${name}濒死。`);
    }
    chara(cid).dungeon.已接任务 = 4;
    return 3;
  }
  if (hp_pct < 20) {
    // 不可达，保留
    if (!mode) {
      era.print(`${name}濒死。`);
    }
    chara(cid).dungeon.已接任务 = 4;
    return 3;
  }
  if (wp_pct < 10) {
    // 不可达，保留
    if (!mode) {
      era.print(`${name}气绝。`);
    }
    chara(cid).dungeon.已接任务 = 4;
    return 6;
  }
  if (!mode) {
    era.print(`${name}元气满满。`);
  }
  chara(cid).dungeon.已接任务 = 1; // CFLAG:534 = 1
  return 0;
}

/**
 * check_status：队伍伤势判定。
 *
 * @param {number} arg0 队长（ARG:0）
 * @param {number} [mode] MODE（缺省 0；非 0 静默）
 * @returns {Promise<number[]>} RETURN STATUS,STATUS:1..STATUS:7（8 值）：
 *   [0]=STATUS:0（无消费）、[1]轻伤数、[2]重伤数、[3]濒死数、[4]身体抱恙
 *   数、[5]头脑发昏数、[6]气绝数、[7]评级
 */
async function check_status(arg0, mode = 0) {
  let sidea;
  let sideb;
  if ((era.get(`cflag:${arg0}:533`) || 0) === arg0) {
    // 自己是队长
    sidea = era.get(`cflag:${arg0}:531`) || 0;
    sideb = era.get(`cflag:${arg0}:532`) || 0;
  } else {
    // 视角换队长；自己占同伴位时把自己换成队长号
    const leader = era.get(`cflag:${arg0}:533`) || 0;
    sidea = era.get(`cflag:${leader}:531`) || 0;
    sideb = era.get(`cflag:${leader}:532`) || 0;
    if (sidea === arg0) {
      sidea = leader;
    }
    if (sideb === arg0) {
      sideb = leader;
    }
  }

  // varset STATUS
  const status = [0, 0, 0, 0, 0, 0, 0, 0];

  const place = chara(arg0).invasion.状态;
  if (place === 2 || place === 3) {
    // 队长
    status[check_status_one(arg0, mode)] += 1;
    // 仲間A
    if (sidea > 0) {
      status[check_status_one(sidea, mode)] += 1;
    }
    // 仲間B
    if (sideb > 0) {
      status[check_status_one(sideb, mode)] += 1;
    }
  }

  // 队伍当前状态评级：基础分0|元气满满+0|轻伤+1|身体抱恙+1|
  // 重伤+3|头脑发昏+2|濒死+4|气绝+4
  status[7] =
    status[1] +
    status[2] +
    status[3] * 4 +
    status[4] * 3 +
    status[5] * 2 +
    status[6] * 4;
  // RETURN STATUS,STATUS:1..STATUS:7
  return status;
}

module.exports = { check_status, check_status_one };
