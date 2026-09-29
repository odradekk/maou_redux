/**
 * @file 据点角色列表：life_list 一族的七个函数（issue #397 / N13 段 3）；
 * select_yes_no 自 #333 起在本文件（#710 把两枚选项改成按钮）。
 *
 * 消费方（这张工单只实现函数本体，接入随各自页面）：商店物品页、实验室
 * 的 42 处分页调用、婚姻、战役事件、特工事件、侵攻各页；这张工单内的
 * 能力强化与裁缝列表也在用（同一张工单接入）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 * 1. **序号世界 → 角色 ID 世界**（issue #21 通例，page-select-target.js /
 *    page-chara-info.js 同款）：不再依赖「魔王 0 ＋ 奴隶 1..N-1 连续」的
 *    角色号，一律改走
 *    `era.getAddedCharacters()`（已加入角色 ID，升序、可能有缺口）。列表
 *    窗口因此按**位置**开（第 k 个非魔王角色），显示与回传的编号是 ID
 *    本身（CONTEXT.md「角色号 / 角色 ID」）。
 *
 * 2. **行渲染＝「编号按钮格 ＋ 正文文本格」的网格行**（page-chara-info.js
 *    的 print_chara_row 同款）：编号在源侧只是拼出的定宽文字、本身不可点
 *    文字（实机只能靠玩家敲号）；ere 侧把编号放进网格的
 *    按钮单元格（accelerator = 角色 ID，正文用 `showAcc: false` 渲染成
 *    `[编号]`——引擎的按钮渲染公式对 showAcc 为假的一支正是 `[content]`，
 *    见 test/helpers/era-fixture.js 的 make_button_entry），正文放文本
 *    单元格。**编号不写进正文**：showAcc 为真时引擎会拼出
 *    `[快捷键] 正文`，手写会得到 `[1] [1] 玛奥`（PR #30 实机踩过）。
 *    定宽列（`,N,LEFT/RIGHT%` 式）改用网格列宽 ＋ 文本单元格内的显示宽度
 *    填充（文本格不做空白折叠，引擎只折叠按钮正文——app.asar 的
 *    getButtonObject 与 getTextObject 两支）。
 *
 * 3. **`CFLAG:COUNT:*` 退化为实参**：life_list_item 在「お気に入り」与
 *    妊娠段写的是 `CFLAG:COUNT:…`——COUNT 是调用方 FOR
 *    循环的变量（本函数自己不起循环）。三个调用点都在 `FOR COUNT, …`
 *    循环体内以 `(COUNT)` 为实参调用，故 COUNT 与 ARG 恒同值；本移植按
 *    等价语义统一取实参 arg。
 *
 * 4. **恒不可达的分支按 #391 先例精简，逐条注明**：
 *    - `MAX_ATK_LEN`/`MAX_DEF_LEN`（CFLAG:13/:14）算了但没有任何
 *      消费者（两条取名行都没用），纯死计算，不移植；
 *    - `MODE == 0 && MASTER` 一支恒假（MASTER 是恒 0 的常量，
 *      上一支 `MODE == 0 && !MASTER` 已把 `MODE == 0` 全吃掉），其
 *      `LOCALS:2 = %SAVESTR:MASTER%(可强化地下城)` 一并不可达；表头按
 *      「MODE 0 / MODE 2 / 其余」三档保留；
 *    - 妊娠段的三支里，「乳内妊娠」（341）与「精巣妊娠」（342）恒
 *      不可达——首支的条件已含 `TALENT:341 != 0 || TALENT:342 != 0`；
 *      life_list_item_e 尾部还有两支 `TALENT:343`，第二支
 *      （口内妊娠）与前一支条件逐字相同、恒不可达，第一支（肛内妊娠）
 *      可达（343 单独成立时），保留；两处「乳内/精巣」一并精简。
 *
 * 4b. **条件收在一处**：列表过滤与页数计算各写一份同样的条件
 *     （两两逐字相同），本移植收成 `is_enemy` /
 *     `is_salave` 两个函数由四处共用——与 page-intercept.js 的
 *     `reject_reason` 同一处置（条件只有一处真相，页数与列表不会分家）。
 *
 * 5. **补行（页高固定）只在本函数内做**：life_list 由本函数补空行
 *    （不足一页补满）；life_list_enemy / life_list_salave
 *    不补（补行在其调用方，如强化页的
 *    `REPEAT (NUM_PAGE - L_LCOUNT)`），故这两支也不补——页高契约由各自
 *    调用方维持，这两支保持不补。
 *
 * 6. **局部的对齐参数逐字保留**：`MAX_NAME_LEN + 8` 的名字字段宽、职业的
 *    8、等级右对齐的 `MAX_LV_LEN`（列表）/4（单项）、装备品段的 3 与 20，
 *    都是移植来的字面量，按显示宽度（全角 2、半角 1）填充。
 *
 * 7. **life_list_enemy / life_list_salave 的翻页缺陷按显见意图修正**
 *    （与 #395 对同族函数的处理同一标准，依据见
 *    page-select-target.js 文件头那份实证）：这两支从入参 LIST_POS 起
 *    扫、用 T_LCOUNT 判窗，而 T_LCOUNT 只在渲染分支内自增、LIST_POS 又是
 *    **按值传入**的局部量（真实转发需要 `#DIM REF`，两者都没有），于是
 *    「翻页后窗口起点永远算出第 1 页的同一批人」——第 2 页起每页内容与
 *    第 1 页相同，第 NUM_PAGE 名之后的角色在任何页都看不到（max_page
 *    却按总数算，玩家点得动下一页却看到同一批人）。
 *    本移植按命中序号开窗（第 k 个命中项落在第 ⌊(k-1)/NUM_PAGE⌋ 页），
 *    翻页真正翻页；**第三个参数 LIST_POS 随之不再是本函数的输入**，
 *    签名去掉它（接入时按新签名调用即可）。
 *
 * 8. **编号按钮的快捷键 = 角色 ID**（第 1 条），与调用方同屏的固定编号
 *    （[997]-[999] 等翻页/返回键）共存——后代 ID 因此必须落在固定编号之上
 *    （chara-pregnancy.js 的 FIRST_CHILD_ID = 100000，issue #560 的决定；
 *    静态检查见 test/child-id-collision.test.js）。
 */

'use strict';

const era = require('#/era-electron');
const { get_look_info } = require('#/chara/look-info'); // #389 起的全量真身
const { print_button_grid } = require('#/utils/button-grid');
const { chara_callname } = require('#/utils/callname-utils');
const {
  NBSP,
  display_width,
  pad_display,
  pad_left,
} = require('#/utils/display-width'); // #577：对齐补位 NBSP 化（中央模块）

/** SETCOLOR 255,100,100——爱慕/淫乱标签 */
const COLOR_LOVE = '#ff6464';
/** SETCOLOR 100,100,100——未沦陷标签 */
const COLOR_COLD = '#646464';
/** SETCOLOR 100,255,100——妊娠标签 */
const COLOR_PREGNANT = '#64ff64';
/** SETCOLOR 100,200,100——派遣标签 */
const COLOR_DISPATCH = '#64c864';

/** 已加入角色里除魔王（0 号）以外的 ID（升序）——`FOR COUNT, 1, CHARANUM` 的改写 */
function slave_ids() {
  return era.getAddedCharacters().filter((cid) => cid !== 0);
}

/** CFLAG 读数的缺省处理（未声明下标 undefined → 0，#13） */
function cflag(cid, idx) {
  return era.get(`cflag:${cid}:${idx}`) || 0;
}

/** TALENT 读数的缺省处理 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * 一行列表：编号按钮格 ＋ 正文文本格（见文件头第 2 条）。
 * @param {number} cid 角色 ID（按钮的 accelerator）
 * @param {Array<{content: string, color?: string}>} fragments 正文片段
 * @param {number} num_width 编号格的列宽（编号字段宽，含方括号）
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
 * 空位补行：life_list 的页高固定，不足一整页时补空行。
 * @param {number} filled 已画行数
 * @param {number} num_page 每页行数
 */
function pad_blank_rows(filled, num_page) {
  for (let row = filled; row < num_page; row += 1) {
    era.print('');
  }
}

/**
 * 沦陷标签：爱慕 → 淫乱 → 未沦陷三档。
 * @param {number} cid
 * @returns {{content: string, color: string}}
 */
function love_fragment(cid) {
  // `PRINT <爱  慕>`：两个空格把标签补到 `<未沦陷>` 的 8 列，后面的
  // [☆] 一族才与未沦陷行同列——列对齐补位，#577 起用 NBSP
  if (talent(cid, 85) !== 0)
    return { content: '<爱\u00A0\u00A0慕>', color: COLOR_LOVE };
  if (talent(cid, 76) !== 0)
    return { content: '<淫\u00A0\u00A0乱>', color: COLOR_LOVE };
  return { content: '<未沦陷>', color: COLOR_COLD };
}

/**
 * 妊娠标签：153/341/342 任一 → [妊娠]；
 * life_list_item_e 另有 343 → [肛内妊娠]（见文件头第 4 条：乳内/精巣/
 * 口内三支恒不可达，已精简）。
 * @param {number} cid
 * @param {boolean} anal 是否带 life_list_item_e 的 343 支
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
 * 行尾标签串（life_list 与 life_list_item 共用的同一条链）。
 *
 * 顺序：沦陷 →（E 版的性别插在这里）→ ☆ → 可被卖 → 可作为助手 →
 * 虫寄生 → 妊娠 → 派遣。每条条件的阈值与素质编号按表保留。
 *
 * @param {number} cid
 * @param {object} [options]
 * @param {boolean} [options.favorite_pad] 无 ☆ 时打 5 空格占位（两个
 *   前两个列表有、life_list_item_e 无）
 * @param {boolean} [options.favorite_space] 有 ☆ 时前置一个空格（前两个列表
 * 有、life_list_item_e 无）
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
  // お気に入り（CFLAG:700）
  if (cflag(cid, 700) !== 0) {
    fragments.push({ content: favorite_space ? ' [☆]' : '[☆]' });
  } else if (favorite_pad) {
    fragments.push({ content: NBSP.repeat(5) });
  }
  // 可被卖（CFLAG:1 == 0 且 CFLAG:0 > 0 且 非魔王 且 活着）
  if (
    cflag(cid, 1) === 0 &&
    cflag(cid, 0) > 0 &&
    cid !== 0 &&
    (era.get(`base:${cid}:0`) || 0) > 0
  ) {
    fragments.push({ content: '[可被卖]' });
  }
  // 可作为助手（CFLAG:0 == 2）
  if (
    cflag(cid, 1) === 0 &&
    cflag(cid, 0) === 2 &&
    cid !== 0 &&
    (era.get(`base:${cid}:0`) || 0) > 0
  ) {
    fragments.push({ content: '[可作为助手]' });
  }
  // 虫寄生（190-193 任一）
  if ([190, 191, 192, 193].some((idx) => talent(cid, idx) !== 0)) {
    fragments.push({ content: '[虫寄生]' });
  }
  const pregnant = pregnancy_fragment(cid, anal_pregnancy);
  if (pregnant) {
    fragments.push(pregnant);
  }
  // 派遣（CFLAG:1 == 12）
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
  // 职业名取自 get_job_name（#395 实现在
  // page/page-select-target.js）。**这里用延迟 require**：顶层 require 会
  // 引出 page-life-list → page-select-target → dungeon/monster-play →
  // dungeon/monster-data → page-life-list 的加载环，环上的
  // dungeon/monster-data.js 与 dungeon-lovers.js 都是解构式取
  // select_yes_no，环一成形就在加载期拿到 undefined（这张工单实测：Node 会
  // 打 40 条 circular dependency 警告，两处调用点在运行时 TypeError）。
  // 延迟到调用期取，模块已加载完毕，环不存在（dungeon-battle.js 同款
  // 先例——那里是为 dungeon ↔ dungeon-battle 的环）。
  const { get_job_name } = require('#/page/page-select-target');
  return (
    `${pad_display(chara_callname(cid), name_width)} ` +
    `${pad_display(get_job_name(cid), 8)} ` +
    `LV${pad_left(String(cflag(cid, 9)), lv_width)}`
  );
}

/**
 * life_list：据点角色一览（全量、分页）。
 *
 * 表头三档：MODE 0 = 「你（可强化地下城）」字面量；MODE 2 = 不画
 * 表头；其余（缺省 1）= 魔王名。列表按位置开窗，空位补空行。
 *
 * @param {number} [no_page] 页码（0 起）
 * @param {number} [mode] 表头档（0/1/2，见上）
 * @param {number} [num_page] 每页行数
 */
function life_list(no_page = 0, mode = 1, num_page = 20) {
  // 编号字段宽 = 本页最大序号 (NO_PAGE+1)*NUM_PAGE 的位数
  const max_num_len = String((no_page + 1) * num_page).length;
  // 名字与等级的字段宽（MAX_ATK_LEN/MAX_DEF_LEN 是死计算，见文件头）
  let max_name_len = 0;
  let max_lv_len = 0;
  for (const cid of era.getAddedCharacters()) {
    max_name_len = Math.max(max_name_len, display_width(chara_callname(cid)));
    max_lv_len = Math.max(max_lv_len, String(cflag(cid, 9)).length);
  }
  const num_width = max_num_len + 2; // 的 %LOCALS, MAX_NUM_LEN+2, RIGHT%
  const name_width = max_name_len + 8;
  const lv_width = max_lv_len;

  // 表头
  if (mode === 0) {
    // %"你（可强化地下城）", MAX_NAME_LEN + 8,LEFT% ＋ LV（紧贴，无间距）
    print_row(
      0,
      [
        {
          content: `${pad_display('你（可强化地下城）', name_width)}LV${pad_left(String(cflag(0, 9)), lv_width)}`,
        },
      ],
      num_width,
    );
  } else if (mode === 2) {
    // MODE 2：分支体为空，只画列表
  } else {
    // %SAVESTR:MASTER, MAX_NAME_LEN + 8,LEFT% %"",8,LEFT% LV{…}
    print_row(
      0,
      [
        {
          content:
            `${pad_display(chara_callname(0), name_width)}` +
            `${NBSP.repeat(8)} LV${pad_left(String(cflag(0, 9)), lv_width)}`,
        },
      ],
      num_width,
    );
  }

  // 列表：窗口按位置开（文件头第 1 条），逐行渲染 + 空位补行
  const window_ids = slave_ids().slice(
    no_page * num_page,
    (no_page + 1) * num_page,
  );
  for (const cid of window_ids) {
    // 行首编号（按钮格）＋ 名/职业/等级 ＋ 行尾标签
    print_row(
      cid,
      [
        { content: base_field_text(cid, name_width, lv_width) },
        ...tail_fragments(cid),
      ],
      num_width,
    );
  }
  // COUNT >= CHARANUM → PRINTL（页高固定）
  pad_blank_rows(window_ids.length, num_page);
}

/**
 * life_list_item：单条角色列表项（简版，无调教回数与种族）。
 *
 * 字段宽是字面量（`{ARG,2}` / `,12,LEFT%` / `,8,LEFT%` / `,4,RIGHT%`），
 * 与 life_list 的动态宽不同。
 *
 * @param {number} arg 角色 ID
 */
function life_list_item(arg) {
  print_row(
    arg,
    [{ content: base_field_text(arg, 12, 4) }, ...tail_fragments(arg)],
    // [{ARG,2}]：编号字段宽 2 ＋ 方括号
    4,
  );
}

/**
 * life_list_item_e：单条角色列表项（详版）。
 *
 * 比简版多三段：调教回数（CFLAG:10，宽 3）、种族-性格（GET_LOOK_INFO 的
 * 两 kind，宽 20）、性别（TALENT:122/121 三态，插在沦陷标签之后）。
 *
 * @param {number} arg 角色 ID
 */
function life_list_item_e(arg) {
  // 性别表示：TALENT:122 → 男；!122 && 121 → 扶她；!122 → 女
  // PRINT 的空格是字面量：男/女 前各两格（与「扶她」两字等宽，
  // 保证后面的标签列对齐）
  const gender = talent(arg, 122)
    ? { content: '\u00A0\u00A0<男>' }
    : talent(arg, 121)
      ? { content: '<扶她>' }
      : { content: '\u00A0\u00A0<女>' };
  // 种族・性格（get_look_info，真身在 ere/chara/look-info.js；
  // #389 实现前它是 kojo-dungeon-bitch-log.js 里的子集，那份已随 #389 并入）
  const look = `[${get_look_info(arg, '种族')} - ${get_look_info(arg, '性格')}]`;
  print_row(
    arg,
    [
      {
        content:
          `${base_field_text(arg, 12, 4)}` +
          `\u00A0\u00A0调教回数:${pad_display(String(cflag(arg, 10)), 3)}` +
          ` ${pad_display(look, 20)}`,
      },
      ...tail_fragments(arg, {
        favorite_pad: false,
        favorite_space: false, // 的 PRINT [☆] 无前导空格
        anal_pregnancy: true,
        gender,
      }),
    ],
    4,
  );
}

/**
 * 侵攻中（可作勇者列出的）判定：CFLAG:1 == 2 且非魔王且活着。
 * 列表与页数两处共用一处条件。
 * @param {number} cid
 * @returns {boolean}
 */
function is_enemy(cid) {
  return (
    cflag(cid, 1) === 2 && // 侵攻中
    cid !== 0 && // 魔王不算勇者
    (era.get(`base:${cid}:0`) || 0) > 0 // 濒死不列
  );
}

/**
 * 可作奴隶出售的判定：CFLAG:1 六种状态之一且非魔王且活着。
 * 列表与页数两处共用。
 * @param {number} cid
 * @returns {boolean}
 */
function is_salave(cid) {
  return (
    [0, 3, 5, 6, 7, 10].includes(cflag(cid, 1)) && // 六种状态
    cid !== 0 && // 魔王排除
    (era.get(`base:${cid}:0`) || 0) > 0 // 濒死不列
  );
}

/**
 * life_list_enemy：侵攻中（CFLAG:1 == 2）角色的分页列表。
 *
 * 条件三段（CFLAG:1 == 2 / 非魔王 / BASE:0 > 0），开窗按命中序号
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
    life_list_item_e(cid); // 逐角色一支（COUNT 循环体）
  }
}

/**
 * max_page_enemy：侵攻中角色的总页数（空表为 0）。
 * @param {number} num_page 每页行数
 * @returns {number}
 */
function max_page_enemy(num_page) {
  let local = 0;
  for (const cid of era.getAddedCharacters()) {
    if (is_enemy(cid)) {
      local += 1;
    }
  }
  // 向上取整（截断除法，除不尽补一页）
  if (local % num_page > 0) {
    return Math.trunc(local / num_page) + 1;
  }
  return Math.trunc(local / num_page);
}

/**
 * life_list_salave：可作为奴隶出售角色的分页列表。
 *
 * 与 life_list_enemy 同构，条件换 CFLAG:1 的六种状态（0/3/5/6/7/10），
 * 魔王也被排除（魔王 CFLAG:1 恒 0）。
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
    life_list_item_e(cid); // 逐角色一支（COUNT 循环体）
  }
}

/**
 * max_page_salave：可出售角色的总页数（条件同 salave 列表）。
 * @param {number} num_page 每页行数
 * @returns {number}
 */
function max_page_salave(num_page) {
  let local = 0;
  for (const cid of era.getAddedCharacters()) {
    if (is_salave(cid)) {
      local += 1;
    }
  }
  if (local % num_page > 0) {
    return Math.trunc(local / num_page) + 1;
  }
  return Math.trunc(local / num_page);
}

/**
 * select_yes_no（issue #333 起在本文件）：完全的「是的/不要」
 * 二选一，只接受 0/1，其余输入重问（输入循环重问）。
 *
 * #710：两枚选项排成一行按钮（原是一行纯文本，玩家点不了）。按钮化后本轮
 * 白名单即 0/1，越界输入由引擎当场拒收，重问分支因此结构性不可达（结构保留）。
 * 调用点（monster-data / chara-temptation / dungeon-lovers）调用前都只打印
 * 文本或已消费掉上一轮按钮，没有未消费的按钮同屏。
 *
 * @returns {Promise<number>} 0 或 1
 */
async function select_yes_no() {
  for (;;) {
    print_button_grid(
      [
        [0, '是的'],
        [1, '不要'],
      ],
      2,
    );
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
  print_row,
  select_yes_no,
};
