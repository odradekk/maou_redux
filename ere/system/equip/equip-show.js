/**
 * @file 装备详情显示：@EQUIP_ST_SHOW、@SHOW_BUTTON_EQUIP、
 * @CHECK_ABLE_TO_SHOW_EQUIP（issue #546）。
 *
 * 源: target/ERB/其他/EQUIP.ERB  @EQUIP_ST_SHOW（:1030-1071）
 *     @SHOW_BUTTON_EQUIP（:1074-1087）
 *     @CHECK_ABLE_TO_SHOW_EQUIP（:1090-1113，#FUNCTION 式）
 *
 * 调用方：ere/page/page-chara-info.js 的 CHARA_INFO_INDIVIDUAL——[16] 按钮在
 * sub_page 1/2 的操作行（原作 :880），详情正文在 CASE 16（原作 :1070-1074：
 * CALL EQUIP_ST_SHOW 后 WAIT，再 GOTO DRAW_PAGE 整页重绘；行首的
 * `LOCAL = LINECOUNT` 是死赋值，无人再读）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - `PRINTFORM [{NUM}] 装备情报\u3000`（尾部全角空格）升级为 era.printButton（本项目通例，
 *     #384 改名按钮同款）：引擎的 input 只接受本轮已打印按钮的快捷键
 *     （#129），纯文字 [16] 在 ere 里点不进也敲不进；按钮正文不写 [16]
 *     前缀（AGENTS.md 硬约束，PR #30 实显 [0] [0] 的教训），尾部全角
 *     空格照抄（:1085）。
 *   - EQUIP_ST_SHOW 的名称行：原作 CALL PRINT_EQUIPTYPE_WEAPON 后接
 *     `PRINTL  `（两个半角空格收行）——引擎每次 print 调用即结束一行
 *     （equip-print.js 文件头），这里用其整行出口 print_equiptype_weapon
 *     一次合成；行尾两个空格是尾随空白，渲染无差别，不镜像。
 *   - `*带有诅咒`（SIF W:5，:1042-1043）机制上可达：武装槽里存了名称表的
 *     空名段（识别号 53-60，EQUIP_WEAPON_NAMES 里是 '' 不是 undefined）时，
 *     名称臂不触发 40 号剑重置，查表落 ELSE 黑戒指行（诅咒 1）——名称行是
 *     空串、随后印诅咒行。当前的 CFLAG:550 写入方（chara-make/ex-item 等）
 *     都不产出 53-60（原作预留段），但机制与毒/火位同款，测试与变异
 *     M11547 钉住这条路径。
 *   - 原作 :1086 的 RESETCOLOR 不镜像：ere 侧按钮配色由 printButton 的
 *     config.color 直通（#384 先例），本函数没有需要复位的前置着色。
 *   - @SHOW_BUTTON_EQUIP 的两处 RETURN 0（:1082-1083/:1086-1087）不设返回值：
 *     不读（与 equip_st_show 的恒 2「1:1 保留」不同——那边原作 RETURN 2
 *     同样无人读，保留它只为 1:1；按钮侧连值都恒 0，`@returns {void}` 即可）。
 */

'use strict';

const era = require('#/era-electron');
const { equip_database } = require('#/system/equip/equip-lookup');
const { equip_powerup } = require('#/system/equip/equip-check');
const { print_equiptype_weapon } = require('#/system/equip/equip-print');

/**
 * @CHECK_ABLE_TO_SHOW_EQUIP（:1090-1113，#FUNCTION 式）：角色装备状态是否
 * 可见的五道 OR。返回值语义沿用原作：0 = 可见（任一道成立即 RETURNF 0），
 * 1 = 不可见（「見せられないよ」）。
 *
 * 五道判据（CFLAG/ABL/TALENT 的下标含义见注释）：
 *   CFLAG:x:0  可出售（> 0 即可看）
 *   CFLAG:x:2  信赖度（≥ 20 即可看）
 *   ABL:x:10   顺从（> 0 即可看）
 *   TALENT:x:28 爱表现（引人注目即可看）
 *   CFLAG:x:151 善恶值（カルマ，≤ 0 即可看）
 *
 * @param {number} cid 角色 ID（原作 ARG）
 * @returns {0|1}
 */
function check_able_to_show_equip(cid) {
  // :1097 売却可なら見れる
  if ((era.get(`cflag:${cid}:0`) || 0) > 0) {
    return 0;
  }
  // :1100 信頼度20以上なら見れる
  if ((era.get(`cflag:${cid}:2`) || 0) >= 20) {
    return 0;
  }
  // :1103 従順1以上なら見れる
  if ((era.get(`abl:${cid}:10`) || 0) > 0) {
    return 0;
  }
  // :1106 目立ちたがりなら見れる
  if (era.get(`talent:${cid}:28`) || 0) {
    return 0;
  }
  // :1109 カルマ0以下なら見れる
  if ((era.get(`cflag:${cid}:151`) || 0) <= 0) {
    return 0;
  }
  // :1113 見せられないよ
  return 1;
}

/**
 * @SHOW_BUTTON_EQUIP（:1074-1087）：角色详情页 sub_page 1/2 操作行里的
 * [16] 装备情报按钮。判定不可见时整个按钮不渲染（:1081-1084 RETURN 0）。
 * @param {number} num 按钮快捷键编号（原作 NUM，调用点恒 16）
 * @param {number} cid 角色 ID（原作 ARG）
 * @returns {void}
 */
function show_button_equip(num, cid) {
  // :1080 LOCAL = CHECK_ABLE_TO_SHOW_EQUIP(ARG)
  if (check_able_to_show_equip(cid) === 1) {
    return; // :1081-1084 条件に合わないならボタン自体を表示しない
  }
  // :1085 PRINTFORM [{NUM}] 装备情报 + 全角空格（尾部空格照抄）
  era.printButton('装备情报\u3000', num);
}

/**
 * @EQUIP_ST_SHOW（:1030-1071）：把角色武装槽（CFLAG:550）里装备的能力
 * 打印成状态行。名称行由 PRINT_EQUIPTYPE_WEAPON 拆码打印（未知识别号
 * 就地重置成 40 号剑），随后 EQUIP_DATABASE 查表、EQUIP_POWERUP 按角色
 * 素质强化，再逐条 SIF 输出。
 *
 * W 列的 ere 等价物是按次新建的装备记录（equip-lookup.js 文件头），列名
 * 见 ere/data/equip-database.js：诅咒/特殊/伤害强化/失手率/气力回复/
 * 连击率/防御伤害/气力伤害。
 *
 * @param {number} cid 角色 ID（原作 ARG:0）
 * @returns {number} 恒 2（:1071 RETURN 2；调用方不读，1:1 保留）
 */
function equip_st_show(cid) {
  // :1035 W:0 = CFLAG:ARG:550（武装槽）
  const w = { 存储编号: era.get(`cflag:${cid}:550`) || 0 };

  // :1037-1038 名称行（PRINT_EQUIPTYPE_WEAPON + PRINTL 收行）
  print_equiptype_weapon(w);
  // :1039-1040 查表 + 按角色素质强化（记录的后续 SIF 全读强化后的值）
  equip_database(w);
  equip_powerup(w, cid);

  // :1042-1043 SIF W:5：空名段（53-60）走 ELSE 黑戒指行时可见，见文件头
  if (w.诅咒) {
    era.print('*带有诅咒');
  }
  // :1044-1051 W:6 的毒/火/寒冰/电四个特殊位
  if (w.特殊 & 1) {
    era.print('*带有毒液');
  }
  if (w.特殊 & 2) {
    era.print('*带火');
  }
  if (w.特殊 & 4) {
    era.print('*带寒冰');
  }
  if (w.特殊 & 8) {
    era.print('*带电');
  }
  // :1056-1069 六列战斗修正的七条显示行（气力回复正负两臂；=100 的防御/
  // 气力伤害两列不显示）
  if (w.伤害强化) {
    era.print(`*${w.伤害强化}的打击力`);
  }
  if (w.失手率) {
    era.print(`*${w.失手率}％概率打偏`);
  }
  if (w.气力回复 > 0) {
    era.print(`*恢复${w.气力回复}气力`);
  }
  if (w.气力回复 < 0) {
    era.print(`*消费${w.气力回复 * -1}气力`);
  }
  if (w.连击率) {
    era.print(`*${w.连击率}％概率二连击`);
  }
  if (w.防御伤害 !== 100) {
    era.print(`*打击防御${w.防御伤害}％`);
  }
  if (w.气力伤害 !== 100) {
    era.print(`*打击气力${w.气力伤害}％`);
  }

  return 2;
}

module.exports = {
  check_able_to_show_equip,
  show_button_equip,
  equip_st_show,
};
