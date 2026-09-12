/**
 * @file 调教目标/助手选择画面：@SELECT_TARGET 与 @SELECT_ASSI 的真身 +
 * @SHOW_LIST_TRAINABLE / @SHOW_LIST_ASSISTABLE 富化列 + IS_TRAINABLE /
 * IS_ASSISTABLE / GET_JOB_NAME 判定与取名（issue #44 起步，#395 补全富化列
 * 与 SELECT_ASSI 真身）。
 *
 * 源: target/ERB/SHOP/SHOP ver1.0.2.ERB  @SELECT_TARGET（:234-327）/
 *     @SELECT_ASSI（:331-421）
 *     target/ERB/SHOP/SHOP_FUNCTION.ERB  @SHOW_LIST_TRAINABLE（:7-53）/
 *     @SHOW_LIST_ASSISTABLE（:55-103）/@IS_TRAINABLE（:105-113）/
 *     @IS_ASSISTABLE（:116-128）/@GET_JOB_NAME（:131-175）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 判定函数的 `ARG >= CHARANUM`（序号越界）按 ID 语义改写为「不在已
 *     加入列表」（CONTEXT.md：两种编号在原作重合但不等价，ere 一律用
 *     角色 ID——reset_out_of_range_pointers 的同款处理）；
 *   - @SHOW_LIST_TRAINABLE/@SHOW_LIST_ASSISTABLE 的显示位计数（T_LCOUNT
 *     只在渲染分支内自增，SHOP_FUNCTION.ERB:18-46/:66-96）在原作是一处
 *     缺陷：翻页后窗口起点永远算出第 1 页的同一批人（T_LCOUNT 应按
 *     「可训练/可助手序号」而非「已渲染数」自增）。此处按显见意图移植——
 *     按序号开窗，翻页真正翻页；
 *   - CLEARLINE 局部重绘与补行排版不镜像：ere 控制台是滚动视图，翻页走
 *     整屏重绘（page-title/page-shop 同款先例）；LIST_POS/PREV_PAGE 滚动
 *     缓存随之退化为局部变量（原作调用侧本就从未读到被调侧的更新，缓存
 *     不生效）；
 *   - 列表行渲染为按钮（原作纯文本 + INPUT，实机点不动，PR #53 通则）；
 *     富化列（职业/等级/HP/调教回数/沦陷标签）随 #395 落地——HP 条按
 *     #74 的 BASE 条 ADR 同一口径转 `(cur/max)` 数值（BARSTR 的字符条是
 *     纯表现，语义值即数值，#74 已定），按钮自身的连续空白折叠成一个
 *     空格（引擎 showAcc 公式），原作的列宽 `,N,LEFT/RIGHT` 填充因此不
 *     必复刻（同 page-dungeon-info2.js 的库存按钮先例）；沦陷标签保留
 *     原作方括号/尖括号记号但不复刻 SETCOLOR（按钮无法给正文局部染色，
 *     整按钮染色会曲解原作「只染标签本身」的意图，不如不染）；
 *   - @SELECT_ASSI 与 @SELECT_TARGET 同构，仅 NUM_PAGE（13 非 26）、判据
 *     （IS_ASSISTABLE）、两个特殊入口的返回码不同：[1002]「我自己上阵」
 *     显式置 ASSI=-1 后 RETURN 0（明确选择「无助手」，非取消）；[999]
 *     「我先想想」RETURN 2（取消——与 SELECT_TARGET 的 999=RETURN 0 不同
 *     码，调用侧 page-shop.js 的 usershop 按 RESULT==2 判定取消）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const monster_play_mod = require('#/dungeon/monster-play');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');

// 本文件曾经存根化的原作调用名：SHOW_LIST_TRAINABLE 的富化列随 #395 补全，
// 清单归零（留空数组的理由见 page-main-menu.js 同款说明）。
const STUBBED_CALLS = [];

/**
 * @IS_TRAINABLE（SHOP_FUNCTION.ERB:105-113，#FUNCTION）：编号可调教返回 0，
 * 否则 1（范围外/魔王）或 2（CFLAG:x:1 != 0，占用中）。
 * @param {number} cid 角色 ID
 * @returns {number} 0 = 可调教
 */
function is_trainable(cid) {
  // :109-110 SIF ARG < 1 || ARG >= CHARANUM || ARG == MASTER（=0，魔王）→ 1。
  // CHARANUM 判据的 ID 语义改写见文件头
  if (cid < 1 || !era.getAddedCharacters().includes(cid) || cid === 0) {
    return 1;
  }
  // :111-112 SIF CFLAG:ARG:1 != 0 → 2
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) {
    return 2;
  }
  return 0;
}

/**
 * @IS_ASSISTABLE（SHOP_FUNCTION.ERB:116-128，#FUNCTION）：可当助手返回 0，
 * 否则 1（范围外）/2（CFLAG:x:0 != 2，非助手役）/3（占用中）/4（当前目标）。
 * @param {number} cid 角色 ID
 * @returns {number} 0 = 可当助手
 */
function is_assistable(cid) {
  // :120-121 范围外（ID 语义改写，见 is_trainable）
  if (cid < 1 || !era.getAddedCharacters().includes(cid)) {
    return 1;
  }
  // :122-123 SIF CFLAG:ARG:0 != 2
  if ((era.get(`cflag:${cid}:0`) || 0) !== 2) {
    return 2;
  }
  // :124-125 SIF CFLAG:ARG:1 != 0
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) {
    return 3;
  }
  // :126-127 SIF TARGET == ARG（目标不能兼助手）
  if (era_flag.target === cid) {
    return 4;
  }
  return 0;
}

/**
 * @GET_JOB_NAME（SHOP_FUNCTION.ERB:131-175，#FUNCTIONS）：按 TALENT:200-212
 * 返回职业名（:135-138 注释掉的旧 FOR 循环与 TALENTNAME 表无关，不移植）。
 * 无匹配职业（如玛奥同型角色）返回单个半角空格（:174 RETURNF " "）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function get_job_name(cid) {
  const has = (id) => (era.get(`talent:${cid}:${id}`) || 0) !== 0;
  if (has(200)) return '战士';
  if (has(201)) return '魔法师';
  if (has(202)) return '神官';
  if (has(203)) return '盗贼';
  if (has(204)) return '肉便器';
  if (has(205)) return '骑士';
  if (has(206)) return has(122) ? '巫者' : '巫女';
  if (has(207)) return '忍者';
  if (has(208)) return '弓手';
  if (has(209)) return '苗床';
  if (has(210)) return '魔界将军';
  if (has(211)) return '魔导神官';
  if (has(212)) return '魔物使';
  return ' ';
}

/**
 * 沦陷标签：TALENT:85（爱慕）/TALENT:76（淫乱）/未沦陷，两份列表共用（PRINTFORM 前的
 * IF/ELSEIF 链一致，SHOP_FUNCTION.ERB:16-24/:64-72）。
 * @param {number} cid
 * @returns {string}
 */
function love_status_tag(cid) {
  if ((era.get(`talent:${cid}:85`) || 0) !== 0) {
    return '<爱慕>';
  }
  if ((era.get(`talent:${cid}:76`) || 0) !== 0) {
    return '<淫乱>';
  }
  return '<未沦陷>';
}

/**
 * @SHOW_LIST_TRAINABLE 行文本（SHOP_FUNCTION.ERB:14-24）：职业/等级/HP/调教回数 +
 * 沦陷标签（☆收藏／陷／瘾／未，按原作顺序拼接）。
 * @param {number} cid
 * @returns {string}
 */
function trainable_row_text(cid) {
  const level = era.get(`cflag:${cid}:9`) || 0;
  const cur = era.get(`base:${cid}:0`) || 0;
  const max = era.get(`maxbase:${cid}:0`) || 0;
  const train_count = era.get(`cflag:${cid}:10`) || 0;
  let tags = love_status_tag(cid);
  if ((era.get(`cflag:${cid}:700`) || 0) !== 0) {
    tags += '[☆]';
  }
  if ((era.get(`talent:${cid}:73`) || 0) !== 0) {
    tags += '[陷]';
  }
  if ((era.get(`talent:${cid}:72`) || 0) !== 0) {
    tags += '[瘾]';
  }
  if ((era.get(`talent:${cid}:135`) || 0) !== 0) {
    tags += '[未]';
  }
  return `${chara_callname(cid)} ${get_job_name(cid)} LV${level} HP(${cur}/${max}) 调教回数:${train_count} ${tags}`;
}

/**
 * @SHOW_LIST_ASSISTABLE 行文本（SHOP_FUNCTION.ERB:62-77）：无调教回数、无 ☆，
 * 沦陷标签换脏/虐/恶/魅/迷/威（TALENT:64/83/87/91/92/93）。
 * @param {number} cid
 * @returns {string}
 */
function assistable_row_text(cid) {
  const level = era.get(`cflag:${cid}:9`) || 0;
  const cur = era.get(`base:${cid}:0`) || 0;
  const max = era.get(`maxbase:${cid}:0`) || 0;
  let tags = love_status_tag(cid);
  if ((era.get(`talent:${cid}:64`) || 0) !== 0) {
    tags += '[脏]';
  }
  if ((era.get(`talent:${cid}:83`) || 0) !== 0) {
    tags += '[虐]';
  }
  if ((era.get(`talent:${cid}:87`) || 0) !== 0) {
    tags += '[恶]';
  }
  if ((era.get(`talent:${cid}:91`) || 0) !== 0) {
    tags += '[魅]';
  }
  if ((era.get(`talent:${cid}:92`) || 0) !== 0) {
    tags += '[迷]';
  }
  if ((era.get(`talent:${cid}:93`) || 0) !== 0) {
    tags += '[威]';
  }
  return `${chara_callname(cid)} ${get_job_name(cid)} LV${level} HP(${cur}/${max}) ${tags}`;
}

/**
 * @SHOW_LIST_TRAINABLE 的骨架：分页列出可选奴隶。
 *
 * @param {number} no_page 页码（0 起）
 * @param {number} num_page 每页人数（原作 #DIM NUM_PAGE = 26）
 * @returns {number} 可调教总人数（原作 LOCAL——注意返回的是**总数**不是
 *   本页渲染数；调用侧 RESULT < 1 即「列表为空」取消）
 */
function show_list_trainable(no_page, num_page) {
  const added = era.getAddedCharacters();
  const trainable = added.filter((cid) => is_trainable(cid) === 0);
  trainable.forEach((cid, index) => {
    // 显示窗口 [no_page*num_page+1, (no_page+1)*num_page+1)（1 起序号，
    // 按可训练序号开窗——原作缺陷的修正移植，见文件头）
    if (index >= no_page * num_page && index < (no_page + 1) * num_page) {
      // 原作行：PRINTFORM [{COUNT,2}] %SAVESTR:COUNT,12,LEFT% + 富化列（职业/
      // LV/HP 条/调教回数/爱慕·淫乱·未沦陷/收藏标记，#395 补全，见
      // trainable_row_text）。
      //
      // 原作是纯文本 + INPUT 收数字；ere 侧改按钮，与本画面下方的翻页/返回
      // 四个按钮、以及 page-title、first-setting 的同款先例一致（实机上纯
      // 文本行点不动，玩家只能靠猜去敲编号）。accelerator 沿用原作编号 =
      // 角色 ID，输入侧的判定不变。
      //
      // 按钮正文不写 [编号] 前缀：引擎 showAcc 默认为真、自动拼成
      // `[快捷键] 正文`，手写会得到「[17] [17] 玛奥」（PR #30 实机踩过）。
      era.printButton(trainable_row_text(cid), cid);
    }
  });
  return trainable.length;
}

/**
 * @SHOW_LIST_ASSISTABLE（SHOP_FUNCTION.ERB:55-97）：分页列出可选助手（#395，与
 * show_list_trainable 同构，判据换 IS_ASSISTABLE、行文本换 assistable_row_text）。
 *
 * @param {number} no_page 页码（0 起）
 * @param {number} num_page 每页人数（原作 #DIM NUM_PAGE = 13）
 * @returns {number} 可当助手总人数
 */
function show_list_assistable(no_page, num_page) {
  const added = era.getAddedCharacters();
  const assistable = added.filter((cid) => is_assistable(cid) === 0);
  assistable.forEach((cid, index) => {
    if (index >= no_page * num_page && index < (no_page + 1) * num_page) {
      era.printButton(assistable_row_text(cid), cid);
    }
  });
  return assistable.length;
}

/**
 * @SELECT_TARGET（SHOP ver1.0.2.ERB:234-327）：调教目标选择画面真身。
 *
 * 分页列表 + 输入循环 + 取消路径；选中目标置 TARGET 与 FLAG:1（前回调教
 * 目标），选中可助手指针时置 ASSI 与 FLAG:2（原作如此——目标画面也能挑
 * 助手）。返回 0 = 取消/列表为空，1 = 选中。
 *
 * @returns {Promise<number>} 0 / 1；[1002] 其它入口进入怪物玩弄，完成后
 *   由 MONSTER_PLAY 发出 BEGIN TURNEND
 */
async function select_target() {
  const num_page = 26; // #DIM NUM_PAGE = 26
  // :242-254 可调教总数 → 最大页码（0 起；空表为 -1，但首渲染即 RETURN 0，
  // 页码不会被用到）
  const total = era
    .getAddedCharacters()
    .filter((cid) => is_trainable(cid) === 0).length;
  const max_page = Math.ceil(total / num_page) - 1;

  let no_page = 0; // #DIM NO_PAGE = 0（局部，非跨调用静态）
  // $INPUT_LOOP（:256-327；LIST_POS/PREV_PAGE 缓存不生效的说明见文件头）
  for (;;) {
    // :271-273 CUSTOMDRAWLINE = / 标题 / DRAWLINE（'=' 线以 isSolid 近似）
    era.drawLine({ isSolid: true });
    era.print('请魔王大人选择将要调教的奴隶人选');
    era.drawLine();
    // :275 CALL SHOW_LIST_TRAINABLE(NO_PAGE,NUM_PAGE,LIST_POS)；:276-279
    // RESULT < 1 → RETURN 0（列表为空 = 取消）
    if (show_list_trainable(no_page, num_page) < 1) {
      return 0;
    }
    // :280-285 补行对齐（CLEARLINE 排版）不镜像，见文件头
    era.drawLine();
    // :287-290 [1000] 上一页 / [999] 返回 / [1002] 其它 / [1001] 下一页
    //（按钮正文不带 [编号] 前缀——引擎自动拼，PR #30）
    era.printButton('- 上一页', 1000);
    era.printButton('返回', 999);
    era.printButton('其它', 1002);
    era.printButton('- 下一页', 1001);

    // :293 INPUT
    const result = await era.input();
    if (result === 999) {
      // :294-296 返回 → RETURN 0
      return 0;
    }
    if (result === 1002) {
      // :297-300 其它 → CALL MONSTER_PLAY（#340 真身）；RETURN RESULT。
      return monster_play_mod.monster_play();
    }
    if (is_trainable(result) === 0) {
      // :301-305 調教可能な対象 → TARGET = RESULT；FLAG:1 = TARGET；RETURN 1
      era_flag.target = result;
      era.set('flag:1', result);
      return 1;
    }
    if (is_assistable(result) === 0) {
      // :306-310 助手可能な対象 → ASSI = RESULT；FLAG:2 = ASSI；RETURN 1
      era_flag.assi = result;
      era.set('flag:2', result);
      return 1;
    }
    if (result === 1000) {
      // :311-316 上一页（页首不再退；CLEARLINE 不镜像）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // :317-322 下一页（页尾不再进）
      if (no_page < max_page) {
        no_page += 1;
      }
      continue;
    }
    // :323-327 范围外（RESULT < 0 || RESULT >= CHARANUM）与其余输入：
    // CLEARLINE 1 + GOTO INPUT_LOOP —— 重绘不提示（ere：无 CLEARLINE，
    // 直接回循环头整屏重绘）
  }
}

/**
 * @SELECT_ASSI（SHOP ver1.0.2.ERB:331-421，#395 起真身）：助手选择画面。
 *
 * 与 @SELECT_TARGET 同构（分页/输入循环骨架、CLEARLINE 排版不镜像的说明见文件
 * 头），三处不同：NUM_PAGE=13（原作 :334，非 26）；判据换 IS_ASSISTABLE；
 * 两个特殊入口的返回码不同——[1002]「我自己上阵」显式置 ASSI=-1 后 RETURN 0
 *（不是取消，是明确选择「无助手」），[999]「我先想想」 RETURN 2（取消——与
 * SELECT_TARGET 的 999=RETURN 0 不同码，调用侧 page-shop.js 的 usershop 按
 * RESULT==2 判定取消）。
 *
 * @returns {Promise<number>} 0 = 无助手（已置 ASSI=-1）/ 1 = 选中 / 2 = 取消
 */
async function select_assi() {
  const num_page = 13; // #DIM NUM_PAGE = 13
  // :339-352 可当助手总数 → 最大页码（同 select_target 的同构段）
  const total = era
    .getAddedCharacters()
    .filter((cid) => is_assistable(cid) === 0).length;
  const max_page = Math.ceil(total / num_page) - 1;

  let no_page = 0; // #DIM NO_PAGE = 0
  // $INPUT_LOOP（:353-421）
  for (;;) {
    era.drawLine({ isSolid: true });
    era.print('请魔王大人选择在调教过程当中的助手人选');
    era.drawLine();
    // :372 CALL SHOW_LIST_ASSISTABLE；:374-376 RESULT < 1 → RETURN 0
    if (show_list_assistable(no_page, num_page) < 1) {
      return 0;
    }
    era.drawLine();
    // :384-387 [1000] 上一页 / [999] 我先想想… / [1002] 我自己上阵 /
    // [1001] 下一页（按钮正文不带 [编号] 前缀——引擎自动拼，PR #30）
    era.printButton('- 上一页', 1000);
    era.printButton('我先想想…', 999);
    era.printButton('哇嘎嘎！我可是魔王！这次就由我自己亲自上阵！', 1002);
    era.printButton('- 下一页', 1001);

    // :390 INPUT
    const result = await era.input();
    if (result === 1002) {
      // :391-395 助手は無し → ASSI = -1；FLAG:2 = ASSI；RETURN 0
      era_flag.assi = -1;
      game.event.上次助手 = -1;
      return 0;
    }
    if (result === 999) {
      // :396-398 我先想想… → RETURN 2（取消，与 SELECT_TARGET 的 999 不同码）
      return 2;
    }
    if (is_assistable(result) === 0) {
      // :399-403 助手可能な対象 → ASSI = RESULT；FLAG:2 = ASSI；RETURN 1
      era_flag.assi = result;
      game.event.上次助手 = result;
      return 1;
    }
    if (result === 1000) {
      // :404-409 上一页（页首不再退；CLEARLINE 不镜像）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // :410-415 下一页（页尾不再进）
      if (no_page < max_page) {
        no_page += 1;
      }
      continue;
    }
    // :416-421 范围外与其余输入：重绘不提示（同 select_target 的尾处理）
  }
}

module.exports = {
  STUBBED_CALLS,
  is_assistable,
  is_trainable,
  select_target,
  select_assi,
  show_list_trainable,
  show_list_assistable,
};
