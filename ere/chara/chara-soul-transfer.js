/**
 * @file 灵魂转移：把魔王的灵魂转移进出击中的角色体内，与之互换身份和部分
 * 能力；日程推进里的灵魂错位判定。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_FUNC2.ERB 全 6 函数——
 *     @TRANSFER_SOUL（:1-45）/@TRANSFERAPP（:47-99，@TRANSFER_SOUL 内部
 *     调用）/@BODYCHECK_MAOU（:102-138，@TRANSFER_SOUL 内部调用）/
 *     @PERSONALOCK（:140-287，@TRANSFERAPP 内部调用）/@BODYLOCK（:289-435，
 *     **全库零调用者，不实现**——见下）/@SOUL_DISLOCATION（:438-452）。
 *
 * 调用方：キャラ関数/CHARA_INFO ver1.0.1.ERB:1039 的 CASE 17（本域
 * page-chara-info.js）；EVENT/EVENT_NEXTDAY.ERB:50 每角色每日调用
 * @SOUL_DISLOCATION（ere/event/event-nextday.js，本票接真身、原存根撤下）。
 *
 * BODYLOCK 判定不实现（#14 登记）：全库唯一提及它的地方是自身文件内一行
 * 被注释掉的 `;CALL BODYLOCK, ARG`（TRANSFER_SOUL 内，紧邻真正生效的
 * `CALL PERSONALOCK, ARG`），本体还内含两处 `FOR TC, 326, 1` /
 * `FOR TC, 340, 3`（起始值大于结束值，Emuera FOR 循环零次迭代）与残余的
 * `;-----` 注释块自相矛盾的范围注释——原作本身就是一段废弃的历史遗留代码。
 *
 * SWAPCHARA 说明（有意偏离，理由如下）：Emuera 的 `SWAPCHARA A, B` 是引擎
 * 内建命令，交换两个角色的全部数据；`ere/` 没有通用的"角色全部变量"枚举
 * API（不像引擎能反射出全部已注册表），因此 swap_chara() 只交换本项目
 * 目前实际使用的角色数值表（cflag/talent/ex_talent/base/maxbase/abl/exp/
 * mark/stain/tequip/source/palam/juel/gotjuel，含 VariableSize.csv 的声明
 * 上限）与两个字符串表（cstr/tstr）。不覆盖 portcflag/c_relation/
 * c_relation_sub——后两者是按 [角色][角色] 二维矩阵寻址的关系表，交换语义
 * 需要同时改写矩阵里所有指向这两个角色的行，不是按 cid 整表互换；当前唯一
 * 调用点（CASE 17，人间界单人转移）不依赖这三张表，真正需要时再补。
 *
 * 二次互换会互相抵消（原作行为，非移植缺陷，1:1 保留）：TRANSFER_SOUL 先
 * `SWAPCHARA MASTER, ARG` 整表互换 cflag/talent/base/maxbase/abl/ex_talent 等，
 * 随后 CALL TRANSFERAPP 又对同一批字段（CFLAG:9/11-14 等级攻防、婚姻用的
 * CFLAG:601/609、PERSONALOCK 覆盖的大段 TALENT/ABL 区间）逐个再 SWAP 一次——
 * 同一对字段被换了两次，净效果是**这些字段维持原值不变**，只有不在
 * swap_chara() 覆盖范围内的字段（呼び名 callname:-2、灵魂错位 debuff 的最终
 * 赋值）才是真正发生的净变化。「等级/攻防/婚姻状态随身体留下、只有呼び名与
 * 错位素质跟灵魂走」是否为原作本意无法考证，这里不做修正，只如实保留可观测
 * 效果（对照 target/ERB/魔改新增/角色編號交換.ERB:111-114 的 SAVESTR 显式
 * 重写手法可推断 SWAPCHARA 不覆盖 SAVESTR/NAME，本文件的 swap_chara() 范围
 * 表因此也不含 callname，与此互相印证）。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const {
  search_family,
  relation_swap_rebuild,
} = require('#/chara/chara-family');
const { char_size_generate } = require('#/chara/chara-body');
const { ex_talentname } = require('#/chara/chara-ex');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

// 呼び名（CALLNAME:x，callname:cid:-2）：确认对话仅这一处用它，其余
// 全用 NAME/SAVESTR（两者在本作里同一份存储，见 name_of）
function nickname_of(cid) {
  return era.get(`callname:${cid}:-2`) ?? '';
}

/** 数值型角色表：[表名, VariableSize.csv 声明的元素数]。ex_talent 无 CSV
 * 声明（本项目扩展表），取本库实测最大下标 901 的宽松上界。 */
const NUMERIC_CHARA_TABLES = [
  ['cflag', 1000],
  ['talent', 10000],
  ['ex_talent', 1000],
  ['base', 100],
  ['maxbase', 100],
  ['abl', 110],
  ['exp', 100],
  ['mark', 100],
  ['stain', 100],
  ['tequip', 100],
  ['source', 1000],
  ['palam', 100],
  ['juel', 200],
  ['gotjuel', 200],
];
const STRING_CHARA_TABLES = ['cstr', 'tstr'];

/** 交换单个下标；两侧皆未声明时跳过（不凭空造出键，#13 的静默写入陷阱）。 */
function swap_var(table, a, b, index, empty = 0) {
  const key_a =
    index === undefined ? `${table}:${a}` : `${table}:${a}:${index}`;
  const key_b =
    index === undefined ? `${table}:${b}` : `${table}:${b}:${index}`;
  const val_a = era.get(key_a);
  const val_b = era.get(key_b);
  if (val_a === undefined && val_b === undefined) return;
  era.set(key_a, val_b === undefined ? empty : val_b);
  era.set(key_b, val_a === undefined ? empty : val_a);
}

/**
 * SWAPCHARA A, B 的等价物（覆盖范围见文件头）。
 * @param {number} a 角色 ID
 * @param {number} b 角色 ID
 */
function swap_chara(a, b) {
  for (const [table, size] of NUMERIC_CHARA_TABLES) {
    for (let i = 0; i < size; i += 1) swap_var(table, a, b, i);
  }
  for (const table of STRING_CHARA_TABLES) {
    for (let i = 0; i < 100; i += 1) swap_var(table, a, b, i, '');
  }
}

/**
 * @PERSONALOCK（:140-287）：互换一大批个人特质与能力（跟随身份走的"人格"
 * 部分，与 swap_chara 覆盖的"身体"部分互补）。
 *
 * TALENT 区间（Emuera FOR 结束值不含本身）：见各行注释；50-58 跳过 55
 * （原作 SIF TC == 55 CONTINUE）。
 * @param {number} cid 角色 ID（原作 ARG）
 */
function personalock(cid) {
  const talent_ranges = [
    [10, 19],
    [20, 29],
    [30, 38],
    [60, 65],
    [69, 73],
    [79, 84],
    [87, 89],
    [91, 94],
    [131, 132],
    [136, 137],
    [140, 143],
    [150, 152],
    [155, 156],
    [160, 179],
    [200, 212],
    [221, 223],
    [240, 244],
    [250, 253],
    [281, 283],
    [291, 293],
    [470, 486],
  ];
  for (const [from, to] of talent_ranges) {
    for (let tc = from; tc < to; tc += 1) swap_var('talent', 0, cid, tc);
  }
  for (let tc = 50; tc < 58; tc += 1) {
    if (tc === 55) continue;
    swap_var('talent', 0, cid, tc);
  }
  for (const tc of [117, 118, 123, 127, 134, 182, 258]) {
    swap_var('talent', 0, cid, tc);
  }
  // 调合知识 55 / 癖 313 / 魔界知识 325 / 淫魔知识 327 / 魔虫知识 328
  // （yml/Talent.yml 名→id 查表；调合知识恰好落在 [50,58) 已随上面的循环
  // 一并交换，此处不重复）
  for (const tc of [313, 325, 327, 328]) {
    swap_var('talent', 0, cid, tc);
  }
  for (let tc = 101; tc < 201; tc += 1) swap_var('ex_talent', 0, cid, tc);
  for (let tc = 10; tc < 18; tc += 1) swap_var('abl', 0, cid, tc);
  for (let tc = 20; tc < 23; tc += 1) swap_var('abl', 0, cid, tc);
  for (let tc = 100; tc < 103; tc += 1) swap_var('abl', 0, cid, tc);
}

/**
 * @TRANSFERAPP（:47-99）：身份互换收尾——等级/攻防/体力气力/勇者履历/
 * 好感与调教次数/PERSONALOCK 大量特质/关系表重建/姓名。
 * @param {number} cid 角色 ID（原作 ARG）
 */
function transferapp(cid) {
  for (const idx of [9, 11, 12, 13, 14]) swap_var('cflag', 0, cid, idx);
  for (const idx of [0, 1]) swap_var('base', 0, cid, idx);
  for (const idx of [0, 1]) swap_var('maxbase', 0, cid, idx);
  for (const idx of [315, 316]) swap_var('talent', 0, cid, idx); // 成为勇者的经历
  for (const idx of [10, 2]) swap_var('cflag', 0, cid, idx); // 好感度/调教次数
  for (const idx of [85, 86, 76]) swap_var('talent', 0, cid, idx); // 爱慕/盲从/淫乱

  chara(0).invasion.状态 = 0;
  chara(cid).invasion.状态 = 0;

  // :82-87 姓名交换：原作对 NAME/CALLNAME/SAVESTR 各做一次 SWAP，随后又
  // 用（已互换的）CALLNAME 覆盖 SAVESTR。ere 侧 NAME/SAVESTR 共享同一份
  // 存储（callname:cid:-1，见 utils/callname-utils.js 文件头），若逐句
  // 照搬会把姓名换回原值——只落最终可观察效果：互换呼び名（:-2），
  // 再各自把显示名（:-1）改写成新的呼び名
  swap_var('callname', 0, cid, -2);
  era.set('callname:0:-1', era.get('callname:0:-2') ?? '');
  era.set(`callname:${cid}:-1`, era.get(`callname:${cid}:-2`) ?? '');

  relation_swap_rebuild(0, cid);
  personalock(cid);
}

/**
 * @BODYCHECK_MAOU（:102-138）：魔王身体数据缺省时的兜底生成（种族/肉体
 * 年龄、三围、外貌五官素质）。原作声明了 ARG 参数但函数体只读写
 * MASTER（恒为角色 0），本函数因此不取参数。
 */
function bodycheck_maou() {
  if (
    (era.get('cflag:0:452') || 0) === 0 &&
    (era.get('cflag:0:314') || 0) > 0
  ) {
    era.set('cflag:0:452', 666);
  }
  if (
    (era.get('cflag:0:452') || 0) === 0 &&
    (era.get('cflag:0:314') || 0) === 0
  ) {
    era.set('cflag:0:452', 21);
  }
  if ((era.get('cflag:0:451') || 0) === 0) {
    era.set('cflag:0:451', 21);
  }
  if (
    !(era.get('cflag:0:453') || 0) ||
    !(era.get('cflag:0:454') || 0) ||
    !(era.get('cflag:0:455') || 0) ||
    !(era.get('cflag:0:456') || 0) ||
    !(era.get('cflag:0:457') || 0)
  ) {
    const [, , height, weight, bust, waist, hip] = char_size_generate(0);
    era.set('cflag:0:453', height);
    era.set('cflag:0:454', weight);
    era.set('cflag:0:455', bust);
    era.set('cflag:0:456', waist);
    era.set('cflag:0:457', hip);
  }
  if (
    !(era.get('talent:0:300') || 0) ||
    !(era.get('talent:0:301') || 0) ||
    !(era.get('talent:0:302') || 0) ||
    !(era.get('talent:0:303') || 0) ||
    !(era.get('talent:0:304') || 0)
  ) {
    era.set('talent:0:300', 5);
    era.set('talent:0:301', 1);
    era.set('talent:0:302', 300);
    era.set('talent:0:303', 1);
    era.set('talent:0:304', 1);
  }
  if (
    !(era.get('talent:0:305') || 0) ||
    !(era.get('talent:0:306') || 0) ||
    !(era.get('talent:0:307') || 0)
  ) {
    era.set('talent:0:305', 3);
    era.set('talent:0:306', 3);
    era.set('talent:0:307', 4);
  }
  if (
    !(era.get('talent:0:308') || 0) ||
    !(era.get('talent:0:309') || 0) ||
    !(era.get('talent:0:310') || 0)
  ) {
    era.set('talent:0:308', 150);
    era.set('talent:0:309', 3);
    era.set('talent:0:310', 100);
  }
}

/**
 * @TRANSFER_SOUL（:1-45）：灵魂转移主流程。
 *
 * @param {number} cid 转移对象（原作 ARG）
 * @param {number} [mode=0] 0 = 先问一次确认，非 0 = 跳过确认直接执行
 *   （原作 `SIF MODE GOTO TSTAG`；全库唯一调用点固定传 0，此形参为完整
 *   1:1 移植保留）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 玩家拒绝时返回 cid（原作 `RETURN ARG`）；成功
 *   转移后原作没有显式 RETURN，但 CALL TRANSFERAPP, ARG 内部以
 *   `RETURN MASTER` 收尾（:99），之后 TRANSFER_SOUL 再未写 RESULT——RESULT
 *   就此停在 0 直到函数隐式结束，调用方（CASE 17）据此把画面焦点转回
 *   角色 0，这里直接返回 0 对应这个可观察效果
 */
async function transfer_soul(cid, mode = 0, rand = default_rand) {
  if (!mode) {
    era.print(`要将${nickname_of(0)}的灵魂转移到${name_of(cid)}上么？`);
    era.printButton('是', 0);
    era.printButton('否', 1);
    const result = await era.input();
    if (result !== 0) {
      return cid; // :10-11 SIF RESULT != 0 / RETURN ARG（拒绝）
    }
  }

  bodycheck_maou();

  const marriage = era.get(`cflag:${cid}:601`) || 0;
  if ((marriage >= 900 && marriage <= 902) || marriage === 0) {
    swap_var('cflag', 0, cid, 601);
    swap_var('cflag', 0, cid, 609);
  } else {
    era.set('cflag:0:621', marriage);
    const partner = search_family(cid, 'MARRIAGE');
    // :23-29 三分支 IF/ELSEIF/ELSE 前两支皆空，判据都以 RESULT<0 为条件之
    // 一（EX_TALENT:ARG:2 那一支的条件恒不会单独成立——它要求 RESULT<0 同时
    // 成立，与第二支重叠），实际效果等价于「partner<0 时跳过，否则执行」
    if (partner >= 0) {
      era.set(`cflag:${partner}:621`, era.get(`cflag:${partner}:601`) || 0);
      era.set(`cflag:${partner}:601`, 901);
      era.set(`cflag:${partner}:609`, era.get(`cflag:${partner}:6`) || 0);
    }
  }

  swap_chara(0, cid); // :33 SWAPCHARA MASTER, ARG
  transferapp(cid); // :34 CALL TRANSFERAPP, ARG（返回值 MASTER 未被读取）

  // :37-41 灵魂错位素质叠加（有 debuff）：本次转移让 ARG 背上 1-5 级，
  // 若魔王身上已带着旧的错位素质则继承并 +1 级、魔王自己清零
  let debuff = rand(5) + 1;
  if (era.get('ex_talent:0:0')) {
    debuff = (era.get('ex_talent:0:0') || 0) + 1;
  }
  era.set(`ex_talent:${cid}:0`, debuff);
  era.set('ex_talent:0:0', 0);
  era.print(`${name_of(cid)}陷入了【${ex_talentname(0)}】`);

  return 0;
}

/**
 * @SOUL_DISLOCATION（:438-452）：灵魂错位自然恢复判定（每角色每日调用）。
 *
 * EX_TALENT:0（灵魂错位等级，TRANSFER_SOUL 施加）每日有 1/(min(等级,3)+1)
 * 概率降 1 级，降到 0 时播报康复。原作寻址省略角色号（`EX_TALENT:0`），
 * 按 Emuera「既是角色变量又是数组变量」省略首参的约定省略的是 TARGET；
 * 调用方 EVENT_NEXTDAY.ERB:12 在 `FOR NEXTDAY_COUNT` 循环起手即
 * `TARGET = NEXTDAY_COUNT`，ere 侧一律显式传参，等价于该 TARGET。
 *
 * @param {number} cid 角色 ID（原作省略参数对应的 TARGET）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
function soul_dislocation(cid, rand = default_rand) {
  const level = era.get(`ex_talent:${cid}:0`) || 0;
  const cap = level > 3 ? 3 : level; // TEMP = MIN(EX_TALENT:0, 3)
  if (level && !rand(cap + 1)) {
    let next = level - 1;
    if (next < 0) next = 0;
    era.set(`ex_talent:${cid}:0`, next);
    if (next === 0) {
      era.print(`${name_of(cid)}从【${ex_talentname(0)}】中恢复了`);
    }
  }
}

module.exports = {
  swap_chara,
  personalock,
  transferapp,
  bodycheck_maou,
  transfer_soul,
  soul_dislocation,
};
