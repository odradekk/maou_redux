/**
 * @file 调教指令的两个分发族：COM（@COMxx 指令实现）与 COM_ABLE
 * （@COM_ABLExx 可执行性判定），issue #44。
 *
 * 源: 无单一对应源——原作的 @COMxx 散布在 ERB/調教相關/COMF*.ERB（112 个
 *     指令文件，COMF100_触手召喚.ERB 内含 10 个），@COM_ABLExx 集中在
 *     COMABLE.ERB（120 个定义挤一个 4,773 行文件——#11 查实：可用性判定
 *     集中、指令实现分散，两者不同构，故 ere 侧分两个族共用同一编号空间）。
 *
 * 本票（#44）两个族都零实现：零指令空转。声明的编号空间即
 * yml/TrainCommand.yml 的 101 个 id（离线转写，运行时不能扫描文件——
 * #7 决议）。两个语义锚点：
 *   - COM_ABLE 的「未定义即视为可执行」：Emuera 的 _replace.csv
 *     「COM_ABLE初期値」默认 1（本项目未改此键）。缺失语义由调用点声明
 *     （#7 决议），本族的使用方 train-loop.js 以 whenMissing: 1 落实——
 *     回调顺序见 train-loop.js 文件头；
 *   - COM 的「未定义 → 重新要求输入」：引擎对 @COMxx 未定义时的行为
 *     （与 @SHOW_ABLUP_SELECT 中 @ABLUP 未定义时相同，system-flow.md），
 *     train-loop.js 以缺失哨兵落实。
 *
 * 编号一律以 target/CSV/Train.csv 为准（= TrainCommand.yml）；emuera.log
 * 录自更早构建，54/55/89 等编号与 Train.csv 冲突，不得作依据（issue #9
 * 勘误二、#43 验收查实）。
 */

const { DispatchFamily } = require('#/system/dispatch/dispatch-family');

// 声明的编号空间：yml/TrainCommand.yml 全部 101 个 id（升序离线转写）。
// 空间外注册会抛错（拼写防护）；空间内未实现是合法缺失（TRYCALL 落空）。
const DECLARED_COM_IDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 68, 71, 72, 73, 80, 81, 82, 83, 85, 87, 88, 89, 90,
  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 122, 135, 150, 200,
  201, 202, 203, 204, 205, 206, 207,
];

/** @COMxx：指令实现族（每条指令的行为本体，随各自指令票注册） */
const com_family = new DispatchFamily('COM', DECLARED_COM_IDS);

/** @COM_ABLExx：可执行性判定族（返回 0 = 不可执行；未定义 = 可执行） */
const com_able_family = new DispatchFamily('COM_ABLE', DECLARED_COM_IDS);

module.exports = { com_able_family, com_family, DECLARED_COM_IDS };
