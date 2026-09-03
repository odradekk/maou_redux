/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 知的（博士型）口上 K12：存在标志一对 + @EVENTTRAIN 主体 + @K12_KOJO2 +
 *       @EVENTEND（issue #243，J33）。
 *
 * 源: target/ERB/口上/EVENT_K12_知的.ERB  @EVENTTRAIN #PRI（:67-71，存在
 *     标志 FLAG:112 = 1，口上开关补 0）@EVENTEND #LATER（:73-75，清标志）
 *     @EVENTTRAIN（:81-235，调教开始口上：CFLAG:201 状态机——初调教（0，
 *     人狼 TALENT:种族==2 分档）→ NTR 再捕获（>=1 && CFLAG:650==1）→
 *     屈服刻印 Lv1-3（各一次）→ 淫乱 → 爱慕 → 助手分支：ASSI<0 或无
 *     专属口上时 CALL K12_KOJO2（:169-170/:229-230，K12_KOJO2 真身））
 *     @K12_KOJO2（:237-310，二回目以降调教开始口上）
 *     @EVENTEND（:312-399，普通档，调教结束口上）
 *     @KOJO_MESSAGE_COM_12（:401-3537，指令口上状态机，CFLAG:301-400
 *     使用同 K3/K10 惯例）@DOG_KOJO_12（:3538-4348，兽奸专用口上，本地
 *     函数非 family 分发）@KOJO_MESSAGE_PALAMCNG_12（:4349-4550）
 *     @KOJO_MESSAGE_MARKCNG_12（:4551-4613）@SELF_KOJO_K12（:4614-4869）
 *     @DUNGEON_RYOUZYOKU_K12 起余下战斗/迷宫/死斗场/NTR/处刑/奖惩口上
 *     （:4870-5957）。
 *
 * == 头部守卫（KOJO_MESSAGE_COM_12，源 :402-426 与 K3/K10 顺序不同） ==
 *
 * 源里助手跳过守卫整行被注释（:402-405 的 `;SIF ASSI > 0 && ASSIPLAY`），
 * 1:1 不启用——与 K10 的 ASSI 守卫不同，K12 助手调教不跳过、出台词。
 * 实际生效守卫（:407-425）：① TEQUIP:45 口塞（SELECTCOM!=45）→ 跳过；
 * ② TFLAG:899 失神 → 跳过；③ TEQUIP:89 → CALL DOG_KOJO_12；④ TEQUIP:55
 * → CALL COLOSSEUM_KOJO_12。DOG_KOJO_12/COLOSSEUM_KOJO_12 是本文件内
 * 本地函数（K3 dog_kojo_3/colosseum_kojo_3 同构先例），不进 family。
 * 无 TALENT:9 崩坏守卫、无 TEQUIP:90 守卫（源如此，1:1）。
 *
 * == 状态机（CFLAG:301 起，K3/K10 同款惯例） ==
 *
 * 每条指令一个 CFLAG 计数器状态机，FLAG:7 == 2（默认）时上限旁路、每次
 * 都出声；FLAG:7 == 1 时逐阶段推进。源有 14-18 号指令的整段模板残骸
 * （:1140-1361 全注释），属未填写的模板骨架、非活代码，不落地（K11
 * SELECTCOM 17 同款判定）。爱抚等带怀孕分支（TALENT:153 && CFLAG:111==0）
 * 的指令按源 1:1 保留。
 *
 * == 原作缺陷 1:1 保留 ==
 *
 * MUSEUM_KOUJO_K12（TFLAG:500 分档）、GROTESQUE_KOUJO_K12（TFLAG:530
 * 分档）等空 PRINTFORMW 台词槽原作留空，逐条核对 target/ 后保留；
 * 死斗场 COLOSSEUM_KOJO_12 同构保留空档。
 *
 * == 跨文件调用 ==
 *
 * SELL_MATURO_K0（:4743，成熟出售口上，随售却票，K1/K3/K4/K6/K9/K10
 * 同款存根）→ stub_line；BENKI_PLAYER_NAME（:5106-5172 四处，真身
 * ere/system/train/benki.js 的 benki_player_name()，延迟 require 防
 * 顶层漏装遮蔽，K3 的延迟 require 同款先例）。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { self_call } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

const STUBBED_CALLS = ['SELL_MATURO_K0'];

// @EVENTTRAIN #PRI（:67-71）：存在标志 + 总开关补 0（同 EVENT_K.ERB 语义）
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_12 = 1; // :69 FLAG:112 = 1（K12 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :71
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:73-75）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_12 = 0; // :75
  },
  TIER.LATER,
);
/**
 * @EVENTTRAIN（:81-235，普通档）：调教开始时的口上。守卫（:83-85）：
 * FLAG:7 <= 0 跳过、TALENT:172 != 1 跳过；此后按 CFLAG:201 状态机推进：
 * 初调教（0，人狼分档）→ NTR 再捕获（>=1 && CFLAG:650==1）→ 屈服刻印
 * Lv1/2/3（各一次）→ 淫乱 → 爱慕 → 助手分支（ASSI<0 或无专属口上 →
 * CALL K12_KOJO2，真身 k12_kojo2）。
 */
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (game.kojo.口上开关 <= 0) {
    // :83-85
    return 0; // :83-85
  } // :83-85
  if (era.get(`talent:${target}:172`) != 1) {
    // :85-87
    return 0; // :85-87
  } // :85-87

  if (chara(target).kojo.初调教 == 0) {
    // :90
    era.drawLine(); // :91-92

    if (era.get(`talent:${target}:种族`) == 2) {
      // :92
      // 人狼
      await era.printAndWait(`「就表扬你一下吧。这是超出了${sc()}预想的力量」`); // :94
      await era.printAndWait(
        `「但是没用的哦。${sc()}作为自豪的人狼、还拥有最高的智能……」`,
      ); // :95
      await era.printAndWait(
        `${target_name}虽然带着清爽的表情逞强着、但轻飘飘的耳朵害怕的低了下来。`,
      ); // :96
    } else {
      // :97-98
      await era.printAndWait(`「看起来你比${sc()}更厉害呢」`); // :98
      await era.printAndWait(
        `「但${sc()}可是接受过特殊训练的。不管对我做什么都是没用的」`,
      ); // :99
      await era.printAndWait(`${target_name}表情冷淡强装镇定、声音微微发颤`); // :100
    } // :101-102
    // CFLAG:201 = 1
    chara(target).kojo.初调教 = 1; // :102
    return 1; // :103-104
  } else if (
    chara(target).kojo.初调教 >= 1 &&
    chara(target).kojo.NTR再捕获 == 1
  ) {
    // :107-108
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // :108
      era.drawLine(); // :109-110
      await era.printAndWait(
        `「对不住了呢……在其他人的身体上做了活塞运动的确是事实呢」`,
      ); // :110
      await era.printAndWait(
        `「但是从生物学上看这并没有什么问题、只是感情上的问题哦、所以原谅我吧」`,
      ); // :111
      await era.printAndWait(`${target_name}低着头小声辩解道`); // :112
      // NTRスイッチ解除
      chara(target).kojo.NTR再捕获 = 0; // :114
    } else {
      // :115-117
      era.drawLine(); // :116-117
      await era.printAndWait(`「又被抓住了呢……${sc()}的运气真不好」`); // :117
      await era.printAndWait(
        `「是要继续调教我吗？　还是当成肉便器处理？　随便你吧」`,
      ); // :118
      await era.printAndWait(`${target_name}冷冷的看着你`); // :119
      // NTRスイッチ解除
      chara(target).kojo.NTR再捕获 = 0; // :121
    } // :122-124
    return 1; // :123-124
  } else if (
    chara(target).kojo.初调教 < 2 &&
    era.get(`mark:${target}:2`) == 1
  ) {
    // :128-130
    era.drawLine(); // :129-130
    await era.printAndWait(`「看起来你的能力好像比资料上要高呢……」`); // :130
    // CFLAG:201 = 2
    chara(target).kojo.初调教 = 2; // :131
    return 1; // :132-134
  } else if (
    chara(target).kojo.初调教 < 3 &&
    era.get(`mark:${target}:2`) == 2
  ) {
    // :135-137
    era.drawLine(); // :136-137
    await era.printAndWait(`「你到底是……何方神圣、能把${sc()}逼到这种地步……」`); // :137
    // CFLAG:201 = 3
    chara(target).kojo.初调教 = 3; // :138
    return 1; // :139-141
  } else if (
    chara(target).kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :142-144
    era.drawLine(); // :143-144
    await era.printAndWait(
      `「难以置信……这样的情况、不管是数据还是资料上都从未见过呢！？」`,
    ); // :144
    // CFLAG:201 = 4
    chara(target).kojo.初调教 = 4; // :145
    return 1; // :146-148
  } else if (
    chara(target).kojo.初调教 < 5 &&
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :149-151
    era.drawLine(); // :150-151
    await era.printAndWait(
      `「竟然还存在着如此美妙的新世界……让${sc()}更多地对此进行研究吧、拜托了！」`,
    ); // :151
    await era.printAndWait(
      `「想尝试一下、${sc()}的身体能淫靡化到什么地步……已经、睡不着了！」`,
    ); // :152
    await era.printAndWait(`${target_name}一边流着口水一边用腰蹭着你的腿`); // :153
    await era.printAndWait(`她的脑海中已经填满了对性知识的渴求了……`); // :154
    // CFLAG:201 = 5
    chara(target).kojo.初调教 = 5; // :155
    return 1; // :156-158
  } else if (
    chara(target).kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) == 1
  ) {
    // :159-161
    era.drawLine(); // :160-161
    await era.printAndWait(
      `「竟然还存在着如此美妙的新世界……拜托了！　让我和你一起来研究吧」`,
    ); // :161
    await era.printAndWait(
      `「魔界的动植物和文化、魔法……全都是我还不懂的东西呢」`,
    ); // :162
    await era.printAndWait(
      `进入房间的${target_name}正专心致志地在笔记本上写着什么`,
    ); // :163
    await era.printAndWait(`完全被魔之知识迷住了的样子……`); // :164
    // CFLAG:201 = 6
    chara(target).kojo.初调教 = 6; // :165
    return 1; // :166-168
  } else if (era_flag.assi < 0) {
    // :169-170
    await k12_kojo2(); // :170 CALL K12_KOJO2
  } else {
    // :229-230
    await k12_kojo2(); // :230 CALL K12_KOJO2（无专属助手口上，二回目以降）
  } // :231-234
});

/**
 * @K12_KOJO2（:237-310）：二回目以降的调教开始口上。按反抗刻印 Lv3 /
 * 屈服刻印 Lv0-3（爱/淫乱无）/ 淫乱 / 爱慕（淫乱与爱慕各含 RAND 三选一
 * + 人狼分档）取首个命中。
 * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省均匀随机）
 * @returns {Promise<number>} 0/1（调用方不读返回值，K3/K10 同款）
 */
async function k12_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    // :239
    era.drawLine(); // :240-241
    await era.printAndWait(`「不要再进入我的视线里……我很不高兴」`); // :241
    return 1; // :242-244
  } else if (era.get(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    // :245-247
    era.drawLine(); // :246-247
    await era.printAndWait(
      `「根据${sc()}的计算、即使是你的力量也无法让${sc()}屈服哦」`,
    ); // :247
    return 1; // :248-250
  } else if (era.get(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    // :251-253
    era.drawLine(); // :252-253
    await era.printAndWait(`「不管你使出什么手段、都在我计算之中！」`); // :253
    return 1; // :254-256
  } else if (era.get(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    // :257-259
    era.drawLine(); // :258-259
    await era.printAndWait(`「噫、好卑鄙……居然这样对待${sc()}……」`); // :259
    return 1; // :260-262
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    // :263-265
    era.drawLine(); // :264-265
    await era.printAndWait(`「我知道了、就按你说的做……是${sc()}输了」`); // :265
    return 1; // :266-268
  } else if (era.get(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    // :269-271
    era.drawLine(); // :270-271

    if (rand_n(3) == 0) {
      // :272
      await era.printAndWait(`「今天要研究什么Play呢、好期待啊♪」`); // :273
    } else if (rand_n(2) == 0) {
      // :274-275
      await era.printAndWait(`「再多多开发${sc()}的身体嘛、还完全不够呢」`); // :275
    } else {
      // :276-277
      await era.printAndWait(
        `「今天也被开发了一番呢、好开心啊、真想再提升一下敏感度呢」`,
      ); // :277
    } // :278-279
    if (era.get(`talent:${target}:种族`) == 2) {
      // :279
      // 人狼
      await era.printAndWait(
        `${target_name}像狗一样伸出舌头，吐出慌乱的吐息迎接了出来。`,
      ); // :281
    } else {
      // :282-283
      await era.printAndWait(
        `${target_name}从研究中的桌子旁站了起来，迎了出来。`,
      ); // :283
    } // :284-287
    return 1; // :285-287
  } else if (era.get(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    // :288-290
    era.drawLine(); // :289-290

    if (rand_n(3) == 0) {
      // :291
      await era.printAndWait(
        `「呵呵、你来了啊……正好是我研究的有些疲劳的时候呢」`,
      ); // :292
    } else if (rand_n(2) == 0) {
      // :293-294
      await era.printAndWait(`「今天的研究进展很大。好想被表扬呢」`); // :294
    } else {
      // :295-296
      await era.printAndWait(
        `「啊、已经到休憩的时间了？　饶了我吧……和你做对手的话不是反而会更累吗」`,
      ); // :296
    } // :297-298
    if (era.get(`talent:${target}:种族`) == 2) {
      // :298
      // 人狼
      await era.printAndWait(
        `${target_name}轻飘飘的尾巴像摇出了残影一样摆动着迎了出来。`,
      ); // :300
    } else {
      // :301-302
      await era.printAndWait(
        `${target_name}从研究中的桌子旁站了起来，迎了出来。`,
      ); // :302
    } // :303-308
    return 1; // :304-308
  } // :305-308
  return 0; // :306-308
}

/**
 * @EVENTEND（:312-399，普通档）：调教结束时的口上。死亡跳过（BASE:0<=0），
 * 随后按反抗刻印 Lv3 / 屈服刻印 Lv0-3（爱无）/ 淫乱（体力 500 上下）/
 * 爱慕（体力 500 上下）取首个命中。
 */
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%

  if (game.kojo.口上开关 <= 0) {
    // :314-315
    return 0; // :314-315
  } // :314-315
  if (era.get(`talent:${target}:172`) != 1) {
    // :316-318
    return 0; // :316-318
  } // :316-318

  if (era.get(`base:${target}:0`) <= 0) {
    // :320-322
    return 0; // :320-322
  } // :320-322

  if (era.get(`mark:${target}:3`) == 3 && era.get(`talent:${target}:85`) == 0) {
    // :326
    era.drawLine(); // :327-328
    await era.printAndWait(`「真是无聊的时光呢」`); // :328
    return 1; // :329-331
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :332-334
    era.drawLine(); // :333-334
    await era.printAndWait(`「已经结束了吗、这种程度、在我的预料之内呢」`); // :334
    return 1; // :335-337
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :338-340
    era.drawLine(); // :339-340
    await era.printAndWait(`「原来如此、和资料上一样呢……果然、好累」`); // :340
    return 1; // :341-343
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0
  ) {
    // :344-346
    era.drawLine(); // :345-346
    await era.printAndWait(`「结束了吗……体力值还挺高的嘛」`); // :346
    return 1; // :347-349
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // :350-352
    era.drawLine(); // :351-352
    await era.printAndWait(`「怎么这样就停了、再多多开发${sc()}淫乱的身体吧」`); // :352
    if (era.get(`talent:${target}:种族`) == 2) {
      // :353
      // 人狼
      await era.printAndWait(
        `${target_name}软绵绵的耳朵立了起来，好像很不满。`,
      ); // :355
    } else {
      // :356-357
      await era.printAndWait(`${target_name}鼓着脸颊，好像很不满。`); // :357
    } // :358-360
    return 1; // :359-360
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // :361-363
    era.drawLine(); // :362-363
    await era.printAndWait(
      `「${sc()}身体的耐久极限……差不多就是这样吗、哈～哈～」`,
    ); // :363
    if (era.get(`talent:${target}:种族`) == 2) {
      // :364
      // 人狼
      await era.printAndWait(`${target_name}像狗一样伸出舌头，混乱的喘息着。`); // :366
    } else {
      // :367-368
      await era.printAndWait(`${target_name}就那样倒在床上，不停地喘着粗气。`); // :368
    } // :369-372
    return 1; // :370-372
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // :373-375
    era.drawLine(); // :374-375
    await era.printAndWait(`「哎呀、研究不能继续了呢。很开心哦、与你的幽会」`); // :375
    if (era.get(`talent:${target}:种族`) == 2) {
      // :376
      // 人狼
      await era.printAndWait(
        `背向这边的${target_name}软绵绵的尾巴呼噜呼噜的左右摇动着。`,
      ); // :378
    } else {
      // :379-380
      await era.printAndWait(
        `${target_name}就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。`,
      ); // :380
    } // :381-383
    return 1; // :382-383
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // :384-386
    era.drawLine(); // :385-386
    await era.printAndWait(
      `「果然、这种程度的体力消耗、是对研究的一大障碍呢……」`,
    ); // :386
    if (era.get(`talent:${target}:种族`) == 2) {
      // :387
      // 人狼
      await era.printAndWait(
        `${target_name}打了一个哈欠、用像狗一样团起来的姿势打起了瞌睡。`,
      ); // :389
    } else {
      // :390-391
      await era.printAndWait(
        `${target_name}就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。`,
      ); // :391
    } // :392-397
    return 1; // :393-397
  } // :394-397
  return 0; // :395-397
});

/**
 * @KOJO_MESSAGE_COM_12（:401-3537，指令口上状态机）：SELECTCOM 指令台词，
 * CFLAG:301 起的计数器（kojo.<字段>）。守卫（:402-426 与 K3/K10 顺序
 * 不同）：助手跳过守卫整行被注释（1:1 不启用，K12 助手调教不跳过）；
 * 实际生效：① TEQUIP:45 口塞（SELECTCOM!=45）→ 跳过；② TFLAG:899
 * 失神 → 跳过；③ TEQUIP:89 → DOG_KOJO_12 真身；④ TEQUIP:55 →
 * COLOSSEUM_KOJO_12 真身。无崩坏/触手守卫（源如此，1:1）。
 *
 * @param {(n: number) => number} [rand] RAND:N 的随机源（缺省均匀随机）
 * @returns {Promise<number>} 0（TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_12(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const kojo = chara(target).kojo;
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
  // %阴核(TARGET)%（魔改新增/文本校正.ERB @阴核，K0 kojo-k0-tender.js:5484 同款）：
  // TALENT:122 则「阴茎」否则「阴核」
  const clitoris_word = (cid) =>
    (era.get(`talent:${cid}:122`) || 0) !== 0 ? '阴茎' : '阴核';

  // :404-406 助手跳过守卫整行注释（1:1 不启用）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    // :407-408
    return 0; // :407-408
  } // :407-408

  if (game.train.失神) {
    // :410-411
    return 0; // :410-411
  } // :410-411

  if (era.get(`tequip:${target}:89`)) {
    // :412-415
    stub_line('DOG_KOJO_12', '兽奸调教中的专用口上');
    return 0; // :414-416
  } // :415-416

  if (era.get(`tequip:${target}:55`)) {
    // :417-420
    stub_line('COLOSSEUM_KOJO_12', '死斗场调教中的专用口上');
    return 0; // :419-422
  } // :420-422

  if (era_flag.selectcom == 0) {
    // :428

    if (kojo.爱抚 == 0) {
      // :430

      if (mark(2) >= 2) {
        // :432
        await era.printAndWait(
          `「你知道这个理论吗？　一开始要先抚摸女性的肌肤呢」`,
        ); // :433
      } else {
        // :435-436
        await era.printAndWait(`「哼、真无聊呢。跟教科书一样的步骤呢」`); // :436
      } // :437-438
      // CFLAG:301 = 1
      kojo.爱抚 = 1; // :438
      return 0; // :439-440
    } else if (
      era.get(`talent:${target}:153`) &&
      chara(target).event.孩子父亲 == 0
    ) {
      // :441 怀孕（主人之子，CFLAG:111==0）特例
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :443
        await era.printAndWait(`「孩子还在里面看着呢。还请温柔点哦」`); // :444
        if (era.get(`talent:${target}:种族`) == 2) {
          // :445
          // 人狼
          await era.printAndWait(
            `「如果是像${sc()}一样活泼可爱的孩子就好啦♪」`,
          ); // :447
        } // :448-449
        // CFLAG:301 = 6
        kojo.爱抚 = 6; // :449
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :451
        await era.printAndWait(`「又长大了呢、好想快点生下来啊♪」`); // :452
        if (era.get(`talent:${target}:种族`) == 2) {
          // :453
          // 人狼
          await era.printAndWait(
            `「嗯……就这么抚摸${sc()}的头。叨着『谢谢你怀上孩子哦』」`,
          ); // :455
        } else {
          // :456-457
          await era.printAndWait(
            `「嗯……${sc()}好想多做做脚部按摩啊。挺着大肚子可累了」`,
          ); // :457
        } // :458-459
        // CFLAG:301 = 5
        kojo.爱抚 = 5; // :459
      } else if (mark(2) == 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)) {
        // :461
        await era.printAndWait(
          `「老用这种方式来抚摸、要忍受这种待遇的……可是你的孩子啊。就不能更小心翼翼一些吗？」`,
        ); // :462
        // CFLAG:301 = 4
        kojo.爱抚 = 4; // :463
      } else if (mark(2) == 2 && (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)) {
        // :465
        await era.printAndWait(`「嗯、咕……别、别摸了啦……」`); // :466
        // CFLAG:301 = 3
        kojo.爱抚 = 3; // :467
      } else if (mark(2) <= 1 && (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)) {
        // :469
        await era.printAndWait(`「就算怀上了你的孩子……也别想让${sc()}动心」`); // :470
        // CFLAG:301 = 2
        kojo.爱抚 = 2; // :471
      } // :472-474
      return 0; // :473-474
    } else {
      // :475-476
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :477
        await era.printAndWait(
          `「不要再挑逗我了……明明知道单是这样子已经无法满足我了」`,
        ); // :478
        if (era.get(`talent:${target}:种族`) == 2) {
          // :479
          // 人狼
          await era.printAndWait(
            `「知道${sc()}感觉舒服的地方吗？　想让你抚摸喉咙呢♪」`,
          ); // :481
        } // :482-483
        // CFLAG:301 = 6
        kojo.爱抚 = 6; // :483
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :485
        await era.printAndWait(`「最近很疲劳呢。谢谢你为我按摩」`); // :486
        if (era.get(`talent:${target}:种族`) == 2) {
          // :487
          // 人狼
          await era.printAndWait(
            `「嗯……多按摩一下${sc()}的脚吧。散步有些累了」`,
          ); // :489
        } else {
          // :490-491
          await era.printAndWait(
            `「嗯……多按摩一下${sc()}的腰吧。在桌子边坐得有些累了」`,
          ); // :491
        } // :492-493
        // CFLAG:301 = 5
        kojo.爱抚 = 5; // :493
      } else if (mark(2) == 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)) {
        // :495
        await era.printAndWait(
          `「只是被你的手摸着、就想向你屈服了呢……看来${sc()}的计算错误了呢」`,
        ); // :496
        // CFLAG:301 = 4
        kojo.爱抚 = 4; // :497
      } else if (mark(2) == 2 && (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)) {
        // :499
        await era.printAndWait(`「嗯、唔～……继、继续吧……」`); // :500
        // CFLAG:301 = 3
        kojo.爱抚 = 3; // :501
      } else if (mark(2) <= 1 && (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)) {
        // :503
        await era.printAndWait(
          `「这种程度全在预料之中呢。${sc()}的心是不会动摇的」`,
        ); // :504
        // CFLAG:301 = 2
        kojo.爱抚 = 2; // :505
      } // :506-511
      return 0; // :507-511
    } // :508-511
  } // :509-511

  if (era_flag.selectcom == 1) {
    // :514
    if (kojo.舔阴 == 0) {
      // :516
      if (era.get(`talent:${target}:0`) == 1) {
        // :518
        await era.printAndWait(`「哼、性器没被男人碰过真是对不住呢……」`); // :519
      } else {
        // :521-522
        await era.printAndWait(
          `「喂、不要舔性器！　再怎么说那也是排泄器官！」`,
        ); // :522
      } // :523-524
      // CFLAG:302 = 1
      kojo.舔阴 = 1; // :524
      return 0; // :525-526
    } else {
      // :527-528
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :529
        await era.printAndWait(`「再用力点吸吸淫核……呵呵、勃起来了吧？」`); // :530
        // CFLAG:302 = 5
        kojo.舔阴 = 5; // :531
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :533
        await era.printAndWait(`「我可以一边看书吗？　这样会轻松点……」`); // :534
        // CFLAG:302 = 4
        kojo.舔阴 = 4; // :535
      } else if (mark(2) == 3 && (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)) {
        // :537
        await era.printAndWait(
          `「喜欢的话就随便舔吧。${sc()}已经不会再反抗了……」`,
        ); // :538
        // CFLAG:302 = 3
        kojo.舔阴 = 3; // :539
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :541
        await era.printAndWait(`「住、住手！　那里的粘膜很敏感啊！」`); // :542
        // CFLAG:302 = 2
        kojo.舔阴 = 2; // :543
      } // :544-549
      return 0; // :545-549
    } // :546-549
  } // :547-549

  if (era_flag.selectcom == 2) {
    // :552
    if (kojo.肛门爱抚 == 0) {
      // :554
      await era.printAndWait(`「这是在做肛交的准备吗、变态」`); // :555
      // CFLAG:TARGET:303 = 1
      kojo.肛门爱抚 = 1; // :556
      return 0; // :557-558
    } else {
      // :559-560
      const P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0); // :560 PALAM:3 + UP:3

      if (
        era.get(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :562
        await era.printAndWait(
          `「啊啊～、已经做好肛交的准备了哦！　排泄……不、已经变成性器啦♪」`,
        ); // :563
        // CFLAG:303 = 7
        kojo.肛门爱抚 = 7; // :564
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :566
        await era.printAndWait(`「抱歉、还很紧……最好、再润滑一下呢」`); // :567
        // CFLAG:303 = 6
        kojo.肛门爱抚 = 6; // :568
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :570
        await era.printAndWait(
          `「怎么样、${sc()}的第二性器……这样一来就能肛交了呢♪」`,
        ); // :571
        // CFLAG:303 = 5
        kojo.肛门爱抚 = 5; // :572
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :574
        await era.printAndWait(`「你、能让我再湿一点吗……里面还没放松下来呢」`); // :575
        // CFLAG:303 = 4
        kojo.肛门爱抚 = 4; // :576
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :578
        await era.printAndWait(
          `「咕呜～、不行啊……这么湿漉漉下去的话……性器、会变成性器的啊……」`,
        ); // :579
        // CFLAG:303 = 3
        kojo.肛门爱抚 = 3; // :580
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        // :582
        await era.printAndWait(
          `「不管再怎么玩弄排泄器官、都不会有什么快感的」`,
        ); // :583
        // CFLAG:303 = 2
        kojo.肛门爱抚 = 2; // :584
      } // :585-590
      return 0; // :586-590
    } // :587-590
  } // :588-590

  if (era_flag.selectcom == 3) {
    // :593

    if (kojo.自慰 == 0) {
      // :595
      await era.printAndWait(`「自慰什么的谁都有过吧。诶、让${sc()}来……」`); // :596
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :597
      kojo.自慰 = 1; // :597
      return 0; // :598-599
    } else {
      // :600-601

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :602
        await era.printAndWait(
          `「没有被男人碰过的这个小穴、会疼也是没办法的……什么时候都可以给你哦」`,
        ); // :603
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :604
        kojo.自慰 = 9; // :604
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :606

        if (rand_n(4) == 0) {
          // :608
          await era.printAndWait(
            `「${sc()}的痴态、没有被记录下来吗……？　想作为下次自慰的参考呢」`,
          ); // :609
        } else if (rand_n(3) == 0) {
          // :610
          await era.printAndWait(
            `「猴子……要变成猴子了！　变成自慰猴子了啊！」`,
          ); // :611
        } else if (rand_n(2) == 0) {
          // :612
          await era.printAndWait(
            `「看吧……像猴子一样玩弄${clitoris_word(target)}的${sc()}的姿态……！」`,
          ); // :613
        } else {
          // :614-615
          await era.printAndWait(
            `「啊～、啊～、去了、去了、去了……像猴子一样揉着阴部去了啊」`,
          ); // :615
        } // :616-617
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :617
        kojo.自慰 = 8; // :617
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :619

        if (rand_n(2) == 0) {
          // :621
          await era.printAndWait(`「${sc()}对自慰已经很擅长了！」`); // :622
        } else {
          // :623-624
          await era.printAndWait(`「这个身体已经快要研究透了呢」`); // :624
        } // :625-626
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :626
        kojo.自慰 = 7; // :626
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :628
        await era.printAndWait(`「请看、想吞下你阴茎的性器躁动得没办法了呢」`); // :629
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :630
        kojo.自慰 = 6; // :630
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :632

        if (rand_n(3) == 0) {
          // :634
          await era.printAndWait(`「来吧……拜托了、都一边自慰一边求你了啊」`); // :635
        } else if (rand_n(2) == 0) {
          // :636
          await era.printAndWait(
            `「因为实在太想你了、${clitoris_word(target)}好像都快磨破了呢」`,
          ); // :637
        } else {
          // :638-639
          await era.printAndWait(
            `「已经习惯了呢、${clitoris_word(target)}已经元气十足地勃起来了哦」`,
          ); // :639
        } // :640-641
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :641
        kojo.自慰 = 5; // :641
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :643

        if (rand_n(2) == 0) {
          // :645
          await era.printAndWait(
            `「自慰什么的很正常啊。研究的间隙也会想去做呢」`,
          ); // :646
        } else {
          // :647-648
          await era.printAndWait(`「嘿欸、你还有这样的癖好呢」`); // :648
        } // :649-650
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :650
        kojo.自慰 = 4; // :650
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :652

        if (rand_n(2) == 0) {
          // :654
          await era.printAndWait(`「啊～、啊～……好爽～……」`); // :655
        } else {
          // :656-657
          await era.printAndWait(
            `「自慰过度${clitoris_word(target)}可能会肥大化的……」`,
          ); // :657
        } // :658-659
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :659
        kojo.自慰 = 3; // :659
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :661

        if (rand_n(2) == 0) {
          // :663
          await era.printAndWait(`「无意义的行为呢……白白浪费脑细胞」`); // :664
        } else {
          // :665-666
          await era.printAndWait(`「没有收益的行为呢、没有意义」`); // :666
        } // :667-668
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :668
        kojo.自慰 = 2; // :668
      } // :669-674
      return 0; // :670-674
    } // :671-674
  } // :672-674

  if (era_flag.selectcom == 5) {
    // :677

    if (kojo.胸爱抚 == 0) {
      // :679

      if (era.get(`talent:${target}:85`) == 1) {
        // :681
        await era.printAndWait(`「这么喜欢胸部……你是小孩子吗」`); // :682
      } else {
        // :684-685
        await era.printAndWait(`「一般意义上说乳头并不是性感带哦」`); // :685
      } // :686-687
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :687
      kojo.胸爱抚 = 1; // :687
      return 0; // :688-689
    } else {
      // :690-691

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :692
        if (rand_n(2) == 0) {
          // :693
          await era.printAndWait(`「连胸部也成性器了你打算怎么样嘛♪」`); // :694
        } else {
          // :695-696
          await era.printAndWait(`「呵呵、发生幼儿退化现象了吗……？」`); // :696
        } // :697-698
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :698
        kojo.胸爱抚 = 5; // :698
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :700
        if (rand_n(2) == 0) {
          // :701
          await era.printAndWait(`「胸部已经完全被开发好了呢。都是你的错呢」`); // :702
        } else {
          // :703-704
          await era.printAndWait(`「这就是、母性萌发的现象吗……」`); // :704
        } // :705-706
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :706
        kojo.胸爱抚 = 4; // :706
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :708
        await era.printAndWait(`「胸部……乳头好有感觉啊～！」`); // :709
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :710
        kojo.胸爱抚 = 3; // :710
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :712
        await era.printAndWait(`「果然呢、胸部一点感觉都没有」`); // :713
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :714
        kojo.胸爱抚 = 2; // :714
      } // :715-720
      return 0; // :716-720
    } // :717-720
  } // :718-720

  if (era_flag.selectcom == 6) {
    // :723

    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :725

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        // :727
        await era.printAndWait(
          `「初吻什么的、感伤的感情是不必要的……不过还不错」`,
        ); // :728
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        // :730
        await era.printAndWait(`「今天是和你的纪念日呢♪」`); // :731
      } else {
        // :733-734
        await era.printAndWait(`「初吻什么的、带上感情是无意义的」`); // :734
      } // :735-736
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :736
      kojo.接吻 = 1; // :736
      return 0; // :737-738
    } else if (kojo.接吻 == 0) {
      // :739

      if (era.get(`talent:${target}:76`) == 1) {
        // :741
        await era.printAndWait(
          `「通过唾液交换来做性爱的相性确认……你合格了哦♪」`,
        ); // :742
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :744
        await era.printAndWait(`「终于可以和你做唾液交换了呢♪」`); // :745
      } else {
        // :747-748
        await era.printAndWait(`「既没有气氛也没有技巧……0分呢」`); // :748
      } // :749-750
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :750
      kojo.接吻 = 1; // :750
      return 0; // :751-752
    } else {
      // :753-754

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :755
        await era.printAndWait(`「更多的交换唾液吧……你的体液、想要更多」`); // :756
        if (era.get(`talent:${target}:种族`) == 2) {
          // :757

          await era.printAndWait(
            `${target_name}虽然闭着眼、但耳朵却立了起来bikobiko的动着。`,
          ); // :759
        } // :760-761
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :761
        kojo.接吻 = 5; // :761
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :763
        await era.printAndWait(`「把你的全部……都给${sc()}吧」`); // :764
        if (era.get(`talent:${target}:种族`) == 2) {
          // :765

          await era.printAndWait(
            `${target_name}虽然闭着眼、但耳朵却立了起来bikobiko的动着。`,
          ); // :767
        } // :768-769
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :769
        kojo.接吻 = 4; // :769
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :771
        await era.printAndWait(`「好吧、体液交换这种程度的事情没有问题」`); // :772
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :773
        kojo.接吻 = 3; // :773
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :775
        await era.printAndWait(`「呜～……你、在磨牙吗？」`); // :776
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :777
        kojo.接吻 = 2; // :777
      } // :778-783
      return 0; // :779-783
    } // :780-783
  } // :781-783

  return 0;
}

module.exports = {
  k12_kojo2,
  kojo_message_com_12,
  STUBBED_CALLS,
};
