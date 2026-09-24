/**
 * @file 能力值提升：@ABILITY_UP 与 @ABILITY_UP_CORE（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_2.ERB  @ABILITY_UP（:4-153，菜单与页码缓存）、
 *     @ABILITY_UP_CORE（:155-254，单项的能力提升输入循环）。
 *
 * 调用点（本票接入）：page/page-shop.js 的 usershop [105] 分支（选中后
 * 复核出售资格）、page/page-chara-info.js 的 CHARA_INFO_INDIVIDUAL CASE 10
 * （只调 CORE）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 * 1. **页码缓存只剩「换菜单档回第 1 页」一条**：原作 :15-17/:21-31 维护
 *    LIST_POS / PREV_PAGE / PREV_LIST_POS / PREV_MODE 四个 VARIABLES.ERH
 *    全局（`target/ERB/其他/LIST_APPEND.ERH:14-17`），把它们喂给列表函数
 *    当扫描起点。前三个在 ere 侧失去意义：列表函数改按命中序号开窗
 *    （page-life-list.js 文件头第 7 条——原作那套扫描起点+计数窗在按值传递
 *    下根本翻不动页），LIST_POS 不再是列表函数的入参。保留下来的可观察
 *    行为只有 :33-38 的「菜单档变了就把页码归零」（PREV_MODE 因此按模块级
 *    变量保留，跨调用比较才有意义；source-check.js 的 down_map 同款先例）。
 *
 * 2. **RESTART（:153）**：原作 @ABILITY_UP_CORE 返回后 `RESTART` —— 回到函数
 *    头、局部变量回 #DIM 默认值（SELECT_MENU = 998 等），而 LIST_POS 族全局
 *    不回退。ere 侧用带标签的外层循环复刻（内层是菜单循环、最内层是输入
 *    循环，三层的跳转目标与原作标签一一对应）。
 *
 * 3. **PRINTW / CLEARLINE**：`PRINTW`（print + 读键）按 utils/stub-line.js
 *    文件头定下的形态显式组合 `era.print + era.waitAnyKey`；`CLEARLINE N`
 *    的局部重绘不镜像（ere 是滚动视图，page-select-target.js 同款先例），
 *    校验类提示因此会留在屏上而不是被抹掉——已知表现差异。
 *
 * 4. **字体设置不镜像**：`SETFONT "ARIEL BLACK" / FONTBOLD` 与随后的
 *    `FONTREGULAR / SETFONT "黑体"` 是 Emuera 的字体命令，EraElectron 的
 *    输出 API 无对应参数（引擎渲染层固定字体）。
 *
 * 5. **ABLUP 各支（:170-245）仍是存根**：升级规则本体（ABL/ABLUP*.ERB，
 *    8,808 行）不在本票范围（工单只点 SHOP/SHOP_2.ERB），与
 *    system/train/juel-check.js 的 @JUEL_CHECK 分发同一批占位——两处共用
 *    juel-check 导出的 ABLUP_IDS（同一张表，不重列）。各支的原作注释
 *    （部位/能力名）保留在下方分发表的注释里，供接入时对照。
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
const { check_sellassiable } = require('#/system/stronghold/sale');
const { yokubo_up_check } = require('#/system/train/ability-check');
const {
  ABLUP_IDS,
  ABLUP_HANDLERS,
  STUBBED_ABLUP_NAMES,
} = require('#/system/train/juel-check');
const { chara_callname } = require('#/utils/callname-utils');
const { NBSP, pad_display, pad_left } = require('#/utils/display-width'); // #577：对齐补位 NBSP 化
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。ABLUPxx 是 @ABILITY_UP_CORE 输入
 * 分发的全部目标（:170-245），与 system/train/juel-check.js 的
 * @JUEL_CHECK 分发同表；ABLUP_HANDLERS 覆盖的编号（issue #464）已落真身，
 * 不再登记为存根。
 */
const STUBBED_CALLS = [...STUBBED_ABLUP_NAMES];

/** 勇者一览的每页行数（:68 `NUM_PAGE = 24`） */
const ENEMY_NUM_PAGE = 24;
/** 奴隶一览的每页行数（:75 `NUM_PAGE = 23`） */
const SLAVE_NUM_PAGE = 23;
/** 奴隷一览的菜单档（:39-42 的判据、:74 的归一目标） */
const MENU_SLAVE = 998;
/** 勇者一览的菜单档（:67 的判据） */
const MENU_ENEMY = 997;

/**
 * PREV_MODE（VARIABLES.ERH 的列表缓存全局）：上一次绘制用的菜单档。
 * 跨调用保留——:33-38 拿它和本次的 SELECT_MENU 比较，不同就重置页码缓存。
 */
let prev_mode = 0;

/** CFLAG 读数兜底（#13：未声明下标 undefined → 0） */
function cflag(cid, idx) {
  return era.get(`cflag:${cid}:${idx}`) || 0;
}

/**
 * 菜单头（:46-64）：奴隶一览 / 勇者一览两个按钮 + 标题。
 *
 * :50-51 的 `SIF CFLAG:0:9 < 20 → SETCOLOR (GETDEFCOLOR() - 0x444444)` 是
 * 「魔王等级不足时把两个按钮调暗」——按 menu-button.js 的既有近似（调暗 =
 * #bbbbbb）走 menu_button 的 dim 参数。
 */
function draw_menu_header() {
  era.drawLine({ isSolid: true }); // :46 CUSTOMDRAWLINE =
  // :47-48 SETFONT "ARIEL BLACK" / FONTBOLD 不镜像（见文件头第 4 条）
  const dim = cflag(0, 9) < 20; // :50 SIF CFLAG:0:9 < 20
  menu_button('奴隶一览', MENU_SLAVE, dim); // :52（UNICODE(0x258c) 由助手拼）
  menu_button('勇者一览', MENU_ENEMY, dim); // :53
  // :56 的 PRINTL 只结束 :52 / :53 那两个 PRINTBUTTON 所在的行（按钮自成
  // 一行，见 CONTEXT.md「输出 API 与原作的对应」）；golden 的
  // sale-natural-log:88-93 里按钮行与 :61-63 的分割线逐行相邻，故这里不补
  // 空行（#562）
  era.drawLine(); // :61-63 DRAWLINE + SETFONT
  era.print('要提高谁的能力值？'); // :63
  era.drawLine(); // :64-66（DRAWLINE + SIF 灰显 + 两个 PRINTBUTTON）
}

/**
 * 列表与页脚（:65-96）。
 *
 * L_LCOUNT 记账（:65/:81）与补行（:82-90）1:1：`REPEAT (NUM_PAGE - L_LCOUNT)`
 * 每次补空行，998 档补行期间 NUM_PAGE 临时 +1（:83-84 与 :88-89 的一对
 * 增减，为的是把本身就占一行的魔王行算进去）——空行数与 NUM_PAGE 的关系
 * 因此逐字保留。
 *
 * @param {number} select_menu 菜单档（997/998）
 * @param {number} no_page 页码
 * @returns {{menu: number, page_size: number, max_page: number}} 归一后的
 *   菜单档（:74「イレギュラーも含めて正規の値に戻す」——991-996 的点选会
 *   被写回 998）、每页行数（23/24，原作的 #DIM NUM_PAGE 按档赋值）与最大
 *   页码（原作 MAX_PAGE = RESULT - 1）
 */
function draw_list(select_menu, no_page) {
  let page_size;
  let menu = select_menu;
  const anchor = era.getLineCount(); // L_LCOUNT = LINECOUNT（:65）
  let max_page;
  if (select_menu === MENU_ENEMY) {
    // :67-71 勇者一览：NUM_PAGE = 24、页数取 @MAX_PAGE_ENEMY、列表走 ENEMY
    page_size = ENEMY_NUM_PAGE;
    max_page = max_page_enemy(page_size) - 1; // :69-70（RESULT - 1）
    life_list_enemy(no_page, page_size); // :71
  } else {
    // :72-79 奴隶一览（含イレギュラー：:74 把菜单档归一回 998 并写回）
    menu = MENU_SLAVE; // :74 SELECT_MENU = 998
    page_size = SLAVE_NUM_PAGE;
    max_page = max_page_salave(page_size) - 1; // :76-77
    // :78 魔王行（[{0,2}] %NAME:MASTER,12,LEFT% %"",8,LEFT% LV{…,4,RIGHT}）
    // ——名字字段宽 12、随后 8 空格、等级右对齐宽 4，与 LIFE_LIST 的
    // 表头同款（那里是 MAX_NAME_LEN + 8 的动态宽，这里是字面量 12）
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
    life_list_salave(no_page, page_size); // :79
  }
  const l_lcount = era.getLineCount() - anchor; // :81 L_LCOUNT = LINECOUNT - L_LCOUNT
  // :82-90 补行（L_LCOUNT < NUM_PAGE + 1 时补到页高）
  if (l_lcount < page_size + 1) {
    let pad_size = page_size;
    if (select_menu === MENU_SLAVE) {
      pad_size += 1; // :83-84 SIF SELECT_MENU == 998 → NUM_PAGE++
    }
    for (let row = 0; row < pad_size - l_lcount; row += 1) {
      era.print('');
    }
    // :88-89 SIF SELECT_MENU == 998 → NUM_PAGE--（配对还原，见函数头）
  }
  era.drawLine(); // :91-93（DRAWLINE + 三个 PRINTLC 页脚键）
  // :92 起的三个 PRINTLC 打在同一行，:96 的 PRINTL（写作 `PRINTL  `）只结束
  // 那一行——PRINTLC 左对齐补位、**不换行**，故不产生空行。ere 的 printButton
  // 自成一行（＝ PRINTLC + 收尾的 PRINTL），不再补空行（语义与勘误见
  // CONTEXT.md「输出 API 与原作的对应」）。
  era.printButton('- 上一页', 1000); // :92 PRINTLC
  era.printButton('- 返  回', 999); // :93（原作的 `-` 是正文的一部分）
  era.printButton('- 下一页', 1001); // :94
  return { menu, page_size, max_page };
}

/**
 * 校验类提示（原作 PRINTW + CLEARLINE 2 + GOTO 的等价物，见文件头第 3 条）。
 * @param {string} text
 */
async function print_guard(text) {
  era.print(text);
  await era.waitAnyKey();
}

/**
 * @ABILITY_UP（:4-153）：能力值提升的选人画面。
 *
 * 结构 1:1：外层 RESTART 循环 / 菜单循环 / 输入循环三层，标签分别为函数头、
 * `$INPUT_LOOP_MENU`（:18）、`$INPUT_LOOP_0`（:98）。
 *
 * @returns {Promise<number>} 0（:100-101 的 RETURN 0；其余出口都是 GOTO）
 */
async function ability_up() {
  // :153 RESTART：CORE 返回后重跑本函数（局部变量回 #DIM 默认值）
  restart: for (;;) {
    let select_menu = MENU_SLAVE; // #DIM SELECT_MENU = 998（:5）
    let no_page = 0; // #DIM NO_PAGE = 0（:9）
    let max_page = 0; // #DIM MAX_PAGE（:13）

    // $INPUT_LOOP_MENU（:18-96）
    menu: for (;;) {
      // :33-38 菜单档换了（PREV_MODE != SELECT_MENU）→ 页码归零
      //（同段的 LIST_POS/PREV_PAGE/PREV_LIST_POS 在 ere 侧失去消费者，
      // 见文件头第 1 条）
      if (prev_mode !== select_menu) {
        no_page = 0;
      }
      prev_mode = select_menu; // :44

      draw_menu_header(); // :46-64
      const drawn = draw_list(select_menu, no_page); // :65-96
      select_menu = drawn.menu; // :74 的写回（イレギュラー归一）
      max_page = drawn.max_page; // :70/:77 MAX_PAGE = RESULT - 1

      // $INPUT_LOOP_0（:98-147）
      for (;;) {
        const result = await era.input(); // :99 INPUT

        if (result === 999) {
          return 0; // :100-101
        }
        if (result > 990 && result < 999 && cflag(0, 9) < 20) {
          // :102-105 等级不足：提示后回 $INPUT_LOOP_0（两个按钮的点选门）
          await print_guard('这个指令需要更高等级');
          continue;
        }
        if (result > 990 && result < 999) {
          // :106-110 切换菜单档（991-998，イレギュラー全部归奴隶一览）
          select_menu = result;
          continue menu; // GOTO INPUT_LOOP_MENU
        }
        if (result === 1000) {
          // :111-116 上一页
          if (no_page > 0) {
            no_page -= 1;
          }
          continue menu;
        }
        if (result === 1001) {
          // :117-122 下一页
          if (no_page < max_page) {
            no_page += 1;
          }
          continue menu;
        }
        if (result < 0 || !era.getAddedCharacters().includes(result)) {
          // :123-126 范围外。原作的判据是 `RESULT < 0 || RESULT >= CHARANUM`
          // （角色号连续）；ere 侧编号空间是角色 ID，未加入的 ID 等同于
          // 「不存在的人」，与越界同路（ID 语义改写，page-select-target.js
          // 同款；实机上这一支不可达——列表按钮即输入集，见文件头第 3 条）
          await print_guard('数值已超出允许范围外');
          continue;
        }
        if ((era.get(`base:${result}:0`) || 0) < 1) {
          // :127-131 臨死中は排除
          await print_guard('濒死中，无法选择');
          continue;
        }
        if (cflag(result, 1) !== 0 && select_menu === MENU_SLAVE) {
          // :138-141 奴隷待機以外は除外
          await print_guard('不能选择非待命状态的奴隶');
          continue;
        }
        if (cflag(result, 1) !== 2 && select_menu === MENU_ENEMY) {
          // :143-146 侵攻中勇者以外は除外
          await print_guard('不能选择非侵攻状态的勇者');
          continue;
        }

        // :149-150 SIF RESULT == 0 → RESULT = MASTER：MASTER 恒 0，于是这一句
        // 是恒等映射（0 号就是魔王自己），保留出处注释即可
        const target = result;
        await ability_up_core(target); // :152 CALL ABILITY_UP_CORE(RESULT)
        continue restart; // :153 RESTART
      }
    }
  }
}

/**
 * @ABILITY_UP_CORE（:155-254）：单个角色的能力提升输入循环。
 *
 * `T = TARGET; TARGET = ARG`（:156-157）——本函数运行期间 TARGET 指向被提升
 * 的角色（SHOW_INFO_EXP / SHOW_JUEL 读它），退出前还原（:250）。
 *
 * @param {number} arg 角色 ID（原作 ARG）
 * @returns {Promise<number>} 0（[999] 结束支）；其余输入在循环内消化
 */
async function ability_up_core(arg) {
  const previous_target = era_flag.target; // :156 T = TARGET
  era_flag.target = arg; // :157 TARGET = ARG

  // $INPUT_LOOP_1（:159-254）
  for (;;) {
    era.drawLine(); // :160-161（DRAWLINE + 目标名）
    era.print(chara_callname(arg)); // :161 PRINTFORML %SAVESTR:TARGET%
    era.drawLine(); // :162 CUSTOMDRAWLINE ‥
    show_info_exp(arg); // :163 CALL SHOW_INFO_EXP
    show_juel(arg); // :164 CALL SHOW_JUEL
    await show_ablup_select(arg); // :165 CALL SHOW_ABLUP_SELECT（`*` 标记要看 DECIDE，故 await）

    const result = await era.input(); // :167 INPUT

    // :170-245 各能力分支（阴蒂感觉 0 / 乳房感觉 1 / 私处感觉 2 / 肛门感觉 3 /
    // 局部感覚 4 / 顺从 10 / 欲望 11 / 技巧 12 / 侍奉技术 13 / 性交技术 14 /
    // 话术 15 / 侍奉精神 16 / 露出癖 17 / 抖S气质 20 / 抖M气质 21 / 百合气质
    // 22 / ホモっ気 23 / 性交中毒 30 / 自慰中毒 31 / 精液中毒 32 / 百合中毒 33 /
    // 卖淫中毒 37 / 兽奸中毒 39 / 局部中毒 40 / 反抗刻印 99 / 100）
    if (result in ABLUP_HANDLERS) {
      await ABLUP_HANDLERS[result](arg); // issue #464
      continue; // :254 GOTO INPUT_LOOP_1
    }
    if (ABLUP_IDS.includes(result)) {
      stub_line(`ABLUP${result}`, '能力提升处理'); // 剩余编号仍是存根
      continue; // :254 GOTO INPUT_LOOP_1
    }

    if (result === 999) {
      // :246-251 结束：欲情变化检查（真身）→ 出售资格复核 → 还原 TARGET
      // 商店内、非调教期调用，tflag 桶不存在——见 ability-check.js 文件头
      // 「TFLAG:25 的调教外通道」节
      yokubo_up_check(era_flag.target, { in_train: false }); // :247
      await check_sellassiable(era_flag.target); // :248（CALL CHECK_SELLASSIABLE 无参）
      // :249 CALL CHECK_SPECIALSKIL 在原作是注释行，不移植
      era_flag.target = previous_target; // :250 TARGET = T
      return 0; // :250-251（TARGET 还原 + RETURN 0）
    }
    // 其余输入：:254 GOTO INPUT_LOOP_1（重绘再来，无提示）
  }
}

module.exports = {
  STUBBED_CALLS,
  ENEMY_NUM_PAGE,
  MENU_ENEMY,
  MENU_SLAVE,
  SLAVE_NUM_PAGE,
  ability_up,
  ability_up_core,
};
