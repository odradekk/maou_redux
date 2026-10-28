/**
 * @file 调教回合里「一个指令回合一整段」的执行（#214 从 train-loop 抽出，
 * #853 独立成模块）。
 *
 * 正常输入路径与指令序列执行（com-register 的「调教菜单实行」）共用这一段：
 * NOWEX 清零 → 指令前的旗标清理 → 指令处理器 → 源与参数结算 → 引擎结算 →
 * EVENTCOMEND。它不读输入、不设 SELECTCOM（调用方先置）。
 *
 * 与 train-loop 分开是为了让调用方向成一条线：回合循环与指令菜单桥都要这一段，
 * 而指令菜单桥被指令菜单页引用——留在 train-loop 里会让
 * 「train-loop → page-usercom → com-register → train-loop」成环，环上的解构
 * 会静默拿到 undefined（#853 引入直接调用时暴露）。
 */

const era = require('#/era-electron');
const { emit } = require('#/system/event/registry');
const { COM_MISSING, com_family } = require('#/system/train/com-family');
const { handle_source_check } = require('#/system/train/source-check');
const { handle_com } = require('#/event/event-com');
const era_flag = require('#/era-utils/era-flag');
const { EVENT } = require('#/data/event-name-const');

/**
 * 全部入列角色的 NOWEX 清零（循环步骤 10）。
 * 枚举经引擎寻址的 'exkeys'（Exp 名字表的全部序号），NOWEX 与 EX 同构。
 */
function clear_nowex_all() {
  const ex_keys = era.get('exkeys') || [];
  for (const cid of era.getCharactersInTrain()) {
    for (const key of ex_keys) {
      era.set(`nowex:${cid}:${key}`, 0);
    }
  }
}

/**
 * 执行一个调教回合（循环步骤 10-13）：正常输入路径与指令序列执行共用。
 * **不含**输入检查与 SELECTCOM 设定（调用方先置 selectcom）。
 *
 * @param {number} result SELECTCOM（Train.csv 编号 L_I）
 * @returns {Promise<{missing: boolean, cancelled?: boolean, pending?: string}>}
 *   missing = 指令未实现（「重新要求输入」语义，调用方丢弃本回合；
 *   债务信号，族票实现齐后消失）；
 *   cancelled = 指令返回 0（回合取消：副作用保留但不结算，调用方回
 *   循环头重绘——与 missing 对调用方表现相同，但性质不同：cancelled 是游戏的
 *   正确行为，永远存在。两者必须分立：测试断言与问题归因都
 *   靠这个区分「我们还没做」与「游戏本来就取消了这一回合」）；
 *   pending = 链内暂存的转场目标（转场优先，调用方须立即上抛）
 */
async function execute_command_round(result) {
  // 10. 全角色 NOWEX 清零
  clear_nowex_all();
  // 11. 指令执行前的旗标清理（event/event-com.js，只有一个处理者：旧
  // EVENTCOM 的机能，直接调用）
  await handle_com();
  // 12. 对应指令处理器；未实现 → 重新要求输入（见 train-loop.js 文件头）；
  // 返回 0 → 回合取消（不结算、不进 EVENTCOMEND、PREVCOM 不推——文件头第
  // 12 步的取消语义，子菜单指令全出口返回 0）
  const com_result = await com_family.call(result, {
    whenMissing: COM_MISSING,
  });
  if (com_result === COM_MISSING) {
    return { missing: true };
  }
  if (com_result === 0) {
    return { missing: false, cancelled: true };
  }
  // 12.5 源 → 参数换算、绝顶、刻印、结算展示（system/train/source-check.js，
  // 指令处理器之后、结算之前；只有一个处理者，直接调用）
  await handle_source_check();
  // 13. PREVCOM = SELECTCOM（高级 COM 可能在本回合回填 SELECTCOM，不能
  // 误存调用前的 result）→ 结算 → EVENTCOMEND（取消回合已在 12 处返回，
  // 到不了这里）
  era_flag.prevcom = era_flag.selectcom;
  era.nextTurnInTrain();
  const comend_pending = await emit(EVENT.COMEND);
  if (comend_pending !== undefined) {
    return { missing: false, pending: comend_pending };
  }
  return { missing: false };
}

module.exports = { execute_command_round };
