/**
 * @file 调教菜单（指令序列）：COMSEQ 的登记 / 显示 / 执行（issue #214）。
 *
 * 源: target/ERB/調教相關/COM_REGISTER.ERB
 *     @COMSEQ_REGISTER（:25-121）/@COMSEQ_SHOW（:126-155）/
 *     @COMSEQSUB_PRINT_COMLIST（:162-179）/@MULTI_COMABLE（:190-202）/
 *     @COMSEQ_TRAIN（:207-237）/@CALLTRAINEND（:243-245）
 *
 * 数据面（COM_REGISTER.ERB:5-9 的变量说明）：
 *   TFLAG:204  当前选择指令号的暂存（门面「当前选择的调教指令编号」）；
 *   TFLAG:224  索求口上抑制（调教菜单实行中 = 555，门面「索求口上抑制」）；
 *   FLAG:550   菜单长度（门面「指令菜单长度」）；
 *   FLAG:551～560 指令号保存槽——**无门面访问器**（facade-names 未列，
 *   并行期不扩共同面），经 era.set 直写（kojo-dungeon-ravish.js 的
 *   cflag:550 同款先例）：era.set('flag:551', 指令号)。
 *
 * == CALLTRAIN 的 ere 等价（:230 唯一调用点） ==
 *
 * `CALLTRAIN N`（带参形态）= 依次执行 SELECTCOM:1..N 序列、每回合走完整
 * 引擎回调链、调用方代码暂停到序列结束（system-flow.md「CALLTRAIN 自动
 * 执行」）。SELECTCOM:1..N 数组不落表（全库唯一写点就是本文件的预检查
 * 循环 :226，无引擎外读者；CALLTRAIN 是瞬时过程，无跨存档语义——记名
 * 差异，见 train-loop.js 文件头）。回合链复用 train-loop 的
 * execute_command_round（正常输入路径同一链；CALLTRAIN 循环**不含**
 * @SHOW_STATUS/@SHOW_USERCOM——那是玩家交互步骤）。
 *
 * 序列的预检查（:218-228）顺序敏感：探测第 k 条时 PREVCOM = 第 k-1 条
 * （第 k-1 轮末写入），第 1 条探测时 PREVCOM = 进函数时保存的原值——
 * COM_ABLE 的连续指令判定因此看到与真实执行一致的序列。预检查任何一条
 * 不可用即整体拒绝（:229-235），不执行任何回合。
 *
 * == 交互形态的记名差异（ere 引擎交互模型，PR #53 通则） ==
 *
 * 原作登记界面是 PRINTC 文本方格 + 自由数字输入；ere 引擎在画面有按钮时
 * 拒收非按钮输入（dev-guides/05-interaction.md:144），故指令列表与出口
 * 全部按钮化（printButton）。MULTI_COMABLE 拒绝的指令没有按钮——原作
 * 「输入 → 无效指令」的行内重试路径，ere 侧由引擎层拒收（#130 体系），
 * 「无效指令」提示行不可达，差异记名。原作 CLEARLINE 的原地重画由
 * ScreenBlock 承载（#73/#74 裁定，page-train.js 文件头先例）；REDRAW
 * 不镜像（无 ere 对应语义）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const game_train = require('#/facade/game-train');
const { ScreenBlock } = require('#/page/components/screen-block');
const {
  com_able_family,
  DECLARED_TRAIN_IDS,
} = require('#/system/train/com-family');
const { execute_command_round } = require('#/system/train/train-loop');

/** 菜单保存槽的 flag 区段（FLAG:551～560） */
const SLOT_BASE = 551;
/** 调教菜单实行中的 TFLAG:224 值（:196 与 :213） */
const COMSEQ_ACTIVE = 555;

/**
 * @MULTI_COMABLE（:190-202）：指令号能否登记进调教菜单。
 * TRAINNAME（CSV 静态名）为空 = 不在 Train.csv = 不可（高级 COM 不入菜单）；
 * 否则包着 TFLAG:224 调 @COM_ABLE<n>（实行中旗标让口上的「索求」分支
 * 静音，:196-200 的置位/复位对）。
 *
 * @param {number} id 指令号（L_I）
 * @returns {Promise<number>} 1 = 可登记，0 = 不可
 */
async function multi_comable(id) {
  if ((era.get(`traincommandname:${id}`) ?? '').length === 0) {
    return 0;
  }
  game_train.索求口上抑制 = COMSEQ_ACTIVE;
  const able = await com_able_family.call(id, { whenMissing: 1 });
  game_train.索求口上抑制 = 0;
  return able;
}

/**
 * @COMSEQ_SHOW（:126-155）：一行显示已登录的指令序列。
 * 名字读 TRAINNAME（CSV 静态名，:133——与 @SHOW_COMMENU 读 TRAIN_NAME
 * 不同表：登记面只收可直选指令，静态名恒非空）；不可用的条目显示
 * （不可用）；连续同指令折叠为 ×n（:138-151 的 COUNT 内联推进）；
 * 条目间以「 → 」分隔（:152-153）。
 *
 * 槽值的防护：原作 TRYCALLFORM COM_ABLE{号} 对不在声明空间的号落空静默
 * （RESULT 残留），ere 侧 DispatchFamily 对空间外抛错——槽里只可能存
 * MULTI_COMABLE 通过的号（登记面已挡），旧档脏值按「（不可用）」处理
 * 而非崩溃（#213「死段不进空间」的同款防护）。
 *
 * @returns {Promise<void>}
 */
async function comseq_show() {
  const length = game_train.指令菜单长度;
  era.print('已登录指令：');
  let count = 0;
  while (count < length) {
    const id = era.get(`flag:${SLOT_BASE + count}`) || 0;
    // :131-136 TRYCALLFORM COM_ABLE{FLAG:LOCAL}（未前置 RESULT=1：全库
    // 可直选指令的 COM_ABLE 均有定义，TRYCALL 落空路径实际不可达；
    // ere 侧 whenMissing:1 = 引擎「未定义即视为可执行」）
    const able =
      DECLARED_TRAIN_IDS.includes(id) &&
      (await com_able_family.call(id, { whenMissing: 1 })) !== 0;
    if (able) {
      era.print(era.get(`traincommandname:${id}`) ?? '');
    } else {
      era.print('（不可用）');
    }
    // :138-151 同指令连打的 ×n 折叠（连续段一并消费）
    let times = 1;
    while (count < length - 1) {
      const next_id = era.get(`flag:${SLOT_BASE + count + 1}`) || 0;
      if (next_id !== id) {
        break;
      }
      times += 1;
      count += 1;
    }
    if (times > 1) {
      era.print(`×${times}`);
    }
    if (count < length - 1) {
      era.print(' → ');
    }
    count += 1;
  }
  era.println(); // :155 PRINTL（行的收尾换行）
}

/**
 * @COMSEQSUB_PRINT_COMLIST（:162-179）：可登记指令的方格列表（登记面用）。
 * 遍历 0..999，MULTI_COMABLE 通过即一格。**编号是 L_I 本身**（:169 的
 * [{LOCAL,3}]——不是调教主画面方格的 L_IDX 位次：两个画面的输入空间
 * 不同，登记面手输/按钮直达 Train.csv 号）。原作 PRINTC 三列 → 按钮平铺
 * （PR #53 通则，记名差异）。
 */
async function print_comlist() {
  for (const id of DECLARED_TRAIN_IDS) {
    if ((await multi_comable(id)) === 1) {
      era.printButton(era.get(`traincommandname:${id}`) ?? '', id);
    }
  }
}

/**
 * @COMSEQ_REGISTER（:25-121）：调教菜单的登记循环。
 * 每登记一条整屏重画（原作 CLEARLINE 回 LOCAL:99 锚点 → ere 侧 ScreenBlock
 * 重绘）；满 10 条 / 保存并返回 / 首步取消 三路出口。
 * @returns {Promise<0>}
 */
async function comseq_register() {
  let local0 = 0; // LOCAL:0 已登记条数（本次会话）
  const block = new ScreenBlock(async () => {
    era.drawLine(); // :35
    await comseq_show(); // :36
    era.drawLine(); // :37
    // :38 PRINTFORML（era 侧 print + println，era.println 不带参数）
    era.print(`选择第${local0 + 1}个指令:`);
    era.println();
    await print_comlist(); // :39
    era.println(); // :40
    // :41-51 出口按钮（守卫与文案逐字；按钮正文不带 [编号] 前缀）
    if (game_train.指令菜单长度 > 0) {
      era.printButton('重置菜单', 998); // :41-42
    }
    if (local0 > 0) {
      era.printButton('重复指令', 999); // :43-44
    }
    if (local0 === 0) {
      era.printButton('取消并返回', 1000); // :45-48 两分支文案相同
    } else {
      era.printButton('保存并返回', 1000); // :50
    }
    era.println(); // :52
    era.drawLine(); // :53
  });

  era.print('调教菜单登录'); // :26 PRINTL
  era.println();

  for (;;) {
    await block.redraw(); // :31-33 清锚点重画（REDRAW 0/1 不镜像）
    const result = await era.input(); // :57 INPUT

    // :58-62 出口：首步取消 → RETURN 0；越界（保存并返回 1000 等）→ 完成段
    if (result === 1000 && local0 === 0) {
      return 0;
    }
    if (result < 0 || result > 999) {
      break; // GOTO COMPLETE
    }

    // :65-74 重置菜单：TFLAG:204 清零、长度与 551-560 槽全清（550 亦清）
    if (result === 998 && game_train.指令菜单长度 > 0) {
      game_train.当前选择的调教指令编号 = 0;
      local0 = 0;
      for (let slot = 550; slot <= 560; slot += 1) {
        era.set(`flag:${slot}`, 0);
      }
      continue; // GOTO REDRAW_LOOP
    }

    // :76-89 重复指令：把已登记的 period 条循环复制至满 10 条后直入完成段
    if (result === 999 && local0 > 0) {
      const period = local0; // LOCAL:1 已登记条数的快照
      while (local0 <= 9) {
        // LOCAL:3 = 551 + (LOCAL:0 % LOCAL:1)——以 period 为周期取模板槽
        const template = era.get(`flag:${SLOT_BASE + (local0 % period)}`) || 0;
        era.set(`flag:${SLOT_BASE + local0}`, template);
        game_train.指令菜单长度 += 1;
        local0 += 1;
      }
      break; // 填满（> 9）即 GOTO COMPLETE（:81-83）
    }

    // :93-101 登记检查（TFLAG:204 暂存选中号；MULTI_COMABLE 拒 → 原作
    // REUSELASTLINE「无效指令」重试，ere 侧引擎白名单已在输入层拦下——
    // 不可执行指令没有按钮，到不了这里；防御性 continue 对齐 GOTO）
    game_train.当前选择的调教指令编号 = result;
    if ((await multi_comable(result)) === 0) {
      continue; // GOTO INPUT_LOOP（ere 侧不可达路径，防御性保留）
    }

    // :104-108 登记：写入槽位；首条覆盖旧菜单（SIF LOCAL:0 == 0 → 550 = 0）
    era.set(`flag:${SLOT_BASE + local0}`, game_train.当前选择的调教指令编号);
    if (local0 === 0) {
      game_train.指令菜单长度 = 0;
    }
    game_train.指令菜单长度 += 1;

    // :111-113 第 10 条登记完（local0 递增后 > 9）不再重画，直入完成段
    local0 += 1;
    if (local0 <= 9) {
      continue; // GOTO REDRAW_LOOP
    }
    break; // COMPLETE
  }

  // $COMPLETE :115-121：终屏（无指令列表）+ 等键 + 清 TFLAG:204
  era.drawLine(); // :116
  await comseq_show(); // :117
  era.drawLine(); // :118
  era.print('调教菜单登录完毕'); // :119 PRINTW（print + 等键——夹具对等待
  await era.waitAnyKey(); // 的观测统一走 waitAnyKey，stub_line_wait 习语）
  game_train.当前选择的调教指令编号 = 0; // :120
  return 0;
}

/**
 * @CALLTRAINEND（:243-245）：CALLTRAIN 结束后的引擎回调（非事件函数）。
 * 调教菜单实行旗标复位。由 run_calltrain 的序列尾部调用（引擎同位）。
 */
function calltrainend() {
  game_train.索求口上抑制 = 0;
}

/**
 * CALLTRAIN N 的 ere 等价（:230 的唯一调用点）：依次执行指令序列。
 * TFLAG:224 由调用方 @COMSEQ_TRAIN 先置位（:213），序列结束由本函数的
 * CALLTRAINEND 复位（引擎同位）。@COMxx 未移植（族票未落地）的条目跳过
 * 该回合（引擎「重新要求输入」在无输入的自动循环里无位可落，ere 侧取
 * 「跳过继续」——过渡态语义，族票落地后不可达）。
 *
 * @param {number[]} sequence 指令号序列（SELECTCOM:1..N）
 * @returns {Promise<string|undefined>} 链内 BEGIN 暂存目标（转场优先）
 */
async function run_calltrain(sequence) {
  for (const com of sequence) {
    era_flag.selectcom = com;
    const round = await execute_command_round(com);
    if (round.pending !== undefined) {
      return round.pending; // 转场信号中止自动执行
    }
  }
  calltrainend();
  return undefined;
}

/**
 * @COMSEQ_TRAIN（:207-237）：调教菜单实行。
 * 预检查（任一条不可用即整体拒绝）→ CALLTRAIN 序列执行 → PREVCOM 恢复。
 * @returns {Promise<string|undefined>} 链内 BEGIN 暂存目标（转场优先）
 */
async function comseq_train() {
  era.drawLine(); // :208
  await comseq_show(); // :209
  era.drawLine(); // :210
  era.print('开始自动执行调教指令'); // :211 PRINTFORMW（print + 等键）
  await era.waitAnyKey();
  game_train.索求口上抑制 = COMSEQ_ACTIVE; // :213
  const prevcom_saved = era_flag.prevcom; // :217 PREVCOM 待避（只存不改）
  const length = game_train.指令菜单长度;
  const sequence = [];
  let blocked = false;
  for (let count = 0; count < length; count += 1) {
    const id = era.get(`flag:${SLOT_BASE + count}`) || 0;
    // :220-224 预检查（探测在前 :220、PREVCOM 推进在后 :227——探测第 k 条
    // 时 PREVCOM = 第 k-1 条，首轮 = 进函数时的原值，COM_ABLE 的连续指令
    // 判定因此看到与真实执行一致的序列）
    const able =
      DECLARED_TRAIN_IDS.includes(id) &&
      (await com_able_family.call(id, { whenMissing: 1 })) !== 0;
    if (!able) {
      blocked = true; // LOCAL:1 = 1
      break;
    }
    sequence.push(id);
    era_flag.prevcom = id; // :227
  }
  let pending;
  if (!blocked) {
    pending = await run_calltrain(sequence); // :230 CALLTRAIN FLAG:550
  } else {
    game_train.索求口上抑制 = 0; // :233 不可实行 → 旗标复位
    era.print('所登录的指令目前无法实行'); // :234 PRINTL
    era.println();
  }
  era_flag.prevcom = prevcom_saved; // :236 PREVCOM 恢复
  return pending;
}

module.exports = {
  calltrainend,
  comseq_register,
  comseq_show,
  comseq_train,
  multi_comable,
  print_comlist,
  run_calltrain,
};
