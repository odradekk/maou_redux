/**
 * @file 调教回合循环与调教域状态处理器（STATE.TRAIN / STATE.AFTERTRAIN，
 * issue #44——继事件链（#6）与分发族（#7）之后的第三套结构）。
 *
 * 引擎只提供 beginTrain/endTrain（建调教域表与结算 gotjewel），不提供
 * 回合循环本身——循环由本模块手写。EVENTTRAIN/EVENTCOM/EVENTCOMEND 的
 * 函数体在 ere/event/ 下各自模块（事件链挂接），画面在 ere/page/ 下
 * ——本模块只承载「谁驱动、回调顺序、SELECTCOM 从哪来」。
 *
 * 回调顺序（顺序错了不报错、只会静默改变游戏行为，test/train-loop.test.js
 * 固定）：
 *
 *   调教开始初始化
 *     1. ASSIPLAY:0 = 0 / PREVCOM:0 = -1 / NEXTCOM:0 = -1（flag 保留区槽位）
 *     2. era.beginTrain(全部已加入角色)：建调教域表、入列、tflag 清 0。
 *        【已知差异】引擎在此只把 STAIN 一并清 0，不清全部角色的
 *        GOTJUEL/TEQUIP/EX/PALAM/SOURCE，也不置 STAIN 的初始值——STAIN
 *        初值（0,0,2,1,8）在 run_train 手动补齐，其余差异随各自首个消费
 *        者票（指令实现时）核对补偿。UP/DOWN/LOSEBASE/CUP/CDOWN 由
 *        delta/deltabase 表 + nextTurnInTrain 结算承载。
 *     3. EVENTTRAIN 事件链
 *   回合循环（每回合）
 *     4. SHOW_STATUS 事件链
 *     5. 探测可执行性检查族，列出可执行指令（com_able_family，未定义即
 *        可执行——whenMissing: 1）。**指令按钮的渲染是待办**（这张工单
 *        零指令，菜单只挂 [999]，见 page/page-usercom.js）
 *     6. SHOW_USERCOM 事件链
 *     7. UP/DOWN/LOSEBASE/CUP/CDOWN 初始化——对应表已在上一回合末的
 *        nextTurnInTrain 结算清零，此步无独立动作；首回合的表由
 *        beginTrain 建为零
 *     8. 等待输入（era.input()——玩家输入的是紧凑序号 L_IDX，先过
 *        com-index 映射层转回 Train.csv 编号 L_I，#211 实证/#213 实现）
 *     9. 输入检查：映射有效且命中可执行指令 → SELECTCOM = L_I（flag 槽位）；
 *        映射无效（999 出口、子菜单号、乱数）→ USERCOM 事件链
 *    10. 全部角色 NOWEX 清零（exkeys 枚举，逐格置 0）
 *    11. EVENTCOM 事件链
 *    12. 对应指令处理器（com_family 分发）。未实现 → 「重新要求输入」
 *        语义：丢弃本次输入回循环头，不结算、不进 EVENTCOMEND。EVENTCOM
 *        先于该判定是本模块的解读（引擎未明文），#45 已核——执行链尾是
 *        SOURCE_CHECK→EVENTCOMEND，缺失路径无观察差异，维持本序（详见
 *        issue #45 留言）。**指令处理器返回 0 → 回合取消**：SOURCE 不清零、
 *        PREVCOM 不推进，指令自身的副作用（着衣位等）保留——自带子菜单
 *        的指令（COM110/111 等）全部出口返回 0，正是不作为通常指令推进
 *        回合的写法。#44/#213 期已实现的指令（COM0 等）一律返回 1，取消
 *        路径无消费者；语义随 #228（J18·COM110）实现修正——实测输出里
 *        「上次的调教指令」在 COM110 执行前后同为接吻（PREVCOM 未推）。
 *        J20（#230）补全库首批真实取消路径：COM201-206 的「暂时放过」与
 *        子指令失败支（此前 0 与 missing 由同一字段 not_executed 承载，
 *        验收结论分立为 missing/cancelled——开发期要分得出「我们还没做」
 *        和「游戏本来就取消了这一回合」）。
 *    12.5 SOURCE_CHECK 事件链（指令处理器之后、结算之前；函数体在
 *        event/source-check.js，#45——源→参数换算、绝顶、刻印、结算展示）
 *    13. 指令执行后（仅返回非 0 的回合，见 12 的取消语义）：
 *        PREVCOM = SELECTCOM（引擎不自动推进 PREVCOM，由本循环赋值；高级
 *        COM 回填 SELECTCOM 后亦须保留该号——SOURCE_CHECK 跑了才推，取消
 *        回合不推）→ era.nextTurnInTrain()（结算：delta→palam、nowex→ex、
 *        deltabase→base 并清 source/delta/nowex；#45 起 SOURCE_CHECK 对
 *        palam/base 当场结算、delta/deltabase 清零，本步对已结算行为成为
 *        无操作——防双重累加的职责划分见 source-check.js 文件头）→
 *        EVENTCOMEND 事件链
 *    14. 回到 4
 *
 *    步骤 10-13 抽成 execute_command_round（#214）：正常输入路径与指令
 *    序列执行走同一条链。自动连播（run_calltrain）**不含 SHOW_STATUS/
 *    SHOW_USERCOM**（那是玩家交互步骤），也不重判可执行性——序列由调用
 *    方预验证（每条探测时 PREVCOM = 前一条）。SELECTCOM 的序列数组不进
 *    表：全库唯一写点就是调用方自己，无引擎外读者，序列直接传参（值不
 *    进存档，run_calltrain 是瞬时同步过程，无跨存档语义）。
 *
 *   非指令输入（含 999）→ USERCOM 事件链（999 = 调教结束 → 转 AFTERTRAIN
 *   状态，page/page-usercom.js）；链内转场的暂存目标作为本状态处理器的
 *   返回值交给主循环
 *
 * STATE.AFTERTRAIN 处理器：EVENTEND 事件链（函数体在 event/event-end.js，
 * 尾部转 TURNEND 状态）→ era.endTrain()（gotjewel 结算进 jewel、删调教域
 * 表；游戏侧 JUEL_CHECK 结算与引擎侧 endTrain 的 gotjuel→juel 不得双重
 * 累加——职责划分见 juel-check.js，#47 定案）。
 */

const era = require('#/era-electron');
const { emit } = require('#/system/event/registry');
const {
  COM_MISSING,
  com_able_family,
  com_family,
  DECLARED_TRAIN_IDS,
} = require('#/system/train/com-family');
const { com_id } = require('#/system/train/com-index');
const era_flag = require('#/era-utils/era-flag');

/**
 * 探测可执行性检查族，得出本回合可执行的指令编号（升序）。
 *
 * 条件：返回 0 = 不可执行；空间内未实现 → 1（可执行）。遍历域 =
 * **可直选空间**（Train.csv 的 101 个号，只走非空指令名）——分发空间
 * 的另外 20 个高级 COM 不可直选，不进扫描（#213）。
 *
 * @returns {Promise<number[]>} 可执行指令的编号列表（L_I 侧）
 */
async function scan_usable_commands() {
  const usable = [];
  for (const id of DECLARED_TRAIN_IDS) {
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
 * 执行一个调教回合（循环步骤 10-13，#214 抽出）：正常输入路径与指令
 * 序列执行共用。**不含**输入检查与 SELECTCOM 设定（调用方先置 selectcom）。
 *
 * @param {number} result SELECTCOM（Train.csv 编号 L_I）
 * @returns {Promise<{missing: boolean, cancelled?: boolean, pending?: string}>}
 *   missing = 指令未实现（「重新要求输入」语义，调用方丢弃本回合；
 *   债务信号，族票实现齐后消失）；
 *   cancelled = 指令返回 0（回合取消：副作用保留但不结算，调用方回
 *   循环头重绘——与 missing 对调用方表现相同，但性质不同：cancelled 是游戏的
 *   正确行为，永远存在。两者必须分立：存根登记、对拍归因、测试断言都
 *   靠这个区分「我们还没做」与「游戏本来就取消了这一回合」）；
 *   pending = 链内暂存的转场目标（转场优先，调用方须立即上抛）
 */
async function execute_command_round(result) {
  // 10. 全角色 NOWEX 清零
  clear_nowex_all();
  // 11. EVENTCOM 事件链（函数体在 event/event-com.js）
  const com_pending = await emit('EVENTCOM');
  if (com_pending !== undefined) {
    return { missing: false, pending: com_pending };
  }
  // 12. 对应指令处理器；未实现 → 重新要求输入（见文件头）；返回 0 →
  // 回合取消（不结算、不进 EVENTCOMEND、PREVCOM 不推——文件头第 12 步的
  // 取消语义，子菜单指令全出口返回 0）
  const com_result = await com_family.call(result, {
    whenMissing: COM_MISSING,
  });
  if (com_result === COM_MISSING) {
    return { missing: true };
  }
  if (com_result === 0) {
    return { missing: false, cancelled: true };
  }
  // 12.5 SOURCE_CHECK 事件链（指令处理器之后、结算之前；函数体在
  // event/source-check.js，#45）。源 → delta/palam 的换算、绝顶、刻印、
  // 结算展示都在链上；未注册时静默通过（空链语义）
  const source_pending = await emit('SOURCE_CHECK');
  if (source_pending !== undefined) {
    return { missing: false, pending: source_pending };
  }
  // 13. PREVCOM = SELECTCOM（高级 COM 可能在本回合回填 SELECTCOM，不能
  // 误存调用前的 result）→ 结算 → EVENTCOMEND（取消回合已在 12 处返回，
  // 到不了这里）
  era_flag.prevcom = era_flag.selectcom;
  era.nextTurnInTrain();
  const comend_pending = await emit('EVENTCOMEND');
  if (comend_pending !== undefined) {
    return { missing: false, pending: comend_pending };
  }
  return { missing: false };
}

/**
 * STATE.TRAIN 处理器：初始化 → EVENTTRAIN → 回合循环。
 * 以链内暂存的转场目标（或上抛的 BeginSignal，如 USERCOM 之外的直发）
 * 离开，正常情况下不返回到调用方以下——返回值即下一状态，交主循环。
 *
 * @returns {Promise<string>} 下一游戏状态（STATE 枚举取值）
 */
async function run_train() {
  // —— 调教开始初始化（顺序见文件头）——
  era_flag.assiplay = 0; // ASSIPLAY:0 = 0
  era_flag.prevcom = -1; // PREVCOM:0 = -1
  era_flag.nextcom = -1; // NEXTCOM:0 = -1
  // TSTR:90（前回指令名）清空：ere 的 tstr 是持久普通表（yml/TStr.yml，
  // #212 探针定论——beginTrain/endTrain 的调教期表清单里没有 tstr），
  // 引擎不替调用方清它，此处手动清
  era.set('tstr:90', '');
  // 建表 + 全部已加入角色入列（无隐式全角色入列，须显式展开；不重复
  // 初始化已入列角色——引擎语义，多次 beginTrain 不重置）
  era.beginTrain(...era.getAddedCharacters());

  // 【已知差异的补偿，#45】引擎在 beginTrain 只把 STAIN 清 0，不置初始值
  // （#44 遗留）。首个消费者是指令的污垢移动（com0 的 V/B 口），在此补齐：
  // 口/手 0、Ｐ 2、Ｖ 1、Ａ 8
  for (const cid of era.getCharactersInTrain()) {
    era.set(`stain:${cid}:2`, 2);
    era.set(`stain:${cid}:3`, 1);
    era.set(`stain:${cid}:4`, 8);
  }

  // EVENTTRAIN 事件链（函数体在 event/event-train.js）
  const init_pending = await emit('EVENTTRAIN');
  if (init_pending !== undefined) {
    return init_pending;
  }

  // —— 回合循环 ——
  for (;;) {
    // 4. SHOW_STATUS（函数体在 page/page-train.js）
    const status_pending = await emit('SHOW_STATUS');
    if (status_pending !== undefined) {
      return status_pending;
    }

    // 5. 探测可执行性：可执行指令表（喂输入检查与 SHOW_USERCOM 的指令
    // 按钮渲染——按钮随首条指令票 #45 挂载）
    const usable = await scan_usable_commands();

    // 6. SHOW_USERCOM（函数体在 page/page-usercom.js，含 [999] 调教结束；
    // 可执行指令表透传给按钮渲染）
    const usercom_draw = await emit('SHOW_USERCOM', usable);
    if (usercom_draw !== undefined) {
      return usercom_draw;
    }

    // 7. UP/DOWN/LOSEBASE/CUP/CDOWN 初始化：对应表已在上一回合末
    // nextTurnInTrain 结算清零（文件头第 7 步说明），无独立动作

    // 8. 等待输入。玩家输入的是**紧凑序号 L_IDX**（指令按钮上印的数，
    // #211 实证：按 89 跑出 COM110）——先过映射层转回 Train.csv 编号
    const idx = await era.input();
    const result = com_id(idx);

    if (result !== undefined && usable.includes(result)) {
      // 9. 输入检查通过 → SELECTCOM = L_I（紧凑序号经 com-index 映射；
      // 空间外编号（999 出口、子菜单号、乱数）在映射处得 undefined，
      // 转 USERCOM——「输入检查失败 → USERCOM」的对应语义）
      era_flag.selectcom = result;
      // 10-13. 共用回合段（run_calltrain 同链，#214）
      const round = await execute_command_round(result);
      if (round.missing || round.cancelled) {
        continue;
      }
      if (round.pending !== undefined) {
        return round.pending;
      }
      // 14. 回到 SHOW_STATUS
      continue;
    }

    // 非指令输入（映射得 undefined）→ USERCOM（999 = 调教结束，函数体在
    // page/page-usercom.js；USERCOM 收到的是玩家的原始输入）
    const usercom_pending = await emit('USERCOM', idx);
    if (usercom_pending !== undefined) {
      return usercom_pending;
    }
    // USERCOM 的返回 0：忽略返回值、重绘回合画面（回循环头）
  }
}

/**
 * STATE.AFTERTRAIN 处理器：EVENTEND 事件链（尾部转 TURNEND 状态，函数体
 * 在 event/event-end.js）→ era.endTrain()（gotjewel 结算 + 删调教域表）。
 *
 * endTrain 放在链后：EVENTEND 体内的 JUEL_CHECK 要读 palam/gotjuel，表先
 * 于结算删除会静默丢失（引擎三段寻址检查：角色子表不在即丢弃）。
 *
 * @returns {Promise<string>} 下一游戏状态（EVENTEND 链的暂存转场目标）
 */
async function run_aftertrain() {
  const pending = await emit('EVENTEND');
  era.endTrain();
  return pending;
}

module.exports = {
  execute_command_round,
  run_aftertrain,
  run_train,
  scan_usable_commands,
};
