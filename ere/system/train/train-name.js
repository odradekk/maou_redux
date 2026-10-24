/**
 * @file 自定义指令名表：train_name_init 的播种与 read_train_name 读助手。
 *
 * trainalias 是指令常量（#/data/train-command-const 的静态名，#43）之上的
 * 可写覆盖层：train_name_init 在 EVENTTRAIN 内一次性播种初值，此后
 * 按存档定制（J4 的自定义菜单方格标签、J19 的 com120/com121 按当前指令号
 * 取名）。
 *
 * **本表是指令方格的标签来源，而方格编号另有来路**（#212 交付后由新录
 * 实测输出查实，J4 #214 照此接入）：
 *   - 标签：读的正是本表（trainalias，游戏自建覆盖层），且指令号已过
 *     get_adv_com 升格（升格标签会盖掉底格名：8 号格标签已是「刺激Ｇ点」
 *     ＝COM84，编号仍是 8）；64 合成分支读的才是静态名（两个号的静态名
 *     拼接）。ere 侧标签经 read_train_name(升格号) 取；
 *   - 编号：`[n]` 是 L_IDX——对全部非空静态名条目（常量里可直选的 101 个
 *     指令号）的**紧凑位次**，在可执行性检查之前自增，与当前可用性无关、
 *     稳定。两套编号只在 0-38（第一个空号 39 之前）重合（实机：按
 *     89 出穿脱衣服＝110、按 55 出交谈＝56）。玩家输入的也是
 *     L_IDX——L_IDX ↔ 指令号的映射由 J3（#213 分发骨架）建，不在
 *     本文件。承载面是扩展普通表 yml/TrainAlias.yml——表名结论
 *     （trainname 撞引擎 setVar 的 *name 只读拦截）与装载机制的引擎探针
 *     见 test/tstr-train-table.test.js 与该 yml 头注。
 *
 * 初始化检查：无下标读的是槽 0，非空即已播种——幂等。表随存档持久、每
 * 存档只播种一次；「每次读档重播种」的另一种做法与之不可区分（播种值与
 * 读档时机无关——前提是 CSTR:7 有写点，当前全库无写入；TrainAlias.yml
 * 头注记录在案）。
 *
 * 150 号槽：trainalias:150 = `<癖好名>调教`——模板在播种时求值（目标的
 * 癖好名 CSTR:TARGET:7；「調」按 #60 归一为「调」）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const {
  ADVANCED_TRAIN_COMMAND,
  TRAIN_COMMAND,
} = require('#/data/train-command-const');

/** 150 号槽的别名由播种时的目标癖好名求值（不播静态名） */
const TRAIN_ALIAS_DYNAMIC_SLOT = 150;

/**
 * train_name_init 的播种表：指令号 → 别名初值（= 指令常量里的静态名）。
 * 不播种的两类：150 是动态槽（播种时求值，见 train_name_init）；67 没有
 * 玩家可见名（常量里是空串——旧名表同样没有它，照缺不补）。
 */
const TRAIN_NAME_TABLE = {};
for (const [id, name] of Object.entries({
  ...TRAIN_COMMAND,
  ...ADVANCED_TRAIN_COMMAND,
})) {
  if (name.length > 0 && Number(id) !== TRAIN_ALIAS_DYNAMIC_SLOT) {
    TRAIN_NAME_TABLE[id] = name;
  }
}

/**
 * trainalias 一次性播种。幂等（检查：槽 0 非空即返回）。
 */
function train_name_init() {
  if ((era.get('trainalias:0') ?? '').length > 0) {
    return;
  }
  for (const [id, name] of Object.entries(TRAIN_NAME_TABLE)) {
    era.set(`trainalias:${id}`, name);
  }
  // trainalias:150 = `<癖好名>调教`（播种时求值；目标的癖好名，当前
  // 全库无写点、读值恒空）
  era.set(
    `trainalias:${TRAIN_ALIAS_DYNAMIC_SLOT}`,
    `${era.get(`cstr:${era_flag.target}:7`) ?? ''}调教`,
  );
}

/**
 * trainalias:N 的读助手（p_c 的第二级回落；com120/com121 按当前指令号
 * 取名时同用此口）。未播种/未赋值槽返回空串（#13 的 undefined 缺省处理）。
 * @param {number} id 指令编号
 * @returns {string}
 */
function read_train_name(id) {
  return era.get(`trainalias:${id}`) ?? '';
}

module.exports = { TRAIN_NAME_TABLE, read_train_name, train_name_init };
