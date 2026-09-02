/**
 * @file 战果口上的分发层（issue #179，阶段 3 H10）：奖赏口上与惩罚口上。
 *
 * 源: target/ERB/EVENT/EVENT_K.ERB  @GOHOUBI_AFTER_KOUJO（:468-476）、
 *     @OSIOKI_KOUJO（:486-494）
 *
 * 调用点：ere/dungeon/dungeon-after.js 的 @GOHOUBI / @OSIOKI（本票接线）。
 * 与 kojo-system.js（#46）同构：EVENT_K.ERB 的分发层在 ere 侧是两个
 * DispatchFamily（#7 决议），per-角色实现（@GOHOUBI_AFTER_KOUJO_K19 等，
 * ERB/口上/EVENT_K*.ERB）随各自的口上票 register——空间内缺失合法
 * （TRYCALL 落空语义，未移植的性格不发一言）。
 *
 * 编号空间与 KOJO_MESSAGE_COM 族一致（kojo-system.js 的依据在此不复述）：
 * 普通口上 0-39（性格素质 160-179 → LOCAL 100-119）、EX 口上 901-1600
 * （EX 半边未移植，LOCAL > 1000 守卫恒不达，1:1 保留）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - SWAP LOCAL:2, TARGET → 暂存/置/还原 era_flag.target（#5 决议第六条
 *     的等价改写：原作借 TARGET 向口上实现传角色，ere 侧 target 照置、
 *     cid 另以参数显式传入——口上实现两者都可用）；
 *   - **原作的 TFLAG:18 改经 choice 参数传递**（本票裁定，引擎实测依据）：
 *     TFLAG:18 是双语义槽——调教期是足コキ / SYSTEM_SOURCE 的指令 flag
 *     （桶由 beginTrain 建、写读合法），调教外是本链的奖惩选择序号。ere
 *     引擎的 tflag 桶 beginTrain 建 / endTrain 删（夹具 TRAIN_ONLY_TABLES
 *     同款镜像），EVENTTURNEND 里向 tflag 的 18 号槽写入会落兜底分支
 *     era.error「key error in getter/setter」且写入丢失（engine-bundle
 *     驱动 setVar 的两情形探针：桶未建 → era.error + 不落盘；桶预建 →
 *     正常落）。Emuera 侧调教期读不到奖惩残留靠「TRAIN 开始清零」，ere
 *     侧靠「endTrain 删表」，两者等价；被替换的只是 ere 引擎里本就不
 *     存在的「调教外写 tflag」通道。口上实现移植时读 choice 参数、不读
 *     tflag:18（stub-registry 该行的说明同步）；
 *   - 存在判定（SIF FLAG:LOCAL == 0 → RETURN 0）在原作就是注释状态
 *     （:471-472），不移植；GET_KOJO_NUM 的 EX 半边同 kojo-system 的
 *     待办说明。
 */

'use strict';

const era_flag = require('#/era-utils/era-flag');
const { get_kojo_num } = require('#/kojo/kojo-system');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');

// 声明的编号空间：分发守卫（:473/:491 的 LOCAL >= 100 && LOCAL < 140 ||
// LOCAL > 1000）能拼出的全部 GOHOUBI_AFTER_KOUJO_K{N} / OSIOKI_KOUJO_K{N}
// 名（kojo-system.js 的 DECLARED_KOJO_COM_IDS 同款）
const DECLARED_KOJO_IDS = [
  ...Array.from({ length: 40 }, (_, i) => i),
  ...Array.from({ length: 700 }, (_, i) => i + 901),
];

/** @GOHOUBI_AFTER_KOUJO_K{N} 族：奖赏口上（本票只建族，实现随口上票） */
const gohoubi_after_koujo_family = new DispatchFamily(
  'GOHOUBI_AFTER_KOUJO',
  DECLARED_KOJO_IDS,
);

/** @OSIOKI_KOUJO_K{N} 族：惩罚口上（同上） */
const osioski_koujo_family = new DispatchFamily(
  'OSIOKI_KOUJO',
  DECLARED_KOJO_IDS,
);

/** @GOHOUBI_REQUEST_KOUJO_K{N} 族：奖赏请求口上 */
const gohoubi_request_koujo_family = new DispatchFamily(
  'GOHOUBI_REQUEST_KOUJO',
  DECLARED_KOJO_IDS,
);
/**
 * @GOHOUBI_AFTER_KOUJO（EVENT_K.ERB:468-476）：奖赏结算后的口上入口。
 *
 * @param {number} cid 角色 ID（原作全局 A——@GOHOUBI 的结算对象）
 * @param {number} choice 奖赏选择序号（原作 TFLAG:18 的链内传递，文件头）
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function gohoubi_after_koujo(cid, choice) {
  const target_pool = era_flag.target; // SWAP LOCAL:2, TARGET
  era_flag.target = cid; // TARGET = A
  const local = get_kojo_num(cid); // GET_KOJO_NUM()（此刻 TARGET = A）
  // 存在判定被原作注释（:471-472），不判；キャラ別
  if ((local >= 100 && local < 140) || local > 1000) {
    await gohoubi_after_koujo_family.call(local - 100, {
      whenMissing: 0,
      args: [cid, choice],
    });
  }
  era_flag.target = target_pool; // SWAP 还原
  return 0;
}

/**
 * @OSIOKI_KOUJO（EVENT_K.ERB:486-494）：惩罚结算后的口上入口。
 *
 * @param {number} cid 角色 ID（原作全局 A——@OSIOKI 的结算对象）
 * @param {number} choice 处罚选择序号（原作 TFLAG:18 的链内传递，文件头）
 * @returns {Promise<number>} TRYCALL 落空时的 RESULT 0（调用方不读）
 */
async function osioski_koujo(cid, choice) {
  const target_pool = era_flag.target; // SWAP LOCAL:2, TARGET
  era_flag.target = cid; // TARGET = A
  const local = get_kojo_num(cid);
  if ((local >= 100 && local < 140) || local > 1000) {
    await osioski_koujo_family.call(local - 100, {
      whenMissing: 0,
      args: [cid, choice],
    });
  }
  era_flag.target = target_pool; // SWAP 还原
  return 0;
}

module.exports = {
  gohoubi_after_koujo,
  osioski_koujo,
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
};
