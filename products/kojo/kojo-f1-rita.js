/* eslint-disable no-undef, no-unused-vars, no-irregular-whitespace, no-redeclare, no-unreachable, no-dupe-else-if */
/**
 * @file EVENT_F1_丽塔.ERB 的口上转译产物（issue #107 原型，待复核）
 *
 * 源: target/ERB/口上/EVENT_F1_丽塔.ERB
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
