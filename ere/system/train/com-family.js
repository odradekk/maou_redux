/**
 * @file 调教指令的两个分发族：com_family（指令实现）与 com_able_family
 * （可执行性判定），issue #44；#213 扩成 121 段的分发空间。
 *
 * 可用性判定集中、指令实现分散（#11 查实：判定定义 120 个集中一处、
 * 指令实现散布在 112 个指令文件——其中一个文件内含 10 个，两者不同构），
 * 故 ere 侧分两个族共用同一编号空间，
 * 不设单一对应文件。
 *
 * == 两套编号空间（#213 定死，契约测试 test/com-dispatch.test.js 锁定） ==
 *
 *   - DECLARED_TRAIN_IDS（101，常量里可直选的指令号，升序）：玩家
 *     **可直选**的空间。指令菜单界面只遍历这个空间，指令按钮、COM_ABLE
 *     扫描、get_adv_com 的规则挂点都在这套空间里；L_IDX 紧凑序号也由它
 *     推出（com-index.js）。
 *   - DECLARED_COM_IDS（121 = 101 ∪ 高级 COM 20 个）：COM / COM_ABLE /
 *     TRAIN_MESSAGE_A/B 分发族的声明空间。高级 COM（67/69/70/84/111/
 *     120/121/123-134/208）不可直选，只能由 get_adv_com 按前两回合序列
 *     升格跳转（按结果号直跳对应 COM）抵达——但它们可以成为 SELECTCOM、
 *     也要被 COM_ABLE 探测（升格规则里的 COM_ABLE120 探测等），所以分发
 *     空间必须含它们。
 *   - 两处既有出入（#213 结论，测试固定）：com67/com84 有实现但无对应
 *     可用性检查（8 号规则升格 84 时不探测可用性，「未定义即视为可执行」
 *     语义恰好覆盖）；86 的检查有定义但无指令实现——86（饮尿）不在指令
 *     常量里，菜单扫描永远到不了它，且其检查第 4 行就返回 0（后续判定全是
 *     死码）——死段不进空间，随族工单核销。
 *
 * 两个语义基准：
 *   - COM_ABLE 的「未定义即视为可执行」：可用性检查未定义时默认放行。
 *     缺失语义由调用点声明
 *     （#7 决议），本族的使用方 train-loop.js 以 whenMissing: 1 落实——
 *     回调顺序见 train-loop.js 文件头；
 *   - COM 的「未定义 → 重新要求输入」：指令未实现时的既定行为
 *     （与 show_ablup_select 的能力提升未定义时相同，system-flow.md），
 *     train-loop.js 以缺失哨兵落实。
 *
 * 编号一律以 #/data/train-command-const 的常量为准；早期运行日志录自更早
 * 构建，54/55/89 等编号与常量冲突，不得作依据（issue #9
 * 勘误二、#43 验收查实）。玩家看到并输入的是 L_IDX 紧凑序号（#211 实证），
 * 与指令号的映射见 com-index.js。
 */

const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const {
  ADVANCED_COM_IDS,
  TRAIN_COMMAND_IDS,
} = require('#/data/train-command-const');

// 声明的可直选空间：指令常量里可直选的全部编号（升序）。空间外注册会抛
// 错（拼写防护）；空间内未实现是合法缺失（TRYCALL 落空）。高级 COM 的
// 编号清单（不可直选的升格目标）同样来自指令常量。
const DECLARED_TRAIN_IDS = TRAIN_COMMAND_IDS;

// 声明的分发空间：可直选 101 ∪ 高级 20 = 121 段（全部 com 定义的全集）。
// SELECTCOM 经升格可取高级号，TRAIN_MESSAGE 的分支、COM 的实现、
// COM_ABLE 的探测都按这套空间分发。
const DECLARED_COM_IDS = [...DECLARED_TRAIN_IDS, ...ADVANCED_COM_IDS].sort(
  (a, b) => a - b,
);

/**
 * com 未实现时的缺失哨兵（共享 Symbol）：回合循环（train-loop.js 步骤
 * 12 的「重新要求输入」）与升格跳转（com-caress.js
 * 的 jump_advanced）都要以「同一个符号」识别缺失——族模块跳到未实现的
 * 高级 COM 时上抛本哨兵，由回合循环统一丢弃本回合（#219 起两处共用）。
 */
const COM_MISSING = Symbol('COM_MISSING');

/** com_family：指令实现族（每条指令的行为本体，随各自指令工单注册） */
const com_family = new DispatchFamily('COM', DECLARED_COM_IDS);

/**
 * equip_com_family：装备持续效果族（#223 J13 立）。消费点是 source-check 结算
 * 的装备 SIF 链（ere/system/train/source-check.js 按链序遍历），
 * 实现按族分散（11-19 在道具族、43-49 在 SM 族、53-59 在
 * 特殊族、89 在重度族、100/108 在触手族）——随各自指令族工单注册。
 *
 * EQUIP_COM_CHAIN 逐项对应 source-check.js 的装备 SIF 链：[TEQUIP 位,
 * EQUIP_COM 号]。两处须保持同一执行序（各号的写入都落在同一批 SOURCE/UP
 * 格上，顺序影响结果）。
 */
const EQUIP_COM_CHAIN = [
  [11, 11],
  [13, 13],
  [14, 14],
  [15, 15],
  [16, 16],
  [17, 17],
  [18, 18],
  [19, 19],
  [43, 43],
  [44, 44],
  [45, 45],
  [46, 46],
  [47, 47],
  [49, 49],
  [53, 53],
  [54, 54],
  [57, 57],
  [58, 58],
  [59, 59],
  [89, 89],
  [90, 100],
  [98, 108],
];

/** equip_com_family（声明空间 = 链上的 EQUIP_COM 号全集） */
const equip_com_family = new DispatchFamily(
  'EQUIP_COM',
  EQUIP_COM_CHAIN.map(([, com]) => com),
);
/** com_able_family：可执行性判定族（返回 0 = 不可执行；未定义 = 可执行） */
const com_able_family = new DispatchFamily('COM_ABLE', DECLARED_COM_IDS);

module.exports = {
  ADVANCED_COM_IDS,
  COM_MISSING,
  DECLARED_COM_IDS,
  DECLARED_TRAIN_IDS,
  EQUIP_COM_CHAIN,
  com_able_family,
  com_family,
  equip_com_family,
};
