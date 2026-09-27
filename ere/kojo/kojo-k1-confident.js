/**
 * @file 自信家性格口上 K1：指令口上全部分支与非调教函数（issue #232，J22）。
 *
 * == 状态机（CFLAG:301～400，个位数推进） ==
 *
 * 与 K5 同构：初回 → 1；二回目以降按素质/刻印取首个命中，FLAG:7 == 2（默认）
 * 时上限被旁路、同支每次出声；FLAG:7 == 1 时逐阶段各出一次声。
 *
 * SELL_MATURO_K0 成熟出售真身已随 #338 接通。
 */

/* eslint-disable no-irregular-whitespace -- 台词含源 ERB 全角空格（U+3000），1:1 保真 */

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
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
  gobi_koujo_family,
} = require('#/kojo/kojo-system');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
const { get_look_info } = require('#/chara/look-info');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { piercing_state } = require('#/system/train/piercing-state');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

const MASTER = 0;

// @EVENTTRAIN
on(
  'EVENTTRAIN',
  () => {
    // #PRI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达）
    // FLAG:101  = 1（变量语义：FLAG 族，101）
    game.kojo.口上存在_1 = 1;
    if (game.kojo.口上开关 === 0) {
      // FLAG:7  = 2（变量语义：FLAG 族，7）
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND
on(
  'EVENTEND',
  () => {
    // #LATER（事件优先级修饰符，JS 侧用 on() 的 TIER 表达）
    // FLAG:101  = 0（变量语义：FLAG 族，101）
    game.kojo.口上存在_1 = 0;
  },
  TIER.LATER,
);

// @EVENTTRAIN
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
      return 0;
    }
    if (era.get(`talent:${target}:161`) !== 1) {
      return 0;
    }

    if (chara(target).kojo.初调教 === 0) {
      era.drawLine();

      if (era.get(`talent:${target}:314`) === 1) {
        await era.printAndWait(`「这、这种事情你居然对${sc()}做的出来…！？」`);
        await era.printAndWait(`${target_name}靠着最后的勇气硬挺的瞪着你。`);
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else if (era.get(`talent:${target}:314`) === 2) {
        await era.printAndWait(`「满月的时候我们走着瞧！」`);
        await era.printAndWait(`${target_name}用野兽一样的眼睛瞪着你`);
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else if (era.get(`talent:${target}:314`) === 3) {
        await era.printAndWait(
          `「高贵的血族${sc()}是不会臣服于你的调教之下的…」`,
        );
        await era.printAndWait(`「你这是在玩火自焚」`);
        await era.printAndWait(
          `身为一个血族、${target_name}用他的尊严做的保证………`,
        );
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else if (era.get(`talent:${target}:314`) === 4) {
        await era.printAndWait(`「呼......这就是传说中的调教室么…」`);
        await era.printAndWait(
          `「那么尊敬的魔王大人你难道对${sc()}没什么想法么？」`,
        );
        await era.printAndWait(
          `无头骑士${target_name}用最后的倔强硬挺着胸膛………`,
        );
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else if (era.get(`talent:${target}:314`) === 5) {
        await era.printAndWait(`「真是有趣、身体无法自由移动了么？…」`);
        await era.printAndWait(`「难道还想着让${sc()}屈服吗？魔王大人？」`);
        await era.printAndWait(`这是一名龙族${target_name}根深蒂固的骄傲………`);
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else if (era.get(`talent:${target}:314`) === 6) {
        await era.printAndWait(
          `「就算是你的肮脏的手碰到我${sc()}也是一种亵渎！」`,
        );
        await era.printAndWait(`「你一定会受到惩罚的！」`);
        await era.printAndWait(
          `虽然已经猜到了自己之后的命运、但是${target_name}的态度还是十分强硬………`,
        );
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else if (era.get(`talent:${target}:314`) === 9) {
        await era.printAndWait(`「你这个可恶的恶魔、下地狱去吧！」`);
        await era.printAndWait(`${target_name}用恶狠狠的眼神凝视着你…`);
        await era.printAndWait(`这是当然的了、因为她已经是黑暗的居民-魔族了。`);
        await era.printAndWait(`但是不管这个女人有多么憎恨魔族`);
        await era.printAndWait(
          `她也开始感到这种必须臣服于魔族之王的意志的本能………`,
        );
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;

        // CFLAG:370  = 1（变量语义：CFLAG 族，370）
        chara(target).kojo.魔族化 = 1;
      } else if (era.get(`talent:${target}:314`) === 10) {
        await era.printAndWait(`「别开玩笑了！ 这种事情…」`);
        await era.printAndWait(`「至少每天也要给我5份食物吧！」`);
        await era.printAndWait(
          `${target_name}应该是误解了吧、她向你提出改善待遇的要求…`,
        );
        await era.printAndWait(`这种态度如何？这种慢慢崩溃的希望…`);
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else if (era.get(`talent:${target}:314`) === 11) {
        await era.printAndWait(`「想要被我心爱的斧子干掉吗？…」`);
        await era.printAndWait(
          `${target_name}虽然比你的个子矮、她还是用威慑性目光看着你。`,
        );
        await era.printAndWait(`然而这种态度并不会持续太久………`);
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
      } else {
        await era.printAndWait(`「别开玩笑了！ 这种事情…」`);
        await era.printAndWait(`${target_name}用坚强的目光注视着你`);
        await era.printAndWait(`然而这种态度并不会持续太久………………`);
        // CFLAG:201  = 1（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 1;
        return 1;
      }
    } else if (
      chara(target).kojo.初调教 < 5 &&
      chara(target).kojo.魔族化 === 0 &&
      era.get(`talent:${target}:314`) === 9 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      await era.printAndWait(
        `「身体...身体变成这样的话.....已经....回不去家了......」`,
      );
      await era.printAndWait(
        `经过反复的改造、${target_name}的身体已经完全变成魔族了。她流下了眼泪、双肩止不住的颤抖着`,
      );
      await era.printAndWait(`即使她心里悲恸万分以泪洗面、但是身为一个魔族`);
      await era.printAndWait(
        `她也开始感到这种必须臣服于魔族之王的意志的本能………`,
      );

      // CFLAG:370  = 2（变量语义：CFLAG 族，370）
      chara(target).kojo.魔族化 = 2;
      return 1;
    } else if (
      chara(target).kojo.初调教 >= 1 &&
      chara(target).kojo.NTR再捕获 === 1
    ) {
      if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
        era.drawLine();
        await era.printAndWait(
          `在看到那个水晶球之后${target_name}的脸色大变。`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「这种事情不是真的…${sc()}的意志不是真的…${sc()}的意志不可能是真的!」`,
        );
        await era.printAndWait(
          `「是、是的...那个卑鄙的狂王用药物....所以.....所以求你了.....原谅我.....」`,
        );
        era.setColor('');
        await era.printAndWait(
          `${target_name}混乱的体态是因为使用了药物之类的东西还是因为${target_name}的身体贪图快感${master_name}马上就看得出来。看着${target_name}慌乱不已尝试掩盖的样子、${master_name}就嫉妒的要发疯了………`,
        );

        // CFLAG:650  = 0（变量语义：CFLAG 族，650）
        chara(target).kojo.NTR再捕获 = 0;
      } else {
        era.drawLine();
        await era.printAndWait(
          `「啊啊...又输了呢…勇者的自信心什么的已经找不回来了………」`,
        );
        await era.printAndWait(
          `「肯定又是你…侵犯侵犯竭尽全力的侵犯吧？………那样的被狂王大人………」`,
        );
        await era.printAndWait(
          `${target_name}轻蔑的笑了起来并且张开双手不再抵抗………`,
        );

        // CFLAG:650  = 0（变量语义：CFLAG 族，650）
        chara(target).kojo.NTR再捕获 = 0;
      }
      return 1;
    } else if (
      chara(target).kojo.初调教 < 2 &&
      era.get(`mark:${target}:2`) === 1 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「啊..那样的...」`);
      await era.printAndWait(
        `${target_name}在你的面前双臂抱着身体、仿佛要保护自己………`,
      );
      await era.printAndWait(`「这...这没什么好吓人的！」`);
      // CFLAG:201  = 2（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 2;
      return 1;
    } else if (
      chara(target).kojo.初调教 < 3 &&
      era.get(`mark:${target}:2`) === 2 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「不一样...但是…」`);
      await era.printAndWait(`${target_name}在你的面前不安的摇了摇头………`);
      // CFLAG:201  = 3（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 3;
      return 1;
    } else if (
      chara(target).kojo.初调教 < 4 &&
      era.get(`mark:${target}:2`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「已经没有办法回去了呢…」`);
      await era.printAndWait(`${target_name}用着一种期待的眼神看着你。`);
      await era.printAndWait(`「啊、魔王大人....今天真是温柔呢………」`);
      // CFLAG:201  = 4（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 4;
      return 1;
    } else if (
      chara(target).kojo.初调教 < 5 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`talent:${target}:314`) !== 9
    ) {
      era.drawLine();
      era.setColor('#ffccff');
      await era.printAndWait(`「是的...主人…${heart(1)}」`);
      era.setColor('');
      await era.printAndWait(
        `${target_name}眼睛里带着浓浓的春意、迫切的看着你………`,
      );
      era.setColor('#ffccff');
      await era.printAndWait(
        `「今天的主人好棒…有好多～好棒的侍奉要我来做呢...${heart(1)}」」`,
      );
      await era.printAndWait(
        `「${sc()}果然和主人一起最让人心情舒畅了…花心的话可是不行的哦」`,
      );
      era.setColor('');
      await era.printAndWait(
        `${target_name}为了增加和阴茎的摩擦、她紧紧抱住了你的身体。`,
      );
      era.setColor('#ffccff');
      await era.printAndWait(
        `「啊…要让我说感觉的话…${sc()}因为主人最能让我快乐了${heart(3)}」`,
      );
      era.setColor('');
      await era.printAndWait(
        `用甜美的声音献媚、${target_name}的脑中满是令人愉悦的事情………`,
      );
      // CFLAG:201  = 5（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 5;
      return 1;
    } else if (
      era.get(`talent:${target}:314`) === 9 &&
      chara(target).kojo.初调教 < 6 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 1
    ) {
      era.drawLine();

      if (chara(target).kojo.魔族化 === 1) {
        era.setColor('#ffccff');
        await era.printAndWait(`「是的...主人…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(
          `${target_name}是以前完全无法想象的发情的目光………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「已经…完全忍不下去了…子宫已经习惯了这种美妙的感觉了啊…好想要、好想要主人的精液啊………${heart(1)}」`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          era.setColor('#ffccff');
        }
        await era.printAndWait(
          `「处女...处女膜已经早就交给主人了呢…${heart(1)} 这是主人专用的阴道、请用吧${heart(1)}」`,
        );
        era.setColor('');
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `${target_name}用双手张开了沾满爱液的阴唇给${master_name}看。`,
          );
        }
        era.setColor('#ffccff');
        await era.printAndWait(
          `「啊啊..这具身体要为主人提供服务了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `「全力在侍奉啊…${heart(1)} 满满的...好开心…${heart(1)}」`,
        );
        era.setColor('');
        await era.printAndWait(
          `脸上带着能融化一切的笑容${target_name}紧紧地抱住了${master_name}。`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(`「这种色情的身体习惯…非常幸福呢…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(
          `${target_name}反复调教的结果体现出来了、她完全被情欲支配了`,
        );
        await era.printAndWait(`调教前的魔族改造向好的方向发展了呢………`);
        era.setColor('');
        // CFLAG:201  = 6（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 6;
        return 1;
      } else if (chara(target).kojo.魔族化 === 2) {
        era.setColor('#ffccff');
        await era.printAndWait(`「是的..主人尽管…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(
          `但是她的样子很奇怪${target_name}用着发情的目光看着${master_name}………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「想要主人的精液…${heart(1)} 好想要的说…${heart(1)}」`,
        );
        era.setColor('');
        if (era.get(`talent:${target}:0`) === 1) {
          era.setColor('#ffccff');
        }
        await era.printAndWait(
          `「阴道想要精液…${heart(1)} 这是主人专用的阴道请插进来吧${heart(1)}」`,
        );
        era.setColor('');
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `${target_name}用双手张开了沾满爱液的阴唇给${master_name}看。`,
          );
        }
        era.setColor('#ffccff');
        await era.printAndWait(
          `「终于...终于明白了的说…${sc()}的身体…似乎想侍奉您呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `「那样的主人永远不会腻呢…满满的…真是满满的侍奉啊…希望可以把我灌满的色色的东西啊${heart(1)}」`,
        );
        era.setColor('');
        await era.printAndWait(
          `脸上带着能融化一切的笑容${target_name}张开双臂紧紧搂住${master_name}。`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(`「能够变成魔族…真的是太好了呢…${heart(1)}」」`);
        era.setColor('');
        await era.printAndWait(
          `${target_name}反复调教的结果体现出来了、她完全被情欲支配了。`,
        );
        await era.printAndWait(`魔化改造向好的方向发展了呢………`);
        // CFLAG:201  = 6（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 6;
        return 1;
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(`「主人${heart(1)} 真的谢谢你呢${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(
          `一进入房间、${target_name}就欢呼着跳上了后背…看来她一直在门口等着你的到来………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「因为成为魔族…就能一直...一直…对主人进行满满的侍奉了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `「呵呵...${heart(1)} 谢谢主人${heart(1)}…谢谢${heart(1)}」`,
        );
        await era.printAndWait(
          `「魔族的胸部..魔族的阴道...魔族的肛门…全都是用来侍奉主人的东西呢${heart(1)}」`,
        );
        await era.printAndWait(
          `「快点...快点…抱着我啊…已经…已经忍不住了…一起来做爱做的事情吧！${heart(1)}」`,
        );
        era.setColor('');
        await era.printAndWait(
          `${target_name}对于自己的兴奋的感情已经完全控制不住了、两只魔眼更是绽放着光芒………`,
        );
        // CFLAG:201  = 6（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 6;
        return 1;
      }
    } else if (
      chara(target).kojo.初调教 < 7 &&
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:314`) !== 9
    ) {
      era.drawLine();
      era.setColor('#ffccff');
      await era.printAndWait(`「啊…是您啊…主人…」`);
      era.setColor('');
      await era.printAndWait(`${target_name}和原来的样子有点不太一样………`);
      era.setColor('#ffccff');
      await era.printAndWait(`「${scf()}、${sc()}请听我说…！」`);
      era.setColor('');
      await era.printAndWait(
        `${target_name}仿佛像对待恋人一样随意的抱住了你………`,
      );
      era.setColor('#ffccff');
      await era.printAndWait(
        `「那个…${sc()}…主人的话…真的好喜欢…我爱你！………」`,
      );
      await era.printAndWait(`「对${sc()}的爱慕、并不是什么假话…」`);
      era.setColor('');
      await era.printAndWait(
        `${target_name}为了更好地抱住你、她撒娇一样的把脸颊紧贴着你………`,
      );
      // CFLAG:201  = 7（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 7;
      return 1;
    } else if (
      era.get(`talent:${target}:314`) === 9 &&
      chara(target).kojo.初调教 < 8 &&
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();

      if (chara(target).kojo.魔族化 === 1) {
        era.setColor('#ffccff');
        await era.printAndWait(
          `「这样…居然会有这样的感觉…那么…讨厌这样吗………真的讨厌这样吗？」`,
        );
        era.setColor('');
        await era.printAndWait(`${target_name}和平时的样子有些不同。`);
        await era.printAndWait(
          `注意到了${master_name}的到来、好像坚定了什么决心、开口了。`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「${scf()}、${sc()}…那、那个…主人…对你的话…好、好像喜欢上了呢………」`,
        );
        era.setColor('');
        await era.printAndWait(
          `${target_name}说出的那句话连她自己都感觉吃惊………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(`「啊…啊…啊啊啊、真的真的很喜欢…很爱你！」`);
        await era.printAndWait(
          `「能一直呆在你脚下…就算只是一只宠物…那也好啊………」`,
        );
        era.setColor('');
        await era.printAndWait(
          `${target_name}满溢的感情已经按捺不住了、泪水夺眶而出。`,
        );
        await era.printAndWait(
          `因为多次的调教和魔族的本能、${target_name}深爱着${master_name}………`,
        );
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 8;
        era.setColor('');
        return 1;
      } else if (chara(target).kojo.魔族化 === 2) {
        era.setColor('#ffccff');
        await era.printAndWait(`「没有办法回到故乡也好…好不容易放弃了………」`);
        era.setColor('');
        await era.printAndWait(`${target_name}的样子和以前不太一样。`);
        await era.printAndWait(
          `注意到了${master_name}的到来、好像坚定了什么决心、开口了。`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「终于明白了${sc()}的归宿是哪里…那就是…这里啊………」`,
        );
        era.setColor('');
        await era.printAndWait(
          `${target_name}走近${master_name}、充满爱意的把手放在了胸膛上。`,
        );
        await era.printAndWait(`手不断地颤抖着、可以看出来她下了多大的决心。`);
        await era.printAndWait(
          `要是真的话真想立刻抱抱这个女孩啊、她忍住了抱上来的冲动、自说自话道………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「现在的主人…是${sc()}活下去的动力…${heart(1)}」`,
        );
        await era.printAndWait(
          `「最喜欢的主人…满足的侍奉、所以离不开了呢…对吧…？」`,
        );
        era.setColor('');
        await era.printAndWait(
          `因为多次的调教和魔族的本能、${target_name}深爱着${master_name}………`,
        );
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 8;
        era.setColor('');
        return 1;
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(
          `「啊啊啊…${sc()}…真的变成魔族了…已经回不了头了啊…${heart(1)}」`,
        );
        era.setColor('');
        await era.printAndWait(`${target_name}高兴的连眼泪都流了出来………`);
        era.setColor('#ffccff');
        await era.printAndWait(`「不过这样一来…${sc()}我永远离不开了………」`);
        era.setColor('');
        await era.printAndWait(`${target_name}只是羞涩的笑了一下、就抱住了………`);
        era.setColor('#ffccff');
        await era.printAndWait(`「哼哼、一定要更努力呢…亲爱的…${heart(1)}」`);
        era.setColor('');
        // CFLAG:201  = 8（变量语义：CFLAG 族，201）
        chara(target).kojo.初调教 = 8;
        era.setColor('');
        return 1;
      }
    } else if (
      era.get(`talent:${target}:9`) === 1 &&
      chara(target).kojo.初调教 < 9
    ) {
      era.drawLine();
      await era.printAndWait(
        `${target_name}露出了一种奇怪的表情自言自语着该如何是好。`,
      );
      await era.printAndWait(
        `看到${master_name}来了、整张脸都僵住了、小便无法抑制的往外流。`,
      );
      await era.printAndWait(`${target_name}崩溃的精神应该是无法复原了吧………`);
      // CFLAG:201  = 9（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 9;
      return 1;
    } else if (era_flag.assi < 0) {
      await k1_kojo2(rand); // CALL K1_KOJO2
    } else if ((era.get(`no:${assi}`) || assi) === 17) {
      era.drawLine();
      if (era.get(`talent:${assi}:165`)) {
        if (chara(target).kojo.简易助手_0 === 0) {
          if (era.get(`talent:${target}:9`) === 1) {
            await era.printAndWait(`『…主人、这个人坏掉了...』`);
          } else if (
            era.get(`talent:${target}:76`) === 1 &&
            chara(target).kojo.初调教 >= 5
          ) {
            era.setColor('#ffccff');
            await era.printAndWait(
              `「诶…今天是主人和另外一个人一起来调教吗？」`,
            );
            era.setColor('');
            await era.printAndWait(
              `${target_name}对着第一次见到的少女舔着嘴唇。作为助手${master_name}简单介绍了一下${assi_name}。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(`「哈哈…就是那个孩子来调教${sc()}吗？」`);
            era.setColor('');
            await era.printAndWait(
              `她笑出了声来、${assi_name}有一点生气、皱起了眉头。`,
            );
            await era.printAndWait(
              `『虽然腿脚都被固定住无法站立、但是还是让我告诉你谁在上面吧、原勇者姐姐。${heart(1)}』`,
            );
            if (era.get(`talent:${assi}:76`) === 1) {
              await era.printAndWait(
                `兴奋不已的${assi_name}开始摩擦双腿。这样就可以了吧${master_name}按住了她的头………`,
              );
            }
          } else if (
            era.get(`talent:${target}:85`) === 1 &&
            chara(target).kojo.初调教 >= 7
          ) {
            await era.printAndWait(
              `${target_name}看到${master_name}带来的少女不由得大声呵斥起来。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(`「啊…啊…这个孩子…啊！」`);
            era.setColor('');
            await era.printAndWait(
              `${target_name}斜睨着、仿佛稍微许可了。看着这种态度${assi_name}不满的上前一步。`,
            );
            await era.printAndWait(
              `『说什么呢我的姐姐、我们还都是主人的奴隶啊…这有什么值得自豪的么…？』`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `「嘛、虽说是奴隶…可是你这样的孩子…那一位…那个………」`,
            );
            era.setColor('');
            await era.printAndWait(
              `好像想起了自己”奴隶”的立场、${target_name}不再说什么了。`,
            );
            await era.printAndWait(`『啊…这样啊…姐姐你嫉妒了呢…』`);

            if (era.get(`talent:${assi}:85`) === 1) {
              await era.printAndWait(
                `『姐姐应该也深爱着主人吧…那样的话、就和我一起侍奉主人吧${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}说着、舔着嘴唇压倒了${target_name}。`,
              );
              era.setColor('#ffccff');
              await era.printAndWait(`「啊、这样的…不要…住手啊………」`);
              era.setColor('');
              await era.printAndWait(
                `『我可爱的姐姐啊…好啊、我会好好的调教你、但是在主人面前我们还是公平竞争吧。${heart(1)}』`,
              );
            } else {
              era.setColor('#ffccff');
              await era.printAndWait(
                `「那样的…${scf()}、${sc()}并不是…那样的…嫉妒什么的………！」`,
              );
              era.setColor('');
              await era.printAndWait(
                `『我可爱的姐姐啊…好啊、我会好好的调教你、但是在主人面前我们还是公平竞争吧。${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}这么说着然后用舌头舔着嘴唇推到了${target_name}………`,
              );
            }
          } else {
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `「啊…这个孩子难道说来自附近的村庄………她姐姐哭着求我”请帮我找一下、我求你了”！」`,
            );
            era.setColor('');
            await era.printAndWait(`『这样啊…我姐姐的事早忘记了呢…』`);
            await era.printAndWait(
              `${assi_name}稍微抬起头不胜感慨的自言自语道。`,
            );
            await era.printAndWait(
              `『但是我…已经不想回去了啊。而且今天我是作为主人的助手来调教”原”勇者大人的呢。』`,
            );
            await era.printAndWait(
              `${assi_name}掐着${target_name}的乳房尽情扭起来。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(`「呃…呃…呃…啊啊啊啊！」`);
            era.setColor('');
            await era.printAndWait(
              `一边看着${target_name}痛苦的悲鸣${assi_name}翘起了嘴角。`,
            );
            await era.printAndWait(
              `看着今天有趣的调教${master_name}露出了笑容………`,
            );
          }
          // CFLAG:202  = 1（变量语义：CFLAG 族，202）
          chara(target).kojo.简易助手_0 = 1;
          return 1;
        } else if (
          chara(target).kojo.简易助手_0 === 1 &&
          game.kojo.口上开关 === 2
        ) {
          if (era.get(`talent:${target}:9`) === 1) {
            await era.printAndWait(
              `『主人、这个坏了的玩具无法复原的话真的好吗？』`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(`「啊啊啊…还…带着这个孩子过来了啊………」`);
            era.setColor('');
            await era.printAndWait(`${target_name}想着闭上了眼睛。`);
            await era.printAndWait(
              `『不要移开双眼啊…我可是很喜欢我可爱的姐姐的说${heart(1)}』`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(`「啊啊啊…！是不行的哦…停、快停下………」`);
            era.setColor('');
            await era.printAndWait(
              `${target_name}在${master_name}的眼前被少女捉弄………`,
            );

            if (era.get(`abl:${target}:17`) >= 3) {
              await era.printAndWait(
                `『你看姐姐、亲爱的主人似乎特别想让我们展示讨厌的地方呢？』`,
              );
              await era.printAndWait(
                `${assi_name}在${target_name}的耳边低声说道。`,
              );
              await era.printAndWait(
                `${target_name}一边红着脸坐在地上双腿像M字一样打开一边挺着腰诱惑${master_name}。`,
              );
              era.setColor('#ffccff');
              await era.printAndWait(
                `「啊啊啊…看啊…主人啊…${sc()}的小穴…只是被主人看到就变得黏糊糊的了啊………」`,
              );
              era.setColor('');
              await era.printAndWait(
                `『哈哈、姐姐很可爱哟…棒极了${heart(1)}』`,
              );
            } else if (era.get(`abl:${target}:17`) >= 1) {
              await era.printAndWait(
                `『你看姐姐、好像展示给主人讨厌的地方了呢${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}从后面抱住${target_name}、把她的胸从下面抬了起来展示给${master_name}。`,
              );
              era.setColor('#ffccff');
              await era.printAndWait(
                `「啊啊啊…啊啊啊啊啊啊啊啊…被看到喽…被主人看到喽………${heart(1)}」`,
              );
              era.setColor('');
              await era.printAndWait(`『哈、姐姐很可爱哟…${heart(1)}』`);
            } else {
              await era.printAndWait(
                `『你看姐姐、好像展示给主人讨厌的地方了呢${heart(1)}』`,
              );
              await era.printAndWait(
                `${assi_name}从后面抱住把双腿拉开了、采取了展现给${master_name}的姿势。`,
              );
              era.setColor('#ffccff');
              await era.printAndWait(`「啊啊啊…不行啦…快停下吧！」`);
              era.setColor('');
              await era.printAndWait(`『嗯、还需要更多的调教么？』`);
            }
          } else if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `「哈…今天也来了呢${assi_name}酱${heart(1)}」`,
            );
            era.setColor('');
            await era.printAndWait(
              `${target_name}一边咬着嘴唇一边淫乱的弯起了嘴角。`,
            );
            if (era.get(`talent:${assi}:76`) === 1) {
              await era.printAndWait(
                `『嗯、今天也要”玩”哟…要做到爽够了为止呦${heart(1)}』`,
              );
            }
            era.setColor('#ffccff');
            await era.printAndWait(
              `「啊啊…来啊…来啊…${assi_name}尽管来吧…${heart(1)}」`,
            );
            era.setColor('');
            await era.printAndWait(
              `看到少女的${target_name}热情的张开双手求欢、${master_name}对从现在开始的表演兴奋不已………`,
            );
          } else {
            await era.printAndWait(
              `今天的${master_name}拉着助手${assi_name}一起来了。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `「还把那孩子带过来什么的…啊、真是不知羞耻！」`,
            );
            era.setColor('');
            await era.printAndWait(
              `少女的面前、不想破坏强硬姿态的${target_name}看着${master_name}微微地笑了笑。`,
            );
            await era.printAndWait(`『哎～…很期待和我见面吗？』`);
            await era.printAndWait(
              `${assi_name}露出了好色的笑容把脸贴近了${target_name}的面前。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(`「那、那种事怎么可能………」`);
            era.setColor('');

            if (era.get(`abl:${target}:33`) >= 3) {
              await era.printAndWait(
                `${target_name}一边说着一边双眼湿润露出眼馋的样子。`,
              );
              await era.printAndWait(
                `『啊哈哈…这种表情的勇者大人啊${heart(1)} 好哟我会让你好好满足的！』`,
              );
              await era.printAndWait(
                `少女被${target_name}推到同时露出高兴的叹息………`,
              );
            } else if (era.get(`abl:${target}:22`) >= 1) {
              await era.printAndWait(
                `${target_name}一边说着一边扭扭捏捏的情不自禁把视线放到了两脚上。`,
              );
              await era.printAndWait(`『勇者大人真不老实啊…』`);
              await era.printAndWait(
                `少女被动地被${target_name}推到露出了羞耻的声音………`,
              );
            } else {
              await era.printAndWait(
                `${target_name}开始拼命想移开看向${assi_name}的视线。`,
              );
              await era.printAndWait(`『算了吧、马上就好了啊${heart(1)}』`);
              await era.printAndWait(
                `少女被${target_name}推到后咬紧嘴唇忍耐着………`,
              );
            }
          }
          return 1;
        }
      } else {
        await k1_kojo2(rand); // CALL K1_KOJO2
      }
    } else {
      await k1_kojo2(rand); // CALL K1_KOJO2
    }
  },
  TIER.NORMAL,
);

// @K1_KOJO2
async function k1_kojo2(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  const scf = () => self_call_first(target);

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「咿…咿咿…不要…咿啊咿…咿！」`);
    await era.printAndWait(
      `不能指望精神崩溃的${target_name}做出什么正常的反应吧………`,
    );
    return 1;
  } else if (era.get(`mark:${target}:3`) === 3 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「绝对…会杀了你」`);
    await era.printAndWait(`${target_name}的眼睛里充满了杀意………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    if (era.get(`talent:${target}:11`)) {
      await era.printAndWait(`「…差劲！　别再过来了！」`);
      await era.printAndWait(`${target_name}毅然决然地瞪着你………`);
    } else if (era.get(`talent:${target}:13`)) {
      await era.printAndWait(`「啧…又来了啊…」`);
      await era.printAndWait(`${target_name}露着碰见麻烦事的表情和你对峙着………`);
    } else {
      await era.printAndWait(`「哼、没用的…」`);
      await era.printAndWait(`${target_name}一副毅然的姿态和你对峙着………`);
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 1 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    if (era.get(`talent:${target}:11`)) {
      await era.printAndWait(`「…别开玩笑了！　想做这种事到什么时候…」`);
      await era.printAndWait(
        `和话语不同的是${target_name}的视线从你身上移开了………`,
      );
    } else if (era.get(`talent:${target}:13`)) {
      await era.printAndWait(`「差不多点啊…也该、知难而退了吧？」`);
      await era.printAndWait(`${target_name}错乱的气息让身体略显僵硬`);
      await era.printAndWait(`而后双脚颤抖着、脚步也变得不稳了………`);
    } else {
      await era.printAndWait(`「老是这样啊…差不多了就好了啊」`);
      await era.printAndWait(`${target_name}看着你的眼睛如此嘟囔着………`);
    }
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 2 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「…我明白了。这样做就好了吧」`);
    await era.printAndWait(`${target_name}放弃了似的把身体全暴露在你眼前………`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「我知道了…主人…」`);
    if (era.get(`talent:${target}:77`) === 1) {
      await era.printAndWait(
        `「${scf()}、${sc()}的…不检点的淫乱肛门…喜欢…你、你侵犯………」`,
      );
    }
    switch (era.get(`talent:${target}:300`)) {
      case 1: {
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的金色的发梢………`,
        );
        break;
      }
      case 2: {
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的栗色的发梢………`,
        );
        break;
      }
      case 3: {
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的黑色的发梢………`,
        );
        break;
      }
      case 4: {
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的赤色的发梢………`,
        );
        break;
      }
      case 5: {
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的银色的发梢………`,
        );
        break;
      }
      case 6: {
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的青色的发梢………`,
        );
        break;
      }
      case 7: {
        await era.printAndWait(
          `${target_name}红着脸轻轻的拉着自己的绿色的发梢………`,
        );
        break;
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      if (rand_n(3) === 0) {
        era.setColor('#ffccff');
        await era.printAndWait(`「哈${heart(1)} 主人啊…你来了啊…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(`${target_name}的眼神闪烁着兴奋的光辉………`);
        era.setColor('#ffccff');
        await era.printAndWait(
          `「侍奉${heart(1)}侍奉${heart(1)}…好好的侍奉主人的身体${heart(1)}」`,
        );
        if (era.get(`talent:${target}:77`) === 1) {
          era.setColor('#ffccff');
        }
        await era.printAndWait(
          `「喂${heart(1)}…快点…享受${sc()}淫乱的魔族肛门满满的侍奉吧${heart(1)}」`,
        );
        era.setColor('');
        era.setColor('');
      } else if (rand_n(2) === 0) {
        era.setColor('#ffccff');
        await era.printAndWait(`「喂喂、主人…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(
          `${target_name}满意的用翅膀呼呼的漂浮在房间里等着你………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「就这样在空中做爱可以么？ 非常的舒服吧………哎、因为很累不喜欢？ 哎呦…真是可惜」`,
        );
        era.setColor('');
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(
          `「啊、主人啊${heart(1)} 让我好好的侍奉你吧${heart(1)}」`,
        );
        era.setColor('');
        await era.printAndWait(
          `${target_name}像狗一样伸长舌头舔着你的脸旋转………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「呼…这种味道啊…主人也发情了啊${heart(1)} 侍奉有意义了啊${heart(1)}」`,
        );
        era.setColor('');
      }
    } else {
      if (rand_n(3) === 0) {
        era.setColor('#ffccff');
        await era.printAndWait(`「主人啊…让我更多的侍奉你吧…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(`${target_name}抱着你用娇滴滴的声音轻轻说道………`);
        era.setColor('#ffccff');
        await era.printAndWait(
          `「嘴巴…乳房…任何地方都可以侍奉主人哦${heart(1)}」`,
        );
        if (era.get(`talent:${target}:77`) === 1) {
          era.setColor('#ffccff');
        }
        await era.printAndWait(
          `「啊哈啊${heart(1)}…特别是${sc()}淫乱的肛门…很舒服的说${heart(1)}」`,
        );
        era.setColor('');
        era.setColor('');
      } else if (rand_n(2) === 0) {
        era.setColor('#ffccff');
        await era.printAndWait(`「啊啊啊…太好了…今天主人来了呢…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(
          `${target_name}在确认你来了的一瞬间就跑了过来。`,
        );
        await era.printAndWait(
          `好像发情那样…可以看见躺在床上自慰弄出来的污渍一样的东西………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(
          `「哈${heart(1)}…请摸${sc()}的这里哦…随时都准备着被你玩弄呢…」`,
        );
        era.setColor('');
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(
          `「咿嗼…真的主人${sc()}没有你性欲就消不下去呢…${heart(1)}」`,
        );
        era.setColor('');
        await era.printAndWait(`${target_name}高兴的说、一副随你玩弄的样子………`);
        era.setColor('#ffccff');
        await era.printAndWait(`「很多的侍奉呢${heart(1)}」`);
        era.setColor('');
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      if (rand_n(3) === 0) {
        era.setColor('#ffccff');
        await era.printAndWait(`「啊…小穴…一直在等着你哟…${heart(1)}」`);
        era.setColor('');
        await era.printAndWait(`${target_name}很害羞的不停地扭着腰………`);
        era.setColor('#ffccff');
        await era.printAndWait(`「今年H的很多啦、啊？啊？」`);
        era.setColor('');
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`${target_name}向着你夸张的飞扑过来了………`);
        era.setColor('#ffccff');
        await era.printAndWait(
          `「我已经不行了…等不急了啦…身体变得热的不得了了啊♪」`,
        );
        if (era.get(`talent:${target}:77`) === 1) {
          await era.printAndWait(
            `「啊啊啊…哎呀…只是嗅到你肛门的味道…随意玩弄我吧…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「哈…哈…嗯、已经不行了…忍不住了………${heart(1)}」`,
        );
        era.setColor('');
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(`「嗯…今天有好好的老实等待呢………！」`);
        era.setColor('');
        await era.printAndWait(
          `${target_name}红着脸不停的相互摩擦着大腿根部………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(`「所以…给我更多的奖赏吧…啊？」`);
        era.setColor('');
      }
    } else {
      if (rand_n(3) === 0) {
        era.setColor('#ffccff');
        await era.printAndWait(`「还不是太迟。好像自慰啊」`);
        era.setColor('');
        await era.printAndWait(
          `${target_name}半开玩笑的语气扑哧一笑把身体交给了你………`,
        );
        era.setColor('#ffccff');
        await era.printAndWait(`「更多…舒服的事吧…啊？」`);
        era.setColor('');
      } else if (rand_n(2) === 0) {
        era.setColor('#ffccff');
        await era.printAndWait(`「今天也要疼爱我啊、主人」`);
        era.setColor('');
        await era.printAndWait(`${target_name}用恋人般的动作对你问道………`);
        era.setColor('#ffccff');
        await era.printAndWait(`「哈…已经变大了啊…${heart(1)}」`);
        era.setColor('');
      } else {
        await era.printAndWait(`${target_name}抱住你然后撒娇道………`);
        era.setColor('#ffccff');
        await era.printAndWait(`「更多、蜡啊」`);
        if (era.get(`talent:${target}:77`) === 1) {
          await era.printAndWait(
            `「${sc()}的…菊、肛门啊…啊、肛门…痛的不行啊………${heart(1)}」`,
          );
        }
        await era.printAndWait(`「${sc()}已经忍不住了………♪」`);
        era.setColor('');
      }
      era.setColor('');
    }
    return 1;
  }
  return 0;
}

// @EVENTEND
on(
  'EVENTEND',
  async () => {
    const target = era_flag.target;
    const target_name = chara_callname(target);
    const master_name = chara_name(MASTER);

    if (game.kojo.口上开关 <= 0) {
      return 0;
    }
    if (era.get(`talent:${target}:161`) !== 1) {
      return 0;
    }

    if (era.get(`base:${target}:0`) <= 0) {
      return 0;
    }

    if (era.get(`talent:${target}:9`) === 1) {
      era.drawLine();
      await era.printAndWait(`「嘻嘻…嘻嘻！…啊、啊…咕咭咿………」`);
      await era.printAndWait(
        `${target_name}的全身被污物沾满了、${master_name}吩咐女仆打扫了房间和她的身体………`,
      );
      return 1;
    } else if (
      era.get(`mark:${target}:3`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「无聊」`);
      return 1;
    } else if (
      era.get(`mark:${target}:2`) <= 1 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「…停下了？」`);
      return 1;
    } else if (
      era.get(`mark:${target}:2`) === 2 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「…相当不错嘛。但是堕落什么的」`);
      return 1;
    } else if (
      era.get(`mark:${target}:2`) === 3 &&
      era.get(`talent:${target}:85`) === 0 &&
      era.get(`talent:${target}:76`) === 0
    ) {
      era.drawLine();
      await era.printAndWait(`「哈哈…太好了…」`);
      return 1;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`base:${target}:0`) >= 500
    ) {
      era.drawLine();

      if (era.get(`talent:${target}:314`) === 9) {
        era.setColor('#ffccff');
        await era.printAndWait(`「啊、真是的…身体好热啊…忍不住的快感………」`);
        era.setColor('');
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(
          `「你的侍奉不够的哟～ 来更多各种各样的吧${heart(1)}」`,
        );
        era.setColor('');
      }
      return 1;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      era.get(`base:${target}:0`) <= 500
    ) {
      era.drawLine();

      if (era.get(`talent:${target}:314`) === 9) {
        era.setColor('#ffccff');
        await era.printAndWait(`「啊啊啊…太好了………${heart(1)}」`);
        era.setColor('');
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(`「哈…哈…你满足了呢…${heart(1)}」`);
        era.setColor('');
      }
      return 1;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`base:${target}:0`) >= 500
    ) {
      era.drawLine();

      if (era.get(`talent:${target}:314`) === 9) {
        era.setColor('#ffccff');
        await era.printAndWait(`「啊啊啊…我还想要更多啊………」`);
        era.setColor('');
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(`「更加激烈地也可以啊？　唔呼呼」`);
        era.setColor('');
      }
      return 1;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      era.get(`base:${target}:0`) <= 500
    ) {
      era.drawLine();

      if (era.get(`talent:${target}:314`) === 9) {
        era.setColor('#ffccff');
        await era.printAndWait(
          `「哈…啊…已经…脑海之中…乱七八糟的…啊…啊啊啊…${heart(1)}」`,
        );
        era.setColor('');
      } else {
        era.setColor('#ffccff');
        await era.printAndWait(`「还…完全没关系…可以继续呢………${heart(1)}」`);
        era.setColor('');
      }
      return 1;
    }
    return 0;
  },
  TIER.NORMAL,
);

// @KOJO_MESSAGE_COM_1
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
    await colosseum_kojo_1(rand); // CALL COLOSSEUM_KOJO_1
    return 0;
  }

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    await dog_kojo_1(rand); // CALL DOG_KOJO_1
    return 0;
  }

  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  if (era_flag.selectcom === 0) {
    if (chara(target).kojo.爱抚 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}转过脸就这样看着${assi_name}………`);
      } else if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「真的！…但、只要忍住就好了…啊…啊啊啊！」`);
      } else {
        await era.printAndWait(`「放过我吧！别再来了…唔哇」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      chara(target).kojo.爱抚 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${target_name}在${assi_name}的爱抚下喘着粗气………`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…想要更多的爱抚…啊啊…留下更多的痕迹吧${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}快乐地扭动着身体………`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…即使更加激烈…没关系的…真的♪」`);
        await era.printAndWait(`「主人啊…更…还想要更多…！」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈…爱抚…更多的爱抚呦…」`);
        await era.printAndWait(`「被别人这么玩弄真是太好了呐…」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…明明这么恶心…明明这么恶心…咕」`);
        await era.printAndWait(`「嘁、嘁啊…没有感觉啊！」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 3;
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈…放过我吧…这样一点儿也…咕！」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (chara(target).kojo.舔阴 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}发出闷声闷气的悲鸣………`);
      } else if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(
          `「这样好肮脏！不、不行！臭死了！你这个变态！」`,
        );
        await era.printAndWait(`「还、还在那里…谁…咿」`);
      } else {
        await era.printAndWait(
          `「呀！把、把嘴放在那种地方什么的…一定是变态吧！？」`,
        );
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      chara(target).kojo.舔阴 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}被${assi_name}那样的对待………`);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊${heart(1)} 真是的…长长的舌头…伸到最里面…好棒啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}自己分开双腿接受舔舐………`);
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…是的…更多的…请你玩弄…主人的…好爽…${heart(1)}」`,
        );
        await era.printAndWait(`「咿！主人啊！主人啊！」`);
        await era.printAndWait(`${target_name}兴高采烈的享受着你的爱抚………`);
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊！更…多的爱抚我吧……」`);
        await era.printAndWait(`「用长长的舌头…伸到最深处…咿」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 3;
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「切…感觉好难受…快点…走开啊！」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 2) {
    if (chara(target).kojo.肛门爱抚 === 0) {
      await era.printAndWait(`「啊啊啊！那、那里是…停、停下…天啊！」`);
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      chara(target).kojo.肛门爱抚 = 1;
      return 0;
    } else {
      const P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0);

      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊${heart(1)} 肛门…去了啊${heart(1)}好棒哦${heart(1)}啊啊啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「手指插进去了…好棒啊啊…肛门不行了啊…要疯了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}输给了肛门的快感发出了可耻的娇声………`,
        );
        // CFLAG:303  = 9（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊！真是的！${heart(1)} 嗯啊啊…手指…插到最深处了${heart(1)}」`,
        );
        await era.printAndWait(
          `「玩弄肛门吧…玩弄${sc()}淫乱的肛门吧 ${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被肛门的快感刺激发出了娇滴滴的声音………`,
        );
        // CFLAG:303  = 8（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        P < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊哼…还没…还没瑞润滑…我要去了…啊啊${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}发出了欲求不满的声音………`);
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀啊！？哈…肛门…更加粗暴的玩弄吧${heart(1)}」`,
        );
        await era.printAndWait(`「${sc()}哈…是肛门被玩弄就会高潮的变态啊………」`);
        await era.printAndWait(
          `「还要更多…请更加粗暴的玩弄那里吧…${heart(1)}」`,
        );
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈呜…肛门…手指查进里面了…好…好奇怪的感觉…${heart(1)}」`,
        );
        await era.printAndWait(`「更多…咕叽咕叽…玩…玩弄那吧！」`);
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咕…咕叽…这样…插进…屁股…变的奇怪起来了…咕呜」`,
        );
        await era.printAndWait(`「主人…还要更多…温柔点…咕叽${heart(1)}」`);
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咿！屁股…明明不舒服…手指进去了…呀！？」`);
        await era.printAndWait(`「啊！切、这是不对的…没什么感觉…啊啊啊！」`);
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 3;
      } else if (chara(target).kojo.肛门爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「好难受啊…快拔出来…求你了!…」`);
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 3) {
    if (chara(target).kojo.自慰 === 0) {
      await era.printAndWait(
        `「怎么这样…${sc()}这种事…这种事情不可以啊…呜啊、看、看吧！」`,
      );
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      chara(target).kojo.自慰 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${target_name}害羞地红着脸同时在${assi_name}和${master_name}的面前自慰着………`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…${sc()}污秽的身体是被主人调教成这样了…${heart(1)}」`,
        );
        await era.printAndWait(
          `「只有这里…只有这里…我还是处女就这样下去不行啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `「哎呀…${sc()}的处女…被糟蹋了…啊啊啊啊啊啊！」`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呼呜…啊啊啊…${sc()}的样子被看到了${heart(1)}」`,
          );
          await era.printAndWait(
            `「这些全部都是…为了让主人高兴才去学习的哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「乳房也是…肛门也是…小穴…也是…咿…啊啊啊…不行了…自慰真的好棒啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊真是的…即使不被命令…自慰的话一整天继续都可以哟${heart(1)}」`,
          );
          await era.printAndWait(
            `「是啊…一直这样自慰我喜欢好棒啊…${heart(1)}」`,
          );
          await era.printAndWait(`「呼呜…摩擦摩擦…摩擦小穴呜啊${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「啊呀啊真是的${heart(1)} 小穴的自慰停不下来啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「我已经…停不下来了马上高潮了…主人看吧看吧…看着我自慰到高潮吧！」`,
          );
          await era.printAndWait(`${target_name}一边弓着背还一继续边手淫………`);
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「我一直在自慰呢…太舒服了…你看啊…请你看看我现在的样子吧${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}单膝立起两腿大张。`);
          await era.printAndWait(
            `「求主人快来玩弄我吧…好棒啊…啊${heart(1)}…快来狠狠的虐待我吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「就是这样啊…手指停不下来了…呦啊${heart(1)} 淫水全流出来了${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}用双手安慰着自己………`);
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…主人…主人…还要更多…仔细的看…${sc()}的小穴自慰${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}如此美丽的处女膜…随时能奉献给主人呢…${heart(1)}」`,
        );
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「主人…请看…${sc()}的小穴…」`);
          await era.printAndWait(
            `「啊啊啊…主人看见了…手指停不下来了…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「被命令小穴自慰呢…好舒服啊${heart(1)}」`);
          await era.printAndWait(`「啊啊啊啊…小穴变的奇怪了！」`);
        } else {
          await era.printAndWait(`「啊爱啊…手指停不下来了…舒服的不行啊…」`);
          await era.printAndWait(
            `「${sc()}…已经不行了啊…啊啊啊…看吧小穴自慰更多的看吧${heart(1)}」`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (chara(target).kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「主人啊…好好看哦、${sc()}的小穴自慰${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「自己的手指这么舒服的什么啊…主人啊…请看着我舒服的地方吧${heart(1)}」`,
          );
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (chara(target).kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「被命令…这样做…我感觉很舒服…♪」`);
        } else {
          await era.printAndWait(`「啊啊…更多的看吧…更多的…快感啊♪」`);
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 3;
      } else if (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「咕…啊…啊…好屈辱啊…不会做这种事的…不要…咕呜♪」`,
          );
        } else {
          await era.printAndWait(`「哈…哈…更多手指…不会动的…？」`);
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (chara(target).kojo.胸爱抚 === 0) {
      if (
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait(
            `${target_name}在被${assi_name}吸着乳汁的时候发出了悲鸣。`,
          );
          await era.printAndWait(
            `「啊啊啊啊不要啊！不、不行啦…这样的…啊啊啊啊啊！」`,
          );
        } else if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(
            `「啊、真是的${heart(1)} 这…好棒啊…！ 更多的吸吧！主人啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊啊啊…这样的我…这样的乳汁…呀啊！」`);
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait(`${target_name}被${assi_name}不停地玩弄着………`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「呜啊…没、没关系…更加粗暴也可以哦…主人…♪」`);
        } else {
          await era.printAndWait(`「哈…啊、好难受啊…快点把手拿开啊！」`);
        }
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      chara(target).kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait(
            `${target_name}在被${assi_name}吸着乳汁的时候发出了悲鸣。`,
          );
          await era.printAndWait(
            `「啊啊啊呀啊！不、不行啦…这样的…啊啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${assi_name}一副陶醉的样子把口中的乳汁全喝了下去………`,
          );
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊哈哈…像射精一样全部喷进主人嘴里了哦${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「呼呼啊哈…${sc()}的大咪咪…更用力的挤吧${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「这样用嘴含着乳头…乳汁…喝吧…喝吧…主人啊${heart(1)}」」`,
          );
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啊啊${heart(1)} 这真是…太棒了…！ 更多的吸吮吧！主人啊${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「啊啊啊…${sc()}的大咪咪被挤着…更多的喝乳汁吧${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「这样的我…听见被吸得声音就勃起了…啊啊啊…${scf()}、${sc()}…十分感激啊${heart(1)}」`,
          );
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「啊啊啊…乳汁被吸出来…好舒服啊…！」`);
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 3;
        } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「啊啊啊…这样的我…乳汁如此…呀啊！」`);
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 2;
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait(
            `${target_name}被${assi_name}揉着乳房、发出了羞耻的声音………`,
          );
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊哈…胸部被摸的好舒服啊…嗯哼…啊啊啊${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「啊哈啊${heart(1)} ${sc()}这么大的乳房…就是为了被玩才存在的啊${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「是的…更多…它的大小${heart(1)}…被玩弄乳房什么的最喜欢了啊～${heart(1)}」`,
          );
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「噢…${sc()}骄傲的乳房…还想被您更多的爱抚…${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「是、是啊…大咪咪…是为了能被主人玩弄才长这么大的${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「啊啊啊…好喜欢被主人摸乳房啊…${sc()}非常有感觉哦…♪」`,
          );
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 4;
        } else if (
          era.get(`abl:${target}:1`) >= 3 &&
          (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「哈啊…乳房…感觉…这么棒…明明只是被玩弄而已…」`,
          );
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 3;
        } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呀…呀…不要再玩弄弄了…呜啊」`);
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          chara(target).kojo.胸爱抚 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if (chara(target).kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${target_name}因为被${player_name}夺走了初吻而流下了眼泪………`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        await era.printAndWait(
          `「啾…啾…呼…啊啊啊…接吻是这么舒服呢…${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊啊…早就想和主人这样的接吻了呢…………」`);
        await era.printAndWait(
          `「………哈…说起来接吻这东西还是第一次哦…还要更多的品味哦${heart(1)} 嗯…嗯嗯…${heart(1)}」`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        await era.printAndWait(
          `「嘛啾…啾…啾噗…咕啊…没想到魔王大人…主人会是第一次的对象呢…好想一直这样下去${heart(1)}」`,
        );
        await era.printAndWait(
          `「哈…再来一次吧…哈啊…嗯…啾…啾…嗯嗯…哈哦………${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}深深的叹了口气………`);
      } else {
        await era.printAndWait(`「嗯…嗯嗯…这样的…讨厌…哎呀…」`);
        await era.printAndWait(
          `坚强的${target_name}也因为太耻辱而流下了眼泪………`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else if (chara(target).kojo.接吻 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `被${master_name}看着接吻${target_name}很害羞的转过了脸………`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啾…啾…呼…啊啊啊…亲吻这么舒服呢啊…${heart(1)}」`,
        );
        await era.printAndWait(`「粘糊糊的都要溶化…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「嘛…啾…啾…啊哈…和主人接吻了啊…真是太幸福了…${heart(1)}」`,
        );
        await era.printAndWait(`「更多…还要更多…♪」`);
      } else {
        await era.printAndWait(`「嗯咕…嗯…不行了…这里是…饶了我吧…」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `等${target_name}意识到自己陶醉的样子被${master_name}看到了的时候正在和${player_name}接吻。`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯…呼…啾…啾…嗯哦…嗯呼${heart(1)}」`);
        await era.printAndWait(
          `${target_name}热情的把嘴唇重合了过来。粘糊糊的舌头侵入了嘴里。`,
        );
        await era.printAndWait(
          `「嘛啾…啾啊${heart(1)}………啊啊啊啊…不、不行了…腰要断了…还想要更多的吻………」`,
        );
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嘛啾…啾…唔呼呼…更多…更多的吻…主人啊♪」`);
        await era.printAndWait(`「${sc()}…对接吻上瘾了呢…${heart(1)}」`);
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「是的…更多的吻我也不介意………」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 3;
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈呜…啊、啊哈…嗯！？嗯…噗…呜啊啊…」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 7) {
    if (chara(target).kojo.自己扒开 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${target_name}小穴的最里面被两人仔仔细细的看了个遍………`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈…主人的小鸡鸡…我就裂开了啊…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人啊…啊啊、最里面都被看到了…被看到了啦…」`);
      } else {
        await era.printAndWait(`「嗯嗯…到里面去了…看什么啊…」`);
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      chara(target).kojo.自己扒开 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${target_name}小穴的最里面被两人仔仔细细的看了个遍………`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…感觉来了喽${heart(1)}」`);
        await era.printAndWait(
          `「这里的最里面…好想要小鸡鸡啊…吇咕吇咕的插进最里面…小鸡鸡插的满满的我还想要更舒服的啊${heart(1)}」`,
        );
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(
            `「虽然还是处女小穴…也肯定很舒服啊…${heart(1)}」」`,
          );
        }
        if (era.get(`talent:${target}:0`) === 1) {
          await era.printAndWait(`${target_name}很不爽的张开了自己的小穴………`);
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人啊…请多看一些…${sc()}的小穴…每天都有好好地保养哟？」`,
        );
        await era.printAndWait(
          `「你看…特别是这个小豆豆这里哦…经常打理着哦…是非常敏感的说♪」`,
        );
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (chara(target).kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哈…更多…到最里面…看进去啊♪」`);
        await era.printAndWait(
          `「到小穴的最里面为止…被看到了…啊啊、被视线侵犯喽♪」`,
        );
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 3;
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…想看这里什么的…变态…变态啊！」`);
        await era.printAndWait(
          `「这样…只是张开了…感觉什么的…完全没有…啊啊啊！」`,
        );
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 8) {
    if (chara(target).kojo.插入手指 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「咕哼呜啊啊…${heart(1)} 最里面…请不要客气啦${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊啊…更多的蹂躏我吧…${heart(1)}」`);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait(
          `「主人的手指…这样进来了啊…哈…更多…更多的插入啊哦♪」`,
        );
      } else {
        await era.printAndWait(`「啊呜…好、好痛…求你温柔点啊」`);
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      chara(target).kojo.插入手指 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哼…手指插到最里面了…呜咻啊…${heart(1)}」`);
        await era.printAndWait(
          `「啊啊啊…请更多的玩弄我淫乱的小穴吧${heart(1)}」`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…手指…这样进去了…哈…好开心的说♪」`);
        await era.printAndWait(`「更多${sc()}的小穴…请用你的手指随便玩弄吧♪」`);
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊咕…手指…深深地进去了…啊啊啊…变的奇怪起来了…」`,
        );
        await era.printAndWait(
          `${target_name}配合着手指的动作淫猥的舞动起来………`,
        );
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 3;
      } else if (chara(target).kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜呼…呜…手指…如果这么激烈的话…啊啊啊！」`);
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (chara(target).kojo.舔肛 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈啊${heart(1)} 嗯…嗯哈啊…更多的舔吧${heart(1)} 淫乱的肛门还想被更多的舔啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人…被舔了那里…好羞耻…啊啊嗯！」`);
      } else {
        await era.printAndWait(
          `「呜啊…那种地方…不、不要舔啊…再舔的话不行了啊！」`,
        );
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      chara(target).kojo.舔肛 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.舔肛 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呀呼嗯嗯${heart(1)} 啊呀啊…啊啊啊啊…咕嗯」`);
        await era.printAndWait(`「啊啊啊…肛门被舔了…咿啊啊啊…腰要融化了呜…」`);
        await era.printAndWait(`「舔啊…更多…被舔的奇怪起来了${heart(1)}」`);
        await era.printAndWait(`${target_name}被舔着肛门发出了娇滴滴的声音………`);
        // CFLAG:310  = 7（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嘛啊…啊啊啊…哈…咕嗯嗯${heart(1)} 舌头进到最里面了啊…嘛啊啊嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `「更加舒服了…${heart(1)} 还要更多色情的事…${sc()}的淫乱肛门还想要更多	！」`,
        );
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈…更多的舔${heart(1)}」`);
        await era.printAndWait(`「到肛门的最里面为止…喜欢上了啊…」`);
        await era.printAndWait(`「好棒哦…就这样吃掉也没关系啊…♪」`);
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咿嗯…这样…被舔肛门…这么舒服呐…」`);
        await era.printAndWait(
          `「呀哈啊…咿呀啊…～舌头伸进最里面了啊${heart(1)}」`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…肛门被舐了…这样的感觉…好奇怪哦…啊！」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 3;
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「啊啊啊…明明只有不舒服…明明只是被舐…这种…哇…」`,
        );
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 10) {
    if (chara(target).kojo.振动宝石 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「呃哈…这么舒服的道具还有什么吗…${heart(1)}」`);
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait(
          `「那、那个是什么啊…魔族的魔法道具么…？呀还在不停的振动呢…啊啊啊啊！」`,
        );
      } else {
        await era.printAndWait(
          `「哇…那、那样的魔族道具但是${sc()}又能怎么样呢…呀嗯」`,
        );
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      chara(target).kojo.振动宝石 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咿啊…啊啊啊…啊啊啊…嗯…请更多的疼爱我吧…黏糊糊的淫水都流出来了啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被阴蒂的强烈刺激弄的发出了大声的娇吟………`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯…嗯啊…啊嗯…主人…${sc()}不要紧…还要更多…咕嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}受到阴蒂的振动快乐的提高了声音………`,
        );
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咿啊啊…如果被这样…${sc()}…咿嗯♪」`);
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 3;
      } else if (chara(target).kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不、不行了…这样好讨厌…不要再振动了…咿」`);
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    if (chara(target).kojo.壶虫 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait(`${target_name}发出了难受的的叹息………`);
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊啊…主、主人啊…请好好的看呐…${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}的小穴就要变成主人的专用小穴了…啊…啊啊啊…嗯咿${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}感受到破处的痛苦弯下了身子………`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「主人好坏啊…这样就要…${sc()}最重要的处女…哈啊嗯！」`,
          );
          await era.printAndWait(`${target_name}忍受着破处的痛苦…………`);
        } else {
          await era.printAndWait(`「就这样剥夺了${sc()}的处女………」`);
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait(`${target_name}对异物感皱起了眉头………`);
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊${heart(1)} 蠕虫到最里面了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `「呃哈…啊啊啊…在里面乱动…呀啊嗯${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊…好厉害…进到最里面了…主人啊…${sc()}变的奇怪了呜…」`,
          );
        } else {
          await era.printAndWait(`「啊啊啊…不行了、不要那么粗暴啊！」`);
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      chara(target).kojo.壶虫 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${player_name}露出了嗜虐的笑容同时一直把蠕虫插到${target_name}小穴的最里面为止………`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀嗯${heart(1)}…啊啊啊…到最里面了我要去了啦${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}因为小穴最里面被蠕虫蹂躏而愉悦的颤动着………`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼啊啊…明明不是主人的小鸡鸡…感觉到了…虽然不好意思但是可以来吧…」`,
        );
        await era.printAndWait(`${target_name}很有快感诱惑的扭着腰………`);
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊啊…腰…自己动了…感觉来了啊…♪」`);
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 3;
      } else if (chara(target).kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呼、太粗了…太粗了…不行啊…」`);
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 11 &&
    era.get(`tequip:${target}:11`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呀啊…啊啊…明明想要放进去更多的………」`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊啊…好象掉了啊…♪」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 2;
    } else if (chara(target).kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈啊…哈…哈…哈…」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 12) {
    if (chara(target).kojo.振动杖 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「咿…振动…咿呀嗯…嗯嗯呼${heart(1)}…啊啊啊…不行…不行了…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「哈…这是很棒的魔族道具呢♪…啊嗯…这次是振动…呀嗯嗯！？」`,
        );
      } else {
        await era.printAndWait(`「这、这是什么…即使被这样…啊哈啊啊！？」`);
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      chara(target).kojo.振动杖 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咿呼呜…振动…太强烈了${heart(1)}…咿呀啊啊啊呜哇咿啊啊啊${heart(1)}」`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯…啊啊哈…咿啊啊啊！…好啊…更用力的按上来吧…主人啊…♪」`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈呜…嗯…嗯啊啊…魔王大人啊…魔王大人啊…♪」`);
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 3;
      } else if (chara(target).kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呀…哇…这样的事…完全无所谓…啊啊啊♪」`);
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    if (chara(target).kojo.肛门虫 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「呜哇啊…不行了不行了…肛门变的奇怪了${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「咿…肛门…全部…进来了…啊啊啊…好难受…不过可以忍受…」`,
        );
      } else {
        await era.printAndWait(`「讨厌啊好恶心呀	…！」`);
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      chara(target).kojo.肛门虫 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛门虫 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哦哦…肛门好舒服好舒服啊…${heart(1)} 啊哈…${sc()}的肛门小穴${heart(1)}」`,
        );
        await era.printAndWait(
          `「好、好棒啊…${sc()}的淫乱肛门被蠕虫弄的有感觉了…${sc()}是变态的肛交狂啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}感到肛门强烈的快感、一边流着口水一边提高了愉悦的声音………`,
        );
        // CFLAG:314  = 9（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊${heart(1)} 不行了…又要疯了…啊啊啊${heart(1)} 不能再侍奉主人了${heart(1)}」」`,
        );
        await era.printAndWait(
          `「已、已经松弛了…松弛呃啊…肛门要坏了呀${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在肛门蠕虫每次动作的时候都会发出“咿”“啊”之类的声音………`,
        );
        // CFLAG:314  = 8（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯呀啊…啊啊啊…肛门很怪异快感…咿噶…呃…呼啊…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}对肛门蠕虫的动作非常敏感………`);
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀嗯嗯！？哈…蠕虫来吧…更多的在肛门里啾啾的弄吧${heart(1)}」`,
        );
        await era.printAndWait(
          `「${sc()}是那种被触手玩弄肛门都有感觉的超级变态………♪」`,
        );
        await era.printAndWait(`「主人啊…♪${sc()}的好色肛门…看到了么？」`);
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯…嗯啊咿…哈肛门…有感觉了…主人啊…肛门…怪怪的…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}每次肛门蠕虫活动都会发出声音………`);
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…肛门…变的怪怪的…救救我…啊啊嗯♪」`);
        await era.printAndWait(`${target_name}对肛门蠕虫的动作非常敏感………`);
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…哈啊…啊嗯…不、不对…肛门有感觉什么的…啊啊啊♪」`,
        );
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 3;
      } else if (chara(target).kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊…肛门啊…慢慢的…变的奇怪了…」`);
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 13 &&
    era.get(`tequip:${target}:13`) === 0
  ) {
    if (
      era.get(`talent:${target}:77`) === 1 &&
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哎呀啊嗯…更多…更多的钻进肛门吧………」`);
      // CFLAG:374  = 6（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 6;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「咿啊咿…肛门扩张了啊…${heart(1)}」`);
      // CFLAG:374  = 5（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 5;
    } else if (
      era.get(`talent:${target}:77`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊…肛门还要更多…还不许拔出啊………」`);
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…肛门…就这么张开着………」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊嗯♪…咿…咿…哈啊…肛门…怪怪的感觉…」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 2;
    } else if (chara(target).kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「咕…哈…哈…哈…」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    if (chara(target).kojo.阴蒂夹 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊啊…用玩具更多的玩弄我吧…呼…夹子好强力啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人…${sc()}…不要紧…不用客气的玩弄我吧…嗯啊啊♪」`,
        );
      } else {
        await era.printAndWait(`「呀…不行了…这样夹在那里…啊啊啊啊啊！」`);
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      chara(target).kojo.阴蒂夹 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…夹子好强力啊…没办法侍奉了啊…还想要更激烈的${heart(1)}」`,
        );
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…嗯…好厉害…已经麻了…变的奇怪了…${heart(1)}」`,
        );
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 3;
      } else if (chara(target).kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊呜…哇…快点…取下啊…求你了…」`);
        // CFLAG:315  = 2（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 14 &&
    era.get(`tequip:${target}:14`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊啊…真的太舒服了…${heart(1)}」`);
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…真是太舒服了我还要更多♪」`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 2;
    } else if (chara(target).kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…讨厌…还麻着呢………」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    if (chara(target).kojo.乳头夹 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嘛啊啊啊…乳头…啊啊啊…好舒服啊${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人啊…这样…颤动…乳头啊…啊啊啊！」`);
      } else {
        await era.printAndWait(
          `「那、那样的东西给${sc()}装上…呀！？麻、麻掉了！？」`,
        );
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      chara(target).kojo.乳头夹 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…乳头已经麻了…那里变的舒服了${heart(1)}」`,
        );
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…乳头已经麻了…好舒服♪」`);
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 3;
      } else if (chara(target).kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…乳头麻了啊…不行了…求你拿下来吧！」`);
        // CFLAG:316  = 2（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 15 &&
    era.get(`tequip:${target}:15`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈啊…乳房似乎有感觉了…${heart(1)}」`);
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊…乳头已经变成这样了…${heart(1)}」`);
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 2;
    } else if (chara(target).kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊啊…乳头…麻了…都肿起来了………」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    if (chara(target).kojo.榨乳器 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊嗯…乳汁出来了…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「咿啊啊啊…嗯…不行了…这乳汁是宝宝的东西…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「嗯…这、这要怎么收集……？」`);
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      chara(target).kojo.榨乳器 = 1;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哎嘿嘿…乳房不要挤啊…这样有感觉了…${heart(1)}」`,
        );
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        chara(target).kojo.榨乳器 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊嗯…乳房不要挤啊…啊啊啊…啊…哈啊嗯${heart(1)}」`,
        );
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        chara(target).kojo.榨乳器 = 3;
      } else if (chara(target).kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…哎呀…这、这样的………」`);
        // CFLAG:317  = 2（变量语义：CFLAG 族，317）
        chara(target).kojo.榨乳器 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 16 &&
    era.get(`tequip:${target}:16`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…要取多少乳汁？」`);
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      chara(target).kojo.榨乳器着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯咿嗯…哇…那样就完成榨乳了啊…${heart(1)}」`);
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      chara(target).kojo.榨乳器着脱 = 2;
    } else if (chara(target).kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「嗯啊啊啊…已、已经…乳房不行了啊………」`);
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      chara(target).kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    if (chara(target).kojo.肛珠 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊嗯…那些珠子…全部都放进来了…啊啊啊嗯${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊啊…真是好厉害的淫具啊…好哟…请按你喜欢的做吧…主人啊」`,
        );
      } else {
        await era.printAndWait(
          `「呀、什么！？这是什么啊！？难道…${sc()}的屁股里…讨厌啊啊啊！」`,
        );
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      chara(target).kojo.肛珠 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜哇咿…啊啊嗯…再放进去点…更多的放进${sc()}的淫乱肛门里吧${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊…淫乱的肛门…什么都没有会坐立不安的啦…${heart(1)}」`,
        );
        await era.printAndWait(
          `「呼…已经全部放进去了♪…肛门串珠在${sc()}肚子里侵犯直到不行了为止${heart(1)}」`,
        );
        // CFLAG:320  = 8（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…嗯…肚子里装满了…珠子…嗯咿在里面嘎吱嘎吱的${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊${heart(1)} 不行了…不行了啊呜…${heart(1)}」`,
        );
        // CFLAG:320  = 8（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…屁股…里面满满的全是珠子…好棒好棒啊${heart(1)}」`,
        );
        await era.printAndWait(`「呼…没办法继续侍奉了啦…${heart(1)}」`);
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊1颗珠子2颗珠子3颗珠子…哈…嗯…全部放进${sc()}的淫乱肛门了啊♪」`,
        );
        await era.printAndWait(
          `「已经被做了这种事…${sc()}的淫乱肛门一点事都没有的啊？」`,
        );
        await era.printAndWait(`「主人啊…更多…请更多的欺负${sc()}的肛门吧♪」`);
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊嗯…啊啊啊…好厉害…全部都放进来了啊…${sc()}的屁股好厉害哟…${heart(1)}」`,
        );
        await era.printAndWait(`「主人啊…${sc()}的屁股变的更加厉害了啊♪」`);
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「全部放进屁股小穴里了…啊啊、肚子很奇怪的感觉、主人………」`,
        );
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯咿…屁股…屁股变的奇怪了！明明被做这样的事…舒服……」`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 3;
      } else if (chara(target).kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…好难受啊…求你了…快拔出来吧…啊啊啊」`);
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 19 &&
    era.get(`tequip:${target}:19`) === 0
  ) {
    if (
      era.get(`talent:${target}:77`) === 1 &&
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛珠着脱 < 6 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呀呼嗯嗯…不行了不行了…脑子里一片空白………${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}的肛门似乎很想要的样子不停的收缩………`,
      );
      // CFLAG:379  = 6（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 6;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛珠着脱 < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「咿噶…哈啊啊…肛门会啊…不行了给我吧………${heart(1)}」`,
      );
      // CFLAG:379  = 5（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 5;
    } else if (
      era.get(`talent:${target}:77`) === 1 &&
      (chara(target).kojo.肛珠着脱 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呀嗯嗯嗯♪啊啊…对不起…${sc()}已经…不被玩弄肛门…就活不下去了………」`,
      );
      await era.printAndWait(
        `${target_name}的肛门似乎很想要的样子不停的收缩………`,
      );
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈呜嗯…突然拔出什么的好过分啊…」`);
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊啊…啊嗯…还没…明明没问题的…」`);
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 2;
    } else if (chara(target).kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…啊啊…屁股小穴…变的奇怪了………」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 20) {
    if (chara(target).kojo.正常位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${master_name}命令${target_name}就这样大张开腿………`,
            );
            await era.printAndWait(
              `「啊啊啊…主人啊…好想看一看${sc()}破处的场景啊…不错啊…不过、认真看吧♪」`,
            );
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              await era.printAndWait(
                `${assi_name}毫不客气地揉着${target_name}的大咪咪………`,
              );
            }
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              await era.printAndWait(
                `「呼啊啊啊…啊…不要…好像真的好痛哟${heart(1)}」`,
              );
            }
            await era.printAndWait(
              `${assi_name}露出嗜虐的笑容没有顾虑的挺着腰、把小鸡鸡一口气插进了最里面………`,
            );
            await era.printAndWait(
              `「咿…咿啊啊啊…啊啊嗯！哇…嗯嗯…啊啊啊啊…被看到喽…主人看到喽${heart(1)}」`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊哈${heart(1)}…啊啊啊啊…哦、插到最里面了…咿…嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊啊…好高兴…这已经变成魔族的小穴…奉献给主人使用的了啊………♪」`,
            );
            await era.printAndWait(`${target_name}充满爱意地和你握住了双手………`);
            await era.printAndWait(
              `「嗯啊啊啊…啊哈${heart(1)}…小穴能侍奉主人的小鸡鸡好高兴啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊啊…更多更多…${sc()}好舒服啊${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「啊嗯${heart(1)}…已经…明明想早点失去贞洁的…等不及了${heart(1)}」`,
            );
            await era.printAndWait(`「咕…只、只不过有一点痛…啊…啊嗯！」`);
            await era.printAndWait(
              `${target_name}忍耐着那点痛苦、让四肢抱着你………`,
            );
            await era.printAndWait(
              `「啊啊啊…小穴终于能开始这样侍奉主人了呢…${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${master_name}命令${target_name}就这样大张开腿………`,
            );
            await era.printAndWait(
              `「如果是主人的命令…忍住…我会忍住的…不、不过…不、不要看…啊啊啊」`,
            );
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              await era.printAndWait(
                `${assi_name}毫不客气地揉着${target_name}的大咪咪………`,
              );
            }
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              await era.printAndWait(`「咕嗯！啊…啊哈啊！不要那样揉啊」`);
            }
            await era.printAndWait(
              `${assi_name}就那样被${target_name}的说法勾起了嗜虐之心、小鸡鸡强行插进了最里面………`,
            );
            await era.printAndWait(
              `「咕啊啊啊！咿呼咿嗯…去了去了…不、不要看…不要看哎咿啊啊啊！」`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊啊啊…呜噗、让${sc()}成为魔族真是万分感激啊…像这样…啊啊啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}感觉到被小鸡鸡插入而发出了声音、紧紧抱住了你。`,
            );
            await era.printAndWait(
              `「太棒了…像、像恋人那样…真诚的对待什么的…啊啊啊…好开心${heart(3)}」`,
            );
            await era.printAndWait(`${target_name}充满爱意的对你撒着娇………`);
            await era.printAndWait(
              `「不、不要紧…咿、啊啊啊…请…请按你喜欢的那样动吧…${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「哈呜…主人…把${sc()}重要的贞操交给你…真的非常开心…${heart(1)}」`,
            );
            await era.printAndWait(
              `「完、完全不会痛…可以按主人你的喜欢行动…啊嗯」`,
            );
            await era.printAndWait(
              `「完、完全不需要忍耐、咿嗯…啊…咕、那、我没有哭哦…啊啊！」`,
            );
            await era.printAndWait(
              `随着${master_name}轻轻往上顶${target_name}的泪水从眼角洒落下来。`,
            );
          }
        } else {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${master_name}命令${assi_name}就这样压住${target_name}、把小鸡鸡插进了秘裂中………`,
            );
            await era.printAndWait(
              `「呀…住手…你也是勇者的一员为什么要听那种家伙的命令啊…咿啊啊啊！」`,
            );
            await era.printAndWait(
              `${assi_name}听了${target_name}的话用鼻子发出了耻笑、毫不留情的蹂躏了贞操………`,
            );
            await era.printAndWait(
              `即便${target_name}如此的坚强、也在抽送疼痛与屈辱的刺激下禁不住号啕大哭。`,
            );
            await era.printAndWait(
              `「啊啊啊啊啊！哎呀哎呀！这种东西…咿咿…啊啊啊啊咿！！！」`,
            );
          } else {
            await era.printAndWait(
              `「哇…嗯…这、这一点也不疼…已、已经结束了吧………咿？还、还在动？」`,
            );
            await era.printAndWait(
              `即便${target_name}如此的坚强、也在抽送疼痛与屈辱的刺激下禁不住号啕大哭。`,
            );
            await era.printAndWait(
              `「啊啊啊啊啊！哎呀哎呀！这种东西…咿咿…啊啊啊啊咿！！！」`,
            );

            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「啊…啊啊啊…如果要是他的拥抱这样的话就好了…啊啊啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}一边回忆故乡的恋人一边被侵犯………`,
              );
            }
          }
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(`「啊…呀呀啊啊嗯${heart(1)}」`);
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              await era.printAndWait(
                `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
              );
              await era.printAndWait(
                `「呼啊啊啊…啊…不要…啊嗯…好痛哟${heart(1)}」`,
              );
            }
            await era.printAndWait(
              `直到${target_name}的小穴最里面都被蹂躏着、${assi_name}在${target_name}的耳边低声说道……`,
            );
            await era.printAndWait(
              `「是…是的…${sc()}…在主人面前…被侵犯…有感觉了…啊啊啊呜${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}一边露出又哭又笑的表情一边被${assi_name}侵犯着………`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `${assi_name}命令${target_name}就这样大张开腿………`,
            );
            await era.printAndWait(
              `「如果是主人的命令…忍住…我会忍住的…所以…不、不要看…啊啊啊」`,
            );
            if (
              era.get(`talent:${target}:110`) === 1 ||
              era.get(`talent:${target}:114`) === 1 ||
              era.get(`talent:${target}:119`) === 1
            ) {
              await era.printAndWait(
                `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
              );
              await era.printAndWait(`「咕嗯！不、不痛了…啊…啊啊啊！」`);
            }
            await era.printAndWait(`${assi_name}抿嘴一笑故意用腰使劲一捅………`);
            await era.printAndWait(
              `「咕啊啊啊${heart(1)} 咿咿嗯${heart(1)}…去了去了…不、不要看…不要看咿啊啊啊！」`,
            );
            await era.printAndWait(
              `「不行了啊…在主人面前…不行了啊${heart(1)}」`,
            );
          } else {
            await era.printAndWait(`「咕…咕…呜…咕！」`);
            await era.printAndWait(
              `${target_name}咬着牙、忍受着${assi_name}的凌辱。`,
            );
            await era.printAndWait(
              `${assi_name}露出嗜虐的微笑戏弄惩罚着${target_name}………`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…请让我用力的抱住吧${heart(1)} 一边用力的玩弄我吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}双手缠绕着${master_name}的身体………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「啊嗯…哈…主人能像这样…我就非常安心了…」`);
          await era.printAndWait(`${target_name}充满爱意的对你撒着娇………`);
        } else {
          await era.printAndWait(
            `「哈…快点…住手啊…即使被做这种事…${sc()}也…咕！」`,
          );
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      chara(target).kojo.正常位 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「咿咿嗯${heart(1)}…啊啊啊嗯${heart(1)}」`);
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
            );
            await era.printAndWait(
              `「呼啊啊啊…啊…不要…请更加温柔一点………${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `直到${target_name}的小穴最里面都被蹂躏着、${assi_name}在${target_name}的耳边低声说道………`,
          );
          await era.printAndWait(
            `「是…是的…${sc()}…在主人面前…被侵犯…有感觉了…啊啊啊呜${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边露出又哭又笑的表情一边被${assi_name}侵犯着………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊啊…这样…被插到最里面了…咕嗯${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `${assi_name}毫不客气的揉着${target_name}的大咪咪………`,
            );
            await era.printAndWait(`「咕嗯！不、不痛了…啊…啊啊啊！」`);
          }
          await era.printAndWait(`${assi_name}抿嘴一笑故意用腰使劲一捅………`);
          await era.printAndWait(
            `「咕啊啊啊${heart(1)} 咿咿嗯${heart(1)}…啊啊…主人啊…不、不要看…不要看咿啊啊啊！」`,
          );
          await era.printAndWait(`「不行了啊…在主人面前…不行了啊${heart(1)}」`);
        } else {
          await era.printAndWait(`「咕…咕…呜…咕！」`);
          await era.printAndWait(
            `${target_name}咬着牙、忍受着${assi_name}的凌辱。`,
          );
          await era.printAndWait(
            `${assi_name}露出嗜虐的微笑戏弄惩罚着${target_name}………`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊…是、是的…喜欢小穴被侵犯的瞬间${heart(1)}」`,
          );
          await era.printAndWait(
            `「那样牢牢的抱住…不会让你离开…直到厌倦为止…侵犯我吧${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}快乐的好想脑袋都要融化了………`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊…啊啊啊…嗯…啊啊啊…更多…张开双腿哈呀…到最里面…请侵犯到最里面吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}就像那句话的那样两条大腿张开到极限、接受了小鸡鸡。`,
          );
          await era.printAndWait(
            `「嗯咿${heart(1)}…不停的侵犯侵犯把小穴都玩坏吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊嗯${heart(1)}…啊啊啊…啊哈${heart(1)} 啊啊啊…小穴侍奉很棒吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…明明要认真侍奉的…${sc()}总是很舒服的…啊啊啊啊啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}给予的快乐开始提高甜蜜的声音………`,
          );
        }
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「嗯嗯…啊哈…${heart(1)} 到最里面喽${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被插到小穴最里面提高了甜蜜的声音。`,
          );
          await era.printAndWait(
            `「啊啊啊…${sc()}的小穴有更多的感觉…有感觉了啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…更多…小穴…侵犯吧…侵犯吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的两腿夹住了${player_name}的腰。`,
          );
          await era.printAndWait(
            `「嗯嗯…啊啊啊${heart(1)} 咿嗯啊啊啊…好…好棒…深深的插进去${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊嗯…嗯…主人啊…${sc()}的小穴…怎么样啊？」`);
          await era.printAndWait(
            `「啊嗯…啊…哈呜嗯嗯…${heart(1)}…可以更喜欢呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}的耳边发出甜蜜的声音………`,
          );
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咕…呼…啊啊…不行了…小穴好舒服…呜…忍不住了啊…」`,
        );
        await era.printAndWait(
          `${target_name}每次被${player_name}插到小穴最里面都会开始发出甜蜜的声音………`,
        );
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哇…这样的…${sc()}…忍耐一下的话…很快就结束了…嗯…啊…啊啊嗯♪」`,
        );
        await era.printAndWait(`${target_name}开始发出一点点甜蜜的声音………`);
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 3;
      } else if (chara(target).kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哇…呜…嗯…呜呼…嗯…咕嗯」`);
        await era.printAndWait(
          `${target_name}好像没有快感一样的拼命忍耐着不发出声音………`,
        );
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (chara(target).kojo.背后位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${target_name}被命令就这样四肢扒地、像${assi_name}自己的屁股一样高高的抬起献给了你。`,
            );
            await era.printAndWait(
              `「啊啊啊…同时被主人看见了${heart(1)}…母兽一样的姿势${heart(1)}…贞操要失去了${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊…快点…${assi_name}的小鸡鸡${heart(1)} 已经无法忍受了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}一边对这种说法苦笑、一边被${assi_name}不知污秽的蹂躏着秘裂………`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊啊啊…第一次献给主人了…以这样母兽一样的姿势${heart(1)}」`,
            );
            await era.printAndWait(
              `「对于卑贱淫乱的魔族${sc()}来说、是最相称的样子${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}就这样高兴的四肢爬着、一边喘着粗气一边高高的翘着屁股。`,
            );
            await era.printAndWait(
              `「嗯…啊啊啊…请、请吧${heart(1)} 充分的蹂躏${sc()}的整个小穴吧${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}抱住你的腰这样乞求、把小鸡鸡插进小穴彻底的蹂躏贞操………`,
            );
            await era.printAndWait(
              `「呼啊啊啊…啊啊啊…小鸡鸡${heart(1)}…到最里面${heart(1)}…啊啊啊…真的好厉害哦${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「啊啊嗯${heart(1)}…唔呼呼…从后面什么的…像母兽一样的被玷污了………」`,
            );
            await era.printAndWait(
              `「看起来…非常…羞耻…但是好舒服啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍耐着破瓜的痛苦说着俏皮话。`,
            );
            await era.printAndWait(
              `「嗯…哇…根、根本不痛、来吧…${sc()}处女的小穴里…请充分的让它受精吧…${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${target_name}被命令就这样四肢扒地、像${assi_name}自己的屁股一样高高的抬起献给了你。`,
            );
            await era.printAndWait(
              `「咕…咕呜………」${target_name}靠只剩一点点的自尊心咬着嘴唇竭力不发出声音。`,
            );
            await era.printAndWait(
              `${assi_name}就这样毫不客气耻笑一样的蹂躏${target_name}的贞操………`,
            );
            await era.printAndWait(`「咕…啊啊咿啊啊啊啊咿啊啊啊！！！！」`);
            await era.printAndWait(
              `看到${target_name}在屈辱和破瓜的痛苦中无法忍受的哭叫、${master_name}露出了愉悦的笑容………`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊啊嗯…${sc()}的屁股…那么有魅力？…啊嗯${heart(1)}…啊啊啊…那么温柔的抚摸…嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的屁股被温柔的舐着、少女发出了苦闷的呻吟。`,
            );
            await era.printAndWait(
              `「啊啊啊…总觉得变成魔族后的肌肤…很敏感…嗯…咿啊${heart(1)} 啊哈啊${heart(1)}」`,
            );
            await era.printAndWait(
              `「求、求你了…快点…侵犯…夺走${sc()}的贞操…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}忍耐不住了苦闷的提高了声音。抱住你的腰${target_name}乞求你把小鸡鸡插进小穴蹂躏贞操………`,
            );
            await era.printAndWait(
              `「咕啊…啊…咿…啊啊啊…到最里面来喽…${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「哈…${sc()}…像母兽一样被主人的手侵犯了…${heart(1)}」`,
            );
            await era.printAndWait(`「也好呢…主人的话…被做什么都可以呢…」`);
            await era.printAndWait(`「全部…全部接受了…啊…啊嗯${heart(1)}」`);
            await era.printAndWait(`${target_name}把贞操献给了你…………`);
          }
        } else {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${master_name}命令${assi_name}就这样从后面进入了${target_name}………`,
            );
            await era.printAndWait(
              `「咿…讨厌啊…停下啊！ 你为什么要做这种事你不也是勇者吗？」`,
            );
            await era.printAndWait(
              `${assi_name}对${target_name}指责的呼喊用鼻子嘲笑、毫不留情的蹂躏了贞操………`,
            );
            await era.printAndWait(
              `「啊啊啊啊啊！哎呀哎呀！这样母兽一样的姿势………咿…啊啊啊啊咿！！！」`,
            );
            await era.printAndWait(`${target_name}咬紧牙关忍耐着破瓜的疼痛………`);
          } else {
            await era.printAndWait(
              `「这样…母兽一样的姿势…讨厌…${sc()}明明是勇者！」`,
            );
            await era.printAndWait(`${target_name}咬紧牙关忍耐着破瓜的疼痛………`);

            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「啊…啊啊啊…这样的事要是把身体提前给那家伙就好了…嗯呜呜………」`,
              );
              await era.printAndWait(
                `${target_name}回想起故乡的恋人不禁流下了眼泪………`,
              );
            }
          }
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `${target_name}被${assi_name}从背后贯穿、发出了娇声。`,
            );
            await era.printAndWait(`「母狗的小穴…请更多的侵犯吧${heart(1)}」`);
            await era.printAndWait(`「想要主人H的地方有很多呢${heart(1)}」`);
            await era.printAndWait(
              `${assi_name}一边露出愕然的表情一边从后面侵犯${target_name}………`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `「讨厌…明明是…主人以外的人…竟然被…啊啊啊啊！」`,
            );
            await era.printAndWait(
              `${assi_name}抓住${target_name}的腰、从后面顶着………`,
            );
            await era.printAndWait(`「哟…饶了我…请绕了我吧…主人啊…！」`);
          } else {
            await era.printAndWait(
              `「哎呀…不要啊！这样的姿势什么的…咿呜嗯！」`,
            );
            await era.printAndWait(
              `${assi_name}紧紧抓住${target_name}的腰毫不留情的蹂躏着………`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊嗯…哇呜哇呜${heart(1)} ${sc()}是喜欢H的好色母狗…${heart(1)}」`,
          );
          await era.printAndWait(`「请充分的为我受精吧${heart(1)}」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「就这样被从后面…有感觉了…${heart(1)}」`);
          await era.printAndWait(
            `「真的…比起平时…${heart(1)} 有感觉呢…${sc()}果然是H的孩子啦…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊啊啊…这样…母兽一样…」`);
          await era.printAndWait(
            `${target_name}被从后面侵犯的同时懊悔的低下了头………`,
          );
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      chara(target).kojo.背后位 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}被${assi_name}从背后贯穿、发出了娇声。`,
          );
          await era.printAndWait(
            `「啊啊啊…更多的侵犯母狗的小穴吧${heart(1)} 在主人的面前更多的玩弄我吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出淫乱的声音让一旁看着的${master_name}大笑起来。`,
          );
          await era.printAndWait(
            `「最里面来了来了${heart(1)} 咿啊啊啊${heart(1)} 啊啊咿啊啊啊${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「讨厌…明明是…主人以外的人…竟然被…啊啊啊啊！」`,
          );
          await era.printAndWait(
            `${assi_name}抓住${target_name}的腰、从后面顶着………`,
          );
          await era.printAndWait(
            `「咿嗯啊啊啊啊呜${heart(1)} ${sc()}的小穴…主人的东西什么的${heart(1)}」`,
          );
          await era.printAndWait(`「有感觉了…不行…不行啦${heart(1)}」`);
          await era.printAndWait(
            `被${assi_name}细细的调戏着、${target_name}的口中已经发出了甜蜜的声音………`,
          );
        } else {
          await era.printAndWait(`「哎呀…不要啊！这样的姿势什么的…咿啊嗯！」`);
          await era.printAndWait(
            `${assi_name}紧紧抓住${target_name}的腰毫不留情的蹂躏着。`,
          );
          await era.printAndWait(
            `看见自己被${master_name}注意到了、${target_name}发出了哀求似的声音………`,
          );
          await era.printAndWait(`「求你了…不要看…啊啊啊…啊！」`);
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呀嗯嗯${heart(1)} 母狗${target_name}的淫乱小穴还要更多的被侵犯${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊哈${heart(1)}${sc()}是母狗…以这样的姿势被侵犯是最舒服的事的说${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边发出像狗一样的“哈哈”的喘息一边被侵犯………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯呀啊嗯…小穴被蹂躏了…四肢爬着…啊啊啊插到最里面了…${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯嗯${heart(1)} 被插到小穴最里面了…明明应该是痛苦的…那最棒的…好棒哇${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}双手紧握着承受着快感………`);
        } else {
          await era.printAndWait(
            `「啊啊啊啊啊${heart(1)} 大量受精了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}…${sc()}…就在这里要怀孕生小孩子哈呀啊…要怀孕了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `「呜啊哇${heart(1)} 因为${sc()}是母狗啊…10几20个…会生这么多啦${heart(1)}」`,
          );
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊嗯…哈呜…更多…请给我更多………${heart(1)}」`);
          await era.printAndWait(`「更多…${sc()}变成母兽了啊！」`);
          await era.printAndWait(`${target_name}每次被插都会提高娇声………`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊啊…好美妙…被主人从后面玩弄是最高的说${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}啊…是主人的”东西”…我能感觉到…啊啊啊嗯！」`,
          );
          await era.printAndWait(`${target_name}一副陶醉的表情接纳着小鸡鸡………`);
        } else {
          await era.printAndWait(
            `「啊啊…主人啊…更多…玩坏我吧…${sc()}被玩坏了啦！」`,
          );
          await era.printAndWait(
            `「呀哈${heart(1)} 屁股都舒服的通红了…继续侵犯我啊${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}流出了喜悦的泪水………`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咕…呜、咿、哈啊啊…小穴…太舒服了…什么都无法思考了………」`,
        );
        await era.printAndWait(`「被从后面…好舒服啊………」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不、不行了…已经不行了…被从后面…嗯…啊…哈啊嗯♪」`,
        );
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 3;
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「咕…嗯…嗯…咕…啊啊啊…嗯」`);
        await era.printAndWait(
          `${target_name}被从后面侵犯的同时懊悔的低下了头………`,
        );
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 22) {
    if (chara(target).kojo.对面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「哈…这个姿势好棒啊…可以由自己来破处呢…」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「这样姿势什么的…主人啊…好好的…请看吧…啊啊啊！」`,
          );
          await era.printAndWait(`${target_name}高兴的流下了眼泪、接受了你。`);
        } else {
          await era.printAndWait(`「哇…嗯嗯…过分…自己放进去什么的…啊啊啊！」`);
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `${target_name}一边和${assi_name}相互接吻一边用小穴的最里面接受着小鸡鸡。`,
            );
            await era.printAndWait(
              `「啊哈…嘛啊…咿呜嗯…更多…更多的侵犯我吧${heart(1)}…主人看啊我的那里满满的了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}妖艳的把视线转了过来、提高了喘息的声音………`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `${target_name}一边和${assi_name}接吻一边被侵犯着。`,
            );
            await era.printAndWait(
              `「啊…嗯…呀哎呀…主人这样的地方…明明不想被看到的…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `意识到被看见了的${target_name}提高了妖艳的声音………`,
            );
          } else {
            await era.printAndWait(
              `${target_name}被${assi_name}那样侵犯、发出了模糊不清的的悲鸣………`,
            );
            await era.printAndWait(`「哦咿…啊咿…住手…嗯…呜嗯…咿！」`);
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「主人啊…更加用力点啊…好好的做啊…${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「啊…嗯…咿…总觉得…有点不好意思…」`);
          await era.printAndWait(
            `「就像是…看、看起来像是情侣之间…啊嗯${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊啊啊…这样的…呀啊！从下往上顶不行啊！」`);
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      chara(target).kojo.对面座位 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}一边和${assi_name}相互接吻一边用小穴的最里面接受着小鸡鸡。`,
          );
          await era.printAndWait(
            `「啊哈…嘛啊…咿呜嗯…更多…更多的侵犯我吧${heart(1)}…主人看啊我的那里满满的了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}妖艳的把视线转了过来、提高了喘息的声音………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${target_name}一边和${assi_name}接吻一边被侵犯着。`,
          );
          await era.printAndWait(
            `「啊…嗯…呀哎呀…主人这样的地方…明明不想被看到的…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `意识到被看见了的${target_name}提高了妖艳的声音………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被${assi_name}那样侵犯、发出了模糊不清的的悲鸣…………`,
          );
          await era.printAndWait(`「哦咿…啊咿…住手…嗯…呜嗯…咿！」`);
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊…啊哈…有、有点难为情、噶、脸…请不要这么看…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…什、什么意思…那样…不、不要看…呀嗯…顶的话…啊啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的脸上满是沉浸在快乐中的表情………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈哈${heart(1)} 嗯…小鸡鸡到最里面了…进来了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯…啊啊啊${heart(1)}…充分的侍奉了啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…好舒服啊…请满满的射进来吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「哈…啊…啊啊啊嗯${heart(1)} 吇咕吇咕的声音呜嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…好羞耻${heart(1)}明明那么羞耻${heart(1)}…腰还是停不下来${heart(1)}」`,
          );
          await era.printAndWait(
            `「满满的射进来…射精吧…${sc()}的腰停下吧${heart(1)}」」`,
          );
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊嗯…啊哈呜…更多…请更用力吧…」`);
          await era.printAndWait(`「绝对…绝对不会分开…啊啊啊啊${heart(1)}」`);
          await era.printAndWait(`${target_name}用双手紧紧抱住了你………`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「这么做的话…简直就像恋人一样看见了吗…？」`);
          await era.printAndWait(`「如果是这样的话…好高兴啊${heart(1)}」`);
          await era.printAndWait(`${target_name}感受到${master_name}的嘴唇………`);
        } else {
          await era.printAndWait(`「主人啊…更多…${sc()}好舒服啊…啊啊啊啊！」`);
          await era.printAndWait(
            `「嗯…好厉害…直到最里面都连着…哈啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}为了贪图快乐得意洋洋的扭着腰………`,
          );
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯…啊啊啊啊…不行了…离不开魔王大人了…」`);
        await era.printAndWait(`「腰…离不开的…小穴不行了啊…」`);
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「明明被这样…离不开魔王大人…呃…啊啊啊」`);
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 3;
      } else if (chara(target).kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈…啊…啊啊啊…快点…想离开…明明…腰啊…」`);
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 23) {
    if (chara(target).kojo.背面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「主人啊…我这样坐着扭腰…好棒啊」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「主人啊…好好的…请抱紧我…啊啊啊！」`);
          await era.printAndWait(`${target_name}流下了高兴的眼泪、接纳了你。`);
        } else {
          await era.printAndWait(`「咿！从下面…不行哦！啊啊啊！」`);
          await era.printAndWait(`${target_name}由于破处的痛苦流下了眼泪…………`);
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `${target_name}被${assi_name}从后面高高的顶起而发出了声音。`,
            );
            await era.printAndWait(
              `「啊啊啊…更多…还要更多…${heart(1)} 乳房也被紧紧的抓住…啊啊啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `「主人啊…${assi_name}小姐会填满很多地方…看啊…请看啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}发出淫乱的声音、同时为了炫耀欢乐那样摇晃起了腰………`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `「啊…不行了…不要看…不要看啊主人…啊啊啊${heart(1)} 不、不要再欺负我了…${assi_name}………」`,
            );
            await era.printAndWait(
              `${target_name}被${assi_name}从后面这样抱着继续侵犯。`,
            );
            await era.printAndWait(
              `『给我好好的把腿张开吧』${assi_name}从后面轻轻的说出了命令而${target_name}服从了。`,
            );
            await era.printAndWait(`「啊啊…哎呀…被侵犯…有感觉了…${heart(1)}」`);
          } else {
            await era.printAndWait(
              `${target_name}被${assi_name}从后面顶到发出了痛苦的声音。`,
            );
            await era.printAndWait(
              `「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…啊哈…来玩弄${sc()}的乳房吧…小穴会紧紧的夹住的…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}乳房被摸的时候发出了喘息的声音………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「被主人从后面抱住了…一点都不觉得害怕…啊啊啊…呼♪」`,
          );
          await era.printAndWait(
            `${target_name}对你撒娇般的洋洋得意地扭起腰…………`,
          );
        } else {
          await era.printAndWait(
            `「总觉得…怪怪的感觉…嗯…这个样子…插得好深啊…」`,
          );
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      chara(target).kojo.背面座位 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}被${assi_name}从后面高高的顶起而发出了声音。`,
          );
          await era.printAndWait(
            `「啊啊啊…更多…还要更多…${heart(1)} 乳房也被紧紧的抓住…啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人啊…${assi_name}小姐会填满很多地方…看啊…请看啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出淫乱的声音、同时为了炫耀欢乐那样摇晃起了腰………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊…不行了…不要看…不要看啊主人…啊啊啊${heart(1)} 不、不要再欺负我了…${assi_name}………」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}从后面这样抱着继续侵犯。`,
          );
          await era.printAndWait(
            `『给我好好的把腿张开吧』${assi_name}从后面轻轻的说出了命令而${target_name}服从了。`,
          );
          await era.printAndWait(`「啊啊…哎呀…被侵犯…有感觉了…${heart(1)}」`);
        } else {
          await era.printAndWait(
            `${target_name}被${assi_name}从后面插进来、发出了好像很痛苦的声音。`,
          );
          await era.printAndWait(
            `「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊啊啊…从后面顶的好棒啊${heart(1)}」`);
          await era.printAndWait(
            `「嗯…啊啊啊啊${heart(1)} 好舒服啊…腿打开了呜嗯${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呜嗯…啊啊啊${heart(1)} 身体也…被摸了…被摸了…${heart(1)}」`,
          );
          await era.printAndWait(
            `「咿咿嗯…咿啊啊啊啊啊嗯${heart(1)} 啊啊啊嗯给我啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「主人啊…更多…扭动腰啊…舒服了很多啊…啊啊啊啊${heart(1)}」`,
          );
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈…啊啊啊…主人啊…请更多抚摸吧…更多…从小穴开始好了…」`,
          );
          await era.printAndWait(
            `「嗯嗯…那、那里很好的说…更多…请随意的玩弄………${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「就这样被从后面…像主人的玩具一样………」`);
          await era.printAndWait(`「非常非常的美妙…${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「主人啊…更多…还想要更多…求你了…再给我点${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}得意洋洋的淫秽的扭着腰…继续发出甜美的声音………`,
          );
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…呜啊咿…不、不行了…被插到最里面了…腰…停不下来了…」`,
        );
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈呜…被、被插到最里面了…哈…逃不了了啊…啊啊啊」`,
        );
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 3;
      } else if (chara(target).kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「咕…呼…咿、啊啊啊…讨厌啊…求你了…再原谅我一次………」`,
        );
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 26) {
    if (chara(target).kojo.正常位肛交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…在主人面前…肛门被侵犯了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、同时身体向后弯曲并发出娇吟。`,
          );
          await era.printAndWait(`「哈…啊…咕啾咕啾还要…更多…更多${heart(1)}」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「那里…不一样…啊啊啊…全部进来了…啊啊啊啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、同时身体向后弯曲并发出娇吟。`,
          );
          await era.printAndWait(
            `「有感觉了…明明那里不行的…啊…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「这种地方不要看啊…主人啊…啊啊嗯${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「不要再做了…那里是…咿咿咿！」`);
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门同时发出悲鸣………`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊…小鸡鸡在屁股小穴里顶什么的${heart(1)}」`,
        );
        await era.printAndWait(`「皱褶收紧了好想继续啊${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人啊…屁股小穴…好、好怕…」`);
        await era.printAndWait(`「但、但是…感受到主人的小鸡鸡了…呀呜嗯♪」`);
      } else {
        await era.printAndWait(
          `「啊、啊、不行了饶了我吧、那里是…不要…啊啊啊！」`,
        );
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      chara(target).kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          await era.printAndWait(
            `「咿…啊啊啊咿…感谢主人侵犯我的肛门啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「变态淫乱的肛交狂…${target_name}的屁股小穴请主人侵犯的满满的吧${heart(1)}」`,
          );
          await era.printAndWait(
            `「融化了呜嗯…脑袋里…全部融化了哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}沉溺于肛门被插得快乐、已经听不到${master_name}和${assi_name}的声音了吧………`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「啊啊啊…在主人面前…被侵犯肛门${heart(1)}」`);
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、喉咙里传来阵阵娇吟。`,
          );
          await era.printAndWait(`「咕啾咕啾还要…更多…更多${heart(1)}」`);
        } else if (era.get(`talent:${target}:77`) === 1) {
          await era.printAndWait(
            `「咿${heart(1)} 啊啊啊…肛门被侵犯了…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「脑袋里…一片空白了啊…啊嗯…求${assi_name}大人给我！更多的侵犯${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}抱住${assi_name}哀求起来………`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「那里…不一样…啊啊啊…全部进来了…啊啊啊啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、喉咙里传来阵阵娇吟。`,
          );
          await era.printAndWait(
            `「有感觉了…明明不行的…啊…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「这种地方不要看啊…主人啊…啊啊嗯${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「不行了…不行了…那里是…不行了啊！」`);
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门同时发出悲鸣………`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哇…咿啊…啊啊啊啊啊啊…${heart(1)} 咿…肛门好棒啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…已经…肛门好舒服啊…只是欺负肛门而已啊…嗯呀啊啊啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被肛门的强烈快感弄的脑海中都融化了………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈啊${heart(1)} 肛门被弄的吇咕吇咕的…咿咿${heart(1)}」`,
          );
          await era.printAndWait(
            `「脑袋里一片空白…除了快感什么也无法思考了…${heart(1)}」`,
          );
          await era.printAndWait(`「啊哦…哦…哈啊…咿…咿…啊啊啊啊咿～～！！！」`);
        } else {
          await era.printAndWait(
            `「讨厌啊…肛门被这么激烈的操弄…${sc()}、${sc()}要丢了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `「所、所以…温、温柔…咿！啊啊啊啊讨厌啦…明明说了的${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…不行了不行了不行了不行了…脑袋都融化了…已经…有肛门就够了…${heart(1)}」`,
          );
        }
        // CFLAG:327  = 9（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呀哈…肛门被侵犯好棒啊…更多${sc()}的淫乱肛门还要更多${heart(1)}」`,
          );
          await era.printAndWait(`「呼…啊啊啊…嘎吱嘎吱的张开了…${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「咿啊啊啊…啊哈嗯…${heart(1)} 肛门被插得融化了…${heart(1)}」`,
          );
          await era.printAndWait(`「感觉从腰部以下都全部融化了…${heart(1)}」`);
        }
        // CFLAG:327  = 8（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀哈…肛门被侵犯的好棒啊…更多${sc()}的淫乱肛门还要更多${heart(1)}」`,
        );
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊嗯…肛门被弄的吇咕吇咕的♪」`);
        await era.printAndWait(`「哈…${sc()}…最喜欢被主人插肛门了！」`);
        await era.printAndWait(
          `「肛门被主人的小鸡鸡侵犯…脑袋要发狂了嗯、粘糊糊的融化了啊！」`,
        );
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「嗯咿嗯…屁股小穴啊…褶皱呜哇…${heart(1)}」`);
          await era.printAndWait(`「褶皱里…好舒服…不行了啊」`);
        } else {
          await era.printAndWait(
            `「如果是主人的话…被侵犯屁股小穴也没关系呀…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊嗯…嗯…哈呜…啊啊…已经不行了…屁股小穴…融化了…」`,
          );
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜啊…啊…咿…屁股小穴…好舒服………」`);
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈嗯…啊啊啊…屁股小穴…被侵犯了…这样的感觉…好奇怪啊…」`,
        );
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 3;
      } else if (
        chara(target).kojo.正常位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(`「哇…嗯…啊…咿…哎呀…哎呀…」`);
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (chara(target).kojo.背后位肛交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…肛门被侵犯了${heart(1)} 在主人的面前被侵犯了…啊啊啊${heart(1)} 感觉到你的小鸡鸡了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}从后面贯穿了肛门、经常能听到${target_name}发出的娇吟。`,
          );
          await era.printAndWait(
            `「${target_name}是肛门有快感的淫乱母狗…请好好的看吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${assi_name}一边对${target_name}混乱凌乱的样子苦笑一边继续侵犯她的肛门………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「求求你…不要在欺负我了…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${assi_name}抱着正在哭泣的${target_name}的腰兴奋不已的继续侵犯肛门不断的抽插。`,
          );
          await era.printAndWait(
            `「呀啊啊啊…啊啊啊…讨、讨厌啊…主人啊…不要看…不要看啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被肛门陵辱的快感弄的慢慢开始发出喘息的声音………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被${assi_name}从背后摁住就这样侵犯着肛门………`,
          );
          await era.printAndWait(`「呀哎呀啊！停下吧…求你了…啊啊啊！」`);
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊…肛门被撑大了…咿啊啊啊…好棒哦${heart(1)}」`,
        );
        await era.printAndWait(`「肛门被侵犯的好棒哦${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「可以啊…请把${sc()}当成母兽一样侵犯吧………」`);
        await era.printAndWait(
          `「啊嗯…屁股小穴什么的…呀嗯…真的…快要变成母兽了………${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「这样的姿势什么的…真是的你究竟要…咕嗯！」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      chara(target).kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          await era.printAndWait(
            `「咕嗯咿咿咕嗯${heart(1)}淫乱变态的肛门被侵犯了${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人～${heart(1)}…像母狗一样被侵犯肛门…已经要不行了…请好好的看吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${assi_name}有点愕然的表情看着${target_name}一副融化在肛门被艹的快乐中的表情继续从后面侵犯着。`,
          );
          await era.printAndWait(
            `「啊啊嗯${heart(1)}…咿嗯咿咿啊啊${heart(1)}…咿啊啊啊啊${heart(1)}…咿呜嗯啊嗯啊嗯啊嗯${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…肛门被侵犯了${heart(1)} 在主人面前被侵犯了…啊啊啊${heart(1)} 感受到你的了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}从后面贯穿了肛门、经常能听到${target_name}发出的娇吟。`,
          );
          await era.printAndWait(
            `「肛门有感觉了啊…${target_name}是淫乱的母狗…请更多的看吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${assi_name}一边对${target_name}混乱凌乱的样子苦笑一边继续侵犯她的肛门………`,
          );
        } else if (era.get(`talent:${target}:77`) === 1) {
          await era.printAndWait(
            `「啊…啊哈…更多的虐待我吧${heart(1)} 侵犯${sc()}的好色肛门${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…${sc()}是…肛交狂的变态母狗…${heart(1)} 请更多的侵犯吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${assi_name}饶有兴致的抓住${target_name}的腰不停的侵犯着肛门………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「求你了…不要再折磨我了…啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${assi_name}抱着正在哭泣的${target_name}的腰兴奋不已的继续侵犯肛门不断的抽插。`,
          );
          await era.printAndWait(
            `「呀啊啊啊…啊啊啊…讨、讨厌啊…主人啊…不要看…不要看啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在肛门被侵犯的快感开始慢慢的发出喘息的声音………`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被${assi_name}从背后摁住就这样侵犯着肛门……`,
          );
          await era.printAndWait(`「呀哎呀啊！停下吧…求你了…啊啊啊」`);
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呜啊啊啊啊啊！…啊啊啊…呜、呜哦…肛门被艹好棒哦…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副肛门被小鸡鸡一插就融化了的样子、从嘴里流下了口水。`,
          );
          await era.printAndWait(
            `「${scf()}…${sc()}的事怎样都好…肛门性交…就满足了${heart(1)}」`,
          );
          await era.printAndWait(
            `「好棒啊…肛门被小鸡鸡插进来好棒啊${heart(3)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嘛啊啊啊…啊…嗯…最棒了…好棒哦…${heart(1)}」`,
          );
          await era.printAndWait(
            `「肛门张开了${heart(1)} 呀啊啊啊${heart(1)} 啊啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「肛门性交好棒啊…${sc()}…只要能肛门性交就什么都愿意做哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边叫着下流的话一边从肛门到头顶都沉迷于快感之中………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…哦${heart(1)}…哦${heart(1)} 小鸡鸡全部插进来了${heart(1)}」`,
          );
          await era.printAndWait(
            `「被小鸡鸡吇咕吇咕的是至高无上的享受${heart(1)} 已经不需要什么小穴了${heart(1)}」`,
          );
          await era.printAndWait(
            `「就这样…一直…只被艹肛门就是我想要的生活了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}完全败给了肛门的快感、再也无法恢复了………`,
          );
        }
        // CFLAG:328  = 9（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…炽热的小鸡鸡${heart(1)} 啊啊啊…肛门性交好棒哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊嗯啊啊啊啊…咿…更多的肛门性交啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…啊…肛门张开了…咿${heart(1)} 嗯咿咿哦${heart(1)}」`,
          );
          await era.printAndWait(`「啊哈啊啊咿…肛门要融化了…${heart(1)}」`);
        }
        // CFLAG:328  = 8（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…啊…肛门张开了…咿${heart(1)} 嗯咿咿哦${heart(1)}」`,
        );
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…更多…肛门还要更多的抽插！」`);
        await era.printAndWait(`「主人的小鸡鸡…有感觉了…感觉好棒呜呜」`);
        await era.printAndWait(`「哈…主人啊…${sc()}的好色肛门…更多的侵犯吧…」`);
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊嗯…咿…哈呜…屁股小穴被侵犯了…好棒哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人已经…${sc()}的屁股小穴、好舒服啊？…啊嗯♪」`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…屁股好棒哦…主人…被侵犯的好棒哦…哈♪」`,
          );
          await era.printAndWait(`「更多…像母兽一样屁股有感觉了！」`);
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊…屁股小穴…喜欢上了啊…但是…主人这是不好的…啊哈${heart(1)}」`,
        );
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哇…咿…啊啊…屁股小穴…被打开了…好舒服…♪」`);
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 3;
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(`「嗯咿…咿…这样的…这样的…讨厌啊…啊」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 28) {
    if (chara(target).kojo.对面座位肛交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…到最里面了…放进去了${heart(1)} 啊嗯…二个人的样子都展现主人面前了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边和${assi_name}舌头缠绕淫乱的深吻一边扭着腰贪图肛门的快感。`,
          );
          await era.printAndWait(`「啊啊啊…哈…屁股小穴…最棒的${heart(1)}」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${target_name}一边被${assi_name}侵犯着肛门一边接吻。`,
          );
          await era.printAndWait(
            `「哇…啊啊啊…进到肛门的尽头了…啊啊…张开了…${heart(1)}」`,
          );
          await era.printAndWait(
            `感受到肛门扩张的快感${target_name}发出了喘息声………`,
          );
        } else {
          await era.printAndWait(`「呀讨厌…这样的话肛门全被看光了…咿！」`);
          await era.printAndWait(
            `${target_name}默不作声的让${assi_name}顶起了腰。`,
          );
          await era.printAndWait(
            `${target_name}向外翻的肛门被${master_name}一目了然………`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哎呀啊${heart(1)} 深点…深点呦…${heart(1)}」`);
        await era.printAndWait(`「小鸡鸡更多的欺负我吧…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人就这样也…很喜欢呢…${sc()}现在、喜欢上了…啊嗯${heart(1)}」`,
        );
        await era.printAndWait(`「到最里面…连接着…♪」`);
      } else {
        await era.printAndWait(
          `「啊啊啊…那里一目了然了啊…屁股被侵犯什么的…啊啊啊…看啊…」`,
        );
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      chara(target).kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          await era.printAndWait(
            `「啊啊啊啊${heart(1)}…已、已经不行了…没有我的允许${heart(1)}…直到肛门高潮为止…不会放你走的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抱住${assi_name}、贪图快乐一样激烈的扭着腰。`,
          );
          await era.printAndWait(
            `肛门的结合部发出下流的声音、粘糊的肠液和小鸡鸡粘在一起………`,
          );
          await era.printAndWait(
            `「啊啊啊…好棒${heart(1)} 好棒啊${heart(1)}…满满的…满满的玩弄我吧${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊…到最里面了…放进去了${heart(1)} 啊嗯…二个人的样子都展现主人面前了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边和${assi_name}舌头缠绕淫乱的深吻一边扭着腰贪图肛门的快感。`,
          );
          await era.printAndWait(`「啊啊啊…哈…屁股小穴…最棒的${heart(1)}」`);
        } else if (era.get(`talent:${target}:77`) === 1) {
          await era.printAndWait(
            `「更多…更多的侵犯…${heart(1)} 肛门都张开了${heart(1)}」`,
          );
          await era.printAndWait(
            `「肛门太舒服了…啊啊啊…已经不行了…${heart(1)} 啊啊啊…啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抱住${assi_name}、贪图快乐一样激烈的扭着腰………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `${target_name}一边被${assi_name}侵犯着肛门一边接吻。`,
          );
          await era.printAndWait(
            `「哇…啊啊啊…进到肛门的尽头了…啊啊…张开了…${heart(1)}」`,
          );
          await era.printAndWait(
            `感受到肛门扩张的快感${target_name}发出了喘息声………`,
          );
        } else {
          await era.printAndWait(`「呀讨厌…这样的话肛门全被看光了…咿！」`);
          await era.printAndWait(
            `${target_name}默不作声的让${assi_name}顶起了腰。`,
          );
          await era.printAndWait(
            `${target_name}向外翻的肛门被${master_name}一目了然………`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `${target_name}的肛门把${master_name}的小鸡鸡整根都吸了进去。`,
          );
          await era.printAndWait(
            `「不、不要动了…都扩张开了…好棒啊…啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `肛门颤抖着、忍耐着什么似的晃动着屁股${target_name}看上去与其说是淫乱不如说是可爱。`,
          );
          await era.printAndWait(
            `「啊哈！动、动吧、好棒…不行了…呃哈因为是肛交狂哈呀咿啊啊啊！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊嗯${heart(1)} 更多的顶吧！肛门乱七八糟的要坏了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}自己扭着腰、粘膜紧紧的夹着小鸡鸡发出淫靡的声音	。`,
          );
          await era.printAndWait(
            `「已经…真的…泥泞…更多更多的要疯了${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「呜啊啊啊…已经不行了不行了啊…腰无法停止直到高潮吧哈呀啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出像是走投无路的声音、双臂紧紧抱住${master_name}。`,
          );
          await era.printAndWait(
            `「呀哈…啊啊啊！已经回不去了！${sc()}的肛门已经变成性交专用的洞了${heart(1)}」`,
          );
        }
        // CFLAG:329  = 9（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈…啊啊啊${heart(1)} 好棒啊好棒啊${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}贪图快乐的自己扭着腰………`);
          await era.printAndWait(`「更多…小鸡鸡不停的侵犯${heart(1)}」`);
        } else {
          await era.printAndWait(`「嗯嗯…肛门扩张的好棒啊…${heart(1)}」`);
          await era.printAndWait(`「脑袋里一团浆糊…${heart(1)}」`);
        }
        // CFLAG:329  = 8（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…整根都进来了…${heart(1)} 肛门好奇怪的快感………」`,
        );
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…肛门…太舒服了啊！」`);
        await era.printAndWait(
          `「主人的小鸡鸡插到最里面了…美妙的感觉♪更多更多的侵犯我吧！」`,
        );
        await era.printAndWait(
          `${target_name}一边流着口水一边扭腰、继续贪图着肛门的快感………`,
        );
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊…嗯…哈…小鸡鸡侵犯…屁股小穴…好厉害的啊…」`,
          );
          await era.printAndWait(`「更多…更多啊…♪」`);
        } else {
          await era.printAndWait(
            `「${sc()}啊…屁股小穴要高潮了…看啊…好好的看吧…」`,
          );
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…这样的…完全没关系…主人给我更多的舒服啊…♪」`,
        );
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…啊啊啊！…明明不行的…好舒服…这样的…啊啊嗯♪」`,
        );
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 3;
      } else if (
        chara(target).kojo.对面座位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(`「咕…咿…咕…快点…结束吧…呜啊啊嗯」`);
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 29) {
    if (chara(target).kojo.背面座位肛交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}像要炫耀给${master_name}看一样大张着双腿、被${assi_name}侵犯着肛门。`,
          );
          await era.printAndWait(
            `「啊${heart(1)}…啊${heart(1)}…啊哈嗯${heart(1)}…满满的…看啊…肛门被侵犯…小穴也湿了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}每次被${assi_name}顶到肛门的时候都会发出娇声、窥伺一样地凝视着${master_name}的反应………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「哎呀…好、好羞耻…这样的姿势…被侵犯屁股…啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边害羞、一边张开双腿间的秘处炫耀着被侵犯的肛门。`,
          );
          await era.printAndWait(
            `「不、不行了…有感觉了不行啊…啊…啊啊嗯${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被${assi_name}从后面顶到肛门发出了痛苦的声音。`,
          );
          await era.printAndWait(`「哦啊…嘎咿…已经…停下吧…咿」`);
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊哈啊啊啊…肛门被扩张了${heart(1)}」`);
        await era.printAndWait(`「扩张的好棒啊…还要更多啊${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「马上就…但是从后面…屁股小穴什么的…」`);
        await era.printAndWait(`「更多…好好的疼爱我吧…明明想要…啊嗯♪」`);
      } else {
        await era.printAndWait(`「呜…这、这样的姿势…啊呀…那里不能扩张！」`);
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      chara(target).kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          await era.printAndWait(
            `「啊啊啊…融化了啦…屁股小穴都变湿了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}就这样继续侵犯同时发出下流的悲鸣。`,
          );
          await era.printAndWait(
            `「更多吇咕吇咕的…想要给主人展示下调教完毕的屁股小穴${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `${target_name}像要炫耀给${master_name}看一样大张着双腿、被${assi_name}侵犯着肛门。`,
          );
          await era.printAndWait(
            `「啊${heart(1)}…啊${heart(1)}…啊哈嗯${heart(1)}…满满的…看啊…肛门被侵犯…小穴也湿了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}每次被${assi_name}顶到肛门的时候都会发出娇声、窥伺一样地凝视着${master_name}的反应………`,
          );
        } else if (era.get(`talent:${target}:77`) === 1) {
          await era.printAndWait(
            `「啊啊啊…主人大人啊…仔细的看看吧…${sc()}的”屁股小穴”看啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副融化在快感中的表情一边张开双腿、展示着已经变成性器的肛门………`,
          );
          await era.printAndWait(
            `「屁股小穴呢…小鸡鸡进来吧…已经不行了那样的东西…啊…啊啊啊啊哈${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「哎呀…好、好羞耻…这样的姿势…被侵犯着屁股…啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边害羞、一边张开双腿间的秘处把被${assi_name}侵犯着肛门炫耀给${master_name}看。`,
          );
          await era.printAndWait(
            `「不、不行了…有感觉不行啊…啊…啊啊嗯${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `${target_name}被${assi_name}从后面顶到肛门发出了痛苦的声音。`,
          );
          await era.printAndWait(`「哦啊…嘎咿…已经…停下吧…咿」`);
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 8 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「咿咕嗯…咿啊啊哈啊…吇咕吇咕的舒服的腰以下都要融化了一样${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊嗯…好好的夹紧、夹紧哈呀…充分的侵犯吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}已经完全没有了勇者的尊严、沉溺在肛门的快乐之中………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}用肛门把${master_name}的小鸡鸡整根都吸了进去同时吐出了动情的气息。`,
          );
          await era.printAndWait(
            `「哈啊啊啊啊…如果肛门能被主人艹要我什么都可以啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `在肛门的刺激让${target_name}的双眼都透露出快乐的颜色。理性完全都消失了似的。`,
          );
          await era.printAndWait(
            `「真的什么都会做…哪怕是变成野兽和怪物的玩具${heart(1)}…所以啊…会拼命的听话的${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「还想要更多…${heart(1)} ${sc()}的这里啊…没有主人温暖的小鸡鸡不行呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「呀哈${heart(1)} 就这样用肛门套弄主人小鸡鸡${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边滴答滴答的流着口水一边夹紧了肛门………`,
          );
        }
        // CFLAG:330  = 9（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯呀啊啊啊…肛门被侵犯好幸福啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副融化了一样的表情、品尝着肛门的快感………`,
          );
        } else {
          await era.printAndWait(
            `「哦呵呵${heart(1)} 现在只要小鸡鸡插到最里面就可以了${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}的肛门是”屁股小穴”了啊${heart(1)}」`,
          );
        }
        // CFLAG:330  = 8（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯呵${heart(1)} 肛门张开了为了主人的小鸡鸡张开了${heart(1)}」`,
        );
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…啊…更多…更多的顶进来吧！」`);
        await era.printAndWait(
          `「哈…我知道了啊…这个”屁股小穴”什么的啊…${sc()}的肛门好厉害…变成了屁股小穴♪」`,
        );
        await era.printAndWait(
          `${target_name}一边流着口水、一边被${master_name}继续侵犯着肛门………`,
        );
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「啊…哈呜…嗯…更多…更多的顶…顶啊！」`);
          await era.printAndWait(`${target_name}高兴的被侵犯着肛门………`);
        } else {
          await era.printAndWait(
            `「啊…啊啊啊…屁股小穴…好喜欢啊…更多…要死了♪」`,
          );
          await era.printAndWait(
            `${target_name}按着屁股想要更多的感受肛门的快感………`,
          );
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼呜…屁股…啊啊啊…张卡了…啊啊嗯！」`);
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊…啊…咕…屁股…有感觉了…这样的…不对的…不对的…啊啊嗯！」`,
        );
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 3;
      } else if (
        chara(target).kojo.背面座位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(`「咕…嗯嗯…呀咿…再也…不要再往上顶了…咕嗯」`);
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        chara(target).kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if (chara(target).kojo.手淫 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「唔呼呼…小鸡鸡好热…好棒啊${heart(1)} 明明只是摸了一下感觉就要来了…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(`「没、没关系、会认真侍奉的啊………」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「${sc()}的手…变的非常舒服了${heart(1)}」`);
        await era.printAndWait(
          `${target_name}恶作剧那样的笑着用手握住了小鸡鸡………`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「呜呼…这样的…温柔的套弄就好了啊…好厉害…热热的…」`,
        );
        await era.printAndWait(`${target_name}陶醉着用手指捏住了小鸡鸡………`);
      } else {
        await era.printAndWait(`「哇…这样的事…我才不要做呢…呀…好热…」`);
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      chara(target).kojo.手淫 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}微笑着开始套弄${player_name}的龟头。`,
          );
          await era.printAndWait(
            `「哈…听说这样的套弄会很舒服呢哇${heart(1)}」`,
          );
          await era.printAndWait(`「唔呼呼…还有很多…变的舒服了呐${heart(1)}」`);
        } else {
          await era.printAndWait(`「小鸡鸡硬了…握住有用了啊${heart(1)}」`);
          await era.printAndWait(
            `「唔呼呼…要给你更多的摩擦…啊啊嗯逃避是不行的哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边舔着嘴唇一边开始套弄小鸡鸡………`,
          );
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…好热…好热啊…好像不情愿一样开始颤抖了…啊啊啊…好舒服啊${heart(1)}」`,
        );
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊咿…主人啊…你的小鸡鸡${sc()}套弄的怎么样啊？」`,
          );
          await era.printAndWait(`「唔呼呼…主人的弱点、${sc()}全部了解了呐♪」`);
        } else {
          await era.printAndWait(
            `「主人的小鸡鸡…好热啊…硬起来了…好可爱的说…」`,
          );
          await era.printAndWait(`「更多咕啾咕啾的给你哦…很舒服吧♪」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…小鸡鸡…热热的好可爱…${sc()}的手会让你更舒服的…」`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…不要…摩擦主人的小鸡鸡…变得快乐起来了…嗯」`,
        );
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 3;
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「咕…才不会做这种事…不可能的…呀啊！不、不会碰的」`,
        );
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if (chara(target).kojo.口交_奴 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${assi_name}的小鸡鸡在${target_name}一副愉快的笑容中被含了进去………`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈…侍奉你的小鸡鸡哦${heart(1)} 咿…嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出一脸淫猥的笑容放荡的用嘴巴含住了熊吉吉………`,
        );
        await era.printAndWait(`「咕嗯嗯…呜啾…啾噗…啾啪…嗯哦${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「是、是的…请让我侍奉你的小鸡鸡吧…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}毫不犹豫的含住了小鸡鸡………`);
        await era.printAndWait(`「呜嗯…啾啪…啾…啾…啊哈…嗯哦…哈呜…嗯咕呜嗯！」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「吸吮…请让我…咿…嗯…呼…」`);
        await era.printAndWait(
          `${target_name}不熟练的、热心的用嘴侍奉起小鸡鸡………`,
        );
      } else {
        await era.printAndWait(`「咕…这样的…不要…明明不想做…呜咕…嗯…」`);
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      chara(target).kojo.口交_奴 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(
          `${assi_name}的小鸡鸡在${target_name}一副愉快的笑容中被含了进去。`,
        );
        await era.printAndWait(
          `但是${master_name}看不到${target_name}是怎样的表情、只有舌头侍奉的声音不断响起………`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊嗯…哈呜…啾啾…嗯哦…咕嗯嗯嗯嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在接到命令的一瞬间就扑向了小鸡鸡、开始进行口腔奉仕。`,
          );
          await era.printAndWait(
            `「嗯嗯…呜啾…啾啊…嗯哦…啾啾…呼…全部射进来吧${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `${target_name}张大嘴爱怜的反复吻着小鸡鸡的尖端然后把小鸡鸡整根吞了进去………`,
          );
          await era.printAndWait(
            `「嘛啾…啾…谢谢主人让我能一直给主人的小鸡鸡舒服${heart(1)} 啾啾…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊…哈呜嗯…嗯…啾啪啾呜嗯${heart(1)} 啊啊啊…我能忍住的…全射出来吧…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「嗯哦…啾…嗯哦…啾${heart(1)} 啊啊啊…小鸡鸡有点脏了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「会让小鸡鸡重新变的漂漂亮亮的…所以啊…请让我来主导小鸡鸡吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌头从根部一直舔到龟头、就像是要把污秽全舔下来似得………`,
          );
        }
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「小鸡鸡…会很温柔的侍奉的…${heart(1)}」`);
          await era.printAndWait(
            `「啊…是的…舒服的话…就这样在我的嘴里射出来吧${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}陶醉的继续进行口腔侍奉………`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「哈啊…吸吮的完全停不下来…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}一边流着眼泪一边热心的继续口腔侍奉。`,
          );
          await era.printAndWait(`「呜嗯…嗯噗…啾…嗯哦…咕…呼${heart(1)}」`);
        } else {
          await era.printAndWait(
            `「咕…噗…啾…嗯哦…咕啊…小鸡鸡…让我更多的含吧………」`,
          );
          await era.printAndWait(
            `「哈…小鸡鸡真美味…更多的让我舔舔吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}连滴落的口水也来不及擦的继续热心的进行口腔侍奉………`,
          );
        }
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print(`「嗯…哈…啊…能吸吮主人的小鸡鸡…这样的…好开心…」`);
        await era.printAndWait(
          `「啊啊…总觉得…真的…喜欢上小鸡鸡了…啾啪…吇咕…呼呜♪」`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 3;
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈…哈…嗯…嗯…更多…不含不行…？嗯…呜嗯！」`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 32) {
    if (chara(target).kojo.乳交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「乳房这样…夹住………啊啊啊、变的好可爱的说${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊哈…所以大乳房…好舒服啊…${heart(1)}」`);
        }
        await era.printAndWait(`「嗯呼…舒服吗？小鸡鸡舒服吗？」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊哈…侍奉你的小鸡鸡…${heart(1)}」`);
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「嗯…${sc()}的乳房…这么大一定很舒服吧？」`);
        }
        await era.printAndWait(
          `「哈…乳房都被烫伤了呢…被火热的小鸡鸡…${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「${sc()}引以为傲的乳房、摩擦你的小鸡鸡…」`);
        await era.printAndWait(`「嗯…啊哈…啊…总觉得…变的奇怪了…」`);
      } else {
        await era.printAndWait(`「呜哇…咿…啊…小鸡鸡…好热…乳房啊………」`);
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      chara(target).kojo.乳交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…热热的小鸡鸡…乳房被侵犯了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的两个乳房温柔的夹住小鸡鸡、继续爱抚………`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「啊哈…更多的侵犯吧…${sc()}的大乳房就是为了被侵犯而存在的！」`,
            );
          }
          await era.printAndWait(
            `「啊啊啊…好高兴…小鸡鸡在${sc()}的乳房里闹腾${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「呀呼…乳房好舒服啊${heart(1)}」`);
          await era.printAndWait(
            `${target_name}的眼神慢慢的融化了、温柔的抬起两个乳房开始摩擦小鸡鸡………`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「${sc()}的大乳房…是为了侍奉小鸡鸡而存在的………」`,
            );
          }
          await era.printAndWait(
            `「啊啊啊…侍奉好舒服啊…脑袋里都融化了…${heart(3)}」`,
          );
        }
        // CFLAG:333  = 7（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…乳房侍奉好棒啊…${heart(1)}」`);
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊哈…乳房把小鸡鸡整个夹住了…怎么样啊…舒服吗？」`,
          );
        }
        await era.printAndWait(
          `「嗯啊啊啊啊…乳房上全是小鸡鸡的味道…好幸福…${heart(1)}」`,
        );
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「哈…这样就让小鸡鸡开始颤抖了…${sc()}的乳房感觉很满足啊♪」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「小鸡鸡被乳房夹的看不见了…啊哈${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「唔呼呼、这么舒服啊…会让你更多更多的舒服的♪」`,
          );
        } else {
          await era.printAndWait(`「${sc()}的乳房…这样为你的小鸡鸡侍奉………」`);
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「这样的大乳房…一直都认为是碍事啊…啊啊啊${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「是的…非常幸福…你的小鸡鸡大人…${sc()}的乳房会侍奉的更舒服的♪」`,
          );
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯…${sc()}的乳房里…小鸡鸡在闹腾♪」`);
        await era.printAndWait(`「这样闹腾的话…不行了…呀…啊、啊啊嗯♪」`);
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 3;
      } else if (chara(target).kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜啊…啊啊啊…你、你这个变态………咕」`);
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 33) {
    if (chara(target).kojo.股间性交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊…小鸡鸡好热啊${heart(1)}…嗯已经…小穴好想要啊………！」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「呜噗…啊啊啊…总觉得这…不可思议的感觉…」`);
        await era.printAndWait(
          `「啊啊啊…小鸡鸡…被这样也会舒服啊…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「没、没关系这样的…马上就舒服了…」`);
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      chara(target).kojo.股间性交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「好坏啊好坏啊…${sc()}明明想早点用小穴来侍奉的！」`,
        );
        await era.printAndWait(
          `「啊啊啊…主人啊…比起这样在小穴门口摩擦…插进小穴里面一定会更舒服吧${heart(1)}」`,
        );
        await era.printAndWait(
          `「咕嗯${heart(1)}…啊啊、会认真的侍奉…快点…快点…破了我的处女膜吧！」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊啊…会认真的让你舒服…所以啊…请赏赐给我吧…啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(`「哈呜…好想要继续啊…啊啊啊啊${heart(1)}」`);
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (chara(target).kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呜啊…啊啊啊啊啊…主人啊…都到了这里、明明知道…小鸡鸡…还不插进来吗？」`,
        );
        await era.printAndWait(
          `「啊啊啊…所这样下去…可能会误插进来的…咿嗯♪…说不定…？」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…小鸡鸡…感觉好烫啊…咿嗯…啊啊…还没插进来…」`,
        );
        await era.printAndWait(`「主人啊…求你了…大人…好热…好像要！啊啊啊！」`);
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 3;
      } else if (chara(target).kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「咕…嗯…啊啊啊…小鸡鸡好烫…好烫啊…」`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (chara(target).kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${master_name}命令${target_name}就这样跨坐在${assi_name}上面。`,
            );
            await era.printAndWait(
              `「唔呼呼、请多多指教${assi_name}小姐${heart(1)} 请细细品尝${sc()}的处女吧♪」${target_name}这样说道同时轻轻的眨了眨眼睛。`,
            );
            await era.printAndWait(
              `${assi_name}对这样的态度苦笑着、${target_name}的腰慢慢的向着小鸡鸡坐了下来。`,
            );
            await era.printAndWait(
              `「啊…啊啊啊…插进来了…哇…呼啊…啊啊啊啊啊嗯！」`,
            );
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊啊嗯${heart(1)}…”献上处女”什么的…现在的最高命令啊………♪」`,
            );
            await era.printAndWait(
              `${target_name}慢慢的抓住小鸡鸡引向自己的小穴。`,
            );
            await era.printAndWait(
              `「啊…请仔细的看吧…${sc()}的魔族小穴啊…马上要变成主人的东西了………呜嗯！！！」`,
            );
            await era.printAndWait(
              `一边忍受着破处的痛苦${target_name}一边把小鸡鸡整根吞了进去。`,
            );
            await era.printAndWait(`「啊哈…啊啊咿…好厉害…还想要更多的………♪」`);
            await era.printAndWait(
              `「这样下去啊…继续侍奉小鸡鸡…啊啊啊…充分的标志着新品的小穴${heart(1)}」`,
            );
          } else {
            await era.printAndWait(
              `「啊啊啊…好羞耻啊…${sc()}的处女膜到此为止被破坏了…请看啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}露出淫猥的笑容把小鸡鸡导向了自己的小穴。`,
            );
            await era.printAndWait(
              `「唔呼呼…从这里开始…这是我的第一次${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊啊啊…充分的品味…咕…呼…啊啊啊咿啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}破处那难以忍受的痛苦大叫起来。`,
            );
            await era.printAndWait(
              `「哇…哈哈…来、来吧…就这样开始小穴侍奉吧…好满足…好舒服啊${heart(1)}」`,
            );
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `${master_name}命令${target_name}就这样跨坐在${assi_name}的腰上。`,
            );
            await era.printAndWait(`「啊…啊啊啊…但是…果、果然………呀嗯嗯！？」`);
            await era.printAndWait(
              `${master_name}抓住${target_name}的腰立起来让${assi_name}的小鸡鸡强行插入。`,
            );
            await era.printAndWait(`「嗯…啊…啊啊啊…${sc()}的…第一次…嗯……！」`);
          } else if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(`「身体变成这样后…不知道登了多久………♪」`);
            await era.printAndWait(
              `「啊啊啊…太好了…自己献出贞操什么的${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}高兴的笑着、把小鸡鸡引向了小穴。`,
            );
            await era.printAndWait(
              `「哇…嗯嗯…啊…哈啊嗯！ 啊啊啊…啊啊啊…厉害…小鸡鸡好烫啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `「主人的小鸡鸡好烫啊…啊哈啊…感受到了${heart(1)}」`,
            );
            await era.printAndWait(
              `配合着${target_name}兴奋的心情、展开了翅膀………`,
            );
          } else {
            await era.printAndWait(
              `「唔呼呼…这样的日子终于来了…${sc()}、太感激了…${heart(1)}」`,
            );
            await era.printAndWait(`「啊啊啊…没关系…主人…请开始动吧…」`);
            await era.printAndWait(
              `${target_name}提心吊胆的用手把小鸡鸡引向了小穴。`,
            );
            await era.printAndWait(
              `「咕…哇…咿、啊啊！主人的…到最里面了…全部…插进来了哈呀咿…」`,
            );
            await era.printAndWait(
              `${target_name}的小穴里被${master_name}的小鸡鸡弄的快要哭了。`,
            );
            await era.printAndWait(
              `「哎嘿嘿…这样${sc()}就送给主人了、以后${sc()}的生命就只剩下主人了………」`,
            );
            await era.printAndWait(
              `${target_name}害羞的笑着、忍受着破处的痛苦慢慢的开始扭腰了………`,
            );
          }
        } else {
          if (era_flag.assi > 0 && era_flag.assiplay) {
            await era.printAndWait(
              `如${master_name}命令的那样${target_name}跨坐在了${assi_name}的腰上。`,
            );
            await era.printAndWait(
              `「求、求你了…饶了我…饶了我…这样的…不行、总觉得不行啊………」`,
            );
            await era.printAndWait(
              `${assi_name}嘲笑着抓住了${target_name}的腰、强行把小鸡鸡插进了小穴的最里面。`,
            );
            await era.printAndWait(
              `「啊啊啊！啊！这样讨厌啊！啊啊啊！…痛…好痛啊！」`,
            );
          } else {
            await era.printAndWait(`「不、不要这样…这样的…呜…！」`);
            await era.printAndWait(
              `${player_name}抓住${target_name}的腰强行把小鸡鸡插进了最里面。`,
            );
            await era.printAndWait(
              `「啊啊啊！啊！这样讨厌啊！啊啊啊！…痛…好痛啊！」`,
            );

            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「哈哈…这样…如果是坐在那家伙上面的话就好了…呜呜………」`,
              );
              await era.printAndWait(
                `${target_name}想起了故乡的恋人不禁流下了眼泪……`,
              );
            }
          }
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          if (era.get(`talent:${target}:76`) === 1) {
            await era.printAndWait(
              `「啊啊嗯${heart(1)}…哈…全部插进来了啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}扑哧一声笑了、一副舒服的样子慢慢的扭起腰。`,
            );
            await era.printAndWait(
              `「满满、满满的享受吧…为了不让主人看的无聊…${heart(1)} 啊啊嗯${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}高兴的在${assi_name}的腰上扭动………`,
            );
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(`「主人的…命令…咿…哇…呜嗯………」`);
            await era.printAndWait(
              `${target_name}横跨在${assi_name}上面一边犹豫不决的用小穴最里面接受了小鸡鸡。`,
            );
            await era.printAndWait(
              `「哈…哈…啊啊…啊啊啊…有感觉了…明明不行的…啊啊啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}困惑着在秘处的快乐下发出了声音………`,
            );
          } else {
            await era.printAndWait(
              `${master_name}命令${target_name}跨坐在${assi_name}的腰上。`,
            );
            await era.printAndWait(`「这样的…讨厌…但是…哇…嗯…咿呜嗯！」`);
            await era.printAndWait(
              `${target_name}羞耻的红着脸让${assi_name}的小鸡鸡插进了小穴的最里面………`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「哈…这样跨坐着…真是卑猥但是又很美妙啊${heart(1)}」`,
          );
          await era.printAndWait(`「充分的侍奉小鸡鸡、好舒服哦♪」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊…跨坐在主人主人…啊啊啊…不、不行了…那样的地方不要看…求你了…」`,
          );
          await era.printAndWait(`「嗯…啊啊啊…深点…主人的…感觉…♪」`);
        } else {
          await era.printAndWait(`「咕…啊啊啊…插进最里面了…好痛苦啊………」`);
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      chara(target).kojo.骑乘位 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊嗯${heart(1)}…哈…全部插进来了啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扑哧一声笑了、一副舒服的样子慢慢的扭起腰。`,
          );
          await era.printAndWait(
            `「满满、满满的享受吧…为了不让主人看的无聊…${heart(1)} 啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}高兴的在${assi_name}的腰上扭动………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「主人的…命令…咿…哇…呜嗯………」`);
          await era.printAndWait(
            `${target_name}横跨在${assi_name}上面一边犹豫不决的用小穴最里面接受了小鸡鸡。`,
          );
          await era.printAndWait(
            `「哈…哈…啊啊…啊啊啊…有感觉了…明明不行的…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}困惑着在秘处的快乐下发出了声音………`,
          );
        } else {
          await era.printAndWait(`「这样的…讨厌…但是…哇…嗯…咿呜嗯！」`);
          await era.printAndWait(
            `${target_name}羞耻的红着脸在${assi_name}的腰上上下的扭动………`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `${target_name}深深的叹息、淫荡的脸向着${player_name}。`,
          );
          await era.printAndWait(
            `「这样连着的话…侍奉着有种幸福的感觉啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「所以啊…全部…全部交给${sc()}吧${heart(1)} 啊啊啊啊嗯！」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「呀嗯…好舒服…好棒${heart(1)} 这样主人的小鸡鸡也可以舒服了吧………」`,
          );
          await era.printAndWait(`${target_name}扑哧一笑在腰上淫乱的扭动。`);
          await era.printAndWait(
            `「更多更多…小穴好舒服…脑袋里满满的全是小鸡鸡${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呀啊嗯…不要动了…如果再顶的话咿啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「哦呼…哦…子宫口咕叽咕叽的不行了${heart(1)} 子宫感觉太强啦…啊呀啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}配合着${player_name}小鸡鸡的撞击发出淫靡的呻吟………`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊啊…啊…呼${heart(1)} 吇咕吇咕好棒哦${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}前后扭着腰、充分品味着小鸡鸡带来的快乐。`,
          );
          await era.printAndWait(`「不想离开这里了${heart(1)} 啊啊啊啊！」`);
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(`「啊啊啊…主人啊…好喜欢啊…」`);
          await era.printAndWait(`「主人的小鸡鸡…好舒服啊呀…啊啊嗯♪」`);
          await era.printAndWait(`${target_name}撒娇似得前后扭动着腰……`);
        } else if (rand_n(3) === 0) {
          await era.printAndWait(`「啊…啊啊啊啊…怎么样啊…这样扭腰？」`);
          await era.printAndWait(`「主人有感觉了…学到了呢…呀嗯嗯♪」`);
          await era.printAndWait(
            `${target_name}淫猥的扭着腰、发出了可爱的声音………`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「呀嗯！主人不要动…啊嗯啊啊啊～！」`);
          await era.printAndWait(
            `「不行不行了！${sc()}的方法好舒服！呀嗯嗯！」`,
          );
          await era.printAndWait(
            `${target_name}配合着小鸡鸡的撞击发出淫靡的呻吟………`,
          );
        } else {
          await era.printAndWait(`「呼啊嗯…像这样主人的小鸡鸡…插到里面…」`);
          await era.printAndWait(
            `「非常幸福的感觉…呀嗯、不行了…还要更大的动作啊…啊嗯！」`,
          );
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「咕…啊啊啊…自己放进去…高兴着什么啊…啊啊啊啊！」`,
          );
          await era.printAndWait(
            `「哈呜…不行了…腰擅自动作不行啊…啊啊啊啊啊啊！」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(`「啊啊啊啊…啊…小穴…好舒服…小穴太舒服了…」`);
          await era.printAndWait(`「随便…腰…动吧…小穴不行了呜呜呜♪」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「咕啊…哈…不要…再插进来了…」`);
          await era.printAndWait(
            `${player_name}指出了是${target_name}自己动的………`,
          );
          await era.printAndWait(
            `「哎…咿、不要…嘘…不一样的…${sc()}是不会动的…啊啊～！」`,
          );
        } else {
          await era.printAndWait(
            `「被命令…明明只是动动而已…好舒服呐…啊啊啊啊！」`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这样…做…动了就行了吧…呼啊啊！啊嗯！」`);
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 3;
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…好…好难受啊…嗯…嗯…」`);
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 35) {
    if (chara(target).kojo.全身擦洗 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「啊…哈…哈…不、不要动…嗯…♪」`);
        await era.printAndWait(`「好好的…开始洗吧…啊！」`);
      } else {
        await era.printAndWait(`「知、知道啦…${sc()}的全身…都会认真清洗的」`);
        await era.printAndWait(
          `「呜、呜哇…好厉害啊都湿了…这样的事还是第一次…」`,
        );
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      chara(target).kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊嗯…充分的清洗干净…唔呼呼…”脏脏的”地方…请起来${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊…你看你看…不能逃避哦…嗯啊啊啊嗯${heart(1)}」`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈…主人啊…还有痒的地方吗～？」`);
        await era.printAndWait(`「唔呼呼…总觉得我这里也变的怪怪的了………」`);
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「怎、怎么办？稍微好点了吗…？」`);
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 3;
      } else if (chara(target).kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「呜哇…总觉得…泡沫热气腾腾的很厉害、呛到了啦…」`,
        );
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 36) {
    if (chara(target).kojo.骑乘位肛交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「啊啊啊…肛门被小鸡鸡刺穿了啊${heart(1)}」`);
          await era.printAndWait(
            `${target_name}跨坐在${assi_name}上面、笨拙的扭着腰。`,
          );
          await era.printAndWait(
            `「${sc()}的淫乱肛门更多的玩弄吧${heart(1)}…嘎吱嘎吱的抽插吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副淫靡的表情贪图着肛门的快乐………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「感受到了…明明是不行的…咿…啊啊啊啊${heart(1)} 不要看那里啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、撞到的时候发出甜美的声音。`,
          );
          await era.printAndWait(
            `「是、是的…肛门…感受到了啊${heart(1)} …啊啊啊…好羞耻………」`,
          );
          await era.printAndWait(
            `被${master_name}看到的缘故被${target_name}羞耻心刺激的更加敏感了………`,
          );
        } else {
          await era.printAndWait(
            `「这、这样的…讨厌…讨厌的…咿…讨厌啊…不要看啊」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}顶到肛门的时候发出了悲鸣………`,
          );
        }
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嘎哈…嗯啊嗯…小鸡鸡…全部吸进去了${heart(1)}」`,
        );
        await era.printAndWait(`「呜呼…所以啊不要动了…♪」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊嗯…都、都进来了…啊嗯${heart(1)}」`);
        await era.printAndWait(`「不行了…第一次${sc()}交给我吧…啊♪啊♪」`);
      } else {
        await era.printAndWait(`「这…这样…进到最里面了…咕…撑开了………！」`);
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      chara(target).kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          era.get(`talent:${target}:77`) === 1
        ) {
          await era.printAndWait(
            `「啊啊${heart(1)}…啊哈${heart(1)}…屁股小穴被小鸡鸡刺穿了${heart(1)} 已经…谁都可以侵犯了…好舒服啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人啊…请看啊…${sc()}的屁股小穴变成了婴儿般的淫穴了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出了格外高的声音、在${assi_name}的腰上淫乱的舞蹈。`,
          );
          await era.printAndWait(
            `「咿${heart(1)}咿${heart(1)}咿啊啊${heart(1)}…已…已经…有屁股小穴就够了…好棒啊${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「啊啊啊…肛门被小鸡鸡刺穿了${heart(1)}」`);
          await era.printAndWait(
            `${target_name}跨坐在${assi_name}上、把小鸡鸡整根吞下了。`,
          );
          await era.printAndWait(
            `「${sc()}的淫乱肛门更多的玩弄吧${heart(1)}…嘎吱嘎吱的抽插吧…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一副淫靡的表情贪图着肛门的快乐………`,
          );
        } else if (era.get(`talent:${target}:77`) === 1) {
          await era.printAndWait(
            `「啊啊啊…${heart(1)} 肛门插到最里面了…咿嗯${heart(1)} 啊啊啊${heart(1)} 侵犯那里吧…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}感动至极的样子全身颤抖、开始在${assi_name}上面扭腰。`,
          );
          await era.printAndWait(
            `「咿啊啊啊…屁股小穴…屁股小穴好棒啊…被小鸡鸡侵犯了…好棒啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出那样的娇声被${assi_name}用腰顶的提高了声音………`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「感受到了…明明是不行的…咿…啊啊啊啊${heart(1)} 不要看那里啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}侵犯着肛门、每次被顶都会发出甜美的呻吟。`,
          );
          await era.printAndWait(
            `「是、是的…肛门…感受到了${heart(1)} …啊啊啊…好羞耻………」`,
          );
          await era.printAndWait(
            `被${master_name}看到的缘故被${target_name}羞耻心刺激的更加敏感了………`,
          );
        } else {
          await era.printAndWait(
            `「这、这样的…讨厌…讨厌啊…咿…讨厌啊…不要看啊」`,
          );
          await era.printAndWait(
            `${target_name}被${assi_name}顶到肛门的时候发出了悲鸣………`,
          );
        }
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊嗯…小鸡鸡全部吞进去了啊…咿、呀嗯嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `「唔呼呼…这样咕叽咕叽的…小鸡鸡在直肠隔着子宫咕叽咕叽的…啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…这样的话啊…已经…湿了…脑袋里全都融化了${heart(3)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈…咿…啊啊啊${heart(1)} 咿…咿啊啊啊呀啊啊嗯${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}卑猥的扭着腰舞动起来。`);
          await era.printAndWait(
            `「啊嗯♪…不、不要动了…${sc()}…全部…全部都…！」`,
          );
          await era.printAndWait(
            `「好舒服啊${heart(1)} ${sc()}的”屁股小穴”全部要去了啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「咕啾嗯${heart(1)} 肛门献出来了${heart(1)} 献给小鸡鸡了啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边发出粗重的呼吸一边淫猥的上下扭着腰。`,
          );
          await era.printAndWait(
            `「哦哦…”屁股小穴”好棒啊${heart(1)} 婴儿一样的屁股小穴…好好的品味吧${heart(1)}」`,
          );
        }
        // CFLAG:337  = 8（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「咿嗯啊啊啊啊…腰停不下来…不愿停下了啦${heart(1)}」`,
          );
          await era.printAndWait(
            `「不行了不行了…明明要认真侍奉的${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}有点不知所措的陶醉在那样的快乐里………`,
          );
        } else {
          await era.printAndWait(`「啊啊嗯…太舒服了…腰动不了…${heart(1)}」`);
          await era.printAndWait(
            `「呀啊嗯…顶到了…呀嗯…侍奉不了了${heart(1)}」`,
          );
          await era.printAndWait(
            `「已经…我真的很淘气啊…啊咿啊啊啊…啊啊嗯${heart(1)}」`,
          );
        }
        // CFLAG:337  = 8（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…嗯啊嗯${heart(1)} 要开始认真的肛门侍奉了…真的不要动了啦」`,
        );
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:77`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼啊…肛门…好舒服！」`);
        await era.printAndWait(`「嗯！主人不要动了…全部全部${sc()}会！」`);
        await era.printAndWait(`${target_name}流着口水、母兽一样的扭着腰。`);
        await era.printAndWait(`「咿嗯咿嗯…”屁股小穴”好舒服！啊啊啊！」`);
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「好厉害…主人的小鸡鸡…插到最里面了…屁股小穴…撑开了♪」`,
          );
          await era.printAndWait(`${target_name}很舒服的样子扭着腰………`);
        } else {
          await era.printAndWait(
            `「好好的…自己动起来了啊…啊嗯…屁股小穴…舒服啊…♪」`,
          );
          await era.printAndWait(`${target_name}一副陶醉的表情沉浸在快感里………`);
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼啊啊…屁股…撑开了…啊嗯…嗯…主人啊…♪」`);
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼啊啊啊…啊…撑的太开了……厉害……好舒服…啊」`);
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 3;
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(`「好、好痛苦…啊啊啊！」`);
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if (chara(target).kojo.肛门侍奉 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「呜嗯…真、真是可惜……！」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「哈咿…嗯…嗯…哈…${sc()}舔屁股小穴什么的…」`);
        await era.printAndWait(`「啊啊…但是…舔的停不下来…嗯…啾…啾」`);
      } else {
        await era.printAndWait(`「啊啊啊…${sc()}在这种地方舔什么的…嗯…呼…」`);
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      chara(target).kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「啊咕…嗯…啊…饶、饶了我………嗯嗯！」`);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈${heart(1)} 很美味啊…主人的肛门好美味啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯呼…直到舔完每一根的褶皱为止…好漂亮的条纹啊${heart(1)} 啊啊啊…肛门唏咕唏咕的…舒服吗？」`,
        );
        await era.printAndWait(
          `「好高兴啊…啊啊啊…啾啪啾啪更多的条纹${heart(1)}」`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.print(`「嗯…嘛啾…咕噜…哈啊…更多的舔啊…${heart(1)}」`);
        await era.print(`「啊啊嗯…更舒服的…♪」`);
        await era.print(`${target_name}把舌头伸进了肛门的最里面………`);
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯…嘛啾…咕噜…噶啊…真是讨厌啊…侍奉停不下来啊………」`,
        );
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 3;
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜呼…嗯…嘛啾…呜…」`);
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 40) {
    if (chara(target).kojo.打屁股 === 0) {
      await era.printAndWait(`「呀呜！？　不要打了啦！」`);
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      chara(target).kojo.打屁股 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈嗯！ 被打着…直到小穴都发热了呢…啊啊啊啊咿啊啊啊！」`,
        );
        await era.printAndWait(`${target_name}每次屁股被打都会发出呻吟………`);
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊嗯…呀嗯…啊啊…主人啊…更多打我的屁股吧…♪」`);
        await era.printAndWait(`「更多的…惩罚我吧…」`);
        await era.printAndWait(
          `${target_name}左右扭动着红肿的屁股诱惑着${player_name}………`,
        );
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 4;
        return 0;
      } else if (
        era.get(`mark:${target}:0`) === 3 &&
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咕嗯…啊嗯…呀嗯！这样的…这样的…呀嗯嗯！」`);
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 3;
        return 0;
      } else if (chara(target).kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊哎呀！不要再打了！」`);
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        chara(target).kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 41) {
    if (chara(target).kojo.鞭 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「啊啊啊…不、不要…啊咿咕！」`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊…哈…因为我太变态了所以请主人惩罚吧…啊嗯…啊啊啊！」`,
        );
        await era.printAndWait(
          `「唔呼呼…但是…变态的我大概一辈子都治不好了啊…呀啊嗯${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊呀！主人啊！那样的不要打了啊！」`);
      } else {
        await era.printAndWait(`「那、那样的东西${sc()}好可怕但是…咕」`);
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      chara(target).kojo.鞭 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「${sc()}被像这样打了…咿咕！」`);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊${heart(1)}…嗯嗯…啊哈啊…明明被打的很痛…小穴还是啾啾的有感觉了${heart(1)}」`,
        );
        await era.printAndWait(
          `「更多的鞭打我吧…欺负…也完全没关系啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边被鞭子抽秘裂一边滴落着爱液………`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呀哈…啊…呼啊啊嗯${heart(1)} 明明很痛…但还是想要继续………」`,
        );
        await era.printAndWait(`「啊啊啊…嗯…咿咿…啊啊啊！」`);
        await era.printAndWait(`每次被打${target_name}都会发出痛苦的叫声………`);
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呀嗯嗯…嗯…啊啊啊…好痛…好痛啊…」`);
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哇…嗯…啊啊啊！主人啊…更多…还要更多…」`);
        await era.printAndWait(`「好痛…但是…好棒啊…主人啊…♪」`);
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咕嗯…明明很痛…总觉得…非常…的奇怪…」`);
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…主人啊…因为反抗不了…不要再用鞭子打了啊…」`,
        );
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈嗯…啊…明明讨厌被打的…总觉得…怪怪的…哟…」`);
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 3;
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哇…嗯…咕嗯」`);
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        chara(target).kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 42) {
    if (chara(target).kojo.针 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊…啊啊啊…不、不行了…那样的刺的话…啊啊啊！」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「那、那个…那是…开玩笑的吧…啊啊啊呀啊！」`);
      } else {
        await era.printAndWait(`「咿咕…咿…不行啊！更进一步的刺不行啊！」`);
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      chara(target).kojo.针 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈啊…更多…刺吧…针垫那样的…呜哦…哦哦${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}每次被针刺都会发出喜悦的声音………`);
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊…啊啊啊…针…好热…嗯…明明很痛…一点点热起来了…啊啊啊…怪、怪怪的………」`,
        );
        await era.printAndWait(`${target_name}对于这意外的感觉有点不知所措………`);
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼嗯…用、用力………啊啊啊…不、不行了…啊啊啊！」`,
        );
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…啊啊…啊啊啊啊…好厉害…刺吧…咕呼…啊♪」`);
        await era.printAndWait(`「还没…不要紧…请再给我…啊♪」`);
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…慢点的话…慢点的话就不要紧…♪」`);
        await era.printAndWait(`「呼嗯…咕叽咕叽的不行了」`);
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「因为反抗不了…我绝对不会反抗的…好痛啊停下吧！…」`,
        );
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈咕…啊…啊啊啊…刺到了…明明应该很痛的…嗯」`);
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 3;
      } else if (chara(target).kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「好痛…好痛…好痛啊…已经…停下啊…」`);
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        chara(target).kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (chara(target).kojo.眼罩 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人啊…我有点害怕啊…」`);
      } else {
        await era.printAndWait(`「这、这样的…我一点都不害怕…」`);
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      chara(target).kojo.眼罩 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…看不见的时候会被做很多色色的事吧${heart(1)}」`,
        );
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…我有点害怕啊…」`);
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…我有点害怕啊…」`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…我有点害怕啊…」`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈呜…好激动啊………」`);
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 3;
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这、这样的…我一点都不害怕…」`);
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.print('');
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈…${heart(1)} 想更好地展现我的表情呢………」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊嗯…主人的脸终于看到了………♪」`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 2;
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「我、我一点也没有害怕………」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    if (chara(target).kojo.绳子 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊嗯…绑成更加色情的样子吧${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「嗯…比想象中的更加…紧的束缚啊…唔呼呼」`);
      } else {
        await era.printAndWait(`「这样的束缚…${sc()}不在乎…总觉得………」`);
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      chara(target).kojo.绳子 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…咕叽咕叽的被绑住了好棒啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「哈…啊啊啊…这样下去会被做各种过分的事了啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的身体被紧紧的绑上、发出了兴奋般的喘息声………`,
        );
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…被绑住了…好舒服啊…嗯${heart(1)} 啊啊啊…湿了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的身体被紧紧绑上从其口中发出了灼热喘息………`,
        );
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…绳子勒到肉里了…嗯…好奇怪的感觉………」`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…绳子勒到肉里了…快要疯了…」`);
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「绳子…啊嗯…磨擦…摩擦着…♪」`);
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「即使没有被绑起来…${sc()}也是主人的玩具…」`);
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「只是被绑住了…就心跳不止………」`);
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 3;
      } else if (chara(target).kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「咕…好、好紧………」`);
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        chara(target).kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 44 &&
    era.get(`tequip:${target}:44`) === 0
  ) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.print('');
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.绳子着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯哈啊…还…非常的………${heart(1)}」`);
      // CFLAG:385  = 3（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊嗯…能被更多的束缚真是太棒了………」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 2;
    } else if (chara(target).kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…」`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    if (chara(target).kojo.口塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「呜嗯…啊哈…呼…」`);
      } else {
        await era.printAndWait(`「呜呜…呜…呼…呼」`);
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      chara(target).kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`);
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`);
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯…呜咕…啊哈…呜嗯${heart(1)}」`);
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`);
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`);
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`);
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`);
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 3;
      } else if (chara(target).kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜嗯…啊哈…呼呜…」`);
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        chara(target).kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 45 &&
    era.get(`tequip:${target}:45`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「噗哈…哈…哈…哈…」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「噗哈…哈…哈…哈…」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 2;
    } else if (chara(target).kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「噗哈…哈…哈…哈…」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    if (chara(target).kojo.灌肠肛塞 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊啊…肚子里好热…好热啊………」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「肚子…肚子好奇怪的快感…已经…饶了我吧…」`);
      } else {
        await era.printAndWait(`「啊啊啊…咕噜…好难受…真的好难受！救救我…」`);
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      chara(target).kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈${heart(1)}…还要更多的灌肠液灌进来…肚子热热的好棒啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊…会一直忍耐到极限的…全部一起拉出来的感觉好舒服啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}翘起屁股想要被${player_name}注入更多的灌肠液………`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…求、求你了…真的…肚子好难受…浣肠液好热啊………」`,
        );
        await era.printAndWait(`${target_name}痛苦的呻吟着、不停的流着眼泪………`);
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼啊…主人啊…更多…更多的灌肠让肚子鼓起来♪」`);
        await era.printAndWait(`「哎嘿嘿…简直就像怀孕了一样…」`);
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「咿嗯…我会忍耐的…在得到主人的命令前一直忍着…♪」`,
        );
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯…啊啊…好难受…屁股好热…好热…好奇怪的快感…♪」`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 3;
      } else if (chara(target).kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「饶了我…请饶了我吧…」`);
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 55) {
    if (chara(target).kojo.放置PLAY === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}在那里发出了询问………`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「那、那个、主人…？」`);
        await era.printAndWait(`${target_name}一副殷切的表情………`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哈哈…休息一下吗…？」`);
        await era.printAndWait(`${target_name}心里空荡荡的………`);
      } else {
        await era.printAndWait(`「什、什么啊…」`);
        await era.printAndWait(`${target_name}在那里发出了询问………`);
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `蠕虫在${target_name}的秘裂蠕动着、毫不留情的在小穴内搅动着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `蠕虫在${target_name}的肛门蠕动着、毫不留情的蹂躏着肛门。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门里被放进了肛门拉珠、肛门正在被拖曳着。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹夹着持续的进行刺激。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被振动的乳头夹夹着持续的进行刺激。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}的乳房被装上了榨乳器不断的榨着乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的小鸡鸡被装上了飞机杯即使快要射精也不取下来。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被戴上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被用绳子绑住约束了起来。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠发出咕噜咕噜的声音、肛门塞被取下来后马上就喷了出来。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、每当微弱的电流流动括约肌就会一阵痉挛。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然后、这样的${target_name}的样子从头到尾都被录了下来………`,
        );
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      chara(target).kojo.放置PLAY = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}偷看着这边………`);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「快、快点…想、想要…想要做很多色色的事情！」`);
        await era.printAndWait(`无法忍耐的${target_name}开始依偎了过来………`);
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「已、已经…总觉得${sc()}明明没有必要休息………」`);
        await era.printAndWait(`${target_name}心里空荡荡的………`);
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人…那、那个…差不多了…」`);
        await era.printAndWait(`${target_name}坐立不安的不停摩擦着双腿………`);
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「那、那个、主人…？」`);
        await era.printAndWait(`${target_name}一副殷切的表情………`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 3;
      } else if (chara(target).kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「为、为什么不看这里………」`);
        await era.printAndWait(`${target_name}在那里发出了询问………`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 2;
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `蠕虫在${target_name}的秘裂蠕动着、毫不留情的在小穴内搅动着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `蠕虫在${target_name}的肛门蠕动着、毫不留情的蹂躏着肛门。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门里被放进了肛门拉珠、肛门正在被拖曳着。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被电动阴蒂夹夹着持续的进行刺激。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被振动的乳头夹夹着持续的进行刺激。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}的乳房被装上了榨乳器不断的榨着乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的小鸡鸡被装上了飞机杯即使快要射精也不取下来。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被戴上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被用绳子绑住约束了起来。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠发出咕噜咕噜的声音、肛门塞被取下来后马上就喷了出来。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、每当微弱的电流流动括约肌就会一阵痉挛。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然后、这样的${target_name}的样子从头到尾都被录了下来………`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 56) {
    if (chara(target).kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`) === 1) {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait('');
        } else {
          await era.print(`${master_name}催促${target_name}进行一下自我介绍。`);
          if (
            rand_n(3) === 0 &&
            (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
          ) {
            // 原作是一整行：无后缀 PRINTFORM + SIF 的 PRINTFORM
            // + 收行的 PRINTFORML（#622）。SIF 判据提到语句外当条件、文本留在语句里
            const masturbation = era.get(`abl:${target}:31`) >= 3;
            await era.print(
              `于是${target_name}将自己的本名、至今为止的性体验` +
                (masturbation ? `以及自慰时意淫的内容` : '') +
                `津津有味的说了起来……`,
            );
            await era.print(
              `只是想想这个水晶球在故乡公开放映的样子、${target_name}的股间就开始湿了……`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (era.get(`talent:${target}:76`) === 1) {
            await era.print(
              `${target_name}向着水晶球一边做爱一边开始下流的自我介绍。`,
            );
            await era.printAndWait(
              `「哈…${sc()}原来是勇者${target_name} ${heart(1)}」`,
            );
            await era.printAndWait(
              `「但是狂妄自大的${sc()}总是逞强、在输给怪物后被抓住了………」`,
            );
            await era.printAndWait(
              `「之后…被魔王大人进行调教………堕落了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}像蛇一样蠕动着身体同时张开了双腿………`,
            );
            await era.printAndWait(
              `「怎么样啊…${sc()}的身体…没有哪个部分是魔王大人没见过的…${heart(1)}」`,
            );
            await era.printAndWait(
              `「现在…最喜欢被魔王大人那样折磨…强暴…我感觉很…有快感…所以请看吧${heart(1)}」`,
            );
            await era.printAndWait(
              `「${sc()}有多舒服、能稍微了解一点我就很开心了啊${heart(3)}」`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `${target_name}羞耻的蠕动着身体、兴奋着连录像开始了都没有注意到………`,
            );
            await era.printAndWait(
              `「啊嗯…${sc()}的告白被大家都知道了什么的好羞耻啊………」`,
            );
            await era.printAndWait(
              `「魔王大人被人那样的讨厌…不过其实还是非常的温柔………${heart(1)}」`,
            );
            await era.printAndWait(
              `「${sc()}在进行各种各样的侍奉的时候…啊啊啊哎呀…只是回忆下而已就已经湿了呢${heart(1)}」`,
            );
            await era.printAndWait(
              `「哎、全部都录下来了？…呀不要不要快点停下啊！」`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
          ) {
            await era.print(`${target_name}开始对着水晶球说出下流的话。`);
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (
            era.get(`abl:${target}:10`) >= 3 ||
            era.get(`abl:${target}:11`) >= 4 ||
            era.get(`abl:${target}:17`) >= 2
          ) {
            await era.print(`${target_name}开始对着水晶球自我介绍。`);
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else {
            await era.printAndWait(
              `什么也不想说的${target_name}在得知水晶球要被送回故乡后吓得脸都绿了。`,
            );
            await era.printAndWait(`「要…要把录像送回故乡………？」`);
            await era.printAndWait(
              `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
            );
          }
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait('');
        } else {
          // 无后缀 PRINTFORM 前缀（%SAVESTR:PLAYER%），与 IF 链首支的收行
          // 同属一行（#622）。各支自带收行，前缀在分支外取值；首支那句把整行写在
          // 一起（拼接锚的槽位序要含 %SAVESTR:PLAYER%）
          const chat_prefix = `一边与${player_name}`;
          // 快感装备（11/13/14/15/16/17 任一）→「快乐的」、:4796 痛苦装备（44/49）
          const equip_pleasure =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const equip_pain =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:85`) ||
              era.get(`abl:${target}:10`) >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              `一边与${player_name}说着情话、${target_name}一边扭动着腰。`,
            );
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) ||
              era.get(`abl:${target}:11`) >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              chat_prefix + `喊着下流的话、${target_name}一边扭动着腰。`,
            );
          } else if (
            (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
              era.get(`abl:${target}:10`) >= 5 ||
              era.get(`talent:${target}:85`) ||
              era.get(`talent:${target}:76`)) &&
            era.get(`palam:${target}:5`) >= PALAMLV[4]
          ) {
            // 原作是一整行：无后缀 PRINTFORM + IF/ELSEIF 的
            // PRINT（互斥两支）+ 收行的 PRINTFORML（#622）
            await era.print(
              chat_prefix +
                `聊天、${target_name}一边发出着` +
                (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +
                `声音、一边拼命地回应着${player_name}。`,
            );
          } else if (era.get(`talent:${target}:76`) === 1) {
            await era.print(
              chat_prefix +
                `在与${player_name}对话着的同时、${target_name}献媚般的依偎了过来。`,
            );
            await era.printAndWait(`「啊嗯…没有色情的情调了吧？」`);
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5
          ) {
            await era.print(
              chat_prefix +
                `${target_name}在很融洽的气氛中与${player_name}说着话。`,
            );
            await era.printAndWait(`「这样平静的说话…还是被抓后的第一次呢…」`);
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[2] ||
            era.get(`abl:${target}:10`) >= 3
          ) {
            await era.print(
              chat_prefix + `${target_name}唯唯诺诺的回应着${player_name}。`,
            );
            await era.printAndWait(`「是、是的…」`);
          } else {
            await era.print(
              chat_prefix + `${target_name}只是认真的听着${player_name}说话…`,
            );
          }
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      chara(target).kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) === 1) {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait('');
        } else {
          await era.print(`${master_name}催促${target_name}进行一下自我介绍。`);
          if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:85`) ||
              era.get(`abl:${target}:10`) >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              `${target_name}一边扭动着腰一边对着水晶球说着情话。`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) ||
              era.get(`abl:${target}:11`) >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              `${target_name}一边扭着腰一边对着水晶球不停喊着下流的话`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (
            rand_n(3) === 0 &&
            (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
          ) {
            // 与 :4747+:4749+:4750 同型（#622）
            const masturbation = era.get(`abl:${target}:31`) >= 3;
            await era.print(
              `于是${target_name}将自己的本名、至今为止的性体验` +
                (masturbation ? `以及自慰时意淫的内容` : '') +
                `津津有味的说了起来……`,
            );
            await era.print(
              `只是想想这个水晶球在故乡公开放映的样子、${target_name}的股间就开始湿了……`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (era.get(`talent:${target}:76`) === 1) {
            await era.print(
              `${target_name}向着水晶球一边做一边开始下流的自我介绍。`,
            );
            await era.printAndWait(
              `「哈…${sc()}原来是勇者${target_name} ${heart(1)}」`,
            );
            await era.printAndWait(
              `「但是狂妄自大的${sc()}总是逞强、在输给怪物后被抓住了………」`,
            );
            await era.printAndWait(
              `「之后…被魔王大人进行调教………堕落了${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}像蛇一样蠕动着身体同时张开了双腿……………`,
            );
            await era.printAndWait(
              `「怎么样啊…${sc()}的身体…没有哪个部分是魔王大人没见过的…${heart(1)}」`,
            );
            await era.printAndWait(
              `「现在…最喜欢被魔王大人那样折磨…强暴…我感觉很…有快感…所以请看吧${heart(1)}」`,
            );
            await era.printAndWait(
              `「${sc()}有多舒服、能稍微了解一点我就很开心了啊${heart(3)}」`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (era.get(`talent:${target}:85`) === 1) {
            await era.printAndWait(
              `${target_name}羞耻的蠕动着身体、兴奋着连录像开始了都没有注意到………`,
            );
            await era.printAndWait(
              `「啊嗯…${sc()}的告白被大家都知道了什么的好羞耻啊……」`,
            );
            await era.printAndWait(
              `「魔王大人被人那样的讨厌…不过其实还是非常的温柔………${heart(1)}」`,
            );
            await era.printAndWait(
              `「${sc()}在进行各种各样的侍奉的时候…啊啊啊哎呀…只是回忆下而已就已经湿了呢${heart(1)}」`,
            );
            await era.printAndWait(
              `「哎、全部都录下来了？…呀不要不要快点停下啊！」`,
            );
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
          ) {
            await era.print(`${target_name}对着水晶球说着下流的话。`);
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else if (
            era.get(`abl:${target}:10`) >= 3 ||
            era.get(`abl:${target}:11`) >= 4 ||
            era.get(`abl:${target}:17`) >= 2
          ) {
            await era.print(`${target_name}对着水晶球进行着自我介绍。`);
            // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）
            game.kojo.录像内容 |= 2;
          } else {
            await era.printAndWait(
              `${target_name}在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。`,
            );
            await era.printAndWait(`「要…要把录像送回故乡………？」`);
            await era.printAndWait(
              `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
            );
          }
        }
      } else {
        if (era_flag.assi > 0 && era_flag.assiplay) {
          await era.printAndWait('');
        } else {
          // 与 :4786-4787 同型（#622）：无后缀 PRINTFORM 前缀与 IF 链首支
          // 的收行同属一行，各支自带收行、前缀在分支外取值
          const chat_prefix = `${player_name}让`;
          // 快感装备（11/13/14/15/16/17 任一）→「快乐的」、:4882 痛苦装备（44/49）
          const equip_pleasure =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const equip_pain =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:85`) ||
              era.get(`abl:${target}:10`) >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              `${player_name}让${target_name}一边扭动着腰一边与${player_name}说着情话。`,
            );
          } else if (
            era.get(`palam:${target}:5`) >= PALAMLV[4] &&
            (era.get(`talent:${target}:76`) ||
              era.get(`abl:${target}:11`) >= 5) &&
            game.event.插着不拔
          ) {
            await era.print(
              chat_prefix +
                `${target_name}一边扭动着腰一边与${player_name}喊着下流的话。`,
            );
          } else if (
            (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
              era.get(`abl:${target}:10`) >= 5 ||
              era.get(`talent:${target}:85`) ||
              era.get(`talent:${target}:76`)) &&
            era.get(`palam:${target}:5`) >= PALAMLV[4]
          ) {
            // 原作是一整行（#622）
            await era.print(
              chat_prefix +
                `${target_name}一边发出着` +
                (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +
                `声音、一边拼命地回应着${player_name}。`,
            );
          } else if (era.get(`talent:${target}:76`) === 1) {
            await era.print(
              chat_prefix +
                `在与${player_name}对话着的同时、${target_name}献媚般的依偎了过来。`,
            );
            await era.printAndWait(
              `「啊啊啊…明明只是普通的话、总觉得气氛变的怪怪的了………」`,
            );
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5
          ) {
            await era.print(
              chat_prefix +
                `${target_name}在很融洽的气氛中与${player_name}说着话。`,
            );
            await era.printAndWait(`「呼呼…这样平静的气氛还能说什么…………」`);
          } else if (
            era.get(`palam:${target}:4`) >= PALAMLV[2] ||
            era.get(`abl:${target}:10`) >= 3
          ) {
            await era.print(
              chat_prefix + `${target_name}唯唯诺诺的回应着${player_name}。`,
            );
            await era.printAndWait(`「是、是的…」`);
          } else {
            await era.print(
              chat_prefix + `${target_name}只是认真的听着${player_name}说话…`,
            );
          }
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 123) {
    if (chara(target).kojo.乳夹口交 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「哈呜…嗯…啊哈…呜…咿…这样…嗯！」`);
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡不断的刺激………`,
        );
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、精心的吸吮着从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊嗯…因为是大乳房所以说很舒服？ 唔呼呼${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啊呜…啾…啾…呼…很高兴能充分的侍奉小鸡鸡呢${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、温柔的吻着从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊啊乳房更加舒服了哦${heart(1)} 满满的侍奉啊${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啊啊嗯…好可爱的小鸡鸡…嘛啾啾…哈啊…会让你更舒服的${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、伸出舌头舔着从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「已经…小鸡鸡这么精神了啊…开始钻出${sc()}的乳房了………」`,
          );
        }
        await era.printAndWait(`「呜哦…嗯哦…咕噜…啾啾…咕噜…嗯…咿、哈…哈………」`);
      } else {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、吻了从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊啊啊…${sc()}的…乳房…被侵犯了………」`);
        }
        await era.printAndWait(`「嘛啊…啾…啾…咕噜…嗯…啾啾………」`);
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      chara(target).kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「哈呜…嗯…啊哈…呜…咿…这样…嗯！」`);
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡不断的刺激………`,
        );
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、精心的吸吮着从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊嗯…因为是大乳房所以说很舒服？ 唔呼呼${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啊呜…啾…啾…呼…很高兴能充分的侍奉小鸡鸡呢${heart(1)}」`,
        );
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        chara(target).kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、温柔的吻着从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「啊啊乳房更加舒服了哦${heart(1)} 满满的侍奉啊${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「啊啊嗯…好可爱的小鸡鸡…嘛啾啾…哈啊…会让你更舒服的${heart(1)}」`,
        );
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        chara(target).kojo.乳夹口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、伸出舌头舔着从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「已经…小鸡鸡这么精神了啊…开始钻出${sc()}的乳房了………」`,
          );
        }
        await era.printAndWait(`「呜哦…嗯哦…咕噜…啾啾…咕噜…嗯…咿、哈…哈………」`);
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        chara(target).kojo.乳夹口交 = 3;
      } else if (chara(target).kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}用两个乳房夹住${player_name}的小鸡鸡、吻了从乳沟里露出来的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「啊啊啊…${sc()}的…乳房…被侵犯了………」`);
        }
        await era.printAndWait(`「嘛啊…啾…啾…咕噜…嗯…啾啾………」`);
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        chara(target).kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 125) {
    if (chara(target).kojo.口交时自慰 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}一边紧紧的揪住${player_name}的小鸡鸡一边开始了自慰。`,
        );
        await era.printAndWait(
          `「啊呜…嗯…嗯哈…一边侍奉着小鸡鸡…一边自慰最棒了啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}被${player_name}命令乖乖的伸出手指到秘裂处、一边自慰一边开始侍奉小鸡鸡。`,
        );
        await era.printAndWait(
          `「啊啊啊…虽然不情愿…不过…也不错…很舒服啊${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}被${player_name}命令就这样一边口交一边开始自慰。`,
        );
        await era.printAndWait(`「啊啊啊…呼…啾…啾啪…嗯哦…嗯嗯${heart(1)}」`);
      } else {
        await era.printAndWait(
          `${target_name}被${player_name}多次命令、有些犹豫的嘴里含着小鸡鸡开始了自慰。`,
        );
        await era.printAndWait(
          `「啊啊啊…这、这么不知羞耻的事情…啊…呜嗯…嗯…啊哈…呜嗯！」`,
        );
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      chara(target).kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}一边紧紧的揪住${player_name}的小鸡鸡一边开始了自慰。`,
        );
        await era.printAndWait(
          `「啊呜…嗯…嗯哈…一边侍奉着小鸡鸡…一边自慰最棒了啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边把小鸡鸡吞进了喉咙的最里面一边继续自慰………`,
        );
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}在${player_name}的命令下碳刷的向秘裂伸出手指、开始一边自慰一边奉仕小鸡鸡。`,
        );
        await era.printAndWait(
          `「啊啊啊…虽然不情愿…不过…也不错…很舒服啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的眼神慢慢融化同时不断的口腔侍奉………`,
        );
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}被${player_name}命令就这样一边口交一边开始自慰。`,
        );
        await era.printAndWait(`「啊啊啊…呼…啾…啾啪…嗯哦…嗯嗯${heart(1)}」`);
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 3;
      } else if (
        chara(target).kojo.口交时自慰 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(
          `${target_name}被${player_name}多次命令、有些犹豫的嘴里含着小鸡鸡开始了自慰。`,
        );
        await era.printAndWait(
          `「啊啊啊…这、这么不知羞耻的事情…啊…呜嗯…嗯…啊哈…呜嗯！」`,
        );
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 126) {
    if (chara(target).kojo.手搓口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈…像这样给你揉也很舒服啊…这里的顶端稍微舔下又怎么样呢？」`,
        );
        await era.printAndWait(
          `${target_name}淫乱的笑着用指头抓住了${player_name}的小鸡鸡、激烈的套弄起来同时用嘴含住了龟头………`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}用融化了的瞳孔仰望着${player_name}的小鸡鸡用双手套弄起来同时用嘴含住了龟头。`,
        );
        await era.printAndWait(`「啊啊啊…请充分的享受吧…${heart(1)}」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        );
        await era.printAndWait(
          `「嘛啾啾…咕啦…哈啊啊………这里被摩擦…最喜欢了啊${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        );
        await era.printAndWait(`「哈…啊啊啊…嗯…小鸡鸡开始颤抖了…啊啊啊」`);
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      chara(target).kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…像这样给你揉也很舒服啊…这里的顶端稍微舔下又怎么样呢？」`,
        );
        await era.printAndWait(
          `${target_name}淫乱的笑着用指头抓住了${player_name}的小鸡鸡、激烈的套弄起来同时用嘴含住了龟头。`,
        );
        await era.printAndWait(
          `「啊哈呼呜…顶到稍微有点抽搐了…真的非常可爱${heart(1)} 啊～…哈呜咕噜…啾呜呜${heart(1)}」`,
        );
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用融化了的瞳孔仰望着${player_name}的小鸡鸡用双手套弄起来同时用嘴含住了龟头。`,
        );
        await era.printAndWait(`「啊啊啊…请充分的享受吧…${heart(1)}」`);
        await era.printAndWait(
          `「手和嘴巴…色色的发热了…脑袋了一片浆糊${heart(1)}」`,
        );
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        );
        await era.printAndWait(
          `「嘛啾啾…咕啦…哈啊啊………这里被摩擦…最喜欢了啊${heart(1)}」`,
        );
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 3;
      } else if (chara(target).kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}用嘴吸吮着${player_name}的龟头、双手开始套弄起小鸡鸡。`,
        );
        await era.printAndWait(`「哈哈…啊呜…啾啾…咕噜…呼${heart(1)}」`);
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 127) {
    if (chara(target).kojo.真空口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}高兴的吸住了${player_name}的小鸡鸡、一边发出下流的声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(
          `「嗯呜…嗯啾噜啾噜………啾吧啾噜啾啾啾呜呜呜呜${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}眯着眼睛吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(
          `「呜咕…嗯啾噜…啾啪…啾噜嗯嗯啾呜嗯啾呜呜${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}用嘴唇夹住了${player_name}的小鸡鸡一边发出声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(`「啾噜…啾啾…呼呼…啾呜嗯」`);
      } else {
        await era.printAndWait(
          `${target_name}流着眼泪吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(`「呜咕…嗯咕…啾噜」`);
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      chara(target).kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}高兴的吸住了${player_name}的小鸡鸡、一边发出下流的声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(
          `「嗯呜…嗯啾噜啾噜………啾吧啾噜啾啾啾呜呜呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `「…噗哈…啊啊嗯…这样满满的射进来是${sc()}的一切啊${heart(1)}」`,
        );
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}眯着眼睛吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(
          `「呜咕…嗯啾噜…啾啪…啾噜嗯嗯啾呜嗯啾呜呜${heart(1)}」`,
        );
        await era.printAndWait(
          `「嗯哈…前列腺液…还有精液…大家${sc()}吃饱了${heart(1)}」`,
        );
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用嘴唇夹住了${player_name}的小鸡鸡一边发出声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(`「啾噜…啾啾…呼呼…啾呜嗯」`);
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 3;
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}流着眼泪吸住了${player_name}的小鸡鸡、一边发出声音一边开始用力的吸了起来。`,
        );
        await era.printAndWait(`「呜咕…嗯咕…啾噜」`);
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 69) {
    if (chara(target).kojo.六九式 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}的秘裂每次有快感都会逃开、双唇强烈的夹紧小鸡鸡。`,
        );
        await era.printAndWait(
          `「呼…不要再戏弄我了…这样没办法再侍奉了啦…啊嗯啊啊啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}一边忍受着秘裂传来的快感一边吸吮着小鸡鸡。`,
        );
        await era.printAndWait(
          `「啊哈…嗯嗯呼…啊啊啊…讨厌啦${heart(1)}真是讨厌啦${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}在秘裂的快感下发出娇吟。`,
        );
        await era.printAndWait(
          `「呀哈…不、不行了…再被戏弄的话…啊啊啊啊啊嗯！」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}一边忍受着秘裂传来的快感一边扭着屁股。`,
        );
        await era.printAndWait(`「咕呼…啊啊咿…停、停下吧………咿啊啊！」`);
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      chara(target).kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}的秘裂每次有快感都会逃开、双唇强烈的夹紧小鸡鸡。`,
        );
        await era.printAndWait(
          `「呼～…不要再戏弄我了…这样没办法再侍奉了啦…啊嗯啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「已经…回报你了呦…啊嗯…哈呜…啾啾${heart(1)} 咕噜…啾呜呜」`,
        );
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}一边忍受着秘裂传来的快感一边吸吮着小鸡鸡。`,
        );
        await era.printAndWait(
          `「啊哈…嗯嗯呼…啊啊啊…讨厌啦${heart(1)}真是讨厌啦${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊啊…必须吮吸小鸡鸡么…啊哈嗯${heart(1)}」`);
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}在秘裂的快感下发出娇吟。`,
        );
        await era.printAndWait(
          `「呀哈…不、不行了…再被戏弄的话…啊啊啊啊啊嗯！」`,
        );
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 3;
      } else if (chara(target).kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}和${player_name}用嘴贪婪的吻着彼此的股间。${target_name}一边忍受着秘裂传来的快感一边扭着屁股。`,
        );
        await era.printAndWait(`「咕呼…啊啊咿…停、停下吧………咿啊啊！」`);
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 124) {
    if (chara(target).kojo.深喉 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、用双唇夹紧了根部。`,
        );
        await era.printAndWait(`「嗯呜…啊哈…嗯啾噜…啾咕嗯${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、舌头开始紧贴着动了起来。`,
        );
        await era.printAndWait(
          `「呜咕…嗯啾噜${heart(1)} 嗯哦…咕啾…咕啾…${heart(1)}」`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        );
        await era.printAndWait(`「呜咕…嗯咕…啊哈嗯…嗯嗯嗯呜！」`);
      } else {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        );
        await era.printAndWait(`「啊哈…呜嗯…呜啾…嗯呜！？」`);
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      chara(target).kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、用双唇夹紧了根部。`,
        );
        await era.printAndWait(`「嗯呜…啊哈…嗯啾噜…啾咕嗯${heart(1)}」`);
        await era.printAndWait(
          `（${sc()}的喉咙啊…是小鸡鸡的容器啊…${heart(1)}）`,
        );
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡吸进了喉咙的最里面、舌头开始紧贴着动了起来。`,
        );
        await era.printAndWait(
          `「呜咕…嗯啾噜${heart(1)} 嗯哦…咕啾…咕啾…${heart(1)}」`,
        );
        await era.printAndWait(`（就这样…在喉咙的深处射精吧…${heart(1)}）`);
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        );
        await era.printAndWait(`「呜咕…嗯咕…啊哈嗯…嗯嗯嗯呼呜！」`);
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 3;
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}把${player_name}的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。`,
        );
        await era.printAndWait(
          `「呜咕！？嗯…噗…呜嗯…嗯嗯…嗯嗯嗯～～～～！？」`,
        );
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 80) {
    if (chara(target).kojo.强制口交 === 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「呼～…嗯…呜嗯♪…嗯呜…♪」`);
        await era.printAndWait(
          `${target_name}用喉咙的最里面接受了${player_name}的小鸡鸡………`,
        );
      } else {
        await era.printAndWait(`「咕…嗯…嗯咕…嗯…呼嗯嗯！呜嗯…嗯～！」`);
        await era.printAndWait(
          `${target_name}忍耐着每次被${player_name}插进喉咙的最里面都像快要窒息了一样的感觉………`,
        );
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      chara(target).kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯哦…呜咕…啊哈嗯…嗯…噗…嗯咕呜嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}被激烈的侵犯${player_name}喉咙的最里面的同时也感到了快感。`,
        );
        await era.printAndWait(
          `「啊…${sc()}的喉咙已经…是为了取悦小鸡鸡而存在的了${heart(1)}…嗯哦…哦…嗯呼嗯嗯${heart(1)}」`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哈…嗯♪…嗯咕…嗯嗯呼♪」`);
        await era.printAndWait(
          `${target_name}被${player_name}的小鸡鸡侵犯着喉咙的最里面的时候发出了喜悦的声音………`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哈嗯…嗯…嗯…咿咕♪…啊哈啊哈嗯～♪」`);
        await era.printAndWait(
          `${target_name}一边被${player_name}侵犯着喉咙的最里面一边熟练的牙齿离开小鸡鸡用舌头那样缠绕着舔了起来………`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 3;
      } else if (chara(target).kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯…嗯呜咿…嗯咕…嗯…咕呼…咕…呜呜呜～！」`);
        await era.printAndWait(
          `${target_name}用喉咙的最里面接受了${player_name}的小鸡鸡………`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 87) {
    const P = piercing_state.p;

    if (chara(target).kojo.穿环 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}感受到肌肤被第一次穿环的痛苦不禁皱起了脸。`,
          );

          if (P === 1) {
            await era.printAndWait(
              `「咿…啊啊啊…乳头能戴上这么漂亮的环真是好棒啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为这种地方能被穿上两个环而高兴………`,
            );
          } else if (P === 2) {
            await era.printAndWait(
              `「啊哈…肚脐戴上这个显得好时尚啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为被穿上环而高兴………`,
            );
          } else if (P === 4) {
            await era.printAndWait(
              `「啊…这样的地方要是被穿上环…就能一直永远的感受到主人了…${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为阴唇能穿上环而高兴………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「哈啊…被穿环好兴奋感觉小鸡鸡都比平时变大了似的…${heart(1)}」`,
              );
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为小鸡鸡能穿上环而高兴………`,
              );
            } else {
              await era.printAndWait(
                `「这样的地方能得到环什么的…感觉太强烈了呜…${heart(1)}」`,
              );
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为阴蒂能穿上环而高兴………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「啊哎…就这样给你满满的口交啊${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为舌尖能穿上环而高兴………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「嗯…唔呼呼…就这样想要满满的接吻哟…」`);
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「啊哈…${sc()}好像变成了家畜一样…」`);
            await era.printAndWait(`${target_name}一再抚摩着鼻环………`);
          }
        } else {
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`);
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}感受到肌肤被第一次穿环的痛苦发出了细小的悲鸣。`,
          );

          if (P === 1) {
            await era.printAndWait(
              `「虽、虽然很痛…如果这样能让主人高兴…${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}两个乳头环紧紧的嵌了进去………`);
          } else if (P === 2) {
            await era.printAndWait(`「唔呼呼、总觉得好漂亮…♪」`);
            await era.printAndWait(`${target_name}从四周抚摩着肚脐环………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「哈哈…好厉害…这样的地方要是被穿上环…已经…已经…！」`,
            );
            await era.printAndWait(
              `${target_name}对阴唇被穿环表现的相当兴奋………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「啊呜…小鸡鸡一直勃起着了啊………」`);
              await era.printAndWait(
                `${target_name}一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………`,
              );
            } else {
              await era.printAndWait(
                `「啊…这样的地方被穿上环很有爱的感觉啊………♪」`,
              );
              await era.printAndWait(`${target_name}兴奋的红着脸………`);
            }
          } else if (P === 16) {
            await era.printAndWait(`「哈哈…就这样想满满的吻…呦…♪」`);
            await era.printAndWait(
              `${target_name}伸出穿了环的舌头诱惑着${player_name}………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「啊哈…固固的固定下来了…♪」`);
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「总、总觉得像家畜一样……哎呀………♪」`);
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}寂寞的揉着环被拆下后留下的痕迹………`,
          );
        }
      } else {
        if (chara(target).train.穿环状态 & P) {
          await era.printAndWait(
            `${target_name}感受到肌肤被第一次穿环的痛苦发出了悲鸣。`,
          );

          if (P === 1) {
            await era.printAndWait(`「讨厌啊…乳头好痛呦…对于穿环什么的哟………」`);
            await era.printAndWait(
              `感受到乳头被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「哈…啊啊…这样的………」`);
            await era.printAndWait(
              `感受到肚脐被穿环的痛苦${target_name}不停的流着眼泪………`,
            );
          } else if (P === 4) {
            await era.printAndWait(`「不要…已经…不能去见其他人了………」`);
            await era.printAndWait(
              `感受到阴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「嗯嗯…小鸡鸡会…好热…好痛呦………」`);
              await era.printAndWait(
                `感受到小鸡鸡被穿环的痛苦${target_name}流下了眼泪………`,
              );
            } else {
              await era.printAndWait(
                `「已、已经饶了我吧…不管什么都可以…取想这个环吧………」`,
              );
              await era.printAndWait(
                `感受到阴蒂被穿环的痛苦${target_name}不停的流着眼泪………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「哈…哈…这样…在那里………」`);
            await era.printAndWait(
              `感受到舌头被穿环的痛苦${target_name}好像很难说话………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呜…在那里………」`);
            await era.printAndWait(
              `感受到嘴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            );
          } else if (P === 64) {
            await era.printAndWait(
              `「${sc()}这个样子不是家畜是什么啊…呜呜………」`,
            );
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`);
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      chara(target).kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「咿…啊啊啊…能被在乳头上穿环什么的…${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为这种地方能被穿上两个环而高兴………`,
            );
          } else if (P === 2) {
            await era.printAndWait(
              `「啊哈…肚脐戴上这个显得好时尚啊…${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起穿孔的疼痛${target_name}更为被穿上环而高兴………`,
            );
          } else if (P === 4) {
            await era.printAndWait(
              `「啊…这样的地方要是被穿上环…就能一直永远的感受到主人了…${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为阴唇能穿上环而高兴………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「哈啊…被穿环好兴奋感觉小鸡鸡都比平时变大了似的…${heart(1)}」`,
              );
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为小鸡鸡能穿上环而高兴………`,
              );
            } else {
              await era.printAndWait(
                `「这样的地方能得到环什么的…感觉太强烈了呜…${heart(1)}」`,
              );
              await era.printAndWait(
                `相比起被穿孔的疼痛${target_name}更为阴蒂能穿上环而高兴………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「啊哎…就这样给你满满的口交啊${heart(1)}」`,
            );
            await era.printAndWait(
              `相比起被穿孔的疼痛${target_name}更为舌尖能穿上环而高兴………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「嗯…唔呼呼…就这样想要满满的接吻哟…」`);
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「啊哈…${sc()}好像变成了家畜一样…」`);
            await era.printAndWait(`${target_name}一再抚摩着鼻环………`);
          }
        } else {
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`);
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        chara(target).kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(
              `「虽、虽然很痛…如果这样能让主人高兴…${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}两个乳头环紧紧的嵌了进去………`);
          } else if (P === 2) {
            await era.printAndWait(`「唔呼呼、总觉得好漂亮…♪」`);
            await era.printAndWait(`${target_name}从四周抚摩着肚脐环………`);
          } else if (P === 4) {
            await era.printAndWait(
              `「哈哈…好厉害…这样的地方要是被穿上环…已经…已经…！」`,
            );
            await era.printAndWait(
              `${target_name}对阴唇被穿环表现的相当兴奋………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「啊呜…小鸡鸡一直勃起着了啊………」`);
              await era.printAndWait(
                `${target_name}一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………`,
              );
            } else {
              await era.printAndWait(
                `「啊…这样的地方被穿上环很有爱的感觉啊………」`,
              );
              await era.printAndWait(`${target_name}兴奋的红着脸………`);
            }
          } else if (P === 16) {
            await era.printAndWait(`「哈哈…就这样想满满的吻…呦…♪」`);
            await era.printAndWait(
              `${target_name}伸出穿了环的舌头诱惑着${player_name}………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「啊哈…固固的固定下来了…♪」`);
            await era.printAndWait(
              `${target_name}舔着嘴唇上的环确认了一下情况………`,
            );
          } else if (P === 64) {
            await era.printAndWait(`「总、总觉得像家畜一样……哎呀………♪」`);
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸………`,
            );
          }
        } else {
          await era.printAndWait(
            `${target_name}寂寞的揉着环被拆下后留下的痕迹………`,
          );
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        chara(target).kojo.穿环 = 3;
      } else if (chara(target).kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        if (chara(target).train.穿环状态 & P) {
          if (P === 1) {
            await era.printAndWait(`「讨厌啊…乳头好痛呦…对于穿环什么的哟………」`);
            await era.printAndWait(
              `感受到乳头被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「哈…啊啊…这样的………」`);
            await era.printAndWait(
              `感受到肚脐被穿环的痛苦${target_name}不停的流着眼泪………`,
            );
          } else if (P === 4) {
            await era.printAndWait(`「不要…已经…不能去见其他人了………」`);
            await era.printAndWait(
              `感受到阴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「嗯嗯…小鸡鸡会…好热…好痛呦………」`);
              await era.printAndWait(
                `感受到小鸡鸡被穿环的痛苦${target_name}流下了眼泪………`,
              );
            } else {
              await era.printAndWait(
                `「已、已经饶了我吧…什么都可以…取想这个环吧………」`,
              );
              await era.printAndWait(
                `感受到阴蒂被穿环的痛苦${target_name}不停的流着眼泪………`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「哈…哈…这样…在那里………」`);
            await era.printAndWait(
              `感受到舌头被穿环的痛苦${target_name}好像很难说话………`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呜…在那里………」`);
            await era.printAndWait(
              `感受到嘴唇被穿环的痛苦${target_name}流下了屈辱的眼泪………`,
            );
          } else if (P === 64) {
            await era.printAndWait(
              `「${sc()}这个样子不是家畜是什么啊…呜呜………」`,
            );
            await era.printAndWait(
              `${target_name}不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}揉着环被拆下后留下的痕迹………`);
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        chara(target).kojo.穿环 = 2;
      }
    }
    return 0;
  }

  return 0;
}

// @DOG_KOJO_1
async function dog_kojo_1(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const master_name = chara_name(MASTER);
  const sc = () => self_call(target);

  if (era_flag.selectcom === 0) {
    if (chara(target).kojo.爱抚 === 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「这样、狗的舌头……」`);
      } else {
        await era.printAndWait(`「讨厌啊！　不要靠过来！」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      chara(target).kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊哈、好舒服哦${heart(1)}　更多的舔吧」`);
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不可思议的感觉……」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不可思议的感觉……」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呜……皮肤、变敏感了……」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哎、哎呀！」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「天啊……救命啊……」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (chara(target).kojo.舔阴 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      chara(target).kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 3;
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (chara(target).kojo.胸爱抚 === 0) {
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      chara(target).kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 3;
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if (chara(target).kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else if (chara(target).kojo.接吻 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 3;
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (chara(target).kojo.舔肛 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      chara(target).kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 3;
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (chara(target).kojo.背后位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「好吧……来了！　狗狗那样的姿势、成为一只真正的母狗！　${sc()}的、的处女就献给动物了！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「${sc()}、简直就像是变态一样吧……」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「这种变态一样的行为……」`);
        } else {
          await era.printAndWait(`「咿、讨厌啊！　饶了我……停下吧！！」`);
        }
      } else {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(
            `「哈、交尾！　母狗那样的姿势、真的交尾了！　哈、汪！　汪汪！」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「狗的小鸡鸡、和普通的完全不同……」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「狗的小鸡鸡……怪怪的感觉」`);
        } else {
          await era.printAndWait(`「讨厌、讨厌啊……停下吧！　饶了我吧！」`);
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      chara(target).kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「哈、交尾！　母狗那样的姿势、真的交尾了！　哈、汪！　汪汪！」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「变成动物了！　变态的${sc()}是、是一只母狗！」`,
          );
        } else {
          await era.printAndWait(
            `「我爱……动物的小鸡鸡、变态的……母狗、好喜欢动物的小鸡鸡啊……」`,
          );
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「狗的小鸡鸡、插穿了……不要紧吧」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「狗的小鸡鸡、插穿了……不要紧吧」`);
        } else {
          await era.printAndWait(`「狗的小鸡鸡、插穿了……不要紧吧」`);
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「狗的小鸡鸡……总觉得绝望了」`);
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「狗的小鸡鸡……总觉得绝望了」`);
        } else {
          await era.printAndWait(`「狗的小鸡鸡……总觉得绝望了」`);
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呜……有感觉了……明明是野兽……」`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呜……指甲抓到好痛啊……」`);
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 3;
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「咿、不要、哎呀！　讨厌！！」`);

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (chara(target).kojo.背后位肛交 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait(`「用菊花做吗……好的、已经准备好了哦……♪」`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「明白了……用菊花就可以了对吧？」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「明白了……用菊花就可以了对吧？」`);
      } else {
        await era.printAndWait(`「什么、这样子……哪里搞错了吧……」`);
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      chara(target).kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯…呃……要变成畜生肉棒的形状了……菊花要变成狗专用的了……♪」`,
          );
        } else {
          await era.printAndWait(`「嗯…哦哦……菊花被畜生肉棒弄得要去了……啊♪」`);
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「竟然因为狗……有感觉了……要去……了」`);
        } else {
          await era.printAndWait(`「不要啊……不要继续了、不想变成变态……啊」`);
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「菊花感觉好奇怪……到底怎么了……」`);
        } else {
          await era.printAndWait(`「竟然因为狗……」`);
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不要……要被狗……把菊花玩坏了……」`);
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯…啊啊啊……不要……不要继续对${sc()}做这种变态的事了……」`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 3;
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(`「好痛……好苦……呜……」`);
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if (chara(target).kojo.手淫 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「呜哇……竟然一跳一跳的呢……」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「呜哇……竟然一跳一跳的呢……」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「呜呜……只要做就好了吧……」`);
      } else {
        await era.printAndWait(`「呜呜……脏兮兮的……好臭……」`);
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      chara(target).kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「啊啊……这个野兽的雄臭……在脑子里回荡呢」`);
        } else {
          await era.printAndWait(`「舒服吗？　更加激烈一点了哟♪」`);
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「奇怪的感觉……」`);
        } else {
          await era.printAndWait(`「奇怪的感觉……」`);
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「奇怪的感觉……」`);
        } else {
          await era.printAndWait(`「奇怪的感觉……」`);
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「奇怪的感觉……」`);
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「我做……我做就好了吧……」`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 3;
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜恶……脏死了……」`);
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if (chara(target).kojo.口交_奴 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「拿、拿出勇气来……」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「拿、拿出勇气来……」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「不行……做不到啦……」`);
      } else {
        await era.printAndWait(`「不要……不要啊！」`);
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      chara(target).kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「犬大人的狗肉棒、好好吃……♪　野兽的味道、好浓烈♪」`,
        );
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呼……咻唔……」`);
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呼……咻唔…」`);
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜呼……咻唔……」`);
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「做不到……做不到的啦……！」`);
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 3;
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「呜恶……」`);
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (chara(target).kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      chara(target).kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait('');
        } else if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.print('');
        } else if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait('');
        } else if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) === 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 3;
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if (chara(target).kojo.肛门侍奉 === 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「明白了啦……唔……真、要这样吗？」`);
      } else {
        await era.printAndWait(`「不、不是吧？　真、要这样吗？」`);
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      chara(target).kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「来让我亲一口……骗你的。啾♪」`);
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「明白了……会好好服侍的」`);
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.print(`「明白了……会好好服侍的」`);
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这也是服侍的一种……吗」`);
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 3;
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「骗人的吧……不、不要啊……」`);
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (chara(target).kojo.眼罩 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      chara(target).kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (chara(target).kojo.眼罩 <= 9 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 10;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 3;
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        chara(target).kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    if (
      era.get(`talent:${target}:136`) === 1 &&
      (chara(target).kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 4;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (chara(target).kojo.肛门侍奉 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 2;
    } else if (chara(target).kojo.兽奸眼罩 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('');
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      chara(target).kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (chara(target).kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`)) {
        await era.print(`${master_name}催促着${target_name}开始自我介绍、`);
        if (era.get(`talent:${target}:136`) === 1) {
          await era.print(
            `${target_name}对着水晶球用像卑猥的哈巴狗那样的姿势开始自我介绍。`,
          );
          await era.printAndWait(
            `「初次见面请多关照！　${target_name}呢。放弃了继续作为${get_look_info(target, '种族')}的一员！」`,
          );
          // 原作是一整行：无后缀 PRINTFORM + IF/ELSE 的
          // PRINT（互斥两支）+ 收行的 PRINTFORMW（#622）
          await era.printAndWait(
            `「现在是优秀的` +
              (chara(target).chara.结婚对象 === 900 ? `狗的妻子` : `母狗`) +
              `！快乐的作为家畜生活着${heart(1)}」`,
          );
          await era.printAndWait(
            `「这样变态的交尾姿势还真是对不起呢。但是${sc()}很幸福哟」`,
          );
          await era.printAndWait(
            `「请看吧${sc()}真的交尾喽、小鸡鸡叽咕叽咕的做吧${heart(1)}」`,
          );
          // 原作是一整行：无后缀
          // PRINTFORM + IF/ELSEIF 的 PRINT（互斥六支）+ 收行的 PRINTFORMW（#622）。
          // 判据提到语句外当条件、文本留在输出语句里
          const former_life = era.get(`talent:${target}:成为勇者前的生活`);
          await era.printAndWait(
            `「在最后` +
              (former_life === 1
                ? `同班同学的大家`
                : former_life === 2
                  ? `修道院的大家`
                  : former_life === 15 || former_life === 18
                    ? `在${sc()}的店里消费过的客人`
                    : former_life === 19
                      ? `部下的大家`
                      : former_life === 21
                        ? `最重要的你`
                        : `爸爸、妈妈`) +
              `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          // 原作是一整行：无后缀 PRINTFORM + SIF 的 PRINTFORM
          // + 收行的 PRINTFORML（#622）。SIF 判据提到语句外当条件、文本留在语句里
          const masturbation = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验` +
              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +
              `高兴地开始津津有味的说了起来……`,
          );
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          // 与 :6374+:6376+:6377 同型（#622）
          const masturbation = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验` +
              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +
              `开始高兴地讲着……`,
          );
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          );
        } else {
          await era.printAndWait(
            `${target_name}在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。`,
          );
          await era.printAndWait(`「要…要把录像送回故乡………？」`);
          await era.printAndWait(
            `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
          );
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      chara(target).kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) === 1 &&
          (chara(target).kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.print(
            `${target_name}对着水晶球用像卑猥的哈巴狗那样的姿势开始自我介绍。`,
          );
          await era.printAndWait(
            `「大家好！　${target_name}呢。放弃了继续作为${get_look_info(target, '种族')}的一员！」`,
          );
          // 与 :6341+:6344+:6346+:6348 同型（#622）
          await era.printAndWait(
            `「现在是优秀的` +
              (chara(target).chara.结婚对象 === 900 ? `狗的妻子` : `母狗`) +
              `、快乐的作为家畜生活着${heart(1)}」`,
          );
          await era.printAndWait(
            `「这样变态的交尾姿势还真是对不起呢。但是${sc()}很幸福哟」`,
          );
          await era.printAndWait(
            `「请看吧${sc()}真的交尾喽、小鸡鸡叽咕叽咕的做吧${heart(1)}」`,
          );
          // 与
          // 同型（#622）
          const former_life = era.get(`talent:${target}:成为勇者前的生活`);
          await era.printAndWait(
            `「在最后` +
              (former_life === 1
                ? `同班同学的大家`
                : former_life === 2
                  ? `修道院的大家`
                  : former_life === 15 || former_life === 18
                    ? `在${sc()}的店里消费过的客人`
                    : former_life === 19
                      ? `部下的大家`
                      : former_life === 21
                        ? `最重要的你`
                        : `爸爸、妈妈`) +
              `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,
          );
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (chara(target).kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          // 与 :6374+:6376+:6377 同型（#622）
          const masturbation = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验` +
              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +
              `高兴地开始津津有味的说了起来……`,
          );
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          );
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (chara(target).kojo.交谈 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // 与 :6374+:6376+:6377 同型（#622）
          const masturbation = era.get(`abl:${target}:31`) >= 3;
          await era.print(
            `${target_name}说出了自己的本名和至今为止关于性的体验` +
              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +
              `高兴地开始津津有味的说了起来……`,
          );
          await era.print(
            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,
          );
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 3;
        } else if (chara(target).kojo.交谈 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(
            `${target_name}在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。`,
          );
          await era.printAndWait(`「要…要把录像送回故乡………？」`);
          await era.printAndWait(
            `「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」`,
          );
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          chara(target).kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  return 0;
}

// @KOJO_MESSAGE_PALAMCNG_1
async function kojo_message_palamcng_1() {
  const target = era_flag.target;
  const player = era_flag.player;
  const target_name = chara_callname(target);
  const player_name = chara_callname(player);
  const sc = () => self_call(target);
  let P = 0;

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }

  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }

  P = (era.get(`palam:${target}:3`) || 0) + (era.get(`delta:${target}:3`) || 0);
  if (P > PALAMLV[2] && chara(target).kojo.首次润滑Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「呜哇…好厉害…这样的…」`);
        await era.printAndWait(`―――第一次润滑超过了LV 2`);
      } else {
        await era.printAndWait(`「啊…不、不要…${sc()}、好像非常兴奋啊…」`);
        await era.printAndWait(`―――第一次润滑超过了LV 2`);
      }
    } else {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「呜哇…太滑了…」`);
        await era.printAndWait(`―――第一次润滑超过了LV 2`);
      } else {
        await era.printAndWait(`「咿嗯…咿、不、不一样的…这、这是…」`);
        await era.printAndWait(`―――第一次润滑超过了LV 2`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    chara(target).kojo.首次润滑Lv2 = 1;
  }

  P = (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0);
  if (P > PALAMLV[2] && chara(target).kojo.首次欲情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「咿…身体…咿…好热…这样的…啊啊啊」`);
        await era.printAndWait(`―――第一次欲情超过了LV 2`);
      } else {
        await era.printAndWait(`「哈…哈…${sc()}、${sc()}…哦嗯！」`);
        await era.printAndWait(`―――第一次欲情超过了LV 2`);
      }
    } else {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(
          `「这、这样…总觉得…身体…好怪异…咿…不一样的…不一样的啊………」`,
        );
        await era.printAndWait(`―――第一次欲情超过了LV 2`);
      } else {
        await era.printAndWait(`「哈…啊啊…啊啊…想要…好想要…啊…」`);
        await era.printAndWait(`―――第一次欲情超过了LV 2`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    chara(target).kojo.首次欲情Lv2 = 1;
  }

  P = (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0);
  if (P > PALAMLV[2] && chara(target).kojo.首次耻情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「不行了…不要看…求你不要看啊……」`);
      await era.printAndWait(`―――第一次耻情超过了LV 2`);
    } else {
      await era.printAndWait(`「啊啊啊…羞死了………」`);
      await era.printAndWait(`―――第一次耻情超过了LV 2`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    chara(target).kojo.首次耻情Lv2 = 1;
  }

  P =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0);
  if (P > PALAMLV[2] && chara(target).kojo.首次恐怖Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「求你了…停下吧…………」`);
      await era.printAndWait(`―――第一次恐怖超过了LV 2`);
    } else {
      await era.printAndWait(`「咿…咿嗯！」`);
      await era.printAndWait(`―――第一次恐怖超过了LV 2`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    chara(target).kojo.首次恐怖Lv2 = 1;
  }

  if (
    (era.get(`nowex:${target}:0`) || 0) > 0 &&
    chara(target).kojo.首次C绝顶 === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「咿呀啊啊！…那里再这么玩弄不行哦！」`);
      await era.printAndWait(`显然${target_name}是第一次被刺激阴蒂绝顶吧。`);
    } else {
      await era.printAndWait(`「咕…咿咿！？」`);
      await era.printAndWait(`显然${target_name}是第一次被刺激阴蒂绝顶吧。`);
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    chara(target).kojo.首次C绝顶 = 1;
  }

  if (
    (era.get(`nowex:${target}:1`) || 0) > 0 &&
    chara(target).kojo.首次V绝顶 === 0
  ) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「啊啊啊…小穴来了…啊啊啊…来了来了啊…你在做什么啦！」`,
      );
      await era.printAndWait(
        `「呜咿…啊啊啊啊啊啊啊啊啊哈啊啊啊啊啊啊咿～～！！！」`,
      );
      await era.printAndWait(
        `${target_name}第一次用阴道高潮了、脸上露出幸福的潮红………`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「不行了不行了！不要再这么欺负小穴了！」`);
      await era.printAndWait(`「啊呀！呀…啊啊啊…呀呀！那样呜呜呜！」`);
      await era.printAndWait(
        `${target_name}的阴道第一次绝顶…紧闭着眼睛要忍耐什么一样浑身发抖………`,
      );
    } else {
      await era.printAndWait(`「小穴…要坏掉了…坏掉了呜…已经、饶了我…咿～！」`);
      await era.printAndWait(
        `${target_name}的阴道第一次绝顶…把高潮的身体交给了${player_name}………`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    chara(target).kojo.首次V绝顶 = 1;
  }

  if (
    (era.get(`nowex:${target}:2`) || 0) > 0 &&
    chara(target).kojo.首次A绝顶 === 0
  ) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「哦哦…肛门好热啊…融化了呜嗯${heart(1)}」`);
      await era.printAndWait(`「啊呀啊啊啊…肛门要变成屁股小穴了呜嗯！」`);
      await era.printAndWait(
        `${target_name}第一次用肛门绝顶了、这种快乐再也无法忘记了吧………`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊啊啊啊…屁股小穴…不要再欺负了」`);
      await era.printAndWait(`「咿嗯！肛门融化了呜呜呜！」`);
      await era.printAndWait(
        `${target_name}第一次用肛门绝顶了、羞耻的颤抖着身体………`,
      );
    } else {
      await era.printAndWait(`「求你了…不行了…再被欺负的话…啊啊啊！」`);
      await era.printAndWait(`「屁股小穴…变成笨蛋了呜呜！」`);
      await era.printAndWait(
        `${target_name}第一次用肛门绝顶了、暴露出了从嘴里流着口水的可耻的样子………`,
      );
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    chara(target).kojo.首次A绝顶 = 1;
  }

  if (
    (era.get(`nowex:${target}:3`) || 0) > 0 &&
    chara(target).kojo.首次B绝顶 === 0
  ) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「啊…啊啊啊咕嗯嗯…乳房…乳房好棒…更多…还要更多♪」`,
      );
      await era.printAndWait(`「啊啊啊啊♪…好爽哦…融化了…融化了呜…」`);
      await era.printAndWait(`${target_name}在乳房的刺激下第一次绝顶了………`);
    } else {
      await era.printAndWait(
        `「咿这样不行了不行了！乳房被玩弄了…啊不行了哇！」`,
      );
      await era.printAndWait(`${target_name}在乳房的刺激下第一次绝顶了………`);
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    chara(target).kojo.首次B绝顶 = 1;
  }

  const A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0);
  if (game.train.处女丧失 === 1 && chara(target).kojo.处女丧失 === 0) {
    if (game.train.主人导致处女丧失 === 1) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(`「啊哈…贞洁奉献给主人了啊…${heart(1)}」`);
        await era.printAndWait(
          `「从今往后啊…这里更多的…给我调教吧${heart(1)}」`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(`「唔呼呼…原勇者的处女的味道怎么样呢…？」`);
        await era.printAndWait(`「这样${sc()}就是…主人的东西了…♪」`);
      } else {
        await era.printAndWait(`「哈…哈…咕…好痛…咿…停、停止吧…哎………」`);
        await era.printAndWait(`坚强的${target_name}也被破瓜疼的洒了眼泪………`);
      }
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊…终于失去了贞洁了啊…唔呼呼…不过那样的事无论如何都好………」`,
        );
        await era.printAndWait(
          `「${sc()}的淫乱小穴…想要更多的调教…想要变的更加堕落…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊…这个贞洁…我认为就是为了能被主人的小鸡鸡夺走………」`,
        );
        await era.printAndWait(`${target_name}很可惜似的嘟哝着………`);
      } else {
        await era.printAndWait(`「啊…啊啊啊…痛……好痛啊………」`);
        await era.printAndWait(`坚强的${target_name}也被破瓜疼的洒了眼泪………`);
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    chara(target).kojo.处女丧失 = 1;
  }
}

// @KOJO_MESSAGE_MARKCNG_1
async function kojo_message_markcng_1() {
  const target = era_flag.target;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`)) {
    return 0;
  }

  if (game.train.失神) {
    return 0;
  }

  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }

  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }

  if (game.system.苦痛刻印变动 === 3 && chara(target).kojo.苦痛刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊…咕…这、这样的…完全没关系…总觉得…」`);
    } else {
      await era.printAndWait(`「啊啊啊…再…痛…啊」`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    chara(target).kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 === 3 && chara(target).kojo.快乐刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「嗯…呼…主人啊…舒服…的动不了了………」`);
    } else {
      await era.printAndWait(`「咿…咿…咿…太舒服了…不要碰啊！」`);
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    chara(target).kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 === 3 && chara(target).kojo.屈服刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「主人…效忠…我发誓…」`);
    } else {
      await era.printAndWait(`「已、已经…不能违抗…不能违抗了哈呀………」`);
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    chara(target).kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 === 3 && chara(target).kojo.反抗刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「咕…嗯嗯…为什么要…做这种事情…………不能原谅」`);
    } else {
      await era.printAndWait(`「哇…呼…一、一定会杀了你………」`);
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    chara(target).kojo.反抗刻印Lv3 = 1;
  }
}

// @SELF_KOJO_K1
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
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait(`${target_name}像坏了的玩具似的疯狂的自慰着………`);
    } else if (q === 1) {
      await era.print(`「啊哈…那孩子的手指…太棒了…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}就像在追寻着${assi_name}的痕迹一样用手指抚摸着秘处………`,
      );
    } else if (q === 2) {
      await era.print(`「嗯…呜嗯…好像要狗狗的………${heart(1)}」`);
      await era.printAndWait(`${target_name}用自己的手指自慰似乎完全不够………`);
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…身体好热…呜呜…不是的…${sc()}…手淫最喜欢了…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(`「哇…嗯嗯…啊啊啊…手指…不够么…${heart(1)}」`);
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嗯…哈…哈…主人啊…还想要更多更多…${heart(1)}」`,
        );
        await era.printAndWait(`「啊…嗯…不够…不够哟………」`);
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊啊…不行了…手停不下来…咕啾咕啾这么舒服哎！」`,
        );
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 2;
      } else if (
        chara(target).kojo.调教后自慰 < 1 ||
        game.kojo.口上开关 === 2
      ) {
        await era.printAndWait(
          `「啊…身体好痛…无法忍受啊…这全部都………是魔王的错啊…」`,
        );
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 === 2) {
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait(
        `${assi_name}和坏掉了的${target_name}颓废享受着女同游戏………`,
      );
    } else if (
      era.get(`talent:${target}:76`) &&
      (chara(target).kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…女孩们互相慰藉吧…${heart(1)}」`);
      await era.printAndWait(`「会一直疼爱你的直到你混乱了的${heart(1)}」`);
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呼呼…真是对不起今天由我来代替主人…」`);
      await era.printAndWait(`「啊啊啊…不过和你的话…也不错…♪」`);
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (chara(target).kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊啊…女孩子之间这样也不错啊…！」`);
      await era.printAndWait(`「更多更多！一起融化吧！」`);
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (chara(target).kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「唔呼呼…女孩之间这么舒服…」`);
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 2;
    } else if (chara(target).kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊…嗯…哎呀…女孩之间什么的…咿！」`);
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 === 3) {
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait(`「呼…早上好咕…早上喝牛奶…♪」`);
      await era.printAndWait(
        `${target_name}一副痴呆的表情舔着小鸡鸡寻找着精液………`,
      );
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (chara(target).kojo.朝口交 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呜咕…嗯噗…呜啾啾噜${heart(1)} 啾啪…咕噜…呜咕嗯嗯${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}专心致志的吞吐着小鸡鸡…你醒来了也没有察觉………`,
      );
      await era.printAndWait(
        `「嗯嗯…咕啊咿…啊啊、从早上开始就这么精神${heart(1)}…嗯嗯${heart(1)} 啾啾${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊啊啊…已经…就这样强行侵犯………啊啊啊啊…主人…早、早上好………」`,
      );
      // CFLAG:263  = 4（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 4;
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嘛啾啾…咕噜…嗯哦…啊…主人早上好♪」`);
      await era.printAndWait(
        `「${sc()}的口腔侍奉怎么样…？嘛啾…啾…啾啾…嗯哦………」`,
      );
      await era.printAndWait(
        `「如果感觉很舒服…就不用客气的在${sc()}嘴里射出来吧…♪」`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (chara(target).kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈…请原谅我早上…♪」`);
      await era.printAndWait(`「想要侍奉小鸡鸡…早上就开始了♪」`);
      await era.printAndWait(`「哈啊…从早上开始就要精精神神的…陆续吧」`);
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 2;
    } else if (chara(target).kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「小鸡鸡…小鸡鸡啊…嗯…嗯…很美味呦～」`);
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 4) {
    if (
      era.get(`talent:${target}:9`) === 1 &&
      (chara(target).kojo.调教后性交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`坏掉了的${target_name}无法忘记性交的快乐………`);
      // CFLAG:264  = 3（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 3;
    } else if (
      era.get(`abl:${target}:2`) >= 4 &&
      (chara(target).kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「这么…小穴变得更喜欢了………」`);
      await era.printAndWait(`「嗯…啊啊啊…更加…请让我更加爱上这种事！」`);
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「满满的射进来吧…让淫乱的小穴满满的直到溢出来吧${heart(1)}」`,
        );
      }
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊啊啊…如果这么温柔…嗯…呜嗯${heart(1)}」`);
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 2;
    } else if (chara(target).kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊咿…这么兴奋了啊…好羞耻………」`);
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 5) {
    if (
      era.get(`talent:${target}:9`) === 1 &&
      (chara(target).kojo.夜袭 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「咿…啊啊…咿呜…可、可以吗………」`);
      await era.printAndWait(
        `坏掉了的${target_name}抱着自己的主人乞求进入${master_name}的房间………`,
      );
      // CFLAG:265  = 2（变量语义：CFLAG 族，265）
      chara(target).kojo.夜袭 = 2;
    } else if (chara(target).kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「唔呼呼…来幽会喽…」`);
      await era.printAndWait(`「不会这样把${sc()}赶走的…对吧？」`);
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      chara(target).kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 6) {
    if (era.get(`talent:${target}:9`) === 1) {
      await era.printAndWait(`「咿…咿…嗯、拜拜了大人…咿～…啊啊～………」`);
      await era.printAndWait(
        `坏了的${target_name}对自己被出售的事勉勉强强能理解………`,
      );
    } else if (
      era.get(`talent:${target}:85`) &&
      era.get(`mark:${target}:3`) < 3
    ) {
      await era.printAndWait(`「哎、呜、骗人的吧…」`);
      await era.printAndWait(`${target_name}一副目瞪口呆的表情凝视着你。`);
      await era.printAndWait(
        `「${scf()}、${sc()}…”你”为了、这么…我很努力的…明明………」`,
      );
      await era.printAndWait(`你用手示意怪物们抓住了${target_name}的双手。`);
      await era.printAndWait(
        `「呐…停下吧…停下来啊…${sc()}、”你”为了什么、我什么都能做到！」`,
      );
      await era.printAndWait(
        `${target_name}哭了起来。但是、怪物们沉默着熟练的轻轻扭着${target_name}的双臂。`,
      );
      await era.printAndWait(`「求你了…不想离开…不想分开哟…」`);
      await era.print('');
      await era.printAndWait(`你在沉默的在奴隶买卖合同书上签了字。`);
    } else if (era.get(`mark:${target}:3`) === 3) {
      await era.printAndWait(
        `「${sc()}的力量被封住了…你总有一天会后悔的…魔王！」`,
      );
    } else if (
      era.get(`talent:${target}:136`) === 1 &&
      chara(target).chara.结婚对象 === 900 &&
      era.get(`talent:${master}:122`) === 0 &&
      chara(master).chara.结婚对象 === 900 &&
      chara(master).chara.结婚爱情 > 40
    ) {
      await era.printAndWait(`「我好像成了电灯泡了是吗？　是这样么？」`);
      await era.printAndWait(`「不过…呵呵…」`);
      await era.printAndWait(
        `「${master_or_you}的身体怎么可能满足得了他（它）呢」`,
      );
      await era.printAndWait(`「没错吧？」`);

      if (
        era.get(`talent:${target}:153`) === 1 &&
        chara(target).event.妊娠相手 === 5
      ) {
        await era.printAndWait(
          `「什么嘛${master_or_you}、连老公的孩子都没怀上啊、怎么能和我争呢」`,
        );
      }

      if (chara(target).chara.结婚爱情 < chara(master).chara.结婚爱情) {
        await era.print(
          `「…快老实承认了吧！！　老实说『是在下输了』吧 魔王${master_suffix}！！」`,
        );
        await era.printAndWait(
          `「明明…是我更被他宠爱着…对吧…没错吧？　是这样吧！？」`,
        );
        if (era.get(`talent:${target}:84`) === 1) {
          await era.printAndWait(
            `「更何况、我…我爱他的程度远胜过他爱我、的…」`,
          );
        }
        await era.printAndWait(`「…求…求求你…不要…把我卖掉…」`);
        await era.printAndWait(`「求你了…我不想…我不想这么走了啊…呜」`);
        await era.print('');
        await era.printAndWait(`你一言不发地在奴隶买卖契约书上签了字。`);
      } else if (chara(target).chara.结婚爱情 > chara(master).chara.结婚爱情) {
        await era.printAndWait(
          `明明马上就要被卖掉了、${target_name}却还对自己的胜利沾沾自喜。`,
        );
        if (
          era_flag.assi > 0 &&
          era.get(`talent:${assi}:153`) === 1 &&
          chara(assi).event.妊娠相手 === 5
        ) {
          await era.printAndWait(
            `「小心咯、${assi_name}。下一个说不定就是你咯」`,
          );
        }
        await era.printAndWait(`就这样一只牝犬被卖掉了。`);
      } else {
        await era.print(`「以这种难分难解的形式决了胜负真是太可惜了」`);
        await era.printAndWait(
          `「明明不可能会输给把他称作野狗的${master_or_woman}才对的」`,
        );
        await era.printAndWait(`「诶…真是太可惜了」`);
      }
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「哈…这次对方会是什么样的主人呢…」`);
      await era.printAndWait(`「啊啊啊身体好疼哇………」`);
    } else {
      await era.printAndWait(
        `「总有一天、会用你的脸来祭拜…呼呼、敬请期待那个时候吧」`,
      );
    }
    await era.print('');
    if (era.get(`talent:${target}:122`) !== 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 === 11) {
    if (chara(target).kojo.妊娠发觉 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊…哈…${sc()}的孩子啊…什么样的孩子呢…一定是像王子一样…非常英俊哇…哈啊哈哈」`,
        );
      } else if (chara(target).event.妊娠相手 === 6) {
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          await era.printAndWait(
            `「妊娠……？　啊哈${heart(1)}　${sc()}、这是败给了兽人肉棒了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　强壮兽人的浓厚精液让精灵的草食系子宫完全屈服了呢${heart(1)}」`,
          );
        } else if (chara(target).chara.结婚爱情 > 40) {
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　子宫投降了${heart(1)}　完全屈服于强壮的老公的浓厚精液了呢${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「怎么会……有了怪物的孩子……？」`);
        }
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「难道…魔族的孩子什么的…唔呼呼…不过心情也不差…真是不可思议…」`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait('');
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait('');
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).event.妊娠相手 === 5 &&
        chara(target).chara.结婚对象 === 90
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」`,
          );
        } else {
          // 无后缀 PRINTFORM 前缀，与下面 IF 链首支的收行同属一行（#622）。
          // 各支自带收行，前缀在分支外取值；首支那句把整行写在一起
          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;
          if (rand_n(9) === 0) {
            await era.printAndWait(
              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,
            );
          } else if (rand_n(8) === 0) {
            await era.printAndWait(dog_name_prefix + `哈娜？」`);
          } else if (rand_n(7) === 0) {
            await era.printAndWait(dog_name_prefix + `小白？」`);
          } else if (rand_n(6) === 0) {
            await era.printAndWait(dog_name_prefix + `贝鲁卡？」`);
          } else if (rand_n(5) === 0) {
            await era.printAndWait(dog_name_prefix + `普朗卡？」`);
          } else if (rand_n(4) === 0) {
            await era.printAndWait(dog_name_prefix + `戴比尔？」`);
          } else if (rand_n(3) === 0) {
            await era.printAndWait(dog_name_prefix + `小狼？」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(dog_name_prefix + `博斯？」`);
          } else {
            await era.printAndWait(dog_name_prefix + `米凯？」`);
          }
        }
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「有了个可爱的宝宝…♪」`);
        } else {
          await era.printAndWait(
            `「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」`,
          );
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(`「呜呼呜…难、难道…这是狂王大人的孩子…？」`);
      } else {
        await era.printAndWait(`「咕呜…咕呜…吔…难、难道、这是…骗人…吧…」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      chara(target).kojo.妊娠发觉 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊…哈…${sc()}的孩子啊…什么样的孩子呢…一定是像王子一样…非常英俊哇…哈啊哈哈」`,
        );
      } else if (chara(target).event.妊娠相手 === 6) {
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          await era.printAndWait(
            `「妊娠……？　啊哈${heart(1)}　${sc()}、这是败给了兽人肉棒了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　强壮兽人的浓厚精液让精灵的草食系子宫完全屈服了呢${heart(1)}」`,
          );
        } else if (chara(target).chara.结婚爱情 > 40) {
          await era.printAndWait(
            `「${sc()}、好开心${heart(1)}　子宫投降了${heart(1)}　完全屈服于强壮的老公的浓厚精液了呢${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「怎么会……有了怪物的孩子……？」`);
        }
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「难道…魔族的孩子什么的…唔呼呼…不过心情也不差…真是不可思议…」`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait('');
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait('');
      } else if (
        era.get(`talent:${target}:136`) === 1 &&
        chara(target).event.妊娠相手 === 5 &&
        chara(target).chara.结婚对象 === 90
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」`,
          );
        } else {
          // 无后缀 PRINTFORM 前缀，与 :7040 同型（#622）
          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;
          if (rand_n(9) === 0) {
            await era.printAndWait(
              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,
            );
          } else if (rand_n(8) === 0) {
            await era.printAndWait(dog_name_prefix + `哈娜？」`);
          } else if (rand_n(7) === 0) {
            await era.printAndWait(dog_name_prefix + `小白？」`);
          } else if (rand_n(6) === 0) {
            await era.printAndWait(dog_name_prefix + `贝鲁卡？」`);
          } else if (rand_n(5) === 0) {
            await era.printAndWait(dog_name_prefix + `普朗卡？」`);
          } else if (rand_n(4) === 0) {
            await era.printAndWait(dog_name_prefix + `戴比尔？」`);
          } else if (rand_n(3) === 0) {
            await era.printAndWait(dog_name_prefix + `小狼？」`);
          } else if (rand_n(2) === 0) {
            await era.printAndWait(dog_name_prefix + `博斯？」`);
          } else {
            await era.printAndWait(dog_name_prefix + `米凯？」`);
          }
        }
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「有了个可爱的宝宝…♪」`);
        } else {
          await era.printAndWait(
            `「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」`,
          );
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(`「呜呼呜…难、难道…这是狂王大人的孩子…？」`);
      } else {
        await era.printAndWait(`「咕呜…咕呜…吔…又、又怀孕了………？」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      chara(target).kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 12) {
    if (chara(target).kojo.生产 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哇哈哈…你的角在生长～？非常可爱～？呜噗唔呼呼呼呼………」`,
        );
      } else if (chara(target).event.妊娠相手 === 6) {
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          await era.printAndWait(
            `「生、生下来了啊${heart(1)}　从被兽人肉棒攻破的精灵子宫里${heart(1)}　生出来啦${heart(1)}」`,
          );
        } else if (chara(target).chara.结婚爱情 > 40) {
          await era.printAndWait(`「生、生下来了……可爱的孩子……！」`);
        } else {
          await era.printAndWait(`「生、生下来了……怪物的孩子……！」`);
        }
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「这个孩子出来了的话…真的是…不能离开你了啊…唔呼呼、最喜欢你了」`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait('');
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait('');
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「健康的狗的孩子生下来了吗？」`);
        } else {
          await era.printAndWait(`「骗人吧…为什么是狗的孩子…啊！」`);
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(`「哈哈…生下狂王大人的孩子什么的………」`);
      } else {
        await era.printAndWait(`「哈…哈…哈…这样的孩子出生了什么的………」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      chara(target).kojo.生产 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哇哈哈…你的角在生长～？非常可爱～？呜噗唔呼呼呼呼………」`,
        );
      } else if (chara(target).event.妊娠相手 === 6) {
        if (
          chara(target).chara.结婚对象 === 110 &&
          era.get(`talent:${target}:314`) === 1 &&
          chara(target).chara.结婚爱情 > 40
        ) {
          await era.printAndWait(
            `「生、生下来了啊${heart(1)}　从被兽人肉棒攻破的精灵子宫里${heart(1)}　生出来啦${heart(1)}」`,
          );
        } else if (chara(target).chara.结婚爱情 > 40) {
          await era.printAndWait(`「生、生下来了……可爱的孩子……！」`);
        } else {
          await era.printAndWait(`「生、生下来了……怪物的孩子……！」`);
        }
      } else if (
        era.get(`talent:${target}:85`) &&
        chara(target).event.妊娠相手 === 1
      ) {
        await era.printAndWait(
          `「这个孩子出来了的话…真的是…不能离开你了啊…唔呼呼、最喜欢你了」`,
        );
      } else if (chara(target).event.妊娠相手 === 2) {
        await era.printAndWait('');
      } else if (chara(target).event.妊娠相手 === 3) {
        await era.printAndWait('');
      } else if (chara(target).event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「健康的狗的孩子生下来了吗？」`);
        } else {
          await era.printAndWait(`「骗人吧…为什么是狗的孩子…啊！」`);
        }
      } else if (chara(target).event.妊娠相手 === 7) {
        await era.printAndWait(`「哈哈…生下狂王大人的孩子什么的………」`);
      } else {
        await era.printAndWait(`「哈…哈…哈…这样的孩子出生了什么的………」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      chara(target).kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(`「另外、你真的在担心我吗？」`);
        await era.printAndWait(`${target_name}抚摸着迎来了产期的大肚子………`);
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(`「呼呼、这个孩子的话真的是好麻烦啊♪」`);
        await era.printAndWait(`${target_name}哄着孩子………`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    chara(target).kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 === 14) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「啊啊、${sc()}可爱的孩子要走了………」`);
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    chara(target).kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 === 999) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  if (game.train.初吻与自我口上 === 998) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// @DUNGEON_RYOUZYOKU_K1
async function dungeon_ryouzyoku_k1() {
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「别、别开玩笑了！　${sc()}的第一次不会给你的…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait('');
      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(
        `「什么都可以！　即、即使再脏也会做…所以、只有小穴和生命…！」`,
      );

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          `「屁股！　呐呐、屁股怎样？　前面是不行的不过屁股的话怎么使用也可以哦！」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(
          `「喜欢用嘴的吗？　什么都会舔、所以、只要活着…」`,
        );
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(
        `「绝对！　绝对不能原谅！　你要是敢侵犯我一次试试、我就咬舌自尽！」`,
      );
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「真讨厌…已经…呀啊！！」`);
    } else {
      await era.printAndWait(`「你们…差劲的人渣！」`);
    }
  } else {
    await era.printAndWait(`「快点侵犯吧！　只是我"真的"会对抗到底！！`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`（………反正…马上要结束了…）`);
      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(`「小穴只要你喜欢就随你使用……求你了…只要活着…」`);

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          `「即使使用屁股…也可以…嫌脏的话、灌、灌肠也可以…」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(
          `「要用嘴把鸡鸡弄干净…？　不用洗也可以…所以、只要活着…」`,
        );
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(
        `「${sc()}绝对不会认输！　即使身体被侵犯了、心灵也不会被侵犯！」`,
      );
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「反正是奴隶吧…？　那个、是${sc()}的工作吧…」`);
    } else {
      await era.printAndWait(`「被侵犯了呢、什么感觉也没有」`);
    }
  }

  return 0;
}

// @DUNGEON_RYOUZYOKU_AFTER_K1
async function dungeon_ryouzyoku_after_k1() {
  const target = era_flag.target;

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「哈哈…太好了…安全…安全了…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`（………已经、想睡觉了…）`);
      return 0;
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「大便…不要停…哎咕」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「嘴里…全是小鸡鸡的气味…嗯」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「从现在开始…要喝这个代替水…？」`);
    }
  } else {
    await era.printAndWait(`「没、没什么大不了…没有了吗…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`（………杀死感情…就不用痛苦了）`);
      return 0;
    }

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「小穴…变的嘎巴嘎巴的了…」`);
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(
        `「难道…永远坏了要让我那样的一直失禁…？　讨厌…帮我治好啊…！」`,
      );
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「下巴…脱落了」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「喝这样的东西什么的…会疯的」`);
    }
  }
}

// @BENKI_KOUJO_K1
async function benki_koujo_k1() {
  const target = era_flag.target;
  const a = target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);

  if (game.train.肉便器行动 === 0) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「对污秽的你们进行『施予』可是${self_call(a)}的『工作』啊、用不着这样感恩戴德的……」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(`「按顺序站好了！　会帮你们一个个脱下来的……喏♪」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「按顺序排好队啦！」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「会好好服侍的、请排好队……」`);
    } else {
      await era.printAndWait(`「噫、好脏……」`);
    }
  } else if (game.train.肉便器行动 === 1) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 2) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(`「兽奸便器什么的、真是过分的催眠……」`);
      await era.printAndWait(
        `「嘛、变得不想再抵抗了。被这么变态的对待、人生也是完蛋了呢♪」`,
      );
    } else if (era.get(`talent:${a}:136`)) {
      await era.printAndWait(`「被狗上了啊……哇哦……爽爆了♪」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「这就前来服侍……」`);
    } else {
      await era.printAndWait(`「噫——、不要！」`);
    }
  } else if (game.train.肉便器行动 === 3) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「好嘞。使劲的侵犯吧。这就是${self_call(a)}的『工作』来着啊、真是没办法啊♪」`,
      );
    } else if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(`「两边的穴好像要连到一起了啊……♪」`);
    } else {
      await era.printAndWait(`「去了、呜噗……噗呜！」`);
    }
  } else if (game.train.肉便器行动 === 4) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 5) {
    if (era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait('');
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 7) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「啊哈、${sc()}是兽奸便器的${target_name}的说${heart(1)}」`,
      );
      await era.printAndWait(
        `「被魔王大人进行了超强的催眠、正在像这样进行着变态交尾挑战呢${heart(1)}」`,
      );
      await era.printAndWait(
        `「看着悲惨的催眠肉便器的末路好好地撸起来哟${heart(1)}」`,
      );
    } else if (era.get(`talent:${a}:136`)) {
      await era.printAndWait(
        `「兽奸便器的${target_name}哦${heart(1)}　稀有的真实交尾画面可别错过了哦${heart(1)}」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「这就前来服侍……」`);
    } else {
      await era.printAndWait(`「噫咦——、不要！」`);
    }
  }

  return 0;
}

// @DUNGEON_VICTORY_K1
async function dungeon_victory_k1(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const a = target;
  const sc = () => self_call(target);

  await era.printAndWait(`「${sc()}赢不了啊！」`);

  if (
    era.get(`talent:${target}:21`) === 1 ||
    era.get(`talent:${target}:22`) === 1
  ) {
    await era.printAndWait(`「……」`);

    return 0;
  } else if (
    era.get(`talent:${target}:11`) === 1 ||
    era.get(`talent:${target}:12`) === 1 ||
    era.get(`talent:${target}:15`) === 1 ||
    era.get(`talent:${target}:30`) === 1 ||
    era.get(`talent:${target}:34`) === 1
  ) {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「当然！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「卑鄙！」`);
    } else {
      await era.printAndWait(`「这种东西！」`);
    }
  } else if (
    era.get(`talent:${target}:10`) === 1 ||
    era.get(`talent:${target}:26`) === 1
  ) {
    await era.printAndWait(`「真是好险…」`);

    return 0;
  } else {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「${sc()}可是天才啊！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「呼呜……」`);
    } else {
      await era.printAndWait(`「${sc()}也是的！」`);
    }
  }

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    await era.printAndWait(`（稍微有点…不妙…呢）`);
  } else {
    await era.printAndWait(`「绝对不会输！」`);
  }

  return 0;
}

// @DUNGEON_ATTACK_K1
async function dungeon_attack_k1(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (chara(target).invasion.状态 === 2) {
    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「怪物！　死吧！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「${sc()}还以为能战胜！？　呀！」`);
      } else {
        await era.printAndWait(`「来吧、打垮你们哟！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「呜、什么啊这帮家伙！」`);

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「明明是怪物！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「魔王的爪牙没什么了不起的！」`);
      } else {
        await era.printAndWait(`「你做了什么！」`);
      }
    }
  } else {
    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「……」`);

      return 0;
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「哼、什么都不懂的啊」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「笨蛋、根本就没有意识到魔王大人的美妙」`);
      } else {
        await era.printAndWait(`「你马上就知道了」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「魔王军……不会输的！」`);

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「这是魔王大人赐给我的力量…！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「想赢？」`);
      } else {
        await era.printAndWait(`「${sc()}获得了新生！」`);
      }
    }
  }

  return 0;
}

// @COLOSSEUM_KOJO_1
async function colosseum_kojo_1() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target);
  const assi_name = chara_callname(assi);
  const master_name = chara_name(MASTER);
  const sc = () => self_call(target);

  if (era_flag.selectcom === 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}好像没有力气站起来了……`);
    } else {
      await era.printAndWait(
        `${target_name}看到死斗场的热浪和将要面对的对手吓得直哆嗦……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「哇…你、你做了什么………」`);
        await era.printAndWait(`${target_name}丢掉武器膝盖跪倒了地上……`);
      } else {
        await era.printAndWait(`「哈…哈…这样的事…${sc()}……」`);
        await era.printAndWait(`${target_name}丢掉武器膝盖跪倒了地上……`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「如、如果对手是你的话…这样的……」`);
        await era.printAndWait(
          `${target_name}看到了在${master_name}命令下武装起来的${assi_name}不由的咬牙切齿起来……`,
        );
      } else {
        await era.printAndWait(`「嗯嗯…那种家伙…如果是平时的${sc()}…！」`);
        await era.printAndWait(
          `被封住了力量的${target_name}发现了参战的状况而感到焦虑……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom === 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊呜…呜嗯…嗯咕…嗯…呼啊……」`);
      // 原作是一整行：无后缀 PRINTFORM + 两条 SIF 的 PRINT
      // + 收行的 PRINTFORMW（#622）。SIF 判据提到语句外当条件、文本留在输出语句里
      const assi_has_penis =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_has_strap =
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1; // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
      await era.printAndWait(
        `${assi_name}因为` +
          (assi_has_penis ? `真正的小鸡鸡` : '') +
          (assi_has_strap ? `假阳具` : '') +
          `被${target_name}含了进去而露出了心旷神怡的表情……`,
      );
    } else {
      await era.printAndWait(`「咕…这样的…明明不想舔…呜咕…嗯…嗯咕…………」`);
      await era.printAndWait(
        `${target_name}吸吮舔舐着散发着恶心的气味小鸡鸡……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「${assi_name}…你、你不也是勇者这种事…啊呜！」`);
      await era.printAndWait(
        `${target_name}为了让${assi_name}离开自己的乳房……`,
      );
    } else {
      await era.printAndWait(`「啊啊啊…说、说了很痛啊！」`);
      await era.printAndWait(
        `${target_name}因为乳房被用力揉而发出了痛苦的声音……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「啊啊啊…啊！这、这样的…不行了不行了～！」`);
      // 与 :7763+:7765+:7767+:7768 同型（#622）
      const assi_has_penis =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_has_strap =
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1; // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
      await era.printAndWait(
        `${assi_name}一边听着悲鸣一边用` +
          (assi_has_penis ? `真正的小鸡鸡` : '') +
          (assi_has_strap ? `假阳具` : '') +
          `毫不留情的继续蹂躏${target_name}的阴道……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「嘎…嘎哈…咕嘿…呜哎哎……」`);
      await era.printAndWait(
        `可怜的${target_name}就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……`,
      );
    } else {
      await era.printAndWait(`「啊呜！…喜、喜欢上了…${sc()}这么…啊呜！」`);
      await era.printAndWait(`${target_name}就这样被怪物侵犯了下去……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊啊啊…啊！屁、屁股坏掉了呜啊…不行了不行了～！」`,
      );
      // 与 :7763+:7765+:7767+:7768 同型（#622）
      const assi_has_penis =
        era.get(`talent:${assi}:121`) === 1 ||
        era.get(`talent:${assi}:122`) === 1;
      const assi_has_strap =
        era.get(`talent:${assi}:121`) !== 1 &&
        era.get(`talent:${assi}:122`) !== 1 &&
        era.get('item:4') === 1; // 原作 ITEM:PBAND：PBAND 是内建非角色变量，SYSTEM ver1.0.3.ERB:42 赋 4（4 号 = 假阳具，Item.csv:5），全库不再改写（#552）
      await era.printAndWait(
        `${assi_name}一边听着悲鸣一边用` +
          (assi_has_penis ? `真正的小鸡鸡` : '') +
          (assi_has_strap ? `假阳具` : '') +
          `毫不留情的继续蹂躏${target_name}的肛门……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「嘎…嘎哈…咕嘿…呜哎哎……」`);
      await era.printAndWait(
        `可怜的${target_name}就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……`,
      );
    } else {
      await era.printAndWait(
        `「啊呜！…${sc()}这么…啊咕！屁、屁股要坏掉了…啊！」`,
      );
      await era.printAndWait(`${target_name}就这样被怪物侵犯了下去……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 51) {
    await era.printAndWait(`「啊啊啊…媚薬啊…啊啊啊…！」`);
    return 0;
  }

  return 0;
}

// @NTR_KOUJO_K1
async function ntr_koujo_k1(rand, P) {
  const target = era_flag.target;
  const target_name = chara_callname(target);
  const sc = () => self_call(target);
  P = P ?? 0;

  if (chara(target).kojo.NTR再捕获 === 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    chara(target).kojo.NTR再捕获 = 1;
  }

  if (P === 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊…咿…不要…拔出来…拔出来啊…${sc()}是魔王大人…啊啊啊…讨厌…不要动啊！」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」`,
      );
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    chara(target).kojo.NTR_651 = 1;
  } else if (P === 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊啊！深一点！深一点哦！ 啊…那、那里不行了…${sc()}的…肛门…咿咿嗯${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊…你这个变态…${sc()}的…肛门…你这笨蛋…啊…啊啊嗯！」`,
      );
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    chara(target).kojo.NTR_652 = 1;
  } else if (P === 3) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(
        `「啊嗯…狗狗的小鸡鸡好舒服啊…咿咿…天啊${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}一边被四周的观众嘲笑、一边沉浸在被狗侵犯的快感里………`,
      );
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      await era.printAndWait(
        `「啊啊啊…停下吧…${sc()}是谁…啊哼！…咿…讨厌啊！」`,
      );
      await era.printAndWait(
        `${target_name}是四周的观众的背叛者！魔女！一边被骂一边被狗持续侵犯着………`,
      );
    } else {
      await era.printAndWait(
        `「咿嗯…这种事…与魔王同样的事么…停止…停下吧…啊…咿啊啊啊！」`,
      );
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    chara(target).kojo.NTR_653 = 1;
  } else if (P === 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「哈…哈…啊啊啊！美妙啊…狂王大人啊…请更多的侵犯…${sc()}的小穴${heart(1)} 快乐的要坏了${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「咿咿…咿嗯…狂王大人的怀抱…好幸福…的说…啊…啊咕♪」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    chara(target).kojo.NTR_654 = 1;
  } else if (P === 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊嗯…大家都已经…${sc()}的小穴和屁股小穴…更多的随便用就好啦${heart(1)} 咿嗯…两穴都被插进来了${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊…这样…被轮奸什么的…咿嗯…不行了不行了…不要同时插两种穴啊！啊啊啊！」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    chara(target).kojo.NTR_655 = 1;
  } else if (P === 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「你看…快点换下一个上吧………先付钱…嗯啊嗯…那样的…即、即使…啊啊啊♪」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊…${sc()}因为…明明是勇者…这样的感觉…明明不可以…咿啊啊啊！」`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    chara(target).kojo.NTR_656 = 1;
  } else if (P === 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「魔王大人…对不起…${sc()}…被狂王大人…玩坏了…」`);
      await era.printAndWait(
        `「就这样…侍奉狂王大人…是比什么都喜悦的东西…啊…啊啊啊」`,
      );
    } else {
      await era.printAndWait(`「狂王大人的…好美味…啊哎…呜咕…咕嘟…」`);
      await era.printAndWait(
        `${target_name}由于嘴巴被注入了东西咽下后会心地笑了………`,
      );
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    chara(target).kojo.NTR_657 = 1;
  } else if (P === 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      if (chara(target).event.妊娠相手 === 1) {
        await era.printAndWait(`「停下吧！魔王大人…不要拿走${sc()}的宝宝！」`);
      } else {
        await era.printAndWait(`「啊啊啊…${sc()}宝宝…讨厌、讨厌啊！」`);
      }
    } else {
      await era.printAndWait(`「嗯嗯…咕…真是过分…啊啊啊………」`);
    }
  }

  return 0;
}

// @EXUCUTION_KOUJO_K1
async function exucution_koujo_k1() {
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.犬射精或处刑口上 === 4) {
    await era.printAndWait(`「真是太好了…只要活着…就好了………」`);
  } else if (game.event.犬射精或处刑口上 === 5) {
    await era.printAndWait(`「${sc()}${sc()}的意识在逐渐消失………啊…啊啊啊………」`);
  } else if (game.event.犬射精或处刑口上 === 6) {
    await era.printAndWait(`「好恨啊………！」`);
  } else if (game.event.犬射精或处刑口上 === 7) {
    await era.printAndWait('');
  }
}

// @MUSEUM_KOUJO_K1
async function museum_koujo_k1() {
  if (game.event.博物馆口上 === 0) {
    await era.printAndWait(`「这种死法讨厌啊啊！」`);
  } else if (game.event.博物馆口上 === 1) {
    await era.printAndWait(`「我不要变成这种玩具啊！」`);
  } else if (game.event.博物馆口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 3) {
    await era.printAndWait(`(咕…如果力量没被封印的话、这、这种打扮…！)`);
    await era.printAndWait(`「这、这种感觉就行了吧？…早点弄完就最好了―」`);
  } else if (game.event.博物馆口上 === 4) {
    await era.printAndWait(
      `「身…身体它、变得不是人类了…不…不要！谁、谁来……救…救…」`,
    );
  } else if (game.event.博物馆口上 === 5) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 6) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 7) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 8) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 9) {
    await era.printAndWait('');
  }
}

// @BANISHMENT_KOUJO_K1
async function banishment_koujo_k1() {
  const target = era_flag.target;
  const sc = () => self_call(target);

  if (game.event.流放口上 === 0) {
    await era.printAndWait(`「骗、骗人吧…${sc()}的力量该不会被封印了吧………」`);
  } else if (game.event.流放口上 === 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 === 3) {
    await era.printAndWait('');
  } else if (game.event.流放口上 === 4) {
    await era.printAndWait('');
  }
}

// @PUBLIC_EXUCUTION_KOUJO_K1
async function public_exucution_koujo_k1() {
  if (game.event.公开处刑口上 === 0) {
    await era.printAndWait(`「讨厌啊…咿…呀咿咿！再也不会被弄坏了！」`);
  } else if (game.event.公开处刑口上 === 1) {
    await era.printAndWait(`「畜生…畜生畜生………！」`);
  } else if (game.event.公开处刑口上 === 2) {
    await era.printAndWait('');
  }
}

// @GROTESQUE_KOUJO_K1
async function grotesque_koujo_k1() {
  if (game.event.猎奇处刑口上 === 0) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 1) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 3) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 4) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 5) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 === 6) {
    await era.printAndWait('');
  }
}

// @ENTERENEMY_KOUJO_K1
async function enterenemy_koujo_k1() {
  const target = era_flag.target;
  const a = target;

  if (era.get(`talent:${a}:21`) === 1 || era.get(`talent:${a}:22`) === 1) {
    await era.printAndWait(`「……${self_call(a)}会打倒魔王的」`);
  } else if (
    era.get(`talent:${a}:11`) === 1 ||
    era.get(`talent:${a}:12`) === 1 ||
    era.get(`talent:${a}:15`) === 1 ||
    era.get(`talent:${a}:30`) === 1 ||
    era.get(`talent:${a}:34`) === 1
  ) {
    await era.printAndWait(`「魔王什么的轻轻的一击就够了！」`);
  } else if (
    era.get(`talent:${a}:10`) === 1 ||
    era.get(`talent:${a}:26`) === 1
  ) {
    await era.printAndWait(
      `「${self_call(a)}魔王能打倒吗…不对、绝对会打倒！」`,
    );
  } else {
    await era.printAndWait(`「虽然不怎么了解魔王的实力、不过觉悟吧！！」`);
  }
}

// @GOHOUBI_REQUEST_KOUJO_K1
async function gohoubi_request_koujo_k1(cid) {
  const target = era_flag.target;
  const a = cid ?? target;

  if (chara(a).stronghold.要求奖赏 === 0) {
    await era.printAndWait(`「请多关照报酬是钱哦！」`);
  } else if (
    chara(a).stronghold.要求奖赏 === 1 ||
    chara(a).stronghold.要求奖赏 === 2 ||
    chara(a).stronghold.要求奖赏 === 3
  ) {
    // 原作是一整行：无后缀 PRINTFORM + IF/ELSEIF 的
    // PRINT（互斥三支）+ 收行的 PRINTFORMW（#622）。判据提到语句外、文本留在语句里
    const reward = chara(a).stronghold.要求奖赏;
    await era.printAndWait(
      `「胜利之后、想要和` +
        (reward === 1 ? `狗` : reward === 2 ? `猪` : reward === 3 ? `马` : '') +
        `交尾」`,
    );
  } else if (chara(a).stronghold.要求奖赏 === 4) {
    await era.printAndWait(`「哇、回来的吻…等待着呢」`);
  } else if (chara(a).stronghold.要求奖赏 === 5) {
    await era.printAndWait(`「呐、打倒勇者的话…希望可以做爱」`);
  } else if (chara(a).stronghold.要求奖赏 === 6) {
    await era.printAndWait(`「回来的话、白色的…能喝一次」`);
  } else if (chara(a).stronghold.要求奖赏 === 7) {
    await era.printAndWait(`「如果打倒的话作为胜利的纪念、开性爱派对吧」`);
  } else if (chara(a).stronghold.要求奖赏 === 8) {
    await era.printAndWait(`「魔王大人…赢了的话…给我喝尿…？」`);
  } else if (chara(a).stronghold.要求奖赏 === 9) {
    await era.printAndWait(
      `「打倒勇者的话、想要用小穴吸吮包茎处男的短小肉棒」`,
    );
  }
}

// @GOHOUBI_AFTER_KOUJO_K1
async function gohoubi_after_koujo_k1(cid, choice) {
  const target = era_flag.target;
  const a = cid ?? target;

  if (choice === 0) {
    await era.printAndWait(`「难得努力了一下…！」`);
  } else if (choice === 1) {
    await era.printAndWait(`「呼呼、想要增加更多的这个勋章」`);
  } else if (choice === 2) {
    if (chara(a).stronghold.要求奖赏 === 0) {
      await era.printAndWait(`「谢谢、可以去买买买了呢！～嘻嘻」`);
    } else if (chara(a).stronghold.要求奖赏 === 1) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(`「啊啊啊！和狗用肛门交尾！好棒～好棒哦！」`);
      } else {
        await era.printAndWait(`「啊啊啊！和狗交尾！好棒～好棒哦！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 2) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(`「啊啊啊！和猪用肛门交尾！好棒～好棒哦！」`);
      } else {
        await era.printAndWait(`「啊啊啊！和猪交尾！好棒～好棒哦！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 3) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(`「啊啊啊！和马用肛门交尾！好棒～好棒哦！」`);
      } else {
        await era.printAndWait(`「啊啊啊！和马交尾！好棒～好棒哦！」`);
      }
    } else if (chara(a).stronghold.要求奖赏 === 4) {
      await era.printAndWait(`「恩、呜嗯…啾…接吻…好美妙…${heart(1)}」`);
    } else if (chara(a).stronghold.要求奖赏 === 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(`「性交作为奖励！最棒～最棒了呦${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「肛门好棒！好棒啊…啊啊啊还要更多${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 6) {
      await era.printAndWait(
        `「好吃…魔王大人的美味精液好棒啊…想要更多…可以吗？」`,
      );
    } else if (chara(a).stronghold.要求奖赏 === 7) {
      if (era.get(`talent:${a}:0`) === 1) {
        await era.printAndWait(
          `「啊啊啊…果然还是性爱派对好…再来…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊…果然还是性爱派对好…再来…${heart(1)}」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 === 8) {
      await era.printAndWait(`「小便…好美味、魔王大人♪」`);
    } else if (chara(a).stronghold.要求奖赏 === 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(`「你看、这样你也想成为合格的男子汉？」`);
      } else {
        await era.printAndWait(`「很抱歉是肛交、不过这里也不错吧？」`);
      }
    }
  }
}

// @OSIOKI_KOUJO_K1
async function osioski_koujo_k1(cid, choice) {
  const target = era_flag.target;
  const a = cid ?? target;

  if (choice === 0) {
    await era.printAndWait(`「得、得救了………」`);
  } else if (choice === 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(`「啊啊啊！电气惩罚最高呦！」`);
    } else {
      await era.printAndWait(`「不! 不!！再次原谅我吧！咿啊呜！」`);
    }
  } else if (choice === 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait(
        `「你看、魔王大人的东西${self_call(a)}大庭广众的自慰、就是这样礼貌的好好观看吧」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊啊…${self_call(a)}为什么有这样的感觉…看、看到了！看到了啊！」`,
      );
    }
  } else if (choice === 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait(`「这样一边大便一边手淫${heart(1)}」`);
    } else {
      await era.printAndWait(`「嗯嗯…为什么会这样…讨厌、讨厌啊…！」`);
    }
  } else if (choice === 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait(
        `「啊啊啊嗯！更多！还要更多！最喜欢主人的鞭打了！」`,
      );
    } else {
      await era.printAndWait(`「对不起啊！下次一定会成功的！」`);
    }
  } else if (choice === 5) {
    if (era.get(`talent:${a}:88`) === 1 || era.get(`talent:${a}:76`) === 1) {
      await era.printAndWait(
        `「认真瞄准${self_call(a)}的脸…呜咕噗…嗯哈…小便真美味${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「不要再来了………」`);
    }
  } else if (choice === 6) {
    await era.printAndWait(`「………」`);
  } else if (choice === 7) {
    await era.printAndWait(`「肚子饿了………」`);
  } else if (choice === 8) {
    await era.printAndWait(
      `「已经受不了！再不和主人性交真的要疯了！求你了求你了啊！强奸了${self_call(a)}吧！」`,
    );
  } else if (choice === 9) {
    await era.printAndWait(`「咕噜咕噜！」`);
  }
}

// @GOBI_KOUJO_K1, ARG:0
function gobi_koujo_k1(arg0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  if (arg0 === 1) {
    return `哎哟♪`;
  } else if (arg0 === 2) {
    return `哎呦！`;
  } else if (arg0 === 3) {
    return `哎……。`;
  } else if (arg0 === 4) {
    return `哎哟……什么、不好！？`;
  } else if (arg0 === 5) {
    return `这样的事……。`;
  } else {
    if (rand_n(3) === 0) {
      return `哈。`;
    } else if (rand_n(2) === 0) {
      return `哎呦。`;
    } else {
      return `的哇。`;
    }
  }
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

module.exports = { kojo_message_com_1 };
