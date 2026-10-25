/**
 * @file 战斗状态（普通对象，issue #883）。
 *
 * 原来按步长 100 存在 E 表（引擎变量表，yml/E.yml 声明五列布局）里，读字段
 * 靠 `head + 3` 这类偏移。改成普通对象的两条理由：
 *
 *   - **这份数据全部是单次流程内的中转值。** 一列的十二个槽由 monster_data
 *     写出（防御三列在战斗开场、勇者配下在 com88、CELL 在凌辱流程），随后
 *     由同一次流程的读者取用；没有任何读者依赖「上一次战斗留下的值」，也
 *     没有跨回合约定——依赖残留的那几处（使役魔兽的描写、凌辱列）读到的
 *     都是「最后写者」的残留，不是设计意图。
 *   - **它不该进存档。** 存档页（page-save-load 的 save_game）只在 SHOP
 *     状态可达，战斗跑在 EVENTTURNEND 里、中途没有回到 SHOP 的转场，所以
 *     玩家在战斗中存不了档；但回合结算尾部的自动存档（99 号槽）紧跟在
 *     战斗之后，会把当时的残留原样写进存档。改成普通对象后这份残留不再
 *     落盘（ADR-0006 的判据要求「同一条寻址旧档读出的值仍是它现在的
 *     语义」——寻址本身没有了，旧档里的 e 桶无人再读，不构成破坏性改动）。
 *
 * 布局：`BATTLE_COLUMN` 是列号（原列头 ÷ 100），一列是十二个具名字段的
 * 普通对象。字段与原来的偏移一一对应：+0 id（怪物识别号）、+1 level、
 * +2 attack、+3 defense、+4 speed、+5 special（特殊攻击号）、+6 magic、
 * +7 rape_type（凌辱类型）、+8 boss（Boss 化标志）、+9 status（状态异常位）、
 * +10 resistance（耐性位）、+99 count（数量）。
 *
 * 列号越界读**全 0 列**，不抛错：原 E 表对未声明序号就是读 0，而战斗侧
 * 有一条历史路径会带着 -1 列号继续算（pick_defender_column 的三列全灭，
 * 见 dungeon-battle.js 的注释），那时的读侧行为是「读到 0」而不是中断。
 */

'use strict';

/**
 * 战斗状态的列号（原 E 表的列头 0/100/200/300/400/500 ÷ 100）。
 */
const BATTLE_COLUMN = Object.freeze({
  /** 防御怪物第 1 列 */
  DEFENSE_1: 0,
  /** 防御怪物第 2 列 */
  DEFENSE_2: 1,
  /** 防御怪物第 3 列 */
  DEFENSE_3: 2,
  /** 勇者（A）的配下怪物 */
  MINION_A: 3,
  /** 勇者（T）的配下怪物 */
  MINION_T: 4,
  /** 结婚·凌辱流程用的怪物数据 */
  RAVISH: 5,
});

/** 列的总数（列号 0-5；越界读回落全 0 列） */
const COLUMN_COUNT = 6;

/**
 * 一列的初值：十二个字段全 0（原 E 表全区初始 0）。
 * @returns {object} 一列的战斗状态
 */
function new_column() {
  return {
    id: 0,
    level: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    special: 0,
    magic: 0,
    rape_type: 0,
    boss: 0,
    status: 0,
    resistance: 0,
    count: 0,
  };
}

let columns = Array.from({ length: COLUMN_COUNT }, new_column);
// 越界列号共用的全 0 列（读侧同原 E 表的「未声明序号读 0」）
const out_of_range = new_column();

/**
 * 取一列的战斗状态。
 * @param {number} column 列号（BATTLE_COLUMN 的取值）
 * @returns {object} 该列（列号越界时是全 0 列）
 */
function battle_column(column) {
  const row = columns[column];
  return row === undefined ? out_of_range : row;
}

/**
 * 清空全部列（新游戏与用例的复位用）。
 *
 * 就地清零而不是换新数组：调用方手里可能握着列对象的引用（一次流程里
 * 反复读同一列），换数组会让那些引用指向脱开的旧对象。
 * @returns {void}
 */
function reset_battle_state() {
  for (const row of columns) {
    Object.assign(row, new_column());
  }
  Object.assign(out_of_range, new_column());
}

module.exports = {
  BATTLE_COLUMN,
  battle_column,
  reset_battle_state,
};
