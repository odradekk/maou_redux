/**
 * @file 换号（issue #545，阶段 6 S4）：名册页 [1700] 的角色排序编号互换。
 *
 * 调用方：ere/page/page-chara-info.js 的 chara_info 分发（result === 1700）。
 *
 * == 换号在 ere 里换的是什么（#545 返工后的做法与依据）==
 *
 * 序号世界的换号＝换数组下标：把两个下标的全部角色数据行互换，
 * 「人」带着数据落到另一个编号上。
 *
 * ere 是「角色 ID 世界」（issue #21）：角色 ID 就是身份——`NO:X` 一律写成
 * 角色 ID，kojo-k1-confident.js 的 `(no:assi || assi) === 17` 专属台词、
 * event-first.js 囚禁播报的 `callname:17:-1` 这类读点都直指某个人。因此
 * **不能**做「搬数据」式的互换：把两个 ID 名下的数据对调＝把两个人的身份
 * 互换而 ID 留在原处，上面那些读点就会落到换过来的另一个人身上（返工前的
 * swap_chara_numbers 正是这个做法，#545 第 1 轮验收判定它「让角色身份和人
 * 分开」，随之删除）。现在的做法：
 *
 *   - 每个角色多一个**排序编号**（PORTCFLAG:角色:排序编号——移植自建的
 *     扩展表字段，ADR-0001；缺省 0＝未设，读取侧回落角色 ID，见
 *     ere/chara/chara-portcflag.js）。它只是排列键：
 *   - 名册「编号」视图与换号页的候选列表都按它升序排（page-chara-info.js
 *     的 number_view_order、本文件的 swap_candidates）；
 *   - 确认后只调 swap_sort_numbers(first, second)——
 *     交换两个角色的排序编号，**不搬任何角色数据、不改 ID**。
 *
 * 净效果：两名角色在名册里的先后对调，其余一切（名字、数值、素质、关系表、
 * ID 指向）都留在原处。ere 的「编号」就是这个字段。
 *
 * **有意偏离：编号格显示的是角色 ID，不是排序编号。** 引擎按 showAcc 把按钮
 * 快捷键拼成 `[N] ` 前缀（AGENTS.md 硬约束，PR #30），而快捷键必须是角色 ID
 * ——输入分发与白名单都按 ID（名册页的角色行按钮同款）。若把排序编号画进
 * 编号格，屏幕上就会出现一个「敲进去/点下去指向另一个人」的数字，正是本轮
 * 返工要消除的身份错配。因此：看到的号＝敲的号＝角色 ID，排序编号只体现在
 * **行序**上。
 *
 * 其余移植说明（有意偏离，均注明依据）：
 *   - **编号按钮的快捷键 = 角色 ID**（见上节），与同屏的固定编号
 *     （[1999] 结束换号、[2000]/[2001] 翻页、[3000]-[3002]、[4000]/[4001]）
 *     共存——后代 ID 因此必须落在固定编号之上（chara-pregnancy.js 的
 *     FIRST_CHILD_ID = 100000，issue #560 的决定；静态检查见
 *     test/child-id-collision.test.js）；
 *   - **第二屏多一个 [3002] 取消出口**（#545 第 2 轮验收实测到卡死）。ere 的
 *     输入只回传本轮已打印的按钮，手输任意编号的路径不可达：只剩
 *     一名候选时（她被剔出第二屏，页上再没有别的行），屏上只有 [3000]/
 *     [3001]，而 [3001] 在候选不足一页时只会重绘同一屏——玩家出不去。这里
 *     补出一个始终可按的 [3002] 取消，净效果是回第一屏重选（ere 输入模型
 *     的差异——引擎只回传已打印按钮，有意补出的出口）；
 *   - 序号世界的「位置窗口 + 行数不足补空行」与「跳过魔王
 *     插入位」照 issue #21 通例改写为 ID 世界：候选＝已加入 ID（不含 0）过
 *     显示条件后按排序编号切片（page-chara-info.js 四个列表同款）；下一页
 *     条件用候选总数（不含魔王，等价于按含魔王的角色总数计）。
 *     空行补位不做，但 `<=` 语义保留：
 *     候选数是每页行数整数倍时照样能进一页空尾页；
 *   - 角色行从「拼编号文字 + 手输编号」升级为真按钮（#530/#535 名册
 *     同款）：编号由引擎按 showAcc 拼 `[N] `，正文不写编号（行体
 *     拆成「编号按钮格 + 姓名/职业/等级文本格」）。显示条件不拦选择、
 *     标题的「侵攻与迎击中无法换号」只是提示文案，ere 的输入白名单只回传
 *     已打印按钮，条件外的角色选不到
 *     ——与名册行按钮化同一写法的偏离；
 *   - 确认屏的「其它输入」分支在 ere 只打印 [4000]/[4001] 的
 *     白名单下不可达，不做；函数唯一出口是 [1999]（回到名册分发）；
 *   - 就地清行的局部重绘不做（page-chara-info.js 文件头同款先例）：
 *     每轮整屏重绘的 for(;;) 循环；
 *   - [SP] 标记的判定是纯判定函数（S1 #542 判死范围内，
 *     无法引用真身），此处就地内联：TALENT 165/167-171 或
 *     EX_TALENT 101-104/4。
 *   - **残留差异：换号只在本页与名册「编号」视图可见。** 名册的状态/所持金/
 *     借金三个视图各有自己的排序键，域外读点（调教目标、战斗、囚禁播报等）
 *     也一律按角色 ID 走——序号世界的换号改的是数组下标，那些地方会跟着
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
const { change_screen } = require('#/page/components/screen-change');
const { chara } = require('#/facade/chara');
const { pad_display } = require('#/utils/display-width');
// 换号页自己的分页宽度（与名册的 24 无关）
const NUM_PAGE = 25;

// no_page 提在模块级：换号流程的重画与函数退出都不重置页码，函数内的
// let 每次进入都回到 0，不等价。翻页状态跨次进入沿用，
// 第 2 页退出后再进 [1700] 仍是第 2 页（test/page-chara-info.test.js 有用例钉住）。
let no_page = 0;

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * 特殊角色标记，行尾追加青色 [SP]（rgb(0,255,255)）。
 * 判定本体在 S1 #542 判死范围内，无法引用真身，就地内联。
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
 * 可换号候选：显示条件＝状态 0/7（可调教/苗床），且非
 * EX_TALENT:1（近卫），或「后代（EX_TALENT:2）+ 铁石心肠（EX_FLAG:9000
 * 位 1，mod 开关的 [1] 开关）」同开。条件与
 * event-execution.js 的处刑候选条件同源；状态一律走 invasion 域门面
 * （chara(cid).invasion.状态，与统一卖春积极性同款，别处裸读 CFLAG:1 的
 * 历史写法不在本张工单改动面内）。
 * @returns {number[]} 已加入角色 ID（不含魔王）按排序编号升序
 */
function swap_candidates() {
  const ids = era.getAddedCharacters().filter((cid) => {
    if (cid === 0) return false; // 对象是魔王剃除
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

// 行体：编号按钮 + 姓名/职业/等级（职业取
// page-select-target.js 的 get_job_name，等级 CFLAG:x:9 是
// 冒号 + 值左对齐占 4 格——`pad_display` 就是 `%,N,LEFT%` 的等价写法）
function print_swap_row(cid) {
  const fragments = [
    {
      content: ` ${name_of(cid)} ${get_job_name(cid)} LV:${pad_display(
        String(era.get(`cflag:${cid}:9`) || 0),
        4,
      )}`,
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
 * chara_number_swap：两屏选择的换号流程。
 *
 * 第一屏选第一个角色，第二屏选第二个角色（同页码窗口、剃除已选
 * 的行），确认屏 [4000] 是 / [4001] 否。[4000] 互换后
 * 回到函数头重画第一屏；no_page 提在模块级，
 * 页码既不随重画归零、也跨次进入沿用——互换后的重画对应「不回退页码的
 * continue」；[4001] 回第一屏。两屏共用同一页码变量
 * （no_page，内层翻页也改它）。
 * @returns {Promise<void>} 唯一出口 [1999]（回到名册分发）
 */
async function chara_number_swap() {
  // 换号页标号：第二屏的 [3002] 取消要跳回外层循环头（第一屏），
  // 故外层循环带标号，跳法与 page-ability-up.js 的 restart/menu 同款
  swap_page: for (;;) {
    // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    await change_screen();
    const total = swap_candidates().length;

    // —— 第一屏 ——
    era.print('交换角色的排序编号(PS:侵攻与迎击中的角色无法换号)');
    era.print('请先选择要变换排序的角色');
    const window_ids = swap_candidates().slice(
      no_page * NUM_PAGE,
      (no_page + 1) * NUM_PAGE,
    );
    for (const cid of window_ids) print_swap_row(cid);
    era.println();
    era.println();
    era.printButton('上一页', 2000);
    era.printButton('下一页', 2001);
    era.printButton('结束换号', 1999); // #60 简体归一
    const first = await era.input();

    if (first === 2000) {
      // 上一页（页首不动，仅重绘）
      if (no_page > 0) no_page -= 1;
      continue;
    }
    if (first === 2001) {
      // 下一页
      if ((no_page + 1) * NUM_PAGE <= total) no_page += 1;
      continue;
    }
    if (first === 1999) {
      return; // 回到名册分发
    }
    // 其余输入＝第一屏选中的角色 ID（条件外的编号不可达，见文件头）

    // —— 第二屏（同一页码窗口，剃除已选的行）——
    let second = 0; // 第二个角色
    for (;;) {
      // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
      await change_screen();
      era.print('要跟那个角色换号呢？');
      const second_ids = swap_candidates()
        .slice(no_page * NUM_PAGE, (no_page + 1) * NUM_PAGE)
        .filter((cid) => cid !== first); // 对象是角色1剃除
      for (const cid of second_ids) print_swap_row(cid);
      era.println();
      era.println();
      era.printButton('上一页', 3000);
      era.printButton('下一页', 3001);
      // [3002] 取消：有意补出的出口（ere 输入模型差异），见文件头
      era.printButton('取消', 3002);
      const picked = await era.input();

      if (picked === 3000) {
        // 上一页（与第一屏共用 no_page）
        if (no_page > 0) no_page -= 1;
        continue;
      }
      if (picked === 3001) {
        // 下一页
        if ((no_page + 1) * NUM_PAGE <= total) no_page += 1;
        continue;
      }
      if (picked === 3002) {
        // 回第一屏重选（见文件头）——跳到外层循环头
        continue swap_page;
      }
      second = picked; // 第二个角色＝选中的 ID
      break;
    }

    // —— 确认屏 ——
    await change_screen();
    era.println();
    era.print(`${name_of(first)}将与${name_of(second)}交换排序编号，确定吗？`);
    era.printButton('是', 4000);
    era.printButton('否', 4001);
    const confirm = await era.input();

    if (confirm === 4000) {
      // 不搬角色数据、不改 ID，只交换排序编号（见文件头）
      swap_sort_numbers(first, second);
      await era.printAndWait('已完成互换');
      era_flag.target = -1;
      era_flag.assi = -1;
      continue; // 重画第一屏（no_page 不归零）
    }
    // [4001] 回第一屏；「其它输入」分支在 ere 白名单下不可达，不做（文件头）
  }
}

module.exports = { chara_number_swap };
