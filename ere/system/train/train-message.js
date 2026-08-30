/**
 * @file 调教文本的通用前缀与后缀：@TRAIN_MESSAGE_B（指令情景描写，前）与
 * @TRAIN_MESSAGE_A（参数上升反应，后）的 COM0（爱抚）分支与分发骨架
 * （issue #45 落地爱抚分支，#213 立分发表——其余 SELECTCOM 分支随各自
 * 指令票在 com-<族>.js 注册，default 落存根占位行）。
 *
 * 源: target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB  @TRAIN_MESSAGE_B
 *     （:12-3049 全文；公共头 :19-26 + 107 个 IF SELECTCOM == 分支）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB  @TRAIN_MESSAGE_A
 *     （:15-1351 全文；公共头 :22-26 + 82 个分支）
 *
 * 原作 B 在前、A 在后（B 文件头 :10 的调用方注释）；ere 侧同为两次直调：
 * B 由 @COM0 调（COMF0_愛撫.ERB:11），A 由 @SOURCE_CHECK 调
 * （SYSTEM_SOURCE.ERB:478）。
 *
 * == 分发表（#209 裁定 6 / #213 立面） ==
 *
 * 平铺大文件只留公共头做骨架，各族的段跟族票。ere 侧按族建模块
 * （com-<族>.js）：族票把该族的 TRAIN_MESSAGE 分支注册进
 * train_message_b_family / train_message_a_family——声明空间 = 121 段
 * 分发空间（SELECTCOM 经升格可取高级 COM 号，高级号的分支同样在这两张
 * 表里）。缺失（族票未落地）→ 存根占位行；空间外 → 显式抛错（SELECTCOM
 * 只会是 121 之一，越界即引擎对接 bug，不静默回落）。
 *
 * 这张票存根/登记（docs/stub-registry.md）：
 *   - B/A 的其余 SELECTCOM 分支（舔阴 :94 起 / 射精文本 :30-120 等）：随
 *     各自指令票扩展，default 落存根占位行。
 *
 *   爱抚分支的服装前缀组（:29-39）与 TEQUIP:90/88/89 描写支（:40-66）自
 *   #215（J5）起为真身（ere/page/page-clothtype.js 的串构造 +
 *   ere/dungeon/monster-data.js 的魔兽名）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { chara_callname } = require('#/utils/callname-utils');
const { e_get, monster_name } = require('#/dungeon/monster-data');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { DECLARED_COM_IDS } = require('#/system/train/com-family');
const {
  clothtype_main2_text,
  clothtype_special_text,
} = require('#/page/page-clothtype');

/**
 * 本文件存根化的原作函数名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。
 */
const STUBBED_CALLS = ['TRAIN_MESSAGE_B', 'TRAIN_MESSAGE_A'];

/**
 * @TRAIN_MESSAGE_B 的分支族（SELECTCOM → 情景描写）。族票在 com-<族>.js
 * 注册：`train_message_b_family.register(<n>, async () => { … })`。
 */
const train_message_b_family = new DispatchFamily(
  'TRAIN_MESSAGE_B',
  DECLARED_COM_IDS,
);

/**
 * @TRAIN_MESSAGE_A 的分支族（SELECTCOM → 参数上升反应）。
 */
const train_message_a_family = new DispatchFamily(
  'TRAIN_MESSAGE_A',
  DECLARED_COM_IDS,
);

// 分支缺失的哨兵：族票未落地的指令走存根占位行（#45 起的既有行为）
const BRANCH_MISSING = Symbol('TRAIN_MESSAGE_BRANCH_MISSING');

// 体质描述（:74-87）——TALENT:135 未熟 / 100 娇小 / 115 肥胖（体型三选一）；
// 244 恶魔肌肤 / 253 褐色肌肤 / 255 白皙（肤色三选一）。名字表见 yml/Talent.yml
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
 * :89-90 妊娠中的胎动（TALENT:153 妊娠 && CFLAG:110 受孕期判定 && 非史莱姆
 * 着衣态）。B 文全部 SELECTCOM 分支的公共尾段（爱抚分支 :29-90 与其余分支
 * 同款），CFLAG:110/TALENT:153 的写入路径未移植，条件 1:1 保留（达成时
 * 文本随妊娠票核对）。
 * @param {number} target 目标角色 ID
 * @param {string} target_name 目标显示名
 * @returns {Promise<void>}
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

/**
 * @TRAIN_MESSAGE_B 的爱抚分支（SELECTCOM == 0，:28-90）。
 *
 * @returns {Promise<void>} 原作 RETURN 0
 */
async function train_message_b_caress() {
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target);

  // :29-39 服装前缀（CFLAG:40/42）——原作 CALL PRINT_CLOTHTYPE_SPECIAL /
  // _MAIN2 的行内拼串（#215 起真身，ere/page/page-clothtype.js）：
  // 特别服装（位 64 且类型 ≤50）→ 隔着<特别服装>、；上装在身（位 28）→
  // 隔着<基本服装>、；仅内衣 → 隔着内衣、
  const cloth_bits = era.get(`cflag:${target}:40`) || 0;
  const special_type = era.get(`cflag:${target}:42`) || 0;
  let line = '';
  if ((cloth_bits & 64) !== 0 && special_type <= 50) {
    line += `隔着${clothtype_special_text(target)}、`; // :30-32
  } else if ((cloth_bits & 28) !== 0) {
    line += `隔着${clothtype_main2_text(target)}、`; // :33-35
  } else if (cloth_bits !== 0) {
    line += '隔着内衣、'; // :36-37
  }

  // :40-66 装备描写支（TEQUIP:90 触手 :40-41 / 88 魔兽 :42-63 / 89 兽奸 :65-66）——#215 起
  // 真身。魔兽支的名字行走 MONSTER_NAME（ere/dungeon/monster-data.js），
  // 怪物数据在 E 数组第 4 列（E:300 = COMF88 的 CALL MONSTER_DATA 置入，
  // E:307 = 种族），其分支文本用 PRINTL 收行——名字行独立成行，身体行另起
  const tequip = (idx) => era.get(`tequip:${target}:${idx}`) || 0;
  if (tequip(90)) {
    line += '触手玩弄着'; // :40-41
  } else if (tequip(88)) {
    // :42-63 CALL MONSTER_NAME,E:300,0（:43）+ E:307 种族分支（:44-62）
    const species = e_get(307);
    const action =
      species === 2
        ? '用满是黏液的身体包覆着' // スライム
        : species === 3
          ? '那冰冷的节肢正触碰着' // 昆虫
          : species === 4
            ? '伸出藤蔓抚弄着' // 植物
            : species === 5 || species === 11
              ? '伸出触手玩弄着' // 触手・脳
              : species === 6
                ? '用娇小的身驱紧贴摩擦着' // 妖精
                : species === 10 || species === 12
                  ? '那野兽的舌头正舔着' // 獣・馬
                  : '正仔细地爱抚着'; // :63 ELSE
    // PRINTL 收行：服装前缀 + 魔兽名 + 种族动作收在第一行（Emuera 的
    // PRINT 追加同一行缓冲），身体行另起
    era.print(`${line}${monster_name(e_get(300))}${action}`);
    era.print(`${target_name}${body_phrase(target)}的身体……`);
    await print_pregnancy_kick(target, target_name);
    return;
  } else if (tequip(89)) {
    line += '狗的舌头舔舐着'; // :65-66
  } else {
    // :67-72 普通支：调教者名 +（接吻条件成立的）轻舔 + 仔细爱抚着。
    // 接吻文本的条件：奴隶口污为爱液系（<2 / 16 / 17）或主人不怕脏
    // （TALENT:64）或助手调教，且未装口塞（TEQUIP:45）、已有初吻
    // （CFLAG:16 != -1）
    line += chara_callname(player); // :68 %SAVESTR:PLAYER%
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
  // :73-88 目标名 + 体型/肤色描述 + 的身体……
  line += `${target_name}${body_phrase(target)}的身体……`;
  era.print(line);
  await print_pregnancy_kick(target, target_name);
}

/**
 * @TRAIN_MESSAGE_B（:12-）。公共头（省略设定 + 点线）后按 SELECTCOM 分发；
 * 缺失分支落存根占位行，空间外显式抛错（见文件头「分发表」）。
 *
 * @returns {Promise<void>}
 */
async function train_message_b() {
  // :19-21 調教テキスト省略設定（FLAG:6 & 1）→ 直接返回
  if ((era.get('flag:6') || 0) & 1) {
    return;
  }
  // :23 CUSTOMDRAWLINE ‥ —— ere 的 drawLine 是实线分隔（'‥' 点线是排版
  // 近似，记名差异见 issue #45）
  era.drawLine();

  const branch = await train_message_b_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
  });
  if (branch === BRANCH_MISSING) {
    stub_line(
      'TRAIN_MESSAGE_B',
      `指令 ${era_flag.selectcom} 的情景描写`,
      '随各自指令票',
    );
  }
}

/**
 * @TRAIN_MESSAGE_A 的爱抚反应分支（:745-808）。
 *
 * 原作读 UP:0 + UP:14（快Ｃ与快Ｂ的上升量合计）分档；ere 侧 UP 的等价物
 * 是 delta 表（nextTurnInTrain 结算 delta→palam，本函数在其前运行，读数
 * 与原作同位）。
 *
 * 分支守卫（:746）在 handler 内：SELECTCOM == 0 && TEQUIP:44 == 0
 * （绳子紧缚中换文本）&& TFLAG:899 <= 1（失神档位）——后两条当前无写入
 * 路径，守卫 1:1 保留；不满足时落「紧缚/失神中的爱抚反应」占位行
 * （#45 起的既有行为，分支文本随失神票）。
 *
 * @returns {Promise<void>}
 */
async function train_message_a_caress() {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const target_name = chara_callname(target);

  // :746 爱抚分支守卫（SELECTCOM == 0 由分发表保证，另两条在此）
  if (era.get(`tequip:${target}:44`) || (era.get('tflag:899') || 0) > 1) {
    stub_line('TRAIN_MESSAGE_A', '紧缚/失神中的爱抚反应', '随失神票');
    return;
  }

  // :747-749 A = UP:0、B = UP:14、C = A + B
  const c =
    (era.get(`delta:${target}:0`) || 0) + (era.get(`delta:${target}:14`) || 0);

  if (c < 100) {
    // :751-760
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
    // :761-773
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
    // :774-778（黄金样本首次爱抚的档位：但…像被轻微电击一样）
    let line = '';
    if (era.get(`talent:${target}:22`)) {
      line += '虽然表情上没有任何变化、';
    }
    era.print(`${line}但${target_name}的身体却像被轻微电击一样、微微颤动着。`);
  } else if (c < 3000) {
    // :779-780
    era.print(
      `${target_name}明确地感受到了快感、轻轻喘息着、发出了媚惑的呻吟。`,
    );
  } else if (c < 6000) {
    // :781-790
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
    // :791-807
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

/**
 * @TRAIN_MESSAGE_A（:15-）。公共头（省略设定 + 点线）后按 SELECTCOM 分发；
 * 缺失分支落存根占位行，空间外显式抛错（见文件头「分发表」）。
 *
 * @returns {Promise<void>}
 */
async function train_message_a() {
  // :22-24 調教テキスト省略設定（FLAG:6 & 1）→ 直接返回
  if ((era.get('flag:6') || 0) & 1) {
    return;
  }
  // :26 CUSTOMDRAWLINE ‥（排版近似说明同 train_message_b）
  era.drawLine();

  const branch = await train_message_a_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
  });
  if (branch === BRANCH_MISSING) {
    stub_line(
      'TRAIN_MESSAGE_A',
      `指令 ${era_flag.selectcom} 的参数反应`,
      '随各自指令票',
    );
  }
}

// COM0（爱抚）分支注册（#45 落地的两个分支；其余指令随族票接进两张表）
train_message_b_family.register(0, train_message_b_caress);
train_message_a_family.register(0, train_message_a_caress);

module.exports = {
  STUBBED_CALLS,
  train_message_a,
  train_message_a_family,
  train_message_b,
  train_message_b_family,
};
