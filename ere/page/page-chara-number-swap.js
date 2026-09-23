/**
 * @file 换号（issue #545，阶段 6 S4）：名册页 [1700] 的角色排序编号互换。
 *
 * 源: target/ERB/魔改新增/角色編號交換.ERB 全 1 函数——@換號（:1-127）。
 *
 * 调用方：ere/page/page-chara-info.js 的 CHARA_INFO 分发（result === 1700，
 * 调用点 `CALL 換號`）。
 *
 * == 换号在 ere 的角色存储里怎么落（#545 工单要求先核对，结论摘要）==
 *
 * 原作是「序号世界」：角色编号＝字符数组下标，SWAPCHARA（引擎命令）把两个
 * 下标的全部角色变量行互换；名字存 SAVESTR:编号（普通字符串数组，SWAPCHARA
 * 不动它），所以 :112-116 先暂存两个名字、换完行再手工换回——净效果是
 * 「数据与名字作为整体互换编号」。ere 是「角色 ID 世界」（issue #21）：
 * CHARANUM＝era.getAddedCharacters().length；编号＝角色 ID 本身；SAVESTR/
 * NAME 的等价存储＝callname:cid:-1、CALLNAME＝callname:cid:-2（utils/
 * callname-utils.js 文件头）。因此「互换编号」＝把两个 ID 名下的数据互换：
 *
 *   - cflag/talent/ex_talent/base/maxbase/abl/exp/mark/stain/tequip/source/
 *     palam/juel/gotjuel/cstr/tstr —— 复用 chara-soul-transfer.js 的
 *     swap_chara()（该表及范围表见其文件头）；
 *   - callname:cid:-1/-2 —— swap_chara 有意不含 callname（同文件文件头），
 *     本文件显式换回，对应原作「SWAPCHARA 换 NAME/CALLNAME + SAVESTR 手工
 *     换回」的净效果；
 *   - c_relation/c_relation_sub 的**行**（横轴＝角色，RELATION.ERH 的
 *     #DIM SAVEDATA CHARADATA 声明，原作同样被 SWAPCHARA 换行）——swap_chara
 *     的已登记偏离不含这两张表，本文件按行补换（列不动：C_RELATION 的
 *     「他,编号」格原作也不改写，换号后指向的就是换过来的那个人，与原作
 *     可观察行为一致）；对角 NID 与原作一致交由 nid()/relation_
 *     needs_rebuild 的惰性修复（chara-family.js），不在此重建；
 *   - relation（内置相性表，EVENT_ADDICT 写 relation:cid:0 一类的原作
 *     RELATION:cid:0）——同为角色行变量，一并按行换；
 *   - portcflag 不换：移植版自建的扩展表（ADR-0001），原作没有对应物，
 *     SWAPCHARA 无从换起（数据版本标记目前只有写入点、无消费者）。
 *
 * CFLAG 里存角色编号/名字编号的位置（换号后语义不变的依据）：CFLAG:x:6
 * 名字编号（NID）、531-533 队伍成员/队长、601/605/610 家族婚姻压缩数据、
 * 604/608/609 对方名字编号——这些值在原作同样**不被 SWAPCHARA 改写**，换号
 * 后它们指向的编号换成了另一个人，两个世界可观察行为一致。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 序号世界的「位置窗口 + 行数不足补空行」（:12-15/:60-63）与「跳过魔王
 *     插入位」照 issue #21 通例改写为 ID 世界：候选＝已加入 ID（不含 0）过
 *     显示守卫后按 ID 升序切片（page-chara-info.js 四个列表同款）；下一页
 *     守卫 :45 用候选总数（原作按含魔王的 CHARANUM 计，ID 世界等价换成
 *     候选数，不再产生「整页空行」的尾巴页）；
 *   - 角色行从「PRINTFORM 拼编号 + 手输编号」升级为真按钮（#530/#535 名册
 *     同款）：编号由引擎按 showAcc 拼 `[N] `，正文不写编号。原作 INPUT 可
 *     手输任意 1..CHARANUM 的编号（显示守卫不拦选择，标题的「侵攻与迎击中
 *     无法换号」只是提示文案），ere 的输入白名单只回传已打印按钮，守卫外
 *     的角色选不到——与名册行按钮化同一形态的偏离；
 *   - 确认屏 ELSE（:125-126 → RETURN 0）在 ere 只打印 [4000]/[4001] 的
 *     白名单下不可达，不镜像；函数唯一出口是 [1999]（:50-51 JUMP
 *     CHARA_INFO，名册整屏重进由调用方复位实现）；
 *   - CLEARLINE 局部重绘不镜像（page-chara-info.js 文件头同款先例）：
 *     每轮整屏重绘的 for(;;) 循环；
 *   - [SP] 标记的判定 @SP 定义在 img.ERB:249（S1 #542 判死范围内的纯判定
 *     函数，无法引用真身），此处按原定义就地内联：TALENT 165/167-171 或
 *     EX_TALENT 101-104/4。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { swap_chara } = require('#/chara/chara-soul-transfer');
const { get_job_name } = require('#/page/page-select-target');
// :7 #DIM CONST NUM_PAGE = 25（换号页自己的分页宽度，与名册的 24 无关）
const NUM_PAGE = 25;

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * @SP（img.ERB:249，#FUNCTION）：特殊角色标记，行尾追加青色 [SP]（:22-27
 * SETCOLOR 0x00FFFF）。@SP 本体在 S1 #542 判死范围内的 img.ERB，无法引用
 * 真身，按原定义内联。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function is_sp(cid) {
  return (
    [165, 167, 168, 169, 170, 171].some((t) => era.get(`talent:${cid}:${t}`)) ||
    [101, 102, 103, 104, 4].some((t) => era.get(`ex_talent:${cid}:${t}`))
  );
}

/**
 * 可换号候选：显示守卫（:20/:71）＝状态 0/7（可调教/苗床），且非
 * EX_TALENT:1（近卫），或「后代（EX_TALENT:2）+ 铁石心肠（EX_FLAG:9000
 * 位 1，mod开关 ver1.0.11 的 [1] 开关）」同开。判据与
 * event-execution.js 的处刑候选守卫同源。
 * @returns {number[]} 已加入角色 ID（不含魔王，:16-18 剔除）升序
 */
function swap_candidates() {
  return era.getAddedCharacters().filter((cid) => {
    if (cid === 0) return false; // :16-18 对象是魔王剃除
    const state = era.get(`cflag:${cid}:1`) || 0;
    return (
      (state === 0 || state === 7) &&
      (!(era.get(`ex_talent:${cid}:1`) || 0) ||
        ((era.get(`ex_talent:${cid}:2`) || 0) !== 0 &&
          (era_exflag.mod_switch_bits & 2) !== 0))
    );
  });
}

// :21/:72 行体：编号按钮 + 姓名/职业/等级（职业取 @GET_JOB_NAME 的既有真身
// page-select-target.js，等级 CFLAG:x:9）
function print_swap_row(cid) {
  const fragments = [
    {
      content: ` ${name_of(cid)} ${get_job_name(cid)} LV${era.get(`cflag:${cid}:9`) || 0}`,
    },
  ];
  if (is_sp(cid)) fragments.push({ content: '[SP]', color: '#00ffff' });
  era.printMultiColumns([
    {
      type: 'button',
      accelerator: cid,
      content: '',
      config: { align: 'left', width: 3 },
    },
    {
      type: 'text',
      content: fragments,
      config: { align: 'left', width: 21 },
    },
  ]);
}

/**
 * 互换两个 ID 名下的全部角色数据（净效果＝原作 :112-116 的
 * SWAPCHARA + SAVESTR 换回，覆盖范围与依据见文件头「怎么落」段）。
 * @param {number} a 角色 ID（CN:1）
 * @param {number} b 角色 ID（CN:2）
 */
function swap_chara_numbers(a, b) {
  swap_chara(a, b);
  // 姓名（SAVESTR/NAME）与呼び名（CALLNAME）随数据走：swap_chara 不含
  // callname，显式换两槽即原作「引擎换 NAME/CALLNAME + 手工换回 SAVESTR」
  for (const slot of [-1, -2]) {
    const key_a = `callname:${a}:${slot}`;
    const key_b = `callname:${b}:${slot}`;
    const val_a = era.get(key_a);
    const val_b = era.get(key_b);
    era.set(key_a, val_b ?? '');
    era.set(key_b, val_a ?? '');
  }
  // c_relation/c_relation_sub 的行互换（列不动，见文件头）；relation（内置
  // 相性表）同为角色行变量一并按行换。列集合＝当前已加入 ID（含魔王 0）；
  // 空侧补 0 与 swap_var 同语义（chara-soul-transfer.js）
  const columns = era.getAddedCharacters();
  for (const table of ['c_relation', 'c_relation_sub', 'relation']) {
    for (const col of columns) {
      const key_a = `${table}:${a}:${col}`;
      const key_b = `${table}:${b}:${col}`;
      const val_a = era.get(key_a);
      const val_b = era.get(key_b);
      if (val_a === undefined && val_b === undefined) continue;
      era.set(key_a, val_b === undefined ? 0 : val_b);
      era.set(key_b, val_a === undefined ? 0 : val_a);
    }
  }
}

/**
 * @換號（:1-127）：两屏选择的换号流程。
 *
 * 第一屏选 CN:1（:8-51），第二屏选 CN:2（:57-105，同页码窗口、剃除 CN:1
 * 的行），确认屏 [4000] 是 / [4001] 否（:106-110）。[4000] 互换后 RESTART
 * （:120）＝回到函数头：页码复位（:5 的 #DIM NO_PAGE = 0 重执行）、CN 清零，
 * 重画第一屏；[4001] 回第一屏（:121-122；其后两行 CN 复位是 GOTO 跳过的
 * 死代码）。两屏共用同一页码变量（:12/:60 同一 NO_PAGE，内层翻页
 * :88-99 也改它）。
 * @returns {Promise<void>} 唯一出口 [1999]（:50-51 JUMP CHARA_INFO，
 *   名册整屏重进由调用方复位实现）
 */
async function chara_number_swap() {
  let no_page = 0; // :5（RESTART 后同值重起）
  for (;;) {
    const total = swap_candidates().length;

    // —— 第一屏（:8-36）——
    era.print('交换角色的排序编号(PS:侵攻与迎击中的角色无法换号)'); // :10
    era.print('请先选择要变换排序的角色'); // :11
    const window_ids = swap_candidates().slice(
      no_page * NUM_PAGE,
      (no_page + 1) * NUM_PAGE,
    );
    for (const cid of window_ids) print_swap_row(cid);
    era.println(); // :31
    era.println(); // :32
    era.printButton('上一页', 2000); // :33
    era.printButton('下一页', 2001); // :34
    era.printButton('结束换号', 1999); // :35（原文「結束换号」，#60 归一）
    const first = await era.input(); // :36

    if (first === 2000) {
      // :38-43 上一页（页首不动，仅重绘）
      if (no_page > 0) no_page -= 1;
      continue;
    }
    if (first === 2001) {
      // :44-49 下一页
      if ((no_page + 1) * NUM_PAGE <= total) no_page += 1;
      continue;
    }
    if (first === 1999) {
      return; // :50-51 JUMP CHARA_INFO
    }
    // :53-56 CASEELSE：CN:1 = RESULT（显示守卫外的编号在原作可手输，
    // ere 白名单下不可达，见文件头）

    // —— 第二屏（:57-105；同一页码窗口，剃除 CN:1 的行）——
    let second = 0; // CN:2
    for (;;) {
      era.print('要跟那个角色换号呢？'); // :59
      const second_ids = swap_candidates()
        .slice(no_page * NUM_PAGE, (no_page + 1) * NUM_PAGE)
        .filter((cid) => cid !== first); // :67-69 对象是角色1剃除
      for (const cid of second_ids) print_swap_row(cid);
      era.println(); // :82
      era.println(); // :83
      era.printButton('上一页', 3000); // :84
      era.printButton('下一页', 3001); // :85
      const picked = await era.input(); // :86

      if (picked === 3000) {
        // :88-93 上一页（与第一屏共用 NO_PAGE）
        if (no_page > 0) no_page -= 1;
        continue;
      }
      if (picked === 3001) {
        // :94-99 下一页
        if ((no_page + 1) * NUM_PAGE <= total) no_page += 1;
        continue;
      }
      second = picked; // :100-103 CN:2 = RESULT
      break;
    }

    // —— 确认屏（:106-110）——
    era.println(); // :106
    era.print(`${name_of(first)}将与${name_of(second)}交换排序编号，确定吗？`); // :107
    era.printButton('是', 4000); // :108
    era.printButton('否', 4001); // :109
    const confirm = await era.input(); // :110

    if (confirm === 4000) {
      swap_chara_numbers(first, second); // :111-116
      await era.printAndWait('已完成互换'); // :117
      era_flag.target = -1; // :118
      era_flag.assi = -1; // :119
      no_page = 0; // :120 RESTART：#DIM NO_PAGE = 0 重执行
      continue;
    }
    // [4001] 回第一屏（:121-122；其后的 CN 复位是死代码）；ELSE → RETURN 0
    // （:125-127）在 ere 白名单下不可达，不镜像（文件头）
  }
}

module.exports = { chara_number_swap, swap_chara_numbers, swap_candidates };
