/* eslint-disable no-undef, no-unused-vars, no-irregular-whitespace, no-redeclare, no-unreachable, no-dupe-else-if */
/**
 * @file EVENT_F1_丽塔.ERB 的口上转译产物（issue #107 原型，待复核）
 *
 * 源: target/ERB/口上/EVENT_F1_丽塔.ERB
 *
 * == J41（#251）复核结论：判定为模板残片，不落真身，本产物不移入 ere/kojo/ ==
 *
 * 复核依据（完整证据链见 issue #251 报告）：
 *   1. 文件头注释残留模板使用说明「（X2をキャラ番号に置換）/
 *      （X1をキャラ番号に置換）」——这是 `資料_非必要無須解壓/
 *      口上テンプレ/EVENT_KXX.ERB` 的占位符说明，作者未替换干净；
 *   2. 与模板逐段同构：存在判定段（@EVENTTRAIN #PRI 置 EX_FLAG:223）
 *      → @EVENTEND #LATER 清标志 → @EVENTTRAIN 台词段（守卫
 *      EX_TALENT:223 != 1 → RETURN 0）→ 初调教段。模板的
 *      `FLAG:1X2 = 1` / `TALENT:160+X1` / `IF CFLAG:201 == 0` 三处
 *      占位符在 F1 里被替换成 223（丽塔角色号），但正文仍是模板空位；
 *   3. 正文仅一段占位文本「口上测试」（模板此处是 `PRINTFORMW ` 留空）；
 *   4. 丽塔（223）入队依赖 `丽塔启动！` SAVEDATA 开关（FIRST_SETTING
 *      隐藏项 7），ere 侧无落点恒关闭 → 无目标角色可运行本口上。
 *
 * 原作缺陷（#14 第九批登记）：:27 判定读 `CFLAG:LOCAL:10`（LOCAL 是
 * 函数内局部变量、调用时不初始化，读的是残留角色号的 CFLAG:10），:30
 * 写入 `CFLAG:201`（TARGET 角色）——判定与写入对象不一致。1:1 不修。
 *
 * 注意：本产物是转译器初稿，下述转译并不等于「复核通过」——判定为不
 * 实现的文件不需要逐条处理 REVIEW 清单；REVIEW 清单保留，防止未来被
 * 当作已复核产物。若未来丽塔口上票落地，须回到源文件逐字对照重做。
 *
 * == 已有门面名的下标（复核时可升级为门面读写，裁定一） ==
 *   flag:7 = 口上开关（facade-names）
 *
 * == 复核标记（1 处） ==
 * 本文件由 tools/kojo-transpiler.js 生成。以下位置是机械转换无法
 * 确定的，须 agent 逐字对照 ERB 源复核（裁定 7：agent 逐字对照，
 * 不是抽查）。复核成果 = 在本文件内改写成最终形态，并把本 REVIEW
 * 清单逐条删掉；转译器默认不覆盖本文件（产物边界，issue #10），
 * 复核成果不会被重跑覆盖。
 *   1. :18 同名函数 @EVENTTRAIN 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTTRAIN', …) 注册，参照 ere/kojo/kojo-k5.js
 *
 * == J41 追加注 ==
 * 转译器把 `EX_FLAG:223` 译成 `ex_flag:${target}:223`（角色位）——这是
 * 转译器的猜测，原作 EX_FLAG 是全局 SAVEDATA 数组（#DIM SAVEDATA
 * EX_FLAG,10000），无角色位。本文件判定不实现，此转译不修正；若未来
 * 落地须按全局数组语义改写。`CFLAG:${local}:10` 同理是转译器对
 * `CFLAG:LOCAL:10` 的直译（LOCAL 局部变量非角色号），缺陷见上。
 */

'use strict';

// 需要复核 agent 补的导入（产物初稿不 require，保真锁会红）：
// const era = require('#/era-electron');
// const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
// const { chara_callname } = require('#/utils/callname-utils');
// 以及 target_name / player_name / assi_name / master_name / sc() / scf()
// 的取值（%SAVESTR:TARGET% 等插值的 JS 侧表达式）。



// @EVENTTRAIN // :4
async function EVENTTRAIN() {
  // #PRI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :5
  // EX_FLAG:223  = 1（变量语义：EX_FLAG 族，223） // :6
  era.set(`ex_flag:${target}:223`, 1); // :6
  if (era.get('flag:7') == 0) { // :8
    // FLAG:7  = 2（变量语义：FLAG 族，7） // :8
    era.set('flag:7', 2); // :8
  } // :8

}

// @EVENTEND // :10
async function EVENTEND() {
  // #LATER（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :11
  // EX_FLAG:223  = 0（变量语义：EX_FLAG 族，223） // :12
  era.set(`ex_flag:${target}:223`, 0); // :12





}

// @EVENTTRAIN // :18
async function EVENTTRAIN() {
  if (era.get('flag:7') <= 0) { // :20
    return 0; // :20
  } // :20
  if (era.get(`ex_talent:${target}:223`) != 1) { // :22
    return 0; // :22
  } // :22




  if (era.get(`cflag:${local}:10`) == 0) { // :27
    era.drawLine(); // :28
    await era.printAndWait(`口上测试`); // :29
    // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :30
    era.set(`cflag:${target}:201`, 1); // :30
    return 1; // :31
  } // :32
}

// ===== 复核清单（转译器生成，agent 逐条处理后删除） =====
// 1. :18 同名函数 @EVENTTRAIN 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTTRAIN', …) 注册，参照 ere/kojo/kojo-k5.js
