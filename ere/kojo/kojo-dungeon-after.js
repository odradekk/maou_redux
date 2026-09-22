/**
 * @file 战果口上的分发层（issue #179，阶段 3 H10）：奖赏口上与惩罚口上。
 *
 * 源: target/ERB/EVENT/EVENT_K.ERB  @GOHOUBI_AFTER_KOUJO（:468-476）、
 *     @GOHOUBI_REQUEST_KOUJO（:450-463，签名由 #397 定死、函数体由 #403 落）、
 *     @OSIOKI_KOUJO（:486-494）
 *
 * 调用点：ere/dungeon/dungeon-after.js 的 @GOHOUBI / @OSIOKI（本票接入）；
 * @GOHOUBI_REQUEST_KOUJO 的调用方是商店侧 ere/system/stronghold/
 * gohoubi-request.js（#397）。
 *
 * == GOHOUBI_REQUEST 族只此一个实例（#403 实测的缺陷与整改） ==
 *
 * 本族的同名族曾在 kojo-system.js 里有**第二份 `new DispatchFamily`
 * （同一族名两个实例）**：K1/K6/K12/K14/K19/K904 从 kojo-system 取族注册、
 * 而分发侧（本文件与商店路径）用的是本文件的实例，于是那六个性格的
 * @GOHOUBI_REQUEST_KOUJO 注册**永远不被分发到**（玩家侧表现为静默失声），
 * 而 DispatchFamily 的重复注册守卫只挡同一实例内的重号，跨实例看不见。
 * #403 把第二份删掉、六个模块改从本文件取族——族名的唯一性由
 * test/event-k-dispatch.test.js 的族名唯一锁守着（全库扫 `new DispatchFamily`）。
 *
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
 *     tflag:18（stub-registry 该行的说明同步）。**#508 补记**：本链的调用点
 *     （dungeon-after.js 的 @GOHOUBI / @OSIOKI）自 #508 起落在回合结算的
 *     调教窗口内——「EVENTTURNEND 里没有 tflag 桶」这一条现状不再成立，
 *     参数链仍保持（值同、读者同，见 dungeon-after.js 文件头的补记）；
 *     直读 tflag:18 的口上实现（K14/K19/K904）都在窗口外语境，语义不变；
 *   - 存在判定（SIF FLAG:LOCAL == 0 → RETURN 0）在原作就是注释状态
 *     （:471-472），不移植；GET_KOJO_NUM 的 EX 半边同 kojo-system 的
 *     待办说明。
 */

'use strict';

const era_flag = require('#/era-utils/era-flag');
const {
  get_kojo_num,
  in_kojo_window,
  try_kojo_or_stub,
} = require('#/kojo/kojo-system');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');

// 声明的编号空间：分发守卫（:473/:491 的 LOCAL >= 100 && LOCAL < 140 ||
// LOCAL > 1000；ere 侧 = in_kojo_window）能拼出的全部
// GOHOUBI_AFTER_KOUJO_K{N} / OSIOKI_KOUJO_K{N}
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
  if (in_kojo_window(local)) {
    await gohoubi_after_koujo_family.call(local - 100, {
      whenMissing: 0,
      args: [cid, choice],
    });
  }
  era_flag.target = target_pool; // SWAP 还原
  return 0;
}

/**
 * @GOHOUBI_REQUEST_KOUJO（EVENT_K.ERB:450-463）：商店奖赏请求口上的入口。
 *
 * **签名与参数形状由 #397（N13）定死，函数体随 #403（N19）落地**——#403 只
 * 换函数体，签名一字未动：
 *
 *   - 形参只有 `cid`（派遣对象，原作调用前的全局 A——@GOHOUBI_REQUEST
 *     在 :685 设 `A = SELECT`、:689 清回 0）。原作的定义是零参
 *     （`SWAP LOCAL:2, TARGET; TARGET = A`），ere 侧按 #5 决议的等价改写
 *     显式传参（本文件的 gohoubi_after_koujo/osioski_koujo 同款）；
 *   - 奖赏种类不入参：K 侧实现一律读 `CFLAG:cid:504`（0-9），调用方
 *     （ere/system/stronghold/gohoubi-request.js）写的就是它。
 *
 * #403 落的体：SWAP/TARGET = A → GET_KOJO_NUM → 分发守卫
 * → TRYCALLFORM GOHOUBI_REQUEST_KOUJO_K{LOCAL - 100}（:461）→ SWAP 还原。
 *
 * **族内实参 = `[cid]`**：K 侧签名逐条核过（#403）——K1/K5/K6/K7 的
 * handler 直接取用 cid（K7 的 `chara_callname(cid)` 与 `CFLAG:cid:504`
 * 没有回落），其余 `(rand)` 签名的实现一律 `void rand`、改读
 * `era_flag.target`（本入口已置好），所以 cid 恒作首参安全。
 *
 * 缺席语义 = 占位行：无性格编号（键 -1）或该性格未注册 handler 时打存根，
 * 与原分发层同款（存根可见，登记在 docs/stub-registry.md）——名册未全落地
 * 时的债务由占位行显形，不静默吞掉。
 *
 * @param {number} cid 派遣对象（原作全局 A）
 * @returns {Promise<number>} 0（调用方不读）
 */
async function gohoubi_request_koujo(cid) {
  const target_pool = era_flag.target; // SWAP LOCAL:2, TARGET
  era_flag.target = cid; // TARGET = A
  await try_kojo_or_stub(
    gohoubi_request_koujo_family,
    'GOHOUBI_REQUEST_KOUJO',
    '奖赏请求口上',
    '随口上票',
    cid,
    [cid],
  );
  era_flag.target = target_pool; // SWAP 还原（:450-463 段）
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
  if (in_kojo_window(local)) {
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
  gohoubi_request_koujo,
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
};
