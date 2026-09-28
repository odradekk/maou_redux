/**
 * @file 懦弱性格口上 K2（issue #233）。
 *
 * 转译初稿 products/kojo/kojo-k2-timid.js（#107）经逐段复核后移入。
 *
 * == 状态机（CFLAG 301～400，指令执行时的台词计数） ==
 *
 * 各 SELECTCOM 分支按「初めて → 淫乱(76) → 爱慕(85) → 刻印/顺从分档 →
 * それ以外」取首个命中；FLAG:7 == 2（默认）时 CFLAG 上限被旁路、同支
 * 每次出声；FLAG:7 == 1 时逐阶段各出一次声。
 *
 * SELL_MATURO_K0 成熟出售真身已随 #338 接通。DOG_KOJO_2 有真身但 COM
 * 头部检查是静默跳过，
 * 与 K5 同款、不调专用口上。
 */

const era = require('#/era-electron');
const { sell_maturo_k0 } = require('#/system/stronghold/sell-maturo');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const {
  banishment_koujo_family,
  benki_koujo_family,
  dungeon_attack_family,
  dungeon_victory_family,
  enterenemy_koujo_family,
  exucution_koujo_family,
  gobi_koujo_family,
  grotesque_koujo_family,
  kojo_message_com_family,
  kojo_message_markcng_family,
  kojo_message_palamcng_family,
  museum_koujo_family,
  ntr_koujo_family,
  public_exucution_koujo_family,
  self_kojo_family,
} = require('#/kojo/kojo-system');
const {
  gohoubi_after_koujo_family,
  gohoubi_request_koujo_family,
  osioski_koujo_family,
} = require('#/kojo/kojo-dungeon-after');
const {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
} = require('#/kojo/kojo-dungeon-ravish');
const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { PALAMLV } = require('#/era-utils/palam-level');
const { peek_aftertrain_q } = require('#/event/event-aftertrain');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

/**
 * 口上函数共用的读取面：随机源、当前角色名、自称、门面。
 * @param {(n: number) => number} [rand]
 */
function bind_ctx(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const assi = era_flag.assi;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const assi_name = assi >= 0 ? chara_callname(assi) : ''; // %SAVESTR:ASSI%
  const master_name = chara_name(0); // %NAME:MASTER%
  const sc = () => self_call(target); // %SELF_CALL(TARGET)%
  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%
  const view = chara(target);
  const kojo = view.kojo;
  return {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    master_name,
    sc,
    scf,
    view,
    kojo,
  };
}

// EVENTTRAIN #PRI 档：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_2 = 1; // FLAG:102 = 1（K2 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;
    }
  },
  TIER.PRI,
);

// EVENTEND #LATER 档：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_2 = 0;
  },
  TIER.LATER,
);

// eventtrain_k2：EVENTTRAIN NORMAL 档
async function eventtrain_k2(rand) {
  const {
    rand_n,
    target,
    assi,
    target_name,
    player_name,
    assi_name,
    sc,
    kojo,
  } = bind_ctx(rand);

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:162`) !== 1) {
    return 0;
  }

  if (kojo.初调教 === 0) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 1) {
      await era.printAndWait(`「拜托…谁来把我从这里拯救出去……」`);
      await era.printAndWait(
        `${target_name}蜷伏在地板上，精灵族特有的长耳朵微微颤抖着。`,
      );
      await era.printAndWait(
        `看到这小动物一般微微发抖的姿态，施虐之心也仿佛被唤醒了一样……`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 2) {
      await era.printAndWait(`「停下…不要…不可以这样……」`);
      await era.printAndWait(`人狼${target_name}被带来了。`);
      await era.printAndWait(`“母狗”就要像母狗一样地被对待啊……`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 3) {
      await era.printAndWait(`「${sc()}的力量在这里被封印了……」`);
      await era.printAndWait(
        `${target_name}唯一可以依靠的吸血鬼力量被封印住了，懦弱地抱着肩膀。`,
      );
      await era.printAndWait(`「喂，喂你！…不要过来…求你不要过来…」`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 4) {
      await era.printAndWait(`「呵呵…${sc()}你的冒险也就到此为止了……」`);
      await era.printAndWait(`像是接受命运一般，无头骑士娘抱着头呆坐在地上……`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 5) {
      await era.printAndWait(`「讨厌…已经…落到这个地步了吗……」`);
      await era.printAndWait(
        `天性软弱的${target_name}已经失去了身为龙族的抵抗意志，缩在床上的角落里。`,
      );
      await era.printAndWait(`「做什么都可以，求求你让我从这里出去吧……」`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 6) {
      await era.printAndWait(
        `「在这样的地底……${sc()}的祈祷根本无法传到天界啊……」`,
      );
      await era.printAndWait(
        `少女天使深深地叹了口气。${target_name}发觉到你走进房间后，发出了一阵悲鸣，原本可爱的脸庞也扭曲了起来。`,
      );
      await era.printAndWait(
        `让这张脸因为痛苦更加地扭曲？还是体会到极乐的欢喜呢？真是件头疼的事啊……`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「再一次？！我不想再次来到这里啊……」`);
      await era.printAndWait(
        `已经被魔族改造过一次的${target_name}，再次回到故地后陷入了绝望。`,
      );
      await era.printAndWait(`现在轮到身为魔王的你登场开始调教了。`);
      await era.printAndWait(`「啊啊…这样的话…干脆……」`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;

      // CFLAG:370  = 1（变量语义：CFLAG 族，370）
      kojo.魔族化 = 1;
    } else if (era.get(`talent:${target}:314`) === 10) {
      await era.printAndWait(`「明明当初有想过要折回去的……」`);
      await era.printAndWait(`娇小的霍比特人${target_name}啜泣着……`);
      await era.printAndWait(
        `要让你知道，敢于反抗魔王统治的后果是什么，小不点“勇者”……`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else if (era.get(`talent:${target}:314`) === 11) {
      await era.printAndWait(
        `「${sc()}一定有办法可以阻止这一切…可是…好可怕……」`,
      );
      await era.printAndWait(
        `怕到连话也说不清的矮人${target_name}身上，再也看不到当初的活泼可爱……`,
      );
      await era.printAndWait(`宽恕这种东西，并不存在于魔王这里呢……`);
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
    } else {
      await era.printAndWait(`「放过我…求求你放过我…」`);
      await era.printAndWait(
        `${target_name}被投入监牢后，嘴里不停重复这一句话。`,
      );
      await era.printAndWait(
        `被从这间牢房里带出来的时候，${target_name}啊，定要用肉体的欢愉和心灵上的刻印让你臣服，将你彻底变成属于魔王的东西……`,
      );
      // CFLAG:201  = 1（变量语义：CFLAG 族，201）
      kojo.初调教 = 1;
      return 1;
    }
  } else if (
    kojo.初调教 < 5 &&
    kojo.魔族化 === 0 &&
    era.get(`talent:${target}:314`) === 9 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    await era.printAndWait(`「${sc()}为什么……要这样对我……？」`);
    await era.printAndWait(
      `${target_name}被反复地调教后已经彻底地沦为魔族，在无尽的绝望中痛哭失声。`,
    );
    await era.printAndWait(
      `引导这些魔族的花苞绽放出邪媚的花朵可是身为魔王的职责呢。`,
    );
    await era.printAndWait(`「原来…${sc()}如此憎恨身为魔族的自己么……」`);

    // CFLAG:370  = 2（变量语义：CFLAG 族，370）
    kojo.魔族化 = 2;
    return 1;
  } else if (kojo.初调教 >= 1 && kojo.NTR再捕获 === 1) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      era.drawLine();
      await era.printAndWait(
        `将看了那水晶球的事告诉了${target_name}之后，她的脸色苍白了。`,
      );
      await era.printAndWait(
        `「请原谅我！请原谅我！…哇，${sc()}我…并没有背叛魔王大人的意思…！」`,
      );
      await era.printAndWait(
        `${target_name}苦苦地哀求着，看来经过这次事件后，${target_name}也该明白谁才是真正的主人……`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    } else {
      era.drawLine();
      await era.printAndWait(`「对不起…对不起…」`);
      await era.printAndWait(`似曾相识的台词，却直到今天才想到要道歉？`);
      await era.printAndWait(
        `不管如何，狂王和自己，究竟谁才是真正的主人？想必${target_name}也该明白了吧……`,
      );

      // CFLAG:650  = 0（变量语义：CFLAG 族，650）
      kojo.NTR再捕获 = 0;
    }
    return 1;
  } else if (kojo.初调教 < 2 && (era.get(`mark:${target}:2`) || 0) === 1) {
    era.drawLine();
    await era.printAndWait(`「那个，不、不可以！」`);
    // CFLAG:201  = 2（变量语义：CFLAG 族，201）
    kojo.初调教 = 2;
    return 1;
  } else if (kojo.初调教 < 3 && (era.get(`mark:${target}:2`) || 0) === 2) {
    era.drawLine();
    await era.printAndWait(`「不要……我不能」`);
    await era.printAndWait(`${target_name}象征性地反抗了一下……`);
    // CFLAG:201  = 3（变量语义：CFLAG 族，201）
    kojo.初调教 = 3;
    return 1;
  } else if (
    kojo.初调教 < 4 &&
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「请不要…弄疼我…」`);
    await era.printAndWait(`${target_name}弱气地向${player_name}请求着……`);
    // CFLAG:201  = 4（变量语义：CFLAG 族，201）
    kojo.初调教 = 4;
    return 1;
  } else if (
    kojo.初调教 < 5 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`talent:${target}:314`) !== 9
  ) {
    era.drawLine();
    await era.printAndWait(`「啊…魔王大人…${heart(1)}」`);
    await era.printAndWait(`${target_name}急不可耐地抱住了你。`);
    await era.printAndWait(
      `「喂喂…魔王大人…请快点给我……${sc()}…我已经等不及了…${heart(1)}」`,
    );
    await era.printAndWait(
      `淫乱的笑容浮上脸庞${target_name}一边撒娇般舔着${player_name}的脸庞一边用手搓揉起魔王的阴茎……`,
    );
    // CFLAG:201  = 5（变量语义：CFLAG 族，201）
    kojo.初调教 = 5;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) === 9 &&
    kojo.初调教 < 6 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 1
  ) {
    era.drawLine();

    if (kojo.魔族化 === 1) {
      await era.printAndWait(
        `${target_name}四脚爬爬，扭动着腰，用炽热的视线仰视着${player_name}的胯下。`,
      );
      await era.printAndWait(
        `「魔王大人…请让我来为您服务…今天也要射很多出来…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}彻底接受了身为魔族的命运，如今的${player_name}已经彻底沦为快感的奴隶。`,
      );
      await era.printAndWait(
        `「啊啊…${sc()}…现在好幸福…这就是身为奴隶的我…一直渴望的…${heart(1)}」`,
      );
      await era.printAndWait(
        `今后只要有你的许可，${target_name}随时都能使用了……`,
      );
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(
        `${target_name}四脚爬爬，扭动着腰，用炽热的视线仰视着${player_name}的胯下。`,
      );
      await era.printAndWait(
        `「魔王大人…请让我来为您服务…今天也要射很多出来…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}彻底接受了身为魔族的命运，如今的${player_name}已经彻底沦为快感的奴隶。`,
      );
      await era.printAndWait(
        `「啊啊…${sc()}…现在好幸福…这就是身为奴隶的我…一直渴望的…${heart(1)}」`,
      );
      await era.printAndWait(
        `今后只要有你的许可，${target_name}随时都能使用了……`,
      );
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    } else {
      await era.printAndWait(
        `${target_name}身为魔族仿佛脱胎换骨了一般，原本不安的脸只要能看见${player_name}，便焕发出光芒。`,
      );
      await era.printAndWait(`「啊…魔王…魔王大人好厉害……」`);
      await era.printAndWait(
        `${target_name}的臀部轻轻扭动着，双手在青色的光滑皮肤上慢慢游走。`,
      );
      await era.printAndWait(`「${sc()}…已经成为魔族了…嗯啊${heart(1)}」`);
      await era.printAndWait(
        `「魔王大人…今后也请让我一直侍奉着您，直到永远…${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}漆黑之翼包裹中的美妙身形缓缓下跪，亲吻着你的足铠……`,
      );
      // CFLAG:201  = 6（变量语义：CFLAG 族，201）
      kojo.初调教 = 6;
      return 1;
    }
  } else if (
    kojo.初调教 < 7 &&
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`talent:${target}:76`) === 0 &&
    era.get(`talent:${target}:314`) !== 9
  ) {
    era.drawLine();
    await era.printAndWait(
      `（原勇者的${sc()}…从当初的反抗…到如今彻底地奉献身心…）`,
    );
    await era.printAndWait(
      `「魔王大人…${sc()}今后会一直…遵从您的意志……${heart(1)}」`,
    );
    await era.printAndWait(`「请…为我刻上您最深的印记吧……${heart(1)}」`);
    await era.printAndWait(`${target_name}顺势跪下，亲吻着你的手……`);
    // CFLAG:201  = 7（变量语义：CFLAG 族，201）
    kojo.初调教 = 7;
    return 1;
  } else if (
    era.get(`talent:${target}:314`) === 9 &&
    kojo.初调教 < 8 &&
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();

    if (kojo.魔族化 === 1) {
      await era.printAndWait(
        `${target_name}像恋人一样紧紧依偎着魔王，双手紧紧地抱住${player_name}的背部，不肯松手。`,
      );
      await era.printAndWait(`「今后${sc()}…绝不会离开魔王大人的身边……」`);
      await era.printAndWait(
        `「只要能被魔王大人调教…怎样的事情都无所谓……${heart(1)}」`,
      );
      await era.printAndWait(
        `经过身为魔王的你调教后，迷茫的魔族${target_name}仿佛找到了最终的归宿一般。`,
      );
      await era.printAndWait(`「到这里来真是太好了…魔王大人啊${heart(1)}」`);
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else if (kojo.魔族化 === 2) {
      await era.printAndWait(
        `${target_name}像恋人一样紧紧依偎着魔王，双手紧紧地抱住${player_name}的背部，不肯松手。`,
      );
      await era.printAndWait(`「今后${sc()}…绝不会离开魔王大人的身边……」`);
      await era.printAndWait(
        `「啊啊…对魔王大人的爱意…就像这样…魔王大人的魔力已经彻底征服${sc()}的身体了呢……」`,
      );
      await era.printAndWait(
        `经过身为魔王的你调教后，仿佛终于找到了归宿一般。`,
      );
      await era.printAndWait(`${target_name}用湿润的魔族之眼深情地注视着你。`);
      await era.printAndWait(
        `「从今开始，我的身体和灵魂都是属于魔王大人您的了…${heart(1)}」`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    } else {
      await era.printAndWait(`「呀啊！这是什么～${heart(1)}」`);
      await era.printAndWait(
        `${target_name}因为感受到自身逐渐魔族化的喜悦显得有些紧张。`,
      );
      await era.printAndWait(
        `背部的翅膀不停张合，箭头形的尾巴欢喜得像狗一样左右摇摆。`,
      );
      await era.printAndWait(
        `「啊真是的…身为魔族，${heart(1)} 从今天起…也要请您多多关照呢${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}被漆黑之翼包裹中的美妙身形顺势下跪。`,
      );
      await era.printAndWait(
        `「……我便是魔王大人最卑微的奴仆，${target_name}请您随意使用我吧…${heart(1)}」`,
      );
      // CFLAG:201  = 8（变量语义：CFLAG 族，201）
      kojo.初调教 = 8;
      return 1;
    }
  } else if (era.get(`talent:${target}:9`) === 1 && kojo.初调教 < 9) {
    era.drawLine();
    await era.printAndWait(
      `「讨厌讨厌讨厌呀，可怕可怕可怕可怕…啊啊啊啊啊啊啊啊啊啊啊啊…甚至啊啊啊！」`,
    );
    await era.printAndWait(
      `${target_name}彻底崩溃了，${player_name}看着眼前之人发出一阵无意义的悲鸣。`,
    );
    await era.printAndWait(
      `${target_name}彻底崩坏的精神状况应该能恢复过来吧……`,
    );
    // CFLAG:201  = 9（变量语义：CFLAG 族，201）
    kojo.初调教 = 9;
    return 1;
  } else if (era_flag.assi < 0) {
    await k2_kojo2(rand_n);
  } else if (assi === 17) {
    era.drawLine();
    if (era.get(`talent:${assi}:165`)) {
      if (kojo.简易助手_0 === 0) {
        if (era.get(`talent:${target}:9`) === 1) {
          await era.printAndWait(`『主人，这个人已经用坏掉了呢』`);
        } else if (era.get(`talent:${target}:76`) === 1 && kojo.初调教 >= 5) {
          await era.printAndWait(
            `${player_name}和${assi_name}一起走进了房间。${target_name}的眼中露出不明的神色。`,
          );
          await era.printAndWait(
            `「唔哼哼…今天想要我们一起服侍么？主人啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `对一脸情色的${target_name}来说，眼前的少女只是个一起品尝快乐的伙伴罢了`,
          );
          await era.printAndWait(
            `「喂喂…快点一起来乞求主人的肉棒吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着屁股，狗一样地爬了过来。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(`『喂…主人，这个人真的是勇者吗？』`);
          era.setColor('');
          await era.printAndWait(
            `你苦笑着肯定。${assi_name}媚笑着走上前，尽情地开始抽打${target_name}正在扭动的屁股。`,
          );
          await era.printAndWait(`「真是条无廉耻之心的母狗呢……」`);
          era.setColor('#ffccff');
          await era.printAndWait(
            `『完全不够…今天我才是主人！ 给我扭动得再卖力些！』`,
          );
          era.setColor('');
          if (era.get(`talent:${assi}:76`) === 1) {
            await era.printAndWait(
              `『（啊哈…但是，你颤抖的屁股已经出卖了你呢……）』`,
            );
          }
          if (era.get(`talent:${assi}:76`) === 1) {
            await era.printAndWait(`${assi_name}回忆起自己被调教时的情形……`);
          }
        } else if (era.get(`talent:${target}:85`) === 1 && kojo.初调教 >= 7) {
          await era.printAndWait(
            `你带着${assi_name}一起走进了房间。${target_name}露出了严肃的表情。`,
          );
          await era.printAndWait(`「那个…主人…这个人是…？」`);
          era.setColor('#ffccff');
          await era.printAndWait(`『今天可是由我来代替主人调教勇者大人你哟♪』`);
          era.setColor('');

          if (era.get(`talent:${assi}:85`) === 1) {
            await era.printAndWait(
              `「这、这实在…太残酷了…${sc()}这样的孩子也不放过……」`,
            );
            await era.printAndWait(`${target_name}愤怒地开始谴责你。`);
            era.setColor('#ffccff');
            await era.printAndWait(`『啊……哈哈哈！勇者大人吃醋了么♪』`);
            era.setColor('');
            await era.printAndWait(
              `一阵大笑后，${assi_name}的嘴角上翘，露出淫媚的表情。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `『对了，今天就让我来在勇者大人身上演示下魔王大人是如何爱我的吧♪』`,
            );
            era.setColor('');
          } else {
            await era.printAndWait(
              `「竟，竟然…${sc()}除了我之外……还有其他人也遭受了一样过分的事吗」`,
            );
            await era.printAndWait(`${target_name}不由得开始谴责你。`);
            era.setColor('#ffccff');
            await era.printAndWait(
              `『过分？明明那么舒服…不过，勇者大人这么可爱……连我都忍不住了呢♪』`,
            );
            era.setColor('');
            await era.printAndWait(
              `${assi_name}冷笑着开始考虑该如何调教${target_name}……`,
            );
          }
        } else {
          await era.printAndWait(
            `你和${assi_name}一起饶有兴趣的看着${target_name}露出有点害怕的表情。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(`『初次见面呢勇者大人…今天可要多多关照咯』`);
          era.setColor('');
          await era.printAndWait(
            `新任的调教者仔细打量起${target_name}来，曾经的勇者的威严已经荡然无存。`,
          );
          await era.printAndWait(
            `「难、难道…你也是被魔王抓到的原勇者吗……是吧？！」`,
          );
          await era.printAndWait(`${target_name}看向对方的目光中充满了宽恕。`);
          era.setColor('#ffccff');
          await era.printAndWait(
            `『喂喂…打算帮助对方好被调教？你到底在想什么？』`,
          );
          era.setColor('');
          await era.printAndWait(
            `${target_name}的表情被识破，只能哭泣着从床上爬下来……`,
          );
        }
        // CFLAG:202  = 1（变量语义：CFLAG 族，202）
        kojo.简易助手_0 = 1;
        return 1;
      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {
        if (era.get(`talent:${target}:9`) === 1) {
          await era.printAndWait(
            `『已经被用坏了么？…那么弄得更破烂一点也无妨吧★』`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          era.setColor('#ffccff');
          await era.printAndWait(`『今天也来一起玩嘛勇者大人♪』`);
          era.setColor('');
          await era.printAndWait(
            `你和${assi_name}一起看着${target_name}稍微皱了皱眉头，之后重新振作的少女模样。`,
          );
          await era.printAndWait(`「啊…啊，欢迎${assi_name}酱」`);

          if (era.get(`talent:${assi}:85`) === 1) {
            await era.printAndWait(
              `依靠在你手臂上的${assi_name}和${target_name}的视线交汇了。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `『喂喂，主人…看来上一次勇者大人很舒服呢…${heart(1)} 主人你觉得呢…？』`,
            );
            era.setColor('');
            await era.printAndWait(`「啊，啊啊…停、停下…快别这么说……」`);
            era.setColor('#ffccff');
            await era.printAndWait(
              `『哦呵呵…就让勇者大人的肉体来告诉我们答案吧♪』`,
            );
            era.setColor('');
            await era.printAndWait(
              `少女露出胜利者的笑容把${target_name}压倒在地……`,
            );
          } else {
            await era.printAndWait(
              `少女单手叉在腰间，仔细地打量着${target_name}。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `『勇者大人气色不错？ 每晚想到主人的时候要手淫几次呀？』`,
            );
            era.setColor('');
            await era.printAndWait(`「别…请不要那样说……呜！」`);
            await era.printAndWait(
              `${target_name}涨红了脸想争辩些什么，但最终还是沉默了下去。`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `『嘿嘿嘿…好吧就这样默默地听着就好，毕竟肉体才是最诚实的呢♪ 今天就从上次的复习开始咯…♪』`,
            );
            era.setColor('');
            await era.printAndWait(
              `${target_name}无计可施，再一次默默地接受少女的调教……`,
            );
          }
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「啊啊…${assi_name}酱也来了吗…${heart(1)}」`);
          await era.printAndWait(
            `色情狂的表情从${target_name}脸上浮现，对${assi_name}的调教感到十分兴奋。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(`『哼哼哼…勇者大人今天的调教可不轻松哦♪』`);
          era.setColor('');

          if (era.get(`talent:${assi}:76`) === 1) {
            await era.printAndWait(
              `「啊啊…好棒…今天…主人也要从正面好好爱我……♪」`,
            );
            await era.printAndWait(
              `${target_name}充满喜悦地靠在少女的怀里。相同的淫乱特质被激发出来了…？`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `『哼哼，勇者大人的身体已经很熟练了么…♪ 真是令人满意的肉体呢…♪』`,
            );
            era.setColor('');
            await era.printAndWait(
              `${assi_name}和${target_name}的舌头互相缠绕着，发出一阵淫靡的吸吮声……`,
            );
          } else {
            await era.printAndWait(
              `「啊啊…好棒…今天…主人也要从正面好好爱我……♪」`,
            );
            era.setColor('#ffccff');
            await era.printAndWait(
              `『啊啊啊…淫荡的程度还不够！以为这么简单就能获得奖赏吗！你这卑微的母狗！』`,
            );
            era.setColor('');
            await era.printAndWait(
              `少女的毒舌喷吐着侮辱的话语，不停在${target_name}的脸颊上拍打着。`,
            );
            await era.printAndWait(`「有感觉了…啊…请…请继续侮辱我……」`);
            era.setColor('#ffccff');
            await era.printAndWait(`『像你这样的母狗还需要更严厉的惩罚！』`);
            era.setColor('');
            await era.printAndWait(`${assi_name}的施虐心瞬间高涨……`);
          }
        } else {
          await era.printAndWait(`「不，请不要…这样欺负我……」`);
          era.setColor('#ffccff');
          await era.printAndWait(
            `『欺负？没有啊，没想到勇者大人居然也会喜欢这种调教呢♪』`,
          );
          era.setColor('');
          await era.printAndWait(
            `${assi_name}发出一阵低沉的笑声，慢慢靠近${target_name}。`,
          );
          await era.printAndWait(`「哎呀…哎呀…救命啊…主人！」`);
          await era.printAndWait(
            `你苦笑着摇了摇头。${target_name}的脸色顿时变白了。`,
          );
          era.setColor('#ffccff');
          await era.printAndWait(
            `『求救也没用哦，给我继续爬！你只是个到哪里都要爬着的奴隶！』`,
          );
          era.setColor('');
          await era.printAndWait(
            `已经开始恐惧了，然而${target_name}被${assi_name}调教的课程才刚刚开始……`,
          );
        }
        return 1;
      }
    } else {
      await k2_kojo2(rand_n);
    }
  } else {
    await k2_kojo2(rand_n);
  }
}

// k2_kojo2
async function k2_kojo2(rand) {
  const { rand_n, target, target_name, player_name, sc, view } = bind_ctx(rand);

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「讨厌讨厌讨厌讨厌…不要…啊啊啊啊啊啊啊啊啊啊！」`);
    await era.printAndWait(`${target_name}已经彻底崩溃了……`);
    return 1;
  } else if (
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    game.kojo.口上开关 === 2
  ) {
    era.drawLine();

    if (view.chara.结婚对象 === 901) {
      await era.printAndWait(`「${sc()}已经成为你的妻子了…吗…唔！」`);
      await era.printAndWait(`${target_name}好像并没有身为妻子的自觉……`);
    } else {
      await era.printAndWait(`「不对…不该是这样的……」`);
      await era.printAndWait(`${target_name}的眼神中充满了抗拒……`);
    }
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 0 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0 &&
    era.get(`talent:${target}:85`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:317`) === 4) {
      await era.printAndWait(`「帮帮我…拜托…呜」`);
      await era.printAndWait(`${target_name}脑海里浮现出故乡的恋人……`);
    } else if (view.chara.结婚对象 === 901) {
      await era.printAndWait(`「${sc()}是被逼成为…你的妻子……」`);
      await era.printAndWait(`${target_name}看着你哼了一声转过头去……`);
    } else {
      await era.printAndWait(`「原谅我…」`);
    }
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 1 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0 &&
    era.get(`talent:${target}:85`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:317`) === 4) {
      await era.printAndWait(`「${sc()}再也…回不去了，那个人在的地方……」`);
    } else if (view.chara.结婚对象 === 901) {
      await era.printAndWait(`「不…别、别碰我……」`);
      await era.printAndWait(
        `仿佛没听到一般，${player_name}把自己的新娘${target_name}抱到怀里……`,
      );
    } else {
      await era.printAndWait(`「你这么做…是为什么…？」`);
    }
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 2 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0 &&
    era.get(`talent:${target}:85`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:317`) === 4) {
      await era.printAndWait(`「啊，不行…这个…如果被…啊啊……」`);
      await era.printAndWait(`（又…想到那个人了么…已经回不去了啊…嗯嗯…）`);
      await era.printAndWait(`${target_name}无力地反抗着……`);
    } else if (view.chara.结婚对象 === 901) {
      await era.printAndWait(
        `「嗯…今后…要温柔地爱我哦……${sc()}已经…是…属于你的了」`,
      );
      await era.printAndWait(
        `${target_name}露出柔弱的表情看着你，依偎在${player_name}的怀中……`,
      );
    } else {
      await era.printAndWait(`「当初成为勇者…说不定也是件好事呢」`);
    }
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    game.kojo.口上开关 === 2 &&
    era.get(`talent:${target}:76`) === 0 &&
    era.get(`talent:${target}:85`) === 0
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:317`) === 4) {
      await era.printAndWait(`「是…更加地…请随意享用…人家的肉体……」`);
      await era.printAndWait(`（对不起…${sc()}心的归属曾经是你…啊……）`);
      await era.printAndWait(
        `${target_name}回想起脑海中故乡的恋人……痛苦的感觉萦绕在心头……`,
      );
    } else if (view.chara.结婚对象 === 901) {
      await era.printAndWait(`「啊啊…${sc()}已经蜕变了…就在此刻……」`);
      await era.printAndWait(
        `${target_name}身为妻子觉悟了什么一般，满怀期望地看着你……`,
      );
    } else {
      await era.printAndWait(`「请多关照…主人」`);
    }
    return 1;
  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();

    if (view.chara.结婚对象 === 901) {
      if (rand_n(3) === 0) {
        await era.printAndWait(
          `${target_name}撒娇般主动亲吻着${player_name}的脸颊。`,
        );
        await era.printAndWait(
          `「唔…你这个…大变态…已经是${sc()}的丈夫了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `「人家的小穴可是想你的肉棒想到发痛了呢……还有浓厚的肉棒牛奶……${heart(1)}」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}四肢着地，将丰盈的臀部高高耸起，母狗般向你献媚着。`,
        );
        await era.printAndWait(
          `「求求您…从哪里开始都可以…用你的大肉棒…好好地蹂躏${sc()}吧${heart(1)}」`,
        );
        await era.printAndWait(
          `淫乱的${target_name}似乎一刻都等不及般地乞求${player_name}的侵犯，下体已经湿成一片，晃动的屁股上弥漫着淫乱的味道……`,
        );
      } else {
        await era.printAndWait(
          `「你可爱的…淫乱的妻子${sc()}的身体…已经在渴求肉棒了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}仿佛已经再也无法忍耐般地向${player_name}乞求宠爱。`,
        );
        await era.printAndWait(
          `「来吧…你淫乱的妻子已经等不及了哟…想要被肉棒塞满…${heart(1)}」`,
        );
      }
    } else if (era.get(`talent:${target}:314`) === 9) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「是…魔王大人…又在想色色的事情了么？」`);
        await era.printAndWait(
          `「是…无论是${sc()}的嘴巴，小穴还是肛门…都好喜欢好喜欢被魔王大人操呢${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}抱住${player_name}不停地撒娇……`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「一切都要按照礼仪来安排…开玩笑的♪」`);
        await era.printAndWait(
          `「那些…不要紧的细节不要去管…早一点插进来吧${heart(1)}`,
        );
        await era.printAndWait(
          `「虽然现在身体还是会有点疼痛……但还是想要……${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}的翅膀高兴地扇动着……`);
      } else {
        await era.printAndWait(`${target_name}迎了上来，尽情地拥抱你。`);
        await era.printAndWait(
          `「魔王大人…${sc()}已经无法忍受了…${heart(1)}」`,
        );
        await era.printAndWait(`「不用力操我的话…我可不原谅您哦${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的尾巴悄悄伸出，用力地缠住你的脚踝……`,
        );
      }
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`${target_name}迎了上来，尽情地拥抱你。`);
        await era.printAndWait(
          `「魔王大人…${sc()}已经无法忍受了…${heart(1)}」`,
        );
        await era.printAndWait(`「不用力操我的话…我可不原谅您哦${heart(1)}」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `${target_name}四肢着地，将丰盈的臀部高高耸起，母狗般向你献媚着。`,
        );
        await era.printAndWait(
          `「我…我不行了……您最忠实的母狗${target_name}…等着您的宠爱${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}已经彻底化身牝犬，一脸淫荡的表情哀求着你……`,
        );
      } else {
        await era.printAndWait(`「嗯～身体已经想您想到疼痛了呢${heart(1)}」`);
        await era.printAndWait(`「快来～用力地～干坏${sc()}的小穴吧！」`);
        await era.printAndWait(
          `${target_name}眼眶已经湿润，仿佛已经忍耐到极限般，浑身微微地颤抖起来……`,
        );
      }
    }
    return 1;
  } else if (era.get(`talent:${target}:85`) === 1 && game.kojo.口上开关 === 2) {
    if (view.train.着衣状态 & 28 && view.train.上衣类型 === 209) {
      await era.printAndWait(`${target_name}穿着女仆装`);
    } else if (view.train.着衣状态 & 28 && view.train.上衣类型 === 203) {
      await era.printAndWait(`${target_name}穿着妓女服`);
    } else if (
      view.chara.特别服装类型 === 12 &&
      (view.train.着衣状态 & 28) === 0
    ) {
      await era.printAndWait(`${target_name}浑身赤裸着`);
    }

    if (view.chara.特别服装类型 === 91 && view.train.着衣状态 & 64) {
      await era.printAndWait(`${target_name}陶醉地看着手指上的戒指`);
    }

    if (view.chara.结婚对象 === 901) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「啊真是的…结婚生活果然最棒了${heart(1)}」`);
        await era.printAndWait(`「所以啊…来让婚后生活更加快乐吧…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}把${player_name}的手放到自己的两腿之间引导着……`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(
          `「唔～唔${heart(1)} 唔、啊…一起幸福下去…${heart(1)}」`,
        );
        if (era.get(`talent:${target}:153`) !== 1) {
          await era.printAndWait(
            `「快给我…你的精子…让我怀孕…为你…生很多很多…孩子${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}引导着你的手抚摸着自己的乳房和阴唇……`,
        );
      } else {
        if (era.get(`talent:${target}:153`) !== 1) {
          await era.printAndWait(
            `「啊啊…爱意快要满溢了…${heart(1)} 好想为你生孩子啊${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `${target_name}紧紧地抱着${player_name}撒娇，不肯松手。`,
        );
        await era.printAndWait(
          `「啊啊…${sc()}的爱意…来自妻子的爱感受到了吗？${heart(1)}」`,
        );
      }
    } else if (era.get(`talent:${target}:314`) === 9) {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「唔唔…主人啊…${heart(1)}」`);
        await era.printAndWait(`${target_name}开心地依偎在你怀中。`);
        await era.printAndWait(
          `「${sc()}的心和身体…都深深喜欢着主人您哦…${heart(1)}」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「主人啊…今天也要好好的爱我哟…${heart(1)}」`);
        await era.printAndWait(`「深深地…彻底地爱我…${heart(1)}」`);
        if (era.get(`talent:${target}:153`) !== 1) {
          await era.printAndWait(`「好想为你生孩子…${heart(1)}」`);
        }
      } else {
        await era.printAndWait(`「主人啊…今天也请多多关照哦${heart(3)}」`);
        await era.printAndWait(`${target_name}露出了喜悦的笑容。`);
        await era.printAndWait(
          `「这身体，每天都有为您好好保养哦！${heart(1)}」`,
        );
      }
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「今天才真正的成为了魔族一员呢！」`);
        await era.printAndWait(`「…嗯…人家可是很认真的哦……」`);
        await era.printAndWait(
          `${target_name}似乎很害羞，但还是鼓足勇气说了出来。`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「主人！今天也请用力侵犯我吧！」`);
        await era.printAndWait(
          `「只要您喜欢…怎么用力揉用力插都可以…这可是专属于您的东西了……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}握住你的手放在自己乳房上用力揉动……`,
        );
      } else {
        await era.printAndWait(`「主人啊…今天也请多多关照哦${heart(3)}」`);
        await era.printAndWait(`${target_name}露出了喜悦的笑容。`);
      }
    }
    return 1;
  }
  return 0;
}

// eventend_k2：EVENTEND NORMAL 档
async function eventend_k2(rand) {
  const { target, target_name, sc } = bind_ctx(rand);

  if (game.kojo.口上开关 <= 0) {
    return 0;
  }
  if (era.get(`talent:${target}:162`) !== 1) {
    return 0;
  }

  if (era.get(`base:${target}:0`) <= 0) {
    return 0;
  }

  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine();
    await era.printAndWait(`「太过分了…太过分了…嘿嘿嘿……」`);
    await era.printAndWait(
      `${target_name}的口水滴答落下，嘴里还在嘀咕着什么……`,
    );
    return 1;
  } else if (
    (era.get(`mark:${target}:3`) || 0) === 3 &&
    era.get(`talent:${target}:85`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「好想死……」`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) <= 1 &&
    era.get(`talent:${target}:85`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「为什么要这样对我……」`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 2 &&
    era.get(`talent:${target}:85`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「当勇者这种事，糟透了……」`);
    return 1;
  } else if (
    (era.get(`mark:${target}:2`) || 0) === 3 &&
    era.get(`talent:${target}:85`) === 0 &&
    era.get(`talent:${target}:76`) === 0
  ) {
    era.drawLine();
    await era.printAndWait(`「${sc()}本来…就是被遗弃的东西么？」`);
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「呼…嗯…被操得还不够呢…${heart(1)}」`);
    } else {
      await era.printAndWait(`「啊啊…明明还可以继续…好讨厌……」`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:76`) === 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「呼呼…好棒的性爱呢…${heart(1)}」`);
      await era.printAndWait(`${target_name}懒洋洋地摇动着尾巴……`);
    } else {
      await era.printAndWait(`「真的…好、好厉害……${heart(1)}」`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`base:${target}:0`) >= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(`「啊啊…请多惩罚我一会吧……」`);
    } else {
      await era.printAndWait(`「好温柔…」`);
    }
    return 1;
  } else if (
    era.get(`talent:${target}:85`) === 1 &&
    era.get(`base:${target}:0`) <= 500
  ) {
    era.drawLine();

    if (era.get(`talent:${target}:314`) === 9) {
      await era.printAndWait(
        `「呼呼…主人的爱已经把小穴填满了呢……${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「能被主人这样操过…死而无憾了呢」`);
      switch (era.get(`talent:${target}:300`)) {
        case 1: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，金色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        case 2: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，栗色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        case 3: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，黑色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        case 4: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，红色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        case 5: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，银色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        case 6: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，蓝色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        case 7: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，绿色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        case 11: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，粉色的头发凌乱地贴在额头上……`,
          );
          break;
        }
        default: {
          await era.printAndWait(
            `${target_name}的脸色还带着高潮余韵的潮红，黑色的头发凌乱地贴在额头上……`,
          );
          break;
        }
      }
    }
    return 1;
  }
  return 0;
}

// kojo_message_com_2
async function kojo_message_com_2(rand) {
  const {
    rand_n,
    target,
    target_name,
    player_name,
    master_name,
    sc,
    scf,
    kojo,
  } = bind_ctx(rand);
  // 延迟读取：主启动图的 COM80–90 注册仍仅由 com-hardcore 自己负责；本模块
  // 只在 COM 口上读穿环位图。顶层 require 会让 main-loop 漏装时模块仍被间接
  // 拉进来，#274/#282 接入锁与 M1249 一起失明（#233 全量变异抓到）。
  const { piercing_state } = require('#/system/train/com-hardcore');
  let P = piercing_state.p;

  if (era.get(`tequip:${target}:55`)) {
    await colosseum_kojo_2(rand_n);
    return 0;
  }

  if (era_flag.assi > 0 && era_flag.assiplay) {
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
    return 0;
  }

  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }

  if (era_flag.selectcom === 0) {
    if (kojo.爱抚 === 0) {
      if ((era.get(`mark:${target}:2`) || 0) >= 2) {
        await era.printAndWait(`「真的…这样…不行…然而…无法反抗…」`);
      } else {
        await era.printAndWait(`「什么？！请不要这样……快放开我！」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯嗯${heart(1)}…再…再用力些嘛…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}淫乱的肉体本能地接受着${player_name}的爱抚……`,
        );
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…呼呼…再…请随意…关照…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}一边接受着爱抚的快感一边向${player_name}撒娇……`,
        );
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「请…再…再用力些…啊！」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不可以…这样…不可以…！」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「感觉…啊啊…好奇怪…！」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (kojo.舔阴 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait(`「哪里！那里…脏！好脏！」`);
        await era.printAndWait(`${target_name}似乎反感阴部被舔……`);
      } else {
        await era.printAndWait(`「啊啊…为什么那里…会！」`);
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不要停${heart(1)} 好棒…把舌头伸进去……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}激动地不让${player_name}抬头，腰部也随着缓缓向上移动……`,
        );
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好…好厉害…不要停…再多舔…一些${heart(1)}」`);
        await era.printAndWait(
          `${target_name}跟随着${player_name}的动作抬起腰部，贪求更进一步的快乐……`,
        );
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…如此关照…好棒…真的无以为报…」`);
        await era.printAndWait(`${target_name}羞耻地忍耐着抬动腰部的冲动……`);
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不行…不可以…那里被翻开了呀！」`);
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 2) {
    if (kojo.肛门爱抚 === 0) {
      await era.printAndWait(`「不要！不要！脏啊！不可以摸那里！」`);
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303）
      kojo.肛门爱抚 = 1;
      return 0;
    } else {
      P =
        (era.get(`palam:${target}:3`) || 0) +
        (era.get(`delta:${target}:3`) || 0);

      if (
        era.get(`talent:${target}:76`) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼呼${heart(1)}哦…哦${heart(1)} 连后面也…被唤醒了${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被手指侵入，发出了一阵欢喜的呜咽。`,
        );
        await era.printAndWait(`「噢噢噢…这感觉…忍不住了…${heart(1)}」`);
        // CFLAG:303  = 7（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「咿啊啊…没…没关系…请继续${heart(1)}」」`);
        await era.printAndWait(
          `${target_name}的肛门还没有完全湿润，${target_name}慢慢地将手指探入。`,
        );
        await era.printAndWait(`「呼呼…还要…更多…${heart(1)}」`);
        // CFLAG:303  = 6（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…主人的手指正在侵犯…好…啊…又更深了…」`);
        await era.printAndWait(`${target_name}的肛门纠缠住手指，品味着快感……`);
        // CFLAG:303  = 5（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「好棒…主人…主人的手指好温柔…后面的小穴也很高兴呢…」`,
        );
        // CFLAG:303  = 4（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 4;
      } else if (
        P >= PALAMLV[2] &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「有…哦哦…好厉害…屁股的小穴…好棒！」`);
        // CFLAG:303  = 3（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 3;
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这里…不可以，屁股…感觉…好糟糕…」`);
        // CFLAG:303  = 2（变量语义：CFLAG 族，303）
        kojo.肛门爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 3) {
    if (kojo.自慰 === 0) {
      await era.printAndWait(`「拜托…不要看…不要看着我…快要羞死了…」`);
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304）
      kojo.自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…妈妈${heart(1)}…魔王大人…${heart(1)}」`,
        );
        await era.printAndWait(`「${sc()}的身体…已经变得…这么淫乱了！」`);
        await era.printAndWait(`「呼呼…小穴…小穴变得奇怪了${heart(3)}」`);
        await era.printAndWait(
          `${target_name}一边努力地挺动腰肢，炫耀般向${player_name}露出未经蹂躏的小穴……`,
        );
        // CFLAG:304  = 9（变量语义：CFLAG 族，304）
        kojo.自慰 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊${heart(1)} 手指…手指已经…插进去了${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊…不行不行！${heart(1)} 身体…好疼…${heart(1)}」`,
          );
          await era.printAndWait(
            `「好疼啊…明明很讨厌…可是手指却不自觉地……${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呼呼…有感觉了么${heart(1)} 这样…${heart(1)} 还要更多！${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊…小穴的爱液在涌出来…停不下来了！…${heart(1)}」`,
          );
          await era.printAndWait(
            `「真是没想到…手指${heart(1)} 和肉棒${heart(1)} 和肉棒一样厉害！${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}就这样看着变淫靡的${target_name}不停地手淫……`,
          );
        } else {
          await era.printAndWait(
            `「是${heart(1)} 魔王大人…${heart(1)} 真是个喜欢看人自慰的变态呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「每天晚上都在自慰哦${heart(1)} 只要看到魔王大人…就变得很奇怪了${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊…让更多男人看见…淫乱的${target_name}是个变态自慰狂吧！${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被压抑不住的愉悦击溃，在自慰中向你告白了……`,
          );
        }
        // CFLAG:304  = 8（变量语义：CFLAG 族，304）
        kojo.自慰 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:31`) || 0) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「嗯哼…啊啊啊${heart(1)} 被看着…反而更有快感了呢……${target_name}真是个变态呢${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊哈啊${heart(1)}…好棒${heart(1)}手指…已经…插到最里面了！${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}激烈地用两手一起开始自慰……`);
        }
        // CFLAG:304  = 7（变量语义：CFLAG 族，304）
        kojo.自慰 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…为什么…明明这么舒服…主人快来夺走我的贞操嘛…」`,
        );
        await era.printAndWait(`${target_name}用手指拨开小穴引诱着你……`);
        // CFLAG:304  = 6（变量语义：CFLAG 族，304）
        kojo.自慰 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「这样真是怎么弄都不够啊…应该这样？还是这样更舒服呢？」`,
          );
          await era.printAndWait(
            `${target_name}的小穴里流出了爱液，手指的动作更加激烈了……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「好棒！…好棒！…心情都变化了！…主人快看这里！${sc()}已经不行了！${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}忍耐着可还是无法抑制地发出了快乐的喘息声……`,
          );
        } else {
          await era.printAndWait(
            `「对…！来了！要高潮了！好厉害！！小穴都变得黏糊糊的…心情也变好了…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}欲求不满地用双手擦拭着下体，诱惑地望着你……`,
          );
        }
        // CFLAG:304  = 5（变量语义：CFLAG 族，304）
        kojo.自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:31`) || 0) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊…啊…好舒服！…看着我…主人快看我${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「不行…整个人已经快要变奇怪了！…${heart(1)}」`,
          );
        }
        // CFLAG:304  = 4（变量语义：CFLAG 族，304）
        kojo.自慰 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:31`) || 0) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「呼呼…快看…${sc()}的小穴已经黏糊糊的了…」`);
        } else {
          await era.printAndWait(`「嗯嗯…为什么只是手淫…就这么有感觉…」`);
        }
        // CFLAG:304  = 3（变量语义：CFLAG 族，304）
        kojo.自慰 = 3;
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 === 2) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「不要…不要…这样看着我…真是…好羞耻…啊…！」`);
        } else {
          await era.printAndWait(`「不行！不要看！不要看着那里！…」`);
        }
        // CFLAG:304  = 2（变量语义：CFLAG 族，304）
        kojo.自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      if (
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(
            `「如果这样用力揉胸部的话${heart(1)}…乳汁都要出来了！${heart(1)}」`,
          );
          await era.printAndWait(`「啊啊${heart(1)} 乳汁…乳汁要出来了！」`);
        } else {
          await era.printAndWait(`「呼呼…请随您喜欢地…玩弄这个胸部吧…！」`);
          await era.printAndWait(
            `「不…这样的我…这个声音…不来吸吸看吗！有点期待呢……」`,
          );
        }
      } else {
        if (
          era.get(`talent:${target}:85`) === 1 ||
          era.get(`talent:${target}:76`) === 1
        ) {
          await era.printAndWait(
            `「啊…好高兴…请…随您喜欢地玩弄吧…这是主人专用的胸部…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「不要摸那里…感觉…好奇怪…好痒…！」`);
        }
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:130`) === 1 &&
        era.get(`palam:${target}:5`) > PALAMLV[3] &&
        era.get(`tequip:${target}:16`) === 0 &&
        era.get(`tequip:${target}:15`) === 0
      ) {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啊${heart(1)} 还有很多…这淫荡的…乳汁…要喝下去呐${heart(1)}」`,
          );
          await era.printAndWait(
            `「又出来了！乳汁…满满…满满地溢出来了…${heart(1)}」`,
          );
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「乳房被这么用力地吮吸${heart(1)}…乳汁都要出来了！${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊啊${heart(1)} 好的…请喝光吧…啊啊${heart(1)} 你这个淘气的大宝宝${heart(1)}」`,
          );
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          (era.get(`abl:${target}:1`) || 0) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「啊啊…又要高潮了么…居然连乳房都…这感觉…唔唔♪」`,
          );
          await era.printAndWait(`「出来了…啊啊……乳汁都出来了…这感觉好棒！」`);
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「呼呼…请随您喜欢地…玩弄这个胸部吧…！」`);
          await era.printAndWait(
            `「不…这样的我…这个声音…不来吸吸看吗！有点期待呢……」`,
          );
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      } else {
        if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「啊哈…手指…好冷…这种感觉${heart(1)}」`);
          await era.printAndWait(`「真是让人…唔唔…胀得发痛呢…${heart(1)}」`);
          // CFLAG:306  = 5（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 5;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            `「嗯…好舒服…胸部好舒服…整个人都……${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}发出了愉悦的喘息声……`);
          // CFLAG:306  = 4（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 4;
        } else if (
          (era.get(`abl:${target}:1`) || 0) >= 3 &&
          (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(`「这里…乳房…乳房好舒服…已经有感觉了…！」`);
          // CFLAG:306  = 3（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 3;
        } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait(`「不…不要碰那里…拜托……」`);
          // CFLAG:306  = 2（变量语义：CFLAG 族，306）
          kojo.胸爱抚 = 2;
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        await era.printAndWait(
          `${player_name}温柔地将${target_name}抱住，她高兴地把脸凑过来撒娇。`,
        );
        await era.printAndWait(`「嘿嘿…怎么样都可以哦魔王大人${heart(1)}」`);
        await era.printAndWait(`${target_name}可爱地闭上了眼睛，献出了初吻。`);
        await era.printAndWait(
          `「呼…这个${heart(1)} 这个可是…${sc()}的初吻哦……${heart(1)}」`,
        );
        await era.printAndWait(
          `「嘻嘻～${heart(1)} 要开始进入状态了呢～…${heart(1)}」`,
        );

        if (era.get(`talent:${target}:317`) === 4) {
          await era.printAndWait(
            `${target_name}妖艳地笑着，好像已经彻底忘记脑海中故乡的恋人了……`,
          );
        }
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(`tequip:${target}:89`) === 0 &&
        era.get(`tequip:${target}:90`) === 0
      ) {
        if (era.get(`talent:${target}:317`) === 4) {
          await era.printAndWait(
            `「啊…好…好高兴…能将初吻献给主人呢…请好好品尝…主人…」`,
          );
          await era.printAndWait(
            `（啊…${sc()}…已经将…一切都……献给主人了呢……${heart(1)}）`,
          );
          await era.printAndWait(
            `${target_name}一边流着泪和你接吻，一边在脑海中向远方的恋人道歉着。`,
          );
          await era.printAndWait(
            `「呼呼…好喜欢${heart(1)} 更多…继续吻我${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊…好…好高兴…能将初吻献给主人呢…请好好品尝…主人…」`,
          );
          await era.printAndWait(
            `${target_name}一边热情地回吻一边流下了欢喜的泪水……`,
          );
          await era.printAndWait(`略显笨拙的嘴唇反而让你兴奋起来了……`);
          await era.printAndWait(
            `「呼呼…好喜欢${heart(1)} 更多…继续吻我${heart(1)}」`,
          );
        }
      } else {
        await era.printAndWait(`「唔唔…不要…不要啊……」`);
        await era.printAndWait(
          `${target_name}一边被你吻着一边流下了悲伤的泪水……`,
        );

        if (era.get(`talent:${target}:317`) === 4) {
          await era.printAndWait(`「原谅我…还有这一切…吧……！」`);
          await era.printAndWait(`${target_name}想起故乡的恋人，哭出声了……`);
        }
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「Mua…Mua…Mua…无论…你要…多少都可以～${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}热情的嘴唇不停不停与你的唇分开重合着。`,
        );
        await era.printAndWait(`「啊啊…这…更像是…接吻吧…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「哼…那个人…初吻无法献给你…对不起啊…」`);
      } else {
        await era.printAndWait(`「不…不要…好讨厌…唔呀！…」`);
      }
      // CFLAG:307  = 1（变量语义：CFLAG 族，307）
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「Mua…Mua…Mua…无论…你要…多少都可以～${heart(3)}」`,
        );
        await era.printAndWait(
          `${target_name}热情的嘴唇不停不停与你的唇分开重合着。`,
        );
        await era.printAndWait(
          `「呼啊啊${heart(1)}…啊啊…就是这里…请多吻我几次…${heart(1)}」`,
        );
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人…好…好喜欢接吻…请…亲多少次都可以…${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}高兴地与你接吻了……`);
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        (era.get(`abl:${target}:10`) || 0) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人的话…怎样都可以…」`);
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不可以…亲得…那么用力……」`);
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 7) {
    if (kojo.自己扒开 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「看呐…人家的…小穴…已经湿漉漉的了呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}自己张开了小穴，大量的爱液流了出来……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊…${sc()}的小穴…请随意地看吧…还是有些不好意思呢…」`,
        );
        await era.printAndWait(`${target_name}在你的注视下开始兴奋了起来……`);
      } else {
        await era.printAndWait(
          `「啊啊…好害羞…好想死…怎么可以做出这种姿势……」」`,
        );
        await era.printAndWait(
          `${target_name}分开的小穴里有爱液慢慢地渗出来了……`,
        );
      }
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308）
      kojo.自己扒开 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「快${heart(1)}快来${heart(1)}…用大肉棒来${heart(1)}…惩罚…这个…淫乱潮湿的小洞洞吧${heart(1)}」`,
        );
        await era.printAndWait(
          `「真是糟糕啊${heart(1)}…已经饥渴成这样了…如此不乖的…小穴…请狠狠地操进来吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出了母狗般的表情，用手指勾引着${player_name}……`,
        );
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人的目光…无法忍耐了啊…快点插进来吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}自己张开了小穴，大量的爱液流了出来……`,
        );
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        (era.get(`abl:${target}:17`) || 0) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「请随意观看……${sc()}…已经变成这样的小穴…光是被看就已经受不了啊♪」`,
        );
        await era.printAndWait(
          `${target_name}分开的小穴里有爱液慢慢地渗出来了……`,
        );
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊…好害羞…好想死…怎么可以做出这种姿势」`);
        await era.printAndWait(
          `${target_name}分开的小穴里有爱液慢慢地渗出来了……`,
        );
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 8) {
    if (kojo.插入手指 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊${heart(1)}…手指…更加深入了${heart(1)}…${sc()}的小穴正在被欺负着呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边被凌辱一边像是发出邀请一般抬动着腰肢……`,
        );
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait(
          `「啊啊…插进来了…主人的手指…还可以更深一些！用手指大力地搅动吧！」`,
        );
        await era.printAndWait(`${target_name}配合地扭动着腰肢……`);
      } else {
        await era.printAndWait(`「手指…放进来了…好讨厌啊…啊…不要这样！」`);
      }
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309）
      kojo.插入手指 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「唔唔${heart(1)} 手指…更加深入了${heart(1)} 不过没关系…请更加深入地调教这个淫乱的小穴吧！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边呻吟一边像是发出邀请一般抬动着腰肢……`,
        );
        // CFLAG:309  = 5（变量语义：CFLAG 族，309）
        kojo.插入手指 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「高潮了…唔啊…手指…唔唔…更！更深一点！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的小穴伴随着你手指的深入而颤抖着……`,
        );
        // CFLAG:309  = 4（变量语义：CFLAG 族，309）
        kojo.插入手指 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「不行…手指…哦哦哦！…屁股不由自主地动起来了…！」`,
        );
        // CFLAG:309  = 3（变量语义：CFLAG 族，309）
        kojo.插入手指 = 3;
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「明明只是…手指…身体…身体居然就自己动起来了…」`,
        );
        // CFLAG:309  = 2（变量语义：CFLAG 族，309）
        kojo.插入手指 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「那${heart(1)} 那里…不…不行啊${heart(1)} 变奇怪了…屁股小穴变奇怪了呀${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人啊…不要舔那里…好害羞…真是的${heart(1)}舌头…伸进去了…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「不！不行…那里很脏…啊啊啊啊！」`);
      }
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「舒服得…快要融化了呢…后面的小穴${heart(1)}」`);
        await era.printAndWait(
          `「唔唔${heart(1)}…好棒…腰都动起来了${heart(1)}」`,
        );
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「唔唔…主人的舌头…伸到屁股里面了…感觉好奇怪…」`,
        );
        await era.printAndWait(
          `${target_name}兴奋地眯起了眼睛，感受着${player_name}的舌头……`,
        );
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人的…命令…什么都…唔唔！」`);
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「哎呀…心情好奇怪…原谅我…原谅我…后面的小穴…这奇妙的快感……」`,
        );
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 10) {
    if (kojo.振动宝石 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哦哦${heart(1)} 这个可爱的小东西…${heart(1)} 可是${sc()}…更想要主人的肉棒呢${heart(1)}」`,
        );
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        era.get(`talent:${target}:85`) === 1
      ) {
        await era.printAndWait(`「呼呼…这个小东西…好可爱呢…${heart(1)}」`);
      } else {
        await era.printAndWait(
          `「这，这宝石…为什么在颤抖…不行不行！别放上来！」`,
        );
      }
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311）
      kojo.振动宝石 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「这…这感觉${heart(1)} 连腰部也不由自主地…${heart(1)} 忍不住了！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}淫荡地扭动着腰部，紧紧地把振动宝石按住不放……`,
        );
        // CFLAG:311  = 5（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「唔…嗯…好舒服…主人……再压紧点…啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的阴蒂在宝石的剧烈振动下高潮了……`,
        );
        // CFLAG:311  = 4（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊！不行！腰不由自主地动起来了！」`);
        // CFLAG:311  = 3（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 3;
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「唔……继续那样压紧的话……会变得好奇怪！」`);
        // CFLAG:311  = 2（变量语义：CFLAG 族，311）
        kojo.振动宝石 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 11 && era.get(`tequip:${target}:11`)) {
    if (kojo.壶虫 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊…${heart(1)} 好舒服…那个小虫子在向深处侵犯着…${heart(1)}」`,
          );
          await era.printAndWait(
            `「${sc()}的处女…终于被夺走了…啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}在${target_name}的子宫深处种入了蠕虫……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「啊啊…拜托…主人…至少用大肉棒来夺走${sc()}的贞操嘛…唔唔！」`,
          );
          await era.printAndWait(
            `${target_name}的身体向后仰起，努力忍受着破瓜的痛楚……`,
          );
        } else {
          await era.printAndWait(`「不行！不行！好讨厌啊啊啊啊！」`);
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「这感觉${heart(1)} 进去得…好深…唔唔${heart(1)} 啊啊啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的身体随着蠕虫的深入而颤抖着……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「唔唔…比起这个，人家明明更想要大肉棒来侵犯自己嘛…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「什么…这…这感觉…不要！」`);
        }
      }
      // CFLAG:312  = 1（变量语义：CFLAG 族，312）
      kojo.壶虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼呼${heart(1)}…朝着小穴的深处…进来吧${heart(1)}…呼呼呼呼${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}随着蠕虫的深入发出了淫荡的喘息……`,
        );
        // CFLAG:312  = 5（变量语义：CFLAG 族，312）
        kojo.壶虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「心…心情变的好期待${heart(1)}…蠕虫…进入小穴的深处…还在咕啾咕啾地发出响动${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}期待着蠕虫更加深入……`);
        // CFLAG:312  = 4（变量语义：CFLAG 族，312）
        kojo.壶虫 = 4;
      } else if (
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不行了…这感觉…太棒了…蠕虫什么的…好厉害…」`);
        // CFLAG:312  = 3（变量语义：CFLAG 族，312）
        kojo.壶虫 = 3;
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊…好奇怪…不行…不行啊…那里！…」`);
        // CFLAG:312  = 2（变量语义：CFLAG 族，312）
        kojo.壶虫 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 11 &&
    era.get(`tequip:${target}:11`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…再往深处去一点嘛……${heart(1)}」`);
      // CFLAG:372  = 3（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「唔唔…小虫子…就这么放进来了…${heart(1)}」`);
      // CFLAG:372  = 2（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 2;
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「唔…唔…感觉…好奇怪…」`);
      // CFLAG:372  = 1（变量语义：CFLAG 族，372）
      kojo.壶虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 12) {
    if (kojo.振动杖 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「哎呀${heart(1)} 这不是玩具么？${heart(1)}」`);
        await era.printAndWait(
          `「还有点……${heart(1)} 不习惯呢…嘻嘻${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「天啊！这感觉！好棒！主人！这玩具好棒啊啊啊！${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「不…不…${sc()}可不是你的玩物啊…唔唔唔唔唔唔！」`,
        );
      }
      // CFLAG:313  = 1（变量语义：CFLAG 族，313）
      kojo.振动杖 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「唔唔…这剧烈的震动感${heart(1)} 让小穴都要融化了啊${heart(1)}」`,
        );
        await era.printAndWait(
          `「好奇怪…主人你想试试吗？${heart(1)}感觉好棒！${heart(1)}」`,
        );
        // CFLAG:313  = 5（变量语义：CFLAG 族，313）
        kojo.振动杖 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「唔唔！整个人都发麻了！不要停啊！${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊哈${heart(1)} 这感觉…就这么涌上来了…唔唔…好厉害${heart(1)}」`,
        );
        // CFLAG:313  = 4（变量语义：CFLAG 族，313）
        kojo.振动杖 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「唔唔唔…啊！不要再弄啦…可是这感觉…！」`);
        // CFLAG:313  = 3（变量语义：CFLAG 族，313）
        kojo.振动杖 = 3;
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这震动…的感觉…身体自发地颤抖起来了！」`);
        // CFLAG:313  = 2（变量语义：CFLAG 族，313）
        kojo.振动杖 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 13 && era.get(`tequip:${target}:13`)) {
    if (kojo.肛门虫 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊${heart(1)} 好样的生物…快让我尝尝…它的味道${heart(1)} 比真人还要棒么？${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊啊…这样的生物要从后面进来…拜、拜托请温柔一些…」`,
        );
      } else {
        await era.printAndWait(`「什…什么啊这可怕的玩意…不许过来！」`);
      }
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314）
      kojo.肛门虫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「唔哦…在里面…${heart(1)} 不停搅动着…好厉害！${heart(1)} 继续不要停！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}的肛门因为蠕虫的进入而分泌出了粘液，${target_name}高兴地扭动着屁股要求更多。`,
        );
        await era.printAndWait(
          `「呜呜…后面已经这么淫荡了吗${heart(1)} 屁眼已经高潮了啊啊！${heart(1)}」`,
        );
        // CFLAG:314  = 7（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嘻嘻${heart(1)}…再深入一些吧…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的肛门因为蠕虫的进入而分泌出了粘液。蠕虫在${target_name}的肛门里横冲直撞。`,
        );
        await era.printAndWait(
          `「嘻嘻…好棒啊${heart(1)} 啊啊啊…蠕虫在里面肆虐的感觉……${heart(1)}」`,
        );
        // CFLAG:314  = 6（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊主人…屁股里…好棒…好高兴…${heart(1)}」`);
        await era.printAndWait(`蠕虫慢慢朝着${target_name}的尻穴深处进发……`);
        // CFLAG:314  = 5（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…请温柔地…温柔的侵犯人家的屁股吧…」`);
        // CFLAG:314  = 4（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「屁股小穴…居然有感觉了…明明很奇怪…明明很奇怪…」`,
        );
        // CFLAG:314  = 3（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 3;
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…屁股…太过分…太过分了…」`);
        // CFLAG:314  = 2（变量语义：CFLAG 族，314）
        kojo.肛门虫 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 13 &&
    era.get(`tequip:${target}:13`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「呼呼${heart(1)} 下次…用更粗的塞进来吗…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}淫荡地扭动着屁股……`);
      // CFLAG:374  = 4（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「哈…哈…后面的小穴…已经自己张开了…主人…${heart(1)}」`,
      );
      // CFLAG:374  = 3（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 3;
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊…这感觉…感觉越来越好了…呢…下次再多进去一点…」`,
      );
      // CFLAG:374  = 2（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 2;
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…终于…拔出去了…」`);
      // CFLAG:374  = 1（变量语义：CFLAG 族，374）
      kojo.肛门虫着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 14 && era.get(`tequip:${target}:14`)) {
    if (kojo.阴蒂夹 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「哈啊${heart(1)} 快用夹子夹住，快点${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人啊…好可怕…我会努力忍耐的…请…请随意玩弄…」`,
        );
      } else {
        await era.printAndWait(`「这、这难道是…不行！不不行！」`);
      }
      // CFLAG:315  = 1（变量语义：CFLAG 族，315）
      kojo.阴蒂夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼呼${heart(1)} 阴蒂夹的感觉${heart(1)}」`);
        await era.printAndWait(
          `「啊啊啊…好厉害…那里已经都黏糊糊的了${heart(1)}」`,
        );
        // CFLAG:315  = 4（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「唔…呼。主人…可以夹得更紧${heart(1)}」`);
        await era.printAndWait(`${target_name}被阴蒂夹爽到浑身痉挛……`);
        // CFLAG:315  = 3（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 3;
      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…好可怕…好可怕…！」`);
        // CFLAG:315  = 2（变量语义：CFLAG 族，315）
        kojo.阴蒂夹 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 14 &&
    era.get(`tequip:${target}:14`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈…小豆豆…想要…更多…${heart(1)}」`);
      // CFLAG:375  = 3（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「呼…呼…主人…可以夹得更紧…${heart(1)}」`);
      // CFLAG:375  = 2（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 2;
    } else if (kojo.阴蒂夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呼…呼…小豆豆…好辛苦…」`);
      // CFLAG:375  = 1（变量语义：CFLAG 族，375）
      kojo.阴蒂夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 15 && era.get(`tequip:${target}:15`)) {
    if (kojo.乳头夹 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「嘻嘻${heart(1)}…乳头的话…也没问题哦…${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「无论哪里都可以…胸部…已经有感觉了…快爱我…主人」`,
        );
      } else {
        await era.printAndWait(`「不要！请不要用这东西夹住乳房…嗯嗯嗯嗯嗯！」`);
      }
      // CFLAG:316  = 1（变量语义：CFLAG 族，316）
      kojo.乳头夹 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…这样弄的话${heart(1)} 乳房…要融化了${heart(1)}」`,
        );
        // CFLAG:316  = 4（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「乳头…已经勃起了…请更加用力地欺负我吧…魔王大人…」`,
        );
        // CFLAG:316  = 3（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 3;
      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「胸部…变…变奇怪了呢…」`);
        // CFLAG:316  = 2（变量语义：CFLAG 族，316）
        kojo.乳头夹 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 15 &&
    era.get(`tequip:${target}:15`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「是啊啊啊…乳房…好开心！…${heart(1)}」`);
      // CFLAG:376  = 3（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「主人…乳房都要融化了啦…」`);
      // CFLAG:376  = 2（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 2;
    } else if (kojo.乳头夹着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呼…呼…乳头…好像都不属于自己了…」`);
      // CFLAG:376  = 1（变量语义：CFLAG 族，376）
      kojo.乳头夹着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 16 && era.get(`tequip:${target}:16`)) {
    if (kojo.榨乳器 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「嗯…会变成乳牛的…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊…简直…就像变成母牛一样…${heart(1)}啊啊…乳汁漏出来了${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「讨厌…把${sc()}…当成奶牛了么……」`);
      }
      // CFLAG:317  = 1（变量语义：CFLAG 族，317）
      kojo.榨乳器 = 1;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…变成乳牛了啊啊啊啊啊…${heart(1)}」`);
        await era.printAndWait(`「啊…一会一起喝乳汁吧…呼呼呼呼${heart(1)}」`);
        // CFLAG:317  = 4（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「好多乳汁流出来了…好像…好厉害…啊…好舒服…${heart(1)}」`,
        );
        // CFLAG:317  = 3（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 3;
      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯…乳房…乳房被啊啊啊啊${heart(1)}」`);
        // CFLAG:317  = 2（变量语义：CFLAG 族，317）
        kojo.榨乳器 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 16 &&
    era.get(`tequip:${target}:16`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈${heart(1)} 到底流出了多少乳汁？」`);
      // CFLAG:377  = 3（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊…明明想要更多的……」`);
      // CFLAG:377  = 2（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 2;
    } else if (kojo.榨乳器着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊…请…放过我吧……」`);
      // CFLAG:377  = 1（变量语义：CFLAG 族，377）
      kojo.榨乳器着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 19 && era.get(`tequip:${target}:19`)) {
    if (kojo.肛珠 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「好…屁股里都被塞满了呢…被这个小玩具塞满了${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人啊…有点害怕呢…不过全部放进来也没关系！…只要魔王大人高兴就好${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `「啊啊啊！那种东西居然要全部放进来吗！肚子好痛！」`,
        );
      }
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320）
      kojo.肛珠 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼呼…后面被小珠珠塞满了…好棒的玩具${heart(1)}」`,
        );
        await era.printAndWait(
          `「在…摩擦着发出响声呢…呼呼${heart(1)} 好动听呢${heart(1)}」`,
        );
        await era.printAndWait(`「就是这样…不要…不要…不要拔出来${heart(1)}」`);
        // CFLAG:320  = 7（变量语义：CFLAG 族，320）
        kojo.肛珠 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼呼…后面被小珠珠塞满了…好棒的玩具${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊${heart(1)}整个人…都变得酥麻了…后面被塞得满满的……${heart(1)}」`,
        );
        // CFLAG:320  = 6（变量语义：CFLAG 族，320）
        kojo.肛珠 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…肚子好痛…全部放进来以后却好舒服…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}脸上浮现出短暂的痛苦，一边喘气一边妖艳地微笑着……`,
        );
        // CFLAG:320  = 5（变量语义：CFLAG 族，320）
        kojo.肛珠 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「全部…放进来了…主人…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}脸上浮现出痛苦，一边喘气一边妖艳地微笑着……`,
        );
        // CFLAG:320  = 4（变量语义：CFLAG 族，320）
        kojo.肛珠 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「屁股…好厉害…里面还在摩擦着发出响声！」`);
        // CFLAG:320  = 3（变量语义：CFLAG 族，320）
        kojo.肛珠 = 3;
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊…会好难受…肚子会好痛的…不可以…」`);
        // CFLAG:320  = 2（变量语义：CFLAG 族，320）
        kojo.肛珠 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 19 &&
    era.get(`tequip:${target}:19`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊啊啊啊${heart(1)} 内脏…好像都要被一起…拉出去了${heart(1)}」`,
      );
      // CFLAG:379  = 4（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 4;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「唔哦哦！全部都被揪出去了！小珠珠全都出去了啊啊！」`,
      );
      // CFLAG:379  = 3（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 3;
    } else if (
      (era.get(`abl:${target}:3`) || 0) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「居然全部…屁股小穴…有没尽兴呢…」`);
      // CFLAG:379  = 2（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 2;
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「哈…哈…终于结束了…」`);
      // CFLAG:379  = 1（变量语义：CFLAG 族，379）
      kojo.肛珠着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 20) {
    if (kojo.正常位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「嘶…${heart(1)} 好奇怪…明、明明…听说会很疼的呐…${heart(1)}」`,
            );
            await era.printAndWait(
              `「明……${heart(1)}明白了…一定是因为…成为魔王大人的专属肉便器…所以一点也不疼呢${heart(1)}」`,
            );
            await era.printAndWait(
              `阴茎反复在${target_name}的小穴进出着，并在子宫口用力地搅动……`,
            );
            await era.printAndWait(
              `「哦${heart(1)}…请…用力地…侵犯我${heart(1)} 小淫穴…还要更多${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}紧紧地搂住${player_name}，双腿还用力缠住${player_name}的腰向下压……`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(`「啊${heart(1)}…啊…哈…嗯……${heart(1)}」`);
              await era.printAndWait(
                `「啊…虽然很痛…但是好幸福${heart(1)} 魔王大人的肉棒${heart(1)}…顶…顶到子宫了呀…哎呀呀呀！」`,
              );
              await era.printAndWait(
                `${target_name}的身体向后蜷曲，发出了一声悲鸣。`,
              );
              await era.printAndWait(
                `「能够被…魔王大人侵犯…${heart(1)} 真是…好厉害的大肉棒，在小穴里抽动着${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}已经不会再想起故乡的恋人了……`,
              );
            } else {
              await era.printAndWait(`「啊${heart(1)}…啊…哈…唔……${heart(1)}」`);
              await era.printAndWait(
                `「啊…虽然很痛…但是好幸福${heart(1)} 魔王大人的肉棒${heart(1)}…顶…顶到子宫了呀…哎呀呀呀！」`,
              );
              await era.printAndWait(
                `${target_name}的身体向后蜷曲，发出了一声悲鸣。`,
              );
              await era.printAndWait(
                `「啊…嗯…没关系的${heart(1)} 刚、刚开始有感觉哦…还要更多才可以${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}流下了眼泪，被${player_name}抱在怀中……`,
              );
            }
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「呼呼${heart(1)} 大肉棒…顶到子宫了${heart(1)}」`,
            );
            await era.printAndWait(
              `「这具${heart(1)} 魔族的身体为什么…还能…哦…感觉到痛楚${heart(1)}」`,
            );
            await era.printAndWait(
              `「啊…主人身为魔族的大肉棒…好有感觉…明明是第一次啊${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}搂住${player_name}，双腿紧紧地缠住了${player_name}的腰。`,
            );
            await era.printAndWait(
              `「${scf()}、${sc()}…的第一次…就这么…献给你了${heart(1)}…好开心～！」`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「主人呐…好开心…${sc()}的处女…能够献给主人…好开心…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}流下了欢喜的泪水，${player_name}也操得更起劲了。`,
              );
              await era.printAndWait(
                `「${sc()}…今后…一直…一直都是主人的东西…啊啊啊～${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}有一瞬间想起了某个重要的人，但他马上就从脑海里消失了……`,
              );
            } else {
              await era.printAndWait(
                `「主人呐…好开心…${sc()}的处女…能够献给主人…好开心…」`,
              );
              await era.printAndWait(
                `${target_name}流下了欢喜的泪水，${player_name}也操得更起劲了。`,
              );
              await era.printAndWait(
                `双手被${player_name}压在身后，乳房被魔王大力吮吸还要忍耐着破瓜的痛楚。`,
              );
              await era.printAndWait(
                `「夺走这没用的贞操…主人您的大恩大德…没齿难忘…」`,
              );
            }
          }
        } else {
          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(`「对不起…对不起…呜呜呜呜…」`);
            await era.printAndWait(
              `${player_name}没有理会${target_name}的哀鸣，不停抽插着她的小穴。`,
            );
            await era.printAndWait(
              `${target_name}在此时想起了故乡的恋人,为自己的软弱留下了泪水……`,
            );
          } else {
            await era.printAndWait(`「呃…嗯…啊、啊啊啊啊！」`);
            await era.printAndWait(
              `${target_name}虽然咬紧牙关忍着破瓜的痛楚但还是留下了泪水……`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(`「啊…更多…抱住我用力插进来吧！${heart(1)}」`);
          await era.printAndWait(
            `${target_name}伸出双手缠住${player_name}，扭动着腰……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「主人啊…插进来…让我…完全属于你吧…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}爱慕地望着你……`);
        } else {
          await era.printAndWait(`「讨厌…就这样…被侵犯了…」`);
          await era.printAndWait(
            `${target_name}徒劳地左右摇头想要挣脱，但却被${player_name}无视了……`,
          );
        }
      }
      // CFLAG:321  = 1（变量语义：CFLAG 族，321）
      kojo.正常位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊…哦…再来${heart(1)} 好棒…不要停${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}放荡地乞求${player_name}的继续侵犯。`,
          );
          await era.printAndWait(
            `「更用力${heart(1)}…更用力地${heart(1)}…更用力地插进来啊啊啊子宫都有回音${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「这个小穴…已经是属于魔王大人的了${heart(1)}……唔噢噢～${heart(1)}请随你喜欢随便地插吧${heart(1)}${sc()}被操坏了也没关系哟${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}紧紧地搂住${player_name}，在魔王耳边发出了淫靡的呻吟，双腿还用力缠住${player_name}的腰向下压……`,
          );
          await era.printAndWait(
            `「好棒啊…超喜欢…魔王大人的小鸡鸡${heart(1)}…唔…啊啊…啊啊啊啊啊${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「好棒啊…嘻嘻${heart(1)} 很喜欢这个姿势呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「更多！${heart(1)} 再来！再插我！${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}紧紧地搂住${player_name}，在魔王耳边发出了淫靡的呻吟，双腿还用力缠住${player_name}的腰向下压……`,
          );
        }
        // CFLAG:321  = 6（变量语义：CFLAG 族，321）
        kojo.正常位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「主人啊…啊啊啊…要更激烈…地占有我…明…明明…哼啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}身下娇喘着，听着从腰部发出的甜美声响出神。`,
          );
          await era.printAndWait(
            `「哈啊…啊啊抱歉…好的…这个，好的……${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「啊，真是的……好…深…来喽…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}一脸淫荡的表情向${player_name}撒娇着。`,
          );
          await era.printAndWait(`「主人啊…吻我……${heart(1)}」`);
        } else {
          await era.printAndWait(`「啊…最喜欢主人了！…${heart(1)}」`);
          if (era.get(`talent:${target}:153`) !== 1) {
            await era.printAndWait(
              `「射了好多在里面…${heart(1)} 会不会生小孩呢…${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}双腿缠住了${player_name}的腰……`,
          );
        }
        // CFLAG:321  = 5（变量语义：CFLAG 族，321）
        kojo.正常位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这感觉…都很喜欢啊…已经离不开…哼？」`);
        // CFLAG:321  = 4（变量语义：CFLAG 族，321）
        kojo.正常位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不可以…但是…已经…无法抗拒…」`);
        // CFLAG:321  = 3（变量语义：CFLAG 族，321）
        kojo.正常位 = 3;
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊啊啊…不行…不行啊…！」`);
        await era.printAndWait(
          `${target_name}摇头抗拒着，但${player_name}却没有放过她的打算……`,
        );
        // CFLAG:321  = 2（变量语义：CFLAG 族，321）
        kojo.正常位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (kojo.背后位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊哈…魔王大人${heart(1)} 这里可从来没让别人使用过呢……${heart(1)}」`,
            );
            await era.printAndWait(
              `「请夺走我的贞操吧${heart(1)} 蹂躙我吧${heart(1)}…更用力地蹂躙我！${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}趴在地板上扭动着屁股要求更多。`,
            );
            await era.printAndWait(
              `${player_name}紧紧抱住${target_name}的屁股用力地插入……`,
            );
            await era.printAndWait(
              `「第一次就${heart(1)} 用这种${heart(1)} 羞耻的姿势～${heart(1)} 请魔王大人，用你高贵的阳物，在我身上烙下你的印记吧！${heart(1)}」`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(`${target_name}四肢着地将屁股高高翘起。`);
              await era.printAndWait(
                `「嗯…魔王大人…随你喜欢…${sc()}的小穴${heart(1)} 请随意享用吧${heart(1)}」`,
              );
              await era.printAndWait(
                `${player_name}双手将${target_name}的臀肉掰开，强烈的情欲气息充满了室内……`,
              );
              await era.printAndWait(
                `「初、初次见面…新鲜的小穴${heart(1)} 无论…是…是谁…都不许染指…${heart(1)} 只为了魔王大人的侵犯而保留到现在……${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}故乡恋人模糊的脸庞突然又清晰了起来。${player_name}刺穿处女膜的瞬间，那清晰的面容又碎裂了……`,
              );
              await era.printAndWait(
                `「啊啊！进来了${heart(1)}进来了${heart(1)} 肉棒进来了啊${heart(3)}」`,
              );
            } else {
              await era.printAndWait(`${target_name}四肢着地将屁股高高翘起。`);
              await era.printAndWait(
                `「嗯…魔王大人…请随意侵犯…${sc()}的小穴${heart(1)} 请随意享用吧${heart(1)}」`,
              );
              await era.printAndWait(
                `${player_name}双手将${target_name}的臀肉掰开，强烈的情欲气息充满了室内……`,
              );
              await era.printAndWait(
                `「因、因为是初次见面…还是第一次使用的小穴${heart(1)} 啊…啊…插${heart(1)}插进来了${heart(1)}」`,
              );
              await era.printAndWait(
                `「啊啊！插进来了${heart(1)}插进来了${heart(1)} 肉棒进来了啊${heart(3)}」`,
              );
            }
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「${sc()}对魔王大人的命令当然会遵从的…只是这样的姿势…真、真的好羞人呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}虽然说着不太情愿的话，但是却高兴的摇动起了臀部，像是邀请${player_name}的阴茎快点侵犯一样……`,
            );
            await era.printAndWait(
              `「啊啊啊…快、快点…快点插进来${heart(1)} 这个姿势…被仔细看着…会…很奇怪${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}的声音已经变得快要忍耐不住要哭出来一般，引诱着${player_name}。感受着${target_name}的爱意，${player_name}扶住扭动的腰臀用力插入……`,
            );
            await era.printAndWait(
              `「天啊…啊啊啊…大肉棒…${sc()}的处女被夺走了${heart(1)} 已经被打上魔王大人的印记了${heart(1)}」`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `${target_name}顺从地四肢着地，将屁股高高翘起。`,
              );
              await era.printAndWait(
                `「主人啊…好开心…${sc()}的处女…献给了主人…好开心…${heart(1)}」`,
              );
              await era.printAndWait(`「已…已经做好了觉悟了…啊…快…快点…！」`);
              await era.printAndWait(
                `${target_name}流下了开心的泪水，接受了你。`,
              );
              await era.printAndWait(
                `${target_name}突然间想起了重要的人，但转眼就又忘记了……`,
              );
            } else {
              await era.printAndWait(
                `${target_name}顺从地四肢着地，将屁股高高翘起。`,
              );
              await era.printAndWait(
                `「主人啊…好开心…${sc()}的处女…献给了主人…好开心…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}流下了开心的泪水，接受了你。`,
              );
            }
          }
        } else {
          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(
              `「这样…这样…不、不对啊…谁…来救救我…好…好痛！」`,
            );
            await era.printAndWait(
              `${target_name}被${player_name}抱住了腰部持续不断地抽插着。`,
            );
            await era.printAndWait(
              `${target_name}想到故乡的恋人，为自己的软弱流下了泪水……`,
            );
          } else {
            await era.printAndWait(`「哎…哎…啊、啊啊啊啊啊！」`);
            await era.printAndWait(`${target_name}忍受着破瓜的疼痛啜泣着。`);
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊哈${heart(1)} ${sc()}…像母狗一样……从后面被操了……${heart(1)}」`,
          );
          await era.printAndWait(`「啊啊啊…可是…好舒服…不要停…${heart(1)}」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「从后面吗…虽然有点害怕…但只要是主人的意愿…就没问题…好哟${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}趴在${player_name}的身下发出甜美的呻吟……`,
          );
        } else {
          await era.printAndWait(`「好过分…这样…像母狗一样…被侵犯…」`);
          await era.printAndWait(
            `${target_name}的腰部被${player_name}紧紧抱住后，毫不留情地抽插起来……`,
          );
        }
      }
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊…被欺负了${heart(1)} 被欺负了…${heart(1)}`,
          );
          await era.printAndWait(
            `${player_name}的阴茎激烈地抽插着${target_name}的小穴，带出的爱液飞溅，周围弥漫着淫荡的气息。`,
          );
          await era.printAndWait(
            `「啊哈…还要更多${heart(1)} 精液都倒流进子宫了${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「已经要${heart(1)} 操成淫荡的母狗了啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊哈${heart(1)}…啊哈${heart(1)}…好棒啊…哦…哦…不要…啊啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}发出淫兽一样的娇喘，配合着抽插的动作摇摆着臀部……`,
          );
        } else {
          await era.printAndWait(
            `「呼呼${heart(1)} 小穴…要被操坏了…不…不过…没关系，只要还能被侵犯就可以…${heart(1)}」`,
          );
          await era.printAndWait(
            `「已经舒服到…说不…出了话了…好厉害${heart(1)}」`,
          );
          await era.printAndWait(
            `「不要停${heart(1)}…再深一些${heart(1)}…用力地插进来啊啊啊！」`,
          );
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「嗯…连头部都不能动了……${heart(1)}」`);
          await era.printAndWait(
            `${target_name}被${player_name}从背后把头部按住，激烈地抽插着……`,
          );
          await era.printAndWait(
            `「啊啊…${sc()}…已经是你专属的了${heart(1)}…性奴了…大肉棒……好喜欢…${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「啊好棒！还要…还要更激烈…！」`);
          await era.printAndWait(
            `${target_name}像牝犬一样晃动着屁股向${player_name}乞求更多。`,
          );
          await era.printAndWait(
            `「人家…想要被主人玩到坏掉…${sc()}还想要更多${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「插坏掉也完全没关系…请随意享用啊…主人…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}挺动着腰部配合${player_name}的侵犯。`,
          );
          await era.printAndWait(
            `「人家…想要被主人玩到坏掉${heart(1)} 还想要更多${heart(1)}」`,
          );
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「请…更…用力…更激烈地插进来…」`);
        await era.printAndWait(`${target_name}像牝犬一样抬高屁股乞求更多……`);
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「明明很讨厌…可是…这奇怪的甜美感觉…」`);
        await era.printAndWait(
          `${target_name}的腰被紧紧抱住后发出了奇怪的呻吟……`,
        );
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这…啊…这种屈辱的姿势…」`);
        await era.printAndWait(
          `${target_name}一边被侵犯着一边流下了屈辱的泪水……`,
        );
        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 22) {
    if (kojo.对面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊啊${heart(1)} 自己的腰已经不受控制了…主人啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}被${player_name}抱住后露出了淫荡的表情……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「嘻嘻…被这样抱…感觉好羞人呢…不过，可以插得更激烈一点哦…」`,
          );
          await era.printAndWait(
            `${target_name}握住了${player_name}的手，享受着媾合的欢愉……`,
          );
        } else {
          await era.printAndWait(`「哎呀…请放开我…不行…这样的姿势…不可以！」`);
          await era.printAndWait(
            `${player_name}用力地抱住${target_name}的腰，下身用力地插了进去……`,
          );
        }
      }
      // CFLAG:323  = 1（变量语义：CFLAG 族，323）
      kojo.对面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「呼呼…喜欢…这个姿势哟${heart(1)}」`);
          await era.printAndWait(
            `「小穴似乎完全嵌合了…${heart(1)} 鸡鸡也要用力地顶上来啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}露出淫荡的表情紧紧抱住${player_name}……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「动、动得慢一点…${heart(1)} 是不是会让${sc()}更容易高潮呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `「可是好像也没有更…舒服${heart(1)}的样子${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}搂住${target_name}的腰缓慢抽动着，但渐渐地…变成了激烈的抽插。`,
          );
          await era.printAndWait(
            `「啊啊啊啊${heart(1)}…您的大恩大德…没齿难忘！…果、果然…还是激烈一些…更爽呢${heart(1)}」`,
          );
        } else {
          await era.printAndWait(`「啊哈${heart(1)} 亲亲…亲我嘛…${heart(1)}」`);
          await era.printAndWait(
            `「把骚货的…上下…两张嘴…一起堵上吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}在${player_name}耳边说着下流话……`,
          );
        }
        // CFLAG:323  = 6（变量语义：CFLAG 族，323）
        kojo.对面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「喜欢…好喜欢…主人…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}搂住${player_name}的脖子，腰部开始扭动起来……`,
          );
          await era.printAndWait(
            `「${scf()}、${sc()}也想主动一些…啊啊啊${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「哦…好棒啊…啊…唔哦…${heart(1)}」`);
          await era.printAndWait(
            `${target_name}随着腰部的动作，压抑不住地呻吟起来。`,
          );
          await era.printAndWait(
            `「啊哈…啊${heart(1)} 小穴…${heart(1)} 好舒服…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「主人…不动的话也没关系…${sc()}也想主动一些…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}紧紧搂住${player_name}的脖子，腰部开始上下扭动起来……`,
          );
          await era.printAndWait(
            `「呼呼…大…肉棒…插到…深处了…${heart(1)}啊啊啊啊${heart(1)}」`,
          );
        }
        // CFLAG:323  = 5（变量语义：CFLAG 族，323）
        kojo.对面座位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊啊啊…居然自己开始动了…讨厌…可是好舒服…不想停下来…」`,
        );
        await era.printAndWait(
          `${target_name}一边流泪一边卖力地扭动着腰，快感彻底击溃了理智……`,
        );
        // CFLAG:323  = 4（变量语义：CFLAG 族，323）
        kojo.对面座位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「感觉…好奇怪……不要，不要这样用力！」`);
        await era.printAndWait(
          `${target_name}的胴体哀求般地扭动着，却被${player_name}无视用力顶入……`,
        );
        // CFLAG:323  = 3（变量语义：CFLAG 族，323）
        kojo.对面座位 = 3;
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「可恶…这样…不行…啊！」`);
        await era.printAndWait(
          `${target_name}紧紧抱住${player_name}，忍受着由下而上的抽动……`,
        );
        // CFLAG:323  = 2（变量语义：CFLAG 族，323）
        kojo.对面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 23) {
    if (kojo.背面座位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait('');
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「啊啊${heart(1)}…温柔一点…这样…反而会更舒服也说不定呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的身体自然地追求着快感，渴求着${player_name}的插入……`,
          );
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(
            `「主人的身体…好暖和…胸部的触感…也很喜欢么？」`,
          );
          await era.printAndWait(
            `${player_name}用背抵住${target_name}的胸腹，开始慢慢转动腰部向下滑去……`,
          );
        } else {
          await era.printAndWait(`「哎呀…好可怕…啊啊！」`);
          await era.printAndWait(
            `${target_name}被${player_name}从身后抱住，肆意地抽动起来……`,
          );
        }
      }
      // CFLAG:324  = 1（变量语义：CFLAG 族，324）
      kojo.背面座位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(`「啊…哈…啊${heart(1)}」`);
          await era.printAndWait(
            `「从背后被操的感觉…好…好棒${heart(1)} 更…再激烈一些${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的小穴被肉棒搅动着，发出压抑不住的愉悦声……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊…啊啊${heart(1)}…大肉棒地形状…已经深深记在脑海里了…${heart(1)}」`,
          );
          await era.printAndWait(
            `小腹上鼓起小穴被阴茎贯穿的形状，${target_name}一边抚摸一边压抑不住地呻吟起来……`,
          );
          await era.printAndWait(
            `「啊啊快要被操坏了啊${heart(1)}…啊${heart(1)} 不要停！…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「好…好棒的感觉${heart(1)} 人家的小穴…被刺穿了${heart(1)}」`,
          );
          await era.printAndWait(
            `「${target_name}淫乱的小穴请多多惩罚吧${heart(1)}」`,
          );
        }
        // CFLAG:324  = 6（变量语义：CFLAG 族，324）
        kojo.背面座位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「人家${heart(1)}好！好舒服！主人${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}双手用力搓揉着${target_name}的乳房，阴茎更加用力地挺动着。`,
          );
          await era.printAndWait(
            `「啊…温柔什么的见鬼去吧…请、请更加激烈的侵犯人家！${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…鸡鸡的形状…已经清清楚楚咯…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}扭动着小腹摩擦着${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(`「${sc()}也…也想要动一下…啊啊啊！」`);
          await era.printAndWait(
            `${target_name}颤抖着向上抬动腰部，${player_name}追击似的再一次深深顶入……`,
          );
        }
        // CFLAG:324  = 5（变量语义：CFLAG 族，324）
        kojo.背面座位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…好舒服啊…腰已经自己动起来了…好奇怪…?」`);
        await era.printAndWait(
          `${target_name}的腰部开始上下摇动，贪婪地追求着更多快感……`,
        );
        // CFLAG:324  = 4（变量语义：CFLAG 族，324）
        kojo.背面座位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「人家还不习惯这种姿势…请放过我…」`);
        await era.printAndWait(
          `${target_name}哀求着想要逃开，${player_name}追击似的再一次深深顶入……`,
        );
        // CFLAG:324  = 3（变量语义：CFLAG 族，324）
        kojo.背面座位 = 3;
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「啊?啊啊…！不可以…这种姿势不可以！」`);
        await era.printAndWait(
          `${player_name}紧紧抓住${target_name}的腰部深深顶入……`,
        );
        // CFLAG:324  = 2（变量语义：CFLAG 族，324）
        kojo.背面座位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 26) {
    if (kojo.正常位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊…屁眼…${heart(1)} 完全被插进来了…好舒服呢${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊…就这样被魔王大人的精液刻下印记了呢${heart(1)}」`,
        );
        await era.printAndWait(`${target_name}开心地笑着，缩动了一下肛门……`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「${sc()}后面的小穴…主人只要你喜欢就好……${heart(1)}」`,
        );
        await era.printAndWait(
          `「只要主人能得到欢愉…用哪里侍奉都没有问题…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}高兴地掰开臀部接受${player_name}的蹂躏……`,
        );
      } else {
        await era.printAndWait(`「不、不行…那里明明是用来…啊！啊啊啊！」`);
        await era.printAndWait(
          `悲鸣着的${target_name}被用力按住，${player_name}愉快地从肛门插入了……`,
        );
      }
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327）
      kojo.正常位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊${heart(1)} ${sc()}居然…屁股小穴被插入…还这么高兴……${heart(1)}」`,
          );
          await era.printAndWait(`「高潮了……人家还真是个变态呢……${heart(1)}」`);
          await era.printAndWait(
            `${target_name}说着下流话让${player_name}肛交得更加起劲了……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「唔…被玩坏了…屁眼要被玩坏了…但是好舒服…要被玩坏了呀${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}欢喜地哽咽着，${player_name}的阴茎被缩紧的肛门死死吸住。`,
          );
          await era.printAndWait(
            `「人家是魔王大人…专用的肛交性奴…请用力地操进来${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊哈${heart(1)}…屁眼的快感在蔓延…好舒服…整个人都要酥软了${heart(1)}」`,
          );
          await era.printAndWait(
            `「侵犯后面…请一直从后面调教我吧…${heart(1)}」`,
          );
          await era.printAndWait(`${target_name}无法抑制地露出牝犬般的表情……`);
        }
        // CFLAG:327  = 7（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈${heart(1)}…屁眼的快感在蔓延…好舒服…整个人都要酥软了${heart(1)}」`,
        );
        await era.printAndWait(`「侵犯后面…请一直从后面调教我吧…${heart(1)}」`);
        // CFLAG:327  = 6（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊！屁股小穴！内部在被搅动！好舒服啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊哈！感觉好舒服！快乐得要死了啊！${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的脸上浮现出牝犬般的表情，沉醉在尻穴的快感中……`,
          );
        } else {
          await era.printAndWait(
            `「要被玩坏了啊…后面的小穴…主人…${heart(1)}」`,
          );
          await era.printAndWait(
            `「后面的小穴…今后就是专属于主人肉棒的了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的嘴角留着口水，沉醉在肛门的快感中……`,
          );
        }
        // CFLAG:327  = 5（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「只要主人要求…哪里都可以…唔！嗯?」`);
        await era.printAndWait(
          `${target_name}羞红了脸，一边被侵犯着尻穴一边发出了甜美的呻吟……`,
        );
        // CFLAG:327  = 4（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「尻穴的话…感觉好…奇怪…」`);
        await era.printAndWait(`${target_name}羞耻地用手捂着脸……`);
        // CFLAG:327  = 3（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 3;
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不…不要…好痛…拜托…快停下…」`);
        await era.printAndWait(
          `悲鸣着的${target_name}被用力按住，${player_name}愉快地从肛门插入了……`,
        );
        // CFLAG:327  = 2（变量语义：CFLAG 族，327）
        kojo.正常位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (kojo.背后位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「这次的调教是……${heart(1)} 从后面…被侵犯喽${heart(1)} 屁眼…也没问题哟${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊啊啊啊啊…这样被侵犯着…插得…好深…后面的小穴要被玩坏了呀${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「从、从后面……屁股洞洞吗……好的${heart(1)}」`);
        await era.printAndWait(`「啊…好厉害…这无法压抑的快感……${heart(1)}」`);
        await era.printAndWait(
          `${target_name}背部向后仰起，欢喜地呻吟了出来……`,
        );
      } else {
        await era.printAndWait(`「不、不行…不要这么用力…真的不！啊啊啊！」`);
        await era.printAndWait(
          `${target_name}被你用力按住，从肛门狠狠地侵犯了……`,
        );
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊…${heart(1)} 那种程度的插入${heart(1)} 就已经受不了啦…好厉害${heart(1)}」`,
          );
          await era.printAndWait(
            `「后、后面…已经这样敏…敏感了么…啊…这甜美的快感${heart(1)}」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊…唔…${heart(1)} 淫荡母狗${target_name}的屁眼…请用力地插进来！${heart(1)}」`,
          );
          await era.printAndWait(
            `「嗯嗯…啊${heart(1)}…主人的大肉棒${heart(1)}…哈啊啊啊啊啊啊…好…好厉害…${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「呼呼…后面的小穴…已经可以随意玩弄了${heart(1)} 不插前面也没有关系…请务必狠狠地操我后面的小穴吧！${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊啊…请让我成为…主人…专用的肛交性奴吧${heart(1)}」`,
          );
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…${heart(1)} 那种程度的插入${heart(1)} 就已经受不了啦…好厉害${heart(1)}」`,
        );
        await era.printAndWait(
          `「后、后面…已经这样敏…敏感了么…啊…这甜美的快感${heart(1)}」`,
        );
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「高！高潮了！…肛门…原来…也可以这么舒服…${heart(1)}」`,
          );
          await era.printAndWait(
            `「更…还要更多！请随意的玩弄人家的屁眼吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}一下又一下用力地插动阴茎，${target_name}的臀部上泛起了情欲的肉感……`,
          );
        } else {
          await era.printAndWait(`「屁股…好舒服…舒服的要疯了！」`);
          await era.printAndWait(
            `「满了…被塞满了！主人的大肉棒好厉害${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}的阴茎完全插入${target_name}的后庭，尻穴里的黏膜被带动着翻卷起来……`,
          );
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人的鸡鸡…好热…好舒服啊…」`);
        await era.printAndWait(
          `${target_name}的肛门收缩，用力地缠住${player_name}的阴茎……`,
        );
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好舒服…舒服的…后面…已…已经要融化了……」`);
        await era.printAndWait(
          `${target_name}抬起臀部，${player_name}毫不犹豫地再次顶入……`,
        );
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「拜托…好痛…请放过我…放过我吧…」`);
        await era.printAndWait(
          `${player_name}无视着身下的悲鸣，用力地插进${target_name}的肛门……`,
        );
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 28) {
    if (kojo.对面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊…插到底了…屁眼被贯穿了……${heart(1)}」`);
        await era.printAndWait(`「更多…好可爱的大鸡鸡${heart(3)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人的脸…越看越性感呢…?」`);
        await era.printAndWait(`「快感从屁股小穴…扩散开来了…」`);
      } else {
        await era.printAndWait(
          `「不、不行…那里插的太深…了！全、全都进来了！」`,
        );
      }
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329）
      kojo.对面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊啊啊啊${heart(1)}屁眼…甜美的感觉…啊哈…更用力地顶进来${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}奄奄一息仍乞求${player_name}从身下的侵犯……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「不要${heart(1)}…不要停${heart(1)}…快感…快感在蔓延…${sc()}要被玩坏了…玩坏了啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}抱住${player_name}的腰贪婪地渴求更多……`,
          );
        } else {
          await era.printAndWait(
            `「啊啊啊…插到底了…整根…啊啊…都进来了${heart(1)}」`,
          );
          await era.printAndWait(
            `「屁眼已经…舒服得要高潮了${heart(1)} 全都插进来吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}撒娇般地抱住了${player_name}……`,
          );
        }
        // CFLAG:329  = 7（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊…插到底了…屁眼被贯穿了${heart(1)}」`);
        await era.printAndWait(
          `「屁眼已经…舒服得要高潮了${heart(1)} 全都插进来吧${heart(1)}」`,
        );
        // CFLAG:329  = 6（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「啊…主人！更用力…顶进来！${heart(1)}」`);
          await era.printAndWait(
            `${target_name}颤抖着抱住${player_name}的腰贪婪地渴求更多……`,
          );
        } else {
          await era.printAndWait(`「主人…感觉好奇怪…?」`);
          await era.printAndWait(
            `${target_name}被${player_name}的强力抽插操到奄奄一息了……`,
          );
        }
        // CFLAG:329  = 5（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈…哈…主人啊…好喜欢…好喜欢……${heart(1)}」`);
        await era.printAndWait(
          `${target_name}被侵犯的同时在${player_name}耳边继续爱的低语…`,
        );
        // CFLAG:329  = 4（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「后面的小穴…好舒服…快要…高潮了…」`);
        // CFLAG:329  = 3（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 3;
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「又…全部插进来…好痛…好痛啊…」`);
        // CFLAG:329  = 2（变量语义：CFLAG 族，329）
        kojo.对面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 29) {
    if (kojo.背面座位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊哈${heart(1)} 屁眼…已经被开发得很好了${heart(1)}」`,
        );
        await era.printAndWait(`「整个…屁眼被塞得满满的…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人…紧紧地抱我…」`);
        await era.printAndWait(
          `「从后面还是有点害怕…啊…啊啊啊…进来、来了……${heart(1)}」`,
        );
        await era.printAndWait(`「这样感受主人的大鸡鸡…有点奇怪呢……?」`);
      } else {
        await era.printAndWait(`「啊、痛！…插得好深…咿！好痛啊！」`);
      }
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330）
      kojo.背面座位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈${heart(1)} 屁眼…里面已经变成大肉棒的形状了${heart(1)} 不要拔出来！${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的肛门痉挛着收缩起来，用力地缠住${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(
            `「屁眼好舒服${heart(1)}…啊…更…用力地操进来吧${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}摇摆着臀部，肛门主动吞吐着${player_name}的阴茎……`,
          );
        }
        // CFLAG:330  = 7（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「屁眼好舒服${heart(1)}…啊…更…用力地操进来吧${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}摇摆着臀部，肛门主动吞吐着${player_name}的阴茎……`,
        );
        // CFLAG:330  = 6（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「肛门…好舒服…不行了啊啊啊啊…！」`);
          await era.printAndWait(
            `${target_name}摇摆着臀部，肛门主动吞吐着${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(`「好舒服…主人！好舒服…不要拔出来！」`);
          await era.printAndWait(
            `${target_name}的肛门痉挛着收缩起来，用力地缠住${player_name}的阴茎……`,
          );
        }
        // CFLAG:330  = 5（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哈啊…主人…后面的小穴…好舒服呢…」`);
        await era.printAndWait(
          `${target_name}摇摆着臀部，肛门主动吞吐着${player_name}的阴茎……`,
        );
        // CFLAG:330  = 4（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「后面的小穴…好舒服呢…啊…好喜欢主人的大肉棒…这样插进来…啊啊！」`,
        );
        await era.printAndWait(
          `${target_name}的肛门被调教的十分敏感，颤抖着扭动腰部沉浸在更多的快感中……`,
        );
        // CFLAG:330  = 3（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 3;
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哎呀…好奇怪…这样…好奇怪…」`);
        // CFLAG:330  = 2（变量语义：CFLAG 族，330）
        kojo.背面座位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if (kojo.手淫 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊…大肉棒…还在抖动着${heart(1)} 嗯～真是好可爱呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}一边说着一边用手指紧紧地缠住${player_name}的阴茎……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人的大肉棒…好可爱…要好好抚摸呢。」`);
        await era.printAndWait(
          `${target_name}一边淫笑着一边用手指紧紧地缠住${player_name}的阴茎……`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `「像这样…侍奉…大鸡鸡可以么？…呵呵…好可爱呢……」`,
        );
      } else {
        await era.printAndWait(`「哎、哎呀…好可怕…用手去摸的话…有点害怕…」`);
        await era.printAndWait(
          `${target_name}提心吊胆地摸着${player_name}的阴茎……`,
        );
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「大鸡鸡…哈哈${heart(1)} 大鸡鸡正在被人家套弄${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊${heart(1)}…用手就感觉到了…啊啊…光是…套弄着就让人家的阴蒂硬起来了${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用力地搓揉着${player_name}的阴茎，脸上露出淫荡的笑容……`,
          );
        } else {
          await era.printAndWait(
            `「啊啊…大肉棒…还在抖动着${heart(1)} 嗯～真想全部塞进下体呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}温柔地套弄起${player_name}的阴茎，脸上露出温柔的笑容`,
          );
          await era.printAndWait(
            `「可以射出来哦${heart(1)} ${sc()}的手也很舒服吗${heart(1)}」`,
          );
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…大肉棒…还在抖动着${heart(1)} 嗯～真想全部塞进下体呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}用力地搓揉着${player_name}的阴茎，脸上露出饥渴的表情……`,
        );
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「啊哈，这样可以吗？还是更用力些？」`);
          await era.printAndWait(
            `${target_name}脸上带着微笑，用力地搓揉着${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(
            `「已经这么硬邦邦的了…好可爱…好想亲一下呢…?」`,
          );
          await era.printAndWait(
            `${target_name}卖力地套弄起${player_name}的阴茎，脸上露出饥渴的表情……`,
          );
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人的大肉棒…好可爱…需要更用力些吗？」`);
        await era.printAndWait(
          `${target_name}脸上带着微笑，用力地搓揉着${player_name}的阴茎……`,
        );
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「大鸡鸡…好热…好可爱…」`);
        await era.printAndWait(
          `${target_name}熟练地搓揉起${player_name}的阴茎……`,
        );
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哎呀…这样好讨厌」`);
        await era.printAndWait(
          `${target_name}一副快要哭出来的表情，提心吊胆地套弄着${player_name}的阴茎……`,
        );
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if (kojo.口交_奴 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊…用嘴来服务吗${heart(1)} 没有问题哦${heart(1)}」`,
        );
        await era.printAndWait(
          `「唔${heart(1)}…嗯${heart(1)}…哦…嗯…大肉棒也很美味呢${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}仿佛饥渴的野兽一样发出呻吟，生涩地用舌头舔弄着${player_name}的阴茎……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊唔…嗯…嗯…嗯嗯…呼呼…肉棒…在嘴里跳动着…${heart(1)}」`,
        );
        await era.printAndWait(
          `「大鸡鸡…好美味…${heart(1)} 唔嗯…唔嗯${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}没有任何犹豫地蹲在${player_name}两腿之间开始吮吸肉棒……`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「用嘴巴…应该可以的吧…」`);
        await era.printAndWait(`「只，只是舔一下的话…?」`);
      } else {
        await era.printAndWait(`「那里…不舔不行吗…？」`);
        await era.printAndWait(
          `${target_name}蹲在${player_name}的胯下，踌躇地舔弄着你的阴茎……`,
        );
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊…用嘴来服务吗${heart(1)} 没有问题哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「唔${heart(1)}…嗯${heart(1)}…哦…嗯…大肉棒也很美味呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}仿佛饥渴的野兽一样发出呻吟，熟练地用舌头裹住${player_name}的阴茎……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「真是的${heart(1)}…只有尝过…主人的大鸡巴${heart(1)}…人生才算圆满呐…${heart(1)}」`,
          );
          await era.printAndWait(
            `「嘴巴已经习惯这根…大鸡巴了哟…哈…好好吃${heart(1)}…龟头漏出的…淫液…承蒙款待${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌头缠绕着龟头不停舔弄，发出一阵阵用力地啜吸声……`,
          );
        } else {
          await era.printAndWait(
            `「啊哈${heart(1)}…${sc()}的嘴巴…请塞满吧…唔唔${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的嘴被肉棒整根没入，抵到了深处。`,
          );
          await era.printAndWait(
            `「嘴巴已经习惯这根${heart(1)}…大鸡巴了哟${heart(1)}…哈…好好吃…啊哈…随便射吧…射进嘴里吧${heart(1)}」`,
          );
        }
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊唔…嗯…嗯…嗯嗯…呼呼…肉棒…在嘴里跳动着…${heart(1)}」`,
          );
          await era.printAndWait(
            `「主人的肉棒…好美味…${heart(1)} 唔嗯…更多${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}用舌头温柔侍奉着${player_name}的阴茎，脸上露出了微笑……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊哈…大肉棒…好喜欢${heart(1)} 又硬又热的大肉棒…好精神呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `「全身上下都是属于您的${heart(1)}…想用哪里来侍奉都可以…想射出来也可以…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}爱慕地望着${player_name}，舌头也在附和着……`,
          );
        } else {
          await era.printAndWait(
            `「啊唔${heart(1)}…呼呼${heart(1)}…嗯…嗯～～～${heart(3)}」`,
          );
          await era.printAndWait(
            `${target_name}用牙齿轻轻划过龟头，黏糊糊的舌头缠绕着肉棒。`,
          );
          await era.printAndWait(
            `性奋地${target_name}眯起了眼睛，更加卖力地舔吸起肉棒……`,
          );
        }
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「唔…嗯…唔嗯…这样可以吗…舒服吗…？」`);
        await era.printAndWait(`${target_name}仰望着你，细心地用嘴服务着……`);
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「居然…啊呜…要用…我的…嘴…」`);
        await era.printAndWait(
          `${target_name}眼眶里泪珠打转，努力地舔弄着${player_name}的阴茎……`,
        );
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 32) {
    if (kojo.乳交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊哈…${sc()}的胸部也不放过么${heart(1)}」`);
        await era.printAndWait(
          `「好啊…乳交什么的${heart(1)} 还没试过呢${heart(1)}人家的乳房也很可爱哟${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「哈啊…乳交吗…${sc()}的胸部…也算有了用武之地呢${heart(1)}`,
          );
        }
        await era.printAndWait(
          `${target_name}淫荡地笑着，用胸部紧紧地夹住${player_name}的阴茎……`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「${sc()}的乳房也能为主人服务了…人家好开心呢，主人」`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「主人曾说过…喜欢大大的胸部呢${heart(1)}」`);
        }
        await era.printAndWait(
          `${target_name}脸上露出淫猥的笑容，温柔地用胸部夹住${player_name}的阴茎……`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「用乳房吗？…只、只要魔王大人舒服怎样都好…」`);
        await era.printAndWait(`${target_name}微笑着用胸部夹住你的阴茎……`);
      } else {
        await era.printAndWait(`「用乳房夹住…什么的…」`);
        await era.printAndWait(
          `${target_name}害羞地用胸部夹住${player_name}的阴茎……`,
        );
      }
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333）
      kojo.乳交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呼呼…大肉棒好精神${heart(1)}…胸部也很舒服呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈呼…好奇怪${heart(1)} 明明只是简单地夹住…为什么心情会这么愉悦${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「啊啊…胸部够大真的是太好了${heart(1)} 还可以这样～使用${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}色情地托住胸部，上下摩擦着${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(`「啊啊乳交什么的好喜欢呢${heart(1)}」`);
          await era.printAndWait(
            `「呼…最喜欢乳交了${heart(1)} 嗯…好开心${heart(1)}」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「呼呼${heart(1)}…${sc()}的大咪咪…又要被射得黏糊糊了呢${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `${target_name}色情地托住胸部，上下摩擦着${player_name}的阴茎……`,
          );
        }
        // CFLAG:333  = 7（变量语义：CFLAG 族，333）
        kojo.乳交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嘻嘻…很喜欢${sc()}的胸部吗${heart(1)}」`);
        await era.printAndWait(
          `「好啊…乳交什么的${heart(1)} 还没试过呢${heart(1)}人家的乳房也很可爱哟${heart(1)}」`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「呼呼${heart(1)}…${sc()}的大咪咪…又要被射得黏糊糊了呢${heart(1)}`,
          );
        }
        await era.printAndWait(
          `${target_name}脸上露出淫猥的笑容，温柔地用胸部夹住${player_name}的阴茎……`,
        );
        // CFLAG:333  = 6（变量语义：CFLAG 族，333）
        kojo.乳交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(`「哈…哈…主人…胸部侍奉得舒服吗？」`);
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「啊啊${heart(1)}大肉棒被夹的紧紧地呢${heart(1)}」`,
            );
          }
          await era.printAndWait(
            `「呼呼…${sc()}连…连人家也性奋…起来了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}高兴地笑着，用胸部紧紧地夹住${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(
            `「${sc()}的乳房也能为主人服务呢…人家好开心呢，主人」`,
          );
          if (
            era.get(`talent:${target}:110`) === 1 ||
            era.get(`talent:${target}:114`) === 1 ||
            era.get(`talent:${target}:119`) === 1
          ) {
            await era.printAndWait(
              `「主人曾说过…喜欢大大的胸部呢${heart(1)}」`,
            );
          }
          await era.printAndWait(`「呼…大肉棒好热…好喜欢${heart(1)}」`);
          await era.printAndWait(
            `${target_name}脸上露出淫猥的笑容，温柔地用胸部夹住${player_name}的阴茎……`,
          );
        }
        // CFLAG:333  = 5（变量语义：CFLAG 族，333）
        kojo.乳交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「${sc()}的乳房也能为主人服务呢…人家好开心，主人」`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「主人曾说过…喜欢大大的胸部呢${heart(1)}」`);
        }
        await era.printAndWait(
          `${target_name}脸上露出淫猥的笑容，温柔地用胸部夹住${player_name}的阴茎……`,
        );
        // CFLAG:333  = 4（变量语义：CFLAG 族，333）
        kojo.乳交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好舒服…只要舒服就好…${sc()}也好开心…」`);
        await era.printAndWait(
          `${target_name}害羞地笑着，用胸部夹住${player_name}的阴茎……`,
        );
        // CFLAG:333  = 3（变量语义：CFLAG 族，333）
        kojo.乳交 = 3;
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「难道这样心情就会好么…真奇怪…」`);
        await era.printAndWait(
          `${target_name}笨拙地用胸部夹住${player_name}的阴茎……`,
        );
        // CFLAG:333  = 2（变量语义：CFLAG 族，333）
        kojo.乳交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 33) {
    if (kojo.股间性交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊…大鸡鸡已经热成这样了么…啊哈…没问题…无论用哪里服务都可以哦${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊${heart(1)}…啊…鸡巴…摩擦的温度${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「呵呵，只要主人喜欢，什么都可以…这样真的能让你舒服吗…${heart(1)}」`,
        );
        await era.printAndWait(`「主人好色哟……」`);
      } else {
        await era.printAndWait(`「这样…就可以吗…？」`);
      }
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334）
      kojo.股间性交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…请…不要再挑逗${sc()}了…${heart(1)}…好想被操啊…${heart(1)}」`,
        );
        await era.printAndWait(
          `「真是的…用这根大鸡鸡…${heart(1)} 来夺走人家的处女吗…${heart(1)}」`,
        );
        await era.printAndWait(
          `「放错地方了啦！${heart(1)}放错地方啦！${heart(1)}嘻嘻，开玩笑的…快来吧${heart(1)}」`,
        );
        // CFLAG:334  = 6（变量语义：CFLAG 族，334）
        kojo.股间性交 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…大鸡鸡好热…啊哈…用大腿…来做吗${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊啊啊${heart(1)}…啊…鸡鸡…摩擦的温度${heart(1)}」`,
        );
        await era.printAndWait(
          `「大腿深处…爱液…已经流出来了…啊啊啊啊…${heart(1)}」`,
        );
        // CFLAG:334  = 5（变量语义：CFLAG 族，334）
        kojo.股间性交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`talent:${target}:0`) === 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「这滚烫的大肉棒…什么时候才会插进${sc()}的小穴呢？主人…${heart(1)}」`,
        );
        await era.printAndWait(`「摩擦摩擦…什么时候才能被破处啊…?」`);
        await era.printAndWait(
          `无视已经发情的呢喃，${player_name}火热的肉棒在${target_name}大腿之间继续摩擦……`,
        );
        // CFLAG:334  = 4（变量语义：CFLAG 族，334）
        kojo.股间性交 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哎呀…大肉棒离小穴这么近…却不插进来吗…？」`);
        await era.printAndWait(
          `${target_name}眼泪往往地夹紧大腿，露出了失望的表情……`,
        );
        // CFLAG:334  = 3（变量语义：CFLAG 族，334）
        kojo.股间性交 = 3;
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯…这样就会舒服吗？…啊啊啊…肉棒在抖动…」`);
        // CFLAG:334  = 2（变量语义：CFLAG 族，334）
        kojo.股间性交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (kojo.骑乘位 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        if (era.get(`talent:${target}:76`) === 1) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「这…这种姿势吗，${sc()}可是第一次呢…没办法呢…${heart(1)}」`,
            );
            await era.printAndWait(
              `「谁让这是${heart(1)}…魔王大人的命令，所以啊…一定要按魔王大人要求的～做～呢」`,
            );
            await era.printAndWait(
              `${target_name}露出淫荡的笑容，慢慢地坐了下去。`,
            );
            await era.printAndWait(
              `「啊啊啊啊…呼…魔王大人的大鸡鸡${heart(1)}…${sc()}的小穴${heart(1)}…已经…融为一体…了啊${heart(1)}`,
            );
            await era.printAndWait(
              `「不行…啊，不行${heart(1)}…还没动起来…呢${heart(1)} 啊啊啊${heart(1)}」`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「嘿嘿嘿${heart(1)} ${sc()}的处女…是留给魔王大人的呢${heart(1)}」`,
              );
              await era.printAndWait(
                `「啊啊…啊…没、没关系…只是有一点痛…啊啊啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `不知为何${target_name}突然想起连面容都已模糊的故乡恋人，不过转瞬又遗忘了。`,
              );
              await era.printAndWait(
                `${target_name}迟疑了一瞬，${player_name}用力刺进了小穴，鲜血顺着阴茎向下流出。`,
              );
              await era.printAndWait(
                `「哈…哈…嘿嘿嘿…这个小穴以后就是专属于魔王大人的东西了${heart(1)}」`,
              );
              await era.printAndWait(
                `「啊啊啊${heart(1)}…为什么…哭了？…不对…这是侍奉魔王大人…流下的喜悦的泪水吧……」`,
              );
            } else {
              await era.printAndWait(
                `「嘿嘿嘿${heart(1)} ${sc()}的处女…是留给魔王大人的呢${heart(1)}」`,
              );
              await era.printAndWait(
                `「啊啊…啊…没、没关系…只是有一点痛…啊啊啊啊${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}慢慢坐到了底，痛得呼吸艰难。`,
              );
              await era.printAndWait(
                `「哈…哈…嘿嘿嘿…这个小穴以后就是专属于魔王大人的东西了${heart(1)}」`,
              );
              await era.printAndWait(
                `「啊啊啊${heart(1)}…更多…以后${heart(1)}…要和魔王大人做更多更色的事哟${heart(1)}」`,
              );
            }
          }
        } else if (era.get(`talent:${target}:85`) === 1) {
          if (era.get(`talent:${target}:314`) === 9) {
            await era.printAndWait(
              `「啊啊…魔王大人…${sc()}是…属于你的…因为…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}面带笑容慢慢坐到了底。处女膜被刺穿后突然想到了什么。`,
            );
            await era.printAndWait(
              `「小穴…好痛…啊…能够…与主人合为一体…好、好开心${heart(1)}」`,
            );
            await era.printAndWait(
              `「嗯…啊啊${heart(1)}…痛…明明…啊…明明还很痛${heart(1)}…可是腰…已经不自觉地……${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}扭动着腰部，引导着魔王的阴茎插入小穴最深处。`,
            );
            await era.printAndWait(
              `「啊啊…主人的大肉棒…好可爱${heart(1)} 欲罢不能了${heart(1)}」`,
            );
          } else {
            if (era.get(`talent:${target}:317`) === 4) {
              await era.printAndWait(
                `「呼…${sc()}的第一次…是献给…啊啊…啊…魔王…魔王大人的……！」`,
              );
              await era.printAndWait(
                `${target_name}流下了欢喜的眼泪，随着处女膜被刺穿，${player_name}的整根阴茎都插了进去。`,
              );
              await era.printAndWait(
                `「啊啊…啊…${sc()}…${sc()}的全部…都是属于主人的…啊啊…啊啊啊啊！」`,
              );
              await era.printAndWait(
                `${target_name}突然间好像想起了谁，但转眼又忘了……`,
              );
            } else {
              await era.printAndWait(`「主人啊…全部都…奉献给你……」`);
              await era.printAndWait(
                `「嘿嘿…真的，主人…这就奉上…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}面带笑容坐到了底。象征处女的黏膜被慢慢刺穿。`,
              );
              await era.printAndWait(
                `「小穴…啊…进来了…全部…全部都…插进来了…请尽情地使用吧…」`,
              );
              await era.printAndWait(
                `${target_name}失身的疼痛被忽视了，高兴地开始慢慢扭动腰部……`,
              );
            }
          }
        } else {
          if (era.get(`talent:${target}:317`) === 4) {
            await era.printAndWait(`「或、或许…这样还…好硬…！」`);
            await era.printAndWait(
              `「对不起…原谅我…原谅我，啊…全部…都进来了…啊…啊啊啊！」`,
            );
            await era.printAndWait(
              `${target_name}亲自向${player_name}献上了自己的贞操。`,
            );
            await era.printAndWait(
              `随后${target_name}想起了故乡的恋人，为自己的软弱流下了眼泪……`,
            );
          } else {
            await era.printAndWait(`「或、或许…这样还…好硬…！」`);
            await era.printAndWait(`「啊！全部…都进来了…痛…好痛啊！」`);
            await era.printAndWait(
              `${target_name}亲自向${player_name}献上了自己的贞操……`,
            );
          }
        }
      } else {
        if (era.get(`talent:${target}:76`) === 1) {
          await era.printAndWait(
            `「嘿嘿嘿${heart(1)}…小蜜穴可是很享受呢${heart(1)}」`,
          );
          await era.printAndWait(`「啊…老实说这种程度还不够呀…${heart(1)}」`);
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.printAndWait(`「主人…${sc()}…也会努力扭动的…！」`);
          await era.printAndWait(`「主人的…全部都进来了…好舒服……${heart(1)}」`);
        } else {
          await era.printAndWait(`「啊啊…插到最深处…好痛…」`);
        }
      }
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「哈…现在…这辆可爱的鸡鸡列车已经到站了${heart(1)}…啊啊全部进站了啊啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}淫猥地扭动腰部，小穴吞吐着整根阴茎。`,
          );
          await era.printAndWait(
            `「啊…主人的…啊啊…大鸡鸡好厉害${heart(1)}…再激烈一点${heart(1)}…操坏…也没有关系啊${heart(1)}」`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「啊啊${heart(1)}…真是没想到…居然会这么舒服…啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的身体随着${player_name}的动作上下起伏着，腰部忘情地扭动着要求更多。`,
          );
          await era.printAndWait(
            `「啊${heart(1)}…哼${heart(1)}…高潮${heart(1)}…小穴要高潮了…啊啊啊啊啊～～！！！」」`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「这根大鸡巴${heart(1)}…是${sc()}的宝贝呢…谁…谁都别想抢走…${heart(1)}」`,
          );
          await era.printAndWait(
            `「呼呼呼…啊…大鸡巴…好厉害${heart(1)}…大鸡巴…好厉害啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}带着无上幸福的表情，细细地品味着${player_name}的阴茎……`,
          );
        } else {
          await era.printAndWait(
            `「小穴…已经到尽头了…啊…大鸡鸡${heart(1)}…全部都进来了${heart(1)}」`,
          );
          await era.printAndWait(
            `「子宫口亲亲…好舒服…嗯${heart(1)}高潮了${heart(1)}要高潮了…${heart(1)}」`,
          );
          await era.printAndWait(
            `「啊…淫乱的${sc()}请随意操…操坏…操坏也没关系…用力地插进来吧…${heart(1)}」`,
          );
        }
        // CFLAG:335  = 6（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(
            `「主人…想要射精也没问题…不要拔出去啊啊啊啊…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}的腰部前后摇动着，一次又一次地迎接${player_name}的大肉棒深深顶进小穴……`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「主人的大肉棒…一次比一次深入…好厉害啊啊啊${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}颤抖着，一次又一次地迎接${player_name}的大肉棒深深顶进小穴……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(
            `「还是这样从下面插进来…更有感觉呢${heart(1)}」`,
          );
          await era.printAndWait(
            `${player_name}充满爱意地享受着${target_name}大肉棒由下而上的抽动……`,
          );
        } else {
          await era.printAndWait(`「主人！主人? 主人啊${heart(3)}」`);
          await era.printAndWait(
            `${target_name}不知疲倦般地扭动腰部，渴求着${player_name}的阴茎……`,
          );
        }
        // CFLAG:335  = 5（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(4) === 0) {
          await era.printAndWait(`「不行…腰部…不受控制了…可是好舒服…咿！」`);
          await era.printAndWait(
            `${target_name}皱着眉头，一副快要哭出来的样子，但是腰仍然在扭动着渴求更多……`,
          );
        } else if (rand_n(3) === 0) {
          await era.printAndWait(
            `「居然！？可以这么舒服…！腰部已经…不由自主地动起来了…！」`,
          );
          await era.printAndWait(
            `${target_name}被快感击溃，腰部拼命地扭动着渴求着更多……`,
          );
        } else if (rand_n(2) === 0) {
          await era.printAndWait(`「不要啊…虽然感觉好舒服…好可怕！」`);
          await era.printAndWait(
            `${target_name}在${player_name}的身上自我矛盾着，身体却不由自主地高潮了……`,
          );
        } else {
          await era.printAndWait(`「不行了…腰…快要断了似的…但是好舒服…咿！」`);
          await era.printAndWait(
            `${target_name}被快感击溃，腰部拼命地扭动着渴求着更多……`,
          );
        }
        // CFLAG:335  = 4（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这样…腰部这样动的话…可以吗…？」`);
        await era.printAndWait(`${target_name}在你的命令下生硬地扭动腰部……`);
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哈…呼…像这样…可以吗…？」`);
        await era.printAndWait(`${target_name}在你的命令下生硬地扭动腰部……`);
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 35) {
    if (kojo.全身擦洗 === 0) {
      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `「哈…奇怪…明明心情很好…为什么会觉得很奇怪呢…」`,
        );
      } else {
        await era.printAndWait(`「嗯，嗯…这样可以了吗？？」`);
        await era.printAndWait(`「啊啊抱歉…粘糊糊的…做…啊啊啊！」`);
      }
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336）
      kojo.全身擦洗 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嘿嘿嘿…身上哪个部位最漂亮呢…是那里和…这里啊…${heart(1)}…那里？${heart(1)}…真的吗？」`,
        );
        await era.printAndWait(
          `「呼呼${heart(1)}…既然是最漂亮的部位${heart(1)}…被射满精液的话会不会更漂亮？」`,
        );
        // CFLAG:336  = 5（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「主人的身体和…${sc()}都洗干净了呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊哈…不行啊…恶作剧那么多…哼${heart(1)}…啊哈${heart(1)}…嗯哼${heart(1)}」`,
        );
        // CFLAG:336  = 4（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哎…胸部又脏了…${sc()}的乳房可是很漂亮的呢${heart(1)}」`,
        );
        // CFLAG:336  = 3（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 3;
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「这样就…好了…什么…啊啊！」`);
        await era.printAndWait(`「粘糊糊的…做…又…啊啊啊」`);
        // CFLAG:336  = 2（变量语义：CFLAG 族，336）
        kojo.全身擦洗 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 36) {
    if (kojo.骑乘位肛交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊哈${heart(1)}…用屁眼侍奉吗${heart(1)}」`);
        await era.printAndWait(
          `「好厉害${heart(1)} 大鸡鸡…抖动着…又变大了${heart(1)}…好棒${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「主人的大肉棒…${sc()}用屁股洞洞来侍奉吗…${heart(1)}」`,
        );
        await era.printAndWait(
          `「主人只要躺着就好…呼…好热…屁股好像都要融化了…${heart(1)}」`,
        );
      } else {
        await era.printAndWait(`「要${sc()}…自己动吗…唔嗯…啊…」`);
        await era.printAndWait(`「啊啊…在扩张着…后面的小穴…在扩张…唔……！」`);
      }
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337）
      kojo.骑乘位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「呼呼呼${sc()}的屁眼已经越来越有感觉了${heart(1)}…今后就是魔王大人的鸡鸡专属的了${heart(1)}」`,
          );
          await era.printAndWait(
            `「还想要更多嘛，${heart(1)} 用大鸡鸡在体内刻下印记吧${heart(1)}」`,
          );
        } else {
          await era.printAndWait(
            `「啊哈${heart(1)} 地方插对了，整个身体都跟着愉悦起来了呢${heart(1)}」`,
          );
          await era.printAndWait(
            `「加上…心情也变好了…腰部居然也开始不由自主地…扭动起来了呢${heart(1)}」`,
          );
        }
        // CFLAG:337  = 7（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「嘻嘻${heart(1)}…用后面的小穴来侍奉么${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊${heart(1)}后面的小穴…已经越来越有感觉了…好棒${heart(1)}…好棒${heart(1)}」`,
        );
        // CFLAG:337  = 6（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait(
            `「啊啊啊…好棒！屁股小穴好舒服！主人啊！请原谅我！原谅我！」`,
          );
          await era.printAndWait(
            `${target_name}淫荡地抖动着腰部，追求更多的快感…`,
          );
        } else {
          await era.printAndWait(
            `「明明是后面那里…可为什么这么舒服…好奇怪啊…主人帮帮我…${heart(1)}」`,
          );
          await era.printAndWait(
            `${target_name}一面说着一面开始激烈地扭动臀部，后面的小穴也不由自主地收缩起来…`,
          );
        }
        // CFLAG:337  = 5（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「屁股小穴也…只要是主人的要求都可以${heart(1)}」`,
        );
        await era.printAndWait(`「啊啊啊…快要被撑破了${heart(1)}」`);
        // CFLAG:337  = 4（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哎…屁眼居然也可以这么舒服…腰都情不自禁地扭动起来了…！」`,
        );
        // CFLAG:337  = 3（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 3;
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「又…啊啊啊啊啊啊啊…哎呀…哎呀…」`);
        // CFLAG:337  = 2（变量语义：CFLAG 族，337）
        kojo.骑乘位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if (kojo.肛门侍奉 === 0) {
      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「是…只要是魔王大人…怎样…都…可以…」`);
        await era.printAndWait(
          `${target_name}高兴地笑着，伸出舌头舔弄${player_name}的肛门……`,
        );
      } else {
        await era.printAndWait(
          `「好讨厌…啊…啊啊…MUA…这样…啊啊…真的…无法接受……！」`,
        );
        await era.printAndWait(
          `${target_name}含着泪，伸出舌头舔弄${player_name}的肛门……`,
        );
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼呼呼呼…嗯嗯…真是美味呢${heart(1)}」`);
        await era.printAndWait(
          `「真是没想到…自己…啊啊啊啊…连舌头都如此淫荡了么${heart(1)} 还想要服务更多${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}黏糊糊的舌头将${player_name}肛门的深处都清洁了……`,
        );
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼啊…主人的肛门很美味呢…我舔…啊呜${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}欢喜地颤抖着舌头继续服务${player_name}的肛门……`,
        );
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好吧…我舔…不过…还是挺…」`);
        await era.printAndWait(
          `${target_name}一丝不苟地服务着${player_name}的肛门……`,
        );
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `「老实说…啊…啊啊…MUA…这样…啊啊…还是…有点奇怪……！」`,
        );
        await era.printAndWait(
          `${target_name}含着泪，伸出舌头舔弄${player_name}的肛门……`,
        );
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 40) {
    if (kojo.打屁股 === 0) {
      await era.printAndWait(
        `「这是……要做什么！？呀！好痛！好可怕！快停下呀！」`,
      );
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341）
      kojo.打屁股 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「呼嗯${heart(1)}…被惩罚…还这么兴奋的我真是个变态呢…请继续啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}的拍打下发出了欢喜的淫叫声……`,
        );
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「惩罚我！欺负我！狠狠地责备，这么下流的我吧！……魔王大人啊～?${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}在${player_name}的巴掌下发出了欢喜的淫叫声……`,
        );
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 4;
        return 0;
      } else if (
        (era.get(`mark:${target}:0`) || 0) === 3 &&
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「痛…痛啊…啊啊！…忍耐…好像…也不是不能忍耐……啊！啊啊啊！」`,
        );
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 3;
        return 0;
      } else if (kojo.打屁股 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「不！不啊！痛呀！停啊啊！」`);
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341）
        kojo.打屁股 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 41) {
    if (kojo.鞭 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「呼…该如何惩罚淫荡的${target_name}呢${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「请多关照…啊啊…请温柔一些哦……啊！」`);
      } else {
        await era.printAndWait(`「快停下！好痛！好痛！这样好痛啊！」`);
      }
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342）
      kojo.鞭 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…呼呀…不行…不要停止惩罚！…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}鞭痕累累的身体发出了愉悦的叫声。`,
        );
        await era.printAndWait(
          `「还是这样…更有感觉吗…请继续…继续惩罚我吧…不要停呀！！啊啊啊啊啊啊啊啊啊啊！！」`,
        );
        await era.printAndWait(
          `${target_name}扭动着身体希望被鞭打得更多，私处的汁液不停飞溅出来……`,
        );
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…${target_name}还真是越来越变态了呢…请继续…继续惩罚我吧${heart(1)}」`,
        );
        await era.printAndWait(
          `「呀啊${heart(1)}…啊啊啊…好棒…啊啊啊啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${player_name}的皮鞭无情抽打${target_name}的身躯，娇喘声随着鞭子的舞动起伏着……`,
        );
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…被惩罚了…${heart(1)}」`);
        await era.printAndWait(`${target_name}拼命忍耐着皮鞭抽打身体的痛苦……`);
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不要停！用力地抽打吧！」`);
        await era.printAndWait(`「请继续鞭打我！惩罚我吧！」`);
        await era.printAndWait(
          `在${player_name}的皮鞭无情抽打下，${target_name}两腿之间爱液泌出了……`,
        );
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「身体的！感觉…变奇怪了呀${heart(1)}」`);
        await era.printAndWait(
          `在${player_name}的皮鞭无情抽打下，${target_name}的双腿不停摩擦忍耐着……`,
        );
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊…真是的…啊啊！原谅你了哟…一点都不痛…」`);
        await era.printAndWait(
          `${target_name}在鞭子抽打下扭动着身体强行忍耐着……`,
        );
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「痛！痛啊…啊啊…明明很痛…可是那里却痒痒的…」`);
        await era.printAndWait(
          `在${player_name}的皮鞭无情抽打下，${target_name}的双腿不停摩擦忍耐着……`,
        );
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「好痛…好痛…不…不…不行！好过分！好过分啊！」`);
        await era.printAndWait(`「身体的疼痛…已经…快到极限了……」`);
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342）
        kojo.鞭 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 42) {
    if (kojo.针 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊啊…敏感的地方…请…请刺…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「拜托…一定要温柔哦…」`);
      } else {
        await era.printAndWait(`「停，停下…那个太…不行…不行不行不行！！」`);
      }
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343）
      kojo.针 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「可以的…刺得好深…好…更多…啊啊…${heart(1)}」`);
        await era.printAndWait(
          `${target_name}细嫩的皮肤轻易地被针刺破，血珠涌出来的同时却发出了快乐的喘息声……`,
        );
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈啊？…啊啊啊…停…好、好奇怪…针头的感觉…啊啊啊…变奇怪了……」`,
        );
        await era.printAndWait(
          `${target_name}对被针刺后皮肤上传来的疼痛麻痹茫然失措……`,
        );
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「不可以啊啊啊…啊啊…那、那个…刺得好深！」`);
        await era.printAndWait(`${target_name}尖叫着承受针头尖锐的疼痛……`);
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「哦哦！身体…在渴求更多…更多呀…！」`);
        await era.printAndWait(
          `${target_name}细嫩的皮肤轻易地被针刺破，血珠涌出来的同时却发出了快乐的喘息声……`,
        );
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…只要是主人…只有主人…才会让我变奇怪啊！」`,
        );
        await era.printAndWait(
          `${target_name}对被针刺后皮肤上传来的疼痛麻痹茫然失措……`,
        );
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「可以的…只要是主人的…怎样都是可以的…」`);
        await era.printAndWait(`${target_name}承受着针头尖锐的疼痛……`);
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好奇怪…被针扎…身体却在发烫…感觉好甜蜜…」`);
        await era.printAndWait(
          `${target_name}对被针刺后皮肤上传来的疼痛麻痹茫然失措……`,
        );
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 3;
      } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「快拿走！不要啊！好痛啊讨厌讨厌！」`);
        await era.printAndWait(`${target_name}哭叫着承受针头尖锐的疼痛……`);
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）
        kojo.针 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「新玩意儿吗？」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「戴上以后…心里很忐忑啊…主人」`);
      } else {
        await era.printAndWait(`「人家好…好害怕…请早点摘掉…」`);
      }
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `（心里七上八下的…主人把眼睛蒙上…我已经准备好了哟）`,
        );
        await era.printAndWait(`${target_name}期待得双腿不停摩擦起来……`);
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `（呼呼…光是眼睛被蒙上…身体就期待得发热了…${heart(1)}）`,
        );
        await era.printAndWait(`${target_name}沉默又性奋地期待着……`);
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`（会发生什么呢…我已经准备好了…?）`);
        await era.printAndWait(`${target_name}沉默又性奋地期待着……`);
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `（心里七上八下的…主人把眼睛蒙上…我已经准备好了哟）`,
        );
        await era.printAndWait(`${target_name}期待得双腿不停摩擦起来。`);
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`（呼呼…光是眼睛被蒙上…身体就期待得发热了…）`);
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`（主人…我已经准备好了哟…）`);
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`（眼睛被蒙住了…有点可怕…忐忑呢…）`);
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`（可恶…${sc()}…将会被怎么样…？）`);
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈……」`);
      // CFLAG:380  = 3（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「主人啊…眼睛被蒙上以后…看不到你的脸会很寂寞呢…」`,
      );
      // CFLAG:380  = 2（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 2;
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`${target_name}脸上露出了安心的表情。`);
      // CFLAG:380  = 1（变量语义：CFLAG 族，380）
      kojo.眼罩着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 44 && era.get(`tequip:${target}:44`)) {
    if (kojo.绳子 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊…绑得好紧…感觉有点奇怪…${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人…把人家绑住…有点害怕呢…」`);
      } else {
        await era.printAndWait(`「好可怕…求你快点解开好么…」`);
      }
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345）
      kojo.绳子 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊…又绑…不光是身体…心里…啊…啊啊${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}紧紧地被绳子束缚，爱液顺着双腿潺潺流出……`,
        );
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哈…啊啊…又…要被绑起来玩弄了么…呼呼…${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}随着熟悉的束缚感眼眶不自觉地湿润了……`,
        );
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「啊啊啊…又要被绑起来么…呼${heart(1)}」`);
        await era.printAndWait(`${target_name}高兴地接受了……`);
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「被绑起来…说不定更有感觉呢…${heart(1)}」`);
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「又被绑住了…不知为何心跳得好厉害……${heart(1)}」`,
        );
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「害怕…但是主人的话…就没问题」`);
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「紧绷绷的束缚感…${sc()}，变得好奇怪了呀」`);
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 3;
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「好可怕…求求你快点解开…」`);
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）
        kojo.绳子 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 44 &&
    era.get(`tequip:${target}:44`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.绳子着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…哈…啊啊啊…明明还没问题的…${heart(1)}」`);
      // CFLAG:385  = 3（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「这次…仿佛连${sc()}的心都被绑住了呢…」`);
      // CFLAG:385  = 2（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 2;
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`${target_name}被解开后长出了一口气。`);
      // CFLAG:385  = 1（变量语义：CFLAG 族，385）
      kojo.绳子着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 45 && era.get(`tequip:${target}:45`)) {
    if (kojo.口塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「唔…唔…哈…真是的${heart(1)}」`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「唔…呼…」`);
        await era.printAndWait(
          `${target_name}的呼吸变得粗重，鼻翼兴奋地张合着……`,
        );
      } else {
        await era.printAndWait(`「唔…！唔呀！嗯嗯！嗯唔嗯！」`);
      }
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346）
      kojo.口塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…呼…嗯…呼${heart(1)}」`);
        await era.printAndWait(`${target_name}的口塞上有口水慢慢流下……`);
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…呼…嗯…呼${heart(1)}」`);
        await era.printAndWait(
          `${target_name}的呼吸变得粗重，鼻翼兴奋地张合着……`,
        );
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…呼…嗯…呼${heart(1)}」`);
        await era.printAndWait(`${target_name}无法说话，只能用鼻音哀鸣着……`);
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…嗯…嗯…唔！…唔！」`);
        await era.printAndWait(`${target_name}的口塞上有口水慢慢流下……`);
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…嗯…嗯…唔！…唔！」`);
        await era.printAndWait(
          `${target_name}的呼吸变得粗重，鼻翼兴奋地张合着……`,
        );
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…嗯…嗯…唔！…唔！」`);
        await era.printAndWait(`${target_name}无法说话，只能用鼻音哀鸣着……`);
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…嗯…嗯…唔！…唔！」`);
        await era.printAndWait(
          `${target_name}的呼吸变得粗重，鼻翼兴奋地张合着……`,
        );
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 3;
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「唔…唔…呼！唔！」`);
        await era.printAndWait(`${target_name}害怕得不行。`);
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346）
        kojo.口塞 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 45 &&
    era.get(`tequip:${target}:45`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊哈…哈…哈…哈…主人…${heart(1)}」`);
      // CFLAG:386  = 3（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「唔唔…哈…哈…主人啊…」`);
      // CFLAG:386  = 2（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 2;
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `随着口塞被取出，${target_name}终于长出了一口气。`,
      );
      // CFLAG:386  = 1（变量语义：CFLAG 族，386）
      kojo.口塞着脱 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 46 && era.get(`tequip:${target}:46`)) {
    if (kojo.灌肠肛塞 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊…流进来了…灌肠液…流进来了啊啊${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「唔…难过…好难过…主人…」`);
      } else {
        await era.printAndWait(`「肚子…好难受…快停下…放过我…放过我吧…」`);
      }
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347）
      kojo.灌肠肛塞 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「唔唔…在发烫…灌肠液在发烫${heart(1)}」`);
        await era.printAndWait(
          `「哈啊…啊啊哼${heart(1)} 肛门…肛门…啊啊啊…塞子…要喷出来了！${heart(1)}」`,
        );
        // CFLAG:347  = 7（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊啊啊…流进来了…灌肠液…流进来了啊啊${heart(1)}」`,
        );
        await era.printAndWait(`「肚子里…咕噜咕噜地响起来……」`);
        // CFLAG:347  = 6（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…更多…再多注入一些吧…」`);
        await era.printAndWait(`「肚子在咕噜咕噜地响呢」`);
        // CFLAG:347  = 5（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「好难受…但…还可以继续…主人啊…」`);
        // CFLAG:347  = 4（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「更多…再多注入一些吧！肚子咕噜咕噜地响…快要喷出来了啊！」`,
        );
        // CFLAG:347  = 3（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 3;
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「难受…好难受啊…快停下…谁来救救我…」`);
        // CFLAG:347  = 2（变量语义：CFLAG 族，347）
        kojo.灌肠肛塞 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 46 &&
    era.get(`tequip:${target}:46`) === 0
  ) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「啊…拔出去的一瞬间…主人啊啊啊啊啊啊啊${heart(1)}」`,
      );
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「好舒服…不，不要…不要看那里！」`);
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(
        `「啊啊啊啊啊啊啊啊啊…哇啊啊啊啊啊啊…啊啊…啊……啊啊你……」`,
      );
      await era.printAndWait(`${target_name}肛门喷出粪便的同时嚎啕大哭起来……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 55) {
    if (kojo.放置PLAY === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}被冷落了……`);
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「啊，那个…发生什么了……？」`);
        await era.printAndWait(`${target_name}一脸不明状况的表情……`);
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「为什么停下…不做色色的事情了吗…？」`);
        await era.printAndWait(`${target_name}一脸欲求不满的表情……`);
      } else {
        await era.printAndWait(`「……发生了什么？」`);
        await era.printAndWait(`${target_name}好奇地眨了眨眼……`);
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `蠕虫继续在${target_name}的小穴里蠕动，不知疲倦地搅动着阴道。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `蠕虫继续在${target_name}的肛门里不知疲倦地蠕动着。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(`${target_name}肛门中的肛珠依旧在发挥着作用……`);
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `私处上的电动阴蒂夹持续地刺激着${target_name}。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(`乳头上的夹子持续地刺激着${target_name}。`);
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(
          `乳房上安装的榨乳器依旧在持续地从${target_name}双峰中榨取乳汁。`,
        );
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被飞机杯套弄着，充血的龟头快要射精一般微微颤抖。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}的眼罩依旧戴着。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}依旧被绳子束缚着身体。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `被灌肠液注入的${target_name}肚子在咕噜咕噜地作响，好像下一秒肛塞就要被排泄物顶出来了。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `电极在肛门里持续震动，电流在无时不刻地折磨着${target_name}的括约肌。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然而，水晶球依然在记录着${target_name}的一举一动……`,
        );
      }
      // CFLAG:356  = 1（变量语义：CFLAG 族，356）
      kojo.放置PLAY = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`${target_name}被冷落了……`);
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「喂，喂…拜托…不要做到一半就…快点回来继续嘛…」`,
        );
        await era.printAndWait(
          `${player_name}的手被拉住，${target_name}的眼睛因为发情而湿润了……`,
        );
        // CFLAG:356  = 6（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「喂喂…快来继续玩弄人家嘛…${heart(1)}」`);
        // CFLAG:356  = 5（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人…怎么突然停下了…？」`);
        await era.printAndWait(`「${scf()}，${sc()}…好奇怪呢…」`);
        // CFLAG:356  = 4（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人啊…光是这么看着的话…会害羞」`);
        await era.printAndWait(`${target_name}脸红了……`);
        // CFLAG:356  = 3（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 3;
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「……发生了什么？」`);
        await era.printAndWait(`${target_name}好奇地眨了眨眼……`);
        // CFLAG:356  = 2（变量语义：CFLAG 族，356）
        kojo.放置PLAY = 2;
      }
      await era.print('');

      if (era.get(`tequip:${target}:11`)) {
        await era.printAndWait(
          `蠕虫继续在${target_name}的小穴里蠕动，不知疲倦地搅动着阴道。`,
        );
      }

      if (era.get(`tequip:${target}:13`)) {
        await era.printAndWait(
          `蠕虫继续在${target_name}的肛门里不知疲倦地蠕动着。`,
        );
      }

      if (era.get(`tequip:${target}:19`)) {
        await era.printAndWait(`${target_name}肛门中的肛珠依旧在发挥着作用……`);
      }

      if (era.get(`tequip:${target}:14`)) {
        await era.printAndWait(
          `私处上的电动阴蒂夹持续地刺激着${target_name}。`,
        );
      }

      if (era.get(`tequip:${target}:15`)) {
        await era.printAndWait(`乳头上的夹子持续地刺激着${target_name}。`);
      }

      if (era.get(`tequip:${target}:16`)) {
        await era.print(
          `乳房上安装的榨乳器依旧在持续地从${target_name}双峰中榨取乳汁。`,
        );
      }

      if (era.get(`tequip:${target}:17`)) {
        await era.printAndWait(
          `${target_name}的阴茎被飞机杯套弄着，充血的龟头快要射精一般微微颤抖。`,
        );
      }

      if (era.get(`tequip:${target}:43`)) {
        await era.printAndWait(`${target_name}的眼罩依旧戴着。`);
      }

      if (era.get(`tequip:${target}:44`)) {
        await era.printAndWait(`${target_name}依旧被绳子束缚着身体。`);
      }

      if (era.get(`tequip:${target}:46`)) {
        await era.printAndWait(
          `被灌肠液注入的${target_name}肚子在咕噜咕噜地作响，好像下一秒肛塞就要被排泄物顶出来了。`,
        );
      }

      if (era.get(`tequip:${target}:49`)) {
        await era.printAndWait(
          `电极在肛门里持续震动，电流在无时不刻地折磨着${target_name}的括约肌。`,
        );
      }

      if (era.get(`tequip:${target}:53`)) {
        await era.printAndWait(
          `然而，水晶球依然在记录着${target_name}的一举一动……`,
        );
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(`${master_name}让${target_name}做个自我介绍。`);
        if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // 同一行输出：无后缀 PRINTFORM 连续不换行，
          // 末行 PRINTFORML 才收行。SIF ABL:31 >= 3 只护住
          // 那一段——条件提到语句外当取值，文本留在输出语句里（#625）
          const masturbation_note = (era.get(`abl:${target}:31`) || 0) >= 3;
          await era.print(
            `于是${target_name}将自己的本名、之前的性体验` +
              (masturbation_note ? '还有一个人手淫的时候想着谁之类的' : '') +
              `面带微笑的说了出来……`,
          );
          await era.printAndWait(
            `水晶球前的${target_name}一边说着，一边不自觉地弄湿了股间……`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.print(`${target_name}露出下流的神色开始了自我介绍。`);
          await era.printAndWait(
            `「你、你好…我叫${sc()}原来${target_name}可是个所谓的勇者呢」`,
          );
          await era.printAndWait(
            `「嗯、嗯可是…自从被…魔王大人调教以后，${sc()}已经…变成了一个好色的女孩了…大家都是见证人哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「魔王大人…真的好色哦…把${sc()}身上所有能插的洞洞…全都操了个遍哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈${heart(1)}…不过人家也很喜欢这样…现在连不自慰的时候，脑子里也在想色色的事情呐${heart(1)}」`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.print(`${target_name}向着水晶球开始了自我介绍。`);
          await era.printAndWait(
            `「您好…${sc()}是…爱恋着${master_name}的人呢…还、还有点不好意思呢…${heart(1)}」`,
          );
          await era.printAndWait(
            `「嘿…不光是被外表吸引…${master_name}也是非常温柔的…现在每天都过的很快乐呢。${heart(1)}」`,
          );
          await era.printAndWait(`「所以啊…大家不用担心呐…」`);
          await era.printAndWait(
            `「有多被宠爱吗？…下面就给大家演示一下…眼睛不要眨哦」`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          await era.print(
            `${target_name}一边对水晶球自我介绍着，一边淫靡地扭摆着腰臀。`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          await era.print(`${target_name}向着水晶球开始了自我介绍。`);
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`${target_name}耷拉着脑袋一言不发。`);
        }
      } else {
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边淫靡地扭动着腰臀，一边与${player_name}说着情话。`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边淫靡地扭动着腰臀，一边继续对${player_name}说着下流的话语。`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同一行输出：无后缀 PRINTFORM/
          // PRINT 连续不换行，末行 PRINTFORML 才收行。前段工具档与
          // ELSE 三档互斥——条件提到语句外当取值，文本留在输出语句里（#625）
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
            `${target_name}一边竭力按捺住` +
              (overwhelmed_by_tool
                ? '快乐的'
                : overwhelmed_by_pain
                  ? '痛苦的'
                  : '自己的') +
              `声音，一边努力地回应着${player_name}。`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.print(
            `${target_name}一边淫靡地扭动着腰臀，一边与${player_name}说着下流的话。`,
          );
          await era.printAndWait(`「更想用下面的嘴来聊天呢…」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          await era.print(`${target_name}淫靡地扭动着腰臀抱住了魔王`);
          await era.printAndWait(`「主人啊…一直在我身边呢……」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          await era.print(`${target_name}唯唯诺诺的回应着${player_name}。`);
          await era.printAndWait(`「嗯，啊，是…」`);
        } else {
          await era.print(`${target_name}只是认真的聆听着…`);
        }
      }
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`) === 1) {
        await era.print(`${master_name}催促着${target_name}来个自我介绍，`);
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边对水晶球说着情话，一边淫靡地扭动着腰臀。`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边对水晶球说着下流的话，一边淫靡地扭动着腰臀。`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (
          rand_n(3) === 0 &&
          (era.get(`talent:${target}:89`) ||
            (era.get(`abl:${target}:17`) || 0) >= 5)
        ) {
          // 同组的一整行（#625）
          const masturbation_note = (era.get(`abl:${target}:31`) || 0) >= 3;
          await era.print(
            `于是${target_name}将自己的本名、之前的性体验` +
              (masturbation_note ? '还有一个人手淫的时候想着谁之类的' : '') +
              `面带微笑的说了出来……`,
          );
          await era.print(
            `水晶球前的${target_name}一边说着，一边不自觉地弄湿了股间……`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.print(`${target_name}露出下流的神色开始自我介绍`);
          await era.printAndWait(
            `「你、你好…我叫${target_name}……原来的${sc()}可是个所谓的勇者呢」`,
          );
          await era.printAndWait(
            `「嗯、嗯可是…自从被…魔王大人调教以后，${sc()}已经…变成了一个好色的女孩了…大家都是见证人哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「魔王大人…真的好色哦…把${sc()}身上所有能插的洞洞…全都插了个遍哦${heart(1)}」`,
          );
          await era.printAndWait(
            `「哈${heart(1)}…不过人家也很喜欢这样…现在连不自慰的时候，脑子里也在想色色的事情呐${heart(1)}」`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (era.get(`talent:${target}:85`) === 1) {
          await era.print(`${target_name}对着水晶球开始自我介绍`);
          await era.printAndWait(
            `「您、您好…${sc()}已经…已经成为${master_name}的恋人了…${heart(1)}」`,
          );
          await era.printAndWait(
            `「嘿嘿嘿…很漂亮吧…魔王大人也非常温柔…每天都过的很快乐嘛。${heart(1)}」`,
          );
          await era.printAndWait(`「所以啊…大家不用担心呐。…」`);
          await era.printAndWait(
            `「有多被爱吗？…那么从现在开始表演了…眼睛不要眨哦」`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            (era.get(`abl:${target}:11`) || 0) >= 5)
        ) {
          await era.print(
            `${target_name}一边这么说着下流的话，一边对水晶球淫靡地扭腰摆臀。`,
          );
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else if (
          (era.get(`abl:${target}:10`) || 0) >= 3 ||
          (era.get(`abl:${target}:11`) || 0) >= 4 ||
          (era.get(`abl:${target}:17`) || 0) >= 2
        ) {
          await era.print(`${target_name}对着水晶球开始了自我介绍。`);
          // TFLAG:32 |= 2（变量语义：TFLAG 族，32）
          game.kojo.录像内容 |= 2;
        } else {
          await era.printAndWait(`${target_name}耷拉着脑袋一言不发。`);
        }
      } else {
        if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:85`) ||
            (era.get(`abl:${target}:10`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边淫靡地扭动着腰臀，一边与${player_name}说着情话。`,
          );
        } else if (
          era.get(`palam:${target}:5`) >= PALAMLV[4] &&
          (era.get(`talent:${target}:76`) ||
            (era.get(`abl:${target}:11`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          await era.print(
            `${target_name}一边淫靡地扭动着腰臀，一边继续对${player_name}说着下流的话语。`,
          );
        } else if (
          (era.get(`palam:${target}:4`) >= PALAMLV[4] ||
            (era.get(`abl:${target}:10`) || 0) >= 5 ||
            era.get(`talent:${target}:85`) ||
            era.get(`talent:${target}:76`)) &&
          era.get(`palam:${target}:5`) >= PALAMLV[4]
        ) {
          // 同组的一整行（#625）
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
            `${target_name}一边竭力按捺住` +
              (overwhelmed_by_tool
                ? '快乐的'
                : overwhelmed_by_pain
                  ? '痛苦的'
                  : '自己的') +
              `声音，一边努力地回应着${player_name}。`,
          );
        } else if (era.get(`talent:${target}:76`) === 1) {
          await era.print(
            `${target_name}一边淫靡地扭动着腰臀，一边与${player_name}说着下流的话。`,
          );
          await era.printAndWait(`「更想用下面的嘴来聊天呢…」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[4] ||
          era.get(`talent:${target}:85`) ||
          (era.get(`abl:${target}:10`) || 0) >= 5
        ) {
          await era.print(`${target_name}淫靡地扭动着腰臀抱住了魔王`);
          await era.printAndWait(`「主人啊…一直在我身边呢……」`);
        } else if (
          era.get(`palam:${target}:4`) >= PALAMLV[2] ||
          (era.get(`abl:${target}:10`) || 0) >= 3
        ) {
          await era.print(`${target_name}唯唯诺诺的回应着${player_name}。`);
          await era.printAndWait(`「嗯，啊，是…」`);
        } else {
          await era.print(`${target_name}只是认真的聆听着…`);
        }
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 123) {
    if (kojo.乳夹口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，嘴巴含弄着从乳沟中露出的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「呼呼…${sc()}这么大的胸部…居然还能漏出来…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「唔…大鸡鸡好有精神${heart(1)} 人家也很舒服呢${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，俏皮地亲吻着从乳沟中露出充血的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「呼呼${heart(1)}…${sc()}这么大的胸部…居然还能漏出来…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「chu${heart(1)}…好喜欢呢${heart(1)}…还在抖动着…啊啊啊…大肉棒好精神…真的好喜欢…${heart(1)}」`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，舌头不断舔弄着从乳沟中露出的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「唔…这样欺负人家的胸部…啊哈${heart(1)}」`);
        }
        await era.printAndWait(`「chu…唧啾${heart(1)}…呼…感觉如何…啊…？」`);
      } else {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，无奈地舔弄着从乳沟中露出充血的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「唔…这样欺负人家的胸部…」`);
        }
        await era.printAndWait(`「chu…唧啾…呼…哈…哈…唧啾……」`);
      }
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360）
      kojo.乳夹口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，嘴巴含弄着从乳沟中露出的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「呼呼…${sc()}这么大的胸部…居然还能漏出来…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「唔…大鸡鸡好有精神${heart(1)} 人家也很舒服呢${heart(1)}」`,
        );
        // CFLAG:360  = 5（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，俏皮地亲吻着从乳沟中露出充血的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(
            `「呼呼${heart(1)}…${sc()}的胸部可不小哦…这样还是裹不住呢…${heart(1)}」`,
          );
        }
        await era.printAndWait(
          `「chu${heart(1)}…好喜欢呢${heart(1)}…还在抖动着…啊啊啊…大肉棒好精神…真的好喜欢…${heart(1)}」`,
        );
        // CFLAG:360  = 4（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，舌头不断舔弄着从乳沟中露出的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「唔…这样欺负人家的胸部…啊哈${heart(1)}」`);
        }
        await era.printAndWait(`「chu…唧啾${heart(1)}…呼…感觉如何…啊…？」`);
        // CFLAG:360  = 3（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 3;
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}用胸夹住${master_name}的阴茎，无奈地舔弄着从乳沟中露出充血的龟头。`,
        );
        if (
          era.get(`talent:${target}:110`) === 1 ||
          era.get(`talent:${target}:114`) === 1 ||
          era.get(`talent:${target}:119`) === 1
        ) {
          await era.printAndWait(`「唔…这样欺负人家的胸部…」`);
        }
        await era.printAndWait(`「chu…唧啾…呼…哈…哈…唧啾……」`);
        // CFLAG:360  = 2（变量语义：CFLAG 族，360）
        kojo.乳夹口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 125) {
    if (kojo.口交时自慰 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}一边用力吮吸着魔王的阴茎，一边将手指插进自己的小穴手淫起来。`,
        );
        await era.printAndWait(
          `「就是这样…唔唔…要高潮了…呼呼…啊，快插进来${heart(1)}…快插进来嘛！${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}一边努力地含弄着大肉棒，一边搓揉着自己的小穴自慰起来。`,
        );
        await era.printAndWait(
          `「啊啊啊…明明想要集中精神${heart(1)}…侍奉魔王大人…啊哈${heart(1)}…唔…已经失去控制了…好舒服…快要高潮了${heart(1)}」`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`${target_name}被命令着开始一边口交一边自慰。`);
        await era.printAndWait(
          `「chu…chu…高潮了啊…啊哈…啊啊啊啊…好好…一边含着一边手淫…唧啾…呼…」`,
        );
      } else {
        await era.printAndWait(`${target_name}被命令着开始一边口交一边自慰。`);
        await era.printAndWait(
          `「chu…chu…高潮了啊…啊哈…啊啊啊啊…好好…一边含着一边手淫…唧啾…呼…」`,
        );
      }
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361）
      kojo.口交时自慰 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}一边用力吮吸着魔王的阴茎，一边将手指插进自己的小穴手淫起来。`,
        );
        await era.printAndWait(
          `「就是这样…唔唔…要高潮了…呼呼…啊，快插进来${heart(1)}…快插进来！${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}已经兴奋得无视口水从嘴角滴下来，手指在小穴里搅动得更加剧烈了……`,
        );
        // CFLAG:361  = 5（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}一边努力地含弄着大肉棒，一边搓揉着自己的小穴自慰起来。`,
        );
        await era.printAndWait(
          `「啊啊啊…明明想要集中精神${heart(1)}…侍奉魔王大人…啊哈${heart(1)}…唔…已经失去控制了…好舒服…快要高潮了${heart(1)}」`,
        );
        await era.printAndWait(
          `「呼唔${heart(1)}…一面侍奉着魔王大人${heart(1)}一面……比起普通的自慰感觉更真实啊啊啊${heart(1)}」`,
        );
        // CFLAG:361  = 4（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`${target_name}被命令着开始一边口交一边自慰。`);
        await era.printAndWait(`「chu…chu…高潮了啊…啊哈…更加…有感觉呢…?」`);
        // CFLAG:361  = 3（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 3;
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`${target_name}被命令着开始一边口交一边自慰。`);
        await era.printAndWait(
          `「chu…chu…高潮了啊…啊哈…啊啊啊啊…好好…一边含着一边手淫…唧啾…呼…」`,
        );
        // CFLAG:361  = 2（变量语义：CFLAG 族，361）
        kojo.口交时自慰 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 126) {
    if (kojo.手搓口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}露出淫靡的笑容将阴茎握住，一边用力地搓弄一边把龟头含进嘴里。`,
        );
        await era.printAndWait(
          `「嗯哼…嘿嘿嘿${heart(1)} 龟头硬成这样～好多精子在等着喷射出来吧${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}含住了龟头后用湿润的眼睛仰望着你，双手握住了阴茎用力搓揉起来。`,
        );
        await era.printAndWait(
          `「嗯哼…呼呼…chu${heart(1)}chu${heart(1)}…啊啊…大肉棒好热${heart(1)}」`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `${target_name}含住了龟头，双手握住阴茎搓揉着。`,
        );
        await era.printAndWait(`「哈哈…啊唔…唧啾…chu…呼${heart(1)}」`);
      } else {
        await era.printAndWait(
          `${target_name}含住了龟头，双手握住阴茎搓揉着。`,
        );
        await era.printAndWait(`「哈哈…啊唔…唧啾…chu…呼${heart(1)}」`);
      }
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362）
      kojo.手搓口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}露出淫靡的笑容将阴茎握住，一边用力地搓弄一边把龟头含进嘴里。`,
        );
        await era.printAndWait(
          `「嗯哼…嘿嘿嘿${heart(1)} 龟头硬成这样～好多精子在等着喷射出来吧${heart(1)}」`,
        );
        await era.printAndWait(
          `「舒服吗？大鸡鸡舒服嘛…龟头被吮吸得已经受不了了吧？…快用精子来喂饱我哟${heart(1)}」」`,
        );
        // CFLAG:362  = 5（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}含住了龟头后用湿润的眼睛仰望着你，双手握住了阴茎用力搓揉起来。`,
        );
        await era.printAndWait(
          `「嗯哼…呼呼…chu${heart(1)}chu${heart(1)}…啊啊…大肉棒好热${heart(1)}」`,
        );
        await era.printAndWait(
          `「大肉棒摸上去好舒服…手…嘴也…停不下来…chu…chu…啊哈…哈…哈${heart(1)}」`,
        );
        // CFLAG:362  = 4（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}含住了龟头，双手握住阴茎搓揉着。`,
        );
        await era.printAndWait(`「哈哈…啊唔…唧啾…chu…呼${heart(1)}」`);
        // CFLAG:362  = 3（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 3;
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}含住了龟头，双手握住阴茎搓揉着。`,
        );
        await era.printAndWait(`「哈哈…啊唔…唧啾…chu…呼${heart(1)}」`);
        // CFLAG:362  = 2（变量语义：CFLAG 族，362）
        kojo.手搓口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 127) {
    if (kojo.真空口交 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}舔了舔嘴唇看着阴茎，卖力地吮吸着起来。`,
        );
        await era.printAndWait(
          `「呼…好辛苦…但是好舒服…请${heart(1)} 射进来…是的唔唔唔…是的唔唔唔唔${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}兴奋地吮吸着阴茎，一边发出响声一边用舌头舔弄着龟头。`,
        );
        await era.printAndWait(
          `「一大半${heart(1)} 都${heart(1)}都被${heart(1)}…含住了…唔唔唔唔唔唔${heart(1)}」`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `${target_name}把阴茎吸进嘴里，用力吮吸起来后似乎说话都很费力。`,
        );
        await era.printAndWait(
          `「顶住喉咙了…噗…呼呼呼…吸得太用力…呼呜呜${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}把阴茎吸进嘴里，用力吮吸起来后似乎说话都很费力。`,
        );
        await era.printAndWait(
          `「顶住喉咙了…噗…呼呼呼…吸得太用力…呼呜呜${heart(1)}」`,
        );
      }
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363）
      kojo.真空口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}舔了舔嘴唇看着阴茎，卖力地吮吸着起来。`,
        );
        await era.printAndWait(
          `「呼…好辛苦…但是好舒服…请${heart(1)} 射进来…是的唔唔唔…是的唔唔唔唔${heart(1)}」`,
        );
        await era.printAndWait(
          `「啊哈…顶到喉咙最深处了…一定要多多…射进来啊${heart(1)}」`,
        );
        // CFLAG:363  = 5（变量语义：CFLAG 族，363）
        kojo.真空口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}兴奋地吮吸着阴茎，一边发出响声一边用舌头舔弄着龟头。`,
        );
        await era.printAndWait(
          `「一大半${heart(1)} 都${heart(1)}都被${heart(1)}…含住了…唔唔唔唔唔唔${heart(1)}」`,
        );
        await era.printAndWait(
          `「大肉棒…已经和${sc()}越来越亲近了呢…都抵到喉咙了${heart(1)} 外面还有这么长一截${heart(1)}」`,
        );
        // CFLAG:363  = 4（变量语义：CFLAG 族，363）
        kojo.真空口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}把阴茎吸进嘴里，用力吮吸起来后似乎说话都很费力。`,
        );
        await era.printAndWait(
          `「顶住喉咙了…噗…呼呼呼…吸得太用力…呼呜呜${heart(1)}」`,
        );
        await era.printAndWait(`「啊哈…鸡鸡…被吸得…哈啊…舒服吗？」`);
        // CFLAG:363  = 3（变量语义：CFLAG 族，363）
        kojo.真空口交 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}把阴茎吸进嘴里，用力吮吸起来后似乎说话都很费力。`,
        );
        await era.printAndWait(
          `「顶住喉咙了…噗…呼呼呼…吸得太用力…呼呜呜${heart(1)}」`,
        );
        // CFLAG:363  = 2（变量语义：CFLAG 族，363）
        kojo.真空口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 69) {
    if (kojo.六九式 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}在小穴快感的不断刺激下，紧紧含住阴茎吮吸着。`,
        );
        await era.printAndWait(
          `「这种快感…${sc()}也满满地还给你了哟${heart(1)} 唔唔唔不要停…呼呼${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}忍受着小穴传来的快感专心舔弄着阴茎。`,
        );
        await era.printAndWait(
          `「啊真是的…这么激烈…人家没法专心为侍奉主人了啊啊啊啊${heart(1)}」`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}被小穴传来的快感击溃，发出淫乱的求饶声。`,
        );
        await era.printAndWait(
          `「唔唔…不，不行哟…恶作剧是不行的说…不…不要那么激烈…呀！${heart(1)}」`,
        );
      } else {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}被下身连绵不断的快感刺激到连屁股都颤抖起来。`,
        );
        await era.printAndWait(
          `「啊啊啊…不行…不行的说…已经无法控制住身体了……」`,
        );
      }
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364）
      kojo.六九式 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}在小穴快感的不断刺激下，紧紧含住阴茎吮吸着。`,
        );
        await era.printAndWait(
          `「这种快感…${sc()}也满满地还给你了哟${heart(1)} 唔唔唔不要停…呼呼${heart(1)}${heart(1)}」`,
        );
        // CFLAG:364  = 5（变量语义：CFLAG 族，364）
        kojo.六九式 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}忍受着小穴传来的快感专心舔弄着阴茎。`,
        );
        await era.printAndWait(
          `「啊真是的…这么激烈…人家没法专心为侍奉主人了啊啊啊啊${heart(1)}」`,
        );
        // CFLAG:364  = 4（变量语义：CFLAG 族，364）
        kojo.六九式 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}被小穴传来的快感击溃，发出淫乱的求饶声。`,
        );
        await era.printAndWait(
          `「唔唔…不，不行哟…恶作剧是不行的说…不…不要那么激烈…呀！${heart(1)}」`,
        );
        // CFLAG:364  = 3（变量语义：CFLAG 族，364）
        kojo.六九式 = 3;
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}和${player_name}在彼此的胯下互相舔弄着。${target_name}被下身连绵不断的快感刺激到连屁股都颤抖起来。`,
        );
        await era.printAndWait(
          `「啊啊啊…不行…不行的说…已经无法控制住身体了……」`,
        );
        // CFLAG:364  = 2（变量语义：CFLAG 族，364）
        kojo.六九式 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 124) {
    if (kojo.深喉 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `${target_name}嘴唇紧紧含住阴茎，直到整根没入抵住喉咙最深处。`,
        );
        await era.printAndWait(
          `「唔${heart(1)}…呼…嗯咕…整根都放进来了${heart(1)}…唔唔～！」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `${target_name}被整根阴茎塞进嘴巴后，发出了粗重的鼻音开始吮吸。`,
        );
        await era.printAndWait(
          `「嗯咕${heart(1)}…呼呼${heart(1)}呼${heart(1)}…唔唔唔唔唔唔！」`,
        );
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(
          `${target_name}辛苦地含住了整根阴茎后，开始用口腔侍奉魔王。`,
        );
        await era.printAndWait(`「嗯…嗯嗯…嗯咕…嗯唔！？…嗯…嗯…唔…嗯嗯…?」`);
      } else {
        await era.printAndWait(
          `${target_name}辛苦地含住了整根阴茎后，开始用口腔侍奉魔王。`,
        );
        await era.printAndWait(`「嗯…嗯嗯…嗯咕…嗯唔！？」`);
      }
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365）
      kojo.深喉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}嘴唇紧紧含住阴茎，直到整根没入抵住喉咙最深处。`,
        );
        await era.printAndWait(
          `「唔${heart(1)}…呼…嗯咕…整根都放进来了${heart(1)}…唔唔～！」`,
        );
        await era.printAndWait(
          `（啊哈…${sc()}的嘴里…已经充满了大鸡鸡的味道了呀…${heart(1)}）`,
        );
        // CFLAG:365  = 5（变量语义：CFLAG 族，365）
        kojo.深喉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}被整根阴茎塞进嘴巴后，发出了粗重的鼻音开始吮吸。`,
        );
        await era.printAndWait(
          `「嗯咕${heart(1)}…呼呼${heart(1)}呼${heart(1)}…唔唔唔唔唔唔！」`,
        );
        await era.printAndWait(
          `（呼呼…喉咙的深处也…感受到肉棒的美味了…唔…这甜美的触感…${heart(1)}）`,
        );
        // CFLAG:365  = 4（变量语义：CFLAG 族，365）
        kojo.深喉 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `${target_name}辛苦地含住了整根阴茎后，开始用口腔侍奉魔王。`,
        );
        await era.printAndWait(`「嗯…嗯嗯…嗯咕…嗯唔！？…嗯…嗯…唔…嗯嗯…?」`);
        // CFLAG:365  = 3（变量语义：CFLAG 族，365）
        kojo.深喉 = 3;
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(
          `${target_name}辛苦地含住了整根阴茎后，开始用口腔侍奉魔王。`,
        );
        await era.printAndWait(`「嗯…嗯嗯…嗯咕…嗯唔！？」`);
        // CFLAG:365  = 2（变量语义：CFLAG 族，365）
        kojo.深喉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 80) {
    if (kojo.强制口交 === 0) {
      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait(`「嗯！？噗…噗…嗯嗯嗯～！」`);
        await era.printAndWait(
          `${target_name}骤然被${player_name}的阴茎插到了喉咙深处，眼皮不停地颤动起来……`,
        );
      } else {
        await era.printAndWait(`「唔！嗯咕…唔唔唔唔唔唔！！！！」`);
        await era.printAndWait(
          `${target_name}翻着白眼，口水也抑制不住地从嘴角流出…看上去快要气绝的样子……`,
        );
      }
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381）
      kojo.强制口交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「唔…唔唔咕…唔…嗯…嗯咕…唔唔唔～～～！！！」`);
        await era.printAndWait(
          `${target_name}喉咙被激烈侵犯的同时，巧妙地用舌头拨弄着阴茎。`,
        );
        await era.printAndWait(
          `「更多地…插进${sc()}的嘴巴里…欺负…请欺负${heart(1)}…唔唔唔唔唔唔${heart(1)}」`,
        );
        // CFLAG:381  = 5（变量语义：CFLAG 族，381）
        kojo.强制口交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「嗯哼…唔唔！不要…呼…是…呼呼${heart(1)}」`);
        await era.printAndWait(
          `${target_name}被强按住头部仍然在微弱地反抗着，被${player_name}的阴茎插进嘴里后却用舌头紧紧地缠了上来……`,
        );
        // CFLAG:381  = 4（变量语义：CFLAG 族，381）
        kojo.强制口交 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呼…不…嗯…呼…唔唔！」`);
        await era.printAndWait(
          `${target_name}一边翻着白眼一边仍努力地用喉咙深处侍奉着${player_name}的阴茎……`,
        );
        // CFLAG:381  = 3（变量语义：CFLAG 族，381）
        kojo.强制口交 = 3;
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「嗯…嗯…嗯…！唔！？」`);
        await era.printAndWait(
          `${target_name}翻着白眼拼命地想向外吐${player_name}的阴茎……`,
        );
        // CFLAG:381  = 2（变量语义：CFLAG 族，381）
        kojo.强制口交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 87) {
    if (kojo.穿环 === 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        if (era.get(`cflag:${target}:7`) & P) {
          await era.printAndWait(
            `由于是第一次在皮肤上打孔，疼痛让${target_name}忍不住发出了悲鸣。`,
          );

          if (P === 1) {
            await era.printAndWait(
              `「啊啊啊…这么可爱的乳头，不跟着立刻射一发吗…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}炫耀似的向后仰倒，乳环也跟着摇晃起来……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「啊啊…要不要在其他地方也…?」`);
            await era.printAndWait(
              `${target_name}诱惑地用手指在脐环四周划动……`,
            );
          } else if (P === 4) {
            await era.printAndWait(
              `「哈…哈…${sc()}的身体…自己都开始讨厌起来…${heart(1)}」`,
            );
            await era.printAndWait(
              `穿孔后残余的疼痛让${target_name}的身体开始不由自主地颤栗起来……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊啊…小鸡鸡…小鸡鸡更加…可爱了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}看着阴茎上的环，欢喜得出神了……`,
              );
            } else {
              await era.printAndWait(
                `「哈哈…这样看上去…更加可爱了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}看着被穿环的阴蒂，欢喜得出神了……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「啊啊…奇怪的…的感觉…口交起来会不会…${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}伸出舌环舔了舔嘴唇……`);
          } else if (P === 32) {
            await era.printAndWait(`「嗯…唔呼呼…看上去怎么样？」`);
            await era.printAndWait(`${target_name}一边舔着嘴唇一边确认……`);
          } else if (P === 64) {
            await era.printAndWait(`「呼…奇怪的感觉哟……」`);
            await era.printAndWait(`${target_name}忍不住反复摩挲着鼻环……`);
          }
        } else {
          await era.printAndWait(
            `${target_name}抚摸着除环后皮肤上残留下的疤痕……`,
          );
        }
      } else if (era.get(`talent:${target}:85`) === 1) {
        if (era.get(`cflag:${target}:7`) & P) {
          await era.printAndWait(
            `由于是第一次在皮肤上打孔，疼痛让${target_name}忍不住发出了悲鸣。`,
          );

          if (P === 1) {
            await era.printAndWait(`「啊啊…这就是爱的证据啊…呼……${heart(1)}」`);
            await era.printAndWait(
              `乳环在${target_name}勃起的乳头上轻轻摇晃着，发出闪亮的反光……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「在这里…为什么？……」`);
            await era.printAndWait(`${target_name}抚摸着脐环四周……`);
          } else if (P === 4) {
            await era.printAndWait(`「唔…啊，不行…那里好痛…啊啊啊！」`);
            await era.printAndWait(
              `${target_name}因为阴唇上穿环的剧痛而发出了悲鸣……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊啊…小鸡鸡有…小鸡鸡有啊…啊啊啊…这样的…啊啊啊……」`,
              );
              await era.printAndWait(
                `${target_name}阴茎上被穿环后，流着泪的脸上露出了笑容……`,
              );
            } else {
              await era.printAndWait(
                `「啊啊啊…阴蒂上穿环…这样…感觉太…奇怪的说……」`,
              );
              await era.printAndWait(
                `${target_name}阴蒂上被穿环后，流着泪的脸上露出了笑容……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「啊啊啊…是…在舌尖上固定了…?」`);
            await era.printAndWait(
              `${target_name}伸出穿环的舌头欢喜地炫耀着……`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呼呼…这样的打扮的也不错啊…?」`);
            await era.printAndWait(`${target_name}用舌头舔着嘴唇确认……`);
          } else if (P === 64) {
            await era.printAndWait(`「啊啊…这，漂亮吗……？哦，真的……？」`);
            await era.printAndWait(`${target_name}摸着鼻环，有点害羞的笑了……`);
          }
        } else {
          await era.printAndWait(`${target_name}寂寞地抚摸着除环的疤痕……`);
        }
      } else {
        if (era.get(`cflag:${target}:7`) & P) {
          await era.printAndWait(
            `由于是第一次在皮肤上打孔，疼痛让${target_name}泪流满面，发出了悲鸣。`,
          );

          if (P === 1) {
            await era.printAndWait(`「呜呜…过分…好过分……」`);
            await era.printAndWait(
              `乳头传来剧烈的疼痛，${target_name}忍不住哭了出来……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「肚脐都要被撕裂的感觉……」`);
            await era.printAndWait(
              `${target_name}看着脐环，眼泪无法压抑地流了出来……`,
            );
          } else if (P === 4) {
            await era.printAndWait(`「这里也…放过我…请放过我……」`);
            await era.printAndWait(
              `${target_name}忍受着阴唇被穿环的痛苦，流下了眼泪……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「啊…啊…讨厌…讨厌…这样的话啊……」`);
              await era.printAndWait(
                `看着被穿环的阴茎，${target_name}痛苦地流下了眼泪……`,
              );
            } else {
              await era.printAndWait(
                `「${sc()}觉得这是这世上…最…痛苦…的事情了……」`,
              );
              await era.printAndWait(
                `看着被穿环的阴蒂，${target_name}痛苦地流下了眼泪……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「啊呜…吧…堂苦…好堂……」`);
            await era.printAndWait(
              `因为舌头被穿环，连话都说不清的${target_name}流下了痛苦的眼泪……`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呜呜…这样…好过分……」`);
            await era.printAndWait(`${target_name}的嘴唇上被穿环后痛哭出声……`);
          } else if (P === 64) {
            await era.printAndWait(
              `「啊啊…啊啊…这里也…过分…好讨厌……${sc()}岂不是…变得和家畜一样……」`,
            );
            await era.printAndWait(
              `${target_name}摸着鼻环想到了田里被穿环而痛苦低鸣的牛，眼泪止不住地涌了出来……`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着除环后残留的伤口……`);
        }
      }
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348）
      kojo.穿环 = 1;
      return 0;
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.print('');
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`cflag:${target}:7`) & P) {
          if (P === 1) {
            await era.printAndWait(
              `「啊啊啊…这么可爱的乳头，不跟着立刻射一发吗…${heart(1)}」`,
            );
            await era.printAndWait(
              `${target_name}炫耀似的向后仰倒，乳环也跟着摇晃起来……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「啊啊…要不要在其他地方也…?」`);
            await era.printAndWait(
              `${target_name}诱惑地用手指在脐环四周划动……`,
            );
          } else if (P === 4) {
            await era.printAndWait(
              `「哈…哈…${sc()}的身体…自己都开始讨厌起来…${heart(1)}」`,
            );
            await era.printAndWait(
              `穿孔后残余的疼痛让${target_name}的身体开始不由自主地颤栗起来……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊啊…小鸡鸡…小鸡鸡更加…可爱了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}看着阴茎上的环，欢喜得出神了……`,
              );
            } else {
              await era.printAndWait(
                `「哈哈…这样看上去…更加可爱了呢…${heart(1)}」`,
              );
              await era.printAndWait(
                `${target_name}看着被穿环的阴蒂，欢喜得出神了……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(
              `「啊啊…奇怪的…的感觉…口交起来会不会…${heart(1)}」`,
            );
            await era.printAndWait(`${target_name}伸出舌环舔了舔嘴唇……`);
          } else if (P === 32) {
            await era.printAndWait(`「嗯…唔呼呼…看上去怎么样？」`);
            await era.printAndWait(`${target_name}一边舔着嘴唇一边确认……`);
          } else if (P === 64) {
            await era.printAndWait(`「呼…奇怪的感觉哟……」`);
            await era.printAndWait(`${target_name}忍不住反复摩挲着鼻环……`);
          }
        } else {
          await era.printAndWait(
            `${target_name}抚摸着除环后皮肤上残留下的疤痕……`,
          );
        }
        // CFLAG:348  = 4（变量语义：CFLAG 族，348）
        kojo.穿环 = 4;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        if (era.get(`cflag:${target}:7`) & P) {
          if (P === 1) {
            await era.printAndWait(`「啊啊…这就是爱的证据啊…呼……${heart(1)}」`);
            await era.printAndWait(
              `乳环在${target_name}勃起的乳头上轻轻摇晃着，发出闪亮的反光……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「在这里…为什么？……」`);
            await era.printAndWait(`${target_name}抚摸着脐环四周……`);
          } else if (P === 4) {
            await era.printAndWait(`「唔…啊，不行…那里好痛…啊啊啊！」`);
            await era.printAndWait(
              `${target_name}因为阴唇上穿环的剧痛而发出了悲鸣……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(
                `「啊啊啊…小鸡鸡有…小鸡鸡有啊…啊啊啊…这样的…啊啊啊……」`,
              );
              await era.printAndWait(
                `${target_name}阴茎上被穿环后，流着泪的脸上露出了笑容……`,
              );
            } else {
              await era.printAndWait(
                `「啊啊啊…阴蒂上穿环…这样…感觉太…奇怪的说……」`,
              );
              await era.printAndWait(
                `${target_name}阴蒂上被穿环后，流着泪的脸上露出了笑容……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「啊啊啊…是…在舌尖上固定了…?」`);
            await era.printAndWait(
              `${target_name}伸出穿环的舌头欢喜地炫耀着……`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呼呼…这样的打扮的也不错啊…?」`);
            await era.printAndWait(`${target_name}用舌头舔着嘴唇确认……`);
          } else if (P === 64) {
            await era.printAndWait(`「啊啊…这，漂亮吗……？哦，真的……？」`);
            await era.printAndWait(`${target_name}摸着鼻环，有点害羞地笑了……`);
          }
        } else {
          await era.printAndWait(`${target_name}寂寞地抚摸着除环的疤痕……`);
        }
        // CFLAG:348  = 3（变量语义：CFLAG 族，348）
        kojo.穿环 = 3;
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 === 2) {
        if (era.get(`cflag:${target}:7`) & P) {
          if (P === 1) {
            await era.printAndWait(`「呜呜…过分…好过分……」`);
            await era.printAndWait(
              `乳头传来剧烈的疼痛，${target_name}忍不住哭了出来……`,
            );
          } else if (P === 2) {
            await era.printAndWait(`「肚脐都要被撕裂的感觉……」`);
            await era.printAndWait(
              `${target_name}看着脐环，眼泪无法压抑地流了出来……`,
            );
          } else if (P === 4) {
            await era.printAndWait(`「这里也…放过我…请放过我……」`);
            await era.printAndWait(
              `${target_name}忍受着阴唇被穿环的痛苦，流下了眼泪……`,
            );
          } else if (P === 8) {
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              await era.printAndWait(`「啊…啊…讨厌…讨厌…这样的话啊……」`);
              await era.printAndWait(
                `看着被穿环的阴茎，${target_name}痛苦地流下了眼泪……`,
              );
            } else {
              await era.printAndWait(
                `「${sc()}觉得这是这世上…最…痛苦…的事情了……」`,
              );
              await era.printAndWait(
                `看着被穿环的阴蒂，${target_name}痛苦地流下了眼泪……`,
              );
            }
          } else if (P === 16) {
            await era.printAndWait(`「啊呜…吧…堂苦…好堂……」`);
            await era.printAndWait(
              `因为舌头被穿环，连话都说不清的${target_name}流下了痛苦的眼泪……`,
            );
          } else if (P === 32) {
            await era.printAndWait(`「呜呜…这样…好过分……」`);
            await era.printAndWait(`${target_name}的嘴唇上被穿环后痛哭出声……`);
          } else if (P === 64) {
            await era.printAndWait(
              `「啊啊…啊啊…这里也…过分…好讨厌……${sc()}岂不是…变得和家畜一样……」`,
            );
            await era.printAndWait(
              `${target_name}摸着鼻环想到了田里被穿环而痛苦低鸣的牛，眼泪止不住地涌了出来……`,
            );
          }
        } else {
          await era.printAndWait(`${target_name}抚摸着除环后残留的伤口……`);
        }
        // CFLAG:348  = 2（变量语义：CFLAG 族，348）
        kojo.穿环 = 2;
      }
    }
    return 0;
  }
}

// dog_kojo_2
async function dog_kojo_2(rand) {
  const { rand_n, target, sc, kojo } = bind_ctx(rand);

  if (era_flag.selectcom === 0) {
    if (kojo.爱抚 === 0) {
      if ((era.get(`mark:${target}:2`) || 0) >= 2) {
        await era.printAndWait(`「呜……」`);
      } else {
        await era.printAndWait(`「呓……」`);
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      kojo.爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // eslint-disable-next-line no-irregular-whitespace
        await era.printAndWait(`「狗狗好可爱哦……♪　${sc()}也觉得很舒服哦……♪」`);
        // CFLAG:301  = 7（变量语义：CFLAG 族，301）
        kojo.爱抚 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗狗好可爱啊♪」`);
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        kojo.爱抚 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「狗狗好可爱啊♪」`);
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        kojo.爱抚 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「这样子做很开心吗？」`);
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        kojo.爱抚 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「奇怪的感觉……」`);
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        kojo.爱抚 = 3;
      } else if (
        (era.get(`mark:${target}:2`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「呜……这样的事……」`);
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        kojo.爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 1) {
    if (kojo.舔阴 === 0) {
      if (era.get(`talent:${target}:0`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:302  = 1（变量语义：CFLAG 族，302）
      kojo.舔阴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 6（变量语义：CFLAG 族，302）
        kojo.舔阴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 5（变量语义：CFLAG 族，302）
        kojo.舔阴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 4（变量语义：CFLAG 族，302）
        kojo.舔阴 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:302  = 3（变量语义：CFLAG 族，302）
        kojo.舔阴 = 3;
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:302  = 2（变量语义：CFLAG 族，302）
        kojo.舔阴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 5) {
    if (kojo.胸爱抚 === 0) {
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）
      kojo.胸爱抚 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 6（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 5（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 4（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 4;
      } else if (
        (era.get(`abl:${target}:1`) || 0) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:306  = 3（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 3;
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:306  = 2（变量语义：CFLAG 族，306）
        kojo.胸爱抚 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 6) {
    if (kojo.接吻 === 0 && game.train.初吻与自我口上) {
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
      kojo.接吻 = 1;
      return 0;
    } else if (kojo.接吻 === 0) {
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
      kojo.接吻 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 6（变量语义：CFLAG 族，307）
        kojo.接吻 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 5（变量语义：CFLAG 族，307）
        kojo.接吻 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 4（变量语义：CFLAG 族，307）
        kojo.接吻 = 4;
      } else if (
        (era.get(`abl:${target}:10`) || 0) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:307  = 3（变量语义：CFLAG 族，307）
        kojo.接吻 = 3;
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:307  = 2（变量语义：CFLAG 族，307）
        kojo.接吻 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 9) {
    if (kojo.舔肛 === 0) {
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
      kojo.舔肛 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 6（变量语义：CFLAG 族，310）
        kojo.舔肛 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 5（变量语义：CFLAG 族，310）
        kojo.舔肛 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 4（变量语义：CFLAG 族，310）
        kojo.舔肛 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:310  = 3（变量语义：CFLAG 族，310）
        kojo.舔肛 = 3;
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:310  = 2（变量语义：CFLAG 族，310）
        kojo.舔肛 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 21) {
    if (kojo.背后位 === 0) {
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
      // CFLAG:322  = 1（变量语义：CFLAG 族，322）
      kojo.背后位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 7（变量语义：CFLAG 族，322）
        kojo.背后位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 6（变量语义：CFLAG 族，322）
        kojo.背后位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:322  = 5（变量语义：CFLAG 族，322）
        kojo.背后位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 4（变量语义：CFLAG 族，322）
        kojo.背后位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:322  = 3（变量语义：CFLAG 族，322）
        kojo.背后位 = 3;
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');

        // CFLAG:322  = 2（变量语义：CFLAG 族，322）
        kojo.背后位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 27) {
    if (kojo.背后位肛交 === 0) {
      if (era.get(`talent:${target}:136`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）
      kojo.背后位肛交 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 7（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 6（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:328  = 5（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 4（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 4;
      } else if (
        (era.get(`abl:${target}:3`) || 0) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:328  = 3（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 3;
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:328  = 2（变量语义：CFLAG 族，328）
        kojo.背后位肛交 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 30) {
    if (kojo.手淫 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）
      kojo.手淫 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 7（变量语义：CFLAG 族，331）
        kojo.手淫 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 6（变量语义：CFLAG 族，331）
        kojo.手淫 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:331  = 5（变量语义：CFLAG 族，331）
        kojo.手淫 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 4（变量语义：CFLAG 族，331）
        kojo.手淫 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:331  = 3（变量语义：CFLAG 族，331）
        kojo.手淫 = 3;
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:331  = 2（变量语义：CFLAG 族，331）
        kojo.手淫 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 31) {
    if (kojo.口交_奴 === 0) {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait('');
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait('');
      } else if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）
      kojo.口交_奴 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 7（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 6（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:332  = 5（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 4（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:332  = 3（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 3;
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:332  = 2（变量语义：CFLAG 族，332）
        kojo.口交_奴 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 34) {
    if (kojo.骑乘位 === 0) {
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
      kojo.骑乘位 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait('');
        } else if (rand_n(2) === 0) {
          await era.printAndWait('');
        } else {
          await era.printAndWait('');
        }
        // CFLAG:335  = 7（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 7;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 === 2)
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
        kojo.骑乘位 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 === 2)
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
        kojo.骑乘位 = 5;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (era.get(`abl:${target}:2`) || 0) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 === 2)
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
        kojo.骑乘位 = 4;
      } else if (
        (era.get(`mark:${target}:2`) || 0) === 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        await era.printAndWait('');
        // CFLAG:335  = 3（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 3;
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:335  = 2（变量语义：CFLAG 族，335）
        kojo.骑乘位 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 37) {
    if (kojo.肛门侍奉 === 0) {
      if ((era.get(`abl:${target}:16`) || 0) >= 3) {
        await era.printAndWait('');
      } else {
        await era.printAndWait('');
      }
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）
      kojo.肛门侍奉 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 6（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 6;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 5（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:16`) || 0) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.print('');
        // CFLAG:338  = 4（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 4;
      } else if (
        (era.get(`abl:${target}:16`) || 0) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:338  = 3（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 3;
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:338  = 2（变量语义：CFLAG 族，338）
        kojo.肛门侍奉 = 2;
      }
      return 0;
    }
  }

  if (era_flag.selectcom === 43 && era.get(`tequip:${target}:43`)) {
    if (kojo.眼罩 === 0) {
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
      kojo.眼罩 = 1;
      return 0;
    } else {
      if (
        era.get(`talent:${target}:136`) === 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 10;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 9;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 8;
      } else if (
        era.get(`talent:${target}:76`) === 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 7;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 6;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 5;
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 4;
      } else if (
        (era.get(`abl:${target}:21`) || 0) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 3;
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait('');
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）
        kojo.眼罩 = 2;
      }
      return 0;
    }
  } else if (
    era_flag.selectcom === 43 &&
    era.get(`tequip:${target}:43`) === 0
  ) {
    if (
      era.get(`talent:${target}:136`) === 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 4（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 4;
    } else if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 3（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 3;
    } else if (
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('');
      // CFLAG:444  = 2（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 2;
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait('');
      // CFLAG:444  = 1（变量语义：CFLAG 族，444）
      kojo.兽奸眼罩 = 1;
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (kojo.交谈 === 0) {
      if (era.get(`tequip:${target}:53`)) {
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
      // CFLAG:357  = 1（变量语义：CFLAG 族，357）
      kojo.交谈 = 1;
      return 0;
    } else {
      if (era.get(`tequip:${target}:53`)) {
        if (
          era.get(`talent:${target}:136`) === 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 5（变量语义：CFLAG 族，357）
          kojo.交谈 = 5;
        } else if (
          era.get(`talent:${target}:76`) === 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 4（变量语义：CFLAG 族，357）
          kojo.交谈 = 4;
        } else if (
          era.get(`talent:${target}:85`) === 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait('');
          // CFLAG:357  = 3（变量语义：CFLAG 族，357）
          kojo.交谈 = 3;
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 === 2) {
          await era.printAndWait('');
          // CFLAG:357  = 2（变量语义：CFLAG 族，357）
          kojo.交谈 = 2;
        }
      }
      return 0;
    }
  }

  return 0;
}

// kojo_message_palamcng_2
async function kojo_message_palamcng_2(rand) {
  const { target, target_name, player_name, sc, kojo } = bind_ctx(rand);
  let P = 0;
  let A = 0;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }

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
  if (P > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「啊啊，浑身都变得黏糊糊的…」`);
        await era.printAndWait(`―――润滑第一次超过 LV2 了。`);
      } else {
        await era.printAndWait(`「厉害…滑溜溜的…」`);
        await era.printAndWait(`―――润滑第一次超过 LV2 了。`);
      }
    } else {
      if (era_flag.selectcom === 50) {
        await era.printAndWait(`「呀…好厉害，粘滑滑的……」`);
        await era.printAndWait(`―――润滑第一次超过 LV2 了。`);
      } else {
        await era.printAndWait(`「啊啊…为什么会湿了……」`);
        await era.printAndWait(`―――润滑第一次超过 LV2 了。`);
      }
    }
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）
    kojo.首次润滑Lv2 = 1;
  }

  P = (era.get(`palam:${target}:5`) || 0) + (era.get(`delta:${target}:5`) || 0);
  if (P > PALAMLV[2] && kojo.首次欲情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「哎，哎呀…身体热起来了…好厉害…」`);
        await era.printAndWait(`―――欲情第一次超过 LV2 了。`);
      } else {
        await era.printAndWait(`「主人啊…拜托…快抱我…」`);
        await era.printAndWait(`―――欲情第一次超过 LV2 了。`);
      }
    } else {
      if (era_flag.selectcom === 51) {
        await era.printAndWait(`「那里…还有身体…都在发热…这是…啊啊…」`);
        await era.printAndWait(`―――欲情第一次超过 LV2 了。`);
      } else {
        await era.printAndWait(`「身体…在发热…好奇怪…」`);
        await era.printAndWait(`―――欲情第一次超过 LV2 了。`);
      }
    }
    // CFLAG:222  = 1（变量语义：CFLAG 族，222）
    kojo.首次欲情Lv2 = 1;
  }

  P = (era.get(`palam:${target}:8`) || 0) + (era.get(`delta:${target}:8`) || 0);
  if (P > PALAMLV[2] && kojo.首次耻情Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「是的，不好意思…好害羞啊…」`);
      await era.printAndWait(`―――耻情第一次超过 LV2 了。`);
    } else {
      await era.printAndWait(`「不要…好害羞…」`);
      await era.printAndWait(`―――耻情第一次超过 LV2 了。`);
    }
    // CFLAG:223  = 1（变量语义：CFLAG 族，223）
    kojo.首次耻情Lv2 = 1;
  }

  P =
    (era.get(`palam:${target}:10`) || 0) + (era.get(`delta:${target}:10`) || 0);
  if (P > PALAMLV[2] && kojo.首次恐怖Lv2 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「呀！…可怕…好可怕…主人啊」`);
      await era.printAndWait(`――― 恐怖第一次超过 LV2 了。`);
    } else {
      await era.printAndWait(`「好可怕…请放过我…」`);
      await era.printAndWait(`――― 恐怖第一次超过 LV2 了。`);
    }
    // CFLAG:224  = 1（变量语义：CFLAG 族，224）
    kojo.首次恐怖Lv2 = 1;
  }

  if ((era.get(`nowex:${target}:0`) || 0) > 0 && kojo.首次C绝顶 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「咦呀呀呀！？…好厉害…眼前一片雪白…」`);
      await era.printAndWait(
        `应该是第一次吧，${target_name}被阴蒂上传来的快感刺激到绝顶了。`,
      );
    } else {
      await era.printAndWait(
        `「咦呀呀呀！？高潮了高潮了高潮了！不行了呃呃呃！」`,
      );
      await era.printAndWait(
        `应该是第一次吧，${target_name}被阴蒂上传来的快感刺激到绝顶了。`,
      );
    }
    // CFLAG:225  = 1（变量语义：CFLAG 族，225）
    kojo.首次C绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:1`) || 0) > 0 && kojo.首次V绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「哈啊啊啊！？…高、高潮了要…啊啊…小穴…小穴要去了${heart(1)}」`,
      );
      await era.printAndWait(
        `「不要停…用力地操我…操坏掉…要对这感觉上瘾了啦！${heart(1)}」`,
      );
      await era.printAndWait(`「啊哈啊啊哦哦哦哦哦…噢啊啊啊啊啊啊。」`);
      await era.printAndWait(
        `第一次体验阴道高潮的快感，${target_name}的脸上露出幸福满足的表情……`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「唔哦哦！？里面…有什么…这？！～${heart(3)}」`);
      await era.printAndWait(`「好厉害…会对这种感觉上瘾的啦…${heart(1)}」`);
      await era.printAndWait(
        `第一次体验阴道高潮的快感，${target_name}的脸上露出幸福满足的表情……`,
      );
    } else {
      await era.printAndWait(
        `「唔唔哦！大鸡鸡在阴道里搅动着！啊啊啊啊啊啊啊啊！！！！」`,
      );
      await era.printAndWait(
        `${target_name}第一次体验阴道高潮的快感。眼泪和口水飞溅到${player_name}冷酷的脸上……`,
      );
    }
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226）
    kojo.首次V绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:2`) || 0) > 0 && kojo.首次A绝顶 === 0) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「呼啊…啊啊啊啊啊…啊，好棒…屁股那里也可以这么舒服${heart(1)}」`,
      );
      await era.printAndWait(
        `「高潮了${heart(1)}高潮了${heart(1)}第一次用屁股小穴高潮了啊啊啊啊啊${heart(1)}」」`,
      );
      await era.printAndWait(
        `${target_name}全身痉挛般着迎来了人生第一次的肛门高潮……`,
      );
    } else if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「屁股！屁股好舒服！整个人都奇怪了呜！」`);
      await era.printAndWait(`「啊啊啊啊…！屁股…不行了啊…${heart(1)}」`);
      await era.printAndWait(
        `${target_name}害羞得涨红了脸，身体颤抖着迎来了人生第一次的肛门高潮……`,
      );
    } else {
      await era.printAndWait(`「怎么会！屁股…还可以这么…舒服的！」`);
      await era.printAndWait(`「不行了啊！屁股要高潮了！」」`);
      await era.printAndWait(
        `${target_name}一脸陶醉惊讶的表情看着${player_name}迎来了人生第一次的肛门高潮……`,
      );
    }
    // CFLAG:227  = 1（变量语义：CFLAG 族，227）
    kojo.首次A绝顶 = 1;
  }

  if ((era.get(`nowex:${target}:3`) || 0) > 0 && kojo.首次B绝顶 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊啊…胸部…乳房…好像，好像要溶化了呀！」`);
      await era.printAndWait(`「胸部也是…主人的东西了…？」`);
      await era.printAndWait(`${target_name}第一次被胸部的快感刺激到高潮……`);
    } else {
      await era.printAndWait(`「唔！胸部好舒服！奇怪了！变奇怪了呀！」`);
      await era.printAndWait(`${target_name}第一次被胸部的快感刺激到高潮……`);
    }
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228）
    kojo.首次B绝顶 = 1;
  }

  A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0);
  if (game.train.处女丧失 === 1 && kojo.处女丧失 === 0) {
    if (game.train.主人导致处女丧失 === 1) {
      if (
        era.get(`talent:${target}:76`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(`「啊啊…终于…魔王大人的大鸡鸡啊${heart(1)}」`);
        await era.printAndWait(
          `「现在已经…正式成为女人了呢，魔王大人${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}露出淫乱的表情抱住${player_name}……`,
        );
      } else if (
        era.get(`talent:${target}:85`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)
      ) {
        await era.printAndWait(`「好痛…」`);
        await era.printAndWait(
          `「终于把自己献给魔王大人了呢…${sc()}…好开心……${heart(1)}」`,
        );
        await era.printAndWait(
          `${target_name}带着陶醉的表情在${player_name}的怀里撒起娇来……`,
        );
      } else {
        await era.printAndWait(`「不要…插…进来…哈…了…不要…这样…好过分……呜」`);
        await era.printAndWait(`${target_name}因为破瓜的痛苦而流下了眼泪……`);
      }
    } else {
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(`「啊啊啊…终于不是处女了…${heart(1)}」`);
        await era.printAndWait(`「嗯…谁破的都无所谓啦，不过，从今往后…」`);
        await era.printAndWait(
          `「唔呼呼…今后${sc()}的淫乱小穴…可以随意使用了${heart(1)}」`,
        );
      } else if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(`「主人……想把处女奉献给主人的……」`);
        await era.printAndWait(`${target_name}悲伤地看着破瓜的血迹……`);
      } else {
        await era.printAndWait(`「呜呜…简直…太残酷了…这样…」`);
        await era.printAndWait(`${target_name}流着泪忍受着破瓜的痛苦……`);
      }
    }
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229）
    kojo.处女丧失 = 1;
  }
}

// kojo_message_markcng_2
async function kojo_message_markcng_2(rand) {
  const { target, kojo } = bind_ctx(rand);

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

  if (era.get(`tequip:${target}:55`)) {
    return 0;
  }

  if (game.system.苦痛刻印变动 === 3 && kojo.苦痛刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「呀！？不过，痛…还是可以忍耐…」`);
    } else {
      await era.printAndWait(`「至于…痛楚…还是有点讨厌呐…」`);
    }
    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    kojo.苦痛刻印Lv3 = 1;
  }

  if (game.system.快乐刻印变动 === 3 && kojo.快乐刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`「啊啊…仅仅是被主人抚摸…就这么愉悦…」`);
    } else {
      await era.printAndWait(`「哎呀…舒服…呼呼…哎呀呀」`);
    }
    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    kojo.快乐刻印Lv3 = 1;
  }

  if (game.system.屈服刻印变动 === 3 && kojo.屈服刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(`（啊，已经不行了吧…绝对无法抗拒主人的要求……）`);
    } else {
      await era.printAndWait(`「只要是主人的要求，一定会遵从的……」`);
    }
    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    kojo.屈服刻印Lv3 = 1;
  }

  if (game.system.反抗刻印变动 === 3 && kojo.反抗刻印Lv3 === 0) {
    if (era.get(`talent:${target}:85`) === 1) {
      await era.printAndWait(
        `「杀了他…一定要杀了他…可是做不到吧…做不到的……呜呜、呜呜呜呜…」`,
      );
    } else {
      await era.printAndWait(`「人生第一次觉得这么痛恨一个人…」`);
    }
    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    kojo.反抗刻印Lv3 = 1;
  }
}

// self_kojo_k2
async function self_kojo_k2(rand) {
  const { target, target_name, assi_name, sc, view, kojo } = bind_ctx(rand);
  const Q = peek_aftertrain_q();

  if (game.train.初吻与自我口上 === 1) {
    if (Q === 1) {
      await era.print(
        `「是啊…好想和${assi_name}大人再来一次…${assi_name}大人啊……${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}用手指抚摸着方才${assi_name}滴落的爱液……`,
      );
    } else if (Q === 2) {
      await era.print(
        `「呼是呀…野狗的肉棒…好像要…手指好像不够用了……${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}已经无法用手指满足自己了……`);
    } else {
      if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「啊哈…小穴和屁股都还在发烫…还没有被插够呢…${heart(1)}」`,
        );
        await era.printAndWait(
          `「好厉害${heart(1)}…哦啊啊啊…已经…不行了啊…啊啊啊${heart(1)}」`,
        );
        // CFLAG:261  = 4（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 4;
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(`「主人…主人啊…快点再来抱我…${heart(1)}」`);
        await era.printAndWait(`「还想要更多主人的爱啊啊啊……」`);
        // CFLAG:261  = 3（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 3;
      } else if (
        (era.get(`abl:${target}:31`) || 0) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          `「哎呀…不够…不够哟…即便都塞满了，但是还是不够哟…」`,
        );
        // CFLAG:261  = 2（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 2;
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 === 2) {
        await era.printAndWait(`「哎呀…那里还没有…不能忍耐…」`);
        // CFLAG:261  = 1（变量语义：CFLAG 族，261）
        kojo.调教后自慰 = 1;
      }
    }
  }

  if (game.train.初吻与自我口上 === 2) {
    if (
      era.get(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊…女孩之间也…这么快乐啊…${heart(1)}」`);
      await era.printAndWait(`「呼呼…给我更多的快乐吧${heart(1)}」`);
      // CFLAG:262  = 5（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 5;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊啊啊…身体发热了…快要忍不住了啊…」`);
      await era.printAndWait(
        `「奴隶之间互相安慰…主人也一定明白…一定…会想到的……」`,
      );
      // CFLAG:262  = 4（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 4;
    } else if (
      (era.get(`abl:${target}:33`) || 0) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「女女这种事最喜欢了…为什么不能做更多呢?」`);
      // CFLAG:262  = 3（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 3;
    } else if (
      (era.get(`abl:${target}:22`) || 0) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「唔呼呼…女女真的好舒服…」`);
      // CFLAG:262  = 2（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 2;
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「呼呼…女女也…也不错呢…」`);
      // CFLAG:262  = 1（变量语义：CFLAG 族，262）
      kojo.百合PLAY = 1;
    }
  }

  if (game.train.初吻与自我口上 === 3) {
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.朝口交 < 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「唔啊${heart(1)}…嗯咕…呼…啊啊，这里还有精液…${heart(1)}」`,
      );
      await era.printAndWait(
        `「啊，早上好啊魔王大人${heart(1)} 一大早您的大肉棒就超有精神的啦${heart(1)}」`,
      );
      await era.printAndWait(
        `${target_name}微笑着吮吸刚刚喷射出的精液，随后低下头继续为魔王口交。`,
      );
      await era.printAndWait(
        `「嗯咕…呼呼…唔啊…呼呼…嗯嗯嗯嗯…大鸡鸡好美味呢呼呼…${heart(1)}」`,
      );
      // CFLAG:263  = 4（变量语义：CFLAG 族，263）
      kojo.朝口交 = 4;
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「早上好，主人…呼…肉棒里宝贵的精液…请放心的射出来呢${heart(1)}」`,
      );
      await era.printAndWait(
        `「主人的肉棒从早上就很精神呢…这样不会生小孩比较安全啦…」`,
      );
      await era.printAndWait(
        `${target_name}露出淫荡的表情继续用嘴巴服务起来……`,
      );
      // CFLAG:263  = 3（变量语义：CFLAG 族，263）
      kojo.朝口交 = 3;
    } else if (
      (era.get(`abl:${target}:16`) || 0) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「早上好，今天也要好好的…想要射精也可以哦…？」`);
      // CFLAG:263  = 2（变量语义：CFLAG 族，263）
      kojo.朝口交 = 2;
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「早上好，忍不住想要…主人的大肉棒呢…对不起…」`);
      // CFLAG:263  = 1（变量语义：CFLAG 族，263）
      kojo.朝口交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 4) {
    if (
      (era.get(`abl:${target}:2`) || 0) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        `「主人快点回来再抱住我…小穴空荡荡的好难受…！求求您了！」`,
      );
      if (era.get(`talent:${target}:76`) === 1) {
        await era.printAndWait(
          `「啊啊啊…淫乱的肉体好难受啊…快给我大肉棒吧…不行呢哦${heart(1)}」`,
        );
      }
      if (era.get(`talent:${target}:85`) === 1) {
        await era.printAndWait(
          `「啊啊${heart(1)} 能这样抱一下什么的…好高兴呢…${heart(1)}」`,
        );
      }
      // CFLAG:264  = 2（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 2;
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「啊…啊…忍无可忍…对不起…」`);
      // CFLAG:264  = 1（变量语义：CFLAG 族，264）
      kojo.调教后性交 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 5) {
    if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {
      await era.printAndWait(`「嘿嘿…私通了啊…」`);
      await era.printAndWait(`「那样的地方一个人睡觉是很寂寞的哦…？」`);
      // CFLAG:265  = 1（变量语义：CFLAG 族，265）
      kojo.夜袭 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 6) {
    if (
      era.get(`talent:${target}:85`) &&
      (era.get(`mark:${target}:3`) || 0) < 3
    ) {
      await era.printAndWait(`「为什么…为什么…我有什么不好…你…」`);
      await era.printAndWait(`怪物们驾着${target_name}的双手将其塞进马车。`);
      await era.printAndWait(
        `${target_name}从小窗口向你不断呼唤，和怪兽们的沉默不语形成了鲜明的反差。`,
      );
      await era.printAndWait(`马车越来越远。`);
      await era.printAndWait(
        `${target_name}透过小窗望着你的眼神成了最后的一幕。`,
      );
      await era.printAndWait(
        `然而直到最后你依旧什么都没有说，只是用冰冷的眼神目送${target_name}的离开。`,
      );
    } else if ((era.get(`mark:${target}:3`) || 0) === 3) {
      await era.printAndWait(`「再也不用看着你的脸了…好痛快」`);
      await era.printAndWait(`${target_name}朝地上啐了一口后自己爬上马车。`);
    } else if (era.get(`talent:${target}:76`)) {
      await era.printAndWait(
        `「你的调教最棒了啊${heart(1)}……没想到就这样离别了呢…啊…」`,
      );
      await era.printAndWait(`你亲吻了${target_name}的脸颊作为告别。`);
    } else {
      await era.printAndWait(`「再见…主人…请多保重…」`);
    }
    await era.print('');
    if (era.get(`talent:${target}:122`) !== 1) {
      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0
    }
  }

  if (game.train.初吻与自我口上 === 11) {
    if (kojo.妊娠发觉 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哈…哈哈…啊哈…${sc()}怀上了魔物的孩子…啊哈…骗人…骗人…一定是假的…啊啊啊啊啊」`,
        );
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        await era.printAndWait(
          `「呼…难道${sc()}怀上了魔王大人的孩子吗…得赶快告诉魔王大人…」`,
        );
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(`「啊啊…那样的…勇者居然会孕育魔物的子嗣……」`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(`「啊啊…那样的…勇者居然会孕育魔物的子嗣……」`);
      } else if (view.event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「那个…居然怀上了野狗的孩子……」`);
        } else {
          await era.printAndWait(`「呼，骗人…野狗的孩子…一定是假的……」`);
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「为、为什么${sc()}会怀上狂王的孩子…！」`);
      } else {
        await era.printAndWait(`「有…哎，哎呀…这是真的…怀孕…了…那样的……」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「啊哈…哈哈…啊哈…${sc()}怀上了魔物的孩子…啊哈…骗人…骗人…一定是假的…啊啊啊啊啊」`,
        );
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        await era.printAndWait(
          `「魔王大人要和${sc()}一起变成父母了吗…得赶快告诉他呢…」`,
        );
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(`「啊啊…那样的…勇者居然会孕育魔物的子嗣……」`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(`「啊啊…那样的…勇者居然会孕育魔物的子嗣……」`);
      } else if (view.event.妊娠相手 === 5) {
        if (era.get(`talent:${target}:136`) === 1) {
          await era.printAndWait(`「那个…居然怀上了野狗的孩子……」`);
        } else {
          await era.printAndWait(`「呼，骗人…野狗的孩子…一定是假的……」`);
        }
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「为、为什么${sc()}会怀上狂王的孩子…！」`);
      } else {
        await era.printAndWait(`「有…哎，哎呀…这是真的…怀孕…了…那样的……」`);
      }
      // CFLAG:271  = 1（变量语义：CFLAG 族，271）
      kojo.妊娠发觉 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 12) {
    if (kojo.生产 === 0) {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「哈哈哈哈…${sc()}的孩子…会不会毛茸茸的～就像猴子一样啊？还长着魔鬼之角啊？啊哈哈哈哈哈」`,
        );
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        await era.printAndWait(
          `「请看一下…是个健康的孩子，和你长的一模一样哦…唔呼呼」`,
        );
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(`「啊啊…生产什么的…啊啊…啊啊……」`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(`「啊啊…生产什么的…啊啊…啊啊……」`);
      } else if (view.event.妊娠相手 === 5) {
        await era.printAndWait(
          `「啊啊…${sc()}的肚子…已经…像狗一样的孩子不可以生下来……」`,
        );
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「啊啊…生出来了…狂王大人的后代…」`);
      } else {
        await era.printAndWait(`「呜…吧…啊…哈…哈哈…这是${sc()}的孩子……」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    } else {
      if (era.get(`talent:${target}:9`) === 1) {
        await era.printAndWait(
          `「哈哈哈哈…${sc()}的孩子…会不会毛茸茸的～就像猴子一样啊？还长着魔鬼之角啊？啊哈哈哈哈哈」`,
        );
      } else if (era.get(`talent:${target}:85`) && view.event.妊娠相手 === 1) {
        await era.printAndWait(
          `「请看一下…是个健康的孩子，和你长的一模一样哦…唔呼呼」`,
        );
      } else if (view.event.妊娠相手 === 2) {
        await era.printAndWait(`「啊啊…生产什么的…啊啊…啊啊……」`);
      } else if (view.event.妊娠相手 === 3) {
        await era.printAndWait(`「啊啊…生产什么的…啊啊…啊啊……」`);
      } else if (view.event.妊娠相手 === 5) {
        await era.printAndWait(
          `「啊啊…${sc()}的肚子…已经…像狗一样的孩子不可以生下来……」`,
        );
      } else if (view.event.妊娠相手 === 7) {
        await era.printAndWait(`「啊啊…生出来了…狂王大人的后代…」`);
      } else {
        await era.printAndWait(`「呜…吧…啊…哈…哈哈…这是${sc()}的孩子……」`);
      }
      // CFLAG:272  = 1（变量语义：CFLAG 族，272）
      kojo.生产 = 1;
    }
  }

  if (game.train.初吻与自我口上 === 13) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      if (era.get(`talent:${target}:153`)) {
        await era.printAndWait(`「有点不安呢…孩子生出来会是什么样的？……」`);
        await era.printAndWait(`${target_name}抚摸着即将临盆的腹部……`);
      } else if (era.get(`talent:${target}:154`)) {
        await era.printAndWait(`「啊啊，精力充沛的孩子真的是太好了！」`);
        await era.printAndWait(`${target_name}幸福地哄着孩子……`);
      }
    }
    // CFLAG:273  = 1（变量语义：CFLAG 族，273）
    kojo.育儿室 = 1;
  }

  if (game.train.初吻与自我口上 === 14) {
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {
      await era.printAndWait(`「呜呜…怎么会…${sc()}的孩子……」`);
    }
    // CFLAG:274  = 1（变量语义：CFLAG 族，274）
    kojo.亲离 = 1;
  }

  if (game.train.初吻与自我口上 === 999) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`${target_name}死亡了。被埋葬在迷宫内。`);
      await era.print('');
      await era.printAndWait(
        `部下在整理${target_name}的房间时将${sc()}的遗物送了过来，你在其中发现了一本日记。`,
      );
      await era.printAndWait(`……`);
      await era.printAndWait(`……`);
      await era.printAndWait(`…`);
      await era.printAndWait(
        `${target_name}从故乡出发之后的事被事无巨细地记录下来。`,
      );
      await era.printAndWait(`被你抓住后，每天接受调教的过程记录的特别详细。`);
      await era.printAndWait(
        `日记的最后还写着“能和魔王大人相遇实在是太好了”“明天也要继续在一起哦”之类感谢的话语。`,
      );
      await era.printAndWait(`从此写日记变成了你每天重要的工作之一……`);
    } else {
      await era.printAndWait(`${target_name}死亡了。被埋葬在迷宫内。`);
    }
  }

  if (game.train.初吻与自我口上 === 998) {
    if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  // TFLAG:13 = 0（变量语义：TFLAG 族，13）
  game.train.初吻与自我口上 = 0;

  return 0;
}

// dungeon_ryouzyoku_k2
async function dungeon_ryouzyoku_k2(rand) {
  const { target, sc } = bind_ctx(rand);

  if (era.get(`talent:${target}:0`) === 1) {
    // eslint-disable-next-line no-irregular-whitespace
    await era.printAndWait(`「讨厌…呀啊啊啊啊！　${sc()}的第一次…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「不要…」`);
      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(
        `「对不起！对不起！什么都可以，只要放过我，什么都可以！求求你，请放过我…」`,
      );

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          `「屁股！屁股也可以啊！脏脏的后面的小穴，不过，还是会努力地接受的！」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(`「嘴上也会努力的！我会拼命地舐，还请放过我…」`);
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(`「你们之类，完全…没什么好怕的啊！」`);
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「被侵犯…好绝望…被侵犯了…」`);
    } else {
      await era.printAndWait(`「请放过我！无论什么都可以，请放过我！」`);
    }
  } else {
    await era.printAndWait(`「哎…这样子…被侵犯…骗人…骗人的…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「嘘…」`);
      return 0;
    } else if (
      era.get(`talent:${target}:17`) === 1 ||
      era.get(`talent:${target}:31`) === 1 ||
      era.get(`talent:${target}:36`) === 1
    ) {
      await era.printAndWait(
        `「放过我，不，不要杀我！什么都可以！什么都可以！我只是喜欢探险啊！」`,
      );

      if (
        era.get(`talent:${target}:106`) === 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        await era.printAndWait(
          // eslint-disable-next-line no-irregular-whitespace
          `「屁股也可以！　${sc()}，会好好承受的…所以请…」`,
        );
      }

      if (era.get(`exp:${target}:22`) > 0) {
        await era.printAndWait(
          `「一定会努力舔大鸡鸡的！拼命努力…所以，放过我…」`,
        );
      }
    } else if (
      era.get(`talent:${target}:11`) === 1 ||
      era.get(`talent:${target}:12`) === 1 ||
      era.get(`talent:${target}:15`) === 1 ||
      era.get(`talent:${target}:30`) === 1 ||
      era.get(`talent:${target}:34`) === 1
    ) {
      await era.printAndWait(`「不要害怕…不要害怕…${sc()}可、可是不会输的…」`);
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「难道这就是${sc()}的…命运…」`);
    } else {
      await era.printAndWait(`「放过…拜托，请放过我…」`);
    }
  }

  return 0;
}

// dungeon_ryouzyoku_after_k2
async function dungeon_ryouzyoku_after_k2(rand) {
  const { target } = bind_ctx(rand);

  if (era.get(`talent:${target}:0`) === 1) {
    await era.printAndWait(`「那里…没关系…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「呜呜…」`);
      return 0;
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「好过分…屁股快要坏掉了…被这样持续地猛操…」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「已经，不想再舔了…」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「这么…竟然被灌了这么多」`);
    }
  } else {
    await era.printAndWait(`「没关系…请随意吧…」`);

    if (
      era.get(`talent:${target}:21`) === 1 ||
      era.get(`talent:${target}:22`) === 1
    ) {
      await era.printAndWait(`「讨厌…」`);
      return 0;
    }

    if (era.get(`exp:${target}:0`) > 20) {
      await era.printAndWait(`「那里…变得乱七八糟了…」`);
    }

    if (era.get(`exp:${target}:1`) > 20) {
      await era.printAndWait(`「好过分…屁股快要坏掉了…」`);
    }

    if (era.get(`exp:${target}:22`) > 20) {
      await era.printAndWait(`「已经，不想再舔了…」`);
    }

    if (era.get(`exp:${target}:20`) > 20) {
      await era.printAndWait(`「不可以吐出来…？好过分……」`);
    }
  }
}

// benki_koujo_k2
async function benki_koujo_k2(rand) {
  const { target, sc } = bind_ctx(rand);

  if (game.train.肉便器行动 === 0) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「『施舍』吗……${sc()}的『工作』也是够肮脏的啊……」`,
      );
      await era.printAndWait(
        // eslint-disable-next-line no-irregular-whitespace
        `「但是被催眠了也是没办法的嘛♪　来、请把肉棒掏出来吧」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(`「啊哈、不行的哦。按顺序来哦……♪」`);
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「会施舍的啦……请按顺序排好吧」`);
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait(`「会施舍的啦……」`);
    } else {
      await era.printAndWait(`「这样的工作……真讨厌」`);
    }
  } else if (game.train.肉便器行动 === 1) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 2) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 3) {
    if (game.dungeon.肉便器常识改写 === 1) {
      await era.printAndWait(
        `「乱交吗、到处都是男人的大肉棒……这些全都、要靠${sc()}的肉穴来解决啊」`,
      );
      await era.printAndWait(
        // eslint-disable-next-line no-irregular-whitespace
        `「会努力的……！　${sc()}可是肉便器啊、感觉非常受用啊！」`,
      );
    } else if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait(
        `「哇……到处都是男人的大肉棒……受得住吗、${sc()}的小穴受的住吗……♪」`,
      );
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        // eslint-disable-next-line no-irregular-whitespace
        `「有点怕啊……会在一旁看着？　${sc()}、会加油的！」`,
      );
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait(`「……会努力的」`);
    } else {
      await era.printAndWait(`「噫、这些全部都要……！？」`);
    }
  } else if (game.train.肉便器行动 === 4) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  } else if (game.train.肉便器行动 === 5) {
    if (era.get(`talent:${target}:76`) === 1) {
      await era.printAndWait('');
    } else if (era.get(`talent:${target}:85`)) {
      await era.printAndWait('');
    } else if ((era.get(`abl:${target}:16`) || 0) >= 5) {
      await era.printAndWait('');
    } else {
      await era.printAndWait('');
    }
  }

  return 0;
}

// dungeon_victory_k2
async function dungeon_victory_k2(rand) {
  const { rand_n, target } = bind_ctx(rand);

  await era.printAndWait(`「呼~真危险」`);

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
      await era.printAndWait(`「哼，我是不会被打败的！」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「这种程度不会输的！」`);
    } else {
      await era.printAndWait(`「哈，胜利了…！」`);
    }
  } else if (
    era.get(`talent:${target}:10`) === 1 ||
    era.get(`talent:${target}:26`) === 1
  ) {
    await era.printAndWait(`「要不要再找些帮手呢…」`);

    return 0;
  } else {
    if (rand_n(3) === 0) {
      await era.printAndWait(`「…呼」`);
    } else if (rand_n(2) === 0) {
      await era.printAndWait(`「这迷宫…到底有多大？」`);
    } else {
      await era.printAndWait(`「这种程度不会输的…」`);
    }
  }

  if (
    (era.get(`base:${target}:0`) * 100) / era.get(`maxbase:${target}:0`) < 50 ||
    (era.get(`base:${target}:1`) * 100) / era.get(`maxbase:${target}:1`) < 50
  ) {
    await era.printAndWait(`（真的…危险！？）`);
  } else {
    await era.printAndWait(`「…好！」`);
  }

  return 0;
}

// dungeon_attack_k2
async function dungeon_attack_k2(rand) {
  const { rand_n, target, sc, view } = bind_ctx(rand);

  if (view.invasion.状态 === 2) {
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
      if (era.get(`talent:${target}:276`)) {
        await era.printAndWait(`「接招吧……${sc()}的连发……冰晶术！」`);
      } else if (rand_n(3) === 0) {
        await era.printAndWait(`「不会输！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「${sc()}现在……没问题！」`);
      } else {
        await era.printAndWait(`「${sc()}也要……战斗！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      if (era.get(`talent:${target}:250`)) {
        await era.printAndWait(`「噫、忍法……替身之术」`);
      } else {
        await era.printAndWait(`「有点厌倦战斗了……」`);
      }

      return 0;
    } else {
      if (era.get(`talent:${target}:314`) === 10) {
        await era.printAndWait(`「虽然是小不点……但${sc()}会努力的！」`);
      } else if (rand_n(3) === 0) {
        await era.printAndWait(`「${sc()}也……！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「小菜一碟！」`);
      } else {
        await era.printAndWait(`「呀」`);
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
        await era.printAndWait(
          `「这涌出的魔力…${sc()}仿佛获得新生一般的力量！」`,
        );
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「对手已经变弱了！」`);
      } else {
        await era.printAndWait(`「就是这样…这力量！」`);
      }
    } else if (
      era.get(`talent:${target}:10`) === 1 ||
      era.get(`talent:${target}:26`) === 1
    ) {
      await era.printAndWait(`「好像变得…强大了一点」`);

      return 0;
    } else {
      if (rand_n(3) === 0) {
        await era.printAndWait(`「今日的${sc()}已变得更强了！」`);
      } else if (rand_n(2) === 0) {
        await era.printAndWait(`「魔王大人一般的力量……！」`);
      } else {
        await era.printAndWait(`「这就是…${sc()}！？」`);
      }
    }
  }

  return 0;
}

// colosseum_kojo_2
async function colosseum_kojo_2(rand) {
  const { target, assi, target_name, assi_name, master_name, sc, scf } =
    bind_ctx(rand);
  // 死斗场 SC31/21/27 三处同型的武器名：TALENT:ASSI:121/122 有则「阴茎」，
  // 否则持假阳具时补「假阳具」，两段都不出时为空串。
  // ITEM:PBAND 是内建非角色变量（4 号 = 假阳具），不再改写（#552）
  const assi_has_penis =
    (era.get(`talent:${assi}:121`) || 0) === 1 ||
    (era.get(`talent:${assi}:122`) || 0) === 1;
  const assi_has_toy = (era.get('item:4') || 0) === 1;

  if (era_flag.selectcom === 55) {
    if (era.get(`base:${target}:1`) <= 0) {
      await era.printAndWait(`${target_name}似乎连站起来的力气都没有了……`);
    } else {
      await era.printAndWait(
        `${target_name}面对着死斗场的狂热和接下来的对手，忍不住哆嗦起来……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 56) {
    if (era.get(`base:${target}:1`) <= 0) {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「啊啊啊…就是因为这个…最讨厌战斗了……」`);
        await era.printAndWait(
          `${target_name}瘫成一个“大”字型躺在死斗场中喃喃自语……`,
        );
      } else {
        await era.printAndWait(`「啊啊…啊啊啊啊…啊啊…${sc()}…已经……」`);
        await era.printAndWait(
          `${target_name}瘫成一个“大”字型躺在死斗场中喃喃自语……`,
        );
      }
    } else {
      if (era_flag.assi > 0 && era_flag.assiplay) {
        await era.printAndWait(`「啊啊啊…在${assi_name}的注视下战斗什么的……」`);
        await era.printAndWait(
          `${target_name}在${master_name}命令下装备妥当后踏入死斗场时，${assi_name}的目光瞬间打消了战斗的勇气……`,
        );
      } else {
        await era.printAndWait(
          `「啊，和这样的家伙战斗什么的……${scf()}、${sc()}会死在这里的吧……！」`,
        );
        await era.printAndWait(`${target_name}看着自己接下来的对手不寒而栗……`);
      }
    }
    return 0;
  }

  if (era_flag.selectcom === 31) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「是…这里不可以…嗯嗯…啊…唔唔！」`);
      // 同一行输出：无后缀 PRINTFORM/PRINT 连续
      // 不换行，末行 PRINTFORMW 才收行。两条 SIF 互斥——条件提到
      // 语句外当取值（assi_has_penis/assi_has_toy），文本留在输出语句里（#625）
      await era.printAndWait(
        `${assi_name}把` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +
          `塞入${target_name}的口中，她一脸愉悦的吞吐着肉棒……`,
      );
    } else {
      await era.printAndWait(`「哈啊…哈啊…唔唔唔…呼…臭臭的…啊啊……」`);
      await era.printAndWait(
        `${target_name}热情洋溢地舔弄着面前散发出令人作呕气味的阴茎……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 5) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「${assi_name}…这里…啊啊啊…啊呼！」`);
      await era.printAndWait(`${target_name}一脸陶醉的样子……`);
    } else {
      await era.printAndWait(`「啊啊啊…呼…哪里…好…痛……」`);
      await era.printAndWait(
        `${target_name}的胸部被用力地搓揉着，发出了痛苦的呻吟……`,
      );
    }
    return 0;
  }

  if (era_flag.selectcom === 21) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(`「对不起，对不起啊…已经无法反抗了…啊啊啊！」`);
      // 同组的一整行（#625）
      await era.printAndWait(
        `${assi_name}仔细聆听传来的悲鸣，用` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +
          `将${target_name}的小穴无情地蹂躏着……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「唔啊…要坏掉了…不可以…不可以啊……」`);
      await era.printAndWait(
        `无助的${target_name}像破布娃娃般被粗壮的巨魔压在身下肆意玩弄……`,
      );
    } else {
      await era.printAndWait(`「快停下…唔啊…这样不可以啊啊啊！」」`);
      await era.printAndWait(`${target_name}尖叫着反抗魔物的侵犯……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 27) {
    if (era_flag.assi > 0 && era_flag.assiplay) {
      await era.printAndWait(
        `「对不起，对不起…已经无法反抗了啊…啊啊啊！要，要被用坏了啊！」`,
      );
      // 同组的一整行（#625）
      await era.printAndWait(
        `${assi_name}仔细聆听传来的悲鸣，用` +
          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +
          `将${target_name}的肛门无情地蹂躏着……`,
      );
    } else if (game.train.死斗场敌种 === 206) {
      await era.printAndWait(`「唔啊…要坏掉了…不可以…不可以啊……」`);
      await era.printAndWait(
        `无助的${target_name}像破布娃娃般被粗壮的巨魔压在身下肆意玩弄……`,
      );
    } else {
      await era.printAndWait(`「快停下…唔啊…这样不可以啊啊啊！」`);
      await era.printAndWait(`${target_name}尖叫着反抗魔物的侵犯……`);
    }
    return 0;
  }

  if (era_flag.selectcom === 51) {
    await era.printAndWait(`「身体…居然在发热…！」`);
    return 0;
  }

  return 0;
}

// ntr_koujo_k2
async function ntr_koujo_k2(rand, p = 0) {
  const { target, target_name, sc, view, kojo } = bind_ctx(rand);

  if (kojo.NTR再捕获 === 0) {
    // CFLAG:650  = 1（变量语义：CFLAG 族，650）
    kojo.NTR再捕获 = 1;
  }

  if (p === 1) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「哎呀…啊啊啊…这是打算献给主人的啊！」`);
    } else {
      await era.printAndWait(`「咿呀…这种…明明很讨厌的…啊啊啊啊！」`);
    }
    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    kojo.NTR_651 = 1;
  } else if (p === 2) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(`「啊啊啊…不是吧…屁股…被侵犯了啊……?」`);
    } else {
      await era.printAndWait(`「啊啊对不起…狂王啊…请原谅我吧！」`);
    }
    // CFLAG:652  = 1（变量语义：CFLAG 族，652）
    kojo.NTR_652 = 1;
  } else if (p === 3) {
    if (era.get(`talent:${target}:136`)) {
      await era.printAndWait(`「啊……好过分！被狗狗侵犯！不要看啊…不要看！！」`);
    } else if (
      era.get(`talent:${target}:76`) ||
      era.get(`talent:${target}:85`)
    ) {
      await era.printAndWait(
        `「这样…被很多人看…人家…竟然被狗强奸…啊啊啊啊啊啊啊啊！」`,
      );
    } else {
      await era.printAndWait(`「啊啊原谅！狗之类的…做！啊啊啊！」`);
    }
    // CFLAG:653  = 1（变量语义：CFLAG 族，653）
    kojo.NTR_653 = 1;
  } else if (p === 4) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊…是…哼…啊啊啊啊啊啊啊啊…更…还是更喜欢…狂王大人！…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「有…啊啊啊…更…更多…被狂王大人侵犯什么的啊…三生有幸……」`,
      );
    }
    // CFLAG:654  = 1（变量语义：CFLAG 族，654）
    kojo.NTR_654 = 1;
  } else if (p === 5) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊啊啊…这样好可爱…从此大家就是好朋友了${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「不要停…不要停…连后面也一起用力…同时…插满两边的小穴吧……！」`,
      );
    }
    // CFLAG:655  = 1（变量语义：CFLAG 族，655）
    kojo.NTR_655 = 1;
  } else if (p === 6) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「啊哈…魔王的仆人要给做了坏事的${target_name}惩罚，请在那里…${heart(1)}」`,
      );
    } else {
      await era.printAndWait(
        `「已经…${sc()}成为…大家的公共厕所…是为了大家的精液而活…」`,
      );
    }
    // CFLAG:656  = 1（变量语义：CFLAG 族，656）
    kojo.NTR_656 = 1;
  } else if (p === 7) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      await era.printAndWait(
        `「呼呼…侍奉过狂王大人后…${sc()}…就觉得…${heart(1)}」`,
      );
      await era.printAndWait(
        `「相比魔王…还是侍奉狂王大人…更愉快呢…${heart(1)}」`,
      );
      await era.printAndWait(`${target_name}一边说着一边再次开始取悦狂王了……`);
    } else {
      await era.printAndWait(`「${sc()}…已经是属于狂王大人的了…」`);
    }
    // CFLAG:657  = 1（变量语义：CFLAG 族，657）
    kojo.NTR_657 = 1;
  } else if (p === 20) {
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {
      if (view.event.妊娠相手 === 1) {
        await era.printAndWait(
          `「还给我……请还给我……那个孩子是${sc()}和魔王大人的孩子呢……啊啊啊……」`,
        );
      } else {
        await era.printAndWait(`「把${sc()}的孩子还给我…啊啊…唔呀……」`);
      }
    } else {
      await era.printAndWait(
        `「啊啊啊……从此以后…子宫就是属于狂王殿下的东西了…」`,
      );
    }
  }

  return 0;
}

// exucution_koujo_k2
async function exucution_koujo_k2(rand) {
  const { sc } = bind_ctx(rand);

  if (game.event.犬射精或处刑口上 === 4) {
    await era.printAndWait(`「肉便器…${sc()}已经成为奴隶的玩物了吗……」`);
  } else if (game.event.犬射精或处刑口上 === 5) {
    await era.printAndWait(`「${sc()}的意志已经…消失…了………」`);
  } else if (game.event.犬射精或处刑口上 === 6) {
    await era.printAndWait(`「呜呜呜…为什么…为什么做了这样的事情………」`);
  } else if (game.event.犬射精或处刑口上 === 7) {
    await era.printAndWait('');
  }
}

// museum_koujo_k2
async function museum_koujo_k2(rand) {
  const { sc } = bind_ctx(rand);

  if (game.event.博物馆口上 === 0) {
    await era.printAndWait(`「${sc()}石化了…？收藏品…？那是…什……」`);
  } else if (game.event.博物馆口上 === 1) {
    await era.printAndWait(`「标本…${sc()}，明明还活着……」`);
  } else if (game.event.博物馆口上 === 2) {
    await era.printAndWait('');
  } else if (game.event.博物馆口上 === 3) {
    await era.printAndWait(`「那、那个…找您吩咐这样做了…到底要做什么呢…？」`);
  } else if (game.event.博物馆口上 === 4) {
    await era.printAndWait(
      `「${sc()}的身体……不要……这样的…请变回去、变……回……」`,
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

// banishment_koujo_k2
async function banishment_koujo_k2(rand) {
  const { sc } = bind_ctx(rand);

  if (game.event.流放口上 === 0) {
    await era.printAndWait(
      `「那种…力量被夺走的话……${sc()}该如何继续生存下去…啊啊…」`,
    );
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

// public_exucution_koujo_k2
async function public_exucution_koujo_k2(rand) {
  bind_ctx(rand);

  if (game.event.公开处刑口上 === 0) {
    await era.printAndWait(
      `「好多人！要死！要死了啊…呼呼…啊啊啊啊小穴要被用坏了！」`,
    );
  } else if (game.event.公开处刑口上 === 1) {
    await era.printAndWait(`「相比如今的结局，果然还是勇者比较好吗……」`);
  } else if (game.event.公开处刑口上 === 2) {
    await era.printAndWait('');
  }
}

// grotesque_koujo_k2
async function grotesque_koujo_k2(rand) {
  bind_ctx(rand);

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

// enterenemy_koujo_k2
async function enterenemy_koujo_k2(rand) {
  const { target, sc } = bind_ctx(rand);

  if (
    era.get(`talent:${target}:21`) === 1 ||
    era.get(`talent:${target}:22`) === 1
  ) {
    await era.printAndWait(`「……不，不太想去」`);
  } else if (
    era.get(`talent:${target}:11`) === 1 ||
    era.get(`talent:${target}:12`) === 1 ||
    era.get(`talent:${target}:15`) === 1 ||
    era.get(`talent:${target}:30`) === 1 ||
    era.get(`talent:${target}:34`) === 1
  ) {
    await era.printAndWait(`「${sc()}的话，一定会，没事的」`);
  } else if (
    era.get(`talent:${target}:10`) === 1 ||
    era.get(`talent:${target}:26`) === 1
  ) {
    await era.printAndWait(`「${sc()}真的要进去吗……？」`);
  } else {
    await era.printAndWait(`「没关系…${sc()}一定会没事的……！」`);
  }
}

// gohoubi_request_koujo_k2
async function gohoubi_request_koujo_k2(rand) {
  const { target, sc } = bind_ctx(rand);

  if (era.get(`cflag:${target}:504`) === 0) {
    await era.printAndWait(`「那个…回来后给我钱就好啦」`);
  } else if (
    era.get(`cflag:${target}:504`) === 1 ||
    era.get(`cflag:${target}:504`) === 2 ||
    era.get(`cflag:${target}:504`) === 3
  ) {
    // 同一行输出：无后缀 PRINTFORM/PRINT 连续
    // 不换行，末行 PRINTFORMW 才收行。兽名三档的条件提到
    // 语句外当取值、文本留在输出语句里（#625）
    const beast_word =
      era.get(`cflag:${target}:504`) === 1
        ? '狗'
        : era.get(`cflag:${target}:504`) === 2
          ? '猪'
          : '马';
    await era.printAndWait(
      `「那个…回来的话…能让` + beast_word + `来和我…做…吗」`,
    );
  } else if (era.get(`cflag:${target}:504`) === 4) {
    await era.printAndWait(`「得胜归来的话…亲我吧…！」`);
  } else if (era.get(`cflag:${target}:504`) === 5) {
    await era.printAndWait(`「得胜归来的话…要好好的和${sc()}做一次爱哦…」`);
  } else if (era.get(`cflag:${target}:504`) === 6) {
    await era.printAndWait(`「那个…奖赏的话…用精液喂饱我吧…」`);
  } else if (era.get(`cflag:${target}:504`) === 7) {
    await era.printAndWait(`「赢了的话…希望能一次和…许多人一起做…」`);
  } else if (era.get(`cflag:${target}:504`) === 8) {
    await era.printAndWait(`「${sc()}…为了魔王大人的尿液…什么都可以做到！」`);
  } else if (era.get(`cflag:${target}:504`) === 9) {
    await era.printAndWait(`「奖赏…请让我夺走…他人的贞操吧……」`);
  }
}

// gohoubi_after_koujo_k2
async function gohoubi_after_koujo_k2(cid, choice, rand) {
  const { sc } = bind_ctx(rand);

  if (choice === 0) {
    await era.printAndWait(`「哇…我知道了…」`);
    return 0;
  } else if (choice === 1) {
    await era.printAndWait(`「那我就收下了」`);
    return 0;
  } else if (choice === 2) {
    if (era.get(`cflag:${cid}:504`) === 0) {
      await era.printAndWait(`「哇，这么多！谢谢魔王大人」`);
    } else if (era.get(`cflag:${cid}:504`) === 1) {
      if (era.get(`talent:${cid}:0`) === 1) {
        await era.printAndWait(`「好棒！和狗肛交果然最棒了啊！」`);
      } else {
        await era.printAndWait(`「好棒！和狗最棒了啊！」`);
      }
    } else if (era.get(`cflag:${cid}:504`) === 2) {
      if (era.get(`talent:${cid}:0`) === 1) {
        await era.printAndWait(`「好棒！和猪肛交果然最棒了啊！」`);
      } else {
        await era.printAndWait(`「好棒！和猪最棒了啊！」`);
      }
    } else if (era.get(`cflag:${cid}:504`) === 3) {
      if (era.get(`talent:${cid}:0`) === 1) {
        await era.printAndWait(`「好棒！用马鞭肛交最棒了啊！」`);
      } else {
        await era.printAndWait(`「好棒！用马鞭最棒了啊！」`);
      }
    } else if (era.get(`cflag:${cid}:504`) === 4) {
      await era.printAndWait(`「是…啊…还想要更多…${heart(1)}」`);
    } else if (era.get(`cflag:${cid}:504`) === 5) {
      if (era.get(`abl:${cid}:2`) > era.get(`abl:${cid}:3`)) {
        await era.printAndWait(
          `「魔王大人！快来操${sc()}小穴吧！要操到我尖叫为止哦！」`,
        );
      } else {
        await era.printAndWait(
          `「魔王大人！快来操${sc()}的屁眼吧！要操到我尖叫为止哦！」`,
        );
      }
    } else if (era.get(`cflag:${cid}:504`) === 6) {
      await era.printAndWait(`「美味的精液…啊啊…给我更多…」`);
    } else if (era.get(`cflag:${cid}:504`) === 7) {
      if (era.get(`talent:${cid}:0`) === 1) {
        await era.printAndWait(`「啊啊…果然还是乱交最棒…${heart(1)}」`);
      } else {
        await era.printAndWait(`「啊啊…果然还是乱交最棒…${heart(1)}」`);
      }
    } else if (era.get(`cflag:${cid}:504`) === 8) {
      await era.printAndWait(`「您的尿液果然是最棒的，魔王大人……」`);
    } else if (era.get(`cflag:${cid}:504`) === 9) {
      if (era.get(`abl:${cid}:2`) > era.get(`abl:${cid}:3`)) {
        await era.printAndWait(`「啊啊，感觉怎么样？可是最棒的哟！谢谢啦……」`);
      } else {
        await era.printAndWait(`「${sc()}的屁股期待了很久了呀？」`);
      }
    } else {
      // 空 ELSE（无台词）
    }
  }
}

// osioski_koujo_k2
async function osioki_koujo_k2(cid, choice, rand) {
  const { sc } = bind_ctx(rand);

  if (choice === 0) {
    await era.printAndWait(`「谢谢……」`);
  } else if (choice === 1) {
    if (era.get(`abl:${cid}:21`) >= 3) {
      await era.printAndWait(`「啊啊！不要停！再来！感觉快要疯掉了啊！」`);
    } else {
      await era.printAndWait(`「不要！不要再电了！」`);
    }
  } else if (choice === 2) {
    if (era.get(`abl:${cid}:17`) >= 4) {
      await era.printAndWait(
        `「心情不错哟${heart(1)} 能被大家这么赤裸裸地盯着，感觉好高兴${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「可、可恶…不要看…不要看我……」`);
    }
  } else if (choice === 3) {
    if (era.get(`abl:${cid}:17`) >= 6) {
      await era.printAndWait(
        `「啊啊…只有我这样的超级变态……才会在这个时候想要手淫吧…哼啊真是的${heart(1)}」`,
      );
    } else {
      await era.printAndWait(`「呜呜，${sc()}不是变态啊…不一样这不一样啊……」`);
    }
  } else if (choice === 4) {
    if (era.get(`abl:${cid}:21`) >= 3) {
      await era.printAndWait(`「再来！魔王大人请继续无情的鞭挞我吧！」`);
    } else {
      await era.printAndWait(`「请原谅我！好痛啊！」`);
    }
  } else if (choice === 5) {
    if (
      era.get(`talent:${cid}:88`) === 1 ||
      era.get(`talent:${cid}:76`) === 1
    ) {
      await era.printAndWait(`「尿液…真是…好美味呢…?」`);
    } else {
      await era.printAndWait(`「啊唔…呜呜…呜呜呜呜…」`);
    }
  } else if (choice === 6) {
    await era.printAndWait(`「事到如今清理便池已经…」`);
  } else if (choice === 7) {
    await era.printAndWait(`「肚子…饿了…」`);
  } else if (choice === 8) {
    await era.printAndWait(
      `「魔王大人！做什么都可以！什么过分的事都可以承受！快来侵犯我！求求你快来侵犯我啊！」`,
    );
  } else if (choice === 9) {
    await era.printAndWait(`「但是，这次……」`);
  }
}

// gobi_koujo_k2（ARG:0）
function gobi_koujo_k2(arg_0, rand) {
  const { rand_n } = bind_ctx(rand);

  if (arg_0 === 1) {
    return `啊～`;
  } else if (arg_0 === 2) {
    return `哟！`;
  } else if (arg_0 === 3) {
    return `啊……。`;
  } else if (arg_0 === 4) {
    return `啊啊……。`;
  } else if (arg_0 === 5) {
    return `呼……唔唔。`;
  } else {
    if (rand_n(3) === 0) {
      return `唔。`;
    } else if (rand_n(2) === 0) {
      return `什么啊。`;
    } else {
      return `什么啊。`;
    }
  }
}

on('EVENTTRAIN', eventtrain_k2);
on('EVENTEND', eventend_k2);

// 口上族接入：本文件每个**有分发路径**的真身都要在下面登记一处；漏一处 =
// 玩家侧看到占位行或不响。文件内直调的真身不在此列（COLOSSEUM_KOJO_2 由 COM
// 头部检查直调；DOG_KOJO_2 有真身但检查静默跳过，见文件头）。范围与接入由
// test/kojo-register-coverage.test.js 的「有本体必有 register」契约锁守。
kojo_message_com_family.register(2, kojo_message_com_2);
kojo_message_palamcng_family.register(2, kojo_message_palamcng_2);
kojo_message_markcng_family.register(2, kojo_message_markcng_2);
self_kojo_family.register(2, self_kojo_k2);
gohoubi_after_koujo_family.register(2, gohoubi_after_koujo_k2);
osioski_koujo_family.register(2, osioki_koujo_k2);
ryouzyoku_kojo_family.register(2, dungeon_ryouzyoku_k2);
ryouzyoku_after_kojo_family.register(2, dungeon_ryouzyoku_after_k2);
benki_koujo_family.register(2, benki_koujo_k2);
dungeon_victory_family.register(2, dungeon_victory_k2);
dungeon_attack_family.register(2, dungeon_attack_k2);
ntr_koujo_family.register(2, ntr_koujo_k2);
museum_koujo_family.register(2, museum_koujo_k2);
exucution_koujo_family.register(2, exucution_koujo_k2);
banishment_koujo_family.register(2, banishment_koujo_k2);
public_exucution_koujo_family.register(2, public_exucution_koujo_k2);
grotesque_koujo_family.register(2, grotesque_koujo_k2);
enterenemy_koujo_family.register(2, enterenemy_koujo_k2);
gohoubi_request_koujo_family.register(2, gohoubi_request_koujo_k2);
gobi_koujo_family.register(2, gobi_koujo_k2);

module.exports = {
  kojo_message_com_2,
  dog_kojo_2,
  colosseum_kojo_2,
  k2_kojo2,
  self_kojo_k2,
  kojo_message_palamcng_2,
  kojo_message_markcng_2,
  benki_koujo_k2,
  dungeon_ryouzyoku_k2,
  dungeon_ryouzyoku_after_k2,
  dungeon_victory_k2,
  dungeon_attack_k2,
  ntr_koujo_k2,
  exucution_koujo_k2,
  museum_koujo_k2,
  banishment_koujo_k2,
  public_exucution_koujo_k2,
  grotesque_koujo_k2,
  enterenemy_koujo_k2,
  gohoubi_request_koujo_k2,
  gohoubi_after_koujo_k2,
  osioki_koujo_k2,
  gobi_koujo_k2,
};
