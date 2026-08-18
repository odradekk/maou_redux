/**
 * @file 调教回合循环与调教域状态处理器（STATE.TRAIN / STATE.AFTERTRAIN，
 * issue #44——继事件链（#6）与分发族（#7）之后的第三套结构）。
 *
 * 源: 无单一对应源——Emuera 的 TRAIN 回合循环是**引擎内建行为**，不是 ERB
 *     代码（.factory/skills/emuera-basic-agent-guide/references/system-flow/
 *     system-flow.md「TRAIN 阶段」）；EraElectron 完全没有这个循环
 *     （beginTrain/endTrain 只管建表与结算 gotjewel，dev-guides/09-static.md），
 *     循环由本模块手写。@EVENTTRAIN/@EVENTCOM/@EVENTCOMEND 的函数体在
 *     ere/event/ 下各自模块（事件链挂接），画面在 ere/page/ 下——本模块
 *     只承载「谁驱动、回调顺序、SELECTCOM 从哪来」。
 *
 * 回调顺序（与 Emuera 逐条对应，顺序错了不报错、只会静默改变游戏行为，
 * test/train-loop.test.js 钉死）：
 *
 *   BEGIN TRAIN 初始化（引擎行为镜像）
 *     1. ASSIPLAY:0 = 0 / PREVCOM:0 = -1 / NEXTCOM:0 = -1（flag 保留区槽位）
 *     2. era.beginTrain(全部已加入角色)：建调教域表、入列、tflag 清 0。
 *        【已知差异】Emuera 另将全部角色的 GOTJUEL/TEQUIP/EX/PALAM/SOURCE
 *        清零、STAIN 置初始值 0,0,2,1,8；ere 引擎在 beginTrain/
 *        addCharacterForTrain 里把 STAIN 一并清 0（app.asar 实证）——差异
 *        随 stain 首个消费者票（指令落地时）核对补偿。Emuera 的
 *        UP/DOWN/LOSEBASE/CUP/CDOWN 在 ere 侧由 delta/deltabase 表 +
 *        nextTurnInTrain 结算承载（dev-guides/15-ero.md 的设计）。
 *     3. @EVENTTRAIN 事件链（emit）
 *   回合循环（每回合）
 *     4. @SHOW_STATUS 事件链
 *     5. 遍历 @COM_ABLExx 列出可执行指令（com_able_family 探测，未定义即
 *        可执行——whenMissing: 1，_replace.csv 的「COM_ABLE初期値」默认值，
 *        本项目未改此键）。**指令按钮的渲染是欠账**（本票零指令，菜单只挂
 *        [999]，见 page/page-usercom.js 与 docs/stub-registry.md）
 *     6. @SHOW_USERCOM 事件链
 *     7. UP/DOWN/LOSEBASE/CUP/CDOWN 初始化——ere 等价物（delta/deltabase）
 *        已由上一回合末的 nextTurnInTrain 结算清零，此步无独立动作；首回
 *        合的表由 beginTrain 建为零
 *     8. 等待输入（era.input()）
 *     9. 输入检查：命中可执行指令 → SELECTCOM = 输入（flag 槽位）
 *    10. 全部角色 NOWEX 清零（exkeys 枚举，逐格置 0）
 *    11. @EVENTCOM 事件链
 *    12. 对应 @COMxx（com_family 分发）。未实现 → 引擎「重新要求输入」
 *        语义（同 @ABLUP 未定义，system-flow.md）：丢弃本次输入回循环头，
 *        不结算、不进 @EVENTCOMEND。EVENTCOM 先于该判定是本移植的解读
 *        （引擎未明文），#45 已核——CALLTRAIN 段（system-flow.md:100-105）
 *        证得 SOURCE_CHECK→EVENTCOMEND 是执行链尾，缺失路径无观察差异，
 *        维持本序（详见 issue #45 留言）
 *    12.5 @SOURCE_CHECK 事件链（引擎回调：@COMxx 之后、UPCHECK 之前；
 *        函数体在 event/source-check.js，#45——源→参数换算、绝顶、刻印、
 *        结算展示）
 *    13. 指令执行后：PREVCOM = SELECTCOM（引擎行为，「检查 SOURCE、UPCHECK
 *        等」的一环；原作在 @SOURCE_CHECK :545 自做，ere 侧统一由本循环承
 *        载）→ era.nextTurnInTrain()（UPCHECK 的 ere 等价：delta→
 *        palam、nowex→ex、deltabase→base 并清 source/delta/nowex；#45 起
 *        SOURCE_CHECK 对 palam/base 当场结算、delta/deltabase 清零，本步
 *        对已结算行为成为无操作——防双重累加的职责划分见 source-check.js
 *        文件头）→ @EVENTCOMEND 事件链
 *    14. 回到 4
 *   非指令输入（含 999）→ @USERCOM 事件链（999 = 调教结束 → BEGIN
 *   AFTERTRAIN，page/page-usercom.js）；链内 BEGIN 的暂存目标作为本状态
 *   处理器的返回值交给主循环
 *
 * STATE.AFTERTRAIN 处理器：@EVENTEND 事件链（函数体在 event/event-end.js，
 * 尾部 BEGIN TURNEND）→ era.endTrain()（gotjewel 结算进 jewel、删调教域表；
 * @JUEL_CHECK 存根化的现在结算为空转，#47 落地时须核对游戏侧结算与引擎侧
 * endTrain 的 gotjuel→juel 不发生双重累加）。
 */

const era = require('#/era-electron');
const { emit } = require('#/system/event/registry');
const { com_able_family, com_family } = require('#/system/train/com-family');
const era_flag = require('#/era-utils/era-flag');

// @COMxx 未实现时的缺失哨兵：dispatch 的 whenMissing 由调用点声明（#7），
// Symbol 保证不与真实指令实现的返回值混淆
const COM_MISSING = Symbol('COM_MISSING');

/**
 * 遍历 @COM_ABLExx 得出本回合可执行的指令编号（升序）。
 *
 * 判据 1:1：探测 COM_ABLE 族，返回 0 = 不可执行；空间内未实现 → 1
 * （COM_ABLE初期値默认值，可执行）。编号空间 = TrainCommand.yml 的 101 条。
 *
 * @returns {Promise<number[]>} 可执行指令的编号列表
 */
async function scan_usable_commands() {
  const usable = [];
  for (const id of com_able_family.declared) {
    const able = await com_able_family.call(id, { whenMissing: 1 });
    if (able !== 0) {
      usable.push(id);
    }
  }
  usable.sort((a, b) => a - b);
  return usable;
}

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
 * STATE.TRAIN 处理器：引擎初始化 → @EVENTTRAIN → 回合循环。
 * 以链内暂存的 BEGIN 目标（或上抛的 BeginSignal，如 @USERCOM 之外的直发）
 * 离开，正常情况下不返回到调用方以下——返回值即下一状态，交主循环。
 *
 * @returns {Promise<string>} 下一游戏状态（STATE 枚举取值）
 */
async function run_train() {
  // —— BEGIN TRAIN 初始化（引擎行为镜像，顺序见文件头）——
  era_flag.assiplay = 0; // ASSIPLAY:0 = 0
  era_flag.prevcom = -1; // PREVCOM:0 = -1
  era_flag.nextcom = -1; // NEXTCOM:0 = -1
  // 建表 + 全部已加入角色入列（Emuera 的调教数组隐式覆盖全角色，ere 须
  // 显式；不重复初始化已入列角色——引擎语义，多次 beginTrain 不重置）
  era.beginTrain(...era.getAddedCharacters());

  // 【已知差异的补偿，#45】Emuera 在 BEGIN TRAIN 时把 STAIN 置初始值
  // 0,0,2,1,8（system-flow.md 初始化 5），ere 引擎只清 0（app.asar 实证，
  // #44 遗留）。首个消费者是指令的污垢移动（com0 的 V/B 口），在此补齐：
  // 口/手 0、Ｐ 2、Ｖ 1、Ａ 8
  for (const cid of era.getCharactersInTrain()) {
    era.set(`stain:${cid}:2`, 2);
    era.set(`stain:${cid}:3`, 1);
    era.set(`stain:${cid}:4`, 8);
  }

  // @EVENTTRAIN 事件链（@EVENTTRAIN 函数体在 event/event-train.js）
  const init_pending = await emit('EVENTTRAIN');
  if (init_pending !== undefined) {
    return init_pending;
  }

  // —— 回合循环 ——
  for (;;) {
    // 4. @SHOW_STATUS（函数体在 page/page-train.js）
    const status_pending = await emit('SHOW_STATUS');
    if (status_pending !== undefined) {
      return status_pending;
    }

    // 5. 遍历 @COM_ABLExx：可执行指令表（喂输入检查与 @SHOW_USERCOM 的
    // 指令按钮渲染——按钮随首条指令票 #45 挂载）
    const usable = await scan_usable_commands();

    // 6. @SHOW_USERCOM（函数体在 page/page-usercom.js，含 [999] 调教结束；
    // 可执行指令表透传给按钮渲染）
    const usercom_draw = await emit('SHOW_USERCOM', usable);
    if (usercom_draw !== undefined) {
      return usercom_draw;
    }

    // 7. UP/DOWN/LOSEBASE/CUP/CDOWN 初始化：ere 等价物已在上一回合末
    // nextTurnInTrain 结算清零（文件头第 7 步说明），无独立动作

    // 8. 等待输入
    const result = await era.input();

    if (usable.includes(result)) {
      // 9. 输入检查通过 → SELECTCOM = 输入
      era_flag.selectcom = result;
      // 10. 全角色 NOWEX 清零
      clear_nowex_all();
      // 11. @EVENTCOM（函数体在 event/event-com.js）
      const com_pending = await emit('EVENTCOM');
      if (com_pending !== undefined) {
        return com_pending;
      }
      // 12. 对应 @COMxx；未实现 → 重新要求输入（引擎语义，见文件头）
      const com_result = await com_family.call(result, {
        whenMissing: COM_MISSING,
      });
      if (com_result === COM_MISSING) {
        continue;
      }
      // 12.5 @SOURCE_CHECK（引擎回调：@COMxx 之后、UPCHECK 之前；函数体在
      // event/source-check.js，#45）。源 → delta/palam 的换算、绝顶、刻印、
      // 结算展示都在链上；未注册时静默通过（空链语义）
      const source_pending = await emit('SOURCE_CHECK');
      if (source_pending !== undefined) {
        return source_pending;
      }
      // 13. PREVCOM 更新（引擎行为）→ UPCHECK 等价结算 → @EVENTCOMEND
      era_flag.prevcom = result;
      era.nextTurnInTrain();
      const comend_pending = await emit('EVENTCOMEND');
      if (comend_pending !== undefined) {
        return comend_pending;
      }
      // 14. 回到 @SHOW_STATUS
      continue;
    }

    // 非指令输入 → @USERCOM（999 = 调教结束，函数体在 page/page-usercom.js）
    const usercom_pending = await emit('USERCOM', result);
    if (usercom_pending !== undefined) {
      return usercom_pending;
    }
    // @USERCOM 的 RETURN 0：引擎忽略返回值、重绘回合画面（回循环头）
  }
}

/**
 * STATE.AFTERTRAIN 处理器：@EVENTEND 事件链（尾部 BEGIN TURNEND，函数体在
 * event/event-end.js）→ era.endTrain()（gotjewel 结算 + 删调教域表）。
 *
 * endTrain 放在链后：@EVENTEND 体内的 @JUEL_CHECK 要读 palam/gotjuel，
 * 表先于结算删除会静默丢失（引擎三段寻址守卫：角色子表不在即丢弃）。
 *
 * @returns {Promise<string>} 下一游戏状态（@EVENTEND 链的 BEGIN 暂存目标）
 */
async function run_aftertrain() {
  const pending = await emit('EVENTEND');
  era.endTrain();
  return pending;
}

module.exports = { run_aftertrain, run_train, scan_usable_commands };
