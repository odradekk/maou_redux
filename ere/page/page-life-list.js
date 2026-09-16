/**
 * @file 据点角色列表：@LIFE_LIST 族的七个函数（issue #397 / N13 段 3）；
 * @SELECT_YES_NO 自 #333 起已在（本文件原有内容，行为未动）。
 *
 * 源: target/ERB/SHOP/LIFE_LIST.ERB  @LIFE_LIST（:1-93）/
 *     @LIFE_LIST_ITEM（:95-141）/@LIFE_LIST_ENEMY（:144-161）/
 *     @MAX_PAGE_ENEMY（:163-176）/@LIFE_LIST_SALAVE（:178-197）/
 *     @MAX_PAGE_SALAVE（:199-212）/@LIFE_LIST_ITEM_E（:214-276）/
 *     @SELECT_YES_NO（:278-292）。
 *
 * 消费方（本票只落地，接入随各自页面）：SHOP_ITEM.ERB:512/:608、
 * SHOP_LABO ver1.0.2.ERB 的 42 处分页调用、CHARA_MARRIAGE.ERB:202、
 * CAMPAIGN_EVENT.ERB:75、AGENT_EVENT.ERB:72、INVASION.ERB:359/:502；
 * 本票内 SHOP_2.ERB 的 @ABILITY_UP 与 SHOP_TAILOR.ERB 的 @LIFE_LIST_TAILOR
 * 也在用（同一票接入）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 * 1. **序号世界 → 角色 ID 世界**（issue #21 通例，page-select-target.js /
 *    page-chara-info.js 同款）：原作 `FOR COUNT, 0, CHARANUM` 走的是
 *    「角色号」（魔王 0 ＋ 奴隶 1..CHARANUM-1 连续），ere 侧一律改走
 *    `era.getAddedCharacters()`（已加入角色 ID，升序、可能有缺口）。列表
 *    窗口因此按**位置**开（第 k 个非魔王角色），显示与回传的编号是 ID
 *    本身——与原作在连续编号下逐字等价（CONTEXT.md「角色号 / 角色 ID」）。
 *
 * 2. **行渲染＝「编号按钮格 ＋ 正文文本格」的网格行**（page-chara-info.js
 *    的 print_chara_row 同款）：原作的 `[编号]` 是 PRINTFORM 拼出的定宽
 *    文字，编号本身不可点（实机只能靠玩家敲号）；ere 侧把编号放进网格的
 *    按钮单元格（accelerator = 角色 ID，正文用 `showAcc: false` 渲染成
 *    `[编号]`——引擎的按钮渲染公式对 showAcc 为假的一支正是 `[content]`，
 *    见 test/helpers/era-fixture.js 的 make_button_entry），正文放文本
 *    单元格。**编号不写进正文**：showAcc 为真时引擎会拼出
 *    `[快捷键] 正文`，手写会得到 `[1] [1] 玛奥`（PR #30 实机踩过）。
 *    原作 `,N,LEFT/RIGHT%` 的列宽改用网格列宽 ＋ 文本单元格内的显示宽度
 *    填充复刻（文本格不做空白折叠，引擎只折叠按钮正文——app.asar 的
 *    getButtonObject 与 getTextObject 两支）。
 *
 * 3. **`CFLAG:COUNT:*` 退化为实参**：@LIFE_LIST_ITEM（:116/:128-135）在
 *    「お気に入り」与妊娠段写的是 `CFLAG:COUNT:…`——COUNT 是调用方 FOR
 *    循环的变量（本函数自己不起循环）。三个调用点（SHOP_2.ERB:337、
 *    INVASION.ERB:359/:502）都在 `FOR COUNT, …` 循环体内以 `(COUNT)` 为
 *    实参调用，故 COUNT 与 ARG 恒同值；本移植按等价语义统一取实参 arg。
 *
 * 4. **恒不可达的分支按 #391 先例精简，逐条注明**：
 *    - :16-21 的 `MAX_ATK_LEN`/`MAX_DEF_LEN`（CFLAG:13/:14）算了但没有任何
 *      消费者（两条取名行都没用），纯死计算，不移植；
 *    - :23-27 的 `MODE == 0 && MASTER` 一支恒假（MASTER 是恒 0 的常量，
 *      上一支 `MODE == 0 && !MASTER` 已把 `MODE == 0` 全吃掉），其
 *      `LOCALS:2 = %SAVESTR:MASTER%(可强化地下城)` 一并不可达；表头按
 *      「MODE 0 / MODE 2 / 其余」三档保留；
 *    - :73-80 妊娠段的三支里，「乳内妊娠」（341）与「精巣妊娠」（342）恒
 *      不可达——首支的条件已含 `TALENT:341 != 0 || TALENT:342 != 0`；
 *      @LIFE_LIST_ITEM_E（:258-268）尾部还有两支 `TALENT:343`，第二支
 *      （口内妊娠）与前一支条件逐字相同、恒不可达，第一支（肛内妊娠）
 *      可达（343 单独成立时），保留；两处「乳内/精巣」一并精简。
 *
 * 4b. **判据收在一处**：原作的列表过滤与页数计算各写一份同样的判据
 *     （:152 与 :167、:188 与 :203 逐字相同），本移植收成 `is_enemy` /
 *     `is_salave` 两个函数由四处共用——与 page-intercept.js 的
 *     `reject_reason` 同一处置（判据只有一处真相，页数与列表不会分家）。
 *
 * 5. **补行（页高固定）只在本函数内做**：@LIFE_LIST 的 `:36-38`
 *    （`COUNT >= CHARANUM → PRINTL`）由本函数补空行；@LIFE_LIST_ENEMY /
 *    @LIFE_LIST_SALAVE 原作不补（补行在其调用方，如 SHOP_2.ERB:82-90 的
 *    `REPEAT (NUM_PAGE - L_LCOUNT)`），故这两支也不补——页高契约由各自
 *    调用方维持，1:1。
 *
 * 6. **局部的对齐参数逐字保留**：`MAX_NAME_LEN + 8` 的名字字段宽、职业的
 *    8、等级右对齐的 `MAX_LV_LEN`（列表）/4（单项）、装备品段的 3 与 20，
 *    都是原作的字面量，按显示宽度（全角 2、半角 1）填充复刻。
 *
 * 7. **@LIFE_LIST_ENEMY / @LIFE_LIST_SALAVE 的翻页缺陷按显见意图修正**
 *    （与 #395 对同族函数 @SHOW_LIST_TRAINABLE 的处理同一口径，依据见
 *    page-select-target.js 文件头那份实证）：原作这两支从入参 LIST_POS 起
 *    扫、用 T_LCOUNT 判窗，而 T_LCOUNT 只在渲染分支内自增、LIST_POS 又是
 *    **按值传入**的局部量（真实转发需要 `#DIM REF`，两者都没有），于是
 *    「翻页后窗口起点永远算出第 1 页的同一批人」——第 2 页起每页内容与
 *    第 1 页相同，第 NUM_PAGE 名之后的角色在任何页都看不到（@ABILITY_UP
 *    的 MAX_PAGE 却按总数算，玩家点得动下一页却看到同一批人）。
 *    本移植按命中序号开窗（第 k 个命中项落在第 ⌊(k-1)/NUM_PAGE⌋ 页），
 *    翻页真正翻页；**原作的第三个参数 LIST_POS 随之不再是本函数的输入**，
 *    签名去掉它（调用方都是 ERB 侧——42 个 SHOP_LABO 调用点与 @ABILITY_UP
 *    ——JS 忽略多余实参，接入时按新签名即可）。
 */

'use strict';

const era = require('#/era-electron');
const { get_look_info } = require('#/chara/look-info'); // #389 起的全量真身
const { chara_callname } = require('#/utils/callname-utils');

/** SETCOLOR 255,100,100（:48/:52）——爱慕/淫乱标签 */
const COLOR_LOVE = '#ff6464';
/** SETCOLOR 100,100,100（:56）——未沦陷标签 */
const COLOR_COLD = '#646464';
/** SETCOLOR 100,255,100（:73/:127/:257）——妊娠标签 */
const COLOR_PREGNANT = '#64ff64';
/** SETCOLOR 100,200,100（:82/:136/:270）——派遣标签 */
const COLOR_DISPATCH = '#64c864';

/**
 * 显示宽度（全角 2 / 半角 1），原作 `%…,N,LEFT%` 填充判定标准。
 * 与 page-shop-trap.js / page-main-menu.js / page-info-exp.js 的同名助手
 * 同形——本仓库这块按文件各留一份（`ere/utils/` 只收跨域工具），不抽公共
 * 模块。
 */
function display_width(s) {
  return [...s].reduce(
    (width, ch) => width + (ch.charCodeAt(0) > 0xff ? 2 : 1),
    0,
  );
}

/** 左对齐补空格到指定显示宽度（`%str,width,LEFT%` 的形态） */
function pad_display_left(s, width) {
  const pad = width - display_width(s);
  return pad > 0 ? s + ' '.repeat(pad) : s;
}

/** 右对齐补空格到指定显示宽度（`%n,width,RIGHT%` 的形态） */
function pad_display_right(s, width) {
  const pad = width - display_width(s);
  return pad > 0 ? ' '.repeat(pad) + s : s;
}

/** 已加入角色里除魔王（0 号）以外的 ID（升序）——`FOR COUNT, 1, CHARANUM` 的改写 */
function slave_ids() {
  return era.getAddedCharacters().filter((cid) => cid !== 0);
}

/** CFLAG 读数兜底（未声明下标 undefined → 0，#13） */
function cflag(cid, idx) {
  return era.get(`cflag:${cid}:${idx}`) || 0;
}

/** TALENT 读数兜底 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * 一行列表：编号按钮格 ＋ 正文文本格（见文件头第 2 条）。
 * @param {number} cid 角色 ID（按钮的 accelerator）
 * @param {Array<{content: string, color?: string}>} fragments 正文片段
 * @param {number} num_width 编号格的列宽（原作编号字段宽，含方括号）
 */
function print_row(cid, fragments, num_width) {
  era.printMultiColumns([
    {
      type: 'button',
      accelerator: cid,
      content: String(cid),
      config: { showAcc: false, align: 'left', width: num_width },
    },
    {
      type: 'text',
      content: fragments,
      config: {
        align: 'left',
        // 网格 24 列，编号格之外的余量归正文（page-chara-info.js 的分列
        // 同款：列宽之和为 24）
        width: Math.max(24 - num_width, 1),
      },
    },
  ]);
}

/**
 * 空位补行（:37 的 PRINTL）：@LIFE_LIST 的页高固定，不足一整页时补空行。
 * @param {number} filled 已画行数
 * @param {number} num_page 每页行数
 */
function pad_blank_rows(filled, num_page) {
  for (let row = filled; row < num_page; row += 1) {
    era.print('');
  }
}

/**
 * 沦陷标签（:47-59 / :100-112 / :223-235）：爱慕 → 淫乱 → 未沦陷三档。
 * @param {number} cid
 * @returns {{content: string, color: string}}
 */
function love_fragment(cid) {
  if (talent(cid, 85) !== 0) return { content: '<爱  慕>', color: COLOR_LOVE };
  if (talent(cid, 76) !== 0) return { content: '<淫  乱>', color: COLOR_LOVE };
  return { content: '<未沦陷>', color: COLOR_COLD };
}

/**
 * 妊娠标签（:73-80 / :127-134 / :257-268）：153/341/342 任一 → [妊娠]；
 * @LIFE_LIST_ITEM_E 另有 343 → [肛内妊娠]（见文件头第 4 条：乳内/精巣/
 * 口内三支恒不可达，已精简）。
 * @param {number} cid
 * @param {boolean} anal 是否带 @LIFE_LIST_ITEM_E 的 343 支
 * @returns {{content: string, color: string}|null}
 */
function pregnancy_fragment(cid, anal) {
  if (
    talent(cid, 153) !== 0 ||
    talent(cid, 341) !== 0 ||
    talent(cid, 342) !== 0
  ) {
    return { content: '[妊娠]', color: COLOR_PREGNANT };
  }
  if (anal && talent(cid, 343) !== 0) {
    return { content: '[肛内妊娠]', color: COLOR_PREGNANT };
  }
  return null;
}

/**
 * 行尾标签串（@LIFE_LIST :46-85 与 @LIFE_LIST_ITEM :99-139 共用的同一条链）。
 *
 * 顺序 1:1：沦陷 →（E 版的性别插在这里）→ ☆ → 可被卖 → 可作为助手 →
 * 虫寄生 → 妊娠 → 派遣。每条判据的阈值与素质编号逐字照搬。
 *
 * @param {number} cid
 * @param {object} [options]
 * @param {boolean} [options.favorite_pad] 无 ☆ 时打 5 空格占位（:65，两个
 *   旧版列表有、@LIFE_LIST_ITEM_E 无）
 * @param {boolean} [options.favorite_space] 有 ☆ 时前置一个空格（:63/:117
 *   有、:248 的 @LIFE_LIST_ITEM_E 无）
 * @param {boolean} [options.anal_pregnancy] 带 343 的 [肛内妊娠] 支
 * @param {{content: string}|null} [options.gender] 性别片段（插在沦陷之后）
 * @returns {Array<{content: string, color?: string}>}
 */
function tail_fragments(
  cid,
  {
    favorite_pad = true,
    favorite_space = true,
    anal_pregnancy = false,
    gender = null,
  } = {},
) {
  const fragments = [love_fragment(cid)];
  if (gender) {
    fragments.push(gender);
  }
  // :62-66 / :115-120 お気に入り（CFLAG:700）
  if (cflag(cid, 700) !== 0) {
    fragments.push({ content: favorite_space ? ' [☆]' : '[☆]' }); // :63/:117/:248
  } else if (favorite_pad) {
    fragments.push({ content: ' '.repeat(5) });
  }
  // :67-68 / :121-122 可被卖（CFLAG:1 == 0 且 CFLAG:0 > 0 且 非魔王 且 活着）
  if (
    cflag(cid, 1) === 0 &&
    cflag(cid, 0) > 0 &&
    cid !== 0 &&
    (era.get(`base:${cid}:0`) || 0) > 0
  ) {
    fragments.push({ content: '[可被卖]' });
  }
  // :69-70 / :123-124 可作为助手（CFLAG:0 == 2）
  if (
    cflag(cid, 1) === 0 &&
    cflag(cid, 0) === 2 &&
    cid !== 0 &&
    (era.get(`base:${cid}:0`) || 0) > 0
  ) {
    fragments.push({ content: '[可作为助手]' });
  }
  // :71-72 / :125-126 虫寄生（190-193 任一）
  if ([190, 191, 192, 193].some((idx) => talent(cid, idx) !== 0)) {
    fragments.push({ content: '[虫寄生]' });
  }
  const pregnant = pregnancy_fragment(cid, anal_pregnancy);
  if (pregnant) {
    fragments.push(pregnant);
  }
  // :81-85 / :135-139 / :269-273 派遣（CFLAG:1 == 12）
  if (cflag(cid, 1) === 12) {
    fragments.push({ content: '[派遣]', color: COLOR_DISPATCH });
  }
  return fragments;
}

/**
 * 名称/职业/等级三字段（列表行的共同前段）：名字字段宽 name_width、职业
 * 固定宽 8、等级右对齐宽 lv_width（见文件头第 6 条）。
 * @param {number} cid
 * @param {number} name_width
 * @param {number} lv_width
 * @returns {string}
 */
function base_field_text(cid, name_width, lv_width) {
  // 职业名取自 @GET_JOB_NAME（SHOP_FUNCTION.ERB，#395 落在
  // page/page-select-target.js）。**这里用延迟 require**：顶层 require 会
  // 引出 page-life-list → page-select-target → dungeon/monster-play →
  // dungeon/monster-data → page-life-list 的加载环，环上的
  // dungeon/monster-data.js:43 与 dungeon-lovers.js:23 都是解构式取
  // select_yes_no，环一成形就在加载期拿到 undefined（本票实测：Node 会
  // 打 40 条 circular dependency 警告，两处调用点在运行时 TypeError）。
  // 延迟到调用期取，模块已加载完毕，环不存在（dungeon-battle.js:1235 同款
  // 先例——那里是为 dungeon ↔ dungeon-battle 的环）。
  const { get_job_name } = require('#/page/page-select-target');
  return (
    `${pad_display_left(chara_callname(cid), name_width)} ` +
    `${pad_display_left(get_job_name(cid), 8)} ` +
    `LV${pad_display_right(String(cflag(cid, 9)), lv_width)}`
  );
}

/**
 * @LIFE_LIST（:1-93）：据点角色一览（全量、分页）。
 *
 * 表头三档（:23-32）：MODE 0 = 「你（可强化地下城）」字面量；MODE 2 = 不画
 * 表头；其余（缺省 1）= 魔王名。列表按位置开窗，空位补空行。
 *
 * @param {number} [no_page] 页码（0 起）
 * @param {number} [mode] 表头档（0/1/2，见上）
 * @param {number} [num_page] 每页行数
 */
function life_list(no_page = 0, mode = 1, num_page = 20) {
  // :15 编号字段宽 = 本页最大序号 (NO_PAGE+1)*NUM_PAGE 的位数
  const max_num_len = String((no_page + 1) * num_page).length;
  // :16-21 名字与等级的字段宽（MAX_ATK_LEN/MAX_DEF_LEN 是死计算，见文件头）
  let max_name_len = 0;
  let max_lv_len = 0;
  for (const cid of era.getAddedCharacters()) {
    max_name_len = Math.max(max_name_len, display_width(chara_callname(cid)));
    max_lv_len = Math.max(max_lv_len, String(cflag(cid, 9)).length);
  }
  const num_width = max_num_len + 2; // :22-24 的 %LOCALS, MAX_NUM_LEN+2, RIGHT%
  const name_width = max_name_len + 8;
  const lv_width = max_lv_len;

  // :23-32 表头
  if (mode === 0) {
    // :24 %"你（可强化地下城）", MAX_NAME_LEN + 8,LEFT% ＋ LV（紧贴，无间距）
    print_row(
      0,
      [
        {
          content: `${pad_display_left('你（可强化地下城）', name_width)}LV${pad_display_right(String(cflag(0, 9)), lv_width)}`,
        },
      ],
      num_width,
    );
  } else if (mode === 2) {
    // :28-29 MODE 2：分支体为空，只画列表
  } else {
    // :31 %SAVESTR:MASTER, MAX_NAME_LEN + 8,LEFT% %"",8,LEFT% LV{…}
    print_row(
      0,
      [
        {
          content:
            `${pad_display_left(chara_callname(0), name_width)}` +
            `${' '.repeat(8)} LV${pad_display_right(String(cflag(0, 9)), lv_width)}`,
        },
      ],
      num_width,
    );
  }

  // :34-88 列表：窗口按位置开（文件头第 1 条），逐行渲染 + 空位补行
  const window_ids = slave_ids().slice(
    no_page * num_page,
    (no_page + 1) * num_page,
  );
  for (const cid of window_ids) {
    // :42-44 行首编号（按钮格）＋ 名/职业/等级 ＋ 行尾标签
    print_row(
      cid,
      [
        { content: base_field_text(cid, name_width, lv_width) },
        ...tail_fragments(cid),
      ],
      num_width,
    );
  }
  // :36-38 COUNT >= CHARANUM → PRINTL（页高固定）
  pad_blank_rows(window_ids.length, num_page);
}

/**
 * @LIFE_LIST_ITEM（:95-141）：单条角色列表项（简版，无调教回数与种族）。
 *
 * 字段宽是字面量（:97 的 `{ARG,2}` / `,12,LEFT%` / `,8,LEFT%` / `,4,RIGHT%`），
 * 与 @LIFE_LIST 的动态宽不同。
 *
 * @param {number} arg 角色 ID
 */
function life_list_item(arg) {
  print_row(
    arg,
    [{ content: base_field_text(arg, 12, 4) }, ...tail_fragments(arg)],
    // :97 [{ARG,2}]：编号字段宽 2 ＋ 方括号
    4,
  );
}

/**
 * @LIFE_LIST_ITEM_E（:214-276）：单条角色列表项（详版）。
 *
 * 比简版多三段：调教回数（CFLAG:10，宽 3）、种族-性格（GET_LOOK_INFO 的
 * 两 kind，宽 20）、性别（TALENT:122/121 三态，插在沦陷标签之后）。
 *
 * @param {number} arg 角色 ID
 */
function life_list_item_e(arg) {
  // :237-244 性别表示：TALENT:122 → 男；!122 && 121 → 扶她；!122 → 女
  // :237-244 PRINT 的空格是字面量：男/女 前各两格（与「扶她」两字等宽，
  // 保证后面的标签列对齐）
  const gender = talent(arg, 122)
    ? { content: '  <男>' }
    : talent(arg, 121)
      ? { content: '<扶她>' }
      : { content: '  <女>' };
  // :219 种族・性格（GET_LOOK_INFO 的式中函数，真身在 ere/chara/look-info.js；
  // #389 落地前它是 kojo-dungeon-bitch-log.js 里的子集，那份已随 #389 并入）
  const look = `[${get_look_info(arg, '种族')} - ${get_look_info(arg, '性格')}]`;
  print_row(
    arg,
    [
      {
        content:
          `${base_field_text(arg, 12, 4)}` +
          `  调教回数:${pad_display_left(String(cflag(arg, 10)), 3)}` +
          ` ${pad_display_left(look, 20)}`,
      },
      ...tail_fragments(arg, {
        favorite_pad: false,
        favorite_space: false, // :248 的 PRINT [☆] 无前导空格
        anal_pregnancy: true,
        gender,
      }),
    ],
    4,
  );
}

/**
 * 侵攻中（可作勇者列出的）判定：CFLAG:1 == 2 且非魔王且活着。
 * 列表（:152）与页数（:167）两处共用一处判据。
 * @param {number} cid
 * @returns {boolean}
 */
function is_enemy(cid) {
  return (
    cflag(cid, 1) === 2 && // :152 侵攻中
    cid !== 0 && // 魔王不算勇者
    (era.get(`base:${cid}:0`) || 0) > 0 // 濒死不列
  );
}

/**
 * 可作奴隶出售的判定：CFLAG:1 六种状态之一（:188/:203）且非魔王且活着。
 * 列表与页数两处共用。
 * @param {number} cid
 * @returns {boolean}
 */
function is_salave(cid) {
  return (
    [0, 3, 5, 6, 7, 10].includes(cflag(cid, 1)) && // :188 六种状态
    cid !== 0 && // :186-187 魔王排除
    (era.get(`base:${cid}:0`) || 0) > 0 // 濒死不列
  );
}

/**
 * @LIFE_LIST_ENEMY（:144-161）：侵攻中（CFLAG:1 == 2）角色的分页列表。
 *
 * 判据三段 1:1（CFLAG:1 == 2 / 非魔王 / BASE:0 > 0），开窗按命中序号
 * （翻页缺陷的修正移植，见文件头第 7 条）：第 k 个命中项落在
 * ⌊(k-1)/NUM_PAGE⌋ 页。不补空行（文件头第 5 条）。
 *
 * @param {number} [no_page] 页码
 * @param {number} [num_page] 每页行数
 */
function life_list_enemy(no_page = 0, num_page = 20) {
  const matches = era.getAddedCharacters().filter(is_enemy);
  for (const cid of matches.slice(
    no_page * num_page,
    (no_page + 1) * num_page,
  )) {
    life_list_item_e(cid); // :153 CALL LIFE_LIST_ITEM_E(COUNT)
  }
}

/**
 * @MAX_PAGE_ENEMY（:163-176）：侵攻中角色的总页数（空表为 0）。
 * @param {number} num_page 每页行数
 * @returns {number}
 */
function max_page_enemy(num_page) {
  let local = 0; // :165
  for (const cid of era.getAddedCharacters()) {
    if (is_enemy(cid)) {
      local += 1; // :168
    }
  }
  // :170-174 向上取整（整数除法，Emuera 的 / 对两整数相除截断）
  if (local % num_page > 0) {
    return Math.trunc(local / num_page) + 1;
  }
  return Math.trunc(local / num_page);
}

/**
 * @LIFE_LIST_SALAVE（:178-197）：可作为奴隶出售角色的分页列表。
 *
 * 与 @LIFE_LIST_ENEMY 同构，判据换 CFLAG:1 的六种状态（0/3/5/6/7/10），
 * 魔王（:186-187 的 SIF）在本判据里也被排除（魔王 CFLAG:1 恒 0）。
 *
 * @param {number} [no_page] 页码
 * @param {number} [num_page] 每页行数
 */
function life_list_salave(no_page = 0, num_page = 20) {
  const matches = era.getAddedCharacters().filter(is_salave);
  for (const cid of matches.slice(
    no_page * num_page,
    (no_page + 1) * num_page,
  )) {
    life_list_item_e(cid); // :189 CALL LIFE_LIST_ITEM_E(COUNT)
  }
}

/**
 * @MAX_PAGE_SALAVE（:199-212）：可出售角色的总页数（判据同 SALAVE 列表）。
 * @param {number} num_page 每页行数
 * @returns {number}
 */
function max_page_salave(num_page) {
  let local = 0; // :201
  for (const cid of era.getAddedCharacters()) {
    if (is_salave(cid)) {
      local += 1; // :204
    }
  }
  if (local % num_page > 0) {
    return Math.trunc(local / num_page) + 1;
  }
  return Math.trunc(local / num_page);
}

/**
 * @SELECT_YES_NO（:278-292，issue #333 起在本文件）：是完全的「是的/不要」
 * 二选一，只接受 0/1，其余输入重问（原作 $INPUT_LOOP 的 GOTO 语义）。
 * @returns {Promise<number>} 0 或 1
 */
async function select_yes_no() {
  for (;;) {
    era.print('  [0] 是的   [1] 不要');
    const result = await era.input();
    if (result === 0 || result === 1) return result;
  }
}

module.exports = {
  life_list,
  life_list_item,
  life_list_item_e,
  life_list_enemy,
  life_list_salave,
  max_page_enemy,
  max_page_salave,
  pad_display_left,
  pad_display_right,
  print_row,
  select_yes_no,
};
