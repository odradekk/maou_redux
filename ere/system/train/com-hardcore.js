/**
 * @file 调教指令 80–90「重度调教」族：拳交系、G点刺激、放尿、穿环、使役魔兽
 * PLAY、兽奸 PLAY、乳内插入的 @COM、@COM_ABLE、TRAIN_MESSAGE_A/B 分支，以及
 * @GET_ADV_COM CASE 80（强制口交 → 3P）升格规则与 @EQUIP_COM89（兽奸 PLAY 中
 * 持续效果）。
 *
 * 源: target/ERB/調教相關/COMF80_イラマチオ.ERB       @COM80
 *     target/ERB/調教相關/COMF81_フィストファック.ERB @COM81
 *     target/ERB/調教相關/COMF82_アナルフィスト.ERB   @COM82
 *     target/ERB/調教相關/COMF83_両穴フィスト.ERB     @COM83
 *     target/ERB/調教相關/COMF84_Gスポット刺激.ERB    @COM84
 *     target/ERB/調教相關/COMF85_放尿.ERB             @COM85
 *     target/ERB/調教相關/COMF87_ピアシング.ERB       @COM87
 *     target/ERB/調教相關/COMF88_使役魔獣プレイ.ERB   @COM88
 *     target/ERB/調教相關/COMF89_獣姦プレイ.ERB       @COM89 / @EQUIP_COM89
 *     target/ERB/調教相關/COMF90_ニプルファック.ERB   @COM90（Shift-JIS 编码）
 *     target/ERB/調教相關/COMABLE.ERB                 @COM_ABLE80-90（:3142-3538）
 *     target/ERB/調教相關/COMF_JUMP.ERB               @GET_ADV_COM CASE 80（:642-663）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB      @TRAIN_MESSAGE_A（SELECTCOM 80/90）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB      @TRAIN_MESSAGE_B（SELECTCOM 80-89）
 *
 * J16（issue #226）。族编号 80-99，本票落 80–85、87、88、89、90 十条；86（饮尿）
 * 在 Train.csv 被注释、TRAINNAME 恒空，COM_ABLE86 第 4 行即 RETURN 0（后续判定
 * 全死码）——com-family.js 头注已勘定为「死段不进 DECLARED_TRAIN_IDS」，本票不
 * 建 @COM86/@COM_ABLE86 壳。84（G 点刺激）是高级 COM，只能经 CASE 8（COM8 →
 * 84，已由 com-caress.js 的 adv_rule_8 注册）升格抵达，源侧无 @COM_ABLE84——
 * 「未定义即视为可执行」（com-family.js 头注 #213 勘定），本票同样不建
 * @COM_ABLE84 壳。
 *
 * **@EQUIP_COM88 是死代码，不移植**：COMF88 定义了完整的 @EQUIP_COM88（使役
 * 魔兽 PLAY 中的持续效果，约 350 行），但 com-family.js 的 EQUIP_COM_CHAIN
 * （= SYSTEM_SOURCE.ERB:58-123 的 SIF 链实测）里没有 TEQUIP:88 这一位——全库
 * 搜索确认 `CALL EQUIP_COM88` 从未出现在任何调用点。TEQUIP:88 这个旗标本身是
 * 活的（COMABLE.ERB 数十处 `SIF TEQUIP:88 RETURN 0` 用它互斥其他指令，
 * EVENT_TRAIN_MESSAGE_B.ERB 多处用它切换文案），只是「使役 PLAY 期间每回合
 * 持续结算」这个 CALL 点从未被原作接上。@EQUIP_COM89（兽奸 PLAY，结构几乎
 * 相同）在 EQUIP_COM_CHAIN 里是 `[89, 89]`，是活代码，本票落地。
 *
 * **COM80 的「実行できるかの判定」整段是死码**：COMF80 源文件 :21 `IF
 * TALENT:151` 直到 :209 `ENDIF` 才闭合（IF/ENDIF 计数验证：全文件 32 对，
 * 恰好平衡），把 COM_ORDER 调用、全部 ABL/MARK/PALAM/TALENT 加成、汚れ（Y）
 * 计算、`実行値` 判定与 WAIT、`実行できない RETURN 0` 通通包在里面。而
 * COM_ABLE80 已经在 `TALENT:151` 为真时 RETURN 0——COM80 能被执行时
 * TALENT:151 恒为 0，这段判定从未运行过。连带地，段内计算的 Y（汚れ权重）
 * 也从未被赋新值；后面 `SOURCE:8 = Y*40 + 100` 读到的是这个从未刷新的 Y。
 * ere 侧不镜像这整段判定（无 WAIT、无失败 RETURN 0，直接执行），Y 按其唯一
 * 可能取值 0 代入（`Y*40+100` = 100）。
 *
 * TRAIN_MESSAGE_A/B 只随本票登记本族 ID 显式出现的 SELECTCOM 分支
 * （com-sex.js/com-caress.js 同款先例）：90 的乳内射精文案（CFLAG:113==1 &&
 * TFLAG:2==1/2）虽然外层不是按 SELECTCOM 分流，但 CFLAG:113 全库仅由 COM90
 * 置 1，故在 SELECTCOM===90 的注册点内直接判它是安全且完整的。80 的口内
 * 射精文案与 124（COM_ABLE124，后续追加与高级族票）共享同一段源文本，本票
 * 只注册 80；81-85/87-89 在两份 TRAIN_MESSAGE 源文件里都没有专属分支，登记
 * 空操作占位（源本身无文案，不是本票遗漏）。
 *
 * COM87（穿环）的部位位域 P 在原作是跨 `CALL TRAIN_MESSAGE_B` 存活的 Emuera
 * 全局单字母变量；ere 侧用模块级 piercing_state 承载（com-caress.js 的
 * order_state 同款先例，单线程回合制下安全）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { PALAMLV } = require('#/era-utils/palam-level');
const { EXPLV } = require('#/era-utils/exp-level');
const {
  com_able_family,
  com_family,
  equip_com_family,
} = require('#/system/train/com-family');
const { adv_com_family, get_adv_com } = require('#/system/train/com-adv');
const {
  train_message_a_family,
  train_message_b,
  train_message_b_family,
} = require('#/system/train/train-message');
const { com_order } = require('#/system/train/com-order');
const { confirm_condom } = require('#/system/train/com-condom');
const {
  com_ejac_player_sex,
  com_ejac_player_milk,
  com_after_extra_sex,
} = require('#/system/train/com-vaginasex');
const { soiling_cloth_no1 } = require('#/system/train/cloth');
const { monster_name, monster_data, e_get } = require('#/dungeon/monster-data');
const { karma } = require('#/dungeon/dungeon');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');
const {
  clothtype_main2_text,
  clothtype_special_text,
} = require('#/page/page-clothtype');

/**
 * 本族升格规则能命中的、但尚未由追加与高级族实现的目标（COM80 的 CASE 80 →
 * 64，3P，属 J15 助手族）。命中后以占位 + RETURN 1 保持 JUMPFORM 语义。
 */
const STUBBED_CALLS = ['COM64'];

// —— 共享读取助手（#13：未声明下标读值得 undefined，一律 || 0 兜底） ——
const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
const palam = (id, i) => era.get(`palam:${id}:${i}`) || 0;
const exp = (id, i) => era.get(`exp:${id}:${i}`) || 0;

/** 名字表读取（ablname/talentname/expname…，#13 空值兜底） */
const name_of = (table, id) => era.get(`${table}:${id}`) ?? '';

/** 判定行助手：把「= A … 实行值 V」的收尾段拼进 parts（com-caress.js 同款） */
function push_judge_tail(parts, a, v) {
  parts.push(` = ${a}`);
  parts.push(a < v ? ' < ' : a === v ? ' = ' : ' > ');
  parts.push(`实行值${v}`);
}

/** 目标角色的 SOURCE 读写 */
function make_src_helpers(cid) {
  return {
    src: (idx) => era.get(`source:${cid}:${idx}`) || 0,
    set: (idx, v) => era.set(`source:${cid}:${idx}`, v),
  };
}

/** LOSEBASE:0/1 → deltabase 负向累加（引擎 base += deltabase 并钳位） */
const lose = (cid, i, v) => era.add(`deltabase:${cid}:${i}`, -v);

/** 汚れ双向移动：a |= b 后 b |= a（com-caress.js 的 stain_exchange 同款） */
function stain_exchange(cid_a, idx_a, cid_b, idx_b) {
  const merged =
    (era.get(`stain:${cid_a}:${idx_a}`) || 0) |
    (era.get(`stain:${cid_b}:${idx_b}`) || 0);
  era.set(`stain:${cid_a}:${idx_a}`, merged);
  era.set(`stain:${cid_b}:${idx_b}`, merged);
}

/** 持有检查（COMABLE 各段的「ITEM:x == 0 && NOITEM == 0」共形） */
const has_item = (i) =>
  (era.get(`item:${i}`) || 0) > 0 || (era.get('noitem:0') || 0) !== 0;

/** ズーコの着ぐるみ判定（CFLAG:42==11 && (CFLAG:40&64) && FLAG:37，多处共形） */
const zooko_worn = (cid) =>
  (era.get(`cflag:${cid}:42`) || 0) === 11 &&
  ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
  (era.get('flag:37') || 0) !== 0;

/** PBAND（ITEM:4，SYSTEM ver1.0.3.ERB:42 的内建常量赋值） */
const PBAND = 4;

/** JUMPFORM COM{RESULT}：高级真身未落地时沿项目既有约定走登记存根。 */
async function jump_to_advanced(id) {
  if (com_family.has(id)) {
    return com_family.call(id);
  }
  stub_line(`COM${id}`, `指令 ${id} 的升格目标`, '随追加与高级指令票');
  return 1;
}

// ============================================================
// @COM_ABLE80-90（COMABLE.ERB:3142-3538；84/86 死段不建壳）
// ============================================================

function able80() {
  const target = era_flag.target;
  const player = era_flag.player;
  if (!tal(player, 121) && !tal(player, 122)) return 0; // 调教者需男人/扶她
  if (tequip(target, 45)) return 0; // 口枷使用中
  if (tal(target, 151)) return 0; // 绝不侍奉
  if (abl(target, 10) + abl(target, 11) < 6) return 0; // 顺从+欲望<6
  if (tequip(target, 90)) return 0; // 触手调教中
  if (tequip(target, 89)) return 0; // 兽奸PLAY中
  if (tequip(target, 88)) return 0; // 使役PLAY中
  if (tequip(target, 55)) return 0; // 决斗中
  if (tequip(target, 59)) return 0; // 新妻PLAY中
  if (zooko_worn(target)) return 0; // 穿着zooko的着ぐるみ
  return 1;
}

function able81() {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 16) return 0; // SM系滤镜
  if (exp(target, 0) < 75) return 0; // 私处经验不足
  if (tequip(target, 11)) return 0; // 震动器使用中
  if (tal(target, 122)) return 0; // 男人
  if (tal(target, 135) && !tal(era_flag.player, 83)) return 0; // 未熟&&非施虐狂调教者
  if (era_flag.assiplay) {
    const assi = era_flag.assi;
    if (abl(assi, 10) < 4 && !tal(assi, 83)) return 0;
  }
  if (tal(target, 100) && (abl(target, 10) <= 3 || abl(target, 21) <= 3))
    return 0; // 娇小需顺从4+抖M4+
  if (tequip(target, 90)) return 0;
  if (tequip(target, 89)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 55)) return 0;
  if (tequip(target, 18)) return 0; // 淋浴中
  if (tequip(target, 58) && !has_item(13)) return 0; // 浴室PLAY无地垫
  if (tequip(target, 59)) return 0;
  if (
    ((era.get(`cflag:${target}:40`) || 0) & 17) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0; // 穿内裤/裤子类
  if (
    (era.get(`cflag:${target}:42`) || 0) === 69 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0; // 尿布
  if (
    (era.get(`cflag:${target}:42`) || 0) === 79 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0; // 贞操带
  if (tal(target, 273)) return 0; // 贞操封印
  if (zooko_worn(target)) return 0;
  return 1;
}

function able82() {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 16) return 0;
  if (tal(target, 135) && !tal(era_flag.player, 83)) return 0;
  if (tequip(target, 13)) return 0; // 肛门震动器
  if (exp(target, 1) < 75) return 0; // 肛门经验不足
  if (tequip(target, 46)) return 0; // 灌肠+肛塞
  if (era_flag.assiplay) {
    const assi = era_flag.assi;
    if (abl(assi, 10) < 4 && !tal(assi, 83)) return 0;
  }
  if (tal(target, 100) && (abl(target, 10) <= 3 || abl(target, 21) <= 3))
    return 0;
  if (tequip(target, 90)) return 0;
  if (tequip(target, 89)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 55)) return 0;
  if (tequip(target, 19)) return 0; // 肛珠
  if (tequip(target, 49)) return 0; // 电极
  if (tequip(target, 18)) return 0;
  if (tequip(target, 58) && !has_item(13)) return 0;
  if (tequip(target, 59)) return 0;
  if (
    ((era.get(`cflag:${target}:40`) || 0) & 17) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0;
  if (
    (era.get(`cflag:${target}:42`) || 0) === 69 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able83() {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 16) return 0;
  if (tal(target, 135) && !tal(era_flag.player, 83)) return 0;
  if (tequip(target, 11)) return 0;
  if (tequip(target, 13)) return 0;
  if (tequip(target, 46)) return 0;
  if (tal(target, 122)) return 0;
  if (exp(target, 0) < 150 || exp(target, 1) < 150) return 0;
  if (era_flag.assiplay) {
    const assi = era_flag.assi;
    if (abl(assi, 10) < 4 && !tal(assi, 83)) return 0;
  }
  if (
    tal(target, 100) &&
    (abl(target, 10) <= 3 || abl(target, 21) <= 3 || exp(target, 53) < 5)
  )
    return 0; // 娇小需顺从4+抖M4+肛门扩张经验5+
  if (tequip(target, 90)) return 0;
  if (tequip(target, 89)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 55)) return 0;
  if (tequip(target, 18)) return 0;
  if (tequip(target, 58) && !has_item(13)) return 0;
  if (tequip(target, 59)) return 0;
  if (
    ((era.get(`cflag:${target}:40`) || 0) & 17) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0;
  if (
    (era.get(`cflag:${target}:42`) || 0) === 69 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0;
  if (
    (era.get(`cflag:${target}:42`) || 0) === 79 &&
    ((era.get(`cflag:${target}:40`) || 0) & 64) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0;
  if (tal(target, 273)) return 0;
  if (zooko_worn(target)) return 0;
  return 1;
}

function able85() {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 16) return 0;
  if ((era.get('tflag:899') || 0) > 0) return 0; // 失神中
  if (!tequip(target, 22) && !tal(target, 57)) return 0; // 需利尿剂或漏尿癖
  if (!tequip(target, 58) && abl(target, 10) <= 2) return 0; // 顺从3+（浴室例外）
  return 1;
}

function able87() {
  const target = era_flag.target;
  if ((era.get('flag:25') || 0) & 16) return 0;
  const worn = era.get(`cflag:${target}:7`) || 0;
  if (
    !has_item(34) &&
    (worn & 1) === 0 &&
    (worn & 2) === 0 &&
    (worn & 4) === 0 &&
    (worn & 8) === 0 &&
    (worn & 16) === 0 &&
    (worn & 32) === 0 &&
    (worn & 64) === 0
  )
    return 0; // 无穿孔工具且未穿任何环
  if (tequip(target, 89)) return 0;
  if (tequip(target, 88)) return 0;
  if (tequip(target, 90)) return 0;
  if (tequip(target, 55)) return 0;
  if (abl(target, 10) < 3) return 0;
  if (tequip(target, 11)) return 0;
  if (tequip(target, 14)) return 0; // 阴蒂夹
  if (tequip(target, 15)) return 0; // 乳头帽
  if (tequip(target, 16)) return 0; // 搾乳器
  if (zooko_worn(target)) return 0;
  return 1;
}

function able88() {
  const target = era_flag.target;
  if ((era.get(`cflag:${target}:570`) || 0) <= 0) return 0; // 未设定从属怪物
  if (
    !tequip(target, 89) &&
    (tequip(target, 11) ||
      tequip(target, 13) ||
      tequip(target, 14) ||
      tequip(target, 15) ||
      tequip(target, 16) ||
      tequip(target, 17) ||
      tequip(target, 19) ||
      tequip(target, 44) ||
      tequip(target, 46) ||
      tequip(target, 49) ||
      tequip(target, 90))
  )
    return 0; // 道具使用中（野外PLAY除外）
  if (tequip(target, 58)) return 0; // 浴室PLAY中
  if (tequip(target, 59)) return 0;
  if (tequip(target, 55)) return 0;
  if (tequip(target, 89)) return 0; // 兽奸PLAY中
  if (tequip(target, 90)) return 0;
  return 1;
}

function able89() {
  const target = era_flag.target;
  if (!has_item(22)) return 0; // 阴茎袋
  if (
    !tequip(target, 89) &&
    (tequip(target, 11) ||
      tequip(target, 13) ||
      tequip(target, 14) ||
      tequip(target, 15) ||
      tequip(target, 16) ||
      tequip(target, 17) ||
      tequip(target, 19) ||
      tequip(target, 44) ||
      tequip(target, 46) ||
      tequip(target, 49) ||
      tequip(target, 90))
  )
    return 0;
  if (tequip(target, 58)) return 0;
  if (tequip(target, 59)) return 0;
  if (tequip(target, 55)) return 0;
  if (tequip(target, 88)) return 0; // 使役PLAY中
  return 1;
}

function able90() {
  const target = era_flag.target;
  const player = era_flag.player;
  if ((era.get('flag:25') || 0) & 1) return 0; // 爱抚系滤镜
  if (tequip(target, 55)) return 0;
  if (tequip(target, 88)) return 0;
  if (
    !tal(player, 121) &&
    !tal(player, 122) &&
    (era.get(`item:${PBAND}`) || 0) === 0
  )
    return 0; // 需男人/扶她/PBAND
  if (
    ((era.get(`cflag:${target}:40`) || 0) & 6) !== 0 &&
    (era.get('flag:37') || 0)
  )
    return 0; // 穿胸罩或上装
  if (zooko_worn(target)) return 0;
  if (!tal(target, 119)) return 0; // 需超乳
  return 1;
}

// ============================================================
// @COM80-90（COMF80-90.ERB）
// ============================================================

/**
 * @COM80（COMF80_イラマチオ.ERB）强制口交。
 * :19-209「実行できるかの判定」整段是死码（文件头注已勘定），不镜像。
 * @returns {Promise<number>} 原作 RETURN 1
 */
async function com80() {
  const target = era_flag.target;
  const player = era_flag.player;

  // :10-14 CASE 80 头部升格跳转（LOCAL = 80 → 3P，见 adv_com_family.register(80)）
  const upgraded = await get_adv_com(80);
  if (upgraded !== 80) {
    return jump_to_advanced(upgraded);
  }

  era.print('强制口交');
  await train_message_b();

  // :218-302 射精ゲージチェック（B = 蓄积量）
  let b =
    abl(target, 12) === 0
      ? 1200
      : abl(target, 12) === 1
        ? 1700
        : abl(target, 12) === 2
          ? 2300
          : abl(target, 12) === 3
            ? 3000
            : abl(target, 12) === 4
              ? 3600
              : 4200;
  b *=
    abl(target, 10) === 0
      ? 0.8
      : abl(target, 10) === 1
        ? 0.9
        : abl(target, 10) === 2
          ? 1.0
          : abl(target, 10) === 3
            ? 1.1
            : abl(target, 10) === 4
              ? 1.2
              : 1.3;
  b *=
    abl(target, 16) === 0
      ? 0.5
      : abl(target, 16) === 1
        ? 0.8
        : abl(target, 16) === 2
          ? 1.2
          : abl(target, 16) === 3
            ? 1.5
            : abl(target, 16) === 4
              ? 1.8
              : 2.4;
  b *=
    abl(target, 32) === 0
      ? 1.0
      : abl(target, 32) === 1
        ? 1.2
        : abl(target, 32) === 2
          ? 1.3
          : abl(target, 32) === 3
            ? 1.5
            : abl(target, 32) === 4
              ? 1.7
              : 2.0;
  if (tal(target, 52)) b *= 2.0; // 擅用舌头
  b *=
    abl(player, 0) === 0
      ? 1.0
      : abl(player, 0) === 1
        ? 1.5
        : abl(player, 0) === 2
          ? 2.0
          : abl(player, 0) === 3
            ? 2.5
            : abl(player, 0) === 4
              ? 3.5
              : 5.0;
  if (tal(player, 121) || tal(player, 122)) {
    era.add(`base:${player}:2`, b);
  }

  // :306-371 ソースの計算
  const { src, set } = make_src_helpers(target);
  if (tal(target, 47)) {
    lose(target, 0, 100);
    lose(target, 1, 70);
  } else {
    lose(target, 0, 200);
    lose(target, 1, 150);
  }
  set(6, 200);
  set(13, 1500);
  set(14, 500);
  set(16, 500);
  // :323 汚れデータ（Y*40+100）：Y 的计算段在死码内从未刷新，恒为其唯一
  // 可能取值 0（见文件头注）
  set(8, 100);
  if (abl(target, 16) === 0) {
    set(4, 420);
    set(5, 150);
    set(8, src(8) * 4.0);
  } else if (abl(target, 16) === 1) {
    set(4, 500);
    set(5, 300);
    set(8, src(8) * 2.5);
  } else if (abl(target, 16) === 2) {
    set(4, 580);
    set(5, 600);
    set(8, src(8) * 1.5);
  } else if (abl(target, 16) === 3) {
    set(4, 660);
    set(5, 900);
    set(8, src(8) * 1.0);
  } else if (abl(target, 16) === 4) {
    set(4, 740);
    set(5, 1500);
    set(8, src(8) * 0.5);
  } else {
    set(4, 820);
    set(5, 2200);
    set(8, src(8) * 0.1);
  }
  if (abl(target, 12) === 0) {
    set(4, src(4) * 0.5);
    set(5, src(5) * 0.5);
  } else if (abl(target, 12) === 1) {
    set(4, src(4) * 0.8);
    set(5, src(5) * 0.8);
  } else if (abl(target, 12) === 2) {
    set(4, src(4) * 1.0);
    set(5, src(5) * 1.0);
  } else if (abl(target, 12) === 3) {
    set(4, src(4) * 1.2);
    set(5, src(5) * 1.2);
  } else if (abl(target, 12) === 4) {
    set(4, src(4) * 1.5);
    set(5, src(5) * 1.5);
  } else {
    set(4, src(4) * 2.0);
    set(5, src(5) * 2.0);
  }

  // :375-386 射精チェック
  const s = era.get(`base:${player}:2`) || 0;
  const ejac = era.get(`maxbase:${player}:2`) || 0;
  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;
  if (e) {
    set(4, src(4) * 3.0);
    if (abl(target, 32) === 0) {
      set(7, 0);
      set(5, src(5) * 2.0);
      set(13, src(13) * 4.0);
    } else if (abl(target, 32) === 1) {
      set(7, 500);
      set(5, src(5) * 3.0);
      set(13, src(13) * 3.0);
    } else if (abl(target, 32) === 2) {
      set(7, 1200);
      set(5, src(5) * 4.0);
      set(13, src(13) * 2.5);
    } else if (abl(target, 32) === 3) {
      set(7, 3000);
      set(5, src(5) * 6.0);
      set(13, src(13) * 2.0);
    } else if (abl(target, 32) === 4) {
      set(7, 6000);
      set(5, src(5) * 9.0);
      set(13, src(13) * 1.5);
    } else {
      set(7, 12000);
      set(5, src(5) * 15.0);
      set(13, src(13) * 1.0);
    }
  }

  // :420-459 大量射精 / 通常射精
  if (e === 2) {
    era.add(`source:${target}:7`, 0); // 无操作（对齐 TIMES 后续读点，占位）
    set(7, src(7) * 2.0);
    set(5, src(5) * 1.5);
    era.add(`exp:${player}:3`, 2);
    chara(target).dungeon.精液经验 = chara(target).dungeon.精液经验 + 9;
    era.print('大量射精');
    era.print('精液经验＋９');
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    let next = (era.get(`base:${player}:2`) || 0) - ejac * 2;
    if (next >= ejac) next = ejac - 1;
    era.set(`base:${player}:2`, next);
    era.set('tflag:0', 2); // 口で射精させたフラグ
    if (Math.floor(Math.random() * 5) === 0 && tal(target, 340)) {
      era.set(`cflag:${target}:113`, 4); // 口内挿入フラグ
    }
  } else if (e === 1) {
    set(7, src(7));
    era.add(`exp:${player}:3`, 1);
    chara(target).dungeon.精液经验 = chara(target).dungeon.精液经验 + 3;
    era.print('射精');
    era.print('精液经验＋３');
    era.set(`stain:${player}:2`, (era.get(`stain:${player}:2`) || 0) | 4);
    let next = (era.get(`base:${player}:2`) || 0) - ejac;
    if (next >= ejac) next = ejac - 1;
    era.set(`base:${player}:2`, next);
    era.set('tflag:0', 1);
    if (Math.floor(Math.random() * 10) === 0 && tal(target, 340)) {
      era.set(`cflag:${target}:113`, 4);
    }
  }

  era.print(`${name_of('expname', 22)}＋１`);
  chara(target).dungeon.口交经验 += 1;

  // :464-466 奴隷の口⇔調教者のＰの汚れが移动
  stain_exchange(target, 0, player, 2);

  // :468-473 侍奉精神LV2+&&技巧LV2+ → なめ取る
  if (abl(target, 16) >= 2 && abl(target, 12) >= 2) {
    era.set(`stain:${player}:2`, 2);
    if (e >= 1) {
      era.set('tflag:8', 1);
    }
  }

  await com_ejac_player_milk(b);

  // :477-482 初吻（TARGET 侧的第一次口内経験记录，与 com-caress.js 的
  // record_player_first_kiss（CFLAG:PLAYER:16）方向相反、槽位相同）
  if ((era.get(`cflag:${target}:16`) || 0) === -1) {
    era.set(`cflag:${target}:16`, 201);
    era.set('tflag:13', 1);
    era.set(`cstr:${target}:4`, chara_callname(player));
  }

  if (!tal(target, 122) && !tal(player, 122)) {
    era.print(`${name_of('expname', 40)}+7`);
    era.add(`exp:${target}:40`, 7);
  } else if (tal(target, 122) && tal(player, 122)) {
    era.print(`${name_of('expname', 41)}+7`);
    era.add(`exp:${target}:41`, 7);
  }

  if (!era_flag.assiplay && exp(target, 0) >= EXPLV[3]) {
    era.add('tflag:30', 1);
  }

  if (tal(player, 121)) {
    era.set(`source:${target}:13`, (era.get(`source:${target}:13`) || 0) / 2);
  }

  era.set('tflag:100', 1);
  era.set('tflag:200', 2); // 屈服刻印２に相当

  return 1;
}

/** @COM81（COMF81_フィストファック.ERB）拳交。 */
async function com81() {
  const target = era_flag.target;
  const player = era_flag.player;
  era.print('拳交');
  await train_message_b();

  era.set('tflag:19', 1); // 私处经验を伴うコマンドのフラグ

  lose(target, 0, 600);
  lose(target, 1, 300);
  const { src, set } = make_src_helpers(target);
  set(6, 1200);
  set(12, 1200);
  set(13, 1200);
  set(14, 1200);
  set(16, 1200);

  if (abl(target, 2) === 0) set(1, 2000);
  else if (abl(target, 2) === 1) set(1, 2500);
  else if (abl(target, 2) === 2) set(1, 3000);
  else if (abl(target, 2) === 3) set(1, 3300);
  else if (abl(target, 2) === 4) set(1, 3600);
  else set(1, 3800);

  if (tal(target, 99)) set(6, src(6) * 0.8); // 魁梧
  if (tal(target, 100)) set(6, src(6) * 2.0); // 小柄体形
  if (tal(target, 135)) set(6, src(6) * 4.0); // 未熟

  if (!tal(target, 122) && !tal(player, 122)) {
    era.print(`${name_of('expname', 40)}+1`);
    era.add(`exp:${target}:40`, 1);
  } else if (tal(target, 122) && tal(player, 122)) {
    era.print(`${name_of('expname', 41)}+1`);
    era.add(`exp:${target}:41`, 1);
  }

  chara(target).dungeon.私处经验 += 25;
  era.print('私处经验＋２５');

  if (exp(target, 52) === 0) {
    chara(target).dungeon.异常经验 += 1;
    era.print('异常经验＋１');
  }
  chara(target).dungeon.私处扩张经验 += 1;
  era.print('私处扩张经验＋1');

  return 1;
}

/** @COM82（COMF82_アナルフィスト.ERB）肛门拳交。 */
async function com82() {
  const target = era_flag.target;
  era.print('肛门拳交');
  await train_message_b();

  const { src, set } = make_src_helpers(target);
  lose(target, 0, 600);
  lose(target, 1, 300);
  set(6, 1200);
  set(12, 1200);
  set(13, 1200);
  set(14, 1200);
  set(16, 1200);

  if (abl(target, 3) === 0) {
    set(2, 10);
    set(3, 10);
    set(13, 100);
  } else if (abl(target, 3) === 1) {
    set(2, 30);
    set(3, 30);
    set(13, 700);
  } else if (abl(target, 3) === 2) {
    set(2, 500);
    set(3, 100);
    set(13, 1500);
  } else if (abl(target, 3) === 3) {
    set(2, 1000);
    set(3, 200);
    set(13, 3000);
  } else if (abl(target, 3) === 4) {
    set(2, 1700);
    set(3, 450);
    set(13, 5000);
  } else {
    set(2, 2200);
    set(3, 750);
    set(13, 8000);
  }

  if (exp(target, 1) < EXPLV[1]) {
    set(2, src(2) * 0.1);
    set(6, 20000);
  } else if (exp(target, 1) < EXPLV[2]) {
    set(2, src(2) * 0.3);
    set(6, 12000);
  } else if (exp(target, 1) < EXPLV[3]) {
    set(2, src(2) * 0.5);
    set(6, 5000);
  } else if (exp(target, 1) < EXPLV[4]) {
    set(2, src(2) * 1.0);
    set(6, 1800);
  } else if (exp(target, 1) < EXPLV[5]) {
    set(2, src(2) * 1.4);
    set(6, 1000);
  } else {
    set(2, src(2) * 1.6);
    set(6, 600);
  }

  if (palam(target, 3) < PALAMLV[1]) {
    set(2, src(2) * 0.4);
    set(6, src(6) + 10000);
  } else if (palam(target, 3) < PALAMLV[2]) {
    set(2, src(2) * 0.8);
    set(6, src(6) + 3600);
  } else if (palam(target, 3) < PALAMLV[3]) {
    set(2, src(2) * 1.0);
    set(6, src(6) + 1200);
  } else if (palam(target, 3) < PALAMLV[4]) {
    set(2, src(2) * 1.4);
    set(6, src(6) + 200);
  } else {
    set(2, src(2) * 1.8);
    set(6, src(6) + 100);
  }

  if (palam(target, 5) < PALAMLV[1]) {
    set(2, src(2) * 0.6);
    set(13, src(13) * 0.6);
  } else if (palam(target, 5) < PALAMLV[2]) {
    set(2, src(2) * 0.8);
    set(13, src(13) * 0.8);
  } else if (palam(target, 5) < PALAMLV[3]) {
    set(2, src(2) * 1.0);
    set(13, src(13) * 1.0);
  } else if (palam(target, 5) < PALAMLV[4]) {
    set(2, src(2) * 1.2);
    set(13, src(13) * 1.2);
  } else {
    set(2, src(2) * 1.4);
    set(13, src(13) * 1.4);
  }

  if (tal(target, 99)) set(6, src(6) * 0.8);
  if (tal(target, 100)) set(6, src(6) * 2.0);
  if (tal(target, 135)) set(6, src(6) * 4.0);

  if (tal(target, 105)) {
    set(6, src(6) * 1.5);
    set(13, src(13) * 1.5);
    set(14, src(14) * 1.5);
  } else if (tal(target, 106)) {
    set(6, src(6) * 0.6);
    set(13, src(13) * 0.6);
    set(14, src(14) * 0.6);
  }

  if (exp(target, 0) === 0 && tal(target, 30)) {
    set(13, src(13) / 3);
  }

  chara(target).dungeon.肛门经验 += 25;
  era.print('肛门经验＋２５');

  if (exp(target, 53) === 0) {
    chara(target).dungeon.异常经验 += 1;
    era.print('异常经验＋１');
  }
  chara(target).dungeon.肛门扩张经验 += 1;
  era.print('肛门扩张经验＋1');

  return 1;
}

/** @COM83（COMF83_両穴フィスト.ERB）两穴拳交。 */
async function com83() {
  const target = era_flag.target;
  era.print('双穴拳交');
  await train_message_b();

  era.set('tflag:19', 1);

  const { src, set } = make_src_helpers(target);
  lose(target, 0, 800);
  lose(target, 1, 500);
  set(6, 1800);
  set(10, 2800);
  set(11, 1500);
  set(12, 2500);
  set(13, 2500);
  set(14, 2500);
  set(16, 2500);

  if (abl(target, 2) === 0) {
    set(1, 40);
    set(3, 50);
  } else if (abl(target, 2) === 1) {
    set(1, 150);
    set(3, 150);
  } else if (abl(target, 2) === 2) {
    set(1, 400);
    set(3, 250);
  } else if (abl(target, 2) === 3) {
    set(1, 1000);
    set(3, 350);
  } else if (abl(target, 2) === 4) {
    set(1, 1700);
    set(3, 600);
  } else {
    set(1, 2200);
    set(3, 850);
  }

  if (abl(target, 3) === 0) {
    set(2, 10);
    set(3, 10);
    set(13, 100);
  } else if (abl(target, 3) === 1) {
    set(2, 30);
    set(13, 700);
  } else if (abl(target, 3) === 2) {
    set(2, 500);
    set(13, 1500);
  } else if (abl(target, 3) === 3) {
    set(2, 1000);
    set(13, 3000);
  } else if (abl(target, 3) === 4) {
    set(2, 1700);
    set(13, 5000);
  } else {
    set(2, 2200);
    set(13, 8000);
  }

  if (exp(target, 0) < EXPLV[1]) {
    set(1, src(1) * 0.2);
    set(6, src(6) + 20000);
    set(11, src(11) + 2000);
    if (!tal(era_flag.player, 122)) {
      chara(target).dungeon.异常经验 += 1;
      era.print(`${name_of('expname', 50)}＋１`);
    }
  } else if (exp(target, 0) < EXPLV[2]) {
    set(1, src(1) * 0.6);
    set(6, src(6) + 300);
  } else if (exp(target, 0) < EXPLV[3]) {
    set(1, src(1) * 1.0);
    set(6, src(6) + 50);
  } else if (exp(target, 0) < EXPLV[4]) {
    set(1, src(1) * 1.2);
    set(6, src(6) + 10);
  } else if (exp(target, 0) < EXPLV[5]) {
    set(1, src(1) * 1.4);
    set(6, src(6) + 0);
  } else {
    set(1, src(1) * 1.6);
    set(6, 0);
  }

  if (exp(target, 1) < EXPLV[1]) {
    set(2, src(2) * 0.1);
    set(6, src(6) + 5000);
    set(11, src(11) + 1000);
  } else if (exp(target, 1) < EXPLV[2]) {
    set(2, src(2) * 0.3);
    set(6, src(6) + 2000);
    set(11, src(11) + 1000);
  } else if (exp(target, 1) < EXPLV[3]) {
    set(2, src(2) * 0.5);
    set(6, src(6) + 2000);
    set(11, src(11) + 1000);
  } else if (exp(target, 1) < EXPLV[4]) {
    set(2, src(2) * 1.0);
    set(6, src(6) + 2000);
    set(11, src(11) + 1000);
  } else if (exp(target, 1) < EXPLV[5]) {
    set(2, src(2) * 1.4);
    set(6, src(6) + 1000);
    set(11, src(11) + 200);
  } else {
    set(1, src(1) * 1.6);
    set(6, src(6) + 600);
  }

  if (palam(target, 3) < PALAMLV[1]) {
    set(1, src(1) * 0.2);
    set(2, src(2) * 0.2);
    set(11, src(11) + 1000);
    set(6, src(6) + 1900);
    set(6, src(6) * 9.0);
  } else if (palam(target, 3) < PALAMLV[2]) {
    set(1, src(1) * 0.6);
    set(2, src(2) * 0.4);
    set(11, src(11) + 800);
    set(6, src(6) + 1250);
    set(6, src(6) * 3.0);
  } else if (palam(target, 3) < PALAMLV[3]) {
    set(1, src(1) * 1.0);
    set(2, src(2) * 0.6);
    set(11, src(11) + 600);
    set(6, src(6) + 1000);
    set(6, src(6) * 1.5);
  } else if (palam(target, 3) < PALAMLV[4]) {
    set(1, src(1) * 1.3);
    set(2, src(2) * 1.0);
    set(11, src(11) + 200);
    set(6, src(6) + 200);
    set(6, src(6) * 0.3);
  } else {
    set(1, src(1) * 1.6);
    set(2, src(2) * 1.3);
    set(6, src(6) * 0.1);
  }

  if (palam(target, 5) < PALAMLV[1]) {
    set(1, src(1) * 0.6);
    set(2, src(2) * 0.6);
    set(13, src(13) * 0.6);
  } else if (palam(target, 5) < PALAMLV[2]) {
    set(1, src(1) * 0.8);
    set(2, src(2) * 0.8);
    set(13, src(13) * 0.8);
  } else if (palam(target, 5) < PALAMLV[3]) {
    set(1, src(1) * 1.0);
    set(2, src(2) * 1.0);
    set(13, src(13) * 1.0);
  } else if (palam(target, 5) < PALAMLV[4]) {
    set(1, src(1) * 1.2);
    set(2, src(2) * 1.2);
    set(13, src(13) * 1.2);
  } else {
    set(1, src(1) * 1.4);
    set(2, src(2) * 1.4);
    set(13, src(13) * 1.4);
  }

  if (abl(target, 10) === 0) {
    set(1, src(1) * 0.5);
    set(2, src(2) * 0.7);
    set(3, src(3) * 0.6);
    set(11, src(11) * 2.0);
  } else if (abl(target, 10) === 1) {
    set(1, src(1) * 0.8);
    set(2, src(2) * 0.9);
    set(3, src(3) * 0.8);
    set(11, src(11) * 1.2);
  } else if (abl(target, 10) === 2) {
    set(1, src(1) * 1.0);
    set(2, src(2) * 1.0);
    set(3, src(3) * 1.0);
    set(11, src(11) * 1.0);
  } else if (abl(target, 10) === 3) {
    set(1, src(1) * 1.2);
    set(2, src(2) * 1.1);
    set(3, src(3) * 1.2);
    set(11, src(11) * 0.6);
  } else if (abl(target, 10) === 4) {
    set(1, src(1) * 1.4);
    set(2, src(2) * 1.2);
    set(3, src(3) * 1.4);
    set(11, src(11) * 0.3);
  } else {
    set(1, src(1) * 1.7);
    set(2, src(2) * 1.3);
    set(3, src(3) * 1.6);
    set(11, src(11) * 0.1);
  }

  if (tal(target, 99)) set(6, src(6) * 0.8);
  if (tal(target, 100)) set(6, src(6) * 3.0);
  if (tal(target, 135)) set(6, src(6) * 4.0);

  if (tal(target, 105)) {
    set(6, src(6) * 1.5);
    set(11, src(11) * 1.5);
    set(13, src(13) * 1.5);
    set(14, src(14) * 1.5);
  } else if (tal(target, 106)) {
    set(6, src(6) * 0.6);
    set(11, src(11) * 0.6);
    set(13, src(13) * 0.6);
    set(14, src(14) * 0.6);
  }

  chara(target).dungeon.肛门经验 += 25;
  era.print('肛门经验＋２５');

  if (tal(target, 30)) {
    if (exp(target, 0) === 0) {
      set(3, src(3) * 0.6);
      set(11, src(11) * 5.0);
    } else {
      set(3, src(3) * 0.6);
      set(11, src(11) * 1.8);
    }
  } else if (tal(target, 31)) {
    if (exp(target, 0) === 0) {
      set(11, src(11) * 0.5);
    } else {
      set(11, src(11) * 0.3);
    }
  }

  chara(target).dungeon.私处经验 += 25;
  era.print('私处经验＋２５');

  if (exp(target, 52) === 0) {
    chara(target).dungeon.异常经验 += 1;
    era.print('异常经验＋１');
  }
  chara(target).dungeon.私处扩张经验 += 1;
  era.print('私处扩张经验＋1');

  if (exp(target, 53) === 0) {
    chara(target).dungeon.异常经验 += 1;
    era.print('异常经验＋１');
  }
  chara(target).dungeon.肛门扩张经验 += 3;
  era.print('肛门扩张经验＋3');

  return 1;
}

/** @COM84（COMF84_Gスポット刺激.ERB）刺激G点。高级 COM，只经 CASE 8 升格抵达。 */
async function com84() {
  const target = era_flag.target;
  const player = era_flag.player;

  era.print('刺激Ｇ点');
  era_flag.selectcom = 84; // 原作显式 SELECTCOM = 84（升格抵达时回填号位）
  await train_message_b();

  const { src, set } = make_src_helpers(target);
  lose(target, 0, 50);
  lose(target, 1, 180);
  set(3, 300);
  set(7, 200);
  set(10, 500);
  set(12, 300);
  set(14, 400);
  set(15, 50);

  if (abl(target, 2) === 0) {
    set(1, 10);
    set(13, 20);
  } else if (abl(target, 2) === 1) {
    set(1, 150);
    set(13, 120);
  } else if (abl(target, 2) === 2) {
    set(1, 600);
    set(13, 500);
  } else if (abl(target, 2) === 3) {
    set(1, 1800);
    set(13, 1200);
  } else if (abl(target, 2) === 4) {
    set(1, 2400);
    set(13, 1800);
  } else {
    set(1, 3200);
    set(13, 2400);
  }

  if (exp(target, 0) < EXPLV[1]) {
    set(1, src(1) * 0.2);
    set(13, src(13) * 0.2);
    set(6, 150);
  } else if (exp(target, 0) < EXPLV[2]) {
    set(1, src(1) * 0.5);
    set(13, src(13) * 0.5);
    set(6, 80);
  } else if (exp(target, 0) < EXPLV[3]) {
    set(1, src(1) * 1.0);
    set(13, src(13) * 0.8);
    set(6, 80);
  } else if (exp(target, 0) < EXPLV[4]) {
    set(1, src(1) * 1.2);
    set(13, src(13) * 1.0);
    set(6, 0);
  } else if (exp(target, 0) < EXPLV[5]) {
    set(1, src(1) * 1.6);
    set(13, src(13) * 1.2);
    set(6, 0);
  } else {
    set(1, src(1) * 1.8);
    set(13, src(13) * 1.5);
    set(6, 0);
  }

  if (tal(target, 263)) set(1, src(1) * 1.5); // 小人体型

  if (palam(target, 3) < PALAMLV[1]) {
    set(1, src(1) * 0.1);
    set(6, src(6) + 2000);
    set(6, src(6) * 3.0);
  } else if (palam(target, 3) < PALAMLV[2]) {
    set(1, src(1) * 0.2);
    set(6, src(6) + 800);
    set(6, src(6) * 1.0);
  } else if (palam(target, 3) < PALAMLV[3]) {
    set(1, src(1) * 0.6);
    set(6, src(6) * 0.8);
  } else if (palam(target, 3) < PALAMLV[4]) {
    set(1, src(1) * 1.0);
    set(6, src(6) * 0.5);
  } else {
    set(1, src(1) * 2.0);
    set(6, src(6) * 0.1);
  }

  if (palam(target, 5) < PALAMLV[1]) {
    set(1, src(1) * 1.5);
    set(7, src(7) * 0.9);
    set(10, src(10) * 0.9);
  } else if (palam(target, 5) < PALAMLV[2]) {
    set(1, src(1) * 1.8);
    set(7, src(7) * 1.0);
    set(10, src(10) * 1.0);
  } else if (palam(target, 5) < PALAMLV[3]) {
    set(1, src(1) * 2.1);
    set(7, src(7) * 1.1);
    set(10, src(10) * 1.1);
  } else if (palam(target, 5) < PALAMLV[4]) {
    set(1, src(1) * 3.2);
    set(7, src(7) * 1.2);
    set(10, src(10) * 1.2);
  } else {
    set(1, src(1) * 4.3);
    set(7, src(7) * 1.3);
    set(10, src(10) * 1.3);
  }

  if (tal(target, 103)) {
    set(6, src(6) * 1.5);
    set(13, src(13) * 1.5);
    set(14, src(14) * 1.5);
  } else if (tal(target, 104)) {
    set(6, src(6) * 0.6);
    set(13, src(13) * 0.6);
    set(14, src(14) * 0.6);
  }

  if (exp(target, 0) === 0 && tal(target, 30)) {
    set(13, src(13) * 2.0);
  }

  chara(target).dungeon.私处经验 += 1;
  era.print('私处经验＋１');

  if (!tal(target, 122) && !tal(player, 122)) {
    era.print(`${name_of('expname', 40)}+3`);
    era.add(`exp:${target}:40`, 3);
  } else if (tal(target, 122) && tal(player, 122)) {
    era.print(`${name_of('expname', 41)}+1`);
    era.add(`exp:${target}:41`, 1);
  }

  return 1;
}

/** @COM85（COMF85_放尿.ERB）放尿。 */
async function com85() {
  const target = era_flag.target;
  const player = era_flag.player;

  let title = '';
  if (tequip(target, 53)) title += '公开';
  if (tequip(target, 54)) title += '野外';
  era.print(`${title}放尿`);
  await train_message_b();

  const { src, set } = make_src_helpers(target);
  lose(target, 0, 10);
  lose(target, 1, 200);
  set(14, 5000);
  set(5, 3000);

  if (palam(target, 5) < PALAMLV[1]) set(12, 1800);
  else if (palam(target, 5) < PALAMLV[2]) set(12, 1900);
  else if (palam(target, 5) < PALAMLV[3]) set(12, 2000);
  else if (palam(target, 5) < PALAMLV[4]) set(12, 2100);
  else set(12, 2200);

  if (abl(target, 17) === 0) {
    set(7, 0);
    set(13, 6000);
  } else if (abl(target, 17) === 1) {
    set(7, 30);
    set(13, 5000);
  } else if (abl(target, 17) === 2) {
    set(7, 100);
    set(13, 4000);
  } else if (abl(target, 17) === 3) {
    set(7, 300);
    set(13, 3000);
  } else if (abl(target, 17) === 4) {
    set(7, 500);
    set(13, 2000);
  } else {
    set(7, 1000);
    set(13, 1000);
  }

  if (abl(target, 21) === 0) {
    set(7, src(7) * 0.8);
    set(12, src(12) * 0.8);
    set(10, 100);
    set(11, 100);
  } else if (abl(target, 21) === 1) {
    set(7, src(7) * 1.0);
    set(12, src(12) * 1.0);
    set(10, 200);
    set(11, 300);
  } else if (abl(target, 21) === 2) {
    set(7, src(7) * 1.3);
    set(12, src(12) * 1.2);
    set(10, 400);
    set(11, 700);
  } else if (abl(target, 21) === 3) {
    set(7, src(7) * 1.4);
    set(12, src(12) * 1.4);
    set(10, 700);
    set(11, 1200);
  } else if (abl(target, 21) === 4) {
    set(7, src(7) * 1.7);
    set(12, src(12) * 1.5);
    set(10, 1100);
    set(11, 1800);
  } else {
    set(7, src(7) * 2.0);
    set(12, src(12) * 1.7);
    set(10, 1500);
    set(11, 2500);
  }

  if (tequip(target, 54)) {
    set(12, src(12) * 2.5);
    set(14, src(14) * 2.5);
  } else if (tequip(target, 57)) {
    set(12, src(12) * 1.5);
    set(14, src(14) * 1.5);
  } else if (tequip(target, 58)) {
    set(12, src(12) * 0.5);
    set(14, src(14) * 0.5);
  }

  let a = 100;
  if (exp(target, 31) < EXPLV[1]) a *= 3.0;
  else if (exp(target, 31) < EXPLV[2]) a *= 2.5;
  else if (exp(target, 31) < EXPLV[3]) a *= 2.0;
  else if (exp(target, 31) < EXPLV[4]) a *= 1.0;
  else if (exp(target, 31) < EXPLV[5]) a *= 0.8;
  else a *= 0.6;

  if (tal(target, 10)) a *= 1.2; // 胆怯
  if (tal(target, 11)) a *= 2.0; // 反抗心
  if (tal(target, 15)) a *= 2.0; // 高姿态
  if (tal(target, 17)) a *= 0.8; // 低姿态
  if (tal(target, 20)) a *= 1.5; // 克制
  if (tal(target, 22)) a *= 0.6; // 感情淡薄
  if (tal(target, 28)) a *= 0.8; // 爱表现
  if (tal(target, 32)) a *= 3.0; // 压抑
  if (tal(target, 34)) a *= 3.0; // 抵抗
  if (tal(target, 35)) a *= 3.5; // 害羞
  if (tal(target, 36)) a *= 0.5; // 不知羞耻

  if (tal(target, 89)) {
    // 露出狂
    set(7, src(7) + 500);
    set(12, src(12) * 1.5);
  }

  set(14, src(14) + a * 5);

  era.print(`${name_of('expname', 31)}＋２`);
  chara(target).system.放尿经验 += 2;

  era.set(`stain:${target}:2`, (era.get(`stain:${target}:2`) || 0) | 32);
  era.set(`stain:${target}:3`, (era.get(`stain:${target}:3`) || 0) | 32);

  era.set('tflag:200', 2); // 屈服刻印２に相当

  if (!tal(target, 122) && !tal(player, 122)) {
    era.print(`${name_of('expname', 40)}+1`);
    era.add(`exp:${target}:40`, 1);
  } else if (tal(target, 122) && tal(player, 122)) {
    era.print(`${name_of('expname', 41)}+1`);
    era.add(`exp:${target}:41`, 1);
  }

  if (tequip(target, 90)) {
    era.add('t:0', 1);
  }

  await soiling_cloth_no1(target);

  if (tequip(target, 22)) {
    chara(target).system.利尿剂 = 0;
  }

  return 1;
}

/** @COM87（COMF87_ピアシング.ERB）穿环。跨 CALL TRAIN_MESSAGE_B 存活的部位
 * 位域 P（com-caress.js order_state 同款存活态）。 */
const piercing_state = { p: 0 };

const PIERCING_BITS = [1, 2, 4, 8, 16, 32, 64];
const PIERCING_INSTALL_V = {
  1: 36,
  2: 30,
  4: 40,
  8: 44,
  16: 36,
  32: 34,
  64: 32,
};

function piercing_status_line(target) {
  const worn = era.get(`cflag:${target}:7`) || 0;
  let line = `${chara_callname(target)}现在，`;
  if (worn & 1) line += '乳头';
  if (worn & 2) line += '肚脐 ';
  if (worn & 4) line += '左右阴唇 ';
  if (worn & 8)
    line += tal(target, 121) || tal(target, 122) ? '阴茎 ' : '阴蒂 ';
  if (worn & 16) line += '舌头 ';
  if (worn & 32) line += '嘴唇';
  if (worn & 64) line += '鼻子';
  era.print(line);
  era.print(worn === 0 ? '没有被装环。' : '被装上了环。');
  const stock = era.get('item:34') || 0;
  era.print(stock ? `手上有${stock}个环。` : '手上没有环。');
}

/** @COM87 判定段：装/取选择后返回 P（0 = 玩家取消） */
async function piercing_choose_part() {
  const target = era_flag.target;
  for (;;) {
    piercing_status_line(target);
    const worn = era.get(`cflag:${target}:7`) || 0;
    const stock = era.get('item:34') || 0;
    if (stock && PIERCING_BITS.some((bit) => (worn & bit) === 0)) {
      era.print(' [0] - 装上环');
    }
    if (PIERCING_BITS.some((bit) => (worn & bit) !== 0)) {
      era.print(' [1] - 取下环');
    }
    era.print(' [10]- 放弃');
    const choice = await era.input();
    if (choice === 0 && stock) {
      era.print('在哪里装上环？');
      if ((worn & 1) === 0 && stock >= 2) era.print(' [0] - 乳头(2个消费)');
      if ((worn & 2) === 0) era.print(' [1] - 肚脐');
      if ((worn & 4) === 0 && !tal(target, 122) && stock >= 2)
        era.print(' [2] - 左右阴唇(2个消费)');
      if ((worn & 8) === 0)
        era.print(
          tal(target, 121) || tal(target, 122) ? ' [3] - 阴茎' : ' [3] - 阴蒂',
        );
      if ((worn & 16) === 0) era.print(' [4] - 舌头');
      if ((worn & 32) === 0) era.print(' [5] - 嘴唇');
      if ((worn & 64) === 0) era.print(' [6] - 鼻子');
      era.print(' [10]- 算了');
      const sub = await era.input();
      if (sub === 10) return 0;
      if ((sub === 0 || sub === 2) && stock < 2) continue;
      if (sub < 0 || sub > 6) continue;
      if (sub === 2 && tal(target, 122)) continue;
      return [1, 2, 4, 8, 16, 32, 64][sub];
    }
    if (choice === 1 && worn !== 0) {
      era.print('要拿下哪里的环？');
      if (worn & 1) era.print(' [0] - 乳头');
      if (worn & 2) era.print(' [1] - 肚脐');
      if (worn & 4 && !tal(target, 122)) era.print(' [2] - 左右阴唇');
      if (worn & 8)
        era.print(
          tal(target, 121) || tal(target, 122) ? ' [3] - 阴茎' : ' [3] - 阴蒂',
        );
      if (worn & 16) era.print(' [4] - 舌头');
      if (worn & 32) era.print(' [5] - 嘴唇');
      if (worn & 64) era.print(' [6] - 鼻子');
      era.print(' [10]- 算了');
      const sub = await era.input();
      if (sub === 10) return 0;
      if (sub < 0 || sub > 6) continue;
      if (sub === 2 && tal(target, 122)) continue;
      return [1, 2, 4, 8, 16, 32, 64][sub];
    }
    if (choice === 10) return 0;
  }
}

async function com87() {
  const target = era_flag.target;
  const player = era_flag.player;
  era.print('穿环');

  const p = await piercing_choose_part();
  if (p === 0) return 0;

  const worn = era.get(`cflag:${target}:7`) || 0;
  const auto_success = tequip(target, 44) || (worn & p) !== 0; // 绳子/取下即自動成功

  if (!auto_success) {
    let a = 0;
    let s = 0;
    const { a: order_a, s: order_s, parts } = await com_order(0, 0);
    a = order_a;
    s = order_s;
    const plus = () => {
      if (s) parts.push(' + ');
    };
    const minus = () => parts.push(' - ');

    if (abl(target, 11)) {
      plus();
      a += abl(target, 11) * 3;
      parts.push(
        `${name_of('ablname', 11)}LV${abl(target, 11)}(${abl(target, 11) * 3})`,
      );
      s = 1;
    }
    if (abl(target, 21)) {
      plus();
      a += abl(target, 21) * 4;
      parts.push(
        `${name_of('ablname', 21)}LV${abl(target, 21)}(${abl(target, 21) * 4})`,
      );
      s = 1;
    }
    if ((era.get(`mark:${target}:1`) || 0) > 0) {
      const mark1 = era.get(`mark:${target}:1`) || 0;
      plus();
      a += mark1 * 3;
      parts.push(`${name_of('markname', 1)}LV${mark1}(${mark1 * 3})`);
      s = 1;
    }
    const l =
      palam(target, 5) < PALAMLV[1]
        ? 0
        : palam(target, 5) < PALAMLV[2]
          ? 1
          : palam(target, 5) < PALAMLV[3]
            ? 2
            : palam(target, 5) < PALAMLV[4]
              ? 3
              : palam(target, 5) < PALAMLV[5]
                ? 4
                : 5;
    if (l) {
      plus();
      a += l * 3;
      parts.push(`${name_of('palamname', 5)}LV${l}(${l * 3})`);
      s = 1;
    }
    if (tal(target, 23)) {
      minus();
      a -= 3;
      parts.push(`${name_of('talentname', 23)}(3)`);
      s = 1;
    }
    if (tal(target, 24)) {
      minus();
      a -= 3;
      parts.push(`${name_of('talentname', 24)}(3)`);
      s = 1;
    }
    if (tal(target, 40)) {
      minus();
      a -= 3;
      parts.push(`${name_of('talentname', 40)}(3)`);
      s = 1;
    }
    if (tal(target, 41)) {
      plus();
      a += 3;
      parts.push(`${name_of('talentname', 41)}(3)`);
      s = 1;
    }
    if (tal(target, 85) && !era_flag.assiplay) {
      plus();
      a += 5;
      parts.push(`${name_of('talentname', 85)}(5)`);
      s = 1;
    }
    if (tequip(target, 21)) {
      plus();
      a += 8;
      parts.push(`${name_of('itemname', 26)}(8)`);
      s = 1;
    }
    if (tal(target, 88)) {
      plus();
      a += 10;
      parts.push(`${name_of('talentname', 89)}(10)`);
      s = 1;
    }

    const v = PIERCING_INSTALL_V[p];
    push_judge_tail(parts, a, v);
    era.print(parts.join(''));
    await era.waitAnyKey();
    if (a < v) {
      era.print('激烈的抵抗，没能装上。');
      await era.waitAnyKey();
      return 0;
    }
  }

  piercing_state.p = p;
  await train_message_b();

  const { src, set } = make_src_helpers(target);
  lose(target, 0, 50);
  lose(target, 1, 100);

  if (p === 1) stain_exchange(target, 5, player, 1);
  else if (p === 4) stain_exchange(target, 3, player, 1);
  else if (p === 8) stain_exchange(target, 3, player, 1);
  else if (p === 16) stain_exchange(target, 0, player, 1);
  else if (p === 32) stain_exchange(target, 0, player, 1);

  set(6, 3000);
  set(13, 1000);
  set(14, 3000);

  if (p === 1) {
    lose(target, 0, 50);
    set(6, src(6) + 4000);
    set(13, src(13) + 9000);
    set(14, src(14) + 12000);
  } else if (p === 4) {
    lose(target, 0, 50);
    lose(target, 1, 50);
    set(6, src(6) + 2000);
    set(13, src(13) + 9000);
    set(14, src(14) + 12000);
  } else if (p === 8) {
    lose(target, 0, 50);
    lose(target, 1, 50);
    set(6, src(6) + 6000);
    set(13, src(13) + 9000);
    set(14, src(14) + 17000);
  } else if (p === 16) {
    lose(target, 0, 50);
    set(6, src(6) + 4000);
    set(13, src(13) + 2000);
  } else if (p === 32) {
    lose(target, 0, 40);
    set(6, src(6) + 3000);
    set(13, src(13) + 1500);
  } else if (p === 64) {
    lose(target, 0, 20);
  }

  if (abl(target, 21) === 0) {
    set(13, src(13) * 1.0);
    set(14, src(14) * 1.0);
  } else if (abl(target, 21) === 1) {
    set(13, src(13) * 1.2);
    set(14, src(14) * 0.9);
  } else if (abl(target, 21) === 2) {
    set(13, src(13) * 1.4);
    set(14, src(14) * 0.8);
  } else if (abl(target, 21) === 3) {
    set(13, src(13) * 1.6);
    set(14, src(14) * 0.5);
  } else if (abl(target, 21) === 4) {
    set(13, src(13) * 1.8);
    set(14, src(14) * 0.3);
  } else {
    set(13, src(13) * 2.0);
    set(14, src(14) * 0.1);
  }

  if (abl(target, 17) === 2) set(14, src(14) * 0.9);
  else if (abl(target, 17) === 3) set(14, src(14) * 0.8);
  else if (abl(target, 17) === 4) set(14, src(14) * 0.7);
  else if (abl(target, 17) >= 5) set(14, src(14) * 0.6);

  if (tequip(target, 21)) set(6, src(6) * 0.05); // 幸福草
  if (tequip(target, 53)) {
    set(13, src(13) * 1.5);
    set(14, src(14) * 1.5);
  }

  const cflag7 = era.get(`cflag:${target}:7`) || 0;
  if (cflag7 & (p * 128)) {
    // 过去装着经验：痛み減
    set(6, src(6) * 0.3);
    set(13, src(13) * 0.2);
    set(14, src(14) * 0.5);
  }

  if (cflag7 & p) {
    // 外す際にはダメージもパラメータ増減も無
    lose(target, 0, -(era.get(`deltabase:${target}:0`) || 0)); // 归零（去掉上面已累计的负值）
    era.set(`deltabase:${target}:0`, 0);
    era.set(`deltabase:${target}:1`, 0);
    set(6, 0);
    set(13, 0);
    set(14, 0);
  }

  if (cflag7 === 0 && p !== 2) {
    chara(target).dungeon.异常经验 += 1;
    era.print('异常经验＋１');
  }

  if (cflag7 & p) {
    era.set(`cflag:${target}:7`, cflag7 - p);
  } else {
    era.set(`cflag:${target}:7`, cflag7 | p | (p * 128));
    era.add('item:34', -1);
    if (p === 1 || p === 4) {
      era.add('item:34', -1);
    }
  }

  return 1;
}

/** @COM88（COMF88_使役魔獣プレイ.ERB）使役魔兽 PLAY 开关。*/
async function com88() {
  const target = era_flag.target;
  era.print('使役魔兽PLAY');
  const inum = era.get(`cflag:${target}:570`) || 0;
  monster_data(inum, 3, target, -1);
  await train_message_b();

  if (tequip(target, 88)) {
    era.set(`tequip:${target}:88`, 0);
  } else {
    era.set(`tequip:${target}:88`, 1);
  }
  era.set('t:0', 0);
  return 1;
}

/** @COM89（COMF89_獣姦プレイ.ERB）兽奸 PLAY 开关。 */
async function com89() {
  era.print('兽奸PLAY');
  await train_message_b();

  const target = era_flag.target;
  if (tequip(target, 89)) {
    era.set(`tequip:${target}:89`, 0);
  } else {
    era.set(`tequip:${target}:89`, 1);
  }
  era.set('t:0', 0);
  return 1;
}

/**
 * @EQUIP_COM89（COMF89_獣姦プレイ.ERB:19-249）：兽奸 PLAY 中的持续效果。
 * @EQUIP_COM_CHAIN 的 [89, 89] 消费点（SYSTEM_SOURCE.ERB SIF 链），本族票落地。
 */
async function equip_com89() {
  const target = era_flag.target;
  era.print('＜兽奸PLAY中＞');
  era.set('t:0', 1); // T = 1（本轮兽奸经验累加起点，随后 T+=N 累加、EXP:56 += T 收尾）

  let a;
  let b;
  if (exp(target, 56) < EXPLV[1]) {
    a = 400;
    b = 2000;
  } else if (exp(target, 56) < EXPLV[2]) {
    a = 200;
    b = 1000;
  } else if (exp(target, 56) < EXPLV[3]) {
    a = 100;
    b = 500;
  } else if (exp(target, 56) < EXPLV[4]) {
    a = 50;
    b = 200;
  } else if (exp(target, 56) < EXPLV[5]) {
    a = 20;
    b = 100;
  } else {
    a = 10;
    b = 50;
  }

  const { src, set } = make_src_helpers(target);
  if (abl(target, 39) === 0) {
    a *= 1.5;
    b *= 1.5;
  } else if (abl(target, 39) === 1) {
    set(7, src(7) + 100);
  } else if (abl(target, 39) === 2) {
    a *= 0.8;
    b *= 0.8;
    set(7, src(7) + 400);
  } else if (abl(target, 39) === 3) {
    a *= 0.6;
    b *= 0.6;
    set(7, src(7) + 1200);
  } else if (abl(target, 39) === 4) {
    a *= 0.4;
    b *= 0.4;
    set(7, src(7) + 3000);
  } else {
    a *= 0.2;
    b *= 0.2;
    set(7, src(7) + 5000);
  }

  if (tal(target, 22)) b *= 0.6; // 感情淡薄
  if (tal(target, 124)) b *= 0.5; // 动物耳朵
  if (tal(target, 136)) {
    a *= 0.2;
    b *= 0.2;
  } // 牝犬

  lose(target, 1, a);
  set(8, src(8) + b);
  set(14, src(14) + b);
  set(10, src(10) + 200);
  set(0, src(0) * 1.5);
  set(2, src(2) * 1.5);
  set(17, src(17) * 1.5);
  set(6, src(6) * 1.5);
  set(13, src(13) * 3.0);

  if (tal(target, 124)) {
    set(13, src(13) / 2);
  }
  if (tal(target, 136)) {
    set(3, src(3) * 1.2);
    set(4, src(4) * 1.2);
    set(5, src(5) * 1.2);
    set(7, src(7) * 2.0);
    set(10, src(10) * 3.0);
  }

  const com = era_flag.selectcom;
  if (com === 21 || com === 27 || com === 37) {
    set(14, src(14) * 2.0);
  }

  if (exp(target, 56) === 0) {
    chara(target).dungeon.异常经验 += 1;
    era.print('异常经验＋1');
  }

  // —— 射精チェック ——
  const player_master = 0; // MASTER 恒为 0（CONTEXT.md）
  // GOTO END_EJAC 命中时原作 E 无新赋值（读到从未刷新的全局）；ere 侧按其
  // 唯一可合理代入的默认值 0（COM80 头注同类处理），下方汚れ/TFLAG:16 与
  // T 收尾在两条路径都执行（$END_EJAC 之后是共同尾段，1:1 挪到 if 外）
  let e = 0;
  if ((era.get(`maxbase:${player_master}:4`) || 0) !== 0) {
    let ejacb = 0;
    if (abl(target, 12) === 0) ejacb = 450;
    else if (abl(target, 12) === 1) ejacb = 1000;
    else if (abl(target, 12) === 2) ejacb = 1600;
    else if (abl(target, 12) === 3) ejacb = 2200;
    else if (abl(target, 12) === 4) ejacb = 2700;
    else ejacb = 3200;

    if (abl(target, 10) === 0) ejacb *= 0.3;
    else if (abl(target, 10) === 1) ejacb *= 0.5;
    else if (abl(target, 10) === 2) ejacb *= 0.7;
    else if (abl(target, 10) === 3) ejacb *= 1.0;
    else if (abl(target, 10) === 4) ejacb *= 1.2;
    else ejacb *= 1.3;

    if (abl(target, 39) === 0) ejacb *= 1.0;
    else if (abl(target, 39) === 1) ejacb *= 1.2;
    else if (abl(target, 39) === 2) ejacb *= 1.8;
    else if (abl(target, 39) === 3) ejacb *= 2.6;
    else if (abl(target, 39) === 4) ejacb *= 4.0;
    else ejacb *= 5.0;

    if (palam(target, 5) < PALAMLV[1]) ejacb *= 1.0;
    else if (palam(target, 5) < PALAMLV[2]) ejacb *= 1.1;
    else if (palam(target, 5) < PALAMLV[3]) ejacb *= 1.2;
    else if (palam(target, 5) < PALAMLV[4]) ejacb *= 1.3;
    else if (palam(target, 5) < PALAMLV[5]) ejacb *= 1.4;
    else ejacb *= 1.5;

    if (tal(target, 124)) ejacb *= 1.2;
    if (tal(target, 136)) ejacb *= 2.0;

    if (com === 6) {
      ejacb = 0;
      era.add('t:0', 2);
    } else if (com === 21) {
      ejacb *= 1.0;
      era.add('t:0', 2);
    } else if (com === 27) {
      ejacb *= 1.5;
      era.add('t:0', 2);
    } else if (com === 30) {
      ejacb *= 0.8;
      era.add('t:0', 1);
    } else if (com === 31) {
      ejacb *= 1.2;
      era.add('t:0', 2);
    } else if (com === 34) {
      ejacb *= 1.5;
      era.add('t:0', 3);
    } else {
      ejacb = 0;
    }

    era.add(`base:${player_master}:4`, ejacb);
    const s = era.get(`base:${player_master}:4`) || 0;
    const ejac = era.get(`maxbase:${player_master}:4`) || 0;
    e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;

    if (e) {
      set(4, src(4) * 3.0);
      if (abl(target, 32) === 0) {
        set(7, 0);
        set(5, src(5) * 2.0);
        set(13, src(13) * 2.0);
      } else if (abl(target, 32) === 1) {
        set(7, 200);
        set(5, src(5) * 2.5);
        set(13, src(13) * 1.6);
      } else if (abl(target, 32) === 2) {
        set(7, 500);
        set(5, src(5) * 3.0);
        set(13, src(13) * 1.0);
      } else if (abl(target, 32) === 3) {
        set(7, 1200);
        set(5, src(5) * 4.5);
        set(13, src(13) * 0.7);
      } else if (abl(target, 32) === 4) {
        set(7, 2500);
        set(5, src(5) * 6.0);
        set(13, src(13) * 0.4);
      } else {
        set(7, 5000);
        set(5, src(5) * 8.0);
        set(13, src(13) * 0.1);
      }
    }

    if (e === 2) {
      chara(target).dungeon.精液经验 += 3;
      era.print('兽奸大量射精');
      era.print('精液经验＋３');
      era.add('t:0', 5);
      let next = (era.get(`base:${player_master}:4`) || 0) - ejac * 2;
      if (next >= ejac) next = ejac - 1;
      era.set(`base:${player_master}:4`, next);
      if (com === 21 || com === 34) era.set('tflag:38', 2);
    } else if (e === 1) {
      chara(target).dungeon.精液经验 += 1;
      era.print('兽奸射精');
      era.print('精液经验＋１');
      era.add('t:0', 2);
      let next = (era.get(`base:${player_master}:4`) || 0) - ejac;
      if (next >= ejac) next = ejac - 1;
      era.set(`base:${player_master}:4`, next);
      if (com === 21 || com === 34) era.set('tflag:38', 1);
    }

    if (e) {
      era.print('(善恶值减少:-1)');
      await era.waitAnyKey();
      karma(target, -1);
    }
  }

  // —— 汚れ与 T 收尾（$END_EJAC 之后的共同尾段，GOTO 命中时也执行）——
  if (com === 21)
    era.set(`stain:${target}:3`, (era.get(`stain:${target}:3`) || 0) | 2);
  if (com === 27)
    era.set(`stain:${target}:4`, (era.get(`stain:${target}:4`) || 0) | 2);
  if (com === 30)
    era.set(`stain:${target}:1`, (era.get(`stain:${target}:1`) || 0) | 2);
  if (com === 31)
    era.set(`stain:${target}:0`, (era.get(`stain:${target}:0`) || 0) | 2);
  if (com === 37)
    era.set(`stain:${target}:0`, (era.get(`stain:${target}:0`) || 0) | 8);
  if (com === 21 && e > 0)
    era.set(`stain:${target}:3`, (era.get(`stain:${target}:3`) || 0) | 4);
  if (com === 27 && e > 0)
    era.set(`stain:${target}:4`, (era.get(`stain:${target}:4`) || 0) | 4);
  if (com === 30 && e > 0)
    era.set(`stain:${target}:1`, (era.get(`stain:${target}:1`) || 0) | 4);
  if (com === 31 && e > 0)
    era.set(`stain:${target}:0`, (era.get(`stain:${target}:0`) || 0) | 4);

  game.event.犬射精或处刑口上 = e;
  const t_final = era.get('t:0') || 0;
  era.print(`兽奸经验＋${t_final}`);
  chara(target).dungeon.兽奸经验 += t_final;
  era.set('t:0', 0);

  if (tal(target, 0) && (era.get('tflag:19') || 0) && !tal(target, 124)) {
    chara(target).dungeon.异常经验 += 2;
    era.print('异常经验＋２');
  }

  if (com === 30) {
    era.set('tflag:200', 2);
  } else if ([31, 21, 27, 34, 37].includes(com)) {
    era.set('tflag:200', 3);
  }

  return 1;
}

/** @COM90（COMF90_ニプルファック.ERB）乳内插入。 */
async function com90() {
  const target = era_flag.target;
  if (!(await confirm_condom())) return 0;

  era.print('乳房插入');
  await train_message_b(); // 源侧无 SELECTCOM==90 分支，真实无输出

  era.set(`cflag:${target}:113`, 1); // 乳房挿入フラグ
  await com_ejac_player_sex();

  const { src, set } = make_src_helpers(target);
  lose(target, 0, 50);
  lose(target, 1, 100);
  set(12, 400);

  if (abl(target, 1) === 0) {
    set(17, 40);
    set(3, 150);
  } else if (abl(target, 1) === 1) {
    set(17, 150);
    set(3, 250);
  } else if (abl(target, 1) === 2) {
    set(17, 400);
    set(3, 350);
  } else if (abl(target, 1) === 3) {
    set(17, 1000);
    set(3, 500);
  } else if (abl(target, 1) === 4) {
    set(17, 1700);
    set(3, 700);
  } else {
    set(17, 2200);
    set(3, 1000);
  }

  if (exp(target, 35) < EXPLV[1]) {
    set(17, src(17) * 0.2);
    set(6, 5500);
  } else if (exp(target, 35) < EXPLV[2]) {
    set(17, src(17) * 0.6);
    set(6, 300);
  } else if (exp(target, 35) < EXPLV[3]) {
    set(17, src(17) * 1.0);
    set(6, 50);
  } else if (exp(target, 35) < EXPLV[4]) {
    set(17, src(17) * 1.2);
    set(6, 10);
  } else if (exp(target, 35) < EXPLV[5]) {
    set(17, src(17) * 1.3);
    set(6, 0);
  } else {
    set(17, src(17) * 1.8);
    set(6, 0);
  }

  if (palam(target, 3) < PALAMLV[1]) {
    set(17, src(17) * 0.1);
    set(6, src(6) + 1000);
    set(6, src(6) * 3.0);
  } else if (palam(target, 3) < PALAMLV[2]) {
    set(17, src(17) * 0.4);
    set(6, src(6) + 300);
    set(6, src(6) * 1.0);
  } else if (palam(target, 3) < PALAMLV[3]) {
    set(17, src(17) * 1.0);
    set(6, src(6) * 0.5);
  } else if (palam(target, 3) < PALAMLV[4]) {
    set(17, src(17) * 1.4);
    set(6, src(6) * 0.2);
  } else {
    set(17, src(17) * 1.8);
    set(6, src(6) * 0.1);
  }

  if (era_flag.assiplay && tal(era_flag.assi, 121)) {
    set(17, src(17) * 2.5);
  }

  if (tal(target, 99)) set(6, src(6) * 0.8); // 大柄
  if (tal(target, 100)) set(6, src(6) * 2.0); // 小柄体形
  if (tal(target, 135)) set(6, src(6) * 4.0); // 未熟

  if (palam(target, 5) < PALAMLV[1]) {
    set(17, src(17) * 0.6);
    set(3, src(3) * 0.3);
  } else if (palam(target, 5) < PALAMLV[2]) {
    set(17, src(17) * 0.8);
    set(3, src(3) * 0.6);
  } else if (palam(target, 5) < PALAMLV[3]) {
    set(17, src(17) * 1.0);
    set(3, src(3) * 1.0);
  } else if (palam(target, 5) < PALAMLV[4]) {
    set(17, src(17) * 1.2);
    set(3, src(3) * 1.5);
  } else {
    set(17, src(17) * 1.5);
    set(3, src(3) * 1.8);
  }

  if (abl(target, 10) === 0) {
    set(17, src(17) * 0.5);
    set(3, src(3) * 0.6);
    set(15, src(15) * 2.0);
  } else if (abl(target, 10) === 1) {
    set(17, src(17) * 0.8);
    set(3, src(3) * 0.8);
    set(15, src(15) * 1.5);
  } else if (abl(target, 10) === 2) {
    set(17, src(17) * 1.0);
    set(3, src(3) * 1.0);
    set(15, src(15) * 1.0);
  } else if (abl(target, 10) === 3) {
    set(17, src(17) * 1.3);
    set(3, src(3) * 1.2);
    set(15, src(15) * 0.8);
  } else if (abl(target, 10) === 4) {
    set(17, src(17) * 1.6);
    set(3, src(3) * 1.4);
    set(15, src(15) * 0.6);
  } else {
    set(17, src(17) * 2.0);
    set(3, src(3) * 1.6);
    set(15, src(15) * 0.3);
  }

  await com_after_extra_sex();

  return 1;
}

// ============================================================
// @GET_ADV_COM CASE 80（COMF_JUMP.ERB:642-663）
// ============================================================

/**
 * CASE 80：强制口交 → 3P（64，J15 助手族，源侧升格目标）。TFLAG:42 先清 0，
 * 命中「上回合是 3P」或「调教者切换 && 上回合是正常/背后/背后肛交/3P」时
 * 升格；COM_ABLE64 未落地时按缺失语义处理（whenMissing: 0 = 不可用）。
 */
adv_com_family.register(80, async () => {
  era.set('tflag:42', 0);
  const prev = era_flag.prevcom;
  if (prev === 64) {
    if ((await com_able_family.call(64, { whenMissing: 0 })) === 1) {
      era.set('tflag:42', 1);
      return 64;
    }
    return 80;
  }
  // 调教者从上回合切换（助手↔主人）
  const t50 = era.get('tflag:50') || 0;
  const trainer_switched = era_flag.assiplay ? t50 === 0 : t50 !== 0;
  if (trainer_switched && [20, 21, 27, 64].includes(prev)) {
    if ((await com_able_family.call(64, { whenMissing: 0 })) === 1) {
      return 64;
    }
  }
  return 80;
});

// ============================================================
// @TRAIN_MESSAGE_B（SELECTCOM 80-89；90 源侧无分支，真实无输出）
// ============================================================

train_message_b_family.register(80, async () => {
  const target = era_flag.target;
  const player = era_flag.player;
  let line = chara_callname(player);
  if (tal(target, 304) === 8) {
    line += `用双手紧紧拉扯着${chara_callname(target)}的双马尾、`;
  }
  line += '用阴茎粗暴地肆虐着' + chara_callname(target) + '的喉咙深处…';
  era.print(line);
  return 0;
});

train_message_b_family.register(81, async () => {
  const target = era_flag.target;
  era.print(
    `${chara_callname(target)}的私处、被${chara_callname(era_flag.player)}用拳头搅动着。`,
  );
  if ((era.get('tflag:899') || 0) === 0) {
    if (abl(target, 2) === 2)
      era.print(`${chara_callname(target)}的私处被彻底打开了。`);
    else if (abl(target, 2) === 3)
      era.print(`${chara_callname(target)}的私处被张开、一时三刻缩不回去。`);
    else if (abl(target, 2) === 4)
      era.print(
        `${chara_callname(target)}大开的体内、肉壁和子宫口全部清晰可见。`,
      );
    else if (abl(target, 2) >= 5)
      era.print(
        `${chara_callname(target)}表情恍惚、面带痴笑、自己用手指拉开着私处口……`,
      );
  }
  return 0;
});

train_message_b_family.register(82, async () => {
  const target = era_flag.target;
  era.print(
    `${chara_callname(target)}的肛门、被${chara_callname(era_flag.player)}用拳头搅动着。`,
  );
  if ((era.get('tflag:899') || 0) === 0) {
    if (abl(target, 3) === 2)
      era.print(`${chara_callname(target)}的肛门、被彻底打开了。`);
    else if (abl(target, 3) === 3)
      era.print(`${chara_callname(target)}的肛门被张开、一时三刻缩不回去。`);
    else if (abl(target, 3) === 4)
      era.print(`${chara_callname(target)}大开的体内、直肠肉壁清晰可见。`);
    else if (abl(target, 3) >= 5)
      era.print(
        `${chara_callname(target)}表情恍惚、面带痴笑、自己用手指拉开着肛门……`,
      );
  }
  return 0;
});

train_message_b_family.register(83, async () => {
  const target = era_flag.target;
  era.print(
    `${chara_callname(target)}的私处和肛门、被${chara_callname(era_flag.player)}用拳头搅动着。`,
  );
  if ((era.get('tflag:899') || 0) === 0) {
    if (abl(target, 2) <= 4 || abl(target, 3) <= 4) {
      era.print(`${chara_callname(target)}双腿乱踢、筋疲力尽。`);
      era.print('被张开的私处及肛门、正飞散出大量的粘液。');
    } else if (abl(target, 2) >= 5 && abl(target, 3) >= 5) {
      era.print(`${chara_callname(target)}回味着被残忍侵犯的余韵。`);
      era.print('双手伸到完全张开的私处及肛门处、在周围不停摆弄着。');
    }
  }
  return 0;
});

train_message_b_family.register(84, async () => {
  const target = era_flag.target;
  const player = era_flag.player;
  let line = `${chara_callname(player)}把${chara_callname(target)}的`;
  if ((era.get(`cflag:${target}:40`) || 0) & 8 && abl(target, 17) !== 0) {
    line += `穿着${clothtype_main2_text(target)}的裙摆翻起、`;
  }
  if (exp(target, 0) === 0) line += '未经人事的';
  else if (palam(target, 3) >= PALAMLV[4]) line += '湿漉漉的';
  if (tal(target, 263)) line += '非常小的';
  line += tal(target, 132) ? '幼女的阴部' : '阴部';
  if (tequip(target, 11)) {
    line += '里面、有前后抽插着的蠕虫。';
  } else {
    line += '将自己的手指';
    if (
      (era_flag.prevcom === 8 || era_flag.prevcom === 84) &&
      abl(player, 12) >= 3
    ) {
      line += '温柔地插进去、轻轻地搅动着…';
    } else {
      line += '慢慢地插入去了…';
    }
  }
  era.print(line);
  if (tequip(target, 11) && abl(player, 12) >= 3) {
    era.print(`${chara_callname(player)}灵活地操纵着蠕虫、玩弄着敏感的顶点…`);
  } else if (abl(player, 12) >= 3) {
    era.print(
      `${chara_callname(player)}在${chara_callname(target)}的私处内弯曲手指、刺激着敏感的顶点…`,
    );
  }
  return 0;
});

train_message_b_family.register(85, async () => {
  const target = era_flag.target;
  const player = era_flag.player;
  const name = chara_callname(target);
  const flag40 = era.get(`cflag:${target}:40`) || 0;
  const special = era.get(`cflag:${target}:42`) || 0;
  if (tequip(target, 90)) {
    era.print(`被触手缠绕着的${name}在空中飞射着尿液…`);
  } else if (tequip(target, 44)) {
    era.print(`被五花大绑的${name}无法活动身体、就这样把尿漏出来了。`);
    if (special !== 69 || (flag40 & 64) === 0) {
      era.print('热气腾腾的尿液倒流上来、把' + name + '的身体搞脏了…');
    }
  } else if (
    special === 69 &&
    flag40 & 64 &&
    abl(target, 10) >= 3 &&
    abl(target, 17) >= 3
  ) {
    era.print(
      `在${chara_callname(player)}的命令下、${name}当场在尿布里撒尿了、`,
    );
    era.print(`${name}表情呆滞、身体颤抖着…`);
  } else if (special === 69 && flag40 & 64) {
    era.print(
      `在${chara_callname(player)}的命令下、${name}瞬间面红耳赤、当场在尿布里撒尿了…`,
    );
  } else if (
    special === 11 &&
    flag40 & 64 &&
    abl(target, 10) >= 3 &&
    abl(target, 17) >= 3
  ) {
    era.print(
      `在${chara_callname(player)}的命令下、${name}微笑着、在${clothtype_special_text(target)}里面撒尿了…`,
    );
    era.print('似乎因为被一种全新的方式欺负而愉悦着');
  } else if (special === 11 && flag40 & 64) {
    era.print(`${name}${clothtype_special_text(target)}里面撒尿了…`);
    era.print('从外边其实看不出来、但依然委屈地哭了…');
  } else if (
    flag40 & 8 &&
    abl(target, 10) >= 3 &&
    abl(target, 17) >= 3 &&
    tal(target, 28) &&
    !tequip(target, 44)
  ) {
    era.print(
      `${name}毫不犹豫、一鼓作气地在${clothtype_main2_text(target)}里面撒尿了…`,
    );
    era.print(
      `视线相交时、突然间、把${clothtype_main2_text(target)}的前面翻起来了。`,
    );
    if (flag40 & 1) era.print('内裤从里到外都尿湿了、');
    else era.print('继续滴着尿液的性器、');
    era.print('一边展示人前、一边摆着剪刀手微笑着、');
    era.print('到底在想什么啊…');
  } else if (
    (flag40 & 8 || flag40 & 16) &&
    abl(target, 10) >= 3 &&
    abl(target, 17) >= 3
  ) {
    era.print(
      `${name}毫不犹豫、一鼓作气地在${clothtype_main2_text(target)}里面撒尿了…`,
    );
  } else if (flag40 & 8 || flag40 & 16) {
    era.print(
      `${name}低下了头、默默地在${clothtype_main2_text(target)}里面撒尿了…`,
    );
  } else if (flag40 & 1 && abl(target, 10) >= 3 && abl(target, 17) >= 3) {
    era.print(`${name}表情恍惚地在内裤里撒尿了…`);
    era.print('似乎养成了一个穿着湿裤子的习惯…');
  } else if (flag40 & 1) {
    era.print(`${name}脸红耳赤地在内裤里撒尿了…`);
  } else if (
    tal(target, 57) &&
    abl(target, 10) >= 3 &&
    abl(target, 21) >= 3 &&
    tal(target, 132)
  ) {
    era.print(
      `${chara_callname(player)}把${name}的双足抱起、手指不停地拨弄着尿道口、`,
    );
    era.print(`${name}小小的身体不住颤抖、反射性地拉出尿来了…`);
  } else if (tal(target, 57) && abl(target, 10) >= 3 && abl(target, 21) >= 3) {
    era.print(`${chara_callname(player)}用指尖玩弄着${name}的尿道口、`);
    era.print(`${name}无法忍耐、反射性地拉出尿来了…`);
  } else if (
    abl(target, 10) >= 3 &&
    tal(target, 28) &&
    abl(target, 17) >= 3 &&
    tequip(target, 53)
  ) {
    era.print(`${name}被从后抱起、M字大开脚、`);
    era.print('对着摄影机、一边比划着和平手势、一边尿出来了…');
  } else if (
    abl(target, 10) >= 3 &&
    abl(target, 17) >= 3 &&
    tequip(target, 54)
  ) {
    era.print(`${name}在${chara_callname(player)}的命令下、`);
    era.print('到很多人的道路中间、双脚大开、露出阴部、');
    era.print('在路人的注视下、站着撒尿了…');
  } else if (abl(target, 10) >= 3 && abl(target, 17) >= 3) {
    let line = name;
    if (!tequip(target, 44)) line += '被从后抱起、M字大开脚、';
    line += `在${chara_callname(player)}的注视下撒尿了…`;
    era.print(line);
  } else if (tequip(target, 54)) {
    era.print(`${name}充满了羞耻和屈辱的感觉、`);
    let line = '';
    if (!tal(target, 45) && !tal(target, 310)) line += '泪眼婆娑地';
    era.print(`${line}在草丛中撒尿了…`);
  } else if (tequip(target, 57)) {
    era.print(`${name}蹲下来尿着、完全不敢看镜子里的自己…`);
  } else if (tal(target, 132)) {
    era.print(
      `${name}被${chara_callname(player)}像小孩一样提起双脚、尿出来了…`,
    );
  } else {
    era.print(`${name}羞耻得脸红耳赤、在那场合蹲下来撒尿了…`);
  }
  return 0;
});

train_message_b_family.register(87, async () => {
  const target = era_flag.target;
  const p = piercing_state.p;
  let line = `${chara_callname(era_flag.player)}将${chara_callname(target)}`;
  if (p === 1) {
    if (palam(target, 5) >= PALAMLV[4]) line += '勃起的';
    else if (abl(target, 1) >= 4) line += '敏感的';
    else if (tal(target, 132)) line += '稚嫩的';
    line += '两个乳头';
  } else if (p === 2) {
    line += '肚脐';
  } else if (p === 4) {
    if (palam(target, 5) >= PALAMLV[4]) line += '淫荡的';
    else if (abl(target, 2) >= 4) line += '敏感的';
    else if (tal(target, 132)) line += '稚嫩的';
    line += '左右阴唇';
  } else if (p === 8) {
    if (palam(target, 5) >= PALAMLV[4]) line += '勃起的';
    else if (abl(target, 0) >= 4) line += '敏感的';
    else if (tal(target, 132)) line += '小小的';
    line += tal(target, 121) || tal(target, 122) ? '阴茎' : '阴蒂';
  } else if (p === 16) {
    line += '舌尖';
  } else if (p === 32) {
    if (tal(target, 307) === 1) line += '肉感的';
    else if (tal(target, 307) === 2) line += '薄薄的';
    else if (tal(target, 307) === 3) line += '丰润的';
    line += '嘴唇';
  } else if (p === 64) {
    line += '鼻子';
  }
  era.print(line);
  const worn = era.get(`cflag:${target}:7`) || 0;
  if (worn & p) {
    await era.printAndWait('上面的环拿下来了…');
  } else {
    await era.printAndWait('上装上了环…');
  }
  return 0;
});

train_message_b_family.register(88, async () => {
  const target = era_flag.target;
  if (
    (era.get(`cflag:${target}:42`) || 0) === 11 &&
    (era.get(`cflag:${target}:40`) || 0) & 64
  ) {
    era.print(clothtype_special_text(target));
  } else {
    era.print(`${chara_callname(target)}命令`);
  }
  const beast_name = monster_name(e_get(300));
  if (tequip(target, 88)) {
    era.print(`${beast_name}退出调教…`);
  } else {
    era.print(`${beast_name}参与调教…`);
  }
  return 0;
});

train_message_b_family.register(89, async () => {
  const target = era_flag.target;
  let prefix;
  if (
    (era.get(`cflag:${target}:42`) || 0) === 11 &&
    (era.get(`cflag:${target}:40`) || 0) & 64
  ) {
    prefix = clothtype_special_text(target);
  } else {
    prefix = chara_callname(target);
  }
  if (tequip(target, 89)) {
    era.print(`${prefix}把狗叫开了…`);
  } else {
    era.print(`${prefix}把狗引过来了…`);
  }
  return 0;
});

// 90：源侧 EVENT_TRAIN_MESSAGE_B.ERB 无 SELECTCOM == 90 分支，真实无输出。
train_message_b_family.register(90, async () => 0);

// ============================================================
// @TRAIN_MESSAGE_A（80 的口内射精文案；90 的乳内射精文案；其余源侧无分支）
// ============================================================

train_message_a_family.register(80, async () => {
  const target = era_flag.target;
  const player = era_flag.player;
  const t0 = era.get('tflag:0') || 0;
  const t899 = era.get('tflag:899') || 0;
  if (t0 === 1) {
    if (t899 >= 2) {
      era.print(`紧紧抓住${chara_callname(target)}的头、在她喉咙深处射出…`);
    } else if (abl(target, 32) >= 3) {
      era.print(
        `${chara_callname(target)}带着恍惚的表情、把强行灌入喉咙的精液喝光了…`,
      );
    } else if (abl(target, 16) >= 3) {
      era.print(`${chara_callname(target)}喝掉了直接叩开喉咙强行灌进来的精液…`);
    } else {
      era.print(`紧紧抓住${chara_callname(target)}的头、在她喉咙深处射出…`);
    }
  } else if (t0 === 2) {
    if (t899 >= 2) {
      era.print(`紧紧抓住${chara_callname(target)}的头、在她喉咙深处放开精关…`);
    } else if (abl(target, 32) >= 3) {
      era.print(
        `${chara_callname(target)}带着恍惚的表情、把直接灌入喉咙的精液喝光了…`,
      );
    } else if (abl(target, 16) >= 3) {
      era.print(
        `${chara_callname(target)}被呛到、一边忍住不把喉咙里的精液咳出来、一边把它喝光了…`,
      );
    } else {
      era.print(
        `在${chara_callname(target)}喉咙深处射出的精液、从口中溢出来了…`,
      );
    }
  }
  // 未使用 player：文案不涉及调教者称呼，保留局部变量以贴合来源上下文
  void player;
  return 0;
});

train_message_a_family.register(90, async () => {
  const target = era_flag.target;
  const player = era_flag.player;
  const cflag113 = era.get(`cflag:${target}:113`) || 0;
  const t2 = era.get('tflag:2') || 0;
  if (cflag113 === 1 && t2 === 1) {
    era.print(
      `${chara_callname(player)}的肉棒在${chara_callname(target)}的乳房里激烈的颤抖着、在乳头肉穴的深处释放了精液…`,
    );
  } else if (cflag113 === 1 && t2 === 2) {
    era.print(
      '肉棒在乳房里射入了大量的精液、从乳头仅存的缝隙间、精液和母乳一齐喷了出来…',
    );
  }
  return 0;
});

for (const id of [81, 82, 83, 84, 85, 87, 88, 89]) {
  train_message_a_family.register(id, async () => 0); // 源侧无专属分支
}

// ============================================================
// 注册
// ============================================================

com_able_family.register(80, able80);
com_able_family.register(81, able81);
com_able_family.register(82, able82);
com_able_family.register(83, able83);
com_able_family.register(85, able85);
com_able_family.register(87, able87);
com_able_family.register(88, able88);
com_able_family.register(89, able89);
com_able_family.register(90, able90);

com_family.register(80, com80);
com_family.register(81, com81);
com_family.register(82, com82);
com_family.register(83, com83);
com_family.register(84, com84);
com_family.register(85, com85);
com_family.register(87, com87);
com_family.register(88, com88);
com_family.register(89, com89);
com_family.register(90, com90);

equip_com_family.register(89, equip_com89);

module.exports = {
  STUBBED_CALLS,
  able80,
  able81,
  able82,
  able83,
  able85,
  able87,
  able88,
  able89,
  able90,
  com80,
  com81,
  com82,
  com83,
  com84,
  com85,
  com87,
  com88,
  com89,
  com90,
  equip_com89,
};
