/**
 * @file 圣灵骑士堡垒的一对一对战（issue #470，阶段 5c Q13 侵略残余·3）。
 *
 * 元勇者（ATKER，玩家派出的奴隶）对圣灵骑士（DEFER）。攻击本体不重写：
 * 主循环调用的 duel_attack 已由 ere/dungeon/dungeon-battle2.js 的
 * 真身覆盖（arg3 = 3 奴隶→圣灵 / 2 圣灵→奴隶，泛化时连
 * 伤害修正链一起带走）。速度补正的两份变体逐条同构——同一组素质判定
 * （243 奇袭 / 245 恶魔翅膀 / 258 俊足 / 314==10 霍比特 / 314==11 矮人）、
 * 同一对装备效果（3 速度UP / 12 速度減），仅 X/Y 掷点位置不同（旧引擎
 * 由调用方掷、补正函数改全局，ere 侧随 speed_plus2 内聚），直接复用
 * speed_plus2。两处主循环的差异只剩平局方向：BATTLE2 是 `IF RESULT > 0`
 * （平局勇者先攻），本文件是 `IF X >= Y`（平局奴隶先攻）。
 * 另两个攻击变体（泛化前的旧实现）没有任何活调用方
 * （零引用，含文件内部互调），不移植、不实现。
 *
 * 移植说明（有意保留的写法差异）：
 *   - 主循环的 `IF RESULT == 999` 里 BREAK 嵌在 `IF FLAG:5 & 32`
 *     内——显示关闭时「战斗中断」（999）不退出循环；BATTLE2 同位置的
 *     BREAK 在该检查外。当前依赖下 999 不可达
 *     （duel_attack 的 999 只能出自 MAGIC 的 target_type 1 分支，本战斗
 *     恒 0），该差异暂无实跑面，测试用可替换的 duel_attack 钉住。
 *   - 弹药补充 15，不是 BATTLE2 的 7——各文件字面量分别保留。
 *   - 先制只看 TALENT:252，没有 BATTLE2 先制段的 CFLAG:503
 *     位 5「先制不可」判定。
 *   - death_check4 比 death_check2 少一档：狂王分支没有
 *     `TALENT:280 && 气力 <= 1000` 的提前丧失战意档（death_check2 有）。
 *   - 弹药（CFLAG:571）属 dungeon 域，invasion 侧写走 chara 门面的
 *     dungeon.弹药（tools/facade-names.js 的 571 号存取器，#470）。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { weapon_restore } = require('#/system/equip/weapon-restore');
// 模块对象引用（dungeon-battle.test.js / dungeon-magic.test.js 先例）：
// duel_attack / speed_plus2 在测试里整体可替换
const battle2 = require('#/dungeon/dungeon-battle2');

/** 名字承载（#5 决议：SAVESTR:x ↔ callname:x:-1，随 dungeon-battle2 复用） */
const { name_of } = battle2;

/**
 * death_check4：圣灵骑士对战的中断判定。圣灵（B）先判、
 * 元勇者（A）后判；狂王线（FLAG:5 位 7）下元勇者退场状态 9（被带回
 * 狂王的城堡），通常线状态 0（被赶到堡垒外）。
 * @param {number} atker 元勇者
 * @param {number} defer 圣灵骑士
 * @returns {Promise<number>} 0 = 继续 / 1 = 元勇者退场 /
 *   2 = 圣灵骑士退场
 */
async function death_check4(atker, defer) {
  // 圣灵ナイト死亡判定（PRINTFORML，无等待）
  if (chara(defer).dungeon.体力 <= 0) {
    era.print(`${name_of(defer)}徒劳地奋战着，力竭了。`);
    chara(defer).invasion.状态 = 0;
    return 2;
  }
  if (chara(defer).dungeon.体力 <= 300) {
    era.print(`${name_of(defer)}感觉到生命垂危，投降求饶了。`);
    chara(defer).invasion.状态 = 0;
    return 2;
  }
  if (chara(defer).dungeon.气力 <= 0) {
    era.print(`${name_of(defer)}失去了战意，丢掉武器投降了。`);
    chara(defer).invasion.状态 = 0;
    return 2;
  }

  // 魔王側の生き残りを判定（狂王線：退场状态 9）
  const crazy = (era.get('flag:5') || 0) & 128;
  if (chara(atker).dungeon.体力 <= 0 && crazy) {
    era.print(`${name_of(atker)}在圣灵骑士前力竭倒下了。`);
    era.print(`${name_of(defer)}把她抱起来并带回了狂王的城堡。`);
    await era.waitAnyKey();
    chara(atker).invasion.状态 = 9;
    return 1;
  }
  if (chara(atker).dungeon.体力 <= 300 && crazy) {
    era.print(`${name_of(atker)}感觉到生命垂危，投降求饶了。`);
    era.print(`${name_of(defer)}把她绑起来并带回了狂王的城堡。`);
    await era.waitAnyKey();
    chara(atker).invasion.状态 = 9;
    return 1;
  }
  if (chara(atker).dungeon.气力 <= 0 && crazy) {
    era.print(`${name_of(atker)}失去了战意，丢掉武器投降了。`);
    era.print(`${name_of(defer)}把她绑起来并带回了狂王的城堡。`);
    await era.waitAnyKey();
    chara(atker).invasion.状态 = 9;
    return 1;
  }

  // 通常線（退场状态 0；HP≤0 档无第二行）
  if (chara(atker).dungeon.体力 <= 0) {
    era.print(`${name_of(atker)}在圣灵骑士前力竭倒下了。`);
    chara(atker).invasion.状态 = 0;
    return 1;
  }
  if (chara(atker).dungeon.体力 <= 300) {
    era.print(`${name_of(atker)}感觉到生命垂危，投降求饶了。`);
    era.print(`${name_of(defer)}怜悯着倒下的她，把她赶到了堡垒外。`);
    await era.waitAnyKey();
    chara(atker).invasion.状态 = 0;
    return 1;
  }
  if (chara(atker).dungeon.气力 <= 0) {
    era.print(`${name_of(atker)}失去了战意，丢掉武器投降了。`);
    era.print(`${name_of(defer)}怜悯着倒下的她，把她赶到了堡垒外。`);
    await era.waitAnyKey();
    chara(atker).invasion.状态 = 0;
    return 1;
  }
  return 0;
}

/**
 * arcana_battle：元勇者对圣灵骑士的一对一对战主循环。
 * @param {number} atker 元勇者（arcana_fort 换手传入）
 * @param {number} defer 圣灵骑士
 * @param {(n: number) => number} rand RAND:N 随机源
 * @param {object} [move_ctx] 战斗上下文（透传 duel_attack，迷宫侧先例）
 * @returns {Promise<number>} 2 = 圣灵骑士退场（胜）、
 *   0 = 未分胜负（元勇者被击退或超时）
 */
async function arcana_battle(atker, defer, rand, move_ctx = {}) {
  const settings = era.get('flag:5') || 0;

  // 開場演出（FLAG:5 位 5 详细战斗显示）
  if ((settings & 32) !== 0) {
    era.print('* 一对一单挑！*');
    await era.waitAnyKey();
    era.drawLine();
  }

  // 弾の補充（双方 15 发；dungeon 域字段走门面）
  chara(atker).dungeon.弹药 = 15;
  chara(defer).dungeon.弹药 = 15;

  // 先制（元勇者，TALENT:252）
  if ((era.get(`talent:${atker}:252`) || 0) === 1) {
    await battle2.duel_attack(atker, 2, defer, 3, rand, move_ctx);
  }

  // 先制圣灵
  if ((era.get(`talent:${defer}:252`) || 0) === 1) {
    await battle2.duel_attack(defer, 2, atker, 2, rand, move_ctx);
  }

  // 主循环（FOR TURN, 0, 20）
  for (let turn = 0; turn < 20; turn += 1) {
    // 時間切れ（TURN > 15）
    if (turn > 15) {
      if ((settings & 32) !== 0) {
        era.print(`${name_of(atker)}逃跑了………`);
      }
      chara(atker).dungeon.气力 -= rand(30);
      break;
    }

    // パラメータ表示。BARL（HP/气力条，宽 50）无 era API 通道，
    // 跳过（dungeon.js 的 BARL 先例）；其余 PRINT 段一一对应。
    if ((settings & 32) !== 0) {
      era.print(name_of(atker));
      era.print('HP');
      era.print('气力');
      era.print(
        `攻击${chara(atker).dungeon.攻击力} 防御${chara(atker).dungeon.防御力}`,
      );
      era.print('VS');
      await era.waitAnyKey();
      era.print(name_of(defer));
      era.print('HP');
      era.print('气力');
      era.print(
        `攻击${chara(defer).dungeon.攻击力} 防御${chara(defer).dungeon.防御力}`,
      );
      await era.waitAnyKey();
    }

    // 先制（旧処理の場所）——只剩显示检查内的一条 DRAWLINE
    if ((settings & 32) !== 0) {
      era.drawLine();
    }

    // 先攻後攻決定（X = RAND:6、Y = RAND:6 + speed_plus2 补正）。
    // X >= Y（含平局）→ 奴隶先攻。
    const speed = battle2.speed_plus2(atker, defer, rand);
    if (speed >= 0) {
      // 奴隷先攻
      let result = await battle2.duel_attack(
        atker,
        0,
        defer,
        3,
        rand,
        move_ctx,
      );
      // 圣灵後攻（RESULT == 0 时才打）
      if (result === 0) {
        result = await battle2.duel_attack(defer, 1, atker, 2, rand, move_ctx);
      }
      // RESULT == 999：BREAK 嵌在 IF FLAG:5 & 32 内（文件头）
      if (result === 999 && (settings & 32) !== 0) {
        era.print('战斗中断了');
        break;
      }
    } else {
      // 圣灵先攻
      let result = await battle2.duel_attack(
        defer,
        0,
        atker,
        2,
        rand,
        move_ctx,
      );
      // 奴隷後攻
      if (result === 0) {
        result = await battle2.duel_attack(atker, 1, defer, 3, rand, move_ctx);
      }
      // 同构段
      if (result === 999 && (settings & 32) !== 0) {
        era.print('战斗中断了');
        break;
      }
    }

    // 退场判定（RESULT 2 / 1 均 BREAK）
    const dc = await death_check4(atker, defer);
    if (dc !== 0) {
      break;
    }

    // 双方回合损耗
    chara(atker).dungeon.气力 -= rand(20);
    chara(defer).dungeon.气力 -= rand(20);
  }

  // 圣灵骑士仍在任（CFLAG:1 == 2）→ 元勇者被击退的叙述
  // （PRINTFORML，无显示开关检查——原样保留）
  if (chara(defer).invasion.状态 === 2) {
    era.print(`${name_of(atker)}被圣灵骑士击败了………`);
  }

  // 装備の回復（双方）
  await weapon_restore(atker);
  await weapon_restore(defer);

  // 圣灵骑士退场（CFLAG:1 == 0）→ RETURN 2
  if (chara(defer).invasion.状态 === 0) {
    return 2;
  }
  return 0;
}

module.exports = {
  arcana_battle,
  death_check4,
};
