/**
 * @file 调教指令 0「爱抚」：@COM0 的实现 + @COM_ABLE0 的可执行性判定
 * （issue #45——第一条真实指令）。
 *
 * 源: target/ERB/調教相關/COMF0_愛撫.ERB  @COM0（:7-168）
 *     target/ERB/調教相關/COMABLE.ERB  @COM_ABLE0（:28-34）
 *
 * 变量承载（ere 等价物，依据 app.asar 的 nextTurnInTrain 实证，#44）：
 *   - SOURCE:xx → `source:${cid}:${xx}`（nextTurnInTrain 每回合清零；Emuera
 *     只在 BEGIN TRAIN 清零，跨指令残值的差异见 issue #45 留言）；
 *   - LOSEBASE:0/1 → `deltabase:${cid}:0/1` 的**负值**累加（引擎
 *     base += deltabase 并钳到 [0, maxbase]，这张票仅负责让 deltabase 动起来，
 *     结算在回合循环的 nextTurnInTrain）。
 *
 * 这张票存根/登记的分支（docs/stub-registry.md「@COM0 分支待办」节）：
 *   - :76-82 口污 + ASSIPLAY 分支与 :84-88 口塞（TEQUIP:45）分支——助手
 *     调教（ASSIPLAY）与口塞装备均无写入路径，整支登记；
 *   - :122-123 兽奸提前返回（TEQUIP:89）、:128-133 触手污れ（TEQUIP:90）
 *     ——装备系整支登记；
 *   - @COM0_AUTO（:174 起）——CALLTRAIN 自动调教未移植，登记。
 * 其余分支（:90-94 初吻回避、:95-119 接吻侧素质修正与口污移动、:134-141
 * 污れ移动、:147-165 经验上昇）在当前构建全部可达，1:1 移植。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { com_able_family, com_family } = require('#/system/train/com-family');
const { train_message_b } = require('#/system/train/train-message');

/**
 * 本文件存根化的原作函数名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。
 */
const STUBBED_CALLS = ['COM0_AUTO'];

// SOURCE 的分档表：纯数据，错一格不会报错——每一档的用例与变异测试固定住
// （com0-caress.test.js / tools/mutation-check.mjs）。

// :32-51 ABL:0（阴蒂感觉）分档 → [SOURCE:0, SOURCE:3]（ELSE 档 = ABL:0 ≥ 5）
const ABL_C_TIERS = [
  [20, 25],
  [100, 50],
  [500, 80],
  [1200, 100],
  [2000, 115],
  [2800, 125],
];

// :53-72 ABL:1（乳房感觉）分档 → [SOURCE:17, SOURCE:3 增量]（ELSE 档 = ≥ 5）
const ABL_B_TIERS = [
  [15, 25],
  [50, 50],
  [300, 80],
  [700, 100],
  [1100, 115],
  [1600, 125],
];

/**
 * @COM0（COMF0_愛撫.ERB:7-168）。注册于 COM 族（编号 0）。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com0() {
  const target = era_flag.target;
  const player = era_flag.player;

  // :9 PRINTL 爱抚（;SAVESTR:22 = 爱抚 在原作已是注释，不移植）
  era.print('爱抚');
  // :11 CALL TRAIN_MESSAGE_B（通用前缀文本，COM0 分支已移植）
  await train_message_b();

  // —— ソースの計算 ——
  // :16-17 LOSEBASE:0 += 5 / LOSEBASE:1 += 50（deltabase 负向累加，见文件头）
  era.add(`deltabase:${target}:0`, -5);
  era.add(`deltabase:${target}:1`, -50);

  // :20-30 基础源：阴核/乳房/情爱 先清 0（指令内的「= 0」在 ere 由回合清零
  // 承担，此三行不落；性行动/不洁/露出 直接赋值）
  const src = (idx) => era.get(`source:${target}:${idx}`) || 0;
  const set_src = (idx, v) => era.set(`source:${target}:${idx}`, v);
  set_src(4, 60); // :26 性行動
  set_src(8, 30); // :28 不潔
  set_src(12, 100); // :30 露出

  // :32-51 ABL:0（阴蒂感觉）分档
  const abl_c = Math.min(Math.floor(era.get(`abl:${target}:0`) || 0), 5);
  set_src(0, ABL_C_TIERS[abl_c][0]);
  set_src(3, ABL_C_TIERS[abl_c][1]);

  // :53-72 ABL:1（乳房感觉）分档（SOURCE:3 是增量累加）
  const abl_b = Math.min(Math.floor(era.get(`abl:${target}:1`) || 0), 5);
  set_src(17, ABL_B_TIERS[abl_b][0]);
  set_src(3, src(3) + ABL_B_TIERS[abl_b][1]);

  // :74-119 接吻侧修正。:76-82（口污 + ASSIPLAY）与 :84-88（口塞）整支
  // 登记存根（见文件头）：当前构建 ASSIPLAY 恒 0、TEQUIP:45 无写入点。
  if ((era.get(`cflag:${target}:16`) || 0) === -1) {
    // :90-94 初吻未体験 → 回避接吻，效果减
    set_src(8, 0); // :91
    set_src(0, Math.floor(src(0) / 2)); // :92
    set_src(3, Math.floor(src(3) / 4)); // :93
    set_src(10, Math.floor(src(10) / 2)); // :94
  } else {
    // :95-119 已有接吻经验：素质修正 + 主人口污加成 + 口污双向移动
    // :97-98 不怕污臭（TALENT:61）
    if (era.get(`talent:${target}:61`)) {
      set_src(8, Math.floor(src(8) / 4));
    }
    // :100-101 反感污臭（TALENT:62）
    if (era.get(`talent:${target}:62`)) {
      set_src(8, src(8) * 3);
    }
    // :103-104 自尊心（TALENT:15 高姿态）
    if (era.get(`talent:${target}:15`)) {
      set_src(8, src(8) * 2);
    }
    // :106-109 爱慕（TALENT:85）且主人亲自调教
    if (era.get(`talent:${target}:85`) && era_flag.assiplay === 0) {
      set_src(3, src(3) * 2);
      set_src(8, Math.floor(src(8) / 10));
    }
    // :110-114 主人的口有污垢 → 不潔 150%（*= 3; /= 2）
    if (era.get(`stain:${player}:0`)) {
      set_src(8, Math.floor((src(8) * 3) / 2));
    }
    // :116-118 奴隶的口 ⇔ 调教者的口污垢移动
    const mouth = src_mouth_exchange(target, player);
    era.set(`stain:${target}:0`, mouth.target_mouth);
    era.set(`stain:${player}:0`, mouth.player_mouth);
  }

  // :121-123 兽奸提前返回（TEQUIP:89）——装备系存根，登记不落

  // —— 汚れの処理（:125-142）——
  // :128-133 触手污れ（TEQUIP:90）整支登记存根；ELSE 支 1:1：
  // :135-137 奴隶的 V ⇔ 调教者的指
  const v_stain =
    (era.get(`stain:${target}:3`) || 0) | (era.get(`stain:${player}:1`) || 0);
  const hand_after_v = (era.get(`stain:${player}:1`) || 0) | v_stain;
  era.set(`stain:${target}:3`, v_stain);
  era.set(`stain:${player}:1`, hand_after_v);
  // :139-141 奴隶的 B ⇔ 调教者的指
  const b_stain = (era.get(`stain:${target}:5`) || 0) | hand_after_v;
  const hand_after_b = hand_after_v | b_stain;
  era.set(`stain:${target}:5`, b_stain);
  era.set(`stain:${player}:1`, hand_after_b);

  // —— 経験上昇（:144-165）——
  // :148-156 百合经验（EXP:40）/ 断背经验（EXP:41）：双方性别一致才发生
  //（PRINTS + PRINTL 两段在 ere 侧合一次 print——一次 print 即一行，
  //page-train/event-comend 同款约定）
  const target_male = era.get(`talent:${target}:122`);
  const player_male = era.get(`talent:${player}:122`);
  if (!target_male && !player_male) {
    era.print('百合经验+5'); // :149-150 PRINTS EXPNAME:40 / PRINTL +5
    era.add(`exp:${target}:40`, 5);
  } else if (target_male && player_male) {
    era.print('断背经验+5'); // :153-154
    era.add(`exp:${target}:41`, 5);
  }

  // :160-166 爱情经验（EXP:23）：主人亲自调教且 CFLAG:2（好感度累计）≥ 1000
  const love_exp = 2; // :160 E = 2
  if ((era.get(`cflag:${target}:2`) || 0) >= 1000 && era_flag.assiplay === 0) {
    era.print(`爱情经验+${love_exp}`); // :163 PRINTFORML %EXPNAME:23%+{E}
    era.add(`exp:${target}:23`, love_exp);
  }

  // :168 RETURN 1
  return 1;
}

// :117-118 的口污交换（ slave STAIN:0 |= player STAIN:0 后双向同步）。
// Emuera 两行顺序执行：先并进 slave 口，再把合并值并回 player 口——结果
// 两边同为原两值的按位或。
function src_mouth_exchange(target, player) {
  const target_mouth =
    (era.get(`stain:${target}:0`) || 0) | (era.get(`stain:${player}:0`) || 0);
  const player_mouth = (era.get(`stain:${player}:0`) || 0) | target_mouth;
  return { target_mouth, player_mouth };
}

// @COM_ABLE0（COMABLE.ERB:28-34）：爱抚系过滤与决斗中不可执行，其余可执行
com_able_family.register(0, async () => {
  // :30-31 SIF FLAG:25 & 1（爱抚系过滤）→ RETURN 0
  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }
  // :32-33 SIF TEQUIP:55（决斗中）→ RETURN 0（TEQUIP 寻址需火车表已开——
  // COM_ABLE 扫描发生在回合循环内，beginTrain 必先于扫描）
  if (era.get(`tequip:${era_flag.target}:55`)) {
    return 0;
  }
  return 1; // :34
});

com_family.register(0, com0);

module.exports = { ABL_B_TIERS, ABL_C_TIERS, STUBBED_CALLS };
