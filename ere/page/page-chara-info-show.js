/**
 * @file 角色信息画面的主分发（@SHOW_CHARA_INFO）与它的两个十六进制帮手。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB
 *       @SHOW_CHARA_INFO（:7-321）/ @HEXtoDEC（:1765-1822）/
 *       @ColorJudgmentWorB（:1824-1833）
 *       target/ERB/キャラ関数/CHARA_INFO_SHOW_MaouShadowsPlus.ERH
 *         （`#DIM directToHomePage`，只服务本文件的献祭分支，见下）
 *
 * 六个页码臂（`ARG:1`）：
 *   -2 贡品时 / -1 调教时 / 0 首页 / 1 状态 / 2 外观 / 3 素质条件 / 4 自我介绍。
 * **进入即换 TARGET、退出即恢复**（源 :25-26 的 `TARGET = ARG` 与 :320-321 的
 * `TARGET = LOCAL:1`）：@LOOK_INFO 等被调段按 TARGET 取语尾口上，不换的话
 * 调用方（如开局形象确认的 -2 页）会拿魔王的口上编号打出一排语尾占位、
 * 战役路径则会沿用上一次调教对象的口上（#565 返工第 2 条引擎实测）；
 * 换手用 try/finally，献祭分支的 continue/return 也走恢复。
 * 显式 cid 形参承载原作的 ARG（:25-26 与 :320-321 的进出等值——
 * LOCAL:1 存的正是进入时的 TARGET）。
 *
 * 有意偏离（各条注明依据）：
 *   - `L_LCOUNT = LINECOUNT` / 末尾「不足 27 行补空行」按 `era.getLineCount()`
 *     直译（引擎有该 API），补的是**从进入本函数起**的行数；
 *   - 献祭完成分支（:33-214，`CFLAG:ARG:1 == 11`）的三个无通道点：
 *       · `GETBGCOLOR`（取窗口背景色决定横幅用白字还是黑字）——引擎没有
 *         背景色的读取通道，改以 `background` 形参承载（缺省 `0x000000`，
 *         即本作默认背景），`hex_to_dec` / `color_judgment_wor_b` 两个函数
 *         本身照原样落地并用例直驱；
 *       · `FONTSTYLE 1/0`（加粗开关）——引擎无字体通道，整段不镜像；
 *       · `CLEARLINE 1`（输入回环的就地重绘）——项目通例不镜像（page-chara-info.js
 *         文件头同款），列表用 `for(;;)` 重画；
 *     `directToHomePage`（MaouShadowsPlus.ERH 的唯一内容）全库只在本函数里
 *     写、无人读（写入点 :46/:86，读点零），故不落表，改为返回值 `1` 传达
 *     「直接回首页」——`SHOW_CHARA_INFO` 的三个调用点都丢弃返回值，行为等价；
 *   - `ARG = shadow; RESTART` 用外层 `for(;;)` 承载（`shadow` 就是进入时的
 *     cid，重新开始等价于原地重画）；
 *   - 序号世界改角色 ID 世界（项目通例）：名单循环遍历
 *     `era.getAddedCharacters()`，打印与接受的都是角色 ID；名单行的快捷键
 *     与同屏的固定编号（六个条件键 [1000]-[1005]、返回 [999]）共存——后代
 *     ID 因此必须落在固定编号之上（chara-pregnancy.js 的 FIRST_CHILD_ID =
 *     100000，issue #560 的裁定；静态守卫见 test/child-id-collision.test.js），
 *     而预设 ID 在固定编号**之下**，撞号面只剩「预设 ID × 同屏固定按钮」：
 *   - **名单轮的 `[100] 返回` 改 [999]（#586）**：预设 100「怪物的女儿」能以
 *     ID 100 加入，与原作的 [100] 撞号后这个角色选不中。选点与备选修法的
 *     理由见 LIST_RETURN 的注释；出口轮不打角色行，它的 [100] 保持原作。
 *   - `CALL SHOW_PERSONAL_INFO(ARG)`（:305，CASE 4）全库无定义——不是
 *     「未移植」，是原作 `SELECTCASE ARG:1` 的这一支结构性不可达（全库没有
 *     任何调用点传 `ARG:1 == 4`；`CHARA_INFO ver1.0.1.ERB:948-949` 的翻页
 *     逻辑把 `NO_SUB_PAGE` 钳在 ≤3）。已按 #14 判死不实现，本文件保留这
 *     一行占位是 1:1 追溯（`page-chara-info.js:690` 的 `case 102` 同样把
 *     `sub_page` 钳在 <3，两处互相印证）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { equip_get } = require('#/system/equip/equip-lookup');
const { show_info_exp } = require('#/page/page-info-exp');
const { show_juel } = require('#/page/page-ablup');
const {
  show_block,
  show_info_title,
} = require('#/page/components/chara-info-title');
const {
  show_info_abl,
  show_info_mark,
} = require('#/page/components/chara-info-abl-mark');
const { show_data } = require('#/page/components/chara-data');
const { show_talent } = require('#/page/components/chara-talents');
const {
  show_appearance,
  show_ring,
} = require('#/page/components/chara-appearance');
const { show_talent_condition } = require('#/page/page-chara-talent-condition');
const { get_job_name } = require('#/page/page-select-target');
const { template_no_of } = require('#/chara/chara-pregnancy');
const { look_info } = require('#/chara/look');
const { get_look_info } = require('#/chara/look-info');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { NBSP, pad_display, pad_left } = require('#/utils/display-width');
const { stub_line } = require('#/utils/stub-line');

const default_rand = (n) => Math.floor(Math.random() * n);

/** CFLAG:1（状态位）的「已献祭」档（源 :33；写点在 SHOP_LABO:4297） */
const STATE_SACRIFICED = 11;
/** CFLAG:1 的「勇者」档（源 :139/:142；名单里这一档能点开贡品详情） */
const STATE_HERO = 2;
/** 状态位为 0/7/8 时列出的是「可献祭」的角色（源 :142） */
const SACRIFICABLE_STATES = [0, 7, 8];

/** 献祭满足度的六个分项 CFLAG 下标（源 :35-41） */
const SACRIFICE_FLAGS = [800, 801, 802, 803, 804, 805];
/** 满值（源 :41/:48 的 `/ 30` 与 `temp >= 30`） */
const SACRIFICE_FULL = 30;
/** 献祭完成演出的分割线长度（源 :63-68 的 `"-"*16`） */
const BANNER_DASH = 16;
/** 献祭列表的六个条件 kind（源 :90 的 `typeNeed`） */
const SACRIFICE_KINDS = [
  '种族',
  '性格',
  '成为勇者的契机',
  '成为勇者前的生活',
  '头发颜色',
  '瞳色',
];
/** 列表行的状态配色（源 :99-109 的三档 SETCOLOR + 已献祭的琥珀色） */
const LIST_COLORS = new Map([
  [2, '#d62020'], // SETCOLOR 214,32,32
  [7, '#40d640'], // SETCOLOR 64,214,64
  [8, '#804000'], // SETCOLOR 128,64,0
]);
/** `SETCOLOR 255,200,0`（已献祭星标，源 :108/:112） */
const SACRIFICED_COLOR = '#ffc800';
/** 名单区块补白到 27 行（源 :311-315） */
const MIN_LINES = 27;
/**
 * 名单轮的「返回」编号（源 :127 的 `[100]`）。**#586 起偏离原作**，选点 999：
 * 预设 ID 上界 777 < 999 < 本页条件键的下界 1000，既避开全部预设 ID，也避开
 * 后代 ID 段（≥ FIRST_CHILD_ID = 100000）；它同时是项目其余列表页「返回」的
 * 通用编号，且那些页面同样与角色行同屏（page-chara-info.js:626 的退出名册、
 * sale.js:605、chara-marriage.js:815 与 842、page-ability-up.js:184）——本页
 * 只是并入既有惯例，不是新造编号。
 *
 * 为什么必须离开 100：名单轮的角色行以**角色 ID** 作快捷键（项目通例，见
 * 文件头「序号世界改角色 ID 世界」），而预设 100「怪物的女儿」能以 ID 100
 * 加入——生命摇篮 `char_create`（chara-custom.js）在输入不落进 1-16 /
 * 21-30 / 37-60 三段时把它原样当预设编号（`SELECTCASE` 的 `CASEELSE`），
 * 经 `EXISTCSV` 放行（yml/Chara100.yml 在库）后 `era.addCharacter(100)`；
 * 该轮的输入是自由输入（菜单全是纯文本、之前还有一次 WAIT 清空白名单，
 * docs/research/plaintext-options.md 的 B 类；原作的 `CASEELSE` 透传 + EXISTCSV
 * 同样放行，预设来源见 test/chara-outer.test.js:11-16）。死亡苏生的
 * `resulection()`（page-shop-labo.js）是第二条理论入口（输入 199 → 预设
 * 100），但它的前置 flag:1099 死亡登记要求该角色先加入过，属二次路径。
 * 两枚按钮同编号时，`result === 100` 的返回分支先命中，这个角色就选不中
 * （#586）。
 *
 * 为什么不改角色行的编号：给行快捷键加偏移（显示与输入分离）会让**整屏**行的
 * 编号都变成非 ID 的合成数，与名册/批量处刑/目标选择三页「显示 ID、输入 ID」
 * 的既有惯例不一致，还要多一层输入映射；固定编号只是本页 UI 的取值，改它
 * 的代价最小。
 *
 * 出口轮（源 :79-80 的两个出口、:84-87 的返回分支）**不打角色行**，它的
 * `[100]` 保持原作不动。本常量只服务名单轮；静态守卫见
 * test/child-id-collision.test.js 的「预设 ID × 同屏固定按钮」核对。
 */
const LIST_RETURN = 999;

/**
 * @HEXtoDEC（:1765-1822）：`0xRRGGBB` 拆成三段十进制。
 *
 * `TOSTR hex,hexS` 把颜色整数转成 6 位十六进制串（源里随即逐位 SUBSTRING 并
 * 认 A-F，非十六进制串解释不出那六个 CASE），本实现按同样形态取值。**三段
 * 的合成用的是 ×15 而不是 ×16**（:1818-1820）——原作自身的进制笔误，1:1 保留。
 *
 * @param {number} hex 颜色整数（源 GETBGCOLOR 的返回值）
 * @param {number[]} dec 输出数组（源 `#DIM REF dec,0` 的 RESULT，写 dec[0..2]）
 */
function hex_to_dec(hex, dec) {
  const text = (hex >>> 0)
    .toString(16)
    .toUpperCase()
    .padStart(6, '0')
    .slice(-6);
  const digits = [...text].map((ch) => {
    const value = Number.parseInt(ch, 16);
    return Number.isNaN(value) ? 0 : value;
  });
  dec[0] = digits[0] * 15 + digits[1];
  dec[1] = digits[2] * 15 + digits[3];
  dec[2] = digits[4] * 15 + digits[5];
}

/**
 * @ColorJudgmentWorB（:1824-1833）：按背景三段的均值挑白字还是黑字。
 *
 * 均值取 `dec[0..2]`（源 :1827 读 `colorValue:0/:1/:2`），写回的是
 * `dec[1..3]`（:1828/:1830 的多重赋值）——读写错开一位是原作自身的偏移，
 * 1:1 保留（结果仍是三通道同值）。
 *
 * @param {number[]} dec 颜色三段（就地改写）
 * @returns {void}
 */
function color_judgment_wor_b(dec) {
  const average = Math.trunc((dec[0] + dec[1] + dec[2]) / 3);
  const value = average <= 128 ? 255 : 0; // :1827-1831
  dec[1] = value;
  dec[2] = value;
  dec[3] = value;
}

function cflag(cid, index) {
  return era.get(`cflag:${cid}:${index}`) || 0;
}

/** 六个分项之和（源 :41/:47） */
function sacrifice_score(cid) {
  return SACRIFICE_FLAGS.reduce((sum, index) => sum + cflag(cid, index), 0);
}

/** 一排分割线（源 :63-68 的 `"-"*16`） */
function dashes() {
  return '-'.repeat(BANNER_DASH);
}

/**
 * 献祭完成分支（源 :33-214）。**只由 `CFLAG:ARG:1 == 11` 进入**，写点在
 * `SHOP/SHOP_LABO ver1.0.2.ERB:4297`（#398 的范围）。
 *
 * @param {number} cid 角色 ID（源 ARG / shadow）
 * @param {number} background 背景色（源 GETBGCOLOR；引擎无通道，缺省黑）
 * @returns {Promise<boolean>} true = 源里走 `RESTART`（外层重画一次）
 */
async function sacrifice_flow(cid, background) {
  const shadow = cid; // :45
  era.print('已献祭的肉便器数量'); // :34
  SACRIFICE_FLAGS.forEach((index, kind) => {
    // :35-40 六项：数量（条件值） + 对应的外观信息
    era.print(
      `${SACRIFICE_KINDS[kind]}相同\u3000\u3000……${cflag(cid, index)}（${get_look_info(cid, SACRIFICE_KINDS[kind])}）`,
    );
  });
  era.print(
    `合计\u3000\u3000\u3000\u3000……${sacrifice_score(cid)} / ${SACRIFICE_FULL}`,
  ); // :41

  if (sacrifice_score(cid) >= SACRIFICE_FULL) {
    // :48-77 献祭完成演出（GETBGCOLOR/FONTSTYLE 的替代见文件头）
    // 三句各是 `PRINTS "\n"*2 + 文案` + WAIT（空两行、文案不换行、等键）
    era.println();
    era.println();
    await era.printAndWait('————此刻正是献祭完成之时！');
    era.println();
    era.println();
    await era.printAndWait(`${NBSP.repeat(16)}向这伟力的降临献上喝彩！`);
    era.println();
    era.println();
    await era.printAndWait(`${NBSP.repeat(32)}为至高无双的魔王尽瘁效忠！`);
    era.println();
    era.println();
    era.println();
    const dec = [0, 0, 0];
    hex_to_dec(background, dec);
    color_judgment_wor_b(dec);
    era.setColor(`rgb(${dec[1]},${dec[2]},${dec[3]})`); // :60 SETCOLOR
    era.setAlign('center'); // :62 ALIGNMENT CENTER
    era.print(
      `${dashes()} 魔王之影 『 ${chara_callname(shadow)} 』 ${dashes()}`,
    ); // :63-65
    era.print(dashes());
    era.print('< 完 全 召 唤 >');
    era.print(`${dashes()}  `);
    era.setAlign('left'); // :69 ALIGNMENT LEFT
    era.setColor(); // :71 RESETCOLOR
    // 三处跨域写一律走属主域门面（#71 裁定；属主见 ownership/cflag-ownership.yml
    // "1"（invasion）/"700"（chara）/"820"（chara）与 flag-ownership.yml "80"）
    chara(shadow).invasion.状态 = 0; // :72
    chara(shadow).chara.收藏 = 1; // :73
    chara(shadow).chara.寿命 = 666666; // :74
    await era.waitAnyKey(); // :72-75
    era.println(); // :73-76
    return true; // :77 RESTART（外层重画）
  }

  // :79-80 未满 30：给两个出口（各是 `PRINTS "\n"*2 + 文案`）
  // 两枚都是**真按钮**（PR #53 通则，#530 补齐本文件剩余几处）：引擎的 input
  // 只接受本轮打印过的按钮快捷键，纯文本的 ` [N] 文字 ` 行玩家敲不进编号。
  // 正文不写 `[N]`（引擎按 showAcc 自动拼，自带会显示成 `[10] [ 10] …`）。
  era.println();
  era.println();
  era.printButton('查看符合条件的奴隶或勇者', 10); // 原作 `[ 10]` 的补位交给引擎排版
  era.println();
  era.println();
  era.printButton('返回', 100);
  const choice = await era.input(); // :82 INPUT
  if (choice === 100) {
    return false; // :84-87 返回首页
  }
  if (choice !== 10) {
    return true; // :207-209 CASEELSE：重新开始
  }

  // :88-206 $SacrificeListRefresh 的名单循环
  let page = 0; // :18
  for (;;) {
    era.println();
    era.drawLine({ isSolid: true }); // :92 DRAWLINEFORM =
    era.print(`当前总祭品数： ${sacrifice_score(shadow)} /${SACRIFICE_FULL}`); // :93
    era.println();
    for (const id of era.getAddedCharacters()) {
      if (
        id === shadow ||
        get_look_info(id, SACRIFICE_KINDS[page]) !==
          get_look_info(shadow, SACRIFICE_KINDS[page])
      ) {
        continue; // :98
      }
      // 名单行做成真按钮（PR #53 通则：`[N] 文字` + INPUT 惯用法升级为
      // era.printButton）——引擎的 input 只接受本轮打印过的按钮快捷键，
      // 纯文本行玩家敲不进编号，这一支就成了死路（源 :110 是 PRINTFORM）。
      const state = cflag(id, 1);
      const color = cflag(id, 700) ? SACRIFICED_COLOR : LIST_COLORS.get(state);
      const label = `${pad_display(chara_callname(id), 12)} （${get_look_info(id, SACRIFICE_KINDS[page])}） ${pad_display(get_job_name(id), 6)} LV${pad_left(String(cflag(id, 9)), 3)} ${cflag(id, 700) ? '[☆]' : ''}`;
      // 编号前缀由引擎按 showAcc 自动拼（正文不写 `[N]`，AGENTS.md 那条硬约束）
      era.printButton(label, id, color === undefined ? undefined : { color });
    }
    // :119 `PRINTS "\n"*2 + "切换条件类型：" + "\n"*2`
    era.println();
    era.println();
    era.print('切换条件类型：');
    era.println();
    era.println();
    // :120-126 六个条件按钮（编号即 kind 下标 + 1000）
    for (const [index, kind] of SACRIFICE_KINDS.entries()) {
      era.printButton(kind, 1000 + index);
    }
    era.println();
    era.println();
    // :127 ` [100] 返回 ` 的编号 #586 起改 999（LIST_RETURN 的注释）——真按钮
    // （#530）。**这一轮的白名单非空**：名单行与六个条件键都在上面打印过了，
    // 纯文本行必然被引擎拒收（夹具当场抛「输入不合法」，见
    // test/chara-info-show.test.js 的 #530 用例）。
    era.printButton('返回', LIST_RETURN);
    era.println();

    const result = await era.input(); // :129
    if (result === LIST_RETURN) {
      return true; // :131-133 ARG = shadow; RESTART
    }
    if (result >= 1000 && result <= 1005) {
      page = result % 10; // :135
      continue; // :136 GOTO SacrificeListRefresh
    }
    if (result >= 1 && era.getAddedCharacters().includes(result)) {
      // :138-203 名单里点了某个角色
      const picked_state = cflag(result, 1);
      if (picked_state === STATE_HERO) {
        await show_chara_info(result, -2); // :140
        continue; // :141 GOTO
      }
      if (!SACRIFICABLE_STATES.includes(picked_state)) {
        // :193-201 其余状态一律不可操作（原作这一臂里还嵌了一层
        // `IF CFLAG:(RESULT):1 == 2` 的重复判据，恒假——上面已经拦过
        // STATE_HERO，1:1 精简为可达分支）
        era.print(`该状态不可操作：${picked_state}`);
        continue; // :200 GOTO
      }
      // :143-189 献祭确认
      era.println();
      era.print(
        `确定要将 ${chara_callname(result)} 献祭？（*将永远失去这个奴隶）`,
      );
      era.println();
      // 两个选项也是真按钮（#530）：本轮白名单为空时它们「碰巧」能用（自由
      // 输入），一旦上面多打一枚按钮就成了死路——按通则一律按钮化
      era.printButton('献祭', 1);
      era.println();
      era.printButton('终止', 0);
      const confirm = await era.input();
      if (confirm === 1) {
        era.print(`${chara_callname(result)} 成为了祭品之一`);
        await era.waitAnyKey();
        sacrifice_chara(shadow, result, page);
      }
      continue; // :189/:191 GOTO SacrificeListRefresh
    }
    // 其余输入：回环重问（源 :205-206 CLEARLINE 1 + GOTO 输入点）
  }
}

/**
 * 献祭一名角色（源 :156-187）：状态清零、装备回收、队伍与名字复位、编号表前移。
 * @param {number} shadow 献祭对象（源 shadow，即本函数的 cid）
 * @param {number} target_id 被献祭的角色 ID（源 RESULT）
 * @param {number} page 当前条件下标（源 page，用来累加 CFLAG:shadow:(800+page)）
 */
function sacrifice_chara(shadow, target_id, page) {
  chara(target_id).invasion.状态 = 0; // :156（跨域写走属主域门面）
  era.set(`cflag:${shadow}:${800 + page}`, cflag(shadow, 800 + page) + 100); // :157
  // :158-159 SIF RESULT < shadow → shadow--（序号世界的下标前移；ID 世界不适用，
  //   见文件头「序号世界改角色 ID 世界」）
  era_flag.target = target_id; // :161-162 TARGET = RESULT; A = TARGET
  for (const slot of [550, 551, 552]) {
    // :163-171 三件装备回收（W:0 = CFLAG:A:slot; CALL EQUIP_GET; CFLAG:A:slot = -1）
    equip_get({ 存储编号: cflag(target_id, slot) });
    era.set(`cflag:${target_id}:${slot}`, -1);
  }
  // :172-173 X = NO:A + 199; FLAG:X = 1。普通角色的 NO 就是角色 ID；后代的
  // 原作 NO 是来源模板号（chara-pregnancy.js 的 template_no_of），故经它换算。
  era.set(`flag:${template_no_of(target_id) + 199}`, 1);
  // :174-181 前回目标/助手（FLAG:1/FLAG:2）的下标前移——ID 世界不适用
  era_flag.target = era.get('flag:1') || 0; // :182 TARGET = FLAG:1
  party_char_del(target_id); // :184 CALL PARTY_CHAR_DEL, A
  era.removeCharacter(target_id); // :185 DELCHARA A
  // :186 CALL NAME_RESET（读 TARGET）。**惰性 require**：char-make.js 是
  // rand_chara_make 的宿主，它 require 本模块（形象确认段），顶层再 require
  // 回去会成环——只有献祭分支用得到，就在用到处取。
  require('#/chara/char-make').name_reset();
  game.event.处刑勇者数 += 1; // :187（跨域写走属主域门面）
}

/**
 * @SHOW_CHARA_INFO（:7-321）：角色信息画面的总入口。
 *
 * @param {number} cid 角色 ID（源 ARG）
 * @param {number} [page] 页码（源 ARG:1；-2 贡品 / -1 调教 / 0-4 各页）
 * @param {(n: number) => number} [rand] RAND:N 随机源（交给身体数据生成）
 * @param {number} [background] 背景色（源 GETBGCOLOR，仅献祭分支用）
 * @returns {Promise<number>} 源 :210-213/:87 的 RETURN 0（`directToHomePage` 的非零
 *   形态以返回值 1 传达，见文件头；调用方当前都丢弃返回值）
 */
async function show_chara_info(
  cid,
  page = -1,
  rand = default_rand,
  background = 0x000000,
) {
  // :25-26 TARGET = ARG / LOCAL:1 = TARGET——被调段（LOOK_INFO 的语尾等）
  // 按 TARGET 取口上；:320-321 退出恢复。try/finally 覆盖全部出口
  const target_pool = era_flag.target;
  era_flag.target = cid;
  try {
    return await show_chara_info_body(cid, page, rand, background);
  } finally {
    era_flag.target = target_pool;
  }
}

/**
 * show_chara_info 的主体（原 @SHOW_CHARA_INFO 函数体直译）——TARGET
 * 换手在包装层（:25-26 换入 / :320-321 换出），函数体不碰 era_flag.target。
 */
async function show_chara_info_body(cid, page, rand, background) {
  for (;;) {
    const line_count = era.getLineCount(); // :19-22 L_LCOUNT = LINECOUNT
    show_info_title(cid, rand); // :28
    era.drawLine(); // :27-30 CUSTOMDRAWLINE ‥

    if (cflag(cid, 1) === STATE_SACRIFICED) {
      const restart = await sacrifice_flow(cid, background); // :33-214
      if (restart) continue; // RESTART
      return 1; // :86-87 directToHomePage = 1; RETURN 0
    }

    switch (page) {
      case -2:
        // :217-235 贡品信息
        show_talent(cid);
        era.drawLine();
        show_info_abl(cid);
        era.drawLine();
        show_info_exp(cid);
        era.drawLine();
        show_info_mark(cid);
        era.drawLine();
        show_data(cid, rand);
        await look_info(cid); // :233 CALL LOOK_INFO
        show_appearance(cid);
        era.drawLine();
        break;
      case -1:
        // :236-258 调教信息
        show_talent(cid);
        era.drawLine();
        show_info_abl(cid);
        era.drawLine();
        show_info_mark(cid);
        era.drawLine();
        await era.waitAnyKey(); // :244-247 WAIT
        show_info_exp(cid);
        show_juel(cid); // :249 CALL SHOW_JUEL
        await era.waitAnyKey(); // :247-250 WAIT
        show_talent_condition(cid);
        era.drawLine();
        if (era.get('item:37') && cid !== 0) {
          // :255-258
          era.print(
            `总计调教${era.get(`cflag:${cid}:10`) || 0}次，好感度: ${Math.trunc((era.get(`cflag:${cid}:2`) || 0) / 10)}％`,
          );
          era.drawLine();
        }
        break;
      case 0:
        // :260-271 首页
        await show_block(cid);
        era.drawLine();
        show_talent(cid);
        era.drawLine();
        show_info_abl(cid);
        era.drawLine();
        show_info_mark(cid);
        era.drawLine();
        break;
      case 1:
        // :273-288 状态页
        await show_block(cid);
        era.drawLine();
        show_info_mark(cid);
        era.drawLine();
        show_info_exp(cid);
        era.drawLine();
        if (cid !== 0 && era.get('item:37')) {
          era.print(
            `总计调教${era.get(`cflag:${cid}:10`) || 0}次，好感度: ${Math.trunc((era.get(`cflag:${cid}:2`) || 0) / 10)}％`,
          );
          era.drawLine();
        }
        break;
      case 2:
        // :290-297 外观页
        show_ring(cid);
        era.drawLine();
        show_data(cid, rand);
        await look_info(cid); // :295 CALL LOOK_INFO
        show_appearance(cid);
        era.drawLine();
        break;
      case 3:
        // :299-303 素质条件页
        show_talent_condition(cid);
        era.drawLine();
        // :302 按源序取 TALENTNAME 的 74 / 78 / 75 / 77（弄乳狂、性爱狂、
        // 尻穴狂、自慰狂——编号不是升序，1:1 保留）
        era.print(
          `※ ${era.get('talentname:74') ?? ''}、${era.get('talentname:78') ?? ''}、${era.get('talentname:75') ?? ''}、${era.get('talentname:77') ?? ''}每获得一项，其他素质的获得要求便会上升，素质获得后条件将会隐藏；`,
        );
        era.print('※ 润滑与欲情每10000积蓄一点；【威压感】需要调教致死三人');
        break;
      case 4:
        // :304-306 自我介绍页——@SHOW_PERSONAL_INFO 全库无定义，原作结构性
        // 不可达（#14 判死，文件头有完整证据链），占位保留只为 1:1 追溯
        stub_line(
          'SHOW_PERSONAL_INFO',
          '自我介绍式的角色信息',
          '#14 判死不实现',
        );
        era.drawLine();
        break;
      default:
        break;
    }

    // :310-315 不足 27 行补空行
    const used = era.getLineCount() - line_count;
    for (let count = used; count < MIN_LINES; count += 1) {
      era.println();
    }
    return 0; // :210-213
  }
}

module.exports = {
  color_judgment_wor_b,
  hex_to_dec,
  show_chara_info,
};
