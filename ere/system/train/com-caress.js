/**
 * @file 爱抚系指令族（0-9）：@COM0-9 真身 + @COM_ABLE0-9 可用性判定 +
 * @TRAIN_MESSAGE_B/A 的本族分支 + @GET_ADV_COM 的本族升格规则
 * （issue #219 / J9——轴 A 十二族票的第一张，四样装齐的形状由本票定型）。
 *
 * 源: target/ERB/調教相關/COMF0_愛撫.ERB    @COM0（:7-168，#45 落地、
 *     #219 自 com0-caress.js 搬入本族模块——DispatchFamily 的重复注册守卫
 *     使「保留旧文件另注册」不可行，且 #209 裁定 6 要求一族四样同文件）
 *     target/ERB/調教相關/COMF1_クンニ.ERB   @COM1（:8-86）
 *     target/ERB/調教相關/COMF2_アナル愛撫.ERB @COM2（:8-152）
 *     target/ERB/調教相關/COMF3_自慰.ERB     @COM3（:14-379）+ @COM3_AUTO
 *     target/ERB/調教相關/COMF4_フェラする.ERB @COM4（:9-75）+ @EVENT_SEITSU
 *     target/ERB/調教相關/COMF5_胸愛撫.ERB   @COM5（:11-103）+ @EVENT_JUNYU
 *     target/ERB/調教相關/COMF6_キス.ERB     @COM6（:9-330）
 *     target/ERB/調教相關/COMF7_秘貝開帳.ERB @COM7（:10-245）
 *     target/ERB/調教相關/COMF8_指挿入れ.ERB @COM8（:7-146）
 *     target/ERB/調教相關/COMF9_アナル舐め.ERB @COM9（:7-63）
 *     target/ERB/調教相關/COMABLE.ERB        @COM_ABLE0-9（:28-381）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB  SELECTCOM 0-9 分支
 *     （:28-782；0 分支 #45 落地、#219 自 train-message.js 移入本族模块）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB  SELECTCOM 1/2/3/5 分支
 *     （:813-985；源侧无 4/6/7/8/9 分支——链落空、零输出，注册空 handler）
 *     target/ERB/調教相關/COMF_JUMP.ERB      @GET_ADV_COM 的 CASE 6/1/3/4/5/8
 *     （爱抚族的升格规则；0/2/7/9 无 CASE，原样返回）
 *
 * == 变量承载（ere 等价物，com0-caress.js 既有注记随搬） ==
 *
 *   - SOURCE:xx → `source:${cid}:${xx}`（nextTurnInTrain 每回合清零）；
 *   - LOSEBASE:0/1 → `deltabase:${cid}:0/1` 的负值累加，结算在回合循环；
 *   - UP:xx（TRAIN_MESSAGE_A 读）→ `delta:${cid}:${xx}`（nextTurnInTrain
 *     结算 delta→palam，A 文在其前运行，读数与原作同位）；
 *   - A/S/Y（Emuera 全局单字母变量）：COM3/6/7 判定段的累加值。
 *     COM_ORDER 以参数显式传递（#214 接触面）；**COM3 的 A/V 与 COM6 的 Y
 *     跨 CALL TRAIN_MESSAGE_B 存活**（B 分支 3 读 A/V、COM6 的 SOURCE:8
 *     读判定段算出的 Y），以本模块的 last_order 状态承载——原作里
 *     TRAIN_MESSAGE_B 只被 SELECTCOM 对应的 @COMn 在判定段之后调用
 *     （全库唯一调用形态），无跨指令残留读取，模块态无歧义；
 *   - MASTER 恒为角色 0（CONTEXT.md，event-train.js 同款注记）。
 *
 * == 输出形状（一次 print 一行，PR #30/#53 通则） ==
 *
 * COMF 的 PRINT/PRINTS/PRINTV/PRINTFORM 系是**行内追加**（Emuera 到 PRINTL
 * 才收行），ere 引擎每次 print 调用即一行——同源一行的输出在 ere 侧合成
 * 一次调用。判定段（COM_ORDER 明细 + 本指令贡献 + 合计 + 实行值）在原作
 * 是一行（golden train-natural:169 实证），故 com_order 自 #219 起改为
 * **返回段落数组、不自行打印**，由调用方拼接后一次 print；Emuera 日志按
 * 终端宽折行产生的两物理段与 ere 整行的形态差是记名差异（同点线近似，
 * 归因见 tools/compare/rules.js 判定行规则）。
 *
 * 本文件存根/登记的原作函数（docs/stub-registry.md 必须收录每一个）：
 *   - COM0_AUTO / COM3_AUTO（COMF0:174 / COMF3:381 起）——CALLTRAIN 自动
 *     调教未移植，登记不可达（#218 交付骨架后接线）。
 *
 * CONFIRM_LOST_VIRGIN（COMF_VAGINASEX.ERB:6，COM8 头部调用）不是存根：
 * #216 落真身于 com-vaginasex.js，本票接线（com8 头部直调）。
 *
 * == 升格规则的缺失语义 ==
 *
 * 规则挂可直选空间（#213）；规则体内的 `CALL COM_ABLE<目标>` 探测高级 COM
 * 的可用性——目标族票（J15/J16/J19）未落地期间 com_able 族缺号，以
 * whenMissing: 0 落空（复核不过 → 不升格），族票落地即自动接通。规则体的
 * 副作用（FLAG:71 / TFLAG:42）在本族六个 CASE 里不存在（源码核实，体位族
 * 的 CASE 20-34 才有）。COMF 头部的 JUMPFORM COM{RESULT}：目标未移植时以
 * COM_MISSING 哨兵上抛，回合循环按「重新要求输入」丢弃本回合（引擎对
 * 未定义 @COMxx 的语义，train-loop.js 步骤 12）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { chara } = require('#/facade/chara');
const { stub_line } = require('#/utils/stub-line');
const { chara_callname } = require('#/utils/callname-utils');
const { e_get, monster_name } = require('#/dungeon/monster-data');
const {
  clothtype_main2_text,
  clothtype_special_text,
} = require('#/page/page-clothtype');
const { com_order } = require('#/system/train/com-order');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const {
  COM_MISSING,
  com_able_family,
  com_family,
} = require('#/system/train/com-family');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { confirm_lost_virgin } = require('#/system/train/com-vaginasex');

/**
 * 本文件存根化的原作函数名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。
 */
const STUBBED_CALLS = ['COM0_AUTO', 'COM3_AUTO'];

// —— 纯数据表（错一格不会报错——每档的用例与变异条目固定住） ——

// EXPLV：Emuera 内建经验等级阈值（_replace.csv 未改此键，默认值见
// config.md「EXPLVの初期値」：0,1,4,20,50,200,400,700,1000,1500,2000）
const EXPLV = [0, 1, 4, 20, 50, 200, 400, 700, 1000, 1500, 2000];

/** TIMES X, m：整数乘小数后截断（math-etc.md；source-check.js 同款） */
const times = (v, m) => Math.floor(v * m);

// COM0（COMF0:32-72）ABL:0/1 分档 → [SOURCE:0, SOURCE:3] / [SOURCE:17, SOURCE:3 增量]
const ABL_C_TIERS_COM0 = [
  [20, 25],
  [100, 50],
  [500, 80],
  [1200, 100],
  [2000, 115],
  [2800, 125],
];
const ABL_B_TIERS_COM0 = [
  [15, 25],
  [50, 50],
  [300, 80],
  [700, 100],
  [1100, 115],
  [1600, 125],
];

// COM1（COMF1:37-46）ABL:0 → SOURCE:0
const ABL_C_TIERS_COM1 = [40, 160, 700, 1500, 2400, 3300];

// COM2（COMF2:33-46）ABL:3 → [SOURCE:2, SOURCE:13]
const ABL_A_TIERS_COM2 = [
  [20, 300],
  [75, 350],
  [300, 400],
  [700, 650],
  [1100, 1000],
  [1500, 1500],
];

// COM3（COMF3:226-244）ABL:0 → [SOURCE:0, SOURCE:12, SOURCE:13]（通常态）
const ABL_C_TIERS_COM3 = [
  [15, 2000, 500],
  [50, 2300, 800],
  [300, 2600, 1200],
  [700, 2900, 1900],
  [1100, 3200, 2500],
  [1600, 3500, 3000],
];
// COM3（COMF3:332-352 淋浴态）ABL:0 → [SOURCE:0, SOURCE:12, SOURCE:13]
const ABL_C_TIERS_COM3_SHOWER = [
  [150, 1000, 50],
  [400, 1300, 80],
  [800, 1600, 120],
  [1200, 1900, 190],
  [1500, 2200, 250],
  [1800, 2500, 300],
];
// COM3（COMF3:247-263/279-295）ABL:2/3 → [A|B 累加, D 累加]（振动/后庭振动共用）
const ABL_VA_TIERS_COM3 = [
  [40, 150],
  [120, 400],
  [300, 700],
  [500, 900],
  [650, 1000],
  [850, 1200],
];
// COM3（COMF3:354-363 淋浴态）ABL:2 → [SOURCE:1, D]
const ABL_V_TIERS_COM3_SHOWER = [
  [0, 0],
  [100, 300],
  [200, 400],
  [300, 500],
  [400, 600],
  [500, 700],
];
// COM3（COMF3:344-361 淋浴态）ABL:3 → [B 赋值, D 累加]
const ABL_A_TIERS_COM3_SHOWER = [
  [40, 150],
  [120, 400],
  [300, 700],
  [500, 900],
  [650, 1000],
  [850, 1200],
];

// COM4（COMF4:25-34）ABL:0 → SOURCE:0
const ABL_C_TIERS_COM4 = [50, 200, 800, 1600, 2400, 3200];

// COM5（COMF5:27-38）ABL:1 → [SOURCE:17, SOURCE:3]
const ABL_B_TIERS_COM5 = [
  [20, 50],
  [100, 100],
  [500, 160],
  [1200, 200],
  [2000, 230],
  [2800, 250],
];

// COM6（COMF6:180-213）ABL:16 → [SOURCE:4, SOURCE:5, SOURCE:8 系数]
const ABL_SERVE_TIERS_COM6 = [
  [50, 10, 4.0],
  [150, 50, 2.5],
  [200, 100, 1.5],
  [250, 180, 1.0],
  [300, 300, 0.5],
  [350, 500, 0.1],
];
// COM6（COMF6:215-236）ABL:12 → [SOURCE:4 系数, SOURCE:5 系数]
const ABL_SKILL_TIERS_COM6 = [
  [0.5, 0.5],
  [0.8, 0.8],
  [1.0, 1.0],
  [1.5, 1.5],
  [2.5, 2.5],
  [4.0, 4.0],
];
// COM6（COMF6:238-263 兽奸态）ABL:39 → SOURCE:8 系数 / [SOURCE:3, SOURCE:10]
const ABL_DOG_TIERS_COM6 = [
  null, // LV0：仅 ×2.00，无 SOURCE:3/10 写入
  null, // LV1：仅 ×1.00
  [0, 0, 0.8], // LV2：TFLAG:100 = 1
  [100, 0, 0.5], // LV3
  [300, 100, 0.3], // LV4
  [800, 200, 0.1], // LV5+
];

// COM7（COMF7:143-156）ABL:2 → [SOURCE:12, SOURCE:13]
const ABL_V_TIERS_COM7 = [
  [1500, 300],
  [1800, 600],
  [2100, 1000],
  [2400, 1500],
  [2700, 2100],
  [3000, 2800],
];
// COM7（COMF7:158-167）ABL:16 → [SOURCE:4, SOURCE:5]
const ABL_SERVE_TIERS_COM7 = [
  [100, 50],
  [150, 100],
  [200, 200],
  [250, 300],
  [300, 500],
  [350, 750],
];
// COM7（COMF7:169-182）ABL:17 → [SOURCE:7 增量, SOURCE:12 系数, SOURCE:5 系数]
const ABL_EXPO_TIERS_COM7 = [
  [0, 1.0, 1.0],
  [100, 1.2, 1.2],
  [300, 1.4, 1.4],
  [800, 1.6, 1.6],
  [1500, 2.0, 2.0],
  [2500, 3.0, 3.0],
];

// COM8（COMF8:24-39）ABL:2 → [SOURCE:1, SOURCE:13]
const ABL_V_TIERS_COM8 = [
  [10, 150],
  [50, 250],
  [250, 400],
  [600, 700],
  [1200, 1300],
  [1800, 2000],
];

// COM9（COMF9:21-29）ABL:3 → SOURCE:2
const ABL_A_TIERS_COM9 = [5, 50, 200, 500, 1000, 1800];

// —— 共享读取助手（#13：未声明下标读值得 undefined，一律 || 0 / ?? '' 兜底） ——

/** 目标/调教者的 SOURCE 读写 */
function make_src_helpers(cid) {
  return {
    src: (idx) => era.get(`source:${cid}:${idx}`) || 0,
    set: (idx, v) => era.set(`source:${cid}:${idx}`, v),
  };
}

/** LOSEBASE:0/1 → deltabase 负向累加（引擎 base += deltabase 并钳位） */
const lose = (cid, i, v) => era.add(`deltabase:${cid}:${i}`, -v);

/** 目标角色的 TEQUIP 读数（装备位；写入点在装备族票，读跨域放行） */
const tequip = (idx) => era.get(`tequip:${era_flag.target}:${idx}`) || 0;

/** 汚れ双向移动：a |= b 后 b |= a，两边同为原两值的按位或（com0 同款） */
function stain_exchange(cid_a, idx_a, cid_b, idx_b) {
  const merged =
    (era.get(`stain:${cid_a}:${idx_a}`) || 0) |
    (era.get(`stain:${cid_b}:${idx_b}`) || 0);
  era.set(`stain:${cid_a}:${idx_a}`, merged);
  era.set(`stain:${cid_b}:${idx_b}`, merged);
}

/**
 * 百合/断背经验的共用段（COMF 各指令的经验上昇部，写入走 chara 门面——
 * exp:40/41 属主 train，raw 亦可，门面保持与 0/1/10/11/50 一致的写法）。
 * @param {number} target 目标
 * @param {number} player 调教者
 * @param {number} yuri 百合经验增量
 * @param {number} [homo] 断背经验增量（源侧无断背支的指令不传 = 无该支）
 */
function print_same_sex_exp(target, player, yuri, homo) {
  const target_male = era.get(`talent:${target}:122`);
  const player_male = era.get(`talent:${player}:122`);
  if (!target_male && !player_male) {
    era.print(`百合经验+${yuri}`); // PRINTS EXPNAME:40 / PRINTL +n
    era.add(`exp:${target}:40`, yuri);
  } else if (homo !== undefined && target_male && player_male) {
    era.print(`断背经验+${homo}`);
    era.add(`exp:${target}:41`, homo);
  }
}

/**
 * 爱情经验的共用段（CFLAG:2 好感度累计 ≥ 1000 且主人亲自调教才发生）。
 * @param {number} target 目标
 * @param {number} e 增量（调用方先按指令规则组好 E）
 */
function print_love_exp(target, e) {
  if ((era.get(`cflag:${target}:2`) || 0) >= 1000 && era_flag.assiplay === 0) {
    era.print(`爱情经验+${e}`); // PRINTFORML %EXPNAME:23%+{E}
    era.add(`exp:${target}:23`, e);
  }
}

/**
 * 调教者的初吻记录（COMF1/4/6/9：CFLAG:PLAYER:16 == -1 时按指令置码位并
 * 记录对象名；码位 301/201/401/1 各指令自传）。
 * @param {number} player 调教者
 * @param {number} target 目标
 * @param {number} code CFLAG:PLAYER:16 的写入值
 */
function record_player_first_kiss(player, target, code) {
  if ((era.get(`cflag:${player}:16`) || 0) === -1) {
    era.set(`cflag:${player}:16`, code);
    era.set(`cstr:${player}:4`, chara_callname(target)); // CSTR:4 = %SAVESTR:TARGET%
  }
}

// COMF 头部的升格跳转（LOCAL = n / CALL GET_ADV_COM / SIF RESULT != LOCAL /
// JUMPFORM COM{RESULT}）：目标未移植时 COM_MISSING 上抛，回合循环丢弃本回合。
async function jump_advanced(n) {
  const adv = await get_adv_com(n);
  if (adv === n) {
    return false;
  }
  return com_family.call(adv, { whenMissing: COM_MISSING });
}

/**
 * @COM0（COMF0_愛撫.ERB:7-168，#45 落地的爱抚，函数体随 #219 搬入族模块）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com0() {
  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);

  era.print('爱抚'); // :9 PRINTL（;SAVESTR:22 = 爱抚 在原作已是注释，不移植）
  await train_message_b(); // :11

  // —— ソースの計算 ——
  lose(target, 0, 5); // :16-17
  lose(target, 1, 50);

  // :20-30 基础源：阴核/乳房/情爱 先清 0（指令内的「= 0」在 ere 由回合清零
  // 承担，此三行不落）；性行动/不洁/露出 直接赋值
  set(4, 60); // :33
  set(8, 30); // :34
  set(12, 100); // :35

  // :36-55 ABL:0（阴蒂感觉）分档
  const abl_c = Math.min(Math.floor(era.get(`abl:${target}:0`) || 0), 5);
  set(0, ABL_C_TIERS_COM0[abl_c][0]);
  set(3, ABL_C_TIERS_COM0[abl_c][1]);

  // :56-75 ABL:1（乳房感觉）分档（SOURCE:3 是增量累加）
  const abl_b = Math.min(Math.floor(era.get(`abl:${target}:1`) || 0), 5);
  set(17, ABL_B_TIERS_COM0[abl_b][0]);
  set(3, src(3) + ABL_B_TIERS_COM0[abl_b][1]);

  // :76-121 接吻侧修正。:122-128（口污 + ASSIPLAY）与 :130-134（口塞）整支
  // 登记存根（见文件头）：当前构建 ASSIPLAY 恒 0、TEQUIP:45 无写入点。
  if ((era.get(`cflag:${target}:16`) || 0) === -1) {
    // :136-140 初吻未体験 → 回避接吻，效果减
    set(8, 0); // :141
    set(0, Math.floor(src(0) / 2)); // :142
    set(3, Math.floor(src(3) / 4)); // :148
    set(10, Math.floor(src(10) / 2)); // :149
  } else {
    // :150-174 已有接吻经验：素质修正 + 主人口污加成 + 口污双向移动
    if (era.get(`talent:${target}:61`)) {
      set(8, Math.floor(src(8) / 4)); // :176-177 不怕污臭
    }
    if (era.get(`talent:${target}:62`)) {
      set(8, src(8) * 3); // :181-182 反感污臭
    }
    if (era.get(`talent:${target}:15`)) {
      set(8, src(8) * 2); // :185-186 高姿态
    }
    if (era.get(`talent:${target}:85`) && era_flag.assiplay === 0) {
      set(3, src(3) * 2); // :187-190 爱慕且主人亲自调教
      set(8, Math.floor(src(8) / 10));
    }
    if (era.get(`stain:${player}:0`)) {
      set(8, Math.floor((src(8) * 3) / 2)); // :191-195 主人口有污垢 → 150%
    }
    stain_exchange(target, 0, player, 0); // :198-200 口 ⇔ 口
  }

  // :201-203 兽奸提前返回（TEQUIP:89）——装备系存根，登记不落

  // —— 汚れの処理（:204-221）——
  // :222-227 触手污れ（TEQUIP:90）整支登记存根；ELSE 支 1:1：
  stain_exchange(target, 3, player, 1); // :228-230 V ⇔ 指
  stain_exchange(target, 5, player, 1); // :231-233 B ⇔ 指

  // —— 経験上昇（:144-165）——
  print_same_sex_exp(target, player, 5, 5); // :148-156 百合/断背同额
  print_love_exp(target, 2); // :158-166（:160 E = 2）

  return 1; // :168
}

/**
 * @COM1（COMF1_クンニ.ERB:8-86）舔阴。
 * @returns {Promise<number>} 原作 RETURN 1（升格跳转时为跳转目标的返回值）
 */
async function com1() {
  // :12-17 头部升格跳转（LOCAL = 1 → CASE 1：前回合口交/强制舔阴/六九式 → 69）
  const jumped = await jump_advanced(1);
  if (jumped !== false) {
    return jumped;
  }

  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);

  era.print('舔阴'); // :19
  await train_message_b(); // :21

  lose(target, 0, 5); // :26
  lose(target, 1, 50); // :27

  set(10, 100); // :29
  set(12, 220); // :30
  set(14, 50); // :31

  // :34-43 ABL:0（阴蒂感觉）分档 → SOURCE:0
  const abl_c = Math.min(Math.floor(era.get(`abl:${target}:0`) || 0), 5);
  set(0, ABL_C_TIERS_COM1[abl_c]);

  // :44-47 调教者擅用舌头（TALENT:PLAYER:52）或兽奸（TEQUIP:89）
  if (era.get(`talent:${player}:52`) || tequip(89)) {
    set(0, times(src(0), 2.0));
    set(16, src(16) + Math.floor(src(0) / 20));
  }

  // :49-50 兽奸提前返回
  if (tequip(89)) {
    return 1;
  }

  stain_exchange(target, 3, player, 0); // :51-52 V ⇔ 口

  // :55-59 百合经验（源侧无断背支）
  print_same_sex_exp(target, player, 3);
  record_player_first_kiss(player, target, 301); // :62-65

  print_love_exp(target, 1); // :69-73 E = 1

  return 1; // :76
}

/**
 * @COM2（COMF2_アナル愛撫.ERB:8-152）肛门爱抚。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com2() {
  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);

  era.print('肛门爱抚'); // :9
  await train_message_b(); // :11

  lose(target, 0, 20); // :16
  lose(target, 1, 100); // :17

  set(12, 850); // :19
  set(14, 200); // :20

  // :23-43 ABL:3（肛门感觉）分档 → [SOURCE:2, SOURCE:13]
  const abl_a = Math.min(Math.floor(era.get(`abl:${target}:3`) || 0), 5);
  set(2, ABL_A_TIERS_COM2[abl_a][0]);
  set(13, ABL_A_TIERS_COM2[abl_a][1]);

  // :44-65 EXP:1（肛门经验）分档 → [SOURCE:2/13 系数, SOURCE:6, SOURCE:14 增量]
  const exp_a = era.get(`exp:${target}:1`) || 0;
  if (exp_a < EXPLV[1]) {
    set(2, times(src(2), 0.2));
    set(13, times(src(13), 0.2));
    set(6, 500);
    set(14, src(14) + 200);
  } else if (exp_a < EXPLV[2]) {
    set(2, times(src(2), 0.5));
    set(13, times(src(13), 0.5));
    set(6, 400);
    set(14, src(14) + 100);
  } else if (exp_a < EXPLV[3]) {
    set(2, times(src(2), 1.0));
    set(13, times(src(13), 1.0));
    set(6, 300);
    set(14, src(14) + 50);
  } else if (exp_a < EXPLV[4]) {
    set(2, times(src(2), 1.2));
    set(13, times(src(13), 1.2));
    set(6, 200);
  } else if (exp_a < EXPLV[5]) {
    set(2, times(src(2), 1.6));
    set(13, times(src(13), 1.6));
    set(6, 100);
  } else {
    set(2, times(src(2), 1.8));
    set(13, times(src(13), 1.8));
    set(6, 50);
  }

  // :66-81 PALAM:3（润滑）分档 → [SOURCE:2/13 系数, SOURCE:6 系数]
  const palam_lube = era.get(`palam:${target}:3`) || 0;
  if (palam_lube < PALAMLV[1]) {
    set(2, times(src(2), 0.1));
    set(13, times(src(13), 0.1));
    set(6, times(src(6), 3.0));
  } else if (palam_lube < PALAMLV[2]) {
    set(2, times(src(2), 0.2));
    set(13, times(src(13), 0.2));
    set(6, times(src(6), 2.0));
  } else if (palam_lube < PALAMLV[3]) {
    set(2, times(src(2), 0.6));
    set(13, times(src(13), 0.6));
    set(6, times(src(6), 1.0));
  } else if (palam_lube < PALAMLV[4]) {
    set(2, times(src(2), 1.0));
    set(13, times(src(13), 1.0));
    set(6, times(src(6), 0.5));
  } else {
    set(2, times(src(2), 2.0));
    set(13, times(src(13), 2.0));
    set(6, times(src(6), 0.1));
  }

  // :82-93 PALAM:5（欲情）分档 → SOURCE:2/13 系数
  const palam_lust = era.get(`palam:${target}:5`) || 0;
  const lust_m =
    palam_lust < PALAMLV[1]
      ? 0.3
      : palam_lust < PALAMLV[2]
        ? 0.6
        : palam_lust < PALAMLV[3]
          ? 1.0
          : palam_lust < PALAMLV[4]
            ? 1.3
            : 1.6;
  set(2, times(src(2), lust_m));
  set(13, times(src(13), lust_m));

  // :94-96 小人体型（TALENT:263）→ SOURCE:2 ×1.50
  if (era.get(`talent:${target}:263`)) {
    set(2, times(src(2), 1.5));
  }

  // :97-106 肛门敏感（105）/钝感（106）→ SOURCE:6/13/14 系数
  const a_sensitive = era.get(`talent:${target}:105`)
    ? 1.5
    : era.get(`talent:${target}:106`)
      ? 0.6
      : null;
  if (a_sensitive) {
    set(6, times(src(6), a_sensitive));
    set(13, times(src(13), a_sensitive));
    set(14, times(src(14), a_sensitive));
  }

  // :107-110 处女且看重贞操 → SOURCE:13 ×0.80 / SOURCE:14 ×0.50
  if (era.get(`talent:${target}:0`) && era.get(`talent:${target}:30`)) {
    set(13, times(src(13), 0.8));
    set(14, times(src(14), 0.5));
  }

  // :111-113 未熟（TALENT:135）→ SOURCE:6 ×2.00
  if (era.get(`talent:${target}:135`)) {
    set(6, times(src(6), 2.0));
  }

  // :115-126 汚れ：触手 → A 位 |= 2/4；否则 A ⇔ 指
  if (tequip(90)) {
    era.set(`stain:${target}:4`, (era.get(`stain:${target}:4`) || 0) | 2 | 4);
  } else {
    stain_exchange(target, 4, player, 1);
  }

  // :127-141 経験上昇：肛门经验按 ABL:3 档给 1-4
  const s = abl_a <= 1 ? 1 : abl_a <= 4 ? 2 : abl_a <= 7 ? 3 : 4; // :143-150
  chara(target).dungeon.肛门经验 += s; // :151 EXP:1 += S（exp:1 属主 dungeon，走门面）
  era.print(`肛门经验+${s}`); // :156

  print_same_sex_exp(target, player, 2, 5); // :158-164
  print_love_exp(target, 1); // :165-169

  return 1; // :173（尾行）
}

// —— 判定段共用（COM3/6/7 的「実行できるかの判定」；行形状见文件头） ——

/**
 * COM3/COM6 的 A/V/Y 跨 CALL TRAIN_MESSAGE_B 存活态（Emuera 全局单字母
 * 变量的等价物）。B 分支 3 读 A/V（COMF3 判定段的累计值/门槛），COM6 的
 * SOURCE:8 读 Y——全库唯一调用形态是「@COMn 判定段之后紧接 CALL
 * TRAIN_MESSAGE_B」，无跨指令残留读取。
 */
const order_state = { a: 0, v: 0, y: 0 };

/** 名字表读取（ablname/talentname/markname/palamname…） */
const name_of = (table, id) => era.get(`${table}:${id}`) ?? '';

/** 判定行助手：把「= A … 实行值 V」的收尾段拼进 parts（COMF3:189-201） */
function push_judge_tail(parts, a, v) {
  parts.push(` = ${a}`); // PRINT  = / PRINTV A
  parts.push(a < v ? ' < ' : a === v ? ' = ' : ' > '); // SIF 三连
  parts.push(`实行值${v}`); // PRINT 实行值 / PRINTV V
}

/**
 * @COM3（COMF3_自慰.ERB:14-379）自慰。
 * @returns {Promise<number>} 原作 RETURN 1（判定不过 RETURN 0）
 */
async function com3() {
  const target = era_flag.target;
  const player = era_flag.player;

  // :14-31 指令名行（装备前缀 + 手淫/自慰，PRINT 累加一行）
  let title = '';
  if (tequip(53)) {
    title += '公开';
  }
  if (tequip(54)) {
    title += '野外';
  }
  if (tequip(18)) {
    title += '沐浴';
  }
  if (tequip(11) && tequip(13)) {
    title += '二穴振动';
  } else if (tequip(11)) {
    title += '振动';
  } else if (tequip(13)) {
    title += '后庭振动';
  }
  era.print(
    title +
      (tequip(53) || tequip(54) || tequip(11) || tequip(13) || tequip(18)
        ? '手淫'
        : '自慰'),
  );

  // —— :32-189 実行できるかの判定 ——
  let a = 0;
  let s = 0;
  const { a: order_a, s: order_s, parts } = await com_order(0, 0); // :190
  a = order_a;
  s = order_s;

  const abl = (i) => Math.floor(era.get(`abl:${target}:${i}`) || 0);
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const plus = () => {
    if (s) {
      parts.push(' + ');
    }
  };
  const minus = () => parts.push(' - ');

  // :194-201 ABL:11 欲望 ×3
  if (abl(11)) {
    plus();
    a += abl(11) * 3;
    parts.push(`${name_of('ablname', 11)}LV${abl(11)}(${abl(11) * 3})`);
    s = 1;
  }
  // :204-211 ABL:17 露出癖 ×4
  if (abl(17)) {
    plus();
    a += abl(17) * 4;
    parts.push(`${name_of('ablname', 17)}LV${abl(17)}(${abl(17) * 4})`);
    s = 1;
  }
  // :216-223 ABL:31 自慰中毒 ×3
  if (abl(31)) {
    plus();
    a += abl(31) * 3;
    parts.push(`${name_of('ablname', 31)}LV${abl(31)}(${abl(31) * 3})`);
    s = 1;
  }
  // :228-235 MARK:1 快乐刻印 ×3
  const mark1 = Math.floor(era.get(`mark:${target}:1`) || 0);
  if (mark1) {
    plus();
    a += mark1 * 3;
    parts.push(`${name_of('markname', 1)}LV${mark1}(${mark1 * 3})`);
    s = 1;
  }
  // :238-253 PALAM:5 欲情 ×3（L > 0 才进）
  const palam5 = era.get(`palam:${target}:5`) || 0;
  const lust_l =
    palam5 < PALAMLV[1]
      ? 0
      : palam5 < PALAMLV[2]
        ? 1
        : palam5 < PALAMLV[3]
          ? 2
          : palam5 < PALAMLV[4]
            ? 3
            : palam5 < PALAMLV[5]
              ? 4
              : 5;
  if (lust_l) {
    plus();
    a += lust_l * 3;
    parts.push(`${name_of('palamname', 5)}LV${lust_l}(${lust_l * 3})`);
    s = 1;
  }
  // :254-259 克制（TALENT:20）-5（负项不查 S）
  if (talent(20)) {
    minus();
    a -= 5;
    parts.push(`${name_of('talentname', 20)}(5)`);
    s = 1;
  }
  // :260-265 害羞（TALENT:35）-5
  if (talent(35)) {
    minus();
    a -= 5;
    parts.push(`${name_of('talentname', 35)}(5)`);
    s = 1;
  }
  // :266-272 不知羞耻（TALENT:36）+2
  if (talent(36)) {
    plus();
    a += 2;
    parts.push(`${name_of('talentname', 36)}(2)`);
    s = 1;
  }
  // :273-279 容易自慰（TALENT:60）+5
  if (talent(60)) {
    plus();
    a += 5;
    parts.push(`${name_of('talentname', 60)}(5)`);
    s = 1;
  }
  // :280-286 接受快感（TALENT:70）+5
  if (talent(70)) {
    plus();
    a += 5;
    parts.push(`${name_of('talentname', 70)}(5)`);
    s = 1;
  }
  // :288-294 否定快感（TALENT:71）-5
  if (talent(71)) {
    minus();
    a -= 5;
    parts.push(`${name_of('talentname', 71)}(5)`);
    s = 1;
  }
  // :295-301 露出狂（TALENT:89）+10
  if (talent(89)) {
    plus();
    a += 10;
    parts.push(`${name_of('talentname', 89)}(10)`);
    s = 1;
  }
  // :302-309 しあわせ草（TEQUIP:21，打印读 ITEMNAME:26 媚药）+8
  if (tequip(21)) {
    plus();
    a += 8;
    parts.push(`${name_of('itemname', 26)}(8)`);
    s = 1;
  }

  // :310-335 合计 + 実行值（公開+10、沐浴+3、振动+5、后庭振动+5）
  let v = 33; // :336
  if (tequip(53)) {
    v += 10;
  }
  if (tequip(18)) {
    v += 3;
  }
  if (tequip(11)) {
    v += 5;
  }
  if (tequip(13)) {
    v += 5;
  }
  push_judge_tail(parts, a, v);
  era.print(parts.join(''));
  await era.waitAnyKey(); // :339 WAIT

  // :161-162 実行できない
  if (a < v) {
    return 0;
  }
  order_state.a = a; // B 分支 3（TRAIN_MESSAGE_B）读 A/V
  order_state.v = v;

  await train_message_b(); // :344

  const { src, set } = make_src_helpers(target);
  lose(target, 0, 5); // :345
  lose(target, 1, 50); // :346
  set(14, 400); // :347

  let va = 0; // A（:348）
  let vb = 0; // B（:349）
  let vc = 0; // C（:350）
  let vd = 0; // D（:351）

  // :352-355 ビデオ撮影中（TEQUIP:53）
  if (tequip(53)) {
    set(10, 50);
    set(11, 100);
  }

  // :356-371 ABL:0（阴蒂感觉）→ [SOURCE:0, SOURCE:12, SOURCE:13]
  const abl_c3 = Math.min(abl(0), 5);
  set(0, ABL_C_TIERS_COM3[abl_c3][0]);
  set(12, ABL_C_TIERS_COM3[abl_c3][1]);
  set(13, ABL_C_TIERS_COM3[abl_c3][2]);

  // :372-380 ABL:1（乳房感觉）→ SOURCE:17
  const abl_b3 = Math.min(abl(1), 5);
  set(17, [15, 50, 300, 700, 1100, 1600][abl_b3]);

  // :381-408 バイブ挿入中（TEQUIP:11）
  if (tequip(11)) {
    // ABL:2 → A/D 累加
    const lvl = Math.min(abl(2), 5);
    va += ABL_VA_TIERS_COM3[lvl][0];
    vd += ABL_VA_TIERS_COM3[lvl][1];
    // EXP:0 档（处女はありえない——档仍在）→ A 系数 / C 增量
    const exp_v = era.get(`exp:${target}:0`) || 0;
    if (exp_v < EXPLV[2]) {
      va = times(va, 0.6);
      vc += 150;
    } else if (exp_v < EXPLV[3]) {
      va = times(va, 1.0);
      vc += 20;
    } else if (exp_v < EXPLV[4]) {
      va = times(va, 1.2);
    } else if (exp_v < EXPLV[5]) {
      va = times(va, 1.4);
    } else {
      va = times(va, 1.6);
    }
    // 私处敏感（103）/钝感（104）→ C/D 系数
    const m = era.get(`talent:${target}:103`)
      ? 1.5
      : era.get(`talent:${target}:104`)
        ? 0.6
        : null;
    if (m) {
      vc = times(vc, m);
      vd = times(vd, m);
    }
    set(13, src(13) + vd); // 一度単独で計算
  }

  // :409-437 アナルバイブ挿入中（TEQUIP:13）
  if (tequip(13)) {
    lose(target, 0, 30); // :438
    lose(target, 1, 80); // :439
    const lvl = Math.min(abl(3), 5);
    vb += ABL_VA_TIERS_COM3[lvl][0];
    vd += ABL_VA_TIERS_COM3[lvl][1];
    // EXP:1 档 → B 系数 / C 增量
    const exp_a3 = era.get(`exp:${target}:1`) || 0;
    if (exp_a3 < EXPLV[1]) {
      vb = times(vb, 0.5);
      vc += 1000;
    } else if (exp_a3 < EXPLV[2]) {
      vb = times(vb, 1.0);
      vc += 150;
    } else if (exp_a3 < EXPLV[3]) {
      vb = times(vb, 1.1);
      vc += 20;
    } else if (exp_a3 < EXPLV[4]) {
      vb = times(vb, 1.2);
    } else if (exp_a3 < EXPLV[5]) {
      vb = times(vb, 1.4);
    } else {
      vb = times(vb, 1.6);
    }
    const m = era.get(`talent:${target}:105`)
      ? 1.5
      : era.get(`talent:${target}:106`)
        ? 0.6
        : null;
    if (m) {
      vc = times(vc, m);
      vd = times(vd, m);
    }
    set(13, src(13) + vd); // 一度単独で計算
  }

  // :440-511 淋浴使用中（TEQUIP:18）——覆写 S0/S12/S13、S1 与 B 另计
  if (tequip(18)) {
    set(0, ABL_C_TIERS_COM3_SHOWER[abl_c3][0]);
    set(12, ABL_C_TIERS_COM3_SHOWER[abl_c3][1]);
    set(13, ABL_C_TIERS_COM3_SHOWER[abl_c3][2]);
    const lv2 = Math.min(abl(2), 5);
    set(1, ABL_V_TIERS_COM3_SHOWER[lv2][0]);
    vd = ABL_V_TIERS_COM3_SHOWER[lv2][1];
    const lv3 = Math.min(abl(3), 5);
    vb = ABL_A_TIERS_COM3_SHOWER[lv3][0];
    vd += ABL_A_TIERS_COM3_SHOWER[lv3][1];
    // 私处/肛门敏感各乘一次 SOURCE:6 与 D（源序两段各自独立，1:1 保留）
    for (const idx of [103, 104]) {
      if (era.get(`talent:${target}:${idx}`)) {
        set(6, times(src(6), idx === 103 ? 1.5 : 0.6));
        vd = times(vd, idx === 103 ? 1.5 : 0.6);
      }
    }
    for (const idx of [105, 106]) {
      if (era.get(`talent:${target}:${idx}`)) {
        set(6, times(src(6), idx === 105 ? 1.5 : 0.6));
        vd = times(vd, idx === 105 ? 1.5 : 0.6);
      }
    }
    set(13, src(13) + vd); // 一度単独で計算
  } else {
    // :512-515 ELSE：B/A/S1/S2 清零（淋浴才有的尾巴）
    vb = 0;
    set(2, 0);
    va = 0;
    set(1, 0);
  }

  // :516-531 ＶかＡが上昇するとき、SOURCE:0/17 減衰（E = ABL:2 + ABL:3）
  if (tequip(11) || tequip(13)) {
    const e = abl(2) + abl(3);
    const m =
      e <= 1
        ? 1.0
        : e <= 3
          ? 0.9
          : e <= 5
            ? 0.8
            : e <= 7
              ? 0.7
              : e <= 9
                ? 0.6
                : 0.5;
    set(0, times(src(0), m));
    set(17, times(src(17), m));
  }

  // :532-584 / :586-633 两段共用的 PALAM:5（欲情）系数（バイブ/淋浴同表）
  const lust_m2 =
    palam5 < PALAMLV[1]
      ? 0.8
      : palam5 < PALAMLV[2]
        ? 0.9
        : palam5 < PALAMLV[3]
          ? 1.0
          : palam5 < PALAMLV[4]
            ? 1.1
            : 1.2;
  // :634-686 バイブ、アナルバイブだけ先に計算（SOURCE:1/2/6 的落点）
  if (tequip(11) || tequip(13)) {
    const lube = era.get(`palam:${target}:3`) || 0;
    if (lube < PALAMLV[1]) {
      va = times(va, 0.4);
      vb = times(vb, 0.4);
      vc += 800;
    } else if (lube < PALAMLV[2]) {
      va = times(va, 0.8);
      vb = times(vb, 0.8);
      vc += 500;
    } else if (lube < PALAMLV[3]) {
      vc += 300;
    } else if (lube < PALAMLV[4]) {
      va = times(va, 1.4);
      vb = times(vb, 1.4);
      vc += 120;
    } else {
      va = times(va, 1.8);
      vb = times(vb, 1.8);
      vc += 100;
    }
    va = times(va, lust_m2);
    vb = times(vb, lust_m2);
    const obey = Math.min(abl(10), 5);
    const obey_m = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3][obey];
    va = times(va, obey_m);
    vb = times(vb, obey_m);
    if (era.get(`talent:${target}:99`)) {
      vc = times(vc, 0.8); // 魁梧
    }
    if (era.get(`talent:${target}:100`)) {
      vc = times(vc, 2.0); // 娇小
    }
    if (era.get(`talent:${target}:30`)) {
      vc = times(vc, 3.0); // 看重贞操
    }
    set(1, va);
    set(2, vb);
    set(6, vc);
  }

  // :687-734 淋浴だけ先に計算（A/B 再过一遍参数与顺从；C 的累加在此段
  // 无落点——源序如此，1:1 保留）
  if (tequip(18)) {
    const lube = era.get(`palam:${target}:3`) || 0;
    if (lube < PALAMLV[1]) {
      va = times(va, 0.4);
      vb = times(vb, 0.4);
      vc += 800;
    } else if (lube < PALAMLV[2]) {
      va = times(va, 0.8);
      vb = times(vb, 0.8);
      vc += 500;
    } else if (lube < PALAMLV[3]) {
      vc += 300;
    } else if (lube < PALAMLV[4]) {
      va = times(va, 1.4);
      vb = times(vb, 1.4);
      vc += 120;
    } else {
      va = times(va, 1.8);
      vb = times(vb, 1.8);
      vc += 100;
    }
    va = times(va, lust_m2);
    vb = times(vb, lust_m2);
    const obey = Math.min(abl(10), 5);
    const obey_m = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3][obey];
    va = times(va, obey_m);
    vb = times(vb, obey_m);
    set(1, src(1) + va);
    set(2, src(2) + vb);
  }

  // :735-761 ABL:12（技巧）→ SOURCE:4 + 四源系数
  const skill = Math.min(abl(12), 5);
  set(4, [100, 160, 220, 280, 340, 400][skill]);
  {
    const m = [0.3, 0.7, 1.0, 1.2, 1.4, 1.6][skill];
    set(0, times(src(0), m));
    set(17, times(src(17), m));
    set(1, times(src(1), m));
    set(2, times(src(2), m));
  }

  // :762-788 ABL:31（自慰中毒）→ SOURCE:7 + 四源系数（LV5 的 S1/S2 是 ×1.50）
  const addict = Math.min(abl(31), 5);
  set(7, [0, 100, 300, 800, 1500, 2500][addict]);
  {
    const m = [1.0, 1.1, 1.2, 1.3, 1.5, 1.7][addict];
    const m_va = addict === 5 ? 1.5 : m;
    set(0, times(src(0), m));
    set(17, times(src(17), m));
    set(1, times(src(1), m_va));
    set(2, times(src(2), m_va));
  }

  // :789-824 公開/野外（TEQUIP:53||54）→ ABL:17（露出癖）+ 露出狂
  if (tequip(53) || tequip(54)) {
    const expo = Math.min(abl(17), 5);
    set(7, src(7) + [0, 100, 300, 800, 1500, 2500][expo]);
    const m = [1.0, 1.1, 1.2, 1.3, 1.5, 1.7][expo];
    const m12 = [1.0, 1.2, 1.4, 1.6, 2.0, 3.0][expo];
    set(0, times(src(0), m));
    set(17, times(src(17), m));
    set(1, times(src(1), m));
    set(2, times(src(2), m));
    set(12, times(src(12), m12));
    if (era.get(`talent:${target}:89`)) {
      set(7, src(7) + 500);
      set(0, times(src(0), 1.2));
      set(17, times(src(17), 1.2));
      set(1, times(src(1), 1.2));
      set(2, times(src(2), 1.2));
      set(12, times(src(12), 1.5));
    }
  }

  // :826-828 陰毛を生やす設定で剃毛状態 → SOURCE:12 ×2.00
  if (
    !era.get(`talent:${target}:125`) &&
    (era.get(`talent:${target}:310`) || 0) <= 20
  ) {
    set(12, times(src(12), 2.0));
  }

  // :833-849 汚れ：指 ⇔ B、指 ⇔ V 双向移动
  stain_exchange(target, 1, target, 5);
  stain_exchange(target, 1, target, 3);

  // :851-858 淋浴时污垢重置、润滑减半（TEQUIP:18 == 1）
  if (tequip(18) === 1) {
    era.set(`stain:${target}:1`, 0);
    era.set(`stain:${target}:2`, 2);
    era.set(`stain:${target}:3`, 1);
    era.set(`stain:${target}:4`, 8);
    era.set(
      `palam:${target}:3`,
      Math.floor((era.get(`palam:${target}:3`) || 0) / 2),
    );
  }

  // :859-885 经验上昇（录像/野外 +2、通常 +1；首次 + 异常经验）
  if (tequip(53) || tequip(54)) {
    chara(target).dungeon.自慰经验 += 2;
    era.print('自慰经验＋２'); // 全角＋（源 :888 逐字）
    chara(target).dungeon.调教自慰经验 += 2;
    era.print('调教自慰经验＋２');
  } else {
    chara(target).dungeon.自慰经验 += 1;
    era.print('自慰经验＋１');
    chara(target).dungeon.调教自慰经验 += 1;
    era.print('调教自慰经验＋１');
  }
  if ((tequip(53) || tequip(54)) && (era.get(`cflag:${target}:3`) || 0) === 0) {
    chara(target).dungeon.异常经验 += 1;
    era.print('异常经验＋１');
    era.set(`cflag:${target}:3`, 1); // :889 CFLAG:3 = 1
  }

  print_same_sex_exp(target, player, 3, 3); // :890-898

  era.set('tflag:200', 2); // :899 屈服刻印２に相当

  return 1; // :900
}

/**
 * @COM4（COMF4_フェラする.ERB:9-75）口交(主)。
 * @returns {Promise<number>} 原作 RETURN 1（升格跳转时为跳转目标的返回值）
 */
async function com4() {
  // :12-17 头部升格跳转（LOCAL = 4 → CASE 4：前回合口交/强制舔阴/六九式 → 69）
  const jumped = await jump_advanced(4);
  if (jumped !== false) {
    return jumped;
  }

  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);

  era.print('口交(主)'); // :18
  await train_message_b(); // :20

  lose(target, 0, 5); // :25
  lose(target, 1, 50); // :26
  set(12, 220); // :28
  set(14, 50); // :29

  // :32-41 ABL:0 → SOURCE:0
  const abl_c = Math.min(Math.floor(era.get(`abl:${target}:0`) || 0), 5);
  set(0, ABL_C_TIERS_COM4[abl_c]);

  // :42-45 调教者擅用舌头（TALENT:PLAYER:52）或兽奸（TEQUIP:89）
  if (era.get(`talent:${player}:52`) || tequip(89)) {
    set(0, times(src(0), 2.0));
    set(16, src(16) + Math.floor(src(0) / 20));
  }

  // :47-48 兽奸提前返回
  if (tequip(89)) {
    return 1;
  }

  stain_exchange(target, 2, player, 0); // :49-50 P ⇔ 口

  print_same_sex_exp(target, player, 3, 3); // :53-61
  record_player_first_kiss(player, target, 201); // :67-70

  era.add(`cflag:${player}:22`, 1); // :71 調教者的経験

  await event_seitsu(target, player); // :72 CALL EVENT_SEITSU

  // :73-78 爱情经验：对象是男人（TALENT:122）时 E = 2
  print_love_exp(target, era.get(`talent:${target}:122`) ? 2 : 1);

  return 1; // :79
}

/**
 * @EVENT_SEITSU（COMF4_フェラする.ERB:59-75）精通——本族自有函数
 * （COMF4 尾部定义，非范围外调用）。
 * @param {number} target 目标
 * @param {number} player 调教者（A = NO:PLAYER）
 * @returns {Promise<number>} 原作 RETURN 0/1
 */
async function event_seitsu(target, player) {
  // :108-110 男人或扶她、且未熟——否则 RETURN 0
  if (!(era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`))) {
    return 0;
  }
  if (!era.get(`talent:${target}:135`)) {
    return 0;
  }
  // :111-112 C 感度 5 以上、非触手/兽奸
  if ((era.get(`abl:${target}:0`) || 0) <= 4 || tequip(90) || tequip(89)) {
    return 0;
  }
  // :113-114 对调教者的关系 150 以上
  if ((era.get(`relation:${target}:${player}`) || 0) < 150) {
    return 0;
  }
  era.print(
    `${chara_callname(player)}的阴茎被吸啜着，${chara_callname(target)}开始精通这个了…`,
  ); // :116
  era.set(`talent:${target}:135`, 0); // :117 未熟剥落（talent:135 属主 train）
  return 1; // :118
}

/**
 * @COM5（COMF5_胸愛撫.ERB:11-103）胸爱抚。
 * @returns {Promise<number>} 原作 RETURN 1（升格跳转时为跳转目标的返回值）
 */
async function com5() {
  // :12-17 头部升格跳转（LOCAL = 5 → CASE 5：正常位系 → 129 / 背后位系 → 131）
  const jumped = await jump_advanced(5);
  if (jumped !== false) {
    return jumped;
  }

  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);

  era.print('胸爱抚'); // :19
  await train_message_b(); // :21

  lose(target, 0, 5); // :26
  lose(target, 1, 50); // :27
  set(4, 60); // :29
  set(8, 20); // :30
  set(12, 100); // :31

  // :34-44 ABL:1（乳房感觉）→ [SOURCE:17, SOURCE:3]
  const abl_b = Math.min(Math.floor(era.get(`abl:${target}:1`) || 0), 5);
  set(17, ABL_B_TIERS_COM5[abl_b][0]);
  set(3, ABL_B_TIERS_COM5[abl_b][1]);

  // :45-46 死斗场/兽奸提前返回
  if (tequip(89) || tequip(55)) {
    return 1;
  }

  // :47-51 调教者幼儿退行（TALENT:PLAYER:131）
  if (era.get(`talent:${player}:131`) && tequip(89) === 0) {
    set(17, times(src(17), 1.2));
    set(3, times(src(3), 1.2));
  }
  // :52-56 调教者幼稚（TALENT:PLAYER:132）
  if (era.get(`talent:${player}:132`) && tequip(89) === 0) {
    set(17, times(src(17), 1.2));
    set(3, times(src(3), 1.2));
  }

  // :59-81 汚れ：触手 → B 位 |= 2/4；否则胸可用时 B ⇔ 口（擅用舌头加成）、
  // 其后一律 B ⇔ 指
  if (tequip(90)) {
    era.set(`stain:${target}:5`, (era.get(`stain:${target}:5`) || 0) | 2 | 4);
  } else {
    const b_stain = era.get(`stain:${target}:5`) || 0;
    if (
      b_stain < 2 ||
      b_stain === 16 ||
      b_stain === 17 ||
      era_flag.assiplay === 1 ||
      era.get('talent:0:64') === 1
    ) {
      // :82-84 调教者擅用舌头 → SOURCE:17 ×1.40 + SOURCE:16 加成
      if (era.get(`talent:${player}:52`)) {
        set(17, times(src(17), 1.4));
        set(16, src(16) + Math.floor(src(17) / 20));
      }
      stain_exchange(target, 5, player, 0); // :87-88 B ⇔ 口
    }
    stain_exchange(target, 5, player, 1); // :89-90 B ⇔ 指
  }

  print_same_sex_exp(target, player, 5, 5); // :92-100
  print_love_exp(target, 1); // :101-105

  await event_junyu(target, player); // :106 CALL EVENT_JUNYU

  return 1; // :107
}

/**
 * @EVENT_JUNYU（COMF5_胸愛撫.ERB:105-121）母乳体质变化——本族自有函数。
 * @param {number} target 目标
 * @param {number} player 调教者（A = NO:PLAYER）
 * @returns {Promise<number>} 原作 RETURN 0/1
 */
async function event_junyu(target, player) {
  // :127-128 已是母乳体质（130）/娇小（100）/贫乳（109）/男人（122）→ 不发生
  if (
    era.get(`talent:${target}:130`) ||
    era.get(`talent:${target}:100`) ||
    era.get(`talent:${target}:109`) ||
    era.get(`talent:${target}:122`)
  ) {
    return 0;
  }
  // :129-130 B 感度 5 以上且巨乳（110）/爆乳（114）/超乳（119）之一、
  // 非触手/兽奸
  if (
    (era.get(`abl:${target}:1`) || 0) <= 4 ||
    (!era.get(`talent:${target}:110`) &&
      !era.get(`talent:${target}:114`) &&
      !era.get(`talent:${target}:119`)) ||
    tequip(90) ||
    tequip(89)
  ) {
    return 0;
  }
  // :132-133 调教者幼稚（132）/幼儿退行（131）/未熟（135）之一
  if (
    !era.get(`talent:${player}:132`) &&
    !era.get(`talent:${player}:131`) &&
    !era.get(`talent:${player}:135`)
  ) {
    return 0;
  }
  // :135-136 关系 150 以上、或主人亲自调教且爱慕（TALENT:85）
  const relation = era.get(`relation:${target}:${player}`) || 0;
  if (
    relation < 150 &&
    (era_flag.assiplay || !era.get(`talent:${target}:85`))
  ) {
    return 0;
  }
  era.print(`${chara_callname(target)}的乳房被玩弄着，里面的母乳漏出来了…`); // :138
  chara(target).chara.母乳体质 = 1; // :139（talent:130 属主 chara，走门面）
  return 1; // :140
}

/**
 * COM6 判定段的汚れ权重（COMF6:24-40 / :116-131 两处同式）：主人口污的
 * 位构成（爱液+1 / 精液+3 / 肛门+7 / 母乳+1 / 尿+3）、兽奸固定 7、
 * 不怕污臭 ÷3 / 反感污臭 ×2、接吻影响减半。
 * @returns {number} Y
 */
function kiss_stain_penalty() {
  const player = era_flag.player;
  const mouth = era.get(`stain:${player}:0`) || 0;
  let y = 0;
  if (mouth & 1) {
    y += 1; // 爱液
  }
  if (mouth & 4) {
    y += 3; // 精液
  }
  if (mouth & 8) {
    y += 7; // 肛门
  }
  if (mouth & 16) {
    y += 1; // 母乳
  }
  if (mouth & 32) {
    y += 3; // 尿
  }
  if (era.get(`tequip:${era_flag.target}:89`)) {
    y = 7; // 兽奸固定 7
  }
  if (era.get(`talent:${era_flag.target}:61`)) {
    y = Math.floor(y / 3);
  }
  if (era.get(`talent:${era_flag.target}:62`)) {
    y *= 2;
  }
  return Math.floor(y / 2);
}

/**
 * @COM6（COMF6_キス.ERB:9-330）接吻。
 * @returns {Promise<number>} 原作 RETURN 1（判定不过 RETURN 0）
 */
async function com6() {
  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);
  const abl = (i) => Math.floor(era.get(`abl:${target}:${i}`) || 0);
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const palam5 = era.get(`palam:${target}:5`) || 0;

  // :12-16 头部升格跳转（LOCAL = 6 → CASE 6：正常位系 → 128 / 背后位系 → 133）
  const jumped = await jump_advanced(6);
  if (jumped !== false) {
    return jumped;
  }

  era.print('接吻'); // :19

  // —— :24-44 判定段前半：汚れ权重 Y（AUTO_SUCCESS 路径沿用此值） ——
  let y = kiss_stain_penalty();

  // :45-46 顺从 2 以上 / 侍奉精神 3 以上 / 爱慕 → 自动成功（跳过判定）
  const auto_success = abl(10) >= 2 || abl(16) >= 3 || Boolean(talent(85));

  if (!auto_success) {
    // —— :47-115 判定段：COM_ORDER + 本指令贡献 ——
    let a = 0;
    let s = 0;
    const { a: order_a, s: order_s, parts } = await com_order(0, 0); // :117
    a = order_a;
    s = order_s;
    const plus = () => {
      if (s) {
        parts.push(' + ');
      }
    };
    const minus = () => parts.push(' - ');

    // :118-125 ABL:11 欲望 ×1
    if (abl(11)) {
      plus();
      a += abl(11);
      parts.push(`${name_of('ablname', 11)}LV${abl(11)}(${abl(11) * 1})`);
      s = 1;
    }
    // :126-133 ABL:16 侍奉精神 ×4
    if (abl(16)) {
      plus();
      a += abl(16) * 4;
      parts.push(`${name_of('ablname', 16)}LV${abl(16)}(${abl(16) * 4})`);
      s = 1;
    }
    // :134-141 MARK:1 快乐刻印 ×2
    const mark1 = Math.floor(era.get(`mark:${target}:1`) || 0);
    if (mark1) {
      plus();
      a += mark1 * 2;
      parts.push(`${name_of('markname', 1)}LV${mark1}(${mark1 * 2})`);
      s = 1;
    }
    // :142-153 PALAM:5 欲情 ×1（L > 0 才进）
    const lust_l =
      palam5 < PALAMLV[1]
        ? 0
        : palam5 < PALAMLV[2]
          ? 1
          : palam5 < PALAMLV[3]
            ? 2
            : palam5 < PALAMLV[4]
              ? 3
              : palam5 < PALAMLV[5]
                ? 4
                : 5;
    if (lust_l) {
      plus();
      a += lust_l;
      parts.push(`${name_of('palamname', 5)}LV${lust_l}(${lust_l * 1})`);
      s = 1;
    }
    // :154-159 害羞（TALENT:35）-1
    if (talent(35)) {
      minus();
      a -= 1;
      parts.push(`${name_of('talentname', 35)}(1)`);
      s = 1;
    }
    // :160-166 不怕污臭（TALENT:61）+1
    if (talent(61)) {
      plus();
      a += 1;
      parts.push(`${name_of('talentname', 61)}(1)`);
      s = 1;
    }
    // :168-174 反感污臭（TALENT:62）-1
    if (talent(62)) {
      minus();
      a -= 1;
      parts.push(`${name_of('talentname', 62)}(1)`);
      s = 1;
    }
    // :175-182 献身的（TALENT:63）+6
    if (talent(63)) {
      plus();
      a += 6;
      parts.push(`${name_of('talentname', 63)}(6)`);
      s = 1;
    }
    // :185-191 否定快感（TALENT:71）-1
    if (talent(71)) {
      minus();
      a -= 1;
      parts.push(`${name_of('talentname', 71)}(1)`);
      s = 1;
    }
    // :195-202 爱慕（TALENT:85）且主人亲自调教 +5（源 :207 S = 5，逐字）
    if (talent(85) && era_flag.assiplay === 0) {
      plus();
      a += 5;
      parts.push(`${name_of('talentname', 85)}(5)`);
      s = 5;
    }
    // :208-214 兽奸（TEQUIP:89）且非牝犬（TALENT:136）-15（打印值是 10——
    // 源 :215 PRINTV '(,10,') 逐字，与 A 的 -15 不一致是原状）
    if (tequip(89) && !talent(136)) {
      minus();
      a -= 15;
      parts.push(`${name_of('itemname', 22)}(10)`);
      s = 1;
    }
    // :216-238 Y 重算 + 汚れあり块（脏、名字、(Y)）
    y = kiss_stain_penalty();
    if (y) {
      minus();
      a -= y;
      const stain_name = talent(61)
        ? name_of('talentname', 61)
        : talent(62)
          ? name_of('talentname', 62)
          : '';
      parts.push(`脏、${stain_name}(${y})`);
      s = 1;
    }
    // :242-258 合計（15 以上で実行）
    push_judge_tail(parts, a, 15);
    era.print(parts.join(''));
    await era.waitAnyKey(); // :260 WAIT
    if (a < 15) {
      return 0; // :263-264 実行できない
    }
  }
  order_state.y = y; // SOURCE:8 的算式读判定段 Y（$AUTO_SUCCESS 路径为第一块值）

  await train_message_b(); // :265

  // —— :266-310 ソースの計算 ——
  lose(target, 0, 5); // :311
  lose(target, 1, 50); // :312
  set(8, y * 20 + 10); // :313 上のほうで計算した汚れデータ

  // :314-331 ABL:16（侍奉精神）→ [SOURCE:4, SOURCE:5, SOURCE:8 系数]
  const serve = Math.min(abl(16), 5);
  set(4, ABL_SERVE_TIERS_COM6[serve][0]);
  set(5, ABL_SERVE_TIERS_COM6[serve][1]);
  set(8, times(src(8), ABL_SERVE_TIERS_COM6[serve][2]));

  // :332-351 ABL:12（技巧）→ SOURCE:4/5 系数
  const skill = Math.min(abl(12), 5);
  set(4, times(src(4), ABL_SKILL_TIERS_COM6[skill][0]));
  set(5, times(src(5), ABL_SKILL_TIERS_COM6[skill][1]));

  // :352-382 兽奸（TEQUIP:89）：兽奸中毒（ABL:39）分档 + 犬と初吻，提前返回
  if (tequip(89)) {
    const dog = Math.min(Math.floor(era.get(`abl:${target}:39`) || 0), 5);
    const row = ABL_DOG_TIERS_COM6[dog];
    if (row) {
      set(3, src(3) + row[0]);
      set(10, src(10) + row[1]);
      set(8, times(src(8), row[2]));
      if (dog >= 2) {
        era.set('tflag:100', 1); // :388 等 LV2+ 置侍奉快乐经验旗
      }
    } else {
      set(8, times(src(8), dog === 0 ? 2.0 : 1.0)); // LV0 ×2.00 / LV1 ×1.00
    }
    if ((era.get(`cflag:${target}:16`) || 0) === -1) {
      era.set('tflag:13', 1); // :389 犬と初吻
      era.set(`cflag:${target}:16`, 998);
      era.set('tflag:200', 2); // :390 屈服刻印２に相当
    }
    return 1; // :391
  }

  // :392-411 玩家的 ABL:12（技巧）→ [SOURCE:3, SOURCE:10, A]
  const p_skill = Math.min(Math.floor(era.get(`abl:${player}:12`) || 0), 5);
  set(3, [100, 150, 200, 300, 500, 800][p_skill]);
  set(10, [0, 0, 0, 50, 100, 200][p_skill]);

  // :412-413 爱慕（TALENT:85）→ SOURCE:3 ×2.00
  if (talent(85)) {
    set(3, times(src(3), 2.0));
  }

  // —— :416-419 汚れの処理：口 ⇔ 口 ——
  stain_exchange(target, 0, player, 0);

  // —— :385-434 経験上昇（レズ/ホモ :387-396、爱情 :398-434）——
  print_same_sex_exp(target, player, 3, 3); // :387-396

  // :398-430 爱情经验段（:398 起）
  let love_e = 1; // :400
  if (talent(85) && era_flag.assiplay === 0) {
    love_e += 2; // :404
  }
  if ((era.get(`cflag:${target}:16`) || 0) === -1) {
    era.set('tflag:13', 1); // :408 初吻
    era.set(`cflag:${target}:16`, 1);
    era.set(`cstr:${target}:4`, chara_callname(player)); // CSTR:4 = %SAVESTR:PLAYER%
    love_e += 20; // :412
    if (era_flag.assiplay && era_flag.assi > 0) {
      // :414-419 初吻对象是助手时，对象对助手的关系 +10（==10 抬 110、>200 钳 200）
      const r = era_flag.assi;
      let rel = (era.get(`relation:${target}:${r}`) || 0) + 10;
      if (rel === 10) {
        rel = 110;
      }
      if (rel > 200) {
        rel = 200;
      }
      era.set(`relation:${target}:${r}`, rel);
    }
    era.set('tflag:200', 1); // :422 屈服刻印１に相当
  }
  record_player_first_kiss(player, target, 1); // :424-428 调教者的初吻

  print_love_exp(target, love_e); // :430-434

  era.set('tflag:100', 1); // :439

  if (era_flag.assiplay === 0) {
    era.add('tflag:30', 1); // :442 主人接吻计数
  }

  return 1; // :444
}

/**
 * @COM7（COMF7_秘貝開帳.ERB:10-245）自己扒开。
 * @returns {Promise<number>} 原作 RETURN 1（判定不过 RETURN 0）
 */
async function com7() {
  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);
  const abl = (i) => Math.floor(era.get(`abl:${target}:${i}`) || 0);
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const palam5 = era.get(`palam:${target}:5`) || 0;

  // :10-11 指令名行（公开前缀）
  era.print(`${tequip(53) ? '公开' : ''}自己扒开`);

  // —— :13-131 実行できるかの判定（无自动成功路径） ——
  let a = 0;
  let s = 0;
  const { a: order_a, s: order_s, parts } = await com_order(0, 0); // :132
  a = order_a;
  s = order_s;
  const plus = () => {
    if (s) {
      parts.push(' + ');
    }
  };
  const minus = () => parts.push(' - ');

  // :133-140 ABL:11 欲望 ×3
  if (abl(11)) {
    plus();
    a += abl(11) * 3;
    parts.push(`${name_of('ablname', 11)}LV${abl(11)}(${abl(11) * 3})`);
    s = 1;
  }
  // :141-148 ABL:2 私处感觉 ×2
  if (abl(2)) {
    plus();
    a += abl(2) * 2;
    parts.push(`${name_of('ablname', 2)}LV${abl(2)}(${abl(2) * 2})`);
    s = 1;
  }
  // :150-157 ABL:16 侍奉精神 ×4
  if (abl(16)) {
    plus();
    a += abl(16) * 4;
    parts.push(`${name_of('ablname', 16)}LV${abl(16)}(${abl(16) * 4})`);
    s = 1;
  }
  // :158-165 ABL:17 露出癖 ×3
  if (abl(17)) {
    plus();
    a += abl(17) * 3;
    parts.push(`${name_of('ablname', 17)}LV${abl(17)}(${abl(17) * 3})`);
    s = 1;
  }
  // :166-173 ABL:31 自慰中毒 ×3
  if (abl(31)) {
    plus();
    a += abl(31) * 3;
    parts.push(`${name_of('ablname', 31)}LV${abl(31)}(${abl(31) * 3})`);
    s = 1;
  }
  // :176-182 润滑不足（PALAM:3 < PALAMLV:3）-5（打印是字面量「润滑不足」）
  if ((era.get(`palam:${target}:3`) || 0) < PALAMLV[3]) {
    minus();
    a -= 5;
    parts.push(`润滑不足(5)`);
    s = 1;
  }
  // :185-196 PALAM:5 欲情 ×3
  const lust_l =
    palam5 < PALAMLV[1]
      ? 0
      : palam5 < PALAMLV[2]
        ? 1
        : palam5 < PALAMLV[3]
          ? 2
          : palam5 < PALAMLV[4]
            ? 3
            : palam5 < PALAMLV[5]
              ? 4
              : 5;
  if (lust_l) {
    plus();
    a += lust_l * 3;
    parts.push(`${name_of('palamname', 5)}LV${lust_l}(${lust_l * 3})`);
    s = 1;
  }
  // :197-203 害羞（TALENT:35）-2
  if (talent(35)) {
    minus();
    a -= 2;
    parts.push(`${name_of('talentname', 35)}(2)`);
    s = 1;
  }
  // :206-212 不知羞耻（TALENT:36）+2
  if (talent(36)) {
    plus();
    a += 2;
    parts.push(`${name_of('talentname', 36)}(2)`);
    s = 1;
  }
  // :215-221 接受快感（TALENT:70）+5
  if (talent(70)) {
    plus();
    a += 5;
    parts.push(`${name_of('talentname', 70)}(5)`);
    s = 1;
  }
  // :222-228 否定快感（TALENT:71）-5
  if (talent(71)) {
    minus();
    a -= 5;
    parts.push(`${name_of('talentname', 71)}(5)`);
    s = 1;
  }
  // :229-235 露出狂（TALENT:89）+10
  if (talent(89)) {
    plus();
    a += 10;
    parts.push(`${name_of('talentname', 89)}(10)`);
    s = 1;
  }
  // :236-247 处女（TALENT:0）-20 / 私处经验不足（EXP:0 < EXPLV:2）-5
  if (talent(0)) {
    minus();
    a -= 20;
    parts.push(`${name_of('talentname', 0)}(20)`);
    s = 1;
  } else if ((era.get(`exp:${target}:0`) || 0) < EXPLV[2]) {
    minus();
    a -= 5;
    parts.push(`${name_of('expname', 0)} 不足(5)`);
    s = 1;
  }
  // :248-254 媚药（TEQUIP:21，打印读 ITEMNAME:26）+6
  if (tequip(21)) {
    plus();
    a += 6;
    parts.push(`${name_of('itemname', 26)}(6)`);
    s = 1;
  }

  // :257-274 合計（22 以上で実行；公開 +10）
  let v = 22;
  if (tequip(53)) {
    v += 10;
  }
  push_judge_tail(parts, a, v);
  era.print(parts.join(''));
  await era.waitAnyKey(); // :275 WAIT
  if (a < v) {
    return 0; // :276-277
  }
  order_state.a = a;
  order_state.v = v;

  await train_message_b(); // :278

  // —— :204-336 実行決定後的源计算（LOSEBASE 起至 TFLAG:200）——
  lose(target, 0, 10); // :206
  lose(target, 1, 50); // :207
  set(14, 400); // :212

  // :214-234 ABL:2 → [SOURCE:12, SOURCE:13]
  const abl_v = Math.min(abl(2), 5);
  set(12, ABL_V_TIERS_COM7[abl_v][0]);
  set(13, ABL_V_TIERS_COM7[abl_v][1]);

  // :236-246 ABL:16 → [SOURCE:4, SOURCE:5]
  const serve = Math.min(abl(16), 5);
  set(4, ABL_SERVE_TIERS_COM7[serve][0]);
  set(5, ABL_SERVE_TIERS_COM7[serve][1]);

  // :248-269 ABL:17（露出癖）→ [SOURCE:7 增量, SOURCE:12 系数, SOURCE:5 系数]
  const expo = Math.min(abl(17), 5);
  set(7, src(7) + ABL_EXPO_TIERS_COM7[expo][0]);
  set(12, times(src(12), ABL_EXPO_TIERS_COM7[expo][1]));
  set(5, times(src(5), ABL_EXPO_TIERS_COM7[expo][2]));

  // :271-276 露出狂（TALENT:89）→ SOURCE:7 += 500 + S12/S5 ×1.50
  if (talent(89)) {
    set(7, src(7) + 500);
    set(12, times(src(12), 1.5));
    set(5, times(src(5), 1.5));
  }

  // :289-291 剃毛状態 → SOURCE:12 ×2.00
  if (!talent(125) && (talent(310) || 0) <= 20) {
    set(12, times(src(12), 2.0));
  }

  // :297-299 汚れ：指 ⇔ V
  stain_exchange(target, 1, target, 3);

  // :305-327 露出癖 3+ 的自慰经验等：
  if (abl(17) >= 3) {
    if (tequip(53)) {
      chara(target).dungeon.自慰经验 += 2;
      era.print('自慰经验＋２'); // 全角＋（源逐字）
      chara(target).dungeon.调教自慰经验 += 2;
      era.print('调教自慰经验＋２');
    } else {
      chara(target).dungeon.自慰经验 += 1;
      era.print('自慰经验＋１');
      chara(target).dungeon.调教自慰经验 += 1;
      era.print('调教自慰经验＋１');
    }
    if (tequip(53) && (era.get(`cflag:${target}:3`) || 0) === 0) {
      chara(target).dungeon.异常经验 += 1;
      era.print('异常经验＋１');
      era.set(`cflag:${target}:3`, 1);
    }
  }

  print_same_sex_exp(target, player, 2); // :329-333 百合经验（源侧无断背支）

  era.set('tflag:200', 1); // :338 屈服刻印１に相当

  return 1; // :338
}

/**
 * @COM8（COMF8_指挿入れ.ERB:7-146）插入手指。
 * @returns {Promise<number>} 原作 RETURN 1（确认拒绝 RETURN 0；升格跳转时
 *   为跳转目标的返回值）
 */
async function com8() {
  const target = era_flag.target;
  const player = era_flag.player;

  // :9-11 夺处女确认（CALL CONFIRM_LOST_VIRGIN / SIF RESULT == 0 RETURN 0）
  // 真身在 com-vaginasex.js（#216）；rebase 接线，替换本票先前的恒放行存根
  if ((await confirm_lost_virgin()) === 0) {
    return 0;
  }

  // :17-24 头部升格跳转（LOCAL = 8 → CASE 8：PREVCOM==8 且技巧 3+ → 84）
  const jumped = await jump_advanced(8);
  if (jumped !== false) {
    return jumped;
  }

  const { src, set } = make_src_helpers(target);

  era.print('插入手指'); // :26
  await train_message_b(); // :31

  lose(target, 0, 30); // :32
  lose(target, 1, 80); // :34
  set(12, 300); // :35
  set(14, 200); // :38

  // :39-53 ABL:2（私处感觉）→ [SOURCE:1, SOURCE:13]
  const abl_v = Math.min(Math.floor(era.get(`abl:${target}:2`) || 0), 5);
  set(1, ABL_V_TIERS_COM8[abl_v][0]);
  set(13, ABL_V_TIERS_COM8[abl_v][1]);

  // :54-75 EXP:0 档 → [SOURCE:1 系数, SOURCE:13 系数, SOURCE:6, SOURCE:14 增量]
  // 注：最末档（ELSE）乘的是 SOURCE:2（源 :76 逐字——与同族的 SOURCE:1 不一致
  // 是原状，不「修正」）
  const exp_v = era.get(`exp:${target}:0`) || 0;
  if (exp_v < EXPLV[1]) {
    set(1, times(src(1), 0.2));
    set(13, times(src(13), 0.2));
    set(6, 300);
  } else if (exp_v < EXPLV[2]) {
    set(1, times(src(1), 0.5));
    set(13, times(src(13), 0.5));
    set(6, 180);
  } else if (exp_v < EXPLV[3]) {
    set(1, times(src(1), 1.0));
    set(13, times(src(13), 0.8));
    set(6, 80);
  } else if (exp_v < EXPLV[4]) {
    set(1, times(src(1), 1.2));
    set(13, times(src(13), 1.0));
    set(6, 30);
  } else if (exp_v < EXPLV[5]) {
    set(1, times(src(1), 1.6));
    set(13, times(src(13), 1.2));
    set(6, 0);
  } else {
    set(2, times(src(2), 1.8));
    set(13, times(src(13), 1.5));
    set(6, 0);
  }

  // :77-78 小人体型（TALENT:263）→ SOURCE:1 ×1.50
  if (era.get(`talent:${target}:263`)) {
    set(1, times(src(1), 1.5));
  }

  // :79-94 PALAM:3（润滑）→ [SOURCE:1 系数, SOURCE:6 增量+系数]
  const lube = era.get(`palam:${target}:3`) || 0;
  if (lube < PALAMLV[1]) {
    set(1, times(src(1), 0.1));
    set(6, src(6) + 700);
    set(6, times(src(6), 3.0));
  } else if (lube < PALAMLV[2]) {
    set(1, times(src(1), 0.2));
    set(6, src(6) + 200);
    set(6, times(src(6), 1.0));
  } else if (lube < PALAMLV[3]) {
    set(1, times(src(1), 0.6));
    set(6, times(src(6), 0.8));
  } else if (lube < PALAMLV[4]) {
    set(1, times(src(1), 1.0));
    set(6, times(src(6), 0.5));
  } else {
    set(1, times(src(1), 2.0));
    set(6, times(src(6), 0.1));
  }

  // :95-105 PALAM:5（欲情）→ SOURCE:1 系数
  const lust_m =
    palam_lust_of(target) < PALAMLV[1]
      ? 0.5
      : palam_lust_of(target) < PALAMLV[2]
        ? 0.8
        : palam_lust_of(target) < PALAMLV[3]
          ? 1.2
          : palam_lust_of(target) < PALAMLV[4]
            ? 1.5
            : 1.8;
  set(1, times(src(1), lust_m));

  // :106-115 私处敏感（103）/钝感（104）→ SOURCE:6/13/14 系数
  const m = era.get(`talent:${target}:103`)
    ? 1.5
    : era.get(`talent:${target}:104`)
      ? 0.6
      : null;
  if (m) {
    set(6, times(src(6), m));
    set(13, times(src(13), m));
    set(14, times(src(14), m));
  }

  // :116-117 无私处经验且看重贞操 → SOURCE:13 ×2.00（EXP:0 == 0）
  if (exp_v === 0 && era.get(`talent:${target}:30`)) {
    set(13, times(src(13), 2.0));
  }
  // :118-120 未熟 → SOURCE:6 ×2.00
  if (era.get(`talent:${target}:135`)) {
    set(6, times(src(6), 2.0));
  }

  // :125-135 汚れ：触手 → V 位 |= 2/4；否则 V ⇔ 指
  if (tequip(90)) {
    era.set(`stain:${target}:3`, (era.get(`stain:${target}:3`) || 0) | 2 | 4);
  } else {
    stain_exchange(target, 3, player, 1);
  }

  // :136-149 経験上昇：私处经验按 ABL:2 档给 1-4
  const s = abl_v <= 1 ? 1 : abl_v <= 4 ? 2 : abl_v <= 7 ? 3 : 4;
  chara(target).dungeon.私处经验 += s; // :151（exp:0 属主 dungeon，走门面）
  era.print(`私处经验+${s}`); // :152

  print_same_sex_exp(target, player, 4); // :153-157
  print_love_exp(target, 1); // :158-162

  era.set('tflag:19', 1); // :163 私处经验を伴うコマンドのフラグ

  return 1; // :164
}

/** PALAM:5（欲情）读数（COM8 用；独立小助手避免与判定段的局部变量混淆） */
function palam_lust_of(cid) {
  return era.get(`palam:${cid}:5`) || 0;
}

/**
 * @COM9（COMF9_アナル舐め.ERB:7-63）舔肛。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com9() {
  const target = era_flag.target;
  const player = era_flag.player;
  const { src, set } = make_src_helpers(target);

  era.print('舔肛'); // :9
  await train_message_b(); // :11

  lose(target, 0, 5); // :18
  lose(target, 1, 50); // :19
  set(10, 50); // :21
  set(12, 300); // :22
  set(14, 500); // :23

  // :26-35 ABL:3 → SOURCE:2
  const abl_a = Math.min(Math.floor(era.get(`abl:${target}:3`) || 0), 5);
  set(2, ABL_A_TIERS_COM9[abl_a]);

  // :36-41 兽奸：肛门经验 +1 后提前返回
  if (tequip(89)) {
    chara(target).dungeon.肛门经验 += 1; // :42
    era.print('肛门经验＋１'); // :43（全角＋，源逐字）
    return 1; // :44
  }

  // :45-49 调教者擅用舌头（TALENT:PLAYER:52）：SOURCE:2 ×2.00、
  // SOURCE:16 += SOURCE:0/20（SOURCE:0 本指令从不写——恒 +0，源逐字保留）
  if (era.get(`talent:${player}:52`) || tequip(89)) {
    set(2, times(src(2), 2.0));
    set(16, src(16) + Math.floor(src(0) / 20));
  }

  stain_exchange(target, 4, player, 0); // :50-51 A ⇔ 口

  print_same_sex_exp(target, player, 3); // :57-61

  chara(target).dungeon.肛门经验 += 1; // :64
  era.print('肛门经验＋１'); // :65（全角＋）

  record_player_first_kiss(player, target, 401); // :66-69

  return 1; // :70
}

// —— @TRAIN_MESSAGE_B 的本族分支（SELECTCOM 0-9；0 分支 #45 落地随搬，其余
//    #219 落地。源 EVENT_TRAIN_MESSAGE_B.ERB:28-782 的 IF 链段） ——

/** 体型/肤色描述（B 文 74-87 行，#45 落地随搬） */
function body_phrase(cid) {
  let phrase = '';
  if (era.get(`talent:${cid}:135`)) {
    phrase += '未成熟';
  } else if (era.get(`talent:${cid}:100`)) {
    phrase += '娇小';
  } else if (era.get(`talent:${cid}:115`)) {
    phrase += '胖乎乎';
  }
  if (era.get(`talent:${cid}:244`)) {
    phrase += '的蓝色肌肤';
  } else if (era.get(`talent:${cid}:253`)) {
    phrase += '的褐色肌肤';
  } else if (era.get(`talent:${cid}:255`)) {
    phrase += '的白皙';
  }
  return phrase;
}

/**
 * :89-90 妊娠中的胎动（B 文爱抚分支 :28-90 的尾段；全文件仅此一支有此段，
 * #45 注记「与其余分支同款」不确——其余分支无胎动行，以源为准）。
 */
async function print_pregnancy_kick(target, target_name) {
  if (
    era.get(`talent:${target}:153`) &&
    (era.get(`cflag:${target}:110`) || 0) <= era_flag.day_count + 10 &&
    ((era.get(`cflag:${target}:42`) || 0) !== 11 ||
      ((era.get(`cflag:${target}:40`) || 0) & 64) === 0)
  ) {
    era.print(`${target_name}圆滚滚的腹部里、微微感觉到胎儿在踢脚……`);
  }
}

/** @TRAIN_MESSAGE_B 分支 0（:28-90，#45 落地随搬） */
async function train_message_b_0() {
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target);

  // :28-38 服装前缀（#215 起真身，ere/page/page-clothtype.js）
  const cloth_bits = era.get(`cflag:${target}:40`) || 0;
  const special_type = era.get(`cflag:${target}:42`) || 0;
  let line = '';
  if ((cloth_bits & 64) !== 0 && special_type <= 50) {
    line += `隔着${clothtype_special_text(target)}、`;
  } else if ((cloth_bits & 28) !== 0) {
    line += `隔着${clothtype_main2_text(target)}、`;
  } else if (cloth_bits !== 0) {
    line += '隔着内衣、';
  }

  // :39-65 装备描写支（触手 :66-67 / 魔兽 :68-89 / 兽奸 :90-91）——#215 起真身
  const teq = (idx) => era.get(`tequip:${target}:${idx}`) || 0;
  if (teq(90)) {
    line += '触手玩弄着';
  } else if (teq(88)) {
    const species = e_get(307);
    const action =
      species === 2
        ? '用满是黏液的身体包覆着'
        : species === 3
          ? '那冰冷的节肢正触碰着'
          : species === 4
            ? '伸出藤蔓抚弄着'
            : species === 5 || species === 11
              ? '伸出触手玩弄着'
              : species === 6
                ? '用娇小的身驱紧贴摩擦着'
                : species === 10 || species === 12
                  ? '那野兽的舌头正舔着'
                  : '正仔细地爱抚着';
    era.print(`${line}${monster_name(e_get(300))}${action}`);
    era.print(`${target_name}${body_phrase(target)}的身体……`);
    await print_pregnancy_kick(target, target_name);
    return;
  } else if (teq(89)) {
    line += '狗的舌头舔舐着';
  } else {
    // :94-99 普通支
    line += chara_callname(player);
    const mouth_stain = era.get(`stain:${target}:0`) || 0;
    const kissable =
      (mouth_stain < 2 ||
        mouth_stain === 16 ||
        mouth_stain === 17 ||
        era.get('talent:0:64') ||
        era_flag.assiplay) &&
      !era.get(`tequip:${target}:45`) &&
      (era.get(`cflag:${target}:16`) || 0) !== -1;
    if (kissable) {
      line += `轻舔着${target_name}的唇、`;
    }
    line += '仔细爱抚着';
  }
  line += `${target_name}${body_phrase(target)}的身体……`;
  era.print(line);
  await print_pregnancy_kick(target, target_name);
}

/** 魔兽种族描述表（B 文各分支共用的 E:307 → 文案映射） */
function monster_species_text(species, table) {
  return table[species] ?? table.default;
}

/** @TRAIN_MESSAGE_B 分支 1（舔阴，:94-215） */
async function train_message_b_1() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const lust3 = (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3];
  const futanari = era.get(`talent:${target}:121`);

  // :94-119 头段：兽奸 / 魔兽（E:307 种族支）/ 调教者名
  let line;
  if (era.get(`tequip:${target}:89`)) {
    line = '狗的舌头';
  } else if (era.get(`tequip:${target}:88`)) {
    line = `${monster_name(e_get(300))} ${monster_species_text(e_get(307), {
      2: '那黏答答的口部',
      3: '的口器',
      4: '的藤蔓',
      5: '的触手',
      11: '的触手',
      6: '大张着那小小嘴巴',
      10: '的野兽舌头',
      12: '的野兽舌头',
      default: '',
    })}`;
  } else {
    line = player_name;
  }

  // :120-126 岩清水（TEQUIP:57）
  if (era.get(`tequip:${target}:57`)) {
    line += `把脸伸到${target_name}的胯间、在淫秽的声音中舔舐着阴唇`;
  } else {
    line += `温柔仔细地舔舐着${target_name}的阴唇`;
  }

  // :127-212 扶她/欲情的三岔（魔兽支各带种族文案）
  const monster = era.get(`tequip:${target}:88`);
  if (futanari && lust3) {
    if (monster) {
      line += '，而那渐渐勃起的阴茎也被';
      line += monster_species_text(e_get(307), {
        2: '摩擦着并沾满了黏液',
        3: '前端的口器轻轻啃咬着',
        4: '藤蔓摩擦缠绕着',
        5: '触手含住并吞吐着',
        11: '触手含住并吞吐着',
        6: '那娇小的身躯摩擦着',
        10: '野兽舌头一同舔舐着',
        12: '野兽舌头一同舔舐着',
        default: '舌头一同舔舐着',
      });
    } else {
      line += '、同时那阴茎也在舌头的舔舐中逐渐勃起';
    }
  } else if (futanari) {
    if (monster) {
      line += '、那阴茎的根部也同时';
      line += monster_species_text(e_get(307), {
        2: '被摩擦并沾满了黏液',
        3: '被轻轻啃咬着',
        4: '被藤蔓缠绕摩擦着',
        5: '被轻轻地缠绕摩擦着',
        11: '被轻轻地缠绕摩擦着',
        6: '被抱住用全身摩擦着',
        10: '被野兽舌头舔舐着',
        12: '被野兽舌头舔舐着',
        default: '被舌头舔舐着',
      });
    } else {
      line += '、一边又提起阴茎、在根部来回舔舐着';
    }
  } else if (lust3) {
    if (monster) {
      line += '、那硬挺起来的阴蒂也同时';
      line += monster_species_text(e_get(307), {
        2: '被摩擦并沾满了黏液',
        3: '被口器轻轻啃咬舔舐着',
        4: '被藤蔓缠绕摩擦着',
        5: '被吸盘触手包覆吸吮着',
        11: '被吸盘触手包覆吸吮着',
        6: '被抱住用全身摩擦着',
        10: '被野兽舌头舔舐着',
        12: '被野兽舌头舔舐着',
        default: '被舌头舔舐着',
      });
    } else {
      line += '、用舌头分开包裹着阴蒂的皮肤、不断吸啜着';
    }
  }
  era.print(`${line}……`);
}

/** @TRAIN_MESSAGE_B 分支 2（肛门爱抚，:99-151） */
async function train_message_b_2() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const deep =
    (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&
    (era.get(`abl:${target}:3`) || 0) >= 3;
  const teq = (idx) => era.get(`tequip:${target}:${idx}`) || 0;

  if (teq(88)) {
    // :215-238 魔兽支（MONSTER_NAME + E:307 种族文案 + 尾随空行）
    const species = e_get(307);
    let body;
    if (species === 2) {
      body = '分泌出黏液对着肛门刺激摩擦了起来……';
    } else if (species === 3) {
      body = '那振动的节肢对着肛门刺激摩擦了起来……';
    } else if (species === 4) {
      body = '那根芽对着对着肛门刺激摩擦了起来……';
    } else if (species === 5 || species === 11) {
      body = `那满是黏液的触手对着${target_name}的肛门刺激摩擦了起来…`;
    } else if (species === 6) {
      body = '那小小的手对着肛门轻轻地刺激摩擦了起来……';
    } else if (species === 10 || species === 12) {
      body = '那鼻尖对着肛门执拗地进行着刺激……';
    } else {
      body = `玩弄着${target_name}的肛门${deep ? '、同时那指尖还深入到直肠绞动了起来' : ''}…`;
    }
    era.print(`${monster_name(e_get(300))} ${body} `); // 尾随空格（PRINTL ' '）
  } else {
    // :239-262 普通支。SIF TEQUIP:90 == 0 的 PRINTFORM 是行内前缀（不收行），
    // 与后续 PRINTFORML 合成一行的形状在此按源拼接
    const prefix = teq(90) === 0 ? player_name : '';
    if (teq(90)) {
      era.print(`${prefix}用沾满粘液的触手、刺激着${target_name}的肛门…`);
    } else if (teq(13)) {
      era.print(
        `${prefix}用手把肛门虫前后推动了几下、${target_name}身体随之轻轻地颤动着……`,
      );
    } else if (teq(19)) {
      era.print(`${prefix}稍微拉着肛珠的绳子、前后拉动了几下…`);
    } else if (teq(46)) {
      era.print(`${prefix}在排泄感满满的菊花上、玩弄了几下肛塞…`);
    } else if (teq(49)) {
      era.print(`${prefix}把吱吱作响的电极、在肛门内摆弄了几下…`);
    } else {
      era.print(
        `${prefix}玩弄着${target_name}的肛门${deep ? '、将手指伸入到尽头、用指尖搅动着直肠' : ''}……`,
      );
    }
  }
}

/** @TRAIN_MESSAGE_B 分支 3（自慰，:222-279——读判定段的 A/V，order_state） */
async function train_message_b_3(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const { a, v } = order_state;

  // :267-273 牡奴/牝奴的 LOCALS（RAND:2 参与分流）
  const male_side =
    era.get(`talent:${target}:122`) ||
    (era.get(`talent:${target}:121`) && rand(2) === 0);
  const locals0 = male_side ? '套弄阴茎' : '玩弄阴部';
  const locals1 = male_side ? '牡奴' : '牝奴';

  if (a < v) {
    era.print(`${target_name}拒绝了自慰的命令。看来还需要更多的调教。`);
  } else if (a > v && a < 50) {
    // :274-296 命令下的起步（着衣/性格/摄像机前）
    let line = `在${player_name}要求自慰的命令下、${target_name}`;
    if ((era.get(`cflag:${target}:40`) || 0) & 8) {
      line += `${clothtype_main2_text(target)}的前摆提了起来、露出了性器官、`;
    }
    if (era.get(`talent:${target}:15`)) {
      line += '高傲地';
    }
    if (era.get(`talent:${target}:22`)) {
      line += '毫无表情、默默地';
    } else if (
      era.get(`talent:${target}:10`) ||
      era.get(`talent:${target}:14`)
    ) {
      line += '指尖颤抖地';
    } else if (era.get(`talent:${target}:11`)) {
      line += '带着反抗眼神地';
    } else if (era.get(`talent:${target}:12`)) {
      line += '屈辱到咬牙切齿地';
    } else if (era.get(`talent:${target}:35`)) {
      line += '羞耻到脸红耳赤地';
    }
    if (era.get(`tequip:${target}:53`)) {
      line += '在摄像机前、';
    }
    era.print(`${line}开始了自慰。`);
  } else if (a >= 50 && a < 80) {
    era.print(
      `调教似乎取得了成果的${target_name}遵从${player_name}的命令、恭顺地开始了自慰。`,
    );
  } else {
    era.print(
      `${target_name}一点都不反感自慰的命令、带着完全驯服的${locals1}的表情、开始了自慰。`,
    );
  }

  // :297-312 连续自慰的四段高潮描写（PREVCOM == 3 且装备/参数齐）
  const teq = (idx) => (era.get(`tequip:${target}:${idx}`) || 0) !== 0;
  const abl5 = (i) => (era.get(`abl:${target}:${i}`) || 0) >= 5;
  const lust4 = (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4];
  const prev3 = era_flag.prevcom === 3;
  if (
    teq(11) &&
    teq(13) &&
    abl5(2) &&
    abl5(3) &&
    abl5(0) &&
    abl5(1) &&
    lust4 &&
    prev3
  ) {
    era.print(
      `${target_name}顾不得擦拭流出来的口水、身体痉挛着、淫媚地呻吟着。`,
    );
    era.print('看样子高潮来了、为了维持这份快感、对其它任何事都无动于衷了…');
  } else if (teq(11) && abl5(2) && abl5(0) && abl5(1) && lust4 && prev3) {
    era.print(`${target_name}无暇顾及四溅的爱液、蠕虫在她的体内激烈地抽插着。`);
    era.print('看来已经没办法想其它的事了…');
  } else if (teq(13) && abl5(3) && abl5(0) && abl5(1) && lust4 && prev3) {
    era.print(`${target_name}的身体不住颤抖、体内的肛门虫不停深入着。`);
    era.print('虫子摩擦着直肠内的皱褶、好像高潮了好几次…');
  } else if (
    (era.get(`abl:${target}:10`) || 0) >= 3 &&
    abl5(0) &&
    abl5(1) &&
    lust4 &&
    prev3
  ) {
    era.print(
      `${target_name}不断发出娇媚的呻吟、专心致志地自己继续在${locals0}。`,
    );
    era.print('好像想停止、但手却不听指挥地自己动起来了…');
  }
}

/** @TRAIN_MESSAGE_B 分支 4（口交，:307-332） */
async function train_message_b_4(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const lust3 = (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3];

  const head = era.get(`tequip:${target}:89`) ? '狗' : player_name;
  if (
    era.get(`talent:${target}:122`) ||
    (era.get(`talent:${target}:121`) && rand(3) === 0)
  ) {
    era.print(
      `${head}将${target_name}${lust3 ? '坚硬勃起' : ''}的阴茎、放到嘴里舔舐着…`,
    );
  } else {
    era.print(
      `${head}吮吸着${target_name}${lust3 ? '坚硬勃起' : ''}${era.get(`talent:${target}:121`) ? '的阴茎、' : '的阴蒂、'}将舌头伸进了${target_name}的阴道里…`,
    );
  }
}

/** @TRAIN_MESSAGE_B 分支 5（胸爱抚，:332-478） */
async function train_message_b_5() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const assi_name = chara_callname(era_flag.assi);
  const teq = (idx) => (era.get(`tequip:${target}:${idx}`) || 0) !== 0;
  const talent = (i) => era.get(`talent:${target}:${i}`);
  // PRINTFORMW/PRINTL 收行、PRINT 行内追加——以行缓冲合成（分支内局部约定）
  let buf = '';
  const line = (text = '') => {
    era.print(buf + text);
    buf = '';
  };
  const line_wait = (text = '') => {
    line(text);
    return era.waitAnyKey();
  };

  // :349-362 死斗场的六种 PRINTFORMW 开场
  if (teq(55)) {
    const t400 = era.get('tflag:400') || 0;
    if (t400 === 201) {
      await line_wait(
        `倒下了的${target_name}被${assi_name}吊了起来、胸部被又揉又抓……`,
      );
    } else if (t400 === 202) {
      await line_wait(
        `最下层居民那不知多少天没洗的手、抓起了${target_name}的胸部、像榨乳一样使劲地揉着……`,
      );
    } else if (t400 === 203) {
      await line_wait(
        `倒下了的${target_name}的身上坐着一只发霉的狗、正在玩弄着她的胸部……`,
      );
    } else if (t400 === 204) {
      await line_wait(
        `兽人那粗壮的手指抓起了${target_name}的胸部、像榨乳一样使劲揉……`,
      );
    } else if (t400 === 205) {
      await line_wait(
        `倒下了的${target_name}的身上坐着一只腐烂的猪、正在玩弄着她的胸部……`,
      );
    } else if (t400 === 206) {
      await line_wait(
        `巨魔那粗壮的手指抓起了${target_name}的胸部、像榨乳一样使劲揉……`,
      );
    }
  }

  // :363-410 谁在摸：兽奸 / 死斗场怪物 / 魔兽 / 调教者（触手中省）
  const pierced = (era.get(`cflag:${target}:7`) || 0) & 1;
  const skin_phrase = () =>
    talent(244)
      ? `抚摸着${target_name}的蓝色肌肤、`
      : talent(253)
        ? `抚摸着${target_name}的褐色肌肤、`
        : talent(255)
          ? `抚摸着${target_name}的白皙肌肤、`
          : `抚摸着${target_name}的肌肤、`;
  if (teq(89)) {
    buf += '狗发出汪汪的声音。';
  } else if (teq(55) && era_flag.assi !== era_flag.player) {
    buf += '怪物喷出了恶臭的气息。';
  } else if (teq(88)) {
    buf += `${monster_name(e_get(300))} `;
    const species = e_get(307);
    if (species === 2) {
      buf += '黏答答地蠕动着';
    } else if (species === 3) {
      buf += '伸出了坚硬的节肢';
    } else if (species === 4) {
      buf += '缓缓地伸出了藤蔓';
    } else if (species === 5 || species === 11) {
      buf += '伸出了光溜溜的触手';
    } else if (species === 6) {
      buf += '骑在胸部的上面';
    } else if (species === 10 || species === 12) {
      buf += '喷吐着野兽味道的气息';
    } else {
      buf += skin_phrase();
      if (pierced) {
        line('轻轻拉动贯穿乳头的乳环、');
      }
    }
  } else if (!teq(90)) {
    buf += player_name;
    buf += skin_phrase();
    if (pierced) {
      line('轻轻拉动贯穿乳头的乳环、');
    }
  }

  // :411-423 %TARGET% + 乳房形容
  buf += target_name;
  if (talent(116)) {
    buf += '平坦的';
  } else if (talent(100) && talent(109)) {
    buf += '微微隆起的';
  } else if (talent(109)) {
    buf += '稍小一些的';
  } else if (talent(110) && !teq(89)) {
    buf += '那从指缝中溢出的';
  } else if (talent(114)) {
    buf += '无法一手握住的';
  } else {
    buf += '的';
  }

  // :424-491 胸部的下场（触手/魔兽/母乳/普通各支；PRINTL 收行）
  const milk_peak =
    talent(130) &&
    (era.get(`palam:${target}:5`) || 0) > PALAMLV[3] &&
    !teq(16) &&
    !teq(15);
  const hug_head =
    talent(85) &&
    !teq(44) &&
    era_flag.assiplay === 0 &&
    (era.get(`palam:${target}:4`) || 0) > PALAMLV[4] &&
    (era.get('tflag:899') || 0) === 0 &&
    !teq(55);
  if (teq(90)) {
    line('胸部被好几只触手缠住绞弄…');
  } else if (teq(88)) {
    const species = e_get(307);
    if (species === 2) {
      line('胸部被黏答答地包覆了起来…');
    } else if (species === 3) {
      line('胸部被节肢搓揉着…');
    } else if (species === 4) {
      line('胸部被缠住绞弄着…');
    } else if (species === 5 || species === 11) {
      line('胸部被好几只触手缠住绞弄…');
    } else if (species === 6) {
      line('胸部被游玩着…');
    } else if (species === 10 || species === 12) {
      line('胸部被搓揉着…');
    } else if (milk_peak) {
      line('胸前硬挺的突起被唇舌吸吮');
      line(`${target_name}溢出了大量的母乳…`);
      if (hug_head) {
        line(`${player_name}的头部被${target_name}怜爱似地紧抱着`);
      }
    } else if (talent(130) && !teq(16)) {
      line('就这样的姿势让乳房被饥渴地');
      line(`吸吮，而甜美的奶汁就这样从${target_name}乳头当中喷洒而出…`);
    } else if (
      (era.get(`palam:${target}:5`) || 0) > PALAMLV[3] &&
      !teq(16) &&
      !teq(15)
    ) {
      line('胸部前端那已经硬挺的突起就这样被揉捏着…');
    } else if (talent(116)) {
      line('胸部被来回抚摸着…');
    } else {
      line('胸部被不停揉捏着…');
    }
  } else if (teq(89)) {
    line('胸部被摸弄着…');
  } else if (teq(55)) {
    line('胸部被揉弄着…');
  } else if (milk_peak) {
    line('胸部尖端');
    line('淫秽的硬了的乳头被嘴吸啜时、');
    line('大量的母乳溢了出来、流进了嘴里…');
    if (hug_head) {
      line(`被这样把玩的${target_name}充满爱意地紧紧抱着${player_name}的头。`);
    }
  } else if (talent(130) && !teq(16)) {
    line('双峰被紧紧地抓住、');
    line('被含在嘴里的乳头喷出了淫靡甘甜的母乳…');
  } else if (
    (era.get(`palam:${target}:5`) || 0) > PALAMLV[3] &&
    !teq(16) &&
    !teq(15)
  ) {
    line(`胸部的尖端突起淫秽的硬了、乳头被${player_name}吸啜着…`);
  } else if (talent(116)) {
    line('胸部被来回抚摸着…');
  } else {
    line('胸部揉动着…');
  }
}

/** @TRAIN_MESSAGE_B 分支 6（接吻，:385-459） */
async function train_message_b_6() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const teq = (idx) => (era.get(`tequip:${target}:${idx}`) || 0) !== 0;
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const clear_minded = (era.get('tflag:899') || 0) === 0;
  const full_cloth =
    (era.get(`cflag:${target}:42`) || 0) === 11 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0;

  if (teq(89) && full_cloth) {
    // :495-498 流浪狗隔着着ぐるみ舔（PRINTFORM + SPECIAL + PRINTFORML 一行）
    era.print(`流浪狗把${clothtype_special_text(target)}舔舐变色了……`);
  } else if (teq(88)) {
    // :499-532 魔兽接吻（异种婚姻 TALENT:159 时按种族深吻）
    const species = e_get(307);
    if (talent(159)) {
      const text =
        species === 2
          ? '的口内被仔细地亲吻着、彼此幸福地交换着唾液……'
          : species === 3
            ? '的口器被舌头紧缠着并深情地进行着接吻……'
            : species === 4
              ? '的花蕊被唇舌紧贴、蕊心与舌头相互交缠着……'
              : species === 5 || species === 11
                ? '那口中还滴着黏液的触手被亲吻着、彼此的黏膜紧紧地相贴在一起……'
                : species === 6
                  ? '那小小的嘴巴与煽情的舌头深情地纠缠在一起……'
                  : species === 10 || species === 12
                    ? '被温柔地舌吻着、进行着充满野兽气息的亲吻……'
                    : '被温柔地舌吻着、彼此陶醉地凝视着对方……';
      era.print(`${monster_name(e_get(300))} ${text}`);
    } else {
      era.print(`${monster_name(e_get(300))} 与${target_name}进行着亲吻……`);
    }
  } else if (full_cloth) {
    // :533-536 隔着着ぐるみ接吻
    era.print(
      ` ${player_name}与穿着${clothtype_special_text(target)}的她接吻了……`,
    );
  } else if (teq(89)) {
    // :537-547 兽奸接吻（牝犬 / 兽奸中毒 3+）
    if (talent(136) && clear_minded) {
      era.print(`${target_name}把流浪狗当成热恋中的爱人一样、`);
      era.print('滋滋地吸取着彼此的口水、舌头相互纠缠着……');
      if (talent(85) && clear_minded) {
        era.print('展露出羡煞旁人的深情模样……');
      }
    } else if ((era.get(`abl:${target}:39`) || 0) >= 3 && clear_minded) {
      era.print(
        `狗吐出带有野兽般臭味的气息、舔舐了${target_name}口腔的每个角落……`,
      );
      era.print(`${target_name}也伸出舌头、在狗嘴里来回舔舐着……`);
    } else {
      era.print(
        `狗吐出带有野兽般臭味的气息、在${target_name}口腔的每个角落来回舔舐……`,
      );
    }
  } else {
    // :548-566 普通接吻。PRINTFORM 前缀不收行，与 PRINTL/PRINTFORML 的
    // 尾段合成一行（golden 第 172 行「…来回舔舐着……」的形态）
    let kiss_line = `${player_name}在${target_name}口腔的每个角落来回舔舐着`;
    if (
      (era.get(`abl:${target}:10`) || 0) >= 2 &&
      (era.get(`exp:${target}:40`) || 0) >= 1000 &&
      !era.get(`talent:${era_flag.player}:122`) &&
      clear_minded
    ) {
      kiss_line += '、交缠着舌头、交换着彼此的唾液……';
    } else if ((era.get(`abl:${target}:10`) || 0) >= 2 && clear_minded) {
      kiss_line += `、${target_name}积极地回应着、灵活地舌头彼此交缠着……`;
    } else {
      kiss_line += '……';
    }
    era.print(kiss_line);
    const pierced = era.get(`cflag:${target}:7`) || 0;
    if (pierced & 16 || pierced & 32) {
      let line = `在${target_name}的`;
      if (pierced & 16) {
        line += '舌尖';
      }
      if (pierced & 16 && pierced & 32) {
        line += '和';
      }
      if (pierced & 32) {
        line += '嘴角';
      }
      era.print(`${line}能感受到被穿了环的触感……`);
    }
  }
}

/** @TRAIN_MESSAGE_B 分支 7（自己扒开，:555-646） */
async function train_message_b_7() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const abl = (i) => era.get(`abl:${target}:${i}`) || 0;
  const teq = (idx) => (era.get(`tequip:${target}:${idx}`) || 0) !== 0;

  // :569-581 阴毛描述（TALENT:310 档）
  const hair = talent(310) || 0;
  const locals0 =
    hair <= 20 || talent(125)
      ? '没毛的'
      : hair <= 100
        ? '被半长的阴毛覆盖的'
        : hair <= 200
          ? '被隐约的阴毛覆盖的'
          : hair <= 300
            ? '被长齐的阴毛覆盖的'
            : hair <= 400
              ? '随意生长着茂盛阴毛的'
              : '从阴部到肛门都被茂盛阴毛覆盖的';

  let line = `在${player_name}的命令下、${target_name}`;
  if (teq(53)) {
    line += '在摄像机前';
  }
  const cloth_front = (era.get(`cflag:${target}:40`) || 0) & 8;
  if (cloth_front && abl(17) !== 0) {
    line += `${clothtype_main2_text(target)}的前摆翻了上去、`;
  }
  if (abl(17) === 0) {
    // :582-600 露出癖 0：性格 + 着衣的前摆
    if (talent(22)) {
      line += '毫无表情地、';
    } else if (talent(10) || talent(14)) {
      line += '颤抖着地、';
    } else if (talent(11)) {
      line += '带着反抗眼神、要再次命令才勉勉强强地、';
    } else if (talent(12)) {
      line += '屈辱到咬牙切齿地、';
    } else if (talent(35)) {
      line += '羞耻到脸红耳赤地、';
    }
    if (cloth_front) {
      line += `${clothtype_main2_text(target)}的下摆翻上去了、`;
    }
    line += `向自己${locals0}私处里插入了手指、左右扩张将其撑开了。`;
  } else if (abl(17) === 1) {
    line += `一边脸红耳赤、一边怯弱地把${locals0}性器撑开到能被看清楚的程度。`;
  } else if (abl(17) === 2) {
    line += `把手伸到下腹、面向着${player_name}、用食指和中指轻轻地撑开了自己${locals0}阴部。`;
  } else if (abl(17) === 3) {
    line += `带着嬉笑的表情、一只手撑开了${locals0}阴部、另一只手玩弄着自己的${talent(121) ? '阴茎' : '阴蒂'}。`;
  } else if (abl(17) === 4) {
    line += `两只手同时把${locals0}阴部拉了开来、私处口也随之被拉开。`;
  } else {
    line += `用两手的手指把${locals0}阴部张了开来、炫耀似得把私处口也展露在${player_name}的眼前。`;
  }
  era.print(line);

  // :601-605 精液漏出（TFLAG:38）
  const t38 = era.get('tflag:38') || 0;
  if (t38 >= 2) {
    era.print('从完全打开的私处口中、灌满的精液不断地流了出来……');
  } else if (t38) {
    era.print('从张开的阴部里、精液缓缓地流了出来……');
  }

  // :606-608 貞操帯
  if (
    (era.get(`cflag:${target}:42`) || 0) === 79 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0
  ) {
    era.print(`然后、${target_name}的阴部、被结实的贞操带紧紧保护着。`);
  }

  // :609-624 穿环状態（CFLAG:7 & 8 阴茎环 / & 4 阴唇环）
  const pierced = era.get(`cflag:${target}:7`) || 0;
  if (pierced & 8 || pierced & 4) {
    let tail = target_name;
    if (pierced & 8) {
      if ((era.get(`palam:${target}:5`) || 0) >= PALAMLV[4]) {
        tail += '勃起的';
      }
      tail += talent(121) ? '阴茎' : '阴蒂';
      if (pierced & 4) {
        tail += '和';
      }
    }
    if (pierced & 4) {
      tail += '左右阴唇';
    }
    era.print(`${tail}有贯穿软肉的环、散发着金属的柔和光芒……`);
  }
}

/** @TRAIN_MESSAGE_B 分支 8（插入手指，:588-668） */
async function train_message_b_8() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const teq = (idx) => (era.get(`tequip:${target}:${idx}`) || 0) !== 0;
  const exp_v = era.get(`exp:${target}:0`) || 0;
  const lube4 = (era.get(`palam:${target}:3`) || 0) >= PALAMLV[4];
  const lust3 = (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3];
  const g_spot =
    era_flag.prevcom === 8 && (era.get(`abl:${era_flag.player}:12`) || 0) >= 3;
  const cloth_front =
    ((era.get(`cflag:${target}:40`) || 0) & 8) !== 0 &&
    (era.get(`abl:${target}:17`) || 0) !== 0;

  // :660-661 / :663 的 PRINTFORM 前缀不收行——与 :664-668 的 PRINTFORML
  // 插入行合成一行（finger_prefix）
  let finger_prefix;
  if (teq(11)) {
    // :669-694 振动使用中（蠕虫在动作）
    let line = cloth_front
      ? `${player_name}把${target_name}的${clothtype_main2_text(target)}的裙摆翻起、`
      : `${target_name}的`;
    if (exp_v === 0) {
      line += '未经人事的';
    } else if (lube4) {
      line += '湿漉漉的';
    }
    line += era.get(`talent:${target}:132`) ? '幼女的阴部' : '阴部';
    era.print(`${line}里有着前后抽插着的蠕虫。`);
    finger_prefix = `${player_name}将自己的手指`;
  } else {
    // :695-720 裸手
    let line = `${player_name}把${target_name}的`;
    if (cloth_front) {
      line += `正穿着${clothtype_main2_text(target)}的裙摆翻起、`;
    }
    if (exp_v === 0) {
      line += '未经人事的';
    } else if (lube4) {
      line += '湿漉漉的';
    }
    line += era.get(`talent:${target}:132`) ? '幼女的阴部' : '阴部';
    finger_prefix = `${line}用自己的手指`;
  }

  // :721-726 插入（G 点技巧时更温柔）
  era.print(
    `${finger_prefix}${g_spot ? '温柔地插了进去、轻轻地搅动着…' : '慢慢地插了进去…'}`,
  );

  // :727-746 后续段（G 点 / 蠕虫 / 私处经验的六档）
  const abl2 = era.get(`abl:${target}:2`) || 0;
  if (teq(11) && g_spot) {
    era.print(`${player_name}灵活地操纵着蠕虫、玩弄着敏感的顶点…`);
  } else if (g_spot) {
    era.print(
      `${player_name}在${target_name}的私处内弯曲手指、刺激着敏感的顶点…`,
    );
  } else if (teq(11) && lust3 && abl2 >= 2) {
    era.print(`${target_name}的私处内、爱液把蠕虫沾满了…`);
  } else if (teq(11) && !lust3 && abl2 >= 2) {
    era.print(`${target_name}受到蠕虫的刺激、变得更加苦闷了…`);
  } else if (teq(11) && lust3 && abl2 <= 3) {
    era.print(`${target_name}脸色红润、时不时的娇喘两声…`);
  } else if (teq(11) && !lust3 && abl2 <= 3) {
    era.print(`${target_name}露出了有点苦痛的表情…`);
  } else if (exp_v <= 1) {
    era.print(`${target_name}对私处里的异物感到害怕…`);
  } else if (exp_v <= 30) {
    era.print(
      `${target_name}感受到了手指的感触、努力地忍耐着不让自己叫出声来…`,
    );
  } else if (exp_v <= 50) {
    era.print(`${target_name}很享受手指动作的样子…`);
  } else if (exp_v <= 80) {
    era.print(`${target_name}因为手指的动作而出了神…`);
  } else if (exp_v <= 120) {
    era.print(
      `${target_name}呼出炽热的气息、身体内部被玩弄着、变得更加苦闷了…`,
    );
  } else {
    era.print(`${target_name}流出了口水、主动扭动着腰肢、追求着更高的快感…`);
  }
}

/** @TRAIN_MESSAGE_B 分支 9（舔肛，:740-782） */
async function train_message_b_9() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const deep =
    (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&
    (era.get(`abl:${target}:3`) || 0) >= 3;
  const exp_a = era.get(`exp:${target}:1`) || 0;

  if (era.get(`tequip:${target}:88`)) {
    // :740-765 魔兽支
    const species = e_get(307);
    let line = `${monster_name(e_get(300))} `;
    if (species === 2) {
      line += `的口部分泌出黏液刺激着${target_name}的肛门……`;
    } else if (species === 3) {
      line += `的口器轻轻啃咬着${target_name}的肛门进行刺激……`;
    } else if (species === 4) {
      line += `的根芽对着${target_name}的肛门深入进行刺激……`;
    } else if (species === 5 || species === 11) {
      line += `从口部伸出满是黏液的触手对着${target_name}的肛门进行刺激…`;
    } else if (species === 6) {
      line += `伸出小小的舌头对着${target_name}的肛门进行刺激……`;
    } else if (species === 10 || species === 12) {
      line += `用舌尖对着${target_name}的肛门执拗地进行着刺激……`;
    } else {
      line += `舔舐着${target_name}的肛门${deep ? '、同时用舌尖深入到洞内绞动了起来' : ''}…`;
    }
    era.print(line);
  } else if (era.get(`tequip:${target}:89`)) {
    // :766-767 兽奸
    era.print(`狗吐出了炽热的气息、伸出舌头对着${target_name}舔试着……`);
  } else {
    // :768-780 普通支
    era.print(
      `${player_name}把${target_name}${exp_a <= 10 ? '故意用力闭起来' : ''}的肛门、认真细致地舔舐着${exp_a >= 50 && deep ? '、舌头伸入到洞里去、有节奏地搅动' : ''}了…`,
    );
  }
}

// —— @TRAIN_MESSAGE_A 的本族分支（SELECTCOM 0/1/2/3/5；源侧 4/6/7/8/9 无
//    分支——IF 链落空、零输出，见文末注册处的空 handler） ——

/**
 * @TRAIN_MESSAGE_A 分支 0（:783-846，#45 落地随搬）。UP 的等价物是 delta
 * 表（nextTurnInTrain 结算 delta→palam，本函数在其前运行，读数与原作同位）。
 */
async function train_message_a_0() {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const target_name = chara_callname(target);

  // :746 分支守卫（SELECTCOM == 0 由分发表保证；另两条在此）
  if (era.get(`tequip:${target}:44`) || (era.get('tflag:899') || 0) > 1) {
    stub_line('TRAIN_MESSAGE_A', '紧缚/失神中的爱抚反应', '随失神票');
    return;
  }

  // :747-749 A = UP:0、B = UP:14、C = A + B
  const c =
    (era.get(`delta:${target}:0`) || 0) + (era.get(`delta:${target}:14`) || 0);

  if (c < 100) {
    if (era.get(`talent:${target}:11`)) {
      era.print(`${target_name}一边被爱抚、一边采取着反抗的态度。`);
    } else if (era.get(`talent:${target}:10`)) {
      era.print(
        `${target_name}在被摸到的瞬间、小小地悲鸣了一下、身体都僵硬了。`,
      );
    } else {
      era.print(`${target_name}把身体扭来扭去、好像没有感觉到快感的样子。`);
    }
  } else if (c < 300) {
    let line = target_name;
    if (era.get(`talent:${target}:12`)) {
      line += '用正直的眼神瞪着你、';
    }
    if (era.get(`tequip:${target}:90`)) {
      line += '随着笨拙的触手';
    } else if (era.get(`tequip:${target}:89`)) {
      line += '随着狗舌头的动作';
    } else {
      line += `随着${player_name}的爱抚`;
    }
    era.print(`${line}、身体起了反应、微微颤抖着。`);
  } else if (c < 1000) {
    let line = '';
    if (era.get(`talent:${target}:22`)) {
      line += '虽然表情上没有任何变化、';
    }
    era.print(`${line}但${target_name}的身体却像被轻微电击一样、微微颤动着。`);
  } else if (c < 3000) {
    era.print(
      `${target_name}明确地感受到了快感、轻轻喘息着、发出了媚惑的呻吟。`,
    );
  } else if (c < 6000) {
    let line = `${target_name}在爱抚中被挑起了激烈的情欲、主动用手。`;
    if (era.get(`tequip:${target}:90`)) {
      line += '在触手生物';
    } else if (era.get(`tequip:${target}:89`)) {
      line += '在狗的头';
    } else {
      line += `在${player_name}的头`;
    }
    era.print(`${line}上温柔地抚摸着。`);
  } else {
    let line = `${target_name}因为`;
    if (era.get(`tequip:${target}:90`)) {
      line += '触手的感触、';
    } else if (era.get(`tequip:${target}:89`)) {
      line += '狗舌头的动作、';
    } else {
      line += `${player_name}的爱抚、`;
    }
    line += '感觉到激烈的快感、主动请求给她更多、';
    if (era.get(`tequip:${target}:90`)) {
      line += '任由聚集的触手摆布着。';
    } else if (era.get(`tequip:${target}:89`)) {
      line += '依偎着野狗的身体。';
    } else {
      line += `依恋地靠着${player_name}。`;
    }
    era.print(line);
  }
}

/** @TRAIN_MESSAGE_A 分支 1（舔阴，:746-778） */
async function train_message_a_1() {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const target_name = chara_callname(target);
  if ((era.get('tflag:899') || 0) > 1) {
    return; // :228 守卫（SELECTCOM == 1 由分发表保证）
  }
  const a = era.get(`delta:${target}:0`) || 0; // :229 A = UP:0
  const talent = (i) => era.get(`talent:${target}:${i}`);

  if (a < 300) {
    era.print(`${target_name}的那里、完全没湿、想感觉到快感、还需继续努力。`);
  } else if (a < 1000) {
    era.print(`${target_name}承受着被舔的刺激、确实感觉到快感了。`);
  } else if (a < 3000) {
    // :230-238 一行合成：前缀 + 害羞段 + 快感态度三岔
    let line = `敏感的阴蒂被舔、${target_name}`;
    if (talent(35)) {
      line += '羞耻得面红耳赤、咬着下唇抑制自己发出声音。';
    }
    if (talent(70) || talent(33)) {
      line += '吐出热情的气息、任由快感支配身体。';
    } else if (talent(71) || talent(32)) {
      line += '好像为了否定快感一样不断地摇着头。';
    } else {
      line += '阴部滴出了爱液、发出了轻轻的呻吟。';
    }
    era.print(line);
  } else if (a < 6000) {
    era.print(
      `${target_name}的阴蒂被舌头照顾着。${target_name}发出了可爱的呻吟、身体扭动着、漏出了爱液。`,
    );
  } else if (a < 10000 && !era.get(`tequip:${target}:89`)) {
    era.print(
      `${target_name}发出了媚惑的呻吟。无意识地用手把${player_name}的头压向自己的那里。`,
    );
  } else if (talent(102)) {
    era.print(
      `${target_name}敏感的阴蒂被欺负着、身体也激烈地反应着、强烈的快感让高亢的呻吟戛然而止、小豆豆也悄无声息地膨胀了。`,
    );
  } else {
    era.print(
      `${target_name}因为阴蒂的刺激不断地发出激烈的呻吟、身体越来越苦闷了。`,
    );
  }
}

/** @TRAIN_MESSAGE_A 分支 2（肛门爱抚，:846-890） */
async function train_message_a_2() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  if ((era.get('tflag:899') || 0) > 1) {
    return; // :130 守卫
  }
  const a = era.get(`delta:${target}:2`) || 0; // :131 A = UP:2
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const abl3 = era.get(`abl:${target}:3`) || 0;

  if (a < 300) {
    era.print(
      `${target_name}身体扭曲着发出了悲鸣。${abl3 <= 2 ? '最好再仔细地开发一下。' : '身体还没准备好。'}`,
    );
  } else if (a < 1000) {
    era.print(
      `${target_name}害怕得不停扭动身体。${abl3 <= 2 ? '看来需要再稍微开发。' : '为了获得快感、最好再调教一下身体。'}`,
    );
  } else if (a < 3000) {
    era.print(
      `${target_name}发出小声的娇喘、身子弹起来了。${talent(106) ? '好像还能加强肛门的感觉、' : ''}开始感觉到明确的快感了。`,
    );
  } else if (a < 6000) {
    era.print(`${target_name}的肛门、开始作为称职的性器了。`);
  } else if (a < 10000) {
    const line = `${talent(106) ? '欺负敏感的肛门、' : '刺激肛门、'}${target_name}发出了夸张的尖叫、`;
    era.print(
      `${line}${talent(70) || talent(33) ? '诉说着她的快乐。' : talent(71) || talent(32) ? '拼命地否定着快感。' : '苦闷若狂。'}`,
    );
  } else {
    era.print(
      `${target_name}被彻底开发的肛门、无法承受这样的玩弄。发出了癫狂又带有悲鸣的喘息。`,
    );
  }
}

/** @TRAIN_MESSAGE_A 分支 3（自慰，:261-318——无 TFLAG:899 守卫，源逐字） */
async function train_message_a_3() {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const abl17 = era.get(`abl:${target}:17`) || 0;

  // :156-160 A/B/C/D = UP:0/1/2/17，E = 四者合计
  const a = era.get(`delta:${target}:0`) || 0;
  const b = era.get(`delta:${target}:1`) || 0;
  const c = era.get(`delta:${target}:2`) || 0;
  const d = era.get(`delta:${target}:17`) || 0;
  const e = a + b + c + d;

  // :161-167 LOCALS（男人/扶她 → 撸系文案）
  const male_side = talent(122) || talent(121);
  const locals0 = male_side ? '撸' : '玩弄性器官';
  const locals1 = male_side
    ? '握着勃起变硬的阴茎'
    : '把沾满爱液的私处扒开给你看';

  // :168-184 状态描写（SIF 链全为行内追加，合成一行）
  let line = target_name;
  if (abl17 === 4) {
    line += '露出了沉醉于快感的表情、';
  }
  if (abl17 === 5) {
    line += `感觉到了完全暴露的快乐、带着淫荡的表情、自己${locals1}。`;
  }
  if (talent(35) && abl17 <= 3) {
    line += '羞耻得面红耳赤、';
    if (!talent(45) && !talent(310)) {
      line += '眼中含泪、';
    }
  }
  if (talent(99)) {
    line += '庞大的身体扭曲着、';
  }
  if (talent(100)) {
    line += '娇小的身体、';
  }
  if (!talent(100)) {
    const teq11 = era.get(`tequip:${target}:11`);
    const teq13 = era.get(`tequip:${target}:13`);
    if (teq11 || teq13) {
      line += '在自己的体内、';
    }
    if (teq11 && teq13) {
      line += '塞满了两种虫子的下流模样、';
    } else if (teq11) {
      line += '用手把蠕虫放进去、';
    } else if (teq13) {
      line += '拿着肛门虫塞入深处、';
    }
  }
  if (era.get(`tequip:${target}:53`)) {
    line += '对着摄像机';
  }
  era.print(`${line}继续手淫着。`);

  // :185-208 E 的六档
  if (e < 300) {
    era.print('这样笨拙的手部动作、相比快感还是羞耻来得强烈。');
  } else if (e < 1000) {
    era.print('偶尔身体有轻轻的抖动、证明开始感觉到快感了、不过这才刚开始。');
  } else if (e < 3000) {
    era.print('明显在享受的表情、发出了炽热的呻吟。');
  } else if (e < 6000) {
    era.print(
      '不堪承受快感的冲击、忍不住发出了愉悦的呻吟、自慰的冲动淹没理智了。',
    );
  } else if (e < 10000) {
    era.print(
      `持续的忘我自慰、快感让身体不住跳动、身体弯曲成拱桥状、自己继续${locals0}。`,
    );
  } else {
    era.print(
      `被快感支配、露出了大脑一片空白的淫荡表情、带着迷乱的呻吟持续${locals0}着。放任不管的话、好像能一直这么下去。`,
    );
  }
}

/** @TRAIN_MESSAGE_A 分支 5（胸爱抚，:909-945） */
async function train_message_a_5() {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const target_name = chara_callname(target);
  const talent = (i) => era.get(`talent:${target}:${i}`);
  const teq = (idx) => (era.get(`tequip:${target}:${idx}`) || 0) !== 0;

  // :362 守卫（兽奸中与失神档不写反应）
  if (teq(89) || (era.get('tflag:899') || 0) > 1) {
    return;
  }
  // :363-364 爆乳的先行行
  if (talent(114) && !teq(55)) {
    era.print(
      `${player_name}的手、完全陷入到${target_name}惊心动魄的汹涌波涛中了…… `,
    );
  }

  const a = era.get(`delta:${target}:14`) || 0; // :365 A = UP:14
  // :366-370 吸啜/揉（母乳体质且非搾乳器/吸盘）
  const locals0 = talent(130) && !teq(16) && !teq(90) ? '吸啜' : '揉';

  if (a < 300) {
    era.print(`${target_name}的胸部、好像还未感觉到什么快感。`);
  } else if (a < 1000) {
    era.print(`${target_name}看来正在觉醒被玩弄胸部的快感。`);
  } else if (a < 3000) {
    era.print(
      `${target_name}的胸部、被持续${locals0}着、乳头立起了、呼吸也变得炽热。`,
    );
  } else if (a < 6000) {
    era.print(`对${target_name}胸部的爱抚、让她露出了享受被摆布的表情。`);
  } else if (a < 10000) {
    era.print(
      `${target_name}${talent(109) ? '小小的乳房、' : ''}感觉到了快感、对胸部的刺激、让她感受到了人间极乐。`,
    );
  } else {
    era.print(
      `对${target_name}的胸部、不断${locals0}、让她感到了无上的愉悦、身体不住跳动。`,
    );
    era.print(
      talent(110) || talent(114)
        ? '眼前这丰满硕大的双峰在不停地颤抖、跳动着、真是赏心悦目啊。'
        : '她表情放松、任由快感支配着身体。',
    );
  }
}

// —— @GET_ADV_COM 的本族升格规则（COMF_JUMP.ERB CASE 6/1/3/4/5/8；
//    签名 async (rand) => number，#213 定死） ——

/** 「前回と今回の調教者が同じ」＝ (ASSIPLAY && TFLAG:50) || (!ASSIPLAY && !TFLAG:50) */
function same_player_as_last() {
  const t50 = era.get('tflag:50') || 0;
  return era_flag.assiplay ? t50 !== 0 : t50 === 0;
}

/** 升格目标的可用性复核（CALL COM_ABLE<n>；目标族票未落地 → 0 不升格） */
async function adv_target_able(n) {
  return com_able_family.call(n, { whenMissing: 0 });
}

// CASE 6（COMF_JUMP:9-63）：接吻 → 正常位・接吻（128）/ 站立背后位（133）
async function adv_rule_6() {
  const prev = era_flag.prevcom;
  const prev2 = era.get('tflag:59') || 0;
  if (same_player_as_last()) {
    // 前回が正常位/正常位・胸爱抚/正常位SP → 正常位・接吻
    if ([20, 129, 130].includes(prev) && (await adv_target_able(128)) === 1) {
      return 128;
    }
    // Gスポ・子宮口攻めからの分岐
    if (
      [20, 128, 129, 130].includes(prev2) &&
      [120, 121].includes(prev) &&
      (await adv_target_able(128)) === 1
    ) {
      return 128;
    }
  }
  if (same_player_as_last()) {
    // 前回が背后位系 → 站立背后位
    if ([131, 132, 134].includes(prev) && (await adv_target_able(133)) === 1) {
      return 133;
    }
    if (
      [131, 132, 134].includes(prev2) &&
      [120, 121].includes(prev) &&
      (await adv_target_able(133)) === 1
    ) {
      return 133;
    }
  }
  return 6;
}

// CASE 1（:17-28）：舔阴 → 六九式（69）——非兽奸、非绳缚
async function adv_rule_1() {
  if (
    same_player_as_last() &&
    !era.get(`tequip:${era_flag.target}:89`) &&
    [31, 61, 69].includes(era_flag.prevcom) &&
    !era.get(`tequip:${era_flag.target}:44`) &&
    (await adv_target_able(69)) === 1
  ) {
    return 69;
  }
  return 1;
}

// CASE 3（:56-66）：自慰 → 口交时自慰（125）
async function adv_rule_3() {
  if (
    same_player_as_last() &&
    [31, 123, 124, 126, 127].includes(era_flag.prevcom) &&
    (await adv_target_able(125)) === 1
  ) {
    return 125;
  }
  return 3;
}

// CASE 4（:71-81）：口交 → 六九式（69）——非绳缚、非兽奸
async function adv_rule_4() {
  if (
    same_player_as_last() &&
    [31, 61, 69].includes(era_flag.prevcom) &&
    !era.get(`tequip:${era_flag.target}:44`) &&
    !era.get(`tequip:${era_flag.target}:89`) &&
    (await adv_target_able(69)) === 1
  ) {
    return 69;
  }
  return 4;
}

// CASE 5（:86-119）：胸爱抚 → 正常位・胸爱抚（129）/ 背后位・胸爱抚（131）
async function adv_rule_5() {
  const prev = era_flag.prevcom;
  const prev2 = era.get('tflag:59') || 0;
  if (same_player_as_last()) {
    if ([20, 128, 130].includes(prev) && (await adv_target_able(129)) === 1) {
      return 129;
    }
    if (
      [20, 128, 129, 130].includes(prev2) &&
      [120, 121].includes(prev) &&
      (await adv_target_able(129)) === 1
    ) {
      return 129;
    }
  }
  if (same_player_as_last()) {
    if (
      [21, 132, 133, 134].includes(prev) &&
      (await adv_target_able(131)) === 1
    ) {
      return 131;
    }
    if (
      [21, 131, 132, 133, 134].includes(prev2) &&
      [120, 121].includes(prev) &&
      (await adv_target_able(131)) === 1
    ) {
      return 131;
    }
  }
  return 5;
}

// CASE 8（:101-107）：插入手指 → 刺激Ｇ点（84）。COM_ABLE84 在源侧不存在
// （#213 勘定：「未定义即视为可执行」恰好覆盖），不探测、直接升格。
async function adv_rule_8() {
  if (
    era_flag.prevcom === 8 &&
    (era.get(`abl:${era_flag.player}:12`) || 0) >= 3
  ) {
    return 84;
  }
  if (era_flag.prevcom === 84) {
    return 84;
  }
  return 8;
}

// —— @COM_ABLE0-9（COMABLE.ERB:28-381）——

/** 着衣三件套的共用判定（CFLAG:40 位域 / オムツ 69 / ズーコ 11） */
function cloth_blocked(target, bits) {
  const worn = era.get(`cflag:${target}:40`) || 0;
  const special = era.get(`cflag:${target}:42`) || 0;
  const flag37 = era.get('flag:37') || 0;
  if ((worn & bits) !== 0 && flag37) {
    return true;
  }
  if (special === 69 && (worn & 64) !== 0 && flag37) {
    return true;
  }
  return special === 11 && (worn & 64) !== 0 && flag37;
}

/** 助手嫌弃污物的共用判定（顺从 3 以下 + 反感污臭 + 非不怕脏 → 不可） */
function assi_disgusted() {
  const assi = era_flag.assi;
  return (
    (era.get(`abl:${assi}:0`) || 0) <= 3 &&
    era.get(`talent:${assi}:62`) &&
    !era.get(`talent:${assi}:64`)
  );
}

// @COM_ABLE0（:28-34）：爱抚系过滤与决斗中不可，其余可执行
com_able_family.register(0, async () => {
  if ((era.get('flag:25') || 0) & 1) {
    return 0; // :30-31
  }
  if (era.get(`tequip:${era_flag.target}:55`)) {
    return 0; // :32-33
  }
  return 1;
});

// @COM_ABLE1（:39-70）：舔阴
com_able_family.register(1, async () => {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  if (era.get(`talent:${target}:122`)) {
    return 0; // 対象が男人
  }
  if (era.get(`tequip:${target}:90`)) {
    return 0; // 触手調教中
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0; // 決闘中
  }
  if (cloth_blocked(target, 17)) {
    return 0; // パンツか上着下・ズボン
  }
  // :60-66 性器污れ + 反感污臭的助手
  const stain2 = era.get(`stain:${target}:2`) || 0;
  if ((stain2 & 4 || stain2 & 8 || stain2 & 32) && era_flag.assiplay) {
    if (assi_disgusted()) {
      return 0;
    }
  }
  return 1;
});

// @COM_ABLE2（:71-112）：肛门爱抚（源 :98-100 的「顺从4以上かつ百合气质4以上」
// 实文是 <= 3 && <= 3 → RETURN 1——注释与代码相反，逐字保留）
com_able_family.register(2, async () => {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:89`)) {
    return 0; // 兽奸PLAY中
  }
  if (cloth_blocked(target, 17)) {
    return 0;
  }
  if (era_flag.assiplay === 0) {
    return 1; // :94-95 主人プレイなら自動成功
  }
  // :96-108 助手プレイ：润滑不足时施虐狂或（源文的）双 ≤3 才行
  if ((era.get(`palam:${target}:3`) || 0) < PALAMLV[2]) {
    const assi = era_flag.assi;
    if (era.get(`talent:${assi}:83`)) {
      return 1;
    }
    if (
      (era.get(`abl:${assi}:10`) || 0) <= 3 &&
      (era.get(`abl:${assi}:22`) || 0) <= 3
    ) {
      return 1;
    }
    return 0;
  }
  return 1;
});

// @COM_ABLE3（:113-157）：自慰
com_able_family.register(3, async () => {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  if ((era.get('tflag:899') || 0) > 0) {
    return 0; // 失神中
  }
  // :126-129 顺从/百合气质 3 以下的助手（小恶魔 OK）
  if (
    era_flag.assiplay &&
    ((era.get(`abl:${assi}:10`) || 0) <= 3 ||
      (era.get(`abl:${assi}:22`) || 0) <= 3) &&
    !era.get(`talent:${assi}:87`)
  ) {
    return 0;
  }
  if (era.get(`talent:${target}:150`)) {
    return 0; // 从不自慰
  }
  if (era.get(`tequip:${target}:44`)) {
    return 0; // 绳子
  }
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:88`)) {
    return 0; // 使役
  }
  if (era.get(`tequip:${target}:89`)) {
    return 0; // 兽奸
  }
  if (cloth_blocked(target, 17)) {
    return 0;
  }
  return 1;
});

// @COM_ABLE4（:158-196）：口交（STAIN:2 的爱液位也在判定里，:163）
com_able_family.register(4, async () => {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  const stain2 = era.get(`stain:${target}:2`) || 0;
  const stain0 = era.get(`stain:${target}:0`) || 0;
  if (
    (stain2 & 1 || stain2 & 4 || stain2 & 8 || stain0 & 32) &&
    era_flag.assiplay
  ) {
    if (assi_disgusted()) {
      return 0;
    }
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  // :170-172 対象が男人/扶她的判定在源里已被注释，不移植
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:88`)) {
    return 0;
  }
  // :181-183 (CFLAG:40 & 1) || ((CFLAG:40 & 16) && FLAG:37)（&& 优先于 ||）
  const worn = era.get(`cflag:${target}:40`) || 0;
  if ((worn & 1) !== 0 || ((worn & 16) !== 0 && era.get('flag:37'))) {
    return 0;
  }
  if (cloth_blocked(target, 0)) {
    return 0; // :184-188 オムツ/ズーコ（位 17 的着衣判定不在此段）
  }
  return 1;
});

// @COM_ABLE5（:196-216）：胸爱抚
com_able_family.register(5, async () => {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  if (era.get(`talent:${target}:122`)) {
    return 0; // 男人
  }
  // :206-207 ブラジャーか上着上（位 2|4）
  const worn = era.get(`cflag:${target}:40`) || 0;
  const special = era.get(`cflag:${target}:42`) || 0;
  if ((worn & 6) !== 0 && era.get('flag:37')) {
    return 0;
  }
  if (special === 11 && (worn & 64) !== 0 && era.get('flag:37')) {
    return 0;
  }
  return 1;
});

// @COM_ABLE6（:217-243）：接吻
com_able_family.register(6, async () => {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  const stain0 = era.get(`stain:${target}:0`) || 0;
  if (
    (stain0 & 1 || stain0 & 4 || stain0 & 8 || stain0 & 32) &&
    era_flag.assiplay
  ) {
    if (assi_disgusted()) {
      return 0;
    }
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  if (era.get(`talent:${target}:151`)) {
    return 0; // 绝不侍奉
  }
  if (era.get(`tequip:${target}:45`)) {
    return 0; // 口塞
  }
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  return 1;
});

// @COM_ABLE7（:244-291）：自己扒开
com_able_family.register(7, async () => {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  if ((era.get('tflag:899') || 0) > 0) {
    return 0;
  }
  if (era.get(`talent:${target}:122`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }
  if ((era.get(`abl:${target}:10`) || 0) < 2) {
    return 0; // 顺从 2 未満
  }
  // :266-267 处女时需顺从 3+ 或露出癖 3+
  if (
    era.get(`talent:${target}:0`) &&
    (era.get(`abl:${target}:10`) || 0) < 3 &&
    (era.get(`abl:${target}:17`) || 0) < 3
  ) {
    return 0;
  }
  if (era.get(`tequip:${target}:11`)) {
    return 0; // バイブ使用中
  }
  if (era.get(`tequip:${target}:44`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:88`)) {
    return 0;
  }
  if (cloth_blocked(target, 17)) {
    return 0;
  }
  return 1;
});

// @COM_ABLE8（:292-336）：插入手指
com_able_family.register(8, async () => {
  const target = era_flag.target;
  const assi = era_flag.assi;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  if (era.get(`talent:${target}:122`)) {
    return 0;
  }
  // :304-307 润滑不足 + 顺从/百合 3 以下的助手（施虐狂 OK）
  if (
    (era.get(`palam:${target}:3`) || 0) < PALAMLV[2] &&
    era_flag.assiplay &&
    ((era.get(`abl:${assi}:10`) || 0) <= 3 ||
      (era.get(`abl:${assi}:22`) || 0) <= 3) &&
    !era.get(`talent:${assi}:83`)
  ) {
    return 0;
  }
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:88`)) {
    return 0;
  }
  if (cloth_blocked(target, 17)) {
    return 0;
  }
  // :326-327 貞操帯（79）
  const worn = era.get(`cflag:${target}:40`) || 0;
  const special = era.get(`cflag:${target}:42`) || 0;
  if (special === 79 && (worn & 64) !== 0 && era.get('flag:37')) {
    return 0;
  }
  if (era.get(`talent:${target}:273`)) {
    return 0; // 貞操封印
  }
  return 1;
});

// @COM_ABLE9（:337-380）：舔肛
com_able_family.register(9, async () => {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  if (era_flag.assiplay && assi_disgusted()) {
    return 0; // :341-344（无污渍门槛，只看助手态度）
  }
  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  if (era.get(`tequip:${target}:13`)) {
    return 0; // 肛门虫
  }
  if (era.get(`tequip:${target}:19`)) {
    return 0; // 肛珠
  }
  if (era.get(`tequip:${target}:46`)) {
    return 0; // 浣腸
  }
  if (era.get(`tequip:${target}:49`)) {
    return 0; // 電極
  }
  if (cloth_blocked(target, 17)) {
    return 0;
  }
  return 1;
});

// —— 注册（COM 族 / TRAIN_MESSAGE 分支族 / 升格规则族） ——

for (const [id, fn] of [
  [0, com0],
  [1, com1],
  [2, com2],
  [3, com3],
  [4, com4],
  [5, com5],
  [6, com6],
  [7, com7],
  [8, com8],
  [9, com9],
]) {
  com_family.register(id, fn);
}

for (const [id, fn] of [
  [0, train_message_b_0],
  [1, train_message_b_1],
  [2, train_message_b_2],
  [3, train_message_b_3],
  [4, train_message_b_4],
  [5, train_message_b_5],
  [6, train_message_b_6],
  [7, train_message_b_7],
  [8, train_message_b_8],
  [9, train_message_b_9],
]) {
  train_message_b_family.register(id, fn);
}

// A 分支：源侧 EVENT_MESSAGE_A 只有无 4/6/7/8/9 的分支——注册空
// handler 使「缺失 = 族票未落地落占位行」的语义对这些号保持精确（源侧
// 链落空零输出，占位行反而是错的）
for (const [id, fn] of [
  [0, train_message_a_0],
  [1, train_message_a_1],
  [2, train_message_a_2],
  [3, train_message_a_3],
  [5, train_message_a_5],
]) {
  train_message_a_family.register(id, fn);
}
for (const id of [4, 6, 7, 8, 9]) {
  train_message_a_family.register(id, async () => 0);
}

// 升格规则（挂可直选空间；0/2/7/9 无 CASE——原样返回由 get_adv_com 的
// whenMissing 承担，不注册）
for (const [id, fn] of [
  [1, adv_rule_1],
  [3, adv_rule_3],
  [4, adv_rule_4],
  [5, adv_rule_5],
  [6, adv_rule_6],
  [8, adv_rule_8],
]) {
  adv_com_family.register(id, fn);
}

module.exports = { STUBBED_CALLS };
