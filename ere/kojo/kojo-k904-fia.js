/* eslint-disable no-irregular-whitespace, no-dupe-else-if, no-unreachable */
/**
 * @file 菲娅口上 K904（issue #250，J40）。
 *
 * 原作缺陷 1:1 保留：@KOJO_MESSAGE_COM_904 的“自己扒开”段（:1199-1226）
 * 以 CFLAG:308 判首次，却在后续各档读写 CFLAG:306；这会与胸部爱抚共用
 * 计数器。移植不修正，变异条目固定此行为。
 * 原作缺陷 1:1 保留：@MUSEUM_KOUJO_K904 在 :6368-6370 无条件 RETURN，故其后
 * 按 TFLAG:500 分派的分支不可达。移植保留原执行顺序，变异条目固定此行为。
 * 原作缺陷 1:1 保留：SELECTCOM 56 段在 :4467-4468 后少一个 ENDIF，导致紧随的
 * SELECTCOM 123 嵌在 56 分支内而不可达；源在 :4526-4527 用额外 ENDIF 恢复层级。
 * 移植不补括号，变异条目固定此行为。
 *
 * 原作未实现：@SINGLE_ENDING_K904（:5792 起）整段仍是注释，不凭空补写。
 */

'use strict';

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const {
  peek_aftertrain_q,
  peek_aftertrain_s,
  peek_sale_price,
} = require('#/event/event-aftertrain');
const era_exflag = require('#/era-utils/era-exflag');
const era_flag = require('#/era-utils/era-flag');
const { PALAMLV } = require('#/era-utils/palam-level');
const { heart, self_call } = require('#/kojo/kojo-text');
const {
  kojo_message_com_family,
  kojo_message_palamcng_family,
  kojo_message_markcng_family,
  self_kojo_family,
  benki_koujo_family,
  dungeon_victory_family,
  dungeon_attack_family,
  adapt_legacy_ntr_koujo,
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
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const {
  gohoubi_after_koujo_family,
  osioski_koujo_family,
  gohoubi_request_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');

const PBAND = 4; // ITEM:PBAND = ITEM:4（SYSTEM ver1.0.3.ERB:42）
const era0 = (key) => era.get(key) || 0;

// 反复出现的原作变量语义：TALENT:9/76/85/314 = 崩坏/淫乱/爱慕/魔族种族；
// EX_TALENT:104 = 菲娅 K904 口上素质；MARK:2 = 屈服刻印；TEQUIP:45/55/89/90 =
// 口塞/死斗场/兽奸/触手；TFLAG:899 = 失神状态。

// @EVENTTRAIN
on(
  'EVENTTRAIN',
  async () => {
    // #PRI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达）
    // EX_FLAG:104 = 1（变量语义：K904 口上存在标志）
    era_exflag.set(104, 1);
    if (game.kojo.口上开关 == 0) {
      // FLAG:7  = 2（变量语义：FLAG 族，7）
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// @EVENTEND
on(
  'EVENTEND',
  async () => {
    // #LATER（事件优先级修饰符，JS 侧用 on() 的 TIER 表达）
    // EX_FLAG:104 = 0（变量语义：K904 口上存在标志）
    era_exflag.set(104, 0);
  },
  TIER.LATER,
);

// @EVENTTRAIN
on('EVENTTRAIN', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era0(`ex_talent:${target}:104`) != 1) {
    return 0;
  }

  if (chara(target).kojo.初调教 == 0) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) == 9) {
      await era.printAndWait(`「呜……（吸鼻子）……呜呜……」`);
      await era.printAndWait(
        `一进入调教室，映入眼帘的是躲在角落中抽泣的身影。原本是公主的名为${target_name}的幼女，好像暂时还没办法接受自己的新身份的样子。`,
      );
      await era.printAndWait(
        `${master_name}满足的看着眼前魔族幼女，慢慢走近。`,
      );
      await era.printAndWait(
        `听见脚步声的幼女转过头来，露出了泪眼汪汪的大眼睛。`,
      );
      await era.printAndWait(
        `尽管她很多事情都处于懵懂阶段，但已经变成了魔族的她，还是本能的认出了${master_name}。`,
      );
      await era.printAndWait(
        `「呜……魔王大人……？魔王大人……为什么会在这里……？」`,
      );
      await era.printAndWait(
        `精神上已经有些混乱的她，还不知道接下来迎接自己的会是什么样的命运……`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 1;

      // CFLAG:370  = 1（变量语义：CFLAG 族，370）
      chara(target).kojo.魔族化 = 1;
    } else {
      await era.printAndWait(`「呀……你……你是谁……这里是哪里……？」`);
      await era.printAndWait(
        `一进入调教室，映入眼帘的是站在屋子正中的娇小身影。名为${target_name}的柔弱的幼女，正怯生生的抬头看着自己。`,
      );
      await era.printAndWait(
        `毕竟她还只是个孩子，对于自己身上发生了什么并不是很明白。只知道自己从睡梦中醒来的时候，身处一个陌生的地方。`,
      );
      await era.printAndWait(
        `${master_name}一边和她解释着她已经是自己的奴隶，一边慢慢的接近因为恐惧而站在原地一动不动的${target_name}。`,
      );
      await era.printAndWait(
        `「呜……总之……那个……就是说……你是坏人吧……你，你想干嘛……」`,
      );
      await era.printAndWait(
        `${master_name}没回答，只是蹲下来，乐在其中的拨弄着害怕的颤抖个不停的${target_name}的头发。`,
      );
      await era.printAndWait(`「呜呜……谁，谁来救救我呜……」`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 1;
      return 1;
    }
  } else if (
    chara(target).kojo.初调教 < 5 &&
    chara(target).kojo.魔族化 == 0 &&
    era.get(`talent:${target}:314`) == 9 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    await era.printAndWait(`「呀呜……好像……身体……变得奇怪了……」`);
    await era.printAndWait(`「我……我已经变成了……坏孩子了吗……」`);
    await era.printAndWait(`面前原本是人类的幼女跪坐在地上，无助的大哭起来。`);
    await era.printAndWait(`「不要啊啊啊，这个样子，会被大家讨厌的！」`);
    await era.printAndWait(
      `哭声在屋子里回荡着，大颗大颗的泪珠沿着脸颊滑落下来。`,
    );

    // CFLAG:370  = 2（变量语义：CFLAG 族，370）
    chara(target).kojo.魔族化 = 2;
    return 1;
  } else if (
    chara(target).kojo.初调教 >= 1 &&
    chara(target).kojo.NTR再捕获 == 1
  ) {
    if (era.get(`talent:${target}:85`)) {
      era.drawLine();
      await era.printAndWait(`「呜啊啊啊～主人～！」`);
      await era.printAndWait(`「好可怕，好可怕呜呜～」`);
      await era.printAndWait(
        `被带到${master_name}面前的${target_name}，一下子扑到${master_name}身上大哭起来。`,
      );
      await era.printAndWait(
        `「那个人，对我做这样那样的事情，还让我忘掉主人。」`,
      );
      await era.printAndWait(
        `「呜呜，如果不乖乖照做的话，也许就见不到主人了，我，我好害怕……」`,
      );
      await era.printAndWait(`「能够再见到主人，好开心……」`);
      await era.printAndWait(`「但是……那种样子……被主人全都看到了……」`);
      await era.printAndWait(`「主人……你会讨厌我吗……？」`);
      await era.printAndWait(
        `${target_name}泪眼汪汪的抬头看着${master_name}，颤抖的说着，仿佛受惊的小动物一般。`,
      );
      await era.printAndWait(
        `在那之后，花了一番功夫安抚她的情绪，然而因为水晶球的事，最后还是好好的用下面“惩罚”了她一番。`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      chara(target).kojo.NTR再捕获 = 0;
    } else if (era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(`「呼啊……嗯……啾……❤」`);
      await era.printAndWait(
        `${target_name}乖巧伏在${master_name}的身下，伸出小舌头专心的舔弄着肉棒。`,
      );
      await era.printAndWait(
        `「诶嘿嘿，虽然和其他人的H也很舒服，但是总觉得少了点什么呢……」`,
      );
      await era.printAndWait(`「嗯嗯～果然还是主人的肉棒最棒了❤」`);
      await era.printAndWait(
        `「所以……请用主人的精液牛奶……把那个人留在${sc()}肚子里面的东西全部洗干净呐❤」`,
      );
      await era.printAndWait(
        `${target_name}满眼桃心的仰头看着${master_name}。`,
      );
      await era.printAndWait(`在那之后，好好的用下面“惩罚”了她一整晚。`);

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      chara(target).kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(
        `「呜……为什么不管是谁……都对${sc()}做这样那样的事情呢。」`,
      );
      await era.printAndWait(`「这样的日子……不要了啦……好想……好想回家……」`);
      await era.printAndWait(`被关在笼子里的${target_name}，不断的抽泣着。`);
      await era.printAndWait(
        `坐在王座上的${master_name}俯视着${target_name}，轻蔑的从鼻子里哼了一声。`,
      );
      await era.printAndWait(`只要是魔王的东西，就没有人能拿得走。`);

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      chara(target).kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (
    chara(target).kojo.初调教 < 2 &&
    era.get(`mark:${target}:2`) == 1 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「呜呜……这种事……不要了啦……」`);
    await era.printAndWait(
      `${target_name}轻声的哀求着，似乎已经不像最初那样拼命抵抗了。`,
    );
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 2;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 3 &&
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「呜……我知道了啦……我会乖乖的……听魔王大人的话的……」`,
    );
    await era.printAndWait(
      `${target_name}无精打采的低着头，彻底的放弃了抵抗。`,
    );
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 3;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 4 &&
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「诶，从现在开始要叫主人吗？」`);
    await era.printAndWait(`「呜……我明白了……主人……」`);
    await era.printAndWait(`连番的调教已经让她的精神彻底的沦陷了。`);
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 4;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 5 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`talent:${target}:314`) != 9
  ) {
    era.drawLine();
    await era.printAndWait(`「主人……❤」`);
    await era.printAndWait(`${target_name}轻轻扯着${master_name}的衣角。`);
    await era.printAndWait(`「那……那个……❤」`);
    await era.printAndWait(`「还想和主人……继续做H的事情呢❤」`);
    await era.printAndWait(
      `${target_name}的小脸上浮着一层红晕，眼里满满的都是和年龄不符的欲望。`,
    );
    await era.printAndWait(`「呐呐……主人……教我更多……H的事情吧……❤」`);
    if (era.get(`talent:${target}:0`) == 1) {
      await era.printAndWait(`「更进一步的……也没问题哟……❤」`);
    }
    await era.printAndWait(`${target_name}一脸痴态的望着${master_name}。`);
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 5;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    chara(target).kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 1
  ) {
    era.drawLine();
    await era.printAndWait(`「诶嘿嘿，主人的味道，最喜欢了❤」`);
    await era.printAndWait(
      `${target_name}一边用小脸磨蹭着${master_name}的肉棒，一边玩弄着自己的下半身。透明的爱液沿着大腿缓缓流下。`,
    );
    await era.printAndWait(
      `「变成这个样子的话……不管主人想玩什么样子的play都没关系了呢❤」`,
    );
    await era.printAndWait(`「主人……来做更多……H的事情吧❤」`);
    await era.printAndWait(
      `变化为魔族的${target_name}，已经彻底的沦为了欲望的俘虏。`,
    );
    // CFLAG:201  = 6（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 6;
    return 1;
  } else if (
    chara(target).kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:314`) != 9 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「呐呐……主人……」`);
    await era.printAndWait(
      `${target_name}靠在${master_name}怀里，任由${master_name}的手在自己身上各处抚摸着。`,
    );
    await era.printAndWait(`「最近……脑子里面一直想着主人的事情……」`);
    await era.printAndWait(
      `「主人的样貌……声音……味道……还有好多好多其他的东西……」`,
    );
    await era.printAndWait(`「我好像已经……离不开主人了呢……」`);

    if (game.event.爱或淫乱人数 > 2) {
      await era.printAndWait(`「但是……主人……还有其他的姐姐们呢……」`);
      await era.printAndWait(
        `「呜……确实……我比起姐姐们来……可能没什么魅力……也没有她们那么会服侍主人……」`,
      );
      await era.printAndWait(`「但，但是……我是真的很喜欢主人的说！」`);
      await era.printAndWait(
        `虽然好像越说越情绪低落，但是她似乎是想了很久才下定了决心的样子，最后还是鼓起勇气说了出来。`,
      );
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `尽管如此，一想到${master_name}连自己的第一次都还没有拿走，${target_name}的情绪好像更加的低落了。`,
        );
        await era.printAndWait(
          `「啊呜……果然我这样的小孩子……对主人来说没什么吸引力吗……」`,
        );
      }
    } else if (game.event.爱或淫乱人数 == 2) {
      await era.printAndWait(`「但是……主人……还有其他的姐姐呢……」`);
      await era.printAndWait(
        `「呜……确实……我比起姐姐来……可能没什么魅力……也没有她那么会服侍主人……」`,
      );
      await era.printAndWait(`「但，但是……我是真的很喜欢主人的说！」`);
      await era.printAndWait(
        `虽然好像越说越情绪低落，但是她似乎是想了很久才下定了决心的样子，最后还是鼓起勇气说了出来。`,
      );
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(
          `尽管如此，一想到${master_name}连自己的第一次都还没有拿走，${target_name}的情绪好像更加的低落了。`,
        );
        await era.printAndWait(
          `「啊呜……果然我这样的小孩子……对主人来说没什么吸引力吗……」`,
        );
      }
    } else {
      await era.printAndWait(`「所……所以……那个……可以让${sc()}任性一次吗……？」`);
      await era.printAndWait(
        `在得到了同意之后，${target_name}伸出小指轻轻的勾住${master_name}的手指。`,
      );
      await era.printAndWait(`「诶嘿嘿～今后也要……一直在一起……约好了哟❤」`);
      if (chara(target).train.初吻对象 == -1) {
        await era.printAndWait(
          `这么说着的${target_name}，意外主动的贴了过来。`,
        );
        await era.printAndWait(`「所以……我的初吻……请您……」`);
        await era.printAndWait(
          `不等她说完，${master_name}按着${target_name}的头压过来，将舌头侵入到了还不知道什么是kiss的小嘴中。`,
        );
        await era.printAndWait(
          `一边感受柔软的小舌头略显生涩的侍奉，一边享受着幼女甘甜的唾液。`,
        );
        await era.printAndWait(`「啾……呼啊……主人❤」`);
        await era.printAndWait(`「最喜欢你了❤」`);
      }
      // CFLAG:16  = 1（变量语义：CFLAG 族，16）
      chara(target).train.初吻对象 = 1;
      // 赋值 CSTR:4  = ${master_name}
    }
    await era.printAndWait('');
    // CFLAG:201  = 7（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 7;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) == 9 &&
    chara(target).kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();

    if (chara(target).kojo.魔族化 == 1) {
      await era.printAndWait(`「诶嘿嘿……主人……最喜欢了……❤」`);
      await era.printAndWait(
        `不停嗅着${master_name}身上味道的${target_name}，简直就像一直小狗一样。`,
      );
      await era.printAndWait(`「果然还是和主人在一起最好了呢～」`);
      await era.printAndWait(
        `「变成魔族了的现在，和主人的距离就变得更加接近了吧？」`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 8;
      return 1;
    } else if (chara(target).kojo.魔族化 == 2) {
      await era.printAndWait(`「诶嘿嘿……主人……最喜欢了……❤」`);
      await era.printAndWait(
        `不停嗅着${master_name}身上味道的${target_name}，简直就像一直小狗一样。`,
      );
      await era.printAndWait(
        `「虽然有些怀念原本的生活，但是……果然还是和主人在一起最好了呢～」`,
      );
      await era.printAndWait(
        `「变成魔族了的现在，和主人的距离就变得更加接近了吧？」`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      chara(target).kojo.初调教 = 8;
      return 1;
    }
  } else if (
    era.get(`talent:${target}:9`) == 1 &&
    chara(target).kojo.初调教 < 9
  ) {
    era.drawLine();
    await era.printAndWait(`「不要啊……求求你……饶了我吧……」`);
    await era.printAndWait(
      `双眼失去了焦点的${target_name}缩在角落瑟瑟发抖，机械性的重复着几个短句。`,
    );
    await era.printAndWait(
      `看来她的脆弱的精神已经彻底到达了极限，这个孩子恐怕再也回不到原本的样子了吧……`,
    );
    // CFLAG:201  = 9（变量语义：CFLAG 族，201）
    chara(target).kojo.初调教 = 9;
    return 1;
  } else if (era_flag.assi < 0) {
    await k904_kojo2();
    await k904_fuku();
  } else {
    await k904_kojo2();
    await k904_fuku();
  }
});

// @k904_kojo2
async function k904_kojo2() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  const rand_n = (n) => Math.floor(Math.random() * n);
  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「呜呜……不，不要过来……求求你！」`);
    await era.printAndWait(`精神已经的崩坏了的她，已经无法分清幻觉和现实了。`);
    return 1;
  } else if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「不要……讨厌……」`);
    await era.printAndWait(
      `${target_name}徒劳后退，想要躲开${master_name}的魔爪。`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 0 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「呜呜……做什么啦……不要啊……」`);
    await era.printAndWait(
      `${target_name}有些嫌恶的想推开${master_name}的手。`,
    );
    await era.printAndWait(
      `只是，力量上绝对的差距连让${master_name}稍微动一动都做不到。`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 1 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「呜……又要……做那个了吗……」`);
    await era.printAndWait(
      `${target_name}不情愿的嘟着小嘴，抱着脚坐在床的正中央。`,
    );
    await era.printAndWait(`${target_name}的样子似乎没有之前那么抵触了。`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(
      `「魔王大人……那个……我……我会乖乖听话的……所以……可，可以温柔一点吗……」`,
    );
    await era.printAndWait(
      `${target_name}似乎已经接受了自己身为${master_name}的奴隶的事实。`,
    );
    await era.printAndWait(
      `看见调教有所成效的${master_name}，满意的摸了摸${target_name}的头……`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    game.kojo.口上开关 == 2 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「啊……主人……您来了吗……」`);
    await era.printAndWait(`「今天又要对${sc()}做些什么呢……？」`);
    await era.printAndWait(
      `乖乖的洗干净身体的她，跪坐在床上等待着${master_name}的临幸。水汪汪的大眼睛里，看不出任何一点反抗的苗头。`,
    );
    await era.printAndWait(
      `精神上已经完全服从于${master_name}的现在，侍奉${master_name}才是最重要的事情。`,
    );
    return 1;
  } else if (era.get(`talent:${target}:76`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (game.system.着衣系统 != 0) {
      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 131
      ) {
        await era.printAndWait(`「呼啊啊啊……」`);
        await era.printAndWait(
          `进屋的时候，${target_name}似乎刚刚睡醒的样子，揉着惺忪的睡眼。`,
        );
        await era.printAndWait(`……仔细看的话，另一只手似乎是在被子里动着……`);
        await era.printAndWait(`「啊，主人～❤」`);
        await era.printAndWait(`「来和${sc()}做H的事情了吗❤」`);
        await era.printAndWait(`「诶嘿嘿，H的事情，最喜欢了❤」`);
        await era.printAndWait(
          `这么说着的${target_name}，从被子里抽出了沾着晶亮液体的手指。`,
        );
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        await era.printAndWait(`「啊，主人欢迎回来～❤」`);
        await era.printAndWait(
          `一进屋，穿着妹抖服的${target_name}已经乖巧的站在一旁了。`,
        );
        await era.printAndWait(
          `「您是先做H的事情呢，还是先做H的事情呢，还是说……想要做H的事情呢～❤」`,
        );
        await era.printAndWait(
          `这么说着的${target_name}，提起了裙子，露出了湿漉漉的下半身。`,
        );
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 208
      ) {
        await era.printAndWait(`「主人，您来了呢❤」`);
        await era.printAndWait(`穿着礼服的${target_name}，静静的端坐在床上。`);
        await era.printAndWait(
          `虽然是个小孩子，毕竟也曾经是公主，多少还是有些贵族气质留在身上。`,
        );
        await era.printAndWait(`「这身衣服……有些想起以前的事情了呢……」`);
        await era.printAndWait(
          `${target_name}的脸上意外的露出了有些复杂的表情，不过很快就被红晕所取代。`,
        );
        await era.printAndWait(`「但是……和主人在一起，才是最开心的～」`);
        await era.printAndWait(`「当然……还有H的事情❤」`);
        await era.printAndWait(
          `这么说着的${target_name}的小脸上，浮现出了满满的欲望。`,
        );
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 221
      ) {
        await era.printAndWait(`「啊呜？这身衣服……」`);
        await era.printAndWait(
          `「啊～❤我知道了，主人是那个……诶多……萝莉控吧～❤」`,
        );
        await era.printAndWait(
          `原本就身材娇小的${target_name}，穿上幼稚园服并没有什么违和感。`,
        );
        await era.printAndWait(`「诶嘿嘿，主人，我们来玩游戏吧～」`);
        await era.printAndWait(`「H的游戏❤」`);
        await era.printAndWait(
          `拉扯着${master_name}衣角的${target_name}，稚气未脱的小脸上满满的都是和年龄不符的欲望。`,
        );
        return 1;
      } else if (chara(target).chara.特别服装类型 == 71) {
        await era.printAndWait(`「诶嘿嘿……主人的味道～❤」`);
        await era.printAndWait(`「呐呐，再多抱抱${sc()}嘛～❤」`);
        await era.printAndWait(
          `带着项圈的${target_name}，宛如发情中的小动物，不停的朝着${master_name}撒娇。`,
        );
        await era.printAndWait(
          `只是闻到${master_name}的味道，下半身就开始不由自主的变得湿漉漉了。`,
        );
        await era.printAndWait(`「这个样子，就像是主人的宠物一样呢❤」`);
        await era.printAndWait(`「汪汪～想和主人交尾呢～❤」`);
        return 1;
      }
    } else {
      if (rand_n(2) == 0) {
        await era.printAndWait(`「呜……主人，来做H的事情嘛～❤」`);
        await era.printAndWait(
          `含着自己手指的${target_name}，就像小孩子和父母讨要甜食一般自然的说着色气满满的语句。`,
        );
        await era.printAndWait(
          `仰视着${master_name}的眼睛里，仿佛可以看得见满满的桃心。`,
        );
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(`「想要主人的精液牛奶嘛……❤」`);
        }
      } else {
        await era.printAndWait(`「诶嘿嘿，主人的肉棒，最喜欢了～❤」`);
        await era.printAndWait(`「今天也要和肉棒做H的事情呢❤」`);
        await era.printAndWait(
          `${target_name}趴在${master_name}身上，在耳边吐出带着甜味的热气。`,
        );
        await era.printAndWait(
          `纤细的小手则沿着${master_name}的身体往下移，握住了粗大的肉棒，轻轻的套弄着。`,
        );
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(
            `「用主人的精液牛奶……把${sc()}的肚子里灌得满满的吧❤」`,
          );
        }
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();

    if (game.system.着衣系统 != 0) {
      if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 131
      ) {
        if (rand_n(2)) {
          await era.printAndWait(`「呼……呼……」`);
          await era.printAndWait(
            `进屋的时候，${target_name}似乎还在睡觉的样子……`,
          );
          await era.printAndWait(`「嗯……呼……呼诶……？」`);
          await era.printAndWait(`「主……主人……？」`);
          await era.printAndWait(
            `正脱着她的衣服准备给她一个“惊喜”的时候刚好醒来的样子。`,
          );
          await era.printAndWait(
            `「呜呜～真是的～不好好睡觉的话会长不高的哦～」`,
          );
          await era.printAndWait(
            `「把${sc()}带过来的那个时候也是……呜～${sc()}真的会长不高的啦～」`,
          );
          await era.printAndWait(
            `虽然这么说，但是并没有什么埋怨的意思在里面。`,
          );
          await era.printAndWait(`不如说……其实是在撒娇吧？`);
        } else {
          await era.printAndWait(`「呼啊啊啊……」`);
          await era.printAndWait(
            `进屋的时候，${target_name}似乎刚刚睡醒的样子，揉着惺忪的睡眼。`,
          );
          await era.printAndWait(`「诶……主人……？」`);
          await era.printAndWait(`「啊……早安～……」`);
          await era.printAndWait(
            `「诶嘿嘿，主人来找${sc()}了吗……好开心的说～」`,
          );
          await era.printAndWait(
            `仔细看看，刚睡醒稍稍有些乱的衣服和有些迷糊的样子显得更加诱人了……`,
          );
          await era.printAndWait(
            `在没有受到任何反抗的情况下，轻松的把${target_name}按回了床上。`,
          );
          await era.printAndWait(`「主人……真H呢……❤」`);
          await era.printAndWait(
            `呼吸着${master_name}味道的${target_name}，将自己全部身心都交给了主人……`,
          );
        }
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 209
      ) {
        await era.printAndWait(`「啊，主人欢迎回来～❤」`);
        await era.printAndWait(
          `一进屋，穿着妹抖服的${target_name}已经乖巧的站在一旁了。`,
        );
        await era.printAndWait(`「您是先吃饭呢，还是先洗澡呢，还是我呢……？」`);
        await era.printAndWait(
          `${target_name}轻轻的压着有些短的裙子，红着脸仰头看着${master_name}。`,
        );
        await era.printAndWait(`答案什么的一开始就只有一个吧。`);
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 208
      ) {
        await era.printAndWait(`「啊，主人，您来了……」`);
        await era.printAndWait(`穿着礼服的${target_name}，静静的端坐在床上。`);
        await era.printAndWait(
          `虽然是个小孩子，毕竟也曾经是公主，多少还是有些贵族气质留在身上。`,
        );
        await era.printAndWait(`「这身衣服……有些想起以前的事情了呢……」`);
        await era.printAndWait(
          `${target_name}的脸上意外的露出了有些复杂的表情，不过很快就被红晕所取代。`,
        );
        await era.printAndWait(`「但是……和主人在一起，才是最开心的～」`);
        await era.printAndWait(`「今后……也请多多指教呢……」`);
        await era.printAndWait(`「我的……王子大人……❤」`);
        return 1;
      } else if (
        chara(target).train.着衣状态 & 28 &&
        chara(target).train.上衣类型 == 221
      ) {
        await era.printAndWait(`「啊呜？这身衣服……」`);
        await era.printAndWait(
          `「虽然知道主人喜欢${sc()}这样的小孩子有点开心……」`,
        );
        await era.printAndWait(`「但是……呜……好害羞呜……」`);
        await era.printAndWait(
          `原本就身材娇小的${target_name}，穿上幼稚园服并没有什么违和感。`,
        );
        await era.printAndWait(`「不过……只要主人喜欢的话……」`);
        return 1;
      } else if (chara(target).chara.特别服装类型 == 71) {
        await era.printAndWait(`「哈哇哇……这个……这个是……」`);
        await era.printAndWait(`「呜呜……这种事……好害羞的说……」`);
        await era.printAndWait(`「但是……如果是主人的话……不讨厌呢……」`);
        await era.printAndWait(
          `带着项圈的${target_name}依偎在${master_name}怀里撒着娇，就像一只小狗一样。`,
        );
        await era.printAndWait(
          `「总觉得……这样子的话，更加有种是主人的东西的感觉呢……」`,
        );
        return 1;
      }
    } else {
      if (rand_n(3) == 0) {
        await era.printAndWait(`「诶嘿嘿，主人，您来了呢～」`);
        await era.printAndWait(`「今天想要做什么呢？」`);
        await era.printAndWait(
          `「只要是主人想做的，${sc()}什么都没问题的说❤」`,
        );
        await era.printAndWait(
          `${target_name}仰着头微笑的看着${master_name}，眼里满满的都是爱意。`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(`「主人的味道呢……」`);
        await era.printAndWait(`「还有……感觉得到主人的心跳声……」`);
        await era.printAndWait(
          `${target_name}把头靠在${master_name}身上，闭着眼睛轻轻的蹭着，用小手引导着${master_name}的手放在自己平坦的胸脯上。`,
        );
        await era.printAndWait(`「主人也……感受到了吗？」`);
        await era.printAndWait(`从手的那一端，确实的传来的小而有力的心跳声。`);
        await era.printAndWait(
          `不过，连同这个，也都是全部都是属于${master_name}的。`,
        );
        await era.printAndWait(`「主人……最喜欢你了❤」`);
      } else {
        await era.printAndWait(`「主人……今天也来了呢……」`);
        await era.printAndWait(`「能得到主人的宠幸……${sc()}感觉很幸福的说……」`);
        await era.printAndWait(`「H的事情的话……」`);
        await era.printAndWait(
          `${target_name}的小脸上浮现出一层红晕，用细不可闻的的声音说完了后半句。`,
        );
        await era.printAndWait(
          `「只要和主人在一起，不管怎么样都觉得……很舒服呢……❤」`,
        );
      }
    }

    if (
      chara(target).chara.特别服装类型 == 91 &&
      chara(target).train.着衣状态 & 64 &&
      chara(target).chara.结婚对象 == 901 &&
      game.system.着衣系统 != 0
    ) {
      await era.printAndWait(
        `这么说着的${target_name}，紧紧的攥着纤细的手指上的戒指，目光则一直停留在${master_name}身上，小脸上满是幸福的表情。`,
      );
    }
    return 1;
  }
}

// @k904_fuku
async function k904_fuku() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  const rand_n = (n) => Math.floor(Math.random() * n);
  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    await era.printAndWait(`「呜……不要……」`);
    await era.printAndWait(
      `${target_name}不停的抽泣着，对脱衣服这件事完全没有抵抗。`,
    );
    await era.printAndWait(
      `精神已经崩坏的她，对外界的刺激已经没有多少反应了。`,
    );
    return 1;
  } else if (game.system.着衣系统 == 0) {
    return 1;
  } else if (
    chara(target).chara.特别服装类型 <= 50 &&
    chara(target).chara.特别服装类型 != 0
  ) {
    return 1;
  } else if (
    (chara(target).train.着衣状态 & 28) == 0 &&
    chara(target).train.上衣类型 == 0
  ) {
    if (
      era.get(`mark:${target}:3`) == 3 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(
        `虽然因为害怕而脱光了衣服，但${target_name}仍然害怕的躲着${master_name}。`,
      );
    } else if (
      era.get(`mark:${target}:2`) == 0 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「呜……一定要这样吗……讨厌……」`);
      await era.printAndWait(
        `${target_name}一边轻轻抽泣着，一边不情愿的脱下了衣物。`,
      );
    } else if (
      era.get(`mark:${target}:2`) == 1 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「呜呜……非要……光着身子咩……有点冷的说……」`);
    } else if (
      era.get(`mark:${target}:2`) == 2 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「脱衣服吗……呜……总觉得好害羞……」`);
      await era.printAndWait(
        `脱掉了衣服的${target_name}，害羞的用手遮挡住重要的地方。`,
      );
    } else if (
      era.get(`mark:${target}:2`) == 3 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「呜嗯……这样就可以了吗……主人……？」`);
      await era.printAndWait(
        `${target_name}乖巧的脱光了衣服，仰着头看着${master_name}。`,
      );
    } else if (
      era.get(`mark:${target}:2`) == 3 &&
      era.get(`talent:${target}:85`) == 1 &&
      era.get(`talent:${target}:76`) == 0
    ) {
      era.drawLine();
      await era.printAndWait(`「诶，主人想看${sc()}的身体吗……」`);
      await era.printAndWait(`「嗯……可以哟……」`);
      await era.printAndWait(
        `${target_name}的有些脸红的看着${master_name}，积极的脱下了衣服。`,
      );
      if (rand_n(2) == 0 && chara(target).chara.特别服装类型 == 92) {
        await era.printAndWait(`「只要和主人在一起的话……就算没有衣服也……」`);
        await era.printAndWait(
          `${target_name}轻轻的抚摸着戒指，露出了幸福的表情。`,
        );
      }
    } else if (
      era.get(`mark:${target}:2`) == 3 &&
      era.get(`talent:${target}:85`) == 0 &&
      era.get(`talent:${target}:76`) == 1
    ) {
      era.drawLine();
      await era.printAndWait(`「诶嘿嘿……主人真是H呢……❤」`);
      await era.printAndWait(`「今天也……来做H的事情吧❤」`);
      await era.printAndWait(
        `脱光光的${target_name}主动的贴了上来，用未发育完全的幼小身躯诱惑着${master_name}。`,
      );
      await era.printAndWait(`「是先从这里开始吗～❤」`);

      if (rand_n(5) == 0) {
        await era.printAndWait(`${target_name}的手指搭在嘴唇上说着。`);
      } else if (rand_n(4) == 0) {
        await era.printAndWait(
          `${target_name}用平坦的胸部轻轻的磨蹭着${master_name}的身体。`,
        );
      } else if (rand_n(3) == 0) {
        await era.printAndWait(
          `${target_name}跨坐在${master_name}的大腿上，前后摩擦着阴蒂。`,
        );
      } else if (rand_n(2) == 0) {
        await era.printAndWait(
          `${target_name}满眼桃心的看着${master_name}，透明的爱液沿着大腿流了下来。`,
        );
      } else {
        await era.printAndWait(
          `${target_name}引导着${master_name}的手摩擦着光滑的小屁股。`,
        );
      }
    }
    return 1;
  }
  return 0;
}

// @EVENTEND
on('EVENTEND', async () => {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const rand_n = (n) => Math.floor(Math.random() * n);
  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era0(`ex_talent:${target}:104`) != 1) {
    return 0;
  }

  if (era.get(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {
    era.drawLine();
    await era.printAndWait(`「呜呜……不……要……」`);
    await era.printAndWait(
      `遍布着凌辱痕迹的${target_name}无助的趴在地上，眼泪止不住的流下来。`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:3`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「呜……谁来……谁来……救救我吧……」`);
    await era.printAndWait(`${target_name}抱着双脚坐在墙角不断的抽泣着。`);
    return 1;
  } else if (
    era.get(`mark:${target}:2`) <= 1 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「终于……结束了吗……？」`);
    await era.printAndWait(
      `眼角挂着泪珠的${target_name}缩在床上，害怕的看着${master_name}。`,
    );
    await era.printAndWait(
      `在得到了确认的回答之后，才怯怯的开始用纸巾擦拭起自己的身体来。`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 2 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「呼……呼……」`);
    await era.printAndWait(`${target_name}在被子里缩成一团，很快就睡着了。`);
    await era.printAndWait(
      `虽然在精神上已经完全服从${master_name}了，但是身体上毕竟还只是孩子，要适应调教似乎还需要一点时间……`,
    );
    return 1;
  } else if (
    era.get(`mark:${target}:2`) == 3 &&
    era.get(`talent:${target}:85`) == 0 &&
    era.get(`talent:${target}:76`) == 0
  ) {
    era.drawLine();
    await era.printAndWait(`「哈……呼啊……主人……您还……满意吗……？」`);
    await era.printAndWait(
      `${target_name}大口大口的喘着气，皮肤上呈现出淡淡的红晕，因为快感时不时轻轻颤抖着。`,
    );
    await era.printAndWait(`渐渐的已经习惯了调教了的样子……`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「啊呜……今天的主人……似乎不在状态的说……」`);
    await era.printAndWait(
      `${target_name}含着手指，欲求不满的看着${master_name}。`,
    );
    await era.printAndWait(`「H的事情……还想做更多呢……」`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();
    await era.printAndWait(`「呼啊啊……❤主人……好厉害……❤嗯啊……❤」`);
    await era.printAndWait(`「舒服的……嗯……❤舒服的快要死掉了啦❤」`);
    await era.printAndWait(
      `${target_name}沉浸在完全不属于这个年龄的强烈快感中，小小的身体还是不是因为快感而颤抖着。`,
    );
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();
    if (rand_n(2)) {
      await era.printAndWait(`「主人……身体不舒服吗……？」`);
      await era.printAndWait(`${target_name}有些担心的看着这边。`);
    } else {
      await era.printAndWait(`「主人……您累了吗……？」`);
      await era.printAndWait(`「那样的话……请休息一下吧～」`);
      await era.printAndWait(`之后枕着${target_name}的大腿休息了一段时间。`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) == 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    await era.printAndWait(`「哈呜……主人……呼啊……❤」`);
    await era.printAndWait(
      `${target_name}紧紧的抱着${master_name}，小小的身体时不时因为快感而颤抖着。`,
    );
    await era.printAndWait(`「诶嘿嘿……和主人做了H的事情呢……」`);
    await era.printAndWait(`「感觉……好开心的说❤」`);
    await era.printAndWait(
      `感受着${master_name}的体温，${target_name}幸福的笑了起来。`,
    );
    if (rand_n(2) == 0 && chara(target).chara.特别服装类型 == 92) {
      await era.printAndWait(
        `依偎在${master_name}怀里的${target_name}，一直在抚摸着手中的戒指。`,
      );
      await era.printAndWait(`就好像……最珍贵的宝物一样。`);
    }
    return 1;
  }
  return 0;
});

// @kojo_message_com_904
async function kojo_message_com_904(rand) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {
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

  if (era.get(`tequip:${target}:55`)) {
    return colosseum_kojo_904();
  }

  if (era.get(`talent:${target}:9`) == 1) {
    return 0;
  }

  if (era_flag.selectcom == 0) {
    if (chara(target).kojo.爱抚 == 0) {
      if (era.get(`mark:${target}:2`) >= 2) {
        await era.printAndWait(`「嗯呼……呜……」`);
      } else {
        await era.printAndWait(`「呀……在摸哪里呀……」`);
        await era.printAndWait(`「呜……不要……感觉，好奇怪……」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      chara(target).kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……主人的手指……❤」`);
        await era.printAndWait(`「还要……更多……❤」`);
        await era.printAndWait(
          `${target_name}主动的迎合着${master_name}的动作，坦率的接受快感。`,
        );
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……主人……」`);
        await era.printAndWait(`「诶嘿嘿……最喜欢了……❤」`);
        await era.printAndWait(
          `${target_name}充满爱意的看着${master_name}，感受着从身上传来的快感。`,
        );
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……主人……」`);
        await era.printAndWait(`「呼嗯……啊……」`);
        await era.printAndWait(
          `被抚摸着的${target_name}因为快感而轻轻的喘息着。`,
        );
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呀……那里……呜……」`);
        await era.printAndWait(`「感觉……好奇怪……」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 3;
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呀呜呜，在摸哪里呀……」`);
        await era.printAndWait(`「不要啦……好，好痒呜呜～」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        chara(target).kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 1) {
    if (chara(target).kojo.舔阴 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        await era.printAndWait(`「呜呜，那，那里……不，不要舔呜～」`);
        await era.printAndWait(
          `无视${target_name}的话语，${master_name}毫不费力的分开了她的双脚。`,
        );
        await era.printAndWait(
          `还不知男人为何物的小穴，在空气中轻轻的颤抖着。`,
        );
      } else {
        await era.printAndWait(`「呜呜，那，那里……不，不要舔呜～」`);
        await era.printAndWait(
          `无视${target_name}的话语，${master_name}毫不费力的分开了她的双脚。`,
        );
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      chara(target).kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊嗯……主人……❤」`);
        await era.printAndWait(`「呼嗯啊～好舒服的说～❤」`);
        await era.printAndWait(
          `${target_name}的两手抱着自己的大腿分开来，将湿漉漉的下半身完全呈献给${master_name}，任由${master_name}的舌头在下半身舔弄着。`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「诶……要舔下面什么的……」`);
        await era.printAndWait(`「主人真是的……❤」`);
        await era.printAndWait(
          `${target_name}红着脸看着${master_name}，分开自己的大腿。`,
        );
        await era.printAndWait(`「请慢用……的说……」`);
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……主人……请……温柔一点……」`);
        await era.printAndWait(`「这种事……哈呜……」`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 3;
      } else if (chara(target).kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不可以……那里是……」`);
        await era.printAndWait(
          `${target_name}有些抗拒的用小手推搡着${master_name}的头。`,
        );
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        chara(target).kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 2) {
    if (chara(target).kojo.肛门爱抚 == 0) {
      await era.printAndWait(`「呼诶，那，那里是……」`);
      await era.printAndWait(`「不行……！后面……不行……！」`);
      await era.printAndWait(`意外的受到了稍微激烈一点的抵抗。`);
      await era.printAndWait(
        `不过终归只是个小孩子罢了，这点抵抗完全没有起到任何作用。`,
      );
      // CFLAG:303  = 1（变量语义：CFLAG 族，303）
      chara(target).kojo.肛门爱抚 = 1;
      return 0;
    } else {
      const p = era0(`palam:${target}:3`) + era0(`delta:${target}:3`);

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯哈……❤主人的手指……在里面呢……❤」`);
        await era.printAndWait(`「主人……再多玩弄一下${sc()}的后面吧……❤」`);
        await era.printAndWait(
          `${target_name}主动的迎合着${master_name}的动作，透明的液体沿着${master_name}的手指滴下来。`,
        );
        // CFLAG:303  = 9（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人……呼嗯……❤」`);
        await era.printAndWait(`「还想要……更多呢……❤」`);
        await era.printAndWait(
          `柔软的肠壁不停的蠕动着，紧紧的吸着${master_name}的手指不放。`,
        );
        // CFLAG:303  = 8（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呀，主人，真是粗暴呢……❤」`);
        await era.printAndWait(`「但是，这样也……很舒服哟❤」`);
        await era.printAndWait(
          `虽然有些缺少润滑，但是感受到快感的肠壁却仍然积极的回应着。`,
        );
        await era.printAndWait(`……就是这样的体质吧……？`);
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呜……后面……好舒服……呜呀……❤」`);
        await era.printAndWait(`「呜呜，不行～感觉，要，要变得奇怪了啦～❤」`);
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        p >= PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊……主人……嗯……」`);
        await era.printAndWait(`「后面……很舒服的说……」`);
        await era.printAndWait(
          `柔软的肠壁不停的蠕动着，紧紧的吸着${master_name}的手指不放。`,
        );
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        p < PALAMLV[2] &&
        (chara(target).kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……主人……请，请温柔一点的说……」`);
        await era.printAndWait(`「稍微……有点……难受……」`);
        await era.printAndWait(
          `虽然有些缺少润滑，但是感受到快感的肠壁却仍然积极的回应着。`,
        );
        await era.printAndWait(`……就是这样的体质吧……？`);
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 4;
      } else if (
        p >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……虽然很害羞……」`);
        await era.printAndWait(`「可是……好舒服呜……」`);
        await era.printAndWait(
          `感受着从屁股传来的异样的快感，${target_name}忍不住动起腰迎合起手指来……`,
        );
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 3;
      } else if (chara(target).kojo.肛门爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜……不要……感觉……好难受……」`);
        await era.printAndWait(
          `感受着屁股传来的异样的感觉，${target_name}带着哭腔轻轻哀求着。`,
        );
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        chara(target).kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 3) {
    if (chara(target).kojo.自慰 == 0) {
      await era.printAndWait(`「呜……？自……慰……？」`);
      await era.printAndWait(`「……诶诶？！自己做那种事？！」`);
      await era.printAndWait(`……对这些事情真的是完全不明白的样子。`);
      // CFLAG:304  = 1（变量语义：CFLAG 族，304）
      chara(target).kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊啊……H的事情……好舒服呢……❤」`);
        await era.printAndWait(`「呐呐，主人，再来做更多H的事情嘛～❤」`);
        await era.printAndWait(
          `「诶嘿嘿，${sc()}知道的哟，进到肚子里面的话，会更加舒服的吧～❤」`,
        );
        await era.printAndWait(
          `${target_name}纤细的手指分开湿漉漉的幼穴，中指还在不断的磨蹭着阴蒂。`,
        );
        await era.printAndWait(
          `从不断流出爱液的小穴中，隐约可以看见粉嫩的处女膜。`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「呼啊……摩擦小豆豆的话……就会……很舒服呢……❤」`);
          await era.printAndWait(`「诶嘿嘿，都是主人教给我的哟❤」`);
          await era.printAndWait(
            `${target_name}的手指在下半身摩擦着，隐约的传来了淫靡的水声。`,
          );
        } else {
          await era.printAndWait(`「呼啊……❤嗯……❤哈……❤」`);
          await era.printAndWait(
            `${target_name}含着手指，另一只手在幼穴上不停摩擦着，透明的爱液沿着白嫩的大腿流下来。`,
          );
          await era.printAndWait(`「H的事情……喜欢……最喜欢了……❤」`);
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯哈……主人……」`);
        await era.printAndWait(`「是……这样吗……」`);
        await era.printAndWait(
          `${target_name}纤细的手指分开湿漉漉的幼穴，中指还在不断的磨蹭着阴蒂。`,
        );
        await era.printAndWait(
          `从不断流出爱液的小穴中，隐约可以看见粉嫩的处女膜。`,
        );
        await era.printAndWait(
          `「呐呐……主人……H的事情……更进一步也没问题的哟……」`,
        );
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「呼啊……主人……❤」`);
          await era.printAndWait(
            `想象着自己的手指是${master_name}的${target_name}，满脸痴态的玩弄着自己的身体。`,
          );
          await era.printAndWait(`「主人……嗯……最喜欢你了……❤」`);
        } else {
          await era.printAndWait(`「虽说是因为主人的命令……」`);
          await era.printAndWait(`「但是小豆豆……好舒服……❤」`);
          await era.printAndWait(
            `${target_name}摇动着纤细的腰部，摩擦着自己幼小的下半身。`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「呼诶，自己……H？」`);
          await era.printAndWait(`「呜呜……主人……真是的……」`);
          await era.printAndWait(
            `${target_name}有些害羞的在${master_name}面前玩弄着自己尚未发育成熟的身体。`,
          );
        } else {
          await era.printAndWait(`「呜呜……不，不要看啦……」`);
          await era.printAndWait(
            `${target_name}眼角挂着泪珠，在${master_name}的命令下玩弄着自己的身体。`,
          );
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 3;
      } else if (chara(target).kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「呜……讨厌……呜……」`);
          await era.printAndWait(
            `${target_name}轻轻抽泣着，因害怕${master_name}的淫威而不得不照做，`,
          );
        } else {
          await era.printAndWait(`「哈呜……感觉……手指好酸哦……」`);
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        chara(target).kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 5) {
    if (chara(target).kojo.胸爱抚 == 0) {
      if (
        era.get(`talent:${target}:85`) == 1 ||
        era.get(`talent:${target}:76`) == 1
      ) {
        await era.printAndWait(`「呀呜……主人……好，好痒啊……」`);
        await era.printAndWait(
          `感受着柔软而小巧的胸部，${master_name}坏笑着加大了动作的力度……`,
        );
      } else {
        await era.printAndWait(`「为，为什么要摸这种地方……」`);
        await era.printAndWait(`「呀呜……感觉……好奇怪……」`);
      }
      // CFLAG:306  = 1（变量语义：CFLAG 族，306）
      chara(target).kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯哈……呀……❤」`);
        await era.printAndWait(`「主人……好舒服……❤」`);
        await era.printAndWait(
          `${target_name}靠在${master_name}怀里轻轻的喘息着，皮肤微微泛着潮红。`,
        );
        await era.printAndWait(
          `${master_name}的手掌轻易的包住了几乎毫无起伏的小小胸部，手指不断蹂躏着因为快感而硬起来的小草莓。`,
        );
        if (era.get(`talent:${target}:130`)) {
          await era.printAndWait(
            `在不断的快感刺激下，乳头尖端缓缓分泌出乳汁来。`,
          );
          await era.printAndWait(`「诶嘿嘿，${sc()}也有牛奶给主人喝呢❤」`);
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呜呜……玩弄胸部什么的……主人会开心吗？」`);
        await era.printAndWait(
          `「虽然${sc()}的胸部很小……但是主人喜欢的话，不管多少次都可以……」`,
        );
        await era.printAndWait(
          `${target_name}靠在${master_name}怀里轻轻的喘息着，皮肤微微泛着潮红。`,
        );
        await era.printAndWait(
          `${master_name}的手掌轻易的包住了几乎毫无起伏的小小胸部，手指不断蹂躏着因为快感而硬起来的小草莓。`,
        );
        if (era.get(`talent:${target}:130`)) {
          await era.printAndWait(
            `在不断的快感刺激下，乳头尖端缓缓分泌出乳汁来。`,
          );
          await era.printAndWait(`「呜……感觉好害羞哦……」`);
        }
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (chara(target).kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呀，胸部什么的……呜呜……」`);
        await era.printAndWait(`「不，不要……感觉……好奇怪呜……」`);
        await era.printAndWait(
          `感受着胸部传来的快感，${target_name}的身体微微的颤抖着。`,
        );
        await era.printAndWait(
          `虽然嘴上说着不要，但是感受的快感的乳头已经诚实的硬了起来。`,
        );
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 3;
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呀呜……不，不要……讨厌……」`);
        await era.printAndWait(
          `${target_name}在${master_name}的怀里挣扎着，不过这只是徒劳的让揉捏的力度增大罢了。`,
        );
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 6) {
    if (chara(target).kojo.接吻 == 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(`「嗯啾……嗯……哈……」`);
        await era.printAndWait(
          `${target_name}和${master_name}的嘴唇重叠在一起，舌头相互纠缠着，唾液不断的滴落下来。`,
        );
        await era.printAndWait(`「哈……啾嗯……kiss什么的……好舒服……❤」`);
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`);
        await era.printAndWait(`「嘴巴……原来可以这么舒服……❤」`);
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        await era.printAndWait(`「嗯啾……呼……哈呜……」`);
        await era.printAndWait(
          `尽管最初有些不适应，但${target_name}很快就将身体完全的交给了${master_name}，任由对方的舌头在自己嘴里动着。`,
        );
        await era.printAndWait(`「嗯……主人……啾嗯……」`);
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`);
        await era.printAndWait(`「主人……${sc()}现在……很幸福的说……❤」`);
      } else {
        await era.printAndWait(`「呜……不要……哈……呜……！」`);
        await era.printAndWait(
          `无法对抗${master_name}力量的${target_name}被强行的夺走了初吻。`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else if (chara(target).kojo.接吻 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯啾……嗯……哈……」`);
        await era.printAndWait(
          `${target_name}和${master_name}的嘴唇重叠在一起，舌头相互纠缠着，唾液不断的滴落下来。`,
        );
        await era.printAndWait(`「哈……啾嗯……kiss什么的……好舒服……❤」`);
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`);
        await era.printAndWait(`「呼啊……主人……kiss……还要……❤」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「嗯啾……呼……哈呜……」`);
        await era.printAndWait(
          `尽管最初有些不适应，但${target_name}很快就将身体完全的交给了${master_name}，任由对方的舌头在自己嘴里动着。`,
        );
        await era.printAndWait(`「嗯……主人……啾嗯……」`);
        await era.printAndWait(`二人喘息着分开嘴唇，唾液拉出一条长长的银丝。`);
        await era.printAndWait(`「主人……最喜欢你了……❤」`);
      } else {
        await era.printAndWait(`「呜……不要……哈……呜……！」`);
        await era.printAndWait(
          `无法对抗${master_name}力量的${target_name}被舌头强行的撬开了嘴巴。`,
        );
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      chara(target).kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……❤啾……❤嗯哈……❤」`);
        await era.printAndWait(
          `${target_name}仰着头，小小的舌头贪图着快感，和${master_name}的舌头纠缠在一起。`,
        );
        await era.printAndWait(`「哈……啾嗯……kiss……最喜欢了……❤」`);
        await era.printAndWait(`「主人的kiss……好舒服……❤」`);
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……啾……和主人……接吻了呢……❤」`);
        await era.printAndWait(
          `${master_name}捧着${target_name}的小脸，肆意的享受着柔软的小嘴和舌头。`,
        );
        await era.printAndWait(`「嗯哈……总感觉……脑子里一片空白呢……❤」`);
        await era.printAndWait(
          `沉醉在和${master_name}接吻的快感中的${target_name}，望过来的眼神中满溢着幸福。`,
        );
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 4;
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (chara(target).kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「kiss……吗……」`);
        await era.printAndWait(
          `${target_name}认命的闭上眼睛，有些害怕的等待着${master_name}接下来的动作。`,
        );
        await era.printAndWait(`「嗯……啾……呜……」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 3;
      } else if (chara(target).kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜……啾……嗯呜……」`);
        await era.printAndWait(
          `被${master_name}捏住脸颊强吻的${target_name}眼角挂着泪珠，默默的承受着侵入到小嘴里的舌头。`,
        );
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        chara(target).kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 7) {
    if (chara(target).kojo.自己扒开 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「诶嘿嘿……小穴里面……主人也要看吗❤」`);
        await era.printAndWait(
          `${target_name}微微的喘着气，用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(`在小穴里还能看见薄薄的处女膜。`);
          await era.printAndWait(`「主人……快点……把${sc()}的第一次拿走吧❤」`);
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜……让主人看里面什么的……好害羞……」`);
        await era.printAndWait(`「但是……是主人的话……」`);
        await era.printAndWait(
          `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(`在小穴里还能看见薄薄的处女膜。`);
          await era.printAndWait(`「主人……那个……第一次……还请……」`);
        }
      } else {
        await era.printAndWait(`「呜呜……讨……讨厌……」`);
        await era.printAndWait(
          `${target_name}的泪水在眼睛里打转转，不情愿的微微分开了小穴。`,
        );
      }
      // CFLAG:308  = 1（变量语义：CFLAG 族，308）
      chara(target).kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「诶嘿嘿……小穴……想要主人的肉棒呢……❤」`);
        await era.printAndWait(
          `虽说是命令，但是${target_name}积极的分开小穴，主动诱惑着${master_name}。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「就这样子……把肉棒从这里……咕啾咕啾的插进去吧❤」`,
          );
        }
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「自己分开什么的……呜……好羞耻……」`);
        await era.printAndWait(`「但是……对象是主人的话……」`);
        await era.printAndWait(
          `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(`在小穴里还能看见薄薄的处女膜。`);
          await era.printAndWait(`「是主人的话……就没问题……」`);
        }
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 4;
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (chara(target).kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这种事情……主人……真是H……」`);
        await era.printAndWait(`「但是……被人看着这里什么的……不讨厌呢……」`);
        await era.printAndWait(
          `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
        );
        await era.printAndWait(`小穴微微的颤抖着，流出少许透明的爱液……`);
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 3;
      } else if (chara(target).kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……讨厌……不要看……」`);
        await era.printAndWait(
          `${target_name}轻轻抽泣着，不情愿的微微分开了小穴。`,
        );
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        chara(target).kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 8) {
    if (chara(target).kojo.插入手指 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「主人的手指……嗯……❤嗯呀……❤好舒服……❤」`);
        await era.printAndWait(
          `柔软的壁肉紧紧的包裹着手指，在刺激下不断的紧缩着。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「主人的手指……在里面……呜……❤」`);
        await era.printAndWait(
          `柔软的壁肉紧紧的包裹着手指，在刺激下不断的紧缩着。`,
        );
      } else {
        await era.printAndWait(`「呜呜……手指……进……进到身体里面了……？！」`);
        await era.printAndWait(`「不要……讨，讨厌……！」`);
      }
      // CFLAG:309  = 1（变量语义：CFLAG 族，309）
      chara(target).kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……主人的手指……好舒服……❤」`);
        await era.printAndWait(`「还想要……更多一点……❤」`);
        await era.printAndWait(
          `${target_name}积极的摇动着纤细的腰部，贪图着快感。`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……嗯哈……呀……❤」`);
        await era.printAndWait(`「主人的……手指……嗯呼……」`);
        await era.printAndWait(
          `${target_name}感受着${master_name}手指带来的快感，不时的漏出H的声音。`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜呜……我，我会乖乖的……主人……轻一点……嗯呀！」`,
        );
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 3;
      } else if (chara(target).kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不要……好难受……把手指拿出去……求求你……」`);
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        chara(target).kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 9) {
    if (chara(target).kojo.舔肛 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯啊啊……❤那里是……嗯呀～❤」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜……那里……很脏的……不可以舔～」`);
      } else {
        await era.printAndWait(`「讨厌，为什么要舔那种地方……不，不要……！」`);
      }
      // CFLAG:310  = 1（变量语义：CFLAG 族，310）
      chara(target).kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.舔肛 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯啊啊……❤呜呀……❤呼啊啊，好舒服，好舒服嗯呜～❤」`,
        );
        await era.printAndWait(
          `感受着从屁股传来的异常强烈的快感，${target_name}张着嘴大口的喘着气，呼出女孩子甘甜的气息。`,
        );
        await era.printAndWait(
          `${master_name}的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。`,
        );
        // CFLAG:310  = 7（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人的舌头……在屁股里面……嗯啊❤」`);
        await era.printAndWait(`「屁股……好，好舒服呜❤」`);
        await era.printAndWait(
          `感受着从屁股传来的快感，${target_name}发出了稚嫩而色气的喘息声。`,
        );
        await era.printAndWait(
          `${master_name}的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。`,
        );
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯呜……❤主人……哈啊……主人的舌头……嗯啊啊……❤」`);
        await era.printAndWait(`「那里……嗯……屁股……好，好舒服……❤」`);
        await era.printAndWait(
          `感受着从屁股传来的异常强烈的快感，${target_name}张着嘴大口的喘着气，呼出女孩子甘甜的气息。`,
        );
        await era.printAndWait(
          `${master_name}的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……主人的舌头……在屁股里……好害羞……」`);
        await era.printAndWait(`「但是……如果是主人的话……」`);
        await era.printAndWait(
          `${target_name}轻轻的咬着手指，感受着${master_name}的舌头，时不时轻轻颤抖着。`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……主人这个变……呜……什，什么都……没有……」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 3;
      } else if (chara(target).kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「讨厌……变态……不要嗯嗯……」`);
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        chara(target).kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 10) {
    if (chara(target).kojo.振动宝石 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呼嗯……这个是……什么……好……舒服……❤」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呼呜呜……这个……呜……动的好厉害……嗯呀……❤」`);
      } else {
        await era.printAndWait(
          `「呜呜？！这，这是什么……动的好厉害……呀……感觉……好奇怪……不要……！」`,
        );
      }
      // CFLAG:311  = 1（变量语义：CFLAG 族，311）
      chara(target).kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈啊……❤这个宝石……不停的在动呢❤那里……好舒服❤」`,
        );
        await era.printAndWait(
          `${target_name}扶着${master_name}的身体，以自己的身体压在宝石上，贪图着快感。`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……这个……好刺激……嗯呜……主人……稍微……嗯呀❤」`);
        await era.printAndWait(
          `在快感的刺激下${target_name}露出了有些恍惚的神情。`,
        );
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊……嗯……呀……啊呜……」`);
        await era.printAndWait(
          `${target_name}小小的身体不停的颤抖着，拼命忍受着快感。`,
        );
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 3;
      } else if (chara(target).kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「咿呀……什么……这是……」`);
        await era.printAndWait(
          `感受着陌生快感的幼小身体本能的抗拒着${master_name}的动作。`,
        );
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        chara(target).kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) {
    if (chara(target).kojo.壶虫 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「虽然第一次不是主人有些可惜，但是虫子的话，应该也会很舒服的吧❤」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呜呜……如，如果这是主人希望的话……${sc()}……就算是虫子也……没问题的……」`,
          );
        } else {
          await era.printAndWait(
            `「不要……不要不要不要啊……！虫子什么的……好可怕……好可怕……！」`,
          );
          await era.printAndWait(
            `蠕虫不顾哀求，粗暴的贯穿了薄薄的处女膜，象征着处女的鲜血从缝隙中流出……`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「啊哈❤肚子里面，要被虫子桑弄得乱七八糟了呢❤」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「要被这种东西……进到肚子里面去吗……虽然很可怕……但是……」`,
          );
          await era.printAndWait(`${target_name}的眼里，隐约的有一股期待。`);
        } else {
          await era.printAndWait(
            `「讨厌……要被这种东西……钻到肚子里面……不要……」`,
          );
          await era.printAndWait(`蠕虫粗暴的贯穿了幼穴，撑开了窄小的肉壁。`);
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      chara(target).kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯呀❤肚子里面……被虫子桑这样子玩弄……嗯哈❤要变得……奇怪了啦❤」`,
        );
        await era.printAndWait(
          `${target_name}的脸上露出了和年龄完全不符的淫乱的表情，率直的接受着蠕虫带来的巨大快感。`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呀……嗯……肚子里面……呜……要，要坏掉了啦～❤」`);
        await era.printAndWait(
          `蠕虫在稚嫩的腔穴中不断蠕动着，仿佛要将它捅穿一般。`,
        );
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 4;
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜……明明是……这种东西……但是……感觉……呜……不坏的样子……」`,
        );
        await era.printAndWait(
          `${target_name}咬着手指忍耐着，时不时漏出满载着色气的娇喘声。`,
        );
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 3;
      } else if (chara(target).kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呼啊……呼啊……肚……肚子里面……好难受……」`);
        await era.printAndWait(
          `${target_name}大口的喘着气，拼命的忍受着肚子里的异物。`,
        );
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        chara(target).kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼……啊哈……这样就可以了吗？」`);
      await era.printAndWait(`「接下来就是主人的肉棒了吗❤」`);
      await era.printAndWait(
        `${target_name}期待的看着${master_name}，不知是爱液还是什么的透明液体沿着小穴滴落，和地面连成一条细长的银线。`,
      );
      // CFLAG:372  = 4（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼……呼……已经……结束了吗……？」`);
      await era.printAndWait(`「虽然……那个……并不讨厌……但是……」`);
      await era.printAndWait(`「果然还是主人的……」`);
      await era.printAndWait(`${target_name}满怀着爱意的看着${master_name}。`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:2`) >= 3 &&
      (chara(target).kojo.壶虫着脱 <= 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊……哈……结束……了吗……」`);
      await era.printAndWait(
        `${target_name}有些失神的看着拔出来的蠕虫，小穴微微的开合着，似乎在期待接下来的东西。`,
      );
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 2;
    } else if (chara(target).kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊呜呜……终于……结束了……吗……」`);
      await era.printAndWait(
        `${target_name}轻轻的抽泣着，眼泪顺着脸颊流下来。`,
      );
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      chara(target).kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 12) {
    if (chara(target).kojo.振动杖 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈啊……❤这个……在动个不停……好厉害……❤」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜嗯……那里……被这个刺激着……感觉……嗯呀……❤」`);
      } else {
        await era.printAndWait(`「呀……讨厌……感觉……好奇怪……」`);
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      chara(target).kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呀～❤在那里……这样子动的话……❤」`);
        await era.printAndWait(`「嗯呀～❤这个……好厉害呜～❤」`);
        await era.printAndWait(
          `${target_name}彻底沉醉在快感中，爱液不断的沿着大腿流下来。`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咿呀……那里……被这个压着……感觉……呜……❤」`);
        await era.printAndWait(
          `在快感的刺激下${target_name}露出了有些恍惚的神情。`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜呜……被这种东西弄……舒服什么的……才……没有……嗯……」`,
        );
        await era.printAndWait(`${target_name}咬着牙，努力的忍受着快感。`);
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 3;
      } else if (chara(target).kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呀……这种东西……呜……不要……！」`);
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        chara(target).kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) {
    if (chara(target).kojo.肛门虫 == 0) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1
      ) {
        await era.printAndWait(
          `「啊哈……❤后面要被虫子桑弄得乱七八糟了呢，诶嘿嘿，好期待的说❤」`,
        );
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「屁股那里……也会被弄的很舒服吗？舒服的事情的话，最喜欢了❤」`,
        );
      } else if (era.get(`talent:${target}:77`) == 1) {
        await era.printAndWait(
          `「呼啊……虽然……虫子什么的……感觉有点可怕……但是如果要把屁股弄的很舒服的话……」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「主人想的话……${sc()}也……愿意哟……」`);
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「不要……好可怕……屁股会坏掉的……」`);
          await era.printAndWait(
            `虽然这么哀求着，幼小的菊穴却很简单的吞纳了粗大的蠕虫……`,
          );
        } else {
          await era.printAndWait(`「不要……好可怕……屁股会坏掉的……」`);
          await era.printAndWait(
            `不顾哀求和肉壁的抵抗，蠕虫强硬的插入了紧窄的雏菊中……`,
          );
        }
      }
      // CFLAG:314  = 1（变量语义：CFLAG 族，314）
      chara(target).kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛门虫 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯呀～❤屁股，舒服的……嗯呼❤舒服的要……死掉了啦❤」`,
        );
        await era.printAndWait(`「虫子桑，再……激烈一些……也……可以的呐❤」`);
        await era.printAndWait(
          `沉溺在快感中的${target_name}扭动着纤细的腰部，一次又一次的迎合着蠕虫的动作。`,
        );
        // CFLAG:314  = 9（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊❤屁股被虫子桑侵犯什么的……感觉不坏呢❤」`);
        await era.printAndWait(`「好舒服……呼啊……❤」`);
        await era.printAndWait(
          `被蠕虫侵犯着的${target_name}，直率的接受着快感。`,
        );
        // CFLAG:314  = 8（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈嗯嗯……蠕虫桑……进来了……呜嗯……❤」`);
        await era.printAndWait(
          `${target_name}的身体轻轻的颤抖着，感受着侵入到体内的异物。`,
        );
        await era.printAndWait(`「呼啊啊……在里面……咕啾咕啾的……好厉害……❤」`);
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……屁股里面……被这种东西侵犯什么的……」`);
        await era.printAndWait(
          `「虽然……好讨厌……但是……呜……好舒服……不，不想要……停下来……」`,
        );
        await era.printAndWait(
          `被蠕虫侵犯着的${target_name}，轻轻的咬着手指，似乎在做着心理斗争。`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈呜呜～屁股里面……这样子动的话……不，不可以❤」`,
        );
        await era.printAndWait(
          `被蠕虫侵犯着屁股的${target_name}，露出了恍惚的表情。`,
        );
        await era.printAndWait(`「肚子，要坏掉，要坏掉了啦～❤」`);
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……虽然有点可怕……但是是主人的话……」`);
        await era.printAndWait(`${target_name}努力的放松身体，以便蠕虫插入。`);
        await era.printAndWait(`「咕……哈呜呜……肚子里……呜……❤」`);
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「不要……讨厌……要被这种东西进到身体里什么的……」`,
        );
        await era.printAndWait(`「哈呜呜……肚子里面……进来了呜……！讨厌……！」`);
        await era.printAndWait(`蠕虫强硬的插入了已经渐渐习惯了调教的雏菊中。`);
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 3;
      } else if (chara(target).kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「这种东西……不要啊……求求你……」`);
        await era.printAndWait(`无视幼女的哀求，蠕虫强硬的插入了雏菊中。`);
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        chara(target).kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) {
    if (
      era.get(`talent:${target}:77`) == 1 &&
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 6 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼诶，就结束了吗？」`);
      await era.printAndWait(`「再继续也没问题哟❤」`);
      // CFLAG:374  = 6（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 6;
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊……屁股里面……被弄的乱七八糟了呢❤」`);
      // CFLAG:374  = 5（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 5;
    } else if (
      era.get(`talent:${target}:77`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「明明……这种事情……讨厌的说……但是……呜……不想……停下来……」`,
      );
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼啊啊……这样子结束了什么的……」`);
      await era.printAndWait(`「稍稍有点……啊呜呜……」`);
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呜……已经……结束了吗……」`);
      await era.printAndWait(`「（还想要什么的……说不出口呜……）」`);
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 2;
    } else if (chara(target).kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呜呜……终于……结束了吗……」`);
      await era.printAndWait(`${target_name}轻轻的抽泣着。`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      chara(target).kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`)) {
    if (chara(target).kojo.阴蒂夹 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊嗯……呼呀……！」`);
        await era.printAndWait(`「这个是……什么……好厉害……❤」`);
        await era.printAndWait(
          `${target_name}感受着从阴蒂传来的强烈刺激感，发出了色气满满的娇喘声。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呼啊啊……这是什么……呜嗯……感觉……那里……呼啊❤」`);
        await era.printAndWait(
          `感受着未知的快感，${target_name}轻轻的颤抖着。`,
        );
      } else {
        await era.printAndWait(`「不要……这种东西……讨厌……」`);
        await era.printAndWait(
          `被${master_name}抓住双手的${target_name}毫无反抗之力，只能被动的感受着下半身传来的奇妙感觉。`,
        );
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      chara(target).kojo.阴蒂夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊啊，小豆豆被这种东西……」`);
        await era.printAndWait(`「震个不停什么的……好舒服……❤」`);
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.阴蒂夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……这种东西……不停的在那里震动着……」`);
        await era.printAndWait(`「呜……感觉……要变得奇怪了啦……❤」`);
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 3;
      } else if (chara(target).kojo.阴蒂夹 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「咕呜……求求你……快……住手吧……呜……」`);
        await era.printAndWait(
          `被${master_name}抓住双手的${target_name}毫无反抗之力，只能被动的感受着下半身传来的奇妙感觉。`,
        );
        // CFLAG:315  = 2（变量语义：CFLAG 族，315）
        chara(target).kojo.阴蒂夹 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼啊……这样就……？」`);
      await era.printAndWait(`「接下来是主人了吗？❤」`);
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊……哈啊……」`);
      await era.printAndWait(`${target_name}大口大口的喘着气。`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 2;
    } else if (chara(target).kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「啊呜呜……好想回家……」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      chara(target).kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`)) {
    if (chara(target).kojo.乳头夹 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯呀～胸部被……这样子刺激……❤」`);
        await era.printAndWait(`「好棒，好舒服呜❤」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「哈呜呜……胸部……感觉……好奇怪呜……」`);
      } else {
        await era.printAndWait(`「呀……不要……嗯呀～」`);
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      chara(target).kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.乳头夹 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊啊……主人……这个……好舒服嗯……❤」`);
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.乳头夹 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯啊……主人……❤」`);
        await era.printAndWait(
          `${target_name}眼神朦胧的看着${master_name}，透明的唾液从嘴角滴落下来。`,
        );
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 3;
      } else {
        await era.printAndWait(`「呼……呜呜……感觉……好奇怪……」`);
        await era.printAndWait(
          `${target_name}红着脸感受着从胸部传来的奇怪感觉。`,
        );
        // CFLAG:316  = 2（变量语义：CFLAG 族，316）
        chara(target).kojo.乳头夹 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼啊……主人……快点……来做更多H的事情吧❤」`);
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.乳头夹着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯嗯……主人……请……继续……的说……」`);
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 2;
    } else if (chara(target).kojo.乳头夹着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈呜呜……奇怪的东西……不要了啦……」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      chara(target).kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    if (chara(target).kojo.肛珠 == 0) {
      if (era.get(`talent:${target}:77`) == 1) {
        await era.printAndWait(`「呜呀？！这是……什么……感觉……好奇怪……」`);
      } else if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「嗯呀，屁股里面……进来了……这个……超级舒服的说❤」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜……屁股要变得奇怪了啦❤」`);
      } else {
        await era.printAndWait(`「不要啊……这种东西……看着就觉得很奇怪呜……！」`);
      }
      // CFLAG:320  = 1（变量语义：CFLAG 族，320）
      chara(target).kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛珠 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜呜……屁股里面……感觉……好舒服……❤」`);
        await era.printAndWait(
          `感受着异常的快感的${target_name}露出了恍惚的表情。`,
        );
        await era.printAndWait(`「主人……不要……停下来嗯❤」`);
        // CFLAG:320  = 8（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊哈……这个……好厉害……❤」`);
        await era.printAndWait(`「诶嘿嘿，主人，来做更多舒服的事情吧❤」`);
        await era.printAndWait(
          `${target_name}摇动着可爱的小屁股诱惑着${master_name}。`,
        );
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊啊……进，进来了……屁股里面……一个一个的……呜呀……」`,
        );
        await era.printAndWait(`「这种事……明明……很讨厌的……」`);
        await era.printAndWait(
          `${target_name}眼角挂着泪珠，发出了有些色气的娇喘声。`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼啊啊……主人……请……更多的……呜……玩弄……${sc()}吧……」`,
        );
        await era.printAndWait(
          `${target_name}红着脸用纤细的小手分开菊穴，感受着肛珠被一颗一颗塞进去的异样的快感。`,
        );
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈呜……嗯呀……请……呜……主人……请……温柔……嗯哈……一点……」`,
        );
        await era.printAndWait(
          `毫无保留的吞入肛珠的${target_name}感受着从屁股传来的快感，轻轻的娇喘着。`,
        );
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「不要……呜呀……感觉……好难受……」`);
        await era.printAndWait(
          `这么说着的${target_name}，发出了有些色气的娇喘声……`,
        );
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 3;
      } else if (chara(target).kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「屁股……不要啊……求求你……」`);
        await era.printAndWait(
          `被${master_name}压住的${target_name}连稍微的抵抗都做不到，只能徒劳的哀求着。`,
        );
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        chara(target).kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) {
    if (
      era.get(`talent:${target}:77`) == 1 &&
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 6 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(
        `「呼啊……主人……不要停下来……想被更多的……玩弄屁股的说❤」`,
      );
      // CFLAG:379  = 6（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 6;
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯啊……这个……好舒服……哈啊……❤」`);
      // CFLAG:379  = 5（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 5;
    } else if (
      era.get(`talent:${target}:77`) == 1 &&
      (chara(target).kojo.肛珠着脱 <= 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呜……不要……拔出来……」`);
      await era.printAndWait(`${target_name}小声的请求着。`);
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼诶……感想吗……？」`);
      await era.printAndWait(`「嗯……很……舒服……的说……」`);
      await era.printAndWait(`${target_name}红着脸说这。`);
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 3;
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (chara(target).kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼啊啊……明明……讨厌这种事……为什么……」`);
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 2;
    } else if (chara(target).kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呜呜……这种事……不要了啦……」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      chara(target).kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 20) {
    if (chara(target).kojo.正常位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「嗯哈……主人的那个……进来了……呢……」`);
          await era.printAndWait(
            `${target_name}眼角挂着泪珠，未发育的小穴被肉棒强硬的破开。`,
          );
          await era.printAndWait(`「哈啊……虽然……有点痛……但是……」`);
          await era.printAndWait(`「很快就……舒服起来了……呢❤」`);
          await era.printAndWait(`「呐……主人……请……继续吧……❤」`);
          await era.printAndWait(
            `${target_name}魅惑的看着${master_name}，小脸上浮现出和年龄完全不符的欲望。`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「呜咕……呀……进……来了……呜……」`);
          await era.printAndWait(
            `${target_name}咬着手指，拼命忍受着第一次的痛处，小小的身体像触电一样不停颤抖着。`,
          );
          await era.printAndWait(`「哈呜……${sc()}……完全……没……问题的说……」`);
          await era.printAndWait(
            `「这样子……${sc()}就……彻底……是主人的东西了呢……❤」`,
          );
          await era.printAndWait(
            `尽管眼泪在眼眶里打转转，痛连说话的声音都有些颤抖。`,
          );
          await era.printAndWait(
            `但是${target_name}的脸上，满满的是幸福的表情。`,
          );
        } else {
          await era.printAndWait(`「好痛……！」`);
          await era.printAndWait(
            `「求求你……不要……快住手……好痛……好痛呜呜……！」`,
          );
          await era.printAndWait(
            `${target_name}发出了稚气的悲鸣声，在房间里回荡着。`,
          );
          await era.printAndWait(
            `被强行贯穿的幼穴，感受着强烈的刺激，拼命的排斥着异物。`,
          );
          await era.printAndWait(
            `感受着异常紧致的小穴的${master_name}，毫不怜惜的开始动起腰来……`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊哈……主人的那个……好大……塞的满满的呢❤」`);
          await era.printAndWait(
            `「呐，主人，请用肉棒，把${sc()}的小穴，咕啾咕啾的弄的一塌糊涂吧❤」`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「哈呜呜……进……来了呢……肚子里面……」`);
          await era.printAndWait(
            `被${master_name}压倒在身下的${target_name}，羞红着脸，急促的呼吸着，吐出带着甜味的热气。`,
          );
          await era.printAndWait(`「请……主人……随意使用……的说……」`);
        } else {
          await era.printAndWait(`「啊呜……咕……好难受……不要了啦……」`);
          await era.printAndWait(
            `不顾${target_name}带着哭腔的哀求，${master_name}肆意的用肉棒蹂躏着身下娇弱的幼女。`,
          );
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      chara(target).kojo.正常位 = 1;
      return 0;
    } else {
      if (era.get(`talent:${target}:76`)) {
        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          if (rand_n(3) == 1) {
            await era.printAndWait(
              `「嗯哈啊……肚子里面……嗯……好舒服……好厉害……❤」`,
            );
            await era.printAndWait(`「果然H什么的……好喜欢……❤」`);
            await era.printAndWait(`「好想就这样一直和主人做下去呢❤」`);
            await era.printAndWait(
              `${target_name}紧紧的搂着${master_name}不放，淫乱的幼穴贪图着快感，紧紧的吸着肉棒不放。`,
            );
          } else if (rand_n(2) == 1) {
            await era.printAndWait(`「哈啊……那里……又被……嗯……❤」`);
            await era.printAndWait(
              `被一次次顶到最深处的${target_name}，露出了恍惚的表情。`,
            );
            await era.printAndWait(
              `「被主人的肉棒侵犯什么的，H的事情，最喜欢了❤」`,
            );
            await era.printAndWait(`「主人，请对${sc()}做更多H的事情吧❤」`);
            await era.printAndWait(
              `还没有发育成熟的稚嫩的肉体，已经完全的沉溺在肉欲之中了……`,
            );
          } else {
            await era.printAndWait(
              `「哈啊啊❤肉棒……在小穴里面……咕啾咕啾的……嗯❤」`,
            );
            await era.printAndWait(
              `${target_name}紧紧的抓着床单，被你压在身下，不断的被抽送着，下半身随着动作发出淫靡的水声。`,
            );
            await era.printAndWait(
              `「主人……还要……还要更多的……被主人的肉棒……这样子……哈啊❤」`,
            );
            await era.printAndWait(
              `幼嫩的肉穴积极的回应着粗暴的抽送，期待着快感。`,
            );
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(`「啊哈……主人的那个……好大……塞的满满的呢❤」`);
          await era.printAndWait(
            `柔软的小穴紧紧的吸着肉棒不放，不断的蠕动着按摩着肉棒。`,
          );
          await era.printAndWait(`「被这样子侵犯……总觉得……要变得奇怪了呢❤」`);
          await era.printAndWait(
            `「诶嘿嘿，因为太舒服了，所以也是没办法得事嘛❤」`,
          );
          await era.printAndWait(`「所以……请主人……好好的侵犯${sc()}的说❤」`);
          await era.printAndWait(
            `${target_name}轻轻的含着手指，用稚气的声音说着和外表完全不符的话语。`,
          );
        } else {
          await era.printAndWait(`「嗯呀……肉棒在那里咕啾咕啾的抽送……好舒服❤」`);
          await era.printAndWait(
            `被压在身下侵犯的${target_name}，发出了快乐的声音。`,
          );
          await era.printAndWait(
            `紧窄的小穴不断的分泌着爱液，让抽送变得更加顺利。`,
          );
          await era.printAndWait(`「就这样子一直做下去……感觉也不坏呢❤」`);
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 5;
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          if (rand_n(3) == 1) {
            await era.printAndWait(`「哈啊啊……主人……不，不要……停下来……」`);
            await era.printAndWait(
              `「${sc()}的小穴……已经……没有那个就活不下去了……」`,
            );
            await era.printAndWait(`「但是……主人以外的……不想……」`);
            await era.printAndWait(`「所以……主人……哈啊……求求你……❤」`);
            await era.printAndWait(`「想更多的……和主人……在一起……」`);
          } else if (rand_n(2) == 1) {
            await era.printAndWait(`「呼啊……嗯呀……${sc()}……没问题的……」`);
            await era.printAndWait(
              `${target_name}搂着${master_name}的脖子，将自己的身体完全的交给了对方。`,
            );
            await era.printAndWait(
              `「因为……被主人的那个……做H的事情什么的……很舒服嘛……」`,
            );
            await era.printAndWait(
              `「呐……主人……请更加……疼爱${sc()}一些吧……❤」`,
            );
            await era.printAndWait(
              `被顶到最深处，不自觉漏出了快乐的声音的${target_name}，满眼桃心的望着压在自己身上的${master_name}。`,
            );
            await era.printAndWait(
              `「${sc()}的身体……就是为主人……呼啊……而存在的呢❤」`,
            );
          } else {
            await era.printAndWait(`「呜啊啊……主人……这么激烈……的话……❤」`);
            await era.printAndWait(`「${sc()}……会……嗯……坏掉的啦❤」`);
            await era.printAndWait(
              `幼小的身体在${master_name}身下因为快感而不住的颤抖着。`,
            );
            await era.printAndWait(
              `两只小脚在半空中摇晃着，时不时拍打在${master_name}的背上。`,
            );
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(`「嗯呀……主人……请……请温柔……一点……❤」`);
          await era.printAndWait(
            `${master_name}毫不费力的抓住${target_name}的双脚大大分开，用粗大的肉棒在幼穴中粗暴的抽送着。`,
          );
          await era.printAndWait(
            `被反复调教过的小穴虽然尚未发育成熟，但却紧紧的吸着肉棒不放，无视着主人的意志贪图着快感。`,
          );
          await era.printAndWait(`「呀……哈呜……那里……被……这样子……嗯呀❤」`);
          await era.printAndWait(
            `${target_name}闭着眼睛，嘴角挂着泪珠，随着${master_name}的动作一下一下的被推动着，发出了色气的娇喘声。`,
          );
        } else {
          await era.printAndWait(`「哈呜呜～主人，太激烈，太激烈了啦～～」`);
          await era.printAndWait(
            `${master_name}握着${target_name}纤细的腰部，一下一下的冲撞着最深处。`,
          );
          await era.printAndWait(
            `「呜呜……小穴被主人这样子……侵犯……塞得满满的……嗯呀～❤」`,
          );
          await era.printAndWait(
            `时不时漏出可爱的声音的${target_name}，更加的激发了${master_name}的兽欲。`,
          );
          await era.printAndWait(
            `稚嫩的肉壁深处传来的吸力，不断的为肉棒送去更大的快感。`,
          );
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊啊……请……主人……呜……随意……使用……的说……」`);
        await era.printAndWait(
          `感受着${master_name}的肉棒一次次的侵入自己身体的${target_name}，不时的用稚气的声音发出可爱的娇喘声。`,
        );
        await era.printAndWait(
          `幼穴似乎已经渐渐习惯了粗大的肉棒，开始积极的回应起${master_name}来。`,
        );
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……请……主人……随意……使用……的说……」`);
        await era.printAndWait(
          `${target_name}拼命的忍耐着异物感，任由${master_name}的肉棒在自己未发育成熟的下半身抽送着。`,
        );
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 3;
      } else if (chara(target).kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哈咕……不……要……呼呀……好难受……」`);
        await era.printAndWait(
          `${master_name}无视着${target_name}的哀求，毫不怜惜的用肉棒蹂躏着未成年的幼穴。`,
        );
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        chara(target).kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 21) {
    if (chara(target).kojo.背后位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「第一次要被这样子拿走什么的，这个姿势简直像是小狗狗一样呢❤」`,
          );
          await era.printAndWait(
            `一边这么说着，${target_name}吐着可爱的小舌头，轻轻的叫了两声。`,
          );
          await era.printAndWait(
            `${master_name}像抚摸宠物一样的摸了摸${target_name}的头，然后握着纤细的腰部，猛的将肉棒刺入幼穴。`,
          );
          await era.printAndWait(`「呼呀……❤主人的肉棒……进来了……❤」`);
          await era.printAndWait(
            `尽管是第一次被肉棒插入，被${master_name}调教出来的这副淫乱的幼小躯体却紧紧的吸住肉棒不放，不停贪图着快感。`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `${master_name}从背后握着纤细的腰部，一口气贯穿了处女膜。`,
          );
          await era.printAndWait(`小小的身体因为破处的痛楚而不停的颤抖着。`);
          await era.printAndWait(
            `虽然是初经人事，柔软的肉壁却不停的按摩着肉棒。`,
          );
          await era.printAndWait(`「哈呜呜……肚子里……主人……进来了呢……」`);
          await era.printAndWait(`「虽然很痛……但是……这样${sc()}就……和主人……」`);
          await era.printAndWait(`「主人……${sc()}没问题的……所以……请尽情的……」`);
          await era.printAndWait(
            `${master_name}摸了摸${target_name}的头，仿佛像抚摸着宠物一样。`,
          );
          await era.printAndWait(`「啊……诶嘿嘿……被主人摸头了呢……好开心……❤」`);
          await era.printAndWait(
            `居高临下的看着身下像幼犬一样温顺可爱的${target_name}，俯下身去开始用肉棒肆意侵犯起娇嫩的幼穴来……`,
          );
        } else {
          await era.printAndWait(`「不……不要……你要做什么……好可怕……」`);
          await era.printAndWait(
            `头被强行的按住，无法看到背后的${target_name}，只能害怕的不停颤抖着，感受着又粗又热的肉棒贴到自己的下半身，然后猛的进入到自己的身体里。`,
          );
          await era.printAndWait(`象征处女的鲜红色沿着白皙的大腿流下来。`);
          await era.printAndWait(`「呜呀……好痛……求求你……快停下来呜……」`);
          await era.printAndWait(
            `因为哀求和悲鸣声而更加兴奋的${master_name}，毫不怜惜的压在${target_name}背上，开始蹂躏起身下娇小的身躯来。`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「诶嘿嘿，这个姿势简直像是小狗狗一样呢❤」`);
          await era.printAndWait(
            `一边这么说着，${target_name}吐着可爱的小舌头，轻轻的叫了两声。`,
          );
          await era.printAndWait(
            `${master_name}像抚摸宠物一样的摸了摸${target_name}的头，然后握着纤细的腰部，猛的将肉棒刺入幼穴。`,
          );
          await era.printAndWait(`「呼呀……❤主人的肉棒……进来了……❤」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「哈呜呜……这个姿势……有点害羞呢……」`);
          await era.printAndWait(
            `${master_name}从背后握着纤细的腰部，用力的将肉棒插入了娇嫩的幼穴中。`,
          );
          await era.printAndWait(`「呜呀……主人的那个……呜……哈啊……❤」`);
          await era.printAndWait(`「肚子里面……好热……呜……」`);
        } else {
          await era.printAndWait(`「不……不要……你要做什么……好可怕……」`);
          await era.printAndWait(
            `头被强行的按住，无法看到背后的${target_name}，只能害怕的不停颤抖着，感受着又粗又热的肉棒贴到自己的下半身，然后猛的进入到自己的身体里。`,
          );
          await era.printAndWait(`「呜呀……好痛……求求你……快停下来呜……」`);
          await era.printAndWait(
            `因为哀求和悲鸣声而更加兴奋的${master_name}，毫不怜惜的压在${target_name}背上，蹂躏着身下娇小的身躯。`,
          );
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      chara(target).kojo.背后位 = 1;
      return 0;
    } else {
      if (era.get(`talent:${target}:76`)) {
        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          switch (rand_n(6)) {
            case 5: {
              await era.printAndWait(`「好舒服……主人……肉棒……好舒服啊❤」`);
              await era.printAndWait(
                `「脑子里面，已经没办法想其他事情了啦～❤」`,
              );
              await era.printAndWait(
                `${target_name}支撑着身体，任由${master_name}握着自己的腰部侵犯着下半身。`,
              );
              await era.printAndWait(
                `幼穴忠实的回应着抽插，依依不舍的紧含着肉棒不放。`,
              );
              break;
            }
            case 4: {
              await era.printAndWait(`「呼啊……主人……嗯……嗯呀……❤」`);
              await era.printAndWait(`「小穴……那里……舒服的要死掉了啦❤」`);
              await era.printAndWait(`「主人……嗯呀❤……肉棒……还想要更多的说❤」`);
              break;
            }
            case 3: {
              await era.printAndWait(`「这个姿势……像小狗狗一样呢～汪～❤」`);
              await era.printAndWait(
                `${target_name}像小狗微微的吐着舌头，被按倒在床上像小动物一样被侵犯着。`,
              );
              await era.printAndWait(
                `稚嫩的肉壁贪图着快感，不断的吸吮着肉棒，随着抽插一阵阵的紧缩着。`,
              );
              break;
            }
            case 2: {
              await era.printAndWait(
                `「呼呀……❤……玩弄舌头什么的……太犯规了啦……❤」`,
              );
              await era.printAndWait(
                `${master_name}只用一只手就轻松的将娇小的${target_name}压在桌上。`,
              );
              await era.printAndWait(
                `一边前后活动着腰部，不停的在幼穴里抽送着，一边捏弄着可爱的小舌头，晶莹的唾液伴随着含糊不清的娇喘声从指缝间流到桌上。`,
              );
              await era.printAndWait(
                `小脚随着快感在半空中轻轻的颤抖着，透明的爱液随着激烈的抽送从交合的地方滴到地上，拉出一条细细的淫靡的银丝。`,
              );
              break;
            }
            case 1: {
              await era.printAndWait(
                `${target_name}的小手扶着墙，转过头来用湿润的眼睛看着${master_name}，`,
              );
              await era.printAndWait(
                `${master_name}握着${target_name}的腰部，毫不费力的配合着肉棒的动作将身体拉向自己，两只小脚在半空中随着动作前后晃动着。`,
              );
              await era.printAndWait(`肉体不断的撞击着，发出啪啪啪的声音。`);
              break;
            }
            case 0: {
              await era.printAndWait(
                `${master_name}从后面抓着${target_name}的小手，前后不断的抽送着。`,
              );
              await era.printAndWait(
                `虽然看起来好像有用脚在支撑着，但是在被侵犯的快感下小小的身体很快就沦陷了，如果不是被${master_name}拉着，大概已经站不住了吧。`,
              );
              await era.printAndWait(
                `透明的爱液从两腿中间滴下来，拉出一条细细的银丝。`,
              );
              break;
            }
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯呜……哈呀……肚子里面……在咕啾咕啾的……哈呀❤」`,
          );
          await era.printAndWait(
            `一次次的迎接着冲撞的${target_name}努力的抬高下半身，主动的迎合着${master_name}，幼小的肉穴随着抽送发出了淫靡的水声。`,
          );
          await era.printAndWait(`「主人的肉棒……好厉害的说❤」`);
          await era.printAndWait(`「呜嗯，小穴……要被主人玩坏了啦……❤」`);
        } else {
          await era.printAndWait(`「哈啊，H的事情，好舒服❤」`);
          await era.printAndWait(
            `「诶嘿嘿，主人，更加激烈一些的使用${sc()}也没关系的哟❤」`,
          );
          await era.printAndWait(
            `${target_name}轻轻的喘息着，时不时漏出甜美的娇喘声。`,
          );
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 5;
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          switch (rand_n(6)) {
            case 5: {
              await era.printAndWait(`「嗯呀～主人，主人～嗯～」`);
              await era.printAndWait(
                `「肚子里面，被这样子搅动，舒服的要死掉了啦～」`,
              );
              await era.printAndWait(`「和主人做H的事情……好幸福……❤」`);
              await era.printAndWait(
                `${target_name}的小眼睛里满满都是迷恋，像小狗一样从背后被一次次的冲撞着。`,
              );
              break;
            }
            case 4: {
              await era.printAndWait(`「呜呜……这个姿势……有点害羞呢……」`);
              await era.printAndWait(`「但是……因为是主人……所以没问题……」`);
              break;
            }
            case 3: {
              await era.printAndWait(
                `「如果主人喜欢这样子的话……${sc()}什么样都没问题的哟，汪～」`,
              );
              await era.printAndWait(
                `${target_name}像小狗微微的吐着舌头，汪汪的叫着，用小小的身体取悦着${master_name}。`,
              );
              await era.printAndWait(
                `稚嫩的肉壁在刺激下不断的收缩吸吮着肉棒，随着抽插一阵阵的缩紧，仿佛在贪图着快感一样。`,
              );
              break;
            }
            case 2: {
              await era.printAndWait(
                `${master_name}只用一只手就轻松的将娇小的${target_name}压在桌上。`,
              );
              await era.printAndWait(
                `一边活动着腰部，一边捏弄着可爱的小舌头，晶莹的唾液伴随着含糊不清的娇喘声从指缝间流到桌上。`,
              );
              await era.printAndWait(
                `${master_name}轻轻的咬着${target_name}的耳朵，说着下流的话语。幼女身上特有的淡淡的香气萦绕在鼻尖，更加刺激了${master_name}的欲望。`,
              );
              await era.printAndWait(
                `「呼啊……主人……嗯哈……那种事……呀……不要说……」`,
              );
              await era.printAndWait(
                `毫无反抗能力的${target_name}小脸羞红的仿佛要滴出水一样，小脚随着快感在半空中轻轻的颤抖着，透明的爱液随着激烈的抽送从交合的地方滴到地上，拉出一条细细的淫靡的银丝。`,
              );
              break;
            }
            case 1: {
              await era.printAndWait(
                `${target_name}的小手扶着墙，转过头来用湿润的眼睛看着${master_name}，`,
              );
              await era.printAndWait(
                `${master_name}握着${target_name}的腰部，毫不费力的配合着肉棒的动作将身体拉向自己，两只小脚在半空中随着动作前后晃动着。`,
              );
              await era.printAndWait(
                `${target_name}轻轻的喘息着，时不时漏出几声甜美的娇喘。`,
              );
              break;
            }
            case 0: {
              await era.printAndWait(
                `${master_name}从后面抓着${target_name}的小手，前后不断的抽送着。`,
              );
              await era.printAndWait(
                `虽然看起来好像有用脚在支撑着，但是在${master_name}的侵犯下小小的身体很快就软了下来，如果不是被${master_name}拉着，大概已经站不住了吧。`,
              );
              await era.printAndWait(
                `透明的爱液从两腿中间滴下来，拉出一条细细的银丝。`,
              );
              break;
            }
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(`「哈呜呜……肚子里……塞得满满的……嗯呀……❤」`);
          await era.printAndWait(
            `已经完全习惯了肉棒的幼穴紧紧的吸住肉棒不放，仿佛要把肉棒榨出汁来。`,
          );
          await era.printAndWait(
            `「呜呜……虽然说出来好害羞……但是……呜……H……好舒服……」`,
          );
        } else {
          await era.printAndWait(`「呼啊……主人……这样子……嗯呜……」`);
          await era.printAndWait(
            `${target_name}抱着枕头，小脸泛着红晕，轻轻的喘息着。`,
          );
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${target_name}乖巧的趴在床上，小手分开幼穴，迎接着${master_name}的肉棒。`,
        );
        await era.printAndWait(
          `从身体到精神上完全屈服于${master_name}的她，渐渐的开始习惯了H的事情。`,
        );
        await era.printAndWait(
          `「哈呜……这种事情……不是说喜欢什么的呜……但是……哈啊……」`,
        );
        await era.printAndWait(`比起苦闷的声音来，似乎快乐占的比重更多一些。`);
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `虽然嘴上不承认，但是娇嫩的肉壁却紧紧的贴合着肉棒，在快感的刺激下诚实的分泌着爱液。`,
          );
        }
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯咕……呜……哈呜……」`);
        await era.printAndWait(
          `${target_name}含着泪花趴在床上，默默的承受着${master_name}的抽送。`,
        );
        await era.printAndWait(
          `虽然已经不会反抗了，但是要习惯H的事情似乎还需要一点时间。`,
        );
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 3;
      } else if (chara(target).kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……不要……哈呜……好难受哦……」`);
        await era.printAndWait(
          `被压在身下，连象征性的反抗都做不到的${target_name}只能带着哭声小声的哀求着。`,
        );
        await era.printAndWait(
          `因为哀求声更加兴奋的${master_name}，毫不怜惜的凌辱着身下的幼女。`,
        );
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        chara(target).kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 22) {
    if (chara(target).kojo.对面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「诶嘿嘿……第一次能和主人面对面的……真是最棒了呢❤」`,
          );
          await era.printAndWait(
            `${target_name}搂着${master_name}的脖子，小肚子不停的磨蹭着肉棒。`,
          );

          if (chara(target).kojo.接吻) {
            await era.printAndWait(`「啾……嗯……」`);
            await era.printAndWait(
              `${target_name}的小脸主动迎上来，柔软的嘴唇像蜜糖一样和${master_name}的嘴重合在一起。`,
            );
          }
          await era.printAndWait(
            `${master_name}的肉棒毫不留情的刺穿了处女膜，象征着初次的鲜红色沿着肉棒流了下来。`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「第一次那个……能和主人这样子……互相看着……${sc()}……好开心……❤」`,
          );
          await era.printAndWait(
            `${target_name}靠在${master_name}的胸口，小脸泛着红晕。`,
          );

          if (chara(target).kojo.接吻) {
            await era.printAndWait(`「kiss……可以吗……？」`);
            await era.printAndWait(`「嗯啾……呼……啊……」`);
            await era.printAndWait(
              `二人的舌头交缠在一起，软软的小舌头像布丁一样，小嘴里充斥着幼女特有的甘甜的味道。`,
            );
          }
          await era.printAndWait(
            `感受着肉棒进入到身体里的${target_name}，小小的身体疼痛而微微颤抖着，象征着初次的鲜红色沿着肉棒流了下来。`,
          );
          await era.printAndWait(
            `${target_name}抬起头用湿润的眼睛看着${master_name}，虽然眼泪在眼眶里打转转，但是小脸上满溢着幸福的表情。`,
          );
        } else {
          await era.printAndWait(`「呜呜……好……痛……求求你……不要……」`);
          await era.printAndWait(
            `被${master_name}抱在怀里的${target_name}，被肉棒深深的插进了身体里，一下子就顶到了最深处。鲜红色的液体沿着肉棒流下来，滴到地上。`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「主人的肉棒……进来了呢❤」`);
          await era.printAndWait(`「这个姿势……诶嘿嘿，顶到了最里面……呀❤」`);
          await era.printAndWait(
            `${target_name}搂着${master_name}的脖子，积极的摇动着腰部，贪图着H的快感。`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「哈呜……主人……肉棒……太深……太深了啦……！」`);
          await era.printAndWait(
            `虽然最初有些不适应的样子，但是随着最深处被一下一下的冲击着，${target_name}很快就发出了甜美的娇喘声。`,
          );
        } else {
          await era.printAndWait(`「呜……肚子里面……被……顶到了……好难受……」`);
          await era.printAndWait(
            `${master_name}捏着柔软的小屁股，毫不怜惜的一次次的将肉棒顶向里面。`,
          );
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      chara(target).kojo.对面座位 = 1;
      return 0;
    } else {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`talent:${target}:232`) || era.get(`talent:${target}:75`)) {
          if (rand_n(3) == 0) {
            await era.printAndWait(`「嗯啾……哈……嗯……❤」`);
            await era.printAndWait(`「肉棒……还要……还要变得更舒服……❤」`);
            await era.printAndWait(`「主人……嗯……啾……❤」`);
            await era.printAndWait(
              `二人一次次的接吻着，${target_name}搂着${master_name}不放，任由对方像使用飞机杯一样使用自己的身体。`,
            );
          } else if (rand_n(2) == 0) {
            await era.printAndWait(
              `「哈啊……主人的肉棒在肚子里……嗯……好舒服……❤」`,
            );
            await era.printAndWait(`「里面被这样顶着的快感……嗯呀……❤」`);
            await era.printAndWait(
              `感受着幼嫩的小穴被肉棒贯穿的快感的${target_name}，扭动着腰部迎合着身下的肉棒。`,
            );
            await era.printAndWait(
              `「主人……请更多的……用肉棒……嗯……在${sc()}的小穴里……❤」`,
            );
          } else {
            await era.printAndWait(
              `「嗯呀……好舒服……被肉棒欺负什么的……最喜欢了❤」`,
            );
            await era.printAndWait(
              `托着软软的小屁股的${master_name}，一边揉捏着柔嫩的臀肉，一边用力的挺动着腰部。`,
            );
            await era.printAndWait(
              `被肉棒一次次顶着最深处的${target_name}，用稚嫩的声音发出了和年龄不符的色气的娇喘声。`,
            );
            await era.printAndWait(
              `「呼啊……请主人……把精液牛奶……满满的注射到${sc()}的肚子里面吧……❤」`,
            );
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「诶嘿嘿……主人的肉棒……在${sc()}的那里……咕啾咕啾的动着呢❤」`,
          );
          await era.printAndWait(
            `「嗯啊……请主人……更加用力的……侵犯${sc()}的……H的小穴吧❤」`,
          );
          await era.printAndWait(
            `已经完全习惯了肉棒的幼穴渴求着快感，不断的分泌着爱液，侍奉着肉棒。`,
          );
          await era.printAndWait(
            `感受到这一点的${master_name}，更加用力的抽送起来。`,
          );
        } else {
          await era.printAndWait(`「嗯……哈啊……H的事情……好棒……❤」`);
          await era.printAndWait(`「能被主人的肉棒侵犯……真是最棒了呢❤」`);
          await era.printAndWait(
            `${target_name}抬着头仰视着${master_name}，湿润的眼睛里满是诱惑。`,
          );
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:232`) || era.get(`talent:${target}:75`)) {
          if (rand_n(3) == 0) {
            await era.printAndWait(`「啾……哈……主人……喜欢……❤」`);
            await era.printAndWait(`「主人……求求你，不要和${sc()}分开来……」`);
            await era.printAndWait(`「${sc()}已经……没有主人就活不下去了……」`);
            await era.printAndWait(
              `${target_name}轻声朝着${master_name}撒着娇，扭动着幼小的身体，积极的回应着${master_name}。`,
            );
          } else if (rand_n(2) == 0) {
            await era.printAndWait(`「啊呜呜……主人……嗯……好舒服……的说……❤」`);
            await era.printAndWait(
              `${target_name}靠在${master_name}的怀里，纤细的腰部被握住，小小的身体仿佛飞机杯一样被使用着。`,
            );

            if (chara(target).kojo.接吻) {
              await era.printAndWait(`「主人……ki……ss……可以咩……？」`);
              await era.printAndWait(
                `${target_name}仰着头，用湿润的眼睛望着${master_name}`,
              );
              await era.printAndWait(
                `二人的舌头交缠在一起，晶莹的唾液从嘴角流下来。`,
              );
              await era.printAndWait(`「嗯……啾……哈啊……」`);
            }
          } else {
            await era.printAndWait(`「哈啊……被主人抱着……好幸福……❤」`);
            await era.printAndWait(
              `${target_name}轻轻的蹭着${master_name}的胸口，小脸上满是幸福的表情。`,
            );
            await era.printAndWait(
              `${master_name}一边揉捏着小屁股，一边轻轻的摸着${target_name}的头，一下一下的活动着腰部。`,
            );
            await era.printAndWait(
              `从被侵犯中感受到快感的${target_name}，时不时漏出可爱的娇喘声来。`,
            );
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(`「哈呜呜……肚子里面……被……顶到了……呢……」`);
          await era.printAndWait(
            `小小的身体仿佛没有重量一样，被${master_name}托着上下抽送着。`,
          );
          await era.printAndWait(
            `已经习惯了肉棒的小穴，紧紧的吸着不放，为${master_name}送去更多的快感。`,
          );
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈……嗯咕……呀……」`);
        await era.printAndWait(
          `${master_name}握着怀中的小人纤细的腰部，肆意的侵犯着。`,
        );
        await era.printAndWait(`「这种事情……明明……不喜欢的……但是……嗯哈……」`);
        await era.printAndWait(
          `被不停抽送着的${target_name}，虽然尽力的在忍耐，但还是时不时的漏出可爱的娇喘声。`,
        );
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊啊……里面……好……好涨呜……」`);
        await era.printAndWait(
          `${master_name}握着怀中的小人纤细的腰部，肆意的侵犯着。`,
        );
        await era.printAndWait(`「主人……请……温柔……一点……嗯呀……」`);
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 3;
      } else if (chara(target).kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……好难受……求求你……不要了啦……」`);
        await era.printAndWait(
          `被肉棒不停侵犯的${target_name}含着眼泪乞求着${master_name}。`,
        );
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        chara(target).kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 23) {
    if (chara(target).kojo.背面座位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊哈……主人要拿走${sc()}的第一次了吗❤」`);
          await era.printAndWait(
            `双脚被${master_name}大大的打开的${target_name}满眼桃心的看着自己的那里在重力的作用下慢慢的吞掉肉棒。`,
          );
          await era.printAndWait(
            `小小的身体因为疼痛而颤抖着，象征着处女的鲜红色沿着肉棒流下来。`,
          );
          await era.printAndWait(
            `但是随之而来的快感让${target_name}忍不住发出了快乐的声音。`,
          );
          await era.printAndWait(`「嗯……嗯哈……呀……肉棒……好舒服❤」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「呜呜……主人……这个姿势……好害羞呜……」`);
          await era.printAndWait(
            `被${master_name}从背后抱起，将双腿大大的打开，摆出像是小便的姿势的${target_name}，羞红着脸看着自己的那里在重力的作用下慢慢的吞掉肉棒，感受着异物慢慢进入到身体里。`,
          );
          await era.printAndWait(
            `象征着处女的鲜红色沿着肉棒流下来，滴落到地上。`,
          );
          await era.printAndWait(
            `「诶嘿嘿……这样子……${sc()}……就是主人的了呢……好开心❤」`,
          );
          await era.printAndWait(
            `虽然因为初次的疼痛而轻轻颤抖着，豆大的泪珠沿着小脸滑落，但${target_name}的脸上却满是幸福的表情。`,
          );

          if (chara(target).kojo.接吻) {
            await era.printAndWait(`「嗯啾……呼……哈……」`);
            await era.printAndWait(
              `任由${master_name}的舌头在自己嘴里舔弄的${target_name}，乖巧的将全部的身体都交给了主人。`,
            );
          }
        } else {
          await era.printAndWait(`「不……不要……那么大……${sc()}……会坏掉的啦……」`);
          await era.printAndWait(
            `${master_name}舔着${target_name}充满恐惧的小脸，慢慢的放下怀里的小人。`,
          );
          await era.printAndWait(
            `无助的看着粗大的肉棒一点点的插入到身体里的${target_name}，感受着自己的身体被异物强行的挤了进来。`,
          );
          await era.printAndWait(
            `痛苦让小小的身体用尽全部的力气拼命挣扎着，象征的处女的鲜红色沿着肉棒流下来。`,
          );
          await era.printAndWait(
            `将这微不足道的反抗轻松压制的${master_name}，开始毫不怜惜的抽送起来……`,
          );
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(`「啊哈❤这个姿势的话，一定会插的很深呢❤」`);
          await era.printAndWait(
            `双脚被${master_name}大大的打开的${target_name}满眼桃心的看着自己的那里在重力的作用下慢慢的吞掉肉棒，发出了快乐的声音。`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「呼啊……主人……嗯……嗯呀……」`);
          await era.printAndWait(
            `被${master_name}从背后抱起，将双腿大大的打开，摆出像是小便的姿势的${target_name}，羞红着脸看着自己的那里在重力的作用下慢慢的吞掉肉棒，感受着异物慢慢进入到身体里。`,
          );
        } else {
          await era.printAndWait(`「不……不要……那么大……${sc()}……会坏掉的啦……」`);
          await era.printAndWait(
            `${master_name}舔着${target_name}充满恐惧的小脸，慢慢的放下怀里的小人。`,
          );
          await era.printAndWait(
            `无助的看着粗大的肉棒一点点的插入到身体里的${target_name}，感受着自己的身体被异物强行的挤了进来。`,
          );
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      chara(target).kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          if (rand_n(4) == 0) {
            await era.printAndWait(`「呀嗯……呜……哈啊……❤」`);
            await era.printAndWait(`「里面……被这样子顶着……嗯……好棒……❤」`);
            await era.printAndWait(`「哈呀～肉棒……嗯……❤还，还要更多～❤」`);
            await era.printAndWait(
              `柔软的肉壁激烈的收缩着，在快感的刺激下不断的分泌着爱液。`,
            );
          } else if (rand_n(3) == 0) {
            await era.printAndWait(`「嗯……呀……哈啊……❤」`);
            await era.printAndWait(
              `被${master_name}抱在怀里侵犯个不停地${target_name}微微的吐着舌头，紧窄的小穴被一次次的撑开，强烈的快感不断的冲击着年幼的身体。`,
            );
            await era.printAndWait(
              `${master_name}一边用力抽送着，一边轻咬着小耳朵，说着色色的话语。`,
            );
            await era.printAndWait(
              `「${sc()}的……色色的小穴……请主人……更加用力的疼爱吧❤」`,
            );
            await era.printAndWait(
              `${target_name}含着手指，说着和稚气的外表完全不符的淫乱的话语回应着${master_name}`,
            );
          } else if (rand_n(2) == 0) {
            await era.printAndWait(`「嗯呀……最里面被这样子顶着……要坏掉了啦❤」`);
            await era.printAndWait(
              `因为重力而每次都被顶到最深处的幼穴用力的吮吸着肉棒，诚实的回应着快感。`,
            );
            await era.printAndWait(
              `幼穴的主人，被侵犯的小嘴都合不拢，从喉咙里发出了快乐的声音。`,
            );
            await era.printAndWait(
              `透明的爱液从交合的地方滴到地上，拉出一条细细的银丝。`,
            );
          } else {
            await era.printAndWait(`「哈啊……主人……这个玩法……好厉害嗯呀～～❤」`);
            await era.printAndWait(
              `${master_name}将${target_name}高高的抱起来，让肉棒只剩前端的一点留在里面，然后松开手，让小小的身体因为重力落下来，狠狠的顶到最里面。`,
            );
            await era.printAndWait(
              `仿佛要冲进子宫的猛烈的抽送产生的强烈快感让幼小的身体完全的瘫软在施暴者怀里。`,
            );
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(
            `「嗯呀……被肉棒……这样子激烈的侵犯……小穴……好舒服……❤」`,
          );
          await era.printAndWait(
            `${master_name}将${target_name}的双腿大大的分开，肆意使用着已经习惯了肉棒的小穴，享受着紧致的快感。`,
          );
          await era.printAndWait(
            `被肉棒蹂躏着的幼女，不自觉的发出了快乐的声音。`,
          );
        } else {
          await era.printAndWait(`「诶嘿嘿，这个姿势是第一次呢❤」`);
          await era.printAndWait(`「肉棒……插得好深❤」`);
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`)) {
          if (rand_n(4) == 0) {
            await era.printAndWait(`「呜……哈啊……嗯……」`);
            await era.printAndWait(`「主人……最里面……顶到了啦……❤」`);
            await era.printAndWait(`「肚子里面……好舒服……的说……」`);
            await era.printAndWait(`「好想……继续下去……嗯……❤」`);
            await era.printAndWait(
              `怀中的幼女不停的娇喘着，发出了快乐的声音。感受着肉穴快乐的收缩着的${master_name}，更加用力的向上侵犯着。`,
            );
          } else if (rand_n(3) == 0) {
            await era.printAndWait(`「啊嗯……呼……嗯呀……❤」`);
            await era.printAndWait(
              `害羞的捂着小嘴的${target_name}，从纤细的指缝之间仍然时不时漏出甘甜的娇喘声。`,
            );
            await era.printAndWait(
              `${master_name}使坏一般的，一边舔着耳朵说着色色的话语，一边更加用力的活动着腰部。`,
            );
            await era.printAndWait(`「呜呜……主人……坏……」`);
            await era.printAndWait(
              `稚气的声音轻轻抱怨着，比起讨厌来说更像是撒娇吧。`,
            );
          } else if (rand_n(2) == 0) {
            await era.printAndWait(`「哈呜呜……主人……太……嗯呀……激烈了啦……❤」`);
            await era.printAndWait(
              `${master_name}将${target_name}高高的抱起来，让肉棒只剩前端的一点留在里面，然后松开手，让小小的身体因为重力落下来，狠狠的顶到最里面。`,
            );
            await era.printAndWait(`「这样子……${sc()}……会……嗯……坏掉的❤」`);
            await era.printAndWait(
              `越是用可爱的声音求饶，就越是会刺激对方施虐的欲望。`,
            );
            await era.printAndWait(
              `仿佛要冲进子宫的猛烈的抽送产生的强烈快感让幼小的身体完全的瘫软在施暴者怀里。`,
            );
            await era.printAndWait(`……不知道她本人有没有意识到这一点呢？`);
          } else {
            await era.printAndWait(`「咕……嗯……呼啊啊……」`);
            await era.printAndWait(
              `「主人的……那个……在肚子里面……塞得满满的……❤」`,
            );
            await era.printAndWait(
              `${target_name}微微张着小嘴，眼神有些迷离。`,
            );
            await era.printAndWait(
              `到底是因为喜欢主人呢，还是因为喜欢H带来的快感呢，还是二者兼而有之呢？`,
            );
            await era.printAndWait(
              `在大脑一片空白的现在大概已经没法思考了吧。`,
            );
            await era.printAndWait(
              `透明的爱液从交合的地方滴到地上，拉出一条细细的银丝。`,
            );
          }
        } else if (era.get(`abl:${target}:2`) >= 3) {
          await era.printAndWait(`「呼嗯……主人……嗯呀……」`);
          await era.printAndWait(
            `双腿被大大分开的${target_name}羞红着脸看着交合的地方。`,
          );
          await era.printAndWait(
            `粗大的肉棒毫无道理的在幼女稚嫩的下体抽送着，从那里传来的不是不适，而是巨大的快感。`,
          );
          await era.printAndWait(
            `感受着这样快感的幼女，不自觉的发出了快乐的声音。`,
          );
        } else {
          await era.printAndWait(`「诶嘿嘿，和主人结合在一起了呢……好开心……❤」`);
          await era.printAndWait(
            `${target_name}的小手重叠在胸前，感受着体内又粗又热的肉棒。`,
          );
          await era.printAndWait(
            `虽然身体还没完全习惯这种事情，但是难受的感觉已经不在了。`,
          );
          await era.printAndWait('');
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 5;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${master_name}紧紧的抱着怀中的幼女，像使用飞机杯一样肆意抽送着。`,
        );
        await era.printAndWait(`「嗯呀……呜……哈呜呜……那里……呀呜……不……要……」`);
        await era.printAndWait(
          `${target_name}轻轻的哼着，时不时漏出甜美的声音来，虽然嘴上说着不要，身体却诚实的回应着快感。`,
        );
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 4;
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${master_name}紧紧的抱着怀中的幼女，像使用飞机杯一样肆意抽送着。`,
        );
        await era.printAndWait(`「嗯呀……呜……哈呜呜……那里……呀呜……不……要……」`);
        await era.printAndWait(
          `${target_name}轻轻的哼着，稚气的声音混杂着苦闷和快乐。`,
        );
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 3;
      } else if (chara(target).kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呜……不要……这样子用力……好难受……肚子……要坏掉了啦……！」`,
        );
        await era.printAndWait(
          `毫不理会带着苦痛的求饶，${master_name}肆意的蹂躏着怀中的小人。`,
        );
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        chara(target).kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 26) {
    if (chara(target).kojo.正常位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「屁股……吗……？嗯～请用吧～❤」`);
          await era.printAndWait(
            `${target_name}顺从的躺着，大大的分开双脚，等待着${master_name}的宠幸。`,
          );
          await era.printAndWait(
            `${master_name}将肉棒的前端对准粉嫩的雏菊，然后毫不怜惜的用力顶了进去，敏感的肉穴紧紧的包裹住肉棒，不停的吸吮着。`,
          );
        } else {
          await era.printAndWait(`「屁股……吗……？嗯～请用吧～❤」`);
          await era.printAndWait(
            `${target_name}顺从的躺着，大大的分开双脚，等待着${master_name}的宠幸。`,
          );
          await era.printAndWait(
            `${master_name}将肉棒的前端对准粉嫩的雏菊，然后毫不怜惜的用力顶了进去。`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「呼诶……屁股什么的……主人H……」`);
          await era.printAndWait(
            `${target_name}躺在床上，羞红着小脸，轻轻的咬着手指，有些害怕又有些期待的看着${master_name}。`,
          );
          await era.printAndWait(
            `${master_name}抓住纤细的脚踝分开双腿，将肉棒一口气顶了进去，敏感的肉穴紧紧的包裹住肉棒，不停的吸吮着。`,
          );
        } else {
          await era.printAndWait(`「呼诶……屁股什么的……主人H……」`);
          await era.printAndWait(
            `${target_name}躺在床上，羞红着小脸，轻轻的咬着手指，有些害怕又有些期待的看着${master_name}。`,
          );
          await era.printAndWait(
            `${master_name}抓住纤细的脚踝分开双腿，将肉棒一口气顶了进去。`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「呼啊啊啊……屁股什么的……不……不行……」`);
          await era.printAndWait(
            `后面被调教过的${target_name}，努力的想忍耐着肉棒初次进入的快感。`,
          );
        } else {
          await era.printAndWait(`「你要干什么……不要……不要啊……」`);
          await era.printAndWait(
            `${target_name}被压在床上，惊恐的看着${master_name}，小小的身体连一点点的反抗都做不到。`,
          );
          await era.printAndWait(
            `强硬将对方的双腿分开，暴露出雏菊出来的${master_name}，粗暴的将肉棒插了进去。`,
          );
        }
      }
      // CFLAG:327  = 1（变量语义：CFLAG 族，327）
      chara(target).kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「呼嗯……呀……屁股……嗯……❤」`);
          await era.printAndWait(`「主人的肉棒……侵犯后面的感觉……好棒……❤」`);
          await era.printAndWait(`「主人，还要，还想要更多～❤」`);
          await era.printAndWait(
            `沉溺于异样的快感的${target_name}，紧紧的缠着${master_name}的腰部，一刻都不愿意松开。`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「嗯啊……屁股……好舒服……❤」`);
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「虽然前面也想要和主人做……但是……屁股也不坏的感觉呢❤」`,
            );
          }
          await era.printAndWait(
            `「呐……主人……，请更加的……对${sc()}……做H的事情吧❤」`,
          );
          await era.printAndWait(
            `幼嫩的肉壁紧紧吸吮着${master_name}肉棒，贪图着异样的快感。`,
          );
        } else {
          await era.printAndWait(
            `「呼啊，主人……这么激烈的话，呜，要去了啦～❤」`,
          );
          await era.printAndWait(
            `幼小的肉壁因为强烈的快感用力的紧缩着，小孩子特有的高体温包绕着粗大的肉棒。`,
          );
          await era.printAndWait(
            `享受着被肠壁上的褶皱剐蹭的感觉，${master_name}更加用力的抽送起来。`,
          );
        }
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯呼……主人的肉棒……好厉害……在身体里面……嗯……❤」`,
        );
        await era.printAndWait(
          `${master_name}的肉棒在被多次调教过的雏菊中来回抽送着，感受着温热的雏菊带来的快感。`,
        );
        await era.printAndWait(`「哈呀……❤这样子用力的话……哈呜呜～～❤」`);
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊哈，好开心，又和主人做H的事情了呢❤」`);
        await era.printAndWait(
          `稚气的声音发出了可爱的娇喘声，小小的脚随着${master_name}的抽插在半空中晃动着。`,
        );
        await era.printAndWait(`「和主人H什么的最棒了❤」`);
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「嗯……咕……主人……❤」`);
          await era.printAndWait(`「和主人做这样子的事情……好开心……❤」`);
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「第一次什么的……已经无所谓了……只要能和主人这样子结合在一起……就满足了的说❤」`,
            );
          }
          await era.printAndWait(`「主人，最喜欢了～❤」`);
          // CFLAG:327  = 6（变量语义：CFLAG 族，327）
          chara(target).kojo.正常位肛交 = 6;
        } else if (rand_n(2) == 0) {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呼啊啊……虽然很想让主人把第一次拿走……但是……」`,
            );
          }
          await era.printAndWait(`「屁股……被主人……这样子侵犯……哈呜呜～❤」`);
          await era.printAndWait(`「感觉……好舒服……的说……❤」`);
          await era.printAndWait(
            `${target_name}搂着${master_name}的脖子，闭着眼睛感受着异物在身体内来回抽动的感觉，在快感的刺激下不住的娇喘着。`,
          );
        } else {
          await era.printAndWait(
            `「呀呜呜～这样子激烈的的侵犯的话……要，要坏掉了啦～❤」`,
          );
          await era.printAndWait(
            `被${master_name}粗暴的侵犯着的${target_name}紧紧抓着床单。`,
          );
          await era.printAndWait(
            `虽然挂着泪珠，但从嘴里发出来的却是快乐的声音。`,
          );
        }
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「呜……该说是主人的癖好吗……但是……后面也……不坏的感觉……」`,
          );
        }
        await era.printAndWait(`「被主人玩弄……很舒服……的说……」`);
        await era.printAndWait(
          `${master_name}在已经被反复调教过的雏菊中反复抽送，享受着稚嫩的肉壁剐蹭着肉棒的感觉。`,
        );
        await era.printAndWait(
          `害羞的捂着脸的${target_name}，时不时会从指缝中漏出可爱的声音。`,
        );

        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜嗯……没，没问题的……只要是主人的要求……不管是什么${sc()}都……哈呜呜～！」`,
        );
        await era.printAndWait(
          `${master_name}用肉棒强硬的在尚未开发的雏菊中抽送着，享受着肉壁排斥着异物的感觉。`,
        );
        await era.printAndWait(
          `比起快感来说痛苦更多一些的${target_name}努力的忍耐着，大口的喘着气。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「哈呜……如果这样都忍受不住的话……那第一次的时候就不能好好的侍奉主人了……」`,
          );
        }
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……嗯……哈呀啊……不……行……」`);
        await era.printAndWait(
          `${master_name}在已经被反复调教过的雏菊中反复抽送，享受着稚嫩的肉壁剐蹭着肉棒的感觉。`,
        );
        await era.printAndWait(
          `虽然精神上还有些抵抗，但肉体已经逐渐开始习惯了。`,
        );
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 3;
      } else if (
        chara(target).kojo.正常位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「呜呜……好痛……求求你……不……要……呀呜……」`);
        await era.printAndWait(
          `${master_name}无视着幼女的哭喊声，一次次强硬的拓开紧缩的雏菊。`,
        );
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        chara(target).kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 27) {
    if (chara(target).kojo.背后位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「诶～要用屁股吗……嗯～可以哟～因为被主人玩弄屁股很舒服嘛～❤」`,
          );
          await era.printAndWait(
            `${target_name}趴在床上，主动的用小手分开雏菊，露出了鲜嫩的粉红色。`,
          );
          await era.printAndWait(
            `看到这一幕的${master_name}，毫不犹豫的把肉棒插了进去……`,
          );
        } else {
          await era.printAndWait(
            `「啊哈……❤屁股什么的……会舒服的话……可以哟～❤」`,
          );
          await era.printAndWait(
            `${target_name}用小手分开了还没有多少经验的雏菊，迎接${master_name}的肉棒。`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呼啊啊……进……进来了……主人的那个……哈啊啊……在里面……好……舒服……」`,
          );
          await era.printAndWait(
            `感受着屁股传来了比平时的调教更加强烈的刺激，${target_name}紧紧的抓着床单，感受着${master_name}的肉棒在体内抽送带来的一样的快感。`,
          );
        } else {
          await era.printAndWait(`「哈呜呜……屁股里面……主人的那个……呀……」`);
          await era.printAndWait(
            `${master_name}用一只手轻松的按着幼小的身体，另一只手握着肉棒毫不怜惜的插进了未经开发的雏菊中。`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「呼……呀……不要……嗯……」`);
          await era.printAndWait(
            `虽然非常的不情愿，但是从身体里传来的快感，还是让${target_name}忍不住轻轻的发出了娇喘声。`,
          );
        } else {
          await era.printAndWait(`「哈呜呜，不行～屁股不行～呜呀～」`);
          await era.printAndWait(
            `${master_name}轻松的压制住了${target_name}的反抗，然后将肉棒插进了未经开发的雏菊中蹂躏起来……`,
          );
        }
      }
      // CFLAG:328  = 1（变量语义：CFLAG 族，328）
      chara(target).kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「哈咕……呜……嗯呀～～❤」`);
          await era.printAndWait(
            `「肉棒……好舒服……在屁股里面，好舒服呜呜～～❤」`,
          );
          await era.printAndWait(
            `「屁股好舒服呜呜，感觉，要，要飞起来了嗯嗯❤」`,
          );
          await era.printAndWait(`稚嫩的菊穴不停的按摩着肉棒，贪图着快感。`);
          await era.printAndWait(
            `${target_name}像小狗一样伏在${master_name}的身下，吐着舌头，积极的回应着粗暴的抽送。`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「啊嗯～呀～哈啊～❤」`);
          await era.printAndWait(`「屁股，好舒服～嗯～❤」`);
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「小穴什么的……哈啊～❤已经无所谓了，只要能被主人玩弄后面什么的～❤」`,
            );
          }
          await era.printAndWait(
            `像小狗一样趴着的${target_name}，感受着在屁股里用力抽送的肉棒，露出了恍惚的神情。`,
          );
          await era.printAndWait(`「主人，还要，还想要更多～❤」`);
        } else {
          await era.printAndWait(
            `「呼嗯……被主人侵犯屁股什么的……真是太舒服了……❤」`,
          );
          await era.printAndWait(`「肉棒什么的，一直待在里面就好了呢❤」`);
          await era.printAndWait(
            `被按在桌子上抽送的${target_name}，回过头看着${master_name}，小小的眼睛里充满着欲望。`,
          );
          await era.printAndWait(`「呼啊啊，不行，这样子的话，呜嗯～❤」`);
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        await era.printAndWait(
          `「啊哈……❤主人的肉棒在屁股里面……呼嗯……好有感觉……❤」`,
        );
        await era.printAndWait(
          `已经经过数次调教的雏菊已经能从H中充分的感受到快感。`,
        );
        await era.printAndWait(
          `${master_name}紧握着纤细的腰部，毫不留情的蹂躏着白嫩的小屁股。`,
        );
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈咕……嗯……主人……呀……真是粗暴呢，主人……❤」`);
        await era.printAndWait(
          `${master_name}强硬的在未经开发的雏菊中抽送着，将幼嫩的肉壁当成飞机杯一样使用着。`,
        );
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「嗯呼……呀……呼啊啊……」`);
          await era.printAndWait(`「主人的那个……呜……好舒服……好舒服的说……」`);
          await era.printAndWait(`「其他的事情……已经没办法思考了啦……❤」`);
          await era.printAndWait(
            `${target_name}努力的抬起下半身，积极的回应着粗暴的抽送。`,
          );
          await era.printAndWait(
            `紧致的雏菊用力的压榨着肉棒，分泌着润滑液，让抽送更加顺利。`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「嗯……主人……呜呀……」`);
          await era.printAndWait(`「屁股……感觉……嗯……不坏呢……」`);
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(`「虽然……很想让主人拿走第一次……」`);
            await era.printAndWait(`「但是……屁股……呼啊啊啊……好舒服……❤」`);
          }
          await era.printAndWait(
            `像小狗一样趴着的${target_name}，感受着在屁股里用力抽送的肉棒，露出了恍惚的神情。`,
          );
          await era.printAndWait(`「主人，不……不要停下来……呜嗯……」`);
        } else {
          await era.printAndWait(`「呼嗯……和主人做……H的事情……好开心……❤」`);
          await era.printAndWait(`「后面……请随便主人……呼啊啊……使用的说……」`);
          await era.printAndWait(
            `被按在桌子上抽送的${target_name}，发出了可爱的娇喘声。`,
          );
          await era.printAndWait(
            `「主人……这样子弄的话……呜呜……要，要去了啦～」`,
          );
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「虽然第一次……还没有……但是……呜……这样子……也不错……」`,
          );
        }
        await era.printAndWait(`「嗯呼……呜……嗯呀……哈啊啊……」`);
        await era.printAndWait(
          `已经经过数次调教的雏菊已经能从H中充分的感受到快感。`,
        );
        await era.printAndWait(
          `${master_name}毫不留情的握着纤细的腰部，粗暴的蹂躏着雏菊。。`,
        );
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呜呜……主人……呜……请，请温柔一点的说……」`);
        await era.printAndWait(
          `${master_name}强硬的在未经开发的雏菊中抽送着，将幼嫩的肉壁紧紧吸着肉棒，给肉棒送去快感。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「呜呜……比起后面来说……还是更想要主人……那个……第一次呜呜……」`,
          );
        }
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……哈……啊咕……」`);
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，屈辱的翘着小屁股，任由${master_name}侵犯着自己的后面。`,
        );
        await era.printAndWait(
          `（呜呜……这种事……明明讨厌这样子的……为什么……感觉……呜……好奇怪……）`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 3;
      } else if (
        chara(target).kojo.背后位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(
          `「呜呜……不要……这样子的……不要了啦……好难受……！」`,
        );
        await era.printAndWait(
          `${master_name}无视着哭声，将幼女按倒在身下，毫不留情的在未开发的雏菊里抽送着。`,
        );
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        chara(target).kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 28) {
    if (chara(target).kojo.对面座位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呼啊啊……主人的肉棒……进来了……舒服的事情……好喜欢呢……❤」`,
          );
          await era.printAndWait(
            `${target_name}露出了色气满满的表情，积极的扭动着腰部。`,
          );
        } else {
          await era.printAndWait(
            `「啊……呼啊啊……主人……动一动……也是……没问题的……❤」`,
          );
          await era.printAndWait(
            `温热的雏菊缓缓的将肉棒吞下，嫩嫩的肉壁在刺激下不住的蠕动着。`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「嗯……呀……主人的……呼啊啊……」`);
          await era.printAndWait(
            `${target_name}的小脸紧贴着${master_name}胸口，在下半身传来的快感中轻声的娇喘着。`,
          );
          await era.printAndWait(`「嗯……主人……最喜欢了……❤」`);
        } else {
          await era.printAndWait(`「哈呜呜……主人的那个……全部都……进去了呢……」`);
          await era.printAndWait(
            `${target_name}被${master_name}抱着，粗大的肉棒完全没入了紧致的雏菊中。小脸害羞的埋在${master_name}的身上。`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊……呜呜……不，不要……这种事……舒服什么的……」`,
          );
          await era.printAndWait(
            `虽然嘴上说着不愿意，但雏菊却积极的迎合着插入的异物，紧紧的吸住不放。`,
          );
        } else {
          await era.printAndWait(`「呜呜……不要……屁股什么的……呀……」`);
          await era.printAndWait(
            `被${master_name}抱在怀里侵犯着的${target_name}小手徒劳的推搡着。`,
          );
        }
      }
      // CFLAG:329  = 1（变量语义：CFLAG 族，329）
      chara(target).kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(2)) {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呼啊啊～小穴什么的……已经无所谓了～虽然也很想让主人拿走第一次……但是用后面做实在是超舒服的呐～❤」`,
            );
          }
          await era.printAndWait(`「感觉已经要……嗯呀❤～要坏掉了～❤」`);
          await era.printAndWait(
            `${master_name}紧握着纤细的腰部，像使用道具一般粗暴的侵犯着怀里的小人。`,
          );
          await era.printAndWait(
            `「主人，嗯哈～～❤已经没办法思考别的事情了，更加，用力一点，嗯～❤」`,
          );
        } else {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「哈啊……虽然第一次还在……有点遗憾……但是使用后面也很棒呢❤」`,
            );
          }
          await era.printAndWait(
            `被抱在怀里侵犯着的${target_name}，在肉棒的抽送下一次次的发出了色色的娇喘声。`,
          );
          await era.printAndWait(`「啊啊……主人……屁股……还想要更多……❤」`);
          await era.printAndWait(
            `经过调教的雏菊熟练的吮吸着肉棒，一点缝隙都不留的压榨着。`,
          );
        }
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「嗯……后面吗……不过也希望主人拿走第一次呢……」`,
          );
        }
        await era.printAndWait(
          `${target_name}搂着${master_name}的脖子，积极的迎合着动作。`,
        );
        await era.printAndWait(`「但是……呜呜……好……舒服～❤」`);
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……嗯呀……主人的肉棒……在身体里面……❤」`);
        await era.printAndWait(
          `没经过几次调教的雏菊生涩的收缩着，紧紧箍住肉棒。`,
        );
        await era.printAndWait(`「嗯呀～主人，这么激烈的话……❤」`);
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(2)) {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「主人……呜呜……后面什么的……请……更多的……疼爱一些……❤」`,
            );
            await era.printAndWait(
              `「小穴会一直为主人……留着的……所以……请更加的……后面……嗯哈……」`,
            );
          }
          await era.printAndWait(
            `「呼啊啊啊……屁股……好舒服……被主人的……嗯……那个……这样子粗暴的……哈啊啊❤」`,
          );
          await era.printAndWait(
            `被${master_name}紧握着腰部，粗暴的使用着的${target_name}，在快感的刺激下吐着小舌头，发出了甜美的声音。`,
          );
          await era.printAndWait(`「脑袋已经……呼啊啊……一片空白了呢……❤」`);
        } else {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「主人……嗯……屁股……很舒服呢……小穴的第一次也……想让主人拿走……」`,
            );
          }
          await era.printAndWait(
            `「这样子用屁股做……呼啊啊……也，也不坏……的说……」`,
          );
          await era.printAndWait(
            `${target_name}的小脸紧贴着${master_name}的胸口，在快感的刺激下不住的娇喘着。`,
          );
          await era.printAndWait(
            `「嗯呀……呼啊啊……感觉……整个人都……要融化了呢❤」`,
          );
        }
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「虽然这样被主人疼爱也……很开心……但是第一次……还是很在意……」`,
          );
        }
        await era.printAndWait(`「呜呜……主人……嗯……哈啊……❤」`);
        await era.printAndWait(
          `${master_name}肆意蹂躏着怀中的小人，一次次的将肉棒粗暴的插了进去。`,
        );
        await era.printAndWait(`「啊呜呜，屁股要……呼啊啊……要坏掉了啦～」`);
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人的那个……呜……全都……进来了呢……」`);
        await era.printAndWait(
          `努力忍耐着屁股传来的异物感，${target_name}在${master_name}怀里轻轻颤抖着。`,
        );
        await era.printAndWait(`「为了主人的话……这点事情……不算什么呢……」`);
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(`「但是……主人……第一次……那个……」`);
        }
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呜呜……屁股什么的……呀……明明……不行的说……」`);
        await era.printAndWait(
          `在${master_name}粗暴的使用下，却感受到不断传来的快感的${target_name}紧握着小手，努力的忍耐着快感，从嘴角漏出了可爱的娇喘声。`,
        );
        await era.printAndWait(`「啊呜……哈啊……嗯……呀……这种……事情……哈呀……❤」`);
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 3;
      } else if (
        chara(target).kojo.对面座位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「呜呜，不，不要～屁股……好难受呜……」`);
        await era.printAndWait(
          `${target_name}轻轻的抽泣着，幼小的身体拼命的排斥着入侵的异物。`,
        );
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        chara(target).kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 29) {
    if (chara(target).kojo.骑乘位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「嗯……能感觉的到主人的肉棒呢……诶嘿嘿❤」`);
          await era.printAndWait(
            `${target_name}发出了快乐的呻吟声，肉壁不断的紧缩着。`,
          );
        } else {
          await era.printAndWait(`「主人的肉棒……呼啊……插的好深呢……❤」`);
          await era.printAndWait(
            `${master_name}从后面抱着${target_name}，将肉棒插进了雏菊中。`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「呼啊啊……主人的那个……全都……呀……进来了……」`);
          await era.printAndWait(
            `${target_name}靠着${master_name}，将身体完全的交给了对方。`,
          );
          await era.printAndWait(`「请主人……哈啊……随便使用的说……❤」`);
        } else {
          await era.printAndWait(`「哈呜呜……主人的那个……嗯……可以……动的哟……」`);
          await era.printAndWait(
            `${target_name}被${master_name}从后面抱着，粗大的肉棒完全没入了紧致的雏菊中。`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「啊……呜呜……不，不要……这样子……好害羞呜呜……」`,
          );
          await era.printAndWait(
            `虽然嘴上说着不愿意，但雏菊却积极的迎合着插入的异物，紧紧的吸住不放。`,
          );
        } else {
          await era.printAndWait(`「呜呜……不要……讨厌……」`);
          await era.printAndWait(
            `被${master_name}抱在怀里侵犯着的${target_name}微弱的挣扎着。`,
          );
        }
      }
      // CFLAG:337  = 1（变量语义：CFLAG 族，337）
      chara(target).kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(2)) {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呼啊啊～小穴的第一次什么的……虽然也很想让主人拿走第一次……呜，那种事怎么样都好了～❤」`,
            );
          }
          await era.printAndWait(
            `「主人，请更加……呜呜～更加的用力侵犯${sc()}吧❤」`,
          );
          await era.printAndWait(
            `${master_name}粗暴的使用着怀里的幼女，仿佛只是一个道具一样。`,
          );
          await era.printAndWait(`「呼啊啊，主人，主人嗯嗯嗯～～❤」`);
        } else {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「哈啊……虽然前面还一次都没做过……但是使用后面也超舒服呢❤」`,
            );
          }
          await era.printAndWait(
            `被抱在怀里一次次起伏着的${target_name}，稚气的声音发出了甜美的娇喘声。`,
          );
          await era.printAndWait(`「啊啊……主人……不要……停下来……❤」`);
          await era.printAndWait(
            `柔软的雏菊贪图着快感，紧紧的包裹着，吮吸着肉棒。`,
          );
        }
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「这样虽然也不错……但是要是连前面也做了就好了呢❤」`,
          );
        }
        await era.printAndWait(
          `${target_name}积极的迎合着${master_name}的动作。`,
        );
        await era.printAndWait(`「但是……呜呜……哈啊啊……好……舒服～❤」`);
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……主人的肉棒……最喜欢了……❤」`);
        await era.printAndWait(
          `生涩的雏菊虽然有些排斥异物，但身体的意识却迎合着${master_name}。`,
        );
        await era.printAndWait(`「嗯呀～主人，这么激烈的话……❤」`);
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(2)) {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(`「被主人使用后面……呼啊啊……好开心❤」`);
            await era.printAndWait(`「不管身体的哪里……都是主人的呐……❤」`);
          }
          await era.printAndWait(`「嗯……脑子已经……没办法想别的事情了……」`);
          await era.printAndWait(
            `被粗暴使用着的${target_name}，不停的娇喘着，稚气的声音里充满着爱意。`,
          );
          await era.printAndWait(
            `${master_name}一边抽送着，一边轻咬着怀中小人的耳朵。`,
          );
          await era.printAndWait(`「${sc()}的……全部……都是……主人呢……❤」`);
        } else {
          if (era.get(`talent:${target}:0`) == 1) {
            await era.printAndWait(
              `「呜呜……${sc()}的第一次……也想交给主人呢……」`,
            );
          }
          await era.printAndWait(`「呜呜……但是……用后面……也……好舒服的说……」`);
          await era.printAndWait(`${target_name}轻咬着手指，呼出甜美的热气。`);
          await era.printAndWait(`「呜呜……要，要坏掉了……啦……❤」`);
        }
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「虽然和主人做很开心……但是……要是连第一次也拿走就好了……」`,
          );
        }
        await era.printAndWait(`「但是……哈啊……主人的全部……都喜欢……❤」`);
        await era.printAndWait(
          `感受着蹂躏自己的肉棒，${target_name}露出了恍惚的表情。`,
        );
        await era.printAndWait(`「呜呜，屁股那里……呜……好……舒服……」`);
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人……${sc()}……没问题的……」`);
        await era.printAndWait(
          `努力忍耐着屁股传来的异物感，${target_name}在${master_name}怀里轻轻颤抖着。`,
        );
        await era.printAndWait(`「为了主人的话……这点事情……不算什么呢……」`);
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(`「但是……主人……果然还是喜欢后面一些咩……？」`);
        }
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……舒服什么的……才……没有……」`);
        await era.printAndWait(
          `在${master_name}粗暴的使用下，却感受到不断传来的快感的${target_name}捂着小嘴，努力的不发出可爱的声音。`,
        );
        await era.printAndWait(
          `「啊呜……哈啊……嗯……才……没有……呼啊啊……绝对……没有……的说……❤」`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 3;
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「呜呜，不，不要～屁股……好难受呜……」`);
        await era.printAndWait(
          `${target_name}擦拭着眼角，幼小的身体拼命的排斥着入侵的异物。`,
        );
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 30) {
    if (chara(target).kojo.手淫 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「诶嘿嘿，肉棒桑很精神呢❤」`);
        await era.printAndWait(
          `仿佛拿到了新玩具的小孩子一样，${target_name}爱不释手的揉捏着坚挺的肉棒。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「主人的肉棒……仔细看的话……好大……的说……」`);
        await era.printAndWait(
          `${target_name}红着小脸，用小手揉捏着坚挺的肉棒。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「那……那个……虽然不是很擅长……但是如果主人会舒服的话，${sc()}会努力的……」`,
        );
        await era.printAndWait(
          `完全将自己当做${master_name}的仆人的${target_name}，努力的用小手侍奉着肉棒。`,
        );
      } else {
        await era.printAndWait(`「呜呜……一定要……这样做不可吗……」`);
      }
      // CFLAG:331  = 1（变量语义：CFLAG 族，331）
      chara(target).kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「诶嘿嘿，主人的肉棒，激动的一跳一跳的呢，被${sc()}的手捏，就这么开心咩？」`,
          );
          await era.printAndWait(
            `${target_name}轻轻揉捏着肉棒，用可爱的小手服侍着${master_name}。`,
          );
          await era.printAndWait(`「${sc()}的手……就这么的舒服吗❤」`);
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(`「就这样子……把牛奶射出来也没问题哟❤」`);
          }
        } else {
          await era.printAndWait(`「呼啊啊……肉棒的味道……好好闻……❤」`);
          await era.printAndWait(
            `${target_name}带着有些恍惚的表情，一边用手服侍着肉棒，一边用柔软的小脸轻轻的蹭着前端。`,
          );
          await era.printAndWait(`「主人的味道……嗯～最喜欢了❤」`);
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(`「还有牛奶也最喜欢了呢❤」`);
          }
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人的……肉棒……呼啊啊……❤」`);
        await era.printAndWait(
          `${target_name}一脸痴态的抚弄着眼前粗大的肉棒。`,
        );
        if (era.get(`abl:${target}:32`) >= 3) {
          await era.printAndWait(`「主人的牛奶……好想要……❤」`);
        }
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(100) >= 50) {
          await era.printAndWait(`「主人的肉棒……${sc()}……会好好的服侍的……」`);
          await era.printAndWait(
            `${target_name}小心的握着${master_name}的肉棒，来回抚弄着。`,
          );
          await era.printAndWait(`「主人……这个力度……可以吗……？」`);
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(
              `「如果要射出来的话……不管是脸上还是嘴里都没问题的哟……」`,
            );
          }
          await era.printAndWait(
            `${target_name}仰着头看着${master_name}，红着脸说着。`,
          );
        } else {
          await era.printAndWait(`「主人……肉棒被手弄……会很舒服吗……？」`);
          await era.printAndWait(
            `${target_name}微笑着用小手抚弄着肉棒，纤细的手指沾满了黏糊糊的前液。`,
          );
          await era.printAndWait(
            `「诶嘿嘿……如果主人喜欢的话，${sc()}不过多少次都会为主人做的。」`,
          );
          if (era.get(`abl:${target}:32`) >= 3) {
            await era.printAndWait(`「虽……虽然牛奶也……很喜欢就是了……」`);
            await era.printAndWait(`${target_name}很小声的自言自语着。`);
          }
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人的肉棒……好精神呢……❤」`);
        await era.printAndWait(`「为了回应主人的期待，${sc()}会努力的～」`);
        await era.printAndWait(
          `${target_name}的小手握着肉棒，不停的上下套弄着。`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人的兴趣……真是奇怪呢……」`);
        await era.printAndWait(
          `虽然对H的事情还不是特别理解，但是${target_name}还是乖乖的照做了。`,
        );
        await era.printAndWait(`「这样子……会舒服吗……？」`);
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 3;
      } else if (chara(target).kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……手上都变得黏糊糊的啦……」`);
        await era.printAndWait(
          `不理会泪眼汪汪的${target_name}，${master_name}享受着有些笨拙的侍奉。`,
        );
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        chara(target).kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 31) {
    if (chara(target).kojo.口交_奴 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「用嘴巴吗……诶嘿嘿，明白了呢❤」`);
        await era.printAndWait(
          `${target_name}开心的含住了${master_name}的肉棒，毫不迟疑的开始吮吸起来。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「用嘴巴……给主人的肉棒……那个么……呜呜……总觉得……有点害羞呢……」`,
        );
        await era.printAndWait(
          `${target_name}有些害羞的说着，软软的小嘴含住了肉棒的前端，轻轻的亲了一下。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「呼诶……用嘴巴吗……？呜嗯……知道了的说……」`);
        await era.printAndWait(
          `${target_name}顺从的含住了肉棒，开始用柔软的小嘴侍奉起来。`,
        );
      } else {
        await era.printAndWait(`「呜呜……我……我做……就是了啦……呜……」`);
        await era.printAndWait(
          `虽然最初很不愿意，但是被${master_name}狠狠的瞪了一眼之后，${target_name}抽泣着含住了肉棒。`,
        );
      }
      // CFLAG:332  = 1（变量语义：CFLAG 族，332）
      chara(target).kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(
            `「嗯呜……呼……嗯哈……主人的肉棒……呼啊……好美味……❤」`,
          );
          await era.printAndWait(
            `${target_name}含着粗大的肉棒，不断的前后套弄着，布丁一样柔软的小舌头在肉棒上磨蹭着。`,
          );
          await era.printAndWait(
            `「呐呐，主人……快点……快点把牛奶给${sc()}嘛……❤」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「嗯……嗯呼……呜……嗯……❤」`);
          await era.printAndWait(
            `${target_name}努力的吞吐着${master_name}粗大的肉棒，小小的眼睛里满是着迷的表情。`,
          );
          await era.printAndWait(
            `与其说是在服侍，不如说是在贪食喜欢的食物的小孩子一样。`,
          );
        } else {
          await era.printAndWait(
            `${target_name}的小手握着粗大的肉棒，像舔棒棒糖一样仔细的上下舔弄着。`,
          );
          await era.printAndWait(`「嗯啾……呼……呼哈……❤」`);
          await era.printAndWait(`「诶嘿嘿，主人的声音听起来好像很舒服呢❤」`);
        }
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「嗯……主人的……怎么样……感觉舒服吗……？」`);
          await era.printAndWait(
            `${target_name}用嘴巴小心的侍奉着${master_name}的肉棒，努力的不让牙齿碰到。`,
          );
          await era.printAndWait(`「嗯呼……主人舒服的话……是${sc()}的荣幸呢❤」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「呼哈……主人的……肉棒……」`);
          await era.printAndWait(
            `${target_name}拼命的张着可爱的小嘴，将稍微有些大的肉棒含在嘴里努力的吮吸着。`,
          );
          await era.printAndWait(`「嗯啾……呼……只要是主人想要的……嗯……❤」`);
        } else {
          await era.printAndWait(`「嗯啾……呜……呼……❤」`);
          await era.printAndWait(
            `${target_name}含着肉棒的前端，柔软的舌尖轻轻的刺激着龟头敏感的部分。`,
          );
          await era.printAndWait(
            `明明是应该含着棒棒糖的年龄，小嘴却熟练的侍奉着肉棒。`,
          );
          await era.printAndWait(
            `虽然身为魔王并没有罪恶感这种东西，不过眼前的场景还是让${master_name}感到兴奋起来。`,
          );
        }
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼啾……主人……${sc()}的嘴巴……请尽情的……使用……」`,
        );
        await era.printAndWait(
          `${target_name}乖巧的张开小嘴，积极的用侍奉着${master_name}的肉棒。`,
        );
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 3;
      } else if (chara(target).kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯咕……呜……不……呼呜……」`);
        await era.printAndWait(
          `被压着头顶的${target_name}，被半强制的用小嘴服侍的肉棒。`,
        );
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        chara(target).kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 32) {
    if (chara(target).kojo.乳交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「诶嘿嘿……${sc()}这个小小的胸部也没关系吗～❤」`,
        );
        await era.printAndWait(
          `${target_name}脸上浮现着和年龄不符的魅惑的笑容，用平坦而柔软的胸部侍奉起肉棒来。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呼诶……${sc()}这样子的胸部……也没问题吗……」`);
        await era.printAndWait(`「只要主人开心的话……」`);
        await era.printAndWait(
          `${target_name}红着脸，微笑的看着${master_name}，用平坦而柔软的胸部侍奉起肉棒来。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「哈呜呜……用胸部……给主人的肉棒……」`);
        await era.printAndWait(
          `${target_name}听话的用平坦而柔软的胸部侍奉起肉棒来。`,
        );
      } else {
        await era.printAndWait(`「这种事情……呜……感觉好奇怪……」`);
      }
      // CFLAG:333  = 1（变量语义：CFLAG 族，333）
      chara(target).kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (chara(target).kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「用胸部侍奉主人的肉棒……也很有感觉呢❤」`);
        await era.printAndWait(
          `「又热又硬的肉棒……在胸口这样子磨蹭……诶嘿嘿～❤」`,
        );
        await era.printAndWait(
          `${target_name}带着和外表不服的H的表情，积极的用平坦的胸部侍奉着肉棒。`,
        );
        // CFLAG:333  = 7（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「诶嘿嘿，主人，舒服吗～❤」`);
        await era.printAndWait(`「之后一定要用肉棒侵犯${sc()}哟～❤」`);
        await era.printAndWait(
          `${target_name}带着和外表不服的H的表情，积极的用平坦的胸部侍奉着肉棒。`,
        );
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「能这样子服侍主人……${sc()}……很荣幸的说～」`);
          await era.printAndWait(`「${sc()}……一定会好好的让主人舒服的～」`);
          await era.printAndWait(
            `${target_name}微微的红着脸，积极的用平坦的胸部侍奉着肉棒。`,
          );
        } else {
          await era.printAndWait(`「呼啊啊……主人的肉棒……好大……好热的说……」`);
          await era.printAndWait(`「诶嘿嘿，${sc()}会努力的～」`);
          await era.printAndWait(
            `${target_name}微微的红着脸，积极的用平坦的胸部侍奉着肉棒。`,
          );
        }
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人……这个样子……可以吗……？」`);
        await era.printAndWait(
          `${target_name}努力的压抑着羞耻心，顺从的用平坦的胸部侍奉着肉棒。`,
        );
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 3;
      } else if (chara(target).kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呜呜……只要这样子做的话……就不会再做过分的事情了吗？」`,
        );
        await era.printAndWait(
          `在${master_name}威逼利诱和哄骗下，${target_name}含着泪花用平坦的胸部笨拙的侍奉着肉棒。`,
        );
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        chara(target).kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 33) {
    if (chara(target).kojo.股间性交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈呀～竟然这样子……主人坏❤」`);
        await era.printAndWait(
          `${target_name}用诱惑的眼神看着${master_name}，慢慢的用大腿之间摩擦着肉棒。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「哈呜呜……主人的那个……好热的说……」`);
        await era.printAndWait(
          `${target_name}红着脸看着${master_name}的肉棒在大腿之间摩擦着。`,
        );
      } else {
        await era.printAndWait(`「呜呜……做，做什么啦……不要做奇怪的事情呜……」`);
        await era.printAndWait(`${target_name}含着眼泪，轻轻的抽泣着。`);
      }
      // CFLAG:334  = 1（变量语义：CFLAG 族，334）
      chara(target).kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……主人……嗯……好舒服……❤」`);
        await era.printAndWait(
          `${target_name}轻轻的喘息着，积极的活动着腰部迎合着肉棒。`,
        );
        await era.printAndWait(
          `「呜呜……主人……求求你……就这样子插进去嘛……把${sc()}的处女……就这样咻的……拿走……❤」`,
        );
        await era.printAndWait(
          `装作没听到的${master_name}就这样握着纤细的腰部继续摩擦着。`,
        );
        await era.printAndWait(`「呜～主人坏～」`);
        // CFLAG:334  = 7（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……主人……嗯……好舒服……❤」`);
        await era.printAndWait(
          `${target_name}轻轻的喘息着，积极的活动着腰部迎合着肉棒。`,
        );
        await era.printAndWait(`「呼啊啊……肉棒这样子摩擦着那里……嗯呀……❤」`);
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (chara(target).kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈呜呜……主人的那个……好热……在下面……咕啾咕啾的……」`,
        );
        await era.printAndWait(
          `${target_name}轻轻的喘息着，有些害羞的迎合着${master_name}的动作。`,
        );
        await era.printAndWait(
          `「主人……那个……那，那个……可以的话……那个……插……进去……那个……」`,
        );
        await era.printAndWait(
          `${master_name}坏笑的看着害羞的快要哭出来的${target_name}，继续在大腿间摩擦着。`,
        );
        await era.printAndWait(
          `「呜呜……就……就这样……请……把${sc()}的……第一次……」`,
        );
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈呜呜……主人的那个……好热……在下面……咕啾咕啾的……」`,
        );
        await era.printAndWait(
          `${target_name}轻轻的喘息着，有些害羞的迎合着${master_name}的动作。`,
        );
        await era.printAndWait(
          `「呼啊……主人……喜欢你……最喜欢你了……只要是主人的话……不管做什么事情都可以……❤」`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呜……主人……做这种事的话……会舒服吗……？」`);
        await era.printAndWait(
          `${target_name}还有些不习惯的，红着脸笨拙的迎合着${master_name}。`,
        );
        await era.printAndWait(`「呼诶……${sc()}也……很舒服……的说……」`);
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 3;
      } else if (chara(target).kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……做，做什么啦……不要做奇怪的事情呜……」`);
        await era.printAndWait(`${target_name}含着眼泪，轻轻的抽泣着。`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        chara(target).kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 34) {
    if (chara(target).kojo.骑乘位 == 0) {
      if (era.get(`talent:${target}:0`) == 1) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「唔啊啊……能感觉的到……主人的肉棒……啊哈……好大……好热呢❤」`,
          );
          await era.printAndWait(
            `${target_name}忍着初次的痛苦，扶着肉棒慢慢的坐了下去，体会到被肉棒侵入体内的快感的${target_name}露出了开心的表情。`,
          );
          await era.printAndWait(
            `「哈啊……主人的肉棒……好厉害……把肚子里面塞得满满的……好舒服……❤」`,
          );
          await era.printAndWait(
            `初次感受到异物进入的稚嫩的幼穴紧紧的夹住肉棒不放，仅仅是插进去不动就能感受到强烈的快感。`,
          );
          await era.printAndWait(`「嗯……主人……来做更多……舒服的事情吧……❤」`);
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「呜呜……进来了……呜……主人……的……」`);
          await era.printAndWait(
            `${target_name}努力的忍耐着初次的疼痛，慢慢的坐了下去，豆大的泪珠从疼的颤抖的小脸颊上滑落下来。`,
          );
          await era.printAndWait(`「呜……好痛的说……感觉要裂开了……」`);
          await era.printAndWait(
            `「但是……这样子……终于……${sc()}的身心就都是主人的东西了呢……❤」`,
          );
          await era.printAndWait(
            `${master_name}轻轻的抱着还在颤抖着的幼女，一次次抚摸着头部。`,
          );
          await era.printAndWait(
            `「嗯呜……主人……再一下下……这样子抱着……一下下……就好……」`,
          );
          await era.printAndWait(
            `就这样抱着怀中的小人，擦掉了眼角的泪水之后，${master_name}开始轻轻的动起腰来……`,
          );
        } else {
          await era.printAndWait(`「哈呜呜……好痛……好痛……！」`);
          await era.printAndWait(`「对不起，请原谅我，请原谅我～～！」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「哈啊啊……主人的肉棒……顶到最里面了呢……诶嘿嘿……❤」`,
          );
          await era.printAndWait(
            `${target_name}扶着肉棒，开始积极的活动起腰部来。`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(`「呼啊……主人的那个……全部都……进来了呢……」`);
          await era.printAndWait(
            `${target_name}红着脸，支撑着身体，随着${master_name}的动作小小的身体一上一下的欺负着。`,
          );
        } else {
          await era.printAndWait(`「呜呜，这样子，好害羞……不，不要……」`);
          await era.printAndWait(`${target_name}轻轻的抽泣着。`);
        }
      }
      // CFLAG:335  = 1（变量语义：CFLAG 族，335）
      chara(target).kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`))
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「呼啊啊……主人的肉棒……喜欢……最喜欢了……❤」`);
          await era.printAndWait(
            `${target_name}的小手撑在${master_name}的肚子上，扭动着纤细的腰肢，一下下的用稚嫩的下半身套弄着肉棒。`,
          );
          await era.printAndWait(
            `「主人的肉棒……在肚子里面……咕啾咕啾的……好舒服❤」`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「呐呐，主人，你看你看，肉棒在肚子里面……这样子的动着呢❤」`,
          );
          await era.printAndWait(
            `${target_name}稍稍后仰着，小手撑着${master_name}的大腿，被肉棒撑开的稚嫩小穴完全暴露在${master_name}的视线中。`,
          );
          await era.printAndWait(`「啊啊……里面……顶到了……嗯哈～❤」`);
        } else {
          await era.printAndWait(`「嗯啾……主人的肉棒……还想要……更多呢……❤」`);
          await era.printAndWait(
            `${target_name}伏在${master_name}身上，二人的嘴唇无数次重合着。`,
          );
          await era.printAndWait(
            `${master_name}一边享受着柔软的小嘴，一边挺动着腰部，在稚嫩的小穴里抽送着。`,
          );
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:2`) >= 3
      ) {
        await era.printAndWait(
          `「哈啊……好舒服……小穴被主人的肉棒侵犯……好舒服～❤」`,
        );
        await era.printAndWait(`「小穴里面被侵犯什么的……感觉好棒……❤」`);
        await era.printAndWait(
          `${target_name}在${master_name}身上起伏着，幼小的身体一次次的贪图着快感，用力的起伏着。`,
        );
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊哈……嗯……嗯呀……H……好舒服呢……❤」`);
        await era.printAndWait(
          `${target_name}积极的迎合着${master_name}的动作，稚气的脸庞上满满都是和年龄不符的欲望。`,
        );
        await era.printAndWait(
          `「呼啊啊……主人……请对${sc()}做更多……舒服的事情……❤」`,
        );
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 5;
      } else if (
        era.get(`talent:${target}:85`) &&
        (era.get(`talent:${target}:75`) || era.get(`talent:${target}:232`))
      ) {
        if (rand_n(3) == 0) {
          await era.printAndWait(`「嗯……主人……呀……里面……顶到了……❤」`);
          await era.printAndWait(
            `${target_name}的小手撑在${master_name}的肚子上，支撑着幼小的身体，感受着一肉棒一下下的朝上顶着稚嫩的小穴。`,
          );
          await era.printAndWait(`「哈呀……主人……喜欢……最喜欢了……❤」`);
        } else if (rand_n(2) == 0) {
          await era.printAndWait(
            `「呜呜……主人的那个……在肚子里面……塞的满满的」`,
          );
          await era.printAndWait(
            `${target_name}稍稍后仰着，小手撑着${master_name}的大腿，被肉棒撑开的稚嫩小穴完全暴露在${master_name}的视线中。`,
          );
          await era.printAndWait(
            `「只要主人想要……不管多少次都可以……请尽情的使用吧……」`,
          );
        } else {
          await era.printAndWait(`「嗯啾……主人……那个……kiss……嗯……❤」`);
          await era.printAndWait(
            `${target_name}伏在${master_name}身上，二人的嘴唇无数次重合着。`,
          );
          await era.printAndWait(
            `${master_name}一边享受着柔软的小嘴，一边挺动着腰部，在稚嫩的小穴里抽送着。`,
          );
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:2`) >= 3
      ) {
        await era.printAndWait(`「嗯……呀……虽然这样子……有点害羞……」`);
        await era.printAndWait(`「但是……和主人做……舒服的事情……好开心……❤」`);
        await era.printAndWait(
          `${target_name}在${master_name}身上起伏着，幼小的身体一次次的贪图着快感，用力的起伏着。`,
        );
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……主人……最喜欢……你了……」`);
        await era.printAndWait(
          `${target_name}积极的迎合着${master_name}的动作，稚气的小脸满眼桃心的看着你。`,
        );
        await era.printAndWait(`「虽然还……有些不适应……但是……没问题的……」`);
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 5;
      } else if (
        era.get(`mark:${target}:2`) >= 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「哈呜呜……明明……这种事情……呀……❤」`);
          await era.printAndWait(
            `${target_name}努力的撑着自己的身体，稚嫩的小穴不顾主人的意志，紧紧的吮吸着肉棒。`,
          );
          await era.printAndWait(`「呜呜……」`);
        } else {
          await era.printAndWait(`「啊……哈啊……嗯……呜……」`);
          await era.printAndWait(
            `${target_name}顺从的用小穴套弄着肉棒，时不时因为快感发出可爱的娇喘声。`,
          );
          await era.printAndWait(`「嗯……肚子里面……要……变得奇怪了……哈啊……」`);
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 4;
      } else if (
        era.get(`mark:${target}:2`) >= 3 &&
        (chara(target).kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……哈啊……主人……这样子……舒服……吗……？」`);
        await era.printAndWait(
          `${target_name}感受着还未习惯的异样的快感，努力的撑着自己的身体，稚嫩的肉壁一次次的被肉棒强硬的分开。`,
        );
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 3;
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜，不要，不要动了啦，好难受……！」`);
        await era.printAndWait(
          `几乎伏在了${master_name}身上的${target_name}不停地抽泣着。`,
        );
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        chara(target).kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 35) {
    if (chara(target).kojo.全身擦洗 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「给主人擦洗吗……？嗯呜，明白了呢。」`);
        await era.printAndWait(
          `虽然从来没有做过这种事情，但是${target_name}毫不犹豫的有些笨拙的顺从的照做了。`,
        );
        await era.printAndWait(
          `「诶嘿嘿……主人的身体……好壮实呢（女性的话好漂亮）……」`,
        );
      } else {
        await era.printAndWait(`「呜呜……虽然比做奇怪的事情要好……但是……」`);
        await era.printAndWait(
          `${target_name}有些疑惑的，红着脸笨拙的擦洗着。`,
        );
      }
      // CFLAG:336  = 1（变量语义：CFLAG 族，336）
      chara(target).kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊哈……主人的身体……好棒……❤」`);
        await era.printAndWait(
          `${target_name}在${master_name}背后蹭着，在二人的身体之间摩擦出许多的小泡泡，小手绕到前面轻轻揉捏着粗大的肉棒。`,
        );
        await era.printAndWait(`「诶嘿嘿……之后也继续做舒服的事情吧～❤」`);
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯……这就是……最喜欢的……主人的……身体呢……」`);
        await era.printAndWait(`「啊啊……这样子看……果然是主人呢……❤」`);
        await era.printAndWait(
          `${target_name}的小手轻轻的在${master_name}的身上搓揉着肥皂泡，小脸不知是因为热水还是别的什么原因，看起来红红的。`,
        );
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「这，这个样子……可以吗……主人……？」`);
        await era.printAndWait(
          `${target_name}顺从的擦洗着${master_name}的身体，时不时轻声询问着${master_name}的感觉。`,
        );
        await era.printAndWait(`「主人舒服的话……就好了呢……」`);
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 3;
      } else if (chara(target).kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……做这种事情……好奇怪的感觉……」`);
        await era.printAndWait(
          `${target_name}怯生生的擦洗着${master_name}的身体。`,
        );
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        chara(target).kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 36) {
    if (chara(target).kojo.骑乘位肛交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「哈啊……能感觉到屁股里面……被主人的肉棒塞的满满的……好舒服……❤」`,
          );
          await era.printAndWait(
            `跨坐在${master_name}身上的${target_name}扭动着腰部，贪图着异样的快感。`,
          );
        } else {
          await era.printAndWait(`「呼啊啊……全部都……进去了呢……❤」`);
          await era.printAndWait(
            `${target_name}露出了带着轻微不适感的色色的表情，开始扭动起腰部来。`,
          );
        }
      } else if (era.get(`talent:${target}:85`) == 1) {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(
            `「呜呜……能感觉到……主人的全部……都在……里面……好开心……❤」`,
          );
          await era.printAndWait(
            `${target_name}迷离的看着${master_name}，水汪汪的大眼睛里满是幸福的表情。`,
          );
        } else {
          await era.printAndWait(
            `「呜……哈啊……主人……那个……${sc()}……完全……没问题……的说……」`,
          );
          await era.printAndWait(
            `骑在${master_name}身上的${target_name}强忍着不快感，开始慢慢的动起腰，侍奉起${master_name}来。`,
          );
        }
      } else {
        if (era.get(`abl:${target}:3`) >= 3) {
          await era.printAndWait(`「啊呜呜……肚子里面……被……呼呀……」`);
          await era.printAndWait(
            `${target_name}捂着小嘴，不让可爱的娇喘声漏出来。`,
          );
        } else {
          await era.printAndWait(
            `「哈咕……好难受……屁股……呜呜……要裂开来了啦……」`,
          );
          await era.printAndWait(
            `${target_name}轻轻的抽泣着，晶莹的泪珠不断的沿着脸颊滑落。`,
          );
        }
      }
      // CFLAG:337  = 1（变量语义：CFLAG 族，337）
      chara(target).kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(2)) {
          await era.printAndWait(
            `「呼啊啊～～好棒～～主人的肉棒……在屁股里面……咕啾咕啾的……嗯呀～～舒服的要死掉了啦～❤」`,
          );
          await era.printAndWait(
            `${target_name}激烈的扭动着纤细的腰部，一下一下的套弄着${master_name}的肉棒，贪图着快感。`,
          );
          await era.printAndWait(
            `「哈啊……已经……没办法再思考肉棒以外的事情了啦～❤」`,
          );
        } else {
          await era.printAndWait(
            `「嗯哈……❤屁股被这样子粗暴的侵犯……嗯呼～～好舒服～～❤」`,
          );
          await era.printAndWait(
            `${target_name}小嘴微微张开着，随着欺负呼出甜甜的热气。`,
          );
          await era.printAndWait(`「主人……呼啊啊……请……更加的……用力一点……❤」`);
        }
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        await era.printAndWait(`「嗯……呀……哈啊……主人的肉棒……嗯……好喜欢……❤」`);
        await era.printAndWait(
          `${target_name}微微的吐着小舌头，在快感的刺激下一下一下的起伏着。`,
        );
        await era.printAndWait(`「呼啊啊……肉棒……插得好深呢……❤」`);
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人的肉棒……嗯哈……全部都进来了呢……❤」`);
        await era.printAndWait(
          `${target_name}露出了带着轻微不适感的色色的表情，开始扭动起腰部来。`,
        );
        await era.printAndWait(
          `「虽然现在还有点难受……但是一定会更加舒服的吧❤」`,
        );
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`talent:${target}:77`) == 1 &&
        (era.get(`talent:${target}:77`) || era.get(`talent:${target}:233`))
      ) {
        if (rand_n(2)) {
          await era.printAndWait(
            `「呼啊啊～～主人……主人嗯嗯～～已经除了主人以外，没办法再思考其他的事情了啦～～❤」`,
          );
          await era.printAndWait(
            `${target_name}拼命的起伏着，用自己的身体侍奉着${master_name}。`,
          );
          await era.printAndWait(`但是小脸上怎么看都像是在贪图着快感的样子。`);
          await era.printAndWait(`「主人和……H的事情……都最喜欢了……❤」`);
        } else {
          await era.printAndWait(
            `「主人……嗯……呼啊啊……${sc()}的全部……呜……都是主人的东西……❤」`,
          );
          await era.printAndWait(
            `顺着${master_name}起伏的节奏，${target_name}积极的迎合着，用幼小的身体取悦着${master_name}。`,
          );
          await era.printAndWait(`「${sc()}的身体……随便主人使用呐……❤」`);
        }
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) &&
        era.get(`abl:${target}:3`) >= 3
      ) {
        await era.printAndWait(
          `「呜呜……屁股里面……能感觉到主人的那个……满满的呐……❤」`,
        );
        await era.printAndWait(
          `${target_name}骑在${master_name}的身上，小小的身体不断的起伏着，用柔软的雏菊侍奉着肉棒。`,
        );
        await era.printAndWait(`「好舒服……的说……主人也……很舒服咩……？」`);
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「哈呜呜……主人的那个……嗯……全部都……进来了呢……」`,
        );
        await era.printAndWait(
          `骑在${master_name}身上的${target_name}强忍着不快感，开始慢慢的动起腰，侍奉起${master_name}来。`,
        );
        await era.printAndWait(
          `「虽然……有些难受……但是为了主人……${sc()}会加油的……！」`,
        );
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (chara(target).kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈呜呜……舒服什么的……那种事……呼呀……❤」`);
        await era.printAndWait(
          `${target_name}的小手扶着${master_name}的身体，时不时发出可爱的娇喘声。`,
        );
        await era.printAndWait(`「呀……不要……不要再……呜呜……不要再动了……」`);
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 3;
      } else if (
        chara(target).kojo.骑乘位肛交 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「讨厌……呜……哈啊……不，不要动……呀……」`);
        await era.printAndWait(
          `几乎伏在了${master_name}身上的${target_name}不停地抽泣着。`,
        );
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        chara(target).kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 37) {
    if (chara(target).kojo.肛门侍奉 == 0) {
      // CFLAG:338  = 1（变量语义：CFLAG 族，338）
      chara(target).kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) == 5 &&
        (chara(target).kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 3;
      } else if (chara(target).kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        chara(target).kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 38) {
    if (chara(target).kojo.足交 == 0) {
      await era.printAndWait(`「哎？！用脚？！用这个也可以舒服么？」`);
      await era.printAndWait(`「既然您这么说的话。。」`);
      await era.printAndWait(
        `${target_name}将小巧的脚丫放在${master_name}的肉棒上，慢慢的摩擦起来`,
      );
      await era.printAndWait(`因为是第一次，所以技术显得相当的生疏`);
      // CFLAG:TARGET:339  = 1（变量语义：CFLAG 族，TARGET:339）
      chara(target).kojo.足交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:20`) >= 3 &&
        (chara(target).kojo.足交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「哼哼~${heart(1)} 主人还真是喜欢${sc()}的小脚呢」`,
          );
          await era.printAndWait(`「如果是主人的话，让你舔一下也不是不行哦~」`);
          await era.printAndWait(
            `${target_name}将小巧的脚丫放到了${master_name}的脸上`,
          );
          await era.printAndWait(`淡淡的足香充斥了${master_name}的鼻腔`);
        } else {
          await era.printAndWait(
            `「哼哼~${heart(1)}主人很想要${sc()}的小脚是吧」`,
          );
          await era.printAndWait(`「给。舔吧~${heart(1)}」`);
          await era.printAndWait(
            `${target_name}的脸上带着迷人的微笑，将仿若美玉雕成般的玉足放到了${master_name}的面前`,
          );
        }
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `${master_name}伸出舌头细致的舔着${target_name}的幼足，又酸又甜的感觉从舌尖传来，随即传遍了${master_name}的全身。`,
          );
          await era.printAndWait(`${master_name}的肉棒更加兴奋了！`);
        } else {
          await era.printAndWait(
            `${master_name}突然伸出手一把抓住了${target_name}的小脚，将它固定在自己的眼前`,
          );
          await era.printAndWait(
            `「干。。干什么啊」${target_name}显得有些慌乱`,
          );
          await era.printAndWait(
            `${master_name}并没有应答，只是${target_name}的脚趾含入口中，细致的舔着，感受着玉趾不安的扭动。`,
          );
          await era.printAndWait(`${master_name}的肉棒更加兴奋了！`);
        }
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「主人，真的是有够变态呢！只是干还不够么~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用轻蔑的眼神看着${master_name}因为舔足而兴奋不已的肉棒`,
          );
          await era.printAndWait(`「这样子的主人，必须要给与惩罚才行呢」`);
          await era.printAndWait(
            `${target_name}将空闲的另一只小脚放到了${master_name}的肉棒上。用力的践踏着`,
          );
          await era.printAndWait(
            `「这样子对主人来说，应该更爽了不是么~${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「还想要更爽么~${heart(1)}主人~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将空闲的另一只小脚放到了${master_name}的肉棒上方，轻蔑的声音不断的刺激着${master_name}的神经。`,
          );
          await era.printAndWait(
            `「想要的话~${heart(1)}说出来嘛~${heart(1)}主人~${heart(1)}诚心恳求的话~${heart(1)}就让你更爽哦~${heart(1)}」`,
          );
          await era.printAndWait(
            `${master_name}并没有回应${target_name}的话语，只是伸出手抓住了${target_name}的小脚，将它放到了自己的肉棒上。不停的摩擦着`,
          );
          await era.printAndWait(`「主人，真是个变态呢~${heart(1)}」`);
        }
        // CFLAG:TARGET:339  = 5（变量语义：CFLAG 族，TARGET:339）
        chara(target).kojo.足交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:20`) >= 3 &&
        (chara(target).kojo.足交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「主人喜欢${sc()}的小脚么，嗯~主人的话，想怎么样都可以~${heart(1)}」`,
          );
          await era.printAndWait(`「哎？！要先舔么？！」`);
          await era.printAndWait(
            `${target_name}将小巧的玉足放到你的眼前，可爱的脚趾害羞的并拢着。`,
          );
          await era.printAndWait(`「主人的话~${heart(1)}没有关系哦」`);
          await era.printAndWait(
            `${master_name}伸出手握住${target_name}的小脚，慢慢的摩挲着`,
          );
          await era.printAndWait(`「不要~${heart(1)}好痒~${heart(1)}」`);
          await era.printAndWait(
            `${master_name}伸出舌头，舌头划过${target_name}的足弓，然后将可爱的玉趾含入口中。用舌头舐舔着。`,
          );
        } else {
          await era.printAndWait(`「呀！主人？！」`);
          await era.printAndWait(
            `在${master_name}伸手抓住${target_name}的小脚的时候，${target_name}似乎受到了一点惊吓，但是很快就平静了下来。`,
          );
          await era.printAndWait(
            `「主人真是的~明明只要跟${sc()}说，${sc()}就会给你的说~${heart(1)}」`,
          );
          await era.printAndWait(
            `${master_name}并没有进行回应。只是将${target_name}的小脚紧紧握住，慢慢的摩挲着。`,
          );
          await era.printAndWait(
            `「哎？！舔么。。嗯~${heart(1)}主人的话，可以哦~${heart(1)}」`,
          );
          await era.printAndWait(
            `${master_name}伸出舌头，舌头划过${target_name}的足背，双手微微分开${target_name}因为害羞并在一起的玉趾，然后在趾缝中细细的舐舔着`,
          );
        }
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「主人的话~${heart(1)}这里肯定也想要了呢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将另一只小脚放到了肉棒上方，小巧的玉趾轻点在龟头上。然后用轻柔的动作慢慢的划到肉棒根部，微微的挑逗着阴囊`,
          );
          await era.printAndWait(`「舒服么，主人~${heart(1)}」`);
          await era.printAndWait(
            `「主人能喜欢，那是最好了~${heart(1)}主人想要的话，再多都没有关系哦~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用小脚摩挲着${master_name}的肉棒，小巧的脚趾有意无意的划过${master_name}的龟头和马眼，刺激着${master_name}的敏感点，让肉棒显得越发狰狞。`,
          );
        } else {
          await era.printAndWait(
            `「哎？！肉棒也想要？！恩。可以哦~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}将另一只小脚放到了肉棒上，轻轻的摩挲着，仿佛是怕弄痛了${master_name}一般。`,
          );
          await era.printAndWait(`「哎？！再重点？！这样子不会痛么，主人~」`);
          await era.printAndWait(`「嗯！既然是主人说的。。豁啦~${heart(1)}」`);
          await era.printAndWait(
            `${target_name}慢慢的开始加重小脚上的力道，肉棒与足弓的接触也越发亲密，小脚摩挲着肉棒带来的快感也飞快的上升，让肉棒显得越发狰狞。`,
          );
        }
        if (rand_n(2) == 0) {
          await era.printAndWait(
            `「主人~${heart(1)}用脚给主人做着做着~${heart(1)}我这里也湿了呢~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}张开双腿，红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
          );
          await era.printAndWait(
            `「如果可以的话~${heart(1)}主人~${heart(1)}」`,
          );

          await era.printAndWait(
            `${master_name}放下手中的玉足，将头埋入${target_name}的双腿之间，一股淡淡的幼女小穴的味道迎面而来，让${master_name}不禁伸出舌头细细的舐舔着。`,
          );
          await era.printAndWait(
            `「啊嗯~${heart(1)}主人真是性急~${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一边被你舔着小穴，一边用小脚夹着你的肉棒上下摩挲着`,
          );
        } else {
          await era.printAndWait(
            `${master_name}将手中的玉足放到肉棒旁，双手微微分开${target_name}的大腿，映入眼帘的是${target_name}那美丽的幼女小穴。`,
          );
          await era.printAndWait(
            `「哎？！自己分开。。。这样子，好害羞啊，但是，既然是主人的话，嗯~${heart(1)}请慢用……的说……」`,
          );
          await era.printAndWait(
            `${target_name}红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。`,
          );
          await era.printAndWait(
            `${master_name}毫不犹豫的把头埋入${target_name}的双腿之间，伸出舌头品尝着可口的幼女小穴。`,
          );
          await era.printAndWait(`「啊嗯~${heart(1)}主人~${heart(1)}」`);
          await era.printAndWait(
            `${target_name}一边被你舔着小穴，一边用小脚夹着你的肉棒上下摩挲着`,
          );
        }
        // CFLAG:TARGET:339  = 4（变量语义：CFLAG 族，TARGET:339）
        chara(target).kojo.足交 = 4;
        return 0;
      } else if (
        era.get(`abl:${target}:20`) >= 1 &&
        (chara(target).kojo.足交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「用。。用脚做么，主人的癖好还真是奇怪呢~」`);
          await era.printAndWait(
            `${target_name}将小巧的脚丫放到了肉棒上。用足弓慢慢的摩挲着`,
          );
        } else {
          await era.printAndWait(`「主人。。用。。用脚会让主人开心么。。」`);
          await era.printAndWait(
            `带着一些迟疑与好奇${target_name}用小巧的脚丫夹住了肉棒，上下不停的摩挲着`,
          );
        }
        if (rand_n(3) == 0) {
          await era.printAndWait(`「啊？！主人的肉棒变得更大更热了！」`);
          await era.printAndWait(
            `${target_name}娇嫩的足底不住的摩挲着${master_name}的肉棒，美妙的触感使得肉棒越发狰狞。`,
          );
          await era.printAndWait(
            `强烈的快感随着${target_name}的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让${master_name}欲罢不能。`,
          );
        } else if (rand_n(2) == 0) {
          await era.printAndWait(`「主。主人。。刺激这里。会更舒服？？」`);
          await era.printAndWait(
            `${target_name}听从${master_name}的命令用玉趾刺激着马眼和冠状沟，小心翼翼的拨动反而使${master_name}的快感疯狂上升。`,
          );
          await era.printAndWait(
            `强烈的快感随着${target_name}的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让${master_name}欲罢不能。`,
          );
        } else {
          await era.printAndWait(
            `「既。。既然是主人的命令的话，${sc()}也只能尽力去做了呢！豁啦~」`,
          );
          await era.printAndWait(
            `${target_name}在${master_name}的指示下，开始逐渐加重小脚的力度。随着力度的不断增加${master_name}越发能感受到${target_name}足底的娇嫩与幼女足交带来的强烈快感。`,
          );
          await era.printAndWait(
            `强烈的快感随着${target_name}的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让${master_name}欲罢不能。`,
          );
        }
        // CFLAG:TARGET:339  = 3（变量语义：CFLAG 族，TARGET:339）
        chara(target).kojo.足交 = 3;
        return 0;
      } else if (chara(target).kojo.足交 <= 1 || game.kojo.口上开关 == 2) {
        if (rand_n(2) == 0) {
          await era.printAndWait(`「要用脚来做嘛？？」`);
          await era.printAndWait(`${target_name}的脸上带着些许害怕与迟疑`);
          await era.printAndWait(
            `${master_name}毫不理会的抓过${target_name}的小脚放在了肉棒上`,
          );
        } else {
          await era.printAndWait(`「还要用脚来做么。。呜。。」`);
          await era.printAndWait(
            `${target_name}带着一些迟疑与害怕，畏畏缩缩的把小脚放到了肉棒上`,
          );
        }
        if (rand_n(2) == 0) {
          await era.printAndWait(`${target_name}用小脚慢慢的摩挲着肉棒。`);
          await era.printAndWait(`并不熟练的感觉，反而能带来另一种快感。`);
        } else {
          await era.printAndWait(
            `${target_name}的幼女小脚慢慢的摩挲着${master_name}的狰狞肉棒`,
          );
          await era.printAndWait(
            `那种畏畏缩缩小心翼翼的感觉，带给${master_name}的快感完美的掩盖了${target_name}技术不熟练的瑕疵`,
          );
        }
        // CFLAG:TARGET:339  = 2（变量语义：CFLAG 族，TARGET:339）
        chara(target).kojo.足交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 40) {
    if (chara(target).kojo.打屁股 == 0) {
      await era.printAndWait(`「呜呜呜，好，好痛！」`);
      await era.printAndWait(
        `「${sc()}做错了什么吗，呜呜，对不起，对不起，不要打了啦！」`,
      );
      // CFLAG:341  = 1（变量语义：CFLAG 族，341）
      chara(target).kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呀……痛，痛，主人，好痛～❤」`);
        await era.printAndWait(
          `感受着屁股上的痛楚，${target_name}扭动着身体，那样子仿佛是在诱惑着${master_name}一样。`,
        );
        await era.printAndWait(
          `明明还是小孩子的身体，却已经被调教的能从这种惩罚中获得快感了。`,
        );
        await era.printAndWait(
          `「诶嘿嘿，${sc()}是坏孩子呢，所以请主人更严厉的惩罚${sc()}吧❤」`,
        );
        // CFLAG:341  = 5（变量语义：CFLAG 族，341）
        chara(target).kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「对不起……呜呜……${sc()}，哪里做的不好吗……」`);
        await era.printAndWait(
          `${target_name}轻轻的抽泣着，忍耐着从屁股上传来的痛楚。`,
        );
        await era.printAndWait(`自己一定是哪里侍奉的不好才会被惩罚的吧。`);
        await era.printAndWait(`「呜呜……下次一定会更好的服侍主人的呜……」`);
        await era.printAndWait(`「（但是……是主人的话……就是被惩罚……也……）」`);
        // CFLAG:341  = 4（变量语义：CFLAG 族，341）
        chara(target).kojo.打屁股 = 4;
        return 0;
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (chara(target).kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……咕……对，对不起……对不起……」`);
        await era.printAndWait(
          `因为虐待的疼痛而感到害怕的${target_name}，紧握着拳头，努力的忍耐着痛苦。`,
        );
        await era.printAndWait(
          `看样子已经彻底的认识到了自己身为他人奴隶的事实。`,
        );
        await era.printAndWait(`「对不起……呜……主人……请，请原谅我……」`);
        // CFLAG:341  = 3（变量语义：CFLAG 族，341）
        chara(target).kojo.打屁股 = 3;
        return 0;
      } else if (chara(target).kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呀……！对不起，对不起……！」`);
        await era.printAndWait(
          `不理会${target_name}的哀求，${master_name}用力的一下下的拍打着白嫩的小屁股。`,
        );
        await era.printAndWait(`「呜呜……好……好痛呜……」`);
        // CFLAG:341  = 2（变量语义：CFLAG 族，341）
        chara(target).kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 41) {
    if (chara(target).kojo.鞭 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呜呜……主人……这样子……呀……！」`);
        await era.printAndWait(
          `感受着身上传来的疼痛的${target_name}痛苦的呻吟着，但是声音之中似乎隐藏着一点快感的样子。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊……主人……对不起……哈呜……对……不起……呜……！」`);
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。`,
        );
      } else {
        await era.printAndWait(`「咿呀……哈咕……不要……不……不要呜啊啊」`);
        await era.printAndWait(
          `${target_name}因为疼痛蜷缩着身体，大声的哭个不停。`,
        );
      }
      // CFLAG:342  = 1（变量语义：CFLAG 族，342）
      chara(target).kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人……好……好痛……不要……呀……呜……哈呜……❤」`);
        await era.printAndWait(
          `感受着身上传来的疼痛的${target_name}痛苦的呻吟着，但是声音之中似乎隐藏着一点快感的样子。`,
        );
        await era.printAndWait(`「对……对不起……哈啊……啊……❤」`);
        // CFLAG:342  = 9（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「主人……好……好痛……不要……呀……呜……哈呜……」`);
        await era.printAndWait(
          `感受着身上传来的疼痛的${target_name}痛苦的呻吟着，缩着身体哀求着${master_name}。`,
        );
        // CFLAG:342  = 8（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:342  = 7（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……主人……对不起……哈呜……对……不起……呜……！」`);
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。`,
        );
        await era.printAndWait(`「这也是……主人的……哈呜……！」`);
        // CFLAG:342  = 6（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊……主人……对不起……哈呜……对……不起……呜……！」`);
        await era.printAndWait(
          `${target_name}紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。`,
        );
        // CFLAG:342  = 5（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:342  = 4（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `${master_name}毫不留情一次次对着幼小的身体挥下鞭子。`,
        );
        await era.printAndWait(`「啊呜呜……好痛……！不要打了……求求你……呀……！」`);
        await era.printAndWait(
          `${target_name}在疼痛下缩成一团，不停的抽泣着。`,
        );
        // CFLAG:342  = 3（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 3;
      } else if (chara(target).kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // CFLAG:342  = 2（变量语义：CFLAG 族，342）
        chara(target).kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 42) {
    if (chara(target).kojo.针 == 0) {
      // CFLAG:343  = 1（变量语义：CFLAG 族，343）
      chara(target).kojo.针 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:343  = 9（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:343  = 8（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:343  = 7（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:343  = 6（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:343  = 5（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:343  = 4（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:343  = 3（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 3;
      } else if (chara(target).kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        // CFLAG:343  = 2（变量语义：CFLAG 族，343）
        chara(target).kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    if (chara(target).kojo.眼罩 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜……虽然有点可怕……但是主人想的话……」`);
      } else {
        await era.printAndWait(`「不，不要啊……好可怕……」`);
      }
      // CFLAG:344  = 1（变量语义：CFLAG 族，344）
      chara(target).kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        );
        await era.printAndWait(
          `${target_name}有些兴奋的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        );
        // CFLAG:344  = 9（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        );
        await era.printAndWait(
          `${target_name}期待的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        );
        // CFLAG:344  = 8（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」`,
        );
        // CFLAG:344  = 7（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜呜……虽然有点可怕……不过只要是主人想做的事情……」`,
        );
        await era.printAndWait(
          `${target_name}有些兴奋的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        );
        // CFLAG:344  = 6（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……虽然有点可怕……但是主人想的话……」`);
        await era.printAndWait(
          `${target_name}期待的乖乖的坐着，任由${master_name}给她带上眼罩。`,
        );
        // CFLAG:344  = 5（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……虽然有点可怕……但是主人想的话……」`);
        // CFLAG:344  = 4（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……一定要……带这个咩……」`);
        await era.printAndWait(`${target_name}没有反抗，有些害怕的坐着。`);
        // CFLAG:344  = 3（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 3;
      } else if (chara(target).kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不，不要啊……好可怕……」`);
        // CFLAG:344  = 2（变量语义：CFLAG 族，344）
        chara(target).kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼诶……已经结束了咩……？」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼啊啊……主……人……」`);
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 2;
    } else if (chara(target).kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呜呜……不，不要继续了啦……」`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      chara(target).kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    if (chara(target).kojo.绳子 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「诶嘿嘿，是这种play呢……感觉心脏激动在不停的跳呢❤」`,
        );
        await era.printAndWait(
          `${target_name}兴奋的看着${master_name}，积极的配合着主人的动作被牢牢的绑住了。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「虽，虽然有点可怕，但是只要是主人想要……」`);
        await era.printAndWait(
          `${target_name}有些害怕的闭着眼睛，毫不反抗的被牢牢的绑住了`,
        );
      } else {
        await era.printAndWait(`「不要……不要……你，你要做什么……」`);
        await era.printAndWait(
          `${target_name}看着拿着绳子逼近的${master_name}，一步步的后退着，虽然激烈的进行反抗，但是仍然被绳子牢牢的绑住了。`,
        );
      }
      // CFLAG:345  = 1（变量语义：CFLAG 族，345）
      chara(target).kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，感受着被紧缚住的快感，像小狗一样吐着舌头，呼出甜美的热气。`,
        );
        await era.printAndWait(
          `「主人……这样子绑着什么的……哈啊啊………好开心……❤」`,
        );
        // CFLAG:345  = 9（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，稚气的小脸上露出了欲望的表情，轻轻的喘息着。`,
        );
        await era.printAndWait(`「主人……呼嗯……这样子的play……也不坏呢……❤」`);
        // CFLAG:345  = 8（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:345  = 7（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，小口小口的喘着气，下面好像已经变得湿漉漉的了。`,
        );
        await era.printAndWait(
          `「主人……这样绑住的话……是要做更加H的事情吧……嗯……可以的哟……${sc()}的身体……请随便使用吧……❤」`,
        );
        // CFLAG:345  = 6（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼啊啊……主人……真是粗暴的说……诶嘿嘿……这样的主人也……好喜欢……❤」`,
        );
        await era.printAndWait(
          `被${master_name}紧紧绑住的${target_name}，轻轻扭动着稚嫩身体诱惑着${master_name}。`,
        );
        // CFLAG:345  = 5（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // CFLAG:345  = 4（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜呜……不……不要……」`);
        await era.printAndWait(
          `${target_name}轻声喘息着，小小的身体被绳子紧紧的绑住，看起来像是待宰的羔羊一样。`,
        );
        // CFLAG:345  = 3（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 3;
      } else if (chara(target).kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        // CFLAG:345  = 2（变量语义：CFLAG 族，345）
        chara(target).kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.绳子着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈啊……已经结束了吗……❤」`);
      await era.printAndWait(`${target_name}有些遗憾的仰视着${master_name}。`);
      if (era.get(`abl:${target}:21`) >= 3) {
        await era.printAndWait(
          `在白皙的大腿之间，透明的爱液沿着内侧流了下来。`,
        );
      }
      // CFLAG:385  = 3（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「哈呜呜……不会留下印子吧……」`);
      await era.printAndWait(`${target_name}红着脸看着仰视着${master_name}`);
      if (era.get(`abl:${target}:21`) >= 3) {
        await era.printAndWait(
          `在白皙的大腿之间，透明的爱液沿着内侧流了下来。`,
        );
      }
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 2;
    } else if (chara(target).kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈啊……哈啊……」`);
      await era.printAndWait(`${target_name}轻轻抽泣着，抚摸着被绑的部位。`);
      if (era.get(`abl:${target}:21`) >= 3) {
        await era.printAndWait(`小脸上似乎泛着红晕……`);
      }
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      chara(target).kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    if (chara(target).kojo.口塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯咕……呼嗯……❤」`);
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「嗯呜……呜呜……呼……」`);
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        );
      } else {
        await era.printAndWait(`「不，不要……这种东西……呜……呜呜……？！」`);
        await era.printAndWait(
          `被强行塞上口球的${target_name}，晶莹的泪珠在眼眶里打转转。`,
        );
      }
      // CFLAG:346  = 1（变量语义：CFLAG 族，346）
      chara(target).kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯咕……呼嗯……嗯……❤」`);
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        );
        await era.printAndWait(
          `稚气的小脸兴奋的看着${master_name}，唾液从口球的洞中滴落下来。`,
        );
        // CFLAG:346  = 9（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯咕……呼嗯……嗯……❤」`);
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        );
        await era.printAndWait(`稚气的小脸兴奋的看着${master_name}。`);
        // CFLAG:346  = 8（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯咕……呼嗯……嗯……❤」`);
        await era.printAndWait(
          `被塞上口球的${target_name}有些诱惑的轻轻喘息着，像是在诱惑着${master_name}。`,
        );
        // CFLAG:346  = 7（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (chara(target).kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯呜……呼呜呜……呜……」`);
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        );
        await era.printAndWait(
          `稚气的小脸兴奋的看着${master_name}，唾液从口球的洞中滴落下来。`,
        );
        // CFLAG:346  = 6（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯呜……呼呜呜……呜……」`);
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        );
        await era.printAndWait(`稚气的小脸兴奋的看着${master_name}。`);
        // CFLAG:346  = 5（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯呜……呼呜呜……呜……」`);
        await era.printAndWait(
          `被塞上口球的${target_name}红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。`,
        );
        // CFLAG:346  = 4（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 4;
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「咕呜呜……呜……呜……」`);
        await era.printAndWait(
          `被强行塞上口球的${target_name}，晶莹的泪珠在眼眶里打转转。`,
        );
        await era.printAndWait(`唾液从口球的洞中滴落下来。`);
        // CFLAG:346  = 3（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 3;
      } else if (chara(target).kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「咕呜呜……呜……呜……」`);
        await era.printAndWait(
          `被强行塞上口球的${target_name}，晶莹的泪珠在眼眶里打转转。`,
        );
        // CFLAG:346  = 2（变量语义：CFLAG 族，346）
        chara(target).kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯……呼啊……诶嘿嘿……❤」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (chara(target).kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼啊啊……口水都……」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 2;
    } else if (chara(target).kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呼……啊……不要了啦……这种事情……」`);
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      chara(target).kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    if (chara(target).kojo.灌肠肛塞 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「啊啊……肚子里面……要坏掉了啦……❤」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜……会……会加油的……哈……呜……」`);
      } else {
        await era.printAndWait(`「咿咿……不要……好难受……肚子……好难受啊……」`);
      }
      // CFLAG:347  = 1（变量语义：CFLAG 族，347）
      chara(target).kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼啊啊……这种肚子快要爆炸的感觉……呜嗯……好棒……❤」`,
        );
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下露出了恍惚的表情。`,
        );
        await era.printAndWait(
          `「诶嘿嘿……主人……就这样……做更多H的事情……吧……❤」`,
        );
        await era.printAndWait(
          `感受着后面时不时传来的刺激，${target_name}魅惑的看着${master_name}，小小的身体时不时轻轻颤抖着。`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯哈……肚子里面……嗯……这样子不行啦……❤」`);
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下轻轻颤抖着。`,
        );
        await era.printAndWait(
          `「嗯……但是这样子刺激的话……哈啊……不行……要去了啦……❤」`,
        );
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「啊呜呜……肚子里面……一直在响着……虽然难受……可是……感觉……好奇怪呜呜……」`,
        );
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，不停的轻轻喘息着，从可爱的呻吟声来看，似乎痛苦中也混杂着快感的样子。`,
        );
        await era.printAndWait(
          `「主人……那个……呜呜……请……请更加的……疼爱${sc()}吧……❤」`,
        );
        await era.printAndWait(
          `感受着后面时不时传来的刺激，${target_name}撒娇一般的看着${master_name}。`,
        );
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……呀……肚子里面……好难受……」`);
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下轻轻颤抖着。`,
        );
        await era.printAndWait(`「呜呜……被主人这样子看着……好害羞……呜……」`);
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 4;
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (chara(target).kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜啊啊……肚子里面……呜呜……不行……哈啊啊……❤」`);
        await era.printAndWait(
          `被大量的注入灌肠液，肚子都微微鼓起来的${target_name}，在腹痛和便意的刺激下露出了违背本心的恍惚的表情。`,
        );
        await era.printAndWait(`「这种事情……明明不行的……明明不行的说……」`);
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 3;
      } else if (chara(target).kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「讨厌……不要……呜……好……难受……呀……」`);
        await era.printAndWait(
          `被${master_name}虐待着后面的${target_name}，捂着肚子颤抖着。`,
        );
        await era.printAndWait(
          `「为什么……要做这种事情呜……肚子……要坏掉了啦……」`,
        );
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        chara(target).kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 55) {
    if (chara(target).kojo.放置PLAY == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「诶诶，为什么停下来了呢？」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜……主……主人……？」`);
      } else {
        await era.printAndWait(`「不，不要看这边，呜呜……」`);
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}的秘裂里蠕虫蠢动着、毫不留情的在腔内转动着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}的肛门里蠕虫蠢动着、毫不留情的蹂躏着腔内。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门里插入着肛珠、肛门紧缩着。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被安装着的电动阴蒂夹持续刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被安装着的电乳头夹持续刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}的胸部被装上的榨乳器吸出了母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被装上了飞机杯，现在也好像快要射精了一样摆动着。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被装上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被绳子绑住拘束了起来。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠而发出咕噜咕噜的声音、好像拔出塞子的话马上就会排出来似的。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、轻微的电流流过让括约肌颤动着。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然后、那样的${target_name}姿态被完全录了下来………`,
        );
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      chara(target).kojo.放置PLAY = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 5 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜呜，主人，不要停下来啦……H的事情，还想要更多的说～❤」`,
        );
        await era.printAndWait(
          `${target_name}的两腿不住的摩擦着，如果不是因为${master_name}的命令的话大概现在就已经开始自慰了吧。`,
        );
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.放置PLAY <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼诶诶～继续来做嘛～主人～」`);
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (chara(target).kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呜……主人……不要这样子……${sc()}没有主人的话……」`,
        );
        await era.printAndWait(
          `${target_name}喘着气，大腿互相摩擦着，透明的爱液沿着大腿流了下来。`,
        );
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……主，主人……？怎么了呢……？」`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 3;
      } else if (chara(target).kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「不，不要……不要再做这种事了……」`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        chara(target).kojo.放置PLAY = 2;
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `${target_name}的秘裂里蠕虫蠢动着、毫不留情的在腔内转动着。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `${target_name}的肛门里蠕虫蠢动着、毫不留情的蹂躏着腔内。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(
          `${target_name}的肛门里插入着肛珠、肛门紧缩着。`,
        );
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `${target_name}的阴蒂被安装着的电动阴蒂夹持续刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(
          `${target_name}的乳头被安装着的电乳头夹持续刺激着。`,
        );
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(`${target_name}的胸部被装上的榨乳器吸出了母乳。`);
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被装上了飞机杯，现在也好像快要射精了一样摆动着。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}被装上了眼罩。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}的身体被绳子绑住拘束了起来。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `${target_name}的肚子因为灌肠而发出咕噜咕噜的声音、好像拔出塞子的话马上就会排出来似的。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `${target_name}的肛门被插入了电极、轻微的电流流过让括约肌颤动着。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然后、那样的${target_name}姿态被完全录了下来………`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 56) {
    if (chara(target).kojo.交谈 == 0) {
      if (era.get(`tequip:${target}:53`) == 1) {
        await era.print(`${master_name}命令${target_name}做一个自我介绍。`);
        if (
          rand_n(3) == 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // 原作是一整行：无后缀 PRINTFORM 连续不换行，
          // 末行 PRINTFORMW 才收行。:4341 的 SIF ABL:31 >= 3 只护住 :4342
          // 那一段——判据提到语句外当取值，文本留在输出语句里（#625）
          const masturbation_note = era.get(`abl:${target}:31`) >= 3;
          await era.printAndWait(
            `于是${target_name}将自己的名字、喜欢的H的方式` +
              (masturbation_note ? '还有手淫时妄想的内容' : '') +
              `之类的介绍了出来……`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.print(
            `${target_name}稚气的小脸上浮现出和年龄不符的欲望，轻咬着手指对着水晶球作着自我介绍。`,
          );
          await era.printAndWait(`「那个……人家的名字是${target_name}呢～」`);
          await era.printAndWait(
            `「最喜欢的事情呢，当然是和魔王大人最H的事情了～❤」`,
          );
          await era.printAndWait(
            `「诶嘿嘿，魔王大人的肉棒，超～舒服的呢～❤小穴也好屁股也好嘴巴也好，哪里都被肉棒弄的很舒服的说～❤」`,
          );
          await era.printAndWait(
            `「现在每天都要想着魔王大人的肉棒自慰个不停呢～❤」`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.print(
            `${target_name}羞红着脸对着水晶球作着自我介绍，时不时看向${master_name}。`,
          );
          await era.printAndWait(
            `「啊呜呜……那个……好害羞的说……那个……人家的名字是${target_name}……」`,
          );
          await era.printAndWait(
            `「嗯……虽然是单方面的……那个……现在……那个……在恋爱中……大概……」`,
          );
          await era.printAndWait(
            `「诶诶……喜欢的人？那个……一定要说的话……呜……那个……魔王大人呢……」`,
          );
          await era.printAndWait(
            `「那个……只要魔王大人要求的话……虽然很害羞……但是……请大家看……亲热的事情……的说……」`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(
            `${target_name}一边介绍着自己，一边蹭着${master_name}。`,
          );
          await era.printAndWait(`两腿之间好像已经湿了……`);
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.printAndWait(
            `${target_name}乖巧的向着水晶球开始了自我介绍。`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(
            `${target_name}一句话也不说，一直抽泣个不停。`,
          );
        }
      } else {
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边与${master_name}说着话，一边对着${master_name}露出了重要的地方。`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，说着色色的话语。`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
          // 不换行，末行 PRINTFORML 才收行。:4376/:4378 的工具档互斥且无
          // ELSE——判据提到语句外当取值，文本留在输出语句里（#625）
          const overwhelmed_by_tool =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const overwhelmed_by_pain =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            `${target_name}一边压抑着` +
              (overwhelmed_by_tool
                ? '快乐的'
                : overwhelmed_by_pain
                  ? '痛苦的'
                  : '') +
              `呼吸声，一边努力回应着${master_name}……`,
          );
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.print(
            `${target_name}一边这么说着，一边对着水晶球露出了重要的地方。`,
          );
          await era.printAndWait(`「这里……好想被主人疼爱呢……❤」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，对着水晶球说着色色的话语。`,
          );
          await era.printAndWait(`「呐呐……主人……快点……来做舒服的事情吧……❤」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            `${target_name}大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。`,
          );
          await era.printAndWait(`「嗯……❤呀……哈啊……❤」`);
        } else {
          await era.print(`${target_name}乖巧的低着头听着。`);
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      chara(target).kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) == 1) {
        await era.print(`${master_name}催促着${target_name}进行自我介绍。`);
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边自我介绍着，一边对着水晶球露出了重要的地方。`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}开心的朝着${master_name}撒着娇，对着水晶球说着色色的话语。`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (
          rand_n(3) == 0 &&
          (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5)
        ) {
          // 同 :4340 组的一整行（#625）
          const masturbation_note = era.get(`abl:${target}:31`) >= 3;
          await era.printAndWait(
            `于是${target_name}将自己的名字、喜欢的H的方式` +
              (masturbation_note ? '还有手淫时妄想的内容' : '') +
              `之类的介绍了出来……`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.print(
            `${target_name}稚气的小脸上浮现出和年龄不符的欲望，轻咬着手指对着水晶球作着自我介绍。`,
          );
          await era.printAndWait(`「那个……人家的名字是${target_name}呢～」`);
          await era.printAndWait(
            `「最喜欢的事情呢，当然是和魔王大人最H的事情了～❤」`,
          );
          await era.printAndWait(
            `「诶嘿嘿，魔王大人的肉棒，超～舒服的呢～❤小穴也好屁股也好嘴巴也好，哪里都被肉棒弄的很舒服的说～❤」`,
          );
          await era.printAndWait(
            `「现在每天都要想着魔王大人的肉棒自慰个不停呢～❤」`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.print(
            `${target_name}羞红着脸对着水晶球作着自我介绍，时不时看向${master_name}。`,
          );
          await era.printAndWait(
            `「啊呜呜……那个……好害羞的说……那个……人家的名字是${target_name}……」`,
          );
          await era.printAndWait(
            `「嗯……虽然是单方面的……那个……现在……那个……在恋爱中……大概……」`,
          );
          await era.printAndWait(
            `「诶诶……喜欢的人？那个……一定要说的话……呜……那个……魔王大人呢……」`,
          );
          await era.printAndWait(
            `「那个……只要魔王大人要求的话……虽然很害羞……但是……请大家看……亲热的事情……的说……」`,
          );
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)
        ) {
          await era.print(
            `${target_name}一边这么说着，一边蹭着${master_name}。`,
          );
          await era.print(`两腿之间好像已经湿了……`);
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`abl:${target}:10`) >= 3 ||
          era.get(`abl:${target}:11`) >= 4 ||
          era.get(`abl:${target}:17`) >= 2
        ) {
          await era.print(`${target_name}乖巧的向着水晶球开始自我介绍了`);
          // TFLAG:32 |= 2（变量语义：录像内容位标志）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(
            `${target_name}一句话也不说，一直抽泣个不停。`,
          );
        }
      } else {
        // 的 `PRINTFORM %SAVESTR:PLAYER%` 与随后互斥分支的 PRINTFORML
        // 尾段（:4442/:4444/… 各自收行）在 Emuera 里同属一行。前缀行归第一条
        // 分支的拼接锚 :4440+:4442；其余互斥分支改用同一个前缀变量——保真锁
        // 按锚逐条核对插值记号，非前缀行的语句里不许再出现 PLAYER 记号（#625）
        const player_prefix = `${player_name}`;
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            era.get(`abl:${target}:10`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${player_name}${target_name}一边与${master_name}说着话，一边对着${master_name}露出了重要的地方。`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            era.get(`abl:${target}:11`) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            player_prefix +
              `${target_name}开心的朝着${master_name}撒着娇，对着${master_name}说着色色的话语。`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            era.get(`abl:${target}:10`) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同 :4375 组的一整行（#625）
          const overwhelmed_by_tool =
            era.get(`tequip:${target}:11`) ||
            era.get(`tequip:${target}:13`) ||
            era.get(`tequip:${target}:14`) ||
            era.get(`tequip:${target}:15`) ||
            era.get(`tequip:${target}:16`) ||
            era.get(`tequip:${target}:17`);
          const overwhelmed_by_pain =
            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);
          await era.print(
            player_prefix +
              `${target_name}一边压抑着` +
              (overwhelmed_by_tool
                ? '快乐的'
                : overwhelmed_by_pain
                  ? '痛苦的'
                  : '') +
              `呼吸声，一边努力回应着${master_name}……`,
          );
        } else if (era.get(`talent:${target}:76`) == 1) {
          await era.print(
            player_prefix +
              `${target_name}一边这么说着，一边对着${master_name}露出了重要的地方。`,
          );
          await era.printAndWait(`「这里……好想被主人疼爱呢……❤」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          era.get(`abl:${target}:10`) >= 5
        ) {
          await era.print(
            player_prefix +
              `${target_name}开心的朝着${master_name}撒着娇，说着色色的话语。`,
          );
          await era.printAndWait(`「呐呐……主人……快点……来做舒服的事情吧……❤」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          era.get(`abl:${target}:10`) >= 3
        ) {
          await era.print(
            player_prefix +
              `${target_name}大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。`,
          );
          await era.printAndWait(`「嗯……❤呀……哈啊……❤」`);
        } else {
          // （同 :4440 那一行的另一条互斥尾段，前缀用同一个变量）
          await era.print(player_prefix + `${target_name}乖巧的低着头听着。`);
        }
        return 0;
      }
    }

    if (era_flag.selectcom == 123) {
      if (chara(target).kojo.乳夹口交 == 0) {
        if (era.get(`talent:${target}:76`) == 1) {
          await era.printAndWait(
            `「诶嘿嘿……主人的美味的肉棒……${sc()}会好好的让它舒服的哟❤」`,
          );
          await era.printAndWait(
            `${target_name}散发着和稚气的外表不符的色气，用平坦而柔软的小胸部开始摩擦起${master_name}的肉棒来。`,
          );
        } else if (era.get(`talent:${target}:85`) == 1) {
          await era.printAndWait(
            `「呼啊……主人的那个……还是那么……呜……雄伟的说……」`,
          );
          await era.printAndWait(`「嗯～${sc()}会努力让主人变得舒服起来的～」`);
          await era.printAndWait(
            `${target_name}微微有些害羞的仰着头看着${master_name}，用平坦而柔软的小胸部开始侍奉起${master_name}的肉棒来。`,
          );
        } else if (era.get(`abl:${target}:16`) >= 3) {
          await era.printAndWait(`「用……用胸部吗……明白了的说……」`);
          await era.printAndWait(
            `${target_name}顺从的用平坦而柔软的小胸部开始侍奉起${master_name}的肉棒来。`,
          );
        } else {
          await era.printAndWait(`「呜呜……这……这种事情……呜……讨厌啦……」`);
          await era.printAndWait(
            `${target_name}在${master_name}的命令下挂着泪珠不情愿的用平坦而柔软的小胸部摩擦着肉棒。`,
          );
        }
        // CFLAG:360  = 1（变量语义：CFLAG 族，360）
        chara(target).kojo.乳夹口交 = 1;
        return 0;
      } else {
        if (
          era.get(`talent:${target}:76`) == 1 &&
          (chara(target).kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「诶嘿嘿……主人的肉棒……嗯……好热……好硬……感觉……好棒呢……❤」`,
          );
          await era.printAndWait(
            `「虽然胸部很小，但是这样～这样～嗯……啾哈……呐呐……舒服吗……？❤」`,
          );
          await era.printAndWait(
            `${target_name}的小脸上浮现出色色的表情，一边用平坦而柔软的小胸部开始摩擦起${master_name}的肉棒，一边轻轻舔舐着前端。`,
          );
          // CFLAG:360  = 5（变量语义：CFLAG 族，360）
          chara(target).kojo.乳夹口交 = 5;
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (chara(target).kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(
            `「嗯……能侍奉主人什么的……${sc()}很开心的说……」`,
          );
          await era.printAndWait(
            `「呐呐……主人……这样子……感觉怎么样……舒服吗……？」`,
          );
          await era.printAndWait(
            `${target_name}的一边用平坦而柔软的小胸部侍奉着${master_name}的肉棒，一边仰着头询问着${master_name}的感觉。`,
          );
        } else if (
          era.get(`abl:${target}:16`) >= 3 &&
          (chara(target).kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
        ) {
          await era.printAndWait(`「主人……这个力度……可以吗……？」`);
          await era.printAndWait(`「这种事情……不太擅长呢……」`);
          await era.printAndWait(
            `${target_name}乖巧而有些笨拙的用平坦而柔软的小胸部侍奉着${master_name}的肉棒。`,
          );
          // CFLAG:360  = 3（变量语义：CFLAG 族，360）
          chara(target).kojo.乳夹口交 = 3;
        } else if (
          chara(target).kojo.乳夹口交 <= 1 ||
          game.kojo.口上开关 == 2
        ) {
          await era.printAndWait(`「呜呜……为什么要做这种事情……呜……真是的……」`);
          await era.printAndWait(
            `因为畏惧着${master_name}，${target_name}在挂着泪珠不情愿的用平坦而柔软的小胸部摩擦着肉棒。`,
          );
        }
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        chara(target).kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 125) {
    if (chara(target).kojo.口交时自慰 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「哈呜……嗯……呜……呼啊……主人的……肉棒……呼……好美味……❤」`,
        );
        await era.printAndWait(
          `${target_name}一边像吃棒棒糖一样舔弄吮吸着粗大的肉棒，一边用小手摩擦着自己的下半身，透明的爱液将手指弄的湿漉漉的，从幼嫩的下体滴到地上。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「啊呜……呼……嗯……主人……嗯……喜欢……最喜欢了……」`);
        await era.printAndWait(
          `${target_name}开心的用小嘴侍奉着${master_name}的肉棒，在${master_name}的命令下玩弄着自己的身体，濡湿的下半身将手指弄的湿漉漉的。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「呼嗯……哈……自己……嗯……弄吗……这样子……呼呜……可以吗……？」`,
        );
        await era.printAndWait(
          `在${master_name}的命令下，${target_name}一边用小嘴服侍着肉棒，一边用手指在两腿之间轻轻摩擦着。`,
        );
      } else {
        await era.printAndWait(`「啊呜呜……这种事……呜……太……羞耻了呜……」`);
        await era.printAndWait(
          `${target_name}挂着泪珠不情愿的在${master_name}的命令下一边含着肉棒，一边用手指摩擦着自己两腿之间。`,
        );
      }
      // CFLAG:361  = 1（变量语义：CFLAG 族，361）
      chara(target).kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼嗯……嗯……主人的……呼啊……又热又硬呢……诶嘿嘿……好美味呢……❤」`,
        );
        await era.printAndWait(
          `${target_name}一边像吃棒棒糖一样舔弄吮吸着粗大的肉棒，一边用小手摩擦着自己的下半身，透明的爱液将手指弄的湿漉漉的，从幼嫩的下体滴到地上。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「哈啊……这里……好想被肉棒侵犯……好想被主人的肉棒插进来……在里面……咕啾咕啾的……嗯……❤」`,
          );
        }
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜……呼……嗯……主人……嗯……喜欢……最喜欢了……」`);
        await era.printAndWait(
          `${target_name}开心的用小嘴侍奉着${master_name}的肉棒，在${master_name}的命令下玩弄着自己的身体，濡湿的下半身将手指弄的湿漉漉的。`,
        );
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「嗯……和主人在一起……真是……超幸福呢……如果能和主人……嗯……变成主人的东西的话……」`,
          );
        }
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「呼嗯……哈……自己……嗯……弄吗……这样子……呼呜……可以吗……？」`,
        );
        await era.printAndWait(
          `在${master_name}的命令下，${target_name}一边用小嘴服侍着肉棒，一边用手指在两腿之间轻轻摩擦着。`,
        );
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 3;
      } else if (
        chara(target).kojo.口交时自慰 <= 1 ||
        game.kojo.口上开关 == 2
      ) {
        await era.printAndWait(`「啊呜呜……这种事……呜……太……羞耻了呜……」`);
        await era.printAndWait(
          `${target_name}挂着泪珠不情愿的在${master_name}的命令下一边含着肉棒，一边用手指摩擦着自己两腿之间。`,
        );
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        chara(target).kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 126) {
    if (chara(target).kojo.手搓口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(
          `「主人的肉棒……啾～❤要在${sc()}嘴里射好多好多的牛奶哟～❤」`,
        );
        await era.printAndWait(
          `${target_name}开心的舔弄着肉棒，小手也随着舌头一起按摩着。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呼啊……嗯……主人……这样子……舒服吗……？」`);
        await era.printAndWait(
          `${target_name}含住前端温柔的舔弄着，小手轻轻揉捏着肉棒。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「啊呜……嗯……嗯呜……主人……是……这样吗……？」`);
      } else {
        await era.printAndWait(
          `「呜呜……用手……和嘴巴什么的……呜……这种……地方……」`,
        );
      }
      // CFLAG:362  = 1（变量语义：CFLAG 族，362）
      chara(target).kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「主人的肉棒……啾～❤要在${sc()}嘴里射好多好多的牛奶哟～❤」`,
        );
        await era.printAndWait(
          `${target_name}开心的舔弄着肉棒，小手也随着舌头一起按摩着。`,
        );
        await era.printAndWait(
          `「肉棒在颤抖着呢……诶嘿嘿❤就这么舒服吗～漏出来的东西也……好美味……嗯呼……❤」`,
        );
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊……嗯……主人……这样子……舒服吗……？」`);
        await era.printAndWait(
          `${target_name}含住前端温柔的舔弄着，小手轻轻揉捏着肉棒，在含不进去的部分按摩着。`,
        );
        await era.printAndWait(`「啾嗯……嗯……呼……主人的味道……嗯……最喜欢了……❤」`);
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊呜……嗯……嗯呜……主人……是……这样吗……？」`);
        await era.printAndWait(
          `${target_name}顺从的听从着${master_name}的命令，努力的用小手和嘴巴侍奉着肉棒。`,
        );
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 3;
      } else if (chara(target).kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呜呜……用手……和嘴巴什么的……呜……这种……地方……」`,
        );
        await era.printAndWait(
          `${target_name}的小手轻握着肉棒，不太情缘的服侍着。`,
        );
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        chara(target).kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 127) {
    if (chara(target).kojo.真空口交 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯啾……呼……啾……嗯……肉棒……啾……好好吃……❤」`);
        await era.printAndWait(
          `将${master_name}粗大的肉棒完全含住的${target_name}用力的吮吸着，发出了非常淫乱的声音。`,
        );
        await era.printAndWait(`「主人的……肉棒……啾噗……呜……嗯……❤」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「嗯呜……啾……啾噗……呼哈……主人的……味道……好浓烈呢……」`,
        );
        await era.printAndWait(
          `${target_name}温暖的小嘴紧紧的包裹着肉棒，用力的吮吸个不停，滋滋的发出了非常淫乱的声音。`,
        );
        await era.printAndWait(`「啾……哈呜……主人……这样子……啾噗……舒服吗……？」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「嗯啾……呜……呼……这样子……主人……满意……呜……吗？」`,
        );
      } else {
        await era.printAndWait(
          `「呜……啾噗……奇怪的味道……呜……一定要……这么做吗……？」`,
        );
      }
      // CFLAG:363  = 1（变量语义：CFLAG 族，363）
      chara(target).kojo.真空口交 = 1;
      return 0;
    } else {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「嗯啾……呼……啾……嗯……肉棒……啾……好好吃……❤」`);
        await era.printAndWait(
          `将${master_name}粗大的肉棒完全含住的${target_name}用力的吮吸着，发出了非常淫乱的声音。`,
        );
        await era.printAndWait(`「主人的……肉棒……啾噗……呜……嗯……❤」`);
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯呜……啾……啾噗……呼哈……主人的……味道……好浓烈呢……」`,
        );
        await era.printAndWait(
          `${target_name}温暖的小嘴紧紧的包裹着肉棒，用力的吮吸个不停，滋滋的发出了非常淫乱的声音。`,
        );
        await era.printAndWait(`「啾……哈呜……主人……这样子……啾噗……舒服吗……？」`);
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「嗯啾……呜……呼……这样子……主人……满意……呜……吗？」`,
        );
        await era.printAndWait(
          `${target_name}含着眼泪用力的吮吸着肉棒，发出了非常淫乱的声音。`,
        );
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 3;
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(
          `「呜……啾噗……奇怪的味道……呜……一定要……这么做吗……？」`,
        );
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        chara(target).kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 69) {
    if (chara(target).kojo.六九式 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「呼啊……主人的肉棒……还想要……更多……嗯啾……❤」`);
        await era.printAndWait(
          `${target_name}趴在${master_name}身上吮吸着肉棒，感受着双腿之间被舌头侵犯的快感。`,
        );
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「主……主人也要做吗……那种事情……诶嘿嘿……感觉……好开心……❤」`,
        );
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加细心的服侍着肉棒，小小的舌头在肉棒上轻轻的滑动着。`,
        );
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「呜呜……被主人弄这种事……呜……感觉……很荣幸……」`);
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加卖力的服侍着肉棒。`,
        );
      } else {
        await era.printAndWait(`「哈呜呜……不，不要那样子舔呜呜……」`);
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}的脸的更红了。`,
        );
      }
      // CFLAG:364  = 1（变量语义：CFLAG 族，364）
      chara(target).kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呼啊……主人的肉棒……还想要……更多……嗯啾……❤」`);
        await era.printAndWait(
          `${target_name}趴在${master_name}身上吮吸着肉棒，感受着双腿之间被舌头侵犯的快感。`,
        );
        await era.printAndWait(`「嗯……哈啊……主人的舌头……舔的好舒服呢……嗯……❤」`);
        await era.printAndWait(`「${sc()}也不能输呐❤」`);
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「主……主人也要做吗……那种事情……诶嘿嘿……感觉……好开心……❤」`,
        );
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加细心的服侍着肉棒，小小的舌头在肉棒上轻轻的滑动着。`,
        );
        await era.printAndWait(`「嗯……啾……舔这里的话……主人会舒服呢……」`);
        await era.printAndWait(
          `「在轻轻颤抖着呢……诶嘿嘿……❤${sc()}会更加努力的～」`,
        );
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜呜……被主人弄这种事……呜……感觉……很荣幸……」`);
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}更加卖力的服侍着肉棒。`,
        );
        await era.printAndWait(`「啊呜……呼……热热的呢……」`);
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 3;
      } else if (chara(target).kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哈呜呜……不，不要那样子舔呜呜……」`);
        await era.printAndWait(
          `感受到${master_name}的舔弄，${target_name}的脸的更红了。`,
        );
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        chara(target).kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 124) {
    if (chara(target).kojo.深喉 == 0) {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「含到最里面？嗯～没问题哟～❤」`);
        await era.printAndWait(
          `${target_name}毫不犹豫的含住了肉棒，温热的小嘴不断吞咽着，布丁一样柔软的最里面蠕动着按摩着肉棒的前端。`,
        );
        await era.printAndWait(`「嗯……嗯嗯……呜……咕……」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(
          `「最，最里面吗……呜嗯……为了主人的话……不管什么都没问题的哟……」`,
        );
        await era.printAndWait(
          `${target_name}粉嫩的嘴唇轻碰着肉棒的前端，温热的小嘴慢慢的将肉棒含了进去，一点点的进入到布丁一样柔软的最里面。`,
        );
        await era.printAndWait(`「嗯……啾……哈呜呜……」`);
      } else if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(`「呜……全部都……含进去了……哟……」`);
        await era.printAndWait(
          `${target_name}努力的遵从着${master_name}的命令，将肉棒全部含了进去。`,
        );
      } else {
        await era.printAndWait(`「哈咕……呜……呜呜……好难受……呜……」`);
        await era.printAndWait(
          `害怕着${master_name}的${target_name}含着眼泪将肉棒吞进了大半，露出了苦闷的表情。`,
        );
      }
      // CFLAG:365  = 1（变量语义：CFLAG 族，365）
      chara(target).kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「含到最里面？嗯～没问题哟～❤」`);
        await era.printAndWait(
          `${target_name}毫不犹豫的含住了肉棒，温热的小嘴不断吞咽着，布丁一样柔软的最里面蠕动着按摩着肉棒的前端。`,
        );
        await era.printAndWait(`「嗯……嗯嗯……呜……咕……」`);
        await era.printAndWait(
          `「（这种……窒息感……身体的感觉……快感翻倍了啦……❤）`,
        );
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「最，最里面吗……呜嗯……为了主人的话……不管什么都没问题的哟……」`,
        );
        await era.printAndWait(
          `${target_name}粉嫩的嘴唇轻碰着肉棒的前端，温热的小嘴慢慢的将肉棒含了进去，一点点的进入到布丁一样柔软的最里面。`,
        );
        await era.printAndWait(`「嗯……啾……哈呜呜……」`);
        await era.printAndWait(
          `「（呜呜……虽然有些难受……感觉脑子都一片空白了……但是只要主人舒服的话……）」`,
        );
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 4;
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (chara(target).kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「呜……全部都……含进去了……哟……」`);
        await era.printAndWait(
          `${target_name}努力的遵从着${master_name}的命令，将肉棒全部含了进去。`,
        );
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 3;
      } else if (chara(target).kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「哈咕……呜……呜呜……好难受……呜……」`);
        await era.printAndWait(
          `害怕着${master_name}的${target_name}含着眼泪将肉棒吞进了大半，露出了苦闷的表情。`,
        );
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        chara(target).kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom == 80) {
    if (chara(target).kojo.强制口交 == 0) {
      if (era.get(`abl:${target}:16`) >= 3) {
        await era.printAndWait(
          `「我……我会努力的……嗯………………嗯呜呜…唔…哈咕…呜咳…！」`,
        );
        await era.printAndWait(
          `${target_name}轻轻含住了肉棒，努力不让牙齿碰到。`,
        );
        await era.printAndWait(
          `${master_name}握着小小的头部，在温暖的小嘴中里粗暴的抽送着。`,
        );
      } else {
        await era.printAndWait(`「嗯呜呜？！呜…呜呜…呜噗！」`);
        await era.printAndWait(
          `${master_name}粗暴的将肉棒插入${target_name}的嘴里，抓着头发开始侵犯起小嘴来。`,
        );
      }
      // CFLAG:381  = 1（变量语义：CFLAG 族，381）
      chara(target).kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (chara(target).kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯呼……嗯……呼呜呜……❤」`);
        await era.printAndWait(
          `（嘴巴……被主人这样子侵犯……好舒服……好棒的感觉……❤）`,
        );
        await era.printAndWait(
          `${target_name}享受着嘴巴被侵犯的快感，拼命的吮吸着肉棒。`,
        );
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (chara(target).kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「嗯呼……嗯……主……人……嗯……」`);
        await era.printAndWait(
          `${target_name}顺从的任由${master_name}在自己嘴里抽送着。`,
        );
        await era.printAndWait(
          `享受着温暖的口穴的${master_name}，握着小小的头部粗暴的抽送着。`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 4;

        await era.printAndWait(`「嗯呜呜……唔……哈咕……」`);
        await era.printAndWait(
          `${master_name}握着小小的头部，在温暖的小嘴中里粗暴的抽送着。`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 3;
      } else if (chara(target).kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「嗯呜……呜……呜……呜噗！」`);
        await era.printAndWait(
          `${master_name}粗暴的将肉棒插入${target_name}的嘴里，抓着头发开始侵犯着小嘴。。`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        chara(target).kojo.强制口交 = 2;
      }
      return 0;
    }
  }
}

// @kojo_message_palamcng_904
async function kojo_message_palamcng_904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
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

  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) == 1) {
    return 0;
  }

  const a = era0(`delta:${target}:11`) + era0(`delta:${target}:12`);
  if (game.train.处女丧失 == 1 && chara(target).kojo.处女丧失 == 0) {
    if (game.train.主人导致处女丧失 == 1) {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(`「啊哈……❤这样子终于……做H的事情了呢……好开心❤」`);
        await era.printAndWait(`初次被异物进入的幼穴，紧紧的包裹住了肉棒。`);
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (a < 500 || game.system.反抗刻印回避 == 1)
      ) {
        await era.printAndWait(`「啊……主人的肉棒……进来了……呢……❤」`);
        await era.printAndWait(
          `${target_name}含着眼泪轻轻的颤抖着，但是小脸上却满溢着幸福的表情。`,
        );
      } else {
        await era.printAndWait(`「呜呜……住手啊……好……好痛……」`);
        await era.printAndWait(`被肉棒强硬插入的幼穴因为疼痛而用力的紧缩着。`);
      }
    } else {
      if (era.get(`talent:${target}:76`) == 1) {
        await era.printAndWait(`「哈啊……有点痛呢……但是……H……好舒服❤」`);
        await era.printAndWait(`「虽然不是主人的肉棒有点遗憾呢……」`);
      } else if (era.get(`talent:${target}:85`) == 1) {
        await era.printAndWait(`「呜呜……明明是……想要留给主人的……」`);
        await era.printAndWait(
          `${target_name}轻轻的抽泣着，晶莹的泪珠从眼角滴落下来。`,
        );
      } else {
        await era.printAndWait(`「不要……求求你……不要了啦……」`);
        await era.printAndWait(
          `${target_name}哭着哀求着，因为强烈的疼痛，声音都显得有些颤抖。`,
        );
      }
    }
    // CFLAG:229  = 1（变量语义：CFLAG 族，229）
    chara(target).kojo.处女丧失 = 1;
  }

  const p_lube = era0(`palam:${target}:3`) + era0(`delta:${target}:3`);
  if (p_lube > PALAMLV[2] && chara(target).kojo.首次润滑Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「哈呜……！主人……这个……感觉好奇怪的说……」`);
        await era.printAndWait(
          `${target_name}羞红着小脸，有些困惑的看着${master_name}。`,
        );
        await era.printAndWait(`―――润滑初次超过LV2。`);
      } else {
        await era.printAndWait(`「呼诶……这个……是什么……是${sc()}的……？」`);
        await era.printAndWait(
          `${target_name}有些不知所措的看着透明的爱液，完全是孩子的幼小身躯，诚实的回应着快感。`,
        );
        await era.printAndWait(`―――润滑初次超过LV2。`);
      }
    } else {
      if (era_flag.selectcom == 50) {
        await era.printAndWait(`「哈呜……！不要啦……感觉凉凉的……呜……」`);
        await era.printAndWait(`${target_name}羞红着小脸，微微挣扎着。`);
        await era.printAndWait(`―――润滑初次超过LV2。`);
      } else {
        await era.printAndWait(`「呜呜……不要……这是什么……不要看……」`);
        await era.printAndWait(
          `${target_name}有些不知所措的看着透明的爱液，完全是孩子的幼小身躯，诚实的回应着快感。`,
        );
        await era.printAndWait(`―――润滑初次超过LV2。`);
      }
    }
    // CFLAG:221  = 1（变量语义：CFLAG 族，221）
    chara(target).kojo.首次润滑Lv2 = 1;
  }

  const p_lust = era0(`palam:${target}:5`) + era0(`delta:${target}:5`);
  if (p_lust > PALAMLV[2] && chara(target).kojo.首次欲情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(
          `「呼啊啊……身体……变得奇怪起来了……感觉有点热呢……❤」`,
        );
        await era.printAndWait(
          `听话的喝下媚药的${target_name}，皮肤微微泛起了可爱的粉红色。`,
        );
        await era.printAndWait(`「主人……抱抱……❤」`);
        await era.printAndWait(`―――欲情初次超过LV2。`);
      } else {
        await era.printAndWait(`「主人……喜欢……最喜欢了……❤」`);
        await era.printAndWait(
          `紧紧的抱着${master_name}的手不放的${target_name}，仰着头红着脸看着${master_name}。`,
        );
        await era.printAndWait(`―――欲情初次超过LV2。`);
      }
    } else {
      if (era_flag.selectcom == 51) {
        await era.printAndWait(`「呜……这是什么……不要……咕……呜呜……！」`);
        await era.printAndWait(
          `被${master_name}强迫喝掉媚药的${target_name}，很快就软绵绵的靠在墙上，皮肤微微泛起了可爱的粉红色。`,
        );
        await era.printAndWait(`「呜呜……身体……感觉……好奇怪……热热的……」`);
        await era.printAndWait(`―――欲情初次超过LV2。`);
      } else {
        await era.printAndWait(`「呼诶……感觉……身体……变得奇怪起来了……」`);
        await era.printAndWait(
          `连H的事情都还不能完全理解的${target_name}，因为身体的变化而困惑的看着${master_name}。`,
        );
        await era.printAndWait(`―――欲情初次超过LV2。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    chara(target).kojo.首次欲情Lv2 = 1;
  }

  const p_shame = era0(`palam:${target}:8`) + era0(`delta:${target}:8`);
  if (p_shame > PALAMLV[2] && chara(target).kojo.首次耻情Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「哈呜呜……主，主人……这种事……太害羞了啦……」`);
      await era.printAndWait(
        `${target_name}害羞的捂着脸，撒娇一般的轻声抱怨着。`,
      );
      await era.printAndWait(`―――耻情初次超过LV2。`);
    } else {
      await era.printAndWait(`「不，不要……呜呜……不要看……」`);
      await era.printAndWait(
        `${target_name}的小脸羞得仿佛要滴出水来，小手徒劳的想遮挡着裸露的部位。`,
      );
      await era.printAndWait(`―――耻情初次超过LV2。`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    chara(target).kojo.首次耻情Lv2 = 1;
  }

  const p_fear = era0(`palam:${target}:10`) + era0(`delta:${target}:10`);
  if (p_fear > PALAMLV[2] && chara(target).kojo.首次恐怖Lv2 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「哈呜呜……主人……好凶……好可怕……」`);
      await era.printAndWait(
        `${target_name}含着泪珠看着${master_name}，因为害怕而颤抖着。`,
      );
      await era.printAndWait(`―――恐怖初次超过LV2。`);
    } else {
      await era.printAndWait(
        `「对，对不起……我什么都……都会做的……已经……不要了啦……」`,
      );
      await era.printAndWait(
        `${target_name}害怕缩成一团，像小动物一样颤抖着。`,
      );
      await era.printAndWait(`―――恐怖初次超过LV2。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    chara(target).kojo.首次恐怖Lv2 = 1;
  }

  if (era0(`nowex:${target}:0`) > 0 && chara(target).kojo.首次C绝顶 == 0) {
    await era.printAndWait(`「呼啊啊……感觉……呀……嗯哈啊啊…………！」`);
    await era.printAndWait(
      `${target_name}感受着阴蒂传来的快感，身体不住的颤抖着。`,
    );
    await era.printAndWait(`「这是……呜呜……什……么……」`);
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    chara(target).kojo.首次C绝顶 = 1;
  } else if (
    era0(`nowex:${target}:0`) > 0 &&
    chara(target).kojo.首次C绝顶 == 1
  ) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(`「呜呜……主人……那，那样子刺激那里的话……❤」`);
      await era.printAndWait(
        `粉红色的小豆被${master_name}刺激着，幼小而敏感的身体在一波波的快感下不断的颤抖着，`,
      );
      await era.printAndWait(`「主人，菲娅，还，还想要更多呜呜～～❤」`);
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「呼啊啊……主，主人……请……请不要一直的……弄……那个……地方……」`,
      );
      await era.printAndWait(
        `粉红色的小豆被${master_name}刺激着，幼小而敏感的身体在一波波的快感下不断的颤抖着，`,
      );
      await era.printAndWait(`「哈呜呜呜……又，又要去了呜呜呜呜～～❤」`);
    } else {
      await era.printAndWait(`「那里被……被弄着……又，又要变得奇怪了啦～～」`);
      await era.printAndWait(
        `${target_name}感受着小豆豆传来的刺激，茫然的在快感下扭动着身体。`,
      );
    }
  }

  if (era0(`nowex:${target}:1`) > 0 && chara(target).kojo.首次V绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(`「啊哈……=肚子里面……肉棒……咕啾咕啾的……❤」`);
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。`,
      );
      await era.printAndWait(`「嗯……这就是……高潮吗……❤」`);
      await era.printAndWait(
        `${target_name}沉浸在刚刚的快感中，还有些失神的样子。`,
      );
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「呼啊啊……主人……嗯……肚子里面……呜呜……要，要变得奇怪了啦～～❤」`,
      );
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。`,
      );
      await era.printAndWait(`「呼啊……感觉……刚刚……好像飞起来一样呢……」`);
      await era.printAndWait(
        `${target_name}沉浸在刚刚的快感中，还有些失神的样子。`,
      );
    } else {
      await era.printAndWait(`「呼啊啊……不要……呜呜……要，要变得奇怪了啦～～」`);
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。`,
      );
      await era.printAndWait(`「呼……呜……什么……刚刚的是……」`);
    }
    // CFLAG:226  = 1（变量语义：CFLAG 族，226）
    chara(target).kojo.首次V绝顶 = 1;
  } else if (
    era0(`nowex:${target}:1`) > 0 &&
    chara(target).kojo.首次V绝顶 == 1
  ) {
    if (era.get(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      await era.printAndWait(
        `「嗯啊啊～主人，好，好舒服，要去了，要去了嗯嗯嗯嗯～～❤」`,
      );
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。`,
      );
      await era.printAndWait(`「嗯……肉棒……好舒服呢……❤」`);
      await era.printAndWait(`${target_name}的小脸上露出了恍惚的表情。`);
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      game.event.插着不拔 == 1
    ) {
      await era.printAndWait(`「呼啊啊……主人……已经……嗯……～不行了啦～～❤」`);
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。`,
      );
      await era.printAndWait(`「呼……啊……又……又去了……呢……」`);
      await era.printAndWait(`${target_name}的有些脱力的捂着害羞的小脸。`);
    } else {
      await era.printAndWait(`「呜……哈啊……不……不要……嗯～～」`);
      await era.printAndWait(
        `${target_name}小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。`,
      );
    }
  }

  if (era0(`nowex:${target}:2`) > 0 && chara(target).kojo.首次A绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(`「嗯呀～～屁股被这样子弄……呜……主人，已经～～❤」`);
      await era.printAndWait(
        `初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。`,
      );
      await era.printAndWait(`「诶嘿嘿……好舒服……呢……❤」`);
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「呼啊啊……屁股……感觉……呜……什么……这是……」`);
      await era.printAndWait(
        `初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。`,
      );
      await era.printAndWait(`「屁股……呼……啊……感觉……怪怪的呢……」`);
    } else {
      await era.printAndWait(`「呼呀……不要……屁股……不要再……嗯嗯嗯～」`);
      await era.printAndWait(
        `初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。`,
      );
      await era.printAndWait(`「呜……这个感觉……是……什么……」`);
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    chara(target).kojo.首次A绝顶 = 1;
  } else if (
    era0(`nowex:${target}:2`) > 0 &&
    chara(target).kojo.首次A绝顶 == 1
  ) {
    if (era.get(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {
      await era.printAndWait(`「嗯～主人，不要停下来……屁股已经……呼啊啊啊～❤」`);
      await era.printAndWait(
        `${target_name}又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。`,
      );
      await era.printAndWait(`「嗯……屁股被主人这样玩弄什么的……也好舒服呢～❤」`);
      await era.printAndWait(
        `${target_name}的大口的喘着气，带着痴态望着${master_name}。`,
      );
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      game.event.插着不拔 == 1
    ) {
      await era.printAndWait(
        `「呜呜……主人……这，这样下去……屁股……呜……已经……嗯嗯……～❤」`,
      );
      await era.printAndWait(
        `${target_name}又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。`,
      );
      await era.printAndWait(`「哈呜呜……又，又被主人给弄的……呜……」`);
      await era.printAndWait(
        `${target_name}害羞的撒着娇，身体沉浸在高潮的余韵中。`,
      );
    } else {
      await era.printAndWait(`「呜……哈啊……不……不要……嗯～～」`);
      await era.printAndWait(
        `${target_name}又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。`,
      );
    }
  }

  if (era0(`nowex:${target}:3`) > 0 && chara(target).kojo.首次B绝顶 == 0) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(`「嗯呀～～胸部感觉……啊啊啊……好舒服……好厉害……❤」`);
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，兴奋的颤抖着高潮了。`,
      );
      await era.printAndWait(`「胸部……呜呜……哈啊啊啊啊～～❤」`);
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(`「哈啊……主人……这样子……弄的话……嗯呀……❤」`);
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，羞红着脸高潮了。`,
      );
      await era.printAndWait(`「主人……嗯哈……胸部……好……舒服……」`);
    } else {
      await era.printAndWait(
        `「啊呜呜……胸部……不要……呜呜……要，要变得……嗯呀～～」`,
      );
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，不知所措的高潮了。`,
      );
      await era.printAndWait(`「什么……刚才的是……呜……」`);
    }
    // CFLAG:228  = 1（变量语义：CFLAG 族，228）
    chara(target).kojo.首次B绝顶 = 1;
  } else if (
    era0(`nowex:${target}:3`) > 0 &&
    chara(target).kojo.首次B绝顶 == 1
  ) {
    if (era.get(`talent:${target}:76`) == 1) {
      await era.printAndWait(`「哈啊啊～胸部被这样玩弄，会，会坏掉的啦～❤」`);
      await era.printAndWait(
        `幼小的草莓被刺激着，透过平坦的胸部可以感受到下方像小兔子一样不停跳动的小心脏，`,
      );
      await era.printAndWait(`「又，又要去了呜呜呜～～❤」`);
    } else if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「呜呜……不，不要这样子刺激胸部……呼啊啊……已经……❤」`,
      );
      await era.printAndWait(
        `幼小的草莓被刺激着，透过平坦的胸部可以感受到下方像小兔子一样不停跳动的小心脏，`,
      );
      await era.printAndWait(`「主，主人，要去了，要去了呜呜呜呜～～」`);
    } else {
      await era.printAndWait(`「嗯呀……！胸部，不，不要呜呜呜～～」`);
      await era.printAndWait(
        `${target_name}感受着胸部传来的刺激，不知所措的高潮了。`,
      );
    }
  }
}

// @kojo_message_markcng_904
async function kojo_message_markcng_904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
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

  if (era.get(`talent:${target}:9`) == 1) {
    return 0;
  }

  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }

  if (game.system.苦痛刻印变动 == 3 && chara(target).kojo.苦痛刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「哈咕……主人……好痛的说……这样子……${sc()}……会坏掉的啦……」`,
      );
      await era.printAndWait(
        `${target_name}因为强烈的痛楚大口大口的喘息着，已经连哭声都渐渐变小了。`,
      );
      await era.printAndWait(`「主人……呜……求……求求你……温柔一点点就好……」`);
    } else {
      await era.printAndWait(`「好痛呜呜……不要……求求你……呜……」`);
      await era.printAndWait(
        `${target_name}因为强烈的痛楚而不住的哀求着${master_name}，已经连哭声都渐渐变小了。`,
      );
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    chara(target).kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 == 3 && chara(target).kojo.快乐刻印Lv3 == 0) {
    if (
      era.get(`talent:${target}:85`) == 1 ||
      era.get(`talent:${target}:76`) == 1
    ) {
      await era.printAndWait(`「呼啊啊……主人……嗯……H的事情什么的……好舒服……❤」`);
      await era.printAndWait(
        `神情有些恍惚的${target_name}，小小的身体已经完全的沉浸在了和年龄不符的H行为带来的快感中了……`,
      );
    } else {
      await era.printAndWait(
        `「呜呜……感觉身体……呼啊啊……好奇怪……好舒服……的说……」`,
      );
      await era.printAndWait(
        `神情有些恍惚的${target_name}，小小的身体已经完全的沉浸在了和年龄不符的H行为带来的快感中了……`,
      );
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    chara(target).kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 == 3 && chara(target).kojo.屈服刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「${sc()}……为了主人的话……什么事情都没问题的呢……❤」`,
      );
      await era.printAndWait(
        `${target_name}红着脸抬头看着，经过反复的调教之后，小小的身体已经从身心上完全的服从于${master_name}了。`,
      );
    } else {
      await era.printAndWait(
        `「呜呜……${sc()}……什么都会乖乖听话的……所以请主人……至少……温柔一点呜呜……」`,
      );
      await era.printAndWait(
        `被反复调教的${target_name}，擦拭着眼角的泪珠，轻声的说着完全服从的誓言。`,
      );
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    chara(target).kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 == 3 && chara(target).kojo.反抗刻印Lv3 == 0) {
    if (era.get(`talent:${target}:85`) == 1) {
      await era.printAndWait(
        `「呜呜……就算是主人……这样子……呜……也太过分了啦……」`,
      );
      await era.printAndWait(
        `${target_name}紧紧的盯着${master_name}，晶莹的泪水在眼眶里打转转。`,
      );
      await era.printAndWait(`「这种事情……呜……」`);
    } else {
      await era.printAndWait(`「呜，不要，不要过来～」`);
      await era.printAndWait(
        `虽然${target_name}比平时更加激烈的抵抗着，但是只是需要稍微多用一点点力气的程度而已。`,
      );
      await era.printAndWait(
        `有些不耐烦的${master_name}强行的将抵抗压制住了。`,
      );
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    chara(target).kojo.反抗刻印Lv3 = 1;
  }
}

// @self_kojo_k904
async function self_kojo_k904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  const sc = (cid = target) => self_call(cid);
  const sale_price = peek_sale_price(); // TFLAG:13 == 6 分支的原作 S（售价）
  if (game.train.初吻与自我口上 == 1) {
    if (peek_aftertrain_q() == 1) {
      await era.print(
        `「${assi_name}大人……那个……拜托……更加的……疼爱${sc()}……❤」`,
      );
      await era.printAndWait(
        `${target_name}拉着${assi_name}的手，轻轻摩擦着大腿，水汪汪的大眼睛里满是情欲的眼光。`,
      );
    } else if (peek_aftertrain_q() == 2) {
      await era.print(`「狗狗先生的那个……想要……这样子光靠手指的话……呜……」`);
      await era.printAndWait(
        `${target_name}有些欲求不满的自慰着，沉迷于异种的肉棒带来的快感中。`,
      );
    } else {
      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.调教后自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「啊哈……主人……这里……还想更多的被侵犯呢……❤」`);
        await era.printAndWait(
          `${target_name}沉浸在调教的快乐中，自己用手指玩弄着后面。`,
        );
        // CFLAG:261  = 6（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 6;
      } else if (
        era.get(`talent:${target}:76`) &&
        (chara(target).kojo.调教后自慰 < 5 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(
            `「呼啊……主人……好想和主人继续做舒服的事情……❤」`,
          );
          await era.printAndWait(
            `${target_name}的手指在自己还没有被异物插入过的小穴上抚弄，刺激着自己的小豆豆。`,
          );
          await era.printAndWait(
            `「诶嘿嘿……在主人破掉这里之前……哈啊……${sc()}会……嗯……好好忍耐的……呐❤」`,
          );
        } else {
          await era.printAndWait(
            `「哈啊……感觉……主人的肉棒……仿佛还留在里面呢……❤」`,
          );
          await era.printAndWait(
            `${target_name}不停抽动着手指，在自己的下半身进出着，带出黏糊糊的爱液。`,
          );
          await era.printAndWait(
            `「嗯呜……但是……果然还是……哈呀……没有主人的舒服呢……❤」`,
          );
        }
        // CFLAG:261  = 5（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 5;
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:77`) == 1 &&
        (chara(target).kojo.调教后自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(
          `「主人……想被主人……疼爱后面……想和主人……更加的……亲热……」`,
        );
        await era.printAndWait(
          `${target_name}轻弄着雏菊，朝${master_name}撒着娇。`,
        );
        await era.printAndWait(`「主人……哈啊……主人…………❤」`);
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (chara(target).kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        if (era.get(`talent:${target}:0`) == 1) {
          await era.printAndWait(`「主人……喜欢你……最喜欢你了……」`);
          await era.printAndWait(
            `${target_name}紧靠着${master_name}，小手在两腿间动着，发出了有些色气的喘息。`,
          );
          await era.printAndWait(
            `「好想把全部都奉献给主人……呐……主人……求求你……把第一次……」`,
          );
        } else {
          await era.printAndWait(`「呼啊……主人……主人……」`);
          await era.printAndWait(
            `想象着${master_name}的样子，想象着那是主人的手指，${target_name}不断玩弄着自己的下半身，`,
          );
          await era.printAndWait(
            `「呼啊啊……只是这样子的话……呜……好想更加的……和主人……」`,
          );
          await era.printAndWait(
            `纤细的手指在幼穴中进出着，带出了黏糊糊的爱液。`,
          );
        }
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 3;
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (chara(target).kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        await era.printAndWait(`「哈啊……已经……忍不住了啦……」`);
        await era.printAndWait(`「明明……这样的事情……但是……好，好舒服……❤」`);
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 2;
      } else if (chara(target).kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        await era.printAndWait(`「呜呜……这种事情……好，好过分……」`);
        await era.printAndWait(
          `${target_name}轻轻揉着被粗暴对待的身体，无形中刺激着敏感的地方。`,
        );
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        chara(target).kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 == 2) {
    if (
      era.get(`talent:${target}:76`) &&
      (chara(target).kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯……姐姐大人……哈啊……❤」`);
      await era.printAndWait(
        `${target_name}和${assi_name}的身体纠缠在一起，任由对方摆弄着自己。`,
      );
      await era.printAndWait(`「嗯……就是……那里……呀……好舒服……❤」`);
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「姐姐大人……呜……这样子……主人会……哈啊……」`);
      await era.printAndWait(
        `${assi_name}压着${target_name}，手指在幼小的蜜裂上滑动着。`,
      );

      if (game.system.快乐刻印变动 == 3) {
        await era.printAndWait(
          `${target_name}轻轻喘息着，娇小的身体因为快感而微微的颤抖着。`,
        );
        await era.printAndWait(`「呼啊……那里……不，不行……嗯……哈啊啊」`);
        await era.printAndWait(
          `感受着指尖湿润的${assi_name}坏笑着加快了速度。`,
        );
        await era.printAndWait(`「啊啊……姐，姐姐大人……这样子的话……呀……❤」`);
      } else {
        await era.printAndWait(
          `${target_name}努力的忍耐着快感，不让自己叫出声来。`,
        );
        await era.printAndWait(`「呜……哈咕……嗯……」`);
        await era.print(`${assi_name}轻舔着身下的幼女，加大了指尖的力度……`);
      }
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 4;
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (chara(target).kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「呼啊啊，姐姐大人……嗯……呀……❤」`);
      await era.printAndWait(
        `稚气的声音在屋子里回响着，${target_name}向侍奉${master_name}那样用心的侍奉着${assi_name}，用自己的身体取悦着对方。`,
      );
      await era.printAndWait(`「姐姐大人的手指……呜……好……舒服……」`);
      await era.printAndWait(
        `${assi_name}温柔的摸了摸${target_name}的头，然后继续玩弄起幼小的身体来。`,
      );
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 3;
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (chara(target).kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯……不行……呀……那里是……」`);
      await era.printAndWait(
        `${target_name}在${assi_name}的玩弄下，发出了可爱的娇喘声。`,
      );
      await era.printAndWait(
        `明明同样是女孩子，却莫名的激起了${assi_name}欺负的欲望，无力的幼女就这样被压倒，一次次的玩弄着。`,
      );
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 2;
    } else if (chara(target).kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呜呜……不要……姐姐……这种事情……求求你……呀……」`);
      await era.printAndWait(
        `${target_name}徒劳的在${assi_name}身下挣扎着，感受着对方的手指入侵自己身体。`,
      );
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      chara(target).kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 == 3) {
    if (
      era.get(`talent:${target}:76`) == 1 &&
      (chara(target).kojo.朝口交 < 4 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「诶嘿嘿，主人，今天也早安的说～❤」`);
      await era.printAndWait(
        `${target_name}含着一大早就挺立着的肉棒，稚嫩的小嘴熟练的吸吮着。`,
      );
      await era.printAndWait(
        `「嗯啾……呼……哈啊……主人的肉棒……诶嘿……一早上就……嗯……很精神呢……❤」`,
      );
      await era.printAndWait(
        `看着${target_name}可爱而淫乱的小脸，${master_name}忍不住按着小小的脑袋，在温暖的小嘴里射了出来。`,
      );
      await era.printAndWait(`「嗯嗯嗯～～～～」`);
      await era.printAndWait(`「主人的牛奶……还想多喝一点呢……❤」`);
      // CFLAG:263  = 4（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 4;
    } else if (
      era.get(`talent:${target}:85`) &&
      (chara(target).kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯呼……呼哈……主人……早安……的说……」`);
      await era.printAndWait(
        `${target_name}温柔的侍奉着一大早就挺立着的肉棒，稚嫩的小嘴含住粗大的肉棒，小小的舌头不停的在肉棒上滑动着。`,
      );
      await era.printAndWait(`「主人的味道……全部都是呢……」`);
      await era.printAndWait(
        `看着${target_name}天真可爱的小脸，${master_name}忍不住按着小小的脑袋，在温暖的小嘴里射了出来。`,
      );
      await era.printAndWait(`「嗯嗯嗯～～～～」`);
      await era.printAndWait(`「嗯咕……主人的……嗯……」`);
      await era.printAndWait(
        `将嘴里的牛奶尽数吞下之后，${target_name}服侍着${master_name}的起居，开始了新的一天……`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 3;
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (chara(target).kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      await era.printAndWait(`「嗯呜……呼……呼啊……」`);
      await era.printAndWait(
        `${target_name}认真的用柔软的舌头侍奉着一大早就挺立着的肉棒，努力的让${master_name}舒服。`,
      );
      await era.printAndWait(`「嗯……啾哈……主人……这样子……可以吗……？」`);
      await era.printAndWait(`在发泄过欲望之后，新的一天开始了……`);
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 2;
    } else if (chara(target).kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「哈……呜……呜咕……主，主人……早上……好」`);
      await era.printAndWait(
        `${target_name}有些生涩的做着侍奉，畏缩的看着${master_name}。`,
      );
      await era.printAndWait(`……看来还需要一些调教呢。`);
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      chara(target).kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 4) {
    if (
      era.get(`abl:${target}:2`) >= 4 &&
      (chara(target).kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      if (!era.get(`talent:${target}:85`) && !era.get(`talent:${target}:76`)) {
        await era.printAndWait(
          `已经习惯了肉棒的幼穴不断的刺激着肉棒，温暖湿润的肉壁紧紧的吸着入侵的异物。`,
        );
        await era.printAndWait(
          `${master_name}不断的抽送着，肆意的使用着未发育的幼小身躯。`,
        );
      } else if (era.get(`talent:${target}:76`)) {
        await era.printAndWait(
          `「嗯呀～～主人，好厉害……还要，还想要更多～～主人的肉棒……和……精液牛奶……嗯～～❤」`,
        );
        await era.printAndWait(
          `${target_name}搂着${master_name}，积极的迎合着抽送，贪图着肉棒带来的快感。`,
        );
      } else if (era.get(`talent:${target}:85`)) {
        await era.printAndWait(
          `「呼啊啊……主人的那个……这样子在肚子里面……哈啊啊……」`,
        );
        await era.printAndWait(`「被主人使用着……好开心……❤」`);
        await era.printAndWait(
          `${target_name}因为快感的刺激而微微的颤抖着，在${master_name}的身下撒着娇。`,
        );
      }
      if (peek_aftertrain_s() >= 3) {
        await era.printAndWait(
          `调教结束以后，忍不住又把${target_name}推倒在床上，在小穴里面射了${peek_aftertrain_s()}次才满足……`,
        );
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 2;
    } else if (chara(target).kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      await era.printAndWait(`「呼诶诶……不是已，已经结束了咩……」`);
      await era.printAndWait(`「呀……主人……太激烈……了……嗯呀……太激烈了啦～～」`);
      await era.printAndWait(
        `「肚子里面……呼啊啊啊……主人的那个……又…………嗯哈啊啊啊～～」`,
      );
      await era.printAndWait(
        `调教结束后，忍不住又把${target_name}按在床上狠狠欺负了一番，射了${peek_aftertrain_s()}次才满足的起身……`,
      );
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      chara(target).kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 5) {
    if (chara(target).kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      if (era.get(`talent:${target}:85`)) {
        await era.printAndWait(
          `调教结束后准备回卧室休息的${master_name}在走廊上碰见了等在门外的${target_name}。`,
        );
        await era.printAndWait(
          `${target_name}轻轻的拽着${master_name}的衣角，另一只手抱着枕头，小脸半埋在里面，只露出两只眼睛。`,
        );
        await era.printAndWait(
          `水汪汪的大眼睛看着旁边，大概是因为害羞而不敢直接看着吧。`,
        );
        await era.printAndWait(`「呐呐……主人……今天……一起睡觉……可以吗……？」`);
        await era.printAndWait(
          `在得到了${master_name}肯定的回答后，${target_name}兴奋的抬起了头，露出了开心的笑容。`,
        );
        await era.printAndWait(`「诶嘿嘿，主人，最喜欢你了～❤」`);
      } else if (era.get(`talent:${target}:76`)) {
        await era.printAndWait(`「主人……已经要休息了咩……？」`);
        await era.printAndWait(
          `调教结束后的${master_name}躺在床上正准备休息时，听到了门被推开的声音。`,
        );
        await era.printAndWait(`「今天的……侍寝……那个……如果可以的话……」`);
        await era.printAndWait(
          `${target_name}轻轻的咬着手指，湿润的瞳孔充斥着满满的欲望，直直的看着这边。`,
        );
        await era.printAndWait(
          `在得到你的允许后，${target_name}小跑着扑到了床上，用力的蹭着${master_name}的身体。`,
        );
        await era.printAndWait(`「哇～主人最好了～❤」`);
      } else {
        await era.printAndWait(
          `调教结束后，刚清洗完身体的${master_name}，推开门看见的是穿着睡衣等在外面的${target_name}。`,
        );
        await era.printAndWait(`「那个……那个……今天的……牛奶……还……没有……」`);
        await era.printAndWait(
          `害羞的用枕头遮住脸的${target_name}，用细不可闻的声音轻轻的说着。`,
        );
        await era.printAndWait(
          `${master_name}露出了一丝得意的笑容，拽着眼前幼女的袖子带进了卧室，然后顺手将门锁上了。`,
        );
      }
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      chara(target).kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 6) {
    if (era.get(`talent:${target}:85`)) {
      if (sale_price >= 1000000) {
        await era.printAndWait(
          `就这样，${target_name}被卖给了现今当政的人类国王。`,
        );
        await era.printAndWait(
          `出卖灵魂投靠了${master_name}的他，满心欢喜的用大量的金钱将原来的公主买了回来。`,
        );
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `在那之后，听说被国王关在屋子里，彻底的沦为了玩物。`,
        );
        await era.printAndWait(`幼小的身体每晚都承受着那个人残暴的兽欲。`);

        await era.printAndWait(
          `不得不感叹，有时候人类对同族做的事情，比对异族做的事情要残酷的多。`,
        );
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        );
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      } else if (sale_price >= 500000) {
        await era.printAndWait(`就这样，${target_name}被卖给了魔族的富豪。`);
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `在那之后，听说被富豪当做幼犬养着，变成了非常顺从的宠物。`,
        );
        await era.printAndWait(
          `能够享用被魔王亲自调教过的女性，对魔族来说也算是一种荣耀了。`,
        );
        await era.printAndWait(
          `更何况她原本的身份还是人类的公主，身体的保养自然是最上等的。`,
        );
        await era.printAndWait(
          `似乎常常会被带到富豪们的晚宴上炫耀，然后当着众人的面被玩弄着。`,
        );
        await era.printAndWait(
          `尊严那种东西，早就不知道被摧残殆尽丢到哪里去了。`,
        );
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        );
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      } else if (sale_price >= 100000) {
        await era.printAndWait(`就这样，${target_name}被卖给了魔王城的娼馆。`);
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `像这样被调教好的人类幼女即使魔界也是很少见的，更不用说是被魔王玩弄过的。`,
        );
        await era.printAndWait(
          `虽然还是个孩子，但幼小的身体内隐藏着的魅力，很快就成为了娼馆的头牌之一。`,
        );
        await era.printAndWait(
          `在充斥着淫靡气氛的娼馆中，幼小的身体每天都侍奉着各式各样的客人。`,
        );
        await era.printAndWait(
          `虽然说娼妓可以被人赎身，不过那大概也只是被买回去当成专属的性奴隶吧。`,
        );
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        );
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      } else {
        await era.printAndWait(`就这样，${target_name}被卖给了商人当做女仆。`);
        await era.printAndWait(
          `被带走时，${target_name}一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `原本是公主的她，对杂物活之类的与其说是不擅长，不如说是完全不会做。`,
        );
        await era.printAndWait(`但是慢慢做的多了的话，也有点像模像样的了。`);
        await era.printAndWait(`除了要干杂活，也常常被主人给侵犯。`);
        await era.printAndWait(
          `过着这样的生活的她，大概常常会在哪个角落里掉眼泪吧。`,
        );
        await era.printAndWait(
          `话说回来，区区人类对魔王抱有恋慕什么的真是可笑。`,
        );
        await era.printAndWait(
          `虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      }
    } else if (era.get(`mark:${target}:3`) == 3) {
      await era.printAndWait(
        `被卖掉的${target_name}，含着眼泪用怨恨的目光看着你。`,
      );
      await era.printAndWait(`「像你这样子的坏人，一，一定会有报应的！」`);
      await era.printAndWait(`连虫子都害怕的小鬼说什么傻话呢。`);
      await era.printAndWait(`这么想着的${master_name}，头也不回的转身走了。`);
      await era.printAndWait(
        `于是${master_name}与${target_name}再也没有见过面………`,
      );
    } else if (era.get(`talent:${target}:76`)) {
      if (sale_price >= 1000000) {
        await era.printAndWait(`就这样，${target_name}被卖给了魔族的大将。`);
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `即使在魔族里也是拥有着强悍肉体的大将，拥有着非人的庞大兽欲。`,
        );
        await era.printAndWait(
          `虽然是这样，但明明还是个小孩子的她却能将其全部承受下来，这大概是因为长期被你调教的缘故吧。`,
        );
        await era.printAndWait(
          `每天都被大将侵犯着她，每天都被灌满浓稠的精液。`,
        );
        await era.printAndWait(
          `就这样，作为大将的宠姬的${target_name}，沉溺于H的快乐中，意外的过着“幸福”的生活。`,
        );
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      } else if (sale_price >= 500000) {
        await era.printAndWait(`就这样，${target_name}被卖给了魔界的艺术家。`);
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `在魔界的贵族中相当有名的艺术家，所需要的素材自然也是最顶级的。`,
        );
        await era.printAndWait(
          `作为原公主的完美的幼体对他来说自然是上等的素材。`,
        );
        await era.printAndWait(`听说以她为模特，画出了不少相当高价的作品。`);
        await era.printAndWait(`当然，和作为艺术家的那个人的H自然是少不了的。`);
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      } else if (sale_price >= 100000) {
        await era.printAndWait(`就这样，${target_name}被卖给了魔王城的娼馆。`);
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `像这样被调教好的人类幼女即使魔界也是很少见的，更不用说是被魔王玩弄过的。`,
        );
        await era.printAndWait(
          `虽然还是个孩子，但却积极的侍奉着客人，很快就成为了娼馆的头牌之一。`,
        );
        await era.printAndWait(
          `在充斥着淫靡气氛的娼馆中，幼小的身体每天都侍奉着各式各样的客人。`,
        );
        await era.printAndWait(
          `虽然说是被卖过去的，但实际上似乎很乐意过着这样的生活。`,
        );
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      } else {
        await era.printAndWait(`就这样，${target_name}被卖给了奴隶主。`);
        await era.printAndWait(
          `被带走时，${target_name}有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。`,
        );
        await era.printAndWait(`……`);
        await era.printAndWait(
          `在被奴隶主亲自享用过一番后，作为手下人泄欲的工具，每晚都被男人们轮奸着。`,
        );
        await era.printAndWait(
          `沉浸在被侵犯的快感中的她，大概到死为止都会被不停的侵犯着吧。`,
        );
        await era.printAndWait(
          `不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。`,
        );
        await era.printAndWait(
          `于是${master_name}与${target_name}再也没有见过面………`,
        );
      }
    } else {
      await era.printAndWait(`「呜呜……好想……好想回家……」`);
      await era.printAndWait(`被装在囚车里拉走的她，一路上都不停的抽泣着。`);
      await era.printAndWait(
        `被当做普通的奴隶卖掉的${target_name}，就这样子消失在了黑暗的世界之中。`,
      );
    }
  }

  if (game.train.初吻与自我口上 == 11) {
    if (chara(target).kojo.妊娠发觉 == 0) {
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      chara(target).kojo.妊娠发觉 = 1;
    } else {
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      chara(target).kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 12) {
    if (chara(target).kojo.生产 == 0) {
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      chara(target).kojo.生产 = 1;
    } else {
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      chara(target).kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 == 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (!era.get(`talent:${target}:153`)) {
        if (era.get(`talent:${target}:154`)) {
          await era.printAndWait(`「要健康的成长起来哦……」`);
        }
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    chara(target).kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 == 14) {
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    chara(target).kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 == 999) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「对不起……主人……明明想要……一直……呆在主人身边的……对不起……对不起……」`,
      );
      await era.printAndWait(
        `怀中的幼女抽泣的声音渐渐的小了，从那上面再也感受不到活物的气息了。`,
      );
    } else {
      await era.printAndWait(`「好冷……身体……好冷……的说……」`);
      await era.printAndWait(
        `小小的身体渐渐的僵硬了，从那上面再也感受不到活物的气息了。`,
      );
    }
  }

  if (game.train.初吻与自我口上 == 998) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「诶嘿嘿……能这样子……陪伴着主人渡过一生……${sc()}……已经很满足了呢……」`,
      );
      await era.printAndWait(
        `「不能一直呆在主人身边……对不起……如果有来生……的……话……」`,
      );
    } else {
      await era.printAndWait(
        `「啊啊……如果下次……能出生在一个没有战乱的世界……」`,
      );
    }
  }

  // TFLAG:13  = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// @dungeon_ryouzyoku_k904
async function dungeon_ryouzyoku_k904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  await era.printAndWait(`「不，不要……好痛……放开我……！」`);

  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「你们要干嘛……呜呜……求求你们……不要啊……！」`);
    await era.printAndWait(
      `不知道将要发生什么的${target_name}被强行按倒在地上……`,
    );
  } else {
    await era.printAndWait(`「讨厌……那种事情……讨厌～～！」`);
    await era.printAndWait(
      `被按在地上的${target_name}拼尽全力的抵抗着，但在力量的差距面前毫无用途……`,
    );
  }

  return 0;
}

// @dungeon_ryouzyoku_after_k904
async function dungeon_ryouzyoku_after_k904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  if (era.get(`talent:${target}:0`) == 1) {
    await era.printAndWait(`「呜呜……这种事……讨厌……」`);
    await era.printAndWait(`虽然还保留着处女，但是仍然被凌辱了一番。`);
    await era.printAndWait(`${target_name}缩在角落里抽泣个不停。`);

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「呜呜……屁股被……做了那种事……」`);
      await era.printAndWait(`「肚子里面……好难受……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「这样就……可以了吧……嘴巴好酸哦……」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「咳咳……好奇怪的……味道……」`);
      await era.printAndWait(
        `${target_name}轻轻咳嗽着，吐出嘴里白黏黏的液体。`,
      );
    }
  } else {
    await era.printAndWait(`「呜……又被……玷污了……被这些怪物给……」`);
    await era.printAndWait(
      `一身狼藉的${target_name}倒在地上，眼泪不断的涌出来。`,
    );

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「啊啊……肚子……已经……装……装不下了……」`);
      await era.printAndWait(`幼小的洞口里，精液慢慢的流了出来。`);
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「呜呜……屁股被……做了那种事……」`);
      await era.printAndWait(`「肚子里面……好难受……」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「这样就……可以了吧……嘴巴好酸哦……」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「咳咳……好奇怪的……味道……」`);
      await era.printAndWait(
        `${target_name}轻轻咳嗽着，吐出嘴里白黏黏的液体。`,
      );
    }
  }

  return 0;
}

// @benki_koujo_k904
async function benki_koujo_k904() {
  const target = era_flag.target;
  const a = target; // 原作 A：当前处理角色
  const sc = (cid = target) => self_call(cid);
  if (game.train.肉便器行动 == 0) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「呼啊啊……肉棒……有好多呢……好开心……诶嘿❤」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「呜呜……不要……主人……${sc()}会好好听话的……这种事情不要……${sc()}只想和主人……呜～」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「虽然……这种事情很讨厌……但是主人的命令的话……」`);
    } else {
      await era.printAndWait(
        `「对不起……对不起……请原谅${sc()}……呜呜……这种事……不要……不要啊……」`,
      );
    }
  } else if (game.train.肉便器行动 == 1) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「呼啊啊……姐姐大人……嗯……请更多的使用${sc()}的身体吧……❤」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「呜……姐姐……这样子……呀……不，不行……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「呜嗯……侍奉……会好好做的……」`);
    } else {
      await era.printAndWait(`「呜……这种事情……呀……好复杂的……感觉……」`);
    }
  } else if (game.train.肉便器行动 == 2) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「汪汪～肉棒，嗯～好舒服～～还想要更多一点……汪❤」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「呜……是因为主人才……本来这种事情……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「就，就算是怪物……也……也会好好地……侍奉的……」`);
    } else {
      await era.printAndWait(`「呼诶诶诶，要和怪物什么的……好，好讨厌呜呜……」`);
    }
  } else if (game.train.肉便器行动 == 3) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「呼啊啊，两边都被灌的满满的呢……诶嘿嘿，作为肉便器是当然的吧❤」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(
        `「哈啊……哈啊……两边都……呜呜……主人……请原谅${sc()}吧……」`,
      );
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(`「呜……哈啊……肚子里……已经……装不下了啦……」`);
    } else {
      await era.printAndWait(`「呜……要……要坏掉了……啦……」`);
    }
  } else if (game.train.肉便器行动 == 4) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(
        `「诶嘿嘿……还不够呢……${sc()}的小穴……还想要更多的精液的说❤」`,
      );
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「肚子里面……主人以外的精液……呜呜……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「嗯呜……会好好侍奉的……还没有满足的话……就请……尽情的……继续使用吧……」`,
      );
    } else {
      await era.printAndWait(`「啊啊……肚子里面……被灌的满满的……」`);
    }
  } else if (game.train.肉便器行动 == 5) {
    if (era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait(`「屁股的话……因为很舒服，所以请更多的使用吧❤」`);
    } else if (era.get(`talent:${a}:85`)) {
      await era.printAndWait(`「身体……被主人以外的人使用了……就算是后面也……」`);
    } else if (era.get(`abl:${a}:16`) >= 5) {
      await era.printAndWait(
        `「呜嗯……${sc()}会……好好侍奉的……所以${sc()}的身体……那个……请用到满足为止吧……」`,
      );
    } else {
      await era.printAndWait(`「啊啊……肚子里面……被灌的满满的……」`);
    }
  }

  return 0;
}

// @dungeon_victory_k904
async function dungeon_victory_k904(rand) {
  const target = era_flag.target;
  const a = target; // 原作 A：当前战斗角色
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (era.get(`talent:${a}:76`) == 1) {
    await era.printAndWait(`「诶嘿嘿，看来勇者桑还要继续加油才行呢❤」`);
    await era.print('');

    if (rand_n(2) == 0) {
      await era.printAndWait(`「这样子的话……呐呐，来做点有趣的事怎么样～？」`);
    } else {
      await era.printAndWait(
        `「呜～要不是为了和魔王大人做舒服的事情，才不想来这里呢～」`,
      );
    }

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      await era.printAndWait(`「讨厌……死掉什么的听起来就很难受呢……」`);
    } else {
      await era.printAndWait(`「好，回去吧～～♪」`);
    }
  } else if (era.get(`talent:${a}:85`) == 1) {
    await era.printAndWait(`「这，这样子的话……那个……算是${sc()}……赢了吧……？」`);
    await era.print('');

    if (rand_n(2) == 0) {
      await era.printAndWait(
        `「虽然不喜欢这种事，但是为了魔王大人，${sc()}会加油的！」`,
      );
    } else {
      await era.printAndWait(`「那个……你，你还好吧……？」`);
    }

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      await era.printAndWait(`「哈呜呜……不过……还以为已经不行了的说……」`);
    } else {
      await era.printAndWait(
        `「对，对不起……但是这种程度的话……对于魔王大人来说……」`,
      );
    }
  } else {
    await era.printAndWait(`「什么时候……才能回家呢……」`);
    await era.print('');

    if (rand_n(2)) {
      await era.printAndWait(
        `「对不起……${sc()}……呜呜……${sc()}也不想这样的……」`,
      );
    } else {
      await era.printAndWait(`「这种事，明明不应该发生的说……」`);
    }

    if (
      (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
      (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
    ) {
      await era.printAndWait(`「差点就死掉了呜呜……」`);
    } else {
      await era.printAndWait(
        `「虽然这次运气好……但是下次的话……要怎么办才好呢……」`,
      );
    }
  }

  return 0;
}

// @dungeon_attack_k904
async function dungeon_attack_k904(rand) {
  const target = era_flag.target;
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (chara(target).invasion.状态 == 2) {
    if (rand_n(3) == 0) {
      await era.printAndWait(`「请，请住手吧！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「不要过来～～！」`);
    } else {
      await era.printAndWait(`「对不起！」`);
    }
  } else {
    if (era.get(`talent:${target}:76`) && rand_n(2) == 0) {
      await era.printAndWait(`「为了做舒服的事情所以抱歉呐，勇者姐姐～」`);
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「诶嘿嘿～～❤」`);
    } else if (era.get(`talent:${target}:85`) && rand_n(2) == 0) {
      await era.printAndWait(
        `「为了魔王大人……${sc()}什么都会去做的……！就，就算这种事情……也……也……」`,
      );
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「对不起……勇者姐姐……但是，请，请回去吧……！」`);
    } else if (rand_n(2) == 0) {
      await era.printAndWait(`「呜呜，勇者姐姐……抱歉了……！」`);
    } else {
      await era.printAndWait(`「对不起……这种事……对不起……」`);
    }
  }

  return 0;
}

// @colosseum_kojo_904
async function colosseum_kojo_904() {
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const assi_name = chara_callname(era_flag.assi); // %SAVESTR:ASSI%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  // 死斗场 SC31/21/27 三处同型的武器名（源 :6161-:6164、:6194-:6197、
  // ）：TALENT:ASSI:121/122 有则「阴茎」/「肉棒」，否则持假阴茎
  // （ITEM:PBAND = ITEM:4）时补「假阴茎」，两段都不出时为空串（#625）
  const assi_has_penis =
    era.get(`talent:${assi}:121`) == 1 || era.get(`talent:${assi}:122`) == 1;
  const assi_has_toy = era0(`item:${PBAND}`) == 1;

  if (era_flag.selectcom == 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}连站起来的力气都没有了……`);
    } else {
      await era.printAndWait(
        `${target_name}因为死斗场的热情氛围，看着即将要对战的对手颤抖着……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「咦…咦…不、不要了………啊啊啊啊……」`);
        await era.printAndWait(`用尽力气的${target_name}坐着哭了……`);
      } else {
        await era.printAndWait(`「不要不要…不要过来啊…！」`);
        await era.printAndWait(`用尽力气的${target_name}坐着哭了……`);
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「不、不要啊…怎么可能赢过勇者大人啊……」`);
        await era.printAndWait(
          `${target_name}因为${master_name}的命令武装了起来，看见${assi_name}之后好像马上就要大哭起来了……`,
        );
      } else {
        await era.printAndWait(
          `「救、救救我…主人大人…我、我什么坏事都没做啊……」`,
        );
        await era.printAndWait(
          `${target_name}看着丑陋的怪物们向${master_name}寻求帮助……`,
        );
      }
    }
    return 0;
  }

  if (era_flag.selectcom == 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「啊唔…我、我会好好舔的…不要做很痛的事……嗯咕……」`,
      );
      // 原作是一整行：无后缀 PRINTFORM/PRINT 连续
      // 不换行，末行 PRINTFORMW 才收行。:6161/:6163 两条 SIF 互斥——判据提到
      // 语句外当取值（assi_has_penis/assi_has_toy），文本留在输出语句里（#625）
      await era.printAndWait(
        `${assi_name}因为` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阴茎' : '') +
          `被${target_name}含住而露出了快乐的的表情……`,
      );
    } else {
      await era.printAndWait(`「啊啊…嗯咕…嗯唔…咳咳…呕呕……」`);
      await era.printAndWait(`${target_name}舔着发出令人作呕的气味的阴茎……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不…不要啊…勇者的姐姐…啊啊！」`);
      await era.printAndWait(`${target_name}就那样被${assi_name}玩弄着……`);
    } else {
      await era.printAndWait(`「啊啊…快离开啊…啊啊…好、好痛…！」`);
      await era.printAndWait(
        `${target_name}因为胸部被大力的揉弄而发出了痛苦的声音……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom == 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不要不要…太过分了…不要了啊…啊啊！」`);
      // 同 :6160 组的一整行（#625）
      await era.printAndWait(
        `${assi_name}一边听着悲鸣，一边用` +
          (assi_has_penis ? '肉棒' : assi_has_toy ? '假阴茎' : '') +
          `毫不留情的继续蹂躏着${target_name}的腔内……`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「噶…噶啊…咕…咕哦哦哦……」`);
      await era.printAndWait(
        `可怜的${target_name}发出被踩死的青蛙一样的声音，就那样继续被巨魔玩弄着……`,
      );
    } else {
      await era.printAndWait(`「咦…咦…要坏掉了要坏掉了啊！」`);
      await era.printAndWait(`${target_name}就那样被怪物侵犯着……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「不要不要…不是插进哪里啊…不要了啊…啊啊！」`);
      // 同 :6160 组的一整行（#625）
      await era.printAndWait(
        `${assi_name}一边听着悲鸣，一边用` +
          (assi_has_penis ? '肉棒' : assi_has_toy ? '假阴茎' : '') +
          `毫不留情的继续蹂躏着${target_name}的肛门……`,
      );
    } else if (game.train.死斗场敌种 == 206) {
      await era.printAndWait(`「噶…噶啊…咕…咕哦哦哦……」`);
      await era.printAndWait(
        `可怜的${target_name}发出被踩死的青蛙一样的声音，就那样继续被巨魔玩弄着……`,
      );
    } else {
      await era.printAndWait(`「咦…咦…屁股…屁股要裂开了啊啊啊啊！」`);
      await era.printAndWait(`${target_name}就那样被怪物侵犯着肛门……`);
    }
    return 0;
  }

  if (era_flag.selectcom == 51) {
    await era.printAndWait(`「啊啊…身、身体好热…啊啊…！」`);
    return 0;
  }

  return 0;
}

// @ntr_koujo_k904
async function ntr_koujo_k904(p) {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const master_name = chara_callname(0); // %SAVESTR:MASTER%
  if (chara(target).kojo.NTR再捕获 == 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    chara(target).kojo.NTR再捕获 = 1;
  }

  if (p == 1) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「不，不要……！第一次明明……明明要给魔王大人的说……！」`,
      );
    } else {
      await era.printAndWait(`「讨厌……好痛……不要……求求你～不要～～！」`);
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    chara(target).kojo.NTR_651 = 1;
  } else if (p == 2) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「求求你……呜呜……屁股……快要裂开来了……狂王大人……好难受……的说……」`,
      );
    } else {
      await era.printAndWait(`「好痛……好难受……不要……」`);
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    chara(target).kojo.NTR_652 = 1;
  } else if (p == 3) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「呜呜，这种事，不要，不要看～～不要看呜啊啊啊啊～～～」`,
      );
    } else {
      await era.printAndWait(`「为什么……要做这么过分的事情……求求你……不要……」`);
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    chara(target).kojo.NTR_653 = 1;
  } else if (p == 4) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「呜……哈啊……呀……哈呜呜……魔王……大人……呜呜……对，对不起…………」`,
      );
      await era.printAndWait(
        `${target_name}抽泣着，小声的念着${master_name}的名字。`,
      );
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「嗯哈……❤肉棒……呜呜，好舒服……❤」`);
      await era.printAndWait(`「只要有肉棒……不管在哪里都可以呢❤」`);
    } else {
      await era.printAndWait(`「哈呜呜……呀……不……要……呜呜～～」`);
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    chara(target).kojo.NTR_654 = 1;
  } else if (p == 5) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「呜……哈啊……呀……求求你们……呀……不……不要……！」`);
      await era.printAndWait(`「魔王大人……魔王大人……呜呜……」`);
      await era.printAndWait(`豆大的眼泪不断的从小脸上滑落下来。`);
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「嗯呜～呀～～哈啊啊～～❤」`);
      await era.printAndWait(`「肉棒……呜……两边都……嗯哈～❤塞得满满的～～❤」`);
      await era.printAndWait(`「好厉害～～舒服的要，要死掉了啦～～❤」`);
    } else {
      await era.printAndWait(`「啊呜呜……哈啊……嘎哈……不……呜……不……要……」`);
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    chara(target).kojo.NTR_655 = 1;
  } else if (p == 6) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「如果……魔王大人在这里的话……呜……魔王大人……」`);
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「啊哈……❤肉棒，肉棒有好多呢～好开心～～❤」`);
    } else {
      await era.printAndWait(`「呜呜……这种事……不要了啦……好想回家……」`);
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    chara(target).kojo.NTR_656 = 1;
  } else if (p == 7) {
    if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(
        `「哈啊～～❤狂王大人的肉棒……好厉害，在肚子里面咕啾咕啾的抽送着呢❤」`,
      );
      await era.printAndWait(
        `「魔王大人和狂王大人的肉棒，哪边更舒服已经分不清楚了啦～～❤」`,
      );
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「咕……哈啊啊……呜呀……要坏掉了，肚子，要坏掉了呜呜～～！」`,
      );
      await era.printAndWait(
        `狂王惊人的尺寸粗暴的在小小的身体里肆虐着，仿佛要将她弄坏掉一样。`,
      );
      await era.printAndWait(`「对不起……魔王大人……对不起……」`);
    } else {
      await era.printAndWait(
        `「狂，狂王大人……呜呜……求求你……温柔一点……呜呜……」`,
      );
      await era.printAndWait(`「肚子里面……呜呜……好，好难受……」`);
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    chara(target).kojo.NTR_657 = 1;
  }
  return 0;
}

// @exucution_koujo_k904
async function exucution_koujo_k904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (game.event.犬射精或处刑口上 == 4) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
      );
    }
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.犬射精或处刑口上 == 5) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「如，如果这是魔王大人的要求……${sc()}……很，很荣幸……的说……」`,
      );
    }
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.犬射精或处刑口上 == 6) {
    await era.printAndWait('');
  } else if (game.event.犬射精或处刑口上 == 7) {
    await era.printAndWait('');
  }
}

// @museum_koujo_k904
async function museum_koujo_k904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (era.get(`talent:${target}:85`)) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
  }
  await era.printAndWait(
    `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
  );

  return 0;

  if (game.event.博物馆口上 == 0) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 1) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 2) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 3) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 4) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 5) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 6) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 7) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 8) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.博物馆口上 == 9) {
    await era.printAndWait(
      `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
    );
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  }
}

// @banishment_koujo_k904
async function banishment_koujo_k904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (game.event.流放口上 == 0) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「不要……！${sc()}只想……只想呆在魔王大人的身边，明明只想这样子的说……！」`,
      );
      await era.printAndWait(
        `「不管被做什么也好，不管魔王大人有怎么样的要求也好……${sc()}都……都……」`,
      );
      await era.printAndWait(`「求求你……求求你……不要……赶${sc()}走……」`);
      await era.printAndWait(
        `稚气的声音大声的哭喊着，比以往任何时候都要强烈。`,
      );
      await era.printAndWait(`不过在你的眼中，不过只是区区一个人类而已。`);
      await era.printAndWait(`玩腻了的玩具什么的，就丢掉吧。`);
    } else {
      await era.printAndWait(`「终于……可以回家了吗……啊啊……」`);
      await era.printAndWait(
        `望着曾经的家乡，${target_name}的眼泪沿着脸颊滑落下来。`,
      );
    }
  } else if (game.event.流放口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.流放口上 == 3) {
    await era.printAndWait('');
  }
}

// @PUBLIC_exucution_koujo_k904
async function public_exucution_koujo_k904() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const sc = (cid = target) => self_call(cid);
  if (game.event.公开处刑口上 == 0) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「如，如果这样能取悦魔王大人的话……身体不管变成什么样……${sc()}都……都会……努力……」`,
      );
    }
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.公开处刑口上 == 1) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」`,
      );
    }
    await era.printAndWait(
      `${target_name}深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。`,
    );
  } else if (game.event.公开处刑口上 == 2) {
    await era.printAndWait('');
  }
}

// @grotesque_koujo_k904
async function grotesque_koujo_k904() {
  if (game.event.猎奇处刑口上 == 0) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 1) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 2) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 3) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 4) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 5) {
    await era.printAndWait('');
  } else if (game.event.猎奇处刑口上 == 6) {
    await era.printAndWait('');
  }
}

// @enterenemy_koujo_k904
async function enterenemy_koujo_k904() {
  const a = era_flag.target; // 原作 A：进入敌阵的角色
  if (era.get(`talent:${a}:76`)) {
    await era.printAndWait(
      `「啊～～被击败以后会被怎样侵犯呢，有点期待呢～～❤」`,
    );
  } else if (era.get(`talent:${a}:85`)) {
    await era.printAndWait(`「这也是为了再见到魔王大人……」`);
  } else {
    await era.printAndWait(`「虽然很讨厌……但是……呜呜……不做的话……不行吗……」`);
  }
}

// @gohoubi_request_koujo_k904
async function gohoubi_request_koujo_k904() {
  const target = era_flag.target;
  const a = target; // 原作 A：请求奖赏的角色
  const sc = (cid = target) => self_call(cid);
  if (chara(a).stronghold.要求奖赏 == 0) {
    await era.printAndWait('');
  } else if (
    chara(a).stronghold.要求奖赏 == 1 ||
    chara(a).stronghold.要求奖赏 == 2 ||
    chara(a).stronghold.要求奖赏 == 3
  ) {
    // 原作是一整行：:6525 的 PRINTFORM 与
    // 的 PRINTFORMW 参数都是空串，中间是 IF/ELSEIF 三档兽名——合并成
    // 一条 printAndWait 只输出兽名（#625）
    const beast_word =
      chara(a).stronghold.要求奖赏 == 1
        ? '犬'
        : chara(a).stronghold.要求奖赏 == 2
          ? '豚'
          : '马';
    await era.printAndWait(beast_word);
  } else if (chara(a).stronghold.要求奖赏 == 4) {
    await era.printAndWait(`「那个……魔王大人的……kiss……可以咩……？」`);
  } else if (chara(a).stronghold.要求奖赏 == 5) {
    await era.printAndWait(`「想和魔王大人……做舒服的事情呢……」`);
  } else if (chara(a).stronghold.要求奖赏 == 6) {
    await era.printAndWait('');
  } else if (chara(a).stronghold.要求奖赏 == 7) {
    await era.printAndWait(`「那～${sc()}要好多好多的肉棒和精液牛奶～～❤」`);
  } else if (chara(a).stronghold.要求奖赏 == 8) {
    await era.printAndWait('');
  } else if (chara(a).stronghold.要求奖赏 == 9) {
    await era.printAndWait('');
  }
}

// @gohoubi_after_koujo_k904
async function gohoubi_after_koujo_k904(rand, cid, choice) {
  void rand;
  void cid;
  void choice;
  const target = era_flag.target;
  const a = target; // 原作 A：接受奖赏的角色
  const sc = (cid = target) => self_call(cid);
  if (game.dungeon.足交射精或处遇口上 == 0) {
    await era.printAndWait('');
  } else if (game.dungeon.足交射精或处遇口上 == 1) {
    await era.printAndWait(
      `「唔……比起这个……还是更喜欢和魔王大人做舒服的事情～❤」`,
    );

    await era.printAndWait(`「为了魔王大人……${sc()}什么事情都会努力的……！」`);
  } else if (game.dungeon.足交射精或处遇口上 == 2) {
    if (chara(a).stronghold.要求奖赏 == 0) {
      await era.printAndWait(
        `「这种东西……${sc()}只要呆在魔王大人身边就已经很满足了呢……」`,
      );
    } else if (chara(a).stronghold.要求奖赏 == 1) {
      await era.printAndWait(`「要和狗狗H吗～嗯～～❤」`);
    } else if (chara(a).stronghold.要求奖赏 == 2) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else if (chara(a).stronghold.要求奖赏 == 3) {
      if (era.get(`talent:${a}:0`) == 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    } else if (chara(a).stronghold.要求奖赏 == 4) {
      await era.printAndWait(`「嗯……啾哈……魔王大人的kiss……嗯……最喜欢了……❤」`);
    } else if (chara(a).stronghold.要求奖赏 == 5) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait(
          `「呼啊啊……主人的……魔王大人的肉棒……在肚子里面……嗯呀～～❤」`,
        );
      } else {
        await era.printAndWait(
          `「呼啊啊……主人的……魔王大人的肉棒……在屁股里……嗯呀～～❤」`,
        );
      }
    } else if (chara(a).stronghold.要求奖赏 == 6) {
      await era.printAndWait('');
    } else if (chara(a).stronghold.要求奖赏 == 7) {
      await era.printAndWait(`「呜呜～肚子里面，已经，已经装不下了啦～～❤」`);
    } else if (chara(a).stronghold.要求奖赏 == 8) {
      await era.printAndWait('');
    } else if (chara(a).stronghold.要求奖赏 == 9) {
      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
    }
  }
}

// @osioki_koujo_k904
async function osioki_koujo_k904(rand, cid, choice) {
  void rand;
  void cid;
  void choice;
  const a = era_flag.target; // 原作 A：受处罚的角色
  if (game.dungeon.足交射精或处遇口上 == 0) {
    await era.printAndWait('');
  } else if (game.dungeon.足交射精或处遇口上 == 1) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 2) {
    if (era.get(`abl:${a}:17`) >= 4) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 3) {
    if (era.get(`abl:${a}:17`) >= 6) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 4) {
    if (era.get(`abl:${a}:21`) >= 3) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 5) {
    if (era.get(`talent:${a}:88`) == 1 || era.get(`talent:${a}:76`) == 1) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.dungeon.足交射精或处遇口上 == 6) {
    await era.printAndWait('');
  } else if (game.dungeon.足交射精或处遇口上 == 7) {
    await era.printAndWait('');
  } else if (game.dungeon.足交射精或处遇口上 == 8) {
    await era.printAndWait('');
  } else if (game.dungeon.足交射精或处遇口上 == 9) {
    await era.printAndWait('');
  }
}

// @gobi_koujo_k904, ARG:0
function gobi_koujo_k904(arg0, rand) {
  const target = era_flag.target;
  const sc = (cid = target) => self_call(cid);
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  if (arg0 == 1) {
    return `，诶嘿嘿～♪`;
  } else if (arg0 == 2) {
    return `，呜～～${sc()}要咬人了的说～～`;
  } else if (arg0 == 3) {
    return `哈呜呜……`;
  } else if (arg0 == 4) {
    return `呜……\\/\\/\\/\\/`;
  } else if (arg0 == 5) {
    return '';
  } else {
    if (rand_n(3) == 0) {
      return '';
    } else if (rand_n(2) == 0) {
      return '';
    } else {
      return '';
    }
  }
}

ryouzyoku_kojo_family.register(904, dungeon_ryouzyoku_k904);
ryouzyoku_after_kojo_family.register(904, dungeon_ryouzyoku_after_k904);
benki_koujo_family.register(904, benki_koujo_k904);
dungeon_victory_family.register(904, dungeon_victory_k904);
dungeon_attack_family.register(904, dungeon_attack_k904);
ntr_koujo_family.register(904, adapt_legacy_ntr_koujo(ntr_koujo_k904));
exucution_koujo_family.register(904, exucution_koujo_k904);
museum_koujo_family.register(904, museum_koujo_k904);
banishment_koujo_family.register(904, banishment_koujo_k904);
public_exucution_koujo_family.register(904, public_exucution_koujo_k904);
grotesque_koujo_family.register(904, grotesque_koujo_k904);
enterenemy_koujo_family.register(904, enterenemy_koujo_k904);
gohoubi_request_koujo_family.register(904, gohoubi_request_koujo_k904);
gohoubi_after_koujo_family.register(904, (cid, choice) =>
  gohoubi_after_koujo_k904(undefined, cid, choice),
);
osioski_koujo_family.register(904, (cid, choice) =>
  osioki_koujo_k904(undefined, cid, choice),
);
gobi_koujo_family.register(904, gobi_koujo_k904);
kojo_message_com_family.register(904, kojo_message_com_904);
kojo_message_palamcng_family.register(904, kojo_message_palamcng_904);
kojo_message_markcng_family.register(904, kojo_message_markcng_904);
self_kojo_family.register(904, self_kojo_k904);

// #625：死斗场接口 @COLOSSEUM_KOJO_904 的调用点在 KOJO_MESSAGE_COM 的
// `SIF ASSI > 0 && ASSIPLAY → RETURN 0` 之后，运行时不带助手才走到它；助手臂
// 按 1:1 保留，导出只为行为测试能直达这具真身（同 K2/K4/K903）。
module.exports = { colosseum_kojo_904 };
