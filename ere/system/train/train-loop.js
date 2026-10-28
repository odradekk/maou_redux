/**
 * @file 调教回合循环（STATE.TRAIN 处理器，issue #44——继事件链（#6）与
 * 分发族（#7）之后的第三套结构）。
 *
 * 引擎只提供 beginTrain/endTrain（建调教域表与结算 gotjewel），不提供
 * 回合循环本身——循环由本模块手写。EVENTTRAIN/EVENTCOMEND 是多处理器的链
 * （挂接见 system/flow/startup.js），其余钩子只有一个处理者、由本模块直接
 * 调用（#853）：指令前清理、状态画面、指令菜单、输入分发、SOURCE_CHECK。
 * 一个回合的指令段在 system/train/command-round.js。本模块只承载「谁驱动、
 * 回调顺序、SELECTCOM 从哪来」。
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
 *     4. 状态画面（page-train.js 的 handle_show_status，直接调用）
 *     5. 探测可执行性检查族，列出可执行指令（com_able_family，未定义即
 *        可执行——whenMissing: 1），喂给 SHOW_USERCOM 的指令按钮渲染与
 *        输入检查（page/page-usercom.js）
 *     6. 指令菜单（page-usercom.js 的 handle_show_usercom，直接调用）
 *     7. UP/DOWN/LOSEBASE/CUP/CDOWN 初始化——对应表已在上一回合末的
 *        nextTurnInTrain 结算清零，此步无独立动作；首回合的表由
 *        beginTrain 建为零
 *     8. 等待输入（era.input()——玩家输入的是紧凑序号 L_IDX，先过
 *        com-index 映射层转回 Train.csv 编号 L_I，#211 实证/#213 实现）
 *     9. 输入检查：映射有效且命中可执行指令 → SELECTCOM = L_I（flag 槽位）；
 *        映射无效（999 出口、子菜单号、乱数）→ USERCOM 事件链
 *    10. 全部角色 NOWEX 清零（exkeys 枚举，逐格置 0）
 *    11. 指令执行前的旗标清理（event-com.js 的 handle_com，直接调用）
 *    12. 对应指令处理器（com_family 分发）。未实现 → 「重新要求输入」
 *        语义：丢弃本次输入回循环头，不结算、不进 EVENTCOMEND。旗标清理
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
 *    12.5 SOURCE_CHECK（指令处理器之后、结算之前；函数体在
 *        system/train/source-check.js，#45——源→参数换算、绝顶、刻印、结算展示）
 *    13. 指令执行后（仅返回非 0 的回合，见 12 的取消语义）：
 *        PREVCOM = SELECTCOM（引擎不自动推进 PREVCOM，由本循环赋值；高级
 *        COM 回填 SELECTCOM 后亦须保留该号——SOURCE_CHECK 跑了才推，取消
 *        回合不推）→ era.nextTurnInTrain()（结算：delta→palam、nowex→ex、
 *        deltabase→base 并清 source/delta/deltabase/nowex；SOURCE_CHECK 只写
 *        delta、DOWN 折算与 deltabase，palam 与 base 的加算、base 的钳制都归
 *        这一步，本步是唯一的结算点，见 source-check.js 文件头的职责划分）→
 *        EVENTCOMEND 事件链
 *    14. 回到 4
 *
 *    步骤 10-13 抽成 execute_command_round（#214，现住 system/train/command-round.js）：
 *    正常输入路径与指令
 *    序列执行走同一条链。自动连播（run_calltrain）**不含 SHOW_STATUS/
 *    SHOW_USERCOM**（那是玩家交互步骤），也不重判可执行性——序列由调用
 *    方预验证（每条探测时 PREVCOM = 前一条）。SELECTCOM 的序列数组不进
 *    表：全库唯一写点就是调用方自己，无引擎外读者，序列直接传参（值不
 *    进存档，run_calltrain 是瞬时同步过程，无跨存档语义）。
 *
 *   非指令输入（含 999）→ USERCOM 事件链（999 = 调教结束 → 转 AFTERTRAIN
 *   状态，page/page-usercom.js）；链内转场的暂存目标作为本状态处理器的
 *   返回值交给主循环。AFTERTRAIN 的收尾协议在 train-end.js。
 */

const era = require('#/era-electron');
const { emit } = require('#/system/event/registry');
const {
  com_able_family,
  DECLARED_TRAIN_IDS,
} = require('#/system/train/com-family');
const { com_id } = require('#/system/train/com-index');
const { execute_command_round } = require('#/system/train/command-round');
const { is_state } = require('#/system/flow/game-state');
const { handle_show_status } = require('#/page/page-train');
const { handle_show_usercom, handle_usercom } = require('#/page/page-usercom');
const era_flag = require('#/era-utils/era-flag');
const { EVENT } = require('#/data/event-name-const');

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
 * STATE.TRAIN 处理器：初始化 → EVENTTRAIN → 回合循环。
 * 以链内暂存的转场目标（或 USERCOM 处理器直接返回的目标）离开——
 * 返回值即下一状态，交主循环。
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
  const init_pending = await emit(EVENT.TRAIN);
  if (init_pending !== undefined) {
    return init_pending;
  }

  // —— 回合循环 ——
  for (;;) {
    // 4. 状态画面（page/page-train.js，每个回合换屏后绘制）
    await handle_show_status();

    // 5. 探测可执行性：可执行指令表（喂输入检查与指令菜单的按钮渲染
    // ——按钮随首条指令票 #45 挂载）
    const usable = await scan_usable_commands();

    // 6. 指令菜单（page/page-usercom.js，含 [999] 调教结束；可执行指令表
    // 透传给按钮渲染）
    await handle_show_usercom(usable);

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

    // 非指令输入（映射得 undefined）→ 输入分发（999 = 调教结束，函数体在
    // page/page-usercom.js；收到的是玩家的原始输入）。只有一个处理者，
    // 直接调用；它返回 STATE 取值时（999 的 AFTERTRAIN）立即上抛
    const usercom_next = await handle_usercom(idx);
    if (is_state(usercom_next)) {
      return usercom_next;
    }
    // 返回其它值（含 undefined）：忽略、重绘回合画面（回循环头）
  }
}

module.exports = {
  run_train,
  scan_usable_commands,
};
