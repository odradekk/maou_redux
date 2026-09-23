/**
 * @file 换号（issue #545，阶段 6 S4）：名册页 [1700] 的角色排序编号互换。
 *
 * 源: target/ERB/魔改新增/角色編號交換.ERB 全 1 函数——@換號（:1-127）。
 *
 * 调用方：ere/page/page-chara-info.js 的 CHARA_INFO 分发（result === 1700，
 * 调用点 `CALL 換號`）。
 *
 * == 换号在 ere 里换的是什么（#545 返工后的做法与依据）==
 *
 * 原作是「序号世界」：角色编号＝字符数组下标，显示、输入、排列都用同一个
 * COUNT（:21/:72 的 `{COUNT,3,RIGHT}`），换号靠引擎的 SWAPCHARA（:114）把
 * 两个下标的全部角色数据行互换、再手工把 SAVESTR 里的名字换回（:112-116），
 * 于是「人」带着数据落到另一个编号上。
 *
 * ere 是「角色 ID 世界」（issue #21）：角色 ID 就是身份——`NO:X` 一律写成
 * 角色 ID，kojo-k1-confident.js 的 `(no:assi || assi) === 17` 专属台词、
 * event-first.js 囚禁播报的 `callname:17:-1` 这类读点都直指某个人。因此
 * **不能**照搬 SWAPCHARA 的语义：把两个 ID 名下的数据对调＝把两个人的身份
 * 互换而 ID 留在原处，上面那些读点就会落到换过来的另一个人身上（返工前的
 * swap_chara_numbers 正是这个形态，#545 第 1 轮验收判定它「让角色身份和人
 * 分开」，随之删除）。现在的做法：
 *
 *   - 每个角色多一个**排序编号**（PORTCFLAG:角色:排序编号——移植自建的
 *     扩展表字段，ADR-0001；缺省 0＝未设，读取侧回落角色 ID，见
 *     ere/chara/chara-portcflag.js）。它只是排列键：
 *   - 名册「编号」视图与换号页的候选列表都按它升序排（page-chara-info.js
 *     的 number_view_order、本文件的 swap_candidates）；
 *   - 确认后只调 swap_sort_numbers(first, second)，落点对应 :112-116——
 *     交换两个角色的排序编号，**不搬任何角色数据、不改 ID**。
 *
 * 净效果：两名角色在名册里的先后对调，其余一切（名字、数值、素质、关系表、
 * ID 指向）都留在原处。原作的「编号」在 ere 里就是这个字段。
 *
 * **有意偏离：编号格显示的是角色 ID，不是排序编号。** 引擎按 showAcc 把按钮
 * 快捷键拼成 `[N] ` 前缀（AGENTS.md 硬约束，PR #30），而快捷键必须是角色 ID
 * ——输入分发与白名单都按 ID（名册页的角色行按钮同款）。若把排序编号画进
 * 编号格，屏幕上就会出现一个「敲进去/点下去指向另一个人」的数字，正是本轮
 * 返工要消除的身份错配。因此：看到的号＝敲的号＝角色 ID，排序编号只体现在
 * **行序**上。
 *
 * 其余移植说明（有意偏离，均注明依据）：
 *   - 序号世界的「位置窗口 + 行数不足补空行」（:12-15/:60-63）与「跳过魔王
 *     插入位」照 issue #21 通例改写为 ID 世界：候选＝已加入 ID（不含 0）过
 *     显示守卫后按排序编号切片（page-chara-info.js 四个列表同款）；下一页
 *     守卫 :45 用候选总数（原作按含魔王的 CHARANUM 计，ID 世界等价换成
 *     候选数）。空行补位（:14/:62 的 PRINTL）不镜像，但 `<=` 语义保留：
 *     候选数是每页行数整数倍时照样能进一页空尾页，与原作一致；
 *   - 角色行从「PRINTFORM 拼编号 + 手输编号」升级为真按钮（#530/#535 名册
 *     同款）：编号由引擎按 showAcc 拼 `[N] `，正文不写编号（:21/:72 的行体
 *     拆成「编号按钮格 + 姓名/职业/等级文本格」）。原作 INPUT 可手输任意
 *     1..CHARANUM 的编号（显示守卫不拦选择，标题的「侵攻与迎击中无法换号」
 *     只是提示文案），ere 的输入白名单只回传已打印按钮，守卫外的角色选不到
 *     ——与名册行按钮化同一形态的偏离；
 *   - 确认屏 ELSE（:125-126 → RETURN 0）在 ere 只打印 [4000]/[4001] 的
 *     白名单下不可达，不镜像（:125-127 的落点因此只覆盖 RETURN 0 那一笔）；
 *     函数唯一出口是 [1999]（:50-51 JUMP CHARA_INFO）；
 *   - CLEARLINE 局部重绘不镜像（page-chara-info.js 文件头同款先例）：
 *     每轮整屏重绘的 for(;;) 循环；
 *   - [SP] 标记的判定 @SP 定义在 img.ERB:249（S1 #542 判死范围内的纯判定
 *     函数，无法引用真身），此处按原定义就地内联：TALENT 165/167-171 或
 *     EX_TALENT 101-104/4。
 *   - **残留差异：换号只在本页与名册「编号」视图可见。** 名册的状态/所持金/
 *     借金三个视图各有自己的排序键，域外读点（调教目标、战斗、囚禁播报等）
 *     也一律按角色 ID 走——原作里 SWAPCHARA 改的是数组下标，这些地方会跟着
 *     变（并列项的先后也随下标顺序变）。要让换号波及那些地方，得把排序编号
 *     推到全库读点，那是另一张票的范围；本轮按验收要求只做名册的排列顺序。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const {
  sort_by_number,
  swap_sort_numbers,
} = require('#/chara/chara-portcflag');
const { get_job_name } = require('#/page/page-select-target');
const { chara } = require('#/facade/chara');
// :7 #DIM CONST NUM_PAGE = 25（换号页自己的分页宽度，与名册的 24 无关）
const NUM_PAGE = 25;

// :5 #DIM NO_PAGE = 0——无 DYNAMIC ⇒ 静态变量：RESTART 与函数退出都不重置
// （指南 user-defined-variables.md:67-69；:82 属 DYNAMIC 一节，不适用）。函数内的
// let 每次进入都回到 0，并不等价于原作，故提在模块级：翻页状态跨次进入沿用，
// 第 2 页退出后再进 [1700] 仍是第 2 页（test/page-chara-info.test.js 有用例钉住）。
let no_page = 0;

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
 * event-execution.js 的处刑候选守卫同源；状态一律走 invasion 域门面
 * （chara(cid).invasion.状态，与统一卖春积极性同款，别处裸读 CFLAG:1 的
 * 历史写法不在本票改动面内）。
 * @returns {number[]} 已加入角色 ID（不含魔王，:16-18 剔除）按排序编号升序
 */
function swap_candidates() {
  const ids = era.getAddedCharacters().filter((cid) => {
    if (cid === 0) return false; // :16-18 对象是魔王剃除
    const state = chara(cid).invasion.状态;
    return (
      (state === 0 || state === 7) &&
      (!(era.get(`ex_talent:${cid}:1`) || 0) ||
        ((era.get(`ex_talent:${cid}:2`) || 0) !== 0 &&
          (era_exflag.mod_switch_bits & 2) !== 0))
    );
  });
  // 排列键＝排序编号（换号页的列表也按它排，与名册「编号」视图同一把尺）
  return sort_by_number(ids);
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
 * @換號（:1-127）：两屏选择的换号流程。
 *
 * 第一屏选 CN:1（:8-51），第二屏选 CN:2（:57-105，同页码窗口、剃除 CN:1
 * 的行），确认屏 [4000] 是 / [4001] 否（:106-110）。[4000] 互换后 RESTART
 * （:120）＝回到函数头重画第一屏；NO_PAGE 是**静态变量**（:5 无 DYNAMIC），
 * 页码既不随 RESTART 归零、也跨次进入沿用——实现里 no_page 提在模块级，
 * RESTART 对应「不回退页码的 continue」；[4001] 回第一屏（:121-122；其后两
 * 行 CN 复位是 GOTO 跳过的死代码）。两屏共用同一页码变量（:12/:60 同一
 * NO_PAGE，内层翻页 :88-99 也改它）。
 * @returns {Promise<void>} 唯一出口 [1999]（:50-51 JUMP CHARA_INFO）
 */
async function chara_number_swap() {
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
      // :112-116 原作是「SWAPCHARA 搬数据 + 手工把 SAVESTR 换回」；ere 侧
      // 只交换排序编号（不搬数据、不改 ID，见文件头）
      swap_sort_numbers(first, second);
      await era.printAndWait('已完成互换'); // :117
      era_flag.target = -1; // :118
      era_flag.assi = -1; // :119
      continue; // :120 RESTART（页码是静态变量，不归零）
    }
    // [4001] 回第一屏（:121-122；其后的 CN 复位是死代码）；ELSE → RETURN 0
    // （:125-127）在 ere 白名单下不可达，不镜像（文件头）
  }
}

module.exports = { chara_number_swap };
