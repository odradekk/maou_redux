/**
 * @file 能力值提升：ability_up 与 ability_up_core（issue #397 / N13 段 3）。
 *
 * 调用点（这张工单接入）：page/page-shop.js 的 usershop [105] 分支（选中后
 * 复核出售资格）、page/page-chara-info.js 的 CHARA_INFO_INDIVIDUAL CASE 10
 * （只调 CORE）。
 *
 * 实现说明（取舍点均注明依据）：
 *
 * 1. **页码缓存只剩「换菜单档回第 1 页」一条**：完整的列表翻页缓存要
 *    LIST_POS / PREV_PAGE / PREV_LIST_POS / PREV_MODE 四个全局，把扫描
 *    起点喂给列表函数。前三个在 ere 侧失去意义：列表函数改按命中序号开窗
 *    （page-life-list.js 文件头第 7 条——扫描起点+计数窗在按值传递下根本
 *    翻不动页），LIST_POS 不再是列表函数的入参。保留下来的可观察行为只有
 *    「菜单档变了就把页码归零」（PREV_MODE 因此按模块级变量保留，跨调用
 *    比较才有意义；source-check.js 的 down_map 同款先例）。
 *
 * 2. **CORE 返回后重跑选人**：ability_up_core 返回后回到本函数头重跑，
 *    局部变量回初值（SELECT_MENU = 998 等），跨调用的页码缓存不回退。
 *    用带标签的外层循环实现（内层是菜单循环、最内层是输入循环，三层
 *    分别承担重跑、回菜单、原地重输）。
 *
 * 3. **读键提示与局部重绘**：print 并等待按键的提示按项目既有约定显式
 *    组合 `era.print + era.waitAnyKey`；「清掉刚画的几行重画」的局部重绘
 *    不做（ere 是滚动视图，page-select-target.js 同款先例），校验类提示
 *    因此会留在屏上而不是被抹掉——已知表现差异。
 *
 * 4. **字体设置不绘制**：按钮标题的粗体/黑体切换没有输出 API 参数可用
 *    （引擎渲染层固定字体），忽略。
 *
 * 5. **能力分支的分发**：升级规则本体自 #464-#466 起全部实现
 *    （juel-check.js 的 ABLUP_HANDLERS），本文件的分发与之共用同一张表；
 *    各支的部位/能力名注释见 ability_up_core 内的分发处。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const {
  life_list_enemy,
  life_list_salave,
  max_page_enemy,
  max_page_salave,
  print_row,
} = require('#/page/page-life-list');
const { show_ablup_select, show_juel } = require('#/page/page-ablup');
const { show_info_exp } = require('#/page/page-info-exp');
const { menu_button } = require('#/page/components/menu-button');
const {
  change_screen,
  confirm_output_since,
} = require('#/page/components/screen-change');
const { check_sellassiable } = require('#/system/stronghold/sale');
const { yokubo_up_check } = require('#/system/train/ability-check');
const { ABLUP_HANDLERS, HANDLER_QUIET } = require('#/system/train/juel-check');
const { chara_callname } = require('#/utils/callname-utils');
const { NBSP, pad_display, pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化

/** 勇者一览的每页行数 */
const ENEMY_NUM_PAGE = 24;
/** 奴隶一览的每页行数 */
const SLAVE_NUM_PAGE = 23;
/** 奴隶一览的菜单档（非勇者档的输入一律归一到这个值） */
const MENU_SLAVE = 998;
/** 勇者一览的菜单档 */
const MENU_ENEMY = 997;

/**
 * 上一次绘制用的菜单档。跨调用保留——每次绘制前与本次的菜单档比较，
 * 不同就重置页码缓存。
 */
let prev_mode = 0;

/** CFLAG 读数缺省处理（#13：未声明下标 undefined → 0） */
function cflag(cid, idx) {
  return era.get(`cflag:${cid}:${idx}`) || 0;
}

/**
 * 菜单头：奴隶一览 / 勇者一览两个按钮 + 标题。
 *
 * 魔王等级不足（CFLAG:0:9 < 20）时把两个按钮调暗——按 menu-button.js
 * 的既有近似（调暗 = #bbbbbb）走 menu_button 的 dim 参数。
 */
function draw_menu_header() {
  era.drawLine({ isSolid: true }); // 实线分割线
  // 标题字体设置不绘制（见文件头第 4 条）
  const dim = cflag(0, 9) < 20; // CFLAG:0:9 = 魔王等级
  menu_button('奴隶一览', MENU_SLAVE, dim); // （▌ 前缀由 menu_button 拼接）
  menu_button('勇者一览', MENU_ENEMY, dim);
  // 按钮自成一行（见 CONTEXT.md「输出 API 的排版与对齐」）；实测输出里
  // 按钮行与随后的分割线逐行相邻，故这里不补空行（#562）
  era.drawLine(); // 分割线
  era.print('要提高谁的能力值？');
  era.drawLine(); // 分割线
}

/**
 * 列表与页脚。
 *
 * 补行规则：实际行数不足页高时逐行补空行；奴隶档（998）补行期间页高
 * 临时 +1（一对增减，为的是把本身就占一行的魔王行算进去）——空行数与
 * 页高的关系因此逐字保留。
 *
 * @param {number} select_menu 菜单档（997/998）
 * @param {number} no_page 页码
 * @returns {{menu: number, page_size: number, max_page: number}} 归一后的
 *   菜单档（991-996 的点选会被写回 998）、每页行数（23/24，按菜单档取值）
 *   与最大页码（列表函数结果 - 1）
 */
function draw_list(select_menu, no_page) {
  let page_size;
  let menu = select_menu;
  const anchor = era.getLineCount(); // 行数记账基准（列表画完后的差值即本页行数）
  let max_page;
  if (select_menu === MENU_ENEMY) {
    // 勇者一览：每页 24 行、页数取 max_page_enemy、列表走 life_list_enemy
    page_size = ENEMY_NUM_PAGE;
    max_page = max_page_enemy(page_size) - 1;
    life_list_enemy(no_page, page_size);
  } else {
    // 奴隶一览（其他菜单档的输入也归一到 998 并写回）
    menu = MENU_SLAVE; // 归一到奴隶一览档
    page_size = SLAVE_NUM_PAGE;
    max_page = max_page_salave(page_size) - 1;
    // 魔王行——名字字段宽 12、随后 8 空格、等级右对齐宽 4，与
    // page-life-list 的表头同款（表头是名字最大宽 + 8 的动态宽，这里是
    // 字面量 12）
    print_row(
      0,
      [
        {
          content:
            `${pad_display(chara_callname(0), 12)}${NBSP.repeat(8)} ` +
            `LV${pad_left(String(cflag(0, 9)), 4)}`,
        },
      ],
      4,
    );
    life_list_salave(no_page, page_size);
  }
  const l_lcount = era.getLineCount() - anchor; // 本页实际行数
  // 补行（实际行数不足页高时补到页高）
  if (l_lcount < page_size + 1) {
    let pad_size = page_size;
    if (select_menu === MENU_SLAVE) {
      pad_size += 1; // 奴隶档页高 +1（魔王行本身占一行）
    }
    for (let row = 0; row < pad_size - l_lcount; row += 1) {
      era.print('');
    }
  }
  era.drawLine(); // 分割线（其后是三个页脚按钮）
  // 三个页脚按钮各自成一行，不补空行——引擎的 printButton 每次调用独占
  // 一行（语义与勘误见 CONTEXT.md「输出 API 的排版与对齐」）。
  era.printButton('- 上一页', 1000);
  era.printButton('- 返  回', 999); // `-` 是按钮正文的一部分
  era.printButton('- 下一页', 1001);
  return { menu, page_size, max_page };
}

/**
 * 校验类提示（打印一行并等待按键，见文件头第 3 条）。
 * @param {string} text
 */
async function print_guard(text) {
  era.print(text);
  await era.waitAnyKey();
}

/**
 * 能力值提升的选人画面。
 *
 * 三层循环：外层是 CORE 返回后的重跑循环、中层是菜单循环、内层是输入
 * 循环，分别承担重跑选人、回菜单重绘、原地重输。
 *
 * @returns {Promise<number>} 0（仅 [999] 出口返回；其余出口都是循环内跳转）
 */
async function ability_up() {
  // 重跑层：CORE 返回后从函数头重跑（局部变量回初值）
  restart: for (;;) {
    let select_menu = MENU_SLAVE; // 缺省档：奴隶一览
    let no_page = 0;
    let max_page = 0;

    // 菜单循环：画菜单、消化菜单切换与翻页
    menu: for (;;) {
      // 菜单档换了（与上次绘制的档不同）→ 页码归零（见文件头第 1 条）
      if (prev_mode !== select_menu) {
        no_page = 0;
      }
      prev_mode = select_menu;

      await change_screen();
      draw_menu_header();
      const drawn = draw_list(select_menu, no_page);
      select_menu = drawn.menu; // 写回归一后的菜单档
      max_page = drawn.max_page;

      // 输入循环：点选与编号输入在此消化
      for (;;) {
        const result = await era.input();

        if (result === 999) {
          return 0;
        }
        if (result > 990 && result < 999 && cflag(0, 9) < 20) {
          // 等级不足：提示后原地重输（挡住两个按钮的点选）
          await print_guard('这个指令需要更高等级');
          continue;
        }
        if (result > 990 && result < 999) {
          // 切换菜单档（991-998 一律归奴隶一览）
          select_menu = result;
          continue menu; // 回菜单循环
        }
        if (result === 1000) {
          // 上一页
          if (no_page > 0) {
            no_page -= 1;
          }
          continue menu;
        }
        if (result === 1001) {
          // 下一页
          if (no_page < max_page) {
            no_page += 1;
          }
          continue menu;
        }
        if (result < 0 || !era.getAddedCharacters().includes(result)) {
          // 范围外。检查的是「ID 是否已加入」而非编号上限：编号空间是
          // 角色 ID，未加入的 ID 等同于「不存在的人」，与越界同路
          // （page-select-target.js 同款；实机上这一支不可达——列表按钮即
          // 输入集，见文件头第 3 条）
          await print_guard('数值已超出允许范围外');
          continue;
        }
        if ((era.get(`base:${result}:0`) || 0) < 1) {
          await print_guard('濒死中，无法选择');
          continue;
        }
        if (cflag(result, 1) !== 0 && select_menu === MENU_SLAVE) {
          await print_guard('不能选择非待命状态的奴隶');
          continue;
        }
        if (cflag(result, 1) !== 2 && select_menu === MENU_ENEMY) {
          await print_guard('不能选择非侵攻状态的勇者');
          continue;
        }

        // 输入 0 即选中魔王本人（0 号就是魔王自己），无需特判
        const target = result;
        await ability_up_core(target); // 进入该角色的能力提升循环
        continue restart;
      }
    }
  }
}

/**
 * 单个角色的能力提升输入循环。
 *
 * 本函数运行期间 era_flag.target 指向被提升的角色（show_info_exp /
 * show_juel 读它），退出前还原。
 *
 * @param {number} arg 角色 ID
 * @returns {Promise<number>} 0（[999] 结束支）；其余输入在循环内消化
 */
async function ability_up_core(arg) {
  const previous_target = era_flag.target; // 备份，退出前还原
  era_flag.target = arg; // 本函数运行期间指向被提升的角色

  // 输入循环：绘制状态区并消化能力分支。每轮绘制前换屏（ADR-0009）
  for (;;) {
    await change_screen();
    era.drawLine(); // 分割线
    era.print(chara_callname(arg)); // 目标名
    era.drawLine(); // 点线分割线
    show_info_exp(arg);
    show_juel(arg);
    await show_ablup_select(arg); // `*` 标记要等 decide_ablup 的判定，故 await

    const result = await era.input();
    // 回显之后的行数：999 出口的两项检查有没有播报以它为准（回显也算
    // 输出，无条件等键会让检查未触发的路径多按一次键）
    const echo_rows = era.getLineCount();

    // 各能力分支（阴蒂感觉 0 / 乳房感觉 1 / 私处感觉 2 / 肛门感觉 3 /
    // 局部感覚 4 / 顺从 10 / 欲望 11 / 技巧 12 / 侍奉技术 13 / 性交技术 14 /
    // 话术 15 / 侍奉精神 16 / 露出癖 17 / 抖S气质 20 / 抖M气质 21 / 百合气质
    // 22 / ホモっ気 23 / 性交中毒 30 / 自慰中毒 31 / 精液中毒 32 / 百合中毒 33 /
    // 卖淫中毒 37 / 兽奸中毒 39 / 局部中毒 40 / 反抗刻印 99 / 100）
    if (result in ABLUP_HANDLERS) {
      const handler_ret = await ABLUP_HANDLERS[result](arg); // issue #464
      // 放弃支（HANDLER_QUIET）最后一次动作是输入：回显已把分支画面全部
      // 确认，其后没有新输出——再等键会真等一次，玩家多按键，跳过。其余
      // 分支至少有一行未读的自己画面（成功播报 / 分支菜单）在重画本屏前经
      // 按键确认（ADR-0009）；自带收尾等键的分支引擎自动短路，不会重复等
      if (handler_ret !== HANDLER_QUIET) {
        await era.waitAnyKey();
      }
      continue;
    }
    // 菜单按钮的编号与 ABLUP_HANDLERS 的键一一对应（#464-#466 全部实现），
    // 未实现时的回落分支已随占位机制一并删除（#638）：其余输入落到链尾重绘

    if (result === 999) {
      // 结束：欲情变化检查 → 出售资格复核 → 还原调教目标
      // 商店内、非调教期调用，tflag 桶不存在——见 ability-check.js 文件头
      // 「TFLAG:25 的调教外通道」节
      yokubo_up_check(era_flag.target, { in_train: false });
      await check_sellassiable(era_flag.target);
      // 欲情变化与出售资格复核的播报在回菜单前经按键确认（ADR-0009）；
      // 两项检查都未触发时不打印，不等键
      await confirm_output_since(echo_rows);
      era_flag.target = previous_target;
      return 0;
    }
    // 其余输入：重绘再来，无提示
  }
}

module.exports = {
  ENEMY_NUM_PAGE,
  MENU_ENEMY,
  MENU_SLAVE,
  SLAVE_NUM_PAGE,
  ability_up,
  ability_up_core,
};
