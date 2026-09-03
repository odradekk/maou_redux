/* eslint-disable no-irregular-whitespace, no-dupe-else-if */
/**
 * @file 庇护者性格口上 K13：EVENTTRAIN 存在标志 + 主体（issue #244）。
 *
 * 源: target/ERB/口上/EVENT_K13_庇護者.ERB  @EVENTTRAIN #PRI（:71-75，存在
 *     标志 FLAG:113）@EVENTEND #LATER（:77-79，清标志）@K13_KOJO2（:324-432，
 *     二回目以降调教开始）@KOJO_MESSAGE_COM_13（:536-3635，指令口上状态机）
 *     @DOG_KOJO_13（:3637-4440）@KOJO_MESSAGE_PALAMCNG_13（:4442-4638）
 *     @KOJO_MESSAGE_SYASEI_13（:4640-4686）@KOJO_MESSAGE_MARKCNG_13
 *     （:4688-4749）@SELF_KOJO_K13（:4751-4998）以及迷宫/死斗场/NTR/处刑/
 *     奖惩口上（:5000-5998）。
 *
 * == 头部守卫（KOJO_MESSAGE_COM_13，与模板七条不同） ==
 *
 * ①TEQUIP:45 && SELECTCOM!=45 → return 0；②TFLAG:899（失神）→ return 0；
 * ③TEQUIP:89 → CALL DOG_KOJO_13, return 0；④TEQUIP:55 → CALL
 * COLOSSEUM_KOJO_13, return 0。ASSI 守卫源 :538-539 整行注释；TALENT:9 与
 * TEQUIP:90 本函数不读——按源文 1:1。
 *
 * == 原作缺陷 1:1 保留 ==
 *
 * EVENTTRAIN 屈服Lv2/Lv3/淫乱的 `TALENT:157 && TALENT:110 || TALENT:114 ||
 * TALENT:119` 先 AND 后 OR；EVENTEND 淫乱体力>=500 臂无 RETURN 1。
 *
 * 这张票存根（docs/stub-registry.md）：`SELL_MATURO_K0`（成熟出售口上，
 * 随售却票）。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  kojo_message_com_family,
  self_kojo_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  benki_koujo_family,
  enterenemy_koujo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  ntr_koujo_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
  gobi_koujo_family,
} = require('#/kojo/kojo-system');
const { heart, self_call } = require('#/kojo/kojo-text');
const { get_look_info } = require('#/kojo/kojo-dungeon-bitch-log');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');
const {
  peek_aftertrain_q,
  peek_aftertrain_s,
} = require('#/event/event-aftertrain');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');

const STUBBED_CALLS = ['SELL_MATURO_K0'];

/** 读未声明的序号返回 undefined 而非 0（#13），口上条件一律 || 0 兜底 */
const era0 = (k) => era.get(k) || 0;

function bind_ctx(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = assi >= 0 ? chara_callname(assi) : ''; // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %NAME:MASTER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const kojo = chara(target).kojo;
  return {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    kojo,
  };
}

// @EVENTTRAIN #PRI（:71-75）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_13 = 1; // :73 FLAG:113 = 1（K13 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :75
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:77-79）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_13 = 0; // :79
  },
  TIER.LATER,
);

// @EVENTTRAIN // :71
// @EVENTTRAIN // :85
async function eventtrain_k13(rand) {
  const { rand_n, target, target_name, master_name, sc, kojo } = bind_ctx(rand);
  if (game.kojo.口上开关 <= 0) {
    // :87
    return 0; // :87
  } // :87
  if (era0(`talent:${target}:173`) != 1) {
    // :89
    return 0; // :89
  } // :89

  if (kojo.初调教 == 0) {
    // :94
    era.drawLine(); // :95

    if (rand_n(2) == 0 && era0(`talent:${target}:157`)) {
      // :97

      await era.printAndWait(`「哎呀哎呀、怎么办呢」`); // :99

      if (
        era0(`talent:${target}:200`) == 1 ||
        era0(`talent:${target}:205`) == 1
      ) {
        // :101
        await era.printAndWait(`「既然被没收了武器就没没办法了了」`); // :102
      } else if (
        era0(`talent:${target}:201`) == 1 ||
        era0(`talent:${target}:206`) == 1
      ) {
        // :104
        await era.printAndWait(`「居然将${sc()}给抓住了什么的……」`); // :105
      } else if (
        era0(`talent:${target}:202`) == 1 ||
        era0(`talent:${target}:207`) == 1
      ) {
        // :107
        await era.printAndWait(`「这可真是遇上了危机呢」`); // :108
      } else if (
        era0(`talent:${target}:203`) == 1 ||
        era0(`talent:${target}:208`) == 1
      ) {
        // :110
        await era.printAndWait(`「请饶恕${sc()}好吗？」`); // :111
      } // :112

      if (rand_n(2) == 0) {
        // :114
        await era.printAndWait(
          `被俘虏的${target_name}歪歪脑袋显出一副镇定沉着的模样。`,
        ); // :115
      } else {
        // :116
        await era.printAndWait(`${target_name}用手托腮、一副镇定沉着的模样。`); // :117
      } // :118
    } else {
      // :119
      await era.printAndWait(`「哎呀哎呀、${sc()}还是被抓住了呢」`); // :120
      await era.printAndWait(
        `「要是对做${sc()}一直以来那种过分的事、${sc()}可不会原谅哦」`,
      ); // :121
      await era.printAndWait(`「现在停手还来得及。再考虑考虑吧」`); // :122
      if (era0(`talent:${target}:157`)) {
        // :124
        await era.printAndWait(`（亲爱的……无论如何都得回到你身边啊）`); // :124
      } // :124
    } // :125
    // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :126
    kojo.初调教 = 1; // :126
    return 1; // :127
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 == 1) {
    // :131
    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {
      // :132
      era.drawLine(); // :133
      await era.printAndWait(`「呜呜……请原谅我。${sc()}一度背叛了您」`); // :134
      await era.printAndWait(`「之前的事情${sc()}请让它就这样过去吧……」`); // :135
      await era.printAndWait(`「今后我会竭尽全力的服侍您的……」`); // :136

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :138
      kojo.NTR再捕获 = 0; // :138
    } else {
      // :139
      era.drawLine(); // :140
      await era.printAndWait(`「呜呜……${sc()}请原谅我……」`); // :141
      await era.printAndWait(`「今后我会竭尽全力的服侍您的……」`); // :142
      if (era0(`talent:${target}:157`)) {
        // :144
        await era.printAndWait(`（亲爱的……无论如何都得回到你身边）`); // :144
      } // :144

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :146
      kojo.NTR再捕获 = 0; // :146
    } // :147
    return 1; // :148
  } else if (kojo.初调教 < 2 && era0(`mark:${target}:2`) == 1) {
    // :153
    era.drawLine(); // :154
    if (era0(`talent:${target}:157`)) {
      // :155
      await era.printAndWait(
        `「哎呀哎呀、打算用这种野蛮的方式来让${sc()}就范吗」`,
      ); // :156
      await era.printAndWait(`「那种方法根本没法让${sc()}动摇的」`); // :157
      await era.printAndWait(`「而且呢……${sc()}早就、将身体献给那个人了」`); // :158

      if (
        era0(`talent:${target}:110`) ||
        era0(`talent:${target}:114`) ||
        era0(`talent:${target}:119`)
      ) {
        // :163
        await era.printAndWait(
          `${target_name}一副从容不迫的模样、抖动着傲人的双峰、`,
        ); // :164
      } else {
        // :165
        await era.printAndWait(
          `${target_name}一副从容不迫的模样、轻抚着平坦的胸部、`,
        ); // :166
      } // :167
      await era.printAndWait(`微笑着摩挲无名指上的订制戒指。`); // :168
    } else {
      // :169
      await era.printAndWait(`「比起那些、来做点有意义的事如何」`); // :170
    } // :171
    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :172
    kojo.初调教 = 2; // :172
    return 1; // :173
  } else if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
    // :176
    era.drawLine(); // :177
    if (
      (era0(`talent:${target}:157`) && era0(`talent:${target}:110`)) ||
      era0(`talent:${target}:114`) ||
      era0(`talent:${target}:119`)
    ) {
      // :178
      await era.printAndWait(
        `「呼呵呵……就承认这段时间${sc()}的心稍微有些动摇了吧」`,
      ); // :179
      await era.printAndWait(
        `「但是呢、就算是支配了身体也夺不走${target_name}的心哦」`,
      ); // :180
      await era.printAndWait(
        `「就这样放弃吧？、这样做的话对你和${target_name}都不会有什么损失」`,
      ); // :181
      await era.printAndWait(
        `${target_name}劝导似的凝视着${master_name}的瞳孔……`,
      ); // :182
    } else {
      // :183
      await era.printAndWait(`「${sc()}是……绝对不会被你支配的！」`); // :184
      await era.printAndWait(`「绝对……${sc()}绝对是不会输的！」`); // :185
      await era.printAndWait(`「继续做这种事也是一点意义都没有的明白了吗！」`); // :186
      await era.printAndWait(`${target_name}毅然决然地放出了这样的宣言。`); // :187
      if (era0(`talent:${target}:157`)) {
        // :189
        await era.printAndWait(`（这可…如何是好…救救${sc()}……吧……亲爱的……）`); // :189
      } // :189
    } // :190
    // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :191
    kojo.初调教 = 3; // :191
    return 1; // :192
  } else if (
    kojo.初调教 < 4 &&
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :194
    era.drawLine(); // :195
    if (
      (era0(`talent:${target}:157`) && era0(`talent:${target}:110`)) ||
      era0(`talent:${target}:114`) ||
      era0(`talent:${target}:119`)
    ) {
      // :196
      await era.printAndWait(`「哎呀哎呀……又来了啊」`); // :197
      await era.printAndWait(`「这么火热的话${sc()}也……」`); // :198
      await era.printAndWait(`「没…没什么、嗯呼呼……那么、今天也来做吧？」`); // :199
      await era.printAndWait(`${sc()}露出了和初次造访时完全不同的女人的表情`); // :200
      await era.printAndWait(`将自己交给了${master_name}`); // :201
    } else {
      // :202
      await era.printAndWait(`「您是……主人、${sc()}向您屈服……」`); // :203
      await era.printAndWait(`「所以……${sc()}不会再做、无谓的反抗了……」`); // :204
      await era.printAndWait(`「什么都……什么都会做的……」`); // :205
      if (era0(`talent:${target}:157`)) {
        // :206
        await era.printAndWait(`（对不起了……亲爱的……${sc()}……已经……）`); // :207
      } // :208
    } // :209
    // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :210
    kojo.初调教 = 4; // :210
    return 1; // :211
  } else if (
    kojo.初调教 < 5 &&
    era0(`talent:${target}:76`) == 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :214
    era.drawLine(); // :215
    if (
      (era0(`talent:${target}:157`) && era0(`talent:${target}:110`)) ||
      era0(`talent:${target}:114`) ||
      era0(`talent:${target}:119`)
    ) {
      // :216
      await era.printAndWait(`「唔呼呼${heart(1)}……」`); // :217
      await era.printAndWait(`「将${sc()}的身体染上您的颜色吧」`); // :218
      await era.printAndWait(
        `「无论是怎样的精英始终只是个女人、这副身体终于明白淫乱之乐了」`,
      ); // :219
      await era.printAndWait(`「那么……请下令吧、主人大人${heart(3)}」`); // :220
    } else {
      // :221
      await era.printAndWait(`「让${sc()}变得这么淫荡……真是十分感谢」`); // :222
      await era.printAndWait(
        `「作为一个女人……不、作为一条母狗、总算找回了些自信……」`,
      ); // :223
      await era.printAndWait(`「今后也请您……好好地疼爱这条母狗哦……♪」`); // :224
      if (era0(`talent:${target}:157`)) {
        // :225
        await era.printAndWait(
          `「那个人的事怎样都行了啦……快把大鸡巴交出来就行啦」`,
        ); // :226
      } // :227
    } // :228
    // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :229
    kojo.初调教 = 5; // :229
    return 1; // :230
  } else if (kojo.初调教 < 6 && era0(`talent:${target}:85`) == 1) {
    // :233
    era.drawLine(); // :234

    await era.printAndWait(
      `「嘻嘻、${sc()}想${sc()}现在找到了${sc()}的真爱了……谢谢您」`,
    ); // :248
    await era.printAndWait(
      `「作为一个女人……之前的${sc()}竟然忘记了恋爱的感觉」`,
    ); // :249
    await era.printAndWait(`「以后……可要好好地疼爱${sc()}哟……♪」`); // :250

    // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :252
    kojo.初调教 = 6; // :252
    return 1; // :253
  } else if (era_flag.assi < 0) {
    // :256
    await k13_kojo2(rand); // :257 CALL K13_KOJO2
  } else {
    // :316
    await k13_kojo2(rand); // :317 CALL K13_KOJO2
  } // :318
}

// @K13_KOJO2 // :324
async function k13_kojo2(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);

  if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    // :326
    era.drawLine(); // :327
    await era.printAndWait(`「哎呀哎呀、垃圾你在往哪看呢、说你呢」`); // :328
    await era.printAndWait(`「赶紧从${sc()}的眼前消失」`); // :329
    await era.printAndWait(`「看到你、${sc()}饭都吃不下去了……」`); // :330
    if (era0(`talent:${target}:157`)) {
      // :332
      await era.printAndWait(`（亲爱的……${sc()}绝对不会忘记你的……请你再等等）`); // :332
    } // :332
    return 1; // :333
  } else if (era0(`mark:${target}:2`) == 0 && game.kojo.口上开关 == 2) {
    // :336
    era.drawLine(); // :337
    if (rand_n(2) == 0) {
      // :338
      await era.print(`「又开始要做什么了吗？」`); // :339
      await era.print(`「无论对${sc()}做什么都一样的、没用的」`); // :340
      await era.printAndWait(`「所以说、还是放弃这种事吧……」`); // :341
    } else {
      // :342
      await era.printAndWait(`「你想说些什么吗？」`); // :343
      await era.printAndWait(`「无论对${sc()}做什么都一样的、无用功而已呦」`); // :344
      await era.printAndWait(`「所以说……还是放弃这种事吧」`); // :345
    } // :346
    if (era0(`talent:${target}:157`)) {
      // :347
      if (rand_n(3) == 0) {
        // :348
        await era.printAndWait(`（亲爱的……${sc()}绝对不会输的……）`); // :349
      } else if (rand_n(2) == 0) {
        // :350
        await era.printAndWait(`（亲爱的……${sc()}会在远方坚强地继续作战的……）`); // :351
      } else {
        // :352
        await era.printAndWait(`（亲爱的……还家里等着${sc()}回去呢……）`); // :353
      } // :354
    } // :355
    return 1; // :356
  } else if (era0(`mark:${target}:2`) == 1 && game.kojo.口上开关 == 2) {
    // :359
    era.drawLine(); // :360
    if (rand_n(2) == 0) {
      // :361
      await era.print(`「还是、不肯死心对吧」`); // :362
      await era.print(`「${sc()}是绝对不会屈服的」`); // :363
      await era.printAndWait(`「来吧……怎么喜欢怎么来好了」`); // :364
    } else {
      // :365
      await era.printAndWait(`「啧……今天也来了。好吧」`); // :366
      await era.printAndWait(
        `「无论对${sc()}做什么都一样的、没用的……已经说过了吧！」`,
      ); // :367
      await era.printAndWait(`「而且、${sc()}是不会屈服的……」`); // :368
    } // :369
    if (era0(`talent:${target}:157`)) {
      // :371
      await era.printAndWait(`（亲爱的……请赐予${sc()}勇气吧……）`); // :371
    } // :371
    return 1; // :372
  } else if (era0(`mark:${target}:2`) == 2 && game.kojo.口上开关 == 2) {
    // :375
    era.drawLine(); // :376
    await era.printAndWait(`「难道……就这样结束了吗……」`); // :377
    await era.printAndWait(`「${sc()}快……不、没什么的」`); // :378
    await era.printAndWait(
      `「不管遇上多么残酷的事情、${sc()}也决不能放弃的……」`,
    ); // :379
    if (era0(`talent:${target}:157`)) {
      // :381
      await era.printAndWait(`（老公……${sc()}快要坚持不住了……请给我力量吧）`); // :381
    } // :381
    return 1; // :382
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0 &&
    era0(`talent:${target}:76`) == 0 &&
    game.kojo.口上开关 == 2
  ) {
    // :385
    era.drawLine(); // :386
    await era.printAndWait(`「哈啊…哈啊…不行了……已经极限了……」`); // :387
    await era.printAndWait(`「${sc()}确实……小看你的能耐了」`); // :388
    await era.printAndWait(`「还请……不要再对${sc()}做了更过分的事了……」`); // :389
    if (era0(`talent:${target}:157`)) {
      // :391
      await era.printAndWait(`（老公……${sc()}已经……对不起……但……）`); // :391
    } // :391
    return 1; // :392
  } else if (era0(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    // :395
    era.drawLine(); // :396

    if (rand_n(3) == 0) {
      // :398
      await era.printAndWait(`「恭候您的光临……今天也能好好地疼爱${sc()}吗？」`); // :399
      await era.printAndWait(
        `「${sc()}看到您的一瞬间……${sc()}的下面早已经湿透了」`,
      ); // :400
      await era.printAndWait(`「请您……将${sc()}变得更加淫荡吧…」`); // :401
    } else if (rand_n(2) == 0) {
      // :402
      await era.printAndWait(`「哎呀、来了啊……${sc()}一直在期待您的光临」`); // :403
      await era.printAndWait(
        `「光是想到今天要对${sc()}做的褒赏之事……身体就发热了」`,
      ); // :404
      await era.printAndWait(`「请您……仔细品尝${sc()}的身体……」`); // :405
    } else {
      // :406
      await era.printAndWait(`「欢迎光临……想要今天的奖励都想到身子发热了」`); // :407
      await era.printAndWait(
        `「在这里等待的时候……${sc()}快要被心中的欲火烧成灰了」`,
      ); // :408
      await era.printAndWait(
        `「请您……赐给${sc()}的身体如燎原之火一般的激情吧……」`,
      ); // :409
    } // :410
    return 1; // :411
  } else if (era0(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    // :414
    era.drawLine(); // :415

    if (rand_n(3) == 0) {
      // :417
      await era.printAndWait(`「回来了啊……今天的工作结束了吗？」`); // :418
      await era.printAndWait(`「${sc()}……一直在等着您」`); // :419
      await era.printAndWait(`「来吧……请与${sc()}交合吧……」`); // :420
    } else if (rand_n(2) == 0) {
      // :421
      await era.printAndWait(
        `「今天也按时回来了呢……今天的工作让您很累的样子」`,
      ); // :422
      await era.printAndWait(`「${sc()}一直……想念着您」`); // :423
      await era.printAndWait(`「来吧……请与${sc()}交合吧……」`); // :424
    } else {
      // :425
      await era.printAndWait(`「今天也按时回来了呢……今天的工作很累的样子」`); // :426
      await era.printAndWait(`「${sc()}一直……想念着您」`); // :427
      await era.printAndWait(`「来吧……请让${sc()}来帮您消除疲劳吧……」`); // :428
    } // :429
    return 1; // :430
  } // :431
  return 0; // :432
}

// @EVENTEND // :438
async function eventend_k13(rand) {
  const { rand_n, target, target_name, sc, kojo } = bind_ctx(rand);
  if (game.kojo.口上开关 <= 0) {
    // :440
    return 0; // :440
  } // :440
  if (era0(`talent:${target}:173`) != 1) {
    // :442
    return 0; // :442
  } // :442

  if (era0(`base:${target}:0`) <= 0) {
    // :446
    return 0; // :446
  } // :446

  if (era0(`mark:${target}:3`) == 3 && era0(`talent:${target}:85`) == 0) {
    // :452
    era.drawLine(); // :453
    await era.printAndWait(`「真像秽物辣鸡干的事呢」`); // :454
    await era.printAndWait(`「${sc()}恶心的快要吐了」`); // :455
    await era.printAndWait(`「真是、受够了……」`); // :456
    if (era0(`talent:${target}:157`)) {
      // :458
      await era.printAndWait(`（亲爱的……${sc()}绝对不会忘记你的……请你再等等）`); // :458
    } // :458
    return 1; // :459
  } else if (
    era0(`mark:${target}:2`) <= 1 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :462
    era.drawLine(); // :463
    if (rand_n(3) == 0) {
      // :464
      await era.print(`「这就结束了吗」`); // :465
      await era.printAndWait(`「这种事情再多都只是无用功而已……」`); // :466
    } else if (rand_n(2) == 0) {
      // :467
      await era.print(`「终于结束了……」`); // :468
      await era.printAndWait(`「还是不肯就此罢手吗……」`); // :469
    } else {
      // :470
      await era.printAndWait(`「已经结束了吗」`); // :471
      await era.printAndWait(`「无论对${sc()}做什么、都是没用的」`); // :472
      await era.printAndWait(`「所以、这种事情还是快停下来吧……」`); // :473
    } // :474
    if (era0(`talent:${target}:157`)) {
      // :476
      await era.printAndWait(`（亲爱的……${sc()}还在遥远的地方为你战斗着……）`); // :476
    } // :476
    return 1; // :477
  } else if (
    era0(`mark:${target}:2`) == 2 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :480
    era.drawLine(); // :481
    if (kojo.初调教 < 3 && era0(`mark:${target}:2`) == 2) {
      // :482
      await era.print(`「才没有……绝对没有那样的事……」`); // :483
      await era.printAndWait(`「${sc()}绝对不会如你所愿的」`); // :484
      await era.printAndWait(`${target_name}背对着你穿起了衣服。`); // :485
    } else {
      // :486
      await era.print(`「哈啊…哈啊…终于结束了吗」`); // :487
      await era.print(`「无论对${sc()}做什么都一样的、没用的……早说了吧！」`); // :488
      await era.printAndWait(`「${sc()}还、还没放弃呢……」`); // :489
    } // :490
    if (era0(`talent:${target}:157`)) {
      // :492
      await era.printAndWait(`（亲爱的……请赐给${sc()}勇气吧……）`); // :492
    } // :492
    return 1; // :493
  } else if (
    era0(`mark:${target}:2`) == 3 &&
    era0(`talent:${target}:85`) == 0
  ) {
    // :496
    era.drawLine(); // :497
    await era.printAndWait(`「哈啊、哈啊……我要不行了……要去了……」`); // :498
    await era.printAndWait(`「${sc()}确实……小看你的能耐了」`); // :499
    await era.printAndWait(`「还请……不要再对${sc()}做了更过分的事了……」`); // :500
    if (era0(`talent:${target}:157`)) {
      // :502
      await era.printAndWait(`（亲爱的……${sc()}已经……对不起……）`); // :502
    } // :502
    return 1; // :503
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // :506
    era.drawLine(); // :507
    await era.printAndWait(`「哎呀、已经结束了哎……明天也请您多多关照了……♪」`); // :508
    await era.printAndWait(`「${sc()}会翘首以待的♪」`); // :509
  } else if (
    era0(`talent:${target}:76`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // :511
    era.drawLine(); // :512
    await era.printAndWait(`「今天尽情的做爱了……${sc()}真是太满足了♪」`); // :513
    await era.printAndWait(`「明天也要精力充沛地和${sc()}相好啊、等着您哦♪」`); // :514
    return 1; // :515
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) >= 500
  ) {
    // :518
    era.drawLine(); // :519
    await era.printAndWait(`「今天辛苦您了……？　调教、谢谢您♪」`); // :520
    await era.printAndWait(`「${sc()}期待着下次的调教哦♪」`); // :521
    return 1; // :522
  } else if (
    era0(`talent:${target}:85`) == 1 &&
    era0(`base:${target}:0`) <= 500
  ) {
    // :524
    era.drawLine(); // :525
    await era.printAndWait(`「今天好激烈啊……${sc()}真是太满足了♪」`); // :526
    await era.printAndWait(`「难道是累了吗……？　随时可以过来找${sc()}哦♪」`); // :527
    return 1; // :528
  } // :529
  return 0; // :530
}

// @KOJO_MESSAGE_COM_13 // :536
async function kojo_message_com_13(rand) {
  const { rand_n, target, target_name, sc, kojo } = bind_ctx(rand);

  const clitoris_word = (cid) =>
    era0(`talent:${cid}:122`) !== 0 ? '阴茎' : '阴核';
  let P = 0;

  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    // :542
    return 0; // :542
  } // :542

  if (game.train.失神) {
    // :545
    return 0; // :545
  } // :545

  if (era0(`tequip:${target}:89`)) {
    // :547
    await dog_kojo_13(rand_n); // :548 CALL DOG_KOJO_13
    return 0; // :549
  } // :550

  if (era0(`tequip:${target}:55`)) {
    // :552
    await colosseum_kojo_13(rand_n); // :553 CALL COLOSSEUM_KOJO_13
    return 0; // :554
  } // :555

  if (era_flag.selectcom == 0) {
    // :563

    if (kojo.爱抚 == 0) {
      // :565

      if (era0(`mark:${target}:2`) >= 2) {
        // :567
        await era.printAndWait(`「噫、再这样摸下去的话……不行了！」`); // :568
        if (era0(`talent:${target}:157`)) {
          // :570
          await era.printAndWait(`（那个人……都没让我尝试过这样激烈的前戏……）`); // :570
        } // :570
      } else {
        // :572
        await era.printAndWait(`「左右搓揉着……${sc()}什么都感觉不到」`); // :573
        if (era0(`talent:${target}:157`)) {
          // :575
          await era.printAndWait(`（那个人……都没让我尝试过这样激烈的前戏……）`); // :575
        } // :575
      } // :576
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :577
      kojo.爱抚 = 1; // :577
      return 0; // :578
    } else {
      // :580

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :582
        await era.printAndWait(`「啊、啊……快点让${sc()}的身子燃烧起来吧……♪」`); // :583
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :584
        kojo.爱抚 = 6; // :584
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :586
        await era.printAndWait(`「请用力地抚弄${sc()}……还要……♪」`); // :587

        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :590
        kojo.爱抚 = 5; // :590
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :592
        await era.printAndWait(`「啊、啊……要去了……只是被摸而已……」`); // :593
        if (era0(`talent:${target}:157`)) {
          // :595
          await era.printAndWait(
            `（这么强烈的快感……那个人的事情……似乎要忘记了）`,
          ); // :595
        } // :595
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :596
        kojo.爱抚 = 4; // :596
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :598
        await era.printAndWait(`「手法还挺……熟练的嘛？」`); // :599
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :600
        kojo.爱抚 = 3; // :600
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :602
        await era.printAndWait(
          `「又是这么……没水准呢。真的懂得怎么玩女人吗？」`,
        ); // :603
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :604
        kojo.爱抚 = 2; // :604
      } // :605
      return 0; // :606
    } // :607
  } // :608

  if (era_flag.selectcom == 1) {
    // :613

    if (kojo.舔阴 == 0) {
      // :615

      if (era0(`talent:${target}:0`) == 1) {
        // :617
        await era.printAndWait(`「那、那样的地方请不要舔……」`); // :618
      } else {
        // :620
        await era.printAndWait(`「哎呀！　别、你在干什么啊……」`); // :621
      } // :622
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :623
      kojo.舔阴 = 1; // :623
      return 0; // :624
    } else {
      // :626

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :628
        await era.printAndWait(`「小狗吗……噗、慢慢舔、还蛮舒服的……♪」`); // :629
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :630
        kojo.舔阴 = 5; // :630
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :632
        await era.printAndWait(`「啊……想要更多……舌头伸进去了……啊♪」`); // :633
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :634
        kojo.舔阴 = 4; // :634
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :636
        await era.printAndWait(`「呜……感觉到了……那样的地方……～」`); // :637
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :638
        kojo.舔阴 = 3; // :638
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :640
        await era.printAndWait(`「不要啊！ 不要舔啊……不……不要啊……」`); // :641
        if (era0(`talent:${target}:157`)) {
          // :643
          await era.printAndWait(`（这样的地方……被舔什么的、从来没有过……）`); // :643
        } // :643
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :644
        kojo.舔阴 = 2; // :644
      } // :645
      return 0; // :646
    } // :647
  } // :648

  if (era_flag.selectcom == 2) {
    // :653

    if (kojo.肛门爱抚 == 0) {
      // :655
      await era.printAndWait(`「啊、你在做什么！我要生气了……！」`); // :656
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :657
      kojo.肛门爱抚 = 1; // :657
      return 0; // :658
    } else {
      // :660
      P = era0(`palam:${target}:3`) + era0(`delta:${target}:3`); // :661

      if (
        era0(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :663
        await era.printAndWait(`「啊、哈……不要、那里不行……变得好奇怪……♪」`); // :664
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :665
        kojo.肛门爱抚 = 7; // :665
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :667
        await era.printAndWait(`「再多掏几下啊……湿透了呢……♪」`); // :668
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :669
        kojo.肛门爱抚 = 6; // :669
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :671
        await era.printAndWait(
          `「啊啊……可要对连这儿都有感觉了的身体……要负责哦♪」`,
        ); // :672
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :673
        kojo.肛门爱抚 = 5; // :673
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :675
        await era.printAndWait(`「不行……再快点……要出来了啊……」`); // :676
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :677
        kojo.肛门爱抚 = 4; // :677
      } else if (
        P >= PALAMLV[2] &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :679
        await era.printAndWait(
          `「竟、竟然有感觉了……明明是不行的……明明不可以的」`,
        ); // :680
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :681
        kojo.肛门爱抚 = 3; // :681
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        // :683
        await era.printAndWait(
          `「请、请你快停下……真的很难受。我要生气了！？」`,
        ); // :684
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :685
        kojo.肛门爱抚 = 2; // :685
      } // :686
      return 0; // :687
    } // :688
  } // :689

  if (era_flag.selectcom == 3) {
    // :694

    if (kojo.自慰 == 0) {
      // :696
      await era.printAndWait(`「竟然让${sc()}自己做这种事情……真是欺负人！」`); // :697
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :698
      kojo.自慰 = 1; // :698
      return 0; // :699
    } else {
      // :701

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :703
        await era.printAndWait(`「${sc()}受不了了……${sc()}想要的更多快乐」`); // :704
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :705
        kojo.自慰 = 9; // :705
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :707

        if (rand_n(3) == 0) {
          // :709
          await era.printAndWait(`「好像有点……${sc()}……喜欢上这种感觉了」`); // :710
        } else if (rand_n(2) == 0) {
          // :711
          await era.printAndWait(`「这种事……习惯得……都快成本能了」`); // :712
        } else {
          // :713
          await era.printAndWait(
            `「呵呵……${clitoris_word(target)}都硬了呢……明白吗？」`,
          ); // :714
        } // :715
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :716
        kojo.自慰 = 8; // :716
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :718

        if (rand_n(2) == 0) {
          // :720
          await era.printAndWait(`「老是一个人的话好无聊啊……要一起来吗♪」`); // :721
        } else {
          // :722
          await era.printAndWait(`「${sc()}下面好像都湿透了呢……想看看吗♪」`); // :723
        } // :724
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :725
        kojo.自慰 = 7; // :725
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :727
        await era.printAndWait(`「你的肉棒……想要」`); // :728
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :729
        kojo.自慰 = 6; // :729
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :731

        if (rand_n(3) == 0) {
          // :733
          await era.printAndWait(
            `「不行了……再不来和${sc()}交合的话……${sc()}就要爱上自慰了啦」`,
          ); // :734
        } else if (rand_n(2) == 0) {
          // :735
          await era.printAndWait(`「好棒……啊啊、这样的感觉……自慰什么的……」`); // :736
        } else {
          // :737
          await era.printAndWait(`「停不下来了……～」`); // :738
        } // :739
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :740
        kojo.自慰 = 5; // :740
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :742

        if (rand_n(2) == 0) {
          // :744
          await era.printAndWait(`「喜欢看别人自慰嘛……？　呵呵」`); // :745
        } else {
          // :746
          await era.printAndWait(`「请好好看着、${sc()}这淫荡的小穴」`); // :747
        } // :748
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :749
        kojo.自慰 = 4; // :749
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :751

        if (rand_n(2) == 0) {
          // :753
          await era.printAndWait(`「停不下来了……手指自己动起来了」`); // :754
        } else {
          // :755
          await era.printAndWait(
            `「变得奇怪了、都怪你……${sc()}……好像喜欢上了」`,
          ); // :756
        } // :757
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :758
        kojo.自慰 = 3; // :758
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :760

        if (rand_n(2) == 0) {
          // :762
          await era.printAndWait(`「请不要看……」`); // :763
        } else {
          // :764
          await era.printAndWait(`「请不要让${sc()}……做这么奇怪的事情」`); // :765
        } // :766
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :767
        kojo.自慰 = 2; // :767
      } // :768
      return 0; // :769
    } // :770
  } // :771

  if (era_flag.selectcom == 5) {
    // :776

    if (kojo.胸爱抚 == 0) {
      // :778

      if (era0(`talent:${target}:85`) == 1) {
        // :780
        await era.printAndWait(`「${sc()}的胸……就那么中意吗？」`); // :781
      } else {
        // :783
        await era.printAndWait(`「竟然会想揉胸……跟小孩子一样」`); // :784
      } // :785
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :786
      kojo.胸爱抚 = 1; // :786
      return 0; // :787
    } else {
      // :789

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :791
        await era.printAndWait(`「不行……乳头立起来了……」`); // :792
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :793
        kojo.胸爱抚 = 5; // :793
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :795
        await era.printAndWait(`「只要你喜欢、可以随便揉哦」`); // :796
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :797
        kojo.胸爱抚 = 4; // :797
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :799
        await era.printAndWait(`「来了……啊、乳头……可是弱点啊…」`); // :800
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :801
        kojo.胸爱抚 = 3; // :801
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :803
        await era.printAndWait(`「小孩子一样呢……喜欢玩胸部」`); // :804
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :805
        kojo.胸爱抚 = 2; // :805
      } // :806
      return 0; // :807
    } // :808
  } // :809

  if (era_flag.selectcom == 6) {
    // :814

    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :816

      if (
        era0(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :818
        await era.printAndWait(`「第一次哎……这么、热烈的」`); // :819
        if (era0(`talent:${target}:157`)) {
          // :821
          await era.printAndWait(
            `「${sc()}真是头一次哎……像这样的、当初那个人……都没做过」`,
          ); // :821
        } // :821
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era0(`tequip:${target}:89`) == 0 &&
        era0(`tequip:${target}:90`) == 0
      ) {
        // :823
        await era.printAndWait(`「啊啊……亲爱的、好开心……感觉要舒服死了」`); // :824
        if (era0(`talent:${target}:157`)) {
          // :826
          await era.printAndWait(`（对不起……${sc()}的初吻被夺走了）`); // :826
        } // :826
      } else {
        // :828
        await era.printAndWait(`「我这是第一次哦、不要太粗暴啦……」`); // :829
        if (era0(`talent:${target}:157`)) {
          // :831
          await era.printAndWait(`（对不起……${sc()}的初吻就这样被夺走了）`); // :831
        } // :831
      } // :832
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :833
      kojo.接吻 = 1; // :833
      return 0; // :834
    } else if (kojo.接吻 == 0) {
      // :836

      if (era0(`talent:${target}:76`) == 1) {
        // :838
        await era.printAndWait(`「终于吻了我呢♪」`); // :839
      } else if (era0(`talent:${target}:85`) == 1) {
        // :841
        await era.printAndWait(`「呵呵、你的嘴唇…我早就看中了。一直期待着」`); // :842
      } else {
        // :844
        await era.printAndWait(`「只是初吻而已、别太得意了」`); // :845
      } // :846
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :847
      kojo.接吻 = 1; // :847
      return 0; // :848
    } else {
      // :850

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :852
        await era.printAndWait(`「想要让舌头交缠起来……？　呵呵、挺行嘛」`); // :853
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :854
        kojo.接吻 = 5; // :854
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :856
        await era.printAndWait(`「啊啊…不仅仅是吻…心也被夺走了……」`); // :857
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :858
        kojo.接吻 = 4; // :858
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :860
        await era.printAndWait(`「和${sc()}接吻感觉怎样？」`); // :861
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :862
        kojo.接吻 = 3; // :862
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :864
        await era.printAndWait(`「不、不要……呜……」`); // :865
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :866
        kojo.接吻 = 2; // :866
      } // :867
      return 0; // :868
    } // :869
  } // :870

  if (era_flag.selectcom == 7) {
    // :875

    if (kojo.自己扒开 == 0) {
      // :877

      if (era0(`talent:${target}:76`) == 1) {
        // :879
        await era.printAndWait(`「看得见吗……？　${sc()}这下流的地方……♪」`); // :880
      } else if (era0(`talent:${target}:85`) == 1) {
        // :882
        await era.printAndWait(`「请仔细地看……能看见${sc()}里面吗♪」`); // :883
      } else {
        // :885
        await era.printAndWait(`「真是羞耻……在这种地方扒开了……」`); // :886
      } // :887
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :888
      kojo.自己扒开 = 1; // :888
      return 0; // :889
    } else {
      // :891

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :893
        await era.printAndWait(`「好看吗……${sc()}的下流的小蜜桃……♪」`); // :894
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :895
        kojo.胸爱抚 = 5; // :895
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :897
        await era.printAndWait(`「好看吗……这种地方${sc()}只会给你看♪」`); // :898
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :899
        kojo.胸爱抚 = 4; // :899
      } else if (
        era0(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :901
        await era.printAndWait(`「好看吗……${sc()}的让人害羞的地方……」`); // :902
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :903
        kojo.胸爱抚 = 3; // :903
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :905
        await era.printAndWait(`「讨厌……让人做这种事情……」`); // :906
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :907
        kojo.胸爱抚 = 2; // :907
      } // :908
      return 0; // :909
    } // :910
  } // :911

  if (era_flag.selectcom == 8) {
    // :916

    if (kojo.插入手指 == 0) {
      // :918

      if (era0(`talent:${target}:76`) == 1) {
        // :920
        await era.printAndWait(`「可以多用几根手指吗？」`); // :921
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        // :923
        await era.printAndWait(`「你的手指……又细又长……♪」`); // :924
      } else {
        // :926
        await era.printAndWait(`「讨厌···好难受了」`); // :927
      } // :928
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :929
      kojo.插入手指 = 1; // :929
      return 0; // :930
    } else {
      // :932

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :934
        await era.printAndWait(`「不行……想被插到深处……居然会有这样的想法……♪」`); // :935
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :936
        kojo.插入手指 = 5; // :936
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :938
        await era.printAndWait(`「啊啊啊……好厉害……腰忍不住摆动起来了……」`); // :939
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :940
        kojo.插入手指 = 4; // :940
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :942
        await era.printAndWait(`「不行……感觉太羞耻了……讨厌……」`); // :943
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :944
        kojo.插入手指 = 3; // :944
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        // :946
        await era.printAndWait(`「太难受了……请停止吧」`); // :947
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :948
        kojo.插入手指 = 2; // :948
      } // :949
      return 0; // :950
    } // :951
  } // :952

  if (era_flag.selectcom == 9) {
    // :957

    if (kojo.舔肛 == 0) {
      // :959

      if (era0(`talent:${target}:76`) == 1) {
        // :961
        await era.printAndWait(`「啊啊啊、肛门上滑滑的」`); // :962
      } else if (era0(`talent:${target}:85`) == 1) {
        // :964
        await era.printAndWait(`「哎呀、那样的地方、请不要舔♪」`); // :965
      } else {
        // :967
        await era.printAndWait(`「讨厌……脏啊」`); // :968
      } // :969
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :970
      kojo.舔肛 = 1; // :970
      return 0; // :971
    } else {
      // :973

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :975
        await era.printAndWait(`「那个、屁股好像有点松开来了……～」`); // :976
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :977
        kojo.舔肛 = 5; // :977
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :979
        await era.printAndWait(`「万分感谢、竟疼爱到了这样的地方……」`); // :980
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :981
        kojo.舔肛 = 4; // :981
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :983
        await era.printAndWait(`「啊啊……后面变得好湿……」`); // :984
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :985
        kojo.舔肛 = 3; // :985
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :987
        await era.printAndWait(`「你在想什么……不脏吗……」`); // :988
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :989
        kojo.舔肛 = 2; // :989
      } // :990
      return 0; // :991
    } // :992
  } // :993

  if (era_flag.selectcom == 10) {
    // :998

    if (kojo.振动宝石 == 0) {
      // :1000

      if (era0(`talent:${target}:76`) == 1) {
        // :1002
        await era.printAndWait(`「啊啊啊啊……要去了……」`); // :1003
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`talent:${target}:85`) == 1
      ) {
        // :1005
        await era.printAndWait(`「这个用多了会上瘾的……」`); // :1006
      } else {
        // :1008
        await era.printAndWait(`「讨厌……用这种不知羞耻的东西……」`); // :1009
      } // :1010
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1011
      kojo.振动宝石 = 1; // :1011
      return 0; // :1012
    } else {
      // :1014

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1016
        await era.printAndWait(`「下面……都要没知觉了……啊……」`); // :1017
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1018
        kojo.振动宝石 = 5; // :1018
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1020
        await era.printAndWait(`「有点快感……请继续下去……」`); // :1021
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1022
        kojo.振动宝石 = 4; // :1022
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1024
        await era.printAndWait(`「呜……身子要飞起来了……」`); // :1025
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1026
        kojo.振动宝石 = 3; // :1026
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        // :1028
        await era.printAndWait(`「哎呀……不要这样……」`); // :1029
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1030
        kojo.振动宝石 = 2; // :1030
      } // :1031
      return 0; // :1032
    } // :1033
  } // :1034

  if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`)) {
    // :1040

    if (kojo.壶虫 == 0) {
      // :1042

      if (era0(`talent:${target}:0`) == 1) {
        // :1044

        if (era0(`talent:${target}:76`) == 1) {
          // :1046
          await era.printAndWait(
            `「竟然被这样的东西夺走了贞操……你真不是什么好人呢」`,
          ); // :1047
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1049
          await era.printAndWait(
            `「您是认真的吗、${sc()}的第一次让这种东西拿走？　您不会后悔吗？」`,
          ); // :1050
        } else {
          // :1052
          await era.printAndWait(`「讨厌……你这个变态……」`); // :1053
        } // :1054
      } else {
        // :1056

        if (era0(`talent:${target}:76`) == 1) {
          // :1058
          await era.printAndWait(`「啊、这个东西真恶心……难看死了♪」`); // :1059
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1061
          await era.printAndWait(`「饲养了奇怪的东西啊」`); // :1062
        } else {
          // :1064
          await era.printAndWait(`「这是……什么啊…真恶心」`); // :1065
        } // :1066
      } // :1067
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1068
      kojo.壶虫 = 1; // :1068
      return 0; // :1069
    } else {
      // :1071

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1073
        await era.printAndWait(`「在里面乱动啊……啊啊啊」`); // :1074
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1075
        kojo.壶虫 = 5; // :1075
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1077
        await era.printAndWait(`「感受到了……这样的东西……被爱的话」`); // :1078
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1079
        kojo.壶虫 = 4; // :1079
      } else if (
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1081
        await era.printAndWait(`「它在里面动啊……快拿出来……」`); // :1082
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1083
        kojo.壶虫 = 3; // :1083
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1085
        await era.printAndWait(`「真恶心……你有什么目的？」`); // :1086
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1087
        kojo.壶虫 = 2; // :1087
      } // :1088
      return 0; // :1089
    } // :1090
  } else if (era_flag.selectcom == 11 && era0(`tequip:${target}:11`) == 0) {
    // :1092

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1094
      await era.printAndWait(`「嘻嘻、太好了」`); // :1095
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1096
      kojo.壶虫着脱 = 3; // :1096
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1098
      await era.printAndWait(`「啊…好疼」`); // :1099
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1100
      kojo.壶虫着脱 = 2; // :1100
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1102
      await era.printAndWait(`「哈……哈」`); // :1103
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1104
      kojo.壶虫着脱 = 1; // :1104
    } // :1105
    return 0; // :1106
  } // :1107

  if (era_flag.selectcom == 12) {
    // :1112

    if (kojo.振动杖 == 0) {
      // :1114

      if (era0(`talent:${target}:76`) == 1) {
        // :1116
        await era.printAndWait(`「喂、有这种好东西之前为什么不告诉我？」`); // :1117
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1119
        await era.printAndWait(
          `「要是知道您有这种好东西的话……也许就会把您晾在一边了哦？ 嘻嘻」`,
        ); // :1120
      } else {
        // :1122
        await era.printAndWait(`「咦、震得好厉害……」`); // :1123
      } // :1124
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1125
      kojo.振动杖 = 1; // :1125
      return 0; // :1126
    } else {
      // :1128

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1130
        await era.printAndWait(
          `「这个、用了会让人上瘾的……真想沉浸在这快感里……♪」`,
        ); // :1131
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1132
        kojo.振动杖 = 5; // :1132
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1134
        await era.printAndWait(`「这道具真棒……嗯嗯、这……好……赞啊♪」`); // :1135
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1136
        kojo.振动杖 = 4; // :1136
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1138
        await era.printAndWait(`「啊啊啊啊……感觉太……～」`); // :1139
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1140
        kojo.振动杖 = 3; // :1140
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        // :1142
        await era.printAndWait(`「天啊……腰要……」`); // :1143
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1144
        kojo.振动杖 = 2; // :1144
      } // :1145
      return 0; // :1146
    } // :1147
  } // :1148

  if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`)) {
    // :1154

    if (kojo.肛门虫 == 0) {
      // :1156

      if (era0(`talent:${target}:76`) == 1) {
        // :1158
        await era.printAndWait(`「好像会很棒啊……」`); // :1159
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1161
        await era.printAndWait(`「奇怪的生物啊」`); // :1162
      } else {
        // :1164
        await era.printAndWait(`「真……脏……」`); // :1165
      } // :1166
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1167
      kojo.肛门虫 = 1; // :1167
      return 0; // :1168
    } else {
      // :1170

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1172
        await era.printAndWait(`「啊……肛门♪　爽的要飞起来了……」`); // :1173
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1174
        kojo.肛门虫 = 6; // :1174
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1176
        await era.printAndWait(`「啊……从肛门进去了……？　有点痒痒的……」`); // :1177
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1178
        kojo.肛门虫 = 6; // :1178
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1180
        await era.printAndWait(`「屁股要坏掉了……激烈的滑动着腰部♪」`); // :1181
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1182
        kojo.肛门虫 = 5; // :1182
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1184
        await era.printAndWait(`「屁股……里面……感觉变得好奇怪」`); // :1185
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1186
        kojo.肛门虫 = 4; // :1186
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1188
        await era.printAndWait(`「呜呜……屁股快要被弄得高潮了……救救我……」`); // :1189
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1190
        kojo.肛门虫 = 3; // :1190
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1192
        await era.printAndWait(`「呜呜……脏死了……」`); // :1193
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1194
        kojo.肛门虫 = 2; // :1194
      } // :1195
      return 0; // :1196
    } // :1197
  } else if (era_flag.selectcom == 13 && era0(`tequip:${target}:13`) == 0) {
    // :1199

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1201
      await era.printAndWait(`「一口气……一口气拔出来♪」`); // :1202
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1203
      kojo.肛门虫着脱 = 4; // :1203
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1205
      await era.printAndWait(`「呼呼……已经结束吗？」`); // :1206
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1207
      kojo.肛门虫着脱 = 3; // :1207
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1209
      await era.printAndWait(`「不行……拔的时候……肛门会翻出来吧……」`); // :1210
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1211
      kojo.肛门虫着脱 = 2; // :1211
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1213
      await era.printAndWait(`「天啊……拔的时候慢一点……」`); // :1214
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1215
      kojo.肛门虫着脱 = 1; // :1215
    } // :1216
    return 0; // :1217
  } // :1218

  if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`)) {
    // :1440

    if (kojo.肛珠 == 0) {
      // :1442

      if (era0(`talent:${target}:76`) == 1) {
        // :1444
        await era.printAndWait(`「长了根小尾巴……♪」`); // :1445
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1447
        await era.printAndWait(`「屁股里面被塞满了…」`); // :1448
      } else {
        // :1450
        await era.printAndWait(`「啊、把什么放进去……？　肛珠……？」`); // :1451
      } // :1452
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :1453
      kojo.肛珠 = 1; // :1453
      return 0; // :1454
    } else {
      // :1456

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1458
        await era.printAndWait(`「哈……终于全部放进去了……表扬我吧♪」`); // :1459
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :1460
        kojo.肛珠 = 7; // :1460
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1462
        await era.printAndWait(`「唔、果然还是太勉强了……」`); // :1463
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :1464
        kojo.肛珠 = 6; // :1464
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1466
        await era.printAndWait(`「好厉害……全部都放进去了」`); // :1467
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :1468
        kojo.肛珠 = 5; // :1468
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1470
        await era.printAndWait(`「啊、不行……太勉强了……」`); // :1471
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :1472
        kojo.肛珠 = 4; // :1472
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1474
        await era.printAndWait(`「呜……不要再……往里塞了……」`); // :1475
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :1476
        kojo.肛珠 = 3; // :1476
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        // :1478
        await era.printAndWait(`「不行……绝对不能放进去……」`); // :1479
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :1480
        kojo.肛珠 = 2; // :1480
      } // :1481
      return 0; // :1482
    } // :1483
  } else if (era_flag.selectcom == 19 && era0(`tequip:${target}:19`) == 0) {
    // :1485

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1487
      await era.printAndWait(`「一口气全部拔出来吧♪」`); // :1488
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :1489
      kojo.肛珠着脱 = 4; // :1489
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1491
      await era.printAndWait(`「一口气抽出也没关系哟……♪」`); // :1492
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :1493
      kojo.肛珠着脱 = 3; // :1493
    } else if (
      era0(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1495
      await era.printAndWait(`「快、快点拔出去……」`); // :1496
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :1497
      kojo.肛珠着脱 = 2; // :1497
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1499
      await era.printAndWait(`「啊不行……好疼……」`); // :1500
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :1501
      kojo.肛珠着脱 = 1; // :1501
    } // :1502
    return 0; // :1503
  } // :1504

  if (era_flag.selectcom == 20) {
    // :1509

    if (kojo.正常位 == 0) {
      // :1511

      if (era0(`talent:${target}:0`) == 1) {
        // :1513

        if (era0(`talent:${target}:76`) == 1) {
          // :1515
          await era.printAndWait(`「第一次给了你…好荣幸♪」`); // :1516
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          era0(`abl:${target}:10`) >= 5
        ) {
          // :1518
          await era.printAndWait(`「第一次……请、插更深一点」`); // :1519
        } else {
          // :1521
          await era.printAndWait(`「第一次被夺走了……」`); // :1522
        } // :1523
      } else {
        // :1525
        if (era0(`talent:${target}:76`) == 1) {
          // :1526
          await era.printAndWait(`「那么、请进去吧……」`); // :1527
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1529
          await era.printAndWait(`「用力抱紧了……插得更深了……」`); // :1530
        } else {
          // :1532
          await era.printAndWait(`「放进去了……」`); // :1533
        } // :1534
      } // :1535
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :1536
      kojo.正常位 = 1; // :1536
      return 0; // :1537
    } else {
      // :1539

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1541
        await era.printAndWait(`「来啊……深处…更舒服了……」`); // :1542
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :1543
        kojo.正常位 = 6; // :1543
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1545
        await era.printAndWait(`「这样好了……快要被压垮了」`); // :1546
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :1547
        kojo.正常位 = 5; // :1547
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1549

        if (era0(`talent:${target}:157`)) {
          // :1552

          if (rand_n(3) == 0) {
            // :1554
            await era.printAndWait(`「哈啊…这么大这么硬…好棒${heart(3)}」`); // :1555
          } else if (rand_n(2) == 0) {
            // :1556
            await era.print(`「别……」`); // :1557
            await era.print(`「啊嗯…咿呀…哈啊…」`); // :1558
            await era.print(`「哈啊…这么大这么硬…好棒${heart(3)}」`); // :1559
            await era.printAndWait(`(根本无法和主人相提并论嘛……老公的那根……）`); // :1560
          } else {
            // :1561
            await era.print(`「亲爱的…请原谅……`); // :1562
            if (rand_n(3) == 0) {
              // :1563
              await era.print(`啊啊啊…`); // :1564
            } else if (rand_n(2) == 0) {
              // :1565
              await era.print(`不行…`); // :1566
            } else {
              // :1567
              await era.print(`噫噫…`); // :1568
            } // :1569
            await era.printAndWait(`${heart(3)}」`); // :1570
          } // :1571
        } else {
          // :1572
          await era.printAndWait(`「咕嗯、有、有感觉……了」`); // :1573
        } // :1574
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :1575
        kojo.正常位 = 4; // :1575
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1577
        if (rand_n(3) == 0) {
          // :1578
          await era.printAndWait(`「这个样子、才没有感觉呢……」`); // :1579
        } else if (rand_n(2) == 0) {
          // :1580
          await era.printAndWait(`「请…再温柔一些……」`); // :1581
        } else {
          // :1582
          await era.printAndWait(`「呜…竟然有感觉……」`); // :1583
        } // :1584
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :1585
        kojo.正常位 = 3; // :1585
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        // :1587
        await era.printAndWait(`「真恶心……」`); // :1588
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :1589
        kojo.正常位 = 2; // :1589
      } // :1590
      return 0; // :1591
    } // :1592
  } // :1593

  if (era_flag.selectcom == 21) {
    // :1598

    if (kojo.背后位 == 0) {
      // :1600

      if (era0(`talent:${target}:0`) == 1) {
        // :1602

        if (era0(`talent:${target}:76`) == 1) {
          // :1604
          await era.printAndWait(
            `「用这样下流的体位让我成为了女人……真高兴呢♪」`,
          ); // :1605
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1607
          await era.printAndWait(`「啊啊 、终于能将第一次献给你了♪」`); // :1608
        } else {
          // :1611
          await era.printAndWait(`「唔……这么屈辱的样子……」`); // :1612
        } // :1613
      } else {
        // :1615

        if (era0(`talent:${target}:76`) == 1) {
          // :1617
          await era.printAndWait(
            `「哎呀、一直等着你呢……终于、从后面来上我了♪」`,
          ); // :1618
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1620
          await era.printAndWait(`「后面、呀啊…♪好棒……♪」`); // :1621
        } else {
          // :1623
          await era.printAndWait(`「这种屈辱的样子……！」`); // :1624
        } // :1625
      } // :1626
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :1627
      kojo.背后位 = 1; // :1627
      return 0; // :1628
    } else {
      // :1630

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1632
        if (rand_n(3) == 0) {
          // :1633
          await era.printAndWait(`「后入什么的好舒服啊……♪」`); // :1634
        } else if (rand_n(2) == 0) {
          // :1635
          await era.printAndWait(`「来…插的更深一点……」`); // :1636
        } else {
          // :1637
          await era.printAndWait(`「再插得快一点……♪」`); // :1638
        } // :1639
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :1640
        kojo.背后位 = 6; // :1640
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1642
        if (rand_n(3) == 0) {
          // :1643
          await era.printAndWait(`「感受到了呢……啊啊啊」`); // :1644
        } else if (rand_n(2) == 0) {
          // :1645
          await era.printAndWait(`「屁股、请再多揉揉它……」`); // :1646
        } else {
          // :1647
          await era.printAndWait(`「那样、好棒……♪」`); // :1648
        } // :1649
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :1650
        kojo.背后位 = 5; // :1650
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1652
        if (era0(`talent:${target}:157`)) {
          // :1653

          if (rand_n(2) == 0) {
            // :1655
            await era.print(`「哈啊…请您`); // :1656
            if (rand_n(2) == 0) {
              // :1657
              await era.print(`抽插${sc()}的时候`); // :1658
            } else {
              // :1659
              await era.print(`侵犯${sc()}的时候`); // :1660
            } // :1661
            await era.print(`${heart(1)}`); // :1662
            if (rand_n(3) == 0) {
              // :1663
              await era.print(`」`); // :1664
            } else {
              // :1665
              await era.print(`……`); // :1666
              if (rand_n(2) == 0) {
                // :1667
                await era.print(`再激烈一点…`); // :1668
                if (rand_n(2) == 0) {
                  // :1669
                  await era.printAndWait(`才好啊${heart(3)}」`); // :1670
                } else {
                  // :1671
                  await era.printAndWait(`更喜欢…${heart(3)}」`); // :1672
                } // :1673
              } else {
                // :1674
                await era.print(`把${sc()}`); // :1675
                if (rand_n(2) == 0) {
                  // :1676
                  await era.print(`弄得乱七八糟的`); // :1677
                } else {
                  // :1678
                  await era.print(`插得更加乱七八糟`); // :1679
                } // :1680
                await era.printAndWait(`${heart(3)}」`); // :1681
              } // :1682
            } // :1683
          } else if (rand_n(2) == 0) {
            // :1684
            await era.print(`「别……」`); // :1685
            await era.print(`「啊嗯…咿呀…哈啊…」`); // :1686
            await era.print(`「哈啊…这么大这么硬…好棒${heart(3)}」`); // :1687
            await era.printAndWait(`(根本无法和主人相提并论嘛……老公的那根……）`); // :1688
          } else {
            // :1689
            await era.print(`「亲爱的…请原谅……`); // :1690
            if (rand_n(3) == 0) {
              // :1691
              await era.print(`啊啊啊啊啊`); // :1692
            } else if (rand_n(2) == 0) {
              // :1693
              await era.print(`不行`); // :1694
            } else {
              // :1695
              await era.print(`噫噫`); // :1696
            } // :1697
            await era.printAndWait(`${heart(3)}」`); // :1698
          } // :1699
        } else {
          // :1700
          await era.printAndWait(`「不行、这种样子……但是……」`); // :1701
        } // :1702
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :1703
        kojo.背后位 = 4; // :1703
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1705
        if (rand_n(3) == 0) {
          // :1706
          await era.printAndWait(`「真的……像狗一样……」`); // :1707
        } else if (rand_n(2) == 0) {
          // :1708
          await era.print(`「有感觉了什么的……`); // :1709
          if (rand_n(3) == 0) {
            // :1710
            await era.printAndWait(`」`); // :1711
          } else if (rand_n(2) == 0) {
            // :1712
            await era.printAndWait(`怎么可能……」`); // :1713
          } else {
            // :1714
            await era.printAndWait(`啊啊${heart(1)}」`); // :1715
          } // :1716
        } else {
          // :1717
          if (rand_n(3) == 0) {
            // :1718
            await era.print(`「这副模样……`); // :1719
          } else {
            // :1720
            await era.print(`「`); // :1721
          } // :1722
          await era.print(`好羞耻……`); // :1723
          if (rand_n(3) == 0) {
            // :1724
            await era.printAndWait(`啊啊${heart(3)}」`); // :1725
          } else {
            // :1726
            await era.printAndWait(`」`); // :1727
          } // :1728
        } // :1729
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :1730
        kojo.背后位 = 3; // :1730
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :1732
        await era.printAndWait(`「哈、哈……」`); // :1733

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :1735
        kojo.背后位 = 2; // :1735
      } // :1736
      return 0; // :1737
    } // :1738
  } // :1739

  if (era_flag.selectcom == 22) {
    // :1744
    if (kojo.对面座位 == 0) {
      // :1745

      if (era0(`talent:${target}:0`) == 1) {
        // :1747

        if (era0(`talent:${target}:76`) == 1) {
          // :1749
          await era.printAndWait(''); // :1750
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1752
          await era.printAndWait(''); // :1753
        } else {
          // :1755
          await era.printAndWait(''); // :1756
        } // :1757
      } else {
        // :1759

        if (era0(`talent:${target}:76`) == 1) {
          // :1761
          await era.printAndWait(''); // :1762
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1764
          await era.printAndWait(''); // :1765
        } else {
          // :1767
          await era.printAndWait(''); // :1768
        } // :1769
      } // :1770
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :1771
      kojo.对面座位 = 1; // :1771
      return 0; // :1772
    } else {
      // :1774

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1776
        if (rand_n(3) == 0) {
          // :1777
          await era.printAndWait(''); // :1778
        } else if (rand_n(2) == 0) {
          // :1779
          await era.printAndWait(''); // :1780
        } else {
          // :1781
          await era.printAndWait(''); // :1782
        } // :1783
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :1784
        kojo.对面座位 = 6; // :1784
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1786
        if (rand_n(3) == 0) {
          // :1787
          await era.printAndWait(''); // :1788
        } else if (rand_n(2) == 0) {
          // :1789
          await era.printAndWait(''); // :1790
        } else {
          // :1791
          await era.printAndWait(''); // :1792
        } // :1793
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :1794
        kojo.对面座位 = 5; // :1794
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1796
        await era.printAndWait(''); // :1797
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :1798
        kojo.对面座位 = 4; // :1798
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1800
        await era.printAndWait(''); // :1801
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :1802
        kojo.对面座位 = 3; // :1802
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1804
        await era.printAndWait(''); // :1805
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :1806
        kojo.对面座位 = 2; // :1806
      } // :1807
      return 0; // :1808
    } // :1809
  } // :1810

  if (era_flag.selectcom == 23) {
    // :1815
    if (kojo.背面座位 == 0) {
      // :1816

      if (era0(`talent:${target}:0`) == 1) {
        // :1818

        if (era0(`talent:${target}:76`) == 1) {
          // :1820
          await era.printAndWait(''); // :1821
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1823
          await era.printAndWait(''); // :1824
        } else {
          // :1826
          await era.printAndWait(''); // :1827
        } // :1828
      } else {
        // :1830

        if (era0(`talent:${target}:76`) == 1) {
          // :1832
          await era.printAndWait(''); // :1833
        } else if (era0(`talent:${target}:85`) == 1) {
          // :1835
          await era.printAndWait(''); // :1836
        } else {
          // :1838
          await era.printAndWait(''); // :1839
        } // :1840
      } // :1841
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :1842
      kojo.背面座位 = 1; // :1842
      return 0; // :1843
    } else {
      // :1845

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1847
        if (rand_n(3) == 0) {
          // :1848
          await era.printAndWait(''); // :1849
        } else if (rand_n(2) == 0) {
          // :1850
          await era.printAndWait(''); // :1851
        } else {
          // :1852
          await era.printAndWait(''); // :1853
        } // :1854
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :1855
        kojo.背面座位 = 6; // :1855
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1857
        if (rand_n(3) == 0) {
          // :1858
          await era.printAndWait(''); // :1859
        } else if (rand_n(2) == 0) {
          // :1860
          await era.printAndWait(''); // :1861
        } else {
          // :1862
          await era.printAndWait(''); // :1863
        } // :1864
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :1865
        kojo.背面座位 = 5; // :1865
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1867
        await era.printAndWait(''); // :1868
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :1869
        kojo.背面座位 = 4; // :1869
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1871
        await era.printAndWait(''); // :1872
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :1873
        kojo.背面座位 = 3; // :1873
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1875
        await era.printAndWait(''); // :1876
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :1877
        kojo.背面座位 = 2; // :1877
      } // :1878
      return 0; // :1879
    } // :1880
  } // :1881

  if (era_flag.selectcom == 26) {
    // :1886

    if (kojo.正常位肛交 == 0) {
      // :1888

      if (era0(`talent:${target}:76`) == 1) {
        // :1890
        await era.printAndWait(`「快来嘛……${sc()}已经等不及了  嘻嘻」`); // :1891
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1893
        await era.printAndWait(`「不要害怕……还可以再深一点……」`); // :1894
      } else {
        // :1896
        await era.printAndWait(`「等一下……屁股已经……」`); // :1897
      } // :1898
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :1899
      kojo.正常位肛交 = 1; // :1899
      return 0; // :1900
    } else {
      // :1902

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1904
        if (rand_n(3) == 0) {
          // :1905
          await era.printAndWait(`「快点……肛门已经快要忍不住了♪」`); // :1906
        } else if (rand_n(2) == 0) {
          // :1907
          await era.printAndWait(`「有点疼的但是完全不想停下来……♪」`); // :1908
        } else {
          // :1909
          await era.printAndWait(`「啊……要去了……♪」`); // :1910
        } // :1911
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :1912
        kojo.正常位肛交 = 7; // :1912
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1914
        await era.printAndWait(`「要温柔点哦……」`); // :1915
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :1916
        kojo.正常位肛交 = 6; // :1916
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1918
        if (rand_n(2) == 0) {
          // :1919
          await era.printAndWait(`「屁股好舒服……？随时都可以射出来哦♪」`); // :1920
        } else {
          // :1921
          await era.printAndWait(`「呵呵……小鸡鸡要忍不住了吗？」`); // :1922
        } // :1923
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :1924
        kojo.正常位肛交 = 5; // :1924
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1926
        await era.printAndWait(`「要温柔点哦……」`); // :1927
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :1928
        kojo.正常位肛交 = 4; // :1928
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1930
        await era.printAndWait(`「嗯唔……来啦……」`); // :1931
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :1932
        kojo.正常位肛交 = 3; // :1932
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1934
        await era.printAndWait(`「痛……快停下、好可怕……」`); // :1935
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :1936
        kojo.正常位肛交 = 2; // :1936
      } // :1937
      return 0; // :1938
    } // :1939
  } // :1940

  if (era_flag.selectcom == 27) {
    // :1945

    if (kojo.背后位肛交 == 0) {
      // :1947

      if (era0(`talent:${target}:76`) == 1) {
        // :1949
        await era.printAndWait(`「来……已经等不下去了」`); // :1950
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1952
        await era.printAndWait(`「用这里做爱也一样啊♪」`); // :1953
      } else {
        // :1955
        await era.printAndWait(`「啊、屁股不要……」`); // :1956
      } // :1957
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :1958
      kojo.背后位肛交 = 1; // :1958
      return 0; // :1959
    } else {
      // :1961

      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1963
        if (rand_n(2) == 0) {
          // :1964
          await era.printAndWait(`「屁股感觉被挖了一样……去了……♪」`); // :1965
        } else {
          // :1966
          await era.printAndWait(`「腰自己动起来了……完全停不下来了…♪」`); // :1967
        } // :1968
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :1969
        kojo.背后位肛交 = 5; // :1969
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1971
        await era.printAndWait(`「啊啊、屁股是不是要比前面那个洞深的多了……♪」`); // :1972
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :1973
        kojo.背后位肛交 = 4; // :1973
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1975
        await era.printAndWait(`「被这样弄开……屁股变得好奇怪……」`); // :1976
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :1977
        kojo.背后位肛交 = 3; // :1977
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1979
        await era.printAndWait(`「啊……疼……」`); // :1980
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :1981
        kojo.背后位肛交 = 2; // :1981
      } // :1982
      return 0; // :1983
    } // :1984
  } // :1985

  if (era_flag.selectcom == 28) {
    // :1990

    if (kojo.对面座位肛交 == 0) {
      // :1992

      if (era0(`talent:${target}:76`) == 1) {
        // :1994
        await era.printAndWait(''); // :1995
      } else if (era0(`talent:${target}:85`) == 1) {
        // :1997
        await era.printAndWait(''); // :1998
      } else {
        // :2000
        await era.printAndWait(''); // :2001
      } // :2002
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :2003
      kojo.对面座位肛交 = 1; // :2003
      return 0; // :2004
    } else {
      // :2006

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2008
        if (rand_n(3) == 0) {
          // :2009
          await era.printAndWait(''); // :2010
        } else if (rand_n(2) == 0) {
          // :2011
          await era.printAndWait(''); // :2012
        } else {
          // :2013
          await era.printAndWait(''); // :2014
        } // :2015
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :2016
        kojo.对面座位肛交 = 7; // :2016
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2018
        await era.printAndWait(''); // :2019
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :2020
        kojo.对面座位肛交 = 6; // :2020
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2022
        if (rand_n(2) == 0) {
          // :2023
          await era.printAndWait(''); // :2024
        } else {
          // :2025
          await era.printAndWait(''); // :2026
        } // :2027
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :2028
        kojo.对面座位肛交 = 5; // :2028
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2030
        await era.printAndWait(''); // :2031
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :2032
        kojo.对面座位肛交 = 4; // :2032
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2034
        await era.printAndWait(''); // :2035
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :2036
        kojo.对面座位肛交 = 3; // :2036
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2038
        await era.printAndWait(''); // :2039
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :2040
        kojo.对面座位肛交 = 2; // :2040
      } // :2041
      return 0; // :2042
    } // :2043
  } // :2044

  if (era_flag.selectcom == 29) {
    // :2049

    if (kojo.背面座位肛交 == 0) {
      // :2051

      if (era0(`talent:${target}:76`) == 1) {
        // :2053
        await era.printAndWait(''); // :2054
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2056
        await era.printAndWait(''); // :2057
      } else {
        // :2059
        await era.printAndWait(''); // :2060
      } // :2061
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :2062
      kojo.背面座位肛交 = 1; // :2062
      return 0; // :2063
    } else {
      // :2065

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2067
        if (rand_n(2) == 0) {
          // :2068
          await era.printAndWait(''); // :2069
        } else {
          // :2070
          await era.printAndWait(''); // :2071
        } // :2072
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :2073
        kojo.背面座位肛交 = 7; // :2073
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2075
        await era.printAndWait(''); // :2076
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :2077
        kojo.背面座位肛交 = 6; // :2077
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2079
        if (rand_n(2) == 0) {
          // :2080
          await era.printAndWait(''); // :2081
        } else {
          // :2082
          await era.printAndWait(''); // :2083
        } // :2084
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :2085
        kojo.背面座位肛交 = 5; // :2085
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2087
        await era.printAndWait(''); // :2088
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :2089
        kojo.背面座位肛交 = 4; // :2089
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2091
        await era.printAndWait(''); // :2092
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :2093
        kojo.背面座位肛交 = 3; // :2093
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2095
        await era.printAndWait(''); // :2096
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :2097
        kojo.背面座位肛交 = 2; // :2097
      } // :2098
      return 0; // :2099
    } // :2100
  } // :2101

  if (era_flag.selectcom == 30) {
    // :2106

    if (kojo.手淫 == 0) {
      // :2108

      if (era0(`talent:${target}:76`) == 1) {
        // :2110
        await era.printAndWait(`「对这样的服务不讨厌吧……？　呵呵」`); // :2111
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2113
        await era.printAndWait(`「今后每天${sc()}都这样为您服务♪」`); // :2114
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2116
        await era.printAndWait(`「${sc()}知道了、请让${sc()}来为您服务吧」`); // :2117
      } else {
        // :2119
        await era.printAndWait(`「竟然让${sc()}撸这个……」`); // :2120
      } // :2121
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :2122
      kojo.手淫 = 1; // :2122
      return 0; // :2123
    } else {
      // :2125

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2127
        if (rand_n(2) == 0) {
          // :2128
          await era.printAndWait(`「来吧、随时可以射给${sc()}哦？」`); // :2129
        } else {
          // :2130
          await era.printAndWait(`「您看、上上下下……上上下下……」`); // :2131
        } // :2132
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :2133
        kojo.手淫 = 6; // :2133
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2135
        if (rand_n(2) == 0) {
          // :2136
          await era.printAndWait(
            `「好厉害、到现在……不用这样一直忍也可以哦？」`,
          ); // :2137
        } else {
          // :2138
          await era.printAndWait(`「还在忍耐吗？好可爱～」`); // :2139
        } // :2140
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :2141
        kojo.手淫 = 5; // :2141
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2143
        await era.printAndWait(`「变得咕噜咕噜的了。咕噜咕噜……」`); // :2144
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :2145
        kojo.手淫 = 4; // :2145
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2147

        await era.printAndWait(`「舒服吗？加油。……」`); // :2151
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :2152
        kojo.手淫 = 3; // :2152
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :2154
        await era.printAndWait(`「哎呀…被你吓到了呢……」`); // :2155
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :2156
        kojo.手淫 = 2; // :2156
      } // :2157
      return 0; // :2158
    } // :2159
  } // :2160

  if (era_flag.selectcom == 31) {
    // :2165

    if (kojo.口交_奴 == 0) {
      // :2167

      if (era0(`talent:${target}:76`) == 1) {
        // :2169
        await era.printAndWait(`「噗、一直想舔了……真爱欺负人♪」`); // :2170
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2172
        await era.printAndWait(`「就算不这么拜托、${sc()}也不会咬的啦…♪」`); // :2173
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2175
        await era.printAndWait(`「请放心、不会咬的啦……」`); // :2176
      } else {
        // :2178
        await era.printAndWait(`（呜……臭……讨厌……）`); // :2179
      } // :2180
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :2181
      kojo.口交_奴 = 1; // :2181
      return 0; // :2182
    } else {
      // :2184

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2186
        await era.printAndWait(`（哈……多么美妙的气味……快满含在嘴里、想品尝…）`); // :2187
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :2188
        kojo.口交_奴 = 6; // :2188
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2190
        await era.printAndWait(`（呵呵……很好吃的样子……我开动了……♪）`); // :2191
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :2192
        kojo.口交_奴 = 5; // :2192
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2194
        await era.printAndWait(`「呵呵……让${sc()}给您充分的服务♪」`); // :2195
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :2196
        kojo.口交_奴 = 4; // :2196
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2198
        await era.printAndWait(`「${sc()}知道了、、、请让${sc()}来服务」`); // :2199
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :2200
        kojo.口交_奴 = 3; // :2200
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :2202
        await era.printAndWait(`（讨厌……臭……）`); // :2203
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :2204
        kojo.口交_奴 = 2; // :2204
      } // :2205
      return 0; // :2206
    } // :2207
  } // :2208

  if (era_flag.selectcom == 32) {
    // :2213

    if (kojo.乳交 == 0) {
      // :2215

      if (era0(`talent:${target}:76`) == 1) {
        // :2217
        await era.printAndWait(`「看哦、软软的胸部哦？」`); // :2218
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2220
        await era.printAndWait(`「呵呵、包住了呢」`); // :2221
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :2223
        await era.printAndWait(`「怎么样…用胸部的话感觉舒服吗」`); // :2224
      } else {
        // :2226
        await era.printAndWait(`「胸……你是认真的？」`); // :2227
      } // :2228
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :2229
      kojo.乳交 = 1; // :2229
      return 0; // :2230
    } else {
      // :2232

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2234
        if (rand_n(2) == 0) {
          // :2235
          await era.printAndWait(`「怎么样？舒服吗？软软的胸部呦。～♪」`); // :2236
        } else {
          // :2237
          await era.printAndWait(`「那么、请全部射在${sc()}的胸部上面吧～♪」`); // :2238
        } // :2239
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :2240
        kojo.乳交 = 6; // :2240
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2242
        await era.printAndWait(`「怎么样、柔软吗？」`); // :2243
        // CFLAG:333  = 5（变量语义：CFLAG 族，333） // :2244
        kojo.乳交 = 5; // :2244
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2246
        if (rand_n(2) == 0) {
          // :2247
          await era.printAndWait(`「怎么样……乳房里……舒服吗♪」`); // :2248
        } else {
          // :2249
          await era.printAndWait(`「舒服吗？不用忍受可以射出来哦♪」`); // :2250
        } // :2251
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :2252
        kojo.乳交 = 4; // :2252
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2254

        if (rand_n(3) == 0) {
          // :2257
          await era.printAndWait(`「${sc()}的胸……怎么样？？」`); // :2258
        } else if (rand_n(2) == 0) {
          // :2259
          await era.printAndWait(`「这样弄还行吗？」`); // :2260
        } else {
          // :2261
          await era.printAndWait(`「请好好地舒服起来吧${heart(1)}」`); // :2262
        } // :2263
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :2264
        kojo.乳交 = 3; // :2264
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        // :2266
        await era.printAndWait(`「用胸部夹就可以了吧……」`); // :2267
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :2268
        kojo.乳交 = 2; // :2268
      } // :2269
      return 0; // :2270
    } // :2271
  } // :2272

  if (era_flag.selectcom == 33) {
    // :2277

    if (kojo.股间性交 == 0) {
      // :2279

      if (era0(`talent:${target}:76`) == 1) {
        // :2281
        await era.printAndWait(`「阿拉、想进来想的不得了的肉棒呢♪」`); // :2282
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2284
        await era.printAndWait(`「啾啾的在做呢？　再稍微努力一点吧♪」`); // :2285
      } else {
        // :2287
        await era.printAndWait(`「在这里……摩擦就好了吗……」`); // :2288
      } // :2289
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :2290
      kojo.股间性交 = 1; // :2290
      return 0; // :2291
    } else {
      // :2293

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2295
        await era.printAndWait(
          `「想进来想的不得了吗？　呵呵、${sc()}的里面也疼的不得了呢♪」`,
        ); // :2296
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :2297
        kojo.股间性交 = 6; // :2297
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2299
        await era.printAndWait(`「期待小穴的肉棒颤抖着呢♪」`); // :2300
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :2301
        kojo.股间性交 = 5; // :2301
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2303
        await era.printAndWait(`「用肉棒摩擦处女小穴就可以忍耐了吗？」`); // :2304
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :2305
        kojo.股间性交 = 4; // :2305
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2307
        await era.printAndWait(`「为了让肉棒舒服起来、要忍耐啾啾的呢♪」`); // :2308
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :2309
        kojo.股间性交 = 3; // :2309
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        // :2311
        await era.printAndWait(`「在这里这么做……就可以了吗？」`); // :2312
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :2313
        kojo.股间性交 = 2; // :2313
      } // :2314
      return 0; // :2315
    } // :2316
  } // :2317

  if (era_flag.selectcom == 34) {
    // :2323

    if (kojo.骑乘位 == 0) {
      // :2325

      if (era0(`talent:${target}:0`) == 1) {
        // :2327

        if (era0(`talent:${target}:76`) == 1) {
          // :2329
          await era.printAndWait(''); // :2330
        } else if (era0(`talent:${target}:85`) == 1) {
          // :2332
          await era.printAndWait(''); // :2333
        } else {
          // :2335
          await era.printAndWait(''); // :2336
        } // :2337
      } else {
        // :2339

        if (era0(`talent:${target}:76`) == 1) {
          // :2341
          await era.printAndWait(''); // :2342
        } else if (era0(`talent:${target}:85`) == 1) {
          // :2344
          await era.printAndWait(''); // :2345
        } else {
          // :2347
          await era.printAndWait(''); // :2348
        } // :2349
      } // :2350
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :2351
      kojo.骑乘位 = 1; // :2351
      return 0; // :2352
    } else {
      // :2354

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2356
        if (rand_n(4) == 0) {
          // :2357
          await era.printAndWait(''); // :2358
        } else if (rand_n(3) == 0) {
          // :2359
          await era.printAndWait(''); // :2360
        } else if (rand_n(2) == 0) {
          // :2361
          await era.printAndWait(''); // :2362
        } else {
          // :2363
          await era.printAndWait(''); // :2364
        } // :2365
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :2366
        kojo.骑乘位 = 6; // :2366
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2368
        if (rand_n(4) == 0) {
          // :2369
          await era.print(''); // :2370
        } else if (rand_n(3) == 0) {
          // :2371
          await era.printAndWait(''); // :2372
        } else if (rand_n(2) == 0) {
          // :2373
          await era.printAndWait(''); // :2374
        } else {
          // :2375
          await era.printAndWait(''); // :2376
        } // :2377
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :2378
        kojo.骑乘位 = 5; // :2378
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2380
        if (rand_n(4) == 0) {
          // :2381
          await era.printAndWait(''); // :2382
        } else if (rand_n(3) == 0) {
          // :2383
          await era.printAndWait(''); // :2384
        } else if (rand_n(2) == 0) {
          // :2385
          await era.printAndWait(''); // :2386
        } else {
          // :2387
          await era.printAndWait(''); // :2388
        } // :2389
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :2390
        kojo.骑乘位 = 4; // :2390
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2392
        await era.print(''); // :2393
        await era.printAndWait(''); // :2394
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :2395
        kojo.骑乘位 = 3; // :2395
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2397
        await era.printAndWait(''); // :2398
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :2399
        kojo.骑乘位 = 2; // :2399
      } // :2400
      return 0; // :2401
    } // :2402
  } // :2403

  if (era_flag.selectcom == 35) {
    // :2408

    if (kojo.全身擦洗 == 0) {
      // :2410

      if (era0(`abl:${target}:16`) >= 3) {
        // :2412
        await era.printAndWait(''); // :2413
      } else {
        // :2415
        await era.printAndWait(''); // :2416
      } // :2417
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :2418
      kojo.全身擦洗 = 1; // :2418
      return 0; // :2419
    } else {
      // :2421

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2423
        await era.printAndWait(''); // :2424
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :2425
        kojo.全身擦洗 = 5; // :2425
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2427
        await era.printAndWait(''); // :2428
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :2429
        kojo.全身擦洗 = 4; // :2429
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2431
        await era.printAndWait(''); // :2432
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :2433
        kojo.全身擦洗 = 3; // :2433
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        // :2435
        await era.printAndWait(''); // :2436
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :2437
        kojo.全身擦洗 = 2; // :2437
      } // :2438
      return 0; // :2439
    } // :2440
  } // :2441

  if (era_flag.selectcom == 36) {
    // :2446

    if (kojo.骑乘位肛交 == 0) {
      // :2448

      if (era0(`talent:${target}:76`) == 1) {
        // :2450
        await era.printAndWait(''); // :2451
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2453
        await era.printAndWait(''); // :2454
      } else {
        // :2456
        await era.printAndWait(''); // :2457
      } // :2458
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :2459
      kojo.骑乘位肛交 = 1; // :2459
      return 0; // :2460
    } else {
      // :2462

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2464
        if (rand_n(2) == 0) {
          // :2465
          await era.printAndWait(''); // :2466
        } else {
          // :2467
          await era.printAndWait(''); // :2468
        } // :2469
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :2470
        kojo.骑乘位肛交 = 7; // :2470
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2472
        await era.printAndWait(''); // :2473
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :2474
        kojo.骑乘位肛交 = 6; // :2474
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2476
        if (rand_n(2) == 0) {
          // :2477
          await era.printAndWait(''); // :2478
        } else {
          // :2479
          await era.printAndWait(''); // :2480
        } // :2481
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :2482
        kojo.骑乘位肛交 = 5; // :2482
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2484
        await era.printAndWait(''); // :2485
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :2486
        kojo.骑乘位肛交 = 4; // :2486
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2488
        await era.printAndWait(''); // :2489
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :2490
        kojo.骑乘位肛交 = 3; // :2490
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2492
        await era.printAndWait(''); // :2493
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :2494
        kojo.骑乘位肛交 = 2; // :2494
      } // :2495
      return 0; // :2496
    } // :2497
  } // :2498

  if (era_flag.selectcom == 37) {
    // :2503

    if (kojo.肛门侍奉 == 0) {
      // :2505

      if (era0(`abl:${target}:16`) >= 3) {
        // :2507
        await era.printAndWait(''); // :2508
      } else {
        // :2510
        await era.printAndWait(''); // :2511
      } // :2512
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :2513
      kojo.肛门侍奉 = 1; // :2513
      return 0; // :2514
    } else {
      // :2516

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2518
        await era.printAndWait(''); // :2519
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :2520
        kojo.肛门侍奉 = 5; // :2520
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2522
        await era.print(''); // :2523
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :2524
        kojo.肛门侍奉 = 4; // :2524
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2526
        await era.printAndWait(''); // :2527
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :2528
        kojo.肛门侍奉 = 3; // :2528
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :2530
        await era.printAndWait(''); // :2531
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :2532
        kojo.肛门侍奉 = 2; // :2532
      } // :2533
      return 0; // :2534
    } // :2535
  } // :2536

  if (era_flag.selectcom == 40) {
    // :2541

    if (kojo.打屁股 == 0) {
      // :2543
      await era.printAndWait(`「不要、停下来吧……请停下来吧…」`); // :2544
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :2545
      kojo.打屁股 = 1; // :2545
      return 0; // :2546
    } else {
      // :2548

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2550
        await era.printAndWait(`「哎呀、屁股被拍的、啪啪响呢……去了♪」`); // :2551
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :2552
        kojo.打屁股 = 5; // :2552
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2554
        await era.printAndWait(`「惩罚…请更用力点……啊」`); // :2555
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :2556
        kojo.打屁股 = 4; // :2556
        return 0; // :2557
      } else if (
        era0(`mark:${target}:0`) == 3 &&
        era0(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2559
        await era.printAndWait(`「噫哈、噫、呜咕……明明好疼可是……哈啊♪」`); // :2560
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :2561
        kojo.打屁股 = 3; // :2561
        return 0; // :2562
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        // :2564
        await era.printAndWait(`「讨厌…停……噫」`); // :2565
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :2566
        kojo.打屁股 = 2; // :2566
      } // :2567
      return 0; // :2568
    } // :2569
  } // :2570

  if (era_flag.selectcom == 41) {
    // :2575

    if (kojo.鞭 == 0) {
      // :2577

      if (era0(`talent:${target}:76`) == 1) {
        // :2579
        await era.printAndWait(''); // :2580
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2582
        await era.printAndWait(''); // :2583
      } else {
        // :2585
        await era.printAndWait(''); // :2586
      } // :2587
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :2588
      kojo.鞭 = 1; // :2588
      return 0; // :2589
    } else {
      // :2591

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2593
        await era.printAndWait(''); // :2594
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :2595
        kojo.鞭 = 9; // :2595
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2597
        await era.printAndWait(''); // :2598
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :2599
        kojo.鞭 = 8; // :2599
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2601
        await era.printAndWait(''); // :2602
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :2603
        kojo.鞭 = 7; // :2603
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2605
        await era.printAndWait(''); // :2606
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :2607
        kojo.鞭 = 6; // :2607
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2609
        await era.printAndWait(''); // :2610
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :2611
        kojo.鞭 = 5; // :2611
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2613
        await era.printAndWait(''); // :2614
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :2615
        kojo.鞭 = 4; // :2615
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2617
        await era.printAndWait(''); // :2618
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :2619
        kojo.鞭 = 3; // :2619
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2621
        await era.printAndWait(''); // :2622
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :2623
        kojo.鞭 = 2; // :2623
      } // :2624
      return 0; // :2625
    } // :2626
  } // :2627

  if (era_flag.selectcom == 42) {
    // :2632

    if (kojo.针 == 0) {
      // :2634

      if (era0(`talent:${target}:76`) == 1) {
        // :2636
        await era.printAndWait(''); // :2637
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2639
        await era.printAndWait(''); // :2640
      } else {
        // :2642
        await era.printAndWait(''); // :2643
      } // :2644
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :2645
      kojo.针 = 1; // :2645
      return 0; // :2646
    } else {
      // :2648

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2650
        await era.printAndWait(''); // :2651
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :2652
        kojo.针 = 9; // :2652
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2654
        await era.printAndWait(''); // :2655
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :2656
        kojo.针 = 8; // :2656
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2658
        await era.printAndWait(''); // :2659
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :2660
        kojo.针 = 7; // :2660
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2662
        await era.printAndWait(''); // :2663
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :2664
        kojo.针 = 6; // :2664
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2666
        await era.printAndWait(''); // :2667
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :2668
        kojo.针 = 5; // :2668
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2670
        await era.printAndWait(''); // :2671
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :2672
        kojo.针 = 4; // :2672
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2674
        await era.printAndWait(''); // :2675
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :2676
        kojo.针 = 3; // :2676
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        // :2678
        await era.printAndWait(''); // :2679
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :2680
        kojo.针 = 2; // :2680
      } // :2681
      return 0; // :2682
    } // :2683
  } // :2684

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :2690

    if (kojo.眼罩 == 0) {
      // :2692

      if (era0(`talent:${target}:76`) == 1) {
        // :2694
        await era.printAndWait(''); // :2695
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2697
        await era.printAndWait(''); // :2698
      } else {
        // :2700
        await era.printAndWait(''); // :2701
      } // :2702
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :2703
      kojo.眼罩 = 1; // :2703
      return 0; // :2704
    } else {
      // :2706

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2708
        await era.printAndWait(''); // :2709
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :2710
        kojo.眼罩 = 9; // :2710
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2712
        await era.printAndWait(''); // :2713
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :2714
        kojo.眼罩 = 8; // :2714
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2716
        await era.printAndWait(''); // :2717
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :2718
        kojo.眼罩 = 7; // :2718
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2720
        await era.printAndWait(''); // :2721
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :2722
        kojo.眼罩 = 6; // :2722
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2724
        await era.printAndWait(''); // :2725
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :2726
        kojo.眼罩 = 5; // :2726
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2728
        await era.printAndWait(''); // :2729
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :2730
        kojo.眼罩 = 4; // :2730
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2732
        await era.printAndWait(''); // :2733
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :2734
        kojo.眼罩 = 3; // :2734
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :2736
        await era.printAndWait(''); // :2737
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :2738
        kojo.眼罩 = 2; // :2738
      } // :2739
      return 0; // :2740
    } // :2741
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :2743

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2745
      await era.printAndWait(''); // :2746
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :2747
      kojo.眼罩着脱 = 3; // :2747
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2749
      await era.printAndWait(''); // :2750
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :2751
      kojo.眼罩着脱 = 2; // :2751
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2753
      await era.printAndWait(''); // :2754
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :2755
      kojo.眼罩着脱 = 1; // :2755
    } // :2756
    return 0; // :2757
  } // :2758

  if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`)) {
    // :2764

    if (kojo.绳子 == 0) {
      // :2766

      if (era0(`talent:${target}:76`) == 1) {
        // :2768
        await era.printAndWait(''); // :2769
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2771
        await era.printAndWait(''); // :2772
      } else {
        // :2774
        await era.printAndWait(''); // :2775
      } // :2776
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :2777
      kojo.绳子 = 1; // :2777
      return 0; // :2778
    } else {
      // :2780

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2782
        await era.printAndWait(''); // :2783
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :2784
        kojo.绳子 = 9; // :2784
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2786
        await era.printAndWait(''); // :2787
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :2788
        kojo.绳子 = 8; // :2788
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2790
        await era.printAndWait(''); // :2791
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :2792
        kojo.绳子 = 7; // :2792
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2794
        await era.printAndWait(''); // :2795
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :2796
        kojo.绳子 = 6; // :2796
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2798
        await era.printAndWait(''); // :2799
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :2800
        kojo.绳子 = 5; // :2800
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2802
        await era.printAndWait(''); // :2803
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :2804
        kojo.绳子 = 4; // :2804
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2806
        await era.printAndWait(''); // :2807
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :2808
        kojo.绳子 = 3; // :2808
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        // :2810
        await era.printAndWait(''); // :2811
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :2812
        kojo.绳子 = 2; // :2812
      } // :2813
      return 0; // :2814
    } // :2815
  } else if (era_flag.selectcom == 44 && era0(`tequip:${target}:44`) == 0) {
    // :2817

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2819
      await era.printAndWait(''); // :2820
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2821
      kojo.绳子着脱 = 2; // :2821
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2823
      await era.printAndWait(''); // :2824
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2825
      kojo.绳子着脱 = 2; // :2825
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2827
      await era.printAndWait(''); // :2828
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :2829
      kojo.绳子着脱 = 1; // :2829
    } // :2830
    return 0; // :2831
  } // :2832

  if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`)) {
    // :2838

    if (kojo.口塞 == 0) {
      // :2840

      if (era0(`talent:${target}:76`) == 1) {
        // :2842
        await era.printAndWait(''); // :2843
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2845
        await era.printAndWait(''); // :2846
      } else {
        // :2848
        await era.printAndWait(''); // :2849
      } // :2850
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :2851
      kojo.口塞 = 1; // :2851
      return 0; // :2852
    } else {
      // :2854

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2856
        await era.printAndWait(''); // :2857
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :2858
        kojo.口塞 = 9; // :2858
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2860
        await era.printAndWait(''); // :2861
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :2862
        kojo.口塞 = 8; // :2862
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2864
        await era.printAndWait(''); // :2865
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :2866
        kojo.口塞 = 7; // :2866
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2868
        await era.printAndWait(''); // :2869
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :2870
        kojo.口塞 = 6; // :2870
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2872
        await era.printAndWait(''); // :2873
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :2874
        kojo.口塞 = 5; // :2874
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2876
        await era.printAndWait(''); // :2877
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :2878
        kojo.口塞 = 4; // :2878
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2880
        await era.printAndWait(''); // :2881
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :2882
        kojo.口塞 = 3; // :2882
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        // :2884
        await era.printAndWait(''); // :2885
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :2886
        kojo.口塞 = 2; // :2886
      } // :2887
      return 0; // :2888
    } // :2889
  } else if (era_flag.selectcom == 45 && era0(`tequip:${target}:45`) == 0) {
    // :2891

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2893
      await era.printAndWait(''); // :2894
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :2895
      kojo.口塞着脱 = 3; // :2895
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2897
      await era.printAndWait(''); // :2898
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :2899
      kojo.口塞着脱 = 2; // :2899
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2901
      await era.printAndWait(''); // :2902
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :2903
      kojo.口塞着脱 = 1; // :2903
    } // :2904
    return 0; // :2905
  } // :2906

  if (era_flag.selectcom == 46 && era0(`tequip:${target}:46`)) {
    // :2912

    if (kojo.灌肠肛塞 == 0) {
      // :2914

      if (era0(`talent:${target}:76`) == 1) {
        // :2916
        await era.printAndWait(''); // :2917
      } else if (era0(`talent:${target}:85`) == 1) {
        // :2919
        await era.printAndWait(''); // :2920
      } else {
        // :2922
        await era.printAndWait(''); // :2923
      } // :2924
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :2925
      kojo.灌肠肛塞 = 1; // :2925
      return 0; // :2926
    } else {
      // :2928

      if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2930
        await era.printAndWait(''); // :2931
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :2932
        kojo.灌肠肛塞 = 7; // :2932
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2934
        await era.printAndWait(''); // :2935
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :2936
        kojo.灌肠肛塞 = 6; // :2936
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2938
        await era.printAndWait(''); // :2939
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :2940
        kojo.灌肠肛塞 = 5; // :2940
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2942
        await era.printAndWait(''); // :2943
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :2944
        kojo.灌肠肛塞 = 4; // :2944
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2946
        await era.printAndWait(''); // :2947
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :2948
        kojo.灌肠肛塞 = 3; // :2948
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        // :2950
        await era.printAndWait(''); // :2951
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :2952
        kojo.灌肠肛塞 = 2; // :2952
      } // :2953
      return 0; // :2954
    } // :2955
  } // :2956

  if (era_flag.selectcom == 55) {
    // :2961

    if (kojo.放置PLAY == 0) {
      // :2963

      if (era0(`talent:${target}:85`) == 1) {
        // :2965
        await era.printAndWait(''); // :2966
      } else {
        // :2968
        await era.printAndWait(''); // :2969
      } // :2970
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :2971
      kojo.放置PLAY = 1; // :2971
      return 0; // :2972
    } else {
      // :2974

      if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`palam:${target}:5`) >= era0('palamlv:3') &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2976
        await era.printAndWait(''); // :2977
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :2978
        kojo.放置PLAY = 4; // :2978
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2980
        await era.printAndWait(''); // :2981
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :2982
        kojo.放置PLAY = 3; // :2982
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        // :2984
        await era.printAndWait(''); // :2985
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :2986
        kojo.放置PLAY = 2; // :2986
      } // :2987
      return 0; // :2988
    } // :2989
  } // :2990

  if (era_flag.selectcom == 56) {
    // :2996

    if (kojo.交谈 == 0) {
      // :2998
      if (era0(`tequip:${target}:53`)) {
        // :2999

        if (era0(`talent:${target}:76`) == 1) {
          // :3002
          await era.printAndWait(
            `「初次见面。这里是原${get_look_info(target, '成为勇者前的生活')}的${target_name}」`,
          ); // :3003
          await era.printAndWait(
            `「${sc()}身体和心都沦陷了、成为了魔王大人的性奴隶了♪」`,
          ); // :3004
          if (era0(`talent:${target}:157`)) {
            // :3005
            await era.printAndWait(
              `「故乡的老公、对不起。现在你的差劲肉棒已经满足不了${sc()}了、」`,
            ); // :3006
            await era.printAndWait(
              `「${sc()}已经成了的脑海里只有魔王大人的肉棒的浪货了」`,
            ); // :3007
          } else {
            // :3008
            await era.printAndWait(
              `「故乡的大家、对不起。${sc()}的人生就此结束了。」`,
            ); // :3009
            await era.printAndWait(
              `「从现在开始${sc()}就是魔王军的专属的性奴隶、正走向新的人生。」`,
            ); // :3010
          } // :3011
          await era.printAndWait(
            `「听说这个录像要分发给邻近的村落看、心里碰碰直跳的……」`,
          ); // :3012
          if (era0(`talent:${target}:157`)) {
            // :3013
            await era.printAndWait(
              `「亲爱的、好好看着${sc()}这副淫荡的模样、撸起你的差劲肉棒吧♪」`,
            ); // :3014
          } else {
            // :3015
            await era.printAndWait(
              `「请各位、看着${sc()}这淫荡的样子、把鸡巴撸起来吧♪」`,
            ); // :3016
          } // :3017
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3019
          await era.printAndWait(
            `「初次见面。原${get_look_info(target, '成为勇者前的生活')}的${target_name}」`,
          ); // :3020
          await era.printAndWait(
            `「${sc()}身体和心都沦陷了、成为魔王大人爱的奴隶。♪」`,
          ); // :3021
          if (era0(`talent:${target}:157`)) {
            // :3022
            await era.printAndWait(
              `「故乡的老公、对不起。但、${sc()}现在还是爱你的」`,
            ); // :3023
          } else {
            // :3024
            await era.printAndWait(
              `「故乡的大家、对不起。${sc()}找到了真正的港湾」`,
            ); // :3025
            await era.printAndWait(
              `「从现在开始、${sc()}成为魔王军的一员从而走上新的人生。」`,
            ); // :3026
          } // :3027
          await era.printAndWait(
            `「听说这个录像要分发给邻近的村落看、心里七上八下的……」`,
          ); // :3028
          if (era0(`talent:${target}:157`)) {
            // :3029
            await era.printAndWait(`「亲爱的、${sc()}永远爱着你……」`); // :3030
            await era.printAndWait(
              `「不过${sc()}希望故乡的你你找到新的幸福、忘记${sc()}」`,
            ); // :3031
          } else {
            // :3032
            await era.printAndWait(
              `「请各位、看着${sc()}这受尽疼爱的样子、撸起来吧♪」`,
            ); // :3033
          } // :3034
        } else {
          // :3036
          await era.printAndWait(''); // :3037
        } // :3038
      } else {
        // :3039

        if (era0(`talent:${target}:76`) == 1) {
          // :3041
          await era.printAndWait(''); // :3042
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3044
          await era.printAndWait(''); // :3045
        } else {
          // :3047
          await era.printAndWait(''); // :3048
        } // :3049
      } // :3050
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :3051
      kojo.交谈 = 1; // :3051
      return 0; // :3052
    } else {
      // :3054
      if (era0(`tequip:${target}:53`)) {
        // :3055

        if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :3058
          await era.printAndWait(''); // :3059
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :3060
          kojo.交谈 = 4; // :3060
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :3062
          await era.printAndWait(''); // :3063
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :3064
          kojo.交谈 = 3; // :3064
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :3066
          await era.printAndWait(''); // :3067
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :3068
          kojo.交谈 = 2; // :3068
        } // :3069
      } else {
        // :3070

        if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :3072
          await era.printAndWait(''); // :3073
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :3074
          kojo.交谈 = 4; // :3074
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :3076
          await era.printAndWait(''); // :3077
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :3078
          kojo.交谈 = 3; // :3078
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :3080
          await era.printAndWait(''); // :3081
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :3082
          kojo.交谈 = 2; // :3082
        } // :3083
      } // :3084
      return 0; // :3085
    } // :3086
  } // :3087

  if (era_flag.selectcom == 123) {
    // :3091

    if (kojo.乳夹口交 == 0) {
      // :3093

      if (era0(`talent:${target}:76`) == 1) {
        // :3095
        await era.printAndWait(''); // :3096
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3098
        await era.printAndWait(''); // :3099
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3101
        await era.printAndWait(''); // :3102
      } else {
        // :3104
        await era.printAndWait(''); // :3105
      } // :3106
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :3107
      kojo.乳夹口交 = 1; // :3107
      return 0; // :3108
    } else {
      // :3110

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3112
        await era.printAndWait(''); // :3113
        // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :3114
        kojo.乳夹口交 = 5; // :3114
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3116
        await era.printAndWait(''); // :3117
        // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :3118
        kojo.乳夹口交 = 4; // :3118
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3120
        await era.printAndWait(''); // :3121
        // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :3122
        kojo.乳夹口交 = 3; // :3122
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3124
        await era.printAndWait(''); // :3125
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :3126
        kojo.乳夹口交 = 2; // :3126
      } // :3127
      return 0; // :3128
    } // :3129
  } // :3130

  if (era_flag.selectcom == 125) {
    // :3134

    if (kojo.口交时自慰 == 0) {
      // :3136

      if (era0(`talent:${target}:76`) == 1) {
        // :3138
        await era.printAndWait(''); // :3139
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3141
        await era.printAndWait(''); // :3142
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3144
        await era.printAndWait(''); // :3145
      } else {
        // :3147
        await era.printAndWait(''); // :3148
      } // :3149
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :3150
      kojo.口交时自慰 = 1; // :3150
      return 0; // :3151
    } else {
      // :3153

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3155
        await era.printAndWait(''); // :3156
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :3157
        kojo.口交时自慰 = 5; // :3157
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3159
        await era.printAndWait(''); // :3160
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :3161
        kojo.口交时自慰 = 4; // :3161
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3163
        await era.printAndWait(''); // :3164
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :3165
        kojo.口交时自慰 = 3; // :3165
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :3167
        await era.printAndWait(''); // :3168
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :3169
        kojo.口交时自慰 = 2; // :3169
      } // :3170
      return 0; // :3171
    } // :3172
  } // :3173

  if (era_flag.selectcom == 126) {
    // :3178

    if (kojo.手搓口交 == 0) {
      // :3180

      if (era0(`talent:${target}:76`) == 1) {
        // :3182
        await era.printAndWait(''); // :3183
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3185
        await era.printAndWait(''); // :3186
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3188
        await era.printAndWait(''); // :3189
      } else {
        // :3191
        await era.printAndWait(''); // :3192
      } // :3193
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :3194
      kojo.手搓口交 = 1; // :3194
      return 0; // :3195
    } else {
      // :3197

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3199
        await era.printAndWait(''); // :3200
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :3201
        kojo.手搓口交 = 5; // :3201
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3203
        await era.printAndWait(''); // :3204
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :3205
        kojo.手搓口交 = 4; // :3205
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3207
        await era.printAndWait(''); // :3208
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :3209
        kojo.手搓口交 = 3; // :3209
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3211
        await era.printAndWait(''); // :3212
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :3213
        kojo.手搓口交 = 2; // :3213
      } // :3214
      return 0; // :3215
    } // :3216
  } // :3217

  if (era_flag.selectcom == 127) {
    // :3222

    if (kojo.真空口交 == 0) {
      // :3224

      if (era0(`talent:${target}:76`) == 1) {
        // :3226
        await era.printAndWait(''); // :3227
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3229
        await era.printAndWait(''); // :3230
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3232
        await era.printAndWait(''); // :3233
      } else {
        // :3235
        await era.printAndWait(''); // :3236
      } // :3237
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :3238
      kojo.真空口交 = 1; // :3238
      return 0; // :3239
    } else {
      // :3241

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3243
        await era.printAndWait(''); // :3244
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :3245
        kojo.真空口交 = 5; // :3245
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3247
        await era.printAndWait(''); // :3248
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :3249
        kojo.真空口交 = 4; // :3249
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3251
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :3252
        kojo.真空口交 = 3; // :3252
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3254
        await era.printAndWait(''); // :3255
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :3256
        kojo.真空口交 = 2; // :3256
      } // :3257
      return 0; // :3258
    } // :3259
  } // :3260

  if (era_flag.selectcom == 69) {
    // :3265

    if (kojo.六九式 == 0) {
      // :3267

      if (era0(`talent:${target}:76`) == 1) {
        // :3269
        await era.printAndWait(''); // :3270
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3272
        await era.printAndWait(''); // :3273
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3275
        await era.printAndWait(''); // :3276
      } else {
        // :3278
        await era.printAndWait(''); // :3279
      } // :3280
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :3281
      kojo.六九式 = 1; // :3281
      return 0; // :3282
    } else {
      // :3284

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3286
        await era.printAndWait(''); // :3287
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :3288
        kojo.六九式 = 5; // :3288
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3290
        await era.printAndWait(''); // :3291
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :3292
        kojo.六九式 = 4; // :3292
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3294
        await era.printAndWait(''); // :3295
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :3296
        kojo.六九式 = 3; // :3296
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        // :3298
        await era.printAndWait(''); // :3299
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :3300
        kojo.六九式 = 2; // :3300
      } // :3301
      return 0; // :3302
    } // :3303
  } // :3304

  if (era_flag.selectcom == 124) {
    // :3309

    if (kojo.深喉 == 0) {
      // :3311

      if (era0(`talent:${target}:76`) == 1) {
        // :3313
        await era.printAndWait(''); // :3314
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3316
        await era.printAndWait(''); // :3317
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3319
        await era.printAndWait(''); // :3320
      } else {
        // :3322
        await era.printAndWait(''); // :3323
      } // :3324
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :3325
      kojo.深喉 = 1; // :3325
      return 0; // :3326
    } else {
      // :3328

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3330
        await era.printAndWait(''); // :3331
        // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :3332
        kojo.深喉 = 5; // :3332
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3334
        await era.printAndWait(''); // :3335
        // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :3336
        kojo.深喉 = 4; // :3336
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3338
        await era.printAndWait(''); // :3339
        // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :3340
        kojo.深喉 = 3; // :3340
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3342
        await era.printAndWait(''); // :3343
        // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :3344
        kojo.深喉 = 2; // :3344
      } // :3345
      return 0; // :3346
    } // :3347
  } // :3348

  if (era_flag.selectcom == 80) {
    // :3353

    if (kojo.强制口交 == 0) {
      // :3355

      if (era0(`talent:${target}:76`) == 1) {
        // :3357
        await era.printAndWait(''); // :3358
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :3360
        await era.printAndWait(''); // :3361
      } else {
        // :3363
        await era.printAndWait(''); // :3364
      } // :3365
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :3366
      kojo.强制口交 = 1; // :3366
      return 0; // :3367
    } else {
      // :3369

      if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3371
        await era.printAndWait(''); // :3372
        // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :3373
        kojo.强制口交 = 5; // :3373
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3375
        await era.printAndWait(''); // :3376
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :3377
        kojo.强制口交 = 4; // :3377
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3379
        await era.printAndWait(''); // :3380
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :3381
        kojo.强制口交 = 3; // :3381
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3383
        await era.printAndWait(''); // :3384
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :3385
        kojo.强制口交 = 2; // :3385
      } // :3386
      return 0; // :3387
    } // :3388
  } // :3389

  if (era_flag.selectcom == 87) {
    // :3396

    if (kojo.穿环 == 0) {
      // :3399

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3401
        await era.printAndWait(''); // :3402
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3404

        if (chara(target).train.穿环状态 & P) {
          // :3406
          await era.printAndWait(''); // :3407

          if (P == 1) {
            // :3409
            await era.printAndWait(''); // :3410
          } else if (P == 2) {
            // :3412
            await era.printAndWait(''); // :3413
          } else if (P == 4) {
            // :3415
            await era.printAndWait(''); // :3416
          } else if (P == 8) {
            // :3418

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3420
              await era.printAndWait(''); // :3421
            } else {
              // :3422
              await era.printAndWait(''); // :3423
            } // :3424
          } else if (P == 16) {
            // :3426
            await era.printAndWait(''); // :3427
          } else if (P == 32) {
            // :3429
            await era.printAndWait(''); // :3430
          } else if (P == 64) {
            // :3432
            await era.printAndWait(''); // :3433
          } // :3434
        } else {
          // :3436
          await era.printAndWait(''); // :3437
        } // :3438
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3440

        if (chara(target).train.穿环状态 & P) {
          // :3442
          await era.printAndWait(''); // :3443

          if (P == 1) {
            // :3445
            await era.printAndWait(''); // :3446
          } else if (P == 2) {
            // :3448
            await era.printAndWait(''); // :3449
          } else if (P == 4) {
            // :3451
            await era.printAndWait(''); // :3452
          } else if (P == 8) {
            // :3454

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3456
              await era.printAndWait(''); // :3457
            } else {
              // :3458
              await era.printAndWait(''); // :3459
            } // :3460
          } else if (P == 16) {
            // :3462
            await era.printAndWait(''); // :3463
          } else if (P == 32) {
            // :3465
            await era.printAndWait(''); // :3466
          } else if (P == 64) {
            // :3468
            await era.printAndWait(''); // :3469
          } // :3470
        } else {
          // :3472
          await era.printAndWait(''); // :3473
        } // :3474
      } else {
        // :3476

        if (chara(target).train.穿环状态 & P) {
          // :3478
          await era.printAndWait(''); // :3479

          if (P == 1) {
            // :3481
            await era.printAndWait(''); // :3482
          } else if (P == 2) {
            // :3484
            await era.printAndWait(''); // :3485
          } else if (P == 4) {
            // :3487
            await era.printAndWait(''); // :3488
          } else if (P == 8) {
            // :3490

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3492
              await era.printAndWait(''); // :3493
            } else {
              // :3494
              await era.printAndWait(''); // :3495
            } // :3496
          } else if (P == 16) {
            // :3498
            await era.printAndWait(''); // :3499
          } else if (P == 32) {
            // :3501
            await era.printAndWait(''); // :3502
          } else if (P == 64) {
            // :3504
            await era.printAndWait(''); // :3505
          } // :3506
        } else {
          // :3508
          await era.printAndWait(''); // :3509
        } // :3510
      } // :3511
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :3512
      kojo.穿环 = 1; // :3512
      return 0; // :3513
    } else {
      // :3515

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3517
        await era.printAndWait(''); // :3518
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3520

        if (chara(target).train.穿环状态 & P) {
          // :3522

          if (P == 1) {
            // :3524
            await era.printAndWait(''); // :3525
          } else if (P == 2) {
            // :3527
            await era.printAndWait(''); // :3528
          } else if (P == 4) {
            // :3530
            await era.printAndWait(''); // :3531
          } else if (P == 8) {
            // :3533

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3535
              await era.printAndWait(''); // :3536
            } else {
              // :3537
              await era.printAndWait(''); // :3538
            } // :3539
          } else if (P == 16) {
            // :3541
            await era.printAndWait(''); // :3542
          } else if (P == 32) {
            // :3544
            await era.printAndWait(''); // :3545
          } else if (P == 64) {
            // :3547
            await era.printAndWait(''); // :3548
          } // :3549
        } else {
          // :3551
          await era.printAndWait(''); // :3552
        } // :3553
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :3554
        kojo.穿环 = 4; // :3554
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3556

        if (chara(target).train.穿环状态 & P) {
          // :3558

          if (P == 1) {
            // :3560
            await era.printAndWait(''); // :3561
          } else if (P == 2) {
            // :3563
            await era.printAndWait(''); // :3564
          } else if (P == 4) {
            // :3566
            await era.printAndWait(''); // :3567
          } else if (P == 8) {
            // :3569
            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3570
              await era.printAndWait(''); // :3571
            } else {
              // :3572
              await era.printAndWait(''); // :3573
            } // :3574
          } else if (P == 16) {
            // :3576
            await era.printAndWait(''); // :3577
          } else if (P == 32) {
            // :3579
            await era.printAndWait(''); // :3580
          } else if (P == 64) {
            // :3582
            await era.printAndWait(''); // :3583
          } // :3584
        } else {
          // :3586
          await era.printAndWait(''); // :3587
        } // :3588
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :3589
        kojo.穿环 = 3; // :3589
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        // :3591

        if (chara(target).train.穿环状态 & P) {
          // :3593

          if (P == 1) {
            // :3595
            await era.printAndWait(''); // :3596
          } else if (P == 2) {
            // :3598
            await era.printAndWait(''); // :3599
          } else if (P == 4) {
            // :3601
            await era.printAndWait(''); // :3602
          } else if (P == 8) {
            // :3604

            if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {
              // :3606
              await era.printAndWait(''); // :3607
            } else {
              // :3608
              await era.printAndWait(''); // :3609
            } // :3610
          } else if (P == 16) {
            // :3612
            await era.printAndWait(''); // :3613
          } else if (P == 32) {
            // :3615
            await era.printAndWait(''); // :3616
          } else if (P == 64) {
            // :3618
            await era.printAndWait(''); // :3619
          } // :3620
        } else {
          // :3622
          await era.printAndWait(''); // :3623
        } // :3624
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :3625
        kojo.穿环 = 2; // :3625
      } // :3626
    } // :3627
    return 0; // :3628
  } // :3629
}

// @DOG_KOJO_13 // :3637
async function dog_kojo_13(rand) {
  const { rand_n, target, sc, kojo } = bind_ctx(rand);

  if (era_flag.selectcom == 0) {
    // :3642

    if (kojo.爱抚 == 0) {
      // :3644

      if (era0(`mark:${target}:2`) >= 2) {
        // :3646
        await era.printAndWait(`「明白了啦……和狗、呜呜……和…狗……」`); // :3647
      } else {
        // :3649
        await era.printAndWait(`「噫、干什么……？」`); // :3650
      } // :3651
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :3652
      kojo.爱抚 = 1; // :3652
      return 0; // :3653
    } else {
      // :3655

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3657
        await era.printAndWait(`「啊、再多舔一舔啊……${sc()}、最喜欢狗狗了……」`); // :3658
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :3659
        kojo.爱抚 = 7; // :3659
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3661
        await era.printAndWait(`「好奇妙的感觉……」`); // :3662
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :3663
        kojo.爱抚 = 6; // :3663
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3665
        await era.printAndWait(`「好奇妙的感觉……」`); // :3666
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :3667
        kojo.爱抚 = 5; // :3667
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3669
        await era.printAndWait(`「呜……不会再反抗了……」`); // :3670
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :3671
        kojo.爱抚 = 4; // :3671
      } else if (
        era0(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3673
        await era.printAndWait(`「嘤……不要动得、太过头啊……」`); // :3674
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :3675
        kojo.爱抚 = 3; // :3675
      } else if (
        era0(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :3677
        await era.printAndWait(`「呜……咕……」`); // :3678
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :3679
        kojo.爱抚 = 2; // :3679
      } // :3680
      return 0; // :3681
    } // :3682
  } // :3683

  if (era_flag.selectcom == 1) {
    // :3688

    if (kojo.舔阴 == 0) {
      // :3690

      if (era0(`talent:${target}:0`) == 1) {
        // :3692
        await era.printAndWait(''); // :3693
      } else {
        // :3695
        await era.printAndWait(''); // :3696
      } // :3697
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :3698
      kojo.舔阴 = 1; // :3698
      return 0; // :3699
    } else {
      // :3701

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3703
        await era.printAndWait(''); // :3704
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :3705
        kojo.舔阴 = 6; // :3705
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3707
        await era.printAndWait(''); // :3708
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :3709
        kojo.舔阴 = 5; // :3709
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3711
        await era.printAndWait(''); // :3712
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :3713
        kojo.舔阴 = 4; // :3713
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3715
        await era.printAndWait(''); // :3716
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :3717
        kojo.舔阴 = 3; // :3717
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :3719
        await era.printAndWait(''); // :3720
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :3721
        kojo.舔阴 = 2; // :3721
      } // :3722
      return 0; // :3723
    } // :3724
  } // :3725

  if (era_flag.selectcom == 5) {
    // :3731

    if (kojo.胸爱抚 == 0) {
      // :3733

      if (era0(`talent:${target}:85`) == 1) {
        // :3735
        await era.printAndWait(''); // :3736
      } else {
        // :3738
        await era.printAndWait(''); // :3739
      } // :3740
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :3741
      kojo.胸爱抚 = 1; // :3741
      return 0; // :3742
    } else {
      // :3744

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3746
        await era.printAndWait(''); // :3747
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :3748
        kojo.胸爱抚 = 6; // :3748
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3750
        await era.printAndWait(''); // :3751
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :3752
        kojo.胸爱抚 = 5; // :3752
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3754
        await era.printAndWait(''); // :3755
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :3756
        kojo.胸爱抚 = 4; // :3756
      } else if (
        era0(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3758
        await era.printAndWait(''); // :3759
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :3760
        kojo.胸爱抚 = 3; // :3760
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :3762
        await era.printAndWait(''); // :3763
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :3764
        kojo.胸爱抚 = 2; // :3764
      } // :3765
      return 0; // :3766
    } // :3767
  } // :3768

  if (era_flag.selectcom == 6) {
    // :3773

    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :3775

      if (era0(`talent:${target}:136`) == 1) {
        // :3777
        await era.printAndWait(''); // :3778
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3780
        await era.printAndWait(''); // :3781
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3783
        await era.printAndWait(''); // :3784
      } else {
        // :3786
        await era.printAndWait(''); // :3787
      } // :3788
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :3789
      kojo.接吻 = 1; // :3789
      return 0; // :3790
    } else if (kojo.接吻 == 0) {
      // :3792

      if (era0(`talent:${target}:136`) == 1) {
        // :3794
        await era.printAndWait(''); // :3795
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3797
        await era.printAndWait(''); // :3798
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3800
        await era.printAndWait(''); // :3801
      } else {
        // :3803
        await era.printAndWait(''); // :3804
      } // :3805
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :3806
      kojo.接吻 = 1; // :3806
      return 0; // :3807
    } else {
      // :3809

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3811
        await era.printAndWait(''); // :3812
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :3813
        kojo.接吻 = 6; // :3813
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3815
        await era.printAndWait(''); // :3816
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :3817
        kojo.接吻 = 5; // :3817
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3819
        await era.printAndWait(''); // :3820
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :3821
        kojo.接吻 = 4; // :3821
      } else if (
        era0(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3823
        await era.printAndWait(''); // :3824
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :3825
        kojo.接吻 = 3; // :3825
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :3827
        await era.printAndWait(''); // :3828
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :3829
        kojo.接吻 = 2; // :3829
      } // :3830
      return 0; // :3831
    } // :3832
  } // :3833

  if (era_flag.selectcom == 9) {
    // :3838

    if (kojo.舔肛 == 0) {
      // :3840

      if (era0(`talent:${target}:136`) == 1) {
        // :3842
        await era.printAndWait(''); // :3843
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3845
        await era.printAndWait(''); // :3846
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3848
        await era.printAndWait(''); // :3849
      } else {
        // :3851
        await era.printAndWait(''); // :3852
      } // :3853
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :3854
      kojo.舔肛 = 1; // :3854
      return 0; // :3855
    } else {
      // :3857

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3859
        await era.printAndWait(''); // :3860
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :3861
        kojo.舔肛 = 6; // :3861
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3863
        await era.printAndWait(''); // :3864
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :3865
        kojo.舔肛 = 5; // :3865
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3867
        await era.printAndWait(''); // :3868
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :3869
        kojo.舔肛 = 4; // :3869
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3871
        await era.printAndWait(''); // :3872
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :3873
        kojo.舔肛 = 3; // :3873
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :3875
        await era.printAndWait(''); // :3876
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :3877
        kojo.舔肛 = 2; // :3877
      } // :3878
      return 0; // :3879
    } // :3880
  } // :3881

  if (era_flag.selectcom == 21) {
    // :3886

    if (kojo.背后位 == 0) {
      // :3888

      if (era0(`talent:${target}:0`) == 1) {
        // :3890

        if (era0(`talent:${target}:136`) == 1) {
          // :3892
          await era.printAndWait(`「${sc()}的第一次、要献给汪酱了～……♪」`); // :3893
        } else if (era0(`talent:${target}:76`) == 1) {
          // :3895
          await era.printAndWait(`「${sc()}的第一次、要和汪酱么？」`); // :3896
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3898
          await era.printAndWait(`「${sc()}的第一次、要和汪酱么？」`); // :3899
        } else {
          // :3902
          await era.printAndWait(
            `「呜呜……${sc()}还是第一次……居然要和汪酱…………」`,
          ); // :3903
        } // :3904
      } else {
        // :3906

        if (era0(`talent:${target}:136`) == 1) {
          // :3908
          await era.printAndWait(`「汪酱～终于要交配了呢～……♪」`); // :3909
        } else if (era0(`talent:${target}:76`) == 1) {
          // :3911
          await era.printAndWait(`「要和汪酱爱爱是吗？」`); // :3912
        } else if (era0(`talent:${target}:85`) == 1) {
          // :3914
          await era.printAndWait(`「要和汪酱爱爱是吗？」`); // :3915
        } else {
          // :3917
          await era.printAndWait(`「要和汪酱交配什么的……」`); // :3918
        } // :3919
      } // :3920
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :3921
      kojo.背后位 = 1; // :3921
      return 0; // :3922
    } else {
      // :3924

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3926
        if (rand_n(3) == 0) {
          // :3927
          await era.printAndWait(`「和汪酱交配～好幸福～♪」`); // :3928
        } else if (rand_n(2) == 0) {
          // :3929
          await era.printAndWait(`「来吧～汪酱～来交配吧～♪」`); // :3930
        } else {
          // :3931
          await era.printAndWait(`「呵呵～汪酱、一副忍不了想交配的样子呢～♪」`); // :3932
        } // :3933
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :3934
        kojo.背后位 = 7; // :3934
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3936
        if (rand_n(3) == 0) {
          // :3937
          await era.printAndWait(`「要和汪酱爱爱是吗？」`); // :3938
        } else if (rand_n(2) == 0) {
          // :3939
          await era.printAndWait(`「要和汪酱爱爱是吗？」`); // :3940
        } else {
          // :3941
          await era.printAndWait(`「要和汪酱爱爱是吗？」`); // :3942
        } // :3943
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :3944
        kojo.背后位 = 6; // :3944
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3946
        if (rand_n(3) == 0) {
          // :3947
          await era.printAndWait(`「要和狗狗爱爱是吗？」`); // :3948
        } else if (rand_n(2) == 0) {
          // :3949
          await era.printAndWait(`「要和狗狗爱爱是吗？」`); // :3950
        } else {
          // :3951
          await era.printAndWait(`「要和狗狗爱爱是吗？」`); // :3952
        } // :3953
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :3954
        kojo.背后位 = 5; // :3954
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3956
        await era.printAndWait(`「要和狗狗交配是吧……好、我明白了……」`); // :3957
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :3958
        kojo.背后位 = 4; // :3958
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3960
        await era.printAndWait(`「要和狗狗交配是吧……好、我明白了……」`); // :3961
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :3962
        kojo.背后位 = 3; // :3962
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :3964
        await era.printAndWait(`「要和狗狗交配什么的……」`); // :3965

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :3967
        kojo.背后位 = 2; // :3967
      } // :3968
      return 0; // :3969
    } // :3970
  } // :3971

  if (era_flag.selectcom == 27) {
    // :3976

    if (kojo.背后位肛交 == 0) {
      // :3978

      if (era0(`talent:${target}:136`) == 1) {
        // :3980
        await era.printAndWait(''); // :3981
      } else if (era0(`talent:${target}:76`) == 1) {
        // :3983
        await era.printAndWait(''); // :3984
      } else if (era0(`talent:${target}:85`) == 1) {
        // :3986
        await era.printAndWait(''); // :3987
      } else {
        // :3989
        await era.printAndWait(''); // :3990
      } // :3991
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :3992
      kojo.背后位肛交 = 1; // :3992
      return 0; // :3993
    } else {
      // :3995

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3997
        if (rand_n(2) == 0) {
          // :3998
          await era.printAndWait(''); // :3999
        } else {
          // :4000
          await era.printAndWait(''); // :4001
        } // :4002
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :4003
        kojo.背后位肛交 = 7; // :4003
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4005
        if (rand_n(2) == 0) {
          // :4006
          await era.printAndWait(''); // :4007
        } else {
          // :4008
          await era.printAndWait(''); // :4009
        } // :4010
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :4011
        kojo.背后位肛交 = 6; // :4011
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4013
        if (rand_n(2) == 0) {
          // :4014
          await era.printAndWait(''); // :4015
        } else {
          // :4016
          await era.printAndWait(''); // :4017
        } // :4018
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :4019
        kojo.背后位肛交 = 5; // :4019
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4021
        await era.printAndWait(''); // :4022
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :4023
        kojo.背后位肛交 = 4; // :4023
      } else if (
        era0(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4025
        await era.printAndWait(''); // :4026
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :4027
        kojo.背后位肛交 = 3; // :4027
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :4029
        await era.printAndWait(''); // :4030
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :4031
        kojo.背后位肛交 = 2; // :4031
      } // :4032
      return 0; // :4033
    } // :4034
  } // :4035

  if (era_flag.selectcom == 30) {
    // :4040

    if (kojo.手淫 == 0) {
      // :4042

      if (era0(`talent:${target}:76`) == 1) {
        // :4044
        await era.printAndWait(''); // :4045
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4047
        await era.printAndWait(''); // :4048
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4050
        await era.printAndWait(''); // :4051
      } else {
        // :4053
        await era.printAndWait(''); // :4054
      } // :4055
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :4056
      kojo.手淫 = 1; // :4056
      return 0; // :4057
    } else {
      // :4059

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4061
        if (rand_n(2) == 0) {
          // :4062
          await era.printAndWait(''); // :4063
        } else {
          // :4064
          await era.printAndWait(''); // :4065
        } // :4066
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :4067
        kojo.手淫 = 7; // :4067
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4069
        if (rand_n(2) == 0) {
          // :4070
          await era.printAndWait(''); // :4071
        } else {
          // :4072
          await era.printAndWait(''); // :4073
        } // :4074
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :4075
        kojo.手淫 = 6; // :4075
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4077
        if (rand_n(2) == 0) {
          // :4078
          await era.printAndWait(''); // :4079
        } else {
          // :4080
          await era.printAndWait(''); // :4081
        } // :4082
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :4083
        kojo.手淫 = 5; // :4083
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4085
        await era.printAndWait(''); // :4086
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :4087
        kojo.手淫 = 4; // :4087
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4089
        await era.printAndWait(''); // :4090
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :4091
        kojo.手淫 = 3; // :4091
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :4093
        await era.printAndWait(''); // :4094
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :4095
        kojo.手淫 = 2; // :4095
      } // :4096
      return 0; // :4097
    } // :4098
  } // :4099

  if (era_flag.selectcom == 31) {
    // :4104

    if (kojo.口交_奴 == 0) {
      // :4106

      if (era0(`talent:${target}:76`) == 1) {
        // :4108
        await era.printAndWait(''); // :4109
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4111
        await era.printAndWait(''); // :4112
      } else if (era0(`abl:${target}:16`) >= 3) {
        // :4114
        await era.printAndWait(''); // :4115
      } else {
        // :4117
        await era.printAndWait(''); // :4118
      } // :4119
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :4120
      kojo.口交_奴 = 1; // :4120
      return 0; // :4121
    } else {
      // :4123

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4125
        await era.printAndWait(''); // :4126
        // CFLAG:332  = 7（变量语义：CFLAG 族，332） // :4127
        kojo.口交_奴 = 7; // :4127
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4129
        await era.printAndWait(''); // :4130
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :4131
        kojo.口交_奴 = 6; // :4131
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4133
        await era.printAndWait(''); // :4134
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :4135
        kojo.口交_奴 = 5; // :4135
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4137
        await era.print(''); // :4138
        await era.printAndWait(''); // :4139
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :4140
        kojo.口交_奴 = 4; // :4140
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4142
        await era.print(''); // :4143
        await era.printAndWait(''); // :4144
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :4145
        kojo.口交_奴 = 3; // :4145
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :4147
        await era.printAndWait(''); // :4148
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :4149
        kojo.口交_奴 = 2; // :4149
      } // :4150
      return 0; // :4151
    } // :4152
  } // :4153

  if (era_flag.selectcom == 34) {
    // :4158

    if (kojo.骑乘位 == 0) {
      // :4160

      if (era0(`talent:${target}:0`) == 1) {
        // :4162

        if (era0(`talent:${target}:136`) == 1) {
          // :4164
          await era.printAndWait(''); // :4165
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4167
          await era.printAndWait(''); // :4168
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4170
          await era.printAndWait(''); // :4171
        } else {
          // :4173
          await era.printAndWait(''); // :4174
        } // :4175
      } else {
        // :4177

        if (era0(`talent:${target}:136`) == 1) {
          // :4179
          await era.printAndWait(''); // :4180
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4182
          await era.printAndWait(''); // :4183
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4185
          await era.printAndWait(''); // :4186
        } else {
          // :4188
          await era.printAndWait(''); // :4189
        } // :4190
      } // :4191
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :4192
      kojo.骑乘位 = 1; // :4192
      return 0; // :4193
    } else {
      // :4195

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4197
        if (rand_n(3) == 0) {
          // :4198
          await era.printAndWait(''); // :4199
        } else if (rand_n(2) == 0) {
          // :4200
          await era.printAndWait(''); // :4201
        } else {
          // :4202
          await era.printAndWait(''); // :4203
        } // :4204
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :4205
        kojo.骑乘位 = 7; // :4205
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4207
        if (rand_n(4) == 0) {
          // :4208
          await era.printAndWait(''); // :4209
        } else if (rand_n(3) == 0) {
          // :4210
          await era.printAndWait(''); // :4211
        } else if (rand_n(2) == 0) {
          // :4212
          await era.printAndWait(''); // :4213
        } else {
          // :4214
          await era.printAndWait(''); // :4215
        } // :4216
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :4217
        kojo.骑乘位 = 6; // :4217
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4219
        if (rand_n(4) == 0) {
          // :4220
          await era.print(''); // :4221
        } else if (rand_n(3) == 0) {
          // :4222
          await era.printAndWait(''); // :4223
        } else if (rand_n(2) == 0) {
          // :4224
          await era.printAndWait(''); // :4225
        } else {
          // :4226
          await era.printAndWait(''); // :4227
        } // :4228
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :4229
        kojo.骑乘位 = 5; // :4229
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        era0(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4231
        if (rand_n(4) == 0) {
          // :4232
          await era.printAndWait(''); // :4233
        } else if (rand_n(3) == 0) {
          // :4234
          await era.printAndWait(''); // :4235
        } else if (rand_n(2) == 0) {
          // :4236
          await era.printAndWait(''); // :4237
        } else {
          // :4238
          await era.printAndWait(''); // :4239
        } // :4240
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :4241
        kojo.骑乘位 = 4; // :4241
      } else if (
        era0(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4243
        await era.print(''); // :4244
        await era.printAndWait(''); // :4245
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :4246
        kojo.骑乘位 = 3; // :4246
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :4248
        await era.printAndWait(''); // :4249
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :4250
        kojo.骑乘位 = 2; // :4250
      } // :4251
      return 0; // :4252
    } // :4253
  } // :4254

  if (era_flag.selectcom == 37) {
    // :4259

    if (kojo.肛门侍奉 == 0) {
      // :4261

      if (era0(`abl:${target}:16`) >= 3) {
        // :4263
        await era.printAndWait(''); // :4264
      } else {
        // :4266
        await era.printAndWait(''); // :4267
      } // :4268
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :4269
      kojo.肛门侍奉 = 1; // :4269
      return 0; // :4270
    } else {
      // :4272

      if (
        era0(`talent:${target}:136`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4274
        await era.printAndWait(''); // :4275
        // CFLAG:338  = 6（变量语义：CFLAG 族，338） // :4276
        kojo.肛门侍奉 = 6; // :4276
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4278
        await era.printAndWait(''); // :4279
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :4280
        kojo.肛门侍奉 = 5; // :4280
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4282
        await era.print(''); // :4283
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :4284
        kojo.肛门侍奉 = 4; // :4284
      } else if (
        era0(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4286
        await era.printAndWait(''); // :4287
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :4288
        kojo.肛门侍奉 = 3; // :4288
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :4290
        await era.printAndWait(''); // :4291
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :4292
        kojo.肛门侍奉 = 2; // :4292
      } // :4293
      return 0; // :4294
    } // :4295
  } // :4296

  if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`)) {
    // :4302

    if (kojo.眼罩 == 0) {
      // :4304

      if (era0(`talent:${target}:136`) == 1) {
        // :4306
        await era.printAndWait(''); // :4307
      } else if (era0(`talent:${target}:76`) == 1) {
        // :4309
        await era.printAndWait(''); // :4310
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4312
        await era.printAndWait(''); // :4313
      } else {
        // :4315
        await era.printAndWait(''); // :4316
      } // :4317
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :4318
      kojo.眼罩 = 1; // :4318
      return 0; // :4319
    } else {
      // :4321

      if (
        era0(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        // :4323
        await era.printAndWait(''); // :4324
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344） // :4325
        kojo.眼罩 = 10; // :4325
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :4327
        await era.printAndWait(''); // :4328
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :4329
        kojo.眼罩 = 9; // :4329
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :4331
        await era.printAndWait(''); // :4332
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :4333
        kojo.眼罩 = 8; // :4333
      } else if (
        era0(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4335
        await era.printAndWait(''); // :4336
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :4337
        kojo.眼罩 = 7; // :4337
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4339
        await era.printAndWait(''); // :4340
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :4341
        kojo.眼罩 = 6; // :4341
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4343
        await era.printAndWait(''); // :4344
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :4345
        kojo.眼罩 = 5; // :4345
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4347
        await era.printAndWait(''); // :4348
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :4349
        kojo.眼罩 = 4; // :4349
      } else if (
        era0(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4351
        await era.printAndWait(''); // :4352
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :4353
        kojo.眼罩 = 3; // :4353
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :4355
        await era.printAndWait(''); // :4356
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :4357
        kojo.眼罩 = 2; // :4357
      } // :4358
      return 0; // :4359
    } // :4360
  } else if (era_flag.selectcom == 43 && era0(`tequip:${target}:43`) == 0) {
    // :4362

    if (
      era0(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4364
      await era.printAndWait(''); // :4365
      // CFLAG:444  = 4（变量语义：CFLAG 族，444） // :4366
      kojo.兽奸眼罩 = 4; // :4366
    } else if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4368
      await era.printAndWait(''); // :4369
      // CFLAG:444  = 3（变量语义：CFLAG 族，444） // :4370
      kojo.兽奸眼罩 = 3; // :4370
    } else if (
      era0(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4372
      await era.printAndWait(''); // :4373
      // CFLAG:444  = 2（变量语义：CFLAG 族，444） // :4374
      kojo.兽奸眼罩 = 2; // :4374
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      // :4376
      await era.printAndWait(''); // :4377
      // CFLAG:444  = 1（变量语义：CFLAG 族，444） // :4378
      kojo.兽奸眼罩 = 1; // :4378
    } // :4379
    return 0; // :4380
  } // :4381

  if (era_flag.selectcom == 56) {
    // :4387

    if (kojo.交谈 == 0) {
      // :4389
      if (era0(`tequip:${target}:53`)) {
        // :4390

        if (era0(`talent:${target}:136`) == 1) {
          // :4393
          await era.printAndWait(''); // :4394
        } else if (era0(`talent:${target}:76`) == 1) {
          // :4396
          await era.printAndWait(''); // :4397
        } else if (era0(`talent:${target}:85`) == 1) {
          // :4399
          await era.printAndWait(''); // :4400
        } else {
          // :4402
          await era.printAndWait(''); // :4403
        } // :4404
      } // :4405
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :4406
      kojo.交谈 = 1; // :4406
      return 0; // :4407
    } else {
      // :4409
      if (era0(`tequip:${target}:53`)) {
        // :4410

        if (
          era0(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          // :4413
          await era.printAndWait(''); // :4414
          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :4415
          kojo.交谈 = 5; // :4415
        } else if (
          era0(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :4417
          await era.printAndWait(''); // :4418
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :4419
          kojo.交谈 = 4; // :4419
        } else if (
          era0(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :4421
          await era.printAndWait(''); // :4422
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :4423
          kojo.交谈 = 3; // :4423
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :4425
          await era.printAndWait(''); // :4426
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :4427
          kojo.交谈 = 2; // :4427
        } // :4428
      } // :4429
      return 0; // :4430
    } // :4431
  } // :4432

  return 0; // :4435
}

// @KOJO_MESSAGE_PALAMCNG_13 // :4442
async function kojo_message_palamcng_13(rand) {
  const { target, sc, kojo } = bind_ctx(rand);
  const clitoris_word = (cid) =>
    era0(`talent:${cid}:122`) !== 0 ? '阴茎' : '阴核';
  void rand;
  let P = 0;
  let A = 0;

  if (era0(`tequip:${target}:45`)) {
    // :4448
    return 0; // :4448
  } // :4448

  if (game.train.失神) {
    // :4451
    return 0; // :4451
  } // :4451

  P = era0(`palam:${target}:3`) + era0(`delta:${target}:3`); // :4459
  if (P > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    // :4460

    if (era0(`talent:${target}:85`) == 1) {
      // :4462

      if (era_flag.selectcom == 50) {
        // :4464
        await era.printAndWait(`「变得黏糊糊的……」`); // :4465
      } else {
        // :4467
        await era.printAndWait(`「湿了……湿了、、、吗」`); // :4468
      } // :4469
    } else {
      // :4471

      if (era_flag.selectcom == 50) {
        // :4473
        await era.printAndWait(`「讨厌、变得粘糊糊的……」`); // :4474
      } else {
        // :4476
        await era.printAndWait(`「湿了……湿了啊嗷嗷唔」`); // :4477
      } // :4478
    } // :4479
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :4480
    kojo.首次润滑Lv2 = 1; // :4480
  } // :4481

  P = era0(`palam:${target}:5`) + era0(`delta:${target}:5`); // :4486
  if (P > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    // :4487

    if (era0(`talent:${target}:85`) == 1) {
      // :4489

      if (era_flag.selectcom == 51) {
        // :4491
        await era.printAndWait(`「要用这种药……啊」`); // :4492
      } else {
        // :4494
        await era.printAndWait(`「哈 哈……还、还要……」`); // :4495
      } // :4496
    } else {
      // :4498

      if (era_flag.selectcom == 51) {
        // :4500
        await era.printAndWait(`「不行……想要……是因为吃了媚药的原因吗……」`); // :4501
      } else {
        // :4503
        await era.printAndWait(`「呜呜……原谅${sc()}……好想要」`); // :4504
      } // :4505
    } // :4506
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :4507
    kojo.首次欲情Lv2 = 1; // :4507
  } // :4508

  P = era0(`palam:${target}:8`) + era0(`delta:${target}:8`); // :4513
  if (P > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    // :4514

    if (era0(`talent:${target}:85`) == 1) {
      // :4516
      await era.printAndWait(`「不要……好害羞的……」`); // :4517
    } else {
      // :4519
      await era.printAndWait(`「不要……好害羞的……」`); // :4520
    } // :4521
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :4522
    kojo.首次耻情Lv2 = 1; // :4522
  } // :4523

  P = era0(`palam:${target}:10`) + era0(`delta:${target}:10`); // :4528
  if (P > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    // :4529

    if (era0(`talent:${target}:85`) == 1) {
      // :4531
      await era.printAndWait(`「不要！求求你饶了${sc()}吧……」`); // :4532
    } else {
      // :4534
      await era.printAndWait(`「不要！求求你饶了${sc()}吧……」`); // :4535
    } // :4536
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :4537
    kojo.首次恐怖Lv2 = 1; // :4537
  } // :4538

  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {
    // :4543

    if (era0(`talent:${target}:85`) == 1) {
      // :4545
      await era.printAndWait(`「${clitoris_word(target)}……要高潮了！！」`); // :4546
    } else {
      // :4548
      await era.printAndWait(`「${clitoris_word(target)}……要高潮了！！」`); // :4549
    } // :4550
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :4551
    kojo.首次C绝顶 = 1; // :4551
  } // :4552

  if (era0(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    // :4557

    if (era0(`talent:${target}:76`) == 1) {
      // :4559
      await era.printAndWait(`「不行${sc()}要去了、啊啊啊啊！！」`); // :4560
    } else if (era0(`talent:${target}:85`) == 1) {
      // :4562
      await era.printAndWait(`「里面……好舒服啊」`); // :4563
    } else {
      // :4565
      await era.printAndWait(`「要、要去了……」`); // :4566
    } // :4567
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :4568
    kojo.首次V绝顶 = 1; // :4568
  } // :4569

  if (era0(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    // :4574

    if (era0(`talent:${target}:76`) == 1) {
      // :4576
      await era.printAndWait(`「啊、啊、肛门最棒了……」`); // :4577
    } else if (era0(`talent:${target}:85`) == 1) {
      // :4579
      await era.printAndWait(`「屁股……感觉太美妙了……」`); // :4580
    } else {
      // :4582
      await era.printAndWait(`「啊、不行…屁股……要去了……」`); // :4583
    } // :4584
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :4585
    kojo.首次A绝顶 = 1; // :4585
  } // :4586

  if (era0(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    // :4591

    if (era0(`talent:${target}:85`) == 1) {
      // :4593
      await era.printAndWait(`「乳房、高潮了……」`); // :4594
    } else {
      // :4596
      await era.printAndWait(`「乳房、高潮了……」`); // :4597
    } // :4598
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :4599
    kojo.首次B绝顶 = 1; // :4599
  } // :4600

  A = era0(`delta:${target}:11`) + era0(`delta:${target}:12`); // :4605
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    // :4606

    if (game.train.主人导致处女丧失 == 1) {
      // :4608

      if (
        era0(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4610
        await era.printAndWait(''); // :4611
      } else if (
        era0(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4613
        await era.printAndWait(''); // :4614
      } else {
        // :4616
        await era.printAndWait(''); // :4617
      } // :4618
    } else {
      // :4620

      if (era0(`talent:${target}:76`) == 1) {
        // :4622
        await era.printAndWait(''); // :4623
      } else if (era0(`talent:${target}:85`) == 1) {
        // :4625
        await era.printAndWait(''); // :4626
      } else {
        // :4628
        await era.printAndWait(''); // :4629
      } // :4630
    } // :4631
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :4632
    kojo.处女丧失 = 1; // :4632
  } // :4633
}

// @KOJO_MESSAGE_SYASEI_13 // :4640
async function kojo_message_syasei_13(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);

  if (era0(`tequip:${target}:45`)) {
    // :4646
    return 0; // :4646
  } // :4646

  if (game.train.性交射精 == 1) {
    // :4651
    if (era0(`talent:${target}:76`) == 1) {
      // :4652
      if (era0(`talent:${target}:157`)) {
        // :4653
        await era.print(`「唔呵呵${heart(1)}」`); // :4654
        await era.printAndWait(`「出来了很多啊、很舒服吧${heart(3)}」`); // :4655
      } else {
        // :4656
        await era.print(`「唔呵呵${heart(1)}……」`); // :4657
        await era.printAndWait(`「请多注入一些吧${heart(3)}」`); // :4658
      } // :4659
    } else if (era0(`talent:${target}:85`)) {
      // :4660
      if (rand_n(2) == 0) {
        // :4661
        await era.print(`「哎呀哎呀${heart(1)}……」`); // :4662
        await era.printAndWait(`「注入了这么多……要怀上孩子了啦${heart(1)}」`); // :4663
      } else {
        // :4664
        await era.print(`「唔呵呵${heart(1)}……」`); // :4665
        await era.printAndWait(`「请注入到怀孕为止吧${heart(1)}」`); // :4666
      } // :4667
      if (era0(`talent:${target}:157`)) {
        // :4669
        await era.printAndWait(`「机会难得、向那个人报告一下好了${heart(3)}」`); // :4669
      } // :4669
    } else {
      // :4670
      if (era0(`talent:${target}:157`) && rand_n(3) == 0) {
        // :4671
        if (rand_n(2) == 0) {
          // :4672
          await era.printAndWait(`「请原谅${sc()}…老公……」`); // :4673
        } else {
          // :4674
          await era.printAndWait(`「对不起…老公……」`); // :4675
        } // :4676
      } else {
        // :4677
        await era.printAndWait(`「不可以射在里面啊……」`); // :4678
      } // :4679
    } // :4680
  } // :4681
}

// @KOJO_MESSAGE_MARKCNG_13 // :4688
async function kojo_message_markcng_13(rand) {
  const { target, sc, kojo } = bind_ctx(rand);
  void rand;

  if (era0(`tequip:${target}:45`)) {
    // :4694
    return 0; // :4694
  } // :4694

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    // :4698

    if (era0(`talent:${target}:85`) == 1) {
      // :4700
      await era.printAndWait(`「好痛苦……但却有种快乐的感觉？」`); // :4701
    } else {
      // :4702
      await era.printAndWait(`「好痛苦……呜呜…………」`); // :4703
    } // :4704
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :4705
    kojo.苦痛刻印Lv3 = 1; // :4705
  } // :4706

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    // :4711

    if (era0(`talent:${target}:85`) == 1) {
      // :4713
      await era.printAndWait(`「啊……人家变得好奇怪……」`); // :4714
    } else {
      // :4715
      await era.printAndWait(`「啊……人家变得好奇怪……」`); // :4716
    } // :4717
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :4718
    kojo.快乐刻印Lv3 = 1; // :4718
  } // :4719

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    // :4724

    if (era0(`talent:${target}:85`) == 1) {
      // :4726
      await era.printAndWait(
        `「已经不行了……请原谅${sc()}……求您饶恕${sc()}吧……」`,
      ); // :4727
    } else {
      // :4728
      await era.printAndWait(
        `「已经不行了……请原谅${sc()}……求您饶恕${sc()}吧……」`,
      ); // :4729
    } // :4730
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :4731
    kojo.屈服刻印Lv3 = 1; // :4731
  } // :4732

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    // :4737

    if (era0(`talent:${target}:85`) == 1) {
      // :4739
      await era.printAndWait(`「不可饶恕……绝对……」`); // :4740
    } else {
      // :4741
      await era.printAndWait(`「不可饶恕……绝对……」`); // :4742
    } // :4743
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :4744
    kojo.反抗刻印Lv3 = 1; // :4744
  } // :4745
}

// @SELF_KOJO_K13 // :4751
async function self_kojo_k13(rand) {
  const { target, kojo } = bind_ctx(rand);

  const Q = peek_aftertrain_q();
  const S = peek_aftertrain_s();
  void rand;
  void S;

  if (game.train.初吻与自我口上 == 1) {
    // :4755

    if (era0(`talent:${target}:9`) == 1) {
      // :4757
      await era.printAndWait(''); // :4758
    } else if (Q == 1) {
      // :4760
      await era.printAndWait(''); // :4761
    } else if (Q == 2) {
      // :4763
      await era.printAndWait(''); // :4764
    } else {
      // :4766

      if (
        era0(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        // :4768
        await era.printAndWait(''); // :4769
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :4770
        kojo.调教后自慰 = 4; // :4770
      } else if (
        era0(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        // :4772
        await era.printAndWait(''); // :4773
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :4774
        kojo.调教后自慰 = 3; // :4774
      } else if (
        era0(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        // :4776
        await era.printAndWait(''); // :4777
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :4778
        kojo.调教后自慰 = 2; // :4778
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        // :4780
        await era.printAndWait(''); // :4781
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :4782
        kojo.调教后自慰 = 1; // :4782
      } // :4783
    } // :4784
  } // :4785

  if (game.train.初吻与自我口上 == 2) {
    // :4790

    if (
      era0(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      // :4792
      await era.printAndWait(''); // :4793
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :4794
      kojo.百合PLAY = 5; // :4794
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      // :4796
      await era.printAndWait(''); // :4797
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :4798
      kojo.百合PLAY = 4; // :4798
    } else if (
      era0(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4800
      await era.printAndWait(''); // :4801
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :4802
      kojo.百合PLAY = 3; // :4802
    } else if (
      era0(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4804
      await era.printAndWait(''); // :4805
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :4806
      kojo.百合PLAY = 2; // :4806
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      // :4808
      await era.printAndWait(''); // :4809
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :4810
      kojo.百合PLAY = 1; // :4810
    } // :4811
  } // :4812

  if (game.train.初吻与自我口上 == 3) {
    // :4817

    if (
      era0(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4819
      await era.printAndWait(''); // :4820
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :4821
      kojo.朝口交 = 3; // :4821
    } else if (
      era0(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4823
      await era.printAndWait(''); // :4824
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :4825
      kojo.朝口交 = 3; // :4825
    } else if (
      era0(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4827
      await era.printAndWait(''); // :4828
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :4829
      kojo.朝口交 = 2; // :4829
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      // :4831
      await era.printAndWait(''); // :4832
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :4833
      kojo.朝口交 = 1; // :4833
    } // :4834
  } // :4835

  if (game.train.初吻与自我口上 == 4) {
    // :4840

    if (
      era0(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4842
      await era.printAndWait(''); // :4843
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :4844
      kojo.调教后性交 = 2; // :4844
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      // :4846
      await era.printAndWait(''); // :4847
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :4848
      kojo.调教后性交 = 1; // :4848
    } // :4849
  } // :4850

  if (game.train.初吻与自我口上 == 5) {
    // :4855
    if (kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      // :4856
      await era.printAndWait(''); // :4857
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :4858
      kojo.夜袭 = 1; // :4858
    } // :4859
  } // :4860

  if (game.train.初吻与自我口上 == 6) {
    // :4865

    if (era0(`talent:${target}:85`) && era0(`mark:${target}:3`) < 3) {
      // :4867
      await era.printAndWait(''); // :4868
    } else if (era0(`mark:${target}:3`) == 3) {
      // :4870
      await era.printAndWait(''); // :4871
    } else if (era0(`talent:${target}:76`)) {
      // :4873
      await era.printAndWait(''); // :4874
    } else {
      // :4876
      await era.printAndWait(''); // :4877
    } // :4878
    if (era0(`talent:${target}:122`) != 1) {
      // :4880
      stub_line('SELL_MATURO_K0', '卖却分支（成熟贩卖）', '随售却票'); // :4880
    } // :4880
  } // :4881

  if (game.train.初吻与自我口上 == 9) {
    // :4886
    era.drawLine(); // :4887
    await era.printAndWait(''); // :4888
    era.drawLine(); // :4889
  } // :4890

  if (game.train.初吻与自我口上 == 10) {
    // :4895
    era.drawLine(); // :4896
    await era.printAndWait(''); // :4897
    era.drawLine(); // :4898
  } // :4899

  if (game.train.初吻与自我口上 == 11) {
    // :4905
    if (kojo.妊娠发觉 >= 1) {
      // :4907
      return 0; // :4907
    } // :4907

    if (era0(`talent:${target}:9`) == 1) {
      // :4909
      await era.printAndWait(''); // :4910
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :4912
      await era.printAndWait(''); // :4913
    } else {
      // :4915
      await era.printAndWait(''); // :4916
    } // :4917
    // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :4918
    kojo.妊娠发觉 = 1; // :4918
  } // :4919

  if (game.train.初吻与自我口上 == 12) {
    // :4925
    if (kojo.生产 >= 1) {
      // :4927
      return 0; // :4927
    } // :4927

    if (era0(`talent:${target}:9`) == 1) {
      // :4929
      await era.printAndWait(''); // :4930
    } else if (
      era0(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :4932
      await era.printAndWait(''); // :4933
    } else {
      // :4935
      await era.printAndWait(''); // :4936
    } // :4937
    // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :4938
    kojo.生产 = 1; // :4938
  } // :4939

  if (game.train.初吻与自我口上 == 999) {
    // :4944

    if (era0(`talent:${target}:85`)) {
      // :4946
      await era.printAndWait(''); // :4947
    } else {
      // :4949
      await era.printAndWait(''); // :4950
    } // :4951
  } // :4952

  if (game.train.初吻与自我口上 == 998) {
    // :4957

    if (era0(`talent:${target}:85`)) {
      // :4959
      await era.printAndWait(''); // :4960
    } else {
      // :4962
      await era.printAndWait(''); // :4963
    } // :4964
  } // :4965

  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :4970
  game.train.初吻与自我口上 = 0; // :4970

  return 0; // :4972
}

// @DUNGEON_RYOUZYOKU_K13 // :5000
async function dungeon_ryouzyoku_k13(rand) {
  const { target, sc } = bind_ctx(rand);

  void rand;

  if (era0(`talent:${target}:0`) == 1) {
    // :5005

    await era.printAndWait(`「怎么会这样……${sc()}的……第一次……」`); // :5007

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5009

      await era.printAndWait(`「……」`); // :5012

      return 0; // :5014
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      // :5015

      await era.printAndWait(
        `「那个、人的性命只有一次所以……如果想要的话请尽管使用${sc()}的身体……」`,
      ); // :5018

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        // :5022
        await era.printAndWait(
          `「是、是的、屁股的话……即使是侵犯${sc()}的屁股也没事的！」`,
        ); // :5022
      } // :5022

      if (era0(`exp:${target}:22`) > 0) {
        // :5026
        await era.printAndWait(`「就是用嘴的话也没关系的……感觉怎么样……」`); // :5026
      } // :5026
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5028

      await era.printAndWait(
        `「即使${sc()}的身体被侮辱了${sc()}的心也不会屈服的！」`,
      ); // :5032
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5034

      await era.printAndWait(`「杀了你……${sc()}要杀了你」`); // :5037
    } else {
      // :5039

      await era.printAndWait(`「啊啊……早知道会这样的话……就不冒这个险了……」`); // :5042
    } // :5044
  } else {
    // :5045

    await era.printAndWait(`「求……求求你……帮帮${sc()}……」`); // :5047

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5049

      await era.printAndWait(`「……」`); // :5052

      return 0; // :5054
    } else if (
      era0(`talent:${target}:17`) == 1 ||
      era0(`talent:${target}:31`) == 1 ||
      era0(`talent:${target}:36`) == 1
    ) {
      // :5055

      await era.printAndWait(
        `「${sc()}知道该怎么和男人们打交道！${sc()}会让各位感到满足……所以…请饶过一命…」`,
      ); // :5058

      if (era0(`talent:${target}:106`) == 1 || era0(`exp:${target}:1`) > 0) {
        // :5062
        await era.printAndWait(`「屁股也可以的吧！屁股也可以爽的……」`); // :5062
      } // :5062

      if (era0(`exp:${target}:22`) > 0) {
        // :5066
        await era.printAndWait(`「用嘴来服侍你！　精液……也会喝掉的……」`); // :5066
      } // :5066
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5068

      await era.printAndWait(
        `「${sc()}、${sc()}是绝对不会屈服于你们这些家伙的！」`,
      ); // :5072
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5074

      await era.printAndWait(`「请……杀了${sc()}吧……」`); // :5077
    } else {
      // :5079

      await era.printAndWait(`「啊啊……为什么会这样……」`); // :5082
    } // :5084
  } // :5085

  return 0; // :5087
}

// @DUNGEON_RYOUZYOKU_AFTER_K13 // :5090
async function dungeon_ryouzyoku_after_k13(rand) {
  const { target, sc } = bind_ctx(rand);

  void rand;

  if (era0(`talent:${target}:0`) == 1) {
    // :5095

    await era.printAndWait(`「哈啊……总算保住了${sc()}的贞操」`); // :5097

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5099

      await era.printAndWait(`「……」`); // :5102

      return 0; // :5104
    } // :5105

    if (era0(`exp:${target}:1`) > 20) {
      // :5108
      await era.printAndWait(`「呜呜……都对${sc()}的屁股做什么啊……」`); // :5109
      await era.printAndWait(`「真过分……」`); // :5110
    } // :5111

    if (era0(`exp:${target}:22`) > 20) {
      // :5115
      await era.printAndWait(`「咕诶…… 哈、哈……」`); // :5115
    } // :5115

    if (era0(`exp:${target}:20`) > 20) {
      // :5119
      await era.printAndWait(`「黏在喉咙上了……呜……」`); // :5119
    } // :5119
  } else {
    // :5120

    await era.printAndWait(`「结、结束了……」`); // :5122

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5124

      await era.printAndWait(`「……」`); // :5127

      return 0; // :5129
    } // :5130

    if (era0(`exp:${target}:0`) > 20) {
      // :5133
      await era.printAndWait(`「会有……小宝宝的……」`); // :5134
      await era.printAndWait(`「过分……」`); // :5135
    } // :5136

    if (era0(`exp:${target}:1`) > 20) {
      // :5139
      await era.printAndWait(`「这样子弄……」`); // :5140
      await era.printAndWait(`「屁股、要坏掉了……」`); // :5141
    } // :5142

    if (era0(`exp:${target}:22`) > 20) {
      // :5146
      await era.printAndWait(`「咕诶……口交得太过头了……」`); // :5146
    } // :5146

    if (era0(`exp:${target}:20`) > 20) {
      // :5150
      await era.printAndWait(`「嘴里……还有很多……」`); // :5150
    } // :5150
  } // :5151

  return 0; // :5153
}

// @BENKI_KOUJO_K13 // :5155
async function benki_koujo_k13(rand) {
  const { target, sc, kojo } = bind_ctx(rand);
  const a = era_flag.target;
  void rand;
  void target;
  void sc;
  void kojo;

  if (game.train.肉便器行动 == 0) {
    // :5160

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5163
      await era.printAndWait(
        `「要让${self_call(a)}服侍这几位吗……？　好的！　明白啦${heart(1)}」`,
      ); // :5164
      await era.printAndWait(
        `「虽然本来很讨厌这种肮脏的工作、因为『被命令要喜欢上这些肮脏的东西』嘛、就开开心心地服侍起来啦${heart(1)}」`,
      ); // :5165
    } else if (era0(`talent:${a}:76`) == 1) {
      // :5167
      await era.printAndWait(
        `「你们啊、排好队站整齐咯${heart(1)}　这就好好服侍你们哦${heart(1)}」`,
      ); // :5168
    } else {
      // :5170
      await era.printAndWait(`「好的……会尽全力服侍的……」`); // :5171
    } // :5172
  } else if (game.train.肉便器行动 == 1) {
    // :5173

    if (era0(`talent:${a}:76`) == 1) {
      // :5176
      await era.printAndWait(''); // :5177
    } else if (era0(`talent:${a}:85`)) {
      // :5179
      await era.printAndWait(''); // :5180
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5182
      await era.printAndWait(''); // :5183
    } else {
      // :5185
      await era.printAndWait(''); // :5186
    } // :5187
  } else if (game.train.肉便器行动 == 2) {
    // :5188

    if (era0(`talent:${a}:76`) == 1) {
      // :5191
      await era.printAndWait(''); // :5192
    } else if (era0(`talent:${a}:85`)) {
      // :5194
      await era.printAndWait(''); // :5195
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5197
      await era.printAndWait(''); // :5198
    } else {
      // :5200
      await era.printAndWait(''); // :5201
    } // :5202
  } else if (game.train.肉便器行动 == 3) {
    // :5203

    if (era0(`talent:${a}:76`) == 1) {
      // :5206
      await era.printAndWait(''); // :5207
    } else if (era0(`talent:${a}:85`)) {
      // :5209
      await era.printAndWait(''); // :5210
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5212
      await era.printAndWait(''); // :5213
    } else {
      // :5215
      await era.printAndWait(''); // :5216
    } // :5217
  } else if (game.train.肉便器行动 == 4) {
    // :5218

    if (era0(`talent:${a}:76`) == 1) {
      // :5221
      await era.printAndWait(''); // :5222
    } else if (era0(`talent:${a}:85`)) {
      // :5224
      await era.printAndWait(''); // :5225
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5227
      await era.printAndWait(''); // :5228
    } else {
      // :5230
      await era.printAndWait(''); // :5231
    } // :5232
  } else if (game.train.肉便器行动 == 5) {
    // :5233

    if (era0(`talent:${a}:76`) == 1) {
      // :5236
      await era.printAndWait(''); // :5237
    } else if (era0(`talent:${a}:85`)) {
      // :5239
      await era.printAndWait(''); // :5240
    } else if (era0(`abl:${a}:16`) >= 5) {
      // :5242
      await era.printAndWait(''); // :5243
    } else {
      // :5245
      await era.printAndWait(''); // :5246
    } // :5247
  } // :5248

  return 0; // :5250
}

// @DUNGEON_VICTORY_K13 // :5253
async function dungeon_victory_k13(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);
  const a = target;

  await era.printAndWait(`「呵呵……怎么样。${sc()}赢了」`); // :5258

  if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
    // :5260

    await era.printAndWait(`「……呵呵」`); // :5263

    return 0; // :5265
  } else if (
    era0(`talent:${target}:11`) == 1 ||
    era0(`talent:${target}:12`) == 1 ||
    era0(`talent:${target}:15`) == 1 ||
    era0(`talent:${target}:30`) == 1 ||
    era0(`talent:${target}:34`) == 1
  ) {
    // :5266

    if (rand_n(3) == 0) {
      // :5269
      await era.printAndWait(`「${sc()}、很强的！」`); // :5270
    } else if (rand_n(2) == 0) {
      // :5271
      await era.printAndWait(`「${sc()}、会加油的！」`); // :5272
    } else {
      // :5273
      await era.printAndWait(`「哎呀哎呀、输给${sc()}也是没办法的不是吗？」`); // :5274
    } // :5275
  } else if (
    era0(`talent:${target}:10`) == 1 ||
    era0(`talent:${target}:26`) == 1
  ) {
    // :5277

    await era.printAndWait(`「真是危险的地方……」`); // :5280

    return 0; // :5282
  } else {
    // :5283

    if (rand_n(3) == 0) {
      // :5286
      await era.printAndWait(`「这次的胜利、为了辉煌的明日……」`); // :5287
    } else if (rand_n(2) == 0) {
      // :5288
      await era.printAndWait(`「哎呀哎呀、真可悲啊」`); // :5289
    } else {
      // :5290
      await era.printAndWait(`「好、又向前迈进了一步！」`); // :5291
    } // :5292
  } // :5294

  if (
    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||
    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50
  ) {
    // :5296

    await era.printAndWait(`（但是、还真是危险啊……）`); // :5298
  } else {
    // :5299

    await era.printAndWait(`「那么、前进咯」`); // :5301
  } // :5302

  return 0; // :5304
}

// @DUNGEON_ATTACK_K13 // :5307
async function dungeon_attack_k13(rand) {
  const { rand_n, target, sc } = bind_ctx(rand);

  if (chara(target).invasion.状态 == 2) {
    // :5312

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5314

      await era.printAndWait(`「……呵呵」`); // :5317

      return 0; // :5319
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5320

      if (rand_n(3) == 0) {
        // :5323
        await era.printAndWait(`「哎呀哎呀、趁现在」`); // :5324
      } else if (rand_n(2) == 0) {
        // :5325
        await era.printAndWait(`「东张西望、是不行的」`); // :5326
      } else {
        // :5327
        await era.printAndWait(`「这种攻击怎么样？」`); // :5328
      } // :5329
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5331

      await era.printAndWait(`「请、请去死吧！」`); // :5334

      return 0; // :5336
    } else {
      // :5337

      if (rand_n(3) == 0) {
        // :5340
        await era.printAndWait(`「上咯！」`); // :5341
      } else if (rand_n(2) == 0) {
        // :5342
        await era.printAndWait(`「交给${sc()}吧！」`); // :5343
      } else {
        // :5344
        await era.printAndWait(`「那么、躲得开这招吗」`); // :5345
      } // :5346
    } // :5348
  } else {
    // :5349

    if (era0(`talent:${target}:21`) == 1 || era0(`talent:${target}:22`) == 1) {
      // :5351

      await era.printAndWait(`「……呵呵」`); // :5354

      return 0; // :5356
    } else if (
      era0(`talent:${target}:11`) == 1 ||
      era0(`talent:${target}:12`) == 1 ||
      era0(`talent:${target}:15`) == 1 ||
      era0(`talent:${target}:30`) == 1 ||
      era0(`talent:${target}:34`) == 1
    ) {
      // :5357

      if (rand_n(3) == 0) {
        // :5360
        await era.printAndWait(`「哎呀哎呀、还是抵抗打算的？」`); // :5361
      } else if (rand_n(2) == 0) {
        // :5362
        await era.printAndWait(`「呵呵……没用的哦？」`); // :5363
      } else {
        // :5364
        await era.printAndWait(`「呵呵……真可爱♪」`); // :5365
      } // :5366
    } else if (
      era0(`talent:${target}:10`) == 1 ||
      era0(`talent:${target}:26`) == 1
    ) {
      // :5368

      await era.printAndWait(`「${sc()}是……很强的！」`); // :5371

      return 0; // :5373
    } else {
      // :5374

      if (rand_n(3) == 0) {
        // :5377
        await era.printAndWait(`「呵呵……加油咯♪」`); // :5378
      } else if (rand_n(2) == 0) {
        // :5379
        await era.printAndWait(`「好好看着哦……主人大人♪」`); // :5380
      } else {
        // :5381
        await era.printAndWait(`「哎呀哎呀、怎么办呢」`); // :5382
      } // :5383
    } // :5385
  } // :5386

  return 0; // :5390
}

// @COLOSSEUM_KOJO_13 // :5396
async function colosseum_kojo_13(rand) {
  const { target, sc } = bind_ctx(rand);

  void rand;

  if (era_flag.selectcom == 55) {
    // :5400

    if (era0(`base:${target}:1`) <= 0) {
      // :5402
      await era.printAndWait(`「在看什么……？　咕、你是想杀了${sc()}吧……」`); // :5403
    } else {
      // :5404
      await era.printAndWait(`「你打算手下留情……？」`); // :5405
    } // :5406
    return 0; // :5407
  } // :5408

  if (era_flag.selectcom == 56) {
    // :5412

    if (era0(`base:${target}:1`) <= 0) {
      // :5414

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5416
        await era.printAndWait(''); // :5417
      } else {
        // :5418
        await era.printAndWait(''); // :5419
      } // :5420
    } else {
      // :5421

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5423
        await era.printAndWait(''); // :5424
      } else {
        // :5425
        await era.printAndWait(''); // :5426
      } // :5427
    } // :5428
    return 0; // :5429
  } // :5430

  if (era_flag.selectcom == 31) {
    // :5435

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5437
      await era.printAndWait(''); // :5438
    } else {
      // :5439
      await era.printAndWait(''); // :5440
    } // :5441
    return 0; // :5442
  } // :5443

  if (era_flag.selectcom == 5) {
    // :5447

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5449
      await era.printAndWait(''); // :5450
    } else {
      // :5451
      await era.printAndWait(''); // :5452
    } // :5453
    return 0; // :5454
  } // :5455

  if (era_flag.selectcom == 21) {
    // :5459

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5461
      await era.printAndWait(''); // :5462
    } else if (game.train.死斗场敌种 == 206) {
      // :5464
      await era.printAndWait(''); // :5465
    } else {
      // :5466
      await era.printAndWait(''); // :5467
    } // :5468
    return 0; // :5469
  } // :5470

  if (era_flag.selectcom == 27) {
    // :5475

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5477
      await era.printAndWait(''); // :5478
    } else if (game.train.死斗场敌种 == 206) {
      // :5480
      await era.printAndWait(''); // :5481
    } else {
      // :5482
      await era.printAndWait(''); // :5483
    } // :5484
    return 0; // :5485
  } // :5486

  if (era_flag.selectcom == 51) {
    // :5491
    await era.printAndWait(''); // :5492
    return 0; // :5493
  } // :5494

  return 0; // :5497
}

// @NTR_KOUJO_K13 // :5501
async function ntr_koujo_k13(rand, P) {
  const { target, sc, kojo } = bind_ctx(rand);
  const a_name = chara_callname(era_flag.target);
  P = P ?? 0;

  if (kojo.NTR再捕获 == 0) {
    // :5506
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :5506
    kojo.NTR再捕获 = 1; // :5506
  } // :5506

  if (P == 1) {
    // :5510

    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5512
      await era.print(`「${sc()}的身心、全都是魔王大人的东西」`); // :5513
      await era.printAndWait(`「无论是什么卑劣的手段都是没有用的」`); // :5514
      if (era0(`talent:${target}:85`) && era0(`talent:${target}:157`)) {
        // :5516
        await era.printAndWait(`（魔王大人……救救${sc()}……老公……你在哪……）`); // :5516
      } // :5516
      await era.print(
        `被弄成牝犬一样的姿势的${sc()}说着毅然决然的话语拒绝服从、`,
      ); // :5517
      await era.print(`狂王毫不介意${sc()}的话、邪笑了起来、`); // :5518
      await era.print(`将`); // :5519

      if (game.system.狂王性别 == 0 || game.system.狂王性别 == 2) {
        // :5521
        await era.print(`胯下的巨根`); // :5522
      } else {
        // :5523
        await era.print(`极粗的假阳具`); // :5524
      } // :5525
      await era.print(`刺穿了`); // :5526

      if (era0(`talent:${target}:157`) && era0(`exp:${target}:60`) >= 1) {
        // :5528
        await era.printAndWait(`由魔王再生的处女膜。`); // :5529
      } else {
        // :5530
        await era.printAndWait(`尚未经人事的小穴、蛮横地抽插着。`); // :5531
      } // :5532
      if (era0(`talent:${target}:157`)) {
        // :5533
        if (era0(`talent:${target}:76`)) {
          // :5535
          await era.print(`「啊啊啊…帮帮我……老公…魔王大人……」`); // :5535
        } // :5535
        if (era0(`talent:${target}:85`)) {
          // :5537
          await era.print(
            `「啊啊啊…帮帮我……老公、老公啊…帮帮我啊…魔王大人……」`,
          ); // :5537
        } // :5537
      } else {
        // :5538
        await era.print(
          `「请原谅${sc()}啊……魔王大人啊啊啊！！　嘤、停下啊、请放过${sc()}……」`,
        ); // :5539
      } // :5540
      await era.printAndWait(
        `伴随着悲惨的哭喊声、苦苦求饶呼救的${sc()}、狂王一边嘲笑着一边侵犯着。`,
      ); // :5541
      await era.printAndWait(
        `${sc()}几度晕厥又被强行弄醒、漫漫无尽的残酷的行为被记录在了水晶球中……`,
      ); // :5542
    } else {
      // :5543
      await era.print(`「${sc()}是……被魔王威胁了才服从了的」`); // :5544
      await era.printAndWait(`「还请、求您发发慈悲……」`); // :5545
      await era.print(`${sc()}俯身在地上、向狂王乞求着饶恕。`); // :5546
      await era.print(`狂王冷笑了一番、蹂躏了一番${sc()}的屁股、将`); // :5547

      if (game.system.狂王性别 == 0 || game.system.狂王性别 == 2) {
        // :5549
        await era.print(`胯下的巨根`); // :5550
      } else {
        // :5551
        await era.print(`取出的极粗假阳具`); // :5552
      } // :5553
      await era.print(`一口气刺穿了`); // :5554

      if (era0(`talent:${target}:157`) && era0(`exp:${target}:60`) >= 1) {
        // :5556
        await era.print(`由魔王再生的处女膜、`); // :5557
      } else {
        // :5558
        await era.print(`尚未经人事的小穴、蛮横地抽插着、`); // :5559
      } // :5560
      await era.print(`纯洁的赤印将地板染红了。`); // :5561
      if (era0(`talent:${target}:157`)) {
        // :5563
        await era.print(`（老公……抱歉……最终还是……）`); // :5563
      } // :5563
      await era.print(`不仅无视了伴随着呜咽声求饶的${sc()}、狂王还愉快地将`); // :5564
      if (game.system.狂王性别 == 0 || game.system.狂王性别 == 2) {
        // :5565
        await era.print(`腰`); // :5566
      } else {
        // :5567
        await era.print(`极粗假阳具`); // :5568
      } // :5569
      await era.printAndWait(`与${a_name}亲密接触的模样记录在了水晶球中。`); // :5570
    } // :5571
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :5572
    kojo.NTR_651 = 1; // :5572
  } else if (P == 2) {
    // :5574
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5575
      await era.printAndWait(''); // :5576
    } else {
      // :5577
      await era.printAndWait(''); // :5578
    } // :5579
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :5580
    kojo.NTR_652 = 1; // :5580
  } else if (P == 3) {
    // :5582
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5583
      await era.print(`「唔呵呵${heart(1)}　有在看着吗、魔王大人」`); // :5584
      await era.printAndWait(
        `「好好看着${sc()}和汪酱交尾的地方哦${heart(3)}」`,
      ); // :5585
    } else {
      // :5586
      await era.printAndWait(''); // :5587
    } // :5588
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :5589
    kojo.NTR_653 = 1; // :5589
  } else if (P == 4) {
    // :5591
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5592
      await era.print(`「昂${heart(1)}`); // :5593
      if (era0(`talent:${target}:157`)) {
        // :5595
        await era.print(`比那个人、`); // :5595
      } // :5595
      await era.print(`比魔王大人${heart(3)}」`); // :5596
      await era.printAndWait(
        `「还要粗、还要硬……啊啊啊${heart(1)}　好棒啊${heart(3)}」`,
      ); // :5597
    } else {
      // :5598
      await era.printAndWait(''); // :5599
    } // :5600
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :5601
    kojo.NTR_654 = 1; // :5601
  } else if (P == 5) {
    // :5603
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5604
      await era.print(`「昂${heart(1)}　把${sc()}搞得乱七八糟吧${heart(1)}」`); // :5605
      await era.printAndWait(`「${sc()}可是您忠实的仆人啊${heart(3)}」`); // :5606
    } else {
      // :5607
      await era.printAndWait(''); // :5608
    } // :5609
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :5610
    kojo.NTR_655 = 1; // :5610
  } else if (P == 6) {
    // :5612
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5613
      await era.print(`「${sc()}是您忠实的仆人」`); // :5614
      await era.printAndWait(
        `「还请…还请好好调教这个淫乱的变态抖M吧${heart(1)}」`,
      ); // :5615
    } else {
      // :5616
      await era.printAndWait(''); // :5617
    } // :5618
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :5619
    kojo.NTR_656 = 1; // :5619
  } else if (P == 7) {
    // :5621
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5622
      await era.printAndWait(`「在被看着啊……」`); // :5623
    } else {
      // :5624
      await era.printAndWait(''); // :5625
    } // :5626
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :5627
    kojo.NTR_657 = 1; // :5627
  } else if (P == 20) {
    // :5629
    if (era0(`talent:${target}:76`) || era0(`talent:${target}:85`)) {
      // :5630
      await era.printAndWait(`「生、生出来了啊呜嗷嗷呜」`); // :5631
    } else {
      // :5632
      await era.printAndWait(''); // :5633
    } // :5634
  } else if (chara(target).invasion.状态 == 2) {
    // :5636
    await era.print(
      `「唔呵呵${heart(1)}　魔王的首级、就让我去取来吧${heart(1)}」`,
    ); // :5637
    await era.printAndWait(
      `「回来了之后可要好好疼爱我啊。主人大人${heart(1)}」`,
    ); // :5638
  } // :5639

  era.setColor(''); // :5641 RESETCOLOR

  return 0; // :5643
}

// @EXUCUTION_KOUJO_K13 // :5646
async function exucution_koujo_k13(rand) {
  void rand;

  if (game.event.犬射精或处刑口上 == 4) {
    // :5650
    await era.printAndWait(`「噫、有谁……可以救救我」`); // :5651
  } else if (game.event.犬射精或处刑口上 == 5) {
    // :5653
    await era.printAndWait(''); // :5654
  } else if (game.event.犬射精或处刑口上 == 6) {
    // :5656
    await era.printAndWait(''); // :5657
  } else if (game.event.犬射精或处刑口上 == 7) {
    // :5659
    await era.printAndWait(''); // :5660
  } // :5661
}

// @MUSEUM_KOUJO_K13 // :5664
async function museum_koujo_k13(rand) {
  const { sc } = bind_ctx(rand);
  void rand;

  if (game.event.博物馆口上 == 0) {
    // :5668
    await era.printAndWait(''); // :5669
  } else if (game.event.博物馆口上 == 1) {
    // :5671
    await era.printAndWait(''); // :5672
  } else if (game.event.博物馆口上 == 2) {
    // :5674
    await era.printAndWait(''); // :5675
  } else if (game.event.博物馆口上 == 3) {
    // :5677
    await era.printAndWait(
      `「啊啦啊啦、${sc()}的这副样子被看到的话…真是很困扰呢」`,
    ); // :5678
  } else if (game.event.博物馆口上 == 4) {
    // :5680
    await era.printAndWait(
      `「要把${sc()}变成人偶？…为什么要做、这样……的………事…」`,
    ); // :5681
  } else if (game.event.博物馆口上 == 5) {
    // :5683
    await era.printAndWait(''); // :5684
  } else if (game.event.博物馆口上 == 6) {
    // :5686
    await era.printAndWait(''); // :5687
  } else if (game.event.博物馆口上 == 7) {
    // :5689
    await era.printAndWait(''); // :5690
  } else if (game.event.博物馆口上 == 8) {
    // :5692
    await era.printAndWait(''); // :5693
  } else if (game.event.博物馆口上 == 9) {
    // :5695
    await era.printAndWait(''); // :5696
  } // :5697
}

// @BANISHMENT_KOUJO_K13 // :5700
async function banishment_koujo_k13(rand) {
  void rand;

  if (game.event.流放口上 == 0) {
    // :5704
    await era.printAndWait(`「再见。应该是再也不见吧……」`); // :5705
  } else if (game.event.流放口上 == 1) {
    // :5707
    await era.printAndWait(''); // :5708
  } else if (game.event.流放口上 == 2) {
    // :5710
    await era.printAndWait(''); // :5711
  } else if (game.event.流放口上 == 3) {
    // :5713
    await era.printAndWait(''); // :5714
  } else if (game.event.流放口上 == 4) {
    // :5716
    await era.printAndWait(''); // :5717
  } // :5718
}

// @PUBLIC_EXUCUTION_KOUJO_K13 // :5721
async function public_exucution_koujo_k13(rand) {
  const { sc } = bind_ctx(rand);
  void rand;

  if (game.event.公开处刑口上 == 0) {
    // :5725
    await era.printAndWait(`「你、还是杀了${sc()}吧……」`); // :5726
  } else if (game.event.公开处刑口上 == 1) {
    // :5728
    await era.printAndWait(`「不要……${sc()}不想死……呜呜呜…」`); // :5729
  } else if (game.event.公开处刑口上 == 2) {
    // :5731
    await era.printAndWait(''); // :5732
  } // :5733
}

// @GROTESQUE_KOUJO_K13 // :5736
async function grotesque_koujo_k13(rand) {
  void rand;

  if (game.event.猎奇处刑口上 == 0) {
    // :5740
    await era.printAndWait(''); // :5741
  } else if (game.event.猎奇处刑口上 == 1) {
    // :5743
    await era.printAndWait(''); // :5744
  } else if (game.event.猎奇处刑口上 == 2) {
    // :5746
    await era.printAndWait(''); // :5747
  } else if (game.event.猎奇处刑口上 == 3) {
    // :5749
    await era.printAndWait(''); // :5750
  } else if (game.event.猎奇处刑口上 == 4) {
    // :5752
    await era.printAndWait(''); // :5753
  } else if (game.event.猎奇处刑口上 == 5) {
    // :5755
    await era.printAndWait(''); // :5756
  } else if (game.event.猎奇处刑口上 == 6) {
    // :5758
    await era.printAndWait(''); // :5759
  } // :5760
}

// @ENTERENEMY_KOUJO_K13 // :5763
async function enterenemy_koujo_k13(rand) {
  const a = era_flag.target;
  void rand;

  if (era0(`talent:${a}:21`) == 1 || era0(`talent:${a}:22`) == 1) {
    // :5766

    await era.printAndWait(`「……要上咯」`); // :5768
  } else if (
    era0(`talent:${a}:11`) == 1 ||
    era0(`talent:${a}:12`) == 1 ||
    era0(`talent:${a}:15`) == 1 ||
    era0(`talent:${a}:30`) == 1 ||
    era0(`talent:${a}:34`) == 1
  ) {
    // :5769

    await era.printAndWait(`「呵呵、坏孩子可是要被教训的呦？」`); // :5771
  } else if (era0(`talent:${a}:10`) == 1 || era0(`talent:${a}:26`) == 1) {
    // :5772

    await era.printAndWait(`「就算是${self_call(a)}……也能战斗的吗……？」`); // :5774
  } else {
    // :5775

    await era.printAndWait(`「呵呵、${self_call(a)}、会努力的♪」`); // :5777
  } // :5778
}

// @GOHOUBI_REQUEST_KOUJO_K13 // :5781
async function gohoubi_request_koujo_k13(rand) {
  const a = era_flag.target;
  const a_name = chara_callname(a);
  const { sc } = bind_ctx(rand);
  void rand;

  if (chara(a).stronghold.要求奖赏 == 0) {
    // :5784

    await era.printAndWait(`${a_name}要求奖励金钱`); // :5786
    await era.printAndWait(`「等${sc()}存够了钱、我们一起出去旅游吧♪　呵呵」`); // :5787
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // :5788

    await era.print(`${a_name}要求奖励与`); // :5790
    if (chara(a).stronghold.要求奖赏 == 1) {
      // :5791
      await era.print(`犬`); // :5792
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      // :5793
      await era.print(`豚`); // :5794
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      // :5795
      await era.print(`马`); // :5796
    } // :5797
    await era.printAndWait(`交尾`); // :5798
    await era.printAndWait(`「呵呵、野兽的鸡巴 真是期待啊♪」`); // :5799
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    // :5800

    await era.printAndWait(`${a_name}要求奖励接吻`); // :5802
    await era.printAndWait(`「到时候吻${sc()}吧、让我们的口水不分彼此♪」`); // :5803
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    // :5804

    await era.printAndWait(`${a_name}要求奖励做爱`); // :5806
    await era.printAndWait(`「奖励的话、比平时更激烈侵犯${sc()}就好了」`); // :5807
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    // :5808

    await era.printAndWait(`${a_name}要求奖励精液`); // :5810
    await era.printAndWait(
      `「不许打飞机了！请把精液先存在你那边、等我回来全部都是${sc()}的♪」`,
    ); // :5811
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    // :5812

    await era.printAndWait(`${a_name}要求奖励乱交派对`); // :5814
    await era.printAndWait(`「等${sc()}得胜回来、我们开全裸派对吧♪」`); // :5815
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    // :5816

    await era.printAndWait(`${a_name}要求奖励尿液`); // :5818
    await era.printAndWait(`「只要您的尿液就够了♪」`); // :5819
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    // :5820

    await era.printAndWait(`${a_name}要求奖励童贞狩猎`); // :5822
    await era.printAndWait(
      `「好孩子是要需要奖励的、就奖励${self_call(a)}一个乖孩子吧♪」`,
    ); // :5823
  } // :5824
}

// @GOHOUBI_AFTER_KOUJO_K13 // :5827
async function gohoubi_after_koujo_k13(rand, cid, choice) {
  const a = cid ?? era_flag.target;
  const { sc } = bind_ctx(rand);
  void rand;

  if (choice == 0) {
    // :5833
    await era.printAndWait(`「这样啊……真失望」`); // :5834
    return 0; // :5835
  } else if (choice == 1) {
    // :5837
    await era.printAndWait(`「呵呵、这是很重要的东西${sc()}会好好保存的」`); // :5838
    return 0; // :5839
  } else if (choice == 2) {
    // :5840

    if (chara(a).stronghold.要求奖赏 == 0) {
      // :5842
      await era.printAndWait(`「哇、这么多……谢谢！」`); // :5843
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      // :5845

      if (era0(`talent:${a}:0`) == 1) {
        // :5847
        await era.printAndWait(`「啊啊啊……和狗交配做爱什么的最棒了……」`); // :5848
      } else {
        // :5849
        await era.printAndWait(`「啊啊啊……和狗做爱最棒了……」`); // :5850
      } // :5851
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      // :5853

      if (era0(`talent:${a}:0`) == 1) {
        // :5855
        await era.printAndWait(`「噗嘻……噗嘻！和猪交配……真棒！」`); // :5856
      } else {
        // :5857
        await era.printAndWait(
          `「噗嘻……噗嘻！和猪交配什么的……还是新鲜的体验呢！」`,
        ); // :5858
      } // :5859
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      // :5861

      if (era0(`talent:${a}:0`) == 1) {
        // :5863
        await era.printAndWait(`「好大好长……${sc()}快要爽的飞起来了了」`); // :5864
      } else {
        // :5865
        await era.printAndWait(`「好大啊啊啊……和马做爱最棒了」`); // :5866
      } // :5867
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      // :5869
      await era.printAndWait(`「你答应好${sc()}的……请给${sc()}一个甜蜜的吻」`); // :5870
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      // :5872

      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // :5874
        await era.printAndWait(`「那个……果然还是和魔王大人做爱最舒服了」`); // :5875
      } else {
        // :5877
        await era.printAndWait(`「那个……果然还是和魔王大人做爱最舒服了」`); // :5878
      } // :5879
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      // :5881
      await era.printAndWait(
        `「呵呵、主人、${sc()}提前约好的精液可以给我了呦……啾……唔咕……呜呼……」`,
      ); // :5882
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      // :5884

      if (era0(`talent:${a}:0`) == 1) {
        // :5886
        await era.printAndWait(`「真是的还不够呢、再来点……」`); // :5887
      } else {
        // :5888
        await era.printAndWait(`「啊啊、再来、把你们的精华都给我吧……」`); // :5889
      } // :5890
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      // :5892
      await era.printAndWait(
        `「没错就是这边、请对准${sc()}的嘴……就直接把${sc()}当成便器吧♪」`,
      ); // :5893
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      // :5895

      if (era0(`abl:${a}:2`) > era0(`abl:${a}:3`)) {
        // :5897
        await era.printAndWait(`「第一次上了的小穴……你可要记住${sc()}呦」`); // :5898
      } else {
        // :5900
        await era.printAndWait(
          `「真是对不起、这么淫荡的肛门……感觉还可以吗？」`,
        ); // :5901
      } // :5902
    } else {
      // :5903
    } // :5904
  } // :5905
}

// @OSIOKI_KOUJO_K13 // :5907
async function osioki_koujo_k13(rand, cid, choice) {
  const a = cid ?? era_flag.target;
  void rand;

  if (choice == 0) {
    // :5913
    await era.printAndWait(''); // :5914
  } else if (choice == 1) {
    // :5916

    if (era0(`abl:${a}:21`) >= 3) {
      // :5918
      await era.printAndWait(''); // :5919
    } else {
      // :5920
      await era.printAndWait(''); // :5921
    } // :5922
  } else if (choice == 2) {
    // :5924

    if (era0(`abl:${a}:17`) >= 4) {
      // :5926
      await era.printAndWait(''); // :5927
    } else {
      // :5928
      await era.printAndWait(''); // :5929
    } // :5930
  } else if (choice == 3) {
    // :5932

    if (era0(`abl:${a}:17`) >= 6) {
      // :5934
      await era.printAndWait(''); // :5935
    } else {
      // :5936
      await era.printAndWait(''); // :5937
    } // :5938
  } else if (choice == 4) {
    // :5940

    if (era0(`abl:${a}:21`) >= 3) {
      // :5942
      await era.printAndWait(''); // :5943
    } else {
      // :5944
      await era.printAndWait(''); // :5945
    } // :5946
  } else if (choice == 5) {
    // :5948

    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {
      // :5950
      await era.printAndWait(''); // :5951
    } else {
      // :5952
      await era.printAndWait(''); // :5953
    } // :5954
  } else if (choice == 6) {
    // :5956
    await era.print(''); // :5957
  } else if (choice == 7) {
    // :5959
    await era.print(''); // :5960
  } else if (choice == 8) {
    // :5962
    await era.printAndWait(''); // :5963
  } else if (choice == 9) {
    // :5965
    await era.printAndWait(''); // :5966
  } // :5967
}

// @GOBI_KOUJO_K13, ARG:0 // :5970
async function gobi_koujo_k13(arg_0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg_0 == 1) {
    // :5973

    await era.print(`嗯♪`); // :5975
  } else if (arg_0 == 2) {
    // :5976

    await era.print(`哦！`); // :5978
  } else if (arg_0 == 3) {
    // :5979

    await era.print(`是的……。`); // :5981
  } else if (arg_0 == 4) {
    // :5982

    await era.print(`……。`); // :5984
  } else if (arg_0 == 5) {
    // :5985

    await era.print(`就是这样……。`); // :5987
  } else {
    // :5988

    if (rand_n(3) == 0) {
      // :5991
      await era.print(`嗯。`); // :5992
    } else if (rand_n(2) == 0) {
      // :5993
      await era.print(`呢。`); // :5994
    } else {
      // :5995
      await era.print(`呀。`); // :5996
    } // :5997
  } // :5998
}

on('EVENTTRAIN', eventtrain_k13);
on('EVENTEND', eventend_k13);

kojo_message_com_family.register(13, kojo_message_com_13);
self_kojo_family.register(13, self_kojo_k13);
kojo_message_palamcng_family.register(13, kojo_message_palamcng_13);
kojo_message_markcng_family.register(13, kojo_message_markcng_13);
gohoubi_after_koujo_family.register(13, (cid, choice) =>
  gohoubi_after_koujo_k13(undefined, cid, choice),
);
osioski_koujo_family.register(13, (cid, choice) =>
  osioki_koujo_k13(undefined, cid, choice),
);
gohoubi_request_koujo_family.register(13, () => gohoubi_request_koujo_k13());
ryouzyoku_kojo_family.register(13, dungeon_ryouzyoku_k13);
ryouzyoku_after_kojo_family.register(13, dungeon_ryouzyoku_after_k13);
gobi_koujo_family.register(13, gobi_koujo_k13);
benki_koujo_family.register(13, benki_koujo_k13);
enterenemy_koujo_family.register(13, enterenemy_koujo_k13);
dungeon_victory_family.register(13, dungeon_victory_k13);
dungeon_attack_family.register(13, dungeon_attack_k13);
ntr_koujo_family.register(13, ntr_koujo_k13);
exucution_koujo_family.register(13, exucution_koujo_k13);
museum_koujo_family.register(13, museum_koujo_k13);
banishment_koujo_family.register(13, banishment_koujo_k13);
public_exucution_koujo_family.register(13, public_exucution_koujo_k13);
grotesque_koujo_family.register(13, grotesque_koujo_k13);

module.exports = {
  STUBBED_CALLS,
  kojo_message_com_13,
  dog_kojo_13,
  colosseum_kojo_13,
  k13_kojo2,
  self_kojo_k13,
  kojo_message_palamcng_13,
  kojo_message_markcng_13,
  kojo_message_syasei_13,
  benki_koujo_k13,
  dungeon_ryouzyoku_k13,
  dungeon_ryouzyoku_after_k13,
  dungeon_victory_k13,
  dungeon_attack_k13,
  ntr_koujo_k13,
  exucution_koujo_k13,
  museum_koujo_k13,
  banishment_koujo_k13,
  public_exucution_koujo_k13,
  grotesque_koujo_k13,
  enterenemy_koujo_k13,
  gohoubi_request_koujo_k13,
  gohoubi_after_koujo_k13,
  osioki_koujo_k13,
  gobi_koujo_k13,
};
