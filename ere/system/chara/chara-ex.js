/**
 * @file 角色专属初始化的分发入口、扩展口上编号与 EX 素质名的查询（issue #21、
 * #834）。
 *
 * 分发语义（issue #21 定）：
 *     SIF NO:ARG >= 17 || NO:ARG == 0
 *     TRYCALLFORM CHARA_EX_{NO:ARG}
 * 条件为真（编号 ≥17 或 =0）才分发——编号 1-16 的角色从不分发，是设计
 * 而非遗漏。ere 以角色 ID 直接寻址，「注册序换算为编号」的做法（读档钩子里的
 * 调用方式）不再需要。
 *
 * 原作的八个 CHARA_EX 实现只做一件事：把角色专属的 EX 素质写进刚加入的角色
 * （魔王、琼、普林希斯、嘉德、狂王、菲娅、丽塔、卡拉）。这些值自 #834 起写在
 * 角色文件（yml/Chara*.yml 的「ex_talent」段）里，由引擎在 addCharacter 时
 * 套用，本文件的注册段随之删除——加入点不再手工赋值，分发族因此没有实现，
 * `add_chara_ex` 恒返回 whenMissing 0。族本身与它的调用点留到「删除分发族」
 * 一起处理，这里不提前拆（调用点是原作的移植锚点，拆法与其余族同批）。
 */

const era = require('#/era-electron');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');

// 声明的编号空间：45 个角色编号（0-24、31-35、100、
// 150、201-211、223、777），离线生成（#7 决议「索引全部离线生成」——运行时
// 不能扫描文件，dev-guides/18-tools.md）。由枚举目录得来；角色表进 yml/ 后
// 升级为 tools/ 校验脚本核对（数据管线票）。
const DECLARED_CHARA_IDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 31, 32, 33, 34, 35, 100, 150, 201, 202, 203, 204, 205, 206, 207,
  208, 209, 210, 211, 223, 777,
];

const chara_ex = new DispatchFamily('CHARA_EX', DECLARED_CHARA_IDS);

let get_ex_kojo_num_local = 0;

/**
 * get_ex_kojo_num：扫描 EX 素质 101..800，最后一格
 * 命中者映射到扩展口上编号。函数开头不清静态局部，因此无命中时
 * 会残留上一次结果；这里保留该缺陷。
 * @param {number} cid 角色 ID
 * @returns {number} 扩展口上编号（1001..1700），或静态局部的既有值
 */
function get_ex_kojo_num(cid) {
  for (let count = 101; count < 801; count += 1) {
    if (era.get(`ex_talent:${cid}:${count}`)) {
      get_ex_kojo_num_local = count + 900;
    }
  }
  return get_ex_kojo_num_local;
}

/**
 * ex_talentname：EX 素质的显示名（名字的唯一来源是 yml/Ex_Talent.yml）。
 *
 * 未登记的序号必须在读名字前跳过：引擎的 `<表>name:<序号>` 地址在表在场而
 * 序号没有名字时直接抛 TypeError（游戏卡死），而调用方会扫过成片的空位
 * （素质列表的 801-899 段、日常类型的 101-199 段）。
 * @param {number} id EX 素质序号
 * @returns {string} 名字；未登记返回空串
 */
function ex_talentname(id) {
  if (!era.get('ex_talentkeys').includes(id)) {
    return '';
  }
  return era.get(`ex_talentname:${id}`);
}

/**
 * 角色专属初始化的分发入口（issue #21）。新游戏加入角色后逐个调用
 * （ere 侧直接传角色号）。
 *
 * @param {number} chara_id 角色 ID
 * @returns {Promise<any>} 实现的返回值；分发条件不满足或空间内缺失时返回 0
 *   （本调用点的缺失语义由调用点声明，不归注册表管，#7）
 */
async function add_chara_ex(chara_id) {
  // 分发条件：编号 ≥17 或 =0 才分发到对应实现
  if (!(chara_id >= 17 || chara_id === 0)) {
    return 0;
  }
  // 按编号分发到 CHARA_EX_{编号} 实现。原实现经隐式 TARGET 拿到角色
  // （首行 TARGET = ARG），ere 由 args 显式传入
  return chara_ex.call(chara_id, { whenMissing: 0, args: [chara_id] });
}

module.exports = {
  add_chara_ex,
  chara_ex,
  DECLARED_CHARA_IDS,
  get_ex_kojo_num,
  ex_talentname,
};
