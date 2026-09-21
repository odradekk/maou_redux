/**
 * @file 战役画面：@CAMPAIGN_MENU + @SELECT_CAMPAIGN（#469 起真身）。
 *
 * 源: target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB
 *   @CAMPAIGN_MENU（:6-127，无参）、@SELECT_CAMPAIGN（:130-152）
 *
 * 调用点：ere/page/page-invasion.js 的 post_conquest_menu [9]（#468 起接通）。
 *
 * 派发说明（#7 决议，DispatchFamily）：
 *   - @CAMPAIGN_NAME 键是 FLAG:400（当前进行中的战役号）：只有
 *     @CAMPAIGN_SET_1 存在，FLAG:400 在可达状态下只能是 0 或 1（各调用点
 *     先 `SIF FLAG:400 < 1 RETURN ...` 挡掉 0），declaredIds 声明 {1} 即可；
 *   - @CAMPAIGN_EXIST / @CAMPAIGN_SET 键是「战役槽位号」本身
 *     （SELECT_CAMPAIGN 的 `FOR LOCAL,1,21` 循环 / 玩家 INPUT 的原始输入
 *     RESULT），declaredIds 必须声明 {1..20}——若只声明 {1}，循环到
 *     2-20 会因「编号在空间外」被 DispatchFamily 当拼写错误抛出，而原作
 *     在这里是 TRYCALLFORM 静默跳过。@CAMPAIGN_SET 的键额外来自玩家
 *     自由输入（SELECT_CAMPAIGN 没有用 printButton 白名单——见下），
 *     即使声明了 {1..20} 空间，调用前仍需按范围显式挡（DispatchFamily
 *     把「空间外」当拼写错误处理，不是给自由输入兜底用的）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **SELECT_CAMPAIGN 的战役列表按钮化**（PR #53 通则，page-select-target.js
 *     / page-intercept.js 同款）：原作 `@CAMPAIGN_EXIST_1` 用 `PRINT [1] ` 的
 *     纯文本，本移植改 `era.printButton`，槽位号经 DispatchFamily 的 args
 *     传给实现（原作把编号硬编码进每个 `CAMPAIGN_EXIST_{n}` 的字面量里，
 *     ere 侧没有「拼函数名读自己编号」的等价物，只能显式传）。按钮正文
 *     不含手写 `[n]` 前缀（AGENTS.md：showAcc 会自动加，重复会显示
 *     `[1] [1] ……`）；FONTBOLD 的战役名加粗在按钮场景丢失（printButton
 *     的 content 只接受纯字符串，不支持 print 的分段 config），仅在
 *     CAMPAIGN_MENU 头部展示与 CAMPAIGN_ENDING_1 沿用 page-title.js 式的
 *     分段 config 保留加粗；
 *   - **顶层菜单与派遣列表的导航按钮化**（同一通则）：[0]/[1]/[2]/[999]
 *     与派遣子菜单的 [999]/[1000]/[1001] 均改 `era.printButton`，input
 *     因此天然被白名单约束，原作 :98-99/:112-114 的越界重问分支在 ere
 *     侧不可达（引擎只回传已打印按钮的编号），1:1 保留分支结构、不删；
 *     主菜单的两处同款守卫则**省略不写**：:38-40（`*无法在行动进行时进行
 *     变更*`，RESULT==0 而 FLAG:400!=0）要求 [0] 在战役进行中被渲染，
 *     :43-45（`*请选择行动*`）要求未渲染的编号被回传，按钮化后都不可达，
 *     且它们是 ELSEIF 链上的重问分支、没有可保留的结构；
 *   - **派遣列表沿用 page-intercept.js 的按命中序号开窗**（page-life-list.js
 *     文件头第 7 条同款修正）：`life_list_item` 逐条渲染，不用整页级的
 *     `life_list()`——原作 `CLEARLINE LINECOUNT-L_LCOUNT` 局部重绘在 ere
 *     侧无对应 API，翻页改整页重绘（@INTERCEPT 先例，视觉等效）。代价是
 *     窗口按 `getAddedCharacters()` 开（含魔王 0 号），而原作 @LIFE_LIST
 *     除表头行外只列 1..CHARANUM-1：魔王多出一行可点按钮（点选后与原作
 *     输入 0 一样被 TALENT 校验拒绝，无状态影响）、页内内容相对原作后移
 *     一位。判据（`candidate_ids.includes`）保留含 0 的集合，与原作
 *     `RESULT < 0 || RESULT >= CHARANUM` 的范围语义一致；
 *   - **赤森奴隶经 rand_chara_make() 的 campaign_slave 形参注入**
 *     （chara-make.js #469）：替代原作 :55-57 的全局变量置位/复位，
 *     招募分支显式传 `true`；
 *   - **`CHAR_MAKE.ERB:57` 的异国勇者判定经 char_make_inport 注入**（#494）：
 *     原作 `CALL RAND_CHARA_MAKE`（:55-57）无参，但 `CALL CHAR_MAKE_INPORT`
 *     在 `@RAND_CHARA_MAKE` 体内（`CHAR_MAKE.ERB:57`，位于 `CHAR_MAKE.ERB:58`
 *     的 IF 之前），开局初始奴隶与战役招募两条路径都会跑；转发层与本分支
 *     各自的 require 成环，故由调用点显式传（同款注入见 chara-make.js 的
 *     JSDoc）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { char_make_inport } = require('#/chara/char-make');
const { rand_chara_make } = require('#/chara/chara-make');
const { life_list_item } = require('#/page/page-life-list');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');

/** 战役槽位号空间：SELECT_CAMPAIGN 的 `FOR LOCAL,1,21`（1-20） */
const CAMPAIGN_SLOT_IDS = Array.from({ length: 20 }, (_, i) => i + 1);

/** @CAMPAIGN_NAME_{FLAG:400} 族：菜单头部的当前战役名展示 */
const campaign_name_family = new DispatchFamily('CAMPAIGN_NAME', [1]);
/** @CAMPAIGN_EXIST_{槽位号} 族：战役选择菜单的存在性展示（本票只建族，实现随 #469） */
const campaign_exist_family = new DispatchFamily(
  'CAMPAIGN_EXIST',
  CAMPAIGN_SLOT_IDS,
);
/** @CAMPAIGN_SET_{槽位号} 族：选中战役后的初始设置 */
const campaign_set_family = new DispatchFamily(
  'CAMPAIGN_SET',
  CAMPAIGN_SLOT_IDS,
);

/** 每页行数（原作无对应 #DIM 缺省，NUM_PAGE 由 CAMPAIGN_MENU 的 #DIM NUM_PAGE = 24 给出） */
const NUM_PAGE = 24;

/**
 * @SELECT_CAMPAIGN（:130-152）：战役选择菜单。
 * @returns {Promise<number>} RETURN 0（原作恒 0 出口）
 */
async function select_campaign() {
  era.drawLine();
  for (const slot of CAMPAIGN_SLOT_IDS) {
    // :137 TRYCALLFORM CAMPAIGN_EXIST_{LOCAL}：返回值不被消费（打印副作用，
    // 未实现的槽位静默不渲染，即 TRYCALLFORM 落空语义）
    await campaign_exist_family.call(slot, { whenMissing: 0, args: [slot] });
  }
  era.drawLine();
  era.printButton('返回', 999);

  const result = await era.input();
  if (result === 999) {
    return 0;
  }
  // :147 TRYCALLFORM CAMPAIGN_SET_{RESULT}：RESULT 来自按钮白名单，恒落在
  // 已渲染的槽位号内（1-20），但 DispatchFamily 的空间外判定是给「拼写
  // 错误」用的，不能替代这层范围保护——显式挡一次
  if (result >= 1 && result <= 20) {
    await campaign_set_family.call(result, { whenMissing: 0, args: [] });
  }
  era_flag.campaign_story_progress = 0; // :150 FLAG:401 = 0 深度重置
  return 0;
}

/**
 * 派遣子菜单一页：渲染列表 + 翻页/返回按钮。
 * @param {number} no_page 页码（0 起）
 * @param {number[]} candidate_ids 可派遣角色 ID（按命中序号排列）
 */
function render_dispatch_page(no_page, candidate_ids) {
  era.drawLine();
  era.print('选择要派往敌地的奴隶');
  era.print('要派遣谁呢？');
  era.drawLine();
  const window_ids = candidate_ids.slice(
    no_page * NUM_PAGE,
    (no_page + 1) * NUM_PAGE,
  );
  for (const cid of window_ids) {
    life_list_item(cid); // :75 CALL LIFE_LIST 的列表段（按命中序号开窗）
  }
  era.printButton('- 上一页', 1000);
  era.printButton('返  回', 999);
  era.printButton('- 下一页', 1001);
}

/**
 * 招募分支（:46-67）：奴隷選別。
 * @param {(n: number) => number} [rand] 原作 RAND:N 的随机源，透传给
 *   rand_chara_make 与 `CHAR_MAKE.ERB:57` 的异国勇者判定（缺省均匀随机，
 *   测试注入定值序）
 * @returns {Promise<void>}
 */
async function recruit_campaign_slave(rand) {
  // :48-53 前置校验
  if (chara(0).dungeon.气力 < 100) {
    era.print('*气力不足！*');
    await era.waitAnyKey();
    return;
  }
  if (era.getAddedCharacters().length > 80) {
    era.print('*奴隶数已达上限，请处决几个*');
    await era.waitAnyKey();
    return;
  }
  // :55-57 赤森奴隶=1 CALL RAND_CHARA_MAKE 赤森奴隶=0 —— campaign_slave
  // 形参注入替代原作的全局开关置位/复位（chara-make.js #469）
  //
  // 第二个实参是 `CHAR_MAKE.ERB:57` 的 `CALL CHAR_MAKE_INPORT`：它在
  // `@RAND_CHARA_MAKE` 体内、`CHAR_MAKE.ERB:58` 的 IF 之前，开局初始奴隶与
  // 战役招募**两条路径都会跑**（#494）。它的真身在转发层，而转发层与本函数
  // 各自 require 的 chara-make.js 相互成环，只能由调用点注入——`rand_n` 一路
  // 传下去，与原作共用一条 RAND 序列（enter-enemy.js 的两处调用点同款）。
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const recruited = await rand_chara_make(
    rand_n,
    () => char_make_inport(1, rand_n),
    true,
  );
  if (recruited === 0) {
    return;
  }
  // :62-67 招募成功：扣气力、点亮本战役对应的招募素质位
  era.print('消耗了100点气力……');
  chara(0).dungeon.气力 -= 100;
  const talent_slot = era_flag.hero_campaign_active + 360; // LOCAL = FLAG:400 + 360
  era.set(`talent:${recruited}:${talent_slot}`, 1);
}

/**
 * 派遣分支（:68-124）：奴隷派遣，含分页与多重校验的子循环。
 * @param {number} no_page 进入时的页码——原作 NO_PAGE 是 CAMPAIGN_MENU 顶的
 *   `#DIM NO_PAGE = 0`（:8），同一菜单会话内反复进出派遣子菜单保留页码，
 *   因此这里由调用方持有、随入参进出一趟。
 * @returns {Promise<number>} 退出（[999] 或 RESULT==999 的同义出口）时的页码
 */
async function dispatch_campaign_slave(no_page) {
  const talent_slot = era_flag.hero_campaign_active + 360; // LOCAL = FLAG:400 + 360
  for (;;) {
    const candidate_ids = era.getAddedCharacters();
    const max_page = Math.max(
      0,
      Math.ceil(candidate_ids.length / NUM_PAGE) - 1,
    );
    render_dispatch_page(no_page, candidate_ids);
    const result = await era.input();
    if (result === 999) {
      return no_page;
    }
    if (result === 1000) {
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      if (no_page < max_page) {
        no_page += 1;
      }
      continue;
    }
    // :98-114 校验链。life_list_item 的按钮 accelerator 是角色真实 ID
    // （page-life-list.js print_row，非序号），原作 :98 按 CHARANUM 做的
    // 上界比较在 ere 侧对应「是否在本页候选集内」；result 恒落在按钮白
    // 名单内，本分支因此不可达，1:1 保留结构
    if (!candidate_ids.includes(result)) {
      continue;
    }
    if (chara(result).dungeon.体力 < 1) {
      continue; // :101-102 临死中的角色排除
    }
    if ((era.get(`talent:${result}:${talent_slot}`) || 0) === 0) {
      const slot_name = era.get(`talentname:${talent_slot}`) || '';
      era.print(`无法派遣没有【${slot_name}】的奴隶`);
      await era.waitAnyKey();
      continue;
    }
    if (chara(result).stronghold.魔王之影) {
      era.print(`由于${chara_callname(result)}是魔王之影而无法派遣`);
      await era.waitAnyKey();
      continue;
    }
    if (chara(result).invasion.状态 === 12) {
      era.print(`${chara_callname(result)}已经被派遣了`);
      await era.waitAnyKey();
      continue;
    }
    if (chara(result).invasion.状态 !== 0) {
      era.print(`${chara_callname(result)}当前无法被派遣`);
      await era.waitAnyKey();
      continue;
    }
    // :116-123 派遣：状态位 + 楼层/进度四个 CFLAG 重置
    chara(result).invasion.状态 = 12;
    chara(result).dungeon.侵攻阶层 = 1;
    chara(result).invasion.回城标志 = 0;
    chara(result).dungeon.目标阶层 = 0;
    chara(result).invasion.存档点 = 1;
    era.print(`派遣了${chara_callname(result)}`);
    await era.waitAnyKey();
  }
}

/**
 * @CAMPAIGN_MENU（:6-127，无参）：战役主菜单。
 * @param {(n: number) => number} [rand] 原作 RAND:N 的随机源，透传给招募
 *   分支的 rand_chara_make（缺省均匀随机，测试注入定值序）
 * @returns {Promise<number>} RETURN 0（原作恒 0 出口，:36-37 的 [999] 直接返回；:127 末尾 GOTO 回到循环顶部）
 */
async function campaign_menu(rand) {
  // :8 #DIM NO_PAGE = 0——函数级，跨派遣子菜单的反复进出保留页码
  let dispatch_page = 0;
  for (;;) {
    era.drawLine();
    const active = era_flag.hero_campaign_active;
    if (active > 0) {
      // :16 TRYCALLFORM CAMPAIGN_NAME_{FLAG:400}：打印副作用，返回值不消费。
      // era.print 块级独占一行，「当前选择的行动」与战役名各占一行
      // （dev-guides/06-output.md，两行布局等效）
      era.print('当前选择的行动');
      await campaign_name_family.call(active, { whenMissing: 0, args: [] });
    } else {
      era.print('当前选择的行动 无');
    }
    era.drawLine();
    if (active === 0) {
      era.printButton('行动选择', 0);
    } else {
      era.printButton('奴隶选招（气力-100）', 1);
      era.printButton('派遣奴隶', 2);
    }
    era.drawLine(); // :31-32 行动按钮与 [999] 之间的第二条分隔线
    era.printButton('返回', 999);

    const result = await era.input();
    if (result === 999) {
      return 0;
    }
    if (result === 0) {
      await select_campaign();
      continue;
    }
    if (result === 1) {
      await recruit_campaign_slave(rand);
    } else if (result === 2) {
      dispatch_page = await dispatch_campaign_slave(dispatch_page);
    }
  }
}

module.exports = {
  campaign_menu,
  select_campaign,
  campaign_name_family,
  campaign_exist_family,
  campaign_set_family,
};
