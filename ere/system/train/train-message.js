/**
 * @file 调教文本的通用前缀与后缀：@TRAIN_MESSAGE_B（指令情景描写，前）与
 * @TRAIN_MESSAGE_A（参数上升反应，后）的 COM0（爱抚）分支（issue #45）。
 *
 * 源: target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB  @TRAIN_MESSAGE_B
 *     （:12-3049 全文；本票移植 :19-90 的公共头 + 爱抚分支，其余指令分支
 *     随各自指令票扩展）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB  @TRAIN_MESSAGE_A
 *     （:15-1351 全文；本票移植 :22-26 的公共头 + :745-808 的爱抚反应分支）
 *
 * 原作 B 在前、A 在后（B 文件头 :10 的调用方注释）；ere 侧同为两次直调：
 * B 由 @COM0 调（COMF0_愛撫.ERB:11），A 由 @SOURCE_CHECK 调
 * （SYSTEM_SOURCE.ERB:478）。
 *
 * 本票存根/登记（docs/stub-registry.md）：
 *   - B 的服装前缀组（:29-39，PRINT_CLOTHTYPE_SPECIAL / _MAIN2）：CFLAG:40/42
 *     着衣位无写入路径（服装系统存根），三支整组登记，黄金样本中的
 *     「隔着紧身衣＆裙甲、」前缀是本票与样本的记名差异之一；
 *   - B 的 TEQUIP:90/88/89 描写支（:40-66，触手/魔兽/兽奸）：装备位无写入
 *     路径，整组登记；
 *   - B/A 的其余 SELECTCOM 分支（舔阴 :94 起 / 射精文本 :30-120 等）：随
 *     各自指令票扩展，default 落存根占位行。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 本文件存根化的原作函数名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。
 */
const STUBBED_CALLS = ['TRAIN_MESSAGE_B', 'TRAIN_MESSAGE_A'];

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
 * @TRAIN_MESSAGE_B 的爱抚分支（SELECTCOM == 0，:28-90）。
 *
 * @returns {Promise<void>} 原作 RETURN 0
 */
async function train_message_b_caress() {
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target);

  // :29-39 服装前缀（CFLAG:40/42）——服装系统存根，整组登记（见文件头）；
  // :40-66 TEQUIP:90/88/89 描写支——装备位存根，整组登记（见文件头）。

  // :67-72 普通支：调教者名 +（接吻条件成立的）轻舔 + 仔细爱抚着
  let line = chara_callname(player);
  // :69 接吻文本的条件：奴隶口污为爱液系（<2 / 16 / 17）或主人不怕脏
  // （TALENT:64）或助手调教，且未装口塞（TEQUIP:45）、已有初吻
  // （CFLAG:16 != -1）
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
    line += `轻舔着${target_name}的唇、`; // :70
  }
  line += '仔细爱抚着'; // :71
  // :73-88 目标名 + 体型/肤色描述 + 的身体……
  line += `${target_name}${body_phrase(target)}的身体……`;
  era.print(line);

  // :89-90 妊娠中的胎动（TALENT:153 妊娠 && CFLAG:110 受孕期判定 &&
  // 非紧身衣着衣态）——CFLAG:110/TALENT:153 的写入路径未移植，条件 1:1
  // 保留（达成时文本随妊娠票核对）
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
 * @TRAIN_MESSAGE_B（:12-）。当前仅实现爱抚分支，其余指令落存根占位行。
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

  if (era_flag.selectcom === 0) {
    await train_message_b_caress();
  } else {
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
 * @returns {Promise<void>}
 */
async function train_message_a_caress() {
  const target = era_flag.target;
  const player_name = chara_callname(era_flag.player);
  const target_name = chara_callname(target);

  // :747-749 A = UP:0、B = UP:14、C = A + B
  const c =
    (era.get(`delta:${target}:0`) || 0) + (era.get(`delta:${target}:14`) || 0);

  // 爱抚分支的进入条件 :745：SELECTCOM == 0 && TEQUIP:44 == 0（绳子紧缚中
  // 换文本）&& TFLAG:899 <= 1（失神档位）——后两条当前无写入路径，守卫 1:1
  // 保留在 train_message_a 的分支判断里（见下）
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
 * @TRAIN_MESSAGE_A（:15-）。当前仅实现爱抚分支，其余指令落存根占位行。
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

  // :744 爱抚分支守卫：SELECTCOM == 0 && TEQUIP:44 == 0 && TFLAG:899 <= 1
  if (
    era_flag.selectcom === 0 &&
    !era.get(`tequip:${era_flag.target}:44`) &&
    (era.get('tflag:899') || 0) <= 1
  ) {
    await train_message_a_caress();
  } else if (era_flag.selectcom === 0) {
    // 爱抚但缚绳/失神中：分支文本随失神票（TFLAG:899 分档文本在
    // PASSOUT_TEXT 一族），此处不硬造
    stub_line('TRAIN_MESSAGE_A', '紧缚/失神中的爱抚反应', '随失神票');
  } else {
    stub_line(
      'TRAIN_MESSAGE_A',
      `指令 ${era_flag.selectcom} 的参数反应`,
      '随各自指令票',
    );
  }
}

module.exports = {
  STUBBED_CALLS,
  train_message_a,
  train_message_b,
};
