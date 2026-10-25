/**
 * @file 战斗状态（普通对象，issue #883）。
 *
 * 原来按步长 100 存在 E 表（引擎变量表，yml/E.yml 声明五列布局）里，读字段
 * 靠 `head + 3` 这类偏移。改成普通对象的两条理由：
 *
 *   - **这份数据全部是单次流程内的中转值。** 一列的十二个槽由 monster_data
 *     写出（防御三列在战斗开场、勇者配下在使役魔兽的指令里、结婚·凌辱列在
 *     各自的流程里），随后由同一次流程的读者取用；没有任何读者依赖「上一次
 *     战斗留下的值」，也没有跨回合约定——依赖残留的那几处（使役魔兽的描写、
 *     凌辱列）读到的都是「最后写者」的残留，不是设计意图。
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
 * 列号越界读**全 0 列**，不抛错：原 E 表对未声明序号就是读 0（不报错、不
 * 中断），而战斗侧仍有一条「把角色号当列号」的既有路径（monster-skill 的
 * 精英分支，角色号可以大于列数），那里的越界读同样按全 0 处理，与旧写法
 * 「读到别的槽的残留」相比只是取值不同、不会让战斗中断。
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
 * 字段名按原偏移表的次序（+0 … +10；+99 的 count 在表外）。
 *
 * 只给「把角色号当 E 表下标」那处既有怪癖换算用（见下面的
 * `battle_legacy_reader`）：修那条怪癖的工单里，本常量与过渡层一起删。
 */
const BATTLE_FIELD_ORDER = Object.freeze([
  'id',
  'level',
  'attack',
  'defense',
  'speed',
  'special',
  'magic',
  'rape_type',
  'boss',
  'status',
  'resistance',
]);

/**
 * 一列的初值：十二个字段全 0（原 E 表全区初始 0）。
 * @returns {object} 一列的战斗状态
 */
function new_column() {
  const row = {};
  for (const field of BATTLE_FIELD_ORDER) {
    row[field] = 0;
  }
  row.count = 0;
  return row;
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

/** 一列的标准字段集（十二项）；其余键是过渡层的 legacy 槽 */
const COLUMN_FIELDS = Object.freeze([...BATTLE_FIELD_ORDER, 'count']);

/**
 * 旧 E 列的一格：把「列号 + 0..99 的偏移」换算到 (列对象, 键名)。
 *
 * 旧 E 表一列有 **100 个槽**（码距 100），而已具名化的只有十二个：+0…+10 与
 * +99。剩下 11…98 在旧表里同样存在（没人命名、恒 0），但「把角色号当列偏移」
 * 那条怪癖会踩到它们（`E:<角色号 + n>`），所以这一段单独存：
 *
 *   - offset 0…10  → `BATTLE_FIELD_ORDER[offset]`（与具名字段**共享**：
 *     精英路径的 `+3 防御` 确实会改列 0 的 defense）
 *   - offset 11…98 → `legacy_<offset>`（惰性、缺省 0，谁都不读）
 *   - offset 99    → `count`
 *
 * 读缺省 **0** 而不是 undefined——旧 `e_get` 就是 `era.get(...) || 0`，
 * 缺省成 undefined 会让 `dmg + 等级` 变成 NaN。
 * @param {number} index 旧写法的 E 下标
 * @returns {{row: object, field: string}} 列对象与键名
 */
function battle_legacy_cell(index) {
  const offset = index % 100;
  const field =
    offset === 99
      ? 'count'
      : offset < BATTLE_FIELD_ORDER.length
        ? BATTLE_FIELD_ORDER[offset]
        : `legacy_${offset}`;
  return { row: battle_column(Math.floor(index / 100)), field };
}

/**
 * 按旧 E 下标读写的过渡层（读缺省 0，写落 `battle_legacy_cell` 给出的槽）。
 *
 * 只服务一处既有怪癖：精英路径把角色号当列号传（monster-skill 的
 * `use_monster_skill` 在 `user_type === 2` 时）。换成「角色号 = 列号」会让
 * 读写落到另一个**真实列**的具名字段上（`+2 防御` 会写到活着的防御列），
 * 那是行为变更；这条路径继续按旧下标换算，修怪癖另开工单。
 * @param {number} base 旧写法的基准下标（普通路径 = 列号 × 100）
 * @returns {{read: Function, write: Function}} 按偏移读写
 */
function battle_legacy_reader(base) {
  return {
    read: (offset) => {
      const { row, field } = battle_legacy_cell(base + offset);
      return row[field] || 0; // 旧 e_get 的 `|| 0`：缺省 0，不吃 undefined
    },
    write: (offset, value) => {
      const { row, field } = battle_legacy_cell(base + offset);
      row[field] = value;
    },
  };
}

/**
 * 清空全部列（新游戏与用例的复位用）。
 *
 * 就地清零而不是换新数组：调用方手里可能握着列对象的引用（一次流程里
 * 反复读同一列），换数组会让那些引用指向脱开的旧对象。
 * @returns {void}
 */
function reset_battle_state() {
  for (const row of [...columns, out_of_range]) {
    // 过渡层的 legacy 槽一并清掉，复位后一列回到「十二个具名字段」的形状
    for (const key of Object.keys(row)) {
      if (!COLUMN_FIELDS.includes(key)) {
        delete row[key];
      }
    }
    Object.assign(row, new_column());
  }
}

module.exports = {
  BATTLE_COLUMN,
  BATTLE_FIELD_ORDER,
  battle_column,
  battle_legacy_cell,
  battle_legacy_reader,
  reset_battle_state,
};
