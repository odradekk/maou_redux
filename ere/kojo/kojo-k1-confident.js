/**
 * @file 自信家性格口上 K1：指令口上全部分支与非调教函数（issue #232，J22）。
 *
 * 源: target/ERB/口上/EVENT_K1_自信家.ERB
 *     @EVENTTRAIN #PRI（:84-88，存在标志 FLAG:101）
 *     @EVENTEND #LATER（:90-92，清标志）
 *     @EVENTTRAIN NORMAL（:98 起，TALENT:161 初调教 / 助手对话 / K1_KOJO2）
 *     @EVENTEND NORMAL（:869 起，结束台词）
 *     @K1_KOJO2（:648，助手缺失时的二回目以降入口）
 *     @KOJO_MESSAGE_COM_1（:980；七道跳过判定 :982-1005——顺序与 K3/K5 不同，
 *     TALENT:9 在 TEQUIP:89 之前，助手调教不跳过；SELECTCOM 全部分支）
 *     @DOG_KOJO_1 / @COLOSSEUM_KOJO_1 / @KOJO_MESSAGE_PALAMCNG_1 /
 *     @KOJO_MESSAGE_MARKCNG_1 / @SELF_KOJO_K1 以及迷宫/处刑/奖惩/语尾入口
 *
 * == 状态机（CFLAG:301～400，个位数推进） ==
 *
 * 与 K5 同构：初回 → 1；二回目以降按素质/刻印取首个命中，FLAG:7 == 2（默认）
 * 时上限被旁路、同支每次出声；FLAG:7 == 1 时逐阶段各出一次声。
 *
 * 这张票存根（docs/stub-registry.md）：SELL_MATURO_K0（出售成熟奴隶口上）。
 */

/* eslint-disable no-irregular-whitespace -- 台词含源 ERB 全角空格（U+3000），1:1 保真 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  dog_kojo_family,
  colosseum_kojo_family,
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
  gohoubi_after_koujo_family,
  osioski_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
const { get_look_info } = require('#/kojo/kojo-dungeon-bitch-log');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { piercing_state } = require('#/system/train/piercing-state');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

const STUBBED_CALLS = ['SELL_MATURO_K0'];
const MASTER = 0;

// @EVENTTRAIN // :84
on(
  'EVENTTRAIN',
  () => {
    // #PRI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :84-85
    // FLAG:101  = 1（变量语义：FLAG 族，101） // :86
    game.kojo.口上存在_1 = 1; // :86
    if (game.kojo.口上开关 === 0) {
      // :88
      // FLAG:7  = 2（变量语义：FLAG 族，7） // :88
      game.kojo.口上开关 = 2; // :88
    } // :88
  },
  TIER.PRI,
);

// @EVENTEND // :90
on(
  'EVENTEND',
  () => {
    // #LATER（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :90-91
    // FLAG:101  = 0（变量语义：FLAG 族，101） // :92
    game.kojo.口上存在_1 = 0; // :92
  },
  TIER.LATER,
);

// @EVENTTRAIN // :98
on(
  'EVENTTRAIN',
  async (rand) => {
    const target = era_flag.target;
    const assi = era_flag.assi;
    const target_name = chara_callname(target);
    const assi_name = chara_callname(assi);
    const master_name = chara_name(MASTER);
    const sc = () => self_call(target);
    const scf = () => self_call_first(target);

    if (game.kojo.口上开关 <= 0) {
      // :99-100
      return 0; // :99-100
    } // :99-100
    if (era.get(`talent:${target}:161`) !== 1) {
      // :101-102
      return 0; // :101-102
    } // :101-102

    if (chara(target).kojo.初调教 === 0) {
      // :107
      era.drawLine(); // :107-108

      if (era.get(`talent:${target}:314`) === 1) {
        // :110
        await era.printAndWait(`「这、这种事情你居然对${sc()}做的出来…！？」`); // :111
        await era.printAndWait(`${target_name}靠着最后的勇气硬挺的瞪着你。`); // :112
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :113
        chara(target).kojo.初调教 = 1; // :113
      } else if (era.get(`talent:${target}:314`) === 2) {
        // :115
        await era.printAndWait(`「满月的时候我们走着瞧！」`); // :116
        await era.printAndWait(`${target_name}用野兽一样的眼睛瞪着你`); // :117
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :118
        chara(target).kojo.初调教 = 1; // :118
      } else if (era.get(`talent:${target}:314`) === 3) {
        // :120
        await era.printAndWait(
          `「高贵的血族${sc()}是不会臣服于你的调教之下的…」`,
        ); // :121
        await era.printAndWait(`「你这是在玩火自焚」`); // :122
        await era.printAndWait(
          `身为一个血族、${target_name}用他的尊严做的保证………`,
        ); // :123
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :124
        chara(target).kojo.初调教 = 1; // :124
      } else if (era.get(`talent:${target}:314`) === 4) {
        // :126
        await era.printAndWait(`「呼......这就是传说中的调教室么…」`); // :127
        await era.printAndWait(
          `「那么尊敬的魔王大人你难道对${sc()}没什么想法么？」`,
        ); // :128
        await era.printAndWait(
          `无头骑士${target_name}用最后的倔强硬挺着胸膛………`,
        ); // :129
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :130
        chara(target).kojo.初调教 = 1; // :130
      } else if (era.get(`talent:${target}:314`) === 5) {
        // :132
        await era.printAndWait(`「真是有趣、身体无法自由移动了么？…」`); // :133
        await era.printAndWait(`「难道还想着让${sc()}屈服吗？魔王大人？」`); // :134
        await era.printAndWait(`这是一名龙族${target_name}根深蒂固的骄傲………`); // :135
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :136
        chara(target).kojo.初调教 = 1; // :136
      } else if (era.get(`talent:${target}:314`) === 6) {
        // :138
        await era.printAndWait(
          `「就算是你的肮脏的手碰到我${sc()}也是一种亵渎！」`,
        ); // :139
        await era.printAndWait(`「你一定会受到惩罚的！」`); // :140
        await era.printAndWait(
          `虽然已经猜到了自己之后的命运、但是${target_name}的态度还是十分强硬………`,
        ); // :141
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :142
        chara(target).kojo.初调教 = 1; // :142
      } else if (era.get(`talent:${target}:314`) === 9) {
        // :144
        await era.printAndWait(`「你这个可恶的恶魔、下地狱去吧！」`); // :145
        await era.printAndWait(`${target_name}用恶狠狠的眼神凝视着你…`); // :146
        await era.printAndWait(`这是当然的了、因为她已经是黑暗的居民-魔族了。`); // :147
        await era.printAndWait(`但是不管这个女人有多么憎恨魔族`); // :148
        await era.printAndWait(
          `她也开始感到这种必须臣服于魔族之王的意志的本能………`,
        ); // :149
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :150
        chara(target).kojo.初调教 = 1; // :150

        // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :152
        chara(target).kojo.魔族化 = 1; // :152
      } else if (era.get(`talent:${target}:314`) === 10) {
        // :154
        await era.printAndWait(`「别开玩笑了！ 这种事情…」`); // :155
        await era.printAndWait(`「至少每天也要给我5份食物吧！」`); // :156
        await era.printAndWait(
          `${target_name}应该是误解了吧、她向你提出改善待遇的要求…`,
        ); // :157
        await era.printAndWait(`这种态度如何？这种慢慢崩溃的希望…`); // :158
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :159
        chara(target).kojo.初调教 = 1; // :159
      } else if (era.get(`talent:${target}:314`) === 11) {
        // :161
        await era.printAndWait(`「想要被我心爱的斧子干掉吗？…」`); // :162
        await era.printAndWait(
          `${target_name}虽然比你的个子矮、她还是用威慑性目光看着你。`,
        ); // :163
        await era.printAndWait(`然而这种态度并不会持续太久………`); // :164
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :165
        chara(target).kojo.初调教 = 1; // :165
      } else {
        // :166-167
        await era.printAndWait(`「别开玩笑了！ 这种事情…」`); // :168
        await era.printAndWait(`${target_name}用坚强的目光注视着你`); // :169
        await era.printAndWait(`然而这种态度并不会持续太久………………`); // :170
        // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :171
        chara(target).kojo.初调教 = 1; // :171
        return 1; // :171-172
      } // :171-173
    } else if (
      chara(target).kojo.初调教 < 5 &&
      chara(target).kojo.魔族化 === 0 &&
      era.get(`talent:${target}:314`) === 9 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :177
      await era.printAndWait(
        `「身体...身体变成这样的话.....已经....回不去家了......」`,
      ); // :178
      await era.printAndWait(
        `经过反复的改造、${target_name}的身体已经完全变成魔族了。她流下了眼泪、双肩止不住的颤抖着`,
      ); // :179
      await era.printAndWait(`即使她心里悲恸万分以泪洗面、但是身为一个魔族`); // :180
      await era.printAndWait(
        `她也开始感到这种必须臣服于魔族之王的意志的本能………`,
      ); // :181

      // CFLAG:370  = 2（变量语义：CFLAG 族，370） // :183
      chara(target).kojo.魔族化 = 2; // :183
      return 1; // :183-184
    } else if (
      chara(target).kojo.初调教 >= 1 &&
      chara(target).kojo.NTR再捕获 === 1
    ) {
      // :188
      if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
        // :189
        era.drawLine(); // :189-190
        await era.printAndWait(
          `在看到那个水晶球之后${target_name}的脸色大变。`,
        ); // :191
        era.setColor('#ffccff'); // :192
        await era.printAndWait(
          `「这种事情不是真的…${sc()}的意志不是真的…${sc()}的意志不可能是真的!」`,
        ); // :193
        await era.printAndWait(
          `「是、是的...那个卑鄙的狂王用药物....所以.....所以求你了.....原谅我.....」`,
        ); // :194
        era.setColor(''); // :194-195
        await era.printAndWait(
          `${target_name}混乱的体态是因为使用了药物之类的东西还是因为${target_name}的身体贪图快感${master_name}马上就看得出来。看着${target_name}慌乱不已尝试掩盖的样子、${master_name}就嫉妒的要发疯了………`,
        ); // :196

        // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :198
        chara(target).kojo.NTR再捕获 = 0; // :198
      } else {
        // :198-199
        era.drawLine(); // :200-201
        await era.printAndWait(
          `「啊啊...又输了呢…勇者的自信心什么的已经找不回来了………」`,
        ); // :201
        await era.printAndWait(
          `「肯定又是你…侵犯侵犯竭尽全力的侵犯吧？………那样的被狂王大人………」`,
        ); // :202
        await era.printAndWait(
          `${target_name}轻蔑的笑了起来并且张开双手不再抵抗………`,
        ); // :203

        // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :205
        chara(target).kojo.NTR再捕获 = 0; // :205
      } // :205-206
      return 1; // :205-207
    } else if (
      chara(target).kojo.初调教 < 2 &&
      era.get(`mark:${target}:2`) === 1 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :212
      era.drawLine(); // :212-213
      await era.printAndWait(`「啊..那样的...」`); // :214
      await era.printAndWait(
        `${target_name}在你的面前双臂抱着身体、仿佛要保护自己………`,
      ); // :215
      await era.printAndWait(`「这...这没什么好吓人的！」`); // :216
      // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :217
      chara(target).kojo.初调教 = 2; // :217
      return 1; // :217-218
    } else if (
      chara(target).kojo.初调教 < 3 &&
      era.get(`mark:${target}:2`) === 2 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :221
      era.drawLine(); // :221-222
      await era.printAndWait(`「不一样...但是…」`); // :223
      await era.printAndWait(`${target_name}在你的面前不安的摇了摇头………`); // :224
      // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :225
      chara(target).kojo.初调教 = 3; // :225
      return 1; // :225-226
    } else if (
      chara(target).kojo.初调教 < 4 &&
      era.get(`mark:${target}:2`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :229
      era.drawLine(); // :229-230
      await era.printAndWait(`「已经没有办法回去了呢…」`); // :231
      await era.printAndWait(`${target_name}用着一种期待的眼神看着你。`); // :232
      await era.printAndWait(`「啊、魔王大人....今天真是温柔呢………」`); // :233
      // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :234
      chara(target).kojo.初调教 = 4; // :234
      return 1; // :234-235
    } else if (
      chara(target).kojo.初调教 < 5 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:314`) !== 9
    ) {
      // :238
      era.drawLine(); // :238-239
      era.setColor('#ffccff'); // :240
      await era.printAndWait(`「是的...主人…${heart(1)}」`); // :241
      era.setColor(''); // :241-242
      await era.printAndWait(
        `${target_name}眼睛里带着浓浓的春意、迫切的看着你………`,
      ); // :243
      era.setColor('#ffccff'); // :244
      await era.printAndWait(
        `「今天的主人好棒…有好多～好棒的侍奉要我来做呢...${heart(1)}」」`,
      ); // :245
      await era.printAndWait(
        `「${sc()}果然和主人一起最让人心情舒畅了…花心的话可是不行的哦」`,
      ); // :246
      era.setColor(''); // :246-247
      await era.printAndWait(
        `${target_name}为了增加和阴茎的摩擦、她紧紧抱住了你的身体。`,
      ); // :248
      era.setColor('#ffccff'); // :249
      await era.printAndWait(
        `「啊…要让我说感觉的话…${sc()}因为主人最能让我快乐了${heart(3)}」`,
      ); // :250
      era.setColor(''); // :250-251
      await era.printAndWait(
        `用甜美的声音献媚、${target_name}的脑中满是令人愉悦的事情………`,
      ); // :252
      // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :253
      chara(target).kojo.初调教 = 5; // :253
      return 1; // :253-254
    } else if (
      era.get(`talent:${target}:314`) === 9 &&
      chara(target).kojo.初调教 < 6 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 1
    ) {
      // :257
      era.drawLine(); // :257-258

      if (chara(target).kojo.魔族化 === 1) {
        // :260
        era.setColor('#ffccff'); // :261
        await era.printAndWait(`「是的...主人…${heart(1)}」`); // :262
        era.setColor(''); // :262-263
        await era.printAndWait(
          `${target_name}是以前完全无法想象的发情的目光………`,
        ); // :264
        era.setColor('#ffccff'); // :265
        await era.printAndWait(
          `「已经…完全忍不下去了…子宫已经习惯了这种美妙的感觉了啊…好想要、好想要主人的精液啊………${heart(1)}」`,
        ); // :266
        if (era.get(`talent:${target}:0`) === 1) {
          // :268
          era.setColor('#ffccff'); // :268
        } // :268
        await era.printAndWait(
          `「处女...处女膜已经早就交给主人了呢…${heart(1)} 这是主人专用的阴道、请用吧${heart(1)}」`,
        ); // :269
        era.setColor(''); // :269-270
        if (era.get(`talent:${target}:0`) === 1) {
          // :272
          await era.printAndWait(
            `${target_name}用双手张开了沾满爱液的阴唇给${master_name}看。`,
          ); // :272
        } // :272
        era.setColor('#ffccff'); // :273
        await era.printAndWait(
          `「啊啊..这具身体要为主人提供服务了呢…${heart(1)}」`,
        ); // :274
        await era.printAndWait(
          `「全力在侍奉啊…${heart(1)} 满满的...好开心…${heart(1)}」`,
        ); // :275
        era.setColor(''); // :275-276
        await era.printAndWait(
          `脸上带着能融化一切的笑容${target_name}紧紧地抱住了${master_name}。`,
        ); // :277
        era.setColor('#ffccff'); // :278
        await era.printAndWait(`「这种色情的身体习惯…非常幸福呢…${heart(1)}」`); // :279
        era.setColor(''); // :279-280
        await era.printAndWait(
          `${target_name}反复调教的结果体现出来了、她完全被情欲支配了`,
        ); // :281
        await era.printAndWait(`调教前的魔族改造向好的方向发展了呢………`); // :282
        era.setColor(''); // :282-283
        // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :284
        chara(target).kojo.初调教 = 6; // :284
        return 1; // :284-285
      } else if (chara(target).kojo.魔族化 === 2) {
        // :287
        era.setColor('#ffccff'); // :288
        await era.printAndWait(`「是的..主人尽管…${heart(1)}」`); // :289
        era.setColor(''); // :289-290
        await era.printAndWait(
          `但是她的样子很奇怪${target_name}用着发情的目光看着${master_name}………`,
        ); // :291
        era.setColor('#ffccff'); // :292
        await era.printAndWait(
          `「想要主人的精液…${heart(1)} 好想要的说…${heart(1)}」`,
        ); // :293
        era.setColor(''); // :293-294
        if (era.get(`talent:${target}:0`) === 1) {
          // :296
          era.setColor('#ffccff'); // :296
        } // :296
        await era.printAndWait(
          `「阴道想要精液…${heart(1)} 这是主人专用的阴道请插进来吧${heart(1)}」`,
        ); // :297
        era.setColor(''); // :297-298
        if (era.get(`talent:${target}:0`) === 1) {
          // :300
          await era.printAndWait(
            `${target_name}用双手张开了沾满爱液的阴唇给${master_name}看。`,
          ); // :300
        } // :300
        era.setColor('#ffccff'); // :301
        await era.printAndWait(
          `「终于...终于明白了的说…${sc()}的身体…似乎想侍奉您呢…${heart(1)}」`,
        ); // :302
        await era.printAndWait(
          `「那样的主人永远不会腻呢…满满的…真是满满的侍奉啊…希望可以把我灌满的色色的东西啊${heart(1)}」`,
        ); // :303
        era.setColor(''); // :303-304
        await era.printAndWait(
          `脸上带着能融化一切的笑容${target_name}张开双臂紧紧搂住${master_name}。`,
        ); // :305
        era.setColor('#ffccff'); // :306
        await era.printAndWait(`「能够变成魔族…真的是太好了呢…${heart(1)}」」`); // :307
        era.setColor(''); // :307-308
        await era.printAndWait(
          `${target_name}反复调教的结果体现出来了、她完全被情欲支配了。`,
        ); // :309
        await era.printAndWait(`魔化改造向好的方向发展了呢………`); // :310
        // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :311
        chara(target).kojo.初调教 = 6; // :311
        return 1; // :311-312
      } else {
        // :313-314
        era.setColor('#ffccff'); // :315
        await era.printAndWait(`「主人${heart(1)} 真的谢谢你呢${heart(1)}」`); // :316
        era.setColor(''); // :316-317
        await era.printAndWait(
          `一进入房间、${target_name}就欢呼着跳上了后背…看来她一直在门口等着你的到来………`,
        ); // :318
        era.setColor('#ffccff'); // :319
        await era.printAndWait(
          `「因为成为魔族…就能一直...一直…对主人进行满满的侍奉了呢${heart(1)}」`,
        ); // :320
        await era.printAndWait(
          `「呵呵...${heart(1)} 谢谢主人${heart(1)}…谢谢${heart(1)}」`,
        ); // :321
        await era.printAndWait(
          `「魔族的胸部..魔族的阴道...魔族的肛门…全都是用来侍奉主人的东西呢${heart(1)}」`,
        ); // :322
        await era.printAndWait(
          `「快点...快点…抱着我啊…已经…已经忍不住了…一起来做爱做的事情吧！${heart(1)}」`,
        ); // :323
        era.setColor(''); // :323-324
        await era.printAndWait(
          `${target_name}对于自己的兴奋的感情已经完全控制不住了、两只魔眼更是绽放着光芒………`,
        ); // :325
        // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :326
        chara(target).kojo.初调教 = 6; // :326
        return 1; // :326-327
      } // :326-328
    } else if (
      chara(target).kojo.初调教 < 7 &&
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:314`) !== 9
    ) {
      // :331
      era.drawLine(); // :331-332
      era.setColor('#ffccff'); // :333
      await era.printAndWait(`「啊…是您啊…主人…」`); // :334
      era.setColor(''); // :334-335
      await era.printAndWait(`${target_name}和原来的样子有点不太一样………`); // :336
      era.setColor('#ffccff'); // :337
      await era.printAndWait(`「${scf()}、${sc()}请听我说…！」`); // :338
      era.setColor(''); // :338-339
      await era.printAndWait(
        `${target_name}仿佛像对待恋人一样随意的抱住了你………`,
      ); // :340
      era.setColor('#ffccff'); // :341
      await era.printAndWait(
        `「那个…${sc()}…主人的话…真的好喜欢…我爱你！………」`,
      ); // :342
      await era.printAndWait(`「对${sc()}的爱慕、并不是什么假话…」`); // :343
      era.setColor(''); // :343-344
      await era.printAndWait(
        `${target_name}为了更好地抱住你、她撒娇一样的把脸颊紧贴着你………`,
      ); // :345
      // CFLAG:201  = 7（变量语义：CFLAG 族，201） // :346
      chara(target).kojo.初调教 = 7; // :346
      return 1; // :346-347
    } else if (
      era.get(`talent:${target}:314`) === 9 &&
      chara(target).kojo.初调教 < 8 &&
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :350
      era.drawLine(); // :350-351

      if (chara(target).kojo.魔族化 === 1) {
        // :353
        era.setColor('#ffccff'); // :354
        await era.printAndWait(
          `「这样…居然会有这样的感觉…那么…讨厌这样吗………真的讨厌这样吗？」`,
        ); // :355
        era.setColor(''); // :355-356
        await era.printAndWait(`${target_name}和平时的样子有些不同。`); // :357
        await era.printAndWait(
          `注意到了${master_name}的到来、好像坚定了什么决心、开口了。`,
        ); // :358
        era.setColor('#ffccff'); // :359
        await era.printAndWait(
          `「${scf()}、${sc()}…那、那个…主人…对你的话…好、好像喜欢上了呢………」`,
        ); // :360
        era.setColor(''); // :360-361
        await era.printAndWait(
          `${target_name}说出的那句话连她自己都感觉吃惊………`,
        ); // :362
        era.setColor('#ffccff'); // :363
        await era.printAndWait(`「啊…啊…啊啊啊、真的真的很喜欢…很爱你！」`); // :364
        await era.printAndWait(
          `「能一直呆在你脚下…就算只是一只宠物…那也好啊………」`,
        ); // :365
        era.setColor(''); // :365-366
        await era.printAndWait(
          `${target_name}满溢的感情已经按捺不住了、泪水夺眶而出。`,
        ); // :367
        await era.printAndWait(
          `因为多次的调教和魔族的本能、${target_name}深爱着${master_name}………`,
        ); // :368
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :369
        chara(target).kojo.初调教 = 8; // :369
        era.setColor(''); // :369-370
        return 1; // :371-372
      } else if (chara(target).kojo.魔族化 === 2) {
        // :373
        era.setColor('#ffccff'); // :374
        await era.printAndWait(`「没有办法回到故乡也好…好不容易放弃了………」`); // :375
        era.setColor(''); // :375-376
        await era.printAndWait(`${target_name}的样子和以前不太一样。`); // :377
        await era.printAndWait(
          `注意到了${master_name}的到来、好像坚定了什么决心、开口了。`,
        ); // :378
        era.setColor('#ffccff'); // :379
        await era.printAndWait(
          `「终于明白了${sc()}的归宿是哪里…那就是…这里啊………」`,
        ); // :380
        era.setColor(''); // :380-381
        await era.printAndWait(
          `${target_name}走近${master_name}、充满爱意的把手放在了胸膛上。`,
        ); // :382
        await era.printAndWait(`手不断地颤抖着、可以看出来她下了多大的决心。`); // :383
        await era.printAndWait(
          `要是真的话真想立刻抱抱这个女孩啊、她忍住了抱上来的冲动、自说自话道………`,
        ); // :384
        era.setColor('#ffccff'); // :385
        await era.printAndWait(
          `「现在的主人…是${sc()}活下去的动力…${heart(1)}」`,
        ); // :386
        await era.printAndWait(
          `「最喜欢的主人…满足的侍奉、所以离不开了呢…对吧…？」`,
        ); // :387
        era.setColor(''); // :387-388
        await era.printAndWait(
          `因为多次的调教和魔族的本能、${target_name}深爱着${master_name}………`,
        ); // :389
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :390
        chara(target).kojo.初调教 = 8; // :390
        era.setColor(''); // :390-391
        return 1; // :392-393
      } else {
        // :393-394
        era.setColor('#ffccff'); // :395
        await era.printAndWait(
          `「啊啊啊…${sc()}…真的变成魔族了…已经回不了头了啊…${heart(1)}」`,
        ); // :396
        era.setColor(''); // :396-397
        await era.printAndWait(`${target_name}高兴的连眼泪都流了出来………`); // :398
        era.setColor('#ffccff'); // :399
        await era.printAndWait(`「不过这样一来…${sc()}我永远离不开了………」`); // :400
        era.setColor(''); // :400-401
        await era.printAndWait(`${target_name}只是羞涩的笑了一下、就抱住了………`); // :402
        era.setColor('#ffccff'); // :403
        await era.printAndWait(`「哼哼、一定要更努力呢…亲爱的…${heart(1)}」`); // :404
        era.setColor(''); // :404-405
        // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :406
        chara(target).kojo.初调教 = 8; // :406
        era.setColor(''); // :406-407
        return 1; // :406-408
      } // :409-411
    } else if (
      era.get(`talent:${target}:9`) === 1 &&
      chara(target).kojo.初调教 < 9
    ) {
      // :412
      era.drawLine(); // :412-413
      await era.printAndWait(
        `${target_name}露出了一种奇怪的表情自言自语着该如何是好。`,
      ); // :414
      await era.printAndWait(
        `看到${master_name}来了、整张脸都僵住了、小便无法抑制的往外流。`,
      ); // :415
      await era.printAndWait(`${target_name}崩溃的精神应该是无法复原了吧………`); // :416
      // CFLAG:201  = 9（变量语义：CFLAG 族，201） // :417
      chara(target).kojo.初调教 = 9; // :417
      return 1; // :417-418
    } else if (era_flag.assi < 0) {
      // :421
      await k1_kojo2(rand); // CALL K1_KOJO2 // :422
    } else if ((era.get(`no:${assi}`) || assi) === 17) {
      // :431

      era.drawLine(); // :432-433
      if (era.get(`talent:${assi}:165`)) {
        // :434

        if (chara(target).kojo.简易助手_0 === 0) {
          // :436

          if (era.get(`talent:${target}:9`) === 1) {
            // :438
            await era.printAndWait(`『…主人、这个人坏掉了...』`); // :439
          } else if (
            era.get(`talent:${target}:76`) === 1 &&
            chara(target).kojo.初调教 >= 5
          ) {
            // :441
            era.setColor('#ffccff'); // :442
            await era.printAndWait(
              `「诶…今天是主人和另外一个人一起来调教吗？」`,
            ); // :443
            era.setColor(''); // :443-444
            await era.printAndWait(
              `${target_name}对着第一次见到的少女舔着嘴唇。作为助手${master_name}简单介绍了一下${assi_name}。`,
            ); // :445
            era.setColor('#ffccff'); // :446
            await era.printAndWait(`「哈哈…就是那个孩子来调教${sc()}吗？」`); // :447
            era.setColor(''); // :447-448
            await era.printAndWait(
              `她笑出了声来、${assi_name}有一点生气、皱起了眉头。`,
            ); // :449
            await era.printAndWait(
              `『虽然腿脚都被固定住无法站立、但是还是让我告诉你谁在上面吧、原勇者姐姐。${heart(1)}』`,
            ); // :450
            if (era.get(`talent:${assi}:76`) === 1) {
              // :452
              await era.printAndWait(
                `兴奋不已的${assi_name}开始摩擦双腿。这样就可以了吧${master_name}按住了她的头………`,
              ); // :452
            } // :452
          } else if (
            era.get(`talent:${target}:85`) === 1 &&
            chara(target).kojo.初调教 >= 7
          ) {
            // :454
            await era.printAndWait(
              `${target_name}看到${master_name}带来的少女不由得大声呵斥起来。`,
            ); // :455
            era.setColor('#ffccff'); // :456
            await era.printAndWait(`「啊…啊…这个孩子…啊！」`); // :457
            era.setColor(''); // :457-458
            await era.printAndWait(
              `${target_name}斜睨着、仿佛稍微许可了。看着这种态度${assi_name}不满的上前一步。`,
            ); // :459
            await era.printAndWait(
              `『说什么呢我的姐姐、我们还都是主人的奴隶啊…这有什么值得自豪的么…？』`,
            ); // :460
            era.setColor('#ffccff'); // :461
            await era.printAndWait(
              `「嘛、虽说是奴隶…可是你这样的孩子…那一位…那个………」`,
            ); // :462
            era.setColor(''); // :462-463
            await era.printAndWait(
              `好像想起了自己”奴隶”的立场、${target_name}不再说什么了。`,
            ); // :464
            await era.printAndWait(`『啊…这样啊…姐姐你嫉妒了呢…』`); // :465

            if (era.get(`talent:${assi}:85`) === 1) {
              // :467
              await era.printAndWait(
                `『姐姐应该也深爱着主人吧…那样的话、就和我一起侍奉主人吧${heart(1)}』`,
              ); // :468
              await era.printAndWait(
                `${assi_name}说着、舔着嘴唇压倒了${target_name}。`,
              ); // :469
              era.setColor('#ffccff'); // :470
              await era.printAndWait(`「啊、这样的…不要…住手啊………」`); // :471
              era.setColor(''); // :471-472
              await era.printAndWait(
                `『我可爱的姐姐啊…好啊、我会好好的调教你、但是在主人面前我们还是公平竞争吧。${heart(1)}』`,
              ); // :473
            } else {
              // :474-475
              era.setColor('#ffccff'); // :476
              await era.printAndWait(
                `「那样的…${scf()}、${sc()}并不是…那样的…嫉妒什么的………！」`,
              ); // :477
              era.setColor(''); // :477-478
              await era.printAndWait(
                `『我可爱的姐姐啊…好啊、我会好好的调教你、但是在主人面前我们还是公平竞争吧。${heart(1)}』`,
              ); // :479
              await era.printAndWait(
                `${assi_name}这么说着然后用舌头舔着嘴唇推到了${target_name}………`,
              ); // :480
            } // :480-481
          } else {
            // :482-483
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            ); // :484
            era.setColor('#ffccff'); // :485
            await era.printAndWait(
              `「啊…这个孩子难道说来自附近的村庄………她姐姐哭着求我”请帮我找一下、我求你了”！」`,
            ); // :486
            era.setColor(''); // :486-487
            await era.printAndWait(`『这样啊…我姐姐的事早忘记了呢…』`); // :488
            await era.printAndWait(
              `${assi_name}稍微抬起头不胜感慨的自言自语道。`,
            ); // :489
            await era.printAndWait(
              `『但是我…已经不想回去了啊。而且今天我是作为主人的助手来调教”原”勇者大人的呢。』`,
            ); // :490
            await era.printAndWait(
              `${assi_name}掐着${target_name}的乳房尽情扭起来。`,
            ); // :491
            era.setColor('#ffccff'); // :492
            await era.printAndWait(`「呃…呃…呃…啊啊啊啊！」`); // :493
            era.setColor(''); // :493-494
            await era.printAndWait(
              `一边看着${target_name}痛苦的悲鸣${assi_name}翘起了嘴角。`,
            ); // :495
            await era.printAndWait(
              `看着今天有趣的调教${master_name}露出了笑容………`,
            ); // :496
          } // :496-497
          // CFLAG:202  = 1（变量语义：CFLAG 族，202） // :498
          chara(target).kojo.简易助手_0 = 1; // :498
          return 1; // :498-499
        } else if (
          chara(target).kojo.简易助手_0 === 1 &&
          game.kojo.口上开关 === 2
        ) {
          // :501

          if (era.get(`talent:${target}:9`) === 1) {
            // :503
            await era.printAndWait(
              `『主人、这个坏了的玩具无法复原的话真的好吗？』`,
            ); // :504
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :506
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            ); // :507
            era.setColor('#ffccff'); // :508
            await era.printAndWait(`「啊啊啊…还…带着这个孩子过来了啊………」`); // :509
            era.setColor(''); // :509-510
            await era.printAndWait(`${target_name}想着闭上了眼睛。`); // :511
            await era.printAndWait(
              `『不要移开双眼啊…我可是很喜欢我可爱的姐姐的说${heart(1)}』`,
            ); // :512
            era.setColor('#ffccff'); // :513
            await era.printAndWait(`「啊啊啊…！是不行的哦…停、快停下………」`); // :514
            era.setColor(''); // :514-515
            await era.printAndWait(
              `${target_name}在${master_name}的眼前被少女捉弄………`,
            ); // :516

            if (era.get(`abl:${target}:17`) >= 3) {
              // :518
              await era.printAndWait(
                `『你看姐姐、亲爱的主人似乎特别想让我们展示讨厌的地方呢？』`,
              ); // :519
              await era.printAndWait(
                `${assi_name}在${target_name}的耳边低声说道。`,
              ); // :520
              await era.printAndWait(
                `${target_name}一边红着脸坐在地上双腿像M字一样打开一边挺着腰诱惑${master_name}。`,
              ); // :521
              era.setColor('#ffccff'); // :522
              await era.printAndWait(
                `「啊啊啊…看啊…主人啊…${sc()}的小穴…只是被主人看到就变得黏糊糊的了啊………」`,
              ); // :523
              era.setColor(''); // :523-524
              await era.printAndWait(
                `『哈哈、姐姐很可爱哟…棒极了${heart(1)}』`,
              ); // :525
            } else if (era.get(`abl:${target}:17`) >= 1) {
              // :527
              await era.printAndWait(
                `『你看姐姐、好像展示给主人讨厌的地方了呢${heart(1)}』`,
              ); // :528
              await era.printAndWait(
                `${assi_name}从后面抱住${target_name}、把她的胸从下面抬了起来展示给${master_name}。`,
              ); // :529
              era.setColor('#ffccff'); // :530
              await era.printAndWait(
                `「啊啊啊…啊啊啊啊啊啊啊啊…被看到喽…被主人看到喽………${heart(1)}」`,
              ); // :531
              era.setColor(''); // :531-532
              await era.printAndWait(`『哈、姐姐很可爱哟…${heart(1)}』`); // :533
            } else {
              // :533-534
              await era.printAndWait(
                `『你看姐姐、好像展示给主人讨厌的地方了呢${heart(1)}』`,
              ); // :535
              await era.printAndWait(
                `${assi_name}从后面抱住把双腿拉开了、采取了展现给${master_name}的姿势。`,
              ); // :536
              era.setColor('#ffccff'); // :537
              await era.printAndWait(`「啊啊啊…不行啦…快停下吧！」`); // :538
              era.setColor(''); // :538-539
              await era.printAndWait(`『嗯、还需要更多的调教么？』`); // :540
            } // :540-541
          } else if (era.get(`talent:${target}:76`) === 1) {
            // :543
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            ); // :544
            era.setColor('#ffccff'); // :545
            await era.printAndWait(
              `「哈…今天也来了呢${assi_name}酱${heart(1)}」`,
            ); // :546
            era.setColor(''); // :546-547
            await era.printAndWait(
              `${target_name}一边咬着嘴唇一边淫乱的弯起了嘴角。`,
            ); // :548
            if (era.get(`talent:${assi}:76`) === 1) {
              // :550
              await era.printAndWait(
                `『嗯、今天也要”玩”哟…要做到爽够了为止呦${heart(1)}』`,
              ); // :550
            } // :550
            era.setColor('#ffccff'); // :551
            await era.printAndWait(
              `「啊啊…来啊…来啊…${assi_name}尽管来吧…${heart(1)}」`,
            ); // :552
            era.setColor(''); // :552-553
            await era.printAndWait(
              `看到少女的${target_name}热情的张开双手求欢、${master_name}对从现在开始的表演兴奋不已………`,
            ); // :554
          } else {
            // :555-556
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            ); // :557
            era.setColor('#ffccff'); // :558
            await era.printAndWait(
              `「还把那孩子带过来什么的…啊、真是不知羞耻！」`,
            ); // :559
            era.setColor(''); // :559-560
            await era.printAndWait(
              `少女的面前、不想破坏强硬姿态的${target_name}看着${master_name}微微地笑了笑。`,
            ); // :561
            await era.printAndWait(`『哎～…很期待和我见面吗？』`); // :562
            await era.printAndWait(
              `${assi_name}露出了好色的笑容把脸贴近了${target_name}的面前。`,
            ); // :563
            era.setColor('#ffccff'); // :564
            await era.printAndWait(`「那、那种事怎么可能………」`); // :565
            era.setColor(''); // :565-566

            if (era.get(`abl:${target}:33`) >= 3) {
              // :568
              await era.printAndWait(
                `${target_name}一边说着一边双眼湿润露出眼馋的样子。`,
              ); // :569
              await era.printAndWait(
                `『啊哈哈…这种表情的勇者大人啊${heart(1)} 好哟我会让你好好满足的！』`,
              ); // :570
              await era.printAndWait(
                `少女被${target_name}推到同时露出高兴的叹息………`,
              ); // :571
            } else if (era.get(`abl:${target}:22`) >= 1) {
              // :573
              await era.printAndWait(
                `${target_name}一边说着一边扭扭捏捏的情不自禁把视线放到了两脚上。`,
              ); // :574
              await era.printAndWait(`『勇者大人真不老实啊…』`); // :575
              await era.printAndWait(
                `少女被动地被${target_name}推到露出了羞耻的声音………`,
              ); // :576
            } else {
              // :576-577
              await era.printAndWait(
                `${target_name}开始拼命想移开看向${assi_name}的视线。`,
              ); // :578
              await era.printAndWait(`『算了吧、马上就好了啊${heart(1)}』`); // :579
              await era.printAndWait(
                `少女被${target_name}推到后咬紧嘴唇忍耐着………`,
              ); // :580
            } // :580-581
          } // :580-582
          return 1; // :583-585
        } // :584-585
      } else {
        // :585-586
        await k1_kojo2(rand); // CALL K1_KOJO2 // :587
      } // :587-588
    } else {
      // :639-640
      await k1_kojo2(rand); // CALL K1_KOJO2 // :641
    } // :641-642
  },
  TIER.NORMAL,
);

// @K1_KOJO2 // :648
async function k1_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    // :650
    era.drawLine(); // :650-651
    await era.printAndWait(`「咿…咿咿…不要…咿啊咿…咿！」`); // :652
    await era.printAndWait(
      `不能指望精神崩溃的${target_name}做出什么正常的反应吧………`,
    ); // :653
    return 1; // :653-654
  } else if (era.get(`mark:${target}:3`) === 3 && game.kojo.口上开关 === 2) {
    // :657
    era.drawLine(); // :657-658
    await era.printAndWait(`「绝对…会杀了你」`); // :659
    await era.printAndWait(`${target_name}的眼睛里充满了杀意………`); // :660
    return 1; // :660-661
  } else if (
    era.get(`mark:${target}:2`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    // :664
    era.drawLine(); // :664-665
    if (era.get(`talent:${target}:11`)) {
      // :666

      await era.printAndWait(`「…差劲！　别再过来了！」`); // :668
      await era.printAndWait(`${target_name}毅然决然地瞪着你………`); // :669
    } else if (era.get(`talent:${target}:13`)) {
      // :670

      await era.printAndWait(`「啧…又来了啊…」`); // :672
      await era.printAndWait(`${target_name}露着碰见麻烦事的表情和你对峙着………`); // :673
    } else {
      // :673-674
      await era.printAndWait(`「哼、没用的…」`); // :675
      await era.printAndWait(`${target_name}一副毅然的姿态和你对峙着………`); // :676
    } // :676-677
    return 1; // :676-678
  } else if (
    era.get(`mark:${target}:2`) === 1 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    // :681
    era.drawLine(); // :681-682
    if (era.get(`talent:${target}:11`)) {
      // :683

      await era.printAndWait(`「…别开玩笑了！　想做这种事到什么时候…」`); // :685
      await era.printAndWait(
        `和话语不同的是${target_name}的视线从你身上移开了………`,
      ); // :686
    } else if (era.get(`talent:${target}:13`)) {
      // :687

      await era.printAndWait(`「差不多点啊…也该、知难而退了吧？」`); // :689
      await era.printAndWait(`${target_name}错乱的气息让身体略显僵硬`); // :690
      await era.printAndWait(`而后双脚颤抖着、脚步也变得不稳了………`); // :691
    } else {
      // :691-692
      await era.printAndWait(`「老是这样啊…差不多了就好了啊」`); // :693
      await era.printAndWait(`${target_name}看着你的眼睛如此嘟囔着………`); // :694
    } // :694-695
    return 1; // :694-696
  } else if (
    era.get(`mark:${target}:2`) === 2 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    // :699
    era.drawLine(); // :699-700
    await era.printAndWait(`「…我明白了。这样做就好了吧」`); // :701
    await era.printAndWait(`${target_name}放弃了似的把身体全暴露在你眼前………`); // :702
    return 1; // :702-703
  } else if (
    era.get(`mark:${target}:2`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    // :706
    era.drawLine(); // :706-707
    await era.printAndWait(`「我知道了…主人…」`); // :708
    if (era.get(`talent:${target}:77`) === 1) {
      // :710
      await era.printAndWait(
        `「${scf()}、${sc()}的…不检点的淫乱肛门…喜欢…你、你侵犯………」`,
      ); // :710
    } // :710
    switch (
      era.get(`talent:${target}:300`) // :711
    ) {
      case 1: {
        // :712
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的金色的发梢………`,
        ); // :713
        break; // :714
      } // :714
      case 2: {
        // :714
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的栗色的发梢………`,
        ); // :715
        break; // :716
      } // :716
      case 3: {
        // :716
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的黑色的发梢………`,
        ); // :717
        break; // :718
      } // :718
      case 4: {
        // :718
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的赤色的发梢………`,
        ); // :719
        break; // :720
      } // :720
      case 5: {
        // :720
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的银色的发梢………`,
        ); // :721
        break; // :722
      } // :722
      case 6: {
        // :722
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的青色的发梢………`,
        ); // :723
        break; // :724
      } // :724
      case 7: {
        // :724
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的绿色的发梢………`,
        ); // :725
        break; // :726
      } // :726
    } // :726
    return 1; // :726-727
  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {
    // :730
    era.drawLine(); // :730-731

    if (era.get(`talent:${target}:314`) === 9) {
      // :733

      if (rand_n(3) === 0) {
        // :735
        era.setColor('#ffccff'); // :736
        await era.printAndWait(`「哈${heart(1)} 主人啊…你来了啊…${heart(1)}」`); // :737
        era.setColor(''); // :737-738
        await era.printAndWait(`${target_name}的眼神闪烁着兴奋的光辉………`); // :739
        era.setColor('#ffccff'); // :740
        await era.printAndWait(
          `「侍奉${heart(1)}侍奉${heart(1)}…好好的侍奉主人的身体${heart(1)}」`,
        ); // :741
        if (era.get(`talent:${target}:77`) === 1) {
          // :743
          era.setColor('#ffccff'); // :743
        } // :743
        await era.printAndWait(
          `「喂${heart(1)}…快点…享受${sc()}淫乱的魔族肛门满满的侍奉吧${heart(1)}」`,
        ); // :744
        era.setColor(''); // :744-745
        era.setColor(''); // :746-747
      } else if (rand_n(2) === 0) {
        // :747
        era.setColor('#ffccff'); // :748
        await era.printAndWait(`「喂喂、主人…${heart(1)}」`); // :749
        era.setColor(''); // :749-750
        await era.printAndWait(
          `${target_name}满意的用翅膀呼呼的漂浮在房间里等着你………`,
        ); // :751
        era.setColor('#ffccff'); // :752
        await era.printAndWait(
          `「就这样在空中做爱可以么？ 非常的舒服吧………哎、因为很累不喜欢？ 哎呦…真是可惜」`,
        ); // :753
        era.setColor(''); // :753-754
      } else {
        // :755-756
        era.setColor('#ffccff'); // :756
        await era.printAndWait(
          `「啊、主人啊${heart(1)} 让我好好的侍奉你吧${heart(1)}」`,
        ); // :757
        era.setColor(''); // :757-758
        await era.printAndWait(
          `${target_name}像狗一样伸长舌头舔着你的脸旋转………`,
        ); // :759
        era.setColor('#ffccff'); // :760
        await era.printAndWait(
          `「呼…这种味道啊…主人也发情了啊${heart(1)} 侍奉有意义了啊${heart(1)}」`,
        ); // :761
        era.setColor(''); // :761-762
      } // :763-764
    } else {
      // :764-765

      if (rand_n(3) === 0) {
        // :767
        era.setColor('#ffccff'); // :768
        await era.printAndWait(`「主人啊…让我更多的侍奉你吧…${heart(1)}」`); // :769
        era.setColor(''); // :769-770
        await era.printAndWait(`${target_name}抱着你用娇滴滴的声音轻轻说道………`); // :771
        era.setColor('#ffccff'); // :772
        await era.printAndWait(
          `「嘴巴…乳房…任何地方都可以侍奉主人哦${heart(1)}」`,
        ); // :773
        if (era.get(`talent:${target}:77`) === 1) {
          // :775
          era.setColor('#ffccff'); // :775
        } // :775
        await era.printAndWait(
          `「啊哈啊${heart(1)}…特别是${sc()}淫乱的肛门…很舒服的说${heart(1)}」`,
        ); // :776
        era.setColor(''); // :776-777
        era.setColor(''); // :778-779
      } else if (rand_n(2) === 0) {
        // :779
        era.setColor('#ffccff'); // :780
        await era.printAndWait(`「啊啊啊…太好了…今天主人来了呢…${heart(1)}」`); // :781
        era.setColor(''); // :781-782
        await era.printAndWait(
          `${target_name}在确认你来了的一瞬间就跑了过来。`,
        ); // :783
        await era.printAndWait(
          `好像发情那样…可以看见躺在床上自慰弄出来的污渍一样的东西………`,
        ); // :784
        era.setColor('#ffccff'); // :785
        await era.printAndWait(
          `「哈${heart(1)}…请摸${sc()}的这里哦…随时都准备着被你玩弄呢…」`,
        ); // :786
        era.setColor(''); // :786-787
      } else {
        // :788-789
        era.setColor('#ffccff'); // :789
        await era.printAndWait(
          `「咿嗼…真的主人${sc()}没有你性欲就消不下去呢…${heart(1)}」`,
        ); // :790
        era.setColor(''); // :790-791
        await era.printAndWait(`${target_name}高兴的说、一副随你玩弄的样子………`); // :792
        era.setColor('#ffccff'); // :793
        await era.printAndWait(`「很多的侍奉呢${heart(1)}」`); // :794
        era.setColor(''); // :794-795
      } // :794-796
    } // :794-797
    return 1; // :798-800
  } else if (era.get(`talent:${target}:85`) === 1 && game.kojo.口上开关 === 2) {
    // :801
    era.drawLine(); // :801-802

    if (era.get(`talent:${target}:314`) === 9) {
      // :804

      if (rand_n(3) === 0) {
        // :806
        era.setColor('#ffccff'); // :807
        await era.printAndWait(`「啊…小穴…一直在等着你哟…${heart(1)}」`); // :808
        era.setColor(''); // :808-809
        await era.printAndWait(`${target_name}很害羞的不停地扭着腰………`); // :810
        era.setColor('#ffccff'); // :811
        await era.printAndWait(`「今年H的很多啦、啊？啊？」`); // :812
        era.setColor(''); // :812-813
      } else if (rand_n(2) === 0) {
        // :814
        await era.printAndWait(`${target_name}向着你夸张的飞扑过来了………`); // :815
        era.setColor('#ffccff'); // :816
        await era.printAndWait(
          `「我已经不行了…等不急了啦…身体变得热的不得了了啊♪」`,
        ); // :817
        if (era.get(`talent:${target}:77`) === 1) {
          // :819
          await era.printAndWait(
            `「啊啊啊…哎呀…只是嗅到你肛门的味道…随意玩弄我吧…${heart(1)}」`,
          ); // :819
        } // :819
        await era.printAndWait(
          `「哈…哈…嗯、已经不行了…忍不住了………${heart(1)}」`,
        ); // :820
        era.setColor(''); // :820-821
      } else {
        // :822-823
        era.setColor('#ffccff'); // :823
        await era.printAndWait(`「嗯…今天有好好的老实等待呢………！」`); // :824
        era.setColor(''); // :824-825
        await era.printAndWait(
          `${target_name}红着脸不停的相互摩擦着大腿根部………`,
        ); // :826
        era.setColor('#ffccff'); // :827
        await era.printAndWait(`「所以…给我更多的奖赏吧…啊？」`); // :828
        era.setColor(''); // :828-829
      } // :830-831
    } else {
      // :831-832

      if (rand_n(3) === 0) {
        // :834
        era.setColor('#ffccff'); // :835
        await era.printAndWait(`「还不是太迟。好像自慰啊」`); // :836
        era.setColor(''); // :836-837
        await era.printAndWait(
          `${target_name}半开玩笑的语气扑哧一笑把身体交给了你………`,
        ); // :838
        era.setColor('#ffccff'); // :839
        await era.printAndWait(`「更多…舒服的事吧…啊？」`); // :840
        era.setColor(''); // :840-841
      } else if (rand_n(2) === 0) {
        // :842
        era.setColor('#ffccff'); // :843
        await era.printAndWait(`「今天也要疼爱我啊、主人」`); // :844
        era.setColor(''); // :844-845
        await era.printAndWait(`${target_name}用恋人般的动作对你问道………`); // :846
        era.setColor('#ffccff'); // :847
        await era.printAndWait(`「哈…已经变大了啊…${heart(1)}」`); // :848
        era.setColor(''); // :848-849
      } else {
        // :850-851
        await era.printAndWait(`${target_name}抱住你然后撒娇道………`); // :851
        era.setColor('#ffccff'); // :852
        await era.printAndWait(`「更多、蜡啊」`); // :853
        if (era.get(`talent:${target}:77`) === 1) {
          // :855
          await era.printAndWait(
            `「${sc()}的…菊、肛门啊…啊、肛门…痛的不行啊………${heart(1)}」`,
          ); // :855
        } // :855
        await era.printAndWait(`「${sc()}已经忍不住了………♪」`); // :856
        era.setColor(''); // :856-857
      } // :856-858
      era.setColor(''); // :856-859
    } // :856-860
    return 1; // :856-861
  } // :862-866
  return 0; // :863-866
}

// @EVENTEND // :869
on(
  'EVENTEND',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target);
    const master_name = chara_name(MASTER);

    if (game.kojo.口上开关 <= 0) {
      // :870-871
      return 0; // :870-871
    } // :870-871
    if (era.get(`talent:${target}:161`) !== 1) {
      // :872-873
      return 0; // :872-873
    } // :872-873

    if (era.get(`base:${target}:0`) <= 0) {
      // :876-877
      return 0; // :876-877
    } // :876-877

    if (era.get(`talent:${target}:9`) === 1) {
      // :883
      era.drawLine(); // :883-884
      await era.printAndWait(`「嘻嘻…嘻嘻！…啊、啊…咕咭咿………」`); // :885
      await era.printAndWait(
        `${target_name}的全身被污物沾满了、${master_name}吩咐女仆打扫了房间和她的身体………`,
      ); // :886
      return 1; // :886-887
    } else if (
      era.get(`mark:${target}:3`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :890
      era.drawLine(); // :890-891
      await era.printAndWait(`「无聊」`); // :892
      return 1; // :892-893
    } else if (
      era.get(`mark:${target}:2`) <= 1 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :896
      era.drawLine(); // :896-897
      await era.printAndWait(`「…停下了？」`); // :898
      return 1; // :898-899
    } else if (
      era.get(`mark:${target}:2`) === 2 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :902
      era.drawLine(); // :902-903
      await era.printAndWait(`「…相当不错嘛。但是堕落什么的」`); // :904
      return 1; // :904-905
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      // :908
      era.drawLine(); // :908-909
      await era.printAndWait(`「哈哈…太好了…」`); // :910
      return 1; // :910-911
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`base:${target}:0`) >= 500
    ) {
      // :913
      era.drawLine(); // :913-914

      if (era.get(`talent:${target}:314`) === 9) {
        // :916
        era.setColor('#ffccff'); // :917
        await era.printAndWait(`「啊、真是的…身体好热啊…忍不住的快感………」`); // :918
        era.setColor(''); // :918-919
      } else {
        // :920-921
        era.setColor('#ffccff'); // :922
        await era.printAndWait(
          `「你的侍奉不够的哟～ 来更多各种各样的吧${heart(1)}」`,
        ); // :923
        era.setColor(''); // :923-924
      } // :923-925
      return 1; // :926-927
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`base:${target}:0`) <= 500
    ) {
      // :928
      era.drawLine(); // :928-929

      if (era.get(`talent:${target}:314`) === 9) {
        // :931
        era.setColor('#ffccff'); // :932
        await era.printAndWait(`「啊啊啊…太好了………${heart(1)}」`); // :933
        era.setColor(''); // :933-934
      } else {
        // :935-936
        era.setColor('#ffccff'); // :937
        await era.printAndWait(`「哈…哈…你满足了呢…${heart(1)}」`); // :938
        era.setColor(''); // :938-939
      } // :938-940
      return 1; // :941-943
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`base:${target}:0`) >= 500
    ) {
      // :944
      era.drawLine(); // :944-945

      if (era.get(`talent:${target}:314`) === 9) {
        // :947
        era.setColor('#ffccff'); // :948
        await era.printAndWait(`「啊啊啊…我还想要更多啊………」`); // :949
        era.setColor(''); // :949-950
      } else {
        // :951-952
        era.setColor('#ffccff'); // :953
        await era.printAndWait(`「更加激烈地也可以啊？　唔呼呼」`); // :954
        era.setColor(''); // :954-955
      } // :954-956
      return 1; // :957-958
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`base:${target}:0`) <= 500
    ) {
      // :959
      era.drawLine(); // :959-960

      if (era.get(`talent:${target}:314`) === 9) {
        // :962
        era.setColor('#ffccff'); // :963
        await era.printAndWait(
          `「哈…啊…已经…脑海之中…乱七八糟的…啊…啊啊啊…${heart(1)}」`,
        ); // :964
        era.setColor(''); // :964-965
      } else {
        // :966-967
        era.setColor('#ffccff'); // :968
        await era.printAndWait(`「还…完全没关系…可以继续呢………${heart(1)}」`); // :969
        era.setColor(''); // :969-970
      } // :969-971
      return 1; // :969-972
    } // :969-973
    return 0; // :974-977
  },
  TIER.NORMAL,
);

// @KOJO_MESSAGE_COM_1 // :980
async function kojo_message_com_1(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const assi = era_flag.assi;
  const player = era_flag.player;
  const target_name = chara_callname(target);
  const player_name = chara_callname(player);
  const assi_name = chara_callname(assi);
  const master_name = chara_name(MASTER);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);

  if (era.get(`tequip:${target}:55`)) {
    // :982
    await colosseum_kojo_1(rand); // CALL COLOSSEUM_KOJO_1 // :983
    return 0; // :983-984
  } // :985-986

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    // :990-991
    return 0; // :990-991
  } // :990-991

  if (game.train.失神) {
    // :993-994
    return 0; // :993-994
  } // :993-994

  if (era.get(`talent:${target}:9`) === 1) {
    // :996-997
    return 0; // :996-997
  } // :996-997

  if (era.get(`tequip:${target}:89`)) {
    // :999
    await dog_kojo_1(rand); // CALL DOG_KOJO_1 // :1000
    return 0; // :1000-1001
  } // :1002-1003

  if (era.get(`tequip:${target}:90`)) {
    // :1004-1005
    return 0; // :1004-1005
  } // :1004-1005

  if (era_flag.selectcom === 0) {
    // :1013

    if (chara(target).kojo.爱抚 === 0) {
      // :1015

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1017
        await era.printAndWait(`${target_name}转过脸就这样看着${assi_name}………`); // :1018
      } else if (era.get(`mark:${target}:2`) >= 2) {
        // :1020
        await era.printAndWait(`「真的！…但、只要忍住就好了…啊…啊啊啊！」`); // :1021
      } else {
        // :1022-1023
        await era.printAndWait(`「放过我吧！别再来了…唔哇」`); // :1024
      } // :1024-1025
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :1026
      chara(target).kojo.爱抚 = 1; // :1026
      return 0; // :1026-1027
    } else {
      // :1028-1029

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1031
        await era.printAndWait(
          `${target_name}在${assi_name}的爱抚下喘着粗气………`,
        ); // :1032
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1034
        await era.printAndWait(
          `「啊哈…想要更多的爱抚…啊啊…留下更多的痕迹吧${heart(1)}」`,
        ); // :1035
        await era.printAndWait(`${target_name}快乐地扭动着身体………`); // :1036
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :1037
        chara(target).kojo.爱抚 = 6; // :1037
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1039
        await era.printAndWait(`「啊…即使更加激烈…没关系的…真的♪」`); // :1040
        await era.printAndWait(`「主人啊…更…还想要更多…！」`); // :1041
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :1042
        chara(target).kojo.爱抚 = 5; // :1042
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1044
        await era.printAndWait(`「哈…爱抚…更多的爱抚呦…」`); // :1045
        await era.printAndWait(`「被别人这么玩弄真是太好了呐…」`); // :1046
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :1047
        chara(target).kojo.爱抚 = 4; // :1047
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1049
        await era.printAndWait(`「啊啊…明明这么恶心…明明这么恶心…咕」`); // :1050
        await era.printAndWait(`「嘁、嘁啊…没有感觉啊！」`); // :1051
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :1052
        chara(target).kojo.爱抚 = 3; // :1052
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :1054
        await era.printAndWait(`「哈…放过我吧…这样一点儿也…咕！」`); // :1055
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :1056
        chara(target).kojo.爱抚 = 2; // :1056
      } // :1056-1057
      return 0; // :1056-1058
    } // :1056-1059
  } // :1060-1063

  if (era_flag.selectcom === 1) {
    // :1065

    if (chara(target).kojo.舔阴 === 0) {
      // :1067

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1069
        await era.printAndWait(`${target_name}发出闷声闷气的悲鸣………`); // :1070
      } else if (era.get(`talent:${target}:0`) === 1) {
        // :1072
        await era.printAndWait(
          `「这样好肮脏！不、不行！臭死了！你这个变态！」`,
        ); // :1073
        await era.printAndWait(`「还、还在那里…谁…咿」`); // :1074
      } else {
        // :1075-1076
        await era.printAndWait(
          `「呀！把、把嘴放在那种地方什么的…一定是变态吧！？」`,
        ); // :1077
      } // :1077-1078
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :1079
      chara(target).kojo.舔阴 = 1; // :1079
      return 0; // :1079-1080
    } else {
      // :1081-1082

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1084
        await era.printAndWait(`${target_name}被${assi_name}那样的对待………`); // :1085
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1087
        await era.printAndWait(
          `「啊啊啊${heart(1)} 真是的…长长的舌头…伸到最里面…好棒啊${heart(1)}」`,
        ); // :1088
        await era.printAndWait(`${target_name}自己分开双腿接受舔舐………`); // :1089
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :1090
        chara(target).kojo.舔阴 = 5; // :1090
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1092
        await era.printAndWait(
          `「啊啊…是的…更多的…请你玩弄…主人的…好爽…${heart(1)}」`,
        ); // :1093
        await era.printAndWait(`「咿！主人啊！主人啊！」`); // :1094
        await era.printAndWait(`${target_name}兴高采烈的享受着你的爱抚………`); // :1095
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :1096
        chara(target).kojo.舔阴 = 4; // :1096
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1098
        await era.printAndWait(`「啊啊啊！更…多的爱抚我吧……」`); // :1099
        await era.printAndWait(`「用长长的舌头…伸到最深处…咿」`); // :1100
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :1101
        chara(target).kojo.舔阴 = 3; // :1101
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        // :1103
        await era.printAndWait(`「切…感觉好难受…快点…走开啊！」`); // :1104
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :1105
        chara(target).kojo.舔阴 = 2; // :1105
      } // :1105-1106
      return 0; // :1105-1107
    } // :1105-1108
  } // :1109-1112

  if (era_flag.selectcom === 2) {
    // :1114

    if (chara(target).kojo.肛门爱抚 === 0) {
      // :1116
      await era.printAndWait(`「啊啊啊！那、那里是…停、停下…天啊！」`); // :1117
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :1118
      chara(target).kojo.肛门爱抚 = 1; // :1118
      return 0; // :1118-1119
    } else {
      // :1120-1121
      const P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0); // :1122

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1124
        await era.print(''); // :1124-1125
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :1127
        await era.printAndWait(
          `「啊啊啊${heart(1)} 肛门…去了啊${heart(1)}好棒哦${heart(1)}啊啊啊啊啊啊${heart(1)}」`,
        ); // :1128
        await era.printAndWait(
          `「手指插进去了…好棒啊啊…肛门不行了啊…要疯了${heart(1)}」`,
        ); // :1129
        await era.printAndWait(
          `${target_name}输给了肛门的快感发出了可耻的娇声………`,
        ); // :1130
        // CFLAG:303  = 9（变量语义：CFLAG 族，303） // :1131
        chara(target).kojo.肛门爱抚 = 9; // :1131
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :1133
        await era.printAndWait(
          `「啊！真是的！${heart(1)} 嗯啊啊…手指…插到最深处了${heart(1)}」`,
        ); // :1134
        await era.printAndWait(
          `「玩弄肛门吧…玩弄${sc()}淫乱的肛门吧 ${heart(1)}」`,
        ); // :1135
        await era.printAndWait(
          `${target_name}被肛门的快感刺激发出了娇滴滴的声音………`,
        ); // :1136
        // CFLAG:303  = 8（变量语义：CFLAG 族，303） // :1137
        chara(target).kojo.肛门爱抚 = 8; // :1137
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        P < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :1139
        await era.printAndWait(
          `「啊啊哼…还没…还没瑞润滑…我要去了…啊啊${heart(1)}」`,
        ); // :1140
        await era.printAndWait(`${target_name}发出了欲求不满的声音………`); // :1141
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :1142
        chara(target).kojo.肛门爱抚 = 7; // :1142
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1144
        await era.printAndWait(
          `「呀啊！？哈…肛门…更加粗暴的玩弄吧${heart(1)}」`,
        ); // :1145
        await era.printAndWait(`「${sc()}哈…是肛门被玩弄就会高潮的变态啊………」`); // :1146
        await era.printAndWait(
          `「还要更多…请更加粗暴的玩弄那里吧…${heart(1)}」`,
        ); // :1147
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :1148
        chara(target).kojo.肛门爱抚 = 6; // :1148
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1150
        await era.printAndWait(
          `「哈呜…肛门…手指查进里面了…好…好奇怪的感觉…${heart(1)}」`,
        ); // :1151
        await era.printAndWait(`「更多…咕叽咕叽…玩…玩弄那吧！」`); // :1152
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :1153
        chara(target).kojo.肛门爱抚 = 5; // :1153
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1155
        await era.printAndWait(
          `「咕…咕叽…这样…插进…屁股…变的奇怪起来了…咕呜」`,
        ); // :1156
        await era.printAndWait(`「主人…还要更多…温柔点…咕叽${heart(1)}」`); // :1157
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :1158
        chara(target).kojo.肛门爱抚 = 4; // :1158
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1160
        await era.printAndWait(`「咿！屁股…明明不舒服…手指进去了…呀！？」`); // :1161
        await era.printAndWait(`「啊！切、这是不对的…没什么感觉…啊啊啊！」`); // :1162
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :1163
        chara(target).kojo.肛门爱抚 = 3; // :1163
      } else if (chara(target).kojo.肛门爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :1165
        await era.printAndWait(`「好难受啊…快拔出来…求你了!…」`); // :1166
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :1167
        chara(target).kojo.肛门爱抚 = 2; // :1167
      } // :1167-1168
      return 0; // :1167-1169
    } // :1167-1170
  } // :1171-1174

  if (era_flag.selectcom === 3) {
    // :1176

    if (chara(target).kojo.自慰 === 0) {
      // :1178
      await era.printAndWait(
        `「怎么这样…${sc()}这种事…这种事情不可以啊…呜啊、看、看吧！」`,
      ); // :1179
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :1180
      chara(target).kojo.自慰 = 1; // :1180
      return 0; // :1180-1181
    } else {
      // :1182-1183

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1185
        await era.printAndWait(
          `${target_name}害羞地红着脸同时在${assi_name}和${master_name}的面前自慰着………`,
        ); // :1186
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :1188
        await era.printAndWait(
          `「啊啊啊…${sc()}污秽的身体是被主人调教成这样了…${heart(1)}」`,
        ); // :1189
        await era.printAndWait(
          `「只有这里…只有这里…我还是处女就这样下去不行啊…${heart(1)}」`,
        ); // :1190
        await era.printAndWait(
          `「哎呀…${sc()}的处女…被糟蹋了…啊啊啊啊啊啊！」`,
        ); // :1191
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :1192
        chara(target).kojo.自慰 = 9; // :1192
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :1194

        if (rand_n(3) === 0) {
          // :1196
          await era.printAndWait(
            `「呼呜…啊啊啊…${sc()}的样子被看到了${heart(1)}」`,
          ); // :1197
          await era.printAndWait(
            `「这些全部都是…为了让主人高兴才去学习的哦${heart(1)}」`,
          ); // :1198
          await era.printAndWait(
            `「乳房也是…肛门也是…小穴…也是…咿…啊啊啊…不行了…自慰真的好棒啊${heart(1)}」`,
          ); // :1199
        } else if (rand_n(2) === 0) {
          // :1200
          await era.printAndWait(
            `「啊真是的…即使不被命令…自慰的话一整天继续都可以哟${heart(1)}」`,
          ); // :1201
          await era.printAndWait(
            `「是啊…一直这样自慰我喜欢好棒啊…${heart(1)}」`,
          ); // :1202
          await era.printAndWait(`「呼呜…摩擦摩擦…摩擦小穴呜啊${heart(1)}」`); // :1203
        } else {
          // :1203-1204
          await era.printAndWait(
            `「啊呀啊真是的${heart(1)} 小穴的自慰停不下来啊${heart(1)}」`,
          ); // :1205
          await era.printAndWait(
            `「我已经…停不下来了马上高潮了…主人看吧看吧…看着我自慰到高潮吧！」`,
          ); // :1206
          await era.printAndWait(`${target_name}一边弓着背还一继续边手淫………`); // :1207
        } // :1207-1208
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :1209
        chara(target).kojo.自慰 = 8; // :1209
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :1211

        if (rand_n(2) === 0) {
          // :1213
          await era.printAndWait(
            `「我一直在自慰呢…太舒服了…你看啊…请你看看我现在的样子吧${heart(1)}」`,
          ); // :1214
          await era.printAndWait(`${target_name}单膝立起两腿大张。`); // :1215
          await era.printAndWait(
            `「求主人快来玩弄我吧…好棒啊…啊${heart(1)}…快来狠狠的虐待我吧${heart(1)}」`,
          ); // :1216
        } else {
          // :1216-1217
          await era.printAndWait(
            `「就是这样啊…手指停不下来了…呦啊${heart(1)} 淫水全流出来了${heart(1)}」`,
          ); // :1218
          await era.printAndWait(`${target_name}用双手安慰着自己………`); // :1219
        } // :1219-1220
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :1221
        chara(target).kojo.自慰 = 7; // :1221
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1223
        await era.printAndWait(
          `「啊啊啊…主人…主人…还要更多…仔细的看…${sc()}的小穴自慰${heart(1)}」`,
        ); // :1224
        await era.printAndWait(
          `「${sc()}如此美丽的处女膜…随时能奉献给主人呢…${heart(1)}」`,
        ); // :1225
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :1226
        chara(target).kojo.自慰 = 6; // :1226
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1228

        if (rand_n(3) === 0) {
          // :1230
          await era.printAndWait(`「主人…请看…${sc()}的小穴…」`); // :1231
          await era.printAndWait(
            `「啊啊啊…主人看见了…手指停不下来了…${heart(1)}」`,
          ); // :1232
        } else if (rand_n(2) === 0) {
          // :1233
          await era.printAndWait(`「被命令小穴自慰呢…好舒服啊${heart(1)}」`); // :1234
          await era.printAndWait(`「啊啊啊啊…小穴变的奇怪了！」`); // :1235
        } else {
          // :1235-1236
          await era.printAndWait(`「啊爱啊…手指停不下来了…舒服的不行啊…」`); // :1237
          await era.printAndWait(
            `「${sc()}…已经不行了啊…啊啊啊…看吧小穴自慰更多的看吧${heart(1)}」`,
          ); // :1238
        } // :1238-1239
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :1240
        chara(target).kojo.自慰 = 5; // :1240
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1242

        if (rand_n(2) === 0) {
          // :1244
          await era.printAndWait(
            `「主人啊…好好看哦、${sc()}的小穴自慰${heart(1)}」`,
          ); // :1245
        } else {
          // :1245-1246
          await era.printAndWait(
            `「自己的手指这么舒服的什么啊…主人啊…请看着我舒服的地方吧${heart(1)}」`,
          ); // :1247
        } // :1247-1248
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :1249
        chara(target).kojo.自慰 = 4; // :1249
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (chara(target).kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1251

        if (rand_n(2) === 0) {
          // :1253
          await era.printAndWait(`「被命令…这样做…我感觉很舒服…♪」`); // :1254
        } else {
          // :1254-1255
          await era.printAndWait(`「啊啊…更多的看吧…更多的…快感啊♪」`); // :1256
        } // :1256-1257
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :1258
        chara(target).kojo.自慰 = 3; // :1258
      } else if (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
        // :1260

        if (rand_n(2) === 0) {
          // :1262
          await era.printAndWait(
            `「咕…啊…啊…好屈辱啊…不会做这种事的…不要…咕呜♪」`,
          ); // :1263
        } else {
          // :1263-1264
          await era.printAndWait(`「哈…哈…更多手指…不会动的…？」`); // :1265
        } // :1265-1266
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :1267
        chara(target).kojo.自慰 = 2; // :1267
      } // :1267-1268
      return 0; // :1267-1269
    } // :1267-1270
  } // :1271-1274

  if (era_flag.selectcom === 5) {
    // :1276

    if (chara(target).kojo.胸爱抚 === 0) {
      // :1278

      if (
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        // :1280

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :1282
          await era.printAndWait(
            `${target_name}在被${assi_name}吸着乳汁的时候发出了悲鸣。`,
          ); // :1283
          await era.printAndWait(
            `「啊啊啊啊不要啊！不、不行啦…这样的…啊啊啊啊啊！」`,
          ); // :1284
        } else if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          // :1286
          await era.printAndWait(
            `「啊、真是的${heart(1)} 这…好棒啊…！ 更多的吸吧！主人啊${heart(1)}」`,
          ); // :1287
        } else {
          // :1288-1289
          await era.printAndWait(`「啊啊啊…这样的我…这样的乳汁…呀啊！」`); // :1290
        } // :1290-1291
      } else {
        // :1292-1293

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :1294
          await era.printAndWait(`${target_name}被${assi_name}不停地玩弄着………`); // :1295
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :1297
          await era.printAndWait(`「呜啊…没、没关系…更加粗暴也可以哦…主人…♪」`); // :1298
        } else {
          // :1299-1300
          await era.printAndWait(`「哈…啊、好难受啊…快点把手拿开啊！」`); // :1301
        } // :1301-1302
      } // :1303-1304
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :1304
      chara(target).kojo.胸爱抚 = 1; // :1304
      return 0; // :1304-1305
    } else {
      // :1306-1307

      if (
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        // :1309

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :1311
          await era.printAndWait(
            `${target_name}在被${assi_name}吸着乳汁的时候发出了悲鸣。`,
          ); // :1312
          await era.printAndWait(
            `「啊啊啊呀啊！不、不行啦…这样的…啊啊啊啊啊！」`,
          ); // :1313
          await era.printAndWait(
            `${assi_name}一副陶醉的样子把口中的乳汁全喝了下去………`,
          ); // :1314
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :1316
          await era.printAndWait(
            `「啊哈哈…像射精一样全部喷进主人嘴里了哦${heart(1)}」`,
          ); // :1317
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :1319
            await era.printAndWait(
              `「呼呼啊哈…${sc()}的大咪咪…更用力的挤吧${heart(1)}」`,
            ); // :1319
          } // :1319
          await era.printAndWait(
            `「这样用嘴含着乳头…乳汁…喝吧…喝吧…主人啊${heart(1)}」」`,
          ); // :1320
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1321
          chara(target).kojo.胸爱抚 = 5; // :1321
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :1323
          await era.printAndWait(
            `「啊啊啊${heart(1)} 这真是…太棒了…！ 更多的吸吮吧！主人啊${heart(1)}」`,
          ); // :1324
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :1326
            await era.printAndWait(
              `「啊啊啊…${sc()}的大咪咪被挤着…更多的喝乳汁吧${heart(1)}」`,
            ); // :1326
          } // :1326
          await era.printAndWait(
            `「这样的我…听见被吸得声音就勃起了…啊啊啊…${scf()}、${sc()}…十分感激啊${heart(1)}」`,
          ); // :1327
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1328
          chara(target).kojo.胸爱抚 = 4; // :1328
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :1330
          await era.printAndWait(`「啊啊啊…乳汁被吸出来…好舒服啊…！」`); // :1331
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1332
          chara(target).kojo.胸爱抚 = 3; // :1332
        } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          // :1334
          await era.printAndWait(`「啊啊啊…这样的我…乳汁如此…呀啊！」`); // :1335
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1336
          chara(target).kojo.胸爱抚 = 2; // :1336
        } // :1336-1337
      } else {
        // :1338-1339

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :1340
          await era.printAndWait(
            `${target_name}被${assi_name}揉着乳房、发出了羞耻的声音………`,
          ); // :1341
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :1343
          await era.printAndWait(
            `「啊哈…胸部被摸的好舒服啊…嗯哼…啊啊啊${heart(1)}」`,
          ); // :1344
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :1346
            await era.printAndWait(
              `「啊哈啊${heart(1)} ${sc()}这么大的乳房…就是为了被玩才存在的啊${heart(1)}」`,
            ); // :1346
          } // :1346
          await era.printAndWait(
            `「是的…更多…它的大小${heart(1)}…被玩弄乳房什么的最喜欢了啊～${heart(1)}」`,
          ); // :1347
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1348
          chara(target).kojo.胸爱抚 = 5; // :1348
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :1350
          await era.printAndWait(
            `「噢…${sc()}骄傲的乳房…还想被您更多的爱抚…${heart(1)}」`,
          ); // :1351
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :1353
            await era.printAndWait(
              `「是、是啊…大咪咪…是为了能被主人玩弄才长这么大的${heart(1)}」`,
            ); // :1353
          } // :1353
          await era.printAndWait(
            `「啊啊啊…好喜欢被主人摸乳房啊…${sc()}非常有感觉哦…♪」`,
          ); // :1354
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1355
          chara(target).kojo.胸爱抚 = 4; // :1355
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :1357
          await era.printAndWait(
            `「哈啊…乳房…感觉…这么棒…明明只是被玩弄而已…」`,
          ); // :1358
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1359
          chara(target).kojo.胸爱抚 = 3; // :1359
        } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          // :1361
          await era.printAndWait(`「呀…呀…不要再玩弄弄了…呜啊」`); // :1362
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1363
          chara(target).kojo.胸爱抚 = 2; // :1363
        } // :1363-1364
      } // :1363-1365
      return 0; // :1363-1366
    } // :1363-1367
  } // :1368-1371

  if (era_flag.selectcom === 6) {
    // :1373

    if (chara(target).kojo.接吻 === 0 && game.train.初吻与自我口上) {
      // :1375

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1377
        await era.printAndWait(
          `${target_name}因为被${player_name}夺走了初吻而流下了眼泪………`,
        ); // :1378
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        // :1380
        await era.printAndWait(
          `「啾…啾…呼…啊啊啊…接吻是这么舒服呢…${heart(1)}」`,
        ); // :1381
        await era.printAndWait(`「啊啊啊…早就想和主人这样的接吻了呢…………」`); // :1382
        await era.printAndWait(
          `「………哈…说起来接吻这东西还是第一次哦…还要更多的品味哦${heart(1)} 嗯…嗯嗯…${heart(1)}」`,
        ); // :1383
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        // :1385
        await era.printAndWait(
          `「嘛啾…啾…啾噗…咕啊…没想到魔王大人…主人会是第一次的对象呢…好想一直这样下去${heart(1)}」`,
        ); // :1386
        await era.printAndWait(
          `「哈…再来一次吧…哈啊…嗯…啾…啾…嗯嗯…哈哦………${heart(1)}」`,
        ); // :1387
        await era.printAndWait(`${target_name}深深的叹了口气………`); // :1388
      } else {
        // :1389-1390
        await era.printAndWait(`「嗯…嗯嗯…这样的…讨厌…哎呀…」`); // :1391
        await era.printAndWait(
          `坚强的${target_name}也因为太耻辱而流下了眼泪………`,
        ); // :1392
      } // :1392-1393
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1394
      chara(target).kojo.接吻 = 1; // :1394
      return 0; // :1394-1395
    } else if (chara(target).kojo.接吻 === 0) {
      // :1397

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1399
        await era.printAndWait(
          `被${master_name}看着接吻${target_name}很害羞的转过了脸………`,
        ); // :1400
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1402
        await era.printAndWait(
          `「啾…啾…呼…啊啊啊…亲吻这么舒服呢啊…${heart(1)}」`,
        ); // :1403
        await era.printAndWait(`「粘糊糊的都要溶化…${heart(1)}」`); // :1404
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1406
        await era.printAndWait(
          `「嘛…啾…啾…啊哈…和主人接吻了啊…真是太幸福了…${heart(1)}」`,
        ); // :1407
        await era.printAndWait(`「更多…还要更多…♪」`); // :1408
      } else {
        // :1409-1410
        await era.printAndWait(`「嗯咕…嗯…不行了…这里是…饶了我吧…」`); // :1411
      } // :1411-1412
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1413
      chara(target).kojo.接吻 = 1; // :1413
      return 0; // :1413-1414
    } else {
      // :1415-1416

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1418
        await era.printAndWait(
          `等${target_name}意识到自己陶醉的样子被${master_name}看到了的时候正在和${player_name}接吻。`,
        ); // :1419
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1421
        await era.printAndWait(`「嗯…呼…啾…啾…嗯哦…嗯呼${heart(1)}」`); // :1422
        await era.printAndWait(
          `${target_name}热情的把嘴唇重合了过来。粘糊糊的舌头侵入了嘴里。`,
        ); // :1423
        await era.printAndWait(
          `「嘛啾…啾啊${heart(1)}………啊啊啊啊…不、不行了…腰要断了…还想要更多的吻………」`,
        ); // :1424
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :1425
        chara(target).kojo.接吻 = 5; // :1425
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1427
        await era.printAndWait(`「嘛啾…啾…唔呼呼…更多…更多的吻…主人啊♪」`); // :1428
        await era.printAndWait(`「${sc()}…对接吻上瘾了呢…${heart(1)}」`); // :1429
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :1430
        chara(target).kojo.接吻 = 4; // :1430
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1432
        await era.printAndWait(`「是的…更多的吻我也不介意………」`); // :1433
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :1434
        chara(target).kojo.接吻 = 3; // :1434
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // :1436
        await era.printAndWait(`「哈呜…啊、啊哈…嗯！？嗯…噗…呜啊啊…」`); // :1437
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :1438
        chara(target).kojo.接吻 = 2; // :1438
      } // :1438-1439
      return 0; // :1438-1440
    } // :1438-1441
  } // :1442-1445

  if (era_flag.selectcom === 7) {
    // :1447

    if (chara(target).kojo.自己扒开 === 0) {
      // :1449

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1451
        await era.printAndWait(
          `${target_name}小穴的最里面被两人仔仔细细的看了个遍………`,
        ); // :1452
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1454
        await era.printAndWait(
          `「啊哈…主人的小鸡鸡…我就裂开了啊…${heart(1)}」`,
        ); // :1455
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1457
        await era.printAndWait(`「主人啊…啊啊、最里面都被看到了…被看到了啦…」`); // :1458
      } else {
        // :1459-1460
        await era.printAndWait(`「嗯嗯…到里面去了…看什么啊…」`); // :1461
      } // :1461-1462
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :1463
      chara(target).kojo.自己扒开 = 1; // :1463
      return 0; // :1463-1464
    } else {
      // :1465-1466

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1468
        await era.printAndWait(
          `${target_name}小穴的最里面被两人仔仔细细的看了个遍………`,
        ); // :1469
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1471
        await era.printAndWait(`「啊啊啊…感觉来了喽${heart(1)}」`); // :1472
        await era.printAndWait(
          `「这里的最里面…好想要小鸡鸡啊…吇咕吇咕的插进最里面…小鸡鸡插的满满的我还想要更舒服的啊${heart(1)}」`,
        ); // :1473
        if (era.get(`talent:${target}:0`) === 1) {
          // :1475
          await era.printAndWait(
            `「虽然还是处女小穴…也肯定很舒服啊…${heart(1)}」」`,
          ); // :1475
        } // :1475
        if (era.get(`talent:${target}:0`) === 1) {
          // :1477
          await era.printAndWait(`${target_name}很不爽的张开了自己的小穴………`); // :1477
        } // :1477
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1478
        chara(target).kojo.胸爱抚 = 5; // :1478
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1480
        await era.printAndWait(
          `「主人啊…请多看一些…${sc()}的小穴…每天都有好好地保养哟？」`,
        ); // :1481
        await era.printAndWait(
          `「你看…特别是这个小豆豆这里哦…经常打理着哦…是非常敏感的说♪」`,
        ); // :1482
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1483
        chara(target).kojo.胸爱抚 = 4; // :1483
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (chara(target).kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1485
        await era.printAndWait(`「啊哈…更多…到最里面…看进去啊♪」`); // :1486
        await era.printAndWait(
          `「到小穴的最里面为止…被看到了…啊啊、被视线侵犯喽♪」`,
        ); // :1487
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1488
        chara(target).kojo.胸爱抚 = 3; // :1488
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :1490
        await era.printAndWait(`「啊啊啊…想看这里什么的…变态…变态啊！」`); // :1491
        await era.printAndWait(
          `「这样…只是张开了…感觉什么的…完全没有…啊啊啊！」`,
        ); // :1492
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1493
        chara(target).kojo.胸爱抚 = 2; // :1493
      } // :1493-1494
      return 0; // :1493-1495
    } // :1493-1496
  } // :1497-1500

  if (era_flag.selectcom === 8) {
    // :1502

    if (chara(target).kojo.插入手指 === 0) {
      // :1504

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1506
        await era.print(''); // :1506-1507
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1509
        await era.printAndWait(
          `「咕哼呜啊啊…${heart(1)} 最里面…请不要客气啦${heart(1)}」`,
        ); // :1510
        await era.printAndWait(`「啊啊啊…更多的蹂躏我吧…${heart(1)}」`); // :1511
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        // :1513
        await era.printAndWait(
          `「主人的手指…这样进来了啊…哈…更多…更多的插入啊哦♪」`,
        ); // :1514
      } else {
        // :1515-1516
        await era.printAndWait(`「啊呜…好、好痛…求你温柔点啊」`); // :1517
      } // :1517-1518
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :1519
      chara(target).kojo.插入手指 = 1; // :1519
      return 0; // :1519-1520
    } else {
      // :1521-1522

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1524
        await era.print(''); // :1524-1525
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1527
        await era.printAndWait(`「啊哼…手指插到最里面了…呜咻啊…${heart(1)}」`); // :1528
        await era.printAndWait(
          `「啊啊啊…请更多的玩弄我淫乱的小穴吧${heart(1)}」`,
        ); // :1529
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :1530
        chara(target).kojo.插入手指 = 5; // :1530
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1532
        await era.printAndWait(`「啊…手指…这样进去了…哈…好开心的说♪」`); // :1533
        await era.printAndWait(`「更多${sc()}的小穴…请用你的手指随便玩弄吧♪」`); // :1534
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :1535
        chara(target).kojo.插入手指 = 4; // :1535
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1537
        await era.printAndWait(
          `「啊咕…手指…深深地进去了…啊啊啊…变的奇怪起来了…」`,
        ); // :1538
        await era.printAndWait(
          `${target_name}配合着手指的动作淫猥的舞动起来………`,
        ); // :1539
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :1540
        chara(target).kojo.插入手指 = 3; // :1540
      } else if (chara(target).kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        // :1542
        await era.printAndWait(`「呜呼…呜…手指…如果这么激烈的话…啊啊啊！」`); // :1543
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :1544
        chara(target).kojo.插入手指 = 2; // :1544
      } // :1544-1545
      return 0; // :1544-1546
    } // :1544-1547
  } // :1548-1551

  if (era_flag.selectcom === 9) {
    // :1553

    if (chara(target).kojo.舔肛 === 0) {
      // :1555

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1557
        await era.print(''); // :1557-1558
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1560
        await era.printAndWait(
          `「啊哈啊${heart(1)} 嗯…嗯哈啊…更多的舔吧${heart(1)} 淫乱的肛门还想被更多的舔啊${heart(1)}」`,
        ); // :1561
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1563
        await era.printAndWait(`「主人…被舔了那里…好羞耻…啊啊嗯！」`); // :1564
      } else {
        // :1565-1566
        await era.printAndWait(
          `「呜啊…那种地方…不、不要舔啊…再舔的话不行了啊！」`,
        ); // :1567
      } // :1567-1568
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :1569
      chara(target).kojo.舔肛 = 1; // :1569
      return 0; // :1569-1570
    } else {
      // :1571-1572

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1574
        await era.print(''); // :1574-1575
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.舔肛 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :1577
        await era.printAndWait(`「呀呼嗯嗯${heart(1)} 啊呀啊…啊啊啊啊…咕嗯」`); // :1578
        await era.printAndWait(`「啊啊啊…肛门被舔了…咿啊啊啊…腰要融化了呜…」`); // :1579
        await era.printAndWait(`「舔啊…更多…被舔的奇怪起来了${heart(1)}」`); // :1580
        await era.printAndWait(`${target_name}被舔着肛门发出了娇滴滴的声音………`); // :1581
        // CFLAG:310  = 7（变量语义：CFLAG 族，310） // :1582
        chara(target).kojo.舔肛 = 7; // :1582
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1584
        await era.printAndWait(
          `「嘛啊…啊啊啊…哈…咕嗯嗯${heart(1)} 舌头进到最里面了啊…嘛啊啊嗯${heart(1)}」`,
        ); // :1585
        await era.printAndWait(
          `「更加舒服了…${heart(1)} 还要更多色情的事…${sc()}的淫乱肛门还想要更多	！」`,
        ); // :1586
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :1587
        chara(target).kojo.舔肛 = 6; // :1587
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1589
        await era.printAndWait(`「哈…更多的舔${heart(1)}」`); // :1590
        await era.printAndWait(`「到肛门的最里面为止…喜欢上了啊…」`); // :1591
        await era.printAndWait(`「好棒哦…就这样吃掉也没关系啊…♪」`); // :1592
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :1593
        chara(target).kojo.舔肛 = 5; // :1593
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1595
        await era.printAndWait(`「咿嗯…这样…被舔肛门…这么舒服呐…」`); // :1596
        await era.printAndWait(
          `「呀哈啊…咿呀啊…～舌头伸进最里面了啊${heart(1)}」`,
        ); // :1597
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :1598
        chara(target).kojo.舔肛 = 4; // :1598
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1600
        await era.printAndWait(`「啊啊…肛门被舐了…这样的感觉…好奇怪哦…啊！」`); // :1601
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :1602
        chara(target).kojo.舔肛 = 3; // :1602
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // :1604
        await era.printAndWait(
          `「啊啊啊…明明只有不舒服…明明只是被舐…这种…哇…」`,
        ); // :1605
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :1606
        chara(target).kojo.舔肛 = 2; // :1606
      } // :1606-1607
      return 0; // :1606-1608
    } // :1606-1609
  } // :1610-1613

  if (era_flag.selectcom === 10) {
    // :1615

    if (chara(target).kojo.振动宝石 === 0) {
      // :1617

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1619
        await era.print(''); // :1619-1620
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1622
        await era.printAndWait(`「呃哈…这么舒服的道具还有什么吗…${heart(1)}」`); // :1623
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        // :1625
        await era.printAndWait(
          `「那、那个是什么啊…魔族的魔法道具么…？呀还在不停的振动呢…啊啊啊啊！」`,
        ); // :1626
      } else {
        // :1627-1628
        await era.printAndWait(
          `「哇…那、那样的魔族道具但是${sc()}又能怎么样呢…呀嗯」`,
        ); // :1629
      } // :1629-1630
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1631
      chara(target).kojo.振动宝石 = 1; // :1631
      return 0; // :1631-1632
    } else {
      // :1633-1634

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1636
        await era.print(''); // :1636-1637
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1639
        await era.printAndWait(
          `「咿啊…啊啊啊…啊啊啊…嗯…请更多的疼爱我吧…黏糊糊的淫水都流出来了啊${heart(1)}」`,
        ); // :1640
        await era.printAndWait(
          `${target_name}被阴蒂的强烈刺激弄的发出了大声的娇吟………`,
        ); // :1641
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1642
        chara(target).kojo.振动宝石 = 5; // :1642
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1644
        await era.printAndWait(
          `「啊嗯…嗯啊…啊嗯…主人…${sc()}不要紧…还要更多…咕嗯${heart(1)}」`,
        ); // :1645
        await era.printAndWait(
          `${target_name}受到阴蒂的振动快乐的提高了声音………`,
        ); // :1646
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1647
        chara(target).kojo.振动宝石 = 4; // :1647
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1649
        await era.printAndWait(`「咿啊啊…如果被这样…${sc()}…咿嗯♪」`); // :1650
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1651
        chara(target).kojo.振动宝石 = 3; // :1651
      } else if (chara(target).kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        // :1653
        await era.printAndWait(`「不、不行了…这样好讨厌…不要再振动了…咿」`); // :1654
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1655
        chara(target).kojo.振动宝石 = 2; // :1655
      } // :1655-1656
      return 0; // :1655-1657
    } // :1655-1658
  } // :1659-1662

  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    // :1665

    if (chara(target).kojo.壶虫 === 0) {
      // :1667

      if (era.get(`talent:${target}:0`) === 1) {
        // :1669

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :1671
          await era.printAndWait(`${target_name}发出了难受的的叹息………`); // :1672
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :1674
          await era.printAndWait(
            `「啊啊啊啊…主、主人啊…请好好的看呐…${heart(1)}」`,
          ); // :1675
          await era.printAndWait(
            `「${sc()}的小穴就要变成主人的专用小穴了…啊…啊啊啊…嗯咿${heart(1)}」`,
          ); // :1676
          await era.printAndWait(`${target_name}感受到破处的痛苦弯下了身子………`); // :1677
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :1679
          await era.printAndWait(
            `「主人好坏啊…这样就要…${sc()}最重要的处女…哈啊嗯！」`,
          ); // :1680
          await era.printAndWait(`${target_name}忍受着破处的痛苦…………`); // :1681
        } else {
          // :1682-1683
          await era.printAndWait(`「就这样剥夺了${sc()}的处女………」`); // :1684
        } // :1684-1685
      } else {
        // :1686-1687

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :1689
          await era.printAndWait(`${target_name}对异物感皱起了眉头………`); // :1690
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :1692
          await era.printAndWait(
            `「啊啊啊${heart(1)} 蠕虫到最里面了啦${heart(1)}」`,
          ); // :1693
          await era.printAndWait(
            `「呃哈…啊啊啊…在里面乱动…呀啊嗯${heart(1)}」`,
          ); // :1694
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :1696
          await era.printAndWait(
            `「啊…好厉害…进到最里面了…主人啊…${sc()}变的奇怪了呜…」`,
          ); // :1697
        } else {
          // :1698-1699
          await era.printAndWait(`「啊啊啊…不行了、不要那么粗暴啊！」`); // :1700
        } // :1700-1701
      } // :1702-1703
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1703
      chara(target).kojo.壶虫 = 1; // :1703
      return 0; // :1703-1704
    } else {
      // :1705-1706

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1708
        await era.printAndWait(
          `${player_name}露出了嗜虐的笑容同时一直把蠕虫插到${target_name}小穴的最里面为止………`,
        ); // :1709
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1711
        await era.printAndWait(
          `「呀嗯${heart(1)}…啊啊啊…到最里面了我要去了啦${heart(1)}」`,
        ); // :1712
        await era.printAndWait(
          `${target_name}因为小穴最里面被蠕虫蹂躏而愉悦的颤动着………`,
        ); // :1713
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1714
        chara(target).kojo.壶虫 = 5; // :1714
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1716
        await era.printAndWait(
          `「呼啊啊…明明不是主人的小鸡鸡…感觉到了…虽然不好意思但是可以来吧…」`,
        ); // :1717
        await era.printAndWait(`${target_name}很有快感诱惑的扭着腰………`); // :1718
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1719
        chara(target).kojo.壶虫 = 4; // :1719
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1721
        await era.printAndWait(`「啊啊啊啊…腰…自己动了…感觉来了啊…♪」`); // :1722
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1723
        chara(target).kojo.壶虫 = 3; // :1723
      } else if (chara(target).kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        // :1725
        await era.printAndWait(`「呼、太粗了…太粗了…不行啊…」`); // :1726
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1727
        chara(target).kojo.壶虫 = 2; // :1727
      } // :1727-1728
      return 0; // :1727-1729
    } // :1730-1731
  } else if (
    era_flag.selectcom === 11 &&
    era.get(`tequip:${target}:11`) === 0
  ) {
    // :1732

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1734
      await era.printAndWait(`「呀啊…啊啊…明明想要放进去更多的………」`); // :1735
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1736
      chara(target).kojo.壶虫着脱 = 3; // :1736
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1738
      await era.printAndWait(`「啊啊啊…好象掉了啊…♪」`); // :1739
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1740
      chara(target).kojo.壶虫着脱 = 2; // :1740
    } else if (chara(target).kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1742
      await era.printAndWait(`「哈啊…哈…哈…哈…」`); // :1743
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1744
      chara(target).kojo.壶虫着脱 = 1; // :1744
    } // :1744-1745
    return 0; // :1744-1746
  } // :1744-1747

  if (era_flag.selectcom === 12) {
    // :1752

    if (chara(target).kojo.振动杖 === 0) {
      // :1754

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1756
        await era.print(''); // :1756-1757
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1759
        await era.printAndWait(
          `「咿…振动…咿呀嗯…嗯嗯呼${heart(1)}…啊啊啊…不行…不行了…${heart(1)}」`,
        ); // :1760
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1762
        await era.printAndWait(
          `「哈…这是很棒的魔族道具呢♪…啊嗯…这次是振动…呀嗯嗯！？」`,
        ); // :1763
      } else {
        // :1764-1765
        await era.printAndWait(`「这、这是什么…即使被这样…啊哈啊啊！？」`); // :1766
      } // :1766-1767
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1768
      chara(target).kojo.振动杖 = 1; // :1768
      return 0; // :1768-1769
    } else {
      // :1770-1771

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1773
        await era.print(''); // :1773-1774
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1776
        await era.printAndWait(
          `「咿呼呜…振动…太强烈了${heart(1)}…咿呀啊啊啊呜哇咿啊啊啊${heart(1)}」`,
        ); // :1777
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1778
        chara(target).kojo.振动杖 = 5; // :1778
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1780
        await era.printAndWait(
          `「啊嗯…啊啊哈…咿啊啊啊！…好啊…更用力的按上来吧…主人啊…♪」`,
        ); // :1781
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1782
        chara(target).kojo.振动杖 = 4; // :1782
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1784
        await era.printAndWait(`「哈呜…嗯…嗯啊啊…魔王大人啊…魔王大人啊…♪」`); // :1785
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1786
        chara(target).kojo.振动杖 = 3; // :1786
      } else if (chara(target).kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        // :1788
        await era.printAndWait(`「呀…哇…这样的事…完全无所谓…啊啊啊♪」`); // :1789
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1790
        chara(target).kojo.振动杖 = 2; // :1790
      } // :1790-1791
      return 0; // :1790-1792
    } // :1790-1793
  } // :1794-1797

  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    // :1800

    if (chara(target).kojo.肛门虫 === 0) {
      // :1802

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1804
        await era.print(''); // :1804-1805
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1807
        await era.printAndWait(
          `「呜哇啊…不行了不行了…肛门变的奇怪了${heart(1)}」`,
        ); // :1808
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1810
        await era.printAndWait(
          `「咿…肛门…全部…进来了…啊啊啊…好难受…不过可以忍受…」`,
        ); // :1811
      } else {
        // :1812-1813
        await era.printAndWait(`「讨厌啊好恶心呀	…！」`); // :1814
      } // :1814-1815
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1816
      chara(target).kojo.肛门虫 = 1; // :1816
      return 0; // :1816-1817
    } else {
      // :1818-1819

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1821
        await era.print(''); // :1821-1822
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛门虫 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :1824
        await era.printAndWait(
          `「哦哦…肛门好舒服好舒服啊…${heart(1)} 啊哈…${sc()}的肛门小穴${heart(1)}」`,
        ); // :1825
        await era.printAndWait(
          `「好、好棒啊…${sc()}的淫乱肛门被蠕虫弄的有感觉了…${sc()}是变态的肛交狂啊${heart(1)}」`,
        ); // :1826
        await era.printAndWait(
          `${target_name}感到肛门强烈的快感、一边流着口水一边提高了愉悦的声音………`,
        ); // :1827
        // CFLAG:314  = 9（变量语义：CFLAG 族，314） // :1828
        chara(target).kojo.肛门虫 = 9; // :1828
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :1830
        await era.printAndWait(
          `「啊哈啊${heart(1)} 不行了…又要疯了…啊啊啊${heart(1)} 不能再侍奉主人了${heart(1)}」」`,
        ); // :1831
        await era.printAndWait(
          `「已、已经松弛了…松弛呃啊…肛门要坏了呀${heart(1)}」`,
        ); // :1832
        await era.printAndWait(
          `${target_name}在肛门蠕虫每次动作的时候都会发出“咿”“啊”之类的声音………`,
        ); // :1833
        // CFLAG:314  = 8（变量语义：CFLAG 族，314） // :1834
        chara(target).kojo.肛门虫 = 8; // :1834
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :1836
        await era.printAndWait(
          `「嗯呀啊…啊啊啊…肛门很怪异快感…咿噶…呃…呼啊…${heart(1)}」`,
        ); // :1837
        await era.printAndWait(`${target_name}对肛门蠕虫的动作非常敏感………`); // :1838
        // CFLAG:314  = 7（变量语义：CFLAG 族，314） // :1839
        chara(target).kojo.肛门虫 = 7; // :1839
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1841
        await era.printAndWait(
          `「呀嗯嗯！？哈…蠕虫来吧…更多的在肛门里啾啾的弄吧${heart(1)}」`,
        ); // :1842
        await era.printAndWait(
          `「${sc()}是那种被触手玩弄肛门都有感觉的超级变态………♪」`,
        ); // :1843
        await era.printAndWait(`「主人啊…♪${sc()}的好色肛门…看到了么？」`); // :1844
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1845
        chara(target).kojo.肛门虫 = 6; // :1845
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1847
        await era.printAndWait(
          `「啊嗯…嗯啊咿…哈肛门…有感觉了…主人啊…肛门…怪怪的…${heart(1)}」`,
        ); // :1848
        await era.printAndWait(`${target_name}每次肛门蠕虫活动都会发出声音………`); // :1849
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1850
        chara(target).kojo.肛门虫 = 5; // :1850
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1852
        await era.printAndWait(`「主人啊…肛门…变的怪怪的…救救我…啊啊嗯♪」`); // :1853
        await era.printAndWait(`${target_name}对肛门蠕虫的动作非常敏感………`); // :1854
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1855
        chara(target).kojo.肛门虫 = 4; // :1855
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1857
        await era.printAndWait(
          `「啊…哈啊…啊嗯…不、不对…肛门有感觉什么的…啊啊啊♪」`,
        ); // :1858
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1859
        chara(target).kojo.肛门虫 = 3; // :1859
      } else if (chara(target).kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        // :1861
        await era.printAndWait(`「啊啊…肛门啊…慢慢的…变的奇怪了…」`); // :1862
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1863
        chara(target).kojo.肛门虫 = 2; // :1863
      } // :1863-1864
      return 0; // :1863-1865
    } // :1866-1867
  } else if (
    era_flag.selectcom === 13 &&
    era.get(`tequip:${target}:13`) === 0
  ) {
    // :1868

    if (
      era.get(`talent:${target}:77`) === 1 &&
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      // :1870
      await era.printAndWait(`「哎呀啊嗯…更多…更多的钻进肛门吧………」`); // :1871
      // CFLAG:374  = 6（变量语义：CFLAG 族，374） // :1872
      chara(target).kojo.肛门虫着脱 = 6; // :1872
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      // :1874
      await era.printAndWait(`「咿啊咿…肛门扩张了啊…${heart(1)}」`); // :1875
      // CFLAG:374  = 5（变量语义：CFLAG 族，374） // :1876
      chara(target).kojo.肛门虫着脱 = 5; // :1876
    } else if (
      era.get(`talent:${target}:77`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      // :1878
      await era.printAndWait(`「啊…肛门还要更多…还不许拔出啊………」`); // :1879
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1880
      chara(target).kojo.肛门虫着脱 = 4; // :1880
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1882
      await era.printAndWait(`「哈…哈…肛门…就这么张开着………」`); // :1883
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1884
      chara(target).kojo.肛门虫着脱 = 3; // :1884
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1886
      await era.printAndWait(`「啊啊嗯♪…咿…咿…哈啊…肛门…怪怪的感觉…」`); // :1887
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1888
      chara(target).kojo.肛门虫着脱 = 2; // :1888
    } else if (chara(target).kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1890
      await era.printAndWait(`「咕…哈…哈…哈…」`); // :1891
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1892
      chara(target).kojo.肛门虫着脱 = 1; // :1892
    } // :1892-1893
    return 0; // :1892-1894
  } // :1892-1895

  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    // :1901

    if (chara(target).kojo.阴蒂夹 === 0) {
      // :1903

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1905
        await era.print(''); // :1905-1906
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1908
        await era.printAndWait(
          `「啊啊啊啊…用玩具更多的玩弄我吧…呼…夹子好强力啊${heart(1)}」`,
        ); // :1909
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1911
        await era.printAndWait(
          `「主人…${sc()}…不要紧…不用客气的玩弄我吧…嗯啊啊♪」`,
        ); // :1912
      } else {
        // :1913-1914
        await era.printAndWait(`「呀…不行了…这样夹在那里…啊啊啊啊啊！」`); // :1915
      } // :1915-1916
      // CFLAG:315  = 1（变量语义：CFLAG 族，315） // :1917
      chara(target).kojo.阴蒂夹 = 1; // :1917
      return 0; // :1917-1918
    } else {
      // :1919-1920

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1922
        await era.print(''); // :1922-1923
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1925
        await era.printAndWait(
          `「啊哈…夹子好强力啊…没办法侍奉了啊…还想要更激烈的${heart(1)}」`,
        ); // :1926
        // CFLAG:315  = 4（变量语义：CFLAG 族，315） // :1927
        chara(target).kojo.阴蒂夹 = 4; // :1927
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1929
        await era.printAndWait(
          `「啊…嗯…好厉害…已经麻了…变的奇怪了…${heart(1)}」`,
        ); // :1930
        // CFLAG:315  = 3（变量语义：CFLAG 族，315） // :1931
        chara(target).kojo.阴蒂夹 = 3; // :1931
      } else if (chara(target).kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        // :1933
        await era.printAndWait(`「啊呜…哇…快点…取下啊…求你了…」`); // :1934
        // CFLAG:315  = 2（变量语义：CFLAG 族，315） // :1935
        chara(target).kojo.阴蒂夹 = 2; // :1935
      } // :1935-1936
      return 0; // :1935-1937
    } // :1938-1939
  } else if (
    era_flag.selectcom === 14 &&
    era.get(`tequip:${target}:14`) === 0
  ) {
    // :1940

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :1942
      await era.printAndWait(`「啊啊啊…真的太舒服了…${heart(1)}」`); // :1943
      // CFLAG:375  = 3（变量语义：CFLAG 族，375） // :1944
      chara(target).kojo.阴蒂夹着脱 = 3; // :1944
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :1946
      await era.printAndWait(`「哈…真是太舒服了我还要更多♪」`); // :1947
      // CFLAG:375  = 2（变量语义：CFLAG 族，375） // :1948
      chara(target).kojo.阴蒂夹着脱 = 2; // :1948
    } else if (chara(target).kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // :1950
      await era.printAndWait(`「哈…哈…讨厌…还麻着呢………」`); // :1951
      // CFLAG:375  = 1（变量语义：CFLAG 族，375） // :1952
      chara(target).kojo.阴蒂夹着脱 = 1; // :1952
    } // :1952-1953
    return 0; // :1952-1954
  } // :1952-1955

  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    // :1961

    if (chara(target).kojo.乳头夹 === 0) {
      // :1963

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1965
        await era.print(''); // :1965-1966
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :1968
        await era.printAndWait(`「嘛啊啊啊…乳头…啊啊啊…好舒服啊${heart(1)}」`); // :1969
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :1971
        await era.printAndWait(`「主人啊…这样…颤动…乳头啊…啊啊啊！」`); // :1972
      } else {
        // :1973-1974
        await era.printAndWait(
          `「那、那样的东西给${sc()}装上…呀！？麻、麻掉了！？」`,
        ); // :1975
      } // :1975-1976
      // CFLAG:316  = 1（变量语义：CFLAG 族，316） // :1977
      chara(target).kojo.乳头夹 = 1; // :1977
      return 0; // :1977-1978
    } else {
      // :1979-1980

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1982
        await era.print(''); // :1982-1983
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :1985
        await era.printAndWait(
          `「啊哈…乳头已经麻了…那里变的舒服了${heart(1)}」`,
        ); // :1986
        // CFLAG:316  = 4（变量语义：CFLAG 族，316） // :1987
        chara(target).kojo.乳头夹 = 4; // :1987
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1989
        await era.printAndWait(`「呼…乳头已经麻了…好舒服♪」`); // :1990
        // CFLAG:316  = 3（变量语义：CFLAG 族，316） // :1991
        chara(target).kojo.乳头夹 = 3; // :1991
      } else if (chara(target).kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        // :1993
        await era.printAndWait(`「啊啊啊…乳头麻了啊…不行了…求你拿下来吧！」`); // :1994
        // CFLAG:316  = 2（变量语义：CFLAG 族，316） // :1995
        chara(target).kojo.乳头夹 = 2; // :1995
      } // :1995-1996
      return 0; // :1995-1997
    } // :1998-1999
  } else if (
    era_flag.selectcom === 15 &&
    era.get(`tequip:${target}:15`) === 0
  ) {
    // :2000

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :2002
      await era.printAndWait(`「哈啊…乳房似乎有感觉了…${heart(1)}」`); // :2003
      // CFLAG:376  = 3（变量语义：CFLAG 族，376） // :2004
      chara(target).kojo.乳头夹着脱 = 3; // :2004
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :2006
      await era.printAndWait(`「啊…乳头已经变成这样了…${heart(1)}」`); // :2007
      // CFLAG:376  = 2（变量语义：CFLAG 族，376） // :2008
      chara(target).kojo.乳头夹着脱 = 2; // :2008
    } else if (chara(target).kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      // :2010
      await era.printAndWait(`「啊啊…乳头…麻了…都肿起来了………」`); // :2011
      // CFLAG:376  = 1（变量语义：CFLAG 族，376） // :2012
      chara(target).kojo.乳头夹着脱 = 1; // :2012
    } // :2012-2013
    return 0; // :2012-2014
  } // :2012-2015

  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    // :2021

    if (chara(target).kojo.榨乳器 === 0) {
      // :2023

      if (era.get(`talent:${target}:76`) === 1) {
        // :2025
        await era.printAndWait(`「啊啊嗯…乳汁出来了…${heart(1)}」`); // :2026
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :2028
        await era.printAndWait(
          `「咿啊啊啊…嗯…不行了…这乳汁是宝宝的东西…${heart(1)}」`,
        ); // :2029
      } else {
        // :2030-2031
        await era.printAndWait(`「嗯…这、这要怎么收集……？」`); // :2032
      } // :2032-2033
      // CFLAG:317  = 1（变量语义：CFLAG 族，317） // :2034
      chara(target).kojo.榨乳器 = 1; // :2034
    } else {
      // :2036-2037

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2039
        await era.printAndWait(
          `「哎嘿嘿…乳房不要挤啊…这样有感觉了…${heart(1)}」`,
        ); // :2040
        // CFLAG:317  = 4（变量语义：CFLAG 族，317） // :2041
        chara(target).kojo.榨乳器 = 4; // :2041
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2043
        await era.printAndWait(
          `「啊啊嗯…乳房不要挤啊…啊啊啊…啊…哈啊嗯${heart(1)}」`,
        ); // :2044
        // CFLAG:317  = 3（变量语义：CFLAG 族，317） // :2045
        chara(target).kojo.榨乳器 = 3; // :2045
      } else if (chara(target).kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        // :2047
        await era.printAndWait(`「啊啊啊…哎呀…这、这样的………」`); // :2048
        // CFLAG:317  = 2（变量语义：CFLAG 族，317） // :2049
        chara(target).kojo.榨乳器 = 2; // :2049
      } // :2049-2050
      return 0; // :2049-2051
    } // :2052-2053
  } else if (
    era_flag.selectcom === 16 &&
    era.get(`tequip:${target}:16`) === 0
  ) {
    // :2054

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :2056
      await era.printAndWait(`「哈…哈…要取多少乳汁？」`); // :2057
      // CFLAG:377  = 3（变量语义：CFLAG 族，377） // :2058
      chara(target).kojo.榨乳器着脱 = 3; // :2058
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :2060
      await era.printAndWait(`「嗯咿嗯…哇…那样就完成榨乳了啊…${heart(1)}」`); // :2061
      // CFLAG:377  = 2（变量语义：CFLAG 族，377） // :2062
      chara(target).kojo.榨乳器着脱 = 2; // :2062
    } else if (chara(target).kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      // :2064
      await era.printAndWait(`「嗯啊啊啊…已、已经…乳房不行了啊………」`); // :2065
      // CFLAG:377  = 1（变量语义：CFLAG 族，377） // :2066
      chara(target).kojo.榨乳器着脱 = 1; // :2066
    } // :2066-2067
    return 0; // :2066-2068
  } // :2066-2069

  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    // :2120

    if (chara(target).kojo.肛珠 === 0) {
      // :2122

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2124
        await era.print(''); // :2124-2125
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :2127
        await era.printAndWait(
          `「啊嗯…那些珠子…全部都放进来了…啊啊啊嗯${heart(1)}」`,
        ); // :2128
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :2130
        await era.printAndWait(
          `「啊啊啊…真是好厉害的淫具啊…好哟…请按你喜欢的做吧…主人啊」`,
        ); // :2131
      } else {
        // :2132-2133
        await era.printAndWait(
          `「呀、什么！？这是什么啊！？难道…${sc()}的屁股里…讨厌啊啊啊！」`,
        ); // :2134
      } // :2134-2135
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :2136
      chara(target).kojo.肛珠 = 1; // :2136
      return 0; // :2136-2137
    } else {
      // :2138-2139

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2141
        await era.print(''); // :2141-2142
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2144
        await era.printAndWait(
          `「呜哇咿…啊啊嗯…再放进去点…更多的放进${sc()}的淫乱肛门里吧${heart(1)}」`,
        ); // :2145
        await era.printAndWait(
          `「啊啊啊…淫乱的肛门…什么都没有会坐立不安的啦…${heart(1)}」`,
        ); // :2146
        await era.printAndWait(
          `「呼…已经全部放进去了♪…肛门串珠在${sc()}肚子里侵犯直到不行了为止${heart(1)}」`,
        ); // :2147
        // CFLAG:320  = 8（变量语义：CFLAG 族，320） // :2148
        chara(target).kojo.肛珠 = 8; // :2148
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2150
        await era.printAndWait(
          `「啊啊啊…嗯…肚子里装满了…珠子…嗯咿在里面嘎吱嘎吱的${heart(1)}」`,
        ); // :2151
        await era.printAndWait(
          `「啊啊啊${heart(1)} 不行了…不行了啊呜…${heart(1)}」`,
        ); // :2152
        // CFLAG:320  = 8（变量语义：CFLAG 族，320） // :2153
        chara(target).kojo.肛珠 = 8; // :2153
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2155
        await era.printAndWait(
          `「啊啊啊…屁股…里面满满的全是珠子…好棒好棒啊${heart(1)}」`,
        ); // :2156
        await era.printAndWait(`「呼…没办法继续侍奉了啦…${heart(1)}」`); // :2157
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :2158
        chara(target).kojo.肛珠 = 7; // :2158
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2160
        await era.printAndWait(
          `「啊啊啊1颗珠子2颗珠子3颗珠子…哈…嗯…全部放进${sc()}的淫乱肛门了啊♪」`,
        ); // :2161
        await era.printAndWait(
          `「已经被做了这种事…${sc()}的淫乱肛门一点事都没有的啊？」`,
        ); // :2162
        await era.printAndWait(`「主人啊…更多…请更多的欺负${sc()}的肛门吧♪」`); // :2163
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :2164
        chara(target).kojo.肛珠 = 6; // :2164
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2166
        await era.printAndWait(
          `「啊嗯…啊啊啊…好厉害…全部都放进来了啊…${sc()}的屁股好厉害哟…${heart(1)}」`,
        ); // :2167
        await era.printAndWait(`「主人啊…${sc()}的屁股变的更加厉害了啊♪」`); // :2168
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :2169
        chara(target).kojo.肛珠 = 5; // :2169
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2171
        await era.printAndWait(
          `「全部放进屁股小穴里了…啊啊、肚子很奇怪的感觉、主人………」`,
        ); // :2172
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :2173
        chara(target).kojo.肛珠 = 4; // :2173
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2175
        await era.printAndWait(
          `「嗯咿…屁股…屁股变的奇怪了！明明被做这样的事…舒服……」`,
        ); // :2176
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :2177
        chara(target).kojo.肛珠 = 3; // :2177
      } else if (chara(target).kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        // :2179
        await era.printAndWait(`「啊啊啊…好难受啊…求你了…快拔出来吧…啊啊啊」`); // :2180
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :2181
        chara(target).kojo.肛珠 = 2; // :2181
      } // :2181-2182
      return 0; // :2181-2183
    } // :2184-2185
  } else if (
    era_flag.selectcom === 19 &&
    era.get(`tequip:${target}:19`) === 0
  ) {
    // :2186

    if (
      era.get(`talent:${target}:77`) === 1 &&
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛珠着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      // :2188
      await era.printAndWait(
        `「呀呼嗯嗯…不行了不行了…脑子里一片空白………${heart(1)}」`,
      ); // :2189
      await era.printAndWait(
        `${target_name}的肛门似乎很想要的样子不停的收缩………`,
      ); // :2190
      // CFLAG:379  = 6（变量语义：CFLAG 族，379） // :2191
      chara(target).kojo.肛珠着脱 = 6; // :2191
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛珠着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      // :2193
      await era.printAndWait(
        `「咿噶…哈啊啊…肛门会啊…不行了给我吧………${heart(1)}」`,
      ); // :2194
      // CFLAG:379  = 5（变量语义：CFLAG 族，379） // :2195
      chara(target).kojo.肛珠着脱 = 5; // :2195
    } else if (
      era.get(`talent:${target}:77`) === 1 &&
      (chara(target).kojo.肛珠着脱 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // :2197
      await era.printAndWait(
        `「呀嗯嗯嗯♪啊啊…对不起…${sc()}已经…不被玩弄肛门…就活不下去了………」`,
      ); // :2198
      await era.printAndWait(
        `${target_name}的肛门似乎很想要的样子不停的收缩………`,
      ); // :2199
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :2200
      chara(target).kojo.肛珠着脱 = 4; // :2200
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :2202
      await era.printAndWait(`「哈呜嗯…突然拔出什么的好过分啊…」`); // :2203
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :2204
      chara(target).kojo.肛珠着脱 = 3; // :2204
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :2206
      await era.printAndWait(`「啊啊啊…啊嗯…还没…明明没问题的…」`); // :2207
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :2208
      chara(target).kojo.肛珠着脱 = 2; // :2208
    } else if (chara(target).kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      // :2210
      await era.printAndWait(`「哈…哈…啊啊…屁股小穴…变的奇怪了………」`); // :2211
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :2212
      chara(target).kojo.肛珠着脱 = 1; // :2212
    } // :2212-2213
    return 0; // :2212-2214
  } // :2212-2215

  if (era_flag.selectcom === 20) {
    // :2220

    if (chara(target).kojo.正常位 === 0) {
      // :2222

      if (era.get(`talent:${target}:0`) === 1) {
        // :2224

        if (era.get(`talent:${target}:76`) === 1) {
          // :2226

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :2228
            await era.printAndWait(
              `${master_name}命令${target_name}就这样大张开腿………`,
            ); // :2229
            await era.printAndWait(
              `「啊啊啊…主人啊…好想看一看${sc()}破处的场景啊…不错啊…不过、认真看吧♪」`,
            ); // :2230
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              // :2232
              await era.printAndWait(
                `${assi_name}毫不客气地揉着${target_name}的大咪咪………`,
              ); // :2232
            } // :2232
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              // :2234
              await era.printAndWait(
                `「呼啊啊啊…啊…不要…好像真的好痛哟${heart(1)}」`,
              ); // :2234
            } // :2234
            await era.printAndWait(
              `${assi_name}露出嗜虐的笑容没有顾虑的挺着腰、把小鸡鸡一口气插进了最里面………`,
            ); // :2235
            await era.printAndWait(
              `「咿…咿啊啊啊…啊啊嗯！哇…嗯嗯…啊啊啊啊…被看到喽…主人看到喽${heart(1)}」`,
            ); // :2236
          } else if (era.get(`talent:${target}:314`) === 9) {
            // :2238
            await era.printAndWait(
              `「啊哈${heart(1)}…啊啊啊啊…哦、插到最里面了…咿…嗯${heart(1)}」`,
            ); // :2239
            await era.printAndWait(
              `「啊啊啊…好高兴…这已经变成魔族的小穴…奉献给主人使用的了啊………♪」`,
            ); // :2240
            await era.printAndWait(`${target_name}充满爱意地和你握住了双手………`); // :2241
            await era.printAndWait(
              `「嗯啊啊啊…啊哈${heart(1)}…小穴能侍奉主人的小鸡鸡好高兴啊${heart(1)}」`,
            ); // :2242
            await era.printAndWait(
              `「啊啊啊…更多更多…${sc()}好舒服啊${heart(1)}」`,
            ); // :2243
          } else {
            // :2244-2245
            await era.printAndWait(
              `「啊嗯${heart(1)}…已经…明明想早点失去贞洁的…等不及了${heart(1)}」`,
            ); // :2246
            await era.printAndWait(`「咕…只、只不过有一点痛…啊…啊嗯！」`); // :2247
            await era.printAndWait(
              `${target_name}忍耐着那点痛苦、让四肢抱着你………`,
            ); // :2248
            await era.printAndWait(
              `「啊啊啊…小穴终于能开始这样侍奉主人了呢…${heart(1)}」`,
            ); // :2249
          } // :2249-2250
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2252

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :2254
            await era.printAndWait(
              `${master_name}命令${target_name}就这样大张开腿………`,
            ); // :2255
            await era.printAndWait(
              `「如果是主人的命令…忍住…我会忍住的…不、不过…不、不要看…啊啊啊」`,
            ); // :2256
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              // :2258
              await era.printAndWait(
                `${assi_name}毫不客气地揉着${target_name}的大咪咪………`,
              ); // :2258
            } // :2258
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              // :2260
              await era.printAndWait(`「咕嗯！啊…啊哈啊！不要那样揉啊」`); // :2260
            } // :2260
            await era.printAndWait(
              `${assi_name}就那样被${target_name}的说法勾起了嗜虐之心、小鸡鸡强行插进了最里面………`,
            ); // :2261
            await era.printAndWait(
              `「咕啊啊啊！咿呼咿嗯…去了去了…不、不要看…不要看哎咿啊啊啊！」`,
            ); // :2262
          } else if (era.get(`talent:${target}:314`) === 9) {
            // :2264
            await era.printAndWait(
              `「啊啊啊…呜噗、让${sc()}成为魔族真是万分感激啊…像这样…啊啊啊…${heart(1)}」`,
            ); // :2265
            await era.printAndWait(
              `${target_name}感觉到被小鸡鸡插入而发出了声音、紧紧抱住了你。`,
            ); // :2266
            await era.printAndWait(
              `「太棒了…像、像恋人那样…真诚的对待什么的…啊啊啊…好开心${heart(3)}」`,
            ); // :2267
            await era.printAndWait(`${target_name}充满爱意的对你撒着娇………`); // :2268
            await era.printAndWait(
              `「不、不要紧…咿、啊啊啊…请…请按你喜欢的那样动吧…${heart(1)}」`,
            ); // :2269
          } else {
            // :2270-2271
            await era.printAndWait(
              `「哈呜…主人…把${sc()}重要的贞操交给你…真的非常开心…${heart(1)}」`,
            ); // :2272
            await era.printAndWait(
              `「完、完全不会痛…可以按主人你的喜欢行动…啊嗯」`,
            ); // :2273
            await era.printAndWait(
              `「完、完全不需要忍耐、咿嗯…啊…咕、那、我没有哭哦…啊啊！」`,
            ); // :2274
            await era.printAndWait(
              `随着${master_name}轻轻往上顶${target_name}的泪水从眼角洒落下来。`,
            ); // :2275
          } // :2275-2276
        } else {
          // :2277-2278

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :2280
            await era.printAndWait(
              `${master_name}命令${assi_name}就这样压住${target_name}、把小鸡鸡插进了秘裂中………`,
            ); // :2281
            await era.printAndWait(
              `「呀…住手…你也是勇者的一员为什么要听那种家伙的命令啊…咿啊啊啊！」`,
            ); // :2282
            await era.printAndWait(
              `${assi_name}听了${target_name}的话用鼻子发出了耻笑、毫不留情的蹂躏了贞操………`,
            ); // :2283
            await era.printAndWait(
              `即便${target_name}如此的坚强、也在抽送疼痛与屈辱的刺激下禁不住号啕大哭。`,
            ); // :2284
            await era.printAndWait(
              `「啊啊啊啊啊！哎呀哎呀！这种东西…咿咿…啊啊啊啊咿！！！」`,
            ); // :2285
          } else {
            // :2285-2286
            await era.printAndWait(
              `「哇…嗯…这、这一点也不疼…已、已经结束了吧………咿？还、还在动？」`,
            ); // :2287
            await era.printAndWait(
              `即便${target_name}如此的坚强、也在抽送疼痛与屈辱的刺激下禁不住号啕大哭。`,
            ); // :2288
            await era.printAndWait(
              `「啊啊啊啊啊！哎呀哎呀！这种东西…咿咿…啊啊啊啊咿！！！」`,
            ); // :2289

            if (era.get(`talent:${target}:317`) === 4) {
              // :2291
              await era.printAndWait(
                `「啊…啊啊啊…如果要是他的拥抱这样的话就好了…啊啊啊啊！」`,
              ); // :2292
              await era.printAndWait(
                `${target_name}一边回忆故乡的恋人一边被侵犯………`,
              ); // :2293
            } // :2293-2294
          } // :2293-2295
        } // :2296-2297
      } else {
        // :2297-2298

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :2300

          if (era.get(`talent:${target}:76`) === 1) {
            // :2302
            await era.printAndWait(`「啊…呀呀啊啊嗯${heart(1)}」`); // :2303
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              // :2304
              await era.printAndWait(
                `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
              ); // :2305
              await era.printAndWait(
                `「呼啊啊啊…啊…不要…啊嗯…好痛哟${heart(1)}」`,
              ); // :2306
            } // :2306-2307
            await era.printAndWait(
              `直到${target_name}的小穴最里面都被蹂躏着、${assi_name}在${target_name}的耳边低声说道……`,
            ); // :2308
            await era.printAndWait(
              `「是…是的…${sc()}…在主人面前…被侵犯…有感觉了…啊啊啊呜${heart(1)}」`,
            ); // :2309
            await era.printAndWait(
              `${target_name}一边露出又哭又笑的表情一边被${assi_name}侵犯着………`,
            ); // :2310
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :2312
            await era.printAndWait(
              `${assi_name}命令${target_name}就这样大张开腿………`,
            ); // :2313
            await era.printAndWait(
              `「如果是主人的命令…忍住…我会忍住的…所以…不、不要看…啊啊啊」`,
            ); // :2314
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              // :2315
              await era.printAndWait(
                `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
              ); // :2316
              await era.printAndWait(`「咕嗯！不、不痛了…啊…啊啊啊！」`); // :2317
            } // :2317-2318
            await era.printAndWait(`${assi_name}抿嘴一笑故意用腰使劲一捅………`); // :2319
            await era.printAndWait(
              `「咕啊啊啊${heart(1)} 咿咿嗯${heart(1)}…去了去了…不、不要看…不要看咿啊啊啊！」`,
            ); // :2320
            await era.printAndWait(
              `「不行了啊…在主人面前…不行了啊${heart(1)}」`,
            ); // :2321
          } else {
            // :2322-2323
            await era.printAndWait(`「咕…咕…呜…咕！」`); // :2324
            await era.printAndWait(
              `${target_name}咬着牙、忍受着${assi_name}的凌辱。`,
            ); // :2325
            await era.printAndWait(
              `${assi_name}露出嗜虐的微笑戏弄惩罚着${target_name}………`,
            ); // :2326
          } // :2326-2327
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :2329
          await era.printAndWait(
            `「啊啊啊…请让我用力的抱住吧${heart(1)} 一边用力的玩弄我吧${heart(1)}」`,
          ); // :2330
          await era.printAndWait(
            `${target_name}双手缠绕着${master_name}的身体………`,
          ); // :2331
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2333
          await era.printAndWait(`「啊嗯…哈…主人能像这样…我就非常安心了…」`); // :2334
          await era.printAndWait(`${target_name}充满爱意的对你撒着娇………`); // :2335
        } else {
          // :2336-2337
          await era.printAndWait(
            `「哈…快点…住手啊…即使被做这种事…${sc()}也…咕！」`,
          ); // :2338
        } // :2338-2339
      } // :2340-2341
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :2341
      chara(target).kojo.正常位 = 1; // :2341
      return 0; // :2341-2342
    } else {
      // :2343-2344

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2346

        if (era.get(`talent:${target}:76`) === 1) {
          // :2348
          await era.printAndWait(`「咿咿嗯${heart(1)}…啊啊啊嗯${heart(1)}」`); // :2349
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :2350
            await era.printAndWait(
              `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
            ); // :2351
            await era.printAndWait(
              `「呼啊啊啊…啊…不要…请更加温柔一点………${heart(1)}」`,
            ); // :2352
          } // :2352-2353
          await era.printAndWait(
            `直到${target_name}的小穴最里面都被蹂躏着、${assi_name}在${target_name}的耳边低声说道………`,
          ); // :2354
          await era.printAndWait(
            `「是…是的…${sc()}…在主人面前…被侵犯…有感觉了…啊啊啊呜${heart(1)}」`,
          ); // :2355
          await era.printAndWait(
            `${target_name}一边露出又哭又笑的表情一边被${assi_name}侵犯着………`,
          ); // :2356
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2358
          await era.printAndWait(
            `「啊啊啊…这样…被插到最里面了…咕嗯${heart(1)}」`,
          ); // :2359
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :2360
            await era.printAndWait(
              `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
            ); // :2361
            await era.printAndWait(`「咕嗯！不、不痛了…啊…啊啊啊！」`); // :2362
          } // :2362-2363
          await era.printAndWait(`${assi_name}抿嘴一笑故意用腰使劲一捅………`); // :2364
          await era.printAndWait(
            `「咕啊啊啊${heart(1)} 咿咿嗯${heart(1)}…啊啊…主人啊…不、不要看…不要看咿啊啊啊！」`,
          ); // :2365
          await era.printAndWait(`「不行了啊…在主人面前…不行了啊${heart(1)}」`); // :2366
        } else {
          // :2367-2368
          await era.printAndWait(`「咕…咕…呜…咕！」`); // :2369
          await era.printAndWait(
            `${target_name}咬着牙、忍受着${assi_name}的凌辱。`,
          ); // :2370
          await era.printAndWait(
            `${assi_name}露出嗜虐的微笑戏弄惩罚着${target_name}………`,
          ); // :2371
        } // :2371-2372
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2374
        if (rand_n(3) === 0) {
          // :2375
          await era.printAndWait(
            `「啊啊啊…是、是的…喜欢小穴被侵犯的瞬间${heart(1)}」`,
          ); // :2376
          await era.printAndWait(
            `「那样牢牢的抱住…不会让你离开…直到厌倦为止…侵犯我吧${heart(1)}」`,
          ); // :2377
          await era.printAndWait(`${target_name}快乐的好想脑袋都要融化了………`); // :2378
        } else if (rand_n(2) === 0) {
          // :2379
          await era.printAndWait(
            `「啊…啊啊啊…嗯…啊啊啊…更多…张开双腿哈呀…到最里面…请侵犯到最里面吧${heart(1)}」`,
          ); // :2380
          await era.printAndWait(
            `${target_name}就像那句话的那样两条大腿张开到极限、接受了小鸡鸡。`,
          ); // :2381
          await era.printAndWait(
            `「嗯咿${heart(1)}…不停的侵犯侵犯把小穴都玩坏吧${heart(1)}」`,
          ); // :2382
        } else {
          // :2382-2383
          await era.printAndWait(
            `「啊嗯${heart(1)}…啊啊啊…啊哈${heart(1)} 啊啊啊…小穴侍奉很棒吧${heart(1)}」`,
          ); // :2384
          await era.printAndWait(
            `「啊啊啊…明明要认真侍奉的…${sc()}总是很舒服的…啊啊啊啊啊啊嗯${heart(1)}」`,
          ); // :2385
          await era.printAndWait(
            `${target_name}被${player_name}给予的快乐开始提高甜蜜的声音………`,
          ); // :2386
        } // :2386-2387
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :2388
        chara(target).kojo.正常位 = 6; // :2388
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2390
        if (rand_n(3) === 0) {
          // :2391
          await era.printAndWait(
            `「嗯嗯…啊哈…${heart(1)} 到最里面喽${heart(1)}」`,
          ); // :2392
          await era.printAndWait(
            `${target_name}被插到小穴最里面提高了甜蜜的声音。`,
          ); // :2393
          await era.printAndWait(
            `「啊啊啊…${sc()}的小穴有更多的感觉…有感觉了啊${heart(1)}」`,
          ); // :2394
        } else if (rand_n(2) === 0) {
          // :2395
          await era.printAndWait(
            `「啊啊啊…更多…小穴…侵犯吧…侵犯吧…${heart(1)}」`,
          ); // :2396
          await era.printAndWait(
            `${target_name}的两腿夹住了${player_name}的腰。`,
          ); // :2397
          await era.printAndWait(
            `「嗯嗯…啊啊啊${heart(1)} 咿嗯啊啊啊…好…好棒…深深的插进去${heart(1)}」`,
          ); // :2398
        } else {
          // :2398-2399
          await era.printAndWait(`「啊嗯…嗯…主人啊…${sc()}的小穴…怎么样啊？」`); // :2400
          await era.printAndWait(
            `「啊嗯…啊…哈呜嗯嗯…${heart(1)}…可以更喜欢呢…${heart(1)}」`,
          ); // :2401
          await era.printAndWait(
            `${target_name}在${player_name}的耳边发出甜蜜的声音………`,
          ); // :2402
        } // :2402-2403
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :2404
        chara(target).kojo.正常位 = 5; // :2404
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2406
        await era.printAndWait(
          `「咕…呼…啊啊…不行了…小穴好舒服…呜…忍不住了啊…」`,
        ); // :2407
        await era.printAndWait(
          `${target_name}每次被${player_name}插到小穴最里面都会开始发出甜蜜的声音………`,
        ); // :2408
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :2409
        chara(target).kojo.正常位 = 4; // :2409
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2411
        await era.printAndWait(
          `「哇…这样的…${sc()}…忍耐一下的话…很快就结束了…嗯…啊…啊啊嗯♪」`,
        ); // :2412
        await era.printAndWait(`${target_name}开始发出一点点甜蜜的声音………`); // :2413
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :2414
        chara(target).kojo.正常位 = 3; // :2414
      } else if (chara(target).kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        // :2416
        await era.printAndWait(`「哇…呜…嗯…呜呼…嗯…咕嗯」`); // :2417
        await era.printAndWait(
          `${target_name}好像没有快感一样的拼命忍耐着不发出声音………`,
        ); // :2418
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :2419
        chara(target).kojo.正常位 = 2; // :2419
      } // :2419-2420
      return 0; // :2419-2421
    } // :2419-2422
  } // :2423-2426

  if (era_flag.selectcom === 21) {
    // :2428

    if (chara(target).kojo.背后位 === 0) {
      // :2430

      if (era.get(`talent:${target}:0`) === 1) {
        // :2432

        if (era.get(`talent:${target}:76`) === 1) {
          // :2434

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :2436
            await era.printAndWait(
              `${target_name}被命令就这样四肢扒地、像${assi_name}自己的屁股一样高高的抬起献给了你。`,
            ); // :2437
            await era.printAndWait(
              `「啊啊啊…同时被主人看见了${heart(1)}…母兽一样的姿势${heart(1)}…贞操要失去了${heart(1)}」`,
            ); // :2438
            await era.printAndWait(
              `「啊…快点…${assi_name}的小鸡鸡${heart(1)} 已经无法忍受了${heart(1)}」`,
            ); // :2439
            await era.printAndWait(
              `${target_name}一边对这种说法苦笑、一边被${assi_name}不知污秽的蹂躏着秘裂………`,
            ); // :2440
          } else if (era.get(`talent:${target}:314`) === 9) {
            // :2442
            await era.printAndWait(
              `「啊啊啊…第一次献给主人了…以这样母兽一样的姿势${heart(1)}」`,
            ); // :2443
            await era.printAndWait(
              `「对于卑贱淫乱的魔族${sc()}来说、是最相称的样子${heart(1)}」`,
            ); // :2444
            await era.printAndWait(
              `${target_name}就这样高兴的四肢爬着、一边喘着粗气一边高高的翘着屁股。`,
            ); // :2445
            await era.printAndWait(
              `「嗯…啊啊啊…请、请吧${heart(1)} 充分的蹂躏${sc()}的整个小穴吧${heart(1)}」`,
            ); // :2446
            await era.printAndWait(
              `${target_name}抱住你的腰这样乞求、把小鸡鸡插进小穴彻底的蹂躏贞操………`,
            ); // :2447
            await era.printAndWait(
              `「呼啊啊啊…啊啊啊…小鸡鸡${heart(1)}…到最里面${heart(1)}…啊啊啊…真的好厉害哦${heart(1)}」`,
            ); // :2448
          } else {
            // :2449-2450
            await era.printAndWait(
              `「啊啊嗯${heart(1)}…唔呼呼…从后面什么的…像母兽一样的被玷污了………」`,
            ); // :2451
            await era.printAndWait(
              `「看起来…非常…羞耻…但是好舒服啊${heart(1)}」`,
            ); // :2452
            await era.printAndWait(
              `${target_name}忍耐着破瓜的痛苦说着俏皮话。`,
            ); // :2453
            await era.printAndWait(
              `「嗯…哇…根、根本不痛、来吧…${sc()}处女的小穴里…请充分的让它受精吧…${heart(1)}」`,
            ); // :2454
          } // :2454-2455
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2457

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :2459
            await era.printAndWait(
              `${target_name}被命令就这样四肢扒地、像${assi_name}自己的屁股一样高高的抬起献给了你。`,
            ); // :2460
            await era.printAndWait(
              `「咕…咕呜………」${target_name}靠只剩一点点的自尊心咬着嘴唇竭力不发出声音。`,
            ); // :2461
            await era.printAndWait(
              `${assi_name}就这样毫不客气耻笑一样的蹂躏${target_name}的贞操………`,
            ); // :2462
            await era.printAndWait(`「咕…啊啊咿啊啊啊啊咿啊啊啊！！！！」`); // :2463
            await era.printAndWait(
              `看到${target_name}在屈辱和破瓜的痛苦中无法忍受的哭叫、${master_name}露出了愉悦的笑容………`,
            ); // :2464
          } else if (era.get(`talent:${target}:314`) === 9) {
            // :2466
            await era.printAndWait(
              `「啊啊嗯…${sc()}的屁股…那么有魅力？…啊嗯${heart(1)}…啊啊啊…那么温柔的抚摸…嗯${heart(1)}」`,
            ); // :2467
            await era.printAndWait(
              `${target_name}的屁股被温柔的舐着、少女发出了苦闷的呻吟。`,
            ); // :2468
            await era.printAndWait(
              `「啊啊啊…总觉得变成魔族后的肌肤…很敏感…嗯…咿啊${heart(1)} 啊哈啊${heart(1)}」`,
            ); // :2469
            await era.printAndWait(
              `「求、求你了…快点…侵犯…夺走${sc()}的贞操…${heart(1)}」`,
            ); // :2470
            await era.printAndWait(
              `${target_name}忍耐不住了苦闷的提高了声音。抱住你的腰${target_name}乞求你把小鸡鸡插进小穴蹂躏贞操………`,
            ); // :2471
            await era.printAndWait(
              `「咕啊…啊…咿…啊啊啊…到最里面来喽…${heart(1)}」`,
            ); // :2472
          } else {
            // :2473-2474
            await era.printAndWait(
              `「哈…${sc()}…像母兽一样被主人的手侵犯了…${heart(1)}」`,
            ); // :2475
            await era.printAndWait(`「也好呢…主人的话…被做什么都可以呢…」`); // :2476
            await era.printAndWait(`「全部…全部接受了…啊…啊嗯${heart(1)}」`); // :2477
            await era.printAndWait(`${target_name}把贞操献给了你…………`); // :2478
          } // :2478-2479
        } else {
          // :2480-2481

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :2483
            await era.printAndWait(
              `${master_name}命令${assi_name}就这样从后面进入了${target_name}………`,
            ); // :2484
            await era.printAndWait(
              `「咿…讨厌啊…停下啊！ 你为什么要做这种事你不也是勇者吗？」`,
            ); // :2485
            await era.printAndWait(
              `${assi_name}对${target_name}指责的呼喊用鼻子嘲笑、毫不留情的蹂躏了贞操………`,
            ); // :2486
            await era.printAndWait(
              `「啊啊啊啊啊！哎呀哎呀！这样母兽一样的姿势………咿…啊啊啊啊咿！！！」`,
            ); // :2487
            await era.printAndWait(`${target_name}咬紧牙关忍耐着破瓜的疼痛………`); // :2488
          } else {
            // :2488-2489
            await era.printAndWait(
              `「这样…母兽一样的姿势…讨厌…${sc()}明明是勇者！」`,
            ); // :2490
            await era.printAndWait(`${target_name}咬紧牙关忍耐着破瓜的疼痛………`); // :2491

            if (era.get(`talent:${target}:317`) === 4) {
              // :2493
              await era.printAndWait(
                `「啊…啊啊啊…这样的事要是把身体提前给那家伙就好了…嗯呜呜………」`,
              ); // :2494
              await era.printAndWait(
                `${target_name}回想起故乡的恋人不禁流下了眼泪………`,
              ); // :2495
            } // :2495-2496
          } // :2495-2497
        } // :2498-2499
      } else {
        // :2499-2500

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :2502

          if (era.get(`talent:${target}:76`) === 1) {
            // :2504
            await era.printAndWait(
              `${target_name}被${assi_name}从背后贯穿、发出了娇声。`,
            ); // :2505
            await era.printAndWait(`「母狗的小穴…请更多的侵犯吧${heart(1)}」`); // :2506
            await era.printAndWait(`「想要主人H的地方有很多呢${heart(1)}」`); // :2507
            await era.printAndWait(
              `${assi_name}一边露出愕然的表情一边从后面侵犯${target_name}………`,
            ); // :2508
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :2510
            await era.printAndWait(
              `「讨厌…明明是…主人以外的人…竟然被…啊啊啊啊！」`,
            ); // :2511
            await era.printAndWait(
              `${assi_name}抓住${target_name}的腰、从后面顶着………`,
            ); // :2512
            await era.printAndWait(`「哟…饶了我…请绕了我吧…主人啊…！」`); // :2513
          } else {
            // :2514-2515
            await era.printAndWait(
              `「哎呀…不要啊！这样的姿势什么的…咿呜嗯！」`,
            ); // :2516
            await era.printAndWait(
              `${assi_name}紧紧抓住${target_name}的腰毫不留情的蹂躏着………`,
            ); // :2517
          } // :2517-2518
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :2520
          await era.printAndWait(
            `「啊啊嗯…哇呜哇呜${heart(1)} ${sc()}是喜欢H的好色母狗…${heart(1)}」`,
          ); // :2521
          await era.printAndWait(`「请充分的为我受精吧${heart(1)}」`); // :2522
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2524
          await era.printAndWait(`「就这样被从后面…有感觉了…${heart(1)}」`); // :2525
          await era.printAndWait(
            `「真的…比起平时…${heart(1)} 有感觉呢…${sc()}果然是H的孩子啦…${heart(1)}」`,
          ); // :2526
        } else {
          // :2527-2528
          await era.printAndWait(`「啊啊啊…这样…母兽一样…」`); // :2529
          await era.printAndWait(
            `${target_name}被从后面侵犯的同时懊悔的低下了头………`,
          ); // :2530
        } // :2530-2531
      } // :2532-2533
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :2533
      chara(target).kojo.背后位 = 1; // :2533
      return 0; // :2533-2534
    } else {
      // :2535-2536

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2538

        if (era.get(`talent:${target}:76`) === 1) {
          // :2540
          await era.printAndWait(
            `${target_name}被${assi_name}从背后贯穿、发出了娇声。`,
          ); // :2541
          await era.printAndWait(
            `「啊啊啊…更多的侵犯母狗的小穴吧${heart(1)} 在主人的面前更多的玩弄我吧${heart(1)}」`,
          ); // :2542
          await era.printAndWait(
            `${target_name}发出淫乱的声音让一旁看着的${master_name}大笑起来。`,
          ); // :2543
          await era.printAndWait(
            `「最里面来了来了${heart(1)} 咿啊啊啊${heart(1)} 啊啊咿啊啊啊${heart(1)}」`,
          ); // :2544
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2546
          await era.printAndWait(
            `「讨厌…明明是…主人以外的人…竟然被…啊啊啊啊！」`,
          ); // :2547
          await era.printAndWait(
            `${assi_name}抓住${target_name}的腰、从后面顶着………`,
          ); // :2548
          await era.printAndWait(
            `「咿嗯啊啊啊啊呜${heart(1)} ${sc()}的小穴…主人的东西什么的${heart(1)}」`,
          ); // :2549
          await era.printAndWait(`「有感觉了…不行…不行啦${heart(1)}」`); // :2550
          await era.printAndWait(
            `被${assi_name}细细的调戏着、${target_name}的口中已经发出了甜蜜的声音………`,
          ); // :2551
        } else {
          // :2552-2553
          await era.printAndWait(`「哎呀…不要啊！这样的姿势什么的…咿啊嗯！」`); // :2554
          await era.printAndWait(
            `${assi_name}紧紧抓住${target_name}的腰毫不留情的蹂躏着。`,
          ); // :2555
          await era.printAndWait(
            `看见自己被${master_name}注意到了、${target_name}发出了哀求似的声音………`,
          ); // :2556
          await era.printAndWait(`「求你了…不要看…啊啊啊…啊！」`); // :2557
        } // :2557-2558
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2560
        if (rand_n(3) === 0) {
          // :2561
          await era.printAndWait(
            `「呀嗯嗯${heart(1)} 母狗${target_name}的淫乱小穴还要更多的被侵犯${heart(1)}」`,
          ); // :2562
          await era.printAndWait(
            `「啊哈${heart(1)}${sc()}是母狗…以这样的姿势被侵犯是最舒服的事的说${heart(1)}」`,
          ); // :2563
          await era.printAndWait(
            `${target_name}一边发出像狗一样的“哈哈”的喘息一边被侵犯………`,
          ); // :2564
        } else if (rand_n(2) === 0) {
          // :2565
          await era.printAndWait(
            `「嗯呀啊嗯…小穴被蹂躏了…四肢爬着…啊啊啊插到最里面了…${heart(1)}」`,
          ); // :2566
          await era.printAndWait(
            `「嗯嗯${heart(1)} 被插到小穴最里面了…明明应该是痛苦的…那最棒的…好棒哇${heart(1)}」`,
          ); // :2567
          await era.printAndWait(`${target_name}双手紧握着承受着快感………`); // :2568
        } else {
          // :2568-2569
          await era.printAndWait(
            `「啊啊啊啊啊${heart(1)} 大量受精了啦${heart(1)}」`,
          ); // :2570
          await era.printAndWait(
            `「${sc()}…${sc()}…就在这里要怀孕生小孩子哈呀啊…要怀孕了啦${heart(1)}」`,
          ); // :2571
          await era.printAndWait(
            `「呜啊哇${heart(1)} 因为${sc()}是母狗啊…10几20个…会生这么多啦${heart(1)}」`,
          ); // :2572
        } // :2572-2573
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :2574
        chara(target).kojo.背后位 = 6; // :2574
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2576
        if (rand_n(3) === 0) {
          // :2577
          await era.printAndWait(`「啊嗯…哈呜…更多…请给我更多………${heart(1)}」`); // :2578
          await era.printAndWait(`「更多…${sc()}变成母兽了啊！」`); // :2579
          await era.printAndWait(`${target_name}每次被插都会提高娇声………`); // :2580
        } else if (rand_n(2) === 0) {
          // :2581
          await era.printAndWait(
            `「啊啊啊啊…好美妙…被主人从后面玩弄是最高的说${heart(1)}」`,
          ); // :2582
          await era.printAndWait(
            `「${sc()}啊…是主人的”东西”…我能感觉到…啊啊啊嗯！」`,
          ); // :2583
          await era.printAndWait(`${target_name}一副陶醉的表情接纳着小鸡鸡………`); // :2584
        } else {
          // :2584-2585
          await era.printAndWait(
            `「啊啊…主人啊…更多…玩坏我吧…${sc()}被玩坏了啦！」`,
          ); // :2586
          await era.printAndWait(
            `「呀哈${heart(1)} 屁股都舒服的通红了…继续侵犯我啊${heart(1)}」`,
          ); // :2587
          await era.printAndWait(`${target_name}流出了喜悦的泪水………`); // :2588
        } // :2588-2589
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :2590
        chara(target).kojo.背后位 = 5; // :2590
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2592
        await era.printAndWait(
          `「咕…呜、咿、哈啊啊…小穴…太舒服了…什么都无法思考了………」`,
        ); // :2593
        await era.printAndWait(`「被从后面…好舒服啊………」`); // :2594
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :2595
        chara(target).kojo.背后位 = 4; // :2595
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2597
        await era.printAndWait(
          `「不、不行了…已经不行了…被从后面…嗯…啊…哈啊嗯♪」`,
        ); // :2598
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :2599
        chara(target).kojo.背后位 = 3; // :2599
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // :2601
        await era.printAndWait(`「咕…嗯…嗯…咕…啊啊啊…嗯」`); // :2602
        await era.printAndWait(
          `${target_name}被从后面侵犯的同时懊悔的低下了头………`,
        ); // :2603
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :2604
        chara(target).kojo.背后位 = 2; // :2604
      } // :2604-2605
      return 0; // :2604-2606
    } // :2604-2607
  } // :2608-2611

  if (era_flag.selectcom === 22) {
    // :2613
    if (chara(target).kojo.对面座位 === 0) {
      // :2614

      if (era.get(`talent:${target}:0`) === 1) {
        // :2616

        if (era.get(`talent:${target}:76`) === 1) {
          // :2618
          await era.printAndWait(`「哈…这个姿势好棒啊…可以由自己来破处呢…」`); // :2619
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2621
          await era.printAndWait(
            `「这样姿势什么的…主人啊…好好的…请看吧…啊啊啊！」`,
          ); // :2622
          await era.printAndWait(`${target_name}高兴的流下了眼泪、接受了你。`); // :2623
        } else {
          // :2624-2625
          await era.printAndWait(`「哇…嗯嗯…过分…自己放进去什么的…啊啊啊！」`); // :2626
        } // :2626-2627
      } else {
        // :2628-2629

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :2631

          if (era.get(`talent:${target}:76`) === 1) {
            // :2633
            await era.printAndWait(
              `${target_name}一边和${assi_name}相互接吻一边用小穴的最里面接受着小鸡鸡。`,
            ); // :2634
            await era.printAndWait(
              `「啊哈…嘛啊…咿呜嗯…更多…更多的侵犯我吧${heart(1)}…主人看啊我的那里满满的了${heart(1)}」`,
            ); // :2635
            await era.printAndWait(
              `${target_name}妖艳的把视线转了过来、提高了喘息的声音………`,
            ); // :2636
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :2638
            await era.printAndWait(
              `${target_name}一边和${assi_name}接吻一边被侵犯着。`,
            ); // :2639
            await era.printAndWait(
              `「啊…嗯…呀哎呀…主人这样的地方…明明不想被看到的…啊啊啊${heart(1)}」`,
            ); // :2640
            await era.printAndWait(
              `意识到被看见了的${target_name}提高了妖艳的声音………`,
            ); // :2641
          } else {
            // :2642-2643
            await era.printAndWait(
              `${target_name}被${assi_name}那样侵犯、发出了模糊不清的的悲鸣………`,
            ); // :2644
            await era.printAndWait(`「哦咿…啊咿…住手…嗯…呜嗯…咿！」`); // :2645
          } // :2645-2646
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :2648
          await era.printAndWait(
            `「主人啊…更加用力点啊…好好的做啊…${heart(1)}」`,
          ); // :2649
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2651
          await era.printAndWait(`「啊…嗯…咿…总觉得…有点不好意思…」`); // :2652
          await era.printAndWait(
            `「就像是…看、看起来像是情侣之间…啊嗯${heart(1)}」`,
          ); // :2653
        } else {
          // :2654-2655
          await era.printAndWait(`「啊啊啊…这样的…呀啊！从下往上顶不行啊！」`); // :2656
        } // :2656-2657
      } // :2658-2659
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :2659
      chara(target).kojo.对面座位 = 1; // :2659
      return 0; // :2659-2660
    } else {
      // :2661-2662

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2664

        if (era.get(`talent:${target}:76`) === 1) {
          // :2666
          await era.printAndWait(
            `${target_name}一边和${assi_name}相互接吻一边用小穴的最里面接受着小鸡鸡。`,
          ); // :2667
          await era.printAndWait(
            `「啊哈…嘛啊…咿呜嗯…更多…更多的侵犯我吧${heart(1)}…主人看啊我的那里满满的了${heart(1)}」`,
          ); // :2668
          await era.printAndWait(
            `${target_name}妖艳的把视线转了过来、提高了喘息的声音………`,
          ); // :2669
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2671
          await era.printAndWait(
            `${target_name}一边和${assi_name}接吻一边被侵犯着。`,
          ); // :2672
          await era.printAndWait(
            `「啊…嗯…呀哎呀…主人这样的地方…明明不想被看到的…啊啊啊${heart(1)}」`,
          ); // :2673
          await era.printAndWait(
            `意识到被看见了的${target_name}提高了妖艳的声音………`,
          ); // :2674
        } else {
          // :2675-2676
          await era.printAndWait(
            `${target_name}被${assi_name}那样侵犯、发出了模糊不清的的悲鸣…………`,
          ); // :2677
          await era.printAndWait(`「哦咿…啊咿…住手…嗯…呜嗯…咿！」`); // :2678
        } // :2678-2679
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2681
        if (rand_n(3) === 0) {
          // :2682
          await era.printAndWait(
            `「啊…啊哈…有、有点难为情、噶、脸…请不要这么看…${heart(1)}」`,
          ); // :2683
          await era.printAndWait(
            `「啊啊啊…什、什么意思…那样…不、不要看…呀嗯…顶的话…啊啊啊啊啊啊${heart(1)}」`,
          ); // :2684
          await era.printAndWait(
            `${target_name}的脸上满是沉浸在快乐中的表情………`,
          ); // :2685
        } else if (rand_n(2) === 0) {
          // :2686
          await era.printAndWait(
            `「哈哈${heart(1)} 嗯…小鸡鸡到最里面了…进来了啦${heart(1)}」`,
          ); // :2687
          await era.printAndWait(
            `「嗯…啊啊啊${heart(1)}…充分的侍奉了啊…${heart(1)}」`,
          ); // :2688
          await era.printAndWait(
            `「啊啊啊…好舒服啊…请满满的射进来吧${heart(1)}」`,
          ); // :2689
        } else {
          // :2689-2690
          await era.printAndWait(
            `「哈…啊…啊啊啊嗯${heart(1)} 吇咕吇咕的声音呜嗯${heart(1)}」`,
          ); // :2691
          await era.printAndWait(
            `「啊啊啊…好羞耻${heart(1)}明明那么羞耻${heart(1)}…腰还是停不下来${heart(1)}」`,
          ); // :2692
          await era.printAndWait(
            `「满满的射进来…射精吧…${sc()}的腰停下吧${heart(1)}」」`,
          ); // :2693
        } // :2693-2694
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :2695
        chara(target).kojo.对面座位 = 6; // :2695
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2697
        if (rand_n(3) === 0) {
          // :2698
          await era.printAndWait(`「啊嗯…啊哈呜…更多…请更用力吧…」`); // :2699
          await era.printAndWait(`「绝对…绝对不会分开…啊啊啊啊${heart(1)}」`); // :2700
          await era.printAndWait(`${target_name}用双手紧紧抱住了你………`); // :2701
        } else if (rand_n(2) === 0) {
          // :2702
          await era.printAndWait(`「这么做的话…简直就像恋人一样看见了吗…？」`); // :2703
          await era.printAndWait(`「如果是这样的话…好高兴啊${heart(1)}」`); // :2704
          await era.printAndWait(`${target_name}感受到${master_name}的嘴唇………`); // :2705
        } else {
          // :2705-2706
          await era.printAndWait(`「主人啊…更多…${sc()}好舒服啊…啊啊啊啊！」`); // :2707
          await era.printAndWait(
            `「嗯…好厉害…直到最里面都连着…哈啊${heart(1)}」`,
          ); // :2708
          await era.printAndWait(
            `${target_name}为了贪图快乐得意洋洋的扭着腰………`,
          ); // :2709
        } // :2709-2710
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :2711
        chara(target).kojo.对面座位 = 5; // :2711
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2713
        await era.printAndWait(`「啊嗯…啊啊啊啊…不行了…离不开魔王大人了…」`); // :2714
        await era.printAndWait(`「腰…离不开的…小穴不行了啊…」`); // :2715
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :2716
        chara(target).kojo.对面座位 = 4; // :2716
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2718
        await era.printAndWait(`「明明被这样…离不开魔王大人…呃…啊啊啊」`); // :2719
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :2720
        chara(target).kojo.对面座位 = 3; // :2720
      } else if (chara(target).kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        // :2722
        await era.printAndWait(`「哈…啊…啊啊啊…快点…想离开…明明…腰啊…」`); // :2723
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :2724
        chara(target).kojo.对面座位 = 2; // :2724
      } // :2724-2725
      return 0; // :2724-2726
    } // :2724-2727
  } // :2728-2731

  if (era_flag.selectcom === 23) {
    // :2733
    if (chara(target).kojo.背面座位 === 0) {
      // :2734

      if (era.get(`talent:${target}:0`) === 1) {
        // :2736

        if (era.get(`talent:${target}:76`) === 1) {
          // :2738
          await era.printAndWait(`「主人啊…我这样坐着扭腰…好棒啊」`); // :2739
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2741
          await era.printAndWait(`「主人啊…好好的…请抱紧我…啊啊啊！」`); // :2742
          await era.printAndWait(`${target_name}流下了高兴的眼泪、接纳了你。`); // :2743
        } else {
          // :2744-2745
          await era.printAndWait(`「咿！从下面…不行哦！啊啊啊！」`); // :2746
          await era.printAndWait(`${target_name}由于破处的痛苦流下了眼泪…………`); // :2747
        } // :2747-2748
      } else {
        // :2749-2750

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :2752

          if (era.get(`talent:${target}:76`) === 1) {
            // :2754
            await era.printAndWait(
              `${target_name}被${assi_name}从后面高高的顶起而发出了声音。`,
            ); // :2755
            await era.printAndWait(
              `「啊啊啊…更多…还要更多…${heart(1)} 乳房也被紧紧的抓住…啊啊啊…${heart(1)}」`,
            ); // :2756
            await era.printAndWait(
              `「主人啊…${assi_name}小姐会填满很多地方…看啊…请看啊${heart(1)}」`,
            ); // :2757
            await era.printAndWait(
              `${target_name}发出淫乱的声音、同时为了炫耀欢乐那样摇晃起了腰………`,
            ); // :2758
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :2760
            await era.printAndWait(
              `「啊…不行了…不要看…不要看啊主人…啊啊啊${heart(1)} 不、不要再欺负我了…${assi_name}………」`,
            ); // :2761
            await era.printAndWait(
              `${target_name}被${assi_name}从后面这样抱着继续侵犯。`,
            ); // :2762
            await era.printAndWait(
              `『给我好好的把腿张开吧』${assi_name}从后面轻轻的说出了命令而${target_name}服从了。`,
            ); // :2763
            await era.printAndWait(`「啊啊…哎呀…被侵犯…有感觉了…${heart(1)}」`); // :2764
          } else {
            // :2765-2766
            await era.printAndWait(
              `${target_name}被${assi_name}从后面顶到发出了痛苦的声音。`,
            ); // :2767
            await era.printAndWait(
              `「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」`,
            ); // :2768
          } // :2768-2769
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :2771
          await era.printAndWait(
            `「啊啊啊…啊哈…来玩弄${sc()}的乳房吧…小穴会紧紧的夹住的…啊啊啊啊${heart(1)}」`,
          ); // :2772
          await era.printAndWait(
            `${target_name}乳房被摸的时候发出了喘息的声音………`,
          ); // :2773
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2775
          await era.printAndWait(
            `「被主人从后面抱住了…一点都不觉得害怕…啊啊啊…呼♪」`,
          ); // :2776
          await era.printAndWait(
            `${target_name}对你撒娇般的洋洋得意地扭起腰…………`,
          ); // :2777
        } else {
          // :2778-2779
          await era.printAndWait(
            `「总觉得…怪怪的感觉…嗯…这个样子…插得好深啊…」`,
          ); // :2780
        } // :2780-2781
      } // :2782-2783
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :2783
      chara(target).kojo.背面座位 = 1; // :2783
      return 0; // :2783-2784
    } else {
      // :2785-2786

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2788

        if (era.get(`talent:${target}:76`) === 1) {
          // :2790
          await era.printAndWait(
            `${target_name}被${assi_name}从后面高高的顶起而发出了声音。`,
          ); // :2791
          await era.printAndWait(
            `「啊啊啊…更多…还要更多…${heart(1)} 乳房也被紧紧的抓住…啊啊啊…${heart(1)}」`,
          ); // :2792
          await era.printAndWait(
            `「主人啊…${assi_name}小姐会填满很多地方…看啊…请看啊${heart(1)}」`,
          ); // :2793
          await era.printAndWait(
            `${target_name}发出淫乱的声音、同时为了炫耀欢乐那样摇晃起了腰………`,
          ); // :2794
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2796
          await era.printAndWait(
            `「啊…不行了…不要看…不要看啊主人…啊啊啊${heart(1)} 不、不要再欺负我了…${assi_name}………」`,
          ); // :2797
          await era.printAndWait(
            `${target_name}被${assi_name}从后面这样抱着继续侵犯。`,
          ); // :2798
          await era.printAndWait(
            `『给我好好的把腿张开吧』${assi_name}从后面轻轻的说出了命令而${target_name}服从了。`,
          ); // :2799
          await era.printAndWait(`「啊啊…哎呀…被侵犯…有感觉了…${heart(1)}」`); // :2800
        } else {
          // :2801-2802
          await era.printAndWait(
            `${target_name}被${assi_name}从后面插进来、发出了好像很痛苦的声音。`,
          ); // :2803
          await era.printAndWait(
            `「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」`,
          ); // :2804
        } // :2804-2805
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2807
        if (rand_n(3) === 0) {
          // :2808
          await era.printAndWait(`「啊啊啊…从后面顶的好棒啊${heart(1)}」`); // :2809
          await era.printAndWait(
            `「嗯…啊啊啊啊${heart(1)} 好舒服啊…腿打开了呜嗯${heart(1)}」`,
          ); // :2810
        } else if (rand_n(2) === 0) {
          // :2811
          await era.printAndWait(
            `「呜嗯…啊啊啊${heart(1)} 身体也…被摸了…被摸了…${heart(1)}」`,
          ); // :2812
          await era.printAndWait(
            `「咿咿嗯…咿啊啊啊啊啊嗯${heart(1)} 啊啊啊嗯给我啊${heart(1)}」`,
          ); // :2813
        } else {
          // :2813-2814
          await era.printAndWait(
            `「主人啊…更多…扭动腰啊…舒服了很多啊…啊啊啊啊${heart(1)}」`,
          ); // :2815
        } // :2815-2816
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :2817
        chara(target).kojo.背面座位 = 6; // :2817
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2819
        if (rand_n(3) === 0) {
          // :2820
          await era.printAndWait(
            `「哈…啊啊啊…主人啊…请更多抚摸吧…更多…从小穴开始好了…」`,
          ); // :2821
          await era.printAndWait(
            `「嗯嗯…那、那里很好的说…更多…请随意的玩弄………${heart(1)}」`,
          ); // :2822
        } else if (rand_n(2) === 0) {
          // :2823
          await era.printAndWait(`「就这样被从后面…像主人的玩具一样………」`); // :2824
          await era.printAndWait(`「非常非常的美妙…${heart(1)}」`); // :2825
        } else {
          // :2825-2826
          await era.printAndWait(
            `「主人啊…更多…还想要更多…求你了…再给我点${heart(1)}」`,
          ); // :2827
          await era.printAndWait(
            `${target_name}得意洋洋的淫秽的扭着腰…继续发出甜美的声音………`,
          ); // :2828
        } // :2828-2829
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :2830
        chara(target).kojo.背面座位 = 5; // :2830
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2832
        await era.printAndWait(
          `「啊啊啊…呜啊咿…不、不行了…被插到最里面了…腰…停不下来了…」`,
        ); // :2833
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :2834
        chara(target).kojo.背面座位 = 4; // :2834
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2836
        await era.printAndWait(
          `「哈呜…被、被插到最里面了…哈…逃不了了啊…啊啊啊」`,
        ); // :2837
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :2838
        chara(target).kojo.背面座位 = 3; // :2838
      } else if (chara(target).kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        // :2840
        await era.printAndWait(
          `「咕…呼…咿、啊啊啊…讨厌啊…求你了…再原谅我一次………」`,
        ); // :2841
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :2842
        chara(target).kojo.背面座位 = 2; // :2842
      } // :2842-2843
      return 0; // :2842-2844
    } // :2842-2845
  } // :2846-2849

  if (era_flag.selectcom === 26) {
    // :2851

    if (chara(target).kojo.正常位肛交 === 0) {
      // :2853

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2855

        if (era.get(`talent:${target}:76`) === 1) {
          // :2857
          await era.printAndWait(
            `「啊啊啊…在主人面前…肛门被侵犯了${heart(1)}」`,
          ); // :2858
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、同时身体向后弯曲并发出娇吟。`,
          ); // :2859
          await era.printAndWait(`「哈…啊…咕啾咕啾还要…更多…更多${heart(1)}」`); // :2860
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2862
          await era.printAndWait(
            `「那里…不一样…啊啊啊…全部进来了…啊啊啊啊啊嗯${heart(1)}」`,
          ); // :2863
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、同时身体向后弯曲并发出娇吟。`,
          ); // :2864
          await era.printAndWait(
            `「有感觉了…明明那里不行的…啊…啊啊啊啊${heart(1)}」`,
          ); // :2865
          await era.printAndWait(
            `「这种地方不要看啊…主人啊…啊啊嗯${heart(1)}」`,
          ); // :2866
        } else {
          // :2867-2868
          await era.printAndWait(`「不要再做了…那里是…咿咿咿！」`); // :2869
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门同时发出悲鸣………`,
          ); // :2870
        } // :2870-2871
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :2873
        await era.printAndWait(
          `「啊啊啊…小鸡鸡在屁股小穴里顶什么的${heart(1)}」`,
        ); // :2874
        await era.printAndWait(`「皱褶收紧了好想继续啊${heart(1)}」`); // :2875
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :2877
        await era.printAndWait(`「主人啊…屁股小穴…好、好怕…」`); // :2878
        await era.printAndWait(`「但、但是…感受到主人的小鸡鸡了…呀呜嗯♪」`); // :2879
      } else {
        // :2880-2881
        await era.printAndWait(
          `「啊、啊、不行了饶了我吧、那里是…不要…啊啊啊！」`,
        ); // :2882
      } // :2882-2883
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :2884
      chara(target).kojo.正常位肛交 = 1; // :2884
      return 0; // :2884-2885
    } else {
      // :2886-2887

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2889

        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          // :2891
          await era.printAndWait(
            `「咿…啊啊啊咿…感谢主人侵犯我的肛门啊${heart(1)}」`,
          ); // :2892
          await era.printAndWait(
            `「变态淫乱的肛交狂…${target_name}的屁股小穴请主人侵犯的满满的吧${heart(1)}」`,
          ); // :2893
          await era.printAndWait(
            `「融化了呜嗯…脑袋里…全部融化了哦${heart(1)}」`,
          ); // :2894
          await era.printAndWait(
            `${target_name}沉溺于肛门被插得快乐、已经听不到${master_name}和${assi_name}的声音了吧………`,
          ); // :2895
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :2897
          await era.printAndWait(`「啊啊啊…在主人面前…被侵犯肛门${heart(1)}」`); // :2898
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、喉咙里传来阵阵娇吟。`,
          ); // :2899
          await era.printAndWait(`「咕啾咕啾还要…更多…更多${heart(1)}」`); // :2900
        } else if (era.get(`talent:${target}:77`) === 1) {
          // :2902
          await era.printAndWait(
            `「咿${heart(1)} 啊啊啊…肛门被侵犯了…啊啊啊啊${heart(1)}」`,
          ); // :2903
          await era.printAndWait(
            `「脑袋里…一片空白了啊…啊嗯…求${assi_name}大人给我！更多的侵犯${heart(1)}」`,
          ); // :2904
          await era.printAndWait(`${target_name}抱住${assi_name}哀求起来………`); // :2905
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2907
          await era.printAndWait(
            `「那里…不一样…啊啊啊…全部进来了…啊啊啊啊啊嗯${heart(1)}」`,
          ); // :2908
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、喉咙里传来阵阵娇吟。`,
          ); // :2909
          await era.printAndWait(
            `「有感觉了…明明不行的…啊…啊啊啊啊${heart(1)}」`,
          ); // :2910
          await era.printAndWait(
            `「这种地方不要看啊…主人啊…啊啊嗯${heart(1)}」`,
          ); // :2911
        } else {
          // :2912-2913
          await era.printAndWait(`「不行了…不行了…那里是…不行了啊！」`); // :2914
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门同时发出悲鸣………`,
          ); // :2915
        } // :2915-2916
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2918
        if (rand_n(3) === 0) {
          // :2919
          await era.printAndWait(
            `「哇…咿啊…啊啊啊啊啊啊…${heart(1)} 咿…肛门好棒啊${heart(1)}」`,
          ); // :2920
          await era.printAndWait(
            `「啊啊啊…已经…肛门好舒服啊…只是欺负肛门而已啊…嗯呀啊啊啊啊啊啊啊${heart(1)}」`,
          ); // :2921
          await era.printAndWait(
            `${target_name}被肛门的强烈快感弄的脑海中都融化了………`,
          ); // :2922
        } else if (rand_n(2) === 0) {
          // :2923
          await era.printAndWait(
            `「啊哈啊${heart(1)} 肛门被弄的吇咕吇咕的…咿咿${heart(1)}」`,
          ); // :2924
          await era.printAndWait(
            `「脑袋里一片空白…除了快感什么也无法思考了…${heart(1)}」`,
          ); // :2925
          await era.printAndWait(`「啊哦…哦…哈啊…咿…咿…啊啊啊啊咿～～！！！」`); // :2926
        } else {
          // :2926-2927
          await era.printAndWait(
            `「讨厌啊…肛门被这么激烈的操弄…${sc()}、${sc()}要丢了啦${heart(1)}」`,
          ); // :2928
          await era.printAndWait(
            `「所、所以…温、温柔…咿！啊啊啊啊讨厌啦…明明说了的${heart(1)}」`,
          ); // :2929
          await era.printAndWait(
            `「啊啊啊…不行了不行了不行了不行了…脑袋都融化了…已经…有肛门就够了…${heart(1)}」`,
          ); // :2930
        } // :2930-2931
        // CFLAG:327  = 9（变量语义：CFLAG 族，327） // :2932
        chara(target).kojo.正常位肛交 = 9; // :2932
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2934
        if (rand_n(2) === 0) {
          // :2935
          await era.printAndWait(
            `「呀哈…肛门被侵犯好棒啊…更多${sc()}的淫乱肛门还要更多${heart(1)}」`,
          ); // :2936
          await era.printAndWait(`「呼…啊啊啊…嘎吱嘎吱的张开了…${heart(1)}」`); // :2937
        } else {
          // :2937-2938
          await era.printAndWait(
            `「咿啊啊啊…啊哈嗯…${heart(1)} 肛门被插得融化了…${heart(1)}」`,
          ); // :2939
          await era.printAndWait(`「感觉从腰部以下都全部融化了…${heart(1)}」`); // :2940
        } // :2940-2941
        // CFLAG:327  = 8（变量语义：CFLAG 族，327） // :2942
        chara(target).kojo.正常位肛交 = 8; // :2942
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2944
        await era.printAndWait(
          `「呀哈…肛门被侵犯的好棒啊…更多${sc()}的淫乱肛门还要更多${heart(1)}」`,
        ); // :2945
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :2946
        chara(target).kojo.正常位肛交 = 7; // :2946
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2948
        await era.printAndWait(`「啊啊啊嗯…肛门被弄的吇咕吇咕的♪」`); // :2949
        await era.printAndWait(`「哈…${sc()}…最喜欢被主人插肛门了！」`); // :2950
        await era.printAndWait(
          `「肛门被主人的小鸡鸡侵犯…脑袋要发狂了嗯、粘糊糊的融化了啊！」`,
        ); // :2951
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :2952
        chara(target).kojo.正常位肛交 = 6; // :2952
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2954
        if (rand_n(2) === 0) {
          // :2955
          await era.printAndWait(`「嗯咿嗯…屁股小穴啊…褶皱呜哇…${heart(1)}」`); // :2956
          await era.printAndWait(`「褶皱里…好舒服…不行了啊」`); // :2957
        } else {
          // :2957-2958
          await era.printAndWait(
            `「如果是主人的话…被侵犯屁股小穴也没关系呀…${heart(1)}」`,
          ); // :2959
          await era.printAndWait(
            `「啊嗯…嗯…哈呜…啊啊…已经不行了…屁股小穴…融化了…」`,
          ); // :2960
        } // :2960-2961
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :2962
        chara(target).kojo.正常位肛交 = 5; // :2962
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2964
        await era.printAndWait(`「呜啊…啊…咿…屁股小穴…好舒服………」`); // :2965
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :2966
        chara(target).kojo.正常位肛交 = 4; // :2966
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :2968
        await era.printAndWait(
          `「哈嗯…啊啊啊…屁股小穴…被侵犯了…这样的感觉…好奇怪啊…」`,
        ); // :2969
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :2970
        chara(target).kojo.正常位肛交 = 3; // :2970
      } else if (
        chara(target).kojo.正常位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :2972
        await era.printAndWait(`「哇…嗯…啊…咿…哎呀…哎呀…」`); // :2973
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :2974
        chara(target).kojo.正常位肛交 = 2; // :2974
      } // :2974-2975
      return 0; // :2974-2976
    } // :2974-2977
  } // :2978-2981

  if (era_flag.selectcom === 27) {
    // :2983

    if (chara(target).kojo.背后位肛交 === 0) {
      // :2985

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :2987

        if (era.get(`talent:${target}:76`) === 1) {
          // :2989
          await era.printAndWait(
            `「啊啊啊…肛门被侵犯了${heart(1)} 在主人的面前被侵犯了…啊啊啊${heart(1)} 感觉到你的小鸡鸡了${heart(1)}」`,
          ); // :2990
          await era.printAndWait(
            `${target_name}被${assi_name}从后面贯穿了肛门、经常能听到${target_name}发出的娇吟。`,
          ); // :2991
          await era.printAndWait(
            `「${target_name}是肛门有快感的淫乱母狗…请好好的看吧${heart(1)}」`,
          ); // :2992
          await era.printAndWait(
            `${assi_name}一边对${target_name}混乱凌乱的样子苦笑一边继续侵犯她的肛门………`,
          ); // :2993
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :2995
          await era.printAndWait(
            `「求求你…不要在欺负我了…啊啊啊啊${heart(1)}」`,
          ); // :2996
          await era.printAndWait(
            `${assi_name}抱着正在哭泣的${target_name}的腰兴奋不已的继续侵犯肛门不断的抽插。`,
          ); // :2997
          await era.printAndWait(
            `「呀啊啊啊…啊啊啊…讨、讨厌啊…主人啊…不要看…不要看啊${heart(1)}」`,
          ); // :2998
          await era.printAndWait(
            `${target_name}被肛门陵辱的快感弄的慢慢开始发出喘息的声音………`,
          ); // :2999
        } else {
          // :3000-3001
          await era.printAndWait(
            `${target_name}被${assi_name}从背后摁住就这样侵犯着肛门………`,
          ); // :3002
          await era.printAndWait(`「呀哎呀啊！停下吧…求你了…啊啊啊！」`); // :3003
        } // :3003-3004
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3006
        await era.printAndWait(
          `「啊啊啊…肛门被撑大了…咿啊啊啊…好棒哦${heart(1)}」`,
        ); // :3007
        await era.printAndWait(`「肛门被侵犯的好棒哦${heart(1)}」`); // :3008
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3010
        await era.printAndWait(`「可以啊…请把${sc()}当成母兽一样侵犯吧………」`); // :3011
        await era.printAndWait(
          `「啊嗯…屁股小穴什么的…呀嗯…真的…快要变成母兽了………${heart(1)}」`,
        ); // :3012
      } else {
        // :3013-3014
        await era.printAndWait(`「这样的姿势什么的…真是的你究竟要…咕嗯！」`); // :3015
      } // :3015-3016
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :3017
      chara(target).kojo.背后位肛交 = 1; // :3017
      return 0; // :3017-3018
    } else {
      // :3019-3020

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3022

        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          // :3024
          await era.printAndWait(
            `「咕嗯咿咿咕嗯${heart(1)}淫乱变态的肛门被侵犯了${heart(1)}」`,
          ); // :3025
          await era.printAndWait(
            `「主人～${heart(1)}…像母狗一样被侵犯肛门…已经要不行了…请好好的看吧${heart(1)}」`,
          ); // :3026
          await era.printAndWait(
            `${assi_name}有点愕然的表情看着${target_name}一副融化在肛门被艹的快乐中的表情继续从后面侵犯着。`,
          ); // :3027
          await era.printAndWait(
            `「啊啊嗯${heart(1)}…咿嗯咿咿啊啊${heart(1)}…咿啊啊啊啊${heart(1)}…咿呜嗯啊嗯啊嗯啊嗯${heart(1)}」`,
          ); // :3028
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :3030
          await era.printAndWait(
            `「啊啊啊…肛门被侵犯了${heart(1)} 在主人面前被侵犯了…啊啊啊${heart(1)} 感受到你的了${heart(1)}」`,
          ); // :3031
          await era.printAndWait(
            `${target_name}被${assi_name}从后面贯穿了肛门、经常能听到${target_name}发出的娇吟。`,
          ); // :3032
          await era.printAndWait(
            `「肛门有感觉了啊…${target_name}是淫乱的母狗…请更多的看吧${heart(1)}」`,
          ); // :3033
          await era.printAndWait(
            `${assi_name}一边对${target_name}混乱凌乱的样子苦笑一边继续侵犯她的肛门………`,
          ); // :3034
        } else if (era.get(`talent:${target}:77`) === 1) {
          // :3036
          await era.printAndWait(
            `「啊…啊哈…更多的虐待我吧${heart(1)} 侵犯${sc()}的好色肛门${heart(1)}」`,
          ); // :3037
          await era.printAndWait(
            `「啊啊啊…${sc()}是…肛交狂的变态母狗…${heart(1)} 请更多的侵犯吧${heart(1)}」`,
          ); // :3038
          await era.printAndWait(
            `${assi_name}饶有兴致的抓住${target_name}的腰不停的侵犯着肛门………`,
          ); // :3039
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3041
          await era.printAndWait(
            `「求你了…不要再折磨我了…啊啊啊啊${heart(1)}」`,
          ); // :3042
          await era.printAndWait(
            `${assi_name}抱着正在哭泣的${target_name}的腰兴奋不已的继续侵犯肛门不断的抽插。`,
          ); // :3043
          await era.printAndWait(
            `「呀啊啊啊…啊啊啊…讨、讨厌啊…主人啊…不要看…不要看啊${heart(1)}」`,
          ); // :3044
          await era.printAndWait(
            `${target_name}在肛门被侵犯的快感开始慢慢的发出喘息的声音………`,
          ); // :3045
        } else {
          // :3046-3047
          await era.printAndWait(
            `${target_name}被${assi_name}从背后摁住就这样侵犯着肛门……`,
          ); // :3048
          await era.printAndWait(`「呀哎呀啊！停下吧…求你了…啊啊啊」`); // :3049
        } // :3049-3050
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3052
        if (rand_n(3) === 0) {
          // :3053
          await era.printAndWait(
            `「呜啊啊啊啊啊！…啊啊啊…呜、呜哦…肛门被艹好棒哦…${heart(1)}」`,
          ); // :3054
          await era.printAndWait(
            `${target_name}一副肛门被小鸡鸡一插就融化了的样子、从嘴里流下了口水。`,
          ); // :3055
          await era.printAndWait(
            `「${scf()}…${sc()}的事怎样都好…肛门性交…就满足了${heart(1)}」`,
          ); // :3056
          await era.printAndWait(
            `「好棒啊…肛门被小鸡鸡插进来好棒啊${heart(3)}」`,
          ); // :3057
        } else if (rand_n(2) === 0) {
          // :3058
          await era.printAndWait(
            `「嘛啊啊啊…啊…嗯…最棒了…好棒哦…${heart(1)}」`,
          ); // :3059
          await era.printAndWait(
            `「肛门张开了${heart(1)} 呀啊啊啊${heart(1)} 啊啊啊啊啊啊${heart(1)}」`,
          ); // :3060
          await era.printAndWait(
            `「肛门性交好棒啊…${sc()}…只要能肛门性交就什么都愿意做哦${heart(1)}」`,
          ); // :3061
          await era.printAndWait(
            `${target_name}一边叫着下流的话一边从肛门到头顶都沉迷于快感之中………`,
          ); // :3062
        } else {
          // :3062-3063
          await era.printAndWait(
            `「啊啊…哦${heart(1)}…哦${heart(1)} 小鸡鸡全部插进来了${heart(1)}」`,
          ); // :3064
          await era.printAndWait(
            `「被小鸡鸡吇咕吇咕的是至高无上的享受${heart(1)} 已经不需要什么小穴了${heart(1)}」`,
          ); // :3065
          await era.printAndWait(
            `「就这样…一直…只被艹肛门就是我想要的生活了${heart(1)}」`,
          ); // :3066
          await era.printAndWait(
            `${target_name}完全败给了肛门的快感、再也无法恢复了………`,
          ); // :3067
        } // :3067-3068
        // CFLAG:328  = 9（变量语义：CFLAG 族，328） // :3069
        chara(target).kojo.背后位肛交 = 9; // :3069
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3071
        if (rand_n(2) === 0) {
          // :3072
          await era.printAndWait(
            `「啊啊啊…炽热的小鸡鸡${heart(1)} 啊啊啊…肛门性交好棒哦${heart(1)}」`,
          ); // :3073
          await era.printAndWait(
            `「啊嗯啊啊啊啊…咿…更多的肛门性交啊${heart(1)}」`,
          ); // :3074
        } else {
          // :3074-3075
          await era.printAndWait(
            `「啊啊啊…啊…肛门张开了…咿${heart(1)} 嗯咿咿哦${heart(1)}」`,
          ); // :3076
          await era.printAndWait(`「啊哈啊啊咿…肛门要融化了…${heart(1)}」`); // :3077
        } // :3077-3078
        // CFLAG:328  = 8（变量语义：CFLAG 族，328） // :3079
        chara(target).kojo.背后位肛交 = 8; // :3079
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3081
        await era.printAndWait(
          `「啊啊啊…啊…肛门张开了…咿${heart(1)} 嗯咿咿哦${heart(1)}」`,
        ); // :3082
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :3083
        chara(target).kojo.背后位肛交 = 7; // :3083
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3085
        await era.printAndWait(`「啊啊啊…更多…肛门还要更多的抽插！」`); // :3086
        await era.printAndWait(`「主人的小鸡鸡…有感觉了…感觉好棒呜呜」`); // :3087
        await era.printAndWait(`「哈…主人啊…${sc()}的好色肛门…更多的侵犯吧…」`); // :3088
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :3089
        chara(target).kojo.背后位肛交 = 6; // :3089
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3091
        if (rand_n(2) === 0) {
          // :3092
          await era.printAndWait(
            `「啊嗯…咿…哈呜…屁股小穴被侵犯了…好棒哦${heart(1)}」`,
          ); // :3093
          await era.printAndWait(
            `「主人已经…${sc()}的屁股小穴、好舒服啊？…啊嗯♪」`,
          ); // :3094
        } else {
          // :3094-3095
          await era.printAndWait(
            `「啊啊啊…屁股好棒哦…主人…被侵犯的好棒哦…哈♪」`,
          ); // :3096
          await era.printAndWait(`「更多…像母兽一样屁股有感觉了！」`); // :3097
        } // :3097-3098
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :3099
        chara(target).kojo.背后位肛交 = 5; // :3099
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3101
        await era.printAndWait(
          `「啊啊啊啊…屁股小穴…喜欢上了啊…但是…主人这是不好的…啊哈${heart(1)}」`,
        ); // :3102
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :3103
        chara(target).kojo.背后位肛交 = 4; // :3103
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3105
        await era.printAndWait(`「哇…咿…啊啊…屁股小穴…被打开了…好舒服…♪」`); // :3106
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :3107
        chara(target).kojo.背后位肛交 = 3; // :3107
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :3109
        await era.printAndWait(`「嗯咿…咿…这样的…这样的…讨厌啊…啊」`); // :3110
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :3111
        chara(target).kojo.背后位肛交 = 2; // :3111
      } // :3111-3112
      return 0; // :3111-3113
    } // :3111-3114
  } // :3115-3118

  if (era_flag.selectcom === 28) {
    // :3120

    if (chara(target).kojo.对面座位肛交 === 0) {
      // :3122

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3124

        if (era.get(`talent:${target}:76`) === 1) {
          // :3126
          await era.printAndWait(
            `「啊啊啊…到最里面了…放进去了${heart(1)} 啊嗯…二个人的样子都展现主人面前了${heart(1)}」`,
          ); // :3127
          await era.printAndWait(
            `${target_name}一边和${assi_name}舌头缠绕淫乱的深吻一边扭着腰贪图肛门的快感。`,
          ); // :3128
          await era.printAndWait(`「啊啊啊…哈…屁股小穴…最棒的${heart(1)}」`); // :3129
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3131
          await era.printAndWait(
            `${target_name}一边被${assi_name}侵犯着肛门一边接吻。`,
          ); // :3132
          await era.printAndWait(
            `「哇…啊啊啊…进到肛门的尽头了…啊啊…张开了…${heart(1)}」`,
          ); // :3133
          await era.printAndWait(
            `感受到肛门扩张的快感${target_name}发出了喘息声………`,
          ); // :3134
        } else {
          // :3135-3136
          await era.printAndWait(`「呀讨厌…这样的话肛门全被看光了…咿！」`); // :3137
          await era.printAndWait(
            `${target_name}默不作声的让${assi_name}顶起了腰。`,
          ); // :3138
          await era.printAndWait(
            `${target_name}向外翻的肛门被${master_name}一目了然………`,
          ); // :3139
        } // :3139-3140
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3142
        await era.printAndWait(`「哎呀啊${heart(1)} 深点…深点呦…${heart(1)}」`); // :3143
        await era.printAndWait(`「小鸡鸡更多的欺负我吧…${heart(1)}」`); // :3144
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3146
        await era.printAndWait(
          `「主人就这样也…很喜欢呢…${sc()}现在、喜欢上了…啊嗯${heart(1)}」`,
        ); // :3147
        await era.printAndWait(`「到最里面…连接着…♪」`); // :3148
      } else {
        // :3149-3150
        await era.printAndWait(
          `「啊啊啊…那里一目了然了啊…屁股被侵犯什么的…啊啊啊…看啊…」`,
        ); // :3151
      } // :3151-3152
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :3153
      chara(target).kojo.对面座位肛交 = 1; // :3153
      return 0; // :3153-3154
    } else {
      // :3155-3156

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3158

        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          // :3160
          await era.printAndWait(
            `「啊啊啊啊${heart(1)}…已、已经不行了…没有我的允许${heart(1)}…直到肛门高潮为止…不会放你走的${heart(1)}」`,
          ); // :3161
          await era.printAndWait(
            `${target_name}抱住${assi_name}、贪图快乐一样激烈的扭着腰。`,
          ); // :3162
          await era.printAndWait(
            `肛门的结合部发出下流的声音、粘糊的肠液和小鸡鸡粘在一起………`,
          ); // :3163
          await era.printAndWait(
            `「啊啊啊…好棒${heart(1)} 好棒啊${heart(1)}…满满的…满满的玩弄我吧${heart(1)}」`,
          ); // :3164
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :3166
          await era.printAndWait(
            `「啊啊啊…到最里面了…放进去了${heart(1)} 啊嗯…二个人的样子都展现主人面前了${heart(1)}」`,
          ); // :3167
          await era.printAndWait(
            `${target_name}一边和${assi_name}舌头缠绕淫乱的深吻一边扭着腰贪图肛门的快感。`,
          ); // :3168
          await era.printAndWait(`「啊啊啊…哈…屁股小穴…最棒的${heart(1)}」`); // :3169
        } else if (era.get(`talent:${target}:77`) === 1) {
          // :3171
          await era.printAndWait(
            `「更多…更多的侵犯…${heart(1)} 肛门都张开了${heart(1)}」`,
          ); // :3172
          await era.printAndWait(
            `「肛门太舒服了…啊啊啊…已经不行了…${heart(1)} 啊啊啊…啊啊嗯${heart(1)}」`,
          ); // :3173
          await era.printAndWait(
            `${target_name}抱住${assi_name}、贪图快乐一样激烈的扭着腰………`,
          ); // :3174
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3176
          await era.printAndWait(
            `${target_name}一边被${assi_name}侵犯着肛门一边接吻。`,
          ); // :3177
          await era.printAndWait(
            `「哇…啊啊啊…进到肛门的尽头了…啊啊…张开了…${heart(1)}」`,
          ); // :3178
          await era.printAndWait(
            `感受到肛门扩张的快感${target_name}发出了喘息声………`,
          ); // :3179
        } else {
          // :3180-3181
          await era.printAndWait(`「呀讨厌…这样的话肛门全被看光了…咿！」`); // :3182
          await era.printAndWait(
            `${target_name}默不作声的让${assi_name}顶起了腰。`,
          ); // :3183
          await era.printAndWait(
            `${target_name}向外翻的肛门被${master_name}一目了然………`,
          ); // :3184
        } // :3184-3185
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3187
        if (rand_n(3) === 0) {
          // :3188
          await era.printAndWait(
            `${target_name}的肛门把${master_name}的小鸡鸡整根都吸了进去。`,
          ); // :3189
          await era.printAndWait(
            `「不、不要动了…都扩张开了…好棒啊…啊嗯${heart(1)}」`,
          ); // :3190
          await era.printAndWait(
            `肛门颤抖着、忍耐着什么似的晃动着屁股${target_name}看上去与其说是淫乱不如说是可爱。`,
          ); // :3191
          await era.printAndWait(
            `「啊哈！动、动吧、好棒…不行了…呃哈因为是肛交狂哈呀咿啊啊啊！」`,
          ); // :3192
        } else if (rand_n(2) === 0) {
          // :3193
          await era.printAndWait(
            `「啊啊嗯${heart(1)} 更多的顶吧！肛门乱七八糟的要坏了啦${heart(1)}」`,
          ); // :3194
          await era.printAndWait(
            `${target_name}自己扭着腰、粘膜紧紧的夹着小鸡鸡发出淫靡的声音	。`,
          ); // :3195
          await era.printAndWait(
            `「已经…真的…泥泞…更多更多的要疯了${heart(1)}」`,
          ); // :3196
        } else {
          // :3196-3197
          await era.printAndWait(
            `「呜啊啊啊…已经不行了不行了啊…腰无法停止直到高潮吧哈呀啊${heart(1)}」`,
          ); // :3198
          await era.printAndWait(
            `${target_name}发出像是走投无路的声音、双臂紧紧抱住${master_name}。`,
          ); // :3199
          await era.printAndWait(
            `「呀哈…啊啊啊！已经回不去了！${sc()}的肛门已经变成性交专用的洞了${heart(1)}」`,
          ); // :3200
        } // :3200-3201
        // CFLAG:329  = 9（变量语义：CFLAG 族，329） // :3202
        chara(target).kojo.对面座位肛交 = 9; // :3202
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3204
        if (rand_n(2) === 0) {
          // :3205
          await era.printAndWait(
            `「啊哈…啊啊啊${heart(1)} 好棒啊好棒啊${heart(1)}」`,
          ); // :3206
          await era.printAndWait(`${target_name}贪图快乐的自己扭着腰………`); // :3207
          await era.printAndWait(`「更多…小鸡鸡不停的侵犯${heart(1)}」`); // :3208
        } else {
          // :3208-3209
          await era.printAndWait(`「嗯嗯…肛门扩张的好棒啊…${heart(1)}」`); // :3210
          await era.printAndWait(`「脑袋里一团浆糊…${heart(1)}」`); // :3211
        } // :3211-3212
        // CFLAG:329  = 8（变量语义：CFLAG 族，329） // :3213
        chara(target).kojo.对面座位肛交 = 8; // :3213
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3215
        await era.printAndWait(
          `「啊啊啊…整根都进来了…${heart(1)} 肛门好奇怪的快感………」`,
        ); // :3216
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :3217
        chara(target).kojo.对面座位肛交 = 7; // :3217
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3219
        await era.printAndWait(`「主人啊…肛门…太舒服了啊！」`); // :3220
        await era.printAndWait(
          `「主人的小鸡鸡插到最里面了…美妙的感觉♪更多更多的侵犯我吧！」`,
        ); // :3221
        await era.printAndWait(
          `${target_name}一边流着口水一边扭腰、继续贪图着肛门的快感………`,
        ); // :3222
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :3223
        chara(target).kojo.对面座位肛交 = 6; // :3223
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3225
        if (rand_n(2) === 0) {
          // :3226
          await era.printAndWait(
            `「啊…嗯…哈…小鸡鸡侵犯…屁股小穴…好厉害的啊…」`,
          ); // :3227
          await era.printAndWait(`「更多…更多啊…♪」`); // :3228
        } else {
          // :3228-3229
          await era.printAndWait(
            `「${sc()}啊…屁股小穴要高潮了…看啊…好好的看吧…」`,
          ); // :3230
        } // :3230-3231
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :3232
        chara(target).kojo.对面座位肛交 = 5; // :3232
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3234
        await era.printAndWait(
          `「啊啊啊…这样的…完全没关系…主人给我更多的舒服啊…♪」`,
        ); // :3235
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :3236
        chara(target).kojo.对面座位肛交 = 4; // :3236
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3238
        await era.printAndWait(
          `「啊…啊啊啊！…明明不行的…好舒服…这样的…啊啊嗯♪」`,
        ); // :3239
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :3240
        chara(target).kojo.对面座位肛交 = 3; // :3240
      } else if (
        chara(target).kojo.对面座位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :3242
        await era.printAndWait(`「咕…咿…咕…快点…结束吧…呜啊啊嗯」`); // :3243
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :3244
        chara(target).kojo.对面座位肛交 = 2; // :3244
      } // :3244-3245
      return 0; // :3244-3246
    } // :3244-3247
  } // :3248-3251

  if (era_flag.selectcom === 29) {
    // :3253

    if (chara(target).kojo.背面座位肛交 === 0) {
      // :3255

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3257

        if (era.get(`talent:${target}:76`) === 1) {
          // :3259
          await era.printAndWait(
            `${target_name}像要炫耀给${master_name}看一样大张着双腿、被${assi_name}侵犯着肛门。`,
          ); // :3260
          await era.printAndWait(
            `「啊${heart(1)}…啊${heart(1)}…啊哈嗯${heart(1)}…满满的…看啊…肛门被侵犯…小穴也湿了${heart(1)}」`,
          ); // :3261
          await era.printAndWait(
            `${target_name}每次被${assi_name}顶到肛门的时候都会发出娇声、窥伺一样地凝视着${master_name}的反应………`,
          ); // :3262
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3264
          await era.printAndWait(
            `「哎呀…好、好羞耻…这样的姿势…被侵犯屁股…啊啊嗯${heart(1)}」`,
          ); // :3265
          await era.printAndWait(
            `${target_name}一边害羞、一边张开双腿间的秘处炫耀着被侵犯的肛门。`,
          ); // :3266
          await era.printAndWait(
            `「不、不行了…有感觉了不行啊…啊…啊啊嗯${heart(1)}」`,
          ); // :3267
        } else {
          // :3268-3269
          await era.printAndWait(
            `${target_name}被${assi_name}从后面顶到肛门发出了痛苦的声音。`,
          ); // :3270
          await era.printAndWait(`「哦啊…嘎咿…已经…停下吧…咿」`); // :3271
        } // :3271-3272
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3274
        await era.printAndWait(`「啊哈啊啊啊…肛门被扩张了${heart(1)}」`); // :3275
        await era.printAndWait(`「扩张的好棒啊…还要更多啊${heart(1)}」`); // :3276
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3278
        await era.printAndWait(`「马上就…但是从后面…屁股小穴什么的…」`); // :3279
        await era.printAndWait(`「更多…好好的疼爱我吧…明明想要…啊嗯♪」`); // :3280
      } else {
        // :3281-3282
        await era.printAndWait(`「呜…这、这样的姿势…啊呀…那里不能扩张！」`); // :3283
      } // :3283-3284
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :3285
      chara(target).kojo.背面座位肛交 = 1; // :3285
      return 0; // :3285-3286
    } else {
      // :3287-3288

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3290

        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          // :3292
          await era.printAndWait(
            `「啊啊啊…融化了啦…屁股小穴都变湿了${heart(1)}」`,
          ); // :3293
          await era.printAndWait(
            `${target_name}被${assi_name}就这样继续侵犯同时发出下流的悲鸣。`,
          ); // :3294
          await era.printAndWait(
            `「更多吇咕吇咕的…想要给主人展示下调教完毕的屁股小穴${heart(1)}」`,
          ); // :3295
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :3297
          await era.printAndWait(
            `${target_name}像要炫耀给${master_name}看一样大张着双腿、被${assi_name}侵犯着肛门。`,
          ); // :3298
          await era.printAndWait(
            `「啊${heart(1)}…啊${heart(1)}…啊哈嗯${heart(1)}…满满的…看啊…肛门被侵犯…小穴也湿了${heart(1)}」`,
          ); // :3299
          await era.printAndWait(
            `${target_name}每次被${assi_name}顶到肛门的时候都会发出娇声、窥伺一样地凝视着${master_name}的反应………`,
          ); // :3300
        } else if (era.get(`talent:${target}:77`) === 1) {
          // :3302
          await era.printAndWait(
            `「啊啊啊…主人大人啊…仔细的看看吧…${sc()}的”屁股小穴”看啊…${heart(1)}」`,
          ); // :3303
          await era.printAndWait(
            `${target_name}一副融化在快感中的表情一边张开双腿、展示着已经变成性器的肛门………`,
          ); // :3304
          await era.printAndWait(
            `「屁股小穴呢…小鸡鸡进来吧…已经不行了那样的东西…啊…啊啊啊啊哈${heart(1)}」`,
          ); // :3305
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3307
          await era.printAndWait(
            `「哎呀…好、好羞耻…这样的姿势…被侵犯着屁股…啊啊嗯${heart(1)}」`,
          ); // :3308
          await era.printAndWait(
            `${target_name}一边害羞、一边张开双腿间的秘处把被${assi_name}侵犯着肛门炫耀给${master_name}看。`,
          ); // :3309
          await era.printAndWait(
            `「不、不行了…有感觉不行啊…啊…啊啊嗯${heart(1)}」`,
          ); // :3310
        } else {
          // :3311-3312
          await era.printAndWait(
            `${target_name}被${assi_name}从后面顶到肛门发出了痛苦的声音。`,
          ); // :3313
          await era.printAndWait(`「哦啊…嘎咿…已经…停下吧…咿」`); // :3314
        } // :3314-3315
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3317
        if (rand_n(3) === 0) {
          // :3318
          await era.printAndWait(
            `「咿咕嗯…咿啊啊哈啊…吇咕吇咕的舒服的腰以下都要融化了一样${heart(1)}」`,
          ); // :3319
          await era.printAndWait(
            `「啊啊嗯…好好的夹紧、夹紧哈呀…充分的侵犯吧${heart(1)}」`,
          ); // :3320
          await era.printAndWait(
            `${target_name}已经完全没有了勇者的尊严、沉溺在肛门的快乐之中………`,
          ); // :3321
        } else if (rand_n(2) === 0) {
          // :3322
          await era.printAndWait(
            `${target_name}用肛门把${master_name}的小鸡鸡整根都吸了进去同时吐出了动情的气息。`,
          ); // :3323
          await era.printAndWait(
            `「哈啊啊啊啊…如果肛门能被主人艹要我什么都可以啊…${heart(1)}」`,
          ); // :3324
          await era.printAndWait(
            `在肛门的刺激让${target_name}的双眼都透露出快乐的颜色。理性完全都消失了似的。`,
          ); // :3325
          await era.printAndWait(
            `「真的什么都会做…哪怕是变成野兽和怪物的玩具${heart(1)}…所以啊…会拼命的听话的${heart(1)}」`,
          ); // :3326
        } else {
          // :3326-3327
          await era.printAndWait(
            `「还想要更多…${heart(1)} ${sc()}的这里啊…没有主人温暖的小鸡鸡不行呢${heart(1)}」`,
          ); // :3328
          await era.printAndWait(
            `「呀哈${heart(1)} 就这样用肛门套弄主人小鸡鸡${heart(1)}」`,
          ); // :3329
          await era.printAndWait(
            `${target_name}一边滴答滴答的流着口水一边夹紧了肛门………`,
          ); // :3330
        } // :3330-3331
        // CFLAG:330  = 9（变量语义：CFLAG 族，330） // :3332
        chara(target).kojo.背面座位肛交 = 9; // :3332
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3334
        if (rand_n(2) === 0) {
          // :3335
          await era.printAndWait(
            `「嗯呀啊啊啊…肛门被侵犯好幸福啊…${heart(1)}」`,
          ); // :3336
          await era.printAndWait(
            `${target_name}一副融化了一样的表情、品尝着肛门的快感………`,
          ); // :3337
        } else {
          // :3337-3338
          await era.printAndWait(
            `「哦呵呵${heart(1)} 现在只要小鸡鸡插到最里面就可以了${heart(1)}」`,
          ); // :3339
          await era.printAndWait(
            `「${sc()}的肛门是”屁股小穴”了啊${heart(1)}」`,
          ); // :3340
        } // :3340-3341
        // CFLAG:330  = 8（变量语义：CFLAG 族，330） // :3342
        chara(target).kojo.背面座位肛交 = 8; // :3342
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3344
        await era.printAndWait(
          `「嗯呵${heart(1)} 肛门张开了为了主人的小鸡鸡张开了${heart(1)}」`,
        ); // :3345
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :3346
        chara(target).kojo.背面座位肛交 = 7; // :3346
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3348
        await era.printAndWait(`「主人啊…啊…更多…更多的顶进来吧！」`); // :3349
        await era.printAndWait(
          `「哈…我知道了啊…这个”屁股小穴”什么的啊…${sc()}的肛门好厉害…变成了屁股小穴♪」`,
        ); // :3350
        await era.printAndWait(
          `${target_name}一边流着口水、一边被${master_name}继续侵犯着肛门………`,
        ); // :3351
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :3352
        chara(target).kojo.背面座位肛交 = 6; // :3352
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3354
        if (rand_n(2) === 0) {
          // :3355
          await era.printAndWait(`「啊…哈呜…嗯…更多…更多的顶…顶啊！」`); // :3356
          await era.printAndWait(`${target_name}高兴的被侵犯着肛门………`); // :3357
        } else {
          // :3357-3358
          await era.printAndWait(
            `「啊…啊啊啊…屁股小穴…好喜欢啊…更多…要死了♪」`,
          ); // :3359
          await era.printAndWait(
            `${target_name}按着屁股想要更多的感受肛门的快感………`,
          ); // :3360
        } // :3360-3361
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :3362
        chara(target).kojo.背面座位肛交 = 5; // :3362
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3364
        await era.printAndWait(`「呼呜…屁股…啊啊啊…张卡了…啊啊嗯！」`); // :3365
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :3366
        chara(target).kojo.背面座位肛交 = 4; // :3366
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3368
        await era.printAndWait(
          `「呜啊…啊…咕…屁股…有感觉了…这样的…不对的…不对的…啊啊嗯！」`,
        ); // :3369
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :3370
        chara(target).kojo.背面座位肛交 = 3; // :3370
      } else if (
        chara(target).kojo.背面座位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :3372
        await era.printAndWait(`「咕…嗯嗯…呀咿…再也…不要再往上顶了…咕嗯」`); // :3373
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :3374
        chara(target).kojo.背面座位肛交 = 2; // :3374
      } // :3374-3375
      return 0; // :3374-3376
    } // :3374-3377
  } // :3378-3381

  if (era_flag.selectcom === 30) {
    // :3383

    if (chara(target).kojo.手淫 === 0) {
      // :3385

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3387
        await era.print(''); // :3387-3388
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3390
        await era.printAndWait(
          `「唔呼呼…小鸡鸡好热…好棒啊${heart(1)} 明明只是摸了一下感觉就要来了…啊啊啊${heart(1)}」`,
        ); // :3391
        await era.printAndWait(`「没、没关系、会认真侍奉的啊………」`); // :3392
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3394
        await era.printAndWait(`「${sc()}的手…变的非常舒服了${heart(1)}」`); // :3395
        await era.printAndWait(
          `${target_name}恶作剧那样的笑着用手握住了小鸡鸡………`,
        ); // :3396
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3398
        await era.printAndWait(
          `「呜呼…这样的…温柔的套弄就好了啊…好厉害…热热的…」`,
        ); // :3399
        await era.printAndWait(`${target_name}陶醉着用手指捏住了小鸡鸡………`); // :3400
      } else {
        // :3401-3402
        await era.printAndWait(`「哇…这样的事…我才不要做呢…呀…好热…」`); // :3403
      } // :3403-3404
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :3405
      chara(target).kojo.手淫 = 1; // :3405
      return 0; // :3405-3406
    } else {
      // :3407-3408

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3410
        await era.print(''); // :3410-3411
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3413
        if (rand_n(2) === 0) {
          // :3414
          await era.printAndWait(
            `${target_name}微笑着开始套弄${player_name}的龟头。`,
          ); // :3415
          await era.printAndWait(
            `「哈…听说这样的套弄会很舒服呢哇${heart(1)}」`,
          ); // :3416
          await era.printAndWait(`「唔呼呼…还有很多…变的舒服了呐${heart(1)}」`); // :3417
        } else {
          // :3417-3418
          await era.printAndWait(`「小鸡鸡硬了…握住有用了啊${heart(1)}」`); // :3419
          await era.printAndWait(
            `「唔呼呼…要给你更多的摩擦…啊啊嗯逃避是不行的哦${heart(1)}」`,
          ); // :3420
          await era.printAndWait(
            `${target_name}一边舔着嘴唇一边开始套弄小鸡鸡………`,
          ); // :3421
        } // :3421-3422
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :3423
        chara(target).kojo.手淫 = 7; // :3423
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3425
        await era.printAndWait(
          `「啊…好热…好热啊…好像不情愿一样开始颤抖了…啊啊啊…好舒服啊${heart(1)}」`,
        ); // :3426
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :3427
        chara(target).kojo.手淫 = 6; // :3427
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3429
        if (rand_n(2) === 0) {
          // :3430
          await era.printAndWait(
            `「啊咿…主人啊…你的小鸡鸡${sc()}套弄的怎么样啊？」`,
          ); // :3431
          await era.printAndWait(`「唔呼呼…主人的弱点、${sc()}全部了解了呐♪」`); // :3432
        } else {
          // :3432-3433
          await era.printAndWait(
            `「主人的小鸡鸡…好热啊…硬起来了…好可爱的说…」`,
          ); // :3434
          await era.printAndWait(`「更多咕啾咕啾的给你哦…很舒服吧♪」`); // :3435
        } // :3435-3436
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :3437
        chara(target).kojo.手淫 = 5; // :3437
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3439
        await era.printAndWait(
          `「哈…小鸡鸡…热热的好可爱…${sc()}的手会让你更舒服的…」`,
        ); // :3440
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :3441
        chara(target).kojo.手淫 = 4; // :3441
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3443
        await era.printAndWait(
          `「哈…不要…摩擦主人的小鸡鸡…变得快乐起来了…嗯」`,
        ); // :3444
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :3445
        chara(target).kojo.手淫 = 3; // :3445
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        // :3447
        await era.printAndWait(
          `「咕…才不会做这种事…不可能的…呀啊！不、不会碰的」`,
        ); // :3448
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :3449
        chara(target).kojo.手淫 = 2; // :3449
      } // :3449-3450
      return 0; // :3449-3451
    } // :3449-3452
  } // :3453-3456

  if (era_flag.selectcom === 31) {
    // :3458

    if (chara(target).kojo.口交_奴 === 0) {
      // :3460

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3462
        await era.printAndWait(
          `${assi_name}的小鸡鸡在${target_name}一副愉快的笑容中被含了进去………`,
        ); // :3463
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3464
        await era.printAndWait(
          `「啊哈…侍奉你的小鸡鸡哦${heart(1)} 咿…嗯${heart(1)}」`,
        ); // :3465
        await era.printAndWait(
          `${target_name}露出一脸淫猥的笑容放荡的用嘴巴含住了熊吉吉………`,
        ); // :3466
        await era.printAndWait(`「咕嗯嗯…呜啾…啾噗…啾啪…嗯哦${heart(1)}」`); // :3467
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3469
        await era.printAndWait(
          `「是、是的…请让我侍奉你的小鸡鸡吧…${heart(1)}」`,
        ); // :3470
        await era.printAndWait(`${target_name}毫不犹豫的含住了小鸡鸡………`); // :3471
        await era.printAndWait(`「呜嗯…啾啪…啾…啾…啊哈…嗯哦…哈呜…嗯咕呜嗯！」`); // :3472
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3474
        await era.printAndWait(`「吸吮…请让我…咿…嗯…呼…」`); // :3475
        await era.printAndWait(
          `${target_name}不熟练的、热心的用嘴侍奉起小鸡鸡………`,
        ); // :3476
      } else {
        // :3477-3478
        await era.printAndWait(`「咕…这样的…不要…明明不想做…呜咕…嗯…」`); // :3479
      } // :3479-3480
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :3481
      chara(target).kojo.口交_奴 = 1; // :3481
      return 0; // :3481-3482
    } else {
      // :3483-3484

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3486
        await era.printAndWait(
          `${assi_name}的小鸡鸡在${target_name}一副愉快的笑容中被含了进去。`,
        ); // :3487
        await era.printAndWait(
          `但是${master_name}看不到${target_name}是怎样的表情、只有舌头侍奉的声音不断响起………`,
        ); // :3488
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3490
        if (rand_n(3) === 0) {
          // :3491
          await era.printAndWait(
            `「啊啊嗯…哈呜…啾啾…嗯哦…咕嗯嗯嗯嗯${heart(1)}」`,
          ); // :3492
          await era.printAndWait(
            `${target_name}在接到命令的一瞬间就扑向了小鸡鸡、开始进行口腔奉仕。`,
          ); // :3493
          await era.printAndWait(
            `「嗯嗯…呜啾…啾啊…嗯哦…啾啾…呼…全部射进来吧${heart(1)}」`,
          ); // :3494
        } else if (rand_n(2) === 0) {
          // :3495
          await era.printAndWait(
            `${target_name}张大嘴爱怜的反复吻着小鸡鸡的尖端然后把小鸡鸡整根吞了进去………`,
          ); // :3496
          await era.printAndWait(
            `「嘛啾…啾…谢谢主人让我能一直给主人的小鸡鸡舒服${heart(1)} 啾啾…${heart(1)}」`,
          ); // :3497
          await era.printAndWait(
            `「啊…哈呜嗯…嗯…啾啪啾呜嗯${heart(1)} 啊啊啊…我能忍住的…全射出来吧…${heart(1)}」`,
          ); // :3498
        } else {
          // :3498-3499
          await era.printAndWait(
            `「嗯哦…啾…嗯哦…啾${heart(1)} 啊啊啊…小鸡鸡有点脏了呢${heart(1)}」`,
          ); // :3500
          await era.printAndWait(
            `「会让小鸡鸡重新变的漂漂亮亮的…所以啊…请让我来主导小鸡鸡吧${heart(1)}」`,
          ); // :3501
          await era.printAndWait(
            `${target_name}用舌头从根部一直舔到龟头、就像是要把污秽全舔下来似得………`,
          ); // :3502
        } // :3502-3503
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :3504
        chara(target).kojo.口交_奴 = 5; // :3504
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3506
        if (rand_n(3) === 0) {
          // :3507
          await era.printAndWait(`「小鸡鸡…会很温柔的侍奉的…${heart(1)}」`); // :3508
          await era.printAndWait(
            `「啊…是的…舒服的话…就这样在我的嘴里射出来吧${heart(1)}」`,
          ); // :3509
          await era.printAndWait(`${target_name}陶醉的继续进行口腔侍奉………`); // :3510
        } else if (rand_n(2) === 0) {
          // :3511
          await era.printAndWait(`「哈啊…吸吮的完全停不下来…${heart(1)}」`); // :3512
          await era.printAndWait(
            `${target_name}一边流着眼泪一边热心的继续口腔侍奉。`,
          ); // :3513
          await era.printAndWait(`「呜嗯…嗯噗…啾…嗯哦…咕…呼${heart(1)}」`); // :3514
        } else {
          // :3514-3515
          await era.printAndWait(
            `「咕…噗…啾…嗯哦…咕啊…小鸡鸡…让我更多的含吧………」`,
          ); // :3516
          await era.printAndWait(
            `「哈…小鸡鸡真美味…更多的让我舔舔吧…${heart(1)}」`,
          ); // :3517
          await era.printAndWait(
            `${target_name}连滴落的口水也来不及擦的继续热心的进行口腔侍奉………`,
          ); // :3518
        } // :3518-3519
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :3520
        chara(target).kojo.口交_奴 = 4; // :3520
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3522
        await era.print(`「嗯…哈…啊…能吸吮主人的小鸡鸡…这样的…好开心…」`); // :3523
        await era.printAndWait(
          `「啊啊…总觉得…真的…喜欢上小鸡鸡了…啾啪…吇咕…呼呜♪」`,
        ); // :3524
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :3525
        chara(target).kojo.口交_奴 = 3; // :3525
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        // :3527
        await era.printAndWait(`「哈…哈…嗯…嗯…更多…不含不行…？嗯…呜嗯！」`); // :3528
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :3529
        chara(target).kojo.口交_奴 = 2; // :3529
      } // :3529-3530
      return 0; // :3529-3531
    } // :3529-3532
  } // :3533-3536

  if (era_flag.selectcom === 32) {
    // :3538

    if (chara(target).kojo.乳交 === 0) {
      // :3540

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3542
        await era.print(''); // :3542-3543
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3545
        await era.printAndWait(
          `「乳房这样…夹住………啊啊啊、变的好可爱的说${heart(1)}」`,
        ); // :3546
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :3548
          await era.printAndWait(`「啊哈…所以大乳房…好舒服啊…${heart(1)}」`); // :3548
        } // :3548
        await era.printAndWait(`「嗯呼…舒服吗？小鸡鸡舒服吗？」`); // :3549
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3551
        await era.printAndWait(`「啊哈…侍奉你的小鸡鸡…${heart(1)}」`); // :3552
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :3554
          await era.printAndWait(`「嗯…${sc()}的乳房…这么大一定很舒服吧？」`); // :3554
        } // :3554
        await era.printAndWait(
          `「哈…乳房都被烫伤了呢…被火热的小鸡鸡…${heart(1)}」`,
        ); // :3555
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3557
        await era.printAndWait(`「${sc()}引以为傲的乳房、摩擦你的小鸡鸡…」`); // :3558
        await era.printAndWait(`「嗯…啊哈…啊…总觉得…变的奇怪了…」`); // :3559
      } else {
        // :3560-3561
        await era.printAndWait(`「呜哇…咿…啊…小鸡鸡…好热…乳房啊………」`); // :3562
      } // :3562-3563
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :3564
      chara(target).kojo.乳交 = 1; // :3564
      return 0; // :3564-3565
    } else {
      // :3566-3567

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3569
        await era.print(''); // :3569-3570
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3572
        if (rand_n(2) === 0) {
          // :3573
          await era.printAndWait(
            `「啊啊啊…热热的小鸡鸡…乳房被侵犯了${heart(1)}」`,
          ); // :3574
          await era.printAndWait(
            `${target_name}的两个乳房温柔的夹住小鸡鸡、继续爱抚………`,
          ); // :3575
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :3577
            await era.printAndWait(
              `「啊哈…更多的侵犯吧…${sc()}的大乳房就是为了被侵犯而存在的！」`,
            ); // :3577
          } // :3577
          await era.printAndWait(
            `「啊啊啊…好高兴…小鸡鸡在${sc()}的乳房里闹腾${heart(1)}」`,
          ); // :3578
        } else {
          // :3578-3579
          await era.printAndWait(`「呀呼…乳房好舒服啊${heart(1)}」`); // :3580
          await era.printAndWait(
            `${target_name}的眼神慢慢的融化了、温柔的抬起两个乳房开始摩擦小鸡鸡………`,
          ); // :3581
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :3583
            await era.printAndWait(
              `「${sc()}的大乳房…是为了侍奉小鸡鸡而存在的………」`,
            ); // :3583
          } // :3583
          await era.printAndWait(
            `「啊啊啊…侍奉好舒服啊…脑袋里都融化了…${heart(3)}」`,
          ); // :3584
        } // :3584-3585
        // CFLAG:333  = 7（变量语义：CFLAG 族，333） // :3586
        chara(target).kojo.乳交 = 7; // :3586
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3588
        await era.printAndWait(`「啊啊啊…乳房侍奉好棒啊…${heart(1)}」`); // :3589
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :3591
          await era.printAndWait(
            `「啊哈…乳房把小鸡鸡整个夹住了…怎么样啊…舒服吗？」`,
          ); // :3591
        } // :3591
        await era.printAndWait(
          `「嗯啊啊啊啊…乳房上全是小鸡鸡的味道…好幸福…${heart(1)}」`,
        ); // :3592
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :3593
        chara(target).kojo.乳交 = 6; // :3593
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3595
        if (rand_n(2) === 0) {
          // :3596
          await era.printAndWait(
            `「哈…这样就让小鸡鸡开始颤抖了…${sc()}的乳房感觉很满足啊♪」`,
          ); // :3597
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :3599
            await era.printAndWait(
              `「小鸡鸡被乳房夹的看不见了…啊哈${heart(1)}」`,
            ); // :3599
          } // :3599
          await era.printAndWait(
            `「唔呼呼、这么舒服啊…会让你更多更多的舒服的♪」`,
          ); // :3600
        } else {
          // :3600-3601
          await era.printAndWait(`「${sc()}的乳房…这样为你的小鸡鸡侍奉………」`); // :3602
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            // :3604
            await era.printAndWait(
              `「这样的大乳房…一直都认为是碍事啊…啊啊啊${heart(1)}」`,
            ); // :3604
          } // :3604
          await era.printAndWait(
            `「是的…非常幸福…你的小鸡鸡大人…${sc()}的乳房会侍奉的更舒服的♪」`,
          ); // :3605
        } // :3605-3606
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :3607
        chara(target).kojo.乳交 = 4; // :3607
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3609
        await era.printAndWait(`「啊嗯…${sc()}的乳房里…小鸡鸡在闹腾♪」`); // :3610
        await era.printAndWait(`「这样闹腾的话…不行了…呀…啊、啊啊嗯♪」`); // :3611
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :3612
        chara(target).kojo.乳交 = 3; // :3612
      } else if (chara(target).kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        // :3614
        await era.printAndWait(`「呜啊…啊啊啊…你、你这个变态………咕」`); // :3615
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :3616
        chara(target).kojo.乳交 = 2; // :3616
      } // :3616-3617
      return 0; // :3616-3618
    } // :3616-3619
  } // :3620-3623

  if (era_flag.selectcom === 33) {
    // :3625

    if (chara(target).kojo.股间性交 === 0) {
      // :3627

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3629
        await era.print(''); // :3629-3630
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3632
        await era.printAndWait(
          `「啊啊啊…小鸡鸡好热啊${heart(1)}…嗯已经…小穴好想要啊………！」`,
        ); // :3633
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3635
        await era.printAndWait(`「呜噗…啊啊啊…总觉得这…不可思议的感觉…」`); // :3636
        await era.printAndWait(
          `「啊啊啊…小鸡鸡…被这样也会舒服啊…${heart(1)}」`,
        ); // :3637
      } else {
        // :3638-3639
        await era.printAndWait(`「没、没关系这样的…马上就舒服了…」`); // :3640
      } // :3640-3641
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :3642
      chara(target).kojo.股间性交 = 1; // :3642
      return 0; // :3642-3643
    } else {
      // :3644-3645

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3647
        await era.printAndWait(''); // :3647-3648
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3650
        await era.printAndWait(
          `「好坏啊好坏啊…${sc()}明明想早点用小穴来侍奉的！」`,
        ); // :3651
        await era.printAndWait(
          `「啊啊啊…主人啊…比起这样在小穴门口摩擦…插进小穴里面一定会更舒服吧${heart(1)}」`,
        ); // :3652
        await era.printAndWait(
          `「咕嗯${heart(1)}…啊啊、会认真的侍奉…快点…快点…破了我的处女膜吧！」`,
        ); // :3653
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :3654
        chara(target).kojo.股间性交 = 6; // :3654
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3656
        await era.printAndWait(
          `「啊啊啊啊啊…会认真的让你舒服…所以啊…请赏赐给我吧…啊啊啊${heart(1)}」`,
        ); // :3657
        await era.printAndWait(`「哈呜…好想要继续啊…啊啊啊啊${heart(1)}」`); // :3658
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :3659
        chara(target).kojo.股间性交 = 5; // :3659
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3661
        await era.printAndWait(
          `「呜啊…啊啊啊啊啊…主人啊…都到了这里、明明知道…小鸡鸡…还不插进来吗？」`,
        ); // :3662
        await era.printAndWait(
          `「啊啊啊…所这样下去…可能会误插进来的…咿嗯♪…说不定…？」`,
        ); // :3663
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :3664
        chara(target).kojo.股间性交 = 4; // :3664
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3666
        await era.printAndWait(
          `「啊啊啊…小鸡鸡…感觉好烫啊…咿嗯…啊啊…还没插进来…」`,
        ); // :3667
        await era.printAndWait(`「主人啊…求你了…大人…好热…好像要！啊啊啊！」`); // :3668
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :3669
        chara(target).kojo.股间性交 = 3; // :3669
      } else if (chara(target).kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        // :3671
        await era.printAndWait(`「咕…嗯…啊啊啊…小鸡鸡好烫…好烫啊…」`); // :3672
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :3673
        chara(target).kojo.股间性交 = 2; // :3673
      } // :3673-3674
      return 0; // :3673-3675
    } // :3673-3676
  } // :3677-3680

  if (era_flag.selectcom === 34) {
    // :3682
    if (chara(target).kojo.骑乘位 === 0) {
      // :3683

      if (era.get(`talent:${target}:0`) === 1) {
        // :3685

        if (era.get(`talent:${target}:76`) === 1) {
          // :3687

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :3689
            await era.printAndWait(
              `${master_name}命令${target_name}就这样跨坐在${assi_name}上面。`,
            ); // :3690
            await era.printAndWait(
              `「唔呼呼、请多多指教${assi_name}小姐${heart(1)} 请细细品尝${sc()}的处女吧♪」${target_name}这样说道同时轻轻的眨了眨眼睛。`,
            ); // :3691
            await era.printAndWait(
              `${assi_name}对这样的态度苦笑着、${target_name}的腰慢慢的向着小鸡鸡坐了下来。`,
            ); // :3692
            await era.printAndWait(
              `「啊…啊啊啊…插进来了…哇…呼啊…啊啊啊啊啊嗯！」`,
            ); // :3693
          } else if (era.get(`talent:${target}:314`) === 9) {
            // :3695
            await era.printAndWait(
              `「啊啊嗯${heart(1)}…”献上处女”什么的…现在的最高命令啊………♪」`,
            ); // :3696
            await era.printAndWait(
              `${target_name}慢慢的抓住小鸡鸡引向自己的小穴。`,
            ); // :3697
            await era.printAndWait(
              `「啊…请仔细的看吧…${sc()}的魔族小穴啊…马上要变成主人的东西了………呜嗯！！！」`,
            ); // :3698
            await era.printAndWait(
              `一边忍受着破处的痛苦${target_name}一边把小鸡鸡整根吞了进去。`,
            ); // :3699
            await era.printAndWait(`「啊哈…啊啊咿…好厉害…还想要更多的………♪」`); // :3700
            await era.printAndWait(
              `「这样下去啊…继续侍奉小鸡鸡…啊啊啊…充分的标志着新品的小穴${heart(1)}」`,
            ); // :3701
          } else {
            // :3702-3703
            await era.printAndWait(
              `「啊啊啊…好羞耻啊…${sc()}的处女膜到此为止被破坏了…请看啊${heart(1)}」`,
            ); // :3704
            await era.printAndWait(
              `${target_name}露出淫猥的笑容把小鸡鸡导向了自己的小穴。`,
            ); // :3705
            await era.printAndWait(
              `「唔呼呼…从这里开始…这是我的第一次${heart(1)}」`,
            ); // :3706
            await era.printAndWait(
              `「啊啊啊…充分的品味…咕…呼…啊啊啊咿啊啊啊！」`,
            ); // :3707
            await era.printAndWait(
              `${target_name}破处那难以忍受的痛苦大叫起来。`,
            ); // :3708
            await era.printAndWait(
              `「哇…哈哈…来、来吧…就这样开始小穴侍奉吧…好满足…好舒服啊${heart(1)}」`,
            ); // :3709
          } // :3709-3710
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3712

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :3714
            await era.printAndWait(
              `${master_name}命令${target_name}就这样跨坐在${assi_name}的腰上。`,
            ); // :3715
            await era.printAndWait(`「啊…啊啊啊…但是…果、果然………呀嗯嗯！？」`); // :3716
            await era.printAndWait(
              `${master_name}抓住${target_name}的腰立起来让${assi_name}的小鸡鸡强行插入。`,
            ); // :3717
            await era.printAndWait(`「嗯…啊…啊啊啊…${sc()}的…第一次…嗯……！」`); // :3718
          } else if (era.get(`talent:${target}:314`) === 9) {
            // :3720
            await era.printAndWait(`「身体变成这样后…不知道登了多久………♪」`); // :3721
            await era.printAndWait(
              `「啊啊啊…太好了…自己献出贞操什么的${heart(1)}」`,
            ); // :3722
            await era.printAndWait(
              `${target_name}高兴的笑着、把小鸡鸡引向了小穴。`,
            ); // :3723
            await era.printAndWait(
              `「哇…嗯嗯…啊…哈啊嗯！ 啊啊啊…啊啊啊…厉害…小鸡鸡好烫啊…${heart(1)}」`,
            ); // :3724
            await era.printAndWait(
              `「主人的小鸡鸡好烫啊…啊哈啊…感受到了${heart(1)}」`,
            ); // :3725
            await era.printAndWait(
              `配合着${target_name}兴奋的心情、展开了翅膀………`,
            ); // :3726
          } else {
            // :3727-3728
            await era.printAndWait(
              `「唔呼呼…这样的日子终于来了…${sc()}、太感激了…${heart(1)}」`,
            ); // :3729
            await era.printAndWait(`「啊啊啊…没关系…主人…请开始动吧…」`); // :3730
            await era.printAndWait(
              `${target_name}提心吊胆的用手把小鸡鸡引向了小穴。`,
            ); // :3731
            await era.printAndWait(
              `「咕…哇…咿、啊啊！主人的…到最里面了…全部…插进来了哈呀咿…」`,
            ); // :3732
            await era.printAndWait(
              `${target_name}的小穴里被${master_name}的小鸡鸡弄的快要哭了。`,
            ); // :3733
            await era.printAndWait(
              `「哎嘿嘿…这样${sc()}就送给主人了、以后${sc()}的生命就只剩下主人了………」`,
            ); // :3734
            await era.printAndWait(
              `${target_name}害羞的笑着、忍受着破处的痛苦慢慢的开始扭腰了………`,
            ); // :3735
          } // :3735-3736
        } else {
          // :3737-3738

          if (era_flag.assi > 0 && era_flag.assiplay) {
            // :3740
            await era.printAndWait(
              `如${master_name}命令的那样${target_name}跨坐在了${assi_name}的腰上。`,
            ); // :3741
            await era.printAndWait(
              `「求、求你了…饶了我…饶了我…这样的…不行、总觉得不行啊………」`,
            ); // :3742
            await era.printAndWait(
              `${assi_name}嘲笑着抓住了${target_name}的腰、强行把小鸡鸡插进了小穴的最里面。`,
            ); // :3743
            await era.printAndWait(
              `「啊啊啊！啊！这样讨厌啊！啊啊啊！…痛…好痛啊！」`,
            ); // :3744
          } else {
            // :3744-3745
            await era.printAndWait(`「不、不要这样…这样的…呜…！」`); // :3746
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰强行把小鸡鸡插进了最里面。`,
            ); // :3747
            await era.printAndWait(
              `「啊啊啊！啊！这样讨厌啊！啊啊啊！…痛…好痛啊！」`,
            ); // :3748

            if (era.get(`talent:${target}:317`) === 4) {
              // :3750
              await era.printAndWait(
                `「哈哈…这样…如果是坐在那家伙上面的话就好了…呜呜………」`,
              ); // :3751
              await era.printAndWait(
                `${target_name}想起了故乡的恋人不禁流下了眼泪……`,
              ); // :3752
            } // :3752-3753
          } // :3752-3754
        } // :3755-3756
      } else {
        // :3756-3757

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :3759

          if (era.get(`talent:${target}:76`) === 1) {
            // :3761
            await era.printAndWait(
              `「啊啊嗯${heart(1)}…哈…全部插进来了啊…${heart(1)}」`,
            ); // :3762
            await era.printAndWait(
              `${target_name}扑哧一声笑了、一副舒服的样子慢慢的扭起腰。`,
            ); // :3763
            await era.printAndWait(
              `「满满、满满的享受吧…为了不让主人看的无聊…${heart(1)} 啊啊嗯${heart(1)}」`,
            ); // :3764
            await era.printAndWait(
              `${target_name}高兴的在${assi_name}的腰上扭动………`,
            ); // :3765
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :3767
            await era.printAndWait(`「主人的…命令…咿…哇…呜嗯………」`); // :3768
            await era.printAndWait(
              `${target_name}横跨在${assi_name}上面一边犹豫不决的用小穴最里面接受了小鸡鸡。`,
            ); // :3769
            await era.printAndWait(
              `「哈…哈…啊啊…啊啊啊…有感觉了…明明不行的…啊啊啊${heart(1)}」`,
            ); // :3770
            await era.printAndWait(
              `${target_name}困惑着在秘处的快乐下发出了声音………`,
            ); // :3771
          } else {
            // :3772-3773
            await era.printAndWait(
              `${master_name}命令${target_name}跨坐在${assi_name}的腰上。`,
            ); // :3774
            await era.printAndWait(`「这样的…讨厌…但是…哇…嗯…咿呜嗯！」`); // :3775
            await era.printAndWait(
              `${target_name}羞耻的红着脸让${assi_name}的小鸡鸡插进了小穴的最里面………`,
            ); // :3776
          } // :3776-3777
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :3779
          await era.printAndWait(
            `「哈…这样跨坐着…真是卑猥但是又很美妙啊${heart(1)}」`,
          ); // :3780
          await era.printAndWait(`「充分的侍奉小鸡鸡、好舒服哦♪」`); // :3781
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3783
          await era.printAndWait(
            `「啊啊…跨坐在主人主人…啊啊啊…不、不行了…那样的地方不要看…求你了…」`,
          ); // :3784
          await era.printAndWait(`「嗯…啊啊啊…深点…主人的…感觉…♪」`); // :3785
        } else {
          // :3786-3787
          await era.printAndWait(`「咕…啊啊啊…插进最里面了…好痛苦啊………」`); // :3788
        } // :3788-3789
      } // :3790-3791
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :3791
      chara(target).kojo.骑乘位 = 1; // :3791
      return 0; // :3791-3792
    } else {
      // :3793-3794

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3796

        if (era.get(`talent:${target}:76`) === 1) {
          // :3798
          await era.printAndWait(
            `「啊啊嗯${heart(1)}…哈…全部插进来了啊…${heart(1)}」`,
          ); // :3799
          await era.printAndWait(
            `${target_name}扑哧一声笑了、一副舒服的样子慢慢的扭起腰。`,
          ); // :3800
          await era.printAndWait(
            `「满满、满满的享受吧…为了不让主人看的无聊…${heart(1)} 啊啊嗯${heart(1)}」`,
          ); // :3801
          await era.printAndWait(
            `${target_name}高兴的在${assi_name}的腰上扭动………`,
          ); // :3802
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3804
          await era.printAndWait(`「主人的…命令…咿…哇…呜嗯………」`); // :3805
          await era.printAndWait(
            `${target_name}横跨在${assi_name}上面一边犹豫不决的用小穴最里面接受了小鸡鸡。`,
          ); // :3806
          await era.printAndWait(
            `「哈…哈…啊啊…啊啊啊…有感觉了…明明不行的…啊啊啊${heart(1)}」`,
          ); // :3807
          await era.printAndWait(
            `${target_name}困惑着在秘处的快乐下发出了声音………`,
          ); // :3808
        } else {
          // :3809-3810
          await era.printAndWait(`「这样的…讨厌…但是…哇…嗯…咿呜嗯！」`); // :3811
          await era.printAndWait(
            `${target_name}羞耻的红着脸在${assi_name}的腰上上下的扭动………`,
          ); // :3812
        } // :3812-3813
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3815
        if (rand_n(4) === 0) {
          // :3816
          await era.printAndWait(
            `${target_name}深深的叹息、淫荡的脸向着${player_name}。`,
          ); // :3817
          await era.printAndWait(
            `「这样连着的话…侍奉着有种幸福的感觉啊${heart(1)}」`,
          ); // :3818
          await era.printAndWait(
            `「所以啊…全部…全部交给${sc()}吧${heart(1)} 啊啊啊啊嗯！」`,
          ); // :3819
        } else if (rand_n(3) === 0) {
          // :3820
          await era.printAndWait(
            `「呀嗯…好舒服…好棒${heart(1)} 这样主人的小鸡鸡也可以舒服了吧………」`,
          ); // :3821
          await era.printAndWait(`${target_name}扑哧一笑在腰上淫乱的扭动。`); // :3822
          await era.printAndWait(
            `「更多更多…小穴好舒服…脑袋里满满的全是小鸡鸡${heart(1)}」`,
          ); // :3823
        } else if (rand_n(2) === 0) {
          // :3824
          await era.printAndWait(
            `「呀啊嗯…不要动了…如果再顶的话咿啊啊啊啊${heart(1)}」`,
          ); // :3825
          await era.printAndWait(
            `「哦呼…哦…子宫口咕叽咕叽的不行了${heart(1)} 子宫感觉太强啦…啊呀啊啊啊啊${heart(1)}」`,
          ); // :3826
          await era.printAndWait(
            `${target_name}配合着${player_name}小鸡鸡的撞击发出淫靡的呻吟………`,
          ); // :3827
        } else {
          // :3827-3828
          await era.printAndWait(
            `「啊啊啊啊…啊…呼${heart(1)} 吇咕吇咕好棒哦${heart(1)}」`,
          ); // :3829
          await era.printAndWait(
            `${target_name}前后扭着腰、充分品味着小鸡鸡带来的快乐。`,
          ); // :3830
          await era.printAndWait(`「不想离开这里了${heart(1)} 啊啊啊啊！」`); // :3831
        } // :3831-3832
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :3833
        chara(target).kojo.骑乘位 = 6; // :3833
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3835
        if (rand_n(4) === 0) {
          // :3836
          await era.printAndWait(`「啊啊啊…主人啊…好喜欢啊…」`); // :3837
          await era.printAndWait(`「主人的小鸡鸡…好舒服啊呀…啊啊嗯♪」`); // :3838
          await era.printAndWait(`${target_name}撒娇似得前后扭动着腰……`); // :3839
        } else if (rand_n(3) === 0) {
          // :3840
          await era.printAndWait(`「啊…啊啊啊啊…怎么样啊…这样扭腰？」`); // :3841
          await era.printAndWait(`「主人有感觉了…学到了呢…呀嗯嗯♪」`); // :3842
          await era.printAndWait(
            `${target_name}淫猥的扭着腰、发出了可爱的声音………`,
          ); // :3843
        } else if (rand_n(2) === 0) {
          // :3844
          await era.printAndWait(`「呀嗯！主人不要动…啊嗯啊啊啊～！」`); // :3845
          await era.printAndWait(
            `「不行不行了！${sc()}的方法好舒服！呀嗯嗯！」`,
          ); // :3846
          await era.printAndWait(
            `${target_name}配合着小鸡鸡的撞击发出淫靡的呻吟………`,
          ); // :3847
        } else {
          // :3847-3848
          await era.printAndWait(`「呼啊嗯…像这样主人的小鸡鸡…插到里面…」`); // :3849
          await era.printAndWait(
            `「非常幸福的感觉…呀嗯、不行了…还要更大的动作啊…啊嗯！」`,
          ); // :3850
        } // :3850-3851
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :3852
        chara(target).kojo.骑乘位 = 5; // :3852
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3854
        if (rand_n(4) === 0) {
          // :3855
          await era.printAndWait(
            `「咕…啊啊啊…自己放进去…高兴着什么啊…啊啊啊啊！」`,
          ); // :3856
          await era.printAndWait(
            `「哈呜…不行了…腰擅自动作不行啊…啊啊啊啊啊啊！」`,
          ); // :3857
        } else if (rand_n(3) === 0) {
          // :3858
          await era.printAndWait(`「啊啊啊啊…啊…小穴…好舒服…小穴太舒服了…」`); // :3859
          await era.printAndWait(`「随便…腰…动吧…小穴不行了呜呜呜♪」`); // :3860
        } else if (rand_n(2) === 0) {
          // :3861
          await era.printAndWait(`「咕啊…哈…不要…再插进来了…」`); // :3862
          await era.printAndWait(
            `${player_name}指出了是${target_name}自己动的………`,
          ); // :3863
          await era.printAndWait(
            `「哎…咿、不要…嘘…不一样的…${sc()}是不会动的…啊啊～！」`,
          ); // :3864
        } else {
          // :3864-3865
          await era.printAndWait(
            `「被命令…明明只是动动而已…好舒服呐…啊啊啊啊！」`,
          ); // :3866
        } // :3866-3867
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :3868
        chara(target).kojo.骑乘位 = 4; // :3868
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3870
        await era.printAndWait(`「这样…做…动了就行了吧…呼啊啊！啊嗯！」`); // :3871
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :3872
        chara(target).kojo.骑乘位 = 3; // :3872
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :3874
        await era.printAndWait(`「啊啊啊…好…好难受啊…嗯…嗯…」`); // :3875
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :3876
        chara(target).kojo.骑乘位 = 2; // :3876
      } // :3876-3877
      return 0; // :3876-3878
    } // :3876-3879
  } // :3880-3883

  if (era_flag.selectcom === 35) {
    // :3885

    if (chara(target).kojo.全身擦洗 === 0) {
      // :3887

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3889
        await era.print(''); // :3889-3890
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3892
        await era.printAndWait(`「啊…哈…哈…不、不要动…嗯…♪」`); // :3893
        await era.printAndWait(`「好好的…开始洗吧…啊！」`); // :3894
      } else {
        // :3895-3896
        await era.printAndWait(`「知、知道啦…${sc()}的全身…都会认真清洗的」`); // :3897
        await era.printAndWait(
          `「呜、呜哇…好厉害啊都湿了…这样的事还是第一次…」`,
        ); // :3898
      } // :3898-3899
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :3900
      chara(target).kojo.全身擦洗 = 1; // :3900
      return 0; // :3900-3901
    } else {
      // :3902-3903

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3905
        await era.print(''); // :3905-3906
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3908
        await era.printAndWait(
          `「啊啊嗯…充分的清洗干净…唔呼呼…”脏脏的”地方…请起来${heart(1)}」`,
        ); // :3909
        await era.printAndWait(
          `「啊啊啊…你看你看…不能逃避哦…嗯啊啊啊嗯${heart(1)}」`,
        ); // :3910
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :3911
        chara(target).kojo.全身擦洗 = 5; // :3911
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3913
        await era.printAndWait(`「哈…主人啊…还有痒的地方吗～？」`); // :3914
        await era.printAndWait(`「唔呼呼…总觉得我这里也变的怪怪的了………」`); // :3915
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :3916
        chara(target).kojo.全身擦洗 = 4; // :3916
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3918
        await era.printAndWait(`「怎、怎么办？稍微好点了吗…？」`); // :3919
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :3920
        chara(target).kojo.全身擦洗 = 3; // :3920
      } else if (chara(target).kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        // :3922
        await era.printAndWait(
          `「呜哇…总觉得…泡沫热气腾腾的很厉害、呛到了啦…」`,
        ); // :3923
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :3924
        chara(target).kojo.全身擦洗 = 2; // :3924
      } // :3924-3925
      return 0; // :3924-3926
    } // :3924-3927
  } // :3928-3931

  if (era_flag.selectcom === 36) {
    // :3933

    if (chara(target).kojo.骑乘位肛交 === 0) {
      // :3935

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3937

        if (era.get(`talent:${target}:76`) === 1) {
          // :3939
          await era.printAndWait(`「啊啊啊…肛门被小鸡鸡刺穿了啊${heart(1)}」`); // :3940
          await era.printAndWait(
            `${target_name}跨坐在${assi_name}上面、笨拙的扭着腰。`,
          ); // :3941
          await era.printAndWait(
            `「${sc()}的淫乱肛门更多的玩弄吧${heart(1)}…嘎吱嘎吱的抽插吧…${heart(1)}」`,
          ); // :3942
          await era.printAndWait(
            `${target_name}一副淫靡的表情贪图着肛门的快乐………`,
          ); // :3943
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3945
          await era.printAndWait(
            `「感受到了…明明是不行的…咿…啊啊啊啊${heart(1)} 不要看那里啊${heart(1)}」`,
          ); // :3946
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、撞到的时候发出甜美的声音。`,
          ); // :3947
          await era.printAndWait(
            `「是、是的…肛门…感受到了啊${heart(1)} …啊啊啊…好羞耻………」`,
          ); // :3948
          await era.printAndWait(
            `被${master_name}看到的缘故被${target_name}羞耻心刺激的更加敏感了………`,
          ); // :3949
        } else {
          // :3950-3951
          await era.printAndWait(
            `「这、这样的…讨厌…讨厌的…咿…讨厌啊…不要看啊」`,
          ); // :3952
          await era.printAndWait(
            `${target_name}被${assi_name}顶到肛门的时候发出了悲鸣………`,
          ); // :3953
        } // :3953-3954
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :3956
        await era.printAndWait(
          `「嘎哈…嗯啊嗯…小鸡鸡…全部吸进去了${heart(1)}」`,
        ); // :3957
        await era.printAndWait(`「呜呼…所以啊不要动了…♪」`); // :3958
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :3960
        await era.printAndWait(`「啊嗯…都、都进来了…啊嗯${heart(1)}」`); // :3961
        await era.printAndWait(`「不行了…第一次${sc()}交给我吧…啊♪啊♪」`); // :3962
      } else {
        // :3963-3964
        await era.printAndWait(`「这…这样…进到最里面了…咕…撑开了………！」`); // :3965
      } // :3965-3966
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :3967
      chara(target).kojo.骑乘位肛交 = 1; // :3967
      return 0; // :3967-3968
    } else {
      // :3969-3970

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3972

        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          // :3974
          await era.printAndWait(
            `「啊啊${heart(1)}…啊哈${heart(1)}…屁股小穴被小鸡鸡刺穿了${heart(1)} 已经…谁都可以侵犯了…好舒服啊${heart(1)}」`,
          ); // :3975
          await era.printAndWait(
            `「主人啊…请看啊…${sc()}的屁股小穴变成了婴儿般的淫穴了${heart(1)}」`,
          ); // :3976
          await era.printAndWait(
            `${target_name}发出了格外高的声音、在${assi_name}的腰上淫乱的舞蹈。`,
          ); // :3977
          await era.printAndWait(
            `「咿${heart(1)}咿${heart(1)}咿啊啊${heart(1)}…已…已经…有屁股小穴就够了…好棒啊${heart(1)}」`,
          ); // :3978
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :3980
          await era.printAndWait(`「啊啊啊…肛门被小鸡鸡刺穿了${heart(1)}」`); // :3981
          await era.printAndWait(
            `${target_name}跨坐在${assi_name}上、把小鸡鸡整根吞下了。`,
          ); // :3982
          await era.printAndWait(
            `「${sc()}的淫乱肛门更多的玩弄吧${heart(1)}…嘎吱嘎吱的抽插吧…${heart(1)}」`,
          ); // :3983
          await era.printAndWait(
            `${target_name}一副淫靡的表情贪图着肛门的快乐………`,
          ); // :3984
        } else if (era.get(`talent:${target}:77`) === 1) {
          // :3986
          await era.printAndWait(
            `「啊啊啊…${heart(1)} 肛门插到最里面了…咿嗯${heart(1)} 啊啊啊${heart(1)} 侵犯那里吧…啊啊啊${heart(1)}」`,
          ); // :3987
          await era.printAndWait(
            `${target_name}感动至极的样子全身颤抖、开始在${assi_name}上面扭腰。`,
          ); // :3988
          await era.printAndWait(
            `「咿啊啊啊…屁股小穴…屁股小穴好棒啊…被小鸡鸡侵犯了…好棒啊${heart(1)}」`,
          ); // :3989
          await era.printAndWait(
            `${target_name}发出那样的娇声被${assi_name}用腰顶的提高了声音………`,
          ); // :3990
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :3992
          await era.printAndWait(
            `「感受到了…明明是不行的…咿…啊啊啊啊${heart(1)} 不要看那里啊${heart(1)}」`,
          ); // :3993
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、每次被顶都会发出甜美的呻吟。`,
          ); // :3994
          await era.printAndWait(
            `「是、是的…肛门…感受到了${heart(1)} …啊啊啊…好羞耻………」`,
          ); // :3995
          await era.printAndWait(
            `被${master_name}看到的缘故被${target_name}羞耻心刺激的更加敏感了………`,
          ); // :3996
        } else {
          // :3997-3998
          await era.printAndWait(
            `「这、这样的…讨厌…讨厌啊…咿…讨厌啊…不要看啊」`,
          ); // :3999
          await era.printAndWait(
            `${target_name}被${assi_name}顶到肛门的时候发出了悲鸣………`,
          ); // :4000
        } // :4000-4001
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4003
        if (rand_n(3) === 0) {
          // :4004
          await era.printAndWait(
            `「啊啊嗯…小鸡鸡全部吞进去了啊…咿、呀嗯嗯${heart(1)}」`,
          ); // :4005
          await era.printAndWait(
            `「唔呼呼…这样咕叽咕叽的…小鸡鸡在直肠隔着子宫咕叽咕叽的…啊啊嗯${heart(1)}」`,
          ); // :4006
          await era.printAndWait(
            `「啊啊啊…这样的话啊…已经…湿了…脑袋里全都融化了${heart(3)}」`,
          ); // :4007
        } else if (rand_n(2) === 0) {
          // :4008
          await era.printAndWait(
            `「啊哈…咿…啊啊啊${heart(1)} 咿…咿啊啊啊呀啊啊嗯${heart(1)}」`,
          ); // :4009
          await era.printAndWait(`${target_name}卑猥的扭着腰舞动起来。`); // :4010
          await era.printAndWait(
            `「啊嗯♪…不、不要动了…${sc()}…全部…全部都…！」`,
          ); // :4011
          await era.printAndWait(
            `「好舒服啊${heart(1)} ${sc()}的”屁股小穴”全部要去了啊${heart(1)}」`,
          ); // :4012
        } else {
          // :4012-4013
          await era.printAndWait(
            `「咕啾嗯${heart(1)} 肛门献出来了${heart(1)} 献给小鸡鸡了啊${heart(1)}」`,
          ); // :4014
          await era.printAndWait(
            `${target_name}一边发出粗重的呼吸一边淫猥的上下扭着腰。`,
          ); // :4015
          await era.printAndWait(
            `「哦哦…”屁股小穴”好棒啊${heart(1)} 婴儿一样的屁股小穴…好好的品味吧${heart(1)}」`,
          ); // :4016
        } // :4016-4017
        // CFLAG:337  = 8（变量语义：CFLAG 族，337） // :4018
        chara(target).kojo.骑乘位肛交 = 8; // :4018
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4020
        if (rand_n(2) === 0) {
          // :4021
          await era.printAndWait(
            `「咿嗯啊啊啊啊…腰停不下来…不愿停下了啦${heart(1)}」`,
          ); // :4022
          await era.printAndWait(
            `「不行了不行了…明明要认真侍奉的${heart(1)}」`,
          ); // :4023
          await era.printAndWait(
            `${target_name}有点不知所措的陶醉在那样的快乐里………`,
          ); // :4024
        } else {
          // :4024-4025
          await era.printAndWait(`「啊啊嗯…太舒服了…腰动不了…${heart(1)}」`); // :4026
          await era.printAndWait(
            `「呀啊嗯…顶到了…呀嗯…侍奉不了了${heart(1)}」`,
          ); // :4027
          await era.printAndWait(
            `「已经…我真的很淘气啊…啊咿啊啊啊…啊啊嗯${heart(1)}」`,
          ); // :4028
        } // :4028-4029
        // CFLAG:337  = 8（变量语义：CFLAG 族，337） // :4030
        chara(target).kojo.骑乘位肛交 = 8; // :4030
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4032
        await era.printAndWait(
          `「啊啊啊…嗯啊嗯${heart(1)} 要开始认真的肛门侍奉了…真的不要动了啦」`,
        ); // :4033
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :4034
        chara(target).kojo.骑乘位肛交 = 7; // :4034
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4036
        await era.printAndWait(`「呼啊…肛门…好舒服！」`); // :4037
        await era.printAndWait(`「嗯！主人不要动了…全部全部${sc()}会！」`); // :4038
        await era.printAndWait(`${target_name}流着口水、母兽一样的扭着腰。`); // :4039
        await era.printAndWait(`「咿嗯咿嗯…”屁股小穴”好舒服！啊啊啊！」`); // :4040
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :4041
        chara(target).kojo.骑乘位肛交 = 6; // :4041
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4043
        if (rand_n(2) === 0) {
          // :4044
          await era.printAndWait(
            `「好厉害…主人的小鸡鸡…插到最里面了…屁股小穴…撑开了♪」`,
          ); // :4045
          await era.printAndWait(`${target_name}很舒服的样子扭着腰………`); // :4046
        } else {
          // :4046-4047
          await era.printAndWait(
            `「好好的…自己动起来了啊…啊嗯…屁股小穴…舒服啊…♪」`,
          ); // :4048
          await era.printAndWait(`${target_name}一副陶醉的表情沉浸在快感里………`); // :4049
        } // :4049-4050
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :4051
        chara(target).kojo.骑乘位肛交 = 5; // :4051
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4053
        await era.printAndWait(`「呼啊啊…屁股…撑开了…啊嗯…嗯…主人啊…♪」`); // :4054
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :4055
        chara(target).kojo.骑乘位肛交 = 4; // :4055
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4057
        await era.printAndWait(`「呼啊啊啊…啊…撑的太开了……厉害……好舒服…啊」`); // :4058
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :4059
        chara(target).kojo.骑乘位肛交 = 3; // :4059
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :4061
        await era.printAndWait(`「好、好痛苦…啊啊啊！」`); // :4062
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :4063
        chara(target).kojo.骑乘位肛交 = 2; // :4063
      } // :4063-4064
      return 0; // :4063-4065
    } // :4063-4066
  } // :4067-4070

  if (era_flag.selectcom === 37) {
    // :4072

    if (chara(target).kojo.肛门侍奉 === 0) {
      // :4074

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4076
        await era.printAndWait(`「呜嗯…真、真是可惜……！」`); // :4077
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4079
        await era.printAndWait(`「哈咿…嗯…嗯…哈…${sc()}舔屁股小穴什么的…」`); // :4080
        await era.printAndWait(`「啊啊…但是…舔的停不下来…嗯…啾…啾」`); // :4081
      } else {
        // :4082-4083
        await era.printAndWait(`「啊啊啊…${sc()}在这种地方舔什么的…嗯…呼…」`); // :4084
      } // :4084-4085
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :4086
      chara(target).kojo.肛门侍奉 = 1; // :4086
      return 0; // :4086-4087
    } else {
      // :4088-4089

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4091
        await era.printAndWait(`「啊咕…嗯…啊…饶、饶了我………嗯嗯！」`); // :4092
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4094
        await era.printAndWait(
          `「啊哈${heart(1)} 很美味啊…主人的肛门好美味啊${heart(1)}」`,
        ); // :4095
        await era.printAndWait(
          `「嗯呼…直到舔完每一根的褶皱为止…好漂亮的条纹啊${heart(1)} 啊啊啊…肛门唏咕唏咕的…舒服吗？」`,
        ); // :4096
        await era.printAndWait(
          `「好高兴啊…啊啊啊…啾啪啾啪更多的条纹${heart(1)}」`,
        ); // :4097
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :4098
        chara(target).kojo.肛门侍奉 = 5; // :4098
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4100
        await era.print(`「嗯…嘛啾…咕噜…哈啊…更多的舔啊…${heart(1)}」`); // :4101
        await era.print(`「啊啊嗯…更舒服的…♪」`); // :4102
        await era.print(`${target_name}把舌头伸进了肛门的最里面………`); // :4103
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :4104
        chara(target).kojo.肛门侍奉 = 4; // :4104
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4106
        await era.printAndWait(
          `「嗯…嘛啾…咕噜…噶啊…真是讨厌啊…侍奉停不下来啊………」`,
        ); // :4107
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :4108
        chara(target).kojo.肛门侍奉 = 3; // :4108
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        // :4110
        await era.printAndWait(`「呜呼…嗯…嘛啾…呜…」`); // :4111
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :4112
        chara(target).kojo.肛门侍奉 = 2; // :4112
      } // :4112-4113
      return 0; // :4112-4114
    } // :4112-4115
  } // :4116-4119

  if (era_flag.selectcom === 40) {
    // :4121

    if (chara(target).kojo.打屁股 === 0) {
      // :4123
      await era.printAndWait(`「呀呜！？　不要打了啦！」`); // :4124
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :4125
      chara(target).kojo.打屁股 = 1; // :4125
      return 0; // :4125-4126
    } else {
      // :4127-4128

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4130
        await era.print(''); // :4130-4131
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4133
        await era.printAndWait(
          `「哈嗯！ 被打着…直到小穴都发热了呢…啊啊啊啊咿啊啊啊！」`,
        ); // :4134
        await era.printAndWait(`${target_name}每次屁股被打都会发出呻吟………`); // :4135
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :4136
        chara(target).kojo.打屁股 = 5; // :4136
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4138
        await era.printAndWait(`「啊嗯…呀嗯…啊啊…主人啊…更多打我的屁股吧…♪」`); // :4139
        await era.printAndWait(`「更多的…惩罚我吧…」`); // :4140
        await era.printAndWait(
          `${target_name}左右扭动着红肿的屁股诱惑着${player_name}………`,
        ); // :4141
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :4142
        chara(target).kojo.打屁股 = 4; // :4142
        return 0; // :4142-4143
      } else if (
        era.get(`mark:${target}:0`) === 3 &&
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4145
        await era.printAndWait(`「咕嗯…啊嗯…呀嗯！这样的…这样的…呀嗯嗯！」`); // :4146
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :4147
        chara(target).kojo.打屁股 = 3; // :4147
        return 0; // :4147-4148
      } else if (chara(target).kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
        // :4150
        await era.printAndWait(`「啊啊哎呀！不要再打了！」`); // :4151
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :4152
        chara(target).kojo.打屁股 = 2; // :4152
      } // :4152-4153
      return 0; // :4152-4154
    } // :4152-4155
  } // :4156-4159

  if (era_flag.selectcom === 41) {
    // :4161

    if (chara(target).kojo.鞭 === 0) {
      // :4163

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4165
        await era.printAndWait(`「啊啊啊…不、不要…啊咿咕！」`); // :4166
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4168
        await era.printAndWait(
          `「啊…哈…因为我太变态了所以请主人惩罚吧…啊嗯…啊啊啊！」`,
        ); // :4169
        await era.printAndWait(
          `「唔呼呼…但是…变态的我大概一辈子都治不好了啊…呀啊嗯${heart(1)}」`,
        ); // :4170
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4172
        await era.printAndWait(`「啊呀！主人啊！那样的不要打了啊！」`); // :4173
      } else {
        // :4174-4175
        await era.printAndWait(`「那、那样的东西${sc()}好可怕但是…咕」`); // :4176
      } // :4176-4177
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :4178
      chara(target).kojo.鞭 = 1; // :4178
      return 0; // :4178-4179
    } else {
      // :4180-4181

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4183
        await era.printAndWait(`「${sc()}被像这样打了…咿咕！」`); // :4184
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4186
        await era.printAndWait(
          `「啊啊啊${heart(1)}…嗯嗯…啊哈啊…明明被打的很痛…小穴还是啾啾的有感觉了${heart(1)}」`,
        ); // :4187
        await era.printAndWait(
          `「更多的鞭打我吧…欺负…也完全没关系啊${heart(1)}」`,
        ); // :4188
        await era.printAndWait(
          `${target_name}一边被鞭子抽秘裂一边滴落着爱液………`,
        ); // :4189
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :4190
        chara(target).kojo.鞭 = 9; // :4190
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4192
        await era.printAndWait(
          `「呀哈…啊…呼啊啊嗯${heart(1)} 明明很痛…但还是想要继续………」`,
        ); // :4193
        await era.printAndWait(`「啊啊啊…嗯…咿咿…啊啊啊！」`); // :4194
        await era.printAndWait(`每次被打${target_name}都会发出痛苦的叫声………`); // :4195
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :4196
        chara(target).kojo.鞭 = 8; // :4196
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4198
        await era.printAndWait(`「呀嗯嗯…嗯…啊啊啊…好痛…好痛啊…」`); // :4199
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :4200
        chara(target).kojo.鞭 = 7; // :4200
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4202
        await era.printAndWait(`「哇…嗯…啊啊啊！主人啊…更多…还要更多…」`); // :4203
        await era.printAndWait(`「好痛…但是…好棒啊…主人啊…♪」`); // :4204
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :4205
        chara(target).kojo.鞭 = 6; // :4205
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4207
        await era.printAndWait(`「咕嗯…明明很痛…总觉得…非常…的奇怪…」`); // :4208
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :4209
        chara(target).kojo.鞭 = 5; // :4209
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4211
        await era.printAndWait(
          `「啊…主人啊…因为反抗不了…不要再用鞭子打了啊…」`,
        ); // :4212
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :4213
        chara(target).kojo.鞭 = 4; // :4213
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4215
        await era.printAndWait(`「哈嗯…啊…明明讨厌被打的…总觉得…怪怪的…哟…」`); // :4216
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :4217
        chara(target).kojo.鞭 = 3; // :4217
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :4219
        await era.printAndWait(`「哇…嗯…咕嗯」`); // :4220
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :4221
        chara(target).kojo.鞭 = 2; // :4221
      } // :4221-4222
      return 0; // :4221-4223
    } // :4221-4224
  } // :4225-4228

  if (era_flag.selectcom === 42) {
    // :4230

    if (chara(target).kojo.针 === 0) {
      // :4232

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4234
        await era.print(''); // :4234-4235
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4237
        await era.printAndWait(
          `「啊…啊啊啊…不、不行了…那样的刺的话…啊啊啊！」`,
        ); // :4238
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4240
        await era.printAndWait(`「那、那个…那是…开玩笑的吧…啊啊啊呀啊！」`); // :4241
      } else {
        // :4242-4243
        await era.printAndWait(`「咿咕…咿…不行啊！更进一步的刺不行啊！」`); // :4244
      } // :4244-4245
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :4246
      chara(target).kojo.针 = 1; // :4246
      return 0; // :4246-4247
    } else {
      // :4248-4249

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4251
        await era.print(''); // :4251-4252
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4254
        await era.printAndWait(
          `「啊哈啊…更多…刺吧…针垫那样的…呜哦…哦哦${heart(1)}」`,
        ); // :4255
        await era.printAndWait(`${target_name}每次被针刺都会发出喜悦的声音………`); // :4256
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :4257
        chara(target).kojo.针 = 9; // :4257
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4259
        await era.printAndWait(
          `「啊…啊啊啊…针…好热…嗯…明明很痛…一点点热起来了…啊啊啊…怪、怪怪的………」`,
        ); // :4260
        await era.printAndWait(`${target_name}对于这意外的感觉有点不知所措………`); // :4261
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :4262
        chara(target).kojo.针 = 8; // :4262
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4264
        await era.printAndWait(
          `「呼嗯…用、用力………啊啊啊…不、不行了…啊啊啊！」`,
        ); // :4265
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :4266
        chara(target).kojo.针 = 7; // :4266
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4268
        await era.printAndWait(`「啊…啊啊…啊啊啊啊…好厉害…刺吧…咕呼…啊♪」`); // :4269
        await era.printAndWait(`「还没…不要紧…请再给我…啊♪」`); // :4270
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :4271
        chara(target).kojo.针 = 6; // :4271
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4273
        await era.printAndWait(`「啊啊啊…慢点的话…慢点的话就不要紧…♪」`); // :4274
        await era.printAndWait(`「呼嗯…咕叽咕叽的不行了」`); // :4275
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :4276
        chara(target).kojo.针 = 5; // :4276
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4278
        await era.printAndWait(
          `「因为反抗不了…我绝对不会反抗的…好痛啊停下吧！…」`,
        ); // :4279
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :4280
        chara(target).kojo.针 = 4; // :4280
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4282
        await era.printAndWait(`「哈咕…啊…啊啊啊…刺到了…明明应该很痛的…嗯」`); // :4283
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :4284
        chara(target).kojo.针 = 3; // :4284
      } else if (chara(target).kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        // :4286
        await era.printAndWait(`「好痛…好痛…好痛啊…已经…停下啊…」`); // :4287
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :4288
        chara(target).kojo.针 = 2; // :4288
      } // :4288-4289
      return 0; // :4288-4290
    } // :4288-4291
  } // :4292-4295

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    // :4298

    if (chara(target).kojo.眼罩 === 0) {
      // :4300

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4302
        await era.print(''); // :4302-4303
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4305
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        ); // :4306
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4308
        await era.printAndWait(`「主人啊…我有点害怕啊…」`); // :4309
      } else {
        // :4310-4311
        await era.printAndWait(`「这、这样的…我一点都不害怕…」`); // :4312
      } // :4312-4313
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :4314
      chara(target).kojo.眼罩 = 1; // :4314
      return 0; // :4314-4315
    } else {
      // :4316-4317

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4319
        await era.print(''); // :4319-4320
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4322
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        ); // :4323
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :4324
        chara(target).kojo.眼罩 = 9; // :4324
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4326
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        ); // :4327
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :4328
        chara(target).kojo.眼罩 = 8; // :4328
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4330
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        ); // :4331
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :4332
        chara(target).kojo.眼罩 = 7; // :4332
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4334
        await era.printAndWait(`「主人啊…我有点害怕啊…」`); // :4335
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :4336
        chara(target).kojo.眼罩 = 6; // :4336
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4338
        await era.printAndWait(`「主人啊…我有点害怕啊…」`); // :4339
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :4340
        chara(target).kojo.眼罩 = 5; // :4340
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4342
        await era.printAndWait(`「主人啊…我有点害怕啊…」`); // :4343
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :4344
        chara(target).kojo.眼罩 = 4; // :4344
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4346
        await era.printAndWait(`「哈呜…好激动啊………」`); // :4347
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :4348
        chara(target).kojo.眼罩 = 3; // :4348
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        // :4350
        await era.printAndWait(`「这、这样的…我一点都不害怕…」`); // :4351
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :4352
        chara(target).kojo.眼罩 = 2; // :4352
      } // :4352-4353
      return 0; // :4352-4354
    } // :4355-4356
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    // :4357

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :4359
      await era.print(''); // :4359-4360
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :4362
      await era.printAndWait(`「啊哈…${heart(1)} 想更好地展现我的表情呢………」`); // :4363
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :4364
      chara(target).kojo.眼罩着脱 = 3; // :4364
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4366
      await era.printAndWait(`「啊嗯…主人的脸终于看到了………♪」`); // :4367
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :4368
      chara(target).kojo.眼罩着脱 = 2; // :4368
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      // :4370
      await era.printAndWait(`「我、我一点也没有害怕………」`); // :4371
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :4372
      chara(target).kojo.眼罩着脱 = 1; // :4372
    } // :4372-4373
    return 0; // :4372-4374
  } // :4372-4375

  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    // :4381

    if (chara(target).kojo.绳子 === 0) {
      // :4383

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4385
        await era.print(''); // :4385-4386
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4388
        await era.printAndWait(`「啊啊嗯…绑成更加色情的样子吧${heart(1)}」`); // :4389
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4391
        await era.printAndWait(`「嗯…比想象中的更加…紧的束缚啊…唔呼呼」`); // :4392
      } else {
        // :4393-4394
        await era.printAndWait(`「这样的束缚…${sc()}不在乎…总觉得………」`); // :4395
      } // :4395-4396
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :4397
      chara(target).kojo.绳子 = 1; // :4397
      return 0; // :4397-4398
    } else {
      // :4399-4400

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4402
        await era.print(''); // :4402-4403
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4405
        await era.printAndWait(
          `「啊啊啊…咕叽咕叽的被绑住了好棒啊${heart(1)}」`,
        ); // :4406
        await era.printAndWait(
          `「哈…啊啊啊…这样下去会被做各种过分的事了啊${heart(1)}」`,
        ); // :4407
        await era.printAndWait(
          `${target_name}的身体被紧紧的绑上、发出了兴奋般的喘息声………`,
        ); // :4408
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :4409
        chara(target).kojo.绳子 = 9; // :4409
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4411
        await era.printAndWait(
          `「啊啊啊…被绑住了…好舒服啊…嗯${heart(1)} 啊啊啊…湿了呢…${heart(1)}」`,
        ); // :4412
        await era.printAndWait(
          `${target_name}的身体被紧紧绑上从其口中发出了灼热喘息………`,
        ); // :4413
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :4414
        chara(target).kojo.绳子 = 8; // :4414
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4416
        await era.printAndWait(`「啊啊啊…绳子勒到肉里了…嗯…好奇怪的感觉………」`); // :4417
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :4418
        chara(target).kojo.绳子 = 7; // :4418
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4420
        await era.printAndWait(`「啊啊啊…绳子勒到肉里了…快要疯了…」`); // :4421
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :4422
        chara(target).kojo.绳子 = 6; // :4422
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4424
        await era.printAndWait(`「绳子…啊嗯…磨擦…摩擦着…♪」`); // :4425
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :4426
        chara(target).kojo.绳子 = 5; // :4426
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4428
        await era.printAndWait(`「即使没有被绑起来…${sc()}也是主人的玩具…」`); // :4429
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :4430
        chara(target).kojo.绳子 = 4; // :4430
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4432
        await era.printAndWait(`「只是被绑住了…就心跳不止………」`); // :4433
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :4434
        chara(target).kojo.绳子 = 3; // :4434
      } else if (chara(target).kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        // :4436
        await era.printAndWait(`「咕…好、好紧………」`); // :4437
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :4438
        chara(target).kojo.绳子 = 2; // :4438
      } // :4438-4439
      return 0; // :4438-4440
    } // :4441-4442
  } else if (
    era_flag.selectcom === 44 &&
    era.get(`tequip:${target}:44`) === 0
  ) {
    // :4443

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :4445
      await era.print(''); // :4445-4446
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.绳子着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :4448
      await era.printAndWait(`「嗯哈啊…还…非常的………${heart(1)}」`); // :4449
      // CFLAG:385  = 3（变量语义：CFLAG 族，385） // :4450
      chara(target).kojo.绳子着脱 = 3; // :4450
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4452
      await era.printAndWait(`「啊嗯…能被更多的束缚真是太棒了………」`); // :4453
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :4454
      chara(target).kojo.绳子着脱 = 2; // :4454
    } else if (chara(target).kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      // :4456
      await era.printAndWait(`「哈…哈…」`); // :4457
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :4458
      chara(target).kojo.绳子着脱 = 1; // :4458
    } // :4458-4459
    return 0; // :4458-4460
  } // :4458-4461

  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    // :4467

    if (chara(target).kojo.口塞 === 0) {
      // :4469

      if (era.get(`talent:${target}:76`) === 1) {
        // :4471
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`); // :4472
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4474
        await era.printAndWait(`「呜嗯…啊哈…呼…」`); // :4475
      } else {
        // :4476-4477
        await era.printAndWait(`「呜呜…呜…呼…呼」`); // :4478
      } // :4478-4479
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :4480
      chara(target).kojo.口塞 = 1; // :4480
      return 0; // :4480-4481
    } else {
      // :4482-4483

      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4485
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`); // :4486
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :4487
        chara(target).kojo.口塞 = 9; // :4487
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4489
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`); // :4490
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :4491
        chara(target).kojo.口塞 = 8; // :4491
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4493
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`); // :4494
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :4495
        chara(target).kojo.口塞 = 7; // :4495
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4497
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`); // :4498
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :4499
        chara(target).kojo.口塞 = 6; // :4499
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4501
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`); // :4502
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :4503
        chara(target).kojo.口塞 = 5; // :4503
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4505
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`); // :4506
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :4507
        chara(target).kojo.口塞 = 4; // :4507
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4509
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`); // :4510
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :4511
        chara(target).kojo.口塞 = 3; // :4511
      } else if (chara(target).kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        // :4513
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`); // :4514
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :4515
        chara(target).kojo.口塞 = 2; // :4515
      } // :4515-4516
      return 0; // :4515-4517
    } // :4518-4519
  } else if (
    era_flag.selectcom === 45 &&
    era.get(`tequip:${target}:45`) === 0
  ) {
    // :4520

    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :4522
      await era.printAndWait(`「噗哈…哈…哈…哈…」`); // :4523
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :4524
      chara(target).kojo.口塞着脱 = 3; // :4524
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4526
      await era.printAndWait(`「噗哈…哈…哈…哈…」`); // :4527
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :4528
      chara(target).kojo.口塞着脱 = 2; // :4528
    } else if (chara(target).kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      // :4530
      await era.printAndWait(`「噗哈…哈…哈…哈…」`); // :4531
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :4532
      chara(target).kojo.口塞着脱 = 1; // :4532
    } // :4532-4533
    return 0; // :4532-4534
  } // :4532-4535

  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    // :4541

    if (chara(target).kojo.灌肠肛塞 === 0) {
      // :4543

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4545
        await era.print(''); // :4545-4546
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4548
        await era.printAndWait(`「啊啊啊…肚子里好热…好热啊………」`); // :4549
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4551
        await era.printAndWait(`「肚子…肚子好奇怪的快感…已经…饶了我吧…」`); // :4552
      } else {
        // :4553-4554
        await era.printAndWait(`「啊啊啊…咕噜…好难受…真的好难受！救救我…」`); // :4555
      } // :4555-4556
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :4557
      chara(target).kojo.灌肠肛塞 = 1; // :4557
      return 0; // :4557-4558
    } else {
      // :4559-4560

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4562
        await era.print(''); // :4562-4563
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4565
        await era.printAndWait(
          `「啊哈${heart(1)}…还要更多的灌肠液灌进来…肚子热热的好棒啊${heart(1)}」`,
        ); // :4566
        await era.printAndWait(
          `「啊啊啊…会一直忍耐到极限的…全部一起拉出来的感觉好舒服啊${heart(1)}」`,
        ); // :4567
        await era.printAndWait(
          `${target_name}翘起屁股想要被${player_name}注入更多的灌肠液………`,
        ); // :4568
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :4569
        chara(target).kojo.灌肠肛塞 = 7; // :4569
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4571
        await era.printAndWait(
          `「啊啊啊…求、求你了…真的…肚子好难受…浣肠液好热啊………」`,
        ); // :4572
        await era.printAndWait(`${target_name}痛苦的呻吟着、不停的流着眼泪………`); // :4573
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :4574
        chara(target).kojo.灌肠肛塞 = 6; // :4574
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4576
        await era.printAndWait(`「呼啊…主人啊…更多…更多的灌肠让肚子鼓起来♪」`); // :4577
        await era.printAndWait(`「哎嘿嘿…简直就像怀孕了一样…」`); // :4578
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :4579
        chara(target).kojo.灌肠肛塞 = 5; // :4579
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4581
        await era.printAndWait(
          `「咿嗯…我会忍耐的…在得到主人的命令前一直忍着…♪」`,
        ); // :4582
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :4583
        chara(target).kojo.灌肠肛塞 = 4; // :4583
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4585
        await era.printAndWait(
          `「嗯…啊啊…好难受…屁股好热…好热…好奇怪的快感…♪」`,
        ); // :4586
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :4587
        chara(target).kojo.灌肠肛塞 = 3; // :4587
      } else if (chara(target).kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        // :4589
        await era.printAndWait(`「饶了我…请饶了我吧…」`); // :4590
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :4591
        chara(target).kojo.灌肠肛塞 = 2; // :4591
      } // :4591-4592
      return 0; // :4591-4593
    } // :4591-4594
  } // :4595-4598

  if (era_flag.selectcom === 55) {
    // :4601

    if (chara(target).kojo.放置PLAY === 0) {
      // :4603

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4605
        await era.printAndWait(`${target_name}在那里发出了询问………`); // :4606
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4608
        await era.printAndWait(`「那、那个、主人…？」`); // :4609
        await era.printAndWait(`${target_name}一副殷切的表情………`); // :4610
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4612
        await era.printAndWait(`「哈哈…休息一下吗…？」`); // :4613
        await era.printAndWait(`${target_name}心里空荡荡的………`); // :4614
      } else {
        // :4615-4616
        await era.printAndWait(`「什、什么啊…」`); // :4617
        await era.printAndWait(`${target_name}在那里发出了询问………`); // :4618
      } // :4618-4619
      await era.print(''); // :4620-4621

      if (era.get(`tequip:${target}:11`)) {
        // :4623
        await era.printAndWait(
          `蠕虫在${target_name}的秘裂蠕动着、毫不留情的在小穴内搅动着。`,
        ); // :4623
      } // :4623

      if (era.get(`tequip:${target}:13`)) {
        // :4626
        await era.printAndWait(
          `蠕虫在${target_name}的肛门蠕动着、毫不留情的蹂躏着肛门。`,
        ); // :4626
      } // :4626

      if (era.get(`tequip:${target}:19`)) {
        // :4629
        await era.printAndWait(
          `${target_name}的肛门里被放进了肛门拉珠、肛门正在被拖曳着。`,
        ); // :4629
      } // :4629

      if (era.get(`tequip:${target}:14`)) {
        // :4632
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹夹着持续的进行刺激。`,
        ); // :4632
      } // :4632

      if (era.get(`tequip:${target}:15`)) {
        // :4635
        await era.printAndWait(
          `${target_name}的乳头被振动的乳头夹夹着持续的进行刺激。`,
        ); // :4635
      } // :4635

      if (era.get(`tequip:${target}:16`)) {
        // :4638
        await era.print(`${target_name}的乳房被装上了榨乳器不断的榨着乳。`); // :4638
      } // :4638

      if (era.get(`tequip:${target}:17`)) {
        // :4641
        await era.printAndWait(
          `${target_name}的小鸡鸡被装上了飞机杯即使快要射精也不取下来。`,
        ); // :4641
      } // :4641

      if (era.get(`tequip:${target}:43`)) {
        // :4644
        await era.printAndWait(`${target_name}被戴上了眼罩。`); // :4644
      } // :4644

      if (era.get(`tequip:${target}:44`)) {
        // :4647
        await era.printAndWait(`${target_name}的身体被用绳子绑住约束了起来。`); // :4647
      } // :4647

      if (era.get(`tequip:${target}:46`)) {
        // :4650
        await era.printAndWait(
          `${target_name}的肚子因为灌肠发出咕噜咕噜的声音、肛门塞被取下来后马上就喷了出来。`,
        ); // :4650
      } // :4650

      if (era.get(`tequip:${target}:49`)) {
        // :4653
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、每当微弱的电流流动括约肌就会一阵痉挛。`,
        ); // :4653
      } // :4653

      if (era.get(`tequip:${target}:53`)) {
        // :4656
        await era.printAndWait(
          `然后、这样的${target_name}的样子从头到尾都被录了下来………`,
        ); // :4656
      } // :4656
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :4657
      chara(target).kojo.放置PLAY = 1; // :4657
      return 0; // :4657-4658
    } else {
      // :4659-4660

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4662
        await era.printAndWait(`${target_name}偷看着这边………`); // :4663
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4665
        await era.printAndWait(`「快、快点…想、想要…想要做很多色色的事情！」`); // :4666
        await era.printAndWait(`无法忍耐的${target_name}开始依偎了过来………`); // :4667
        // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :4668
        chara(target).kojo.放置PLAY = 6; // :4668
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4670
        await era.printAndWait(`「已、已经…总觉得${sc()}明明没有必要休息………」`); // :4671
        await era.printAndWait(`${target_name}心里空荡荡的………`); // :4672
        // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :4673
        chara(target).kojo.放置PLAY = 5; // :4673
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4675
        await era.printAndWait(`「主人…那、那个…差不多了…」`); // :4676
        await era.printAndWait(`${target_name}坐立不安的不停摩擦着双腿………`); // :4677
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :4678
        chara(target).kojo.放置PLAY = 4; // :4678
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4680
        await era.printAndWait(`「那、那个、主人…？」`); // :4681
        await era.printAndWait(`${target_name}一副殷切的表情………`); // :4682
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :4683
        chara(target).kojo.放置PLAY = 3; // :4683
      } else if (chara(target).kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        // :4685
        await era.printAndWait(`「为、为什么不看这里………」`); // :4686
        await era.printAndWait(`${target_name}在那里发出了询问………`); // :4687
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :4688
        chara(target).kojo.放置PLAY = 2; // :4688
      } // :4688-4689
      await era.print(''); // :4690-4691

      if (era.get(`tequip:${target}:11`)) {
        // :4693
        await era.printAndWait(
          `蠕虫在${target_name}的秘裂蠕动着、毫不留情的在小穴内搅动着。`,
        ); // :4693
      } // :4693

      if (era.get(`tequip:${target}:13`)) {
        // :4696
        await era.printAndWait(
          `蠕虫在${target_name}的肛门蠕动着、毫不留情的蹂躏着肛门。`,
        ); // :4696
      } // :4696

      if (era.get(`tequip:${target}:19`)) {
        // :4699
        await era.printAndWait(
          `${target_name}的肛门里被放进了肛门拉珠、肛门正在被拖曳着。`,
        ); // :4699
      } // :4699

      if (era.get(`tequip:${target}:14`)) {
        // :4702
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹夹着持续的进行刺激。`,
        ); // :4702
      } // :4702

      if (era.get(`tequip:${target}:15`)) {
        // :4705
        await era.printAndWait(
          `${target_name}的乳头被振动的乳头夹夹着持续的进行刺激。`,
        ); // :4705
      } // :4705

      if (era.get(`tequip:${target}:16`)) {
        // :4708
        await era.print(`${target_name}的乳房被装上了榨乳器不断的榨着乳。`); // :4708
      } // :4708

      if (era.get(`tequip:${target}:17`)) {
        // :4711
        await era.printAndWait(
          `${target_name}的小鸡鸡被装上了飞机杯即使快要射精也不取下来。`,
        ); // :4711
      } // :4711

      if (era.get(`tequip:${target}:43`)) {
        // :4714
        await era.printAndWait(`${target_name}被戴上了眼罩。`); // :4714
      } // :4714

      if (era.get(`tequip:${target}:44`)) {
        // :4717
        await era.printAndWait(`${target_name}的身体被用绳子绑住约束了起来。`); // :4717
      } // :4717

      if (era.get(`tequip:${target}:46`)) {
        // :4720
        await era.printAndWait(
          `${target_name}的肚子因为灌肠发出咕噜咕噜的声音、肛门塞被取下来后马上就喷了出来。`,
        ); // :4720
      } // :4720

      if (era.get(`tequip:${target}:49`)) {
        // :4723
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、每当微弱的电流流动括约肌就会一阵痉挛。`,
        ); // :4723
      } // :4723

      if (era.get(`tequip:${target}:53`)) {
        // :4726
        await era.printAndWait(
          `然后、这样的${target_name}的样子从头到尾都被录了下来………`,
        ); // :4726
      } // :4726
      return 0; // :4726-4727
    } // :4726-4728
  } // :4726-4729

  if (era_flag.selectcom === 56) {
    // :4736

    if (chara(target).kojo.交谈 === 0) {
      // :4738
      if (era.get(`tequip:${target}:53`) === 1) {
        // :4739

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :4742
          await era.printAndWait(''); // :4742-4743
        } else {
          // :4744-4745
          await era.print(`${master_name}催促${target_name}进行一下自我介绍。`); // :4745
          if (
            rand_n(3) === 0 &&
            (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
          ) {
            // :4746
            await era.print(`于是${target_name}将自己的本名、至今为止的性体验`); // :4747
            if (era.get(`abl:${target}:31`) >= 3) {
              // :4749
              await era.print(`以及自慰时意淫的内容`); // :4749
            } // :4749
            await era.print(`津津有味的说了起来……`); // :4750
            await era.print(
              `只是想想这个水晶球在故乡公开放映的样子、${target_name}的股间就开始湿了……`,
            ); // :4751
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4752
            game.kojo.录像内容 |= 2; // :4752
          } else if (era.get(`talent:${target}:76`) === 1) {
            // :4753
            await era.print(
              `${target_name}向着水晶球一边做爱一边开始下流的自我介绍。`,
            ); // :4754
            await era.printAndWait(
              `「哈…${sc()}原来是勇者${target_name} ${heart(1)}」`,
            ); // :4755
            await era.printAndWait(
              `「但是狂妄自大的${sc()}总是逞强、在输给怪物后被抓住了………」`,
            ); // :4756
            await era.printAndWait(
              `「之后…被魔王大人进行调教………堕落了${heart(1)}」`,
            ); // :4757
            await era.printAndWait(
              `${target_name}像蛇一样蠕动着身体同时张开了双腿………`,
            ); // :4758
            await era.printAndWait(
              `「怎么样啊…${sc()}的身体…没有哪个部分是魔王大人没见过的…${heart(1)}」`,
            ); // :4759
            await era.printAndWait(
              `「现在…最喜欢被魔王大人那样折磨…强暴…我感觉很…有快感…所以请看吧${heart(1)}」`,
            ); // :4760
            await era.printAndWait(
              `「${sc()}有多舒服、能稍微了解一点我就很开心了啊${heart(3)}」`,
            ); // :4761
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4762
            game.kojo.录像内容 |= 2; // :4762
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :4763
            await era.printAndWait(
              `${target_name}羞耻的蠕动着身体、兴奋着连录像开始了都没有注意到………`,
            ); // :4764
            await era.printAndWait(
              `「啊嗯…${sc()}的告白被大家都知道了什么的好羞耻啊………」`,
            ); // :4765
            await era.printAndWait(
              `「魔王大人被人那样的讨厌…不过其实还是非常的温柔………${heart(1)}」`,
            ); // :4766
            await era.printAndWait(
              `「${sc()}在进行各种各样的侍奉的时候…啊啊啊哎呀…只是回忆下而已就已经湿了呢${heart(1)}」`,
            ); // :4767
            await era.printAndWait(
              `「哎、全部都录下来了？…呀不要不要快点停下啊！」`,
            ); // :4768
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4769
            game.kojo.录像内容 |= 2; // :4769
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
          ) {
            // :4770
            await era.print(`${target_name}开始对着水晶球说出下流的话。`); // :4771
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4772
            game.kojo.录像内容 |= 2; // :4772
          } else if (
            era.get(`abl:${target}:10`) >= 3 ||
            era.get(`abl:${target}:11`) >= 4 ||
            era.get(`abl:${target}:17`) >= 2
          ) {
            // :4773
            await era.print(`${target_name}开始对着水晶球自我介绍。`); // :4774
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4775
            game.kojo.录像内容 |= 2; // :4775
          } else {
            // :4775-4776
            await era.printAndWait(
              `什么也不想说的${target_name}在得知水晶球要被送回故乡后吓得脸都绿了。`,
            ); // :4777
            await era.printAndWait(`「要…要把录像送回故乡………？」`); // :4778
            await era.printAndWait(
              `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
            ); // :4779
          } // :4779-4780
        } // :4779-4781
      } else {
        // :4782-4783

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :4784
          await era.printAndWait(''); // :4784-4785
        } else {
          // :4786-4787
          await era.print(`一边与${player_name}`); // :4787
          if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:85`) ||
              era.get(`abl:${target}:10`) >= 5) &&
            game.event.插着不拔
          ) {
            // :4788
            await era.print(`说着情话、${target_name}一边扭动着腰。`); // :4789
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) ||
              era.get(`abl:${target}:11`) >= 5) &&
            game.event.插着不拔
          ) {
            // :4790
            await era.print(`喊着下流的话、${target_name}一边扭动着腰。`); // :4791
          } else if (
            (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
              era.get(`abl:${target}:10`) >= 5 ||
              era.get(`talent:${target}:85`) ||
              era.get(`talent:${target}:76`)) &&
            era.get(`palam:${target}:5`) >= PALAMLV[4]
          ) {
            // :4792
            await era.print(`聊天、${target_name}一边发出着`); // :4793
            if (
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`)
            ) {
              // :4794
              await era.print(`快乐的`); // :4795
            } else if (
              era.get(`tequip:${target}:44`) ||
              era.get(`tequip:${target}:49`)
            ) {
              // :4796
              await era.print(`痛苦的`); // :4797
            } // :4797-4798
            await era.print(`声音、一边拼命地回应着${player_name}。`); // :4799
          } else if (era.get(`talent:${target}:76`) === 1) {
            // :4801
            await era.print(
              `在与${player_name}对话着的同时、${target_name}献媚般的依偎了过来。`,
            ); // :4802
            await era.printAndWait(`「啊嗯…没有色情的情调了吧？」`); // :4803
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5
          ) {
            // :4804
            await era.print(
              `${target_name}在很融洽的气氛中与${player_name}说着话。`,
            ); // :4805
            await era.printAndWait(`「这样平静的说话…还是被抓后的第一次呢…」`); // :4806
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[2] ||
            era.get(`abl:${target}:10`) >= 3
          ) {
            // :4807
            await era.print(`${target_name}唯唯诺诺的回应着${player_name}。`); // :4808
            await era.printAndWait(`「是、是的…」`); // :4809
          } else {
            // :4809-4810
            await era.print(`${target_name}只是认真的听着${player_name}说话…`); // :4811
          } // :4811-4812
        } // :4811-4813
      } // :4814-4815
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :4815
      chara(target).kojo.交谈 = 1; // :4815
      return 0; // :4815-4816
    } else {
      // :4817-4818
      if (era.get(`tequip:${target}:53`) === 1) {
        // :4819

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :4822
          await era.printAndWait(''); // :4822-4823
        } else {
          // :4824-4825
          await era.print(`${master_name}催促${target_name}进行一下自我介绍。`); // :4825
          if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:85`) ||
              era.get(`abl:${target}:10`) >= 5) &&
            game.event.插着不拔
          ) {
            // :4826
            await era.print(
              `${target_name}一边扭动着腰一边对着水晶球说着情话。`,
            ); // :4827
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4828
            game.kojo.录像内容 |= 2; // :4828
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) ||
              era.get(`abl:${target}:11`) >= 5) &&
            game.event.插着不拔
          ) {
            // :4829
            await era.print(
              `${target_name}一边扭着腰一边对着水晶球不停喊着下流的话`,
            ); // :4830
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4831
            game.kojo.录像内容 |= 2; // :4831
          } else if (
            rand_n(3) === 0 &&
            (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
          ) {
            // :4832
            await era.print(`于是${target_name}将自己的本名、至今为止的性体验`); // :4833
            if (era.get(`abl:${target}:31`) >= 3) {
              // :4835
              await era.print(`以及自慰时意淫的内容`); // :4835
            } // :4835
            await era.print(`津津有味的说了起来……`); // :4836
            await era.print(
              `只是想想这个水晶球在故乡公开放映的样子、${target_name}的股间就开始湿了……`,
            ); // :4837
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4838
            game.kojo.录像内容 |= 2; // :4838
          } else if (era.get(`talent:${target}:76`) === 1) {
            // :4839
            await era.print(
              `${target_name}向着水晶球一边做一边开始下流的自我介绍。`,
            ); // :4840
            await era.printAndWait(
              `「哈…${sc()}原来是勇者${target_name} ${heart(1)}」`,
            ); // :4841
            await era.printAndWait(
              `「但是狂妄自大的${sc()}总是逞强、在输给怪物后被抓住了………」`,
            ); // :4842
            await era.printAndWait(
              `「之后…被魔王大人进行调教………堕落了${heart(1)}」`,
            ); // :4843
            await era.printAndWait(
              `${target_name}像蛇一样蠕动着身体同时张开了双腿……………`,
            ); // :4844
            await era.printAndWait(
              `「怎么样啊…${sc()}的身体…没有哪个部分是魔王大人没见过的…${heart(1)}」`,
            ); // :4845
            await era.printAndWait(
              `「现在…最喜欢被魔王大人那样折磨…强暴…我感觉很…有快感…所以请看吧${heart(1)}」`,
            ); // :4846
            await era.printAndWait(
              `「${sc()}有多舒服、能稍微了解一点我就很开心了啊${heart(3)}」`,
            ); // :4847
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4848
            game.kojo.录像内容 |= 2; // :4848
          } else if (era.get(`talent:${target}:85`) === 1) {
            // :4849
            await era.printAndWait(
              `${target_name}羞耻的蠕动着身体、兴奋着连录像开始了都没有注意到………`,
            ); // :4850
            await era.printAndWait(
              `「啊嗯…${sc()}的告白被大家都知道了什么的好羞耻啊……」`,
            ); // :4851
            await era.printAndWait(
              `「魔王大人被人那样的讨厌…不过其实还是非常的温柔………${heart(1)}」`,
            ); // :4852
            await era.printAndWait(
              `「${sc()}在进行各种各样的侍奉的时候…啊啊啊哎呀…只是回忆下而已就已经湿了呢${heart(1)}」`,
            ); // :4853
            await era.printAndWait(
              `「哎、全部都录下来了？…呀不要不要快点停下啊！」`,
            ); // :4854
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4855
            game.kojo.录像内容 |= 2; // :4855
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
          ) {
            // :4856
            await era.print(`${target_name}对着水晶球说着下流的话。`); // :4857
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4858
            game.kojo.录像内容 |= 2; // :4858
          } else if (
            era.get(`abl:${target}:10`) >= 3 ||
            era.get(`abl:${target}:11`) >= 4 ||
            era.get(`abl:${target}:17`) >= 2
          ) {
            // :4859
            await era.print(`${target_name}对着水晶球进行着自我介绍。`); // :4860
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4861
            game.kojo.录像内容 |= 2; // :4861
          } else {
            // :4861-4862
            await era.printAndWait(
              `${target_name}在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。`,
            ); // :4863
            await era.printAndWait(`「要…要把录像送回故乡………？」`); // :4864
            await era.printAndWait(
              `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
            ); // :4865
          } // :4865-4866
        } // :4865-4867
      } else {
        // :4868-4869

        if (era_flag.assi > 0 && era_flag.assiplay) {
          // :4870
          await era.printAndWait(''); // :4870-4871
        } else {
          // :4872-4873
          await era.print(`${player_name}让`); // :4873
          if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:85`) ||
              era.get(`abl:${target}:10`) >= 5) &&
            game.event.插着不拔
          ) {
            // :4874
            await era.print(
              `${target_name}一边扭动着腰一边与${player_name}说着情话。`,
            ); // :4875
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) ||
              era.get(`abl:${target}:11`) >= 5) &&
            game.event.插着不拔
          ) {
            // :4876
            await era.print(
              `${target_name}一边扭动着腰一边与${player_name}喊着下流的话。`,
            ); // :4877
          } else if (
            (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
              era.get(`abl:${target}:10`) >= 5 ||
              era.get(`talent:${target}:85`) ||
              era.get(`talent:${target}:76`)) &&
            era.get(`palam:${target}:5`) >= PALAMLV[4]
          ) {
            // :4878
            await era.print(`${target_name}一边发出着`); // :4879
            if (
              era.get(`tequip:${target}:11`) ||
              era.get(`tequip:${target}:13`) ||
              era.get(`tequip:${target}:14`) ||
              era.get(`tequip:${target}:15`) ||
              era.get(`tequip:${target}:16`) ||
              era.get(`tequip:${target}:17`)
            ) {
              // :4880
              await era.print(`快乐的`); // :4881
            } else if (
              era.get(`tequip:${target}:44`) ||
              era.get(`tequip:${target}:49`)
            ) {
              // :4882
              await era.print(`痛苦的`); // :4883
            } // :4883-4884
            await era.print(`声音、一边拼命地回应着${player_name}。`); // :4885
          } else if (era.get(`talent:${target}:76`) === 1) {
            // :4887
            await era.print(
              `在与${player_name}对话着的同时、${target_name}献媚般的依偎了过来。`,
            ); // :4888
            await era.printAndWait(
              `「啊啊啊…明明只是普通的话、总觉得气氛变的怪怪的了………」`,
            ); // :4889
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5
          ) {
            // :4890
            await era.print(
              `${target_name}在很融洽的气氛中与${player_name}说着话。`,
            ); // :4891
            await era.printAndWait(`「呼呼…这样平静的气氛还能说什么…………」`); // :4892
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[2] ||
            era.get(`abl:${target}:10`) >= 3
          ) {
            // :4893
            await era.print(`${target_name}唯唯诺诺的回应着${player_name}。`); // :4894
            await era.printAndWait(`「是、是的…」`); // :4895
          } else {
            // :4895-4896
            await era.print(`${target_name}只是认真的听着${player_name}说话…`); // :4897
          } // :4897-4898
        } // :4897-4899
      } // :4897-4900
      return 0; // :4897-4901
    } // :4897-4902
  } // :4903-4907

  if (era_flag.selectcom === 123) {
    // :4909

    if (chara(target).kojo.乳夹口交 === 0) {
      // :4911

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4913
        await era.printAndWait(`「哈呜…嗯…啊哈…呜…咿…这样…嗯！」`); // :4914
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡不断的刺激………`,
        ); // :4915
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :4917
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、精心的吸吮着从乳沟里露出来的龟头。`,
        ); // :4918
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4920
          await era.printAndWait(
            `「啊嗯…因为是大乳房所以说很舒服？ 唔呼呼${heart(1)}」`,
          ); // :4920
        } // :4920
        await era.printAndWait(
          `「啊呜…啾…啾…呼…很高兴能充分的侍奉小鸡鸡呢${heart(1)}」`,
        ); // :4921
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4923
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、温柔的吻着从乳沟里露出来的龟头。`,
        ); // :4924
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4926
          await era.printAndWait(
            `「啊啊乳房更加舒服了哦${heart(1)} 满满的侍奉啊${heart(1)}」`,
          ); // :4926
        } // :4926
        await era.printAndWait(
          `「啊啊嗯…好可爱的小鸡鸡…嘛啾啾…哈啊…会让你更舒服的${heart(1)}」`,
        ); // :4927
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4929
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、伸出舌头舔着从乳沟里露出来的龟头。`,
        ); // :4930
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4932
          await era.printAndWait(
            `「已经…小鸡鸡这么精神了啊…开始钻出${sc()}的乳房了………」`,
          ); // :4932
        } // :4932
        await era.printAndWait(`「呜哦…嗯哦…咕噜…啾啾…咕噜…嗯…咿、哈…哈………」`); // :4933
      } else {
        // :4934-4935
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、吻了从乳沟里露出来的龟头。`,
        ); // :4936
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4938
          await era.printAndWait(`「啊啊啊…${sc()}的…乳房…被侵犯了………」`); // :4938
        } // :4938
        await era.printAndWait(`「嘛啊…啾…啾…咕噜…嗯…啾啾………」`); // :4939
      } // :4939-4940
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :4941
      chara(target).kojo.乳夹口交 = 1; // :4941
      return 0; // :4941-4942
    } else {
      // :4943-4944

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :4946
        await era.printAndWait(`「哈呜…嗯…啊哈…呜…咿…这样…嗯！」`); // :4947
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡不断的刺激………`,
        ); // :4948
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4950
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、精心的吸吮着从乳沟里露出来的龟头。`,
        ); // :4951
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4953
          await era.printAndWait(
            `「啊嗯…因为是大乳房所以说很舒服？ 唔呼呼${heart(1)}」`,
          ); // :4953
        } // :4953
        await era.printAndWait(
          `「啊呜…啾…啾…呼…很高兴能充分的侍奉小鸡鸡呢${heart(1)}」`,
        ); // :4954
        // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :4955
        chara(target).kojo.乳夹口交 = 5; // :4955
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4957
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、温柔的吻着从乳沟里露出来的龟头。`,
        ); // :4958
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4960
          await era.printAndWait(
            `「啊啊乳房更加舒服了哦${heart(1)} 满满的侍奉啊${heart(1)}」`,
          ); // :4960
        } // :4960
        await era.printAndWait(
          `「啊啊嗯…好可爱的小鸡鸡…嘛啾啾…哈啊…会让你更舒服的${heart(1)}」`,
        ); // :4961
        // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :4962
        chara(target).kojo.乳夹口交 = 4; // :4962
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :4964
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、伸出舌头舔着从乳沟里露出来的龟头。`,
        ); // :4965
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4967
          await era.printAndWait(
            `「已经…小鸡鸡这么精神了啊…开始钻出${sc()}的乳房了………」`,
          ); // :4967
        } // :4967
        await era.printAndWait(`「呜哦…嗯哦…咕噜…啾啾…咕噜…嗯…咿、哈…哈………」`); // :4968
        // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :4969
        chara(target).kojo.乳夹口交 = 3; // :4969
      } else if (chara(target).kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        // :4971
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、吻了从乳沟里露出来的龟头。`,
        ); // :4972
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          // :4974
          await era.printAndWait(`「啊啊啊…${sc()}的…乳房…被侵犯了………」`); // :4974
        } // :4974
        await era.printAndWait(`「嘛啊…啾…啾…咕噜…嗯…啾啾………」`); // :4975
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :4976
        chara(target).kojo.乳夹口交 = 2; // :4976
      } // :4976-4977
      return 0; // :4976-4978
    } // :4976-4979
  } // :4980-4982

  if (era_flag.selectcom === 125) {
    // :4984

    if (chara(target).kojo.口交时自慰 === 0) {
      // :4986

      if (era.get(`talent:${target}:76`) === 1) {
        // :4988
        await era.printAndWait(
          `${target_name}一边紧紧的揪住${player_name}的小鸡鸡一边开始了自慰。`,
        ); // :4989
        await era.printAndWait(
          `「啊呜…嗯…嗯哈…一边侍奉着小鸡鸡…一边自慰最棒了啊${heart(1)}」`,
        ); // :4990
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :4992
        await era.printAndWait(
          `${target_name}被${player_name}命令乖乖的伸出手指到秘裂处、一边自慰一边开始侍奉小鸡鸡。`,
        ); // :4993
        await era.printAndWait(
          `「啊啊啊…虽然不情愿…不过…也不错…很舒服啊${heart(1)}」`,
        ); // :4994
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4996
        await era.printAndWait(
          `${target_name}被${player_name}命令就这样一边口交一边开始自慰。`,
        ); // :4997
        await era.printAndWait(`「啊啊啊…呼…啾…啾啪…嗯哦…嗯嗯${heart(1)}」`); // :4998
      } else {
        // :4999-5000
        await era.printAndWait(
          `${target_name}被${player_name}多次命令、有些犹豫的嘴里含着小鸡鸡开始了自慰。`,
        ); // :5001
        await era.printAndWait(
          `「啊啊啊…这、这么不知羞耻的事情…啊…呜嗯…嗯…啊哈…呜嗯！」`,
        ); // :5002
      } // :5002-5003
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :5004
      chara(target).kojo.口交时自慰 = 1; // :5004
      return 0; // :5004-5005
    } else {
      // :5006-5007

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5009
        await era.printAndWait(
          `${target_name}一边紧紧的揪住${player_name}的小鸡鸡一边开始了自慰。`,
        ); // :5010
        await era.printAndWait(
          `「啊呜…嗯…嗯哈…一边侍奉着小鸡鸡…一边自慰最棒了啊${heart(1)}」`,
        ); // :5011
        await era.printAndWait(
          `${target_name}一边把小鸡鸡吞进了喉咙的最里面一边继续自慰………`,
        ); // :5012
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :5013
        chara(target).kojo.口交时自慰 = 5; // :5013
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5015
        await era.printAndWait(
          `${target_name}在${player_name}的命令下碳刷的向秘裂伸出手指、开始一边自慰一边奉仕小鸡鸡。`,
        ); // :5016
        await era.printAndWait(
          `「啊啊啊…虽然不情愿…不过…也不错…很舒服啊${heart(1)}」`,
        ); // :5017
        await era.printAndWait(
          `${target_name}的眼神慢慢融化同时不断的口腔侍奉………`,
        ); // :5018
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :5019
        chara(target).kojo.口交时自慰 = 4; // :5019
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5021
        await era.printAndWait(
          `${target_name}被${player_name}命令就这样一边口交一边开始自慰。`,
        ); // :5022
        await era.printAndWait(`「啊啊啊…呼…啾…啾啪…嗯哦…嗯嗯${heart(1)}」`); // :5023
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :5024
        chara(target).kojo.口交时自慰 = 3; // :5024
      } else if (
        chara(target).kojo.口交时自慰 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :5026
        await era.printAndWait(
          `${target_name}被${player_name}多次命令、有些犹豫的嘴里含着小鸡鸡开始了自慰。`,
        ); // :5027
        await era.printAndWait(
          `「啊啊啊…这、这么不知羞耻的事情…啊…呜嗯…嗯…啊哈…呜嗯！」`,
        ); // :5028
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :5029
        chara(target).kojo.口交时自慰 = 2; // :5029
      } // :5029-5030
      return 0; // :5029-5031
    } // :5029-5032
  } // :5033-5036

  if (era_flag.selectcom === 126) {
    // :5038

    if (chara(target).kojo.手搓口交 === 0) {
      // :5040

      if (era.get(`talent:${target}:76`) === 1) {
        // :5042
        await era.printAndWait(
          `「哈…像这样给你揉也很舒服啊…这里的顶端稍微舔下又怎么样呢？」`,
        ); // :5043
        await era.printAndWait(
          `${target_name}淫乱的笑着用指头抓住了${player_name}的小鸡鸡、激烈的套弄起来同时用嘴含住了龟头………`,
        ); // :5044
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5046
        await era.printAndWait(
          `${target_name}用融化了的瞳孔仰望着${player_name}的小鸡鸡用双手套弄起来同时用嘴含住了龟头。`,
        ); // :5047
        await era.printAndWait(`「啊啊啊…请充分的享受吧…${heart(1)}」`); // :5048
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :5050
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        ); // :5051
        await era.printAndWait(
          `「嘛啾啾…咕啦…哈啊啊………这里被摩擦…最喜欢了啊${heart(1)}」`,
        ); // :5052
      } else {
        // :5053-5054
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        ); // :5055
        await era.printAndWait(`「哈…啊啊啊…嗯…小鸡鸡开始颤抖了…啊啊啊」`); // :5056
      } // :5056-5057
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :5058
      chara(target).kojo.手搓口交 = 1; // :5058
      return 0; // :5058-5059
    } else {
      // :5060-5061

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5063
        await era.printAndWait(
          `「哈…像这样给你揉也很舒服啊…这里的顶端稍微舔下又怎么样呢？」`,
        ); // :5064
        await era.printAndWait(
          `${target_name}淫乱的笑着用指头抓住了${player_name}的小鸡鸡、激烈的套弄起来同时用嘴含住了龟头。`,
        ); // :5065
        await era.printAndWait(
          `「啊哈呼呜…顶到稍微有点抽搐了…真的非常可爱${heart(1)} 啊～…哈呜咕噜…啾呜呜${heart(1)}」`,
        ); // :5066
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :5067
        chara(target).kojo.手搓口交 = 5; // :5067
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5069
        await era.printAndWait(
          `${target_name}用融化了的瞳孔仰望着${player_name}的小鸡鸡用双手套弄起来同时用嘴含住了龟头。`,
        ); // :5070
        await era.printAndWait(`「啊啊啊…请充分的享受吧…${heart(1)}」`); // :5071
        await era.printAndWait(
          `「手和嘴巴…色色的发热了…脑袋了一片浆糊${heart(1)}」`,
        ); // :5072
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :5073
        chara(target).kojo.手搓口交 = 4; // :5073
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5075
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        ); // :5076
        await era.printAndWait(
          `「嘛啾啾…咕啦…哈啊啊………这里被摩擦…最喜欢了啊${heart(1)}」`,
        ); // :5077
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :5078
        chara(target).kojo.手搓口交 = 3; // :5078
      } else if (chara(target).kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        // :5080
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        ); // :5081
        await era.printAndWait(`「哈哈…啊呜…啾啾…咕噜…呼${heart(1)}」`); // :5082
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :5083
        chara(target).kojo.手搓口交 = 2; // :5083
      } // :5083-5084
      return 0; // :5083-5085
    } // :5083-5086
  } // :5083-5087

  if (era_flag.selectcom === 127) {
    // :5093

    if (chara(target).kojo.真空口交 === 0) {
      // :5095

      if (era.get(`talent:${target}:76`) === 1) {
        // :5097
        await era.printAndWait(
          `${target_name}高兴的吸住了${player_name}的小鸡鸡、一边发出下流的声音一边开始用力的吸了起来。`,
        ); // :5098
        await era.printAndWait(
          `「嗯呜…嗯啾噜啾噜………啾吧啾噜啾啾啾呜呜呜呜${heart(1)}」`,
        ); // :5099
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5101
        await era.printAndWait(
          `${target_name}眯着眼睛吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        ); // :5102
        await era.printAndWait(
          `「呜咕…嗯啾噜…啾啪…啾噜嗯嗯啾呜嗯啾呜呜${heart(1)}」`,
        ); // :5103
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :5105
        await era.printAndWait(
          `${target_name}用嘴唇夹住了${player_name}的小鸡鸡一边发出声音一边开始用力的吸了起来。`,
        ); // :5106
        await era.printAndWait(`「啾噜…啾啾…呼呼…啾呜嗯」`); // :5107
      } else {
        // :5108-5109
        await era.printAndWait(
          `${target_name}流着眼泪吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        ); // :5110
        await era.printAndWait(`「呜咕…嗯咕…啾噜」`); // :5111
      } // :5111-5112
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :5113
      chara(target).kojo.真空口交 = 1; // :5113
      return 0; // :5113-5114
    } else {
      // :5115-5116

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5118
        await era.printAndWait(
          `${target_name}高兴的吸住了${player_name}的小鸡鸡、一边发出下流的声音一边开始用力的吸了起来。`,
        ); // :5119
        await era.printAndWait(
          `「嗯呜…嗯啾噜啾噜………啾吧啾噜啾啾啾呜呜呜呜${heart(1)}」`,
        ); // :5120
        await era.printAndWait(
          `「…噗哈…啊啊嗯…这样满满的射进来是${sc()}的一切啊${heart(1)}」`,
        ); // :5121
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :5122
        chara(target).kojo.真空口交 = 5; // :5122
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5124
        await era.printAndWait(
          `${target_name}眯着眼睛吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        ); // :5125
        await era.printAndWait(
          `「呜咕…嗯啾噜…啾啪…啾噜嗯嗯啾呜嗯啾呜呜${heart(1)}」`,
        ); // :5126
        await era.printAndWait(
          `「嗯哈…前列腺液…还有精液…大家${sc()}吃饱了${heart(1)}」`,
        ); // :5127
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :5128
        chara(target).kojo.真空口交 = 4; // :5128
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5130
        await era.printAndWait(
          `${target_name}用嘴唇夹住了${player_name}的小鸡鸡一边发出声音一边开始用力的吸了起来。`,
        ); // :5131
        await era.printAndWait(`「啾噜…啾啾…呼呼…啾呜嗯」`); // :5132
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :5133
        chara(target).kojo.真空口交 = 3; // :5133
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        // :5135
        await era.printAndWait(
          `${target_name}流着眼泪吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        ); // :5136
        await era.printAndWait(`「呜咕…嗯咕…啾噜」`); // :5137
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :5138
        chara(target).kojo.真空口交 = 2; // :5138
      } // :5138-5139
      return 0; // :5138-5140
    } // :5138-5141
  } // :5142-5145

  if (era_flag.selectcom === 69) {
    // :5147

    if (chara(target).kojo.六九式 === 0) {
      // :5149

      if (era.get(`talent:${target}:76`) === 1) {
        // :5151
        await era.printAndWait(
          `${target_name}的秘裂每次有快感都会逃开、双唇强烈的夹紧小鸡鸡。`,
        ); // :5152
        await era.printAndWait(
          `「呼…不要再戏弄我了…这样没办法再侍奉了啦…啊嗯啊啊啊${heart(1)}」`,
        ); // :5153
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5155
        await era.printAndWait(
          `${target_name}一边忍受着秘裂传来的快感一边吸吮着小鸡鸡。`,
        ); // :5156
        await era.printAndWait(
          `「啊哈…嗯嗯呼…啊啊啊…讨厌啦${heart(1)}真是讨厌啦${heart(1)}」`,
        ); // :5157
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :5159
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}在秘裂的快感下发出娇吟。`,
        ); // :5160
        await era.printAndWait(
          `「呀哈…不、不行了…再被戏弄的话…啊啊啊啊啊嗯！」`,
        ); // :5161
      } else {
        // :5162-5163
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}一边忍受着秘裂传来的快感一边扭着屁股。`,
        ); // :5164
        await era.printAndWait(`「咕呼…啊啊咿…停、停下吧………咿啊啊！」`); // :5165
      } // :5165-5166
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :5167
      chara(target).kojo.六九式 = 1; // :5167
      return 0; // :5167-5168
    } else {
      // :5169-5170

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5172
        await era.printAndWait(
          `${target_name}的秘裂每次有快感都会逃开、双唇强烈的夹紧小鸡鸡。`,
        ); // :5173
        await era.printAndWait(
          `「呼～…不要再戏弄我了…这样没办法再侍奉了啦…啊嗯啊啊啊${heart(1)}」`,
        ); // :5174
        await era.printAndWait(
          `「已经…回报你了呦…啊嗯…哈呜…啾啾${heart(1)} 咕噜…啾呜呜」`,
        ); // :5175
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :5176
        chara(target).kojo.六九式 = 5; // :5176
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5178
        await era.printAndWait(
          `${target_name}一边忍受着秘裂传来的快感一边吸吮着小鸡鸡。`,
        ); // :5179
        await era.printAndWait(
          `「啊哈…嗯嗯呼…啊啊啊…讨厌啦${heart(1)}真是讨厌啦${heart(1)}」`,
        ); // :5180
        await era.printAndWait(`「啊啊啊…必须吮吸小鸡鸡么…啊哈嗯${heart(1)}」`); // :5181
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :5182
        chara(target).kojo.六九式 = 4; // :5182
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5184
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}在秘裂的快感下发出娇吟。`,
        ); // :5185
        await era.printAndWait(
          `「呀哈…不、不行了…再被戏弄的话…啊啊啊啊啊嗯！」`,
        ); // :5186
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :5187
        chara(target).kojo.六九式 = 3; // :5187
      } else if (chara(target).kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        // :5189
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}一边忍受着秘裂传来的快感一边扭着屁股。`,
        ); // :5190
        await era.printAndWait(`「咕呼…啊啊咿…停、停下吧………咿啊啊！」`); // :5191
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :5192
        chara(target).kojo.六九式 = 2; // :5192
      } // :5192-5193
      return 0; // :5192-5194
    } // :5192-5195
  } // :5196-5199

  if (era_flag.selectcom === 124) {
    // :5201

    if (chara(target).kojo.深喉 === 0) {
      // :5203

      if (era.get(`talent:${target}:76`) === 1) {
        // :5205
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、用双唇夹紧了根部。`,
        ); // :5206
        await era.printAndWait(`「嗯呜…啊哈…嗯啾噜…啾咕嗯${heart(1)}」`); // :5207
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5209
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、舌头开始紧贴着动了起来。`,
        ); // :5210
        await era.printAndWait(
          `「呜咕…嗯啾噜${heart(1)} 嗯哦…咕啾…咕啾…${heart(1)}」`,
        ); // :5211
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :5213
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        ); // :5214
        await era.printAndWait(`「呜咕…嗯咕…啊哈嗯…嗯嗯嗯呜！」`); // :5215
      } else {
        // :5216-5217
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        ); // :5218
        await era.printAndWait(`「啊哈…呜嗯…呜啾…嗯呜！？」`); // :5219
      } // :5219-5220
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :5221
      chara(target).kojo.深喉 = 1; // :5221
      return 0; // :5221-5222
    } else {
      // :5223-5224

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5226
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、用双唇夹紧了根部。`,
        ); // :5227
        await era.printAndWait(`「嗯呜…啊哈…嗯啾噜…啾咕嗯${heart(1)}」`); // :5228
        await era.printAndWait(
          `（${sc()}的喉咙啊…是小鸡鸡的容器啊…${heart(1)}）`,
        ); // :5229
        // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :5230
        chara(target).kojo.深喉 = 5; // :5230
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5232
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、舌头开始紧贴着动了起来。`,
        ); // :5233
        await era.printAndWait(
          `「呜咕…嗯啾噜${heart(1)} 嗯哦…咕啾…咕啾…${heart(1)}」`,
        ); // :5234
        await era.printAndWait(`（就这样…在喉咙的深处射精吧…${heart(1)}）`); // :5235
        // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :5236
        chara(target).kojo.深喉 = 4; // :5236
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5238
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        ); // :5239
        await era.printAndWait(`「呜咕…嗯咕…啊哈嗯…嗯嗯嗯呼呜！」`); // :5240
        // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :5241
        chara(target).kojo.深喉 = 3; // :5241
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        // :5243
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        ); // :5244
        await era.printAndWait(
          `「呜咕！？嗯…噗…呜嗯…嗯嗯…嗯嗯嗯～～～～！？」`,
        ); // :5245
        // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :5246
        chara(target).kojo.深喉 = 2; // :5246
      } // :5246-5247
      return 0; // :5246-5248
    } // :5246-5249
  } // :5250-5253

  if (era_flag.selectcom === 80) {
    // :5255

    if (chara(target).kojo.强制口交 === 0) {
      // :5257

      if (era.get(`abl:${target}:16`) >= 3) {
        // :5259
        await era.printAndWait(`「呼～…嗯…呜嗯♪…嗯呜…♪」`); // :5260
        await era.printAndWait(
          `${target_name}用喉咙的最里面接受了${player_name}的小鸡鸡………`,
        ); // :5261
      } else {
        // :5262-5263
        await era.printAndWait(`「咕…嗯…嗯咕…嗯…呼嗯嗯！呜嗯…嗯～！」`); // :5264
        await era.printAndWait(
          `${target_name}忍耐着每次被${player_name}插进喉咙的最里面都像快要窒息了一样的感觉………`,
        ); // :5265
      } // :5265-5266
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :5267
      chara(target).kojo.强制口交 = 1; // :5267
      return 0; // :5267-5268
    } else {
      // :5269-5270

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5272
        await era.printAndWait(
          `「嗯哦…呜咕…啊哈嗯…嗯…噗…嗯咕呜嗯${heart(1)}」`,
        ); // :5273
        await era.printAndWait(
          `${target_name}被激烈的侵犯${player_name}喉咙的最里面的同时也感到了快感。`,
        ); // :5274
        await era.printAndWait(
          `「啊…${sc()}的喉咙已经…是为了取悦小鸡鸡而存在的了${heart(1)}…嗯哦…哦…嗯呼嗯嗯${heart(1)}」`,
        ); // :5275
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5277
        await era.printAndWait(`「啊哈…嗯♪…嗯咕…嗯嗯呼♪」`); // :5278
        await era.printAndWait(
          `${target_name}被${player_name}的小鸡鸡侵犯着喉咙的最里面的时候发出了喜悦的声音………`,
        ); // :5279
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :5280
        chara(target).kojo.强制口交 = 4; // :5280
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5282
        await era.printAndWait(`「啊哈嗯…嗯…嗯…咿咕♪…啊哈啊哈嗯～♪」`); // :5283
        await era.printAndWait(
          `${target_name}一边被${player_name}侵犯着喉咙的最里面一边熟练的牙齿离开小鸡鸡用舌头那样缠绕着舔了起来………`,
        ); // :5284
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :5285
        chara(target).kojo.强制口交 = 3; // :5285
      } else if (chara(target).kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        // :5287
        await era.printAndWait(`「嗯…嗯呜咿…嗯咕…嗯…咕呼…咕…呜呜呜～！」`); // :5288
        await era.printAndWait(
          `${target_name}用喉咙的最里面接受了${player_name}的小鸡鸡………`,
        ); // :5289
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :5290
        chara(target).kojo.强制口交 = 2; // :5290
      } // :5290-5291
      return 0; // :5290-5292
    } // :5290-5293
  } // :5294-5297

  if (era_flag.selectcom === 87) {
    // :5301
    const P = piercing_state.p;

    if (chara(target).kojo.穿环 === 0) {
      // :5304

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5306
        await era.print(''); // :5306-5307
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :5309

        if (chara(target).train.穿环状态 & P) {
          // :5311
          await era.printAndWait(
            `${target_name}感受到肌肤被第一次穿环的痛苦不禁皱起了脸。`,
          ); // :5312

          if (P === 1) {
            // :5314
            await era.printAndWait(
              `「咿…啊啊啊…乳头能戴上这么漂亮的环真是好棒啊…${heart(1)}」`,
            ); // :5315
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为这种地方能被穿上两个环而高兴………`,
            ); // :5316
          } else if (P === 2) {
            // :5318
            await era.printAndWait(
              `「啊哈…肚脐戴上这个显得好时尚啊…${heart(1)}」`,
            ); // :5319
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为被穿上环而高兴………`,
            ); // :5320
          } else if (P === 4) {
            // :5322
            await era.printAndWait(
              `「啊…这样的地方要是被穿上环…就能一直永远的感受到主人了…${heart(1)}」`,
            ); // :5323
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为阴唇能穿上环而高兴………`,
            ); // :5324
          } else if (P === 8) {
            // :5326
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5327
              await era.printAndWait(
                `「哈啊…被穿环好兴奋感觉小鸡鸡都比平时变大了似的…${heart(1)}」`,
              ); // :5328
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为小鸡鸡能穿上环而高兴………`,
              ); // :5329
            } else {
              // :5329-5330
              await era.printAndWait(
                `「这样的地方能得到环什么的…感觉太强烈了呜…${heart(1)}」`,
              ); // :5331
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为阴蒂能穿上环而高兴………`,
              ); // :5332
            } // :5332-5333
          } else if (P === 16) {
            // :5335
            await era.printAndWait(
              `「啊哎…就这样给你满满的口交啊${heart(1)}」`,
            ); // :5336
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为舌尖能穿上环而高兴………`,
            ); // :5337
          } else if (P === 32) {
            // :5339
            await era.printAndWait(`「嗯…唔呼呼…就这样想要满满的接吻哟…」`); // :5340
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            ); // :5341
          } else if (P === 64) {
            // :5343
            await era.printAndWait(`「啊哈…${sc()}好像变成了家畜一样…」`); // :5344
            await era.printAndWait(`${target_name}一再抚摩着鼻环………`); // :5345
          } // :5345-5346
        } else {
          // :5347-5348
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`); // :5349
        } // :5349-5350
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5352

        if (chara(target).train.穿环状态 & P) {
          // :5354
          await era.printAndWait(
            `${target_name}感受到肌肤被第一次穿环的痛苦发出了细小的悲鸣。`,
          ); // :5355

          if (P === 1) {
            // :5357
            await era.printAndWait(
              `「虽、虽然很痛…如果这样能让主人高兴…${heart(1)}」`,
            ); // :5358
            await era.printAndWait(`${target_name}两个乳头环紧紧的嵌了进去………`); // :5359
          } else if (P === 2) {
            // :5361
            await era.printAndWait(`「唔呼呼、总觉得好漂亮…♪」`); // :5362
            await era.printAndWait(`${target_name}从四周抚摩着肚脐环………`); // :5363
          } else if (P === 4) {
            // :5365
            await era.printAndWait(
              `「哈哈…好厉害…这样的地方要是被穿上环…已经…已经…！」`,
            ); // :5366
            await era.printAndWait(
              `${target_name}对阴唇被穿环表现的相当兴奋………`,
            ); // :5367
          } else if (P === 8) {
            // :5369
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5370
              await era.printAndWait(`「啊呜…小鸡鸡一直勃起着了啊………」`); // :5371
              await era.printAndWait(
                `${target_name}一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………`,
              ); // :5372
            } else {
              // :5372-5373
              await era.printAndWait(
                `「啊…这样的地方被穿上环很有爱的感觉啊………♪」`,
              ); // :5374
              await era.printAndWait(`${target_name}兴奋的红着脸………`); // :5375
            } // :5375-5376
          } else if (P === 16) {
            // :5378
            await era.printAndWait(`「哈哈…就这样想满满的吻…呦…♪」`); // :5379
            await era.printAndWait(
              `${target_name}伸出穿了环的舌头诱惑着${player_name}………`,
            ); // :5380
          } else if (P === 32) {
            // :5382
            await era.printAndWait(`「啊哈…固固的固定下来了…♪」`); // :5383
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            ); // :5384
          } else if (P === 64) {
            // :5386
            await era.printAndWait(`「总、总觉得像家畜一样……哎呀………♪」`); // :5387
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸………`,
            ); // :5388
          } // :5388-5389
        } else {
          // :5390-5391
          await era.printAndWait(
            `${target_name}寂寞的揉着环被拆下后留下的痕迹………`,
          ); // :5392
        } // :5392-5393
      } else {
        // :5394-5395

        if (chara(target).train.穿环状态 & P) {
          // :5397
          await era.printAndWait(
            `${target_name}感受到肌肤被第一次穿环的痛苦发出了悲鸣。`,
          ); // :5398

          if (P === 1) {
            // :5400
            await era.printAndWait(`「讨厌啊…乳头好痛呦…对于穿环什么的哟………」`); // :5401
            await era.printAndWait(
              `感受到乳头被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            ); // :5402
          } else if (P === 2) {
            // :5404
            await era.printAndWait(`「哈…啊啊…这样的………」`); // :5405
            await era.printAndWait(
              `感受到肚脐被穿环的痛苦${target_name}不停的流着眼泪………`,
            ); // :5406
          } else if (P === 4) {
            // :5408
            await era.printAndWait(`「不要…已经…不能去见其他人了………」`); // :5409
            await era.printAndWait(
              `感受到阴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            ); // :5410
          } else if (P === 8) {
            // :5412
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5413
              await era.printAndWait(`「嗯嗯…小鸡鸡会…好热…好痛呦………」`); // :5414
              await era.printAndWait(
                `感受到小鸡鸡被穿环的痛苦${target_name}流下了眼泪………`,
              ); // :5415
            } else {
              // :5415-5416
              await era.printAndWait(
                `「已、已经饶了我吧…不管什么都可以…取想这个环吧………」`,
              ); // :5417
              await era.printAndWait(
                `感受到阴蒂被穿环的痛苦${target_name}不停的流着眼泪………`,
              ); // :5418
            } // :5418-5419
          } else if (P === 16) {
            // :5421
            await era.printAndWait(`「哈…哈…这样…在那里………」`); // :5422
            await era.printAndWait(
              `感受到舌头被穿环的痛苦${target_name}好像很难说话………`,
            ); // :5423
          } else if (P === 32) {
            // :5425
            await era.printAndWait(`「呜…在那里………」`); // :5426
            await era.printAndWait(
              `感受到嘴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            ); // :5427
          } else if (P === 64) {
            // :5429
            await era.printAndWait(
              `「${sc()}这个样子不是家畜是什么啊…呜呜………」`,
            ); // :5430
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………`,
            ); // :5431
          } // :5431-5432
        } else {
          // :5433-5434
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`); // :5435
        } // :5435-5436
      } // :5437-5438
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :5438
      chara(target).kojo.穿环 = 1; // :5438
      return 0; // :5438-5439
    } else {
      // :5440-5441

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5443
        await era.print(''); // :5443-5444
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5446

        if (chara(target).train.穿环状态 & P) {
          // :5448

          if (P === 1) {
            // :5450
            await era.printAndWait(
              `「咿…啊啊啊…能被在乳头上穿环什么的…${heart(1)}」`,
            ); // :5451
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为这种地方能被穿上两个环而高兴………`,
            ); // :5452
          } else if (P === 2) {
            // :5454
            await era.printAndWait(
              `「啊哈…肚脐戴上这个显得好时尚啊…${heart(1)}」`,
            ); // :5455
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为被穿上环而高兴………`,
            ); // :5456
          } else if (P === 4) {
            // :5458
            await era.printAndWait(
              `「啊…这样的地方要是被穿上环…就能一直永远的感受到主人了…${heart(1)}」`,
            ); // :5459
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为阴唇能穿上环而高兴………`,
            ); // :5460
          } else if (P === 8) {
            // :5462
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5463
              await era.printAndWait(
                `「哈啊…被穿环好兴奋感觉小鸡鸡都比平时变大了似的…${heart(1)}」`,
              ); // :5464
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为小鸡鸡能穿上环而高兴………`,
              ); // :5465
            } else {
              // :5465-5466
              await era.printAndWait(
                `「这样的地方能得到环什么的…感觉太强烈了呜…${heart(1)}」`,
              ); // :5467
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为阴蒂能穿上环而高兴………`,
              ); // :5468
            } // :5468-5469
          } else if (P === 16) {
            // :5471
            await era.printAndWait(
              `「啊哎…就这样给你满满的口交啊${heart(1)}」`,
            ); // :5472
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为舌尖能穿上环而高兴………`,
            ); // :5473
          } else if (P === 32) {
            // :5475
            await era.printAndWait(`「嗯…唔呼呼…就这样想要满满的接吻哟…」`); // :5476
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            ); // :5477
          } else if (P === 64) {
            // :5479
            await era.printAndWait(`「啊哈…${sc()}好像变成了家畜一样…」`); // :5480
            await era.printAndWait(`${target_name}一再抚摩着鼻环………`); // :5481
          } // :5481-5482
        } else {
          // :5483-5484
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`); // :5485
        } // :5485-5486
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :5487
        chara(target).kojo.穿环 = 4; // :5487
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5489

        if (chara(target).train.穿环状态 & P) {
          // :5491

          if (P === 1) {
            // :5493
            await era.printAndWait(
              `「虽、虽然很痛…如果这样能让主人高兴…${heart(1)}」`,
            ); // :5494
            await era.printAndWait(`${target_name}两个乳头环紧紧的嵌了进去………`); // :5495
          } else if (P === 2) {
            // :5497
            await era.printAndWait(`「唔呼呼、总觉得好漂亮…♪」`); // :5498
            await era.printAndWait(`${target_name}从四周抚摩着肚脐环………`); // :5499
          } else if (P === 4) {
            // :5501
            await era.printAndWait(
              `「哈哈…好厉害…这样的地方要是被穿上环…已经…已经…！」`,
            ); // :5502
            await era.printAndWait(
              `${target_name}对阴唇被穿环表现的相当兴奋………`,
            ); // :5503
          } else if (P === 8) {
            // :5505
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5506
              await era.printAndWait(`「啊呜…小鸡鸡一直勃起着了啊………」`); // :5507
              await era.printAndWait(
                `${target_name}一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………`,
              ); // :5508
            } else {
              // :5508-5509
              await era.printAndWait(
                `「啊…这样的地方被穿上环很有爱的感觉啊………」`,
              ); // :5510
              await era.printAndWait(`${target_name}兴奋的红着脸………`); // :5511
            } // :5511-5512
          } else if (P === 16) {
            // :5514
            await era.printAndWait(`「哈哈…就这样想满满的吻…呦…♪」`); // :5515
            await era.printAndWait(
              `${target_name}伸出穿了环的舌头诱惑着${player_name}………`,
            ); // :5516
          } else if (P === 32) {
            // :5518
            await era.printAndWait(`「啊哈…固固的固定下来了…♪」`); // :5519
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            ); // :5520
          } else if (P === 64) {
            // :5522
            await era.printAndWait(`「总、总觉得像家畜一样……哎呀………♪」`); // :5523
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸………`,
            ); // :5524
          } // :5524-5525
        } else {
          // :5526-5527
          await era.printAndWait(
            `${target_name}寂寞的揉着环被拆下后留下的痕迹………`,
          ); // :5528
        } // :5528-5529
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :5530
        chara(target).kojo.穿环 = 3; // :5530
      } else if (chara(target).kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        // :5532

        if (chara(target).train.穿环状态 & P) {
          // :5534

          if (P === 1) {
            // :5536
            await era.printAndWait(`「讨厌啊…乳头好痛呦…对于穿环什么的哟………」`); // :5537
            await era.printAndWait(
              `感受到乳头被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            ); // :5538
          } else if (P === 2) {
            // :5540
            await era.printAndWait(`「哈…啊啊…这样的………」`); // :5541
            await era.printAndWait(
              `感受到肚脐被穿环的痛苦${target_name}不停的流着眼泪………`,
            ); // :5542
          } else if (P === 4) {
            // :5544
            await era.printAndWait(`「不要…已经…不能去见其他人了………」`); // :5545
            await era.printAndWait(
              `感受到阴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            ); // :5546
          } else if (P === 8) {
            // :5548
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :5549
              await era.printAndWait(`「嗯嗯…小鸡鸡会…好热…好痛呦………」`); // :5550
              await era.printAndWait(
                `感受到小鸡鸡被穿环的痛苦${target_name}流下了眼泪………`,
              ); // :5551
            } else {
              // :5551-5552
              await era.printAndWait(
                `「已、已经饶了我吧…什么都可以…取想这个环吧………」`,
              ); // :5553
              await era.printAndWait(
                `感受到阴蒂被穿环的痛苦${target_name}不停的流着眼泪………`,
              ); // :5554
            } // :5554-5555
          } else if (P === 16) {
            // :5557
            await era.printAndWait(`「哈…哈…这样…在那里………」`); // :5558
            await era.printAndWait(
              `感受到舌头被穿环的痛苦${target_name}好像很难说话………`,
            ); // :5559
          } else if (P === 32) {
            // :5561
            await era.printAndWait(`「呜…在那里………」`); // :5562
            await era.printAndWait(
              `感受到嘴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            ); // :5563
          } else if (P === 64) {
            // :5565
            await era.printAndWait(
              `「${sc()}这个样子不是家畜是什么啊…呜呜………」`,
            ); // :5566
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………`,
            ); // :5567
          } // :5567-5568
        } else {
          // :5569-5570
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`); // :5571
        } // :5571-5572
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :5573
        chara(target).kojo.穿环 = 2; // :5573
      } // :5573-5574
    } // :5573-5575
    return 0; // :5573-5576
  } // :5577-5580

  return 0;
}

// @DOG_KOJO_1 // :5583
async function dog_kojo_1(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_name(MASTER);
  const sc = () => self_call(target);

  if (era_flag.selectcom === 0) {
    // :5588

    if (chara(target).kojo.爱抚 === 0) {
      // :5590

      if (era.get(`mark:${target}:2`) >= 2) {
        // :5592
        await era.printAndWait(`「这样、狗的舌头……」`); // :5593
      } else {
        // :5594-5595
        await era.printAndWait(`「讨厌啊！　不要靠过来！」`); // :5596
      } // :5596-5597
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :5598
      chara(target).kojo.爱抚 = 1; // :5598
      return 0; // :5598-5599
    } else {
      // :5600-5601

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5603
        await era.printAndWait(`「啊哈、好舒服哦${heart(1)}　更多的舔吧」`); // :5604
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :5605
        chara(target).kojo.爱抚 = 7; // :5605
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5607
        await era.printAndWait(`「不可思议的感觉……」`); // :5608
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :5609
        chara(target).kojo.爱抚 = 6; // :5609
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5611
        await era.printAndWait(`「不可思议的感觉……」`); // :5612
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :5613
        chara(target).kojo.爱抚 = 5; // :5613
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5615
        await era.printAndWait(`「呜呜……皮肤、变敏感了……」`); // :5616
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :5617
        chara(target).kojo.爱抚 = 4; // :5617
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5619
        await era.printAndWait(`「哎、哎呀！」`); // :5620
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :5621
        chara(target).kojo.爱抚 = 3; // :5621
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :5623
        await era.printAndWait(`「天啊……救命啊……」`); // :5624
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :5625
        chara(target).kojo.爱抚 = 2; // :5625
      } // :5625-5626
      return 0; // :5625-5627
    } // :5625-5628
  } // :5629-5632

  if (era_flag.selectcom === 1) {
    // :5634

    if (chara(target).kojo.舔阴 === 0) {
      // :5636

      if (era.get(`talent:${target}:0`) === 1) {
        // :5638
        await era.printAndWait(''); // :5638-5639
      } else {
        // :5640-5641
        await era.printAndWait(''); // :5640-5642
      } // :5643-5644
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :5644
      chara(target).kojo.舔阴 = 1; // :5644
      return 0; // :5644-5645
    } else {
      // :5646-5647

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5649
        await era.printAndWait(''); // :5649-5650
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :5651
        chara(target).kojo.舔阴 = 6; // :5651
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5653
        await era.printAndWait(''); // :5653-5654
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :5655
        chara(target).kojo.舔阴 = 5; // :5655
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5657
        await era.printAndWait(''); // :5657-5658
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :5659
        chara(target).kojo.舔阴 = 4; // :5659
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5661
        await era.printAndWait(''); // :5661-5662
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :5663
        chara(target).kojo.舔阴 = 3; // :5663
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        // :5665
        await era.printAndWait(''); // :5665-5666
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :5667
        chara(target).kojo.舔阴 = 2; // :5667
      } // :5667-5668
      return 0; // :5667-5669
    } // :5667-5670
  } // :5667-5671

  if (era_flag.selectcom === 5) {
    // :5677

    if (chara(target).kojo.胸爱抚 === 0) {
      // :5679

      if (era.get(`talent:${target}:85`) === 1) {
        // :5681
        await era.printAndWait(''); // :5681-5682
      } else {
        // :5683-5684
        await era.printAndWait(''); // :5683-5685
      } // :5686-5687
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :5687
      chara(target).kojo.胸爱抚 = 1; // :5687
      return 0; // :5687-5688
    } else {
      // :5689-5690

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5692
        await era.printAndWait(''); // :5692-5693
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :5694
        chara(target).kojo.胸爱抚 = 6; // :5694
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5696
        await era.printAndWait(''); // :5696-5697
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :5698
        chara(target).kojo.胸爱抚 = 5; // :5698
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5700
        await era.printAndWait(''); // :5700-5701
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :5702
        chara(target).kojo.胸爱抚 = 4; // :5702
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5704
        await era.printAndWait(''); // :5704-5705
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :5706
        chara(target).kojo.胸爱抚 = 3; // :5706
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        // :5708
        await era.printAndWait(''); // :5708-5709
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :5710
        chara(target).kojo.胸爱抚 = 2; // :5710
      } // :5710-5711
      return 0; // :5710-5712
    } // :5710-5713
  } // :5714-5717

  if (era_flag.selectcom === 6) {
    // :5719

    if (chara(target).kojo.接吻 === 0 && game.train.初吻与自我口上) {
      // :5721

      if (era.get(`talent:${target}:136`) === 1) {
        // :5723
        await era.printAndWait(''); // :5723-5724
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :5726
        await era.printAndWait(''); // :5726-5727
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5729
        await era.printAndWait(''); // :5729-5730
      } else {
        // :5731-5732
        await era.printAndWait(''); // :5731-5733
      } // :5734-5735
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :5735
      chara(target).kojo.接吻 = 1; // :5735
      return 0; // :5735-5736
    } else if (chara(target).kojo.接吻 === 0) {
      // :5738

      if (era.get(`talent:${target}:136`) === 1) {
        // :5740
        await era.printAndWait(''); // :5740-5741
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :5743
        await era.printAndWait(''); // :5743-5744
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5746
        await era.printAndWait(''); // :5746-5747
      } else {
        // :5748-5749
        await era.printAndWait(''); // :5748-5750
      } // :5751-5752
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :5752
      chara(target).kojo.接吻 = 1; // :5752
      return 0; // :5752-5753
    } else {
      // :5754-5755

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5757
        await era.printAndWait(''); // :5757-5758
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :5759
        chara(target).kojo.接吻 = 6; // :5759
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5761
        await era.printAndWait(''); // :5761-5762
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :5763
        chara(target).kojo.接吻 = 5; // :5763
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5765
        await era.printAndWait(''); // :5765-5766
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :5767
        chara(target).kojo.接吻 = 4; // :5767
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5769
        await era.printAndWait(''); // :5769-5770
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :5771
        chara(target).kojo.接吻 = 3; // :5771
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        // :5773
        await era.printAndWait(''); // :5773-5774
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :5775
        chara(target).kojo.接吻 = 2; // :5775
      } // :5775-5776
      return 0; // :5775-5777
    } // :5775-5778
  } // :5779-5782

  if (era_flag.selectcom === 9) {
    // :5784

    if (chara(target).kojo.舔肛 === 0) {
      // :5786

      if (era.get(`talent:${target}:136`) === 1) {
        // :5788
        await era.printAndWait(''); // :5788-5789
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :5791
        await era.printAndWait(''); // :5791-5792
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5794
        await era.printAndWait(''); // :5794-5795
      } else {
        // :5796-5797
        await era.printAndWait(''); // :5796-5798
      } // :5799-5800
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :5800
      chara(target).kojo.舔肛 = 1; // :5800
      return 0; // :5800-5801
    } else {
      // :5802-5803

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5805
        await era.printAndWait(''); // :5805-5806
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :5807
        chara(target).kojo.舔肛 = 6; // :5807
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5809
        await era.printAndWait(''); // :5809-5810
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :5811
        chara(target).kojo.舔肛 = 5; // :5811
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5813
        await era.printAndWait(''); // :5813-5814
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :5815
        chara(target).kojo.舔肛 = 4; // :5815
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5817
        await era.printAndWait(''); // :5817-5818
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :5819
        chara(target).kojo.舔肛 = 3; // :5819
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        // :5821
        await era.printAndWait(''); // :5821-5822
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :5823
        chara(target).kojo.舔肛 = 2; // :5823
      } // :5823-5824
      return 0; // :5823-5825
    } // :5823-5826
  } // :5827-5830

  if (era_flag.selectcom === 21) {
    // :5832

    if (chara(target).kojo.背后位 === 0) {
      // :5834

      if (era.get(`talent:${target}:0`) === 1) {
        // :5836

        if (era.get(`talent:${target}:136`) === 1) {
          // :5838
          await era.printAndWait(
            `「好吧……来了！　狗狗那样的姿势、成为一只真正的母狗！　${sc()}的、的处女就献给动物了！」`,
          ); // :5839
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :5841
          await era.printAndWait(`「${sc()}、简直就像是变态一样吧……」`); // :5842
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :5844
          await era.printAndWait(`「这种变态一样的行为……」`); // :5845
        } else {
          // :5847-5848
          await era.printAndWait(`「咿、讨厌啊！　饶了我……停下吧！！」`); // :5849
        } // :5849-5850
      } else {
        // :5851-5852

        if (era.get(`talent:${target}:136`) === 1) {
          // :5854
          await era.printAndWait(
            `「哈、交尾！　母狗那样的姿势、真的交尾了！　哈、汪！　汪汪！」`,
          ); // :5855
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :5857
          await era.printAndWait(`「狗的小鸡鸡、和普通的完全不同……」`); // :5858
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :5860
          await era.printAndWait(`「狗的小鸡鸡……怪怪的感觉」`); // :5861
        } else {
          // :5862-5863
          await era.printAndWait(`「讨厌、讨厌啊……停下吧！　饶了我吧！」`); // :5864
        } // :5864-5865
      } // :5866-5867
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :5867
      chara(target).kojo.背后位 = 1; // :5867
      return 0; // :5867-5868
    } else {
      // :5869-5870

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5872
        if (rand_n(3) === 0) {
          // :5873
          await era.printAndWait(
            `「哈、交尾！　母狗那样的姿势、真的交尾了！　哈、汪！　汪汪！」`,
          ); // :5874
        } else if (rand_n(2) === 0) {
          // :5875
          await era.printAndWait(
            `「变成动物了！　变态的${sc()}是、是一只母狗！」`,
          ); // :5876
        } else {
          // :5876-5877
          await era.printAndWait(
            `「我爱……动物的小鸡鸡、变态的……母狗、好喜欢动物的小鸡鸡啊……」`,
          ); // :5878
        } // :5878-5879
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :5880
        chara(target).kojo.背后位 = 7; // :5880
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5882
        if (rand_n(3) === 0) {
          // :5883
          await era.printAndWait(`「狗的小鸡鸡、插穿了……不要紧吧」`); // :5884
        } else if (rand_n(2) === 0) {
          // :5885
          await era.printAndWait(`「狗的小鸡鸡、插穿了……不要紧吧」`); // :5886
        } else {
          // :5886-5887
          await era.printAndWait(`「狗的小鸡鸡、插穿了……不要紧吧」`); // :5888
        } // :5888-5889
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :5890
        chara(target).kojo.背后位 = 6; // :5890
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5892
        if (rand_n(3) === 0) {
          // :5893
          await era.printAndWait(`「狗的小鸡鸡……总觉得绝望了」`); // :5894
        } else if (rand_n(2) === 0) {
          // :5895
          await era.printAndWait(`「狗的小鸡鸡……总觉得绝望了」`); // :5896
        } else {
          // :5896-5897
          await era.printAndWait(`「狗的小鸡鸡……总觉得绝望了」`); // :5898
        } // :5898-5899
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :5900
        chara(target).kojo.背后位 = 5; // :5900
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5902
        await era.printAndWait(`「呜呜……有感觉了……明明是野兽……」`); // :5903
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :5904
        chara(target).kojo.背后位 = 4; // :5904
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5906
        await era.printAndWait(`「呜呜……指甲抓到好痛啊……」`); // :5907
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :5908
        chara(target).kojo.背后位 = 3; // :5908
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        // :5910
        await era.printAndWait(`「咿、不要、哎呀！　讨厌！！」`); // :5911

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :5913
        chara(target).kojo.背后位 = 2; // :5913
      } // :5913-5914
      return 0; // :5913-5915
    } // :5913-5916
  } // :5917-5920

  if (era_flag.selectcom === 27) {
    // :5922

    if (chara(target).kojo.背后位肛交 === 0) {
      // :5924

      if (era.get(`talent:${target}:136`) === 1) {
        // :5926
        await era.printAndWait(`「用菊花做吗……好的、已经准备好了哦……♪」`); // :5927
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :5929
        await era.printAndWait(`「明白了……用菊花就可以了对吧？」`); // :5930
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5932
        await era.printAndWait(`「明白了……用菊花就可以了对吧？」`); // :5933
      } else {
        // :5934-5935
        await era.printAndWait(`「什么、这样子……哪里搞错了吧……」`); // :5936
      } // :5936-5937
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :5938
      chara(target).kojo.背后位肛交 = 1; // :5938
      return 0; // :5938-5939
    } else {
      // :5940-5941

      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :5943
        if (rand_n(2) === 0) {
          // :5944
          await era.printAndWait(
            `「嗯…呃……要变成畜生肉棒的形状了……菊花要变成狗专用的了……♪」`,
          ); // :5945
        } else {
          // :5945-5946
          await era.printAndWait(`「嗯…哦哦……菊花被畜生肉棒弄得要去了……啊♪」`); // :5947
        } // :5947-5948
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :5949
        chara(target).kojo.背后位肛交 = 7; // :5949
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :5951
        if (rand_n(2) === 0) {
          // :5952
          await era.printAndWait(`「竟然因为狗……有感觉了……要去……了」`); // :5953
        } else {
          // :5953-5954
          await era.printAndWait(`「不要啊……不要继续了、不想变成变态……啊」`); // :5955
        } // :5955-5956
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :5957
        chara(target).kojo.背后位肛交 = 6; // :5957
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5959
        if (rand_n(2) === 0) {
          // :5960
          await era.printAndWait(`「菊花感觉好奇怪……到底怎么了……」`); // :5961
        } else {
          // :5961-5962
          await era.printAndWait(`「竟然因为狗……」`); // :5963
        } // :5963-5964
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :5965
        chara(target).kojo.背后位肛交 = 5; // :5965
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5967
        await era.printAndWait(`「不要……要被狗……把菊花玩坏了……」`); // :5968
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :5969
        chara(target).kojo.背后位肛交 = 4; // :5969
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5971
        await era.printAndWait(
          `「嗯…啊啊啊……不要……不要继续对${sc()}做这种变态的事了……」`,
        ); // :5972
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :5973
        chara(target).kojo.背后位肛交 = 3; // :5973
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :5975
        await era.printAndWait(`「好痛……好苦……呜……」`); // :5976
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :5977
        chara(target).kojo.背后位肛交 = 2; // :5977
      } // :5977-5978
      return 0; // :5977-5979
    } // :5977-5980
  } // :5981-5984

  if (era_flag.selectcom === 30) {
    // :5986

    if (chara(target).kojo.手淫 === 0) {
      // :5988

      if (era.get(`talent:${target}:76`) === 1) {
        // :5990
        await era.printAndWait(`「呜哇……竟然一跳一跳的呢……」`); // :5991
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :5993
        await era.printAndWait(`「呜哇……竟然一跳一跳的呢……」`); // :5994
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :5996
        await era.printAndWait(`「呜呜……只要做就好了吧……」`); // :5997
      } else {
        // :5998-5999
        await era.printAndWait(`「呜呜……脏兮兮的……好臭……」`); // :6000
      } // :6000-6001
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :6002
      chara(target).kojo.手淫 = 1; // :6002
      return 0; // :6002-6003
    } else {
      // :6004-6005

      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :6007
        if (rand_n(2) === 0) {
          // :6008
          await era.printAndWait(`「啊啊……这个野兽的雄臭……在脑子里回荡呢」`); // :6009
        } else {
          // :6009-6010
          await era.printAndWait(`「舒服吗？　更加激烈一点了哟♪」`); // :6011
        } // :6011-6012
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :6013
        chara(target).kojo.手淫 = 7; // :6013
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :6015
        if (rand_n(2) === 0) {
          // :6016
          await era.printAndWait(`「奇怪的感觉……」`); // :6017
        } else {
          // :6017-6018
          await era.printAndWait(`「奇怪的感觉……」`); // :6019
        } // :6019-6020
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :6021
        chara(target).kojo.手淫 = 6; // :6021
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :6023
        if (rand_n(2) === 0) {
          // :6024
          await era.printAndWait(`「奇怪的感觉……」`); // :6025
        } else {
          // :6025-6026
          await era.printAndWait(`「奇怪的感觉……」`); // :6027
        } // :6027-6028
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :6029
        chara(target).kojo.手淫 = 5; // :6029
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :6031
        await era.printAndWait(`「奇怪的感觉……」`); // :6032
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :6033
        chara(target).kojo.手淫 = 4; // :6033
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6035
        await era.printAndWait(`「我做……我做就好了吧……」`); // :6036
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :6037
        chara(target).kojo.手淫 = 3; // :6037
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        // :6039
        await era.printAndWait(`「呜恶……脏死了……」`); // :6040
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :6041
        chara(target).kojo.手淫 = 2; // :6041
      } // :6041-6042
      return 0; // :6041-6043
    } // :6041-6044
  } // :6045-6048

  if (era_flag.selectcom === 31) {
    // :6050

    if (chara(target).kojo.口交_奴 === 0) {
      // :6052

      if (era.get(`talent:${target}:76`) === 1) {
        // :6054
        await era.printAndWait(`「拿、拿出勇气来……」`); // :6055
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6057
        await era.printAndWait(`「拿、拿出勇气来……」`); // :6058
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :6060
        await era.printAndWait(`「不行……做不到啦……」`); // :6061
      } else {
        // :6062-6063
        await era.printAndWait(`「不要……不要啊！」`); // :6064
      } // :6064-6065
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :6066
      chara(target).kojo.口交_奴 = 1; // :6066
      return 0; // :6066-6067
    } else {
      // :6068-6069

      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :6071
        await era.printAndWait(
          `「犬大人的狗肉棒、好好吃……♪　野兽的味道、好浓烈♪」`,
        ); // :6072
        // CFLAG:332  = 7（变量语义：CFLAG 族，332） // :6073
        chara(target).kojo.口交_奴 = 7; // :6073
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :6075
        await era.printAndWait(`「呜呼……咻唔……」`); // :6076
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :6077
        chara(target).kojo.口交_奴 = 6; // :6077
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :6079
        await era.printAndWait(`「呜呼……咻唔…」`); // :6080
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :6081
        chara(target).kojo.口交_奴 = 5; // :6081
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :6083
        await era.printAndWait(`「呜呼……咻唔……」`); // :6084
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :6085
        chara(target).kojo.口交_奴 = 4; // :6085
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6087
        await era.printAndWait(`「做不到……做不到的啦……！」`); // :6088
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :6089
        chara(target).kojo.口交_奴 = 3; // :6089
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        // :6091
        await era.printAndWait(`「呜恶……」`); // :6092
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :6093
        chara(target).kojo.口交_奴 = 2; // :6093
      } // :6093-6094
      return 0; // :6093-6095
    } // :6093-6096
  } // :6097-6100

  if (era_flag.selectcom === 34) {
    // :6102

    if (chara(target).kojo.骑乘位 === 0) {
      // :6104

      if (era.get(`talent:${target}:0`) === 1) {
        // :6106

        if (era.get(`talent:${target}:136`) === 1) {
          // :6108
          await era.printAndWait(''); // :6108-6109
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :6111
          await era.printAndWait(''); // :6111-6112
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :6114
          await era.printAndWait(''); // :6114-6115
        } else {
          // :6116-6117
          await era.printAndWait(''); // :6116-6118
        } // :6119-6120
      } else {
        // :6120-6121

        if (era.get(`talent:${target}:136`) === 1) {
          // :6123
          await era.printAndWait(''); // :6123-6124
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :6126
          await era.printAndWait(''); // :6126-6127
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :6129
          await era.printAndWait(''); // :6129-6130
        } else {
          // :6131-6132
          await era.printAndWait(''); // :6131-6133
        } // :6134-6136
      } // :6135-6136
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :6136
      chara(target).kojo.骑乘位 = 1; // :6136
      return 0; // :6136-6137
    } else {
      // :6138-6139

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :6141
        if (rand_n(3) === 0) {
          // :6142
          await era.printAndWait(''); // :6142-6143
        } else if (rand_n(2) === 0) {
          // :6144
          await era.printAndWait(''); // :6144-6145
        } else {
          // :6144-6146
          await era.printAndWait(''); // :6147-6149
        } // :6148-6149
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :6149
        chara(target).kojo.骑乘位 = 7; // :6149
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :6151
        if (rand_n(4) === 0) {
          // :6152
          await era.printAndWait(''); // :6152-6153
        } else if (rand_n(3) === 0) {
          // :6154
          await era.printAndWait(''); // :6154-6155
        } else if (rand_n(2) === 0) {
          // :6156
          await era.printAndWait(''); // :6156-6157
        } else {
          // :6156-6158
          await era.printAndWait(''); // :6159-6161
        } // :6160-6161
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :6161
        chara(target).kojo.骑乘位 = 6; // :6161
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :6163
        if (rand_n(4) === 0) {
          // :6164
          await era.print(''); // :6164-6165
        } else if (rand_n(3) === 0) {
          // :6166
          await era.printAndWait(''); // :6166-6167
        } else if (rand_n(2) === 0) {
          // :6168
          await era.printAndWait(''); // :6168-6169
        } else {
          // :6168-6170
          await era.printAndWait(''); // :6171-6173
        } // :6172-6173
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :6173
        chara(target).kojo.骑乘位 = 5; // :6173
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :6175
        if (rand_n(4) === 0) {
          // :6176
          await era.printAndWait(''); // :6176-6177
        } else if (rand_n(3) === 0) {
          // :6178
          await era.printAndWait(''); // :6178-6179
        } else if (rand_n(2) === 0) {
          // :6180
          await era.printAndWait(''); // :6180-6181
        } else {
          // :6180-6182
          await era.printAndWait(''); // :6183-6185
        } // :6184-6185
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :6185
        chara(target).kojo.骑乘位 = 4; // :6185
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6187
        await era.print(''); // :6187-6188
        await era.printAndWait(''); // :6189-6190
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :6190
        chara(target).kojo.骑乘位 = 3; // :6190
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        // :6192
        await era.printAndWait(''); // :6192-6193
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :6194
        chara(target).kojo.骑乘位 = 2; // :6194
      } // :6194-6195
      return 0; // :6194-6196
    } // :6194-6197
  } // :6198-6201

  if (era_flag.selectcom === 37) {
    // :6203

    if (chara(target).kojo.肛门侍奉 === 0) {
      // :6205

      if (era.get(`abl:${target}:16`) >= 3) {
        // :6207
        await era.printAndWait(`「明白了啦……唔……真、要这样吗？」`); // :6208
      } else {
        // :6209-6210
        await era.printAndWait(`「不、不是吧？　真、要这样吗？」`); // :6211
      } // :6211-6212
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :6213
      chara(target).kojo.肛门侍奉 = 1; // :6213
      return 0; // :6213-6214
    } else {
      // :6215-6216

      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :6218
        await era.printAndWait(`「来让我亲一口……骗你的。啾♪」`); // :6219
        // CFLAG:338  = 6（变量语义：CFLAG 族，338） // :6220
        chara(target).kojo.肛门侍奉 = 6; // :6220
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :6222
        await era.printAndWait(`「明白了……会好好服侍的」`); // :6223
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :6224
        chara(target).kojo.肛门侍奉 = 5; // :6224
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :6226
        await era.print(`「明白了……会好好服侍的」`); // :6227
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :6228
        chara(target).kojo.肛门侍奉 = 4; // :6228
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6230
        await era.printAndWait(`「这也是服侍的一种……吗」`); // :6231
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :6232
        chara(target).kojo.肛门侍奉 = 3; // :6232
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        // :6234
        await era.printAndWait(`「骗人的吧……不、不要啊……」`); // :6235
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :6236
        chara(target).kojo.肛门侍奉 = 2; // :6236
      } // :6236-6237
      return 0; // :6236-6238
    } // :6236-6239
  } // :6240-6243

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    // :6246

    if (chara(target).kojo.眼罩 === 0) {
      // :6248

      if (era.get(`talent:${target}:136`) === 1) {
        // :6250
        await era.printAndWait(''); // :6250-6251
      } else if (era.get(`talent:${target}:76`) === 1) {
        // :6253
        await era.printAndWait(''); // :6253-6254
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6256
        await era.printAndWait(''); // :6256-6257
      } else {
        // :6258-6259
        await era.printAndWait(''); // :6258-6260
      } // :6261-6262
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :6262
      chara(target).kojo.眼罩 = 1; // :6262
      return 0; // :6262-6263
    } else {
      // :6264-6265

      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.眼罩 <= 9 || game.kojo.口上开关 === 2)
      ) {
        // :6267
        await era.printAndWait(''); // :6267-6268
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344） // :6269
        chara(target).kojo.眼罩 = 10; // :6269
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :6271
        await era.printAndWait(''); // :6271-6272
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :6273
        chara(target).kojo.眼罩 = 9; // :6273
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :6275
        await era.printAndWait(''); // :6275-6276
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :6277
        chara(target).kojo.眼罩 = 8; // :6277
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :6279
        await era.printAndWait(''); // :6279-6280
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :6281
        chara(target).kojo.眼罩 = 7; // :6281
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :6283
        await era.printAndWait(''); // :6283-6284
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :6285
        chara(target).kojo.眼罩 = 6; // :6285
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :6287
        await era.printAndWait(''); // :6287-6288
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :6289
        chara(target).kojo.眼罩 = 5; // :6289
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :6291
        await era.printAndWait(''); // :6291-6292
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :6293
        chara(target).kojo.眼罩 = 4; // :6293
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :6295
        await era.printAndWait(''); // :6295-6296
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :6297
        chara(target).kojo.眼罩 = 3; // :6297
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        // :6299
        await era.printAndWait(''); // :6299-6300
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :6301
        chara(target).kojo.眼罩 = 2; // :6301
      } // :6301-6302
      return 0; // :6301-6303
    } // :6304-6305
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    // :6306

    if (
      era.get(`talent:${target}:136`) === 1 &&
      (chara(target).kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6308
      await era.printAndWait(''); // :6308-6309
      // CFLAG:444  = 4（变量语义：CFLAG 族，444） // :6310
      chara(target).kojo.兽奸眼罩 = 4; // :6310
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6312
      await era.printAndWait(''); // :6312-6313
      // CFLAG:444  = 3（变量语义：CFLAG 族，444） // :6314
      chara(target).kojo.兽奸眼罩 = 3; // :6314
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.肛门侍奉 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6316
      await era.printAndWait(''); // :6316-6317
      // CFLAG:444  = 2（变量语义：CFLAG 族，444） // :6318
      chara(target).kojo.兽奸眼罩 = 2; // :6318
    } else if (chara(target).kojo.兽奸眼罩 < 1 || game.kojo.口上开关 === 2) {
      // :6320
      await era.printAndWait(''); // :6320-6321
      // CFLAG:444  = 1（变量语义：CFLAG 族，444） // :6322
      chara(target).kojo.兽奸眼罩 = 1; // :6322
    } // :6322-6323
    return 0; // :6322-6324
  } // :6322-6325

  if (era_flag.selectcom === 56) {
    // :6331

    if (chara(target).kojo.交谈 === 0) {
      // :6333
      if (era.get(`tequip:${target}:53`)) {
        // :6334

        await era.print(`${master_name}催促着${target_name}开始自我介绍、`); // :6337
        if (era.get(`talent:${target}:136`) === 1) {
          // :6338
          await era.print(
            `${target_name}对着水晶球用像卑猥的哈巴狗那样的姿势开始自我介绍。`,
          ); // :6339
          await era.printAndWait(
            `「初次见面请多关照！　${target_name}呢。放弃了继续作为${get_look_info(target, '种族')}的一员！」`,
          ); // :6340
          await era.print(`「现在是优秀的`); // :6341
          if (chara(target).chara.结婚对象 === 900) {
            // :6342

            await era.print(`狗的妻子`); // :6344
          } else {
            // :6344-6345
            await era.print(`母狗`); // :6346
          } // :6346-6347
          await era.printAndWait(`！快乐的作为家畜生活着${heart(1)}」`); // :6348
          await era.printAndWait(
            `「这样变态的交尾姿势还真是对不起呢。但是${sc()}很幸福哟」`,
          ); // :6349
          await era.printAndWait(
            `「请看吧${sc()}真的交尾喽、小鸡鸡叽咕叽咕的做吧${heart(1)}」`,
          ); // :6350
          await era.print(`「在最后`); // :6351
          if (era.get(`talent:${target}:成为勇者前的生活`) === 1) {
            // :6352

            await era.print(`同班同学的大家`); // :6354
          } else if (era.get(`talent:${target}:成为勇者前的生活`) === 2) {
            // :6355

            await era.print(`修道院的大家`); // :6357
          } else if (
            era.get(`talent:${target}:成为勇者前的生活`) === 15 ||
            era.get(`talent:${target}:成为勇者前的生活`) === 18
          ) {
            // :6358

            await era.print(`在${sc()}的店里消费过的客人`); // :6360
          } else if (era.get(`talent:${target}:成为勇者前的生活`) === 19) {
            // :6361

            await era.print(`部下的大家`); // :6363
          } else if (era.get(`talent:${target}:成为勇者前的生活`) === 21) {
            // :6364

            await era.print(`最重要的你`); // :6366
          } else {
            // :6366-6367

            await era.print(`爸爸、妈妈`); // :6369
          } // :6369-6370
          await era.printAndWait(
            `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,
          ); // :6371
        } else if (era.get(`talent:${target}:76`) === 1) {
          // :6373
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验`,
          ); // :6374
          if (era.get(`abl:${target}:31`) >= 3) {
            // :6376
            await era.print(`、更说出了在自慰的时候意淫的内容、`); // :6376
          } // :6376
          await era.print(`高兴地开始津津有味的说了起来……`); // :6377
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          ); // :6378
        } else if (era.get(`talent:${target}:85`) === 1) {
          // :6380
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验`,
          ); // :6381
          if (era.get(`abl:${target}:31`) >= 3) {
            // :6383
            await era.print(`、更说出了在自慰的时候意淫的内容、`); // :6383
          } // :6383
          await era.print(`开始高兴地讲着……`); // :6384
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          ); // :6385
        } else {
          // :6386-6387
          await era.printAndWait(
            `${target_name}在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。`,
          ); // :6388
          await era.printAndWait(`「要…要把录像送回故乡………？」`); // :6389
          await era.printAndWait(
            `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
          ); // :6390
        } // :6390-6391
      } // :6392-6393
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :6393
      chara(target).kojo.交谈 = 1; // :6393
      return 0; // :6393-6394
    } else {
      // :6395-6396
      if (era.get(`tequip:${target}:53`)) {
        // :6397

        if (
          era.get(`talent:${target}:136`) === 1 &&
          (chara(target).kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          // :6400
          await era.print(
            `${target_name}对着水晶球用像卑猥的哈巴狗那样的姿势开始自我介绍。`,
          ); // :6401
          await era.printAndWait(
            `「大家好！　${target_name}呢。放弃了继续作为${get_look_info(target, '种族')}的一员！」`,
          ); // :6402
          await era.print(`「现在是优秀的`); // :6403
          if (chara(target).chara.结婚对象 === 900) {
            // :6404

            await era.print(`狗的妻子`); // :6406
          } else {
            // :6406-6407
            await era.print(`母狗`); // :6408
          } // :6408-6409
          await era.printAndWait(`、快乐的作为家畜生活着${heart(1)}」`); // :6410
          await era.printAndWait(
            `「这样变态的交尾姿势还真是对不起呢。但是${sc()}很幸福哟」`,
          ); // :6411
          await era.printAndWait(
            `「请看吧${sc()}真的交尾喽、小鸡鸡叽咕叽咕的做吧${heart(1)}」`,
          ); // :6412
          await era.print(`「在最后`); // :6413
          if (era.get(`talent:${target}:成为勇者前的生活`) === 1) {
            // :6414

            await era.print(`同班同学的大家`); // :6416
          } else if (era.get(`talent:${target}:成为勇者前的生活`) === 2) {
            // :6417

            await era.print(`修道院的大家`); // :6419
          } else if (
            era.get(`talent:${target}:成为勇者前的生活`) === 15 ||
            era.get(`talent:${target}:成为勇者前的生活`) === 18
          ) {
            // :6420

            await era.print(`在${sc()}的店里消费过的客人`); // :6422
          } else if (era.get(`talent:${target}:成为勇者前的生活`) === 19) {
            // :6423

            await era.print(`部下的大家`); // :6425
          } else if (era.get(`talent:${target}:成为勇者前的生活`) === 21) {
            // :6426

            await era.print(`最重要的你`); // :6428
          } else {
            // :6428-6429

            await era.print(`爸爸、妈妈`); // :6431
          } // :6431-6432
          await era.printAndWait(
            `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,
          ); // :6433
          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :6434
          chara(target).kojo.交谈 = 5; // :6434
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // :6436
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验`,
          ); // :6437
          if (era.get(`abl:${target}:31`) >= 3) {
            // :6439
            await era.print(`、更说出了在自慰的时候意淫的内容、`); // :6439
          } // :6439
          await era.print(`高兴地开始津津有味的说了起来……`); // :6440
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          ); // :6441
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :6442
          chara(target).kojo.交谈 = 4; // :6442
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // :6444
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验`,
          ); // :6445
          if (era.get(`abl:${target}:31`) >= 3) {
            // :6447
            await era.print(`、更说出了在自慰的时候意淫的内容、`); // :6447
          } // :6447
          await era.print(`高兴地开始津津有味的说了起来……`); // :6448
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          ); // :6449
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :6450
          chara(target).kojo.交谈 = 3; // :6450
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 === 2) {
          // :6452
          await era.printAndWait(
            `${target_name}在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。`,
          ); // :6453
          await era.printAndWait(`「要…要把录像送回故乡………？」`); // :6454
          await era.printAndWait(
            `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
          ); // :6455
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :6456
          chara(target).kojo.交谈 = 2; // :6456
        } // :6456-6457
      } // :6456-6458
      return 0; // :6456-6459
    } // :6456-6460
  } // :6456-6461

  return 0; // :6464-6467
}

// @KOJO_MESSAGE_PALAMCNG_1 // :6471
async function kojo_message_palamcng_1() {
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target);
  const player_name = chara_callname(player);
  const sc = () => self_call(target);
  let P = 0;

  if (era.get(`tequip:${target}:45`)) {
    // :6476-6477
    return 0; // :6476-6477
  } // :6476-6477

  if (game.train.失神) {
    // :6479-6480
    return 0; // :6479-6480
  } // :6479-6480

  if (era.get(`talent:${target}:9`) === 1) {
    // :6482-6483
    return 0; // :6482-6483
  } // :6482-6483

  if (era.get(`tequip:${target}:89`)) {
    // :6485-6486
    return 0; // :6485-6486
  } // :6485-6486

  if (era.get(`tequip:${target}:90`)) {
    // :6488-6489
    return 0; // :6488-6489
  } // :6488-6489

  if (era.get(`tequip:${target}:55`)) {
    // :6491-6492
    return 0; // :6491-6492
  } // :6491-6492

  P = (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0); // :6501
  if (P > PALAMLV[2] && chara(target).kojo.首次润滑Lv2 === 0) {
    // :6502

    if (era.get(`talent:${target}:85`) === 1) {
      // :6504

      if (era_flag.selectcom === 50) {
        // :6506
        await era.printAndWait(`「呜哇…好厉害…这样的…」`); // :6507
        await era.printAndWait(`―――第一次润滑超过了LV 2`); // :6508
      } else {
        // :6509-6510
        await era.printAndWait(`「啊…不、不要…${sc()}、好像非常兴奋啊…」`); // :6511
        await era.printAndWait(`―――第一次润滑超过了LV 2`); // :6512
      } // :6512-6513
    } else {
      // :6514-6515

      if (era_flag.selectcom === 50) {
        // :6517
        await era.printAndWait(`「呜哇…太滑了…」`); // :6518
        await era.printAndWait(`―――第一次润滑超过了LV 2`); // :6519
      } else {
        // :6520-6521
        await era.printAndWait(`「咿嗯…咿、不、不一样的…这、这是…」`); // :6522
        await era.printAndWait(`―――第一次润滑超过了LV 2`); // :6523
      } // :6523-6524
    } // :6525-6526
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :6526
    chara(target).kojo.首次润滑Lv2 = 1; // :6526
  } // :6526-6527

  P = (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0); // :6532
  if (P > PALAMLV[2] && chara(target).kojo.首次欲情Lv2 === 0) {
    // :6533

    if (era.get(`talent:${target}:85`) === 1) {
      // :6535

      if (era_flag.selectcom === 51) {
        // :6537
        await era.printAndWait(`「咿…身体…咿…好热…这样的…啊啊啊」`); // :6538
        await era.printAndWait(`―――第一次欲情超过了LV 2`); // :6539
      } else {
        // :6540-6541
        await era.printAndWait(`「哈…哈…${sc()}、${sc()}…哦嗯！」`); // :6542
        await era.printAndWait(`―――第一次欲情超过了LV 2`); // :6543
      } // :6543-6544
    } else {
      // :6545-6546

      if (era_flag.selectcom === 51) {
        // :6548
        await era.printAndWait(
          `「这、这样…总觉得…身体…好怪异…咿…不一样的…不一样的啊………」`,
        ); // :6549
        await era.printAndWait(`―――第一次欲情超过了LV 2`); // :6550
      } else {
        // :6551-6552
        await era.printAndWait(`「哈…啊啊…啊啊…想要…好想要…啊…」`); // :6553
        await era.printAndWait(`―――第一次欲情超过了LV 2`); // :6554
      } // :6554-6555
    } // :6556-6557
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :6557
    chara(target).kojo.首次欲情Lv2 = 1; // :6557
  } // :6557-6558

  P = (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0); // :6563
  if (P > PALAMLV[2] && chara(target).kojo.首次耻情Lv2 === 0) {
    // :6564

    if (era.get(`talent:${target}:85`) === 1) {
      // :6566
      await era.printAndWait(`「不行了…不要看…求你不要看啊……」`); // :6567
      await era.printAndWait(`―――第一次耻情超过了LV 2`); // :6568
    } else {
      // :6569-6570
      await era.printAndWait(`「啊啊啊…羞死了………」`); // :6571
      await era.printAndWait(`―――第一次耻情超过了LV 2`); // :6572
    } // :6572-6573
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :6574
    chara(target).kojo.首次耻情Lv2 = 1; // :6574
  } // :6574-6575

  P =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0); // :6580
  if (P > PALAMLV[2] && chara(target).kojo.首次恐怖Lv2 === 0) {
    // :6581

    if (era.get(`talent:${target}:85`) === 1) {
      // :6583
      await era.printAndWait(`「求你了…停下吧…………」`); // :6584
      await era.printAndWait(`―――第一次恐怖超过了LV 2`); // :6585
    } else {
      // :6586-6587
      await era.printAndWait(`「咿…咿嗯！」`); // :6588
      await era.printAndWait(`―――第一次恐怖超过了LV 2`); // :6589
    } // :6589-6590
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :6591
    chara(target).kojo.首次恐怖Lv2 = 1; // :6591
  } // :6591-6592

  if (
    (era.get(`nowex:${target}:0`) || 0) > 0 &&
    chara(target).kojo.首次C绝顶 === 0
  ) {
    // :6597

    if (era.get(`talent:${target}:85`) === 1) {
      // :6599
      await era.printAndWait(`「咿呀啊啊！…那里再这么玩弄不行哦！」`); // :6600
      await era.printAndWait(`显然${target_name}是第一次被刺激阴蒂绝顶吧。`); // :6601
    } else {
      // :6602-6603
      await era.printAndWait(`「咕…咿咿！？」`); // :6604
      await era.printAndWait(`显然${target_name}是第一次被刺激阴蒂绝顶吧。`); // :6605
    } // :6605-6606
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :6607
    chara(target).kojo.首次C绝顶 = 1; // :6607
  } // :6607-6608

  if (
    (era.get(`nowex:${target}:1`) || 0) > 0 &&
    chara(target).kojo.首次V绝顶 === 0
  ) {
    // :6613

    if (era.get(`talent:${target}:76`) === 1) {
      // :6615
      await era.printAndWait(
        `「啊啊啊…小穴来了…啊啊啊…来了来了啊…你在做什么啦！」`,
      ); // :6616
      await era.printAndWait(
        `「呜咿…啊啊啊啊啊啊啊啊啊哈啊啊啊啊啊啊咿～～！！！」`,
      ); // :6617
      await era.printAndWait(
        `${target_name}第一次用阴道高潮了、脸上露出幸福的潮红………`,
      ); // :6618
    } else if (era.get(`talent:${target}:85`) === 1) {
      // :6620
      await era.printAndWait(`「不行了不行了！不要再这么欺负小穴了！」`); // :6621
      await era.printAndWait(`「啊呀！呀…啊啊啊…呀呀！那样呜呜呜！」`); // :6622
      await era.printAndWait(
        `${target_name}的阴道第一次绝顶…紧闭着眼睛要忍耐什么一样浑身发抖………`,
      ); // :6623
    } else {
      // :6624-6625
      await era.printAndWait(`「小穴…要坏掉了…坏掉了呜…已经、饶了我…咿～！」`); // :6626
      await era.printAndWait(
        `${target_name}的阴道第一次绝顶…把高潮的身体交给了${player_name}………`,
      ); // :6627
    } // :6627-6628
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :6629
    chara(target).kojo.首次V绝顶 = 1; // :6629
  } // :6629-6630

  if (
    (era.get(`nowex:${target}:2`) || 0) > 0 &&
    chara(target).kojo.首次A绝顶 === 0
  ) {
    // :6635

    if (era.get(`talent:${target}:76`) === 1) {
      // :6637
      await era.printAndWait(`「哦哦…肛门好热啊…融化了呜嗯${heart(1)}」`); // :6638
      await era.printAndWait(`「啊呀啊啊啊…肛门要变成屁股小穴了呜嗯！」`); // :6639
      await era.printAndWait(
        `${target_name}第一次用肛门绝顶了、这种快乐再也无法忘记了吧………`,
      ); // :6640
    } else if (era.get(`talent:${target}:85`) === 1) {
      // :6642
      await era.printAndWait(`「啊啊啊啊…屁股小穴…不要再欺负了」`); // :6643
      await era.printAndWait(`「咿嗯！肛门融化了呜呜呜！」`); // :6644
      await era.printAndWait(
        `${target_name}第一次用肛门绝顶了、羞耻的颤抖着身体………`,
      ); // :6645
    } else {
      // :6646-6647
      await era.printAndWait(`「求你了…不行了…再被欺负的话…啊啊啊！」`); // :6648
      await era.printAndWait(`「屁股小穴…变成笨蛋了呜呜！」`); // :6649
      await era.printAndWait(
        `${target_name}第一次用肛门绝顶了、暴露出了从嘴里流着口水的可耻的样子………`,
      ); // :6650
    } // :6650-6651
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :6652
    chara(target).kojo.首次A绝顶 = 1; // :6652
  } // :6652-6653

  if (
    (era.get(`nowex:${target}:3`) || 0) > 0 &&
    chara(target).kojo.首次B绝顶 === 0
  ) {
    // :6658

    if (era.get(`talent:${target}:85`) === 1) {
      // :6660
      await era.printAndWait(
        `「啊…啊啊啊咕嗯嗯…乳房…乳房好棒…更多…还要更多♪」`,
      ); // :6661
      await era.printAndWait(`「啊啊啊啊♪…好爽哦…融化了…融化了呜…」`); // :6662
      await era.printAndWait(`${target_name}在乳房的刺激下第一次绝顶了………`); // :6663
    } else {
      // :6664-6665
      await era.printAndWait(
        `「咿这样不行了不行了！乳房被玩弄了…啊不行了哇！」`,
      ); // :6666
      await era.printAndWait(`${target_name}在乳房的刺激下第一次绝顶了………`); // :6667
    } // :6667-6668
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :6669
    chara(target).kojo.首次B绝顶 = 1; // :6669
  } // :6669-6670

  const A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0); // :6675
  if (game.train.处女丧失 === 1 && chara(target).kojo.处女丧失 === 0) {
    // :6676

    if (game.train.主人导致处女丧失 === 1) {
      // :6678

      if (
        era.get(`talent:${target}:76`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        // :6680
        await era.printAndWait(`「啊哈…贞洁奉献给主人了啊…${heart(1)}」`); // :6681
        await era.printAndWait(
          `「从今往后啊…这里更多的…给我调教吧${heart(1)}」`,
        ); // :6682
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        // :6684
        await era.printAndWait(`「唔呼呼…原勇者的处女的味道怎么样呢…？」`); // :6685
        await era.printAndWait(`「这样${sc()}就是…主人的东西了…♪」`); // :6686
      } else {
        // :6687-6688
        await era.printAndWait(`「哈…哈…咕…好痛…咿…停、停止吧…哎………」`); // :6689
        await era.printAndWait(`坚强的${target_name}也被破瓜疼的洒了眼泪………`); // :6690
      } // :6690-6691
    } else {
      // :6692-6693

      if (era.get(`talent:${target}:76`) === 1) {
        // :6695
        await era.printAndWait(
          `「啊…终于失去了贞洁了啊…唔呼呼…不过那样的事无论如何都好………」`,
        ); // :6696
        await era.printAndWait(
          `「${sc()}的淫乱小穴…想要更多的调教…想要变的更加堕落…${heart(1)}」`,
        ); // :6697
      } else if (era.get(`talent:${target}:85`) === 1) {
        // :6699
        await era.printAndWait(
          `「啊啊…这个贞洁…我认为就是为了能被主人的小鸡鸡夺走………」`,
        ); // :6700
        await era.printAndWait(`${target_name}很可惜似的嘟哝着………`); // :6701
      } else {
        // :6702-6703
        await era.printAndWait(`「啊…啊啊啊…痛……好痛啊………」`); // :6704
        await era.printAndWait(`坚强的${target_name}也被破瓜疼的洒了眼泪………`); // :6705
      } // :6705-6706
    } // :6707-6708
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :6708
    chara(target).kojo.处女丧失 = 1; // :6708
  } // :6708-6709
}

// @KOJO_MESSAGE_MARKCNG_1 // :6716
async function kojo_message_markcng_1() {
  const target = era_flag.target;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :6718-6719
    return 0; // :6718-6719
  } // :6718-6719

  if (era.get(`tequip:${target}:45`)) {
    // :6721-6722
    return 0; // :6721-6722
  } // :6721-6722

  if (game.train.失神) {
    // :6724-6725
    return 0; // :6724-6725
  } // :6724-6725

  if (era.get(`tequip:${target}:89`)) {
    // :6727-6728
    return 0; // :6727-6728
  } // :6727-6728

  if (era.get(`tequip:${target}:90`)) {
    // :6730-6731
    return 0; // :6730-6731
  } // :6730-6731

  if (era.get(`talent:${target}:9`) === 1) {
    // :6733-6734
    return 0; // :6733-6734
  } // :6733-6734

  if (game.system.苦痛刻印变动 === 3 && chara(target).kojo.苦痛刻印Lv3 === 0) {
    // :6739

    if (era.get(`talent:${target}:85`) === 1) {
      // :6741
      await era.printAndWait(`「啊…咕…这、这样的…完全没关系…总觉得…」`); // :6742
    } else {
      // :6742-6743
      await era.printAndWait(`「啊啊啊…再…痛…啊」`); // :6744
    } // :6744-6745
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :6746
    chara(target).kojo.苦痛刻印Lv3 = 1; // :6746
  } // :6746-6747

  if (game.system.快乐刻印变动 === 3 && chara(target).kojo.快乐刻印Lv3 === 0) {
    // :6752

    if (era.get(`talent:${target}:85`) === 1) {
      // :6754
      await era.printAndWait(`「嗯…呼…主人啊…舒服…的动不了了………」`); // :6755
    } else {
      // :6755-6756
      await era.printAndWait(`「咿…咿…咿…太舒服了…不要碰啊！」`); // :6757
    } // :6757-6758
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :6759
    chara(target).kojo.快乐刻印Lv3 = 1; // :6759
  } // :6759-6760

  if (game.system.屈服刻印变动 === 3 && chara(target).kojo.屈服刻印Lv3 === 0) {
    // :6765

    if (era.get(`talent:${target}:85`) === 1) {
      // :6767
      await era.printAndWait(`「主人…效忠…我发誓…」`); // :6768
    } else {
      // :6768-6769
      await era.printAndWait(`「已、已经…不能违抗…不能违抗了哈呀………」`); // :6770
    } // :6770-6771
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :6772
    chara(target).kojo.屈服刻印Lv3 = 1; // :6772
  } // :6772-6773

  if (game.system.反抗刻印变动 === 3 && chara(target).kojo.反抗刻印Lv3 === 0) {
    // :6778

    if (era.get(`talent:${target}:85`) === 1) {
      // :6780
      await era.printAndWait(`「咕…嗯嗯…为什么要…做这种事情…………不能原谅」`); // :6781
    } else {
      // :6781-6782
      await era.printAndWait(`「哇…呼…一、一定会杀了你………」`); // :6783
    } // :6783-6784
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :6785
    chara(target).kojo.反抗刻印Lv3 = 1; // :6785
  } // :6785-6786
}

// @SELF_KOJO_K1 // :6792
async function self_kojo_k1(rand, q) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const assi = era_flag.assi;
  const master = MASTER;
  const target_name = chara_callname(target);
  const assi_name = chara_callname(assi);
  const master_name = chara_name(MASTER);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);
  // ERB \@ 三元（TALENT:76 淫乱）：玩家可见的是展开后的一侧，不是 \@ 字面
  const master_or_you =
    era.get(`talent:${target}:76`) === 1 ? '主人大人' : '你';
  const master_suffix = era.get(`talent:${target}:76`) === 1 ? '大人' : '';
  const master_or_woman =
    era.get(`talent:${target}:76`) === 1 ? '主人大人' : '女';
  if (game.train.初吻与自我口上 === 1) {
    // :6796

    if (era.get(`talent:${target}:9`) === 1) {
      // :6798
      await era.printAndWait(`${target_name}像坏了的玩具似的疯狂的自慰着………`); // :6799
    } else if (q === 1) {
      // :6801
      await era.print(`「啊哈…那孩子的手指…太棒了…${heart(1)}」`); // :6802
      await era.printAndWait(
        `${target_name}就像在追寻着${assi_name}的痕迹一样用手指抚摸着秘处………`,
      ); // :6803
    } else if (q === 2) {
      // :6805
      await era.print(`「嗯…呜嗯…好像要狗狗的………${heart(1)}」`); // :6806
      await era.printAndWait(`${target_name}用自己的手指自慰似乎完全不够………`); // :6807
    } else {
      // :6808-6809

      if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        // :6811
        await era.printAndWait(
          `「啊啊啊…身体好热…呜呜…不是的…${sc()}…手淫最喜欢了…啊啊啊啊${heart(1)}」`,
        ); // :6812
        await era.printAndWait(`「哇…嗯嗯…啊啊啊…手指…不够么…${heart(1)}」`); // :6813
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :6814
        chara(target).kojo.调教后自慰 = 4; // :6814
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        // :6816
        await era.printAndWait(
          `「嗯…哈…哈…主人啊…还想要更多更多…${heart(1)}」`,
        ); // :6817
        await era.printAndWait(`「啊…嗯…不够…不够哟………」`); // :6818
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :6819
        chara(target).kojo.调教后自慰 = 3; // :6819
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        // :6821
        await era.printAndWait(
          `「啊啊啊啊…不行了…手停不下来…咕啾咕啾这么舒服哎！」`,
        ); // :6822
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :6823
        chara(target).kojo.调教后自慰 = 2; // :6823
      } else if (
        chara(target).kojo.调教后自慰 < 1 ||
        game.kojo.口上开关 === 2
      ) {
        // :6825
        await era.printAndWait(
          `「啊…身体好痛…无法忍受啊…这全部都………是魔王的错啊…」`,
        ); // :6826
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :6827
        chara(target).kojo.调教后自慰 = 1; // :6827
      } // :6827-6828
    } // :6827-6829
  } // :6827-6830

  if (game.train.初吻与自我口上 === 2) {
    // :6835

    if (era.get(`talent:${target}:9`) === 1) {
      // :6837
      await era.printAndWait(
        `${assi_name}和坏掉了的${target_name}颓废享受着女同游戏………`,
      ); // :6838
    } else if (
      era.get(`talent:${target}:76`) &&
      (chara(target).kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      // :6840
      await era.printAndWait(`「哈…女孩们互相慰藉吧…${heart(1)}」`); // :6841
      await era.printAndWait(`「会一直疼爱你的直到你混乱了的${heart(1)}」`); // :6842
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :6843
      chara(target).kojo.百合PLAY = 5; // :6843
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      // :6845
      await era.printAndWait(`「呼呼…真是对不起今天由我来代替主人…」`); // :6846
      await era.printAndWait(`「啊啊啊…不过和你的话…也不错…♪」`); // :6847
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :6848
      chara(target).kojo.百合PLAY = 4; // :6848
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (chara(target).kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6850
      await era.printAndWait(`「啊啊啊…女孩子之间这样也不错啊…！」`); // :6851
      await era.printAndWait(`「更多更多！一起融化吧！」`); // :6852
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :6853
      chara(target).kojo.百合PLAY = 3; // :6853
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (chara(target).kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6855
      await era.printAndWait(`「唔呼呼…女孩之间这么舒服…」`); // :6856
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :6857
      chara(target).kojo.百合PLAY = 2; // :6857
    } else if (chara(target).kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      // :6859
      await era.printAndWait(`「啊…嗯…哎呀…女孩之间什么的…咿！」`); // :6860
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :6861
      chara(target).kojo.百合PLAY = 1; // :6861
    } // :6861-6862
  } // :6861-6863

  if (game.train.初吻与自我口上 === 3) {
    // :6868

    if (era.get(`talent:${target}:9`) === 1) {
      // :6870
      await era.printAndWait(`「呼…早上好咕…早上喝牛奶…♪」`); // :6871
      await era.printAndWait(
        `${target_name}一副痴呆的表情舔着小鸡鸡寻找着精液………`,
      ); // :6872
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.朝口交 < 4 || game.kojo.口上开关 === 2)
    ) {
      // :6874
      await era.printAndWait(
        `「呜咕…嗯噗…呜啾啾噜${heart(1)} 啾啪…咕噜…呜咕嗯嗯${heart(1)}」`,
      ); // :6875
      await era.printAndWait(
        `${target_name}专心致志的吞吐着小鸡鸡…你醒来了也没有察觉………`,
      ); // :6876
      await era.printAndWait(
        `「嗯嗯…咕啊咿…啊啊、从早上开始就这么精神${heart(1)}…嗯嗯${heart(1)} 啾啾${heart(1)}」`,
      ); // :6877
      await era.printAndWait(
        `「啊啊啊…已经…就这样强行侵犯………啊啊啊啊…主人…早、早上好………」`,
      ); // :6878
      // CFLAG:263  = 4（变量语义：CFLAG 族，263） // :6879
      chara(target).kojo.朝口交 = 4; // :6879
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6881
      await era.printAndWait(`「嘛啾啾…咕噜…嗯哦…啊…主人早上好♪」`); // :6882
      await era.printAndWait(
        `「${sc()}的口腔侍奉怎么样…？嘛啾…啾…啾啾…嗯哦………」`,
      ); // :6883
      await era.printAndWait(
        `「如果感觉很舒服…就不用客气的在${sc()}嘴里射出来吧…♪」`,
      ); // :6884
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :6885
      chara(target).kojo.朝口交 = 3; // :6885
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (chara(target).kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6887
      await era.printAndWait(`「啊哈…请原谅我早上…♪」`); // :6888
      await era.printAndWait(`「想要侍奉小鸡鸡…早上就开始了♪」`); // :6889
      await era.printAndWait(`「哈啊…从早上开始就要精精神神的…陆续吧」`); // :6890
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :6891
      chara(target).kojo.朝口交 = 2; // :6891
    } else if (chara(target).kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      // :6893
      await era.printAndWait(`「小鸡鸡…小鸡鸡啊…嗯…嗯…很美味呦～」`); // :6894
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :6895
      chara(target).kojo.朝口交 = 1; // :6895
    } // :6895-6896
  } // :6895-6897

  if (game.train.初吻与自我口上 === 4) {
    // :6902

    if (
      era.get(`talent:${target}:9`) === 1 &&
      (chara(target).kojo.调教后性交 < 3 || game.kojo.口上开关 === 2)
    ) {
      // :6904
      await era.printAndWait(`坏掉了的${target_name}无法忘记性交的快乐………`); // :6905
      // CFLAG:264  = 3（变量语义：CFLAG 族，264） // :6906
      chara(target).kojo.调教后性交 = 3; // :6906
    } else if (
      era.get(`abl:${target}:2`) >= 4 &&
      (chara(target).kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6908
      await era.printAndWait(`「这么…小穴变得更喜欢了………」`); // :6909
      await era.printAndWait(`「嗯…啊啊啊…更加…请让我更加爱上这种事！」`); // :6910
      if (era.get(`talent:${target}:76`) === 1) {
        // :6912
        await era.printAndWait(
          `「满满的射进来吧…让淫乱的小穴满满的直到溢出来吧${heart(1)}」`,
        ); // :6912
      } // :6912
      if (era.get(`talent:${target}:85`) === 1) {
        // :6914
        await era.printAndWait(`「啊啊啊…如果这么温柔…嗯…呜嗯${heart(1)}」`); // :6914
      } // :6914
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :6915
      chara(target).kojo.调教后性交 = 2; // :6915
    } else if (chara(target).kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      // :6917
      await era.printAndWait(`「啊咿…这么兴奋了啊…好羞耻………」`); // :6918
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :6919
      chara(target).kojo.调教后性交 = 1; // :6919
    } // :6919-6920
  } // :6919-6921

  if (game.train.初吻与自我口上 === 5) {
    // :6926

    if (
      era.get(`talent:${target}:9`) === 1 &&
      (chara(target).kojo.夜袭 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :6928
      await era.printAndWait(`「咿…啊啊…咿呜…可、可以吗………」`); // :6929
      await era.printAndWait(
        `坏掉了的${target_name}抱着自己的主人乞求进入${master_name}的房间………`,
      ); // :6930
      // CFLAG:265  = 2（变量语义：CFLAG 族，265） // :6931
      chara(target).kojo.夜袭 = 2; // :6931
    } else if (chara(target).kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      // :6932
      await era.printAndWait(`「唔呼呼…来幽会喽…」`); // :6933
      await era.printAndWait(`「不会这样把${sc()}赶走的…对吧？」`); // :6934
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :6935
      chara(target).kojo.夜袭 = 1; // :6935
    } // :6935-6936
  } // :6935-6937

  if (game.train.初吻与自我口上 === 6) {
    // :6942

    if (era.get(`talent:${target}:9`) === 1) {
      // :6944
      await era.printAndWait(`「咿…咿…嗯、拜拜了大人…咿～…啊啊～………」`); // :6945
      await era.printAndWait(
        `坏了的${target_name}对自己被出售的事勉勉强强能理解………`,
      ); // :6946
    } else if (
      era.get(`talent:${target}:85`) &&
      era.get(`mark:${target}:3`) < 3
    ) {
      // :6948
      await era.printAndWait(`「哎、呜、骗人的吧…」`); // :6949
      await era.printAndWait(`${target_name}一副目瞪口呆的表情凝视着你。`); // :6950
      await era.printAndWait(
        `「${scf()}、${sc()}…”你”为了、这么…我很努力的…明明………」`,
      ); // :6951
      await era.printAndWait(`你用手示意怪物们抓住了${target_name}的双手。`); // :6952
      await era.printAndWait(
        `「呐…停下吧…停下来啊…${sc()}、”你”为了什么、我什么都能做到！」`,
      ); // :6953
      await era.printAndWait(
        `${target_name}哭了起来。但是、怪物们沉默着熟练的轻轻扭着${target_name}的双臂。`,
      ); // :6954
      await era.printAndWait(`「求你了…不想离开…不想分开哟…」`); // :6955
      await era.print(''); // :6956
      await era.printAndWait(`你在沉默的在奴隶买卖合同书上签了字。`); // :6957
    } else if (era.get(`mark:${target}:3`) === 3) {
      // :6959
      await era.printAndWait(
        `「${sc()}的力量被封住了…你总有一天会后悔的…魔王！」`,
      ); // :6960
    } else if (
      era.get(`talent:${target}:136`) === 1 &&
      chara(target).chara.结婚对象 === 900 &&
      era.get(`talent:${master}:122`) === 0 &&
      chara(master).chara.结婚对象 === 900 &&
      chara(master).chara.结婚爱情 > 40
    ) {
      // :6962
      await era.printAndWait(`「我好像成了电灯泡了是吗？　是这样么？」`); // :6963
      await era.printAndWait(`「不过…呵呵…」`); // :6964
      await era.printAndWait(
        `「${master_or_you}的身体怎么可能满足得了他（它）呢」`,
      ); // :6965
      await era.printAndWait(`「没错吧？」`); // :6966

      if (
        era.get(`talent:${target}:153`) === 1 &&
        chara(target).event.妊娠相手 === 5
      ) {
        // :6969
        await era.printAndWait(
          `「什么嘛${master_or_you}、连老公的孩子都没怀上啊、怎么能和我争呢」`,
        ); // :6969
      } // :6969

      if (chara(target).chara.结婚爱情 < chara(master).chara.结婚爱情) {
        // :6971
        await era.print(
          `「…快老实承认了吧！！　老实说『是在下输了』吧 魔王${master_suffix}！！」`,
        ); // :6972
        await era.printAndWait(
          `「明明…是我更被他宠爱着…对吧…没错吧？　是这样吧！？」`,
        ); // :6973
        if (era.get(`talent:${target}:84`) === 1) {
          // :6975
          await era.printAndWait(
            `「更何况、我…我爱他的程度远胜过他爱我、的…」`,
          ); // :6975
        } // :6975
        await era.printAndWait(`「…求…求求你…不要…把我卖掉…」`); // :6976
        await era.printAndWait(`「求你了…我不想…我不想这么走了啊…呜」`); // :6977
        await era.print(''); // :6978
        await era.printAndWait(`你一言不发地在奴隶买卖契约书上签了字。`); // :6979
      } else if (chara(target).chara.结婚爱情 > chara(master).chara.结婚爱情) {
        // :6981
        await era.printAndWait(
          `明明马上就要被卖掉了、${target_name}却还对自己的胜利沾沾自喜。`,
        ); // :6982
        if (
          era_flag.assi > 0 &&
          era.get(`talent:${assi}:153`) === 1 &&
          chara(assi).event.妊娠相手 === 5
        ) {
          // :6984
          await era.printAndWait(
            `「小心咯、${assi_name}。下一个说不定就是你咯」`,
          ); // :6984
        } // :6984
        await era.printAndWait(`就这样一只牝犬被卖掉了。`); // :6985
      } else {
        // :6986-6987
        await era.print(`「以这种难分难解的形式决了胜负真是太可惜了」`); // :6988
        await era.printAndWait(
          `「明明不可能会输给把他称作野狗的${master_or_woman}才对的」`,
        ); // :6989
        await era.printAndWait(`「诶…真是太可惜了」`); // :6990
      } // :6990-6991
    } else if (era.get(`talent:${target}:76`)) {
      // :6993
      await era.printAndWait(`「哈…这次对方会是什么样的主人呢…」`); // :6994
      await era.printAndWait(`「啊啊啊身体好疼哇………」`); // :6995
    } else {
      // :6996-6997
      await era.printAndWait(
        `「总有一天、会用你的脸来祭拜…呼呼、敬请期待那个时候吧」`,
      ); // :6998
    } // :6998-6999
    await era.print(''); // :7000-7001
    if (era.get(`talent:${target}:122`) !== 1) {
      // :7002
      stub_line('SELL_MATURO_K0', '出售成熟奴隶口上', '随出售票'); // CALL SELL_MATURO_K0 // :7002
    } // :7002
  } // :7002-7003

  if (game.train.初吻与自我口上 === 11) {
    // :7009

    if (chara(target).kojo.妊娠发觉 === 0) {
      // :7011

      if (era.get(`talent:${target}:9`) === 1) {
        // :7013
        await era.printAndWait(
          `「啊…哈…${sc()}的孩子啊…什么样的孩子呢…一定是像王子一样…非常英俊哇…哈啊哈哈」`,
        ); // :7014
      } else if (chara(target).event.妊娠相手 === 6) {
        // :7016
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          // :7017

          await era.printAndWait(
            `「妊娠……？　啊哈${heart(1)}　${sc()}、这是败给了兽人肉棒了呢${heart(1)}」`,
          ); // :7019
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　强壮兽人的浓厚精液让精灵的草食系子宫完全屈服了呢${heart(1)}」`,
          ); // :7020
        } else if (chara(target).chara.结婚爱情 > 40) {
          // :7021
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　子宫投降了${heart(1)}　完全屈服于强壮的老公的浓厚精液了呢${heart(1)}」`,
          ); // :7022
        } else {
          // :7022-7023
          await era.printAndWait(`「怎么会……有了怪物的孩子……？」`); // :7024
        } // :7024-7025
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :7027
        await era.printAndWait(
          `「难道…魔族的孩子什么的…唔呼呼…不过心情也不差…真是不可思议…」`,
        ); // :7028
      } else if (chara(target).event.妊娠相手 === 2) {
        // :7030
        await era.printAndWait(''); // :7030-7031
      } else if (chara(target).event.妊娠相手 === 3) {
        // :7033
        await era.printAndWait(''); // :7033-7034
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).event.妊娠相手 === 5 &&
        chara(target).chara.结婚对象 === 90
      ) {
        // :7036
        if (rand_n(2) === 0) {
          // :7037
          await era.printAndWait(
            `「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」`,
          ); // :7038
        } else {
          // :7038-7039
          await era.print(`「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`); // :7040
          if (rand_n(9) === 0) {
            // :7041
            await era.printAndWait(`波奇？」`); // :7042
          } else if (rand_n(8) === 0) {
            // :7043
            await era.printAndWait(`哈娜？」`); // :7044
          } else if (rand_n(7) === 0) {
            // :7045
            await era.printAndWait(`小白？」`); // :7046
          } else if (rand_n(6) === 0) {
            // :7047
            await era.printAndWait(`贝鲁卡？」`); // :7048
          } else if (rand_n(5) === 0) {
            // :7049
            await era.printAndWait(`普朗卡？」`); // :7050
          } else if (rand_n(4) === 0) {
            // :7051
            await era.printAndWait(`戴比尔？」`); // :7052
          } else if (rand_n(3) === 0) {
            // :7053
            await era.printAndWait(`小狼？」`); // :7054
          } else if (rand_n(2) === 0) {
            // :7055
            await era.printAndWait(`博斯？」`); // :7056
          } else {
            // :7056-7057
            await era.printAndWait(`米凯？」`); // :7058
          } // :7058-7059
        } // :7060-7061
      } else if (chara(target).event.妊娠相手 === 5) {
        // :7062
        if (era.get(`talent:${target}:136`) === 1) {
          // :7063
          await era.printAndWait(`「有了个可爱的宝宝…♪」`); // :7064
        } else {
          // :7064-7065
          await era.printAndWait(
            `「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」`,
          ); // :7066
        } // :7066-7067
      } else if (chara(target).event.妊娠相手 === 7) {
        // :7069
        await era.printAndWait(`「呜呼呜…难、难道…这是狂王大人的孩子…？」`); // :7070
      } else {
        // :7071-7072
        await era.printAndWait(`「咕呜…咕呜…吔…难、难道、这是…骗人…吧…」`); // :7073
      } // :7073-7074
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :7075
      chara(target).kojo.妊娠发觉 = 1; // :7075
    } else {
      // :7076-7077

      if (era.get(`talent:${target}:9`) === 1) {
        // :7079
        await era.printAndWait(
          `「啊…哈…${sc()}的孩子啊…什么样的孩子呢…一定是像王子一样…非常英俊哇…哈啊哈哈」`,
        ); // :7080
      } else if (chara(target).event.妊娠相手 === 6) {
        // :7082
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          // :7083

          await era.printAndWait(
            `「妊娠……？　啊哈${heart(1)}　${sc()}、这是败给了兽人肉棒了呢${heart(1)}」`,
          ); // :7085
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　强壮兽人的浓厚精液让精灵的草食系子宫完全屈服了呢${heart(1)}」`,
          ); // :7086
        } else if (chara(target).chara.结婚爱情 > 40) {
          // :7087
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　子宫投降了${heart(1)}　完全屈服于强壮的老公的浓厚精液了呢${heart(1)}」`,
          ); // :7088
        } else {
          // :7088-7089
          await era.printAndWait(`「怎么会……有了怪物的孩子……？」`); // :7090
        } // :7090-7091
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :7093
        await era.printAndWait(
          `「难道…魔族的孩子什么的…唔呼呼…不过心情也不差…真是不可思议…」`,
        ); // :7094
      } else if (chara(target).event.妊娠相手 === 2) {
        // :7096
        await era.printAndWait(''); // :7096-7097
      } else if (chara(target).event.妊娠相手 === 3) {
        // :7099
        await era.printAndWait(''); // :7099-7100
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).event.妊娠相手 === 5 &&
        chara(target).chara.结婚对象 === 90
      ) {
        // :7102
        if (rand_n(2) === 0) {
          // :7103
          await era.printAndWait(
            `「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」`,
          ); // :7104
        } else {
          // :7104-7105
          await era.print(`「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`); // :7106
          if (rand_n(9) === 0) {
            // :7107
            await era.printAndWait(`波奇？」`); // :7108
          } else if (rand_n(8) === 0) {
            // :7109
            await era.printAndWait(`哈娜？」`); // :7110
          } else if (rand_n(7) === 0) {
            // :7111
            await era.printAndWait(`小白？」`); // :7112
          } else if (rand_n(6) === 0) {
            // :7113
            await era.printAndWait(`贝鲁卡？」`); // :7114
          } else if (rand_n(5) === 0) {
            // :7115
            await era.printAndWait(`普朗卡？」`); // :7116
          } else if (rand_n(4) === 0) {
            // :7117
            await era.printAndWait(`戴比尔？」`); // :7118
          } else if (rand_n(3) === 0) {
            // :7119
            await era.printAndWait(`小狼？」`); // :7120
          } else if (rand_n(2) === 0) {
            // :7121
            await era.printAndWait(`博斯？」`); // :7122
          } else {
            // :7122-7123
            await era.printAndWait(`米凯？」`); // :7124
          } // :7124-7125
        } // :7126-7127
      } else if (chara(target).event.妊娠相手 === 5) {
        // :7128
        if (era.get(`talent:${target}:136`) === 1) {
          // :7129
          await era.printAndWait(`「有了个可爱的宝宝…♪」`); // :7130
        } else {
          // :7130-7131
          await era.printAndWait(
            `「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」`,
          ); // :7132
        } // :7132-7133
      } else if (chara(target).event.妊娠相手 === 7) {
        // :7135
        await era.printAndWait(`「呜呼呜…难、难道…这是狂王大人的孩子…？」`); // :7136
      } else {
        // :7137-7138
        await era.printAndWait(`「咕呜…咕呜…吔…又、又怀孕了………？」`); // :7139
      } // :7139-7140
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :7141
      chara(target).kojo.妊娠发觉 = 1; // :7141
    } // :7141-7142
  } // :7141-7143

  if (game.train.初吻与自我口上 === 12) {
    // :7149
    if (chara(target).kojo.生产 === 0) {
      // :7150

      if (era.get(`talent:${target}:9`) === 1) {
        // :7152
        await era.printAndWait(
          `「啊哇哈哈…你的角在生长～？非常可爱～？呜噗唔呼呼呼呼………」`,
        ); // :7153
      } else if (chara(target).event.妊娠相手 === 6) {
        // :7155
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          // :7156

          await era.printAndWait(
            `「生、生下来了啊${heart(1)}　从被兽人肉棒攻破的精灵子宫里${heart(1)}　生出来啦${heart(1)}」`,
          ); // :7158
        } else if (chara(target).chara.结婚爱情 > 40) {
          // :7159

          await era.printAndWait(`「生、生下来了……可爱的孩子……！」`); // :7161
        } else {
          // :7161-7162
          await era.printAndWait(`「生、生下来了……怪物的孩子……！」`); // :7163
        } // :7163-7164
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :7166
        await era.printAndWait(
          `「这个孩子出来了的话…真的是…不能离开你了啊…唔呼呼、最喜欢你了」`,
        ); // :7167
      } else if (chara(target).event.妊娠相手 === 2) {
        // :7169
        await era.printAndWait(''); // :7169-7170
      } else if (chara(target).event.妊娠相手 === 3) {
        // :7172
        await era.printAndWait(''); // :7172-7173
      } else if (chara(target).event.妊娠相手 === 5) {
        // :7175
        if (era.get(`talent:${target}:136`) === 1) {
          // :7176
          await era.printAndWait(`「健康的狗的孩子生下来了吗？」`); // :7177
        } else {
          // :7177-7178
          await era.printAndWait(`「骗人吧…为什么是狗的孩子…啊！」`); // :7179
        } // :7179-7180
      } else if (chara(target).event.妊娠相手 === 7) {
        // :7182
        await era.printAndWait(`「哈哈…生下狂王大人的孩子什么的………」`); // :7183
      } else {
        // :7184-7185
        await era.printAndWait(`「哈…哈…哈…这样的孩子出生了什么的………」`); // :7186
      } // :7186-7187
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :7188
      chara(target).kojo.生产 = 1; // :7188
    } else {
      // :7188-7189

      if (era.get(`talent:${target}:9`) === 1) {
        // :7191
        await era.printAndWait(
          `「啊哇哈哈…你的角在生长～？非常可爱～？呜噗唔呼呼呼呼………」`,
        ); // :7192
      } else if (chara(target).event.妊娠相手 === 6) {
        // :7194
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          // :7195

          await era.printAndWait(
            `「生、生下来了啊${heart(1)}　从被兽人肉棒攻破的精灵子宫里${heart(1)}　生出来啦${heart(1)}」`,
          ); // :7197
        } else if (chara(target).chara.结婚爱情 > 40) {
          // :7198

          await era.printAndWait(`「生、生下来了……可爱的孩子……！」`); // :7200
        } else {
          // :7200-7201
          await era.printAndWait(`「生、生下来了……怪物的孩子……！」`); // :7202
        } // :7202-7203
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        // :7205
        await era.printAndWait(
          `「这个孩子出来了的话…真的是…不能离开你了啊…唔呼呼、最喜欢你了」`,
        ); // :7206
      } else if (chara(target).event.妊娠相手 === 2) {
        // :7208
        await era.printAndWait(''); // :7208-7209
      } else if (chara(target).event.妊娠相手 === 3) {
        // :7211
        await era.printAndWait(''); // :7211-7212
      } else if (chara(target).event.妊娠相手 === 5) {
        // :7214
        if (era.get(`talent:${target}:136`) === 1) {
          // :7215
          await era.printAndWait(`「健康的狗的孩子生下来了吗？」`); // :7216
        } else {
          // :7216-7217
          await era.printAndWait(`「骗人吧…为什么是狗的孩子…啊！」`); // :7218
        } // :7218-7219
      } else if (chara(target).event.妊娠相手 === 7) {
        // :7221
        await era.printAndWait(`「哈哈…生下狂王大人的孩子什么的………」`); // :7222
      } else {
        // :7223-7224
        await era.printAndWait(`「哈…哈…哈…这样的孩子出生了什么的………」`); // :7225
      } // :7225-7226
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :7227
      chara(target).kojo.生产 = 1; // :7227
    } // :7227-7228
  } // :7227-7229

  if (game.train.初吻与自我口上 === 13) {
    // :7234

    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // :7236

      if (era.get(`talent:${target}:153`)) {
        // :7238
        await era.printAndWait(`「另外、你真的在担心我吗？」`); // :7239
        await era.printAndWait(`${target_name}抚摸着迎来了产期的大肚子………`); // :7240
      } else if (era.get(`talent:${target}:154`)) {
        // :7242
        await era.printAndWait(`「呼呼、这个孩子的话真的是好麻烦啊♪」`); // :7243
        await era.printAndWait(`${target_name}哄着孩子………`); // :7244
      } // :7244-7245
    } // :7246-7247
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :7247
    chara(target).kojo.育儿室 = 1; // :7247
  } // :7247-7248

  if (game.train.初吻与自我口上 === 14) {
    // :7253

    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      // :7255
      await era.printAndWait(`「啊啊、${sc()}可爱的孩子要走了………」`); // :7256
    } // :7256-7257
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :7258
    chara(target).kojo.亲离 = 1; // :7258
  } // :7258-7259

  if (game.train.初吻与自我口上 === 999) {
    // :7265

    if (era.get(`talent:${target}:85`)) {
      // :7267
      await era.printAndWait(''); // :7267-7268
    } else {
      // :7269-7270
      await era.printAndWait(''); // :7269-7271
    } // :7269-7272
  } // :7273-7276

  if (game.train.初吻与自我口上 === 998) {
    // :7278

    if (era.get(`talent:${target}:85`)) {
      // :7280
      await era.printAndWait(''); // :7280-7281
    } else {
      // :7282-7283
      await era.printAndWait(''); // :7282-7284
    } // :7282-7285
  } // :7286-7289

  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :7291
  game.train.初吻与自我口上 = 0; // :7291

  return 0; // :7291-7293
}

// @DUNGEON_RYOUZYOKU_K1 // :7320
async function dungeon_ryouzyoku_k1() {
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (era.get(`talent:${target}:0`) === 1) {
    // :7325

    await era.printAndWait(`「别、别开玩笑了！　${sc()}的第一次不会给你的…」`); // :7327

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      // :7329

      await era.printAndWait(''); // :7330-7331
      return 0; // :7332-7333
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      // :7333

      await era.printAndWait(
        `「什么都可以！　即、即使再脏也会做…所以、只有小穴和生命…！」`,
      ); // :7335

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        // :7338
        await era.printAndWait(
          `「屁股！　呐呐、屁股怎样？　前面是不行的不过屁股的话怎么使用也可以哦！」`,
        ); // :7338
      } // :7338

      if (era.get(`exp:${target}:22`) > 0) {
        // :7341
        await era.printAndWait(
          `「喜欢用嘴的吗？　什么都会舔、所以、只要活着…」`,
        ); // :7341
      } // :7341
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      // :7342

      await era.printAndWait(
        `「绝对！　绝对不能原谅！　你要是敢侵犯我一次试试、我就咬舌自尽！」`,
      ); // :7345
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      // :7346

      await era.printAndWait(`「真讨厌…已经…呀啊！！」`); // :7348
    } else {
      // :7348-7349

      await era.printAndWait(`「你们…差劲的人渣！」`); // :7351
    } // :7351-7352
  } else {
    // :7353-7354

    await era.printAndWait(`「快点侵犯吧！　只是我"真的"会对抗到底！！`); // :7355

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      // :7357

      await era.printAndWait(`（………反正…马上要结束了…）`); // :7359
      return 0; // :7359-7360
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      // :7361

      await era.printAndWait(`「小穴只要你喜欢就随你使用……求你了…只要活着…」`); // :7363

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        // :7366
        await era.printAndWait(
          `「即使使用屁股…也可以…嫌脏的话、灌、灌肠也可以…」`,
        ); // :7366
      } // :7366

      if (era.get(`exp:${target}:22`) > 0) {
        // :7369
        await era.printAndWait(
          `「要用嘴把鸡鸡弄干净…？　不用洗也可以…所以、只要活着…」`,
        ); // :7369
      } // :7369
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      // :7370

      await era.printAndWait(
        `「${sc()}绝对不会认输！　即使身体被侵犯了、心灵也不会被侵犯！」`,
      ); // :7373
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      // :7374

      await era.printAndWait(`「反正是奴隶吧…？　那个、是${sc()}的工作吧…」`); // :7376
    } else {
      // :7376-7377

      await era.printAndWait(`「被侵犯了呢、什么感觉也没有」`); // :7379
    } // :7379-7380
  } // :7379-7381

  return 0; // :7383-7386
}

// @DUNGEON_RYOUZYOKU_AFTER_K1 // :7386
async function dungeon_ryouzyoku_after_k1() {
  const target = era_flag.target;

  if (era.get(`talent:${target}:0`) === 1) {
    // :7391

    await era.printAndWait(`「哈哈…太好了…安全…安全了…」`); // :7393

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      // :7395

      await era.printAndWait(`（………已经、想睡觉了…）`); // :7397
      return 0; // :7397-7398
    } // :7397-7399

    if (era.get(`exp:${target}:1`) > 20) {
      // :7403
      await era.printAndWait(`「大便…不要停…哎咕」`); // :7403
    } // :7403

    if (era.get(`exp:${target}:22`) > 20) {
      // :7407
      await era.printAndWait(`「嘴里…全是小鸡鸡的气味…嗯」`); // :7407
    } // :7407

    if (era.get(`exp:${target}:20`) > 20) {
      // :7411
      await era.printAndWait(`「从现在开始…要喝这个代替水…？」`); // :7411
    } // :7411
  } else {
    // :7411-7412

    await era.printAndWait(`「没、没什么大不了…没有了吗…」`); // :7414

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      // :7416

      await era.printAndWait(`（………杀死感情…就不用痛苦了）`); // :7418
      return 0; // :7418-7419
    } // :7418-7420

    if (era.get(`exp:${target}:0`) > 20) {
      // :7424
      await era.printAndWait(`「小穴…变的嘎巴嘎巴的了…」`); // :7424
    } // :7424

    if (era.get(`exp:${target}:1`) > 20) {
      // :7428
      await era.printAndWait(
        `「难道…永远坏了要让我那样的一直失禁…？　讨厌…帮我治好啊…！」`,
      ); // :7428
    } // :7428

    if (era.get(`exp:${target}:22`) > 20) {
      // :7432
      await era.printAndWait(`「下巴…脱落了」`); // :7432
    } // :7432

    if (era.get(`exp:${target}:20`) > 20) {
      // :7436
      await era.printAndWait(`「喝这样的东西什么的…会疯的」`); // :7436
    } // :7436
  } // :7436-7437
}

// @BENKI_KOUJO_K1 // :7440
async function benki_koujo_k1() {
  const target = era_flag.target;
  const a = target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);

  if (game.train.肉便器行动 === 0) {
    // :7459

    if (game.dungeon.肉便器常识改写 === 1) {
      // :7462
      await era.printAndWait(
        `「对污秽的你们进行『施予』可是${self_call(a)}的『工作』啊、用不着这样感恩戴德的……」`,
      ); // :7463
    } else if (era.get(`talent:${a}:76`) === 1) {
      // :7465
      await era.printAndWait(`「按顺序站好了！　会帮你们一个个脱下来的……喏♪」`); // :7466
    } else if (era.get(`talent:${a}:85`)) {
      // :7468
      await era.printAndWait(`「按顺序排好队啦！」`); // :7469
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :7471
      await era.printAndWait(`「会好好服侍的、请排好队……」`); // :7472
    } else {
      // :7473-7474
      await era.printAndWait(`「噫、好脏……」`); // :7475
    } // :7475-7476
  } else if (game.train.肉便器行动 === 1) {
    // :7477

    if (era.get(`talent:${a}:76`) === 1) {
      // :7480
      await era.printAndWait(''); // :7480-7481
    } else if (era.get(`talent:${a}:85`)) {
      // :7483
      await era.printAndWait(''); // :7483-7484
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :7486
      await era.printAndWait(''); // :7486-7487
    } else {
      // :7488-7489
      await era.printAndWait(''); // :7488-7490
    } // :7491-7492
  } else if (game.train.肉便器行动 === 2) {
    // :7492

    if (game.dungeon.肉便器常识改写 === 1) {
      // :7495
      await era.printAndWait(`「兽奸便器什么的、真是过分的催眠……」`); // :7496
      await era.printAndWait(
        `「嘛、变得不想再抵抗了。被这么变态的对待、人生也是完蛋了呢♪」`,
      ); // :7497
    } else if (era.get(`talent:${a}:136`)) {
      // :7499
      await era.printAndWait(`「被狗上了啊……哇哦……爽爆了♪」`); // :7500
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :7502
      await era.printAndWait(`「这就前来服侍……」`); // :7503
    } else {
      // :7504-7505
      await era.printAndWait(`「噫——、不要！」`); // :7506
    } // :7506-7507
  } else if (game.train.肉便器行动 === 3) {
    // :7508

    if (game.dungeon.肉便器常识改写 === 1) {
      // :7511
      await era.printAndWait(
        `「好嘞。使劲的侵犯吧。这就是${self_call(a)}的『工作』来着啊、真是没办法啊♪」`,
      ); // :7512
    } else if (era.get(`talent:${a}:76`) === 1) {
      // :7514
      await era.printAndWait(`「两边的穴好像要连到一起了啊……♪」`); // :7515
    } else {
      // :7516-7517
      await era.printAndWait(`「去了、呜噗……噗呜！」`); // :7518
    } // :7518-7519
  } else if (game.train.肉便器行动 === 4) {
    // :7520

    if (era.get(`talent:${a}:76`) === 1) {
      // :7523
      await era.printAndWait(''); // :7523-7524
    } else if (era.get(`talent:${a}:85`)) {
      // :7526
      await era.printAndWait(''); // :7526-7527
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :7529
      await era.printAndWait(''); // :7529-7530
    } else {
      // :7531-7532
      await era.printAndWait(''); // :7531-7533
    } // :7534-7535
  } else if (game.train.肉便器行动 === 5) {
    // :7535

    if (era.get(`talent:${a}:76`) === 1) {
      // :7538
      await era.printAndWait(''); // :7538-7539
    } else if (era.get(`talent:${a}:85`)) {
      // :7541
      await era.printAndWait(''); // :7541-7542
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :7544
      await era.printAndWait(''); // :7544-7545
    } else {
      // :7546-7547
      await era.printAndWait(''); // :7546-7548
    } // :7549-7550
  } else if (game.train.肉便器行动 === 7) {
    // :7550

    if (game.dungeon.肉便器常识改写 === 1) {
      // :7553
      await era.printAndWait(
        `「啊哈、${sc()}是兽奸便器的${target_name}的说${heart(1)}」`,
      ); // :7554
      await era.printAndWait(
        `「被魔王大人进行了超强的催眠、正在像这样进行着变态交尾挑战呢${heart(1)}」`,
      ); // :7555
      await era.printAndWait(
        `「看着悲惨的催眠肉便器的末路好好地撸起来哟${heart(1)}」`,
      ); // :7556
    } else if (era.get(`talent:${a}:136`)) {
      // :7558
      await era.printAndWait(
        `「兽奸便器的${target_name}哦${heart(1)}　稀有的真实交尾画面可别错过了哦${heart(1)}」`,
      ); // :7559
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :7561
      await era.printAndWait(`「这就前来服侍……」`); // :7562
    } else {
      // :7563-7564
      await era.printAndWait(`「噫咦——、不要！」`); // :7565
    } // :7565-7566
  } // :7565-7567

  return 0; // :7569-7572
}

// @DUNGEON_VICTORY_K1 // :7572
async function dungeon_victory_k1(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const a = target;
  const sc = () => self_call(target);

  await era.printAndWait(`「${sc()}赢不了啊！」`); // :7577

  if (
    era.get(`talent:${target}:21`) === 1 ||
    era.get(`talent:${target}:22`) === 1
  ) {
    // :7579

    await era.printAndWait(`「……」`); // :7582

    return 0; // :7584-7585
  } else if (
    era.get(`talent:${target}:11`) === 1 ||
    era.get(`talent:${target}:12`) === 1 ||
    era.get(`talent:${target}:15`) === 1 ||
    era.get(`talent:${target}:30`) === 1 ||
    era.get(`talent:${target}:34`) === 1
  ) {
    // :7585

    if (rand_n(3) === 0) {
      // :7588
      await era.printAndWait(`「当然！」`); // :7589
    } else if (rand_n(2) === 0) {
      // :7590
      await era.printAndWait(`「卑鄙！」`); // :7591
    } else {
      // :7591-7592
      await era.printAndWait(`「这种东西！」`); // :7593
    } // :7593-7594
  } else if (
    era.get(`talent:${target}:10`) === 1 ||
    era.get(`talent:${target}:26`) === 1
  ) {
    // :7596

    await era.printAndWait(`「真是好险…」`); // :7599

    return 0; // :7599-7601
  } else {
    // :7602-7604

    if (rand_n(3) === 0) {
      // :7605
      await era.printAndWait(`「${sc()}可是天才啊！」`); // :7606
    } else if (rand_n(2) === 0) {
      // :7607
      await era.printAndWait(`「呼呜……」`); // :7608
    } else {
      // :7608-7609
      await era.printAndWait(`「${sc()}也是的！」`); // :7610
    } // :7610-7611
  } // :7613-7615

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    // :7615

    await era.printAndWait(`（稍微有点…不妙…呢）`); // :7617
  } else {
    // :7617-7618

    await era.printAndWait(`「绝对不会输！」`); // :7620
  } // :7620-7621

  return 0; // :7620-7623
}

// @DUNGEON_ATTACK_K1 // :7626
async function dungeon_attack_k1(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (chara(target).invasion.状态 === 2) {
    // :7631

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      // :7633

      await era.printAndWait(`「……」`); // :7636

      return 0; // :7638-7639
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      // :7639

      if (rand_n(3) === 0) {
        // :7642
        await era.printAndWait(`「怪物！　死吧！」`); // :7643
      } else if (rand_n(2) === 0) {
        // :7644
        await era.printAndWait(`「${sc()}还以为能战胜！？　呀！」`); // :7645
      } else {
        // :7645-7646
        await era.printAndWait(`「来吧、打垮你们哟！」`); // :7647
      } // :7647-7648
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      // :7650

      await era.printAndWait(`「呜、什么啊这帮家伙！」`); // :7653

      return 0; // :7653-7655
    } else {
      // :7656-7658

      if (rand_n(3) === 0) {
        // :7659
        await era.printAndWait(`「明明是怪物！」`); // :7660
      } else if (rand_n(2) === 0) {
        // :7661
        await era.printAndWait(`「魔王的爪牙没什么了不起的！」`); // :7662
      } else {
        // :7662-7663
        await era.printAndWait(`「你做了什么！」`); // :7664
      } // :7664-7665
    } // :7667-7669
  } else {
    // :7668-7669

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      // :7670

      await era.printAndWait(`「……」`); // :7673

      return 0; // :7675-7676
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      // :7676

      if (rand_n(3) === 0) {
        // :7679
        await era.printAndWait(`「哼、什么都不懂的啊」`); // :7680
      } else if (rand_n(2) === 0) {
        // :7681
        await era.printAndWait(`「笨蛋、根本就没有意识到魔王大人的美妙」`); // :7682
      } else {
        // :7682-7683
        await era.printAndWait(`「你马上就知道了」`); // :7684
      } // :7684-7685
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      // :7687

      await era.printAndWait(`「魔王军……不会输的！」`); // :7690

      return 0; // :7690-7692
    } else {
      // :7693-7695

      if (rand_n(3) === 0) {
        // :7696
        await era.printAndWait(`「这是魔王大人赐给我的力量…！」`); // :7697
      } else if (rand_n(2) === 0) {
        // :7698
        await era.printAndWait(`「想赢？」`); // :7699
      } else {
        // :7699-7700
        await era.printAndWait(`「${sc()}获得了新生！」`); // :7701
      } // :7701-7702
    } // :7701-7704
  } // :7701-7705

  return 0; // :7709-7713
}

// @COLOSSEUM_KOJO_1 // :7716
async function colosseum_kojo_1() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target);
  const assi_name = chara_callname(assi);
  const master_name = chara_name(MASTER);
  const sc = () => self_call(target);

  if (era_flag.selectcom === 55) {
    // :7720

    if (era.get(`base:${target}:1`) <= 0) {
      // :7722
      await era.printAndWait(`${target_name}好像没有力气站起来了……`); // :7723
    } else {
      // :7723-7724
      await era.printAndWait(
        `${target_name}看到死斗场的热浪和将要面对的对手吓得直哆嗦……`,
      ); // :7725
    } // :7725-7726
    return 0; // :7725-7727
  } // :7728-7730

  if (era_flag.selectcom === 56) {
    // :7732

    if (era.get(`base:${target}:1`) <= 0) {
      // :7734

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :7736
        await era.printAndWait(`「哇…你、你做了什么………」`); // :7737
        await era.printAndWait(`${target_name}丢掉武器膝盖跪倒了地上……`); // :7738
      } else {
        // :7738-7739
        await era.printAndWait(`「哈…哈…这样的事…${sc()}……」`); // :7740
        await era.printAndWait(`${target_name}丢掉武器膝盖跪倒了地上……`); // :7741
      } // :7741-7742
    } else {
      // :7743-7744

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :7745
        await era.printAndWait(`「如、如果对手是你的话…这样的……」`); // :7746
        await era.printAndWait(
          `${target_name}看到了在${master_name}命令下武装起来的${assi_name}不由的咬牙切齿起来……`,
        ); // :7747
      } else {
        // :7747-7748
        await era.printAndWait(`「嗯嗯…那种家伙…如果是平时的${sc()}…！」`); // :7749
        await era.printAndWait(
          `被封住了力量的${target_name}发现了参战的状况而感到焦虑……`,
        ); // :7750
      } // :7750-7751
    } // :7750-7752
    return 0; // :7750-7753
  } // :7754-7757

  if (era_flag.selectcom === 31) {
    // :7759

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7761
      await era.printAndWait(`「啊呜…呜嗯…嗯咕…嗯…呼啊……」`); // :7762
      await era.print(`${assi_name}因为`); // :7763
      if (
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1
      ) {
        // :7765
        await era.print(`真正的小鸡鸡`); // :7765
      } // :7765
      if (
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1
      ) {
        // :7767
        await era.print(`假阳具`); // :7767
      } // :7767
      await era.printAndWait(
        `被${target_name}含了进去而露出了心旷神怡的表情……`,
      ); // :7768
    } else {
      // :7768-7769
      await era.printAndWait(`「咕…这样的…明明不想舔…呜咕…嗯…嗯咕…………」`); // :7770
      await era.printAndWait(
        `${target_name}吸吮舔舐着散发着恶心的气味小鸡鸡……`,
      ); // :7771
    } // :7771-7772
    return 0; // :7771-7773
  } // :7774-7776

  if (era_flag.selectcom === 5) {
    // :7778

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7780
      await era.printAndWait(`「${assi_name}…你、你不也是勇者这种事…啊呜！」`); // :7781
      await era.printAndWait(
        `${target_name}为了让${assi_name}离开自己的乳房……`,
      ); // :7782
    } else {
      // :7782-7783
      await era.printAndWait(`「啊啊啊…说、说了很痛啊！」`); // :7784
      await era.printAndWait(
        `${target_name}因为乳房被用力揉而发出了痛苦的声音……`,
      ); // :7785
    } // :7785-7786
    return 0; // :7785-7787
  } // :7788-7790

  if (era_flag.selectcom === 21) {
    // :7792

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7794
      await era.printAndWait(`「啊啊啊…啊！这、这样的…不行了不行了～！」`); // :7795
      await era.print(`${assi_name}一边听着悲鸣一边用`); // :7796
      if (
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1
      ) {
        // :7798
        await era.print(`真正的小鸡鸡`); // :7798
      } // :7798
      if (
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1
      ) {
        // :7800
        await era.print(`假阳具`); // :7800
      } // :7800
      await era.printAndWait(`毫不留情的继续蹂躏${target_name}的阴道……`); // :7801
    } else if (game.train.死斗场敌种 === 206) {
      // :7803
      await era.printAndWait(`「嘎…嘎哈…咕嘿…呜哎哎……」`); // :7804
      await era.printAndWait(
        `可怜的${target_name}就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……`,
      ); // :7805
    } else {
      // :7805-7806
      await era.printAndWait(`「啊呜！…喜、喜欢上了…${sc()}这么…啊呜！」`); // :7807
      await era.printAndWait(`${target_name}就这样被怪物侵犯了下去……`); // :7808
    } // :7808-7809
    return 0; // :7808-7810
  } // :7808-7811

  if (era_flag.selectcom === 27) {
    // :7816

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :7818
      await era.printAndWait(
        `「啊啊啊…啊！屁、屁股坏掉了呜啊…不行了不行了～！」`,
      ); // :7819
      await era.print(`${assi_name}一边听着悲鸣一边用`); // :7820
      if (
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1
      ) {
        // :7822
        await era.print(`真正的小鸡鸡`); // :7822
      } // :7822
      if (
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1
      ) {
        // :7824
        await era.print(`假阳具`); // :7824
      } // :7824
      await era.printAndWait(`毫不留情的继续蹂躏${target_name}的肛门……`); // :7825
    } else if (game.train.死斗场敌种 === 206) {
      // :7827
      await era.printAndWait(`「嘎…嘎哈…咕嘿…呜哎哎……」`); // :7828
      await era.printAndWait(
        `可怜的${target_name}就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……`,
      ); // :7829
    } else {
      // :7829-7830
      await era.printAndWait(
        `「啊呜！…${sc()}这么…啊咕！屁、屁股要坏掉了…啊！」`,
      ); // :7831
      await era.printAndWait(`${target_name}就这样被怪物侵犯了下去……`); // :7832
    } // :7832-7833
    return 0; // :7832-7834
  } // :7832-7835

  if (era_flag.selectcom === 51) {
    // :7840
    await era.printAndWait(`「啊啊啊…媚薬啊…啊啊啊…！」`); // :7841
    return 0; // :7841-7842
  } // :7841-7843

  return 0; // :7846-7849
}

// @NTR_KOUJO_K1 // :7849
async function ntr_koujo_k1(rand, P) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  P = P ?? 0;

  if (chara(target).kojo.NTR再捕获 === 0) {
    // :7853
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :7853
    chara(target).kojo.NTR再捕获 = 1; // :7853
  } // :7853

  if (P === 1) {
    // :7855

    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      // :7857
      await era.printAndWait(
        `「啊…咿…不要…拔出来…拔出来啊…${sc()}是魔王大人…啊啊啊…讨厌…不要动啊！」`,
      ); // :7858
    } else {
      // :7858-7859
      await era.printAndWait(
        `「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」`,
      ); // :7860
    } // :7860-7861
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :7862
    chara(target).kojo.NTR_651 = 1; // :7862
  } else if (P === 2) {
    // :7864
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      // :7865
      await era.printAndWait(
        `「啊啊啊！深一点！深一点哦！ 啊…那、那里不行了…${sc()}的…肛门…咿咿嗯${heart(1)}」`,
      ); // :7866
    } else {
      // :7866-7867
      await era.printAndWait(
        `「啊啊啊…你这个变态…${sc()}的…肛门…你这笨蛋…啊…啊啊嗯！」`,
      ); // :7868
    } // :7868-7869
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :7870
    chara(target).kojo.NTR_652 = 1; // :7870
  } else if (P === 3) {
    // :7872
    if (era.get(`talent:${target}:136`)) {
      // :7873
      await era.printAndWait(
        `「啊嗯…狗狗的小鸡鸡好舒服啊…咿咿…天啊${heart(1)}」`,
      ); // :7874
      await era.printAndWait(
        `${target_name}一边被四周的观众嘲笑、一边沉浸在被狗侵犯的快感里………`,
      ); // :7875
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      // :7876
      await era.printAndWait(
        `「啊啊啊…停下吧…${sc()}是谁…啊哼！…咿…讨厌啊！」`,
      ); // :7877
      await era.printAndWait(
        `${target_name}是四周的观众的背叛者！魔女！一边被骂一边被狗持续侵犯着………`,
      ); // :7878
    } else {
      // :7878-7879
      await era.printAndWait(
        `「咿嗯…这种事…与魔王同样的事么…停止…停下吧…啊…咿啊啊啊！」`,
      ); // :7880
    } // :7880-7881
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :7882
    chara(target).kojo.NTR_653 = 1; // :7882
  } else if (P === 4) {
    // :7884
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      // :7885
      await era.printAndWait(
        `「哈…哈…啊啊啊！美妙啊…狂王大人啊…请更多的侵犯…${sc()}的小穴${heart(1)} 快乐的要坏了${heart(1)}」`,
      ); // :7886
    } else {
      // :7886-7887
      await era.printAndWait(
        `「咿咿…咿嗯…狂王大人的怀抱…好幸福…的说…啊…啊咕♪」`,
      ); // :7888
    } // :7888-7889
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :7890
    chara(target).kojo.NTR_654 = 1; // :7890
  } else if (P === 5) {
    // :7892
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      // :7893
      await era.printAndWait(
        `「啊嗯…大家都已经…${sc()}的小穴和屁股小穴…更多的随便用就好啦${heart(1)} 咿嗯…两穴都被插进来了${heart(1)}」`,
      ); // :7894
    } else {
      // :7894-7895
      await era.printAndWait(
        `「啊啊啊…这样…被轮奸什么的…咿嗯…不行了不行了…不要同时插两种穴啊！啊啊啊！」`,
      ); // :7896
    } // :7896-7897
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :7898
    chara(target).kojo.NTR_655 = 1; // :7898
  } else if (P === 6) {
    // :7900
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      // :7901
      await era.printAndWait(
        `「你看…快点换下一个上吧………先付钱…嗯啊嗯…那样的…即、即使…啊啊啊♪」`,
      ); // :7902
    } else {
      // :7902-7903
      await era.printAndWait(
        `「啊啊啊…${sc()}因为…明明是勇者…这样的感觉…明明不可以…咿啊啊啊！」`,
      ); // :7904
    } // :7904-7905
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :7906
    chara(target).kojo.NTR_656 = 1; // :7906
  } else if (P === 7) {
    // :7908
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      // :7909
      await era.printAndWait(`「魔王大人…对不起…${sc()}…被狂王大人…玩坏了…」`); // :7910
      await era.printAndWait(
        `「就这样…侍奉狂王大人…是比什么都喜悦的东西…啊…啊啊啊」`,
      ); // :7911
    } else {
      // :7911-7912
      await era.printAndWait(`「狂王大人的…好美味…啊哎…呜咕…咕嘟…」`); // :7913
      await era.printAndWait(
        `${target_name}由于嘴巴被注入了东西咽下后会心地笑了………`,
      ); // :7914
    } // :7914-7915
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :7916
    chara(target).kojo.NTR_657 = 1; // :7916
  } else if (P === 20) {
    // :7918
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      // :7919
      if (chara(target).event.妊娠相手 === 1) {
        // :7920
        await era.printAndWait(`「停下吧！魔王大人…不要拿走${sc()}的宝宝！」`); // :7921
      } else {
        // :7921-7922
        await era.printAndWait(`「啊啊啊…${sc()}宝宝…讨厌、讨厌啊！」`); // :7923
      } // :7923-7924
    } else {
      // :7925-7926
      await era.printAndWait(`「嗯嗯…咕…真是过分…啊啊啊………」`); // :7926
    } // :7926-7927
  } // :7926-7928

  return 0; // :7930-7933
}

// @EXUCUTION_KOUJO_K1 // :7933
async function exucution_koujo_k1() {
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.犬射精或处刑口上 === 4) {
    // :7936
    await era.printAndWait(`「真是太好了…只要活着…就好了………」`); // :7937
  } else if (game.event.犬射精或处刑口上 === 5) {
    // :7939
    await era.printAndWait(`「${sc()}${sc()}的意识在逐渐消失………啊…啊啊啊………」`); // :7940
  } else if (game.event.犬射精或处刑口上 === 6) {
    // :7942
    await era.printAndWait(`「好恨啊………！」`); // :7943
  } else if (game.event.犬射精或处刑口上 === 7) {
    // :7945
    await era.printAndWait(''); // :7945-7946
  } // :7945-7947
}

// @MUSEUM_KOUJO_K1 // :7950
async function museum_koujo_k1() {
  if (game.event.博物馆口上 === 0) {
    // :7953
    await era.printAndWait(`「这种死法讨厌啊啊！」`); // :7954
  } else if (game.event.博物馆口上 === 1) {
    // :7956
    await era.printAndWait(`「我不要变成这种玩具啊！」`); // :7957
  } else if (game.event.博物馆口上 === 2) {
    // :7959
    await era.printAndWait(''); // :7959-7960
  } else if (game.event.博物馆口上 === 3) {
    // :7962
    await era.printAndWait(`(咕…如果力量没被封印的话、这、这种打扮…！)`); // :7963
    await era.printAndWait(`「这、这种感觉就行了吧？…早点弄完就最好了―」`); // :7964
  } else if (game.event.博物馆口上 === 4) {
    // :7966
    await era.printAndWait(
      `「身…身体它、变得不是人类了…不…不要！谁、谁来……救…救…」`,
    ); // :7967
  } else if (game.event.博物馆口上 === 5) {
    // :7969
    await era.printAndWait(''); // :7969-7970
  } else if (game.event.博物馆口上 === 6) {
    // :7972
    await era.printAndWait(''); // :7972-7973
  } else if (game.event.博物馆口上 === 7) {
    // :7975
    await era.printAndWait(''); // :7975-7976
  } else if (game.event.博物馆口上 === 8) {
    // :7978
    await era.printAndWait(''); // :7978-7979
  } else if (game.event.博物馆口上 === 9) {
    // :7981
    await era.printAndWait(''); // :7981-7982
  } // :7981-7983
}

// @BANISHMENT_KOUJO_K1 // :7986
async function banishment_koujo_k1() {
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.流放口上 === 0) {
    // :7990
    await era.printAndWait(`「骗、骗人吧…${sc()}的力量该不会被封印了吧………」`); // :7991
  } else if (game.event.流放口上 === 1) {
    // :7993
    await era.printAndWait(''); // :7993-7994
  } else if (game.event.流放口上 === 2) {
    // :7996
    await era.printAndWait(''); // :7996-7997
  } else if (game.event.流放口上 === 3) {
    // :7999
    await era.printAndWait(''); // :7999-8000
  } else if (game.event.流放口上 === 4) {
    // :8002
    await era.printAndWait(''); // :8002-8003
  } // :8002-8004
}

// @PUBLIC_EXUCUTION_KOUJO_K1 // :8007
async function public_exucution_koujo_k1() {
  if (game.event.公开处刑口上 === 0) {
    // :8011
    await era.printAndWait(`「讨厌啊…咿…呀咿咿！再也不会被弄坏了！」`); // :8012
  } else if (game.event.公开处刑口上 === 1) {
    // :8014
    await era.printAndWait(`「畜生…畜生畜生………！」`); // :8015
  } else if (game.event.公开处刑口上 === 2) {
    // :8017
    await era.printAndWait(''); // :8017-8018
  } // :8017-8019
}

// @GROTESQUE_KOUJO_K1 // :8022
async function grotesque_koujo_k1() {
  if (game.event.猎奇处刑口上 === 0) {
    // :8026
    await era.printAndWait(''); // :8026-8027
  } else if (game.event.猎奇处刑口上 === 1) {
    // :8029
    await era.printAndWait(''); // :8029-8030
  } else if (game.event.猎奇处刑口上 === 2) {
    // :8032
    await era.printAndWait(''); // :8032-8033
  } else if (game.event.猎奇处刑口上 === 3) {
    // :8035
    await era.printAndWait(''); // :8035-8036
  } else if (game.event.猎奇处刑口上 === 4) {
    // :8038
    await era.printAndWait(''); // :8038-8039
  } else if (game.event.猎奇处刑口上 === 5) {
    // :8041
    await era.printAndWait(''); // :8041-8042
  } else if (game.event.猎奇处刑口上 === 6) {
    // :8044
    await era.printAndWait(''); // :8044-8045
  } // :8044-8046
}

// @ENTERENEMY_KOUJO_K1 // :8049
async function enterenemy_koujo_k1() {
  const target = era_flag.target;
  const a = target;

  if (era.get(`talent:${a}:21`) === 1 || era.get(`talent:${a}:22`) === 1) {
    // :8052

    await era.printAndWait(`「……${self_call(a)}会打倒魔王的」`); // :8054
  } else if (
    era.get(`talent:${a}:11`) === 1 ||
    era.get(`talent:${a}:12`) === 1 ||
    era.get(`talent:${a}:15`) === 1 ||
    era.get(`talent:${a}:30`) === 1 ||
    era.get(`talent:${a}:34`) === 1
  ) {
    // :8055

    await era.printAndWait(`「魔王什么的轻轻的一击就够了！」`); // :8057
  } else if (
    era.get(`talent:${a}:10`) === 1 ||
    era.get(`talent:${a}:26`) === 1
  ) {
    // :8058

    await era.printAndWait(
      `「${self_call(a)}魔王能打倒吗…不对、绝对会打倒！」`,
    ); // :8060
  } else {
    // :8060-8061

    await era.printAndWait(`「虽然不怎么了解魔王的实力、不过觉悟吧！！」`); // :8063
  } // :8063-8064
}

// @GOHOUBI_REQUEST_KOUJO_K1 // :8067
async function gohoubi_request_koujo_k1(cid) {
  const target = era_flag.target;
  const a = cid ?? target;

  if (chara(a).stronghold.要求奖赏 === 0) {
    // :8070

    await era.printAndWait(`「请多关照报酬是钱哦！」`); // :8072
  } else if (
    chara(a).stronghold.要求奖赏 === 1 ||
    chara(a).stronghold.要求奖赏 === 2 ||
    chara(a).stronghold.要求奖赏 === 3
  ) {
    // :8073

    await era.print(`「胜利之后、想要和`); // :8075
    if (chara(a).stronghold.要求奖赏 === 1) {
      // :8076
      await era.print(`狗`); // :8077
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      // :8078
      await era.print(`猪`); // :8079
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      // :8080
      await era.print(`马`); // :8081
    } // :8081-8082
    await era.printAndWait(`交尾」`); // :8083
  } else if (chara(a).stronghold.要求奖赏 === 4) {
    // :8084

    await era.printAndWait(`「哇、回来的吻…等待着呢」`); // :8086
  } else if (chara(a).stronghold.要求奖赏 === 5) {
    // :8087

    await era.printAndWait(`「呐、打倒勇者的话…希望可以做爱」`); // :8089
  } else if (chara(a).stronghold.要求奖赏 === 6) {
    // :8090

    await era.printAndWait(`「回来的话、白色的…能喝一次」`); // :8092
  } else if (chara(a).stronghold.要求奖赏 === 7) {
    // :8093

    await era.printAndWait(`「如果打倒的话作为胜利的纪念、开性爱派对吧」`); // :8095
  } else if (chara(a).stronghold.要求奖赏 === 8) {
    // :8096

    await era.printAndWait(`「魔王大人…赢了的话…给我喝尿…？」`); // :8098
  } else if (chara(a).stronghold.要求奖赏 === 9) {
    // :8099

    await era.printAndWait(
      `「打倒勇者的话、想要用小穴吸吮包茎处男的短小肉棒」`,
    ); // :8101
  } // :8101-8102
}

// @GOHOUBI_AFTER_KOUJO_K1 // :8105
async function gohoubi_after_koujo_k1(cid, choice) {
  const target = era_flag.target;
  const a = cid ?? target;

  if (choice === 0) {
    // :8111
    await era.printAndWait(`「难得努力了一下…！」`); // :8112
  } else if (choice === 1) {
    // :8114
    await era.printAndWait(`「呼呼、想要增加更多的这个勋章」`); // :8115
  } else if (choice === 2) {
    // :8116

    if (chara(a).stronghold.要求奖赏 === 0) {
      // :8118
      await era.printAndWait(`「谢谢、可以去买买买了呢！～嘻嘻」`); // :8119
    } else if (chara(a).stronghold.要求奖赏 === 1) {
      // :8121

      if (era.get(`talent:${a}:0`) === 1) {
        // :8123
        await era.printAndWait(`「啊啊啊！和狗用肛门交尾！好棒～好棒哦！」`); // :8124
      } else {
        // :8124-8125
        await era.printAndWait(`「啊啊啊！和狗交尾！好棒～好棒哦！」`); // :8126
      } // :8126-8127
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      // :8129

      if (era.get(`talent:${a}:0`) === 1) {
        // :8131
        await era.printAndWait(`「啊啊啊！和猪用肛门交尾！好棒～好棒哦！」`); // :8132
      } else {
        // :8132-8133
        await era.printAndWait(`「啊啊啊！和猪交尾！好棒～好棒哦！」`); // :8134
      } // :8134-8135
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      // :8137

      if (era.get(`talent:${a}:0`) === 1) {
        // :8139
        await era.printAndWait(`「啊啊啊！和马用肛门交尾！好棒～好棒哦！」`); // :8140
      } else {
        // :8140-8141
        await era.printAndWait(`「啊啊啊！和马交尾！好棒～好棒哦！」`); // :8142
      } // :8142-8143
    } else if (chara(a).stronghold.要求奖赏 === 4) {
      // :8145
      await era.printAndWait(`「恩、呜嗯…啾…接吻…好美妙…${heart(1)}」`); // :8146
    } else if (chara(a).stronghold.要求奖赏 === 5) {
      // :8148

      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        // :8150
        await era.printAndWait(`「性交作为奖励！最棒～最棒了呦${heart(1)}」`); // :8151
      } else {
        // :8152-8153
        await era.printAndWait(
          `「肛门好棒！好棒啊…啊啊啊还要更多${heart(1)}」`,
        ); // :8154
      } // :8154-8155
    } else if (chara(a).stronghold.要求奖赏 === 6) {
      // :8157
      await era.printAndWait(
        `「好吃…魔王大人的美味精液好棒啊…想要更多…可以吗？」`,
      ); // :8158
    } else if (chara(a).stronghold.要求奖赏 === 7) {
      // :8160

      if (era.get(`talent:${a}:0`) === 1) {
        // :8162
        await era.printAndWait(
          `「啊啊啊…果然还是性爱派对好…再来…${heart(1)}」`,
        ); // :8163
      } else {
        // :8163-8164
        await era.printAndWait(
          `「啊啊啊…果然还是性爱派对好…再来…${heart(1)}」`,
        ); // :8165
      } // :8165-8166
    } else if (chara(a).stronghold.要求奖赏 === 8) {
      // :8168
      await era.printAndWait(`「小便…好美味、魔王大人♪」`); // :8169
    } else if (chara(a).stronghold.要求奖赏 === 9) {
      // :8171

      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        // :8173
        await era.printAndWait(`「你看、这样你也想成为合格的男子汉？」`); // :8174
      } else {
        // :8175-8176
        await era.printAndWait(`「很抱歉是肛交、不过这里也不错吧？」`); // :8177
      } // :8177-8178
    } else {
      // :8177-8179
    } // :8177-8180
  } // :8181-8183
}

// @OSIOKI_KOUJO_K1 // :8183
async function osioski_koujo_k1(cid, choice) {
  const target = era_flag.target;
  const a = cid ?? target;

  if (choice === 0) {
    // :8189
    await era.printAndWait(`「得、得救了………」`); // :8190
  } else if (choice === 1) {
    // :8192

    if (era.get(`abl:${a}:21`) >= 3) {
      // :8194
      await era.printAndWait(`「啊啊啊！电气惩罚最高呦！」`); // :8195
    } else {
      // :8195-8196
      await era.printAndWait(`「不! 不!！再次原谅我吧！咿啊呜！」`); // :8197
    } // :8197-8198
  } else if (choice === 2) {
    // :8200

    if (era.get(`abl:${a}:17`) >= 4) {
      // :8202
      await era.printAndWait(
        `「你看、魔王大人的东西${self_call(a)}大庭广众的自慰、就是这样礼貌的好好观看吧」`,
      ); // :8203
    } else {
      // :8203-8204
      await era.printAndWait(
        `「啊啊啊…${self_call(a)}为什么有这样的感觉…看、看到了！看到了啊！」`,
      ); // :8205
    } // :8205-8206
  } else if (choice === 3) {
    // :8208

    if (era.get(`abl:${a}:17`) >= 6) {
      // :8210
      await era.printAndWait(`「这样一边大便一边手淫${heart(1)}」`); // :8211
    } else {
      // :8211-8212
      await era.printAndWait(`「嗯嗯…为什么会这样…讨厌、讨厌啊…！」`); // :8213
    } // :8213-8214
  } else if (choice === 4) {
    // :8216

    if (era.get(`abl:${a}:21`) >= 3) {
      // :8218
      await era.printAndWait(
        `「啊啊啊嗯！更多！还要更多！最喜欢主人的鞭打了！」`,
      ); // :8219
    } else {
      // :8219-8220
      await era.printAndWait(`「对不起啊！下次一定会成功的！」`); // :8221
    } // :8221-8222
  } else if (choice === 5) {
    // :8224

    if (era.get(`talent:${a}:88`) === 1 || era.get(`talent:${a}:76`) === 1) {
      // :8226
      await era.printAndWait(
        `「认真瞄准${self_call(a)}的脸…呜咕噗…嗯哈…小便真美味${heart(1)}」`,
      ); // :8227
    } else {
      // :8227-8228
      await era.printAndWait(`「不要再来了………」`); // :8229
    } // :8229-8230
  } else if (choice === 6) {
    // :8232
    await era.printAndWait(`「………」`); // :8233
  } else if (choice === 7) {
    // :8235
    await era.printAndWait(`「肚子饿了………」`); // :8236
  } else if (choice === 8) {
    // :8238
    await era.printAndWait(
      `「已经受不了！再不和主人性交真的要疯了！求你了求你了啊！强奸了${self_call(a)}吧！」`,
    ); // :8239
  } else if (choice === 9) {
    // :8241
    await era.printAndWait(`「咕噜咕噜！」`); // :8242
  } // :8242-8243
}

// @GOBI_KOUJO_K1, ARG:0 // :8246
async function gobi_koujo_k1(arg0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg0 === 1) {
    // :8249

    await era.print(`哎哟♪`); // :8251
  } else if (arg0 === 2) {
    // :8252

    await era.print(`哎呦！`); // :8254
  } else if (arg0 === 3) {
    // :8255

    await era.print(`哎……。`); // :8257
  } else if (arg0 === 4) {
    // :8258

    await era.print(`哎哟……什么、不好！？`); // :8260
  } else if (arg0 === 5) {
    // :8261

    await era.print(`这样的事……。`); // :8263
  } else {
    // :8263-8264

    if (rand_n(3) === 0) {
      // :8267
      await era.print(`哈。`); // :8268
    } else if (rand_n(2) === 0) {
      // :8269
      await era.print(`哎呦。`); // :8270
    } else {
      // :8270-8271
      await era.print(`的哇。`); // :8272
    } // :8272-8273
  } // :8272-8274
}

kojo_message_com_family.register(1, kojo_message_com_1);
dog_kojo_family.register(1, dog_kojo_1);
colosseum_kojo_family.register(1, colosseum_kojo_1);
kojo_message_palamcng_family.register(1, kojo_message_palamcng_1);
kojo_message_markcng_family.register(1, kojo_message_markcng_1);
self_kojo_family.register(1, self_kojo_k1);
ryouzyoku_kojo_family.register(1, dungeon_ryouzyoku_k1);
ryouzyoku_after_kojo_family.register(1, dungeon_ryouzyoku_after_k1);
benki_koujo_family.register(1, benki_koujo_k1);
dungeon_victory_family.register(1, dungeon_victory_k1);
dungeon_attack_family.register(1, dungeon_attack_k1);
ntr_koujo_family.register(1, ntr_koujo_k1);
exucution_koujo_family.register(1, exucution_koujo_k1);
museum_koujo_family.register(1, museum_koujo_k1);
banishment_koujo_family.register(1, banishment_koujo_k1);
public_exucution_koujo_family.register(1, public_exucution_koujo_k1);
grotesque_koujo_family.register(1, grotesque_koujo_k1);
enterenemy_koujo_family.register(1, enterenemy_koujo_k1);
gohoubi_request_koujo_family.register(1, gohoubi_request_koujo_k1);
gohoubi_after_koujo_family.register(1, gohoubi_after_koujo_k1);
osioski_koujo_family.register(1, osioski_koujo_k1);
gobi_koujo_family.register(1, gobi_koujo_k1);

module.exports = { STUBBED_CALLS, kojo_message_com_1 };
