/**
 * @file 秘密实验室的页面层（issue #398 / N14 段 3）。**页面只做显示与
 * 输入**（#888）：值多少钱、谁不能改、改成什么，全在
 * `system/labo/labo-calc.js` 与 `system/labo/labo-entries.js`。
 *
 * 调用点（这张工单接入）：page/page-shop.js 的 usershop [110] 分支（检查
 * TALENT:0:325 == 1，即 `CALL SECRET_LABO` 的调用位）。
 * 本文件是**单入口的树**：除 secret_labo 外其余函数只被本文件内部调用。
 *
 * 分层（#888 从三处拆开）：
 *
 * 1. **数值与写档在 system/labo/。** 每个改造条目的价格、选人检查、成交
 *    写入在 `labo-entries.js` 的表里；苏生、召唤、强化、转生、感觉封锁、
 *    记忆消去这些带分支的流程，判定与写入在 `labo-calc.js` 里，提示文案
 *    一律经返回值交回本文件打印。**本文件不写任何存档变量**，读只用于
 *    「这一屏画哪些行、说哪一句」。
 * 2. **选人骨架收成一处**（`pick_slave`）：本文件 40 余个条目各写一遍同一段
 *    `$INPUT_LOOP`（画提示 → LIFE_LIST → 三个页脚键 → INPUT → 999/1000/1001/
 *    越界/濒死五道公共检查 → 各自的追加检查）。判断条件只有一处真相，页数与
 *    列表不会分家（page-life-list.js 文件头第 4b 条同款处置）。各条目的追加
 *    检查走 `guard` 钩子，仍逐条保留原文案与提前返回语义。
 * 3. **固定选项按钮化；数值输入用 `rule`，文字输入才留自由输入**（#872）：
 *    `PRINTL [n] - …` 之类的固定选项在 ere 侧是 `era.printButton(…, n)`
 *    （PR #53 通则，page-tailor.js 先例；**正文里的 `- ` 照写**，它是显示正文
 *    的一部分，见 page-ability-up.js:184）。输入按取值形态分三种：
 *    - 编号选择（SUMMON_SLAVE 的收录编号 150-199）改成候选按钮，编号不再手输；
 *    - 数值（ST_UP_LABO 的强化次数 1-D）那一轮没有按钮，用 `rule` 把非数字
 *      挡在输入框里（`COUNT_RULE`，见 utils/input-rule.js）；上界 D 取自资金
 *      与成长点这类活数据，越界仍由本文件判定；
 *    - 自由文字（TATOO 的刺青、SET_FREE_TRAIN 的调教内容）是玩家自己写字符串，
 *      规则给不出约束，照旧自由输入——那一轮没有打印按钮，默认就是自由输入，
 *      不需要再传 `useRule: false`。
 *    随之而来的结构性不可达：按钮化之后「输入不在按钮集里」的缺省分支
 *    （各 `ELSE GOTO INPUT_LOOP` / `ELSE RETURN 0`）在实机上不可达，结构保留
 *    不补用例（page-ability-up.js 文件头同款）；本文件里因 #872 改成 rule 或
 *    候选按钮而**变得**不可达的那几支（SUMMON_SLAVE 的范围/存在性/重复三道
 *    校验、ST_UP_LABO 的非数字归一）随改动一起删除。
 *    **两处自由文字输入（刺青、自由局部调教）的 0 ＝ 空输入**
 *    （#567）：旧引擎靠「留空」表达消去/重置，ere 侧经共享判断条件
 *    `#/utils/input-text` 把引擎归一后的 0 还原成空串（引擎把 `''` 与 `"0"`
 *    都归一成 0，条件与依据见该模块文件头），两处提示后各补一句输入 0 的说明。
 * 4. **段落跳转（GOTO）用循环标签复刻**，`CLEARLINE`（局部重绘）不镜像
 *    （ere 是滚动视图，page-ability-up.js / page-tailor.js 同款），`PRINTW`
 *    按既有约定显式组合 `era.print + era.waitAnyKey`，
 *    `WAIT` 用 `era.waitAnyKey()`。
 * 5. **`[SKIPSTART]`…`[SKIPEND]` 两段死代码不移植**：「旧ソース」段与追加
 *    素质段按 `SKIPSTART` 语义被跳过，本移植不收。
 * 6. **序号世界 → 角色 ID 世界**（issue #21 通例）：「角色号」在 ere 侧
 *    是「角色 ID」，分页窗按位置开（page-life-list.js 文件头第 1 条），
 *    越界判断 `RESULT >= CHARANUM` 相应改为「不在 getAddedCharacters() 里」，
 *    翻页上界仍按 `(NO_PAGE+1)*NUM_PAGE <= charanum()`（角色数含魔王，
 *    与 CHARANUM 是同一个判定标准）。
 */

'use strict';
/* eslint-disable no-irregular-whitespace -- 正文里的全角空格（`　[…]`、`　　此项改造…`、`%SAVESTR:RESULT%　…`，原文标点保留） */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { weapon_restore } = require('#/system/equip/weapon-restore');
const { char_create } = require('#/system/chara/chara-custom');
const {
  abl,
  apply_amnesia_reset,
  apply_block_feeling,
  apply_bustdown,
  apply_bustup,
  apply_chastity_key,
  apply_free_train,
  apply_futanari,
  apply_given_life,
  apply_hair_color,
  apply_penis_remodel,
  apply_rebirth,
  apply_revive,
  apply_skin_color,
  apply_st_up,
  apply_summon,
  apply_tattoo,
  apply_washing,
  amnesia_state,
  base,
  block_feeling_rows,
  bustdown_guard,
  bustup_guard,
  buy_tentacles,
  can_revive,
  cflag,
  charanum,
  chastity_key_guard,
  cstr,
  csv_name,
  demon_conditions,
  demon_header,
  demon_options,
  demon_type_of,
  exp_of,
  FUTANARI_SHAPES,
  given_life_guard,
  given_life_notes,
  hair_color_name,
  hair_color_preview,
  item_price,
  itemname,
  mark_amnesia_broken,
  pay,
  penis_remodel_guard,
  penis_remodel_intro,
  PID_ABL,
  PID_TALENT,
  regenerated_bust,
  reset_medal,
  savestr,
  settings_bitmap,
  SKIN_NAMES,
  skin_color_name,
  specialtalent_swap,
  spend_medals,
  st_up_allowance,
  st_up_caps,
  ST_UP_NAMES,
  revive_candidates,
  summon_candidates,
  talent,
  talentname,
  TATOO_NAME,
  washing_guard,
  with_self_kojo,
} = require('#/system/labo/labo-calc');
const {
  LABO_ITEMS,
  ST_UP_MENU,
  WASHING_MENU,
} = require('#/system/labo/labo-entries');
const {
  child_care_change_nurse,
  MAX_CHARANUM,
} = require('#/system/chara/chara-pregnancy');
const { self_kojo } = require('#/kojo/kojo-system');
const { game } = require('#/facade/game');
const { chara_nickname } = require('#/utils/callname-utils');
const { COUNT_RULE } = require('#/utils/input-rule');
const { input_text } = require('#/utils/input-text');
const { MASTER } = require('#/utils/master');
const { print_button_grid } = require('#/utils/button-grid');
const { default_rand } = require('#/utils/numeric');
const { life_list } = require('#/page/page-life-list');
const { change_screen } = require('#/page/components/screen-change');

/** 选人列表的每页行数（45 处 `#DIM NUM_PAGE = 23`） */
const NUM_PAGE = 23;

// ————————————————————————————————————————————————
// 画面骨架：提示、选人、确认、条目驱动
// ————————————————————————————————————————————————

/**
 * `PRINTW` 的等价物：print 一行 + 等键（page-tailor.js:138 的 print_wait 同款）。
 * @param {string} text 提示正文
 */
async function print_wait(text) {
  era.print(text); // PRINTW
  await era.waitAnyKey();
}

/**
 * 「改造前先付费」的公共流程：`MONEY < C` → PRINTW + RETURN 0。
 * @param {number} price 价格
 * @param {string} poor 钱不够的提示
 * @returns {Promise<boolean>} 钱够不够
 */
async function require_money(price, poor) {
  if (era_flag.money < price) {
    await print_wait(poor); // PRINTW
    return false;
  }
  return true;
}

/**
 * 选人画面的一帧（`$INPUT_LOOP` 段的绘制半）。
 *
 * `CUSTOMDRAWLINE =` 以 solid 分割线近似（page-shop-trap.js 文件头的布局
 * 映射先例）；三个页脚键的正文是 `- 上一页 / - 返  回 / - 下一页`。
 *
 * @param {string[]} intro 提示行
 * @param {number} no_page 页码
 * @param {number} mode LIFE_LIST 的 MODE（第 2 实参）
 * @param {string} cancel 取消键正文（缺省「返  回」，GIVEN_HUMAN_LIFE 用「取  消」）
 */
function draw_pick(intro, no_page, mode, cancel) {
  era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
  for (const text of intro) {
    era.print(text);
  }
  era.drawLine(); // DRAWLINE
  life_list(no_page, mode, NUM_PAGE); // CALL LIFE_LIST(NO_PAGE,,NUM_PAGE)
  // 页脚三个 PRINTLC（`[1000] - 上一页` / `[999] - 返  回` / `[1001] - 下一页`）
  // 同行排布（引擎 24 列网格）；不补空行。
  print_button_grid(
    [
      [1000, '- 上一页'],
      [999, `- ${cancel}`],
      [1001, '- 下一页'],
    ],
    3,
  );
}

/**
 * 选人循环（各 `$INPUT_LOOP` 段的公共骨架，见文件头第 2 条）。
 *
 * @param {object} cfg 配置
 * @param {string[]} cfg.intro 提示行
 * @param {number} [cfg.mode] LIFE_LIST 的 MODE
 * @param {boolean} [cfg.master] 是否接受魔王（`SIF RESULT == 0 → RESULT = MASTER`
 *   的档为真；SOULBOUND 族等 `RESULT < 1` 的档为假）
 * @param {string} [cfg.cancel] 取消键正文
 * @param {(cid: number) => (null | string | {text: string, wait: boolean})} [cfg.guard]
 *   追加检查：null 放行；字符串 = 提示后等键并 RETURN 0；对象可关掉等待
 * @returns {Promise<{cancelled: boolean, cid?: number}>}
 */
async function pick_slave(cfg) {
  let no_page = 0; // #DIM NO_PAGE = 0
  for (;;) {
    // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）——这是全部选人
    // 画面的公共骨架，一处接入覆盖所有条目
    await change_screen();
    draw_pick(cfg.intro, no_page, cfg.mode ?? 1, cfg.cancel ?? '返  回');
    const result = await era.input(); // INPUT

    if (result === 999) {
      return { cancelled: true }; // 等 RETURN 0
    }
    if (result === 1000) {
      // 上一页：NO_PAGE > 0 才退（CLEARLINE 不镜像）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页：(NO_PAGE+1)*NUM_PAGE <= CHARANUM 才进
      if ((no_page + 1) * NUM_PAGE <= charanum()) {
        no_page += 1;
      }
      continue;
    }
    if (result < 0 || !era.getAddedCharacters().includes(result)) {
      continue; // RESULT < 0 || RESULT >= CHARANUM → GOTO INPUT_LOOP
    }
    if (base(result, 0) < 1) {
      continue; // 臨死中のキャラは排除
    }
    if (cfg.master === false && result === MASTER) {
      continue; // RESULT == MASTER → GOTO INPUT_LOOP（SOULBOUND 族）
    }
    const verdict = cfg.guard ? cfg.guard(result) : null;
    if (verdict !== null && verdict !== undefined) {
      const text = typeof verdict === 'string' ? verdict : verdict.text;
      era.print(text);
      if (typeof verdict === 'string' || verdict.wait !== false) {
        await era.waitAnyKey(); // PRINTFORMW / PRINTW
      }
      return { cancelled: true }; // 各检查的 RETURN 0
    }
    return { cancelled: false, cid: result };
  }
}

/**
 * 是非确认（各 `PRINTL  [0] - 好的` / `PRINTL  [1] - 不要` + INPUT）。
 * @param {string} [yes] 肯定键正文
 * @param {string} [no] 否定键正文
 * @returns {Promise<number>} 0 或 1
 */
async function ask_yes_no(yes = '好的', no = '不要') {
  era.printButton(`- ${yes}`, 0);
  era.printButton(`- ${no}`, 1);
  return era.input();
}

/**
 * 族的公共驱动：钱的初检 → 选人 → 确认 → 应用 → 扣款。
 *
 * 对应每个表驱动条目的同一形状（以 modify_bonyu 为例）：定价 →
 * 钱不够则退出 → `$INPUT_LOOP` 选人 → 确认 → 应用 → 扣款 → `RETURN 1`。
 *
 * @param {object} item 条目（LABO_ITEMS 的一项：price/poor/intro/guard/
 *   confirm/apply 等）
 * @param {(n: number) => number} rand 随机源（透传给需要重算身体的条目）
 * @returns {Promise<number>} 1 成交 / 0 取消或检查拦下
 */
async function run_modify(item, rand) {
  if (!(await require_money(item.price, item.poor))) {
    return 0;
  }
  for (;;) {
    const picked = await pick_slave({
      intro: item.intro,
      mode: item.mode,
      master: item.master,
      cancel: item.cancel,
      guard: item.guard,
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    for (const text of item.confirm(cid)) {
      era.print(text);
    }
    const answer = await ask_yes_no();
    if (answer === 1) {
      return 0; // IF RESULT == 1 → RETURN 0
    }
    if (answer === 0) {
      // 结果文案 + 变量写入都在 system/labo 里（#888），这里只把行打出去
      for (const text of item.apply(cid, rand)) {
        era.print(text);
      }
      pay(item.price); // MONEY -= C / EX_FLAG:4444 -= C
      if (item.after) {
        item.after(cid, rand); // 应用之后的追加动作（身体重算等）
      }
      // apply 的结果文案在回主菜单屏前经按键确认（ADR-0009）——全部
      // 条目的 apply 都打印，这里必等且只等一次
      await era.waitAnyKey();
      return 1;
    }
    if (item.confirm_else === 'return') {
      return 0; // 少数条目的 `ELSE RETURN 0`
    }
    // 其余条目 `ELSE GOTO INPUT_LOOP`（按钮化之后不可达，见文件头第 3 条）
  }
}

// ————————————————————————————————————————————————
// MODIFY_* 族（表驱动的一批，见文件头第 1 条）
// ————————————————————————————————————————————————

/** modify_bustup：丰胸改造（已有巨乳/爆乳时加价到 50000）。 */
async function modify_bustup(rand = default_rand) {
  if (!(await require_money(20000, '钱不多，胸不大'))) {
    return 0; // （C = 20000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: ['改造后，改造对象的乳房将增大到一个新的层次', '要为谁丰胸？'],
      master: true,
      guard: bustup_guard,
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    let cost = 20000; // C = 20000
    if (talent(cid, 110) || talent(cid, 114)) {
      // 已是大胸：先报加价，钱不够则回选人（GOTO INPUT_LOOP，
      // 「这样还要继续么？」在 SIF 之后，钱不够时打不出来）
      era.print(`${savestr(cid)}胸部伟岸，要更上一层楼，需要50000点。`);
      cost = 50000;
      if (era_flag.money < cost) {
        // 加价提示在回选人换屏前经按键确认（ADR-0009）
        await era.waitAnyKey();
        continue;
      }
      era.print('这样还要继续么？');
    } else {
      era.print(`为${savestr(cid)}进行巨乳化改造吗？`);
    }
    const answer = await ask_yes_no();
    if (answer === 1) {
      return 0;
    }
    if (answer !== 0) {
      return 0; // 的 ELSE RETURN 0（不可达，见文件头第 3 条）
    }
    // 乳房档位递升（档位取舍见 labo-calc 的 apply_bustup）
    for (const text of apply_bustup(cid)) {
      era.print(text);
    }
    pay(cost);
    regenerated_bust(cid, rand);
    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_bustdown：平胸改造。 */
async function modify_bustdown(rand = default_rand) {
  if (!(await require_money(10000, '钱不够'))) {
    return 0; // （C = 10000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: ['改造对象的乳房将变小到一个新的层次。', '要推平谁的胸？'],
      master: true,
      guard: bustdown_guard,
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    era.print(`对${savestr(cid)}进行贫乳改造吗？`);
    const answer = await ask_yes_no();
    if (answer === 1) {
      return 0;
    }
    if (answer !== 0) {
      return 0; // 的 ELSE RETURN 0
    }
    // 乳房档位递降（档位取舍见 labo-calc 的 apply_bustdown）
    for (const text of apply_bustdown(cid)) {
      era.print(text);
    }
    pay(10000);
    regenerated_bust(cid, rand);
    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_bonyu */
async function modify_bonyu(rand = default_rand) {
  return run_modify(LABO_ITEMS.bonyu, rand);
}

/** modify_futanari：扶她化（附阳具形状菜单）。 */
async function modify_futanari() {
  if (!(await require_money(50000, '这么穷，就不要这么变态啦。'))) {
    return 0; // （C = 50000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: [
        '将改造对象的阴蒂给阳具化，',
        '在卵巢内加入精囊一样的组织。',
        '要将谁扶她化？',
      ],
      master: true,
      guard: (cid) => {
        if (talent(cid, 121) || talent(cid, 122)) {
          return `${savestr(cid)}已经有兵器了。`;
        }
        return null;
      },
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    era.print(`给${savestr(cid)}怎么样的阳具呢？？`);
    // 阳具形状选项
    for (const [index, label] of FUTANARI_SHAPES.entries()) {
      era.printButton(`- ${label}`, index);
    }
    era.printButton('- 停止', 999);
    const shape = await era.input(); // INPUT
    if (shape === 999) {
      return 0;
    }
    if (shape < 0 || shape > 4) {
      continue; // 的 ELSE GOTO INPUT_LOOP（不可达）
    }
    for (const text of apply_futanari(cid, shape)) {
      era.print(text);
    }
    pay(50000);
    // 改造播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_futanari_erase */
async function modify_futanari_erase() {
  return run_modify(LABO_ITEMS.futanari_erase);
}

/** modify_animal */
async function modify_animal() {
  return run_modify(LABO_ITEMS.animal);
}

/** modify_animal_erase */
async function modify_animal_erase() {
  return run_modify(LABO_ITEMS.animal_erase);
}

/** modify_removehair */
async function modify_removehair() {
  return run_modify(LABO_ITEMS.removehair);
}

/** modify_deimmaturity */
async function modify_deimmaturity(rand = default_rand) {
  return run_modify(LABO_ITEMS.deimmaturity, rand);
}

/** modify_amnesia：记忆消去（ABL/MARK/JUEL 全清）。 */
async function modify_amnesia() {
  if (!(await require_money(100000, '钱不够'))) {
    return 0; // （C = 100000）
  }
  const picked = await pick_slave({
    intro: [
      '维持改造对象的肉体及感觉不变，',
      '将记忆恢复到调教开始之前。',
      '要消除谁的记忆呢？',
    ],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    master: false, // RESULT == MASTER → GOTO INPUT_LOOP
  });
  if (picked.cancelled) {
    return 0;
  }
  const d = picked.cid; // D = RESULT
  era.print(`要消除${savestr(d)}的记忆吗？`);
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }

  apply_amnesia_reset(d); // 助手解除 + 全清（见 labo-calc）

  era.print(`《${savestr(d)}失去调教之后的所有记忆了》`);
  await era.waitAnyKey(); // WAIT

  const state = amnesia_state(d);
  // 妊娠していた場合
  if (state.pregnant) {
    era.print(
      '由于身体传来的异样感，让他不由自主地向下看着自己突然膨胀起来的腹部，',
    );
    era.print(`让${chara_nickname(d)}整个人呆愣失神了……`);
    await era.waitAnyKey(); // WAIT
    if (state.broken) {
      era.print(`${chara_nickname(d)}的心中有什么东西坏掉了……`);
      era.print(`${chara_nickname(d)}的精神【${talentname(9)}】了`);
      mark_amnesia_broken(d); // TALENT:D:9 = 1
      await era.waitAnyKey(); // WAIT
    }
  }
  // 育児中だった場合
  if (state.nursing) {
    era.print(`${chara_nickname(d)}猛然发现自己在抚养着婴儿……`);
    await era.waitAnyKey(); // WAIT
    if (state.willing) {
      era.print(
        `自己的乳房被陌生的婴儿含在嘴里、${chara_nickname(d)}露出了不可思议的神情、`,
      );
      era.print(
        `但似乎下定了决心、${savestr(d)}抱起婴儿，把自己的乳头托到了婴儿的嘴边。`,
      );
      era.print(`《${savestr(d)}继续照顾起了孩子》`);
      await era.waitAnyKey(); // WAIT
    } else {
      era.print(
        `自己的乳房被陌生的婴儿含在嘴里、${chara_nickname(d)}露出了惊异莫名的神情`,
      );
      // CALL CHILD_CARE_CHANGE_NURSE(C) 的实参写错——C 是价格、角色号在 D，
      // 改名时漏改了调用点，按意图传角色号
      await child_care_change_nurse(d);
    }
  }

  pay(100000);
  return 1;
}

/** modify_bonyu_erase */
async function modify_bonyu_erase(rand = default_rand) {
  return run_modify(LABO_ITEMS.bonyu_erase, rand);
}

/** modify_omorashi_erase */
async function modify_omorashi_erase() {
  return run_modify(LABO_ITEMS.omorashi_erase);
}

/** shojo_saisei */
async function shojo_saisei() {
  return run_modify(LABO_ITEMS.shojo_saisei);
}

/** shojo_seal */
async function shojo_seal() {
  return run_modify(LABO_ITEMS.shojo_seal);
}

/** shojo_seal_off */
async function shojo_seal_off() {
  return run_modify(LABO_ITEMS.shojo_seal_off);
}

// ————————————————————————————————————————————————
// 带专属输入流程的条目
// ————————————————————————————————————————————————

/**
 * tatoo_set_off：刺青的刻印/消去（部位 ＋ 自由文字两段输入）。
 *
 * 刺青位 CSTR:10-19 在 ownership 里无测量事实（cstr 表实测下标 11 个，
 * 不含 10-19），且寻址含变量段、本就是动态下标——写入在 labo-calc 里直写。
 */
async function tatoo_set_off() {
  const cost = 10000; // COST = 10000
  if (!(await require_money(cost, '钱不够'))) {
    return 0;
  }
  const picked = await pick_slave({
    intro: ['消除对象的刺青', '要消除谁的刺青？'],
    master: true,
  });
  if (picked.cancelled) {
    return 0;
  }
  const target = picked.cid; // TATOO_TARGET = RESULT

  // 部位一览
  era.print(`${savestr(target)}的刺青`);
  era.print(' '); // PRINTL（一个空格）
  for (const [index, label] of Object.entries(TATOO_NAME)) {
    // `[{TATOO_COUNT}] %TATOO_NAME:..%	 - 『%CSTR:..%』`
    era.printButton(
      `${label}	 - 『${cstr(target, Number(index))}』`,
      Number(index),
    );
  }
  era.printButton('- 停止', 999);

  let select = 0;
  for (;;) {
    const result = await era.input(); // INPUT
    if (result === 999) {
      return 0;
    }
    if (TATOO_NAME[result]) {
      era.print(`${TATOO_NAME[result]}的刺青被处理了。`);
      select = result; // TATOO_SELECT = RESULT
      break;
    }
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }

  era.print('请自由输入想雕刻的刺青，留空代表将要被消去。');
  const current = cstr(target, select);
  if (current !== '') {
    era.print(`现在雕刻的刺青是：『${current}』。`);
  } else {
    era.print('现在雕刻的刺青是：没有');
  }

  // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的等价输入）
  era.print('（输入 0 消去刺青）');
  // 刺青／自由局部调教是玩家自己写的字符串，规则给不出约束；这一轮没有打印
  // 按钮，默认（白名单为空）就是自由输入
  const results = input_text(await era.input()); // INPUTS
  if (results !== '') {
    era.print(`在${TATOO_NAME[select]}雕刻『${results}』刺青吗？`);
  } else {
    era.print(`消去${TATOO_NAME[select]}的刺青吗？`);
  }
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  era.print(apply_tattoo(target, select, results));
  pay(cost);
  // 刺青播报在回选人屏前经按键确认（ADR-0009）
  await era.waitAnyKey();
  return 1;
}

/** modify_hair_color：头发颜色改变（角色 ＋ 颜色两段菜单）。 */
async function modify_hair_color() {
  if (!(await require_money(5000, '金钱不足'))) {
    return 0; // （C = 5000）
  }
  // 的 RESTART 回到函数头（局部变量回 #DIM 默认值、TARGET 等
  // 全局不回退）——用带标签的外层循环复刻，不新开栈帧
  restart: for (;;) {
    const picked = await pick_slave({
      intro: ['想给谁改变头发颜色？'],
      master: true,
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT

    // 颜色菜单
    const colors = ['金色', '栗色', '黑色', '红色', '银色', '蓝色', '绿色'];
    let col = 0;
    for (;;) {
      era.print(`变成什么颜色？（现在：${hair_color_name(t)}）`);
      for (const [index, name] of colors.entries()) {
        era.printButton(name, index);
      }
      era.printButton('- 算了，居然没有光头……', 999);
      const result = await era.input();
      if (result === 999) {
        continue restart; // RESTART（回函数头重选角色）
      }
      if (result < 0 || result > 6) {
        continue; // LOOP !INRANGE(RESULT, 0, 6)（不可达）
      }
      col = result + 1; // COL = RESULT + 1
      break;
    }

    // 确认（临时 SWAP 取显示名再换回，见 labo-calc 的 hair_color_preview）
    for (;;) {
      const shown = hair_color_preview(t, col);
      era.print(`要将${savestr(t)}的头发变成${shown}吗？`);
      const answer = await ask_yes_no('确定', '取消');
      if (answer === 1) {
        return 0;
      }
      if (answer === 0) {
        break;
      }
      return 0; // LOOP RESULT != 0（不可达）
    }
    era.print(apply_hair_color(t, col)); // TALENT:T:头发颜色 = COL
    pay(5000);
    // 发色播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_skin_color：肤色改变（普通/白皙/褐色三档）。 */
async function modify_skin_color() {
  if (!(await require_money(5000, '没钱还想整容？！'))) {
    return 0; // （C = 5000）
  }
  // 的 RESTART 回到函数头（重选角色）——带标签的外层循环复刻
  restart: for (;;) {
    const picked = await pick_slave({
      intro: ['给谁变换肤色？'],
      master: true,
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT

    // 现在的肤色
    const current = skin_color_name(t);

    let col = 0;
    for (;;) {
      era.print(`想要变成什么肤色？（现在：${current}）`);
      for (const [index, name] of SKIN_NAMES.entries()) {
        era.printButton(name, index);
      }
      era.printButton('- 取消', 999);
      const result = await era.input();
      if (result === 999) {
        continue restart; // RESTART（回函数头重选角色）
      }
      if (result < 0 || result > 2) {
        continue; // LOOP !INRANGE(RESULT, 0, 2)（不可达）
      }
      col = result; // COL = RESULT
      break;
    }
    for (;;) {
      era.print(`将${savestr(t)}变为${SKIN_NAMES[col]}吗？`);
      const answer = await ask_yes_no('确定', '取消');
      if (answer === 1) {
        return 0;
      }
      if (answer === 0) {
        break;
      }
      return 0; // LOOP RESULT != 0（不可达）
    }
    era.print(apply_skin_color(t, col)); // 三清再置一（见 labo-calc）
    pay(5000);
    // 肤色播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/**
 * block_feeling：感觉封锁（角色 → 部位两段菜单）。
 *
 * 部位的钝感位是 TALENT:101/103/105/107 的第 2 位（`|= 2`），读改写经门面
 * （写入在 labo-calc 的 apply_block_feeling）。
 */
async function block_feeling() {
  if (!(await require_money(20000, '金钱不足'))) {
    return 0; // （C = 20000）
  }
  // 的 GOTO CHAR_TOP（重选角色）——带标签的外层循环复刻
  char_top: for (;;) {
    const picked = await pick_slave({
      intro: [
        '感觉封锁，被封锁的部位，感觉被锁定。其它性感带的感觉提升。',
        '封锁谁的感觉？',
      ],
      master: true,
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid; // CID = RESULT

    // 选部位（GOTO PART_TOP 的循环）
    for (;;) {
      era.print(`封锁${savestr(cid)}哪个部位？`);
      era.print(''); // PRINTL

      // 四个部位的按钮（已封锁 = bit2，以灰显标注）
      for (const part of block_feeling_rows(cid)) {
        if (part.blocked) {
          // 封锁后把编号换成 `-`（灰显 + 点不动）：按钮化会
          // 把编号原样留着，于是「点已封锁部位」变成可达——这里仍打文本行
          era.print(`　[-] ${part.label}　已经封锁`);
        } else {
          // 未封锁时渲染的是 `　[0] 阴茎感觉`：那个 `-` 在方括号**内**，
          // 是 `\@ FLAG_B ? - # 0 \@` 三元式的真分支（编号替身），**不是分隔符**
          // ——正文不能再写 `- `（#612 反向普查改正）
          era.printButton(part.label, part.pid);
        }
      }
      era.print(''); // PRINTL
      era.printButton('选择角色', 9); // [9] 选择角色
      era.drawLine(); // DRAWLINE
      era.printButton('- 取消', 999);

      const pid = await era.input(); // INPUT
      if (pid === 9) {
        continue char_top; // GOTO CHAR_TOP（回选人）
      }
      if (pid === 999) {
        return 0;
      }
      if (pid < 0 || pid > 3) {
        continue; // 无支（按钮外输入不可达）
      }
      if (abl(cid, PID_ABL[pid]) > 0) {
        era.print('已经超过LV1以上的部位无法封锁'); // PRINTL
        await era.waitAnyKey(); // WAIT
        continue; // GOTO PART_TOP
      }
      if ((talent(cid, PID_TALENT[pid]) & 2) !== 0) {
        era.print('已经封锁过了'); // PRINTL
        await era.waitAnyKey(); // WAIT
        continue; // GOTO PART_TOP
      }
      era.print('　　此项改造属于小白鼠专用，魔王表示一但实行就无法逆转');
      era.print('　　确定要执行？');
      era.print(''); // PRINTL
      era.printButton('　　　- 走你！', 0);
      era.printButton('　　　- 容我三思……', 1);
      const answer = await era.input(); // INPUT
      if (answer === 0) {
        const line = apply_block_feeling(cid, pid); // TALENT:CID:(PID*2+101) |= 2
        pay(20000);
        era.print(line);
        await era.waitAnyKey(); // WAIT
        era.print(''); // PRINTL
      }
      if (era_flag.money >= 20000) {
        continue; // SIF MONEY >= C → GOTO PART_TOP
      }
      return 0; // 落到函数底（隐式返回 0）
    }
  }
}

/** trans_sex */
async function trans_sex() {
  return run_modify(LABO_ITEMS.trans_sex);
}

/**
 * brain_washing：洗脑。
 *
 * 费用与附加素质由主分发传入（`C` 与 `B`）。
 * @param {number} cost 费用
 * @param {number} b 追加的素质编号
 */
async function brain_washing(cost, b) {
  if (!(await require_money(cost, '钱不够'))) {
    return 0;
  }
  const picked = await pick_slave({
    intro: ['外部改写洗脑对象的深层心理。', `给谁附加【${talentname(b)}】？`],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    master: false, // RESULT == MASTER → GOTO INPUT_LOOP
    guard: (cid) => washing_guard(cid, b),
  });
  if (picked.cancelled) {
    return 0;
  }
  const cid = picked.cid;
  era.print(`为${savestr(cid)}附加【${talentname(b)}】吗？`);
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  era.print(apply_washing(cid, b)); // TALENT:T:B = 1（参数化下标，直写）
  await era.waitAnyKey(); // WAIT
  pay(cost);
  return 1;
}

/** bougt_tentacles：购买触手生物。 */
async function bougt_tentacles() {
  if (!(await require_money(50000, '钱不够'))) {
    return 0; // （C = 50000）
  }
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    era.print(`${itemname(90)}是身体改造失败的性奴隶的悲催下场……`);
    era.print(`　购买${itemname(90)}吗？`);
    era.drawLine(); // DRAWLINE
    const answer = await ask_yes_no();
    if (answer === 0) {
      era.print(buy_tentacles()); // ITEM:90 = 1
      pay(50000);
      await era.waitAnyKey(); // WAIT
      return 1;
    }
    if (answer === 1) {
      return 0;
    }
    // GOTO INPUT_LOOP（不可达）
  }
}

/** given_human_life：赋予生命（延长寿命，消耗勋章）。 */
async function given_human_life(rand = default_rand) {
  if (exp_of(MASTER, 81) <= 0) {
    era.print('人的生命是金钱无法购买的……'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  const picked = await pick_slave({
    intro: [
      '人的生命是无法直接触摸的',
      '然而某些特殊之人',
      '可以通过转换他人生命的方式为其延长寿命',
      '为谁续命？',
    ],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    cancel: '取  消', // PRINTLC [999] - 取  消
    master: true, // 条件是 RESULT < 0（魔王 0 可被选中）
    guard: given_life_guard,
  });
  if (picked.cancelled) {
    return 0;
  }
  const t = picked.cid;
  for (const text of given_life_notes(t)) {
    era.print(text); // 非人类且无动物耳朵：只提示，不返回（继续往下走）
  }
  era.print(`为${savestr(t)}延长寿命？`);
  const answer = await ask_yes_no(
    '你一秒，我一秒，蛤蛤蛤蛤…………',
    '算了，水表还没换',
  );
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  for (const text of apply_given_life(t)) {
    era.print(text);
  }
  await era.waitAnyKey(); // WAIT
  // 口上（TFLAG:13 = 15 + CALL SELF_KOJO）
  await with_self_kojo(15, () => self_kojo(rand, undefined, true));
  era.print('《失去了【勋章】》');
  reset_medal(); // EXP:MASTER:81 = 0
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** resulection：死者苏生（消耗勋章，复活 1000-1099 号标记的亡者）。 */
async function resulection() {
  if (exp_of(MASTER, 81) <= 0) {
    era.print('人的生命可是无法购买的……'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  // 一次能持有的奴隶数上限
  if (charanum() > 30) {
    await print_wait('这个世界好像已经没有亡者容身之所了');
    return 0;
  }
  if (settings_bitmap() !== 9 && charanum() > 10) {
    // FLAG:5 != 9
    await print_wait('这个世界好像已经没有亡者容身之所了');
    return 0;
  }
  if (revive_candidates().length === 0) {
    era.print('找不到想要唤醒的人'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  // 确认
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    era.print('过去从这个世界上消失和逝去的人，');
    era.print('所有的记忆都将被忘记，');
    era.print('好似重获新生一般出现在你面前。');
    era.print('……这样的结果，是你想要的吗？');
    era.drawLine(); // DRAWLINE
    const answer = await ask_yes_no('确定', '取消');
    if (answer === 1) {
      return 0;
    }
    if (answer === 0) {
      break;
    }
    // ELSE GOTO INPUT_LOOP_00（不可达）
  }
  // 选人（按钮 100-199 = 预设 1-100）
  for (;;) {
    era.drawLine(); // DRAWLINE
    era.print('想要苏醒谁？');
    era.drawLine(); // DRAWLINE
    for (const preset of revive_candidates()) {
      // 亡者已不在场，名字只能取预设数据；ITEMNAME 100-199 是魔物名表，
      // 和亡者对不上，而且有一半编号没有声明（#740）。正文带「- 」（#612）
      era.printButton(`- ${csv_name(preset)}`, preset + 99);
    }
    era.printButton('- 取消', 999);
    const result = await era.input();
    if (result === 999) {
      return 0;
    }
    if (result < 100 || result > 199) {
      continue; // GOTO INPUT_LOOP_01
    }
    const preset = result - 99; // D = RESULT - 99
    if (!can_revive(preset)) {
      continue;
    }
    era.print(await apply_revive(preset)); // ADDCHARA + 专属初始化 + TARGET
    await era.waitAnyKey(); // WAIT
    break;
  }
  era.print('《失去了【勋章】》');
  reset_medal(); // EXP:MASTER:81 = 0
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** cure_insane：勋章门槛在 run 里单独判。 */
async function cure_insane() {
  if (exp_of(MASTER, 81) <= 30) {
    era.print('勋章，是最好的药啊魔王大人！'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  const ret = await run_modify(LABO_ITEMS.cure_insane);
  if (ret === 1) {
    era.print('《【勋章】不见了》');
    spend_medals(30); // EXP:MASTER:81 -= 30
    await era.waitAnyKey(); // WAIT
  }
  return ret;
}

/** reget_chastity_key：寻访贞操带钥匙（消耗 1 枚勋章）。 */
async function reget_chastity_key() {
  if (exp_of(MASTER, 81) <= 0) {
    era.print('穷……是世上最无可奈何的事…………'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  const picked = await pick_slave({
    intro: ['把那该死的贞操带钥匙找回来！', '要寻找谁的贞操带钥匙呢？'],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    master: true, // 条件是 RESULT < 0（0 可选中）
    guard: chastity_key_guard,
  });
  if (picked.cancelled) {
    return 0;
  }
  const t = picked.cid;
  era.print(`确认寻找${savestr(t)}的贞操带钥匙吗？`);
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  for (const text of apply_chastity_key(t)) {
    era.print(text);
  }
  reset_medal(); // EXP:MASTER:81 = 0
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** horn */
async function horn() {
  return run_modify(LABO_ITEMS.horn);
}

/** evilapp：恶魔体征改造的分发菜单。 */
async function evilapp() {
  era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
  era.print('要进行什么样的恶魔改造呢？？');
  era.drawLine(); // DRAWLINE
  era.printButton('- 恶魔的蓝色肌肤', 1);
  era.printButton('- 恶魔的翅膀', 2);
  era.printButton('- 恶魔的尾巴', 3);
  era.printButton('- 恶魔的眼睛', 4);
  era.printButton('- 返  回', 999); // PRINTLC
  // 的 PRINTL 只结束 [999] 那一行（PRINTLC 不换行，见 CONTEXT.md
  // 「输出 API 的排版与对齐」）；ere 的 printButton 自成一行（＝ PRINTLC +
  // 收尾的 PRINTL），不再补空行。
  const result = await era.input();
  if (result === 999) {
    return 0;
  }
  if (result === 1) {
    return blueskin();
  }
  if (result === 2) {
    return evilwing();
  }
  if (result === 3) {
    return eviltail();
  }
  if (result === 4) {
    return evilsight();
  }
  return 0; // 无 ELSE（按钮外输入不可达）
}

/** blueskin */
async function blueskin() {
  return run_modify(LABO_ITEMS.blueskin);
}

/** evilwing */
async function evilwing() {
  return run_modify(LABO_ITEMS.evilwing);
}

/** eviltail */
async function eviltail() {
  return run_modify(LABO_ITEMS.eviltail);
}

/** evilsight */
async function evilsight() {
  return run_modify(LABO_ITEMS.evilsight);
}

/**
 * demon_rebirth：转生的秘法（选魔族类型 → 确认 → 转生）。
 */
async function demon_rebirth(rand = default_rand) {
  if (!(await require_money(50000, '没钱还想换壳？'))) {
    return 0; // （C = 50000）
  }
  // 的 RESTART（类型菜单的 [999] 回函数头重选角色）——
  // 带标签的外层循环复刻，不新开栈帧
  restart: for (;;) {
    const picked = await pick_slave({
      intro: [
        '转生的秘法将会抽取对象的灵魂，将其投入魔族的身体',
        '抽取谁的灵魂？',
      ],
      master: true, // SIF RESULT == 0 → MASTER
      guard: (cid) => {
        if (cflag(cid, 1) === 2) {
          return `${savestr(cid)}还不在你的统治之下。`;
        }
        return null;
      },
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT

    era.drawLine(); // DRAWLINE
    era.print(demon_header(t));
    era.drawLine(); // DRAWLINE
    // 类型按钮：ere 侧一个按钮一行（PRINTCPERLINE 折行不镜像）；
    // 条件不满足/等级不够的项按 SETCOLORBYNAME GRAY 灰显，仍可点
    const cond = demon_conditions(t);
    for (const option of demon_options(t)) {
      era.printButton(option.label, option.acc);
    }
    era.drawLine(); // DRAWLINE
    era.printButton('返回', 999); // `[999] 返回`

    // 类型选择
    let type_id = 0;
    for (;;) {
      const result = await era.input(); // INPUT 999
      if (result === 999) {
        continue restart; // RESTART（回函数头重选角色）
      }
      const row = Math.trunc(result / 10); // L_T = RESULT / 10
      const id = demon_type_of(result); // L_ID = TYPEDATA:L_T:L_I
      if (id <= 0) {
        continue; // CLEARLINE 1 + GOTO INPUT_LOOP_1（不可达）
      }
      if (cond[row] === 0 || cflag(t, 9) < Math.trunc(item_price(id) / 20)) {
        // 条件不足：等级与素质提示
        era.print(
          `${savestr(t)}必须达到Lv${Math.trunc(item_price(id) / 20)}（当前Lv${cflag(t, 9)}）`,
        );
        if (cond[row] === 0) {
          era.print('且具备');
          for (let count = 1; count < 5; count += 1) {
            era.print(`[${talentname(243 + count)}]`);
          }
          if (row === 10) {
            era.print('[淫乱]');
          }
        }
        await era.waitAnyKey(); // WAIT
        continue; // GOTO INPUT_LOOP_1
      }
      if (talent(t, 322) === id) {
        era.print(`${savestr(t)}已经是${itemname(id)}了`);
        await era.waitAnyKey();
        return 0;
      }
      type_id = id; // TYPEN = L_ID
      break;
    }

    // 确认与转生
    for (;;) {
      era.print(`确定要将${savestr(t)}转生为${itemname(type_id)}吗？`);
      const answer = await ask_yes_no('确定', '取消');
      if (answer === 1) {
        return 0;
      }
      if (answer !== 0) {
        return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
      }
      for (const text of apply_rebirth(t, type_id, rand)) {
        era.print(text);
      }
      pay(50000);
      // 转生播报在回选人屏前经按键确认（ADR-0009）
      await era.waitAnyKey();
      return 1;
    }
  }
}

/** soulbound */
async function soulbound() {
  return run_modify(LABO_ITEMS.soulbound);
}

/** soulbound_erase */
async function soulbound_erase() {
  return run_modify(LABO_ITEMS.soulbound_erase);
}

/** encharmed_erase */
async function encharmed_erase() {
  return run_modify(LABO_ITEMS.encharmed_erase);
}

/**
 * st_up_labo：能力值强化（HP/气力/攻击/防御，次数手输）。
 *
 * 费用与项目由主分发传入（`C = 5000` 与 `B = 0..3`）。
 * @param {number} cost 单价
 * @param {number} b 项目（0 = HP / 1 = 气力 / 2 = 攻击 / 3 = 防御）
 */
async function st_up_labo(cost, b) {
  if (!(await require_money(cost, '钱不够'))) {
    return 0;
  }
  // 的 GOTO INPUT_LOOP（「数值太大了」后重来整段，标签在选人画面
  // 之前）——带标签的外层循环复刻
  input_loop: for (;;) {
    const picked = await pick_slave({
      intro: [
        `强化奴隶的${ST_UP_NAMES[b]}`, // （PRINT + PRINTL）
        '要强化谁呢？',
      ],
      master: true,
      guard: (cid) =>
        cflag(cid, 1) === 2 ? `${savestr(cid)}还不在你的统治之下。` : null,
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid;
    // 上限检查（每项的上限公式各不相同）
    const [current, limit, label] = st_up_caps(t, b);
    if (current >= limit) {
      era.print(label); // PRINTL
      era.print('*请提高等级*'); // PRINTW
      await era.waitAnyKey();
      return 0;
    }
    // 可强化次数（点数上限按项目不同）
    let d = Math.trunc(era_flag.money / cost); // D = MONEY/C
    const local = st_up_allowance(t, b);
    if (local < d) {
      d = local; // SIF LOCAL < D → D = LOCAL
    }
    era.print(`强化${savestr(t)}多少次呢？(1-${d})`);
    // 本屏没有按钮，非数字由 rule 挡在输入框里（NaN 不会再流进下面的乘算）；
    // 上界 d 取自资金与成长点这类活数据，越界仍按它判定（见 utils/input-rule.js）
    const times = await era.input({ rule: COUNT_RULE }); // INPUT
    if (times === 0) {
      return 0;
    }
    if (times < 1 || times > d) {
      era.print('数值太大了。'); // PRINTL
      // 提示后等键再重画（ADR-0009：换屏前的输出先经按键确认）
      await era.waitAnyKey();
      continue input_loop; // GOTO INPUT_LOOP（重来整段）
    }
    era.print(apply_st_up(t, b, times)); // 逐项强化
    await era.waitAnyKey(); // 的 PRINTW 等待
    pay(cost * times);
    // (stick增加，修正实际攻防)：A = T; CALL WEAPON_RESTORE
    weapon_restore(t);
    return 1;
  }
}

/** magicresist */
async function magicresist() {
  return run_modify(LABO_ITEMS.magicresist);
}

/** extra_preg_mark */
async function extra_preg_mark() {
  return run_modify(LABO_ITEMS.extra_preg_mark);
}

/** extra_preg_erase */
async function extra_preg_erase() {
  return run_modify(LABO_ITEMS.extra_preg_erase);
}

/** set_free_train：自由局部调教设定（自由文字输入）。 */
async function set_free_train() {
  if (!(await require_money(20000, '钱不够'))) {
    return 0; // （C = 20000）
  }
  const picked = await pick_slave({
    intro: ['设定自由局部调教内容', '要对谁设定呢？'],
    master: true,
    guard: (cid) =>
      cflag(cid, 1) === 2 ? `${savestr(cid)}还不在你的统治之下。` : null,
  });
  if (picked.cancelled) {
    return 0;
  }
  const local = picked.cid; // LOCAL = RESULT
  if (cstr(local, 7) !== '') {
    era.print(`设定新的内容的话${cstr(local, 7)}调教成果将被重置。`);
  }
  era.print(`要对${savestr(local)}进行自由局部调教设定吗？`);
  const answer = await ask_yes_no('是', '放弃');
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  era.print('请输入新的自由局部调教项目。');
  era.print('发送空白将会重置。');
  // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的等价输入）
  era.print('（输入 0 重置）');
  // 刺青／自由局部调教是玩家自己写的字符串，规则给不出约束；这一轮没有打印
  // 按钮，默认（白名单为空）就是自由输入
  const results = input_text(await era.input()); // INPUTS
  era.print(apply_free_train(local, results)); // CSTR:LOCAL:7 + 局部感觉/中毒清零
  pay(20000);
  // 设定播报在回选人屏前经按键确认（ADR-0009）
  await era.waitAnyKey();
  return 1;
}

/** trans_specialtalent：淫乱 ⇄ 爱慕互换。 */
async function trans_specialtalent() {
  if (!(await require_money(500000, '钱不够'))) {
    return 0; // （C = 500000）
  }
  // 的 GOTO INPUT_LOOP（「改变失败了」后重来）——外层循环复刻
  input_loop: for (;;) {
    const picked = await pick_slave({
      intro: [
        '把对象从淫乱改为爱慕',
        '或者爱慕改为淫乱',
        '不过必须要满足 爱慕淫乱的条件哦',
      ],
      mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
      master: false, // RESULT < 1
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT
    era.print(`要改变${savestr(t)}吗？`);
    // 两条互换支（条件与写入在 labo-calc 的 specialtalent_swap）
    const swap = specialtalent_swap(t);
    for (const text of swap.lines) {
      era.print(text);
    }
    if (!swap.ok) {
      // 提示后等键再重画选人屏（ADR-0009：换屏前的输出先经按键确认）
      await era.waitAnyKey();
      continue input_loop; // GOTO INPUT_LOOP（重来整段）
    }
    pay(500000);
    // 互换播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/**
 * summon_slave：召唤影之仆从（候选＝收录编号 150-199 里预设存在且不在场的）。
 *
 * 原先是自由输入编号 + 范围/存在性/重复三道事后校验，每次拒绝都重画整屏；
 * 编号改成候选按钮后这三道校验没有受理面（白名单只回传本轮打印过的编号），
 * 重画循环随之去掉——失败只剩「不生成」与「没有候选」两个出口。
 */
async function summon_slave() {
  if (!(await require_money(100000, '召唤资金可是很贵的'))) {
    return 0; // （C = 100000）
  }

  era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
  era.print('读取CSV来生成奴隶');
  era.print('还需要消耗30的等级和30个肉便器');
  era.drawLine(); // DRAWLINE
  if (cflag(MASTER, 9) < 30) {
    era.print('等级不足'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  if (game.invasion.肉便器数 < 30) {
    era.print('肉便器数量不足'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  era.print('条件达成。要生成奴隶吗？');
  era.print('请选择要召唤的奴隶');
  const candidates = summon_candidates();
  // 候选为空时没有可点的编号，只剩「不生成」——直接收摊，不摆一个死菜单
  if (candidates.length === 0) {
    await era.printAndWait('没有可以召唤的奴隶');
    return 0;
  }
  for (const id of candidates) era.printButton(csv_name(id), id);
  era.printButton('- 不生成', 0);
  const result = await era.input(); // INPUT
  if (result === 0) {
    return 0;
  }
  const local = result; // LOCAL = RESULT
  const new_cid = await apply_summon(local); // ADDCHARA + 专属初始化 + 代价

  era.drawLine({ isSolid: true });
  era.print(`从魔王的影子中将${savestr(new_cid)}召唤了出来！`);
  era.drawLine({ isSolid: true });

  pay(100000);
  era.print('作为代价等级和肉便器减少了30');
  era.print(`${savestr(new_cid)}的召唤并不完全`);
  era.print(
    '请找出 种族・性格・理由・成为勇者前的生活・发色・瞳色 其中一项有与之共通的奴隶做成肉便器',
  );
  await print_wait(
    `各个素质均有相符后耗费30个肉便器将${savestr(new_cid)}解放出来`,
  ); // WAIT
  return 1;
}

/** anti_aging */
async function anti_aging() {
  return run_modify(LABO_ITEMS.anti_aging);
}

/** penis_remodel：年度版新增的阴茎大小改造（形状菜单）。 */
async function penis_remodel() {
  if (!(await require_money(20000, '没钱还想让肉棒变大？噗噗杂鱼~'))) {
    return 0; // （C = 20000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: [
        '只要使用实验室传下来的秘传魔法！就可以让任何的肉棒大小进行改造！',
        '也就是说无论是变大！还是变小∽都可以的哦？',
        '所以说魔王大人…要对谁使用呢？',
      ],
      master: true,
      guard: penis_remodel_guard,
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT
    for (const text of penis_remodel_intro(t)) {
      era.print(text);
    }
    // 形状选项
    for (const [index, label] of FUTANARI_SHAPES.entries()) {
      era.printButton(`- ${label}`, index);
    }
    era.printButton('- 我再想想', 999);
    const shape = await era.input(); // INPUT
    if (shape === 999) {
      return 0;
    }
    if (shape < 0 || shape > 4) {
      continue; // 的 ELSE GOTO INPUT_LOOP（不可达）
    }
    for (const text of apply_penis_remodel(t, shape)) {
      era.print(text);
    }
    pay(20000);
    // 改造播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

// ————————————————————————————————————————————————
// 主入口与四页菜单（secret_labo + labo_page1-4）
// ————————————————————————————————————————————————

/** 第 1 页的文本行 */
function labo_page1() {
  era.print(''); // PRINTL
  era.print('□肉体改造');
  era.print(''); // PRINTL
  era.printButton('- 丰胸改造               （20000点）', 0);
  era.printButton('- 平胸改造               （10000点）', 1);
  era.printButton('- 加入母乳体质           （50000点）', 2);
  era.printButton('- 扶她化                 （50000点）', 3);
  era.printButton('- 去扶她化               （10000点）', 4);
  era.printButton('- 附上动物耳朵           （2000点）', 5);
  era.printButton('- 去除动物耳朵           （1000点）', 6);
  era.printButton('- 性成熟            　   （10000点）', 7);
  era.printButton('- 记忆消去               （100000点）', 8);
  era.printButton('- 阴部永久脱毛           （5000点）', 9);
  era.printButton('- 消去母乳体质           （10000点）', 10);
  era.printButton('- 消除漏尿癖             （10000点）', 11);
}

/** 第 2 页的文本行 */
function labo_page2() {
  era.print(''); // PRINTL
  era.print('□肉体改造');
  era.print(''); // PRINTL
  era.printButton('- 处女膜再生术           （100000点）', 12);
  era.printButton('- 施加私处封印           （10000点）', 13);
  era.printButton('- 解除私处封印           （10000点）', 14);
  era.printButton('- 刺青的刻印/消去        （10000点）', 15);
  era.printButton('- 头发颜色改变           （5000点）', 16);
  era.printButton('- 肤色改变               （5000点）', 17);
  era.printButton('- 感觉封锁               （20000点）', 18);
  era.printButton('- 异常妊娠体质           （20000点）', 19);
  era.printButton('- 消除异常妊娠体质       （35000点）', 20);
  era.printButton('- 变性                   （200000点）', 21);
  era.printButton('- 自由局部调教设定       （20000点）', 22);
  era.printButton('- 淫乱爱慕互换           （500000点）', 23);
  era.printButton('- 减龄魔药               （20000点）', 24);
  era.printButton('- 肉棒改造               （20000点）', 25);
}

/** 第 3 页的文本行 */
function labo_page3() {
  era.print('□其他');
  era.print(''); // PRINTL
  if (game.stronghold.触手生物 === 0) {
    era.printButton('- 购买触手生物           （50000点）', 50);
  }
  if (exp_of(MASTER, 81)) {
    era.printButton('- 死者苏生               （勋章交换）', 51);
    era.printButton('- 赋予生命               （勋章交换）', 52);
    era.printButton('- 安抚崩坏的心           （勋章交换）', 54);
    era.printButton('- 寻访贞操带钥匙         （勋章交换）', 55);
  }
  era.printButton('- 召唤影之仆从           （100000点）', 56);
  era.printButton('- 赋予犄角               （20000点）', 59);
  era.printButton('- 恶魔体征改造           （20000点）', 60);
  era.printButton('- 转生的秘法             （50000点）', 64);
  era.printButton('- 魂缚的诅咒             （10000点）', 65);
  era.printButton('- 魂缚的解咒             （50000点）', 66);
  era.printButton('- 狂王俘虏的消去         （50000点）', 67);
  era.printButton(
    '- 生命摇篮　             （起价500000点，按素质加价，上百万是正常的）',
    68,
  );
}

/** 第 4 页的文本行 */
function labo_page4() {
  era.print(''); // PRINTL
  era.print('□战斗');
  era.print(''); // PRINTL
  era.printButton('- HP＋10                 （5000点）', 70);
  era.printButton('- 气力＋10               （5000点）', 71);
  era.printButton('- 攻击＋1                （5000点）', 72);
  era.printButton('- 防御＋1                （5000点）', 73);
  era.printButton('- 赋予魔法耐性           （50000点）', 74);
  era.print(''); // PRINTL
  era.print('□洗脑 （助手用）');
  era.print(''); // PRINTL
  era.printButton('-【无视污垢】            （5000点）', 30);
  era.printButton('-【早泄】                （8000点）', 31);
  era.printButton('-【幼稚】                （10000点）', 32);
  era.printButton('-【抖Ｓ】                （10000点）', 33);
}

/**
 * secret_labo：秘密实验室的主循环（本文件唯一的外部调用面）。
 *
 * `$DRAW_PAGE`（绘制 + 输入）/ `$INPUT_LOOP`（输入分发）两个标签，
 * 页号 P 在 0-3 之间循环（`P += 3; P %= 4` 与 `P += 1; P %= 4`）。
 *
 * @param {(n: number) => number} rand 随机源（透传给各改造条目）
 * @returns {Promise<number>} 0（`RETURN 0`）
 */
async function secret_labo(rand = default_rand) {
  let p = 0; // P = 0
  for (;;) {
    // $DRAW_PAGE。每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    await change_screen();
    era.print('魔界的大门');
    era.print('《可以对奴隶进行肉体和精神的魔改》');
    era.drawLine(); // DRAWLINE
    era.print(
      `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
    ); // （PRINTV DAY+1 / PRINT 日 / PRINTL）
    era.print(`所持金：${era_flag.money}点`);
    era.drawLine(); // DRAWLINE
    if (p === 0) {
      labo_page1();
    } else if (p === 1) {
      labo_page2();
    } else if (p === 2) {
      labo_page3();
    } else {
      labo_page4();
    }
    era.drawLine(); // DRAWLINE
    // 三个页脚键同行（引擎 24 列网格）；PRINTLC 原来靠左对齐补位挤在一行，
    // 现在列宽由网格决定，不补空行。
    print_button_grid(
      [
        [997, '- 前一页'],
        [999, '- 返回'],
        [998, '- 后一页'],
      ],
      3,
    );

    // $INPUT_LOOP
    const result = await era.input(); // INPUT
    if (result === 0) {
      await modify_bustup(rand);
    } else if (result === 1) {
      await modify_bustdown(rand);
    } else if (result === 2) {
      await modify_bonyu(rand);
    } else if (result === 3) {
      await modify_futanari();
    } else if (result === 4) {
      await modify_futanari_erase();
    } else if (result === 5) {
      await modify_animal();
    } else if (result === 6) {
      await modify_animal_erase();
    } else if (result === 7) {
      await modify_deimmaturity(rand);
    } else if (result === 8) {
      await modify_amnesia();
    } else if (result === 9) {
      await modify_removehair();
    } else if (result === 10) {
      await modify_bonyu_erase(rand);
    } else if (result === 11) {
      await modify_omorashi_erase();
    } else if (result === 12) {
      await shojo_saisei();
    } else if (result === 13) {
      await shojo_seal();
    } else if (result === 14) {
      await shojo_seal_off();
    } else if (result === 15) {
      await tatoo_set_off();
    } else if (result === 16) {
      await modify_hair_color();
    } else if (result === 17) {
      await modify_skin_color();
    } else if (result === 18) {
      await block_feeling();
    } else if (result === 19) {
      await extra_preg_mark();
    } else if (result === 20) {
      await extra_preg_erase();
    } else if (result === 21) {
      await trans_sex();
    } else if (result === 22) {
      await set_free_train();
    } else if (result === 23) {
      await trans_specialtalent();
    } else if (result === 24) {
      await anti_aging();
    } else if (result === 25) {
      await penis_remodel(); // （年度版新增的功能）
    } else if (WASHING_MENU[result]) {
      // 洗脑四档（C/B 现置后进 brain_washing）
      const [cost, b] = WASHING_MENU[result];
      await brain_washing(cost, b);
    } else if (result === 50 && game.stronghold.触手生物 === 0) {
      await bougt_tentacles();
    } else if (result === 51 && exp_of(MASTER, 81)) {
      await resulection();
    } else if (result === 52 && exp_of(MASTER, 81)) {
      await given_human_life(rand);
    } else if (result === 54 && exp_of(MASTER, 81)) {
      await cure_insane();
    } else if (result === 55 && exp_of(MASTER, 81)) {
      await reget_chastity_key();
    } else if (result === 56) {
      await summon_slave();
    } else if (result === 59) {
      await horn();
    } else if (result === 60) {
      await evilapp();
    } else if (result === 64) {
      await demon_rebirth(rand);
    } else if (result === 65) {
      await soulbound();
    } else if (result === 66) {
      await soulbound_erase();
    } else if (result === 67) {
      await encharmed_erase();
    } else if (result === 68) {
      // 生命摇篮：勇者数量与上限的六道检查（过了才进 char_create）。
      // 六支的条件与阈值各支互不相同，有意不抽成表：抽表反而看不清
      // 「哪一支在拦」
      if (game.event.人间界征服完了 === 0 && charanum() > 60) {
        era.print('勇者数量过多');
        await era.waitAnyKey(); // PRINTW
      } else if (
        game.event.精灵领域征服完了 === 0 &&
        game.event.龙山征服完了 === 0 &&
        game.event.天界征服完了 === 0 &&
        charanum() > 65
      ) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (
        game.event.精灵领域征服完了 * game.event.龙山征服完了 === 0 &&
        game.event.龙山征服完了 * game.event.天界征服完了 === 0 &&
        game.event.天界征服完了 * game.event.精灵领域征服完了 === 0 &&
        charanum() > 70
      ) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (
        (game.event.精灵领域征服完了 === 0 ||
          game.event.龙山征服完了 === 0 ||
          game.event.天界征服完了 === 0) &&
        charanum() > 75
      ) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (game.invasion.亲卫队砦侵攻度 < 15 && charanum() > 80) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (charanum() >= MAX_CHARANUM) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else {
        await char_create(0, rand); // CALL CHAR_CREATE(0)（付费定制路径）
      }
    } else if (ST_UP_MENU[result] !== undefined) {
      // 能力值强化四档（C = 5000 与 B 现置后进 st_up_labo）
      await st_up_labo(5000, ST_UP_MENU[result]);
    } else if (result === 74) {
      await magicresist();
    } else if (result === 999) {
      return 0;
    } else if (result === 997) {
      p += 3; // 前一页
      p %= 4;
    } else if (result === 998) {
      p += 1; // 后一页
      p %= 4;
    } else {
      // ELSE CLEARLINE 1 + GOTO INPUT_LOOP（不可达，见文件头第 3 条）
    }
    // GOTO DRAW_PAGE
  }
}

module.exports = {
  secret_labo,
  labo_page1,
  labo_page2,
  labo_page3,
  labo_page4,
  pick_slave,
  run_modify,
  modify_bustup,
  modify_bustdown,
  modify_bonyu,
  modify_futanari,
  modify_futanari_erase,
  modify_animal,
  modify_animal_erase,
  modify_removehair,
  modify_deimmaturity,
  modify_amnesia,
  modify_bonyu_erase,
  modify_omorashi_erase,
  shojo_saisei,
  shojo_seal,
  shojo_seal_off,
  tatoo_set_off,
  modify_hair_color,
  modify_skin_color,
  block_feeling,
  trans_sex,
  brain_washing,
  bougt_tentacles,
  given_human_life,
  resulection,
  cure_insane,
  reget_chastity_key,
  horn,
  evilapp,
  blueskin,
  evilwing,
  eviltail,
  evilsight,
  demon_rebirth,
  soulbound,
  soulbound_erase,
  encharmed_erase,
  st_up_labo,
  magicresist,
  extra_preg_mark,
  extra_preg_erase,
  set_free_train,
  trans_specialtalent,
  summon_slave,
  anti_aging,
  penis_remodel,
};
