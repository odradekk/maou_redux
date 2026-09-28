/**
 * @file 调教目标/助手选择画面：select_target 与 select_assi +
 * show_list_trainable / show_list_assistable 富化列 + is_trainable /
 * is_assistable / get_job_name 判定与取名（issue #44 起步，#395 补全富化列
 * 与 select_assi）。
 *
 * 实现说明（有意取舍，均注明依据）：
 *   - 越界判定按 ID 语义写为「不在已加入列表」（CONTEXT.md 的编号约定：
 *     一律用角色 ID——reset_out_of_range_pointers 的同款处理）；
 *   - 两份列表的窗口若按「已渲染数」自增计数，翻页后起点永远算出第 1 页的
 *     同一批人。此处按序号开窗，翻页真正翻页；
 *   - 局部清行重绘与补行排版不镜像：ere 控制台是滚动视图，翻页走整屏重绘
 *     （page-title/page-shop 同款先例）；翻页游标随之退化为局部变量
 *     （调用侧从未读到被调侧的更新，缓存不生效）；
 *   - 列表行渲染为按钮（纯文本行实机点不动，PR #53 通则）；
 *     富化列（职业/等级/HP/调教回数/沦陷标签）随 #395 实现——HP 按
 *     #74 的 BASE 条 ADR 转 `(cur/max)` 数值（字符条是纯表现，语义值即
 *     数值，#74 已定），按钮自身的连续空白折叠成一个空格（引擎 showAcc
 *     公式），列宽填充因此不必复刻（同 page-dungeon-info2.js 的库存按钮
 *     先例）；沦陷标签保留方括号/尖括号记号但不染色（按钮无法给正文局部
 *     染色，整按钮染色会曲解「只染标签本身」的意图，不如不染）；
 *   - 列表行的快捷键 = 角色 ID（上条），与同屏的固定编号 [1000] 上一页 /
 *     [999] 返回 / [1001] 下一页 / [1002] 其它共存——后代 ID 因此必须落在
 *     固定编号之上（chara-pregnancy.js 的 FIRST_CHILD_ID = 100000，issue
 *     #560 的决定；静态检查见 test/child-id-collision.test.js）；
 *   - select_assi 与 select_target 同构，仅每页人数（13 非 26）、判定
 *     函数（is_assistable）、两个特殊入口的返回码不同：[1002]「我自己上阵」
 *     显式置 ASSI=-1 后返回 0（明确选择「无助手」，非取消）；[999]
 *     「我先想想」返回 2（取消——与 select_target 的 999=返回 0 不同
 *     码，调用侧 page-shop.js 的 usershop 按返回值 == 2 判定取消）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const monster_play_mod = require('#/dungeon/monster-play');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * is_trainable：编号可调教返回 0，
 * 否则 1（范围外/魔王）或 2（CFLAG:x:1 != 0，占用中）。
 * @param {number} cid 角色 ID
 * @returns {number} 0 = 可调教
 */
function is_trainable(cid) {
  // 范围外或魔王 → 1（越界的 ID 语义写法见文件头）
  if (cid < 1 || !era.getAddedCharacters().includes(cid) || cid === 0) {
    return 1;
  }
  // 占用中（CFLAG:x:1 != 0）→ 2
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) {
    return 2;
  }
  return 0;
}

/**
 * is_assistable：可当助手返回 0，
 * 否则 1（范围外）/2（CFLAG:x:0 != 2，非助手役）/3（占用中）/4（当前目标）。
 * @param {number} cid 角色 ID
 * @returns {number} 0 = 可当助手
 */
function is_assistable(cid) {
  // 范围外（ID 语义改写，见 is_trainable）
  if (cid < 1 || !era.getAddedCharacters().includes(cid)) {
    return 1;
  }
  // 非助手役（CFLAG:x:0 != 2）→ 2
  if ((era.get(`cflag:${cid}:0`) || 0) !== 2) {
    return 2;
  }
  // 占用中（CFLAG:x:1 != 0）→ 3
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) {
    return 3;
  }
  // 当前目标不能兼助手 → 4
  if (era_flag.target === cid) {
    return 4;
  }
  return 0;
}

/**
 * get_job_name：按 TALENT:200-212
 * 返回职业名。无匹配职业（如玛奥同型角色）返回单个半角空格。
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
 * 沦陷标签：TALENT:85（爱慕）/TALENT:76（淫乱）/未沦陷，两份列表共用。
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
 * trainable_row_text：职业/等级/HP/调教回数 +
 * 沦陷标签（☆收藏／陷／瘾／未，顺序固定）。
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
 * assistable_row_text：无调教回数、无 ☆，
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
 * show_list_trainable：分页列出可选奴隶。
 *
 * @param {number} no_page 页码（0 起）
 * @param {number} num_page 每页人数（select_target 传 26）
 * @returns {number} 可调教总人数（注意返回的是**总数**不是
 *   本页渲染数；调用侧按 < 1 判定「列表为空」取消）
 */
function show_list_trainable(no_page, num_page) {
  const added = era.getAddedCharacters();
  const trainable = added.filter((cid) => is_trainable(cid) === 0);
  trainable.forEach((cid, index) => {
    // 显示窗口按可训练序号开（修正按角色号开窗的错位，见文件头）
    if (index >= no_page * num_page && index < (no_page + 1) * num_page) {
      // 行文本 = 姓名 + 富化列（职业/LV/HP 条/调教回数/爱慕·淫乱·未沦陷/
      // 收藏标记，#395 补全），见 trainable_row_text。
      //
      // 列表行是按钮而非纯文本（实机上纯文本行点不动，玩家只能靠猜去敲
      // 编号；page-title、first-setting 同款先例）。快捷键 = 角色 ID，
      // 输入侧的判定不变。
      //
      // 按钮正文不写 [编号] 前缀：引擎 showAcc 默认为真、自动拼成
      // `[快捷键] 正文`，手写会得到「[17] [17] 玛奥」（PR #30 实机踩过）。
      era.printButton(trainable_row_text(cid), cid);
    }
  });
  return trainable.length;
}

/**
 * show_list_assistable：分页列出可选助手（#395，与
 * show_list_trainable 同构，判定换 is_assistable、行文本换 assistable_row_text）。
 *
 * @param {number} no_page 页码（0 起）
 * @param {number} num_page 每页人数（select_assi 传 13）
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
 * select_target：调教目标选择画面。
 *
 * 分页列表 + 输入循环 + 取消路径；选中目标置 TARGET 与 FLAG:1（前回调教
 * 目标），选中可助手指针时置 ASSI 与 FLAG:2（目标画面也能挑助手）。
 * 返回 0 = 取消/列表为空，1 = 选中。
 *
 * @returns {Promise<number>} 0 / 1；[1002] 其它入口进入怪物玩弄，完成后
 *   由怪物玩弄发出回合结束转场
 */
async function select_target() {
  const num_page = 26; // 每页 26 人
  // 可调教总数 → 最大页码（0 起；空表为 -1，但首渲染即返回 0，
  // 页码不会被用到）
  const total = era
    .getAddedCharacters()
    .filter((cid) => is_trainable(cid) === 0).length;
  const max_page = Math.ceil(total / num_page) - 1;

  let no_page = 0; // 页码从 0 起（局部变量，翻页状态不跨调用保留）
  // 输入循环（翻页游标不保留的说明见文件头）
  for (;;) {
    // 实线 / 标题 / 分割线
    era.drawLine({ isSolid: true });
    era.print('请魔王大人选择将要调教的奴隶人选');
    era.drawLine();
    // 列表为空（返回总数 < 1）= 取消，返回 0
    if (show_list_trainable(no_page, num_page) < 1) {
      return 0;
    }
    // 补行对齐（CLEARLINE 排版）不镜像，见文件头
    era.drawLine();
    // [1000] 上一页 / [999] 返回 / [1002] 其它 / [1001] 下一页
    //（按钮正文不带 [编号] 前缀——引擎自动拼，PR #30）
    era.printButton('- 上一页', 1000);
    era.printButton('返回', 999);
    era.printButton('其它', 1002);
    era.printButton('- 下一页', 1001);

    // 输入
    const result = await era.input();
    if (result === 999) {
      // 返回 → 0
      return 0;
    }
    if (result === 1002) {
      // 其它 → 怪物玩弄（#340 真身），返回其结果
      return monster_play_mod.monster_play();
    }
    if (is_trainable(result) === 0) {
      // 可调教对象 → 置 TARGET 与 FLAG:1，返回 1
      era_flag.target = result;
      era.set('flag:1', result);
      return 1;
    }
    if (is_assistable(result) === 0) {
      // 可助手对象 → 置 ASSI 与 FLAG:2，返回 1
      era_flag.assi = result;
      era.set('flag:2', result);
      return 1;
    }
    if (result === 1000) {
      // 上一页（页首不再退；整屏重绘）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页（页尾不再进）
      if (no_page < max_page) {
        no_page += 1;
      }
      continue;
    }
    // 范围外与其余输入：不提示，直接回循环头整屏重绘
  }
}

/**
 * select_assi（#395 起接入）：助手选择画面。
 *
 * 与 select_target 同构（分页/输入循环骨架、整屏重绘的说明见文件
 * 头），三处不同：每页人数 13（非 26）；判定换 is_assistable；
 * 两个特殊入口的返回码不同——[1002]「我自己上阵」显式置 ASSI=-1 后返回 0
 *（不是取消，是明确选择「无助手」），[999]「我先想想」返回 2（取消——与
 * select_target 的 999=返回 0 不同码，调用侧 page-shop.js 的 usershop 按
 * 返回值 == 2 判定取消）。
 *
 * @returns {Promise<number>} 0 = 无助手（已置 ASSI=-1）/ 1 = 选中 / 2 = 取消
 */
async function select_assi() {
  const num_page = 13; // 每页 13 人
  // 可当助手总数 → 最大页码（同 select_target 的同构段）
  const total = era
    .getAddedCharacters()
    .filter((cid) => is_assistable(cid) === 0).length;
  const max_page = Math.ceil(total / num_page) - 1;

  let no_page = 0; // 页码从 0 起（局部变量）
  // 输入循环
  for (;;) {
    era.drawLine({ isSolid: true });
    era.print('请魔王大人选择在调教过程当中的助手人选');
    era.drawLine();
    // 列表为空（返回总数 < 1）= 取消，返回 0
    if (show_list_assistable(no_page, num_page) < 1) {
      return 0;
    }
    era.drawLine();
    // [1000] 上一页 / [999] 我先想想… / [1002] 我自己上阵 /
    // [1001] 下一页（按钮正文不带 [编号] 前缀——引擎自动拼，PR #30）
    era.printButton('- 上一页', 1000);
    era.printButton('我先想想…', 999);
    era.printButton('哇嘎嘎！我可是魔王！这次就由我自己亲自上阵！', 1002);
    era.printButton('- 下一页', 1001);

    // 输入
    const result = await era.input();
    if (result === 1002) {
      // 无助手 → 置 ASSI = -1，返回 0
      era_flag.assi = -1;
      game.event.上次助手 = -1;
      return 0;
    }
    if (result === 999) {
      // 我先想想… → 返回 2（取消，与 select_target 的 999 不同码）
      return 2;
    }
    if (is_assistable(result) === 0) {
      // 可助手对象 → 置 ASSI 与 FLAG:2，返回 1
      era_flag.assi = result;
      game.event.上次助手 = result;
      return 1;
    }
    if (result === 1000) {
      // 上一页（页首不再退；整屏重绘）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页（页尾不再进）
      if (no_page < max_page) {
        no_page += 1;
      }
      continue;
    }
    // 范围外与其余输入：重绘不提示（同 select_target 的尾处理）
  }
}

module.exports = {
  get_job_name,
  is_assistable,
  is_trainable,
  select_target,
  select_assi,
  show_list_trainable,
  show_list_assistable,
};
