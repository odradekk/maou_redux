/**
 * @file CHARA_EX 族：角色专属初始化的分发注册表与 8 个实现（issue #21）。
 *
 * 源: target/ERB/其他/EXCOM.ERB  @ADDCHARA_EX（分发点，:28-29 为活代码；
 *     其上 [SKIPSTART]/[SKIPEND] 括住的「口上添加」「特殊战斗素质添加」两段
 *     是被括掉的死代码，不移植）
 *     target/ERB/キャラ関数/CHARA<N>.ERB  @CHARA_EX_<N>（8 个实现）
 *     target/ERB/SYSTEM/TITLE ver1.0.8.ERB  :101-102（新游戏的调用点）
 *
 * 分发语义（EXCOM.ERB:28-29）：
 *     SIF NO:ARG >= 17 || NO:ARG == 0
 *     TRYCALLFORM CHARA_EX_{NO:ARG}
 * 守卫为真（编号 ≥17 或 =0）才分发——编号 1-16 的角色原作从不分发，是设计
 * 而非遗漏。45 个角色只有 8 个实现，其余走「空间内缺失」路径（合法缺失，
 * 返回本调用点的 whenMissing 0，不报错）。ere 以角色 ID（= 原作 NO）直接
 * 寻址，原作「注册序 CHARANUM-1 → NO:ARG」的换算（TITLE :102 的调用方式）
 * 不再需要。
 */

const era = require('#/era-electron');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');

// 声明的编号空间：target/CSV/Chara/ 的 45 个角色编号（0-24、31-35、100、
// 150、201-211、223、777），离线生成（#7 决议「索引全部离线生成」——运行时
// 不能扫描文件，dev-guides/18-tools.md）。由枚举目录得来；角色表进 yml/ 后
// 升级为 tools/ 校验脚本核对（数据管线票）。实现集 8 个：0、31-35、223、777。
const DECLARED_CHARA_IDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 31, 32, 33, 34, 35, 100, 150, 201, 202, 203, 204, 205, 206, 207,
  208, 209, 210, 211, 223, 777,
];

const chara_ex = new DispatchFamily('CHARA_EX', DECLARED_CHARA_IDS);

// 8 个实现，存根级 1:1：函数体即原作的全部内容（各 1-3 行 EX_TALENT 赋值，
// #11 已判定「数据不是代码」）。EX_TALENT 序号语义 = EXCOM.ERB
// @EX_TALENTNAME_INIT 的名称表，注释逐个标注。
//
// 已知缺口：ex_talent 表尚未随数据管线进 yml/（原作声明在 EXCOM.ERH:4
// `#DIM SAVEDATA CHARADATA EX_TALENT,1000`）。引擎变量层（app.asar）对三维
// 寻址 `ex_talent:角色:序号` 分两种情况：整表未声明 → `if(!this.data[a]||!
// this.data[a][c])return;` 静默忽略、不写不抛（当前状态，写入无害无效果，
// 表落地后同一写入自动生效）；表已声明而序号未声明 → 静默建出变量并进存档
// （#13 的实测，与前者不同）。测试经夹具 var_writes 断言写入意图。
chara_ex.register(0, (cid) => {
  // @CHARA_EX_0（CHARA0.ERB）：EX_TALENT:200 = 魔王
  era.set(`ex_talent:${cid}:200`, 1);
});
chara_ex.register(31, (cid) => {
  // @CHARA_EX_31（CHARA31.ERB）：EX_TALENT:101 = 琼
  era.set(`ex_talent:${cid}:101`, 1);
});
chara_ex.register(32, (cid) => {
  // @CHARA_EX_32（CHARA32.ERB）：EX_TALENT:102 = 普林希斯
  era.set(`ex_talent:${cid}:102`, 1);
});
chara_ex.register(33, (cid) => {
  // @CHARA_EX_33（CHARA33.ERB）：EX_TALENT:103 = 嘉德
  era.set(`ex_talent:${cid}:103`, 1);
});
chara_ex.register(34, (cid) => {
  // @CHARA_EX_34（CHARA34.ERB）：EX_TALENT:4 = 狂王替身、801 = 无双、
  // 901 = 一人军团
  era.set(`ex_talent:${cid}:4`, 1);
  era.set(`ex_talent:${cid}:801`, 1);
  era.set(`ex_talent:${cid}:901`, 1);
});
chara_ex.register(35, (cid) => {
  // @CHARA_EX_35（CHARA35.ERB）：EX_TALENT:104 = 菲娅
  era.set(`ex_talent:${cid}:104`, 1);
});
chara_ex.register(223, (cid) => {
  // @CHARA_EX_223（CHARA223.ERB，年度版新增）：EX_TALENT:223 = 丽塔
  era.set(`ex_talent:${cid}:223`, 1);
});
chara_ex.register(777, (cid) => {
  // @CHARA_EX_777（CHARA777.ERB，年度版新增）：EX_TALENT:777 = 卡拉
  era.set(`ex_talent:${cid}:777`, 1);
});

/**
 * 角色专属初始化的分发入口：@ADDCHARA_EX 活代码路径（EXCOM.ERB:28-29）的
 * 等价物。新游戏加入角色后逐个调用（原作在 TITLE :102 以
 * `CALL ADDCHARA_EX, CHARANUM-1` 调用，ere 侧直接传角色号）。
 *
 * @param {number} chara_id 角色 ID（= 原作 NO:ARG）
 * @returns {Promise<any>} 实现的返回值；守卫不分发或空间内缺失时返回 0
 *   （本调用点的缺失语义，对应 TRYCALLFORM 落空 RESULT = 0——由调用点
 *   声明，不归注册表管，#7）
 */
async function add_chara_ex(chara_id) {
  // 原作 :28 守卫：SIF 条件为真才执行 :29 的 TRYCALLFORM
  if (!(chara_id >= 17 || chara_id === 0)) {
    return 0;
  }
  // 原作 :29：TRYCALLFORM CHARA_EX_{NO:ARG}。原作实现经 TARGET 隐式拿到
  // 角色（ADDCHARA_EX 首行 TARGET = ARG），ere 由 args 显式传入
  return chara_ex.call(chara_id, { whenMissing: 0, args: [chara_id] });
}

module.exports = { add_chara_ex, chara_ex, DECLARED_CHARA_IDS };
