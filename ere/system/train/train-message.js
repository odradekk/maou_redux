/**
 * @file 调教文本的公共头与分发族：@TRAIN_MESSAGE_B（指令情景描写，前）与
 * @TRAIN_MESSAGE_A（参数上升反应，后）（issue #213 立分发表——爱抚 0-9
 * 分支随 #219 归 com-caress.js，其余 SELECTCOM 分支随各自指令票在
 * com-<族>.js 注册）。
 *
 * 源: target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB  @TRAIN_MESSAGE_B
 *     （:12-3049 全文；公共头 :19-26 + 107 个 IF SELECTCOM == 分支 + 尾部
 *     :3041-3046 的 TFLAG:31 归一）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB  @TRAIN_MESSAGE_A
 *     （:15-1351 全文；公共头 :22-26 + 公共段 :31-741 + 82 个 SELECTCOM
 *     分支 :746-1351）
 *
 * 原作 B 在前、A 在后（B 文件头 :10 的调用方注释）；ere 侧同为两次直调：
 * B 由各 @COMn 调（COMF0_愛撫.ERB:11 等），A 由 @SOURCE_CHECK 调
 * （SYSTEM_SOURCE.ERB:478）。
 *
 * == 分发表（#209 裁定 6 / #213 立面） ==
 *
 * 平铺大文件只留公共头做骨架，各族的段跟族票。ere 侧按族建模块
 * （com-<族>.js）：族票把该族的 TRAIN_MESSAGE 分支注册进
 * train_message_b_family / train_message_a_family——声明空间 = 121 段
 * 分发空间（SELECTCOM 经升格可取高级 COM 号，高级号的分支同样在这两张
 * 表里）。空间外 → 显式抛错（SELECTCOM 只会是 121 之一，越界即引擎对接
 * bug，不静默回落）；空间内的缺号 #45 起走存根占位行，#402 收口后全数
 * 有主，#565 起按原作语义归为零输出（无分支的号什么都不打印）。
 * **两张表同住本文件**：A 与 B 是同一套指令号分发的两半，分发骨架、公共头
 * 与公共段都在一处，不另立第二份分发逻辑。
 *
 * 源侧**没有**对应分支的指令号（B 55/110/111、A 43-49/110/111）在文件末尾
 * 显式注册空 handler：源侧链对它们落空（零输出），落占位行反而是错的
 * （同款先例：com-caress.js 的 A 4/6/7/8/9、com-toy.js 的 A 15-19）。
 *
 * == 公共段（#402） ==
 *
 * A 的公共段（源 :31-741）不按 SELECTCOM 分发，而是在分发之前无条件跑：
 * 股间射精（TFLAG:9）→ 触手（TFLAG:15）→ 狗（TFLAG:16）→ 助手（TFLAG:7）
 * → **射精链**（TFLAG:0/1/18 六档 + 放置 PLAY 末支，一条 IF/ELSEIF 链）
 * → 绝顶（TFLAG:29）→ 性交射精（TFLAG:2，含 CFLAG:113 乳内）。**执行顺序
 * 即输出顺序**，一律照源侧排。
 *
 * 排版近似：原作连续 `PRINT`/`PRINTFORM` 片段拼成一条可见行，ere 的
 * `print` 一次调用即一行，故本文件把同一行的片段先拼成字符串再一次输出；
 * 源侧未以 `PRINTL` 收尾的断句（如股间射精 0 臂的色名链无 ELSE）在 ere
 * 侧落成一行残缺文本——行数记名差异见各段注释。
 *
 * == handler 签名（#219 起，族票照此写）：async (rand) => 0 ==
 *
 * rand 是 RAND:N 的随机源（[0, n) 整数，缺省均匀随机，由本文件的两次
 * dispatch 注入——kojo_message_com / get_adv_com 同款先例）。B 分支 3/4
 * 的 LOCALS 分流（RAND:2 / RAND:3）经它取随机，测试注入定值序固定分支。
 *
 * 这张票存根/登记（docs/stub-registry.md）：本文件自身不再留存根——A/B
 * 两个函数的全部指令号分支与公共段都已落真身（#402），缺号语义由文件末尾
 * 的空 handler 与族注册表共同保证。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { DECLARED_COM_IDS } = require('#/system/train/com-family');
const { PALAMLV } = require('#/era-utils/palam-level');
const { chara_callname } = require('#/utils/callname-utils');
const {
  clothtype_main2_text,
  clothtype_special_text,
} = require('#/page/page-clothtype');
const { game } = require('#/facade/game');

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

// 分支缺失的哨兵：#45 起缺号走占位行；#402 收口后空间全数有主，缺号语义
// 按原作归为零输出（#565 删占位回落），哨兵随之退役。

/** RAND:N 随机源（缺省均匀随机；get_adv_com 同款注入形状，#219 起） */
const rand_source = () => (n) => Math.floor(Math.random() * n);

// —— 公共段的读数兜底（未声明下标返回 undefined，#13） ——

const tal = (cid, i) => era.get(`talent:${cid}:${i}`) || 0;
const abl = (cid, i) => era.get(`abl:${cid}:${i}`) || 0;
const palam = (cid, i) => era.get(`palam:${cid}:${i}`) || 0;
const exp = (cid, i) => era.get(`exp:${cid}:${i}`) || 0;
const tq = (cid, i) => era.get(`tequip:${cid}:${i}`) || 0;
const tflag = (i) => era.get(`tflag:${i}`) || 0;

/**
 * 肌肤色素质 → 源侧文案里的色名。三条互斥、按源侧 IF/ELSEIF 链的顺序取首个
 * 命中（:44-49 的 0 臂、:70-76 的 1 臂、:99-105 的 2 臂三处同款顺序——
 * yml/Talent.yml：244 恶魔肌肤 / 253 褐色肌肤 / 255 白皙）。
 * @param {number} cid
 * @returns {string|undefined} '蓝色' / '褐色' / '白皙'；三者皆无时 undefined
 */
function skin_color(cid) {
  if (tal(cid, 244)) {
    return '蓝色';
  }
  if (tal(cid, 253)) {
    return '褐色';
  }
  if (tal(cid, 255)) {
    return '白皙';
  }
  return undefined;
}

/**
 * 公共段「股间性交射精」（源 :31-110）。外三层按 TFLAG:9 分臂（0 = 对象
 * 射精、1 = 主人射精、2 = 主人大量射精），臂内按 SELECTCOM 分派（122 阴茎
 * 互捅 / 33 股间性交 / 62 双人股间），色名取对象的肌肤素质。
 *
 * 两处源侧形态 1:1 保留、不补字：
 *   - **0 臂的 62 支没有自己的开头**（源侧 33/62 共用 `ELSEIF`，但补前缀的
 *     那句 `SIF SELECTCOM == 33` 只覆盖 33），拼出来是「〈对象〉射精出的
 *     白皙肌肤弄脏了…」；
 *   - **0 臂的色名链没有 ELSE**（:44-50），无肌肤素质时整行断在
 *     「〈对象〉射精出的精液、把〈主人〉的」——1 臂与 2 臂的色名链是内层
 *     `PRINT` + 外层 `PRINTL`，无素质时仍出「…的肌肤弄脏了…」，两臂形态
 *     不同，照抄。
 */
function emit_intercrural_ejaculation() {
  const target = era_flag.target;
  const player = era_flag.player;
  const selectcom = era_flag.selectcom;
  const tflag9 = tflag(9);
  const tflag10 = tflag(10);
  const target_name = chara_callname(target);

  if (tflag9 === 0) {
    // :33-54 对象射精：只在 122/33/62 三支上有输出，且需 TFLAG:10 ≥ 1
    if (tflag10 < 1) {
      return;
    }
    const head = `${target_name}射精出的${tflag10 >= 2 ? '大量' : ''}`;
    if (selectcom === 122) {
      era.print(
        `${head}精液、将${chara_callname(player)}的阴茎用精液一吐为快了…`,
      ); // :39
      return;
    }
    if (selectcom === 33 || selectcom === 62) {
      // 33 支补「精液、把〈主人〉的」；62 支没有这句（源侧如此）
      const line =
        selectcom === 33
          ? `${head}精液、把${chara_callname(player)}的` // :43
          : head;
      const color = skin_color(target);
      if (color === undefined) {
        era.print(line); // 断句残留：源侧色名链无 ELSE
      } else {
        era.print(`${line}${color}肌肤弄脏了…`); // :45/:47/:49
      }
      if (selectcom === 62) {
        era.print('射出的精液、把两人的身体都弄脏了…'); // :52
      }
    }
    return;
  }

  if (tflag9 !== 1 && tflag9 !== 2) {
    return;
  }
  const heavy = tflag9 === 2; // 2 臂 = 大量射精，文案逐字不同

  if (selectcom === 122) {
    // :58-65（1 臂）/ :87-94（2 臂）：主人与对象同为扶她且对象也射了 → 同时射精
    const both = tflag10 >= 1 && (tal(player, 122) || tal(player, 121));
    if (both) {
      era.print(
        heavy
          ? '两人同时射精、对彼此的阴茎用大量的精液一吐为快…' // :90
          : '两人同时射精、对彼此的阴茎用精液一吐为快了…', // :61
      );
    } else {
      era.print(
        heavy
          ? `${chara_callname(player)}射出大量的精液、把${target_name}的阴茎搞得黏黏糊糊…` // :93
          : `射出的精液、把${target_name}的阴茎弄脏了…`, // :64
      );
    }
    return;
  }

  // :67-80（1 臂）/ :96-109（2 臂）股间性交：33 与 62 各一句，互不排斥
  if (selectcom === 33) {
    const color = skin_color(target) ?? ''; // 色名链无 ELSE，缺色即空串
    era.print(
      heavy
        ? `${target_name}的${color}肌肤被射出的大量精液沾满了…` // :98-106
        : `射出的精液、把${target_name}的${color}肌肤弄脏了…`, // :69-77
    );
  }
  if (selectcom === 62) {
    era.print(
      heavy
        ? '两人的身体被射出的大量精液沾满了…' // :108
        : '射出的精液、把两人的身体都弄脏了…', // :79
    );
  }
}

/**
 * 公共段「狗射精」（源 :151-161）：TFLAG:16 > 0 时按 SELECTCOM 报灌精部位。
 * 四支互斥（21/34 私处、27 直肠、31 嘴、30 手——手上的收尾句与其余三支
 * 不同），其余指令整段静默。写入方是 調教相關/COMF38_足コキ.ERB:487/:504 与
 * 迷宮/DUNGEON_AFTER.ERB 的处刑口上（两处都在本段之外）。
 */
function emit_dog_ejaculation() {
  if (tflag(16) <= 0) {
    return;
  }
  const target_name = chara_callname(era_flag.target);
  const selectcom = era_flag.selectcom;
  if (selectcom === 21 || selectcom === 34) {
    era.print(`${target_name}的私处里、被狗灌入了那又臭又热的精液…`); // :153
  } else if (selectcom === 27) {
    era.print(`${target_name}的直肠里、被狗灌入了那又臭又热的精液…`); // :155
  } else if (selectcom === 31) {
    era.print(`${target_name}的嘴里、被狗灌入了那又臭又热的精液…`); // :157
  } else if (selectcom === 30) {
    era.print(`${target_name}的手上、沾满了狗那又臭又热的精液…`); // :159
  }
}

/**
 * 公共段「当着对象的面侵犯助手」（源 :165-172）：TFLAG:7 > 0 时落句。
 * 三句都是独立 SIF（1 支与 2 支互斥，羡慕句与前两句并存）。
 *
 * 羡慕句的门 `ABL:11 > 3 || ABL:32 > 2 && TFLAG:899 <= 1` 按 Emuera 的
 * 「&& 与 || 同优先级、左结合」读作 `(ABL:11 > 3 || ABL:32 > 2) && 未失神`
 * （同款读法先例见 com-sm.js 的 A 40-42 三指令共吃失神门）——两项素质任一
 * 满足且未失神才落句。
 */
function emit_assistant_ejaculation() {
  const flag = tflag(7);
  if (flag <= 0) {
    return;
  }
  const target_name = chara_callname(era_flag.target);
  const assi_name = chara_callname(era_flag.assi);
  if (flag === 1) {
    era.print(`当着${target_name}的面、在${assi_name}的体内深处射出了精液…`); // :167
  }
  if (flag === 2) {
    era.print(
      `当着${target_name}的面、在${assi_name}的体内深处射满了精液、溢出来了……`,
    ); // :169
  }
  if (
    (abl(era_flag.target, 11) > 3 || abl(era_flag.target, 32) > 2) &&
    tflag(899) <= 1
  ) {
    era.print(`${target_name}用羡慕的眼光凝视着${assi_name}被内射的样子…`); // :171
  }
}

/**
 * 公共段「口で射精／口で大量射精」（源 :177-324）：TFLAG:0 == 1（普通）与
 * == 2（大量）共用同一张 SELECTCOM 分派——31/125 口交、32 乳交、68 双人口交、
 * 69 六九式、80/124 强制口交、123 乳夹口交、126 手搓口交、127 真空口交。
 * 两臂台词各一套、无归约规律，逐句照两支各抄；支内门 = ABL:32 ≥ 3（精液
 * 中毒）、ABL:16 ≥ 3（侍奉精神）、TFLAG:899 ≥ 2（口中失神）、
 * TALENT:110/114（豪乳）、TALENT:109（贫乳）、TALENT:PLAYER:121/122（主人
 * 是否扶她）。乳交支的肌肤色链**无 ELSE**（:191-197 / :271-277）：缺色时
 * 连「的」都不落，1:1。
 *
 * @param {boolean} heavy true = TFLAG:0 == 2（大量射精臂）
 */
function emit_mouth_ejaculation(heavy) {
  const target = era_flag.target;
  const selectcom = era_flag.selectcom;
  const name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const assi_name = chara_callname(era_flag.assi);
  const addicted = abl(target, 32) >= 3; // 精液中毒
  const devoted = abl(target, 16) >= 3; // 侍奉精神

  if (selectcom === 31 || selectcom === 125) {
    if (addicted) {
      era.print(
        heavy
          ? `${name}带着恍惚的表情、把口中的精液喝光了…` // :262
          : `${name}带着恍惚的表情、把注入口中的精液喝光了…`, // :181
      );
    } else if (devoted) {
      era.print(
        heavy
          ? `没喝完的精液、从${name}的嘴里溢出来了…` // :264
          : `${name}喉咙发出模糊不清的声音、把注入口中的精液喝光了…`, // :183
      );
    } else {
      era.print(
        heavy
          ? `满满的精液、把${name}的喉咙叩开了…` // :266
          : `精液注入到${name}的嘴里了…`, // :185
      );
    }
    return;
  }

  if (selectcom === 32) {
    const skin = skin_color(target);
    const tint = skin === undefined ? '' : `${skin}的`; // 色名链无 ELSE
    if (heavy) {
      era.print(`大量的精液飞散而出、${name}${tint}胸部和脸之间、全被射满了…`); // :270-278
    } else if (tal(target, 110) || tal(target, 114)) {
      era.print(`${name}${tint}圆润挺拔的诱惑豪乳之间、积存着精液…`); // :190-198
    } else {
      era.print(`${name}${tint}胸口到脸之间、精液四处飞散着…`); // :200-208
    }
    return;
  }

  if (selectcom === 68) {
    era.print(
      heavy
        ? `大量的精液倾泻在${name}和${assi_name}的脸上…` // :281
        : `${name}和${assi_name}用嘴接住精液…`, // :212
    );
    return;
  }

  if (selectcom === 69) {
    era.print(
      heavy
        ? `${name}因阴部的刺激全身颤抖着、然后把精液喝下去了…` // :284
        : `${name}身体颤抖着、承受来自阴部的刺激、同时把精液咽下…`, // :215
    );
    return;
  }

  if (selectcom === 80 || selectcom === 124) {
    // :218-226 / :287-295：失神 ≥ 2 只吃「抓头深喉」句，与中毒/侍奉两类分开
    if (tflag(899) >= 2) {
      era.print(
        heavy
          ? `紧紧抓住${name}的头、在她喉咙深处放开精关…` // :288
          : `紧紧抓住${name}的头、在她喉咙深处射出…`, // :219/:225
      );
    } else if (addicted) {
      era.print(
        heavy
          ? `${name}带着恍惚的表情、把直接灌入喉咙的精液喝光了…` // :290
          : `${name}带着恍惚的表情、把强行灌入喉咙的精液喝光了…`, // :221
      );
    } else if (devoted) {
      era.print(
        heavy
          ? `${name}被呛到、一边忍住不把喉咙里的精液咳出来、一边把它喝光了…` // :292
          : `${name}喝掉了直接叩开喉咙强行灌进来的精液…`, // :223
      );
    } else {
      era.print(
        heavy
          ? `在${name}喉咙深处射出的精液、从口中溢出来了…` // :294
          : `紧紧抓住${name}的头、在她喉咙深处射出…`, // :225
      );
    }
    return;
  }

  if (selectcom === 123) {
    if (tal(target, 109)) {
      era.print(
        heavy
          ? `${player_name}的阴茎、一边享受胸部的按摩、一边在${name}的嘴里倾泻了大量精液…` // :299
          : `${player_name}的阴茎、一边享受胸部的按摩、一边在${name}的嘴里倾泻精液…`, // :230
      );
    } else {
      era.print(
        heavy
          ? `${player_name}的阴茎、一边被胸部紧紧夹住、一边在${name}的嘴里倾泻了大量精液…` // :301
          : `${player_name}的阴茎、一边被胸部紧紧夹住、一边在${name}的嘴里倾泻精液…`, // :232
      );
    }
    if (heavy) {
      era.print('从嘴里溢出来的精液、把阴茎和胸部都染成白色了…'); // :303
    }
    return;
  }

  if (selectcom === 126) {
    if (devoted) {
      era.print(
        heavy
          ? `没喝完的精液、从${name}的嘴里溢出了…` // :307
          : `${name}喉咙发出模糊不清的声音、把注入口中的精液喝光了…`, // :237
      );
    } else {
      era.print(
        heavy
          ? `满满的精液、把${name}的喉咙叩开了…` // :309
          : `精液注入到${name}的口中了…`, // :239
      );
    }
    // 两句 SIF 相互独立：主人是男人（122）与主人是扶她（121）各一句，可同落
    if (addicted && tal(era_flag.player, 122)) {
      era.print(
        heavy
          ? `满溢的精液、将${name}的嘴边搞得一塌糊涂。揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。` // :312
          : `${name}揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。`, // :242
      );
    }
    if (addicted && tal(era_flag.player, 121)) {
      era.print(
        heavy
          ? `满溢的精液、将${name}的嘴边搞得一塌糊涂。撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。` // :314
          : `${name}撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。`, // :244
      );
    }
    return;
  }

  if (selectcom === 127) {
    if (devoted) {
      era.print(
        heavy
          ? `${name}淫秽地吸啜着阴茎、在她嘴里、大量的精液喷涌而出…` // :318
          : `${name}淫秽地吸啜着阴茎、在她口中开射出…`, // :248
      );
    } else {
      era.print(
        heavy
          ? `${name}吸啜着阴茎、在她嘴里、大量的精液喷涌而出…` // :320
          : `${name}吸啜着阴茎、在她口中开放了精关…`, // :250
      );
    }
    if (addicted) {
      era.print(
        heavy
          ? `精液从嘴里溢出、${name}带着恍惚的表情、把阴茎上的精液吸吮干净…` // :323
          : `${name}带着恍惚的表情、把阴茎上的精液吸吮干净了。`, // :253
      );
    }
  }
}

/**
 * 公共段「手で射精／手で大量射精」（源 :328-342）：TFLAG:1 == 1/2 两臂，
 * 前缀两句是独立 SIF（EXP:20 == 0 初次精液经验 / ABL:32 > 2 精液中毒），
 * 各带 `TFLAG:899 <= 1` 的门——失神中前缀不落、收尾句照落。
 *
 * @param {boolean} heavy true = TFLAG:1 == 2（大量射精臂）
 */
function emit_hand_ejaculation(heavy) {
  const target = era_flag.target;
  const name = chara_callname(target);
  let line = '';
  if (exp(target, 20) === 0 && tflag(899) <= 1) {
    line += '带着惊讶的神情、'; // :330/:339
  }
  if (abl(target, 32) > 2 && tflag(899) <= 1) {
    line += '带着恍惚的表情、'; // :332/:341
  }
  line += heavy
    ? `${name}的脸上、手上、沾满了大量的精液…` // :342
    : `精液射到${name}的身上了…`; // :333
  era.print(line);
}

/**
 * 公共段「足で射精／足で大量射精」（源 :346-358）：TFLAG:18 == 1/2 两臂，
 * 「带着轻蔑的眼神、」的门 `(TALENT:83 || ABL:20 > 2) && TALENT:85 == 0`
 * ——施虐狂或抖 S 强、且不爱慕（同优先级左结合读法与 :170 同款）。写入方是
 * 調教相關/COMF38_足コキ.ERB:487/:504。
 *
 * @param {boolean} heavy true = TFLAG:18 == 2（大量射精臂）
 */
function emit_foot_ejaculation(heavy) {
  const target = era_flag.target;
  const name = chara_callname(target);
  let line = name; // :347/:355 PRINTFORM
  if ((tal(target, 83) || abl(target, 20) > 2) && tal(target, 85) === 0) {
    line += '带着轻蔑的眼神、'; // :349/:357
  }
  line += heavy
    ? '看着你将大量热乎乎的精液射到她的脚上了…' // :358
    : '看着你将热乎乎的精液射到她的脚上了…'; // :350
  era.print(line);
}

/**
 * 放置 PLAY（源 :362-373，射精链的末支）：PALAM:5 ≥ PALAMLV:3 才开口，
 * 三个 SIF 各追加半句后收尾。
 *
 * **本支的实现位置是 #402 挪的**：原作它是射精链的最后一支（排在绝顶段
 * :377 之前），此前落在 com-special.js 的 A 分发族里——族分发在绝顶段之后
 * 执行，同回合既落「放置 PLAY」又落绝顶时两处行序会颠倒（实机可见）。
 * com-special.js 的 A55 注册随之改为显式无操作，注册保留（占位行语义）。
 */
function emit_idle_play() {
  const target = era_flag.target;
  if (palam(target, 5) < PALAMLV[3]) {
    return;
  }
  const name = chara_callname(target);
  let line = `${name}急促的呼吸着`; // :364
  if (palam(target, 5) >= PALAMLV[5]) {
    line += '、用炽热地目光看向你'; // :366
  }
  if (palam(target, 5) >= PALAMLV[3] && tq(target, 21)) {
    line += '、身体不断地颤抖着'; // :368
  }
  if (palam(target, 5) >= PALAMLV[4]) {
    line += '、紧蹙摩擦的双腿已经捂不住流淌出的粘液了'; // :370
  }
  era.print(`${line}……`); // :371
}

/**
 * 公共段「射精链」（源 :177-373）：一条 IF/ELSEIF 链按 TFLAG:0 → TFLAG:1
 * → TFLAG:18 的顺序吃六种射精旗标（口／手／足各普通与大量两档），末尾一支
 * 是 SELECTCOM == 55 的放置 PLAY。**链语义 = 先命中先落、其余整支跳过**，
 * 所以不能拆成互不相干的段（同回合同时置「口射精」与「手射精」时只有前者
 * 说话；再如口臂对当前指令没有台词时，手臂一样不出声——链已被口臂吃掉）。
 */
function emit_ejaculation_chain() {
  if (tflag(0) === 1 || tflag(0) === 2) {
    emit_mouth_ejaculation(tflag(0) === 2);
    return;
  }
  if (tflag(1) === 1 || tflag(1) === 2) {
    emit_hand_ejaculation(tflag(1) === 2);
    return;
  }
  if (tflag(18) === 1 || tflag(18) === 2) {
    emit_foot_ejaculation(tflag(18) === 2);
    return;
  }
  if (era_flag.selectcom === 55 && tflag(899) <= 1) {
    emit_idle_play();
  }
}

/**
 * 公共段「性交射精」（源 :456-606）：一条 IF/ELSEIF 链——
 *   1. `CFLAG:113 == 1 && TFLAG:2 == 1 && SELECTCOM == 90` → 乳内射精（普通）；
 *   2. `TFLAG:2 == 1` → 普通档的抽出／插着两臂；
 *   3. `CFLAG:113 == 1 && TFLAG:2 == 2` → 乳内射精（大量，**无指令门**）；
 *   4. `TFLAG:2 == 2` → 大量档的两臂；
 *   5. `ELSE` → 绝顶余韵（TFLAG:29 五档，:592-605）。
 *
 * 两臂的分界是 `PALAM:5 < PALAMLV:4 || TFLAG:31`：命中 = **抽出**臂（讲拔出
 * 之后的场面，并按源侧写回 `TFLAG:31 = 0` / `TFLAG:60 = 0`），否则 =
 * **插着**臂（讲还插在里面时对象的反应，只读不写）。
 *
 * 源侧形态 1:1 保留：插着臂普通档把 `SELECTCOM == 27` 写了两遍（:501，于
 * 逻辑无影响）；抽出臂的 34（骑乘位）前缀是「阴茎拔出后、」而 20/22 是
 * 「阴茎拔出后、阴部处、」，两支不同样，照抄。
 */
function emit_sex_ejaculation() {
  const target = era_flag.target;
  const player = era_flag.player;
  const selectcom = era_flag.selectcom;
  const name = chara_callname(target);
  const player_name = chara_callname(player);
  const level = tflag(2);
  const milk_inside = (era.get(`cflag:${target}:113`) || 0) === 1; // CFLAG:113 乳内

  if (level === 1 && milk_inside && selectcom === 90) {
    era.print(
      `${player_name}的肉棒在${name}的乳房里激烈的颤抖着、在乳头肉穴的深处释放了精液…`, // :458
    );
    return;
  }
  if (level === 2 && milk_inside) {
    era.print(
      `${player_name}的肉棒在乳房里射入了大量的精液、从乳头仅存的缝隙间、精液和母乳一齐喷了出来…`, // :524
    );
    return;
  }
  if (level !== 1 && level !== 2) {
    emit_sex_orgasm_afterglow();
    return;
  }

  const heavy = level === 2;
  const blood = tflag(31); // 本次调教处女丧失（落红）

  if (palam(target, 5) < PALAMLV[4] || blood) {
    // —— 抽出臂（:460-495 / :526-565）——
    const with_blood = (text) =>
      blood ? `${text}渗出了处女的落红、混合着` : text;
    if (selectcom === 20 || selectcom === 22) {
      era.print(
        heavy
          ? `阴茎拔出后、阴部处、${blood ? '处女的落红混合着' : ''}大量的精液渗出来了…` // :532
          : `${with_blood('阴茎拔出后、阴部处')}精液渗出来了…`, // :463-466
      );
    } else if (selectcom === 21 || selectcom === 23) {
      era.print(
        heavy
          ? `阴茎拔出后、阴部处、${blood ? '处女的落红混合着' : ''}大量的精液滴出来了…` // :538
          : `${with_blood('阴茎拔出后、阴部处')}精液滴出来了…`, // :469-472
      );
    } else if (
      selectcom === 26 ||
      selectcom === 27 ||
      selectcom === 28 ||
      selectcom === 29 ||
      selectcom === 36
    ) {
      era.print(
        heavy
          ? '从肛门里漏出大量的精液沿着股沟向下流………' // :541
          : '从肛门里漏出来的精液沿着股沟向下流……', // :475
      );
    } else if (selectcom === 25) {
      era.print(
        heavy
          ? `${player_name}射出的精液、把两人的身体都弄得粘稠不堪…` // :543
          : `${player_name}射出的精液、把两人的身体都弄脏了…`, // :477
      );
    } else if (selectcom === 34) {
      era.print(
        heavy
          ? `阴茎拔出后、${blood ? '处女的落红混合着' : ''}大量的精液渗出来了…` // :546-549
          : `${with_blood('阴茎拔出后、阴部处')}精液渗出来了…`, // :480-483
      );
    } else if (selectcom === 24) {
      era.print(
        heavy
          ? `阴茎拔出后、${blood ? '渗出了处女的落红、混合着' : ''}大量的精液渗出来了…` // :552-555
          : `${player_name}射出的精液、把两人的身体都弄脏了…`, // :486
      );
      if (heavy) {
        era.print(`${player_name}射出的精液、把两人的身体都弄得粘稠不堪…`); // :556
      }
    } else if (selectcom === 121 || selectcom === 130 || selectcom === 134) {
      era.print(
        heavy
          ? `直接对${name}的子宫、注入了大量热乎乎的精液…` // :559
          : `直接对${name}的子宫、注入了热乎乎的精液…`, // :489
      );
    } else if (selectcom === 120) {
      era.print(
        heavy
          ? `对准${name}私处内那最敏感的那一点、${player_name}射出了大量的精液…` // :562
          : `对准${name}私处内那最敏感的那一点、${player_name}射出了精液…`, // :492
      );
    }
    // :494-495 / :564-565：抽出臂写回归一（两处跨域写都经 event 域门面：
    // TFLAG:31 = game.event.本次调教处女丧失、TFLAG:60 = game.event.插着不拔，
    // 后者与 train_message_b 的尾部同一变量）
    game.event.本次调教处女丧失 = 0;
    game.event.插着不拔 = 0;
    return;
  }

  // —— 插着臂（:496-517 / :566-587）——
  if (selectcom === 27 && tq(target, 55)) {
    era.print(
      heavy
        ? '直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把插入的阴茎紧紧夹住了…' // :569
        : '精液溢出的直肠、细微地颤抖着、把插入的阴茎紧紧夹住了…', // :499
    );
  } else if (
    selectcom === 26 ||
    selectcom === 27 ||
    selectcom === 28 ||
    selectcom === 29 ||
    selectcom === 36
  ) {
    era.print(
      heavy
        ? `直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把${player_name}的阴茎紧紧夹住了…` // :572
        : `精液溢出的直肠、细微地颤抖着、把${player_name}的阴茎紧紧夹住了…`, // :502
    );
  } else if (selectcom === 25) {
    era.print(
      heavy
        ? `直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把${name}的阴茎紧紧夹住了…` // :574
        : `精液溢出的直肠、细微地颤抖着、把${name}的阴茎紧紧夹住了…`, // :504
    );
  } else if (selectcom === 121 || selectcom === 130 || selectcom === 134) {
    era.print(
      heavy
        ? `直接对${name}快乐到生疼的子宫、注入了大量热乎乎的精液……` // :577
        : `直接对${name}的子宫、注入了热乎乎的精液…`, // :507
    );
  } else if (selectcom === 120) {
    era.print(
      heavy
        ? `对准${name}私处内那最敏感的那一点、${player_name}射出了大量的精液…` // :580
        : `对准${name}私处内那最敏感的那一点、${player_name}射出了精液…`, // :510
    );
  } else if (selectcom === 24) {
    era.print(
      heavy
        ? `${player_name}的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把${name}的阴茎紧紧夹住了…` // :583
        : `${player_name}被精液灌满的私处、轻轻蠕动着、把${name}的阴茎紧紧缠住了…`, // :513
    );
  } else {
    era.print(
      heavy
        ? `${name}的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把${player_name}的阴茎紧紧夹住了…` // :585
        : `${name}被精液灌满的私处、轻轻蠕动着、把${player_name}的阴茎紧紧缠住了…`, // :515
    );
  }
}

/**
 * 性交射精链的 ELSE 支：绝顶余韵（源 :592-605）。`TFLAG:899 <= 1` 才开口，
 * 内层五档先看「私处滴液」的两支（要求 TFLAG:19 且（蠕虫或插着）且**未
 * 穿衣**——CFLAG:40 的 16（服）与 1（内裤）位都为 0），再看 TFLAG:29 的
 * 9/5/3 三档；同一 TFLAG:29 值下「滴液」支优先，穿衣时回落到普通句。
 */
function emit_sex_orgasm_afterglow() {
  if (tflag(899) > 1) {
    return;
  }
  const target = era_flag.target;
  const orgasms = tflag(29);
  const cflag40 = era.get(`cflag:${target}:40`) || 0;
  const uncovered = (cflag40 & 16) === 0 && (cflag40 & 1) === 0;
  const dripping = tflag(19) && (tq(target, 11) || tflag(60)) && uncovered; // :594/:596
  const name = chara_callname(target);
  if (orgasms >= 9 && dripping) {
    era.print(`${name}的私处滴出了粘稠的液体、阴户一开一合不停持续着…`); // :595
  } else if (orgasms >= 5 && dripping) {
    era.print(`${name}的私处滴出了粘稠的液体、剧烈地不停喘息着…`); // :597
  } else if (orgasms >= 9) {
    era.print(`${name}断断续续地不停高潮、身体不断抽搐、反复扭动着…`); // :599
  } else if (orgasms >= 5) {
    era.print(`${name}断断续续地不停高潮、四肢无力、筋疲力尽了…`); // :601
  } else if (orgasms >= 3) {
    era.print(`${name}气息慌乱、沉浸在绝顶高潮的余韵之中…`); // :603
  }
}

/**
 * 公共段「失禁与放尿」（源 :611-677）：一条 IF/ELSEIF 链。
 *   1. 失神中的两档（TFLAG:899 ≥ 2 × TFLAG:29 ≥ 3 / ≥ 1 × 有用尿具）；
 *   2. 四组衣着形态各两支（放尿 / 失禁）——尿布（CFLAG:42 == 69，且需
 *      CFLAG:40 & 64 的着ぐるみ位）、着ぐるみ（42 == 11，同需 64 位）、
 *      服（& 16，句里嵌 @PRINT_CLOTHTYPE_MAIN2）、内裤（& 1）；
 *   3. 裸身十档：TFLAG:29 ≥ 7/5/3/1 × 尿具三态（两个都有 / 只利尿剂 /
 *      只漏尿癖）。
 *
 * 尿具 = TEQUIP:22（利尿剂）或 TALENT:57（漏尿癖）。**「放尿」支与「失禁」支
 * 的尿具条件不同**（放尿 = 「29 ≥ 5 且有利尿剂」或「29 ≥ 3 且利尿剂＋漏尿
 * 癖」；失禁 = 「29 ≥ 3 且漏尿癖」或「29 ≥ 1 且利尿剂」），四组衣着共用同一
 * 对判据，1:1 照抄。着ぐるみ两处嵌 @PRINT_CLOTHTYPE_SPECIAL、服支嵌
 * _MAIN2——ere 侧取该模块的返回串再拼接（出口形态见 page-clothtype.js 头注）。
 */
function emit_incontinence() {
  const target = era_flag.target;
  const name = chara_callname(target);
  const orgasms = tflag(29);
  const diuretic = tq(target, 22); // 利尿剂
  const incontinent = tal(target, 57); // 漏尿癖
  const cflag40 = era.get(`cflag:${target}:40`) || 0;
  const cflag42 = era.get(`cflag:${target}:42`) || 0;
  const urine = diuretic || incontinent;

  if (tflag(899) >= 2 && orgasms >= 3 && urine) {
    era.print(`${name}失去意识、尿到周围都是了…`); // :613
    return;
  }
  if (tflag(899) >= 2 && orgasms >= 1 && urine) {
    era.print(`${name}失去意识、尿液从阴部漏出来了…`); // :616
    return;
  }

  // 衣着四组共用的两支判据（:618-676 的四组各写一遍同样的表达式）
  const burst =
    (orgasms >= 5 && diuretic) || (orgasms >= 3 && diuretic && incontinent);
  const leak = (orgasms >= 3 && incontinent) || (orgasms >= 1 && diuretic);
  const doll_bit = (cflag40 & 64) !== 0; // 着ぐるみ位

  if (cflag42 === 69 && doll_bit && burst) {
    era.print(`${name}的尿布里升起了热气、`); // :619
    era.print('闻到了清晰的尿臭味、'); // :620
    era.print('看来是太过兴奋、尿到尿布里去了…'); // :621
    return;
  }
  if (cflag42 === 69 && doll_bit && leak) {
    era.print(`${name}的尿布里升起了热气、飘来了尿的味道…`); // :624
    return;
  }
  if (cflag42 === 11 && doll_bit && burst) {
    era.print(
      `${name}穿着${clothtype_special_text(target)}、但是、有尿臭味从里面飘散出来。`,
    ); // :627-629
    era.print(`看来是太过兴奋、尿到${clothtype_special_text(target)}里去了…`); // :630-632
    return;
  }
  if (cflag42 === 11 && doll_bit && leak) {
    era.print(
      `刚才激烈动作的${clothtype_special_text(target)}、突然动作停止了。`,
    ); // :635-637
    era.print('看来、里面是尿湿了…'); // :638
    return;
  }
  if (cflag40 & 16 && burst) {
    era.print(
      `不堪快感冲击的${name}、把${clothtype_main2_text(target)}弄湿也不在乎了、情不自禁地尿了起来…`, // :641-643
    );
    return;
  }
  if (cflag40 & 16 && leak) {
    era.print(
      `${clothtype_main2_text(target)}的股间冒起了热气、有黄色水迹在扩散…`,
    ); // :646-647
    return;
  }
  if (cflag40 & 1 && burst) {
    era.print(`${name}不堪快感的冲击、在内裤里大大方方地尿了…`); // :650
    return;
  }
  if (cflag40 & 1 && leak) {
    era.print(`${name}的内裤冒起了热气、有黄色水迹在扩散………`); // :653
    return;
  }

  // :654-676 裸身十档（29 ≥ 7/5/3/1 × 尿具三态）
  if (orgasms >= 7 && diuretic && incontinent) {
    era.print(`随着止不住的尿液滴落、${name}的身体、抽搐痉挛了起来、`); // :655
    era.print('看来尿尿能让她有快感…'); // :656
  } else if (orgasms >= 7 && diuretic) {
    era.print(`痉挛中的${name}喷泉一样喷尿出来了…`); // :658
  } else if (orgasms >= 7 && incontinent) {
    era.print(`痉挛中的${name}尿出一道细细的弧线…`); // :660
  } else if (orgasms >= 5 && diuretic && incontinent) {
    era.print(`筋疲力尽的${name}喷泉一样喷尿出来了…`); // :662
  } else if (orgasms >= 5 && diuretic) {
    era.print(`筋疲力尽的${name}尿出一道细细的弧线…`); // :664
  } else if (orgasms >= 5 && incontinent) {
    era.print(`筋疲力尽的${name}不断滴尿、形成了个小水坑…`); // :666
  } else if (orgasms >= 3 && diuretic && incontinent) {
    era.print(`颤抖中的${name}尿出一道细细的弧线…`); // :668
  } else if (orgasms >= 3 && diuretic) {
    era.print(`震颤抖中的${name}不断滴尿、形成了个小水坑…`); // :670
  } else if (orgasms >= 3 && incontinent) {
    era.print(`颤抖中的${name}从阴部漏出尿来了…`); // :672
  } else if (orgasms >= 1 && diuretic && incontinent) {
    era.print(`${name}不断滴尿、形成了个小水坑…`); // :674
  } else if (orgasms >= 1 && diuretic) {
    era.print(`${name}从阴部漏出尿来了…`); // :676
  }
}

/**
 * 近亲称谓表（源 :695-714 的五档 × 主人是否男人：TALENT:PLAYER:122）。
 * 键 = TFLAG:14；值 = [主人是男人时的称谓, 主人不是男人时的称谓]。
 * 源侧没有 5 档（表亲系只列了 6），落空档时前半句整个不落。
 */
const KIN_TITLES = {
  1: ['父亲', '母亲'],
  2: ['儿子', '女儿'],
  3: ['哥哥', '姐姐'],
  4: ['弟弟', '妹妹'],
  6: ['表弟', '表妹'],
};

/**
 * 公共段「处女丧失与口交清洁」（源 :682-741）：三处 SIF（触手夺处、无射精
 * 夺处、野狗夺处）＋一条近亲链（TFLAG:14 × 主人是否男人）＋口交射精后的
 * 清洁段（TFLAG:8）。五段互不排斥，照源侧顺序落。
 *
 * 源侧形态 1:1：近亲链的称谓 IF 链**没有 ELSE**（:695-715），TFLAG:14 落空档
 * 时前半句断路、只剩「〈主人〉夺取了她的处女。」；清洁段的两句拼法里
 * `SIF TFLAG:8 == 3` 在「双人口交」与「普通」两臂**之外**（:739），两臂都会
 * 追加那句。
 */
function emit_virginity_and_cleanup() {
  const target = era_flag.target;
  const name = chara_callname(target);
  const player_name = chara_callname(era_flag.player);
  const virgin = tflag(3);

  if (tflag(15) === 1 && virgin) {
    era.print(`${name}的阴部上、处女落红和污液沿着丑陋的触手滴下来了…`); // :683
  }
  if (tflag(2) === 0 && tflag(15) === 0 && virgin) {
    era.print(`${name}的阴部上、滴出了处女才有的落红…`); // :689
  }
  if (
    virgin &&
    tflag(14) > 0 &&
    tflag(15) === 0 &&
    tq(target, 89) === 0 &&
    tq(target, 90) === 0 &&
    tflag(899) <= 1
  ) {
    const titles = KIN_TITLES[tflag(14)] ?? ['', ''];
    const kin = tal(era_flag.player, 122) ? titles[0] : titles[1];
    era.print(`${name}被${kin}${player_name}夺取了她的处女。`); // :694-716
  }
  if (virgin && tq(target, 89) && tflag(899) <= 1) {
    era.print(`${name}把处女奉献给野狗了。`); // :722
  }

  // :727-741 口交射精后的清洁（TFLAG:8 == 1/2/3）
  const fellatio = tflag(8);
  if (fellatio <= 0 || tflag(899) !== 0) {
    return;
  }
  if (tflag(0) && tflag(6)) {
    era.print(
      `之后、${name}交替舔着${player_name}和${chara_callname(era_flag.assi)}的阴茎、清洁着上面的污垢…`, // :730
    );
  } else {
    let line = '之后、'; // :728
    if (fellatio >= 2) {
      line += `${chara_callname(era_flag.assi)}和`; // :733
    }
    line += `${name}把`; // :734
    if (abl(target, 10) >= 3) {
      line += '剩下的精液都舔干净、'; // :736
    }
    line += '阴茎里的污垢也漂亮地清洁了…'; // :737
    era.print(line);
  }
  if (fellatio === 3) {
    era.print('两人好像还不满足、意犹未尽地吸啜着彼此口中的积存精液…'); // :740
  }
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

  // #402 收口后声明空间全数有主（实现或显式无操作），族内缺失不再可能
  // 发生；即使发生，原作对无分支的号也是零输出，这里不落占位行（#565）。
  await train_message_b_family.call(era_flag.selectcom, {
    args: [rand_source()],
  });
  // TFLAG:31 = 本次调教处女丧失：连续插入分支临时置 2，公共尾部归一回
  // 1；其余遗留值清零。FLAG:6 的早退在函数开头，不能越过它执行本段。
  // 源: EVENT_TRAIN_MESSAGE_B.ERB :3041-3046
  const virgin_blood = game.event.本次调教处女丧失;
  game.event.本次调教处女丧失 = virgin_blood === 2 ? 1 : 0;
}

/**
 * @TRAIN_MESSAGE_A（:15-）。公共头（省略设定 + 点线）后先跑**公共段**
 * （:31-741，见文件头），再按 SELECTCOM 分发（:746-1351）；空间外显式抛错。
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

  // —— 公共段（:31-741，按源侧执行顺序；SELECTCOM 分发在最后 :746 起）——
  emit_intercrural_ejaculation(); // :31-110 股间性交射精（TFLAG:9 三臂）

  // —— 公共头的 TFLAG:15（怪物/触手射精旗标）段（:110-146）——
  // 源形状 1:1：先两道 SIF（非死斗场触手臂，:113-125），再 IF/ELSEIF 链
  // （死斗场灌精两臂 :127-141，以及非死斗场触手臂的第二份 :143-145）。
  // 非死斗场因此双重打印——原作如此，不是漏去重。死斗场命中 IF 链后
  // ELSEIF 触手臂不再落（内层三支之外的 SELECTCOM 无输出）。
  const tflag15 = era.get('tflag:15') || 0;
  const tequip55 = era.get(`tequip:${era_flag.target}:55`) || 0;
  const target_name = chara_callname(era_flag.target);
  if (tflag15 === 1 && tequip55 !== 1) {
    era.print(`${target_name}身上的触手、吐出了体液…`); // :113-116
  }
  if (tflag15 === 2 && tequip55 !== 1) {
    era.print(`${target_name}全身上的触手、一起吐出了大量的体液…`); // :121-124
  }
  if (tflag15 > 0 && tequip55) {
    const com_site = { 31: '嘴里', 21: '私处里', 27: '直肠里' };
    const site = com_site[era_flag.selectcom];
    if (site !== undefined) {
      era.print(
        tflag15 === 2
          ? `${target_name}的${site}、被怪物大量的粘稠精液灌满了…` // :135-141
          : `${target_name}的${site}、被灌入了怪物黏黏糊糊的精液…`, // :127-133
      );
    }
  } else if (tflag15 === 1) {
    era.print(`${target_name}身上的触手、吐出了体液…`); // :143-144
  } else if (tflag15 === 2) {
    era.print(`${target_name}全身上的触手、一起吐出了大量的体液…`); // :145-146
  }

  emit_dog_ejaculation(); // :151-161 狗灌精（TFLAG:16）
  emit_assistant_ejaculation(); // :165-172 当对象的面侵犯助手（TFLAG:7）
  emit_ejaculation_chain(); // :177-373 口/手/足射精链 + 放置 PLAY 末支

  // —— 公共绝顶反应（:377-424）——
  // 这是所有指令共用的 TFLAG:29 消费点，必须先于 SELECTCOM 分支输出；
  // 原作连续 PRINTFORM/PRINT/PRINTL 组成一条可见行，故在此一次性拼接。
  const target = era_flag.target;
  const orgasms = era.get('tflag:29') || 0;
  const faint = era.get('tflag:899') || 0;
  if (orgasms > 0 && faint <= 1) {
    const target_name = chara_callname(target);
    const ejaculates = era.get('tflag:10') || 0;
    const milk = era.get('tflag:11') || 0;
    const intersex =
      (era.get(`talent:${target}:121`) || 0) > 0 ||
      (era.get(`talent:${target}:122`) || 0) > 0;
    let line = target_name;
    if (milk === 1) {
      line += '从胸前滴落母乳';
    } else if (milk === 2) {
      line += '从胸前喷出大量香喷喷的母乳';
    }
    const has_love_fluid = !intersex && orgasms >= 5;
    if (milk > 0 && (has_love_fluid || ejaculates > 0)) {
      line += '、';
    }
    if (!intersex && orgasms >= 5 && orgasms <= 8) {
      line += '阴唇里喷出透明的爱液、';
    } else if (!intersex && orgasms >= 9) {
      line += '阴唇里喷出混合着白浊的爱液、';
    }
    if (ejaculates === 1) {
      const penis = {
        1: '手臂般粗的',
        2: '悲催的短小的',
        3: '包着皮的',
        4: '马一样的',
      }[era.get(`talent:${target}:318`) || 0];
      line += `${penis ?? ''}阴茎喷出了精液。`;
    } else if (ejaculates === 2) {
      const penis =
        {
          1: '怒张着、手臂般粗的',
          2: '颤抖着、可怜的短小的',
          3: '裸露龟头的',
          4: '跳动着、马一样的',
        }[era.get(`talent:${target}:318`) || 0] ?? '跳动着的';
      line += `${penis}阴茎中大量的精液飞散而出。`;
    }
    if (ejaculates === 0 && milk === 0 && (orgasms < 5 || intersex)) {
      line += '背脊夸张地向后仰、';
    }
    line +=
      orgasms < 12
        ? '全身哆嗦着、颤动到了极点。'
        : '露出快乐又淫媚的神色、绝顶高潮了……';
    era.print(line);

    // :427-450 射精场合的后半（逆强姦／逆肛交／口交 × 普通与大量）：与上面
    // 的绝顶行同属一个 TFLAG:29 块，先落绝顶行再落这一句。TFLAG:31 的落红
    // 前缀只挂在 24 支上（源侧如此）；25 支的两档文案只差「大量」二字。
    const selectcom = era_flag.selectcom;
    if (ejaculates >= 1) {
      const blood = tflag(31);
      if (selectcom === 24) {
        era.print(
          `阴茎拔出后、阴部处${blood ? '渗出了处女的落红、混合着' : ''}${ejaculates === 2 ? '大量的' : ''}精液渗出来了…`, // :428-431/:440-443
        );
      } else if (selectcom === 25) {
        era.print(
          ejaculates === 2
            ? '阴茎从肛门里拔出后、大量漏出来的精液沿着股沟向下流…' // :446
            : '阴茎从肛门里拔出后、漏出来的精液沿着股沟向下流…', // :434
        );
      } else if (selectcom === 4) {
        era.print(
          ejaculates === 2
            ? `然后、满溢的精液、灌到了${chara_callname(era_flag.player)}的喉咙里了…` // :449
            : `然后、精液流到了${chara_callname(era_flag.player)}的嘴里了…`, // :437
        );
      }
    }
  }

  emit_sex_ejaculation(); // :456-606 性交射精链 + 绝顶余韵
  emit_incontinence(); // :611-677 失禁与放尿（TFLAG:899 / TFLAG:29 × 衣着）
  emit_virginity_and_cleanup(); // :682-741 处女丧失三处 + 近亲链 + 口交清洁

  // 同 B：#402 收口后空间全数有主，缺失语义按原作归为零输出（#565）
  await train_message_a_family.call(era_flag.selectcom, {
    args: [rand_source()],
  });
}

// —— 源侧无对应分支的指令号：显式空 handler ——
//
// 注册它们的唯一目的是让「源侧无分支 = 零输出」的语义对这些号保持精确
// （缺号回落自 #565 起即零输出，显式注册让「没注册」与「注册为空」可区分：
// 前者是漏接，后者是源侧本来就没有）。先例见 com-caress.js 的 A 4/6/7/8/9
// 与 com-toy.js 的 A 15-19。
//   - B：55（源侧 :1953-1980 从 54 直跳 56——原作不调用 B，见
//     docs/stub-registry.md 的 `TRAIN_MESSAGE_B` 行）、110/111（:2608-2622
//     从 109 直跳 120）；
//   - A：43-49（:1208-1276 从 42 直跳 72，43-49 无 A 支）、110/111（同 B）。
for (const id of [55, 110, 111]) {
  train_message_b_family.register(id, async () => {});
}
for (const id of [43, 44, 45, 46, 47, 48, 49, 110, 111]) {
  train_message_a_family.register(id, async () => {});
}

module.exports = {
  train_message_a,
  train_message_a_family,
  train_message_b,
  train_message_b_family,
};
