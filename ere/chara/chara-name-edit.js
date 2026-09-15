/**
 * @file 改名交互：角色信息页的「改名 / 还原名字」按钮与输入流程
 * （issue #384，N2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB 全三函数——
 *       @SHOW_BUTTON_NAME_EDIT（:4-29）、@CHECK_ABLE_TO_NAME_EDIT（:32-50，式中函数）、
 *       @CHARA_INFO_NAME_EDIT（:53-109）
 *
 * 调用点：原作的 CHARA_INFO ver1.0.1.ERB:858/:859（两个按钮）与
 * :1045/:1048（两条交互分支），已接在 ere/page/page-chara-info.js。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **`SETCOLOR 0x646464` / `RESETCOLOR` → `era.setColor('#646464')` /
 *     `era.setColor('')`**（:21 / :29）：SDK `setColor` 的空参即恢复默认色
 *     （era-electron.js:537-541「Set default text color」）。灰值与
 *     event-execution.js:120、page-chara-info.js:243 同款（#175 先例）。
 *     注：原作这一处只把随后的 PRINTFORM 染灰，ere 侧 `setColor` 设的是
 *     全局默认色、由紧邻的 `printButton` 消费，随即复原——语义等价。
 *
 *   - **按钮正文不写 `[{NUM}]` 前缀，尾部全角空格照抄**（:25/:27）：
 *     引擎的 `printButton` 自动拼 `[快捷键] `（`showAcc` 默认真，app.asar
 *     渲染层），手写前缀会渲染成 `[0] [0] 改名`（#170 的 PR #30 实录）。
 *     `NUM` 因此只作 `accelerator` 实参。尾部那个全角空格原样保留：引擎渲染
 *     层折叠连续空白（`.replace(/\s+/g, ' ')`，而 JS 正则的 `\s` 匹配全角
 *     空格 U+3000），把它折成半角——折叠是引擎的事，端口照抄原文。
 *
 *   - **`STRLENS(LOCALS) > 16` 用显示宽度等价物**（:92-93）：
 *     `STRLENS` / `SUBSTRING` 在本引擎里按 Unicode 码点计（dev-guides
 *     `A-api-docs.md` 的字符串族说明，与 page-info-exp.js 的 display_width
 *     同一读法），全角一字算 1。阈值 16 照抄——报错话术里的「全角八字」
 *     是文案原文，不是判据。
 *
 *   - **一人称重设（:81-83 / :105-107）的守卫 `CFLAG:ARG:450 >= 99`**：
 *     450 是一人称档位（SELF_CALL.ERB 的 31 档 ↔ 自主选择档）。
 *
 *   - **`RETURNF 2`（:65）保留**：那是「侵攻中的勇者不该看到按钮、但输入
 *     仍能到达」的防御分支，返回值被调用点忽略（原作的 CHARA_INFO 读
 *     RESULT:1）。
 */

const era = require('#/era-electron');
const { chara_name_reset } = require('#/chara/chara-name');
const { random_self_call } = require('#/chara/chara-self-call');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。三函数都落真身，名单为空。
 */
const STUBBED_CALLS = [];

/** 判定返回值：可改名（魔王：改名会波及全库的称呼，故单独一档） */
const NAME_EDIT_KING = 1;
/** 判定返回值：侵攻中的勇者 */
const NAME_EDIT_HERO = 2;
/** 判定返回值：苗床 */
const NAME_EDIT_NURSERY = 3;
/** 判定返回值：处于不能变更名字的状态 */
const NAME_EDIT_BLOCKED = 4;

/**
 * STRLENS 的等价物（码点计数；全角一字算 1）。见文件头「移植说明」条。
 * @param {string} text
 * @returns {number}
 */
function strlens(text) {
  return Array.from(text).length;
}

/**
 * @CHECK_ABLE_TO_NAME_EDIT（:32-50，式中函数）：角色能否改名的判定。
 *
 * @param {number} arg 角色号（原作 ARG）
 * @returns {0|1|2|3|4} 0 = 可以；1 = 魔王（改名波及称呼）；2 = 侵攻中的勇者；
 *   3 = 苗床；4 = 调教中或迎击中的其它占用状态
 */
function check_able_to_name_edit(arg) {
  if (arg === 0) {
    return NAME_EDIT_KING; // :38-39 你的名字不能改
  }
  const state = era.get(`cflag:${arg}:1`) || 0; // CFLAG:1 状态（原作读四次的同一个键）
  if (state === 2) {
    return NAME_EDIT_HERO; // :40-42 侵攻中的勇者
  }
  if (state === 7) {
    return NAME_EDIT_NURSERY; // :43-45 苗床
  }
  if (state !== 0 && state !== 3) {
    return NAME_EDIT_BLOCKED; // :46-48 调教中也不是迎击中也不是
  }
  return 0; // :50
}

/**
 * @SHOW_BUTTON_NAME_EDIT（:4-29）：渲染「改名 / 还原名字」按钮。
 *
 * @param {number} num 按钮的快捷键编号（原作 NUM）
 * @param {number} arg 目标角色号（原作 ARG）
 * @param {number} [reset=0] 非零时渲染「还原名字」
 * @returns {void} 判定为侵攻中的勇者时不渲染任何按钮（:14-15 RETURN 0）
 */
function show_button_name_edit(num, arg, reset = 0) {
  const able = check_able_to_name_edit(arg); // :12 LOCAL = CHECK_ABLE_TO_NAME_EDIT
  if (able === NAME_EDIT_HERO) {
    return; // :13-15 侵攻中的勇者不显示按钮本身
  }
  if (able !== 0 && able !== NAME_EDIT_KING) {
    // :19-22 奴隷で実行不可なら灰色にする
    era.setColor('#646464');
  }

  era.printButton(reset ? '还原名字\u3000' : '改名\u3000', num);
  era.setColor(''); // :29 RESETCOLOR
}

/**
 * @CHARA_INFO_NAME_EDIT（:53-109）：按钮被按下后的改名 / 还原流程。
 *
 * @param {number} arg 目标角色号（原作 ARG）
 * @param {number} [reset=0] 非零时走「还原名字」
 * @returns {Promise<number>} 0 = 已处理；2 = 侵攻中的勇者（按钮本不该显示）
 */
async function chara_info_name_edit(arg, reset = 0) {
  const able = check_able_to_name_edit(arg); // :60 LOCAL
  if (able !== 0 && able !== NAME_EDIT_KING) {
    // :61-71 不可改名：按档位给出反馈后返回 0
    if (able === NAME_EDIT_NURSERY) {
      era.print('苗床不可改变名字'); // :67
    } else if (able === NAME_EDIT_BLOCKED) {
      era.print('角色处于不能变更名字的状态'); // :69
    }
    // :62-65 的 `IF LOCAL == 1 / ELSEIF LOCAL == 2 RETURN 2`：前者空体、
    // 后者是「按钮没显示但输入仍能到达」的防御支，返回值给调用点。
    return able === NAME_EDIT_HERO ? NAME_EDIT_HERO : 0;
  }

  if (reset) {
    // :76-85 还原名字
    chara_name_reset(arg); // :77 CALL CHARA_NAME_RESET(ARG)
    era.print(`${era.get(`callname:${arg}:-2`) ?? ''}恢复了原来的名字……`); // :78
    if ((era.get(`cflag:${arg}:450`) || 0) >= 99) {
      random_self_call(arg); // :82 一人称設定
    }
    return 0; // :76-85 块的出口
  }

  // :87-102 [改名]
  for (;;) {
    era.print(`${era.get(`callname:${arg}:-2`) ?? ''}的新名字是？`); // :89
    // :90 INPUTS —— 引擎把回传值按 getNumber 归一（'' → 0），游戏读到的
    // 是归一后的值（夹具同款）。故这里的字符串化是「还原引擎交给游戏的
    // 那个值」，不是把空串还原成空串。
    const raw = await era.input();
    const input = raw === undefined || raw === null ? '' : String(raw);
    if (strlens(input) > 16) {
      // :93-95 名字太长
      era.print('名字太长，请使用全角八字以下的名字。');
      continue; // :95 GOTO INPUT_LOOP
    }
    if (strlens(input) > 0) {
      // :97-99 改名落地
      era.print(`${era.get(`callname:${arg}:-2`) ?? ''}今后被称呼为${input}。`);
      era.set(`callname:${arg}:-1`, input); // :98 CALLNAME:ARG '= LOCALS
      era.set(`callname:${arg}:-2`, input); // :99 SAVESTR:ARG '= LOCALS
    } else {
      // :100-101 名字没有变更（零长输入 = 取消）
      era.print(`${era.get(`callname:${arg}:-2`) ?? ''}的名字没有变更。`);
    }
    break;
  }

  if ((era.get(`cflag:${arg}:450`) || 0) >= 99) {
    random_self_call(arg); // :106 一人称設定
  }
  return 0; // :109
}

module.exports = {
  STUBBED_CALLS,
  check_able_to_name_edit,
  show_button_name_edit,
  chara_info_name_edit,
};
