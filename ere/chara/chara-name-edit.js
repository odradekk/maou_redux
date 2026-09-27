/**
 * @file 改名交互：角色信息页的「改名 / 还原名字」按钮与输入流程
 * （issue #384，N2）。
 *
 * 调用点：ere/page/page-chara-info.js——「改名 / 还原名字」两个按钮
 * （show_button_name_edit）与两条交互分支（chara_info_name_edit）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *   - **`era.setColor('#646464')` 后以 `era.setColor('')` 复原**：SDK
 *     `setColor` 的空参即恢复默认色（era-electron.js:537-541「Set default
 *     text color」）。灰值与 event-execution.js:120、page-chara-info.js:243
 *     同款（#175 先例）。注：ere 侧 `setColor` 设的是全局默认色、由紧邻的
 *     `printButton` 消费，随即复原——只染灰按钮正文。
 *
 *   - **按钮正文不写 `[{num}]` 前缀**：引擎的 `printButton` 自动拼
 *     `[快捷键] `（`showAcc` 默认真，app.asar 渲染层），手写前缀会渲染成
 *     `[0] [0] 改名`（#170 的 PR #30 实录）。`num` 因此只作 `accelerator`
 *     实参。尾部那个全角空格原样保留：引擎渲染层折叠连续空白
 *     （`.replace(/\s+/g, ' ')`，而 JS 正则的 `\s` 匹配全角空格 U+3000），
 *     把它折成半角——折叠是引擎的事。
 *
 *   - **`strlens(input) > 16` 按码点计数**：`strlens` 见下方（码点计数，
 *     全角一字算 1）。长度阈值是 16 个码点；报错话术里的「全角八字」是
 *     提示措辞，不与判断条件联动。
 *
 *   - **一人称重设的检查 `cflag:arg:450 >= 99`**：450 是一人称档位（档位
 *     语义见 chara-self-call.js 的 random_self_call）。
 *
 *   - **返回 NAME_EDIT_HERO 的防御分支保留**：那是「侵攻中的勇者不该看到
 *     按钮、但输入仍能到达」的分支，返回值被调用点忽略。
 *
 *   - **空输入的语义**：引擎不受理空提交、又把 `''` 与 `"0"` 都归一成数值
 *     0，「不输入」在 ere 里只能以输入 0 表达。#567 统一决定 0 视为空输入
 *     （条件见 ere/utils/input-text.js），名字不变更支因此可达。
 */

const era = require('#/era-electron');
const { chara_name_reset } = require('#/chara/chara-name');
const { random_self_call } = require('#/chara/chara-self-call');
const { input_text } = require('#/utils/input-text');

/** 判定返回值：可改名（魔王：改名会波及全体角色的称呼，故单独一档） */
const NAME_EDIT_KING = 1;
/** 判定返回值：侵攻中的勇者 */
const NAME_EDIT_HERO = 2;
/** 判定返回值：苗床 */
const NAME_EDIT_NURSERY = 3;
/** 判定返回值：处于不能变更名字的状态 */
const NAME_EDIT_BLOCKED = 4;

/**
 * 码点计数的长度测量（全角一字算 1）。见文件头「移植说明」条。
 * @param {string} text
 * @returns {number}
 */
function strlens(text) {
  return Array.from(text).length;
}

/**
 * check_able_to_name_edit：角色能否改名的判定。
 *
 * @param {number} arg 角色号
 * @returns {0|1|2|3|4} 0 = 可以；1 = 魔王（改名波及称呼）；2 = 侵攻中的勇者；
 *   3 = 苗床；4 = 调教中或迎击中的其它占用状态
 */
function check_able_to_name_edit(arg) {
  if (arg === 0) {
    return NAME_EDIT_KING; // 你的名字不能改
  }
  const state = era.get(`cflag:${arg}:1`) || 0; // CFLAG:1 状态
  if (state === 2) {
    return NAME_EDIT_HERO; // 侵攻中的勇者
  }
  if (state === 7) {
    return NAME_EDIT_NURSERY; // 苗床
  }
  if (state !== 0 && state !== 3) {
    return NAME_EDIT_BLOCKED; // 调教中也不是迎击中也不是
  }
  return 0;
}

/**
 * show_button_name_edit：渲染「改名 / 还原名字」按钮。
 *
 * @param {number} num 按钮的快捷键编号
 * @param {number} arg 目标角色号
 * @param {number} [reset=0] 非零时渲染「还原名字」
 * @returns {void} 判定为侵攻中的勇者时不渲染任何按钮
 */
function show_button_name_edit(num, arg, reset = 0) {
  const able = check_able_to_name_edit(arg);
  if (able === NAME_EDIT_HERO) {
    return; // 侵攻中的勇者不显示按钮本身
  }
  if (able !== 0 && able !== NAME_EDIT_KING) {
    // 奴隷で実行不可なら灰色にする
    era.setColor('#646464');
  }

  era.printButton(reset ? '还原名字\u3000' : '改名\u3000', num);
  era.setColor(''); // 恢复默认色
}

/**
 * chara_info_name_edit：按钮被按下后的改名 / 还原流程。
 *
 * @param {number} arg 目标角色号
 * @param {number} [reset=0] 非零时走「还原名字」
 * @returns {Promise<number>} 0 = 已处理；2 = 侵攻中的勇者（按钮本不该显示）
 */
async function chara_info_name_edit(arg, reset = 0) {
  const able = check_able_to_name_edit(arg);
  if (able !== 0 && able !== NAME_EDIT_KING) {
    // 不可改名：按档位给出反馈后返回 0
    if (able === NAME_EDIT_NURSERY) {
      era.print('苗床不可改变名字');
    } else if (able === NAME_EDIT_BLOCKED) {
      era.print('角色处于不能变更名字的状态');
    }
    // 侵攻中的勇者不在此处给反馈——那是「按钮没显示但输入仍能到达」的
    // 防御分支，返回值给调用点。
    return able === NAME_EDIT_HERO ? NAME_EDIT_HERO : 0;
  }

  if (reset) {
    // 还原名字
    chara_name_reset(arg);
    era.print(`${era.get(`callname:${arg}:-2`) ?? ''}恢复了原来的名字……`);
    if ((era.get(`cflag:${arg}:450`) || 0) >= 99) {
      await random_self_call(arg); // 一人称設定
    }
    return 0; // 块的出口
  }

  // [改名]
  for (;;) {
    era.print(`${era.get(`callname:${arg}:-2`) ?? ''}的新名字是？`);
    // 引擎把回传值按 getNumber 归一（'' 与 "0" 都成数值 0，夹具同款），且
    // 不受理空提交；按 #567 的结论 0 视为空输入，经 input_text 还原成空串
    // 后走「名字没有变更」支（两条依据的完整注记见 ere/utils/input-text.js）。
    const input = input_text(await era.input());
    if (strlens(input) > 16) {
      // 名字太长
      era.print('名字太长，请使用全角八字以下的名字。');
      continue;
    }
    if (strlens(input) > 0) {
      // 改名生效
      era.print(`${era.get(`callname:${arg}:-2`) ?? ''}今后被称呼为${input}。`);
      era.set(`callname:${arg}:-1`, input); // 姓名
      era.set(`callname:${arg}:-2`, input); // 称呼
    } else {
      // 名字没有变更（零长输入 = 取消）
      era.print(`${era.get(`callname:${arg}:-2`) ?? ''}的名字没有变更。`);
    }
    break;
  }

  if ((era.get(`cflag:${arg}:450`) || 0) >= 99) {
    await random_self_call(arg); // 一人称設定
  }
  return 0;
}

module.exports = {
  check_able_to_name_edit,
  show_button_name_edit,
  chara_info_name_edit,
};
