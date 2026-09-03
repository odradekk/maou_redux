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
const { heart, self_call } = require('#/kojo/kojo-text');
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
  const player = era_flag.player;
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

  if (era_flag.selectcom == 7) {
    // :786

    if (kojo.自己扒开 == 0) {
      // :788

      if (era.get(`talent:${target}:76`) == 1) {
        // :790
        await era.printAndWait(
          `「${sc()}的大受欢迎的地方、想被更多的看着呢♪」`,
        ); // :791
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :793
        await era.printAndWait(`「不对${sc()}的重要的地方、来个素描吗？」`); // :794
      } else {
        // :796-797
        await era.printAndWait(`「唔～、做出如此羞人的姿势什么的……」`); // :797
      } // :798-799
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :799
      kojo.自己扒开 = 1; // :799
      return 0; // :800-801
    } else {
      // :802-803

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :804
        await era.printAndWait(
          `「怎么样、${sc()}性器的开发情况……♪　想让阴核变的多大呢？」`,
        ); // :805
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :806
        kojo.胸爱抚 = 5; // :806
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :808
        await era.printAndWait(
          `「今天也做了记录呢。来展示一下${sc()}的性器发生了什么样的变化吧」`,
        ); // :809
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :810
        kojo.胸爱抚 = 4; // :810
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :812
        await era.printAndWait(`「唔……这可真是、羞耻心都被引出来了……呐」`); // :813
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :814
        kojo.胸爱抚 = 3; // :814
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :816
        await era.printAndWait(
          `「被迫作出这种屈辱的姿势……但${sc()}不得不屈服呢」`,
        ); // :817
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :818
        kojo.胸爱抚 = 2; // :818
      } // :819-824
      return 0; // :820-824
    } // :821-824
  } // :822-824

  if (era_flag.selectcom == 8) {
    // :827

    if (kojo.插入手指 == 0) {
      // :829

      if (era.get(`talent:${target}:76`) == 1) {
        // :831
        await era.printAndWait(`「你的指功究竟如何呢？　很期待呢」`); // :832
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        // :834
        await era.printAndWait(`「想通过你的手、来做个彻底的放松呢」`); // :835
      } else {
        // :837-838
        await era.printAndWait(`「手指伸进去的地方……只会感到恶心呢」`); // :838
      } // :839-840
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :840
      kojo.插入手指 = 1; // :840
      return 0; // :841-842
    } else {
      // :843-844

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :845
        await era.printAndWait(
          `「里面想更多地被来回搅动呢、呼～……咕～、真不错呢」`,
        ); // :846
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :847
        kojo.插入手指 = 5; // :847
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :849
        await era.printAndWait(
          `「你的手……体贴入微的、一直在${sc()}很舒服的地方进攻着呢……♪」`,
        ); // :850
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :851
        kojo.插入手指 = 4; // :851
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :853
        await era.printAndWait(`「咕～……阴道、起反应了……」`); // :854
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :855
        kojo.插入手指 = 3; // :855
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        // :857
        await era.printAndWait(`「额……好恶心……」`); // :858
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :859
        kojo.插入手指 = 2; // :859
      } // :860-865
      return 0; // :861-865
    } // :862-865
  } // :863-865

  if (era_flag.selectcom == 9) {
    // :868

    if (kojo.舔肛 == 0) {
      // :870

      if (era.get(`talent:${target}:76`) == 1) {
        // :872
        await era.printAndWait(`「想舔排泄器官吗……真是变态♪」`); // :873
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :875
        await era.printAndWait(`「那个地方细菌很多呢……真的可以吗」`); // :876
      } else {
        // :878-879
        await era.printAndWait(`「呀啊啊、住手！！」`); // :879
      } // :880-881
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :881
      kojo.舔肛 = 1; // :881
      return 0; // :882-883
    } else {
      // :884-885

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :886
        await era.printAndWait(
          `「${sc()}的肛门、被竖着分开了呢……？　想被更多的好好舔舐呢♪」`,
        ); // :887
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :888
        kojo.舔肛 = 5; // :888
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :890
        await era.printAndWait(`「被舔着排泄器官……也还不坏嘛♪」`); // :891
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :892
        kojo.舔肛 = 4; // :892
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :894
        await era.printAndWait(`「咕～、随便你吧……要舔排泄器官也行……嗯啊～」`); // :895
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :896
        kojo.舔肛 = 3; // :896
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :898
        await era.printAndWait(`「尽做些傻事呢……嗯～」`); // :899
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :900
        kojo.舔肛 = 2; // :900
      } // :901-906
      return 0; // :902-906
    } // :903-906
  } // :904-906

  if (era_flag.selectcom == 10) {
    // :909

    if (kojo.振动宝石 == 0) {
      // :911

      if (era.get(`talent:${target}:76`) == 1) {
        // :913
        await era.printAndWait(`「有趣的道具呢、快点使用吧♪」`); // :914
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        // :916
        await era.printAndWait(`「这道具还挺有意思的呢……真的」`); // :917
      } else {
        // :919-920
        await era.printAndWait(`「这、这嗡嗡震动的玩意儿是什么啊！？」`); // :920
      } // :921-922
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :922
      kojo.振动宝石 = 1; // :922
      return 0; // :923-924
    } else {
      // :925-926

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :927
        await era.printAndWait(`「啊啊啊……淫核好麻……不错嘛、这个～」`); // :928
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :929
        kojo.振动宝石 = 5; // :929
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :931
        await era.printAndWait(`「呼～……咕～、身体……放松下来了呢」`); // :932
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :933
        kojo.振动宝石 = 4; // :933
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :935
        await era.printAndWait(
          `「道具的性能已经清楚了……但是、可以不把这个按在阴核上吗」`,
        ); // :936
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :937
        kojo.振动宝石 = 3; // :937
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        // :939
        await era.printAndWait(
          `「跟往常一样……嗡嗡的震动着呢。真想看看开发者是长什么样的呢」`,
        ); // :940
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :941
        kojo.振动宝石 = 2; // :941
      } // :942-947
      return 0; // :943-947
    } // :944-947
  } // :945-947

  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) {
    // :951

    if (kojo.壶虫 == 0) {
      // :953

      if (era.get(`talent:${target}:0`) == 1) {
        // :955

        if (era.get(`talent:${target}:76`) == 1) {
          // :957
          await era.printAndWait(
            `「原来如此、将寄生虫家畜化吗。有意思……对于献出处女来说是个不错的研究对象呢♪」`,
          ); // :958
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :960
          await era.printAndWait(
            `「比起这种寄生虫变异体来说、还是更想被你夺走处女呢」`,
          ); // :961
        } else {
          // :963-964
          await era.printAndWait(
            `「呜～、寄生虫的变异体吗……哼、才不可惜处女什么的呢……」`,
          ); // :964
          await era.printAndWait(
            `虽然嘴上这么说着、${target_name}的腰还是颤抖不已`,
          ); // :965
        } // :966-967
      } else {
        // :968-969

        if (era.get(`talent:${target}:76`) == 1) {
          // :970
          await era.printAndWait(
            `「原来如此、将寄生虫家畜化吗。有意思……真想快点放进阴道品尝一下滋味呢♪」`,
          ); // :971
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :973
          await era.printAndWait(
            `「寄生虫的变异体吗。交给我吧。用${sc()}的阴道来试试看吧」`,
          ); // :974
        } else {
          // :976-977
          await era.printAndWait(`「呜～、寄生虫的变异体吗……无耻！」`); // :977
        } // :978-980
      } // :979-980
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :980
      kojo.壶虫 = 1; // :980
      return 0; // :981-982
    } else {
      // :983-984

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :985
        if (era.get(`talent:${target}:190`) == 1) {
          // :986

          await era.printAndWait(
            `「这就是壶虫的寄生状态吗……嗯～、每次产卵、都会摩擦阴道……♪　要对这个着迷了呢」`,
          ); // :988
        } else {
          // :989-990
          await era.printAndWait(
            `「确认壶虫已进入……嗯～、摩擦着阴道……好舒服♪」`,
          ); // :990
        } // :991-992
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :992
        kojo.壶虫 = 5; // :992
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :994
        if (era.get(`talent:${target}:190`) == 1) {
          // :995

          await era.printAndWait(
            `「壶虫寄生状态有影响敏感度的效果……嗯～、真有意思」`,
          ); // :997
        } else {
          // :998-999
          await era.printAndWait(`「壶虫的触手吗……都伸到子宫口了呢……嗯～」`); // :999
        } // :1000-1001
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1001
        kojo.壶虫 = 4; // :1001
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1003
        await era.printAndWait(
          `「区区寄生生物、${sc()}是不会输的。被这种下等生物……」`,
        ); // :1004
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1005
        kojo.壶虫 = 3; // :1005
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1007
        await era.printAndWait(`「你不借助这种下等生物之手就不行吗？」`); // :1008
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1009
        kojo.壶虫 = 2; // :1009
      } // :1010-1013
      return 0; // :1011-1013
    } // :1012-1013
  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) {
    // :1014

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1016
      await era.printAndWait(`「实验已经结束了吗？　再多蹂躙一会儿也可以哦」`); // :1017
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1018
      kojo.壶虫着脱 = 3; // :1018
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1020
      await era.printAndWait(`「……真有意思呢。下次再研究看看吧」`); // :1021
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1022
      kojo.壶虫着脱 = 2; // :1022
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1024
      await era.printAndWait(`「……快点把这恶心的寄生生物丢回培养槽里去啊～」`); // :1025
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1026
      kojo.壶虫着脱 = 1; // :1026
    } // :1027-1031
    return 0; // :1028-1031
  } // :1029-1031

  if (era_flag.selectcom == 12) {
    // :1034

    if (kojo.振动杖 == 0) {
      // :1036

      if (era.get(`talent:${target}:76`) == 1) {
        // :1038
        await era.printAndWait(`「有趣的道具呢！　动力有多少？」`); // :1039
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1041
        await era.printAndWait(`「这个是……什么用途的道具呢？　淫具……吗？」`); // :1042
      } else {
        // :1044-1045
        await era.printAndWait(`「哼、拿着这种道具到底意欲何为？」`); // :1045
      } // :1046-1047
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1047
      kojo.振动杖 = 1; // :1047
      return 0; // :1048-1049
    } else {
      // :1050-1051

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1052
        await era.printAndWait(`「啊啊啊……好棒、发麻了……下次借给我吧……♪」`); // :1053
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1054
        kojo.振动杖 = 5; // :1054
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1056
        await era.printAndWait(`「研究疲劳的时候使用……有不错的保健效果呢」`); // :1057
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1058
        kojo.振动杖 = 4; // :1058
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1060
        await era.printAndWait(`「咕～、机械的振动……一直传到腰骨上了……嗯」`); // :1061
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1062
        kojo.振动杖 = 3; // :1062
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        // :1064
        await era.printAndWait(
          `「这种程度的、脑内物质分泌……对我没有效果呢……嗯」`,
        ); // :1065
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1066
        kojo.振动杖 = 2; // :1066
      } // :1067-1072
      return 0; // :1068-1072
    } // :1069-1072
  } // :1070-1072

  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) {
    // :1076

    if (kojo.肛门虫 == 0) {
      // :1078

      if (era.get(`talent:${target}:76`) == 1) {
        // :1080
        await era.printAndWait(
          `「好大的寄生虫呢……难道说、要把这个放进去？　好期待呢♪」`,
        ); // :1081
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1083
        await era.printAndWait(`「在肠内生活的寄生虫吗……有意思的生物」`); // :1084
      } else {
        // :1086-1087
        await era.printAndWait(
          `「原始的寄生虫吗……哼、据说体液有催淫作用呢……」`,
        ); // :1087
      } // :1088-1089
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1089
      kojo.肛门虫 = 1; // :1089
      return 0; // :1090-1091
    } else {
      // :1092-1093

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1094
        await era.printAndWait(
          `「咕呜～、直肠…･･･被钻进去了～。停、停不下来了……♪」`,
        ); // :1095
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1096
        kojo.肛门虫 = 6; // :1096
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1098
        await era.printAndWait(
          `「在直肠内运动着呢……据说有催淫作用、快点生效吧」`,
        ); // :1099
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1100
        kojo.肛门虫 = 6; // :1100
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1102
        await era.printAndWait(
          `「被这样的、下等生物……挖掘着直肠、有感觉了……嗯♪」`,
        ); // :1103
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1104
        kojo.肛门虫 = 5; // :1104
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1106
        await era.printAndWait(
          `「这样很难有感觉呢……不过据说寄生虫对健康有益」`,
        ); // :1107
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1108
        kojo.肛门虫 = 4; // :1108
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1110
        await era.printAndWait(`「这、这种下等生物……嗯」`); // :1111
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1112
        kojo.肛门虫 = 3; // :1112
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1114
        await era.printAndWait(`「好恶心的寄生虫……就好像你一样」`); // :1115
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1116
        kojo.肛门虫 = 2; // :1116
      } // :1117-1120
      return 0; // :1118-1120
    } // :1119-1120
  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) {
    // :1121

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1123
      await era.printAndWait(
        `「肛门括约筋变的松弛下来了呢……♪　还想被继续开发呢」`,
      ); // :1124
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1125
      kojo.肛门虫着脱 = 4; // :1125
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1127
      await era.printAndWait(`「异物感不见了、有点寂寞呢」`); // :1128
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1129
      kojo.肛门虫着脱 = 3; // :1129
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1131
      await era.printAndWait(`「咕呜～、肛门括约筋……麻麻的～……」`); // :1132
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1133
      kojo.肛门虫着脱 = 2; // :1133
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1135
      await era.printAndWait(`「哈啊～……真是恶心的生物……」`); // :1136
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1137
      kojo.肛门虫着脱 = 1; // :1137
    } // :1138-1142
    return 0; // :1139-1142
  } // :1140-1142

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    // :1362

    if (kojo.肛珠 == 0) {
      // :1364

      if (era.get(`talent:${target}:76`) == 1) {
        // :1366
        await era.printAndWait(`「要把这个全部放进去吗？　好期待呢」`); // :1367
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1369
        await era.printAndWait(`「一个一个的好好放进去哦」`); // :1370
      } else {
        // :1372-1373
        await era.printAndWait(`「这样变态的器具……难以理解呢」`); // :1373
      } // :1374-1375
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :1375
      kojo.肛珠 = 1; // :1375
      return 0; // :1376-1377
    } else {
      // :1378-1379

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1380
        await era.printAndWait(
          `「嗯～……一个接一个的、放进去了呢……好期待拔出来的时候呢」`,
        ); // :1381
        if (era.get(`talent:${target}:种族`) == 2) {
          // :1382

          await era.printAndWait(
            `${target_name}的屁股后面、另一条下流的尾巴摇动着。`,
          ); // :1384
        } // :1385-1386
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :1386
        kojo.肛珠 = 7; // :1386
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1388
        await era.printAndWait(
          `「这可真是……有趣的道具呢。肚子里面塞得满满的呢」`,
        ); // :1389
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :1390
        kojo.肛珠 = 6; // :1390
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1392
        await era.printAndWait(
          `「呼呜～…哈啊～、全、全部放进去了吧？　想被一口气拔出来呢」`,
        ); // :1393
        if (era.get(`talent:${target}:种族`) == 2) {
          // :1394

          await era.printAndWait(
            `${target_name}的屁股后面、另一条下流的尾巴摇动着。`,
          ); // :1396
        } // :1397-1398
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :1398
        kojo.肛珠 = 5; // :1398
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1400
        await era.printAndWait(`「想一个一个地被你的手放进去呢」`); // :1401
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :1402
        kojo.肛珠 = 4; // :1402
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1404
        await era.printAndWait(`「嗯～、咕～……哈啊～、肛、肛门……」`); // :1405
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :1406
        kojo.肛珠 = 3; // :1406
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        // :1408
        await era.printAndWait(`「对这样的器具拿出干劲什么的……做不到呢」`); // :1409
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :1410
        kojo.肛珠 = 2; // :1410
      } // :1411-1414
      return 0; // :1412-1414
    } // :1413-1414
  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) {
    // :1415

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1417
      await era.printAndWait(
        `「嗯哈啊～♪　这个、太棒了……♪　滑溜溜的拔出来了～」`,
      ); // :1418
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :1419
      kojo.肛珠着脱 = 4; // :1419
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1421
      await era.printAndWait(`「拔出来了……总觉得、好像在产卵呢」`); // :1422
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :1423
      kojo.肛珠着脱 = 3; // :1423
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1425
      await era.printAndWait(`「嗯～……咕～、哈啊～、哈啊～……」`); // :1426
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :1427
      kojo.肛珠着脱 = 2; // :1427
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1429
      await era.printAndWait(`「结束了吗……？　只感到难受呢」`); // :1430
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :1431
      kojo.肛珠着脱 = 1; // :1431
    } // :1432-1436
    return 0; // :1433-1436
  } // :1434-1436

  if (era_flag.selectcom == 20) {
    // :1439

    if (kojo.正常位 == 0) {
      // :1441

      if (era.get(`talent:${target}:0`) == 1) {
        // :1443

        if (era.get(`talent:${target}:76`) == 1) {
          // :1445
          await era.printAndWait(
            `「这个我知道、是叫做深度授精式吧？　请让我头一次的受精吧」`,
          ); // :1446
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          era.get(`abl:${target}:10`) >= 5
        ) {
          // :1448
          await era.printAndWait(`「能把处女献给你……${sc()}觉得好光荣」`); // :1449
        } else {
          // :1451-1452
          await era.printAndWait(
            `「只是粘膜被弄破了而已……在生物学意义上、什么变化都算不上」`,
          ); // :1452
        } // :1453-1454
      } else {
        // :1455-1456
        if (era.get(`talent:${target}:76`) == 1) {
          // :1456
          await era.printAndWait(
            `「这个我知道、是叫做深度授精式吧？　请让我受精吧」`,
          ); // :1457
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1459
          await era.printAndWait(`「因为怀孕而产生的母体变化……想试试看呢」`); // :1460
        } else {
          // :1462-1463
          await era.printAndWait(`「只有怀孕……只有怀孕千万不要啊！」`); // :1463
        } // :1464-1466
      } // :1465-1466
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :1466
      kojo.正常位 = 1; // :1466
      return 0; // :1467-1468
    } else {
      // :1469-1470

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1471
        await era.printAndWait(`「想被你弄怀孕呢……子宫已经躁动的不得了了呢」`); // :1472
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :1473
        kojo.正常位 = 6; // :1473
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1475
        await era.printAndWait(`「想怀上和你的孩子呢……把大量的精子射进来吧」`); // :1476
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :1477
        kojo.正常位 = 5; // :1477
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1479
        await era.printAndWait(
          `「感、感觉到了……子宫在期盼着受精……？　难以置信……」`,
        ); // :1480
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :1481
        kojo.正常位 = 4; // :1481
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1483
        await era.printAndWait(`「我知道了……${sc()}的身体、随便你怎么使用吧」`); // :1484
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :1485
        kojo.正常位 = 3; // :1485
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        // :1487
        await era.printAndWait(
          `「住、住手……敢在${sc()}的身体里射精可饶不了你哦！」`,
        ); // :1488
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :1489
        kojo.正常位 = 2; // :1489
      } // :1490-1495
      return 0; // :1491-1495
    } // :1492-1495
  } // :1493-1495

  if (era_flag.selectcom == 21) {
    // :1498

    if (kojo.背后位 == 0) {
      // :1500

      if (era.get(`talent:${target}:0`) == 1) {
        // :1502

        if (era.get(`talent:${target}:76`) == 1) {
          // :1504
          if (era.get(`talent:${target}:种族`) == 2) {
            // :1505

            await era.printAndWait(
              `「这是适合野兽的姿态呢、不觉得有些变态吗？」`,
            ); // :1507
          } else {
            // :1508-1509
            await era.printAndWait(
              `「好像野生动物似的呢……这样的第一次、不觉得太过变态了吗？」`,
            ); // :1509
          } // :1510-1511
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1512
          if (era.get(`talent:${target}:种族`) == 2) {
            // :1513

            await era.printAndWait(
              `「这是适合野兽的姿态呢……那么就这样让我怀孕吧♪」`,
            ); // :1515
          } else {
            // :1516-1517
            await era.printAndWait(
              `「第一次就是这种野蛮的体位吗……那么就这样让我怀孕吧♪」`,
            ); // :1517
          } // :1518-1521
        } else {
          // :1522-1523
          await era.printAndWait(`「屈辱啊……咕呜、屈辱啊！」`); // :1523
        } // :1524-1525
      } else {
        // :1526-1527

        if (era.get(`talent:${target}:76`) == 1) {
          // :1528
          await era.printAndWait(`「好像野生动物似的呢、你喜欢这样吗？」`); // :1529
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1531
          await era.printAndWait(`「这是很适合受孕的体位呢」`); // :1532
        } else {
          // :1534-1535
          await era.printAndWait(`「真野蛮……跟你真配呢」`); // :1535
        } // :1536-1538
      } // :1537-1538
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :1538
      kojo.背后位 = 1; // :1538
      return 0; // :1539-1540
    } else if (era.get(`talent:${target}:153`) == 1) {
      // :1541

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1543
        if (rand_n(3) == 0) {
          // :1544
          await era.printAndWait(`「原来还有会给怀孕的雌性授精的雄性呢……♪」`); // :1545
        } else if (rand_n(2) == 0) {
          // :1546
          await era.printAndWait(
            `「居然连孕妇都上……这样不合理的事、难道是你的兴趣吗……？　真是太棒啦……♪」`,
          ); // :1547
        } else {
          // :1548-1549
          await era.printAndWait(
            `「再更用力地操我啊……让肚子里孩子也一起感受一下吧♪」`,
          ); // :1549
        } // :1550-1551
        if (era.get(`talent:${target}:种族`) == 2) {
          // :1551

          await era.printAndWait(
            `${target_name}完全抛弃了狼人的的自尊心、沦为一头纯粹的母兽了。`,
          ); // :1553
        } // :1554-1555
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :1555
        kojo.背后位 = 6; // :1555
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1557
        if (rand_n(3) == 0) {
          // :1558
          await era.printAndWait(
            `「这样如同动物一般的做爱、就算怀孕也不奇怪啦♪」`,
          ); // :1559
        } else if (rand_n(2) == 0) {
          // :1560
          await era.printAndWait(
            `「把你的精液……射在……肚子里……孩子的身上吧！」`,
          ); // :1561
        } else {
          // :1562-1563
          await era.printAndWait(
            `「这么色情的体位、还真有点不想让里面的孩子看到呢♪」`,
          ); // :1563
        } // :1564-1565
        if (era.get(`talent:${target}:种族`) == 2) {
          // :1565

          await era.printAndWait(
            `${target_name}抛弃了狼人的的自尊心、沦为一头发情的母兽了。`,
          ); // :1567
        } // :1568-1569
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :1569
        kojo.背后位 = 5; // :1569
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1571
        await era.printAndWait(`「呜呜呜……肚子里……鸡巴……在乱撞啊……嗯啊」`); // :1572
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :1573
        kojo.背后位 = 4; // :1573
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1575
        await era.printAndWait(`「太耻辱了……竟然完全无法抵抗什么的……」`); // :1576
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :1577
        kojo.背后位 = 3; // :1577
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :1579
        await era.printAndWait(`「可恶……竟然用这种野蛮下等的体位……」`); // :1580

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :1582
        kojo.背后位 = 2; // :1582
      } // :1583-1585
      return 0; // :1584-1585
    } else {
      // :1586-1587

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1588
        if (rand_n(3) == 0) {
          // :1589
          await era.printAndWait(`「现在这个瞬间、只剩下雄性和雌性了哦……♪」`); // :1590
        } else if (rand_n(2) == 0) {
          // :1591
          await era.printAndWait(
            `「这种野生动物般的体位、是你的癖好吗……？　好棒……♪」`,
          ); // :1592
        } else {
          // :1593-1594
          await era.printAndWait(`「再使劲点撞我的腰……让屁股肉也跳动起来吧♪」`); // :1594
        } // :1595-1596
        if (era.get(`talent:${target}:种族`) == 2) {
          // :1596

          await era.printAndWait(
            `${target_name}已经舍弃了人狼的自豪，完全变成了一匹雌性。`,
          ); // :1598
        } // :1599-1600
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :1600
        kojo.背后位 = 6; // :1600
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1602
        if (rand_n(3) == 0) {
          // :1603
          await era.printAndWait(`「这般像动物似的做爱、绝对会怀……怀孕的♪」`); // :1604
        } else if (rand_n(2) == 0) {
          // :1605
          await era.printAndWait(`「让我确实的受孕吧……用你的精液！」`); // :1606
        } else {
          // :1607-1608
          await era.printAndWait(`「就决定用这种下流的体位来受孕吧♪」`); // :1608
        } // :1609-1610
        if (era.get(`talent:${target}:种族`) == 2) {
          // :1610

          await era.printAndWait(
            `${target_name}已经舍弃了人狼的自豪、变成了为了怀孕而发情的雌性了。`,
          ); // :1612
        } // :1613-1614
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :1614
        kojo.背后位 = 5; // :1614
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1616
        await era.printAndWait(`「呜呜～……阴茎……在里面……嘎吱嘎吱地……嗯啊～」`); // :1617
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :1618
        kojo.背后位 = 4; // :1618
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1620
        await era.printAndWait(`「屈辱啊……什么也做不了……」`); // :1621
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :1622
        kojo.背后位 = 3; // :1622
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :1624
        await era.printAndWait(`「好恨啊……被这种野蛮下流的体位……」`); // :1625

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :1627
        kojo.背后位 = 2; // :1627
      } // :1628-1633
      return 0; // :1629-1633
    } // :1630-1633
  } // :1631-1633

  if (era_flag.selectcom == 22) {
    // :1636
    if (kojo.对面座位 == 0) {
      // :1637

      if (era.get(`talent:${target}:0`) == 1) {
        // :1639

        if (era.get(`talent:${target}:76`) == 1) {
          // :1641
          await era.printAndWait(`「亲个嘴吧……作为第一次的纪念呢♪」`); // :1642
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1644
          await era.printAndWait(`「要成为女人了呢……想被你紧紧的抱住呢」`); // :1645
        } else {
          // :1647-1648
          await era.printAndWait(`「咕呜～……处女膜没了……才没什么感想呢」`); // :1648
        } // :1649-1650
      } else {
        // :1651-1652

        if (era.get(`talent:${target}:76`) == 1) {
          // :1653
          await era.printAndWait(`「一边亲吻一边缠在一起……真不错呢」`); // :1654
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1656
          await era.printAndWait(`「真想记下受精瞬间的${sc()}的脸呢」`); // :1657
        } else {
          // :1659-1660
          await era.printAndWait(`「咕呜～……不要抱得这么紧……」`); // :1660
        } // :1661-1663
      } // :1662-1663
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :1663
      kojo.对面座位 = 1; // :1663
      return 0; // :1664-1665
    } else {
      // :1666-1667

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1668
        if (rand_n(3) == 0) {
          // :1669
          await era.printAndWait(`「被抱在你的怀里……感觉还不坏」`); // :1670
        } else if (rand_n(2) == 0) {
          // :1671
          await era.printAndWait(
            `「看到高潮脸了吗、因为你的突刺而喜悦的${sc()}的脸」`,
          ); // :1672
        } else {
          // :1673-1674
          await era.printAndWait(`「嗯～……啊啊～……深深的、插我啊♪」`); // :1674
        } // :1675-1676
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :1676
        kojo.对面座位 = 6; // :1676
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1678
        if (rand_n(3) == 0) {
          // :1679
          await era.printAndWait(`「受精了……啊啊、被你抱着受精了啊」`); // :1680
        } else if (rand_n(2) == 0) {
          // :1681
          await era.printAndWait(
            `「子宫……降下来了。因为想要你的精液、一颤一颤的呢」`,
          ); // :1682
        } else {
          // :1683-1684
          await era.printAndWait(
            `「求你了、射精吧！　在${sc()}的里面把精液射出来吧！」`,
          ); // :1684
        } // :1685-1686
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :1686
        kojo.对面座位 = 5; // :1686
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1688
        await era.printAndWait(`「咕呜……这种、感觉……不对」`); // :1689
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :1690
        kojo.对面座位 = 4; // :1690
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1692
        await era.printAndWait(`「服从你了吗……子宫也随你使唤了」`); // :1693
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :1694
        kojo.对面座位 = 3; // :1694
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1696
        await era.printAndWait(
          `「咕呜……这样子……什么感觉、也没有。那是汗……好恶心」`,
        ); // :1697
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :1698
        kojo.对面座位 = 2; // :1698
      } // :1699-1704
      return 0; // :1700-1704
    } // :1701-1704
  } // :1702-1704

  if (era_flag.selectcom == 23) {
    // :1707
    if (kojo.背面座位 == 0) {
      // :1708

      if (era.get(`talent:${target}:0`) == 1) {
        // :1710

        if (era.get(`talent:${target}:76`) == 1) {
          // :1712
          await era.printAndWait(
            `「有镜子的话真想看一看呢……${sc()}失去处女的瞬间……」`,
          ); // :1713
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1715
          await era.printAndWait(
            `「拜托了这样可看不到你的脸啊……一定、会哭出来的」`,
          ); // :1716
        } else {
          // :1718-1719
          await era.printAndWait(
            `「咕呜～……处女膜就这样没了……才没有什么感想呢」`,
          ); // :1719
        } // :1720-1721
      } else {
        // :1722-1723

        if (era.get(`talent:${target}:76`) == 1) {
          // :1724
          await era.printAndWait(`「从背后抱着吗？　好像变成小孩子了呢……」`); // :1725
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1727
          await era.printAndWait(
            `「被从背后抱住了呢、要在受精的瞬间好好接住呢……」`,
          ); // :1728
        } else {
          // :1730-1731
          await era.printAndWait(`「咕呜～……不要我耳边说悄悄话……」`); // :1731
        } // :1732-1734
      } // :1733-1734
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :1734
      kojo.背面座位 = 1; // :1734
      return 0; // :1735-1736
    } else {
      // :1737-1738

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1739
        if (rand_n(3) == 0) {
          // :1740
          await era.printAndWait(`「感觉到了……你胸部的呼吸、从背后传过来……」`); // :1741
        } else if (rand_n(2) == 0) {
          // :1742
          await era.printAndWait(
            `「嗯～、哈啊……好深……感觉到了哦、你的蠢动……」`,
          ); // :1743
        } else {
          // :1744-1745
          await era.printAndWait(
            `「这可真是上乘的椅子呢……嗯～、坐起来的感觉、最棒了……！」`,
          ); // :1745
        } // :1746-1747
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :1747
        kojo.背面座位 = 6; // :1747
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1749
        if (rand_n(3) == 0) {
          // :1750
          await era.printAndWait(`「嗯啊啊啊啊～！　绝对、会受精的♪」`); // :1751
        } else if (rand_n(2) == 0) {
          // :1752
          await era.printAndWait(`「要、要死了……你、太激烈了……」`); // :1753
        } else {
          // :1754-1755
          await era.printAndWait(
            `「好深……在这个深处、送出来吧……让我怀上孩子吧……欸」`,
          ); // :1755
        } // :1756-1757
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :1757
        kojo.背面座位 = 5; // :1757
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1759
        await era.printAndWait(
          `「嗯～……嗯啊～、感、感觉到了……灼热的、情欲……」`,
        ); // :1760
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :1761
        kojo.背面座位 = 4; // :1761
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1763
        await era.printAndWait(`「身体归你所有之后、连心也……嗯！」`); // :1764
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :1765
        kojo.背面座位 = 3; // :1765
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1767
        await era.printAndWait(
          `「这样子……什么感觉、也没有……只不过是摩擦粘膜罢了……」`,
        ); // :1768
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :1769
        kojo.背面座位 = 2; // :1769
      } // :1770-1775
      return 0; // :1771-1775
    } // :1772-1775
  } // :1773-1775

  if (era_flag.selectcom == 26) {
    // :1778

    if (kojo.正常位肛交 == 0) {
      // :1780

      if (era.get(`talent:${target}:76`) == 1) {
        // :1782
        await era.printAndWait(`「快请插进来吧、这个菊穴里～」`); // :1783
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1785
        await era.printAndWait(`「其实、前面更想要的说……」`); // :1786
      } else {
        // :1788-1789
        await era.printAndWait(`「这、这么野蛮的行为……饶不了你……」`); // :1789
      } // :1790-1791
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :1791
      kojo.正常位肛交 = 1; // :1791
      return 0; // :1792-1793
    } else {
      // :1794-1795

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1796
        if (rand_n(3) == 0) {
          // :1797
          await era.printAndWait(
            `「啊啊啊～、肛、肛门、完全、变成性器了！　啊啊啊～」`,
          ); // :1798
        } else if (rand_n(2) == 0) {
          // :1799
          await era.printAndWait(`「肛、肛门……麻麻的样子、好舒服……」`); // :1800
        } else {
          // :1801-1802
          await era.printAndWait(
            `「把阴茎吞下去了……${sc()}的肛门、把阴茎完全的吞下去了！」`,
          ); // :1802
        } // :1803-1804
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :1804
        kojo.正常位肛交 = 7; // :1804
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1806
        await era.printAndWait(
          `「还、还想再感受一下……肛门、还想再、感受一下阴茎！」`,
        ); // :1807
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :1808
        kojo.正常位肛交 = 6; // :1808
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1810
        if (rand_n(2) == 0) {
          // :1811
          await era.printAndWait(
            `「让${sc()}的肛门、好好地和阴茎做游戏吧……？」`,
          ); // :1812
        } else {
          // :1813-1814
          await era.printAndWait(
            `「肛门、${sc()}的肛门、变得好奇怪……好想要阴茎！」`,
          ); // :1814
        } // :1815-1816
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :1816
        kojo.正常位肛交 = 5; // :1816
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1818
        await era.printAndWait(`「还、还没……看起来还没习惯的样子……」`); // :1819
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :1820
        kojo.正常位肛交 = 4; // :1820
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1822
        await era.printAndWait(`「咕呜～、肛、肛门、变的好奇怪了～……」`); // :1823
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :1824
        kojo.正常位肛交 = 3; // :1824
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1826
        await era.printAndWait(`「好痛……呀啊啊！　好痛！」`); // :1827
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :1828
        kojo.正常位肛交 = 2; // :1828
      } // :1829-1834
      return 0; // :1830-1834
    } // :1831-1834
  } // :1832-1834

  if (era_flag.selectcom == 27) {
    // :1837

    if (kojo.背后位肛交 == 0) {
      // :1839

      if (era.get(`talent:${target}:76`) == 1) {
        // :1841
        await era.printAndWait(`「等待多时了、这下流的体位！」`); // :1842
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1844
        await era.printAndWait(`「已经做好被插入的准备了哦」`); // :1845
      } else {
        // :1847-1848
        await era.printAndWait(`「咕呜～、好、好羞耻……」`); // :1848
      } // :1849-1850
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :1850
      kojo.背后位肛交 = 1; // :1850
      return 0; // :1851-1852
    } else {
      // :1853-1854

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1855
        if (rand_n(3) == 0) {
          // :1856
          await era.printAndWait(
            `「这、这样子好喜欢～！　野生的、非文明的、下流的姿势……像这样地、被操肛门！」`,
          ); // :1857
        } else if (rand_n(2) == 0) {
          // :1858
          await era.printAndWait(
            `「脑袋都变的傻乎乎的了……肛门像要溶化似的、${sc()}、要变成白痴了！」`,
          ); // :1859
        } else {
          // :1860-1861
          await era.printAndWait(
            `「再深点插肛门！　${sc()}、好喜欢肛门被穿刺啊……」`,
          ); // :1861
        } // :1862-1863
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :1863
        kojo.正常位肛交 = 7; // :1863
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1865
        await era.printAndWait(`「还、还不太习惯呢……有进一步开发的必要呢……」`); // :1866
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :1867
        kojo.正常位肛交 = 6; // :1867
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1869
        if (rand_n(2) == 0) {
          // :1870
          await era.printAndWait(
            `「${sc()}的肛门、变的好奇怪呢……你要、负起责任哦」`,
          ); // :1871
        } else {
          // :1872-1873
          await era.printAndWait(
            `「已经把阴茎的形状、给记下来了呢……${sc()}的肛门」`,
          ); // :1873
        } // :1874-1875
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :1875
        kojo.背后位肛交 = 5; // :1875
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1877
        await era.printAndWait(`「嗯……还、有点痛……」`); // :1878
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :1879
        kojo.背后位肛交 = 4; // :1879
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1881
        await era.printAndWait(`「咕呜……肛门、屁眼、变松了……」`); // :1882
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :1883
        kojo.背后位肛交 = 3; // :1883
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1885
        await era.printAndWait(`「好痛！　肛门……要裂开了……不要这么粗暴啊」`); // :1886
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :1887
        kojo.背后位肛交 = 2; // :1887
      } // :1888-1893
      return 0; // :1889-1893
    } // :1890-1893
  } // :1891-1893

  if (era_flag.selectcom == 28) {
    // :1896

    if (kojo.对面座位肛交 == 0) {
      // :1898

      if (era.get(`talent:${target}:76`) == 1) {
        // :1900
        await era.printAndWait(
          `「可以像这样面对面的作肛交……好像在做梦一样呢」`,
        ); // :1901
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1903
        await era.printAndWait(
          `「想亲个嘴呢……当然、肛门也请拜托您肏的火热吧」`,
        ); // :1904
      } else {
        // :1906-1907
        await era.printAndWait(`「这样的……这样的性交、是异常的……」`); // :1907
      } // :1908-1909
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :1909
      kojo.对面座位肛交 = 1; // :1909
      return 0; // :1910-1911
    } else {
      // :1912-1913

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1914
        if (rand_n(3) == 0) {
          // :1915
          await era.printAndWait(
            `「${sc()}淫荡扭曲的脸……真想好好看看呢、因肛门性交而满足的表情……」`,
          ); // :1916
        } else if (rand_n(2) == 0) {
          // :1917
          await era.printAndWait(
            `「嗯～……好深、好深啊！　肛门变得下流起来了！」`,
          ); // :1918
        } else {
          // :1919-1920
          await era.printAndWait(`「这样子、好喜欢……肛门、快溶化了……」`); // :1920
        } // :1921-1922
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :1922
        kojo.对面座位肛交 = 7; // :1922
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1924
        await era.printAndWait(
          `「不再多多开发肛门可不行呢……${sc()}、会加油的」`,
        ); // :1925
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :1926
        kojo.对面座位肛交 = 6; // :1926
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1928
        if (rand_n(2) == 0) {
          // :1929
          await era.printAndWait(`「肛、肛门……变成你的形状了哦♪」`); // :1930
        } else {
          // :1931-1932
          await era.printAndWait(
            `「哈啊～、呼呜……感、感觉到了……肛门、变的下流起来了……」`,
          ); // :1932
        } // :1933-1934
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :1934
        kojo.对面座位肛交 = 5; // :1934
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1936
        await era.printAndWait(
          `「无论什么部位都能被爱上吗、不得不仔细研究呢……」`,
        ); // :1937
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :1938
        kojo.对面座位肛交 = 4; // :1938
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1940
        await era.printAndWait(
          `「不行、不行……好有感觉啊啊啊！　肛门、肛门变的不是肛门了啊啊啊啊！」`,
        ); // :1941
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :1942
        kojo.对面座位肛交 = 3; // :1942
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1944
        await era.printAndWait(`「噫～、好痛、好痛啊、快住手～！」`); // :1945
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :1946
        kojo.对面座位肛交 = 2; // :1946
      } // :1947-1952
      return 0; // :1948-1952
    } // :1949-1952
  } // :1950-1952

  if (era_flag.selectcom == 29) {
    // :1955

    if (kojo.背面座位肛交 == 0) {
      // :1957

      if (era.get(`talent:${target}:76`) == 1) {
        // :1959
        await era.printAndWait(`「肛门好感动呢、乳头那边也拜托了」`); // :1960
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1962
        await era.printAndWait(`「感觉到你的呼吸了……唔嗯、脖子好痒呢」`); // :1963
      } else {
        // :1965-1966
        await era.printAndWait(`「咕呜……不要碰乳头～……」`); // :1966
      } // :1967-1968
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :1968
      kojo.背面座位肛交 = 1; // :1968
      return 0; // :1969-1970
    } else {
      // :1971-1972

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1973
        if (rand_n(2) == 0) {
          // :1974
          await era.printAndWait(
            `「跳起来了……${sc()}、因为肛门被串刺而跳动起来了！」`,
          ); // :1975
        } else {
          // :1976-1977
          await era.printAndWait(
            `「知道吗……？　因为肛交、乳头也昂然耸立了……♪」`,
          ); // :1977
        } // :1978-1979
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :1979
        kojo.背面座位肛交 = 7; // :1979
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1981
        await era.printAndWait(`「${sc()}的肛门、看起来还没开发好呢……」`); // :1982
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :1983
        kojo.背面座位肛交 = 6; // :1983
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1985
        if (rand_n(2) == 0) {
          // :1986
          await era.printAndWait(
            `「哈啊～、呼呜、有、有感觉了！　再激烈点玩弄肛门和乳头吧！」`,
          ); // :1987
        } else {
          // :1988-1989
          await era.printAndWait(`「${sc()}、肛门也要怀孕了！」`); // :1989
        } // :1990-1991
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :1991
        kojo.背面座位肛交 = 5; // :1991
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1993
        await era.printAndWait(`「还很痛呢……${sc()}、得多多加油呢」`); // :1994
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :1995
        kojo.背面座位肛交 = 4; // :1995
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1997
        await era.printAndWait(`「肛门、好像变的不是肛门了……好、好有感觉……」`); // :1998
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :1999
        kojo.背面座位肛交 = 3; // :1999
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2001
        await era.printAndWait(`「疼、好痛……咕呜～」`); // :2002
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :2003
        kojo.背面座位肛交 = 2; // :2003
      } // :2004-2009
      return 0; // :2005-2009
    } // :2006-2009
  } // :2007-2009

  if (era_flag.selectcom == 30) {
    // :2012

    if (kojo.手淫 == 0) {
      // :2014

      if (era.get(`talent:${target}:76`) == 1) {
        // :2016
        await era.printAndWait(`「为什么直到现在才让我碰啊～」`); // :2017
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2019
        await era.printAndWait(`「用${sc()}的手、来让它勃起来吧～」`); // :2020
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :2022
        await era.printAndWait(`「让${sc()}搓弄也没问题是吗……我知道了」`); // :2023
      } else {
        // :2025-2026
        await era.printAndWait(
          `「讨厌讨厌不要啊、${sc()}、才不会干这种事呢！」`,
        ); // :2026
      } // :2027-2028
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :2028
      kojo.手淫 = 1; // :2028
      return 0; // :2029-2030
    } else {
      // :2031-2032

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2033
        if (rand_n(2) == 0) {
          // :2034
          await era.printAndWait(
            `「啊哈～、一副很想要的样子、一颤一颤的呢……好吧、我撸我撸」`,
          ); // :2035
        } else {
          // :2036-2037
          await era.printAndWait(
            `「粘乎乎的东西都已经出来了呢。这种液体、叫什么名字来着～？　啊哈～」`,
          ); // :2037
        } // :2038-2039
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :2039
        kojo.手淫 = 6; // :2039
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2041
        if (era.get(`talent:${player}:318`) == 1) {
          // :2042

          await era.printAndWait(
            `「你这远超平均值的鸡巴……啊哈、一只手完全把握不住哇${heart(1)}」`,
          ); // :2044
        } else if (era.get(`talent:${player}:318`) == 2) {
          // :2045

          await era.printAndWait(
            `「不脸红吗你？　这种差劲肉棒${heart(1)}　得了、就这么把劣等精子射在手里吧${heart(1)}」`,
          ); // :2047
        } else if (era.get(`talent:${player}:318`) == 3) {
          // :2048

          await era.printAndWait(
            `「包皮肉棒里的脏东西都跑出来了啦${heart(1)}　啊哈、好厉害的味道${heart(1)}」`,
          ); // :2050
        } else if (era.get(`talent:${player}:318`) == 4) {
          // :2051

          await era.printAndWait(
            `「什么嘛、根本就不是人的鸡巴了吧……啊哈、给你按摩咯${heart(1)}」`,
          ); // :2053
        } else if (rand_n(2) == 0) {
          // :2054

          await era.printAndWait(
            `「射精可不行哦、明明想让你在${sc()}的里面全部射出来的……」`,
          ); // :2056
        } else {
          // :2057-2058

          await era.printAndWait(
            `「不能再多忍耐一会儿吗？　已经、想射了吗？　想射了吗？」`,
          ); // :2059
        } // :2060-2061
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :2061
        kojo.手淫 = 5; // :2061
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2063
        await era.printAndWait(`「跳动的很厉害呢……快射吧快射吧、忍不住了？」`); // :2064
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :2065
        kojo.手淫 = 4; // :2065
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2067
        await era.printAndWait(`「我知道了、用手来辅助自慰行为就行了是吧」`); // :2068
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :2069
        kojo.手淫 = 3; // :2069
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :2071
        await era.printAndWait(`「呜呜、热热的……好恶心……」`); // :2072
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :2073
        kojo.手淫 = 2; // :2073
      } // :2074-2079
      return 0; // :2075-2079
    } // :2076-2079
  } // :2077-2079

  if (era_flag.selectcom == 31) {
    // :2082

    if (kojo.口交_奴 == 0) {
      // :2084

      if (era.get(`talent:${target}:76`) == 1) {
        // :2086
        await era.printAndWait(`「${sc()}的口活、还没试过吧？」`); // :2087
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2089
        await era.printAndWait(`「精液、直接喝下去了呢」`); // :2090
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :2092
        await era.printAndWait(`「我知道了、口交就行了是吧」`); // :2093
      } else {
        // :2095-2096
        await era.printAndWait(`「这样子去舔什么的……呜诶～」`); // :2096
      } // :2097-2098
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :2098
      kojo.口交_奴 = 1; // :2098
      return 0; // :2099-2100
    } else {
      // :2101-2102

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2103
        await era.print(`「嗞噜～、嗞噜～、嗞啾～～……噗哈啊」`); // :2104
        await era.printAndWait(`${target_name}发出了下流的声音贪求着阴茎`); // :2105
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :2106
        kojo.口交_奴 = 6; // :2106
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2108
        await era.printAndWait(`「我要多多练习口交、想学会厉害的口活呢」`); // :2109
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :2110
        kojo.口交_奴 = 5; // :2110
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2112
        await era.print(`「哈啊、这个阴茎、刚才也忍不住喷出了精液的样子呢……」`); // :2113
        await era.printAndWait(`${target_name}发出了下流的声音贪求着阴茎`); // :2114
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :2115
        kojo.口交_奴 = 4; // :2115
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2117
        await era.print(`「口交、变的挺擅长了呢」`); // :2118
        await era.printAndWait(`${target_name}一边这样说着一边用嘴巴含着阴茎`); // :2119
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :2120
        kojo.口交_奴 = 3; // :2120
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :2122
        await era.printAndWait(
          `「呜诶……为什么会一跳一跳的呢。不可思议的肉块……」`,
        ); // :2123
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :2124
        kojo.口交_奴 = 2; // :2124
      } // :2125-2130
      return 0; // :2126-2130
    } // :2127-2130
  } // :2128-2130

  if (era_flag.selectcom == 32) {
    // :2133

    if (kojo.乳交 == 0) {
      // :2135

      if (era.get(`talent:${target}:76`) == 1) {
        // :2137
        await era.printAndWait(`「${sc()}的乳房、还挺管用的吧」`); // :2138
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2140
        await era.printAndWait(`「乳房好用的话、${sc()}、就尽情的使劲蹭了哦」`); // :2141
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :2143
        await era.printAndWait(`「用乳房摩擦还可以吧……」`); // :2144
      } else {
        // :2146-2147
        await era.printAndWait(`「用胸部来！？　变、变态！」`); // :2147
      } // :2148-2149
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :2149
      kojo.乳交 = 1; // :2149
      return 0; // :2150-2151
    } else {
      // :2152-2153

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2154
        if (rand_n(2) == 0) {
          // :2155
          await era.printAndWait(`「这样挤压着会舒服吗？」`); // :2156
        } else {
          // :2157-2158
          await era.printAndWait(`「快看快看快看。乳房把你的阴茎吞进去了哦」`); // :2158
        } // :2159-2160
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :2160
        kojo.乳交 = 6; // :2160
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2162
        await era.printAndWait(`「好难啊……你、真的会舒服吗？」`); // :2163
        // CFLAG:333  = 5（变量语义：CFLAG 族，333） // :2164
        kojo.乳交 = 5; // :2164
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2166
        if (rand_n(2) == 0) {
          // :2167
          await era.printAndWait(
            `「我会竭尽全力来奉仕的哦。用${sc()}柔软的乳房！」`,
          ); // :2168
        } else {
          // :2169-2170
          await era.printAndWait(`「Biu的射出来也行哦？」`); // :2170
        } // :2171-2172
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :2172
        kojo.乳交 = 4; // :2172
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2174
        await era.printAndWait(`「你、真的有感觉吗？　那就好……」`); // :2175
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :2176
        kojo.乳交 = 3; // :2176
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        // :2178
        await era.printAndWait(`「呜呜、这样子到底有什么好高兴的嘛……」`); // :2179
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :2180
        kojo.乳交 = 2; // :2180
      } // :2181-2186
      return 0; // :2182-2186
    } // :2183-2186
  } // :2184-2186

  if (era_flag.selectcom == 33) {
    // :2189

    if (kojo.股间性交 == 0) {
      // :2191

      if (era.get(`talent:${target}:76`) == 1) {
        // :2193
        await era.printAndWait(`「快看快看、要进到${sc()}的阴道里去了哦？」`); // :2194
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2196
        await era.printAndWait(`「只在表面摩擦吗……好想进到里面去呢」`); // :2197
      } else {
        // :2199-2200
        await era.printAndWait(`「这样摩擦到底有什么好高兴的……」`); // :2200
      } // :2201-2202
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :2202
      kojo.股间性交 = 1; // :2202
      return 0; // :2203-2204
    } else {
      // :2205-2206

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2207
        await era.printAndWait(
          `「呐、只在表面摩擦你会觉得舒服吗？　${sc()}……对这不是很了解呢」`,
        ); // :2208
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :2209
        kojo.股间性交 = 6; // :2209
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2211
        await era.printAndWait(
          `「呐、只在表面摩擦你会觉得舒服吗？　${sc()}……有点遗憾呢」`,
        ); // :2212
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :2213
        kojo.股间性交 = 5; // :2213
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2215
        await era.printAndWait(
          `「${sc()}已经到极限了……明明好想被插进去、明明好想……被插到里面啊！」`,
        ); // :2216
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :2217
        kojo.股间性交 = 4; // :2217
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2219
        await era.printAndWait(
          `「假如你、一不小心把你的阴茎插进了${sc()}的阴道里的话……该怎么办呢？　啊哈哈～」`,
        ); // :2220
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :2221
        kojo.股间性交 = 3; // :2221
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        // :2223
        await era.printAndWait(`「看起来这样的摩擦让你很高兴嘛……」`); // :2224
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :2225
        kojo.股间性交 = 2; // :2225
      } // :2226-2231
      return 0; // :2227-2231
    } // :2228-2231
  } // :2229-2231

  if (era_flag.selectcom == 34) {
    // :2234

    if (kojo.骑乘位 == 0) {
      // :2236

      if (era.get(`talent:${target}:0`) == 1) {
        // :2238

        if (era.get(`talent:${target}:76`) == 1) {
          // :2240
          await era.printAndWait(`「我期待已久了！　把你的阴茎、交给我吧」`); // :2241
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2243
          await era.printAndWait(
            `「终于、想要让我${sc()}怀孕了吗！　好开心哦」`,
          ); // :2244
        } else {
          // :2246-2247
          await era.printAndWait(`「让我自己来……你实在太无耻了」`); // :2247
        } // :2248-2249
      } else {
        // :2250-2251

        if (era.get(`talent:${target}:76`) == 1) {
          // :2252
          await era.printAndWait(`「嘿诶、这么想让${sc()}来吗」`); // :2253
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2255
          await era.printAndWait(`「这样子嘎吱嘎吱的……并不讨厌哦」`); // :2256
        } else {
          // :2258-2259
          await era.printAndWait(`「让我自己来……可恶」`); // :2259
        } // :2260-2262
      } // :2261-2262
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :2262
      kojo.骑乘位 = 1; // :2262
      return 0; // :2263-2264
    } else {
      // :2265-2266

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2267
        if (rand_n(4) == 0) {
          // :2268
          await era.printAndWait(`「来吧来吧、更多的从下面来插${sc()}吧！」`); // :2269
        } else if (rand_n(3) == 0) {
          // :2270
          await era.printAndWait(`「${sc()}扭腰的样子、请多多欣赏吧」`); // :2271
        } else if (rand_n(2) == 0) {
          // :2272
          await era.printAndWait(`「停不下来了、你也多用阴茎来顶我吧」`); // :2273
        } else {
          // :2274-2275
          await era.printAndWait(`「哈啊～、从下面、操我吧～♪」`); // :2275
        } // :2276-2277
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :2277
        kojo.骑乘位 = 6; // :2277
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2279
        if (rand_n(4) == 0) {
          // :2280
          await era.printAndWait(`「要把精液一滴不剩的榨干哦♪」`); // :2281
        } else if (rand_n(3) == 0) {
          // :2282
          await era.printAndWait(`「快看快看、要出来了哦、精液！」`); // :2283
        } else if (rand_n(2) == 0) {
          // :2284
          await era.printAndWait(`「想更多的被阴茎操呢、啊哈哈～」`); // :2285
        } else {
          // :2286-2287
          await era.printAndWait(
            `「出来了～！　把精液、更多的、射进来吧！　啊啊啊～♪」`,
          ); // :2287
        } // :2288-2289
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :2289
        kojo.骑乘位 = 5; // :2289
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2291
        if (rand_n(4) == 0) {
          // :2292
          await era.printAndWait(`「不行了、${sc()}的腰、自己动起来了！」`); // :2293
        } else if (rand_n(3) == 0) {
          // :2294
          await era.printAndWait(`「竟然……让${sc()}这样做……不过……」`); // :2295
        } else if (rand_n(2) == 0) {
          // :2296
          await era.printAndWait(`「哈啊～、哈啊～、咕呜～♪」`); // :2297
        } else {
          // :2298-2299
          await era.printAndWait(`「不行啊、这样子……往上顶……」`); // :2299
        } // :2300-2301
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :2301
        kojo.骑乘位 = 4; // :2301
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2303
        await era.printAndWait(`「唔～……我知道了。跨在你身上就行了吧？」`); // :2304
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :2305
        kojo.骑乘位 = 3; // :2305
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2307
        await era.printAndWait(`「竟让${sc()}……这样做……好屈辱～」`); // :2308
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :2309
        kojo.骑乘位 = 2; // :2309
      } // :2310-2315
      return 0; // :2311-2315
    } // :2312-2315
  } // :2313-2315

  if (era_flag.selectcom == 35) {
    // :2318

    if (kojo.全身擦洗 == 0) {
      // :2320

      if (era.get(`abl:${target}:16`) >= 3) {
        // :2322
        await era.printAndWait(`「你喜欢提供这种服务的店吗……？」`); // :2323
      } else {
        // :2325-2326
        await era.printAndWait(`「跟按摩女似的……额」`); // :2326
      } // :2327-2328
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :2328
      kojo.全身擦洗 = 1; // :2328
      return 0; // :2329-2330
    } else {
      // :2331-2332

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2333
        await era.printAndWait(
          `「快看快看、被${sc()}的肌肤哧溜哧溜的摩擦着哦～♪　舒服吗？」`,
        ); // :2334
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :2335
        kojo.全身擦洗 = 5; // :2335
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2337
        await era.printAndWait(`「这身体是只属于你的哦、为了你……嫩呼呼的呢」`); // :2338
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :2339
        kojo.全身擦洗 = 4; // :2339
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2341
        await era.printAndWait(`「变的全是泡泡了呢……舒服吗？」`); // :2342
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :2343
        kojo.全身擦洗 = 3; // :2343
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        // :2345
        await era.printAndWait(`「喂、这样做应该可以了吧……真是的」`); // :2346
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :2347
        kojo.全身擦洗 = 2; // :2347
      } // :2348-2353
      return 0; // :2349-2353
    } // :2350-2353
  } // :2351-2353

  if (era_flag.selectcom == 36) {
    // :2356

    if (kojo.骑乘位肛交 == 0) {
      // :2358

      if (era.get(`talent:${target}:76`) == 1) {
        // :2360
        await era.printAndWait(`「这样骑在你的身上就好像做梦一样呢」`); // :2361
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2363
        await era.printAndWait(`「呜嗯～……用肛门裹住了呢……♪」`); // :2364
      } else {
        // :2366-2367
        await era.printAndWait(`「这么卑劣的肛交还是第一次……」`); // :2367
      } // :2368-2369
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :2369
      kojo.骑乘位肛交 = 1; // :2369
      return 0; // :2370-2371
    } else {
      // :2372-2373

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2374
        if (rand_n(2) == 0) {
          // :2375
          await era.printAndWait(`「不行了、${sc()}的肛门要溶化了啊！」`); // :2376
        } else {
          // :2377-2378
          await era.printAndWait(
            `「${sc()}、一被串刺着……从肛门到大脑、都在回响！」`,
          ); // :2378
        } // :2379-2380
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :2380
        kojo.骑乘位肛交 = 7; // :2380
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2382
        await era.printAndWait(`「${sc()}一动起来、你就盯着不放呢♪」`); // :2383
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :2384
        kojo.骑乘位肛交 = 6; // :2384
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2386
        if (rand_n(2) == 0) {
          // :2387
          await era.printAndWait(`「啊啊、难以置信、肛门要溶化了♪」`); // :2388
        } else {
          // :2389-2390
          await era.printAndWait(`「肛、肛门、肛门要……不行～、太有感觉了～♪」`); // :2390
        } // :2391-2392
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :2392
        kojo.骑乘位肛交 = 5; // :2392
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2394
        await era.printAndWait(`「肛门含住阴茎的样子、好好看看吧」`); // :2395
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :2396
        kojo.骑乘位肛交 = 4; // :2396
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2398
        await era.printAndWait(
          `「咕呜、像这样的肛交什么的……尽管让${sc()}做吧」`,
        ); // :2399
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :2400
        kojo.骑乘位肛交 = 3; // :2400
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2402
        await era.printAndWait(`「痛、好疼、好痛啊……${sc()}已经不想再做了啊」`); // :2403
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :2404
        kojo.骑乘位肛交 = 2; // :2404
      } // :2405-2410
      return 0; // :2406-2410
    } // :2407-2410
  } // :2408-2410

  if (era_flag.selectcom == 37) {
    // :2413

    if (kojo.肛门侍奉 == 0) {
      // :2415

      if (era.get(`abl:${target}:16`) >= 3) {
        // :2417
        await era.printAndWait(`「竟然要我舔这么脏的地方……你真是变态呢」`); // :2418
      } else {
        // :2420-2421
        await era.printAndWait(`「讨、讨厌、竟然要我舔那种地方……呜呜～」`); // :2421
      } // :2422-2423
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :2423
      kojo.肛门侍奉 = 1; // :2423
      return 0; // :2424-2425
    } else {
      // :2426-2427

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2428
        await era.printAndWait(`「这样把舌头伸进肛门、你喜欢吗？」`); // :2429
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :2430
        kojo.肛门侍奉 = 5; // :2430
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2432
        await era.print(`「你的肛门……被${sc()}弄干净了哦♪」`); // :2433
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :2434
        kojo.肛门侍奉 = 4; // :2434
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2436
        await era.printAndWait(`「我知道了……舔就行了吧？　有好好洗过吗？」`); // :2437
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :2438
        kojo.肛门侍奉 = 3; // :2438
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :2440
        await era.printAndWait(`「呜呜……咕呜～、呜呜……」`); // :2441
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :2442
        kojo.肛门侍奉 = 2; // :2442
      } // :2443-2448
      return 0; // :2444-2448
    } // :2445-2448
  } // :2446-2448

  if (era_flag.selectcom == 40) {
    // :2451

    if (kojo.打屁股 == 0) {
      // :2453
      await era.printAndWait(`「呀啊～、好痛、住手～、饶了${sc()}吧！」`); // :2454
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :2455
      kojo.打屁股 = 1; // :2455
      return 0; // :2456-2457
    } else {
      // :2458-2459

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2460
        await era.printAndWait(
          `「啊啊～、再继续打吧♪　再多教育一下我这只淫乱受虐狂母猪吧♪　咿～～♪」`,
        ); // :2461
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :2462
        kojo.打屁股 = 5; // :2462
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2464
        await era.printAndWait(
          `「啊啊～、请再用力点打！　再更多的惩罚一下受虐狂母猪${target_name}吧～♪」`,
        ); // :2465
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :2466
        kojo.打屁股 = 4; // :2466
        return 0; // :2467-2468
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2469
        await era.printAndWait(`「啊啊～、咿～～、啊～～、咿啊～」`); // :2470
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :2471
        kojo.打屁股 = 3; // :2471
        return 0; // :2472-2473
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        // :2474
        await era.printAndWait(`「痛～、好痛啊～……${sc()}什么坏事也没做啊」`); // :2475
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :2476
        kojo.打屁股 = 2; // :2476
      } // :2477-2482
      return 0; // :2478-2482
    } // :2479-2482
  } // :2480-2482

  if (era_flag.selectcom == 41) {
    // :2485

    if (kojo.鞭 == 0) {
      // :2487

      if (era.get(`talent:${target}:76`) == 1) {
        // :2489
        await era.printAndWait(`「咿呀啊啊啊！　好有效～……」`); // :2490
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2492
        await era.printAndWait(`「咿呀啊～、咿呀啊～」`); // :2493
      } else {
        // :2495-2496
        await era.printAndWait(`「住手、住……呜啊啊！」`); // :2496
      } // :2497-2498
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :2498
      kojo.鞭 = 1; // :2498
      return 0; // :2499-2500
    } else {
      // :2501-2502

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2503
        await era.printAndWait(
          `「咿呀啊啊啊！　再来♪　再用力点♪　虐待我这只淫乱受虐狂母猪吧～～～♪」`,
        ); // :2504
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :2505
        kojo.鞭 = 9; // :2505
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2507
        await era.printAndWait(
          `「咿呀啊啊啊！　再来♪　再用力点♪　有感觉了～……♪」`,
        ); // :2508
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :2509
        kojo.鞭 = 8; // :2509
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2511
        await era.printAndWait(`「咿呀啊啊啊！　痛、好痛啊！」`); // :2512
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :2513
        kojo.鞭 = 7; // :2513
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2515
        await era.printAndWait(
          `「咿呀啊～！　再来！　再用力点！　来教育受虐狂母猪${target_name}吧～～～♪」`,
        ); // :2516
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :2517
        kojo.鞭 = 6; // :2517
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2519
        await era.printAndWait(
          `「咿呀啊～！　再来！　再用力点！　再多多教育我！」`,
        ); // :2520
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :2521
        kojo.鞭 = 5; // :2521
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2523
        await era.printAndWait(`「咿呀啊～！　痛、好痛啊……」`); // :2524
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :2525
        kojo.鞭 = 4; // :2525
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2527
        await era.printAndWait(`「再来！　再用力点！　再多多教育我！」`); // :2528
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :2529
        kojo.鞭 = 3; // :2529
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2531
        await era.printAndWait(`「住手、痛……好痛啊！」`); // :2532
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :2533
        kojo.鞭 = 2; // :2533
      } // :2534-2539
      return 0; // :2535-2539
    } // :2536-2539
  } // :2537-2539

  if (era_flag.selectcom == 42) {
    // :2542

    if (kojo.针 == 0) {
      // :2544

      if (era.get(`talent:${target}:76`) == 1) {
        // :2546
        await era.printAndWait(`「要刺哪里呢？　嗯？」`); // :2547
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2549
        await era.printAndWait(
          `「扑哧一下被刺进去、一想到这个、就好像要高潮了呢」`,
        ); // :2550
      } else {
        // :2552-2553
        await era.printAndWait(`「哈哈、注射什么的我早就习惯了」`); // :2553
      } // :2554-2555
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :2555
      kojo.针 = 1; // :2555
      return 0; // :2556-2557
    } else {
      // :2558-2559

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2560
        await era.printAndWait(
          `「刺进去后……使劲、捻动。这是${sc()}最喜欢做的哦♪」`,
        ); // :2561
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :2562
        kojo.针 = 9; // :2562
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2564
        await era.printAndWait(`「咕呜呜、一下子……刺进来了～」`); // :2565
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :2566
        kojo.针 = 8; // :2566
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2568
        await era.printAndWait(
          `「呜～……呜呜、看起来${sc()}的感觉还需要再开发呢……」`,
        ); // :2569
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :2570
        kojo.针 = 7; // :2570
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2572
        await era.printAndWait(
          `「感、感觉到了♪　${sc()}的身体正被冰冷的金属……穿凿着♪」`,
        ); // :2573
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :2574
        kojo.针 = 6; // :2574
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2576
        await era.printAndWait(`「嗯……啊～、进来了～」`); // :2577
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :2578
        kojo.针 = 5; // :2578
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2580
        await era.printAndWait(`「呜～、呜～……好痛～……」`); // :2581
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :2582
        kojo.针 = 4; // :2582
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2584
        await era.printAndWait(
          `「不行啊……这样下去……${sc()}的感觉要变的奇怪了～」`,
        ); // :2585
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :2586
        kojo.针 = 3; // :2586
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        // :2588
        await era.printAndWait(`「咿呀啊啊～！　咿、咿呀啊啊！」`); // :2589
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :2590
        kojo.针 = 2; // :2590
      } // :2591-2596
      return 0; // :2592-2596
    } // :2593-2596
  } // :2594-2596

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    // :2600

    if (kojo.眼罩 == 0) {
      // :2602

      if (era.get(`talent:${target}:76`) == 1) {
        // :2604
        await era.printAndWait(''); // :2605
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2607
        await era.printAndWait(''); // :2608
      } else {
        // :2610-2611
        await era.printAndWait(''); // :2611
      } // :2612-2613
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :2613
      kojo.眼罩 = 1; // :2613
      return 0; // :2614-2615
    } else {
      // :2616-2617

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2618
        await era.printAndWait(''); // :2619
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :2620
        kojo.眼罩 = 9; // :2620
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2622
        await era.printAndWait(''); // :2623
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :2624
        kojo.眼罩 = 8; // :2624
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2626
        await era.printAndWait(''); // :2627
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :2628
        kojo.眼罩 = 7; // :2628
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2630
        await era.printAndWait(''); // :2631
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :2632
        kojo.眼罩 = 6; // :2632
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2634
        await era.printAndWait(''); // :2635
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :2636
        kojo.眼罩 = 5; // :2636
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2638
        await era.printAndWait(''); // :2639
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :2640
        kojo.眼罩 = 4; // :2640
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2642
        await era.printAndWait(''); // :2643
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :2644
        kojo.眼罩 = 3; // :2644
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :2646
        await era.printAndWait(''); // :2647
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :2648
        kojo.眼罩 = 2; // :2648
      } // :2649-2652
      return 0; // :2650-2652
    } // :2651-2652
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    // :2653

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2655
      await era.printAndWait(''); // :2656
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :2657
      kojo.眼罩着脱 = 3; // :2657
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2659
      await era.printAndWait(''); // :2660
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :2661
      kojo.眼罩着脱 = 2; // :2661
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2663
      await era.printAndWait(''); // :2664
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :2665
      kojo.眼罩着脱 = 1; // :2665
    } // :2666-2670
    return 0; // :2667-2670
  } // :2668-2670

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    // :2674

    if (kojo.绳子 == 0) {
      // :2676

      if (era.get(`talent:${target}:76`) == 1) {
        // :2678
        await era.printAndWait(`「紧紧地绑上来吧♪」`); // :2679
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2681
        await era.printAndWait(`「我喜欢束缚的紧一点」`); // :2682
      } else {
        // :2684-2685
        await era.printAndWait(`「嗯……要来束缚这手吗」`); // :2685
      } // :2686-2687
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :2687
      kojo.绳子 = 1; // :2687
      return 0; // :2688-2689
    } else {
      // :2690-2691

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2692
        await era.printAndWait(
          `「哈……要怎么处理动不了的${sc()}呢？　我期待着呢？」`,
        ); // :2693
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :2694
        kojo.绳子 = 9; // :2694
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2696
        await era.printAndWait(
          `「呵呵、身体动不了了呢。好像触电一样麻痹的快感啊……」`,
        ); // :2697
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :2698
        kojo.绳子 = 8; // :2698
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2700
        await era.printAndWait(`「嗯、${sc()}的性癖还没开发到这方面……对不起」`); // :2701
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :2702
        kojo.绳子 = 7; // :2702
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2704
        await era.printAndWait(
          `「已经不论如何都逃不了了……这下${sc()}就是你的俘虏了♪」`,
        ); // :2705
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :2706
        kojo.绳子 = 6; // :2706
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2708
        await era.printAndWait(
          `「呵呵、身体动不了了呢。真是让人受不了的家伙呢、你啊」`,
        ); // :2709
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :2710
        kojo.绳子 = 5; // :2710
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2712
        await era.printAndWait(
          `「虽然我不知道绳子的好处……但是被你的话不管什么都很舒服」`,
        ); // :2713
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :2714
        kojo.绳子 = 4; // :2714
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2716
        await era.printAndWait(`「呵呵、身体动不了了呢……好为难好为难」`); // :2717
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :2718
        kojo.绳子 = 3; // :2718
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        // :2720
        await era.printAndWait(`「只是被束缚住而已、早就习惯了」`); // :2721
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :2722
        kojo.绳子 = 2; // :2722
      } // :2723-2726
      return 0; // :2724-2726
    } // :2725-2726
  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) {
    // :2727

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2729
      await era.printAndWait(`「已经结束了吗♪」`); // :2730
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2731
      kojo.绳子着脱 = 2; // :2731
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2733
      await era.printAndWait(`「明明直到最后都束缚住我就好了呢」`); // :2734
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2735
      kojo.绳子着脱 = 2; // :2735
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2737
      await era.printAndWait(`「已经够了吗？」`); // :2738
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :2739
      kojo.绳子着脱 = 1; // :2739
    } // :2740-2744
    return 0; // :2741-2744
  } // :2742-2744

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    // :2748

    if (kojo.口塞 == 0) {
      // :2750

      if (era.get(`talent:${target}:76`) == 1) {
        // :2752
        await era.printAndWait(`「呼咕呜♪　呼呜、呼呜呜～～♪」`); // :2753
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2754
        await era.printAndWait(`「呼嘎、呼咕呜……呼咕♪」`); // :2755
      } else {
        // :2757-2758
        await era.printAndWait(`「嘎呼～……呼咕～……呼嘎啊！」`); // :2758
      } // :2759-2760
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :2760
      kojo.口塞 = 1; // :2760
      return 0; // :2761-2762
    } else {
      // :2763-2764

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2765
        await era.printAndWait(`「噗呼呜♪　呼咕呜……呼苟、噗呼呜♪」`); // :2766
        await era.printAndWait(`欢喜的${target_name}像猪一样喘息着`); // :2767
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :2768
        kojo.口塞 = 9; // :2768
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2770
        await era.printAndWait(`「噗咕呜、呼咕呜……呼苟、噗呼呜♪」`); // :2771
        await era.printAndWait(`${target_name}像猪一样喘息着`); // :2772
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :2773
        kojo.口塞 = 8; // :2773
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2775
        await era.printAndWait(`「呼咕呜♪　呼呜、呼呜呜～～♪」`); // :2776
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :2777
        kojo.口塞 = 7; // :2777
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2779
        await era.printAndWait(`「哈呼呜♪　哈咕呜……呼呜、哈呼呜♪」`); // :2780
        await era.printAndWait(`欢喜的${target_name}激动的喘息着`); // :2781
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :2782
        kojo.口塞 = 6; // :2782
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2784
        await era.printAndWait(`「哈呼呜、哈呼呜……呼呜、哈咕呜♪」`); // :2785
        await era.printAndWait(`${target_name}开心的喘息着`); // :2786
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :2787
        kojo.口塞 = 5; // :2787
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2789
        await era.printAndWait(`「呼嘎、呼咕呜……呼咕♪」`); // :2790
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :2791
        kojo.口塞 = 4; // :2791
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2793
        await era.printAndWait(`「呼嘎、呼咕呜……呼咕♪」`); // :2794
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :2795
        kojo.口塞 = 3; // :2795
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        // :2797
        await era.printAndWait(`「嘎呼～……呼咕呜……呼嘎啊！」`); // :2798
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :2799
        kojo.口塞 = 2; // :2799
      } // :2800-2803
      return 0; // :2801-2803
    } // :2802-2803
  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) {
    // :2804

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2806
      await era.printAndWait(`「噗哈啊……。已、已经结束了吗？」`); // :2807
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :2808
      kojo.口塞着脱 = 3; // :2808
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2810
      await era.printAndWait(`「哈呼呜……好辛苦呢」`); // :2811
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :2812
      kojo.口塞着脱 = 2; // :2812
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2814
      await era.printAndWait(`「哈啊哈啊……唔、真是屈辱啊」`); // :2815
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :2816
      kojo.口塞着脱 = 1; // :2816
    } // :2817-2821
    return 0; // :2818-2821
  } // :2819-2821

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    // :2825

    if (kojo.灌肠肛塞 == 0) {
      // :2827

      if (era.get(`talent:${target}:76`) == 1) {
        // :2829
        await era.printAndWait(''); // :2830
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2832
        await era.printAndWait(''); // :2833
      } else {
        // :2835-2836
        await era.printAndWait(''); // :2836
      } // :2837-2838
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :2838
      kojo.灌肠肛塞 = 1; // :2838
      return 0; // :2839-2840
    } else {
      // :2841-2842

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2843
        await era.printAndWait(''); // :2844
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :2845
        kojo.灌肠肛塞 = 7; // :2845
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2847
        await era.printAndWait(''); // :2848
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :2849
        kojo.灌肠肛塞 = 6; // :2849
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2851
        await era.printAndWait(''); // :2852
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :2853
        kojo.灌肠肛塞 = 5; // :2853
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2855
        await era.printAndWait(''); // :2856
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :2857
        kojo.灌肠肛塞 = 4; // :2857
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2859
        await era.printAndWait(''); // :2860
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :2861
        kojo.灌肠肛塞 = 3; // :2861
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        // :2863
        await era.printAndWait(''); // :2864
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :2865
        kojo.灌肠肛塞 = 2; // :2865
      } // :2866-2871
      return 0; // :2867-2871
    } // :2868-2871
  } // :2869-2871

  if (era_flag.selectcom == 55) {
    // :2874

    if (kojo.放置PLAY == 0) {
      // :2876

      if (era.get(`talent:${target}:85`) == 1) {
        // :2878
        await era.printAndWait(''); // :2879
      } else {
        // :2881-2882
        await era.printAndWait(''); // :2882
      } // :2883-2884
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :2884
      kojo.放置PLAY = 1; // :2884
      return 0; // :2885-2886
    } else {
      // :2887-2888

      if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= era.get('palamlv:3') &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2889
        await era.printAndWait(''); // :2890
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :2891
        kojo.放置PLAY = 4; // :2891
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2893
        await era.printAndWait(''); // :2894
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :2895
        kojo.放置PLAY = 3; // :2895
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        // :2897
        await era.printAndWait(''); // :2898
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :2899
        kojo.放置PLAY = 2; // :2899
      } // :2900-2905
      return 0; // :2901-2905
    } // :2902-2905
  } // :2903-2905

  if (era_flag.selectcom == 56) {
    // :2909

    if (kojo.交谈 == 0) {
      // :2911
      if (era.get(`tequip:${target}:53`)) {
        // :2912

        if (era.get(`talent:${target}:76`) == 1) {
          // :2915
          await era.printAndWait(
            `「初次见面、我是前勇者${target_name}哦。很感谢大家今天的收看」`,
          ); // :2916
          await era.printAndWait(
            `「${sc()}现在已经对拯救世界啊、为了大家而战啊、等诸如此类的事物没有兴趣了」`,
          ); // :2917
          await era.printAndWait(
            `「现在${sc()}最大的兴趣爱好是、如何最舒服的做爱的方法」`,
          ); // :2918
          await era.printAndWait(
            `「这个身体将会产生怎样的淫乱变化呢、希望大家从现在开始好好看着哦」`,
          ); // :2919
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          ); // :2920
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2922
          await era.printAndWait(
            `「初次见面、我是前勇者${target_name}哦。很感谢大家今天的收看」`,
          ); // :2923
          await era.printAndWait(
            `「${sc()}现在已经对拯救世界啊、与邪恶战斗啊、等诸如此类的事物没有兴趣了」`,
          ); // :2924
          await era.printAndWait(
            `「现在${sc()}最大的兴趣爱好是、用这个肉体孕育魔王的孩子」`,
          ); // :2925
          await era.printAndWait(
            `「用这个身体孕育爱的结晶的姿态……希望你们好好看着吧」`,
          ); // :2926
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          ); // :2927
        } else {
          // :2929-2930
          await era.printAndWait(''); // :2930
        } // :2931-2933
      } else {
        // :2932-2933

        if (era.get(`talent:${target}:76`) == 1) {
          // :2934
          await era.printAndWait(''); // :2935
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2937
          await era.printAndWait(''); // :2938
        } else {
          // :2940-2941
          await era.printAndWait(''); // :2941
        } // :2942-2944
      } // :2943-2944
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :2944
      kojo.交谈 = 1; // :2944
      return 0; // :2945-2946
    } else {
      // :2947-2948
      if (era.get(`tequip:${target}:53`)) {
        // :2948

        if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :2951
          await era.printAndWait(
            `「又见面了呢？　我是肉奴隶${target_name}哦。一直以来多谢关照」`,
          ); // :2952
          await era.printAndWait(
            `「${sc()}的肉体将被培养成什么样呢、最近感觉越来越淫乱了呢」`,
          ); // :2953
          await era.printAndWait(
            `「能感受到最高快乐的魔之性爱、今天也要开始研究了哦」`,
          ); // :2954
          await era.printAndWait(
            `「这个身体将会产生怎样的淫乱变化呢、希望大家从现在开始好好看着哦」`,
          ); // :2955
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          ); // :2956
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :2957
          kojo.交谈 = 4; // :2957
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :2959
          await era.printAndWait(
            `「又见面了呢？　我是爱奴隶${target_name}哦。一直以来多谢关照」`,
          ); // :2960
          await era.printAndWait(
            `「为了最美妙的怀孕、今天也要为生孩子而做爱呢……呐？」`,
          ); // :2961
          await era.printAndWait(
            `「单单是想象这卑微的身体怀上魔王的孩子的时候……哈啊、好像就要高潮了呢」`,
          ); // :2962
          await era.printAndWait(
            `「用这个身体孕育爱的结晶的姿态……希望你们好好看着吧」`,
          ); // :2963
          await era.printAndWait(
            `${target_name}一边这样说着一边煽情地舒展着身体……`,
          ); // :2964
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :2965
          kojo.交谈 = 3; // :2965
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :2967
          await era.printAndWait(''); // :2968
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :2969
          kojo.交谈 = 2; // :2969
        } // :2970-2972
      } else {
        // :2971-2972

        if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :2973
          await era.printAndWait(''); // :2974
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :2975
          kojo.交谈 = 4; // :2975
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :2977
          await era.printAndWait(''); // :2978
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :2979
          kojo.交谈 = 3; // :2979
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :2981
          await era.printAndWait(''); // :2982
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :2983
          kojo.交谈 = 2; // :2983
        } // :2984-2989
      } // :2985-2989
      return 0; // :2986-2989
    } // :2987-2989
  } // :2988-2989

  return 0;
}

module.exports = {
  k12_kojo2,
  kojo_message_com_12,
  STUBBED_CALLS,
};
