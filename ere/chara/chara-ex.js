/**
 * @file 角色专属初始化的分发注册表与 8 个实现（issue #21）。
 *
 * 分发语义（issue #21 定）：
 *     SIF NO:ARG >= 17 || NO:ARG == 0
 *     TRYCALLFORM CHARA_EX_{NO:ARG}
 * 条件为真（编号 ≥17 或 =0）才分发——编号 1-16 的角色从不分发，是设计
 * 而非遗漏。45 个角色只有 8 个实现，其余走「空间内缺失」路径（合法缺失，
 * 返回本调用点的 whenMissing 0，不报错）。ere 以角色 ID 直接寻址，
 * 「注册序换算为编号」的做法（读档钩子里的调用方式）不再需要。
 */

const era = require('#/era-electron');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { chara } = require('#/facade/chara');

// 声明的编号空间：45 个角色编号（0-24、31-35、100、
// 150、201-211、223、777），离线生成（#7 决议「索引全部离线生成」——运行时
// 不能扫描文件，dev-guides/18-tools.md）。由枚举目录得来；角色表进 yml/ 后
// 升级为 tools/ 校验脚本核对（数据管线票）。实现集 8 个：0、31-35、223、777。
const DECLARED_CHARA_IDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 31, 32, 33, 34, 35, 100, 150, 201, 202, 203, 204, 205, 206, 207,
  208, 209, 210, 211, 223, 777,
];

const chara_ex = new DispatchFamily('CHARA_EX', DECLARED_CHARA_IDS);

let get_ex_kojo_num_local = 0;
const ex_talent_names = [];

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
 * ex_talentname_init：初始化非存档的 EX 素质名表。
 * @returns {boolean} 本次是否执行了初始化
 */
function ex_talentname_init() {
  if (
    String(ex_talent_names[0] ?? '').length > 1 ||
    String(ex_talent_names[1] ?? '').length > 1
  ) {
    return false;
  }
  Object.assign(ex_talent_names, {
    0: '灵魂错位',
    1: '近卫',
    2: '后代',
    3: '魔王替身',
    4: '狂王替身',
    101: '琼',
    102: '普林希斯',
    103: '嘉德',
    104: '菲娅',
    200: '魔王',
    223: '丽塔',
    777: '卡拉',
    801: '无双',
    901: '一人军团',
    902: '魔女',
    903: '魔界公主',
    904: '天神',
  });
  return true;
}

/** @param {number} id EX 素质序号 */
function ex_talentname(id) {
  return ex_talent_names[id] ?? '';
}

// 8 个实现：函数体即全部内容（各 1-3 行 EX_TALENT 赋值，
// #11 已判定「数据不是代码」）。EX_TALENT 序号语义 = ex_talentname_init 的名称表，注释逐个标注。
//
// ex_talent 表已随 #138 实现（yml/Ex_Talent.yml + _fixed.json 登记
// extendedCharaTables，存档角色扩展表，容量 1000 槽）：新档 resetData → fillData
// 建顶层桶，addCharacter 为每个角色建 data.ex_talent[cid]，下方写入真正生效
// （生效与未登记的反面均由 test/extalent-table.test.js 用引擎真方法断言）。
// 名称表不是静态数据；上方在新游戏与读档钩子运行时初始化。
chara_ex.register(0, (cid) => {
  // EX_TALENT:200 = 魔王
  era.set(`ex_talent:${cid}:200`, 1);
});
chara_ex.register(31, (cid) => {
  // EX_TALENT:101 = 琼
  era.set(`ex_talent:${cid}:101`, 1);
});
chara_ex.register(32, (cid) => {
  // EX_TALENT:102 = 普林希斯
  era.set(`ex_talent:${cid}:102`, 1);
});
chara_ex.register(33, (cid) => {
  // EX_TALENT:103 = 嘉德
  era.set(`ex_talent:${cid}:103`, 1);
});
chara_ex.register(34, (cid) => {
  // EX_TALENT:4 = 狂王替身、801 = 无双、
  // 901 = 一人军团
  era.set(`ex_talent:${cid}:4`, 1);
  era.set(`ex_talent:${cid}:801`, 1);
  era.set(`ex_talent:${cid}:901`, 1);
  // MARK:4 = 3（Chara34.yml 预设，非本注册回调的内容）：
  // 引擎只按 Mark.yml 名字表建槽，预设不会整份拷进角色——4 号无名条目被丢
  // （#118 定夺不扩名表：那会给所有角色预建该槽）。**每个加入点都要过
  // add_chara_ex**（#548 验收：研究所复活 `page-shop-labo.js` 的 resulection
  // 走的就是这条路），所以补偿写在这里，而不是某一个加入点（原先只在
  // enter-enemy 的 K_34 剧情里写，#548 返工）。
  // 反抗刻印履历 = 3 → 反抗刻印获取检查的三档（mark:4 <= 0/1/2）全关，
  // 她不会再获得反抗刻印（test/chara34-mark.test.js 锁行为）。
  // 跨域写走门面（domain-check 的裸写检查；mark 属 chara.system 域）
  chara(cid).system.反抗刻印履历 = 3;
});
chara_ex.register(35, (cid) => {
  // EX_TALENT:104 = 菲娅
  era.set(`ex_talent:${cid}:104`, 1);
});
chara_ex.register(223, (cid) => {
  // EX_TALENT:223 = 丽塔
  era.set(`ex_talent:${cid}:223`, 1);
});
chara_ex.register(777, (cid) => {
  // EX_TALENT:777 = 卡拉
  era.set(`ex_talent:${cid}:777`, 1);
});

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
  ex_talentname_init,
  ex_talentname,
};
