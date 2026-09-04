/* eslint-disable no-irregular-whitespace, no-dupe-else-if, no-unreachable */
/**
 * @file 菲娅口上 K19（issue #247，J37）。
 *
 * 源: target/ERB/口上/EVENT_K19_菲娅.ERB（整份 :1-6724）。
 * @EVENTTRAIN / @EVENTEND、@KOJO_MESSAGE_COM_19、参数与刻印变化、
 * SELF_KOJO，以及迷宫、死斗场、NTR、处刑、博物馆、流放和奖惩口上
 * 均在本模块按原文件顺序实现。
 *
 * 原作缺陷 1:1 保留：@KOJO_MESSAGE_COM_19 的“自己扒开”段（:1199-1226）
 * 以 CFLAG:308 判首次，却在后续各档读写 CFLAG:306；这会与胸部爱抚共用
 * 计数器。移植不修正，变异条目固定此行为。
 * 原作缺陷 1:1 保留：@MUSEUM_KOUJO_K19 在 :6370 无条件 RETURN，故其后
 * 按 TFLAG:500 分派的分支不可达。移植保留原执行顺序，变异条目固定此行为。
 *
 * 原作未实现：@SINGLE_ENDING_K19（:5792 起）整段仍是注释，不凭空补写。
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
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  benki_koujo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  ntr_koujo_family,
  exucution_koujo_family,
  museum_koujo_family,
  banishment_koujo_family,
  public_exucution_koujo_family,
  grotesque_koujo_family,
  enterenemy_koujo_family,
  gohoubi_request_koujo_family,
  gobi_koujo_family,
} = require('#/kojo/kojo-system');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  peek_aftertrain_q,
  peek_aftertrain_s,
} = require('#/event/event-aftertrain');

const PBAND = 4; // ITEM:PBAND = ITEM:4（SYSTEM ver1.0.3.ERB:42）
const era0 = (key) => era.get(key) || 0;

// 需要复核 agent 补的导入（产物初稿不 require，保真锁会红）：
// const era = require('#/era-electron');
// const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
// const { chara_callname } = require('#/utils/callname-utils');
// 以及 target_name / player_name / assi_name / master_name / sc() / scf()
// 的取值（${target_name} 等插值的 JS 侧表达式）。

// @EVENTTRAIN // :51
on(
  'EVENTTRAIN',
  async () => {
    // #PRI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :52
    // FLAG:119  = 1（变量语义：FLAG 族，119） // :53
    game.kojo.口上存在_19 = 1; // :53
    if (game.kojo.口上开关 == 0) {
      // :55
      // FLAG:7  = 2（变量语义：FLAG 族，7） // :55
      game.kojo.口上开关 = 2; // :55
    } // :55
  },
  TIER.PRI,
);

// @EVENTEND // :57
on(
  'EVENTEND',
  async () => {
    // #LATER（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :58
    // FLAG:119  = 0（变量语义：FLAG 族，119） // :59
    game.kojo.口上存在_19 = 0; // :59
  },
  TIER.LATER,
);

// @EVENTTRAIN // :65
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  if (game.kojo.口上开关 <= 0) {
    // :67
    return 0; // :67
  } // :67
  if (era.get(`talent:${target}:179`) != 1) {
    // :69
    return 0; // :69
  } // :69

  if (chara(target).kojo.初调教 == 0) {
    // :74
    era.drawLine(); // :75

    if (era.get(`talent:${target}:314`) == 9) {
      // :77
      await era.printAndWait(`「呜……（吸鼻子）……呜呜……」`); // :78
      await era.printAndWait(
        `一进入调教室，映入眼帘的是躲在角落中抽泣的身影。原本是公主的名为${target_name}的幼女，好像暂时还没办法接受自己的新身份的样子。`,
      ); // :79
      await era.printAndWait(
        `${master_name}满足的看着眼前魔族幼女，慢慢走近。`,
      ); // :80
      await era.printAndWait(
        `听见脚步声的幼女转过头来，露出了泪眼汪汪的大眼睛。`,
      ); // :81
      await era.printAndWait(
        `尽管她很多事情都处于懵懂阶段，但已经变成了魔族的她，还是本能的认出了${master_name}。`,
      ); // :82
      await era.printAndWait(
        `「呜……魔王大人……？魔王大人……为什么会在这里……？」`,
      ); // :83
      await era.printAndWait(
        `精神上已经有些混乱的她，还不知道接下来迎接自己的会是什么样的命运……`,
      ); // :84
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :85
      chara(target).kojo.初调教 = 1; // :85

      // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :87
      chara(target).kojo.魔族化 = 1; // :87
    } else {
      // :89
      await era.printAndWait(`「呀……你……你是谁……这里是哪里……？」`); // :90
      await era.printAndWait(
        `一进入调教室，映入眼帘的是站在屋子正中的娇小身影。名为${target_name}的柔弱的幼女，正怯生生的抬头看着自己。`,
      ); // :91
      await era.printAndWait(
        `毕竟她还只是个孩子，对于自己身上发生了什么并不是很明白。只知道自己从睡梦中醒来的时候，身处一个陌生的地方。`,
      ); // :92
      await era.printAndWait(
        `${master_name}一边和她解释着她已经是自己的奴隶，一边慢慢的接近因为恐惧而站在原地一动不动的${target_name}。`,
      ); // :93
      await era.printAndWait(
        `「呜……总之……那个……就是说……你是坏人吧……你，你想干嘛……」`,
      ); // :94
      await era.printAndWait(
        `${master_name}没回答，只是蹲下来，乐在其中的拨弄着害怕的颤抖个不停的${target_name}的头发。`,
      ); // :95
      await era.printAndWait(`「呜呜……谁，谁来救救我呜……」`); // :96
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :97
      chara(target).kojo.初调教 = 1; // :97
      return 1; // :98
    } // :99
  } else if (
    chara(target).kojo.初调教 < 5 &&
    chara(target).kojo.魔族化 == 0 &&
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :103
    await era.printAndWait(`「呀呜……好像……身体……变得奇怪了……」`); // :104
    await era.printAndWait(`「我……我已经变成了……坏孩子了吗……」`); // :105
    await era.printAndWait(`面前原本是人类的幼女跪坐在地上，无助的大哭起来。`); // :106
    await era.printAndWait(`「不要啊啊啊，这个样子，会被大家讨厌的！」`); // :107
    await era.printAndWait(
      `哭声在屋子里回荡着，大颗大颗的泪珠沿着脸颊滑落下来。`,
    ); // :108

    // CFLAG:370  = 2（变量语义：CFLAG 族，370） // :110
    chara(target).kojo.魔族化 = 2; // :110
    return 1; // :111
  } else if (
    chara(target).kojo.初调教 >= 1 &&
    chara(target).kojo.NTR再捕获 == 1
  ) {
    // :115
    if (era.get(`talent:${target}:85`)) {
      // :116
      era.drawLine(); // :117
      await era.printAndWait(`「呜啊啊啊～主人～！」`); // :118
      await era.printAndWait(`「好可怕，好可怕呜呜～」`); // :119
      await era.printAndWait(
        `被带到${master_name}面前的${target_name}，一下子扑到${master_name}身上大哭起来。`,
      ); // :120
      await era.printAndWait(
        `「那个人，对我做这样那样的事情，还让我忘掉主人。」`,
      ); // :121
      await era.printAndWait(
        `「呜呜，如果不乖乖照做的话，也许就见不到主人了，我，我好害怕……」`,
      ); // :122
      await era.printAndWait(`「能够再见到主人，好开心……」`); // :123
      await era.printAndWait(`「但是……那种样子……被主人全都看到了……」`); // :124
      await era.printAndWait(`「主人……你会讨厌我吗……？」`); // :125
      await era.printAndWait(
        `${target_name}泪眼汪汪的抬头看着${master_name}，颤抖的说着，仿佛受惊的小动物一般。`,
      ); // :126
      await era.printAndWait(
        `在那之后，花了一番功夫安抚她的情绪，然而因为水晶球的事，最后还是好好的用下面“惩罚”了她一番。`,
      ); // :127

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :129
      chara(target).kojo.NTR再捕获 = 0; // :129
    } else if (era.get(`talent:${target}:76`)) {
      // :130
      era.drawLine(); // :131
      await era.printAndWait(`「呼啊……嗯……啾……❤」`); // :132
      await era.printAndWait(
        `${target_name}乖巧伏在${master_name}的身下，伸出小舌头专心的舔弄着肉棒。`,
      ); // :133
      await era.printAndWait(
        `「诶嘿嘿，虽然和其他人的H也很舒服，但是总觉得少了点什么呢……」`,
      ); // :134
      await era.printAndWait(`「嗯嗯～果然还是主人的肉棒最棒了❤」`); // :135
      await era.printAndWait(
        `「所以……请用主人的精液牛奶……把那个人留在${sc()}肚子里面的东西全部洗干净呐❤」`,
      ); // :136
      await era.printAndWait(
        `${target_name}满眼桃心的仰头看着${master_name}。`,
      ); // :137
      await era.printAndWait(`在那之后，好好的用下面“惩罚”了她一整晚。`); // :138

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :140
      chara(target).kojo.NTR再捕获 = 0; // :140
    } else {
      // :141
      era.drawLine(); // :142
      await era.printAndWait(
        `「呜……为什么不管是谁……都对${sc()}做这样那样的事情呢。」`,
      ); // :143
      await era.printAndWait(`「这样的日子……不要了啦……好想……好想回家……」`); // :144
      await era.printAndWait(`被关在笼子里的${target_name}，不断的抽泣着。`); // :145
      await era.printAndWait(
        `坐在王座上的${master_name}俯视着${target_name}，轻蔑的从鼻子里哼了一声。`,
      ); // :146
      await era.printAndWait(`只要是魔王的东西，就没有人能拿得走。`); // :147

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :149
      chara(target).kojo.NTR再捕获 = 0; // :149
    } // :150
    return 1; // :151
  } else if (
    chara(target).kojo.初调教 < 2 &&
    era.get(`mark:${target}:2`) == 1 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :156
    era.drawLine(); // :157
    await era.printAndWait(`「呜呜……这种事……不要了啦……」`); // :158
    await era.printAndWait(
      `${target_name}轻声的哀求着，似乎已经不像最初那样拼命抵抗了。`,
    ); // :159
    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :160
    chara(target).kojo.初调教 = 2; // :160
    return 1; // :161
  } else if (
    chara(target).kojo.初调教 < 3 &&
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :164
    era.drawLine(); // :165
    await era.printAndWait(
      `「呜……我知道了啦……我会乖乖的……听魔王大人的话的……」`,
    ); // :166
    await era.printAndWait(
      `${target_name}无精打采的低着头，彻底的放弃了抵抗。`,
    ); // :167
    // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :168
    chara(target).kojo.初调教 = 3; // :168
    return 1; // :169
  } else if (
    chara(target).kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :172
    era.drawLine(); // :173
    await era.printAndWait(`「诶，从现在开始要叫主人吗？」`); // :174
    await era.printAndWait(`「呜……我明白了……主人……」`); // :175
    await era.printAndWait(`连番的调教已经让她的精神彻底的沦陷了。`); // :176
    // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :177
    chara(target).kojo.初调教 = 4; // :177
    return 1; // :178
  } else if (
    chara(target).kojo.初调教 < 5 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`talent:${target}:314`) != 9
  ) {
    // :182
    era.drawLine(); // :183
    await era.printAndWait(`「主人……❤」`); // :184
    await era.printAndWait(`${target_name}轻轻扯着${master_name}的衣角。`); // :185
    await era.printAndWait(`「那……那个……❤」`); // :186
    await era.printAndWait(`「还想和主人……继续做H的事情呢❤」`); // :187
    await era.printAndWait(
      `${target_name}的小脸上浮着一层红晕，眼里满满的都是和年龄不符的欲望。`,
    ); // :188
    await era.printAndWait(`「呐呐……主人……教我更多……H的事情吧……❤」`); // :189
    if (era.get(`talent:${target}:0`) == 1) {
      // :191
      await era.printAndWait(`「更进一步的……也没问题哟……❤」`); // :191
    } // :191
    await era.printAndWait(`${target_name}一脸痴态的望着${master_name}。`); // :192
    // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :193
    chara(target).kojo.初调教 = 5; // :193
    return 1; // :194
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    chara(target).kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 1
  ) {
    // :198
    era.drawLine(); // :199
    await era.printAndWait(`「诶嘿嘿，主人的味道，最喜欢了❤」`); // :200
    await era.printAndWait(
      `${target_name}一边用小脸磨蹭着${master_name}的肉棒，一边玩弄着自己的下半身。透明的爱液沿着大腿缓缓流下。`,
    ); // :201
    await era.printAndWait(
      `「变成这个样子的话……不管主人想玩什么样子的play都没关系了呢❤」`,
    ); // :202
    await era.printAndWait(`「主人……来做更多……H的事情吧❤」`); // :203
    await era.printAndWait(
      `变化为魔族的${target_name}，已经彻底的沦为了欲望的俘虏。`,
    ); // :204
    // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :205
    chara(target).kojo.初调教 = 6; // :205
    return 1; // :206
  } else if (
    chara(target).kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:314`) != 9 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :210
    era.drawLine(); // :211
    await era.printAndWait(`「呐呐……主人……」`); // :212
    await era.printAndWait(
      `${target_name}靠在${master_name}怀里，任由${master_name}的手在自己身上各处抚摸着。`,
    ); // :213
    await era.printAndWait(`「最近……脑子里面一直想着主人的事情……」`); // :214
    await era.printAndWait(
      `「主人的样貌……声音……味道……还有好多好多其他的东西……」`,
    ); // :215
    await era.printAndWait(`「我好像已经……离不开主人了呢……」`); // :216

    if (game.event.爱或淫乱人数 > 2) {
      // :218
      await era.printAndWait(`「但是……主人……还有其他的姐姐们呢……」`); // :219
      await era.printAndWait(
        `「呜……确实……我比起姐姐们来……可能没什么魅力……也没有她们那么会服侍主人……」`,
      ); // :220
      await era.printAndWait(`「但，但是……我是真的很喜欢主人的说！」`); // :221
      await era.printAndWait(
        `虽然好像越说越情绪低落，但是她似乎是想了很久才下定了决心的样子，最后还是鼓起勇气说了出来。`,
      ); // :222
      if (era.get(`talent:${target}:0`) == 1) {
        // :223
        await era.printAndWait(
          `尽管如此，一想到${master_name}连自己的第一次都还没有拿走，${target_name}的情绪好像更加的低落了。`,
        ); // :224
        await era.printAndWait(
          `「啊呜……果然我这样的小孩子……对主人来说没什么吸引力吗……」`,
        ); // :225
      } // :226
    } else if (game.event.爱或淫乱人数 == 2) {
      // :228
      await era.printAndWait(`「但是……主人……还有其他的姐姐呢……」`); // :229
      await era.printAndWait(
        `「呜……确实……我比起姐姐来……可能没什么魅力……也没有她那么会服侍主人……」`,
      ); // :230
      await era.printAndWait(`「但，但是……我是真的很喜欢主人的说！」`); // :231
      await era.printAndWait(
        `虽然好像越说越情绪低落，但是她似乎是想了很久才下定了决心的样子，最后还是鼓起勇气说了出来。`,
      ); // :232
      if (era.get(`talent:${target}:0`) == 1) {
        // :233
        await era.printAndWait(
          `尽管如此，一想到${master_name}连自己的第一次都还没有拿走，${target_name}的情绪好像更加的低落了。`,
        ); // :234
        await era.printAndWait(
          `「啊呜……果然我这样的小孩子……对主人来说没什么吸引力吗……」`,
        ); // :235
      } // :236
    } else {
      // :238
      await era.printAndWait(`「所……所以……那个……可以让${sc()}任性一次吗……？」`); // :239
      await era.printAndWait(
        `在得到了同意之后，${target_name}伸出小指轻轻的勾住${master_name}的手指。`,
      ); // :240
      await era.printAndWait(`「诶嘿嘿～今后也要……一直在一起……约好了哟❤」`); // :241
      if (chara(target).train.初吻对象 == -1) {
        // :242
        await era.printAndWait(
          `这么说着的${target_name}，意外主动的贴了过来。`,
        ); // :243
        await era.printAndWait(`「所以……我的初吻……请您……」`); // :244
        await era.printAndWait(
          `不等她说完，${master_name}按着${target_name}的头压过来，将舌头侵入到了还不知道什么是kiss的小嘴中。`,
        ); // :245
        await era.printAndWait(
          `一边感受柔软的小舌头略显生涩的侍奉，一边享受着幼女甘甜的唾液。`,
        ); // :246
        await era.printAndWait(`「啾……呼啊……主人❤」`); // :247
        await era.printAndWait(`「最喜欢你了❤」`); // :248
      } // :249
      // CFLAG:16  = 1（变量语义：CFLAG 族，16） // :250
      chara(target).train.初吻对象 = 1; // :250
      // 赋值 CSTR:4  = ${master_name} // :251
    } // :252
    await era.printAndWait(''); // :253
    // CFLAG:201  = 7（变量语义：CFLAG 族，201） // :254
    chara(target).kojo.初调教 = 7; // :254
    return 1; // :255
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    chara(target).kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :259
    era.drawLine(); // :260

    if (chara(target).kojo.魔族化 == 1) {
      // :262
      await era.printAndWait(`「诶嘿嘿……主人……最喜欢了……❤」`); // :263
      await era.printAndWait(
        `不停嗅着${master_name}身上味道的${target_name}，简直就像一直小狗一样。`,
      ); // :264
      await era.printAndWait(`「果然还是和主人在一起最好了呢～」`); // :265
      await era.printAndWait(
        `「变成魔族了的现在，和主人的距离就变得更加接近了吧？」`,
      ); // :266
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :267
      chara(target).kojo.初调教 = 8; // :267
      return 1; // :268
    } else if (chara(target).kojo.魔族化 == 2) {
      // :270
      await era.printAndWait(`「诶嘿嘿……主人……最喜欢了……❤」`); // :271
      await era.printAndWait(
        `不停嗅着${master_name}身上味道的${target_name}，简直就像一直小狗一样。`,
      ); // :272
      await era.printAndWait(
        `「虽然有些怀念原本的生活，但是……果然还是和主人在一起最好了呢～」`,
      ); // :273
      await era.printAndWait(
        `「变成魔族了的现在，和主人的距离就变得更加接近了吧？」`,
      ); // :274
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :275
      chara(target).kojo.初调教 = 8; // :275
      return 1; // :276
    } // :277
  } else if (
    era.get(`talent:${target}:9`) == 1 &&
    chara(target).kojo.初调教 < 9
  ) {
    // :281
    era.drawLine(); // :282
    await era.printAndWait(`「不要啊……求求你……饶了我吧……」`); // :283
    await era.printAndWait(
      `双眼失去了焦点的${target_name}缩在角落瑟瑟发抖，机械性的重复着几个短句。`,
    ); // :284
    await era.printAndWait(
      `看来她的脆弱的精神已经彻底到达了极限，这个孩子恐怕再也回不到原本的样子了吧……`,
    ); // :285
    // CFLAG:201  = 9（变量语义：CFLAG 族，201） // :286
    chara(target).kojo.初调教 = 9; // :286
    return 1; // :287
  } else if (era_flag.assi < 0) {
    // :290
    await k19_kojo2(); // :291
    await k19_fuku(); // :292
  } else {
    // :351
    await k19_kojo2(); // :352
    await k19_fuku(); // :353
  } // :354
});

// @k19_kojo2 // :360
async function k19_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  const rand_n = (n) => Math.floor(Math.random() * n);
  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    // :362
    era.drawLine(); // :363
    await era.printAndWait(`「呜呜……不，不要过来……求求你！」`); // :364
    await era.printAndWait(`精神已经的崩坏了的她，已经无法分清幻觉和现实了。`); // :365
    return 1; // :366
  } else if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    // :369
    era.drawLine(); // :370
    await era.printAndWait(`「不要……讨厌……」`); // :371
    await era.printAndWait(
      `${target_name}徒劳后退，想要躲开${master_name}的魔爪。`,
    ); // :372
    return 1; // :373
  } else if (
    era.get(`mark:${target}:2`) == 0 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :376
    era.drawLine(); // :377
    await era.printAndWait(`「呜呜……做什么啦……不要啊……」`); // :378
    await era.printAndWait(
      `${target_name}有些嫌恶的想推开${master_name}的手。`,
    ); // :379
    await era.printAndWait(
      `只是，力量上绝对的差距连让${master_name}稍微动一动都做不到。`,
    ); // :380
    return 1; // :381
  } else if (
    era.get(`mark:${target}:2`) == 1 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :384
    era.drawLine(); // :385
    await era.printAndWait(`「呜……又要……做那个了吗……」`); // :386
    await era.printAndWait(
      `${target_name}不情愿的嘟着小嘴，抱着脚坐在床的正中央。`,
    ); // :387
    await era.printAndWait(`${target_name}的样子似乎没有之前那么抵触了。`); // :388
    return 1; // :389
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :392
    era.drawLine(); // :393
    await era.printAndWait(
      `「魔王大人……那个……我……我会乖乖听话的……所以……可，可以温柔一点吗……」`,
    ); // :394
    await era.printAndWait(
      `${target_name}似乎已经接受了自己身为${master_name}的奴隶的事实。`,
    ); // :395
    await era.printAndWait(
      `看见调教有所成效的${master_name}，满意的摸了摸${target_name}的头……`,
    ); // :396
    return 1; // :397
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :400
    era.drawLine(); // :401
    await era.printAndWait(`「啊……主人……您来了吗……」`); // :402
    await era.printAndWait(`「今天又要对${sc()}做些什么呢……？」`); // :403
    await era.printAndWait(
      `乖乖的洗干净身体的她，跪坐在床上等待着${master_name}的临幸。水汪汪的大眼睛里，看不出任何一点反抗的苗头。`,
    ); // :404
    await era.printAndWait(
      `精神上已经完全服从于${master_name}的现在，侍奉${master_name}才是最重要的事情。`,
    ); // :405
    return 1; // :406
  } else if (era.get(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    // :409
    era.drawLine(); // :410

    if (game.system.着衣系统 != 0) {
      // :413

      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 131
      ) {
        // :415
        await era.printAndWait(`「呼啊啊啊……」`); // :416
        await era.printAndWait(
          `进屋的时候，${target_name}似乎刚刚睡醒的样子，揉着惺忪的睡眼。`,
        ); // :417
        await era.printAndWait(`……仔细看的话，另一只手似乎是在被子里动着……`); // :418
        await era.printAndWait(`「啊，主人～❤」`); // :419
        await era.printAndWait(`「来和${sc()}做H的事情了吗❤」`); // :420
        await era.printAndWait(`「诶嘿嘿，H的事情，最喜欢了❤」`); // :421
        await era.printAndWait(
          `这么说着的${target_name}，从被子里抽出了沾着晶亮液体的手指。`,
        ); // :422
        return 1; // :423
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        // :425
        await era.printAndWait(`「啊，主人欢迎回来～❤」`); // :426
        await era.printAndWait(
          `一进屋，穿着妹抖服的${target_name}已经乖巧的站在一旁了。`,
        ); // :427
        await era.printAndWait(
          `「您是先做H的事情呢，还是先做H的事情呢，还是说……想要做H的事情呢～❤」`,
        ); // :428
        await era.printAndWait(
          `这么说着的${target_name}，提起了裙子，露出了湿漉漉的下半身。`,
        ); // :429
        return 1; // :430
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 208
      ) {
        // :432
        await era.printAndWait(`「主人，您来了呢❤」`); // :433
        await era.printAndWait(`穿着礼服的${target_name}，静静的端坐在床上。`); // :434
        await era.printAndWait(
          `虽然是个小孩子，毕竟也曾经是公主，多少还是有些贵族气质留在身上。`,
        ); // :435
        await era.printAndWait(`「这身衣服……有些想起以前的事情了呢……」`); // :436
        await era.printAndWait(
          `${target_name}的脸上意外的露出了有些复杂的表情，不过很快就被红晕所取代。`,
        ); // :437
        await era.printAndWait(`「但是……和主人在一起，才是最开心的～」`); // :438
        await era.printAndWait(`「当然……还有H的事情❤」`); // :439
        await era.printAndWait(
          `这么说着的${target_name}的小脸上，浮现出了满满的欲望。`,
        ); // :440
        return 1; // :441
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 221
      ) {
        // :443
        await era.printAndWait(`「啊呜？这身衣服……」`); // :444
        await era.printAndWait(
          `「啊～❤我知道了，主人是那个……诶多……萝莉控吧～❤」`,
        ); // :445
        await era.printAndWait(
          `原本就身材娇小的${target_name}，穿上幼稚园服并没有什么违和感。`,
        ); // :446
        await era.printAndWait(`「诶嘿嘿，主人，我们来玩游戏吧～」`); // :447
        await era.printAndWait(`「H的游戏❤」`); // :448
        await era.printAndWait(
          `拉扯着${master_name}衣角的${target_name}，稚气未脱的小脸上满满的都是和年龄不符的欲望。`,
        ); // :449
        return 1; // :450
      } else if (chara(target).chara.特别服装类型 == 71) {
        // :452
        await era.printAndWait(`「诶嘿嘿……主人的味道～❤」`); // :453
        await era.printAndWait(`「呐呐，再多抱抱${sc()}嘛～❤」`); // :454
        await era.printAndWait(
          `带着项圈的${target_name}，宛如发情中的小动物，不停的朝着${master_name}撒娇。`,
        ); // :455
        await era.printAndWait(
          `只是闻到${master_name}的味道，下半身就开始不由自主的变得湿漉漉了。`,
        ); // :456
        await era.printAndWait(`「这个样子，就像是主人的宠物一样呢❤」`); // :457
        await era.printAndWait(`「汪汪～想和主人交尾呢～❤」`); // :458
        return 1; // :459
      } // :460
    } else {
      // :462
      if (rand_n(2) == 0) {
        // :463
        await era.printAndWait(`「呜……主人，来做H的事情嘛～❤」`); // :464
        await era.printAndWait(
          `含着自己手指的${target_name}，就像小孩子和父母讨要甜食一般自然的说着色气满满的语句。`,
        ); // :465
        await era.printAndWait(
          `仰视着${master_name}的眼睛里，仿佛可以看得见满满的桃心。`,
        ); // :466
        if (era.get(`abl:${target}:32`) >= 3) {
          // :468
          await era.printAndWait(`「想要主人的精液牛奶嘛……❤」`); // :468
        } // :468
      } else {
        // :469
        await era.printAndWait(`「诶嘿嘿，主人的肉棒，最喜欢了～❤」`); // :470
        await era.printAndWait(`「今天也要和肉棒做H的事情呢❤」`); // :471
        await era.printAndWait(
          `${target_name}趴在${master_name}身上，在耳边吐出带着甜味的热气。`,
        ); // :472
        await era.printAndWait(
          `纤细的小手则沿着${master_name}的身体往下移，握住了粗大的肉棒，轻轻的套弄着。`,
        ); // :473
        if (era.get(`abl:${target}:32`) >= 3) {
          // :475
          await era.printAndWait(
            `「用主人的精液牛奶……把${sc()}的肚子里灌得满满的吧❤」`,
          ); // :475
        } // :475
      } // :476
    } // :477
    return 1; // :478
  } else if (era.get(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    // :480
    era.drawLine(); // :481

    if (game.system.着衣系统 != 0) {
      // :484

      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 131
      ) {
        // :486
        if (rand_n(2)) {
          // :487
          await era.printAndWait(`「呼……呼……」`); // :488
          await era.printAndWait(
            `进屋的时候，${target_name}似乎还在睡觉的样子……`,
          ); // :489
          await era.printAndWait(`「嗯……呼……呼诶……？」`); // :490
          await era.printAndWait(`「主……主人……？」`); // :491
          await era.printAndWait(
            `正脱着她的衣服准备给她一个“惊喜”的时候刚好醒来的样子。`,
          ); // :492
          await era.printAndWait(
            `「呜呜～真是的～不好好睡觉的话会长不高的哦～」`,
          ); // :493
          await era.printAndWait(
            `「把${sc()}带过来的那个时候也是……呜～${sc()}真的会长不高的啦～」`,
          ); // :494
          await era.printAndWait(
            `虽然这么说，但是并没有什么埋怨的意思在里面。`,
          ); // :495
          await era.printAndWait(`不如说……其实是在撒娇吧？`); // :496
        } else {
          // :497
          await era.printAndWait(`「呼啊啊啊……」`); // :498
          await era.printAndWait(
            `进屋的时候，${target_name}似乎刚刚睡醒的样子，揉着惺忪的睡眼。`,
          ); // :499
          await era.printAndWait(`「诶……主人……？」`); // :500
          await era.printAndWait(`「啊……早安～……」`); // :501
          await era.printAndWait(
            `「诶嘿嘿，主人来找${sc()}了吗……好开心的说～」`,
          ); // :502
          await era.printAndWait(
            `仔细看看，刚睡醒稍稍有些乱的衣服和有些迷糊的样子显得更加诱人了……`,
          ); // :503
          await era.printAndWait(
            `在没有受到任何反抗的情况下，轻松的把${target_name}按回了床上。`,
          ); // :504
          await era.printAndWait(`「主人……真H呢……❤」`); // :505
          await era.printAndWait(
            `呼吸着${master_name}味道的${target_name}，将自己全部身心都交给了主人……`,
          ); // :506
        } // :507
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        // :509
        await era.printAndWait(`「啊，主人欢迎回来～❤」`); // :510
        await era.printAndWait(
          `一进屋，穿着妹抖服的${target_name}已经乖巧的站在一旁了。`,
        ); // :511
        await era.printAndWait(`「您是先吃饭呢，还是先洗澡呢，还是我呢……？」`); // :512
        await era.printAndWait(
          `${target_name}轻轻的压着有些短的裙子，红着脸仰头看着${master_name}。`,
        ); // :513
        await era.printAndWait(`答案什么的一开始就只有一个吧。`); // :514
        return 1; // :515
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 208
      ) {
        // :517
        await era.printAndWait(`「啊，主人，您来了……」`); // :518
        await era.printAndWait(`穿着礼服的${target_name}，静静的端坐在床上。`); // :519
        await era.printAndWait(
          `虽然是个小孩子，毕竟也曾经是公主，多少还是有些贵族气质留在身上。`,
        ); // :520
        await era.printAndWait(`「这身衣服……有些想起以前的事情了呢……」`); // :521
        await era.printAndWait(
          `${target_name}的脸上意外的露出了有些复杂的表情，不过很快就被红晕所取代。`,
        ); // :522
        await era.printAndWait(`「但是……和主人在一起，才是最开心的～」`); // :523
        await era.printAndWait(`「今后……也请多多指教呢……」`); // :524
        await era.printAndWait(`「我的……王子大人……❤」`); // :525
        return 1; // :526
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 221
      ) {
        // :528
        await era.printAndWait(`「啊呜？这身衣服……」`); // :529
        await era.printAndWait(
          `「虽然知道主人喜欢${sc()}这样的小孩子有点开心……」`,
        ); // :530
        await era.printAndWait(`「但是……呜……好害羞呜……」`); // :531
        await era.printAndWait(
          `原本就身材娇小的${target_name}，穿上幼稚园服并没有什么违和感。`,
        ); // :532
        await era.printAndWait(`「不过……只要主人喜欢的话……」`); // :533
        return 1; // :534
      } else if (chara(target).chara.特别服装类型 == 71) {
        // :536
        await era.printAndWait(`「哈哇哇……这个……这个是……」`); // :537
        await era.printAndWait(`「呜呜……这种事……好害羞的说……」`); // :538
        await era.printAndWait(`「但是……如果是主人的话……不讨厌呢……」`); // :539
        await era.printAndWait(
          `带着项圈的${target_name}依偎在${master_name}怀里撒着娇，就像一只小狗一样。`,
        ); // :540
        await era.printAndWait(
          `「总觉得……这样子的话，更加有种是主人的东西的感觉呢……」`,
        ); // :541
        return 1; // :542
      } // :543
    } else {
      // :545

      if (rand_n(3) == 0) {
        // :547
        await era.printAndWait(`「诶嘿嘿，主人，您来了呢～」`); // :548
        await era.printAndWait(`「今天想要做什么呢？」`); // :549
        await era.printAndWait(
          `「只要是主人想做的，${sc()}什么都没问题的说❤」`,
        ); // :550
        await era.printAndWait(
          `${target_name}仰着头微笑的看着${master_name}，眼里满满的都是爱意。`,
        ); // :551
      } else if (rand_n(2) == 0) {
        // :552
        await era.printAndWait(`「主人的味道呢……」`); // :553
        await era.printAndWait(`「还有……感觉得到主人的心跳声……」`); // :554
        await era.printAndWait(
          `${target_name}把头靠在${master_name}身上，闭着眼睛轻轻的蹭着，用小手引导着${master_name}的手放在自己平坦的胸脯上。`,
        ); // :555
        await era.printAndWait(`「主人也……感受到了吗？」`); // :556
        await era.printAndWait(`从手的那一端，确实的传来的小而有力的心跳声。`); // :557
        await era.printAndWait(
          `不过，连同这个，也都是全部都是属于${master_name}的。`,
        ); // :558
        await era.printAndWait(`「主人……最喜欢你了❤」`); // :559
      } else {
        // :560
        await era.printAndWait(`「主人……今天也来了呢……」`); // :561
        await era.printAndWait(`「能得到主人的宠幸……${sc()}感觉很幸福的说……」`); // :562
        await era.printAndWait(`「H的事情的话……」`); // :563
        await era.printAndWait(
          `${target_name}的小脸上浮现出一层红晕，用细不可闻的的声音说完了后半句。`,
        ); // :564
        await era.printAndWait(
          `「只要和主人在一起，不管怎么样都觉得……很舒服呢……❤」`,
        ); // :565
      } // :566
    } // :567

    if (
      chara(target).chara.特别服装类型 == 91 &&
      chara(target).train.着衣状态 & 64 &&
      chara(target).chara.结婚对象 == 901 &&
      game.system.着衣系统 != 0
    ) {
      // :570
      await era.printAndWait(
        `这么说着的${target_name}，紧紧的攥着纤细的手指上的戒指，目光则一直停留在${master_name}身上，小脸上满是幸福的表情。`,
      ); // :570
    } // :570
    return 1; // :571
  } // :572
}

// @k19_fuku // :577
async function k19_fuku() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  const rand_n = (n) => Math.floor(Math.random() * n);
  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    // :579
    await era.printAndWait(`「呜……不要……」`); // :580
    await era.printAndWait(
      `${target_name}不停的抽泣着，对脱衣服这件事完全没有抵抗。`,
    ); // :581
    await era.printAndWait(
      `精神已经崩坏的她，对外界的刺激已经没有多少反应了。`,
    ); // :582
    return 1; // :583
  } else if (game.system.着衣系统 == 0) {
    // :585
    return 1; // :586
  } else if (
    chara(target).chara.特别服装类型 <= 50 &&
    chara(target).chara.特别服装类型 != 0
  ) {
    // :588
    return 1; // :589
  } else if (
    (chara(target).train.着衣状态 & 28) == 0 &&
    chara(target).train.上衣类型 == 0
  ) {
    // :591

    if (
      era.get(`mark:${target}:3`) == 3 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      // :593
      era.drawLine(); // :594
      await era.printAndWait(
        `虽然因为害怕而脱光了衣服，但${target_name}仍然害怕的躲着${master_name}。`,
      ); // :595
    } else if (
      era.get(`mark:${target}:2`) == 0 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      // :597
      era.drawLine(); // :598
      await era.printAndWait(`「呜……一定要这样吗……讨厌……」`); // :599
      await era.printAndWait(
        `${target_name}一边轻轻抽泣着，一边不情愿的脱下了衣物。`,
      ); // :600
    } else if (
      era.get(`mark:${target}:2`) == 1 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      // :602
      era.drawLine(); // :603
      await era.printAndWait(`「呜呜……非要……光着身子咩……有点冷的说……」`); // :604
    } else if (
      era.get(`mark:${target}:2`) == 2 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      // :606
      era.drawLine(); // :607
      await era.printAndWait(`「脱衣服吗……呜……总觉得好害羞……」`); // :608
      await era.printAndWait(
        `脱掉了衣服的${target_name}，害羞的用手遮挡住重要的地方。`,
      ); // :609
    } else if (
      era.get(`mark:${target}:2`) == 3 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      // :611
      era.drawLine(); // :612
      await era.printAndWait(`「呜嗯……这样就可以了吗……主人……？」`); // :613
      await era.printAndWait(
        `${target_name}乖巧的脱光了衣服，仰着头看着${master_name}。`,
      ); // :614
    } else if (
      era.get(`mark:${target}:2`) == 3 &&
      era.get(`talent:${target}:85`) == 1 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      // :616
      era.drawLine(); // :617
      await era.printAndWait(`「诶，主人想看${sc()}的身体吗……」`); // :618
      await era.printAndWait(`「嗯……可以哟……」`); // :619
      await era.printAndWait(
        `${target_name}的有些脸红的看着${master_name}，积极的脱下了衣服。`,
      ); // :620
      if (rand_n(2) == 0 && chara(target).chara.特别服装类型 == 92) {
        // :621

        await era.printAndWait(`「只要和主人在一起的话……就算没有衣服也……」`); // :623
        await era.printAndWait(
          `${target_name}轻轻的抚摸着戒指，露出了幸福的表情。`,
        ); // :624
      } // :625
    } else if (
      era.get(`mark:${target}:2`) == 3 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 1
    ) {
      // :627
      era.drawLine(); // :628
      await era.printAndWait(`「诶嘿嘿……主人真是H呢……❤」`); // :629
      await era.printAndWait(`「今天也……来做H的事情吧❤」`); // :630
      await era.printAndWait(
        `脱光光的${target_name}主动的贴了上来，用未发育完全的幼小身躯诱惑着${master_name}。`,
      ); // :631
      await era.printAndWait(`「是先从这里开始吗～❤」`); // :632

      if (rand_n(5) == 0) {
        // :634
        await era.printAndWait(`${target_name}的手指搭在嘴唇上说着。`); // :635
      } else if (rand_n(4) == 0) {
        // :636
        await era.printAndWait(
          `${target_name}用平坦的胸部轻轻的磨蹭着${master_name}的身体。`,
        ); // :637
      } else if (rand_n(3) == 0) {
        // :638
        await era.printAndWait(
          `${target_name}跨坐在${master_name}的大腿上，前后摩擦着阴蒂。`,
        ); // :639
      } else if (rand_n(2) == 0) {
        // :640
        await era.printAndWait(
          `${target_name}满眼桃心的看着${master_name}，透明的爱液沿着大腿流了下来。`,
        ); // :641
      } else {
        // :642
        await era.printAndWait(
          `${target_name}引导着${master_name}的手摩擦着光滑的小屁股。`,
        ); // :643
      } // :644
    } // :645
    return 1; // :646
  } // :647
  return 0; // :648
}

// @EVENTEND // :654
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const rand_n = (n) => Math.floor(Math.random() * n);
  if (game.kojo.口上开关 <= 0) {
    // :656
    return 0; // :656
  } // :656
  if (era.get(`talent:${target}:179`) != 1) {
    // :658
    return 0; // :658
  } // :658

  if (era.get(`base:${target}:0`) <= 0) {
    // :662
    return 0; // :662
  } // :662

  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    // :668
    era.drawLine(); // :669
    await era.printAndWait(`「呜呜……不……要……」`); // :670
    await era.printAndWait(
      `遍布着凌辱痕迹的${target_name}无助的趴在地上，眼泪止不住的流下来。`,
    ); // :671
    return 1; // :672
  } else if (
    era.get(`mark:${target}:3`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :674
    era.drawLine(); // :675
    await era.printAndWait(`「呜……谁来……谁来……救救我吧……」`); // :676
    await era.printAndWait(`${target_name}抱着双脚坐在墙角不断的抽泣着。`); // :677
    return 1; // :678
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :681
    era.drawLine(); // :682
    await era.printAndWait(`「终于……结束了吗……？」`); // :683
    await era.printAndWait(
      `眼角挂着泪珠的${target_name}缩在床上，害怕的看着${master_name}。`,
    ); // :684
    await era.printAndWait(
      `在得到了确认的回答之后，才怯怯的开始用纸巾擦拭起自己的身体来。`,
    ); // :685
    return 1; // :686
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :689
    era.drawLine(); // :690
    await era.printAndWait(`「呼……呼……」`); // :691
    await era.printAndWait(`${target_name}在被子里缩成一团，很快就睡着了。`); // :692
    await era.printAndWait(
      `虽然在精神上已经完全服从${master_name}了，但是身体上毕竟还只是孩子，要适应调教似乎还需要一点时间……`,
    ); // :693
    return 1; // :694
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    // :697
    era.drawLine(); // :698
    await era.printAndWait(`「哈……呼啊……主人……您还……满意吗……？」`); // :699
    await era.printAndWait(
      `${target_name}大口大口的喘着气，皮肤上呈现出淡淡的红晕，因为快感时不时轻轻颤抖着。`,
    ); // :700
    await era.printAndWait(`渐渐的已经习惯了调教了的样子……`); // :701
    return 1; // :702
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // :704
    era.drawLine(); // :705
    await era.printAndWait(`「啊呜……今天的主人……似乎不在状态的说……」`); // :706
    await era.printAndWait(
      `${target_name}含着手指，欲求不满的看着${master_name}。`,
    ); // :707
    await era.printAndWait(`「H的事情……还想做更多呢……」`); // :708
    return 1; // :709
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // :711
    era.drawLine(); // :712
    await era.printAndWait(`「呼啊啊……❤主人……好厉害……❤嗯啊……❤」`); // :713
    await era.printAndWait(`「舒服的……嗯……❤舒服的快要死掉了啦❤」`); // :714
    await era.printAndWait(
      `${target_name}沉浸在完全不属于这个年龄的强烈快感中，小小的身体还是不是因为快感而颤抖着。`,
    ); // :715
    return 1; // :716
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    // :719
    era.drawLine(); // :720
    if (rand_n(2)) {
      // :721
      await era.printAndWait(`「主人……身体不舒服吗……？」`); // :722
      await era.printAndWait(`${target_name}有些担心的看着这边。`); // :723
    } else {
      // :724
      await era.printAndWait(`「主人……您累了吗……？」`); // :725
      await era.printAndWait(`「那样的话……请休息一下吧～」`); // :726
      await era.printAndWait(`之后枕着${target_name}的大腿休息了一段时间。`); // :727
    } // :728
    return 1; // :729
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    // :731
    await era.printAndWait(`「哈呜……主人……呼啊……❤」`); // :732
    await era.printAndWait(
      `${target_name}紧紧的抱着${master_name}，小小的身体时不时因为快感而颤抖着。`,
    ); // :733
    await era.printAndWait(`「诶嘿嘿……和主人做了H的事情呢……」`); // :734
    await era.printAndWait(`「感觉……好开心的说❤」`); // :735
    await era.printAndWait(
      `感受着${master_name}的体温，${target_name}幸福的笑了起来。`,
    ); // :736
    if (rand_n(2) == 0 && chara(target).chara.特别服装类型 == 92) {
      // :737

      await era.printAndWait(
        `依偎在${master_name}怀里的${target_name}，一直在抚摸着手中的戒指。`,
      ); // :739
      await era.printAndWait(`就好像……最珍贵的宝物一样。`); // :740
    } // :741
    return 1; // :742
  } // :743
  return 0; // :744
});

// @kojo_message_com_19 // :750
async function kojo_message_com_19(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :753
    return 0; // :753
  } // :753

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    // :756
    return 0; // :756
  } // :756

  if (game.train.失神) {
    // :759
    return 0; // :759
  } // :759

  if (era.get(`tequip:${target}:89`)) {
    // :762
    return 0; // :762
  } // :762

  if (era.get(`tequip:${target}:90`)) {
    // :765
    return 0; // :765
  } // :765

  if (era.get(`tequip:${target}:55`)) {
    // :767
    return colosseum_kojo_19(); // :768-769 // :769
  } // :770

  if (era.get(`talent:${target}:9`) == 1) {
    // :773
    return 0; // :773
  } // :773

  if (era_flag.selectcom == 0) {
    // :782

    if (chara(target).kojo.爱抚 == 0) {
      // :784

      if (era.get(`mark:${target}:2`) >= 2) {
        // :786
        await era.printAndWait(`「嗯呼……呜……」`); // :787
      } else {
        // :789
        await era.printAndWait(`「呀……在摸哪里呀……」`); // :790
        await era.printAndWait(`「呜……不要……感觉，好奇怪……」`); // :791
      } // :792
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :793
      chara(target).kojo.爱抚 = 1; // :793
      return 0; // :794
    } else {
      // :796

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :798
        await era.printAndWait(`「嗯……主人的手指……❤」`); // :799
        await era.printAndWait(`「还要……更多……❤」`); // :800
        await era.printAndWait(
          `${target_name}主动的迎合着${master_name}的动作，坦率的接受快感。`,
        ); // :801
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :802
        chara(target).kojo.爱抚 = 6; // :802
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :804
        await era.printAndWait(`「嗯……主人……」`); // :805
        await era.printAndWait(`「诶嘿嘿……最喜欢了……❤」`); // :806
        await era.printAndWait(
          `${target_name}充满爱意的看着${master_name}，感受着从身上传来的快感。`,
        ); // :807
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :808
        chara(target).kojo.爱抚 = 5; // :808
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :810
        await era.printAndWait(`「嗯……主人……」`); // :811
        await era.printAndWait(`「呼嗯……啊……」`); // :812
        await era.printAndWait(
          `被抚摸着的${target_name}因为快感而轻轻的喘息着。`,
        ); // :813
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :814
        chara(target).kojo.爱抚 = 4; // :814
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :816
        await era.printAndWait(`「呀……那里……呜……」`); // :817
        await era.printAndWait(`「感觉……好奇怪……」`); // :818
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :819
        chara(target).kojo.爱抚 = 3; // :819
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :821
        await era.printAndWait(`「呀呜呜，在摸哪里呀……」`); // :822
        await era.printAndWait(`「不要啦……好，好痒呜呜～」`); // :823
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :824
        chara(target).kojo.爱抚 = 2; // :824
      } // :825
      return 0; // :826
    } // :827
  } // :828

  if (era_flag.selectcom == 1) {
    // :833

    if (chara(target).kojo.舔阴 == 0) {
      // :835

      if (era.get(`talent:${target}:0`) == 1) {
        // :837
        await era.printAndWait(`「呜呜，那，那里……不，不要舔呜～」`); // :838
        await era.printAndWait(
          `无视${target_name}的话语，${master_name}毫不费力的分开了她的双脚。`,
        ); // :839
        await era.printAndWait(
          `还不知男人为何物的小穴，在空气中轻轻的颤抖着。`,
        ); // :840
      } else {
        // :841
        await era.printAndWait(`「呜呜，那，那里……不，不要舔呜～」`); // :842
        await era.printAndWait(
          `无视${target_name}的话语，${master_name}毫不费力的分开了她的双脚。`,
        ); // :843
      } // :844
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :845
      chara(target).kojo.舔阴 = 1; // :845
      return 0; // :846
    } else {
      // :848

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :850
        await era.printAndWait(`「啊嗯……主人……❤」`); // :851
        await era.printAndWait(`「呼嗯啊～好舒服的说～❤」`); // :852
        await era.printAndWait(
          `${target_name}的两手抱着自己的大腿分开来，将湿漉漉的下半身完全呈献给${master_name}，任由${master_name}的舌头在下半身舔弄着。`,
        ); // :853
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :854
        chara(target).kojo.舔阴 = 5; // :854
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :856
        await era.printAndWait(`「诶……要舔下面什么的……」`); // :857
        await era.printAndWait(`「主人真是的……❤」`); // :858
        await era.printAndWait(
          `${target_name}红着脸看着${master_name}，分开自己的大腿。`,
        ); // :859
        await era.printAndWait(`「请慢用……的说……」`); // :860
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :861
        chara(target).kojo.舔阴 = 4; // :861
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :863
        await era.printAndWait(`「呜……主人……请……温柔一点……」`); // :864
        await era.printAndWait(`「这种事……哈呜……」`); // :865
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :866
        chara(target).kojo.舔阴 = 3; // :866
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :868
        await era.printAndWait(`「不可以……那里是……」`); // :869
        await era.printAndWait(
          `${target_name}有些抗拒的用小手推搡着${master_name}的头。`,
        ); // :870
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :871
        chara(target).kojo.舔阴 = 2; // :871
      } // :872
      return 0; // :873
    } // :874
  } // :875

  if (era_flag.selectcom == 2) {
    // :880

    if (chara(target).kojo.肛门爱抚 == 0) {
      // :882
      await era.printAndWait(`「呼诶，那，那里是……」`); // :883
      await era.printAndWait(`「不行……！后面……不行……！」`); // :884
      await era.printAndWait(`意外的受到了稍微激烈一点的抵抗。`); // :885
      await era.printAndWait(
        `不过终归只是个小孩子罢了，这点抵抗完全没有起到任何作用。`,
      ); // :886
      // CFLAG:303  = 1（变量语义：CFLAG 族，303） // :887
      chara(target).kojo.肛门爱抚 = 1; // :887
      return 0; // :888
    } else {
      // :890
      const p = era0(`palam:${target}:3`) + era0(`delta:${target}:3`); // :891

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :893
        await era.printAndWait(`「嗯哈……❤主人的手指……在里面呢……❤」`); // :894
        await era.printAndWait(`「主人……再多玩弄一下${sc()}的后面吧……❤」`); // :895
        await era.printAndWait(
          `${target_name}主动的迎合着${master_name}的动作，透明的液体沿着${master_name}的手指滴下来。`,
        ); // :896
        // CFLAG:303  = 9（变量语义：CFLAG 族，303） // :897
        chara(target).kojo.肛门爱抚 = 9; // :897
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :899
        await era.printAndWait(`「主人……呼嗯……❤」`); // :900
        await era.printAndWait(`「还想要……更多呢……❤」`); // :901
        await era.printAndWait(
          `柔软的肠壁不停的蠕动着，紧紧的吸着${master_name}的手指不放。`,
        ); // :902
        // CFLAG:303  = 8（变量语义：CFLAG 族，303） // :903
        chara(target).kojo.肛门爱抚 = 8; // :903
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :905
        await era.printAndWait(`「呀，主人，真是粗暴呢……❤」`); // :906
        await era.printAndWait(`「但是，这样也……很舒服哟❤」`); // :907
        await era.printAndWait(
          `虽然有些缺少润滑，但是感受到快感的肠壁却仍然积极的回应着。`,
        ); // :908
        await era.printAndWait(`……就是这样的体质吧……？`); // :909
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :910
        chara(target).kojo.肛门爱抚 = 7; // :910
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :912
        await era.printAndWait(`「哈呜……后面……好舒服……呜呀……❤」`); // :913
        await era.printAndWait(`「呜呜，不行～感觉，要，要变得奇怪了啦～❤」`); // :914
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :915
        chara(target).kojo.肛门爱抚 = 6; // :915
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :917
        await era.printAndWait(`「呼啊……主人……嗯……」`); // :918
        await era.printAndWait(`「后面……很舒服的说……」`); // :919
        await era.printAndWait(
          `柔软的肠壁不停的蠕动着，紧紧的吸着${master_name}的手指不放。`,
        ); // :920
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :921
        chara(target).kojo.肛门爱抚 = 5; // :921
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :923
        await era.printAndWait(`「呜……主人……请，请温柔一点的说……」`); // :924
        await era.printAndWait(`「稍微……有点……难受……」`); // :925
        await era.printAndWait(
          `虽然有些缺少润滑，但是感受到快感的肠壁却仍然积极的回应着。`,
        ); // :926
        await era.printAndWait(`……就是这样的体质吧……？`); // :927
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :928
        chara(target).kojo.肛门爱抚 = 4; // :928
      } else if (
        p >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :930
        await era.printAndWait(`「呜……虽然很害羞……」`); // :931
        await era.printAndWait(`「可是……好舒服呜……」`); // :932
        await era.printAndWait(
          `感受着从屁股传来的异样的快感，${target_name}忍不住动起腰迎合起手指来……`,
        ); // :933
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :934
        chara(target).kojo.肛门爱抚 = 3; // :934
      } else if (chara(target).kojo.肛门爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :936
        await era.printAndWait(`「呜……不要……感觉……好难受……」`); // :937
        await era.printAndWait(
          `感受着屁股传来的异样的感觉，${target_name}带着哭腔轻轻哀求着。`,
        ); // :938
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :939
        chara(target).kojo.肛门爱抚 = 2; // :939
      } // :940
      return 0; // :941
    } // :942
  } // :943

  if (era_flag.selectcom == 3) {
    // :948

    if (chara(target).kojo.自慰 == 0) {
      // :950
      await era.printAndWait(`「呜……？自……慰……？」`); // :951
      await era.printAndWait(`「……诶诶？！自己做那种事？！」`); // :952
      await era.printAndWait(`……对这些事情真的是完全不明白的样子。`); // :953
      // CFLAG:304  = 1（变量语义：CFLAG 族，304） // :954
      chara(target).kojo.自慰 = 1; // :954
      return 0; // :955
    } else {
      // :957

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :959
        await era.printAndWait(`「呼啊啊……H的事情……好舒服呢……❤」`); // :960
        await era.printAndWait(`「呐呐，主人，再来做更多H的事情嘛～❤」`); // :961
        await era.printAndWait(
          `「诶嘿嘿，${sc()}知道的哟，进到肚子里面的话，会更加舒服的吧～❤」`,
        ); // :962
        await era.printAndWait(
          `${target_name}纤细的手指分开湿漉漉的幼穴，中指还在不断的磨蹭着阴蒂。`,
        ); // :963
        await era.printAndWait(
          `从不断流出爱液的小穴中，隐约可以看见粉嫩的处女膜。`,
        ); // :964
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :965
        chara(target).kojo.自慰 = 9; // :965
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :967

        if (rand_n(2) == 0) {
          // :969
          await era.printAndWait(`「呼啊……摩擦小豆豆的话……就会……很舒服呢……❤」`); // :970
          await era.printAndWait(`「诶嘿嘿，都是主人教给我的哟❤」`); // :971
          await era.printAndWait(
            `${target_name}的手指在下半身摩擦着，隐约的传来了淫靡的水声。`,
          ); // :972
        } else {
          // :973
          await era.printAndWait(`「呼啊……❤嗯……❤哈……❤」`); // :974
          await era.printAndWait(
            `${target_name}含着手指，另一只手在幼穴上不停摩擦着，透明的爱液沿着白嫩的大腿流下来。`,
          ); // :975
          await era.printAndWait(`「H的事情……喜欢……最喜欢了……❤」`); // :976
        } // :977
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :978
        chara(target).kojo.自慰 = 8; // :978
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :980
        await era.printAndWait(`「嗯哈……主人……」`); // :981
        await era.printAndWait(`「是……这样吗……」`); // :982
        await era.printAndWait(
          `${target_name}纤细的手指分开湿漉漉的幼穴，中指还在不断的磨蹭着阴蒂。`,
        ); // :983
        await era.printAndWait(
          `从不断流出爱液的小穴中，隐约可以看见粉嫩的处女膜。`,
        ); // :984
        await era.printAndWait(
          `「呐呐……主人……H的事情……更进一步也没问题的哟……」`,
        ); // :985
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :986
        chara(target).kojo.自慰 = 6; // :986
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :988

        if (rand_n(2) == 0) {
          // :990
          await era.printAndWait(`「呼啊……主人……❤」`); // :991
          await era.printAndWait(
            `想象着自己的手指是${master_name}的${target_name}，满脸痴态的玩弄着自己的身体。`,
          ); // :992
          await era.printAndWait(`「主人……嗯……最喜欢你了……❤」`); // :993
        } else {
          // :994
          await era.printAndWait(`「虽说是因为主人的命令……」`); // :995
          await era.printAndWait(`「但是小豆豆……好舒服……❤」`); // :996
          await era.printAndWait(
            `${target_name}摇动着纤细的腰部，摩擦着自己幼小的下半身。`,
          ); // :997
        } // :998
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :999
        chara(target).kojo.自慰 = 5; // :999
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :1001

        if (rand_n(2) == 0) {
          // :1003
          await era.printAndWait(`「呼诶，自己……H？」`); // :1004
          await era.printAndWait(`「呜呜……主人……真是的……」`); // :1005
          await era.printAndWait(
            `${target_name}有些害羞的在${master_name}面前玩弄着自己尚未发育成熟的身体。`,
          ); // :1006
        } else {
          // :1007
          await era.printAndWait(`「呜呜……不，不要看啦……」`); // :1008
          await era.printAndWait(
            `${target_name}眼角挂着泪珠，在${master_name}的命令下玩弄着自己的身体。`,
          ); // :1009
        } // :1010
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :1011
        chara(target).kojo.自慰 = 3; // :1011
      } else if (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :1013

        if (rand_n(2) == 0) {
          // :1015
          await era.printAndWait(`「呜……讨厌……呜……」`); // :1016
          await era.printAndWait(
            `${target_name}轻轻抽泣着，因害怕${master_name}的淫威而不得不照做，`,
          ); // :1017
        } else {
          // :1018
          await era.printAndWait(`「哈呜……感觉……手指好酸哦……」`); // :1019
        } // :1020
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :1021
        chara(target).kojo.自慰 = 2; // :1021
      } // :1022
      return 0; // :1023
    } // :1024
  } // :1025

  if (era_flag.selectcom == 5) {
    // :1030

    if (chara(target).kojo.胸爱抚 == 0) {
      // :1032
      if (
        era.get(`talent:${target}:85`) == 1 ||
        era.get(`talent:${target}:76`) == 1
      ) {
        // :1033
        await era.printAndWait(`「呀呜……主人……好，好痒啊……」`); // :1034
        await era.printAndWait(
          `感受着柔软而小巧的胸部，${master_name}坏笑着加大了动作的力度……`,
        ); // :1035
      } else {
        // :1037
        await era.printAndWait(`「为，为什么要摸这种地方……」`); // :1038
        await era.printAndWait(`「呀呜……感觉……好奇怪……」`); // :1039
      } // :1040
      // CFLAG:306  = 1（变量语义：CFLAG 族，306） // :1041
      chara(target).kojo.胸爱抚 = 1; // :1041
      return 0; // :1042
    } else {
      // :1044

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1046
        await era.printAndWait(`「嗯哈……呀……❤」`); // :1047
        await era.printAndWait(`「主人……好舒服……❤」`); // :1048
        await era.printAndWait(
          `${target_name}靠在${master_name}怀里轻轻的喘息着，皮肤微微泛着潮红。`,
        ); // :1049
        await era.printAndWait(
          `${master_name}的手掌轻易的包住了几乎毫无起伏的小小胸部，手指不断蹂躏着因为快感而硬起来的小草莓。`,
        ); // :1050
        if (era.get(`talent:${target}:130`)) {
          // :1051
          await era.printAndWait(
            `在不断的快感刺激下，乳头尖端缓缓分泌出乳汁来。`,
          ); // :1052
          await era.printAndWait(`「诶嘿嘿，${sc()}也有牛奶给主人喝呢❤」`); // :1053
        } // :1054
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1055
        chara(target).kojo.胸爱抚 = 5; // :1055
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1057
        await era.printAndWait(`「哈呜呜……玩弄胸部什么的……主人会开心吗？」`); // :1058
        await era.printAndWait(
          `「虽然${sc()}的胸部很小……但是主人喜欢的话，不管多少次都可以……」`,
        ); // :1059
        await era.printAndWait(
          `${target_name}靠在${master_name}怀里轻轻的喘息着，皮肤微微泛着潮红。`,
        ); // :1060
        await era.printAndWait(
          `${master_name}的手掌轻易的包住了几乎毫无起伏的小小胸部，手指不断蹂躏着因为快感而硬起来的小草莓。`,
        ); // :1061
        if (era.get(`talent:${target}:130`)) {
          // :1062
          await era.printAndWait(
            `在不断的快感刺激下，乳头尖端缓缓分泌出乳汁来。`,
          ); // :1063
          await era.printAndWait(`「呜……感觉好害羞哦……」`); // :1064
        } // :1065
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1066
        chara(target).kojo.胸爱抚 = 4; // :1066
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1068
        await era.printAndWait(`「呀，胸部什么的……呜呜……」`); // :1069
        await era.printAndWait(`「不，不要……感觉……好奇怪呜……」`); // :1070
        await era.printAndWait(
          `感受着胸部传来的快感，${target_name}的身体微微的颤抖着。`,
        ); // :1071
        await era.printAndWait(
          `虽然嘴上说着不要，但是感受的快感的乳头已经诚实的硬了起来。`,
        ); // :1072
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1073
        chara(target).kojo.胸爱抚 = 3; // :1073
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :1075
        await era.printAndWait(`「呀呜……不，不要……讨厌……」`); // :1076
        await era.printAndWait(
          `${target_name}在${master_name}的怀里挣扎着，不过这只是徒劳的让揉捏的力度增大罢了。`,
        ); // :1077
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1078
        chara(target).kojo.胸爱抚 = 2; // :1078
      } // :1079
      return 0; // :1080
    } // :1081
  } // :1082

  if (era_flag.selectcom == 6) {
    // :1087

    if (chara(target).kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :1089

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        // :1091
        await era.printAndWait(`「嗯啾……嗯……哈……」`); // :1092
        await era.printAndWait(
          `${target_name}和${master_name}的嘴唇重叠在一起，舌头相互纠缠着，唾液不断的滴落下来。`,
        ); // :1093
        await era.printAndWait(`「哈……啾嗯……kiss什么的……好舒服……❤」`); // :1094
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`); // :1095
        await era.printAndWait(`「嘴巴……原来可以这么舒服……❤」`); // :1096
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        // :1098
        await era.printAndWait(`「嗯啾……呼……哈呜……」`); // :1099
        await era.printAndWait(
          `尽管最初有些不适应，但${target_name}很快就将身体完全的交给了${master_name}，任由对方的舌头在自己嘴里动着。`,
        ); // :1100
        await era.printAndWait(`「嗯……主人……啾嗯……」`); // :1101
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`); // :1102
        await era.printAndWait(`「主人……${sc()}现在……很幸福的说……❤」`); // :1103
      } else {
        // :1105
        await era.printAndWait(`「呜……不要……哈……呜……！」`); // :1106
        await era.printAndWait(
          `无法对抗${master_name}力量的${target_name}被强行的夺走了初吻。`,
        ); // :1107
      } // :1108
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1109
      chara(target).kojo.接吻 = 1; // :1109
      return 0; // :1110
    } else if (chara(target).kojo.接吻 == 0) {
      // :1112

      if (era.get(`talent:${target}:76`) == 1) {
        // :1114
        await era.printAndWait(`「嗯啾……嗯……哈……」`); // :1115
        await era.printAndWait(
          `${target_name}和${master_name}的嘴唇重叠在一起，舌头相互纠缠着，唾液不断的滴落下来。`,
        ); // :1116
        await era.printAndWait(`「哈……啾嗯……kiss什么的……好舒服……❤」`); // :1117
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`); // :1118
        await era.printAndWait(`「呼啊……主人……kiss……还要……❤」`); // :1119
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1121
        await era.printAndWait(`「嗯啾……呼……哈呜……」`); // :1122
        await era.printAndWait(
          `尽管最初有些不适应，但${target_name}很快就将身体完全的交给了${master_name}，任由对方的舌头在自己嘴里动着。`,
        ); // :1123
        await era.printAndWait(`「嗯……主人……啾嗯……」`); // :1124
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`); // :1125
        await era.printAndWait(`「主人……最喜欢你了……❤」`); // :1126
      } else {
        // :1128
        await era.printAndWait(`「呜……不要……哈……呜……！」`); // :1129
        await era.printAndWait(
          `无法对抗${master_name}力量的${target_name}被舌头强行的撬开了嘴巴。`,
        ); // :1130
      } // :1131
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1132
      chara(target).kojo.接吻 = 1; // :1132
      return 0; // :1133
    } else {
      // :1135

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1137
        await era.printAndWait(`「嗯……❤啾……❤嗯哈……❤」`); // :1138
        await era.printAndWait(
          `${target_name}仰着头，小小的舌头贪图着快感，和${master_name}的舌头纠缠在一起。`,
        ); // :1139
        await era.printAndWait(`「哈……啾嗯……kiss……最喜欢了……❤」`); // :1140
        await era.printAndWait(`「主人的kiss……好舒服……❤」`); // :1141
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :1142
        chara(target).kojo.接吻 = 5; // :1142
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1144
        await era.printAndWait(`「嗯……啾……和主人……接吻了呢……❤」`); // :1145
        await era.printAndWait(
          `${master_name}捧着${target_name}的小脸，肆意的享受着柔软的小嘴和舌头。`,
        ); // :1146
        await era.printAndWait(`「嗯哈……总感觉……脑子里一片空白呢……❤」`); // :1147
        await era.printAndWait(
          `沉醉在和${master_name}接吻的快感中的${target_name}，望过来的眼神中满溢着幸福。`,
        ); // :1148
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :1149
        chara(target).kojo.接吻 = 4; // :1149
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1151
        await era.printAndWait(`「kiss……吗……」`); // :1152
        await era.printAndWait(
          `${target_name}认命的闭上眼睛，有些害怕的等待着${master_name}接下来的动作。`,
        ); // :1153
        await era.printAndWait(`「嗯……啾……呜……」`); // :1154
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :1155
        chara(target).kojo.接吻 = 3; // :1155
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :1157
        await era.printAndWait(`「呜……啾……嗯呜……」`); // :1158
        await era.printAndWait(
          `被${master_name}捏住脸颊强吻的${target_name}眼角挂着泪珠，默默的承受着侵入到小嘴里的舌头。`,
        ); // :1159
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :1160
        chara(target).kojo.接吻 = 2; // :1160
      } // :1161
      return 0; // :1162
    } // :1163
  } // :1164

  if (era_flag.selectcom == 7) {
    // :1169

    if (chara(target).kojo.自己扒开 == 0) {
      // :1171

      if (era.get(`talent:${target}:76`) == 1) {
        // :1173
        await era.printAndWait(`「诶嘿嘿……小穴里面……主人也要看吗❤」`); // :1174
        await era.printAndWait(
          `${target_name}微微的喘着气，用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        ); // :1175
        if (era.get(`talent:${target}:0`) == 1) {
          // :1176
          await era.printAndWait(`在小穴里还能看见薄薄的处女膜。`); // :1177
          await era.printAndWait(`「主人……快点……把${sc()}的第一次拿走吧❤」`); // :1178
        } // :1179
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1181
        await era.printAndWait(`「呜……让主人看里面什么的……好害羞……」`); // :1182
        await era.printAndWait(`「但是……是主人的话……」`); // :1183
        await era.printAndWait(
          `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        ); // :1184
        if (era.get(`talent:${target}:0`) == 1) {
          // :1185
          await era.printAndWait(`在小穴里还能看见薄薄的处女膜。`); // :1186
          await era.printAndWait(`「主人……那个……第一次……还请……」`); // :1187
        } // :1188
      } else {
        // :1190
        await era.printAndWait(`「呜呜……讨……讨厌……」`); // :1191
        await era.printAndWait(
          `${target_name}的泪水在眼睛里打转转，不情愿的微微分开了小穴。`,
        ); // :1192
      } // :1193
      // CFLAG:308  = 1（变量语义：CFLAG 族，308） // :1194
      chara(target).kojo.自己扒开 = 1; // :1194
      return 0; // :1195
    } else {
      // :1197

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1199
        await era.printAndWait(`「诶嘿嘿……小穴……想要主人的肉棒呢……❤」`); // :1200
        await era.printAndWait(
          `虽说是命令，但是${target_name}积极的分开小穴，主动诱惑着${master_name}。`,
        ); // :1201
        if (era.get(`talent:${target}:0`) == 1) {
          // :1203
          await era.printAndWait(
            `「就这样子……把肉棒从这里……咕啾咕啾的插进去吧❤」`,
          ); // :1203
        } // :1203
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1204
        chara(target).kojo.胸爱抚 = 5; // :1204
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1206
        await era.printAndWait(`「自己分开什么的……呜……好羞耻……」`); // :1207
        await era.printAndWait(`「但是……对象是主人的话……」`); // :1208
        await era.printAndWait(
          `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        ); // :1209
        if (era.get(`talent:${target}:0`) == 1) {
          // :1210
          await era.printAndWait(`在小穴里还能看见薄薄的处女膜。`); // :1211
          await era.printAndWait(`「是主人的话……就没问题……」`); // :1212
        } // :1213
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1214
        chara(target).kojo.胸爱抚 = 4; // :1214
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (chara(target).kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1216
        await era.printAndWait(`「这种事情……主人……真是H……」`); // :1217
        await era.printAndWait(`「但是……被人看着这里什么的……不讨厌呢……」`); // :1218
        await era.printAndWait(
          `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        ); // :1219
        await era.printAndWait(`小穴微微的颤抖着，流出少许透明的爱液……`); // :1220
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1221
        chara(target).kojo.胸爱抚 = 3; // :1221
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :1223
        await era.printAndWait(`「呜呜……讨厌……不要看……」`); // :1224
        await era.printAndWait(
          `${target_name}轻轻抽泣着，不情愿的微微分开了小穴。`,
        ); // :1225
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1226
        chara(target).kojo.胸爱抚 = 2; // :1226
      } // :1227
      return 0; // :1228
    } // :1229
  } // :1230

  if (era_flag.selectcom == 8) {
    // :1235

    if (chara(target).kojo.插入手指 == 0) {
      // :1237

      if (era.get(`talent:${target}:76`) == 1) {
        // :1239
        await era.printAndWait(`「主人的手指……嗯……❤嗯呀……❤好舒服……❤」`); // :1240
        await era.printAndWait(
          `柔软的壁肉紧紧的包裹着手指，在刺激下不断的紧缩着。`,
        ); // :1241
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1243
        await era.printAndWait(`「主人的手指……在里面……呜……❤」`); // :1244
        await era.printAndWait(
          `柔软的壁肉紧紧的包裹着手指，在刺激下不断的紧缩着。`,
        ); // :1245
      } else {
        // :1247
        await era.printAndWait(`「呜呜……手指……进……进到身体里面了……？！」`); // :1248
        await era.printAndWait(`「不要……讨，讨厌……！」`); // :1249
      } // :1250
      // CFLAG:309  = 1（变量语义：CFLAG 族，309） // :1251
      chara(target).kojo.插入手指 = 1; // :1251
      return 0; // :1252
    } else {
      // :1254

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1256
        await era.printAndWait(`「哈啊……主人的手指……好舒服……❤」`); // :1257
        await era.printAndWait(`「还想要……更多一点……❤」`); // :1258
        await era.printAndWait(
          `${target_name}积极的摇动着纤细的腰部，贪图着快感。`,
        ); // :1259
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :1260
        chara(target).kojo.插入手指 = 5; // :1260
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1261
        await era.printAndWait(`「呜……嗯哈……呀……❤」`); // :1262
        await era.printAndWait(`「主人的……手指……嗯呼……」`); // :1263
        await era.printAndWait(
          `${target_name}感受着${master_name}手指带来的快感，不时的漏出H的声音。`,
        ); // :1264
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :1265
        chara(target).kojo.插入手指 = 4; // :1265
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1267
        await era.printAndWait(
          `「呜呜……我，我会乖乖的……主人……轻一点……嗯呀！」`,
        ); // :1268
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :1269
        chara(target).kojo.插入手指 = 3; // :1269
      } else if (chara(target).kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        // :1271
        await era.printAndWait(`「不要……好难受……把手指拿出去……求求你……」`); // :1272
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :1273
        chara(target).kojo.插入手指 = 2; // :1273
      } // :1274
      return 0; // :1275
    } // :1276
  } // :1277

  if (era_flag.selectcom == 9) {
    // :1282

    if (chara(target).kojo.舔肛 == 0) {
      // :1284

      if (era.get(`talent:${target}:76`) == 1) {
        // :1286
        await era.printAndWait(`「嗯啊啊……❤那里是……嗯呀～❤」`); // :1287
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1289
        await era.printAndWait(`「呜呜……那里……很脏的……不可以舔～」`); // :1290
      } else {
        // :1292
        await era.printAndWait(`「讨厌，为什么要舔那种地方……不，不要……！」`); // :1293
      } // :1294
      // CFLAG:310  = 1（变量语义：CFLAG 族，310） // :1295
      chara(target).kojo.舔肛 = 1; // :1295
      return 0; // :1296
    } else {
      // :1298

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.舔肛 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1300
        await era.printAndWait(
          `「嗯啊啊……❤呜呀……❤呼啊啊，好舒服，好舒服嗯呜～❤」`,
        ); // :1301
        await era.printAndWait(
          `感受着从屁股传来的异常强烈的快感，${target_name}张着嘴大口的喘着气，呼出女孩子甘甜的气息。`,
        ); // :1302
        await era.printAndWait(
          `${master_name}的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。`,
        ); // :1303
        // CFLAG:310  = 7（变量语义：CFLAG 族，310） // :1304
        chara(target).kojo.舔肛 = 7; // :1304
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1306
        await era.printAndWait(`「主人的舌头……在屁股里面……嗯啊❤」`); // :1307
        await era.printAndWait(`「屁股……好，好舒服呜❤」`); // :1308
        await era.printAndWait(
          `感受着从屁股传来的快感，${target_name}发出了稚嫩而色气的喘息声。`,
        ); // :1309
        await era.printAndWait(
          `${master_name}的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。`,
        ); // :1310
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :1311
        chara(target).kojo.舔肛 = 6; // :1311
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1313
        await era.printAndWait(`「嗯呜……❤主人……哈啊……主人的舌头……嗯啊啊……❤」`); // :1314
        await era.printAndWait(`「那里……嗯……屁股……好，好舒服……❤」`); // :1315
        await era.printAndWait(
          `感受着从屁股传来的异常强烈的快感，${target_name}张着嘴大口的喘着气，呼出女孩子甘甜的气息。`,
        ); // :1316
        await era.printAndWait(
          `${master_name}的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。`,
        ); // :1317
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :1318
        chara(target).kojo.舔肛 = 5; // :1318
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1320
        await era.printAndWait(`「呜呜……主人的舌头……在屁股里……好害羞……」`); // :1321
        await era.printAndWait(`「但是……如果是主人的话……」`); // :1322
        await era.printAndWait(
          `${target_name}轻轻的咬着手指，感受着${master_name}的舌头，时不时轻轻颤抖着。`,
        ); // :1323
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :1324
        chara(target).kojo.舔肛 = 4; // :1324
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1326
        await era.printAndWait(`「呜呜……主人这个变……呜……什，什么都……没有……」`); // :1327
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :1328
        chara(target).kojo.舔肛 = 3; // :1328
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :1330
        await era.printAndWait(`「讨厌……变态……不要嗯嗯……」`); // :1331
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :1332
        chara(target).kojo.舔肛 = 2; // :1332
      } // :1333
      return 0; // :1334
    } // :1335
  } // :1336

  if (era_flag.selectcom == 10) {
    // :1341

    if (chara(target).kojo.振动宝石 == 0) {
      // :1343

      if (era.get(`talent:${target}:76`) == 1) {
        // :1345
        await era.printAndWait(`「呼嗯……这个是……什么……好……舒服……❤」`); // :1346
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1348
        await era.printAndWait(`「呼呜呜……这个……呜……动的好厉害……嗯呀……❤」`); // :1349
      } else {
        // :1351
        await era.printAndWait(
          `「呜呜？！这，这是什么……动的好厉害……呀……感觉……好奇怪……不要……！」`,
        ); // :1352
      } // :1353
      // CFLAG:311  = 1（变量语义：CFLAG 族，311） // :1354
      chara(target).kojo.振动宝石 = 1; // :1354
      return 0; // :1355
    } else {
      // :1357

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1359
        await era.printAndWait(
          `「哈啊……❤这个宝石……不停的在动呢❤那里……好舒服❤」`,
        ); // :1360
        await era.printAndWait(
          `${target_name}扶着${master_name}的身体，以自己的身体压在宝石上，贪图着快感。`,
        ); // :1361
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1362
        chara(target).kojo.振动宝石 = 5; // :1362
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1364
        await era.printAndWait(`「呜……这个……好刺激……嗯呜……主人……稍微……嗯呀❤」`); // :1365
        await era.printAndWait(
          `在快感的刺激下${target_name}露出了有些恍惚的神情。`,
        ); // :1366
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1367
        chara(target).kojo.振动宝石 = 4; // :1367
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1369
        await era.printAndWait(`「呼啊……嗯……呀……啊呜……」`); // :1370
        await era.printAndWait(
          `${target_name}小小的身体不停的颤抖着，拼命忍受着快感。`,
        ); // :1371
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1372
        chara(target).kojo.振动宝石 = 3; // :1372
      } else if (chara(target).kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        // :1374
        await era.printAndWait(`「咿呀……什么……这是……」`); // :1375
        await era.printAndWait(
          `感受着陌生快感的幼小身体本能的抗拒着${master_name}的动作。`,
        ); // :1376
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1377
        chara(target).kojo.振动宝石 = 2; // :1377
      } // :1378
      return 0; // :1379
    } // :1380
  } // :1381

  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) {
    // :1387

    if (chara(target).kojo.壶虫 == 0) {
      // :1389

      if (era.get(`talent:${target}:0`) == 1) {
        // :1391

        if (era.get(`talent:${target}:76`) == 1) {
          // :1393
          await era.printAndWait(
            `「虽然第一次不是主人有些可惜，但是虫子的话，应该也会很舒服的吧❤」`,
          ); // :1394
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1396
          await era.printAndWait(
            `「呜呜……如，如果这是主人希望的话……${sc()}……就算是虫子也……没问题的……」`,
          ); // :1397
        } else {
          // :1399
          await era.printAndWait(
            `「不要……不要不要不要啊……！虫子什么的……好可怕……好可怕……！」`,
          ); // :1400
          await era.printAndWait(
            `蠕虫不顾哀求，粗暴的贯穿了薄薄的处女膜，象征着处女的鲜血从缝隙中流出……`,
          ); // :1401
        } // :1402
      } else {
        // :1404

        if (era.get(`talent:${target}:76`) == 1) {
          // :1406
          await era.printAndWait(
            `「啊哈❤肚子里面，要被虫子桑弄得乱七八糟了呢❤」`,
          ); // :1407
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1409
          await era.printAndWait(
            `「要被这种东西……进到肚子里面去吗……虽然很可怕……但是……」`,
          ); // :1410
          await era.printAndWait(`${target_name}的眼里，隐约的有一股期待。`); // :1411
        } else {
          // :1413
          await era.printAndWait(
            `「讨厌……要被这种东西……钻到肚子里面……不要……」`,
          ); // :1414
          await era.printAndWait(`蠕虫粗暴的贯穿了幼穴，撑开了窄小的肉壁。`); // :1415
        } // :1416
      } // :1417
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1418
      chara(target).kojo.壶虫 = 1; // :1418
      return 0; // :1419
    } else {
      // :1421

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1423
        await era.printAndWait(
          `「嗯呀❤肚子里面……被虫子桑这样子玩弄……嗯哈❤要变得……奇怪了啦❤」`,
        ); // :1424
        await era.printAndWait(
          `${target_name}的脸上露出了和年龄完全不符的淫乱的表情，率直的接受着蠕虫带来的巨大快感。`,
        ); // :1425
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1426
        chara(target).kojo.壶虫 = 5; // :1426
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1428
        await era.printAndWait(`「呜呀……嗯……肚子里面……呜……要，要坏掉了啦～❤」`); // :1429
        await era.printAndWait(
          `蠕虫在稚嫩的腔穴中不断蠕动着，仿佛要将它捅穿一般。`,
        ); // :1430
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1431
        chara(target).kojo.壶虫 = 4; // :1431
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1433
        await era.printAndWait(
          `「呜……明明是……这种东西……但是……感觉……呜……不坏的样子……」`,
        ); // :1434
        await era.printAndWait(
          `${target_name}咬着手指忍耐着，时不时漏出满载着色气的娇喘声。`,
        ); // :1435
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1436
        chara(target).kojo.壶虫 = 3; // :1436
      } else if (chara(target).kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1438
        await era.printAndWait(`「呼啊……呼啊……肚……肚子里面……好难受……」`); // :1439
        await era.printAndWait(
          `${target_name}大口的喘着气，拼命的忍受着肚子里的异物。`,
        ); // :1440
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1441
        chara(target).kojo.壶虫 = 2; // :1441
      } // :1442
      return 0; // :1443
    } // :1444
  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) {
    // :1446

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1448
      await era.printAndWait(`「呼……啊哈……这样就可以了吗？」`); // :1449
      await era.printAndWait(`「接下来就是主人的肉棒了吗❤」`); // :1450
      await era.printAndWait(
        `${target_name}期待的看着${master_name}，不知是爱液还是什么的透明液体沿着小穴滴落，和地面连成一条细长的银线。`,
      ); // :1451
      // CFLAG:372  = 4（变量语义：CFLAG 族，372） // :1452
      chara(target).kojo.壶虫着脱 = 4; // :1452
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1454
      await era.printAndWait(`「呼……呼……已经……结束了吗……？」`); // :1455
      await era.printAndWait(`「虽然……那个……并不讨厌……但是……」`); // :1456
      await era.printAndWait(`「果然还是主人的……」`); // :1457
      await era.printAndWait(`${target_name}满怀着爱意的看着${master_name}。`); // :1458
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1459
      chara(target).kojo.壶虫着脱 = 3; // :1459
    } else if (
      era.get(`abl:${target}:2`) >= 3 &&
      (chara(target).kojo.壶虫着脱 <= 2 || game.kojo.口上开关 == 2)
    ) {
      // :1461
      await era.printAndWait(`「哈啊……哈……结束……了吗……」`); // :1462
      await era.printAndWait(
        `${target_name}有些失神的看着拔出来的蠕虫，小穴微微的开合着，似乎在期待接下来的东西。`,
      ); // :1463
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1464
      chara(target).kojo.壶虫着脱 = 2; // :1464
    } else if (chara(target).kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1466
      await era.printAndWait(`「啊呜呜……终于……结束了……吗……」`); // :1467
      await era.printAndWait(
        `${target_name}轻轻的抽泣着，眼泪顺着脸颊流下来。`,
      ); // :1468
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1469
      chara(target).kojo.壶虫着脱 = 1; // :1469
    } // :1470
    return 0; // :1471
  } // :1472

  if (era_flag.selectcom == 12) {
    // :1477

    if (chara(target).kojo.振动杖 == 0) {
      // :1479

      if (era.get(`talent:${target}:76`) == 1) {
        // :1481
        await era.printAndWait(`「哈啊……❤这个……在动个不停……好厉害……❤」`); // :1482
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1484
        await era.printAndWait(`「呜嗯……那里……被这个刺激着……感觉……嗯呀……❤」`); // :1485
      } else {
        // :1487
        await era.printAndWait(`「呀……讨厌……感觉……好奇怪……」`); // :1488
      } // :1489
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1490
      chara(target).kojo.振动杖 = 1; // :1490
      return 0; // :1491
    } else {
      // :1493

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1495
        await era.printAndWait(`「呀～❤在那里……这样子动的话……❤」`); // :1496
        await era.printAndWait(`「嗯呀～❤这个……好厉害呜～❤」`); // :1497
        await era.printAndWait(
          `${target_name}彻底沉醉在快感中，爱液不断的沿着大腿流下来。`,
        ); // :1498
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1499
        chara(target).kojo.振动杖 = 5; // :1499
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1501
        await era.printAndWait(`「咿呀……那里……被这个压着……感觉……呜……❤」`); // :1502
        await era.printAndWait(
          `在快感的刺激下${target_name}露出了有些恍惚的神情。`,
        ); // :1503
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1504
        chara(target).kojo.振动杖 = 4; // :1504
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1506
        await era.printAndWait(
          `「呜呜……被这种东西弄……舒服什么的……才……没有……嗯……」`,
        ); // :1507
        await era.printAndWait(`${target_name}咬着牙，努力的忍受着快感。`); // :1508
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1509
        chara(target).kojo.振动杖 = 3; // :1509
      } else if (chara(target).kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        // :1511
        await era.printAndWait(`「呀……这种东西……呜……不要……！」`); // :1512
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1513
        chara(target).kojo.振动杖 = 2; // :1513
      } // :1514
      return 0; // :1515
    } // :1516
  } // :1517

  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) {
    // :1523

    if (chara(target).kojo.肛门虫 == 0) {
      // :1525

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1
      ) {
        // :1527
        await era.printAndWait(
          `「啊哈……❤后面要被虫子桑弄得乱七八糟了呢，诶嘿嘿，好期待的说❤」`,
        ); // :1528
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :1530
        await era.printAndWait(
          `「屁股那里……也会被弄的很舒服吗？舒服的事情的话，最喜欢了❤」`,
        ); // :1531
      } else if (era.get(`talent:${target}:77`) == 1) {
        // :1533
        await era.printAndWait(
          `「呼啊……虽然……虫子什么的……感觉有点可怕……但是如果要把屁股弄的很舒服的话……」`,
        ); // :1534
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1536
        await era.printAndWait(`「主人想的话……${sc()}也……愿意哟……」`); // :1537
      } else {
        // :1539
        if (era.get(`abl:${target}:3`) >= 3) {
          // :1540
          await era.printAndWait(`「不要……好可怕……屁股会坏掉的……」`); // :1541
          await era.printAndWait(
            `虽然这么哀求着，幼小的菊穴却很简单的吞纳了粗大的蠕虫……`,
          ); // :1542
        } else {
          // :1543
          await era.printAndWait(`「不要……好可怕……屁股会坏掉的……」`); // :1544
          await era.printAndWait(
            `不顾哀求和肉壁的抵抗，蠕虫强硬的插入了紧窄的雏菊中……`,
          ); // :1545
        } // :1546
      } // :1547
      // CFLAG:314  = 1（变量语义：CFLAG 族，314） // :1548
      chara(target).kojo.肛门虫 = 1; // :1548
      return 0; // :1549
    } else {
      // :1551

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛门虫 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :1553
        await era.printAndWait(
          `「嗯呀～❤屁股，舒服的……嗯呼❤舒服的要……死掉了啦❤」`,
        ); // :1554
        await era.printAndWait(`「虫子桑，再……激烈一些……也……可以的呐❤」`); // :1555
        await era.printAndWait(
          `沉溺在快感中的${target_name}扭动着纤细的腰部，一次又一次的迎合着蠕虫的动作。`,
        ); // :1556
        // CFLAG:314  = 9（变量语义：CFLAG 族，314） // :1557
        chara(target).kojo.肛门虫 = 9; // :1557
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :1559
        await era.printAndWait(`「哈啊❤屁股被虫子桑侵犯什么的……感觉不坏呢❤」`); // :1560
        await era.printAndWait(`「好舒服……呼啊……❤」`); // :1561
        await era.printAndWait(
          `被蠕虫侵犯着的${target_name}，直率的接受着快感。`,
        ); // :1562
        // CFLAG:314  = 8（变量语义：CFLAG 族，314） // :1563
        chara(target).kojo.肛门虫 = 8; // :1563
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1565
        await era.printAndWait(`「哈嗯嗯……蠕虫桑……进来了……呜嗯……❤」`); // :1566
        await era.printAndWait(
          `${target_name}的身体轻轻的颤抖着，感受着侵入到体内的异物。`,
        ); // :1567
        await era.printAndWait(`「呼啊啊……在里面……咕啾咕啾的……好厉害……❤」`); // :1568
        // CFLAG:314  = 7（变量语义：CFLAG 族，314） // :1569
        chara(target).kojo.肛门虫 = 7; // :1569
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1571
        await era.printAndWait(`「呜呜……屁股里面……被这种东西侵犯什么的……」`); // :1572
        await era.printAndWait(
          `「虽然……好讨厌……但是……呜……好舒服……不，不想要……停下来……」`,
        ); // :1573
        await era.printAndWait(
          `被蠕虫侵犯着的${target_name}，轻轻的咬着手指，似乎在做着心理斗争。`,
        ); // :1574
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1575
        chara(target).kojo.肛门虫 = 6; // :1575
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1577
        await era.printAndWait(
          `「哈呜呜～屁股里面……这样子动的话……不，不可以❤」`,
        ); // :1578
        await era.printAndWait(
          `被蠕虫侵犯着屁股的${target_name}，露出了恍惚的表情。`,
        ); // :1579
        await era.printAndWait(`「肚子，要坏掉，要坏掉了啦～❤」`); // :1580
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1581
        chara(target).kojo.肛门虫 = 5; // :1581
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1583
        await era.printAndWait(`「呜……虽然有点可怕……但是是主人的话……」`); // :1584
        await era.printAndWait(`${target_name}努力的放松身体，以便蠕虫插入。`); // :1585
        await era.printAndWait(`「咕……哈呜呜……肚子里……呜……❤」`); // :1586
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1587
        chara(target).kojo.肛门虫 = 4; // :1587
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1589
        await era.printAndWait(
          `「不要……讨厌……要被这种东西进到身体里什么的……」`,
        ); // :1590
        await era.printAndWait(`「哈呜呜……肚子里面……进来了呜……！讨厌……！」`); // :1591
        await era.printAndWait(`蠕虫强硬的插入了已经渐渐习惯了调教的雏菊中。`); // :1592
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1593
        chara(target).kojo.肛门虫 = 3; // :1593
      } else if (chara(target).kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1595
        await era.printAndWait(`「这种东西……不要啊……求求你……」`); // :1596
        await era.printAndWait(`无视幼女的哀求，蠕虫强硬的插入了雏菊中。`); // :1597
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1598
        chara(target).kojo.肛门虫 = 2; // :1598
      } // :1599
      return 0; // :1600
    } // :1601
  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) {
    // :1603

    if (
      era.get(`talent:${target}:77`) == 1 &&
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 6 || game.kojo.口上开关 == 2)
    ) {
      // :1605
      await era.printAndWait(`「呼诶，就结束了吗？」`); // :1606
      await era.printAndWait(`「再继续也没问题哟❤」`); // :1607
      // CFLAG:374  = 6（变量语义：CFLAG 族，374） // :1608
      chara(target).kojo.肛门虫着脱 = 6; // :1608
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 5 || game.kojo.口上开关 == 2)
    ) {
      // :1610
      await era.printAndWait(`「哈啊……屁股里面……被弄的乱七八糟了呢❤」`); // :1611
      // CFLAG:374  = 5（变量语义：CFLAG 族，374） // :1612
      chara(target).kojo.肛门虫着脱 = 5; // :1612
    } else if (
      era.get(`talent:${target}:77`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1614
      await era.printAndWait(
        `「明明……这种事情……讨厌的说……但是……呜……不想……停下来……」`,
      ); // :1615
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1616
      chara(target).kojo.肛门虫着脱 = 4; // :1616
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1618
      await era.printAndWait(`「呼啊啊……这样子结束了什么的……」`); // :1619
      await era.printAndWait(`「稍稍有点……啊呜呜……」`); // :1620
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1621
      chara(target).kojo.肛门虫着脱 = 3; // :1621
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1623
      await era.printAndWait(`「呜……已经……结束了吗……」`); // :1624
      await era.printAndWait(`「（还想要什么的……说不出口呜……）」`); // :1625
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1626
      chara(target).kojo.肛门虫着脱 = 2; // :1626
    } else if (chara(target).kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1628
      await era.printAndWait(`「呜呜……终于……结束了吗……」`); // :1629
      await era.printAndWait(`${target_name}轻轻的抽泣着。`); // :1630
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1631
      chara(target).kojo.肛门虫着脱 = 1; // :1631
    } // :1632
    return 0; // :1633
  } // :1634

  if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`)) {
    // :1640

    if (chara(target).kojo.阴蒂夹 == 0) {
      // :1642

      if (era.get(`talent:${target}:76`) == 1) {
        // :1644
        await era.printAndWait(`「啊嗯……呼呀……！」`); // :1645
        await era.printAndWait(`「这个是……什么……好厉害……❤」`); // :1646
        await era.printAndWait(
          `${target_name}感受着从阴蒂传来的强烈刺激感，发出了色气满满的娇喘声。`,
        ); // :1647
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1649
        await era.printAndWait(`「呼啊啊……这是什么……呜嗯……感觉……那里……呼啊❤」`); // :1650
        await era.printAndWait(
          `感受着未知的快感，${target_name}轻轻的颤抖着。`,
        ); // :1651
      } else {
        // :1653
        await era.printAndWait(`「不要……这种东西……讨厌……」`); // :1654
        await era.printAndWait(
          `被${master_name}抓住双手的${target_name}毫无反抗之力，只能被动的感受着下半身传来的奇妙感觉。`,
        ); // :1655
      } // :1656
      // CFLAG:315  = 1（变量语义：CFLAG 族，315） // :1657
      chara(target).kojo.阴蒂夹 = 1; // :1657
      return 0; // :1658
    } else {
      // :1660

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1662
        await era.printAndWait(`「呼啊啊，小豆豆被这种东西……」`); // :1663
        await era.printAndWait(`「震个不停什么的……好舒服……❤」`); // :1664
        // CFLAG:315  = 4（变量语义：CFLAG 族，315） // :1665
        chara(target).kojo.阴蒂夹 = 4; // :1665
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1667
        await era.printAndWait(`「呜呜……这种东西……不停的在那里震动着……」`); // :1668
        await era.printAndWait(`「呜……感觉……要变得奇怪了啦……❤」`); // :1669
        // CFLAG:315  = 3（变量语义：CFLAG 族，315） // :1670
        chara(target).kojo.阴蒂夹 = 3; // :1670
      } else if (chara(target).kojo.阴蒂夹 <= 1 || game.kojo.口上开关 == 2) {
        // :1672
        await era.printAndWait(`「咕呜……求求你……快……住手吧……呜……」`); // :1673
        await era.printAndWait(
          `被${master_name}抓住双手的${target_name}毫无反抗之力，只能被动的感受着下半身传来的奇妙感觉。`,
        ); // :1674
        // CFLAG:315  = 2（变量语义：CFLAG 族，315） // :1675
        chara(target).kojo.阴蒂夹 = 2; // :1675
      } // :1676
      return 0; // :1677
    } // :1678
  } else if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`) == 0) {
    // :1680

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1682
      await era.printAndWait(`「呼啊……这样就……？」`); // :1683
      await era.printAndWait(`「接下来是主人了吗？❤」`); // :1684
      // CFLAG:375  = 3（变量语义：CFLAG 族，375） // :1685
      chara(target).kojo.阴蒂夹着脱 = 3; // :1685
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1687
      await era.printAndWait(`「哈啊……哈啊……」`); // :1688
      await era.printAndWait(`${target_name}大口大口的喘着气。`); // :1689
      // CFLAG:375  = 2（变量语义：CFLAG 族，375） // :1690
      chara(target).kojo.阴蒂夹着脱 = 2; // :1690
    } else if (chara(target).kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1692
      await era.printAndWait(`「啊呜呜……好想回家……」`); // :1693
      // CFLAG:375  = 1（变量语义：CFLAG 族，375） // :1694
      chara(target).kojo.阴蒂夹着脱 = 1; // :1694
    } // :1695
    return 0; // :1696
  } // :1697

  if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`)) {
    // :1703

    if (chara(target).kojo.乳头夹 == 0) {
      // :1705

      if (era.get(`talent:${target}:76`) == 1) {
        // :1707
        await era.printAndWait(`「嗯呀～胸部被……这样子刺激……❤」`); // :1708
        await era.printAndWait(`「好棒，好舒服呜❤」`); // :1709
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1711
        await era.printAndWait(`「哈呜呜……胸部……感觉……好奇怪呜……」`); // :1712
      } else {
        // :1714
        await era.printAndWait(`「呀……不要……嗯呀～」`); // :1715
      } // :1716
      // CFLAG:316  = 1（变量语义：CFLAG 族，316） // :1717
      chara(target).kojo.乳头夹 = 1; // :1717
      return 0; // :1718
    } else {
      // :1720

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1722
        await era.printAndWait(`「呼啊啊……主人……这个……好舒服嗯……❤」`); // :1723
        // CFLAG:316  = 4（变量语义：CFLAG 族，316） // :1724
        chara(target).kojo.乳头夹 = 4; // :1724
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1726
        await era.printAndWait(`「嗯啊……主人……❤」`); // :1727
        await era.printAndWait(
          `${target_name}眼神朦胧的看着${master_name}，透明的唾液从嘴角滴落下来。`,
        ); // :1728
        // CFLAG:316  = 3（变量语义：CFLAG 族，316） // :1729
        chara(target).kojo.乳头夹 = 3; // :1729
      } else {
        // :1731
        await era.printAndWait(`「呼……呜呜……感觉……好奇怪……」`); // :1732
        await era.printAndWait(
          `${target_name}红着脸感受着从胸部传来的奇怪感觉。`,
        ); // :1733
        // CFLAG:316  = 2（变量语义：CFLAG 族，316） // :1734
        chara(target).kojo.乳头夹 = 2; // :1734
      } // :1735
      return 0; // :1736
    } // :1737
  } else if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`) == 0) {
    // :1739

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1741
      await era.printAndWait(`「呼啊……主人……快点……来做更多H的事情吧❤」`); // :1742
      // CFLAG:376  = 3（变量语义：CFLAG 族，376） // :1743
      chara(target).kojo.乳头夹着脱 = 3; // :1743
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1745
      await era.printAndWait(`「嗯嗯……主人……请……继续……的说……」`); // :1746
      // CFLAG:376  = 2（变量语义：CFLAG 族，376） // :1747
      chara(target).kojo.乳头夹着脱 = 2; // :1747
    } else if (chara(target).kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1749
      await era.printAndWait(`「哈呜呜……奇怪的东西……不要了啦……」`); // :1750
      // CFLAG:376  = 1（变量语义：CFLAG 族，376） // :1751
      chara(target).kojo.乳头夹着脱 = 1; // :1751
    } // :1752
    return 0; // :1753
  } // :1754

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    // :1759

    if (chara(target).kojo.肛珠 == 0) {
      // :1761

      if (era.get(`talent:${target}:77`) == 1) {
        // :1763
        await era.printAndWait(`「呜呀？！这是……什么……感觉……好奇怪……」`); // :1764
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :1766
        await era.printAndWait(
          `「嗯呀，屁股里面……进来了……这个……超级舒服的说❤」`,
        ); // :1767
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1769
        await era.printAndWait(`「呜呜……屁股要变得奇怪了啦❤」`); // :1770
      } else {
        // :1772
        await era.printAndWait(`「不要啊……这种东西……看着就觉得很奇怪呜……！」`); // :1773
      } // :1774
      // CFLAG:320  = 1（变量语义：CFLAG 族，320） // :1775
      chara(target).kojo.肛珠 = 1; // :1775
      return 0; // :1776
    } else {
      // :1778

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛珠 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :1780
        await era.printAndWait(`「啊呜呜……屁股里面……感觉……好舒服……❤」`); // :1781
        await era.printAndWait(
          `感受着异常的快感的${target_name}露出了恍惚的表情。`,
        ); // :1782
        await era.printAndWait(`「主人……不要……停下来嗯❤」`); // :1783
        // CFLAG:320  = 8（变量语义：CFLAG 族，320） // :1784
        chara(target).kojo.肛珠 = 8; // :1784
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1786
        await era.printAndWait(`「啊哈……这个……好厉害……❤」`); // :1787
        await era.printAndWait(`「诶嘿嘿，主人，来做更多舒服的事情吧❤」`); // :1788
        await era.printAndWait(
          `${target_name}摇动着可爱的小屁股诱惑着${master_name}。`,
        ); // :1789
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :1790
        chara(target).kojo.肛珠 = 7; // :1790
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1792
        await era.printAndWait(
          `「啊啊……进，进来了……屁股里面……一个一个的……呜呀……」`,
        ); // :1793
        await era.printAndWait(`「这种事……明明……很讨厌的……」`); // :1794
        await era.printAndWait(
          `${target_name}眼角挂着泪珠，发出了有些色气的娇喘声。`,
        ); // :1795
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :1796
        chara(target).kojo.肛珠 = 6; // :1796
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1798
        await era.printAndWait(
          `「呼啊啊……主人……请……更多的……呜……玩弄……${sc()}吧……」`,
        ); // :1799
        await era.printAndWait(
          `${target_name}红着脸用纤细的小手分开菊穴，感受着肛珠被一颗一颗塞进去的异样的快感。`,
        ); // :1800
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :1801
        chara(target).kojo.肛珠 = 5; // :1801
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1803
        await era.printAndWait(
          `「哈呜……嗯呀……请……呜……主人……请……温柔……嗯哈……一点……」`,
        ); // :1804
        await era.printAndWait(
          `毫无保留的吞入肛珠的${target_name}感受着从屁股传来的快感，轻轻的娇喘着。`,
        ); // :1805
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :1806
        chara(target).kojo.肛珠 = 4; // :1806
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1808
        await era.printAndWait(`「不要……呜呀……感觉……好难受……」`); // :1809
        await era.printAndWait(
          `这么说着的${target_name}，发出了有些色气的娇喘声……`,
        ); // :1810
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :1811
        chara(target).kojo.肛珠 = 3; // :1811
      } else if (chara(target).kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        // :1813
        await era.printAndWait(`「屁股……不要啊……求求你……」`); // :1814
        await era.printAndWait(
          `被${master_name}压住的${target_name}连稍微的抵抗都做不到，只能徒劳的哀求着。`,
        ); // :1815
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :1816
        chara(target).kojo.肛珠 = 2; // :1816
      } // :1817
      return 0; // :1818
    } // :1819
  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) {
    // :1821

    if (
      era.get(`talent:${target}:77`) == 1 &&
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 6 || game.kojo.口上开关 == 2)
    ) {
      // :1823
      await era.printAndWait(
        `「呼啊……主人……不要停下来……想被更多的……玩弄屁股的说❤」`,
      ); // :1824
      // CFLAG:379  = 6（变量语义：CFLAG 族，379） // :1825
      chara(target).kojo.肛珠着脱 = 6; // :1825
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 5 || game.kojo.口上开关 == 2)
    ) {
      // :1827
      await era.printAndWait(`「嗯啊……这个……好舒服……哈啊……❤」`); // :1828
      // CFLAG:379  = 5（变量语义：CFLAG 族，379） // :1829
      chara(target).kojo.肛珠着脱 = 5; // :1829
    } else if (
      era.get(`talent:${target}:77`) == 1 &&
      (chara(target).kojo.肛珠着脱 <= 4 || game.kojo.口上开关 == 2)
    ) {
      // :1831
      await era.printAndWait(`「呜……不要……拔出来……」`); // :1832
      await era.printAndWait(`${target_name}小声的请求着。`); // :1833
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :1834
      chara(target).kojo.肛珠着脱 = 4; // :1834
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1836
      await era.printAndWait(`「呼诶……感想吗……？」`); // :1837
      await era.printAndWait(`「嗯……很……舒服……的说……」`); // :1838
      await era.printAndWait(`${target_name}红着脸说这。`); // :1839
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :1840
      chara(target).kojo.肛珠着脱 = 3; // :1840
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1842
      await era.printAndWait(`「呼啊啊……明明……讨厌这种事……为什么……」`); // :1843
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :1844
      chara(target).kojo.肛珠着脱 = 2; // :1844
    } else if (chara(target).kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1846
      await era.printAndWait(`「呜呜……这种事……不要了啦……」`); // :1847
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :1848
      chara(target).kojo.肛珠着脱 = 1; // :1848
    } // :1849
    return 0; // :1850
  } // :1851

  if (era_flag.selectcom == 20) {
    // :1856

    if (chara(target).kojo.正常位 == 0) {
      // :1858

      if (era.get(`talent:${target}:0`) == 1) {
        // :1860

        if (era.get(`talent:${target}:76`) == 1) {
          // :1862
          await era.printAndWait(`「嗯哈……主人的那个……进来了……呢……」`); // :1863
          await era.printAndWait(
            `${target_name}眼角挂着泪珠，未发育的小穴被肉棒强硬的破开。`,
          ); // :1864
          await era.printAndWait(`「哈啊……虽然……有点痛……但是……」`); // :1865
          await era.printAndWait(`「很快就……舒服起来了……呢❤」`); // :1866
          await era.printAndWait(`「呐……主人……请……继续吧……❤」`); // :1867
          await era.printAndWait(
            `${target_name}魅惑的看着${master_name}，小脸上浮现出和年龄完全不符的欲望。`,
          ); // :1868
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1870
          await era.printAndWait(`「呜咕……呀……进……来了……呜……」`); // :1871
          await era.printAndWait(
            `${target_name}咬着手指，拼命忍受着第一次的痛处，小小的身体像触电一样不停颤抖着。`,
          ); // :1872
          await era.printAndWait(`「哈呜……${sc()}……完全……没……问题的说……」`); // :1873
          await era.printAndWait(
            `「这样子……${sc()}就……彻底……是主人的东西了呢……❤」`,
          ); // :1874
          await era.printAndWait(
            `尽管眼泪在眼眶里打转转，痛连说话的声音都有些颤抖。`,
          ); // :1875
          await era.printAndWait(
            `但是${target_name}的脸上，满满的是幸福的表情。`,
          ); // :1876
        } else {
          // :1878
          await era.printAndWait(`「好痛……！」`); // :1879
          await era.printAndWait(
            `「求求你……不要……快住手……好痛……好痛呜呜……！」`,
          ); // :1880
          await era.printAndWait(
            `${target_name}发出了稚气的悲鸣声，在房间里回荡着。`,
          ); // :1881
          await era.printAndWait(
            `被强行贯穿的幼穴，感受着强烈的刺激，拼命的排斥着异物。`,
          ); // :1882
          await era.printAndWait(
            `感受着异常紧致的小穴的${master_name}，毫不怜惜的开始动起腰来……`,
          ); // :1883
        } // :1884
      } else {
        // :1886

        if (era.get(`talent:${target}:76`) == 1) {
          // :1888
          await era.printAndWait(`「啊哈……主人的那个……好大……塞的满满的呢❤」`); // :1889
          await era.printAndWait(
            `「呐，主人，请用肉棒，把${sc()}的小穴，咕啾咕啾的弄的一塌糊涂吧❤」`,
          ); // :1890
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1892
          await era.printAndWait(`「哈呜呜……进……来了呢……肚子里面……」`); // :1893
          await era.printAndWait(
            `被${master_name}压倒在身下的${target_name}，羞红着脸，急促的呼吸着，吐出带着甜味的热气。`,
          ); // :1894
          await era.printAndWait(`「请……主人……随意使用……的说……」`); // :1895
        } else {
          // :1897
          await era.printAndWait(`「啊呜……咕……好难受……不要了啦……」`); // :1898
          await era.printAndWait(
            `不顾${target_name}带着哭腔的哀求，${master_name}肆意的用肉棒蹂躏着身下娇弱的幼女。`,
          ); // :1899
        } // :1900
      } // :1901
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :1902
      chara(target).kojo.正常位 = 1; // :1902
      return 0; // :1903
    } else {
      // :1905

      if (era.get(`talent:${target}:76`)) {
        // :1907

        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          // :1909
          if (rand_n(3) == 1) {
            // :1910
            await era.printAndWait(
              `「嗯哈啊……肚子里面……嗯……好舒服……好厉害……❤」`,
            ); // :1911
            await era.printAndWait(`「果然H什么的……好喜欢……❤」`); // :1912
            await era.printAndWait(`「好想就这样一直和主人做下去呢❤」`); // :1913
            await era.printAndWait(
              `${target_name}紧紧的搂着${master_name}不放，淫乱的幼穴贪图着快感，紧紧的吸着肉棒不放。`,
            ); // :1914
          } else if (rand_n(2) == 1) {
            // :1915
            await era.printAndWait(`「哈啊……那里……又被……嗯……❤」`); // :1916
            await era.printAndWait(
              `被一次次顶到最深处的${target_name}，露出了恍惚的表情。`,
            ); // :1917
            await era.printAndWait(
              `「被主人的肉棒侵犯什么的，H的事情，最喜欢了❤」`,
            ); // :1918
            await era.printAndWait(`「主人，请对${sc()}做更多H的事情吧❤」`); // :1919
            await era.printAndWait(
              `还没有发育成熟的稚嫩的肉体，已经完全的沉溺在肉欲之中了……`,
            ); // :1920
          } else {
            // :1921
            await era.printAndWait(
              `「哈啊啊❤肉棒……在小穴里面……咕啾咕啾的……嗯❤」`,
            ); // :1922
            await era.printAndWait(
              `${target_name}紧紧的抓着床单，被你压在身下，不断的被抽送着，下半身随着动作发出淫靡的水声。`,
            ); // :1923
            await era.printAndWait(
              `「主人……还要……还要更多的……被主人的肉棒……这样子……哈啊❤」`,
            ); // :1924
            await era.printAndWait(
              `幼嫩的肉穴积极的回应着粗暴的抽送，期待着快感。`,
            ); // :1925
          } // :1926
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :1928
          await era.printAndWait(`「啊哈……主人的那个……好大……塞的满满的呢❤」`); // :1929
          await era.printAndWait(
            `柔软的小穴紧紧的吸着肉棒不放，不断的蠕动着按摩着肉棒。`,
          ); // :1930
          await era.printAndWait(`「被这样子侵犯……总觉得……要变得奇怪了呢❤」`); // :1931
          await era.printAndWait(
            `「诶嘿嘿，因为太舒服了，所以也是没办法得事嘛❤」`,
          ); // :1932
          await era.printAndWait(`「所以……请主人……好好的侵犯${sc()}的说❤」`); // :1933
          await era.printAndWait(
            `${target_name}轻轻的含着手指，用稚气的声音说着和外表完全不符的话语。`,
          ); // :1934
        } else {
          // :1936
          await era.printAndWait(`「嗯呀……肉棒在那里咕啾咕啾的抽送……好舒服❤」`); // :1937
          await era.printAndWait(
            `被压在身下侵犯的${target_name}，发出了快乐的声音。`,
          ); // :1938
          await era.printAndWait(
            `紧窄的小穴不断的分泌着爱液，让抽送变得更加顺利。`,
          ); // :1939
          await era.printAndWait(`「就这样子一直做下去……感觉也不坏呢❤」`); // :1940
        } // :1941
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :1942
        chara(target).kojo.正常位 = 5; // :1942
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1944

        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          // :1946
          if (rand_n(3) == 1) {
            // :1947
            await era.printAndWait(`「哈啊啊……主人……不，不要……停下来……」`); // :1948
            await era.printAndWait(
              `「${sc()}的小穴……已经……没有那个就活不下去了……」`,
            ); // :1949
            await era.printAndWait(`「但是……主人以外的……不想……」`); // :1950
            await era.printAndWait(`「所以……主人……哈啊……求求你……❤」`); // :1951
            await era.printAndWait(`「想更多的……和主人……在一起……」`); // :1952
          } else if (rand_n(2) == 1) {
            // :1953
            await era.printAndWait(`「呼啊……嗯呀……${sc()}……没问题的……」`); // :1954
            await era.printAndWait(
              `${target_name}搂着${master_name}的脖子，将自己的身体完全的交给了对方。`,
            ); // :1955
            await era.printAndWait(
              `「因为……被主人的那个……做H的事情什么的……很舒服嘛……」`,
            ); // :1956
            await era.printAndWait(
              `「呐……主人……请更加……疼爱${sc()}一些吧……❤」`,
            ); // :1957
            await era.printAndWait(
              `被顶到最深处，不自觉漏出了快乐的声音的${target_name}，满眼桃心的望着压在自己身上的${master_name}。`,
            ); // :1958
            await era.printAndWait(
              `「${sc()}的身体……就是为主人……呼啊……而存在的呢❤」`,
            ); // :1959
          } else {
            // :1960
            await era.printAndWait(`「呜啊啊……主人……这么激烈……的话……❤」`); // :1961
            await era.printAndWait(`「${sc()}……会……嗯……坏掉的啦❤」`); // :1962
            await era.printAndWait(
              `幼小的身体在${master_name}身下因为快感而不住的颤抖着。`,
            ); // :1963
            await era.printAndWait(
              `两只小脚在半空中摇晃着，时不时拍打在${master_name}的背上。`,
            ); // :1964
          } // :1965
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :1967
          await era.printAndWait(`「嗯呀……主人……请……请温柔……一点……❤」`); // :1968
          await era.printAndWait(
            `${master_name}毫不费力的抓住${target_name}的双脚大大分开，用粗大的肉棒在幼穴中粗暴的抽送着。`,
          ); // :1969
          await era.printAndWait(
            `被反复调教过的小穴虽然尚未发育成熟，但却紧紧的吸着肉棒不放，无视着主人的意志贪图着快感。`,
          ); // :1970
          await era.printAndWait(`「呀……哈呜……那里……被……这样子……嗯呀❤」`); // :1971
          await era.printAndWait(
            `${target_name}闭着眼睛，嘴角挂着泪珠，随着${master_name}的动作一下一下的被推动着，发出了色气的娇喘声。`,
          ); // :1972
        } else {
          // :1974
          await era.printAndWait(`「哈呜呜～主人，太激烈，太激烈了啦～～」`); // :1975
          await era.printAndWait(
            `${master_name}握着${target_name}纤细的腰部，一下一下的冲撞着最深处。`,
          ); // :1976
          await era.printAndWait(
            `「呜呜……小穴被主人这样子……侵犯……塞得满满的……嗯呀～❤」`,
          ); // :1977
          await era.printAndWait(
            `时不时漏出可爱的声音的${target_name}，更加的激发了${master_name}的兽欲。`,
          ); // :1978
          await era.printAndWait(
            `稚嫩的肉壁深处传来的吸力，不断的为肉棒送去更大的快感。`,
          ); // :1979
        } // :1980
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :1981
        chara(target).kojo.正常位 = 5; // :1981
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1983
        await era.printAndWait(`「呼啊啊……请……主人……呜……随意……使用……的说……」`); // :1984
        await era.printAndWait(
          `感受着${master_name}的肉棒一次次的侵入自己身体的${target_name}，不时的用稚气的声音发出可爱的娇喘声。`,
        ); // :1985
        await era.printAndWait(
          `幼穴似乎已经渐渐习惯了粗大的肉棒，开始积极的回应起${master_name}来。`,
        ); // :1986
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :1987
        chara(target).kojo.正常位 = 4; // :1987
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1989
        await era.printAndWait(`「呜……请……主人……随意……使用……的说……」`); // :1990
        await era.printAndWait(
          `${target_name}拼命的忍耐着异物感，任由${master_name}的肉棒在自己未发育成熟的下半身抽送着。`,
        ); // :1991
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :1992
        chara(target).kojo.正常位 = 3; // :1992
      } else if (chara(target).kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        // :1994
        await era.printAndWait(`「哈咕……不……要……呼呀……好难受……」`); // :1995
        await era.printAndWait(
          `${master_name}无视着${target_name}的哀求，毫不怜惜的用肉棒蹂躏着未成年的幼穴。`,
        ); // :1996
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :1997
        chara(target).kojo.正常位 = 2; // :1997
      } // :1998
      return 0; // :1999
    } // :2000
  } // :2001

  if (era_flag.selectcom == 21) {
    // :2006

    if (chara(target).kojo.背后位 == 0) {
      // :2008

      if (era.get(`talent:${target}:0`) == 1) {
        // :2010

        if (era.get(`talent:${target}:76`) == 1) {
          // :2012
          await era.printAndWait(
            `「第一次要被这样子拿走什么的，这个姿势简直像是小狗狗一样呢❤」`,
          ); // :2013
          await era.printAndWait(
            `一边这么说着，${target_name}吐着可爱的小舌头，轻轻的叫了两声。`,
          ); // :2014
          await era.printAndWait(
            `${master_name}像抚摸宠物一样的摸了摸${target_name}的头，然后握着纤细的腰部，猛的将肉棒刺入幼穴。`,
          ); // :2015
          await era.printAndWait(`「呼呀……❤主人的肉棒……进来了……❤」`); // :2016
          await era.printAndWait(
            `尽管是第一次被肉棒插入，被${master_name}调教出来的这副淫乱的幼小躯体却紧紧的吸住肉棒不放，不停贪图着快感。`,
          ); // :2017
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2019
          await era.printAndWait(
            `${master_name}从背后握着纤细的腰部，一口气贯穿了处女膜。`,
          ); // :2020
          await era.printAndWait(`小小的身体因为破处的痛楚而不停的颤抖着。`); // :2021
          await era.printAndWait(
            `虽然是初经人事，柔软的肉壁却不停的按摩着肉棒。`,
          ); // :2022
          await era.printAndWait(`「哈呜呜……肚子里……主人……进来了呢……」`); // :2023
          await era.printAndWait(`「虽然很痛……但是……这样${sc()}就……和主人……」`); // :2024
          await era.printAndWait(`「主人……${sc()}没问题的……所以……请尽情的……」`); // :2025
          await era.printAndWait(
            `${master_name}摸了摸${target_name}的头，仿佛像抚摸着宠物一样。`,
          ); // :2026
          await era.printAndWait(`「啊……诶嘿嘿……被主人摸头了呢……好开心……❤」`); // :2027
          await era.printAndWait(
            `居高临下的看着身下像幼犬一样温顺可爱的${target_name}，俯下身去开始用肉棒肆意侵犯起娇嫩的幼穴来……`,
          ); // :2028
        } else {
          // :2030
          await era.printAndWait(`「不……不要……你要做什么……好可怕……」`); // :2031
          await era.printAndWait(
            `头被强行的按住，无法看到背后的${target_name}，只能害怕的不停颤抖着，感受着又粗又热的肉棒贴到自己的下半身，然后猛的进入到自己的身体里。`,
          ); // :2032
          await era.printAndWait(`象征处女的鲜红色沿着白皙的大腿流下来。`); // :2033
          await era.printAndWait(`「呜呀……好痛……求求你……快停下来呜……」`); // :2034
          await era.printAndWait(
            `因为哀求和悲鸣声而更加兴奋的${master_name}，毫不怜惜的压在${target_name}背上，开始蹂躏起身下娇小的身躯来。`,
          ); // :2035
        } // :2036
      } else {
        // :2038

        if (era.get(`talent:${target}:76`) == 1) {
          // :2040
          await era.printAndWait(`「诶嘿嘿，这个姿势简直像是小狗狗一样呢❤」`); // :2041
          await era.printAndWait(
            `一边这么说着，${target_name}吐着可爱的小舌头，轻轻的叫了两声。`,
          ); // :2042
          await era.printAndWait(
            `${master_name}像抚摸宠物一样的摸了摸${target_name}的头，然后握着纤细的腰部，猛的将肉棒刺入幼穴。`,
          ); // :2043
          await era.printAndWait(`「呼呀……❤主人的肉棒……进来了……❤」`); // :2044
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2046
          await era.printAndWait(`「哈呜呜……这个姿势……有点害羞呢……」`); // :2047
          await era.printAndWait(
            `${master_name}从背后握着纤细的腰部，用力的将肉棒插入了娇嫩的幼穴中。`,
          ); // :2048
          await era.printAndWait(`「呜呀……主人的那个……呜……哈啊……❤」`); // :2049
          await era.printAndWait(`「肚子里面……好热……呜……」`); // :2050
        } else {
          // :2052
          await era.printAndWait(`「不……不要……你要做什么……好可怕……」`); // :2053
          await era.printAndWait(
            `头被强行的按住，无法看到背后的${target_name}，只能害怕的不停颤抖着，感受着又粗又热的肉棒贴到自己的下半身，然后猛的进入到自己的身体里。`,
          ); // :2054
          await era.printAndWait(`「呜呀……好痛……求求你……快停下来呜……」`); // :2055
          await era.printAndWait(
            `因为哀求和悲鸣声而更加兴奋的${master_name}，毫不怜惜的压在${target_name}背上，蹂躏着身下娇小的身躯。`,
          ); // :2056
        } // :2057
      } // :2058
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :2059
      chara(target).kojo.背后位 = 1; // :2059
      return 0; // :2060
    } else {
      // :2062

      if (era.get(`talent:${target}:76`)) {
        // :2064

        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          // :2066
          switch (
            rand_n(6) // :2067
          ) {
            case 5: {
              // :2068
              await era.printAndWait(`「好舒服……主人……肉棒……好舒服啊❤」`); // :2069
              await era.printAndWait(
                `「脑子里面，已经没办法想其他事情了啦～❤」`,
              ); // :2070
              await era.printAndWait(
                `${target_name}支撑着身体，任由${master_name}握着自己的腰部侵犯着下半身。`,
              ); // :2071
              await era.printAndWait(
                `幼穴忠实的回应着抽插，依依不舍的紧含着肉棒不放。`,
              ); // :2072
              break; // :2073
            } // :2073
            case 4: {
              // :2073
              await era.printAndWait(`「呼啊……主人……嗯……嗯呀……❤」`); // :2074
              await era.printAndWait(`「小穴……那里……舒服的要死掉了啦❤」`); // :2075
              await era.printAndWait(`「主人……嗯呀❤……肉棒……还想要更多的说❤」`); // :2076
              break; // :2077
            } // :2077
            case 3: {
              // :2077
              await era.printAndWait(`「这个姿势……像小狗狗一样呢～汪～❤」`); // :2078
              await era.printAndWait(
                `${target_name}像小狗微微的吐着舌头，被按倒在床上像小动物一样被侵犯着。`,
              ); // :2079
              await era.printAndWait(
                `稚嫩的肉壁贪图着快感，不断的吸吮着肉棒，随着抽插一阵阵的紧缩着。`,
              ); // :2080
              break; // :2081
            } // :2081
            case 2: {
              // :2081
              await era.printAndWait(
                `「呼呀……❤……玩弄舌头什么的……太犯规了啦……❤」`,
              ); // :2082
              await era.printAndWait(
                `${master_name}只用一只手就轻松的将娇小的${target_name}压在桌上。`,
              ); // :2083
              await era.printAndWait(
                `一边前后活动着腰部，不停的在幼穴里抽送着，一边捏弄着可爱的小舌头，晶莹的唾液伴随着含糊不清的娇喘声从指缝间流到桌上。`,
              ); // :2084
              await era.printAndWait(
                `小脚随着快感在半空中轻轻的颤抖着，透明的爱液随着激烈的抽送从交合的地方滴到地上，拉出一条细细的淫靡的银丝。`,
              ); // :2085
              break; // :2086
            } // :2086
            case 1: {
              // :2086
              await era.printAndWait(
                `${target_name}的小手扶着墙，转过头来用湿润的眼睛看着${master_name}，`,
              ); // :2087
              await era.printAndWait(
                `${master_name}握着${target_name}的腰部，毫不费力的配合着肉棒的动作将身体拉向自己，两只小脚在半空中随着动作前后晃动着。`,
              ); // :2088
              await era.printAndWait(`肉体不断的撞击着，发出啪啪啪的声音。`); // :2089
              break; // :2090
            } // :2090
            case 0: {
              // :2090
              await era.printAndWait(
                `${master_name}从后面抓着${target_name}的小手，前后不断的抽送着。`,
              ); // :2091
              await era.printAndWait(
                `虽然看起来好像有用脚在支撑着，但是在被侵犯的快感下小小的身体很快就沦陷了，如果不是被${master_name}拉着，大概已经站不住了吧。`,
              ); // :2092
              await era.printAndWait(
                `透明的爱液从两腿中间滴下来，拉出一条细细的银丝。`,
              ); // :2093
              break; // :2094
            } // :2094
          } // :2094
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :2096
          await era.printAndWait(
            `「嗯呜……哈呀……肚子里面……在咕啾咕啾的……哈呀❤」`,
          ); // :2097
          await era.printAndWait(
            `一次次的迎接着冲撞的${target_name}努力的抬高下半身，主动的迎合着${master_name}，幼小的肉穴随着抽送发出了淫靡的水声。`,
          ); // :2098
          await era.printAndWait(`「主人的肉棒……好厉害的说❤」`); // :2099
          await era.printAndWait(`「呜嗯，小穴……要被主人玩坏了啦……❤」`); // :2100
        } else {
          // :2102
          await era.printAndWait(`「哈啊，H的事情，好舒服❤」`); // :2103
          await era.printAndWait(
            `「诶嘿嘿，主人，更加激烈一些的使用${sc()}也没关系的哟❤」`,
          ); // :2104
          await era.printAndWait(
            `${target_name}轻轻的喘息着，时不时漏出甜美的娇喘声。`,
          ); // :2105
        } // :2106
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :2107
        chara(target).kojo.背后位 = 5; // :2107
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2109

        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          // :2111
          switch (
            rand_n(6) // :2112
          ) {
            case 5: {
              // :2113
              await era.printAndWait(`「嗯呀～主人，主人～嗯～」`); // :2114
              await era.printAndWait(
                `「肚子里面，被这样子搅动，舒服的要死掉了啦～」`,
              ); // :2115
              await era.printAndWait(`「和主人做H的事情……好幸福……❤」`); // :2116
              await era.printAndWait(
                `${target_name}的小眼睛里满满都是迷恋，像小狗一样从背后被一次次的冲撞着。`,
              ); // :2117
              break; // :2118
            } // :2118
            case 4: {
              // :2118
              await era.printAndWait(`「呜呜……这个姿势……有点害羞呢……」`); // :2119
              await era.printAndWait(`「但是……因为是主人……所以没问题……」`); // :2120
              break; // :2121
            } // :2121
            case 3: {
              // :2121
              await era.printAndWait(
                `「如果主人喜欢这样子的话……${sc()}什么样都没问题的哟，汪～」`,
              ); // :2122
              await era.printAndWait(
                `${target_name}像小狗微微的吐着舌头，汪汪的叫着，用小小的身体取悦着${master_name}。`,
              ); // :2123
              await era.printAndWait(
                `稚嫩的肉壁在刺激下不断的收缩吸吮着肉棒，随着抽插一阵阵的缩紧，仿佛在贪图着快感一样。`,
              ); // :2124
              break; // :2125
            } // :2125
            case 2: {
              // :2125
              await era.printAndWait(
                `${master_name}只用一只手就轻松的将娇小的${target_name}压在桌上。`,
              ); // :2126
              await era.printAndWait(
                `一边活动着腰部，一边捏弄着可爱的小舌头，晶莹的唾液伴随着含糊不清的娇喘声从指缝间流到桌上。`,
              ); // :2127
              await era.printAndWait(
                `${master_name}轻轻的咬着${target_name}的耳朵，说着下流的话语。幼女身上特有的淡淡的香气萦绕在鼻尖，更加刺激了${master_name}的欲望。`,
              ); // :2128
              await era.printAndWait(
                `「呼啊……主人……嗯哈……那种事……呀……不要说……」`,
              ); // :2129
              await era.printAndWait(
                `毫无反抗能力的${target_name}小脸羞红的仿佛要滴出水一样，小脚随着快感在半空中轻轻的颤抖着，透明的爱液随着激烈的抽送从交合的地方滴到地上，拉出一条细细的淫靡的银丝。`,
              ); // :2130
              break; // :2131
            } // :2131
            case 1: {
              // :2131
              await era.printAndWait(
                `${target_name}的小手扶着墙，转过头来用湿润的眼睛看着${master_name}，`,
              ); // :2132
              await era.printAndWait(
                `${master_name}握着${target_name}的腰部，毫不费力的配合着肉棒的动作将身体拉向自己，两只小脚在半空中随着动作前后晃动着。`,
              ); // :2133
              await era.printAndWait(
                `${target_name}轻轻的喘息着，时不时漏出几声甜美的娇喘。`,
              ); // :2134
              break; // :2135
            } // :2135
            case 0: {
              // :2135
              await era.printAndWait(
                `${master_name}从后面抓着${target_name}的小手，前后不断的抽送着。`,
              ); // :2136
              await era.printAndWait(
                `虽然看起来好像有用脚在支撑着，但是在${master_name}的侵犯下小小的身体很快就软了下来，如果不是被${master_name}拉着，大概已经站不住了吧。`,
              ); // :2137
              await era.printAndWait(
                `透明的爱液从两腿中间滴下来，拉出一条细细的银丝。`,
              ); // :2138
              break; // :2139
            } // :2139
          } // :2139
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :2141
          await era.printAndWait(`「哈呜呜……肚子里……塞得满满的……嗯呀……❤」`); // :2142
          await era.printAndWait(
            `已经完全习惯了肉棒的幼穴紧紧的吸住肉棒不放，仿佛要把肉棒榨出汁来。`,
          ); // :2143
          await era.printAndWait(
            `「呜呜……虽然说出来好害羞……但是……呜……H……好舒服……」`,
          ); // :2144
        } else {
          // :2145
          await era.printAndWait(`「呼啊……主人……这样子……嗯呜……」`); // :2146
          await era.printAndWait(
            `${target_name}抱着枕头，小脸泛着红晕，轻轻的喘息着。`,
          ); // :2147
        } // :2148
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :2149
        chara(target).kojo.背后位 = 5; // :2149
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2151
        await era.printAndWait(
          `${target_name}乖巧的趴在床上，小手分开幼穴，迎接着${master_name}的肉棒。`,
        ); // :2152
        await era.printAndWait(
          `从身体到精神上完全屈服于${master_name}的她，渐渐的开始习惯了H的事情。`,
        ); // :2153
        await era.printAndWait(
          `「哈呜……这种事情……不是说喜欢什么的呜……但是……哈啊……」`,
        ); // :2154
        await era.printAndWait(`比起苦闷的声音来，似乎快乐占的比重更多一些。`); // :2155
        if (rand_n(3) == 0) {
          // :2157
          await era.printAndWait(
            `虽然嘴上不承认，但是娇嫩的肉壁却紧紧的贴合着肉棒，在快感的刺激下诚实的分泌着爱液。`,
          ); // :2157
        } // :2157
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :2158
        chara(target).kojo.背后位 = 4; // :2158
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2160
        await era.printAndWait(`「嗯咕……呜……哈呜……」`); // :2161
        await era.printAndWait(
          `${target_name}含着泪花趴在床上，默默的承受着${master_name}的抽送。`,
        ); // :2162
        await era.printAndWait(
          `虽然已经不会反抗了，但是要习惯H的事情似乎还需要一点时间。`,
        ); // :2163
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :2164
        chara(target).kojo.背后位 = 3; // :2164
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :2166
        await era.printAndWait(`「呜呜……不要……哈呜……好难受哦……」`); // :2167
        await era.printAndWait(
          `被压在身下，连象征性的反抗都做不到的${target_name}只能带着哭声小声的哀求着。`,
        ); // :2168
        await era.printAndWait(
          `因为哀求声更加兴奋的${master_name}，毫不怜惜的凌辱着身下的幼女。`,
        ); // :2169
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :2170
        chara(target).kojo.背后位 = 2; // :2170
      } // :2171
      return 0; // :2172
    } // :2173
  } // :2174

  if (era_flag.selectcom == 22) {
    // :2179
    if (chara(target).kojo.对面座位 == 0) {
      // :2180

      if (era.get(`talent:${target}:0`) == 1) {
        // :2182

        if (era.get(`talent:${target}:76`) == 1) {
          // :2184
          await era.printAndWait(
            `「诶嘿嘿……第一次能和主人面对面的……真是最棒了呢❤」`,
          ); // :2185
          await era.printAndWait(
            `${target_name}搂着${master_name}的脖子，小肚子不停的磨蹭着肉棒。`,
          ); // :2186

          if (chara(target).kojo.接吻) {
            // :2188
            await era.printAndWait(`「啾……嗯……」`); // :2189
            await era.printAndWait(
              `${target_name}的小脸主动迎上来，柔软的嘴唇像蜜糖一样和${master_name}的嘴重合在一起。`,
            ); // :2190
          } // :2191
          await era.printAndWait(
            `${master_name}的肉棒毫不留情的刺穿了处女膜，象征着初次的鲜红色沿着肉棒流了下来。`,
          ); // :2192
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2194
          await era.printAndWait(
            `「第一次那个……能和主人这样子……互相看着……${sc()}……好开心……❤」`,
          ); // :2195
          await era.printAndWait(
            `${target_name}靠在${master_name}的胸口，小脸泛着红晕。`,
          ); // :2196

          if (chara(target).kojo.接吻) {
            // :2198
            await era.printAndWait(`「kiss……可以吗……？」`); // :2199
            await era.printAndWait(`「嗯啾……呼……啊……」`); // :2200
            await era.printAndWait(
              `二人的舌头交缠在一起，软软的小舌头像布丁一样，小嘴里充斥着幼女特有的甘甜的味道。`,
            ); // :2201
          } // :2202
          await era.printAndWait(
            `感受着肉棒进入到身体里的${target_name}，小小的身体疼痛而微微颤抖着，象征着初次的鲜红色沿着肉棒流了下来。`,
          ); // :2203
          await era.printAndWait(
            `${target_name}抬起头用湿润的眼睛看着${master_name}，虽然眼泪在眼眶里打转转，但是小脸上满溢着幸福的表情。`,
          ); // :2204
        } else {
          // :2206
          await era.printAndWait(`「呜呜……好……痛……求求你……不要……」`); // :2207
          await era.printAndWait(
            `被${master_name}抱在怀里的${target_name}，被肉棒深深的插进了身体里，一下子就顶到了最深处。鲜红色的液体沿着肉棒流下来，滴到地上。`,
          ); // :2208
        } // :2209
      } else {
        // :2211

        if (era.get(`talent:${target}:76`) == 1) {
          // :2213
          await era.printAndWait(`「主人的肉棒……进来了呢❤」`); // :2214
          await era.printAndWait(`「这个姿势……诶嘿嘿，顶到了最里面……呀❤」`); // :2215
          await era.printAndWait(
            `${target_name}搂着${master_name}的脖子，积极的摇动着腰部，贪图着H的快感。`,
          ); // :2216
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2218
          await era.printAndWait(`「哈呜……主人……肉棒……太深……太深了啦……！」`); // :2219
          await era.printAndWait(
            `虽然最初有些不适应的样子，但是随着最深处被一下一下的冲击着，${target_name}很快就发出了甜美的娇喘声。`,
          ); // :2220
        } else {
          // :2222
          await era.printAndWait(`「呜……肚子里面……被……顶到了……好难受……」`); // :2223
          await era.printAndWait(
            `${master_name}捏着柔软的小屁股，毫不怜惜的一次次的将肉棒顶向里面。`,
          ); // :2224
        } // :2225
      } // :2226
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :2227
      chara(target).kojo.对面座位 = 1; // :2227
      return 0; // :2228
    } else {
      // :2230

      if (era.get(`talent:${target}:76`) == 1) {
        // :2232

        if (era.get(`talent:${target}:232`) || era.get(`talent:${target}:75`)) {
          // :2234
          if (rand_n(3) == 0) {
            // :2235
            await era.printAndWait(`「嗯啾……哈……嗯……❤」`); // :2236
            await era.printAndWait(`「肉棒……还要……还要变得更舒服……❤」`); // :2237
            await era.printAndWait(`「主人……嗯……啾……❤」`); // :2238
            await era.printAndWait(
              `二人一次次的接吻着，${target_name}搂着${master_name}不放，任由对方像使用飞机杯一样使用自己的身体。`,
            ); // :2239
          } else if (rand_n(2) == 0) {
            // :2240
            await era.printAndWait(
              `「哈啊……主人的肉棒在肚子里……嗯……好舒服……❤」`,
            ); // :2241
            await era.printAndWait(`「里面被这样顶着的快感……嗯呀……❤」`); // :2242
            await era.printAndWait(
              `感受着幼嫩的小穴被肉棒贯穿的快感的${target_name}，扭动着腰部迎合着身下的肉棒。`,
            ); // :2243
            await era.printAndWait(
              `「主人……请更多的……用肉棒……嗯……在${sc()}的小穴里……❤」`,
            ); // :2244
          } else {
            // :2245
            await era.printAndWait(
              `「嗯呀……好舒服……被肉棒欺负什么的……最喜欢了❤」`,
            ); // :2246
            await era.printAndWait(
              `托着软软的小屁股的${master_name}，一边揉捏着柔嫩的臀肉，一边用力的挺动着腰部。`,
            ); // :2247
            await era.printAndWait(
              `被肉棒一次次顶着最深处的${target_name}，用稚嫩的声音发出了和年龄不符的色气的娇喘声。`,
            ); // :2248
            await era.printAndWait(
              `「呼啊……请主人……把精液牛奶……满满的注射到${sc()}的肚子里面吧……❤」`,
            ); // :2249
          } // :2250
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :2252
          await era.printAndWait(
            `「诶嘿嘿……主人的肉棒……在${sc()}的那里……咕啾咕啾的动着呢❤」`,
          ); // :2253
          await era.printAndWait(
            `「嗯啊……请主人……更加用力的……侵犯${sc()}的……H的小穴吧❤」`,
          ); // :2254
          await era.printAndWait(
            `已经完全习惯了肉棒的幼穴渴求着快感，不断的分泌着爱液，侍奉着肉棒。`,
          ); // :2255
          await era.printAndWait(
            `感受到这一点的${master_name}，更加用力的抽送起来。`,
          ); // :2256
        } else {
          // :2258
          await era.printAndWait(`「嗯……哈啊……H的事情……好棒……❤」`); // :2259
          await era.printAndWait(`「能被主人的肉棒侵犯……真是最棒了呢❤」`); // :2260
          await era.printAndWait(
            `${target_name}抬着头仰视着${master_name}，湿润的眼睛里满是诱惑。`,
          ); // :2261
        } // :2262
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :2263
        chara(target).kojo.对面座位 = 6; // :2263
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2265
        if (era.get(`talent:${target}:232`) || era.get(`talent:${target}:75`)) {
          // :2266
          if (rand_n(3) == 0) {
            // :2267
            await era.printAndWait(`「啾……哈……主人……喜欢……❤」`); // :2268
            await era.printAndWait(`「主人……求求你，不要和${sc()}分开来……」`); // :2269
            await era.printAndWait(`「${sc()}已经……没有主人就活不下去了……」`); // :2270
            await era.printAndWait(
              `${target_name}轻声朝着${master_name}撒着娇，扭动着幼小的身体，积极的回应着${master_name}。`,
            ); // :2271
          } else if (rand_n(2) == 0) {
            // :2272
            await era.printAndWait(`「啊呜呜……主人……嗯……好舒服……的说……❤」`); // :2273
            await era.printAndWait(
              `${target_name}靠在${master_name}的怀里，纤细的腰部被握住，小小的身体仿佛飞机杯一样被使用着。`,
            ); // :2274

            if (chara(target).kojo.接吻) {
              // :2276
              await era.printAndWait(`「主人……ki……ss……可以咩……？」`); // :2277
              await era.printAndWait(
                `${target_name}仰着头，用湿润的眼睛望着${master_name}`,
              ); // :2278
              await era.printAndWait(
                `二人的舌头交缠在一起，晶莹的唾液从嘴角流下来。`,
              ); // :2279
              await era.printAndWait(`「嗯……啾……哈啊……」`); // :2280
            } // :2281
          } else {
            // :2282
            await era.printAndWait(`「哈啊……被主人抱着……好幸福……❤」`); // :2283
            await era.printAndWait(
              `${target_name}轻轻的蹭着${master_name}的胸口，小脸上满是幸福的表情。`,
            ); // :2284
            await era.printAndWait(
              `${master_name}一边揉捏着小屁股，一边轻轻的摸着${target_name}的头，一下一下的活动着腰部。`,
            ); // :2285
            await era.printAndWait(
              `从被侵犯中感受到快感的${target_name}，时不时漏出可爱的娇喘声来。`,
            ); // :2286
          } // :2287
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :2289
          await era.printAndWait(`「哈呜呜……肚子里面……被……顶到了……呢……」`); // :2290
          await era.printAndWait(
            `小小的身体仿佛没有重量一样，被${master_name}托着上下抽送着。`,
          ); // :2291
          await era.printAndWait(
            `已经习惯了肉棒的小穴，紧紧的吸着不放，为${master_name}送去更多的快感。`,
          ); // :2292
        } // :2293
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :2294
        chara(target).kojo.对面座位 = 5; // :2294
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2296
        await era.printAndWait(`「哈……嗯咕……呀……」`); // :2297
        await era.printAndWait(
          `${master_name}握着怀中的小人纤细的腰部，肆意的侵犯着。`,
        ); // :2298
        await era.printAndWait(`「这种事情……明明……不喜欢的……但是……嗯哈……」`); // :2299
        await era.printAndWait(
          `被不停抽送着的${target_name}，虽然尽力的在忍耐，但还是时不时的漏出可爱的娇喘声。`,
        ); // :2300
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :2301
        chara(target).kojo.对面座位 = 4; // :2301
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2303
        await era.printAndWait(`「呼啊啊……里面……好……好涨呜……」`); // :2304
        await era.printAndWait(
          `${master_name}握着怀中的小人纤细的腰部，肆意的侵犯着。`,
        ); // :2305
        await era.printAndWait(`「主人……请……温柔……一点……嗯呀……」`); // :2306
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :2307
        chara(target).kojo.对面座位 = 3; // :2307
      } else if (chara(target).kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :2309
        await era.printAndWait(`「呜呜……好难受……求求你……不要了啦……」`); // :2310
        await era.printAndWait(
          `被肉棒不停侵犯的${target_name}含着眼泪乞求着${master_name}。`,
        ); // :2311
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :2312
        chara(target).kojo.对面座位 = 2; // :2312
      } // :2313
      return 0; // :2314
    } // :2315
  } // :2316

  if (era_flag.selectcom == 23) {
    // :2321
    if (chara(target).kojo.背面座位 == 0) {
      // :2322

      if (era.get(`talent:${target}:0`) == 1) {
        // :2324

        if (era.get(`talent:${target}:76`) == 1) {
          // :2326
          await era.printAndWait(`「啊哈……主人要拿走${sc()}的第一次了吗❤」`); // :2327
          await era.printAndWait(
            `双脚被${master_name}大大的打开的${target_name}满眼桃心的看着自己的那里在重力的作用下慢慢的吞掉肉棒。`,
          ); // :2328
          await era.printAndWait(
            `小小的身体因为疼痛而颤抖着，象征着处女的鲜红色沿着肉棒流下来。`,
          ); // :2329
          await era.printAndWait(
            `但是随之而来的快感让${target_name}忍不住发出了快乐的声音。`,
          ); // :2330
          await era.printAndWait(`「嗯……嗯哈……呀……肉棒……好舒服❤」`); // :2331
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2333
          await era.printAndWait(`「呜呜……主人……这个姿势……好害羞呜……」`); // :2334
          await era.printAndWait(
            `被${master_name}从背后抱起，将双腿大大的打开，摆出像是小便的姿势的${target_name}，羞红着脸看着自己的那里在重力的作用下慢慢的吞掉肉棒，感受着异物慢慢进入到身体里。`,
          ); // :2335
          await era.printAndWait(
            `象征着处女的鲜红色沿着肉棒流下来，滴落到地上。`,
          ); // :2336
          await era.printAndWait(
            `「诶嘿嘿……这样子……${sc()}……就是主人的了呢……好开心❤」`,
          ); // :2337
          await era.printAndWait(
            `虽然因为初次的疼痛而轻轻颤抖着，豆大的泪珠沿着小脸滑落，但${target_name}的脸上却满是幸福的表情。`,
          ); // :2338

          if (chara(target).kojo.接吻) {
            // :2340
            await era.printAndWait(`「嗯啾……呼……哈……」`); // :2341
            await era.printAndWait(
              `任由${master_name}的舌头在自己嘴里舔弄的${target_name}，乖巧的将全部的身体都交给了主人。`,
            ); // :2342
          } // :2343
        } else {
          // :2345
          await era.printAndWait(`「不……不要……那么大……${sc()}……会坏掉的啦……」`); // :2346
          await era.printAndWait(
            `${master_name}舔着${target_name}充满恐惧的小脸，慢慢的放下怀里的小人。`,
          ); // :2347
          await era.printAndWait(
            `无助的看着粗大的肉棒一点点的插入到身体里的${target_name}，感受着自己的身体被异物强行的挤了进来。`,
          ); // :2348
          await era.printAndWait(
            `痛苦让小小的身体用尽全部的力气拼命挣扎着，象征的处女的鲜红色沿着肉棒流下来。`,
          ); // :2349
          await era.printAndWait(
            `将这微不足道的反抗轻松压制的${master_name}，开始毫不怜惜的抽送起来……`,
          ); // :2350
        } // :2351
      } else {
        // :2353

        if (era.get(`talent:${target}:76`) == 1) {
          // :2355
          await era.printAndWait(`「啊哈❤这个姿势的话，一定会插的很深呢❤」`); // :2356
          await era.printAndWait(
            `双脚被${master_name}大大的打开的${target_name}满眼桃心的看着自己的那里在重力的作用下慢慢的吞掉肉棒，发出了快乐的声音。`,
          ); // :2357
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2359
          await era.printAndWait(`「呼啊……主人……嗯……嗯呀……」`); // :2360
          await era.printAndWait(
            `被${master_name}从背后抱起，将双腿大大的打开，摆出像是小便的姿势的${target_name}，羞红着脸看着自己的那里在重力的作用下慢慢的吞掉肉棒，感受着异物慢慢进入到身体里。`,
          ); // :2361
        } else {
          // :2363
          await era.printAndWait(`「不……不要……那么大……${sc()}……会坏掉的啦……」`); // :2364
          await era.printAndWait(
            `${master_name}舔着${target_name}充满恐惧的小脸，慢慢的放下怀里的小人。`,
          ); // :2365
          await era.printAndWait(
            `无助的看着粗大的肉棒一点点的插入到身体里的${target_name}，感受着自己的身体被异物强行的挤了进来。`,
          ); // :2366
        } // :2367
      } // :2368
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :2369
      chara(target).kojo.背面座位 = 1; // :2369
      return 0; // :2370
    } else {
      // :2372

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2374

        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          // :2376
          if (rand_n(4) == 0) {
            // :2377
            await era.printAndWait(`「呀嗯……呜……哈啊……❤」`); // :2378
            await era.printAndWait(`「里面……被这样子顶着……嗯……好棒……❤」`); // :2379
            await era.printAndWait(`「哈呀～肉棒……嗯……❤还，还要更多～❤」`); // :2380
            await era.printAndWait(
              `柔软的肉壁激烈的收缩着，在快感的刺激下不断的分泌着爱液。`,
            ); // :2381
          } else if (rand_n(3) == 0) {
            // :2382
            await era.printAndWait(`「嗯……呀……哈啊……❤」`); // :2383
            await era.printAndWait(
              `被${master_name}抱在怀里侵犯个不停地${target_name}微微的吐着舌头，紧窄的小穴被一次次的撑开，强烈的快感不断的冲击着年幼的身体。`,
            ); // :2384
            await era.printAndWait(
              `${master_name}一边用力抽送着，一边轻咬着小耳朵，说着色色的话语。`,
            ); // :2385
            await era.printAndWait(
              `「${sc()}的……色色的小穴……请主人……更加用力的疼爱吧❤」`,
            ); // :2386
            await era.printAndWait(
              `${target_name}含着手指，说着和稚气的外表完全不符的淫乱的话语回应着${master_name}`,
            ); // :2387
          } else if (rand_n(2) == 0) {
            // :2388
            await era.printAndWait(`「嗯呀……最里面被这样子顶着……要坏掉了啦❤」`); // :2389
            await era.printAndWait(
              `因为重力而每次都被顶到最深处的幼穴用力的吮吸着肉棒，诚实的回应着快感。`,
            ); // :2390
            await era.printAndWait(
              `幼穴的主人，被侵犯的小嘴都合不拢，从喉咙里发出了快乐的声音。`,
            ); // :2391
            await era.printAndWait(
              `透明的爱液从交合的地方滴到地上，拉出一条细细的银丝。`,
            ); // :2392
          } else {
            // :2393
            await era.printAndWait(`「哈啊……主人……这个玩法……好厉害嗯呀～～❤」`); // :2394
            await era.printAndWait(
              `${master_name}将${target_name}高高的抱起来，让肉棒只剩前端的一点留在里面，然后松开手，让小小的身体因为重力落下来，狠狠的顶到最里面。`,
            ); // :2395
            await era.printAndWait(
              `仿佛要冲进子宫的猛烈的抽送产生的强烈快感让幼小的身体完全的瘫软在施暴者怀里。`,
            ); // :2396
          } // :2397
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :2399
          await era.printAndWait(
            `「嗯呀……被肉棒……这样子激烈的侵犯……小穴……好舒服……❤」`,
          ); // :2400
          await era.printAndWait(
            `${master_name}将${target_name}的双腿大大的分开，肆意使用着已经习惯了肉棒的小穴，享受着紧致的快感。`,
          ); // :2401
          await era.printAndWait(
            `被肉棒蹂躏着的幼女，不自觉的发出了快乐的声音。`,
          ); // :2402
        } else {
          // :2404
          await era.printAndWait(`「诶嘿嘿，这个姿势是第一次呢❤」`); // :2405
          await era.printAndWait(`「肉棒……插得好深❤」`); // :2406
        } // :2407
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :2408
        chara(target).kojo.背面座位 = 6; // :2408
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2410

        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          // :2412
          if (rand_n(4) == 0) {
            // :2413
            await era.printAndWait(`「呜……哈啊……嗯……」`); // :2414
            await era.printAndWait(`「主人……最里面……顶到了啦……❤」`); // :2415
            await era.printAndWait(`「肚子里面……好舒服……的说……」`); // :2416
            await era.printAndWait(`「好想……继续下去……嗯……❤」`); // :2417
            await era.printAndWait(
              `怀中的幼女不停的娇喘着，发出了快乐的声音。感受着肉穴快乐的收缩着的${master_name}，更加用力的向上侵犯着。`,
            ); // :2418
          } else if (rand_n(3) == 0) {
            // :2419
            await era.printAndWait(`「啊嗯……呼……嗯呀……❤」`); // :2420
            await era.printAndWait(
              `害羞的捂着小嘴的${target_name}，从纤细的指缝之间仍然时不时漏出甘甜的娇喘声。`,
            ); // :2421
            await era.printAndWait(
              `${master_name}使坏一般的，一边舔着耳朵说着色色的话语，一边更加用力的活动着腰部。`,
            ); // :2422
            await era.printAndWait(`「呜呜……主人……坏……」`); // :2423
            await era.printAndWait(
              `稚气的声音轻轻抱怨着，比起讨厌来说更像是撒娇吧。`,
            ); // :2424
          } else if (rand_n(2) == 0) {
            // :2425
            await era.printAndWait(`「哈呜呜……主人……太……嗯呀……激烈了啦……❤」`); // :2426
            await era.printAndWait(
              `${master_name}将${target_name}高高的抱起来，让肉棒只剩前端的一点留在里面，然后松开手，让小小的身体因为重力落下来，狠狠的顶到最里面。`,
            ); // :2427
            await era.printAndWait(`「这样子……${sc()}……会……嗯……坏掉的❤」`); // :2428
            await era.printAndWait(
              `越是用可爱的声音求饶，就越是会刺激对方施虐的欲望。`,
            ); // :2429
            await era.printAndWait(
              `仿佛要冲进子宫的猛烈的抽送产生的强烈快感让幼小的身体完全的瘫软在施暴者怀里。`,
            ); // :2430
            await era.printAndWait(`……不知道她本人有没有意识到这一点呢？`); // :2431
          } else {
            // :2432
            await era.printAndWait(`「咕……嗯……呼啊啊……」`); // :2433
            await era.printAndWait(
              `「主人的……那个……在肚子里面……塞得满满的……❤」`,
            ); // :2434
            await era.printAndWait(
              `${target_name}微微张着小嘴，眼神有些迷离。`,
            ); // :2435
            await era.printAndWait(
              `到底是因为喜欢主人呢，还是因为喜欢H带来的快感呢，还是二者兼而有之呢？`,
            ); // :2436
            await era.printAndWait(
              `在大脑一片空白的现在大概已经没法思考了吧。`,
            ); // :2437
            await era.printAndWait(
              `透明的爱液从交合的地方滴到地上，拉出一条细细的银丝。`,
            ); // :2438
          } // :2439
        } else if (era.get(`abl:${target}:2`) >= 3) {
          // :2441
          await era.printAndWait(`「呼嗯……主人……嗯呀……」`); // :2442
          await era.printAndWait(
            `双腿被大大分开的${target_name}羞红着脸看着交合的地方。`,
          ); // :2443
          await era.printAndWait(
            `粗大的肉棒毫无道理的在幼女稚嫩的下体抽送着，从那里传来的不是不适，而是巨大的快感。`,
          ); // :2444
          await era.printAndWait(
            `感受着这样快感的幼女，不自觉的发出了快乐的声音。`,
          ); // :2445
        } else {
          // :2447
          await era.printAndWait(`「诶嘿嘿，和主人结合在一起了呢……好开心……❤」`); // :2448
          await era.printAndWait(
            `${target_name}的小手重叠在胸前，感受着体内又粗又热的肉棒。`,
          ); // :2449
          await era.printAndWait(
            `虽然身体还没完全习惯这种事情，但是难受的感觉已经不在了。`,
          ); // :2450
          await era.printAndWait(''); // :2451
        } // :2452
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :2453
        chara(target).kojo.背面座位 = 5; // :2453
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2455
        await era.printAndWait(
          `${master_name}紧紧的抱着怀中的幼女，像使用飞机杯一样肆意抽送着。`,
        ); // :2456
        await era.printAndWait(`「嗯呀……呜……哈呜呜……那里……呀呜……不……要……」`); // :2457
        await era.printAndWait(
          `${target_name}轻轻的哼着，时不时漏出甜美的声音来，虽然嘴上说着不要，身体却诚实的回应着快感。`,
        ); // :2458
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :2459
        chara(target).kojo.背面座位 = 4; // :2459
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2461
        await era.printAndWait(
          `${master_name}紧紧的抱着怀中的幼女，像使用飞机杯一样肆意抽送着。`,
        ); // :2462
        await era.printAndWait(`「嗯呀……呜……哈呜呜……那里……呀呜……不……要……」`); // :2463
        await era.printAndWait(
          `${target_name}轻轻的哼着，稚气的声音混杂着苦闷和快乐。`,
        ); // :2464
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :2465
        chara(target).kojo.背面座位 = 3; // :2465
      } else if (chara(target).kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :2467
        await era.printAndWait(
          `「呜……不要……这样子用力……好难受……肚子……要坏掉了啦……！」`,
        ); // :2468
        await era.printAndWait(
          `毫不理会带着苦痛的求饶，${master_name}肆意的蹂躏着怀中的小人。`,
        ); // :2469
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :2470
        chara(target).kojo.背面座位 = 2; // :2470
      } // :2471
      return 0; // :2472
    } // :2473
  } // :2474

  if (era_flag.selectcom == 26) {
    // :2479

    if (chara(target).kojo.正常位肛交 == 0) {
      // :2481

      if (era.get(`talent:${target}:76`) == 1) {
        // :2483
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2484
          await era.printAndWait(`「屁股……吗……？嗯～请用吧～❤」`); // :2485
          await era.printAndWait(
            `${target_name}顺从的躺着，大大的分开双脚，等待着${master_name}的宠幸。`,
          ); // :2486
          await era.printAndWait(
            `${master_name}将肉棒的前端对准粉嫩的雏菊，然后毫不怜惜的用力顶了进去，敏感的肉穴紧紧的包裹住肉棒，不停的吸吮着。`,
          ); // :2487
        } else {
          // :2488
          await era.printAndWait(`「屁股……吗……？嗯～请用吧～❤」`); // :2489
          await era.printAndWait(
            `${target_name}顺从的躺着，大大的分开双脚，等待着${master_name}的宠幸。`,
          ); // :2490
          await era.printAndWait(
            `${master_name}将肉棒的前端对准粉嫩的雏菊，然后毫不怜惜的用力顶了进去。`,
          ); // :2491
        } // :2492
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2494
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2495
          await era.printAndWait(`「呼诶……屁股什么的……主人H……」`); // :2496
          await era.printAndWait(
            `${target_name}躺在床上，羞红着小脸，轻轻的咬着手指，有些害怕又有些期待的看着${master_name}。`,
          ); // :2497
          await era.printAndWait(
            `${master_name}抓住纤细的脚踝分开双腿，将肉棒一口气顶了进去，敏感的肉穴紧紧的包裹住肉棒，不停的吸吮着。`,
          ); // :2498
        } else {
          // :2499
          await era.printAndWait(`「呼诶……屁股什么的……主人H……」`); // :2500
          await era.printAndWait(
            `${target_name}躺在床上，羞红着小脸，轻轻的咬着手指，有些害怕又有些期待的看着${master_name}。`,
          ); // :2501
          await era.printAndWait(
            `${master_name}抓住纤细的脚踝分开双腿，将肉棒一口气顶了进去。`,
          ); // :2502
        } // :2503
      } else {
        // :2505
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2506
          await era.printAndWait(`「呼啊啊啊……屁股什么的……不……不行……」`); // :2507
          await era.printAndWait(
            `后面被调教过的${target_name}，努力的想忍耐着肉棒初次进入的快感。`,
          ); // :2508
        } else {
          // :2509
          await era.printAndWait(`「你要干什么……不要……不要啊……」`); // :2510
          await era.printAndWait(
            `${target_name}被压在床上，惊恐的看着${master_name}，小小的身体连一点点的反抗都做不到。`,
          ); // :2511
          await era.printAndWait(
            `强硬将对方的双腿分开，暴露出雏菊出来的${master_name}，粗暴的将肉棒插了进去。`,
          ); // :2512
        } // :2513
      } // :2515
      // CFLAG:327  = 1（变量语义：CFLAG 族，327） // :2516
      chara(target).kojo.正常位肛交 = 1; // :2516
      return 0; // :2517
    } else {
      // :2519

      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2521
        if (rand_n(3) == 0) {
          // :2522
          await era.printAndWait(`「呼嗯……呀……屁股……嗯……❤」`); // :2523
          await era.printAndWait(`「主人的肉棒……侵犯后面的感觉……好棒……❤」`); // :2524
          await era.printAndWait(`「主人，还要，还想要更多～❤」`); // :2525
          await era.printAndWait(
            `沉溺于异样的快感的${target_name}，紧紧的缠着${master_name}的腰部，一刻都不愿意松开。`,
          ); // :2526
        } else if (rand_n(2) == 0) {
          // :2527
          await era.printAndWait(`「嗯啊……屁股……好舒服……❤」`); // :2528
          if (era.get(`talent:${target}:0`) == 1) {
            // :2530
            await era.printAndWait(
              `「虽然前面也想要和主人做……但是……屁股也不坏的感觉呢❤」`,
            ); // :2530
          } // :2530
          await era.printAndWait(
            `「呐……主人……，请更加的……对${sc()}……做H的事情吧❤」`,
          ); // :2531
          await era.printAndWait(
            `幼嫩的肉壁紧紧吸吮着${master_name}肉棒，贪图着异样的快感。`,
          ); // :2532
        } else {
          // :2533
          await era.printAndWait(
            `「呼啊，主人……这么激烈的话，呜，要去了啦～❤」`,
          ); // :2534
          await era.printAndWait(
            `幼小的肉壁因为强烈的快感用力的紧缩着，小孩子特有的高体温包绕着粗大的肉棒。`,
          ); // :2535
          await era.printAndWait(
            `享受着被肠壁上的褶皱剐蹭的感觉，${master_name}更加用力的抽送起来。`,
          ); // :2536
        } // :2537
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :2538
        chara(target).kojo.正常位肛交 = 6; // :2538
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2540
        await era.printAndWait(
          `「嗯呼……主人的肉棒……好厉害……在身体里面……嗯……❤」`,
        ); // :2541
        await era.printAndWait(
          `${master_name}的肉棒在被多次调教过的雏菊中来回抽送着，感受着温热的雏菊带来的快感。`,
        ); // :2542
        await era.printAndWait(`「哈呀……❤这样子用力的话……哈呜呜～～❤」`); // :2543
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :2544
        chara(target).kojo.正常位肛交 = 5; // :2544
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2546
        await era.printAndWait(`「啊哈，好开心，又和主人做H的事情了呢❤」`); // :2547
        await era.printAndWait(
          `稚气的声音发出了可爱的娇喘声，小小的脚随着${master_name}的抽插在半空中晃动着。`,
        ); // :2548
        await era.printAndWait(`「和主人H什么的最棒了❤」`); // :2549
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :2550
        chara(target).kojo.正常位肛交 = 4; // :2550
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2552
        if (rand_n(3) == 0) {
          // :2553
          await era.printAndWait(`「嗯……咕……主人……❤」`); // :2554
          await era.printAndWait(`「和主人做这样子的事情……好开心……❤」`); // :2555
          if (era.get(`talent:${target}:0`) == 1) {
            // :2557
            await era.printAndWait(
              `「第一次什么的……已经无所谓了……只要能和主人这样子结合在一起……就满足了的说❤」`,
            ); // :2557
          } // :2557
          await era.printAndWait(`「主人，最喜欢了～❤」`); // :2558
          // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :2559
          chara(target).kojo.正常位肛交 = 6; // :2559
        } else if (rand_n(2) == 0) {
          // :2560
          if (era.get(`talent:${target}:0`) == 1) {
            // :2562
            await era.printAndWait(
              `「呼啊啊……虽然很想让主人把第一次拿走……但是……」`,
            ); // :2562
          } // :2562
          await era.printAndWait(`「屁股……被主人……这样子侵犯……哈呜呜～❤」`); // :2563
          await era.printAndWait(`「感觉……好舒服……的说……❤」`); // :2564
          await era.printAndWait(
            `${target_name}搂着${master_name}的脖子，闭着眼睛感受着异物在身体内来回抽动的感觉，在快感的刺激下不住的娇喘着。`,
          ); // :2565
        } else {
          // :2566
          await era.printAndWait(
            `「呀呜呜～这样子激烈的的侵犯的话……要，要坏掉了啦～❤」`,
          ); // :2567
          await era.printAndWait(
            `被${master_name}粗暴的侵犯着的${target_name}紧紧抓着床单。`,
          ); // :2568
          await era.printAndWait(
            `虽然挂着泪珠，但从嘴里发出来的却是快乐的声音。`,
          ); // :2569
        } // :2570
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :2571
        chara(target).kojo.正常位肛交 = 6; // :2571
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2573

        if (era.get(`talent:${target}:0`) == 1) {
          // :2576
          await era.printAndWait(
            `「呜……该说是主人的癖好吗……但是……后面也……不坏的感觉……」`,
          ); // :2576
        } // :2576
        await era.printAndWait(`「被主人玩弄……很舒服……的说……」`); // :2577
        await era.printAndWait(
          `${master_name}在已经被反复调教过的雏菊中反复抽送，享受着稚嫩的肉壁剐蹭着肉棒的感觉。`,
        ); // :2578
        await era.printAndWait(
          `害羞的捂着脸的${target_name}，时不时会从指缝中漏出可爱的声音。`,
        ); // :2579

        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :2581
        chara(target).kojo.正常位肛交 = 5; // :2581
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2583
        await era.printAndWait(
          `「呜嗯……没，没问题的……只要是主人的要求……不管是什么${sc()}都……哈呜呜～！」`,
        ); // :2584
        await era.printAndWait(
          `${master_name}用肉棒强硬的在尚未开发的雏菊中抽送着，享受着肉壁排斥着异物的感觉。`,
        ); // :2585
        await era.printAndWait(
          `比起快感来说痛苦更多一些的${target_name}努力的忍耐着，大口的喘着气。`,
        ); // :2586
        if (era.get(`talent:${target}:0`) == 1) {
          // :2588
          await era.printAndWait(
            `「哈呜……如果这样都忍受不住的话……那第一次的时候就不能好好的侍奉主人了……」`,
          ); // :2588
        } // :2588
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :2589
        chara(target).kojo.正常位肛交 = 4; // :2589
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2591
        await era.printAndWait(`「啊……嗯……哈呀啊……不……行……」`); // :2592
        await era.printAndWait(
          `${master_name}在已经被反复调教过的雏菊中反复抽送，享受着稚嫩的肉壁剐蹭着肉棒的感觉。`,
        ); // :2593
        await era.printAndWait(
          `虽然精神上还有些抵抗，但肉体已经逐渐开始习惯了。`,
        ); // :2594
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :2595
        chara(target).kojo.正常位肛交 = 3; // :2595
      } else if (
        chara(target).kojo.正常位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :2597
        await era.printAndWait(`「呜呜……好痛……求求你……不……要……呀呜……」`); // :2598
        await era.printAndWait(
          `${master_name}无视着幼女的哭喊声，一次次强硬的拓开紧缩的雏菊。`,
        ); // :2599
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :2600
        chara(target).kojo.正常位肛交 = 2; // :2600
      } // :2601
      return 0; // :2602
    } // :2603
  } // :2604

  if (era_flag.selectcom == 27) {
    // :2609

    if (chara(target).kojo.背后位肛交 == 0) {
      // :2611

      if (era.get(`talent:${target}:76`) == 1) {
        // :2613
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2614
          await era.printAndWait(
            `「诶～要用屁股吗……嗯～可以哟～因为被主人玩弄屁股很舒服嘛～❤」`,
          ); // :2615
          await era.printAndWait(
            `${target_name}趴在床上，主动的用小手分开雏菊，露出了鲜嫩的粉红色。`,
          ); // :2616
          await era.printAndWait(
            `看到这一幕的${master_name}，毫不犹豫的把肉棒插了进去……`,
          ); // :2617
        } else {
          // :2618
          await era.printAndWait(
            `「啊哈……❤屁股什么的……会舒服的话……可以哟～❤」`,
          ); // :2619
          await era.printAndWait(
            `${target_name}用小手分开了还没有多少经验的雏菊，迎接${master_name}的肉棒。`,
          ); // :2620
        } // :2621
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2623
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2624
          await era.printAndWait(
            `「呼啊啊……进……进来了……主人的那个……哈啊啊……在里面……好……舒服……」`,
          ); // :2625
          await era.printAndWait(
            `感受着屁股传来了比平时的调教更加强烈的刺激，${target_name}紧紧的抓着床单，感受着${master_name}的肉棒在体内抽送带来的一样的快感。`,
          ); // :2626
        } else {
          // :2627
          await era.printAndWait(`「哈呜呜……屁股里面……主人的那个……呀……」`); // :2628
          await era.printAndWait(
            `${master_name}用一只手轻松的按着幼小的身体，另一只手握着肉棒毫不怜惜的插进了未经开发的雏菊中。`,
          ); // :2629
        } // :2630
      } else {
        // :2632
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2633
          await era.printAndWait(`「呼……呀……不要……嗯……」`); // :2634
          await era.printAndWait(
            `虽然非常的不情愿，但是从身体里传来的快感，还是让${target_name}忍不住轻轻的发出了娇喘声。`,
          ); // :2635
        } else {
          // :2636
          await era.printAndWait(`「哈呜呜，不行～屁股不行～呜呀～」`); // :2637
          await era.printAndWait(
            `${master_name}轻松的压制住了${target_name}的反抗，然后将肉棒插进了未经开发的雏菊中蹂躏起来……`,
          ); // :2638
        } // :2639
      } // :2640
      // CFLAG:328  = 1（变量语义：CFLAG 族，328） // :2641
      chara(target).kojo.背后位肛交 = 1; // :2641
      return 0; // :2642
    } else {
      // :2644

      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2646
        if (rand_n(3) == 0) {
          // :2647
          await era.printAndWait(`「哈咕……呜……嗯呀～～❤」`); // :2648
          await era.printAndWait(
            `「肉棒……好舒服……在屁股里面，好舒服呜呜～～❤」`,
          ); // :2649
          await era.printAndWait(
            `「屁股好舒服呜呜，感觉，要，要飞起来了嗯嗯❤」`,
          ); // :2650
          await era.printAndWait(`稚嫩的菊穴不停的按摩着肉棒，贪图着快感。`); // :2651
          await era.printAndWait(
            `${target_name}像小狗一样伏在${master_name}的身下，吐着舌头，积极的回应着粗暴的抽送。`,
          ); // :2652
        } else if (rand_n(2) == 0) {
          // :2653
          await era.printAndWait(`「啊嗯～呀～哈啊～❤」`); // :2654
          await era.printAndWait(`「屁股，好舒服～嗯～❤」`); // :2655
          if (era.get(`talent:${target}:0`) == 1) {
            // :2657
            await era.printAndWait(
              `「小穴什么的……哈啊～❤已经无所谓了，只要能被主人玩弄后面什么的～❤」`,
            ); // :2657
          } // :2657
          await era.printAndWait(
            `像小狗一样趴着的${target_name}，感受着在屁股里用力抽送的肉棒，露出了恍惚的神情。`,
          ); // :2658
          await era.printAndWait(`「主人，还要，还想要更多～❤」`); // :2659
        } else {
          // :2660
          await era.printAndWait(
            `「呼嗯……被主人侵犯屁股什么的……真是太舒服了……❤」`,
          ); // :2661
          await era.printAndWait(`「肉棒什么的，一直待在里面就好了呢❤」`); // :2662
          await era.printAndWait(
            `被按在桌子上抽送的${target_name}，回过头看着${master_name}，小小的眼睛里充满着欲望。`,
          ); // :2663
          await era.printAndWait(`「呼啊啊，不行，这样子的话，呜嗯～❤」`); // :2664
        } // :2665
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :2666
        chara(target).kojo.背后位肛交 = 6; // :2666
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        // :2668
        await era.printAndWait(
          `「啊哈……❤主人的肉棒在屁股里面……呼嗯……好有感觉……❤」`,
        ); // :2669
        await era.printAndWait(
          `已经经过数次调教的雏菊已经能从H中充分的感受到快感。`,
        ); // :2670
        await era.printAndWait(
          `${master_name}紧握着纤细的腰部，毫不留情的蹂躏着白嫩的小屁股。`,
        ); // :2671
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :2672
        chara(target).kojo.背后位肛交 = 5; // :2672
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2674
        await era.printAndWait(`「哈咕……嗯……主人……呀……真是粗暴呢，主人……❤」`); // :2675
        await era.printAndWait(
          `${master_name}强硬的在未经开发的雏菊中抽送着，将幼嫩的肉壁当成飞机杯一样使用着。`,
        ); // :2676
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :2677
        chara(target).kojo.背后位肛交 = 4; // :2677
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2679
        if (rand_n(3) == 0) {
          // :2680
          await era.printAndWait(`「嗯呼……呀……呼啊啊……」`); // :2681
          await era.printAndWait(`「主人的那个……呜……好舒服……好舒服的说……」`); // :2682
          await era.printAndWait(`「其他的事情……已经没办法思考了啦……❤」`); // :2683
          await era.printAndWait(
            `${target_name}努力的抬起下半身，积极的回应着粗暴的抽送。`,
          ); // :2684
          await era.printAndWait(
            `紧致的雏菊用力的压榨着肉棒，分泌着润滑液，让抽送更加顺利。`,
          ); // :2685
        } else if (rand_n(2) == 0) {
          // :2686
          await era.printAndWait(`「嗯……主人……呜呀……」`); // :2687
          await era.printAndWait(`「屁股……感觉……嗯……不坏呢……」`); // :2688
          if (era.get(`talent:${target}:0`) == 1) {
            // :2689
            await era.printAndWait(`「虽然……很想让主人拿走第一次……」`); // :2690
            await era.printAndWait(`「但是……屁股……呼啊啊啊……好舒服……❤」`); // :2691
          } // :2692
          await era.printAndWait(
            `像小狗一样趴着的${target_name}，感受着在屁股里用力抽送的肉棒，露出了恍惚的神情。`,
          ); // :2693
          await era.printAndWait(`「主人，不……不要停下来……呜嗯……」`); // :2694
        } else {
          // :2695
          await era.printAndWait(`「呼嗯……和主人做……H的事情……好开心……❤」`); // :2696
          await era.printAndWait(`「后面……请随便主人……呼啊啊……使用的说……」`); // :2697
          await era.printAndWait(
            `被按在桌子上抽送的${target_name}，发出了可爱的娇喘声。`,
          ); // :2698
          await era.printAndWait(
            `「主人……这样子弄的话……呜呜……要，要去了啦～」`,
          ); // :2699
        } // :2700
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :2701
        chara(target).kojo.背后位肛交 = 6; // :2701
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2703
        if (era.get(`talent:${target}:0`) == 1) {
          // :2705
          await era.printAndWait(
            `「虽然第一次……还没有……但是……呜……这样子……也不错……」`,
          ); // :2705
        } // :2705
        await era.printAndWait(`「嗯呼……呜……嗯呀……哈啊啊……」`); // :2706
        await era.printAndWait(
          `已经经过数次调教的雏菊已经能从H中充分的感受到快感。`,
        ); // :2707
        await era.printAndWait(
          `${master_name}毫不留情的握着纤细的腰部，粗暴的蹂躏着雏菊。。`,
        ); // :2708
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :2709
        chara(target).kojo.背后位肛交 = 5; // :2709
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2711
        await era.printAndWait(`「哈呜呜……主人……呜……请，请温柔一点的说……」`); // :2712
        await era.printAndWait(
          `${master_name}强硬的在未经开发的雏菊中抽送着，将幼嫩的肉壁紧紧吸着肉棒，给肉棒送去快感。`,
        ); // :2713
        if (era.get(`talent:${target}:0`) == 1) {
          // :2715
          await era.printAndWait(
            `「呜呜……比起后面来说……还是更想要主人……那个……第一次呜呜……」`,
          ); // :2715
        } // :2715
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :2716
        chara(target).kojo.背后位肛交 = 4; // :2716
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2718
        await era.printAndWait(`「呜……哈……啊咕……」`); // :2719
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，屈辱的翘着小屁股，任由${master_name}侵犯着自己的后面。`,
        ); // :2720
        await era.printAndWait(
          `（呜呜……这种事……明明讨厌这样子的……为什么……感觉……呜……好奇怪……）`,
        ); // :2721
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :2722
        chara(target).kojo.背后位肛交 = 3; // :2722
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :2724
        await era.printAndWait(
          `「呜呜……不要……这样子的……不要了啦……好难受……！」`,
        ); // :2725
        await era.printAndWait(
          `${master_name}无视着哭声，将幼女按倒在身下，毫不留情的在未开发的雏菊里抽送着。`,
        ); // :2726
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :2727
        chara(target).kojo.背后位肛交 = 2; // :2727
      } // :2728
      return 0; // :2729
    } // :2730
  } // :2731

  if (era_flag.selectcom == 28) {
    // :2736

    if (chara(target).kojo.对面座位肛交 == 0) {
      // :2738

      if (era.get(`talent:${target}:76`) == 1) {
        // :2740
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2741
          await era.printAndWait(
            `「呼啊啊……主人的肉棒……进来了……舒服的事情……好喜欢呢……❤」`,
          ); // :2742
          await era.printAndWait(
            `${target_name}露出了色气满满的表情，积极的扭动着腰部。`,
          ); // :2743
        } else {
          // :2744
          await era.printAndWait(
            `「啊……呼啊啊……主人……动一动……也是……没问题的……❤」`,
          ); // :2745
          await era.printAndWait(
            `温热的雏菊缓缓的将肉棒吞下，嫩嫩的肉壁在刺激下不住的蠕动着。`,
          ); // :2746
        } // :2747
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2749
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2750
          await era.printAndWait(`「嗯……呀……主人的……呼啊啊……」`); // :2751
          await era.printAndWait(
            `${target_name}的小脸紧贴着${master_name}胸口，在下半身传来的快感中轻声的娇喘着。`,
          ); // :2752
          await era.printAndWait(`「嗯……主人……最喜欢了……❤」`); // :2753
        } else {
          // :2754
          await era.printAndWait(`「哈呜呜……主人的那个……全部都……进去了呢……」`); // :2755
          await era.printAndWait(
            `${target_name}被${master_name}抱着，粗大的肉棒完全没入了紧致的雏菊中。小脸害羞的埋在${master_name}的身上。`,
          ); // :2756
        } // :2757
      } else {
        // :2759
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2760
          await era.printAndWait(
            `「啊……呜呜……不，不要……这种事……舒服什么的……」`,
          ); // :2761
          await era.printAndWait(
            `虽然嘴上说着不愿意，但雏菊却积极的迎合着插入的异物，紧紧的吸住不放。`,
          ); // :2762
        } else {
          // :2763
          await era.printAndWait(`「呜呜……不要……屁股什么的……呀……」`); // :2764
          await era.printAndWait(
            `被${master_name}抱在怀里侵犯着的${target_name}小手徒劳的推搡着。`,
          ); // :2765
        } // :2766
      } // :2767
      // CFLAG:329  = 1（变量语义：CFLAG 族，329） // :2768
      chara(target).kojo.对面座位肛交 = 1; // :2768
      return 0; // :2769
    } else {
      // :2771

      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2773
        if (rand_n(2)) {
          // :2774
          if (era.get(`talent:${target}:0`) == 1) {
            // :2776
            await era.printAndWait(
              `「呼啊啊～小穴什么的……已经无所谓了～虽然也很想让主人拿走第一次……但是用后面做实在是超舒服的呐～❤」`,
            ); // :2776
          } // :2776
          await era.printAndWait(`「感觉已经要……嗯呀❤～要坏掉了～❤」`); // :2777
          await era.printAndWait(
            `${master_name}紧握着纤细的腰部，像使用道具一般粗暴的侵犯着怀里的小人。`,
          ); // :2778
          await era.printAndWait(
            `「主人，嗯哈～～❤已经没办法思考别的事情了，更加，用力一点，嗯～❤」`,
          ); // :2779
        } else {
          // :2780
          if (era.get(`talent:${target}:0`) == 1) {
            // :2782
            await era.printAndWait(
              `「哈啊……虽然第一次还在……有点遗憾……但是使用后面也很棒呢❤」`,
            ); // :2782
          } // :2782
          await era.printAndWait(
            `被抱在怀里侵犯着的${target_name}，在肉棒的抽送下一次次的发出了色色的娇喘声。`,
          ); // :2783
          await era.printAndWait(`「啊啊……主人……屁股……还想要更多……❤」`); // :2784
          await era.printAndWait(
            `经过调教的雏菊熟练的吮吸着肉棒，一点缝隙都不留的压榨着。`,
          ); // :2785
        } // :2786
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :2787
        chara(target).kojo.对面座位肛交 = 6; // :2787
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        // :2789
        if (era.get(`talent:${target}:0`) == 1) {
          // :2791
          await era.printAndWait(
            `「嗯……后面吗……不过也希望主人拿走第一次呢……」`,
          ); // :2791
        } // :2791
        await era.printAndWait(
          `${target_name}搂着${master_name}的脖子，积极的迎合着动作。`,
        ); // :2792
        await era.printAndWait(`「但是……呜呜……好……舒服～❤」`); // :2793
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :2794
        chara(target).kojo.对面座位肛交 = 5; // :2794
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2796
        await era.printAndWait(`「啊……嗯呀……主人的肉棒……在身体里面……❤」`); // :2797
        await era.printAndWait(
          `没经过几次调教的雏菊生涩的收缩着，紧紧箍住肉棒。`,
        ); // :2798
        await era.printAndWait(`「嗯呀～主人，这么激烈的话……❤」`); // :2799
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :2800
        chara(target).kojo.对面座位肛交 = 4; // :2800
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2802
        if (rand_n(2)) {
          // :2803
          if (era.get(`talent:${target}:0`) == 1) {
            // :2804
            await era.printAndWait(
              `「主人……呜呜……后面什么的……请……更多的……疼爱一些……❤」`,
            ); // :2805
            await era.printAndWait(
              `「小穴会一直为主人……留着的……所以……请更加的……后面……嗯哈……」`,
            ); // :2806
          } // :2807
          await era.printAndWait(
            `「呼啊啊啊……屁股……好舒服……被主人的……嗯……那个……这样子粗暴的……哈啊啊❤」`,
          ); // :2808
          await era.printAndWait(
            `被${master_name}紧握着腰部，粗暴的使用着的${target_name}，在快感的刺激下吐着小舌头，发出了甜美的声音。`,
          ); // :2809
          await era.printAndWait(`「脑袋已经……呼啊啊……一片空白了呢……❤」`); // :2810
        } else {
          // :2811
          if (era.get(`talent:${target}:0`) == 1) {
            // :2813
            await era.printAndWait(
              `「主人……嗯……屁股……很舒服呢……小穴的第一次也……想让主人拿走……」`,
            ); // :2813
          } // :2813
          await era.printAndWait(
            `「这样子用屁股做……呼啊啊……也，也不坏……的说……」`,
          ); // :2814
          await era.printAndWait(
            `${target_name}的小脸紧贴着${master_name}的胸口，在快感的刺激下不住的娇喘着。`,
          ); // :2815
          await era.printAndWait(
            `「嗯呀……呼啊啊……感觉……整个人都……要融化了呢❤」`,
          ); // :2816
        } // :2817
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :2818
        chara(target).kojo.对面座位肛交 = 6; // :2818
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        // :2820
        if (era.get(`talent:${target}:0`) == 1) {
          // :2822
          await era.printAndWait(
            `「虽然这样被主人疼爱也……很开心……但是第一次……还是很在意……」`,
          ); // :2822
        } // :2822
        await era.printAndWait(`「呜呜……主人……嗯……哈啊……❤」`); // :2823
        await era.printAndWait(
          `${master_name}肆意蹂躏着怀中的小人，一次次的将肉棒粗暴的插了进去。`,
        ); // :2824
        await era.printAndWait(`「啊呜呜，屁股要……呼啊啊……要坏掉了啦～」`); // :2825
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :2826
        chara(target).kojo.对面座位肛交 = 5; // :2826
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2828
        await era.printAndWait(`「主人的那个……呜……全都……进来了呢……」`); // :2829
        await era.printAndWait(
          `努力忍耐着屁股传来的异物感，${target_name}在${master_name}怀里轻轻颤抖着。`,
        ); // :2830
        await era.printAndWait(`「为了主人的话……这点事情……不算什么呢……」`); // :2831
        if (era.get(`talent:${target}:0`) == 1) {
          // :2833
          await era.printAndWait(`「但是……主人……第一次……那个……」`); // :2833
        } // :2833
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :2834
        chara(target).kojo.对面座位肛交 = 4; // :2834
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2836
        await era.printAndWait(`「哈呜呜……屁股什么的……呀……明明……不行的说……」`); // :2837
        await era.printAndWait(
          `在${master_name}粗暴的使用下，却感受到不断传来的快感的${target_name}紧握着小手，努力的忍耐着快感，从嘴角漏出了可爱的娇喘声。`,
        ); // :2838
        await era.printAndWait(`「啊呜……哈啊……嗯……呀……这种……事情……哈呀……❤」`); // :2839
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :2840
        chara(target).kojo.对面座位肛交 = 3; // :2840
      } else if (
        chara(target).kojo.对面座位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :2842
        await era.printAndWait(`「呜呜，不，不要～屁股……好难受呜……」`); // :2843
        await era.printAndWait(
          `${target_name}轻轻的抽泣着，幼小的身体拼命的排斥着入侵的异物。`,
        ); // :2844
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :2845
        chara(target).kojo.对面座位肛交 = 2; // :2845
      } // :2846
      return 0; // :2847
    } // :2848
  } // :2849

  if (era_flag.selectcom == 29) {
    // :2854

    if (chara(target).kojo.骑乘位肛交 == 0) {
      // :2856

      if (era.get(`talent:${target}:76`) == 1) {
        // :2858
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2859
          await era.printAndWait(`「嗯……能感觉的到主人的肉棒呢……诶嘿嘿❤」`); // :2860
          await era.printAndWait(
            `${target_name}发出了快乐的呻吟声，肉壁不断的紧缩着。`,
          ); // :2861
        } else {
          // :2862
          await era.printAndWait(`「主人的肉棒……呼啊……插的好深呢……❤」`); // :2863
          await era.printAndWait(
            `${master_name}从后面抱着${target_name}，将肉棒插进了雏菊中。`,
          ); // :2864
        } // :2865
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2867
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2868
          await era.printAndWait(`「呼啊啊……主人的那个……全都……呀……进来了……」`); // :2869
          await era.printAndWait(
            `${target_name}靠着${master_name}，将身体完全的交给了对方。`,
          ); // :2870
          await era.printAndWait(`「请主人……哈啊……随便使用的说……❤」`); // :2871
        } else {
          // :2872
          await era.printAndWait(`「哈呜呜……主人的那个……嗯……可以……动的哟……」`); // :2873
          await era.printAndWait(
            `${target_name}被${master_name}从后面抱着，粗大的肉棒完全没入了紧致的雏菊中。`,
          ); // :2874
        } // :2875
      } else {
        // :2877
        if (era.get(`abl:${target}:3`) >= 3) {
          // :2878
          await era.printAndWait(
            `「啊……呜呜……不，不要……这样子……好害羞呜呜……」`,
          ); // :2879
          await era.printAndWait(
            `虽然嘴上说着不愿意，但雏菊却积极的迎合着插入的异物，紧紧的吸住不放。`,
          ); // :2880
        } else {
          // :2881
          await era.printAndWait(`「呜呜……不要……讨厌……」`); // :2882
          await era.printAndWait(
            `被${master_name}抱在怀里侵犯着的${target_name}微弱的挣扎着。`,
          ); // :2883
        } // :2884
      } // :2885
      // CFLAG:337  = 1（变量语义：CFLAG 族，337） // :2886
      chara(target).kojo.骑乘位肛交 = 1; // :2886
      return 0; // :2887
    } else {
      // :2889

      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2891
        if (rand_n(2)) {
          // :2892
          if (era.get(`talent:${target}:0`) == 1) {
            // :2894
            await era.printAndWait(
              `「呼啊啊～小穴的第一次什么的……虽然也很想让主人拿走第一次……呜，那种事怎么样都好了～❤」`,
            ); // :2894
          } // :2894
          await era.printAndWait(
            `「主人，请更加……呜呜～更加的用力侵犯${sc()}吧❤」`,
          ); // :2895
          await era.printAndWait(
            `${master_name}粗暴的使用着怀里的幼女，仿佛只是一个道具一样。`,
          ); // :2896
          await era.printAndWait(`「呼啊啊，主人，主人嗯嗯嗯～～❤」`); // :2897
        } else {
          // :2898
          if (era.get(`talent:${target}:0`) == 1) {
            // :2900
            await era.printAndWait(
              `「哈啊……虽然前面还一次都没做过……但是使用后面也超舒服呢❤」`,
            ); // :2900
          } // :2900
          await era.printAndWait(
            `被抱在怀里一次次起伏着的${target_name}，稚气的声音发出了甜美的娇喘声。`,
          ); // :2901
          await era.printAndWait(`「啊啊……主人……不要……停下来……❤」`); // :2902
          await era.printAndWait(
            `柔软的雏菊贪图着快感，紧紧的包裹着，吮吸着肉棒。`,
          ); // :2903
        } // :2904
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :2905
        chara(target).kojo.骑乘位肛交 = 6; // :2905
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        // :2907
        if (era.get(`talent:${target}:0`) == 1) {
          // :2909
          await era.printAndWait(
            `「这样虽然也不错……但是要是连前面也做了就好了呢❤」`,
          ); // :2909
        } // :2909
        await era.printAndWait(
          `${target_name}积极的迎合着${master_name}的动作。`,
        ); // :2910
        await era.printAndWait(`「但是……呜呜……哈啊啊……好……舒服～❤」`); // :2911
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :2912
        chara(target).kojo.骑乘位肛交 = 5; // :2912
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2914
        await era.printAndWait(`「哈啊……主人的肉棒……最喜欢了……❤」`); // :2915
        await era.printAndWait(
          `生涩的雏菊虽然有些排斥异物，但身体的意识却迎合着${master_name}。`,
        ); // :2916
        await era.printAndWait(`「嗯呀～主人，这么激烈的话……❤」`); // :2917
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :2918
        chara(target).kojo.骑乘位肛交 = 4; // :2918
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :2920
        if (rand_n(2)) {
          // :2921
          if (era.get(`talent:${target}:0`) == 1) {
            // :2922
            await era.printAndWait(`「被主人使用后面……呼啊啊……好开心❤」`); // :2923
            await era.printAndWait(`「不管身体的哪里……都是主人的呐……❤」`); // :2924
          } // :2925
          await era.printAndWait(`「嗯……脑子已经……没办法想别的事情了……」`); // :2926
          await era.printAndWait(
            `被粗暴使用着的${target_name}，不停的娇喘着，稚气的声音里充满着爱意。`,
          ); // :2927
          await era.printAndWait(
            `${master_name}一边抽送着，一边轻咬着怀中小人的耳朵。`,
          ); // :2928
          await era.printAndWait(`「${sc()}的……全部……都是……主人呢……❤」`); // :2929
        } else {
          // :2930
          if (era.get(`talent:${target}:0`) == 1) {
            // :2932
            await era.printAndWait(
              `「呜呜……${sc()}的第一次……也想交给主人呢……」`,
            ); // :2932
          } // :2932
          await era.printAndWait(`「呜呜……但是……用后面……也……好舒服的说……」`); // :2933
          await era.printAndWait(`${target_name}轻咬着手指，呼出甜美的热气。`); // :2934
          await era.printAndWait(`「呜呜……要，要坏掉了……啦……❤」`); // :2935
        } // :2936
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :2937
        chara(target).kojo.骑乘位肛交 = 6; // :2937
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        // :2939
        if (era.get(`talent:${target}:0`) == 1) {
          // :2941
          await era.printAndWait(
            `「虽然和主人做很开心……但是……要是连第一次也拿走就好了……」`,
          ); // :2941
        } // :2941
        await era.printAndWait(`「但是……哈啊……主人的全部……都喜欢……❤」`); // :2942
        await era.printAndWait(
          `感受着蹂躏自己的肉棒，${target_name}露出了恍惚的表情。`,
        ); // :2943
        await era.printAndWait(`「呜呜，屁股那里……呜……好……舒服……」`); // :2944
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :2945
        chara(target).kojo.骑乘位肛交 = 5; // :2945
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2947
        await era.printAndWait(`「主人……${sc()}……没问题的……」`); // :2948
        await era.printAndWait(
          `努力忍耐着屁股传来的异物感，${target_name}在${master_name}怀里轻轻颤抖着。`,
        ); // :2949
        await era.printAndWait(`「为了主人的话……这点事情……不算什么呢……」`); // :2950
        if (era.get(`talent:${target}:0`) == 1) {
          // :2952
          await era.printAndWait(`「但是……主人……果然还是喜欢后面一些咩……？」`); // :2952
        } // :2952
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :2953
        chara(target).kojo.骑乘位肛交 = 4; // :2953
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2955
        await era.printAndWait(`「呜呜……舒服什么的……才……没有……」`); // :2956
        await era.printAndWait(
          `在${master_name}粗暴的使用下，却感受到不断传来的快感的${target_name}捂着小嘴，努力的不发出可爱的声音。`,
        ); // :2957
        await era.printAndWait(
          `「啊呜……哈啊……嗯……才……没有……呼啊啊……绝对……没有……的说……❤」`,
        ); // :2958
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :2959
        chara(target).kojo.骑乘位肛交 = 3; // :2959
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :2961
        await era.printAndWait(`「呜呜，不，不要～屁股……好难受呜……」`); // :2962
        await era.printAndWait(
          `${target_name}擦拭着眼角，幼小的身体拼命的排斥着入侵的异物。`,
        ); // :2963
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :2964
        chara(target).kojo.骑乘位肛交 = 2; // :2964
      } // :2965
      return 0; // :2966
    } // :2967
  } // :2968

  if (era_flag.selectcom == 30) {
    // :2973

    if (chara(target).kojo.手淫 == 0) {
      // :2975

      if (era.get(`talent:${target}:76`) == 1) {
        // :2977
        await era.printAndWait(`「诶嘿嘿，肉棒桑很精神呢❤」`); // :2978
        await era.printAndWait(
          `仿佛拿到了新玩具的小孩子一样，${target_name}爱不释手的揉捏着坚挺的肉棒。`,
        ); // :2979
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2981
        await era.printAndWait(`「主人的肉棒……仔细看的话……好大……的说……」`); // :2982
        await era.printAndWait(
          `${target_name}红着小脸，用小手揉捏着坚挺的肉棒。`,
        ); // :2983
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :2985
        await era.printAndWait(
          `「那……那个……虽然不是很擅长……但是如果主人会舒服的话，${sc()}会努力的……」`,
        ); // :2986
        await era.printAndWait(
          `完全将自己当做${master_name}的仆人的${target_name}，努力的用小手侍奉着肉棒。`,
        ); // :2987
      } else {
        // :2989
        await era.printAndWait(`「呜呜……一定要……这样做不可吗……」`); // :2990
      } // :2991
      // CFLAG:331  = 1（变量语义：CFLAG 族，331） // :2992
      chara(target).kojo.手淫 = 1; // :2992
      return 0; // :2993
    } else {
      // :2995

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3
      ) {
        // :2997
        if (rand_n(2) == 0) {
          // :2998
          await era.printAndWait(
            `「诶嘿嘿，主人的肉棒，激动的一跳一跳的呢，被${sc()}的手捏，就这么开心咩？」`,
          ); // :2999
          await era.printAndWait(
            `${target_name}轻轻揉捏着肉棒，用可爱的小手服侍着${master_name}。`,
          ); // :3000
          await era.printAndWait(`「${sc()}的手……就这么的舒服吗❤」`); // :3001
          if (era.get(`abl:${target}:32`) >= 3) {
            // :3003
            await era.printAndWait(`「就这样子……把牛奶射出来也没问题哟❤」`); // :3003
          } // :3003
        } else {
          // :3004
          await era.printAndWait(`「呼啊啊……肉棒的味道……好好闻……❤」`); // :3005
          await era.printAndWait(
            `${target_name}带着有些恍惚的表情，一边用手服侍着肉棒，一边用柔软的小脸轻轻的蹭着前端。`,
          ); // :3006
          await era.printAndWait(`「主人的味道……嗯～最喜欢了❤」`); // :3007
          if (era.get(`abl:${target}:32`) >= 3) {
            // :3009
            await era.printAndWait(`「还有牛奶也最喜欢了呢❤」`); // :3009
          } // :3009
        } // :3010
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :3011
        chara(target).kojo.手淫 = 5; // :3011
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3013
        await era.printAndWait(`「主人的……肉棒……呼啊啊……❤」`); // :3014
        await era.printAndWait(
          `${target_name}一脸痴态的抚弄着眼前粗大的肉棒。`,
        ); // :3015
        if (era.get(`abl:${target}:32`) >= 3) {
          // :3017
          await era.printAndWait(`「主人的牛奶……好想要……❤」`); // :3017
        } // :3017
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :3018
        chara(target).kojo.手淫 = 4; // :3018
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3020
        if (rand_n(100) >= 50) {
          // :3021
          await era.printAndWait(`「主人的肉棒……${sc()}……会好好的服侍的……」`); // :3022
          await era.printAndWait(
            `${target_name}小心的握着${master_name}的肉棒，来回抚弄着。`,
          ); // :3023
          await era.printAndWait(`「主人……这个力度……可以吗……？」`); // :3024
          if (era.get(`abl:${target}:32`) >= 3) {
            // :3026
            await era.printAndWait(
              `「如果要射出来的话……不管是脸上还是嘴里都没问题的哟……」`,
            ); // :3026
          } // :3026
          await era.printAndWait(
            `${target_name}仰着头看着${master_name}，红着脸说着。`,
          ); // :3027
        } else {
          // :3028
          await era.printAndWait(`「主人……肉棒被手弄……会很舒服吗……？」`); // :3029
          await era.printAndWait(
            `${target_name}微笑着用小手抚弄着肉棒，纤细的手指沾满了黏糊糊的前液。`,
          ); // :3030
          await era.printAndWait(
            `「诶嘿嘿……如果主人喜欢的话，${sc()}不过多少次都会为主人做的。」`,
          ); // :3031
          if (era.get(`abl:${target}:32`) >= 3) {
            // :3032
            await era.printAndWait(`「虽……虽然牛奶也……很喜欢就是了……」`); // :3033
            await era.printAndWait(`${target_name}很小声的自言自语着。`); // :3034
          } // :3035
        } // :3036
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :3037
        chara(target).kojo.手淫 = 5; // :3037
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3039
        await era.printAndWait(`「主人的肉棒……好精神呢……❤」`); // :3040
        await era.printAndWait(`「为了回应主人的期待，${sc()}会努力的～」`); // :3041
        await era.printAndWait(
          `${target_name}的小手握着肉棒，不停的上下套弄着。`,
        ); // :3042
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :3043
        chara(target).kojo.手淫 = 4; // :3043
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3045
        await era.printAndWait(`「主人的兴趣……真是奇怪呢……」`); // :3046
        await era.printAndWait(
          `虽然对H的事情还不是特别理解，但是${target_name}还是乖乖的照做了。`,
        ); // :3047
        await era.printAndWait(`「这样子……会舒服吗……？」`); // :3048
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :3049
        chara(target).kojo.手淫 = 3; // :3049
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :3051
        await era.printAndWait(`「呜呜……手上都变得黏糊糊的啦……」`); // :3052
        await era.printAndWait(
          `不理会泪眼汪汪的${target_name}，${master_name}享受着有些笨拙的侍奉。`,
        ); // :3053
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :3054
        chara(target).kojo.手淫 = 2; // :3054
      } // :3055
      return 0; // :3056
    } // :3057
  } // :3058

  if (era_flag.selectcom == 31) {
    // :3063

    if (chara(target).kojo.口交_奴 == 0) {
      // :3065

      if (era.get(`talent:${target}:76`) == 1) {
        // :3067
        await era.printAndWait(`「用嘴巴吗……诶嘿嘿，明白了呢❤」`); // :3068
        await era.printAndWait(
          `${target_name}开心的含住了${master_name}的肉棒，毫不迟疑的开始吮吸起来。`,
        ); // :3069
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3071
        await era.printAndWait(
          `「用嘴巴……给主人的肉棒……那个么……呜呜……总觉得……有点害羞呢……」`,
        ); // :3072
        await era.printAndWait(
          `${target_name}有些害羞的说着，软软的小嘴含住了肉棒的前端，轻轻的亲了一下。`,
        ); // :3073
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3075
        await era.printAndWait(`「呼诶……用嘴巴吗……？呜嗯……知道了的说……」`); // :3076
        await era.printAndWait(
          `${target_name}顺从的含住了肉棒，开始用柔软的小嘴侍奉起来。`,
        ); // :3077
      } else {
        // :3079
        await era.printAndWait(`「呜呜……我……我做……就是了啦……呜……」`); // :3080
        await era.printAndWait(
          `虽然最初很不愿意，但是被${master_name}狠狠的瞪了一眼之后，${target_name}抽泣着含住了肉棒。`,
        ); // :3081
      } // :3082
      // CFLAG:332  = 1（变量语义：CFLAG 族，332） // :3083
      chara(target).kojo.口交_奴 = 1; // :3083
      return 0; // :3084
    } else {
      // :3086

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3088
        if (rand_n(3) == 0) {
          // :3089
          await era.printAndWait(
            `「嗯呜……呼……嗯哈……主人的肉棒……呼啊……好美味……❤」`,
          ); // :3090
          await era.printAndWait(
            `${target_name}含着粗大的肉棒，不断的前后套弄着，布丁一样柔软的小舌头在肉棒上磨蹭着。`,
          ); // :3091
          await era.printAndWait(
            `「呐呐，主人……快点……快点把牛奶给${sc()}嘛……❤」`,
          ); // :3092
        } else if (rand_n(2) == 0) {
          // :3093
          await era.printAndWait(`「嗯……嗯呼……呜……嗯……❤」`); // :3094
          await era.printAndWait(
            `${target_name}努力的吞吐着${master_name}粗大的肉棒，小小的眼睛里满是着迷的表情。`,
          ); // :3095
          await era.printAndWait(
            `与其说是在服侍，不如说是在贪食喜欢的食物的小孩子一样。`,
          ); // :3096
        } else {
          // :3097
          await era.printAndWait(
            `${target_name}的小手握着粗大的肉棒，像舔棒棒糖一样仔细的上下舔弄着。`,
          ); // :3098
          await era.printAndWait(`「嗯啾……呼……呼哈……❤」`); // :3099
          await era.printAndWait(`「诶嘿嘿，主人的声音听起来好像很舒服呢❤」`); // :3100
        } // :3101
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :3102
        chara(target).kojo.口交_奴 = 5; // :3102
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3104
        if (rand_n(3) == 0) {
          // :3105
          await era.printAndWait(`「嗯……主人的……怎么样……感觉舒服吗……？」`); // :3106
          await era.printAndWait(
            `${target_name}用嘴巴小心的侍奉着${master_name}的肉棒，努力的不让牙齿碰到。`,
          ); // :3107
          await era.printAndWait(`「嗯呼……主人舒服的话……是${sc()}的荣幸呢❤」`); // :3108
        } else if (rand_n(2) == 0) {
          // :3109
          await era.printAndWait(`「呼哈……主人的……肉棒……」`); // :3110
          await era.printAndWait(
            `${target_name}拼命的张着可爱的小嘴，将稍微有些大的肉棒含在嘴里努力的吮吸着。`,
          ); // :3111
          await era.printAndWait(`「嗯啾……呼……只要是主人想要的……嗯……❤」`); // :3112
        } else {
          // :3113
          await era.printAndWait(`「嗯啾……呜……呼……❤」`); // :3114
          await era.printAndWait(
            `${target_name}含着肉棒的前端，柔软的舌尖轻轻的刺激着龟头敏感的部分。`,
          ); // :3115
          await era.printAndWait(
            `明明是应该含着棒棒糖的年龄，小嘴却熟练的侍奉着肉棒。`,
          ); // :3116
          await era.printAndWait(
            `虽然身为魔王并没有罪恶感这种东西，不过眼前的场景还是让${master_name}感到兴奋起来。`,
          ); // :3117
        } // :3118
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :3119
        chara(target).kojo.口交_奴 = 4; // :3119
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3121
        await era.printAndWait(
          `「呼啾……主人……${sc()}的嘴巴……请尽情的……使用……」`,
        ); // :3122
        await era.printAndWait(
          `${target_name}乖巧的张开小嘴，积极的用侍奉着${master_name}的肉棒。`,
        ); // :3123
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :3124
        chara(target).kojo.口交_奴 = 3; // :3124
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :3126
        await era.printAndWait(`「嗯咕……呜……不……呼呜……」`); // :3127
        await era.printAndWait(
          `被压着头顶的${target_name}，被半强制的用小嘴服侍的肉棒。`,
        ); // :3128
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :3129
        chara(target).kojo.口交_奴 = 2; // :3129
      } // :3130
      return 0; // :3131
    } // :3132
  } // :3133

  if (era_flag.selectcom == 32) {
    // :3138

    if (chara(target).kojo.乳交 == 0) {
      // :3140

      if (era.get(`talent:${target}:76`) == 1) {
        // :3142
        await era.printAndWait(
          `「诶嘿嘿……${sc()}这个小小的胸部也没关系吗～❤」`,
        ); // :3143
        await era.printAndWait(
          `${target_name}脸上浮现着和年龄不符的魅惑的笑容，用平坦而柔软的胸部侍奉起肉棒来。`,
        ); // :3144
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3146
        await era.printAndWait(`「呼诶……${sc()}这样子的胸部……也没问题吗……」`); // :3147
        await era.printAndWait(`「只要主人开心的话……」`); // :3148
        await era.printAndWait(
          `${target_name}红着脸，微笑的看着${master_name}，用平坦而柔软的胸部侍奉起肉棒来。`,
        ); // :3149
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3151
        await era.printAndWait(`「哈呜呜……用胸部……给主人的肉棒……」`); // :3152
        await era.printAndWait(
          `${target_name}听话的用平坦而柔软的胸部侍奉起肉棒来。`,
        ); // :3153
      } else {
        // :3155
        await era.printAndWait(`「这种事情……呜……感觉好奇怪……」`); // :3156
      } // :3157
      // CFLAG:333  = 1（变量语义：CFLAG 族，333） // :3158
      chara(target).kojo.乳交 = 1; // :3158
      return 0; // :3159
    } else {
      // :3161

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3163
        await era.printAndWait(`「用胸部侍奉主人的肉棒……也很有感觉呢❤」`); // :3164
        await era.printAndWait(
          `「又热又硬的肉棒……在胸口这样子磨蹭……诶嘿嘿～❤」`,
        ); // :3165
        await era.printAndWait(
          `${target_name}带着和外表不服的H的表情，积极的用平坦的胸部侍奉着肉棒。`,
        ); // :3166
        // CFLAG:333  = 7（变量语义：CFLAG 族，333） // :3167
        chara(target).kojo.乳交 = 7; // :3167
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3169
        await era.printAndWait(`「诶嘿嘿，主人，舒服吗～❤」`); // :3170
        await era.printAndWait(`「之后一定要用肉棒侵犯${sc()}哟～❤」`); // :3171
        await era.printAndWait(
          `${target_name}带着和外表不服的H的表情，积极的用平坦的胸部侍奉着肉棒。`,
        ); // :3172
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :3173
        chara(target).kojo.乳交 = 6; // :3173
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3175
        if (rand_n(2) == 0) {
          // :3176
          await era.printAndWait(`「能这样子服侍主人……${sc()}……很荣幸的说～」`); // :3177
          await era.printAndWait(`「${sc()}……一定会好好的让主人舒服的～」`); // :3178
          await era.printAndWait(
            `${target_name}微微的红着脸，积极的用平坦的胸部侍奉着肉棒。`,
          ); // :3179
        } else {
          // :3180
          await era.printAndWait(`「呼啊啊……主人的肉棒……好大……好热的说……」`); // :3181
          await era.printAndWait(`「诶嘿嘿，${sc()}会努力的～」`); // :3182
          await era.printAndWait(
            `${target_name}微微的红着脸，积极的用平坦的胸部侍奉着肉棒。`,
          ); // :3183
        } // :3184
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :3185
        chara(target).kojo.乳交 = 4; // :3185
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3187
        await era.printAndWait(`「主人……这个样子……可以吗……？」`); // :3188
        await era.printAndWait(
          `${target_name}努力的压抑着羞耻心，顺从的用平坦的胸部侍奉着肉棒。`,
        ); // :3189
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :3190
        chara(target).kojo.乳交 = 3; // :3190
      } else if (chara(target).kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        // :3192
        await era.printAndWait(
          `「呜呜……只要这样子做的话……就不会再做过分的事情了吗？」`,
        ); // :3193
        await era.printAndWait(
          `在${master_name}威逼利诱和哄骗下，${target_name}含着泪花用平坦的胸部笨拙的侍奉着肉棒。`,
        ); // :3194
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :3195
        chara(target).kojo.乳交 = 2; // :3195
      } // :3196
      return 0; // :3197
    } // :3198
  } // :3199

  if (era_flag.selectcom == 33) {
    // :3204

    if (chara(target).kojo.股间性交 == 0) {
      // :3206

      if (era.get(`talent:${target}:76`) == 1) {
        // :3208
        await era.printAndWait(`「哈呀～竟然这样子……主人坏❤」`); // :3209
        await era.printAndWait(
          `${target_name}用诱惑的眼神看着${master_name}，慢慢的用大腿之间摩擦着肉棒。`,
        ); // :3210
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3212
        await era.printAndWait(`「哈呜呜……主人的那个……好热的说……」`); // :3213
        await era.printAndWait(
          `${target_name}红着脸看着${master_name}的肉棒在大腿之间摩擦着。`,
        ); // :3214
      } else {
        // :3216
        await era.printAndWait(`「呜呜……做，做什么啦……不要做奇怪的事情呜……」`); // :3217
        await era.printAndWait(`${target_name}含着眼泪，轻轻的抽泣着。`); // :3218
      } // :3219
      // CFLAG:334  = 1（变量语义：CFLAG 族，334） // :3220
      chara(target).kojo.股间性交 = 1; // :3220
      return 0; // :3221
    } else {
      // :3223

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3225
        await era.printAndWait(`「哈啊……主人……嗯……好舒服……❤」`); // :3226
        await era.printAndWait(
          `${target_name}轻轻的喘息着，积极的活动着腰部迎合着肉棒。`,
        ); // :3227
        await era.printAndWait(
          `「呜呜……主人……求求你……就这样子插进去嘛……把${sc()}的处女……就这样咻的……拿走……❤」`,
        ); // :3228
        await era.printAndWait(
          `装作没听到的${master_name}就这样握着纤细的腰部继续摩擦着。`,
        ); // :3229
        await era.printAndWait(`「呜～主人坏～」`); // :3230
        // CFLAG:334  = 7（变量语义：CFLAG 族，334） // :3231
        chara(target).kojo.股间性交 = 7; // :3231
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3233
        await era.printAndWait(`「哈啊……主人……嗯……好舒服……❤」`); // :3234
        await era.printAndWait(
          `${target_name}轻轻的喘息着，积极的活动着腰部迎合着肉棒。`,
        ); // :3235
        await era.printAndWait(`「呼啊啊……肉棒这样子摩擦着那里……嗯呀……❤」`); // :3236
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :3237
        chara(target).kojo.股间性交 = 6; // :3237
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3239
        await era.printAndWait(
          `「哈呜呜……主人的那个……好热……在下面……咕啾咕啾的……」`,
        ); // :3240
        await era.printAndWait(
          `${target_name}轻轻的喘息着，有些害羞的迎合着${master_name}的动作。`,
        ); // :3241
        await era.printAndWait(
          `「主人……那个……那，那个……可以的话……那个……插……进去……那个……」`,
        ); // :3242
        await era.printAndWait(
          `${master_name}坏笑的看着害羞的快要哭出来的${target_name}，继续在大腿间摩擦着。`,
        ); // :3243
        await era.printAndWait(
          `「呜呜……就……就这样……请……把${sc()}的……第一次……」`,
        ); // :3244
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :3245
        chara(target).kojo.股间性交 = 5; // :3245
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3247
        await era.printAndWait(
          `「哈呜呜……主人的那个……好热……在下面……咕啾咕啾的……」`,
        ); // :3248
        await era.printAndWait(
          `${target_name}轻轻的喘息着，有些害羞的迎合着${master_name}的动作。`,
        ); // :3249
        await era.printAndWait(
          `「呼啊……主人……喜欢你……最喜欢你了……只要是主人的话……不管做什么事情都可以……❤」`,
        ); // :3250
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :3251
        chara(target).kojo.股间性交 = 4; // :3251
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3253
        await era.printAndWait(`「哈呜……主人……做这种事的话……会舒服吗……？」`); // :3254
        await era.printAndWait(
          `${target_name}还有些不习惯的，红着脸笨拙的迎合着${master_name}。`,
        ); // :3255
        await era.printAndWait(`「呼诶……${sc()}也……很舒服……的说……」`); // :3256
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :3257
        chara(target).kojo.股间性交 = 3; // :3257
      } else if (chara(target).kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        // :3259
        await era.printAndWait(`「呜呜……做，做什么啦……不要做奇怪的事情呜……」`); // :3260
        await era.printAndWait(`${target_name}含着眼泪，轻轻的抽泣着。`); // :3261
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :3262
        chara(target).kojo.股间性交 = 2; // :3262
      } // :3263
      return 0; // :3264
    } // :3265
  } // :3266

  if (era_flag.selectcom == 34) {
    // :3271
    if (chara(target).kojo.骑乘位 == 0) {
      // :3272

      if (era.get(`talent:${target}:0`) == 1) {
        // :3274

        if (era.get(`talent:${target}:76`) == 1) {
          // :3276
          await era.printAndWait(
            `「唔啊啊……能感觉的到……主人的肉棒……啊哈……好大……好热呢❤」`,
          ); // :3277
          await era.printAndWait(
            `${target_name}忍着初次的痛苦，扶着肉棒慢慢的坐了下去，体会到被肉棒侵入体内的快感的${target_name}露出了开心的表情。`,
          ); // :3278
          await era.printAndWait(
            `「哈啊……主人的肉棒……好厉害……把肚子里面塞得满满的……好舒服……❤」`,
          ); // :3279
          await era.printAndWait(
            `初次感受到异物进入的稚嫩的幼穴紧紧的夹住肉棒不放，仅仅是插进去不动就能感受到强烈的快感。`,
          ); // :3280
          await era.printAndWait(`「嗯……主人……来做更多……舒服的事情吧……❤」`); // :3281
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :3283
          await era.printAndWait(`「呜呜……进来了……呜……主人……的……」`); // :3284
          await era.printAndWait(
            `${target_name}努力的忍耐着初次的疼痛，慢慢的坐了下去，豆大的泪珠从疼的颤抖的小脸颊上滑落下来。`,
          ); // :3285
          await era.printAndWait(`「呜……好痛的说……感觉要裂开了……」`); // :3286
          await era.printAndWait(
            `「但是……这样子……终于……${sc()}的身心就都是主人的东西了呢……❤」`,
          ); // :3287
          await era.printAndWait(
            `${master_name}轻轻的抱着还在颤抖着的幼女，一次次抚摸着头部。`,
          ); // :3288
          await era.printAndWait(
            `「嗯呜……主人……再一下下……这样子抱着……一下下……就好……」`,
          ); // :3289
          await era.printAndWait(
            `就这样抱着怀中的小人，擦掉了眼角的泪水之后，${master_name}开始轻轻的动起腰来……`,
          ); // :3290
        } else {
          // :3292
          await era.printAndWait(`「哈呜呜……好痛……好痛……！」`); // :3293
          await era.printAndWait(`「对不起，请原谅我，请原谅我～～！」`); // :3294
        } // :3295
      } else {
        // :3297

        if (era.get(`talent:${target}:76`) == 1) {
          // :3299
          await era.printAndWait(
            `「哈啊啊……主人的肉棒……顶到最里面了呢……诶嘿嘿……❤」`,
          ); // :3300
          await era.printAndWait(
            `${target_name}扶着肉棒，开始积极的活动起腰部来。`,
          ); // :3301
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :3303
          await era.printAndWait(`「呼啊……主人的那个……全部都……进来了呢……」`); // :3304
          await era.printAndWait(
            `${target_name}红着脸，支撑着身体，随着${master_name}的动作小小的身体一上一下的欺负着。`,
          ); // :3305
        } else {
          // :3307
          await era.printAndWait(`「呜呜，这样子，好害羞……不，不要……」`); // :3308
          await era.printAndWait(`${target_name}轻轻的抽泣着。`); // :3309
        } // :3310
      } // :3311
      // CFLAG:335  = 1（变量语义：CFLAG 族，335） // :3312
      chara(target).kojo.骑乘位 = 1; // :3312
      return 0; // :3313
    } else {
      // :3315

      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`))
      ) {
        // :3317
        if (rand_n(3) == 0) {
          // :3318
          await era.printAndWait(`「呼啊啊……主人的肉棒……喜欢……最喜欢了……❤」`); // :3319
          await era.printAndWait(
            `${target_name}的小手撑在${master_name}的肚子上，扭动着纤细的腰肢，一下下的用稚嫩的下半身套弄着肉棒。`,
          ); // :3320
          await era.printAndWait(
            `「主人的肉棒……在肚子里面……咕啾咕啾的……好舒服❤」`,
          ); // :3321
        } else if (rand_n(2) == 0) {
          // :3322
          await era.printAndWait(
            `「呐呐，主人，你看你看，肉棒在肚子里面……这样子的动着呢❤」`,
          ); // :3323
          await era.printAndWait(
            `${target_name}稍稍后仰着，小手撑着${master_name}的大腿，被肉棒撑开的稚嫩小穴完全暴露在${master_name}的视线中。`,
          ); // :3324
          await era.printAndWait(`「啊啊……里面……顶到了……嗯哈～❤」`); // :3325
        } else {
          // :3326
          await era.printAndWait(`「嗯啾……主人的肉棒……还想要……更多呢……❤」`); // :3327
          await era.printAndWait(
            `${target_name}伏在${master_name}身上，二人的嘴唇无数次重合着。`,
          ); // :3328
          await era.printAndWait(
            `${master_name}一边享受着柔软的小嘴，一边挺动着腰部，在稚嫩的小穴里抽送着。`,
          ); // :3329
        } // :3330
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :3331
        chara(target).kojo.骑乘位 = 7; // :3331
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:2`) >= 3
      ) {
        // :3333
        await era.printAndWait(
          `「哈啊……好舒服……小穴被主人的肉棒侵犯……好舒服～❤」`,
        ); // :3334
        await era.printAndWait(`「小穴里面被侵犯什么的……感觉好棒……❤」`); // :3335
        await era.printAndWait(
          `${target_name}在${master_name}身上起伏着，幼小的身体一次次的贪图着快感，用力的起伏着。`,
        ); // :3336
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :3337
        chara(target).kojo.骑乘位 = 6; // :3337
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3339
        await era.printAndWait(`「啊哈……嗯……嗯呀……H……好舒服呢……❤」`); // :3340
        await era.printAndWait(
          `${target_name}积极的迎合着${master_name}的动作，稚气的脸庞上满满都是和年龄不符的欲望。`,
        ); // :3341
        await era.printAndWait(
          `「呼啊啊……主人……请对${sc()}做更多……舒服的事情……❤」`,
        ); // :3342
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :3343
        chara(target).kojo.骑乘位 = 5; // :3343
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`))
      ) {
        // :3345
        if (rand_n(3) == 0) {
          // :3346
          await era.printAndWait(`「嗯……主人……呀……里面……顶到了……❤」`); // :3347
          await era.printAndWait(
            `${target_name}的小手撑在${master_name}的肚子上，支撑着幼小的身体，感受着一肉棒一下下的朝上顶着稚嫩的小穴。`,
          ); // :3348
          await era.printAndWait(`「哈呀……主人……喜欢……最喜欢了……❤」`); // :3349
        } else if (rand_n(2) == 0) {
          // :3350
          await era.printAndWait(
            `「呜呜……主人的那个……在肚子里面……塞的满满的」`,
          ); // :3351
          await era.printAndWait(
            `${target_name}稍稍后仰着，小手撑着${master_name}的大腿，被肉棒撑开的稚嫩小穴完全暴露在${master_name}的视线中。`,
          ); // :3352
          await era.printAndWait(
            `「只要主人想要……不管多少次都可以……请尽情的使用吧……」`,
          ); // :3353
        } else {
          // :3354
          await era.printAndWait(`「嗯啾……主人……那个……kiss……嗯……❤」`); // :3355
          await era.printAndWait(
            `${target_name}伏在${master_name}身上，二人的嘴唇无数次重合着。`,
          ); // :3356
          await era.printAndWait(
            `${master_name}一边享受着柔软的小嘴，一边挺动着腰部，在稚嫩的小穴里抽送着。`,
          ); // :3357
        } // :3358
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :3359
        chara(target).kojo.骑乘位 = 7; // :3359
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:2`) >= 3
      ) {
        // :3361
        await era.printAndWait(`「嗯……呀……虽然这样子……有点害羞……」`); // :3362
        await era.printAndWait(`「但是……和主人做……舒服的事情……好开心……❤」`); // :3363
        await era.printAndWait(
          `${target_name}在${master_name}身上起伏着，幼小的身体一次次的贪图着快感，用力的起伏着。`,
        ); // :3364
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :3365
        chara(target).kojo.骑乘位 = 6; // :3365
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3367
        await era.printAndWait(`「哈啊……主人……最喜欢……你了……」`); // :3368
        await era.printAndWait(
          `${target_name}积极的迎合着${master_name}的动作，稚气的小脸满眼桃心的看着你。`,
        ); // :3369
        await era.printAndWait(`「虽然还……有些不适应……但是……没问题的……」`); // :3370
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :3371
        chara(target).kojo.骑乘位 = 5; // :3371
      } else if (
        era.get(`mark:${target}:2`) >= 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3373
        if (rand_n(2) == 0) {
          // :3374
          await era.printAndWait(`「哈呜呜……明明……这种事情……呀……❤」`); // :3375
          await era.printAndWait(
            `${target_name}努力的撑着自己的身体，稚嫩的小穴不顾主人的意志，紧紧的吮吸着肉棒。`,
          ); // :3376
          await era.printAndWait(`「呜呜……」`); // :3377
        } else {
          // :3378
          await era.printAndWait(`「啊……哈啊……嗯……呜……」`); // :3379
          await era.printAndWait(
            `${target_name}顺从的用小穴套弄着肉棒，时不时因为快感发出可爱的娇喘声。`,
          ); // :3380
          await era.printAndWait(`「嗯……肚子里面……要……变得奇怪了……哈啊……」`); // :3381
        } // :3382
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :3383
        chara(target).kojo.骑乘位 = 4; // :3383
      } else if (
        era.get(`mark:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3385
        await era.printAndWait(`「呜……哈啊……主人……这样子……舒服……吗……？」`); // :3386
        await era.printAndWait(
          `${target_name}感受着还未习惯的异样的快感，努力的撑着自己的身体，稚嫩的肉壁一次次的被肉棒强硬的分开。`,
        ); // :3387
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :3388
        chara(target).kojo.骑乘位 = 3; // :3388
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :3390
        await era.printAndWait(`「呜呜，不要，不要动了啦，好难受……！」`); // :3391
        await era.printAndWait(
          `几乎伏在了${master_name}身上的${target_name}不停地抽泣着。`,
        ); // :3392
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :3393
        chara(target).kojo.骑乘位 = 2; // :3393
      } // :3394
      return 0; // :3395
    } // :3396
  } // :3397

  if (era_flag.selectcom == 35) {
    // :3402

    if (chara(target).kojo.全身擦洗 == 0) {
      // :3404

      if (era.get(`abl:${target}:16`) >= 3) {
        // :3406
        await era.printAndWait(`「给主人擦洗吗……？嗯呜，明白了呢。」`); // :3407
        await era.printAndWait(
          `虽然从来没有做过这种事情，但是${target_name}毫不犹豫的有些笨拙的顺从的照做了。`,
        ); // :3408
        await era.printAndWait(
          `「诶嘿嘿……主人的身体……好壮实呢（女性的话好漂亮）……」`,
        ); // :3409
      } else {
        // :3411
        await era.printAndWait(`「呜呜……虽然比做奇怪的事情要好……但是……」`); // :3412
        await era.printAndWait(
          `${target_name}有些疑惑的，红着脸笨拙的擦洗着。`,
        ); // :3413
      } // :3414
      // CFLAG:336  = 1（变量语义：CFLAG 族，336） // :3415
      chara(target).kojo.全身擦洗 = 1; // :3415
      return 0; // :3416
    } else {
      // :3418

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3420
        await era.printAndWait(`「啊哈……主人的身体……好棒……❤」`); // :3421
        await era.printAndWait(
          `${target_name}在${master_name}背后蹭着，在二人的身体之间摩擦出许多的小泡泡，小手绕到前面轻轻揉捏着粗大的肉棒。`,
        ); // :3422
        await era.printAndWait(`「诶嘿嘿……之后也继续做舒服的事情吧～❤」`); // :3423
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :3424
        chara(target).kojo.全身擦洗 = 5; // :3424
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3426
        await era.printAndWait(`「嗯……这就是……最喜欢的……主人的……身体呢……」`); // :3427
        await era.printAndWait(`「啊啊……这样子看……果然是主人呢……❤」`); // :3428
        await era.printAndWait(
          `${target_name}的小手轻轻的在${master_name}的身上搓揉着肥皂泡，小脸不知是因为热水还是别的什么原因，看起来红红的。`,
        ); // :3429
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :3430
        chara(target).kojo.全身擦洗 = 4; // :3430
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3432
        await era.printAndWait(`「这，这个样子……可以吗……主人……？」`); // :3433
        await era.printAndWait(
          `${target_name}顺从的擦洗着${master_name}的身体，时不时轻声询问着${master_name}的感觉。`,
        ); // :3434
        await era.printAndWait(`「主人舒服的话……就好了呢……」`); // :3435
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :3436
        chara(target).kojo.全身擦洗 = 3; // :3436
      } else if (chara(target).kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        // :3438
        await era.printAndWait(`「呜呜……做这种事情……好奇怪的感觉……」`); // :3439
        await era.printAndWait(
          `${target_name}怯生生的擦洗着${master_name}的身体。`,
        ); // :3440
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :3441
        chara(target).kojo.全身擦洗 = 2; // :3441
      } // :3442
      return 0; // :3443
    } // :3444
  } // :3445

  if (era_flag.selectcom == 36) {
    // :3450

    if (chara(target).kojo.骑乘位肛交 == 0) {
      // :3452

      if (era.get(`talent:${target}:76`) == 1) {
        // :3454
        if (era.get(`abl:${target}:3`) >= 3) {
          // :3455
          await era.printAndWait(
            `「哈啊……能感觉到屁股里面……被主人的肉棒塞的满满的……好舒服……❤」`,
          ); // :3456
          await era.printAndWait(
            `跨坐在${master_name}身上的${target_name}扭动着腰部，贪图着异样的快感。`,
          ); // :3457
        } else {
          // :3458
          await era.printAndWait(`「呼啊啊……全部都……进去了呢……❤」`); // :3459
          await era.printAndWait(
            `${target_name}露出了带着轻微不适感的色色的表情，开始扭动起腰部来。`,
          ); // :3460
        } // :3461
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3463
        if (era.get(`abl:${target}:3`) >= 3) {
          // :3464
          await era.printAndWait(
            `「呜呜……能感觉到……主人的全部……都在……里面……好开心……❤」`,
          ); // :3465
          await era.printAndWait(
            `${target_name}迷离的看着${master_name}，水汪汪的大眼睛里满是幸福的表情。`,
          ); // :3466
        } else {
          // :3467
          await era.printAndWait(
            `「呜……哈啊……主人……那个……${sc()}……完全……没问题……的说……」`,
          ); // :3468
          await era.printAndWait(
            `骑在${master_name}身上的${target_name}强忍着不快感，开始慢慢的动起腰，侍奉起${master_name}来。`,
          ); // :3469
        } // :3470
      } else {
        // :3472
        if (era.get(`abl:${target}:3`) >= 3) {
          // :3473
          await era.printAndWait(`「啊呜呜……肚子里面……被……呼呀……」`); // :3474
          await era.printAndWait(
            `${target_name}捂着小嘴，不让可爱的娇喘声漏出来。`,
          ); // :3475
        } else {
          // :3476
          await era.printAndWait(
            `「哈咕……好难受……屁股……呜呜……要裂开来了啦……」`,
          ); // :3477
          await era.printAndWait(
            `${target_name}轻轻的抽泣着，晶莹的泪珠不断的沿着脸颊滑落。`,
          ); // :3478
        } // :3479
      } // :3480
      // CFLAG:337  = 1（变量语义：CFLAG 族，337） // :3481
      chara(target).kojo.骑乘位肛交 = 1; // :3481
      return 0; // :3482
    } else {
      // :3484

      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :3486
        if (rand_n(2)) {
          // :3487
          await era.printAndWait(
            `「呼啊啊～～好棒～～主人的肉棒……在屁股里面……咕啾咕啾的……嗯呀～～舒服的要死掉了啦～❤」`,
          ); // :3488
          await era.printAndWait(
            `${target_name}激烈的扭动着纤细的腰部，一下一下的套弄着${master_name}的肉棒，贪图着快感。`,
          ); // :3489
          await era.printAndWait(
            `「哈啊……已经……没办法再思考肉棒以外的事情了啦～❤」`,
          ); // :3490
        } else {
          // :3491
          await era.printAndWait(
            `「嗯哈……❤屁股被这样子粗暴的侵犯……嗯呼～～好舒服～～❤」`,
          ); // :3492
          await era.printAndWait(
            `${target_name}小嘴微微张开着，随着欺负呼出甜甜的热气。`,
          ); // :3493
          await era.printAndWait(`「主人……呼啊啊……请……更加的……用力一点……❤」`); // :3494
        } // :3495
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :3496
        chara(target).kojo.骑乘位肛交 = 6; // :3496
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        // :3498
        await era.printAndWait(`「嗯……呀……哈啊……主人的肉棒……嗯……好喜欢……❤」`); // :3499
        await era.printAndWait(
          `${target_name}微微的吐着小舌头，在快感的刺激下一下一下的起伏着。`,
        ); // :3500
        await era.printAndWait(`「呼啊啊……肉棒……插得好深呢……❤」`); // :3501
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :3502
        chara(target).kojo.骑乘位肛交 = 5; // :3502
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3504
        await era.printAndWait(`「主人的肉棒……嗯哈……全部都进来了呢……❤」`); // :3505
        await era.printAndWait(
          `${target_name}露出了带着轻微不适感的色色的表情，开始扭动起腰部来。`,
        ); // :3506
        await era.printAndWait(
          `「虽然现在还有点难受……但是一定会更加舒服的吧❤」`,
        ); // :3507
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :3508
        chara(target).kojo.骑乘位肛交 = 4; // :3508
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        // :3510
        if (rand_n(2)) {
          // :3511
          await era.printAndWait(
            `「呼啊啊～～主人……主人嗯嗯～～已经除了主人以外，没办法再思考其他的事情了啦～～❤」`,
          ); // :3512
          await era.printAndWait(
            `${target_name}拼命的起伏着，用自己的身体侍奉着${master_name}。`,
          ); // :3513
          await era.printAndWait(`但是小脸上怎么看都像是在贪图着快感的样子。`); // :3514
          await era.printAndWait(`「主人和……H的事情……都最喜欢了……❤」`); // :3515
        } else {
          // :3516
          await era.printAndWait(
            `「主人……嗯……呼啊啊……${sc()}的全部……呜……都是主人的东西……❤」`,
          ); // :3517
          await era.printAndWait(
            `顺着${master_name}起伏的节奏，${target_name}积极的迎合着，用幼小的身体取悦着${master_name}。`,
          ); // :3518
          await era.printAndWait(`「${sc()}的身体……随便主人使用呐……❤」`); // :3519
        } // :3520
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :3521
        chara(target).kojo.骑乘位肛交 = 6; // :3521
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        // :3523
        await era.printAndWait(
          `「呜呜……屁股里面……能感觉到主人的那个……满满的呐……❤」`,
        ); // :3524
        await era.printAndWait(
          `${target_name}骑在${master_name}的身上，小小的身体不断的起伏着，用柔软的雏菊侍奉着肉棒。`,
        ); // :3525
        await era.printAndWait(`「好舒服……的说……主人也……很舒服咩……？」`); // :3526
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :3527
        chara(target).kojo.骑乘位肛交 = 5; // :3527
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3529
        await era.printAndWait(
          `「哈呜呜……主人的那个……嗯……全部都……进来了呢……」`,
        ); // :3530
        await era.printAndWait(
          `骑在${master_name}身上的${target_name}强忍着不快感，开始慢慢的动起腰，侍奉起${master_name}来。`,
        ); // :3531
        await era.printAndWait(
          `「虽然……有些难受……但是为了主人……${sc()}会加油的……！」`,
        ); // :3532
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :3533
        chara(target).kojo.骑乘位肛交 = 4; // :3533
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3535
        await era.printAndWait(`「哈呜呜……舒服什么的……那种事……呼呀……❤」`); // :3536
        await era.printAndWait(
          `${target_name}的小手扶着${master_name}的身体，时不时发出可爱的娇喘声。`,
        ); // :3537
        await era.printAndWait(`「呀……不要……不要再……呜呜……不要再动了……」`); // :3538
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :3539
        chara(target).kojo.骑乘位肛交 = 3; // :3539
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :3541
        await era.printAndWait(`「讨厌……呜……哈啊……不，不要动……呀……」`); // :3542
        await era.printAndWait(
          `几乎伏在了${master_name}身上的${target_name}不停地抽泣着。`,
        ); // :3543
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :3544
        chara(target).kojo.骑乘位肛交 = 2; // :3544
      } // :3545
      return 0; // :3546
    } // :3547
  } // :3548

  if (era_flag.selectcom == 37) {
    // :3553

    if (chara(target).kojo.肛门侍奉 == 0) {
      // :3555

      if (era.get(`abl:${target}:16`) >= 3) {
        // :3557
      } else {
        // :3559
      } // :3560
      // CFLAG:338  = 1（变量语义：CFLAG 族，338） // :3561
      chara(target).kojo.肛门侍奉 = 1; // :3561
      return 0; // :3562
    } else {
      // :3564

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3566
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :3567
        chara(target).kojo.肛门侍奉 = 5; // :3567
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3569
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :3570
        chara(target).kojo.肛门侍奉 = 4; // :3570
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3572
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :3573
        chara(target).kojo.肛门侍奉 = 3; // :3573
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :3575
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :3576
        chara(target).kojo.肛门侍奉 = 2; // :3576
      } // :3577
      return 0; // :3578
    } // :3579
  } // :3580

  if (era_flag.selectcom == 38) {
    // :3585

    if (chara(target).kojo.足交 == 0) {
      // :3587
      await era.printAndWait(`「哎？！用脚？！用这个也可以舒服么？」`); // :3588
      await era.printAndWait(`「既然您这么说的话。。」`); // :3589
      await era.printAndWait(
        `${target_name}将小巧的脚丫放在${master_name}的肉棒上，慢慢的摩擦起来`,
      ); // :3590
      await era.printAndWait(`因为是第一次，所以技术显得相当的生疏`); // :3591
      // CFLAG:TARGET:339  = 1（变量语义：CFLAG 族，TARGET:339） // :3592
      chara(target).kojo.足交 = 1; // :3592
      return 0; // :3593
    } else {
      // :3595

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:20`) >= 3 &&
        (chara(target).kojo.足交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3597
        if (rand_n(2) == 0) {
          // :3598
          await era.printAndWait(
            `「哼哼~${heart(1)} 主人还真是喜欢${sc()}的小脚呢」`,
          ); // :3599
          await era.printAndWait(`「如果是主人的话，让你舔一下也不是不行哦~」`); // :3600
          await era.printAndWait(
            `${target_name}将小巧的脚丫放到了${master_name}的脸上`,
          ); // :3601
          await era.printAndWait(`淡淡的足香充斥了${master_name}的鼻腔`); // :3602
        } else {
          // :3603
          await era.printAndWait(
            `「哼哼~${heart(1)}主人很想要${sc()}的小脚是吧」`,
          ); // :3604
          await era.printAndWait(`「给。舔吧~${heart(1)}」`); // :3605
          await era.printAndWait(
            `${target_name}的脸上带着迷人的微笑，将仿若美玉雕成般的玉足放到了${master_name}的面前`,
          ); // :3606
        } // :3607
        if (rand_n(2) == 0) {
          // :3608
          await era.printAndWait(
            `${master_name}伸出舌头细致的舔着${target_name}的幼足，又酸又甜的感觉从舌尖传来，随即传遍了${master_name}的全身。`,
          ); // :3609
          await era.printAndWait(`${master_name}的肉棒更加兴奋了！`); // :3610
        } else {
          // :3611
          await era.printAndWait(
            `${master_name}突然伸出手一把抓住了${target_name}的小脚，将它固定在自己的眼前`,
          ); // :3612
          await era.printAndWait(
            `「干。。干什么啊」${target_name}显得有些慌乱`,
          ); // :3613
          await era.printAndWait(
            `${master_name}并没有应答，只是${target_name}的脚趾含入口中，细致的舔着，感受着玉趾不安的扭动。`,
          ); // :3614
          await era.printAndWait(`${master_name}的肉棒更加兴奋了！`); // :3615
        } // :3616
        if (rand_n(2) == 0) {
          // :3617
          await era.printAndWait(
            `「主人，真的是有够变态呢！只是干还不够么~${heart(1)}」`,
          ); // :3618
          await era.printAndWait(
            `${target_name}用轻蔑的眼神看着${master_name}因为舔足而兴奋不已的肉棒`,
          ); // :3619
          await era.printAndWait(`「这样子的主人，必须要给与惩罚才行呢」`); // :3620
          await era.printAndWait(
            `${target_name}将空闲的另一只小脚放到了${master_name}的肉棒上。用力的践踏着`,
          ); // :3621
          await era.printAndWait(
            `「这样子对主人来说，应该更爽了不是么~${heart(1)}」`,
          ); // :3622
        } else {
          // :3623
          await era.printAndWait(
            `「还想要更爽么~${heart(1)}主人~${heart(1)}」`,
          ); // :3624
          await era.printAndWait(
            `${target_name}将空闲的另一只小脚放到了${master_name}的肉棒上方，轻蔑的声音不断的刺激着${master_name}的神经。`,
          ); // :3625
          await era.printAndWait(
            `「想要的话~${heart(1)}说出来嘛~${heart(1)}主人~${heart(1)}诚心恳求的话~${heart(1)}就让你更爽哦~${heart(1)}」`,
          ); // :3626
          await era.printAndWait(
            `${master_name}并没有回应${target_name}的话语，只是伸出手抓住了${target_name}的小脚，将它放到了自己的肉棒上。不停的摩擦着`,
          ); // :3627
          await era.printAndWait(`「主人，真是个变态呢~${heart(1)}」`); // :3628
        } // :3629
        // CFLAG:TARGET:339  = 5（变量语义：CFLAG 族，TARGET:339） // :3630
        chara(target).kojo.足交 = 5; // :3630
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:20`) >= 3 &&
        (chara(target).kojo.足交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3632

        if (rand_n(2) == 0) {
          // :3634
          await era.printAndWait(
            `「主人喜欢${sc()}的小脚么，嗯~主人的话，想怎么样都可以~${heart(1)}」`,
          ); // :3635
          await era.printAndWait(`「哎？！要先舔么？！」`); // :3636
          await era.printAndWait(
            `${target_name}将小巧的玉足放到你的眼前，可爱的脚趾害羞的并拢着。`,
          ); // :3637
          await era.printAndWait(`「主人的话~${heart(1)}没有关系哦」`); // :3638
          await era.printAndWait(
            `${master_name}伸出手握住${target_name}的小脚，慢慢的摩挲着`,
          ); // :3639
          await era.printAndWait(`「不要~${heart(1)}好痒~${heart(1)}」`); // :3640
          await era.printAndWait(
            `${master_name}伸出舌头，舌头划过${target_name}的足弓，然后将可爱的玉趾含入口中。用舌头舐舔着。`,
          ); // :3641
        } else {
          // :3642
          await era.printAndWait(`「呀！主人？！」`); // :3643
          await era.printAndWait(
            `在${master_name}伸手抓住${target_name}的小脚的时候，${target_name}似乎受到了一点惊吓，但是很快就平静了下来。`,
          ); // :3644
          await era.printAndWait(
            `「主人真是的~明明只要跟${sc()}说，${sc()}就会给你的说~${heart(1)}」`,
          ); // :3645
          await era.printAndWait(
            `${master_name}并没有进行回应。只是将${target_name}的小脚紧紧握住，慢慢的摩挲着。`,
          ); // :3646
          await era.printAndWait(
            `「哎？！舔么。。嗯~${heart(1)}主人的话，可以哦~${heart(1)}」`,
          ); // :3647
          await era.printAndWait(
            `${master_name}伸出舌头，舌头划过${target_name}的足背，双手微微分开${target_name}因为害羞并在一起的玉趾，然后在趾缝中细细的舐舔着`,
          ); // :3648
        } // :3649
        if (rand_n(2) == 0) {
          // :3650
          await era.printAndWait(
            `「主人的话~${heart(1)}这里肯定也想要了呢~${heart(1)}」`,
          ); // :3651
          await era.printAndWait(
            `${target_name}将另一只小脚放到了肉棒上方，小巧的玉趾轻点在龟头上。然后用轻柔的动作慢慢的划到肉棒根部，微微的挑逗着阴囊`,
          ); // :3652
          await era.printAndWait(`「舒服么，主人~${heart(1)}」`); // :3653
          await era.printAndWait(
            `「主人能喜欢，那是最好了~${heart(1)}主人想要的话，再多都没有关系哦~${heart(1)}」`,
          ); // :3654
          await era.printAndWait(
            `${target_name}用小脚摩挲着${master_name}的肉棒，小巧的脚趾有意无意的划过${master_name}的龟头和马眼，刺激着${master_name}的敏感点，让肉棒显得越发狰狞。`,
          ); // :3655
        } else {
          // :3656
          await era.printAndWait(
            `「哎？！肉棒也想要？！恩。可以哦~${heart(1)}」`,
          ); // :3657
          await era.printAndWait(
            `${target_name}将另一只小脚放到了肉棒上，轻轻的摩挲着，仿佛是怕弄痛了${master_name}一般。`,
          ); // :3658
          await era.printAndWait(`「哎？！再重点？！这样子不会痛么，主人~」`); // :3659
          await era.printAndWait(`「嗯！既然是主人说的。。豁啦~${heart(1)}」`); // :3660
          await era.printAndWait(
            `${target_name}慢慢的开始加重小脚上的力道，肉棒与足弓的接触也越发亲密，小脚摩挲着肉棒带来的快感也飞快的上升，让肉棒显得越发狰狞。`,
          ); // :3661
        } // :3662
        if (rand_n(2) == 0) {
          // :3663
          await era.printAndWait(
            `「主人~${heart(1)}用脚给主人做着做着~${heart(1)}我这里也湿了呢~${heart(1)}」`,
          ); // :3664
          await era.printAndWait(
            `${target_name}张开双腿，红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
          ); // :3665
          await era.printAndWait(
            `「如果可以的话~${heart(1)}主人~${heart(1)}」`,
          ); // :3666

          await era.printAndWait(
            `${master_name}放下手中的玉足，将头埋入${target_name}的双腿之间，一股淡淡的幼女小穴的味道迎面而来，让${master_name}不禁伸出舌头细细的舐舔着。`,
          ); // :3668
          await era.printAndWait(
            `「啊嗯~${heart(1)}主人真是性急~${heart(1)}」`,
          ); // :3669
          await era.printAndWait(
            `${target_name}一边被你舔着小穴，一边用小脚夹着你的肉棒上下摩挲着`,
          ); // :3670
        } else {
          // :3671
          await era.printAndWait(
            `${master_name}将手中的玉足放到肉棒旁，双手微微分开${target_name}的大腿，映入眼帘的是${target_name}那美丽的幼女小穴。`,
          ); // :3672
          await era.printAndWait(
            `「哎？！自己分开。。。这样子，好害羞啊，但是，既然是主人的话，嗯~${heart(1)}请慢用……的说……」`,
          ); // :3673
          await era.printAndWait(
            `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
          ); // :3674
          await era.printAndWait(
            `${master_name}毫不犹豫的把头埋入${target_name}的双腿之间，伸出舌头品尝着可口的幼女小穴。`,
          ); // :3675
          await era.printAndWait(`「啊嗯~${heart(1)}主人~${heart(1)}」`); // :3676
          await era.printAndWait(
            `${target_name}一边被你舔着小穴，一边用小脚夹着你的肉棒上下摩挲着`,
          ); // :3677
        } // :3678
        // CFLAG:TARGET:339  = 4（变量语义：CFLAG 族，TARGET:339） // :3679
        chara(target).kojo.足交 = 4; // :3679
        return 0; // :3680
      } else if (
        era.get(`abl:${target}:20`) >= 1 &&
        (chara(target).kojo.足交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3682
        if (rand_n(2) == 0) {
          // :3683
          await era.printAndWait(`「用。。用脚做么，主人的癖好还真是奇怪呢~」`); // :3684
          await era.printAndWait(
            `${target_name}将小巧的脚丫放到了肉棒上。用足弓慢慢的摩挲着`,
          ); // :3685
        } else {
          // :3686
          await era.printAndWait(`「主人。。用。。用脚会让主人开心么。。」`); // :3687
          await era.printAndWait(
            `带着一些迟疑与好奇${target_name}用小巧的脚丫夹住了肉棒，上下不停的摩挲着`,
          ); // :3688
        } // :3689
        if (rand_n(3) == 0) {
          // :3690
          await era.printAndWait(`「啊？！主人的肉棒变得更大更热了！」`); // :3691
          await era.printAndWait(
            `${target_name}娇嫩的足底不住的摩挲着${master_name}的肉棒，美妙的触感使得肉棒越发狰狞。`,
          ); // :3692
          await era.printAndWait(
            `强烈的快感随着${target_name}的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让${master_name}欲罢不能。`,
          ); // :3693
        } else if (rand_n(2) == 0) {
          // :3694
          await era.printAndWait(`「主。主人。。刺激这里。会更舒服？？」`); // :3695
          await era.printAndWait(
            `${target_name}听从${master_name}的命令用玉趾刺激着马眼和冠状沟，小心翼翼的拨动反而使${master_name}的快感疯狂上升。`,
          ); // :3696
          await era.printAndWait(
            `强烈的快感随着${target_name}的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让${master_name}欲罢不能。`,
          ); // :3697
        } else {
          // :3698
          await era.printAndWait(
            `「既。。既然是主人的命令的话，${sc()}也只能尽力去做了呢！豁啦~」`,
          ); // :3699
          await era.printAndWait(
            `${target_name}在${master_name}的指示下，开始逐渐加重小脚的力度。随着力度的不断增加${master_name}越发能感受到${target_name}足底的娇嫩与幼女足交带来的强烈快感。`,
          ); // :3700
          await era.printAndWait(
            `强烈的快感随着${target_name}的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让${master_name}欲罢不能。`,
          ); // :3701
        } // :3702
        // CFLAG:TARGET:339  = 3（变量语义：CFLAG 族，TARGET:339） // :3703
        chara(target).kojo.足交 = 3; // :3703
        return 0; // :3704
      } else if (chara(target).kojo.足交 <= 1 || game.kojo.口上开关 == 2) {
        // :3706
        if (rand_n(2) == 0) {
          // :3707
          await era.printAndWait(`「要用脚来做嘛？？」`); // :3708
          await era.printAndWait(`${target_name}的脸上带着些许害怕与迟疑`); // :3709
          await era.printAndWait(
            `${master_name}毫不理会的抓过${target_name}的小脚放在了肉棒上`,
          ); // :3710
        } else {
          // :3711
          await era.printAndWait(`「还要用脚来做么。。呜。。」`); // :3712
          await era.printAndWait(
            `${target_name}带着一些迟疑与害怕，畏畏缩缩的把小脚放到了肉棒上`,
          ); // :3713
        } // :3714
        if (rand_n(2) == 0) {
          // :3715
          await era.printAndWait(`${target_name}用小脚慢慢的摩挲着肉棒。`); // :3716
          await era.printAndWait(`并不熟练的感觉，反而能带来另一种快感。`); // :3717
        } else {
          // :3718
          await era.printAndWait(
            `${target_name}的幼女小脚慢慢的摩挲着${master_name}的狰狞肉棒`,
          ); // :3719
          await era.printAndWait(
            `那种畏畏缩缩小心翼翼的感觉，带给${master_name}的快感完美的掩盖了${target_name}技术不熟练的瑕疵`,
          ); // :3720
        } // :3721
        // CFLAG:TARGET:339  = 2（变量语义：CFLAG 族，TARGET:339） // :3722
        chara(target).kojo.足交 = 2; // :3722
      } // :3723
      return 0; // :3724
    } // :3725
  } // :3726

  if (era_flag.selectcom == 40) {
    // :3731

    if (chara(target).kojo.打屁股 == 0) {
      // :3733
      await era.printAndWait(`「呜呜呜，好，好痛！」`); // :3734
      await era.printAndWait(
        `「${sc()}做错了什么吗，呜呜，对不起，对不起，不要打了啦！」`,
      ); // :3735
      // CFLAG:341  = 1（变量语义：CFLAG 族，341） // :3736
      chara(target).kojo.打屁股 = 1; // :3736
      return 0; // :3737
    } else {
      // :3739

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3741
        await era.printAndWait(`「呀……痛，痛，主人，好痛～❤」`); // :3742
        await era.printAndWait(
          `感受着屁股上的痛楚，${target_name}扭动着身体，那样子仿佛是在诱惑着${master_name}一样。`,
        ); // :3743
        await era.printAndWait(
          `明明还是小孩子的身体，却已经被调教的能从这种惩罚中获得快感了。`,
        ); // :3744
        await era.printAndWait(
          `「诶嘿嘿，${sc()}是坏孩子呢，所以请主人更严厉的惩罚${sc()}吧❤」`,
        ); // :3745
        // CFLAG:341  = 5（变量语义：CFLAG 族，341） // :3746
        chara(target).kojo.打屁股 = 5; // :3746
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3748
        await era.printAndWait(`「对不起……呜呜……${sc()}，哪里做的不好吗……」`); // :3749
        await era.printAndWait(
          `${target_name}轻轻的抽泣着，忍耐着从屁股上传来的痛楚。`,
        ); // :3750
        await era.printAndWait(`自己一定是哪里侍奉的不好才会被惩罚的吧。`); // :3751
        await era.printAndWait(`「呜呜……下次一定会更好的服侍主人的呜……」`); // :3752
        await era.printAndWait(`「（但是……是主人的话……就是被惩罚……也……）」`); // :3753
        // CFLAG:341  = 4（变量语义：CFLAG 族，341） // :3754
        chara(target).kojo.打屁股 = 4; // :3754
        return 0; // :3755
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3757
        await era.printAndWait(`「呜……咕……对，对不起……对不起……」`); // :3758
        await era.printAndWait(
          `因为虐待的疼痛而感到害怕的${target_name}，紧握着拳头，努力的忍耐着痛苦。`,
        ); // :3759
        await era.printAndWait(
          `看样子已经彻底的认识到了自己身为他人奴隶的事实。`,
        ); // :3760
        await era.printAndWait(`「对不起……呜……主人……请，请原谅我……」`); // :3761
        // CFLAG:341  = 3（变量语义：CFLAG 族，341） // :3762
        chara(target).kojo.打屁股 = 3; // :3762
        return 0; // :3763
      } else if (chara(target).kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        // :3765
        await era.printAndWait(`「呜呀……！对不起，对不起……！」`); // :3766
        await era.printAndWait(
          `不理会${target_name}的哀求，${master_name}用力的一下下的拍打着白嫩的小屁股。`,
        ); // :3767
        await era.printAndWait(`「呜呜……好……好痛呜……」`); // :3768
        // CFLAG:341  = 2（变量语义：CFLAG 族，341） // :3769
        chara(target).kojo.打屁股 = 2; // :3769
      } // :3770
      return 0; // :3771
    } // :3772
  } // :3773

  if (era_flag.selectcom == 41) {
    // :3778

    if (chara(target).kojo.鞭 == 0) {
      // :3780

      if (era.get(`talent:${target}:76`) == 1) {
        // :3782
        await era.printAndWait(`「呜呜……主人……这样子……呀……！」`); // :3783
        await era.printAndWait(
          `感受着身上传来的疼痛的${target_name}痛苦的呻吟着，但是声音之中似乎隐藏着一点快感的样子。`,
        ); // :3784
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3786
        await era.printAndWait(`「啊……主人……对不起……哈呜……对……不起……呜……！」`); // :3787
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。`,
        ); // :3788
      } else {
        // :3790
        await era.printAndWait(`「咿呀……哈咕……不要……不……不要呜啊啊」`); // :3791
        await era.printAndWait(
          `${target_name}因为疼痛蜷缩着身体，大声的哭个不停。`,
        ); // :3792
      } // :3793
      // CFLAG:342  = 1（变量语义：CFLAG 族，342） // :3794
      chara(target).kojo.鞭 = 1; // :3794
      return 0; // :3795
    } else {
      // :3797

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :3799
        await era.printAndWait(`「主人……好……好痛……不要……呀……呜……哈呜……❤」`); // :3800
        await era.printAndWait(
          `感受着身上传来的疼痛的${target_name}痛苦的呻吟着，但是声音之中似乎隐藏着一点快感的样子。`,
        ); // :3801
        await era.printAndWait(`「对……对不起……哈啊……啊……❤」`); // :3802
        // CFLAG:342  = 9（变量语义：CFLAG 族，342） // :3803
        chara(target).kojo.鞭 = 9; // :3803
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :3805
        await era.printAndWait(`「主人……好……好痛……不要……呀……呜……哈呜……」`); // :3806
        await era.printAndWait(
          `感受着身上传来的疼痛的${target_name}痛苦的呻吟着，缩着身体哀求着${master_name}。`,
        ); // :3807
        // CFLAG:342  = 8（变量语义：CFLAG 族，342） // :3808
        chara(target).kojo.鞭 = 8; // :3808
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3810
        // CFLAG:342  = 7（变量语义：CFLAG 族，342） // :3811
        chara(target).kojo.鞭 = 7; // :3811
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3813
        await era.printAndWait(`「啊……主人……对不起……哈呜……对……不起……呜……！」`); // :3814
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。`,
        ); // :3815
        await era.printAndWait(`「这也是……主人的……哈呜……！」`); // :3816
        // CFLAG:342  = 6（变量语义：CFLAG 族，342） // :3817
        chara(target).kojo.鞭 = 6; // :3817
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3819
        await era.printAndWait(`「啊……主人……对不起……哈呜……对……不起……呜……！」`); // :3820
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。`,
        ); // :3821
        // CFLAG:342  = 5（变量语义：CFLAG 族，342） // :3822
        chara(target).kojo.鞭 = 5; // :3822
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3824
        // CFLAG:342  = 4（变量语义：CFLAG 族，342） // :3825
        chara(target).kojo.鞭 = 4; // :3825
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3827
        await era.printAndWait(
          `${master_name}毫不留情一次次对着幼小的身体挥下鞭子。`,
        ); // :3828
        await era.printAndWait(`「啊呜呜……好痛……！不要打了……求求你……呀……！」`); // :3829
        await era.printAndWait(
          `${target_name}在疼痛下缩成一团，不停的抽泣着。`,
        ); // :3830
        // CFLAG:342  = 3（变量语义：CFLAG 族，342） // :3831
        chara(target).kojo.鞭 = 3; // :3831
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :3833
        // CFLAG:342  = 2（变量语义：CFLAG 族，342） // :3834
        chara(target).kojo.鞭 = 2; // :3834
      } // :3835
      return 0; // :3836
    } // :3837
  } // :3838

  if (era_flag.selectcom == 42) {
    // :3843

    if (chara(target).kojo.针 == 0) {
      // :3845

      if (era.get(`talent:${target}:76`) == 1) {
        // :3847
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3849
      } else {
        // :3851
      } // :3852
      // CFLAG:343  = 1（变量语义：CFLAG 族，343） // :3853
      chara(target).kojo.针 = 1; // :3853
      return 0; // :3854
    } else {
      // :3856

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :3858
        // CFLAG:343  = 9（变量语义：CFLAG 族，343） // :3859
        chara(target).kojo.针 = 9; // :3859
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :3861
        // CFLAG:343  = 8（变量语义：CFLAG 族，343） // :3862
        chara(target).kojo.针 = 8; // :3862
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3864
        // CFLAG:343  = 7（变量语义：CFLAG 族，343） // :3865
        chara(target).kojo.针 = 7; // :3865
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3867
        // CFLAG:343  = 6（变量语义：CFLAG 族，343） // :3868
        chara(target).kojo.针 = 6; // :3868
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3870
        // CFLAG:343  = 5（变量语义：CFLAG 族，343） // :3871
        chara(target).kojo.针 = 5; // :3871
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3873
        // CFLAG:343  = 4（变量语义：CFLAG 族，343） // :3874
        chara(target).kojo.针 = 4; // :3874
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3876
        // CFLAG:343  = 3（变量语义：CFLAG 族，343） // :3877
        chara(target).kojo.针 = 3; // :3877
      } else if (chara(target).kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        // :3879
        // CFLAG:343  = 2（变量语义：CFLAG 族，343） // :3880
        chara(target).kojo.针 = 2; // :3880
      } // :3881
      return 0; // :3882
    } // :3883
  } // :3884

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    // :3890

    if (chara(target).kojo.眼罩 == 0) {
      // :3892

      if (era.get(`talent:${target}:76`) == 1) {
        // :3894
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        ); // :3895
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3897
        await era.printAndWait(`「呜呜……虽然有点可怕……但是主人想的话……」`); // :3898
      } else {
        // :3900
        await era.printAndWait(`「不，不要啊……好可怕……」`); // :3901
      } // :3902
      // CFLAG:344  = 1（变量语义：CFLAG 族，344） // :3903
      chara(target).kojo.眼罩 = 1; // :3903
      return 0; // :3904
    } else {
      // :3906

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :3908
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        ); // :3909
        await era.printAndWait(
          `${target_name}有些兴奋的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        ); // :3910
        // CFLAG:344  = 9（变量语义：CFLAG 族，344） // :3911
        chara(target).kojo.眼罩 = 9; // :3911
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :3913
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        ); // :3914
        await era.printAndWait(
          `${target_name}期待的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        ); // :3915
        // CFLAG:344  = 8（变量语义：CFLAG 族，344） // :3916
        chara(target).kojo.眼罩 = 8; // :3916
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3918
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        ); // :3919
        // CFLAG:344  = 7（变量语义：CFLAG 族，344） // :3920
        chara(target).kojo.眼罩 = 7; // :3920
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3922
        await era.printAndWait(
          `「呜呜……虽然有点可怕……不过只要是主人想做的事情……」`,
        ); // :3923
        await era.printAndWait(
          `${target_name}有些兴奋的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        ); // :3924
        // CFLAG:344  = 6（变量语义：CFLAG 族，344） // :3925
        chara(target).kojo.眼罩 = 6; // :3925
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3927
        await era.printAndWait(`「呜呜……虽然有点可怕……但是主人想的话……」`); // :3928
        await era.printAndWait(
          `${target_name}期待的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        ); // :3929
        // CFLAG:344  = 5（变量语义：CFLAG 族，344） // :3930
        chara(target).kojo.眼罩 = 5; // :3930
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3932
        await era.printAndWait(`「呜呜……虽然有点可怕……但是主人想的话……」`); // :3933
        // CFLAG:344  = 4（变量语义：CFLAG 族，344） // :3934
        chara(target).kojo.眼罩 = 4; // :3934
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3936
        await era.printAndWait(`「呜……一定要……带这个咩……」`); // :3937
        await era.printAndWait(`${target_name}没有反抗，有些害怕的坐着。`); // :3938
        // CFLAG:344  = 3（变量语义：CFLAG 族，344） // :3939
        chara(target).kojo.眼罩 = 3; // :3939
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :3941
        await era.printAndWait(`「不，不要啊……好可怕……」`); // :3942
        // CFLAG:344  = 2（变量语义：CFLAG 族，344） // :3943
        chara(target).kojo.眼罩 = 2; // :3943
      } // :3944
      return 0; // :3945
    } // :3946
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    // :3948

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :3950
      await era.printAndWait(`「呼诶……已经结束了咩……？」`); // :3951
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :3952
      chara(target).kojo.眼罩着脱 = 3; // :3952
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :3954
      await era.printAndWait(`「呼啊啊……主……人……」`); // :3955
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :3956
      chara(target).kojo.眼罩着脱 = 2; // :3956
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :3958
      await era.printAndWait(`「呜呜……不，不要继续了啦……」`); // :3959
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :3960
      chara(target).kojo.眼罩着脱 = 1; // :3960
    } // :3961
    return 0; // :3962
  } // :3963

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    // :3969

    if (chara(target).kojo.绳子 == 0) {
      // :3971

      if (era.get(`talent:${target}:76`) == 1) {
        // :3973
        await era.printAndWait(
          `「诶嘿嘿，是这种play呢……感觉心脏激动在不停的跳呢❤」`,
        ); // :3974
        await era.printAndWait(
          `${target_name}兴奋的看着${master_name}，积极的配合着主人的动作被牢牢的绑住了。`,
        ); // :3975
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3977
        await era.printAndWait(`「虽，虽然有点可怕，但是只要是主人想要……」`); // :3978
        await era.printAndWait(
          `${target_name}有些害怕的闭着眼睛，毫不反抗的被牢牢的绑住了`,
        ); // :3979
      } else {
        // :3981
        await era.printAndWait(`「不要……不要……你，你要做什么……」`); // :3982
        await era.printAndWait(
          `${target_name}看着拿着绳子逼近的${master_name}，一步步的后退着，虽然激烈的进行反抗，但是仍然被绳子牢牢的绑住了。`,
        ); // :3983
      } // :3984
      // CFLAG:345  = 1（变量语义：CFLAG 族，345） // :3985
      chara(target).kojo.绳子 = 1; // :3985
      return 0; // :3986
    } else {
      // :3988

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :3990
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，感受着被紧缚住的快感，像小狗一样吐着舌头，呼出甜美的热气。`,
        ); // :3991
        await era.printAndWait(
          `「主人……这样子绑着什么的……哈啊啊………好开心……❤」`,
        ); // :3992
        // CFLAG:345  = 9（变量语义：CFLAG 族，345） // :3993
        chara(target).kojo.绳子 = 9; // :3993
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :3995
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，稚气的小脸上露出了欲望的表情，轻轻的喘息着。`,
        ); // :3996
        await era.printAndWait(`「主人……呼嗯……这样子的play……也不坏呢……❤」`); // :3997
        // CFLAG:345  = 8（变量语义：CFLAG 族，345） // :3998
        chara(target).kojo.绳子 = 8; // :3998
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4000
        // CFLAG:345  = 7（变量语义：CFLAG 族，345） // :4001
        chara(target).kojo.绳子 = 7; // :4001
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4003
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，小口小口的喘着气，下面好像已经变得湿漉漉的了。`,
        ); // :4004
        await era.printAndWait(
          `「主人……这样绑住的话……是要做更加H的事情吧……嗯……可以的哟……${sc()}的身体……请随便使用吧……❤」`,
        ); // :4005
        // CFLAG:345  = 6（变量语义：CFLAG 族，345） // :4006
        chara(target).kojo.绳子 = 6; // :4006
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4008
        await era.printAndWait(
          `「呼啊啊……主人……真是粗暴的说……诶嘿嘿……这样的主人也……好喜欢……❤」`,
        ); // :4009
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，轻轻扭动着稚嫩身体诱惑着${master_name}。`,
        ); // :4010
        // CFLAG:345  = 5（变量语义：CFLAG 族，345） // :4011
        chara(target).kojo.绳子 = 5; // :4011
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4013
        // CFLAG:345  = 4（变量语义：CFLAG 族，345） // :4014
        chara(target).kojo.绳子 = 4; // :4014
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4016
        await era.printAndWait(`「啊呜呜……不……不要……」`); // :4017
        await era.printAndWait(
          `${target_name}轻声喘息着，小小的身体被绳子紧紧的绑住，看起来像是待宰的羔羊一样。`,
        ); // :4018
        // CFLAG:345  = 3（变量语义：CFLAG 族，345） // :4019
        chara(target).kojo.绳子 = 3; // :4019
      } else if (chara(target).kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        // :4021
        // CFLAG:345  = 2（变量语义：CFLAG 族，345） // :4022
        chara(target).kojo.绳子 = 2; // :4022
      } // :4023
      return 0; // :4024
    } // :4025
  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) {
    // :4027

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.绳子着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4029
      await era.printAndWait(`「哈啊……已经结束了吗……❤」`); // :4030
      await era.printAndWait(`${target_name}有些遗憾的仰视着${master_name}。`); // :4031
      if (era.get(`abl:${target}:21`) >= 3) {
        // :4033
        await era.printAndWait(
          `在白皙的大腿之间，透明的爱液沿着内侧流了下来。`,
        ); // :4033
      } // :4033
      // CFLAG:385  = 3（变量语义：CFLAG 族，385） // :4034
      chara(target).kojo.绳子着脱 = 3; // :4034
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4036
      await era.printAndWait(`「哈呜呜……不会留下印子吧……」`); // :4037
      await era.printAndWait(`${target_name}红着脸看着仰视着${master_name}`); // :4038
      if (era.get(`abl:${target}:21`) >= 3) {
        // :4040
        await era.printAndWait(
          `在白皙的大腿之间，透明的爱液沿着内侧流了下来。`,
        ); // :4040
      } // :4040
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :4041
      chara(target).kojo.绳子着脱 = 2; // :4041
    } else if (chara(target).kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // :4043
      await era.printAndWait(`「哈啊……哈啊……」`); // :4044
      await era.printAndWait(`${target_name}轻轻抽泣着，抚摸着被绑的部位。`); // :4045
      if (era.get(`abl:${target}:21`) >= 3) {
        // :4047
        await era.printAndWait(`小脸上似乎泛着红晕……`); // :4047
      } // :4047
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :4048
      chara(target).kojo.绳子着脱 = 1; // :4048
    } // :4049
    return 0; // :4050
  } // :4051

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    // :4057

    if (chara(target).kojo.口塞 == 0) {
      // :4059

      if (era.get(`talent:${target}:76`) == 1) {
        // :4061
        await era.printAndWait(`「嗯咕……呼嗯……❤」`); // :4062
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        ); // :4063
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4065
        await era.printAndWait(`「嗯呜……呜呜……呼……」`); // :4066
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        ); // :4067
      } else {
        // :4069
        await era.printAndWait(`「不，不要……这种东西……呜……呜呜……？！」`); // :4070
        await era.printAndWait(
          `被强行塞上口球的${target_name}，晶莹的泪珠在眼眶里打转转。`,
        ); // :4071
      } // :4072
      // CFLAG:346  = 1（变量语义：CFLAG 族，346） // :4073
      chara(target).kojo.口塞 = 1; // :4073
      return 0; // :4074
    } else {
      // :4076

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :4078
        await era.printAndWait(`「嗯咕……呼嗯……嗯……❤」`); // :4079
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        ); // :4080
        await era.printAndWait(
          `稚气的小脸兴奋的看着${master_name}，唾液从口球的洞中滴落下来。`,
        ); // :4081
        // CFLAG:346  = 9（变量语义：CFLAG 族，346） // :4082
        chara(target).kojo.口塞 = 9; // :4082
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :4084
        await era.printAndWait(`「嗯咕……呼嗯……嗯……❤」`); // :4085
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        ); // :4086
        await era.printAndWait(`稚气的小脸兴奋的看着${master_name}。`); // :4087
        // CFLAG:346  = 8（变量语义：CFLAG 族，346） // :4088
        chara(target).kojo.口塞 = 8; // :4088
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4090
        await era.printAndWait(`「嗯咕……呼嗯……嗯……❤」`); // :4091
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        ); // :4092
        // CFLAG:346  = 7（变量语义：CFLAG 族，346） // :4093
        chara(target).kojo.口塞 = 7; // :4093
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4095
        await era.printAndWait(`「嗯呜……呼呜呜……呜……」`); // :4096
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        ); // :4097
        await era.printAndWait(
          `稚气的小脸兴奋的看着${master_name}，唾液从口球的洞中滴落下来。`,
        ); // :4098
        // CFLAG:346  = 6（变量语义：CFLAG 族，346） // :4099
        chara(target).kojo.口塞 = 6; // :4099
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4101
        await era.printAndWait(`「嗯呜……呼呜呜……呜……」`); // :4102
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        ); // :4103
        await era.printAndWait(`稚气的小脸兴奋的看着${master_name}。`); // :4104
        // CFLAG:346  = 5（变量语义：CFLAG 族，346） // :4105
        chara(target).kojo.口塞 = 5; // :4105
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4107
        await era.printAndWait(`「嗯呜……呼呜呜……呜……」`); // :4108
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        ); // :4109
        // CFLAG:346  = 4（变量语义：CFLAG 族，346） // :4110
        chara(target).kojo.口塞 = 4; // :4110
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4112
        await era.printAndWait(`「咕呜呜……呜……呜……」`); // :4113
        await era.printAndWait(
          `被强行塞上口球的${target_name}，晶莹的泪珠在眼眶里打转转。`,
        ); // :4114
        await era.printAndWait(`唾液从口球的洞中滴落下来。`); // :4115
        // CFLAG:346  = 3（变量语义：CFLAG 族，346） // :4116
        chara(target).kojo.口塞 = 3; // :4116
      } else if (chara(target).kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        // :4118
        await era.printAndWait(`「咕呜呜……呜……呜……」`); // :4119
        await era.printAndWait(
          `被强行塞上口球的${target_name}，晶莹的泪珠在眼眶里打转转。`,
        ); // :4120
        // CFLAG:346  = 2（变量语义：CFLAG 族，346） // :4121
        chara(target).kojo.口塞 = 2; // :4121
      } // :4122
      return 0; // :4123
    } // :4124
  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) {
    // :4126

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4128
      await era.printAndWait(`「嗯……呼啊……诶嘿嘿……❤」`); // :4129
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :4130
      chara(target).kojo.口塞着脱 = 3; // :4130
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4132
      await era.printAndWait(`「呼啊啊……口水都……」`); // :4133
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :4134
      chara(target).kojo.口塞着脱 = 2; // :4134
    } else if (chara(target).kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // :4136
      await era.printAndWait(`「呼……啊……不要了啦……这种事情……」`); // :4137
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :4138
      chara(target).kojo.口塞着脱 = 1; // :4138
    } // :4139
    return 0; // :4140
  } // :4141

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    // :4147

    if (chara(target).kojo.灌肠肛塞 == 0) {
      // :4149

      if (era.get(`talent:${target}:76`) == 1) {
        // :4151
        await era.printAndWait(`「啊啊……肚子里面……要坏掉了啦……❤」`); // :4152
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4154
        await era.printAndWait(`「呜呜……会……会加油的……哈……呜……」`); // :4155
      } else {
        // :4157
        await era.printAndWait(`「咿咿……不要……好难受……肚子……好难受啊……」`); // :4158
      } // :4159
      // CFLAG:347  = 1（变量语义：CFLAG 族，347） // :4160
      chara(target).kojo.灌肠肛塞 = 1; // :4160
      return 0; // :4161
    } else {
      // :4163

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4165
        await era.printAndWait(
          `「呼啊啊……这种肚子快要爆炸的感觉……呜嗯……好棒……❤」`,
        ); // :4166
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下露出了恍惚的表情。`,
        ); // :4167
        await era.printAndWait(
          `「诶嘿嘿……主人……就这样……做更多H的事情……吧……❤」`,
        ); // :4168
        await era.printAndWait(
          `感受着后面时不时传来的刺激，${target_name}魅惑的看着${master_name}，小小的身体时不时轻轻颤抖着。`,
        ); // :4169
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :4170
        chara(target).kojo.灌肠肛塞 = 7; // :4170
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4172
        await era.printAndWait(`「嗯哈……肚子里面……嗯……这样子不行啦……❤」`); // :4173
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下轻轻颤抖着。`,
        ); // :4174
        await era.printAndWait(
          `「嗯……但是这样子刺激的话……哈啊……不行……要去了啦……❤」`,
        ); // :4175
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :4176
        chara(target).kojo.灌肠肛塞 = 6; // :4176
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4178
        await era.printAndWait(
          `「啊呜呜……肚子里面……一直在响着……虽然难受……可是……感觉……好奇怪呜呜……」`,
        ); // :4179
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，不停的轻轻喘息着，从可爱的呻吟声来看，似乎痛苦中也混杂着快感的样子。`,
        ); // :4180
        await era.printAndWait(
          `「主人……那个……呜呜……请……请更加的……疼爱${sc()}吧……❤」`,
        ); // :4181
        await era.printAndWait(
          `感受着后面时不时传来的刺激，${target_name}撒娇一般的看着${master_name}。`,
        ); // :4182
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :4183
        chara(target).kojo.灌肠肛塞 = 5; // :4183
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4185
        await era.printAndWait(`「哈啊……呀……肚子里面……好难受……」`); // :4186
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下轻轻颤抖着。`,
        ); // :4187
        await era.printAndWait(`「呜呜……被主人这样子看着……好害羞……呜……」`); // :4188
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :4189
        chara(target).kojo.灌肠肛塞 = 4; // :4189
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4191
        await era.printAndWait(`「呜啊啊……肚子里面……呜呜……不行……哈啊啊……❤」`); // :4192
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下露出了违背本心的恍惚的表情。`,
        ); // :4193
        await era.printAndWait(`「这种事情……明明不行的……明明不行的说……」`); // :4194
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :4195
        chara(target).kojo.灌肠肛塞 = 3; // :4195
      } else if (chara(target).kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        // :4197
        await era.printAndWait(`「讨厌……不要……呜……好……难受……呀……」`); // :4198
        await era.printAndWait(
          `被${master_name}虐待着后面的${target_name}，捂着肚子颤抖着。`,
        ); // :4199
        await era.printAndWait(
          `「为什么……要做这种事情呜……肚子……要坏掉了啦……」`,
        ); // :4200
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :4201
        chara(target).kojo.灌肠肛塞 = 2; // :4201
      } // :4202
      return 0; // :4203
    } // :4204
  } // :4205

  if (era_flag.selectcom == 55) {
    // :4210

    if (chara(target).kojo.放置PLAY == 0) {
      // :4212

      if (era.get(`talent:${target}:76`) == 1) {
        // :4214
        await era.printAndWait(`「诶诶，为什么停下来了呢？」`); // :4215
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4217
        await era.printAndWait(`「呜呜……主……主人……？」`); // :4218
      } else {
        // :4220
        await era.printAndWait(`「不，不要看这边，呜呜……」`); // :4221
      } // :4222
      await era.print(''); // :4223

      if (era.get(`tequip:${target}:11`)) {
        // :4226
        await era.printAndWait(
          `${target_name}的秘裂里蠕虫蠢动着、毫不留情的在腔内转动着。`,
        ); // :4226
      } // :4226

      if (era.get(`tequip:${target}:13`)) {
        // :4229
        await era.printAndWait(
          `${target_name}的肛门里蠕虫蠢动着、毫不留情的蹂躏着腔内。`,
        ); // :4229
      } // :4229

      if (era.get(`tequip:${target}:19`)) {
        // :4232
        await era.printAndWait(
          `${target_name}的肛门里插入着肛珠、肛门紧缩着。`,
        ); // :4232
      } // :4232

      if (era.get(`tequip:${target}:14`)) {
        // :4235
        await era.printAndWait(
          `${target_name}的阴蒂被安装着的电动阴蒂夹持续刺激着。`,
        ); // :4235
      } // :4235

      if (era.get(`tequip:${target}:15`)) {
        // :4238
        await era.printAndWait(
          `${target_name}的乳头被安装着的电乳头夹持续刺激着。`,
        ); // :4238
      } // :4238

      if (era.get(`tequip:${target}:16`)) {
        // :4241
        await era.print(`${target_name}的胸部被装上的榨乳器吸出了母乳。`); // :4241
      } // :4241

      if (era.get(`tequip:${target}:17`)) {
        // :4244
        await era.printAndWait(
          `${target_name}的阴茎被装上了飞机杯，现在也好像快要射精了一样摆动着。`,
        ); // :4244
      } // :4244

      if (era.get(`tequip:${target}:43`)) {
        // :4247
        await era.printAndWait(`${target_name}被装上了眼罩。`); // :4247
      } // :4247

      if (era.get(`tequip:${target}:44`)) {
        // :4250
        await era.printAndWait(`${target_name}的身体被绳子绑住拘束了起来。`); // :4250
      } // :4250

      if (era.get(`tequip:${target}:46`)) {
        // :4253
        await era.printAndWait(
          `${target_name}的肚子因为灌肠而发出咕噜咕噜的声音、好像拔出塞子的话马上就会排出来似的。`,
        ); // :4253
      } // :4253

      if (era.get(`tequip:${target}:49`)) {
        // :4256
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、轻微的电流流过让括约肌颤动着。`,
        ); // :4256
      } // :4256

      if (era.get(`tequip:${target}:53`)) {
        // :4259
        await era.printAndWait(
          `然后、那样的${target_name}姿态被完全录了下来………`,
        ); // :4259
      } // :4259
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :4260
      chara(target).kojo.放置PLAY = 1; // :4260
      return 0; // :4261
    } else {
      // :4263

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4265
        await era.printAndWait(
          `「呜呜，主人，不要停下来啦……H的事情，还想要更多的说～❤」`,
        ); // :4266
        await era.printAndWait(
          `${target_name}的两腿不住的摩擦着，如果不是因为${master_name}的命令的话大概现在就已经开始自慰了吧。`,
        ); // :4267
        // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :4268
        chara(target).kojo.放置PLAY = 6; // :4268
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.放置PLAY <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4270
        await era.printAndWait(`「呼诶诶～继续来做嘛～主人～」`); // :4271
        // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :4272
        chara(target).kojo.放置PLAY = 5; // :4272
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4274
        await era.printAndWait(
          `「呜……主人……不要这样子……${sc()}没有主人的话……」`,
        ); // :4275
        await era.printAndWait(
          `${target_name}喘着气，大腿互相摩擦着，透明的爱液沿着大腿流了下来。`,
        ); // :4276
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :4277
        chara(target).kojo.放置PLAY = 4; // :4277
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4279
        await era.printAndWait(`「呜呜……主，主人……？怎么了呢……？」`); // :4280
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :4281
        chara(target).kojo.放置PLAY = 3; // :4281
      } else if (chara(target).kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        // :4283
        await era.printAndWait(`「不，不要……不要再做这种事了……」`); // :4284
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :4285
        chara(target).kojo.放置PLAY = 2; // :4285
      } // :4286
      await era.print(''); // :4287

      if (era.get(`tequip:${target}:11`)) {
        // :4290
        await era.printAndWait(
          `${target_name}的秘裂里蠕虫蠢动着、毫不留情的在腔内转动着。`,
        ); // :4290
      } // :4290

      if (era.get(`tequip:${target}:13`)) {
        // :4293
        await era.printAndWait(
          `${target_name}的肛门里蠕虫蠢动着、毫不留情的蹂躏着腔内。`,
        ); // :4293
      } // :4293

      if (era.get(`tequip:${target}:19`)) {
        // :4296
        await era.printAndWait(
          `${target_name}的肛门里插入着肛珠、肛门紧缩着。`,
        ); // :4296
      } // :4296

      if (era.get(`tequip:${target}:14`)) {
        // :4299
        await era.printAndWait(
          `${target_name}的阴蒂被安装着的电动阴蒂夹持续刺激着。`,
        ); // :4299
      } // :4299

      if (era.get(`tequip:${target}:15`)) {
        // :4302
        await era.printAndWait(
          `${target_name}的乳头被安装着的电乳头夹持续刺激着。`,
        ); // :4302
      } // :4302

      if (era.get(`tequip:${target}:16`)) {
        // :4305
        await era.print(`${target_name}的胸部被装上的榨乳器吸出了母乳。`); // :4305
      } // :4305

      if (era.get(`tequip:${target}:17`)) {
        // :4308
        await era.printAndWait(
          `${target_name}的阴茎被装上了飞机杯，现在也好像快要射精了一样摆动着。`,
        ); // :4308
      } // :4308

      if (era.get(`tequip:${target}:43`)) {
        // :4311
        await era.printAndWait(`${target_name}被装上了眼罩。`); // :4311
      } // :4311

      if (era.get(`tequip:${target}:44`)) {
        // :4314
        await era.printAndWait(`${target_name}的身体被绳子绑住拘束了起来。`); // :4314
      } // :4314

      if (era.get(`tequip:${target}:46`)) {
        // :4317
        await era.printAndWait(
          `${target_name}的肚子因为灌肠而发出咕噜咕噜的声音、好像拔出塞子的话马上就会排出来似的。`,
        ); // :4317
      } // :4317

      if (era.get(`tequip:${target}:49`)) {
        // :4320
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、轻微的电流流过让括约肌颤动着。`,
        ); // :4320
      } // :4320

      if (era.get(`tequip:${target}:53`)) {
        // :4323
        await era.printAndWait(
          `然后、那样的${target_name}姿态被完全录了下来………`,
        ); // :4323
      } // :4323
      return 0; // :4324
    } // :4325
  } // :4326

  if (era_flag.selectcom == 56) {
    // :4333

    if (chara(target).kojo.交谈 == 0) {
      // :4335

      if (era.get(`tequip:${target}:53`) == 1) {
        // :4337
        await era.print(`${master_name}命令${target_name}做一个自我介绍。`); // :4338
        if (
          rand_n(3) == 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // :4339
          await era.print(`于是${target_name}将自己的名字、喜欢的H的方式`); // :4340
          if (era.get(`abl:${target}:31`) >= 3) {
            // :4342
            await era.print(`还有手淫时妄想的内容`); // :4342
          } // :4342
          await era.printAndWait(`之类的介绍了出来……`); // :4343
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4344
          era.set('tflag:32 |', 2); // :4344
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :4345
          await era.print(
            `${target_name}稚气的小脸上浮现出和年龄不符的欲望，轻咬着手指对着水晶球作着自我介绍。`,
          ); // :4346
          await era.printAndWait(`「那个……人家的名字是${target_name}呢～」`); // :4347
          await era.printAndWait(
            `「最喜欢的事情呢，当然是和魔王大人最H的事情了～❤」`,
          ); // :4348
          await era.printAndWait(
            `「诶嘿嘿，魔王大人的肉棒，超～舒服的呢～❤小穴也好屁股也好嘴巴也好，哪里都被肉棒弄的很舒服的说～❤」`,
          ); // :4349
          await era.printAndWait(
            `「现在每天都要想着魔王大人的肉棒自慰个不停呢～❤」`,
          ); // :4350
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4351
          era.set('tflag:32 |', 2); // :4351
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :4352
          await era.print(
            `${target_name}羞红着脸对着水晶球作着自我介绍，时不时看向${master_name}。`,
          ); // :4353
          await era.printAndWait(
            `「啊呜呜……那个……好害羞的说……那个……人家的名字是${target_name}……」`,
          ); // :4354
          await era.printAndWait(
            `「嗯……虽然是单方面的……那个……现在……那个……在恋爱中……大概……」`,
          ); // :4355
          await era.printAndWait(
            `「诶诶……喜欢的人？那个……一定要说的话……呜……那个……魔王大人呢……」`,
          ); // :4356
          await era.printAndWait(
            `「那个……只要魔王大人要求的话……虽然很害羞……但是……请大家看……亲热的事情……的说……」`,
          ); // :4357
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4358
          era.set('tflag:32 |', 2); // :4358
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          // :4359
          await era.print(
            `${target_name}一边介绍着自己，一边蹭着${master_name}。`,
          ); // :4360
          await era.printAndWait(`两腿之间好像已经湿了……`); // :4361
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4362
          era.set('tflag:32 |', 2); // :4362
        } else if (
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          // :4363
          await era.printAndWait(
            `${target_name}乖巧的向着水晶球开始了自我介绍。`,
          ); // :4364
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4365
          era.set('tflag:32 |', 2); // :4365
        } else {
          // :4366
          await era.printAndWait(
            `${target_name}一句话也不说，一直抽泣个不停。`,
          ); // :4367
        } // :4368
      } else {
        // :4369
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          // :4370
          await era.print(
            `${target_name}一边与${master_name}说着话，一边对着${master_name}露出了重要的地方。`,
          ); // :4371
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          // :4372
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，说着色色的话语。`,
          ); // :4373
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // :4374
          await era.print(`${target_name}一边压抑着`); // :4375
          if (
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`)
          ) {
            // :4376
            await era.print(`快乐的`); // :4377
          } else if (
            era.get(`tequip:${target}:44`) ||
            era.get(`tequip:${target}:49`)
          ) {
            // :4378
            await era.print(`痛苦的`); // :4379
          } // :4380
          await era.print(`呼吸声，一边努力回应着${master_name}……`); // :4381
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :4383
          await era.print(
            `${target_name}一边这么说着，一边对着水晶球露出了重要的地方。`,
          ); // :4384
          await era.printAndWait(`「这里……好想被主人疼爱呢……❤」`); // :4385
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          // :4386
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，对着水晶球说着色色的话语。`,
          ); // :4387
          await era.printAndWait(`「呐呐……主人……快点……来做舒服的事情吧……❤」`); // :4388
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          // :4389
          await era.print(
            `${target_name}大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。`,
          ); // :4390
          await era.printAndWait(`「嗯……❤呀……哈啊……❤」`); // :4391
        } else {
          // :4392
          await era.print(`${target_name}乖巧的低着头听着。`); // :4393
        } // :4394
      } // :4395
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :4396
      chara(target).kojo.交谈 = 1; // :4396
      return 0; // :4397
    } else {
      // :4399

      if (era.get(`tequip:${target}:53`) == 1) {
        // :4401
        await era.print(`${master_name}催促着${target_name}进行自我介绍。`); // :4402
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          // :4403
          await era.print(
            `${target_name}一边自我介绍着，一边对着水晶球露出了重要的地方。`,
          ); // :4404
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4405
          era.set('tflag:32 |', 2); // :4405
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          // :4406
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，对着水晶球说着色色的话语。`,
          ); // :4407
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4408
          era.set('tflag:32 |', 2); // :4408
        } else if (
          rand_n(3) == 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // :4409
          await era.print(`于是${target_name}将自己的名字、喜欢的H的方式`); // :4410
          if (era.get(`abl:${target}:31`) >= 3) {
            // :4412
            await era.print(`还有手淫时妄想的内容`); // :4412
          } // :4412
          await era.printAndWait(`之类的介绍了出来……`); // :4413
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4414
          era.set('tflag:32 |', 2); // :4414
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :4415
          await era.print(
            `${target_name}稚气的小脸上浮现出和年龄不符的欲望，轻咬着手指对着水晶球作着自我介绍。`,
          ); // :4416
          await era.printAndWait(`「那个……人家的名字是${target_name}呢～」`); // :4417
          await era.printAndWait(
            `「最喜欢的事情呢，当然是和魔王大人最H的事情了～❤」`,
          ); // :4418
          await era.printAndWait(
            `「诶嘿嘿，魔王大人的肉棒，超～舒服的呢～❤小穴也好屁股也好嘴巴也好，哪里都被肉棒弄的很舒服的说～❤」`,
          ); // :4419
          await era.printAndWait(
            `「现在每天都要想着魔王大人的肉棒自慰个不停呢～❤」`,
          ); // :4420
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4421
          era.set('tflag:32 |', 2); // :4421
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :4422
          await era.print(
            `${target_name}羞红着脸对着水晶球作着自我介绍，时不时看向${master_name}。`,
          ); // :4423
          await era.printAndWait(
            `「啊呜呜……那个……好害羞的说……那个……人家的名字是${target_name}……」`,
          ); // :4424
          await era.printAndWait(
            `「嗯……虽然是单方面的……那个……现在……那个……在恋爱中……大概……」`,
          ); // :4425
          await era.printAndWait(
            `「诶诶……喜欢的人？那个……一定要说的话……呜……那个……魔王大人呢……」`,
          ); // :4426
          await era.printAndWait(
            `「那个……只要魔王大人要求的话……虽然很害羞……但是……请大家看……亲热的事情……的说……」`,
          ); // :4427
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4428
          era.set('tflag:32 |', 2); // :4428
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          // :4429
          await era.print(
            `${target_name}一边这么说着，一边蹭着${master_name}。`,
          ); // :4430
          await era.print(`两腿之间好像已经湿了……`); // :4431
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4432
          era.set('tflag:32 |', 2); // :4432
        } else if (
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          // :4433
          await era.print(`${target_name}乖巧的向着水晶球开始自我介绍了`); // :4434
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4435
          era.set('tflag:32 |', 2); // :4435
        } else {
          // :4436
          await era.printAndWait(
            `${target_name}一句话也不说，一直抽泣个不停。`,
          ); // :4437
        } // :4438
      } else {
        // :4439
        await era.print(`${player_name}`); // :4440
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          // :4441
          await era.print(
            `${target_name}一边与${master_name}说着话，一边对着${master_name}露出了重要的地方。`,
          ); // :4442
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          // :4443
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，对着${master_name}说着色色的话语。`,
          ); // :4444
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // :4445
          await era.print(`${target_name}一边压抑着`); // :4446
          if (
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`)
          ) {
            // :4447
            await era.print(`快乐的`); // :4448
          } else if (
            era.get(`tequip:${target}:44`) ||
            era.get(`tequip:${target}:49`)
          ) {
            // :4449
            await era.print(`痛苦的`); // :4450
          } // :4451
          await era.print(`呼吸声，一边努力回应着${master_name}……`); // :4452
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :4454
          await era.print(
            `${target_name}一边这么说着，一边对着${master_name}露出了重要的地方。`,
          ); // :4455
          await era.printAndWait(`「这里……好想被主人疼爱呢……❤」`); // :4456
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          // :4457
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，说着色色的话语。`,
          ); // :4458
          await era.printAndWait(`「呐呐……主人……快点……来做舒服的事情吧……❤」`); // :4459
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          // :4460
          await era.print(
            `${target_name}大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。`,
          ); // :4461
          await era.printAndWait(`「嗯……❤呀……哈啊……❤」`); // :4462
        } else {
          // :4463
          await era.print(`${target_name}乖巧的低着头听着。`); // :4464
        } // :4465
        return 0; // :4466
      } // :4467
    } // :4468

    if (era_flag.selectcom == 123) {
      // :4474

      if (chara(target).kojo.乳夹口交 == 0) {
        // :4476

        if (era.get(`talent:${target}:76`) == 1) {
          // :4478
          await era.printAndWait(
            `「诶嘿嘿……主人的美味的肉棒……${sc()}会好好的让它舒服的哟❤」`,
          ); // :4479
          await era.printAndWait(
            `${target_name}散发着和稚气的外表不符的色气，用平坦而柔软的小胸部开始摩擦起${master_name}的肉棒来。`,
          ); // :4480
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :4483
          await era.printAndWait(
            `「呼啊……主人的那个……还是那么……呜……雄伟的说……」`,
          ); // :4484
          await era.printAndWait(`「嗯～${sc()}会努力让主人变得舒服起来的～」`); // :4485
          await era.printAndWait(
            `${target_name}微微有些害羞的仰着头看着${master_name}，用平坦而柔软的小胸部开始侍奉起${master_name}的肉棒来。`,
          ); // :4486
        } else if (era.get(`abl:${target}:16`) >= 3) {
          // :4488
          await era.printAndWait(`「用……用胸部吗……明白了的说……」`); // :4489
          await era.printAndWait(
            `${target_name}顺从的用平坦而柔软的小胸部开始侍奉起${master_name}的肉棒来。`,
          ); // :4490
        } else {
          // :4492
          await era.printAndWait(`「呜呜……这……这种事情……呜……讨厌啦……」`); // :4493
          await era.printAndWait(
            `${target_name}在${master_name}的命令下挂着泪珠不情愿的用平坦而柔软的小胸部摩擦着肉棒。`,
          ); // :4494
        } // :4495
        // CFLAG:360  = 1（变量语义：CFLAG 族，360） // :4496
        chara(target).kojo.乳夹口交 = 1; // :4496
        return 0; // :4497
      } else {
        // :4499

        if (
          era.get(`talent:${target}:76`) == 1 &&
          (chara(target).kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
        ) {
          // :4501
          await era.printAndWait(
            `「诶嘿嘿……主人的肉棒……嗯……好热……好硬……感觉……好棒呢……❤」`,
          ); // :4502
          await era.printAndWait(
            `「虽然胸部很小，但是这样～这样～嗯……啾哈……呐呐……舒服吗……？❤」`,
          ); // :4503
          await era.printAndWait(
            `${target_name}的小脸上浮现出色色的表情，一边用平坦而柔软的小胸部开始摩擦起${master_name}的肉棒，一边轻轻舔舐着前端。`,
          ); // :4504
          // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :4505
          chara(target).kojo.乳夹口交 = 5; // :4505
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :4507
          await era.printAndWait(
            `「嗯……能侍奉主人什么的……${sc()}很开心的说……」`,
          ); // :4508
          await era.printAndWait(
            `「呐呐……主人……这样子……感觉怎么样……舒服吗……？」`,
          ); // :4509
          await era.printAndWait(
            `${target_name}的一边用平坦而柔软的小胸部侍奉着${master_name}的肉棒，一边仰着头询问着${master_name}的感觉。`,
          ); // :4510
        } else if (
          era.get(`abl:${target}:16`) >= 3 &&
          (chara(target).kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :4512
          await era.printAndWait(`「主人……这个力度……可以吗……？」`); // :4513
          await era.printAndWait(`「这种事情……不太擅长呢……」`); // :4514
          await era.printAndWait(
            `${target_name}乖巧而有些笨拙的用平坦而柔软的小胸部侍奉着${master_name}的肉棒。`,
          ); // :4515
          // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :4516
          chara(target).kojo.乳夹口交 = 3; // :4516
        } else if (
          chara(target).kojo.乳夹口交 <= 1 ||
          game.kojo.口上开关 == 2
        ) {
          // :4518
          await era.printAndWait(`「呜呜……为什么要做这种事情……呜……真是的……」`); // :4519
          await era.printAndWait(
            `因为畏惧着${master_name}，${target_name}在挂着泪珠不情愿的用平坦而柔软的小胸部摩擦着肉棒。`,
          ); // :4520
        } // :4521
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :4522
        chara(target).kojo.乳夹口交 = 2; // :4522
      } // :4523
      return 0; // :4524
    } // :4525
  } // :4526

  if (era_flag.selectcom == 125) {
    // :4530

    if (chara(target).kojo.口交时自慰 == 0) {
      // :4532

      if (era.get(`talent:${target}:76`) == 1) {
        // :4534
        await era.printAndWait(
          `「哈呜……嗯……呜……呼啊……主人的……肉棒……呼……好美味……❤」`,
        ); // :4535
        await era.printAndWait(
          `${target_name}一边像吃棒棒糖一样舔弄吮吸着粗大的肉棒，一边用小手摩擦着自己的下半身，透明的爱液将手指弄的湿漉漉的，从幼嫩的下体滴到地上。`,
        ); // :4536
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4538
        await era.printAndWait(`「啊呜……呼……嗯……主人……嗯……喜欢……最喜欢了……」`); // :4539
        await era.printAndWait(
          `${target_name}开心的用小嘴侍奉着${master_name}的肉棒，在${master_name}的命令下玩弄着自己的身体，濡湿的下半身将手指弄的湿漉漉的。`,
        ); // :4540
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4542
        await era.printAndWait(
          `「呼嗯……哈……自己……嗯……弄吗……这样子……呼呜……可以吗……？」`,
        ); // :4543
        await era.printAndWait(
          `在${master_name}的命令下，${target_name}一边用小嘴服侍着肉棒，一边用手指在两腿之间轻轻摩擦着。`,
        ); // :4544
      } else {
        // :4546
        await era.printAndWait(`「啊呜呜……这种事……呜……太……羞耻了呜……」`); // :4547
        await era.printAndWait(
          `${target_name}挂着泪珠不情愿的在${master_name}的命令下一边含着肉棒，一边用手指摩擦着自己两腿之间。`,
        ); // :4548
      } // :4549
      // CFLAG:361  = 1（变量语义：CFLAG 族，361） // :4550
      chara(target).kojo.口交时自慰 = 1; // :4550
      return 0; // :4551
    } else {
      // :4553

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4555
        await era.printAndWait(
          `「呼嗯……嗯……主人的……呼啊……又热又硬呢……诶嘿嘿……好美味呢……❤」`,
        ); // :4556
        await era.printAndWait(
          `${target_name}一边像吃棒棒糖一样舔弄吮吸着粗大的肉棒，一边用小手摩擦着自己的下半身，透明的爱液将手指弄的湿漉漉的，从幼嫩的下体滴到地上。`,
        ); // :4557
        if (era.get(`talent:${target}:0`) == 1) {
          // :4559
          await era.printAndWait(
            `「哈啊……这里……好想被肉棒侵犯……好想被主人的肉棒插进来……在里面……咕啾咕啾的……嗯……❤」`,
          ); // :4559
        } // :4559
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :4560
        chara(target).kojo.口交时自慰 = 5; // :4560
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4562
        await era.printAndWait(`「啊呜……呼……嗯……主人……嗯……喜欢……最喜欢了……」`); // :4563
        await era.printAndWait(
          `${target_name}开心的用小嘴侍奉着${master_name}的肉棒，在${master_name}的命令下玩弄着自己的身体，濡湿的下半身将手指弄的湿漉漉的。`,
        ); // :4564
        if (era.get(`talent:${target}:0`) == 1) {
          // :4566
          await era.printAndWait(
            `「嗯……和主人在一起……真是……超幸福呢……如果能和主人……嗯……变成主人的东西的话……」`,
          ); // :4566
        } // :4566
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :4567
        chara(target).kojo.口交时自慰 = 4; // :4567
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4569
        await era.printAndWait(
          `「呼嗯……哈……自己……嗯……弄吗……这样子……呼呜……可以吗……？」`,
        ); // :4570
        await era.printAndWait(
          `在${master_name}的命令下，${target_name}一边用小嘴服侍着肉棒，一边用手指在两腿之间轻轻摩擦着。`,
        ); // :4571
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :4572
        chara(target).kojo.口交时自慰 = 3; // :4572
      } else if (
        chara(target).kojo.口交时自慰 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        // :4574
        await era.printAndWait(`「啊呜呜……这种事……呜……太……羞耻了呜……」`); // :4575
        await era.printAndWait(
          `${target_name}挂着泪珠不情愿的在${master_name}的命令下一边含着肉棒，一边用手指摩擦着自己两腿之间。`,
        ); // :4576
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :4577
        chara(target).kojo.口交时自慰 = 2; // :4577
      } // :4578
      return 0; // :4579
    } // :4580
  } // :4581

  if (era_flag.selectcom == 126) {
    // :4586

    if (chara(target).kojo.手搓口交 == 0) {
      // :4588

      if (era.get(`talent:${target}:76`) == 1) {
        // :4590
        await era.printAndWait(
          `「主人的肉棒……啾～❤要在${sc()}嘴里射好多好多的牛奶哟～❤」`,
        ); // :4591
        await era.printAndWait(
          `${target_name}开心的舔弄着肉棒，小手也随着舌头一起按摩着。`,
        ); // :4592
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4594
        await era.printAndWait(`「呼啊……嗯……主人……这样子……舒服吗……？」`); // :4595
        await era.printAndWait(
          `${target_name}含住前端温柔的舔弄着，小手轻轻揉捏着肉棒。`,
        ); // :4596
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4598
        await era.printAndWait(`「啊呜……嗯……嗯呜……主人……是……这样吗……？」`); // :4599
      } else {
        // :4601
        await era.printAndWait(
          `「呜呜……用手……和嘴巴什么的……呜……这种……地方……」`,
        ); // :4602
      } // :4603
      // CFLAG:362  = 1（变量语义：CFLAG 族，362） // :4604
      chara(target).kojo.手搓口交 = 1; // :4604
      return 0; // :4605
    } else {
      // :4607

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4609
        await era.printAndWait(
          `「主人的肉棒……啾～❤要在${sc()}嘴里射好多好多的牛奶哟～❤」`,
        ); // :4610
        await era.printAndWait(
          `${target_name}开心的舔弄着肉棒，小手也随着舌头一起按摩着。`,
        ); // :4611
        await era.printAndWait(
          `「肉棒在颤抖着呢……诶嘿嘿❤就这么舒服吗～漏出来的东西也……好美味……嗯呼……❤」`,
        ); // :4612
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :4613
        chara(target).kojo.手搓口交 = 5; // :4613
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4615
        await era.printAndWait(`「呼啊……嗯……主人……这样子……舒服吗……？」`); // :4616
        await era.printAndWait(
          `${target_name}含住前端温柔的舔弄着，小手轻轻揉捏着肉棒，在含不进去的部分按摩着。`,
        ); // :4617
        await era.printAndWait(`「啾嗯……嗯……呼……主人的味道……嗯……最喜欢了……❤」`); // :4618
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :4619
        chara(target).kojo.手搓口交 = 4; // :4619
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4621
        await era.printAndWait(`「啊呜……嗯……嗯呜……主人……是……这样吗……？」`); // :4622
        await era.printAndWait(
          `${target_name}顺从的听从着${master_name}的命令，努力的用小手和嘴巴侍奉着肉棒。`,
        ); // :4623
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :4624
        chara(target).kojo.手搓口交 = 3; // :4624
      } else if (chara(target).kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        // :4626
        await era.printAndWait(
          `「呜呜……用手……和嘴巴什么的……呜……这种……地方……」`,
        ); // :4627
        await era.printAndWait(
          `${target_name}的小手轻握着肉棒，不太情缘的服侍着。`,
        ); // :4628
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :4629
        chara(target).kojo.手搓口交 = 2; // :4629
      } // :4630
      return 0; // :4631
    } // :4632
  } // :4633

  if (era_flag.selectcom == 127) {
    // :4639

    if (chara(target).kojo.真空口交 == 0) {
      // :4641

      if (era.get(`talent:${target}:76`) == 1) {
        // :4643
        await era.printAndWait(`「嗯啾……呼……啾……嗯……肉棒……啾……好好吃……❤」`); // :4644
        await era.printAndWait(
          `将${master_name}粗大的肉棒完全含住的${target_name}用力的吮吸着，发出了非常淫乱的声音。`,
        ); // :4645
        await era.printAndWait(`「主人的……肉棒……啾噗……呜……嗯……❤」`); // :4646
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4648
        await era.printAndWait(
          `「嗯呜……啾……啾噗……呼哈……主人的……味道……好浓烈呢……」`,
        ); // :4649
        await era.printAndWait(
          `${target_name}温暖的小嘴紧紧的包裹着肉棒，用力的吮吸个不停，滋滋的发出了非常淫乱的声音。`,
        ); // :4650
        await era.printAndWait(`「啾……哈呜……主人……这样子……啾噗……舒服吗……？」`); // :4651
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4653
        await era.printAndWait(
          `「嗯啾……呜……呼……这样子……主人……满意……呜……吗？」`,
        ); // :4654
      } else {
        // :4656
        await era.printAndWait(
          `「呜……啾噗……奇怪的味道……呜……一定要……这么做吗……？」`,
        ); // :4657
      } // :4658
      // CFLAG:363  = 1（变量语义：CFLAG 族，363） // :4659
      chara(target).kojo.真空口交 = 1; // :4659
      return 0; // :4660
    } else {
      // :4662

      if (era.get(`talent:${target}:76`) == 1) {
        // :4664
        await era.printAndWait(`「嗯啾……呼……啾……嗯……肉棒……啾……好好吃……❤」`); // :4665
        await era.printAndWait(
          `将${master_name}粗大的肉棒完全含住的${target_name}用力的吮吸着，发出了非常淫乱的声音。`,
        ); // :4666
        await era.printAndWait(`「主人的……肉棒……啾噗……呜……嗯……❤」`); // :4667
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :4668
        chara(target).kojo.真空口交 = 5; // :4668
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4670
        await era.printAndWait(
          `「嗯呜……啾……啾噗……呼哈……主人的……味道……好浓烈呢……」`,
        ); // :4671
        await era.printAndWait(
          `${target_name}温暖的小嘴紧紧的包裹着肉棒，用力的吮吸个不停，滋滋的发出了非常淫乱的声音。`,
        ); // :4672
        await era.printAndWait(`「啾……哈呜……主人……这样子……啾噗……舒服吗……？」`); // :4673
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :4674
        chara(target).kojo.真空口交 = 4; // :4674
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4676
        await era.printAndWait(
          `「嗯啾……呜……呼……这样子……主人……满意……呜……吗？」`,
        ); // :4677
        await era.printAndWait(
          `${target_name}含着眼泪用力的吮吸着肉棒，发出了非常淫乱的声音。`,
        ); // :4678
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :4679
        chara(target).kojo.真空口交 = 3; // :4679
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :4681
        await era.printAndWait(
          `「呜……啾噗……奇怪的味道……呜……一定要……这么做吗……？」`,
        ); // :4682
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :4683
        chara(target).kojo.真空口交 = 2; // :4683
      } // :4684
      return 0; // :4685
    } // :4686
  } // :4687

  if (era_flag.selectcom == 69) {
    // :4692

    if (chara(target).kojo.六九式 == 0) {
      // :4694

      if (era.get(`talent:${target}:76`) == 1) {
        // :4696
        await era.printAndWait(`「呼啊……主人的肉棒……还想要……更多……嗯啾……❤」`); // :4697
        await era.printAndWait(
          `${target_name}趴在${master_name}身上吮吸着肉棒，感受着双腿之间被舌头侵犯的快感。`,
        ); // :4698
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4699
        await era.printAndWait(
          `「主……主人也要做吗……那种事情……诶嘿嘿……感觉……好开心……❤」`,
        ); // :4700
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加细心的服侍着肉棒，小小的舌头在肉棒上轻轻的滑动着。`,
        ); // :4701
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4703
        await era.printAndWait(`「呜呜……被主人弄这种事……呜……感觉……很荣幸……」`); // :4704
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加卖力的服侍着肉棒。`,
        ); // :4705
      } else {
        // :4707
        await era.printAndWait(`「哈呜呜……不，不要那样子舔呜呜……」`); // :4708
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}的脸的更红了。`,
        ); // :4709
      } // :4710
      // CFLAG:364  = 1（变量语义：CFLAG 族，364） // :4711
      chara(target).kojo.六九式 = 1; // :4711
      return 0; // :4712
    } else {
      // :4714

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4716
        await era.printAndWait(`「呼啊……主人的肉棒……还想要……更多……嗯啾……❤」`); // :4717
        await era.printAndWait(
          `${target_name}趴在${master_name}身上吮吸着肉棒，感受着双腿之间被舌头侵犯的快感。`,
        ); // :4718
        await era.printAndWait(`「嗯……哈啊……主人的舌头……舔的好舒服呢……嗯……❤」`); // :4719
        await era.printAndWait(`「${sc()}也不能输呐❤」`); // :4720
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :4721
        chara(target).kojo.六九式 = 5; // :4721
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4723
        await era.printAndWait(
          `「主……主人也要做吗……那种事情……诶嘿嘿……感觉……好开心……❤」`,
        ); // :4724
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加细心的服侍着肉棒，小小的舌头在肉棒上轻轻的滑动着。`,
        ); // :4725
        await era.printAndWait(`「嗯……啾……舔这里的话……主人会舒服呢……」`); // :4726
        await era.printAndWait(
          `「在轻轻颤抖着呢……诶嘿嘿……❤${sc()}会更加努力的～」`,
        ); // :4727
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :4728
        chara(target).kojo.六九式 = 4; // :4728
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4730
        await era.printAndWait(`「呜呜……被主人弄这种事……呜……感觉……很荣幸……」`); // :4731
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加卖力的服侍着肉棒。`,
        ); // :4732
        await era.printAndWait(`「啊呜……呼……热热的呢……」`); // :4733
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :4734
        chara(target).kojo.六九式 = 3; // :4734
      } else if (chara(target).kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        // :4736
        await era.printAndWait(`「哈呜呜……不，不要那样子舔呜呜……」`); // :4737
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}的脸的更红了。`,
        ); // :4738
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :4739
        chara(target).kojo.六九式 = 2; // :4739
      } // :4740
      return 0; // :4741
    } // :4742
  } // :4743

  if (era_flag.selectcom == 124) {
    // :4748

    if (chara(target).kojo.深喉 == 0) {
      // :4750

      if (era.get(`talent:${target}:76`) == 1) {
        // :4752
        await era.printAndWait(`「含到最里面？嗯～没问题哟～❤」`); // :4753
        await era.printAndWait(
          `${target_name}毫不犹豫的含住了肉棒，温热的小嘴不断吞咽着，布丁一样柔软的最里面蠕动着按摩着肉棒的前端。`,
        ); // :4754
        await era.printAndWait(`「嗯……嗯嗯……呜……咕……」`); // :4755
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4757
        await era.printAndWait(
          `「最，最里面吗……呜嗯……为了主人的话……不管什么都没问题的哟……」`,
        ); // :4758
        await era.printAndWait(
          `${target_name}粉嫩的嘴唇轻碰着肉棒的前端，温热的小嘴慢慢的将肉棒含了进去，一点点的进入到布丁一样柔软的最里面。`,
        ); // :4759
        await era.printAndWait(`「嗯……啾……哈呜呜……」`); // :4760
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4762
        await era.printAndWait(`「呜……全部都……含进去了……哟……」`); // :4763
        await era.printAndWait(
          `${target_name}努力的遵从着${master_name}的命令，将肉棒全部含了进去。`,
        ); // :4764
      } else {
        // :4766
        await era.printAndWait(`「哈咕……呜……呜呜……好难受……呜……」`); // :4767
        await era.printAndWait(
          `害怕着${master_name}的${target_name}含着眼泪将肉棒吞进了大半，露出了苦闷的表情。`,
        ); // :4768
      } // :4769
      // CFLAG:365  = 1（变量语义：CFLAG 族，365） // :4770
      chara(target).kojo.深喉 = 1; // :4770
      return 0; // :4771
    } else {
      // :4773

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4775
        await era.printAndWait(`「含到最里面？嗯～没问题哟～❤」`); // :4776
        await era.printAndWait(
          `${target_name}毫不犹豫的含住了肉棒，温热的小嘴不断吞咽着，布丁一样柔软的最里面蠕动着按摩着肉棒的前端。`,
        ); // :4777
        await era.printAndWait(`「嗯……嗯嗯……呜……咕……」`); // :4778
        await era.printAndWait(
          `「（这种……窒息感……身体的感觉……快感翻倍了啦……❤）`,
        ); // :4779
        // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :4780
        chara(target).kojo.深喉 = 5; // :4780
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4782
        await era.printAndWait(
          `「最，最里面吗……呜嗯……为了主人的话……不管什么都没问题的哟……」`,
        ); // :4783
        await era.printAndWait(
          `${target_name}粉嫩的嘴唇轻碰着肉棒的前端，温热的小嘴慢慢的将肉棒含了进去，一点点的进入到布丁一样柔软的最里面。`,
        ); // :4784
        await era.printAndWait(`「嗯……啾……哈呜呜……」`); // :4785
        await era.printAndWait(
          `「（呜呜……虽然有些难受……感觉脑子都一片空白了……但是只要主人舒服的话……）」`,
        ); // :4786
        // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :4787
        chara(target).kojo.深喉 = 4; // :4787
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4789
        await era.printAndWait(`「呜……全部都……含进去了……哟……」`); // :4790
        await era.printAndWait(
          `${target_name}努力的遵从着${master_name}的命令，将肉棒全部含了进去。`,
        ); // :4791
        // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :4792
        chara(target).kojo.深喉 = 3; // :4792
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :4794
        await era.printAndWait(`「哈咕……呜……呜呜……好难受……呜……」`); // :4795
        await era.printAndWait(
          `害怕着${master_name}的${target_name}含着眼泪将肉棒吞进了大半，露出了苦闷的表情。`,
        ); // :4796
        // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :4797
        chara(target).kojo.深喉 = 2; // :4797
      } // :4798
      return 0; // :4799
    } // :4800
  } // :4801

  if (era_flag.selectcom == 80) {
    // :4809

    if (chara(target).kojo.强制口交 == 0) {
      // :4811

      if (era.get(`abl:${target}:16`) >= 3) {
        // :4813
        await era.printAndWait(
          `「我……我会努力的……嗯………………嗯呜呜…唔…哈咕…呜咳…！」`,
        ); // :4814
        await era.printAndWait(
          `${target_name}轻轻含住了肉棒，努力不让牙齿碰到。`,
        ); // :4815
        await era.printAndWait(
          `${master_name}握着小小的头部，在温暖的小嘴中里粗暴的抽送着。`,
        ); // :4816
      } else {
        // :4818
        await era.printAndWait(`「嗯呜呜？！呜…呜呜…呜噗！」`); // :4819
        await era.printAndWait(
          `${master_name}粗暴的将肉棒插入${target_name}的嘴里，抓着头发开始侵犯起小嘴来。`,
        ); // :4820
      } // :4821
      // CFLAG:381  = 1（变量语义：CFLAG 族，381） // :4822
      chara(target).kojo.强制口交 = 1; // :4822
      return 0; // :4823
    } else {
      // :4825

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4827
        await era.printAndWait(`「嗯呼……嗯……呼呜呜……❤」`); // :4828
        await era.printAndWait(
          `（嘴巴……被主人这样子侵犯……好舒服……好棒的感觉……❤）`,
        ); // :4829
        await era.printAndWait(
          `${target_name}享受着嘴巴被侵犯的快感，拼命的吮吸着肉棒。`,
        ); // :4830
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4832
        await era.printAndWait(`「嗯呼……嗯……主……人……嗯……」`); // :4833
        await era.printAndWait(
          `${target_name}顺从的任由${master_name}在自己嘴里抽送着。`,
        ); // :4834
        await era.printAndWait(
          `享受着温暖的口穴的${master_name}，握着小小的头部粗暴的抽送着。`,
        ); // :4835
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :4836
        chara(target).kojo.强制口交 = 4; // :4836

        await era.printAndWait(`「嗯呜呜……唔……哈咕……」`); // :4838
        await era.printAndWait(
          `${master_name}握着小小的头部，在温暖的小嘴中里粗暴的抽送着。`,
        ); // :4839
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :4840
        chara(target).kojo.强制口交 = 3; // :4840
      } else if (chara(target).kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        // :4842
        await era.printAndWait(`「嗯呜……呜……呜……呜噗！」`); // :4843
        await era.printAndWait(
          `${master_name}粗暴的将肉棒插入${target_name}的嘴里，抓着头发开始侵犯着小嘴。。`,
        ); // :4844
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :4845
        chara(target).kojo.强制口交 = 2; // :4845
      } // :4846
      return 0; // :4847
    } // :4848
  } // :4849
}

// @kojo_message_palamcng_19 // :4858
async function kojo_message_palamcng_19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :4861
    return 0; // :4861
  } // :4861

  if (era.get(`tequip:${target}:45`)) {
    // :4864
    return 0; // :4864
  } // :4864

  if (game.train.失神) {
    // :4867
    return 0; // :4867
  } // :4867

  if (era.get(`tequip:${target}:89`)) {
    // :4870
    return 0; // :4870
  } // :4870

  if (era.get(`tequip:${target}:90`)) {
    // :4873
    return 0; // :4873
  } // :4873

  if (era.get(`tequip:${target}:55`)) {
    // :4875
    return 0; // :4876
  } // :4877

  if (era.get(`talent:${target}:9`) == 1) {
    // :4880
    return 0; // :4880
  } // :4880

  const a = era0(`delta:${target}:11`) + era0(`delta:${target}:12`); // :4889
  if (game.train.处女丧失 == 1 && chara(target).kojo.处女丧失 == 0) {
    // :4890

    if (game.train.主人导致处女丧失 == 1) {
      // :4892

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4894
        await era.printAndWait(`「啊哈……❤这样子终于……做H的事情了呢……好开心❤」`); // :4895
        await era.printAndWait(`初次被异物进入的幼穴，紧紧的包裹住了肉棒。`); // :4896
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4898
        await era.printAndWait(`「啊……主人的肉棒……进来了……呢……❤」`); // :4899
        await era.printAndWait(
          `${target_name}含着眼泪轻轻的颤抖着，但是小脸上却满溢着幸福的表情。`,
        ); // :4900
      } else {
        // :4902
        await era.printAndWait(`「呜呜……住手啊……好……好痛……」`); // :4903
        await era.printAndWait(`被肉棒强硬插入的幼穴因为疼痛而用力的紧缩着。`); // :4904
      } // :4906
    } else {
      // :4908

      if (era.get(`talent:${target}:76`) == 1) {
        // :4910
        await era.printAndWait(`「哈啊……有点痛呢……但是……H……好舒服❤」`); // :4911
        await era.printAndWait(`「虽然不是主人的肉棒有点遗憾呢……」`); // :4912
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4914
        await era.printAndWait(`「呜呜……明明是……想要留给主人的……」`); // :4915
        await era.printAndWait(
          `${target_name}轻轻的抽泣着，晶莹的泪珠从眼角滴落下来。`,
        ); // :4916
      } else {
        // :4918
        await era.printAndWait(`「不要……求求你……不要了啦……」`); // :4919
        await era.printAndWait(
          `${target_name}哭着哀求着，因为强烈的疼痛，声音都显得有些颤抖。`,
        ); // :4920
      } // :4921
    } // :4922
    // CFLAG:229  = 1（变量语义：CFLAG 族，229） // :4923
    chara(target).kojo.处女丧失 = 1; // :4923
  } // :4924

  const p_lube = era0(`palam:${target}:3`) + era0(`delta:${target}:3`); // :4929
  if (p_lube > PALAMLV[2] && chara(target).kojo.首次润滑Lv2 == 0) {
    // :4930

    if (era.get(`talent:${target}:85`) == 1) {
      // :4932

      if (era_flag.selectcom == 50) {
        // :4934
        await era.printAndWait(`「哈呜……！主人……这个……感觉好奇怪的说……」`); // :4935
        await era.printAndWait(
          `${target_name}羞红着小脸，有些困惑的看着${master_name}。`,
        ); // :4936
        await era.printAndWait(`―――润滑初次超过LV2。`); // :4937
      } else {
        // :4939
        await era.printAndWait(`「呼诶……这个……是什么……是${sc()}的……？」`); // :4940
        await era.printAndWait(
          `${target_name}有些不知所措的看着透明的爱液，完全是孩子的幼小身躯，诚实的回应着快感。`,
        ); // :4941
        await era.printAndWait(`―――润滑初次超过LV2。`); // :4942
      } // :4943
    } else {
      // :4945

      if (era_flag.selectcom == 50) {
        // :4947
        await era.printAndWait(`「哈呜……！不要啦……感觉凉凉的……呜……」`); // :4948
        await era.printAndWait(`${target_name}羞红着小脸，微微挣扎着。`); // :4949
        await era.printAndWait(`―――润滑初次超过LV2。`); // :4950
      } else {
        // :4952
        await era.printAndWait(`「呜呜……不要……这是什么……不要看……」`); // :4953
        await era.printAndWait(
          `${target_name}有些不知所措的看着透明的爱液，完全是孩子的幼小身躯，诚实的回应着快感。`,
        ); // :4954
        await era.printAndWait(`―――润滑初次超过LV2。`); // :4955
      } // :4956
    } // :4957
    // CFLAG:221  = 1（变量语义：CFLAG 族，221） // :4958
    chara(target).kojo.首次润滑Lv2 = 1; // :4958
  } // :4959

  const p_lust = era0(`palam:${target}:5`) + era0(`delta:${target}:5`); // :4964
  if (p_lust > PALAMLV[2] && chara(target).kojo.首次欲情Lv2 == 0) {
    // :4965

    if (era.get(`talent:${target}:85`) == 1) {
      // :4967

      if (era_flag.selectcom == 51) {
        // :4969
        await era.printAndWait(
          `「呼啊啊……身体……变得奇怪起来了……感觉有点热呢……❤」`,
        ); // :4970
        await era.printAndWait(
          `听话的喝下媚药的${target_name}，皮肤微微泛起了可爱的粉红色。`,
        ); // :4971
        await era.printAndWait(`「主人……抱抱……❤」`); // :4972
        await era.printAndWait(`―――欲情初次超过LV2。`); // :4973
      } else {
        // :4975
        await era.printAndWait(`「主人……喜欢……最喜欢了……❤」`); // :4976
        await era.printAndWait(
          `紧紧的抱着${master_name}的手不放的${target_name}，仰着头红着脸看着${master_name}。`,
        ); // :4977
        await era.printAndWait(`―――欲情初次超过LV2。`); // :4978
      } // :4979
    } else {
      // :4981

      if (era_flag.selectcom == 51) {
        // :4983
        await era.printAndWait(`「呜……这是什么……不要……咕……呜呜……！」`); // :4984
        await era.printAndWait(
          `被${master_name}强迫喝掉媚药的${target_name}，很快就软绵绵的靠在墙上，皮肤微微泛起了可爱的粉红色。`,
        ); // :4985
        await era.printAndWait(`「呜呜……身体……感觉……好奇怪……热热的……」`); // :4986
        await era.printAndWait(`―――欲情初次超过LV2。`); // :4987
      } else {
        // :4989
        await era.printAndWait(`「呼诶……感觉……身体……变得奇怪起来了……」`); // :4990
        await era.printAndWait(
          `连H的事情都还不能完全理解的${target_name}，因为身体的变化而困惑的看着${master_name}。`,
        ); // :4991
        await era.printAndWait(`―――欲情初次超过LV2。`); // :4992
      } // :4993
    } // :4994
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :4995
    chara(target).kojo.首次欲情Lv2 = 1; // :4995
  } // :4996

  const p_shame = era0(`palam:${target}:8`) + era0(`delta:${target}:8`); // :5001
  if (p_shame > PALAMLV[2] && chara(target).kojo.首次耻情Lv2 == 0) {
    // :5002

    if (era.get(`talent:${target}:85`) == 1) {
      // :5004
      await era.printAndWait(`「哈呜呜……主，主人……这种事……太害羞了啦……」`); // :5005
      await era.printAndWait(
        `${target_name}害羞的捂着脸，撒娇一般的轻声抱怨着。`,
      ); // :5006
      await era.printAndWait(`―――耻情初次超过LV2。`); // :5007
    } else {
      // :5009
      await era.printAndWait(`「不，不要……呜呜……不要看……」`); // :5010
      await era.printAndWait(
        `${target_name}的小脸羞得仿佛要滴出水来，小手徒劳的想遮挡着裸露的部位。`,
      ); // :5011
      await era.printAndWait(`―――耻情初次超过LV2。`); // :5012
    } // :5013
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :5014
    chara(target).kojo.首次耻情Lv2 = 1; // :5014
  } // :5015

  const p_fear = era0(`palam:${target}:10`) + era0(`delta:${target}:10`); // :5020
  if (p_fear > PALAMLV[2] && chara(target).kojo.首次恐怖Lv2 == 0) {
    // :5021

    if (era.get(`talent:${target}:85`) == 1) {
      // :5023
      await era.printAndWait(`「哈呜呜……主人……好凶……好可怕……」`); // :5024
      await era.printAndWait(
        `${target_name}含着泪珠看着${master_name}，因为害怕而颤抖着。`,
      ); // :5025
      await era.printAndWait(`―――恐怖初次超过LV2。`); // :5026
    } else {
      // :5028
      await era.printAndWait(
        `「对，对不起……我什么都……都会做的……已经……不要了啦……」`,
      ); // :5029
      await era.printAndWait(
        `${target_name}害怕缩成一团，像小动物一样颤抖着。`,
      ); // :5030
      await era.printAndWait(`―――恐怖初次超过LV2。`); // :5031
    } // :5032
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :5033
    chara(target).kojo.首次恐怖Lv2 = 1; // :5033
  } // :5034

  if (era0(`nowex:${target}:0`) > 0 && chara(target).kojo.首次C绝顶 == 0) {
    // :5039
    await era.printAndWait(`「呼啊啊……感觉……呀……嗯哈啊啊…………！」`); // :5040
    await era.printAndWait(
      `${target_name}感受着阴蒂传来的快感，身体不住的颤抖着。`,
    ); // :5041
    await era.printAndWait(`「这是……呜呜……什……么……」`); // :5042
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :5043
    chara(target).kojo.首次C绝顶 = 1; // :5043
  } else if (
    era0(`nowex:${target}:0`) > 0 &&
    chara(target).kojo.首次C绝顶 == 1
  ) {
    // :5047

    if (era.get(`talent:${target}:76`) == 1) {
      // :5049
      await era.printAndWait(`「呜呜……主人……那，那样子刺激那里的话……❤」`); // :5050
      await era.printAndWait(
        `粉红色的小豆被${master_name}刺激着，幼小而敏感的身体在一波波的快感下不断的颤抖着，`,
      ); // :5051
      await era.printAndWait(`「主人，菲娅，还，还想要更多呜呜～～❤」`); // :5052
    } else if (era.get(`talent:${target}:85`) == 1) {
      // :5054
      await era.printAndWait(
        `「呼啊啊……主，主人……请……请不要一直的……弄……那个……地方……」`,
      ); // :5055
      await era.printAndWait(
        `粉红色的小豆被${master_name}刺激着，幼小而敏感的身体在一波波的快感下不断的颤抖着，`,
      ); // :5056
      await era.printAndWait(`「哈呜呜呜……又，又要去了呜呜呜呜～～❤」`); // :5057
    } else {
      // :5059
      await era.printAndWait(`「那里被……被弄着……又，又要变得奇怪了啦～～」`); // :5060
      await era.printAndWait(
        `${target_name}感受着小豆豆传来的刺激，茫然的在快感下扭动着身体。`,
      ); // :5061
    } // :5062
  } // :5063

  if (era0(`nowex:${target}:1`) > 0 && chara(target).kojo.首次V绝顶 == 0) {
    // :5068

    if (era.get(`talent:${target}:76`) == 1) {
      // :5070
      await era.printAndWait(`「啊哈……=肚子里面……肉棒……咕啾咕啾的……❤」`); // :5071
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。`,
      ); // :5072
      await era.printAndWait(`「嗯……这就是……高潮吗……❤」`); // :5073
      await era.printAndWait(
        `${target_name}沉浸在刚刚的快感中，还有些失神的样子。`,
      ); // :5074
    } else if (era.get(`talent:${target}:85`) == 1) {
      // :5076
      await era.printAndWait(
        `「呼啊啊……主人……嗯……肚子里面……呜呜……要，要变得奇怪了啦～～❤」`,
      ); // :5077
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。`,
      ); // :5078
      await era.printAndWait(`「呼啊……感觉……刚刚……好像飞起来一样呢……」`); // :5079
      await era.printAndWait(
        `${target_name}沉浸在刚刚的快感中，还有些失神的样子。`,
      ); // :5080
    } else {
      // :5082
      await era.printAndWait(`「呼啊啊……不要……呜呜……要，要变得奇怪了啦～～」`); // :5083
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。`,
      ); // :5084
      await era.printAndWait(`「呼……呜……什么……刚刚的是……」`); // :5085
    } // :5086
    // CFLAG:226  = 1（变量语义：CFLAG 族，226） // :5087
    chara(target).kojo.首次V绝顶 = 1; // :5087
  } else if (
    era0(`nowex:${target}:1`) > 0 &&
    chara(target).kojo.首次V绝顶 == 1
  ) {
    // :5089

    if (era.get(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      // :5091
      await era.printAndWait(
        `「嗯啊啊～主人，好，好舒服，要去了，要去了嗯嗯嗯嗯～～❤」`,
      ); // :5092
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。`,
      ); // :5093
      await era.printAndWait(`「嗯……肉棒……好舒服呢……❤」`); // :5094
      await era.printAndWait(`${target_name}的小脸上露出了恍惚的表情。`); // :5095
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      game.event.插着不拔 == 1
    ) {
      // :5097
      await era.printAndWait(`「呼啊啊……主人……已经……嗯……～不行了啦～～❤」`); // :5098
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。`,
      ); // :5099
      await era.printAndWait(`「呼……啊……又……又去了……呢……」`); // :5100
      await era.printAndWait(`${target_name}的有些脱力的捂着害羞的小脸。`); // :5101
    } else {
      // :5103
      await era.printAndWait(`「呜……哈啊……不……不要……嗯～～」`); // :5104
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。`,
      ); // :5105
    } // :5106
  } // :5107

  if (era0(`nowex:${target}:2`) > 0 && chara(target).kojo.首次A绝顶 == 0) {
    // :5112

    if (era.get(`talent:${target}:76`) == 1) {
      // :5114
      await era.printAndWait(`「嗯呀～～屁股被这样子弄……呜……主人，已经～～❤」`); // :5115
      await era.printAndWait(
        `初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。`,
      ); // :5116
      await era.printAndWait(`「诶嘿嘿……好舒服……呢……❤」`); // :5117
    } else if (era.get(`talent:${target}:85`) == 1) {
      // :5119
      await era.printAndWait(`「呼啊啊……屁股……感觉……呜……什么……这是……」`); // :5120
      await era.printAndWait(
        `初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。`,
      ); // :5121
      await era.printAndWait(`「屁股……呼……啊……感觉……怪怪的呢……」`); // :5122
    } else {
      // :5124
      await era.printAndWait(`「呼呀……不要……屁股……不要再……嗯嗯嗯～」`); // :5125
      await era.printAndWait(
        `初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。`,
      ); // :5126
      await era.printAndWait(`「呜……这个感觉……是……什么……」`); // :5127
    } // :5128
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :5129
    chara(target).kojo.首次A绝顶 = 1; // :5129
  } else if (
    era0(`nowex:${target}:2`) > 0 &&
    chara(target).kojo.首次A绝顶 == 1
  ) {
    // :5131

    if (era.get(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      // :5133
      await era.printAndWait(`「嗯～主人，不要停下来……屁股已经……呼啊啊啊～❤」`); // :5134
      await era.printAndWait(
        `${target_name}又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。`,
      ); // :5135
      await era.printAndWait(`「嗯……屁股被主人这样玩弄什么的……也好舒服呢～❤」`); // :5136
      await era.printAndWait(
        `${target_name}的大口的喘着气，带着痴态望着${master_name}。`,
      ); // :5137
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      game.event.插着不拔 == 1
    ) {
      // :5139
      await era.printAndWait(
        `「呜呜……主人……这，这样下去……屁股……呜……已经……嗯嗯……～❤」`,
      ); // :5140
      await era.printAndWait(
        `${target_name}又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。`,
      ); // :5141
      await era.printAndWait(`「哈呜呜……又，又被主人给弄的……呜……」`); // :5142
      await era.printAndWait(
        `${target_name}害羞的撒着娇，身体沉浸在高潮的余韵中。`,
      ); // :5143
    } else {
      // :5145
      await era.printAndWait(`「呜……哈啊……不……不要……嗯～～」`); // :5146
      await era.printAndWait(
        `${target_name}又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。`,
      ); // :5147
    } // :5148
  } // :5149

  if (era0(`nowex:${target}:3`) > 0 && chara(target).kojo.首次B绝顶 == 0) {
    // :5154

    if (era.get(`talent:${target}:76`) == 1) {
      // :5156
      await era.printAndWait(`「嗯呀～～胸部感觉……啊啊啊……好舒服……好厉害……❤」`); // :5157
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，兴奋的颤抖着高潮了。`,
      ); // :5158
      await era.printAndWait(`「胸部……呜呜……哈啊啊啊啊～～❤」`); // :5159
    } else if (era.get(`talent:${target}:85`) == 1) {
      // :5161
      await era.printAndWait(`「哈啊……主人……这样子……弄的话……嗯呀……❤」`); // :5162
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，羞红着脸高潮了。`,
      ); // :5163
      await era.printAndWait(`「主人……嗯哈……胸部……好……舒服……」`); // :5164
    } else {
      // :5166
      await era.printAndWait(
        `「啊呜呜……胸部……不要……呜呜……要，要变得……嗯呀～～」`,
      ); // :5167
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，不知所措的高潮了。`,
      ); // :5168
      await era.printAndWait(`「什么……刚才的是……呜……」`); // :5169
    } // :5170
    // CFLAG:228  = 1（变量语义：CFLAG 族，228） // :5171
    chara(target).kojo.首次B绝顶 = 1; // :5171
  } else if (
    era0(`nowex:${target}:3`) > 0 &&
    chara(target).kojo.首次B绝顶 == 1
  ) {
    // :5174

    if (era.get(`talent:${target}:76`) == 1) {
      // :5176
      await era.printAndWait(`「哈啊啊～胸部被这样玩弄，会，会坏掉的啦～❤」`); // :5177
      await era.printAndWait(
        `幼小的草莓被刺激着，透过平坦的胸部可以感受到下方像小兔子一样不停跳动的小心脏，`,
      ); // :5178
      await era.printAndWait(`「又，又要去了呜呜呜～～❤」`); // :5179
    } else if (era.get(`talent:${target}:85`) == 1) {
      // :5181
      await era.printAndWait(
        `「呜呜……不，不要这样子刺激胸部……呼啊啊……已经……❤」`,
      ); // :5182
      await era.printAndWait(
        `幼小的草莓被刺激着，透过平坦的胸部可以感受到下方像小兔子一样不停跳动的小心脏，`,
      ); // :5183
      await era.printAndWait(`「主，主人，要去了，要去了呜呜呜呜～～」`); // :5184
    } else {
      // :5186
      await era.printAndWait(`「嗯呀……！胸部，不，不要呜呜呜～～」`); // :5187
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，不知所措的高潮了。`,
      ); // :5188
    } // :5189
  } // :5190
}

// @kojo_message_markcng_19 // :5197
async function kojo_message_markcng_19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :5200
    return 0; // :5200
  } // :5200

  if (era.get(`tequip:${target}:45`)) {
    // :5203
    return 0; // :5203
  } // :5203

  if (game.train.失神) {
    // :5206
    return 0; // :5206
  } // :5206

  if (era.get(`tequip:${target}:89`)) {
    // :5209
    return 0; // :5209
  } // :5209

  if (era.get(`tequip:${target}:90`)) {
    // :5212
    return 0; // :5212
  } // :5212

  if (era.get(`talent:${target}:9`) == 1) {
    // :5215
    return 0; // :5215
  } // :5215

  if (era.get(`tequip:${target}:55`)) {
    // :5218
    return 0; // :5218
  } // :5218

  if (game.system.苦痛刻印变动 == 3 && chara(target).kojo.苦痛刻印Lv3 == 0) {
    // :5223

    if (era.get(`talent:${target}:85`) == 1) {
      // :5225
      await era.printAndWait(
        `「哈咕……主人……好痛的说……这样子……${sc()}……会坏掉的啦……」`,
      ); // :5226
      await era.printAndWait(
        `${target_name}因为强烈的痛楚大口大口的喘息着，已经连哭声都渐渐变小了。`,
      ); // :5227
      await era.printAndWait(`「主人……呜……求……求求你……温柔一点点就好……」`); // :5228
    } else {
      // :5229
      await era.printAndWait(`「好痛呜呜……不要……求求你……呜……」`); // :5230
      await era.printAndWait(
        `${target_name}因为强烈的痛楚而不住的哀求着${master_name}，已经连哭声都渐渐变小了。`,
      ); // :5231
    } // :5232
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :5233
    chara(target).kojo.苦痛刻印Lv3 = 1; // :5233
  } // :5234

  if (game.system.快乐刻印变动 == 3 && chara(target).kojo.快乐刻印Lv3 == 0) {
    // :5239

    if (
      era.get(`talent:${target}:85`) == 1 ||
      era.get(`talent:${target}:76`) == 1
    ) {
      // :5241
      await era.printAndWait(`「呼啊啊……主人……嗯……H的事情什么的……好舒服……❤」`); // :5242
      await era.printAndWait(
        `神情有些恍惚的${target_name}，小小的身体已经完全的沉浸在了和年龄不符的H行为带来的快感中了……`,
      ); // :5243
    } else {
      // :5244
      await era.printAndWait(
        `「呜呜……感觉身体……呼啊啊……好奇怪……好舒服……的说……」`,
      ); // :5245
      await era.printAndWait(
        `神情有些恍惚的${target_name}，小小的身体已经完全的沉浸在了和年龄不符的H行为带来的快感中了……`,
      ); // :5246
    } // :5247
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :5248
    chara(target).kojo.快乐刻印Lv3 = 1; // :5248
  } // :5249

  if (game.system.屈服刻印变动 == 3 && chara(target).kojo.屈服刻印Lv3 == 0) {
    // :5254

    if (era.get(`talent:${target}:85`) == 1) {
      // :5256
      await era.printAndWait(
        `「${sc()}……为了主人的话……什么事情都没问题的呢……❤」`,
      ); // :5257
      await era.printAndWait(
        `${target_name}红着脸抬头看着，经过反复的调教之后，小小的身体已经从身心上完全的服从于${master_name}了。`,
      ); // :5258
    } else {
      // :5259
      await era.printAndWait(
        `「呜呜……${sc()}……什么都会乖乖听话的……所以请主人……至少……温柔一点呜呜……」`,
      ); // :5260
      await era.printAndWait(
        `被反复调教的${target_name}，擦拭着眼角的泪珠，轻声的说着完全服从的誓言。`,
      ); // :5261
    } // :5262
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :5263
    chara(target).kojo.屈服刻印Lv3 = 1; // :5263
  } // :5264

  if (game.system.反抗刻印变动 == 3 && chara(target).kojo.反抗刻印Lv3 == 0) {
    // :5269

    if (era.get(`talent:${target}:85`) == 1) {
      // :5271
      await era.printAndWait(
        `「呜呜……就算是主人……这样子……呜……也太过分了啦……」`,
      ); // :5272
      await era.printAndWait(
        `${target_name}紧紧的盯着${master_name}，晶莹的泪水在眼眶里打转转。`,
      ); // :5273
      await era.printAndWait(`「这种事情……呜……」`); // :5274
    } else {
      // :5275
      await era.printAndWait(`「呜，不要，不要过来～」`); // :5276
      await era.printAndWait(
        `虽然${target_name}比平时更加激烈的抵抗着，但是只是需要稍微多用一点点力气的程度而已。`,
      ); // :5277
      await era.printAndWait(
        `有些不耐烦的${master_name}强行的将抵抗压制住了。`,
      ); // :5278
    } // :5279
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :5280
    chara(target).kojo.反抗刻印Lv3 = 1; // :5280
  } // :5281
}

// @self_kojo_k19 // :5287
async function self_kojo_k19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  if (game.train.初吻与自我口上 == 1) {
    // :5291

    if (peek_aftertrain_q() == 1) {
      // :5293
      await era.print(
        `「${assi_name}大人……那个……拜托……更加的……疼爱${sc()}……❤」`,
      ); // :5294
      await era.printAndWait(
        `${target_name}拉着${assi_name}的手，轻轻摩擦着大腿，水汪汪的大眼睛里满是情欲的眼光。`,
      ); // :5295
    } else if (peek_aftertrain_q() == 2) {
      // :5297
      await era.print(`「狗狗先生的那个……想要……这样子光靠手指的话……呜……」`); // :5298
      await era.printAndWait(
        `${target_name}有些欲求不满的自慰着，沉迷于异种的肉棒带来的快感中。`,
      ); // :5299
    } else {
      // :5301

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.调教后自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :5303
        await era.printAndWait(`「啊哈……主人……这里……还想更多的被侵犯呢……❤」`); // :5304
        await era.printAndWait(
          `${target_name}沉浸在调教的快乐中，自己用手指玩弄着后面。`,
        ); // :5305
        // CFLAG:261  = 6（变量语义：CFLAG 族，261） // :5306
        chara(target).kojo.调教后自慰 = 6; // :5306
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.调教后自慰 < 5 || game.kojo.口上开关 == 2)
      ) {
        // :5308

        if (era.get(`talent:${target}:0`) == 1) {
          // :5310
          await era.printAndWait(
            `「呼啊……主人……好想和主人继续做舒服的事情……❤」`,
          ); // :5311
          await era.printAndWait(
            `${target_name}的手指在自己还没有被异物插入过的小穴上抚弄，刺激着自己的小豆豆。`,
          ); // :5312
          await era.printAndWait(
            `「诶嘿嘿……在主人破掉这里之前……哈啊……${sc()}会……嗯……好好忍耐的……呐❤」`,
          ); // :5313
        } else {
          // :5314
          await era.printAndWait(
            `「哈啊……感觉……主人的肉棒……仿佛还留在里面呢……❤」`,
          ); // :5315
          await era.printAndWait(
            `${target_name}不停抽动着手指，在自己的下半身进出着，带出黏糊糊的爱液。`,
          ); // :5316
          await era.printAndWait(
            `「嗯呜……但是……果然还是……哈呀……没有主人的舒服呢……❤」`,
          ); // :5317
        } // :5318
        // CFLAG:261  = 5（变量语义：CFLAG 族，261） // :5319
        chara(target).kojo.调教后自慰 = 5; // :5319
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.调教后自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :5321
        await era.printAndWait(
          `「主人……想被主人……疼爱后面……想和主人……更加的……亲热……」`,
        ); // :5322
        await era.printAndWait(
          `${target_name}轻弄着雏菊，朝${master_name}撒着娇。`,
        ); // :5323
        await era.printAndWait(`「主人……哈啊……主人…………❤」`); // :5324
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :5325
        chara(target).kojo.调教后自慰 = 4; // :5325
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        // :5327
        if (era.get(`talent:${target}:0`) == 1) {
          // :5328
          await era.printAndWait(`「主人……喜欢你……最喜欢你了……」`); // :5329
          await era.printAndWait(
            `${target_name}紧靠着${master_name}，小手在两腿间动着，发出了有些色气的喘息。`,
          ); // :5330
          await era.printAndWait(
            `「好想把全部都奉献给主人……呐……主人……求求你……把第一次……」`,
          ); // :5331
        } else {
          // :5332
          await era.printAndWait(`「呼啊……主人……主人……」`); // :5333
          await era.printAndWait(
            `想象着${master_name}的样子，想象着那是主人的手指，${target_name}不断玩弄着自己的下半身，`,
          ); // :5334
          await era.printAndWait(
            `「呼啊啊……只是这样子的话……呜……好想更加的……和主人……」`,
          ); // :5335
          await era.printAndWait(
            `纤细的手指在幼穴中进出着，带出了黏糊糊的爱液。`,
          ); // :5336
        } // :5337
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :5338
        chara(target).kojo.调教后自慰 = 3; // :5338
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        // :5340
        await era.printAndWait(`「哈啊……已经……忍不住了啦……」`); // :5341
        await era.printAndWait(`「明明……这样的事情……但是……好，好舒服……❤」`); // :5342
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :5343
        chara(target).kojo.调教后自慰 = 2; // :5343
      } else if (chara(target).kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        // :5345
        await era.printAndWait(`「呜呜……这种事情……好，好过分……」`); // :5346
        await era.printAndWait(
          `${target_name}轻轻揉着被粗暴对待的身体，无形中刺激着敏感的地方。`,
        ); // :5347
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :5348
        chara(target).kojo.调教后自慰 = 1; // :5348
      } // :5349
    } // :5350
  } // :5351

  if (game.train.初吻与自我口上 == 2) {
    // :5355

    if (
      era.get(`talent:${target}:76`) &&
      (chara(target).kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      // :5357
      await era.printAndWait(`「嗯……姐姐大人……哈啊……❤」`); // :5358
      await era.printAndWait(
        `${target_name}和${assi_name}的身体纠缠在一起，任由对方摆弄着自己。`,
      ); // :5359
      await era.printAndWait(`「嗯……就是……那里……呀……好舒服……❤」`); // :5360
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :5361
      chara(target).kojo.百合PLAY = 5; // :5361
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      // :5363
      await era.printAndWait(`「姐姐大人……呜……这样子……主人会……哈啊……」`); // :5364
      await era.printAndWait(
        `${assi_name}压着${target_name}，手指在幼小的蜜裂上滑动着。`,
      ); // :5365

      if (game.system.快乐刻印变动 == 3) {
        // :5367
        await era.printAndWait(
          `${target_name}轻轻喘息着，娇小的身体因为快感而微微的颤抖着。`,
        ); // :5368
        await era.printAndWait(`「呼啊……那里……不，不行……嗯……哈啊啊」`); // :5369
        await era.printAndWait(
          `感受着指尖湿润的${assi_name}坏笑着加快了速度。`,
        ); // :5370
        await era.printAndWait(`「啊啊……姐，姐姐大人……这样子的话……呀……❤」`); // :5371
      } else {
        // :5373
        await era.printAndWait(
          `${target_name}努力的忍耐着快感，不让自己叫出声来。`,
        ); // :5374
        await era.printAndWait(`「呜……哈咕……嗯……」`); // :5375
        await era.print(`${assi_name}轻舔着身下的幼女，加大了指尖的力度……`); // :5376
      } // :5377
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :5378
      chara(target).kojo.百合PLAY = 4; // :5378
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (chara(target).kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      // :5380
      await era.printAndWait(`「呼啊啊，姐姐大人……嗯……呀……❤」`); // :5381
      await era.printAndWait(
        `稚气的声音在屋子里回响着，${target_name}向侍奉${master_name}那样用心的侍奉着${assi_name}，用自己的身体取悦着对方。`,
      ); // :5382
      await era.printAndWait(`「姐姐大人的手指……呜……好……舒服……」`); // :5383
      await era.printAndWait(
        `${assi_name}温柔的摸了摸${target_name}的头，然后继续玩弄起幼小的身体来。`,
      ); // :5384
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :5385
      chara(target).kojo.百合PLAY = 3; // :5385
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (chara(target).kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      // :5387
      await era.printAndWait(`「嗯……不行……呀……那里是……」`); // :5388
      await era.printAndWait(
        `${target_name}在${assi_name}的玩弄下，发出了可爱的娇喘声。`,
      ); // :5389
      await era.printAndWait(
        `明明同样是女孩子，却莫名的激起了${assi_name}欺负的欲望，无力的幼女就这样被压倒，一次次的玩弄着。`,
      ); // :5390
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :5391
      chara(target).kojo.百合PLAY = 2; // :5391
    } else if (chara(target).kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      // :5393
      await era.printAndWait(`「呜呜……不要……姐姐……这种事情……求求你……呀……」`); // :5394
      await era.printAndWait(
        `${target_name}徒劳的在${assi_name}身下挣扎着，感受着对方的手指入侵自己身体。`,
      ); // :5395
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :5396
      chara(target).kojo.百合PLAY = 1; // :5396
    } // :5397
  } // :5398

  if (game.train.初吻与自我口上 == 3) {
    // :5403

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.朝口交 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :5405
      await era.printAndWait(`「诶嘿嘿，主人，今天也早安的说～❤」`); // :5406
      await era.printAndWait(
        `${target_name}含着一大早就挺立着的肉棒，稚嫩的小嘴熟练的吸吮着。`,
      ); // :5407
      await era.printAndWait(
        `「嗯啾……呼……哈啊……主人的肉棒……诶嘿……一早上就……嗯……很精神呢……❤」`,
      ); // :5408
      await era.printAndWait(
        `看着${target_name}可爱而淫乱的小脸，${master_name}忍不住按着小小的脑袋，在温暖的小嘴里射了出来。`,
      ); // :5409
      await era.printAndWait(`「嗯嗯嗯～～～～」`); // :5410
      await era.printAndWait(`「主人的牛奶……还想多喝一点呢……❤」`); // :5411
      // CFLAG:263  = 4（变量语义：CFLAG 族，263） // :5412
      chara(target).kojo.朝口交 = 4; // :5412
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :5414
      await era.printAndWait(`「嗯呼……呼哈……主人……早安……的说……」`); // :5415
      await era.printAndWait(
        `${target_name}温柔的侍奉着一大早就挺立着的肉棒，稚嫩的小嘴含住粗大的肉棒，小小的舌头不停的在肉棒上滑动着。`,
      ); // :5416
      await era.printAndWait(`「主人的味道……全部都是呢……」`); // :5417
      await era.printAndWait(
        `看着${target_name}天真可爱的小脸，${master_name}忍不住按着小小的脑袋，在温暖的小嘴里射了出来。`,
      ); // :5418
      await era.printAndWait(`「嗯嗯嗯～～～～」`); // :5419
      await era.printAndWait(`「嗯咕……主人的……嗯……」`); // :5420
      await era.printAndWait(
        `将嘴里的牛奶尽数吞下之后，${target_name}服侍着${master_name}的起居，开始了新的一天……`,
      ); // :5421
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :5422
      chara(target).kojo.朝口交 = 3; // :5422
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (chara(target).kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :5424
      await era.printAndWait(`「嗯呜……呼……呼啊……」`); // :5425
      await era.printAndWait(
        `${target_name}认真的用柔软的舌头侍奉着一大早就挺立着的肉棒，努力的让${master_name}舒服。`,
      ); // :5426
      await era.printAndWait(`「嗯……啾哈……主人……这样子……可以吗……？」`); // :5427
      await era.printAndWait(`在发泄过欲望之后，新的一天开始了……`); // :5428
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :5429
      chara(target).kojo.朝口交 = 2; // :5429
    } else if (chara(target).kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      // :5431
      await era.printAndWait(`「哈……呜……呜咕……主，主人……早上……好」`); // :5432
      await era.printAndWait(
        `${target_name}有些生涩的做着侍奉，畏缩的看着${master_name}。`,
      ); // :5433
      await era.printAndWait(`……看来还需要一些调教呢。`); // :5434
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :5435
      chara(target).kojo.朝口交 = 1; // :5435
    } // :5436
  } // :5437

  if (game.train.初吻与自我口上 == 4) {
    // :5442

    if (
      era.get(`abl:${target}:2`) >= 4 &&
      (chara(target).kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :5444
      if (!era.get(`talent:${target}:85`) && !era.get(`talent:${target}:76`)) {
        // :5445
        await era.printAndWait(
          `已经习惯了肉棒的幼穴不断的刺激着肉棒，温暖湿润的肉壁紧紧的吸着入侵的异物。`,
        ); // :5446
        await era.printAndWait(
          `${master_name}不断的抽送着，肆意的使用着未发育的幼小身躯。`,
        ); // :5447
      } else if (era.get(`talent:${target}:76`)) {
        // :5449
        await era.printAndWait(
          `「嗯呀～～主人，好厉害……还要，还想要更多～～主人的肉棒……和……精液牛奶……嗯～～❤」`,
        ); // :5450
        await era.printAndWait(
          `${target_name}搂着${master_name}，积极的迎合着抽送，贪图着肉棒带来的快感。`,
        ); // :5451
      } else if (era.get(`talent:${target}:85`)) {
        // :5453
        await era.printAndWait(
          `「呼啊啊……主人的那个……这样子在肚子里面……哈啊啊……」`,
        ); // :5454
        await era.printAndWait(`「被主人使用着……好开心……❤」`); // :5455
        await era.printAndWait(
          `${target_name}因为快感的刺激而微微的颤抖着，在${master_name}的身下撒着娇。`,
        ); // :5456
      } // :5457
      if (peek_aftertrain_s() >= 3) {
        // :5459
        await era.printAndWait(
          `调教结束以后，忍不住又把${target_name}推倒在床上，在小穴里面射了${peek_aftertrain_s()}次才满足……`,
        ); // :5459
      } // :5459
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :5460
      chara(target).kojo.调教后性交 = 2; // :5460
    } else if (chara(target).kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      // :5462
      await era.printAndWait(`「呼诶诶……不是已，已经结束了咩……」`); // :5463
      await era.printAndWait(`「呀……主人……太激烈……了……嗯呀……太激烈了啦～～」`); // :5464
      await era.printAndWait(
        `「肚子里面……呼啊啊啊……主人的那个……又…………嗯哈啊啊啊～～」`,
      ); // :5465
      await era.printAndWait(
        `调教结束后，忍不住又把${target_name}按在床上狠狠欺负了一番，射了${peek_aftertrain_s()}次才满足的起身……`,
      ); // :5466
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :5467
      chara(target).kojo.调教后性交 = 1; // :5467
    } // :5468
  } // :5469

  if (game.train.初吻与自我口上 == 5) {
    // :5474
    if (chara(target).kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      // :5475

      if (era.get(`talent:${target}:85`)) {
        // :5477
        await era.printAndWait(
          `调教结束后准备回卧室休息的${master_name}在走廊上碰见了等在门外的${target_name}。`,
        ); // :5478
        await era.printAndWait(
          `${target_name}轻轻的拽着${master_name}的衣角，另一只手抱着枕头，小脸半埋在里面，只露出两只眼睛。`,
        ); // :5479
        await era.printAndWait(
          `水汪汪的大眼睛看着旁边，大概是因为害羞而不敢直接看着吧。`,
        ); // :5480
        await era.printAndWait(`「呐呐……主人……今天……一起睡觉……可以吗……？」`); // :5481
        await era.printAndWait(
          `在得到了${master_name}肯定的回答后，${target_name}兴奋的抬起了头，露出了开心的笑容。`,
        ); // :5482
        await era.printAndWait(`「诶嘿嘿，主人，最喜欢你了～❤」`); // :5483
      } else if (era.get(`talent:${target}:76`)) {
        // :5485
        await era.printAndWait(`「主人……已经要休息了咩……？」`); // :5486
        await era.printAndWait(
          `调教结束后的${master_name}躺在床上正准备休息时，听到了门被推开的声音。`,
        ); // :5487
        await era.printAndWait(`「今天的……侍寝……那个……如果可以的话……」`); // :5488
        await era.printAndWait(
          `${target_name}轻轻的咬着手指，湿润的瞳孔充斥着满满的欲望，直直的看着这边。`,
        ); // :5489
        await era.printAndWait(
          `在得到你的允许后，${target_name}小跑着扑到了床上，用力的蹭着${master_name}的身体。`,
        ); // :5490
        await era.printAndWait(`「哇～主人最好了～❤」`); // :5491
      } else {
        // :5493
        await era.printAndWait(
          `调教结束后，刚清洗完身体的${master_name}，推开门看见的是穿着睡衣等在外面的${target_name}。`,
        ); // :5494
        await era.printAndWait(`「那个……那个……今天的……牛奶……还……没有……」`); // :5495
        await era.printAndWait(
          `害羞的用枕头遮住脸的${target_name}，用细不可闻的声音轻轻的说着。`,
        ); // :5496
        await era.printAndWait(
          `${master_name}露出了一丝得意的笑容，拽着眼前幼女的袖子带进了卧室，然后顺手将门锁上了。`,
        ); // :5497
      } // :5498
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :5499
      chara(target).kojo.夜袭 = 1; // :5499
    } // :5500
  } // :5501

  if (game.train.初吻与自我口上 == 6) {
    // :5511

    if (era.get(`talent:${target}:85`)) {
      // :5513

      if (peek_aftertrain_s() >= 1000000) {
        // :5515
        await era.printAndWait(
          `就这样，${target_name}被卖给了现今当政的人类国王。`,
        ); // :5516
        await era.printAndWait(
          `出卖灵魂投靠了${master_name}的他，满心欢喜的用大量的金钱将原来的公主买了回来。`,
        ); // :5517
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        ); // :5518
        await era.printAndWait(`……`); // :5519
        await era.printAndWait(
          `在那之后，听说被国王关在屋子里，彻底的沦为了玩物。`,
        ); // :5520
        await era.printAndWait(`幼小的身体每晚都承受着那个人残暴的兽欲。`); // :5521

        await era.printAndWait(
          `不得不感叹，有时候人类对同族做的事情，比对异族做的事情要残酷的多。`,
        ); // :5524
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        ); // :5525
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        ); // :5526
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5527
      } else if (peek_aftertrain_s() >= 500000) {
        // :5529
        await era.printAndWait(`就这样，${target_name}被卖给了魔族的富豪。`); // :5530
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        ); // :5531
        await era.printAndWait(`……`); // :5532
        await era.printAndWait(
          `在那之后，听说被富豪当做幼犬养着，变成了非常顺从的宠物。`,
        ); // :5533
        await era.printAndWait(
          `能够享用被魔王亲自调教过的女性，对魔族来说也算是一种荣耀了。`,
        ); // :5534
        await era.printAndWait(
          `更何况她原本的身份还是人类的公主，身体的保养自然是最上等的。`,
        ); // :5535
        await era.printAndWait(
          `似乎常常会被带到富豪们的晚宴上炫耀，然后当着众人的面被玩弄着。`,
        ); // :5536
        await era.printAndWait(
          `尊严那种东西，早就不知道被摧残殆尽丢到哪里去了。`,
        ); // :5537
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        ); // :5538
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        ); // :5539
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5540
      } else if (peek_aftertrain_s() >= 100000) {
        // :5542
        await era.printAndWait(`就这样，${target_name}被卖给了魔王城的娼馆。`); // :5543
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        ); // :5544
        await era.printAndWait(`……`); // :5545
        await era.printAndWait(
          `像这样被调教好的人类幼女即使魔界也是很少见的，更不用说是被魔王玩弄过的。`,
        ); // :5546
        await era.printAndWait(
          `虽然还是个孩子，但幼小的身体内隐藏着的魅力，很快就成为了娼馆的头牌之一。`,
        ); // :5547
        await era.printAndWait(
          `在充斥着淫靡气氛的娼馆中，幼小的身体每天都侍奉着各式各样的客人。`,
        ); // :5548
        await era.printAndWait(
          `虽然说娼妓可以被人赎身，不过那大概也只是被买回去当成专属的性奴隶吧。`,
        ); // :5549
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        ); // :5550
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        ); // :5551
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5552
      } else {
        // :5554
        await era.printAndWait(`就这样，${target_name}被卖给了商人当做女仆。`); // :5555
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        ); // :5556
        await era.printAndWait(`……`); // :5557
        await era.printAndWait(
          `原本是公主的她，对杂物活之类的与其说是不擅长，不如说是完全不会做。`,
        ); // :5558
        await era.printAndWait(`但是慢慢做的多了的话，也有点像模像样的了。`); // :5559
        await era.printAndWait(`除了要干杂活，也常常被主人给侵犯。`); // :5560
        await era.printAndWait(
          `过着这样的生活的她，大概常常会在哪个角落里掉眼泪吧。`,
        ); // :5561
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        ); // :5562
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        ); // :5563
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5564
      } // :5565
    } else if (era.get(`mark:${target}:3`) == 3) {
      // :5567
      await era.printAndWait(
        `被卖掉的${target_name}，含着眼泪用怨恨的目光看着你。`,
      ); // :5568
      await era.printAndWait(`「像你这样子的坏人，一，一定会有报应的！」`); // :5569
      await era.printAndWait(`连虫子都害怕的小鬼说什么傻话呢。`); // :5570
      await era.printAndWait(`这么想着的${master_name}，头也不回的转身走了。`); // :5571
      await era.printAndWait(
        `于是${master_name}与${target_name}再也没有见过面………`,
      ); // :5572
    } else if (era.get(`talent:${target}:76`)) {
      // :5574

      if (peek_aftertrain_s() >= 1000000) {
        // :5576
        await era.printAndWait(`就这样，${target_name}被卖给了魔族的大将。`); // :5577
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        ); // :5578
        await era.printAndWait(`……`); // :5579
        await era.printAndWait(
          `即使在魔族里也是拥有着强悍肉体的大将，拥有着非人的庞大兽欲。`,
        ); // :5580
        await era.printAndWait(
          `虽然是这样，但明明还是个小孩子的她却能将其全部承受下来，这大概是因为长期被你调教的缘故吧。`,
        ); // :5581
        await era.printAndWait(
          `每天都被大将侵犯着她，每天都被灌满浓稠的精液。`,
        ); // :5582
        await era.printAndWait(
          `就这样，作为大将的宠姬的${target_name}，沉溺于H的快乐中，意外的过着“幸福”的生活。`,
        ); // :5583
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        ); // :5584
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5585
      } else if (peek_aftertrain_s() >= 500000) {
        // :5587
        await era.printAndWait(`就这样，${target_name}被卖给了魔界的艺术家。`); // :5588
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        ); // :5589
        await era.printAndWait(`……`); // :5590
        await era.printAndWait(
          `在魔界的贵族中相当有名的艺术家，所需要的素材自然也是最顶级的。`,
        ); // :5591
        await era.printAndWait(
          `作为原公主的完美的幼体对他来说自然是上等的素材。`,
        ); // :5592
        await era.printAndWait(`听说以她为模特，画出了不少相当高价的作品。`); // :5593
        await era.printAndWait(`当然，和作为艺术家的那个人的H自然是少不了的。`); // :5594
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        ); // :5595
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5596
      } else if (peek_aftertrain_s() >= 100000) {
        // :5598
        await era.printAndWait(`就这样，${target_name}被卖给了魔王城的娼馆。`); // :5599
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        ); // :5600
        await era.printAndWait(`……`); // :5601
        await era.printAndWait(
          `像这样被调教好的人类幼女即使魔界也是很少见的，更不用说是被魔王玩弄过的。`,
        ); // :5602
        await era.printAndWait(
          `虽然还是个孩子，但却积极的侍奉着客人，很快就成为了娼馆的头牌之一。`,
        ); // :5603
        await era.printAndWait(
          `在充斥着淫靡气氛的娼馆中，幼小的身体每天都侍奉着各式各样的客人。`,
        ); // :5604
        await era.printAndWait(
          `虽然说是被卖过去的，但实际上似乎很乐意过着这样的生活。`,
        ); // :5605
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        ); // :5606
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5607
      } else {
        // :5609
        await era.printAndWait(`就这样，${target_name}被卖给了奴隶主。`); // :5610
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        ); // :5611
        await era.printAndWait(`……`); // :5612
        await era.printAndWait(
          `在被奴隶主亲自享用过一番后，作为手下人泄欲的工具，每晚都被男人们轮奸着。`,
        ); // :5613
        await era.printAndWait(
          `沉浸在被侵犯的快感中的她，大概到死为止都会被不停的侵犯着吧。`,
        ); // :5614
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        ); // :5615
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        ); // :5616
      } // :5617
    } else {
      // :5619
      await era.printAndWait(`「呜呜……好想……好想回家……」`); // :5620
      await era.printAndWait(`被装在囚车里拉走的她，一路上都不停的抽泣着。`); // :5621
      await era.printAndWait(
        `被当做普通的奴隶卖掉的${target_name}，就这样子消失在了黑暗的世界之中。`,
      ); // :5622
    } // :5623
  } // :5624

  if (game.train.初吻与自我口上 == 11) {
    // :5630
    if (chara(target).kojo.妊娠发觉 == 0) {
      // :5631

      if (era.get(`talent:${target}:9`) == 1) {
        // :5633
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5635
      } else if (
        era.get(`talent:${target}:76`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5637
      } else if (chara(target).event.妊娠相手 == 5) {
        // :5639
      } else if (chara(target).event.妊娠相手 == 7) {
        // :5641
      } else if (era.get(`talent:${target}:85`)) {
        // :5643
      } else if (era.get(`talent:${target}:76`)) {
        // :5645
      } else if (era.get(`mark:${target}:3`) == 3) {
        // :5647
      } // :5649
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :5650
      chara(target).kojo.妊娠发觉 = 1; // :5650
    } else {
      // :5652

      if (era.get(`talent:${target}:9`) == 1) {
        // :5654
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5656
      } else if (
        era.get(`talent:${target}:76`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5658
      } else if (chara(target).event.妊娠相手 == 5) {
        // :5660
      } else if (chara(target).event.妊娠相手 == 7) {
        // :5662
      } else if (era.get(`talent:${target}:85`)) {
        // :5664
      } else if (era.get(`talent:${target}:76`)) {
        // :5666
      } else if (era.get(`mark:${target}:3`) == 3) {
        // :5668
      } // :5670
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :5671
      chara(target).kojo.妊娠发觉 = 1; // :5671
    } // :5672
  } // :5673

  if (game.train.初吻与自我口上 == 12) {
    // :5679
    if (chara(target).kojo.生产 == 0) {
      // :5680

      if (era.get(`talent:${target}:9`) == 1) {
        // :5682
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5684
      } else if (
        era.get(`talent:${target}:76`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5686
      } else if (chara(target).event.妊娠相手 == 5) {
        // :5688
      } else if (chara(target).event.妊娠相手 == 7) {
        // :5690
      } else if (era.get(`talent:${target}:85`)) {
        // :5692
      } else if (era.get(`talent:${target}:76`)) {
        // :5694
      } else if (
        era.get(`mark:${target}:3`) == 3 &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5696
      } else if (era.get(`mark:${target}:3`) == 3) {
        // :5698
      } // :5700
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :5701
      chara(target).kojo.生产 = 1; // :5701
    } else {
      // :5703

      if (era.get(`talent:${target}:9`) == 1) {
        // :5705
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5707
      } else if (
        era.get(`talent:${target}:76`) &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5709
      } else if (chara(target).event.妊娠相手 == 5) {
        // :5711
      } else if (chara(target).event.妊娠相手 == 7) {
        // :5713
      } else if (era.get(`talent:${target}:85`)) {
        // :5715
      } else if (era.get(`talent:${target}:76`)) {
        // :5717
      } else if (
        era.get(`mark:${target}:3`) == 3 &&
        chara(target).event.妊娠相手 == 1
      ) {
        // :5719
      } else if (era.get(`mark:${target}:3`) == 3) {
        // :5721
      } else {
        // :5723
      } // :5724
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :5725
      chara(target).kojo.生产 = 1; // :5725
    } // :5726
  } // :5727

  if (game.train.初吻与自我口上 == 13) {
    // :5732

    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // :5734

      if (era.get(`talent:${target}:153`)) {
        // :5736
      } else if (era.get(`talent:${target}:154`)) {
        // :5738
        await era.printAndWait(`「要健康的成长起来哦……」`); // :5739
      } // :5740
    } // :5741
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :5742
    chara(target).kojo.育儿室 = 1; // :5742
  } // :5743

  if (game.train.初吻与自我口上 == 14) {
    // :5748

    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // :5750
    } // :5751
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :5752
    chara(target).kojo.亲离 = 1; // :5752
  } // :5753

  if (game.train.初吻与自我口上 == 999) {
    // :5758

    if (era.get(`talent:${target}:85`)) {
      // :5760
      await era.printAndWait(
        `「对不起……主人……明明想要……一直……呆在主人身边的……对不起……对不起……」`,
      ); // :5761
      await era.printAndWait(
        `怀中的幼女抽泣的声音渐渐的小了，从那上面再也感受不到活物的气息了。`,
      ); // :5762
    } else {
      // :5764
      await era.printAndWait(`「好冷……身体……好冷……的说……」`); // :5765
      await era.printAndWait(
        `小小的身体渐渐的僵硬了，从那上面再也感受不到活物的气息了。`,
      ); // :5766
    } // :5767
  } // :5768

  if (game.train.初吻与自我口上 == 998) {
    // :5772

    if (era.get(`talent:${target}:85`)) {
      // :5774
      await era.printAndWait(
        `「诶嘿嘿……能这样子……陪伴着主人渡过一生……${sc()}……已经很满足了呢……」`,
      ); // :5775
      await era.printAndWait(
        `「不能一直呆在主人身边……对不起……如果有来生……的……话……」`,
      ); // :5776
    } else {
      // :5778
      await era.printAndWait(
        `「啊啊……如果下次……能出生在一个没有战乱的世界……」`,
      ); // :5779
    } // :5780
  } // :5781

  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :5786
  game.train.初吻与自我口上 = 0; // :5786

  return 0; // :5788
}

// @dungeon_ryouzyoku_k19 // :5831
async function dungeon_ryouzyoku_k19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  await era.printAndWait(`「不，不要……好痛……放开我……！」`); // :5835

  if (era.get(`talent:${target}:0`) == 1) {
    // :5837

    await era.printAndWait(`「你们要干嘛……呜呜……求求你们……不要啊……！」`); // :5839
    await era.printAndWait(
      `不知道将要发生什么的${target_name}被强行按倒在地上……`,
    ); // :5840
  } else {
    // :5841

    await era.printAndWait(`「讨厌……那种事情……讨厌～～！」`); // :5843
    await era.printAndWait(
      `被按在地上的${target_name}拼尽全力的抵抗着，但在力量的差距面前毫无用途……`,
    ); // :5844
  } // :5845

  return 0; // :5847
}

// @dungeon_ryouzyoku_after_k19 // :5850
async function dungeon_ryouzyoku_after_k19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  if (era.get(`talent:${target}:0`) == 1) {
    // :5855

    await era.printAndWait(`「呜呜……这种事……讨厌……」`); // :5857
    await era.printAndWait(`虽然还保留着处女，但是仍然被凌辱了一番。`); // :5858
    await era.printAndWait(`${target_name}缩在角落里抽泣个不停。`); // :5859

    if (era.get(`exp:${target}:1`) > 20) {
      // :5862
      await era.printAndWait(`「呜呜……屁股被……做了那种事……」`); // :5863
      await era.printAndWait(`「肚子里面……好难受……」`); // :5864
    } // :5865

    if (era.get(`exp:${target}:22`) > 20) {
      // :5867
      await era.printAndWait(`「这样就……可以了吧……嘴巴好酸哦……」`); // :5868
    } // :5869

    if (era.get(`exp:${target}:20`) > 20) {
      // :5871
      await era.printAndWait(`「咳咳……好奇怪的……味道……」`); // :5872
      await era.printAndWait(
        `${target_name}轻轻咳嗽着，吐出嘴里白黏黏的液体。`,
      ); // :5873
    } // :5874
  } else {
    // :5875

    await era.printAndWait(`「呜……又被……玷污了……被这些怪物给……」`); // :5877
    await era.printAndWait(
      `一身狼藉的${target_name}倒在地上，眼泪不断的涌出来。`,
    ); // :5878

    if (era.get(`exp:${target}:0`) > 20) {
      // :5881
      await era.printAndWait(`「啊啊……肚子……已经……装……装不下了……」`); // :5882
      await era.printAndWait(`幼小的洞口里，精液慢慢的流了出来。`); // :5883
    } // :5884

    if (era.get(`exp:${target}:1`) > 20) {
      // :5886
      await era.printAndWait(`「呜呜……屁股被……做了那种事……」`); // :5887
      await era.printAndWait(`「肚子里面……好难受……」`); // :5888
    } // :5889

    if (era.get(`exp:${target}:22`) > 20) {
      // :5891
      await era.printAndWait(`「这样就……可以了吧……嘴巴好酸哦……」`); // :5892
    } // :5893

    if (era.get(`exp:${target}:20`) > 20) {
      // :5895
      await era.printAndWait(`「咳咳……好奇怪的……味道……」`); // :5896
      await era.printAndWait(
        `${target_name}轻轻咳嗽着，吐出嘴里白黏黏的液体。`,
      ); // :5897
    } // :5898
  } // :5899

  return 0; // :5901
}

// @benki_koujo_k19 // :5903
async function benki_koujo_k19() {
  const target = era_flag.target;
  const a = target; // 原作 A：当前处理角色
  const sc = (cid = target) => self_call(cid);
  if (game.train.肉便器行动 == 0) {
    // :5908

    if (era.get(`talent:${a}:76`) == 1) {
      // :5911
      await era.printAndWait(`「呼啊啊……肉棒……有好多呢……好开心……诶嘿❤」`); // :5912
    } else if (era.get(`talent:${a}:85`)) {
      // :5914
      await era.printAndWait(
        `「呜呜……不要……主人……${sc()}会好好听话的……这种事情不要……${sc()}只想和主人……呜～」`,
      ); // :5915
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5917
      await era.printAndWait(`「虽然……这种事情很讨厌……但是主人的命令的话……」`); // :5918
    } else {
      // :5920
      await era.printAndWait(
        `「对不起……对不起……请原谅${sc()}……呜呜……这种事……不要……不要啊……」`,
      ); // :5921
    } // :5922
  } else if (game.train.肉便器行动 == 1) {
    // :5923

    if (era.get(`talent:${a}:76`) == 1) {
      // :5926
      await era.printAndWait(
        `「呼啊啊……姐姐大人……嗯……请更多的使用${sc()}的身体吧……❤」`,
      ); // :5927
    } else if (era.get(`talent:${a}:85`)) {
      // :5929
      await era.printAndWait(`「呜……姐姐……这样子……呀……不，不行……」`); // :5930
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5932
      await era.printAndWait(`「呜嗯……侍奉……会好好做的……」`); // :5933
    } else {
      // :5935
      await era.printAndWait(`「呜……这种事情……呀……好复杂的……感觉……」`); // :5936
    } // :5937
  } else if (game.train.肉便器行动 == 2) {
    // :5938

    if (era.get(`talent:${a}:76`) == 1) {
      // :5941
      await era.printAndWait(
        `「汪汪～肉棒，嗯～好舒服～～还想要更多一点……汪❤」`,
      ); // :5942
    } else if (era.get(`talent:${a}:85`)) {
      // :5944
      await era.printAndWait(`「呜……是因为主人才……本来这种事情……」`); // :5945
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5947
      await era.printAndWait(`「就，就算是怪物……也……也会好好地……侍奉的……」`); // :5948
    } else {
      // :5950
      await era.printAndWait(`「呼诶诶诶，要和怪物什么的……好，好讨厌呜呜……」`); // :5951
    } // :5952
  } else if (game.train.肉便器行动 == 3) {
    // :5953

    if (era.get(`talent:${a}:76`) == 1) {
      // :5956
      await era.printAndWait(
        `「呼啊啊，两边都被灌的满满的呢……诶嘿嘿，作为肉便器是当然的吧❤」`,
      ); // :5957
    } else if (era.get(`talent:${a}:85`)) {
      // :5959
      await era.printAndWait(
        `「哈啊……哈啊……两边都……呜呜……主人……请原谅${sc()}吧……」`,
      ); // :5960
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5962
      await era.printAndWait(`「呜……哈啊……肚子里……已经……装不下了啦……」`); // :5963
    } else {
      // :5965
      await era.printAndWait(`「呜……要……要坏掉了……啦……」`); // :5966
    } // :5967
  } else if (game.train.肉便器行动 == 4) {
    // :5968

    if (era.get(`talent:${a}:76`) == 1) {
      // :5971
      await era.printAndWait(
        `「诶嘿嘿……还不够呢……${sc()}的小穴……还想要更多的精液的说❤」`,
      ); // :5972
    } else if (era.get(`talent:${a}:85`)) {
      // :5974
      await era.printAndWait(`「肚子里面……主人以外的精液……呜呜……」`); // :5975
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5977
      await era.printAndWait(
        `「嗯呜……会好好侍奉的……还没有满足的话……就请……尽情的……继续使用吧……」`,
      ); // :5978
    } else {
      // :5980
      await era.printAndWait(`「啊啊……肚子里面……被灌的满满的……」`); // :5981
    } // :5982
  } else if (game.train.肉便器行动 == 5) {
    // :5983

    if (era.get(`talent:${a}:76`) == 1) {
      // :5986
      await era.printAndWait(`「屁股的话……因为很舒服，所以请更多的使用吧❤」`); // :5987
    } else if (era.get(`talent:${a}:85`)) {
      // :5989
      await era.printAndWait(`「身体……被主人以外的人使用了……就算是后面也……」`); // :5990
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5992
      await era.printAndWait(
        `「呜嗯……${sc()}会……好好侍奉的……所以${sc()}的身体……那个……请用到满足为止吧……」`,
      ); // :5993
    } else {
      // :5995
      await era.printAndWait(`「啊啊……肚子里面……被灌的满满的……」`); // :5996
    } // :5997
  } // :5998

  return 0; // :6000
}

// @dungeon_victory_k19 // :6003
async function dungeon_victory_k19(rand) {
  const target = era_flag.target;
  const a = target; // 原作 A：当前战斗角色
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (era.get(`talent:${a}:76`) == 1) {
    // :6008

    await era.printAndWait(`「诶嘿嘿，看来勇者桑还要继续加油才行呢❤」`); // :6010
    await era.print(''); // :6011

    if (rand_n(2) == 0) {
      // :6013
      await era.printAndWait(`「这样子的话……呐呐，来做点有趣的事怎么样～？」`); // :6014
    } else {
      // :6015
      await era.printAndWait(
        `「呜～要不是为了和魔王大人做舒服的事情，才不想来这里呢～」`,
      ); // :6016
    } // :6017

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      // :6019

      await era.printAndWait(`「讨厌……死掉什么的听起来就很难受呢……」`); // :6021
    } else {
      // :6022

      await era.printAndWait(`「好，回去吧～～♪」`); // :6024
    } // :6025
  } else if (era.get(`talent:${a}:85`) == 1) {
    // :6027

    await era.printAndWait(`「这，这样子的话……那个……算是${sc()}……赢了吧……？」`); // :6029
    await era.print(''); // :6030

    if (rand_n(2) == 0) {
      // :6032
      await era.printAndWait(
        `「虽然不喜欢这种事，但是为了魔王大人，${sc()}会加油的！」`,
      ); // :6033
    } else {
      // :6034
      await era.printAndWait(`「那个……你，你还好吧……？」`); // :6035
    } // :6036

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      // :6038

      await era.printAndWait(`「哈呜呜……不过……还以为已经不行了的说……」`); // :6040
    } else {
      // :6041

      await era.printAndWait(
        `「对，对不起……但是这种程度的话……对于魔王大人来说……」`,
      ); // :6043
    } // :6044
  } else {
    // :6045

    await era.printAndWait(`「什么时候……才能回家呢……」`); // :6047
    await era.print(''); // :6048

    if (rand_n(2)) {
      // :6050
      await era.printAndWait(
        `「对不起……${sc()}……呜呜……${sc()}也不想这样的……」`,
      ); // :6051
    } else {
      // :6052
      await era.printAndWait(`「这种事，明明不应该发生的说……」`); // :6053
    } // :6054

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      // :6056

      await era.printAndWait(`「差点就死掉了呜呜……」`); // :6058
    } else {
      // :6059

      await era.printAndWait(
        `「虽然这次运气好……但是下次的话……要怎么办才好呢……」`,
      ); // :6061
    } // :6062
  } // :6063

  return 0; // :6065
}

// @dungeon_attack_k19 // :6069
async function dungeon_attack_k19(rand) {
  const target = era_flag.target;
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (chara(target).invasion.状态 == 2) {
    // :6074

    if (rand_n(3) == 0) {
      // :6076
      await era.printAndWait(`「请，请住手吧！」`); // :6077
    } else if (rand_n(2) == 0) {
      // :6078
      await era.printAndWait(`「不要过来～～！」`); // :6079
    } else {
      // :6080
      await era.printAndWait(`「对不起！」`); // :6081
    } // :6082
  } else {
    // :6083

    if (era.get(`talent:${target}:76`) && rand_n(2) == 0) {
      // :6086
      await era.printAndWait(`「为了做舒服的事情所以抱歉呐，勇者姐姐～」`); // :6087
    } else if (era.get(`talent:${target}:76`)) {
      // :6088
      await era.printAndWait(`「诶嘿嘿～～❤」`); // :6089
    } else if (era.get(`talent:${target}:85`) && rand_n(2) == 0) {
      // :6091
      await era.printAndWait(
        `「为了魔王大人……${sc()}什么都会去做的……！就，就算这种事情……也……也……」`,
      ); // :6092
    } else if (era.get(`talent:${target}:85`)) {
      // :6093
      await era.printAndWait(`「对不起……勇者姐姐……但是，请，请回去吧……！」`); // :6094
    } else if (rand_n(2) == 0) {
      // :6096
      await era.printAndWait(`「呜呜，勇者姐姐……抱歉了……！」`); // :6097
    } else {
      // :6098
      await era.printAndWait(`「对不起……这种事……对不起……」`); // :6099
    } // :6100
  } // :6101

  return 0; // :6105
}

// @colosseum_kojo_19 // :6113
async function colosseum_kojo_19() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  if (era_flag.selectcom == 55) {
    // :6117

    if (era.get(`base:${target}:1`) <= 0) {
      // :6119
      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // :6120
    } else {
      // :6121
      await era.printAndWait(
        `${target_name}因为死斗场的热情氛围，看着即将要对战的对手颤抖着……`,
      ); // :6122
    } // :6123
    return 0; // :6124
  } // :6125

  if (era_flag.selectcom == 56) {
    // :6129

    if (era.get(`base:${target}:1`) <= 0) {
      // :6131

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :6133
        await era.printAndWait(`「咦…咦…不、不要了………啊啊啊啊……」`); // :6134
        await era.printAndWait(`用尽力气的${target_name}坐着哭了……`); // :6135
      } else {
        // :6136
        await era.printAndWait(`「不要不要…不要过来啊…！」`); // :6137
        await era.printAndWait(`用尽力气的${target_name}坐着哭了……`); // :6138
      } // :6139
    } else {
      // :6140

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :6142
        await era.printAndWait(`「不、不要啊…怎么可能赢过勇者大人啊……」`); // :6143
        await era.printAndWait(
          `${target_name}因为${master_name}的命令武装了起来，看见${assi_name}之后好像马上就要大哭起来了……`,
        ); // :6144
      } else {
        // :6145
        await era.printAndWait(
          `「救、救救我…主人大人…我、我什么坏事都没做啊……」`,
        ); // :6146
        await era.printAndWait(
          `${target_name}看着丑陋的怪物们向${master_name}寻求帮助……`,
        ); // :6147
      } // :6148
    } // :6149
    return 0; // :6150
  } // :6151

  if (era_flag.selectcom == 31) {
    // :6156

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :6158
      await era.printAndWait(
        `「啊唔…我、我会好好舔的…不要做很痛的事……嗯咕……」`,
      ); // :6159
      await era.print(`${assi_name}因为`); // :6160
      if (
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1
      ) {
        // :6162
        await era.print(`阴茎`); // :6162
      } // :6162
      if (
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era0(`item:${PBAND}`) == 1
      ) {
        // :6164
        await era.print(`假阴茎`); // :6164
      } // :6164
      await era.printAndWait(`被${target_name}含住而露出了快乐的的表情……`); // :6165
    } else {
      // :6166
      await era.printAndWait(`「啊啊…嗯咕…嗯唔…咳咳…呕呕……」`); // :6167
      await era.printAndWait(`${target_name}舔着发出令人作呕的气味的阴茎……`); // :6168
    } // :6169
    return 0; // :6170
  } // :6171

  if (era_flag.selectcom == 5) {
    // :6175

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :6177
      await era.printAndWait(`「不…不要啊…勇者的姐姐…啊啊！」`); // :6178
      await era.printAndWait(`${target_name}就那样被${assi_name}玩弄着……`); // :6179
    } else {
      // :6180
      await era.printAndWait(`「啊啊…快离开啊…啊啊…好、好痛…！」`); // :6181
      await era.printAndWait(
        `${target_name}因为胸部被大力的揉弄而发出了痛苦的声音……`,
      ); // :6182
    } // :6183
    return 0; // :6184
  } // :6185

  if (era_flag.selectcom == 21) {
    // :6189

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :6191
      await era.printAndWait(`「不要不要…太过分了…不要了啊…啊啊！」`); // :6192
      await era.print(`${assi_name}一边听着悲鸣，一边用`); // :6193
      if (
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1
      ) {
        // :6195
        await era.print(`肉棒`); // :6195
      } // :6195
      if (
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era0(`item:${PBAND}`) == 1
      ) {
        // :6197
        await era.print(`假阴茎`); // :6197
      } // :6197
      await era.printAndWait(`毫不留情的继续蹂躏着${target_name}的腔内……`); // :6198
    } else if (game.train.死斗场敌种 == 206) {
      // :6200
      await era.printAndWait(`「噶…噶啊…咕…咕哦哦哦……」`); // :6201
      await era.printAndWait(
        `可怜的${target_name}发出被踩死的青蛙一样的声音，就那样继续被巨魔玩弄着……`,
      ); // :6202
    } else {
      // :6203
      await era.printAndWait(`「咦…咦…要坏掉了要坏掉了啊！」`); // :6204
      await era.printAndWait(`${target_name}就那样被怪物侵犯着……`); // :6205
    } // :6206
    return 0; // :6207
  } // :6208

  if (era_flag.selectcom == 27) {
    // :6213

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :6215
      await era.printAndWait(`「不要不要…不是插进哪里啊…不要了啊…啊啊！」`); // :6216
      await era.print(`${assi_name}一边听着悲鸣，一边用`); // :6217
      if (
        era.get(`talent:${assi}:121`) == 1 ||
        era.get(`talent:${assi}:122`) == 1
      ) {
        // :6219
        await era.print(`肉棒`); // :6219
      } // :6219
      if (
        era.get(`talent:${assi}:121`) != 1 &&
        era.get(`talent:${assi}:122`) != 1 &&
        era0(`item:${PBAND}`) == 1
      ) {
        // :6221
        await era.print(`假阴茎`); // :6221
      } // :6221
      await era.printAndWait(`毫不留情的继续蹂躏着${target_name}的肛门……`); // :6222
    } else if (game.train.死斗场敌种 == 206) {
      // :6224
      await era.printAndWait(`「噶…噶啊…咕…咕哦哦哦……」`); // :6225
      await era.printAndWait(
        `可怜的${target_name}发出被踩死的青蛙一样的声音，就那样继续被巨魔玩弄着……`,
      ); // :6226
    } else {
      // :6227
      await era.printAndWait(`「咦…咦…屁股…屁股要裂开了啊啊啊啊！」`); // :6228
      await era.printAndWait(`${target_name}就那样被怪物侵犯着肛门……`); // :6229
    } // :6230
    return 0; // :6231
  } // :6232

  if (era_flag.selectcom == 51) {
    // :6237
    await era.printAndWait(`「啊啊…身、身体好热…啊啊…！」`); // :6238
    return 0; // :6239
  } // :6240

  return 0; // :6243
}

// @ntr_koujo_k19 // :6247
async function ntr_koujo_k19(p) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  if (chara(target).kojo.NTR再捕获 == 0) {
    // :6252
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :6252
    chara(target).kojo.NTR再捕获 = 1; // :6252
  } // :6252

  if (p == 1) {
    // :6254

    if (era.get(`talent:${target}:85`)) {
      // :6256
      await era.printAndWait(
        `「不，不要……！第一次明明……明明要给魔王大人的说……！」`,
      ); // :6257
    } else {
      // :6258
      await era.printAndWait(`「讨厌……好痛……不要……求求你～不要～～！」`); // :6259
    } // :6260
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :6261
    chara(target).kojo.NTR_651 = 1; // :6261
  } else if (p == 2) {
    // :6263
    if (era.get(`talent:${target}:85`)) {
      // :6264
      await era.printAndWait(
        `「求求你……呜呜……屁股……快要裂开来了……狂王大人……好难受……的说……」`,
      ); // :6265
    } else {
      // :6266
      await era.printAndWait(`「好痛……好难受……不要……」`); // :6267
    } // :6268
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :6269
    chara(target).kojo.NTR_652 = 1; // :6269
  } else if (p == 3) {
    // :6271
    if (era.get(`talent:${target}:85`)) {
      // :6272
      await era.printAndWait(
        `「呜呜，这种事，不要，不要看～～不要看呜啊啊啊啊～～～」`,
      ); // :6273
    } else {
      // :6274
      await era.printAndWait(`「为什么……要做这么过分的事情……求求你……不要……」`); // :6275
    } // :6276
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :6277
    chara(target).kojo.NTR_653 = 1; // :6277
  } else if (p == 4) {
    // :6279
    if (era.get(`talent:${target}:85`)) {
      // :6280
      await era.printAndWait(
        `「呜……哈啊……呀……哈呜呜……魔王……大人……呜呜……对，对不起…………」`,
      ); // :6281
      await era.printAndWait(
        `${target_name}抽泣着，小声的念着${master_name}的名字。`,
      ); // :6282
    } else if (era.get(`talent:${target}:76`)) {
      // :6284
      await era.printAndWait(`「嗯哈……❤肉棒……呜呜，好舒服……❤」`); // :6285
      await era.printAndWait(`「只要有肉棒……不管在哪里都可以呢❤」`); // :6286
    } else {
      // :6287
      await era.printAndWait(`「哈呜呜……呀……不……要……呜呜～～」`); // :6288
    } // :6289
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :6290
    chara(target).kojo.NTR_654 = 1; // :6290
  } else if (p == 5) {
    // :6292
    if (era.get(`talent:${target}:85`)) {
      // :6293
      await era.printAndWait(`「呜……哈啊……呀……求求你们……呀……不……不要……！」`); // :6294
      await era.printAndWait(`「魔王大人……魔王大人……呜呜……」`); // :6295
      await era.printAndWait(`豆大的眼泪不断的从小脸上滑落下来。`); // :6296
    } else if (era.get(`talent:${target}:76`)) {
      // :6298
      await era.printAndWait(`「嗯呜～呀～～哈啊啊～～❤」`); // :6299
      await era.printAndWait(`「肉棒……呜……两边都……嗯哈～❤塞得满满的～～❤」`); // :6300
      await era.printAndWait(`「好厉害～～舒服的要，要死掉了啦～～❤」`); // :6301
    } else {
      // :6302
      await era.printAndWait(`「啊呜呜……哈啊……嘎哈……不……呜……不……要……」`); // :6303
    } // :6304
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :6305
    chara(target).kojo.NTR_655 = 1; // :6305
  } else if (p == 6) {
    // :6307
    if (era.get(`talent:${target}:85`)) {
      // :6308
      await era.printAndWait(`「如果……魔王大人在这里的话……呜……魔王大人……」`); // :6309
    } else if (era.get(`talent:${target}:76`)) {
      // :6311
      await era.printAndWait(`「啊哈……❤肉棒，肉棒有好多呢～好开心～～❤」`); // :6312
    } else {
      // :6313
      await era.printAndWait(`「呜呜……这种事……不要了啦……好想回家……」`); // :6314
    } // :6315
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :6316
    chara(target).kojo.NTR_656 = 1; // :6316
  } else if (p == 7) {
    // :6318

    if (era.get(`talent:${target}:76`)) {
      // :6320
      await era.printAndWait(
        `「哈啊～～❤狂王大人的肉棒……好厉害，在肚子里面咕啾咕啾的抽送着呢❤」`,
      ); // :6321
      await era.printAndWait(
        `「魔王大人和狂王大人的肉棒，哪边更舒服已经分不清楚了啦～～❤」`,
      ); // :6322
    } else if (era.get(`talent:${target}:85`)) {
      // :6323
      await era.printAndWait(
        `「咕……哈啊啊……呜呀……要坏掉了，肚子，要坏掉了呜呜～～！」`,
      ); // :6324
      await era.printAndWait(
        `狂王惊人的尺寸粗暴的在小小的身体里肆虐着，仿佛要将她弄坏掉一样。`,
      ); // :6325
      await era.printAndWait(`「对不起……魔王大人……对不起……」`); // :6326
    } else {
      // :6327
      await era.printAndWait(
        `「狂，狂王大人……呜呜……求求你……温柔一点……呜呜……」`,
      ); // :6328
      await era.printAndWait(`「肚子里面……呜呜……好，好难受……」`); // :6329
    } // :6330
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :6331
    chara(target).kojo.NTR_657 = 1; // :6331
  } else if (p == 20) {
    // :6333
  } // :6334
  return 0; // :6335
}

// @exucution_koujo_k19 // :6337
async function exucution_koujo_k19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (game.event.犬射精或处刑口上 == 4) {
    // :6341

    if (era.get(`talent:${target}:85`)) {
      // :6344
      await era.printAndWait(
        `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
      ); // :6344
    } // :6344
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6345
  } else if (game.event.犬射精或处刑口上 == 5) {
    // :6348

    if (era.get(`talent:${target}:85`)) {
      // :6351
      await era.printAndWait(
        `「如，如果这是魔王大人的要求……${sc()}……很，很荣幸……的说……」`,
      ); // :6351
    } // :6351
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6352
  } else if (game.event.犬射精或处刑口上 == 6) {
    // :6355
    await era.printAndWait(''); // :6356
  } else if (game.event.犬射精或处刑口上 == 7) {
    // :6358
    await era.printAndWait(''); // :6359
  } // :6360
}

// @museum_koujo_k19 // :6363
async function museum_koujo_k19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (era.get(`talent:${target}:85`)) {
    // :6367
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6367
  } // :6367
  await era.printAndWait(
    `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
  ); // :6368

  return 0; // :6370

  if (game.event.博物馆口上 == 0) {
    // :6373

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6375
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6376
  } else if (game.event.博物馆口上 == 1) {
    // :6378

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6380
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6381
  } else if (game.event.博物馆口上 == 2) {
    // :6383

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6385
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6386
  } else if (game.event.博物馆口上 == 3) {
    // :6388

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6390
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6391
  } else if (game.event.博物馆口上 == 4) {
    // :6393

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6395
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6396
  } else if (game.event.博物馆口上 == 5) {
    // :6398

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6400
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6401
  } else if (game.event.博物馆口上 == 6) {
    // :6403

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6405
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6406
  } else if (game.event.博物馆口上 == 7) {
    // :6408

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    ); // :6410
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6411
  } else if (game.event.博物馆口上 == 8) {
    // :6413

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
    ); // :6415
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6416
  } else if (game.event.博物馆口上 == 9) {
    // :6418

    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
    ); // :6420
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6421
  } // :6422
}

// @banishment_koujo_k19 // :6425
async function banishment_koujo_k19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (game.event.流放口上 == 0) {
    // :6429

    if (era.get(`talent:${target}:85`)) {
      // :6431
      await era.printAndWait(
        `「不要……！${sc()}只想……只想呆在魔王大人的身边，明明只想这样子的说……！」`,
      ); // :6432
      await era.printAndWait(
        `「不管被做什么也好，不管魔王大人有怎么样的要求也好……${sc()}都……都……」`,
      ); // :6433
      await era.printAndWait(`「求求你……求求你……不要……赶${sc()}走……」`); // :6434
      await era.printAndWait(
        `稚气的声音大声的哭喊着，比以往任何时候都要强烈。`,
      ); // :6435
      await era.printAndWait(`不过在你的眼中，不过只是区区一个人类而已。`); // :6436
      await era.printAndWait(`玩腻了的玩具什么的，就丢掉吧。`); // :6437
    } else {
      // :6439
      await era.printAndWait(`「终于……可以回家了吗……啊啊……」`); // :6440
      await era.printAndWait(
        `望着曾经的家乡，${target_name}的眼泪沿着脸颊滑落下来。`,
      ); // :6441
    } // :6442
  } else if (game.event.流放口上 == 1) {
    // :6444
    await era.printAndWait(''); // :6445
  } else if (game.event.流放口上 == 2) {
    // :6447
    await era.printAndWait(''); // :6448
  } else if (game.event.流放口上 == 3) {
    // :6450
    await era.printAndWait(''); // :6451
  } // :6452
}

// @PUBLIC_exucution_koujo_k19 // :6455
async function public_exucution_koujo_k19() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (game.event.公开处刑口上 == 0) {
    // :6459

    if (era.get(`talent:${target}:85`)) {
      // :6462
      await era.printAndWait(
        `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
      ); // :6462
    } // :6462
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6463
  } else if (game.event.公开处刑口上 == 1) {
    // :6465

    if (era.get(`talent:${target}:85`)) {
      // :6468
      await era.printAndWait(
        `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
      ); // :6468
    } // :6468
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    ); // :6469
  } else if (game.event.公开处刑口上 == 2) {
    // :6471
    await era.printAndWait(''); // :6472
  } // :6473
}

// @grotesque_koujo_k19 // :6476
async function grotesque_koujo_k19() {
  if (game.event.猎奇处刑口上 == 0) {
    // :6480
    await era.printAndWait(''); // :6481
  } else if (game.event.猎奇处刑口上 == 1) {
    // :6483
    await era.printAndWait(''); // :6484
  } else if (game.event.猎奇处刑口上 == 2) {
    // :6486
    await era.printAndWait(''); // :6487
  } else if (game.event.猎奇处刑口上 == 3) {
    // :6489
    await era.printAndWait(''); // :6490
  } else if (game.event.猎奇处刑口上 == 4) {
    // :6492
    await era.printAndWait(''); // :6493
  } else if (game.event.猎奇处刑口上 == 5) {
    // :6495
    await era.printAndWait(''); // :6496
  } else if (game.event.猎奇处刑口上 == 6) {
    // :6498
    await era.printAndWait(''); // :6499
  } // :6500
}

// @enterenemy_koujo_k19 // :6503
async function enterenemy_koujo_k19() {
  const a = era_flag.target; // 原作 A：进入敌阵的角色
  if (era.get(`talent:${a}:76`)) {
    // :6507
    await era.printAndWait(
      `「啊～～被击败以后会被怎样侵犯呢，有点期待呢～～❤」`,
    ); // :6508
  } else if (era.get(`talent:${a}:85`)) {
    // :6510
    await era.printAndWait(`「这也是为了再见到魔王大人……」`); // :6511
  } else {
    // :6512
    await era.printAndWait(`「虽然很讨厌……但是……呜呜……不做的话……不行吗……」`); // :6513
  } // :6514
}

// @gohoubi_request_koujo_k19 // :6517
async function gohoubi_request_koujo_k19() {
  const target = era_flag.target;
  const a = target; // 原作 A：请求奖赏的角色
  const sc = (cid = target) => self_call(cid);
  if (chara(a).stronghold.要求奖赏 == 0) {
    // :6520

    await era.printAndWait(''); // :6522
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // :6523

    await era.print(''); // :6525
    if (chara(a).stronghold.要求奖赏 == 1) {
      // :6526
      await era.print(`犬`); // :6527
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      // :6528
      await era.print(`豚`); // :6529
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      // :6530
      await era.print(`马`); // :6531
    } // :6532
    await era.printAndWait(''); // :6533
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    // :6534

    await era.printAndWait(`「那个……魔王大人的……kiss……可以咩……？」`); // :6536
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    // :6537

    await era.printAndWait(`「想和魔王大人……做舒服的事情呢……」`); // :6539
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    // :6540

    await era.printAndWait(''); // :6542
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    // :6543

    await era.printAndWait(`「那～${sc()}要好多好多的肉棒和精液牛奶～～❤」`); // :6546
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    // :6547

    await era.printAndWait(''); // :6549
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    // :6550

    await era.printAndWait(''); // :6552
  } // :6553
}

// @gohoubi_after_koujo_k19 // :6555
async function gohoubi_after_koujo_k19(rand, cid, choice) {
  void rand;
  void cid;
  void choice;
  const target = era_flag.target;
  const a = target; // 原作 A：接受奖赏的角色
  const sc = (cid = target) => self_call(cid);
  if (game.dungeon.足交射精或处遇口上 == 0) {
    // :6561
    await era.printAndWait(''); // :6562
  } else if (game.dungeon.足交射精或处遇口上 == 1) {
    // :6564

    await era.printAndWait(
      `「唔……比起这个……还是更喜欢和魔王大人做舒服的事情～❤」`,
    ); // :6566

    await era.printAndWait(`「为了魔王大人……${sc()}什么事情都会努力的……！」`); // :6568
  } else if (game.dungeon.足交射精或处遇口上 == 2) {
    // :6569

    if (chara(a).stronghold.要求奖赏 == 0) {
      // :6571

      await era.printAndWait(
        `「这种东西……${sc()}只要呆在魔王大人身边就已经很满足了呢……」`,
      ); // :6573
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      // :6575

      await era.printAndWait(`「要和狗狗H吗～嗯～～❤」`); // :6577
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      // :6579

      if (era.get(`talent:${a}:0`) == 1) {
        // :6581
        await era.printAndWait(''); // :6582
      } else {
        // :6583
        await era.printAndWait(''); // :6584
      } // :6585
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      // :6587

      if (era.get(`talent:${a}:0`) == 1) {
        // :6589
        await era.printAndWait(''); // :6590
      } else {
        // :6591
        await era.printAndWait(''); // :6592
      } // :6593
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      // :6595
      await era.printAndWait(`「嗯……啾哈……魔王大人的kiss……嗯……最喜欢了……❤」`); // :6596
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      // :6598

      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        // :6600
        await era.printAndWait(
          `「呼啊啊……主人的……魔王大人的肉棒……在肚子里面……嗯呀～～❤」`,
        ); // :6601
      } else {
        // :6603
        await era.printAndWait(
          `「呼啊啊……主人的……魔王大人的肉棒……在屁股里……嗯呀～～❤」`,
        ); // :6604
      } // :6605
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      // :6607
      await era.printAndWait(''); // :6608
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      // :6610

      await era.printAndWait(`「呜呜～肚子里面，已经，已经装不下了啦～～❤」`); // :6612
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      // :6614
      await era.printAndWait(''); // :6615
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      // :6617

      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        // :6619
        await era.printAndWait(''); // :6620
      } else {
        // :6622
        await era.printAndWait(''); // :6623
      } // :6624
    } else {
      // :6625
    } // :6626
  } // :6627
}

// @osioki_koujo_k19 // :6629
async function osioki_koujo_k19(rand, cid, choice) {
  void rand;
  void cid;
  void choice;
  const a = era_flag.target; // 原作 A：受处罚的角色
  if (game.dungeon.足交射精或处遇口上 == 0) {
    // :6635
    await era.printAndWait(''); // :6636
  } else if (game.dungeon.足交射精或处遇口上 == 1) {
    // :6638

    if (era.get(`abl:${a}:21`) >= 3) {
      // :6640
      await era.printAndWait(''); // :6641
    } else {
      // :6642
      await era.printAndWait(''); // :6643
    } // :6644
  } else if (game.dungeon.足交射精或处遇口上 == 2) {
    // :6646

    if (era.get(`abl:${a}:17`) >= 4) {
      // :6648
      await era.printAndWait(''); // :6649
    } else {
      // :6650
      await era.printAndWait(''); // :6651
    } // :6652
  } else if (game.dungeon.足交射精或处遇口上 == 3) {
    // :6654

    if (era.get(`abl:${a}:17`) >= 6) {
      // :6656
      await era.printAndWait(''); // :6657
    } else {
      // :6658
      await era.printAndWait(''); // :6659
    } // :6660
  } else if (game.dungeon.足交射精或处遇口上 == 4) {
    // :6662

    if (era.get(`abl:${a}:21`) >= 3) {
      // :6664
      await era.printAndWait(''); // :6665
    } else {
      // :6666
      await era.printAndWait(''); // :6667
    } // :6668
  } else if (game.dungeon.足交射精或处遇口上 == 5) {
    // :6670

    if (era.get(`talent:${a}:88`) == 1 || era.get(`talent:${a}:76`) == 1) {
      // :6672
      await era.printAndWait(''); // :6673
    } else {
      // :6674
      await era.printAndWait(''); // :6675
    } // :6676
  } else if (game.dungeon.足交射精或处遇口上 == 6) {
    // :6678
    await era.printAndWait(''); // :6679
  } else if (game.dungeon.足交射精或处遇口上 == 7) {
    // :6681
    await era.printAndWait(''); // :6682
  } else if (game.dungeon.足交射精或处遇口上 == 8) {
    // :6684
    await era.printAndWait(''); // :6685
  } else if (game.dungeon.足交射精或处遇口上 == 9) {
    // :6687
    await era.printAndWait(''); // :6688
  } // :6689
}

// @gobi_koujo_k19, ARG:0 // :6693
async function gobi_koujo_k19(arg0, rand) {
  const target = era_flag.target;
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (arg0 == 1) {
    // :6696

    await era.print(`，诶嘿嘿～♪`); // :6698
  } else if (arg0 == 2) {
    // :6699

    await era.print(`，呜～～${sc()}要咬人了的说～～`); // :6701
  } else if (arg0 == 3) {
    // :6702

    await era.print(`哈呜呜……`); // :6704
  } else if (arg0 == 4) {
    // :6705

    await era.print(`呜……\\/\\/\\/\\/`); // :6707
  } else if (arg0 == 5) {
    // :6708

    await era.print(''); // :6710
  } else {
    // :6711

    if (rand_n(3) == 0) {
      // :6714
      await era.print(''); // :6715
    } else if (rand_n(2) == 0) {
      // :6716
      await era.print(''); // :6717
    } else {
      // :6718
      await era.print(''); // :6719
    } // :6720
  } // :6721
}

ryouzyoku_kojo_family.register(19, dungeon_ryouzyoku_k19);
ryouzyoku_after_kojo_family.register(19, dungeon_ryouzyoku_after_k19);
benki_koujo_family.register(19, benki_koujo_k19);
dungeon_victory_family.register(19, dungeon_victory_k19);
dungeon_attack_family.register(19, dungeon_attack_k19);
ntr_koujo_family.register(19, ntr_koujo_k19);
exucution_koujo_family.register(19, exucution_koujo_k19);
museum_koujo_family.register(19, museum_koujo_k19);
banishment_koujo_family.register(19, banishment_koujo_k19);
public_exucution_koujo_family.register(19, public_exucution_koujo_k19);
grotesque_koujo_family.register(19, grotesque_koujo_k19);
enterenemy_koujo_family.register(19, enterenemy_koujo_k19);
gohoubi_request_koujo_family.register(19, gohoubi_request_koujo_k19);
gohoubi_after_koujo_family.register(19, (cid, choice) =>
  gohoubi_after_koujo_k19(undefined, cid, choice),
);
osioski_koujo_family.register(19, (cid, choice) =>
  osioki_koujo_k19(undefined, cid, choice),
);
gobi_koujo_family.register(19, gobi_koujo_k19);
kojo_message_com_family.register(19, kojo_message_com_19);
kojo_message_palamcng_family.register(19, kojo_message_palamcng_19);
kojo_message_markcng_family.register(19, kojo_message_markcng_19);
self_kojo_family.register(19, self_kojo_k19);
